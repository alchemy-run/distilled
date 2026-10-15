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
  sdkId: "Pinpoint Email",
  serviceShapeName: "AmazonPinpointEmailService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ses" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-07-26");
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
              `https://email-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://email-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://email.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://email.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://email.{R}.{D}","properties":{},"headers":{}}');

export class AccountSuspendedException
  extends /*@__PURE__*/ S.TaggedError<AccountSuspendedException>()(
    "AccountSuspendedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MailFromDomainNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<MailFromDomainNotVerifiedException>()(
    "MailFromDomainNotVerifiedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MessageRejected
  extends /*@__PURE__*/ S.TaggedError<MessageRejected>()(
    "MessageRejected",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SendingPausedException
  extends /*@__PURE__*/ S.TaggedError<SendingPausedException>()(
    "SendingPausedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
export type DimensionValueSource = "MESSAGE_TAG" | "EMAIL_HEADER" | "LINK_TAG" | (string & {});
export type DefaultDimensionValue = string;
export interface CloudWatchDimensionConfiguration {
  DimensionName: string;
  DimensionValueSource: DimensionValueSource;
  DefaultDimensionValue: string;
}
export type CloudWatchDimensionConfigurations = CloudWatchDimensionConfiguration[];
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
export type DeliverabilityTestStatus = "IN_PROGRESS" | "COMPLETED" | (string & {});
export interface CreateDeliverabilityTestReportResponse {
  ReportId: string;
  DeliverabilityTestStatus: DeliverabilityTestStatus;
}
export type Identity = string;
export interface CreateEmailIdentityRequest {
  EmailIdentity: string;
  Tags?: Tag[];
}
export type IdentityType = "EMAIL_ADDRESS" | "DOMAIN" | "MANAGED_DOMAIN" | (string & {});
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
export type DomainDeliverabilityTrackingOptions = DomainDeliverabilityTrackingOption[];
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
export type BehaviorOnMxFailure = "USE_DEFAULT_VALUE" | "REJECT_MESSAGE" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateConfigurationSetRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateConfigurationSetResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<CreateConfigurationSetEventDestinationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateConfigurationSetEventDestinationResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<CreateDedicatedIpPoolRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateDedicatedIpPoolResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<CreateDeliverabilityTestReportRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<CreateDeliverabilityTestReportResponse>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<CreateEmailIdentityRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<CreateEmailIdentityResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailIdentity",
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<DeleteConfigurationSetRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteConfigurationSetResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<DeleteConfigurationSetEventDestinationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteConfigurationSetEventDestinationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<DeleteDedicatedIpPoolRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteDedicatedIpPoolResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDedicatedIpPool",
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<DeleteEmailIdentityRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteEmailIdentityResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailIdentity",
}));

export type GetAccountError = BadRequestException | TooManyRequestsException | CommonErrors;
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
  input: __S(136, __c17, 0) as any as S.Schema<GetAccountRequest>,
  output: __S(138, __c17, 2) as any as S.Schema<GetAccountResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<GetBlacklistReportsRequest>,
  output: __S(148, __c18, 4) as any as S.Schema<GetBlacklistReportsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlacklistReports",
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<GetConfigurationSetRequest>,
  output: __S(153, __c19, 1) as any as S.Schema<GetConfigurationSetResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSet",
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<GetConfigurationSetEventDestinationsRequest>,
  output: __S(163, __c20, 3) as any as S.Schema<GetConfigurationSetEventDestinationsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<GetDedicatedIpRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<GetDedicatedIpResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIp",
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<GetDedicatedIpsRequest>,
  output: __S(186, __c23, 2) as any as S.Schema<GetDedicatedIpsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIps",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
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
  input: __S(192, __c24, 0) as any as S.Schema<GetDeliverabilityDashboardOptionsRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<GetDeliverabilityDashboardOptionsResponse>,
  errors: [BadRequestException, LimitExceededException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityDashboardOptions",
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<GetDeliverabilityTestReportRequest>,
  output: __S(212, __c26, 4) as any as S.Schema<GetDeliverabilityTestReportResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityTestReport",
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<GetDomainDeliverabilityCampaignRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<GetDomainDeliverabilityCampaignResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainDeliverabilityCampaign",
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<GetDomainStatisticsReportRequest>,
  output: __S(247, __c30, 7) as any as S.Schema<GetDomainStatisticsReportResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainStatisticsReport",
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<GetEmailIdentityRequest>,
  output: __S(250, __c31, 2) as any as S.Schema<GetEmailIdentityResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentity",
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<ListConfigurationSetsRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<ListConfigurationSetsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
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
  input: __S(264, __c33, 0) as any as S.Schema<ListDedicatedIpPoolsRequest>,
  output: __S(265, __c33, 1) as any as S.Schema<ListDedicatedIpPoolsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDedicatedIpPools",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
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
  input: __S(272, __c34, 0) as any as S.Schema<ListDeliverabilityTestReportsRequest>,
  output: __S(274, __c34, 2) as any as S.Schema<ListDeliverabilityTestReportsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeliverabilityTestReports",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
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
  input: __S(280, __c35, 0) as any as S.Schema<ListDomainDeliverabilityCampaignsRequest>,
  output: __S(282, __c35, 2) as any as S.Schema<ListDomainDeliverabilityCampaignsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainDeliverabilityCampaigns",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
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
  input: __S(288, __c36, 0) as any as S.Schema<ListEmailIdentitiesRequest>,
  output: __S(291, __c36, 3) as any as S.Schema<ListEmailIdentitiesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailIdentities",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
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
  input: __S(296, __c37, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<PutAccountDedicatedIpWarmupAttributesRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutAccountDedicatedIpWarmupAttributesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDedicatedIpWarmupAttributes",
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<PutAccountSendingAttributesRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutAccountSendingAttributesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSendingAttributes",
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<PutConfigurationSetDeliveryOptionsRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutConfigurationSetDeliveryOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetDeliveryOptions",
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<PutConfigurationSetReputationOptionsRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutConfigurationSetReputationOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetReputationOptions",
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<PutConfigurationSetSendingOptionsRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutConfigurationSetSendingOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSendingOptions",
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<PutConfigurationSetTrackingOptionsRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutConfigurationSetTrackingOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetTrackingOptions",
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<PutDedicatedIpInPoolRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutDedicatedIpInPoolResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpInPool",
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<PutDedicatedIpWarmupAttributesRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutDedicatedIpWarmupAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpWarmupAttributes",
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<PutDeliverabilityDashboardOptionRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutDeliverabilityDashboardOptionResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<PutEmailIdentityDkimAttributesRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutEmailIdentityDkimAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimAttributes",
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<PutEmailIdentityFeedbackAttributesRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutEmailIdentityFeedbackAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityFeedbackAttributes",
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<PutEmailIdentityMailFromAttributesRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutEmailIdentityMailFromAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityMailFromAttributes",
}));

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
 * - **Simple** - A standard email message. When
 * you create this type of message, you specify the sender, the recipient, and the
 * message body, and Amazon Pinpoint assembles the message for you.
 *
 * - **Raw** - A raw, MIME-formatted email
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
  input: __S(403, __c50, 3) as any as S.Schema<SendEmailRequest>,
  output: __S(404, __c50, 4) as any as S.Schema<SendEmailResponse>,
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
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<UpdateConfigurationSetEventDestinationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateConfigurationSetEventDestinationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String,
          TrackingOptions: S.optional(__S(24, __c3, 0)),
          DeliveryOptions: S.optional(__S(25, __c3, 1)),
          ReputationOptions: S.optional(__S(26, __c3, 2)),
          SendingOptions: S.optional(__S(27, __c3, 3)),
          Tags: S.optional(__S(17, __c2, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/email/configuration-sets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfigurationSetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CreateConfigurationSetResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(16, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CustomRedirectDomain: S.String })).annotate({
        identifier: "TrackingOptions",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ TlsPolicy: S.optional(S.String), SendingPoolName: S.optional(S.String) }),
      ).annotate({ identifier: "DeliveryOptions" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReputationMetricsEnabled: S.optional(S.Boolean),
          LastFreshStart: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ReputationOptions" });
    case 3:
      return S.suspend(() => S.Struct({ SendingEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "SendingOptions",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          EventDestinationName: S.String,
          EventDestination: __S(48, __c6, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}/event-destinations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfigurationSetEventDestinationRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ IamRoleArn: S.String, DeliveryStreamArn: S.String }),
      ).annotate({ identifier: "KinesisFirehoseDestination" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DimensionName: S.String,
          DimensionValueSource: S.String,
          DefaultDimensionValue: S.String,
        }),
      ).annotate({ identifier: "CloudWatchDimensionConfiguration" });
    case 3:
      return S.Array(__S(42, __c5, 2));
    case 4:
      return S.suspend(() => S.Struct({ DimensionConfigurations: __S(43, __c5, 3) })).annotate({
        identifier: "CloudWatchDestination",
      });
    case 5:
      return S.suspend(() => S.Struct({ TopicArn: S.String })).annotate({
        identifier: "SnsDestination",
      });
    case 6:
      return S.suspend(() => S.Struct({ ApplicationArn: S.optional(S.String) })).annotate({
        identifier: "PinpointDestination",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          MatchingEventTypes: S.optional(__S(40, __c5, 0)),
          KinesisFirehoseDestination: S.optional(__S(41, __c5, 1)),
          CloudWatchDestination: S.optional(__S(44, __c5, 4)),
          SnsDestination: S.optional(__S(45, __c5, 5)),
          PinpointDestination: S.optional(__S(46, __c5, 6)),
        }),
      ).annotate({ identifier: "EventDestinationDefinition" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PoolName: S.String, Tags: S.optional(__S(17, __c2, 1)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/email/dedicated-ip-pools" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDedicatedIpPoolRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportName: S.optional(S.String),
          FromEmailAddress: S.String,
          Content: __S(77, __c9, 5),
          Tags: S.optional(__S(17, __c2, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/email/deliverability-dashboard/test" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeliverabilityTestReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReportId: S.String, DeliverabilityTestStatus: S.String }),
      ).annotate({ identifier: "CreateDeliverabilityTestReportResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Data: S.String, Charset: S.optional(S.String) })).annotate({
        identifier: "Content",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(__S(72, __c9, 0)), Html: S.optional(__S(72, __c9, 0)) }),
      ).annotate({ identifier: "Body" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Subject: __S(72, __c9, 0), Body: __S(73, __c9, 1) }),
      ).annotate({ identifier: "Message" });
    case 3:
      return S.suspend(() => S.Struct({ Data: T.Blob })).annotate({ identifier: "RawMessage" });
    case 4:
      return S.suspend(() =>
        S.Struct({ TemplateArn: S.optional(S.String), TemplateData: S.optional(S.String) }),
      ).annotate({ identifier: "Template" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Simple: S.optional(__S(74, __c9, 2)),
          Raw: S.optional(__S(75, __c9, 3)),
          Template: S.optional(__S(76, __c9, 4)),
        }),
      ).annotate({ identifier: "EmailContent" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailIdentity: S.String, Tags: S.optional(__S(17, __c2, 1)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/email/identities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEmailIdentityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityType: S.optional(S.String),
          VerifiedForSendingStatus: S.optional(S.Boolean),
          DkimAttributes: S.optional(__S(96, __c12, 0)),
        }),
      ).annotate({ identifier: "CreateEmailIdentityResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SigningEnabled: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Tokens: S.optional(__S(88, __c11, 0)),
        }),
      ).annotate({ identifier: "DkimAttributes" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigurationSetRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigurationSetEventDestinationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PoolName: S.String.pipe(T.HttpLabel("PoolName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/email/dedicated-ip-pools/{PoolName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDedicatedIpPoolRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/email/identities/{EmailIdentity}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEmailIdentityRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/email/account" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Max24HourSend: S.optional(S.Number),
          MaxSendRate: S.optional(S.Number),
          SentLast24Hours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SendQuota" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SendQuota: S.optional(__S(137, __c17, 1)),
          SendingEnabled: S.optional(S.Boolean),
          DedicatedIpAutoWarmupEnabled: S.optional(S.Boolean),
          EnforcementStatus: S.optional(S.String),
          ProductionAccessEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetAccountResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlacklistItemNames: __S(88, __c11, 0).pipe(T.HttpQuery("BlacklistItemNames")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/deliverability-dashboard/blacklist-report" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBlacklistReportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RblName: S.optional(S.String),
          ListingTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "BlacklistEntry" });
    case 2:
      return S.Array(__S(145, __c18, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(146, __c18, 2).pipe(S.optional));
    case 4:
      return S.suspend(() => S.Struct({ BlacklistReport: __S(147, __c18, 3) })).annotate({
        identifier: "GetBlacklistReportsResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/configuration-sets/{ConfigurationSetName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.optional(S.String),
          TrackingOptions: S.optional(__S(24, __c3, 0)),
          DeliveryOptions: S.optional(__S(25, __c3, 1)),
          ReputationOptions: S.optional(__S(26, __c3, 2)),
          SendingOptions: S.optional(__S(27, __c3, 3)),
          Tags: S.optional(__S(17, __c2, 1)),
        }),
      ).annotate({ identifier: "GetConfigurationSetResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}/event-destinations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationSetEventDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Enabled: S.optional(S.Boolean),
          MatchingEventTypes: __S(40, __c5, 0),
          KinesisFirehoseDestination: S.optional(__S(41, __c5, 1)),
          CloudWatchDestination: S.optional(__S(44, __c5, 4)),
          SnsDestination: S.optional(__S(45, __c5, 5)),
          PinpointDestination: S.optional(__S(46, __c5, 6)),
        }),
      ).annotate({ identifier: "EventDestination" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ EventDestinations: S.optional(__S(162, __c20, 2)) }),
      ).annotate({ identifier: "GetConfigurationSetEventDestinationsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Ip: S.String.pipe(T.HttpLabel("Ip")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/dedicated-ips/{Ip}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDedicatedIpRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DedicatedIp: S.optional(__S(176, __c22, 0)) })).annotate({
        identifier: "GetDedicatedIpResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Ip: S.String,
          WarmupStatus: S.String,
          WarmupPercentage: S.Number,
          PoolName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DedicatedIp" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolName: S.optional(S.String).pipe(T.HttpQuery("PoolName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/dedicated-ips" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDedicatedIpsRequest" });
    case 1:
      return S.Array(__S(176, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ DedicatedIps: S.optional(__S(185, __c23, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetDedicatedIpsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/deliverability-dashboard" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeliverabilityDashboardOptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DashboardEnabled: S.Boolean,
          SubscriptionExpiryDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AccountStatus: S.optional(S.String),
          ActiveSubscribedDomains: S.optional(__S(202, __c25, 2)),
          PendingExpirationSubscribedDomains: S.optional(__S(202, __c25, 2)),
        }),
      ).annotate({ identifier: "GetDeliverabilityDashboardOptionsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Global: S.optional(S.Boolean), TrackedIsps: S.optional(__S(88, __c11, 0)) }),
      ).annotate({ identifier: "InboxPlacementTrackingOption" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          SubscriptionStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InboxPlacementTrackingOption: S.optional(__S(200, __c25, 0)),
        }),
      ).annotate({ identifier: "DomainDeliverabilityTrackingOption" });
    case 2:
      return S.Array(__S(201, __c25, 1));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportId: S.String.pipe(T.HttpLabel("ReportId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/email/deliverability-dashboard/test-reports/{ReportId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeliverabilityTestReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InboxPercentage: S.optional(S.Number),
          SpamPercentage: S.optional(S.Number),
          MissingPercentage: S.optional(S.Number),
          SpfPercentage: S.optional(S.Number),
          DkimPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PlacementStatistics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IspName: S.optional(S.String),
          PlacementStatistics: S.optional(__S(209, __c26, 1)),
        }),
      ).annotate({ identifier: "IspPlacement" });
    case 3:
      return S.Array(__S(210, __c26, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          DeliverabilityTestReport: __S(216, __c27, 0),
          OverallPlacement: __S(209, __c26, 1),
          IspPlacements: __S(211, __c26, 3),
          Message: S.optional(S.String),
          Tags: S.optional(__S(17, __c2, 1)),
        }),
      ).annotate({ identifier: "GetDeliverabilityTestReportResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportId: S.optional(S.String),
          ReportName: S.optional(S.String),
          Subject: S.optional(S.String),
          FromEmailAddress: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeliverabilityTestStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeliverabilityTestReport" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CampaignId: S.String.pipe(T.HttpLabel("CampaignId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/email/deliverability-dashboard/campaigns/{CampaignId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainDeliverabilityCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DomainDeliverabilityCampaign: __S(232, __c29, 0) }),
      ).annotate({ identifier: "GetDomainDeliverabilityCampaignResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CampaignId: S.optional(S.String),
          ImageUrl: S.optional(S.String),
          Subject: S.optional(S.String),
          FromAddress: S.optional(S.String),
          SendingIps: S.optional(__S(88, __c11, 0)),
          FirstSeenDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSeenDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InboxCount: S.optional(S.Number),
          SpamCount: S.optional(S.Number),
          ReadRate: S.optional(S.Number),
          DeleteRate: S.optional(S.Number),
          ReadDeleteRate: S.optional(S.Number),
          ProjectedVolume: S.optional(S.Number),
          Esps: S.optional(__S(88, __c11, 0)),
        }),
      ).annotate({ identifier: "DomainDeliverabilityCampaign" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Domain: S.String.pipe(T.HttpLabel("Domain")),
          StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("StartDate")),
          EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("EndDate")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/email/deliverability-dashboard/statistics-report/{Domain}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainStatisticsReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InboxRawCount: S.optional(S.Number),
          SpamRawCount: S.optional(S.Number),
          ProjectedInbox: S.optional(S.Number),
          ProjectedSpam: S.optional(S.Number),
        }),
      ).annotate({ identifier: "VolumeStatistics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IspName: S.optional(S.String),
          InboxRawCount: S.optional(S.Number),
          SpamRawCount: S.optional(S.Number),
          InboxPercentage: S.optional(S.Number),
          SpamPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DomainIspPlacement" });
    case 3:
      return S.Array(__S(242, __c30, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          VolumeStatistics: S.optional(__S(241, __c30, 1)),
          ReadRatePercent: S.optional(S.Number),
          DomainIspPlacements: S.optional(__S(243, __c30, 3)),
        }),
      ).annotate({ identifier: "OverallVolume" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VolumeStatistics: S.optional(__S(241, __c30, 1)),
          DomainIspPlacements: S.optional(__S(243, __c30, 3)),
        }),
      ).annotate({ identifier: "DailyVolume" });
    case 6:
      return S.Array(__S(245, __c30, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ OverallVolume: __S(244, __c30, 4), DailyVolumes: __S(246, __c30, 6) }),
      ).annotate({ identifier: "GetDomainStatisticsReportResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/identities/{EmailIdentity}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEmailIdentityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MailFromDomain: S.String,
          MailFromDomainStatus: S.String,
          BehaviorOnMxFailure: S.String,
        }),
      ).annotate({ identifier: "MailFromAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentityType: S.optional(S.String),
          FeedbackForwardingStatus: S.optional(S.Boolean),
          VerifiedForSendingStatus: S.optional(S.Boolean),
          DkimAttributes: S.optional(__S(96, __c12, 0)),
          MailFromAttributes: S.optional(__S(249, __c31, 1)),
          Tags: S.optional(__S(17, __c2, 1)),
        }),
      ).annotate({ identifier: "GetEmailIdentityResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/configuration-sets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSets: S.optional(__S(88, __c11, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationSetsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/dedicated-ip-pools" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDedicatedIpPoolsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DedicatedIpPools: S.optional(__S(88, __c11, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDedicatedIpPoolsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/deliverability-dashboard/test-reports" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeliverabilityTestReportsRequest" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DeliverabilityTestReports: __S(273, __c34, 1),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDeliverabilityTestReportsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("StartDate")),
          EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("EndDate")),
          SubscribedDomain: S.String.pipe(T.HttpLabel("SubscribedDomain")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/email/deliverability-dashboard/domains/{SubscribedDomain}/campaigns",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainDeliverabilityCampaignsRequest" });
    case 1:
      return S.Array(__S(232, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainDeliverabilityCampaigns: __S(281, __c35, 1),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDomainDeliverabilityCampaignsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/email/identities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEmailIdentitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityType: S.optional(S.String),
          IdentityName: S.optional(S.String),
          SendingEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "IdentityInfo" });
    case 2:
      return S.Array(__S(289, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EmailIdentities: S.optional(__S(290, __c36, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEmailIdentitiesResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/email/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: __S(17, __c2, 1) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoWarmupEnabled: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/email/account/dedicated-ips/warmup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAccountDedicatedIpWarmupAttributesRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SendingEnabled: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/email/account/sending" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAccountSendingAttributesRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          TlsPolicy: S.optional(S.String),
          SendingPoolName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}/delivery-options",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConfigurationSetDeliveryOptionsRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          ReputationMetricsEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}/reputation-options",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConfigurationSetReputationOptionsRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          SendingEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}/sending",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConfigurationSetSendingOptionsRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          CustomRedirectDomain: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}/tracking-options",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConfigurationSetTrackingOptionsRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Ip: S.String.pipe(T.HttpLabel("Ip")), DestinationPoolName: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/email/dedicated-ips/{Ip}/pool" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDedicatedIpInPoolRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Ip: S.String.pipe(T.HttpLabel("Ip")), WarmupPercentage: S.Number }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/email/dedicated-ips/{Ip}/warmup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDedicatedIpWarmupAttributesRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DashboardEnabled: S.Boolean,
          SubscribedDomains: S.optional(__S(202, __c25, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/email/deliverability-dashboard" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDeliverabilityDashboardOptionRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          SigningEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/email/identities/{EmailIdentity}/dkim" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEmailIdentityDkimAttributesRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          EmailForwardingEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/email/identities/{EmailIdentity}/feedback" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEmailIdentityFeedbackAttributesRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          MailFromDomain: S.optional(S.String),
          BehaviorOnMxFailure: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/email/identities/{EmailIdentity}/mail-from" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEmailIdentityMailFromAttributesRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ToAddresses: S.optional(__S(88, __c11, 0)),
          CcAddresses: S.optional(__S(88, __c11, 0)),
          BccAddresses: S.optional(__S(88, __c11, 0)),
        }),
      ).annotate({ identifier: "Destination" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "MessageTag",
      });
    case 2:
      return S.Array(__S(401, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FromEmailAddress: S.optional(S.String),
          Destination: __S(400, __c50, 0),
          ReplyToAddresses: S.optional(__S(88, __c11, 0)),
          FeedbackForwardingEmailAddress: S.optional(S.String),
          Content: __S(77, __c9, 5),
          EmailTags: S.optional(__S(402, __c50, 2)),
          ConfigurationSetName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/email/outbound-emails" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendEmailRequest" });
    case 4:
      return S.suspend(() => S.Struct({ MessageId: S.optional(S.String) })).annotate({
        identifier: "SendEmailResponse",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(17, __c2, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/email/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")),
          TagKeys: __S(88, __c11, 0).pipe(T.HttpQuery("TagKeys")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v1/email/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
          EventDestination: __S(48, __c6, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigurationSetEventDestinationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
