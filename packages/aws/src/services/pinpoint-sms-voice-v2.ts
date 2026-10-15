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
  sdkId: "Pinpoint SMS Voice V2",
  serviceShapeName: "PinpointSMSVoiceV2",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sms-voice" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-03-31");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://sms-voice-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://sms-voice-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://sms-voice.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://sms-voice.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://sms-voice.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Reason: /*@__PURE__*/ S.optional(S.String),
  }).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Reason: /*@__PURE__*/ S.optional(S.String),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
    ResourceId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.Retryable(),
  ).pipe(C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
    ResourceId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.Retryable({ throttling: true }),
  ).pipe(C.withRetryableError, C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Reason: /*@__PURE__*/ S.optional(S.String),
    Fields: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(2881, __c90, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export type PoolIdOrArn = string;
export type PhoneOrSenderIdOrArn = string;
export type IsoCountryCode = string;
export type ClientToken = string;
export interface AssociateOriginationIdentityRequest {
  PoolId: string;
  OriginationIdentity: string;
  IsoCountryCode?: string;
  ClientToken?: string;
}
export interface AssociateOriginationIdentityResult {
  PoolArn?: string;
  PoolId?: string;
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  IsoCountryCode?: string;
}
export type ProtectConfigurationIdOrArn = string;
export type ConfigurationSetNameOrArn = string;
export interface AssociateProtectConfigurationRequest {
  ProtectConfigurationId: string;
  ConfigurationSetName: string;
}
export type ConfigurationSetName = string;
export type ProtectConfigurationArn = string;
export type ProtectConfigurationId = string;
export interface AssociateProtectConfigurationResult {
  ConfigurationSetArn: string;
  ConfigurationSetName: string;
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
}
export type CarrierLookupInputPhoneNumberType = string;
export interface CarrierLookupRequest {
  PhoneNumber: string;
  EnableCleansing?: boolean;
}
export type E164PhoneNumberType = string;
export type DialingCountryCodeType = string;
export type MCCType = string;
export type MNCType = string;
export type PhoneNumberType = string;
export interface CarrierLookupResult {
  E164PhoneNumber: string;
  DialingCountryCode?: string;
  IsoCountryCode?: string;
  Country?: string;
  MCC?: string;
  MNC?: string;
  Carrier?: string;
  PhoneNumberType: string;
  OriginalPhoneNumber?: string;
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
  Tags?: Tag[];
  ClientToken?: string;
}
export interface CreateConfigurationSetResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  Tags?: Tag[];
  CreatedTimestamp?: Date;
}
export type EventDestinationName = string;
export type EventType = string;
export type EventTypeList = string[];
export type IamRoleArn = string;
export type LogGroupArn = string;
export interface CloudWatchLogsDestination {
  IamRoleArn: string;
  LogGroupArn: string;
}
export type DeliveryStreamArn = string;
export interface KinesisFirehoseDestination {
  IamRoleArn: string;
  DeliveryStreamArn: string;
}
export type SnsTopicArn = string;
export interface SnsDestination {
  TopicArn: string;
}
export interface CreateEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  MatchingEventTypes: string[];
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  SnsDestination?: SnsDestination;
  ClientToken?: string;
}
export interface EventDestination {
  EventDestinationName: string;
  Enabled: boolean;
  MatchingEventTypes: string[];
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  SnsDestination?: SnsDestination;
}
export interface CreateEventDestinationResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  EventDestination?: EventDestination;
}
export type NotifyConfigurationDisplayName = string;
export type NotifyConfigurationUseCase = string;
export type NotifyTemplateId = string;
export type IsoCountryCodeList = string[];
export type NumberCapability = string;
export type NotifyEnabledChannelsList = string[];
export interface CreateNotifyConfigurationRequest {
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  DeletionProtectionEnabled?: boolean;
  ClientToken?: string;
  Tags?: Tag[];
}
export type NotifyConfigurationArn = string;
export type NotifyConfigurationId = string;
export type NotifyConfigurationTier = string;
export type TierUpgradeStatus = string;
export type NotifyConfigurationStatus = string;
export interface CreateNotifyConfigurationResult {
  NotifyConfigurationArn: string;
  NotifyConfigurationId: string;
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  Tier: string;
  TierUpgradeStatus: string;
  Status: string;
  RejectionReason?: string;
  DeletionProtectionEnabled: boolean;
  Tags?: Tag[];
  CreatedTimestamp: Date;
}
export type OptOutListName = string;
export interface CreateOptOutListRequest {
  OptOutListName: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export interface CreateOptOutListResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  Tags?: Tag[];
  CreatedTimestamp?: Date;
}
export type MessageType = string;
export interface CreatePoolRequest {
  OriginationIdentity: string;
  IsoCountryCode?: string;
  MessageType: string;
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
  ClientToken?: string;
}
export type PoolStatus = string;
export type TwoWayChannelArn = string;
export interface CreatePoolResult {
  PoolArn?: string;
  PoolId?: string;
  Status?: string;
  MessageType?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  SharedRoutesEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
  CreatedTimestamp?: Date;
}
export interface CreateProtectConfigurationRequest {
  ClientToken?: string;
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
}
export interface CreateProtectConfigurationResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  CreatedTimestamp: Date;
  AccountDefault: boolean;
  DeletionProtectionEnabled: boolean;
  Tags?: Tag[];
}
export type OptOutListNameOrArn = string;
export interface CreateRcsAgentRequest {
  DeletionProtectionEnabled?: boolean;
  OptOutListName?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export type RcsAgentStatus = string;
export type TwoWayMediaS3BucketName = string;
export type TwoWayMediaS3KeyPrefix = string;
export type RcsEventType = string;
export type RcsEventTypeList = string[];
export interface CreateRcsAgentResult {
  RcsAgentArn: string;
  RcsAgentId: string;
  Status: string;
  DeletionProtectionEnabled: boolean;
  OptOutListName?: string;
  CreatedTimestamp: Date;
  SelfManagedOptOutsEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled: boolean;
  TwoWayMediaS3BucketName?: string;
  TwoWayMediaS3KeyPrefix?: string;
  TwoWayMediaS3Role?: string;
  TwoWayRcsEventsEnabled?: string[];
  Tags?: Tag[];
}
export type RegistrationType = string;
export interface CreateRegistrationRequest {
  RegistrationType: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export type RegistrationStatus = string;
export type RegistrationVersionNumber = number;
export type StringMap = { [key: string]: string | undefined };
export interface CreateRegistrationResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  RegistrationStatus: string;
  CurrentVersionNumber: number;
  AdditionalAttributes?: { [key: string]: string | undefined };
  Tags?: Tag[];
  CreatedTimestamp: Date;
}
export type RegistrationIdOrArn = string;
export type ResourceIdOrArn = string;
export interface CreateRegistrationAssociationRequest {
  RegistrationId: string;
  ResourceId: string;
}
export type PhoneNumber = string;
export interface CreateRegistrationAssociationResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  ResourceArn: string;
  ResourceId: string;
  ResourceType: string;
  IsoCountryCode?: string;
  PhoneNumber?: string;
}
export type AttachmentBody = Uint8Array;
export type AttachmentUrl = string;
export interface CreateRegistrationAttachmentRequest {
  AttachmentBody?: Uint8Array;
  AttachmentUrl?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export type AttachmentStatus = string;
export interface CreateRegistrationAttachmentResult {
  RegistrationAttachmentArn: string;
  RegistrationAttachmentId: string;
  AttachmentStatus: string;
  Tags?: Tag[];
  CreatedTimestamp: Date;
}
export interface CreateRegistrationVersionRequest {
  RegistrationId: string;
}
export type RegistrationVersionStatus = string;
export interface RegistrationVersionStatusHistory {
  DraftTimestamp: Date;
  SubmittedTimestamp?: Date;
  AwsReviewingTimestamp?: Date;
  ReviewingTimestamp?: Date;
  RequiresAuthenticationTimestamp?: Date;
  ApprovedTimestamp?: Date;
  DiscardedTimestamp?: Date;
  DeniedTimestamp?: Date;
  RevokedTimestamp?: Date;
  ArchivedTimestamp?: Date;
}
export interface CreateRegistrationVersionResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
}
export type RcsAgentIdOrArn = string;
export interface CreateVerifiedDestinationNumberRequest {
  DestinationPhoneNumber: string;
  RcsAgentId?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export type VerificationStatus = string;
export interface CreateVerifiedDestinationNumberResult {
  VerifiedDestinationNumberArn: string;
  VerifiedDestinationNumberId: string;
  DestinationPhoneNumber: string;
  Status: string;
  RcsAgentId?: string;
  Tags?: Tag[];
  CreatedTimestamp: Date;
}
export interface DeleteAccountDefaultProtectConfigurationRequest {}
export interface DeleteAccountDefaultProtectConfigurationResult {
  DefaultProtectConfigurationArn: string;
  DefaultProtectConfigurationId: string;
}
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export type EventDestinationList = EventDestination[];
export type SenderId = string;
export interface DeleteConfigurationSetResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  EventDestinations?: EventDestination[];
  DefaultMessageType?: string;
  DefaultSenderId?: string;
  DefaultMessageFeedbackEnabled?: boolean;
  CreatedTimestamp?: Date;
}
export interface DeleteDefaultMessageTypeRequest {
  ConfigurationSetName: string;
}
export interface DeleteDefaultMessageTypeResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  MessageType?: string;
}
export interface DeleteDefaultSenderIdRequest {
  ConfigurationSetName: string;
}
export interface DeleteDefaultSenderIdResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  SenderId?: string;
}
export interface DeleteEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export interface DeleteEventDestinationResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  EventDestination?: EventDestination;
}
export type PhoneOrPoolIdOrArn = string;
export type Keyword = string;
export interface DeleteKeywordRequest {
  OriginationIdentity: string;
  Keyword: string;
}
export type KeywordMessage = string;
export type KeywordAction = string;
export interface DeleteKeywordResult {
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  Keyword?: string;
  KeywordMessage?: string;
  KeywordAction?: string;
}
export interface DeleteMediaMessageSpendLimitOverrideRequest {}
export type MonthlyLimit = number;
export interface DeleteMediaMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export type NotifyConfigurationIdOrArn = string;
export interface DeleteNotifyConfigurationRequest {
  NotifyConfigurationId: string;
}
export interface DeleteNotifyConfigurationResult {
  NotifyConfigurationArn: string;
  NotifyConfigurationId: string;
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  Tier: string;
  TierUpgradeStatus: string;
  Status: string;
  RejectionReason?: string;
  DeletionProtectionEnabled: boolean;
  CreatedTimestamp: Date;
}
export interface DeleteNotifyMessageSpendLimitOverrideRequest {}
export interface DeleteNotifyMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export interface DeleteOptedOutNumberRequest {
  OptOutListName: string;
  OptedOutNumber: string;
}
export interface DeleteOptedOutNumberResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  OptedOutNumber?: string;
  OptedOutTimestamp?: Date;
  EndUserOptedOut?: boolean;
}
export interface DeleteOptOutListRequest {
  OptOutListName: string;
}
export interface DeleteOptOutListResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  CreatedTimestamp?: Date;
}
export interface DeletePoolRequest {
  PoolId: string;
}
export interface DeletePoolResult {
  PoolArn?: string;
  PoolId?: string;
  Status?: string;
  MessageType?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  SharedRoutesEnabled?: boolean;
  CreatedTimestamp?: Date;
}
export interface DeleteProtectConfigurationRequest {
  ProtectConfigurationId: string;
}
export interface DeleteProtectConfigurationResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  CreatedTimestamp: Date;
  AccountDefault: boolean;
  DeletionProtectionEnabled: boolean;
}
export interface DeleteProtectConfigurationRuleSetNumberOverrideRequest {
  ProtectConfigurationId: string;
  DestinationPhoneNumber: string;
}
export type ProtectConfigurationRuleOverrideAction = string;
export interface DeleteProtectConfigurationRuleSetNumberOverrideResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  DestinationPhoneNumber: string;
  CreatedTimestamp: Date;
  Action: string;
  IsoCountryCode?: string;
  ExpirationTimestamp?: Date;
}
export interface DeleteRcsAgentRequest {
  RcsAgentId: string;
}
export interface DeleteRcsAgentResult {
  RcsAgentArn: string;
  RcsAgentId: string;
  Status: string;
  CreatedTimestamp: Date;
  DeletionProtectionEnabled: boolean;
  OptOutListName?: string;
  SelfManagedOptOutsEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled: boolean;
  TwoWayRcsEventsEnabled?: string[];
}
export interface DeleteRcsMessageSpendLimitOverrideRequest {}
export interface DeleteRcsMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export interface DeleteRegistrationRequest {
  RegistrationId: string;
}
export interface DeleteRegistrationResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  RegistrationStatus: string;
  CurrentVersionNumber: number;
  ApprovedVersionNumber?: number;
  LatestDeniedVersionNumber?: number;
  AdditionalAttributes?: { [key: string]: string | undefined };
  CreatedTimestamp: Date;
}
export type RegistrationAttachmentIdOrArn = string;
export interface DeleteRegistrationAttachmentRequest {
  RegistrationAttachmentId: string;
}
export type AttachmentUploadErrorReason = string;
export interface DeleteRegistrationAttachmentResult {
  RegistrationAttachmentArn: string;
  RegistrationAttachmentId: string;
  AttachmentStatus: string;
  AttachmentUploadErrorReason?: string;
  CreatedTimestamp: Date;
}
export type FieldPath = string;
export interface DeleteRegistrationFieldValueRequest {
  RegistrationId: string;
  FieldPath: string;
}
export type SelectChoice = string;
export type SelectChoiceList = string[];
export type TextValue = string;
export interface DeleteRegistrationFieldValueResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  FieldPath: string;
  SelectChoices?: string[];
  TextValue?: string;
  RegistrationAttachmentId?: string;
}
export type AmazonResourceName = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export type ResourcePolicy = string;
export interface DeleteResourcePolicyResult {
  ResourceArn?: string;
  Policy?: string;
  CreatedTimestamp?: Date;
}
export interface DeleteTextMessageSpendLimitOverrideRequest {}
export interface DeleteTextMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export type VerifiedDestinationNumberIdOrArn = string;
export interface DeleteVerifiedDestinationNumberRequest {
  VerifiedDestinationNumberId: string;
}
export interface DeleteVerifiedDestinationNumberResult {
  VerifiedDestinationNumberArn: string;
  VerifiedDestinationNumberId: string;
  DestinationPhoneNumber: string;
  CreatedTimestamp: Date;
}
export interface DeleteVoiceMessageSpendLimitOverrideRequest {}
export interface DeleteVoiceMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export type NextToken = string;
export type MaxResults = number;
export interface DescribeAccountAttributesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type AccountAttributeName = string;
export interface AccountAttribute {
  Name: string;
  Value: string;
}
export type AccountAttributeList = AccountAttribute[];
export interface DescribeAccountAttributesResult {
  AccountAttributes?: AccountAttribute[];
  NextToken?: string;
}
export interface DescribeAccountLimitsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type AccountLimitName = string;
export interface AccountLimit {
  Name: string;
  Used: number;
  Max: number;
}
export type AccountLimitList = AccountLimit[];
export interface DescribeAccountLimitsResult {
  AccountLimits?: AccountLimit[];
  NextToken?: string;
}
export type ConfigurationSetNameList = string[];
export type ConfigurationSetFilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export interface ConfigurationSetFilter {
  Name: string;
  Values: string[];
}
export type ConfigurationSetFilterList = ConfigurationSetFilter[];
export interface DescribeConfigurationSetsRequest {
  ConfigurationSetNames?: string[];
  Filters?: ConfigurationSetFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ConfigurationSetInformation {
  ConfigurationSetArn: string;
  ConfigurationSetName: string;
  EventDestinations: EventDestination[];
  DefaultMessageType?: string;
  DefaultSenderId?: string;
  DefaultMessageFeedbackEnabled?: boolean;
  CreatedTimestamp: Date;
  ProtectConfigurationId?: string;
}
export type ConfigurationSetInformationList = ConfigurationSetInformation[];
export interface DescribeConfigurationSetsResult {
  ConfigurationSets?: ConfigurationSetInformation[];
  NextToken?: string;
}
export type KeywordList = string[];
export type KeywordFilterName = string;
export interface KeywordFilter {
  Name: string;
  Values: string[];
}
export type KeywordFilterList = KeywordFilter[];
export interface DescribeKeywordsRequest {
  OriginationIdentity: string;
  Keywords?: string[];
  Filters?: KeywordFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface KeywordInformation {
  Keyword: string;
  KeywordMessage: string;
  KeywordAction: string;
}
export type KeywordInformationList = KeywordInformation[];
export interface DescribeKeywordsResult {
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  Keywords?: KeywordInformation[];
  NextToken?: string;
}
export type NotifyConfigurationIdList = string[];
export type NotifyConfigurationFilterName = string;
export interface NotifyConfigurationFilter {
  Name: string;
  Values: string[];
}
export type NotifyConfigurationFilterList = NotifyConfigurationFilter[];
export interface DescribeNotifyConfigurationsRequest {
  NotifyConfigurationIds?: string[];
  Filters?: NotifyConfigurationFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface NotifyConfigurationInformation {
  NotifyConfigurationArn: string;
  NotifyConfigurationId: string;
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  Tier: string;
  TierUpgradeStatus: string;
  Status: string;
  RejectionReason?: string;
  DeletionProtectionEnabled: boolean;
  CreatedTimestamp: Date;
}
export type NotifyConfigurationInformationList = NotifyConfigurationInformation[];
export interface DescribeNotifyConfigurationsResult {
  NotifyConfigurations?: NotifyConfigurationInformation[];
  NextToken?: string;
}
export type NotifyTemplateIdList = string[];
export type NotifyTemplateFilterName = string;
export interface NotifyTemplateFilter {
  Name: string;
  Values: string[];
}
export type NotifyTemplateFilterList = NotifyTemplateFilter[];
export interface DescribeNotifyTemplatesRequest {
  TemplateIds?: string[];
  Filters?: NotifyTemplateFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export type NotifyTemplateVersion = number;
export type NotifyTemplateType = string;
export type NumberCapabilityList = string[];
export type NotifyConfigurationTierList = string[];
export type NotifyTemplateStatus = string;
export type NotifyLanguageCode = string;
export type TemplateContent = string;
export type TemplateVariableType = string;
export type TemplateVariableSource = string;
export interface TemplateVariableMetadata {
  Type: string;
  Required: boolean;
  Description?: string;
  MaxLength?: number;
  MinValue?: number;
  MaxValue?: number;
  DefaultValue?: string;
  Pattern?: string;
  Sample?: string;
  Source?: string;
}
export type TemplateVariablesMap = { [key: string]: TemplateVariableMetadata | undefined };
export type VoiceId = string;
export type VoiceIdList = string[];
export interface NotifyTemplateInformation {
  TemplateId: string;
  Version: number;
  TemplateType: string;
  Channels: string[];
  TierAccess?: string[];
  Status?: string;
  SupportedCountries?: string[];
  LanguageCode?: string;
  Content?: string;
  Variables?: { [key: string]: TemplateVariableMetadata | undefined };
  SupportedVoiceIds?: string[];
  CreatedTimestamp: Date;
}
export type NotifyTemplateInformationList = NotifyTemplateInformation[];
export interface DescribeNotifyTemplatesResult {
  NotifyTemplates?: NotifyTemplateInformation[];
  NextToken?: string;
}
export type OptedOutNumberList = string[];
export type OptedOutFilterName = string;
export interface OptedOutFilter {
  Name: string;
  Values: string[];
}
export type OptedOutFilterList = OptedOutFilter[];
export interface DescribeOptedOutNumbersRequest {
  OptOutListName: string;
  OptedOutNumbers?: string[];
  Filters?: OptedOutFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface OptedOutNumberInformation {
  OptedOutNumber: string;
  OptedOutTimestamp: Date;
  EndUserOptedOut: boolean;
}
export type OptedOutNumberInformationList = OptedOutNumberInformation[];
export interface DescribeOptedOutNumbersResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  OptedOutNumbers?: OptedOutNumberInformation[];
  NextToken?: string;
}
export type OptOutListNameList = string[];
export type Owner = string;
export interface DescribeOptOutListsRequest {
  OptOutListNames?: string[];
  NextToken?: string;
  MaxResults?: number;
  Owner?: string;
}
export interface OptOutListInformation {
  OptOutListArn: string;
  OptOutListName: string;
  CreatedTimestamp: Date;
}
export type OptOutListInformationList = OptOutListInformation[];
export interface DescribeOptOutListsResult {
  OptOutLists?: OptOutListInformation[];
  NextToken?: string;
}
export type PhoneNumberIdOrArn = string;
export type PhoneNumberIdList = string[];
export type PhoneNumberFilterName = string;
export interface PhoneNumberFilter {
  Name: string;
  Values: string[];
}
export type PhoneNumberFilterList = PhoneNumberFilter[];
export interface DescribePhoneNumbersRequest {
  PhoneNumberIds?: string[];
  Filters?: PhoneNumberFilter[];
  NextToken?: string;
  MaxResults?: number;
  Owner?: string;
}
export type NumberStatus = string;
export type NumberType = string;
export type LongMap = { [key: string]: number | undefined };
export interface MessagingLimits {
  RateLimits?: { [key: string]: number | undefined };
  DailyMessageCaps?: { [key: string]: number | undefined };
}
export interface PhoneNumberInformation {
  PhoneNumberArn: string;
  PhoneNumberId?: string;
  PhoneNumber: string;
  Status: string;
  IsoCountryCode: string;
  MessageType: string;
  NumberCapabilities: string[];
  NumberType: string;
  MonthlyLeasingPrice: string;
  TwoWayEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled: boolean;
  OptOutListName: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled: boolean;
  PoolId?: string;
  RegistrationId?: string;
  MessagingLimits?: MessagingLimits;
  CreatedTimestamp: Date;
}
export type PhoneNumberInformationList = PhoneNumberInformation[];
export interface DescribePhoneNumbersResult {
  PhoneNumbers?: PhoneNumberInformation[];
  NextToken?: string;
}
export type PoolIdList = string[];
export type PoolFilterName = string;
export interface PoolFilter {
  Name: string;
  Values: string[];
}
export type PoolFilterList = PoolFilter[];
export interface DescribePoolsRequest {
  PoolIds?: string[];
  Filters?: PoolFilter[];
  NextToken?: string;
  MaxResults?: number;
  Owner?: string;
}
export interface PoolInformation {
  PoolArn: string;
  PoolId: string;
  Status: string;
  MessageType: string;
  TwoWayEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled: boolean;
  OptOutListName: string;
  SharedRoutesEnabled: boolean;
  DeletionProtectionEnabled: boolean;
  CreatedTimestamp: Date;
}
export type PoolInformationList = PoolInformation[];
export interface DescribePoolsResult {
  Pools?: PoolInformation[];
  NextToken?: string;
}
export type ProtectConfigurationIdList = string[];
export type ProtectConfigurationFilterName = string;
export interface ProtectConfigurationFilter {
  Name: string;
  Values: string[];
}
export type ProtectConfigurationFilterList = ProtectConfigurationFilter[];
export interface DescribeProtectConfigurationsRequest {
  ProtectConfigurationIds?: string[];
  Filters?: ProtectConfigurationFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ProtectConfigurationInformation {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  CreatedTimestamp: Date;
  AccountDefault: boolean;
  DeletionProtectionEnabled: boolean;
}
export type ProtectConfigurationInformationList = ProtectConfigurationInformation[];
export interface DescribeProtectConfigurationsResult {
  ProtectConfigurations?: ProtectConfigurationInformation[];
  NextToken?: string;
}
export type CountryLaunchStatusFilterName = string;
export interface CountryLaunchStatusFilter {
  Name: string;
  Values: string[];
}
export type CountryLaunchStatusFilterList = CountryLaunchStatusFilter[];
export interface DescribeRcsAgentCountryLaunchStatusRequest {
  RcsAgentId: string;
  IsoCountryCodes?: string[];
  Filters?: CountryLaunchStatusFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type CountryLaunchStatus = string;
export type CarrierStatus = string;
export interface CarrierStatusInformation {
  CarrierName: string;
  Status: string;
}
export type CarrierStatusInformationList = CarrierStatusInformation[];
export interface CountryLaunchStatusInformation {
  IsoCountryCode: string;
  Status: string;
  RcsPlatformId?: string;
  RegistrationId: string;
  CarrierStatus: CarrierStatusInformation[];
}
export type CountryLaunchStatusInformationList = CountryLaunchStatusInformation[];
export interface DescribeRcsAgentCountryLaunchStatusResult {
  RcsAgentId: string;
  RcsAgentArn: string;
  CountryLaunchStatus?: CountryLaunchStatusInformation[];
  NextToken?: string;
}
export type RcsAgentIdList = string[];
export type RcsAgentFilterName = string;
export interface RcsAgentFilter {
  Name: string;
  Values: string[];
}
export type RcsAgentFilterList = RcsAgentFilter[];
export interface DescribeRcsAgentsRequest {
  RcsAgentIds?: string[];
  Owner?: string;
  Filters?: RcsAgentFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export type TestingAgentStatus = string;
export interface TestingAgentInformation {
  Status: string;
  TestingAgentId?: string;
  RegistrationId: string;
}
export interface RcsAgentInformation {
  RcsAgentArn: string;
  RcsAgentId: string;
  Status: string;
  CreatedTimestamp: Date;
  DeletionProtectionEnabled: boolean;
  OptOutListName?: string;
  SelfManagedOptOutsEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled: boolean;
  PoolId?: string;
  TwoWayMediaS3BucketName?: string;
  TwoWayMediaS3KeyPrefix?: string;
  TwoWayMediaS3Role?: string;
  TwoWayRcsEventsEnabled?: string[];
  TestingAgent?: TestingAgentInformation;
  MessagingLimits?: MessagingLimits;
}
export type RcsAgentInformationList = RcsAgentInformation[];
export interface DescribeRcsAgentsResult {
  RcsAgents?: RcsAgentInformation[];
  NextToken?: string;
}
export type RegistrationAttachmentIdList = string[];
export type RegistrationAttachmentFilterName = string;
export interface RegistrationAttachmentFilter {
  Name: string;
  Values: string[];
}
export type RegistrationAttachmentFilterList = RegistrationAttachmentFilter[];
export interface DescribeRegistrationAttachmentsRequest {
  RegistrationAttachmentIds?: string[];
  Filters?: RegistrationAttachmentFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface RegistrationAttachmentsInformation {
  RegistrationAttachmentArn: string;
  RegistrationAttachmentId: string;
  AttachmentStatus: string;
  AttachmentUploadErrorReason?: string;
  CreatedTimestamp: Date;
  AttachmentUrl?: string;
}
export type RegistrationAttachmentsInformationList = RegistrationAttachmentsInformation[];
export interface DescribeRegistrationAttachmentsResult {
  RegistrationAttachments: RegistrationAttachmentsInformation[];
  NextToken?: string;
}
export type SectionPath = string;
export type FieldPathList = string[];
export interface DescribeRegistrationFieldDefinitionsRequest {
  RegistrationType: string;
  SectionPath?: string;
  FieldPaths?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export type FieldType = string;
export type FieldRequirement = string;
export type StringList = string[];
export interface SelectValidation {
  MinChoices: number;
  MaxChoices: number;
  Options: string[];
}
export interface TextValidation {
  MinLength: number;
  MaxLength: number;
  Pattern: string;
}
export interface SelectOptionDescription {
  Option: string;
  Title?: string;
  Description?: string;
}
export type SelectOptionDescriptionsList = SelectOptionDescription[];
export interface RegistrationFieldDisplayHints {
  Title: string;
  ShortDescription: string;
  LongDescription?: string;
  DocumentationTitle?: string;
  DocumentationLink?: string;
  SelectOptionDescriptions?: SelectOptionDescription[];
  TextValidationDescription?: string;
  ExampleTextValue?: string;
}
export type ConditionOperator = string;
export type ConditionValue = string;
export type ConditionValueList = string[];
export interface FieldCondition {
  DependsOnFieldPath: string;
  Operator: string;
  Values?: string[];
}
export type FieldConditionList = FieldCondition[];
export type ConditionalFieldBehavior = string;
export interface ConditionalValidation {
  MinLength?: number;
  MaxLength?: number;
  Pattern?: string;
  AllowedValues?: string[];
}
export interface ConditionalRule {
  Conditions: FieldCondition[];
  RuleBehavior: string;
  ConditionalValidation?: ConditionalValidation;
}
export type ConditionalRuleList = ConditionalRule[];
export interface ConditionalBehavior {
  Rules: ConditionalRule[];
  DefaultBehavior: string;
}
export interface RegistrationFieldDefinition {
  SectionPath: string;
  FieldPath: string;
  FieldType: string;
  FieldRequirement: string;
  SelectValidation?: SelectValidation;
  TextValidation?: TextValidation;
  DisplayHints: RegistrationFieldDisplayHints;
  ConditionalBehavior?: ConditionalBehavior;
}
export type RegistrationFieldDefinitionList = RegistrationFieldDefinition[];
export interface DescribeRegistrationFieldDefinitionsResult {
  RegistrationType: string;
  RegistrationFieldDefinitions: RegistrationFieldDefinition[];
  NextToken?: string;
}
export interface DescribeRegistrationFieldValuesRequest {
  RegistrationId: string;
  VersionNumber?: number;
  SectionPath?: string;
  FieldPaths?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export interface RegistrationFieldValueInformation {
  FieldPath: string;
  SelectChoices?: string[];
  TextValue?: string;
  RegistrationAttachmentId?: string;
  DeniedReason?: string;
  Feedback?: string;
}
export type RegistrationFieldValueInformationList = RegistrationFieldValueInformation[];
export interface DescribeRegistrationFieldValuesResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  RegistrationFieldValues: RegistrationFieldValueInformation[];
  NextToken?: string;
}
export type RegistrationIdList = string[];
export type RegistrationFilterName = string;
export interface RegistrationFilter {
  Name: string;
  Values: string[];
}
export type RegistrationFilterList = RegistrationFilter[];
export interface DescribeRegistrationsRequest {
  RegistrationIds?: string[];
  Filters?: RegistrationFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface RegistrationInformation {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  RegistrationStatus: string;
  CurrentVersionNumber: number;
  ApprovedVersionNumber?: number;
  LatestDeniedVersionNumber?: number;
  AdditionalAttributes?: { [key: string]: string | undefined };
  CreatedTimestamp: Date;
}
export type RegistrationInformationList = RegistrationInformation[];
export interface DescribeRegistrationsResult {
  Registrations: RegistrationInformation[];
  NextToken?: string;
}
export type SectionPathList = string[];
export interface DescribeRegistrationSectionDefinitionsRequest {
  RegistrationType: string;
  SectionPaths?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export interface RegistrationSectionDisplayHints {
  Title: string;
  ShortDescription: string;
  LongDescription?: string;
  DocumentationTitle?: string;
  DocumentationLink?: string;
}
export interface RegistrationSectionDefinition {
  SectionPath: string;
  DisplayHints: RegistrationSectionDisplayHints;
}
export type RegistrationSectionDefinitionList = RegistrationSectionDefinition[];
export interface DescribeRegistrationSectionDefinitionsResult {
  RegistrationType: string;
  RegistrationSectionDefinitions: RegistrationSectionDefinition[];
  NextToken?: string;
}
export type RegistrationTypeList = string[];
export type RegistrationTypeFilterName = string;
export interface RegistrationTypeFilter {
  Name: string;
  Values: string[];
}
export type RegistrationTypeFilterList = RegistrationTypeFilter[];
export interface DescribeRegistrationTypeDefinitionsRequest {
  RegistrationTypes?: string[];
  Filters?: RegistrationTypeFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export type RegistrationAssociationBehavior = string;
export type RegistrationDisassociationBehavior = string;
export interface SupportedAssociation {
  ResourceType: string;
  IsoCountryCode?: string;
  AssociationBehavior: string;
  DisassociationBehavior: string;
}
export type SupportedAssociationList = SupportedAssociation[];
export interface RegistrationTypeDisplayHints {
  Title: string;
  ShortDescription?: string;
  LongDescription?: string;
  DocumentationTitle?: string;
  DocumentationLink?: string;
}
export interface RegistrationTypeDefinition {
  RegistrationType: string;
  SupportedAssociations?: SupportedAssociation[];
  DisplayHints: RegistrationTypeDisplayHints;
}
export type RegistrationTypeDefinitionList = RegistrationTypeDefinition[];
export interface DescribeRegistrationTypeDefinitionsResult {
  RegistrationTypeDefinitions: RegistrationTypeDefinition[];
  NextToken?: string;
}
export type RegistrationVersionNumberList = number[];
export type RegistrationVersionFilterName = string;
export interface RegistrationVersionFilter {
  Name: string;
  Values: string[];
}
export type RegistrationVersionFilterList = RegistrationVersionFilter[];
export interface DescribeRegistrationVersionsRequest {
  RegistrationId: string;
  VersionNumbers?: number[];
  Filters?: RegistrationVersionFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface RegistrationDeniedReasonInformation {
  Reason: string;
  ShortDescription: string;
  LongDescription?: string;
  DocumentationTitle?: string;
  DocumentationLink?: string;
}
export type RegistrationDeniedReasonInformationList = RegistrationDeniedReasonInformation[];
export interface RegistrationVersionInformation {
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
  DeniedReasons?: RegistrationDeniedReasonInformation[];
  Feedback?: string;
}
export type RegistrationVersionInformationList = RegistrationVersionInformation[];
export interface DescribeRegistrationVersionsResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationVersions: RegistrationVersionInformation[];
  NextToken?: string;
}
export type SenderIdOrArn = string;
export interface SenderIdAndCountry {
  SenderId: string;
  IsoCountryCode: string;
}
export type SenderIdList = SenderIdAndCountry[];
export type SenderIdFilterName = string;
export interface SenderIdFilter {
  Name: string;
  Values: string[];
}
export type SenderIdFilterList = SenderIdFilter[];
export interface DescribeSenderIdsRequest {
  SenderIds?: SenderIdAndCountry[];
  Filters?: SenderIdFilter[];
  NextToken?: string;
  MaxResults?: number;
  Owner?: string;
}
export type MessageTypeList = string[];
export interface SenderIdInformation {
  SenderIdArn: string;
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes: string[];
  MonthlyLeasingPrice: string;
  DeletionProtectionEnabled: boolean;
  Registered: boolean;
  RegistrationId?: string;
  MessagingLimits?: MessagingLimits;
}
export type SenderIdInformationList = SenderIdInformation[];
export interface DescribeSenderIdsResult {
  SenderIds?: SenderIdInformation[];
  NextToken?: string;
}
export interface DescribeSpendLimitsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type SpendLimitName = string;
export interface SpendLimit {
  Name: string;
  EnforcedLimit: number;
  MaxLimit: number;
  Overridden: boolean;
}
export type SpendLimitList = SpendLimit[];
export interface DescribeSpendLimitsResult {
  SpendLimits?: SpendLimit[];
  NextToken?: string;
}
export type VerifiedDestinationNumberIdList = string[];
export type DestinationPhoneNumberList = string[];
export type VerifiedDestinationNumberFilterName = string;
export interface VerifiedDestinationNumberFilter {
  Name: string;
  Values: string[];
}
export type VerifiedDestinationNumberFilterList = VerifiedDestinationNumberFilter[];
export interface DescribeVerifiedDestinationNumbersRequest {
  VerifiedDestinationNumberIds?: string[];
  DestinationPhoneNumbers?: string[];
  Filters?: VerifiedDestinationNumberFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface VerifiedDestinationNumberInformation {
  VerifiedDestinationNumberArn: string;
  VerifiedDestinationNumberId: string;
  DestinationPhoneNumber: string;
  Status: string;
  RcsAgentId?: string;
  CreatedTimestamp: Date;
}
export type VerifiedDestinationNumberInformationList = VerifiedDestinationNumberInformation[];
export interface DescribeVerifiedDestinationNumbersResult {
  VerifiedDestinationNumbers: VerifiedDestinationNumberInformation[];
  NextToken?: string;
}
export interface DisassociateOriginationIdentityRequest {
  PoolId: string;
  OriginationIdentity: string;
  IsoCountryCode?: string;
  ClientToken?: string;
}
export interface DisassociateOriginationIdentityResult {
  PoolArn?: string;
  PoolId?: string;
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  IsoCountryCode?: string;
}
export interface DisassociateProtectConfigurationRequest {
  ProtectConfigurationId: string;
  ConfigurationSetName: string;
}
export interface DisassociateProtectConfigurationResult {
  ConfigurationSetArn: string;
  ConfigurationSetName: string;
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
}
export interface DiscardRegistrationVersionRequest {
  RegistrationId: string;
}
export interface DiscardRegistrationVersionResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
}
export interface GetProtectConfigurationCountryRuleSetRequest {
  ProtectConfigurationId: string;
  NumberCapability: string;
}
export type ProtectStatus = string;
export interface ProtectConfigurationCountryRuleSetInformation {
  ProtectStatus: string;
}
export type ProtectConfigurationCountryRuleSet = {
  [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined;
};
export interface GetProtectConfigurationCountryRuleSetResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  NumberCapability: string;
  CountryRuleSet: { [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined };
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export interface GetResourcePolicyResult {
  ResourceArn?: string;
  Policy?: string;
  CreatedTimestamp?: Date;
}
export type SearchableNumberType = string;
export type PreferenceType = string;
export type PreferenceTypeList = string[];
export type NumberFilterValue = string;
export type NumberFilterList = string[];
export interface NumberPreferenceItem {
  PreferenceType: string[];
  Filter: string[];
}
export type NumberPreferenceList = NumberPreferenceItem[];
export type ListAvailablePhoneNumbersMaxResults = number;
export interface ListAvailablePhoneNumbersRequest {
  IsoCountryCode: string;
  NumberCapabilities: string[];
  NumberType: string;
  RegistrationId?: string;
  NumberPreference?: NumberPreferenceItem[];
  NextToken?: string;
  MaxResults?: number;
}
export type AvailablePhoneNumberList = string[];
export interface ListAvailablePhoneNumbersResult {
  AvailablePhoneNumbers: string[];
  NextToken?: string;
}
export type NotifyUseCaseList = string[];
export interface ListNotifyCountriesRequest {
  Channels?: string[];
  UseCases?: string[];
  Tier?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type NotifyTierList = string[];
export interface NotifyCountryInformation {
  IsoCountryCode: string;
  CountryName: string;
  SupportedChannels: string[];
  SupportedUseCases: string[];
  SupportedTiers: string[];
  CustomerOwnedIdentityRequired: boolean;
}
export type NotifyCountryInformationList = NotifyCountryInformation[];
export interface ListNotifyCountriesResult {
  NotifyCountries?: NotifyCountryInformation[];
  NextToken?: string;
}
export type PoolOriginationIdentitiesFilterName = string;
export interface PoolOriginationIdentitiesFilter {
  Name: string;
  Values: string[];
}
export type PoolOriginationIdentitiesFilterList = PoolOriginationIdentitiesFilter[];
export interface ListPoolOriginationIdentitiesRequest {
  PoolId: string;
  Filters?: PoolOriginationIdentitiesFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface OriginationIdentityMetadata {
  OriginationIdentityArn: string;
  OriginationIdentity: string;
  IsoCountryCode: string;
  NumberCapabilities: string[];
  PhoneNumber?: string;
}
export type OriginationIdentityMetadataList = OriginationIdentityMetadata[];
export interface ListPoolOriginationIdentitiesResult {
  PoolArn?: string;
  PoolId?: string;
  OriginationIdentities?: OriginationIdentityMetadata[];
  NextToken?: string;
}
export type ProtectConfigurationRuleSetNumberOverrideFilterName = string;
export interface ProtectConfigurationRuleSetNumberOverrideFilterItem {
  Name: string;
  Values: string[];
}
export type ListProtectConfigurationRuleSetNumberOverrideFilter =
  ProtectConfigurationRuleSetNumberOverrideFilterItem[];
export interface ListProtectConfigurationRuleSetNumberOverridesRequest {
  ProtectConfigurationId: string;
  Filters?: ProtectConfigurationRuleSetNumberOverrideFilterItem[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ProtectConfigurationRuleSetNumberOverride {
  DestinationPhoneNumber: string;
  CreatedTimestamp: Date;
  Action: string;
  IsoCountryCode?: string;
  ExpirationTimestamp?: Date;
}
export type ProtectConfigurationRuleSetNumberOverrideList =
  ProtectConfigurationRuleSetNumberOverride[];
export interface ListProtectConfigurationRuleSetNumberOverridesResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  RuleSetNumberOverrides?: ProtectConfigurationRuleSetNumberOverride[];
  NextToken?: string;
}
export type RegistrationAssociationFilterName = string;
export interface RegistrationAssociationFilter {
  Name: string;
  Values: string[];
}
export type RegistrationAssociationFilterList = RegistrationAssociationFilter[];
export interface ListRegistrationAssociationsRequest {
  RegistrationId: string;
  Filters?: RegistrationAssociationFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface RegistrationAssociationMetadata {
  ResourceArn: string;
  ResourceId: string;
  ResourceType: string;
  IsoCountryCode?: string;
  PhoneNumber?: string;
}
export type RegistrationAssociationMetadataList = RegistrationAssociationMetadata[];
export interface ListRegistrationAssociationsResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  RegistrationAssociations: RegistrationAssociationMetadata[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResult {
  ResourceArn?: string;
  Tags?: Tag[];
}
export interface PutKeywordRequest {
  OriginationIdentity: string;
  Keyword: string;
  KeywordMessage: string;
  KeywordAction?: string;
}
export interface PutKeywordResult {
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  Keyword?: string;
  KeywordMessage?: string;
  KeywordAction?: string;
}
export type MessageId = string;
export type MessageFeedbackStatus = string;
export interface PutMessageFeedbackRequest {
  MessageId: string;
  MessageFeedbackStatus: string;
}
export interface PutMessageFeedbackResult {
  MessageId: string;
  MessageFeedbackStatus: string;
}
export interface PutOptedOutNumberRequest {
  OptOutListName: string;
  OptedOutNumber: string;
}
export interface PutOptedOutNumberResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  OptedOutNumber?: string;
  OptedOutTimestamp?: Date;
  EndUserOptedOut?: boolean;
}
export interface PutProtectConfigurationRuleSetNumberOverrideRequest {
  ClientToken?: string;
  ProtectConfigurationId: string;
  DestinationPhoneNumber: string;
  Action: string;
  ExpirationTimestamp?: Date;
}
export interface PutProtectConfigurationRuleSetNumberOverrideResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  DestinationPhoneNumber: string;
  CreatedTimestamp: Date;
  Action: string;
  IsoCountryCode?: string;
  ExpirationTimestamp?: Date;
}
export interface PutRegistrationFieldValueRequest {
  RegistrationId: string;
  FieldPath: string;
  SelectChoices?: string[];
  TextValue?: string;
  RegistrationAttachmentId?: string;
}
export interface PutRegistrationFieldValueResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  FieldPath: string;
  SelectChoices?: string[];
  TextValue?: string;
  RegistrationAttachmentId?: string;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export interface PutResourcePolicyResult {
  ResourceArn?: string;
  Policy?: string;
  CreatedTimestamp?: Date;
}
export interface ReleasePhoneNumberRequest {
  PhoneNumberId: string;
}
export interface ReleasePhoneNumberResult {
  PhoneNumberArn?: string;
  PhoneNumberId?: string;
  PhoneNumber?: string;
  Status?: string;
  IsoCountryCode?: string;
  MessageType?: string;
  NumberCapabilities?: string[];
  NumberType?: string;
  MonthlyLeasingPrice?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  RegistrationId?: string;
  CreatedTimestamp?: Date;
}
export interface ReleaseSenderIdRequest {
  SenderId: string;
  IsoCountryCode: string;
}
export interface ReleaseSenderIdResult {
  SenderIdArn: string;
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes: string[];
  MonthlyLeasingPrice: string;
  Registered: boolean;
  RegistrationId?: string;
}
export type RequestableNumberType = string;
export interface RequestPhoneNumberRequest {
  IsoCountryCode: string;
  MessageType: string;
  NumberCapabilities: string[];
  NumberType: string;
  OptOutListName?: string;
  PoolId?: string;
  RegistrationId?: string;
  NumberPreference?: NumberPreferenceItem[];
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
  ClientToken?: string;
}
export interface RequestPhoneNumberResult {
  PhoneNumberArn?: string;
  PhoneNumberId?: string;
  PhoneNumber?: string;
  Status?: string;
  IsoCountryCode?: string;
  MessageType?: string;
  NumberCapabilities?: string[];
  NumberType?: string;
  MonthlyLeasingPrice?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  PoolId?: string;
  RegistrationId?: string;
  Tags?: Tag[];
  CreatedTimestamp?: Date;
}
export interface RequestSenderIdRequest {
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes?: string[];
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
  ClientToken?: string;
}
export interface RequestSenderIdResult {
  SenderIdArn: string;
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes: string[];
  MonthlyLeasingPrice: string;
  DeletionProtectionEnabled: boolean;
  Registered: boolean;
  Tags?: Tag[];
}
export type VerificationChannel = string;
export type LanguageCode = string;
export type VerificationMessageOriginationIdentity = string;
export type ContextKey = string;
export type ContextValue = string;
export type ContextMap = { [key: string]: string | undefined };
export type DestinationCountryParameterKey = string;
export type DestinationCountryParameterValue = string;
export type DestinationCountryParameters = { [key: string]: string | undefined };
export interface SendDestinationNumberVerificationCodeRequest {
  VerifiedDestinationNumberId: string;
  VerificationChannel: string;
  LanguageCode?: string;
  OriginationIdentity?: string;
  ConfigurationSetName?: string;
  Context?: { [key: string]: string | undefined };
  DestinationCountryParameters?: { [key: string]: string | undefined };
}
export interface SendDestinationNumberVerificationCodeResult {
  MessageId: string;
}
export type MediaMessageOriginationIdentity = string;
export type TextMessageBody = string;
export type MediaUrlValue = string;
export type MediaUrlList = string[];
export type MaxPrice = string;
export type TimeToLive = number;
export interface SendMediaMessageRequest {
  DestinationPhoneNumber: string;
  OriginationIdentity: string;
  MessageBody?: string;
  MediaUrls?: string[];
  ConfigurationSetName?: string;
  MaxPrice?: string;
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  DryRun?: boolean;
  ProtectConfigurationId?: string;
  MessageFeedbackEnabled?: boolean;
}
export interface SendMediaMessageResult {
  MessageId?: string;
}
export type TemplateVariableName = string;
export type TemplateVariableValue = string;
export type TemplateVariableSubstitutionMap = { [key: string]: string | undefined };
export interface SendNotifyTextMessageRequest {
  NotifyConfigurationId: string;
  DestinationPhoneNumber: string;
  TemplateId?: string;
  TemplateVariables: { [key: string]: string | undefined };
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  ConfigurationSetName?: string;
  DryRun?: boolean;
  MessageFeedbackEnabled?: boolean;
}
export interface SendNotifyTextMessageResult {
  MessageId?: string;
  TemplateId?: string;
  ResolvedMessageBody?: string;
}
export interface SendNotifyVoiceMessageRequest {
  NotifyConfigurationId: string;
  DestinationPhoneNumber: string;
  TemplateId?: string;
  TemplateVariables: { [key: string]: string | undefined };
  VoiceId?: string;
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  ConfigurationSetName?: string;
  DryRun?: boolean;
  MessageFeedbackEnabled?: boolean;
}
export interface SendNotifyVoiceMessageResult {
  MessageId?: string;
  TemplateId?: string;
  ResolvedMessageBody?: string;
}
export type RcsMessageOriginationIdentity = string;
export type RcsTextBody = string;
export interface RcsTextMessage {
  Body: string;
}
export type RcsMediaUrl = string;
export interface RcsFileMessage {
  FileUrl: string;
  ThumbnailUrl?: string;
}
export type RcsCardTitle = string;
export type RcsCardDescription = string;
export interface RcsCardMedia {
  FileUrl: string;
  ThumbnailUrl?: string;
  Height?: string;
}
export type RcsSuggestedActionText = string;
export type RcsPostbackData = string;
export interface RcsReplyAction {
  Text: string;
  PostbackData: string;
}
export type RcsOpenUrlValue = string;
export interface RcsOpenUrlAction {
  Text: string;
  PostbackData: string;
  Url: string;
  Application?: string;
  WebviewViewMode?: string;
}
export interface RcsDialPhoneAction {
  Text: string;
  PostbackData: string;
  PhoneNumber: string;
}
export type RcsLocationLabel = string;
export interface RcsShowLocationAction {
  Text: string;
  PostbackData: string;
  Latitude: number;
  Longitude: number;
  Label?: string;
}
export interface RcsRequestLocationAction {
  Text: string;
  PostbackData: string;
}
export type RcsCalendarEventTitle = string;
export type RcsCalendarEventDescription = string;
export interface RcsCreateCalendarEventAction {
  Text: string;
  PostbackData: string;
  Title: string;
  StartTime: Date;
  EndTime: Date;
  Description?: string;
}
export type RcsSuggestedAction =
  | {
      Reply: RcsReplyAction;
      OpenUrl?: never;
      DialPhone?: never;
      ShowLocation?: never;
      RequestLocation?: never;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl: RcsOpenUrlAction;
      DialPhone?: never;
      ShowLocation?: never;
      RequestLocation?: never;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl?: never;
      DialPhone: RcsDialPhoneAction;
      ShowLocation?: never;
      RequestLocation?: never;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl?: never;
      DialPhone?: never;
      ShowLocation: RcsShowLocationAction;
      RequestLocation?: never;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl?: never;
      DialPhone?: never;
      ShowLocation?: never;
      RequestLocation: RcsRequestLocationAction;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl?: never;
      DialPhone?: never;
      ShowLocation?: never;
      RequestLocation?: never;
      CreateCalendarEvent: RcsCreateCalendarEventAction;
    };
export type RcsCardSuggestedActionList = RcsSuggestedAction[];
export interface RcsCardContent {
  Title?: string;
  Description?: string;
  Media?: RcsCardMedia;
  Suggestions?: RcsSuggestedAction[];
}
export interface RcsStandaloneCard {
  CardOrientation: string;
  ThumbnailImageAlignment?: string;
  CardContent: RcsCardContent;
}
export interface RcsCarouselCardMedia {
  FileUrl: string;
  ThumbnailUrl?: string;
  Height?: string;
}
export interface RcsCarouselCardContent {
  Title?: string;
  Description?: string;
  Media?: RcsCarouselCardMedia;
  Suggestions?: RcsSuggestedAction[];
}
export type RcsCarouselCardContentList = RcsCarouselCardContent[];
export interface RcsCarousel {
  CardWidth: string;
  CardContents: RcsCarouselCardContent[];
}
export type RcsContent =
  | { TextMessage: RcsTextMessage; FileMessage?: never; RichCard?: never; Carousel?: never }
  | { TextMessage?: never; FileMessage: RcsFileMessage; RichCard?: never; Carousel?: never }
  | { TextMessage?: never; FileMessage?: never; RichCard: RcsStandaloneCard; Carousel?: never }
  | { TextMessage?: never; FileMessage?: never; RichCard?: never; Carousel: RcsCarousel };
export type RcsSuggestedActionList = RcsSuggestedAction[];
export interface RcsMessageContent {
  Content: RcsContent;
  Suggestions?: RcsSuggestedAction[];
}
export type RcsTimeToLive = number;
export type RcsMessageTrafficType = string;
export type RcsFallbackChannel = string;
export type RcsFallbackMessageBody = string;
export type RcsFallbackOriginationIdentity = string;
export interface RcsFallbackConfiguration {
  Channel: string;
  MessageBody?: string;
  MediaUrls?: string[];
  OriginationIdentity?: string;
}
export interface SendRcsMessageRequest {
  DestinationPhoneNumber: string;
  OriginationIdentity: string;
  RcsMessageContent?: RcsMessageContent;
  TimeToLive?: number;
  MessageTrafficType?: string;
  FallbackConfiguration?: RcsFallbackConfiguration;
  ProtectConfigurationId?: string;
  ConfigurationSetName?: string;
  MaxPrice?: string;
  DryRun?: boolean;
  Context?: { [key: string]: string | undefined };
  MessageFeedbackEnabled?: boolean;
}
export interface SendRcsMessageResult {
  MessageId?: string;
}
export type TextMessageOriginationIdentity = string;
export interface SendTextMessageRequest {
  DestinationPhoneNumber: string;
  OriginationIdentity?: string;
  MessageBody?: string;
  MessageType?: string;
  Keyword?: string;
  ConfigurationSetName?: string;
  MaxPrice?: string;
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  DestinationCountryParameters?: { [key: string]: string | undefined };
  DryRun?: boolean;
  ProtectConfigurationId?: string;
  MessageFeedbackEnabled?: boolean;
}
export interface SendTextMessageResult {
  MessageId?: string;
}
export type VoiceMessageOriginationIdentity = string;
export type VoiceMessageBody = string;
export type VoiceMessageBodyTextType = string;
export interface SendVoiceMessageRequest {
  DestinationPhoneNumber: string;
  OriginationIdentity: string;
  MessageBody?: string;
  MessageBodyTextType?: string;
  VoiceId?: string;
  ConfigurationSetName?: string;
  MaxPricePerMinute?: string;
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  DryRun?: boolean;
  ProtectConfigurationId?: string;
  MessageFeedbackEnabled?: boolean;
}
export interface SendVoiceMessageResult {
  MessageId?: string;
}
export interface SetAccountDefaultProtectConfigurationRequest {
  ProtectConfigurationId: string;
}
export interface SetAccountDefaultProtectConfigurationResult {
  DefaultProtectConfigurationArn: string;
  DefaultProtectConfigurationId: string;
}
export interface SetDefaultMessageFeedbackEnabledRequest {
  ConfigurationSetName: string;
  MessageFeedbackEnabled: boolean;
}
export interface SetDefaultMessageFeedbackEnabledResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  MessageFeedbackEnabled?: boolean;
}
export interface SetDefaultMessageTypeRequest {
  ConfigurationSetName: string;
  MessageType: string;
}
export interface SetDefaultMessageTypeResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  MessageType?: string;
}
export interface SetDefaultSenderIdRequest {
  ConfigurationSetName: string;
  SenderId: string;
}
export interface SetDefaultSenderIdResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  SenderId?: string;
}
export interface SetMediaMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export interface SetMediaMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export interface SetNotifyMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export interface SetNotifyMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export interface SetRcsMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export interface SetRcsMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export interface SetTextMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export interface SetTextMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export interface SetVoiceMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export interface SetVoiceMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export interface SubmitRegistrationVersionRequest {
  RegistrationId: string;
  AwsReview?: boolean;
}
export interface SubmitRegistrationVersionResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
  AwsReview: boolean;
}
export type NonEmptyTagList = Tag[];
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResult {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResult {}
export interface UpdateEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  Enabled?: boolean;
  MatchingEventTypes?: string[];
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  SnsDestination?: SnsDestination;
}
export interface UpdateEventDestinationResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  EventDestination?: EventDestination;
}
export type NotifyPoolIdOrUnset = string;
export interface UpdateNotifyConfigurationRequest {
  NotifyConfigurationId: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels?: string[];
  DeletionProtectionEnabled?: boolean;
}
export interface UpdateNotifyConfigurationResult {
  NotifyConfigurationArn: string;
  NotifyConfigurationId: string;
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  Tier: string;
  TierUpgradeStatus: string;
  Status: string;
  RejectionReason?: string;
  DeletionProtectionEnabled: boolean;
  CreatedTimestamp: Date;
}
export interface UpdatePhoneNumberRequest {
  PhoneNumberId: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
}
export interface UpdatePhoneNumberResult {
  PhoneNumberArn?: string;
  PhoneNumberId?: string;
  PhoneNumber?: string;
  Status?: string;
  IsoCountryCode?: string;
  MessageType?: string;
  NumberCapabilities?: string[];
  NumberType?: string;
  MonthlyLeasingPrice?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  RegistrationId?: string;
  CreatedTimestamp?: Date;
}
export interface UpdatePoolRequest {
  PoolId: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  SharedRoutesEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
}
export interface UpdatePoolResult {
  PoolArn?: string;
  PoolId?: string;
  Status?: string;
  MessageType?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  SharedRoutesEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
}
export interface UpdateProtectConfigurationRequest {
  ProtectConfigurationId: string;
  DeletionProtectionEnabled?: boolean;
}
export interface UpdateProtectConfigurationResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  CreatedTimestamp: Date;
  AccountDefault: boolean;
  DeletionProtectionEnabled: boolean;
}
export interface UpdateProtectConfigurationCountryRuleSetRequest {
  ProtectConfigurationId: string;
  NumberCapability: string;
  CountryRuleSetUpdates: {
    [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined;
  };
}
export interface UpdateProtectConfigurationCountryRuleSetResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  NumberCapability: string;
  CountryRuleSet: { [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined };
}
export type TwoWayMediaS3BucketNameOrUnset = string;
export type IamRoleArnOrUnset = string;
export interface UpdateRcsAgentRequest {
  RcsAgentId: string;
  DeletionProtectionEnabled?: boolean;
  OptOutListName?: string;
  SelfManagedOptOutsEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled?: boolean;
  TwoWayMediaS3BucketName?: string;
  TwoWayMediaS3KeyPrefix?: string;
  TwoWayMediaS3Role?: string;
  TwoWayRcsEventsEnabled?: string[];
}
export interface UpdateRcsAgentResult {
  RcsAgentArn: string;
  RcsAgentId: string;
  Status: string;
  CreatedTimestamp: Date;
  DeletionProtectionEnabled: boolean;
  OptOutListName?: string;
  SelfManagedOptOutsEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled: boolean;
  TwoWayMediaS3BucketName?: string;
  TwoWayMediaS3KeyPrefix?: string;
  TwoWayMediaS3Role?: string;
  TwoWayRcsEventsEnabled?: string[];
}
export interface UpdateSenderIdRequest {
  SenderId: string;
  IsoCountryCode: string;
  DeletionProtectionEnabled?: boolean;
}
export interface UpdateSenderIdResult {
  SenderIdArn: string;
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes: string[];
  MonthlyLeasingPrice: string;
  DeletionProtectionEnabled: boolean;
  Registered: boolean;
  RegistrationId?: string;
}
export type VerificationCode = string;
export interface VerifyDestinationNumberRequest {
  VerifiedDestinationNumberId: string;
  VerificationCode: string;
}
export interface VerifyDestinationNumberResult {
  VerifiedDestinationNumberArn: string;
  VerifiedDestinationNumberId: string;
  DestinationPhoneNumber: string;
  Status: string;
  CreatedTimestamp: Date;
}
export type AccessDeniedExceptionReason = string;
export type ConflictExceptionReason = string;
export type ResourceType = string;
export type ServiceQuotaExceededExceptionReason = string;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateOriginationIdentityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified origination identity with a pool.
 *
 * If the origination identity is a phone number and is already associated with another pool, an error is returned. A sender ID can be associated with multiple pools.
 *
 * If the origination identity configuration doesn't match the pool's configuration, an error is returned.
 */
export const associateOriginationIdentity: API.OperationMethod<
  AssociateOriginationIdentityRequest,
  AssociateOriginationIdentityResult,
  AssociateOriginationIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<AssociateOriginationIdentityRequest>,
  output: __S(3264, __c102, 0) as any as S.Schema<AssociateOriginationIdentityResult>,
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
  operationName: "AssociateOriginationIdentity",
}));

export type AssociateProtectConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a protect configuration with a configuration set. This replaces the configuration sets current protect configuration. A configuration set can only be associated with one protect configuration at a time. A protect configuration can be associated with multiple configuration sets.
 */
export const associateProtectConfiguration: API.OperationMethod<
  AssociateProtectConfigurationRequest,
  AssociateProtectConfigurationResult,
  AssociateProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<AssociateProtectConfigurationRequest>,
  output: __S(3712, __c116, 0) as any as S.Schema<AssociateProtectConfigurationResult>,
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
  operationName: "AssociateProtectConfiguration",
}));

export type CarrierLookupError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a destination phone number, including whether the number type and whether it is valid, the carrier, and more.
 */
export const carrierLookup: API.OperationMethod<
  CarrierLookupRequest,
  CarrierLookupResult,
  CarrierLookupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<CarrierLookupRequest>,
  output: __S(4065, __c127, 1) as any as S.Schema<CarrierLookupResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CarrierLookup",
}));

export type CreateConfigurationSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new configuration set. After you create the configuration set, you can add one or more event destinations to it.
 *
 * A configuration set is a set of rules that you apply to the SMS and voice messages that you send.
 *
 * When you send a message, you can optionally specify a single configuration set.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResult,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateConfigurationSetRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateConfigurationSetResult>,
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
  operationName: "CreateConfigurationSet",
}));

export type CreateEventDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new event destination in a configuration set.
 *
 * An event destination is a location where you send message events. The event options are Amazon CloudWatch, Amazon Data Firehose, or Amazon SNS. For example, when a message is delivered successfully, you can send information about that event to an event destination, or send notifications to endpoints that are subscribed to an Amazon SNS topic.
 *
 * You can only create one event destination at a time. You must provide a value for a single event destination using either `CloudWatchLogsDestination`, `KinesisFirehoseDestination` or `SnsDestination`. If an event destination isn't provided then an exception is returned.
 *
 * Each configuration set can contain between 0 and 5 event destinations. Each event destination can contain a reference to a single destination, such as a CloudWatch or Firehose destination.
 */
export const createEventDestination: API.OperationMethod<
  CreateEventDestinationRequest,
  CreateEventDestinationResult,
  CreateEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<CreateEventDestinationRequest>,
  output: __S(512, __c16, 0) as any as S.Schema<CreateEventDestinationResult>,
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
  operationName: "CreateEventDestination",
}));

export type CreateNotifyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new notify configuration for managed messaging. A notify configuration defines the settings for sending templated messages, including the display name, use case, enabled channels, and enabled countries.
 */
export const createNotifyConfiguration: API.OperationMethod<
  CreateNotifyConfigurationRequest,
  CreateNotifyConfigurationResult,
  CreateNotifyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<CreateNotifyConfigurationRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<CreateNotifyConfigurationResult>,
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
  operationName: "CreateNotifyConfiguration",
}));

export type CreateOptOutListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new opt-out list.
 *
 * If the opt-out list name already exists, an error is returned.
 *
 * An opt-out list is a list of phone numbers that are opted out, meaning you can't send SMS or voice messages to them. If end user replies with the keyword "STOP," an entry for the phone number is added to the opt-out list. In addition to STOP, your recipients can use any supported opt-out keyword, such as CANCEL or OPTOUT. For a list of supported opt-out keywords, see SMS opt out in the End User Messaging SMS User Guide.
 */
export const createOptOutList: API.OperationMethod<
  CreateOptOutListRequest,
  CreateOptOutListResult,
  CreateOptOutListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<CreateOptOutListRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<CreateOptOutListResult>,
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
  operationName: "CreateOptOutList",
}));

export type CreatePoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new pool and associates the specified origination identity to the pool. A pool can include one or more phone numbers and SenderIds that are associated with your Amazon Web Services account.
 *
 * The new pool inherits its configuration from the specified origination identity. This includes keywords, message type, opt-out list, two-way configuration, and self-managed opt-out configuration. Deletion protection isn't inherited from the origination identity and defaults to false.
 *
 * If the origination identity is a phone number and is already associated with another pool, an error is returned. A sender ID can be associated with multiple pools.
 */
export const createPool: API.OperationMethod<
  CreatePoolRequest,
  CreatePoolResult,
  CreatePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<CreatePoolRequest>,
  output: __S(833, __c26, 1) as any as S.Schema<CreatePoolResult>,
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
  operationName: "CreatePool",
}));

export type CreateProtectConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new protect configuration. By default all country rule sets for each capability are set to `ALLOW`. Update the country rule sets using `UpdateProtectConfigurationCountryRuleSet`. A protect configurations name is stored as a Tag with the key set to `Name` and value as the name of the protect configuration.
 */
export const createProtectConfiguration: API.OperationMethod<
  CreateProtectConfigurationRequest,
  CreateProtectConfigurationResult,
  CreateProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<CreateProtectConfigurationRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<CreateProtectConfigurationResult>,
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
  operationName: "CreateProtectConfiguration",
}));

export type CreateRcsAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new RCS agent for sending rich messages through the RCS channel. The RCS agent serves as an origination identity for sending RCS messages to your recipients.
 */
export const createRcsAgent: API.OperationMethod<
  CreateRcsAgentRequest,
  CreateRcsAgentResult,
  CreateRcsAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<CreateRcsAgentRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<CreateRcsAgentResult>,
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
  operationName: "CreateRcsAgent",
}));

export type CreateRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new registration based on the **RegistrationType** field.
 */
export const createRegistration: API.OperationMethod<
  CreateRegistrationRequest,
  CreateRegistrationResult,
  CreateRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<CreateRegistrationRequest>,
  output: __S(929, __c29, 1) as any as S.Schema<CreateRegistrationResult>,
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
  operationName: "CreateRegistration",
}));

export type CreateRegistrationAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate the registration with an origination identity such as a phone number or sender ID.
 */
export const createRegistrationAssociation: API.OperationMethod<
  CreateRegistrationAssociationRequest,
  CreateRegistrationAssociationResult,
  CreateRegistrationAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<CreateRegistrationAssociationRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<CreateRegistrationAssociationResult>,
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
  operationName: "CreateRegistrationAssociation",
}));

export type CreateRegistrationAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new registration attachment to use for uploading a file or a URL to a file. The maximum file size is 5MB and valid file extensions are PDF, JPEG and PNG. For example, many sender ID registrations require a signed "letter of authorization" (LOA) to be submitted.
 *
 * Use either `AttachmentUrl` or `AttachmentBody` to upload your attachment. If both are specified then an exception is returned.
 */
export const createRegistrationAttachment: API.OperationMethod<
  CreateRegistrationAttachmentRequest,
  CreateRegistrationAttachmentResult,
  CreateRegistrationAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<CreateRegistrationAttachmentRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<CreateRegistrationAttachmentResult>,
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
  operationName: "CreateRegistrationAttachment",
}));

export type CreateRegistrationVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new version of the registration and increase the **VersionNumber**. The previous version of the registration becomes read-only.
 */
export const createRegistrationVersion: API.OperationMethod<
  CreateRegistrationVersionRequest,
  CreateRegistrationVersionResult,
  CreateRegistrationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<CreateRegistrationVersionRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<CreateRegistrationVersionResult>,
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
  operationName: "CreateRegistrationVersion",
}));

export type CreateVerifiedDestinationNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can only send messages to verified destination numbers when your account is in the sandbox. You can add up to 10 verified destination numbers.
 */
export const createVerifiedDestinationNumber: API.OperationMethod<
  CreateVerifiedDestinationNumberRequest,
  CreateVerifiedDestinationNumberResult,
  CreateVerifiedDestinationNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<CreateVerifiedDestinationNumberRequest>,
  output: __S(1153, __c36, 1) as any as S.Schema<CreateVerifiedDestinationNumberResult>,
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
  operationName: "CreateVerifiedDestinationNumber",
}));

export type DeleteAccountDefaultProtectConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the current account default protect configuration.
 */
export const deleteAccountDefaultProtectConfiguration: API.OperationMethod<
  DeleteAccountDefaultProtectConfigurationRequest,
  DeleteAccountDefaultProtectConfigurationResult,
  DeleteAccountDefaultProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<DeleteAccountDefaultProtectConfigurationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteAccountDefaultProtectConfigurationResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountDefaultProtectConfiguration",
}));

export type DeleteConfigurationSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing configuration set.
 *
 * A configuration set is a set of rules that you apply to voice and SMS messages that you send. In a configuration set, you can specify a destination for specific types of events related to voice and SMS messages.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResult,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<DeleteConfigurationSetRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<DeleteConfigurationSetResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

export type DeleteDefaultMessageTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing default message type on a configuration set.
 *
 * A message type is a type of messages that you plan to send. If you send account-related messages or time-sensitive messages such as one-time passcodes, choose **Transactional**. If you plan to send messages that contain marketing material or other promotional content, choose **Promotional**. This setting applies to your entire Amazon Web Services account.
 */
export const deleteDefaultMessageType: API.OperationMethod<
  DeleteDefaultMessageTypeRequest,
  DeleteDefaultMessageTypeResult,
  DeleteDefaultMessageTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteDefaultMessageTypeRequest>,
  output: __S(1344, __c42, 0) as any as S.Schema<DeleteDefaultMessageTypeResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDefaultMessageType",
}));

export type DeleteDefaultSenderIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing default sender ID on a configuration set.
 *
 * A default sender ID is the identity that appears on recipients' devices when they receive SMS messages. Support for sender ID capabilities varies by country or region.
 */
export const deleteDefaultSenderId: API.OperationMethod<
  DeleteDefaultSenderIdRequest,
  DeleteDefaultSenderIdResult,
  DeleteDefaultSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<DeleteDefaultSenderIdRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DeleteDefaultSenderIdResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDefaultSenderId",
}));

export type DeleteEventDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing event destination.
 *
 * An event destination is a location where you send response information about the messages that you send. For example, when a message is delivered successfully, you can send information about that event to an Amazon CloudWatch destination, or send notifications to endpoints that are subscribed to an Amazon SNS topic.
 */
export const deleteEventDestination: API.OperationMethod<
  DeleteEventDestinationRequest,
  DeleteEventDestinationResult,
  DeleteEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<DeleteEventDestinationRequest>,
  output: __S(512, __c16, 0) as any as S.Schema<DeleteEventDestinationResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventDestination",
}));

export type DeleteKeywordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing keyword from an origination phone number or pool.
 *
 * A keyword is a word that you can search for on a particular phone number or pool. It is also a specific word or phrase that an end user can send to your number to elicit a response, such as an informational message or a special offer. When your number receives a message that begins with a keyword, End User Messaging SMS responds with a customizable message.
 *
 * Keywords "HELP" and "STOP" can't be deleted or modified.
 */
export const deleteKeyword: API.OperationMethod<
  DeleteKeywordRequest,
  DeleteKeywordResult,
  DeleteKeywordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<DeleteKeywordRequest>,
  output: __S(1504, __c47, 0) as any as S.Schema<DeleteKeywordResult>,
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
  operationName: "DeleteKeyword",
}));

export type DeleteMediaMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account-level monthly spending limit override for sending multimedia messages (MMS). Deleting a spend limit override will set the `EnforcedLimit` to equal the `MaxLimit`, which is controlled by Amazon Web Services. For more information on spend limits (quotas) see Quotas for Server Migration Service in the *Server Migration Service User Guide*.
 */
export const deleteMediaMessageSpendLimitOverride: API.OperationMethod<
  DeleteMediaMessageSpendLimitOverrideRequest,
  DeleteMediaMessageSpendLimitOverrideResult,
  DeleteMediaMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<DeleteMediaMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteMediaMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaMessageSpendLimitOverride",
}));

export type DeleteNotifyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing notify configuration.
 *
 * If deletion protection is enabled, an error is returned.
 */
export const deleteNotifyConfiguration: API.OperationMethod<
  DeleteNotifyConfigurationRequest,
  DeleteNotifyConfigurationResult,
  DeleteNotifyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<DeleteNotifyConfigurationRequest>,
  output: __S(1632, __c51, 0) as any as S.Schema<DeleteNotifyConfigurationResult>,
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
  operationName: "DeleteNotifyConfiguration",
}));

export type DeleteNotifyMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account-level monthly spending limit override for sending notify messages. Deleting a spend limit override will set the `EnforcedLimit` to equal the `MaxLimit`, which is controlled by Amazon Web Services. For more information on spend limits (quotas) see Quotas in the *End User Messaging SMS User Guide*.
 */
export const deleteNotifyMessageSpendLimitOverride: API.OperationMethod<
  DeleteNotifyMessageSpendLimitOverrideRequest,
  DeleteNotifyMessageSpendLimitOverrideResult,
  DeleteNotifyMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<DeleteNotifyMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteNotifyMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotifyMessageSpendLimitOverride",
}));

export type DeleteOptedOutNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing opted out destination phone number from the specified opt-out list.
 *
 * Each destination phone number can only be deleted once every 30 days.
 *
 * If the specified destination phone number doesn't exist or if the opt-out list doesn't exist, an error is returned.
 */
export const deleteOptedOutNumber: API.OperationMethod<
  DeleteOptedOutNumberRequest,
  DeleteOptedOutNumberResult,
  DeleteOptedOutNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<DeleteOptedOutNumberRequest>,
  output: __S(1728, __c54, 0) as any as S.Schema<DeleteOptedOutNumberResult>,
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
  operationName: "DeleteOptedOutNumber",
}));

export type DeleteOptOutListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing opt-out list. All opted out phone numbers in the opt-out list are deleted.
 *
 * If the specified opt-out list name doesn't exist or is in-use by an origination phone number or pool, an error is returned.
 */
export const deleteOptOutList: API.OperationMethod<
  DeleteOptOutListRequest,
  DeleteOptOutListResult,
  DeleteOptOutListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<DeleteOptOutListRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<DeleteOptOutListResult>,
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
  operationName: "DeleteOptOutList",
}));

export type DeletePoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing pool. Deleting a pool disassociates all origination identities from that pool.
 *
 * If the pool status isn't active or if deletion protection is enabled, an error is returned.
 *
 * A pool is a collection of phone numbers and SenderIds. A pool can include one or more phone numbers and SenderIds that are associated with your Amazon Web Services account.
 */
export const deletePool: API.OperationMethod<
  DeletePoolRequest,
  DeletePoolResult,
  DeletePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<DeletePoolRequest>,
  output: __S(1793, __c56, 1) as any as S.Schema<DeletePoolResult>,
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
  operationName: "DeletePool",
}));

export type DeleteProtectConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently delete the protect configuration. The protect configuration must have deletion protection disabled and must not be associated as the account default protect configuration or associated with a configuration set.
 */
export const deleteProtectConfiguration: API.OperationMethod<
  DeleteProtectConfigurationRequest,
  DeleteProtectConfigurationResult,
  DeleteProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<DeleteProtectConfigurationRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<DeleteProtectConfigurationResult>,
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
  operationName: "DeleteProtectConfiguration",
}));

export type DeleteProtectConfigurationRuleSetNumberOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently delete the protect configuration rule set number override.
 */
export const deleteProtectConfigurationRuleSetNumberOverride: API.OperationMethod<
  DeleteProtectConfigurationRuleSetNumberOverrideRequest,
  DeleteProtectConfigurationRuleSetNumberOverrideResult,
  DeleteProtectConfigurationRuleSetNumberOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1888,
    __c59,
    0,
  ) as any as S.Schema<DeleteProtectConfigurationRuleSetNumberOverrideRequest>,
  output: __S(
    1920,
    __c60,
    0,
  ) as any as S.Schema<DeleteProtectConfigurationRuleSetNumberOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProtectConfigurationRuleSetNumberOverride",
}));

export type DeleteRcsAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing RCS agent. If deletion protection is enabled, an error is returned.
 */
export const deleteRcsAgent: API.OperationMethod<
  DeleteRcsAgentRequest,
  DeleteRcsAgentResult,
  DeleteRcsAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<DeleteRcsAgentRequest>,
  output: __S(1953, __c61, 1) as any as S.Schema<DeleteRcsAgentResult>,
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
  operationName: "DeleteRcsAgent",
}));

export type DeleteRcsMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account-level monthly spending limit override for sending RCS messages. Deleting a spend limit override sets the `EnforcedLimit` to equal the `MaxLimit`, which is set by Amazon Web Services.
 */
export const deleteRcsMessageSpendLimitOverride: API.OperationMethod<
  DeleteRcsMessageSpendLimitOverrideRequest,
  DeleteRcsMessageSpendLimitOverrideResult,
  DeleteRcsMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<DeleteRcsMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteRcsMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRcsMessageSpendLimitOverride",
}));

export type DeleteRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently delete an existing registration from your account.
 */
export const deleteRegistration: API.OperationMethod<
  DeleteRegistrationRequest,
  DeleteRegistrationResult,
  DeleteRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<DeleteRegistrationRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteRegistrationResult>,
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
  operationName: "DeleteRegistration",
}));

export type DeleteRegistrationAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently delete the specified registration attachment.
 */
export const deleteRegistrationAttachment: API.OperationMethod<
  DeleteRegistrationAttachmentRequest,
  DeleteRegistrationAttachmentResult,
  DeleteRegistrationAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<DeleteRegistrationAttachmentRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<DeleteRegistrationAttachmentResult>,
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
  operationName: "DeleteRegistrationAttachment",
}));

export type DeleteRegistrationFieldValueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the value in a registration form field.
 */
export const deleteRegistrationFieldValue: API.OperationMethod<
  DeleteRegistrationFieldValueRequest,
  DeleteRegistrationFieldValueResult,
  DeleteRegistrationFieldValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<DeleteRegistrationFieldValueRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<DeleteRegistrationFieldValueResult>,
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
  operationName: "DeleteRegistrationFieldValue",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy document attached to the End User Messaging SMS resource. A shared resource can be a Pool, Opt-out list, Sender Id, or Phone number.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResult,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<DeleteResourcePolicyResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteTextMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account-level monthly spending limit override for sending text messages. Deleting a spend limit override will set the `EnforcedLimit` to equal the `MaxLimit`, which is controlled by Amazon Web Services. For more information on spend limits (quotas) see Quotas in the *End User Messaging SMS User Guide*.
 */
export const deleteTextMessageSpendLimitOverride: API.OperationMethod<
  DeleteTextMessageSpendLimitOverrideRequest,
  DeleteTextMessageSpendLimitOverrideResult,
  DeleteTextMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<DeleteTextMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteTextMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTextMessageSpendLimitOverride",
}));

export type DeleteVerifiedDestinationNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a verified destination phone number.
 */
export const deleteVerifiedDestinationNumber: API.OperationMethod<
  DeleteVerifiedDestinationNumberRequest,
  DeleteVerifiedDestinationNumberResult,
  DeleteVerifiedDestinationNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<DeleteVerifiedDestinationNumberRequest>,
  output: __S(2273, __c71, 1) as any as S.Schema<DeleteVerifiedDestinationNumberResult>,
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
  operationName: "DeleteVerifiedDestinationNumber",
}));

export type DeleteVoiceMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account level monthly spend limit override for sending voice messages. Deleting a spend limit override sets the `EnforcedLimit` equal to the `MaxLimit`, which is controlled by Amazon Web Services. For more information on spending limits (quotas) see Quotas in the *End User Messaging SMS User Guide*.
 */
export const deleteVoiceMessageSpendLimitOverride: API.OperationMethod<
  DeleteVoiceMessageSpendLimitOverrideRequest,
  DeleteVoiceMessageSpendLimitOverrideResult,
  DeleteVoiceMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<DeleteVoiceMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteVoiceMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceMessageSpendLimitOverride",
}));

export type DescribeAccountAttributesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes attributes of your Amazon Web Services account. The supported account attributes include account tier, which indicates whether your account is in the sandbox or production environment. When you're ready to move your account out of the sandbox, create an Amazon Web Services Support case for a service limit increase request.
 *
 * New accounts are placed into an SMS or voice sandbox. The sandbox protects both Amazon Web Services end recipients and SMS or voice recipients from fraud and abuse.
 */
export const describeAccountAttributes: API.PaginatedOperationMethod<
  DescribeAccountAttributesRequest,
  DescribeAccountAttributesResult,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient,
  AccountAttribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<DescribeAccountAttributesRequest>,
  output: __S(2339, __c73, 3) as any as S.Schema<DescribeAccountAttributesResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAttributes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAccountLimitsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the current End User Messaging SMS SMS Voice V2 resource quotas for your account. The description for a quota includes the quota name, current usage toward that quota, and the quota's maximum value.
 *
 * When you establish an Amazon Web Services account, the account has initial quotas on the maximum number of configuration sets, opt-out lists, phone numbers, and pools that you can create in a given Region. For more information see Quotas in the *End User Messaging SMS User Guide*.
 */
export const describeAccountLimits: API.PaginatedOperationMethod<
  DescribeAccountLimitsRequest,
  DescribeAccountLimitsResult,
  DescribeAccountLimitsError,
  Credentials | HttpClient.HttpClient,
  AccountLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<DescribeAccountLimitsRequest>,
  output: __S(2371, __c74, 3) as any as S.Schema<DescribeAccountLimitsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountLimits",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeConfigurationSetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified configuration sets or all in your account.
 *
 * If you specify configuration set names, the output includes information for only the specified configuration sets. If you specify filters, the output includes information for only those configuration sets that meet the filter criteria. If you don't specify configuration set names or filters, the output includes information for all configuration sets.
 *
 * If you specify a configuration set name that isn't valid, an error is returned.
 */
export const describeConfigurationSets: API.PaginatedOperationMethod<
  DescribeConfigurationSetsRequest,
  DescribeConfigurationSetsResult,
  DescribeConfigurationSetsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationSetInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<DescribeConfigurationSetsRequest>,
  output: __S(2403, __c75, 3) as any as S.Schema<DescribeConfigurationSetsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationSets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeKeywordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified keywords or all keywords on your origination phone number or pool.
 *
 * A keyword is a word that you can search for on a particular phone number or pool. It is also a specific word or phrase that an end user can send to your number to elicit a response, such as an informational message or a special offer. When your number receives a message that begins with a keyword, End User Messaging SMS responds with a customizable message.
 *
 * If you specify a keyword that isn't valid, an error is returned.
 */
export const describeKeywords: API.PaginatedOperationMethod<
  DescribeKeywordsRequest,
  DescribeKeywordsResult,
  DescribeKeywordsError,
  Credentials | HttpClient.HttpClient,
  KeywordInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<DescribeKeywordsRequest>,
  output: __S(2467, __c77, 3) as any as S.Schema<DescribeKeywordsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeywords",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Keywords",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeNotifyConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified notify configurations or all notify configurations in your account.
 *
 * If you specify notify configuration IDs, the output includes information for only the specified notify configurations. If you specify filters, the output includes information for only those notify configurations that meet the filter criteria. If you don't specify notify configuration IDs or filters, the output includes information for all notify configurations.
 *
 * If you specify a notify configuration ID that isn't valid, an error is returned.
 */
export const describeNotifyConfigurations: API.PaginatedOperationMethod<
  DescribeNotifyConfigurationsRequest,
  DescribeNotifyConfigurationsResult,
  DescribeNotifyConfigurationsError,
  Credentials | HttpClient.HttpClient,
  NotifyConfigurationInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<DescribeNotifyConfigurationsRequest>,
  output: __S(2498, __c78, 2) as any as S.Schema<DescribeNotifyConfigurationsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotifyConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotifyConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeNotifyTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified notify templates or all notify templates in your account.
 *
 * If you specify template IDs, the output includes information for only the specified notify templates. If you specify filters, the output includes information for only those notify templates that meet the filter criteria. If you don't specify template IDs or filters, the output includes information for all notify templates.
 *
 * If you specify a template ID that isn't valid, an error is returned.
 */
export const describeNotifyTemplates: API.PaginatedOperationMethod<
  DescribeNotifyTemplatesRequest,
  DescribeNotifyTemplatesResult,
  DescribeNotifyTemplatesError,
  Credentials | HttpClient.HttpClient,
  NotifyTemplateInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<DescribeNotifyTemplatesRequest>,
  output: __S(2533, __c79, 5) as any as S.Schema<DescribeNotifyTemplatesResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotifyTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotifyTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeOptedOutNumbersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified opted out destination numbers or all opted out destination numbers in an opt-out list.
 *
 * If you specify opted out numbers, the output includes information for only the specified opted out numbers. If you specify filters, the output includes information for only those opted out numbers that meet the filter criteria. If you don't specify opted out numbers or filters, the output includes information for all opted out destination numbers in your opt-out list.
 *
 * If you specify an opted out number that isn't valid, an exception is returned.
 */
export const describeOptedOutNumbers: API.PaginatedOperationMethod<
  DescribeOptedOutNumbersRequest,
  DescribeOptedOutNumbersResult,
  DescribeOptedOutNumbersError,
  Credentials | HttpClient.HttpClient,
  OptedOutNumberInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<DescribeOptedOutNumbersRequest>,
  output: __S(2563, __c80, 3) as any as S.Schema<DescribeOptedOutNumbersResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOptedOutNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OptedOutNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeOptOutListsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified opt-out list or all opt-out lists in your account.
 *
 * If you specify opt-out list names, the output includes information for only the specified opt-out lists. Opt-out lists include only those that meet the filter criteria. If you don't specify opt-out list names or filters, the output includes information for all opt-out lists.
 *
 * If you specify an opt-out list name that isn't valid, an error is returned.
 */
export const describeOptOutLists: API.PaginatedOperationMethod<
  DescribeOptOutListsRequest,
  DescribeOptOutListsResult,
  DescribeOptOutListsError,
  Credentials | HttpClient.HttpClient,
  OptOutListInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<DescribeOptOutListsRequest>,
  output: __S(2595, __c81, 3) as any as S.Schema<DescribeOptOutListsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOptOutLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OptOutLists",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePhoneNumbersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified origination phone number, or all the phone numbers in your account.
 *
 * If you specify phone number IDs, the output includes information for only the specified phone numbers. If you specify filters, the output includes information for only those phone numbers that meet the filter criteria. If you don't specify phone number IDs or filters, the output includes information for all phone numbers.
 *
 * If you specify a phone number ID that isn't valid, an error is returned.
 */
export const describePhoneNumbers: API.PaginatedOperationMethod<
  DescribePhoneNumbersRequest,
  DescribePhoneNumbersResult,
  DescribePhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  PhoneNumberInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<DescribePhoneNumbersRequest>,
  output: __S(2627, __c82, 3) as any as S.Schema<DescribePhoneNumbersResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PhoneNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePoolsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified pools or all pools associated with your Amazon Web Services account.
 *
 * If you specify pool IDs, the output includes information for only the specified pools. If you specify filters, the output includes information for only those pools that meet the filter criteria. If you don't specify pool IDs or filters, the output includes information for all pools.
 *
 * If you specify a pool ID that isn't valid, an error is returned.
 *
 * A pool is a collection of phone numbers and SenderIds. A pool can include one or more phone numbers and SenderIds that are associated with your Amazon Web Services account.
 */
export const describePools: API.PaginatedOperationMethod<
  DescribePoolsRequest,
  DescribePoolsResult,
  DescribePoolsError,
  Credentials | HttpClient.HttpClient,
  PoolInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<DescribePoolsRequest>,
  output: __S(2691, __c84, 3) as any as S.Schema<DescribePoolsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Pools",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeProtectConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the protect configurations that match any of filters. If a filter isn't provided then all protect configurations are returned.
 */
export const describeProtectConfigurations: API.PaginatedOperationMethod<
  DescribeProtectConfigurationsRequest,
  DescribeProtectConfigurationsResult,
  DescribeProtectConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ProtectConfigurationInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<DescribeProtectConfigurationsRequest>,
  output: __S(2722, __c85, 2) as any as S.Schema<DescribeProtectConfigurationsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProtectConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProtectConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRcsAgentCountryLaunchStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the per-country launch status of an RCS agent, including carrier-level details for each country.
 */
export const describeRcsAgentCountryLaunchStatus: API.PaginatedOperationMethod<
  DescribeRcsAgentCountryLaunchStatusRequest,
  DescribeRcsAgentCountryLaunchStatusResult,
  DescribeRcsAgentCountryLaunchStatusError,
  Credentials | HttpClient.HttpClient,
  CountryLaunchStatusInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<DescribeRcsAgentCountryLaunchStatusRequest>,
  output: __S(2757, __c86, 5) as any as S.Schema<DescribeRcsAgentCountryLaunchStatusResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRcsAgentCountryLaunchStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CountryLaunchStatus",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRcsAgentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified RCS agents or all RCS agents associated with your Amazon Web Services account.
 *
 * If you specify RCS agent IDs, the output includes information for only the specified RCS agents. If you specify filters, the output includes information for only those RCS agents that meet the filter criteria. If you don't specify RCS agent IDs or filters, the output includes information for all RCS agents.
 */
export const describeRcsAgents: API.PaginatedOperationMethod<
  DescribeRcsAgentsRequest,
  DescribeRcsAgentsResult,
  DescribeRcsAgentsError,
  Credentials | HttpClient.HttpClient,
  RcsAgentInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<DescribeRcsAgentsRequest>,
  output: __S(2788, __c87, 4) as any as S.Schema<DescribeRcsAgentsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRcsAgents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RcsAgents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationAttachmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration attachments or all registration attachments associated with your Amazon Web Services account.
 */
export const describeRegistrationAttachments: API.PaginatedOperationMethod<
  DescribeRegistrationAttachmentsRequest,
  DescribeRegistrationAttachmentsResult,
  DescribeRegistrationAttachmentsError,
  Credentials | HttpClient.HttpClient,
  RegistrationAttachmentsInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<DescribeRegistrationAttachmentsRequest>,
  output: __S(2819, __c88, 3) as any as S.Schema<DescribeRegistrationAttachmentsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationAttachments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationFieldDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration type field definitions. You can use DescribeRegistrationFieldDefinitions to view the requirements for creating, filling out, and submitting each registration type.
 */
export const describeRegistrationFieldDefinitions: API.PaginatedOperationMethod<
  DescribeRegistrationFieldDefinitionsRequest,
  DescribeRegistrationFieldDefinitionsResult,
  DescribeRegistrationFieldDefinitionsError,
  Credentials | HttpClient.HttpClient,
  RegistrationFieldDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<DescribeRegistrationFieldDefinitionsRequest>,
  output: __S(2862, __c89, 14) as any as S.Schema<DescribeRegistrationFieldDefinitionsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationFieldDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationFieldDefinitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationFieldValuesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration field values.
 */
export const describeRegistrationFieldValues: API.PaginatedOperationMethod<
  DescribeRegistrationFieldValuesRequest,
  DescribeRegistrationFieldValuesResult,
  DescribeRegistrationFieldValuesError,
  Credentials | HttpClient.HttpClient,
  RegistrationFieldValueInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<DescribeRegistrationFieldValuesRequest>,
  output: __S(2915, __c91, 3) as any as S.Schema<DescribeRegistrationFieldValuesResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationFieldValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationFieldValues",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registrations.
 */
export const describeRegistrations: API.PaginatedOperationMethod<
  DescribeRegistrationsRequest,
  DescribeRegistrationsResult,
  DescribeRegistrationsError,
  Credentials | HttpClient.HttpClient,
  RegistrationInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<DescribeRegistrationsRequest>,
  output: __S(2946, __c92, 2) as any as S.Schema<DescribeRegistrationsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Registrations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationSectionDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration section definitions. You can use DescribeRegistrationSectionDefinitions to view the requirements for creating, filling out, and submitting each registration type.
 */
export const describeRegistrationSectionDefinitions: API.PaginatedOperationMethod<
  DescribeRegistrationSectionDefinitionsRequest,
  DescribeRegistrationSectionDefinitionsResult,
  DescribeRegistrationSectionDefinitionsError,
  Credentials | HttpClient.HttpClient,
  RegistrationSectionDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<DescribeRegistrationSectionDefinitionsRequest>,
  output: __S(2980, __c93, 4) as any as S.Schema<DescribeRegistrationSectionDefinitionsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationSectionDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationSectionDefinitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationTypeDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration type definitions. You can use DescribeRegistrationTypeDefinitions to view the requirements for creating, filling out, and submitting each registration type.
 */
export const describeRegistrationTypeDefinitions: API.PaginatedOperationMethod<
  DescribeRegistrationTypeDefinitionsRequest,
  DescribeRegistrationTypeDefinitionsResult,
  DescribeRegistrationTypeDefinitionsError,
  Credentials | HttpClient.HttpClient,
  RegistrationTypeDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<DescribeRegistrationTypeDefinitionsRequest>,
  output: __S(3014, __c94, 6) as any as S.Schema<DescribeRegistrationTypeDefinitionsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationTypeDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationTypeDefinitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration version.
 */
export const describeRegistrationVersions: API.PaginatedOperationMethod<
  DescribeRegistrationVersionsRequest,
  DescribeRegistrationVersionsResult,
  DescribeRegistrationVersionsError,
  Credentials | HttpClient.HttpClient,
  RegistrationVersionInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3041, __c95, 1) as any as S.Schema<DescribeRegistrationVersionsRequest>,
  output: __S(3046, __c95, 6) as any as S.Schema<DescribeRegistrationVersionsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSenderIdsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified SenderIds or all SenderIds associated with your Amazon Web Services account.
 *
 * If you specify SenderIds, the output includes information for only the specified SenderIds. If you specify filters, the output includes information for only those SenderIds that meet the filter criteria. If you don't specify SenderIds or filters, the output includes information for all SenderIds.
 *
 * f you specify a sender ID that isn't valid, an error is returned.
 */
export const describeSenderIds: API.PaginatedOperationMethod<
  DescribeSenderIdsRequest,
  DescribeSenderIdsResult,
  DescribeSenderIdsError,
  Credentials | HttpClient.HttpClient,
  SenderIdInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3074, __c96, 2) as any as S.Schema<DescribeSenderIdsRequest>,
  output: __S(3077, __c96, 5) as any as S.Schema<DescribeSenderIdsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSenderIds",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SenderIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSpendLimitsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the current monthly spend limits for sending voice and text messages.
 *
 * When you establish an Amazon Web Services account, the account has initial monthly spend limit in a given Region. For more information on increasing your monthly spend limit, see Requesting increases to your monthly SMS, MMS, or Voice spending quota in the *End User Messaging SMS User Guide*.
 */
export const describeSpendLimits: API.PaginatedOperationMethod<
  DescribeSpendLimitsRequest,
  DescribeSpendLimitsResult,
  DescribeSpendLimitsError,
  Credentials | HttpClient.HttpClient,
  SpendLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<DescribeSpendLimitsRequest>,
  output: __S(3107, __c97, 3) as any as S.Schema<DescribeSpendLimitsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSpendLimits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SpendLimits",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeVerifiedDestinationNumbersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified verified destination numbers.
 */
export const describeVerifiedDestinationNumbers: API.PaginatedOperationMethod<
  DescribeVerifiedDestinationNumbersRequest,
  DescribeVerifiedDestinationNumbersResult,
  DescribeVerifiedDestinationNumbersError,
  Credentials | HttpClient.HttpClient,
  VerifiedDestinationNumberInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<DescribeVerifiedDestinationNumbersRequest>,
  output: __S(3139, __c98, 3) as any as S.Schema<DescribeVerifiedDestinationNumbersResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVerifiedDestinationNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VerifiedDestinationNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateOriginationIdentityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified origination identity from an existing pool.
 *
 * If the origination identity isn't associated with the specified pool, an error is returned.
 */
export const disassociateOriginationIdentity: API.OperationMethod<
  DisassociateOriginationIdentityRequest,
  DisassociateOriginationIdentityResult,
  DisassociateOriginationIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<DisassociateOriginationIdentityRequest>,
  output: __S(3264, __c102, 0) as any as S.Schema<DisassociateOriginationIdentityResult>,
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
  operationName: "DisassociateOriginationIdentity",
}));

export type DisassociateProtectConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociate a protect configuration from a configuration set.
 */
export const disassociateProtectConfiguration: API.OperationMethod<
  DisassociateProtectConfigurationRequest,
  DisassociateProtectConfigurationResult,
  DisassociateProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<DisassociateProtectConfigurationRequest>,
  output: __S(3712, __c116, 0) as any as S.Schema<DisassociateProtectConfigurationResult>,
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
  operationName: "DisassociateProtectConfiguration",
}));

export type DiscardRegistrationVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Discard the current version of the registration.
 */
export const discardRegistrationVersion: API.OperationMethod<
  DiscardRegistrationVersionRequest,
  DiscardRegistrationVersionResult,
  DiscardRegistrationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<DiscardRegistrationVersionRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DiscardRegistrationVersionResult>,
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
  operationName: "DiscardRegistrationVersion",
}));

export type GetProtectConfigurationCountryRuleSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve the CountryRuleSet for the specified NumberCapability from a protect configuration.
 */
export const getProtectConfigurationCountryRuleSet: API.OperationMethod<
  GetProtectConfigurationCountryRuleSetRequest,
  GetProtectConfigurationCountryRuleSetResult,
  GetProtectConfigurationCountryRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<GetProtectConfigurationCountryRuleSetRequest>,
  output: __S(3362, __c105, 2) as any as S.Schema<GetProtectConfigurationCountryRuleSetResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProtectConfigurationCountryRuleSet",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the JSON text of the resource-based policy document attached to the End User Messaging SMS resource. A shared resource can be a Pool, Opt-out list, Sender Id, or Phone number.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResult,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<GetResourcePolicyResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListAvailablePhoneNumbersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of phone numbers that are available to request, based on the country, capabilities, and number type that you specify. You can optionally provide a number preference to return only numbers that match a specific digit pattern.
 *
 * If no numbers match your search, this operation returns an empty list rather than an error. This operation currently supports only `TEN_DLC` number types in the `US`.
 */
export const listAvailablePhoneNumbers: API.PaginatedOperationMethod<
  ListAvailablePhoneNumbersRequest,
  ListAvailablePhoneNumbersResult,
  ListAvailablePhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  PhoneNumber
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<ListAvailablePhoneNumbersRequest>,
  output: __S(3425, __c107, 1) as any as S.Schema<ListAvailablePhoneNumbersResult>,
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
  operationName: "ListAvailablePhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AvailablePhoneNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotifyCountriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists countries that support notify messaging. You can optionally filter by channel, use case, or tier.
 */
export const listNotifyCountries: API.PaginatedOperationMethod<
  ListNotifyCountriesRequest,
  ListNotifyCountriesResult,
  ListNotifyCountriesError,
  Credentials | HttpClient.HttpClient,
  NotifyCountryInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<ListNotifyCountriesRequest>,
  output: __S(3491, __c109, 3) as any as S.Schema<ListNotifyCountriesResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotifyCountries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotifyCountries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoolOriginationIdentitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all associated origination identities in your pool.
 *
 * If you specify filters, the output includes information for only those origination identities that meet the filter criteria.
 */
export const listPoolOriginationIdentities: API.PaginatedOperationMethod<
  ListPoolOriginationIdentitiesRequest,
  ListPoolOriginationIdentitiesResult,
  ListPoolOriginationIdentitiesError,
  Credentials | HttpClient.HttpClient,
  OriginationIdentityMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<ListPoolOriginationIdentitiesRequest>,
  output: __S(3523, __c110, 3) as any as S.Schema<ListPoolOriginationIdentitiesResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPoolOriginationIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OriginationIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProtectConfigurationRuleSetNumberOverridesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve all of the protect configuration rule set number overrides that match the filters.
 */
export const listProtectConfigurationRuleSetNumberOverrides: API.PaginatedOperationMethod<
  ListProtectConfigurationRuleSetNumberOverridesRequest,
  ListProtectConfigurationRuleSetNumberOverridesResult,
  ListProtectConfigurationRuleSetNumberOverridesError,
  Credentials | HttpClient.HttpClient,
  ProtectConfigurationRuleSetNumberOverride
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(
    3552,
    __c111,
    0,
  ) as any as S.Schema<ListProtectConfigurationRuleSetNumberOverridesRequest>,
  output: __S(
    3555,
    __c111,
    3,
  ) as any as S.Schema<ListProtectConfigurationRuleSetNumberOverridesResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtectConfigurationRuleSetNumberOverrides",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleSetNumberOverrides",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegistrationAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve all of the origination identities that are associated with a registration.
 */
export const listRegistrationAssociations: API.PaginatedOperationMethod<
  ListRegistrationAssociationsRequest,
  ListRegistrationAssociationsResult,
  ListRegistrationAssociationsError,
  Credentials | HttpClient.HttpClient,
  RegistrationAssociationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<ListRegistrationAssociationsRequest>,
  output: __S(3587, __c112, 3) as any as S.Schema<ListRegistrationAssociationsResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistrationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationAssociations",
    pageSize: "MaxResults",
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
 * List all tags associated with a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(3617, __c113, 1) as any as S.Schema<ListTagsForResourceResult>,
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

export type PutKeywordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a keyword configuration on an origination phone number or pool.
 *
 * A keyword is a word that you can search for on a particular phone number or pool. It is also a specific word or phrase that an end user can send to your number to elicit a response, such as an informational message or a special offer. When your number receives a message that begins with a keyword, End User Messaging SMS responds with a customizable message.
 *
 * If you specify a keyword that isn't valid, an error is returned.
 */
export const putKeyword: API.OperationMethod<
  PutKeywordRequest,
  PutKeywordResult,
  PutKeywordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<PutKeywordRequest>,
  output: __S(1504, __c47, 0) as any as S.Schema<PutKeywordResult>,
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
  operationName: "PutKeyword",
}));

export type PutMessageFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the MessageFeedbackStatus as `RECEIVED` or `FAILED` for the passed in MessageId.
 *
 * If you use message feedback then you must update message feedback record. When you receive a signal that a user has received the message you must use `PutMessageFeedback` to set the message feedback record as `RECEIVED`; Otherwise, an hour after the message feedback record is set to `FAILED`.
 */
export const putMessageFeedback: API.OperationMethod<
  PutMessageFeedbackRequest,
  PutMessageFeedbackResult,
  PutMessageFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<PutMessageFeedbackRequest>,
  output: __S(3745, __c117, 1) as any as S.Schema<PutMessageFeedbackResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMessageFeedback",
}));

export type PutOptedOutNumberError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an opted out destination phone number in the opt-out list.
 *
 * If the destination phone number isn't valid or if the specified opt-out list doesn't exist, an error is returned.
 */
export const putOptedOutNumber: API.OperationMethod<
  PutOptedOutNumberRequest,
  PutOptedOutNumberResult,
  PutOptedOutNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<PutOptedOutNumberRequest>,
  output: __S(1728, __c54, 0) as any as S.Schema<PutOptedOutNumberResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutOptedOutNumber",
}));

export type PutProtectConfigurationRuleSetNumberOverrideError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create or update a phone number rule override and associate it with a protect configuration.
 */
export const putProtectConfigurationRuleSetNumberOverride: API.OperationMethod<
  PutProtectConfigurationRuleSetNumberOverrideRequest,
  PutProtectConfigurationRuleSetNumberOverrideResult,
  PutProtectConfigurationRuleSetNumberOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    3808,
    __c119,
    0,
  ) as any as S.Schema<PutProtectConfigurationRuleSetNumberOverrideRequest>,
  output: __S(
    1920,
    __c60,
    0,
  ) as any as S.Schema<PutProtectConfigurationRuleSetNumberOverrideResult>,
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
  operationName: "PutProtectConfigurationRuleSetNumberOverride",
}));

export type PutRegistrationFieldValueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a field value for a registration.
 */
export const putRegistrationFieldValue: API.OperationMethod<
  PutRegistrationFieldValueRequest,
  PutRegistrationFieldValueResult,
  PutRegistrationFieldValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<PutRegistrationFieldValueRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<PutRegistrationFieldValueResult>,
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
  operationName: "PutRegistrationFieldValue",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based policy to a End User Messaging SMS resource(phone number, sender Id, phone poll, or opt-out list) that is used for sharing the resource. A shared resource can be a Pool, Opt-out list, Sender Id, or Phone number. For more information about resource-based policies, see Working with shared resources in the *End User Messaging SMS User Guide*.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResult,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<PutResourcePolicyResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type ReleasePhoneNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Releases an existing origination phone number in your account. Once released, a phone number is no longer available for sending messages.
 *
 * If the origination phone number has deletion protection enabled or is associated with a pool, an error is returned.
 */
export const releasePhoneNumber: API.OperationMethod<
  ReleasePhoneNumberRequest,
  ReleasePhoneNumberResult,
  ReleasePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<ReleasePhoneNumberRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<ReleasePhoneNumberResult>,
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
  operationName: "ReleasePhoneNumber",
}));

export type ReleaseSenderIdError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Releases an existing sender ID in your account.
 */
export const releaseSenderId: API.OperationMethod<
  ReleaseSenderIdRequest,
  ReleaseSenderIdResult,
  ReleaseSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<ReleaseSenderIdRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<ReleaseSenderIdResult>,
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
  operationName: "ReleaseSenderId",
}));

export type RequestPhoneNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Request an origination phone number for use in your account. For more information on phone number request see Request a phone number in the *End User Messaging SMS User Guide*.
 */
export const requestPhoneNumber: API.OperationMethod<
  RequestPhoneNumberRequest,
  RequestPhoneNumberResult,
  RequestPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<RequestPhoneNumberRequest>,
  output: __S(3969, __c124, 1) as any as S.Schema<RequestPhoneNumberResult>,
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
  operationName: "RequestPhoneNumber",
}));

export type RequestSenderIdError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Request a new sender ID that doesn't require registration.
 */
export const requestSenderId: API.OperationMethod<
  RequestSenderIdRequest,
  RequestSenderIdResult,
  RequestSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4000, __c125, 0) as any as S.Schema<RequestSenderIdRequest>,
  output: __S(4001, __c125, 1) as any as S.Schema<RequestSenderIdResult>,
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
  operationName: "RequestSenderId",
}));

export type SendDestinationNumberVerificationCodeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Before you can send test messages to a verified destination phone number you need to opt-in the verified destination phone number. Creates a new text message with a verification code and send it to a verified destination phone number. Once you have the verification code use VerifyDestinationNumber to opt-in the verified destination phone number to receive messages.
 */
export const sendDestinationNumberVerificationCode: API.OperationMethod<
  SendDestinationNumberVerificationCodeRequest,
  SendDestinationNumberVerificationCodeResult,
  SendDestinationNumberVerificationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4032, __c126, 0) as any as S.Schema<SendDestinationNumberVerificationCodeRequest>,
  output: __S(4033, __c126, 1) as any as S.Schema<SendDestinationNumberVerificationCodeResult>,
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
  operationName: "SendDestinationNumberVerificationCode",
}));

export type SendMediaMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new multimedia message (MMS) and sends it to a recipient's phone number.
 */
export const sendMediaMessage: API.OperationMethod<
  SendMediaMessageRequest,
  SendMediaMessageResult,
  SendMediaMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<SendMediaMessageRequest>,
  output: __S(4128, __c129, 0) as any as S.Schema<SendMediaMessageResult>,
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
  operationName: "SendMediaMessage",
}));

export type SendNotifyTextMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a templated text message through a notify configuration to a recipient's phone number.
 */
export const sendNotifyTextMessage: API.OperationMethod<
  SendNotifyTextMessageRequest,
  SendNotifyTextMessageResult,
  SendNotifyTextMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4160, __c130, 0) as any as S.Schema<SendNotifyTextMessageRequest>,
  output: __S(4192, __c131, 0) as any as S.Schema<SendNotifyTextMessageResult>,
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
  operationName: "SendNotifyTextMessage",
}));

export type SendNotifyVoiceMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a templated voice message through a notify configuration to a recipient's phone number.
 */
export const sendNotifyVoiceMessage: API.OperationMethod<
  SendNotifyVoiceMessageRequest,
  SendNotifyVoiceMessageResult,
  SendNotifyVoiceMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4224, __c132, 0) as any as S.Schema<SendNotifyVoiceMessageRequest>,
  output: __S(4192, __c131, 0) as any as S.Schema<SendNotifyVoiceMessageResult>,
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
  operationName: "SendNotifyVoiceMessage",
}));

export type SendRcsMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new RCS message and sends it to a recipient's phone number. RCS messages support rich content including text, files, rich cards, and carousels with interactive suggested actions.
 */
export const sendRcsMessage: API.OperationMethod<
  SendRcsMessageRequest,
  SendRcsMessageResult,
  SendRcsMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4273, __c133, 17) as any as S.Schema<SendRcsMessageRequest>,
  output: __S(4128, __c129, 0) as any as S.Schema<SendRcsMessageResult>,
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
  operationName: "SendRcsMessage",
}));

export type SendTextMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new text message and sends it to a recipient's phone number. SendTextMessage only sends an SMS message to one recipient each time it is invoked.
 *
 * SMS throughput limits are measured in Message Parts per Second (MPS). Your MPS limit depends on the destination country of your messages, as well as the type of phone number (origination number) that you use to send the message. For more information about MPS, see Message Parts per Second (MPS) limits in the *End User Messaging SMS User Guide*.
 */
export const sendTextMessage: API.OperationMethod<
  SendTextMessageRequest,
  SendTextMessageResult,
  SendTextMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<SendTextMessageRequest>,
  output: __S(4128, __c129, 0) as any as S.Schema<SendTextMessageResult>,
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
  operationName: "SendTextMessage",
}));

export type SendVoiceMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to send a request that sends a voice message. This operation uses Amazon Polly to convert a text script into a voice message.
 */
export const sendVoiceMessage: API.OperationMethod<
  SendVoiceMessageRequest,
  SendVoiceMessageResult,
  SendVoiceMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<SendVoiceMessageRequest>,
  output: __S(4128, __c129, 0) as any as S.Schema<SendVoiceMessageResult>,
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
  operationName: "SendVoiceMessage",
}));

export type SetAccountDefaultProtectConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set a protect configuration as your account default. You can only have one account default protect configuration at a time. The current account default protect configuration is replaced with the provided protect configuration.
 */
export const setAccountDefaultProtectConfiguration: API.OperationMethod<
  SetAccountDefaultProtectConfigurationRequest,
  SetAccountDefaultProtectConfigurationResult,
  SetAccountDefaultProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<SetAccountDefaultProtectConfigurationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<SetAccountDefaultProtectConfigurationResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetAccountDefaultProtectConfiguration",
}));

export type SetDefaultMessageFeedbackEnabledError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets a configuration set's default for message feedback.
 */
export const setDefaultMessageFeedbackEnabled: API.OperationMethod<
  SetDefaultMessageFeedbackEnabledRequest,
  SetDefaultMessageFeedbackEnabledResult,
  SetDefaultMessageFeedbackEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<SetDefaultMessageFeedbackEnabledRequest>,
  output: __S(4385, __c137, 1) as any as S.Schema<SetDefaultMessageFeedbackEnabledResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultMessageFeedbackEnabled",
}));

export type SetDefaultMessageTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the default message type on a configuration set.
 *
 * Choose the category of SMS messages that you plan to send from this account. If you send account-related messages or time-sensitive messages such as one-time passcodes, choose **Transactional**. If you plan to send messages that contain marketing material or other promotional content, choose **Promotional**. This setting applies to your entire Amazon Web Services account.
 */
export const setDefaultMessageType: API.OperationMethod<
  SetDefaultMessageTypeRequest,
  SetDefaultMessageTypeResult,
  SetDefaultMessageTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4416, __c138, 0) as any as S.Schema<SetDefaultMessageTypeRequest>,
  output: __S(1344, __c42, 0) as any as S.Schema<SetDefaultMessageTypeResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultMessageType",
}));

export type SetDefaultSenderIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets default sender ID on a configuration set.
 *
 * When sending a text message to a destination country that supports sender IDs, the default sender ID on the configuration set specified will be used if no dedicated origination phone numbers or registered sender IDs are available in your account.
 */
export const setDefaultSenderId: API.OperationMethod<
  SetDefaultSenderIdRequest,
  SetDefaultSenderIdResult,
  SetDefaultSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<SetDefaultSenderIdRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<SetDefaultSenderIdResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultSenderId",
}));

export type SetMediaMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending MMS messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setMediaMessageSpendLimitOverride: API.OperationMethod<
  SetMediaMessageSpendLimitOverrideRequest,
  SetMediaMessageSpendLimitOverrideResult,
  SetMediaMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<SetMediaMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<SetMediaMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetMediaMessageSpendLimitOverride",
}));

export type SetNotifyMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending notify messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setNotifyMessageSpendLimitOverride: API.OperationMethod<
  SetNotifyMessageSpendLimitOverrideRequest,
  SetNotifyMessageSpendLimitOverrideResult,
  SetNotifyMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<SetNotifyMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<SetNotifyMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetNotifyMessageSpendLimitOverride",
}));

export type SetRcsMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending RCS messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setRcsMessageSpendLimitOverride: API.OperationMethod<
  SetRcsMessageSpendLimitOverrideRequest,
  SetRcsMessageSpendLimitOverrideResult,
  SetRcsMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<SetRcsMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<SetRcsMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRcsMessageSpendLimitOverride",
}));

export type SetTextMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending text messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setTextMessageSpendLimitOverride: API.OperationMethod<
  SetTextMessageSpendLimitOverrideRequest,
  SetTextMessageSpendLimitOverrideResult,
  SetTextMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<SetTextMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<SetTextMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTextMessageSpendLimitOverride",
}));

export type SetVoiceMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending voice messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setVoiceMessageSpendLimitOverride: API.OperationMethod<
  SetVoiceMessageSpendLimitOverrideRequest,
  SetVoiceMessageSpendLimitOverrideResult,
  SetVoiceMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<SetVoiceMessageSpendLimitOverrideRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<SetVoiceMessageSpendLimitOverrideResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetVoiceMessageSpendLimitOverride",
}));

export type SubmitRegistrationVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submit the specified registration for review and approval.
 */
export const submitRegistrationVersion: API.OperationMethod<
  SubmitRegistrationVersionRequest,
  SubmitRegistrationVersionResult,
  SubmitRegistrationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<SubmitRegistrationVersionRequest>,
  output: __S(225, __c7, 1) as any as S.Schema<SubmitRegistrationVersionResult>,
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
  operationName: "SubmitRegistrationVersion",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified resource. When you specify an existing tag key, the value is overwritten with the new value. Each tag consists of a key and an optional value. Tag keys must be unique per resource. For more information about tags, see Tags in the *End User Messaging SMS User Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<TagResourceResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
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
 * Removes the association of the specified tags from a resource. For more information on tags see Tags in the *End User Messaging SMS User Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UntagResourceResult>,
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

export type UpdateEventDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing event destination in a configuration set. You can update the IAM role ARN for CloudWatch Logs and Firehose. You can also enable or disable the event destination.
 *
 * You may want to update an event destination to change its matching event types or updating the destination resource ARN. You can't change an event destination's type between CloudWatch Logs, Firehose, and Amazon SNS.
 */
export const updateEventDestination: API.OperationMethod<
  UpdateEventDestinationRequest,
  UpdateEventDestinationResult,
  UpdateEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<UpdateEventDestinationRequest>,
  output: __S(512, __c16, 0) as any as S.Schema<UpdateEventDestinationResult>,
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
  operationName: "UpdateEventDestination",
}));

export type UpdateNotifyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing notify configuration. You can update the default template, pool association, enabled channels, enabled countries, and deletion protection settings.
 */
export const updateNotifyConfiguration: API.OperationMethod<
  UpdateNotifyConfigurationRequest,
  UpdateNotifyConfigurationResult,
  UpdateNotifyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<UpdateNotifyConfigurationRequest>,
  output: __S(1632, __c51, 0) as any as S.Schema<UpdateNotifyConfigurationResult>,
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
  operationName: "UpdateNotifyConfiguration",
}));

export type UpdatePhoneNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing origination phone number. You can update the opt-out list, enable or disable two-way messaging, change the TwoWayChannelArn, enable or disable self-managed opt-outs, and enable or disable deletion protection.
 *
 * If the origination phone number is associated with a pool, an error is returned.
 */
export const updatePhoneNumber: API.OperationMethod<
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResult,
  UpdatePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<UpdatePhoneNumberRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<UpdatePhoneNumberResult>,
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
  operationName: "UpdatePhoneNumber",
}));

export type UpdatePoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing pool. You can update the opt-out list, enable or disable two-way messaging, change the `TwoWayChannelArn`, enable or disable self-managed opt-outs, enable or disable deletion protection, and enable or disable shared routes.
 */
export const updatePool: API.OperationMethod<
  UpdatePoolRequest,
  UpdatePoolResult,
  UpdatePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<UpdatePoolRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<UpdatePoolResult>,
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
  operationName: "UpdatePool",
}));

export type UpdateProtectConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the setting for an existing protect configuration.
 */
export const updateProtectConfiguration: API.OperationMethod<
  UpdateProtectConfigurationRequest,
  UpdateProtectConfigurationResult,
  UpdateProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<UpdateProtectConfigurationRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<UpdateProtectConfigurationResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProtectConfiguration",
}));

export type UpdateProtectConfigurationCountryRuleSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a country rule set to `ALLOW`, `BLOCK`, `MONITOR`, or `FILTER` messages to be sent to the specified destination counties. You can update one or multiple countries at a time. The updates are only applied to the specified NumberCapability type.
 */
export const updateProtectConfigurationCountryRuleSet: API.OperationMethod<
  UpdateProtectConfigurationCountryRuleSetRequest,
  UpdateProtectConfigurationCountryRuleSetResult,
  UpdateProtectConfigurationCountryRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<UpdateProtectConfigurationCountryRuleSetRequest>,
  output: __S(3362, __c105, 2) as any as S.Schema<UpdateProtectConfigurationCountryRuleSetResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProtectConfigurationCountryRuleSet",
}));

export type UpdateRcsAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing RCS agent. You can update the opt-out list, deletion protection, two-way messaging settings, and self-managed opt-outs configuration.
 */
export const updateRcsAgent: API.OperationMethod<
  UpdateRcsAgentRequest,
  UpdateRcsAgentResult,
  UpdateRcsAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<UpdateRcsAgentRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<UpdateRcsAgentResult>,
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
  operationName: "UpdateRcsAgent",
}));

export type UpdateSenderIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing sender ID.
 */
export const updateSenderId: API.OperationMethod<
  UpdateSenderIdRequest,
  UpdateSenderIdResult,
  UpdateSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<UpdateSenderIdRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<UpdateSenderIdResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSenderId",
}));

export type VerifyDestinationNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use the verification code that was received by the verified destination phone number to opt-in the verified destination phone number to receive more messages.
 */
export const verifyDestinationNumber: API.OperationMethod<
  VerifyDestinationNumberRequest,
  VerifyDestinationNumberResult,
  VerifyDestinationNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<VerifyDestinationNumberRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<VerifyDestinationNumberResult>,
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
  operationName: "VerifyDestinationNumber",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String,
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConfigurationSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetArn: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          Tags: S.optional(__S(33, __c1, 1)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateConfigurationSetResult" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(32, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MonthlyLimit: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetMediaMessageSpendLimitOverrideRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MonthlyLimit: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetNotifyMessageSpendLimitOverrideRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MonthlyLimit: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetRcsMessageSpendLimitOverrideRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MonthlyLimit: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetTextMessageSpendLimitOverrideRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MonthlyLimit: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetVoiceMessageSpendLimitOverrideRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistrationId: S.String, AwsReview: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SubmitRegistrationVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          VersionNumber: S.Number,
          RegistrationVersionStatus: S.String,
          RegistrationVersionStatusHistory: __S(1088, __c34, 0),
          AwsReview: S.Boolean,
        }),
      ).annotate({ identifier: "SubmitRegistrationVersionResult" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(33, __c1, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResult" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(448, __c14, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String,
          EventDestinationName: S.String,
          Enabled: S.optional(S.Boolean),
          MatchingEventTypes: S.optional(__S(448, __c14, 0)),
          CloudWatchLogsDestination: S.optional(__S(480, __c15, 0)),
          KinesisFirehoseDestination: S.optional(__S(481, __c15, 1)),
          SnsDestination: S.optional(__S(482, __c15, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEventDestinationRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotifyConfigurationId: S.String,
          DefaultTemplateId: S.optional(S.String),
          PoolId: S.optional(S.String),
          EnabledCountries: S.optional(__S(448, __c14, 0)),
          EnabledChannels: S.optional(__S(448, __c14, 0)),
          DeletionProtectionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateNotifyConfigurationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String,
          EventDestinationName: S.String,
          MatchingEventTypes: __S(448, __c14, 0),
          CloudWatchLogsDestination: S.optional(__S(480, __c15, 0)),
          KinesisFirehoseDestination: S.optional(__S(481, __c15, 1)),
          SnsDestination: S.optional(__S(482, __c15, 2)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventDestinationRequest" });
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
      return S.suspend(() => S.Struct({ IamRoleArn: S.String, LogGroupArn: S.String })).annotate({
        identifier: "CloudWatchLogsDestination",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ IamRoleArn: S.String, DeliveryStreamArn: S.String }),
      ).annotate({ identifier: "KinesisFirehoseDestination" });
    case 2:
      return S.suspend(() => S.Struct({ TopicArn: S.String })).annotate({
        identifier: "SnsDestination",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventDestinationName: S.String,
          Enabled: S.Boolean,
          MatchingEventTypes: __S(448, __c14, 0),
          CloudWatchLogsDestination: S.optional(__S(480, __c15, 0)),
          KinesisFirehoseDestination: S.optional(__S(481, __c15, 1)),
          SnsDestination: S.optional(__S(482, __c15, 2)),
        }),
      ).annotate({ identifier: "EventDestination" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetArn: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          EventDestination: S.optional(__S(483, __c15, 3)),
        }),
      ).annotate({ identifier: "CreateEventDestinationResult" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: S.String,
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          InternationalSendingEnabled: S.optional(S.Boolean),
          DeletionProtectionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePhoneNumberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberArn: S.optional(S.String),
          PhoneNumberId: S.optional(S.String),
          PhoneNumber: S.optional(S.String),
          Status: S.optional(S.String),
          IsoCountryCode: S.optional(S.String),
          MessageType: S.optional(S.String),
          NumberCapabilities: S.optional(__S(448, __c14, 0)),
          NumberType: S.optional(S.String),
          MonthlyLeasingPrice: S.optional(S.String),
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          InternationalSendingEnabled: S.optional(S.Boolean),
          DeletionProtectionEnabled: S.optional(S.Boolean),
          RegistrationId: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdatePhoneNumberResult" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolId: S.String,
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          SharedRoutesEnabled: S.optional(S.Boolean),
          DeletionProtectionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePoolRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PoolArn: S.optional(S.String),
          PoolId: S.optional(S.String),
          Status: S.optional(S.String),
          MessageType: S.optional(S.String),
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          SharedRoutesEnabled: S.optional(S.Boolean),
          DeletionProtectionEnabled: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdatePoolResult" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationId: S.String,
          DeletionProtectionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProtectConfigurationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationId: S.String,
          NumberCapability: S.String,
          CountryRuleSetUpdates: __S(3361, __c105, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProtectConfigurationCountryRuleSetRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RcsAgentId: S.String,
          DeletionProtectionEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayMediaS3BucketName: S.optional(S.String),
          TwoWayMediaS3KeyPrefix: S.optional(S.String),
          TwoWayMediaS3Role: S.optional(S.String),
          TwoWayRcsEventsEnabled: S.optional(__S(448, __c14, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRcsAgentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RcsAgentArn: S.String,
          RcsAgentId: S.String,
          Status: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          DeletionProtectionEnabled: S.Boolean,
          OptOutListName: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.Boolean,
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          TwoWayEnabled: S.Boolean,
          TwoWayMediaS3BucketName: S.optional(S.String),
          TwoWayMediaS3KeyPrefix: S.optional(S.String),
          TwoWayMediaS3Role: S.optional(S.String),
          TwoWayRcsEventsEnabled: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "UpdateRcsAgentResult" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SenderId: S.String,
          IsoCountryCode: S.String,
          DeletionProtectionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSenderIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SenderIdArn: S.String,
          SenderId: S.String,
          IsoCountryCode: S.String,
          MessageTypes: __S(448, __c14, 0),
          MonthlyLeasingPrice: S.String,
          DeletionProtectionEnabled: S.Boolean,
          Registered: S.Boolean,
          RegistrationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateSenderIdResult" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VerifiedDestinationNumberId: S.String, VerificationCode: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyDestinationNumberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VerifiedDestinationNumberArn: S.String,
          VerifiedDestinationNumberId: S.String,
          DestinationPhoneNumber: S.String,
          Status: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "VerifyDestinationNumberResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.String,
          UseCase: S.String,
          DefaultTemplateId: S.optional(S.String),
          PoolId: S.optional(S.String),
          EnabledCountries: S.optional(__S(448, __c14, 0)),
          EnabledChannels: __S(448, __c14, 0),
          DeletionProtectionEnabled: S.optional(S.Boolean),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(33, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateNotifyConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NotifyConfigurationArn: S.String,
          NotifyConfigurationId: S.String,
          DisplayName: S.String,
          UseCase: S.String,
          DefaultTemplateId: S.optional(S.String),
          PoolId: S.optional(S.String),
          EnabledCountries: S.optional(__S(448, __c14, 0)),
          EnabledChannels: __S(448, __c14, 0),
          Tier: S.String,
          TierUpgradeStatus: S.String,
          Status: S.String,
          RejectionReason: S.optional(S.String),
          DeletionProtectionEnabled: S.Boolean,
          Tags: S.optional(__S(33, __c1, 1)),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateNotifyConfigurationResult" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OptOutListName: S.String,
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOptOutListRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OptOutListArn: S.optional(S.String),
          OptOutListName: S.optional(S.String),
          Tags: S.optional(__S(33, __c1, 1)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateOptOutListResult" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginationIdentity: S.String,
          IsoCountryCode: S.optional(S.String),
          MessageType: S.String,
          DeletionProtectionEnabled: S.optional(S.Boolean),
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePoolRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PoolArn: S.optional(S.String),
          PoolId: S.optional(S.String),
          Status: S.optional(S.String),
          MessageType: S.optional(S.String),
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          SharedRoutesEnabled: S.optional(S.Boolean),
          DeletionProtectionEnabled: S.optional(S.Boolean),
          Tags: S.optional(__S(33, __c1, 1)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreatePoolResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          DeletionProtectionEnabled: S.optional(S.Boolean),
          Tags: S.optional(__S(33, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProtectConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationArn: S.String,
          ProtectConfigurationId: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          AccountDefault: S.Boolean,
          DeletionProtectionEnabled: S.Boolean,
          Tags: S.optional(__S(33, __c1, 1)),
        }),
      ).annotate({ identifier: "CreateProtectConfigurationResult" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeletionProtectionEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRcsAgentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RcsAgentArn: S.String,
          RcsAgentId: S.String,
          Status: S.String,
          DeletionProtectionEnabled: S.Boolean,
          OptOutListName: S.optional(S.String),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          SelfManagedOptOutsEnabled: S.Boolean,
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          TwoWayEnabled: S.Boolean,
          TwoWayMediaS3BucketName: S.optional(S.String),
          TwoWayMediaS3KeyPrefix: S.optional(S.String),
          TwoWayMediaS3Role: S.optional(S.String),
          TwoWayRcsEventsEnabled: S.optional(__S(448, __c14, 0)),
          Tags: S.optional(__S(33, __c1, 1)),
        }),
      ).annotate({ identifier: "CreateRcsAgentResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationType: S.String,
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRegistrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          RegistrationType: S.String,
          RegistrationStatus: S.String,
          CurrentVersionNumber: S.Number,
          AdditionalAttributes: S.optional(__S(960, __c30, 0)),
          Tags: S.optional(__S(33, __c1, 1)),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateRegistrationResult" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistrationId: S.String, ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateRegistrationAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          RegistrationType: S.String,
          ResourceArn: S.String,
          ResourceId: S.String,
          ResourceType: S.String,
          IsoCountryCode: S.optional(S.String),
          PhoneNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateRegistrationAssociationResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AttachmentBody: S.optional(T.Blob),
          AttachmentUrl: S.optional(S.String),
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRegistrationAttachmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistrationAttachmentArn: S.String,
          RegistrationAttachmentId: S.String,
          AttachmentStatus: S.String,
          Tags: S.optional(__S(33, __c1, 1)),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateRegistrationAttachmentResult" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistrationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateRegistrationVersionRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DraftTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          SubmittedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AwsReviewingTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReviewingTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RequiresAuthenticationTimestamp: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          ApprovedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DiscardedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeniedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RevokedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ArchivedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RegistrationVersionStatusHistory" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          VersionNumber: S.Number,
          RegistrationVersionStatus: S.String,
          RegistrationVersionStatusHistory: __S(1088, __c34, 0),
        }),
      ).annotate({ identifier: "CreateRegistrationVersionResult" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationPhoneNumber: S.String,
          RcsAgentId: S.optional(S.String),
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVerifiedDestinationNumberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VerifiedDestinationNumberArn: S.String,
          VerifiedDestinationNumberId: S.String,
          DestinationPhoneNumber: S.String,
          Status: S.String,
          RcsAgentId: S.optional(S.String),
          Tags: S.optional(__S(33, __c1, 1)),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateVerifiedDestinationNumberResult" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAccountDefaultProtectConfigurationRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DefaultProtectConfigurationArn: S.String,
          DefaultProtectConfigurationId: S.String,
        }),
      ).annotate({ identifier: "DeleteAccountDefaultProtectConfigurationResult" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConfigurationSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetArn: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          EventDestinations: S.optional(__S(1280, __c40, 0)),
          DefaultMessageType: S.optional(S.String),
          DefaultSenderId: S.optional(S.String),
          DefaultMessageFeedbackEnabled: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeleteConfigurationSetResult" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(483, __c15, 3));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDefaultMessageTypeRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetArn: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          MessageType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteDefaultMessageTypeResult" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDefaultSenderIdRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetArn: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          SenderId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteDefaultSenderIdResult" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, EventDestinationName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventDestinationRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OriginationIdentity: S.String, Keyword: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteKeywordRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginationIdentityArn: S.optional(S.String),
          OriginationIdentity: S.optional(S.String),
          Keyword: S.optional(S.String),
          KeywordMessage: S.optional(S.String),
          KeywordAction: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteKeywordResult" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMediaMessageSpendLimitOverrideRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MonthlyLimit: S.optional(S.Number) })).annotate({
        identifier: "DeleteMediaMessageSpendLimitOverrideResult",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NotifyConfigurationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteNotifyConfigurationRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotifyConfigurationArn: S.String,
          NotifyConfigurationId: S.String,
          DisplayName: S.String,
          UseCase: S.String,
          DefaultTemplateId: S.optional(S.String),
          PoolId: S.optional(S.String),
          EnabledCountries: S.optional(__S(448, __c14, 0)),
          EnabledChannels: __S(448, __c14, 0),
          Tier: S.String,
          TierUpgradeStatus: S.String,
          Status: S.String,
          RejectionReason: S.optional(S.String),
          DeletionProtectionEnabled: S.Boolean,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DeleteNotifyConfigurationResult" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteNotifyMessageSpendLimitOverrideRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OptOutListName: S.String, OptedOutNumber: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOptedOutNumberRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OptOutListArn: S.optional(S.String),
          OptOutListName: S.optional(S.String),
          OptedOutNumber: S.optional(S.String),
          OptedOutTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndUserOptedOut: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeleteOptedOutNumberResult" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OptOutListName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOptOutListRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OptOutListArn: S.optional(S.String),
          OptOutListName: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeleteOptOutListResult" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PoolId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePoolRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PoolArn: S.optional(S.String),
          PoolId: S.optional(S.String),
          Status: S.optional(S.String),
          MessageType: S.optional(S.String),
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          SharedRoutesEnabled: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeletePoolResult" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectConfigurationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProtectConfigurationRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationArn: S.String,
          ProtectConfigurationId: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          AccountDefault: S.Boolean,
          DeletionProtectionEnabled: S.Boolean,
        }),
      ).annotate({ identifier: "DeleteProtectConfigurationResult" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectConfigurationId: S.String, DestinationPhoneNumber: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProtectConfigurationRuleSetNumberOverrideRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationArn: S.String,
          ProtectConfigurationId: S.String,
          DestinationPhoneNumber: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Action: S.String,
          IsoCountryCode: S.optional(S.String),
          ExpirationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeleteProtectConfigurationRuleSetNumberOverrideResult" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RcsAgentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRcsAgentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RcsAgentArn: S.String,
          RcsAgentId: S.String,
          Status: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          DeletionProtectionEnabled: S.Boolean,
          OptOutListName: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.Boolean,
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          TwoWayEnabled: S.Boolean,
          TwoWayRcsEventsEnabled: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "DeleteRcsAgentResult" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRcsMessageSpendLimitOverrideRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistrationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRegistrationRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          RegistrationType: S.String,
          RegistrationStatus: S.String,
          CurrentVersionNumber: S.Number,
          ApprovedVersionNumber: S.optional(S.Number),
          LatestDeniedVersionNumber: S.optional(S.Number),
          AdditionalAttributes: S.optional(__S(960, __c30, 0)),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DeleteRegistrationResult" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistrationAttachmentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRegistrationAttachmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistrationAttachmentArn: S.String,
          RegistrationAttachmentId: S.String,
          AttachmentStatus: S.String,
          AttachmentUploadErrorReason: S.optional(S.String),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DeleteRegistrationAttachmentResult" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistrationId: S.String, FieldPath: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRegistrationFieldValueRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          VersionNumber: S.Number,
          FieldPath: S.String,
          SelectChoices: S.optional(__S(448, __c14, 0)),
          TextValue: S.optional(S.String),
          RegistrationAttachmentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteRegistrationFieldValueResult" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          Policy: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeleteResourcePolicyResult" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTextMessageSpendLimitOverrideRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VerifiedDestinationNumberId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVerifiedDestinationNumberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VerifiedDestinationNumberArn: S.String,
          VerifiedDestinationNumberId: S.String,
          DestinationPhoneNumber: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DeleteVerifiedDestinationNumberResult" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVoiceMessageSpendLimitOverrideRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountAttributesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "AccountAttribute",
      });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountAttributes: S.optional(__S(2338, __c73, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAccountAttributesResult" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountLimitsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, Used: S.Number, Max: S.Number })).annotate({
        identifier: "AccountLimit",
      });
    case 2:
      return S.Array(__S(2369, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountLimits: S.optional(__S(2370, __c74, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAccountLimitsResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetNames: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigurationSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetArn: S.String,
          ConfigurationSetName: S.String,
          EventDestinations: __S(1280, __c40, 0),
          DefaultMessageType: S.optional(S.String),
          DefaultSenderId: S.optional(S.String),
          DefaultMessageFeedbackEnabled: S.optional(S.Boolean),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ProtectConfigurationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationSetInformation" });
    case 2:
      return S.Array(__S(2401, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSets: S.optional(__S(2402, __c75, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeConfigurationSetsResult" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Values: __S(448, __c14, 0) })).annotate({
        identifier: "ConfigurationSetFilter",
      });
    case 1:
      return S.Array(__S(2432, __c76, 0));
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginationIdentity: S.String,
          Keywords: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeKeywordsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Keyword: S.String, KeywordMessage: S.String, KeywordAction: S.String }),
      ).annotate({ identifier: "KeywordInformation" });
    case 2:
      return S.Array(__S(2465, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          OriginationIdentityArn: S.optional(S.String),
          OriginationIdentity: S.optional(S.String),
          Keywords: S.optional(__S(2466, __c77, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeKeywordsResult" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotifyConfigurationIds: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeNotifyConfigurationsRequest" });
    case 1:
      return S.Array(__S(1632, __c51, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NotifyConfigurations: S.optional(__S(2497, __c78, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeNotifyConfigurationsResult" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateIds: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeNotifyTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Required: S.Boolean,
          Description: S.optional(S.String),
          MaxLength: S.optional(S.Number),
          MinValue: S.optional(S.Number),
          MaxValue: S.optional(S.Number),
          DefaultValue: S.optional(S.String),
          Pattern: S.optional(S.String),
          Sample: S.optional(S.String),
          Source: S.optional(S.String),
        }),
      ).annotate({ identifier: "TemplateVariableMetadata" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(2529, __c79, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TemplateId: S.String,
          Version: S.Number,
          TemplateType: S.String,
          Channels: __S(448, __c14, 0),
          TierAccess: S.optional(__S(448, __c14, 0)),
          Status: S.optional(S.String),
          SupportedCountries: S.optional(__S(448, __c14, 0)),
          LanguageCode: S.optional(S.String),
          Content: S.optional(S.String),
          Variables: S.optional(__S(2530, __c79, 2)),
          SupportedVoiceIds: S.optional(__S(448, __c14, 0)),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "NotifyTemplateInformation" });
    case 4:
      return S.Array(__S(2531, __c79, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          NotifyTemplates: S.optional(__S(2532, __c79, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeNotifyTemplatesResult" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OptOutListName: S.String,
          OptedOutNumbers: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOptedOutNumbersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OptedOutNumber: S.String,
          OptedOutTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndUserOptedOut: S.Boolean,
        }),
      ).annotate({ identifier: "OptedOutNumberInformation" });
    case 2:
      return S.Array(__S(2561, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          OptOutListArn: S.optional(S.String),
          OptOutListName: S.optional(S.String),
          OptedOutNumbers: S.optional(__S(2562, __c80, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeOptedOutNumbersResult" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OptOutListNames: S.optional(__S(448, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Owner: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOptOutListsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OptOutListArn: S.String,
          OptOutListName: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "OptOutListInformation" });
    case 2:
      return S.Array(__S(2593, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ OptOutLists: S.optional(__S(2594, __c81, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeOptOutListsResult" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberIds: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Owner: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePhoneNumbersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberArn: S.String,
          PhoneNumberId: S.optional(S.String),
          PhoneNumber: S.String,
          Status: S.String,
          IsoCountryCode: S.String,
          MessageType: S.String,
          NumberCapabilities: __S(448, __c14, 0),
          NumberType: S.String,
          MonthlyLeasingPrice: S.String,
          TwoWayEnabled: S.Boolean,
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.Boolean,
          OptOutListName: S.String,
          InternationalSendingEnabled: S.optional(S.Boolean),
          DeletionProtectionEnabled: S.Boolean,
          PoolId: S.optional(S.String),
          RegistrationId: S.optional(S.String),
          MessagingLimits: S.optional(__S(2657, __c83, 1)),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "PhoneNumberInformation" });
    case 2:
      return S.Array(__S(2625, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PhoneNumbers: S.optional(__S(2626, __c82, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribePhoneNumbersResult" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          RateLimits: S.optional(__S(2656, __c83, 0)),
          DailyMessageCaps: S.optional(__S(2656, __c83, 0)),
        }),
      ).annotate({ identifier: "MessagingLimits" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolIds: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Owner: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePoolsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PoolArn: S.String,
          PoolId: S.String,
          Status: S.String,
          MessageType: S.String,
          TwoWayEnabled: S.Boolean,
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.Boolean,
          OptOutListName: S.String,
          SharedRoutesEnabled: S.Boolean,
          DeletionProtectionEnabled: S.Boolean,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "PoolInformation" });
    case 2:
      return S.Array(__S(2689, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Pools: S.optional(__S(2690, __c84, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribePoolsResult" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationIds: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProtectConfigurationsRequest" });
    case 1:
      return S.Array(__S(1856, __c58, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurations: S.optional(__S(2721, __c85, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeProtectConfigurationsResult" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RcsAgentId: S.String,
          IsoCountryCodes: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRcsAgentCountryLaunchStatusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ CarrierName: S.String, Status: S.String })).annotate({
        identifier: "CarrierStatusInformation",
      });
    case 2:
      return S.Array(__S(2753, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IsoCountryCode: S.String,
          Status: S.String,
          RcsPlatformId: S.optional(S.String),
          RegistrationId: S.String,
          CarrierStatus: __S(2754, __c86, 2),
        }),
      ).annotate({ identifier: "CountryLaunchStatusInformation" });
    case 4:
      return S.Array(__S(2755, __c86, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          RcsAgentId: S.String,
          RcsAgentArn: S.String,
          CountryLaunchStatus: S.optional(__S(2756, __c86, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRcsAgentCountryLaunchStatusResult" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RcsAgentIds: S.optional(__S(448, __c14, 0)),
          Owner: S.optional(S.String),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRcsAgentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          TestingAgentId: S.optional(S.String),
          RegistrationId: S.String,
        }),
      ).annotate({ identifier: "TestingAgentInformation" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RcsAgentArn: S.String,
          RcsAgentId: S.String,
          Status: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          DeletionProtectionEnabled: S.Boolean,
          OptOutListName: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.Boolean,
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          TwoWayEnabled: S.Boolean,
          PoolId: S.optional(S.String),
          TwoWayMediaS3BucketName: S.optional(S.String),
          TwoWayMediaS3KeyPrefix: S.optional(S.String),
          TwoWayMediaS3Role: S.optional(S.String),
          TwoWayRcsEventsEnabled: S.optional(__S(448, __c14, 0)),
          TestingAgent: S.optional(__S(2785, __c87, 1)),
          MessagingLimits: S.optional(__S(2657, __c83, 1)),
        }),
      ).annotate({ identifier: "RcsAgentInformation" });
    case 3:
      return S.Array(__S(2786, __c87, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ RcsAgents: S.optional(__S(2787, __c87, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeRcsAgentsResult" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationAttachmentIds: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRegistrationAttachmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistrationAttachmentArn: S.String,
          RegistrationAttachmentId: S.String,
          AttachmentStatus: S.String,
          AttachmentUploadErrorReason: S.optional(S.String),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          AttachmentUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationAttachmentsInformation" });
    case 2:
      return S.Array(__S(2817, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ RegistrationAttachments: __S(2818, __c88, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeRegistrationAttachmentsResult" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationType: S.String,
          SectionPath: S.optional(S.String),
          FieldPaths: S.optional(__S(448, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRegistrationFieldDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MinChoices: S.Number, MaxChoices: S.Number, Options: __S(448, __c14, 0) }),
      ).annotate({ identifier: "SelectValidation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ MinLength: S.Number, MaxLength: S.Number, Pattern: S.String }),
      ).annotate({ identifier: "TextValidation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Option: S.String,
          Title: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "SelectOptionDescription" });
    case 4:
      return S.Array(__S(2851, __c89, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Title: S.String,
          ShortDescription: S.String,
          LongDescription: S.optional(S.String),
          DocumentationTitle: S.optional(S.String),
          DocumentationLink: S.optional(S.String),
          SelectOptionDescriptions: S.optional(__S(2852, __c89, 4)),
          TextValidationDescription: S.optional(S.String),
          ExampleTextValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationFieldDisplayHints" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DependsOnFieldPath: S.String,
          Operator: S.String,
          Values: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "FieldCondition" });
    case 7:
      return S.Array(__S(2854, __c89, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          MinLength: S.optional(S.Number),
          MaxLength: S.optional(S.Number),
          Pattern: S.optional(S.String),
          AllowedValues: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "ConditionalValidation" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Conditions: __S(2855, __c89, 7),
          RuleBehavior: S.String,
          ConditionalValidation: S.optional(__S(2856, __c89, 8)),
        }),
      ).annotate({ identifier: "ConditionalRule" });
    case 10:
      return S.Array(__S(2857, __c89, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ Rules: __S(2858, __c89, 10), DefaultBehavior: S.String }),
      ).annotate({ identifier: "ConditionalBehavior" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          SectionPath: S.String,
          FieldPath: S.String,
          FieldType: S.String,
          FieldRequirement: S.String,
          SelectValidation: S.optional(__S(2849, __c89, 1)),
          TextValidation: S.optional(__S(2850, __c89, 2)),
          DisplayHints: __S(2853, __c89, 5),
          ConditionalBehavior: S.optional(__S(2859, __c89, 11)),
        }),
      ).annotate({ identifier: "RegistrationFieldDefinition" });
    case 13:
      return S.Array(__S(2860, __c89, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          RegistrationType: S.String,
          RegistrationFieldDefinitions: __S(2861, __c89, 13),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRegistrationFieldDefinitionsResult" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(2880, __c90, 0));
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationId: S.String,
          VersionNumber: S.optional(S.Number),
          SectionPath: S.optional(S.String),
          FieldPaths: S.optional(__S(448, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRegistrationFieldValuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldPath: S.String,
          SelectChoices: S.optional(__S(448, __c14, 0)),
          TextValue: S.optional(S.String),
          RegistrationAttachmentId: S.optional(S.String),
          DeniedReason: S.optional(S.String),
          Feedback: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationFieldValueInformation" });
    case 2:
      return S.Array(__S(2913, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          VersionNumber: S.Number,
          RegistrationFieldValues: __S(2914, __c91, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRegistrationFieldValuesResult" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationIds: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRegistrationsRequest" });
    case 1:
      return S.Array(__S(2048, __c64, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Registrations: __S(2945, __c92, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeRegistrationsResult" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationType: S.String,
          SectionPaths: S.optional(__S(448, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRegistrationSectionDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Title: S.String,
          ShortDescription: S.String,
          LongDescription: S.optional(S.String),
          DocumentationTitle: S.optional(S.String),
          DocumentationLink: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationSectionDisplayHints" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SectionPath: S.String, DisplayHints: __S(2977, __c93, 1) }),
      ).annotate({ identifier: "RegistrationSectionDefinition" });
    case 3:
      return S.Array(__S(2978, __c93, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RegistrationType: S.String,
          RegistrationSectionDefinitions: __S(2979, __c93, 3),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRegistrationSectionDefinitionsResult" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationTypes: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRegistrationTypeDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.String,
          IsoCountryCode: S.optional(S.String),
          AssociationBehavior: S.String,
          DisassociationBehavior: S.String,
        }),
      ).annotate({ identifier: "SupportedAssociation" });
    case 2:
      return S.Array(__S(3009, __c94, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Title: S.String,
          ShortDescription: S.optional(S.String),
          LongDescription: S.optional(S.String),
          DocumentationTitle: S.optional(S.String),
          DocumentationLink: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationTypeDisplayHints" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          RegistrationType: S.String,
          SupportedAssociations: S.optional(__S(3010, __c94, 2)),
          DisplayHints: __S(3011, __c94, 3),
        }),
      ).annotate({ identifier: "RegistrationTypeDefinition" });
    case 5:
      return S.Array(__S(3012, __c94, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          RegistrationTypeDefinitions: __S(3013, __c94, 5),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRegistrationTypeDefinitionsResult" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistrationId: S.String,
          VersionNumbers: S.optional(__S(3040, __c95, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRegistrationVersionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Reason: S.String,
          ShortDescription: S.String,
          LongDescription: S.optional(S.String),
          DocumentationTitle: S.optional(S.String),
          DocumentationLink: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationDeniedReasonInformation" });
    case 3:
      return S.Array(__S(3042, __c95, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          VersionNumber: S.Number,
          RegistrationVersionStatus: S.String,
          RegistrationVersionStatusHistory: __S(1088, __c34, 0),
          DeniedReasons: S.optional(__S(3043, __c95, 3)),
          Feedback: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationVersionInformation" });
    case 5:
      return S.Array(__S(3044, __c95, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          RegistrationVersions: __S(3045, __c95, 5),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRegistrationVersionsResult" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SenderId: S.String, IsoCountryCode: S.String })).annotate({
        identifier: "SenderIdAndCountry",
      });
    case 1:
      return S.Array(__S(3072, __c96, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SenderIds: S.optional(__S(3073, __c96, 1)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Owner: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSenderIdsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SenderIdArn: S.String,
          SenderId: S.String,
          IsoCountryCode: S.String,
          MessageTypes: __S(448, __c14, 0),
          MonthlyLeasingPrice: S.String,
          DeletionProtectionEnabled: S.Boolean,
          Registered: S.Boolean,
          RegistrationId: S.optional(S.String),
          MessagingLimits: S.optional(__S(2657, __c83, 1)),
        }),
      ).annotate({ identifier: "SenderIdInformation" });
    case 4:
      return S.Array(__S(3075, __c96, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ SenderIds: S.optional(__S(3076, __c96, 4)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSenderIdsResult" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSpendLimitsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EnforcedLimit: S.Number,
          MaxLimit: S.Number,
          Overridden: S.Boolean,
        }),
      ).annotate({ identifier: "SpendLimit" });
    case 2:
      return S.Array(__S(3105, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SpendLimits: S.optional(__S(3106, __c97, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSpendLimitsResult" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VerifiedDestinationNumberIds: S.optional(__S(448, __c14, 0)),
          DestinationPhoneNumbers: S.optional(__S(448, __c14, 0)),
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeVerifiedDestinationNumbersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VerifiedDestinationNumberArn: S.String,
          VerifiedDestinationNumberId: S.String,
          DestinationPhoneNumber: S.String,
          Status: S.String,
          RcsAgentId: S.optional(S.String),
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "VerifiedDestinationNumberInformation" });
    case 2:
      return S.Array(__S(3137, __c98, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          VerifiedDestinationNumbers: __S(3138, __c98, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeVerifiedDestinationNumbersResult" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolId: S.String,
          OriginationIdentity: S.String,
          IsoCountryCode: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateOriginationIdentityRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectConfigurationId: S.String, ConfigurationSetName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateProtectConfigurationRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolId: S.String,
          OriginationIdentity: S.String,
          IsoCountryCode: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateOriginationIdentityRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolArn: S.optional(S.String),
          PoolId: S.optional(S.String),
          OriginationIdentityArn: S.optional(S.String),
          OriginationIdentity: S.optional(S.String),
          IsoCountryCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateOriginationIdentityResult" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistrationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DiscardRegistrationVersionRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectConfigurationId: S.String, NumberCapability: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProtectConfigurationCountryRuleSetRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProtectStatus: S.String })).annotate({
        identifier: "ProtectConfigurationCountryRuleSetInformation",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(3360, __c105, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationArn: S.String,
          ProtectConfigurationId: S.String,
          NumberCapability: S.String,
          CountryRuleSet: __S(3361, __c105, 1),
        }),
      ).annotate({ identifier: "GetProtectConfigurationCountryRuleSetResult" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IsoCountryCode: S.String,
          NumberCapabilities: __S(448, __c14, 0),
          NumberType: S.String,
          RegistrationId: S.optional(S.String),
          NumberPreference: S.optional(__S(3457, __c108, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAvailablePhoneNumbersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AvailablePhoneNumbers: __S(448, __c14, 0), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAvailablePhoneNumbersResult" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PreferenceType: __S(448, __c14, 0), Filter: __S(448, __c14, 0) }),
      ).annotate({ identifier: "NumberPreferenceItem" });
    case 1:
      return S.Array(__S(3456, __c108, 0));
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(__S(448, __c14, 0)),
          UseCases: S.optional(__S(448, __c14, 0)),
          Tier: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNotifyCountriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IsoCountryCode: S.String,
          CountryName: S.String,
          SupportedChannels: __S(448, __c14, 0),
          SupportedUseCases: __S(448, __c14, 0),
          SupportedTiers: __S(448, __c14, 0),
          CustomerOwnedIdentityRequired: S.Boolean,
        }),
      ).annotate({ identifier: "NotifyCountryInformation" });
    case 2:
      return S.Array(__S(3489, __c109, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NotifyCountries: S.optional(__S(3490, __c109, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListNotifyCountriesResult" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolId: S.String,
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPoolOriginationIdentitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginationIdentityArn: S.String,
          OriginationIdentity: S.String,
          IsoCountryCode: S.String,
          NumberCapabilities: __S(448, __c14, 0),
          PhoneNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "OriginationIdentityMetadata" });
    case 2:
      return S.Array(__S(3521, __c110, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PoolArn: S.optional(S.String),
          PoolId: S.optional(S.String),
          OriginationIdentities: S.optional(__S(3522, __c110, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPoolOriginationIdentitiesResult" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationId: S.String,
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProtectConfigurationRuleSetNumberOverridesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DestinationPhoneNumber: S.String,
          CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Action: S.String,
          IsoCountryCode: S.optional(S.String),
          ExpirationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProtectConfigurationRuleSetNumberOverride" });
    case 2:
      return S.Array(__S(3553, __c111, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProtectConfigurationArn: S.String,
          ProtectConfigurationId: S.String,
          RuleSetNumberOverrides: S.optional(__S(3554, __c111, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProtectConfigurationRuleSetNumberOverridesResult" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationId: S.String,
          Filters: S.optional(__S(2433, __c76, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRegistrationAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          ResourceId: S.String,
          ResourceType: S.String,
          IsoCountryCode: S.optional(S.String),
          PhoneNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationAssociationMetadata" });
    case 2:
      return S.Array(__S(3585, __c112, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RegistrationArn: S.String,
          RegistrationId: S.String,
          RegistrationType: S.String,
          RegistrationAssociations: __S(3586, __c112, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRegistrationAssociationsResult" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(__S(33, __c1, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceResult" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginationIdentity: S.String,
          Keyword: S.String,
          KeywordMessage: S.String,
          KeywordAction: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutKeywordRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectConfigurationId: S.String, ConfigurationSetName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateProtectConfigurationRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetArn: S.String,
          ConfigurationSetName: S.String,
          ProtectConfigurationArn: S.String,
          ProtectConfigurationId: S.String,
        }),
      ).annotate({ identifier: "AssociateProtectConfigurationResult" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MessageId: S.String, MessageFeedbackStatus: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutMessageFeedbackRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MessageId: S.String, MessageFeedbackStatus: S.String }),
      ).annotate({ identifier: "PutMessageFeedbackResult" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OptOutListName: S.String, OptedOutNumber: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutOptedOutNumberRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ProtectConfigurationId: S.String,
          DestinationPhoneNumber: S.String,
          Action: S.String,
          ExpirationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutProtectConfigurationRuleSetNumberOverrideRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistrationId: S.String,
          FieldPath: S.String,
          SelectChoices: S.optional(__S(448, __c14, 0)),
          TextValue: S.optional(S.String),
          RegistrationAttachmentId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutRegistrationFieldValueRequest" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ReleasePhoneNumberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberArn: S.optional(S.String),
          PhoneNumberId: S.optional(S.String),
          PhoneNumber: S.optional(S.String),
          Status: S.optional(S.String),
          IsoCountryCode: S.optional(S.String),
          MessageType: S.optional(S.String),
          NumberCapabilities: S.optional(__S(448, __c14, 0)),
          NumberType: S.optional(S.String),
          MonthlyLeasingPrice: S.optional(S.String),
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          RegistrationId: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ReleasePhoneNumberResult" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SenderId: S.String, IsoCountryCode: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ReleaseSenderIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SenderIdArn: S.String,
          SenderId: S.String,
          IsoCountryCode: S.String,
          MessageTypes: __S(448, __c14, 0),
          MonthlyLeasingPrice: S.String,
          Registered: S.Boolean,
          RegistrationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReleaseSenderIdResult" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IsoCountryCode: S.String,
          MessageType: S.String,
          NumberCapabilities: __S(448, __c14, 0),
          NumberType: S.String,
          OptOutListName: S.optional(S.String),
          PoolId: S.optional(S.String),
          RegistrationId: S.optional(S.String),
          NumberPreference: S.optional(__S(3457, __c108, 1)),
          InternationalSendingEnabled: S.optional(S.Boolean),
          DeletionProtectionEnabled: S.optional(S.Boolean),
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RequestPhoneNumberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberArn: S.optional(S.String),
          PhoneNumberId: S.optional(S.String),
          PhoneNumber: S.optional(S.String),
          Status: S.optional(S.String),
          IsoCountryCode: S.optional(S.String),
          MessageType: S.optional(S.String),
          NumberCapabilities: S.optional(__S(448, __c14, 0)),
          NumberType: S.optional(S.String),
          MonthlyLeasingPrice: S.optional(S.String),
          TwoWayEnabled: S.optional(S.Boolean),
          TwoWayChannelArn: S.optional(S.String),
          TwoWayChannelRole: S.optional(S.String),
          SelfManagedOptOutsEnabled: S.optional(S.Boolean),
          OptOutListName: S.optional(S.String),
          InternationalSendingEnabled: S.optional(S.Boolean),
          DeletionProtectionEnabled: S.optional(S.Boolean),
          PoolId: S.optional(S.String),
          RegistrationId: S.optional(S.String),
          Tags: S.optional(__S(33, __c1, 1)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RequestPhoneNumberResult" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SenderId: S.String,
          IsoCountryCode: S.String,
          MessageTypes: S.optional(__S(448, __c14, 0)),
          DeletionProtectionEnabled: S.optional(S.Boolean),
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RequestSenderIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SenderIdArn: S.String,
          SenderId: S.String,
          IsoCountryCode: S.String,
          MessageTypes: __S(448, __c14, 0),
          MonthlyLeasingPrice: S.String,
          DeletionProtectionEnabled: S.Boolean,
          Registered: S.Boolean,
          Tags: S.optional(__S(33, __c1, 1)),
        }),
      ).annotate({ identifier: "RequestSenderIdResult" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VerifiedDestinationNumberId: S.String,
          VerificationChannel: S.String,
          LanguageCode: S.optional(S.String),
          OriginationIdentity: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          Context: S.optional(__S(960, __c30, 0)),
          DestinationCountryParameters: S.optional(__S(960, __c30, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendDestinationNumberVerificationCodeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ MessageId: S.String })).annotate({
        identifier: "SendDestinationNumberVerificationCodeResult",
      });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumber: S.String, EnableCleansing: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CarrierLookupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          E164PhoneNumber: S.String,
          DialingCountryCode: S.optional(S.String),
          IsoCountryCode: S.optional(S.String),
          Country: S.optional(S.String),
          MCC: S.optional(S.String),
          MNC: S.optional(S.String),
          Carrier: S.optional(S.String),
          PhoneNumberType: S.String,
          OriginalPhoneNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "CarrierLookupResult" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationPhoneNumber: S.String,
          OriginationIdentity: S.String,
          MessageBody: S.optional(S.String),
          MediaUrls: S.optional(__S(448, __c14, 0)),
          ConfigurationSetName: S.optional(S.String),
          MaxPrice: S.optional(S.String),
          TimeToLive: S.optional(S.Number),
          Context: S.optional(__S(960, __c30, 0)),
          DryRun: S.optional(S.Boolean),
          ProtectConfigurationId: S.optional(S.String),
          MessageFeedbackEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendMediaMessageRequest" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MessageId: S.optional(S.String) })).annotate({
        identifier: "SendMediaMessageResult",
      });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotifyConfigurationId: S.String,
          DestinationPhoneNumber: S.String,
          TemplateId: S.optional(S.String),
          TemplateVariables: __S(960, __c30, 0),
          TimeToLive: S.optional(S.Number),
          Context: S.optional(__S(960, __c30, 0)),
          ConfigurationSetName: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          MessageFeedbackEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendNotifyTextMessageRequest" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MessageId: S.optional(S.String),
          TemplateId: S.optional(S.String),
          ResolvedMessageBody: S.optional(S.String),
        }),
      ).annotate({ identifier: "SendNotifyTextMessageResult" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotifyConfigurationId: S.String,
          DestinationPhoneNumber: S.String,
          TemplateId: S.optional(S.String),
          TemplateVariables: __S(960, __c30, 0),
          VoiceId: S.optional(S.String),
          TimeToLive: S.optional(S.Number),
          Context: S.optional(__S(960, __c30, 0)),
          ConfigurationSetName: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          MessageFeedbackEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendNotifyVoiceMessageRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Body: S.String })).annotate({
        identifier: "RcsTextMessage",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ FileUrl: S.String, ThumbnailUrl: S.optional(S.String) }),
      ).annotate({ identifier: "RcsFileMessage" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FileUrl: S.String,
          ThumbnailUrl: S.optional(S.String),
          Height: S.optional(S.String),
        }),
      ).annotate({ identifier: "RcsCardMedia" });
    case 3:
      return S.suspend(() => S.Struct({ Text: S.String, PostbackData: S.String })).annotate({
        identifier: "RcsReplyAction",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Text: S.String,
          PostbackData: S.String,
          Url: S.String,
          Application: S.optional(S.String),
          WebviewViewMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "RcsOpenUrlAction" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Text: S.String, PostbackData: S.String, PhoneNumber: S.String }),
      ).annotate({ identifier: "RcsDialPhoneAction" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Text: S.String,
          PostbackData: S.String,
          Latitude: S.Number,
          Longitude: S.Number,
          Label: S.optional(S.String),
        }),
      ).annotate({ identifier: "RcsShowLocationAction" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Text: S.String,
          PostbackData: S.String,
          Title: S.String,
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "RcsCreateCalendarEventAction" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Reply: __S(4259, __c133, 3) }),
        /*@__PURE__*/ S.Struct({ OpenUrl: __S(4260, __c133, 4) }),
        /*@__PURE__*/ S.Struct({ DialPhone: __S(4261, __c133, 5) }),
        /*@__PURE__*/ S.Struct({ ShowLocation: __S(4262, __c133, 6) }),
        /*@__PURE__*/ S.Struct({ RequestLocation: __S(4259, __c133, 3) }),
        /*@__PURE__*/ S.Struct({ CreateCalendarEvent: __S(4263, __c133, 7) }),
      ]);
    case 9:
      return S.Array(__S(4264, __c133, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          Media: S.optional(__S(4258, __c133, 2)),
          Suggestions: S.optional(__S(4265, __c133, 9)),
        }),
      ).annotate({ identifier: "RcsCardContent" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          CardOrientation: S.String,
          ThumbnailImageAlignment: S.optional(S.String),
          CardContent: __S(4266, __c133, 10),
        }),
      ).annotate({ identifier: "RcsStandaloneCard" });
    case 12:
      return S.Array(__S(4266, __c133, 10));
    case 13:
      return S.suspend(() =>
        S.Struct({ CardWidth: S.String, CardContents: __S(4268, __c133, 12) }),
      ).annotate({ identifier: "RcsCarousel" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ TextMessage: __S(4256, __c133, 0) }),
        /*@__PURE__*/ S.Struct({ FileMessage: __S(4257, __c133, 1) }),
        /*@__PURE__*/ S.Struct({ RichCard: __S(4267, __c133, 11) }),
        /*@__PURE__*/ S.Struct({ Carousel: __S(4269, __c133, 13) }),
      ]);
    case 15:
      return S.suspend(() =>
        S.Struct({ Content: __S(4270, __c133, 14), Suggestions: S.optional(__S(4265, __c133, 9)) }),
      ).annotate({ identifier: "RcsMessageContent" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Channel: S.String,
          MessageBody: S.optional(S.String),
          MediaUrls: S.optional(__S(448, __c14, 0)),
          OriginationIdentity: S.optional(S.String),
        }),
      ).annotate({ identifier: "RcsFallbackConfiguration" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          DestinationPhoneNumber: S.String,
          OriginationIdentity: S.String,
          RcsMessageContent: S.optional(__S(4271, __c133, 15)),
          TimeToLive: S.optional(S.Number),
          MessageTrafficType: S.optional(S.String),
          FallbackConfiguration: S.optional(__S(4272, __c133, 16)),
          ProtectConfigurationId: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          MaxPrice: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          Context: S.optional(__S(960, __c30, 0)),
          MessageFeedbackEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendRcsMessageRequest" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationPhoneNumber: S.String,
          OriginationIdentity: S.optional(S.String),
          MessageBody: S.optional(S.String),
          MessageType: S.optional(S.String),
          Keyword: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          MaxPrice: S.optional(S.String),
          TimeToLive: S.optional(S.Number),
          Context: S.optional(__S(960, __c30, 0)),
          DestinationCountryParameters: S.optional(__S(960, __c30, 0)),
          DryRun: S.optional(S.Boolean),
          ProtectConfigurationId: S.optional(S.String),
          MessageFeedbackEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendTextMessageRequest" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationPhoneNumber: S.String,
          OriginationIdentity: S.String,
          MessageBody: S.optional(S.String),
          MessageBodyTextType: S.optional(S.String),
          VoiceId: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          MaxPricePerMinute: S.optional(S.String),
          TimeToLive: S.optional(S.Number),
          Context: S.optional(__S(960, __c30, 0)),
          DryRun: S.optional(S.Boolean),
          ProtectConfigurationId: S.optional(S.String),
          MessageFeedbackEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendVoiceMessageRequest" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectConfigurationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetAccountDefaultProtectConfigurationRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, MessageFeedbackEnabled: S.Boolean }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetDefaultMessageFeedbackEnabledRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetArn: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          MessageFeedbackEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SetDefaultMessageFeedbackEnabledResult" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, MessageType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetDefaultMessageTypeRequest" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, SenderId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetDefaultSenderIdRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
