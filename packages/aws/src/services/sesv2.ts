import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "SESv2",
  target: "SimpleEmailService_v2",
  version: "2019-09-27",
  sigv4: "ses",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const {
      Region,
      UseDualStack = false,
      UseFIPS = false,
      Endpoint,
      EndpointId,
    } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [
        { name: "sigv4a", signingName: "ses", signingRegionSet: ["*"] },
      ],
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
            if (
              _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
              UseDualStack === true
            ) {
              if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
                return e(
                  `https://${EndpointId}.endpoints.email.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
              return err(
                "DualStack is enabled but this partition does not support DualStack",
              );
            }
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(
                `https://${EndpointId}.endpoints.email.us-gov.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
            if (
              !(_.getAttr(PartitionResult, "name") === "aws-us-gov") &&
              UseDualStack === true
            ) {
              if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
                return e(
                  `https://${EndpointId}.endpoints.email.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
              return err(
                "DualStack is enabled but this partition does not support DualStack",
              );
            }
            if (!(_.getAttr(PartitionResult, "name") === "aws-us-gov")) {
              return e(
                `https://${EndpointId}.endpoints.email.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
          }
          return err(
            "Invalid Configuration: FIPS is not supported with multi-region endpoints",
          );
        }
        return err("EndpointId must be a valid host label");
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
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
  | (string & {});
export type MetricDimensionValue = string;
export type Dimensions = { [key in MetricDimensionName]?: string };
export interface BatchGetMetricDataQuery {
  Id: string;
  Namespace: MetricNamespace;
  Metric: Metric;
  Dimensions?: { [key: string]: string | undefined };
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
  Id?: string;
  Timestamps?: Date[];
  Values?: number[];
}
export type MetricDataResultList = MetricDataResult[];
export type QueryErrorCode =
  | "INTERNAL_FAILURE"
  | "ACCESS_DENIED"
  | (string & {});
export type QueryErrorMessage = string;
export interface MetricDataError {
  Id?: string;
  Code?: QueryErrorCode;
  Message?: string;
}
export type MetricDataErrorList = MetricDataError[];
export interface BatchGetMetricDataResponse {
  Results?: MetricDataResult[];
  Errors?: MetricDataError[];
}
export type JobId = string;
export interface CancelExportJobRequest {
  JobId: string;
}
export interface CancelExportJobResponse {}
export type ConfigurationSetName = string;
export type CustomRedirectDomain = string;
export type HttpsPolicy =
  | "REQUIRE"
  | "REQUIRE_OPEN_ONLY"
  | "OPTIONAL"
  | (string & {});
export interface TrackingOptions {
  CustomRedirectDomain: string;
  HttpsPolicy?: HttpsPolicy;
}
export type TlsPolicy = "REQUIRE" | "OPTIONAL" | (string & {});
export type PoolName = string;
export type MaxDeliverySeconds = number;
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy;
  SendingPoolName?: string;
  MaxDeliverySeconds?: number;
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
export type SuppressionListReason = "BOUNCE" | "COMPLAINT" | (string & {});
export type SuppressionListReasons = SuppressionListReason[];
export type SuppressionListScope = "ACCOUNT" | "TENANT" | (string & {});
export type FeatureStatus = "ENABLED" | "DISABLED" | (string & {});
export type SuppressionConfidenceVerdictThreshold =
  | "MEDIUM"
  | "HIGH"
  | "MANAGED"
  | (string & {});
export interface SuppressionConfidenceThreshold {
  ConfidenceVerdictThreshold: SuppressionConfidenceVerdictThreshold;
}
export interface SuppressionConditionThreshold {
  ConditionThresholdEnabled: FeatureStatus;
  OverallConfidenceThreshold?: SuppressionConfidenceThreshold;
}
export interface SuppressionValidationOptions {
  ConditionThreshold: SuppressionConditionThreshold;
}
export interface SuppressionOptions {
  SuppressedReasons?: SuppressionListReason[];
  SuppressionScope?: SuppressionListScope;
  ValidationOptions?: SuppressionValidationOptions;
}
export interface DashboardOptions {
  EngagementMetrics?: FeatureStatus;
}
export interface GuardianOptions {
  OptimizedSharedDelivery?: FeatureStatus;
}
export interface VdmOptions {
  DashboardOptions?: DashboardOptions;
  GuardianOptions?: GuardianOptions;
}
export type ArchiveArn = string;
export interface ArchivingOptions {
  ArchiveArn?: string;
}
export interface CreateConfigurationSetRequest {
  ConfigurationSetName: string;
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
  SendingOptions?: SendingOptions;
  Tags?: Tag[];
  SuppressionOptions?: SuppressionOptions;
  VdmOptions?: VdmOptions;
  ArchivingOptions?: ArchivingOptions;
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
export interface EventBridgeDestination {
  EventBusArn: string;
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
  EventBridgeDestination?: EventBridgeDestination;
  PinpointDestination?: PinpointDestination;
}
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export interface CreateConfigurationSetEventDestinationResponse {}
export type ContactListName = string;
export type EmailAddress = string;
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
  TopicPreferences?: TopicPreference[];
  UnsubscribeAll?: boolean;
  AttributesData?: string;
}
export interface CreateContactResponse {}
export type DisplayName = string;
export type Description = string;
export interface Topic {
  TopicName: string;
  DisplayName: string;
  Description?: string;
  DefaultSubscriptionStatus: SubscriptionStatus;
}
export type Topics = Topic[];
export interface CreateContactListRequest {
  ContactListName: string;
  Topics?: Topic[];
  Description?: string;
  Tags?: Tag[];
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
  Tags?: Tag[];
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}
export interface CreateCustomVerificationEmailTemplateResponse {}
export type ScalingMode = "STANDARD" | "MANAGED" | (string & {});
export interface CreateDedicatedIpPoolRequest {
  PoolName: string;
  Tags?: Tag[];
  ScalingMode?: ScalingMode;
}
export interface CreateDedicatedIpPoolResponse {}
export type ReportName = string;
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
export type MessageHeaderName = string;
export type MessageHeaderValue = string;
export interface MessageHeader {
  Name: string;
  Value: string;
}
export type MessageHeaderList = MessageHeader[];
export type RawAttachmentData = Uint8Array;
export type AttachmentContentDisposition =
  | "ATTACHMENT"
  | "INLINE"
  | (string & {});
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
  ContentDisposition?: AttachmentContentDisposition;
  FileName: string;
  ContentDescription?: string;
  ContentId?: string;
  ContentTransferEncoding?: AttachmentContentTransferEncoding;
  ContentType?: string;
}
export type AttachmentList = Attachment[];
export interface Message {
  Subject: Content;
  Body: Body;
  Headers?: MessageHeader[];
  Attachments?: Attachment[];
}
export type RawMessageData = Uint8Array;
export interface RawMessage {
  Data: Uint8Array;
}
export type EmailTemplateText = string;
export type EmailTemplateHtml = string;
export interface EmailTemplateContent {
  Subject?: string;
  Text?: string;
  Html?: string;
}
export type EmailTemplateData = string;
export interface Template {
  TemplateName?: string;
  TemplateArn?: string;
  TemplateContent?: EmailTemplateContent;
  TemplateData?: string;
  Headers?: MessageHeader[];
  Attachments?: Attachment[];
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
export type Selector = string;
export type PrivateKey = string | redacted.Redacted<string>;
export type DkimSigningKeyLength =
  | "RSA_1024_BIT"
  | "RSA_2048_BIT"
  | (string & {});
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
  DomainSigningSelector?: string;
  DomainSigningPrivateKey?: string | redacted.Redacted<string>;
  NextSigningKeyLength?: DkimSigningKeyLength;
  DomainSigningAttributesOrigin?: DkimSigningAttributesOrigin;
}
export interface CreateEmailIdentityRequest {
  EmailIdentity: string;
  Tags?: Tag[];
  DkimSigningAttributes?: DkimSigningAttributes;
  ConfigurationSetName?: string;
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
export type HostedZone = string;
export interface DkimAttributes {
  SigningEnabled?: boolean;
  Status?: DkimStatus;
  Tokens?: string[];
  SigningHostedZone?: string;
  SigningAttributesOrigin?: DkimSigningAttributesOrigin;
  NextSigningKeyLength?: DkimSigningKeyLength;
  CurrentSigningKeyLength?: DkimSigningKeyLength;
  LastKeyGenerationTimestamp?: Date;
}
export interface CreateEmailIdentityResponse {
  IdentityType?: IdentityType;
  VerifiedForSendingStatus?: boolean;
  DkimAttributes?: DkimAttributes;
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
  Tags?: Tag[];
}
export interface CreateEmailTemplateResponse {}
export type ExportDimensionValue = string[];
export type ExportDimensions = { [key in MetricDimensionName]?: string[] };
export type MetricAggregation = "RATE" | "VOLUME" | (string & {});
export interface ExportMetric {
  Name?: Metric;
  Aggregation?: MetricAggregation;
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
  FromEmailAddress?: (string | redacted.Redacted<string>)[];
  Destination?: (string | redacted.Redacted<string>)[];
  Subject?: (string | redacted.Redacted<string>)[];
  Isp?: string[];
  LastDeliveryEvent?: DeliveryEventType[];
  LastEngagementEvent?: EngagementEventType[];
}
export type MessageInsightsExportMaxResults = number;
export interface MessageInsightsDataSource {
  StartDate: Date;
  EndDate: Date;
  Include?: MessageInsightsFilters;
  Exclude?: MessageInsightsFilters;
  MaxResults?: number;
}
export interface ExportDataSource {
  MetricsDataSource?: MetricsDataSource;
  MessageInsightsDataSource?: MessageInsightsDataSource;
}
export type DataFormat = "CSV" | "JSON" | (string & {});
export type S3Url = string;
export interface ExportDestination {
  DataFormat: DataFormat;
  S3Url?: string;
}
export interface CreateExportJobRequest {
  ExportDataSource: ExportDataSource;
  ExportDestination: ExportDestination;
}
export interface CreateExportJobResponse {
  JobId?: string;
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
  SuppressionListDestination?: SuppressionListDestination;
  ContactListDestination?: ContactListDestination;
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
  JobId?: string;
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
  Tags?: Tag[];
}
export type Status =
  | "CREATING"
  | "READY"
  | "FAILED"
  | "DELETING"
  | (string & {});
export type EndpointId = string;
export interface CreateMultiRegionEndpointResponse {
  Status?: Status;
  EndpointId?: string;
}
export type TenantName = string;
export interface TenantSuppressionAttributes {
  SuppressedReasons?: SuppressionListReason[];
  SuppressionScope?: SuppressionListScope;
}
export interface CreateTenantRequest {
  TenantName: string;
  Tags?: Tag[];
  SuppressionAttributes?: TenantSuppressionAttributes;
}
export type TenantId = string;
export type SendingStatus =
  | "ENABLED"
  | "REINSTATED"
  | "DISABLED"
  | (string & {});
export interface CreateTenantResponse {
  TenantName?: string;
  TenantId?: string;
  TenantArn?: string;
  CreatedTimestamp?: Date;
  Tags?: Tag[];
  SendingStatus?: SendingStatus;
  SuppressionAttributes?: TenantSuppressionAttributes;
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
  Status?: Status;
}
export interface DeleteSuppressedDestinationRequest {
  EmailAddress: string;
  TenantName?: string;
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
export interface GetAccountRequest {}
export type GeneralEnforcementStatus = string;
export type Max24HourSend = number;
export type MaxSendRate = number;
export type SentLast24Hours = number;
export interface SendQuota {
  Max24HourSend?: number;
  MaxSendRate?: number;
  SentLast24Hours?: number;
}
export interface SuppressionValidationAttributes {
  ConditionThreshold: SuppressionConditionThreshold;
}
export interface SuppressionAttributes {
  SuppressedReasons?: SuppressionListReason[];
  ValidationAttributes?: SuppressionValidationAttributes;
}
export type MailType = "MARKETING" | "TRANSACTIONAL" | (string & {});
export type WebsiteURL = string | redacted.Redacted<string>;
export type ContactLanguage = "EN" | "JA" | (string & {});
export type UseCaseDescription = string | redacted.Redacted<string>;
export type AdditionalContactEmailAddress = string | redacted.Redacted<string>;
export type AdditionalContactEmailAddresses = (
  | string
  | redacted.Redacted<string>
)[];
export type ReviewStatus =
  | "PENDING"
  | "FAILED"
  | "GRANTED"
  | "DENIED"
  | (string & {});
export type CaseId = string;
export interface ReviewDetails {
  Status?: ReviewStatus;
  CaseId?: string;
}
export interface AccountDetails {
  MailType?: MailType;
  WebsiteURL?: string | redacted.Redacted<string>;
  ContactLanguage?: ContactLanguage;
  UseCaseDescription?: string | redacted.Redacted<string>;
  AdditionalContactEmailAddresses?: (string | redacted.Redacted<string>)[];
  ReviewDetails?: ReviewDetails;
}
export interface DashboardAttributes {
  EngagementMetrics?: FeatureStatus;
}
export interface GuardianAttributes {
  OptimizedSharedDelivery?: FeatureStatus;
}
export interface VdmAttributes {
  VdmEnabled: FeatureStatus;
  DashboardAttributes?: DashboardAttributes;
  GuardianAttributes?: GuardianAttributes;
}
export type PricingPlan =
  | "NONE"
  | "ESSENTIALS"
  | "PRO"
  | "ENTERPRISE"
  | (string & {});
export interface PricingAttributes {
  CurrentPlan?: PricingPlan;
  NextPlan?: PricingPlan;
}
export interface GetAccountResponse {
  DedicatedIpAutoWarmupEnabled?: boolean;
  EnforcementStatus?: string;
  ProductionAccessEnabled?: boolean;
  SendQuota?: SendQuota;
  SendingEnabled?: boolean;
  SuppressionAttributes?: SuppressionAttributes;
  Details?: AccountDetails;
  VdmAttributes?: VdmAttributes;
  PricingAttributes?: PricingAttributes;
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
  SuppressionOptions?: SuppressionOptions;
  VdmOptions?: VdmOptions;
  ArchivingOptions?: ArchivingOptions;
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
  EventBridgeDestination?: EventBridgeDestination;
  PinpointDestination?: PinpointDestination;
}
export type EventDestinations = EventDestination[];
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[];
}
export interface GetContactRequest {
  ContactListName: string;
  EmailAddress: string;
}
export interface GetContactResponse {
  ContactListName?: string;
  EmailAddress?: string;
  TopicPreferences?: TopicPreference[];
  TopicDefaultPreferences?: TopicPreference[];
  UnsubscribeAll?: boolean;
  AttributesData?: string;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export interface GetContactListRequest {
  ContactListName: string;
}
export interface GetContactListResponse {
  ContactListName?: string;
  Topics?: Topic[];
  Description?: string;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Tags?: Tag[];
}
export interface GetCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export interface GetCustomVerificationEmailTemplateResponse {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  TemplateContent?: string;
  Tags?: Tag[];
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export type Ip = string;
export interface GetDedicatedIpRequest {
  Ip: string;
}
export type WarmupStatus =
  | "IN_PROGRESS"
  | "DONE"
  | "NOT_APPLICABLE"
  | (string & {});
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
export interface GetDedicatedIpPoolRequest {
  PoolName: string;
}
export interface DedicatedIpPool {
  PoolName: string;
  ScalingMode: ScalingMode;
}
export interface GetDedicatedIpPoolResponse {
  DedicatedIpPool?: DedicatedIpPool;
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
export interface GetEmailAddressInsightsRequest {
  EmailAddress: string;
}
export type EmailAddressInsightsConfidenceVerdict =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export interface EmailAddressInsightsVerdict {
  ConfidenceVerdict?: EmailAddressInsightsConfidenceVerdict;
}
export interface EmailAddressInsightsMailboxEvaluations {
  HasValidSyntax?: EmailAddressInsightsVerdict;
  HasValidDnsRecords?: EmailAddressInsightsVerdict;
  MailboxExists?: EmailAddressInsightsVerdict;
  IsRoleAddress?: EmailAddressInsightsVerdict;
  IsDisposable?: EmailAddressInsightsVerdict;
  IsRandomInput?: EmailAddressInsightsVerdict;
}
export interface MailboxValidation {
  IsValid?: EmailAddressInsightsVerdict;
  Evaluations?: EmailAddressInsightsMailboxEvaluations;
}
export interface GetEmailAddressInsightsResponse {
  MailboxValidation?: MailboxValidation;
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
  MailFromDomain?: string;
  MailFromDomainStatus?: MailFromDomainStatus;
  BehaviorOnMxFailure?: BehaviorOnMxFailure;
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
  PrimaryNameServer?: string;
  AdminEmail?: string;
  SerialNumber?: number;
}
export interface VerificationInfo {
  LastCheckedTimestamp?: Date;
  LastSuccessTimestamp?: Date;
  ErrorType?: VerificationError;
  SOARecord?: SOARecord;
}
export interface GetEmailIdentityResponse {
  IdentityType?: IdentityType;
  FeedbackForwardingStatus?: boolean;
  VerifiedForSendingStatus?: boolean;
  DkimAttributes?: DkimAttributes;
  MailFromAttributes?: MailFromAttributes;
  Policies?: { [key: string]: string | undefined };
  Tags?: Tag[];
  ConfigurationSetName?: string;
  VerificationStatus?: VerificationStatus;
  VerificationInfo?: VerificationInfo;
}
export interface GetEmailIdentityPoliciesRequest {
  EmailIdentity: string;
}
export interface GetEmailIdentityPoliciesResponse {
  Policies?: { [key: string]: string | undefined };
}
export interface GetEmailTemplateRequest {
  TemplateName: string;
}
export interface GetEmailTemplateResponse {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
  Tags?: Tag[];
}
export interface GetExportJobRequest {
  JobId: string;
}
export type ExportSourceType =
  | "METRICS_DATA"
  | "MESSAGE_INSIGHTS"
  | (string & {});
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
  FailedRecordsS3Url?: string;
  ErrorMessage?: string;
}
export type ProcessedRecordsCount = number;
export type ExportedRecordsCount = number;
export interface ExportStatistics {
  ProcessedRecordsCount?: number;
  ExportedRecordsCount?: number;
}
export interface GetExportJobResponse {
  JobId?: string;
  ExportSourceType?: ExportSourceType;
  JobStatus?: JobStatus;
  ExportDestination?: ExportDestination;
  ExportDataSource?: ExportDataSource;
  CreatedTimestamp?: Date;
  CompletedTimestamp?: Date;
  FailureInfo?: FailureInfo;
  Statistics?: ExportStatistics;
}
export interface GetImportJobRequest {
  JobId: string;
}
export type FailedRecordsCount = number;
export interface GetImportJobResponse {
  JobId?: string;
  ImportDestination?: ImportDestination;
  ImportDataSource?: ImportDataSource;
  FailureInfo?: FailureInfo;
  JobStatus?: JobStatus;
  CreatedTimestamp?: Date;
  CompletedTimestamp?: Date;
  ProcessedRecordsCount?: number;
  FailedRecordsCount?: number;
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
export type BounceType =
  | "UNDETERMINED"
  | "TRANSIENT"
  | "PERMANENT"
  | (string & {});
export type BounceSubType = string;
export type DiagnosticCode = string;
export interface Bounce {
  BounceType?: BounceType;
  BounceSubType?: string;
  DiagnosticCode?: string;
}
export type ComplaintSubType = string;
export type ComplaintFeedbackType = string;
export interface Complaint {
  ComplaintSubType?: string;
  ComplaintFeedbackType?: string;
}
export interface EventDetails {
  Bounce?: Bounce;
  Complaint?: Complaint;
}
export interface InsightsEvent {
  Timestamp?: Date;
  Type?: EventType;
  Details?: EventDetails;
}
export type InsightsEvents = InsightsEvent[];
export interface EmailInsights {
  Destination?: string | redacted.Redacted<string>;
  Isp?: string;
  Events?: InsightsEvent[];
}
export type EmailInsightsList = EmailInsights[];
export interface GetMessageInsightsResponse {
  MessageId?: string;
  FromEmailAddress?: string | redacted.Redacted<string>;
  Subject?: string | redacted.Redacted<string>;
  EmailTags?: MessageTag[];
  Insights?: EmailInsights[];
}
export interface GetMultiRegionEndpointRequest {
  EndpointName: string;
}
export interface Route {
  Region: string;
}
export type Routes = Route[];
export interface GetMultiRegionEndpointResponse {
  EndpointName?: string;
  EndpointId?: string;
  Routes?: Route[];
  Status?: Status;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export type ReputationEntityReference = string;
export type ReputationEntityType = "RESOURCE" | (string & {});
export interface GetReputationEntityRequest {
  ReputationEntityReference: string;
  ReputationEntityType: ReputationEntityType;
}
export type StatusCause = string;
export interface StatusRecord {
  Status?: SendingStatus;
  Cause?: string;
  LastUpdatedTimestamp?: Date;
}
export type RecommendationImpact = "LOW" | "HIGH" | (string & {});
export interface ReputationEntity {
  ReputationEntityReference?: string;
  ReputationEntityType?: ReputationEntityType;
  ReputationManagementPolicy?: string;
  CustomerManagedStatus?: StatusRecord;
  AwsSesManagedStatus?: StatusRecord;
  SendingStatusAggregate?: SendingStatus;
  ReputationImpact?: RecommendationImpact;
}
export interface GetReputationEntityResponse {
  ReputationEntity?: ReputationEntity;
}
export interface GetSuppressedDestinationRequest {
  EmailAddress: string;
  TenantName?: string;
}
export type FeedbackId = string;
export interface SuppressedDestinationAttributes {
  MessageId?: string;
  FeedbackId?: string;
}
export interface SuppressedDestination {
  EmailAddress: string;
  Reason: SuppressionListReason;
  LastUpdateTime: Date;
  Attributes?: SuppressedDestinationAttributes;
  TenantName?: string;
}
export interface GetSuppressedDestinationResponse {
  SuppressedDestination: SuppressedDestination;
}
export interface GetTenantRequest {
  TenantName: string;
}
export interface Tenant {
  TenantName?: string;
  TenantId?: string;
  TenantArn?: string;
  CreatedTimestamp?: Date;
  Tags?: Tag[];
  SendingStatus?: SendingStatus;
  SuppressionAttributes?: TenantSuppressionAttributes;
}
export interface GetTenantResponse {
  Tenant?: Tenant;
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
export interface ListContactListsRequest {
  PageSize?: number;
  NextToken?: string;
}
export interface ContactList {
  ContactListName?: string;
  LastUpdatedTimestamp?: Date;
}
export type ListOfContactLists = ContactList[];
export interface ListContactListsResponse {
  ContactLists?: ContactList[];
  NextToken?: string;
}
export type UseDefaultIfPreferenceUnavailable = boolean;
export interface TopicFilter {
  TopicName?: string;
  UseDefaultIfPreferenceUnavailable?: boolean;
}
export interface ListContactsFilter {
  FilteredStatus?: SubscriptionStatus;
  TopicFilter?: TopicFilter;
}
export interface ListContactsRequest {
  ContactListName: string;
  Filter?: ListContactsFilter;
  PageSize?: number;
  NextToken?: string;
}
export interface Contact {
  EmailAddress?: string;
  TopicPreferences?: TopicPreference[];
  TopicDefaultPreferences?: TopicPreference[];
  UnsubscribeAll?: boolean;
  LastUpdatedTimestamp?: Date;
}
export type ListOfContacts = Contact[];
export interface ListContactsResponse {
  Contacts?: Contact[];
  NextToken?: string;
}
export interface ListCustomVerificationEmailTemplatesRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface CustomVerificationEmailTemplateMetadata {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export type CustomVerificationEmailTemplatesList =
  CustomVerificationEmailTemplateMetadata[];
export interface ListCustomVerificationEmailTemplatesResponse {
  CustomVerificationEmailTemplates?: CustomVerificationEmailTemplateMetadata[];
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
  VerificationStatus?: VerificationStatus;
}
export type IdentityInfoList = IdentityInfo[];
export interface ListEmailIdentitiesResponse {
  EmailIdentities?: IdentityInfo[];
  NextToken?: string;
}
export interface ListEmailTemplatesRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface EmailTemplateMetadata {
  TemplateName?: string;
  CreatedTimestamp?: Date;
}
export type EmailTemplateMetadataList = EmailTemplateMetadata[];
export interface ListEmailTemplatesResponse {
  TemplatesMetadata?: EmailTemplateMetadata[];
  NextToken?: string;
}
export interface ListExportJobsRequest {
  NextToken?: string;
  PageSize?: number;
  ExportSourceType?: ExportSourceType;
  JobStatus?: JobStatus;
}
export interface ExportJobSummary {
  JobId?: string;
  ExportSourceType?: ExportSourceType;
  JobStatus?: JobStatus;
  CreatedTimestamp?: Date;
  CompletedTimestamp?: Date;
}
export type ExportJobSummaryList = ExportJobSummary[];
export interface ListExportJobsResponse {
  ExportJobs?: ExportJobSummary[];
  NextToken?: string;
}
export type ImportDestinationType =
  | "SUPPRESSION_LIST"
  | "CONTACT_LIST"
  | (string & {});
export interface ListImportJobsRequest {
  ImportDestinationType?: ImportDestinationType;
  NextToken?: string;
  PageSize?: number;
}
export interface ImportJobSummary {
  JobId?: string;
  ImportDestination?: ImportDestination;
  JobStatus?: JobStatus;
  CreatedTimestamp?: Date;
  ProcessedRecordsCount?: number;
  FailedRecordsCount?: number;
}
export type ImportJobSummaryList = ImportJobSummary[];
export interface ListImportJobsResponse {
  ImportJobs?: ImportJobSummary[];
  NextToken?: string;
}
export type NextTokenV2 = string;
export type PageSizeV2 = number;
export interface ListMultiRegionEndpointsRequest {
  NextToken?: string;
  PageSize?: number;
}
export type Regions = string[];
export interface MultiRegionEndpoint {
  EndpointName?: string;
  Status?: Status;
  EndpointId?: string;
  Regions?: string[];
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export type MultiRegionEndpoints = MultiRegionEndpoint[];
export interface ListMultiRegionEndpointsResponse {
  MultiRegionEndpoints?: MultiRegionEndpoint[];
  NextToken?: string;
}
export type ListRecommendationsFilterKey =
  | "TYPE"
  | "IMPACT"
  | "STATUS"
  | "RESOURCE_ARN"
  | (string & {});
export type ListRecommendationFilterValue = string;
export type ListRecommendationsFilter = {
  [key in ListRecommendationsFilterKey]?: string;
};
export interface ListRecommendationsRequest {
  Filter?: { [key: string]: string | undefined };
  NextToken?: string;
  PageSize?: number;
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
  ResourceArn?: string;
  Type?: RecommendationType;
  Description?: string;
  Status?: RecommendationStatus;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Impact?: RecommendationImpact;
}
export type RecommendationsList = Recommendation[];
export interface ListRecommendationsResponse {
  Recommendations?: Recommendation[];
  NextToken?: string;
}
export type ReputationEntityFilterKey =
  | "ENTITY_TYPE"
  | "REPUTATION_IMPACT"
  | "SENDING_STATUS"
  | "ENTITY_REFERENCE_PREFIX"
  | (string & {});
export type ReputationEntityFilterValue = string;
export type ReputationEntityFilter = {
  [key in ReputationEntityFilterKey]?: string;
};
export interface ListReputationEntitiesRequest {
  Filter?: { [key: string]: string | undefined };
  NextToken?: string;
  PageSize?: number;
}
export type ReputationEntitiesList = ReputationEntity[];
export interface ListReputationEntitiesResponse {
  ReputationEntities?: ReputationEntity[];
  NextToken?: string;
}
export interface ListResourceTenantsRequest {
  ResourceArn: string;
  PageSize?: number;
  NextToken?: string;
}
export interface ResourceTenantMetadata {
  TenantName?: string;
  TenantId?: string;
  ResourceArn?: string;
  AssociatedTimestamp?: Date;
}
export type ResourceTenantMetadataList = ResourceTenantMetadata[];
export interface ListResourceTenantsResponse {
  ResourceTenants?: ResourceTenantMetadata[];
  NextToken?: string;
}
export interface ListSuppressedDestinationsRequest {
  TenantName?: string;
  Reasons?: SuppressionListReason[];
  StartDate?: Date;
  EndDate?: Date;
  NextToken?: string;
  PageSize?: number;
}
export interface SuppressedDestinationSummary {
  EmailAddress: string;
  Reason: SuppressionListReason;
  LastUpdateTime: Date;
}
export type SuppressedDestinationSummaries = SuppressedDestinationSummary[];
export interface ListSuppressedDestinationsResponse {
  SuppressedDestinationSummaries?: SuppressedDestinationSummary[];
  NextToken?: string;
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
  [key in ListTenantResourcesFilterKey]?: string;
};
export interface ListTenantResourcesRequest {
  TenantName: string;
  Filter?: { [key: string]: string | undefined };
  PageSize?: number;
  NextToken?: string;
}
export type ResourceType =
  | "EMAIL_IDENTITY"
  | "CONFIGURATION_SET"
  | "EMAIL_TEMPLATE"
  | (string & {});
export interface TenantResource {
  ResourceType?: ResourceType;
  ResourceArn?: string;
}
export type TenantResourceList = TenantResource[];
export interface ListTenantResourcesResponse {
  TenantResources?: TenantResource[];
  NextToken?: string;
}
export interface ListTenantsRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface TenantInfo {
  TenantName?: string;
  TenantId?: string;
  TenantArn?: string;
  CreatedTimestamp?: Date;
}
export type TenantInfoList = TenantInfo[];
export interface ListTenantsResponse {
  Tenants?: TenantInfo[];
  NextToken?: string;
}
export interface PutAccountDedicatedIpWarmupAttributesRequest {
  AutoWarmupEnabled?: boolean;
}
export interface PutAccountDedicatedIpWarmupAttributesResponse {}
export type EnabledWrapper = boolean;
export interface PutAccountDetailsRequest {
  MailType: MailType;
  WebsiteURL: string | redacted.Redacted<string>;
  ContactLanguage?: ContactLanguage;
  UseCaseDescription?: string | redacted.Redacted<string>;
  AdditionalContactEmailAddresses?: (string | redacted.Redacted<string>)[];
  ProductionAccessEnabled?: boolean;
}
export interface PutAccountDetailsResponse {}
export interface PutAccountPricingAttributesRequest {
  Plan: PricingPlan;
}
export interface PutAccountPricingAttributesResponse {}
export interface PutAccountSendingAttributesRequest {
  SendingEnabled?: boolean;
}
export interface PutAccountSendingAttributesResponse {}
export interface PutAccountSuppressionAttributesRequest {
  SuppressedReasons?: SuppressionListReason[];
  ValidationAttributes?: SuppressionValidationAttributes;
}
export interface PutAccountSuppressionAttributesResponse {}
export interface PutAccountVdmAttributesRequest {
  VdmAttributes: VdmAttributes;
}
export interface PutAccountVdmAttributesResponse {}
export interface PutConfigurationSetArchivingOptionsRequest {
  ConfigurationSetName: string;
  ArchiveArn?: string;
}
export interface PutConfigurationSetArchivingOptionsResponse {}
export type SendingPoolName = string;
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  TlsPolicy?: TlsPolicy;
  SendingPoolName?: string;
  MaxDeliverySeconds?: number;
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
export interface PutConfigurationSetSuppressionOptionsRequest {
  ConfigurationSetName: string;
  SuppressionScope?: SuppressionListScope;
  SuppressedReasons?: SuppressionListReason[];
  ValidationOptions?: SuppressionValidationOptions;
}
export interface PutConfigurationSetSuppressionOptionsResponse {}
export interface PutConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  CustomRedirectDomain?: string;
  HttpsPolicy?: HttpsPolicy;
}
export interface PutConfigurationSetTrackingOptionsResponse {}
export interface PutConfigurationSetVdmOptionsRequest {
  ConfigurationSetName: string;
  VdmOptions?: VdmOptions;
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
  SubscribedDomains?: DomainDeliverabilityTrackingOption[];
}
export interface PutDeliverabilityDashboardOptionResponse {}
export interface PutEmailIdentityConfigurationSetAttributesRequest {
  EmailIdentity: string;
  ConfigurationSetName?: string;
}
export interface PutEmailIdentityConfigurationSetAttributesResponse {}
export interface PutEmailIdentityDkimAttributesRequest {
  EmailIdentity: string;
  SigningEnabled?: boolean;
}
export interface PutEmailIdentityDkimAttributesResponse {}
export interface PutEmailIdentityDkimSigningAttributesRequest {
  EmailIdentity: string;
  SigningAttributesOrigin: DkimSigningAttributesOrigin;
  SigningAttributes?: DkimSigningAttributes;
}
export interface PutEmailIdentityDkimSigningAttributesResponse {
  DkimStatus?: DkimStatus;
  DkimTokens?: string[];
  SigningHostedZone?: string;
}
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
export interface PutSuppressedDestinationRequest {
  EmailAddress: string;
  Reason: SuppressionListReason;
  TenantName?: string;
}
export interface PutSuppressedDestinationResponse {}
export interface PutTenantSuppressionAttributesRequest {
  TenantName: string;
  SuppressedReasons?: SuppressionListReason[];
  SuppressionScope?: SuppressionListScope;
}
export interface PutTenantSuppressionAttributesResponse {}
export type EmailAddressList = string[];
export interface BulkEmailContent {
  Template?: Template;
}
export interface Destination {
  ToAddresses?: string[];
  CcAddresses?: string[];
  BccAddresses?: string[];
}
export interface ReplacementTemplate {
  ReplacementTemplateData?: string;
}
export interface ReplacementEmailContent {
  ReplacementTemplate?: ReplacementTemplate;
}
export interface BulkEmailEntry {
  Destination: Destination;
  ReplacementTags?: MessageTag[];
  ReplacementEmailContent?: ReplacementEmailContent;
  ReplacementHeaders?: MessageHeader[];
}
export type BulkEmailEntryList = BulkEmailEntry[];
export interface TrackingConfigurationOverrides {
  OpenTrackingEnabled?: FeatureStatus;
  ClickTrackingEnabled?: FeatureStatus;
}
export interface ConfigurationOverrides {
  Tracking?: TrackingConfigurationOverrides;
}
export interface SendBulkEmailRequest {
  FromEmailAddress?: string;
  FromEmailAddressIdentityArn?: string;
  ReplyToAddresses?: string[];
  FeedbackForwardingEmailAddress?: string;
  FeedbackForwardingEmailAddressIdentityArn?: string;
  DefaultEmailTags?: MessageTag[];
  DefaultContent: BulkEmailContent;
  BulkEmailEntries: BulkEmailEntry[];
  ConfigurationSetName?: string;
  EndpointId?: string;
  TenantName?: string;
  ConfigurationOverrides?: ConfigurationOverrides;
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
  Status?: BulkEmailStatus;
  Error?: string;
  MessageId?: string;
}
export type BulkEmailEntryResultList = BulkEmailEntryResult[];
export interface SendBulkEmailResponse {
  BulkEmailEntryResults: BulkEmailEntryResult[];
}
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string;
  TemplateName: string;
  ConfigurationSetName?: string;
}
export interface SendCustomVerificationEmailResponse {
  MessageId?: string;
}
export interface ListManagementOptions {
  ContactListName: string;
  TopicName?: string;
}
export interface SendEmailRequest {
  FromEmailAddress?: string;
  FromEmailAddressIdentityArn?: string;
  Destination?: Destination;
  ReplyToAddresses?: string[];
  FeedbackForwardingEmailAddress?: string;
  FeedbackForwardingEmailAddressIdentityArn?: string;
  Content: EmailContent;
  EmailTags?: MessageTag[];
  ConfigurationSetName?: string;
  EndpointId?: string;
  TenantName?: string;
  ListManagementOptions?: ListManagementOptions;
  ConfigurationOverrides?: ConfigurationOverrides;
}
export interface SendEmailResponse {
  MessageId?: string;
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
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export interface UpdateConfigurationSetEventDestinationResponse {}
export interface UpdateContactRequest {
  ContactListName: string;
  EmailAddress: string;
  TopicPreferences?: TopicPreference[];
  UnsubscribeAll?: boolean;
  AttributesData?: string;
}
export interface UpdateContactResponse {}
export interface UpdateContactListRequest {
  ContactListName: string;
  Topics?: Topic[];
  Description?: string;
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
  BatchGetMetricDataRequest,
  BatchGetMetricDataResponse,
  BatchGetMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/metrics/batch",
    input: {
      Queries: D.list({
        Id: 0,
        Namespace: 0,
        Metric: 0,
        Dimensions: 0,
        StartDate: 0,
        EndDate: 0,
      }),
    },
    output: { Results: D.list({ Timestamps: D.list(D.ts) }) },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMetricData",
})) as any;

export type CancelExportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels an export job.
 */
export const cancelExportJob: API.OperationMethod<
  CancelExportJobRequest,
  CancelExportJobResponse,
  CancelExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/export-jobs/{JobId}/cancel",
    input: { JobId: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportJob",
})) as any;

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
  CreateConfigurationSetRequest,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/configuration-sets",
    input: {
      ConfigurationSetName: 0,
      TrackingOptions: { CustomRedirectDomain: 0, HttpsPolicy: 0 },
      DeliveryOptions: {
        TlsPolicy: 0,
        SendingPoolName: 0,
        MaxDeliverySeconds: 0,
      },
      ReputationOptions: { ReputationMetricsEnabled: 0, LastFreshStart: 0 },
      SendingOptions: { SendingEnabled: 0 },
      Tags: D.list(i_Tag),
      SuppressionOptions: {
        SuppressedReasons: 0,
        SuppressionScope: 0,
        ValidationOptions: i_SuppressionValidationOptions,
      },
      VdmOptions: i_VdmOptions,
      ArchivingOptions: { ArchiveArn: 0 },
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
 * Create an event destination. *Events* include message sends,
 * deliveries, opens, clicks, bounces, and complaints. Event
 * destinations are places that you can send information about these events
 * to. For example, you can send event data to Amazon EventBridge and associate a rule to send the event
 * to the specified target.
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
    http: "POST /v2/email/configuration-sets/{ConfigurationSetName}/event-destinations",
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
  CreateContactRequest,
  CreateContactResponse,
  CreateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/contact-lists/{ContactListName}/contacts",
    input: {
      ContactListName: 0,
      EmailAddress: 0,
      TopicPreferences: D.list(i_TopicPreference),
      UnsubscribeAll: 0,
      AttributesData: 0,
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContact",
})) as any;

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
  CreateContactListRequest,
  CreateContactListResponse,
  CreateContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/contact-lists",
    input: {
      ContactListName: 0,
      Topics: D.list(i_Topic),
      Description: 0,
      Tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactList",
})) as any;

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
  CreateCustomVerificationEmailTemplateRequest,
  CreateCustomVerificationEmailTemplateResponse,
  CreateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/custom-verification-email-templates",
    input: {
      TemplateName: 0,
      FromEmailAddress: 0,
      TemplateSubject: 0,
      TemplateContent: 0,
      Tags: D.list(i_Tag),
      SuccessRedirectionURL: 0,
      FailureRedirectionURL: 0,
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
  operationName: "CreateCustomVerificationEmailTemplate",
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
 * IP addresses that are associated with your Amazon Web Services account. You can associate a pool with
 * a configuration set. When you send an email that uses that configuration set, the
 * message is sent from one of the addresses in the associated pool.
 */
export const createDedicatedIpPool: API.OperationMethod<
  CreateDedicatedIpPoolRequest,
  CreateDedicatedIpPoolResponse,
  CreateDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/dedicated-ip-pools",
    input: { PoolName: 0, Tags: D.list(i_Tag), ScalingMode: 0 },
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
 * sample message that contains the content that you plan to send to your customers. Amazon SES
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
    http: "POST /v2/email/deliverability-dashboard/test",
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
  CreateEmailIdentityRequest,
  CreateEmailIdentityResponse,
  CreateEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/identities",
    input: {
      EmailIdentity: 0,
      Tags: D.list(i_Tag),
      DkimSigningAttributes: i_DkimSigningAttributes,
      ConfigurationSetName: 0,
    },
    output: { DkimAttributes: o_DkimAttributes },
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
  operationName: "CreateEmailIdentity",
})) as any;

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
  CreateEmailIdentityPolicyRequest,
  CreateEmailIdentityPolicyResponse,
  CreateEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
    input: { EmailIdentity: 0, PolicyName: 0, Policy: 0 },
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
  operationName: "CreateEmailIdentityPolicy",
})) as any;

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
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  CreateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/templates",
    input: {
      TemplateName: 0,
      TemplateContent: i_EmailTemplateContent,
      Tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailTemplate",
})) as any;

export type CreateExportJobError =
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an export job for a data source and destination.
 *
 * You can execute this operation no more than once per second.
 */
export const createExportJob: API.OperationMethod<
  CreateExportJobRequest,
  CreateExportJobResponse,
  CreateExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/export-jobs",
    input: {
      ExportDataSource: {
        MetricsDataSource: {
          Dimensions: 0,
          Namespace: 0,
          Metrics: D.list({ Name: 0, Aggregation: 0 }),
          StartDate: 0,
          EndDate: 0,
        },
        MessageInsightsDataSource: {
          StartDate: 0,
          EndDate: 0,
          Include: i_MessageInsightsFilters,
          Exclude: i_MessageInsightsFilters,
          MaxResults: 0,
        },
      },
      ExportDestination: { DataFormat: 0, S3Url: 0 },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExportJob",
})) as any;

export type CreateImportJobError =
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an import job for a data destination.
 */
export const createImportJob: API.OperationMethod<
  CreateImportJobRequest,
  CreateImportJobResponse,
  CreateImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/import-jobs",
    input: {
      ImportDestination: {
        SuppressionListDestination: { SuppressionListImportAction: 0 },
        ContactListDestination: {
          ContactListName: 0,
          ContactListImportAction: 0,
        },
      },
      ImportDataSource: { S3Url: 0, DataFormat: 0 },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImportJob",
})) as any;

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
  CreateMultiRegionEndpointRequest,
  CreateMultiRegionEndpointResponse,
  CreateMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/multi-region-endpoints",
    input: {
      EndpointName: 0,
      Details: { RoutesDetails: D.list({ Region: 0 }) },
      Tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiRegionEndpoint",
})) as any;

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
  CreateTenantRequest,
  CreateTenantResponse,
  CreateTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tenants",
    input: {
      TenantName: 0,
      Tags: D.list(i_Tag),
      SuppressionAttributes: { SuppressedReasons: 0, SuppressionScope: 0 },
    },
    output: { CreatedTimestamp: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTenant",
})) as any;

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
  CreateTenantResourceAssociationRequest,
  CreateTenantResourceAssociationResponse,
  CreateTenantResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tenants/resources",
    input: { TenantName: 0, ResourceArn: 0 },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTenantResourceAssociation",
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
 * *Configuration sets* are groups of rules that you can apply to the
 * emails you send. You apply a configuration set to an email by including a reference to
 * the configuration set in the headers of the email. When you apply a configuration set to
 * an email, all of the rules in that configuration set are applied to the email.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/configuration-sets/{ConfigurationSetName}",
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
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
    input: { ConfigurationSetName: 0, EventDestinationName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
})) as any;

export type DeleteContactError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a contact from a contact list.
 */
export const deleteContact: API.OperationMethod<
  DeleteContactRequest,
  DeleteContactResponse,
  DeleteContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
    input: { ContactListName: 0, EmailAddress: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContact",
})) as any;

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
  DeleteContactListRequest,
  DeleteContactListResponse,
  DeleteContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/contact-lists/{ContactListName}",
    input: { ContactListName: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactList",
})) as any;

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
  DeleteCustomVerificationEmailTemplateRequest,
  DeleteCustomVerificationEmailTemplateResponse,
  DeleteCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/custom-verification-email-templates/{TemplateName}",
    input: { TemplateName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomVerificationEmailTemplate",
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
    http: "DELETE /v2/email/dedicated-ip-pools/{PoolName}",
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
 * Deletes an email identity. An identity can be either an email address or a domain
 * name.
 */
export const deleteEmailIdentity: API.OperationMethod<
  DeleteEmailIdentityRequest,
  DeleteEmailIdentityResponse,
  DeleteEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/identities/{EmailIdentity}",
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
  DeleteEmailIdentityPolicyRequest,
  DeleteEmailIdentityPolicyResponse,
  DeleteEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
    input: { EmailIdentity: 0, PolicyName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailIdentityPolicy",
})) as any;

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
  DeleteEmailTemplateRequest,
  DeleteEmailTemplateResponse,
  DeleteEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/templates/{TemplateName}",
    input: { TemplateName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailTemplate",
})) as any;

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
  DeleteMultiRegionEndpointRequest,
  DeleteMultiRegionEndpointResponse,
  DeleteMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/multi-region-endpoints/{EndpointName}",
    input: { EndpointName: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiRegionEndpoint",
})) as any;

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
  DeleteSuppressedDestinationRequest,
  DeleteSuppressedDestinationResponse,
  DeleteSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/email/suppression/addresses/{EmailAddress}",
    input: { EmailAddress: 0, TenantName: D.m({ query: "TenantName" }) },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSuppressedDestination",
})) as any;

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
  DeleteTenantRequest,
  DeleteTenantResponse,
  DeleteTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tenants/delete",
    input: { TenantName: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTenant",
})) as any;

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
  DeleteTenantResourceAssociationRequest,
  DeleteTenantResourceAssociationResponse,
  DeleteTenantResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tenants/resources/delete",
    input: { TenantName: 0, ResourceArn: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTenantResourceAssociation",
})) as any;

export type GetAccountError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Obtain information about the email-sending status and capabilities of your Amazon SES
 * account in the current Amazon Web Services Region.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest,
  GetAccountResponse,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/account",
    input: {},
    output: {
      Details: {
        WebsiteURL: D.secret,
        UseCaseDescription: D.secret,
        AdditionalContactEmailAddresses: D.list(D.secret),
      },
    },
  },
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
    http: "GET /v2/email/deliverability-dashboard/blacklist-report",
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
 * *Configuration sets* are groups of rules that you can apply to the
 * emails you send. You apply a configuration set to an email by including a reference to
 * the configuration set in the headers of the email. When you apply a configuration set to
 * an email, all of the rules in that configuration set are applied to the email.
 */
export const getConfigurationSet: API.OperationMethod<
  GetConfigurationSetRequest,
  GetConfigurationSetResponse,
  GetConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/configuration-sets/{ConfigurationSetName}",
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
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const getConfigurationSetEventDestinations: API.OperationMethod<
  GetConfigurationSetEventDestinationsRequest,
  GetConfigurationSetEventDestinationsResponse,
  GetConfigurationSetEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/configuration-sets/{ConfigurationSetName}/event-destinations",
    input: { ConfigurationSetName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
})) as any;

export type GetContactError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a contact from a contact list.
 */
export const getContact: API.OperationMethod<
  GetContactRequest,
  GetContactResponse,
  GetContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
    input: { ContactListName: 0, EmailAddress: 0 },
    output: { CreatedTimestamp: D.ts, LastUpdatedTimestamp: D.ts },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContact",
})) as any;

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
  GetContactListRequest,
  GetContactListResponse,
  GetContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/contact-lists/{ContactListName}",
    input: { ContactListName: 0 },
    output: { CreatedTimestamp: D.ts, LastUpdatedTimestamp: D.ts },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactList",
})) as any;

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
  GetCustomVerificationEmailTemplateRequest,
  GetCustomVerificationEmailTemplateResponse,
  GetCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/custom-verification-email-templates/{TemplateName}",
    input: { TemplateName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomVerificationEmailTemplate",
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
    http: "GET /v2/email/dedicated-ips/{Ip}",
    input: { Ip: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIp",
})) as any;

export type GetDedicatedIpPoolError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about the dedicated pool.
 */
export const getDedicatedIpPool: API.OperationMethod<
  GetDedicatedIpPoolRequest,
  GetDedicatedIpPoolResponse,
  GetDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/dedicated-ip-pools/{PoolName}",
    input: { PoolName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIpPool",
})) as any;

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
  GetDedicatedIpsRequest,
  GetDedicatedIpsResponse,
  GetDedicatedIpsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/dedicated-ips",
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
  GetDeliverabilityDashboardOptionsRequest,
  GetDeliverabilityDashboardOptionsResponse,
  GetDeliverabilityDashboardOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/deliverability-dashboard",
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
    http: "GET /v2/email/deliverability-dashboard/test-reports/{ReportId}",
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
 * Deliverability dashboard is enabled for.
 */
export const getDomainDeliverabilityCampaign: API.OperationMethod<
  GetDomainDeliverabilityCampaignRequest,
  GetDomainDeliverabilityCampaignResponse,
  GetDomainDeliverabilityCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/deliverability-dashboard/campaigns/{CampaignId}",
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
    http: "GET /v2/email/deliverability-dashboard/statistics-report/{Domain}",
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

export type GetEmailAddressInsightsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides validation insights about a specific email address, including syntax validation, DNS record checks, mailbox existence, and other deliverability factors.
 */
export const getEmailAddressInsights: API.OperationMethod<
  GetEmailAddressInsightsRequest,
  GetEmailAddressInsightsResponse,
  GetEmailAddressInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/email-address-insights",
    input: { EmailAddress: 0 },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailAddressInsights",
})) as any;

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
  GetEmailIdentityRequest,
  GetEmailIdentityResponse,
  GetEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/identities/{EmailIdentity}",
    input: { EmailIdentity: 0 },
    output: {
      DkimAttributes: o_DkimAttributes,
      VerificationInfo: {
        LastCheckedTimestamp: D.ts,
        LastSuccessTimestamp: D.ts,
      },
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentity",
})) as any;

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
  GetEmailIdentityPoliciesRequest,
  GetEmailIdentityPoliciesResponse,
  GetEmailIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/identities/{EmailIdentity}/policies",
    input: { EmailIdentity: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentityPolicies",
})) as any;

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
  GetEmailTemplateRequest,
  GetEmailTemplateResponse,
  GetEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/templates/{TemplateName}",
    input: { TemplateName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailTemplate",
})) as any;

export type GetExportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about an export job.
 */
export const getExportJob: API.OperationMethod<
  GetExportJobRequest,
  GetExportJobResponse,
  GetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/export-jobs/{JobId}",
    input: { JobId: 0 },
    output: {
      ExportDataSource: {
        MetricsDataSource: { StartDate: D.ts, EndDate: D.ts },
        MessageInsightsDataSource: {
          StartDate: D.ts,
          EndDate: D.ts,
          Include: o_MessageInsightsFilters,
          Exclude: o_MessageInsightsFilters,
        },
      },
      CreatedTimestamp: D.ts,
      CompletedTimestamp: D.ts,
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportJob",
})) as any;

export type GetImportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about an import job.
 */
export const getImportJob: API.OperationMethod<
  GetImportJobRequest,
  GetImportJobResponse,
  GetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/import-jobs/{JobId}",
    input: { JobId: 0 },
    output: { CreatedTimestamp: D.ts, CompletedTimestamp: D.ts },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
})) as any;

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
  GetMessageInsightsRequest,
  GetMessageInsightsResponse,
  GetMessageInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/insights/{MessageId}",
    input: { MessageId: 0 },
    output: {
      FromEmailAddress: D.secret,
      Subject: D.secret,
      Insights: D.list({
        Destination: D.secret,
        Events: D.list({ Timestamp: D.ts }),
      }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMessageInsights",
})) as any;

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
  GetMultiRegionEndpointRequest,
  GetMultiRegionEndpointResponse,
  GetMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/multi-region-endpoints/{EndpointName}",
    input: { EndpointName: 0 },
    output: { CreatedTimestamp: D.ts, LastUpdatedTimestamp: D.ts },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionEndpoint",
})) as any;

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
  GetReputationEntityRequest,
  GetReputationEntityResponse,
  GetReputationEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}",
    input: { ReputationEntityReference: 0, ReputationEntityType: 0 },
    output: { ReputationEntity: o_ReputationEntity },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReputationEntity",
})) as any;

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
  GetSuppressedDestinationRequest,
  GetSuppressedDestinationResponse,
  GetSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/suppression/addresses/{EmailAddress}",
    input: { EmailAddress: 0, TenantName: D.m({ query: "TenantName" }) },
    output: { SuppressedDestination: { LastUpdateTime: D.ts } },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuppressedDestination",
})) as any;

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
  GetTenantRequest,
  GetTenantResponse,
  GetTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tenants/get",
    input: { TenantName: 0 },
    output: { Tenant: { CreatedTimestamp: D.ts } },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTenant",
})) as any;

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
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/configuration-sets",
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

export type ListContactListsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the contact lists available.
 *
 * If your output includes a "NextToken" field with a string value, this indicates there may be additional
 * contacts on the filtered list - regardless of the number of contacts returned.
 */
export const listContactLists: API.PaginatedOperationMethod<
  ListContactListsRequest,
  ListContactListsResponse,
  ListContactListsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/contact-lists",
    input: {
      PageSize: D.m({ query: "PageSize" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { ContactLists: D.list({ LastUpdatedTimestamp: D.ts }) },
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
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
  ListContactsRequest,
  ListContactsResponse,
  ListContactsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/contact-lists/{ContactListName}/contacts/list",
    input: {
      ContactListName: 0,
      Filter: {
        FilteredStatus: 0,
        TopicFilter: { TopicName: 0, UseDefaultIfPreferenceUnavailable: 0 },
      },
      PageSize: 0,
      NextToken: 0,
    },
    output: { Contacts: D.list({ LastUpdatedTimestamp: D.ts }) },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContacts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
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
  ListCustomVerificationEmailTemplatesRequest,
  ListCustomVerificationEmailTemplatesResponse,
  ListCustomVerificationEmailTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/custom-verification-email-templates",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomVerificationEmailTemplates",
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
 * List all of the dedicated IP pools that exist in your Amazon Web Services account in the current
 * Region.
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
    http: "GET /v2/email/dedicated-ip-pools",
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
    http: "GET /v2/email/deliverability-dashboard/test-reports",
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
 * enabled the Deliverability dashboard for the domain.
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
    http: "GET /v2/email/deliverability-dashboard/domains/{SubscribedDomain}/campaigns",
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
 * Returns a list of all of the email identities that are associated with your Amazon Web Services
 * account. An identity can be either an email address or a domain. This operation returns
 * identities that are verified as well as those that aren't. This operation returns
 * identities that are associated with Amazon SES and Amazon Pinpoint.
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
    http: "GET /v2/email/identities",
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

export type ListEmailTemplatesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the email templates present in your Amazon SES account in the current Amazon Web Services
 * Region.
 *
 * You can execute this operation no more than once per second.
 */
export const listEmailTemplates: API.PaginatedOperationMethod<
  ListEmailTemplatesRequest,
  ListEmailTemplatesResponse,
  ListEmailTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/templates",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
    output: { TemplatesMetadata: D.list({ CreatedTimestamp: D.ts }) },
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListExportJobsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the export jobs.
 */
export const listExportJobs: API.PaginatedOperationMethod<
  ListExportJobsRequest,
  ListExportJobsResponse,
  ListExportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/list-export-jobs",
    input: { NextToken: 0, PageSize: 0, ExportSourceType: 0, JobStatus: 0 },
    output: {
      ExportJobs: D.list({ CreatedTimestamp: D.ts, CompletedTimestamp: D.ts }),
    },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListImportJobsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the import jobs.
 */
export const listImportJobs: API.PaginatedOperationMethod<
  ListImportJobsRequest,
  ListImportJobsResponse,
  ListImportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/import-jobs/list",
    input: { ImportDestinationType: 0, NextToken: 0, PageSize: 0 },
    output: { ImportJobs: D.list({ CreatedTimestamp: D.ts }) },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
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
  ListMultiRegionEndpointsRequest,
  ListMultiRegionEndpointsResponse,
  ListMultiRegionEndpointsError,
  Credentials | HttpClient.HttpClient,
  MultiRegionEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/multi-region-endpoints",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
    output: {
      MultiRegionEndpoints: D.list({
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      }),
    },
  },
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
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/vdm/recommendations",
    input: { Filter: 0, NextToken: 0, PageSize: 0 },
    output: {
      Recommendations: D.list({
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      }),
    },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
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
  ListReputationEntitiesRequest,
  ListReputationEntitiesResponse,
  ListReputationEntitiesError,
  Credentials | HttpClient.HttpClient,
  ReputationEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/reputation/entities",
    input: { Filter: 0, NextToken: 0, PageSize: 0 },
    output: { ReputationEntities: D.list(o_ReputationEntity) },
    body: true,
  },
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
  ListResourceTenantsRequest,
  ListResourceTenantsResponse,
  ListResourceTenantsError,
  Credentials | HttpClient.HttpClient,
  ResourceTenantMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/resources/tenants/list",
    input: { ResourceArn: 0, PageSize: 0, NextToken: 0 },
    output: { ResourceTenants: D.list({ AssociatedTimestamp: D.ts }) },
    body: true,
  },
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
  ListSuppressedDestinationsRequest,
  ListSuppressedDestinationsResponse,
  ListSuppressedDestinationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/suppression/addresses",
    input: {
      TenantName: D.m({ query: "TenantName" }),
      Reasons: D.m({ query: "Reason" }),
      StartDate: D.m({ query: "StartDate", shape: D.tsAs("epoch-seconds") }),
      EndDate: D.m({ query: "EndDate", shape: D.tsAs("epoch-seconds") }),
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
    output: {
      SuppressedDestinationSummaries: D.list({ LastUpdateTime: D.ts }),
    },
  },
  errors: [
    BadRequestException,
    InvalidNextTokenException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuppressedDestinations",
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
 * with a resource. Each tag consists of a required *tag key* and an
 * optional associated *tag value*. A tag key is a general label that
 * acts as a category for more specific tag values. A tag value acts as a descriptor within
 * a tag key.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/email/tags",
    input: { ResourceArn: D.m({ query: "ResourceArn" }) },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  ListTenantResourcesRequest,
  ListTenantResourcesResponse,
  ListTenantResourcesError,
  Credentials | HttpClient.HttpClient,
  TenantResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tenants/resources/list",
    input: { TenantName: 0, Filter: 0, PageSize: 0, NextToken: 0 },
    body: true,
  },
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
})) as any;

export type ListTenantsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all tenants associated with your account in the current Amazon Web Services Region.
 *
 * This operation returns basic information about each tenant,
 * such as tenant name, ID, ARN, and creation timestamp.
 */
export const listTenants: API.PaginatedOperationMethod<
  ListTenantsRequest,
  ListTenantsResponse,
  ListTenantsError,
  Credentials | HttpClient.HttpClient,
  TenantInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tenants/list",
    input: { NextToken: 0, PageSize: 0 },
    output: { Tenants: D.list({ CreatedTimestamp: D.ts }) },
    body: true,
  },
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
    http: "PUT /v2/email/account/dedicated-ips/warmup",
    input: { AutoWarmupEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDedicatedIpWarmupAttributes",
})) as any;

export type PutAccountDetailsError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update your Amazon SES account details.
 */
export const putAccountDetails: API.OperationMethod<
  PutAccountDetailsRequest,
  PutAccountDetailsResponse,
  PutAccountDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/account/details",
    input: {
      MailType: 0,
      WebsiteURL: 0,
      ContactLanguage: 0,
      UseCaseDescription: 0,
      AdditionalContactEmailAddresses: 0,
      ProductionAccessEnabled: 0,
    },
    body: true,
  },
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDetails",
})) as any;

export type PutAccountPricingAttributesError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Set the pricing plan for your Amazon SES account.
 */
export const putAccountPricingAttributes: API.OperationMethod<
  PutAccountPricingAttributesRequest,
  PutAccountPricingAttributesResponse,
  PutAccountPricingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/account/pricing-attributes",
    input: { Plan: 0 },
    body: true,
  },
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountPricingAttributes",
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
    http: "PUT /v2/email/account/sending",
    input: { SendingEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSendingAttributes",
})) as any;

export type PutAccountSuppressionAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for the account-level suppression list.
 */
export const putAccountSuppressionAttributes: API.OperationMethod<
  PutAccountSuppressionAttributesRequest,
  PutAccountSuppressionAttributesResponse,
  PutAccountSuppressionAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/account/suppression",
    input: {
      SuppressedReasons: 0,
      ValidationAttributes: {
        ConditionThreshold: i_SuppressionConditionThreshold,
      },
    },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSuppressionAttributes",
})) as any;

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
  PutAccountVdmAttributesRequest,
  PutAccountVdmAttributesResponse,
  PutAccountVdmAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/account/vdm",
    input: {
      VdmAttributes: {
        VdmEnabled: 0,
        DashboardAttributes: { EngagementMetrics: 0 },
        GuardianAttributes: { OptimizedSharedDelivery: 0 },
      },
    },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountVdmAttributes",
})) as any;

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
  PutConfigurationSetArchivingOptionsRequest,
  PutConfigurationSetArchivingOptionsResponse,
  PutConfigurationSetArchivingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/configuration-sets/{ConfigurationSetName}/archiving-options",
    input: { ConfigurationSetName: 0, ArchiveArn: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetArchivingOptions",
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
    http: "PUT /v2/email/configuration-sets/{ConfigurationSetName}/delivery-options",
    input: {
      ConfigurationSetName: 0,
      TlsPolicy: 0,
      SendingPoolName: 0,
      MaxDeliverySeconds: 0,
    },
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
 * particular configuration set in a specific Amazon Web Services Region.
 */
export const putConfigurationSetReputationOptions: API.OperationMethod<
  PutConfigurationSetReputationOptionsRequest,
  PutConfigurationSetReputationOptionsResponse,
  PutConfigurationSetReputationOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/configuration-sets/{ConfigurationSetName}/reputation-options",
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
 * in a specific Amazon Web Services Region.
 */
export const putConfigurationSetSendingOptions: API.OperationMethod<
  PutConfigurationSetSendingOptionsRequest,
  PutConfigurationSetSendingOptionsResponse,
  PutConfigurationSetSendingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/configuration-sets/{ConfigurationSetName}/sending",
    input: { ConfigurationSetName: 0, SendingEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSendingOptions",
})) as any;

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
  PutConfigurationSetSuppressionOptionsRequest,
  PutConfigurationSetSuppressionOptionsResponse,
  PutConfigurationSetSuppressionOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/configuration-sets/{ConfigurationSetName}/suppression-options",
    input: {
      ConfigurationSetName: 0,
      SuppressionScope: 0,
      SuppressedReasons: 0,
      ValidationOptions: i_SuppressionValidationOptions,
    },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSuppressionOptions",
})) as any;

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
  PutConfigurationSetTrackingOptionsRequest,
  PutConfigurationSetTrackingOptionsResponse,
  PutConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/configuration-sets/{ConfigurationSetName}/tracking-options",
    input: { ConfigurationSetName: 0, CustomRedirectDomain: 0, HttpsPolicy: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetTrackingOptions",
})) as any;

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
  PutConfigurationSetVdmOptionsRequest,
  PutConfigurationSetVdmOptionsResponse,
  PutConfigurationSetVdmOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/configuration-sets/{ConfigurationSetName}/vdm-options",
    input: { ConfigurationSetName: 0, VdmOptions: i_VdmOptions },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetVdmOptions",
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
 * associated with your Amazon Web Services account.
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
    http: "PUT /v2/email/dedicated-ips/{Ip}/pool",
    input: { Ip: 0, DestinationPoolName: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpInPool",
})) as any;

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
  PutDedicatedIpPoolScalingAttributesRequest,
  PutDedicatedIpPoolScalingAttributesResponse,
  PutDedicatedIpPoolScalingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/dedicated-ip-pools/{PoolName}/scaling",
    input: { PoolName: 0, ScalingMode: 0 },
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
  operationName: "PutDedicatedIpPoolScalingAttributes",
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
    http: "PUT /v2/email/dedicated-ips/{Ip}/warmup",
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
 * Enable or disable the Deliverability dashboard. When you enable the Deliverability dashboard, you gain
 * access to reputation, deliverability, and other metrics for the domains that you use to
 * send email. You also gain the ability to perform predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon SES and other Amazon Web Services services. For more
 * information about the features and cost of a Deliverability dashboard subscription, see Amazon SES Pricing.
 */
export const putDeliverabilityDashboardOption: API.OperationMethod<
  PutDeliverabilityDashboardOptionRequest,
  PutDeliverabilityDashboardOptionResponse,
  PutDeliverabilityDashboardOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/deliverability-dashboard",
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

export type PutEmailIdentityConfigurationSetAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to associate a configuration set with an email identity.
 */
export const putEmailIdentityConfigurationSetAttributes: API.OperationMethod<
  PutEmailIdentityConfigurationSetAttributesRequest,
  PutEmailIdentityConfigurationSetAttributesResponse,
  PutEmailIdentityConfigurationSetAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/identities/{EmailIdentity}/configuration-set",
    input: { EmailIdentity: 0, ConfigurationSetName: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityConfigurationSetAttributes",
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
    http: "PUT /v2/email/identities/{EmailIdentity}/dkim",
    input: { EmailIdentity: 0, SigningEnabled: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimAttributes",
})) as any;

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
  PutEmailIdentityDkimSigningAttributesRequest,
  PutEmailIdentityDkimSigningAttributesResponse,
  PutEmailIdentityDkimSigningAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/identities/{EmailIdentity}/dkim/signing",
    input: {
      EmailIdentity: 0,
      SigningAttributesOrigin: 0,
      SigningAttributes: i_DkimSigningAttributes,
    },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimSigningAttributes",
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
  PutEmailIdentityFeedbackAttributesRequest,
  PutEmailIdentityFeedbackAttributesResponse,
  PutEmailIdentityFeedbackAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/identities/{EmailIdentity}/feedback",
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
    http: "PUT /v2/email/identities/{EmailIdentity}/mail-from",
    input: { EmailIdentity: 0, MailFromDomain: 0, BehaviorOnMxFailure: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityMailFromAttributes",
})) as any;

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
  PutSuppressedDestinationRequest,
  PutSuppressedDestinationResponse,
  PutSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/suppression/addresses",
    input: { EmailAddress: 0, Reason: 0, TenantName: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSuppressedDestination",
})) as any;

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
  PutTenantSuppressionAttributesRequest,
  PutTenantSuppressionAttributesResponse,
  PutTenantSuppressionAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tenant/suppression",
    input: { TenantName: 0, SuppressedReasons: 0, SuppressionScope: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTenantSuppressionAttributes",
})) as any;

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
  SendBulkEmailRequest,
  SendBulkEmailResponse,
  SendBulkEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/outbound-bulk-emails",
    input: {
      FromEmailAddress: 0,
      FromEmailAddressIdentityArn: 0,
      ReplyToAddresses: 0,
      FeedbackForwardingEmailAddress: 0,
      FeedbackForwardingEmailAddressIdentityArn: 0,
      DefaultEmailTags: D.list(i_MessageTag),
      DefaultContent: { Template: i_Template },
      BulkEmailEntries: D.list({
        Destination: i_Destination,
        ReplacementTags: D.list(i_MessageTag),
        ReplacementEmailContent: {
          ReplacementTemplate: { ReplacementTemplateData: 0 },
        },
        ReplacementHeaders: D.list(i_MessageHeader),
      }),
      ConfigurationSetName: 0,
      EndpointId: D.m({ context: "EndpointId" }),
      TenantName: 0,
      ConfigurationOverrides: i_ConfigurationOverrides,
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
  operationName: "SendBulkEmail",
})) as any;

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
  SendCustomVerificationEmailRequest,
  SendCustomVerificationEmailResponse,
  SendCustomVerificationEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/outbound-custom-verification-emails",
    input: { EmailAddress: 0, TemplateName: 0, ConfigurationSetName: 0 },
    body: true,
  },
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
 * Sends an email message. You can use the Amazon SES API v2 to send the following types of
 * messages:
 *
 * - **Simple** – A standard email message. When
 * you create this type of message, you specify the sender, the recipient, and the
 * message body, and Amazon SES assembles the message for you.
 *
 * - **Raw** – A raw, MIME-formatted email
 * message. When you send this type of email, you have to specify all of the
 * message headers, as well as the message body. You can use this message type to
 * send messages that contain attachments. The message that you specify has to be a
 * valid MIME message.
 *
 * - **Templated** – A message that contains
 * personalization tags. When you send this type of email, Amazon SES API v2 automatically
 * replaces the tags with values that you specify.
 */
export const sendEmail: API.OperationMethod<
  SendEmailRequest,
  SendEmailResponse,
  SendEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/outbound-emails",
    input: {
      FromEmailAddress: 0,
      FromEmailAddressIdentityArn: 0,
      Destination: i_Destination,
      ReplyToAddresses: 0,
      FeedbackForwardingEmailAddress: 0,
      FeedbackForwardingEmailAddressIdentityArn: 0,
      Content: i_EmailContent,
      EmailTags: D.list(i_MessageTag),
      ConfigurationSetName: 0,
      EndpointId: D.m({ context: "EndpointId" }),
      TenantName: 0,
      ListManagementOptions: { ContactListName: 0, TopicName: 0 },
      ConfigurationOverrides: i_ConfigurationOverrides,
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
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/tags",
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
  TestRenderEmailTemplateRequest,
  TestRenderEmailTemplateResponse,
  TestRenderEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/email/templates/{TemplateName}/render",
    input: { TemplateName: 0, TemplateData: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestRenderEmailTemplate",
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
    http: "DELETE /v2/email/tags",
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
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
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
  UpdateContactRequest,
  UpdateContactResponse,
  UpdateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
    input: {
      ContactListName: 0,
      EmailAddress: 0,
      TopicPreferences: D.list(i_TopicPreference),
      UnsubscribeAll: 0,
      AttributesData: 0,
    },
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
  operationName: "UpdateContact",
})) as any;

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
  UpdateContactListRequest,
  UpdateContactListResponse,
  UpdateContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/contact-lists/{ContactListName}",
    input: { ContactListName: 0, Topics: D.list(i_Topic), Description: 0 },
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
  operationName: "UpdateContactList",
})) as any;

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
  UpdateCustomVerificationEmailTemplateRequest,
  UpdateCustomVerificationEmailTemplateResponse,
  UpdateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/custom-verification-email-templates/{TemplateName}",
    input: {
      TemplateName: 0,
      FromEmailAddress: 0,
      TemplateSubject: 0,
      TemplateContent: 0,
      SuccessRedirectionURL: 0,
      FailureRedirectionURL: 0,
    },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomVerificationEmailTemplate",
})) as any;

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
  UpdateEmailIdentityPolicyRequest,
  UpdateEmailIdentityPolicyResponse,
  UpdateEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
    input: { EmailIdentity: 0, PolicyName: 0, Policy: 0 },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailIdentityPolicy",
})) as any;

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
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse,
  UpdateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/templates/{TemplateName}",
    input: { TemplateName: 0, TemplateContent: i_EmailTemplateContent },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailTemplate",
})) as any;

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
  UpdateReputationEntityCustomerManagedStatusRequest,
  UpdateReputationEntityCustomerManagedStatusResponse,
  UpdateReputationEntityCustomerManagedStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}/customer-managed-status",
    input: {
      ReputationEntityType: 0,
      ReputationEntityReference: 0,
      SendingStatus: 0,
    },
    body: true,
  },
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReputationEntityCustomerManagedStatus",
})) as any;

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
  UpdateReputationEntityPolicyRequest,
  UpdateReputationEntityPolicyResponse,
  UpdateReputationEntityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}/policy",
    input: {
      ReputationEntityType: 0,
      ReputationEntityReference: 0,
      ReputationEntityPolicy: 0,
    },
    body: true,
  },
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReputationEntityPolicy",
})) as any;

const i_ConfigurationOverrides: D.LazyStruct = () => ({
  Tracking: { OpenTrackingEnabled: 0, ClickTrackingEnabled: 0 },
});
const i_Destination: D.LazyStruct = () => ({
  ToAddresses: 0,
  CcAddresses: 0,
  BccAddresses: 0,
});
const i_DkimSigningAttributes: D.LazyStruct = () => ({
  DomainSigningSelector: 0,
  DomainSigningPrivateKey: 0,
  NextSigningKeyLength: 0,
  DomainSigningAttributesOrigin: 0,
});
const i_EmailContent: D.LazyStruct = () => ({
  Simple: {
    Subject: i_Content,
    Body: { Text: i_Content, Html: i_Content },
    Headers: D.list(i_MessageHeader),
    Attachments: D.list(i_Attachment),
  },
  Raw: { Data: 0 },
  Template: i_Template,
});
const i_EmailTemplateContent: D.LazyStruct = () => ({
  Subject: 0,
  Text: 0,
  Html: 0,
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
  EventBridgeDestination: { EventBusArn: 0 },
  PinpointDestination: { ApplicationArn: 0 },
});
const i_MessageHeader: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_MessageInsightsFilters: D.LazyStruct = () => ({
  FromEmailAddress: 0,
  Destination: 0,
  Subject: 0,
  Isp: 0,
  LastDeliveryEvent: 0,
  LastEngagementEvent: 0,
});
const i_MessageTag: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_SuppressionConditionThreshold: D.LazyStruct = () => ({
  ConditionThresholdEnabled: 0,
  OverallConfidenceThreshold: { ConfidenceVerdictThreshold: 0 },
});
const i_SuppressionValidationOptions: D.LazyStruct = () => ({
  ConditionThreshold: i_SuppressionConditionThreshold,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_Template: D.LazyStruct = () => ({
  TemplateName: 0,
  TemplateArn: 0,
  TemplateContent: i_EmailTemplateContent,
  TemplateData: 0,
  Headers: D.list(i_MessageHeader),
  Attachments: D.list(i_Attachment),
});
const i_Topic: D.LazyStruct = () => ({
  TopicName: 0,
  DisplayName: 0,
  Description: 0,
  DefaultSubscriptionStatus: 0,
});
const i_TopicPreference: D.LazyStruct = () => ({
  TopicName: 0,
  SubscriptionStatus: 0,
});
const i_VdmOptions: D.LazyStruct = () => ({
  DashboardOptions: { EngagementMetrics: 0 },
  GuardianOptions: { OptimizedSharedDelivery: 0 },
});
const o_DeliverabilityTestReport: D.LazyStruct = () => ({ CreateDate: D.ts });
const o_DkimAttributes: D.LazyStruct = () => ({
  LastKeyGenerationTimestamp: D.ts,
});
const o_DomainDeliverabilityCampaign: D.LazyStruct = () => ({
  FirstSeenDateTime: D.ts,
  LastSeenDateTime: D.ts,
});
const o_DomainDeliverabilityTrackingOption: D.LazyStruct = () => ({
  SubscriptionStartDate: D.ts,
});
const o_MessageInsightsFilters: D.LazyStruct = () => ({
  FromEmailAddress: D.list(D.secret),
  Destination: D.list(D.secret),
  Subject: D.list(D.secret),
});
const o_ReputationEntity: D.LazyStruct = () => ({
  CustomerManagedStatus: o_StatusRecord,
  AwsSesManagedStatus: o_StatusRecord,
});
const i_Attachment: D.LazyStruct = () => ({
  RawContent: 0,
  ContentDisposition: 0,
  FileName: 0,
  ContentDescription: 0,
  ContentId: 0,
  ContentTransferEncoding: 0,
  ContentType: 0,
});
const i_Content: D.LazyStruct = () => ({ Data: 0, Charset: 0 });
const o_StatusRecord: D.LazyStruct = () => ({ LastUpdatedTimestamp: D.ts });
