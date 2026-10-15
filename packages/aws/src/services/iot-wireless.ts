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
  sdkId: "IoT Wireless",
  serviceShapeName: "iotwireless",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iotwireless" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-11-22");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://api.iotwireless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://api.iotwireless.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://api.iotwireless.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type EventNotificationTopicStatus = "Enabled" | "Disabled" | (string & {});
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
export type WirelessGatewayEvent = "CUPS_Request" | "Certificate" | (string & {});
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
export type SummaryMetricConfigurationStatus = "Enabled" | "Disabled" | (string & {});
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
export type AggregationPeriod = "OneHour" | "OneDay" | "OneWeek" | (string & {});
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
export type PositionResourceType = "WirelessDevice" | "WirelessGateway" | (string & {});
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
export type PositionConfigurationStatus = "Enabled" | "Disabled" | (string & {});
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
export interface GnssCapture {
  Payload: string;
  CaptureTime?: number;
}
export type GnssCaptures = GnssCapture[];
export interface GnssMultiFrame {
  Captures: GnssCapture[];
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
  GnssMultiFrame?: GnssMultiFrame;
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
export type Event = "discovered" | "lost" | "ack" | "nack" | "passthrough" | (string & {});
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
export type OnboardStatus = "INITIALIZED" | "PENDING" | "ONBOARDED" | "FAILED" | (string & {});
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
export type DownlinkMode = "SEQUENTIAL" | "CONCURRENT" | "USING_UPLINK_GATEWAY" | (string & {});
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
export type WirelessGatewayTaskDefinitionList = UpdateWirelessGatewayTaskEntry[];
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
  input: __S(3457, __c108, 1) as any as S.Schema<AssociateAwsAccountWithPartnerAccountRequest>,
  output: __S(3458, __c108, 2) as any as S.Schema<AssociateAwsAccountWithPartnerAccountResponse>,
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
}));

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
  input: __S(3936, __c123, 0) as any as S.Schema<AssociateMulticastGroupWithFuotaTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<AssociateMulticastGroupWithFuotaTaskResponse>,
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
}));

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
  input: __S(4352, __c136, 0) as any as S.Schema<AssociateWirelessDeviceWithFuotaTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<AssociateWirelessDeviceWithFuotaTaskResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateWirelessDeviceWithMulticastGroupRequest>,
  output: __S(
    3968,
    __c124,
    0,
  ) as any as S.Schema<AssociateWirelessDeviceWithMulticastGroupResponse>,
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
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<AssociateWirelessDeviceWithThingRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<AssociateWirelessDeviceWithThingResponse>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<AssociateWirelessGatewayWithCertificateRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<AssociateWirelessGatewayWithCertificateResponse>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<AssociateWirelessGatewayWithThingRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<AssociateWirelessGatewayWithThingResponse>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<CancelMulticastGroupSessionRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<CancelMulticastGroupSessionResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<CreateDestinationRequest>,
  output: __S(800, __c25, 0) as any as S.Schema<CreateDestinationResponse>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<CreateDeviceProfileRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateDeviceProfileResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<CreateFuotaTaskRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateFuotaTaskResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<CreateMulticastGroupRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateMulticastGroupResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<CreateNetworkAnalyzerConfigurationRequest>,
  output: __S(800, __c25, 0) as any as S.Schema<CreateNetworkAnalyzerConfigurationResponse>,
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
}));

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
  input: __S(1217, __c38, 1) as any as S.Schema<CreateServiceProfileRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateServiceProfileResponse>,
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
}));

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
  input: __S(1249, __c39, 1) as any as S.Schema<CreateWirelessDeviceRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateWirelessDeviceResponse>,
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
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<CreateWirelessGatewayRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateWirelessGatewayResponse>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<CreateWirelessGatewayTaskRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<CreateWirelessGatewayTaskResponse>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<CreateWirelessGatewayTaskDefinitionRequest>,
  output: __S(1536, __c48, 0) as any as S.Schema<CreateWirelessGatewayTaskDefinitionResponse>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<DeleteDestinationRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteDestinationResponse>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<DeleteDeviceProfileRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteDeviceProfileResponse>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<DeleteFuotaTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteFuotaTaskResponse>,
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
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<DeleteMulticastGroupRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteMulticastGroupResponse>,
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
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<DeleteNetworkAnalyzerConfigurationRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteNetworkAnalyzerConfigurationResponse>,
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
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<DeleteQueuedMessagesRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteQueuedMessagesResponse>,
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
}));

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
  input: __S(1824, __c57, 0) as any as S.Schema<DeleteServiceProfileRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteServiceProfileResponse>,
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
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<DeleteWirelessDeviceRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteWirelessDeviceResponse>,
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
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<DeleteWirelessDeviceImportTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteWirelessDeviceImportTaskResponse>,
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
}));

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
  input: __S(1920, __c60, 0) as any as S.Schema<DeleteWirelessGatewayRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteWirelessGatewayResponse>,
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
}));

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
  input: __S(1952, __c61, 0) as any as S.Schema<DeleteWirelessGatewayTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteWirelessGatewayTaskResponse>,
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
}));

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
  input: __S(1984, __c62, 0) as any as S.Schema<DeleteWirelessGatewayTaskDefinitionRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeleteWirelessGatewayTaskDefinitionResponse>,
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
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<DeregisterWirelessDeviceRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DeregisterWirelessDeviceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterWirelessDevice",
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<DisassociateAwsAccountFromPartnerAccountRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DisassociateAwsAccountFromPartnerAccountResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAwsAccountFromPartnerAccount",
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<DisassociateMulticastGroupFromFuotaTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DisassociateMulticastGroupFromFuotaTaskResponse>,
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
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<DisassociateWirelessDeviceFromFuotaTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DisassociateWirelessDeviceFromFuotaTaskResponse>,
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
}));

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
  input: __S(
    2144,
    __c67,
    0,
  ) as any as S.Schema<DisassociateWirelessDeviceFromMulticastGroupRequest>,
  output: __S(
    3968,
    __c124,
    0,
  ) as any as S.Schema<DisassociateWirelessDeviceFromMulticastGroupResponse>,
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
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<DisassociateWirelessDeviceFromThingRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DisassociateWirelessDeviceFromThingResponse>,
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
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<DisassociateWirelessGatewayFromCertificateRequest>,
  output: __S(
    3968,
    __c124,
    0,
  ) as any as S.Schema<DisassociateWirelessGatewayFromCertificateResponse>,
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
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<DisassociateWirelessGatewayFromThingRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<DisassociateWirelessGatewayFromThingResponse>,
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
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<GetDestinationRequest>,
  output: __S(2273, __c71, 1) as any as S.Schema<GetDestinationResponse>,
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
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<GetDeviceProfileRequest>,
  output: __S(2308, __c72, 4) as any as S.Schema<GetDeviceProfileResponse>,
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
}));

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
  input: __S(2336, __c73, 0) as any as S.Schema<GetEventConfigurationByResourceTypesRequest>,
  output: __S(2337, __c73, 1) as any as S.Schema<GetEventConfigurationByResourceTypesResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventConfigurationByResourceTypes",
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<GetFuotaTaskRequest>,
  output: __S(2402, __c75, 2) as any as S.Schema<GetFuotaTaskResponse>,
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
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<GetLogLevelsByResourceTypesRequest>,
  output: __S(2433, __c76, 1) as any as S.Schema<GetLogLevelsByResourceTypesResponse>,
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
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<GetMetricConfigurationRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<GetMetricConfigurationResponse>,
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
}));

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
  input: __S(2564, __c80, 4) as any as S.Schema<GetMetricsRequest>,
  output: __S(2570, __c80, 10) as any as S.Schema<GetMetricsResponse>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<GetMulticastGroupRequest>,
  output: __S(2594, __c81, 2) as any as S.Schema<GetMulticastGroupResponse>,
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
}));

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
  input: __S(2624, __c82, 0) as any as S.Schema<GetMulticastGroupSessionRequest>,
  output: __S(2625, __c82, 1) as any as S.Schema<GetMulticastGroupSessionResponse>,
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
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<GetNetworkAnalyzerConfigurationRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<GetNetworkAnalyzerConfigurationResponse>,
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
}));

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
  input: __S(2720, __c85, 0) as any as S.Schema<GetPartnerAccountRequest>,
  output: __S(2721, __c85, 1) as any as S.Schema<GetPartnerAccountResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartnerAccount",
}));

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
  input: __S(2784, __c87, 0) as any as S.Schema<GetPositionRequest>,
  output: __S(2786, __c87, 2) as any as S.Schema<GetPositionResponse>,
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
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<GetPositionConfigurationRequest>,
  output: __S(2817, __c88, 1) as any as S.Schema<GetPositionConfigurationResponse>,
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
}));

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
  input: __S(2916, __c91, 4) as any as S.Schema<GetPositionEstimateRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<GetPositionEstimateResponse>,
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
}));

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
  input: __S(2976, __c93, 0) as any as S.Schema<GetResourceEventConfigurationRequest>,
  output: __S(3008, __c94, 0) as any as S.Schema<GetResourceEventConfigurationResponse>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<GetResourceLogLevelRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<GetResourceLogLevelResponse>,
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
}));

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
  input: __S(3104, __c97, 0) as any as S.Schema<GetResourcePositionRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<GetResourcePositionResponse>,
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
}));

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
  input: __S(3136, __c98, 0) as any as S.Schema<GetServiceEndpointRequest>,
  output: __S(3137, __c98, 1) as any as S.Schema<GetServiceEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceEndpoint",
}));

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
  input: __S(3168, __c99, 0) as any as S.Schema<GetServiceProfileRequest>,
  output: __S(3170, __c99, 2) as any as S.Schema<GetServiceProfileResponse>,
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
}));

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
  input: __S(3200, __c100, 0) as any as S.Schema<GetWirelessDeviceRequest>,
  output: __S(3202, __c100, 2) as any as S.Schema<GetWirelessDeviceResponse>,
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
}));

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
  input: __S(3264, __c102, 0) as any as S.Schema<GetWirelessDeviceImportTaskRequest>,
  output: __S(3297, __c103, 1) as any as S.Schema<GetWirelessDeviceImportTaskResponse>,
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
}));

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
  input: __S(3328, __c104, 0) as any as S.Schema<GetWirelessDeviceStatisticsRequest>,
  output: __S(3335, __c104, 7) as any as S.Schema<GetWirelessDeviceStatisticsResponse>,
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
}));

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
  input: __S(3360, __c105, 0) as any as S.Schema<GetWirelessGatewayRequest>,
  output: __S(3361, __c105, 1) as any as S.Schema<GetWirelessGatewayResponse>,
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
}));

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
  input: __S(3392, __c106, 0) as any as S.Schema<GetWirelessGatewayCertificateRequest>,
  output: __S(3393, __c106, 1) as any as S.Schema<GetWirelessGatewayCertificateResponse>,
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
}));

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
  input: __S(3424, __c107, 0) as any as S.Schema<GetWirelessGatewayFirmwareInformationRequest>,
  output: __S(3426, __c107, 2) as any as S.Schema<GetWirelessGatewayFirmwareInformationResponse>,
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
}));

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
  input: __S(3520, __c110, 0) as any as S.Schema<GetWirelessGatewayStatisticsRequest>,
  output: __S(3521, __c110, 1) as any as S.Schema<GetWirelessGatewayStatisticsResponse>,
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
}));

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
  input: __S(3552, __c111, 0) as any as S.Schema<GetWirelessGatewayTaskRequest>,
  output: __S(3553, __c111, 1) as any as S.Schema<GetWirelessGatewayTaskResponse>,
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
}));

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
  input: __S(3584, __c112, 0) as any as S.Schema<GetWirelessGatewayTaskDefinitionRequest>,
  output: __S(3585, __c112, 1) as any as S.Schema<GetWirelessGatewayTaskDefinitionResponse>,
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
}));

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
  input: __S(3616, __c113, 0) as any as S.Schema<ListDestinationsRequest>,
  output: __S(3619, __c113, 3) as any as S.Schema<ListDestinationsResponse>,
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
  input: __S(3648, __c114, 0) as any as S.Schema<ListDeviceProfilesRequest>,
  output: __S(3649, __c114, 1) as any as S.Schema<ListDeviceProfilesResponse>,
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
  input: __S(3712, __c116, 0) as any as S.Schema<ListDevicesForWirelessDeviceImportTaskRequest>,
  output: __S(3716, __c116, 4) as any as S.Schema<ListDevicesForWirelessDeviceImportTaskResponse>,
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
}));

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
  input: __S(3776, __c118, 0) as any as S.Schema<ListEventConfigurationsRequest>,
  output: __S(3779, __c118, 3) as any as S.Schema<ListEventConfigurationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventConfigurations",
}));

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
  input: __S(3808, __c119, 0) as any as S.Schema<ListFuotaTasksRequest>,
  output: __S(3809, __c119, 1) as any as S.Schema<ListFuotaTasksResponse>,
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
  input: __S(3872, __c121, 0) as any as S.Schema<ListMulticastGroupsRequest>,
  output: __S(3873, __c121, 1) as any as S.Schema<ListMulticastGroupsResponse>,
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
  input: __S(3904, __c122, 0) as any as S.Schema<ListMulticastGroupsByFuotaTaskRequest>,
  output: __S(3907, __c122, 3) as any as S.Schema<ListMulticastGroupsByFuotaTaskResponse>,
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
  input: __S(4000, __c125, 0) as any as S.Schema<ListNetworkAnalyzerConfigurationsRequest>,
  output: __S(4002, __c125, 2) as any as S.Schema<ListNetworkAnalyzerConfigurationsResponse>,
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
  input: __S(4032, __c126, 0) as any as S.Schema<ListPartnerAccountsRequest>,
  output: __S(4034, __c126, 2) as any as S.Schema<ListPartnerAccountsResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartnerAccounts",
}));

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
  input: __S(4064, __c127, 0) as any as S.Schema<ListPositionConfigurationsRequest>,
  output: __S(4067, __c127, 3) as any as S.Schema<ListPositionConfigurationsResponse>,
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
  input: __S(4096, __c128, 0) as any as S.Schema<ListQueuedMessagesRequest>,
  output: __S(4099, __c128, 3) as any as S.Schema<ListQueuedMessagesResponse>,
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
  input: __S(4160, __c130, 0) as any as S.Schema<ListServiceProfilesRequest>,
  output: __S(4161, __c130, 1) as any as S.Schema<ListServiceProfilesResponse>,
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
  input: __S(4192, __c131, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(4193, __c131, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(4224, __c132, 0) as any as S.Schema<ListWirelessDeviceImportTasksRequest>,
  output: __S(4226, __c132, 2) as any as S.Schema<ListWirelessDeviceImportTasksResponse>,
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
}));

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
  input: __S(4256, __c133, 0) as any as S.Schema<ListWirelessDevicesRequest>,
  output: __S(4261, __c133, 5) as any as S.Schema<ListWirelessDevicesResponse>,
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
  input: __S(4288, __c134, 0) as any as S.Schema<ListWirelessGatewaysRequest>,
  output: __S(4291, __c134, 3) as any as S.Schema<ListWirelessGatewaysResponse>,
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
  input: __S(4320, __c135, 0) as any as S.Schema<ListWirelessGatewayTaskDefinitionsRequest>,
  output: __S(4324, __c135, 4) as any as S.Schema<ListWirelessGatewayTaskDefinitionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWirelessGatewayTaskDefinitions",
}));

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
  input: __S(4386, __c137, 2) as any as S.Schema<PutPositionConfigurationRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<PutPositionConfigurationResponse>,
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
}));

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
  input: __S(4416, __c138, 0) as any as S.Schema<PutResourceLogLevelRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<PutResourceLogLevelResponse>,
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
}));

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
  input: __S(4448, __c139, 0) as any as S.Schema<ResetAllResourceLogLevelsRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<ResetAllResourceLogLevelsResponse>,
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
}));

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
  input: __S(4480, __c140, 0) as any as S.Schema<ResetResourceLogLevelRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<ResetResourceLogLevelResponse>,
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
}));

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
  input: __S(4514, __c141, 2) as any as S.Schema<SendDataToMulticastGroupRequest>,
  output: __S(4544, __c142, 0) as any as S.Schema<SendDataToMulticastGroupResponse>,
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
}));

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
  input: __S(4578, __c143, 2) as any as S.Schema<SendDataToWirelessDeviceRequest>,
  output: __S(4544, __c142, 0) as any as S.Schema<SendDataToWirelessDeviceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDataToWirelessDevice",
}));

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
  input: __S(
    4608,
    __c144,
    0,
  ) as any as S.Schema<StartBulkAssociateWirelessDeviceWithMulticastGroupRequest>,
  output: __S(
    3968,
    __c124,
    0,
  ) as any as S.Schema<StartBulkAssociateWirelessDeviceWithMulticastGroupResponse>,
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
}));

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
  input: __S(
    4640,
    __c145,
    0,
  ) as any as S.Schema<StartBulkDisassociateWirelessDeviceFromMulticastGroupRequest>,
  output: __S(
    3968,
    __c124,
    0,
  ) as any as S.Schema<StartBulkDisassociateWirelessDeviceFromMulticastGroupResponse>,
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
}));

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
  input: __S(4673, __c146, 1) as any as S.Schema<StartFuotaTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<StartFuotaTaskResponse>,
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
}));

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
  input: __S(4704, __c147, 0) as any as S.Schema<StartMulticastGroupSessionRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<StartMulticastGroupSessionResponse>,
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
}));

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
  input: __S(33, __c1, 1) as any as S.Schema<StartSingleWirelessDeviceImportTaskRequest>,
  output: __S(1536, __c48, 0) as any as S.Schema<StartSingleWirelessDeviceImportTaskResponse>,
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
}));

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
  input: __S(65, __c2, 1) as any as S.Schema<StartWirelessDeviceImportTaskRequest>,
  output: __S(1536, __c48, 0) as any as S.Schema<StartWirelessDeviceImportTaskResponse>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<TestWirelessDeviceRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<TestWirelessDeviceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestWirelessDevice",
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<UpdateDestinationRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateDestinationResponse>,
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
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<UpdateEventConfigurationByResourceTypesRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateEventConfigurationByResourceTypesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventConfigurationByResourceTypes",
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<UpdateFuotaTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateFuotaTaskResponse>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<UpdateLogLevelsByResourceTypesRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateLogLevelsByResourceTypesResponse>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<UpdateMetricConfigurationRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateMetricConfigurationResponse>,
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
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<UpdateMulticastGroupRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateMulticastGroupResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<UpdateNetworkAnalyzerConfigurationRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateNetworkAnalyzerConfigurationResponse>,
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
}));

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
  input: __S(449, __c14, 1) as any as S.Schema<UpdatePartnerAccountRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdatePartnerAccountResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePartnerAccount",
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<UpdatePositionRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdatePositionResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<UpdateResourceEventConfigurationRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateResourceEventConfigurationResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<UpdateResourcePositionRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateResourcePositionResponse>,
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
}));

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
  input: __S(579, __c18, 3) as any as S.Schema<UpdateWirelessDeviceRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateWirelessDeviceResponse>,
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
}));

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
  input: __S(609, __c19, 1) as any as S.Schema<UpdateWirelessDeviceImportTaskRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateWirelessDeviceImportTaskResponse>,
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
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<UpdateWirelessGatewayRequest>,
  output: __S(3968, __c124, 0) as any as S.Schema<UpdateWirelessGatewayResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), WirelessDeviceId: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/multicast-groups/{Id}/wireless-device" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateWirelessDeviceWithMulticastGroupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SidewalkManufacturingSn: S.optional(S.String),
          Positioning: S.optional(__S(1344, __c42, 0)),
        }),
      ).annotate({ identifier: "SidewalkSingleStartImportInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DestinationName: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          DeviceName: S.optional(S.String),
          Tags: S.optional(__S(3489, __c109, 1)),
          Positioning: S.optional(S.String),
          Sidewalk: __S(32, __c1, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/wireless_single_device_import_task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSingleWirelessDeviceImportTaskRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceCreationFile: S.optional(S.String),
          Role: S.optional(S.String),
          Positioning: S.optional(__S(1344, __c42, 0)),
        }),
      ).annotate({ identifier: "SidewalkStartImportInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DestinationName: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3489, __c109, 1)),
          Positioning: S.optional(S.String),
          Sidewalk: __S(64, __c2, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/wireless_device_import_task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartWirelessDeviceImportTaskRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          Tags: __S(3489, __c109, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/tags" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/wireless-devices/{Id}/test" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestWirelessDeviceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Result: S.optional(S.String) })).annotate({
        identifier: "TestWirelessDeviceResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          TagKeys: __S(1088, __c34, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(T.all(T.Http({ method: "DELETE", uri: "/tags" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          ExpressionType: S.optional(S.String),
          Expression: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/destinations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDestinationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceRegistrationState: S.optional(__S(2369, __c74, 1)),
          Proximity: S.optional(__S(2369, __c74, 1)),
          Join: S.optional(__S(2370, __c74, 2)),
          ConnectionStatus: S.optional(__S(2372, __c74, 4)),
          MessageDeliveryStatus: S.optional(__S(2369, __c74, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/event-configurations-resource-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEventConfigurationByResourceTypesRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LoRaWAN: S.optional(__S(992, __c31, 0)),
          FirmwareUpdateImage: S.optional(S.String),
          FirmwareUpdateRole: S.optional(S.String),
          RedundancyPercent: S.optional(S.Number),
          FragmentSizeBytes: S.optional(S.Number),
          FragmentIntervalMS: S.optional(S.Number),
          Descriptor: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/fuota-tasks/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFuotaTaskRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DefaultLogLevel: S.optional(S.String),
          FuotaTaskLogOptions: S.optional(__S(2467, __c77, 3)),
          WirelessDeviceLogOptions: S.optional(__S(2467, __c77, 3)),
          WirelessGatewayLogOptions: S.optional(__S(2467, __c77, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/log-levels" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateLogLevelsByResourceTypesRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SummaryMetric: S.optional(__S(2528, __c79, 0)) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/metric-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMetricConfigurationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), ThingArn: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/wireless-devices/{Id}/thing" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateWirelessDeviceWithThingRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LoRaWAN: S.optional(__S(1056, __c33, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/multicast-groups/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMulticastGroupRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationName: S.String.pipe(T.HttpLabel("ConfigurationName")),
          TraceContent: S.optional(__S(1184, __c37, 0)),
          WirelessDevicesToAdd: S.optional(__S(1088, __c34, 0)),
          WirelessDevicesToRemove: S.optional(__S(1088, __c34, 0)),
          WirelessGatewaysToAdd: S.optional(__S(1088, __c34, 0)),
          WirelessGatewaysToRemove: S.optional(__S(1088, __c34, 0)),
          Description: S.optional(S.String),
          MulticastGroupsToAdd: S.optional(__S(1088, __c34, 0)),
          MulticastGroupsToRemove: S.optional(__S(1088, __c34, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/network-analyzer-configurations/{ConfigurationName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNetworkAnalyzerConfigurationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppServerPrivateKey: S.optional(SensitiveString) }),
      ).annotate({ identifier: "SidewalkUpdateAccount" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Sidewalk: __S(448, __c14, 0),
          PartnerAccountId: S.String.pipe(T.HttpLabel("PartnerAccountId")),
          PartnerType: S.String.pipe(T.HttpQuery("partnerType")),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/partner-accounts/{PartnerAccountId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePartnerAccountRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
          Position: __S(896, __c28, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/positions/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePositionRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          IdentifierType: S.String.pipe(T.HttpQuery("identifierType")),
          PartnerType: S.optional(S.String).pipe(T.HttpQuery("partnerType")),
          DeviceRegistrationState: S.optional(__S(3041, __c95, 1)),
          Proximity: S.optional(__S(3041, __c95, 1)),
          Join: S.optional(__S(3043, __c95, 3)),
          ConnectionStatus: S.optional(__S(3045, __c95, 5)),
          MessageDeliveryStatus: S.optional(__S(3041, __c95, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/event-configurations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResourceEventConfigurationRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
          GeoJsonPayload: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/resource-positions/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResourcePositionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FCntStart: S.optional(S.Number) })).annotate({
        identifier: "UpdateAbpV1_1",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Positioning: S.optional(__S(1312, __c41, 0)),
          Applications: S.optional(__S(1314, __c41, 2)),
        }),
      ).annotate({ identifier: "UpdateFPorts" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DeviceProfileId: S.optional(S.String),
          ServiceProfileId: S.optional(S.String),
          AbpV1_1: S.optional(__S(576, __c18, 0)),
          AbpV1_0_x: S.optional(__S(576, __c18, 0)),
          FPorts: S.optional(__S(577, __c18, 1)),
        }),
      ).annotate({ identifier: "LoRaWANUpdateDevice" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          DestinationName: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LoRaWAN: S.optional(__S(578, __c18, 2)),
          Positioning: S.optional(S.String),
          Sidewalk: S.optional(__S(3744, __c117, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/wireless-devices/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWirelessDeviceRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DeviceCreationFile: S.optional(S.String) })).annotate({
        identifier: "SidewalkUpdateImportInfo",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), Sidewalk: __S(608, __c19, 0) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/wireless_device_import_task/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWirelessDeviceImportTaskRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          JoinEuiFilters: S.optional(__S(1440, __c45, 0)),
          NetIdFilters: S.optional(__S(1088, __c34, 0)),
          MaxEirp: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/wireless-gateways/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWirelessGatewayRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), IotCertificateId: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/wireless-gateways/{Id}/certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateWirelessGatewayWithCertificateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ IotCertificateId: S.optional(S.String) })).annotate({
        identifier: "AssociateWirelessGatewayWithCertificateResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), ThingArn: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/wireless-gateways/{Id}/thing" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateWirelessGatewayWithThingRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/multicast-groups/{Id}/session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelMulticastGroupSessionRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ExpressionType: S.String,
          Expression: S.String,
          Description: S.optional(S.String),
          RoleArn: S.String,
          Tags: S.optional(__S(3489, __c109, 1)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/destinations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDestinationRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDestinationResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          LoRaWAN: S.optional(__S(928, __c29, 0)),
          Tags: S.optional(__S(3489, __c109, 1)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Sidewalk: S.optional(__S(3968, __c124, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/device-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDeviceProfileRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Id: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDeviceProfileResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SupportsClassB: S.optional(S.Boolean),
          ClassBTimeout: S.optional(S.Number),
          PingSlotPeriod: S.optional(S.Number),
          PingSlotDr: S.optional(S.Number),
          PingSlotFreq: S.optional(S.Number),
          SupportsClassC: S.optional(S.Boolean),
          ClassCTimeout: S.optional(S.Number),
          MacVersion: S.optional(S.String),
          RegParamsRevision: S.optional(S.String),
          RxDelay1: S.optional(S.Number),
          RxDrOffset1: S.optional(S.Number),
          RxDataRate2: S.optional(S.Number),
          RxFreq2: S.optional(S.Number),
          FactoryPresetFreqsList: S.optional(__S(896, __c28, 0)),
          MaxEirp: S.optional(S.Number),
          MaxDutyCycle: S.optional(S.Number),
          RfRegion: S.optional(S.String),
          SupportsJoin: S.optional(S.Boolean),
          Supports32BitFCnt: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LoRaWANDeviceProfile" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          LoRaWAN: S.optional(__S(992, __c31, 0)),
          FirmwareUpdateImage: S.String,
          FirmwareUpdateRole: S.String,
          Tags: S.optional(__S(3489, __c109, 1)),
          RedundancyPercent: S.optional(S.Number),
          FragmentSizeBytes: S.optional(S.Number),
          FragmentIntervalMS: S.optional(S.Number),
          Descriptor: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/fuota-tasks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFuotaTaskRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RfRegion: S.optional(S.String) })).annotate({
        identifier: "LoRaWANFuotaTask",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          LoRaWAN: __S(1056, __c33, 0),
          Tags: S.optional(__S(3489, __c109, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/multicast-groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMulticastGroupRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RfRegion: S.optional(S.String),
          DlClass: S.optional(S.String),
          ParticipatingGateways: S.optional(__S(1120, __c35, 0)),
          DefaultSessionParameters: S.optional(__S(1121, __c35, 1)),
        }),
      ).annotate({ identifier: "LoRaWANMulticast" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayList: S.optional(__S(1088, __c34, 0)),
          TransmissionInterval: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ParticipatingGatewaysMulticast" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DlDr: S.optional(S.Number), DlFreq: S.optional(S.Number) }),
      ).annotate({ identifier: "DefaultSessionParametersMulticast" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          TraceContent: S.optional(__S(1184, __c37, 0)),
          WirelessDevices: S.optional(__S(1088, __c34, 0)),
          WirelessGateways: S.optional(__S(1088, __c34, 0)),
          Description: S.optional(S.String),
          Tags: S.optional(__S(3489, __c109, 1)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          MulticastGroups: S.optional(__S(1088, __c34, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-analyzer-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNetworkAnalyzerConfigurationRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WirelessDeviceFrameInfo: S.optional(S.String),
          LogLevel: S.optional(S.String),
          MulticastFrameInfo: S.optional(S.String),
        }),
      ).annotate({ identifier: "TraceContent" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AddGwMetadata: S.optional(S.Boolean),
          DrMin: S.optional(S.Number),
          DrMax: S.optional(S.Number),
          PrAllowed: S.optional(S.Boolean),
          RaAllowed: S.optional(S.Boolean),
          TxPowerIndexMin: S.optional(S.Number),
          TxPowerIndexMax: S.optional(S.Number),
          NbTransMin: S.optional(S.Number),
          NbTransMax: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LoRaWANServiceProfile" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          LoRaWAN: S.optional(__S(1216, __c38, 0)),
          Tags: S.optional(__S(3489, __c109, 1)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/service-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateServiceProfileRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceProfileId: S.optional(S.String),
          Positioning: S.optional(__S(1344, __c42, 0)),
          SidewalkManufacturingSn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SidewalkCreateWirelessDevice" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DestinationName: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          LoRaWAN: S.optional(__S(1287, __c40, 7)),
          Tags: S.optional(__S(3489, __c109, 1)),
          Positioning: S.optional(S.String),
          Sidewalk: S.optional(__S(1248, __c39, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/wireless-devices" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateWirelessDeviceRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppKey: S.optional(SensitiveString),
          NwkKey: S.optional(SensitiveString),
          JoinEui: S.optional(S.String),
        }),
      ).annotate({ identifier: "OtaaV1_1" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppKey: S.optional(SensitiveString),
          AppEui: S.optional(S.String),
          JoinEui: S.optional(S.String),
          GenAppKey: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "OtaaV1_0_x" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FNwkSIntKey: S.optional(SensitiveString),
          SNwkSIntKey: S.optional(SensitiveString),
          NwkSEncKey: S.optional(SensitiveString),
          AppSKey: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SessionKeysAbpV1_1" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DevAddr: S.optional(S.String),
          SessionKeys: S.optional(__S(1282, __c40, 2)),
          FCntStart: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AbpV1_1" });
    case 4:
      return S.suspend(() =>
        S.Struct({ NwkSKey: S.optional(SensitiveString), AppSKey: S.optional(SensitiveString) }),
      ).annotate({ identifier: "SessionKeysAbpV1_0_x" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DevAddr: S.optional(S.String),
          SessionKeys: S.optional(__S(1284, __c40, 4)),
          FCntStart: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AbpV1_0_x" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Fuota: S.optional(S.Number),
          Multicast: S.optional(S.Number),
          ClockSync: S.optional(S.Number),
          Positioning: S.optional(__S(1312, __c41, 0)),
          Applications: S.optional(__S(1314, __c41, 2)),
        }),
      ).annotate({ identifier: "FPorts" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          DevEui: S.optional(S.String),
          DeviceProfileId: S.optional(S.String),
          ServiceProfileId: S.optional(S.String),
          OtaaV1_1: S.optional(__S(1280, __c40, 0)),
          OtaaV1_0_x: S.optional(__S(1281, __c40, 1)),
          AbpV1_1: S.optional(__S(1283, __c40, 3)),
          AbpV1_0_x: S.optional(__S(1285, __c40, 5)),
          FPorts: S.optional(__S(1286, __c40, 6)),
        }),
      ).annotate({ identifier: "LoRaWANDevice" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClockSync: S.optional(S.Number),
          Stream: S.optional(S.Number),
          Gnss: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Positioning" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FPort: S.optional(S.Number),
          Type: S.optional(S.String),
          DestinationName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationConfig" });
    case 2:
      return S.Array(__S(1313, __c41, 1));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DestinationName: S.optional(S.String) })).annotate({
        identifier: "SidewalkPositioning",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LoRaWAN: __S(1409, __c44, 1),
          Tags: S.optional(__S(3489, __c109, 1)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/wireless-gateways" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWirelessGatewayRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataRate: S.optional(S.Number), Frequencies: S.optional(__S(896, __c28, 0)) }),
      ).annotate({ identifier: "Beaconing" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayEui: S.optional(S.String),
          RfRegion: S.optional(S.String),
          JoinEuiFilters: S.optional(__S(1440, __c45, 0)),
          NetIdFilters: S.optional(__S(1088, __c34, 0)),
          SubBands: S.optional(__S(896, __c28, 0)),
          Beaconing: S.optional(__S(1408, __c44, 0)),
          MaxEirp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LoRaWANGateway" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1088, __c34, 0));
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          WirelessGatewayTaskDefinitionId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/wireless-gateways/{Id}/tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWirelessGatewayTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WirelessGatewayTaskDefinitionId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateWirelessGatewayTaskResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoCreateTasks: S.Boolean,
          Name: S.optional(S.String),
          Update: S.optional(__S(1601, __c50, 1)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3489, __c109, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/wireless-gateway-task-definitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWirelessGatewayTaskDefinitionRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Arn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateWirelessGatewayTaskDefinitionResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageVersion: S.optional(S.String),
          Model: S.optional(S.String),
          Station: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoRaWANGatewayVersion" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateSignature: S.optional(S.String),
          SigKeyCrc: S.optional(S.Number),
          CurrentVersion: S.optional(__S(1568, __c49, 0)),
          UpdateVersion: S.optional(__S(1568, __c49, 0)),
        }),
      ).annotate({ identifier: "LoRaWANUpdateGatewayTaskCreate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateDataSource: S.optional(S.String),
          UpdateDataRole: S.optional(S.String),
          LoRaWAN: S.optional(__S(1600, __c50, 0)),
        }),
      ).annotate({ identifier: "UpdateWirelessGatewayTaskCreate" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/destinations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDestinationRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/device-profiles/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDeviceProfileRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/fuota-tasks/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFuotaTaskRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/multicast-groups/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMulticastGroupRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationName: S.String.pipe(T.HttpLabel("ConfigurationName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/network-analyzer-configurations/{ConfigurationName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNetworkAnalyzerConfigurationRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          MessageId: S.String.pipe(T.HttpQuery("messageId")),
          WirelessDeviceType: S.optional(S.String).pipe(T.HttpQuery("WirelessDeviceType")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless-devices/{Id}/data" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQueuedMessagesRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/service-profiles/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceProfileRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless-devices/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWirelessDeviceRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless_device_import_task/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWirelessDeviceImportTaskRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless-gateways/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWirelessGatewayRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless-gateways/{Id}/tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWirelessGatewayTaskRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless-gateway-task-definitions/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWirelessGatewayTaskDefinitionRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          WirelessDeviceType: S.optional(S.String).pipe(T.HttpQuery("WirelessDeviceType")),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/wireless-devices/{Identifier}/deregister" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterWirelessDeviceRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PartnerAccountId: S.String.pipe(T.HttpLabel("PartnerAccountId")),
          PartnerType: S.String.pipe(T.HttpQuery("partnerType")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/partner-accounts/{PartnerAccountId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateAwsAccountFromPartnerAccountRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          MulticastGroupId: S.String.pipe(T.HttpLabel("MulticastGroupId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/fuota-tasks/{Id}/multicast-groups/{MulticastGroupId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateMulticastGroupFromFuotaTaskRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          WirelessDeviceId: S.String.pipe(T.HttpLabel("WirelessDeviceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/fuota-tasks/{Id}/wireless-devices/{WirelessDeviceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateWirelessDeviceFromFuotaTaskRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          WirelessDeviceId: S.String.pipe(T.HttpLabel("WirelessDeviceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/multicast-groups/{Id}/wireless-devices/{WirelessDeviceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateWirelessDeviceFromMulticastGroupRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless-devices/{Id}/thing" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateWirelessDeviceFromThingRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless-gateways/{Id}/certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateWirelessGatewayFromCertificateRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/wireless-gateways/{Id}/thing" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateWirelessGatewayFromThingRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/destinations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDestinationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Expression: S.optional(S.String),
          ExpressionType: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDestinationResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/device-profiles/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeviceProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CertificateId: S.String,
          MaxAllowedSignature: S.optional(S.Number),
          FactorySupport: S.optional(S.Boolean),
          ApId: S.optional(S.String),
          DeviceTypeId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DakCertificateMetadata" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationServerPublicKey: S.optional(SensitiveString),
          QualificationStatus: S.optional(S.Boolean),
          DakCertificateMetadata: S.optional(__S(2306, __c72, 2)),
        }),
      ).annotate({ identifier: "SidewalkGetDeviceProfile" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          LoRaWAN: S.optional(__S(928, __c29, 0)),
          Sidewalk: S.optional(__S(2307, __c72, 3)),
        }),
      ).annotate({ identifier: "GetDeviceProfileResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/event-configurations-resource-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventConfigurationByResourceTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeviceRegistrationState: S.optional(__S(2369, __c74, 1)),
          Proximity: S.optional(__S(2369, __c74, 1)),
          Join: S.optional(__S(2370, __c74, 2)),
          ConnectionStatus: S.optional(__S(2372, __c74, 4)),
          MessageDeliveryStatus: S.optional(__S(2369, __c74, 1)),
        }),
      ).annotate({ identifier: "GetEventConfigurationByResourceTypesResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ WirelessDeviceEventTopic: S.optional(S.String) })).annotate(
        { identifier: "SidewalkResourceTypeEventConfiguration" },
      );
    case 1:
      return S.suspend(() => S.Struct({ Sidewalk: S.optional(__S(2368, __c74, 0)) })).annotate({
        identifier: "DeviceRegistrationStateResourceTypeEventConfiguration",
      });
    case 2:
      return S.suspend(() => S.Struct({ LoRaWAN: S.optional(__S(2368, __c74, 0)) })).annotate({
        identifier: "JoinResourceTypeEventConfiguration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ WirelessGatewayEventTopic: S.optional(S.String) }),
      ).annotate({ identifier: "LoRaWANConnectionStatusResourceTypeEventConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ LoRaWAN: S.optional(__S(2371, __c74, 3)) })).annotate({
        identifier: "ConnectionStatusResourceTypeEventConfiguration",
      });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/fuota-tasks/{Id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFuotaTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RfRegion: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "LoRaWANFuotaTaskGetInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Status: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LoRaWAN: S.optional(__S(2401, __c75, 1)),
          FirmwareUpdateImage: S.optional(S.String),
          FirmwareUpdateRole: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RedundancyPercent: S.optional(S.Number),
          FragmentSizeBytes: S.optional(S.Number),
          FragmentIntervalMS: S.optional(S.Number),
          Descriptor: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetFuotaTaskResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/log-levels" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLogLevelsByResourceTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DefaultLogLevel: S.optional(S.String),
          WirelessGatewayLogOptions: S.optional(__S(2467, __c77, 3)),
          WirelessDeviceLogOptions: S.optional(__S(2467, __c77, 3)),
          FuotaTaskLogOptions: S.optional(__S(2467, __c77, 3)),
        }),
      ).annotate({ identifier: "GetLogLevelsByResourceTypesResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Event: S.String, LogLevel: S.String })).annotate({
        identifier: "WirelessGatewayEventLogOption",
      });
    case 1:
      return S.Array(__S(2464, __c77, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Type: S.String, LogLevel: S.String, Events: S.optional(__S(2465, __c77, 1)) }),
      ).annotate({ identifier: "WirelessGatewayLogOption" });
    case 3:
      return S.Array(__S(2466, __c77, 2));
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/metric-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMetricConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ SummaryMetric: S.optional(__S(2528, __c79, 0)) })).annotate(
        { identifier: "GetMetricConfigurationResponse" },
      );
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "SummaryMetricConfiguration",
      });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Dimension" });
    case 1:
      return S.Array(__S(2560, __c80, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(2561, __c80, 1)),
          AggregationPeriod: S.optional(S.String),
          StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SummaryMetricQuery" });
    case 3:
      return S.Array(__S(2562, __c80, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ SummaryMetricQueries: S.optional(__S(2563, __c80, 3)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/metrics" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMetricsRequest" });
    case 5:
      return S.Array(/*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Min: S.optional(S.Number),
          Max: S.optional(S.Number),
          Sum: S.optional(S.Number),
          Avg: S.optional(S.Number),
          Std: S.optional(S.Number),
          P90: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MetricQueryValue" });
    case 7:
      return S.Array(__S(2566, __c80, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.optional(S.String),
          QueryStatus: S.optional(S.String),
          Error: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(2561, __c80, 1)),
          AggregationPeriod: S.optional(S.String),
          StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Timestamps: S.optional(__S(2565, __c80, 5)),
          Values: S.optional(__S(2567, __c80, 7)),
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "SummaryMetricQueryResult" });
    case 9:
      return S.Array(__S(2568, __c80, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ SummaryMetricQueryResults: S.optional(__S(2569, __c80, 9)) }),
      ).annotate({ identifier: "GetMetricsResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/multicast-groups/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMulticastGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RfRegion: S.optional(S.String),
          DlClass: S.optional(S.String),
          NumberOfDevicesRequested: S.optional(S.Number),
          NumberOfDevicesInGroup: S.optional(S.Number),
          ParticipatingGateways: S.optional(__S(1120, __c35, 0)),
          DefaultSessionParameters: S.optional(__S(1121, __c35, 1)),
        }),
      ).annotate({ identifier: "LoRaWANMulticastGet" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          LoRaWAN: S.optional(__S(2593, __c81, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetMulticastGroupResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/multicast-groups/{Id}/session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMulticastGroupSessionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ LoRaWAN: S.optional(__S(2656, __c83, 0)) })).annotate({
        identifier: "GetMulticastGroupSessionResponse",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DlDr: S.optional(S.Number),
          DlFreq: S.optional(S.Number),
          SessionStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SessionTimeout: S.optional(S.Number),
          PingSlotPeriod: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LoRaWANMulticastSession" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationName: S.String.pipe(T.HttpLabel("ConfigurationName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/network-analyzer-configurations/{ConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkAnalyzerConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TraceContent: S.optional(__S(1184, __c37, 0)),
          WirelessDevices: S.optional(__S(1088, __c34, 0)),
          WirelessGateways: S.optional(__S(1088, __c34, 0)),
          Description: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          MulticastGroups: S.optional(__S(1088, __c34, 0)),
        }),
      ).annotate({ identifier: "GetNetworkAnalyzerConfigurationResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PartnerAccountId: S.String.pipe(T.HttpLabel("PartnerAccountId")),
          PartnerType: S.String.pipe(T.HttpQuery("partnerType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/partner-accounts/{PartnerAccountId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPartnerAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Sidewalk: S.optional(__S(2752, __c86, 0)),
          AccountLinked: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetPartnerAccountResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmazonId: S.optional(S.String),
          Fingerprint: S.optional(SensitiveString),
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SidewalkAccountInfoWithFingerprint" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/positions/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPositionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HorizontalAccuracy: S.optional(S.Number),
          VerticalAccuracy: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Accuracy" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Position: S.optional(__S(896, __c28, 0)),
          Accuracy: S.optional(__S(2785, __c87, 1)),
          SolverType: S.optional(S.String),
          SolverProvider: S.optional(S.String),
          SolverVersion: S.optional(S.String),
          Timestamp: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPositionResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/position-configurations/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPositionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Solvers: S.optional(__S(2849, __c89, 1)), Destination: S.optional(S.String) }),
      ).annotate({ identifier: "GetPositionConfigurationResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Provider: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          Fec: S.optional(S.String),
        }),
      ).annotate({ identifier: "SemtechGnssDetail" });
    case 1:
      return S.suspend(() => S.Struct({ SemtechGnss: S.optional(__S(2848, __c89, 0)) })).annotate({
        identifier: "PositionSolverDetails",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MacAddress: S.String, Rss: S.Number })).annotate({
        identifier: "WiFiAccessPoint",
      });
    case 1:
      return S.Array(__S(2880, __c90, 0));
    case 2:
      return S.suspend(() => S.Struct({ Bsic: S.Number, Bcch: S.Number })).annotate({
        identifier: "GsmLocalId",
      });
    case 3:
      return S.suspend(() => S.Struct({ Lac: S.Number, GeranCid: S.Number })).annotate({
        identifier: "GlobalIdentity",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Bsic: S.Number,
          Bcch: S.Number,
          RxLevel: S.optional(S.Number),
          GlobalIdentity: S.optional(__S(2883, __c90, 3)),
        }),
      ).annotate({ identifier: "GsmNmrObj" });
    case 5:
      return S.Array(__S(2884, __c90, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Mcc: S.Number,
          Mnc: S.Number,
          Lac: S.Number,
          GeranCid: S.Number,
          GsmLocalId: S.optional(__S(2882, __c90, 2)),
          GsmTimingAdvance: S.optional(S.Number),
          RxLevel: S.optional(S.Number),
          GsmNmr: S.optional(__S(2885, __c90, 5)),
        }),
      ).annotate({ identifier: "GsmObj" });
    case 7:
      return S.Array(__S(2886, __c90, 6));
    case 8:
      return S.suspend(() => S.Struct({ Uarfcndl: S.Number, Psc: S.Number })).annotate({
        identifier: "WcdmaLocalId",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Uarfcndl: S.Number,
          Psc: S.Number,
          UtranCid: S.Number,
          Rscp: S.optional(S.Number),
          PathLoss: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WcdmaNmrObj" });
    case 10:
      return S.Array(__S(2889, __c90, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Mcc: S.Number,
          Mnc: S.Number,
          Lac: S.optional(S.Number),
          UtranCid: S.Number,
          WcdmaLocalId: S.optional(__S(2888, __c90, 8)),
          Rscp: S.optional(S.Number),
          PathLoss: S.optional(S.Number),
          WcdmaNmr: S.optional(__S(2890, __c90, 10)),
        }),
      ).annotate({ identifier: "WcdmaObj" });
    case 12:
      return S.Array(__S(2891, __c90, 11));
    case 13:
      return S.suspend(() => S.Struct({ Uarfcn: S.Number, CellParams: S.Number })).annotate({
        identifier: "TdscdmaLocalId",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Uarfcn: S.Number,
          CellParams: S.Number,
          UtranCid: S.optional(S.Number),
          Rscp: S.optional(S.Number),
          PathLoss: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TdscdmaNmrObj" });
    case 15:
      return S.Array(__S(2894, __c90, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Mcc: S.Number,
          Mnc: S.Number,
          Lac: S.optional(S.Number),
          UtranCid: S.Number,
          TdscdmaLocalId: S.optional(__S(2893, __c90, 13)),
          TdscdmaTimingAdvance: S.optional(S.Number),
          Rscp: S.optional(S.Number),
          PathLoss: S.optional(S.Number),
          TdscdmaNmr: S.optional(__S(2895, __c90, 15)),
        }),
      ).annotate({ identifier: "TdscdmaObj" });
    case 17:
      return S.Array(__S(2896, __c90, 16));
    case 18:
      return S.suspend(() => S.Struct({ Pci: S.Number, Earfcn: S.Number })).annotate({
        identifier: "LteLocalId",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Pci: S.Number,
          Earfcn: S.Number,
          EutranCid: S.optional(S.Number),
          Rsrp: S.optional(S.Number),
          Rsrq: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LteNmrObj" });
    case 20:
      return S.Array(__S(2899, __c90, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          Mcc: S.Number,
          Mnc: S.Number,
          EutranCid: S.Number,
          Tac: S.optional(S.Number),
          LteLocalId: S.optional(__S(2898, __c90, 18)),
          LteTimingAdvance: S.optional(S.Number),
          Rsrp: S.optional(S.Number),
          Rsrq: S.optional(S.Number),
          NrCapable: S.optional(S.Boolean),
          LteNmr: S.optional(__S(2900, __c90, 20)),
        }),
      ).annotate({ identifier: "LteObj" });
    case 22:
      return S.Array(__S(2901, __c90, 21));
    case 23:
      return S.suspend(() => S.Struct({ PnOffset: S.Number, CdmaChannel: S.Number })).annotate({
        identifier: "CdmaLocalId",
      });
    case 24:
      return S.suspend(() =>
        S.Struct({
          PnOffset: S.Number,
          CdmaChannel: S.Number,
          PilotPower: S.optional(S.Number),
          BaseStationId: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CdmaNmrObj" });
    case 25:
      return S.Array(__S(2904, __c90, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          SystemId: S.Number,
          NetworkId: S.Number,
          BaseStationId: S.Number,
          RegistrationZone: S.optional(S.Number),
          CdmaLocalId: S.optional(__S(2903, __c90, 23)),
          PilotPower: S.optional(S.Number),
          BaseLat: S.optional(S.Number),
          BaseLng: S.optional(S.Number),
          CdmaNmr: S.optional(__S(2905, __c90, 25)),
        }),
      ).annotate({ identifier: "CdmaObj" });
    case 27:
      return S.Array(__S(2906, __c90, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          Gsm: S.optional(__S(2887, __c90, 7)),
          Wcdma: S.optional(__S(2892, __c90, 12)),
          Tdscdma: S.optional(__S(2897, __c90, 17)),
          Lte: S.optional(__S(2902, __c90, 22)),
          Cdma: S.optional(__S(2907, __c90, 27)),
        }),
      ).annotate({ identifier: "CellTowers" });
    case 29:
      return S.suspend(() => S.Struct({ IpAddress: S.String })).annotate({ identifier: "Ip" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Payload: S.String,
          CaptureTime: S.optional(S.Number),
          CaptureTimeAccuracy: S.optional(S.Number),
          AssistPosition: S.optional(__S(896, __c28, 0)),
          AssistAltitude: S.optional(S.Number),
          Use2DSolver: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Gnss" });
    case 31:
      return S.suspend(() =>
        S.Struct({ Payload: S.String, CaptureTime: S.optional(S.Number) }),
      ).annotate({ identifier: "GnssCapture" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2911, __c90, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Captures: __S(2912, __c91, 0),
          CaptureTimeAccuracy: S.optional(S.Number),
          AssistPosition: S.optional(__S(896, __c28, 0)),
          AssistAltitude: S.optional(S.Number),
          Use2DSolver: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GnssMultiFrame" });
    case 2:
      return S.suspend(() => S.Struct({ ConfidencePercent: S.optional(S.Number) })).annotate({
        identifier: "WiFiCellular",
      });
    case 3:
      return S.suspend(() => S.Struct({ WiFiCellular: S.optional(__S(2914, __c91, 2)) })).annotate({
        identifier: "AdvancedConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          WiFiAccessPoints: S.optional(__S(2881, __c90, 1)),
          CellTowers: S.optional(__S(2908, __c90, 28)),
          Ip: S.optional(__S(2909, __c90, 29)),
          Gnss: S.optional(__S(2910, __c90, 30)),
          GnssMultiFrame: S.optional(__S(2913, __c91, 1)),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AdvancedConfiguration: S.optional(__S(2915, __c91, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/position-estimate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPositionEstimateRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GeoJsonPayload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "GetPositionEstimateResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          IdentifierType: S.String.pipe(T.HttpQuery("identifierType")),
          PartnerType: S.optional(S.String).pipe(T.HttpQuery("partnerType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/event-configurations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceEventConfigurationRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceRegistrationState: S.optional(__S(3041, __c95, 1)),
          Proximity: S.optional(__S(3041, __c95, 1)),
          Join: S.optional(__S(3043, __c95, 3)),
          ConnectionStatus: S.optional(__S(3045, __c95, 5)),
          MessageDeliveryStatus: S.optional(__S(3041, __c95, 1)),
        }),
      ).annotate({ identifier: "GetResourceEventConfigurationResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AmazonIdEventTopic: S.optional(S.String) })).annotate({
        identifier: "SidewalkEventNotificationConfigurations",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Sidewalk: S.optional(__S(3040, __c95, 0)),
          WirelessDeviceIdEventTopic: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeviceRegistrationStateEventConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ DevEuiEventTopic: S.optional(S.String) })).annotate({
        identifier: "LoRaWANJoinEventNotificationConfigurations",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          LoRaWAN: S.optional(__S(3042, __c95, 2)),
          WirelessDeviceIdEventTopic: S.optional(S.String),
        }),
      ).annotate({ identifier: "JoinEventConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ GatewayEuiEventTopic: S.optional(S.String) })).annotate({
        identifier: "LoRaWANConnectionStatusEventNotificationConfigurations",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          LoRaWAN: S.optional(__S(3044, __c95, 4)),
          WirelessGatewayIdEventTopic: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectionStatusEventConfiguration" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/log-levels/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceLogLevelRequest" });
    case 1:
      return S.suspend(() => S.Struct({ LogLevel: S.optional(S.String) })).annotate({
        identifier: "GetResourceLogLevelResponse",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resource-positions/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePositionRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceType: S.optional(S.String).pipe(T.HttpQuery("serviceType")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/service-endpoint" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceType: S.optional(S.String),
          ServiceEndpoint: S.optional(S.String),
          ServerTrust: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetServiceEndpointResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/service-profiles/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServiceProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UlRate: S.optional(S.Number),
          UlBucketSize: S.optional(S.Number),
          UlRatePolicy: S.optional(S.String),
          DlRate: S.optional(S.Number),
          DlBucketSize: S.optional(S.Number),
          DlRatePolicy: S.optional(S.String),
          AddGwMetadata: S.optional(S.Boolean),
          DevStatusReqFreq: S.optional(S.Number),
          ReportDevStatusBattery: S.optional(S.Boolean),
          ReportDevStatusMargin: S.optional(S.Boolean),
          DrMin: S.optional(S.Number),
          DrMax: S.optional(S.Number),
          ChannelMask: S.optional(S.String),
          PrAllowed: S.optional(S.Boolean),
          HrAllowed: S.optional(S.Boolean),
          RaAllowed: S.optional(S.Boolean),
          NwkGeoLoc: S.optional(S.Boolean),
          TargetPer: S.optional(S.Number),
          MinGwDiversity: S.optional(S.Number),
          TxPowerIndexMin: S.optional(S.Number),
          TxPowerIndexMax: S.optional(S.Number),
          NbTransMin: S.optional(S.Number),
          NbTransMax: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LoRaWANGetServiceProfileInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          LoRaWAN: S.optional(__S(3169, __c99, 1)),
        }),
      ).annotate({ identifier: "GetServiceProfileResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          IdentifierType: S.String.pipe(T.HttpQuery("identifierType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-devices/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessDeviceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AmazonId: S.optional(S.String),
          SidewalkId: S.optional(S.String),
          SidewalkManufacturingSn: S.optional(S.String),
          DeviceCertificates: S.optional(__S(3233, __c101, 1)),
          PrivateKeys: S.optional(__S(3233, __c101, 1)),
          DeviceProfileId: S.optional(S.String),
          CertificateId: S.optional(S.String),
          Status: S.optional(S.String),
          Positioning: S.optional(__S(1344, __c42, 0)),
        }),
      ).annotate({ identifier: "SidewalkDevice" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DestinationName: S.optional(S.String),
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          ThingName: S.optional(S.String),
          ThingArn: S.optional(S.String),
          LoRaWAN: S.optional(__S(1287, __c40, 7)),
          Sidewalk: S.optional(__S(3201, __c100, 1)),
          Positioning: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWirelessDeviceResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SigningAlg: S.String, Value: S.String })).annotate({
        identifier: "CertificateList",
      });
    case 1:
      return S.Array(__S(3232, __c101, 0));
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless_device_import_task/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessDeviceImportTaskRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceCreationFileList: S.optional(__S(1088, __c34, 0)),
          Role: S.optional(S.String),
          Positioning: S.optional(__S(1344, __c42, 0)),
        }),
      ).annotate({ identifier: "SidewalkGetStartImportInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          DestinationName: S.optional(S.String),
          Positioning: S.optional(S.String),
          Sidewalk: S.optional(__S(3296, __c103, 0)),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          InitializedImportedDeviceCount: S.optional(S.Number),
          PendingImportedDeviceCount: S.optional(S.Number),
          OnboardedImportedDeviceCount: S.optional(S.Number),
          FailedImportedDeviceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetWirelessDeviceImportTaskResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WirelessDeviceId: S.String.pipe(T.HttpLabel("WirelessDeviceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-devices/{WirelessDeviceId}/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessDeviceStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayEui: S.optional(S.String),
          Snr: S.optional(S.Number),
          Rssi: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LoRaWANGatewayMetadata" });
    case 2:
      return S.Array(__S(3329, __c104, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProviderNetId: S.optional(S.String),
          Id: S.optional(S.String),
          Rssi: S.optional(S.Number),
          Snr: S.optional(S.Number),
          RfRegion: S.optional(S.String),
          DlAllowed: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LoRaWANPublicGatewayMetadata" });
    case 4:
      return S.Array(__S(3331, __c104, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          DevEui: S.optional(S.String),
          FPort: S.optional(S.Number),
          DataRate: S.optional(S.Number),
          Frequency: S.optional(S.Number),
          Timestamp: S.optional(S.String),
          Gateways: S.optional(__S(3330, __c104, 2)),
          PublicGateways: S.optional(__S(3332, __c104, 4)),
        }),
      ).annotate({ identifier: "LoRaWANDeviceMetadata" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Rssi: S.optional(S.Number),
          BatteryLevel: S.optional(S.String),
          Event: S.optional(S.String),
          DeviceState: S.optional(S.String),
        }),
      ).annotate({ identifier: "SidewalkDeviceMetadata" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          WirelessDeviceId: S.optional(S.String),
          LastUplinkReceivedAt: S.optional(S.String),
          LoRaWAN: S.optional(__S(3333, __c104, 5)),
          Sidewalk: S.optional(__S(3334, __c104, 6)),
        }),
      ).annotate({ identifier: "GetWirelessDeviceStatisticsResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          IdentifierType: S.String.pipe(T.HttpQuery("identifierType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-gateways/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          Description: S.optional(S.String),
          LoRaWAN: S.optional(__S(1409, __c44, 1)),
          Arn: S.optional(S.String),
          ThingName: S.optional(S.String),
          ThingArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWirelessGatewayResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-gateways/{Id}/certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessGatewayCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IotCertificateId: S.optional(S.String),
          LoRaWANNetworkServerCertificateId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWirelessGatewayCertificateResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-gateways/{Id}/firmware-information" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessGatewayFirmwareInformationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CurrentVersion: S.optional(__S(1568, __c49, 0)) }),
      ).annotate({ identifier: "LoRaWANGatewayCurrentVersion" });
    case 2:
      return S.suspend(() => S.Struct({ LoRaWAN: S.optional(__S(3425, __c107, 1)) })).annotate({
        identifier: "GetWirelessGatewayFirmwareInformationResponse",
      });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmazonId: S.optional(S.String),
          AppServerPrivateKey: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SidewalkAccountInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Sidewalk: __S(3456, __c108, 0),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3489, __c109, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/partner-accounts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateAwsAccountWithPartnerAccountRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Sidewalk: S.optional(__S(3456, __c108, 0)), Arn: S.optional(S.String) }),
      ).annotate({ identifier: "AssociateAwsAccountWithPartnerAccountResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(3488, __c109, 0));
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WirelessGatewayId: S.String.pipe(T.HttpLabel("WirelessGatewayId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-gateways/{WirelessGatewayId}/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessGatewayStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WirelessGatewayId: S.optional(S.String),
          LastUplinkReceivedAt: S.optional(S.String),
          ConnectionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWirelessGatewayStatisticsResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-gateways/{Id}/tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessGatewayTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WirelessGatewayId: S.optional(S.String),
          WirelessGatewayTaskDefinitionId: S.optional(S.String),
          LastUplinkReceivedAt: S.optional(S.String),
          TaskCreatedAt: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWirelessGatewayTaskResponse" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-gateway-task-definitions/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWirelessGatewayTaskDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoCreateTasks: S.optional(S.Boolean),
          Name: S.optional(S.String),
          Update: S.optional(__S(1601, __c50, 1)),
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWirelessGatewayTaskDefinitionResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/destinations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          ExpressionType: S.optional(S.String),
          Expression: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Destinations" });
    case 2:
      return S.Array(__S(3617, __c113, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DestinationList: S.optional(__S(3618, __c113, 2)),
        }),
      ).annotate({ identifier: "ListDestinationsResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          DeviceProfileType: S.optional(S.String).pipe(T.HttpQuery("deviceProfileType")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/device-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDeviceProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DeviceProfileList: S.optional(__S(3681, __c115, 1)),
        }),
      ).annotate({ identifier: "ListDeviceProfilesResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Id: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeviceProfile" });
    case 1:
      return S.Array(__S(3680, __c115, 0));
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpQuery("id")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless_device_import_task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDevicesForWirelessDeviceImportTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SidewalkManufacturingSn: S.optional(S.String),
          OnboardingStatus: S.optional(S.String),
          OnboardingStatusReason: S.optional(S.String),
          LastUpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ImportedSidewalkDevice" });
    case 2:
      return S.suspend(() => S.Struct({ Sidewalk: S.optional(__S(3713, __c116, 1)) })).annotate({
        identifier: "ImportedWirelessDevice",
      });
    case 3:
      return S.Array(__S(3714, __c116, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DestinationName: S.optional(S.String),
          Positioning: S.optional(S.String),
          Sidewalk: S.optional(__S(3744, __c117, 0)),
          ImportedWirelessDeviceList: S.optional(__S(3715, __c116, 3)),
        }),
      ).annotate({ identifier: "ListDevicesForWirelessDeviceImportTaskResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Positioning: S.optional(__S(1344, __c42, 0)) })).annotate({
        identifier: "SidewalkListDevicesForImportInfo",
      });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/event-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          IdentifierType: S.optional(S.String),
          PartnerType: S.optional(S.String),
          Events: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "EventConfigurationItem" });
    case 2:
      return S.Array(__S(3777, __c118, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          EventConfigurationsList: S.optional(__S(3778, __c118, 2)),
        }),
      ).annotate({ identifier: "ListEventConfigurationsResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/fuota-tasks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFuotaTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          FuotaTaskList: S.optional(__S(3841, __c120, 1)),
        }),
      ).annotate({ identifier: "ListFuotaTasksResponse" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
        }),
      ).annotate({ identifier: "FuotaTask" });
    case 1:
      return S.Array(__S(3840, __c120, 0));
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/multicast-groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMulticastGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MulticastGroupList: S.optional(__S(3841, __c120, 1)),
        }),
      ).annotate({ identifier: "ListMulticastGroupsResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/fuota-tasks/{Id}/multicast-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMulticastGroupsByFuotaTaskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "MulticastGroupByFuotaTask",
      });
    case 2:
      return S.Array(__S(3905, __c122, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MulticastGroupList: S.optional(__S(3906, __c122, 2)),
        }),
      ).annotate({ identifier: "ListMulticastGroupsByFuotaTaskResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), MulticastGroupId: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/fuota-tasks/{Id}/multicast-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateMulticastGroupWithFuotaTaskRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateMulticastGroupWithFuotaTaskResponse",
      });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/network-analyzer-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkAnalyzerConfigurationsRequest" });
    case 1:
      return S.Array(__S(800, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          NetworkAnalyzerConfigurationList: S.optional(__S(4001, __c125, 1)),
        }),
      ).annotate({ identifier: "ListNetworkAnalyzerConfigurationsResponse" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/partner-accounts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPartnerAccountsRequest" });
    case 1:
      return S.Array(__S(2752, __c86, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Sidewalk: S.optional(__S(4033, __c126, 1)) }),
      ).annotate({ identifier: "ListPartnerAccountsResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/position-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPositionConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Solvers: S.optional(__S(2849, __c89, 1)),
          Destination: S.optional(S.String),
        }),
      ).annotate({ identifier: "PositionConfigurationItem" });
    case 2:
      return S.Array(__S(4065, __c127, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PositionConfigurationList: S.optional(__S(4066, __c127, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPositionConfigurationsResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          WirelessDeviceType: S.optional(S.String).pipe(T.HttpQuery("WirelessDeviceType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-devices/{Id}/data" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQueuedMessagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MessageId: S.optional(S.String),
          TransmitMode: S.optional(S.Number),
          ReceivedAt: S.optional(S.String),
          LoRaWAN: S.optional(__S(4131, __c129, 3)),
        }),
      ).annotate({ identifier: "DownlinkQueueMessage" });
    case 2:
      return S.Array(__S(4097, __c128, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DownlinkQueueMessagesList: S.optional(__S(4098, __c128, 2)),
        }),
      ).annotate({ identifier: "ListQueuedMessagesResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayId: S.String, DownlinkFrequency: S.Number }),
      ).annotate({ identifier: "GatewayListItem" });
    case 1:
      return S.Array(__S(4128, __c129, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DownlinkMode: S.String,
          GatewayList: __S(4129, __c129, 1),
          TransmissionInterval: S.Number,
        }),
      ).annotate({ identifier: "ParticipatingGateways" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FPort: S.optional(S.Number),
          ParticipatingGateways: S.optional(__S(4130, __c129, 2)),
        }),
      ).annotate({ identifier: "LoRaWANSendDataToDevice" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/service-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServiceProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ServiceProfileList: S.optional(__S(3681, __c115, 1)),
        }),
      ).annotate({ identifier: "ListServiceProfilesResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(3489, __c109, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless_device_import_tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWirelessDeviceImportTasksRequest" });
    case 1:
      return S.Array(__S(3297, __c103, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          WirelessDeviceImportTaskList: S.optional(__S(4225, __c132, 1)),
        }),
      ).annotate({ identifier: "ListWirelessDeviceImportTasksResponse" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          DestinationName: S.optional(S.String).pipe(T.HttpQuery("destinationName")),
          DeviceProfileId: S.optional(S.String).pipe(T.HttpQuery("deviceProfileId")),
          ServiceProfileId: S.optional(S.String).pipe(T.HttpQuery("serviceProfileId")),
          WirelessDeviceType: S.optional(S.String).pipe(T.HttpQuery("wirelessDeviceType")),
          FuotaTaskId: S.optional(S.String).pipe(T.HttpQuery("fuotaTaskId")),
          MulticastGroupId: S.optional(S.String).pipe(T.HttpQuery("multicastGroupId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/wireless-devices" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWirelessDevicesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DevEui: S.optional(S.String) })).annotate({
        identifier: "LoRaWANListDevice",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AmazonId: S.optional(S.String),
          SidewalkId: S.optional(S.String),
          SidewalkManufacturingSn: S.optional(S.String),
          DeviceCertificates: S.optional(__S(3233, __c101, 1)),
          DeviceProfileId: S.optional(S.String),
          Status: S.optional(S.String),
          Positioning: S.optional(__S(1344, __c42, 0)),
        }),
      ).annotate({ identifier: "SidewalkListDevice" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          Name: S.optional(S.String),
          DestinationName: S.optional(S.String),
          LastUplinkReceivedAt: S.optional(S.String),
          LoRaWAN: S.optional(__S(4257, __c133, 1)),
          Sidewalk: S.optional(__S(4258, __c133, 2)),
          FuotaDeviceStatus: S.optional(S.String),
          MulticastDeviceStatus: S.optional(S.String),
          McGroupId: S.optional(S.Number),
          Positioning: S.optional(S.String),
        }),
      ).annotate({ identifier: "WirelessDeviceStatistics" });
    case 4:
      return S.Array(__S(4259, __c133, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          WirelessDeviceList: S.optional(__S(4260, __c133, 4)),
        }),
      ).annotate({ identifier: "ListWirelessDevicesResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/wireless-gateways" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWirelessGatewaysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LoRaWAN: S.optional(__S(1409, __c44, 1)),
          LastUplinkReceivedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "WirelessGatewayStatistics" });
    case 2:
      return S.Array(__S(4289, __c134, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          WirelessGatewayList: S.optional(__S(4290, __c134, 2)),
        }),
      ).annotate({ identifier: "ListWirelessGatewaysResponse" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          TaskDefinitionType: S.optional(S.String).pipe(T.HttpQuery("taskDefinitionType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/wireless-gateway-task-definitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWirelessGatewayTaskDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CurrentVersion: S.optional(__S(1568, __c49, 0)),
          UpdateVersion: S.optional(__S(1568, __c49, 0)),
        }),
      ).annotate({ identifier: "LoRaWANUpdateGatewayTaskEntry" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          LoRaWAN: S.optional(__S(4321, __c135, 1)),
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateWirelessGatewayTaskEntry" });
    case 3:
      return S.Array(__S(4322, __c135, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          TaskDefinitions: S.optional(__S(4323, __c135, 3)),
        }),
      ).annotate({ identifier: "ListWirelessGatewayTaskDefinitionsResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), WirelessDeviceId: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/fuota-tasks/{Id}/wireless-device" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateWirelessDeviceWithFuotaTaskRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.String, Fec: S.String })).annotate({
        identifier: "SemtechGnssConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ SemtechGnss: S.optional(__S(4384, __c137, 0)) })).annotate({
        identifier: "PositionSolverConfigurations",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
          Solvers: S.optional(__S(4385, __c137, 1)),
          Destination: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/position-configurations/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutPositionConfigurationRequest" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
          LogLevel: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/log-levels/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourceLogLevelRequest" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/log-levels" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResetAllResourceLogLevelsRequest" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
          ResourceType: S.String.pipe(T.HttpQuery("resourceType")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/log-levels/{ResourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetResourceLogLevelRequest" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FPort: S.optional(S.Number) })).annotate({
        identifier: "LoRaWANMulticastMetadata",
      });
    case 1:
      return S.suspend(() => S.Struct({ LoRaWAN: S.optional(__S(4512, __c141, 0)) })).annotate({
        identifier: "MulticastWirelessMetadata",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          PayloadData: S.String,
          WirelessMetadata: __S(4513, __c141, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/multicast-groups/{Id}/data" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendDataToMulticastGroupRequest" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MessageId: S.optional(S.String) })).annotate({
        identifier: "SendDataToMulticastGroupResponse",
      });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Seq: S.optional(S.Number),
          MessageType: S.optional(S.String),
          AckModeRetryDurationSecs: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SidewalkSendDataToDevice" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LoRaWAN: S.optional(__S(4131, __c129, 3)),
          Sidewalk: S.optional(__S(4576, __c143, 0)),
        }),
      ).annotate({ identifier: "WirelessMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          TransmitMode: S.Number,
          PayloadData: S.String,
          WirelessMetadata: S.optional(__S(4577, __c143, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/wireless-devices/{Id}/data" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendDataToWirelessDeviceRequest" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          QueryString: S.optional(S.String),
          Tags: S.optional(__S(3489, __c109, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/multicast-groups/{Id}/bulk" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartBulkAssociateWirelessDeviceWithMulticastGroupRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          QueryString: S.optional(S.String),
          Tags: S.optional(__S(3489, __c109, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/multicast-groups/{Id}/bulk" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartBulkDisassociateWirelessDeviceFromMulticastGroupRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))) }),
      ).annotate({ identifier: "LoRaWANStartFuotaTask" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          LoRaWAN: S.optional(__S(4672, __c146, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/fuota-tasks/{Id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartFuotaTaskRequest" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), LoRaWAN: __S(2656, __c83, 0) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/multicast-groups/{Id}/session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMulticastGroupSessionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
