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
  sdkId: "Chime SDK Voice",
  serviceShapeName: "ChimeSDKTelephonyService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "chime" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-08-03");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://voice-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://voice-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://voice-chime.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GoneException
  extends /*@__PURE__*/ S.TaggedError<GoneException>()(
    "GoneException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottledClientException
  extends /*@__PURE__*/ S.TaggedError<ThrottledClientException>()(
    "ThrottledClientException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedClientException>()(
    "UnauthorizedClientException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
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
export type PhoneNumberProductType = "VoiceConnector" | "SipMediaApplicationDialIn" | (string & {});
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
export type OrderedPhoneNumberStatus = "Processing" | "Acquired" | "Failed" | (string & {});
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
export type NumberSelectionBehavior = "PreferSticky" | "AvoidSticky" | (string & {});
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
export type ProxySessionStatus = "Open" | "InProgress" | "Closed" | (string & {});
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
export type SipHeadersMap = { [key: string]: string | redacted.Redacted<string> | undefined };
export type SMACreateCallArgumentsMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface CreateSipMediaApplicationCallRequest {
  FromPhoneNumber: string | redacted.Redacted<string>;
  ToPhoneNumber: string | redacted.Redacted<string>;
  SipMediaApplicationId: string;
  SipHeaders?: { [key: string]: string | redacted.Redacted<string> | undefined };
  ArgumentsMap?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export interface SipMediaApplicationCall {
  TransactionId?: string;
}
export interface CreateSipMediaApplicationCallResponse {
  SipMediaApplicationCall?: SipMediaApplicationCall;
}
export type SipRuleName = string;
export type SipRuleTriggerType = "ToPhoneNumber" | "RequestUriHostname" | (string & {});
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
export type DNISEmergencyCallingConfigurationList = DNISEmergencyCallingConfiguration[];
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
  input: __S(64, __c8, 0) as any as S.Schema<AssociatePhoneNumbersWithVoiceConnectorRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<AssociatePhoneNumbersWithVoiceConnectorResponse>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<AssociatePhoneNumbersWithVoiceConnectorGroupRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<AssociatePhoneNumbersWithVoiceConnectorGroupResponse>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<BatchDeletePhoneNumberRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<BatchDeletePhoneNumberResponse>,
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
}));

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
  input: __S(114, __c14, 2) as any as S.Schema<BatchUpdatePhoneNumberRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<BatchUpdatePhoneNumberResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<CreatePhoneNumberOrderRequest>,
  output: __S(128, __c16, 0) as any as S.Schema<CreatePhoneNumberOrderResponse>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<CreateProxySessionRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<CreateProxySessionResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<CreateSipMediaApplicationRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<CreateSipMediaApplicationResponse>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<CreateSipMediaApplicationCallRequest>,
  output: __S(218, __c27, 2) as any as S.Schema<CreateSipMediaApplicationCallResponse>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<CreateSipRuleRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<CreateSipRuleResponse>,
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
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<CreateVoiceConnectorRequest>,
  output: __S(256, __c32, 0) as any as S.Schema<CreateVoiceConnectorResponse>,
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
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<CreateVoiceConnectorGroupRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<CreateVoiceConnectorGroupResponse>,
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
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<CreateVoiceProfileRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<CreateVoiceProfileResponse>,
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
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<CreateVoiceProfileDomainRequest>,
  output: __S(330, __c41, 2) as any as S.Schema<CreateVoiceProfileDomainResponse>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<DeletePhoneNumberRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeletePhoneNumberResponse>,
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
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<DeleteProxySessionRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteProxySessionResponse>,
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
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<DeleteSipMediaApplicationRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteSipMediaApplicationResponse>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<DeleteSipRuleRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteSipRuleResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<DeleteVoiceConnectorRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceConnectorResponse>,
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
}));

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
  input: __S(
    384,
    __c48,
    0,
  ) as any as S.Schema<DeleteVoiceConnectorEmergencyCallingConfigurationRequest>,
  output: __S(
    344,
    __c43,
    0,
  ) as any as S.Schema<DeleteVoiceConnectorEmergencyCallingConfigurationResponse>,
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
}));

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
  input: __S(
    392,
    __c49,
    0,
  ) as any as S.Schema<DeleteVoiceConnectorExternalSystemsConfigurationRequest>,
  output: __S(
    344,
    __c43,
    0,
  ) as any as S.Schema<DeleteVoiceConnectorExternalSystemsConfigurationResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<DeleteVoiceConnectorGroupRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceConnectorGroupResponse>,
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
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<DeleteVoiceConnectorOriginationRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceConnectorOriginationResponse>,
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
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<DeleteVoiceConnectorProxyRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceConnectorProxyResponse>,
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
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<DeleteVoiceConnectorStreamingConfigurationRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceConnectorStreamingConfigurationResponse>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<DeleteVoiceConnectorTerminationRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceConnectorTerminationResponse>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<DeleteVoiceConnectorTerminationCredentialsRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceConnectorTerminationCredentialsResponse>,
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
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<DeleteVoiceProfileRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceProfileResponse>,
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
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<DeleteVoiceProfileDomainRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DeleteVoiceProfileDomainResponse>,
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
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<DisassociatePhoneNumbersFromVoiceConnectorRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<DisassociatePhoneNumbersFromVoiceConnectorResponse>,
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
}));

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
  input: __S(
    472,
    __c59,
    0,
  ) as any as S.Schema<DisassociatePhoneNumbersFromVoiceConnectorGroupRequest>,
  output: __S(
    74,
    __c9,
    2,
  ) as any as S.Schema<DisassociatePhoneNumbersFromVoiceConnectorGroupResponse>,
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
}));

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
  input: __S(480, __c60, 0) as any as S.Schema<GetGlobalSettingsRequest>,
  output: __S(481, __c60, 1) as any as S.Schema<GetGlobalSettingsResponse>,
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
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<GetPhoneNumberRequest>,
  output: __S(512, __c64, 0) as any as S.Schema<GetPhoneNumberResponse>,
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
}));

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
  input: __S(520, __c65, 0) as any as S.Schema<GetPhoneNumberOrderRequest>,
  output: __S(128, __c16, 0) as any as S.Schema<GetPhoneNumberOrderResponse>,
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
}));

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
  input: __S(528, __c66, 0) as any as S.Schema<GetPhoneNumberSettingsRequest>,
  output: __S(529, __c66, 1) as any as S.Schema<GetPhoneNumberSettingsResponse>,
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
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<GetProxySessionRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<GetProxySessionResponse>,
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
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<GetSipMediaApplicationRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<GetSipMediaApplicationResponse>,
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
}));

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
  input: __S(
    552,
    __c69,
    0,
  ) as any as S.Schema<GetSipMediaApplicationAlexaSkillConfigurationRequest>,
  output: __S(
    561,
    __c70,
    1,
  ) as any as S.Schema<GetSipMediaApplicationAlexaSkillConfigurationResponse>,
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
}));

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
  input: __S(568, __c71, 0) as any as S.Schema<GetSipMediaApplicationLoggingConfigurationRequest>,
  output: __S(577, __c72, 1) as any as S.Schema<GetSipMediaApplicationLoggingConfigurationResponse>,
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
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<GetSipRuleRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<GetSipRuleResponse>,
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
}));

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
  input: __S(592, __c74, 0) as any as S.Schema<GetSpeakerSearchTaskRequest>,
  output: __S(612, __c76, 4) as any as S.Schema<GetSpeakerSearchTaskResponse>,
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
}));

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
  input: __S(616, __c77, 0) as any as S.Schema<GetVoiceConnectorRequest>,
  output: __S(256, __c32, 0) as any as S.Schema<GetVoiceConnectorResponse>,
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
}));

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
  input: __S(
    624,
    __c78,
    0,
  ) as any as S.Schema<GetVoiceConnectorEmergencyCallingConfigurationRequest>,
  output: __S(
    635,
    __c79,
    3,
  ) as any as S.Schema<GetVoiceConnectorEmergencyCallingConfigurationResponse>,
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
}));

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
  input: __S(
    640,
    __c80,
    0,
  ) as any as S.Schema<GetVoiceConnectorExternalSystemsConfigurationRequest>,
  output: __S(
    649,
    __c81,
    1,
  ) as any as S.Schema<GetVoiceConnectorExternalSystemsConfigurationResponse>,
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
}));

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
  input: __S(656, __c82, 0) as any as S.Schema<GetVoiceConnectorGroupRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<GetVoiceConnectorGroupResponse>,
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
}));

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
  input: __S(664, __c83, 0) as any as S.Schema<GetVoiceConnectorLoggingConfigurationRequest>,
  output: __S(673, __c84, 1) as any as S.Schema<GetVoiceConnectorLoggingConfigurationResponse>,
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
}));

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
  input: __S(680, __c85, 0) as any as S.Schema<GetVoiceConnectorOriginationRequest>,
  output: __S(691, __c86, 3) as any as S.Schema<GetVoiceConnectorOriginationResponse>,
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
}));

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
  input: __S(696, __c87, 0) as any as S.Schema<GetVoiceConnectorProxyRequest>,
  output: __S(705, __c88, 1) as any as S.Schema<GetVoiceConnectorProxyResponse>,
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
}));

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
  input: __S(712, __c89, 0) as any as S.Schema<GetVoiceConnectorStreamingConfigurationRequest>,
  output: __S(724, __c90, 4) as any as S.Schema<GetVoiceConnectorStreamingConfigurationResponse>,
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
}));

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
  input: __S(728, __c91, 0) as any as S.Schema<GetVoiceConnectorTerminationRequest>,
  output: __S(737, __c92, 1) as any as S.Schema<GetVoiceConnectorTerminationResponse>,
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
}));

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
  input: __S(744, __c93, 0) as any as S.Schema<GetVoiceConnectorTerminationHealthRequest>,
  output: __S(746, __c93, 2) as any as S.Schema<GetVoiceConnectorTerminationHealthResponse>,
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
}));

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
  input: __S(752, __c94, 0) as any as S.Schema<GetVoiceProfileRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<GetVoiceProfileResponse>,
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
}));

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
  input: __S(760, __c95, 0) as any as S.Schema<GetVoiceProfileDomainRequest>,
  output: __S(330, __c41, 2) as any as S.Schema<GetVoiceProfileDomainResponse>,
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
}));

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
  input: __S(768, __c96, 0) as any as S.Schema<GetVoiceToneAnalysisTaskRequest>,
  output: __S(777, __c97, 1) as any as S.Schema<GetVoiceToneAnalysisTaskResponse>,
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
}));

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
  input: __S(784, __c98, 0) as any as S.Schema<ListAvailableVoiceConnectorRegionsRequest>,
  output: __S(785, __c98, 1) as any as S.Schema<ListAvailableVoiceConnectorRegionsResponse>,
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
}));

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
  input: __S(792, __c99, 0) as any as S.Schema<ListPhoneNumberOrdersRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<ListPhoneNumberOrdersResponse>,
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
  input: __S(800, __c100, 0) as any as S.Schema<ListPhoneNumbersRequest>,
  output: __S(802, __c100, 2) as any as S.Schema<ListPhoneNumbersResponse>,
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
  input: __S(808, __c101, 0) as any as S.Schema<ListProxySessionsRequest>,
  output: __S(810, __c101, 2) as any as S.Schema<ListProxySessionsResponse>,
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
  input: __S(816, __c102, 0) as any as S.Schema<ListSipMediaApplicationsRequest>,
  output: __S(818, __c102, 2) as any as S.Schema<ListSipMediaApplicationsResponse>,
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
  input: __S(824, __c103, 0) as any as S.Schema<ListSipRulesRequest>,
  output: __S(826, __c103, 2) as any as S.Schema<ListSipRulesResponse>,
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
  input: __S(832, __c104, 0) as any as S.Schema<ListSupportedPhoneNumberCountriesRequest>,
  output: __S(835, __c104, 3) as any as S.Schema<ListSupportedPhoneNumberCountriesResponse>,
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
}));

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
  input: __S(840, __c105, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(841, __c105, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(848, __c106, 0) as any as S.Schema<ListVoiceConnectorGroupsRequest>,
  output: __S(850, __c106, 2) as any as S.Schema<ListVoiceConnectorGroupsResponse>,
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
  input: __S(856, __c107, 0) as any as S.Schema<ListVoiceConnectorsRequest>,
  output: __S(858, __c107, 2) as any as S.Schema<ListVoiceConnectorsResponse>,
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
  input: __S(864, __c108, 0) as any as S.Schema<ListVoiceConnectorTerminationCredentialsRequest>,
  output: __S(865, __c108, 1) as any as S.Schema<ListVoiceConnectorTerminationCredentialsResponse>,
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
}));

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
  input: __S(872, __c109, 0) as any as S.Schema<ListVoiceProfileDomainsRequest>,
  output: __S(875, __c109, 3) as any as S.Schema<ListVoiceProfileDomainsResponse>,
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
  input: __S(880, __c110, 0) as any as S.Schema<ListVoiceProfilesRequest>,
  output: __S(882, __c110, 2) as any as S.Schema<ListVoiceProfilesResponse>,
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
  input: __S(
    888,
    __c111,
    0,
  ) as any as S.Schema<PutSipMediaApplicationAlexaSkillConfigurationRequest>,
  output: __S(
    561,
    __c70,
    1,
  ) as any as S.Schema<PutSipMediaApplicationAlexaSkillConfigurationResponse>,
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
}));

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
  input: __S(896, __c112, 0) as any as S.Schema<PutSipMediaApplicationLoggingConfigurationRequest>,
  output: __S(577, __c72, 1) as any as S.Schema<PutSipMediaApplicationLoggingConfigurationResponse>,
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
}));

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
  input: __S(
    904,
    __c113,
    0,
  ) as any as S.Schema<PutVoiceConnectorEmergencyCallingConfigurationRequest>,
  output: __S(
    635,
    __c79,
    3,
  ) as any as S.Schema<PutVoiceConnectorEmergencyCallingConfigurationResponse>,
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
}));

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
  input: __S(
    912,
    __c114,
    0,
  ) as any as S.Schema<PutVoiceConnectorExternalSystemsConfigurationRequest>,
  output: __S(
    649,
    __c81,
    1,
  ) as any as S.Schema<PutVoiceConnectorExternalSystemsConfigurationResponse>,
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
}));

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
  input: __S(920, __c115, 0) as any as S.Schema<PutVoiceConnectorLoggingConfigurationRequest>,
  output: __S(673, __c84, 1) as any as S.Schema<PutVoiceConnectorLoggingConfigurationResponse>,
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
}));

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
  input: __S(928, __c116, 0) as any as S.Schema<PutVoiceConnectorOriginationRequest>,
  output: __S(691, __c86, 3) as any as S.Schema<PutVoiceConnectorOriginationResponse>,
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
}));

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
  input: __S(936, __c117, 0) as any as S.Schema<PutVoiceConnectorProxyRequest>,
  output: __S(705, __c88, 1) as any as S.Schema<PutVoiceConnectorProxyResponse>,
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
}));

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
  input: __S(944, __c118, 0) as any as S.Schema<PutVoiceConnectorStreamingConfigurationRequest>,
  output: __S(724, __c90, 4) as any as S.Schema<PutVoiceConnectorStreamingConfigurationResponse>,
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
}));

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
  input: __S(952, __c119, 0) as any as S.Schema<PutVoiceConnectorTerminationRequest>,
  output: __S(737, __c92, 1) as any as S.Schema<PutVoiceConnectorTerminationResponse>,
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
}));

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
  input: __S(962, __c120, 2) as any as S.Schema<PutVoiceConnectorTerminationCredentialsRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<PutVoiceConnectorTerminationCredentialsResponse>,
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
}));

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
  input: __S(968, __c121, 0) as any as S.Schema<RestorePhoneNumberRequest>,
  output: __S(512, __c64, 0) as any as S.Schema<RestorePhoneNumberResponse>,
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
}));

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
  input: __S(976, __c122, 0) as any as S.Schema<SearchAvailablePhoneNumbersRequest>,
  output: __S(977, __c122, 1) as any as S.Schema<SearchAvailablePhoneNumbersResponse>,
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
  input: __S(984, __c123, 0) as any as S.Schema<StartSpeakerSearchTaskRequest>,
  output: __S(612, __c76, 4) as any as S.Schema<StartSpeakerSearchTaskResponse>,
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
}));

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
  input: __S(992, __c124, 0) as any as S.Schema<StartVoiceToneAnalysisTaskRequest>,
  output: __S(777, __c97, 1) as any as S.Schema<StartVoiceToneAnalysisTaskResponse>,
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
}));

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
  input: __S(1000, __c125, 0) as any as S.Schema<StopSpeakerSearchTaskRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<StopSpeakerSearchTaskResponse>,
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
}));

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
  input: __S(1008, __c126, 0) as any as S.Schema<StopVoiceToneAnalysisTaskRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<StopVoiceToneAnalysisTaskResponse>,
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
}));

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
  input: __S(1016, __c127, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1024, __c128, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(1032, __c129, 0) as any as S.Schema<UpdateGlobalSettingsRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<UpdateGlobalSettingsResponse>,
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
}));

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
  input: __S(1040, __c130, 0) as any as S.Schema<UpdatePhoneNumberRequest>,
  output: __S(512, __c64, 0) as any as S.Schema<UpdatePhoneNumberResponse>,
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
}));

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
  input: __S(1048, __c131, 0) as any as S.Schema<UpdatePhoneNumberSettingsRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<UpdatePhoneNumberSettingsResponse>,
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
}));

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
  input: __S(1056, __c132, 0) as any as S.Schema<UpdateProxySessionRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UpdateProxySessionResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<UpdateSipMediaApplicationRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<UpdateSipMediaApplicationResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<UpdateSipMediaApplicationCallRequest>,
  output: __S(218, __c27, 2) as any as S.Schema<UpdateSipMediaApplicationCallResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<UpdateSipRuleRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateSipRuleResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<UpdateVoiceConnectorRequest>,
  output: __S(256, __c32, 0) as any as S.Schema<UpdateVoiceConnectorResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<UpdateVoiceConnectorGroupRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<UpdateVoiceConnectorGroupResponse>,
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
}));

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
 * Updates the specified voice profile's voice print and refreshes its expiration timestamp.
 *
 * As a condition of using this feature, you acknowledge that the collection, use, storage, and retention of
 * your caller's biometric identifiers and biometric information ("biometric data") in the form of a digital voiceprint
 * requires the caller's informed consent via a written release. Such consent is required under various state laws,
 * including biometrics laws in Illinois, Texas, Washington and other state privacy laws.
 *
 * You must provide a written release to each caller through a process that clearly reflects each caller's informed
 * consent before using Amazon Chime SDK Voice Insights service, as required under the terms of your agreement
 * with AWS governing your use of the service.
 */
export const updateVoiceProfile: API.OperationMethod<
  UpdateVoiceProfileRequest,
  UpdateVoiceProfileResponse,
  UpdateVoiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<UpdateVoiceProfileRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<UpdateVoiceProfileResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<UpdateVoiceProfileDomainRequest>,
  output: __S(330, __c41, 2) as any as S.Schema<UpdateVoiceProfileDomainResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<ValidateE911AddressRequest>,
  output: __S(60, __c7, 4) as any as S.Schema<ValidateE911AddressResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
          Name: S.optional(S.String),
          Endpoints: S.optional(__S(201, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/sip-media-applications/{SipMediaApplicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSipMediaApplicationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
          TransactionId: S.String.pipe(T.HttpLabel("TransactionId")),
          Arguments: __S(216, __c27, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/sip-media-applications/{SipMediaApplicationId}/calls/{TransactionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSipMediaApplicationCallRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipRuleId: S.String.pipe(T.HttpLabel("SipRuleId")),
          Name: S.String,
          Disabled: S.optional(S.Boolean),
          TargetApplications: S.optional(__S(241, __c30, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/sip-rules/{SipRuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSipRuleRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          Name: S.String,
          RequireEncryption: S.Boolean,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/voice-connectors/{VoiceConnectorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVoiceConnectorRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorGroupId: S.String.pipe(T.HttpLabel("VoiceConnectorGroupId")),
          Name: S.String,
          VoiceConnectorItems: __S(289, __c36, 1),
          CallDistributionType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/voice-connector-groups/{VoiceConnectorGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVoiceConnectorGroupRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceProfileId: S.String.pipe(T.HttpLabel("VoiceProfileId")),
          SpeakerSearchTaskId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/voice-profiles/{VoiceProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVoiceProfileRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceProfileDomainId: S.String.pipe(T.HttpLabel("VoiceProfileDomainId")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/voice-profile-domains/{VoiceProfileDomainId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVoiceProfileDomainRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AwsAccountId: S.String,
          StreetNumber: SensitiveString,
          StreetInfo: SensitiveString,
          City: SensitiveString,
          State: SensitiveString,
          Country: SensitiveString,
          PostalCode: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/emergency-calling/address" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateE911AddressRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          streetName: S.optional(SensitiveString),
          streetSuffix: S.optional(SensitiveString),
          postDirectional: S.optional(SensitiveString),
          preDirectional: S.optional(SensitiveString),
          streetNumber: S.optional(SensitiveString),
          city: S.optional(SensitiveString),
          state: S.optional(SensitiveString),
          postalCode: S.optional(SensitiveString),
          postalCodePlus4: S.optional(SensitiveString),
          country: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Address" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          streetInfo: S.optional(SensitiveString),
          streetNumber: S.optional(SensitiveString),
          city: S.optional(SensitiveString),
          state: S.optional(SensitiveString),
          postalCode: S.optional(SensitiveString),
          postalCodePlus4: S.optional(SensitiveString),
          country: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CandidateAddress" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(58, __c7, 2)
          .pipe(/*@__PURE__*/ T.XmlName("CandidateAddress"))
          .annotate({ identifier: "CandidateAddress" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          ValidationResult: S.optional(S.Number),
          AddressExternalId: S.optional(S.String),
          Address: S.optional(__S(57, __c7, 1)),
          CandidateAddressList: S.optional(__S(59, __c7, 3)),
        }),
      ).annotate({ identifier: "ValidateE911AddressResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          E164PhoneNumbers: __S(80, __c10, 0),
          ForceAssociate: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}?operation=associate-phone-numbers",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociatePhoneNumbersWithVoiceConnectorRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: S.optional(SensitiveString),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhoneNumberError" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ PhoneNumberErrors: S.optional(__S(73, __c9, 1)) }),
      ).annotate({ identifier: "AssociatePhoneNumbersWithVoiceConnectorResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorGroupId: S.String.pipe(T.HttpLabel("VoiceConnectorGroupId")),
          E164PhoneNumbers: __S(80, __c10, 0),
          ForceAssociate: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connector-groups/{VoiceConnectorGroupId}?operation=associate-phone-numbers",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociatePhoneNumbersWithVoiceConnectorGroupRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberIds: __S(104, __c13, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-numbers?operation=batch-delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeletePhoneNumberRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: SensitiveString,
          ProductType: S.optional(S.String),
          CallingName: S.optional(SensitiveString),
          Name: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "UpdatePhoneNumberRequestItem" });
    case 1:
      return S.Array(__S(112, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ UpdatePhoneNumberRequestItems: __S(113, __c14, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-numbers?operation=batch-update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdatePhoneNumberRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductType: S.String,
          E164PhoneNumbers: __S(80, __c10, 0),
          Name: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-number-orders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePhoneNumberOrderRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberOrder: S.optional(__S(138, __c17, 2)) }),
      ).annotate({ identifier: "CreatePhoneNumberOrderResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ E164PhoneNumber: S.optional(SensitiveString), Status: S.optional(S.String) }),
      ).annotate({ identifier: "OrderedPhoneNumber" });
    case 1:
      return S.Array(__S(136, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberOrderId: S.optional(S.String),
          ProductType: S.optional(S.String),
          Status: S.optional(S.String),
          OrderType: S.optional(S.String),
          OrderedPhoneNumbers: S.optional(__S(137, __c17, 1)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FocDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhoneNumberOrder" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          ParticipantPhoneNumbers: __S(80, __c10, 0),
          Name: S.optional(SensitiveString),
          ExpiryMinutes: S.optional(S.Number),
          Capabilities: __S(152, __c19, 0),
          NumberSelectionBehavior: S.optional(S.String),
          GeoMatchLevel: S.optional(S.String),
          GeoMatchParams: S.optional(__S(160, __c20, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProxySessionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Country: S.String, AreaCode: S.String })).annotate({
        identifier: "GeoMatchParams",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PhoneNumber: S.optional(SensitiveString),
          ProxyPhoneNumber: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Participant" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.optional(S.String),
          ProxySessionId: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          ExpiryMinutes: S.optional(S.Number),
          Capabilities: S.optional(__S(152, __c19, 0)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Participants: S.optional(__S(162, __c20, 2)),
          NumberSelectionBehavior: S.optional(S.String),
          GeoMatchLevel: S.optional(S.String),
          GeoMatchParams: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "ProxySession" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProxySession: S.optional(__S(163, __c20, 3)) })).annotate({
        identifier: "CreateProxySessionResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AwsRegion: S.String,
          Name: S.String,
          Endpoints: __S(201, __c25, 1),
          Tags: S.optional(__S(185, __c23, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sip-media-applications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSipMediaApplicationRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: SensitiveString, Value: SensitiveString })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(184, __c23, 0));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SipMediaApplication: S.optional(__S(202, __c25, 2)) }),
      ).annotate({ identifier: "CreateSipMediaApplicationResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LambdaArn: S.optional(SensitiveString) })).annotate({
        identifier: "SipMediaApplicationEndpoint",
      });
    case 1:
      return S.Array(__S(200, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
          Name: S.optional(S.String),
          Endpoints: S.optional(__S(201, __c25, 1)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SipMediaApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SipMediaApplication" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FromPhoneNumber: SensitiveString,
          ToPhoneNumber: SensitiveString,
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
          SipHeaders: S.optional(__S(216, __c27, 0)),
          ArgumentsMap: S.optional(__S(216, __c27, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/sip-media-applications/{SipMediaApplicationId}/calls",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSipMediaApplicationCallRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 1:
      return S.suspend(() => S.Struct({ TransactionId: S.optional(S.String) })).annotate({
        identifier: "SipMediaApplicationCall",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ SipMediaApplicationCall: S.optional(__S(217, __c27, 1)) }),
      ).annotate({ identifier: "CreateSipMediaApplicationCallResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          TriggerType: S.String,
          TriggerValue: S.String,
          Disabled: S.optional(S.Boolean),
          TargetApplications: __S(241, __c30, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/sip-rules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSipRuleRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SipRule: S.optional(__S(242, __c30, 2)) })).annotate({
        identifier: "CreateSipRuleResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.optional(S.String),
          Priority: S.optional(S.Number),
          AwsRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "SipRuleTargetApplication" });
    case 1:
      return S.Array(__S(240, __c30, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SipRuleId: S.optional(S.String),
          Name: S.optional(S.String),
          Disabled: S.optional(S.Boolean),
          TriggerType: S.optional(S.String),
          TriggerValue: S.optional(S.String),
          TargetApplications: S.optional(__S(241, __c30, 1)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "SipRule" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          AwsRegion: S.optional(S.String),
          RequireEncryption: S.Boolean,
          Tags: S.optional(__S(185, __c23, 1)),
          IntegrationType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/voice-connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateVoiceConnectorRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ VoiceConnector: S.optional(__S(264, __c33, 0)) })).annotate(
        { identifier: "CreateVoiceConnectorResponse" },
      );
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
          Name: S.optional(S.String),
          OutboundHostName: S.optional(S.String),
          RequireEncryption: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          VoiceConnectorArn: S.optional(S.String),
          IntegrationType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VoiceConnector" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          VoiceConnectorItems: S.optional(__S(289, __c36, 1)),
          CallDistributionType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/voice-connector-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVoiceConnectorGroupRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorGroup: S.optional(__S(290, __c36, 2)) }),
      ).annotate({ identifier: "CreateVoiceConnectorGroupResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String, Priority: S.optional(S.Number) }),
      ).annotate({ identifier: "VoiceConnectorItem" });
    case 1:
      return S.Array(__S(288, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorGroupId: S.optional(S.String),
          Name: S.optional(S.String),
          VoiceConnectorItems: S.optional(__S(289, __c36, 1)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          VoiceConnectorGroupArn: S.optional(S.String),
          CallDistributionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VoiceConnectorGroup" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SpeakerSearchTaskId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/voice-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateVoiceProfileRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ VoiceProfile: S.optional(__S(312, __c39, 0)) })).annotate({
        identifier: "CreateVoiceProfileResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceProfileId: S.optional(S.String),
          VoiceProfileArn: S.optional(SensitiveString),
          VoiceProfileDomainId: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExpirationTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "VoiceProfile" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          ServerSideEncryptionConfiguration: __S(328, __c41, 0),
          ClientRequestToken: S.optional(S.String),
          Tags: S.optional(__S(185, __c23, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/voice-profile-domains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVoiceProfileDomainRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KmsKeyArn: SensitiveString })).annotate({
        identifier: "ServerSideEncryptionConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VoiceProfileDomainId: S.optional(S.String),
          VoiceProfileDomainArn: S.optional(SensitiveString),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ServerSideEncryptionConfiguration: S.optional(__S(328, __c41, 0)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "VoiceProfileDomain" });
    case 2:
      return S.suspend(() =>
        S.Struct({ VoiceProfileDomain: S.optional(__S(329, __c41, 1)) }),
      ).annotate({ identifier: "CreateVoiceProfileDomainResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberId: SensitiveString.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/phone-numbers/{PhoneNumberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePhoneNumberRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeletePhoneNumberResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          ProxySessionId: S.String.pipe(T.HttpLabel("ProxySessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProxySessionRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sip-media-applications/{SipMediaApplicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSipMediaApplicationRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SipRuleId: S.String.pipe(T.HttpLabel("SipRuleId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sip-rules/{SipRuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSipRuleRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/voice-connectors/{VoiceConnectorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorEmergencyCallingConfigurationRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/voice-connectors/{VoiceConnectorId}/external-systems-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorExternalSystemsConfigurationRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorGroupId: S.String.pipe(T.HttpLabel("VoiceConnectorGroupId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/voice-connector-groups/{VoiceConnectorGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorGroupRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/voice-connectors/{VoiceConnectorId}/origination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorOriginationRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorProxyRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/voice-connectors/{VoiceConnectorId}/streaming-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorStreamingConfigurationRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/voice-connectors/{VoiceConnectorId}/termination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorTerminationRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          Usernames: __S(80, __c10, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}/termination/credentials?operation=delete",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceConnectorTerminationCredentialsRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceProfileId: S.String.pipe(T.HttpLabel("VoiceProfileId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/voice-profiles/{VoiceProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceProfileRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceProfileDomainId: S.String.pipe(T.HttpLabel("VoiceProfileDomainId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/voice-profile-domains/{VoiceProfileDomainId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVoiceProfileDomainRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          E164PhoneNumbers: __S(80, __c10, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}?operation=disassociate-phone-numbers",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociatePhoneNumbersFromVoiceConnectorRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorGroupId: S.String.pipe(T.HttpLabel("VoiceConnectorGroupId")),
          E164PhoneNumbers: __S(80, __c10, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connector-groups/{VoiceConnectorGroupId}?operation=disassociate-phone-numbers",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociatePhoneNumbersFromVoiceConnectorGroupRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/settings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGlobalSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ VoiceConnector: S.optional(__S(488, __c61, 0)) })).annotate(
        { identifier: "GetGlobalSettingsResponse" },
      );
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CdrBucket: S.optional(S.String) })).annotate({
        identifier: "VoiceConnectorSettings",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberId: SensitiveString.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/phone-numbers/{PhoneNumberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPhoneNumberRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InboundCall: S.optional(S.Boolean),
          OutboundCall: S.optional(S.Boolean),
          InboundSMS: S.optional(S.Boolean),
          OutboundSMS: S.optional(S.Boolean),
          InboundMMS: S.optional(S.Boolean),
          OutboundMMS: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PhoneNumberCapabilities" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.String),
          Name: S.optional(S.String),
          AssociatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PhoneNumberAssociation" });
    case 2:
      return S.Array(__S(505, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: S.optional(SensitiveString),
          E164PhoneNumber: S.optional(SensitiveString),
          PhoneNumberArn: S.optional(S.String),
          Country: S.optional(S.String),
          Type: S.optional(S.String),
          ProductType: S.optional(S.String),
          Status: S.optional(S.String),
          Capabilities: S.optional(__S(504, __c63, 0)),
          Associations: S.optional(__S(506, __c63, 2)),
          CallingName: S.optional(SensitiveString),
          CallingNameStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DeletionTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          OrderId: S.optional(S.String),
          Name: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "PhoneNumber" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PhoneNumber: S.optional(__S(507, __c63, 3)) })).annotate({
        identifier: "GetPhoneNumberResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberOrderId: S.String.pipe(T.HttpLabel("PhoneNumberOrderId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/phone-number-orders/{PhoneNumberOrderId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPhoneNumberOrderRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/settings/phone-number" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPhoneNumberSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CallingName: S.optional(SensitiveString),
          CallingNameUpdatedTimestamp: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "GetPhoneNumberSettingsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          ProxySessionId: S.String.pipe(T.HttpLabel("ProxySessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProxySessionRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sip-media-applications/{SipMediaApplicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSipMediaApplicationRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/sip-media-applications/{SipMediaApplicationId}/alexa-skill-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSipMediaApplicationAlexaSkillConfigurationRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlexaSkillStatus: S.String, AlexaSkillIds: __S(80, __c10, 0) }),
      ).annotate({ identifier: "SipMediaApplicationAlexaSkillConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SipMediaApplicationAlexaSkillConfiguration: S.optional(__S(560, __c70, 0)) }),
      ).annotate({ identifier: "GetSipMediaApplicationAlexaSkillConfigurationResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/sip-media-applications/{SipMediaApplicationId}/logging-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSipMediaApplicationLoggingConfigurationRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EnableSipMediaApplicationMessageLogs: S.optional(S.Boolean) }),
      ).annotate({ identifier: "SipMediaApplicationLoggingConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SipMediaApplicationLoggingConfiguration: S.optional(__S(576, __c72, 0)) }),
      ).annotate({ identifier: "GetSipMediaApplicationLoggingConfigurationResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SipRuleId: S.String.pipe(T.HttpLabel("SipRuleId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sip-rules/{SipRuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSipRuleRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          SpeakerSearchTaskId: S.String.pipe(T.HttpLabel("SpeakerSearchTaskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/speaker-search-tasks/{SpeakerSearchTaskId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSpeakerSearchTaskRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.optional(S.String),
          TransactionId: S.optional(S.String),
          IsCaller: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CallDetails" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfidenceScore: S.optional(S.Number), VoiceProfileId: S.optional(S.String) }),
      ).annotate({ identifier: "SpeakerSearchResult" });
    case 1:
      return S.Array(__S(608, __c76, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Results: S.optional(__S(609, __c76, 1)),
          VoiceprintGenerationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpeakerSearchDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SpeakerSearchTaskId: S.optional(S.String),
          SpeakerSearchTaskStatus: S.optional(S.String),
          CallDetails: S.optional(__S(600, __c75, 0)),
          SpeakerSearchDetails: S.optional(__S(610, __c76, 2)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StartedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpeakerSearchTask" });
    case 4:
      return S.suspend(() =>
        S.Struct({ SpeakerSearchTask: S.optional(__S(611, __c76, 3)) }),
      ).annotate({ identifier: "GetSpeakerSearchTaskResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-connectors/{VoiceConnectorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorEmergencyCallingConfigurationRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmergencyPhoneNumber: SensitiveString,
          TestPhoneNumber: S.optional(SensitiveString),
          CallingCountry: S.String,
        }),
      ).annotate({ identifier: "DNISEmergencyCallingConfiguration" });
    case 1:
      return S.Array(__S(632, __c79, 0));
    case 2:
      return S.suspend(() => S.Struct({ DNIS: S.optional(__S(633, __c79, 1)) })).annotate({
        identifier: "EmergencyCallingConfiguration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ EmergencyCallingConfiguration: S.optional(__S(634, __c79, 2)) }),
      ).annotate({ identifier: "GetVoiceConnectorEmergencyCallingConfigurationResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/external-systems-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorExternalSystemsConfigurationRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionBorderControllerTypes: S.optional(__S(152, __c19, 0)),
          ContactCenterSystemTypes: S.optional(__S(152, __c19, 0)),
        }),
      ).annotate({ identifier: "ExternalSystemsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ExternalSystemsConfiguration: S.optional(__S(648, __c81, 0)) }),
      ).annotate({ identifier: "GetVoiceConnectorExternalSystemsConfigurationResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorGroupId: S.String.pipe(T.HttpLabel("VoiceConnectorGroupId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-connector-groups/{VoiceConnectorGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorGroupRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/logging-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorLoggingConfigurationRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnableSIPLogs: S.optional(S.Boolean),
          EnableMediaMetricLogs: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LoggingConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LoggingConfiguration: S.optional(__S(672, __c84, 0)) }),
      ).annotate({ identifier: "GetVoiceConnectorLoggingConfigurationResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-connectors/{VoiceConnectorId}/origination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorOriginationRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Host: S.optional(S.String),
          Port: S.optional(S.Number),
          Protocol: S.optional(S.String),
          Priority: S.optional(S.Number),
          Weight: S.optional(S.Number),
        }),
      ).annotate({ identifier: "OriginationRoute" });
    case 1:
      return S.Array(__S(688, __c86, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Routes: S.optional(__S(689, __c86, 1)), Disabled: S.optional(S.Boolean) }),
      ).annotate({ identifier: "Origination" });
    case 3:
      return S.suspend(() => S.Struct({ Origination: S.optional(__S(690, __c86, 2)) })).annotate({
        identifier: "GetVoiceConnectorOriginationResponse",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorProxyRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DefaultSessionExpiryMinutes: S.optional(S.Number),
          Disabled: S.optional(S.Boolean),
          FallBackPhoneNumber: S.optional(SensitiveString),
          PhoneNumberCountries: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "Proxy" });
    case 1:
      return S.suspend(() => S.Struct({ Proxy: S.optional(__S(704, __c88, 0)) })).annotate({
        identifier: "GetVoiceConnectorProxyResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/streaming-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorStreamingConfigurationRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ NotificationTarget: S.optional(S.String) })).annotate({
        identifier: "StreamingNotificationTarget",
      });
    case 1:
      return S.Array(__S(720, __c90, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Disabled: S.optional(S.Boolean),
          ConfigurationArn: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "MediaInsightsConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DataRetentionInHours: S.Number,
          Disabled: S.Boolean,
          StreamingNotificationTargets: S.optional(__S(721, __c90, 1)),
          MediaInsightsConfiguration: S.optional(__S(722, __c90, 2)),
        }),
      ).annotate({ identifier: "StreamingConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ StreamingConfiguration: S.optional(__S(723, __c90, 3)) }),
      ).annotate({ identifier: "GetVoiceConnectorStreamingConfigurationResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-connectors/{VoiceConnectorId}/termination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorTerminationRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CpsLimit: S.optional(S.Number),
          DefaultPhoneNumber: S.optional(SensitiveString),
          CallingRegions: S.optional(__S(104, __c13, 0)),
          CidrAllowedList: S.optional(__S(104, __c13, 0)),
          Disabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Termination" });
    case 1:
      return S.suspend(() => S.Struct({ Termination: S.optional(__S(736, __c92, 0)) })).annotate({
        identifier: "GetVoiceConnectorTerminationResponse",
      });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/termination/health",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceConnectorTerminationHealthRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Source: S.optional(S.String),
        }),
      ).annotate({ identifier: "TerminationHealth" });
    case 2:
      return S.suspend(() =>
        S.Struct({ TerminationHealth: S.optional(__S(745, __c93, 1)) }),
      ).annotate({ identifier: "GetVoiceConnectorTerminationHealthResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceProfileId: S.String.pipe(T.HttpLabel("VoiceProfileId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-profiles/{VoiceProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceProfileRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceProfileDomainId: S.String.pipe(T.HttpLabel("VoiceProfileDomainId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-profile-domains/{VoiceProfileDomainId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceProfileDomainRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          VoiceToneAnalysisTaskId: S.String.pipe(T.HttpLabel("VoiceToneAnalysisTaskId")),
          IsCaller: S.Boolean.pipe(T.HttpQuery("isCaller")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceToneAnalysisTaskRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceToneAnalysisTaskId: S.optional(S.String),
          VoiceToneAnalysisTaskStatus: S.optional(S.String),
          CallDetails: S.optional(__S(600, __c75, 0)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StartedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "VoiceToneAnalysisTask" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VoiceToneAnalysisTask: S.optional(__S(776, __c97, 0)) }),
      ).annotate({ identifier: "GetVoiceToneAnalysisTaskResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-connector-regions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAvailableVoiceConnectorRegionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorRegions: S.optional(__S(152, __c19, 0)) }),
      ).annotate({ identifier: "ListAvailableVoiceConnectorRegionsResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/phone-number-orders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPhoneNumberOrdersRequest" });
    case 1:
      return S.Array(__S(138, __c17, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberOrders: S.optional(__S(793, __c99, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPhoneNumberOrdersResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
          ProductType: S.optional(S.String).pipe(T.HttpQuery("product-type")),
          FilterName: S.optional(S.String).pipe(T.HttpQuery("filter-name")),
          FilterValue: S.optional(S.String).pipe(T.HttpQuery("filter-value")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/phone-numbers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPhoneNumbersRequest" });
    case 1:
      return S.Array(__S(507, __c63, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PhoneNumbers: S.optional(__S(801, __c100, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPhoneNumbersResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProxySessionsRequest" });
    case 1:
      return S.Array(__S(163, __c20, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProxySessions: S.optional(__S(809, __c101, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProxySessionsResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sip-media-applications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSipMediaApplicationsRequest" });
    case 1:
      return S.Array(__S(202, __c25, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplications: S.optional(__S(817, __c102, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSipMediaApplicationsResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.optional(S.String).pipe(T.HttpQuery("sip-media-application")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/sip-rules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSipRulesRequest" });
    case 1:
      return S.Array(__S(242, __c30, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ SipRules: S.optional(__S(825, __c103, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSipRulesResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProductType: S.String.pipe(T.HttpQuery("product-type")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/phone-number-countries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSupportedPhoneNumberCountriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CountryCode: S.optional(S.String),
          SupportedPhoneNumberTypes: S.optional(__S(152, __c19, 0)),
        }),
      ).annotate({ identifier: "PhoneNumberCountry" });
    case 2:
      return S.Array(__S(833, __c104, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ PhoneNumberCountries: S.optional(__S(834, __c104, 2)) }),
      ).annotate({ identifier: "ListSupportedPhoneNumberCountriesResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: SensitiveString.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(185, __c23, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-connector-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVoiceConnectorGroupsRequest" });
    case 1:
      return S.Array(__S(290, __c36, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorGroups: S.optional(__S(849, __c106, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListVoiceConnectorGroupsResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/voice-connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVoiceConnectorsRequest" });
    case 1:
      return S.Array(__S(264, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectors: S.optional(__S(857, __c107, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListVoiceConnectorsResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/voice-connectors/{VoiceConnectorId}/termination/credentials",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVoiceConnectorTerminationCredentialsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Usernames: S.optional(__S(80, __c10, 0)) })).annotate({
        identifier: "ListVoiceConnectorTerminationCredentialsResponse",
      });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/voice-profile-domains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVoiceProfileDomainsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VoiceProfileDomainId: S.optional(S.String),
          VoiceProfileDomainArn: S.optional(SensitiveString),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "VoiceProfileDomainSummary" });
    case 2:
      return S.Array(__S(873, __c109, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          VoiceProfileDomains: S.optional(__S(874, __c109, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListVoiceProfileDomainsResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceProfileDomainId: S.String.pipe(T.HttpQuery("voice-profile-domain-id")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/voice-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVoiceProfilesRequest" });
    case 1:
      return S.Array(__S(312, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          VoiceProfiles: S.optional(__S(881, __c110, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListVoiceProfilesResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
          SipMediaApplicationAlexaSkillConfiguration: S.optional(__S(560, __c70, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/sip-media-applications/{SipMediaApplicationId}/alexa-skill-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSipMediaApplicationAlexaSkillConfigurationRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
          SipMediaApplicationLoggingConfiguration: S.optional(__S(576, __c72, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/sip-media-applications/{SipMediaApplicationId}/logging-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSipMediaApplicationLoggingConfigurationRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          EmergencyCallingConfiguration: __S(634, __c79, 2),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVoiceConnectorEmergencyCallingConfigurationRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          SessionBorderControllerTypes: S.optional(__S(152, __c19, 0)),
          ContactCenterSystemTypes: S.optional(__S(152, __c19, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/voice-connectors/{VoiceConnectorId}/external-systems-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVoiceConnectorExternalSystemsConfigurationRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          LoggingConfiguration: __S(672, __c84, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/voice-connectors/{VoiceConnectorId}/logging-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVoiceConnectorLoggingConfigurationRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          Origination: __S(690, __c86, 2),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/voice-connectors/{VoiceConnectorId}/origination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVoiceConnectorOriginationRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          DefaultSessionExpiryMinutes: S.Number,
          PhoneNumberPoolCountries: __S(104, __c13, 0),
          FallBackPhoneNumber: S.optional(SensitiveString),
          Disabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVoiceConnectorProxyRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          StreamingConfiguration: __S(723, __c90, 3),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/voice-connectors/{VoiceConnectorId}/streaming-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVoiceConnectorStreamingConfigurationRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          Termination: __S(736, __c92, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/voice-connectors/{VoiceConnectorId}/termination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVoiceConnectorTerminationRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Username: S.optional(SensitiveString), Password: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Credential" });
    case 1:
      return S.Array(__S(960, __c120, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          Credentials: S.optional(__S(961, __c120, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}/termination/credentials?operation=put",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVoiceConnectorTerminationCredentialsRequest" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberId: SensitiveString.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-numbers/{PhoneNumberId}?operation=restore" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestorePhoneNumberRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AreaCode: S.optional(S.String).pipe(T.HttpQuery("area-code")),
          City: S.optional(S.String).pipe(T.HttpQuery("city")),
          Country: S.optional(S.String).pipe(T.HttpQuery("country")),
          State: S.optional(S.String).pipe(T.HttpQuery("state")),
          TollFreePrefix: S.optional(S.String).pipe(T.HttpQuery("toll-free-prefix")),
          PhoneNumberType: S.optional(S.String).pipe(T.HttpQuery("phone-number-type")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/search?type=phone-numbers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchAvailablePhoneNumbersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          E164PhoneNumbers: S.optional(__S(80, __c10, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchAvailablePhoneNumbersResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          TransactionId: S.String,
          VoiceProfileDomainId: S.String,
          ClientRequestToken: S.optional(S.String),
          CallLeg: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}/speaker-search-tasks",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSpeakerSearchTaskRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          TransactionId: S.String,
          LanguageCode: S.String,
          ClientRequestToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartVoiceToneAnalysisTaskRequest" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          SpeakerSearchTaskId: S.String.pipe(T.HttpLabel("SpeakerSearchTaskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}/speaker-search-tasks/{SpeakerSearchTaskId}?operation=stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopSpeakerSearchTaskRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          VoiceToneAnalysisTaskId: S.String.pipe(T.HttpLabel("VoiceToneAnalysisTaskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}?operation=stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopVoiceToneAnalysisTaskRequest" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: SensitiveString, Tags: __S(185, __c23, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags?operation=tag-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: SensitiveString, TagKeys: __S(80, __c10, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags?operation=untag-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VoiceConnector: __S(488, __c61, 0) }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/settings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateGlobalSettingsRequest" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: SensitiveString.pipe(T.HttpLabel("PhoneNumberId")),
          ProductType: S.optional(S.String),
          CallingName: S.optional(SensitiveString),
          Name: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-numbers/{PhoneNumberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePhoneNumberRequest" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CallingName: SensitiveString }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/settings/phone-number" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePhoneNumberSettingsRequest" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
          ProxySessionId: S.String.pipe(T.HttpLabel("ProxySessionId")),
          Capabilities: __S(152, __c19, 0),
          ExpiryMinutes: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProxySessionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
