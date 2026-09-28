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
  sdkId: "Pinpoint Email",
  target: "AmazonPinpointEmailService",
  version: "2018-07-26",
  sigv4: "ses",
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
                `https://email-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://email-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://email.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://email.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccountSuspendedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountSuspendedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "AlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MailFromDomainNotVerifiedException
  extends /*@__PURE__*/ TE.TaggedError(
    "MailFromDomainNotVerifiedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MessageRejected
  extends /*@__PURE__*/ TE.TaggedError("MessageRejected", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class SendingPausedException
  extends /*@__PURE__*/ TE.TaggedError(
    "SendingPausedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export type ConfigurationSetName = string;
export type CustomRedirectDomain = string;
export interface TrackingOptions {
  CustomRedirectDomain: string;
}
export type TlsPolicy = "REQUIRE" | "OPTIONAL" | (string & {});
export type PoolName = string;
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy;
  SendingPoolName?: string;
}
export type Enabled = boolean;
export type LastFreshStart = Date;
export interface ReputationOptions {
  ReputationMetricsEnabled?: boolean;
  LastFreshStart?: Date;
}
export interface SendingOptions {
  SendingEnabled?: boolean;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateConfigurationSetRequest {
  ConfigurationSetName: string;
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
  SendingOptions?: SendingOptions;
  Tags?: Tag[];
}
export interface CreateConfigurationSetResponse {}
export type EventDestinationName = string;
export type EventType =
  | "SEND"
  | "REJECT"
  | "BOUNCE"
  | "COMPLAINT"
  | "DELIVERY"
  | "OPEN"
  | "CLICK"
  | "RENDERING_FAILURE"
  | (string & {});
export type EventTypes = EventType[];
export type AmazonResourceName = string;
export interface KinesisFirehoseDestination {
  IamRoleArn: string;
  DeliveryStreamArn: string;
}
export type DimensionName = string;
export type DimensionValueSource =
  | "MESSAGE_TAG"
  | "EMAIL_HEADER"
  | "LINK_TAG"
  | (string & {});
export type DefaultDimensionValue = string;
export interface CloudWatchDimensionConfiguration {
  DimensionName: string;
  DimensionValueSource: DimensionValueSource;
  DefaultDimensionValue: string;
}
export type CloudWatchDimensionConfigurations =
  CloudWatchDimensionConfiguration[];
export interface CloudWatchDestination {
  DimensionConfigurations: CloudWatchDimensionConfiguration[];
}
export interface SnsDestination {
  TopicArn: string;
}
export interface PinpointDestination {
  ApplicationArn?: string;
}
export interface EventDestinationDefinition {
  Enabled?: boolean;
  MatchingEventTypes?: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SnsDestination?: SnsDestination;
  PinpointDestination?: PinpointDestination;
}
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export interface CreateConfigurationSetEventDestinationResponse {}
export interface CreateDedicatedIpPoolRequest {
  PoolName: string;
  Tags?: Tag[];
}
export interface CreateDedicatedIpPoolResponse {}
export type ReportName = string;
export type EmailAddress = string;
export type MessageData = string;
export type Charset = string;
export interface Content {
  Data: string;
  Charset?: string;
}
export interface Body {
  Text?: Content;
  Html?: Content;
}
export interface Message {
  Subject: Content;
  Body: Body;
}
export type RawMessageData = Uint8Array;
export interface RawMessage {
  Data: Uint8Array;
}
export type TemplateArn = string;
export type TemplateData = string;
export interface Template {
  TemplateArn?: string;
  TemplateData?: string;
}
export interface EmailContent {
  Simple?: Message;
  Raw?: RawMessage;
  Template?: Template;
}
export interface CreateDeliverabilityTestReportRequest {
  ReportName?: string;
  FromEmailAddress: string;
  Content: EmailContent;
  Tags?: Tag[];
}
export type ReportId = string;
export type DeliverabilityTestStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | (string & {});
export interface CreateDeliverabilityTestReportResponse {
  ReportId: string;
  DeliverabilityTestStatus: DeliverabilityTestStatus;
}
export type Identity = string;
export interface CreateEmailIdentityRequest {
  EmailIdentity: string;
  Tags?: Tag[];
}
export type IdentityType =
  | "EMAIL_ADDRESS"
  | "DOMAIN"
  | "MANAGED_DOMAIN"
  | (string & {});
export type DkimStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "TEMPORARY_FAILURE"
  | "NOT_STARTED"
  | (string & {});
export type DnsToken = string;
export type DnsTokenList = string[];
export interface DkimAttributes {
  SigningEnabled?: boolean;
  Status?: DkimStatus;
  Tokens?: string[];
}
export interface CreateEmailIdentityResponse {
  IdentityType?: IdentityType;
  VerifiedForSendingStatus?: boolean;
  DkimAttributes?: DkimAttributes;
}
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export interface DeleteConfigurationSetResponse {}
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export interface DeleteConfigurationSetEventDestinationResponse {}
export interface DeleteDedicatedIpPoolRequest {
  PoolName: string;
}
export interface DeleteDedicatedIpPoolResponse {}
export interface DeleteEmailIdentityRequest {
  EmailIdentity: string;
}
export interface DeleteEmailIdentityResponse {}
export interface GetAccountRequest {}
export type Max24HourSend = number;
export type MaxSendRate = number;
export type SentLast24Hours = number;
export interface SendQuota {
  Max24HourSend?: number;
  MaxSendRate?: number;
  SentLast24Hours?: number;
}
export type GeneralEnforcementStatus = string;
export interface GetAccountResponse {
  SendQuota?: SendQuota;
  SendingEnabled?: boolean;
  DedicatedIpAutoWarmupEnabled?: boolean;
  EnforcementStatus?: string;
  ProductionAccessEnabled?: boolean;
}
export type BlacklistItemName = string;
export type BlacklistItemNames = string[];
export interface GetBlacklistReportsRequest {
  BlacklistItemNames: string[];
}
export type RblName = string;
export type BlacklistingDescription = string;
export interface BlacklistEntry {
  RblName?: string;
  ListingTime?: Date;
  Description?: string;
}
export type BlacklistEntries = BlacklistEntry[];
export type BlacklistReport = { [key: string]: BlacklistEntry[] | undefined };
export interface GetBlacklistReportsResponse {
  BlacklistReport: { [key: string]: BlacklistEntry[] | undefined };
}
export interface GetConfigurationSetRequest {
  ConfigurationSetName: string;
}
export interface GetConfigurationSetResponse {
  ConfigurationSetName?: string;
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
  SendingOptions?: SendingOptions;
  Tags?: Tag[];
}
export interface GetConfigurationSetEventDestinationsRequest {
  ConfigurationSetName: string;
}
export interface EventDestination {
  Name: string;
  Enabled?: boolean;
  MatchingEventTypes: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SnsDestination?: SnsDestination;
  PinpointDestination?: PinpointDestination;
}
export type EventDestinations = EventDestination[];
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[];
}
export type Ip = string;
export interface GetDedicatedIpRequest {
  Ip: string;
}
export type WarmupStatus = "IN_PROGRESS" | "DONE" | (string & {});
export type Percentage100Wrapper = number;
export interface DedicatedIp {
  Ip: string;
  WarmupStatus: WarmupStatus;
  WarmupPercentage: number;
  PoolName?: string;
}
export interface GetDedicatedIpResponse {
  DedicatedIp?: DedicatedIp;
}
export type NextToken = string;
export type MaxItems = number;
export interface GetDedicatedIpsRequest {
  PoolName?: string;
  NextToken?: string;
  PageSize?: number;
}
export type DedicatedIpList = DedicatedIp[];
export interface GetDedicatedIpsResponse {
  DedicatedIps?: DedicatedIp[];
  NextToken?: string;
}
export interface GetDeliverabilityDashboardOptionsRequest {}
export type DeliverabilityDashboardAccountStatus =
  | "ACTIVE"
  | "PENDING_EXPIRATION"
  | "DISABLED"
  | (string & {});
export type Domain = string;
export type IspName = string;
export type IspNameList = string[];
export interface InboxPlacementTrackingOption {
  Global?: boolean;
  TrackedIsps?: string[];
}
export interface DomainDeliverabilityTrackingOption {
  Domain?: string;
  SubscriptionStartDate?: Date;
  InboxPlacementTrackingOption?: InboxPlacementTrackingOption;
}
export type DomainDeliverabilityTrackingOptions =
  DomainDeliverabilityTrackingOption[];
export interface GetDeliverabilityDashboardOptionsResponse {
  DashboardEnabled: boolean;
  SubscriptionExpiryDate?: Date;
  AccountStatus?: DeliverabilityDashboardAccountStatus;
  ActiveSubscribedDomains?: DomainDeliverabilityTrackingOption[];
  PendingExpirationSubscribedDomains?: DomainDeliverabilityTrackingOption[];
}
export interface GetDeliverabilityTestReportRequest {
  ReportId: string;
}
export type DeliverabilityTestSubject = string;
export interface DeliverabilityTestReport {
  ReportId?: string;
  ReportName?: string;
  Subject?: string;
  FromEmailAddress?: string;
  CreateDate?: Date;
  DeliverabilityTestStatus?: DeliverabilityTestStatus;
}
export type Percentage = number;
export interface PlacementStatistics {
  InboxPercentage?: number;
  SpamPercentage?: number;
  MissingPercentage?: number;
  SpfPercentage?: number;
  DkimPercentage?: number;
}
export interface IspPlacement {
  IspName?: string;
  PlacementStatistics?: PlacementStatistics;
}
export type IspPlacements = IspPlacement[];
export type MessageContent = string;
export interface GetDeliverabilityTestReportResponse {
  DeliverabilityTestReport: DeliverabilityTestReport;
  OverallPlacement: PlacementStatistics;
  IspPlacements: IspPlacement[];
  Message?: string;
  Tags?: Tag[];
}
export type CampaignId = string;
export interface GetDomainDeliverabilityCampaignRequest {
  CampaignId: string;
}
export type ImageUrl = string;
export type Subject = string;
export type IpList = string[];
export type Volume = number;
export type Esp = string;
export type Esps = string[];
export interface DomainDeliverabilityCampaign {
  CampaignId?: string;
  ImageUrl?: string;
  Subject?: string;
  FromAddress?: string;
  SendingIps?: string[];
  FirstSeenDateTime?: Date;
  LastSeenDateTime?: Date;
  InboxCount?: number;
  SpamCount?: number;
  ReadRate?: number;
  DeleteRate?: number;
  ReadDeleteRate?: number;
  ProjectedVolume?: number;
  Esps?: string[];
}
export interface GetDomainDeliverabilityCampaignResponse {
  DomainDeliverabilityCampaign: DomainDeliverabilityCampaign;
}
export interface GetDomainStatisticsReportRequest {
  Domain: string;
  StartDate: Date;
  EndDate: Date;
}
export interface VolumeStatistics {
  InboxRawCount?: number;
  SpamRawCount?: number;
  ProjectedInbox?: number;
  ProjectedSpam?: number;
}
export interface DomainIspPlacement {
  IspName?: string;
  InboxRawCount?: number;
  SpamRawCount?: number;
  InboxPercentage?: number;
  SpamPercentage?: number;
}
export type DomainIspPlacements = DomainIspPlacement[];
export interface OverallVolume {
  VolumeStatistics?: VolumeStatistics;
  ReadRatePercent?: number;
  DomainIspPlacements?: DomainIspPlacement[];
}
export interface DailyVolume {
  StartDate?: Date;
  VolumeStatistics?: VolumeStatistics;
  DomainIspPlacements?: DomainIspPlacement[];
}
export type DailyVolumes = DailyVolume[];
export interface GetDomainStatisticsReportResponse {
  OverallVolume: OverallVolume;
  DailyVolumes: DailyVolume[];
}
export interface GetEmailIdentityRequest {
  EmailIdentity: string;
}
export type MailFromDomainName = string;
export type MailFromDomainStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "TEMPORARY_FAILURE"
  | (string & {});
export type BehaviorOnMxFailure =
  | "USE_DEFAULT_VALUE"
  | "REJECT_MESSAGE"
  | (string & {});
export interface MailFromAttributes {
  MailFromDomain: string;
  MailFromDomainStatus: MailFromDomainStatus;
  BehaviorOnMxFailure: BehaviorOnMxFailure;
}
export interface GetEmailIdentityResponse {
  IdentityType?: IdentityType;
  FeedbackForwardingStatus?: boolean;
  VerifiedForSendingStatus?: boolean;
  DkimAttributes?: DkimAttributes;
  MailFromAttributes?: MailFromAttributes;
  Tags?: Tag[];
}
export interface ListConfigurationSetsRequest {
  NextToken?: string;
  PageSize?: number;
}
export type ConfigurationSetNameList = string[];
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: string[];
  NextToken?: string;
}
export interface ListDedicatedIpPoolsRequest {
  NextToken?: string;
  PageSize?: number;
}
export type ListOfDedicatedIpPools = string[];
export interface ListDedicatedIpPoolsResponse {
  DedicatedIpPools?: string[];
  NextToken?: string;
}
export interface ListDeliverabilityTestReportsRequest {
  NextToken?: string;
  PageSize?: number;
}
export type DeliverabilityTestReports = DeliverabilityTestReport[];
export interface ListDeliverabilityTestReportsResponse {
  DeliverabilityTestReports: DeliverabilityTestReport[];
  NextToken?: string;
}
export interface ListDomainDeliverabilityCampaignsRequest {
  StartDate: Date;
  EndDate: Date;
  SubscribedDomain: string;
  NextToken?: string;
  PageSize?: number;
}
export type DomainDeliverabilityCampaignList = DomainDeliverabilityCampaign[];
export interface ListDomainDeliverabilityCampaignsResponse {
  DomainDeliverabilityCampaigns: DomainDeliverabilityCampaign[];
  NextToken?: string;
}
export interface ListEmailIdentitiesRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface IdentityInfo {
  IdentityType?: IdentityType;
  IdentityName?: string;
  SendingEnabled?: boolean;
}
export type IdentityInfoList = IdentityInfo[];
export interface ListEmailIdentitiesResponse {
  EmailIdentities?: IdentityInfo[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags: Tag[];
}
export interface PutAccountDedicatedIpWarmupAttributesRequest {
  AutoWarmupEnabled?: boolean;
}
export interface PutAccountDedicatedIpWarmupAttributesResponse {}
export interface PutAccountSendingAttributesRequest {
  SendingEnabled?: boolean;
}
export interface PutAccountSendingAttributesResponse {}
export type SendingPoolName = string;
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  TlsPolicy?: TlsPolicy;
  SendingPoolName?: string;
}
export interface PutConfigurationSetDeliveryOptionsResponse {}
export interface PutConfigurationSetReputationOptionsRequest {
  ConfigurationSetName: string;
  ReputationMetricsEnabled?: boolean;
}
export interface PutConfigurationSetReputationOptionsResponse {}
export interface PutConfigurationSetSendingOptionsRequest {
  ConfigurationSetName: string;
  SendingEnabled?: boolean;
}
export interface PutConfigurationSetSendingOptionsResponse {}
export interface PutConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  CustomRedirectDomain?: string;
}
export interface PutConfigurationSetTrackingOptionsResponse {}
export interface PutDedicatedIpInPoolRequest {
  Ip: string;
  DestinationPoolName: string;
}
export interface PutDedicatedIpInPoolResponse {}
export interface PutDedicatedIpWarmupAttributesRequest {
  Ip: string;
  WarmupPercentage: number;
}
export interface PutDedicatedIpWarmupAttributesResponse {}
export interface PutDeliverabilityDashboardOptionRequest {
  DashboardEnabled: boolean;
  SubscribedDomains?: DomainDeliverabilityTrackingOption[];
}
export interface PutDeliverabilityDashboardOptionResponse {}
export interface PutEmailIdentityDkimAttributesRequest {
  EmailIdentity: string;
  SigningEnabled?: boolean;
}
export interface PutEmailIdentityDkimAttributesResponse {}
export interface PutEmailIdentityFeedbackAttributesRequest {
  EmailIdentity: string;
  EmailForwardingEnabled?: boolean;
}
export interface PutEmailIdentityFeedbackAttributesResponse {}
export interface PutEmailIdentityMailFromAttributesRequest {
  EmailIdentity: string;
  MailFromDomain?: string;
  BehaviorOnMxFailure?: BehaviorOnMxFailure;
}
export interface PutEmailIdentityMailFromAttributesResponse {}
export type EmailAddressList = string[];
export interface Destination {
  ToAddresses?: string[];
  CcAddresses?: string[];
  BccAddresses?: string[];
}
export type MessageTagName = string;
export type MessageTagValue = string;
export interface MessageTag {
  Name: string;
  Value: string;
}
export type MessageTagList = MessageTag[];
export interface SendEmailRequest {
  FromEmailAddress?: string;
  Destination: Destination;
  ReplyToAddresses?: string[];
  FeedbackForwardingEmailAddress?: string;
  Content: EmailContent;
  EmailTags?: MessageTag[];
  ConfigurationSetName?: string;
}
export type OutboundMessageId = string;
export interface SendEmailResponse {
  MessageId?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export interface UpdateConfigurationSetEventDestinationResponse {}
export type ErrorMessage = string;
export type CreateConfigurationSetError =
  | AlreadyExistsException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a configuration set. *Configuration sets* are groups of
 * rules that you can apply to the emails you send using Amazon Pinpoint. You apply a configuration
 * set to an email by including a reference to the configuration set in the headers of the
 * email. When you apply a configuration set to an email, all of the rules in that
 * configuration set are applied to the email.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/email/configuration-sets",
    input: {
      ConfigurationSetName: 0,
      TrackingOptions: { CustomRedirectDomain: 0 },
      DeliveryOptions: { TlsPolicy: 0, SendingPoolName: 0 },
      ReputationOptions: { ReputationMetricsEnabled: 0, LastFreshStart: 0 },
      SendingOptions: { SendingEnabled: 0 },
      Tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
})) as any;

export type CreateConfigurationSetEventDestinationError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create an event destination. In Amazon Pinpoint, *events* include message
 * sends, deliveries, opens, clicks, bounces, and complaints. Event
 * destinations are places that you can send information about these events
 * to. For example, you can send event data to Amazon SNS to receive notifications when you
 * receive bounces or complaints, or you can use Amazon Kinesis Data Firehose to stream data to Amazon S3 for long-term
 * storage.
 *
 * A single configuration set can include more than one event destination.
 */
export const createConfigurationSetEventDestination: API.OperationMethod<
  CreateConfigurationSetEventDestinationRequest,
  CreateConfigurationSetEventDestinationResponse,
  CreateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/email/configuration-sets/{ConfigurationSetName}/event-destinations",
    input: {
      ConfigurationSetName: 0,
      EventDestinationName: 0,
      EventDestination: i_EventDestinationDefinition,
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetEventDestination",
})) as any;

export type CreateDedicatedIpPoolError =
  | AlreadyExistsException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new pool of dedicated IP addresses. A pool can include one or more dedicated
 * IP addresses that are associated with your Amazon Pinpoint account. You can associate a pool with
 * a configuration set. When you send an email that uses that configuration set, Amazon Pinpoint
 * sends it using only the IP addresses in the associated pool.
 */
export const createDedicatedIpPool: API.OperationMethod<
  CreateDedicatedIpPoolRequest,
  CreateDedicatedIpPoolResponse,
  CreateDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/email/dedicated-ip-pools",
    input: { PoolName: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDedicatedIpPool",
})) as any;

export type CreateDeliverabilityTestReportError =
  | AccountSuspendedException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new predictive inbox placement test. Predictive inbox placement tests can help you predict how your messages will be handled
 * by various email providers around the world. When you perform a predictive inbox placement test, you provide a
 * sample message that contains the content that you plan to send to your customers. Amazon Pinpoint
 * then sends that message to special email addresses spread across several major email
 * providers. After about 24 hours, the test is complete, and you can use the
 * `GetDeliverabilityTestReport` operation to view the results of the
 * test.
 */
export const createDeliverabilityTestReport: API.OperationMethod<
  CreateDeliverabilityTestReportRequest,
  CreateDeliverabilityTestReportResponse,
  CreateDeliverabilityTestReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/email/deliverability-dashboard/test",
    input: {
      ReportName: 0,
      FromEmailAddress: 0,
      Content: i_EmailContent,
      Tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AccountSuspendedException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    NotFoundException,
    SendingPausedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeliverabilityTestReport",
})) as any;

export type CreateEmailIdentityError =
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Verifies an email identity for use with Amazon Pinpoint. In Amazon Pinpoint, an identity is an email
 * address or domain that you use when you send email. Before you can use an identity to
 * send email with Amazon Pinpoint, you first have to verify it. By verifying an address, you
 * demonstrate that you're the owner of the address, and that you've given Amazon Pinpoint permission
 * to send email from the address.
 *
 * When you verify an email address, Amazon Pinpoint sends an email to the address. Your email
 * address is verified as soon as you follow the link in the verification email.
 *
 * When you verify a domain, this operation provides a set of DKIM tokens, which you can
 * convert into CNAME tokens. You add these CNAME tokens to the DNS configuration for your
 * domain. Your domain is verified when Amazon Pinpoint detects these records in the DNS
 * configuration for your domain. It usually takes around 72 hours to complete the domain
 * verification process.
 */
export const createEmailIdentity: API.OperationMethod<
  CreateEmailIdentityRequest,
  CreateEmailIdentityResponse,
  CreateEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/email/identities",
    input: { EmailIdentity: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailIdentity",
})) as any;

export type DeleteConfigurationSetError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an existing configuration set.
 *
 * In Amazon Pinpoint, *configuration sets* are groups of rules that you can
 * apply to the emails you send. You apply a configuration set to an email by including a
 * reference to the configuration set in the headers of the email. When you apply a
 * configuration set to an email, all of the rules in that configuration set are applied to
 * the email.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/email/configuration-sets/{ConfigurationSetName}",
    input: { ConfigurationSetName: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
})) as any;

export type DeleteConfigurationSetEventDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an event destination.
 *
 * In Amazon Pinpoint, *events* include message sends, deliveries, opens,
 * clicks, bounces, and complaints. *Event destinations* are places that
 * you can send information about these events to. For example, you can send event data to
 * Amazon SNS to receive notifications when you receive bounces or complaints, or you can use
 * Amazon Kinesis Data Firehose to stream data to Amazon S3 for long-term storage.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
    input: { ConfigurationSetName: 0, EventDestinationName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
})) as any;

export type DeleteDedicatedIpPoolError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a dedicated IP pool.
 */
export const deleteDedicatedIpPool: API.OperationMethod<
  DeleteDedicatedIpPoolRequest,
  DeleteDedicatedIpPoolResponse,
  DeleteDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/email/dedicated-ip-pools/{PoolName}",
    input: { PoolName: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDedicatedIpPool",
})) as any;

export type DeleteEmailIdentityError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an email identity that you previously verified for use with Amazon Pinpoint. An identity
 * can be either an email address or a domain name.
 */
export const deleteEmailIdentity: API.OperationMethod<
  DeleteEmailIdentityRequest,
  DeleteEmailIdentityResponse,
  DeleteEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/email/identities/{EmailIdentity}",
    input: { EmailIdentity: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailIdentity",
})) as any;

export type GetAccountError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Obtain information about the email-sending status and capabilities of your Amazon Pinpoint
 * account in the current AWS Region.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest,
  GetAccountResponse,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /v1/email/account", input: {} },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
})) as any;

export type GetBlacklistReportsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the blacklists that your dedicated IP addresses appear on.
 */
export const getBlacklistReports: API.OperationMethod<
  GetBlacklistReportsRequest,
  GetBlacklistReportsResponse,
  GetBlacklistReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/deliverability-dashboard/blacklist-report",
    input: { BlacklistItemNames: D.m({ query: "BlacklistItemNames" }) },
    output: { BlacklistReport: D.map(D.list({ ListingTime: D.ts })) },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlacklistReports",
})) as any;

export type GetConfigurationSetError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get information about an existing configuration set, including the dedicated IP pool
 * that it's associated with, whether or not it's enabled for sending email, and
 * more.
 *
 * In Amazon Pinpoint, *configuration sets* are groups of rules that you can
 * apply to the emails you send. You apply a configuration set to an email by including a
 * reference to the configuration set in the headers of the email. When you apply a
 * configuration set to an email, all of the rules in that configuration set are applied to
 * the email.
 */
export const getConfigurationSet: API.OperationMethod<
  GetConfigurationSetRequest,
  GetConfigurationSetResponse,
  GetConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/configuration-sets/{ConfigurationSetName}",
    input: { ConfigurationSetName: 0 },
    output: { ReputationOptions: { LastFreshStart: D.ts } },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSet",
})) as any;

export type GetConfigurationSetEventDestinationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of event destinations that are associated with a configuration
 * set.
 *
 * In Amazon Pinpoint, *events* include message sends, deliveries, opens,
 * clicks, bounces, and complaints. *Event destinations* are places that
 * you can send information about these events to. For example, you can send event data to
 * Amazon SNS to receive notifications when you receive bounces or complaints, or you can use
 * Amazon Kinesis Data Firehose to stream data to Amazon S3 for long-term storage.
 */
export const getConfigurationSetEventDestinations: API.OperationMethod<
  GetConfigurationSetEventDestinationsRequest,
  GetConfigurationSetEventDestinationsResponse,
  GetConfigurationSetEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/configuration-sets/{ConfigurationSetName}/event-destinations",
    input: { ConfigurationSetName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
})) as any;

export type GetDedicatedIpError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get information about a dedicated IP address, including the name of the dedicated IP
 * pool that it's associated with, as well information about the automatic warm-up process
 * for the address.
 */
export const getDedicatedIp: API.OperationMethod<
  GetDedicatedIpRequest,
  GetDedicatedIpResponse,
  GetDedicatedIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/dedicated-ips/{Ip}",
    input: { Ip: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIp",
})) as any;

export type GetDedicatedIpsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the dedicated IP addresses that are associated with your Amazon Pinpoint
 * account.
 */
export const getDedicatedIps: API.PaginatedOperationMethod<
  GetDedicatedIpsRequest,
  GetDedicatedIpsResponse,
  GetDedicatedIpsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/dedicated-ips",
    input: {
      PoolName: D.m({ query: "PoolName" }),
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetDeliverabilityDashboardOptionsError =
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about the status of the Deliverability dashboard for your Amazon Pinpoint account.
 * When the Deliverability dashboard is enabled, you gain access to reputation, deliverability, and
 * other metrics for the domains that you use to send email using Amazon Pinpoint. You also gain the
 * ability to perform predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon Pinpoint. For more information about the
 * features and cost of a Deliverability dashboard subscription, see Amazon Pinpoint Pricing.
 */
export const getDeliverabilityDashboardOptions: API.OperationMethod<
  GetDeliverabilityDashboardOptionsRequest,
  GetDeliverabilityDashboardOptionsResponse,
  GetDeliverabilityDashboardOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/deliverability-dashboard",
    input: {},
    output: {
      SubscriptionExpiryDate: D.ts,
      ActiveSubscribedDomains: D.list(o_DomainDeliverabilityTrackingOption),
      PendingExpirationSubscribedDomains: D.list(
        o_DomainDeliverabilityTrackingOption,
      ),
    },
  },
  errors: [
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityDashboardOptions",
})) as any;

export type GetDeliverabilityTestReportError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the results of a predictive inbox placement test.
 */
export const getDeliverabilityTestReport: API.OperationMethod<
  GetDeliverabilityTestReportRequest,
  GetDeliverabilityTestReportResponse,
  GetDeliverabilityTestReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/deliverability-dashboard/test-reports/{ReportId}",
    input: { ReportId: 0 },
    output: { DeliverabilityTestReport: o_DeliverabilityTestReport },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityTestReport",
})) as any;

export type GetDomainDeliverabilityCampaignError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve all the deliverability data for a specific campaign. This data is available
 * for a campaign only if the campaign sent email by using a domain that the
 * Deliverability dashboard is enabled for (`PutDeliverabilityDashboardOption`
 * operation).
 */
export const getDomainDeliverabilityCampaign: API.OperationMethod<
  GetDomainDeliverabilityCampaignRequest,
  GetDomainDeliverabilityCampaignResponse,
  GetDomainDeliverabilityCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/deliverability-dashboard/campaigns/{CampaignId}",
    input: { CampaignId: 0 },
    output: { DomainDeliverabilityCampaign: o_DomainDeliverabilityCampaign },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainDeliverabilityCampaign",
})) as any;

export type GetDomainStatisticsReportError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve inbox placement and engagement rates for the domains that you use to send
 * email.
 */
export const getDomainStatisticsReport: API.OperationMethod<
  GetDomainStatisticsReportRequest,
  GetDomainStatisticsReportResponse,
  GetDomainStatisticsReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/deliverability-dashboard/statistics-report/{Domain}",
    input: {
      Domain: 0,
      StartDate: D.m({ query: "StartDate", shape: D.tsAs("epoch-seconds") }),
      EndDate: D.m({ query: "EndDate", shape: D.tsAs("epoch-seconds") }),
    },
    output: { DailyVolumes: D.list({ StartDate: D.ts }) },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainStatisticsReport",
})) as any;

export type GetEmailIdentityError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about a specific identity associated with your Amazon Pinpoint account,
 * including the identity's verification status, its DKIM authentication status, and its
 * custom Mail-From settings.
 */
export const getEmailIdentity: API.OperationMethod<
  GetEmailIdentityRequest,
  GetEmailIdentityResponse,
  GetEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/identities/{EmailIdentity}",
    input: { EmailIdentity: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentity",
})) as any;

export type ListConfigurationSetsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the configuration sets associated with your Amazon Pinpoint account in the current
 * region.
 *
 * In Amazon Pinpoint, *configuration sets* are groups of rules that you can
 * apply to the emails you send. You apply a configuration set to an email by including a
 * reference to the configuration set in the headers of the email. When you apply a
 * configuration set to an email, all of the rules in that configuration set are applied to
 * the email.
 */
export const listConfigurationSets: API.PaginatedOperationMethod<
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/configuration-sets",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDedicatedIpPoolsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the dedicated IP pools that exist in your Amazon Pinpoint account in the current
 * AWS Region.
 */
export const listDedicatedIpPools: API.PaginatedOperationMethod<
  ListDedicatedIpPoolsRequest,
  ListDedicatedIpPoolsResponse,
  ListDedicatedIpPoolsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/dedicated-ip-pools",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDedicatedIpPools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDeliverabilityTestReportsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Show a list of the predictive inbox placement tests that you've performed, regardless of their statuses. For
 * predictive inbox placement tests that are complete, you can use the `GetDeliverabilityTestReport`
 * operation to view the results.
 */
export const listDeliverabilityTestReports: API.PaginatedOperationMethod<
  ListDeliverabilityTestReportsRequest,
  ListDeliverabilityTestReportsResponse,
  ListDeliverabilityTestReportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/deliverability-dashboard/test-reports",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
    output: { DeliverabilityTestReports: D.list(o_DeliverabilityTestReport) },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeliverabilityTestReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDomainDeliverabilityCampaignsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve deliverability data for all the campaigns that used a specific domain to send
 * email during a specified time range. This data is available for a domain only if you
 * enabled the Deliverability dashboard (`PutDeliverabilityDashboardOption` operation)
 * for the domain.
 */
export const listDomainDeliverabilityCampaigns: API.PaginatedOperationMethod<
  ListDomainDeliverabilityCampaignsRequest,
  ListDomainDeliverabilityCampaignsResponse,
  ListDomainDeliverabilityCampaignsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/deliverability-dashboard/domains/{SubscribedDomain}/campaigns",
    input: {
      StartDate: D.m({ query: "StartDate", shape: D.tsAs("epoch-seconds") }),
      EndDate: D.m({ query: "EndDate", shape: D.tsAs("epoch-seconds") }),
      SubscribedDomain: 0,
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
    output: {
      DomainDeliverabilityCampaigns: D.list(o_DomainDeliverabilityCampaign),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainDeliverabilityCampaigns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListEmailIdentitiesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of all of the email identities that are associated with your Amazon Pinpoint
 * account. An identity can be either an email address or a domain. This operation returns
 * identities that are verified as well as those that aren't.
 */
export const listEmailIdentities: API.PaginatedOperationMethod<
  ListEmailIdentitiesRequest,
  ListEmailIdentitiesResponse,
  ListEmailIdentitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/identities",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the tags (keys and values) that are associated with a specified
 * resource. A *tag* is a label that you optionally define and associate
 * with a resource in Amazon Pinpoint. Each tag consists of a required tag
 * key and an optional associated *tag value*. A tag key
 * is a general label that acts as a category for more specific tag values. A tag value
 * acts as a descriptor within a tag key.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/email/tags",
    input: { ResourceArn: D.m({ query: "ResourceArn" }) },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutAccountDedicatedIpWarmupAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the automatic warm-up feature for dedicated IP addresses.
 */
export const putAccountDedicatedIpWarmupAttributes: API.OperationMethod<
  PutAccountDedicatedIpWarmupAttributesRequest,
  PutAccountDedicatedIpWarmupAttributesResponse,
  PutAccountDedicatedIpWarmupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/account/dedicated-ips/warmup",
    input: { AutoWarmupEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDedicatedIpWarmupAttributes",
})) as any;

export type PutAccountSendingAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the ability of your account to send email.
 */
export const putAccountSendingAttributes: API.OperationMethod<
  PutAccountSendingAttributesRequest,
  PutAccountSendingAttributesResponse,
  PutAccountSendingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/account/sending",
    input: { SendingEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSendingAttributes",
})) as any;

export type PutConfigurationSetDeliveryOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associate a configuration set with a dedicated IP pool. You can use dedicated IP pools
 * to create groups of dedicated IP addresses for sending specific types of email.
 */
export const putConfigurationSetDeliveryOptions: API.OperationMethod<
  PutConfigurationSetDeliveryOptionsRequest,
  PutConfigurationSetDeliveryOptionsResponse,
  PutConfigurationSetDeliveryOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/configuration-sets/{ConfigurationSetName}/delivery-options",
    input: { ConfigurationSetName: 0, TlsPolicy: 0, SendingPoolName: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetDeliveryOptions",
})) as any;

export type PutConfigurationSetReputationOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable collection of reputation metrics for emails that you send using a
 * particular configuration set in a specific AWS Region.
 */
export const putConfigurationSetReputationOptions: API.OperationMethod<
  PutConfigurationSetReputationOptionsRequest,
  PutConfigurationSetReputationOptionsResponse,
  PutConfigurationSetReputationOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/configuration-sets/{ConfigurationSetName}/reputation-options",
    input: { ConfigurationSetName: 0, ReputationMetricsEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetReputationOptions",
})) as any;

export type PutConfigurationSetSendingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable email sending for messages that use a particular configuration set
 * in a specific AWS Region.
 */
export const putConfigurationSetSendingOptions: API.OperationMethod<
  PutConfigurationSetSendingOptionsRequest,
  PutConfigurationSetSendingOptionsResponse,
  PutConfigurationSetSendingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/configuration-sets/{ConfigurationSetName}/sending",
    input: { ConfigurationSetName: 0, SendingEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSendingOptions",
})) as any;

export type PutConfigurationSetTrackingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Specify a custom domain to use for open and click tracking elements in email that you
 * send using Amazon Pinpoint.
 */
export const putConfigurationSetTrackingOptions: API.OperationMethod<
  PutConfigurationSetTrackingOptionsRequest,
  PutConfigurationSetTrackingOptionsResponse,
  PutConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/configuration-sets/{ConfigurationSetName}/tracking-options",
    input: { ConfigurationSetName: 0, CustomRedirectDomain: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetTrackingOptions",
})) as any;

export type PutDedicatedIpInPoolError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Move a dedicated IP address to an existing dedicated IP pool.
 *
 * The dedicated IP address that you specify must already exist, and must be
 * associated with your Amazon Pinpoint account.
 *
 * The dedicated IP pool you specify must already exist. You can create a new pool by
 * using the `CreateDedicatedIpPool` operation.
 */
export const putDedicatedIpInPool: API.OperationMethod<
  PutDedicatedIpInPoolRequest,
  PutDedicatedIpInPoolResponse,
  PutDedicatedIpInPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/dedicated-ips/{Ip}/pool",
    input: { Ip: 0, DestinationPoolName: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpInPool",
})) as any;

export type PutDedicatedIpWarmupAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 *
 */
export const putDedicatedIpWarmupAttributes: API.OperationMethod<
  PutDedicatedIpWarmupAttributesRequest,
  PutDedicatedIpWarmupAttributesResponse,
  PutDedicatedIpWarmupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/dedicated-ips/{Ip}/warmup",
    input: { Ip: 0, WarmupPercentage: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpWarmupAttributes",
})) as any;

export type PutDeliverabilityDashboardOptionError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the Deliverability dashboard for your Amazon Pinpoint account. When you enable the
 * Deliverability dashboard, you gain access to reputation, deliverability, and other metrics for
 * the domains that you use to send email using Amazon Pinpoint. You also gain the ability to perform
 * predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon Pinpoint. For more information about the
 * features and cost of a Deliverability dashboard subscription, see Amazon Pinpoint Pricing.
 */
export const putDeliverabilityDashboardOption: API.OperationMethod<
  PutDeliverabilityDashboardOptionRequest,
  PutDeliverabilityDashboardOptionResponse,
  PutDeliverabilityDashboardOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/deliverability-dashboard",
    input: {
      DashboardEnabled: 0,
      SubscribedDomains: D.list({
        Domain: 0,
        SubscriptionStartDate: 0,
        InboxPlacementTrackingOption: { Global: 0, TrackedIsps: 0 },
      }),
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeliverabilityDashboardOption",
})) as any;

export type PutEmailIdentityDkimAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable DKIM authentication for an email identity.
 */
export const putEmailIdentityDkimAttributes: API.OperationMethod<
  PutEmailIdentityDkimAttributesRequest,
  PutEmailIdentityDkimAttributesResponse,
  PutEmailIdentityDkimAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/identities/{EmailIdentity}/dkim",
    input: { EmailIdentity: 0, SigningEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimAttributes",
})) as any;

export type PutEmailIdentityFeedbackAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable feedback forwarding for an identity. This setting determines
 * what happens when an identity is used to send an email that results in a bounce or
 * complaint event.
 *
 * When you enable feedback forwarding, Amazon Pinpoint sends you email notifications when bounce
 * or complaint events occur. Amazon Pinpoint sends this notification to the address that you
 * specified in the Return-Path header of the original email.
 *
 * When you disable feedback forwarding, Amazon Pinpoint sends notifications through other
 * mechanisms, such as by notifying an Amazon SNS topic. You're required to have a method of
 * tracking bounces and complaints. If you haven't set up another mechanism for receiving
 * bounce or complaint notifications, Amazon Pinpoint sends an email notification when these events
 * occur (even if this setting is disabled).
 */
export const putEmailIdentityFeedbackAttributes: API.OperationMethod<
  PutEmailIdentityFeedbackAttributesRequest,
  PutEmailIdentityFeedbackAttributesResponse,
  PutEmailIdentityFeedbackAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/identities/{EmailIdentity}/feedback",
    input: { EmailIdentity: 0, EmailForwardingEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityFeedbackAttributes",
})) as any;

export type PutEmailIdentityMailFromAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable the custom Mail-From domain configuration for an email
 * identity.
 */
export const putEmailIdentityMailFromAttributes: API.OperationMethod<
  PutEmailIdentityMailFromAttributesRequest,
  PutEmailIdentityMailFromAttributesResponse,
  PutEmailIdentityMailFromAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/identities/{EmailIdentity}/mail-from",
    input: { EmailIdentity: 0, MailFromDomain: 0, BehaviorOnMxFailure: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityMailFromAttributes",
})) as any;

export type SendEmailError =
  | AccountSuspendedException
  | BadRequestException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends an email message. You can use the Amazon Pinpoint Email API to send two types of
 * messages:
 *
 * - **Simple** – A standard email message. When
 * you create this type of message, you specify the sender, the recipient, and the
 * message body, and Amazon Pinpoint assembles the message for you.
 *
 * - **Raw** – A raw, MIME-formatted email
 * message. When you send this type of email, you have to specify all of the
 * message headers, as well as the message body. You can use this message type to
 * send messages that contain attachments. The message that you specify has to be a
 * valid MIME message.
 */
export const sendEmail: API.OperationMethod<
  SendEmailRequest,
  SendEmailResponse,
  SendEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/email/outbound-emails",
    input: {
      FromEmailAddress: 0,
      Destination: { ToAddresses: 0, CcAddresses: 0, BccAddresses: 0 },
      ReplyToAddresses: 0,
      FeedbackForwardingEmailAddress: 0,
      Content: i_EmailContent,
      EmailTags: D.list({ Name: 0, Value: 0 }),
      ConfigurationSetName: 0,
    },
    body: true,
  },
  errors: [
    AccountSuspendedException,
    BadRequestException,
    LimitExceededException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    NotFoundException,
    SendingPausedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEmail",
})) as any;

export type TagResourceError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Add one or more tags (keys and values) to a specified resource. A
 * *tag* is a label that you optionally define and associate with a
 * resource in Amazon Pinpoint. Tags can help you categorize and manage resources in different ways,
 * such as by purpose, owner, environment, or other criteria. A resource can have as many
 * as 50 tags.
 *
 * Each tag consists of a required *tag key* and an
 * associated *tag value*, both of which you define. A tag key is a
 * general label that acts as a category for more specific tag values. A tag value acts as
 * a descriptor within a tag key.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/email/tags",
    input: { ResourceArn: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Remove one or more tags (keys and values) from a specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/email/tags",
    input: {
      ResourceArn: D.m({ query: "ResourceArn" }),
      TagKeys: D.m({ query: "TagKeys" }),
    },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateConfigurationSetEventDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the configuration of an event destination for a configuration set.
 *
 * In Amazon Pinpoint, *events* include message sends, deliveries, opens,
 * clicks, bounces, and complaints. *Event destinations* are places that
 * you can send information about these events to. For example, you can send event data to
 * Amazon SNS to receive notifications when you receive bounces or complaints, or you can use
 * Amazon Kinesis Data Firehose to stream data to Amazon S3 for long-term storage.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
    input: {
      ConfigurationSetName: 0,
      EventDestinationName: 0,
      EventDestination: i_EventDestinationDefinition,
    },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
})) as any;

const i_EmailContent: D.LazyStruct = () => ({
  Simple: { Subject: i_Content, Body: { Text: i_Content, Html: i_Content } },
  Raw: { Data: 0 },
  Template: { TemplateArn: 0, TemplateData: 0 },
});
const i_EventDestinationDefinition: D.LazyStruct = () => ({
  Enabled: 0,
  MatchingEventTypes: 0,
  KinesisFirehoseDestination: { IamRoleArn: 0, DeliveryStreamArn: 0 },
  CloudWatchDestination: {
    DimensionConfigurations: D.list({
      DimensionName: 0,
      DimensionValueSource: 0,
      DefaultDimensionValue: 0,
    }),
  },
  SnsDestination: { TopicArn: 0 },
  PinpointDestination: { ApplicationArn: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_DeliverabilityTestReport: D.LazyStruct = () => ({ CreateDate: D.ts });
const o_DomainDeliverabilityCampaign: D.LazyStruct = () => ({
  FirstSeenDateTime: D.ts,
  LastSeenDateTime: D.ts,
});
const o_DomainDeliverabilityTrackingOption: D.LazyStruct = () => ({
  SubscriptionStartDate: D.ts,
});
const i_Content: D.LazyStruct = () => ({ Data: 0, Charset: 0 });
