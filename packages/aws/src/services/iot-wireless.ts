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
  sdkId: "IoT Wireless",
  target: "iotwireless",
  version: "2020-11-22",
  sigv4: "iotwireless",
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
                `https://api.iotwireless-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://api.iotwireless-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://api.iotwireless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://api.iotwireless.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type AmazonId = string;
export type AppServerPrivateKey = string | redacted.Redacted<string>;
export interface SidewalkAccountInfo {
  AmazonId?: string;
  AppServerPrivateKey?: string | redacted.Redacted<string>;
}
export type ClientRequestToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface AssociateAwsAccountWithPartnerAccountRequest {
  Sidewalk: SidewalkAccountInfo;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export type PartnerAccountArn = string;
export interface AssociateAwsAccountWithPartnerAccountResponse {
  Sidewalk?: SidewalkAccountInfo;
  Arn?: string;
}
export type FuotaTaskId = string;
export type MulticastGroupId = string;
export interface AssociateMulticastGroupWithFuotaTaskRequest {
  Id: string;
  MulticastGroupId: string;
}
export interface AssociateMulticastGroupWithFuotaTaskResponse {}
export type WirelessDeviceId = string;
export interface AssociateWirelessDeviceWithFuotaTaskRequest {
  Id: string;
  WirelessDeviceId: string;
}
export interface AssociateWirelessDeviceWithFuotaTaskResponse {}
export interface AssociateWirelessDeviceWithMulticastGroupRequest {
  Id: string;
  WirelessDeviceId: string;
}
export interface AssociateWirelessDeviceWithMulticastGroupResponse {}
export type ThingArn = string;
export interface AssociateWirelessDeviceWithThingRequest {
  Id: string;
  ThingArn: string;
}
export interface AssociateWirelessDeviceWithThingResponse {}
export type WirelessGatewayId = string;
export type IotCertificateId = string;
export interface AssociateWirelessGatewayWithCertificateRequest {
  Id: string;
  IotCertificateId: string;
}
export interface AssociateWirelessGatewayWithCertificateResponse {
  IotCertificateId?: string;
}
export interface AssociateWirelessGatewayWithThingRequest {
  Id: string;
  ThingArn: string;
}
export interface AssociateWirelessGatewayWithThingResponse {}
export interface CancelMulticastGroupSessionRequest {
  Id: string;
}
export interface CancelMulticastGroupSessionResponse {}
export type DestinationName = string;
export type ExpressionType = "RuleName" | "MqttTopic" | (string & {});
export type Expression = string;
export type Description = string;
export type RoleArn = string;
export interface CreateDestinationRequest {
  Name: string;
  ExpressionType: ExpressionType;
  Expression: string;
  Description?: string;
  RoleArn: string;
  Tags?: Tag[];
  ClientRequestToken?: string;
}
export type DestinationArn = string;
export interface CreateDestinationResponse {
  Arn?: string;
  Name?: string;
}
export type DeviceProfileName = string;
export type SupportsClassB = boolean;
export type ClassBTimeout = number;
export type PingSlotPeriod = number;
export type PingSlotDr = number;
export type PingSlotFreq = number;
export type SupportsClassC = boolean;
export type ClassCTimeout = number;
export type MacVersion = string;
export type RegParamsRevision = string;
export type RxDelay1 = number;
export type RxDrOffset1 = number;
export type RxDataRate2 = number;
export type RxFreq2 = number;
export type PresetFreq = number;
export type FactoryPresetFreqsList = number[];
export type MaxEirp = number;
export type MaxDutyCycle = number;
export type RfRegion = string;
export type SupportsJoin = boolean;
export type Supports32BitFCnt = boolean;
export interface LoRaWANDeviceProfile {
  SupportsClassB?: boolean;
  ClassBTimeout?: number;
  PingSlotPeriod?: number;
  PingSlotDr?: number;
  PingSlotFreq?: number;
  SupportsClassC?: boolean;
  ClassCTimeout?: number;
  MacVersion?: string;
  RegParamsRevision?: string;
  RxDelay1?: number;
  RxDrOffset1?: number;
  RxDataRate2?: number;
  RxFreq2?: number;
  FactoryPresetFreqsList?: number[];
  MaxEirp?: number;
  MaxDutyCycle?: number;
  RfRegion?: string;
  SupportsJoin?: boolean;
  Supports32BitFCnt?: boolean;
}
export interface SidewalkCreateDeviceProfile {}
export interface CreateDeviceProfileRequest {
  Name?: string;
  LoRaWAN?: LoRaWANDeviceProfile;
  Tags?: Tag[];
  ClientRequestToken?: string;
  Sidewalk?: SidewalkCreateDeviceProfile;
}
export type DeviceProfileArn = string;
export type DeviceProfileId = string;
export interface CreateDeviceProfileResponse {
  Arn?: string;
  Id?: string;
}
export type FuotaTaskName = string;
export type SupportedRfRegion =
  | "EU868"
  | "US915"
  | "AU915"
  | "AS923-1"
  | "AS923-2"
  | "AS923-3"
  | "AS923-4"
  | "EU433"
  | "CN470"
  | "CN779"
  | "RU864"
  | "KR920"
  | "IN865"
  | (string & {});
export interface LoRaWANFuotaTask {
  RfRegion?: SupportedRfRegion;
}
export type FirmwareUpdateImage = string;
export type FirmwareUpdateRole = string;
export type RedundancyPercent = number;
export type FragmentSizeBytes = number;
export type FragmentIntervalMS = number;
export type FileDescriptor = string;
export interface CreateFuotaTaskRequest {
  Name?: string;
  Description?: string;
  ClientRequestToken?: string;
  LoRaWAN?: LoRaWANFuotaTask;
  FirmwareUpdateImage: string;
  FirmwareUpdateRole: string;
  Tags?: Tag[];
  RedundancyPercent?: number;
  FragmentSizeBytes?: number;
  FragmentIntervalMS?: number;
  Descriptor?: string;
}
export type FuotaTaskArn = string;
export interface CreateFuotaTaskResponse {
  Arn?: string;
  Id?: string;
}
export type MulticastGroupName = string;
export type DlClass = "ClassB" | "ClassC" | (string & {});
export type GatewayListMulticast = string[];
export type TransmissionIntervalMulticast = number;
export interface ParticipatingGatewaysMulticast {
  GatewayList?: string[];
  TransmissionInterval?: number;
}
export type DlDr = number;
export type DlFreq = number;
export interface DefaultSessionParametersMulticast {
  DlDr?: number;
  DlFreq?: number;
}
export interface LoRaWANMulticast {
  RfRegion?: SupportedRfRegion;
  DlClass?: DlClass;
  ParticipatingGateways?: ParticipatingGatewaysMulticast;
  DefaultSessionParameters?: DefaultSessionParametersMulticast;
}
export interface CreateMulticastGroupRequest {
  Name?: string;
  Description?: string;
  ClientRequestToken?: string;
  LoRaWAN: LoRaWANMulticast;
  Tags?: Tag[];
}
export type MulticastGroupArn = string;
export interface CreateMulticastGroupResponse {
  Arn?: string;
  Id?: string;
}
export type NetworkAnalyzerConfigurationName = string;
export type WirelessDeviceFrameInfo = "ENABLED" | "DISABLED" | (string & {});
export type LogLevel = "INFO" | "ERROR" | "DISABLED" | (string & {});
export type MulticastFrameInfo = "ENABLED" | "DISABLED" | (string & {});
export interface TraceContent {
  WirelessDeviceFrameInfo?: WirelessDeviceFrameInfo;
  LogLevel?: LogLevel;
  MulticastFrameInfo?: MulticastFrameInfo;
}
export type WirelessDeviceList = string[];
export type WirelessGatewayList = string[];
export type NetworkAnalyzerMulticastGroupList = string[];
export interface CreateNetworkAnalyzerConfigurationRequest {
  Name: string;
  TraceContent?: TraceContent;
  WirelessDevices?: string[];
  WirelessGateways?: string[];
  Description?: string;
  Tags?: Tag[];
  ClientRequestToken?: string;
  MulticastGroups?: string[];
}
export type NetworkAnalyzerConfigurationArn = string;
export interface CreateNetworkAnalyzerConfigurationResponse {
  Arn?: string;
  Name?: string;
}
export type ServiceProfileName = string;
export type AddGwMetadata = boolean;
export type DrMinBox = number;
export type DrMaxBox = number;
export type PrAllowed = boolean;
export type RaAllowed = boolean;
export type TxPowerIndexMin = number;
export type TxPowerIndexMax = number;
export type NbTransMin = number;
export type NbTransMax = number;
export interface LoRaWANServiceProfile {
  AddGwMetadata?: boolean;
  DrMin?: number;
  DrMax?: number;
  PrAllowed?: boolean;
  RaAllowed?: boolean;
  TxPowerIndexMin?: number;
  TxPowerIndexMax?: number;
  NbTransMin?: number;
  NbTransMax?: number;
}
export interface CreateServiceProfileRequest {
  Name?: string;
  LoRaWAN?: LoRaWANServiceProfile;
  Tags?: Tag[];
  ClientRequestToken?: string;
}
export type ServiceProfileArn = string;
export type ServiceProfileId = string;
export interface CreateServiceProfileResponse {
  Arn?: string;
  Id?: string;
}
export type WirelessDeviceType = "Sidewalk" | "LoRaWAN" | (string & {});
export type WirelessDeviceName = string;
export type DevEui = string;
export type AppKey = string;
export type NwkKey = string;
export type JoinEui = string;
export interface OtaaV1_1 {
  AppKey?: string | redacted.Redacted<string>;
  NwkKey?: string | redacted.Redacted<string>;
  JoinEui?: string;
}
export type AppEui = string;
export type GenAppKey = string;
export interface OtaaV1_0_x {
  AppKey?: string | redacted.Redacted<string>;
  AppEui?: string;
  JoinEui?: string;
  GenAppKey?: string | redacted.Redacted<string>;
}
export type DevAddr = string;
export type FNwkSIntKey = string;
export type SNwkSIntKey = string;
export type NwkSEncKey = string;
export type AppSKey = string;
export interface SessionKeysAbpV1_1 {
  FNwkSIntKey?: string | redacted.Redacted<string>;
  SNwkSIntKey?: string | redacted.Redacted<string>;
  NwkSEncKey?: string | redacted.Redacted<string>;
  AppSKey?: string | redacted.Redacted<string>;
}
export type FCntStart = number;
export interface AbpV1_1 {
  DevAddr?: string;
  SessionKeys?: SessionKeysAbpV1_1;
  FCntStart?: number;
}
export type NwkSKey = string;
export interface SessionKeysAbpV1_0_x {
  NwkSKey?: string | redacted.Redacted<string>;
  AppSKey?: string | redacted.Redacted<string>;
}
export interface AbpV1_0_x {
  DevAddr?: string;
  SessionKeys?: SessionKeysAbpV1_0_x;
  FCntStart?: number;
}
export type FPort = number;
export interface Positioning {
  ClockSync?: number;
  Stream?: number;
  Gnss?: number;
}
export type ApplicationConfigType = "SemtechGeolocation" | (string & {});
export interface ApplicationConfig {
  FPort?: number;
  Type?: ApplicationConfigType;
  DestinationName?: string;
}
export type Applications = ApplicationConfig[];
export interface FPorts {
  Fuota?: number;
  Multicast?: number;
  ClockSync?: number;
  Positioning?: Positioning;
  Applications?: ApplicationConfig[];
}
export interface LoRaWANDevice {
  DevEui?: string;
  DeviceProfileId?: string;
  ServiceProfileId?: string;
  OtaaV1_1?: OtaaV1_1;
  OtaaV1_0_x?: OtaaV1_0_x;
  AbpV1_1?: AbpV1_1;
  AbpV1_0_x?: AbpV1_0_x;
  FPorts?: FPorts;
}
export type PositioningConfigStatus = "Enabled" | "Disabled" | (string & {});
export interface SidewalkPositioning {
  DestinationName?: string;
}
export type SidewalkManufacturingSn = string;
export interface SidewalkCreateWirelessDevice {
  DeviceProfileId?: string;
  Positioning?: SidewalkPositioning;
  SidewalkManufacturingSn?: string;
}
export interface CreateWirelessDeviceRequest {
  Type: WirelessDeviceType;
  Name?: string;
  Description?: string;
  DestinationName: string;
  ClientRequestToken?: string;
  LoRaWAN?: LoRaWANDevice;
  Tags?: Tag[];
  Positioning?: PositioningConfigStatus;
  Sidewalk?: SidewalkCreateWirelessDevice;
}
export type WirelessDeviceArn = string;
export interface CreateWirelessDeviceResponse {
  Arn?: string;
  Id?: string;
}
export type WirelessGatewayName = string;
export type GatewayEui = string;
export type JoinEuiRange = string[];
export type JoinEuiFilters = string[][];
export type NetId = string;
export type NetIdFilters = string[];
export type SubBand = number;
export type SubBands = number[];
export type BeaconingDataRate = number;
export type BeaconingFrequency = number;
export type BeaconingFrequencies = number[];
export interface Beaconing {
  DataRate?: number;
  Frequencies?: number[];
}
export type GatewayMaxEirp = number;
export interface LoRaWANGateway {
  GatewayEui?: string;
  RfRegion?: string;
  JoinEuiFilters?: string[][];
  NetIdFilters?: string[];
  SubBands?: number[];
  Beaconing?: Beaconing;
  MaxEirp?: number;
}
export interface CreateWirelessGatewayRequest {
  Name?: string;
  Description?: string;
  LoRaWAN: LoRaWANGateway;
  Tags?: Tag[];
  ClientRequestToken?: string;
}
export type WirelessGatewayArn = string;
export interface CreateWirelessGatewayResponse {
  Arn?: string;
  Id?: string;
}
export type WirelessGatewayTaskDefinitionId = string;
export interface CreateWirelessGatewayTaskRequest {
  Id: string;
  WirelessGatewayTaskDefinitionId: string;
}
export type WirelessGatewayTaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "FIRST_RETRY"
  | "SECOND_RETRY"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface CreateWirelessGatewayTaskResponse {
  WirelessGatewayTaskDefinitionId?: string;
  Status?: WirelessGatewayTaskStatus;
}
export type AutoCreateTasks = boolean;
export type WirelessGatewayTaskName = string;
export type UpdateDataSource = string;
export type UpdateSignature = string;
export type Crc = number;
export type PackageVersion = string;
export type Model = string;
export type Station = string;
export interface LoRaWANGatewayVersion {
  PackageVersion?: string;
  Model?: string;
  Station?: string;
}
export interface LoRaWANUpdateGatewayTaskCreate {
  UpdateSignature?: string;
  SigKeyCrc?: number;
  CurrentVersion?: LoRaWANGatewayVersion;
  UpdateVersion?: LoRaWANGatewayVersion;
}
export interface UpdateWirelessGatewayTaskCreate {
  UpdateDataSource?: string;
  UpdateDataRole?: string;
  LoRaWAN?: LoRaWANUpdateGatewayTaskCreate;
}
export interface CreateWirelessGatewayTaskDefinitionRequest {
  AutoCreateTasks: boolean;
  Name?: string;
  Update?: UpdateWirelessGatewayTaskCreate;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export type WirelessGatewayTaskDefinitionArn = string;
export interface CreateWirelessGatewayTaskDefinitionResponse {
  Id?: string;
  Arn?: string;
}
export interface DeleteDestinationRequest {
  Name: string;
}
export interface DeleteDestinationResponse {}
export interface DeleteDeviceProfileRequest {
  Id: string;
}
export interface DeleteDeviceProfileResponse {}
export interface DeleteFuotaTaskRequest {
  Id: string;
}
export interface DeleteFuotaTaskResponse {}
export interface DeleteMulticastGroupRequest {
  Id: string;
}
export interface DeleteMulticastGroupResponse {}
export interface DeleteNetworkAnalyzerConfigurationRequest {
  ConfigurationName: string;
}
export interface DeleteNetworkAnalyzerConfigurationResponse {}
export type MessageId = string;
export interface DeleteQueuedMessagesRequest {
  Id: string;
  MessageId: string;
  WirelessDeviceType?: WirelessDeviceType;
}
export interface DeleteQueuedMessagesResponse {}
export interface DeleteServiceProfileRequest {
  Id: string;
}
export interface DeleteServiceProfileResponse {}
export interface DeleteWirelessDeviceRequest {
  Id: string;
}
export interface DeleteWirelessDeviceResponse {}
export type ImportTaskId = string;
export interface DeleteWirelessDeviceImportTaskRequest {
  Id: string;
}
export interface DeleteWirelessDeviceImportTaskResponse {}
export interface DeleteWirelessGatewayRequest {
  Id: string;
}
export interface DeleteWirelessGatewayResponse {}
export interface DeleteWirelessGatewayTaskRequest {
  Id: string;
}
export interface DeleteWirelessGatewayTaskResponse {}
export interface DeleteWirelessGatewayTaskDefinitionRequest {
  Id: string;
}
export interface DeleteWirelessGatewayTaskDefinitionResponse {}
export type Identifier = string;
export interface DeregisterWirelessDeviceRequest {
  Identifier: string;
  WirelessDeviceType?: WirelessDeviceType;
}
export interface DeregisterWirelessDeviceResponse {}
export type PartnerAccountId = string;
export type PartnerType = "Sidewalk" | (string & {});
export interface DisassociateAwsAccountFromPartnerAccountRequest {
  PartnerAccountId: string;
  PartnerType: PartnerType;
}
export interface DisassociateAwsAccountFromPartnerAccountResponse {}
export interface DisassociateMulticastGroupFromFuotaTaskRequest {
  Id: string;
  MulticastGroupId: string;
}
export interface DisassociateMulticastGroupFromFuotaTaskResponse {}
export interface DisassociateWirelessDeviceFromFuotaTaskRequest {
  Id: string;
  WirelessDeviceId: string;
}
export interface DisassociateWirelessDeviceFromFuotaTaskResponse {}
export interface DisassociateWirelessDeviceFromMulticastGroupRequest {
  Id: string;
  WirelessDeviceId: string;
}
export interface DisassociateWirelessDeviceFromMulticastGroupResponse {}
export interface DisassociateWirelessDeviceFromThingRequest {
  Id: string;
}
export interface DisassociateWirelessDeviceFromThingResponse {}
export interface DisassociateWirelessGatewayFromCertificateRequest {
  Id: string;
}
export interface DisassociateWirelessGatewayFromCertificateResponse {}
export interface DisassociateWirelessGatewayFromThingRequest {
  Id: string;
}
export interface DisassociateWirelessGatewayFromThingResponse {}
export interface GetDestinationRequest {
  Name: string;
}
export interface GetDestinationResponse {
  Arn?: string;
  Name?: string;
  Expression?: string;
  ExpressionType?: ExpressionType;
  Description?: string;
  RoleArn?: string;
}
export interface GetDeviceProfileRequest {
  Id: string;
}
export type ApplicationServerPublicKey = string | redacted.Redacted<string>;
export type QualificationStatus = boolean;
export type DakCertificateId = string;
export type MaxAllowedSignature = number;
export type FactorySupport = boolean;
export type ApId = string;
export type DeviceTypeId = string;
export interface DakCertificateMetadata {
  CertificateId: string;
  MaxAllowedSignature?: number;
  FactorySupport?: boolean;
  ApId?: string;
  DeviceTypeId?: string;
}
export type DakCertificateMetadataList = DakCertificateMetadata[];
export interface SidewalkGetDeviceProfile {
  ApplicationServerPublicKey?: string | redacted.Redacted<string>;
  QualificationStatus?: boolean;
  DakCertificateMetadata?: DakCertificateMetadata[];
}
export interface GetDeviceProfileResponse {
  Arn?: string;
  Name?: string;
  Id?: string;
  LoRaWAN?: LoRaWANDeviceProfile;
  Sidewalk?: SidewalkGetDeviceProfile;
}
export interface GetEventConfigurationByResourceTypesRequest {}
export type EventNotificationTopicStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export interface SidewalkResourceTypeEventConfiguration {
  WirelessDeviceEventTopic?: EventNotificationTopicStatus;
}
export interface DeviceRegistrationStateResourceTypeEventConfiguration {
  Sidewalk?: SidewalkResourceTypeEventConfiguration;
}
export interface ProximityResourceTypeEventConfiguration {
  Sidewalk?: SidewalkResourceTypeEventConfiguration;
}
export interface LoRaWANJoinResourceTypeEventConfiguration {
  WirelessDeviceEventTopic?: EventNotificationTopicStatus;
}
export interface JoinResourceTypeEventConfiguration {
  LoRaWAN?: LoRaWANJoinResourceTypeEventConfiguration;
}
export interface LoRaWANConnectionStatusResourceTypeEventConfiguration {
  WirelessGatewayEventTopic?: EventNotificationTopicStatus;
}
export interface ConnectionStatusResourceTypeEventConfiguration {
  LoRaWAN?: LoRaWANConnectionStatusResourceTypeEventConfiguration;
}
export interface MessageDeliveryStatusResourceTypeEventConfiguration {
  Sidewalk?: SidewalkResourceTypeEventConfiguration;
}
export interface GetEventConfigurationByResourceTypesResponse {
  DeviceRegistrationState?: DeviceRegistrationStateResourceTypeEventConfiguration;
  Proximity?: ProximityResourceTypeEventConfiguration;
  Join?: JoinResourceTypeEventConfiguration;
  ConnectionStatus?: ConnectionStatusResourceTypeEventConfiguration;
  MessageDeliveryStatus?: MessageDeliveryStatusResourceTypeEventConfiguration;
}
export interface GetFuotaTaskRequest {
  Id: string;
}
export type FuotaTaskStatus =
  | "Pending"
  | "FuotaSession_Waiting"
  | "In_FuotaSession"
  | "FuotaDone"
  | "Delete_Waiting"
  | (string & {});
export type StartTime = Date;
export interface LoRaWANFuotaTaskGetInfo {
  RfRegion?: string;
  StartTime?: Date;
}
export type CreatedAt = Date;
export interface GetFuotaTaskResponse {
  Arn?: string;
  Id?: string;
  Status?: FuotaTaskStatus;
  Name?: string;
  Description?: string;
  LoRaWAN?: LoRaWANFuotaTaskGetInfo;
  FirmwareUpdateImage?: string;
  FirmwareUpdateRole?: string;
  CreatedAt?: Date;
  RedundancyPercent?: number;
  FragmentSizeBytes?: number;
  FragmentIntervalMS?: number;
  Descriptor?: string;
}
export interface GetLogLevelsByResourceTypesRequest {}
export type WirelessGatewayType = "LoRaWAN" | (string & {});
export type WirelessGatewayEvent =
  | "CUPS_Request"
  | "Certificate"
  | (string & {});
export interface WirelessGatewayEventLogOption {
  Event: WirelessGatewayEvent;
  LogLevel: LogLevel;
}
export type WirelessGatewayEventLogOptionList = WirelessGatewayEventLogOption[];
export interface WirelessGatewayLogOption {
  Type: WirelessGatewayType;
  LogLevel: LogLevel;
  Events?: WirelessGatewayEventLogOption[];
}
export type WirelessGatewayLogOptionList = WirelessGatewayLogOption[];
export type WirelessDeviceEvent =
  | "Join"
  | "Rejoin"
  | "Uplink_Data"
  | "Downlink_Data"
  | "Registration"
  | (string & {});
export interface WirelessDeviceEventLogOption {
  Event: WirelessDeviceEvent;
  LogLevel: LogLevel;
}
export type WirelessDeviceEventLogOptionList = WirelessDeviceEventLogOption[];
export interface WirelessDeviceLogOption {
  Type: WirelessDeviceType;
  LogLevel: LogLevel;
  Events?: WirelessDeviceEventLogOption[];
}
export type WirelessDeviceLogOptionList = WirelessDeviceLogOption[];
export type FuotaTaskType = "LoRaWAN" | (string & {});
export type FuotaTaskEvent = "Fuota" | (string & {});
export interface FuotaTaskEventLogOption {
  Event: FuotaTaskEvent;
  LogLevel: LogLevel;
}
export type FuotaTaskEventLogOptionList = FuotaTaskEventLogOption[];
export interface FuotaTaskLogOption {
  Type: FuotaTaskType;
  LogLevel: LogLevel;
  Events?: FuotaTaskEventLogOption[];
}
export type FuotaTaskLogOptionList = FuotaTaskLogOption[];
export interface GetLogLevelsByResourceTypesResponse {
  DefaultLogLevel?: LogLevel;
  WirelessGatewayLogOptions?: WirelessGatewayLogOption[];
  WirelessDeviceLogOptions?: WirelessDeviceLogOption[];
  FuotaTaskLogOptions?: FuotaTaskLogOption[];
}
export interface GetMetricConfigurationRequest {}
export type SummaryMetricConfigurationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export interface SummaryMetricConfiguration {
  Status?: SummaryMetricConfigurationStatus;
}
export interface GetMetricConfigurationResponse {
  SummaryMetric?: SummaryMetricConfiguration;
}
export type MetricQueryId = string;
export type MetricName =
  | "DeviceRSSI"
  | "DeviceSNR"
  | "DeviceRoamingRSSI"
  | "DeviceRoamingSNR"
  | "DeviceUplinkCount"
  | "DeviceDownlinkCount"
  | "DeviceUplinkLostCount"
  | "DeviceUplinkLostRate"
  | "DeviceJoinRequestCount"
  | "DeviceJoinAcceptCount"
  | "DeviceRoamingUplinkCount"
  | "DeviceRoamingDownlinkCount"
  | "GatewayUpTime"
  | "GatewayDownTime"
  | "GatewayRSSI"
  | "GatewaySNR"
  | "GatewayUplinkCount"
  | "GatewayDownlinkCount"
  | "GatewayJoinRequestCount"
  | "GatewayJoinAcceptCount"
  | "AwsAccountUplinkCount"
  | "AwsAccountDownlinkCount"
  | "AwsAccountUplinkLostCount"
  | "AwsAccountUplinkLostRate"
  | "AwsAccountJoinRequestCount"
  | "AwsAccountJoinAcceptCount"
  | "AwsAccountRoamingUplinkCount"
  | "AwsAccountRoamingDownlinkCount"
  | "AwsAccountDeviceCount"
  | "AwsAccountGatewayCount"
  | "AwsAccountActiveDeviceCount"
  | "AwsAccountActiveGatewayCount"
  | (string & {});
export type DimensionName = "DeviceId" | "GatewayId" | (string & {});
export type DimensionValue = string;
export interface Dimension {
  name?: DimensionName;
  value?: string;
}
export type Dimensions = Dimension[];
export type AggregationPeriod =
  | "OneHour"
  | "OneDay"
  | "OneWeek"
  | (string & {});
export type MetricQueryStartTimestamp = Date;
export type MetricQueryEndTimestamp = Date;
export interface SummaryMetricQuery {
  QueryId?: string;
  MetricName?: MetricName;
  Dimensions?: Dimension[];
  AggregationPeriod?: AggregationPeriod;
  StartTimestamp?: Date;
  EndTimestamp?: Date;
}
export type SummaryMetricQueries = SummaryMetricQuery[];
export interface GetMetricsRequest {
  SummaryMetricQueries?: SummaryMetricQuery[];
}
export type MetricQueryStatus = "Succeeded" | "Failed" | (string & {});
export type MetricQueryError = string;
export type MetricQueryTimestamp = Date;
export type MetricQueryTimestamps = Date[];
export type Min = number;
export type Max = number;
export type Sum = number;
export type Avg = number;
export type Std = number;
export type P90 = number;
export interface MetricQueryValue {
  Min?: number;
  Max?: number;
  Sum?: number;
  Avg?: number;
  Std?: number;
  P90?: number;
}
export type MetricQueryValues = MetricQueryValue[];
export type MetricUnit = string;
export interface SummaryMetricQueryResult {
  QueryId?: string;
  QueryStatus?: MetricQueryStatus;
  Error?: string;
  MetricName?: MetricName;
  Dimensions?: Dimension[];
  AggregationPeriod?: AggregationPeriod;
  StartTimestamp?: Date;
  EndTimestamp?: Date;
  Timestamps?: Date[];
  Values?: MetricQueryValue[];
  Unit?: string;
}
export type SummaryMetricQueryResults = SummaryMetricQueryResult[];
export interface GetMetricsResponse {
  SummaryMetricQueryResults?: SummaryMetricQueryResult[];
}
export interface GetMulticastGroupRequest {
  Id: string;
}
export type MulticastGroupStatus = string;
export type NumberOfDevicesRequested = number;
export type NumberOfDevicesInGroup = number;
export interface LoRaWANMulticastGet {
  RfRegion?: SupportedRfRegion;
  DlClass?: DlClass;
  NumberOfDevicesRequested?: number;
  NumberOfDevicesInGroup?: number;
  ParticipatingGateways?: ParticipatingGatewaysMulticast;
  DefaultSessionParameters?: DefaultSessionParametersMulticast;
}
export interface GetMulticastGroupResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  Status?: string;
  LoRaWAN?: LoRaWANMulticastGet;
  CreatedAt?: Date;
}
export interface GetMulticastGroupSessionRequest {
  Id: string;
}
export type SessionStartTimeTimestamp = Date;
export type SessionTimeout = number;
export interface LoRaWANMulticastSession {
  DlDr?: number;
  DlFreq?: number;
  SessionStartTime?: Date;
  SessionTimeout?: number;
  PingSlotPeriod?: number;
}
export interface GetMulticastGroupSessionResponse {
  LoRaWAN?: LoRaWANMulticastSession;
}
export interface GetNetworkAnalyzerConfigurationRequest {
  ConfigurationName: string;
}
export interface GetNetworkAnalyzerConfigurationResponse {
  TraceContent?: TraceContent;
  WirelessDevices?: string[];
  WirelessGateways?: string[];
  Description?: string;
  Arn?: string;
  Name?: string;
  MulticastGroups?: string[];
}
export interface GetPartnerAccountRequest {
  PartnerAccountId: string;
  PartnerType: PartnerType;
}
export type Fingerprint = string | redacted.Redacted<string>;
export interface SidewalkAccountInfoWithFingerprint {
  AmazonId?: string;
  Fingerprint?: string | redacted.Redacted<string>;
  Arn?: string;
}
export type AccountLinked = boolean;
export interface GetPartnerAccountResponse {
  Sidewalk?: SidewalkAccountInfoWithFingerprint;
  AccountLinked?: boolean;
}
export type PositionResourceIdentifier = string;
export type PositionResourceType =
  | "WirelessDevice"
  | "WirelessGateway"
  | (string & {});
export interface GetPositionRequest {
  ResourceIdentifier: string;
  ResourceType: PositionResourceType;
}
export type PositionCoordinateValue = number;
export type PositionCoordinate = number[];
export type HorizontalAccuracy = number;
export type VerticalAccuracy = number;
export interface Accuracy {
  HorizontalAccuracy?: number;
  VerticalAccuracy?: number;
}
export type PositionSolverType = "GNSS" | (string & {});
export type PositionSolverProvider = "Semtech" | (string & {});
export type PositionSolverVersion = string;
export type ISODateTimeString = string;
export interface GetPositionResponse {
  Position?: number[];
  Accuracy?: Accuracy;
  SolverType?: PositionSolverType;
  SolverProvider?: PositionSolverProvider;
  SolverVersion?: string;
  Timestamp?: string;
}
export interface GetPositionConfigurationRequest {
  ResourceIdentifier: string;
  ResourceType: PositionResourceType;
}
export type PositionConfigurationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export type PositionConfigurationFec = "ROSE" | "NONE" | (string & {});
export interface SemtechGnssDetail {
  Provider?: PositionSolverProvider;
  Type?: PositionSolverType;
  Status?: PositionConfigurationStatus;
  Fec?: PositionConfigurationFec;
}
export interface PositionSolverDetails {
  SemtechGnss?: SemtechGnssDetail;
}
export interface GetPositionConfigurationResponse {
  Solvers?: PositionSolverDetails;
  Destination?: string;
}
export type MacAddress = string;
export type RSS = number;
export interface WiFiAccessPoint {
  MacAddress: string;
  Rss: number;
}
export type WiFiAccessPoints = WiFiAccessPoint[];
export type MCC = number;
export type MNC = number;
export type LAC = number;
export type GeranCid = number;
export type BSIC = number;
export type BCCH = number;
export interface GsmLocalId {
  Bsic: number;
  Bcch: number;
}
export type GsmTimingAdvance = number;
export type RxLevel = number;
export interface GlobalIdentity {
  Lac: number;
  GeranCid: number;
}
export interface GsmNmrObj {
  Bsic: number;
  Bcch: number;
  RxLevel?: number;
  GlobalIdentity?: GlobalIdentity;
}
export type GsmNmrList = GsmNmrObj[];
export interface GsmObj {
  Mcc: number;
  Mnc: number;
  Lac: number;
  GeranCid: number;
  GsmLocalId?: GsmLocalId;
  GsmTimingAdvance?: number;
  RxLevel?: number;
  GsmNmr?: GsmNmrObj[];
}
export type GsmList = GsmObj[];
export type UtranCid = number;
export type UARFCNDL = number;
export type PSC = number;
export interface WcdmaLocalId {
  Uarfcndl: number;
  Psc: number;
}
export type RSCP = number;
export type PathLoss = number;
export interface WcdmaNmrObj {
  Uarfcndl: number;
  Psc: number;
  UtranCid: number;
  Rscp?: number;
  PathLoss?: number;
}
export type WcdmaNmrList = WcdmaNmrObj[];
export interface WcdmaObj {
  Mcc: number;
  Mnc: number;
  Lac?: number;
  UtranCid: number;
  WcdmaLocalId?: WcdmaLocalId;
  Rscp?: number;
  PathLoss?: number;
  WcdmaNmr?: WcdmaNmrObj[];
}
export type WcdmaList = WcdmaObj[];
export type UARFCN = number;
export type CellParams = number;
export interface TdscdmaLocalId {
  Uarfcn: number;
  CellParams: number;
}
export type TdscdmaTimingAdvance = number;
export interface TdscdmaNmrObj {
  Uarfcn: number;
  CellParams: number;
  UtranCid?: number;
  Rscp?: number;
  PathLoss?: number;
}
export type TdscdmaNmrList = TdscdmaNmrObj[];
export interface TdscdmaObj {
  Mcc: number;
  Mnc: number;
  Lac?: number;
  UtranCid: number;
  TdscdmaLocalId?: TdscdmaLocalId;
  TdscdmaTimingAdvance?: number;
  Rscp?: number;
  PathLoss?: number;
  TdscdmaNmr?: TdscdmaNmrObj[];
}
export type TdscdmaList = TdscdmaObj[];
export type EutranCid = number;
export type TAC = number;
export type PCI = number;
export type EARFCN = number;
export interface LteLocalId {
  Pci: number;
  Earfcn: number;
}
export type LteTimingAdvance = number;
export type RSRP = number;
export type RSRQ = number;
export type NRCapable = boolean;
export interface LteNmrObj {
  Pci: number;
  Earfcn: number;
  EutranCid?: number;
  Rsrp?: number;
  Rsrq?: number;
}
export type LteNmrList = LteNmrObj[];
export interface LteObj {
  Mcc: number;
  Mnc: number;
  EutranCid: number;
  Tac?: number;
  LteLocalId?: LteLocalId;
  LteTimingAdvance?: number;
  Rsrp?: number;
  Rsrq?: number;
  NrCapable?: boolean;
  LteNmr?: LteNmrObj[];
}
export type LteList = LteObj[];
export type SystemId = number;
export type NetworkId = number;
export type BaseStationId = number;
export type RegistrationZone = number;
export type PnOffset = number;
export type CdmaChannel = number;
export interface CdmaLocalId {
  PnOffset: number;
  CdmaChannel: number;
}
export type PilotPower = number;
export type BaseLat = number;
export type BaseLng = number;
export interface CdmaNmrObj {
  PnOffset: number;
  CdmaChannel: number;
  PilotPower?: number;
  BaseStationId?: number;
}
export type CdmaNmrList = CdmaNmrObj[];
export interface CdmaObj {
  SystemId: number;
  NetworkId: number;
  BaseStationId: number;
  RegistrationZone?: number;
  CdmaLocalId?: CdmaLocalId;
  PilotPower?: number;
  BaseLat?: number;
  BaseLng?: number;
  CdmaNmr?: CdmaNmrObj[];
}
export type CdmaList = CdmaObj[];
export interface CellTowers {
  Gsm?: GsmObj[];
  Wcdma?: WcdmaObj[];
  Tdscdma?: TdscdmaObj[];
  Lte?: LteObj[];
  Cdma?: CdmaObj[];
}
export type IPAddress = string;
export interface Ip {
  IpAddress: string;
}
export type GnssNav = string;
export type GPST = number;
export type CaptureTimeAccuracy = number;
export type Coordinate = number;
export type AssistPosition = number[];
export type Use2DSolver = boolean;
export interface Gnss {
  Payload: string;
  CaptureTime?: number;
  CaptureTimeAccuracy?: number;
  AssistPosition?: number[];
  AssistAltitude?: number;
  Use2DSolver?: boolean;
}
export type CreationDate = Date;
export type ConfidencePercent = number;
export interface WiFiCellular {
  ConfidencePercent?: number;
}
export interface AdvancedConfiguration {
  WiFiCellular?: WiFiCellular;
}
export interface GetPositionEstimateRequest {
  WiFiAccessPoints?: WiFiAccessPoint[];
  CellTowers?: CellTowers;
  Ip?: Ip;
  Gnss?: Gnss;
  Timestamp?: Date;
  AdvancedConfiguration?: AdvancedConfiguration;
}
export interface GetPositionEstimateResponse {
  GeoJsonPayload?: T.StreamingOutputBody;
}
export type IdentifierType =
  | "PartnerAccountId"
  | "DevEui"
  | "GatewayEui"
  | "WirelessDeviceId"
  | "WirelessGatewayId"
  | (string & {});
export type EventNotificationPartnerType = "Sidewalk" | (string & {});
export interface GetResourceEventConfigurationRequest {
  Identifier: string;
  IdentifierType: IdentifierType;
  PartnerType?: EventNotificationPartnerType;
}
export interface SidewalkEventNotificationConfigurations {
  AmazonIdEventTopic?: EventNotificationTopicStatus;
}
export interface DeviceRegistrationStateEventConfiguration {
  Sidewalk?: SidewalkEventNotificationConfigurations;
  WirelessDeviceIdEventTopic?: EventNotificationTopicStatus;
}
export interface ProximityEventConfiguration {
  Sidewalk?: SidewalkEventNotificationConfigurations;
  WirelessDeviceIdEventTopic?: EventNotificationTopicStatus;
}
export interface LoRaWANJoinEventNotificationConfigurations {
  DevEuiEventTopic?: EventNotificationTopicStatus;
}
export interface JoinEventConfiguration {
  LoRaWAN?: LoRaWANJoinEventNotificationConfigurations;
  WirelessDeviceIdEventTopic?: EventNotificationTopicStatus;
}
export interface LoRaWANConnectionStatusEventNotificationConfigurations {
  GatewayEuiEventTopic?: EventNotificationTopicStatus;
}
export interface ConnectionStatusEventConfiguration {
  LoRaWAN?: LoRaWANConnectionStatusEventNotificationConfigurations;
  WirelessGatewayIdEventTopic?: EventNotificationTopicStatus;
}
export interface MessageDeliveryStatusEventConfiguration {
  Sidewalk?: SidewalkEventNotificationConfigurations;
  WirelessDeviceIdEventTopic?: EventNotificationTopicStatus;
}
export interface GetResourceEventConfigurationResponse {
  DeviceRegistrationState?: DeviceRegistrationStateEventConfiguration;
  Proximity?: ProximityEventConfiguration;
  Join?: JoinEventConfiguration;
  ConnectionStatus?: ConnectionStatusEventConfiguration;
  MessageDeliveryStatus?: MessageDeliveryStatusEventConfiguration;
}
export type ResourceIdentifier = string;
export type ResourceType = string;
export interface GetResourceLogLevelRequest {
  ResourceIdentifier: string;
  ResourceType: string;
}
export interface GetResourceLogLevelResponse {
  LogLevel?: LogLevel;
}
export interface GetResourcePositionRequest {
  ResourceIdentifier: string;
  ResourceType: PositionResourceType;
}
export interface GetResourcePositionResponse {
  GeoJsonPayload?: T.StreamingOutputBody;
}
export type WirelessGatewayServiceType = "CUPS" | "LNS" | (string & {});
export interface GetServiceEndpointRequest {
  ServiceType?: WirelessGatewayServiceType;
}
export type EndPoint = string;
export type CertificatePEM = string;
export interface GetServiceEndpointResponse {
  ServiceType?: WirelessGatewayServiceType;
  ServiceEndpoint?: string;
  ServerTrust?: string;
}
export interface GetServiceProfileRequest {
  Id: string;
}
export type UlRate = number;
export type UlBucketSize = number;
export type UlRatePolicy = string;
export type DlRate = number;
export type DlBucketSize = number;
export type DlRatePolicy = string;
export type DevStatusReqFreq = number;
export type ReportDevStatusBattery = boolean;
export type ReportDevStatusMargin = boolean;
export type DrMin = number;
export type DrMax = number;
export type ChannelMask = string;
export type HrAllowed = boolean;
export type NwkGeoLoc = boolean;
export type TargetPer = number;
export type MinGwDiversity = number;
export interface LoRaWANGetServiceProfileInfo {
  UlRate?: number;
  UlBucketSize?: number;
  UlRatePolicy?: string;
  DlRate?: number;
  DlBucketSize?: number;
  DlRatePolicy?: string;
  AddGwMetadata?: boolean;
  DevStatusReqFreq?: number;
  ReportDevStatusBattery?: boolean;
  ReportDevStatusMargin?: boolean;
  DrMin?: number;
  DrMax?: number;
  ChannelMask?: string;
  PrAllowed?: boolean;
  HrAllowed?: boolean;
  RaAllowed?: boolean;
  NwkGeoLoc?: boolean;
  TargetPer?: number;
  MinGwDiversity?: number;
  TxPowerIndexMin?: number;
  TxPowerIndexMax?: number;
  NbTransMin?: number;
  NbTransMax?: number;
}
export interface GetServiceProfileResponse {
  Arn?: string;
  Name?: string;
  Id?: string;
  LoRaWAN?: LoRaWANGetServiceProfileInfo;
}
export type WirelessDeviceIdType =
  | "WirelessDeviceId"
  | "DevEui"
  | "ThingName"
  | "SidewalkManufacturingSn"
  | (string & {});
export interface GetWirelessDeviceRequest {
  Identifier: string;
  IdentifierType: WirelessDeviceIdType;
}
export type ThingName = string;
export type SidewalkId = string;
export type SigningAlg = "Ed25519" | "P256r1" | (string & {});
export type CertificateValue = string;
export interface CertificateList {
  SigningAlg: SigningAlg;
  Value: string;
}
export type DeviceCertificateList = CertificateList[];
export type PrivateKeysList = CertificateList[];
export type WirelessDeviceSidewalkStatus =
  | "PROVISIONED"
  | "REGISTERED"
  | "ACTIVATED"
  | "UNKNOWN"
  | (string & {});
export interface SidewalkDevice {
  AmazonId?: string;
  SidewalkId?: string;
  SidewalkManufacturingSn?: string;
  DeviceCertificates?: CertificateList[];
  PrivateKeys?: CertificateList[];
  DeviceProfileId?: string;
  CertificateId?: string;
  Status?: WirelessDeviceSidewalkStatus;
  Positioning?: SidewalkPositioning;
}
export interface GetWirelessDeviceResponse {
  Type?: WirelessDeviceType;
  Name?: string;
  Description?: string;
  DestinationName?: string;
  Id?: string;
  Arn?: string;
  ThingName?: string;
  ThingArn?: string;
  LoRaWAN?: LoRaWANDevice;
  Sidewalk?: SidewalkDevice;
  Positioning?: PositioningConfigStatus;
}
export interface GetWirelessDeviceImportTaskRequest {
  Id: string;
}
export type ImportTaskArn = string;
export type DeviceCreationFile = string;
export type DeviceCreationFileList = string[];
export type Role = string;
export interface SidewalkGetStartImportInfo {
  DeviceCreationFileList?: string[];
  Role?: string;
  Positioning?: SidewalkPositioning;
}
export type CreationTime = Date;
export type ImportTaskStatus =
  | "INITIALIZING"
  | "INITIALIZED"
  | "PENDING"
  | "COMPLETE"
  | "FAILED"
  | "DELETING"
  | (string & {});
export type StatusReason = string;
export type ImportedWirelessDeviceCount = number;
export interface GetWirelessDeviceImportTaskResponse {
  Id?: string;
  Arn?: string;
  DestinationName?: string;
  Positioning?: PositioningConfigStatus;
  Sidewalk?: SidewalkGetStartImportInfo;
  CreationTime?: Date;
  Status?: ImportTaskStatus;
  StatusReason?: string;
  InitializedImportedDeviceCount?: number;
  PendingImportedDeviceCount?: number;
  OnboardedImportedDeviceCount?: number;
  FailedImportedDeviceCount?: number;
}
export interface GetWirelessDeviceStatisticsRequest {
  WirelessDeviceId: string;
}
export interface LoRaWANGatewayMetadata {
  GatewayEui?: string;
  Snr?: number;
  Rssi?: number;
}
export type LoRaWANGatewayMetadataList = LoRaWANGatewayMetadata[];
export type ProviderNetId = string;
export type Id = string;
export type DlAllowed = boolean;
export interface LoRaWANPublicGatewayMetadata {
  ProviderNetId?: string;
  Id?: string;
  Rssi?: number;
  Snr?: number;
  RfRegion?: string;
  DlAllowed?: boolean;
}
export type LoRaWANPublicGatewayMetadataList = LoRaWANPublicGatewayMetadata[];
export interface LoRaWANDeviceMetadata {
  DevEui?: string;
  FPort?: number;
  DataRate?: number;
  Frequency?: number;
  Timestamp?: string;
  Gateways?: LoRaWANGatewayMetadata[];
  PublicGateways?: LoRaWANPublicGatewayMetadata[];
}
export type BatteryLevel = "normal" | "low" | "critical" | (string & {});
export type Event =
  | "discovered"
  | "lost"
  | "ack"
  | "nack"
  | "passthrough"
  | (string & {});
export type DeviceState =
  | "Provisioned"
  | "RegisteredNotSeen"
  | "RegisteredReachable"
  | "RegisteredUnreachable"
  | (string & {});
export interface SidewalkDeviceMetadata {
  Rssi?: number;
  BatteryLevel?: BatteryLevel;
  Event?: Event;
  DeviceState?: DeviceState;
}
export interface GetWirelessDeviceStatisticsResponse {
  WirelessDeviceId?: string;
  LastUplinkReceivedAt?: string;
  LoRaWAN?: LoRaWANDeviceMetadata;
  Sidewalk?: SidewalkDeviceMetadata;
}
export type WirelessGatewayIdType =
  | "GatewayEui"
  | "WirelessGatewayId"
  | "ThingName"
  | (string & {});
export interface GetWirelessGatewayRequest {
  Identifier: string;
  IdentifierType: WirelessGatewayIdType;
}
export interface GetWirelessGatewayResponse {
  Name?: string;
  Id?: string;
  Description?: string;
  LoRaWAN?: LoRaWANGateway;
  Arn?: string;
  ThingName?: string;
  ThingArn?: string;
}
export interface GetWirelessGatewayCertificateRequest {
  Id: string;
}
export interface GetWirelessGatewayCertificateResponse {
  IotCertificateId?: string;
  LoRaWANNetworkServerCertificateId?: string;
}
export interface GetWirelessGatewayFirmwareInformationRequest {
  Id: string;
}
export interface LoRaWANGatewayCurrentVersion {
  CurrentVersion?: LoRaWANGatewayVersion;
}
export interface GetWirelessGatewayFirmwareInformationResponse {
  LoRaWAN?: LoRaWANGatewayCurrentVersion;
}
export interface GetWirelessGatewayStatisticsRequest {
  WirelessGatewayId: string;
}
export type ConnectionStatus = "Connected" | "Disconnected" | (string & {});
export interface GetWirelessGatewayStatisticsResponse {
  WirelessGatewayId?: string;
  LastUplinkReceivedAt?: string;
  ConnectionStatus?: ConnectionStatus;
}
export interface GetWirelessGatewayTaskRequest {
  Id: string;
}
export interface GetWirelessGatewayTaskResponse {
  WirelessGatewayId?: string;
  WirelessGatewayTaskDefinitionId?: string;
  LastUplinkReceivedAt?: string;
  TaskCreatedAt?: string;
  Status?: WirelessGatewayTaskStatus;
}
export interface GetWirelessGatewayTaskDefinitionRequest {
  Id: string;
}
export interface GetWirelessGatewayTaskDefinitionResponse {
  AutoCreateTasks?: boolean;
  Name?: string;
  Update?: UpdateWirelessGatewayTaskCreate;
  Arn?: string;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListDestinationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Destinations {
  Arn?: string;
  Name?: string;
  ExpressionType?: ExpressionType;
  Expression?: string;
  Description?: string;
  RoleArn?: string;
}
export type DestinationList = Destinations[];
export interface ListDestinationsResponse {
  NextToken?: string;
  DestinationList?: Destinations[];
}
export type DeviceProfileType = "Sidewalk" | "LoRaWAN" | (string & {});
export interface ListDeviceProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
  DeviceProfileType?: DeviceProfileType;
}
export interface DeviceProfile {
  Arn?: string;
  Name?: string;
  Id?: string;
}
export type DeviceProfileList = DeviceProfile[];
export interface ListDeviceProfilesResponse {
  NextToken?: string;
  DeviceProfileList?: DeviceProfile[];
}
export type OnboardStatus =
  | "INITIALIZED"
  | "PENDING"
  | "ONBOARDED"
  | "FAILED"
  | (string & {});
export interface ListDevicesForWirelessDeviceImportTaskRequest {
  Id: string;
  MaxResults?: number;
  NextToken?: string;
  Status?: OnboardStatus;
}
export interface SidewalkListDevicesForImportInfo {
  Positioning?: SidewalkPositioning;
}
export type OnboardStatusReason = string;
export type LastUpdateTime = Date;
export interface ImportedSidewalkDevice {
  SidewalkManufacturingSn?: string;
  OnboardingStatus?: OnboardStatus;
  OnboardingStatusReason?: string;
  LastUpdateTime?: Date;
}
export interface ImportedWirelessDevice {
  Sidewalk?: ImportedSidewalkDevice;
}
export type ImportedWirelessDeviceList = ImportedWirelessDevice[];
export interface ListDevicesForWirelessDeviceImportTaskResponse {
  NextToken?: string;
  DestinationName?: string;
  Positioning?: PositioningConfigStatus;
  Sidewalk?: SidewalkListDevicesForImportInfo;
  ImportedWirelessDeviceList?: ImportedWirelessDevice[];
}
export type EventNotificationResourceType =
  | "SidewalkAccount"
  | "WirelessDevice"
  | "WirelessGateway"
  | (string & {});
export interface ListEventConfigurationsRequest {
  ResourceType: EventNotificationResourceType;
  MaxResults?: number;
  NextToken?: string;
}
export interface EventNotificationItemConfigurations {
  DeviceRegistrationState?: DeviceRegistrationStateEventConfiguration;
  Proximity?: ProximityEventConfiguration;
  Join?: JoinEventConfiguration;
  ConnectionStatus?: ConnectionStatusEventConfiguration;
  MessageDeliveryStatus?: MessageDeliveryStatusEventConfiguration;
}
export interface EventConfigurationItem {
  Identifier?: string;
  IdentifierType?: IdentifierType;
  PartnerType?: EventNotificationPartnerType;
  Events?: EventNotificationItemConfigurations;
}
export type EventConfigurationsList = EventConfigurationItem[];
export interface ListEventConfigurationsResponse {
  NextToken?: string;
  EventConfigurationsList?: EventConfigurationItem[];
}
export interface ListFuotaTasksRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface FuotaTask {
  Id?: string;
  Arn?: string;
  Name?: string;
}
export type FuotaTaskList = FuotaTask[];
export interface ListFuotaTasksResponse {
  NextToken?: string;
  FuotaTaskList?: FuotaTask[];
}
export interface ListMulticastGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface MulticastGroup {
  Id?: string;
  Arn?: string;
  Name?: string;
}
export type MulticastGroupList = MulticastGroup[];
export interface ListMulticastGroupsResponse {
  NextToken?: string;
  MulticastGroupList?: MulticastGroup[];
}
export interface ListMulticastGroupsByFuotaTaskRequest {
  Id: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface MulticastGroupByFuotaTask {
  Id?: string;
}
export type MulticastGroupListByFuotaTask = MulticastGroupByFuotaTask[];
export interface ListMulticastGroupsByFuotaTaskResponse {
  NextToken?: string;
  MulticastGroupList?: MulticastGroupByFuotaTask[];
}
export interface ListNetworkAnalyzerConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface NetworkAnalyzerConfigurations {
  Arn?: string;
  Name?: string;
}
export type NetworkAnalyzerConfigurationList = NetworkAnalyzerConfigurations[];
export interface ListNetworkAnalyzerConfigurationsResponse {
  NextToken?: string;
  NetworkAnalyzerConfigurationList?: NetworkAnalyzerConfigurations[];
}
export interface ListPartnerAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type SidewalkAccountList = SidewalkAccountInfoWithFingerprint[];
export interface ListPartnerAccountsResponse {
  NextToken?: string;
  Sidewalk?: SidewalkAccountInfoWithFingerprint[];
}
export interface ListPositionConfigurationsRequest {
  ResourceType?: PositionResourceType;
  MaxResults?: number;
  NextToken?: string;
}
export interface PositionConfigurationItem {
  ResourceIdentifier?: string;
  ResourceType?: PositionResourceType;
  Solvers?: PositionSolverDetails;
  Destination?: string;
}
export type PositionConfigurationList = PositionConfigurationItem[];
export interface ListPositionConfigurationsResponse {
  PositionConfigurationList?: PositionConfigurationItem[];
  NextToken?: string;
}
export interface ListQueuedMessagesRequest {
  Id: string;
  NextToken?: string;
  MaxResults?: number;
  WirelessDeviceType?: WirelessDeviceType;
}
export type TransmitMode = number;
export type DownlinkMode =
  | "SEQUENTIAL"
  | "CONCURRENT"
  | "USING_UPLINK_GATEWAY"
  | (string & {});
export type DownlinkFrequency = number;
export interface GatewayListItem {
  GatewayId: string;
  DownlinkFrequency: number;
}
export type GatewayList = GatewayListItem[];
export type TransmissionInterval = number;
export interface ParticipatingGateways {
  DownlinkMode: DownlinkMode;
  GatewayList: GatewayListItem[];
  TransmissionInterval: number;
}
export interface LoRaWANSendDataToDevice {
  FPort?: number;
  ParticipatingGateways?: ParticipatingGateways;
}
export interface DownlinkQueueMessage {
  MessageId?: string;
  TransmitMode?: number;
  ReceivedAt?: string;
  LoRaWAN?: LoRaWANSendDataToDevice;
}
export type DownlinkQueueMessagesList = DownlinkQueueMessage[];
export interface ListQueuedMessagesResponse {
  NextToken?: string;
  DownlinkQueueMessagesList?: DownlinkQueueMessage[];
}
export interface ListServiceProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ServiceProfile {
  Arn?: string;
  Name?: string;
  Id?: string;
}
export type ServiceProfileList = ServiceProfile[];
export interface ListServiceProfilesResponse {
  NextToken?: string;
  ServiceProfileList?: ServiceProfile[];
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListWirelessDeviceImportTasksRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface WirelessDeviceImportTask {
  Id?: string;
  Arn?: string;
  DestinationName?: string;
  Positioning?: PositioningConfigStatus;
  Sidewalk?: SidewalkGetStartImportInfo;
  CreationTime?: Date;
  Status?: ImportTaskStatus;
  StatusReason?: string;
  InitializedImportedDeviceCount?: number;
  PendingImportedDeviceCount?: number;
  OnboardedImportedDeviceCount?: number;
  FailedImportedDeviceCount?: number;
}
export type WirelessDeviceImportTaskList = WirelessDeviceImportTask[];
export interface ListWirelessDeviceImportTasksResponse {
  NextToken?: string;
  WirelessDeviceImportTaskList?: WirelessDeviceImportTask[];
}
export interface ListWirelessDevicesRequest {
  MaxResults?: number;
  NextToken?: string;
  DestinationName?: string;
  DeviceProfileId?: string;
  ServiceProfileId?: string;
  WirelessDeviceType?: WirelessDeviceType;
  FuotaTaskId?: string;
  MulticastGroupId?: string;
}
export interface LoRaWANListDevice {
  DevEui?: string;
}
export interface SidewalkListDevice {
  AmazonId?: string;
  SidewalkId?: string;
  SidewalkManufacturingSn?: string;
  DeviceCertificates?: CertificateList[];
  DeviceProfileId?: string;
  Status?: WirelessDeviceSidewalkStatus;
  Positioning?: SidewalkPositioning;
}
export type FuotaDeviceStatus =
  | "Initial"
  | "Package_Not_Supported"
  | "FragAlgo_unsupported"
  | "Not_enough_memory"
  | "FragIndex_unsupported"
  | "Wrong_descriptor"
  | "SessionCnt_replay"
  | "MissingFrag"
  | "MemoryError"
  | "MICError"
  | "Successful"
  | "Device_exist_in_conflict_fuota_task"
  | (string & {});
export type MulticastDeviceStatus = string;
export type McGroupId = number;
export interface WirelessDeviceStatistics {
  Arn?: string;
  Id?: string;
  Type?: WirelessDeviceType;
  Name?: string;
  DestinationName?: string;
  LastUplinkReceivedAt?: string;
  LoRaWAN?: LoRaWANListDevice;
  Sidewalk?: SidewalkListDevice;
  FuotaDeviceStatus?: FuotaDeviceStatus;
  MulticastDeviceStatus?: string;
  McGroupId?: number;
  Positioning?: PositioningConfigStatus;
}
export type WirelessDeviceStatisticsList = WirelessDeviceStatistics[];
export interface ListWirelessDevicesResponse {
  NextToken?: string;
  WirelessDeviceList?: WirelessDeviceStatistics[];
}
export interface ListWirelessGatewaysRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface WirelessGatewayStatistics {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  LoRaWAN?: LoRaWANGateway;
  LastUplinkReceivedAt?: string;
}
export type WirelessGatewayStatisticsList = WirelessGatewayStatistics[];
export interface ListWirelessGatewaysResponse {
  NextToken?: string;
  WirelessGatewayList?: WirelessGatewayStatistics[];
}
export type WirelessGatewayTaskDefinitionType = "UPDATE" | (string & {});
export interface ListWirelessGatewayTaskDefinitionsRequest {
  MaxResults?: number;
  NextToken?: string;
  TaskDefinitionType?: WirelessGatewayTaskDefinitionType;
}
export interface LoRaWANUpdateGatewayTaskEntry {
  CurrentVersion?: LoRaWANGatewayVersion;
  UpdateVersion?: LoRaWANGatewayVersion;
}
export interface UpdateWirelessGatewayTaskEntry {
  Id?: string;
  LoRaWAN?: LoRaWANUpdateGatewayTaskEntry;
  Arn?: string;
}
export type WirelessGatewayTaskDefinitionList =
  UpdateWirelessGatewayTaskEntry[];
export interface ListWirelessGatewayTaskDefinitionsResponse {
  NextToken?: string;
  TaskDefinitions?: UpdateWirelessGatewayTaskEntry[];
}
export interface SemtechGnssConfiguration {
  Status: PositionConfigurationStatus;
  Fec: PositionConfigurationFec;
}
export interface PositionSolverConfigurations {
  SemtechGnss?: SemtechGnssConfiguration;
}
export interface PutPositionConfigurationRequest {
  ResourceIdentifier: string;
  ResourceType: PositionResourceType;
  Solvers?: PositionSolverConfigurations;
  Destination?: string;
}
export interface PutPositionConfigurationResponse {}
export interface PutResourceLogLevelRequest {
  ResourceIdentifier: string;
  ResourceType: string;
  LogLevel: LogLevel;
}
export interface PutResourceLogLevelResponse {}
export interface ResetAllResourceLogLevelsRequest {}
export interface ResetAllResourceLogLevelsResponse {}
export interface ResetResourceLogLevelRequest {
  ResourceIdentifier: string;
  ResourceType: string;
}
export interface ResetResourceLogLevelResponse {}
export type PayloadData = string;
export interface LoRaWANMulticastMetadata {
  FPort?: number;
}
export interface MulticastWirelessMetadata {
  LoRaWAN?: LoRaWANMulticastMetadata;
}
export interface SendDataToMulticastGroupRequest {
  Id: string;
  PayloadData: string;
  WirelessMetadata: MulticastWirelessMetadata;
}
export type MulticastGroupMessageId = string;
export interface SendDataToMulticastGroupResponse {
  MessageId?: string;
}
export type Seq = number;
export type MessageType =
  | "CUSTOM_COMMAND_ID_NOTIFY"
  | "CUSTOM_COMMAND_ID_GET"
  | "CUSTOM_COMMAND_ID_SET"
  | "CUSTOM_COMMAND_ID_RESP"
  | (string & {});
export type AckModeRetryDurationSecs = number;
export interface SidewalkSendDataToDevice {
  Seq?: number;
  MessageType?: MessageType;
  AckModeRetryDurationSecs?: number;
}
export interface WirelessMetadata {
  LoRaWAN?: LoRaWANSendDataToDevice;
  Sidewalk?: SidewalkSendDataToDevice;
}
export interface SendDataToWirelessDeviceRequest {
  Id: string;
  TransmitMode: number;
  PayloadData: string;
  WirelessMetadata?: WirelessMetadata;
}
export interface SendDataToWirelessDeviceResponse {
  MessageId?: string;
}
export type QueryString = string;
export interface StartBulkAssociateWirelessDeviceWithMulticastGroupRequest {
  Id: string;
  QueryString?: string;
  Tags?: Tag[];
}
export interface StartBulkAssociateWirelessDeviceWithMulticastGroupResponse {}
export interface StartBulkDisassociateWirelessDeviceFromMulticastGroupRequest {
  Id: string;
  QueryString?: string;
  Tags?: Tag[];
}
export interface StartBulkDisassociateWirelessDeviceFromMulticastGroupResponse {}
export interface LoRaWANStartFuotaTask {
  StartTime?: Date;
}
export interface StartFuotaTaskRequest {
  Id: string;
  LoRaWAN?: LoRaWANStartFuotaTask;
}
export interface StartFuotaTaskResponse {}
export interface StartMulticastGroupSessionRequest {
  Id: string;
  LoRaWAN: LoRaWANMulticastSession;
}
export interface StartMulticastGroupSessionResponse {}
export type DeviceName = string;
export interface SidewalkSingleStartImportInfo {
  SidewalkManufacturingSn?: string;
  Positioning?: SidewalkPositioning;
}
export interface StartSingleWirelessDeviceImportTaskRequest {
  DestinationName: string;
  ClientRequestToken?: string;
  DeviceName?: string;
  Tags?: Tag[];
  Positioning?: PositioningConfigStatus;
  Sidewalk: SidewalkSingleStartImportInfo;
}
export interface StartSingleWirelessDeviceImportTaskResponse {
  Id?: string;
  Arn?: string;
}
export interface SidewalkStartImportInfo {
  DeviceCreationFile?: string;
  Role?: string;
  Positioning?: SidewalkPositioning;
}
export interface StartWirelessDeviceImportTaskRequest {
  DestinationName: string;
  ClientRequestToken?: string;
  Tags?: Tag[];
  Positioning?: PositioningConfigStatus;
  Sidewalk: SidewalkStartImportInfo;
}
export interface StartWirelessDeviceImportTaskResponse {
  Id?: string;
  Arn?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface TestWirelessDeviceRequest {
  Id: string;
}
export type Result = string;
export interface TestWirelessDeviceResponse {
  Result?: string;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDestinationRequest {
  Name: string;
  ExpressionType?: ExpressionType;
  Expression?: string;
  Description?: string;
  RoleArn?: string;
}
export interface UpdateDestinationResponse {}
export interface UpdateEventConfigurationByResourceTypesRequest {
  DeviceRegistrationState?: DeviceRegistrationStateResourceTypeEventConfiguration;
  Proximity?: ProximityResourceTypeEventConfiguration;
  Join?: JoinResourceTypeEventConfiguration;
  ConnectionStatus?: ConnectionStatusResourceTypeEventConfiguration;
  MessageDeliveryStatus?: MessageDeliveryStatusResourceTypeEventConfiguration;
}
export interface UpdateEventConfigurationByResourceTypesResponse {}
export interface UpdateFuotaTaskRequest {
  Id: string;
  Name?: string;
  Description?: string;
  LoRaWAN?: LoRaWANFuotaTask;
  FirmwareUpdateImage?: string;
  FirmwareUpdateRole?: string;
  RedundancyPercent?: number;
  FragmentSizeBytes?: number;
  FragmentIntervalMS?: number;
  Descriptor?: string;
}
export interface UpdateFuotaTaskResponse {}
export interface UpdateLogLevelsByResourceTypesRequest {
  DefaultLogLevel?: LogLevel;
  FuotaTaskLogOptions?: FuotaTaskLogOption[];
  WirelessDeviceLogOptions?: WirelessDeviceLogOption[];
  WirelessGatewayLogOptions?: WirelessGatewayLogOption[];
}
export interface UpdateLogLevelsByResourceTypesResponse {}
export interface UpdateMetricConfigurationRequest {
  SummaryMetric?: SummaryMetricConfiguration;
}
export interface UpdateMetricConfigurationResponse {}
export interface UpdateMulticastGroupRequest {
  Id: string;
  Name?: string;
  Description?: string;
  LoRaWAN?: LoRaWANMulticast;
}
export interface UpdateMulticastGroupResponse {}
export interface UpdateNetworkAnalyzerConfigurationRequest {
  ConfigurationName: string;
  TraceContent?: TraceContent;
  WirelessDevicesToAdd?: string[];
  WirelessDevicesToRemove?: string[];
  WirelessGatewaysToAdd?: string[];
  WirelessGatewaysToRemove?: string[];
  Description?: string;
  MulticastGroupsToAdd?: string[];
  MulticastGroupsToRemove?: string[];
}
export interface UpdateNetworkAnalyzerConfigurationResponse {}
export interface SidewalkUpdateAccount {
  AppServerPrivateKey?: string | redacted.Redacted<string>;
}
export interface UpdatePartnerAccountRequest {
  Sidewalk: SidewalkUpdateAccount;
  PartnerAccountId: string;
  PartnerType: PartnerType;
}
export interface UpdatePartnerAccountResponse {}
export interface UpdatePositionRequest {
  ResourceIdentifier: string;
  ResourceType: PositionResourceType;
  Position: number[];
}
export interface UpdatePositionResponse {}
export interface UpdateResourceEventConfigurationRequest {
  Identifier: string;
  IdentifierType: IdentifierType;
  PartnerType?: EventNotificationPartnerType;
  DeviceRegistrationState?: DeviceRegistrationStateEventConfiguration;
  Proximity?: ProximityEventConfiguration;
  Join?: JoinEventConfiguration;
  ConnectionStatus?: ConnectionStatusEventConfiguration;
  MessageDeliveryStatus?: MessageDeliveryStatusEventConfiguration;
}
export interface UpdateResourceEventConfigurationResponse {}
export interface UpdateResourcePositionRequest {
  ResourceIdentifier: string;
  ResourceType: PositionResourceType;
  GeoJsonPayload?: T.StreamingInputBody;
}
export interface UpdateResourcePositionResponse {}
export interface UpdateAbpV1_1 {
  FCntStart?: number;
}
export interface UpdateAbpV1_0_x {
  FCntStart?: number;
}
export interface UpdateFPorts {
  Positioning?: Positioning;
  Applications?: ApplicationConfig[];
}
export interface LoRaWANUpdateDevice {
  DeviceProfileId?: string;
  ServiceProfileId?: string;
  AbpV1_1?: UpdateAbpV1_1;
  AbpV1_0_x?: UpdateAbpV1_0_x;
  FPorts?: UpdateFPorts;
}
export interface SidewalkUpdateWirelessDevice {
  Positioning?: SidewalkPositioning;
}
export interface UpdateWirelessDeviceRequest {
  Id: string;
  DestinationName?: string;
  Name?: string;
  Description?: string;
  LoRaWAN?: LoRaWANUpdateDevice;
  Positioning?: PositioningConfigStatus;
  Sidewalk?: SidewalkUpdateWirelessDevice;
}
export interface UpdateWirelessDeviceResponse {}
export interface SidewalkUpdateImportInfo {
  DeviceCreationFile?: string;
}
export interface UpdateWirelessDeviceImportTaskRequest {
  Id: string;
  Sidewalk: SidewalkUpdateImportInfo;
}
export interface UpdateWirelessDeviceImportTaskResponse {}
export interface UpdateWirelessGatewayRequest {
  Id: string;
  Name?: string;
  Description?: string;
  JoinEuiFilters?: string[][];
  NetIdFilters?: string[];
  MaxEirp?: number;
}
export interface UpdateWirelessGatewayResponse {}
export type Message = string;
export type ResourceId = string;
export type AssociateAwsAccountWithPartnerAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a partner account with your AWS account.
 */
export const associateAwsAccountWithPartnerAccount: API.OperationMethod<
  AssociateAwsAccountWithPartnerAccountRequest,
  AssociateAwsAccountWithPartnerAccountResponse,
  AssociateAwsAccountWithPartnerAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /partner-accounts",
    input: {
      Sidewalk: { AmazonId: 0, AppServerPrivateKey: 0 },
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { Sidewalk: { AppServerPrivateKey: D.secret } },
    body: true,
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
  operationName: "AssociateAwsAccountWithPartnerAccount",
})) as any;

export type AssociateMulticastGroupWithFuotaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a multicast group with a FUOTA task.
 */
export const associateMulticastGroupWithFuotaTask: API.OperationMethod<
  AssociateMulticastGroupWithFuotaTaskRequest,
  AssociateMulticastGroupWithFuotaTaskResponse,
  AssociateMulticastGroupWithFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /fuota-tasks/{Id}/multicast-group",
    input: { Id: 0, MulticastGroupId: 0 },
    body: true,
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
  operationName: "AssociateMulticastGroupWithFuotaTask",
})) as any;

export type AssociateWirelessDeviceWithFuotaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a wireless device with a FUOTA task.
 */
export const associateWirelessDeviceWithFuotaTask: API.OperationMethod<
  AssociateWirelessDeviceWithFuotaTaskRequest,
  AssociateWirelessDeviceWithFuotaTaskResponse,
  AssociateWirelessDeviceWithFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /fuota-tasks/{Id}/wireless-device",
    input: { Id: 0, WirelessDeviceId: 0 },
    body: true,
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
  operationName: "AssociateWirelessDeviceWithFuotaTask",
})) as any;

export type AssociateWirelessDeviceWithMulticastGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a wireless device with a multicast group.
 */
export const associateWirelessDeviceWithMulticastGroup: API.OperationMethod<
  AssociateWirelessDeviceWithMulticastGroupRequest,
  AssociateWirelessDeviceWithMulticastGroupResponse,
  AssociateWirelessDeviceWithMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /multicast-groups/{Id}/wireless-device",
    input: { Id: 0, WirelessDeviceId: 0 },
    body: true,
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
  operationName: "AssociateWirelessDeviceWithMulticastGroup",
})) as any;

export type AssociateWirelessDeviceWithThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a wireless device with a thing.
 */
export const associateWirelessDeviceWithThing: API.OperationMethod<
  AssociateWirelessDeviceWithThingRequest,
  AssociateWirelessDeviceWithThingResponse,
  AssociateWirelessDeviceWithThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /wireless-devices/{Id}/thing",
    input: { Id: 0, ThingArn: 0 },
    body: true,
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
  operationName: "AssociateWirelessDeviceWithThing",
})) as any;

export type AssociateWirelessGatewayWithCertificateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a wireless gateway with a certificate.
 */
export const associateWirelessGatewayWithCertificate: API.OperationMethod<
  AssociateWirelessGatewayWithCertificateRequest,
  AssociateWirelessGatewayWithCertificateResponse,
  AssociateWirelessGatewayWithCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /wireless-gateways/{Id}/certificate",
    input: { Id: 0, IotCertificateId: 0 },
    body: true,
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
  operationName: "AssociateWirelessGatewayWithCertificate",
})) as any;

export type AssociateWirelessGatewayWithThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a wireless gateway with a thing.
 */
export const associateWirelessGatewayWithThing: API.OperationMethod<
  AssociateWirelessGatewayWithThingRequest,
  AssociateWirelessGatewayWithThingResponse,
  AssociateWirelessGatewayWithThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /wireless-gateways/{Id}/thing",
    input: { Id: 0, ThingArn: 0 },
    body: true,
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
  operationName: "AssociateWirelessGatewayWithThing",
})) as any;

export type CancelMulticastGroupSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an existing multicast group session.
 */
export const cancelMulticastGroupSession: API.OperationMethod<
  CancelMulticastGroupSessionRequest,
  CancelMulticastGroupSessionResponse,
  CancelMulticastGroupSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /multicast-groups/{Id}/session",
    input: { Id: 0 },
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
  operationName: "CancelMulticastGroupSession",
})) as any;

export type CreateDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new destination that maps a device message to an AWS IoT rule.
 */
export const createDestination: API.OperationMethod<
  CreateDestinationRequest,
  CreateDestinationResponse,
  CreateDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /destinations",
    input: {
      Name: 0,
      ExpressionType: 0,
      Expression: 0,
      Description: 0,
      RoleArn: 0,
      Tags: D.list(i_Tag),
      ClientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
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
  operationName: "CreateDestination",
})) as any;

export type CreateDeviceProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new device profile.
 */
export const createDeviceProfile: API.OperationMethod<
  CreateDeviceProfileRequest,
  CreateDeviceProfileResponse,
  CreateDeviceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /device-profiles",
    input: {
      Name: 0,
      LoRaWAN: {
        SupportsClassB: 0,
        ClassBTimeout: 0,
        PingSlotPeriod: 0,
        PingSlotDr: 0,
        PingSlotFreq: 0,
        SupportsClassC: 0,
        ClassCTimeout: 0,
        MacVersion: 0,
        RegParamsRevision: 0,
        RxDelay1: 0,
        RxDrOffset1: 0,
        RxDataRate2: 0,
        RxFreq2: 0,
        FactoryPresetFreqsList: 0,
        MaxEirp: 0,
        MaxDutyCycle: 0,
        RfRegion: 0,
        SupportsJoin: 0,
        Supports32BitFCnt: 0,
      },
      Tags: D.list(i_Tag),
      ClientRequestToken: D.m({ idempotency: true }),
      Sidewalk: {},
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeviceProfile",
})) as any;

export type CreateFuotaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a FUOTA task.
 */
export const createFuotaTask: API.OperationMethod<
  CreateFuotaTaskRequest,
  CreateFuotaTaskResponse,
  CreateFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /fuota-tasks",
    input: {
      Name: 0,
      Description: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      LoRaWAN: i_LoRaWANFuotaTask,
      FirmwareUpdateImage: 0,
      FirmwareUpdateRole: 0,
      Tags: D.list(i_Tag),
      RedundancyPercent: 0,
      FragmentSizeBytes: 0,
      FragmentIntervalMS: 0,
      Descriptor: 0,
    },
    body: true,
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
  operationName: "CreateFuotaTask",
})) as any;

export type CreateMulticastGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a multicast group.
 */
export const createMulticastGroup: API.OperationMethod<
  CreateMulticastGroupRequest,
  CreateMulticastGroupResponse,
  CreateMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /multicast-groups",
    input: {
      Name: 0,
      Description: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      LoRaWAN: i_LoRaWANMulticast,
      Tags: D.list(i_Tag),
    },
    body: true,
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
  operationName: "CreateMulticastGroup",
})) as any;

export type CreateNetworkAnalyzerConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new network analyzer configuration.
 */
export const createNetworkAnalyzerConfiguration: API.OperationMethod<
  CreateNetworkAnalyzerConfigurationRequest,
  CreateNetworkAnalyzerConfigurationResponse,
  CreateNetworkAnalyzerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-analyzer-configurations",
    input: {
      Name: 0,
      TraceContent: i_TraceContent,
      WirelessDevices: 0,
      WirelessGateways: 0,
      Description: 0,
      Tags: D.list(i_Tag),
      ClientRequestToken: D.m({ idempotency: true }),
      MulticastGroups: 0,
    },
    body: true,
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
  operationName: "CreateNetworkAnalyzerConfiguration",
})) as any;

export type CreateServiceProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new service profile.
 */
export const createServiceProfile: API.OperationMethod<
  CreateServiceProfileRequest,
  CreateServiceProfileResponse,
  CreateServiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /service-profiles",
    input: {
      Name: 0,
      LoRaWAN: {
        AddGwMetadata: 0,
        DrMin: 0,
        DrMax: 0,
        PrAllowed: 0,
        RaAllowed: 0,
        TxPowerIndexMin: 0,
        TxPowerIndexMax: 0,
        NbTransMin: 0,
        NbTransMax: 0,
      },
      Tags: D.list(i_Tag),
      ClientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceProfile",
})) as any;

export type CreateWirelessDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provisions a wireless device.
 */
export const createWirelessDevice: API.OperationMethod<
  CreateWirelessDeviceRequest,
  CreateWirelessDeviceResponse,
  CreateWirelessDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /wireless-devices",
    input: {
      Type: 0,
      Name: 0,
      Description: 0,
      DestinationName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      LoRaWAN: {
        DevEui: 0,
        DeviceProfileId: 0,
        ServiceProfileId: 0,
        OtaaV1_1: { AppKey: 0, NwkKey: 0, JoinEui: 0 },
        OtaaV1_0_x: { AppKey: 0, AppEui: 0, JoinEui: 0, GenAppKey: 0 },
        AbpV1_1: {
          DevAddr: 0,
          SessionKeys: {
            FNwkSIntKey: 0,
            SNwkSIntKey: 0,
            NwkSEncKey: 0,
            AppSKey: 0,
          },
          FCntStart: 0,
        },
        AbpV1_0_x: {
          DevAddr: 0,
          SessionKeys: { NwkSKey: 0, AppSKey: 0 },
          FCntStart: 0,
        },
        FPorts: {
          Fuota: 0,
          Multicast: 0,
          ClockSync: 0,
          Positioning: i_Positioning,
          Applications: D.list(i_ApplicationConfig),
        },
      },
      Tags: D.list(i_Tag),
      Positioning: 0,
      Sidewalk: {
        DeviceProfileId: 0,
        Positioning: i_SidewalkPositioning,
        SidewalkManufacturingSn: 0,
      },
    },
    body: true,
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
  operationName: "CreateWirelessDevice",
})) as any;

export type CreateWirelessGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provisions a wireless gateway.
 *
 * When provisioning a wireless gateway, you might run into duplication errors for
 * the following reasons.
 *
 * - If you specify a `GatewayEui` value that already exists.
 *
 * - If you used a `ClientRequestToken` with the same parameters
 * within the last 10 minutes.
 *
 * To avoid this error, make sure that you use unique identifiers and parameters for
 * each request within the specified time period.
 */
export const createWirelessGateway: API.OperationMethod<
  CreateWirelessGatewayRequest,
  CreateWirelessGatewayResponse,
  CreateWirelessGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /wireless-gateways",
    input: {
      Name: 0,
      Description: 0,
      LoRaWAN: {
        GatewayEui: 0,
        RfRegion: 0,
        JoinEuiFilters: 0,
        NetIdFilters: 0,
        SubBands: 0,
        Beaconing: { DataRate: 0, Frequencies: 0 },
        MaxEirp: 0,
      },
      Tags: D.list(i_Tag),
      ClientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWirelessGateway",
})) as any;

export type CreateWirelessGatewayTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a task for a wireless gateway.
 */
export const createWirelessGatewayTask: API.OperationMethod<
  CreateWirelessGatewayTaskRequest,
  CreateWirelessGatewayTaskResponse,
  CreateWirelessGatewayTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /wireless-gateways/{Id}/tasks",
    input: { Id: 0, WirelessGatewayTaskDefinitionId: 0 },
    body: true,
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
  operationName: "CreateWirelessGatewayTask",
})) as any;

export type CreateWirelessGatewayTaskDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a gateway task definition.
 */
export const createWirelessGatewayTaskDefinition: API.OperationMethod<
  CreateWirelessGatewayTaskDefinitionRequest,
  CreateWirelessGatewayTaskDefinitionResponse,
  CreateWirelessGatewayTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /wireless-gateway-task-definitions",
    input: {
      AutoCreateTasks: 0,
      Name: 0,
      Update: {
        UpdateDataSource: 0,
        UpdateDataRole: 0,
        LoRaWAN: {
          UpdateSignature: 0,
          SigKeyCrc: 0,
          CurrentVersion: i_LoRaWANGatewayVersion,
          UpdateVersion: i_LoRaWANGatewayVersion,
        },
      },
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    body: true,
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
  operationName: "CreateWirelessGatewayTaskDefinition",
})) as any;

export type DeleteDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a destination.
 */
export const deleteDestination: API.OperationMethod<
  DeleteDestinationRequest,
  DeleteDestinationResponse,
  DeleteDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /destinations/{Name}",
    input: { Name: 0 },
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
  operationName: "DeleteDestination",
})) as any;

export type DeleteDeviceProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a device profile.
 */
export const deleteDeviceProfile: API.OperationMethod<
  DeleteDeviceProfileRequest,
  DeleteDeviceProfileResponse,
  DeleteDeviceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /device-profiles/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteDeviceProfile",
})) as any;

export type DeleteFuotaTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a FUOTA task.
 */
export const deleteFuotaTask: API.OperationMethod<
  DeleteFuotaTaskRequest,
  DeleteFuotaTaskResponse,
  DeleteFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /fuota-tasks/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteFuotaTask",
})) as any;

export type DeleteMulticastGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a multicast group if it is not in use by a FUOTA task.
 */
export const deleteMulticastGroup: API.OperationMethod<
  DeleteMulticastGroupRequest,
  DeleteMulticastGroupResponse,
  DeleteMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /multicast-groups/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteMulticastGroup",
})) as any;

export type DeleteNetworkAnalyzerConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a network analyzer configuration.
 */
export const deleteNetworkAnalyzerConfiguration: API.OperationMethod<
  DeleteNetworkAnalyzerConfigurationRequest,
  DeleteNetworkAnalyzerConfigurationResponse,
  DeleteNetworkAnalyzerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /network-analyzer-configurations/{ConfigurationName}",
    input: { ConfigurationName: 0 },
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
  operationName: "DeleteNetworkAnalyzerConfiguration",
})) as any;

export type DeleteQueuedMessagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove queued messages from the downlink queue.
 */
export const deleteQueuedMessages: API.OperationMethod<
  DeleteQueuedMessagesRequest,
  DeleteQueuedMessagesResponse,
  DeleteQueuedMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless-devices/{Id}/data",
    input: {
      Id: 0,
      MessageId: D.m({ query: "messageId" }),
      WirelessDeviceType: D.m({ query: "WirelessDeviceType" }),
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
  operationName: "DeleteQueuedMessages",
})) as any;

export type DeleteServiceProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a service profile.
 */
export const deleteServiceProfile: API.OperationMethod<
  DeleteServiceProfileRequest,
  DeleteServiceProfileResponse,
  DeleteServiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /service-profiles/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteServiceProfile",
})) as any;

export type DeleteWirelessDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a wireless device.
 */
export const deleteWirelessDevice: API.OperationMethod<
  DeleteWirelessDeviceRequest,
  DeleteWirelessDeviceResponse,
  DeleteWirelessDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless-devices/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteWirelessDevice",
})) as any;

export type DeleteWirelessDeviceImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an import task.
 */
export const deleteWirelessDeviceImportTask: API.OperationMethod<
  DeleteWirelessDeviceImportTaskRequest,
  DeleteWirelessDeviceImportTaskResponse,
  DeleteWirelessDeviceImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless_device_import_task/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteWirelessDeviceImportTask",
})) as any;

export type DeleteWirelessGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a wireless gateway.
 *
 * When deleting a wireless gateway, you might run into duplication errors for the
 * following reasons.
 *
 * - If you specify a `GatewayEui` value that already exists.
 *
 * - If you used a `ClientRequestToken` with the same parameters
 * within the last 10 minutes.
 *
 * To avoid this error, make sure that you use unique identifiers and parameters for
 * each request within the specified time period.
 */
export const deleteWirelessGateway: API.OperationMethod<
  DeleteWirelessGatewayRequest,
  DeleteWirelessGatewayResponse,
  DeleteWirelessGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless-gateways/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteWirelessGateway",
})) as any;

export type DeleteWirelessGatewayTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a wireless gateway task.
 */
export const deleteWirelessGatewayTask: API.OperationMethod<
  DeleteWirelessGatewayTaskRequest,
  DeleteWirelessGatewayTaskResponse,
  DeleteWirelessGatewayTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless-gateways/{Id}/tasks",
    input: { Id: 0 },
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
  operationName: "DeleteWirelessGatewayTask",
})) as any;

export type DeleteWirelessGatewayTaskDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a wireless gateway task definition. Deleting this task definition does not
 * affect tasks that are currently in progress.
 */
export const deleteWirelessGatewayTaskDefinition: API.OperationMethod<
  DeleteWirelessGatewayTaskDefinitionRequest,
  DeleteWirelessGatewayTaskDefinitionResponse,
  DeleteWirelessGatewayTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless-gateway-task-definitions/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteWirelessGatewayTaskDefinition",
})) as any;

export type DeregisterWirelessDeviceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregister a wireless device from AWS IoT Wireless.
 */
export const deregisterWirelessDevice: API.OperationMethod<
  DeregisterWirelessDeviceRequest,
  DeregisterWirelessDeviceResponse,
  DeregisterWirelessDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /wireless-devices/{Identifier}/deregister",
    input: {
      Identifier: 0,
      WirelessDeviceType: D.m({ query: "WirelessDeviceType" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterWirelessDevice",
})) as any;

export type DisassociateAwsAccountFromPartnerAccountError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates your AWS account from a partner account. If
 * `PartnerAccountId` and `PartnerType` are `null`,
 * disassociates your AWS account from all partner accounts.
 */
export const disassociateAwsAccountFromPartnerAccount: API.OperationMethod<
  DisassociateAwsAccountFromPartnerAccountRequest,
  DisassociateAwsAccountFromPartnerAccountResponse,
  DisassociateAwsAccountFromPartnerAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /partner-accounts/{PartnerAccountId}",
    input: { PartnerAccountId: 0, PartnerType: D.m({ query: "partnerType" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAwsAccountFromPartnerAccount",
})) as any;

export type DisassociateMulticastGroupFromFuotaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a multicast group from a FUOTA task.
 */
export const disassociateMulticastGroupFromFuotaTask: API.OperationMethod<
  DisassociateMulticastGroupFromFuotaTaskRequest,
  DisassociateMulticastGroupFromFuotaTaskResponse,
  DisassociateMulticastGroupFromFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /fuota-tasks/{Id}/multicast-groups/{MulticastGroupId}",
    input: { Id: 0, MulticastGroupId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMulticastGroupFromFuotaTask",
})) as any;

export type DisassociateWirelessDeviceFromFuotaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a wireless device from a FUOTA task.
 */
export const disassociateWirelessDeviceFromFuotaTask: API.OperationMethod<
  DisassociateWirelessDeviceFromFuotaTaskRequest,
  DisassociateWirelessDeviceFromFuotaTaskResponse,
  DisassociateWirelessDeviceFromFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /fuota-tasks/{Id}/wireless-devices/{WirelessDeviceId}",
    input: { Id: 0, WirelessDeviceId: 0 },
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
  operationName: "DisassociateWirelessDeviceFromFuotaTask",
})) as any;

export type DisassociateWirelessDeviceFromMulticastGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a wireless device from a multicast group.
 */
export const disassociateWirelessDeviceFromMulticastGroup: API.OperationMethod<
  DisassociateWirelessDeviceFromMulticastGroupRequest,
  DisassociateWirelessDeviceFromMulticastGroupResponse,
  DisassociateWirelessDeviceFromMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /multicast-groups/{Id}/wireless-devices/{WirelessDeviceId}",
    input: { Id: 0, WirelessDeviceId: 0 },
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
  operationName: "DisassociateWirelessDeviceFromMulticastGroup",
})) as any;

export type DisassociateWirelessDeviceFromThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a wireless device from its currently associated thing.
 */
export const disassociateWirelessDeviceFromThing: API.OperationMethod<
  DisassociateWirelessDeviceFromThingRequest,
  DisassociateWirelessDeviceFromThingResponse,
  DisassociateWirelessDeviceFromThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless-devices/{Id}/thing",
    input: { Id: 0 },
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
  operationName: "DisassociateWirelessDeviceFromThing",
})) as any;

export type DisassociateWirelessGatewayFromCertificateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a wireless gateway from its currently associated certificate.
 */
export const disassociateWirelessGatewayFromCertificate: API.OperationMethod<
  DisassociateWirelessGatewayFromCertificateRequest,
  DisassociateWirelessGatewayFromCertificateResponse,
  DisassociateWirelessGatewayFromCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless-gateways/{Id}/certificate",
    input: { Id: 0 },
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
  operationName: "DisassociateWirelessGatewayFromCertificate",
})) as any;

export type DisassociateWirelessGatewayFromThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a wireless gateway from its currently associated thing.
 */
export const disassociateWirelessGatewayFromThing: API.OperationMethod<
  DisassociateWirelessGatewayFromThingRequest,
  DisassociateWirelessGatewayFromThingResponse,
  DisassociateWirelessGatewayFromThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /wireless-gateways/{Id}/thing",
    input: { Id: 0 },
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
  operationName: "DisassociateWirelessGatewayFromThing",
})) as any;

export type GetDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a destination.
 */
export const getDestination: API.OperationMethod<
  GetDestinationRequest,
  GetDestinationResponse,
  GetDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /destinations/{Name}",
    input: { Name: 0 },
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
  operationName: "GetDestination",
})) as any;

export type GetDeviceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a device profile.
 */
export const getDeviceProfile: API.OperationMethod<
  GetDeviceProfileRequest,
  GetDeviceProfileResponse,
  GetDeviceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /device-profiles/{Id}",
    input: { Id: 0 },
    output: { Sidewalk: { ApplicationServerPublicKey: D.secret } },
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
  operationName: "GetDeviceProfile",
})) as any;

export type GetEventConfigurationByResourceTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Get the event configuration based on resource types.
 */
export const getEventConfigurationByResourceTypes: API.OperationMethod<
  GetEventConfigurationByResourceTypesRequest,
  GetEventConfigurationByResourceTypesResponse,
  GetEventConfigurationByResourceTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /event-configurations-resource-types",
    input: {},
  },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventConfigurationByResourceTypes",
})) as any;

export type GetFuotaTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a FUOTA task.
 */
export const getFuotaTask: API.OperationMethod<
  GetFuotaTaskRequest,
  GetFuotaTaskResponse,
  GetFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /fuota-tasks/{Id}",
    input: { Id: 0 },
    output: { LoRaWAN: { StartTime: D.ts }, CreatedAt: D.ts },
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
  operationName: "GetFuotaTask",
})) as any;

export type GetLogLevelsByResourceTypesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns current default log levels or log levels by resource types. Based on the
 * resource type, log levels can be returned for wireless device, wireless gateway, or
 * FUOTA task log options.
 */
export const getLogLevelsByResourceTypes: API.OperationMethod<
  GetLogLevelsByResourceTypesRequest,
  GetLogLevelsByResourceTypesResponse,
  GetLogLevelsByResourceTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /log-levels", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogLevelsByResourceTypes",
})) as any;

export type GetMetricConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the metric configuration status for this AWS account.
 */
export const getMetricConfiguration: API.OperationMethod<
  GetMetricConfigurationRequest,
  GetMetricConfigurationResponse,
  GetMetricConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /metric-configuration", input: {} },
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
  operationName: "GetMetricConfiguration",
})) as any;

export type GetMetricsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the summary metrics for this AWS account.
 */
export const getMetrics: API.OperationMethod<
  GetMetricsRequest,
  GetMetricsResponse,
  GetMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics",
    input: {
      SummaryMetricQueries: D.list({
        QueryId: 0,
        MetricName: 0,
        Dimensions: D.list({ name: 0, value: 0 }),
        AggregationPeriod: 0,
        StartTimestamp: 0,
        EndTimestamp: 0,
      }),
    },
    output: {
      SummaryMetricQueryResults: D.list({
        StartTimestamp: D.ts,
        EndTimestamp: D.ts,
        Timestamps: D.list(D.ts),
      }),
    },
    body: true,
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
  operationName: "GetMetrics",
})) as any;

export type GetMulticastGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a multicast group.
 */
export const getMulticastGroup: API.OperationMethod<
  GetMulticastGroupRequest,
  GetMulticastGroupResponse,
  GetMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /multicast-groups/{Id}",
    input: { Id: 0 },
    output: { CreatedAt: D.ts },
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
  operationName: "GetMulticastGroup",
})) as any;

export type GetMulticastGroupSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a multicast group session.
 */
export const getMulticastGroupSession: API.OperationMethod<
  GetMulticastGroupSessionRequest,
  GetMulticastGroupSessionResponse,
  GetMulticastGroupSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /multicast-groups/{Id}/session",
    input: { Id: 0 },
    output: { LoRaWAN: { SessionStartTime: D.ts } },
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
  operationName: "GetMulticastGroupSession",
})) as any;

export type GetNetworkAnalyzerConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get network analyzer configuration.
 */
export const getNetworkAnalyzerConfiguration: API.OperationMethod<
  GetNetworkAnalyzerConfigurationRequest,
  GetNetworkAnalyzerConfigurationResponse,
  GetNetworkAnalyzerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /network-analyzer-configurations/{ConfigurationName}",
    input: { ConfigurationName: 0 },
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
  operationName: "GetNetworkAnalyzerConfiguration",
})) as any;

export type GetPartnerAccountError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a partner account. If `PartnerAccountId` and
 * `PartnerType` are `null`, returns all partner accounts.
 */
export const getPartnerAccount: API.OperationMethod<
  GetPartnerAccountRequest,
  GetPartnerAccountResponse,
  GetPartnerAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /partner-accounts/{PartnerAccountId}",
    input: { PartnerAccountId: 0, PartnerType: D.m({ query: "partnerType" }) },
    output: { Sidewalk: o_SidewalkAccountInfoWithFingerprint },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartnerAccount",
})) as any;

export type GetPositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the position information for a given resource.
 *
 * This action is no longer supported. Calls to retrieve the position information
 * should use the GetResourcePosition API operation instead.
 */
export const getPosition: API.OperationMethod<
  GetPositionRequest,
  GetPositionResponse,
  GetPositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /positions/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
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
  operationName: "GetPosition",
})) as any;

export type GetPositionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get position configuration for a given resource.
 *
 * This action is no longer supported. Calls to retrieve the position configuration
 * should use the GetResourcePosition API operation instead.
 */
export const getPositionConfiguration: API.OperationMethod<
  GetPositionConfigurationRequest,
  GetPositionConfigurationResponse,
  GetPositionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /position-configurations/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
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
  operationName: "GetPositionConfiguration",
})) as any;

export type GetPositionEstimateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get estimated position information as a payload in GeoJSON format. The payload
 * measurement data is resolved using solvers that are provided by third-party
 * vendors.
 */
export const getPositionEstimate: API.OperationMethod<
  GetPositionEstimateRequest,
  GetPositionEstimateResponse,
  GetPositionEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /position-estimate",
    input: {
      WiFiAccessPoints: D.list({ MacAddress: 0, Rss: 0 }),
      CellTowers: {
        Gsm: D.list({
          Mcc: 0,
          Mnc: 0,
          Lac: 0,
          GeranCid: 0,
          GsmLocalId: { Bsic: 0, Bcch: 0 },
          GsmTimingAdvance: 0,
          RxLevel: 0,
          GsmNmr: D.list({
            Bsic: 0,
            Bcch: 0,
            RxLevel: 0,
            GlobalIdentity: { Lac: 0, GeranCid: 0 },
          }),
        }),
        Wcdma: D.list({
          Mcc: 0,
          Mnc: 0,
          Lac: 0,
          UtranCid: 0,
          WcdmaLocalId: { Uarfcndl: 0, Psc: 0 },
          Rscp: 0,
          PathLoss: 0,
          WcdmaNmr: D.list({
            Uarfcndl: 0,
            Psc: 0,
            UtranCid: 0,
            Rscp: 0,
            PathLoss: 0,
          }),
        }),
        Tdscdma: D.list({
          Mcc: 0,
          Mnc: 0,
          Lac: 0,
          UtranCid: 0,
          TdscdmaLocalId: { Uarfcn: 0, CellParams: 0 },
          TdscdmaTimingAdvance: 0,
          Rscp: 0,
          PathLoss: 0,
          TdscdmaNmr: D.list({
            Uarfcn: 0,
            CellParams: 0,
            UtranCid: 0,
            Rscp: 0,
            PathLoss: 0,
          }),
        }),
        Lte: D.list({
          Mcc: 0,
          Mnc: 0,
          EutranCid: 0,
          Tac: 0,
          LteLocalId: { Pci: 0, Earfcn: 0 },
          LteTimingAdvance: 0,
          Rsrp: 0,
          Rsrq: 0,
          NrCapable: 0,
          LteNmr: D.list({ Pci: 0, Earfcn: 0, EutranCid: 0, Rsrp: 0, Rsrq: 0 }),
        }),
        Cdma: D.list({
          SystemId: 0,
          NetworkId: 0,
          BaseStationId: 0,
          RegistrationZone: 0,
          CdmaLocalId: { PnOffset: 0, CdmaChannel: 0 },
          PilotPower: 0,
          BaseLat: 0,
          BaseLng: 0,
          CdmaNmr: D.list({
            PnOffset: 0,
            CdmaChannel: 0,
            PilotPower: 0,
            BaseStationId: 0,
          }),
        }),
      },
      Ip: { IpAddress: 0 },
      Gnss: {
        Payload: 0,
        CaptureTime: 0,
        CaptureTimeAccuracy: 0,
        AssistPosition: 0,
        AssistAltitude: 0,
        Use2DSolver: 0,
      },
      Timestamp: 0,
      AdvancedConfiguration: { WiFiCellular: { ConfidencePercent: 0 } },
    },
    output: { GeoJsonPayload: D.m({ payload: true, shape: D.stream }) },
    body: true,
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
  operationName: "GetPositionEstimate",
})) as any;

export type GetResourceEventConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the event configuration for a particular resource identifier.
 */
export const getResourceEventConfiguration: API.OperationMethod<
  GetResourceEventConfigurationRequest,
  GetResourceEventConfigurationResponse,
  GetResourceEventConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /event-configurations/{Identifier}",
    input: {
      Identifier: 0,
      IdentifierType: D.m({ query: "identifierType" }),
      PartnerType: D.m({ query: "partnerType" }),
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
  operationName: "GetResourceEventConfiguration",
})) as any;

export type GetResourceLogLevelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the log-level override, if any, for a given resource ID and resource
 * type..
 */
export const getResourceLogLevel: API.OperationMethod<
  GetResourceLogLevelRequest,
  GetResourceLogLevelResponse,
  GetResourceLogLevelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /log-levels/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
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
  operationName: "GetResourceLogLevel",
})) as any;

export type GetResourcePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the position information for a given wireless device or a wireless gateway
 * resource. The position information uses the World Geodetic System
 * (WGS84).
 */
export const getResourcePosition: API.OperationMethod<
  GetResourcePositionRequest,
  GetResourcePositionResponse,
  GetResourcePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /resource-positions/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
    },
    output: { GeoJsonPayload: D.m({ payload: true, shape: D.stream }) },
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
  operationName: "GetResourcePosition",
})) as any;

export type GetServiceEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the account-specific endpoint for Configuration and Update Server (CUPS) protocol
 * or LoRaWAN Network Server (LNS) connections.
 */
export const getServiceEndpoint: API.OperationMethod<
  GetServiceEndpointRequest,
  GetServiceEndpointResponse,
  GetServiceEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /service-endpoint",
    input: { ServiceType: D.m({ query: "serviceType" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceEndpoint",
})) as any;

export type GetServiceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a service profile.
 */
export const getServiceProfile: API.OperationMethod<
  GetServiceProfileRequest,
  GetServiceProfileResponse,
  GetServiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /service-profiles/{Id}",
    input: { Id: 0 },
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
  operationName: "GetServiceProfile",
})) as any;

export type GetWirelessDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a wireless device.
 */
export const getWirelessDevice: API.OperationMethod<
  GetWirelessDeviceRequest,
  GetWirelessDeviceResponse,
  GetWirelessDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-devices/{Identifier}",
    input: { Identifier: 0, IdentifierType: D.m({ query: "identifierType" }) },
    output: {
      LoRaWAN: {
        OtaaV1_1: { AppKey: D.secret, NwkKey: D.secret },
        OtaaV1_0_x: { AppKey: D.secret, GenAppKey: D.secret },
        AbpV1_1: {
          SessionKeys: {
            FNwkSIntKey: D.secret,
            SNwkSIntKey: D.secret,
            NwkSEncKey: D.secret,
            AppSKey: D.secret,
          },
        },
        AbpV1_0_x: { SessionKeys: { NwkSKey: D.secret, AppSKey: D.secret } },
      },
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
  operationName: "GetWirelessDevice",
})) as any;

export type GetWirelessDeviceImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about an import task and count of device onboarding summary
 * information for the import task.
 */
export const getWirelessDeviceImportTask: API.OperationMethod<
  GetWirelessDeviceImportTaskRequest,
  GetWirelessDeviceImportTaskResponse,
  GetWirelessDeviceImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless_device_import_task/{Id}",
    input: { Id: 0 },
    output: { CreationTime: D.ts },
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
  operationName: "GetWirelessDeviceImportTask",
})) as any;

export type GetWirelessDeviceStatisticsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets operating information about a wireless device.
 */
export const getWirelessDeviceStatistics: API.OperationMethod<
  GetWirelessDeviceStatisticsRequest,
  GetWirelessDeviceStatisticsResponse,
  GetWirelessDeviceStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-devices/{WirelessDeviceId}/statistics",
    input: { WirelessDeviceId: 0 },
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
  operationName: "GetWirelessDeviceStatistics",
})) as any;

export type GetWirelessGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a wireless gateway.
 */
export const getWirelessGateway: API.OperationMethod<
  GetWirelessGatewayRequest,
  GetWirelessGatewayResponse,
  GetWirelessGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-gateways/{Identifier}",
    input: { Identifier: 0, IdentifierType: D.m({ query: "identifierType" }) },
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
  operationName: "GetWirelessGateway",
})) as any;

export type GetWirelessGatewayCertificateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the ID of the certificate that is currently associated with a wireless
 * gateway.
 */
export const getWirelessGatewayCertificate: API.OperationMethod<
  GetWirelessGatewayCertificateRequest,
  GetWirelessGatewayCertificateResponse,
  GetWirelessGatewayCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-gateways/{Id}/certificate",
    input: { Id: 0 },
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
  operationName: "GetWirelessGatewayCertificate",
})) as any;

export type GetWirelessGatewayFirmwareInformationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the firmware version and other information about a wireless gateway.
 */
export const getWirelessGatewayFirmwareInformation: API.OperationMethod<
  GetWirelessGatewayFirmwareInformationRequest,
  GetWirelessGatewayFirmwareInformationResponse,
  GetWirelessGatewayFirmwareInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-gateways/{Id}/firmware-information",
    input: { Id: 0 },
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
  operationName: "GetWirelessGatewayFirmwareInformation",
})) as any;

export type GetWirelessGatewayStatisticsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets operating information about a wireless gateway.
 */
export const getWirelessGatewayStatistics: API.OperationMethod<
  GetWirelessGatewayStatisticsRequest,
  GetWirelessGatewayStatisticsResponse,
  GetWirelessGatewayStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-gateways/{WirelessGatewayId}/statistics",
    input: { WirelessGatewayId: 0 },
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
  operationName: "GetWirelessGatewayStatistics",
})) as any;

export type GetWirelessGatewayTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a wireless gateway task.
 */
export const getWirelessGatewayTask: API.OperationMethod<
  GetWirelessGatewayTaskRequest,
  GetWirelessGatewayTaskResponse,
  GetWirelessGatewayTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-gateways/{Id}/tasks",
    input: { Id: 0 },
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
  operationName: "GetWirelessGatewayTask",
})) as any;

export type GetWirelessGatewayTaskDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a wireless gateway task definition.
 */
export const getWirelessGatewayTaskDefinition: API.OperationMethod<
  GetWirelessGatewayTaskDefinitionRequest,
  GetWirelessGatewayTaskDefinitionResponse,
  GetWirelessGatewayTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-gateway-task-definitions/{Id}",
    input: { Id: 0 },
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
  operationName: "GetWirelessGatewayTaskDefinition",
})) as any;

export type ListDestinationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the destinations registered to your AWS account.
 */
export const listDestinations: API.PaginatedOperationMethod<
  ListDestinationsRequest,
  ListDestinationsResponse,
  ListDestinationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /destinations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDeviceProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the device profiles registered to your AWS account.
 */
export const listDeviceProfiles: API.PaginatedOperationMethod<
  ListDeviceProfilesRequest,
  ListDeviceProfilesResponse,
  ListDeviceProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /device-profiles",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      DeviceProfileType: D.m({ query: "deviceProfileType" }),
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
  operationName: "ListDeviceProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDevicesForWirelessDeviceImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the Sidewalk devices in an import task and their onboarding status.
 */
export const listDevicesForWirelessDeviceImportTask: API.OperationMethod<
  ListDevicesForWirelessDeviceImportTaskRequest,
  ListDevicesForWirelessDeviceImportTaskResponse,
  ListDevicesForWirelessDeviceImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless_device_import_task",
    input: {
      Id: D.m({ query: "id" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Status: D.m({ query: "status" }),
    },
    output: {
      ImportedWirelessDeviceList: D.list({
        Sidewalk: { LastUpdateTime: D.ts },
      }),
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
  operationName: "ListDevicesForWirelessDeviceImportTask",
})) as any;

export type ListEventConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List event configurations where at least one event topic has been enabled.
 */
export const listEventConfigurations: API.OperationMethod<
  ListEventConfigurationsRequest,
  ListEventConfigurationsResponse,
  ListEventConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /event-configurations",
    input: {
      ResourceType: D.m({ query: "resourceType" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListEventConfigurations",
})) as any;

export type ListFuotaTasksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the FUOTA tasks registered to your AWS account.
 */
export const listFuotaTasks: API.PaginatedOperationMethod<
  ListFuotaTasksRequest,
  ListFuotaTasksResponse,
  ListFuotaTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /fuota-tasks",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListFuotaTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMulticastGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the multicast groups registered to your AWS account.
 */
export const listMulticastGroups: API.PaginatedOperationMethod<
  ListMulticastGroupsRequest,
  ListMulticastGroupsResponse,
  ListMulticastGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /multicast-groups",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListMulticastGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMulticastGroupsByFuotaTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all multicast groups associated with a FUOTA task.
 */
export const listMulticastGroupsByFuotaTask: API.PaginatedOperationMethod<
  ListMulticastGroupsByFuotaTaskRequest,
  ListMulticastGroupsByFuotaTaskResponse,
  ListMulticastGroupsByFuotaTaskError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /fuota-tasks/{Id}/multicast-groups",
    input: {
      Id: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListMulticastGroupsByFuotaTask",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNetworkAnalyzerConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the network analyzer configurations.
 */
export const listNetworkAnalyzerConfigurations: API.PaginatedOperationMethod<
  ListNetworkAnalyzerConfigurationsRequest,
  ListNetworkAnalyzerConfigurationsResponse,
  ListNetworkAnalyzerConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /network-analyzer-configurations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListNetworkAnalyzerConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPartnerAccountsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the partner accounts associated with your AWS account.
 */
export const listPartnerAccounts: API.OperationMethod<
  ListPartnerAccountsRequest,
  ListPartnerAccountsResponse,
  ListPartnerAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /partner-accounts",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { Sidewalk: D.list(o_SidewalkAccountInfoWithFingerprint) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartnerAccounts",
})) as any;

export type ListPositionConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List position configurations for a given resource, such as positioning solvers.
 *
 * This action is no longer supported. Calls to retrieve position information should
 * use the GetResourcePosition API operation instead.
 */
export const listPositionConfigurations: API.PaginatedOperationMethod<
  ListPositionConfigurationsRequest,
  ListPositionConfigurationsResponse,
  ListPositionConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /position-configurations",
    input: {
      ResourceType: D.m({ query: "resourceType" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListPositionConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQueuedMessagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List queued messages in the downlink queue.
 */
export const listQueuedMessages: API.PaginatedOperationMethod<
  ListQueuedMessagesRequest,
  ListQueuedMessagesResponse,
  ListQueuedMessagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-devices/{Id}/data",
    input: {
      Id: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      WirelessDeviceType: D.m({ query: "WirelessDeviceType" }),
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
  operationName: "ListQueuedMessages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the service profiles registered to your AWS account.
 */
export const listServiceProfiles: API.PaginatedOperationMethod<
  ListServiceProfilesRequest,
  ListServiceProfilesResponse,
  ListServiceProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /service-profiles",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListServiceProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags (metadata) you have assigned to the resource.
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
    input: { ResourceArn: D.m({ query: "resourceArn" }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListWirelessDeviceImportTasksError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of import tasks and summary information of onboarding status of devices in each
 * import task.
 */
export const listWirelessDeviceImportTasks: API.OperationMethod<
  ListWirelessDeviceImportTasksRequest,
  ListWirelessDeviceImportTasksResponse,
  ListWirelessDeviceImportTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless_device_import_tasks",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { WirelessDeviceImportTaskList: D.list({ CreationTime: D.ts }) },
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
  operationName: "ListWirelessDeviceImportTasks",
})) as any;

export type ListWirelessDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the wireless devices registered to your AWS account.
 */
export const listWirelessDevices: API.PaginatedOperationMethod<
  ListWirelessDevicesRequest,
  ListWirelessDevicesResponse,
  ListWirelessDevicesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-devices",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      DestinationName: D.m({ query: "destinationName" }),
      DeviceProfileId: D.m({ query: "deviceProfileId" }),
      ServiceProfileId: D.m({ query: "serviceProfileId" }),
      WirelessDeviceType: D.m({ query: "wirelessDeviceType" }),
      FuotaTaskId: D.m({ query: "fuotaTaskId" }),
      MulticastGroupId: D.m({ query: "multicastGroupId" }),
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
  operationName: "ListWirelessDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWirelessGatewaysError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the wireless gateways registered to your AWS account.
 */
export const listWirelessGateways: API.PaginatedOperationMethod<
  ListWirelessGatewaysRequest,
  ListWirelessGatewaysResponse,
  ListWirelessGatewaysError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-gateways",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListWirelessGateways",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWirelessGatewayTaskDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the wireless gateway tasks definitions registered to your AWS account.
 */
export const listWirelessGatewayTaskDefinitions: API.OperationMethod<
  ListWirelessGatewayTaskDefinitionsRequest,
  ListWirelessGatewayTaskDefinitionsResponse,
  ListWirelessGatewayTaskDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /wireless-gateway-task-definitions",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      TaskDefinitionType: D.m({ query: "taskDefinitionType" }),
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
  operationName: "ListWirelessGatewayTaskDefinitions",
})) as any;

export type PutPositionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Put position configuration for a given resource.
 *
 * This action is no longer supported. Calls to update the position configuration
 * should use the UpdateResourcePosition API operation instead.
 */
export const putPositionConfiguration: API.OperationMethod<
  PutPositionConfigurationRequest,
  PutPositionConfigurationResponse,
  PutPositionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /position-configurations/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
      Solvers: { SemtechGnss: { Status: 0, Fec: 0 } },
      Destination: 0,
    },
    body: true,
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
  operationName: "PutPositionConfiguration",
})) as any;

export type PutResourceLogLevelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the log-level override for a resource ID and resource type. A limit of 200 log
 * level override can be set per account.
 */
export const putResourceLogLevel: API.OperationMethod<
  PutResourceLogLevelRequest,
  PutResourceLogLevelResponse,
  PutResourceLogLevelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /log-levels/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
      LogLevel: 0,
    },
    body: true,
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
  operationName: "PutResourceLogLevel",
})) as any;

export type ResetAllResourceLogLevelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the log-level overrides for all resources; wireless devices, wireless
 * gateways, and FUOTA tasks.
 */
export const resetAllResourceLogLevels: API.OperationMethod<
  ResetAllResourceLogLevelsRequest,
  ResetAllResourceLogLevelsResponse,
  ResetAllResourceLogLevelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /log-levels", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetAllResourceLogLevels",
})) as any;

export type ResetResourceLogLevelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the log-level override, if any, for a specific resource ID and resource type.
 * It can be used for a wireless device, a wireless gateway, or a FUOTA task.
 */
export const resetResourceLogLevel: API.OperationMethod<
  ResetResourceLogLevelRequest,
  ResetResourceLogLevelResponse,
  ResetResourceLogLevelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /log-levels/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
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
  operationName: "ResetResourceLogLevel",
})) as any;

export type SendDataToMulticastGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends the specified data to a multicast group.
 */
export const sendDataToMulticastGroup: API.OperationMethod<
  SendDataToMulticastGroupRequest,
  SendDataToMulticastGroupResponse,
  SendDataToMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /multicast-groups/{Id}/data",
    input: {
      Id: 0,
      PayloadData: 0,
      WirelessMetadata: { LoRaWAN: { FPort: 0 } },
    },
    body: true,
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
  operationName: "SendDataToMulticastGroup",
})) as any;

export type SendDataToWirelessDeviceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a decrypted application data frame to a device.
 */
export const sendDataToWirelessDevice: API.OperationMethod<
  SendDataToWirelessDeviceRequest,
  SendDataToWirelessDeviceResponse,
  SendDataToWirelessDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /wireless-devices/{Id}/data",
    input: {
      Id: 0,
      TransmitMode: 0,
      PayloadData: 0,
      WirelessMetadata: {
        LoRaWAN: {
          FPort: 0,
          ParticipatingGateways: {
            DownlinkMode: 0,
            GatewayList: D.list({ GatewayId: 0, DownlinkFrequency: 0 }),
            TransmissionInterval: 0,
          },
        },
        Sidewalk: { Seq: 0, MessageType: 0, AckModeRetryDurationSecs: 0 },
      },
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDataToWirelessDevice",
})) as any;

export type StartBulkAssociateWirelessDeviceWithMulticastGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a bulk association of all qualifying wireless devices with a multicast
 * group.
 */
export const startBulkAssociateWirelessDeviceWithMulticastGroup: API.OperationMethod<
  StartBulkAssociateWirelessDeviceWithMulticastGroupRequest,
  StartBulkAssociateWirelessDeviceWithMulticastGroupResponse,
  StartBulkAssociateWirelessDeviceWithMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /multicast-groups/{Id}/bulk",
    input: { Id: 0, QueryString: 0, Tags: D.list(i_Tag) },
    body: true,
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
  operationName: "StartBulkAssociateWirelessDeviceWithMulticastGroup",
})) as any;

export type StartBulkDisassociateWirelessDeviceFromMulticastGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a bulk disassociatin of all qualifying wireless devices from a multicast
 * group.
 */
export const startBulkDisassociateWirelessDeviceFromMulticastGroup: API.OperationMethod<
  StartBulkDisassociateWirelessDeviceFromMulticastGroupRequest,
  StartBulkDisassociateWirelessDeviceFromMulticastGroupResponse,
  StartBulkDisassociateWirelessDeviceFromMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /multicast-groups/{Id}/bulk",
    input: { Id: 0, QueryString: 0, Tags: D.list(i_Tag) },
    body: true,
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
  operationName: "StartBulkDisassociateWirelessDeviceFromMulticastGroup",
})) as any;

export type StartFuotaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a FUOTA task.
 */
export const startFuotaTask: API.OperationMethod<
  StartFuotaTaskRequest,
  StartFuotaTaskResponse,
  StartFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /fuota-tasks/{Id}",
    input: { Id: 0, LoRaWAN: { StartTime: D.tsAs("date-time") } },
    body: true,
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
  operationName: "StartFuotaTask",
})) as any;

export type StartMulticastGroupSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a multicast group session.
 */
export const startMulticastGroupSession: API.OperationMethod<
  StartMulticastGroupSessionRequest,
  StartMulticastGroupSessionResponse,
  StartMulticastGroupSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /multicast-groups/{Id}/session",
    input: {
      Id: 0,
      LoRaWAN: {
        DlDr: 0,
        DlFreq: 0,
        SessionStartTime: D.tsAs("date-time"),
        SessionTimeout: 0,
        PingSlotPeriod: 0,
      },
    },
    body: true,
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
  operationName: "StartMulticastGroupSession",
})) as any;

export type StartSingleWirelessDeviceImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start import task for a single wireless device.
 */
export const startSingleWirelessDeviceImportTask: API.OperationMethod<
  StartSingleWirelessDeviceImportTaskRequest,
  StartSingleWirelessDeviceImportTaskResponse,
  StartSingleWirelessDeviceImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /wireless_single_device_import_task",
    input: {
      DestinationName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      DeviceName: 0,
      Tags: D.list(i_Tag),
      Positioning: 0,
      Sidewalk: {
        SidewalkManufacturingSn: 0,
        Positioning: i_SidewalkPositioning,
      },
    },
    body: true,
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
  operationName: "StartSingleWirelessDeviceImportTask",
})) as any;

export type StartWirelessDeviceImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start import task for provisioning Sidewalk devices in bulk using an S3 CSV
 * file.
 */
export const startWirelessDeviceImportTask: API.OperationMethod<
  StartWirelessDeviceImportTaskRequest,
  StartWirelessDeviceImportTaskResponse,
  StartWirelessDeviceImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /wireless_device_import_task",
    input: {
      DestinationName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      Positioning: 0,
      Sidewalk: {
        DeviceCreationFile: 0,
        Role: 0,
        Positioning: i_SidewalkPositioning,
      },
    },
    body: true,
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
  operationName: "StartWirelessDeviceImportTask",
})) as any;

export type TagResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags",
    input: { ResourceArn: D.m({ query: "resourceArn" }), Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestWirelessDeviceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Simulates a provisioned device by sending an uplink data payload of
 * `Hello`.
 */
export const testWirelessDevice: API.OperationMethod<
  TestWirelessDeviceRequest,
  TestWirelessDeviceResponse,
  TestWirelessDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /wireless-devices/{Id}/test",
    input: { Id: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestWirelessDevice",
})) as any;

export type UntagResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags",
    input: {
      ResourceArn: D.m({ query: "resourceArn" }),
      TagKeys: D.m({ query: "tagKeys" }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates properties of a destination.
 */
export const updateDestination: API.OperationMethod<
  UpdateDestinationRequest,
  UpdateDestinationResponse,
  UpdateDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /destinations/{Name}",
    input: {
      Name: 0,
      ExpressionType: 0,
      Expression: 0,
      Description: 0,
      RoleArn: 0,
    },
    body: true,
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
  operationName: "UpdateDestination",
})) as any;

export type UpdateEventConfigurationByResourceTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the event configuration based on resource types.
 */
export const updateEventConfigurationByResourceTypes: API.OperationMethod<
  UpdateEventConfigurationByResourceTypesRequest,
  UpdateEventConfigurationByResourceTypesResponse,
  UpdateEventConfigurationByResourceTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /event-configurations-resource-types",
    input: {
      DeviceRegistrationState: {
        Sidewalk: i_SidewalkResourceTypeEventConfiguration,
      },
      Proximity: { Sidewalk: i_SidewalkResourceTypeEventConfiguration },
      Join: { LoRaWAN: { WirelessDeviceEventTopic: 0 } },
      ConnectionStatus: { LoRaWAN: { WirelessGatewayEventTopic: 0 } },
      MessageDeliveryStatus: {
        Sidewalk: i_SidewalkResourceTypeEventConfiguration,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventConfigurationByResourceTypes",
})) as any;

export type UpdateFuotaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates properties of a FUOTA task.
 */
export const updateFuotaTask: API.OperationMethod<
  UpdateFuotaTaskRequest,
  UpdateFuotaTaskResponse,
  UpdateFuotaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /fuota-tasks/{Id}",
    input: {
      Id: 0,
      Name: 0,
      Description: 0,
      LoRaWAN: i_LoRaWANFuotaTask,
      FirmwareUpdateImage: 0,
      FirmwareUpdateRole: 0,
      RedundancyPercent: 0,
      FragmentSizeBytes: 0,
      FragmentIntervalMS: 0,
      Descriptor: 0,
    },
    body: true,
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
  operationName: "UpdateFuotaTask",
})) as any;

export type UpdateLogLevelsByResourceTypesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set default log level, or log levels by resource types. This can be for wireless
 * device, wireless gateway, or FUOTA task log options, and is used to control the log
 * messages that'll be displayed in CloudWatch.
 */
export const updateLogLevelsByResourceTypes: API.OperationMethod<
  UpdateLogLevelsByResourceTypesRequest,
  UpdateLogLevelsByResourceTypesResponse,
  UpdateLogLevelsByResourceTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /log-levels",
    input: {
      DefaultLogLevel: 0,
      FuotaTaskLogOptions: D.list({
        Type: 0,
        LogLevel: 0,
        Events: D.list({ Event: 0, LogLevel: 0 }),
      }),
      WirelessDeviceLogOptions: D.list({
        Type: 0,
        LogLevel: 0,
        Events: D.list({ Event: 0, LogLevel: 0 }),
      }),
      WirelessGatewayLogOptions: D.list({
        Type: 0,
        LogLevel: 0,
        Events: D.list({ Event: 0, LogLevel: 0 }),
      }),
    },
    body: true,
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
  operationName: "UpdateLogLevelsByResourceTypes",
})) as any;

export type UpdateMetricConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the summary metric configuration.
 */
export const updateMetricConfiguration: API.OperationMethod<
  UpdateMetricConfigurationRequest,
  UpdateMetricConfigurationResponse,
  UpdateMetricConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /metric-configuration",
    input: { SummaryMetric: { Status: 0 } },
    body: true,
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
  operationName: "UpdateMetricConfiguration",
})) as any;

export type UpdateMulticastGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates properties of a multicast group session.
 */
export const updateMulticastGroup: API.OperationMethod<
  UpdateMulticastGroupRequest,
  UpdateMulticastGroupResponse,
  UpdateMulticastGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /multicast-groups/{Id}",
    input: { Id: 0, Name: 0, Description: 0, LoRaWAN: i_LoRaWANMulticast },
    body: true,
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
  operationName: "UpdateMulticastGroup",
})) as any;

export type UpdateNetworkAnalyzerConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update network analyzer configuration.
 */
export const updateNetworkAnalyzerConfiguration: API.OperationMethod<
  UpdateNetworkAnalyzerConfigurationRequest,
  UpdateNetworkAnalyzerConfigurationResponse,
  UpdateNetworkAnalyzerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /network-analyzer-configurations/{ConfigurationName}",
    input: {
      ConfigurationName: 0,
      TraceContent: i_TraceContent,
      WirelessDevicesToAdd: 0,
      WirelessDevicesToRemove: 0,
      WirelessGatewaysToAdd: 0,
      WirelessGatewaysToRemove: 0,
      Description: 0,
      MulticastGroupsToAdd: 0,
      MulticastGroupsToRemove: 0,
    },
    body: true,
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
  operationName: "UpdateNetworkAnalyzerConfiguration",
})) as any;

export type UpdatePartnerAccountError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates properties of a partner account.
 */
export const updatePartnerAccount: API.OperationMethod<
  UpdatePartnerAccountRequest,
  UpdatePartnerAccountResponse,
  UpdatePartnerAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /partner-accounts/{PartnerAccountId}",
    input: {
      Sidewalk: { AppServerPrivateKey: 0 },
      PartnerAccountId: 0,
      PartnerType: D.m({ query: "partnerType" }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePartnerAccount",
})) as any;

export type UpdatePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the position information of a resource.
 *
 * This action is no longer supported. Calls to update the position information
 * should use the UpdateResourcePosition API operation instead.
 */
export const updatePosition: API.OperationMethod<
  UpdatePositionRequest,
  UpdatePositionResponse,
  UpdatePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /positions/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
      Position: 0,
    },
    body: true,
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
  operationName: "UpdatePosition",
})) as any;

export type UpdateResourceEventConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the event configuration for a particular resource identifier.
 */
export const updateResourceEventConfiguration: API.OperationMethod<
  UpdateResourceEventConfigurationRequest,
  UpdateResourceEventConfigurationResponse,
  UpdateResourceEventConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /event-configurations/{Identifier}",
    input: {
      Identifier: 0,
      IdentifierType: D.m({ query: "identifierType" }),
      PartnerType: D.m({ query: "partnerType" }),
      DeviceRegistrationState: {
        Sidewalk: i_SidewalkEventNotificationConfigurations,
        WirelessDeviceIdEventTopic: 0,
      },
      Proximity: {
        Sidewalk: i_SidewalkEventNotificationConfigurations,
        WirelessDeviceIdEventTopic: 0,
      },
      Join: { LoRaWAN: { DevEuiEventTopic: 0 }, WirelessDeviceIdEventTopic: 0 },
      ConnectionStatus: {
        LoRaWAN: { GatewayEuiEventTopic: 0 },
        WirelessGatewayIdEventTopic: 0,
      },
      MessageDeliveryStatus: {
        Sidewalk: i_SidewalkEventNotificationConfigurations,
        WirelessDeviceIdEventTopic: 0,
      },
    },
    body: true,
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
  operationName: "UpdateResourceEventConfiguration",
})) as any;

export type UpdateResourcePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the position information of a given wireless device or a wireless gateway
 * resource. The position coordinates are based on the World Geodetic System
 * (WGS84).
 */
export const updateResourcePosition: API.OperationMethod<
  UpdateResourcePositionRequest,
  UpdateResourcePositionResponse,
  UpdateResourcePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /resource-positions/{ResourceIdentifier}",
    input: {
      ResourceIdentifier: 0,
      ResourceType: D.m({ query: "resourceType" }),
      GeoJsonPayload: D.m({ payload: true, shape: D.stream }),
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
  operationName: "UpdateResourcePosition",
})) as any;

export type UpdateWirelessDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates properties of a wireless device.
 */
export const updateWirelessDevice: API.OperationMethod<
  UpdateWirelessDeviceRequest,
  UpdateWirelessDeviceResponse,
  UpdateWirelessDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /wireless-devices/{Id}",
    input: {
      Id: 0,
      DestinationName: 0,
      Name: 0,
      Description: 0,
      LoRaWAN: {
        DeviceProfileId: 0,
        ServiceProfileId: 0,
        AbpV1_1: { FCntStart: 0 },
        AbpV1_0_x: { FCntStart: 0 },
        FPorts: {
          Positioning: i_Positioning,
          Applications: D.list(i_ApplicationConfig),
        },
      },
      Positioning: 0,
      Sidewalk: { Positioning: i_SidewalkPositioning },
    },
    body: true,
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
  operationName: "UpdateWirelessDevice",
})) as any;

export type UpdateWirelessDeviceImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an import task to add more devices to the task.
 */
export const updateWirelessDeviceImportTask: API.OperationMethod<
  UpdateWirelessDeviceImportTaskRequest,
  UpdateWirelessDeviceImportTaskResponse,
  UpdateWirelessDeviceImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /wireless_device_import_task/{Id}",
    input: { Id: 0, Sidewalk: { DeviceCreationFile: 0 } },
    body: true,
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
  operationName: "UpdateWirelessDeviceImportTask",
})) as any;

export type UpdateWirelessGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates properties of a wireless gateway.
 */
export const updateWirelessGateway: API.OperationMethod<
  UpdateWirelessGatewayRequest,
  UpdateWirelessGatewayResponse,
  UpdateWirelessGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /wireless-gateways/{Id}",
    input: {
      Id: 0,
      Name: 0,
      Description: 0,
      JoinEuiFilters: 0,
      NetIdFilters: 0,
      MaxEirp: 0,
    },
    body: true,
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
  operationName: "UpdateWirelessGateway",
})) as any;

const i_ApplicationConfig: D.LazyStruct = () => ({
  FPort: 0,
  Type: 0,
  DestinationName: 0,
});
const i_LoRaWANFuotaTask: D.LazyStruct = () => ({ RfRegion: 0 });
const i_LoRaWANGatewayVersion: D.LazyStruct = () => ({
  PackageVersion: 0,
  Model: 0,
  Station: 0,
});
const i_LoRaWANMulticast: D.LazyStruct = () => ({
  RfRegion: 0,
  DlClass: 0,
  ParticipatingGateways: { GatewayList: 0, TransmissionInterval: 0 },
  DefaultSessionParameters: { DlDr: 0, DlFreq: 0 },
});
const i_Positioning: D.LazyStruct = () => ({
  ClockSync: 0,
  Stream: 0,
  Gnss: 0,
});
const i_SidewalkEventNotificationConfigurations: D.LazyStruct = () => ({
  AmazonIdEventTopic: 0,
});
const i_SidewalkPositioning: D.LazyStruct = () => ({ DestinationName: 0 });
const i_SidewalkResourceTypeEventConfiguration: D.LazyStruct = () => ({
  WirelessDeviceEventTopic: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TraceContent: D.LazyStruct = () => ({
  WirelessDeviceFrameInfo: 0,
  LogLevel: 0,
  MulticastFrameInfo: 0,
});
const o_SidewalkAccountInfoWithFingerprint: D.LazyStruct = () => ({
  Fingerprint: D.secret,
});
