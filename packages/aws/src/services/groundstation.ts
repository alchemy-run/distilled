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
  sdkId: "GroundStation",
  serviceShapeName: "GroundStation",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "groundstation" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-05-23");
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
              `https://groundstation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://groundstation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://groundstation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://groundstation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://groundstation.{R}.{D}","properties":{},"headers":{}}');

export class DependencyException
  extends /*@__PURE__*/ S.TaggedError<DependencyException>()(
    "DependencyException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      parameterName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(531),
  ).pipe(C.withServerError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      parameterName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(431),
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      parameterName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(434),
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      parameterName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export type Uuid = string;
export interface CancelContactRequest {
  contactId: string;
}
export type VersionId = number;
export interface ContactIdResponse {
  contactId?: string;
  versionId?: number;
}
export type SafeName = string;
export type FrequencyUnits = "GHz" | "MHz" | "kHz" | (string & {});
export interface Frequency {
  value: number;
  units: FrequencyUnits;
}
export type BandwidthUnits = "GHz" | "MHz" | "kHz" | (string & {});
export interface FrequencyBandwidth {
  value: number;
  units: BandwidthUnits;
}
export type Polarization = "RIGHT_HAND" | "LEFT_HAND" | "NONE" | (string & {});
export interface SpectrumConfig {
  centerFrequency: Frequency;
  bandwidth: FrequencyBandwidth;
  polarization?: Polarization;
}
export interface AntennaDownlinkConfig {
  spectrumConfig: SpectrumConfig;
}
export type Criticality = "REQUIRED" | "PREFERRED" | "REMOVED" | (string & {});
export interface TrackingConfig {
  autotrack: Criticality;
}
export interface DataflowEndpointConfig {
  dataflowEndpointName: string;
  dataflowEndpointRegion?: string;
}
export type JsonString = string;
export interface DemodulationConfig {
  unvalidatedJSON: string;
}
export interface DecodeConfig {
  unvalidatedJSON: string;
}
export interface AntennaDownlinkDemodDecodeConfig {
  spectrumConfig: SpectrumConfig;
  demodulationConfig: DemodulationConfig;
  decodeConfig: DecodeConfig;
}
export interface UplinkSpectrumConfig {
  centerFrequency: Frequency;
  polarization?: Polarization;
}
export type EirpUnits = "dBW" | (string & {});
export interface Eirp {
  value: number;
  units: EirpUnits;
}
export interface AntennaUplinkConfig {
  transmitDisabled?: boolean;
  spectrumConfig: UplinkSpectrumConfig;
  targetEirp: Eirp;
}
export type ConfigArn = string;
export interface UplinkEchoConfig {
  enabled: boolean;
  antennaUplinkConfigArn: string;
}
export type BucketArn = string;
export type RoleArn = string;
export type S3KeyPrefix = string;
export interface S3RecordingConfig {
  bucketArn: string;
  roleArn: string;
  prefix?: string;
}
export type TelemetrySinkType = "KINESIS_DATA_STREAM" | (string & {});
export type KinesisDataStreamArn = string;
export interface KinesisDataStreamData {
  kinesisRoleArn: string;
  kinesisDataStreamArn: string;
}
export type TelemetrySinkData = { kinesisDataStreamData: KinesisDataStreamData };
export interface TelemetrySinkConfig {
  telemetrySinkType: TelemetrySinkType;
  telemetrySinkData: TelemetrySinkData;
}
export type ConfigTypeData =
  | {
      antennaDownlinkConfig: AntennaDownlinkConfig;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig: TrackingConfig;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig: DataflowEndpointConfig;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig: AntennaDownlinkDemodDecodeConfig;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig: AntennaUplinkConfig;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig: UplinkEchoConfig;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig: S3RecordingConfig;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig: TelemetrySinkConfig;
    };
export type TagsMap = { [key: string]: string | undefined };
export interface CreateConfigRequest {
  name: string;
  configData: ConfigTypeData;
  tags?: { [key: string]: string | undefined };
}
export type ConfigCapabilityType =
  | "antenna-downlink"
  | "antenna-downlink-demod-decode"
  | "tracking"
  | "dataflow-endpoint"
  | "antenna-uplink"
  | "uplink-echo"
  | "s3-recording"
  | "telemetry-sink"
  | (string & {});
export interface ConfigIdResponse {
  configId?: string;
  configType?: ConfigCapabilityType;
  configArn?: string;
}
export type SubnetList = string[];
export type SecurityGroupIdList = string[];
export interface SecurityDetails {
  subnetIds: string[];
  securityGroupIds: string[];
  roleArn: string;
}
export interface SocketAddress {
  name: string;
  port: number;
}
export type EndpointStatus =
  | "created"
  | "creating"
  | "deleted"
  | "deleting"
  | "failed"
  | (string & {});
export interface DataflowEndpoint {
  name?: string;
  address?: SocketAddress;
  status?: EndpointStatus;
  mtu?: number;
}
export interface ConnectionDetails {
  socketAddress: SocketAddress;
  mtu?: number;
}
export type IpV4Address = string;
export interface IntegerRange {
  minimum: number;
  maximum: number;
}
export interface RangedSocketAddress {
  name: string;
  portRange: IntegerRange;
}
export interface RangedConnectionDetails {
  socketAddress: RangedSocketAddress;
  mtu?: number;
}
export type AgentStatus = "SUCCESS" | "FAILED" | "ACTIVE" | "INACTIVE" | (string & {});
export type AuditResults = "HEALTHY" | "UNHEALTHY" | (string & {});
export interface AwsGroundStationAgentEndpoint {
  name: string;
  egressAddress: ConnectionDetails;
  ingressAddress: RangedConnectionDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export interface UplinkConnectionDetails {
  ingressAddressAndPort: ConnectionDetails;
  agentIpAndPortAddress: RangedConnectionDetails;
}
export type UplinkDataflowDetails = { agentConnectionDetails: UplinkConnectionDetails };
export interface UplinkAwsGroundStationAgentEndpointDetails {
  name: string;
  dataflowDetails: UplinkDataflowDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export interface DownlinkConnectionDetails {
  agentIpAndPortAddress: RangedConnectionDetails;
  egressAddressAndPort: ConnectionDetails;
}
export type DownlinkDataflowDetails = { agentConnectionDetails: DownlinkConnectionDetails };
export interface DownlinkAwsGroundStationAgentEndpointDetails {
  name: string;
  dataflowDetails: DownlinkDataflowDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export type CapabilityHealth = "HEALTHY" | "UNHEALTHY" | (string & {});
export type CapabilityHealthReason =
  | "NO_REGISTERED_AGENT"
  | "INVALID_IP_OWNERSHIP"
  | "NOT_AUTHORIZED_TO_CREATE_SLR"
  | "UNVERIFIED_IP_OWNERSHIP"
  | "INITIALIZING_DATAPLANE"
  | "DATAPLANE_FAILURE"
  | "HEALTHY"
  | (string & {});
export type CapabilityHealthReasonList = CapabilityHealthReason[];
export interface EndpointDetails {
  securityDetails?: SecurityDetails;
  endpoint?: DataflowEndpoint;
  awsGroundStationAgentEndpoint?: AwsGroundStationAgentEndpoint;
  uplinkAwsGroundStationAgentEndpoint?: UplinkAwsGroundStationAgentEndpointDetails;
  downlinkAwsGroundStationAgentEndpoint?: DownlinkAwsGroundStationAgentEndpointDetails;
  healthStatus?: CapabilityHealth;
  healthReasons?: CapabilityHealthReason[];
}
export type EndpointDetailsList = EndpointDetails[];
export type DataflowEndpointGroupDurationInSeconds = number;
export interface CreateDataflowEndpointGroupRequest {
  endpointDetails: EndpointDetails[];
  tags?: { [key: string]: string | undefined };
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
}
export interface DataflowEndpointGroupIdResponse {
  dataflowEndpointGroupId?: string;
}
export interface UplinkAwsGroundStationAgentEndpoint {
  name: string;
  dataflowDetails: UplinkDataflowDetails;
}
export interface DownlinkAwsGroundStationAgentEndpoint {
  name: string;
  dataflowDetails: DownlinkDataflowDetails;
}
export type CreateEndpointDetails =
  | {
      uplinkAwsGroundStationAgentEndpoint: UplinkAwsGroundStationAgentEndpoint;
      downlinkAwsGroundStationAgentEndpoint?: never;
    }
  | {
      uplinkAwsGroundStationAgentEndpoint?: never;
      downlinkAwsGroundStationAgentEndpoint: DownlinkAwsGroundStationAgentEndpoint;
    };
export type CreateEndpointDetailsList = CreateEndpointDetails[];
export interface CreateDataflowEndpointGroupV2Request {
  endpoints: CreateEndpointDetails[];
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  tags?: { [key: string]: string | undefined };
}
export interface CreateDataflowEndpointGroupV2Response {
  dataflowEndpointGroupId?: string;
}
export type CustomerEphemerisPriority = number;
export type KeyArn = string;
export type S3BucketName = string;
export type S3ObjectKey = string;
export type S3VersionId = string;
export interface S3Object {
  bucket?: string;
  key?: string;
  version?: string;
}
export type TleLineOne = string;
export type TleLineTwo = string;
export interface TimeRange {
  startTime: Date;
  endTime: Date;
}
export interface TLEData {
  tleLine1: string;
  tleLine2: string;
  validTimeRange: TimeRange;
}
export type TLEDataList = TLEData[];
export interface TLEEphemeris {
  s3Object?: S3Object;
  tleData?: TLEData[];
}
export type UnboundedString = string;
export interface OEMEphemeris {
  s3Object?: S3Object;
  oemData?: string;
}
export type GroundStationName = string;
export type AngleUnits = "DEGREE_ANGLE" | "RADIAN" | (string & {});
export interface ISO8601TimeRange {
  startTime: Date;
  endTime: Date;
}
export interface TimeAzEl {
  dt: number;
  az: number;
  el: number;
}
export type TimeAzElList = TimeAzEl[];
export interface AzElSegment {
  referenceEpoch: Date;
  validTimeRange: ISO8601TimeRange;
  azElList: TimeAzEl[];
}
export type AzElSegmentList = AzElSegment[];
export interface AzElSegments {
  angleUnit: AngleUnits;
  azElSegmentList: AzElSegment[];
}
export type AzElSegmentsData =
  | { s3Object: S3Object; azElData?: never }
  | { s3Object?: never; azElData: AzElSegments };
export interface AzElEphemeris {
  groundStation: string;
  data: AzElSegmentsData;
}
export type EphemerisData =
  | { tle: TLEEphemeris; oem?: never; azEl?: never }
  | { tle?: never; oem: OEMEphemeris; azEl?: never }
  | { tle?: never; oem?: never; azEl: AzElEphemeris };
export interface CreateEphemerisRequest {
  satelliteId?: string;
  enabled?: boolean;
  priority?: number;
  expirationTime?: Date;
  name: string;
  kmsKeyArn?: string;
  ephemeris?: EphemerisData;
  tags?: { [key: string]: string | undefined };
}
export interface EphemerisIdResponse {
  ephemerisId?: string;
}
export type DurationInSeconds = number;
export type PositiveDurationInSeconds = number;
export type DataflowEdge = string[];
export type DataflowEdgeList = string[][];
export type KeyAliasArn = string;
export type KeyAliasName = string;
export type KmsKey =
  | { kmsKeyArn: string; kmsAliasArn?: never; kmsAliasName?: never }
  | { kmsKeyArn?: never; kmsAliasArn: string; kmsAliasName?: never }
  | { kmsKeyArn?: never; kmsAliasArn?: never; kmsAliasName: string };
export interface CreateMissionProfileRequest {
  name: string;
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  minimumViableContactDurationSeconds: number;
  dataflowEdges: string[][];
  trackingConfigArn: string;
  telemetrySinkConfigArn?: string;
  tags?: { [key: string]: string | undefined };
  streamsKmsKey?: KmsKey;
  streamsKmsRole?: string;
}
export interface MissionProfileIdResponse {
  missionProfileId?: string;
}
export interface DeleteConfigRequest {
  configId: string;
  configType: ConfigCapabilityType;
}
export interface DeleteDataflowEndpointGroupRequest {
  dataflowEndpointGroupId: string;
}
export interface DeleteEphemerisRequest {
  ephemerisId: string;
}
export interface DeleteMissionProfileRequest {
  missionProfileId: string;
}
export interface DescribeContactRequest {
  contactId: string;
}
export type MissionProfileArn = string;
export type SatelliteArn = string;
export type ContactStatus =
  | "SCHEDULING"
  | "FAILED_TO_SCHEDULE"
  | "SCHEDULED"
  | "CANCELLED"
  | "AWS_CANCELLED"
  | "PREPASS"
  | "PASS"
  | "POSTPASS"
  | "COMPLETED"
  | "FAILED"
  | "AVAILABLE"
  | "CANCELLING"
  | "AWS_FAILED"
  | (string & {});
export interface Elevation {
  value: number;
  unit: AngleUnits;
}
export interface AntennaDemodDecodeDetails {
  outputNode?: string;
}
export interface S3RecordingDetails {
  bucketArn?: string;
  keyTemplate?: string;
}
export type ConfigDetails =
  | {
      endpointDetails: EndpointDetails;
      antennaDemodDecodeDetails?: never;
      s3RecordingDetails?: never;
    }
  | {
      endpointDetails?: never;
      antennaDemodDecodeDetails: AntennaDemodDecodeDetails;
      s3RecordingDetails?: never;
    }
  | {
      endpointDetails?: never;
      antennaDemodDecodeDetails?: never;
      s3RecordingDetails: S3RecordingDetails;
    };
export interface Source {
  configType?: ConfigCapabilityType;
  configId?: string;
  configDetails?: ConfigDetails;
  dataflowSourceRegion?: string;
}
export interface Destination {
  configType?: ConfigCapabilityType;
  configId?: string;
  configDetails?: ConfigDetails;
  dataflowDestinationRegion?: string;
}
export interface DataflowDetail {
  source?: Source;
  destination?: Destination;
  errorMessage?: string;
}
export type DataflowList = DataflowDetail[];
export interface AzElProgramTrackSettings {
  ephemerisId: string;
}
export interface OemProgramTrackSettings {
  ephemerisId: string;
}
export interface TleProgramTrackSettings {
  ephemerisId: string;
}
export type ProgramTrackSettings =
  | { azEl: AzElProgramTrackSettings; oem?: never; tle?: never }
  | { azEl?: never; oem: OemProgramTrackSettings; tle?: never }
  | { azEl?: never; oem?: never; tle: TleProgramTrackSettings };
export interface TrackingOverrides {
  programTrackSettings?: ProgramTrackSettings;
}
export type EphemerisType = "TLE" | "OEM" | "AZ_EL" | "SERVICE_MANAGED" | (string & {});
export interface EphemerisResponseData {
  ephemerisId?: string;
  ephemerisType: EphemerisType;
}
export type VersionStatus =
  | "UPDATING"
  | "ACTIVE"
  | "SUPERSEDED"
  | "FAILED_TO_UPDATE"
  | (string & {});
export type VersionFailureReasonCode =
  | "INTERNAL_ERROR"
  | "INVALID_SATELLITE_ARN"
  | "INVALID_UPDATE_CONTACT_REQUEST"
  | "EPHEMERIS_NOT_FOUND"
  | "EPHEMERIS_TIME_RANGE_INVALID"
  | "EPHEMERIS_NOT_ENABLED"
  | "SATELLITE_DOES_NOT_MATCH_EPHEMERIS"
  | "NOT_ONBOARDED_TO_AZEL_EPHEMERIS"
  | "AZEL_EPHEMERIS_NOT_FOUND"
  | "AZEL_EPHEMERIS_WRONG_GROUND_STATION"
  | "AZEL_EPHEMERIS_INVALID_STATUS"
  | "AZEL_EPHEMERIS_TIME_RANGE_INVALID"
  | (string & {});
export type VersionFailureReasonCodes = VersionFailureReasonCode[];
export interface ContactVersion {
  versionId?: number;
  created?: Date;
  activated?: Date;
  superseded?: Date;
  lastUpdated?: Date;
  status?: VersionStatus;
  failureCodes?: VersionFailureReasonCode[];
  failureMessage?: string;
}
export interface DescribeContactResponse {
  contactId?: string;
  missionProfileArn?: string;
  satelliteArn?: string;
  startTime?: Date;
  endTime?: Date;
  prePassStartTime?: Date;
  postPassEndTime?: Date;
  groundStation?: string;
  contactStatus?: ContactStatus;
  errorMessage?: string;
  maximumElevation?: Elevation;
  tags?: { [key: string]: string | undefined };
  region?: string;
  dataflowList?: DataflowDetail[];
  visibilityStartTime?: Date;
  visibilityEndTime?: Date;
  trackingOverrides?: TrackingOverrides;
  ephemeris?: EphemerisResponseData;
  version?: ContactVersion;
}
export interface DescribeContactVersionRequest {
  contactId: string;
  versionId: number;
}
export interface DescribeContactVersionResponse {
  contactId?: string;
  missionProfileArn?: string;
  satelliteArn?: string;
  startTime?: Date;
  endTime?: Date;
  prePassStartTime?: Date;
  postPassEndTime?: Date;
  groundStation?: string;
  contactStatus?: ContactStatus;
  errorMessage?: string;
  maximumElevation?: Elevation;
  tags?: { [key: string]: string | undefined };
  region?: string;
  dataflowList?: DataflowDetail[];
  visibilityStartTime?: Date;
  visibilityEndTime?: Date;
  trackingOverrides?: TrackingOverrides;
  ephemeris?: EphemerisResponseData;
  version?: ContactVersion;
}
export interface DescribeEphemerisRequest {
  ephemerisId: string;
}
export type EphemerisStatus =
  | "VALIDATING"
  | "INVALID"
  | "ERROR"
  | "ENABLED"
  | "DISABLED"
  | "EXPIRED"
  | (string & {});
export type EphemerisPriority = number;
export interface EphemerisDescription {
  sourceS3Object?: S3Object;
  ephemerisData?: string;
}
export type EphemerisTypeDescription =
  | { tle: EphemerisDescription; oem?: never; azEl?: never }
  | { tle?: never; oem: EphemerisDescription; azEl?: never }
  | { tle?: never; oem?: never; azEl: EphemerisDescription };
export type EphemerisInvalidReason =
  | "METADATA_INVALID"
  | "TIME_RANGE_INVALID"
  | "TRAJECTORY_INVALID"
  | "KMS_KEY_INVALID"
  | "VALIDATION_ERROR"
  | (string & {});
export type EphemerisErrorCode =
  | "INTERNAL_ERROR"
  | "MISMATCHED_SATCAT_ID"
  | "OEM_VERSION_UNSUPPORTED"
  | "ORIGINATOR_MISSING"
  | "CREATION_DATE_MISSING"
  | "OBJECT_NAME_MISSING"
  | "OBJECT_ID_MISSING"
  | "REF_FRAME_UNSUPPORTED"
  | "REF_FRAME_EPOCH_UNSUPPORTED"
  | "TIME_SYSTEM_UNSUPPORTED"
  | "CENTER_BODY_UNSUPPORTED"
  | "INTERPOLATION_MISSING"
  | "INTERPOLATION_DEGREE_INVALID"
  | "AZ_EL_SEGMENT_LIST_MISSING"
  | "INSUFFICIENT_TIME_AZ_EL"
  | "START_TIME_IN_FUTURE"
  | "END_TIME_IN_PAST"
  | "EXPIRATION_TIME_TOO_EARLY"
  | "START_TIME_METADATA_TOO_EARLY"
  | "STOP_TIME_METADATA_TOO_LATE"
  | "AZ_EL_SEGMENT_END_TIME_BEFORE_START_TIME"
  | "AZ_EL_SEGMENT_TIMES_OVERLAP"
  | "AZ_EL_SEGMENTS_OUT_OF_ORDER"
  | "TIME_AZ_EL_ITEMS_OUT_OF_ORDER"
  | "MEAN_MOTION_INVALID"
  | "TIME_AZ_EL_AZ_RADIAN_RANGE_INVALID"
  | "TIME_AZ_EL_EL_RADIAN_RANGE_INVALID"
  | "TIME_AZ_EL_AZ_DEGREE_RANGE_INVALID"
  | "TIME_AZ_EL_EL_DEGREE_RANGE_INVALID"
  | "TIME_AZ_EL_ANGLE_UNITS_INVALID"
  | "INSUFFICIENT_KMS_PERMISSIONS"
  | "FILE_FORMAT_INVALID"
  | "AZ_EL_SEGMENT_REFERENCE_EPOCH_INVALID"
  | "AZ_EL_SEGMENT_START_TIME_INVALID"
  | "AZ_EL_SEGMENT_END_TIME_INVALID"
  | "AZ_EL_SEGMENT_VALID_TIME_RANGE_INVALID"
  | "AZ_EL_SEGMENT_END_TIME_TOO_LATE"
  | "AZ_EL_TOTAL_DURATION_EXCEEDED"
  | (string & {});
export type ErrorString = string;
export interface EphemerisErrorReason {
  errorCode: EphemerisErrorCode;
  errorMessage: string;
}
export type EphemerisErrorReasonList = EphemerisErrorReason[];
export interface DescribeEphemerisResponse {
  ephemerisId?: string;
  satelliteId?: string;
  status?: EphemerisStatus;
  priority?: number;
  creationTime?: Date;
  enabled?: boolean;
  name?: string;
  tags?: { [key: string]: string | undefined };
  suppliedData?: EphemerisTypeDescription;
  invalidReason?: EphemerisInvalidReason;
  errorReasons?: EphemerisErrorReason[];
}
export interface GetAgentConfigurationRequest {
  agentId: string;
}
export interface GetAgentConfigurationResponse {
  agentId?: string;
  taskingDocument?: string;
}
export interface GetAgentTaskResponseUrlRequest {
  agentId: string;
  taskId: string;
}
export interface GetAgentTaskResponseUrlResponse {
  agentId: string;
  taskId: string;
  presignedLogUrl: string;
}
export interface GetConfigRequest {
  configId: string;
  configType: ConfigCapabilityType;
}
export interface GetConfigResponse {
  configId: string;
  configArn: string;
  name: string;
  configType?: ConfigCapabilityType;
  configData: ConfigTypeData;
  tags?: { [key: string]: string | undefined };
}
export interface GetDataflowEndpointGroupRequest {
  dataflowEndpointGroupId: string;
}
export type DataflowEndpointGroupArn = string;
export interface GetDataflowEndpointGroupResponse {
  dataflowEndpointGroupId?: string;
  dataflowEndpointGroupArn?: string;
  endpointsDetails?: EndpointDetails[];
  tags?: { [key: string]: string | undefined };
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
}
export type Month = number;
export type Year = number;
export interface GetMinuteUsageRequest {
  month: number;
  year: number;
}
export interface GetMinuteUsageResponse {
  isReservedMinutesCustomer?: boolean;
  totalReservedMinuteAllocation?: number;
  upcomingMinutesScheduled?: number;
  totalScheduledMinutes?: number;
  estimatedMinutesRemaining?: number;
}
export interface GetMissionProfileRequest {
  missionProfileId: string;
}
export type AWSRegion = string;
export interface GetMissionProfileResponse {
  missionProfileId?: string;
  missionProfileArn?: string;
  name?: string;
  region?: string;
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  minimumViableContactDurationSeconds?: number;
  dataflowEdges?: string[][];
  trackingConfigArn?: string;
  telemetrySinkConfigArn?: string;
  tags?: { [key: string]: string | undefined };
  streamsKmsKey?: KmsKey;
  streamsKmsRole?: string;
}
export interface GetSatelliteRequest {
  satelliteId: string;
}
export type NoradSatelliteID = number;
export type GroundStationIdList = string[];
export type EphemerisSource = "CUSTOMER_PROVIDED" | "SPACE_TRACK" | (string & {});
export interface EphemerisMetaData {
  source: EphemerisSource;
  ephemerisId?: string;
  epoch?: Date;
  name?: string;
}
export interface GetSatelliteResponse {
  satelliteId?: string;
  satelliteArn?: string;
  noradSatelliteID?: number;
  groundStations?: string[];
  currentEphemeris?: EphemerisMetaData;
}
export type PaginationMaxResults = number;
export type PaginationToken = string;
export interface ListAntennasRequest {
  groundStationId: string;
  maxResults?: number;
  nextToken?: string;
}
export type AntennaName = string;
export interface AntennaListItem {
  groundStationName: string;
  antennaName: string;
  region: string;
}
export type AntennaList = AntennaListItem[];
export interface ListAntennasResponse {
  antennaList: AntennaListItem[];
  nextToken?: string;
}
export interface ListConfigsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ConfigListItem {
  configId?: string;
  configType?: ConfigCapabilityType;
  configArn?: string;
  name?: string;
}
export type ConfigList = ConfigListItem[];
export interface ListConfigsResponse {
  nextToken?: string;
  configList?: ConfigListItem[];
}
export type StatusList = ContactStatus[];
export interface AzElEphemerisFilter {
  id: string;
}
export type EphemerisFilter = { azEl: AzElEphemerisFilter };
export interface ListContactsRequest {
  maxResults?: number;
  nextToken?: string;
  statusList: ContactStatus[];
  startTime: Date;
  endTime: Date;
  groundStation?: string;
  satelliteArn?: string;
  missionProfileArn?: string;
  ephemeris?: EphemerisFilter;
}
export interface ContactData {
  contactId?: string;
  missionProfileArn?: string;
  satelliteArn?: string;
  startTime?: Date;
  endTime?: Date;
  prePassStartTime?: Date;
  postPassEndTime?: Date;
  groundStation?: string;
  contactStatus?: ContactStatus;
  errorMessage?: string;
  maximumElevation?: Elevation;
  region?: string;
  tags?: { [key: string]: string | undefined };
  visibilityStartTime?: Date;
  visibilityEndTime?: Date;
  ephemeris?: EphemerisResponseData;
  version?: ContactVersion;
}
export type ContactList = ContactData[];
export interface ListContactsResponse {
  nextToken?: string;
  contactList?: ContactData[];
}
export interface ListContactVersionsRequest {
  contactId: string;
  maxResults?: number;
  nextToken?: string;
}
export type ContactVersionsList = ContactVersion[];
export interface ListContactVersionsResponse {
  nextToken?: string;
  contactVersionsList?: ContactVersion[];
}
export interface ListDataflowEndpointGroupsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface DataflowEndpointListItem {
  dataflowEndpointGroupId?: string;
  dataflowEndpointGroupArn?: string;
}
export type DataflowEndpointGroupList = DataflowEndpointListItem[];
export interface ListDataflowEndpointGroupsResponse {
  nextToken?: string;
  dataflowEndpointGroupList?: DataflowEndpointListItem[];
}
export type EphemerisStatusList = EphemerisStatus[];
export interface ListEphemeridesRequest {
  satelliteId?: string;
  ephemerisType?: EphemerisType;
  startTime: Date;
  endTime: Date;
  statusList?: EphemerisStatus[];
  maxResults?: number;
  nextToken?: string;
}
export interface EphemerisItem {
  ephemerisId?: string;
  ephemerisType?: EphemerisType;
  status?: EphemerisStatus;
  priority?: number;
  enabled?: boolean;
  creationTime?: Date;
  name?: string;
  sourceS3Object?: S3Object;
}
export type EphemeridesList = EphemerisItem[];
export interface ListEphemeridesResponse {
  nextToken?: string;
  ephemerides?: EphemerisItem[];
}
export type ReservationType = "MAINTENANCE" | "CONTACT" | (string & {});
export type ReservationTypeFilterList = ReservationType[];
export interface ListGroundStationReservationsRequest {
  groundStationId: string;
  startTime: Date;
  endTime: Date;
  reservationTypes?: ReservationType[];
  maxResults?: number;
  nextToken?: string;
}
export type MaintenanceType = "PLANNED" | "UNPLANNED" | (string & {});
export interface MaintenanceReservationDetails {
  maintenanceType: MaintenanceType;
}
export interface ContactReservationDetails {
  contactId?: string;
}
export type ReservationDetails =
  | { maintenance: MaintenanceReservationDetails; contact?: never }
  | { maintenance?: never; contact: ContactReservationDetails };
export interface GroundStationReservationListItem {
  reservationType: ReservationType;
  groundStationId: string;
  antennaName: string;
  startTime: Date;
  endTime: Date;
  reservationDetails: ReservationDetails;
}
export type GroundStationReservationList = GroundStationReservationListItem[];
export interface ListGroundStationReservationsResponse {
  reservationList: GroundStationReservationListItem[];
  nextToken?: string;
}
export interface ListGroundStationsRequest {
  satelliteId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface GroundStationData {
  groundStationId?: string;
  groundStationName?: string;
  region?: string;
}
export type GroundStationList = GroundStationData[];
export interface ListGroundStationsResponse {
  nextToken?: string;
  groundStationList?: GroundStationData[];
}
export interface ListMissionProfilesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface MissionProfileListItem {
  missionProfileId?: string;
  missionProfileArn?: string;
  region?: string;
  name?: string;
}
export type MissionProfileList = MissionProfileListItem[];
export interface ListMissionProfilesResponse {
  nextToken?: string;
  missionProfileList?: MissionProfileListItem[];
}
export interface ListSatellitesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface SatelliteListItem {
  satelliteId?: string;
  satelliteArn?: string;
  noradSatelliteID?: number;
  groundStations?: string[];
  currentEphemeris?: EphemerisMetaData;
}
export type SatelliteList = SatelliteListItem[];
export interface ListSatellitesResponse {
  nextToken?: string;
  satellites?: SatelliteListItem[];
}
export type AnyArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type IpAddressList = string[];
export type CapabilityArn = string;
export type CapabilityArnList = string[];
export interface DiscoveryData {
  publicIpAddresses: string[];
  privateIpAddresses: string[];
  capabilityArns: string[];
}
export type VersionString = string;
export type InstanceId = string;
export type InstanceType = string;
export type AgentCpuCoresList = number[];
export type ComponentTypeString = string;
export type VersionStringList = string[];
export interface ComponentVersion {
  componentType: string;
  versions: string[];
}
export type ComponentVersionList = ComponentVersion[];
export interface AgentDetails {
  agentVersion: string;
  instanceId: string;
  instanceType: string;
  reservedCpuCores?: number[];
  agentCpuCores?: number[];
  componentVersions: ComponentVersion[];
}
export interface RegisterAgentRequest {
  discoveryData: DiscoveryData;
  agentDetails: AgentDetails;
  tags?: { [key: string]: string | undefined };
}
export interface RegisterAgentResponse {
  agentId?: string;
}
export interface ReserveContactRequest {
  missionProfileArn: string;
  satelliteArn?: string;
  startTime: Date;
  endTime: Date;
  groundStation: string;
  tags?: { [key: string]: string | undefined };
  trackingOverrides?: TrackingOverrides;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type SignatureMap = { [key: string]: boolean | undefined };
export interface AggregateStatus {
  status: AgentStatus;
  signatureMap?: { [key: string]: boolean | undefined };
}
export interface ComponentStatusData {
  componentType: string;
  capabilityArn: string;
  status: AgentStatus;
  bytesSent?: number;
  bytesReceived?: number;
  packetsDropped?: number;
  dataflowId: string;
}
export type ComponentStatusList = ComponentStatusData[];
export interface UpdateAgentStatusRequest {
  agentId: string;
  taskId: string;
  aggregateStatus: AggregateStatus;
  componentStatuses: ComponentStatusData[];
}
export interface UpdateAgentStatusResponse {
  agentId: string;
}
export interface UpdateConfigRequest {
  configId: string;
  name: string;
  configType: ConfigCapabilityType;
  configData: ConfigTypeData;
}
export type ClientToken = string;
export interface UpdateContactRequest {
  contactId: string;
  clientToken?: string;
  trackingOverrides?: TrackingOverrides;
  satelliteArn?: string;
}
export interface UpdateContactResponse {
  contactId?: string;
  versionId?: number;
}
export interface UpdateEphemerisRequest {
  ephemerisId: string;
  enabled: boolean;
  name?: string;
  priority?: number;
}
export interface UpdateMissionProfileRequest {
  missionProfileId: string;
  name?: string;
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  minimumViableContactDurationSeconds?: number;
  dataflowEdges?: string[][];
  trackingConfigArn?: string;
  telemetrySinkConfigArn?: string;
  streamsKmsKey?: KmsKey;
  streamsKmsRole?: string;
}
export type CancelContactError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Cancels or stops a contact with a specified contact ID based on its position in the contact lifecycle.
 *
 * For contacts that:
 *
 * - Have yet to start, the contact will be cancelled.
 *
 * - Have started but have yet to finish, the contact will be stopped.
 */
export const cancelContact: API.OperationMethod<
  CancelContactRequest,
  ContactIdResponse,
  CancelContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<CancelContactRequest>,
  output: __S(752, __c47, 0) as any as S.Schema<ContactIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelContact",
}));

export type CreateConfigError =
  | DependencyException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a `Config` with the specified `configData` parameters.
 *
 * Only one type of `configData` can be specified.
 */
export const createConfig: API.OperationMethod<
  CreateConfigRequest,
  ConfigIdResponse,
  CreateConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<CreateConfigRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<ConfigIdResponse>,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfig",
}));

export type CreateDataflowEndpointGroupError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a `DataflowEndpoint` group containing the specified list of ` DataflowEndpoint` objects.
 *
 * The `name` field in each endpoint is used in your mission profile ` DataflowEndpointConfig` to specify which endpoints to use during a contact.
 *
 * When a contact uses multiple `DataflowEndpointConfig` objects, each ` Config` must match a `DataflowEndpoint` in the same group.
 */
export const createDataflowEndpointGroup: API.OperationMethod<
  CreateDataflowEndpointGroupRequest,
  DataflowEndpointGroupIdResponse,
  CreateDataflowEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<CreateDataflowEndpointGroupRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<DataflowEndpointGroupIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataflowEndpointGroup",
}));

export type CreateDataflowEndpointGroupV2Error =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a `DataflowEndpoint` group containing the specified list of Ground Station Agent based endpoints.
 *
 * The `name` field in each endpoint is used in your mission profile ` DataflowEndpointConfig` to specify which endpoints to use during a contact.
 *
 * When a contact uses multiple `DataflowEndpointConfig` objects, each ` Config` must match a `DataflowEndpoint` in the same group.
 */
export const createDataflowEndpointGroupV2: API.OperationMethod<
  CreateDataflowEndpointGroupV2Request,
  CreateDataflowEndpointGroupV2Response,
  CreateDataflowEndpointGroupV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(948, __c59, 4) as any as S.Schema<CreateDataflowEndpointGroupV2Request>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateDataflowEndpointGroupV2Response>,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataflowEndpointGroupV2",
}));

export type CreateEphemerisError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Create an ephemeris with your specified EphemerisData.
 */
export const createEphemeris: API.OperationMethod<
  CreateEphemerisRequest,
  EphemerisIdResponse,
  CreateEphemerisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(14, __c0, 14) as any as S.Schema<CreateEphemerisRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<EphemerisIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEphemeris",
}));

export type CreateMissionProfileError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a mission profile.
 *
 * `dataflowEdges` is a list of lists of strings. Each lower level list of strings has two elements: a *from* ARN and a *to* ARN.
 */
export const createMissionProfile: API.OperationMethod<
  CreateMissionProfileRequest,
  MissionProfileIdResponse,
  CreateMissionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateMissionProfileRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<MissionProfileIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMissionProfile",
}));

export type DeleteConfigError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a `Config`.
 */
export const deleteConfig: API.OperationMethod<
  DeleteConfigRequest,
  ConfigIdResponse,
  DeleteConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteConfigRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<ConfigIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfig",
}));

export type DeleteDataflowEndpointGroupError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataflow endpoint group.
 */
export const deleteDataflowEndpointGroup: API.OperationMethod<
  DeleteDataflowEndpointGroupRequest,
  DataflowEndpointGroupIdResponse,
  DeleteDataflowEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteDataflowEndpointGroupRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<DataflowEndpointGroupIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataflowEndpointGroup",
}));

export type DeleteEphemerisError =
  | DependencyException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an ephemeris.
 */
export const deleteEphemeris: API.OperationMethod<
  DeleteEphemerisRequest,
  EphemerisIdResponse,
  DeleteEphemerisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteEphemerisRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<EphemerisIdResponse>,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEphemeris",
}));

export type DeleteMissionProfileError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a mission profile.
 */
export const deleteMissionProfile: API.OperationMethod<
  DeleteMissionProfileRequest,
  MissionProfileIdResponse,
  DeleteMissionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteMissionProfileRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<MissionProfileIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMissionProfile",
}));

export type DescribeContactError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an existing contact.
 */
export const describeContact: API.OperationMethod<
  DescribeContactRequest,
  DescribeContactResponse,
  DescribeContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DescribeContactRequest>,
  output: __S(183, __c11, 7) as any as S.Schema<DescribeContactResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContact",
}));

export type DescribeContactVersionError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a specific version of a contact.
 */
export const describeContactVersion: API.OperationMethod<
  DescribeContactVersionRequest,
  DescribeContactVersionResponse,
  DescribeContactVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DescribeContactVersionRequest>,
  output: __S(183, __c11, 7) as any as S.Schema<DescribeContactVersionResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContactVersion",
}));

export type DescribeEphemerisError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieve information about an existing ephemeris.
 */
export const describeEphemeris: API.OperationMethod<
  DescribeEphemerisRequest,
  DescribeEphemerisResponse,
  DescribeEphemerisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DescribeEphemerisRequest>,
  output: __S(261, __c16, 5) as any as S.Schema<DescribeEphemerisResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEphemeris",
}));

export type GetAgentConfigurationError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Gets the latest configuration information for a registered agent.
 */
export const getAgentConfiguration: API.OperationMethod<
  GetAgentConfigurationRequest,
  GetAgentConfigurationResponse,
  GetAgentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetAgentConfigurationRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetAgentConfigurationResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentConfiguration",
}));

export type GetAgentTaskResponseUrlError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Gets a presigned URL for uploading agent task response logs.
 */
export const getAgentTaskResponseUrl: API.OperationMethod<
  GetAgentTaskResponseUrlRequest,
  GetAgentTaskResponseUrlResponse,
  GetAgentTaskResponseUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetAgentTaskResponseUrlRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetAgentTaskResponseUrlResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentTaskResponseUrl",
}));

export type GetConfigError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns `Config` information.
 *
 * Only one `Config` response can be returned.
 */
export const getConfig: API.OperationMethod<
  GetConfigRequest,
  GetConfigResponse,
  GetConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<GetConfigRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<GetConfigResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfig",
}));

export type GetDataflowEndpointGroupError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the dataflow endpoint group.
 */
export const getDataflowEndpointGroup: API.OperationMethod<
  GetDataflowEndpointGroupRequest,
  GetDataflowEndpointGroupResponse,
  GetDataflowEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetDataflowEndpointGroupRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<GetDataflowEndpointGroupResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataflowEndpointGroup",
}));

export type GetMinuteUsageError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the number of reserved minutes used by account.
 */
export const getMinuteUsage: API.OperationMethod<
  GetMinuteUsageRequest,
  GetMinuteUsageResponse,
  GetMinuteUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetMinuteUsageRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<GetMinuteUsageResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMinuteUsage",
}));

export type GetMissionProfileError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a mission profile.
 */
export const getMissionProfile: API.OperationMethod<
  GetMissionProfileRequest,
  GetMissionProfileResponse,
  GetMissionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetMissionProfileRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<GetMissionProfileResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMissionProfile",
}));

export type GetSatelliteError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a satellite.
 */
export const getSatellite: API.OperationMethod<
  GetSatelliteRequest,
  GetSatelliteResponse,
  GetSatelliteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetSatelliteRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<GetSatelliteResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSatellite",
}));

export type ListAntennasError = DependencyException | InvalidParameterException | CommonErrors;
/**
 * Returns a list of antennas at a specified ground station.
 */
export const listAntennas: API.PaginatedOperationMethod<
  ListAntennasRequest,
  ListAntennasResponse,
  ListAntennasError,
  Credentials | HttpClient.HttpClient,
  AntennaListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListAntennasRequest>,
  output: __S(403, __c25, 3) as any as S.Schema<ListAntennasResponse>,
  errors: [DependencyException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAntennas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "antennaList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfigsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of `Config` objects.
 */
export const listConfigs: API.PaginatedOperationMethod<
  ListConfigsRequest,
  ListConfigsResponse,
  ListConfigsError,
  Credentials | HttpClient.HttpClient,
  ConfigListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<ListConfigsRequest>,
  output: __S(419, __c26, 3) as any as S.Schema<ListConfigsResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContactsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of contacts.
 *
 * If `statusList` contains AVAILABLE, the request must include ` groundStation`, `missionprofileArn`, and `satelliteArn`.
 */
export const listContacts: API.PaginatedOperationMethod<
  ListContactsRequest,
  ListContactsResponse,
  ListContactsError,
  Credentials | HttpClient.HttpClient,
  ContactData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(434, __c27, 2) as any as S.Schema<ListContactsRequest>,
  output: __S(437, __c27, 5) as any as S.Schema<ListContactsResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contactList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContactVersionsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of versions for a specified contact.
 */
export const listContactVersions: API.PaginatedOperationMethod<
  ListContactVersionsRequest,
  ListContactVersionsResponse,
  ListContactVersionsError,
  Credentials | HttpClient.HttpClient,
  ContactVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListContactVersionsRequest>,
  output: __S(450, __c28, 2) as any as S.Schema<ListContactVersionsResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contactVersionsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataflowEndpointGroupsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of `DataflowEndpoint` groups.
 */
export const listDataflowEndpointGroups: API.PaginatedOperationMethod<
  ListDataflowEndpointGroupsRequest,
  ListDataflowEndpointGroupsResponse,
  ListDataflowEndpointGroupsError,
  Credentials | HttpClient.HttpClient,
  DataflowEndpointListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListDataflowEndpointGroupsRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<ListDataflowEndpointGroupsResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataflowEndpointGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataflowEndpointGroupList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEphemeridesError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List your existing ephemerides.
 */
export const listEphemerides: API.PaginatedOperationMethod<
  ListEphemeridesRequest,
  ListEphemeridesResponse,
  ListEphemeridesError,
  Credentials | HttpClient.HttpClient,
  EphemerisItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListEphemeridesRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<ListEphemeridesResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEphemerides",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ephemerides",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGroundStationReservationsError =
  | DependencyException
  | InvalidParameterException
  | CommonErrors;
/**
 * Returns a list of reservations for a specified ground station.
 */
export const listGroundStationReservations: API.PaginatedOperationMethod<
  ListGroundStationReservationsRequest,
  ListGroundStationReservationsResponse,
  ListGroundStationReservationsError,
  Credentials | HttpClient.HttpClient,
  GroundStationReservationListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListGroundStationReservationsRequest>,
  output: __S(502, __c31, 6) as any as S.Schema<ListGroundStationReservationsResponse>,
  errors: [DependencyException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroundStationReservations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reservationList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGroundStationsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of ground stations.
 */
export const listGroundStations: API.PaginatedOperationMethod<
  ListGroundStationsRequest,
  ListGroundStationsResponse,
  ListGroundStationsError,
  Credentials | HttpClient.HttpClient,
  GroundStationData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListGroundStationsRequest>,
  output: __S(515, __c32, 3) as any as S.Schema<ListGroundStationsResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroundStations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "groundStationList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMissionProfilesError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of mission profiles.
 */
export const listMissionProfiles: API.PaginatedOperationMethod<
  ListMissionProfilesRequest,
  ListMissionProfilesResponse,
  ListMissionProfilesError,
  Credentials | HttpClient.HttpClient,
  MissionProfileListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListMissionProfilesRequest>,
  output: __S(531, __c33, 3) as any as S.Schema<ListMissionProfilesResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMissionProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "missionProfileList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSatellitesError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of satellites.
 */
export const listSatellites: API.PaginatedOperationMethod<
  ListSatellitesRequest,
  ListSatellitesResponse,
  ListSatellitesError,
  Credentials | HttpClient.HttpClient,
  SatelliteListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListSatellitesRequest>,
  output: __S(546, __c34, 2) as any as S.Schema<ListSatellitesResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSatellites",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "satellites",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tags for a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterAgentError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Registers a new agent with AWS Ground Station.
 */
export const registerAgent: API.OperationMethod<
  RegisterAgentRequest,
  RegisterAgentResponse,
  RegisterAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(581, __c36, 5) as any as S.Schema<RegisterAgentRequest>,
  output: __S(582, __c36, 6) as any as S.Schema<RegisterAgentResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterAgent",
}));

export type ReserveContactError =
  | DependencyException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Reserves a contact using specified parameters.
 */
export const reserveContact: API.OperationMethod<
  ReserveContactRequest,
  ContactIdResponse,
  ReserveContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ReserveContactRequest>,
  output: __S(752, __c47, 0) as any as S.Schema<ContactIdResponse>,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReserveContact",
}));

export type TagResourceError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns a tag to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<TagResourceResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deassigns a resource tag.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAgentStatusError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Update the status of the agent.
 */
export const updateAgentStatus: API.OperationMethod<
  UpdateAgentStatusRequest,
  UpdateAgentStatusResponse,
  UpdateAgentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(660, __c41, 4) as any as S.Schema<UpdateAgentStatusRequest>,
  output: __S(661, __c41, 5) as any as S.Schema<UpdateAgentStatusResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentStatus",
}));

export type UpdateConfigError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `Config` used when scheduling contacts.
 *
 * Updating a `Config` will not update the execution parameters for existing future contacts scheduled with this `Config`.
 */
export const updateConfig: API.OperationMethod<
  UpdateConfigRequest,
  ConfigIdResponse,
  UpdateConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<UpdateConfigRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<ConfigIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfig",
}));

export type UpdateContactError =
  | DependencyException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a specific contact.
 */
export const updateContact: API.OperationMethod<
  UpdateContactRequest,
  UpdateContactResponse,
  UpdateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<UpdateContactRequest>,
  output: __S(752, __c47, 0) as any as S.Schema<UpdateContactResponse>,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContact",
}));

export type UpdateEphemerisError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update an existing ephemeris.
 */
export const updateEphemeris: API.OperationMethod<
  UpdateEphemerisRequest,
  EphemerisIdResponse,
  UpdateEphemerisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<UpdateEphemerisRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<EphemerisIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEphemeris",
}));

export type UpdateMissionProfileError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a mission profile.
 *
 * Updating a mission profile will not update the execution parameters for existing future contacts.
 */
export const updateMissionProfile: API.OperationMethod<
  UpdateMissionProfileRequest,
  MissionProfileIdResponse,
  UpdateMissionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<UpdateMissionProfileRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<MissionProfileIdResponse>,
  errors: [DependencyException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMissionProfile",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "TimeRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tleLine1: S.String, tleLine2: S.String, validTimeRange: __S(0, __c0, 0) }),
      ).annotate({ identifier: "TLEData" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ s3Object: S.optional(__S(32, __c2, 0)), tleData: S.optional(__S(2, __c0, 2)) }),
      ).annotate({ identifier: "TLEEphemeris" });
    case 4:
      return S.suspend(() =>
        S.Struct({ s3Object: S.optional(__S(32, __c2, 0)), oemData: S.optional(S.String) }),
      ).annotate({ identifier: "OEMEphemeris" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ISO8601TimeRange" });
    case 6:
      return S.suspend(() => S.Struct({ dt: S.Number, az: S.Number, el: S.Number })).annotate({
        identifier: "TimeAzEl",
      });
    case 7:
      return S.Array(__S(6, __c0, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          referenceEpoch: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          validTimeRange: __S(5, __c0, 5),
          azElList: __S(7, __c0, 7),
        }),
      ).annotate({ identifier: "AzElSegment" });
    case 9:
      return S.Array(__S(8, __c0, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ angleUnit: S.String, azElSegmentList: __S(9, __c0, 9) }),
      ).annotate({ identifier: "AzElSegments" });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3Object: __S(32, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ azElData: __S(10, __c0, 10) }),
      ]);
    case 12:
      return S.suspend(() =>
        S.Struct({ groundStation: S.String, data: __S(11, __c0, 11) }),
      ).annotate({ identifier: "AzElEphemeris" });
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ tle: __S(3, __c0, 3) }),
        /*@__PURE__*/ S.Struct({ oem: __S(4, __c0, 4) }),
        /*@__PURE__*/ S.Struct({ azEl: __S(12, __c0, 12) }),
      ]);
    case 14:
      return S.suspend(() =>
        S.Struct({
          satelliteId: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          priority: S.optional(S.Number),
          expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          name: S.String,
          kmsKeyArn: S.optional(S.String),
          ephemeris: S.optional(__S(13, __c0, 13)),
          tags: S.optional(__S(816, __c51, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/ephemeris" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEphemerisRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ephemerisId: S.optional(S.String) })).annotate({
        identifier: "EphemerisIdResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(S.String),
          key: S.optional(S.String),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Object" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          contactPrePassDurationSeconds: S.optional(S.Number),
          contactPostPassDurationSeconds: S.optional(S.Number),
          minimumViableContactDurationSeconds: S.Number,
          dataflowEdges: __S(80, __c5, 0),
          trackingConfigArn: S.String,
          telemetrySinkConfigArn: S.optional(S.String),
          tags: S.optional(__S(816, __c51, 0)),
          streamsKmsKey: S.optional(__S(81, __c5, 1)),
          streamsKmsRole: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/missionprofile" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMissionProfileRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ missionProfileId: S.optional(S.String) })).annotate({
        identifier: "MissionProfileIdResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(848, __c53, 0));
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ kmsKeyArn: S.String }),
        /*@__PURE__*/ S.Struct({ kmsAliasArn: S.String }),
        /*@__PURE__*/ S.Struct({ kmsAliasName: S.String }),
      ]);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configId: S.String.pipe(T.HttpLabel("configId")),
          configType: S.String.pipe(T.HttpLabel("configType")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/config/{configType}/{configId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataflowEndpointGroupId: S.String.pipe(T.HttpLabel("dataflowEndpointGroupId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/dataflowEndpointGroup/{dataflowEndpointGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataflowEndpointGroupRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ephemerisId: S.String.pipe(T.HttpLabel("ephemerisId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ephemeris/{ephemerisId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEphemerisRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/missionprofile/{missionProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMissionProfileRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contactId: S.String.pipe(T.HttpLabel("contactId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/contact/{contactId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeContactRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ outputNode: S.optional(S.String) })).annotate({
        identifier: "AntennaDemodDecodeDetails",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ bucketArn: S.optional(S.String), keyTemplate: S.optional(S.String) }),
      ).annotate({ identifier: "S3RecordingDetails" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ endpointDetails: __S(869, __c54, 5) }),
        /*@__PURE__*/ S.Struct({ antennaDemodDecodeDetails: __S(176, __c11, 0) }),
        /*@__PURE__*/ S.Struct({ s3RecordingDetails: __S(177, __c11, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          configType: S.optional(S.String),
          configId: S.optional(S.String),
          configDetails: S.optional(__S(178, __c11, 2)),
          dataflowSourceRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Source" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          configType: S.optional(S.String),
          configId: S.optional(S.String),
          configDetails: S.optional(__S(178, __c11, 2)),
          dataflowDestinationRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Destination" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          source: S.optional(__S(179, __c11, 3)),
          destination: S.optional(__S(180, __c11, 4)),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataflowDetail" });
    case 6:
      return S.Array(__S(181, __c11, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          contactId: S.optional(S.String),
          missionProfileArn: S.optional(S.String),
          satelliteArn: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          prePassStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          postPassEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          groundStation: S.optional(S.String),
          contactStatus: S.optional(S.String),
          errorMessage: S.optional(S.String),
          maximumElevation: S.optional(__S(192, __c12, 0)),
          tags: S.optional(__S(816, __c51, 0)),
          region: S.optional(S.String),
          dataflowList: S.optional(__S(182, __c11, 6)),
          visibilityStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          visibilityEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          trackingOverrides: S.optional(__S(226, __c14, 2)),
          ephemeris: S.optional(__S(193, __c12, 1)),
          version: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "DescribeContactResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.Number, unit: S.String })).annotate({
        identifier: "Elevation",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ ephemerisId: S.optional(S.String), ephemerisType: S.String }),
      ).annotate({ identifier: "EphemerisResponseData" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          versionId: S.optional(S.Number),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          activated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          superseded: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          failureCodes: S.optional(__S(880, __c55, 0)),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContactVersion" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ephemerisId: S.String })).annotate({
        identifier: "AzElProgramTrackSettings",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ azEl: __S(224, __c14, 0) }),
        /*@__PURE__*/ S.Struct({ oem: __S(224, __c14, 0) }),
        /*@__PURE__*/ S.Struct({ tle: __S(224, __c14, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ programTrackSettings: S.optional(__S(225, __c14, 1)) }),
      ).annotate({ identifier: "TrackingOverrides" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contactId: S.String.pipe(T.HttpLabel("contactId")),
          versionId: S.Number.pipe(T.HttpLabel("versionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/contact/{contactId}/versions/{versionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeContactVersionRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ephemerisId: S.String.pipe(T.HttpLabel("ephemerisId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ephemeris/{ephemerisId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeEphemerisRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sourceS3Object: S.optional(__S(32, __c2, 0)),
          ephemerisData: S.optional(S.String),
        }),
      ).annotate({ identifier: "EphemerisDescription" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ tle: __S(257, __c16, 1) }),
        /*@__PURE__*/ S.Struct({ oem: __S(257, __c16, 1) }),
        /*@__PURE__*/ S.Struct({ azEl: __S(257, __c16, 1) }),
      ]);
    case 3:
      return S.suspend(() => S.Struct({ errorCode: S.String, errorMessage: S.String })).annotate({
        identifier: "EphemerisErrorReason",
      });
    case 4:
      return S.Array(__S(259, __c16, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ephemerisId: S.optional(S.String),
          satelliteId: S.optional(S.String),
          status: S.optional(S.String),
          priority: S.optional(S.Number),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          enabled: S.optional(S.Boolean),
          name: S.optional(S.String),
          tags: S.optional(__S(816, __c51, 0)),
          suppliedData: S.optional(__S(258, __c16, 2)),
          invalidReason: S.optional(S.String),
          errorReasons: S.optional(__S(260, __c16, 4)),
        }),
      ).annotate({ identifier: "DescribeEphemerisResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentId: S.String.pipe(T.HttpLabel("agentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/agent/{agentId}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ agentId: S.optional(S.String), taskingDocument: S.optional(S.String) }),
      ).annotate({ identifier: "GetAgentConfigurationResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          taskId: S.String.pipe(T.HttpLabel("taskId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/agentResponseUrl/{agentId}/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentTaskResponseUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ agentId: S.String, taskId: S.String, presignedLogUrl: S.String }),
      ).annotate({ identifier: "GetAgentTaskResponseUrlResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configId: S.String.pipe(T.HttpLabel("configId")),
          configType: S.String.pipe(T.HttpLabel("configType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/config/{configType}/{configId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configId: S.String,
          configArn: S.String,
          name: S.String,
          configType: S.optional(S.String),
          configData: __S(814, __c50, 14),
          tags: S.optional(__S(816, __c51, 0)),
        }),
      ).annotate({ identifier: "GetConfigResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataflowEndpointGroupId: S.String.pipe(T.HttpLabel("dataflowEndpointGroupId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/dataflowEndpointGroup/{dataflowEndpointGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataflowEndpointGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataflowEndpointGroupId: S.optional(S.String),
          dataflowEndpointGroupArn: S.optional(S.String),
          endpointsDetails: S.optional(__S(896, __c56, 0)),
          tags: S.optional(__S(816, __c51, 0)),
          contactPrePassDurationSeconds: S.optional(S.Number),
          contactPostPassDurationSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetDataflowEndpointGroupResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ month: S.Number, year: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/minute-usage" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMinuteUsageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          isReservedMinutesCustomer: S.optional(S.Boolean),
          totalReservedMinuteAllocation: S.optional(S.Number),
          upcomingMinutesScheduled: S.optional(S.Number),
          totalScheduledMinutes: S.optional(S.Number),
          estimatedMinutesRemaining: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetMinuteUsageResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/missionprofile/{missionProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMissionProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          missionProfileId: S.optional(S.String),
          missionProfileArn: S.optional(S.String),
          name: S.optional(S.String),
          region: S.optional(S.String),
          contactPrePassDurationSeconds: S.optional(S.Number),
          contactPostPassDurationSeconds: S.optional(S.Number),
          minimumViableContactDurationSeconds: S.optional(S.Number),
          dataflowEdges: S.optional(__S(80, __c5, 0)),
          trackingConfigArn: S.optional(S.String),
          telemetrySinkConfigArn: S.optional(S.String),
          tags: S.optional(__S(816, __c51, 0)),
          streamsKmsKey: S.optional(__S(81, __c5, 1)),
          streamsKmsRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMissionProfileResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ satelliteId: S.String.pipe(T.HttpLabel("satelliteId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/satellite/{satelliteId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSatelliteRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          source: S.String,
          ephemerisId: S.optional(S.String),
          epoch: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "EphemerisMetaData" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          satelliteId: S.optional(S.String),
          satelliteArn: S.optional(S.String),
          noradSatelliteID: S.optional(S.Number),
          groundStations: S.optional(__S(848, __c53, 0)),
          currentEphemeris: S.optional(__S(384, __c24, 0)),
        }),
      ).annotate({ identifier: "GetSatelliteResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          groundStationId: S.String.pipe(T.HttpLabel("groundStationId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/groundstation/{groundStationId}/antenna" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAntennasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ groundStationName: S.String, antennaName: S.String, region: S.String }),
      ).annotate({ identifier: "AntennaListItem" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ antennaList: __S(402, __c25, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAntennasResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/config" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConfigsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configId: S.optional(S.String),
          configType: S.optional(S.String),
          configArn: S.optional(S.String),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigListItem" });
    case 2:
      return S.Array(__S(417, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), configList: S.optional(__S(418, __c26, 2)) }),
      ).annotate({ identifier: "ListConfigsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String })).annotate({
        identifier: "AzElEphemerisFilter",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ azEl: __S(432, __c27, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          statusList: __S(880, __c55, 0),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          groundStation: S.optional(S.String),
          satelliteArn: S.optional(S.String),
          missionProfileArn: S.optional(S.String),
          ephemeris: S.optional(__S(433, __c27, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/contacts" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListContactsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          contactId: S.optional(S.String),
          missionProfileArn: S.optional(S.String),
          satelliteArn: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          prePassStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          postPassEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          groundStation: S.optional(S.String),
          contactStatus: S.optional(S.String),
          errorMessage: S.optional(S.String),
          maximumElevation: S.optional(__S(192, __c12, 0)),
          region: S.optional(S.String),
          tags: S.optional(__S(816, __c51, 0)),
          visibilityStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          visibilityEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ephemeris: S.optional(__S(193, __c12, 1)),
          version: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "ContactData" });
    case 4:
      return S.Array(__S(435, __c27, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), contactList: S.optional(__S(436, __c27, 4)) }),
      ).annotate({ identifier: "ListContactsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contactId: S.String.pipe(T.HttpLabel("contactId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/contact/{contactId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListContactVersionsRequest" });
    case 1:
      return S.Array(__S(208, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          contactVersionsList: S.optional(__S(449, __c28, 1)),
        }),
      ).annotate({ identifier: "ListContactVersionsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/dataflowEndpointGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataflowEndpointGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataflowEndpointGroupId: S.optional(S.String),
          dataflowEndpointGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataflowEndpointListItem" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          dataflowEndpointGroupList: S.optional(__S(466, __c29, 2)),
        }),
      ).annotate({ identifier: "ListDataflowEndpointGroupsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          satelliteId: S.optional(S.String),
          ephemerisType: S.optional(S.String),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          statusList: S.optional(__S(880, __c55, 0)),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ephemerides" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEphemeridesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ephemerisId: S.optional(S.String),
          ephemerisType: S.optional(S.String),
          status: S.optional(S.String),
          priority: S.optional(S.Number),
          enabled: S.optional(S.Boolean),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          name: S.optional(S.String),
          sourceS3Object: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "EphemerisItem" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), ephemerides: S.optional(__S(482, __c30, 2)) }),
      ).annotate({ identifier: "ListEphemeridesResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          groundStationId: S.String.pipe(T.HttpLabel("groundStationId")),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("startTime")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("endTime")),
          reservationTypes: S.optional(__S(880, __c55, 0)).pipe(T.HttpQuery("reservationTypes")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/groundstation/{groundStationId}/reservation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroundStationReservationsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ maintenanceType: S.String })).annotate({
        identifier: "MaintenanceReservationDetails",
      });
    case 2:
      return S.suspend(() => S.Struct({ contactId: S.optional(S.String) })).annotate({
        identifier: "ContactReservationDetails",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ maintenance: __S(497, __c31, 1) }),
        /*@__PURE__*/ S.Struct({ contact: __S(498, __c31, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          reservationType: S.String,
          groundStationId: S.String,
          antennaName: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          reservationDetails: __S(499, __c31, 3),
        }),
      ).annotate({ identifier: "GroundStationReservationListItem" });
    case 5:
      return S.Array(__S(500, __c31, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ reservationList: __S(501, __c31, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGroundStationReservationsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          satelliteId: S.optional(S.String).pipe(T.HttpQuery("satelliteId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/groundstation" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGroundStationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          groundStationId: S.optional(S.String),
          groundStationName: S.optional(S.String),
          region: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroundStationData" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          groundStationList: S.optional(__S(514, __c32, 2)),
        }),
      ).annotate({ identifier: "ListGroundStationsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/missionprofile" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMissionProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          missionProfileId: S.optional(S.String),
          missionProfileArn: S.optional(S.String),
          region: S.optional(S.String),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "MissionProfileListItem" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          missionProfileList: S.optional(__S(530, __c33, 2)),
        }),
      ).annotate({ identifier: "ListMissionProfilesResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/satellite" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSatellitesRequest" });
    case 1:
      return S.Array(__S(385, __c24, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), satellites: S.optional(__S(545, __c34, 1)) }),
      ).annotate({ identifier: "ListSatellitesResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(816, __c51, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          publicIpAddresses: __S(848, __c53, 0),
          privateIpAddresses: __S(848, __c53, 0),
          capabilityArns: __S(848, __c53, 0),
        }),
      ).annotate({ identifier: "DiscoveryData" });
    case 1:
      return S.Array(S.Number);
    case 2:
      return S.suspend(() =>
        S.Struct({ componentType: S.String, versions: __S(848, __c53, 0) }),
      ).annotate({ identifier: "ComponentVersion" });
    case 3:
      return S.Array(__S(578, __c36, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          agentVersion: S.String,
          instanceId: S.String,
          instanceType: S.String,
          reservedCpuCores: S.optional(__S(577, __c36, 1)),
          agentCpuCores: S.optional(__S(577, __c36, 1)),
          componentVersions: __S(579, __c36, 3),
        }),
      ).annotate({ identifier: "AgentDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          discoveryData: __S(576, __c36, 0),
          agentDetails: __S(580, __c36, 4),
          tags: S.optional(__S(816, __c51, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/agent" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterAgentRequest" });
    case 6:
      return S.suspend(() => S.Struct({ agentId: S.optional(S.String) })).annotate({
        identifier: "RegisterAgentResponse",
      });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          missionProfileArn: S.String,
          satelliteArn: S.optional(S.String),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          groundStation: S.String,
          tags: S.optional(__S(816, __c51, 0)),
          trackingOverrides: S.optional(__S(226, __c14, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/contact" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ReserveContactRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(816, __c51, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(848, __c53, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Boolean.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.String, signatureMap: S.optional(__S(656, __c41, 0)) }),
      ).annotate({ identifier: "AggregateStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          componentType: S.String,
          capabilityArn: S.String,
          status: S.String,
          bytesSent: S.optional(S.Number),
          bytesReceived: S.optional(S.Number),
          packetsDropped: S.optional(S.Number),
          dataflowId: S.String,
        }),
      ).annotate({ identifier: "ComponentStatusData" });
    case 3:
      return S.Array(__S(658, __c41, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          taskId: S.String,
          aggregateStatus: __S(657, __c41, 1),
          componentStatuses: __S(659, __c41, 3),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/agent/{agentId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAgentStatusRequest" });
    case 5:
      return S.suspend(() => S.Struct({ agentId: S.String })).annotate({
        identifier: "UpdateAgentStatusResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configId: S.String.pipe(T.HttpLabel("configId")),
          name: S.String,
          configType: S.String.pipe(T.HttpLabel("configType")),
          configData: __S(814, __c50, 14),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/config/{configType}/{configId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contactId: S.String.pipe(T.HttpLabel("contactId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          trackingOverrides: S.optional(__S(226, __c14, 2)),
          satelliteArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/contact/{contactId}/versions" }),
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
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ephemerisId: S.String.pipe(T.HttpLabel("ephemerisId")),
          enabled: S.Boolean,
          name: S.optional(S.String),
          priority: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/ephemeris/{ephemerisId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEphemerisRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")),
          name: S.optional(S.String),
          contactPrePassDurationSeconds: S.optional(S.Number),
          contactPostPassDurationSeconds: S.optional(S.Number),
          minimumViableContactDurationSeconds: S.optional(S.Number),
          dataflowEdges: S.optional(__S(80, __c5, 0)),
          trackingConfigArn: S.optional(S.String),
          telemetrySinkConfigArn: S.optional(S.String),
          streamsKmsKey: S.optional(__S(81, __c5, 1)),
          streamsKmsRole: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/missionprofile/{missionProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMissionProfileRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contactId: S.String.pipe(T.HttpLabel("contactId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/contact/{contactId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelContactRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contactId: S.optional(S.String), versionId: S.optional(S.Number) }),
      ).annotate({ identifier: "ContactIdResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          configData: __S(814, __c50, 14),
          tags: S.optional(__S(816, __c51, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/config" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConfigRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configId: S.optional(S.String),
          configType: S.optional(S.String),
          configArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigIdResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.Number, units: S.String })).annotate({
        identifier: "Frequency",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          centerFrequency: __S(800, __c50, 0),
          bandwidth: __S(800, __c50, 0),
          polarization: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpectrumConfig" });
    case 2:
      return S.suspend(() => S.Struct({ spectrumConfig: __S(801, __c50, 1) })).annotate({
        identifier: "AntennaDownlinkConfig",
      });
    case 3:
      return S.suspend(() => S.Struct({ autotrack: S.String })).annotate({
        identifier: "TrackingConfig",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ dataflowEndpointName: S.String, dataflowEndpointRegion: S.optional(S.String) }),
      ).annotate({ identifier: "DataflowEndpointConfig" });
    case 5:
      return S.suspend(() => S.Struct({ unvalidatedJSON: S.String })).annotate({
        identifier: "DemodulationConfig",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          spectrumConfig: __S(801, __c50, 1),
          demodulationConfig: __S(805, __c50, 5),
          decodeConfig: __S(805, __c50, 5),
        }),
      ).annotate({ identifier: "AntennaDownlinkDemodDecodeConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({ centerFrequency: __S(800, __c50, 0), polarization: S.optional(S.String) }),
      ).annotate({ identifier: "UplinkSpectrumConfig" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          transmitDisabled: S.optional(S.Boolean),
          spectrumConfig: __S(807, __c50, 7),
          targetEirp: __S(800, __c50, 0),
        }),
      ).annotate({ identifier: "AntennaUplinkConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({ enabled: S.Boolean, antennaUplinkConfigArn: S.String }),
      ).annotate({ identifier: "UplinkEchoConfig" });
    case 10:
      return S.suspend(() =>
        S.Struct({ bucketArn: S.String, roleArn: S.String, prefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3RecordingConfig" });
    case 11:
      return S.suspend(() =>
        S.Struct({ kinesisRoleArn: S.String, kinesisDataStreamArn: S.String }),
      ).annotate({ identifier: "KinesisDataStreamData" });
    case 12:
      return S.Union([/*@__PURE__*/ S.Struct({ kinesisDataStreamData: __S(811, __c50, 11) })]);
    case 13:
      return S.suspend(() =>
        S.Struct({ telemetrySinkType: S.String, telemetrySinkData: __S(812, __c50, 12) }),
      ).annotate({ identifier: "TelemetrySinkConfig" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ antennaDownlinkConfig: __S(802, __c50, 2) }),
        /*@__PURE__*/ S.Struct({ trackingConfig: __S(803, __c50, 3) }),
        /*@__PURE__*/ S.Struct({ dataflowEndpointConfig: __S(804, __c50, 4) }),
        /*@__PURE__*/ S.Struct({ antennaDownlinkDemodDecodeConfig: __S(806, __c50, 6) }),
        /*@__PURE__*/ S.Struct({ antennaUplinkConfig: __S(808, __c50, 8) }),
        /*@__PURE__*/ S.Struct({ uplinkEchoConfig: __S(809, __c50, 9) }),
        /*@__PURE__*/ S.Struct({ s3RecordingConfig: __S(810, __c50, 10) }),
        /*@__PURE__*/ S.Struct({ telemetrySinkConfig: __S(813, __c50, 13) }),
      ]);
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          endpointDetails: __S(896, __c56, 0),
          tags: S.optional(__S(816, __c51, 0)),
          contactPrePassDurationSeconds: S.optional(S.Number),
          contactPostPassDurationSeconds: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/dataflowEndpointGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataflowEndpointGroupRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subnetIds: __S(848, __c53, 0),
          securityGroupIds: __S(848, __c53, 0),
          roleArn: S.String,
        }),
      ).annotate({ identifier: "SecurityDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          address: S.optional(__S(928, __c58, 0)),
          status: S.optional(S.String),
          mtu: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataflowEndpoint" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          egressAddress: __S(929, __c58, 1),
          ingressAddress: __S(932, __c58, 4),
          agentStatus: S.optional(S.String),
          auditResults: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsGroundStationAgentEndpoint" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          dataflowDetails: __S(934, __c58, 6),
          agentStatus: S.optional(S.String),
          auditResults: S.optional(S.String),
        }),
      ).annotate({ identifier: "UplinkAwsGroundStationAgentEndpointDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          dataflowDetails: __S(936, __c58, 8),
          agentStatus: S.optional(S.String),
          auditResults: S.optional(S.String),
        }),
      ).annotate({ identifier: "DownlinkAwsGroundStationAgentEndpointDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          securityDetails: S.optional(__S(864, __c54, 0)),
          endpoint: S.optional(__S(865, __c54, 1)),
          awsGroundStationAgentEndpoint: S.optional(__S(866, __c54, 2)),
          uplinkAwsGroundStationAgentEndpoint: S.optional(__S(867, __c54, 3)),
          downlinkAwsGroundStationAgentEndpoint: S.optional(__S(868, __c54, 4)),
          healthStatus: S.optional(S.String),
          healthReasons: S.optional(__S(880, __c55, 0)),
        }),
      ).annotate({ identifier: "EndpointDetails" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(869, __c54, 5));
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ dataflowEndpointGroupId: S.optional(S.String) })).annotate({
        identifier: "DataflowEndpointGroupIdResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, port: S.Number })).annotate({
        identifier: "SocketAddress",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ socketAddress: __S(928, __c58, 0), mtu: S.optional(S.Number) }),
      ).annotate({ identifier: "ConnectionDetails" });
    case 2:
      return S.suspend(() => S.Struct({ minimum: S.Number, maximum: S.Number })).annotate({
        identifier: "IntegerRange",
      });
    case 3:
      return S.suspend(() => S.Struct({ name: S.String, portRange: __S(930, __c58, 2) })).annotate({
        identifier: "RangedSocketAddress",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ socketAddress: __S(931, __c58, 3), mtu: S.optional(S.Number) }),
      ).annotate({ identifier: "RangedConnectionDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ingressAddressAndPort: __S(929, __c58, 1),
          agentIpAndPortAddress: __S(932, __c58, 4),
        }),
      ).annotate({ identifier: "UplinkConnectionDetails" });
    case 6:
      return S.Union([/*@__PURE__*/ S.Struct({ agentConnectionDetails: __S(933, __c58, 5) })]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          agentIpAndPortAddress: __S(932, __c58, 4),
          egressAddressAndPort: __S(929, __c58, 1),
        }),
      ).annotate({ identifier: "DownlinkConnectionDetails" });
    case 8:
      return S.Union([/*@__PURE__*/ S.Struct({ agentConnectionDetails: __S(935, __c58, 7) })]);
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, dataflowDetails: __S(934, __c58, 6) }),
      ).annotate({ identifier: "UplinkAwsGroundStationAgentEndpoint" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.String, dataflowDetails: __S(936, __c58, 8) }),
      ).annotate({ identifier: "DownlinkAwsGroundStationAgentEndpoint" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ uplinkAwsGroundStationAgentEndpoint: __S(944, __c59, 0) }),
        /*@__PURE__*/ S.Struct({ downlinkAwsGroundStationAgentEndpoint: __S(945, __c59, 1) }),
      ]);
    case 3:
      return S.Array(__S(946, __c59, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          endpoints: __S(947, __c59, 3),
          contactPrePassDurationSeconds: S.optional(S.Number),
          contactPostPassDurationSeconds: S.optional(S.Number),
          tags: S.optional(__S(816, __c51, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/dataflowEndpointGroupV2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataflowEndpointGroupV2Request" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
