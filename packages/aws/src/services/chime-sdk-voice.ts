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
  sdkId: "Chime SDK Voice",
  target: "ChimeSDKTelephonyService",
  version: "2022-08-03",
  sigv4: "chime",
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
                `https://voice-chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://voice-chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://voice-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://voice-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class GoneException
  extends /*@__PURE__*/ TE.TaggedError("GoneException", ["BadRequestError"], {
    status: 410,
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ServiceFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ThrottledClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledClientException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedClientException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableEntityException",
    ["BadRequestError"],
    { status: 422 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export type VoiceConnectorId = string;
export type E164PhoneNumber = string | redacted.Redacted<string>;
export type E164PhoneNumberList = (string | redacted.Redacted<string>)[];
export interface AssociatePhoneNumbersWithVoiceConnectorRequest {
  VoiceConnectorId: string;
  E164PhoneNumbers: (string | redacted.Redacted<string>)[];
  ForceAssociate?: boolean;
}
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export type ErrorCode =
  | "BadRequest"
  | "Conflict"
  | "Forbidden"
  | "NotFound"
  | "PreconditionFailed"
  | "ResourceLimitExceeded"
  | "ServiceFailure"
  | "AccessDenied"
  | "ServiceUnavailable"
  | "Throttled"
  | "Throttling"
  | "Unauthorized"
  | "Unprocessable"
  | "VoiceConnectorGroupAssociationsExist"
  | "PhoneNumberAssociationsExist"
  | "Gone"
  | "Validation"
  | (string & {});
export interface PhoneNumberError {
  PhoneNumberId?: string | redacted.Redacted<string>;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type PhoneNumberErrorList = PhoneNumberError[];
export interface AssociatePhoneNumbersWithVoiceConnectorResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export type NonEmptyString = string;
export interface AssociatePhoneNumbersWithVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
  E164PhoneNumbers: (string | redacted.Redacted<string>)[];
  ForceAssociate?: boolean;
}
export interface AssociatePhoneNumbersWithVoiceConnectorGroupResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export type NonEmptyStringList = string[];
export interface BatchDeletePhoneNumberRequest {
  PhoneNumberIds: string[];
}
export interface BatchDeletePhoneNumberResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export type PhoneNumberProductType =
  | "VoiceConnector"
  | "SipMediaApplicationDialIn"
  | (string & {});
export type CallingName = string | redacted.Redacted<string>;
export type PhoneNumberName = string | redacted.Redacted<string>;
export interface UpdatePhoneNumberRequestItem {
  PhoneNumberId: string | redacted.Redacted<string>;
  ProductType?: PhoneNumberProductType;
  CallingName?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export type UpdatePhoneNumberRequestItemList = UpdatePhoneNumberRequestItem[];
export interface BatchUpdatePhoneNumberRequest {
  UpdatePhoneNumberRequestItems: UpdatePhoneNumberRequestItem[];
}
export interface BatchUpdatePhoneNumberResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export interface CreatePhoneNumberOrderRequest {
  ProductType: PhoneNumberProductType;
  E164PhoneNumbers: (string | redacted.Redacted<string>)[];
  Name?: string | redacted.Redacted<string>;
}
export type GuidString = string;
export type PhoneNumberOrderStatus =
  | "Processing"
  | "Successful"
  | "Failed"
  | "Partial"
  | "PendingDocuments"
  | "Submitted"
  | "FOC"
  | "ChangeRequested"
  | "Exception"
  | "CancelRequested"
  | "Cancelled"
  | (string & {});
export type PhoneNumberOrderType = "New" | "Porting" | (string & {});
export type OrderedPhoneNumberStatus =
  | "Processing"
  | "Acquired"
  | "Failed"
  | (string & {});
export interface OrderedPhoneNumber {
  E164PhoneNumber?: string | redacted.Redacted<string>;
  Status?: OrderedPhoneNumberStatus;
}
export type OrderedPhoneNumberList = OrderedPhoneNumber[];
export type Iso8601Timestamp = Date;
export interface PhoneNumberOrder {
  PhoneNumberOrderId?: string;
  ProductType?: PhoneNumberProductType;
  Status?: PhoneNumberOrderStatus;
  OrderType?: PhoneNumberOrderType;
  OrderedPhoneNumbers?: OrderedPhoneNumber[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  FocDate?: string;
}
export interface CreatePhoneNumberOrderResponse {
  PhoneNumberOrder?: PhoneNumberOrder;
}
export type ParticipantPhoneNumberList = (string | redacted.Redacted<string>)[];
export type ProxySessionNameString = string | redacted.Redacted<string>;
export type PositiveInteger = number;
export type Capability = "Voice" | "SMS" | (string & {});
export type CapabilityList = Capability[];
export type NumberSelectionBehavior =
  | "PreferSticky"
  | "AvoidSticky"
  | (string & {});
export type GeoMatchLevel = "Country" | "AreaCode" | (string & {});
export type Country = string;
export type AreaCode = string;
export interface GeoMatchParams {
  Country: string;
  AreaCode: string;
}
export interface CreateProxySessionRequest {
  VoiceConnectorId: string;
  ParticipantPhoneNumbers: (string | redacted.Redacted<string>)[];
  Name?: string | redacted.Redacted<string>;
  ExpiryMinutes?: number;
  Capabilities: Capability[];
  NumberSelectionBehavior?: NumberSelectionBehavior;
  GeoMatchLevel?: GeoMatchLevel;
  GeoMatchParams?: GeoMatchParams;
}
export type NonEmptyString128 = string;
export type String128 = string;
export type ProxySessionStatus =
  | "Open"
  | "InProgress"
  | "Closed"
  | (string & {});
export interface Participant {
  PhoneNumber?: string | redacted.Redacted<string>;
  ProxyPhoneNumber?: string | redacted.Redacted<string>;
}
export type Participants = Participant[];
export interface ProxySession {
  VoiceConnectorId?: string;
  ProxySessionId?: string;
  Name?: string;
  Status?: ProxySessionStatus;
  ExpiryMinutes?: number;
  Capabilities?: Capability[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  EndedTimestamp?: Date;
  Participants?: Participant[];
  NumberSelectionBehavior?: NumberSelectionBehavior;
  GeoMatchLevel?: GeoMatchLevel;
  GeoMatchParams?: GeoMatchParams;
}
export interface CreateProxySessionResponse {
  ProxySession?: ProxySession;
}
export type SipMediaApplicationName = string;
export type FunctionArn = string | redacted.Redacted<string>;
export interface SipMediaApplicationEndpoint {
  LambdaArn?: string | redacted.Redacted<string>;
}
export type SipMediaApplicationEndpointList = SipMediaApplicationEndpoint[];
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export type TagList = Tag[];
export interface CreateSipMediaApplicationRequest {
  AwsRegion: string;
  Name: string;
  Endpoints: SipMediaApplicationEndpoint[];
  Tags?: Tag[];
}
export interface SipMediaApplication {
  SipMediaApplicationId?: string;
  AwsRegion?: string;
  Name?: string;
  Endpoints?: SipMediaApplicationEndpoint[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  SipMediaApplicationArn?: string;
}
export interface CreateSipMediaApplicationResponse {
  SipMediaApplication?: SipMediaApplication;
}
export type SensitiveString = string | redacted.Redacted<string>;
export type SipHeadersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type SMACreateCallArgumentsMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface CreateSipMediaApplicationCallRequest {
  FromPhoneNumber: string | redacted.Redacted<string>;
  ToPhoneNumber: string | redacted.Redacted<string>;
  SipMediaApplicationId: string;
  SipHeaders?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  ArgumentsMap?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export interface SipMediaApplicationCall {
  TransactionId?: string;
}
export interface CreateSipMediaApplicationCallResponse {
  SipMediaApplicationCall?: SipMediaApplicationCall;
}
export type SipRuleName = string;
export type SipRuleTriggerType =
  | "ToPhoneNumber"
  | "RequestUriHostname"
  | (string & {});
export type SipApplicationPriority = number;
export interface SipRuleTargetApplication {
  SipMediaApplicationId?: string;
  Priority?: number;
  AwsRegion?: string;
}
export type SipRuleTargetApplicationList = SipRuleTargetApplication[];
export interface CreateSipRuleRequest {
  Name: string;
  TriggerType: SipRuleTriggerType;
  TriggerValue: string;
  Disabled?: boolean;
  TargetApplications: SipRuleTargetApplication[];
}
export interface SipRule {
  SipRuleId?: string;
  Name?: string;
  Disabled?: boolean;
  TriggerType?: SipRuleTriggerType;
  TriggerValue?: string;
  TargetApplications?: SipRuleTargetApplication[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface CreateSipRuleResponse {
  SipRule?: SipRule;
}
export type VoiceConnectorName = string;
export type VoiceConnectorAwsRegion =
  | "us-east-1"
  | "us-west-2"
  | "ca-central-1"
  | "eu-central-1"
  | "eu-west-1"
  | "eu-west-2"
  | "ap-northeast-2"
  | "ap-northeast-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | (string & {});
export type VoiceConnectorIntegrationType =
  | "CONNECT_CALL_TRANSFER_CONNECTOR"
  | "CONNECT_ANALYTICS_CONNECTOR"
  | (string & {});
export type NetworkType = "IPV4_ONLY" | "DUAL_STACK" | (string & {});
export interface CreateVoiceConnectorRequest {
  Name: string;
  AwsRegion?: VoiceConnectorAwsRegion;
  RequireEncryption: boolean;
  Tags?: Tag[];
  IntegrationType?: VoiceConnectorIntegrationType;
  NetworkType?: NetworkType;
}
export interface VoiceConnector {
  VoiceConnectorId?: string;
  AwsRegion?: VoiceConnectorAwsRegion;
  Name?: string;
  OutboundHostName?: string;
  RequireEncryption?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  VoiceConnectorArn?: string;
  IntegrationType?: VoiceConnectorIntegrationType;
  NetworkType?: NetworkType;
}
export interface CreateVoiceConnectorResponse {
  VoiceConnector?: VoiceConnector;
}
export type VoiceConnectorGroupName = string;
export type VoiceConnectorItemPriority = number;
export interface VoiceConnectorItem {
  VoiceConnectorId: string;
  Priority?: number;
}
export type VoiceConnectorItemList = VoiceConnectorItem[];
export type CallDistributionType =
  | "PriorityWeightedDistribution"
  | "LoadBalancedDistribution"
  | (string & {});
export interface CreateVoiceConnectorGroupRequest {
  Name: string;
  VoiceConnectorItems?: VoiceConnectorItem[];
  CallDistributionType?: CallDistributionType;
}
export interface VoiceConnectorGroup {
  VoiceConnectorGroupId?: string;
  Name?: string;
  VoiceConnectorItems?: VoiceConnectorItem[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  VoiceConnectorGroupArn?: string;
  CallDistributionType?: CallDistributionType;
}
export interface CreateVoiceConnectorGroupResponse {
  VoiceConnectorGroup?: VoiceConnectorGroup;
}
export type NonEmptyString256 = string;
export interface CreateVoiceProfileRequest {
  SpeakerSearchTaskId: string;
}
export type Arn = string | redacted.Redacted<string>;
export interface VoiceProfile {
  VoiceProfileId?: string;
  VoiceProfileArn?: string | redacted.Redacted<string>;
  VoiceProfileDomainId?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  ExpirationTimestamp?: Date;
}
export interface CreateVoiceProfileResponse {
  VoiceProfile?: VoiceProfile;
}
export type VoiceProfileDomainName = string;
export type VoiceProfileDomainDescription = string;
export interface ServerSideEncryptionConfiguration {
  KmsKeyArn: string | redacted.Redacted<string>;
}
export type ClientRequestId = string;
export interface CreateVoiceProfileDomainRequest {
  Name: string;
  Description?: string;
  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export interface VoiceProfileDomain {
  VoiceProfileDomainId?: string;
  VoiceProfileDomainArn?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface CreateVoiceProfileDomainResponse {
  VoiceProfileDomain?: VoiceProfileDomain;
}
export interface DeletePhoneNumberRequest {
  PhoneNumberId: string | redacted.Redacted<string>;
}
export interface DeletePhoneNumberResponse {}
export interface DeleteProxySessionRequest {
  VoiceConnectorId: string;
  ProxySessionId: string;
}
export interface DeleteProxySessionResponse {}
export interface DeleteSipMediaApplicationRequest {
  SipMediaApplicationId: string;
}
export interface DeleteSipMediaApplicationResponse {}
export interface DeleteSipRuleRequest {
  SipRuleId: string;
}
export interface DeleteSipRuleResponse {}
export interface DeleteVoiceConnectorRequest {
  VoiceConnectorId: string;
}
export interface DeleteVoiceConnectorResponse {}
export interface DeleteVoiceConnectorEmergencyCallingConfigurationRequest {
  VoiceConnectorId: string;
}
export interface DeleteVoiceConnectorEmergencyCallingConfigurationResponse {}
export interface DeleteVoiceConnectorExternalSystemsConfigurationRequest {
  VoiceConnectorId: string;
}
export interface DeleteVoiceConnectorExternalSystemsConfigurationResponse {}
export interface DeleteVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
}
export interface DeleteVoiceConnectorGroupResponse {}
export interface DeleteVoiceConnectorOriginationRequest {
  VoiceConnectorId: string;
}
export interface DeleteVoiceConnectorOriginationResponse {}
export interface DeleteVoiceConnectorProxyRequest {
  VoiceConnectorId: string;
}
export interface DeleteVoiceConnectorProxyResponse {}
export interface DeleteVoiceConnectorStreamingConfigurationRequest {
  VoiceConnectorId: string;
}
export interface DeleteVoiceConnectorStreamingConfigurationResponse {}
export interface DeleteVoiceConnectorTerminationRequest {
  VoiceConnectorId: string;
}
export interface DeleteVoiceConnectorTerminationResponse {}
export type SensitiveStringList = (string | redacted.Redacted<string>)[];
export interface DeleteVoiceConnectorTerminationCredentialsRequest {
  VoiceConnectorId: string;
  Usernames: (string | redacted.Redacted<string>)[];
}
export interface DeleteVoiceConnectorTerminationCredentialsResponse {}
export interface DeleteVoiceProfileRequest {
  VoiceProfileId: string;
}
export interface DeleteVoiceProfileResponse {}
export interface DeleteVoiceProfileDomainRequest {
  VoiceProfileDomainId: string;
}
export interface DeleteVoiceProfileDomainResponse {}
export interface DisassociatePhoneNumbersFromVoiceConnectorRequest {
  VoiceConnectorId: string;
  E164PhoneNumbers: (string | redacted.Redacted<string>)[];
}
export interface DisassociatePhoneNumbersFromVoiceConnectorResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export interface DisassociatePhoneNumbersFromVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
  E164PhoneNumbers: (string | redacted.Redacted<string>)[];
}
export interface DisassociatePhoneNumbersFromVoiceConnectorGroupResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export interface GetGlobalSettingsRequest {}
export type S3BucketName = string;
export interface VoiceConnectorSettings {
  CdrBucket?: string;
}
export interface GetGlobalSettingsResponse {
  VoiceConnector?: VoiceConnectorSettings;
}
export interface GetPhoneNumberRequest {
  PhoneNumberId: string | redacted.Redacted<string>;
}
export type Alpha2CountryCode = string;
export type PhoneNumberType = "Local" | "TollFree" | (string & {});
export type PhoneNumberStatus =
  | "Cancelled"
  | "PortinCancelRequested"
  | "PortinInProgress"
  | "AcquireInProgress"
  | "AcquireFailed"
  | "Unassigned"
  | "Assigned"
  | "ReleaseInProgress"
  | "DeleteInProgress"
  | "ReleaseFailed"
  | "DeleteFailed"
  | (string & {});
export interface PhoneNumberCapabilities {
  InboundCall?: boolean;
  OutboundCall?: boolean;
  InboundSMS?: boolean;
  OutboundSMS?: boolean;
  InboundMMS?: boolean;
  OutboundMMS?: boolean;
}
export type PhoneNumberAssociationName =
  | "VoiceConnectorId"
  | "VoiceConnectorGroupId"
  | "SipRuleId"
  | (string & {});
export interface PhoneNumberAssociation {
  Value?: string;
  Name?: PhoneNumberAssociationName;
  AssociatedTimestamp?: Date;
}
export type PhoneNumberAssociationList = PhoneNumberAssociation[];
export type CallingNameStatus =
  | "Unassigned"
  | "UpdateInProgress"
  | "UpdateSucceeded"
  | "UpdateFailed"
  | (string & {});
export interface PhoneNumber {
  PhoneNumberId?: string | redacted.Redacted<string>;
  E164PhoneNumber?: string | redacted.Redacted<string>;
  PhoneNumberArn?: string;
  Country?: string;
  Type?: PhoneNumberType;
  ProductType?: PhoneNumberProductType;
  Status?: PhoneNumberStatus;
  Capabilities?: PhoneNumberCapabilities;
  Associations?: PhoneNumberAssociation[];
  CallingName?: string | redacted.Redacted<string>;
  CallingNameStatus?: CallingNameStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  DeletionTimestamp?: Date;
  OrderId?: string;
  Name?: string | redacted.Redacted<string>;
}
export interface GetPhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export interface GetPhoneNumberOrderRequest {
  PhoneNumberOrderId: string;
}
export interface GetPhoneNumberOrderResponse {
  PhoneNumberOrder?: PhoneNumberOrder;
}
export interface GetPhoneNumberSettingsRequest {}
export interface GetPhoneNumberSettingsResponse {
  CallingName?: string | redacted.Redacted<string>;
  CallingNameUpdatedTimestamp?: Date;
}
export interface GetProxySessionRequest {
  VoiceConnectorId: string;
  ProxySessionId: string;
}
export interface GetProxySessionResponse {
  ProxySession?: ProxySession;
}
export interface GetSipMediaApplicationRequest {
  SipMediaApplicationId: string;
}
export interface GetSipMediaApplicationResponse {
  SipMediaApplication?: SipMediaApplication;
}
export interface GetSipMediaApplicationAlexaSkillConfigurationRequest {
  SipMediaApplicationId: string;
}
export type AlexaSkillStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type AlexaSkillId = string | redacted.Redacted<string>;
export type AlexaSkillIdList = (string | redacted.Redacted<string>)[];
export interface SipMediaApplicationAlexaSkillConfiguration {
  AlexaSkillStatus: AlexaSkillStatus;
  AlexaSkillIds: (string | redacted.Redacted<string>)[];
}
export interface GetSipMediaApplicationAlexaSkillConfigurationResponse {
  SipMediaApplicationAlexaSkillConfiguration?: SipMediaApplicationAlexaSkillConfiguration;
}
export interface GetSipMediaApplicationLoggingConfigurationRequest {
  SipMediaApplicationId: string;
}
export interface SipMediaApplicationLoggingConfiguration {
  EnableSipMediaApplicationMessageLogs?: boolean;
}
export interface GetSipMediaApplicationLoggingConfigurationResponse {
  SipMediaApplicationLoggingConfiguration?: SipMediaApplicationLoggingConfiguration;
}
export interface GetSipRuleRequest {
  SipRuleId: string;
}
export interface GetSipRuleResponse {
  SipRule?: SipRule;
}
export interface GetSpeakerSearchTaskRequest {
  VoiceConnectorId: string;
  SpeakerSearchTaskId: string;
}
export interface CallDetails {
  VoiceConnectorId?: string;
  TransactionId?: string;
  IsCaller?: boolean;
}
export type ConfidenceScore = number;
export interface SpeakerSearchResult {
  ConfidenceScore?: number;
  VoiceProfileId?: string;
}
export type SpeakerSearchResultList = SpeakerSearchResult[];
export interface SpeakerSearchDetails {
  Results?: SpeakerSearchResult[];
  VoiceprintGenerationStatus?: string;
}
export interface SpeakerSearchTask {
  SpeakerSearchTaskId?: string;
  SpeakerSearchTaskStatus?: string;
  CallDetails?: CallDetails;
  SpeakerSearchDetails?: SpeakerSearchDetails;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  StartedTimestamp?: Date;
  StatusMessage?: string;
}
export interface GetSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export interface GetVoiceConnectorRequest {
  VoiceConnectorId: string;
}
export interface GetVoiceConnectorResponse {
  VoiceConnector?: VoiceConnector;
}
export interface GetVoiceConnectorEmergencyCallingConfigurationRequest {
  VoiceConnectorId: string;
}
export interface DNISEmergencyCallingConfiguration {
  EmergencyPhoneNumber: string | redacted.Redacted<string>;
  TestPhoneNumber?: string | redacted.Redacted<string>;
  CallingCountry: string;
}
export type DNISEmergencyCallingConfigurationList =
  DNISEmergencyCallingConfiguration[];
export interface EmergencyCallingConfiguration {
  DNIS?: DNISEmergencyCallingConfiguration[];
}
export interface GetVoiceConnectorEmergencyCallingConfigurationResponse {
  EmergencyCallingConfiguration?: EmergencyCallingConfiguration;
}
export interface GetVoiceConnectorExternalSystemsConfigurationRequest {
  VoiceConnectorId: string;
}
export type SessionBorderControllerType =
  | "RIBBON_SBC"
  | "ORACLE_ACME_PACKET_SBC"
  | "AVAYA_SBCE"
  | "CISCO_UNIFIED_BORDER_ELEMENT"
  | "AUDIOCODES_MEDIANT_SBC"
  | (string & {});
export type SessionBorderControllerTypeList = SessionBorderControllerType[];
export type ContactCenterSystemType =
  | "GENESYS_ENGAGE_ON_PREMISES"
  | "AVAYA_AURA_CALL_CENTER_ELITE"
  | "AVAYA_AURA_CONTACT_CENTER"
  | "CISCO_UNIFIED_CONTACT_CENTER_ENTERPRISE"
  | (string & {});
export type ContactCenterSystemTypeList = ContactCenterSystemType[];
export interface ExternalSystemsConfiguration {
  SessionBorderControllerTypes?: SessionBorderControllerType[];
  ContactCenterSystemTypes?: ContactCenterSystemType[];
}
export interface GetVoiceConnectorExternalSystemsConfigurationResponse {
  ExternalSystemsConfiguration?: ExternalSystemsConfiguration;
}
export interface GetVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
}
export interface GetVoiceConnectorGroupResponse {
  VoiceConnectorGroup?: VoiceConnectorGroup;
}
export interface GetVoiceConnectorLoggingConfigurationRequest {
  VoiceConnectorId: string;
}
export interface LoggingConfiguration {
  EnableSIPLogs?: boolean;
  EnableMediaMetricLogs?: boolean;
}
export interface GetVoiceConnectorLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export interface GetVoiceConnectorOriginationRequest {
  VoiceConnectorId: string;
}
export type Port = number;
export type OriginationRouteProtocol = "TCP" | "UDP" | (string & {});
export type OriginationRoutePriority = number;
export type OriginationRouteWeight = number;
export interface OriginationRoute {
  Host?: string;
  Port?: number;
  Protocol?: OriginationRouteProtocol;
  Priority?: number;
  Weight?: number;
}
export type OriginationRouteList = OriginationRoute[];
export interface Origination {
  Routes?: OriginationRoute[];
  Disabled?: boolean;
}
export interface GetVoiceConnectorOriginationResponse {
  Origination?: Origination;
}
export interface GetVoiceConnectorProxyRequest {
  VoiceConnectorId: string;
}
export type StringList = string[];
export interface Proxy {
  DefaultSessionExpiryMinutes?: number;
  Disabled?: boolean;
  FallBackPhoneNumber?: string | redacted.Redacted<string>;
  PhoneNumberCountries?: string[];
}
export interface GetVoiceConnectorProxyResponse {
  Proxy?: Proxy;
}
export interface GetVoiceConnectorStreamingConfigurationRequest {
  VoiceConnectorId: string;
}
export type DataRetentionInHours = number;
export type NotificationTarget = "EventBridge" | "SNS" | "SQS" | (string & {});
export interface StreamingNotificationTarget {
  NotificationTarget?: NotificationTarget;
}
export type StreamingNotificationTargetList = StreamingNotificationTarget[];
export interface MediaInsightsConfiguration {
  Disabled?: boolean;
  ConfigurationArn?: string | redacted.Redacted<string>;
}
export interface StreamingConfiguration {
  DataRetentionInHours: number;
  Disabled: boolean;
  StreamingNotificationTargets?: StreamingNotificationTarget[];
  MediaInsightsConfiguration?: MediaInsightsConfiguration;
}
export interface GetVoiceConnectorStreamingConfigurationResponse {
  StreamingConfiguration?: StreamingConfiguration;
}
export interface GetVoiceConnectorTerminationRequest {
  VoiceConnectorId: string;
}
export type CpsLimit = number;
export type CallingRegion = string;
export type CallingRegionList = string[];
export interface Termination {
  CpsLimit?: number;
  DefaultPhoneNumber?: string | redacted.Redacted<string>;
  CallingRegions?: string[];
  CidrAllowedList?: string[];
  Disabled?: boolean;
}
export interface GetVoiceConnectorTerminationResponse {
  Termination?: Termination;
}
export interface GetVoiceConnectorTerminationHealthRequest {
  VoiceConnectorId: string;
}
export interface TerminationHealth {
  Timestamp?: Date;
  Source?: string;
}
export interface GetVoiceConnectorTerminationHealthResponse {
  TerminationHealth?: TerminationHealth;
}
export interface GetVoiceProfileRequest {
  VoiceProfileId: string;
}
export interface GetVoiceProfileResponse {
  VoiceProfile?: VoiceProfile;
}
export interface GetVoiceProfileDomainRequest {
  VoiceProfileDomainId: string;
}
export interface GetVoiceProfileDomainResponse {
  VoiceProfileDomain?: VoiceProfileDomain;
}
export interface GetVoiceToneAnalysisTaskRequest {
  VoiceConnectorId: string;
  VoiceToneAnalysisTaskId: string;
  IsCaller: boolean;
}
export interface VoiceToneAnalysisTask {
  VoiceToneAnalysisTaskId?: string;
  VoiceToneAnalysisTaskStatus?: string;
  CallDetails?: CallDetails;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  StartedTimestamp?: Date;
  StatusMessage?: string;
}
export interface GetVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export interface ListAvailableVoiceConnectorRegionsRequest {}
export type VoiceConnectorAwsRegionList = VoiceConnectorAwsRegion[];
export interface ListAvailableVoiceConnectorRegionsResponse {
  VoiceConnectorRegions?: VoiceConnectorAwsRegion[];
}
export type NextTokenString = string;
export type ResultMax = number;
export interface ListPhoneNumberOrdersRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type PhoneNumberOrderList = PhoneNumberOrder[];
export interface ListPhoneNumberOrdersResponse {
  PhoneNumberOrders?: PhoneNumberOrder[];
  NextToken?: string;
}
export interface ListPhoneNumbersRequest {
  Status?: string;
  ProductType?: PhoneNumberProductType;
  FilterName?: PhoneNumberAssociationName;
  FilterValue?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type PhoneNumberList = PhoneNumber[];
export interface ListPhoneNumbersResponse {
  PhoneNumbers?: PhoneNumber[];
  NextToken?: string;
}
export interface ListProxySessionsRequest {
  VoiceConnectorId: string;
  Status?: ProxySessionStatus;
  NextToken?: string;
  MaxResults?: number;
}
export type ProxySessions = ProxySession[];
export interface ListProxySessionsResponse {
  ProxySessions?: ProxySession[];
  NextToken?: string;
}
export interface ListSipMediaApplicationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type SipMediaApplicationList = SipMediaApplication[];
export interface ListSipMediaApplicationsResponse {
  SipMediaApplications?: SipMediaApplication[];
  NextToken?: string;
}
export interface ListSipRulesRequest {
  SipMediaApplicationId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SipRuleList = SipRule[];
export interface ListSipRulesResponse {
  SipRules?: SipRule[];
  NextToken?: string;
}
export interface ListSupportedPhoneNumberCountriesRequest {
  ProductType: PhoneNumberProductType;
}
export type PhoneNumberTypeList = PhoneNumberType[];
export interface PhoneNumberCountry {
  CountryCode?: string;
  SupportedPhoneNumberTypes?: PhoneNumberType[];
}
export type PhoneNumberCountriesList = PhoneNumberCountry[];
export interface ListSupportedPhoneNumberCountriesResponse {
  PhoneNumberCountries?: PhoneNumberCountry[];
}
export interface ListTagsForResourceRequest {
  ResourceARN: string | redacted.Redacted<string>;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListVoiceConnectorGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type VoiceConnectorGroupList = VoiceConnectorGroup[];
export interface ListVoiceConnectorGroupsResponse {
  VoiceConnectorGroups?: VoiceConnectorGroup[];
  NextToken?: string;
}
export interface ListVoiceConnectorsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type VoiceConnectorList = VoiceConnector[];
export interface ListVoiceConnectorsResponse {
  VoiceConnectors?: VoiceConnector[];
  NextToken?: string;
}
export interface ListVoiceConnectorTerminationCredentialsRequest {
  VoiceConnectorId: string;
}
export interface ListVoiceConnectorTerminationCredentialsResponse {
  Usernames?: (string | redacted.Redacted<string>)[];
}
export interface ListVoiceProfileDomainsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface VoiceProfileDomainSummary {
  VoiceProfileDomainId?: string;
  VoiceProfileDomainArn?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export type VoiceProfileDomainSummaryList = VoiceProfileDomainSummary[];
export interface ListVoiceProfileDomainsResponse {
  VoiceProfileDomains?: VoiceProfileDomainSummary[];
  NextToken?: string;
}
export interface ListVoiceProfilesRequest {
  VoiceProfileDomainId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface VoiceProfileSummary {
  VoiceProfileId?: string;
  VoiceProfileArn?: string | redacted.Redacted<string>;
  VoiceProfileDomainId?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  ExpirationTimestamp?: Date;
}
export type VoiceProfileSummaryList = VoiceProfileSummary[];
export interface ListVoiceProfilesResponse {
  VoiceProfiles?: VoiceProfileSummary[];
  NextToken?: string;
}
export interface PutSipMediaApplicationAlexaSkillConfigurationRequest {
  SipMediaApplicationId: string;
  SipMediaApplicationAlexaSkillConfiguration?: SipMediaApplicationAlexaSkillConfiguration;
}
export interface PutSipMediaApplicationAlexaSkillConfigurationResponse {
  SipMediaApplicationAlexaSkillConfiguration?: SipMediaApplicationAlexaSkillConfiguration;
}
export interface PutSipMediaApplicationLoggingConfigurationRequest {
  SipMediaApplicationId: string;
  SipMediaApplicationLoggingConfiguration?: SipMediaApplicationLoggingConfiguration;
}
export interface PutSipMediaApplicationLoggingConfigurationResponse {
  SipMediaApplicationLoggingConfiguration?: SipMediaApplicationLoggingConfiguration;
}
export interface PutVoiceConnectorEmergencyCallingConfigurationRequest {
  VoiceConnectorId: string;
  EmergencyCallingConfiguration: EmergencyCallingConfiguration;
}
export interface PutVoiceConnectorEmergencyCallingConfigurationResponse {
  EmergencyCallingConfiguration?: EmergencyCallingConfiguration;
}
export interface PutVoiceConnectorExternalSystemsConfigurationRequest {
  VoiceConnectorId: string;
  SessionBorderControllerTypes?: SessionBorderControllerType[];
  ContactCenterSystemTypes?: ContactCenterSystemType[];
}
export interface PutVoiceConnectorExternalSystemsConfigurationResponse {
  ExternalSystemsConfiguration?: ExternalSystemsConfiguration;
}
export interface PutVoiceConnectorLoggingConfigurationRequest {
  VoiceConnectorId: string;
  LoggingConfiguration: LoggingConfiguration;
}
export interface PutVoiceConnectorLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export interface PutVoiceConnectorOriginationRequest {
  VoiceConnectorId: string;
  Origination: Origination;
}
export interface PutVoiceConnectorOriginationResponse {
  Origination?: Origination;
}
export type CountryList = string[];
export interface PutVoiceConnectorProxyRequest {
  VoiceConnectorId: string;
  DefaultSessionExpiryMinutes: number;
  PhoneNumberPoolCountries: string[];
  FallBackPhoneNumber?: string | redacted.Redacted<string>;
  Disabled?: boolean;
}
export interface PutVoiceConnectorProxyResponse {
  Proxy?: Proxy;
}
export interface PutVoiceConnectorStreamingConfigurationRequest {
  VoiceConnectorId: string;
  StreamingConfiguration: StreamingConfiguration;
}
export interface PutVoiceConnectorStreamingConfigurationResponse {
  StreamingConfiguration?: StreamingConfiguration;
}
export interface PutVoiceConnectorTerminationRequest {
  VoiceConnectorId: string;
  Termination: Termination;
}
export interface PutVoiceConnectorTerminationResponse {
  Termination?: Termination;
}
export interface Credential {
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
}
export type CredentialList = Credential[];
export interface PutVoiceConnectorTerminationCredentialsRequest {
  VoiceConnectorId: string;
  Credentials?: Credential[];
}
export interface PutVoiceConnectorTerminationCredentialsResponse {}
export interface RestorePhoneNumberRequest {
  PhoneNumberId: string | redacted.Redacted<string>;
}
export interface RestorePhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export type TollFreePrefix = string;
export type PhoneNumberMaxResults = number;
export interface SearchAvailablePhoneNumbersRequest {
  AreaCode?: string;
  City?: string;
  Country?: string;
  State?: string;
  TollFreePrefix?: string;
  PhoneNumberType?: PhoneNumberType;
  MaxResults?: number;
  NextToken?: string;
}
export interface SearchAvailablePhoneNumbersResponse {
  E164PhoneNumbers?: (string | redacted.Redacted<string>)[];
  NextToken?: string;
}
export type CallLegType = "Caller" | "Callee" | (string & {});
export interface StartSpeakerSearchTaskRequest {
  VoiceConnectorId: string;
  TransactionId: string;
  VoiceProfileDomainId: string;
  ClientRequestToken?: string;
  CallLeg?: CallLegType;
}
export interface StartSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export type LanguageCode = "en-US" | (string & {});
export interface StartVoiceToneAnalysisTaskRequest {
  VoiceConnectorId: string;
  TransactionId: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
}
export interface StartVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export interface StopSpeakerSearchTaskRequest {
  VoiceConnectorId: string;
  SpeakerSearchTaskId: string;
}
export interface StopSpeakerSearchTaskResponse {}
export interface StopVoiceToneAnalysisTaskRequest {
  VoiceConnectorId: string;
  VoiceToneAnalysisTaskId: string;
}
export interface StopVoiceToneAnalysisTaskResponse {}
export interface TagResourceRequest {
  ResourceARN: string | redacted.Redacted<string>;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  ResourceARN: string | redacted.Redacted<string>;
  TagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export interface UpdateGlobalSettingsRequest {
  VoiceConnector: VoiceConnectorSettings;
}
export interface UpdateGlobalSettingsResponse {}
export interface UpdatePhoneNumberRequest {
  PhoneNumberId: string | redacted.Redacted<string>;
  ProductType?: PhoneNumberProductType;
  CallingName?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export interface UpdatePhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export interface UpdatePhoneNumberSettingsRequest {
  CallingName: string | redacted.Redacted<string>;
}
export interface UpdatePhoneNumberSettingsResponse {}
export interface UpdateProxySessionRequest {
  VoiceConnectorId: string;
  ProxySessionId: string;
  Capabilities: Capability[];
  ExpiryMinutes?: number;
}
export interface UpdateProxySessionResponse {
  ProxySession?: ProxySession;
}
export interface UpdateSipMediaApplicationRequest {
  SipMediaApplicationId: string;
  Name?: string;
  Endpoints?: SipMediaApplicationEndpoint[];
}
export interface UpdateSipMediaApplicationResponse {
  SipMediaApplication?: SipMediaApplication;
}
export type SMAUpdateCallArgumentsMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface UpdateSipMediaApplicationCallRequest {
  SipMediaApplicationId: string;
  TransactionId: string;
  Arguments: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export interface UpdateSipMediaApplicationCallResponse {
  SipMediaApplicationCall?: SipMediaApplicationCall;
}
export interface UpdateSipRuleRequest {
  SipRuleId: string;
  Name: string;
  Disabled?: boolean;
  TargetApplications?: SipRuleTargetApplication[];
}
export interface UpdateSipRuleResponse {
  SipRule?: SipRule;
}
export interface UpdateVoiceConnectorRequest {
  VoiceConnectorId: string;
  Name: string;
  RequireEncryption: boolean;
}
export interface UpdateVoiceConnectorResponse {
  VoiceConnector?: VoiceConnector;
}
export interface UpdateVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
  Name: string;
  VoiceConnectorItems: VoiceConnectorItem[];
  CallDistributionType?: CallDistributionType;
}
export interface UpdateVoiceConnectorGroupResponse {
  VoiceConnectorGroup?: VoiceConnectorGroup;
}
export interface UpdateVoiceProfileRequest {
  VoiceProfileId: string;
  SpeakerSearchTaskId: string;
}
export interface UpdateVoiceProfileResponse {
  VoiceProfile?: VoiceProfile;
}
export interface UpdateVoiceProfileDomainRequest {
  VoiceProfileDomainId: string;
  Name?: string;
  Description?: string;
}
export interface UpdateVoiceProfileDomainResponse {
  VoiceProfileDomain?: VoiceProfileDomain;
}
export interface ValidateE911AddressRequest {
  AwsAccountId: string;
  StreetNumber: string | redacted.Redacted<string>;
  StreetInfo: string | redacted.Redacted<string>;
  City: string | redacted.Redacted<string>;
  State: string | redacted.Redacted<string>;
  Country: string | redacted.Redacted<string>;
  PostalCode: string | redacted.Redacted<string>;
}
export type ValidationResult = number;
export interface Address {
  streetName?: string | redacted.Redacted<string>;
  streetSuffix?: string | redacted.Redacted<string>;
  postDirectional?: string | redacted.Redacted<string>;
  preDirectional?: string | redacted.Redacted<string>;
  streetNumber?: string | redacted.Redacted<string>;
  city?: string | redacted.Redacted<string>;
  state?: string | redacted.Redacted<string>;
  postalCode?: string | redacted.Redacted<string>;
  postalCodePlus4?: string | redacted.Redacted<string>;
  country?: string | redacted.Redacted<string>;
}
export interface CandidateAddress {
  streetInfo?: string | redacted.Redacted<string>;
  streetNumber?: string | redacted.Redacted<string>;
  city?: string | redacted.Redacted<string>;
  state?: string | redacted.Redacted<string>;
  postalCode?: string | redacted.Redacted<string>;
  postalCodePlus4?: string | redacted.Redacted<string>;
  country?: string | redacted.Redacted<string>;
}
export type CandidateAddressList = CandidateAddress[];
export interface ValidateE911AddressResponse {
  ValidationResult?: number;
  AddressExternalId?: string;
  Address?: Address;
  CandidateAddressList?: CandidateAddress[];
}
export type AssociatePhoneNumbersWithVoiceConnectorError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Associates phone numbers with the specified Amazon Chime SDK Voice Connector.
 */
export const associatePhoneNumbersWithVoiceConnector: API.OperationMethod<
  AssociatePhoneNumbersWithVoiceConnectorRequest,
  AssociatePhoneNumbersWithVoiceConnectorResponse,
  AssociatePhoneNumbersWithVoiceConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}?operation=associate-phone-numbers",
    input: { VoiceConnectorId: 0, E164PhoneNumbers: 0, ForceAssociate: 0 },
    output: { PhoneNumberErrors: D.list(o_PhoneNumberError) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePhoneNumbersWithVoiceConnector",
})) as any;

export type AssociatePhoneNumbersWithVoiceConnectorGroupError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Associates phone numbers with the specified Amazon Chime SDK Voice Connector group.
 */
export const associatePhoneNumbersWithVoiceConnectorGroup: API.OperationMethod<
  AssociatePhoneNumbersWithVoiceConnectorGroupRequest,
  AssociatePhoneNumbersWithVoiceConnectorGroupResponse,
  AssociatePhoneNumbersWithVoiceConnectorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connector-groups/{VoiceConnectorGroupId}?operation=associate-phone-numbers",
    input: { VoiceConnectorGroupId: 0, E164PhoneNumbers: 0, ForceAssociate: 0 },
    output: { PhoneNumberErrors: D.list(o_PhoneNumberError) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePhoneNumbersWithVoiceConnectorGroup",
})) as any;

export type BatchDeletePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Moves phone numbers into the
 * **Deletion queue**. Phone numbers must be disassociated from any users or Amazon Chime SDK Voice Connectors before they can be deleted.
 *
 * Phone numbers remain in the
 * **Deletion queue** for 7 days before they are deleted permanently.
 */
export const batchDeletePhoneNumber: API.OperationMethod<
  BatchDeletePhoneNumberRequest,
  BatchDeletePhoneNumberResponse,
  BatchDeletePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-numbers?operation=batch-delete",
    input: { PhoneNumberIds: 0 },
    output: { PhoneNumberErrors: D.list(o_PhoneNumberError) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePhoneNumber",
})) as any;

export type BatchUpdatePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates phone number product types, calling names, or phone number names. You can update one attribute at a time for each
 * `UpdatePhoneNumberRequestItem`. For example, you can update the product type, the calling name, or phone name.
 *
 * You cannot have a duplicate `phoneNumberId` in a request.
 */
export const batchUpdatePhoneNumber: API.OperationMethod<
  BatchUpdatePhoneNumberRequest,
  BatchUpdatePhoneNumberResponse,
  BatchUpdatePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-numbers?operation=batch-update",
    input: {
      UpdatePhoneNumberRequestItems: D.list({
        PhoneNumberId: 0,
        ProductType: 0,
        CallingName: 0,
        Name: 0,
      }),
    },
    output: { PhoneNumberErrors: D.list(o_PhoneNumberError) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdatePhoneNumber",
})) as any;

export type CreatePhoneNumberOrderError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an order for phone numbers to be provisioned. For numbers outside the U.S., you must use the Amazon Chime SDK SIP media application dial-in product type.
 */
export const createPhoneNumberOrder: API.OperationMethod<
  CreatePhoneNumberOrderRequest,
  CreatePhoneNumberOrderResponse,
  CreatePhoneNumberOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-number-orders",
    input: { ProductType: 0, E164PhoneNumbers: 0, Name: 0 },
    output: { PhoneNumberOrder: o_PhoneNumberOrder },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePhoneNumberOrder",
})) as any;

export type CreateProxySessionError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a proxy session for the specified Amazon Chime SDK Voice Connector for
 * the specified participant phone numbers.
 *
 * End of support notice: On April 7, 2026, AWS will end support for Amazon Chime SDK proxy sessions.
 */
export const createProxySession: API.OperationMethod<
  CreateProxySessionRequest,
  CreateProxySessionResponse,
  CreateProxySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}/proxy-sessions",
    input: {
      VoiceConnectorId: 0,
      ParticipantPhoneNumbers: 0,
      Name: 0,
      ExpiryMinutes: 0,
      Capabilities: 0,
      NumberSelectionBehavior: 0,
      GeoMatchLevel: 0,
      GeoMatchParams: { Country: 0, AreaCode: 0 },
    },
    output: { ProxySession: o_ProxySession },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxySession",
})) as any;

export type CreateSipMediaApplicationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a SIP media application. For more information about SIP media applications, see Managing SIP media applications
 * and rules in the *Amazon Chime SDK Administrator Guide*.
 */
export const createSipMediaApplication: API.OperationMethod<
  CreateSipMediaApplicationRequest,
  CreateSipMediaApplicationResponse,
  CreateSipMediaApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sip-media-applications",
    input: {
      AwsRegion: 0,
      Name: 0,
      Endpoints: D.list(i_SipMediaApplicationEndpoint),
      Tags: D.list(i_Tag),
    },
    output: { SipMediaApplication: o_SipMediaApplication },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSipMediaApplication",
})) as any;

export type CreateSipMediaApplicationCallError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an outbound call to a phone number from the phone number specified
 * in the request, and it invokes the endpoint of the specified
 * `sipMediaApplicationId`.
 */
export const createSipMediaApplicationCall: API.OperationMethod<
  CreateSipMediaApplicationCallRequest,
  CreateSipMediaApplicationCallResponse,
  CreateSipMediaApplicationCallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sip-media-applications/{SipMediaApplicationId}/calls",
    input: {
      FromPhoneNumber: 0,
      ToPhoneNumber: 0,
      SipMediaApplicationId: 0,
      SipHeaders: 0,
      ArgumentsMap: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSipMediaApplicationCall",
})) as any;

export type CreateSipRuleError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a SIP rule, which can be used to run a SIP media application as a target for a specific trigger type. For more information about SIP rules, see Managing SIP media applications
 * and rules in the *Amazon Chime SDK Administrator Guide*.
 */
export const createSipRule: API.OperationMethod<
  CreateSipRuleRequest,
  CreateSipRuleResponse,
  CreateSipRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sip-rules",
    input: {
      Name: 0,
      TriggerType: 0,
      TriggerValue: 0,
      Disabled: 0,
      TargetApplications: D.list(i_SipRuleTargetApplication),
    },
    output: { SipRule: o_SipRule },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSipRule",
})) as any;

export type CreateVoiceConnectorError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an Amazon Chime SDK Voice Connector. For more information about
 * Voice Connectors,
 * see Managing Amazon Chime SDK Voice Connector groups in the Amazon Chime SDK
 * Administrator Guide.
 */
export const createVoiceConnector: API.OperationMethod<
  CreateVoiceConnectorRequest,
  CreateVoiceConnectorResponse,
  CreateVoiceConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors",
    input: {
      Name: 0,
      AwsRegion: 0,
      RequireEncryption: 0,
      Tags: D.list(i_Tag),
      IntegrationType: 0,
      NetworkType: 0,
    },
    output: { VoiceConnector: o_VoiceConnector },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVoiceConnector",
})) as any;

export type CreateVoiceConnectorGroupError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an Amazon Chime SDK Voice Connector group under the administrator's
 * AWS account. You can associate Amazon Chime SDK Voice Connectors with the
 * Voice Connector group by including `VoiceConnectorItems` in the
 * request.
 *
 * You can include Voice Connectors from different AWS Regions in your group.
 * This creates a fault tolerant mechanism for fallback in case of availability events.
 */
export const createVoiceConnectorGroup: API.OperationMethod<
  CreateVoiceConnectorGroupRequest,
  CreateVoiceConnectorGroupResponse,
  CreateVoiceConnectorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connector-groups",
    input: {
      Name: 0,
      VoiceConnectorItems: D.list(i_VoiceConnectorItem),
      CallDistributionType: 0,
    },
    output: { VoiceConnectorGroup: o_VoiceConnectorGroup },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVoiceConnectorGroup",
})) as any;

export type CreateVoiceProfileError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a voice profile, which consists of an enrolled user and their latest voice print.
 *
 * Before creating any voice profiles, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 *
 * For more information about voice profiles and voice analytics, see Using Amazon Chime SDK Voice Analytics
 * in the *Amazon Chime SDK Developer Guide*.
 */
export const createVoiceProfile: API.OperationMethod<
  CreateVoiceProfileRequest,
  CreateVoiceProfileResponse,
  CreateVoiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-profiles",
    input: { SpeakerSearchTaskId: 0 },
    output: { VoiceProfile: o_VoiceProfile },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVoiceProfile",
})) as any;

export type CreateVoiceProfileDomainError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a voice profile domain, a collection of voice profiles, their voice prints, and encrypted enrollment audio.
 *
 * Before creating any voice profiles, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 *
 * For more information about voice profile domains, see Using Amazon Chime SDK Voice Analytics
 * in the *Amazon Chime SDK Developer Guide*.
 */
export const createVoiceProfileDomain: API.OperationMethod<
  CreateVoiceProfileDomainRequest,
  CreateVoiceProfileDomainResponse,
  CreateVoiceProfileDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-profile-domains",
    input: {
      Name: 0,
      Description: 0,
      ServerSideEncryptionConfiguration: { KmsKeyArn: 0 },
      ClientRequestToken: 0,
      Tags: D.list(i_Tag),
    },
    output: { VoiceProfileDomain: o_VoiceProfileDomain },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVoiceProfileDomain",
})) as any;

export type DeletePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Moves the specified phone number into the
 * **Deletion queue**. A phone number must
 * be disassociated from any users or Amazon Chime SDK Voice Connectors before it can be
 * deleted.
 *
 * Deleted phone numbers remain in the
 * **Deletion queue** queue for 7 days before
 * they are deleted permanently.
 */
export const deletePhoneNumber: API.OperationMethod<
  DeletePhoneNumberRequest,
  DeletePhoneNumberResponse,
  DeletePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /phone-numbers/{PhoneNumberId}",
    input: { PhoneNumberId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePhoneNumber",
})) as any;

export type DeleteProxySessionError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the specified proxy session from the specified Amazon Chime SDK Voice
 * Connector.
 *
 * End of support notice: On April 7, 2026, AWS will end support for Amazon Chime SDK proxy sessions.
 */
export const deleteProxySession: API.OperationMethod<
  DeleteProxySessionRequest,
  DeleteProxySessionResponse,
  DeleteProxySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
    input: { VoiceConnectorId: 0, ProxySessionId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxySession",
})) as any;

export type DeleteSipMediaApplicationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a SIP media application.
 */
export const deleteSipMediaApplication: API.OperationMethod<
  DeleteSipMediaApplicationRequest,
  DeleteSipMediaApplicationResponse,
  DeleteSipMediaApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sip-media-applications/{SipMediaApplicationId}",
    input: { SipMediaApplicationId: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSipMediaApplication",
})) as any;

export type DeleteSipRuleError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a SIP rule.
 */
export const deleteSipRule: API.OperationMethod<
  DeleteSipRuleRequest,
  DeleteSipRuleResponse,
  DeleteSipRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sip-rules/{SipRuleId}",
    input: { SipRuleId: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSipRule",
})) as any;

export type DeleteVoiceConnectorError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes an Amazon Chime SDK Voice Connector. Any phone numbers associated
 * with the Amazon Chime SDK Voice Connector must be disassociated from it before it
 * can be deleted.
 */
export const deleteVoiceConnector: API.OperationMethod<
  DeleteVoiceConnectorRequest,
  DeleteVoiceConnectorResponse,
  DeleteVoiceConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connectors/{VoiceConnectorId}",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnector",
})) as any;

export type DeleteVoiceConnectorEmergencyCallingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the emergency calling details from the specified Amazon Chime SDK Voice
 * Connector.
 */
export const deleteVoiceConnectorEmergencyCallingConfiguration: API.OperationMethod<
  DeleteVoiceConnectorEmergencyCallingConfigurationRequest,
  DeleteVoiceConnectorEmergencyCallingConfigurationResponse,
  DeleteVoiceConnectorEmergencyCallingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnectorEmergencyCallingConfiguration",
})) as any;

export type DeleteVoiceConnectorExternalSystemsConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the external systems configuration for a Voice Connector.
 */
export const deleteVoiceConnectorExternalSystemsConfiguration: API.OperationMethod<
  DeleteVoiceConnectorExternalSystemsConfigurationRequest,
  DeleteVoiceConnectorExternalSystemsConfigurationResponse,
  DeleteVoiceConnectorExternalSystemsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connectors/{VoiceConnectorId}/external-systems-configuration",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnectorExternalSystemsConfiguration",
})) as any;

export type DeleteVoiceConnectorGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes an Amazon Chime SDK Voice Connector group. Any `VoiceConnectorItems`
 * and phone numbers associated with the group must be removed before it can be
 * deleted.
 */
export const deleteVoiceConnectorGroup: API.OperationMethod<
  DeleteVoiceConnectorGroupRequest,
  DeleteVoiceConnectorGroupResponse,
  DeleteVoiceConnectorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connector-groups/{VoiceConnectorGroupId}",
    input: { VoiceConnectorGroupId: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnectorGroup",
})) as any;

export type DeleteVoiceConnectorOriginationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the origination settings for the specified Amazon Chime SDK Voice Connector.
 *
 * If emergency calling is configured for the Voice Connector, it must be
 * deleted prior to deleting the origination settings.
 */
export const deleteVoiceConnectorOrigination: API.OperationMethod<
  DeleteVoiceConnectorOriginationRequest,
  DeleteVoiceConnectorOriginationResponse,
  DeleteVoiceConnectorOriginationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connectors/{VoiceConnectorId}/origination",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnectorOrigination",
})) as any;

export type DeleteVoiceConnectorProxyError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the proxy configuration from the specified Amazon Chime SDK Voice Connector.
 *
 * End of support notice: On April 7, 2026, AWS will end support for Amazon Chime SDK proxy sessions.
 */
export const deleteVoiceConnectorProxy: API.OperationMethod<
  DeleteVoiceConnectorProxyRequest,
  DeleteVoiceConnectorProxyResponse,
  DeleteVoiceConnectorProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnectorProxy",
})) as any;

export type DeleteVoiceConnectorStreamingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a Voice Connector's streaming configuration.
 */
export const deleteVoiceConnectorStreamingConfiguration: API.OperationMethod<
  DeleteVoiceConnectorStreamingConfigurationRequest,
  DeleteVoiceConnectorStreamingConfigurationResponse,
  DeleteVoiceConnectorStreamingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connectors/{VoiceConnectorId}/streaming-configuration",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnectorStreamingConfiguration",
})) as any;

export type DeleteVoiceConnectorTerminationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the termination settings for the specified Amazon Chime SDK Voice Connector.
 *
 * If emergency calling is configured for the Voice Connector, it must be
 * deleted prior to deleting the termination settings.
 */
export const deleteVoiceConnectorTermination: API.OperationMethod<
  DeleteVoiceConnectorTerminationRequest,
  DeleteVoiceConnectorTerminationResponse,
  DeleteVoiceConnectorTerminationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-connectors/{VoiceConnectorId}/termination",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnectorTermination",
})) as any;

export type DeleteVoiceConnectorTerminationCredentialsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the specified SIP credentials used by your equipment to
 * authenticate during call termination.
 */
export const deleteVoiceConnectorTerminationCredentials: API.OperationMethod<
  DeleteVoiceConnectorTerminationCredentialsRequest,
  DeleteVoiceConnectorTerminationCredentialsResponse,
  DeleteVoiceConnectorTerminationCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}/termination/credentials?operation=delete",
    input: { VoiceConnectorId: 0, Usernames: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceConnectorTerminationCredentials",
})) as any;

export type DeleteVoiceProfileError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a voice profile, including its voice print and enrollment data. WARNING: This action is not reversible.
 */
export const deleteVoiceProfile: API.OperationMethod<
  DeleteVoiceProfileRequest,
  DeleteVoiceProfileResponse,
  DeleteVoiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-profiles/{VoiceProfileId}",
    input: { VoiceProfileId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceProfile",
})) as any;

export type DeleteVoiceProfileDomainError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes all voice profiles in the domain. WARNING: This action is not reversible.
 */
export const deleteVoiceProfileDomain: API.OperationMethod<
  DeleteVoiceProfileDomainRequest,
  DeleteVoiceProfileDomainResponse,
  DeleteVoiceProfileDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /voice-profile-domains/{VoiceProfileDomainId}",
    input: { VoiceProfileDomainId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceProfileDomain",
})) as any;

export type DisassociatePhoneNumbersFromVoiceConnectorError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Disassociates the specified phone numbers from the specified
 * Amazon Chime SDK Voice Connector.
 */
export const disassociatePhoneNumbersFromVoiceConnector: API.OperationMethod<
  DisassociatePhoneNumbersFromVoiceConnectorRequest,
  DisassociatePhoneNumbersFromVoiceConnectorResponse,
  DisassociatePhoneNumbersFromVoiceConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}?operation=disassociate-phone-numbers",
    input: { VoiceConnectorId: 0, E164PhoneNumbers: 0 },
    output: { PhoneNumberErrors: D.list(o_PhoneNumberError) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePhoneNumbersFromVoiceConnector",
})) as any;

export type DisassociatePhoneNumbersFromVoiceConnectorGroupError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Disassociates the specified phone numbers from the specified Amazon Chime SDK Voice
 * Connector group.
 */
export const disassociatePhoneNumbersFromVoiceConnectorGroup: API.OperationMethod<
  DisassociatePhoneNumbersFromVoiceConnectorGroupRequest,
  DisassociatePhoneNumbersFromVoiceConnectorGroupResponse,
  DisassociatePhoneNumbersFromVoiceConnectorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connector-groups/{VoiceConnectorGroupId}?operation=disassociate-phone-numbers",
    input: { VoiceConnectorGroupId: 0, E164PhoneNumbers: 0 },
    output: { PhoneNumberErrors: D.list(o_PhoneNumberError) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePhoneNumbersFromVoiceConnectorGroup",
})) as any;

export type GetGlobalSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the global settings for the Amazon Chime SDK Voice Connectors in an AWS account.
 */
export const getGlobalSettings: API.OperationMethod<
  GetGlobalSettingsRequest,
  GetGlobalSettingsResponse,
  GetGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /settings" },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlobalSettings",
})) as any;

export type GetPhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified phone number ID, such as associations,
 * capabilities, and product type.
 */
export const getPhoneNumber: API.OperationMethod<
  GetPhoneNumberRequest,
  GetPhoneNumberResponse,
  GetPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-numbers/{PhoneNumberId}",
    input: { PhoneNumberId: 0 },
    output: { PhoneNumber: o_PhoneNumber },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumber",
})) as any;

export type GetPhoneNumberOrderError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified phone number order, such as the order
 * creation timestamp, phone numbers in E.164 format, product type, and
 * order status.
 */
export const getPhoneNumberOrder: API.OperationMethod<
  GetPhoneNumberOrderRequest,
  GetPhoneNumberOrderResponse,
  GetPhoneNumberOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-number-orders/{PhoneNumberOrderId}",
    input: { PhoneNumberOrderId: 0 },
    output: { PhoneNumberOrder: o_PhoneNumberOrder },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumberOrder",
})) as any;

export type GetPhoneNumberSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the phone number settings for the administrator's AWS account,
 * such as the default outbound calling name.
 */
export const getPhoneNumberSettings: API.OperationMethod<
  GetPhoneNumberSettingsRequest,
  GetPhoneNumberSettingsResponse,
  GetPhoneNumberSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /settings/phone-number",
    output: { CallingName: D.secret, CallingNameUpdatedTimestamp: D.ts },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumberSettings",
})) as any;

export type GetProxySessionError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the specified proxy session details for the specified Amazon Chime SDK Voice Connector.
 *
 * End of support notice: On April 7, 2026, AWS will end support for Amazon Chime SDK proxy sessions.
 */
export const getProxySession: API.OperationMethod<
  GetProxySessionRequest,
  GetProxySessionResponse,
  GetProxySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
    input: { VoiceConnectorId: 0, ProxySessionId: 0 },
    output: { ProxySession: o_ProxySession },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProxySession",
})) as any;

export type GetSipMediaApplicationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the information for a SIP media application, including name,
 * AWS Region, and endpoints.
 */
export const getSipMediaApplication: API.OperationMethod<
  GetSipMediaApplicationRequest,
  GetSipMediaApplicationResponse,
  GetSipMediaApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sip-media-applications/{SipMediaApplicationId}",
    input: { SipMediaApplicationId: 0 },
    output: { SipMediaApplication: o_SipMediaApplication },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSipMediaApplication",
})) as any;

export type GetSipMediaApplicationAlexaSkillConfigurationError =
  | BadRequestException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets the Alexa Skill configuration for the SIP media application.
 *
 * Due to changes made by the Amazon Alexa service, this API is no longer available for use. For more information, refer to
 * the Alexa Smart Properties page.
 */
export const getSipMediaApplicationAlexaSkillConfiguration: API.OperationMethod<
  GetSipMediaApplicationAlexaSkillConfigurationRequest,
  GetSipMediaApplicationAlexaSkillConfigurationResponse,
  GetSipMediaApplicationAlexaSkillConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sip-media-applications/{SipMediaApplicationId}/alexa-skill-configuration",
    input: { SipMediaApplicationId: 0 },
    output: {
      SipMediaApplicationAlexaSkillConfiguration:
        o_SipMediaApplicationAlexaSkillConfiguration,
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSipMediaApplicationAlexaSkillConfiguration",
})) as any;

export type GetSipMediaApplicationLoggingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the logging configuration for the specified SIP media application.
 */
export const getSipMediaApplicationLoggingConfiguration: API.OperationMethod<
  GetSipMediaApplicationLoggingConfigurationRequest,
  GetSipMediaApplicationLoggingConfigurationResponse,
  GetSipMediaApplicationLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sip-media-applications/{SipMediaApplicationId}/logging-configuration",
    input: { SipMediaApplicationId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSipMediaApplicationLoggingConfiguration",
})) as any;

export type GetSipRuleError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of a SIP rule, such as the rule ID, name, triggers, and
 * target endpoints.
 */
export const getSipRule: API.OperationMethod<
  GetSipRuleRequest,
  GetSipRuleResponse,
  GetSipRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sip-rules/{SipRuleId}",
    input: { SipRuleId: 0 },
    output: { SipRule: o_SipRule },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSipRule",
})) as any;

export type GetSpeakerSearchTaskError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of the specified speaker search task.
 */
export const getSpeakerSearchTask: API.OperationMethod<
  GetSpeakerSearchTaskRequest,
  GetSpeakerSearchTaskResponse,
  GetSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/speaker-search-tasks/{SpeakerSearchTaskId}",
    input: { VoiceConnectorId: 0, SpeakerSearchTaskId: 0 },
    output: { SpeakerSearchTask: o_SpeakerSearchTask },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpeakerSearchTask",
})) as any;

export type GetVoiceConnectorError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified Amazon Chime SDK Voice Connector, such as
 * timestamps,name, outbound host, and encryption requirements.
 */
export const getVoiceConnector: API.OperationMethod<
  GetVoiceConnectorRequest,
  GetVoiceConnectorResponse,
  GetVoiceConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}",
    input: { VoiceConnectorId: 0 },
    output: { VoiceConnector: o_VoiceConnector },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnector",
})) as any;

export type GetVoiceConnectorEmergencyCallingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the emergency calling configuration details for the specified Voice Connector.
 */
export const getVoiceConnectorEmergencyCallingConfiguration: API.OperationMethod<
  GetVoiceConnectorEmergencyCallingConfigurationRequest,
  GetVoiceConnectorEmergencyCallingConfigurationResponse,
  GetVoiceConnectorEmergencyCallingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
    input: { VoiceConnectorId: 0 },
    output: { EmergencyCallingConfiguration: o_EmergencyCallingConfiguration },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorEmergencyCallingConfiguration",
})) as any;

export type GetVoiceConnectorExternalSystemsConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets information about an external systems configuration for a Voice
 * Connector.
 */
export const getVoiceConnectorExternalSystemsConfiguration: API.OperationMethod<
  GetVoiceConnectorExternalSystemsConfigurationRequest,
  GetVoiceConnectorExternalSystemsConfigurationResponse,
  GetVoiceConnectorExternalSystemsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/external-systems-configuration",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorExternalSystemsConfiguration",
})) as any;

export type GetVoiceConnectorGroupError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified Amazon Chime SDK Voice Connector group,
 * such as timestamps,name, and associated `VoiceConnectorItems`.
 */
export const getVoiceConnectorGroup: API.OperationMethod<
  GetVoiceConnectorGroupRequest,
  GetVoiceConnectorGroupResponse,
  GetVoiceConnectorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connector-groups/{VoiceConnectorGroupId}",
    input: { VoiceConnectorGroupId: 0 },
    output: { VoiceConnectorGroup: o_VoiceConnectorGroup },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorGroup",
})) as any;

export type GetVoiceConnectorLoggingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the logging configuration settings for the specified Voice Connector.
 * Shows whether SIP message logs are enabled for sending to Amazon CloudWatch Logs.
 */
export const getVoiceConnectorLoggingConfiguration: API.OperationMethod<
  GetVoiceConnectorLoggingConfigurationRequest,
  GetVoiceConnectorLoggingConfigurationResponse,
  GetVoiceConnectorLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/logging-configuration",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorLoggingConfiguration",
})) as any;

export type GetVoiceConnectorOriginationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the origination settings for the specified Voice Connector.
 */
export const getVoiceConnectorOrigination: API.OperationMethod<
  GetVoiceConnectorOriginationRequest,
  GetVoiceConnectorOriginationResponse,
  GetVoiceConnectorOriginationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/origination",
    input: { VoiceConnectorId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorOrigination",
})) as any;

export type GetVoiceConnectorProxyError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the proxy configuration details for the specified Amazon Chime SDK Voice
 * Connector.
 *
 * End of support notice: On April 7, 2026, AWS will end support for Amazon Chime SDK proxy sessions.
 */
export const getVoiceConnectorProxy: API.OperationMethod<
  GetVoiceConnectorProxyRequest,
  GetVoiceConnectorProxyResponse,
  GetVoiceConnectorProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
    input: { VoiceConnectorId: 0 },
    output: { Proxy: o_Proxy },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorProxy",
})) as any;

export type GetVoiceConnectorStreamingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the streaming configuration details for the specified Amazon Chime SDK
 * Voice Connector. Shows whether media streaming is enabled for sending to Amazon
 * Kinesis. It also shows the retention period, in hours, for the Amazon Kinesis data.
 */
export const getVoiceConnectorStreamingConfiguration: API.OperationMethod<
  GetVoiceConnectorStreamingConfigurationRequest,
  GetVoiceConnectorStreamingConfigurationResponse,
  GetVoiceConnectorStreamingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/streaming-configuration",
    input: { VoiceConnectorId: 0 },
    output: { StreamingConfiguration: o_StreamingConfiguration },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorStreamingConfiguration",
})) as any;

export type GetVoiceConnectorTerminationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the termination setting details for the specified Voice Connector.
 */
export const getVoiceConnectorTermination: API.OperationMethod<
  GetVoiceConnectorTerminationRequest,
  GetVoiceConnectorTerminationResponse,
  GetVoiceConnectorTerminationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/termination",
    input: { VoiceConnectorId: 0 },
    output: { Termination: o_Termination },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorTermination",
})) as any;

export type GetVoiceConnectorTerminationHealthError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves information about the last time a `SIP OPTIONS` ping
 * was received from your SIP infrastructure for the specified Amazon Chime SDK Voice
 * Connector.
 */
export const getVoiceConnectorTerminationHealth: API.OperationMethod<
  GetVoiceConnectorTerminationHealthRequest,
  GetVoiceConnectorTerminationHealthResponse,
  GetVoiceConnectorTerminationHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/termination/health",
    input: { VoiceConnectorId: 0 },
    output: { TerminationHealth: { Timestamp: D.ts } },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceConnectorTerminationHealth",
})) as any;

export type GetVoiceProfileError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of the specified voice profile.
 */
export const getVoiceProfile: API.OperationMethod<
  GetVoiceProfileRequest,
  GetVoiceProfileResponse,
  GetVoiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-profiles/{VoiceProfileId}",
    input: { VoiceProfileId: 0 },
    output: { VoiceProfile: o_VoiceProfile },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceProfile",
})) as any;

export type GetVoiceProfileDomainError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of the specified voice profile domain.
 */
export const getVoiceProfileDomain: API.OperationMethod<
  GetVoiceProfileDomainRequest,
  GetVoiceProfileDomainResponse,
  GetVoiceProfileDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-profile-domains/{VoiceProfileDomainId}",
    input: { VoiceProfileDomainId: 0 },
    output: { VoiceProfileDomain: o_VoiceProfileDomain },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceProfileDomain",
})) as any;

export type GetVoiceToneAnalysisTaskError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of a voice tone analysis task.
 */
export const getVoiceToneAnalysisTask: API.OperationMethod<
  GetVoiceToneAnalysisTaskRequest,
  GetVoiceToneAnalysisTaskResponse,
  GetVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}",
    input: {
      VoiceConnectorId: 0,
      VoiceToneAnalysisTaskId: 0,
      IsCaller: D.m({ query: "isCaller" }),
    },
    output: { VoiceToneAnalysisTask: o_VoiceToneAnalysisTask },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceToneAnalysisTask",
})) as any;

export type ListAvailableVoiceConnectorRegionsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the available AWS Regions in which you can create an Amazon Chime SDK Voice Connector.
 */
export const listAvailableVoiceConnectorRegions: API.OperationMethod<
  ListAvailableVoiceConnectorRegionsRequest,
  ListAvailableVoiceConnectorRegionsResponse,
  ListAvailableVoiceConnectorRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /voice-connector-regions" },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableVoiceConnectorRegions",
})) as any;

export type ListPhoneNumberOrdersError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the phone numbers for an administrator's Amazon Chime SDK account.
 */
export const listPhoneNumberOrders: API.PaginatedOperationMethod<
  ListPhoneNumberOrdersRequest,
  ListPhoneNumberOrdersResponse,
  ListPhoneNumberOrdersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-number-orders",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { PhoneNumberOrders: D.list(o_PhoneNumberOrder) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumberOrders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPhoneNumbersError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the phone numbers for the specified Amazon Chime SDK account,
 * Amazon Chime SDK user, Amazon Chime SDK Voice Connector, or Amazon Chime SDK Voice
 * Connector group.
 */
export const listPhoneNumbers: API.PaginatedOperationMethod<
  ListPhoneNumbersRequest,
  ListPhoneNumbersResponse,
  ListPhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-numbers",
    input: {
      Status: D.m({ query: "status" }),
      ProductType: D.m({ query: "product-type" }),
      FilterName: D.m({ query: "filter-name" }),
      FilterValue: D.m({ query: "filter-value" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { PhoneNumbers: D.list(o_PhoneNumber) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProxySessionsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the proxy sessions for the specified Amazon Chime SDK Voice Connector.
 *
 * End of support notice: On April 7, 2026, AWS will end support for Amazon Chime SDK proxy sessions.
 */
export const listProxySessions: API.PaginatedOperationMethod<
  ListProxySessionsRequest,
  ListProxySessionsResponse,
  ListProxySessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/proxy-sessions",
    input: {
      VoiceConnectorId: 0,
      Status: D.m({ query: "status" }),
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { ProxySessions: D.list(o_ProxySession) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxySessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSipMediaApplicationsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the SIP media applications under the administrator's AWS account.
 */
export const listSipMediaApplications: API.PaginatedOperationMethod<
  ListSipMediaApplicationsRequest,
  ListSipMediaApplicationsResponse,
  ListSipMediaApplicationsError,
  Credentials | HttpClient.HttpClient,
  SipMediaApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sip-media-applications",
    input: {
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { SipMediaApplications: D.list(o_SipMediaApplication) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSipMediaApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SipMediaApplications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSipRulesError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the SIP rules under the administrator's AWS account.
 */
export const listSipRules: API.PaginatedOperationMethod<
  ListSipRulesRequest,
  ListSipRulesResponse,
  ListSipRulesError,
  Credentials | HttpClient.HttpClient,
  SipRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sip-rules",
    input: {
      SipMediaApplicationId: D.m({ query: "sip-media-application" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { SipRules: D.list(o_SipRule) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSipRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SipRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSupportedPhoneNumberCountriesError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the countries that you can order phone numbers from.
 */
export const listSupportedPhoneNumberCountries: API.OperationMethod<
  ListSupportedPhoneNumberCountriesRequest,
  ListSupportedPhoneNumberCountriesResponse,
  ListSupportedPhoneNumberCountriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-number-countries",
    input: { ProductType: D.m({ query: "product-type" }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportedPhoneNumberCountries",
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns a list of the tags in a given resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags",
    input: { ResourceARN: D.m({ query: "arn" }) },
    output: { Tags: D.list({ Key: D.secret, Value: D.secret }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListVoiceConnectorGroupsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the Amazon Chime SDK Voice Connector groups in the administrator's AWS
 * account.
 */
export const listVoiceConnectorGroups: API.PaginatedOperationMethod<
  ListVoiceConnectorGroupsRequest,
  ListVoiceConnectorGroupsResponse,
  ListVoiceConnectorGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connector-groups",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { VoiceConnectorGroups: D.list(o_VoiceConnectorGroup) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVoiceConnectorGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVoiceConnectorsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the Amazon Chime SDK Voice Connectors in the administrators
 * AWS account.
 */
export const listVoiceConnectors: API.PaginatedOperationMethod<
  ListVoiceConnectorsRequest,
  ListVoiceConnectorsResponse,
  ListVoiceConnectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { VoiceConnectors: D.list(o_VoiceConnector) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVoiceConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVoiceConnectorTerminationCredentialsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the SIP credentials for the specified Amazon Chime SDK Voice Connector.
 */
export const listVoiceConnectorTerminationCredentials: API.OperationMethod<
  ListVoiceConnectorTerminationCredentialsRequest,
  ListVoiceConnectorTerminationCredentialsResponse,
  ListVoiceConnectorTerminationCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-connectors/{VoiceConnectorId}/termination/credentials",
    input: { VoiceConnectorId: 0 },
    output: { Usernames: D.list(D.secret) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVoiceConnectorTerminationCredentials",
})) as any;

export type ListVoiceProfileDomainsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the specified voice profile domains in the administrator's AWS account.
 */
export const listVoiceProfileDomains: API.PaginatedOperationMethod<
  ListVoiceProfileDomainsRequest,
  ListVoiceProfileDomainsResponse,
  ListVoiceProfileDomainsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-profile-domains",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      VoiceProfileDomains: D.list({
        VoiceProfileDomainArn: D.secret,
        CreatedTimestamp: D.ts,
        UpdatedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVoiceProfileDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVoiceProfilesError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the voice profiles in a voice profile domain.
 */
export const listVoiceProfiles: API.PaginatedOperationMethod<
  ListVoiceProfilesRequest,
  ListVoiceProfilesResponse,
  ListVoiceProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /voice-profiles",
    input: {
      VoiceProfileDomainId: D.m({ query: "voice-profile-domain-id" }),
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      VoiceProfiles: D.list({
        VoiceProfileArn: D.secret,
        CreatedTimestamp: D.ts,
        UpdatedTimestamp: D.ts,
        ExpirationTimestamp: D.ts,
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVoiceProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutSipMediaApplicationAlexaSkillConfigurationError =
  | BadRequestException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the Alexa Skill configuration for the SIP media application.
 *
 * Due to changes made by the Amazon Alexa service, this API is no longer available for use. For more information, refer to
 * the Alexa Smart Properties page.
 */
export const putSipMediaApplicationAlexaSkillConfiguration: API.OperationMethod<
  PutSipMediaApplicationAlexaSkillConfigurationRequest,
  PutSipMediaApplicationAlexaSkillConfigurationResponse,
  PutSipMediaApplicationAlexaSkillConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sip-media-applications/{SipMediaApplicationId}/alexa-skill-configuration",
    input: {
      SipMediaApplicationId: 0,
      SipMediaApplicationAlexaSkillConfiguration: {
        AlexaSkillStatus: 0,
        AlexaSkillIds: 0,
      },
    },
    output: {
      SipMediaApplicationAlexaSkillConfiguration:
        o_SipMediaApplicationAlexaSkillConfiguration,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSipMediaApplicationAlexaSkillConfiguration",
})) as any;

export type PutSipMediaApplicationLoggingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the logging configuration for the specified SIP media application.
 */
export const putSipMediaApplicationLoggingConfiguration: API.OperationMethod<
  PutSipMediaApplicationLoggingConfigurationRequest,
  PutSipMediaApplicationLoggingConfigurationResponse,
  PutSipMediaApplicationLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sip-media-applications/{SipMediaApplicationId}/logging-configuration",
    input: {
      SipMediaApplicationId: 0,
      SipMediaApplicationLoggingConfiguration: {
        EnableSipMediaApplicationMessageLogs: 0,
      },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSipMediaApplicationLoggingConfiguration",
})) as any;

export type PutVoiceConnectorEmergencyCallingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates a Voice Connector's emergency calling configuration.
 */
export const putVoiceConnectorEmergencyCallingConfiguration: API.OperationMethod<
  PutVoiceConnectorEmergencyCallingConfigurationRequest,
  PutVoiceConnectorEmergencyCallingConfigurationResponse,
  PutVoiceConnectorEmergencyCallingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
    input: {
      VoiceConnectorId: 0,
      EmergencyCallingConfiguration: {
        DNIS: D.list({
          EmergencyPhoneNumber: 0,
          TestPhoneNumber: 0,
          CallingCountry: 0,
        }),
      },
    },
    output: { EmergencyCallingConfiguration: o_EmergencyCallingConfiguration },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVoiceConnectorEmergencyCallingConfiguration",
})) as any;

export type PutVoiceConnectorExternalSystemsConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Adds an external systems configuration to a Voice Connector.
 */
export const putVoiceConnectorExternalSystemsConfiguration: API.OperationMethod<
  PutVoiceConnectorExternalSystemsConfigurationRequest,
  PutVoiceConnectorExternalSystemsConfigurationResponse,
  PutVoiceConnectorExternalSystemsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connectors/{VoiceConnectorId}/external-systems-configuration",
    input: {
      VoiceConnectorId: 0,
      SessionBorderControllerTypes: 0,
      ContactCenterSystemTypes: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVoiceConnectorExternalSystemsConfiguration",
})) as any;

export type PutVoiceConnectorLoggingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates a Voice Connector's logging configuration.
 */
export const putVoiceConnectorLoggingConfiguration: API.OperationMethod<
  PutVoiceConnectorLoggingConfigurationRequest,
  PutVoiceConnectorLoggingConfigurationResponse,
  PutVoiceConnectorLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connectors/{VoiceConnectorId}/logging-configuration",
    input: {
      VoiceConnectorId: 0,
      LoggingConfiguration: { EnableSIPLogs: 0, EnableMediaMetricLogs: 0 },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVoiceConnectorLoggingConfiguration",
})) as any;

export type PutVoiceConnectorOriginationError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates a Voice Connector's origination settings.
 */
export const putVoiceConnectorOrigination: API.OperationMethod<
  PutVoiceConnectorOriginationRequest,
  PutVoiceConnectorOriginationResponse,
  PutVoiceConnectorOriginationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connectors/{VoiceConnectorId}/origination",
    input: {
      VoiceConnectorId: 0,
      Origination: {
        Routes: D.list({
          Host: 0,
          Port: 0,
          Protocol: 0,
          Priority: 0,
          Weight: 0,
        }),
        Disabled: 0,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVoiceConnectorOrigination",
})) as any;

export type PutVoiceConnectorProxyError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Puts the specified proxy configuration to the specified Amazon Chime SDK Voice Connector.
 *
 * End of support notice: On April 7, 2026, AWS will end support for Amazon Chime SDK proxy sessions.
 */
export const putVoiceConnectorProxy: API.OperationMethod<
  PutVoiceConnectorProxyRequest,
  PutVoiceConnectorProxyResponse,
  PutVoiceConnectorProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
    input: {
      VoiceConnectorId: 0,
      DefaultSessionExpiryMinutes: 0,
      PhoneNumberPoolCountries: 0,
      FallBackPhoneNumber: 0,
      Disabled: 0,
    },
    output: { Proxy: o_Proxy },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVoiceConnectorProxy",
})) as any;

export type PutVoiceConnectorStreamingConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates a Voice Connector's streaming configuration settings.
 */
export const putVoiceConnectorStreamingConfiguration: API.OperationMethod<
  PutVoiceConnectorStreamingConfigurationRequest,
  PutVoiceConnectorStreamingConfigurationResponse,
  PutVoiceConnectorStreamingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connectors/{VoiceConnectorId}/streaming-configuration",
    input: {
      VoiceConnectorId: 0,
      StreamingConfiguration: {
        DataRetentionInHours: 0,
        Disabled: 0,
        StreamingNotificationTargets: D.list({ NotificationTarget: 0 }),
        MediaInsightsConfiguration: { Disabled: 0, ConfigurationArn: 0 },
      },
    },
    output: { StreamingConfiguration: o_StreamingConfiguration },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVoiceConnectorStreamingConfiguration",
})) as any;

export type PutVoiceConnectorTerminationError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates a Voice Connector's termination settings.
 */
export const putVoiceConnectorTermination: API.OperationMethod<
  PutVoiceConnectorTerminationRequest,
  PutVoiceConnectorTerminationResponse,
  PutVoiceConnectorTerminationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connectors/{VoiceConnectorId}/termination",
    input: {
      VoiceConnectorId: 0,
      Termination: {
        CpsLimit: 0,
        DefaultPhoneNumber: 0,
        CallingRegions: 0,
        CidrAllowedList: 0,
        Disabled: 0,
      },
    },
    output: { Termination: o_Termination },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVoiceConnectorTermination",
})) as any;

export type PutVoiceConnectorTerminationCredentialsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates a Voice Connector's termination credentials.
 */
export const putVoiceConnectorTerminationCredentials: API.OperationMethod<
  PutVoiceConnectorTerminationCredentialsRequest,
  PutVoiceConnectorTerminationCredentialsResponse,
  PutVoiceConnectorTerminationCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}/termination/credentials?operation=put",
    input: {
      VoiceConnectorId: 0,
      Credentials: D.list({ Username: 0, Password: 0 }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVoiceConnectorTerminationCredentials",
})) as any;

export type RestorePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Restores a deleted phone number.
 */
export const restorePhoneNumber: API.OperationMethod<
  RestorePhoneNumberRequest,
  RestorePhoneNumberResponse,
  RestorePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-numbers/{PhoneNumberId}?operation=restore",
    input: { PhoneNumberId: 0 },
    output: { PhoneNumber: o_PhoneNumber },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestorePhoneNumber",
})) as any;

export type SearchAvailablePhoneNumbersError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Searches the provisioned phone numbers in an organization.
 */
export const searchAvailablePhoneNumbers: API.PaginatedOperationMethod<
  SearchAvailablePhoneNumbersRequest,
  SearchAvailablePhoneNumbersResponse,
  SearchAvailablePhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /search?type=phone-numbers",
    input: {
      AreaCode: D.m({ query: "area-code" }),
      City: D.m({ query: "city" }),
      Country: D.m({ query: "country" }),
      State: D.m({ query: "state" }),
      TollFreePrefix: D.m({ query: "toll-free-prefix" }),
      PhoneNumberType: D.m({ query: "phone-number-type" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { E164PhoneNumbers: D.list(D.secret) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAvailablePhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartSpeakerSearchTaskError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Starts a speaker search task.
 *
 * Before starting any speaker search tasks, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 */
export const startSpeakerSearchTask: API.OperationMethod<
  StartSpeakerSearchTaskRequest,
  StartSpeakerSearchTaskResponse,
  StartSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}/speaker-search-tasks",
    input: {
      VoiceConnectorId: 0,
      TransactionId: 0,
      VoiceProfileDomainId: 0,
      ClientRequestToken: 0,
      CallLeg: 0,
    },
    output: { SpeakerSearchTask: o_SpeakerSearchTask },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeakerSearchTask",
})) as any;

export type StartVoiceToneAnalysisTaskError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Starts a voice tone analysis task. For more information about voice tone analysis, see
 * Using Amazon Chime SDK voice analytics
 * in the *Amazon Chime SDK Developer Guide*.
 *
 * Before starting any voice tone analysis tasks, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 */
export const startVoiceToneAnalysisTask: API.OperationMethod<
  StartVoiceToneAnalysisTaskRequest,
  StartVoiceToneAnalysisTaskResponse,
  StartVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks",
    input: {
      VoiceConnectorId: 0,
      TransactionId: 0,
      LanguageCode: 0,
      ClientRequestToken: 0,
    },
    output: { VoiceToneAnalysisTask: o_VoiceToneAnalysisTask },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartVoiceToneAnalysisTask",
})) as any;

export type StopSpeakerSearchTaskError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Stops a speaker search task.
 */
export const stopSpeakerSearchTask: API.OperationMethod<
  StopSpeakerSearchTaskRequest,
  StopSpeakerSearchTaskResponse,
  StopSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}/speaker-search-tasks/{SpeakerSearchTaskId}?operation=stop",
    input: { VoiceConnectorId: 0, SpeakerSearchTaskId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSpeakerSearchTask",
})) as any;

export type StopVoiceToneAnalysisTaskError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Stops a voice tone analysis task.
 */
export const stopVoiceToneAnalysisTask: API.OperationMethod<
  StopVoiceToneAnalysisTaskRequest,
  StopVoiceToneAnalysisTaskResponse,
  StopVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}?operation=stop",
    input: { VoiceConnectorId: 0, VoiceToneAnalysisTaskId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopVoiceToneAnalysisTask",
})) as any;

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Adds a tag to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags?operation=tag-resource",
    input: { ResourceARN: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags?operation=untag-resource",
    input: { ResourceARN: 0, TagKeys: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateGlobalSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates global settings for the Amazon Chime SDK Voice Connectors in an AWS account.
 */
export const updateGlobalSettings: API.OperationMethod<
  UpdateGlobalSettingsRequest,
  UpdateGlobalSettingsResponse,
  UpdateGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /settings",
    input: { VoiceConnector: { CdrBucket: 0 } },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalSettings",
})) as any;

export type UpdatePhoneNumberError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates phone number details, such as product type, calling name, or phone number name for the
 * specified phone number ID. You can update one phone number detail at a time. For
 * example, you can update either the product type, calling name, or phone number name in one action.
 *
 * For numbers outside the U.S., you must use the Amazon Chime SDK SIP Media
 * Application Dial-In product type.
 *
 * Updates to outbound calling names can take 72 hours to complete. Pending
 * updates to outbound calling names must be complete before you can request another
 * update.
 */
export const updatePhoneNumber: API.OperationMethod<
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResponse,
  UpdatePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-numbers/{PhoneNumberId}",
    input: { PhoneNumberId: 0, ProductType: 0, CallingName: 0, Name: 0 },
    output: { PhoneNumber: o_PhoneNumber },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePhoneNumber",
})) as any;

export type UpdatePhoneNumberSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the phone number settings for the administrator's AWS account, such
 * as the default outbound calling name. You can update the default outbound calling
 * name once every seven days. Outbound calling names can take up to 72 hours to
 * update.
 */
export const updatePhoneNumberSettings: API.OperationMethod<
  UpdatePhoneNumberSettingsRequest,
  UpdatePhoneNumberSettingsResponse,
  UpdatePhoneNumberSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /settings/phone-number",
    input: { CallingName: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePhoneNumberSettings",
})) as any;

export type UpdateProxySessionError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the specified proxy session details, such as voice or SMS capabilities.
 *
 * End of support notice: On April 7, 2026, AWS will end support for Amazon Chime SDK proxy sessions.
 */
export const updateProxySession: API.OperationMethod<
  UpdateProxySessionRequest,
  UpdateProxySessionResponse,
  UpdateProxySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
    input: {
      VoiceConnectorId: 0,
      ProxySessionId: 0,
      Capabilities: 0,
      ExpiryMinutes: 0,
    },
    output: { ProxySession: o_ProxySession },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxySession",
})) as any;

export type UpdateSipMediaApplicationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the details of the specified SIP media application.
 */
export const updateSipMediaApplication: API.OperationMethod<
  UpdateSipMediaApplicationRequest,
  UpdateSipMediaApplicationResponse,
  UpdateSipMediaApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sip-media-applications/{SipMediaApplicationId}",
    input: {
      SipMediaApplicationId: 0,
      Name: 0,
      Endpoints: D.list(i_SipMediaApplicationEndpoint),
    },
    output: { SipMediaApplication: o_SipMediaApplication },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSipMediaApplication",
})) as any;

export type UpdateSipMediaApplicationCallError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Invokes the AWS Lambda function associated with the SIP media application and
 * transaction ID in an update request. The Lambda function can then return a new set
 * of actions.
 */
export const updateSipMediaApplicationCall: API.OperationMethod<
  UpdateSipMediaApplicationCallRequest,
  UpdateSipMediaApplicationCallResponse,
  UpdateSipMediaApplicationCallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sip-media-applications/{SipMediaApplicationId}/calls/{TransactionId}",
    input: { SipMediaApplicationId: 0, TransactionId: 0, Arguments: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSipMediaApplicationCall",
})) as any;

export type UpdateSipRuleError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the details of the specified SIP rule.
 */
export const updateSipRule: API.OperationMethod<
  UpdateSipRuleRequest,
  UpdateSipRuleResponse,
  UpdateSipRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sip-rules/{SipRuleId}",
    input: {
      SipRuleId: 0,
      Name: 0,
      Disabled: 0,
      TargetApplications: D.list(i_SipRuleTargetApplication),
    },
    output: { SipRule: o_SipRule },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSipRule",
})) as any;

export type UpdateVoiceConnectorError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the details for the specified Amazon Chime SDK Voice Connector.
 */
export const updateVoiceConnector: API.OperationMethod<
  UpdateVoiceConnectorRequest,
  UpdateVoiceConnectorResponse,
  UpdateVoiceConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connectors/{VoiceConnectorId}",
    input: { VoiceConnectorId: 0, Name: 0, RequireEncryption: 0 },
    output: { VoiceConnector: o_VoiceConnector },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVoiceConnector",
})) as any;

export type UpdateVoiceConnectorGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the settings for the specified Amazon Chime SDK Voice Connector group.
 */
export const updateVoiceConnectorGroup: API.OperationMethod<
  UpdateVoiceConnectorGroupRequest,
  UpdateVoiceConnectorGroupResponse,
  UpdateVoiceConnectorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-connector-groups/{VoiceConnectorGroupId}",
    input: {
      VoiceConnectorGroupId: 0,
      Name: 0,
      VoiceConnectorItems: D.list(i_VoiceConnectorItem),
      CallDistributionType: 0,
    },
    output: { VoiceConnectorGroup: o_VoiceConnectorGroup },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVoiceConnectorGroup",
})) as any;

export type UpdateVoiceProfileError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the specified voice profile’s voice print and refreshes its expiration timestamp.
 *
 * As a condition of using this feature, you acknowledge that the collection, use, storage, and retention of
 * your caller’s biometric identifiers and biometric information (“biometric data”) in the form of a digital voiceprint
 * requires the caller’s informed consent via a written release. Such consent is required under various state laws,
 * including biometrics laws in Illinois, Texas, Washington and other state privacy laws.
 *
 * You must provide a written release to each caller through a process that clearly reflects each caller’s informed
 * consent before using Amazon Chime SDK Voice Insights service, as required under the terms of your agreement
 * with AWS governing your use of the service.
 */
export const updateVoiceProfile: API.OperationMethod<
  UpdateVoiceProfileRequest,
  UpdateVoiceProfileResponse,
  UpdateVoiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-profiles/{VoiceProfileId}",
    input: { VoiceProfileId: 0, SpeakerSearchTaskId: 0 },
    output: { VoiceProfile: o_VoiceProfile },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVoiceProfile",
})) as any;

export type UpdateVoiceProfileDomainError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the settings for the specified voice profile domain.
 */
export const updateVoiceProfileDomain: API.OperationMethod<
  UpdateVoiceProfileDomainRequest,
  UpdateVoiceProfileDomainResponse,
  UpdateVoiceProfileDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /voice-profile-domains/{VoiceProfileDomainId}",
    input: { VoiceProfileDomainId: 0, Name: 0, Description: 0 },
    output: { VoiceProfileDomain: o_VoiceProfileDomain },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVoiceProfileDomain",
})) as any;

export type ValidateE911AddressError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Validates an address to be used for 911 calls made with Amazon Chime SDK Voice
 * Connectors. You can use validated addresses in a Presence Information Data Format
 * Location Object file that you include in SIP requests. That helps ensure that addresses
 * are routed to the appropriate Public Safety Answering Point.
 */
export const validateE911Address: API.OperationMethod<
  ValidateE911AddressRequest,
  ValidateE911AddressResponse,
  ValidateE911AddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /emergency-calling/address",
    input: {
      AwsAccountId: 0,
      StreetNumber: 0,
      StreetInfo: 0,
      City: 0,
      State: 0,
      Country: 0,
      PostalCode: 0,
    },
    output: {
      Address: {
        streetName: D.secret,
        streetSuffix: D.secret,
        postDirectional: D.secret,
        preDirectional: D.secret,
        streetNumber: D.secret,
        city: D.secret,
        state: D.secret,
        postalCode: D.secret,
        postalCodePlus4: D.secret,
        country: D.secret,
      },
      CandidateAddressList: D.list({
        streetInfo: D.secret,
        streetNumber: D.secret,
        city: D.secret,
        state: D.secret,
        postalCode: D.secret,
        postalCodePlus4: D.secret,
        country: D.secret,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateE911Address",
})) as any;

const i_SipMediaApplicationEndpoint: D.LazyStruct = () => ({ LambdaArn: 0 });
const i_SipRuleTargetApplication: D.LazyStruct = () => ({
  SipMediaApplicationId: 0,
  Priority: 0,
  AwsRegion: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VoiceConnectorItem: D.LazyStruct = () => ({
  VoiceConnectorId: 0,
  Priority: 0,
});
const o_EmergencyCallingConfiguration: D.LazyStruct = () => ({
  DNIS: D.list({ EmergencyPhoneNumber: D.secret, TestPhoneNumber: D.secret }),
});
const o_PhoneNumber: D.LazyStruct = () => ({
  PhoneNumberId: D.secret,
  E164PhoneNumber: D.secret,
  Associations: D.list({ AssociatedTimestamp: D.ts }),
  CallingName: D.secret,
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  DeletionTimestamp: D.ts,
  Name: D.secret,
});
const o_PhoneNumberError: D.LazyStruct = () => ({ PhoneNumberId: D.secret });
const o_PhoneNumberOrder: D.LazyStruct = () => ({
  OrderedPhoneNumbers: D.list({ E164PhoneNumber: D.secret }),
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_Proxy: D.LazyStruct = () => ({ FallBackPhoneNumber: D.secret });
const o_ProxySession: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  EndedTimestamp: D.ts,
  Participants: D.list({ PhoneNumber: D.secret, ProxyPhoneNumber: D.secret }),
});
const o_SipMediaApplication: D.LazyStruct = () => ({
  Endpoints: D.list({ LambdaArn: D.secret }),
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_SipMediaApplicationAlexaSkillConfiguration: D.LazyStruct = () => ({
  AlexaSkillIds: D.list(D.secret),
});
const o_SipRule: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_SpeakerSearchTask: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  StartedTimestamp: D.ts,
});
const o_StreamingConfiguration: D.LazyStruct = () => ({
  MediaInsightsConfiguration: { ConfigurationArn: D.secret },
});
const o_Termination: D.LazyStruct = () => ({ DefaultPhoneNumber: D.secret });
const o_VoiceConnector: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_VoiceConnectorGroup: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_VoiceProfile: D.LazyStruct = () => ({
  VoiceProfileArn: D.secret,
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  ExpirationTimestamp: D.ts,
});
const o_VoiceProfileDomain: D.LazyStruct = () => ({
  VoiceProfileDomainArn: D.secret,
  ServerSideEncryptionConfiguration: { KmsKeyArn: D.secret },
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_VoiceToneAnalysisTask: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  StartedTimestamp: D.ts,
});
