import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SESv2",
  serviceShapeName: "SimpleEmailService_v2",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ses" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-09-27");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint, EndpointId } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = () => ({
    authSchemes: [{ name: "sigv4a", signingName: "ses", signingRegionSet: ["*"] }],
  });
  {
    const PartitionResult = _.partition(Region);
    if (
      EndpointId != null &&
      Region != null &&
      PartitionResult != null &&
      PartitionResult !== false
    ) {
      if (_.isValidHostLabel(EndpointId, true)) {
        if (UseFIPS === false) {
          if (Endpoint != null) {
            return e(Endpoint, _p0(), {});
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://${EndpointId}.endpoints.email.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
            return e(
              `https://${EndpointId}.endpoints.email.us-gov.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (!(_.getAttr(PartitionResult, "name") === "aws-us-gov") && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://${EndpointId}.endpoints.email.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          if (!(_.getAttr(PartitionResult, "name") === "aws-us-gov")) {
            return e(
              `https://${EndpointId}.endpoints.email.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(),
              {},
            );
          }
        }
        return err("Invalid Configuration: FIPS is not supported with multi-region endpoints");
      }
      return err("EndpointId must be a valid host label");
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "SESv2",
  service: "SESv2",
  propagate: TxXray.propagate,
} as const;

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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
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
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export type Identity = string;
export type EmailAddress = string;
export type CertificateArn = string;
export interface AssociateEmailIdentityCertificateRequest {
  EmailIdentity: string;
  FromAddress?: string | undefined;
  CertificateArn: string;
}
export interface AssociateEmailIdentityCertificateResponse {}
export type QueryIdentifier = string;
export type MetricNamespace = "VDM" | (string & {});
export type Metric =
  | "SEND"
  | "COMPLAINT"
  | "PERMANENT_BOUNCE"
  | "TRANSIENT_BOUNCE"
  | "OPEN"
  | "CLICK"
  | "DELIVERY"
  | "DELIVERY_OPEN"
  | "DELIVERY_CLICK"
  | "DELIVERY_COMPLAINT"
  | (string & {});
export type MetricDimensionName =
  | "EMAIL_IDENTITY"
  | "CONFIGURATION_SET"
  | "ISP"
  | "TENANT_NAME"
  | (string & {});
export type MetricDimensionValue = string;
export type Dimensions = { [key in MetricDimensionName]?: string | undefined };
export interface BatchGetMetricDataQuery {
  Id: string;
  Namespace: MetricNamespace;
  Metric: Metric;
  Dimensions?: { [key: string]: string | undefined } | undefined;
  StartDate: Date;
  EndDate: Date;
}
export type BatchGetMetricDataQueries = BatchGetMetricDataQuery[];
export interface BatchGetMetricDataRequest {
  Queries: BatchGetMetricDataQuery[];
}
export type TimestampList = Date[];
export type Counter = number;
export type MetricValueList = number[];
export interface MetricDataResult {
  Id?: string | undefined;
  Timestamps?: Date[] | undefined;
  Values?: number[] | undefined;
}
export type MetricDataResultList = MetricDataResult[];
export type QueryErrorCode = "INTERNAL_FAILURE" | "ACCESS_DENIED" | (string & {});
export type QueryErrorMessage = string;
export interface MetricDataError {
  Id?: string | undefined;
  Code?: QueryErrorCode | undefined;
  Message?: string | undefined;
}
export type MetricDataErrorList = MetricDataError[];
export interface BatchGetMetricDataResponse {
  Results?: MetricDataResult[] | undefined;
  Errors?: MetricDataError[] | undefined;
}
export type JobId = string;
export interface CancelExportJobRequest {
  JobId: string;
}
export interface CancelExportJobResponse {}
export type ConfigurationSetName = string;
export type CustomRedirectDomain = string;
export type HttpsPolicy = "REQUIRE" | "REQUIRE_OPEN_ONLY" | "OPTIONAL" | (string & {});
export interface TrackingOptions {
  CustomRedirectDomain: string;
  HttpsPolicy?: HttpsPolicy | undefined;
}
export type TlsPolicy = "REQUIRE" | "OPTIONAL" | (string & {});
export type PoolName = string;
export type MaxDeliverySeconds = number;
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy | undefined;
  SendingPoolName?: string | undefined;
  MaxDeliverySeconds?: number | undefined;
}
export type Enabled = boolean;
export type LastFreshStart = Date;
export interface ReputationOptions {
  ReputationMetricsEnabled?: boolean | undefined;
  LastFreshStart?: Date | undefined;
}
export interface SendingOptions {
  SendingEnabled?: boolean | undefined;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type SuppressionListReason = "BOUNCE" | "COMPLAINT" | (string & {});
export type SuppressionListReasons = SuppressionListReason[];
export type SuppressionListScope = "ACCOUNT" | "TENANT" | (string & {});
export type FeatureStatus = "ENABLED" | "DISABLED" | (string & {});
export type SuppressionConfidenceVerdictThreshold = "MEDIUM" | "HIGH" | "MANAGED" | (string & {});
export interface SuppressionConfidenceThreshold {
  ConfidenceVerdictThreshold: SuppressionConfidenceVerdictThreshold;
}
export interface SuppressionConditionThreshold {
  ConditionThresholdEnabled: FeatureStatus;
  OverallConfidenceThreshold?: SuppressionConfidenceThreshold | undefined;
}
export interface SuppressionValidationOptions {
  ConditionThreshold: SuppressionConditionThreshold;
}
export interface SuppressionOptions {
  SuppressedReasons?: SuppressionListReason[] | undefined;
  SuppressionScope?: SuppressionListScope | undefined;
  ValidationOptions?: SuppressionValidationOptions | undefined;
}
export interface DashboardOptions {
  EngagementMetrics?: FeatureStatus | undefined;
}
export interface GuardianOptions {
  OptimizedSharedDelivery?: FeatureStatus | undefined;
}
export interface VdmOptions {
  DashboardOptions?: DashboardOptions | undefined;
  GuardianOptions?: GuardianOptions | undefined;
}
export type ArchiveArn = string;
export interface ArchivingOptions {
  ArchiveArn?: string | undefined;
}
export interface DefaultSigningScheme {}
export type SignatureFormat = "DETACHED" | (string & {});
export interface SmimeSigningScheme {
  SignatureFormat?: SignatureFormat | undefined;
}
export type SigningScheme =
  | { DefaultScheme: DefaultSigningScheme; SmimeScheme?: undefined }
  | { DefaultScheme?: undefined; SmimeScheme: SmimeSigningScheme };
export interface MessageSecurityOptions {
  SigningScheme?: SigningScheme | undefined;
}
export interface CreateConfigurationSetRequest {
  ConfigurationSetName: string;
  TrackingOptions?: TrackingOptions | undefined;
  DeliveryOptions?: DeliveryOptions | undefined;
  ReputationOptions?: ReputationOptions | undefined;
  SendingOptions?: SendingOptions | undefined;
  Tags?: Tag[] | undefined;
  SuppressionOptions?: SuppressionOptions | undefined;
  VdmOptions?: VdmOptions | undefined;
  ArchivingOptions?: ArchivingOptions | undefined;
  MessageSecurityOptions?: MessageSecurityOptions | undefined;
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
  | "DELIVERY_DELAY"
  | "SUBSCRIPTION"
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
export interface EventBridgeDestination {
  EventBusArn: string;
}
export interface PinpointDestination {
  ApplicationArn?: string | undefined;
}
export interface EventDestinationDefinition {
  Enabled?: boolean | undefined;
  MatchingEventTypes?: EventType[] | undefined;
  KinesisFirehoseDestination?: KinesisFirehoseDestination | undefined;
  CloudWatchDestination?: CloudWatchDestination | undefined;
  SnsDestination?: SnsDestination | undefined;
  EventBridgeDestination?: EventBridgeDestination | undefined;
  PinpointDestination?: PinpointDestination | undefined;
}
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export interface CreateConfigurationSetEventDestinationResponse {}
export type ContactListName = string;
export type TopicName = string;
export type SubscriptionStatus = "OPT_IN" | "OPT_OUT" | (string & {});
export interface TopicPreference {
  TopicName: string;
  SubscriptionStatus: SubscriptionStatus;
}
export type TopicPreferenceList = TopicPreference[];
export type UnsubscribeAll = boolean;
export type AttributesData = string;
export interface CreateContactRequest {
  ContactListName: string;
  EmailAddress: string;
  TopicPreferences?: TopicPreference[] | undefined;
  UnsubscribeAll?: boolean | undefined;
  AttributesData?: string | undefined;
}
export interface CreateContactResponse {}
export type DisplayName = string;
export type Description = string;
export interface Topic {
  TopicName: string;
  DisplayName: string;
  Description?: string | undefined;
  DefaultSubscriptionStatus: SubscriptionStatus;
}
export type Topics = Topic[];
export interface CreateContactListRequest {
  ContactListName: string;
  Topics?: Topic[] | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateContactListResponse {}
export type EmailTemplateName = string;
export type EmailTemplateSubject = string;
export type TemplateContent = string;
export type SuccessRedirectionURL = string;
export type FailureRedirectionURL = string;
export interface CreateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  Tags?: Tag[] | undefined;
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}
export interface CreateCustomVerificationEmailTemplateResponse {}
export type ScalingMode = "STANDARD" | "MANAGED" | (string & {});
export interface CreateDedicatedIpPoolRequest {
  PoolName: string;
  Tags?: Tag[] | undefined;
  ScalingMode?: ScalingMode | undefined;
}
export interface CreateDedicatedIpPoolResponse {}
export type ReportName = string;
export type MessageData = string;
export type Charset = string;
export interface Content {
  Data: string;
  Charset?: string | undefined;
}
export interface Body {
  Text?: Content | undefined;
  Html?: Content | undefined;
}
export type MessageHeaderName = string;
export type MessageHeaderValue = string;
export interface MessageHeader {
  Name: string;
  Value: string;
}
export type MessageHeaderList = MessageHeader[];
export type RawAttachmentData = Uint8Array;
export type AttachmentContentDisposition = "ATTACHMENT" | "INLINE" | (string & {});
export type AttachmentFileName = string;
export type AttachmentContentDescription = string;
export type AttachmentContentId = string;
export type AttachmentContentTransferEncoding =
  | "BASE64"
  | "QUOTED_PRINTABLE"
  | "SEVEN_BIT"
  | (string & {});
export type AttachmentContentType = string;
export interface Attachment {
  RawContent: Uint8Array;
  ContentDisposition?: AttachmentContentDisposition | undefined;
  FileName: string;
  ContentDescription?: string | undefined;
  ContentId?: string | undefined;
  ContentTransferEncoding?: AttachmentContentTransferEncoding | undefined;
  ContentType?: string | undefined;
}
export type AttachmentList = Attachment[];
export interface Message {
  Subject: Content;
  Body: Body;
  Headers?: MessageHeader[] | undefined;
  Attachments?: Attachment[] | undefined;
}
export type RawMessageData = Uint8Array;
export interface RawMessage {
  Data: Uint8Array;
}
export type EmailTemplateText = string;
export type EmailTemplateHtml = string;
export interface EmailTemplateContent {
  Subject?: string | undefined;
  Text?: string | undefined;
  Html?: string | undefined;
}
export type EmailTemplateData = string;
export interface Template {
  TemplateName?: string | undefined;
  TemplateArn?: string | undefined;
  TemplateContent?: EmailTemplateContent | undefined;
  TemplateData?: string | undefined;
  Headers?: MessageHeader[] | undefined;
  Attachments?: Attachment[] | undefined;
}
export interface EmailContent {
  Simple?: Message | undefined;
  Raw?: RawMessage | undefined;
  Template?: Template | undefined;
}
export interface CreateDeliverabilityTestReportRequest {
  ReportName?: string | undefined;
  FromEmailAddress: string;
  Content: EmailContent;
  Tags?: Tag[] | undefined;
}
export type ReportId = string;
export type DeliverabilityTestStatus = "IN_PROGRESS" | "COMPLETED" | (string & {});
export interface CreateDeliverabilityTestReportResponse {
  ReportId: string;
  DeliverabilityTestStatus: DeliverabilityTestStatus;
}
export type Selector = string;
export type PrivateKey = string | redacted.Redacted<string>;
export type DkimSigningKeyLength = "RSA_1024_BIT" | "RSA_2048_BIT" | (string & {});
export type DkimSigningAttributesOrigin =
  | "AWS_SES"
  | "EXTERNAL"
  | "AWS_SES_AF_SOUTH_1"
  | "AWS_SES_EU_NORTH_1"
  | "AWS_SES_AP_SOUTH_1"
  | "AWS_SES_EU_WEST_3"
  | "AWS_SES_EU_WEST_2"
  | "AWS_SES_EU_SOUTH_1"
  | "AWS_SES_EU_WEST_1"
  | "AWS_SES_AP_NORTHEAST_3"
  | "AWS_SES_AP_NORTHEAST_2"
  | "AWS_SES_ME_SOUTH_1"
  | "AWS_SES_AP_NORTHEAST_1"
  | "AWS_SES_IL_CENTRAL_1"
  | "AWS_SES_SA_EAST_1"
  | "AWS_SES_CA_CENTRAL_1"
  | "AWS_SES_AP_SOUTHEAST_1"
  | "AWS_SES_AP_SOUTHEAST_2"
  | "AWS_SES_AP_SOUTHEAST_3"
  | "AWS_SES_EU_CENTRAL_1"
  | "AWS_SES_US_EAST_1"
  | "AWS_SES_US_EAST_2"
  | "AWS_SES_US_WEST_1"
  | "AWS_SES_US_WEST_2"
  | "AWS_SES_ME_CENTRAL_1"
  | "AWS_SES_AP_SOUTH_2"
  | "AWS_SES_EU_CENTRAL_2"
  | "AWS_SES_AP_SOUTHEAST_5"
  | "AWS_SES_CA_WEST_1"
  | "AWS_SES_US_GOV_EAST_1"
  | "AWS_SES_US_GOV_WEST_1"
  | (string & {});
export interface DkimSigningAttributes {
  DomainSigningSelector?: string | undefined;
  DomainSigningPrivateKey?: string | redacted.Redacted<string> | undefined;
  NextSigningKeyLength?: DkimSigningKeyLength | undefined;
  DomainSigningAttributesOrigin?: DkimSigningAttributesOrigin | undefined;
}
export interface CreateEmailIdentityRequest {
  EmailIdentity: string;
  Tags?: Tag[] | undefined;
  DkimSigningAttributes?: DkimSigningAttributes | undefined;
  ConfigurationSetName?: string | undefined;
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
export type HostedZone = string;
export interface DkimAttributes {
  SigningEnabled?: boolean | undefined;
  Status?: DkimStatus | undefined;
  Tokens?: string[] | undefined;
  SigningHostedZone?: string | undefined;
  SigningAttributesOrigin?: DkimSigningAttributesOrigin | undefined;
  NextSigningKeyLength?: DkimSigningKeyLength | undefined;
  CurrentSigningKeyLength?: DkimSigningKeyLength | undefined;
  LastKeyGenerationTimestamp?: Date | undefined;
}
export interface CreateEmailIdentityResponse {
  IdentityType?: IdentityType | undefined;
  VerifiedForSendingStatus?: boolean | undefined;
  DkimAttributes?: DkimAttributes | undefined;
}
export type PolicyName = string;
export type Policy = string;
export interface CreateEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
  Policy: string;
}
export interface CreateEmailIdentityPolicyResponse {}
export interface CreateEmailTemplateRequest {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
  Tags?: Tag[] | undefined;
}
export interface CreateEmailTemplateResponse {}
export type ExportDimensionValue = string[];
export type ExportDimensions = { [key in MetricDimensionName]?: string[] | undefined };
export type MetricAggregation = "RATE" | "VOLUME" | (string & {});
export interface ExportMetric {
  Name?: Metric | undefined;
  Aggregation?: MetricAggregation | undefined;
}
export type ExportMetrics = ExportMetric[];
export interface MetricsDataSource {
  Dimensions: { [key: string]: string[] | undefined };
  Namespace: MetricNamespace;
  Metrics: ExportMetric[];
  StartDate: Date;
  EndDate: Date;
}
export type InsightsEmailAddress = string | redacted.Redacted<string>;
export type EmailAddressFilterList = (string | redacted.Redacted<string>)[];
export type EmailSubject = string | redacted.Redacted<string>;
export type EmailSubjectFilterList = (string | redacted.Redacted<string>)[];
export type Isp = string;
export type IspFilterList = string[];
export type TenantName = string;
export type TenantNameFilterList = string[];
export type DeliveryEventType =
  | "SEND"
  | "DELIVERY"
  | "TRANSIENT_BOUNCE"
  | "PERMANENT_BOUNCE"
  | "UNDETERMINED_BOUNCE"
  | "COMPLAINT"
  | (string & {});
export type LastDeliveryEventList = DeliveryEventType[];
export type EngagementEventType = "OPEN" | "CLICK" | (string & {});
export type LastEngagementEventList = EngagementEventType[];
export interface MessageInsightsFilters {
  FromEmailAddress?: (string | redacted.Redacted<string>)[] | undefined;
  Destination?: (string | redacted.Redacted<string>)[] | undefined;
  Subject?: (string | redacted.Redacted<string>)[] | undefined;
  Isp?: string[] | undefined;
  TenantName?: string[] | undefined;
  LastDeliveryEvent?: DeliveryEventType[] | undefined;
  LastEngagementEvent?: EngagementEventType[] | undefined;
}
export type MessageInsightsExportMaxResults = number;
export interface MessageInsightsDataSource {
  StartDate: Date;
  EndDate: Date;
  Include?: MessageInsightsFilters | undefined;
  Exclude?: MessageInsightsFilters | undefined;
  MaxResults?: number | undefined;
}
export interface ExportDataSource {
  MetricsDataSource?: MetricsDataSource | undefined;
  MessageInsightsDataSource?: MessageInsightsDataSource | undefined;
}
export type DataFormat = "CSV" | "JSON" | (string & {});
export type S3Url = string;
export interface ExportDestination {
  DataFormat: DataFormat;
  S3Url?: string | undefined;
}
export interface CreateExportJobRequest {
  ExportDataSource: ExportDataSource;
  ExportDestination: ExportDestination;
}
export interface CreateExportJobResponse {
  JobId?: string | undefined;
}
export type SuppressionListImportAction = "DELETE" | "PUT" | (string & {});
export interface SuppressionListDestination {
  SuppressionListImportAction: SuppressionListImportAction;
}
export type ContactListImportAction = "DELETE" | "PUT" | (string & {});
export interface ContactListDestination {
  ContactListName: string;
  ContactListImportAction: ContactListImportAction;
}
export interface ImportDestination {
  SuppressionListDestination?: SuppressionListDestination | undefined;
  ContactListDestination?: ContactListDestination | undefined;
}
export interface ImportDataSource {
  S3Url: string;
  DataFormat: DataFormat;
}
export interface CreateImportJobRequest {
  ImportDestination: ImportDestination;
  ImportDataSource: ImportDataSource;
}
export interface CreateImportJobResponse {
  JobId?: string | undefined;
}
export type EndpointName = string;
export type Region = string;
export interface RouteDetails {
  Region: string;
}
export type RoutesDetails = RouteDetails[];
export interface Details {
  RoutesDetails: RouteDetails[];
}
export interface CreateMultiRegionEndpointRequest {
  EndpointName: string;
  Details: Details;
  Tags?: Tag[] | undefined;
}
export type Status = "CREATING" | "READY" | "FAILED" | "DELETING" | (string & {});
export type EndpointId = string;
export interface CreateMultiRegionEndpointResponse {
  Status?: Status | undefined;
  EndpointId?: string | undefined;
}
export interface TenantSuppressionAttributes {
  SuppressedReasons?: SuppressionListReason[] | undefined;
  SuppressionScope?: SuppressionListScope | undefined;
}
export interface CreateTenantRequest {
  TenantName: string;
  Tags?: Tag[] | undefined;
  SuppressionAttributes?: TenantSuppressionAttributes | undefined;
}
export type TenantId = string;
export type SendingStatus = "ENABLED" | "REINSTATED" | "DISABLED" | (string & {});
export interface CreateTenantResponse {
  TenantName?: string | undefined;
  TenantId?: string | undefined;
  TenantArn?: string | undefined;
  CreatedTimestamp?: Date | undefined;
  Tags?: Tag[] | undefined;
  SendingStatus?: SendingStatus | undefined;
  SuppressionAttributes?: TenantSuppressionAttributes | undefined;
}
export interface CreateTenantResourceAssociationRequest {
  TenantName: string;
  ResourceArn: string;
}
export interface CreateTenantResourceAssociationResponse {}
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export interface DeleteConfigurationSetResponse {}
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export interface DeleteConfigurationSetEventDestinationResponse {}
export interface DeleteContactRequest {
  ContactListName: string;
  EmailAddress: string;
}
export interface DeleteContactResponse {}
export interface DeleteContactListRequest {
  ContactListName: string;
}
export interface DeleteContactListResponse {}
export interface DeleteCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export interface DeleteCustomVerificationEmailTemplateResponse {}
export interface DeleteDedicatedIpPoolRequest {
  PoolName: string;
}
export interface DeleteDedicatedIpPoolResponse {}
export interface DeleteEmailIdentityRequest {
  EmailIdentity: string;
}
export interface DeleteEmailIdentityResponse {}
export interface DeleteEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
}
export interface DeleteEmailIdentityPolicyResponse {}
export interface DeleteEmailTemplateRequest {
  TemplateName: string;
}
export interface DeleteEmailTemplateResponse {}
export interface DeleteMultiRegionEndpointRequest {
  EndpointName: string;
}
export interface DeleteMultiRegionEndpointResponse {
  Status?: Status | undefined;
}
export interface DeleteSuppressedDestinationRequest {
  EmailAddress: string;
  TenantName?: string | undefined;
}
export interface DeleteSuppressedDestinationResponse {}
export interface DeleteTenantRequest {
  TenantName: string;
}
export interface DeleteTenantResponse {}
export interface DeleteTenantResourceAssociationRequest {
  TenantName: string;
  ResourceArn: string;
}
export interface DeleteTenantResourceAssociationResponse {}
export interface DisassociateEmailIdentityCertificateRequest {
  EmailIdentity: string;
  FromAddress?: string | undefined;
}
export interface DisassociateEmailIdentityCertificateResponse {}
export interface GetAccountRequest {}
export type GeneralEnforcementStatus = string;
export type Max24HourSend = number;
export type MaxSendRate = number;
export type SentLast24Hours = number;
export interface SendQuota {
  Max24HourSend?: number | undefined;
  MaxSendRate?: number | undefined;
  SentLast24Hours?: number | undefined;
}
export interface SuppressionValidationAttributes {
  ConditionThreshold: SuppressionConditionThreshold;
}
export interface SuppressionAttributes {
  SuppressedReasons?: SuppressionListReason[] | undefined;
  ValidationAttributes?: SuppressionValidationAttributes | undefined;
}
export type MailType = "MARKETING" | "TRANSACTIONAL" | (string & {});
export type WebsiteURL = string | redacted.Redacted<string>;
export type ContactLanguage = "EN" | "JA" | (string & {});
export type UseCaseDescription = string | redacted.Redacted<string>;
export type AdditionalContactEmailAddress = string | redacted.Redacted<string>;
export type AdditionalContactEmailAddresses = (string | redacted.Redacted<string>)[];
export type ReviewStatus = "PENDING" | "FAILED" | "GRANTED" | "DENIED" | (string & {});
export type CaseId = string;
export interface ReviewDetails {
  Status?: ReviewStatus | undefined;
  CaseId?: string | undefined;
}
export interface AccountDetails {
  MailType?: MailType | undefined;
  WebsiteURL?: string | redacted.Redacted<string> | undefined;
  ContactLanguage?: ContactLanguage | undefined;
  UseCaseDescription?: string | redacted.Redacted<string> | undefined;
  AdditionalContactEmailAddresses?: (string | redacted.Redacted<string>)[] | undefined;
  ReviewDetails?: ReviewDetails | undefined;
}
export interface DashboardAttributes {
  EngagementMetrics?: FeatureStatus | undefined;
}
export interface GuardianAttributes {
  OptimizedSharedDelivery?: FeatureStatus | undefined;
}
export interface VdmAttributes {
  VdmEnabled: FeatureStatus;
  DashboardAttributes?: DashboardAttributes | undefined;
  GuardianAttributes?: GuardianAttributes | undefined;
}
export type PricingPlan = "NONE" | "ESSENTIALS" | "PRO" | "ENTERPRISE" | (string & {});
export interface PricingAttributes {
  CurrentPlan?: PricingPlan | undefined;
  NextPlan?: PricingPlan | undefined;
}
export interface GetAccountResponse {
  DedicatedIpAutoWarmupEnabled?: boolean | undefined;
  EnforcementStatus?: string | undefined;
  ProductionAccessEnabled?: boolean | undefined;
  SendQuota?: SendQuota | undefined;
  SendingEnabled?: boolean | undefined;
  SuppressionAttributes?: SuppressionAttributes | undefined;
  Details?: AccountDetails | undefined;
  VdmAttributes?: VdmAttributes | undefined;
  PricingAttributes?: PricingAttributes | undefined;
}
export type BlacklistItemName = string;
export type BlacklistItemNames = string[];
export interface GetBlacklistReportsRequest {
  BlacklistItemNames: string[];
}
export type RblName = string;
export type BlacklistingDescription = string;
export interface BlacklistEntry {
  RblName?: string | undefined;
  ListingTime?: Date | undefined;
  Description?: string | undefined;
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
  ConfigurationSetName?: string | undefined;
  TrackingOptions?: TrackingOptions | undefined;
  DeliveryOptions?: DeliveryOptions | undefined;
  ReputationOptions?: ReputationOptions | undefined;
  SendingOptions?: SendingOptions | undefined;
  Tags?: Tag[] | undefined;
  SuppressionOptions?: SuppressionOptions | undefined;
  VdmOptions?: VdmOptions | undefined;
  ArchivingOptions?: ArchivingOptions | undefined;
  MessageSecurityOptions?: MessageSecurityOptions | undefined;
}
export interface GetConfigurationSetEventDestinationsRequest {
  ConfigurationSetName: string;
}
export interface EventDestination {
  Name: string;
  Enabled?: boolean | undefined;
  MatchingEventTypes: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination | undefined;
  CloudWatchDestination?: CloudWatchDestination | undefined;
  SnsDestination?: SnsDestination | undefined;
  EventBridgeDestination?: EventBridgeDestination | undefined;
  PinpointDestination?: PinpointDestination | undefined;
}
export type EventDestinations = EventDestination[];
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[] | undefined;
}
export interface GetContactRequest {
  ContactListName: string;
  EmailAddress: string;
}
export interface GetContactResponse {
  ContactListName?: string | undefined;
  EmailAddress?: string | undefined;
  TopicPreferences?: TopicPreference[] | undefined;
  TopicDefaultPreferences?: TopicPreference[] | undefined;
  UnsubscribeAll?: boolean | undefined;
  AttributesData?: string | undefined;
  CreatedTimestamp?: Date | undefined;
  LastUpdatedTimestamp?: Date | undefined;
}
export interface GetContactListRequest {
  ContactListName: string;
}
export interface GetContactListResponse {
  ContactListName?: string | undefined;
  Topics?: Topic[] | undefined;
  Description?: string | undefined;
  CreatedTimestamp?: Date | undefined;
  LastUpdatedTimestamp?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface GetCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export interface GetCustomVerificationEmailTemplateResponse {
  TemplateName?: string | undefined;
  FromEmailAddress?: string | undefined;
  TemplateSubject?: string | undefined;
  TemplateContent?: string | undefined;
  Tags?: Tag[] | undefined;
  SuccessRedirectionURL?: string | undefined;
  FailureRedirectionURL?: string | undefined;
}
export type Ip = string;
export interface GetDedicatedIpRequest {
  Ip: string;
}
export type WarmupStatus = "IN_PROGRESS" | "DONE" | "NOT_APPLICABLE" | (string & {});
export type Percentage100Wrapper = number;
export interface DedicatedIp {
  Ip: string;
  WarmupStatus: WarmupStatus;
  WarmupPercentage: number;
  PoolName?: string | undefined;
}
export interface GetDedicatedIpResponse {
  DedicatedIp?: DedicatedIp | undefined;
}
export interface GetDedicatedIpPoolRequest {
  PoolName: string;
}
export interface DedicatedIpPool {
  PoolName: string;
  ScalingMode: ScalingMode;
}
export interface GetDedicatedIpPoolResponse {
  DedicatedIpPool?: DedicatedIpPool | undefined;
}
export type NextToken = string;
export type MaxItems = number;
export interface GetDedicatedIpsRequest {
  PoolName?: string | undefined;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type DedicatedIpList = DedicatedIp[];
export interface GetDedicatedIpsResponse {
  DedicatedIps?: DedicatedIp[] | undefined;
  NextToken?: string | undefined;
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
  Global?: boolean | undefined;
  TrackedIsps?: string[] | undefined;
}
export interface DomainDeliverabilityTrackingOption {
  Domain?: string | undefined;
  SubscriptionStartDate?: Date | undefined;
  InboxPlacementTrackingOption?: InboxPlacementTrackingOption | undefined;
}
export type DomainDeliverabilityTrackingOptions = DomainDeliverabilityTrackingOption[];
export interface GetDeliverabilityDashboardOptionsResponse {
  DashboardEnabled: boolean;
  SubscriptionExpiryDate?: Date | undefined;
  AccountStatus?: DeliverabilityDashboardAccountStatus | undefined;
  ActiveSubscribedDomains?: DomainDeliverabilityTrackingOption[] | undefined;
  PendingExpirationSubscribedDomains?: DomainDeliverabilityTrackingOption[] | undefined;
}
export interface GetDeliverabilityTestReportRequest {
  ReportId: string;
}
export type DeliverabilityTestSubject = string;
export interface DeliverabilityTestReport {
  ReportId?: string | undefined;
  ReportName?: string | undefined;
  Subject?: string | undefined;
  FromEmailAddress?: string | undefined;
  CreateDate?: Date | undefined;
  DeliverabilityTestStatus?: DeliverabilityTestStatus | undefined;
}
export type Percentage = number;
export interface PlacementStatistics {
  InboxPercentage?: number | undefined;
  SpamPercentage?: number | undefined;
  MissingPercentage?: number | undefined;
  SpfPercentage?: number | undefined;
  DkimPercentage?: number | undefined;
}
export interface IspPlacement {
  IspName?: string | undefined;
  PlacementStatistics?: PlacementStatistics | undefined;
}
export type IspPlacements = IspPlacement[];
export type MessageContent = string;
export interface GetDeliverabilityTestReportResponse {
  DeliverabilityTestReport: DeliverabilityTestReport;
  OverallPlacement: PlacementStatistics;
  IspPlacements: IspPlacement[];
  Message?: string | undefined;
  Tags?: Tag[] | undefined;
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
  CampaignId?: string | undefined;
  ImageUrl?: string | undefined;
  Subject?: string | undefined;
  FromAddress?: string | undefined;
  SendingIps?: string[] | undefined;
  FirstSeenDateTime?: Date | undefined;
  LastSeenDateTime?: Date | undefined;
  InboxCount?: number | undefined;
  SpamCount?: number | undefined;
  ReadRate?: number | undefined;
  DeleteRate?: number | undefined;
  ReadDeleteRate?: number | undefined;
  ProjectedVolume?: number | undefined;
  Esps?: string[] | undefined;
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
  InboxRawCount?: number | undefined;
  SpamRawCount?: number | undefined;
  ProjectedInbox?: number | undefined;
  ProjectedSpam?: number | undefined;
}
export interface DomainIspPlacement {
  IspName?: string | undefined;
  InboxRawCount?: number | undefined;
  SpamRawCount?: number | undefined;
  InboxPercentage?: number | undefined;
  SpamPercentage?: number | undefined;
}
export type DomainIspPlacements = DomainIspPlacement[];
export interface OverallVolume {
  VolumeStatistics?: VolumeStatistics | undefined;
  ReadRatePercent?: number | undefined;
  DomainIspPlacements?: DomainIspPlacement[] | undefined;
}
export interface DailyVolume {
  StartDate?: Date | undefined;
  VolumeStatistics?: VolumeStatistics | undefined;
  DomainIspPlacements?: DomainIspPlacement[] | undefined;
}
export type DailyVolumes = DailyVolume[];
export interface GetDomainStatisticsReportResponse {
  OverallVolume: OverallVolume;
  DailyVolumes: DailyVolume[];
}
export interface GetEmailAddressInsightsRequest {
  EmailAddress: string;
}
export type EmailAddressInsightsConfidenceVerdict = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export interface EmailAddressInsightsVerdict {
  ConfidenceVerdict?: EmailAddressInsightsConfidenceVerdict | undefined;
}
export interface EmailAddressInsightsMailboxEvaluations {
  HasValidSyntax?: EmailAddressInsightsVerdict | undefined;
  HasValidDnsRecords?: EmailAddressInsightsVerdict | undefined;
  MailboxExists?: EmailAddressInsightsVerdict | undefined;
  IsRoleAddress?: EmailAddressInsightsVerdict | undefined;
  IsDisposable?: EmailAddressInsightsVerdict | undefined;
  IsRandomInput?: EmailAddressInsightsVerdict | undefined;
}
export interface MailboxValidation {
  IsValid?: EmailAddressInsightsVerdict | undefined;
  Evaluations?: EmailAddressInsightsMailboxEvaluations | undefined;
}
export interface GetEmailAddressInsightsResponse {
  MailboxValidation?: MailboxValidation | undefined;
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
  MailFromDomain?: string | undefined;
  MailFromDomainStatus?: MailFromDomainStatus | undefined;
  BehaviorOnMxFailure?: BehaviorOnMxFailure | undefined;
}
export type PolicyMap = { [key: string]: string | undefined };
export type VerificationStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "TEMPORARY_FAILURE"
  | "NOT_STARTED"
  | (string & {});
export type VerificationError =
  | "SERVICE_ERROR"
  | "DNS_SERVER_ERROR"
  | "HOST_NOT_FOUND"
  | "TYPE_NOT_FOUND"
  | "INVALID_VALUE"
  | "REPLICATION_ACCESS_DENIED"
  | "REPLICATION_PRIMARY_NOT_FOUND"
  | "REPLICATION_PRIMARY_BYO_DKIM_NOT_SUPPORTED"
  | "REPLICATION_REPLICA_AS_PRIMARY_NOT_SUPPORTED"
  | "REPLICATION_PRIMARY_INVALID_REGION"
  | (string & {});
export type PrimaryNameServer = string;
export type AdminEmail = string;
export type SerialNumber = number;
export interface SOARecord {
  PrimaryNameServer?: string | undefined;
  AdminEmail?: string | undefined;
  SerialNumber?: number | undefined;
}
export interface VerificationInfo {
  LastCheckedTimestamp?: Date | undefined;
  LastSuccessTimestamp?: Date | undefined;
  ErrorType?: VerificationError | undefined;
  SOARecord?: SOARecord | undefined;
}
export interface GetEmailIdentityResponse {
  IdentityType?: IdentityType | undefined;
  FeedbackForwardingStatus?: boolean | undefined;
  VerifiedForSendingStatus?: boolean | undefined;
  DkimAttributes?: DkimAttributes | undefined;
  MailFromAttributes?: MailFromAttributes | undefined;
  Policies?: { [key: string]: string | undefined } | undefined;
  Tags?: Tag[] | undefined;
  ConfigurationSetName?: string | undefined;
  VerificationStatus?: VerificationStatus | undefined;
  VerificationInfo?: VerificationInfo | undefined;
}
export interface GetEmailIdentityPoliciesRequest {
  EmailIdentity: string;
}
export interface GetEmailIdentityPoliciesResponse {
  Policies?: { [key: string]: string | undefined } | undefined;
}
export interface GetEmailTemplateRequest {
  TemplateName: string;
}
export interface GetEmailTemplateResponse {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
  Tags?: Tag[] | undefined;
}
export interface GetExportJobRequest {
  JobId: string;
}
export type ExportSourceType = "METRICS_DATA" | "MESSAGE_INSIGHTS" | (string & {});
export type JobStatus =
  | "CREATED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export type FailedRecordsS3Url = string;
export type ErrorMessage = string;
export interface FailureInfo {
  FailedRecordsS3Url?: string | undefined;
  ErrorMessage?: string | undefined;
}
export type ProcessedRecordsCount = number;
export type ExportedRecordsCount = number;
export interface ExportStatistics {
  ProcessedRecordsCount?: number | undefined;
  ExportedRecordsCount?: number | undefined;
}
export interface GetExportJobResponse {
  JobId?: string | undefined;
  ExportSourceType?: ExportSourceType | undefined;
  JobStatus?: JobStatus | undefined;
  ExportDestination?: ExportDestination | undefined;
  ExportDataSource?: ExportDataSource | undefined;
  CreatedTimestamp?: Date | undefined;
  CompletedTimestamp?: Date | undefined;
  FailureInfo?: FailureInfo | undefined;
  Statistics?: ExportStatistics | undefined;
}
export interface GetImportJobRequest {
  JobId: string;
}
export type FailedRecordsCount = number;
export interface GetImportJobResponse {
  JobId?: string | undefined;
  ImportDestination?: ImportDestination | undefined;
  ImportDataSource?: ImportDataSource | undefined;
  FailureInfo?: FailureInfo | undefined;
  JobStatus?: JobStatus | undefined;
  CreatedTimestamp?: Date | undefined;
  CompletedTimestamp?: Date | undefined;
  ProcessedRecordsCount?: number | undefined;
  FailedRecordsCount?: number | undefined;
}
export type OutboundMessageId = string;
export interface GetMessageInsightsRequest {
  MessageId: string;
}
export type MessageTagName = string;
export type MessageTagValue = string;
export interface MessageTag {
  Name: string;
  Value: string;
}
export type MessageTagList = MessageTag[];
export type BounceType = "UNDETERMINED" | "TRANSIENT" | "PERMANENT" | (string & {});
export type BounceSubType = string;
export type DiagnosticCode = string;
export interface Bounce {
  BounceType?: BounceType | undefined;
  BounceSubType?: string | undefined;
  DiagnosticCode?: string | undefined;
}
export type ComplaintSubType = string;
export type ComplaintFeedbackType = string;
export interface Complaint {
  ComplaintSubType?: string | undefined;
  ComplaintFeedbackType?: string | undefined;
}
export interface EventDetails {
  Bounce?: Bounce | undefined;
  Complaint?: Complaint | undefined;
}
export interface InsightsEvent {
  Timestamp?: Date | undefined;
  Type?: EventType | undefined;
  Details?: EventDetails | undefined;
}
export type InsightsEvents = InsightsEvent[];
export interface EmailInsights {
  Destination?: string | redacted.Redacted<string> | undefined;
  Isp?: string | undefined;
  Events?: InsightsEvent[] | undefined;
}
export type EmailInsightsList = EmailInsights[];
export interface GetMessageInsightsResponse {
  MessageId?: string | undefined;
  FromEmailAddress?: string | redacted.Redacted<string> | undefined;
  Subject?: string | redacted.Redacted<string> | undefined;
  EmailTags?: MessageTag[] | undefined;
  Insights?: EmailInsights[] | undefined;
}
export interface GetMultiRegionEndpointRequest {
  EndpointName: string;
}
export interface Route {
  Region: string;
}
export type Routes = Route[];
export interface GetMultiRegionEndpointResponse {
  EndpointName?: string | undefined;
  EndpointId?: string | undefined;
  Routes?: Route[] | undefined;
  Status?: Status | undefined;
  CreatedTimestamp?: Date | undefined;
  LastUpdatedTimestamp?: Date | undefined;
}
export type ReputationEntityReference = string;
export type ReputationEntityType = "RESOURCE" | (string & {});
export interface GetReputationEntityRequest {
  ReputationEntityReference: string;
  ReputationEntityType: ReputationEntityType;
}
export type StatusCause = string;
export interface StatusRecord {
  Status?: SendingStatus | undefined;
  Cause?: string | undefined;
  LastUpdatedTimestamp?: Date | undefined;
}
export type RecommendationImpact = "LOW" | "HIGH" | (string & {});
export interface ReputationEntity {
  ReputationEntityReference?: string | undefined;
  ReputationEntityType?: ReputationEntityType | undefined;
  ReputationManagementPolicy?: string | undefined;
  CustomerManagedStatus?: StatusRecord | undefined;
  AwsSesManagedStatus?: StatusRecord | undefined;
  SendingStatusAggregate?: SendingStatus | undefined;
  ReputationImpact?: RecommendationImpact | undefined;
}
export interface GetReputationEntityResponse {
  ReputationEntity?: ReputationEntity | undefined;
}
export interface GetSuppressedDestinationRequest {
  EmailAddress: string;
  TenantName?: string | undefined;
}
export type FeedbackId = string;
export interface SuppressedDestinationAttributes {
  MessageId?: string | undefined;
  FeedbackId?: string | undefined;
}
export interface SuppressedDestination {
  EmailAddress: string;
  Reason: SuppressionListReason;
  LastUpdateTime: Date;
  Attributes?: SuppressedDestinationAttributes | undefined;
  TenantName?: string | undefined;
}
export interface GetSuppressedDestinationResponse {
  SuppressedDestination: SuppressedDestination;
}
export interface GetTenantRequest {
  TenantName: string;
}
export interface Tenant {
  TenantName?: string | undefined;
  TenantId?: string | undefined;
  TenantArn?: string | undefined;
  CreatedTimestamp?: Date | undefined;
  Tags?: Tag[] | undefined;
  SendingStatus?: SendingStatus | undefined;
  SuppressionAttributes?: TenantSuppressionAttributes | undefined;
}
export interface GetTenantResponse {
  Tenant?: Tenant | undefined;
}
export type ConfigurationSetFilterKey = "CONFIGURATION_SET_NAME_CONTAINS" | (string & {});
export type ConfigurationSetFilterValue = string;
export type ConfigurationSetFilter = { [key in ConfigurationSetFilterKey]?: string | undefined };
export interface ListConfigurationSetsRequest {
  Filter?: { [key: string]: string | undefined } | undefined;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type ConfigurationSetNameList = string[];
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: string[] | undefined;
  NextToken?: string | undefined;
}
export interface ListContactListsRequest {
  PageSize?: number | undefined;
  NextToken?: string | undefined;
}
export interface ContactList {
  ContactListName?: string | undefined;
  LastUpdatedTimestamp?: Date | undefined;
}
export type ListOfContactLists = ContactList[];
export interface ListContactListsResponse {
  ContactLists?: ContactList[] | undefined;
  NextToken?: string | undefined;
}
export type UseDefaultIfPreferenceUnavailable = boolean;
export interface TopicFilter {
  TopicName?: string | undefined;
  UseDefaultIfPreferenceUnavailable?: boolean | undefined;
}
export interface ListContactsFilter {
  FilteredStatus?: SubscriptionStatus | undefined;
  TopicFilter?: TopicFilter | undefined;
}
export interface ListContactsRequest {
  ContactListName: string;
  Filter?: ListContactsFilter | undefined;
  PageSize?: number | undefined;
  NextToken?: string | undefined;
}
export interface Contact {
  EmailAddress?: string | undefined;
  TopicPreferences?: TopicPreference[] | undefined;
  TopicDefaultPreferences?: TopicPreference[] | undefined;
  UnsubscribeAll?: boolean | undefined;
  LastUpdatedTimestamp?: Date | undefined;
}
export type ListOfContacts = Contact[];
export interface ListContactsResponse {
  Contacts?: Contact[] | undefined;
  NextToken?: string | undefined;
}
export interface ListCustomVerificationEmailTemplatesRequest {
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export interface CustomVerificationEmailTemplateMetadata {
  TemplateName?: string | undefined;
  FromEmailAddress?: string | undefined;
  TemplateSubject?: string | undefined;
  SuccessRedirectionURL?: string | undefined;
  FailureRedirectionURL?: string | undefined;
}
export type CustomVerificationEmailTemplatesList = CustomVerificationEmailTemplateMetadata[];
export interface ListCustomVerificationEmailTemplatesResponse {
  CustomVerificationEmailTemplates?: CustomVerificationEmailTemplateMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListDedicatedIpPoolsRequest {
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type ListOfDedicatedIpPools = string[];
export interface ListDedicatedIpPoolsResponse {
  DedicatedIpPools?: string[] | undefined;
  NextToken?: string | undefined;
}
export interface ListDeliverabilityTestReportsRequest {
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type DeliverabilityTestReports = DeliverabilityTestReport[];
export interface ListDeliverabilityTestReportsResponse {
  DeliverabilityTestReports: DeliverabilityTestReport[];
  NextToken?: string | undefined;
}
export interface ListDomainDeliverabilityCampaignsRequest {
  StartDate: Date;
  EndDate: Date;
  SubscribedDomain: string;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type DomainDeliverabilityCampaignList = DomainDeliverabilityCampaign[];
export interface ListDomainDeliverabilityCampaignsResponse {
  DomainDeliverabilityCampaigns: DomainDeliverabilityCampaign[];
  NextToken?: string | undefined;
}
export type IdentityFilterKey =
  | "IDENTITY_NAME_CONTAINS"
  | "IDENTITY_TYPE"
  | "VERIFICATION_STATUS"
  | (string & {});
export type IdentityFilterValue = string;
export type IdentityFilter = { [key in IdentityFilterKey]?: string | undefined };
export interface ListEmailIdentitiesRequest {
  Filter?: { [key: string]: string | undefined } | undefined;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export interface IdentityInfo {
  IdentityType?: IdentityType | undefined;
  IdentityName?: string | undefined;
  SendingEnabled?: boolean | undefined;
  VerificationStatus?: VerificationStatus | undefined;
}
export type IdentityInfoList = IdentityInfo[];
export interface ListEmailIdentitiesResponse {
  EmailIdentities?: IdentityInfo[] | undefined;
  NextToken?: string | undefined;
}
export interface ListEmailIdentityCertificatesRequest {
  EmailIdentity: string;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type IdentityCertificateStatus =
  | "PROVISIONING"
  | "INACTIVE"
  | "DEPROVISIONING"
  | "ACTIVE"
  | "FAILED"
  | (string & {});
export interface IdentityCertificate {
  FromAddress?: string | undefined;
  Status?: IdentityCertificateStatus | undefined;
  CertificateArn?: string | undefined;
  CertificateExpiryTime?: Date | undefined;
}
export type IdentityCertificateList = IdentityCertificate[];
export interface ListEmailIdentityCertificatesResponse {
  Certificates?: IdentityCertificate[] | undefined;
  NextToken?: string | undefined;
}
export interface ListEmailTemplatesRequest {
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export interface EmailTemplateMetadata {
  TemplateName?: string | undefined;
  CreatedTimestamp?: Date | undefined;
}
export type EmailTemplateMetadataList = EmailTemplateMetadata[];
export interface ListEmailTemplatesResponse {
  TemplatesMetadata?: EmailTemplateMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListExportJobsRequest {
  NextToken?: string | undefined;
  PageSize?: number | undefined;
  ExportSourceType?: ExportSourceType | undefined;
  JobStatus?: JobStatus | undefined;
}
export interface ExportJobSummary {
  JobId?: string | undefined;
  ExportSourceType?: ExportSourceType | undefined;
  JobStatus?: JobStatus | undefined;
  CreatedTimestamp?: Date | undefined;
  CompletedTimestamp?: Date | undefined;
}
export type ExportJobSummaryList = ExportJobSummary[];
export interface ListExportJobsResponse {
  ExportJobs?: ExportJobSummary[] | undefined;
  NextToken?: string | undefined;
}
export type ImportDestinationType = "SUPPRESSION_LIST" | "CONTACT_LIST" | (string & {});
export interface ListImportJobsRequest {
  ImportDestinationType?: ImportDestinationType | undefined;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export interface ImportJobSummary {
  JobId?: string | undefined;
  ImportDestination?: ImportDestination | undefined;
  JobStatus?: JobStatus | undefined;
  CreatedTimestamp?: Date | undefined;
  ProcessedRecordsCount?: number | undefined;
  FailedRecordsCount?: number | undefined;
}
export type ImportJobSummaryList = ImportJobSummary[];
export interface ListImportJobsResponse {
  ImportJobs?: ImportJobSummary[] | undefined;
  NextToken?: string | undefined;
}
export type NextTokenV2 = string;
export type PageSizeV2 = number;
export interface ListMultiRegionEndpointsRequest {
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type Regions = string[];
export interface MultiRegionEndpoint {
  EndpointName?: string | undefined;
  Status?: Status | undefined;
  EndpointId?: string | undefined;
  Regions?: string[] | undefined;
  CreatedTimestamp?: Date | undefined;
  LastUpdatedTimestamp?: Date | undefined;
}
export type MultiRegionEndpoints = MultiRegionEndpoint[];
export interface ListMultiRegionEndpointsResponse {
  MultiRegionEndpoints?: MultiRegionEndpoint[] | undefined;
  NextToken?: string | undefined;
}
export type ListRecommendationsFilterKey =
  | "TYPE"
  | "IMPACT"
  | "STATUS"
  | "RESOURCE_ARN"
  | (string & {});
export type ListRecommendationFilterValue = string;
export type ListRecommendationsFilter = {
  [key in ListRecommendationsFilterKey]?: string | undefined;
};
export interface ListRecommendationsRequest {
  Filter?: { [key: string]: string | undefined } | undefined;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type RecommendationType =
  | "DKIM"
  | "DMARC"
  | "SPF"
  | "BIMI"
  | "COMPLAINT"
  | "BOUNCE"
  | "FEEDBACK_3P"
  | "IP_LISTING"
  | (string & {});
export type RecommendationDescription = string;
export type RecommendationStatus = "OPEN" | "FIXED" | (string & {});
export interface Recommendation {
  ResourceArn?: string | undefined;
  Type?: RecommendationType | undefined;
  Description?: string | undefined;
  Status?: RecommendationStatus | undefined;
  CreatedTimestamp?: Date | undefined;
  LastUpdatedTimestamp?: Date | undefined;
  Impact?: RecommendationImpact | undefined;
}
export type RecommendationsList = Recommendation[];
export interface ListRecommendationsResponse {
  Recommendations?: Recommendation[] | undefined;
  NextToken?: string | undefined;
}
export type ReputationEntityFilterKey =
  | "ENTITY_TYPE"
  | "REPUTATION_IMPACT"
  | "SENDING_STATUS"
  | "ENTITY_REFERENCE_PREFIX"
  | (string & {});
export type ReputationEntityFilterValue = string;
export type ReputationEntityFilter = { [key in ReputationEntityFilterKey]?: string | undefined };
export interface ListReputationEntitiesRequest {
  Filter?: { [key: string]: string | undefined } | undefined;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export type ReputationEntitiesList = ReputationEntity[];
export interface ListReputationEntitiesResponse {
  ReputationEntities?: ReputationEntity[] | undefined;
  NextToken?: string | undefined;
}
export interface ListResourceTenantsRequest {
  ResourceArn: string;
  PageSize?: number | undefined;
  NextToken?: string | undefined;
}
export interface ResourceTenantMetadata {
  TenantName?: string | undefined;
  TenantId?: string | undefined;
  ResourceArn?: string | undefined;
  AssociatedTimestamp?: Date | undefined;
}
export type ResourceTenantMetadataList = ResourceTenantMetadata[];
export interface ListResourceTenantsResponse {
  ResourceTenants?: ResourceTenantMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListSuppressedDestinationsRequest {
  TenantName?: string | undefined;
  Reasons?: SuppressionListReason[] | undefined;
  StartDate?: Date | undefined;
  EndDate?: Date | undefined;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export interface SuppressedDestinationSummary {
  EmailAddress: string;
  Reason: SuppressionListReason;
  LastUpdateTime: Date;
}
export type SuppressedDestinationSummaries = SuppressedDestinationSummary[];
export interface ListSuppressedDestinationsResponse {
  SuppressedDestinationSummaries?: SuppressedDestinationSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags: Tag[];
}
export type ListTenantResourcesFilterKey = "RESOURCE_TYPE" | (string & {});
export type ListTenantResourcesFilterValue = string;
export type ListTenantResourcesFilter = {
  [key in ListTenantResourcesFilterKey]?: string | undefined;
};
export interface ListTenantResourcesRequest {
  TenantName: string;
  Filter?: { [key: string]: string | undefined } | undefined;
  PageSize?: number | undefined;
  NextToken?: string | undefined;
}
export type ResourceType =
  | "EMAIL_IDENTITY"
  | "CONFIGURATION_SET"
  | "EMAIL_TEMPLATE"
  | (string & {});
export interface TenantResource {
  ResourceType?: ResourceType | undefined;
  ResourceArn?: string | undefined;
}
export type TenantResourceList = TenantResource[];
export interface ListTenantResourcesResponse {
  TenantResources?: TenantResource[] | undefined;
  NextToken?: string | undefined;
}
export type ListTenantsFilterKey = "TENANT_NAME_CONTAINS" | "SENDING_STATUS" | (string & {});
export type ListTenantsFilterValue = string;
export type ListTenantsFilter = { [key in ListTenantsFilterKey]?: string | undefined };
export interface ListTenantsRequest {
  Filter?: { [key: string]: string | undefined } | undefined;
  NextToken?: string | undefined;
  PageSize?: number | undefined;
}
export interface TenantInfo {
  TenantName?: string | undefined;
  TenantId?: string | undefined;
  TenantArn?: string | undefined;
  CreatedTimestamp?: Date | undefined;
  SendingStatus?: SendingStatus | undefined;
}
export type TenantInfoList = TenantInfo[];
export interface ListTenantsResponse {
  Tenants?: TenantInfo[] | undefined;
  NextToken?: string | undefined;
}
export interface PutAccountDedicatedIpWarmupAttributesRequest {
  AutoWarmupEnabled?: boolean | undefined;
}
export interface PutAccountDedicatedIpWarmupAttributesResponse {}
export type EnabledWrapper = boolean;
export interface PutAccountDetailsRequest {
  MailType: MailType;
  WebsiteURL: string | redacted.Redacted<string>;
  ContactLanguage?: ContactLanguage | undefined;
  UseCaseDescription?: string | redacted.Redacted<string> | undefined;
  AdditionalContactEmailAddresses?: (string | redacted.Redacted<string>)[] | undefined;
  ProductionAccessEnabled?: boolean | undefined;
}
export interface PutAccountDetailsResponse {}
export interface PutAccountPricingAttributesRequest {
  Plan: PricingPlan;
}
export interface PutAccountPricingAttributesResponse {}
export interface PutAccountSendingAttributesRequest {
  SendingEnabled?: boolean | undefined;
}
export interface PutAccountSendingAttributesResponse {}
export interface PutAccountSuppressionAttributesRequest {
  SuppressedReasons?: SuppressionListReason[] | undefined;
  ValidationAttributes?: SuppressionValidationAttributes | undefined;
}
export interface PutAccountSuppressionAttributesResponse {}
export interface PutAccountVdmAttributesRequest {
  VdmAttributes: VdmAttributes;
}
export interface PutAccountVdmAttributesResponse {}
export interface PutConfigurationSetArchivingOptionsRequest {
  ConfigurationSetName: string;
  ArchiveArn?: string | undefined;
}
export interface PutConfigurationSetArchivingOptionsResponse {}
export type SendingPoolName = string;
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  TlsPolicy?: TlsPolicy | undefined;
  SendingPoolName?: string | undefined;
  MaxDeliverySeconds?: number | undefined;
}
export interface PutConfigurationSetDeliveryOptionsResponse {}
export interface PutConfigurationSetReputationOptionsRequest {
  ConfigurationSetName: string;
  ReputationMetricsEnabled?: boolean | undefined;
}
export interface PutConfigurationSetReputationOptionsResponse {}
export interface PutConfigurationSetSendingOptionsRequest {
  ConfigurationSetName: string;
  SendingEnabled?: boolean | undefined;
}
export interface PutConfigurationSetSendingOptionsResponse {}
export interface PutConfigurationSetSuppressionOptionsRequest {
  ConfigurationSetName: string;
  SuppressionScope?: SuppressionListScope | undefined;
  SuppressedReasons?: SuppressionListReason[] | undefined;
  ValidationOptions?: SuppressionValidationOptions | undefined;
}
export interface PutConfigurationSetSuppressionOptionsResponse {}
export interface PutConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  CustomRedirectDomain?: string | undefined;
  HttpsPolicy?: HttpsPolicy | undefined;
}
export interface PutConfigurationSetTrackingOptionsResponse {}
export interface PutConfigurationSetVdmOptionsRequest {
  ConfigurationSetName: string;
  VdmOptions?: VdmOptions | undefined;
}
export interface PutConfigurationSetVdmOptionsResponse {}
export interface PutDedicatedIpInPoolRequest {
  Ip: string;
  DestinationPoolName: string;
}
export interface PutDedicatedIpInPoolResponse {}
export interface PutDedicatedIpPoolScalingAttributesRequest {
  PoolName: string;
  ScalingMode: ScalingMode;
}
export interface PutDedicatedIpPoolScalingAttributesResponse {}
export interface PutDedicatedIpWarmupAttributesRequest {
  Ip: string;
  WarmupPercentage: number;
}
export interface PutDedicatedIpWarmupAttributesResponse {}
export interface PutDeliverabilityDashboardOptionRequest {
  DashboardEnabled: boolean;
  SubscribedDomains?: DomainDeliverabilityTrackingOption[] | undefined;
}
export interface PutDeliverabilityDashboardOptionResponse {}
export interface PutEmailIdentityConfigurationSetAttributesRequest {
  EmailIdentity: string;
  ConfigurationSetName?: string | undefined;
}
export interface PutEmailIdentityConfigurationSetAttributesResponse {}
export interface PutEmailIdentityDkimAttributesRequest {
  EmailIdentity: string;
  SigningEnabled?: boolean | undefined;
}
export interface PutEmailIdentityDkimAttributesResponse {}
export interface PutEmailIdentityDkimSigningAttributesRequest {
  EmailIdentity: string;
  SigningAttributesOrigin: DkimSigningAttributesOrigin;
  SigningAttributes?: DkimSigningAttributes | undefined;
}
export interface PutEmailIdentityDkimSigningAttributesResponse {
  DkimStatus?: DkimStatus | undefined;
  DkimTokens?: string[] | undefined;
  SigningHostedZone?: string | undefined;
}
export interface PutEmailIdentityFeedbackAttributesRequest {
  EmailIdentity: string;
  EmailForwardingEnabled?: boolean | undefined;
}
export interface PutEmailIdentityFeedbackAttributesResponse {}
export interface PutEmailIdentityMailFromAttributesRequest {
  EmailIdentity: string;
  MailFromDomain?: string | undefined;
  BehaviorOnMxFailure?: BehaviorOnMxFailure | undefined;
}
export interface PutEmailIdentityMailFromAttributesResponse {}
export interface PutSuppressedDestinationRequest {
  EmailAddress: string;
  Reason: SuppressionListReason;
  TenantName?: string | undefined;
}
export interface PutSuppressedDestinationResponse {}
export interface PutTenantSuppressionAttributesRequest {
  TenantName: string;
  SuppressedReasons?: SuppressionListReason[] | undefined;
  SuppressionScope?: SuppressionListScope | undefined;
}
export interface PutTenantSuppressionAttributesResponse {}
export type EmailAddressList = string[];
export interface BulkEmailContent {
  Template?: Template | undefined;
}
export interface Destination {
  ToAddresses?: string[] | undefined;
  CcAddresses?: string[] | undefined;
  BccAddresses?: string[] | undefined;
}
export interface ReplacementTemplate {
  ReplacementTemplateData?: string | undefined;
}
export interface ReplacementEmailContent {
  ReplacementTemplate?: ReplacementTemplate | undefined;
}
export interface BulkEmailEntry {
  Destination: Destination;
  ReplacementTags?: MessageTag[] | undefined;
  ReplacementEmailContent?: ReplacementEmailContent | undefined;
  ReplacementHeaders?: MessageHeader[] | undefined;
}
export type BulkEmailEntryList = BulkEmailEntry[];
export interface TrackingConfigurationOverrides {
  OpenTrackingEnabled?: FeatureStatus | undefined;
  ClickTrackingEnabled?: FeatureStatus | undefined;
}
export interface ConfigurationOverrides {
  Tracking?: TrackingConfigurationOverrides | undefined;
}
export interface SendBulkEmailRequest {
  FromEmailAddress?: string | undefined;
  FromEmailAddressIdentityArn?: string | undefined;
  ReplyToAddresses?: string[] | undefined;
  FeedbackForwardingEmailAddress?: string | undefined;
  FeedbackForwardingEmailAddressIdentityArn?: string | undefined;
  DefaultEmailTags?: MessageTag[] | undefined;
  DefaultContent: BulkEmailContent;
  BulkEmailEntries: BulkEmailEntry[];
  ConfigurationSetName?: string | undefined;
  EndpointId?: string | undefined;
  TenantName?: string | undefined;
  ConfigurationOverrides?: ConfigurationOverrides | undefined;
}
export type BulkEmailStatus =
  | "SUCCESS"
  | "MESSAGE_REJECTED"
  | "MAIL_FROM_DOMAIN_NOT_VERIFIED"
  | "CONFIGURATION_SET_NOT_FOUND"
  | "TEMPLATE_NOT_FOUND"
  | "ACCOUNT_SUSPENDED"
  | "ACCOUNT_THROTTLED"
  | "ACCOUNT_DAILY_QUOTA_EXCEEDED"
  | "INVALID_SENDING_POOL_NAME"
  | "ACCOUNT_SENDING_PAUSED"
  | "CONFIGURATION_SET_SENDING_PAUSED"
  | "INVALID_PARAMETER"
  | "TRANSIENT_FAILURE"
  | "FAILED"
  | (string & {});
export interface BulkEmailEntryResult {
  Status?: BulkEmailStatus | undefined;
  Error?: string | undefined;
  MessageId?: string | undefined;
}
export type BulkEmailEntryResultList = BulkEmailEntryResult[];
export interface SendBulkEmailResponse {
  BulkEmailEntryResults: BulkEmailEntryResult[];
}
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string;
  TemplateName: string;
  ConfigurationSetName?: string | undefined;
}
export interface SendCustomVerificationEmailResponse {
  MessageId?: string | undefined;
}
export interface ListManagementOptions {
  ContactListName: string;
  TopicName?: string | undefined;
}
export interface SendEmailRequest {
  FromEmailAddress?: string | undefined;
  FromEmailAddressIdentityArn?: string | undefined;
  Destination?: Destination | undefined;
  ReplyToAddresses?: string[] | undefined;
  FeedbackForwardingEmailAddress?: string | undefined;
  FeedbackForwardingEmailAddressIdentityArn?: string | undefined;
  Content: EmailContent;
  EmailTags?: MessageTag[] | undefined;
  ConfigurationSetName?: string | undefined;
  EndpointId?: string | undefined;
  TenantName?: string | undefined;
  ListManagementOptions?: ListManagementOptions | undefined;
  ConfigurationOverrides?: ConfigurationOverrides | undefined;
}
export interface SendEmailResponse {
  MessageId?: string | undefined;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface TestRenderEmailTemplateRequest {
  TemplateName: string;
  TemplateData: string;
}
export type RenderedEmailTemplate = string;
export interface TestRenderEmailTemplateResponse {
  RenderedTemplate: string;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConfigurationSetRequest {
  ConfigurationSetName: string;
  MessageSecurityOptions?: MessageSecurityOptions | undefined;
}
export interface UpdateConfigurationSetResponse {}
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export interface UpdateConfigurationSetEventDestinationResponse {}
export interface UpdateContactRequest {
  ContactListName: string;
  EmailAddress: string;
  TopicPreferences?: TopicPreference[] | undefined;
  UnsubscribeAll?: boolean | undefined;
  AttributesData?: string | undefined;
}
export interface UpdateContactResponse {}
export interface UpdateContactListRequest {
  ContactListName: string;
  Topics?: Topic[] | undefined;
  Description?: string | undefined;
}
export interface UpdateContactListResponse {}
export interface UpdateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}
export interface UpdateCustomVerificationEmailTemplateResponse {}
export interface UpdateEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
  Policy: string;
}
export interface UpdateEmailIdentityPolicyResponse {}
export interface UpdateEmailTemplateRequest {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
}
export interface UpdateEmailTemplateResponse {}
export interface UpdateReputationEntityCustomerManagedStatusRequest {
  ReputationEntityType: ReputationEntityType;
  ReputationEntityReference: string;
  SendingStatus: SendingStatus;
}
export interface UpdateReputationEntityCustomerManagedStatusResponse {}
export interface UpdateReputationEntityPolicyRequest {
  ReputationEntityType: ReputationEntityType;
  ReputationEntityReference: string;
  ReputationEntityPolicy: string;
}
export interface UpdateReputationEntityPolicyResponse {}
export type AssociateEmailIdentityCertificateError =
  | AlreadyExistsException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associates an S/MIME certificate with an email identity. After the certificate is
 * active, Amazon SES API v2 can add an S/MIME signature to messages that you send from the associated
 * address when signing is enabled on the configuration set used to send the message.
 *
 * The certificate is an X.509 certificate that you manage in Certificate Manager
 * (ACM). You identify it by its Amazon Resource Name (ARN).
 *
 * - If the email identity is a domain, you must specify a `FromAddress`
 * that belongs to that domain or one of its subdomains. The certificate applies to
 * messages sent from that address.
 *
 * - If the email identity is an email address, `FromAddress` is
 * optional. If you specify it, it must exactly match the email identity.
 *
 * When the association is created, the certificate begins provisioning and its status is
 * `PROVISIONING`. The status changes to `ACTIVE` when the certificate
 * is ready to use for signing. Each email address can have only one certificate
 * association. If an association already exists for the address, this operation returns an
 * error, unless the existing association is in the `DEPROVISIONING` state.
 */
export const associateEmailIdentityCertificate: API.OperationMethod<
  AssociateEmailIdentityCertificateRequest & RegionInput,
  AssociateEmailIdentityCertificateResponse,
  AssociateEmailIdentityCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<AssociateEmailIdentityCertificateRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<AssociateEmailIdentityCertificateResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEmailIdentityCertificate",
  telemetry: TELEMETRY,
  span: "AssociateEmailIdentityCertificate",
}));

export type BatchGetMetricDataError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves batches of metric data collected based on your sending activity.
 *
 * You can execute this operation no more than 16 times per second,
 * and with at most 160 queries from the batches per second (cumulative).
 */
export const batchGetMetricData: API.OperationMethod<
  BatchGetMetricDataRequest & RegionInput,
  BatchGetMetricDataResponse,
  BatchGetMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(530, __c33, 2) as any as S.Schema<BatchGetMetricDataRequest>,
  output: __S(537, __c33, 9) as any as S.Schema<BatchGetMetricDataResponse>,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMetricData",
  telemetry: TELEMETRY,
  span: "BatchGetMetricData",
}));

export type CancelExportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels an export job.
 */
export const cancelExportJob: API.OperationMethod<
  CancelExportJobRequest & RegionInput,
  CancelExportJobResponse,
  CancelExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<CancelExportJobRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CancelExportJobResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportJob",
  telemetry: TELEMETRY,
  span: "CancelExportJob",
}));

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
 * rules that you can apply to the emails that you send. You apply a configuration set to
 * an email by specifying the name of the configuration set when you call the Amazon SES API v2. When
 * you apply a configuration set to an email, all of the rules in that configuration set
 * are applied to the email.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest & RegionInput,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<CreateConfigurationSetRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateConfigurationSetResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateConfigurationSet",
}));

export type CreateConfigurationSetEventDestinationError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create an event destination. *Events* include message sends,
 * deliveries, opens, clicks, bounces, and complaints. Event
 * destinations are places that you can send information about these events
 * to. For example, you can send event data to Amazon EventBridge and associate a rule to send the event
 * to the specified target.
 *
 * A single configuration set can include more than one event destination.
 */
export const createConfigurationSetEventDestination: API.OperationMethod<
  CreateConfigurationSetEventDestinationRequest & RegionInput,
  CreateConfigurationSetEventDestinationResponse,
  CreateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<CreateConfigurationSetEventDestinationRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateConfigurationSetEventDestinationResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateConfigurationSetEventDestination",
}));

export type CreateContactError =
  | AlreadyExistsException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a contact, which is an end-user who is receiving the email, and adds them to a
 * contact list.
 */
export const createContact: API.OperationMethod<
  CreateContactRequest & RegionInput,
  CreateContactResponse,
  CreateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<CreateContactRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateContactResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContact",
  telemetry: TELEMETRY,
  span: "CreateContact",
}));

export type CreateContactListError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a contact list.
 */
export const createContactList: API.OperationMethod<
  CreateContactListRequest & RegionInput,
  CreateContactListResponse,
  CreateContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<CreateContactListRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateContactListResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactList",
  telemetry: TELEMETRY,
  span: "CreateContactList",
}));

export type CreateCustomVerificationEmailTemplateError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createCustomVerificationEmailTemplate: API.OperationMethod<
  CreateCustomVerificationEmailTemplateRequest & RegionInput,
  CreateCustomVerificationEmailTemplateResponse,
  CreateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<CreateCustomVerificationEmailTemplateRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateCustomVerificationEmailTemplateResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomVerificationEmailTemplate",
  telemetry: TELEMETRY,
  span: "CreateCustomVerificationEmailTemplate",
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
 * IP addresses that are associated with your Amazon Web Services account. You can associate a pool with
 * a configuration set. When you send an email that uses that configuration set, the
 * message is sent from one of the addresses in the associated pool.
 */
export const createDedicatedIpPool: API.OperationMethod<
  CreateDedicatedIpPoolRequest & RegionInput,
  CreateDedicatedIpPoolResponse,
  CreateDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<CreateDedicatedIpPoolRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateDedicatedIpPoolResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateDedicatedIpPool",
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
 * sample message that contains the content that you plan to send to your customers. Amazon SES
 * then sends that message to special email addresses spread across several major email
 * providers. After about 24 hours, the test is complete, and you can use the
 * `GetDeliverabilityTestReport` operation to view the results of the
 * test.
 */
export const createDeliverabilityTestReport: API.OperationMethod<
  CreateDeliverabilityTestReportRequest & RegionInput,
  CreateDeliverabilityTestReportResponse,
  CreateDeliverabilityTestReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<CreateDeliverabilityTestReportRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<CreateDeliverabilityTestReportResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateDeliverabilityTestReport",
}));

export type CreateEmailIdentityError =
  | AlreadyExistsException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts the process of verifying an email identity. An *identity* is
 * an email address or domain that you use when you send email. Before you can use an
 * identity to send email, you first have to verify it. By verifying an identity, you
 * demonstrate that you're the owner of the identity, and that you've given Amazon SES API v2
 * permission to send email from the identity.
 *
 * When you verify an email address, Amazon SES sends an email to the address. Your email
 * address is verified as soon as you follow the link in the verification email.
 *
 * When you verify a domain without specifying the `DkimSigningAttributes`
 * object, this operation provides a set of DKIM tokens. You can convert these tokens into
 * CNAME records, which you then add to the DNS configuration for your domain. Your domain
 * is verified when Amazon SES detects these records in the DNS configuration for your domain.
 * This verification method is known as Easy DKIM.
 *
 * Alternatively, you can perform the verification process by providing your own
 * public-private key pair. This verification method is known as Bring Your Own DKIM
 * (BYODKIM). To use BYODKIM, your call to the `CreateEmailIdentity` operation
 * has to include the `DkimSigningAttributes` object. When you specify this
 * object, you provide a selector (a component of the DNS record name that identifies the
 * public key to use for DKIM authentication) and a private key.
 *
 * When you verify a domain, this operation provides a set of DKIM tokens, which you can
 * convert into CNAME tokens. You add these CNAME tokens to the DNS configuration for your
 * domain. Your domain is verified when Amazon SES detects these records in the DNS
 * configuration for your domain. For some DNS providers, it can take 72 hours or more to
 * complete the domain verification process.
 *
 * Additionally, you can associate an existing configuration set with the email identity that you're verifying.
 */
export const createEmailIdentity: API.OperationMethod<
  CreateEmailIdentityRequest & RegionInput,
  CreateEmailIdentityResponse,
  CreateEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<CreateEmailIdentityRequest>,
  output: __S(929, __c58, 1) as any as S.Schema<CreateEmailIdentityResponse>,
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
  operationName: "CreateEmailIdentity",
  telemetry: TELEMETRY,
  span: "CreateEmailIdentity",
}));

export type CreateEmailIdentityPolicyError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates the specified sending authorization policy for the given identity (an email
 * address or a domain).
 *
 * This API is for the identity owner only. If you have not verified the identity,
 * this API will return an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createEmailIdentityPolicy: API.OperationMethod<
  CreateEmailIdentityPolicyRequest & RegionInput,
  CreateEmailIdentityPolicyResponse,
  CreateEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<CreateEmailIdentityPolicyRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateEmailIdentityPolicyResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailIdentityPolicy",
  telemetry: TELEMETRY,
  span: "CreateEmailIdentityPolicy",
}));

export type CreateEmailTemplateError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single API operation. For more information, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createEmailTemplate: API.OperationMethod<
  CreateEmailTemplateRequest & RegionInput,
  CreateEmailTemplateResponse,
  CreateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<CreateEmailTemplateRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateEmailTemplateResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailTemplate",
  telemetry: TELEMETRY,
  span: "CreateEmailTemplate",
}));

export type CreateExportJobError =
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an export job for a data source and destination.
 *
 * Export jobs run asynchronously. This operation returns a `JobId`. Call
 * `GetExportJob` with that ID until `JobStatus` is
 * `COMPLETED`, `FAILED`, or `CANCELLED`. When the
 * status is `COMPLETED`, download the export file from the pre-signed URL in
 * `ExportDestination.S3Url`. When the status is `FAILED`, see
 * `FailureInfo`. To store a copy in your own bucket, upload the downloaded
 * file to your bucket. Do not include `S3Url` in the request.
 *
 * You can execute this operation no more than once per second.
 */
export const createExportJob: API.OperationMethod<
  CreateExportJobRequest & RegionInput,
  CreateExportJobResponse,
  CreateExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<CreateExportJobRequest>,
  output: __S(1040, __c65, 0) as any as S.Schema<CreateExportJobResponse>,
  errors: [
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExportJob",
  telemetry: TELEMETRY,
  span: "CreateExportJob",
}));

export type CreateImportJobError =
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an import job for a data destination.
 */
export const createImportJob: API.OperationMethod<
  CreateImportJobRequest & RegionInput,
  CreateImportJobResponse,
  CreateImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<CreateImportJobRequest>,
  output: __S(1040, __c65, 0) as any as S.Schema<CreateImportJobResponse>,
  errors: [BadRequestException, LimitExceededException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImportJob",
  telemetry: TELEMETRY,
  span: "CreateImportJob",
}));

export type CreateMultiRegionEndpointError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a multi-region endpoint (global-endpoint).
 *
 * The primary region is going to be the AWS-Region where the operation is executed.
 * The secondary region has to be provided in request's parameters.
 * From the data flow standpoint there is no difference between primary
 * and secondary regions - sending traffic is divided between the two.
 * The primary region is the region where the resource has been created and where it can be managed.
 */
export const createMultiRegionEndpoint: API.OperationMethod<
  CreateMultiRegionEndpointRequest & RegionInput,
  CreateMultiRegionEndpointResponse,
  CreateMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1137, __c71, 1) as any as S.Schema<CreateMultiRegionEndpointRequest>,
  output: __S(1138, __c71, 2) as any as S.Schema<CreateMultiRegionEndpointResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiRegionEndpoint",
  telemetry: TELEMETRY,
  span: "CreateMultiRegionEndpoint",
}));

export type CreateTenantError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a tenant.
 *
 * *Tenants* are logical containers that group related SES resources together.
 * Each tenant can have its own set of resources like email identities, configuration sets,
 * and templates, along with reputation metrics and sending status. This helps isolate and manage
 * email sending for different customers or business units within your Amazon SES API v2 account.
 *
 * You can optionally specify `SuppressionAttributes` to configure tenant-level
 * suppression at creation time. When tenant-level suppression is enabled, Amazon SES maintains a
 * separate suppression list for the tenant instead of using the account-level suppression list.
 */
export const createTenant: API.OperationMethod<
  CreateTenantRequest & RegionInput,
  CreateTenantResponse,
  CreateTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<CreateTenantRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<CreateTenantResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTenant",
  telemetry: TELEMETRY,
  span: "CreateTenant",
}));

export type CreateTenantResourceAssociationError =
  | AlreadyExistsException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associate a resource with a tenant.
 *
 * *Resources* can be email identities, configuration sets, or email templates.
 * When you associate a resource with a tenant, you can use that resource when sending emails
 * on behalf of that tenant.
 *
 * A single resource can be associated with multiple tenants, allowing for resource sharing
 * across different tenants while maintaining isolation in email sending operations.
 */
export const createTenantResourceAssociation: API.OperationMethod<
  CreateTenantResourceAssociationRequest & RegionInput,
  CreateTenantResourceAssociationResponse,
  CreateTenantResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<CreateTenantResourceAssociationRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateTenantResourceAssociationResponse>,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTenantResourceAssociation",
  telemetry: TELEMETRY,
  span: "CreateTenantResourceAssociation",
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
 * *Configuration sets* are groups of rules that you can apply to the
 * emails you send. You apply a configuration set to an email by including a reference to
 * the configuration set in the headers of the email. When you apply a configuration set to
 * an email, all of the rules in that configuration set are applied to the email.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest & RegionInput,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<DeleteConfigurationSetRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteConfigurationSetResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
  telemetry: TELEMETRY,
  span: "DeleteConfigurationSet",
}));

export type DeleteConfigurationSetEventDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an event destination.
 *
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest & RegionInput,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<DeleteConfigurationSetEventDestinationRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteConfigurationSetEventDestinationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
  telemetry: TELEMETRY,
  span: "DeleteConfigurationSetEventDestination",
}));

export type DeleteContactError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a contact from a contact list.
 */
export const deleteContact: API.OperationMethod<
  DeleteContactRequest & RegionInput,
  DeleteContactResponse,
  DeleteContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<DeleteContactRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteContactResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContact",
  telemetry: TELEMETRY,
  span: "DeleteContact",
}));

export type DeleteContactListError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a contact list and all of the contacts on that list.
 */
export const deleteContactList: API.OperationMethod<
  DeleteContactListRequest & RegionInput,
  DeleteContactListResponse,
  DeleteContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<DeleteContactListRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteContactListResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactList",
  telemetry: TELEMETRY,
  span: "DeleteContactList",
}));

export type DeleteCustomVerificationEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteCustomVerificationEmailTemplate: API.OperationMethod<
  DeleteCustomVerificationEmailTemplateRequest & RegionInput,
  DeleteCustomVerificationEmailTemplateResponse,
  DeleteCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<DeleteCustomVerificationEmailTemplateRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteCustomVerificationEmailTemplateResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomVerificationEmailTemplate",
  telemetry: TELEMETRY,
  span: "DeleteCustomVerificationEmailTemplate",
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
  DeleteDedicatedIpPoolRequest & RegionInput,
  DeleteDedicatedIpPoolResponse,
  DeleteDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<DeleteDedicatedIpPoolRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteDedicatedIpPoolResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDedicatedIpPool",
  telemetry: TELEMETRY,
  span: "DeleteDedicatedIpPool",
}));

export type DeleteEmailIdentityError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an email identity. An identity can be either an email address or a domain
 * name.
 */
export const deleteEmailIdentity: API.OperationMethod<
  DeleteEmailIdentityRequest & RegionInput,
  DeleteEmailIdentityResponse,
  DeleteEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<DeleteEmailIdentityRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteEmailIdentityResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailIdentity",
  telemetry: TELEMETRY,
  span: "DeleteEmailIdentity",
}));

export type DeleteEmailIdentityPolicyError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified sending authorization policy for the given identity (an email
 * address or a domain). This API returns successfully even if a policy with the specified
 * name does not exist.
 *
 * This API is for the identity owner only. If you have not verified the identity,
 * this API will return an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteEmailIdentityPolicy: API.OperationMethod<
  DeleteEmailIdentityPolicyRequest & RegionInput,
  DeleteEmailIdentityPolicyResponse,
  DeleteEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<DeleteEmailIdentityPolicyRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteEmailIdentityPolicyResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailIdentityPolicy",
  telemetry: TELEMETRY,
  span: "DeleteEmailIdentityPolicy",
}));

export type DeleteEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an email template.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteEmailTemplate: API.OperationMethod<
  DeleteEmailTemplateRequest & RegionInput,
  DeleteEmailTemplateResponse,
  DeleteEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<DeleteEmailTemplateRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteEmailTemplateResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailTemplate",
  telemetry: TELEMETRY,
  span: "DeleteEmailTemplate",
}));

export type DeleteMultiRegionEndpointError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a multi-region endpoint (global-endpoint).
 *
 * Only multi-region endpoints (global-endpoints) whose primary region is the AWS-Region
 * where operation is executed can be deleted.
 */
export const deleteMultiRegionEndpoint: API.OperationMethod<
  DeleteMultiRegionEndpointRequest & RegionInput,
  DeleteMultiRegionEndpointResponse,
  DeleteMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<DeleteMultiRegionEndpointRequest>,
  output: __S(1361, __c85, 1) as any as S.Schema<DeleteMultiRegionEndpointResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiRegionEndpoint",
  telemetry: TELEMETRY,
  span: "DeleteMultiRegionEndpoint",
}));

export type DeleteSuppressedDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an email address from the suppression list for your account or for a specific
 * tenant. To target a tenant's suppression list, specify the `TenantName`
 * parameter. If you omit `TenantName`, the address is removed from the
 * account-level suppression list.
 */
export const deleteSuppressedDestination: API.OperationMethod<
  DeleteSuppressedDestinationRequest & RegionInput,
  DeleteSuppressedDestinationResponse,
  DeleteSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<DeleteSuppressedDestinationRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteSuppressedDestinationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSuppressedDestination",
  telemetry: TELEMETRY,
  span: "DeleteSuppressedDestination",
}));

export type DeleteTenantError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an existing tenant.
 *
 * When you delete a tenant, its associations with resources
 * are removed, but the resources themselves are not deleted.
 */
export const deleteTenant: API.OperationMethod<
  DeleteTenantRequest & RegionInput,
  DeleteTenantResponse,
  DeleteTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<DeleteTenantRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteTenantResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTenant",
  telemetry: TELEMETRY,
  span: "DeleteTenant",
}));

export type DeleteTenantResourceAssociationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an association between a tenant and a resource.
 *
 * When you delete a tenant-resource association, the resource itself is not deleted,
 * only its association with the specific tenant is removed. After removal, the resource
 * will no longer be available for use with that tenant's email sending operations.
 */
export const deleteTenantResourceAssociation: API.OperationMethod<
  DeleteTenantResourceAssociationRequest & RegionInput,
  DeleteTenantResourceAssociationResponse,
  DeleteTenantResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<DeleteTenantResourceAssociationRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteTenantResourceAssociationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTenantResourceAssociation",
  telemetry: TELEMETRY,
  span: "DeleteTenantResourceAssociation",
}));

export type DisassociateEmailIdentityCertificateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the association between an S/MIME certificate and an email identity. After the
 * association is removed, Amazon SES API v2 stops adding an S/MIME signature to messages sent from
 * that address.
 *
 * If the email identity is a domain, specify the `FromAddress` whose
 * certificate association you want to remove.
 *
 * This operation is idempotent. If the specified email identity exists but there's no
 * matching certificate association, the operation succeeds without making any changes.
 * Amazon SES API v2 returns a `NotFoundException` only when the specified email identity
 * doesn't exist.
 */
export const disassociateEmailIdentityCertificate: API.OperationMethod<
  DisassociateEmailIdentityCertificateRequest & RegionInput,
  DisassociateEmailIdentityCertificateResponse,
  DisassociateEmailIdentityCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<DisassociateEmailIdentityCertificateRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DisassociateEmailIdentityCertificateResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEmailIdentityCertificate",
  telemetry: TELEMETRY,
  span: "DisassociateEmailIdentityCertificate",
}));

export type GetAccountError = BadRequestException | TooManyRequestsException | CommonErrors;
/**
 * Obtain information about the email-sending status and capabilities of your Amazon SES
 * account in the current Amazon Web Services Region.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest & RegionInput,
  GetAccountResponse,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<GetAccountRequest>,
  output: __S(1446, __c90, 6) as any as S.Schema<GetAccountResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
  telemetry: TELEMETRY,
  span: "GetAccount",
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
  GetBlacklistReportsRequest & RegionInput,
  GetBlacklistReportsResponse,
  GetBlacklistReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<GetBlacklistReportsRequest>,
  output: __S(1476, __c92, 4) as any as S.Schema<GetBlacklistReportsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlacklistReports",
  telemetry: TELEMETRY,
  span: "GetBlacklistReports",
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
 * *Configuration sets* are groups of rules that you can apply to the
 * emails you send. You apply a configuration set to an email by including a reference to
 * the configuration set in the headers of the email. When you apply a configuration set to
 * an email, all of the rules in that configuration set are applied to the email.
 */
export const getConfigurationSet: API.OperationMethod<
  GetConfigurationSetRequest & RegionInput,
  GetConfigurationSetResponse,
  GetConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<GetConfigurationSetRequest>,
  output: __S(1489, __c93, 1) as any as S.Schema<GetConfigurationSetResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSet",
  telemetry: TELEMETRY,
  span: "GetConfigurationSet",
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
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const getConfigurationSetEventDestinations: API.OperationMethod<
  GetConfigurationSetEventDestinationsRequest & RegionInput,
  GetConfigurationSetEventDestinationsResponse,
  GetConfigurationSetEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<GetConfigurationSetEventDestinationsRequest>,
  output: __S(1507, __c94, 3) as any as S.Schema<GetConfigurationSetEventDestinationsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
  telemetry: TELEMETRY,
  span: "GetConfigurationSetEventDestinations",
}));

export type GetContactError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a contact from a contact list.
 */
export const getContact: API.OperationMethod<
  GetContactRequest & RegionInput,
  GetContactResponse,
  GetContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<GetContactRequest>,
  output: __S(1521, __c95, 1) as any as S.Schema<GetContactResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContact",
  telemetry: TELEMETRY,
  span: "GetContact",
}));

export type GetContactListError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns contact list metadata. It does not return any information about the contacts
 * present in the list.
 */
export const getContactList: API.OperationMethod<
  GetContactListRequest & RegionInput,
  GetContactListResponse,
  GetContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<GetContactListRequest>,
  output: __S(1537, __c96, 1) as any as S.Schema<GetContactListResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactList",
  telemetry: TELEMETRY,
  span: "GetContactList",
}));

export type GetCustomVerificationEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the custom email verification template for the template name you
 * specify.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getCustomVerificationEmailTemplate: API.OperationMethod<
  GetCustomVerificationEmailTemplateRequest & RegionInput,
  GetCustomVerificationEmailTemplateResponse,
  GetCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<GetCustomVerificationEmailTemplateRequest>,
  output: __S(1553, __c97, 1) as any as S.Schema<GetCustomVerificationEmailTemplateResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomVerificationEmailTemplate",
  telemetry: TELEMETRY,
  span: "GetCustomVerificationEmailTemplate",
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
  GetDedicatedIpRequest & RegionInput,
  GetDedicatedIpResponse,
  GetDedicatedIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<GetDedicatedIpRequest>,
  output: __S(1569, __c98, 1) as any as S.Schema<GetDedicatedIpResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIp",
  telemetry: TELEMETRY,
  span: "GetDedicatedIp",
}));

export type GetDedicatedIpPoolError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about the dedicated pool.
 */
export const getDedicatedIpPool: API.OperationMethod<
  GetDedicatedIpPoolRequest & RegionInput,
  GetDedicatedIpPoolResponse,
  GetDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<GetDedicatedIpPoolRequest>,
  output: __S(1602, __c100, 2) as any as S.Schema<GetDedicatedIpPoolResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIpPool",
  telemetry: TELEMETRY,
  span: "GetDedicatedIpPool",
}));

export type GetDedicatedIpsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the dedicated IP addresses that are associated with your Amazon Web Services
 * account.
 */
export const getDedicatedIps: API.PaginatedOperationMethod<
  GetDedicatedIpsRequest & RegionInput,
  GetDedicatedIpsResponse,
  GetDedicatedIpsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<GetDedicatedIpsRequest>,
  output: __S(1618, __c101, 2) as any as S.Schema<GetDedicatedIpsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIps",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "GetDedicatedIps",
})) as any;

export type GetDeliverabilityDashboardOptionsError =
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about the status of the Deliverability dashboard for your account. When
 * the Deliverability dashboard is enabled, you gain access to reputation, deliverability, and other
 * metrics for the domains that you use to send email. You also gain the ability to perform
 * predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon SES and other Amazon Web Services services. For more
 * information about the features and cost of a Deliverability dashboard subscription, see Amazon SES Pricing.
 */
export const getDeliverabilityDashboardOptions: API.OperationMethod<
  GetDeliverabilityDashboardOptionsRequest & RegionInput,
  GetDeliverabilityDashboardOptionsResponse,
  GetDeliverabilityDashboardOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<GetDeliverabilityDashboardOptionsRequest>,
  output: __S(1633, __c102, 1) as any as S.Schema<GetDeliverabilityDashboardOptionsResponse>,
  errors: [BadRequestException, LimitExceededException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityDashboardOptions",
  telemetry: TELEMETRY,
  span: "GetDeliverabilityDashboardOptions",
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
  GetDeliverabilityTestReportRequest & RegionInput,
  GetDeliverabilityTestReportResponse,
  GetDeliverabilityTestReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c104, 0) as any as S.Schema<GetDeliverabilityTestReportRequest>,
  output: __S(1668, __c104, 4) as any as S.Schema<GetDeliverabilityTestReportResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityTestReport",
  telemetry: TELEMETRY,
  span: "GetDeliverabilityTestReport",
}));

export type GetDomainDeliverabilityCampaignError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve all the deliverability data for a specific campaign. This data is available
 * for a campaign only if the campaign sent email by using a domain that the
 * Deliverability dashboard is enabled for.
 */
export const getDomainDeliverabilityCampaign: API.OperationMethod<
  GetDomainDeliverabilityCampaignRequest & RegionInput,
  GetDomainDeliverabilityCampaignResponse,
  GetDomainDeliverabilityCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c106, 0) as any as S.Schema<GetDomainDeliverabilityCampaignRequest>,
  output: __S(1697, __c106, 1) as any as S.Schema<GetDomainDeliverabilityCampaignResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainDeliverabilityCampaign",
  telemetry: TELEMETRY,
  span: "GetDomainDeliverabilityCampaign",
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
  GetDomainStatisticsReportRequest & RegionInput,
  GetDomainStatisticsReportResponse,
  GetDomainStatisticsReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<GetDomainStatisticsReportRequest>,
  output: __S(1735, __c108, 7) as any as S.Schema<GetDomainStatisticsReportResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainStatisticsReport",
  telemetry: TELEMETRY,
  span: "GetDomainStatisticsReport",
}));

export type GetEmailAddressInsightsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides validation insights about a specific email address, including syntax validation, DNS record checks, mailbox existence, and other deliverability factors.
 */
export const getEmailAddressInsights: API.OperationMethod<
  GetEmailAddressInsightsRequest & RegionInput,
  GetEmailAddressInsightsResponse,
  GetEmailAddressInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<GetEmailAddressInsightsRequest>,
  output: __S(1748, __c109, 4) as any as S.Schema<GetEmailAddressInsightsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailAddressInsights",
  telemetry: TELEMETRY,
  span: "GetEmailAddressInsights",
}));

export type GetEmailIdentityError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about a specific identity, including the identity's verification
 * status, sending authorization policies, its DKIM authentication status, and its custom
 * Mail-From settings.
 */
export const getEmailIdentity: API.OperationMethod<
  GetEmailIdentityRequest & RegionInput,
  GetEmailIdentityResponse,
  GetEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<GetEmailIdentityRequest>,
  output: __S(1764, __c110, 4) as any as S.Schema<GetEmailIdentityResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentity",
  telemetry: TELEMETRY,
  span: "GetEmailIdentity",
}));

export type GetEmailIdentityPoliciesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the requested sending authorization policies for the given identity (an email
 * address or a domain). The policies are returned as a map of policy names to policy
 * contents. You can retrieve a maximum of 20 policies at a time.
 *
 * This API is for the identity owner only. If you have not verified the identity,
 * this API will return an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getEmailIdentityPolicies: API.OperationMethod<
  GetEmailIdentityPoliciesRequest & RegionInput,
  GetEmailIdentityPoliciesResponse,
  GetEmailIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<GetEmailIdentityPoliciesRequest>,
  output: __S(1793, __c112, 1) as any as S.Schema<GetEmailIdentityPoliciesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentityPolicies",
  telemetry: TELEMETRY,
  span: "GetEmailIdentityPolicies",
}));

export type GetEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the template object (which includes the subject line, HTML part and text
 * part) for the template you specify.
 *
 * You can execute this operation no more than 50 times per second.
 */
export const getEmailTemplate: API.OperationMethod<
  GetEmailTemplateRequest & RegionInput,
  GetEmailTemplateResponse,
  GetEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<GetEmailTemplateRequest>,
  output: __S(1809, __c113, 1) as any as S.Schema<GetEmailTemplateResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailTemplate",
  telemetry: TELEMETRY,
  span: "GetEmailTemplate",
}));

export type GetExportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about an export job.
 *
 * When the job status is `COMPLETED`, the response includes a pre-signed
 * URL in `ExportDestination.S3Url` that you use to download the export
 * file.
 */
export const getExportJob: API.OperationMethod<
  GetExportJobRequest & RegionInput,
  GetExportJobResponse,
  GetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<GetExportJobRequest>,
  output: __S(1826, __c114, 2) as any as S.Schema<GetExportJobResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportJob",
  telemetry: TELEMETRY,
  span: "GetExportJob",
}));

export type GetImportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about an import job.
 */
export const getImportJob: API.OperationMethod<
  GetImportJobRequest & RegionInput,
  GetImportJobResponse,
  GetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c116, 0) as any as S.Schema<GetImportJobRequest>,
  output: __S(1857, __c116, 1) as any as S.Schema<GetImportJobResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
  telemetry: TELEMETRY,
  span: "GetImportJob",
}));

export type GetMessageInsightsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about a specific message, including the from address, the
 * subject, the recipient address, email tags, as well as events associated with the message.
 *
 * You can execute this operation no more than once per second.
 */
export const getMessageInsights: API.OperationMethod<
  GetMessageInsightsRequest & RegionInput,
  GetMessageInsightsResponse,
  GetMessageInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1872, __c117, 0) as any as S.Schema<GetMessageInsightsRequest>,
  output: __S(1880, __c117, 8) as any as S.Schema<GetMessageInsightsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMessageInsights",
  telemetry: TELEMETRY,
  span: "GetMessageInsights",
}));

export type GetMultiRegionEndpointError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the multi-region endpoint (global-endpoint) configuration.
 *
 * Only multi-region endpoints (global-endpoints) whose primary region is the AWS-Region
 * where operation is executed can be displayed.
 */
export const getMultiRegionEndpoint: API.OperationMethod<
  GetMultiRegionEndpointRequest & RegionInput,
  GetMultiRegionEndpointResponse,
  GetMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c118, 0) as any as S.Schema<GetMultiRegionEndpointRequest>,
  output: __S(1889, __c118, 1) as any as S.Schema<GetMultiRegionEndpointResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionEndpoint",
  telemetry: TELEMETRY,
  span: "GetMultiRegionEndpoint",
}));

export type GetReputationEntityError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about a specific reputation entity, including its reputation
 * management policy, customer-managed status, Amazon Web Services Amazon SES-managed status, and aggregate
 * sending status.
 *
 * *Reputation entities* represent resources in your Amazon SES account that have reputation
 * tracking and management capabilities. The reputation impact reflects the highest
 * impact reputation finding for the entity. Reputation findings can be retrieved
 * using the `ListRecommendations` operation.
 */
export const getReputationEntity: API.OperationMethod<
  GetReputationEntityRequest & RegionInput,
  GetReputationEntityResponse,
  GetReputationEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1904, __c119, 0) as any as S.Schema<GetReputationEntityRequest>,
  output: __S(1905, __c119, 1) as any as S.Schema<GetReputationEntityResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReputationEntity",
  telemetry: TELEMETRY,
  span: "GetReputationEntity",
}));

export type GetSuppressedDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific email address that's on the suppression list
 * for your account or for a specific tenant. To target a tenant's suppression list,
 * specify the `TenantName` parameter. If you omit `TenantName`,
 * the operation targets the account-level suppression list.
 */
export const getSuppressedDestination: API.OperationMethod<
  GetSuppressedDestinationRequest & RegionInput,
  GetSuppressedDestinationResponse,
  GetSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1936, __c121, 0) as any as S.Schema<GetSuppressedDestinationRequest>,
  output: __S(1939, __c121, 3) as any as S.Schema<GetSuppressedDestinationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuppressedDestination",
  telemetry: TELEMETRY,
  span: "GetSuppressedDestination",
}));

export type GetTenantError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get information about a specific tenant, including the tenant's name, ID, ARN,
 * creation timestamp, tags, sending status, and suppression attributes.
 */
export const getTenant: API.OperationMethod<
  GetTenantRequest & RegionInput,
  GetTenantResponse,
  GetTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c122, 0) as any as S.Schema<GetTenantRequest>,
  output: __S(1953, __c122, 1) as any as S.Schema<GetTenantResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTenant",
  telemetry: TELEMETRY,
  span: "GetTenant",
}));

export type ListConfigurationSetsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the configuration sets associated with your account in the current
 * region.
 *
 * *Configuration sets* are groups of rules that you can apply to the
 * emails you send. You apply a configuration set to an email by including a reference to
 * the configuration set in the headers of the email. When you apply a configuration set to
 * an email, all of the rules in that configuration set are applied to the email.
 */
export const listConfigurationSets: API.PaginatedOperationMethod<
  ListConfigurationSetsRequest & RegionInput,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1968, __c123, 0) as any as S.Schema<ListConfigurationSetsRequest>,
  output: __S(1969, __c123, 1) as any as S.Schema<ListConfigurationSetsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListConfigurationSets",
})) as any;

export type ListContactListsError = BadRequestException | TooManyRequestsException | CommonErrors;
/**
 * Lists all of the contact lists available.
 *
 * If your output includes a "NextToken" field with a string value, this indicates there may be additional
 * contacts on the filtered list - regardless of the number of contacts returned.
 */
export const listContactLists: API.PaginatedOperationMethod<
  ListContactListsRequest & RegionInput,
  ListContactListsResponse,
  ListContactListsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1984, __c124, 0) as any as S.Schema<ListContactListsRequest>,
  output: __S(1987, __c124, 3) as any as S.Schema<ListContactListsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactLists",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListContactLists",
})) as any;

export type ListContactsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the contacts present in a specific contact list.
 */
export const listContacts: API.PaginatedOperationMethod<
  ListContactsRequest & RegionInput,
  ListContactsResponse,
  ListContactsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2002, __c125, 2) as any as S.Schema<ListContactsRequest>,
  output: __S(2005, __c125, 5) as any as S.Schema<ListContactsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContacts",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListContacts",
})) as any;

export type ListCustomVerificationEmailTemplatesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the existing custom verification email templates for your account in the current
 * Amazon Web Services Region.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listCustomVerificationEmailTemplates: API.PaginatedOperationMethod<
  ListCustomVerificationEmailTemplatesRequest & RegionInput,
  ListCustomVerificationEmailTemplatesResponse,
  ListCustomVerificationEmailTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2016, __c126, 0) as any as S.Schema<ListCustomVerificationEmailTemplatesRequest>,
  output: __S(2019, __c126, 3) as any as S.Schema<ListCustomVerificationEmailTemplatesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomVerificationEmailTemplates",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListCustomVerificationEmailTemplates",
})) as any;

export type ListDedicatedIpPoolsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the dedicated IP pools that exist in your Amazon Web Services account in the current
 * Region.
 */
export const listDedicatedIpPools: API.PaginatedOperationMethod<
  ListDedicatedIpPoolsRequest & RegionInput,
  ListDedicatedIpPoolsResponse,
  ListDedicatedIpPoolsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2032, __c127, 0) as any as S.Schema<ListDedicatedIpPoolsRequest>,
  output: __S(2033, __c127, 1) as any as S.Schema<ListDedicatedIpPoolsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDedicatedIpPools",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListDedicatedIpPools",
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
  ListDeliverabilityTestReportsRequest & RegionInput,
  ListDeliverabilityTestReportsResponse,
  ListDeliverabilityTestReportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2048, __c128, 0) as any as S.Schema<ListDeliverabilityTestReportsRequest>,
  output: __S(2050, __c128, 2) as any as S.Schema<ListDeliverabilityTestReportsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeliverabilityTestReports",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListDeliverabilityTestReports",
})) as any;

export type ListDomainDeliverabilityCampaignsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve deliverability data for all the campaigns that used a specific domain to send
 * email during a specified time range. This data is available for a domain only if you
 * enabled the Deliverability dashboard for the domain.
 */
export const listDomainDeliverabilityCampaigns: API.PaginatedOperationMethod<
  ListDomainDeliverabilityCampaignsRequest & RegionInput,
  ListDomainDeliverabilityCampaignsResponse,
  ListDomainDeliverabilityCampaignsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2064, __c129, 0) as any as S.Schema<ListDomainDeliverabilityCampaignsRequest>,
  output: __S(2066, __c129, 2) as any as S.Schema<ListDomainDeliverabilityCampaignsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainDeliverabilityCampaigns",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListDomainDeliverabilityCampaigns",
})) as any;

export type ListEmailIdentitiesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of all of the email identities that are associated with your Amazon Web Services
 * account. An identity can be either an email address or a domain. This operation returns
 * identities that are verified as well as those that aren't. This operation returns
 * identities that are associated with Amazon SES and Amazon Pinpoint.
 */
export const listEmailIdentities: API.PaginatedOperationMethod<
  ListEmailIdentitiesRequest & RegionInput,
  ListEmailIdentitiesResponse,
  ListEmailIdentitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2080, __c130, 0) as any as S.Schema<ListEmailIdentitiesRequest>,
  output: __S(2083, __c130, 3) as any as S.Schema<ListEmailIdentitiesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailIdentities",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListEmailIdentities",
})) as any;

export type ListEmailIdentityCertificatesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the S/MIME certificates that are associated with the specified email identity.
 * The results include certificates in all states, such as `PROVISIONING`,
 * `ACTIVE`, `INACTIVE`, `DEPROVISIONING`, and
 * `FAILED`.
 *
 * If a certificate has passed its expiration time, it's returned with a status of
 * `FAILED`.
 *
 * We recommend using pagination to ensure that the operation returns quickly and
 * successfully. When there are more results than fit in a single response, the response
 * includes a `NextToken` value that you use in a subsequent call to retrieve
 * the next set of results.
 */
export const listEmailIdentityCertificates: API.PaginatedOperationMethod<
  ListEmailIdentityCertificatesRequest & RegionInput,
  ListEmailIdentityCertificatesResponse,
  ListEmailIdentityCertificatesError,
  Credentials | HttpClient.HttpClient,
  IdentityCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2096, __c131, 0) as any as S.Schema<ListEmailIdentityCertificatesRequest>,
  output: __S(2099, __c131, 3) as any as S.Schema<ListEmailIdentityCertificatesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailIdentityCertificates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Certificates",
    pageSize: "PageSize",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEmailIdentityCertificates",
})) as any;

export type ListEmailTemplatesError = BadRequestException | TooManyRequestsException | CommonErrors;
/**
 * Lists the email templates present in your Amazon SES account in the current Amazon Web Services
 * Region.
 *
 * You can execute this operation no more than once per second.
 */
export const listEmailTemplates: API.PaginatedOperationMethod<
  ListEmailTemplatesRequest & RegionInput,
  ListEmailTemplatesResponse,
  ListEmailTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2112, __c132, 0) as any as S.Schema<ListEmailTemplatesRequest>,
  output: __S(2115, __c132, 3) as any as S.Schema<ListEmailTemplatesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailTemplates",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListEmailTemplates",
})) as any;

export type ListExportJobsError = BadRequestException | TooManyRequestsException | CommonErrors;
/**
 * Lists all of the export jobs.
 */
export const listExportJobs: API.PaginatedOperationMethod<
  ListExportJobsRequest & RegionInput,
  ListExportJobsResponse,
  ListExportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2128, __c133, 0) as any as S.Schema<ListExportJobsRequest>,
  output: __S(2131, __c133, 3) as any as S.Schema<ListExportJobsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportJobs",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListExportJobs",
})) as any;

export type ListImportJobsError = BadRequestException | TooManyRequestsException | CommonErrors;
/**
 * Lists all of the import jobs.
 */
export const listImportJobs: API.PaginatedOperationMethod<
  ListImportJobsRequest & RegionInput,
  ListImportJobsResponse,
  ListImportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2144, __c134, 0) as any as S.Schema<ListImportJobsRequest>,
  output: __S(2147, __c134, 3) as any as S.Schema<ListImportJobsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportJobs",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListImportJobs",
})) as any;

export type ListMultiRegionEndpointsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the multi-region endpoints (global-endpoints).
 *
 * Only multi-region endpoints (global-endpoints) whose primary region is the AWS-Region
 * where operation is executed will be listed.
 */
export const listMultiRegionEndpoints: API.PaginatedOperationMethod<
  ListMultiRegionEndpointsRequest & RegionInput,
  ListMultiRegionEndpointsResponse,
  ListMultiRegionEndpointsError,
  Credentials | HttpClient.HttpClient,
  MultiRegionEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2160, __c135, 0) as any as S.Schema<ListMultiRegionEndpointsRequest>,
  output: __S(2163, __c135, 3) as any as S.Schema<ListMultiRegionEndpointsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiRegionEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MultiRegionEndpoints",
    pageSize: "PageSize",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMultiRegionEndpoints",
})) as any;

export type ListRecommendationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the recommendations present in your Amazon SES account in the current Amazon Web Services Region.
 *
 * You can execute this operation no more than once per second.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest & RegionInput,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2176, __c136, 0) as any as S.Schema<ListRecommendationsRequest>,
  output: __S(2179, __c136, 3) as any as S.Schema<ListRecommendationsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListRecommendations",
})) as any;

export type ListReputationEntitiesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List reputation entities in your Amazon SES account in the current Amazon Web Services Region.
 * You can filter the results by entity type, reputation impact, sending status,
 * or entity reference prefix.
 *
 * *Reputation entities* represent resources in your account that have reputation
 * tracking and management capabilities. Use this operation to get an overview of
 * all entities and their current reputation status.
 */
export const listReputationEntities: API.PaginatedOperationMethod<
  ListReputationEntitiesRequest & RegionInput,
  ListReputationEntitiesResponse,
  ListReputationEntitiesError,
  Credentials | HttpClient.HttpClient,
  ReputationEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2192, __c137, 0) as any as S.Schema<ListReputationEntitiesRequest>,
  output: __S(2194, __c137, 2) as any as S.Schema<ListReputationEntitiesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReputationEntities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReputationEntities",
    pageSize: "PageSize",
  } as const,
  telemetry: TELEMETRY,
  span: "ListReputationEntities",
})) as any;

export type ListResourceTenantsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all tenants associated with a specific resource.
 *
 * This operation returns a list of tenants that are associated with the specified
 * resource. This is useful for understanding which tenants are currently using a particular
 * resource such as an email identity, configuration set, or email template.
 */
export const listResourceTenants: API.PaginatedOperationMethod<
  ListResourceTenantsRequest & RegionInput,
  ListResourceTenantsResponse,
  ListResourceTenantsError,
  Credentials | HttpClient.HttpClient,
  ResourceTenantMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2208, __c138, 0) as any as S.Schema<ListResourceTenantsRequest>,
  output: __S(2211, __c138, 3) as any as S.Schema<ListResourceTenantsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTenants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceTenants",
    pageSize: "PageSize",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResourceTenants",
})) as any;

export type ListSuppressedDestinationsError =
  | BadRequestException
  | InvalidNextTokenException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of email addresses that are on the suppression list for your
 * account or for a specific tenant. To target a tenant's suppression list, specify the
 * `TenantName` parameter. If you omit `TenantName`, the operation
 * targets the account-level suppression list.
 */
export const listSuppressedDestinations: API.PaginatedOperationMethod<
  ListSuppressedDestinationsRequest & RegionInput,
  ListSuppressedDestinationsResponse,
  ListSuppressedDestinationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2224, __c139, 0) as any as S.Schema<ListSuppressedDestinationsRequest>,
  output: __S(2227, __c139, 3) as any as S.Schema<ListSuppressedDestinationsResponse>,
  errors: [
    BadRequestException,
    InvalidNextTokenException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuppressedDestinations",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "PageSize" } as const,
  telemetry: TELEMETRY,
  span: "ListSuppressedDestinations",
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the tags (keys and values) that are associated with a specified
 * resource. A *tag* is a label that you optionally define and associate
 * with a resource. Each tag consists of a required *tag key* and an
 * optional associated *tag value*. A tag key is a general label that
 * acts as a category for more specific tag values. A tag value acts as a descriptor within
 * a tag key.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c140, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2241, __c140, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListTenantResourcesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all resources associated with a specific tenant.
 *
 * This operation returns a list of resources (email identities, configuration sets,
 * or email templates) that are associated with the specified tenant. You can optionally
 * filter the results by resource type.
 */
export const listTenantResources: API.PaginatedOperationMethod<
  ListTenantResourcesRequest & RegionInput,
  ListTenantResourcesResponse,
  ListTenantResourcesError,
  Credentials | HttpClient.HttpClient,
  TenantResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2256, __c141, 0) as any as S.Schema<ListTenantResourcesRequest>,
  output: __S(2259, __c141, 3) as any as S.Schema<ListTenantResourcesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTenantResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TenantResources",
    pageSize: "PageSize",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTenantResources",
})) as any;

export type ListTenantsError = BadRequestException | TooManyRequestsException | CommonErrors;
/**
 * List all tenants associated with your account in the current Amazon Web Services Region.
 *
 * This operation returns basic information about each tenant,
 * such as tenant name, ID, ARN, and creation timestamp.
 */
export const listTenants: API.PaginatedOperationMethod<
  ListTenantsRequest & RegionInput,
  ListTenantsResponse,
  ListTenantsError,
  Credentials | HttpClient.HttpClient,
  TenantInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2272, __c142, 0) as any as S.Schema<ListTenantsRequest>,
  output: __S(2275, __c142, 3) as any as S.Schema<ListTenantsResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTenants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tenants",
    pageSize: "PageSize",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTenants",
})) as any;

export type PutAccountDedicatedIpWarmupAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the automatic warm-up feature for dedicated IP addresses.
 */
export const putAccountDedicatedIpWarmupAttributes: API.OperationMethod<
  PutAccountDedicatedIpWarmupAttributesRequest & RegionInput,
  PutAccountDedicatedIpWarmupAttributesResponse,
  PutAccountDedicatedIpWarmupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2288, __c143, 0) as any as S.Schema<PutAccountDedicatedIpWarmupAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutAccountDedicatedIpWarmupAttributesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDedicatedIpWarmupAttributes",
  telemetry: TELEMETRY,
  span: "PutAccountDedicatedIpWarmupAttributes",
}));

export type PutAccountDetailsError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update your Amazon SES account details.
 */
export const putAccountDetails: API.OperationMethod<
  PutAccountDetailsRequest & RegionInput,
  PutAccountDetailsResponse,
  PutAccountDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c144, 0) as any as S.Schema<PutAccountDetailsRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutAccountDetailsResponse>,
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDetails",
  telemetry: TELEMETRY,
  span: "PutAccountDetails",
}));

export type PutAccountPricingAttributesError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Set the pricing plan for your Amazon SES account.
 */
export const putAccountPricingAttributes: API.OperationMethod<
  PutAccountPricingAttributesRequest & RegionInput,
  PutAccountPricingAttributesResponse,
  PutAccountPricingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2320, __c145, 0) as any as S.Schema<PutAccountPricingAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutAccountPricingAttributesResponse>,
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountPricingAttributes",
  telemetry: TELEMETRY,
  span: "PutAccountPricingAttributes",
}));

export type PutAccountSendingAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the ability of your account to send email.
 */
export const putAccountSendingAttributes: API.OperationMethod<
  PutAccountSendingAttributesRequest & RegionInput,
  PutAccountSendingAttributesResponse,
  PutAccountSendingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c146, 0) as any as S.Schema<PutAccountSendingAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutAccountSendingAttributesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSendingAttributes",
  telemetry: TELEMETRY,
  span: "PutAccountSendingAttributes",
}));

export type PutAccountSuppressionAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for the account-level suppression list.
 */
export const putAccountSuppressionAttributes: API.OperationMethod<
  PutAccountSuppressionAttributesRequest & RegionInput,
  PutAccountSuppressionAttributesResponse,
  PutAccountSuppressionAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2352, __c147, 0) as any as S.Schema<PutAccountSuppressionAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutAccountSuppressionAttributesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSuppressionAttributes",
  telemetry: TELEMETRY,
  span: "PutAccountSuppressionAttributes",
}));

export type PutAccountVdmAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update your Amazon SES account VDM attributes.
 *
 * You can execute this operation no more than once per second.
 */
export const putAccountVdmAttributes: API.OperationMethod<
  PutAccountVdmAttributesRequest & RegionInput,
  PutAccountVdmAttributesResponse,
  PutAccountVdmAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c148, 0) as any as S.Schema<PutAccountVdmAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutAccountVdmAttributesResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountVdmAttributes",
  telemetry: TELEMETRY,
  span: "PutAccountVdmAttributes",
}));

export type PutConfigurationSetArchivingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associate the configuration set with a MailManager archive. When you send email using the
 * `SendEmail` or `SendBulkEmail` operations the message as it will be given
 * to the receiving SMTP server will be archived, along with the recipient information.
 */
export const putConfigurationSetArchivingOptions: API.OperationMethod<
  PutConfigurationSetArchivingOptionsRequest & RegionInput,
  PutConfigurationSetArchivingOptionsResponse,
  PutConfigurationSetArchivingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2384, __c149, 0) as any as S.Schema<PutConfigurationSetArchivingOptionsRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutConfigurationSetArchivingOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetArchivingOptions",
  telemetry: TELEMETRY,
  span: "PutConfigurationSetArchivingOptions",
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
  PutConfigurationSetDeliveryOptionsRequest & RegionInput,
  PutConfigurationSetDeliveryOptionsResponse,
  PutConfigurationSetDeliveryOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c150, 0) as any as S.Schema<PutConfigurationSetDeliveryOptionsRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutConfigurationSetDeliveryOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetDeliveryOptions",
  telemetry: TELEMETRY,
  span: "PutConfigurationSetDeliveryOptions",
}));

export type PutConfigurationSetReputationOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable collection of reputation metrics for emails that you send using a
 * particular configuration set in a specific Amazon Web Services Region.
 */
export const putConfigurationSetReputationOptions: API.OperationMethod<
  PutConfigurationSetReputationOptionsRequest & RegionInput,
  PutConfigurationSetReputationOptionsResponse,
  PutConfigurationSetReputationOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2416, __c151, 0) as any as S.Schema<PutConfigurationSetReputationOptionsRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutConfigurationSetReputationOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetReputationOptions",
  telemetry: TELEMETRY,
  span: "PutConfigurationSetReputationOptions",
}));

export type PutConfigurationSetSendingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable email sending for messages that use a particular configuration set
 * in a specific Amazon Web Services Region.
 */
export const putConfigurationSetSendingOptions: API.OperationMethod<
  PutConfigurationSetSendingOptionsRequest & RegionInput,
  PutConfigurationSetSendingOptionsResponse,
  PutConfigurationSetSendingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c152, 0) as any as S.Schema<PutConfigurationSetSendingOptionsRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutConfigurationSetSendingOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSendingOptions",
  telemetry: TELEMETRY,
  span: "PutConfigurationSetSendingOptions",
}));

export type PutConfigurationSetSuppressionOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Specify the suppression list preferences for a configuration set. You can
 * also use this operation to specify a `SuppressionScope` to override the
 * suppression scope of the tenant or account for emails sent using this configuration
 * set.
 */
export const putConfigurationSetSuppressionOptions: API.OperationMethod<
  PutConfigurationSetSuppressionOptionsRequest & RegionInput,
  PutConfigurationSetSuppressionOptionsResponse,
  PutConfigurationSetSuppressionOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<PutConfigurationSetSuppressionOptionsRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutConfigurationSetSuppressionOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSuppressionOptions",
  telemetry: TELEMETRY,
  span: "PutConfigurationSetSuppressionOptions",
}));

export type PutConfigurationSetTrackingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Specify a custom domain to use for open and click tracking elements in email that you
 * send.
 */
export const putConfigurationSetTrackingOptions: API.OperationMethod<
  PutConfigurationSetTrackingOptionsRequest & RegionInput,
  PutConfigurationSetTrackingOptionsResponse,
  PutConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<PutConfigurationSetTrackingOptionsRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutConfigurationSetTrackingOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetTrackingOptions",
  telemetry: TELEMETRY,
  span: "PutConfigurationSetTrackingOptions",
}));

export type PutConfigurationSetVdmOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Specify VDM preferences for email that you send using the configuration set.
 *
 * You can execute this operation no more than once per second.
 */
export const putConfigurationSetVdmOptions: API.OperationMethod<
  PutConfigurationSetVdmOptionsRequest & RegionInput,
  PutConfigurationSetVdmOptionsResponse,
  PutConfigurationSetVdmOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<PutConfigurationSetVdmOptionsRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutConfigurationSetVdmOptionsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetVdmOptions",
  telemetry: TELEMETRY,
  span: "PutConfigurationSetVdmOptions",
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
 * associated with your Amazon Web Services account.
 *
 * The dedicated IP pool you specify must already exist. You can create a new pool by
 * using the `CreateDedicatedIpPool` operation.
 */
export const putDedicatedIpInPool: API.OperationMethod<
  PutDedicatedIpInPoolRequest & RegionInput,
  PutDedicatedIpInPoolResponse,
  PutDedicatedIpInPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<PutDedicatedIpInPoolRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutDedicatedIpInPoolResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpInPool",
  telemetry: TELEMETRY,
  span: "PutDedicatedIpInPool",
}));

export type PutDedicatedIpPoolScalingAttributesError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to convert a dedicated IP pool to a different scaling mode.
 *
 * `MANAGED` pools cannot be converted to `STANDARD` scaling mode.
 */
export const putDedicatedIpPoolScalingAttributes: API.OperationMethod<
  PutDedicatedIpPoolScalingAttributesRequest & RegionInput,
  PutDedicatedIpPoolScalingAttributesResponse,
  PutDedicatedIpPoolScalingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<PutDedicatedIpPoolScalingAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutDedicatedIpPoolScalingAttributesResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpPoolScalingAttributes",
  telemetry: TELEMETRY,
  span: "PutDedicatedIpPoolScalingAttributes",
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
  PutDedicatedIpWarmupAttributesRequest & RegionInput,
  PutDedicatedIpWarmupAttributesResponse,
  PutDedicatedIpWarmupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<PutDedicatedIpWarmupAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutDedicatedIpWarmupAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpWarmupAttributes",
  telemetry: TELEMETRY,
  span: "PutDedicatedIpWarmupAttributes",
}));

export type PutDeliverabilityDashboardOptionError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the Deliverability dashboard. When you enable the Deliverability dashboard, you gain
 * access to reputation, deliverability, and other metrics for the domains that you use to
 * send email. You also gain the ability to perform predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon SES and other Amazon Web Services services. For more
 * information about the features and cost of a Deliverability dashboard subscription, see Amazon SES Pricing.
 */
export const putDeliverabilityDashboardOption: API.OperationMethod<
  PutDeliverabilityDashboardOptionRequest & RegionInput,
  PutDeliverabilityDashboardOptionResponse,
  PutDeliverabilityDashboardOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<PutDeliverabilityDashboardOptionRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutDeliverabilityDashboardOptionResponse>,
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
  telemetry: TELEMETRY,
  span: "PutDeliverabilityDashboardOption",
}));

export type PutEmailIdentityConfigurationSetAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to associate a configuration set with an email identity.
 */
export const putEmailIdentityConfigurationSetAttributes: API.OperationMethod<
  PutEmailIdentityConfigurationSetAttributesRequest & RegionInput,
  PutEmailIdentityConfigurationSetAttributesResponse,
  PutEmailIdentityConfigurationSetAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<PutEmailIdentityConfigurationSetAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutEmailIdentityConfigurationSetAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityConfigurationSetAttributes",
  telemetry: TELEMETRY,
  span: "PutEmailIdentityConfigurationSetAttributes",
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
  PutEmailIdentityDkimAttributesRequest & RegionInput,
  PutEmailIdentityDkimAttributesResponse,
  PutEmailIdentityDkimAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<PutEmailIdentityDkimAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutEmailIdentityDkimAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimAttributes",
  telemetry: TELEMETRY,
  span: "PutEmailIdentityDkimAttributes",
}));

export type PutEmailIdentityDkimSigningAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to configure or change the DKIM authentication settings for an email domain
 * identity. You can use this operation to do any of the following:
 *
 * - Update the signing attributes for an identity that uses Bring Your Own DKIM
 * (BYODKIM).
 *
 * - Update the key length that should be used for Easy DKIM.
 *
 * - Change from using no DKIM authentication to using Easy DKIM.
 *
 * - Change from using no DKIM authentication to using BYODKIM.
 *
 * - Change from using Easy DKIM to using BYODKIM.
 *
 * - Change from using BYODKIM to using Easy DKIM.
 */
export const putEmailIdentityDkimSigningAttributes: API.OperationMethod<
  PutEmailIdentityDkimSigningAttributesRequest & RegionInput,
  PutEmailIdentityDkimSigningAttributesResponse,
  PutEmailIdentityDkimSigningAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<PutEmailIdentityDkimSigningAttributesRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<PutEmailIdentityDkimSigningAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimSigningAttributes",
  telemetry: TELEMETRY,
  span: "PutEmailIdentityDkimSigningAttributes",
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
 * If the value is `true`, you receive email notifications when bounce or
 * complaint events occur. These notifications are sent to the address that you specified
 * in the `Return-Path` header of the original email.
 *
 * You're required to have a method of tracking bounces and complaints. If you haven't
 * set up another mechanism for receiving bounce or complaint notifications (for example,
 * by setting up an event destination), you receive an email notification when these events
 * occur (even if this setting is disabled).
 */
export const putEmailIdentityFeedbackAttributes: API.OperationMethod<
  PutEmailIdentityFeedbackAttributesRequest & RegionInput,
  PutEmailIdentityFeedbackAttributesResponse,
  PutEmailIdentityFeedbackAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<PutEmailIdentityFeedbackAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutEmailIdentityFeedbackAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityFeedbackAttributes",
  telemetry: TELEMETRY,
  span: "PutEmailIdentityFeedbackAttributes",
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
  PutEmailIdentityMailFromAttributesRequest & RegionInput,
  PutEmailIdentityMailFromAttributesResponse,
  PutEmailIdentityMailFromAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<PutEmailIdentityMailFromAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutEmailIdentityMailFromAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityMailFromAttributes",
  telemetry: TELEMETRY,
  span: "PutEmailIdentityMailFromAttributes",
}));

export type PutSuppressedDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds an email address to the suppression list for your account or for a specific
 * tenant. To target a tenant's suppression list, specify the `TenantName`
 * parameter. If you omit `TenantName`, the address is added to the
 * account-level suppression list.
 */
export const putSuppressedDestination: API.OperationMethod<
  PutSuppressedDestinationRequest & RegionInput,
  PutSuppressedDestinationResponse,
  PutSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<PutSuppressedDestinationRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutSuppressedDestinationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSuppressedDestination",
  telemetry: TELEMETRY,
  span: "PutSuppressedDestination",
}));

export type PutTenantSuppressionAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Configure the suppression list preferences for a tenant. Use this operation to enable
 * or disable tenant-level suppression, or to change the suppressed reasons for a tenant.
 *
 * When you set the suppression scope to `TENANT`, Amazon SES maintains a separate
 * suppression list for the tenant. When you set the scope to `ACCOUNT`, the tenant
 * uses the account-level suppression list.
 */
export const putTenantSuppressionAttributes: API.OperationMethod<
  PutTenantSuppressionAttributesRequest & RegionInput,
  PutTenantSuppressionAttributesResponse,
  PutTenantSuppressionAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<PutTenantSuppressionAttributesRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<PutTenantSuppressionAttributesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTenantSuppressionAttributes",
  telemetry: TELEMETRY,
  span: "PutTenantSuppressionAttributes",
}));

export type SendBulkEmailError =
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
 * Composes an email message to multiple destinations.
 */
export const sendBulkEmail: API.OperationMethod<
  SendBulkEmailRequest & RegionInput,
  SendBulkEmailResponse,
  SendBulkEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(229, __c14, 5) as any as S.Schema<SendBulkEmailRequest>,
  output: __S(232, __c14, 8) as any as S.Schema<SendBulkEmailResponse>,
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
  operationName: "SendBulkEmail",
  telemetry: TELEMETRY,
  span: "SendBulkEmail",
}));

export type SendCustomVerificationEmailError =
  | BadRequestException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds an email address to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. As a result of executing this
 * operation, a customized verification email is sent to the specified address.
 *
 * To use this operation, you must first create a custom verification email template. For
 * more information about creating and using custom verification email templates, see
 * Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const sendCustomVerificationEmail: API.OperationMethod<
  SendCustomVerificationEmailRequest & RegionInput,
  SendCustomVerificationEmailResponse,
  SendCustomVerificationEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<SendCustomVerificationEmailRequest>,
  output: __S(272, __c17, 0) as any as S.Schema<SendCustomVerificationEmailResponse>,
  errors: [
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
  operationName: "SendCustomVerificationEmail",
  telemetry: TELEMETRY,
  span: "SendCustomVerificationEmail",
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
 * Sends an email message. You can use the Amazon SES API v2 to send the following types of
 * messages:
 *
 * - **Simple** - A standard email message. When
 * you create this type of message, you specify the sender, the recipient, and the
 * message body, and Amazon SES assembles the message for you.
 *
 * - **Raw** - A raw, MIME-formatted email
 * message. When you send this type of email, you have to specify all of the
 * message headers, as well as the message body. You can use this message type to
 * send messages that contain attachments. The message that you specify has to be a
 * valid MIME message.
 *
 * - **Templated** - A message that contains
 * personalization tags. When you send this type of email, Amazon SES API v2 automatically
 * replaces the tags with values that you specify.
 */
export const sendEmail: API.OperationMethod<
  SendEmailRequest & RegionInput,
  SendEmailResponse,
  SendEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(289, __c18, 1) as any as S.Schema<SendEmailRequest>,
  output: __S(272, __c17, 0) as any as S.Schema<SendEmailResponse>,
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
  telemetry: TELEMETRY,
  span: "SendEmail",
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
 * resource. Tags can help you categorize and manage resources in different ways, such as
 * by purpose, owner, environment, or other criteria. A resource can have as many as 50
 * tags.
 *
 * Each tag consists of a required *tag key* and an
 * associated *tag value*, both of which you define. A tag key is a
 * general label that acts as a category for more specific tag values. A tag value acts as
 * a descriptor within a tag key.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type TestRenderEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a preview of the MIME content of an email when provided with a template and a
 * set of replacement data.
 *
 * You can execute this operation no more than once per second.
 */
export const testRenderEmailTemplate: API.OperationMethod<
  TestRenderEmailTemplateRequest & RegionInput,
  TestRenderEmailTemplateResponse,
  TestRenderEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<TestRenderEmailTemplateRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<TestRenderEmailTemplateResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestRenderEmailTemplate",
  telemetry: TELEMETRY,
  span: "TestRenderEmailTemplate",
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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateConfigurationSetError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing configuration set.
 *
 * This operation performs a partial update. Only the attributes that you include in the
 * request are updated; any omitted attribute is left unchanged.
 */
export const updateConfigurationSet: API.OperationMethod<
  UpdateConfigurationSetRequest & RegionInput,
  UpdateConfigurationSetResponse,
  UpdateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<UpdateConfigurationSetRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateConfigurationSetResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSet",
  telemetry: TELEMETRY,
  span: "UpdateConfigurationSet",
}));

export type UpdateConfigurationSetEventDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the configuration of an event destination for a configuration set.
 *
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest & RegionInput,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<UpdateConfigurationSetEventDestinationRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateConfigurationSetEventDestinationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
  telemetry: TELEMETRY,
  span: "UpdateConfigurationSetEventDestination",
}));

export type UpdateContactError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a contact's preferences for a list.
 *
 * You must specify all existing topic preferences in the
 * `TopicPreferences` object, not just the ones that need updating;
 * otherwise, all your existing preferences will be removed.
 */
export const updateContact: API.OperationMethod<
  UpdateContactRequest & RegionInput,
  UpdateContactResponse,
  UpdateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<UpdateContactRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateContactResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContact",
  telemetry: TELEMETRY,
  span: "UpdateContact",
}));

export type UpdateContactListError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates contact list metadata. This operation does a complete replacement.
 */
export const updateContactList: API.OperationMethod<
  UpdateContactListRequest & RegionInput,
  UpdateContactListResponse,
  UpdateContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UpdateContactListRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateContactListResponse>,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactList",
  telemetry: TELEMETRY,
  span: "UpdateContactList",
}));

export type UpdateCustomVerificationEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateCustomVerificationEmailTemplate: API.OperationMethod<
  UpdateCustomVerificationEmailTemplateRequest & RegionInput,
  UpdateCustomVerificationEmailTemplateResponse,
  UpdateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<UpdateCustomVerificationEmailTemplateRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateCustomVerificationEmailTemplateResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomVerificationEmailTemplate",
  telemetry: TELEMETRY,
  span: "UpdateCustomVerificationEmailTemplate",
}));

export type UpdateEmailIdentityPolicyError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified sending authorization policy for the given identity (an email
 * address or a domain). This API returns successfully even if a policy with the specified
 * name does not exist.
 *
 * This API is for the identity owner only. If you have not verified the identity,
 * this API will return an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateEmailIdentityPolicy: API.OperationMethod<
  UpdateEmailIdentityPolicyRequest & RegionInput,
  UpdateEmailIdentityPolicyResponse,
  UpdateEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<UpdateEmailIdentityPolicyRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateEmailIdentityPolicyResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailIdentityPolicy",
  telemetry: TELEMETRY,
  span: "UpdateEmailIdentityPolicy",
}));

export type UpdateEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single API operation. For more information, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateEmailTemplate: API.OperationMethod<
  UpdateEmailTemplateRequest & RegionInput,
  UpdateEmailTemplateResponse,
  UpdateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<UpdateEmailTemplateRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateEmailTemplateResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailTemplate",
  telemetry: TELEMETRY,
  span: "UpdateEmailTemplate",
}));

export type UpdateReputationEntityCustomerManagedStatusError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the customer-managed sending status for a reputation entity. This allows
 * you to enable, disable, or reinstate sending for the entity.
 *
 * The customer-managed status works in conjunction with the Amazon Web Services Amazon SES-managed status
 * to determine the overall sending capability. When you update the customer-managed status,
 * the Amazon Web Services Amazon SES-managed status remains unchanged. If Amazon Web Services Amazon SES has disabled the entity,
 * it will not be allowed to send regardless of the customer-managed status setting. When you
 * reinstate an entity through the customer-managed status, it can continue sending only if
 * the Amazon Web Services Amazon SES-managed status also permits sending, even if there are active reputation
 * findings, until the findings are resolved or new violations occur.
 */
export const updateReputationEntityCustomerManagedStatus: API.OperationMethod<
  UpdateReputationEntityCustomerManagedStatusRequest & RegionInput,
  UpdateReputationEntityCustomerManagedStatusResponse,
  UpdateReputationEntityCustomerManagedStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<UpdateReputationEntityCustomerManagedStatusRequest>,
  output: __S(
    512,
    __c32,
    0,
  ) as any as S.Schema<UpdateReputationEntityCustomerManagedStatusResponse>,
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReputationEntityCustomerManagedStatus",
  telemetry: TELEMETRY,
  span: "UpdateReputationEntityCustomerManagedStatus",
}));

export type UpdateReputationEntityPolicyError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the reputation management policy for a reputation entity. The policy
 * determines how the entity responds to reputation findings, such as automatically
 * pausing sending when certain thresholds are exceeded.
 *
 * Reputation management policies are Amazon Web Services Amazon SES-managed (predefined policies).
 * You can select from none, standard, and strict policies.
 */
export const updateReputationEntityPolicy: API.OperationMethod<
  UpdateReputationEntityPolicyRequest & RegionInput,
  UpdateReputationEntityPolicyResponse,
  UpdateReputationEntityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<UpdateReputationEntityPolicyRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateReputationEntityPolicyResponse>,
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReputationEntityPolicy",
  telemetry: TELEMETRY,
  span: "UpdateReputationEntityPolicy",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          SuppressionScope: S.optional(S.String),
          SuppressedReasons: S.optional(__S(592, __c37, 0)),
          ValidationOptions: S.optional(__S(626, __c39, 2)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/suppression-options",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConfigurationSetSuppressionOptionsRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          CustomRedirectDomain: S.optional(S.String),
          HttpsPolicy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/tracking-options",
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
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          VdmOptions: S.optional(__S(672, __c42, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/vdm-options",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConfigurationSetVdmOptionsRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Ip: S.String.pipe(T.HttpLabel("Ip")), DestinationPoolName: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/dedicated-ips/{Ip}/pool" }),
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
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PoolName: S.String.pipe(T.HttpLabel("PoolName")), ScalingMode: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/dedicated-ip-pools/{PoolName}/scaling" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDedicatedIpPoolScalingAttributesRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Ip: S.String.pipe(T.HttpLabel("Ip")), WarmupPercentage: S.Number }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/dedicated-ips/{Ip}/warmup" }),
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
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DashboardEnabled: S.Boolean,
          SubscribedDomains: S.optional(__S(1650, __c103, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/deliverability-dashboard" }),
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
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          ConfigurationSetName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/identities/{EmailIdentity}/configuration-set",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEmailIdentityConfigurationSetAttributesRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          SigningEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/identities/{EmailIdentity}/dkim" }),
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
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          SigningAttributesOrigin: S.String,
          SigningAttributes: S.optional(__S(944, __c59, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/identities/{EmailIdentity}/dkim/signing" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEmailIdentityDkimSigningAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DkimStatus: S.optional(S.String),
          DkimTokens: S.optional(__S(960, __c60, 0)),
          SigningHostedZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutEmailIdentityDkimSigningAttributesResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          EmailForwardingEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/identities/{EmailIdentity}/feedback" }),
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
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          MailFromDomain: S.optional(S.String),
          BehaviorOnMxFailure: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/identities/{EmailIdentity}/mail-from" }),
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.String,
          Reason: S.String,
          TenantName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/suppression/addresses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSuppressedDestinationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TenantName: S.String,
          SuppressedReasons: S.optional(__S(592, __c37, 0)),
          SuppressionScope: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/tenant/suppression" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTenantSuppressionAttributesRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Template: S.optional(__S(866, __c54, 2)) })).annotate({
        identifier: "BulkEmailContent",
      });
    case 1:
      return S.suspend(() => S.Struct({ ReplacementTemplateData: S.optional(S.String) })).annotate({
        identifier: "ReplacementTemplate",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ ReplacementTemplate: S.optional(__S(225, __c14, 1)) }),
      ).annotate({ identifier: "ReplacementEmailContent" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Destination: __S(240, __c15, 0),
          ReplacementTags: S.optional(__S(913, __c57, 1)),
          ReplacementEmailContent: S.optional(__S(226, __c14, 2)),
          ReplacementHeaders: S.optional(__S(913, __c57, 1)),
        }),
      ).annotate({ identifier: "BulkEmailEntry" });
    case 4:
      return S.Array(__S(227, __c14, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          FromEmailAddress: S.optional(S.String),
          FromEmailAddressIdentityArn: S.optional(S.String),
          ReplyToAddresses: S.optional(__S(960, __c60, 0)),
          FeedbackForwardingEmailAddress: S.optional(S.String),
          FeedbackForwardingEmailAddressIdentityArn: S.optional(S.String),
          DefaultEmailTags: S.optional(__S(913, __c57, 1)),
          DefaultContent: __S(224, __c14, 0),
          BulkEmailEntries: __S(228, __c14, 4),
          ConfigurationSetName: S.optional(S.String),
          EndpointId: S.optional(S.String).pipe(T.ContextParam("EndpointId")),
          TenantName: S.optional(S.String),
          ConfigurationOverrides: S.optional(__S(242, __c15, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/outbound-bulk-emails" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendBulkEmailRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          Error: S.optional(S.String),
          MessageId: S.optional(S.String),
        }),
      ).annotate({ identifier: "BulkEmailEntryResult" });
    case 7:
      return S.Array(__S(230, __c14, 6));
    case 8:
      return S.suspend(() => S.Struct({ BulkEmailEntryResults: __S(231, __c14, 7) })).annotate({
        identifier: "SendBulkEmailResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ToAddresses: S.optional(__S(960, __c60, 0)),
          CcAddresses: S.optional(__S(960, __c60, 0)),
          BccAddresses: S.optional(__S(960, __c60, 0)),
        }),
      ).annotate({ identifier: "Destination" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OpenTrackingEnabled: S.optional(S.String),
          ClickTrackingEnabled: S.optional(S.String),
        }),
      ).annotate({ identifier: "TrackingConfigurationOverrides" });
    case 2:
      return S.suspend(() => S.Struct({ Tracking: S.optional(__S(241, __c15, 1)) })).annotate({
        identifier: "ConfigurationOverrides",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.String,
          TemplateName: S.String,
          ConfigurationSetName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/outbound-custom-verification-emails" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendCustomVerificationEmailRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MessageId: S.optional(S.String) })).annotate({
        identifier: "SendCustomVerificationEmailResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContactListName: S.String, TopicName: S.optional(S.String) }),
      ).annotate({ identifier: "ListManagementOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FromEmailAddress: S.optional(S.String),
          FromEmailAddressIdentityArn: S.optional(S.String),
          Destination: S.optional(__S(240, __c15, 0)),
          ReplyToAddresses: S.optional(__S(960, __c60, 0)),
          FeedbackForwardingEmailAddress: S.optional(S.String),
          FeedbackForwardingEmailAddressIdentityArn: S.optional(S.String),
          Content: __S(884, __c55, 4),
          EmailTags: S.optional(__S(913, __c57, 1)),
          ConfigurationSetName: S.optional(S.String),
          EndpointId: S.optional(S.String).pipe(T.ContextParam("EndpointId")),
          TenantName: S.optional(S.String),
          ListManagementOptions: S.optional(__S(288, __c18, 0)),
          ConfigurationOverrides: S.optional(__S(242, __c15, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/outbound-emails" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendEmailRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(609, __c38, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/email/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
          TemplateData: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/templates/{TemplateName}/render" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestRenderEmailTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RenderedTemplate: S.String })).annotate({
        identifier: "TestRenderEmailTemplateResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")),
          TagKeys: __S(960, __c60, 0).pipe(T.HttpQuery("TagKeys")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v2/email/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String,
          MessageSecurityOptions: S.optional(__S(690, __c43, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/update-configuration-sets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigurationSetRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
          EventDestination: __S(720, __c45, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
          EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
          TopicPreferences: S.optional(__S(769, __c48, 1)),
          UnsubscribeAll: S.optional(S.Boolean),
          AttributesData: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateContactRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
          Topics: S.optional(__S(801, __c50, 1)),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/contact-lists/{ContactListName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateContactListRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
          FromEmailAddress: S.String,
          TemplateSubject: S.String,
          TemplateContent: S.String,
          SuccessRedirectionURL: S.String,
          FailureRedirectionURL: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/custom-verification-email-templates/{TemplateName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCustomVerificationEmailTemplateRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          PolicyName: S.String.pipe(T.HttpLabel("PolicyName")),
          Policy: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEmailIdentityPolicyRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
          TemplateContent: __S(896, __c56, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/templates/{TemplateName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEmailTemplateRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReputationEntityType: S.String.pipe(T.HttpLabel("ReputationEntityType")),
          ReputationEntityReference: S.String.pipe(T.HttpLabel("ReputationEntityReference")),
          SendingStatus: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}/customer-managed-status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateReputationEntityCustomerManagedStatusRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReputationEntityType: S.String.pipe(T.HttpLabel("ReputationEntityType")),
          ReputationEntityReference: S.String.pipe(T.HttpLabel("ReputationEntityReference")),
          ReputationEntityPolicy: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateReputationEntityPolicyRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String,
          FromAddress: S.optional(S.String),
          CertificateArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/identity/certificates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateEmailIdentityCertificateRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateEmailIdentityCertificateResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Namespace: S.String,
          Metric: S.String,
          Dimensions: S.optional(__S(544, __c34, 0)),
          StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "BatchGetMetricDataQuery" });
    case 1:
      return S.Array(__S(528, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Queries: __S(529, __c33, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/metrics/batch" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetMetricDataRequest" });
    case 3:
      return S.Array(/*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")));
    case 4:
      return S.Array(S.Number);
    case 5:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Timestamps: S.optional(__S(531, __c33, 3)),
          Values: S.optional(__S(532, __c33, 4)),
        }),
      ).annotate({ identifier: "MetricDataResult" });
    case 6:
      return S.Array(__S(533, __c33, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricDataError" });
    case 8:
      return S.Array(__S(535, __c33, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Results: S.optional(__S(534, __c33, 6)),
          Errors: S.optional(__S(536, __c33, 8)),
        }),
      ).annotate({ identifier: "BatchGetMetricDataResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/export-jobs/{JobId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelExportJobRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String,
          TrackingOptions: S.optional(__S(656, __c41, 0)),
          DeliveryOptions: S.optional(__S(657, __c41, 1)),
          ReputationOptions: S.optional(__S(658, __c41, 2)),
          SendingOptions: S.optional(__S(659, __c41, 3)),
          Tags: S.optional(__S(609, __c38, 1)),
          SuppressionOptions: S.optional(__S(660, __c41, 4)),
          VdmOptions: S.optional(__S(672, __c42, 0)),
          ArchivingOptions: S.optional(__S(661, __c41, 5)),
          MessageSecurityOptions: S.optional(__S(690, __c43, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/configuration-sets" }),
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
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(608, __c38, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ConfidenceVerdictThreshold: S.String })).annotate({
        identifier: "SuppressionConfidenceThreshold",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConditionThresholdEnabled: S.String,
          OverallConfidenceThreshold: S.optional(__S(624, __c39, 0)),
        }),
      ).annotate({ identifier: "SuppressionConditionThreshold" });
    case 2:
      return S.suspend(() => S.Struct({ ConditionThreshold: __S(625, __c39, 1) })).annotate({
        identifier: "SuppressionValidationOptions",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EngagementMetrics: S.optional(S.String) })).annotate({
        identifier: "DashboardOptions",
      });
    case 1:
      return S.suspend(() => S.Struct({ OptimizedSharedDelivery: S.optional(S.String) })).annotate({
        identifier: "GuardianOptions",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CustomRedirectDomain: S.String, HttpsPolicy: S.optional(S.String) }),
      ).annotate({ identifier: "TrackingOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TlsPolicy: S.optional(S.String),
          SendingPoolName: S.optional(S.String),
          MaxDeliverySeconds: S.optional(S.Number),
        }),
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
    case 4:
      return S.suspend(() =>
        S.Struct({
          SuppressedReasons: S.optional(__S(592, __c37, 0)),
          SuppressionScope: S.optional(S.String),
          ValidationOptions: S.optional(__S(626, __c39, 2)),
        }),
      ).annotate({ identifier: "SuppressionOptions" });
    case 5:
      return S.suspend(() => S.Struct({ ArchiveArn: S.optional(S.String) })).annotate({
        identifier: "ArchivingOptions",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DashboardOptions: S.optional(__S(640, __c40, 0)),
          GuardianOptions: S.optional(__S(641, __c40, 1)),
        }),
      ).annotate({ identifier: "VdmOptions" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SignatureFormat: S.optional(S.String) })).annotate({
        identifier: "SmimeSigningScheme",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ DefaultScheme: __S(512, __c32, 0) }),
        /*@__PURE__*/ S.Struct({ SmimeScheme: __S(688, __c43, 0) }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ SigningScheme: S.optional(__S(689, __c43, 1)) })).annotate({
        identifier: "MessageSecurityOptions",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          EventDestinationName: S.String,
          EventDestination: __S(720, __c45, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/event-destinations",
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
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          MatchingEventTypes: S.optional(__S(592, __c37, 0)),
          KinesisFirehoseDestination: S.optional(__S(736, __c46, 0)),
          CloudWatchDestination: S.optional(__S(739, __c46, 3)),
          SnsDestination: S.optional(__S(740, __c46, 4)),
          EventBridgeDestination: S.optional(__S(741, __c46, 5)),
          PinpointDestination: S.optional(__S(742, __c46, 6)),
        }),
      ).annotate({ identifier: "EventDestinationDefinition" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IamRoleArn: S.String, DeliveryStreamArn: S.String }),
      ).annotate({ identifier: "KinesisFirehoseDestination" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DimensionName: S.String,
          DimensionValueSource: S.String,
          DefaultDimensionValue: S.String,
        }),
      ).annotate({ identifier: "CloudWatchDimensionConfiguration" });
    case 2:
      return S.Array(__S(737, __c46, 1));
    case 3:
      return S.suspend(() => S.Struct({ DimensionConfigurations: __S(738, __c46, 2) })).annotate({
        identifier: "CloudWatchDestination",
      });
    case 4:
      return S.suspend(() => S.Struct({ TopicArn: S.String })).annotate({
        identifier: "SnsDestination",
      });
    case 5:
      return S.suspend(() => S.Struct({ EventBusArn: S.String })).annotate({
        identifier: "EventBridgeDestination",
      });
    case 6:
      return S.suspend(() => S.Struct({ ApplicationArn: S.optional(S.String) })).annotate({
        identifier: "PinpointDestination",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
          EmailAddress: S.String,
          TopicPreferences: S.optional(__S(769, __c48, 1)),
          UnsubscribeAll: S.optional(S.Boolean),
          AttributesData: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/contact-lists/{ContactListName}/contacts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContactRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TopicName: S.String, SubscriptionStatus: S.String }),
      ).annotate({ identifier: "TopicPreference" });
    case 1:
      return S.Array(__S(768, __c48, 0));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.String,
          Topics: S.optional(__S(801, __c50, 1)),
          Description: S.optional(S.String),
          Tags: S.optional(__S(609, __c38, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/contact-lists" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContactListRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TopicName: S.String,
          DisplayName: S.String,
          Description: S.optional(S.String),
          DefaultSubscriptionStatus: S.String,
        }),
      ).annotate({ identifier: "Topic" });
    case 1:
      return S.Array(__S(800, __c50, 0));
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String,
          FromEmailAddress: S.String,
          TemplateSubject: S.String,
          TemplateContent: S.String,
          Tags: S.optional(__S(609, __c38, 1)),
          SuccessRedirectionURL: S.String,
          FailureRedirectionURL: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/custom-verification-email-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomVerificationEmailTemplateRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolName: S.String,
          Tags: S.optional(__S(609, __c38, 1)),
          ScalingMode: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/dedicated-ip-pools" }),
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
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportName: S.optional(S.String),
          FromEmailAddress: S.String,
          Content: __S(884, __c55, 4),
          Tags: S.optional(__S(609, __c38, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/deliverability-dashboard/test" }),
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
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RawContent: T.Blob,
          ContentDisposition: S.optional(S.String),
          FileName: S.String,
          ContentDescription: S.optional(S.String),
          ContentId: S.optional(S.String),
          ContentTransferEncoding: S.optional(S.String),
          ContentType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Attachment" });
    case 1:
      return S.Array(__S(864, __c54, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.optional(S.String),
          TemplateArn: S.optional(S.String),
          TemplateContent: S.optional(__S(896, __c56, 0)),
          TemplateData: S.optional(S.String),
          Headers: S.optional(__S(913, __c57, 1)),
          Attachments: S.optional(__S(865, __c54, 1)),
        }),
      ).annotate({ identifier: "Template" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Data: S.String, Charset: S.optional(S.String) })).annotate({
        identifier: "Content",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(__S(880, __c55, 0)), Html: S.optional(__S(880, __c55, 0)) }),
      ).annotate({ identifier: "Body" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Subject: __S(880, __c55, 0),
          Body: __S(881, __c55, 1),
          Headers: S.optional(__S(913, __c57, 1)),
          Attachments: S.optional(__S(865, __c54, 1)),
        }),
      ).annotate({ identifier: "Message" });
    case 3:
      return S.suspend(() => S.Struct({ Data: T.Blob })).annotate({ identifier: "RawMessage" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Simple: S.optional(__S(882, __c55, 2)),
          Raw: S.optional(__S(883, __c55, 3)),
          Template: S.optional(__S(866, __c54, 2)),
        }),
      ).annotate({ identifier: "EmailContent" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Subject: S.optional(S.String),
          Text: S.optional(S.String),
          Html: S.optional(S.String),
        }),
      ).annotate({ identifier: "EmailTemplateContent" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "MessageHeader",
      });
    case 1:
      return S.Array(__S(912, __c57, 0));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String,
          Tags: S.optional(__S(609, __c38, 1)),
          DkimSigningAttributes: S.optional(__S(944, __c59, 0)),
          ConfigurationSetName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/identities" }),
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
          DkimAttributes: S.optional(__S(976, __c61, 0)),
        }),
      ).annotate({ identifier: "CreateEmailIdentityResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainSigningSelector: S.optional(S.String),
          DomainSigningPrivateKey: S.optional(SensitiveString),
          NextSigningKeyLength: S.optional(S.String),
          DomainSigningAttributesOrigin: S.optional(S.String),
        }),
      ).annotate({ identifier: "DkimSigningAttributes" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SigningEnabled: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Tokens: S.optional(__S(960, __c60, 0)),
          SigningHostedZone: S.optional(S.String),
          SigningAttributesOrigin: S.optional(S.String),
          NextSigningKeyLength: S.optional(S.String),
          CurrentSigningKeyLength: S.optional(S.String),
          LastKeyGenerationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DkimAttributes" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          PolicyName: S.String.pipe(T.HttpLabel("PolicyName")),
          Policy: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEmailIdentityPolicyRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String,
          TemplateContent: __S(896, __c56, 0),
          Tags: S.optional(__S(609, __c38, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEmailTemplateRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExportDataSource: __S(1078, __c67, 6),
          ExportDestination: __S(1079, __c67, 7),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/export-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateExportJobRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ JobId: S.optional(S.String) })).annotate({
        identifier: "CreateExportJobResponse",
      });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(960, __c60, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Aggregation: S.optional(S.String) }),
      ).annotate({ identifier: "ExportMetric" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Dimensions: __S(1072, __c67, 0),
          Namespace: S.String,
          Metrics: __S(1074, __c67, 2),
          StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "MetricsDataSource" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          FromEmailAddress: S.optional(__S(1056, __c66, 0)),
          Destination: S.optional(__S(1056, __c66, 0)),
          Subject: S.optional(__S(1056, __c66, 0)),
          Isp: S.optional(__S(960, __c60, 0)),
          TenantName: S.optional(__S(960, __c60, 0)),
          LastDeliveryEvent: S.optional(__S(592, __c37, 0)),
          LastEngagementEvent: S.optional(__S(592, __c37, 0)),
        }),
      ).annotate({ identifier: "MessageInsightsFilters" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Include: S.optional(__S(1076, __c67, 4)),
          Exclude: S.optional(__S(1076, __c67, 4)),
          MaxResults: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MessageInsightsDataSource" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          MetricsDataSource: S.optional(__S(1075, __c67, 3)),
          MessageInsightsDataSource: S.optional(__S(1077, __c67, 5)),
        }),
      ).annotate({ identifier: "ExportDataSource" });
    case 7:
      return S.suspend(() =>
        S.Struct({ DataFormat: S.String, S3Url: S.optional(S.String) }),
      ).annotate({ identifier: "ExportDestination" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImportDestination: __S(1122, __c70, 2),
          ImportDataSource: __S(1104, __c69, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/import-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateImportJobRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ S3Url: S.String, DataFormat: S.String })).annotate({
        identifier: "ImportDataSource",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SuppressionListImportAction: S.String })).annotate({
        identifier: "SuppressionListDestination",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ ContactListName: S.String, ContactListImportAction: S.String }),
      ).annotate({ identifier: "ContactListDestination" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SuppressionListDestination: S.optional(__S(1120, __c70, 0)),
          ContactListDestination: S.optional(__S(1121, __c70, 1)),
        }),
      ).annotate({ identifier: "ImportDestination" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RoutesDetails: __S(1153, __c72, 1) })).annotate({
        identifier: "Details",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.String,
          Details: __S(1136, __c71, 0),
          Tags: S.optional(__S(609, __c38, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/multi-region-endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMultiRegionEndpointRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), EndpointId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateMultiRegionEndpointResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Region: S.String })).annotate({
        identifier: "RouteDetails",
      });
    case 1:
      return S.Array(__S(1152, __c72, 0));
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TenantName: S.String,
          Tags: S.optional(__S(609, __c38, 1)),
          SuppressionAttributes: S.optional(__S(1184, __c74, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/email/tenants" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTenantRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SuppressedReasons: S.optional(__S(592, __c37, 0)),
          SuppressionScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "TenantSuppressionAttributes" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TenantName: S.optional(S.String),
          TenantId: S.optional(S.String),
          TenantArn: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(609, __c38, 1)),
          SendingStatus: S.optional(S.String),
          SuppressionAttributes: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "CreateTenantResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TenantName: S.String, ResourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/tenants/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTenantResourceAssociationRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}",
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
function __c77(j: number): any {
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
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
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
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
          EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContactRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContactListName: S.String.pipe(T.HttpLabel("ContactListName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/email/contact-lists/{ContactListName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContactListRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String.pipe(T.HttpLabel("TemplateName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/email/custom-verification-email-templates/{TemplateName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomVerificationEmailTemplateRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PoolName: S.String.pipe(T.HttpLabel("PoolName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/email/dedicated-ip-pools/{PoolName}" }),
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
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/email/identities/{EmailIdentity}" }),
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
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
          PolicyName: S.String.pipe(T.HttpLabel("PolicyName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEmailIdentityPolicyRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String.pipe(T.HttpLabel("TemplateName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/email/templates/{TemplateName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEmailTemplateRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointName: S.String.pipe(T.HttpLabel("EndpointName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/email/multi-region-endpoints/{EndpointName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMultiRegionEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "DeleteMultiRegionEndpointResponse",
      });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
          TenantName: S.optional(S.String).pipe(T.HttpQuery("TenantName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/email/suppression/addresses/{EmailAddress}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSuppressedDestinationRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TenantName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/tenants/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTenantRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TenantName: S.String, ResourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/tenants/resources/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTenantResourceAssociationRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailIdentity: S.String, FromAddress: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/identity/certificates/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateEmailIdentityCertificateRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/email/account" }), svc, auth, proto, ver, rules),
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
          SuppressedReasons: S.optional(__S(592, __c37, 0)),
          ValidationAttributes: S.optional(__S(626, __c39, 2)),
        }),
      ).annotate({ identifier: "SuppressionAttributes" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), CaseId: S.optional(S.String) }),
      ).annotate({ identifier: "ReviewDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          MailType: S.optional(S.String),
          WebsiteURL: S.optional(SensitiveString),
          ContactLanguage: S.optional(S.String),
          UseCaseDescription: S.optional(SensitiveString),
          AdditionalContactEmailAddresses: S.optional(__S(1056, __c66, 0)),
          ReviewDetails: S.optional(__S(1443, __c90, 3)),
        }),
      ).annotate({ identifier: "AccountDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({ CurrentPlan: S.optional(S.String), NextPlan: S.optional(S.String) }),
      ).annotate({ identifier: "PricingAttributes" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DedicatedIpAutoWarmupEnabled: S.optional(S.Boolean),
          EnforcementStatus: S.optional(S.String),
          ProductionAccessEnabled: S.optional(S.Boolean),
          SendQuota: S.optional(__S(1441, __c90, 1)),
          SendingEnabled: S.optional(S.Boolean),
          SuppressionAttributes: S.optional(__S(1442, __c90, 2)),
          Details: S.optional(__S(1444, __c90, 4)),
          VdmAttributes: S.optional(__S(1456, __c91, 0)),
          PricingAttributes: S.optional(__S(1445, __c90, 5)),
        }),
      ).annotate({ identifier: "GetAccountResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VdmEnabled: S.String,
          DashboardAttributes: S.optional(__S(640, __c40, 0)),
          GuardianAttributes: S.optional(__S(641, __c40, 1)),
        }),
      ).annotate({ identifier: "VdmAttributes" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlacklistItemNames: __S(960, __c60, 0).pipe(T.HttpQuery("BlacklistItemNames")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/deliverability-dashboard/blacklist-report" }),
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
      return S.Array(__S(1473, __c92, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(1474, __c92, 2).pipe(S.optional));
    case 4:
      return S.suspend(() => S.Struct({ BlacklistReport: __S(1475, __c92, 3) })).annotate({
        identifier: "GetBlacklistReportsResponse",
      });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/configuration-sets/{ConfigurationSetName}" }),
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
          TrackingOptions: S.optional(__S(656, __c41, 0)),
          DeliveryOptions: S.optional(__S(657, __c41, 1)),
          ReputationOptions: S.optional(__S(658, __c41, 2)),
          SendingOptions: S.optional(__S(659, __c41, 3)),
          Tags: S.optional(__S(609, __c38, 1)),
          SuppressionOptions: S.optional(__S(660, __c41, 4)),
          VdmOptions: S.optional(__S(672, __c42, 0)),
          ArchivingOptions: S.optional(__S(661, __c41, 5)),
          MessageSecurityOptions: S.optional(__S(690, __c43, 2)),
        }),
      ).annotate({ identifier: "GetConfigurationSetResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/event-destinations",
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
          MatchingEventTypes: __S(592, __c37, 0),
          KinesisFirehoseDestination: S.optional(__S(736, __c46, 0)),
          CloudWatchDestination: S.optional(__S(739, __c46, 3)),
          SnsDestination: S.optional(__S(740, __c46, 4)),
          EventBridgeDestination: S.optional(__S(741, __c46, 5)),
          PinpointDestination: S.optional(__S(742, __c46, 6)),
        }),
      ).annotate({ identifier: "EventDestination" });
    case 2:
      return S.Array(__S(1505, __c94, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ EventDestinations: S.optional(__S(1506, __c94, 2)) }),
      ).annotate({ identifier: "GetConfigurationSetEventDestinationsResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
          EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContactRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.optional(S.String),
          EmailAddress: S.optional(S.String),
          TopicPreferences: S.optional(__S(769, __c48, 1)),
          TopicDefaultPreferences: S.optional(__S(769, __c48, 1)),
          UnsubscribeAll: S.optional(S.Boolean),
          AttributesData: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetContactResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContactListName: S.String.pipe(T.HttpLabel("ContactListName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/contact-lists/{ContactListName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContactListRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.optional(S.String),
          Topics: S.optional(__S(801, __c50, 1)),
          Description: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(609, __c38, 1)),
        }),
      ).annotate({ identifier: "GetContactListResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String.pipe(T.HttpLabel("TemplateName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/email/custom-verification-email-templates/{TemplateName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomVerificationEmailTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.optional(S.String),
          FromEmailAddress: S.optional(S.String),
          TemplateSubject: S.optional(S.String),
          TemplateContent: S.optional(S.String),
          Tags: S.optional(__S(609, __c38, 1)),
          SuccessRedirectionURL: S.optional(S.String),
          FailureRedirectionURL: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCustomVerificationEmailTemplateResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Ip: S.String.pipe(T.HttpLabel("Ip")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/dedicated-ips/{Ip}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDedicatedIpRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DedicatedIp: S.optional(__S(1584, __c99, 0)) })).annotate({
        identifier: "GetDedicatedIpResponse",
      });
  }
}
function __c99(j: number): any {
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
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PoolName: S.String.pipe(T.HttpLabel("PoolName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/dedicated-ip-pools/{PoolName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDedicatedIpPoolRequest" });
    case 1:
      return S.suspend(() => S.Struct({ PoolName: S.String, ScalingMode: S.String })).annotate({
        identifier: "DedicatedIpPool",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ DedicatedIpPool: S.optional(__S(1601, __c100, 1)) }),
      ).annotate({ identifier: "GetDedicatedIpPoolResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolName: S.optional(S.String).pipe(T.HttpQuery("PoolName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/dedicated-ips" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDedicatedIpsRequest" });
    case 1:
      return S.Array(__S(1584, __c99, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DedicatedIps: S.optional(__S(1617, __c101, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDedicatedIpsResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/deliverability-dashboard" }),
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
          ActiveSubscribedDomains: S.optional(__S(1650, __c103, 2)),
          PendingExpirationSubscribedDomains: S.optional(__S(1650, __c103, 2)),
        }),
      ).annotate({ identifier: "GetDeliverabilityDashboardOptionsResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Global: S.optional(S.Boolean), TrackedIsps: S.optional(__S(960, __c60, 0)) }),
      ).annotate({ identifier: "InboxPlacementTrackingOption" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          SubscriptionStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InboxPlacementTrackingOption: S.optional(__S(1648, __c103, 0)),
        }),
      ).annotate({ identifier: "DomainDeliverabilityTrackingOption" });
    case 2:
      return S.Array(__S(1649, __c103, 1));
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportId: S.String.pipe(T.HttpLabel("ReportId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/email/deliverability-dashboard/test-reports/{ReportId}",
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
          PlacementStatistics: S.optional(__S(1665, __c104, 1)),
        }),
      ).annotate({ identifier: "IspPlacement" });
    case 3:
      return S.Array(__S(1666, __c104, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          DeliverabilityTestReport: __S(1680, __c105, 0),
          OverallPlacement: __S(1665, __c104, 1),
          IspPlacements: __S(1667, __c104, 3),
          Message: S.optional(S.String),
          Tags: S.optional(__S(609, __c38, 1)),
        }),
      ).annotate({ identifier: "GetDeliverabilityTestReportResponse" });
  }
}
function __c105(j: number): any {
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
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CampaignId: S.String.pipe(T.HttpLabel("CampaignId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/email/deliverability-dashboard/campaigns/{CampaignId}",
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
        S.Struct({ DomainDeliverabilityCampaign: __S(1712, __c107, 0) }),
      ).annotate({ identifier: "GetDomainDeliverabilityCampaignResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CampaignId: S.optional(S.String),
          ImageUrl: S.optional(S.String),
          Subject: S.optional(S.String),
          FromAddress: S.optional(S.String),
          SendingIps: S.optional(__S(960, __c60, 0)),
          FirstSeenDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSeenDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InboxCount: S.optional(S.Number),
          SpamCount: S.optional(S.Number),
          ReadRate: S.optional(S.Number),
          DeleteRate: S.optional(S.Number),
          ReadDeleteRate: S.optional(S.Number),
          ProjectedVolume: S.optional(S.Number),
          Esps: S.optional(__S(960, __c60, 0)),
        }),
      ).annotate({ identifier: "DomainDeliverabilityCampaign" });
  }
}
function __c108(j: number): any {
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
              uri: "/v2/email/deliverability-dashboard/statistics-report/{Domain}",
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
      return S.Array(__S(1730, __c108, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          VolumeStatistics: S.optional(__S(1729, __c108, 1)),
          ReadRatePercent: S.optional(S.Number),
          DomainIspPlacements: S.optional(__S(1731, __c108, 3)),
        }),
      ).annotate({ identifier: "OverallVolume" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VolumeStatistics: S.optional(__S(1729, __c108, 1)),
          DomainIspPlacements: S.optional(__S(1731, __c108, 3)),
        }),
      ).annotate({ identifier: "DailyVolume" });
    case 6:
      return S.Array(__S(1733, __c108, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ OverallVolume: __S(1732, __c108, 4), DailyVolumes: __S(1734, __c108, 6) }),
      ).annotate({ identifier: "GetDomainStatisticsReportResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailAddress: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/email-address-insights" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEmailAddressInsightsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ConfidenceVerdict: S.optional(S.String) })).annotate({
        identifier: "EmailAddressInsightsVerdict",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          HasValidSyntax: S.optional(__S(1745, __c109, 1)),
          HasValidDnsRecords: S.optional(__S(1745, __c109, 1)),
          MailboxExists: S.optional(__S(1745, __c109, 1)),
          IsRoleAddress: S.optional(__S(1745, __c109, 1)),
          IsDisposable: S.optional(__S(1745, __c109, 1)),
          IsRandomInput: S.optional(__S(1745, __c109, 1)),
        }),
      ).annotate({ identifier: "EmailAddressInsightsMailboxEvaluations" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          IsValid: S.optional(__S(1745, __c109, 1)),
          Evaluations: S.optional(__S(1746, __c109, 2)),
        }),
      ).annotate({ identifier: "MailboxValidation" });
    case 4:
      return S.suspend(() =>
        S.Struct({ MailboxValidation: S.optional(__S(1747, __c109, 3)) }),
      ).annotate({ identifier: "GetEmailAddressInsightsResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/identities/{EmailIdentity}" }),
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
          MailFromDomain: S.optional(S.String),
          MailFromDomainStatus: S.optional(S.String),
          BehaviorOnMxFailure: S.optional(S.String),
        }),
      ).annotate({ identifier: "MailFromAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          PrimaryNameServer: S.optional(S.String),
          AdminEmail: S.optional(S.String),
          SerialNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SOARecord" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          LastCheckedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSuccessTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorType: S.optional(S.String),
          SOARecord: S.optional(__S(1762, __c110, 2)),
        }),
      ).annotate({ identifier: "VerificationInfo" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          IdentityType: S.optional(S.String),
          FeedbackForwardingStatus: S.optional(S.Boolean),
          VerifiedForSendingStatus: S.optional(S.Boolean),
          DkimAttributes: S.optional(__S(976, __c61, 0)),
          MailFromAttributes: S.optional(__S(1761, __c110, 1)),
          Policies: S.optional(__S(1776, __c111, 0)),
          Tags: S.optional(__S(609, __c38, 1)),
          ConfigurationSetName: S.optional(S.String),
          VerificationStatus: S.optional(S.String),
          VerificationInfo: S.optional(__S(1763, __c110, 3)),
        }),
      ).annotate({ identifier: "GetEmailIdentityResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/identities/{EmailIdentity}/policies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEmailIdentityPoliciesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policies: S.optional(__S(1776, __c111, 0)) })).annotate({
        identifier: "GetEmailIdentityPoliciesResponse",
      });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String.pipe(T.HttpLabel("TemplateName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/templates/{TemplateName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEmailTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String,
          TemplateContent: __S(896, __c56, 0),
          Tags: S.optional(__S(609, __c38, 1)),
        }),
      ).annotate({ identifier: "GetEmailTemplateResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/export-jobs/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProcessedRecordsCount: S.optional(S.Number),
          ExportedRecordsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExportStatistics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          ExportSourceType: S.optional(S.String),
          JobStatus: S.optional(S.String),
          ExportDestination: S.optional(__S(1079, __c67, 7)),
          ExportDataSource: S.optional(__S(1078, __c67, 6)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureInfo: S.optional(__S(1840, __c115, 0)),
          Statistics: S.optional(__S(1825, __c114, 1)),
        }),
      ).annotate({ identifier: "GetExportJobResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FailedRecordsS3Url: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "FailureInfo" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/import-jobs/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          ImportDestination: S.optional(__S(1122, __c70, 2)),
          ImportDataSource: S.optional(__S(1104, __c69, 0)),
          FailureInfo: S.optional(__S(1840, __c115, 0)),
          JobStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ProcessedRecordsCount: S.optional(S.Number),
          FailedRecordsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetImportJobResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MessageId: S.String.pipe(T.HttpLabel("MessageId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/insights/{MessageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMessageInsightsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BounceType: S.optional(S.String),
          BounceSubType: S.optional(S.String),
          DiagnosticCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "Bounce" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ComplaintSubType: S.optional(S.String),
          ComplaintFeedbackType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Complaint" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Bounce: S.optional(__S(1873, __c117, 1)),
          Complaint: S.optional(__S(1874, __c117, 2)),
        }),
      ).annotate({ identifier: "EventDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
          Details: S.optional(__S(1875, __c117, 3)),
        }),
      ).annotate({ identifier: "InsightsEvent" });
    case 5:
      return S.Array(__S(1876, __c117, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(SensitiveString),
          Isp: S.optional(S.String),
          Events: S.optional(__S(1877, __c117, 5)),
        }),
      ).annotate({ identifier: "EmailInsights" });
    case 7:
      return S.Array(__S(1878, __c117, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          MessageId: S.optional(S.String),
          FromEmailAddress: S.optional(SensitiveString),
          Subject: S.optional(SensitiveString),
          EmailTags: S.optional(__S(913, __c57, 1)),
          Insights: S.optional(__S(1879, __c117, 7)),
        }),
      ).annotate({ identifier: "GetMessageInsightsResponse" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointName: S.String.pipe(T.HttpLabel("EndpointName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/multi-region-endpoints/{EndpointName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMultiRegionEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.optional(S.String),
          EndpointId: S.optional(S.String),
          Routes: S.optional(__S(1153, __c72, 1)),
          Status: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetMultiRegionEndpointResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReputationEntityReference: S.String.pipe(T.HttpLabel("ReputationEntityReference")),
          ReputationEntityType: S.String.pipe(T.HttpLabel("ReputationEntityType")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReputationEntityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReputationEntity: S.optional(__S(1921, __c120, 1)) }),
      ).annotate({ identifier: "GetReputationEntityResponse" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          Cause: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StatusRecord" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReputationEntityReference: S.optional(S.String),
          ReputationEntityType: S.optional(S.String),
          ReputationManagementPolicy: S.optional(S.String),
          CustomerManagedStatus: S.optional(__S(1920, __c120, 0)),
          AwsSesManagedStatus: S.optional(__S(1920, __c120, 0)),
          SendingStatusAggregate: S.optional(S.String),
          ReputationImpact: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReputationEntity" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
          TenantName: S.optional(S.String).pipe(T.HttpQuery("TenantName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/suppression/addresses/{EmailAddress}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSuppressedDestinationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MessageId: S.optional(S.String), FeedbackId: S.optional(S.String) }),
      ).annotate({ identifier: "SuppressedDestinationAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.String,
          Reason: S.String,
          LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Attributes: S.optional(__S(1937, __c121, 1)),
          TenantName: S.optional(S.String),
        }),
      ).annotate({ identifier: "SuppressedDestination" });
    case 3:
      return S.suspend(() => S.Struct({ SuppressedDestination: __S(1938, __c121, 2) })).annotate({
        identifier: "GetSuppressedDestinationResponse",
      });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TenantName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/tenants/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTenantRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tenant: S.optional(__S(1185, __c74, 1)) })).annotate({
        identifier: "GetTenantResponse",
      });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(544, __c34, 0)),
          NextToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/list-configuration-sets" }),
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
          ConfigurationSets: S.optional(__S(960, __c60, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationSetsResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/contact-lists" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListContactListsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ContactList" });
    case 2:
      return S.Array(__S(1985, __c124, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ContactLists: S.optional(__S(1986, __c124, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListContactListsResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TopicName: S.optional(S.String),
          UseDefaultIfPreferenceUnavailable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TopicFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FilteredStatus: S.optional(S.String),
          TopicFilter: S.optional(__S(2000, __c125, 0)),
        }),
      ).annotate({ identifier: "ListContactsFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
          Filter: S.optional(__S(2001, __c125, 1)),
          PageSize: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/email/contact-lists/{ContactListName}/contacts/list",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListContactsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.optional(S.String),
          TopicPreferences: S.optional(__S(769, __c48, 1)),
          TopicDefaultPreferences: S.optional(__S(769, __c48, 1)),
          UnsubscribeAll: S.optional(S.Boolean),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Contact" });
    case 4:
      return S.Array(__S(2003, __c125, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Contacts: S.optional(__S(2004, __c125, 4)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListContactsResponse" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/custom-verification-email-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomVerificationEmailTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.optional(S.String),
          FromEmailAddress: S.optional(S.String),
          TemplateSubject: S.optional(S.String),
          SuccessRedirectionURL: S.optional(S.String),
          FailureRedirectionURL: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomVerificationEmailTemplateMetadata" });
    case 2:
      return S.Array(__S(2017, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CustomVerificationEmailTemplates: S.optional(__S(2018, __c126, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCustomVerificationEmailTemplatesResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/dedicated-ip-pools" }),
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
          DedicatedIpPools: S.optional(__S(960, __c60, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDedicatedIpPoolsResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/deliverability-dashboard/test-reports" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeliverabilityTestReportsRequest" });
    case 1:
      return S.Array(__S(1680, __c105, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DeliverabilityTestReports: __S(2049, __c128, 1),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDeliverabilityTestReportsResponse" });
  }
}
function __c129(j: number): any {
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
              uri: "/v2/email/deliverability-dashboard/domains/{SubscribedDomain}/campaigns",
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
      return S.Array(__S(1712, __c107, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainDeliverabilityCampaigns: __S(2065, __c129, 1),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDomainDeliverabilityCampaignsResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(544, __c34, 0)),
          NextToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/list-identities" }),
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
          VerificationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentityInfo" });
    case 2:
      return S.Array(__S(2081, __c130, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EmailIdentities: S.optional(__S(2082, __c130, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEmailIdentitiesResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailIdentity: S.String,
          NextToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/identity/certificates/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEmailIdentityCertificatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FromAddress: S.optional(S.String),
          Status: S.optional(S.String),
          CertificateArn: S.optional(S.String),
          CertificateExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "IdentityCertificate" });
    case 2:
      return S.Array(__S(2097, __c131, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Certificates: S.optional(__S(2098, __c131, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEmailIdentityCertificatesResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEmailTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EmailTemplateMetadata" });
    case 2:
      return S.Array(__S(2113, __c132, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TemplatesMetadata: S.optional(__S(2114, __c132, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEmailTemplatesResponse" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
          ExportSourceType: S.optional(S.String),
          JobStatus: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/list-export-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListExportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          ExportSourceType: S.optional(S.String),
          JobStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ExportJobSummary" });
    case 2:
      return S.Array(__S(2129, __c133, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ExportJobs: S.optional(__S(2130, __c133, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExportJobsResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImportDestinationType: S.optional(S.String),
          NextToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/import-jobs/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          ImportDestination: S.optional(__S(1122, __c70, 2)),
          JobStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ProcessedRecordsCount: S.optional(S.Number),
          FailedRecordsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ImportJobSummary" });
    case 2:
      return S.Array(__S(2145, __c134, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ImportJobs: S.optional(__S(2146, __c134, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImportJobsResponse" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/multi-region-endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMultiRegionEndpointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.optional(S.String),
          Status: S.optional(S.String),
          EndpointId: S.optional(S.String),
          Regions: S.optional(__S(960, __c60, 0)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MultiRegionEndpoint" });
    case 2:
      return S.Array(__S(2161, __c135, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MultiRegionEndpoints: S.optional(__S(2162, __c135, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMultiRegionEndpointsResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(544, __c34, 0)),
          NextToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/vdm/recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Impact: S.optional(S.String),
        }),
      ).annotate({ identifier: "Recommendation" });
    case 2:
      return S.Array(__S(2177, __c136, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Recommendations: S.optional(__S(2178, __c136, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecommendationsResponse" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(544, __c34, 0)),
          NextToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/reputation/entities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListReputationEntitiesRequest" });
    case 1:
      return S.Array(__S(1921, __c120, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReputationEntities: S.optional(__S(2193, __c137, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListReputationEntitiesResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          PageSize: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/resources/tenants/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceTenantsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TenantName: S.optional(S.String),
          TenantId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          AssociatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ResourceTenantMetadata" });
    case 2:
      return S.Array(__S(2209, __c138, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceTenants: S.optional(__S(2210, __c138, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourceTenantsResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TenantName: S.optional(S.String).pipe(T.HttpQuery("TenantName")),
          Reasons: S.optional(__S(592, __c37, 0)).pipe(T.HttpQuery("Reason")),
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("StartDate"),
          ),
          EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("EndDate"),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/email/suppression/addresses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSuppressedDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.String,
          Reason: S.String,
          LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "SuppressedDestinationSummary" });
    case 2:
      return S.Array(__S(2225, __c139, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SuppressedDestinationSummaries: S.optional(__S(2226, __c139, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSuppressedDestinationsResponse" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/email/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: __S(609, __c38, 1) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TenantName: S.String,
          Filter: S.optional(__S(544, __c34, 0)),
          PageSize: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/tenants/resources/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTenantResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), ResourceArn: S.optional(S.String) }),
      ).annotate({ identifier: "TenantResource" });
    case 2:
      return S.Array(__S(2257, __c141, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TenantResources: S.optional(__S(2258, __c141, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTenantResourcesResponse" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(544, __c34, 0)),
          NextToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/tenants/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTenantsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TenantName: S.optional(S.String),
          TenantId: S.optional(S.String),
          TenantArn: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SendingStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "TenantInfo" });
    case 2:
      return S.Array(__S(2273, __c142, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Tenants: S.optional(__S(2274, __c142, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTenantsResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoWarmupEnabled: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/account/dedicated-ips/warmup" }),
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
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MailType: S.String,
          WebsiteURL: SensitiveString,
          ContactLanguage: S.optional(S.String),
          UseCaseDescription: S.optional(SensitiveString),
          AdditionalContactEmailAddresses: S.optional(__S(1056, __c66, 0)),
          ProductionAccessEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/email/account/details" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAccountDetailsRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Plan: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/account/pricing-attributes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAccountPricingAttributesRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SendingEnabled: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/account/sending" }),
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
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SuppressedReasons: S.optional(__S(592, __c37, 0)),
          ValidationAttributes: S.optional(__S(626, __c39, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/account/suppression" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAccountSuppressionAttributesRequest" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VdmAttributes: __S(1456, __c91, 0) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/email/account/vdm" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAccountVdmAttributesRequest" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          ArchiveArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/archiving-options",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConfigurationSetArchivingOptionsRequest" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          TlsPolicy: S.optional(S.String),
          SendingPoolName: S.optional(S.String),
          MaxDeliverySeconds: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/delivery-options",
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
function __c151(j: number): any {
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
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/reputation-options",
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
function __c152(j: number): any {
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
              uri: "/v2/email/configuration-sets/{ConfigurationSetName}/sending",
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
