import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "MailManager",
  target: "MailManagerSvc",
  version: "2023-10-17",
  sigv4: "ses",
  protocol: awsJson1_0Protocol,
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
                `https://mail-manager-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://mail-manager-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mail-manager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mail-manager.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type IdempotencyToken = string;
export type AddonSubscriptionId = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateAddonInstanceRequest {
  ClientToken?: string;
  AddonSubscriptionId: string;
  Tags?: Tag[];
}
export type AddonInstanceId = string;
export interface CreateAddonInstanceResponse {
  AddonInstanceId: string;
}
export type AddonName = string;
export interface CreateAddonSubscriptionRequest {
  ClientToken?: string;
  AddonName: string;
  Tags?: Tag[];
}
export interface CreateAddonSubscriptionResponse {
  AddonSubscriptionId: string;
}
export type AddressListName = string;
export interface CreateAddressListRequest {
  ClientToken?: string;
  AddressListName: string;
  Tags?: Tag[];
}
export type AddressListId = string;
export interface CreateAddressListResponse {
  AddressListId: string;
}
export type JobName = string;
export type ImportDataType = "CSV" | "JSON" | (string & {});
export interface ImportDataFormat {
  ImportDataType: ImportDataType;
}
export interface CreateAddressListImportJobRequest {
  ClientToken?: string;
  AddressListId: string;
  Name: string;
  ImportDataFormat: ImportDataFormat;
}
export type JobId = string;
export type PreSignedUrl = string | redacted.Redacted<string>;
export interface CreateAddressListImportJobResponse {
  JobId: string;
  PreSignedUrl: string | redacted.Redacted<string>;
}
export type ArchiveNameString = string;
export type RetentionPeriod =
  | "THREE_MONTHS"
  | "SIX_MONTHS"
  | "NINE_MONTHS"
  | "ONE_YEAR"
  | "EIGHTEEN_MONTHS"
  | "TWO_YEARS"
  | "THIRTY_MONTHS"
  | "THREE_YEARS"
  | "FOUR_YEARS"
  | "FIVE_YEARS"
  | "SIX_YEARS"
  | "SEVEN_YEARS"
  | "EIGHT_YEARS"
  | "NINE_YEARS"
  | "TEN_YEARS"
  | "PERMANENT"
  | (string & {});
export type ArchiveRetention = { RetentionPeriod: RetentionPeriod };
export type KmsKeyArn = string;
export interface CreateArchiveRequest {
  ClientToken?: string;
  ArchiveName: string;
  Retention?: ArchiveRetention;
  KmsKeyArn?: string;
  Tags?: Tag[];
}
export type ArchiveIdString = string;
export interface CreateArchiveResponse {
  ArchiveId: string;
}
export type IngressPointName = string;
export type IngressPointType = "OPEN" | "AUTH" | "MTLS" | (string & {});
export type RuleSetId = string;
export type TrafficPolicyId = string;
export type SmtpPassword = string | redacted.Redacted<string>;
export type SecretArn = string;
export type CAContent = string | redacted.Redacted<string>;
export type CrlContent = string | redacted.Redacted<string>;
export interface TrustStore {
  CAContent: string | redacted.Redacted<string>;
  CrlContent?: string | redacted.Redacted<string>;
  KmsKeyArn?: string;
}
export interface TlsAuthConfiguration {
  TrustStore?: TrustStore;
}
export type IngressPointConfiguration =
  | {
      SmtpPassword: string | redacted.Redacted<string>;
      SecretArn?: never;
      TlsAuthConfiguration?: never;
    }
  | { SmtpPassword?: never; SecretArn: string; TlsAuthConfiguration?: never }
  | {
      SmtpPassword?: never;
      SecretArn?: never;
      TlsAuthConfiguration: TlsAuthConfiguration;
    };
export type IpType = "IPV4" | "DUAL_STACK" | (string & {});
export interface PublicNetworkConfiguration {
  IpType: IpType;
}
export type VpcEndpointId = string;
export interface PrivateNetworkConfiguration {
  VpcEndpointId: string;
}
export type NetworkConfiguration =
  | {
      PublicNetworkConfiguration: PublicNetworkConfiguration;
      PrivateNetworkConfiguration?: never;
    }
  | {
      PublicNetworkConfiguration?: never;
      PrivateNetworkConfiguration: PrivateNetworkConfiguration;
    };
export type TlsPolicy = "REQUIRED" | "OPTIONAL" | "FIPS" | (string & {});
export interface CreateIngressPointRequest {
  ClientToken?: string;
  IngressPointName: string;
  Type: IngressPointType;
  RuleSetId: string;
  TrafficPolicyId: string;
  IngressPointConfiguration?: IngressPointConfiguration;
  NetworkConfiguration?: NetworkConfiguration;
  TlsPolicy?: TlsPolicy;
  Tags?: Tag[];
}
export type IngressPointId = string;
export interface CreateIngressPointResponse {
  IngressPointId: string;
}
export type RelayName = string;
export type RelayServerName = string;
export type RelayServerPort = number;
export interface NoAuthentication {}
export type RelayAuthentication =
  | { SecretArn: string; NoAuthentication?: never }
  | { SecretArn?: never; NoAuthentication: NoAuthentication };
export interface CreateRelayRequest {
  ClientToken?: string;
  RelayName: string;
  ServerName: string;
  ServerPort: number;
  Authentication: RelayAuthentication;
  Tags?: Tag[];
}
export type RelayId = string;
export interface CreateRelayResponse {
  RelayId: string;
}
export type RuleSetName = string;
export type RuleName = string;
export type RuleBooleanEmailAttribute =
  | "READ_RECEIPT_REQUESTED"
  | "TLS"
  | "TLS_WRAPPED"
  | (string & {});
export type AnalyzerArn = string;
export type ResultField = string;
export interface Analysis {
  Analyzer: string;
  ResultField: string;
}
export type RuleAddressListEmailAttribute =
  | "RECIPIENT"
  | "MAIL_FROM"
  | "SENDER"
  | "FROM"
  | "TO"
  | "CC"
  | (string & {});
export type AddressListArn = string;
export type RuleAddressListArnList = string[];
export interface RuleIsInAddressList {
  Attribute: RuleAddressListEmailAttribute;
  AddressLists: string[];
}
export type RuleBooleanToEvaluate =
  | {
      Attribute: RuleBooleanEmailAttribute;
      Analysis?: never;
      IsInAddressList?: never;
    }
  | { Attribute?: never; Analysis: Analysis; IsInAddressList?: never }
  | {
      Attribute?: never;
      Analysis?: never;
      IsInAddressList: RuleIsInAddressList;
    };
export type RuleBooleanOperator = "IS_TRUE" | "IS_FALSE" | (string & {});
export interface RuleBooleanExpression {
  Evaluate: RuleBooleanToEvaluate;
  Operator: RuleBooleanOperator;
}
export type RuleStringEmailAttribute =
  | "MAIL_FROM"
  | "HELO"
  | "RECIPIENT"
  | "SENDER"
  | "FROM"
  | "SUBJECT"
  | "TO"
  | "CC"
  | (string & {});
export type MimeHeaderAttribute = string;
export type RuleClientCertificateAttribute =
  | "CN"
  | "SAN_RFC822_NAME"
  | "SAN_DNS_NAME"
  | "SAN_DIRECTORY_NAME"
  | "SAN_UNIFORM_RESOURCE_IDENTIFIER"
  | "SAN_IP_ADDRESS"
  | "SAN_REGISTERED_ID"
  | "SERIAL_NUMBER"
  | (string & {});
export type RuleStringToEvaluate =
  | {
      Attribute: RuleStringEmailAttribute;
      MimeHeaderAttribute?: never;
      Analysis?: never;
      ClientCertificateAttribute?: never;
    }
  | {
      Attribute?: never;
      MimeHeaderAttribute: string;
      Analysis?: never;
      ClientCertificateAttribute?: never;
    }
  | {
      Attribute?: never;
      MimeHeaderAttribute?: never;
      Analysis: Analysis;
      ClientCertificateAttribute?: never;
    }
  | {
      Attribute?: never;
      MimeHeaderAttribute?: never;
      Analysis?: never;
      ClientCertificateAttribute: RuleClientCertificateAttribute;
    };
export type RuleStringOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | (string & {});
export type RuleStringValue = string | redacted.Redacted<string>;
export type RuleStringList = (string | redacted.Redacted<string>)[];
export interface RuleStringExpression {
  Evaluate: RuleStringToEvaluate;
  Operator: RuleStringOperator;
  Values: (string | redacted.Redacted<string>)[];
}
export type RuleNumberEmailAttribute = "MESSAGE_SIZE" | (string & {});
export type RuleNumberToEvaluate = { Attribute: RuleNumberEmailAttribute };
export type RuleNumberOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "LESS_THAN_OR_EQUAL"
  | "GREATER_THAN_OR_EQUAL"
  | (string & {});
export interface RuleNumberExpression {
  Evaluate: RuleNumberToEvaluate;
  Operator: RuleNumberOperator;
  Value: number;
}
export type RuleIpEmailAttribute = "SOURCE_IP" | (string & {});
export type RuleIpToEvaluate = { Attribute: RuleIpEmailAttribute };
export type RuleIpOperator =
  | "CIDR_MATCHES"
  | "NOT_CIDR_MATCHES"
  | (string & {});
export type RuleIpStringValue = string;
export type RuleIpValueList = string[];
export interface RuleIpExpression {
  Evaluate: RuleIpToEvaluate;
  Operator: RuleIpOperator;
  Values: string[];
}
export type RuleVerdictAttribute = "SPF" | "DKIM" | (string & {});
export type RuleVerdictToEvaluate =
  | { Attribute: RuleVerdictAttribute; Analysis?: never }
  | { Attribute?: never; Analysis: Analysis };
export type RuleVerdictOperator = "EQUALS" | "NOT_EQUALS" | (string & {});
export type RuleVerdict =
  | "PASS"
  | "FAIL"
  | "GRAY"
  | "PROCESSING_FAILED"
  | (string & {});
export type RuleVerdictValueList = RuleVerdict[];
export interface RuleVerdictExpression {
  Evaluate: RuleVerdictToEvaluate;
  Operator: RuleVerdictOperator;
  Values: RuleVerdict[];
}
export type RuleDmarcOperator = "EQUALS" | "NOT_EQUALS" | (string & {});
export type RuleDmarcPolicy = "NONE" | "QUARANTINE" | "REJECT" | (string & {});
export type RuleDmarcValueList = RuleDmarcPolicy[];
export interface RuleDmarcExpression {
  Operator: RuleDmarcOperator;
  Values: RuleDmarcPolicy[];
}
export type RuleCondition =
  | {
      BooleanExpression: RuleBooleanExpression;
      StringExpression?: never;
      NumberExpression?: never;
      IpExpression?: never;
      VerdictExpression?: never;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression: RuleStringExpression;
      NumberExpression?: never;
      IpExpression?: never;
      VerdictExpression?: never;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression?: never;
      NumberExpression: RuleNumberExpression;
      IpExpression?: never;
      VerdictExpression?: never;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression?: never;
      NumberExpression?: never;
      IpExpression: RuleIpExpression;
      VerdictExpression?: never;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression?: never;
      NumberExpression?: never;
      IpExpression?: never;
      VerdictExpression: RuleVerdictExpression;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression?: never;
      NumberExpression?: never;
      IpExpression?: never;
      VerdictExpression?: never;
      DmarcExpression: RuleDmarcExpression;
    };
export type RuleConditions = RuleCondition[];
export interface DropAction {}
export type ActionFailurePolicy = "CONTINUE" | "DROP" | (string & {});
export type IdOrArn = string;
export type MailFrom = "REPLACE" | "PRESERVE" | (string & {});
export interface RelayAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  Relay: string;
  MailFrom?: MailFrom;
}
export type NameOrArn = string;
export interface ArchiveAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  TargetArchive: string;
}
export type IamRoleArn = string;
export type S3Bucket = string;
export type S3Prefix = string;
export type KmsKeyId = string;
export interface S3Action {
  ActionFailurePolicy?: ActionFailurePolicy;
  RoleArn: string;
  S3Bucket: string;
  S3Prefix?: string;
  S3SseKmsKeyId?: string;
}
export interface SendAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  RoleArn: string;
}
export type HeaderName = string;
export type HeaderValue = string;
export interface AddHeaderAction {
  HeaderName: string;
  HeaderValue: string;
}
export type EmailAddress = string | redacted.Redacted<string>;
export type Recipients = (string | redacted.Redacted<string>)[];
export interface ReplaceRecipientAction {
  ReplaceWith?: (string | redacted.Redacted<string>)[];
}
export interface DeliverToMailboxAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  MailboxArn: string;
  RoleArn: string;
}
export type QBusinessApplicationId = string;
export type QBusinessIndexId = string;
export interface DeliverToQBusinessAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  ApplicationId: string;
  IndexId: string;
  RoleArn: string;
}
export type SnsTopicArn = string;
export type SnsNotificationEncoding = "UTF-8" | "BASE64" | (string & {});
export type SnsNotificationPayloadType = "HEADERS" | "CONTENT" | (string & {});
export interface SnsAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  TopicArn: string;
  RoleArn: string;
  Encoding?: SnsNotificationEncoding;
  PayloadType?: SnsNotificationPayloadType;
}
export type StatusCode = string;
export type SmtpReplyCode = string;
export type DiagnosticMessage = string | redacted.Redacted<string>;
export type BounceMessage = string | redacted.Redacted<string>;
export interface BounceAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  RoleArn: string;
  Sender: string | redacted.Redacted<string>;
  StatusCode: string;
  SmtpReplyCode: string;
  DiagnosticMessage: string | redacted.Redacted<string>;
  Message?: string | redacted.Redacted<string>;
}
export type LambdaFunctionArn = string;
export type LambdaInvocationType = "EVENT" | "REQUEST_RESPONSE" | (string & {});
export type LambdaRetryTimeMinutes = number;
export interface InvokeLambdaAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  FunctionArn: string;
  InvocationType: LambdaInvocationType;
  RoleArn: string;
  RetryTimeMinutes?: number;
}
export type RuleAction =
  | {
      Drop: DropAction;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay: RelayAction;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive: ArchiveAction;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3: S3Action;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send: SendAction;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader: AddHeaderAction;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient: ReplaceRecipientAction;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox: DeliverToMailboxAction;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness: DeliverToQBusinessAction;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns: SnsAction;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce: BounceAction;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda: InvokeLambdaAction;
    };
export type RuleActions = RuleAction[];
export interface Rule {
  Name?: string;
  Conditions?: RuleCondition[];
  Unless?: RuleCondition[];
  Actions: RuleAction[];
}
export type Rules = Rule[];
export interface CreateRuleSetRequest {
  ClientToken?: string;
  RuleSetName: string;
  Rules: Rule[];
  Tags?: Tag[];
}
export interface CreateRuleSetResponse {
  RuleSetId: string;
}
export type TrafficPolicyName = string;
export type IngressStringEmailAttribute = "RECIPIENT" | (string & {});
export interface IngressAnalysis {
  Analyzer: string;
  ResultField: string;
}
export type IngressStringToEvaluate =
  | { Attribute: IngressStringEmailAttribute; Analysis?: never }
  | { Attribute?: never; Analysis: IngressAnalysis };
export type IngressStringOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | (string & {});
export type StringList = string[];
export interface IngressStringExpression {
  Evaluate: IngressStringToEvaluate;
  Operator: IngressStringOperator;
  Values: string[];
}
export type IngressIpv4Attribute = "SENDER_IP" | (string & {});
export type IngressIpToEvaluate = { Attribute: IngressIpv4Attribute };
export type IngressIpOperator =
  | "CIDR_MATCHES"
  | "NOT_CIDR_MATCHES"
  | (string & {});
export type Ipv4Cidr = string;
export type Ipv4Cidrs = string[];
export interface IngressIpv4Expression {
  Evaluate: IngressIpToEvaluate;
  Operator: IngressIpOperator;
  Values: string[];
}
export type IngressIpv6Attribute = "SENDER_IPV6" | (string & {});
export type IngressIpv6ToEvaluate = { Attribute: IngressIpv6Attribute };
export type Ipv6Cidr = string;
export type Ipv6Cidrs = string[];
export interface IngressIpv6Expression {
  Evaluate: IngressIpv6ToEvaluate;
  Operator: IngressIpOperator;
  Values: string[];
}
export type IngressTlsAttribute = "TLS_PROTOCOL" | (string & {});
export type IngressTlsProtocolToEvaluate = { Attribute: IngressTlsAttribute };
export type IngressTlsProtocolOperator =
  | "MINIMUM_TLS_VERSION"
  | "IS"
  | (string & {});
export type IngressTlsProtocolAttribute = "TLS1_2" | "TLS1_3" | (string & {});
export interface IngressTlsProtocolExpression {
  Evaluate: IngressTlsProtocolToEvaluate;
  Operator: IngressTlsProtocolOperator;
  Value: IngressTlsProtocolAttribute;
}
export type IngressAddressListEmailAttribute = "RECIPIENT" | (string & {});
export type IngressAddressListArnList = string[];
export interface IngressIsInAddressList {
  Attribute: IngressAddressListEmailAttribute;
  AddressLists: string[];
}
export type IngressBooleanToEvaluate =
  | { Analysis: IngressAnalysis; IsInAddressList?: never }
  | { Analysis?: never; IsInAddressList: IngressIsInAddressList };
export type IngressBooleanOperator = "IS_TRUE" | "IS_FALSE" | (string & {});
export interface IngressBooleanExpression {
  Evaluate: IngressBooleanToEvaluate;
  Operator: IngressBooleanOperator;
}
export type PolicyCondition =
  | {
      StringExpression: IngressStringExpression;
      IpExpression?: never;
      Ipv6Expression?: never;
      TlsExpression?: never;
      BooleanExpression?: never;
    }
  | {
      StringExpression?: never;
      IpExpression: IngressIpv4Expression;
      Ipv6Expression?: never;
      TlsExpression?: never;
      BooleanExpression?: never;
    }
  | {
      StringExpression?: never;
      IpExpression?: never;
      Ipv6Expression: IngressIpv6Expression;
      TlsExpression?: never;
      BooleanExpression?: never;
    }
  | {
      StringExpression?: never;
      IpExpression?: never;
      Ipv6Expression?: never;
      TlsExpression: IngressTlsProtocolExpression;
      BooleanExpression?: never;
    }
  | {
      StringExpression?: never;
      IpExpression?: never;
      Ipv6Expression?: never;
      TlsExpression?: never;
      BooleanExpression: IngressBooleanExpression;
    };
export type PolicyConditions = PolicyCondition[];
export type AcceptAction = "ALLOW" | "DENY" | (string & {});
export interface PolicyStatement {
  Conditions: PolicyCondition[];
  Action: AcceptAction;
}
export type PolicyStatementList = PolicyStatement[];
export type MaxMessageSizeBytes = number;
export interface CreateTrafficPolicyRequest {
  ClientToken?: string;
  TrafficPolicyName: string;
  PolicyStatements: PolicyStatement[];
  DefaultAction: AcceptAction;
  MaxMessageSizeBytes?: number;
  Tags?: Tag[];
}
export interface CreateTrafficPolicyResponse {
  TrafficPolicyId: string;
}
export interface DeleteAddonInstanceRequest {
  AddonInstanceId: string;
}
export interface DeleteAddonInstanceResponse {}
export interface DeleteAddonSubscriptionRequest {
  AddonSubscriptionId: string;
}
export interface DeleteAddonSubscriptionResponse {}
export interface DeleteAddressListRequest {
  AddressListId: string;
}
export interface DeleteAddressListResponse {}
export interface DeleteArchiveRequest {
  ArchiveId: string;
}
export interface DeleteArchiveResponse {}
export interface DeleteIngressPointRequest {
  IngressPointId: string;
}
export interface DeleteIngressPointResponse {}
export interface DeleteRelayRequest {
  RelayId: string;
}
export interface DeleteRelayResponse {}
export interface DeleteRuleSetRequest {
  RuleSetId: string;
}
export interface DeleteRuleSetResponse {}
export interface DeleteTrafficPolicyRequest {
  TrafficPolicyId: string;
}
export interface DeleteTrafficPolicyResponse {}
export type Address = string | redacted.Redacted<string>;
export interface DeregisterMemberFromAddressListRequest {
  AddressListId: string;
  Address: string | redacted.Redacted<string>;
}
export interface DeregisterMemberFromAddressListResponse {}
export interface GetAddonInstanceRequest {
  AddonInstanceId: string;
}
export type AddonInstanceArn = string;
export interface GetAddonInstanceResponse {
  AddonSubscriptionId?: string;
  AddonName?: string;
  AddonInstanceArn?: string;
  CreatedTimestamp?: Date;
}
export interface GetAddonSubscriptionRequest {
  AddonSubscriptionId: string;
}
export type AddonSubscriptionArn = string;
export interface GetAddonSubscriptionResponse {
  AddonName?: string;
  AddonSubscriptionArn?: string;
  CreatedTimestamp?: Date;
}
export interface GetAddressListRequest {
  AddressListId: string;
}
export interface GetAddressListResponse {
  AddressListId: string;
  AddressListArn: string;
  AddressListName: string;
  CreatedTimestamp: Date;
  LastUpdatedTimestamp: Date;
}
export interface GetAddressListImportJobRequest {
  JobId: string;
}
export type ImportJobStatus =
  | "CREATED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export type JobItemsCount = number;
export type ErrorMessage = string;
export interface GetAddressListImportJobResponse {
  JobId: string;
  Name: string;
  Status: ImportJobStatus;
  PreSignedUrl: string | redacted.Redacted<string>;
  ImportedItemsCount?: number;
  FailedItemsCount?: number;
  ImportDataFormat: ImportDataFormat;
  AddressListId: string;
  CreatedTimestamp: Date;
  StartTimestamp?: Date;
  CompletedTimestamp?: Date;
  Error?: string;
}
export interface GetArchiveRequest {
  ArchiveId: string;
}
export type ArchiveArn = string;
export type ArchiveState = "ACTIVE" | "PENDING_DELETION" | (string & {});
export interface GetArchiveResponse {
  ArchiveId: string;
  ArchiveName: string;
  ArchiveArn: string;
  ArchiveState: ArchiveState;
  Retention: ArchiveRetention;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  KmsKeyArn?: string;
}
export type ExportId = string;
export interface GetArchiveExportRequest {
  ExportId: string;
}
export type ArchiveId = string;
export type ArchiveStringEmailAttribute =
  | "TO"
  | "FROM"
  | "CC"
  | "SUBJECT"
  | "ENVELOPE_TO"
  | "ENVELOPE_FROM"
  | (string & {});
export type ArchiveStringToEvaluate = {
  Attribute: ArchiveStringEmailAttribute;
};
export type ArchiveStringOperator = "CONTAINS" | (string & {});
export type StringValue = string;
export type StringValueList = string[];
export interface ArchiveStringExpression {
  Evaluate: ArchiveStringToEvaluate;
  Operator: ArchiveStringOperator;
  Values: string[];
}
export type ArchiveBooleanEmailAttribute = "HAS_ATTACHMENTS" | (string & {});
export type ArchiveBooleanToEvaluate = {
  Attribute: ArchiveBooleanEmailAttribute;
};
export type ArchiveBooleanOperator = "IS_TRUE" | "IS_FALSE" | (string & {});
export interface ArchiveBooleanExpression {
  Evaluate: ArchiveBooleanToEvaluate;
  Operator: ArchiveBooleanOperator;
}
export type ArchiveFilterCondition =
  | { StringExpression: ArchiveStringExpression; BooleanExpression?: never }
  | { StringExpression?: never; BooleanExpression: ArchiveBooleanExpression };
export type ArchiveFilterConditions = ArchiveFilterCondition[];
export interface ArchiveFilters {
  Include?: ArchiveFilterCondition[];
  Unless?: ArchiveFilterCondition[];
}
export type ExportMaxResults = number;
export type S3Location = string;
export interface S3ExportDestinationConfiguration {
  S3Location?: string;
}
export type ExportDestinationConfiguration = {
  S3: S3ExportDestinationConfiguration;
};
export type ExportState =
  | "QUEUED"
  | "PREPROCESSING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export interface ExportStatus {
  SubmissionTimestamp?: Date;
  CompletionTimestamp?: Date;
  State?: ExportState;
  ErrorMessage?: string;
}
export interface GetArchiveExportResponse {
  ArchiveId?: string;
  Filters?: ArchiveFilters;
  FromTimestamp?: Date;
  ToTimestamp?: Date;
  MaxResults?: number;
  ExportDestinationConfiguration?: ExportDestinationConfiguration;
  Status?: ExportStatus;
}
export type ArchivedMessageId = string;
export interface GetArchiveMessageRequest {
  ArchivedMessageId: string;
}
export type S3PresignedURL = string;
export type SenderIpAddress = string | redacted.Redacted<string>;
export interface Metadata {
  Timestamp?: Date;
  IngressPointId?: string;
  TrafficPolicyId?: string;
  RuleSetId?: string;
  SenderHostname?: string;
  SenderIpAddress?: string | redacted.Redacted<string>;
  TlsCipherSuite?: string;
  TlsProtocol?: string;
  SendingMethod?: string;
  SourceIdentity?: string;
  SendingPool?: string;
  ConfigurationSet?: string;
  SourceArn?: string;
}
export interface Envelope {
  Helo?: string;
  From?: string;
  To?: string[];
}
export interface GetArchiveMessageResponse {
  MessageDownloadLink?: string;
  Metadata?: Metadata;
  Envelope?: Envelope;
}
export interface GetArchiveMessageContentRequest {
  ArchivedMessageId: string;
}
export interface MessageBody {
  Text?: string;
  Html?: string;
  MessageMalformed?: boolean;
}
export interface GetArchiveMessageContentResponse {
  Body?: MessageBody;
}
export type SearchId = string;
export interface GetArchiveSearchRequest {
  SearchId: string;
}
export type SearchMaxResults = number;
export type SearchState =
  | "QUEUED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export interface SearchStatus {
  SubmissionTimestamp?: Date;
  CompletionTimestamp?: Date;
  State?: SearchState;
  ErrorMessage?: string;
}
export interface GetArchiveSearchResponse {
  ArchiveId?: string;
  Filters?: ArchiveFilters;
  FromTimestamp?: Date;
  ToTimestamp?: Date;
  MaxResults?: number;
  Status?: SearchStatus;
}
export interface GetArchiveSearchResultsRequest {
  SearchId: string;
}
export type EmailReceivedHeadersList = string[];
export interface Row {
  ArchivedMessageId?: string;
  ReceivedTimestamp?: Date;
  Date?: string;
  To?: string;
  From?: string;
  Cc?: string;
  Subject?: string;
  MessageId?: string;
  HasAttachments?: boolean;
  ReceivedHeaders?: string[];
  InReplyTo?: string;
  XMailer?: string;
  XOriginalMailer?: string;
  XPriority?: string;
  IngressPointId?: string;
  SenderHostname?: string;
  SenderIpAddress?: string | redacted.Redacted<string>;
  Envelope?: Envelope;
  SourceArn?: string;
}
export type RowsList = Row[];
export interface GetArchiveSearchResultsResponse {
  Rows?: Row[];
}
export type TrustStoreResponseOption = "EXCLUDE" | "INCLUDE" | (string & {});
export interface GetIngressPointRequest {
  IngressPointId: string;
  IncludeTrustStoreContents?: TrustStoreResponseOption;
}
export type IngressPointArn = string;
export type IngressPointStatus =
  | "PROVISIONING"
  | "DEPROVISIONING"
  | "UPDATING"
  | "ACTIVE"
  | "CLOSED"
  | "FAILED"
  | "ASSOCIATED_VPC_ENDPOINT_DOES_NOT_EXIST"
  | (string & {});
export type IngressPointARecord = string;
export interface IngressPointPasswordConfiguration {
  SmtpPasswordVersion?: string;
  PreviousSmtpPasswordVersion?: string;
  PreviousSmtpPasswordExpiryTimestamp?: Date;
}
export interface IngressPointAuthConfiguration {
  IngressPointPasswordConfiguration?: IngressPointPasswordConfiguration;
  SecretArn?: string;
  TlsAuthConfiguration?: TlsAuthConfiguration;
}
export interface GetIngressPointResponse {
  IngressPointId: string;
  IngressPointName: string;
  IngressPointArn?: string;
  Status?: IngressPointStatus;
  Type?: IngressPointType;
  ARecord?: string;
  RuleSetId?: string;
  TrafficPolicyId?: string;
  IngressPointAuthConfiguration?: IngressPointAuthConfiguration;
  NetworkConfiguration?: NetworkConfiguration;
  TlsPolicy?: TlsPolicy;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export interface GetMemberOfAddressListRequest {
  AddressListId: string;
  Address: string | redacted.Redacted<string>;
}
export interface GetMemberOfAddressListResponse {
  Address: string | redacted.Redacted<string>;
  CreatedTimestamp: Date;
}
export interface GetRelayRequest {
  RelayId: string;
}
export type RelayArn = string;
export interface GetRelayResponse {
  RelayId: string;
  RelayArn?: string;
  RelayName?: string;
  ServerName?: string;
  ServerPort?: number;
  Authentication?: RelayAuthentication;
  CreatedTimestamp?: Date;
  LastModifiedTimestamp?: Date;
}
export interface GetRuleSetRequest {
  RuleSetId: string;
}
export type RuleSetArn = string;
export interface GetRuleSetResponse {
  RuleSetId: string;
  RuleSetArn: string;
  RuleSetName: string;
  CreatedDate: Date;
  LastModificationDate: Date;
  Rules: Rule[];
}
export interface GetTrafficPolicyRequest {
  TrafficPolicyId: string;
}
export type TrafficPolicyArn = string;
export interface GetTrafficPolicyResponse {
  TrafficPolicyName: string;
  TrafficPolicyId: string;
  TrafficPolicyArn?: string;
  PolicyStatements?: PolicyStatement[];
  MaxMessageSizeBytes?: number;
  DefaultAction?: AcceptAction;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export type PaginationToken = string;
export type PageSize = number;
export interface ListAddonInstancesRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface AddonInstance {
  AddonInstanceId?: string;
  AddonSubscriptionId?: string;
  AddonName?: string;
  AddonInstanceArn?: string;
  CreatedTimestamp?: Date;
}
export type AddonInstances = AddonInstance[];
export interface ListAddonInstancesResponse {
  AddonInstances?: AddonInstance[];
  NextToken?: string;
}
export interface ListAddonSubscriptionsRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface AddonSubscription {
  AddonSubscriptionId?: string;
  AddonName?: string;
  AddonSubscriptionArn?: string;
  CreatedTimestamp?: Date;
}
export type AddonSubscriptions = AddonSubscription[];
export interface ListAddonSubscriptionsResponse {
  AddonSubscriptions?: AddonSubscription[];
  NextToken?: string;
}
export interface ListAddressListImportJobsRequest {
  AddressListId: string;
  NextToken?: string;
  PageSize?: number;
}
export interface ImportJob {
  JobId: string;
  Name: string;
  Status: ImportJobStatus;
  PreSignedUrl: string | redacted.Redacted<string>;
  ImportedItemsCount?: number;
  FailedItemsCount?: number;
  ImportDataFormat: ImportDataFormat;
  AddressListId: string;
  CreatedTimestamp: Date;
  StartTimestamp?: Date;
  CompletedTimestamp?: Date;
  Error?: string;
}
export type ImportJobs = ImportJob[];
export interface ListAddressListImportJobsResponse {
  ImportJobs: ImportJob[];
  NextToken?: string;
}
export interface ListAddressListsRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface AddressList {
  AddressListId: string;
  AddressListArn: string;
  AddressListName: string;
  CreatedTimestamp: Date;
  LastUpdatedTimestamp: Date;
}
export type AddressLists = AddressList[];
export interface ListAddressListsResponse {
  AddressLists: AddressList[];
  NextToken?: string;
}
export interface ListArchiveExportsRequest {
  ArchiveId: string;
  NextToken?: string;
  PageSize?: number;
}
export interface ExportSummary {
  ExportId?: string;
  Status?: ExportStatus;
}
export type ExportSummaryList = ExportSummary[];
export interface ListArchiveExportsResponse {
  Exports?: ExportSummary[];
  NextToken?: string;
}
export interface ListArchivesRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface Archive {
  ArchiveId: string;
  ArchiveName?: string;
  ArchiveState?: ArchiveState;
  LastUpdatedTimestamp?: Date;
}
export type ArchivesList = Archive[];
export interface ListArchivesResponse {
  Archives: Archive[];
  NextToken?: string;
}
export interface ListArchiveSearchesRequest {
  ArchiveId: string;
  NextToken?: string;
  PageSize?: number;
}
export interface SearchSummary {
  SearchId?: string;
  Status?: SearchStatus;
}
export type SearchSummaryList = SearchSummary[];
export interface ListArchiveSearchesResponse {
  Searches?: SearchSummary[];
  NextToken?: string;
}
export interface ListIngressPointsRequest {
  PageSize?: number;
  NextToken?: string;
}
export interface IngressPoint {
  IngressPointName: string;
  IngressPointId: string;
  Status: IngressPointStatus;
  Type: IngressPointType;
  ARecord?: string;
}
export type IngressPointsList = IngressPoint[];
export interface ListIngressPointsResponse {
  IngressPoints?: IngressPoint[];
  NextToken?: string;
}
export type AddressPrefix = string | redacted.Redacted<string>;
export interface AddressFilter {
  AddressPrefix?: string | redacted.Redacted<string>;
}
export type AddressPageSize = number;
export interface ListMembersOfAddressListRequest {
  AddressListId: string;
  Filter?: AddressFilter;
  NextToken?: string;
  PageSize?: number;
}
export interface SavedAddress {
  Address: string | redacted.Redacted<string>;
  CreatedTimestamp: Date;
}
export type SavedAddresses = SavedAddress[];
export interface ListMembersOfAddressListResponse {
  Addresses: SavedAddress[];
  NextToken?: string;
}
export interface ListRelaysRequest {
  PageSize?: number;
  NextToken?: string;
}
export interface Relay {
  RelayId?: string;
  RelayName?: string;
  LastModifiedTimestamp?: Date;
}
export type Relays = Relay[];
export interface ListRelaysResponse {
  Relays: Relay[];
  NextToken?: string;
}
export interface ListRuleSetsRequest {
  NextToken?: string;
  PageSize?: number;
}
export interface RuleSet {
  RuleSetId?: string;
  RuleSetName?: string;
  LastModificationDate?: Date;
}
export type RuleSets = RuleSet[];
export interface ListRuleSetsResponse {
  RuleSets: RuleSet[];
  NextToken?: string;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags: Tag[];
}
export interface ListTrafficPoliciesRequest {
  PageSize?: number;
  NextToken?: string;
}
export interface TrafficPolicy {
  TrafficPolicyName: string;
  TrafficPolicyId: string;
  DefaultAction: AcceptAction;
}
export type TrafficPolicyList = TrafficPolicy[];
export interface ListTrafficPoliciesResponse {
  TrafficPolicies?: TrafficPolicy[];
  NextToken?: string;
}
export interface RegisterMemberToAddressListRequest {
  AddressListId: string;
  Address: string | redacted.Redacted<string>;
}
export interface RegisterMemberToAddressListResponse {}
export interface StartAddressListImportJobRequest {
  JobId: string;
}
export interface StartAddressListImportJobResponse {}
export interface StartArchiveExportRequest {
  ArchiveId: string;
  Filters?: ArchiveFilters;
  FromTimestamp: Date;
  ToTimestamp: Date;
  MaxResults?: number;
  ExportDestinationConfiguration: ExportDestinationConfiguration;
  IncludeMetadata?: boolean;
}
export interface StartArchiveExportResponse {
  ExportId?: string;
}
export interface StartArchiveSearchRequest {
  ArchiveId: string;
  Filters?: ArchiveFilters;
  FromTimestamp: Date;
  ToTimestamp: Date;
  MaxResults: number;
}
export interface StartArchiveSearchResponse {
  SearchId?: string;
}
export interface StopAddressListImportJobRequest {
  JobId: string;
}
export interface StopAddressListImportJobResponse {}
export interface StopArchiveExportRequest {
  ExportId: string;
}
export interface StopArchiveExportResponse {}
export interface StopArchiveSearchRequest {
  SearchId: string;
}
export interface StopArchiveSearchResponse {}
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
export interface UpdateArchiveRequest {
  ArchiveId: string;
  ArchiveName?: string;
  Retention?: ArchiveRetention;
}
export interface UpdateArchiveResponse {}
export type IngressPointStatusToUpdate = "ACTIVE" | "CLOSED" | (string & {});
export interface UpdateIngressPointRequest {
  IngressPointId: string;
  IngressPointName?: string;
  StatusToUpdate?: IngressPointStatusToUpdate;
  RuleSetId?: string;
  TrafficPolicyId?: string;
  IngressPointConfiguration?: IngressPointConfiguration;
  TlsPolicy?: TlsPolicy;
}
export interface UpdateIngressPointResponse {}
export interface UpdateRelayRequest {
  RelayId: string;
  RelayName?: string;
  ServerName?: string;
  ServerPort?: number;
  Authentication?: RelayAuthentication;
}
export interface UpdateRelayResponse {}
export interface UpdateRuleSetRequest {
  RuleSetId: string;
  RuleSetName?: string;
  Rules?: Rule[];
}
export interface UpdateRuleSetResponse {}
export interface UpdateTrafficPolicyRequest {
  TrafficPolicyId: string;
  TrafficPolicyName?: string;
  PolicyStatements?: PolicyStatement[];
  DefaultAction?: AcceptAction;
  MaxMessageSizeBytes?: number;
}
export interface UpdateTrafficPolicyResponse {}
export type CreateAddonInstanceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Add On instance for the subscription indicated in the request. The resulting Amazon Resource Name (ARN) can be used in a conditional statement for a rule set or traffic policy.
 */
export const createAddonInstance: API.OperationMethod<
  CreateAddonInstanceRequest,
  CreateAddonInstanceResponse,
  CreateAddonInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      AddonSubscriptionId: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddonInstance",
})) as any;

export type CreateAddonSubscriptionError =
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a subscription for an Add On representing the acceptance of its terms of use and additional pricing. The subscription can then be used to create an instance for use in rule sets or traffic policies.
 */
export const createAddonSubscription: API.OperationMethod<
  CreateAddonSubscriptionRequest,
  CreateAddonSubscriptionResponse,
  CreateAddonSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      AddonName: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddonSubscription",
})) as any;

export type CreateAddressListError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new address list.
 */
export const createAddressList: API.OperationMethod<
  CreateAddressListRequest,
  CreateAddressListResponse,
  CreateAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      AddressListName: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddressList",
})) as any;

export type CreateAddressListImportJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an import job for an address list.
 */
export const createAddressListImportJob: API.OperationMethod<
  CreateAddressListImportJobRequest,
  CreateAddressListImportJobResponse,
  CreateAddressListImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      AddressListId: 0,
      Name: 0,
      ImportDataFormat: { ImportDataType: 0 },
    },
    output: { PreSignedUrl: D.secret },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddressListImportJob",
})) as any;

export type CreateArchiveError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new email archive resource for storing and retaining emails.
 */
export const createArchive: API.OperationMethod<
  CreateArchiveRequest,
  CreateArchiveResponse,
  CreateArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      ArchiveName: 0,
      Retention: i_ArchiveRetention,
      KmsKeyArn: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateArchive",
})) as any;

export type CreateIngressPointError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Provision a new ingress endpoint resource.
 */
export const createIngressPoint: API.OperationMethod<
  CreateIngressPointRequest,
  CreateIngressPointResponse,
  CreateIngressPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      IngressPointName: 0,
      Type: 0,
      RuleSetId: 0,
      TrafficPolicyId: 0,
      IngressPointConfiguration: i_IngressPointConfiguration,
      NetworkConfiguration: {
        PublicNetworkConfiguration: { IpType: 0 },
        PrivateNetworkConfiguration: { VpcEndpointId: 0 },
      },
      TlsPolicy: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngressPoint",
})) as any;

export type CreateRelayError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a relay resource which can be used in rules to relay incoming emails to defined relay destinations.
 */
export const createRelay: API.OperationMethod<
  CreateRelayRequest,
  CreateRelayResponse,
  CreateRelayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      RelayName: 0,
      ServerName: 0,
      ServerPort: 0,
      Authentication: i_RelayAuthentication,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRelay",
})) as any;

export type CreateRuleSetError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Provision a new rule set.
 */
export const createRuleSet: API.OperationMethod<
  CreateRuleSetRequest,
  CreateRuleSetResponse,
  CreateRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      RuleSetName: 0,
      Rules: D.list(i_Rule),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleSet",
})) as any;

export type CreateTrafficPolicyError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Provision a new traffic policy resource.
 */
export const createTrafficPolicy: API.OperationMethod<
  CreateTrafficPolicyRequest,
  CreateTrafficPolicyResponse,
  CreateTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      TrafficPolicyName: 0,
      PolicyStatements: D.list(i_PolicyStatement),
      DefaultAction: 0,
      MaxMessageSizeBytes: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrafficPolicy",
})) as any;

export type DeleteAddonInstanceError =
  | ConflictException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Add On instance.
 */
export const deleteAddonInstance: API.OperationMethod<
  DeleteAddonInstanceRequest,
  DeleteAddonInstanceResponse,
  DeleteAddonInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AddonInstanceId: 0 } },
  errors: [ConflictException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAddonInstance",
})) as any;

export type DeleteAddonSubscriptionError =
  | ConflictException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Add On subscription.
 */
export const deleteAddonSubscription: API.OperationMethod<
  DeleteAddonSubscriptionRequest,
  DeleteAddonSubscriptionResponse,
  DeleteAddonSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AddonSubscriptionId: 0 } },
  errors: [ConflictException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAddonSubscription",
})) as any;

export type DeleteAddressListError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an address list.
 */
export const deleteAddressList: API.OperationMethod<
  DeleteAddressListRequest,
  DeleteAddressListResponse,
  DeleteAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AddressListId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAddressList",
})) as any;

export type DeleteArchiveError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates deletion of an email archive. This changes the archive state to pending deletion. In this state, no new emails can be added, and existing archived emails become inaccessible (search, export, download). The archive and all of its contents will be permanently deleted 30 days after entering the pending deletion state, regardless of the configured retention period.
 */
export const deleteArchive: API.OperationMethod<
  DeleteArchiveRequest,
  DeleteArchiveResponse,
  DeleteArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ArchiveId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteArchive",
})) as any;

export type DeleteIngressPointError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete an ingress endpoint resource.
 */
export const deleteIngressPoint: API.OperationMethod<
  DeleteIngressPointRequest,
  DeleteIngressPointResponse,
  DeleteIngressPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { IngressPointId: 0 } },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIngressPoint",
})) as any;

export type DeleteRelayError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing relay resource.
 */
export const deleteRelay: API.OperationMethod<
  DeleteRelayRequest,
  DeleteRelayResponse,
  DeleteRelayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RelayId: 0 } },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRelay",
})) as any;

export type DeleteRuleSetError =
  | ConflictException
  | ValidationException
  | CommonErrors;
/**
 * Delete a rule set.
 */
export const deleteRuleSet: API.OperationMethod<
  DeleteRuleSetRequest,
  DeleteRuleSetResponse,
  DeleteRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleSetId: 0 } },
  errors: [ConflictException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleSet",
})) as any;

export type DeleteTrafficPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete a traffic policy resource.
 */
export const deleteTrafficPolicy: API.OperationMethod<
  DeleteTrafficPolicyRequest,
  DeleteTrafficPolicyResponse,
  DeleteTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrafficPolicyId: 0 } },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrafficPolicy",
})) as any;

export type DeregisterMemberFromAddressListError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a member from an address list.
 */
export const deregisterMemberFromAddressList: API.OperationMethod<
  DeregisterMemberFromAddressListRequest,
  DeregisterMemberFromAddressListResponse,
  DeregisterMemberFromAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AddressListId: 0, Address: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterMemberFromAddressList",
})) as any;

export type GetAddonInstanceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about an Add On instance.
 */
export const getAddonInstance: API.OperationMethod<
  GetAddonInstanceRequest,
  GetAddonInstanceResponse,
  GetAddonInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AddonInstanceId: 0 },
    output: { CreatedTimestamp: D.ts },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAddonInstance",
})) as any;

export type GetAddonSubscriptionError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about an Add On subscription.
 */
export const getAddonSubscription: API.OperationMethod<
  GetAddonSubscriptionRequest,
  GetAddonSubscriptionResponse,
  GetAddonSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AddonSubscriptionId: 0 },
    output: { CreatedTimestamp: D.ts },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAddonSubscription",
})) as any;

export type GetAddressListError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of an address list.
 */
export const getAddressList: API.OperationMethod<
  GetAddressListRequest,
  GetAddressListResponse,
  GetAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AddressListId: 0 },
    output: { CreatedTimestamp: D.ts, LastUpdatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAddressList",
})) as any;

export type GetAddressListImportJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of an import job.
 */
export const getAddressListImportJob: API.OperationMethod<
  GetAddressListImportJobRequest,
  GetAddressListImportJobResponse,
  GetAddressListImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      PreSignedUrl: D.secret,
      CreatedTimestamp: D.ts,
      StartTimestamp: D.ts,
      CompletedTimestamp: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAddressListImportJob",
})) as any;

export type GetArchiveError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the full details and current state of a specified email archive.
 */
export const getArchive: API.OperationMethod<
  GetArchiveRequest,
  GetArchiveResponse,
  GetArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ArchiveId: 0 },
    output: { CreatedTimestamp: D.ts, LastUpdatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchive",
})) as any;

export type GetArchiveExportError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details and current status of a specific email archive export job.
 */
export const getArchiveExport: API.OperationMethod<
  GetArchiveExportRequest,
  GetArchiveExportResponse,
  GetArchiveExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExportId: 0 },
    output: { FromTimestamp: D.ts, ToTimestamp: D.ts, Status: o_ExportStatus },
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveExport",
})) as any;

export type GetArchiveMessageError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a pre-signed URL that provides temporary download access to the specific email message stored in the archive.
 */
export const getArchiveMessage: API.OperationMethod<
  GetArchiveMessageRequest,
  GetArchiveMessageResponse,
  GetArchiveMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ArchivedMessageId: 0 },
    output: { Metadata: { Timestamp: D.ts, SenderIpAddress: D.secret } },
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveMessage",
})) as any;

export type GetArchiveMessageContentError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the textual content of a specific email message stored in the archive. Attachments are not included.
 */
export const getArchiveMessageContent: API.OperationMethod<
  GetArchiveMessageContentRequest,
  GetArchiveMessageContentResponse,
  GetArchiveMessageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ArchivedMessageId: 0 } },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveMessageContent",
})) as any;

export type GetArchiveSearchError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details and current status of a specific email archive search job.
 */
export const getArchiveSearch: API.OperationMethod<
  GetArchiveSearchRequest,
  GetArchiveSearchResponse,
  GetArchiveSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SearchId: 0 },
    output: { FromTimestamp: D.ts, ToTimestamp: D.ts, Status: o_SearchStatus },
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveSearch",
})) as any;

export type GetArchiveSearchResultsError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the results of a completed email archive search job.
 */
export const getArchiveSearchResults: API.OperationMethod<
  GetArchiveSearchResultsRequest,
  GetArchiveSearchResultsResponse,
  GetArchiveSearchResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SearchId: 0 },
    output: {
      Rows: D.list({ ReceivedTimestamp: D.ts, SenderIpAddress: D.secret }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveSearchResults",
})) as any;

export type GetIngressPointError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetch ingress endpoint resource attributes.
 */
export const getIngressPoint: API.OperationMethod<
  GetIngressPointRequest,
  GetIngressPointResponse,
  GetIngressPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IngressPointId: 0, IncludeTrustStoreContents: 0 },
    output: {
      IngressPointAuthConfiguration: {
        IngressPointPasswordConfiguration: {
          PreviousSmtpPasswordExpiryTimestamp: D.ts,
        },
        TlsAuthConfiguration: {
          TrustStore: { CAContent: D.secret, CrlContent: D.secret },
        },
      },
      CreatedTimestamp: D.ts,
      LastUpdatedTimestamp: D.ts,
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngressPoint",
})) as any;

export type GetMemberOfAddressListError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of a member in an address list.
 */
export const getMemberOfAddressList: API.OperationMethod<
  GetMemberOfAddressListRequest,
  GetMemberOfAddressListResponse,
  GetMemberOfAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AddressListId: 0, Address: 0 },
    output: { Address: D.secret, CreatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemberOfAddressList",
})) as any;

export type GetRelayError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetch the relay resource and it's attributes.
 */
export const getRelay: API.OperationMethod<
  GetRelayRequest,
  GetRelayResponse,
  GetRelayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RelayId: 0 },
    output: { CreatedTimestamp: D.ts, LastModifiedTimestamp: D.ts },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelay",
})) as any;

export type GetRuleSetError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of a rule set.
 */
export const getRuleSet: API.OperationMethod<
  GetRuleSetRequest,
  GetRuleSetResponse,
  GetRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleSetId: 0 },
    output: {
      CreatedDate: D.ts,
      LastModificationDate: D.ts,
      Rules: D.list({
        Conditions: D.list(o_RuleCondition),
        Unless: D.list(o_RuleCondition),
        Actions: D.list({
          ReplaceRecipient: { ReplaceWith: D.list(D.secret) },
          Bounce: {
            Sender: D.secret,
            DiagnosticMessage: D.secret,
            Message: D.secret,
          },
        }),
      }),
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuleSet",
})) as any;

export type GetTrafficPolicyError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of a traffic policy resource.
 */
export const getTrafficPolicy: API.OperationMethod<
  GetTrafficPolicyRequest,
  GetTrafficPolicyResponse,
  GetTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TrafficPolicyId: 0 },
    output: { CreatedTimestamp: D.ts, LastUpdatedTimestamp: D.ts },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficPolicy",
})) as any;

export type ListAddonInstancesError = ValidationException | CommonErrors;
/**
 * Lists all Add On instances in your account.
 */
export const listAddonInstances: API.PaginatedOperationMethod<
  ListAddonInstancesRequest,
  ListAddonInstancesResponse,
  ListAddonInstancesError,
  Credentials | HttpClient.HttpClient,
  AddonInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, PageSize: 0 },
    output: { AddonInstances: D.list({ CreatedTimestamp: D.ts }) },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddonInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AddonInstances",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListAddonSubscriptionsError = ValidationException | CommonErrors;
/**
 * Lists all Add On subscriptions in your account.
 */
export const listAddonSubscriptions: API.PaginatedOperationMethod<
  ListAddonSubscriptionsRequest,
  ListAddonSubscriptionsResponse,
  ListAddonSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  AddonSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, PageSize: 0 },
    output: { AddonSubscriptions: D.list({ CreatedTimestamp: D.ts }) },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddonSubscriptions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AddonSubscriptions",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListAddressListImportJobsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists jobs for an address list.
 */
export const listAddressListImportJobs: API.PaginatedOperationMethod<
  ListAddressListImportJobsRequest,
  ListAddressListImportJobsResponse,
  ListAddressListImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AddressListId: 0, NextToken: 0, PageSize: 0 },
    output: {
      ImportJobs: D.list({
        PreSignedUrl: D.secret,
        CreatedTimestamp: D.ts,
        StartTimestamp: D.ts,
        CompletedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddressListImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ImportJobs",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListAddressListsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists address lists for this account.
 */
export const listAddressLists: API.PaginatedOperationMethod<
  ListAddressListsRequest,
  ListAddressListsResponse,
  ListAddressListsError,
  Credentials | HttpClient.HttpClient,
  AddressList
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, PageSize: 0 },
    output: {
      AddressLists: D.list({
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      }),
    },
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddressLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AddressLists",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListArchiveExportsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of email archive export jobs.
 */
export const listArchiveExports: API.PaginatedOperationMethod<
  ListArchiveExportsRequest,
  ListArchiveExportsResponse,
  ListArchiveExportsError,
  Credentials | HttpClient.HttpClient,
  ExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ArchiveId: 0, NextToken: 0, PageSize: 0 },
    output: { Exports: D.list({ Status: o_ExportStatus }) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchiveExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Exports",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListArchivesError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all email archives in your account.
 */
export const listArchives: API.PaginatedOperationMethod<
  ListArchivesRequest,
  ListArchivesResponse,
  ListArchivesError,
  Credentials | HttpClient.HttpClient,
  Archive
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, PageSize: 0 },
    output: { Archives: D.list({ LastUpdatedTimestamp: D.ts }) },
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchives",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Archives",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListArchiveSearchesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of email archive search jobs.
 */
export const listArchiveSearches: API.PaginatedOperationMethod<
  ListArchiveSearchesRequest,
  ListArchiveSearchesResponse,
  ListArchiveSearchesError,
  Credentials | HttpClient.HttpClient,
  SearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ArchiveId: 0, NextToken: 0, PageSize: 0 },
    output: { Searches: D.list({ Status: o_SearchStatus }) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchiveSearches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Searches",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListIngressPointsError = ValidationException | CommonErrors;
/**
 * List all ingress endpoint resources.
 */
export const listIngressPoints: API.PaginatedOperationMethod<
  ListIngressPointsRequest,
  ListIngressPointsResponse,
  ListIngressPointsError,
  Credentials | HttpClient.HttpClient,
  IngressPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { PageSize: 0, NextToken: 0 } },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngressPoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IngressPoints",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListMembersOfAddressListError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists members of an address list.
 */
export const listMembersOfAddressList: API.PaginatedOperationMethod<
  ListMembersOfAddressListRequest,
  ListMembersOfAddressListResponse,
  ListMembersOfAddressListError,
  Credentials | HttpClient.HttpClient,
  SavedAddress
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AddressListId: 0,
      Filter: { AddressPrefix: 0 },
      NextToken: 0,
      PageSize: 0,
    },
    output: {
      Addresses: D.list({ Address: D.secret, CreatedTimestamp: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembersOfAddressList",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Addresses",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListRelaysError = ValidationException | CommonErrors;
/**
 * Lists all the existing relay resources.
 */
export const listRelays: API.PaginatedOperationMethod<
  ListRelaysRequest,
  ListRelaysResponse,
  ListRelaysError,
  Credentials | HttpClient.HttpClient,
  Relay
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PageSize: 0, NextToken: 0 },
    output: { Relays: D.list({ LastModifiedTimestamp: D.ts }) },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRelays",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Relays",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListRuleSetsError = ValidationException | CommonErrors;
/**
 * List rule sets for this account.
 */
export const listRuleSets: API.PaginatedOperationMethod<
  ListRuleSetsRequest,
  ListRuleSetsResponse,
  ListRuleSetsError,
  Credentials | HttpClient.HttpClient,
  RuleSet
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, PageSize: 0 },
    output: { RuleSets: D.list({ LastModificationDate: D.ts }) },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleSets",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the list of tags (keys and values) assigned to the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTrafficPoliciesError = ValidationException | CommonErrors;
/**
 * List traffic policy resources.
 */
export const listTrafficPolicies: API.PaginatedOperationMethod<
  ListTrafficPoliciesRequest,
  ListTrafficPoliciesResponse,
  ListTrafficPoliciesError,
  Credentials | HttpClient.HttpClient,
  TrafficPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { PageSize: 0, NextToken: 0 } },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrafficPolicies",
    pageSize: "PageSize",
  } as const,
})) as any;

export type RegisterMemberToAddressListError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a member to an address list.
 */
export const registerMemberToAddressList: API.OperationMethod<
  RegisterMemberToAddressListRequest,
  RegisterMemberToAddressListResponse,
  RegisterMemberToAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AddressListId: 0, Address: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterMemberToAddressList",
})) as any;

export type StartAddressListImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an import job for an address list.
 */
export const startAddressListImportJob: API.OperationMethod<
  StartAddressListImportJobRequest,
  StartAddressListImportJobResponse,
  StartAddressListImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAddressListImportJob",
})) as any;

export type StartArchiveExportError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates an export of emails from the specified archive.
 */
export const startArchiveExport: API.OperationMethod<
  StartArchiveExportRequest,
  StartArchiveExportResponse,
  StartArchiveExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ArchiveId: 0,
      Filters: i_ArchiveFilters,
      FromTimestamp: 0,
      ToTimestamp: 0,
      MaxResults: 0,
      ExportDestinationConfiguration: { S3: { S3Location: 0 } },
      IncludeMetadata: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartArchiveExport",
})) as any;

export type StartArchiveSearchError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a search across emails in the specified archive.
 */
export const startArchiveSearch: API.OperationMethod<
  StartArchiveSearchRequest,
  StartArchiveSearchResponse,
  StartArchiveSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ArchiveId: 0,
      Filters: i_ArchiveFilters,
      FromTimestamp: 0,
      ToTimestamp: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartArchiveSearch",
})) as any;

export type StopAddressListImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an ongoing import job for an address list.
 */
export const stopAddressListImportJob: API.OperationMethod<
  StopAddressListImportJobRequest,
  StopAddressListImportJobResponse,
  StopAddressListImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAddressListImportJob",
})) as any;

export type StopArchiveExportError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an in-progress export of emails from an archive.
 */
export const stopArchiveExport: API.OperationMethod<
  StopArchiveExportRequest,
  StopArchiveExportResponse,
  StopArchiveExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ExportId: 0 } },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopArchiveExport",
})) as any;

export type StopArchiveSearchError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an in-progress archive search job.
 */
export const stopArchiveSearch: API.OperationMethod<
  StopArchiveSearchRequest,
  StopArchiveSearchResponse,
  StopArchiveSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SearchId: 0 } },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopArchiveSearch",
})) as any;

export type TagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags (keys and values) to a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
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
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateArchiveError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the attributes of an existing email archive.
 */
export const updateArchive: API.OperationMethod<
  UpdateArchiveRequest,
  UpdateArchiveResponse,
  UpdateArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ArchiveId: 0, ArchiveName: 0, Retention: i_ArchiveRetention },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateArchive",
})) as any;

export type UpdateIngressPointError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update attributes of a provisioned ingress endpoint resource.
 */
export const updateIngressPoint: API.OperationMethod<
  UpdateIngressPointRequest,
  UpdateIngressPointResponse,
  UpdateIngressPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IngressPointId: 0,
      IngressPointName: 0,
      StatusToUpdate: 0,
      RuleSetId: 0,
      TrafficPolicyId: 0,
      IngressPointConfiguration: i_IngressPointConfiguration,
      TlsPolicy: 0,
    },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIngressPoint",
})) as any;

export type UpdateRelayError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the attributes of an existing relay resource.
 */
export const updateRelay: API.OperationMethod<
  UpdateRelayRequest,
  UpdateRelayResponse,
  UpdateRelayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RelayId: 0,
      RelayName: 0,
      ServerName: 0,
      ServerPort: 0,
      Authentication: i_RelayAuthentication,
    },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRelay",
})) as any;

export type UpdateRuleSetError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update attributes of an already provisioned rule set.
 */
export const updateRuleSet: API.OperationMethod<
  UpdateRuleSetRequest,
  UpdateRuleSetResponse,
  UpdateRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleSetId: 0, RuleSetName: 0, Rules: D.list(i_Rule) },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleSet",
})) as any;

export type UpdateTrafficPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update attributes of an already provisioned traffic policy resource.
 */
export const updateTrafficPolicy: API.OperationMethod<
  UpdateTrafficPolicyRequest,
  UpdateTrafficPolicyResponse,
  UpdateTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrafficPolicyId: 0,
      TrafficPolicyName: 0,
      PolicyStatements: D.list(i_PolicyStatement),
      DefaultAction: 0,
      MaxMessageSizeBytes: 0,
    },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrafficPolicy",
})) as any;

const i_ArchiveFilters: D.LazyStruct = () => ({
  Include: D.list(i_ArchiveFilterCondition),
  Unless: D.list(i_ArchiveFilterCondition),
});
const i_ArchiveRetention: D.LazyStruct = () => ({ RetentionPeriod: 0 });
const i_IngressPointConfiguration: D.LazyStruct = () => ({
  SmtpPassword: 0,
  SecretArn: 0,
  TlsAuthConfiguration: {
    TrustStore: { CAContent: 0, CrlContent: 0, KmsKeyArn: 0 },
  },
});
const i_PolicyStatement: D.LazyStruct = () => ({
  Conditions: D.list({
    StringExpression: {
      Evaluate: { Attribute: 0, Analysis: i_IngressAnalysis },
      Operator: 0,
      Values: 0,
    },
    IpExpression: { Evaluate: { Attribute: 0 }, Operator: 0, Values: 0 },
    Ipv6Expression: { Evaluate: { Attribute: 0 }, Operator: 0, Values: 0 },
    TlsExpression: { Evaluate: { Attribute: 0 }, Operator: 0, Value: 0 },
    BooleanExpression: {
      Evaluate: {
        Analysis: i_IngressAnalysis,
        IsInAddressList: { Attribute: 0, AddressLists: 0 },
      },
      Operator: 0,
    },
  }),
  Action: 0,
});
const i_RelayAuthentication: D.LazyStruct = () => ({
  SecretArn: 0,
  NoAuthentication: {},
});
const i_Rule: D.LazyStruct = () => ({
  Name: 0,
  Conditions: D.list(i_RuleCondition),
  Unless: D.list(i_RuleCondition),
  Actions: D.list({
    Drop: {},
    Relay: { ActionFailurePolicy: 0, Relay: 0, MailFrom: 0 },
    Archive: { ActionFailurePolicy: 0, TargetArchive: 0 },
    WriteToS3: {
      ActionFailurePolicy: 0,
      RoleArn: 0,
      S3Bucket: 0,
      S3Prefix: 0,
      S3SseKmsKeyId: 0,
    },
    Send: { ActionFailurePolicy: 0, RoleArn: 0 },
    AddHeader: { HeaderName: 0, HeaderValue: 0 },
    ReplaceRecipient: { ReplaceWith: 0 },
    DeliverToMailbox: { ActionFailurePolicy: 0, MailboxArn: 0, RoleArn: 0 },
    DeliverToQBusiness: {
      ActionFailurePolicy: 0,
      ApplicationId: 0,
      IndexId: 0,
      RoleArn: 0,
    },
    PublishToSns: {
      ActionFailurePolicy: 0,
      TopicArn: 0,
      RoleArn: 0,
      Encoding: 0,
      PayloadType: 0,
    },
    Bounce: {
      ActionFailurePolicy: 0,
      RoleArn: 0,
      Sender: 0,
      StatusCode: 0,
      SmtpReplyCode: 0,
      DiagnosticMessage: 0,
      Message: 0,
    },
    InvokeLambda: {
      ActionFailurePolicy: 0,
      FunctionArn: 0,
      InvocationType: 0,
      RoleArn: 0,
      RetryTimeMinutes: 0,
    },
  }),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ExportStatus: D.LazyStruct = () => ({
  SubmissionTimestamp: D.ts,
  CompletionTimestamp: D.ts,
});
const o_RuleCondition: D.LazyStruct = () => ({
  StringExpression: { Values: D.list(D.secret) },
});
const o_SearchStatus: D.LazyStruct = () => ({
  SubmissionTimestamp: D.ts,
  CompletionTimestamp: D.ts,
});
const i_ArchiveFilterCondition: D.LazyStruct = () => ({
  StringExpression: { Evaluate: { Attribute: 0 }, Operator: 0, Values: 0 },
  BooleanExpression: { Evaluate: { Attribute: 0 }, Operator: 0 },
});
const i_IngressAnalysis: D.LazyStruct = () => ({ Analyzer: 0, ResultField: 0 });
const i_RuleCondition: D.LazyStruct = () => ({
  BooleanExpression: {
    Evaluate: {
      Attribute: 0,
      Analysis: i_Analysis,
      IsInAddressList: { Attribute: 0, AddressLists: 0 },
    },
    Operator: 0,
  },
  StringExpression: {
    Evaluate: {
      Attribute: 0,
      MimeHeaderAttribute: 0,
      Analysis: i_Analysis,
      ClientCertificateAttribute: 0,
    },
    Operator: 0,
    Values: 0,
  },
  NumberExpression: { Evaluate: { Attribute: 0 }, Operator: 0, Value: 0 },
  IpExpression: { Evaluate: { Attribute: 0 }, Operator: 0, Values: 0 },
  VerdictExpression: {
    Evaluate: { Attribute: 0, Analysis: i_Analysis },
    Operator: 0,
    Values: 0,
  },
  DmarcExpression: { Operator: 0, Values: 0 },
});
const i_Analysis: D.LazyStruct = () => ({ Analyzer: 0, ResultField: 0 });
