import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "GroundStation",
  target: "GroundStation",
  version: "2019-05-23",
  sigv4: "groundstation",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://groundstation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://groundstation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DependencyException
  extends /*@__PURE__*/ TE.TaggedError("DependencyException", ["ServerError"], {
    status: 531,
  })<{ readonly message?: string; readonly parameterName?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException", [], {
    status: 431,
  })<{ readonly message?: string; readonly parameterName?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly parameterName?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException", [], {
    status: 434,
  })<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string; readonly parameterName?: string }> {}
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
export type TelemetrySinkData = {
  kinesisDataStreamData: KinesisDataStreamData;
};
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
export type AgentStatus =
  | "SUCCESS"
  | "FAILED"
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
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
export type UplinkDataflowDetails = {
  agentConnectionDetails: UplinkConnectionDetails;
};
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
export type DownlinkDataflowDetails = {
  agentConnectionDetails: DownlinkConnectionDetails;
};
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
export type EphemerisType =
  | "TLE"
  | "OEM"
  | "AZ_EL"
  | "SERVICE_MANAGED"
  | (string & {});
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
export type EphemerisSource =
  | "CUSTOMER_PROVIDED"
  | "SPACE_TRACK"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "DELETE /contact/{contactId}",
    input: { contactId: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelContact",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /config",
    input: { name: 0, configData: i_ConfigTypeData, tags: 0 },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /dataflowEndpointGroup",
    input: {
      endpointDetails: D.list({
        securityDetails: { subnetIds: 0, securityGroupIds: 0, roleArn: 0 },
        endpoint: { name: 0, address: i_SocketAddress, status: 0, mtu: 0 },
        awsGroundStationAgentEndpoint: {
          name: 0,
          egressAddress: i_ConnectionDetails,
          ingressAddress: i_RangedConnectionDetails,
          agentStatus: 0,
          auditResults: 0,
        },
        uplinkAwsGroundStationAgentEndpoint: {
          name: 0,
          dataflowDetails: i_UplinkDataflowDetails,
          agentStatus: 0,
          auditResults: 0,
        },
        downlinkAwsGroundStationAgentEndpoint: {
          name: 0,
          dataflowDetails: i_DownlinkDataflowDetails,
          agentStatus: 0,
          auditResults: 0,
        },
        healthStatus: 0,
        healthReasons: 0,
      }),
      tags: 0,
      contactPrePassDurationSeconds: 0,
      contactPostPassDurationSeconds: 0,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataflowEndpointGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /dataflowEndpointGroupV2",
    input: {
      endpoints: D.list({
        uplinkAwsGroundStationAgentEndpoint: {
          name: 0,
          dataflowDetails: i_UplinkDataflowDetails,
        },
        downlinkAwsGroundStationAgentEndpoint: {
          name: 0,
          dataflowDetails: i_DownlinkDataflowDetails,
        },
      }),
      contactPrePassDurationSeconds: 0,
      contactPostPassDurationSeconds: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataflowEndpointGroupV2",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /ephemeris",
    input: {
      satelliteId: 0,
      enabled: 0,
      priority: 0,
      expirationTime: 0,
      name: 0,
      kmsKeyArn: 0,
      ephemeris: {
        tle: {
          s3Object: i_S3Object,
          tleData: D.list({
            tleLine1: 0,
            tleLine2: 0,
            validTimeRange: { startTime: 0, endTime: 0 },
          }),
        },
        oem: { s3Object: i_S3Object, oemData: 0 },
        azEl: {
          groundStation: 0,
          data: {
            s3Object: i_S3Object,
            azElData: {
              angleUnit: 0,
              azElSegmentList: D.list({
                referenceEpoch: D.tsAs("date-time"),
                validTimeRange: {
                  startTime: D.tsAs("date-time"),
                  endTime: D.tsAs("date-time"),
                },
                azElList: D.list({ dt: 0, az: 0, el: 0 }),
              }),
            },
          },
        },
      },
      tags: 0,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEphemeris",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /missionprofile",
    input: {
      name: 0,
      contactPrePassDurationSeconds: 0,
      contactPostPassDurationSeconds: 0,
      minimumViableContactDurationSeconds: 0,
      dataflowEdges: 0,
      trackingConfigArn: 0,
      telemetrySinkConfigArn: 0,
      tags: 0,
      streamsKmsKey: i_KmsKey,
      streamsKmsRole: 0,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMissionProfile",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /config/{configType}/{configId}",
    input: { configId: 0, configType: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /dataflowEndpointGroup/{dataflowEndpointGroupId}",
    input: { dataflowEndpointGroupId: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataflowEndpointGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /ephemeris/{ephemerisId}",
    input: { ephemerisId: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEphemeris",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /missionprofile/{missionProfileId}",
    input: { missionProfileId: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMissionProfile",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /contact/{contactId}",
    input: { contactId: 0 },
    output: {
      startTime: D.ts,
      endTime: D.ts,
      prePassStartTime: D.ts,
      postPassEndTime: D.ts,
      visibilityStartTime: D.ts,
      visibilityEndTime: D.ts,
      version: o_ContactVersion,
    },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContact",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /contact/{contactId}/versions/{versionId}",
    input: { contactId: 0, versionId: 0 },
    output: {
      startTime: D.ts,
      endTime: D.ts,
      prePassStartTime: D.ts,
      postPassEndTime: D.ts,
      visibilityStartTime: D.ts,
      visibilityEndTime: D.ts,
      version: o_ContactVersion,
    },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContactVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /ephemeris/{ephemerisId}",
    input: { ephemerisId: 0 },
    output: { creationTime: D.ts },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEphemeris",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /agent/{agentId}/configuration",
    input: { agentId: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /agentResponseUrl/{agentId}/{taskId}",
    input: { agentId: 0, taskId: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentTaskResponseUrl",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /config/{configType}/{configId}",
    input: { configId: 0, configType: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /dataflowEndpointGroup/{dataflowEndpointGroupId}",
    input: { dataflowEndpointGroupId: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataflowEndpointGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /minute-usage",
    input: { month: 0, year: 0 },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMinuteUsage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /missionprofile/{missionProfileId}",
    input: { missionProfileId: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMissionProfile",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /satellite/{satelliteId}",
    input: { satelliteId: 0 },
    output: { currentEphemeris: o_EphemerisMetaData },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSatellite",
})) as any;

export type ListAntennasError =
  | DependencyException
  | InvalidParameterException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /groundstation/{groundStationId}/antenna",
    input: {
      groundStationId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /config",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /contacts",
    input: {
      maxResults: 0,
      nextToken: 0,
      statusList: 0,
      startTime: 0,
      endTime: 0,
      groundStation: 0,
      satelliteArn: 0,
      missionProfileArn: 0,
      ephemeris: { azEl: { id: 0 } },
    },
    output: {
      contactList: D.list({
        startTime: D.ts,
        endTime: D.ts,
        prePassStartTime: D.ts,
        postPassEndTime: D.ts,
        visibilityStartTime: D.ts,
        visibilityEndTime: D.ts,
        version: o_ContactVersion,
      }),
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /contact/{contactId}/versions",
    input: {
      contactId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { contactVersionsList: D.list(o_ContactVersion) },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /dataflowEndpointGroup",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /ephemerides",
    input: {
      satelliteId: 0,
      ephemerisType: 0,
      startTime: 0,
      endTime: 0,
      statusList: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { ephemerides: D.list({ creationTime: D.ts }) },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /groundstation/{groundStationId}/reservation",
    input: {
      groundStationId: 0,
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      reservationTypes: D.m({ query: "reservationTypes" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { reservationList: D.list({ startTime: D.ts, endTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /groundstation",
    input: {
      satelliteId: D.m({ query: "satelliteId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /missionprofile",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /satellite",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { satellites: D.list({ currentEphemeris: o_EphemerisMetaData }) },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /agent",
    input: {
      discoveryData: {
        publicIpAddresses: 0,
        privateIpAddresses: 0,
        capabilityArns: 0,
      },
      agentDetails: {
        agentVersion: 0,
        instanceId: 0,
        instanceType: 0,
        reservedCpuCores: 0,
        agentCpuCores: 0,
        componentVersions: D.list({ componentType: 0, versions: 0 }),
      },
      tags: 0,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterAgent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /contact",
    input: {
      missionProfileArn: 0,
      satelliteArn: 0,
      startTime: 0,
      endTime: 0,
      groundStation: 0,
      tags: 0,
      trackingOverrides: i_TrackingOverrides,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReserveContact",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /agent/{agentId}",
    input: {
      agentId: 0,
      taskId: 0,
      aggregateStatus: { status: 0, signatureMap: 0 },
      componentStatuses: D.list({
        componentType: 0,
        capabilityArn: 0,
        status: 0,
        bytesSent: 0,
        bytesReceived: 0,
        packetsDropped: 0,
        dataflowId: 0,
      }),
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /config/{configType}/{configId}",
    input: {
      configId: 0,
      name: 0,
      configType: 0,
      configData: i_ConfigTypeData,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /contact/{contactId}/versions",
    input: {
      contactId: 0,
      clientToken: D.m({ idempotency: true }),
      trackingOverrides: i_TrackingOverrides,
      satelliteArn: 0,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContact",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /ephemeris/{ephemerisId}",
    input: { ephemerisId: 0, enabled: 0, name: 0, priority: 0 },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEphemeris",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /missionprofile/{missionProfileId}",
    input: {
      missionProfileId: 0,
      name: 0,
      contactPrePassDurationSeconds: 0,
      contactPostPassDurationSeconds: 0,
      minimumViableContactDurationSeconds: 0,
      dataflowEdges: 0,
      trackingConfigArn: 0,
      telemetrySinkConfigArn: 0,
      streamsKmsKey: i_KmsKey,
      streamsKmsRole: 0,
    },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMissionProfile",
})) as any;

const i_ConfigTypeData: D.LazyStruct = () => ({
  antennaDownlinkConfig: { spectrumConfig: i_SpectrumConfig },
  trackingConfig: { autotrack: 0 },
  dataflowEndpointConfig: {
    dataflowEndpointName: 0,
    dataflowEndpointRegion: 0,
  },
  antennaDownlinkDemodDecodeConfig: {
    spectrumConfig: i_SpectrumConfig,
    demodulationConfig: { unvalidatedJSON: 0 },
    decodeConfig: { unvalidatedJSON: 0 },
  },
  antennaUplinkConfig: {
    transmitDisabled: 0,
    spectrumConfig: { centerFrequency: i_Frequency, polarization: 0 },
    targetEirp: { value: 0, units: 0 },
  },
  uplinkEchoConfig: { enabled: 0, antennaUplinkConfigArn: 0 },
  s3RecordingConfig: { bucketArn: 0, roleArn: 0, prefix: 0 },
  telemetrySinkConfig: {
    telemetrySinkType: 0,
    telemetrySinkData: {
      kinesisDataStreamData: { kinesisRoleArn: 0, kinesisDataStreamArn: 0 },
    },
  },
});
const i_ConnectionDetails: D.LazyStruct = () => ({
  socketAddress: i_SocketAddress,
  mtu: 0,
});
const i_DownlinkDataflowDetails: D.LazyStruct = () => ({
  agentConnectionDetails: {
    agentIpAndPortAddress: i_RangedConnectionDetails,
    egressAddressAndPort: i_ConnectionDetails,
  },
});
const i_KmsKey: D.LazyStruct = () => ({
  kmsKeyArn: 0,
  kmsAliasArn: 0,
  kmsAliasName: 0,
});
const i_RangedConnectionDetails: D.LazyStruct = () => ({
  socketAddress: { name: 0, portRange: { minimum: 0, maximum: 0 } },
  mtu: 0,
});
const i_S3Object: D.LazyStruct = () => ({ bucket: 0, key: 0, version: 0 });
const i_SocketAddress: D.LazyStruct = () => ({ name: 0, port: 0 });
const i_TrackingOverrides: D.LazyStruct = () => ({
  programTrackSettings: {
    azEl: { ephemerisId: 0 },
    oem: { ephemerisId: 0 },
    tle: { ephemerisId: 0 },
  },
});
const i_UplinkDataflowDetails: D.LazyStruct = () => ({
  agentConnectionDetails: {
    ingressAddressAndPort: i_ConnectionDetails,
    agentIpAndPortAddress: i_RangedConnectionDetails,
  },
});
const o_ContactVersion: D.LazyStruct = () => ({
  created: D.ts,
  activated: D.ts,
  superseded: D.ts,
  lastUpdated: D.ts,
});
const o_EphemerisMetaData: D.LazyStruct = () => ({ epoch: D.ts });
const i_Frequency: D.LazyStruct = () => ({ value: 0, units: 0 });
const i_SpectrumConfig: D.LazyStruct = () => ({
  centerFrequency: i_Frequency,
  bandwidth: { value: 0, units: 0 },
  polarization: 0,
});
