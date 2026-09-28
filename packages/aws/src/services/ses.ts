import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "SES",
  target: "SimpleEmailService",
  version: "2010-12-01",
  sigv4: "ses",
  protocol: awsQueryProtocol,
  xmlns: "http://ses.amazonaws.com/doc/2010-12-01/",
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

export class AccountSendingPausedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountSendingPausedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "AlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "AlreadyExists", status: 400 },
  )<{ readonly Name?: string; readonly message?: string }> {}
export class CannotDeleteException
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotDeleteException",
    ["BadRequestError"],
    { code: "CannotDelete", status: 400 },
  )<{ readonly Name?: string; readonly message?: string }> {}
export class ConfigurationSetAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConfigurationSetAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ConfigurationSetAlreadyExists", status: 400 },
  )<{ readonly ConfigurationSetName?: string; readonly message?: string }> {}
export class ConfigurationSetDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConfigurationSetDoesNotExistException",
    ["BadRequestError"],
    { code: "ConfigurationSetDoesNotExist", status: 400 },
  )<{ readonly ConfigurationSetName?: string; readonly message?: string }> {}
export class ConfigurationSetSendingPausedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConfigurationSetSendingPausedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ConfigurationSetName?: string; readonly message?: string }> {}
export class CustomVerificationEmailInvalidContentException
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomVerificationEmailInvalidContentException",
    ["BadRequestError"],
    { code: "CustomVerificationEmailInvalidContent", status: 400 },
  )<{ readonly message?: string }> {}
export class CustomVerificationEmailTemplateAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomVerificationEmailTemplateAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "CustomVerificationEmailTemplateAlreadyExists", status: 400 },
  )<{
    readonly CustomVerificationEmailTemplateName?: string;
    readonly message?: string;
  }> {}
export class CustomVerificationEmailTemplateDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomVerificationEmailTemplateDoesNotExistException",
    ["BadRequestError"],
    { code: "CustomVerificationEmailTemplateDoesNotExist", status: 400 },
  )<{
    readonly CustomVerificationEmailTemplateName?: string;
    readonly message?: string;
  }> {}
export class EventDestinationAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDestinationAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "EventDestinationAlreadyExists", status: 400 },
  )<{
    readonly ConfigurationSetName?: string;
    readonly EventDestinationName?: string;
    readonly message?: string;
  }> {}
export class EventDestinationDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDestinationDoesNotExistException",
    ["BadRequestError"],
    { code: "EventDestinationDoesNotExist", status: 400 },
  )<{
    readonly ConfigurationSetName?: string;
    readonly EventDestinationName?: string;
    readonly message?: string;
  }> {}
export class FromEmailAddressNotVerifiedException
  extends /*@__PURE__*/ TE.TaggedError(
    "FromEmailAddressNotVerifiedException",
    ["BadRequestError"],
    { code: "FromEmailAddressNotVerified", status: 400 },
  )<{ readonly FromEmailAddress?: string; readonly message?: string }> {}
export class IdentityNotVerified
  extends /*@__PURE__*/ TE.TaggedError("IdentityNotVerified", [], {
    synthetic: {
      from: "InvalidParameterValue",
      message: { includes: "Identity is not verified" },
    },
  })<{ readonly message?: string }> {}
export class InvalidCloudWatchDestinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCloudWatchDestinationException",
    ["BadRequestError"],
    { code: "InvalidCloudWatchDestination", status: 400 },
  )<{
    readonly ConfigurationSetName?: string;
    readonly EventDestinationName?: string;
    readonly message?: string;
  }> {}
export class InvalidConfigurationSetException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidConfigurationSetException",
    ["BadRequestError"],
    { code: "InvalidConfigurationSet", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDeliveryOptionsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDeliveryOptionsException",
    ["BadRequestError"],
    { code: "InvalidDeliveryOptions", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidFirehoseDestinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidFirehoseDestinationException",
    ["BadRequestError"],
    { code: "InvalidFirehoseDestination", status: 400 },
  )<{
    readonly ConfigurationSetName?: string;
    readonly EventDestinationName?: string;
    readonly message?: string;
  }> {}
export class InvalidLambdaFunctionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLambdaFunctionException",
    ["BadRequestError"],
    { code: "InvalidLambdaFunction", status: 400 },
  )<{ readonly FunctionArn?: string; readonly message?: string }> {}
export class InvalidParameterValue
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterValue")<{
    readonly message?: string;
  }> {}
export class InvalidPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPolicyException",
    ["BadRequestError"],
    { code: "InvalidPolicy", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRenderingParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRenderingParameterException",
    ["BadRequestError"],
    { code: "InvalidRenderingParameter", status: 400 },
  )<{ readonly TemplateName?: string; readonly message?: string }> {}
export class InvalidS3ConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidS3ConfigurationException",
    ["BadRequestError"],
    { code: "InvalidS3Configuration", status: 400 },
  )<{ readonly Bucket?: string; readonly message?: string }> {}
export class InvalidSNSDestinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSNSDestinationException",
    ["BadRequestError"],
    { code: "InvalidSNSDestination", status: 400 },
  )<{
    readonly ConfigurationSetName?: string;
    readonly EventDestinationName?: string;
    readonly message?: string;
  }> {}
export class InvalidSnsTopicException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSnsTopicException",
    ["BadRequestError"],
    { code: "InvalidSnsTopic", status: 400 },
  )<{ readonly Topic?: string; readonly message?: string }> {}
export class InvalidTemplateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTemplateException",
    ["BadRequestError"],
    { code: "InvalidTemplate", status: 400 },
  )<{ readonly TemplateName?: string; readonly message?: string }> {}
export class InvalidTrackingOptionsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTrackingOptionsException",
    ["BadRequestError"],
    { code: "InvalidTrackingOptions", status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { code: "LimitExceeded", status: 400 },
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
export class MissingRenderingAttributeException
  extends /*@__PURE__*/ TE.TaggedError(
    "MissingRenderingAttributeException",
    ["BadRequestError"],
    { code: "MissingRenderingAttribute", status: 400 },
  )<{ readonly TemplateName?: string; readonly message?: string }> {}
export class ProductionAccessNotGrantedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ProductionAccessNotGrantedException",
    ["BadRequestError"],
    { code: "ProductionAccessNotGranted", status: 400 },
  )<{ readonly message?: string }> {}
export class RuleDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "RuleDoesNotExistException",
    ["BadRequestError"],
    { code: "RuleDoesNotExist", status: 400 },
  )<{ readonly Name?: string; readonly message?: string }> {}
export class RuleSetDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "RuleSetDoesNotExistException",
    ["BadRequestError"],
    { code: "RuleSetDoesNotExist", status: 400 },
  )<{ readonly Name?: string; readonly message?: string }> {}
export class TemplateDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "TemplateDoesNotExistException",
    ["BadRequestError"],
    { code: "TemplateDoesNotExist", status: 400 },
  )<{ readonly TemplateName?: string; readonly message?: string }> {}
export class TrackingOptionsAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrackingOptionsAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly ConfigurationSetName?: string; readonly message?: string }> {}
export class TrackingOptionsDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrackingOptionsDoesNotExistException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ConfigurationSetName?: string; readonly message?: string }> {}
export type ReceiptRuleSetName = string;
export interface CloneReceiptRuleSetRequest {
  RuleSetName: string;
  OriginalRuleSetName: string;
}
export interface CloneReceiptRuleSetResponse {}
export type ConfigurationSetName = string;
export interface ConfigurationSet {
  Name: string;
}
export interface CreateConfigurationSetRequest {
  ConfigurationSet: ConfigurationSet;
}
export interface CreateConfigurationSetResponse {}
export type EventDestinationName = string;
export type Enabled = boolean;
export type EventType =
  | "send"
  | "reject"
  | "bounce"
  | "complaint"
  | "delivery"
  | "open"
  | "click"
  | "renderingFailure"
  | (string & {});
export type EventTypes = EventType[];
export type AmazonResourceName = string;
export interface KinesisFirehoseDestination {
  IAMRoleARN: string;
  DeliveryStreamARN: string;
}
export type DimensionName = string;
export type DimensionValueSource =
  | "messageTag"
  | "emailHeader"
  | "linkTag"
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
export interface SNSDestination {
  TopicARN: string;
}
export interface EventDestination {
  Name: string;
  Enabled?: boolean;
  MatchingEventTypes: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SNSDestination?: SNSDestination;
}
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination: EventDestination;
}
export interface CreateConfigurationSetEventDestinationResponse {}
export type CustomRedirectDomain = string;
export interface TrackingOptions {
  CustomRedirectDomain?: string;
}
export interface CreateConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  TrackingOptions: TrackingOptions;
}
export interface CreateConfigurationSetTrackingOptionsResponse {}
export type TemplateName = string;
export type FromAddress = string;
export type Subject = string;
export type TemplateContent = string;
export type SuccessRedirectionURL = string;
export type FailureRedirectionURL = string;
export interface CreateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}
export interface CreateCustomVerificationEmailTemplateResponse {}
export type ReceiptFilterName = string;
export type ReceiptFilterPolicy = "Block" | "Allow" | (string & {});
export type Cidr = string;
export interface ReceiptIpFilter {
  Policy: ReceiptFilterPolicy;
  Cidr: string;
}
export interface ReceiptFilter {
  Name: string;
  IpFilter: ReceiptIpFilter;
}
export interface CreateReceiptFilterRequest {
  Filter: ReceiptFilter;
}
export interface CreateReceiptFilterResponse {}
export type ReceiptRuleName = string;
export type TlsPolicy = "Require" | "Optional" | (string & {});
export type Recipient = string;
export type RecipientsList = string[];
export type S3BucketName = string;
export type S3KeyPrefix = string;
export type IAMRoleARN = string;
export interface S3Action {
  TopicArn?: string;
  BucketName: string;
  ObjectKeyPrefix?: string;
  KmsKeyArn?: string;
  IamRoleArn?: string;
}
export type BounceSmtpReplyCode = string;
export type BounceStatusCode = string;
export type BounceMessage = string;
export type Address = string;
export interface BounceAction {
  TopicArn?: string;
  SmtpReplyCode: string;
  StatusCode?: string;
  Message: string;
  Sender: string;
}
export interface WorkmailAction {
  TopicArn?: string;
  OrganizationArn: string;
}
export type InvocationType = "Event" | "RequestResponse" | (string & {});
export interface LambdaAction {
  TopicArn?: string;
  FunctionArn: string;
  InvocationType?: InvocationType;
}
export type StopScope = "RuleSet" | (string & {});
export interface StopAction {
  Scope: StopScope;
  TopicArn?: string;
}
export type HeaderName = string;
export type HeaderValue = string;
export interface AddHeaderAction {
  HeaderName: string;
  HeaderValue: string;
}
export type SNSActionEncoding = "UTF-8" | "Base64" | (string & {});
export interface SNSAction {
  TopicArn: string;
  Encoding?: SNSActionEncoding;
}
export type ConnectInstanceArn = string;
export interface ConnectAction {
  InstanceARN: string;
  IAMRoleARN: string;
}
export interface ReceiptAction {
  S3Action?: S3Action;
  BounceAction?: BounceAction;
  WorkmailAction?: WorkmailAction;
  LambdaAction?: LambdaAction;
  StopAction?: StopAction;
  AddHeaderAction?: AddHeaderAction;
  SNSAction?: SNSAction;
  ConnectAction?: ConnectAction;
}
export type ReceiptActionsList = ReceiptAction[];
export interface ReceiptRule {
  Name: string;
  Enabled?: boolean;
  TlsPolicy?: TlsPolicy;
  Recipients?: string[];
  Actions?: ReceiptAction[];
  ScanEnabled?: boolean;
}
export interface CreateReceiptRuleRequest {
  RuleSetName: string;
  After?: string;
  Rule: ReceiptRule;
}
export interface CreateReceiptRuleResponse {}
export interface CreateReceiptRuleSetRequest {
  RuleSetName: string;
}
export interface CreateReceiptRuleSetResponse {}
export type SubjectPart = string;
export type TextPart = string;
export type HtmlPart = string;
export interface Template {
  TemplateName: string;
  SubjectPart?: string;
  TextPart?: string;
  HtmlPart?: string;
}
export interface CreateTemplateRequest {
  Template: Template;
}
export interface CreateTemplateResponse {}
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export interface DeleteConfigurationSetResponse {}
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export interface DeleteConfigurationSetEventDestinationResponse {}
export interface DeleteConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
}
export interface DeleteConfigurationSetTrackingOptionsResponse {}
export interface DeleteCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export interface DeleteCustomVerificationEmailTemplateResponse {}
export type Identity = string;
export interface DeleteIdentityRequest {
  Identity: string;
}
export interface DeleteIdentityResponse {}
export type PolicyName = string;
export interface DeleteIdentityPolicyRequest {
  Identity: string;
  PolicyName: string;
}
export interface DeleteIdentityPolicyResponse {}
export interface DeleteReceiptFilterRequest {
  FilterName: string;
}
export interface DeleteReceiptFilterResponse {}
export interface DeleteReceiptRuleRequest {
  RuleSetName: string;
  RuleName: string;
}
export interface DeleteReceiptRuleResponse {}
export interface DeleteReceiptRuleSetRequest {
  RuleSetName: string;
}
export interface DeleteReceiptRuleSetResponse {}
export interface DeleteTemplateRequest {
  TemplateName: string;
}
export interface DeleteTemplateResponse {}
export interface DeleteVerifiedEmailAddressRequest {
  EmailAddress: string;
}
export interface DeleteVerifiedEmailAddressResponse {}
export interface DescribeActiveReceiptRuleSetRequest {}
export interface ReceiptRuleSetMetadata {
  Name?: string;
  CreatedTimestamp?: Date;
}
export type ReceiptRulesList = ReceiptRule[];
export interface DescribeActiveReceiptRuleSetResponse {
  Metadata?: ReceiptRuleSetMetadata;
  Rules?: ReceiptRule[];
}
export type ConfigurationSetAttribute =
  | "eventDestinations"
  | "trackingOptions"
  | "deliveryOptions"
  | "reputationOptions"
  | (string & {});
export type ConfigurationSetAttributeList = ConfigurationSetAttribute[];
export interface DescribeConfigurationSetRequest {
  ConfigurationSetName: string;
  ConfigurationSetAttributeNames?: ConfigurationSetAttribute[];
}
export type EventDestinations = EventDestination[];
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy;
}
export type LastFreshStart = Date;
export interface ReputationOptions {
  SendingEnabled?: boolean;
  ReputationMetricsEnabled?: boolean;
  LastFreshStart?: Date;
}
export interface DescribeConfigurationSetResponse {
  ConfigurationSet?: ConfigurationSet;
  EventDestinations?: EventDestination[];
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
}
export interface DescribeReceiptRuleRequest {
  RuleSetName: string;
  RuleName: string;
}
export interface DescribeReceiptRuleResponse {
  Rule?: ReceiptRule;
}
export interface DescribeReceiptRuleSetRequest {
  RuleSetName: string;
}
export interface DescribeReceiptRuleSetResponse {
  Metadata?: ReceiptRuleSetMetadata;
  Rules?: ReceiptRule[];
}
export interface GetAccountSendingEnabledRequest {}
export interface GetAccountSendingEnabledResponse {
  Enabled?: boolean;
}
export interface GetCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export interface GetCustomVerificationEmailTemplateResponse {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  TemplateContent?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export type IdentityList = string[];
export interface GetIdentityDkimAttributesRequest {
  Identities: string[];
}
export type VerificationStatus =
  | "Pending"
  | "Success"
  | "Failed"
  | "TemporaryFailure"
  | "NotStarted"
  | (string & {});
export type VerificationToken = string;
export type VerificationTokenList = string[];
export interface IdentityDkimAttributes {
  DkimEnabled: boolean;
  DkimVerificationStatus: VerificationStatus;
  DkimTokens?: string[];
}
export type DkimAttributes = {
  [key: string]: IdentityDkimAttributes | undefined;
};
export interface GetIdentityDkimAttributesResponse {
  DkimAttributes: { [key: string]: IdentityDkimAttributes | undefined };
}
export interface GetIdentityMailFromDomainAttributesRequest {
  Identities: string[];
}
export type MailFromDomainName = string;
export type CustomMailFromStatus =
  | "Pending"
  | "Success"
  | "Failed"
  | "TemporaryFailure"
  | (string & {});
export type BehaviorOnMXFailure =
  | "UseDefaultValue"
  | "RejectMessage"
  | (string & {});
export interface IdentityMailFromDomainAttributes {
  MailFromDomain: string;
  MailFromDomainStatus: CustomMailFromStatus;
  BehaviorOnMXFailure: BehaviorOnMXFailure;
}
export type MailFromDomainAttributes = {
  [key: string]: IdentityMailFromDomainAttributes | undefined;
};
export interface GetIdentityMailFromDomainAttributesResponse {
  MailFromDomainAttributes: {
    [key: string]: IdentityMailFromDomainAttributes | undefined;
  };
}
export interface GetIdentityNotificationAttributesRequest {
  Identities: string[];
}
export type NotificationTopic = string;
export interface IdentityNotificationAttributes {
  BounceTopic: string;
  ComplaintTopic: string;
  DeliveryTopic: string;
  ForwardingEnabled: boolean;
  HeadersInBounceNotificationsEnabled?: boolean;
  HeadersInComplaintNotificationsEnabled?: boolean;
  HeadersInDeliveryNotificationsEnabled?: boolean;
}
export type NotificationAttributes = {
  [key: string]: IdentityNotificationAttributes | undefined;
};
export interface GetIdentityNotificationAttributesResponse {
  NotificationAttributes: {
    [key: string]: IdentityNotificationAttributes | undefined;
  };
}
export type PolicyNameList = string[];
export interface GetIdentityPoliciesRequest {
  Identity: string;
  PolicyNames: string[];
}
export type Policy = string;
export type PolicyMap = { [key: string]: string | undefined };
export interface GetIdentityPoliciesResponse {
  Policies: { [key: string]: string | undefined };
}
export interface GetIdentityVerificationAttributesRequest {
  Identities: string[];
}
export interface IdentityVerificationAttributes {
  VerificationStatus: VerificationStatus;
  VerificationToken?: string;
}
export type VerificationAttributes = {
  [key: string]: IdentityVerificationAttributes | undefined;
};
export interface GetIdentityVerificationAttributesResponse {
  VerificationAttributes: {
    [key: string]: IdentityVerificationAttributes | undefined;
  };
}
export interface GetSendQuotaRequest {}
export type Max24HourSend = number;
export type MaxSendRate = number;
export type SentLast24Hours = number;
export interface GetSendQuotaResponse {
  Max24HourSend?: number;
  MaxSendRate?: number;
  SentLast24Hours?: number;
}
export interface GetSendStatisticsRequest {}
export type Counter = number;
export interface SendDataPoint {
  Timestamp?: Date;
  DeliveryAttempts?: number;
  Bounces?: number;
  Complaints?: number;
  Rejects?: number;
}
export type SendDataPointList = SendDataPoint[];
export interface GetSendStatisticsResponse {
  SendDataPoints?: SendDataPoint[];
}
export interface GetTemplateRequest {
  TemplateName: string;
}
export interface GetTemplateResponse {
  Template?: Template;
}
export type NextToken = string;
export type MaxItems = number;
export interface ListConfigurationSetsRequest {
  NextToken?: string;
  MaxItems?: number;
}
export type ConfigurationSets = ConfigurationSet[];
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: ConfigurationSet[];
  NextToken?: string;
}
export type MaxResults = number;
export interface ListCustomVerificationEmailTemplatesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface CustomVerificationEmailTemplate {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export type CustomVerificationEmailTemplates =
  CustomVerificationEmailTemplate[];
export interface ListCustomVerificationEmailTemplatesResponse {
  CustomVerificationEmailTemplates?: CustomVerificationEmailTemplate[];
  NextToken?: string;
}
export type IdentityType = "EmailAddress" | "Domain" | (string & {});
export interface ListIdentitiesRequest {
  IdentityType?: IdentityType;
  NextToken?: string;
  MaxItems?: number;
}
export interface ListIdentitiesResponse {
  Identities: string[];
  NextToken?: string;
}
export interface ListIdentityPoliciesRequest {
  Identity: string;
}
export interface ListIdentityPoliciesResponse {
  PolicyNames: string[];
}
export interface ListReceiptFiltersRequest {}
export type ReceiptFilterList = ReceiptFilter[];
export interface ListReceiptFiltersResponse {
  Filters?: ReceiptFilter[];
}
export interface ListReceiptRuleSetsRequest {
  NextToken?: string;
}
export type ReceiptRuleSetsLists = ReceiptRuleSetMetadata[];
export interface ListReceiptRuleSetsResponse {
  RuleSets?: ReceiptRuleSetMetadata[];
  NextToken?: string;
}
export interface ListTemplatesRequest {
  NextToken?: string;
  MaxItems?: number;
}
export interface TemplateMetadata {
  Name?: string;
  CreatedTimestamp?: Date;
}
export type TemplateMetadataList = TemplateMetadata[];
export interface ListTemplatesResponse {
  TemplatesMetadata?: TemplateMetadata[];
  NextToken?: string;
}
export interface ListVerifiedEmailAddressesRequest {}
export type AddressList = string[];
export interface ListVerifiedEmailAddressesResponse {
  VerifiedEmailAddresses?: string[];
}
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  DeliveryOptions?: DeliveryOptions;
}
export interface PutConfigurationSetDeliveryOptionsResponse {}
export interface PutIdentityPolicyRequest {
  Identity: string;
  PolicyName: string;
  Policy: string;
}
export interface PutIdentityPolicyResponse {}
export type ReceiptRuleNamesList = string[];
export interface ReorderReceiptRuleSetRequest {
  RuleSetName: string;
  RuleNames: string[];
}
export interface ReorderReceiptRuleSetResponse {}
export type MessageId = string;
export type Explanation = string;
export type ReportingMta = string;
export type ArrivalDate = Date;
export type ExtensionFieldName = string;
export type ExtensionFieldValue = string;
export interface ExtensionField {
  Name: string;
  Value: string;
}
export type ExtensionFieldList = ExtensionField[];
export interface MessageDsn {
  ReportingMta: string;
  ArrivalDate?: Date;
  ExtensionFields?: ExtensionField[];
}
export type BounceType =
  | "DoesNotExist"
  | "MessageTooLarge"
  | "ExceededQuota"
  | "ContentRejected"
  | "Undefined"
  | "TemporaryFailure"
  | (string & {});
export type DsnAction =
  | "failed"
  | "delayed"
  | "delivered"
  | "relayed"
  | "expanded"
  | (string & {});
export type RemoteMta = string;
export type DsnStatus = string;
export type DiagnosticCode = string;
export type LastAttemptDate = Date;
export interface RecipientDsnFields {
  FinalRecipient?: string;
  Action: DsnAction;
  RemoteMta?: string;
  Status: string;
  DiagnosticCode?: string;
  LastAttemptDate?: Date;
  ExtensionFields?: ExtensionField[];
}
export interface BouncedRecipientInfo {
  Recipient: string;
  RecipientArn?: string;
  BounceType?: BounceType;
  RecipientDsnFields?: RecipientDsnFields;
}
export type BouncedRecipientInfoList = BouncedRecipientInfo[];
export interface SendBounceRequest {
  OriginalMessageId: string;
  BounceSender: string;
  Explanation?: string;
  MessageDsn?: MessageDsn;
  BouncedRecipientInfoList: BouncedRecipientInfo[];
  BounceSenderArn?: string;
}
export interface SendBounceResponse {
  MessageId?: string;
}
export type MessageTagName = string;
export type MessageTagValue = string;
export interface MessageTag {
  Name: string;
  Value: string;
}
export type MessageTagList = MessageTag[];
export type TemplateData = string;
export interface Destination {
  ToAddresses?: string[];
  CcAddresses?: string[];
  BccAddresses?: string[];
}
export interface BulkEmailDestination {
  Destination: Destination;
  ReplacementTags?: MessageTag[];
  ReplacementTemplateData?: string;
}
export type BulkEmailDestinationList = BulkEmailDestination[];
export interface SendBulkTemplatedEmailRequest {
  Source: string;
  SourceArn?: string;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  ReturnPathArn?: string;
  ConfigurationSetName?: string;
  DefaultTags?: MessageTag[];
  Template: string;
  TemplateArn?: string;
  DefaultTemplateData: string;
  Destinations: BulkEmailDestination[];
}
export type BulkEmailStatus =
  | "Success"
  | "MessageRejected"
  | "MailFromDomainNotVerified"
  | "ConfigurationSetDoesNotExist"
  | "TemplateDoesNotExist"
  | "AccountSuspended"
  | "AccountThrottled"
  | "AccountDailyQuotaExceeded"
  | "InvalidSendingPoolName"
  | "AccountSendingPaused"
  | "ConfigurationSetSendingPaused"
  | "InvalidParameterValue"
  | "TransientFailure"
  | "Failed"
  | (string & {});
export interface BulkEmailDestinationStatus {
  Status?: BulkEmailStatus;
  Error?: string;
  MessageId?: string;
}
export type BulkEmailDestinationStatusList = BulkEmailDestinationStatus[];
export interface SendBulkTemplatedEmailResponse {
  Status: BulkEmailDestinationStatus[];
}
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string;
  TemplateName: string;
  ConfigurationSetName?: string;
}
export interface SendCustomVerificationEmailResponse {
  MessageId?: string;
}
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
export interface SendEmailRequest {
  Source: string;
  Destination: Destination;
  Message: Message;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
}
export interface SendEmailResponse {
  MessageId: string;
}
export type RawMessageData = Uint8Array;
export interface RawMessage {
  Data: Uint8Array;
}
export interface SendRawEmailRequest {
  Source?: string;
  Destinations?: string[];
  RawMessage: RawMessage;
  FromArn?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
}
export interface SendRawEmailResponse {
  MessageId: string;
}
export interface SendTemplatedEmailRequest {
  Source: string;
  Destination: Destination;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
  Template: string;
  TemplateArn?: string;
  TemplateData: string;
}
export interface SendTemplatedEmailResponse {
  MessageId: string;
}
export interface SetActiveReceiptRuleSetRequest {
  RuleSetName?: string;
}
export interface SetActiveReceiptRuleSetResponse {}
export interface SetIdentityDkimEnabledRequest {
  Identity: string;
  DkimEnabled: boolean;
}
export interface SetIdentityDkimEnabledResponse {}
export interface SetIdentityFeedbackForwardingEnabledRequest {
  Identity: string;
  ForwardingEnabled: boolean;
}
export interface SetIdentityFeedbackForwardingEnabledResponse {}
export type NotificationType =
  | "Bounce"
  | "Complaint"
  | "Delivery"
  | (string & {});
export interface SetIdentityHeadersInNotificationsEnabledRequest {
  Identity: string;
  NotificationType: NotificationType;
  Enabled: boolean;
}
export interface SetIdentityHeadersInNotificationsEnabledResponse {}
export interface SetIdentityMailFromDomainRequest {
  Identity: string;
  MailFromDomain?: string;
  BehaviorOnMXFailure?: BehaviorOnMXFailure;
}
export interface SetIdentityMailFromDomainResponse {}
export interface SetIdentityNotificationTopicRequest {
  Identity: string;
  NotificationType: NotificationType;
  SnsTopic?: string;
}
export interface SetIdentityNotificationTopicResponse {}
export interface SetReceiptRulePositionRequest {
  RuleSetName: string;
  RuleName: string;
  After?: string;
}
export interface SetReceiptRulePositionResponse {}
export interface TestRenderTemplateRequest {
  TemplateName: string;
  TemplateData: string;
}
export type RenderedTemplate = string;
export interface TestRenderTemplateResponse {
  RenderedTemplate?: string;
}
export interface UpdateAccountSendingEnabledRequest {
  Enabled?: boolean;
}
export interface UpdateAccountSendingEnabledResponse {}
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination: EventDestination;
}
export interface UpdateConfigurationSetEventDestinationResponse {}
export interface UpdateConfigurationSetReputationMetricsEnabledRequest {
  ConfigurationSetName: string;
  Enabled: boolean;
}
export interface UpdateConfigurationSetReputationMetricsEnabledResponse {}
export interface UpdateConfigurationSetSendingEnabledRequest {
  ConfigurationSetName: string;
  Enabled: boolean;
}
export interface UpdateConfigurationSetSendingEnabledResponse {}
export interface UpdateConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  TrackingOptions: TrackingOptions;
}
export interface UpdateConfigurationSetTrackingOptionsResponse {}
export interface UpdateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  TemplateContent?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export interface UpdateCustomVerificationEmailTemplateResponse {}
export interface UpdateReceiptRuleRequest {
  RuleSetName: string;
  Rule: ReceiptRule;
}
export interface UpdateReceiptRuleResponse {}
export interface UpdateTemplateRequest {
  Template: Template;
}
export interface UpdateTemplateResponse {}
export type Domain = string;
export interface VerifyDomainDkimRequest {
  Domain: string;
}
export interface VerifyDomainDkimResponse {
  DkimTokens: string[];
}
export interface VerifyDomainIdentityRequest {
  Domain: string;
}
export interface VerifyDomainIdentityResponse {
  VerificationToken: string;
}
export interface VerifyEmailAddressRequest {
  EmailAddress: string;
}
export interface VerifyEmailAddressResponse {}
export interface VerifyEmailIdentityRequest {
  EmailAddress: string;
}
export interface VerifyEmailIdentityResponse {}
export type RuleOrRuleSetName = string;
export type ErrorMessage = string;
export type CloneReceiptRuleSetError =
  | AlreadyExistsException
  | LimitExceededException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Creates a receipt rule set by cloning an existing one. All receipt rules and
 * configurations are copied to the new receipt rule set and are completely independent of
 * the source rule set.
 *
 * For information about setting up rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const cloneReceiptRuleSet: API.OperationMethod<
  CloneReceiptRuleSetRequest,
  CloneReceiptRuleSetResponse,
  CloneReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleSetName: 0, OriginalRuleSetName: 0 },
  },
  errors: [
    AlreadyExistsException,
    LimitExceededException,
    RuleSetDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloneReceiptRuleSet",
})) as any;

export type CreateConfigurationSetError =
  | ConfigurationSetAlreadyExistsException
  | InvalidConfigurationSetException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a configuration set.
 *
 * Configuration sets enable you to publish email sending events. For information about
 * using configuration sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ConfigurationSet: { Name: 0 } } },
  errors: [
    ConfigurationSetAlreadyExistsException,
    InvalidConfigurationSetException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
})) as any;

export type CreateConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationAlreadyExistsException
  | InvalidCloudWatchDestinationException
  | InvalidFirehoseDestinationException
  | InvalidSNSDestinationException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a configuration set event destination.
 *
 * When you create or update an event destination, you must provide one, and only
 * one, destination. The destination can be CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS).
 *
 * An event destination is the Amazon Web Services service to which Amazon SES publishes the email sending
 * events associated with a configuration set. For information about using configuration
 * sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createConfigurationSetEventDestination: API.OperationMethod<
  CreateConfigurationSetEventDestinationRequest,
  CreateConfigurationSetEventDestinationResponse,
  CreateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, EventDestination: i_EventDestination },
  },
  errors: [
    ConfigurationSetDoesNotExistException,
    EventDestinationAlreadyExistsException,
    InvalidCloudWatchDestinationException,
    InvalidFirehoseDestinationException,
    InvalidSNSDestinationException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetEventDestination",
})) as any;

export type CreateConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidTrackingOptionsException
  | TrackingOptionsAlreadyExistsException
  | CommonErrors;
/**
 * Creates an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 */
export const createConfigurationSetTrackingOptions: API.OperationMethod<
  CreateConfigurationSetTrackingOptionsRequest,
  CreateConfigurationSetTrackingOptionsResponse,
  CreateConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, TrackingOptions: i_TrackingOptions },
  },
  errors: [
    ConfigurationSetDoesNotExistException,
    InvalidTrackingOptionsException,
    TrackingOptionsAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetTrackingOptions",
})) as any;

export type CreateCustomVerificationEmailTemplateError =
  | CustomVerificationEmailInvalidContentException
  | CustomVerificationEmailTemplateAlreadyExistsException
  | FromEmailAddressNotVerifiedException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
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
    input: {
      TemplateName: 0,
      FromEmailAddress: 0,
      TemplateSubject: 0,
      TemplateContent: 0,
      SuccessRedirectionURL: 0,
      FailureRedirectionURL: 0,
    },
  },
  errors: [
    CustomVerificationEmailInvalidContentException,
    CustomVerificationEmailTemplateAlreadyExistsException,
    FromEmailAddressNotVerifiedException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomVerificationEmailTemplate",
})) as any;

export type CreateReceiptFilterError =
  | AlreadyExistsException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new IP address filter.
 *
 * For information about setting up IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptFilter: API.OperationMethod<
  CreateReceiptFilterRequest,
  CreateReceiptFilterResponse,
  CreateReceiptFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Filter: { Name: 0, IpFilter: { Policy: 0, Cidr: 0 } } },
  },
  errors: [AlreadyExistsException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptFilter",
})) as any;

export type CreateReceiptRuleError =
  | AlreadyExistsException
  | InvalidLambdaFunctionException
  | InvalidS3ConfigurationException
  | InvalidSnsTopicException
  | LimitExceededException
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | InvalidParameterValue
  | IdentityNotVerified
  | CommonErrors;
/**
 * Creates a receipt rule.
 *
 * For information about setting up receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptRule: API.OperationMethod<
  CreateReceiptRuleRequest,
  CreateReceiptRuleResponse,
  CreateReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleSetName: 0, After: 0, Rule: i_ReceiptRule },
  },
  errors: [
    AlreadyExistsException,
    InvalidLambdaFunctionException,
    InvalidS3ConfigurationException,
    InvalidSnsTopicException,
    LimitExceededException,
    RuleDoesNotExistException,
    RuleSetDoesNotExistException,
    InvalidParameterValue,
    IdentityNotVerified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptRule",
})) as any;

export type CreateReceiptRuleSetError =
  | AlreadyExistsException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an empty receipt rule set.
 *
 * For information about setting up receipt rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptRuleSet: API.OperationMethod<
  CreateReceiptRuleSetRequest,
  CreateReceiptRuleSetResponse,
  CreateReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleSetName: 0 } },
  errors: [AlreadyExistsException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptRuleSet",
})) as any;

export type CreateTemplateError =
  | AlreadyExistsException
  | InvalidTemplateException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single operation. For more information, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateRequest,
  CreateTemplateResponse,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Template: i_Template } },
  errors: [
    AlreadyExistsException,
    InvalidTemplateException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTemplate",
})) as any;

export type DeleteConfigurationSetError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Deletes a configuration set. Configuration sets enable you to publish email sending
 * events. For information about using configuration sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ConfigurationSetName: 0 } },
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
})) as any;

export type DeleteConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationDoesNotExistException
  | CommonErrors;
/**
 * Deletes a configuration set event destination. Configuration set event destinations
 * are associated with configuration sets, which enable you to publish email sending
 * events. For information about using configuration sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, EventDestinationName: 0 },
  },
  errors: [
    ConfigurationSetDoesNotExistException,
    EventDestinationDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
})) as any;

export type DeleteConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | TrackingOptionsDoesNotExistException
  | CommonErrors;
/**
 * Deletes an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 *
 * Deleting this kind of association results in emails sent using the specified
 * configuration set to capture open and click events using the standard,
 * Amazon SES-operated domains.
 */
export const deleteConfigurationSetTrackingOptions: API.OperationMethod<
  DeleteConfigurationSetTrackingOptionsRequest,
  DeleteConfigurationSetTrackingOptionsResponse,
  DeleteConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ConfigurationSetName: 0 } },
  errors: [
    ConfigurationSetDoesNotExistException,
    TrackingOptionsDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetTrackingOptions",
})) as any;

export type DeleteCustomVerificationEmailTemplateError = CommonErrors;
/**
 * Deletes an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
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
  descriptor: { service: svc, input: { TemplateName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomVerificationEmailTemplate",
})) as any;

export type DeleteIdentityError = CommonErrors;
/**
 * Deletes the specified identity (an email address or a domain) from the list of
 * verified identities.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteIdentity: API.OperationMethod<
  DeleteIdentityRequest,
  DeleteIdentityResponse,
  DeleteIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identity: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentity",
})) as any;

export type DeleteIdentityPolicyError = CommonErrors;
/**
 * Deletes the specified sending authorization policy for the given identity (an email
 * address or a domain). This operation returns successfully even if a policy with the
 * specified name does not exist.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteIdentityPolicy: API.OperationMethod<
  DeleteIdentityPolicyRequest,
  DeleteIdentityPolicyResponse,
  DeleteIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identity: 0, PolicyName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityPolicy",
})) as any;

export type DeleteReceiptFilterError = CommonErrors;
/**
 * Deletes the specified IP address filter.
 *
 * For information about managing IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptFilter: API.OperationMethod<
  DeleteReceiptFilterRequest,
  DeleteReceiptFilterResponse,
  DeleteReceiptFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FilterName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptFilter",
})) as any;

export type DeleteReceiptRuleError =
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Deletes the specified receipt rule.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptRule: API.OperationMethod<
  DeleteReceiptRuleRequest,
  DeleteReceiptRuleResponse,
  DeleteReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleSetName: 0, RuleName: 0 } },
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptRule",
})) as any;

export type DeleteReceiptRuleSetError = CannotDeleteException | CommonErrors;
/**
 * Deletes the specified receipt rule set and all of the receipt rules it
 * contains.
 *
 * The currently active rule set cannot be deleted.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptRuleSet: API.OperationMethod<
  DeleteReceiptRuleSetRequest,
  DeleteReceiptRuleSetResponse,
  DeleteReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleSetName: 0 } },
  errors: [CannotDeleteException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptRuleSet",
})) as any;

export type DeleteTemplateError = CommonErrors;
/**
 * Deletes an email template.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteTemplate: API.OperationMethod<
  DeleteTemplateRequest,
  DeleteTemplateResponse,
  DeleteTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TemplateName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTemplate",
})) as any;

export type DeleteVerifiedEmailAddressError = CommonErrors;
/**
 * Deprecated. Use the `DeleteIdentity` operation to delete email addresses
 * and domains.
 */
export const deleteVerifiedEmailAddress: API.OperationMethod<
  DeleteVerifiedEmailAddressRequest,
  DeleteVerifiedEmailAddressResponse,
  DeleteVerifiedEmailAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EmailAddress: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVerifiedEmailAddress",
})) as any;

export type DescribeActiveReceiptRuleSetError = CommonErrors;
/**
 * Returns the metadata and receipt rules for the receipt rule set that is currently
 * active.
 *
 * For information about setting up receipt rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeActiveReceiptRuleSet: API.OperationMethod<
  DescribeActiveReceiptRuleSetRequest,
  DescribeActiveReceiptRuleSetResponse,
  DescribeActiveReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: {
      Metadata: o_ReceiptRuleSetMetadata,
      Rules: D.list(o_ReceiptRule),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActiveReceiptRuleSet",
})) as any;

export type DescribeConfigurationSetError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Returns the details of the specified configuration set. For information about using
 * configuration sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeConfigurationSet: API.OperationMethod<
  DescribeConfigurationSetRequest,
  DescribeConfigurationSetResponse,
  DescribeConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, ConfigurationSetAttributeNames: 0 },
    output: {
      ConfigurationSet: {},
      EventDestinations: D.list({
        Enabled: D.bool,
        MatchingEventTypes: D.list(),
        KinesisFirehoseDestination: {},
        CloudWatchDestination: { DimensionConfigurations: D.list({}) },
        SNSDestination: {},
      }),
      TrackingOptions: {},
      DeliveryOptions: {},
      ReputationOptions: {
        SendingEnabled: D.bool,
        ReputationMetricsEnabled: D.bool,
        LastFreshStart: D.ts,
      },
    },
  },
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationSet",
})) as any;

export type DescribeReceiptRuleError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Returns the details of the specified receipt rule.
 *
 * For information about setting up receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeReceiptRule: API.OperationMethod<
  DescribeReceiptRuleRequest,
  DescribeReceiptRuleResponse,
  DescribeReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleSetName: 0, RuleName: 0 },
    output: { Rule: o_ReceiptRule },
  },
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReceiptRule",
})) as any;

export type DescribeReceiptRuleSetError =
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Returns the details of the specified receipt rule set.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeReceiptRuleSet: API.OperationMethod<
  DescribeReceiptRuleSetRequest,
  DescribeReceiptRuleSetResponse,
  DescribeReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleSetName: 0 },
    output: {
      Metadata: o_ReceiptRuleSetMetadata,
      Rules: D.list(o_ReceiptRule),
    },
  },
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReceiptRuleSet",
})) as any;

export type GetAccountSendingEnabledError = CommonErrors;
/**
 * Returns the email sending status of the Amazon SES account for the current Region.
 *
 * You can execute this operation no more than once per second.
 */
export const getAccountSendingEnabled: API.OperationMethod<
  GetAccountSendingEnabledRequest,
  GetAccountSendingEnabledResponse,
  GetAccountSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { Enabled: D.bool } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSendingEnabled",
})) as any;

export type GetCustomVerificationEmailTemplateError =
  | CustomVerificationEmailTemplateDoesNotExistException
  | CommonErrors;
/**
 * Returns the custom email verification template for the template name you
 * specify.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
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
  descriptor: { service: svc, input: { TemplateName: 0 } },
  errors: [CustomVerificationEmailTemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomVerificationEmailTemplate",
})) as any;

export type GetIdentityDkimAttributesError = CommonErrors;
/**
 * Returns the current status of Easy DKIM signing for an entity. For domain name
 * identities, this operation also returns the DKIM tokens that are required for Easy DKIM
 * signing, and whether Amazon SES has successfully verified that these tokens have been
 * published.
 *
 * This operation takes a list of identities as input and returns the following
 * information for each:
 *
 * - Whether Easy DKIM signing is enabled or disabled.
 *
 * - A set of DKIM tokens that represent the identity. If the identity is an email
 * address, the tokens represent the domain of that address.
 *
 * - Whether Amazon SES has successfully verified the DKIM tokens published in the
 * domain's DNS. This information is only returned for domain name identities, not
 * for email addresses.
 *
 * This operation is throttled at one request per second and can only get DKIM attributes
 * for up to 100 identities at a time.
 *
 * For more information about creating DNS records using DKIM tokens, go to the Amazon SES
 * Developer Guide.
 */
export const getIdentityDkimAttributes: API.OperationMethod<
  GetIdentityDkimAttributesRequest,
  GetIdentityDkimAttributesResponse,
  GetIdentityDkimAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identities: 0 },
    output: {
      DkimAttributes: D.map({ DkimEnabled: D.bool, DkimTokens: D.list() }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityDkimAttributes",
})) as any;

export type GetIdentityMailFromDomainAttributesError = CommonErrors;
/**
 * Returns the custom MAIL FROM attributes for a list of identities (email addresses :
 * domains).
 *
 * This operation is throttled at one request per second and can only get custom MAIL
 * FROM attributes for up to 100 identities at a time.
 */
export const getIdentityMailFromDomainAttributes: API.OperationMethod<
  GetIdentityMailFromDomainAttributesRequest,
  GetIdentityMailFromDomainAttributesResponse,
  GetIdentityMailFromDomainAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identities: 0 },
    output: { MailFromDomainAttributes: D.map({}) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityMailFromDomainAttributes",
})) as any;

export type GetIdentityNotificationAttributesError = CommonErrors;
/**
 * Given a list of verified identities (email addresses and/or domains), returns a
 * structure describing identity notification attributes.
 *
 * This operation is throttled at one request per second and can only get notification
 * attributes for up to 100 identities at a time.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const getIdentityNotificationAttributes: API.OperationMethod<
  GetIdentityNotificationAttributesRequest,
  GetIdentityNotificationAttributesResponse,
  GetIdentityNotificationAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identities: 0 },
    output: {
      NotificationAttributes: D.map({
        ForwardingEnabled: D.bool,
        HeadersInBounceNotificationsEnabled: D.bool,
        HeadersInComplaintNotificationsEnabled: D.bool,
        HeadersInDeliveryNotificationsEnabled: D.bool,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityNotificationAttributes",
})) as any;

export type GetIdentityPoliciesError = CommonErrors;
/**
 * Returns the requested sending authorization policies for the given identity (an email
 * address or a domain). The policies are returned as a map of policy names to policy
 * contents. You can retrieve a maximum of 20 policies at a time.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getIdentityPolicies: API.OperationMethod<
  GetIdentityPoliciesRequest,
  GetIdentityPoliciesResponse,
  GetIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identity: 0, PolicyNames: 0 },
    output: { Policies: D.map() },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityPolicies",
})) as any;

export type GetIdentityVerificationAttributesError = CommonErrors;
/**
 * Given a list of identities (email addresses and/or domains), returns the verification
 * status and (for domain identities) the verification token for each identity.
 *
 * The verification status of an email address is "Pending" until the email address owner
 * clicks the link within the verification email that Amazon SES sent to that address. If the
 * email address owner clicks the link within 24 hours, the verification status of the
 * email address changes to "Success". If the link is not clicked within 24 hours, the
 * verification status changes to "Failed." In that case, to verify the email address, you
 * must restart the verification process from the beginning.
 *
 * For domain identities, the domain's verification status is "Pending" as Amazon SES searches
 * for the required TXT record in the DNS settings of the domain. When Amazon SES detects the
 * record, the domain's verification status changes to "Success". If Amazon SES is unable to
 * detect the record within 72 hours, the domain's verification status changes to "Failed."
 * In that case, to verify the domain, you must restart the verification process from the
 * beginning.
 *
 * This operation is throttled at one request per second and can only get verification
 * attributes for up to 100 identities at a time.
 */
export const getIdentityVerificationAttributes: API.OperationMethod<
  GetIdentityVerificationAttributesRequest,
  GetIdentityVerificationAttributesResponse,
  GetIdentityVerificationAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identities: 0 },
    output: { VerificationAttributes: D.map({}) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityVerificationAttributes",
})) as any;

export type GetSendQuotaError = CommonErrors;
/**
 * Provides the sending limits for the Amazon SES account.
 *
 * You can execute this operation no more than once per second.
 */
export const getSendQuota: API.OperationMethod<
  GetSendQuotaRequest,
  GetSendQuotaResponse,
  GetSendQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: {
      Max24HourSend: D.num,
      MaxSendRate: D.num,
      SentLast24Hours: D.num,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSendQuota",
})) as any;

export type GetSendStatisticsError = CommonErrors;
/**
 * Provides sending statistics for the current Amazon Web Services Region. The result is a list of data
 * points, representing the last two weeks of sending activity. Each data point in the list
 * contains statistics for a 15-minute period of time.
 *
 * You can execute this operation no more than once per second.
 */
export const getSendStatistics: API.OperationMethod<
  GetSendStatisticsRequest,
  GetSendStatisticsResponse,
  GetSendStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: {
      SendDataPoints: D.list({
        Timestamp: D.ts,
        DeliveryAttempts: D.num,
        Bounces: D.num,
        Complaints: D.num,
        Rejects: D.num,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSendStatistics",
})) as any;

export type GetTemplateError = TemplateDoesNotExistException | CommonErrors;
/**
 * Displays the template object (which includes the Subject line, HTML part and text
 * part) for the template you specify.
 *
 * You can execute this operation no more than once per second.
 */
export const getTemplate: API.OperationMethod<
  GetTemplateRequest,
  GetTemplateResponse,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TemplateName: 0 },
    output: { Template: {} },
  },
  errors: [TemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
})) as any;

export type ListConfigurationSetsError = CommonErrors;
/**
 * Provides a list of the configuration sets associated with your Amazon SES account in the
 * current Amazon Web Services Region. For information about using configuration sets, see Monitoring
 * Your Amazon SES Sending Activity in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second. This operation returns up
 * to 1,000 configuration sets each time it is run. If your Amazon SES account has more than
 * 1,000 configuration sets, this operation also returns `NextToken`. You can
 * then execute the `ListConfigurationSets` operation again, passing the
 * `NextToken` parameter and the value of the NextToken element to retrieve
 * additional results.
 */
export const listConfigurationSets: API.OperationMethod<
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxItems: 0 },
    output: { ConfigurationSets: D.list({}) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
})) as any;

export type ListCustomVerificationEmailTemplatesError = CommonErrors;
/**
 * Lists the existing custom verification email templates for your account in the current
 * Amazon Web Services Region.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
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
    input: { NextToken: 0, MaxResults: 0 },
    output: { CustomVerificationEmailTemplates: D.list({}) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomVerificationEmailTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIdentitiesError = CommonErrors;
/**
 * Returns a list containing all of the identities (email addresses and domains) for your
 * Amazon Web Services account in the current Amazon Web Services Region, regardless of verification status.
 *
 * You can execute this operation no more than once per second.
 *
 * It's recommended that for successive pagination calls of this API, you continue to
 * the use the same parameter/value pairs as used in the original call, e.g., if you
 * used `IdentityType=Domain` in the the original call and received a
 * `NextToken` in the response, you should continue providing the
 * `IdentityType=Domain` parameter for further `NextToken`
 * calls; however, if you didn't provide the `IdentityType` parameter in the
 * original call, then continue to not provide it for successive pagination calls.
 * Using this protocol will ensure consistent results.
 */
export const listIdentities: API.PaginatedOperationMethod<
  ListIdentitiesRequest,
  ListIdentitiesResponse,
  ListIdentitiesError,
  Credentials | HttpClient.HttpClient,
  Identity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { IdentityType: 0, NextToken: 0, MaxItems: 0 },
    output: { Identities: D.list() },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Identities",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListIdentityPoliciesError = CommonErrors;
/**
 * Returns a list of sending authorization policies that are attached to the given
 * identity (an email address or a domain). This operation returns only a list. To get the
 * actual policy content, use `GetIdentityPolicies`.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listIdentityPolicies: API.OperationMethod<
  ListIdentityPoliciesRequest,
  ListIdentityPoliciesResponse,
  ListIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identity: 0 },
    output: { PolicyNames: D.list() },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityPolicies",
})) as any;

export type ListReceiptFiltersError = CommonErrors;
/**
 * Lists the IP address filters associated with your Amazon Web Services account in the current
 * Amazon Web Services Region.
 *
 * For information about managing IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listReceiptFilters: API.OperationMethod<
  ListReceiptFiltersRequest,
  ListReceiptFiltersResponse,
  ListReceiptFiltersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { Filters: D.list({ IpFilter: {} }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceiptFilters",
})) as any;

export type ListReceiptRuleSetsError = CommonErrors;
/**
 * Lists the receipt rule sets that exist under your Amazon Web Services account in the current
 * Amazon Web Services Region. If there are additional receipt rule sets to be retrieved, you receive a
 * `NextToken` that you can provide to the next call to
 * `ListReceiptRuleSets` to retrieve the additional entries.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listReceiptRuleSets: API.OperationMethod<
  ListReceiptRuleSetsRequest,
  ListReceiptRuleSetsResponse,
  ListReceiptRuleSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0 },
    output: { RuleSets: D.list(o_ReceiptRuleSetMetadata) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceiptRuleSets",
})) as any;

export type ListTemplatesError = CommonErrors;
/**
 * Lists the email templates present in your Amazon SES account in the current
 * Amazon Web Services Region.
 *
 * You can execute this operation no more than once per second.
 */
export const listTemplates: API.OperationMethod<
  ListTemplatesRequest,
  ListTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxItems: 0 },
    output: { TemplatesMetadata: D.list({ CreatedTimestamp: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
})) as any;

export type ListVerifiedEmailAddressesError = CommonErrors;
/**
 * Deprecated. Use the `ListIdentities` operation to list the email addresses
 * and domains associated with your account.
 */
export const listVerifiedEmailAddresses: API.OperationMethod<
  ListVerifiedEmailAddressesRequest,
  ListVerifiedEmailAddressesResponse,
  ListVerifiedEmailAddressesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { VerifiedEmailAddresses: D.list() } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVerifiedEmailAddresses",
})) as any;

export type PutConfigurationSetDeliveryOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidDeliveryOptionsException
  | CommonErrors;
/**
 * Adds or updates the delivery options for a configuration set.
 */
export const putConfigurationSetDeliveryOptions: API.OperationMethod<
  PutConfigurationSetDeliveryOptionsRequest,
  PutConfigurationSetDeliveryOptionsResponse,
  PutConfigurationSetDeliveryOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, DeliveryOptions: { TlsPolicy: 0 } },
  },
  errors: [
    ConfigurationSetDoesNotExistException,
    InvalidDeliveryOptionsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetDeliveryOptions",
})) as any;

export type PutIdentityPolicyError = InvalidPolicyException | CommonErrors;
/**
 * Adds or updates a sending authorization policy for the specified identity (an email
 * address or a domain).
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const putIdentityPolicy: API.OperationMethod<
  PutIdentityPolicyRequest,
  PutIdentityPolicyResponse,
  PutIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identity: 0, PolicyName: 0, Policy: 0 },
  },
  errors: [InvalidPolicyException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIdentityPolicy",
})) as any;

export type ReorderReceiptRuleSetError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Reorders the receipt rules within a receipt rule set.
 *
 * All of the rules in the rule set must be represented in this request. That is, it
 * is error if the reorder request doesn't explicitly position all of the rules.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const reorderReceiptRuleSet: API.OperationMethod<
  ReorderReceiptRuleSetRequest,
  ReorderReceiptRuleSetResponse,
  ReorderReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleSetName: 0, RuleNames: 0 } },
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReorderReceiptRuleSet",
})) as any;

export type SendBounceError = MessageRejected | CommonErrors;
/**
 * Generates and sends a bounce message to the sender of an email you received through
 * Amazon SES. You can only use this operation on an email up to 24 hours after you receive
 * it.
 *
 * You cannot use this operation to send generic bounces for mail that was not
 * received by Amazon SES.
 *
 * For information about receiving email through Amazon SES, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const sendBounce: API.OperationMethod<
  SendBounceRequest,
  SendBounceResponse,
  SendBounceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OriginalMessageId: 0,
      BounceSender: 0,
      Explanation: 0,
      MessageDsn: {
        ReportingMta: 0,
        ArrivalDate: 0,
        ExtensionFields: D.list(i_ExtensionField),
      },
      BouncedRecipientInfoList: D.list({
        Recipient: 0,
        RecipientArn: 0,
        BounceType: 0,
        RecipientDsnFields: {
          FinalRecipient: 0,
          Action: 0,
          RemoteMta: 0,
          Status: 0,
          DiagnosticCode: 0,
          LastAttemptDate: 0,
          ExtensionFields: D.list(i_ExtensionField),
        },
      }),
      BounceSenderArn: 0,
    },
  },
  errors: [MessageRejected],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBounce",
})) as any;

export type SendBulkTemplatedEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Composes an email message to multiple destinations. The message body is created using
 * an email template.
 *
 * To send email using this operation, your call must meet the following
 * requirements:
 *
 * - The call must refer to an existing email template. You can create email
 * templates using CreateTemplate.
 *
 * - The message must be sent from a verified email address or domain.
 *
 * - If your account is still in the Amazon SES sandbox, you may send only to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - Each `Destination` parameter must include at least one recipient
 * email address. The recipient address can be a To: address, a CC: address, or a
 * BCC: address. If a recipient email address is invalid (that is, it is not in the
 * format *UserName@[SubDomain.]Domain.TopLevelDomain*), the
 * entire message is rejected, even if the message contains other recipients that
 * are valid.
 *
 * - The message may not include more than 50 recipients, across the To:, CC: and
 * BCC: fields. If you need to send an email message to a larger audience, you can
 * divide your recipient list into groups of 50 or fewer, and then call the
 * `SendBulkTemplatedEmail` operation several times to send the
 * message to each group.
 *
 * - The number of destinations you can contact in a single call can be limited by
 * your account's maximum sending rate.
 */
export const sendBulkTemplatedEmail: API.OperationMethod<
  SendBulkTemplatedEmailRequest,
  SendBulkTemplatedEmailResponse,
  SendBulkTemplatedEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Source: 0,
      SourceArn: 0,
      ReplyToAddresses: 0,
      ReturnPath: 0,
      ReturnPathArn: 0,
      ConfigurationSetName: 0,
      DefaultTags: D.list(i_MessageTag),
      Template: 0,
      TemplateArn: 0,
      DefaultTemplateData: 0,
      Destinations: D.list({
        Destination: i_Destination,
        ReplacementTags: D.list(i_MessageTag),
        ReplacementTemplateData: 0,
      }),
    },
    output: { Status: D.list({}) },
  },
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBulkTemplatedEmail",
})) as any;

export type SendCustomVerificationEmailError =
  | ConfigurationSetDoesNotExistException
  | CustomVerificationEmailTemplateDoesNotExistException
  | FromEmailAddressNotVerifiedException
  | MessageRejected
  | ProductionAccessNotGrantedException
  | CommonErrors;
/**
 * Adds an email address to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. As a result of executing this operation, a
 * customized verification email is sent to the specified address.
 *
 * To use this operation, you must first create a custom verification email template. For
 * more information about creating and using custom verification email templates, see
 * Using
 * Custom Verification Email Templates in the Amazon SES Developer
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
    input: { EmailAddress: 0, TemplateName: 0, ConfigurationSetName: 0 },
  },
  errors: [
    ConfigurationSetDoesNotExistException,
    CustomVerificationEmailTemplateDoesNotExistException,
    FromEmailAddressNotVerifiedException,
    MessageRejected,
    ProductionAccessNotGrantedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendCustomVerificationEmail",
})) as any;

export type SendEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | CommonErrors;
/**
 * Composes an email message and immediately queues it for sending. To send email using
 * this operation, your message must meet the following requirements:
 *
 * - The message must be sent from a verified email address or domain. If you
 * attempt to send email using a non-verified address or domain, the operation
 * results in an "Email address not verified" error.
 *
 * - If your account is still in the Amazon SES sandbox, you may only send to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - The message must include at least one recipient email address. The recipient
 * address can be a To: address, a CC: address, or a BCC: address. If a recipient
 * email address is invalid (that is, it is not in the format
 * *UserName@[SubDomain.]Domain.TopLevelDomain*), the entire
 * message is rejected, even if the message contains other recipients that are
 * valid.
 *
 * - The message may not include more than 50 recipients, across the To:, CC: and
 * BCC: fields. If you need to send an email message to a larger audience, you can
 * divide your recipient list into groups of 50 or fewer, and then call the
 * `SendEmail` operation several times to send the message to each
 * group.
 *
 * For every message that you send, the total number of recipients (including each
 * recipient in the To:, CC: and BCC: fields) is counted against the maximum number of
 * emails you can send in a 24-hour period (your *sending quota*).
 * For more information about sending quotas in Amazon SES, see Managing Your Amazon SES Sending
 * Limits in the *Amazon SES Developer Guide.*
 */
export const sendEmail: API.OperationMethod<
  SendEmailRequest,
  SendEmailResponse,
  SendEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Source: 0,
      Destination: i_Destination,
      Message: {
        Subject: i_Content,
        Body: { Text: i_Content, Html: i_Content },
      },
      ReplyToAddresses: 0,
      ReturnPath: 0,
      SourceArn: 0,
      ReturnPathArn: 0,
      Tags: D.list(i_MessageTag),
      ConfigurationSetName: 0,
    },
  },
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEmail",
})) as any;

export type SendRawEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | CommonErrors;
/**
 * Composes an email message and immediately queues it for sending.
 *
 * This operation is more flexible than the `SendEmail` operation. When you
 * use the `SendRawEmail` operation, you can specify the headers of the message
 * as well as its content. This flexibility is useful, for example, when you need to send a
 * multipart MIME email (such a message that contains both a text and an HTML version). You
 * can also use this operation to send messages that include attachments.
 *
 * The `SendRawEmail` operation has the following requirements:
 *
 * - You can only send email from verified email addresses or domains. If you try to send email from
 * an address that isn't verified, the operation results in an "Email address not
 * verified" error.
 *
 * - If your account is still in the Amazon SES sandbox, you can only send email to other verified addresses
 * in your account, or to addresses that are associated with the Amazon SES mailbox simulator.
 *
 * - The maximum message size, including attachments, is 10 MB.
 *
 * - Each message has to include at least one recipient address. A recipient
 * address includes any address on the To:, CC:, or BCC: lines.
 *
 * - If you send a single message to more than one recipient address, and one of
 * the recipient addresses isn't in a valid format (that is, it's not in the format
 * *UserName@[SubDomain.]Domain.TopLevelDomain*), Amazon SES
 * rejects the entire message, even if the other addresses are valid.
 *
 * - Each message can include up to 50 recipient addresses across the To:, CC:, or
 * BCC: lines. If you need to send a single message to more than 50 recipients, you
 * have to split the list of recipient addresses into groups of less than 50
 * recipients, and send separate messages to each group.
 *
 * - Amazon SES allows you to specify 8-bit Content-Transfer-Encoding for MIME message
 * parts. However, if Amazon SES has to modify the contents of your message (for
 * example, if you use open and click tracking), 8-bit content isn't preserved. For
 * this reason, we highly recommend that you encode all content that isn't 7-bit
 * ASCII. For more information, see MIME Encoding in the Amazon SES Developer
 * Guide.
 *
 * Additionally, keep the following considerations in mind when using the
 * `SendRawEmail` operation:
 *
 * - Although you can customize the message headers when using the
 * `SendRawEmail` operation, Amazon SES automatically applies its own
 * `Message-ID` and `Date` headers; if you passed these
 * headers when creating the message, they are overwritten by the values that Amazon SES
 * provides.
 *
 * - If you are using sending authorization to send on behalf of another user,
 * `SendRawEmail` enables you to specify the cross-account identity
 * for the email's Source, From, and Return-Path parameters in one of two ways: you
 * can pass optional parameters `SourceArn`, `FromArn`,
 * and/or `ReturnPathArn`, or you can include the following X-headers in
 * the header of your raw email:
 *
 * - `X-SES-SOURCE-ARN`
 *
 * - `X-SES-FROM-ARN`
 *
 * - `X-SES-RETURN-PATH-ARN`
 *
 * Don't include these X-headers in the DKIM signature. Amazon SES removes these
 * before it sends the email.
 *
 * If you only specify the `SourceIdentityArn` parameter, Amazon SES sets
 * the From and Return-Path addresses to the same identity that you
 * specified.
 *
 * For more information about sending authorization, see the Using
 * Sending Authorization with Amazon SES in the Amazon SES Developer
 * Guide.
 *
 * - For every message that you send, the total number of recipients (including
 * each recipient in the To:, CC: and BCC: fields) is counted against the maximum
 * number of emails you can send in a 24-hour period (your sending
 * quota). For more information about sending quotas in Amazon SES, see
 * Managing Your Amazon SES Sending Limits in the Amazon SES Developer
 * Guide.
 */
export const sendRawEmail: API.OperationMethod<
  SendRawEmailRequest,
  SendRawEmailResponse,
  SendRawEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Source: 0,
      Destinations: 0,
      RawMessage: { Data: 0 },
      FromArn: 0,
      SourceArn: 0,
      ReturnPathArn: 0,
      Tags: D.list(i_MessageTag),
      ConfigurationSetName: 0,
    },
  },
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendRawEmail",
})) as any;

export type SendTemplatedEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Composes an email message using an email template and immediately queues it for
 * sending.
 *
 * To send email using this operation, your call must meet the following
 * requirements:
 *
 * - The call must refer to an existing email template. You can create email
 * templates using the CreateTemplate operation.
 *
 * - The message must be sent from a verified email address or domain.
 *
 * - If your account is still in the Amazon SES sandbox, you may only send to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - Calls to the `SendTemplatedEmail` operation may only include one
 * `Destination` parameter. A destination is a set of recipients
 * that receives the same version of the email. The `Destination`
 * parameter can include up to 50 recipients, across the To:, CC: and BCC:
 * fields.
 *
 * - The `Destination` parameter must include at least one recipient
 * email address. The recipient address can be a To: address, a CC: address, or a
 * BCC: address. If a recipient email address is invalid (that is, it is not in the
 * format *UserName@[SubDomain.]Domain.TopLevelDomain*), the
 * entire message is rejected, even if the message contains other recipients that
 * are valid.
 *
 * If your call to the `SendTemplatedEmail` operation includes all of the
 * required parameters, Amazon SES accepts it and returns a Message ID. However, if Amazon SES
 * can't render the email because the template contains errors, it doesn't send the
 * email. Additionally, because it already accepted the message, Amazon SES doesn't return a
 * message stating that it was unable to send the email.
 *
 * For these reasons, we highly recommend that you set up Amazon SES to send you
 * notifications when Rendering Failure events occur. For more information, see Sending Personalized Email Using the Amazon SES API in the
 * *Amazon Simple Email Service Developer Guide*.
 */
export const sendTemplatedEmail: API.OperationMethod<
  SendTemplatedEmailRequest,
  SendTemplatedEmailResponse,
  SendTemplatedEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Source: 0,
      Destination: i_Destination,
      ReplyToAddresses: 0,
      ReturnPath: 0,
      SourceArn: 0,
      ReturnPathArn: 0,
      Tags: D.list(i_MessageTag),
      ConfigurationSetName: 0,
      Template: 0,
      TemplateArn: 0,
      TemplateData: 0,
    },
  },
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendTemplatedEmail",
})) as any;

export type SetActiveReceiptRuleSetError =
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Sets the specified receipt rule set as the active receipt rule set.
 *
 * To disable your email-receiving through Amazon SES completely, you can call this
 * operation with `RuleSetName` set to null.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setActiveReceiptRuleSet: API.OperationMethod<
  SetActiveReceiptRuleSetRequest,
  SetActiveReceiptRuleSetResponse,
  SetActiveReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleSetName: 0 } },
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetActiveReceiptRuleSet",
})) as any;

export type SetIdentityDkimEnabledError = CommonErrors;
/**
 * Enables or disables Easy DKIM signing of email sent from an identity. If Easy DKIM
 * signing is enabled for a domain, then Amazon SES uses DKIM to sign all email that it sends
 * from addresses on that domain. If Easy DKIM signing is enabled for an email address,
 * then Amazon SES uses DKIM to sign all email it sends from that address.
 *
 * For email addresses (for example, `user@example.com`), you can only
 * enable DKIM signing if the corresponding domain (in this case,
 * `example.com`) has been set up to use Easy DKIM.
 *
 * You can enable DKIM signing for an identity at any time after you start the
 * verification process for the identity, even if the verification process isn't complete.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about Easy DKIM signing, go to the Amazon SES Developer
 * Guide.
 */
export const setIdentityDkimEnabled: API.OperationMethod<
  SetIdentityDkimEnabledRequest,
  SetIdentityDkimEnabledResponse,
  SetIdentityDkimEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identity: 0, DkimEnabled: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityDkimEnabled",
})) as any;

export type SetIdentityFeedbackForwardingEnabledError = CommonErrors;
/**
 * Given an identity (an email address or a domain), enables or disables whether Amazon SES
 * forwards bounce and complaint notifications as email. Feedback forwarding can only be
 * disabled when Amazon Simple Notification Service (Amazon SNS) topics are specified for both bounces and
 * complaints.
 *
 * Feedback forwarding does not apply to delivery notifications. Delivery
 * notifications are only available through Amazon SNS.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityFeedbackForwardingEnabled: API.OperationMethod<
  SetIdentityFeedbackForwardingEnabledRequest,
  SetIdentityFeedbackForwardingEnabledResponse,
  SetIdentityFeedbackForwardingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identity: 0, ForwardingEnabled: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityFeedbackForwardingEnabled",
})) as any;

export type SetIdentityHeadersInNotificationsEnabledError = CommonErrors;
/**
 * Given an identity (an email address or a domain), sets whether Amazon SES includes the
 * original email headers in the Amazon Simple Notification Service (Amazon SNS) notifications of a specified
 * type.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityHeadersInNotificationsEnabled: API.OperationMethod<
  SetIdentityHeadersInNotificationsEnabledRequest,
  SetIdentityHeadersInNotificationsEnabledResponse,
  SetIdentityHeadersInNotificationsEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identity: 0, NotificationType: 0, Enabled: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityHeadersInNotificationsEnabled",
})) as any;

export type SetIdentityMailFromDomainError = CommonErrors;
/**
 * Enables or disables the custom MAIL FROM domain setup for a verified identity (an
 * email address or a domain).
 *
 * To send emails using the specified MAIL FROM domain, you must add an MX record to
 * your MAIL FROM domain's DNS settings. To ensure that your emails pass Sender Policy
 * Framework (SPF) checks, you must also add or update an SPF record. For more
 * information, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setIdentityMailFromDomain: API.OperationMethod<
  SetIdentityMailFromDomainRequest,
  SetIdentityMailFromDomainResponse,
  SetIdentityMailFromDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identity: 0, MailFromDomain: 0, BehaviorOnMXFailure: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityMailFromDomain",
})) as any;

export type SetIdentityNotificationTopicError = CommonErrors;
/**
 * Sets an Amazon Simple Notification Service (Amazon SNS) topic to use when delivering notifications. When you use
 * this operation, you specify a verified identity, such as an email address or domain.
 * When you send an email that uses the chosen identity in the Source field, Amazon SES sends
 * notifications to the topic you specified. You can send bounce, complaint, or delivery
 * notifications (or any combination of the three) to the Amazon SNS topic that you
 * specify.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about feedback notification, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityNotificationTopic: API.OperationMethod<
  SetIdentityNotificationTopicRequest,
  SetIdentityNotificationTopicResponse,
  SetIdentityNotificationTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identity: 0, NotificationType: 0, SnsTopic: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityNotificationTopic",
})) as any;

export type SetReceiptRulePositionError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Sets the position of the specified receipt rule in the receipt rule set.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setReceiptRulePosition: API.OperationMethod<
  SetReceiptRulePositionRequest,
  SetReceiptRulePositionResponse,
  SetReceiptRulePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleSetName: 0, RuleName: 0, After: 0 },
  },
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetReceiptRulePosition",
})) as any;

export type TestRenderTemplateError =
  | InvalidRenderingParameterException
  | MissingRenderingAttributeException
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Creates a preview of the MIME content of an email when provided with a template and a
 * set of replacement data.
 *
 * You can execute this operation no more than once per second.
 */
export const testRenderTemplate: API.OperationMethod<
  TestRenderTemplateRequest,
  TestRenderTemplateResponse,
  TestRenderTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TemplateName: 0, TemplateData: 0 } },
  errors: [
    InvalidRenderingParameterException,
    MissingRenderingAttributeException,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestRenderTemplate",
})) as any;

export type UpdateAccountSendingEnabledError = CommonErrors;
/**
 * Enables or disables email sending across your entire Amazon SES account in the current
 * Amazon Web Services Region. You can use this operation in conjunction with Amazon CloudWatch alarms to
 * temporarily pause email sending across your Amazon SES account in a given Amazon Web Services Region when
 * reputation metrics (such as your bounce or complaint rates) reach certain
 * thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateAccountSendingEnabled: API.OperationMethod<
  UpdateAccountSendingEnabledRequest,
  UpdateAccountSendingEnabledResponse,
  UpdateAccountSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Enabled: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSendingEnabled",
})) as any;

export type UpdateConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationDoesNotExistException
  | InvalidCloudWatchDestinationException
  | InvalidFirehoseDestinationException
  | InvalidSNSDestinationException
  | CommonErrors;
/**
 * Updates the event destination of a configuration set. Event destinations are
 * associated with configuration sets, which enable you to publish email sending events to
 * Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS). For information about using configuration sets,
 * see Monitoring Your Amazon SES Sending Activity in the Amazon SES Developer
 * Guide.
 *
 * When you create or update an event destination, you must provide one, and only
 * one, destination. The destination can be Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service
 * (Amazon SNS).
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, EventDestination: i_EventDestination },
  },
  errors: [
    ConfigurationSetDoesNotExistException,
    EventDestinationDoesNotExistException,
    InvalidCloudWatchDestinationException,
    InvalidFirehoseDestinationException,
    InvalidSNSDestinationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
})) as any;

export type UpdateConfigurationSetReputationMetricsEnabledError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Enables or disables the publishing of reputation metrics for emails sent using a
 * specific configuration set in a given Amazon Web Services Region. Reputation metrics include bounce
 * and complaint rates. These metrics are published to Amazon CloudWatch. By using CloudWatch, you can
 * create alarms when bounce or complaint rates exceed certain thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetReputationMetricsEnabled: API.OperationMethod<
  UpdateConfigurationSetReputationMetricsEnabledRequest,
  UpdateConfigurationSetReputationMetricsEnabledResponse,
  UpdateConfigurationSetReputationMetricsEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ConfigurationSetName: 0, Enabled: 0 } },
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetReputationMetricsEnabled",
})) as any;

export type UpdateConfigurationSetSendingEnabledError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Enables or disables email sending for messages sent using a specific configuration set
 * in a given Amazon Web Services Region. You can use this operation in conjunction with Amazon CloudWatch alarms
 * to temporarily pause email sending for a configuration set when the reputation metrics
 * for that configuration set (such as your bounce on complaint rate) exceed certain
 * thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetSendingEnabled: API.OperationMethod<
  UpdateConfigurationSetSendingEnabledRequest,
  UpdateConfigurationSetSendingEnabledResponse,
  UpdateConfigurationSetSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ConfigurationSetName: 0, Enabled: 0 } },
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetSendingEnabled",
})) as any;

export type UpdateConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidTrackingOptionsException
  | TrackingOptionsDoesNotExistException
  | CommonErrors;
/**
 * Modifies an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 */
export const updateConfigurationSetTrackingOptions: API.OperationMethod<
  UpdateConfigurationSetTrackingOptionsRequest,
  UpdateConfigurationSetTrackingOptionsResponse,
  UpdateConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, TrackingOptions: i_TrackingOptions },
  },
  errors: [
    ConfigurationSetDoesNotExistException,
    InvalidTrackingOptionsException,
    TrackingOptionsDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetTrackingOptions",
})) as any;

export type UpdateCustomVerificationEmailTemplateError =
  | CustomVerificationEmailInvalidContentException
  | CustomVerificationEmailTemplateDoesNotExistException
  | FromEmailAddressNotVerifiedException
  | CommonErrors;
/**
 * Updates an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
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
    input: {
      TemplateName: 0,
      FromEmailAddress: 0,
      TemplateSubject: 0,
      TemplateContent: 0,
      SuccessRedirectionURL: 0,
      FailureRedirectionURL: 0,
    },
  },
  errors: [
    CustomVerificationEmailInvalidContentException,
    CustomVerificationEmailTemplateDoesNotExistException,
    FromEmailAddressNotVerifiedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomVerificationEmailTemplate",
})) as any;

export type UpdateReceiptRuleError =
  | InvalidLambdaFunctionException
  | InvalidS3ConfigurationException
  | InvalidSnsTopicException
  | LimitExceededException
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | InvalidParameterValue
  | IdentityNotVerified
  | CommonErrors;
/**
 * Updates a receipt rule.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateReceiptRule: API.OperationMethod<
  UpdateReceiptRuleRequest,
  UpdateReceiptRuleResponse,
  UpdateReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleSetName: 0, Rule: i_ReceiptRule } },
  errors: [
    InvalidLambdaFunctionException,
    InvalidS3ConfigurationException,
    InvalidSnsTopicException,
    LimitExceededException,
    RuleDoesNotExistException,
    RuleSetDoesNotExistException,
    InvalidParameterValue,
    IdentityNotVerified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReceiptRule",
})) as any;

export type UpdateTemplateError =
  | InvalidTemplateException
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Updates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single operation. For more information, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateTemplate: API.OperationMethod<
  UpdateTemplateRequest,
  UpdateTemplateResponse,
  UpdateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Template: i_Template } },
  errors: [InvalidTemplateException, TemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplate",
})) as any;

export type VerifyDomainDkimError = CommonErrors;
/**
 * Returns a set of DKIM tokens for a domain identity.
 *
 * When you execute the `VerifyDomainDkim` operation, the domain that you
 * specify is added to the list of identities that are associated with your account.
 * This is true even if you haven't already associated the domain with your account by
 * using the `VerifyDomainIdentity` operation. However, you can't send email
 * from the domain until you either successfully verify
 * it or you successfully set up DKIM for
 * it.
 *
 * You use the tokens that are generated by this operation to create CNAME records. When
 * Amazon SES detects that you've added these records to the DNS configuration for a domain, you
 * can start sending email from that domain. You can start sending email even if you
 * haven't added the TXT record provided by the VerifyDomainIdentity operation to the DNS
 * configuration for your domain. All email that you send from the domain is authenticated
 * using DKIM.
 *
 * To create the CNAME records for DKIM authentication, use the following values:
 *
 * - **Name**:
 * *token*._domainkey.*example.com*
 *
 * - **Type**: CNAME
 *
 * - **Value**:
 * *token*.dkim.amazonses.com
 *
 * In the preceding example, replace *token* with one of the tokens
 * that are generated when you execute this operation. Replace
 * *example.com* with your domain. Repeat this process for each
 * token that's generated by this operation.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyDomainDkim: API.OperationMethod<
  VerifyDomainDkimRequest,
  VerifyDomainDkimResponse,
  VerifyDomainDkimError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Domain: 0 },
    output: { DkimTokens: D.list() },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDomainDkim",
})) as any;

export type VerifyDomainIdentityError = CommonErrors;
/**
 * Adds a domain to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. For more information about verifying domains,
 * see Verifying Email Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyDomainIdentity: API.OperationMethod<
  VerifyDomainIdentityRequest,
  VerifyDomainIdentityResponse,
  VerifyDomainIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Domain: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDomainIdentity",
})) as any;

export type VerifyEmailAddressError = CommonErrors;
/**
 * Deprecated. Use the `VerifyEmailIdentity` operation to verify a new email
 * address.
 */
export const verifyEmailAddress: API.OperationMethod<
  VerifyEmailAddressRequest,
  VerifyEmailAddressResponse,
  VerifyEmailAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EmailAddress: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyEmailAddress",
})) as any;

export type VerifyEmailIdentityError = CommonErrors;
/**
 * Adds an email address to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. As a result of executing this operation, a
 * verification email is sent to the specified address.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyEmailIdentity: API.OperationMethod<
  VerifyEmailIdentityRequest,
  VerifyEmailIdentityResponse,
  VerifyEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EmailAddress: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyEmailIdentity",
})) as any;

const i_Content: D.LazyStruct = () => ({ Data: 0, Charset: 0 });
const i_Destination: D.LazyStruct = () => ({
  ToAddresses: 0,
  CcAddresses: 0,
  BccAddresses: 0,
});
const i_EventDestination: D.LazyStruct = () => ({
  Name: 0,
  Enabled: 0,
  MatchingEventTypes: 0,
  KinesisFirehoseDestination: { IAMRoleARN: 0, DeliveryStreamARN: 0 },
  CloudWatchDestination: {
    DimensionConfigurations: D.list({
      DimensionName: 0,
      DimensionValueSource: 0,
      DefaultDimensionValue: 0,
    }),
  },
  SNSDestination: { TopicARN: 0 },
});
const i_ExtensionField: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_MessageTag: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_ReceiptRule: D.LazyStruct = () => ({
  Name: 0,
  Enabled: 0,
  TlsPolicy: 0,
  Recipients: 0,
  Actions: D.list({
    S3Action: {
      TopicArn: 0,
      BucketName: 0,
      ObjectKeyPrefix: 0,
      KmsKeyArn: 0,
      IamRoleArn: 0,
    },
    BounceAction: {
      TopicArn: 0,
      SmtpReplyCode: 0,
      StatusCode: 0,
      Message: 0,
      Sender: 0,
    },
    WorkmailAction: { TopicArn: 0, OrganizationArn: 0 },
    LambdaAction: { TopicArn: 0, FunctionArn: 0, InvocationType: 0 },
    StopAction: { Scope: 0, TopicArn: 0 },
    AddHeaderAction: { HeaderName: 0, HeaderValue: 0 },
    SNSAction: { TopicArn: 0, Encoding: 0 },
    ConnectAction: { InstanceARN: 0, IAMRoleARN: 0 },
  }),
  ScanEnabled: 0,
});
const i_Template: D.LazyStruct = () => ({
  TemplateName: 0,
  SubjectPart: 0,
  TextPart: 0,
  HtmlPart: 0,
});
const i_TrackingOptions: D.LazyStruct = () => ({ CustomRedirectDomain: 0 });
const o_ReceiptRule: D.LazyStruct = () => ({
  Enabled: D.bool,
  Recipients: D.list(),
  Actions: D.list({
    S3Action: {},
    BounceAction: {},
    WorkmailAction: {},
    LambdaAction: {},
    StopAction: {},
    AddHeaderAction: {},
    SNSAction: {},
    ConnectAction: {},
  }),
  ScanEnabled: D.bool,
});
const o_ReceiptRuleSetMetadata: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
});
