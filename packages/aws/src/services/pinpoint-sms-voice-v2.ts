import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Pinpoint SMS Voice V2",
  target: "PinpointSMSVoiceV2",
  version: "2022-03-31",
  sigv4: "sms-voice",
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
                `https://sms-voice-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://sms-voice-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://sms-voice.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://sms-voice.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
    readonly Reason?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
    readonly Reason?: string;
    readonly ResourceType?: string;
    readonly ResourceId?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerException", [
    "RetryableError",
  ])<{ readonly message?: string; readonly RequestId?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
    readonly ResourceType?: string;
    readonly ResourceId?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError("ServiceQuotaExceededException")<{
    readonly message?: string;
    readonly Reason?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException", [
    "RetryableError",
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
    readonly Reason?: string;
    readonly Fields?: ValidationExceptionField[];
  }> {}
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
export type NotifyConfigurationInformationList =
  NotifyConfigurationInformation[];
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
export type TemplateVariablesMap = {
  [key: string]: TemplateVariableMetadata | undefined;
};
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
export type ProtectConfigurationInformationList =
  ProtectConfigurationInformation[];
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
export type CountryLaunchStatusInformationList =
  CountryLaunchStatusInformation[];
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
export type RegistrationAttachmentsInformationList =
  RegistrationAttachmentsInformation[];
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
export interface RegistrationFieldDefinition {
  SectionPath: string;
  FieldPath: string;
  FieldType: string;
  FieldRequirement: string;
  SelectValidation?: SelectValidation;
  TextValidation?: TextValidation;
  DisplayHints: RegistrationFieldDisplayHints;
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
export type RegistrationFieldValueInformationList =
  RegistrationFieldValueInformation[];
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
export type RegistrationDeniedReasonInformationList =
  RegistrationDeniedReasonInformation[];
export interface RegistrationVersionInformation {
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
  DeniedReasons?: RegistrationDeniedReasonInformation[];
  Feedback?: string;
}
export type RegistrationVersionInformationList =
  RegistrationVersionInformation[];
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
export type VerifiedDestinationNumberFilterList =
  VerifiedDestinationNumberFilter[];
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
export type VerifiedDestinationNumberInformationList =
  VerifiedDestinationNumberInformation[];
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
  CountryRuleSet: {
    [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined;
  };
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export interface GetResourcePolicyResult {
  ResourceArn?: string;
  Policy?: string;
  CreatedTimestamp?: Date;
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
export type PoolOriginationIdentitiesFilterList =
  PoolOriginationIdentitiesFilter[];
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
export type RegistrationAssociationMetadataList =
  RegistrationAssociationMetadata[];
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
export type DestinationCountryParameters = {
  [key: string]: string | undefined;
};
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
export type TemplateVariableSubstitutionMap = {
  [key: string]: string | undefined;
};
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
  | {
      TextMessage: RcsTextMessage;
      FileMessage?: never;
      RichCard?: never;
      Carousel?: never;
    }
  | {
      TextMessage?: never;
      FileMessage: RcsFileMessage;
      RichCard?: never;
      Carousel?: never;
    }
  | {
      TextMessage?: never;
      FileMessage?: never;
      RichCard: RcsStandaloneCard;
      Carousel?: never;
    }
  | {
      TextMessage?: never;
      FileMessage?: never;
      RichCard?: never;
      Carousel: RcsCarousel;
    };
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
  CountryRuleSet: {
    [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined;
  };
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
  descriptor: {
    service: svc,
    input: {
      PoolId: 0,
      OriginationIdentity: 0,
      IsoCountryCode: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "AssociateOriginationIdentity",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProtectConfigurationId: 0, ConfigurationSetName: 0 },
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
  operationName: "AssociateProtectConfiguration",
})) as any;

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
  descriptor: { service: svc, input: { PhoneNumber: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ConfigurationSetName: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreateConfigurationSet",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ConfigurationSetName: 0,
      EventDestinationName: 0,
      MatchingEventTypes: 0,
      CloudWatchLogsDestination: i_CloudWatchLogsDestination,
      KinesisFirehoseDestination: i_KinesisFirehoseDestination,
      SnsDestination: i_SnsDestination,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateEventDestination",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DisplayName: 0,
      UseCase: 0,
      DefaultTemplateId: 0,
      PoolId: 0,
      EnabledCountries: 0,
      EnabledChannels: 0,
      DeletionProtectionEnabled: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreateNotifyConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      OptOutListName: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreateOptOutList",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      OriginationIdentity: 0,
      IsoCountryCode: 0,
      MessageType: 0,
      DeletionProtectionEnabled: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreatePool",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      DeletionProtectionEnabled: 0,
      Tags: D.list(i_Tag),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreateProtectConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DeletionProtectionEnabled: 0,
      OptOutListName: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreateRcsAgent",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      RegistrationType: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreateRegistration",
})) as any;

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
  descriptor: { service: svc, input: { RegistrationId: 0, ResourceId: 0 } },
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
})) as any;

export type CreateRegistrationAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new registration attachment to use for uploading a file or a URL to a file. The maximum file size is 500KB and valid file extensions are PDF, JPEG and PNG. For example, many sender ID registrations require a signed “letter of authorization” (LOA) to be submitted.
 *
 * Use either `AttachmentUrl` or `AttachmentBody` to upload your attachment. If both are specified then an exception is returned.
 */
export const createRegistrationAttachment: API.OperationMethod<
  CreateRegistrationAttachmentRequest,
  CreateRegistrationAttachmentResult,
  CreateRegistrationAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AttachmentBody: 0,
      AttachmentUrl: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreateRegistrationAttachment",
})) as any;

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
  descriptor: {
    service: svc,
    input: { RegistrationId: 0 },
    output: {
      RegistrationVersionStatusHistory: o_RegistrationVersionStatusHistory,
    },
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
  operationName: "CreateRegistrationVersion",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DestinationPhoneNumber: 0,
      RcsAgentId: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "CreateVerifiedDestinationNumber",
})) as any;

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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteConfigurationSet",
})) as any;

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
  descriptor: { service: svc, input: { ConfigurationSetName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ConfigurationSetName: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, EventDestinationName: 0 },
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
  operationName: "DeleteEventDestination",
})) as any;

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
  descriptor: { service: svc, input: { OriginationIdentity: 0, Keyword: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaMessageSpendLimitOverride",
})) as any;

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
  descriptor: {
    service: svc,
    input: { NotifyConfigurationId: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteNotifyConfiguration",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotifyMessageSpendLimitOverride",
})) as any;

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
  descriptor: {
    service: svc,
    input: { OptOutListName: 0, OptedOutNumber: 0 },
    output: { OptedOutTimestamp: D.ts },
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
  operationName: "DeleteOptedOutNumber",
})) as any;

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
  descriptor: {
    service: svc,
    input: { OptOutListName: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteOptOutList",
})) as any;

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
  descriptor: {
    service: svc,
    input: { PoolId: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeletePool",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProtectConfigurationId: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteProtectConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProtectConfigurationId: 0, DestinationPhoneNumber: 0 },
    output: { CreatedTimestamp: D.ts, ExpirationTimestamp: D.ts },
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
  operationName: "DeleteProtectConfigurationRuleSetNumberOverride",
})) as any;

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
  descriptor: {
    service: svc,
    input: { RcsAgentId: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteRcsAgent",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRcsMessageSpendLimitOverride",
})) as any;

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
  descriptor: {
    service: svc,
    input: { RegistrationId: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteRegistration",
})) as any;

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
  descriptor: {
    service: svc,
    input: { RegistrationAttachmentId: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteRegistrationAttachment",
})) as any;

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
  descriptor: { service: svc, input: { RegistrationId: 0, FieldPath: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteResourcePolicy",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTextMessageSpendLimitOverride",
})) as any;

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
  descriptor: {
    service: svc,
    input: { VerifiedDestinationNumberId: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "DeleteVerifiedDestinationNumber",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceMessageSpendLimitOverride",
})) as any;

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
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  descriptor: {
    service: svc,
    input: {
      ConfigurationSetNames: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { ConfigurationSets: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      OriginationIdentity: 0,
      Keywords: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
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
  descriptor: {
    service: svc,
    input: {
      NotifyConfigurationIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { NotifyConfigurations: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      TemplateIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { NotifyTemplates: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      OptOutListName: 0,
      OptedOutNumbers: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { OptedOutNumbers: D.list({ OptedOutTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { OptOutListNames: 0, NextToken: 0, MaxResults: 0, Owner: 0 },
    output: { OptOutLists: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      PhoneNumberIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
      Owner: 0,
    },
    output: { PhoneNumbers: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      PoolIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
      Owner: 0,
    },
    output: { Pools: D.list({ CreatedTimestamp: D.ts }) },
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
 * Retrieves the protect configurations that match any of filters. If a filter isn’t provided then all protect configurations are returned.
 */
export const describeProtectConfigurations: API.PaginatedOperationMethod<
  DescribeProtectConfigurationsRequest,
  DescribeProtectConfigurationsResult,
  DescribeProtectConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ProtectConfigurationInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ProtectConfigurationIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { ProtectConfigurations: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      RcsAgentId: 0,
      IsoCountryCodes: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
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
  descriptor: {
    service: svc,
    input: {
      RcsAgentIds: 0,
      Owner: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { RcsAgents: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      RegistrationAttachmentIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { RegistrationAttachments: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      RegistrationType: 0,
      SectionPath: 0,
      FieldPaths: 0,
      NextToken: 0,
      MaxResults: 0,
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
  descriptor: {
    service: svc,
    input: {
      RegistrationId: 0,
      VersionNumber: 0,
      SectionPath: 0,
      FieldPaths: 0,
      NextToken: 0,
      MaxResults: 0,
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
  descriptor: {
    service: svc,
    input: {
      RegistrationIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Registrations: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      RegistrationType: 0,
      SectionPaths: 0,
      NextToken: 0,
      MaxResults: 0,
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
  descriptor: {
    service: svc,
    input: {
      RegistrationTypes: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
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
  descriptor: {
    service: svc,
    input: {
      RegistrationId: 0,
      VersionNumbers: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      RegistrationVersions: D.list({
        RegistrationVersionStatusHistory: o_RegistrationVersionStatusHistory,
      }),
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
  descriptor: {
    service: svc,
    input: {
      SenderIds: D.list({ SenderId: 0, IsoCountryCode: 0 }),
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
      Owner: 0,
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
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  descriptor: {
    service: svc,
    input: {
      VerifiedDestinationNumberIds: 0,
      DestinationPhoneNumbers: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { VerifiedDestinationNumbers: D.list({ CreatedTimestamp: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      PoolId: 0,
      OriginationIdentity: 0,
      IsoCountryCode: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "DisassociateOriginationIdentity",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProtectConfigurationId: 0, ConfigurationSetName: 0 },
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
  operationName: "DisassociateProtectConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: { RegistrationId: 0 },
    output: {
      RegistrationVersionStatusHistory: o_RegistrationVersionStatusHistory,
    },
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
  operationName: "DiscardRegistrationVersion",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProtectConfigurationId: 0, NumberCapability: 0 },
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
  operationName: "GetProtectConfigurationCountryRuleSet",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "GetResourcePolicy",
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
  descriptor: {
    service: svc,
    input: { Channels: 0, UseCases: 0, Tier: 0, NextToken: 0, MaxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      PoolId: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
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
  descriptor: {
    service: svc,
    input: {
      ProtectConfigurationId: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      RuleSetNumberOverrides: D.list({
        CreatedTimestamp: D.ts,
        ExpirationTimestamp: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: {
      RegistrationId: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
  descriptor: {
    service: svc,
    input: {
      OriginationIdentity: 0,
      Keyword: 0,
      KeywordMessage: 0,
      KeywordAction: 0,
    },
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
  operationName: "PutKeyword",
})) as any;

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
  descriptor: {
    service: svc,
    input: { MessageId: 0, MessageFeedbackStatus: 0 },
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
  operationName: "PutMessageFeedback",
})) as any;

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
  descriptor: {
    service: svc,
    input: { OptOutListName: 0, OptedOutNumber: 0 },
    output: { OptedOutTimestamp: D.ts },
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
  operationName: "PutOptedOutNumber",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      ProtectConfigurationId: 0,
      DestinationPhoneNumber: 0,
      Action: 0,
      ExpirationTimestamp: 0,
    },
    output: { CreatedTimestamp: D.ts, ExpirationTimestamp: D.ts },
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
  operationName: "PutProtectConfigurationRuleSetNumberOverride",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      RegistrationId: 0,
      FieldPath: 0,
      SelectChoices: 0,
      TextValue: 0,
      RegistrationAttachmentId: 0,
    },
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
  operationName: "PutRegistrationFieldValue",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, Policy: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "PutResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { PhoneNumberId: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "ReleasePhoneNumber",
})) as any;

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
  descriptor: { service: svc, input: { SenderId: 0, IsoCountryCode: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IsoCountryCode: 0,
      MessageType: 0,
      NumberCapabilities: 0,
      NumberType: 0,
      OptOutListName: 0,
      PoolId: 0,
      RegistrationId: 0,
      InternationalSendingEnabled: 0,
      DeletionProtectionEnabled: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "RequestPhoneNumber",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SenderId: 0,
      IsoCountryCode: 0,
      MessageTypes: 0,
      DeletionProtectionEnabled: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "RequestSenderId",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      VerifiedDestinationNumberId: 0,
      VerificationChannel: 0,
      LanguageCode: 0,
      OriginationIdentity: 0,
      ConfigurationSetName: 0,
      Context: 0,
      DestinationCountryParameters: 0,
    },
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
  operationName: "SendDestinationNumberVerificationCode",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DestinationPhoneNumber: 0,
      OriginationIdentity: 0,
      MessageBody: 0,
      MediaUrls: 0,
      ConfigurationSetName: 0,
      MaxPrice: 0,
      TimeToLive: 0,
      Context: 0,
      DryRun: 0,
      ProtectConfigurationId: 0,
      MessageFeedbackEnabled: 0,
    },
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
  operationName: "SendMediaMessage",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      NotifyConfigurationId: 0,
      DestinationPhoneNumber: 0,
      TemplateId: 0,
      TemplateVariables: 0,
      TimeToLive: 0,
      Context: 0,
      ConfigurationSetName: 0,
      DryRun: 0,
      MessageFeedbackEnabled: 0,
    },
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
  operationName: "SendNotifyTextMessage",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      NotifyConfigurationId: 0,
      DestinationPhoneNumber: 0,
      TemplateId: 0,
      TemplateVariables: 0,
      VoiceId: 0,
      TimeToLive: 0,
      Context: 0,
      ConfigurationSetName: 0,
      DryRun: 0,
      MessageFeedbackEnabled: 0,
    },
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
  operationName: "SendNotifyVoiceMessage",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DestinationPhoneNumber: 0,
      OriginationIdentity: 0,
      RcsMessageContent: {
        Content: {
          TextMessage: { Body: 0 },
          FileMessage: { FileUrl: 0, ThumbnailUrl: 0 },
          RichCard: {
            CardOrientation: 0,
            ThumbnailImageAlignment: 0,
            CardContent: {
              Title: 0,
              Description: 0,
              Media: { FileUrl: 0, ThumbnailUrl: 0, Height: 0 },
              Suggestions: D.list(i_RcsSuggestedAction),
            },
          },
          Carousel: {
            CardWidth: 0,
            CardContents: D.list({
              Title: 0,
              Description: 0,
              Media: { FileUrl: 0, ThumbnailUrl: 0, Height: 0 },
              Suggestions: D.list(i_RcsSuggestedAction),
            }),
          },
        },
        Suggestions: D.list(i_RcsSuggestedAction),
      },
      TimeToLive: 0,
      MessageTrafficType: 0,
      FallbackConfiguration: {
        Channel: 0,
        MessageBody: 0,
        MediaUrls: 0,
        OriginationIdentity: 0,
      },
      ProtectConfigurationId: 0,
      ConfigurationSetName: 0,
      MaxPrice: 0,
      DryRun: 0,
      Context: 0,
      MessageFeedbackEnabled: 0,
    },
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
  operationName: "SendRcsMessage",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DestinationPhoneNumber: 0,
      OriginationIdentity: 0,
      MessageBody: 0,
      MessageType: 0,
      Keyword: 0,
      ConfigurationSetName: 0,
      MaxPrice: 0,
      TimeToLive: 0,
      Context: 0,
      DestinationCountryParameters: 0,
      DryRun: 0,
      ProtectConfigurationId: 0,
      MessageFeedbackEnabled: 0,
    },
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
  operationName: "SendTextMessage",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DestinationPhoneNumber: 0,
      OriginationIdentity: 0,
      MessageBody: 0,
      MessageBodyTextType: 0,
      VoiceId: 0,
      ConfigurationSetName: 0,
      MaxPricePerMinute: 0,
      TimeToLive: 0,
      Context: 0,
      DryRun: 0,
      ProtectConfigurationId: 0,
      MessageFeedbackEnabled: 0,
    },
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
  operationName: "SendVoiceMessage",
})) as any;

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
  descriptor: { service: svc, input: { ProtectConfigurationId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, MessageFeedbackEnabled: 0 },
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
  operationName: "SetDefaultMessageFeedbackEnabled",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ConfigurationSetName: 0, MessageType: 0 },
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
  operationName: "SetDefaultMessageType",
})) as any;

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
  descriptor: { service: svc, input: { ConfigurationSetName: 0, SenderId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { MonthlyLimit: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetMediaMessageSpendLimitOverride",
})) as any;

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
  descriptor: { service: svc, input: { MonthlyLimit: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetNotifyMessageSpendLimitOverride",
})) as any;

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
  descriptor: { service: svc, input: { MonthlyLimit: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRcsMessageSpendLimitOverride",
})) as any;

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
  descriptor: { service: svc, input: { MonthlyLimit: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTextMessageSpendLimitOverride",
})) as any;

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
  descriptor: { service: svc, input: { MonthlyLimit: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetVoiceMessageSpendLimitOverride",
})) as any;

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
  descriptor: {
    service: svc,
    input: { RegistrationId: 0, AwsReview: 0 },
    output: {
      RegistrationVersionStatusHistory: o_RegistrationVersionStatusHistory,
    },
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
  operationName: "SubmitRegistrationVersion",
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
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
  descriptor: {
    service: svc,
    input: {
      ConfigurationSetName: 0,
      EventDestinationName: 0,
      Enabled: 0,
      MatchingEventTypes: 0,
      CloudWatchLogsDestination: i_CloudWatchLogsDestination,
      KinesisFirehoseDestination: i_KinesisFirehoseDestination,
      SnsDestination: i_SnsDestination,
    },
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
  operationName: "UpdateEventDestination",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      NotifyConfigurationId: 0,
      DefaultTemplateId: 0,
      PoolId: 0,
      EnabledCountries: 0,
      EnabledChannels: 0,
      DeletionProtectionEnabled: 0,
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "UpdateNotifyConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      PhoneNumberId: 0,
      TwoWayEnabled: 0,
      TwoWayChannelArn: 0,
      TwoWayChannelRole: 0,
      SelfManagedOptOutsEnabled: 0,
      OptOutListName: 0,
      InternationalSendingEnabled: 0,
      DeletionProtectionEnabled: 0,
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "UpdatePhoneNumber",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      PoolId: 0,
      TwoWayEnabled: 0,
      TwoWayChannelArn: 0,
      TwoWayChannelRole: 0,
      SelfManagedOptOutsEnabled: 0,
      OptOutListName: 0,
      SharedRoutesEnabled: 0,
      DeletionProtectionEnabled: 0,
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "UpdatePool",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProtectConfigurationId: 0, DeletionProtectionEnabled: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "UpdateProtectConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProtectConfigurationId: 0,
      NumberCapability: 0,
      CountryRuleSetUpdates: D.map({ ProtectStatus: 0 }),
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
  operationName: "UpdateProtectConfigurationCountryRuleSet",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      RcsAgentId: 0,
      DeletionProtectionEnabled: 0,
      OptOutListName: 0,
      SelfManagedOptOutsEnabled: 0,
      TwoWayChannelArn: 0,
      TwoWayChannelRole: 0,
      TwoWayEnabled: 0,
      TwoWayMediaS3BucketName: 0,
      TwoWayMediaS3KeyPrefix: 0,
      TwoWayMediaS3Role: 0,
      TwoWayRcsEventsEnabled: 0,
    },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "UpdateRcsAgent",
})) as any;

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
  descriptor: {
    service: svc,
    input: { SenderId: 0, IsoCountryCode: 0, DeletionProtectionEnabled: 0 },
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
  operationName: "UpdateSenderId",
})) as any;

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
  descriptor: {
    service: svc,
    input: { VerifiedDestinationNumberId: 0, VerificationCode: 0 },
    output: { CreatedTimestamp: D.ts },
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
  operationName: "VerifyDestinationNumber",
})) as any;

const i_CloudWatchLogsDestination: D.LazyStruct = () => ({
  IamRoleArn: 0,
  LogGroupArn: 0,
});
const i_KinesisFirehoseDestination: D.LazyStruct = () => ({
  IamRoleArn: 0,
  DeliveryStreamArn: 0,
});
const i_RcsSuggestedAction: D.LazyStruct = () => ({
  Reply: { Text: 0, PostbackData: 0 },
  OpenUrl: {
    Text: 0,
    PostbackData: 0,
    Url: 0,
    Application: 0,
    WebviewViewMode: 0,
  },
  DialPhone: { Text: 0, PostbackData: 0, PhoneNumber: 0 },
  ShowLocation: {
    Text: 0,
    PostbackData: 0,
    Latitude: 0,
    Longitude: 0,
    Label: 0,
  },
  RequestLocation: { Text: 0, PostbackData: 0 },
  CreateCalendarEvent: {
    Text: 0,
    PostbackData: 0,
    Title: 0,
    StartTime: 0,
    EndTime: 0,
    Description: 0,
  },
});
const i_SnsDestination: D.LazyStruct = () => ({ TopicArn: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_RegistrationVersionStatusHistory: D.LazyStruct = () => ({
  DraftTimestamp: D.ts,
  SubmittedTimestamp: D.ts,
  AwsReviewingTimestamp: D.ts,
  ReviewingTimestamp: D.ts,
  RequiresAuthenticationTimestamp: D.ts,
  ApprovedTimestamp: D.ts,
  DiscardedTimestamp: D.ts,
  DeniedTimestamp: D.ts,
  RevokedTimestamp: D.ts,
  ArchivedTimestamp: D.ts,
});
