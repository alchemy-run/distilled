import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "GroundStation",
  serviceShapeName: "GroundStation",
});
const auth = T.AwsAuthSigv4({ name: "groundstation" });
const ver = T.ServiceVersion("2019-05-23");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type Uuid = string;
export type Month = number;
export type Year = number;
export type AnyArn = string;
export type UnboundedString = string;
export type IpV4Address = string;
export type CapabilityArn = string;
export type VersionString = string;
export type InstanceId = string;
export type InstanceType = string;
export type ComponentTypeString = string;
export type SafeName = string;
export type JsonString = string;
export type ConfigArn = string;
export type BucketArn = string;
export type RoleArn = string;
export type S3KeyPrefix = string;
export type KinesisDataStreamArn = string;
export type PaginationMaxResults = number;
export type PaginationToken = string;
export type MissionProfileArn = string;
export type SatelliteArn = string;
export type GroundStationName = string;
export type DataflowEndpointGroupDurationInSeconds = number;
export type DataflowEndpointGroupArn = string;
export type CustomerEphemerisPriority = number;
export type KeyArn = string;
export type S3BucketName = string;
export type S3ObjectKey = string;
export type S3VersionId = string;
export type TleLineOne = string;
export type TleLineTwo = string;
export type EphemerisPriority = number;
export type ErrorString = string;
export type AWSRegion = string;
export type DurationInSeconds = number;
export type PositiveDurationInSeconds = number;
export type KeyAliasArn = string;
export type KeyAliasName = string;
export type NoradSatelliteID = number;

//# Schemas
export interface GetAgentTaskResponseUrlRequest {
  agentId: string;
  taskId: string;
}
export const GetAgentTaskResponseUrlRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetAgentTaskResponseUrlRequest",
}) as any as S.Schema<GetAgentTaskResponseUrlRequest>;
export interface GetAgentTaskResponseUrlResponse {
  agentId: string;
  taskId: string;
  presignedLogUrl: string;
}
export const GetAgentTaskResponseUrlResponse = S.suspend(() =>
  S.Struct({ agentId: S.String, taskId: S.String, presignedLogUrl: S.String }),
).annotate({
  identifier: "GetAgentTaskResponseUrlResponse",
}) as any as S.Schema<GetAgentTaskResponseUrlResponse>;
export interface GetMinuteUsageRequest {
  month: number;
  year: number;
}
export const GetMinuteUsageRequest = S.suspend(() =>
  S.Struct({ month: S.Number, year: S.Number }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/minute-usage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMinuteUsageRequest",
}) as any as S.Schema<GetMinuteUsageRequest>;
export interface GetMinuteUsageResponse {
  isReservedMinutesCustomer?: boolean;
  totalReservedMinuteAllocation?: number;
  upcomingMinutesScheduled?: number;
  totalScheduledMinutes?: number;
  estimatedMinutesRemaining?: number;
}
export const GetMinuteUsageResponse = S.suspend(() =>
  S.Struct({
    isReservedMinutesCustomer: S.optional(S.Boolean),
    totalReservedMinuteAllocation: S.optional(S.Number),
    upcomingMinutesScheduled: S.optional(S.Number),
    totalScheduledMinutes: S.optional(S.Number),
    estimatedMinutesRemaining: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetMinuteUsageResponse",
}) as any as S.Schema<GetMinuteUsageResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type IpAddressList = string[];
export const IpAddressList = S.Array(S.String);
export type CapabilityArnList = string[];
export const CapabilityArnList = S.Array(S.String);
export interface DiscoveryData {
  publicIpAddresses: string[];
  privateIpAddresses: string[];
  capabilityArns: string[];
}
export const DiscoveryData = S.suspend(() =>
  S.Struct({
    publicIpAddresses: IpAddressList,
    privateIpAddresses: IpAddressList,
    capabilityArns: CapabilityArnList,
  }),
).annotate({ identifier: "DiscoveryData" }) as any as S.Schema<DiscoveryData>;
export type AgentCpuCoresList = number[];
export const AgentCpuCoresList = S.Array(S.Number);
export type VersionStringList = string[];
export const VersionStringList = S.Array(S.String);
export interface ComponentVersion {
  componentType: string;
  versions: string[];
}
export const ComponentVersion = S.suspend(() =>
  S.Struct({ componentType: S.String, versions: VersionStringList }),
).annotate({
  identifier: "ComponentVersion",
}) as any as S.Schema<ComponentVersion>;
export type ComponentVersionList = ComponentVersion[];
export const ComponentVersionList = S.Array(ComponentVersion);
export interface AgentDetails {
  agentVersion: string;
  instanceId: string;
  instanceType: string;
  reservedCpuCores?: number[];
  agentCpuCores?: number[];
  componentVersions: ComponentVersion[];
}
export const AgentDetails = S.suspend(() =>
  S.Struct({
    agentVersion: S.String,
    instanceId: S.String,
    instanceType: S.String,
    reservedCpuCores: S.optional(AgentCpuCoresList),
    agentCpuCores: S.optional(AgentCpuCoresList),
    componentVersions: ComponentVersionList,
  }),
).annotate({ identifier: "AgentDetails" }) as any as S.Schema<AgentDetails>;
export interface RegisterAgentRequest {
  discoveryData: DiscoveryData;
  agentDetails: AgentDetails;
  tags?: { [key: string]: string | undefined };
}
export const RegisterAgentRequest = S.suspend(() =>
  S.Struct({
    discoveryData: DiscoveryData,
    agentDetails: AgentDetails,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/agent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterAgentRequest",
}) as any as S.Schema<RegisterAgentRequest>;
export interface RegisterAgentResponse {
  agentId?: string;
}
export const RegisterAgentResponse = S.suspend(() =>
  S.Struct({ agentId: S.optional(S.String) }),
).annotate({
  identifier: "RegisterAgentResponse",
}) as any as S.Schema<RegisterAgentResponse>;
export interface GetAgentConfigurationRequest {
  agentId: string;
}
export const GetAgentConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetAgentConfigurationRequest",
}) as any as S.Schema<GetAgentConfigurationRequest>;
export interface GetAgentConfigurationResponse {
  agentId?: string;
  taskingDocument?: string;
}
export const GetAgentConfigurationResponse = S.suspend(() =>
  S.Struct({
    agentId: S.optional(S.String),
    taskingDocument: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAgentConfigurationResponse",
}) as any as S.Schema<GetAgentConfigurationResponse>;
export type AgentStatus =
  | "SUCCESS"
  | "FAILED"
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export const AgentStatus = S.String;
export type SignatureMap = { [key: string]: boolean | undefined };
export const SignatureMap = S.Record(S.String, S.Boolean.pipe(S.optional));
export interface AggregateStatus {
  status: AgentStatus;
  signatureMap?: { [key: string]: boolean | undefined };
}
export const AggregateStatus = S.suspend(() =>
  S.Struct({ status: AgentStatus, signatureMap: S.optional(SignatureMap) }),
).annotate({
  identifier: "AggregateStatus",
}) as any as S.Schema<AggregateStatus>;
export interface ComponentStatusData {
  componentType: string;
  capabilityArn: string;
  status: AgentStatus;
  bytesSent?: number;
  bytesReceived?: number;
  packetsDropped?: number;
  dataflowId: string;
}
export const ComponentStatusData = S.suspend(() =>
  S.Struct({
    componentType: S.String,
    capabilityArn: S.String,
    status: AgentStatus,
    bytesSent: S.optional(S.Number),
    bytesReceived: S.optional(S.Number),
    packetsDropped: S.optional(S.Number),
    dataflowId: S.String,
  }),
).annotate({
  identifier: "ComponentStatusData",
}) as any as S.Schema<ComponentStatusData>;
export type ComponentStatusList = ComponentStatusData[];
export const ComponentStatusList = S.Array(ComponentStatusData);
export interface UpdateAgentStatusRequest {
  agentId: string;
  taskId: string;
  aggregateStatus: AggregateStatus;
  componentStatuses: ComponentStatusData[];
}
export const UpdateAgentStatusRequest = S.suspend(() =>
  S.Struct({
    agentId: S.String.pipe(T.HttpLabel("agentId")),
    taskId: S.String,
    aggregateStatus: AggregateStatus,
    componentStatuses: ComponentStatusList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/agent/{agentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAgentStatusRequest",
}) as any as S.Schema<UpdateAgentStatusRequest>;
export interface UpdateAgentStatusResponse {
  agentId: string;
}
export const UpdateAgentStatusResponse = S.suspend(() =>
  S.Struct({ agentId: S.String }),
).annotate({
  identifier: "UpdateAgentStatusResponse",
}) as any as S.Schema<UpdateAgentStatusResponse>;
export type FrequencyUnits = "GHz" | "MHz" | "kHz" | (string & {});
export const FrequencyUnits = S.String;
export interface Frequency {
  value: number;
  units: FrequencyUnits;
}
export const Frequency = S.suspend(() =>
  S.Struct({ value: S.Number, units: FrequencyUnits }),
).annotate({ identifier: "Frequency" }) as any as S.Schema<Frequency>;
export type BandwidthUnits = "GHz" | "MHz" | "kHz" | (string & {});
export const BandwidthUnits = S.String;
export interface FrequencyBandwidth {
  value: number;
  units: BandwidthUnits;
}
export const FrequencyBandwidth = S.suspend(() =>
  S.Struct({ value: S.Number, units: BandwidthUnits }),
).annotate({
  identifier: "FrequencyBandwidth",
}) as any as S.Schema<FrequencyBandwidth>;
export type Polarization = "RIGHT_HAND" | "LEFT_HAND" | "NONE" | (string & {});
export const Polarization = S.String;
export interface SpectrumConfig {
  centerFrequency: Frequency;
  bandwidth: FrequencyBandwidth;
  polarization?: Polarization;
}
export const SpectrumConfig = S.suspend(() =>
  S.Struct({
    centerFrequency: Frequency,
    bandwidth: FrequencyBandwidth,
    polarization: S.optional(Polarization),
  }),
).annotate({ identifier: "SpectrumConfig" }) as any as S.Schema<SpectrumConfig>;
export interface AntennaDownlinkConfig {
  spectrumConfig: SpectrumConfig;
}
export const AntennaDownlinkConfig = S.suspend(() =>
  S.Struct({ spectrumConfig: SpectrumConfig }),
).annotate({
  identifier: "AntennaDownlinkConfig",
}) as any as S.Schema<AntennaDownlinkConfig>;
export type Criticality = "REQUIRED" | "PREFERRED" | "REMOVED" | (string & {});
export const Criticality = S.String;
export interface TrackingConfig {
  autotrack: Criticality;
}
export const TrackingConfig = S.suspend(() =>
  S.Struct({ autotrack: Criticality }),
).annotate({ identifier: "TrackingConfig" }) as any as S.Schema<TrackingConfig>;
export interface DataflowEndpointConfig {
  dataflowEndpointName: string;
  dataflowEndpointRegion?: string;
}
export const DataflowEndpointConfig = S.suspend(() =>
  S.Struct({
    dataflowEndpointName: S.String,
    dataflowEndpointRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "DataflowEndpointConfig",
}) as any as S.Schema<DataflowEndpointConfig>;
export interface DemodulationConfig {
  unvalidatedJSON: string;
}
export const DemodulationConfig = S.suspend(() =>
  S.Struct({ unvalidatedJSON: S.String }),
).annotate({
  identifier: "DemodulationConfig",
}) as any as S.Schema<DemodulationConfig>;
export interface DecodeConfig {
  unvalidatedJSON: string;
}
export const DecodeConfig = S.suspend(() =>
  S.Struct({ unvalidatedJSON: S.String }),
).annotate({ identifier: "DecodeConfig" }) as any as S.Schema<DecodeConfig>;
export interface AntennaDownlinkDemodDecodeConfig {
  spectrumConfig: SpectrumConfig;
  demodulationConfig: DemodulationConfig;
  decodeConfig: DecodeConfig;
}
export const AntennaDownlinkDemodDecodeConfig = S.suspend(() =>
  S.Struct({
    spectrumConfig: SpectrumConfig,
    demodulationConfig: DemodulationConfig,
    decodeConfig: DecodeConfig,
  }),
).annotate({
  identifier: "AntennaDownlinkDemodDecodeConfig",
}) as any as S.Schema<AntennaDownlinkDemodDecodeConfig>;
export interface UplinkSpectrumConfig {
  centerFrequency: Frequency;
  polarization?: Polarization;
}
export const UplinkSpectrumConfig = S.suspend(() =>
  S.Struct({
    centerFrequency: Frequency,
    polarization: S.optional(Polarization),
  }),
).annotate({
  identifier: "UplinkSpectrumConfig",
}) as any as S.Schema<UplinkSpectrumConfig>;
export type EirpUnits = "dBW" | (string & {});
export const EirpUnits = S.String;
export interface Eirp {
  value: number;
  units: EirpUnits;
}
export const Eirp = S.suspend(() =>
  S.Struct({ value: S.Number, units: EirpUnits }),
).annotate({ identifier: "Eirp" }) as any as S.Schema<Eirp>;
export interface AntennaUplinkConfig {
  transmitDisabled?: boolean;
  spectrumConfig: UplinkSpectrumConfig;
  targetEirp: Eirp;
}
export const AntennaUplinkConfig = S.suspend(() =>
  S.Struct({
    transmitDisabled: S.optional(S.Boolean),
    spectrumConfig: UplinkSpectrumConfig,
    targetEirp: Eirp,
  }),
).annotate({
  identifier: "AntennaUplinkConfig",
}) as any as S.Schema<AntennaUplinkConfig>;
export interface UplinkEchoConfig {
  enabled: boolean;
  antennaUplinkConfigArn: string;
}
export const UplinkEchoConfig = S.suspend(() =>
  S.Struct({ enabled: S.Boolean, antennaUplinkConfigArn: S.String }),
).annotate({
  identifier: "UplinkEchoConfig",
}) as any as S.Schema<UplinkEchoConfig>;
export interface S3RecordingConfig {
  bucketArn: string;
  roleArn: string;
  prefix?: string;
}
export const S3RecordingConfig = S.suspend(() =>
  S.Struct({
    bucketArn: S.String,
    roleArn: S.String,
    prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "S3RecordingConfig",
}) as any as S.Schema<S3RecordingConfig>;
export type TelemetrySinkType = "KINESIS_DATA_STREAM" | (string & {});
export const TelemetrySinkType = S.String;
export interface KinesisDataStreamData {
  kinesisRoleArn: string;
  kinesisDataStreamArn: string;
}
export const KinesisDataStreamData = S.suspend(() =>
  S.Struct({ kinesisRoleArn: S.String, kinesisDataStreamArn: S.String }),
).annotate({
  identifier: "KinesisDataStreamData",
}) as any as S.Schema<KinesisDataStreamData>;
export type TelemetrySinkData = {
  kinesisDataStreamData: KinesisDataStreamData;
};
export const TelemetrySinkData = S.Union([
  S.Struct({ kinesisDataStreamData: KinesisDataStreamData }),
]);
export interface TelemetrySinkConfig {
  telemetrySinkType: TelemetrySinkType;
  telemetrySinkData: TelemetrySinkData;
}
export const TelemetrySinkConfig = S.suspend(() =>
  S.Struct({
    telemetrySinkType: TelemetrySinkType,
    telemetrySinkData: TelemetrySinkData,
  }),
).annotate({
  identifier: "TelemetrySinkConfig",
}) as any as S.Schema<TelemetrySinkConfig>;
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
export const ConfigTypeData = S.Union([
  S.Struct({ antennaDownlinkConfig: AntennaDownlinkConfig }),
  S.Struct({ trackingConfig: TrackingConfig }),
  S.Struct({ dataflowEndpointConfig: DataflowEndpointConfig }),
  S.Struct({
    antennaDownlinkDemodDecodeConfig: AntennaDownlinkDemodDecodeConfig,
  }),
  S.Struct({ antennaUplinkConfig: AntennaUplinkConfig }),
  S.Struct({ uplinkEchoConfig: UplinkEchoConfig }),
  S.Struct({ s3RecordingConfig: S3RecordingConfig }),
  S.Struct({ telemetrySinkConfig: TelemetrySinkConfig }),
]);
export interface CreateConfigRequest {
  name: string;
  configData: ConfigTypeData;
  tags?: { [key: string]: string | undefined };
}
export const CreateConfigRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    configData: ConfigTypeData,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/config" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigRequest",
}) as any as S.Schema<CreateConfigRequest>;
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
export const ConfigCapabilityType = S.String;
export interface ConfigIdResponse {
  configId?: string;
  configType?: ConfigCapabilityType;
  configArn?: string;
}
export const ConfigIdResponse = S.suspend(() =>
  S.Struct({
    configId: S.optional(S.String),
    configType: S.optional(ConfigCapabilityType),
    configArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigIdResponse",
}) as any as S.Schema<ConfigIdResponse>;
export interface GetConfigRequest {
  configId: string;
  configType: ConfigCapabilityType;
}
export const GetConfigRequest = S.suspend(() =>
  S.Struct({
    configId: S.String.pipe(T.HttpLabel("configId")),
    configType: ConfigCapabilityType.pipe(T.HttpLabel("configType")),
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
).annotate({
  identifier: "GetConfigRequest",
}) as any as S.Schema<GetConfigRequest>;
export interface GetConfigResponse {
  configId: string;
  configArn: string;
  name: string;
  configType?: ConfigCapabilityType;
  configData: ConfigTypeData;
  tags?: { [key: string]: string | undefined };
}
export const GetConfigResponse = S.suspend(() =>
  S.Struct({
    configId: S.String,
    configArn: S.String,
    name: S.String,
    configType: S.optional(ConfigCapabilityType),
    configData: ConfigTypeData,
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetConfigResponse",
}) as any as S.Schema<GetConfigResponse>;
export interface UpdateConfigRequest {
  configId: string;
  name: string;
  configType: ConfigCapabilityType;
  configData: ConfigTypeData;
}
export const UpdateConfigRequest = S.suspend(() =>
  S.Struct({
    configId: S.String.pipe(T.HttpLabel("configId")),
    name: S.String,
    configType: ConfigCapabilityType.pipe(T.HttpLabel("configType")),
    configData: ConfigTypeData,
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
).annotate({
  identifier: "UpdateConfigRequest",
}) as any as S.Schema<UpdateConfigRequest>;
export interface DeleteConfigRequest {
  configId: string;
  configType: ConfigCapabilityType;
}
export const DeleteConfigRequest = S.suspend(() =>
  S.Struct({
    configId: S.String.pipe(T.HttpLabel("configId")),
    configType: ConfigCapabilityType.pipe(T.HttpLabel("configType")),
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
).annotate({
  identifier: "DeleteConfigRequest",
}) as any as S.Schema<DeleteConfigRequest>;
export interface ListConfigsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListConfigsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/config" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigsRequest",
}) as any as S.Schema<ListConfigsRequest>;
export interface ConfigListItem {
  configId?: string;
  configType?: ConfigCapabilityType;
  configArn?: string;
  name?: string;
}
export const ConfigListItem = S.suspend(() =>
  S.Struct({
    configId: S.optional(S.String),
    configType: S.optional(ConfigCapabilityType),
    configArn: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({ identifier: "ConfigListItem" }) as any as S.Schema<ConfigListItem>;
export type ConfigList = ConfigListItem[];
export const ConfigList = S.Array(ConfigListItem);
export interface ListConfigsResponse {
  nextToken?: string;
  configList?: ConfigListItem[];
}
export const ListConfigsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    configList: S.optional(ConfigList),
  }),
).annotate({
  identifier: "ListConfigsResponse",
}) as any as S.Schema<ListConfigsResponse>;
export interface AzElProgramTrackSettings {
  ephemerisId: string;
}
export const AzElProgramTrackSettings = S.suspend(() =>
  S.Struct({ ephemerisId: S.String }),
).annotate({
  identifier: "AzElProgramTrackSettings",
}) as any as S.Schema<AzElProgramTrackSettings>;
export type ProgramTrackSettings = { azEl: AzElProgramTrackSettings };
export const ProgramTrackSettings = S.Union([
  S.Struct({ azEl: AzElProgramTrackSettings }),
]);
export interface TrackingOverrides {
  programTrackSettings: ProgramTrackSettings;
}
export const TrackingOverrides = S.suspend(() =>
  S.Struct({ programTrackSettings: ProgramTrackSettings }),
).annotate({
  identifier: "TrackingOverrides",
}) as any as S.Schema<TrackingOverrides>;
export interface ReserveContactRequest {
  missionProfileArn: string;
  satelliteArn?: string;
  startTime: Date;
  endTime: Date;
  groundStation: string;
  tags?: { [key: string]: string | undefined };
  trackingOverrides?: TrackingOverrides;
}
export const ReserveContactRequest = S.suspend(() =>
  S.Struct({
    missionProfileArn: S.String,
    satelliteArn: S.optional(S.String),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    groundStation: S.String,
    tags: S.optional(TagsMap),
    trackingOverrides: S.optional(TrackingOverrides),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/contact" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReserveContactRequest",
}) as any as S.Schema<ReserveContactRequest>;
export interface ContactIdResponse {
  contactId?: string;
}
export const ContactIdResponse = S.suspend(() =>
  S.Struct({ contactId: S.optional(S.String) }),
).annotate({
  identifier: "ContactIdResponse",
}) as any as S.Schema<ContactIdResponse>;
export interface DescribeContactRequest {
  contactId: string;
}
export const DescribeContactRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeContactRequest",
}) as any as S.Schema<DescribeContactRequest>;
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
export const ContactStatus = S.String;
export type AngleUnits = "DEGREE_ANGLE" | "RADIAN" | (string & {});
export const AngleUnits = S.String;
export interface Elevation {
  value: number;
  unit: AngleUnits;
}
export const Elevation = S.suspend(() =>
  S.Struct({ value: S.Number, unit: AngleUnits }),
).annotate({ identifier: "Elevation" }) as any as S.Schema<Elevation>;
export type SubnetList = string[];
export const SubnetList = S.Array(S.String);
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = S.Array(S.String);
export interface SecurityDetails {
  subnetIds: string[];
  securityGroupIds: string[];
  roleArn: string;
}
export const SecurityDetails = S.suspend(() =>
  S.Struct({
    subnetIds: SubnetList,
    securityGroupIds: SecurityGroupIdList,
    roleArn: S.String,
  }),
).annotate({
  identifier: "SecurityDetails",
}) as any as S.Schema<SecurityDetails>;
export interface SocketAddress {
  name: string;
  port: number;
}
export const SocketAddress = S.suspend(() =>
  S.Struct({ name: S.String, port: S.Number }),
).annotate({ identifier: "SocketAddress" }) as any as S.Schema<SocketAddress>;
export type EndpointStatus =
  | "created"
  | "creating"
  | "deleted"
  | "deleting"
  | "failed"
  | (string & {});
export const EndpointStatus = S.String;
export interface DataflowEndpoint {
  name?: string;
  address?: SocketAddress;
  status?: EndpointStatus;
  mtu?: number;
}
export const DataflowEndpoint = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    address: S.optional(SocketAddress),
    status: S.optional(EndpointStatus),
    mtu: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataflowEndpoint",
}) as any as S.Schema<DataflowEndpoint>;
export interface ConnectionDetails {
  socketAddress: SocketAddress;
  mtu?: number;
}
export const ConnectionDetails = S.suspend(() =>
  S.Struct({ socketAddress: SocketAddress, mtu: S.optional(S.Number) }),
).annotate({
  identifier: "ConnectionDetails",
}) as any as S.Schema<ConnectionDetails>;
export interface IntegerRange {
  minimum: number;
  maximum: number;
}
export const IntegerRange = S.suspend(() =>
  S.Struct({ minimum: S.Number, maximum: S.Number }),
).annotate({ identifier: "IntegerRange" }) as any as S.Schema<IntegerRange>;
export interface RangedSocketAddress {
  name: string;
  portRange: IntegerRange;
}
export const RangedSocketAddress = S.suspend(() =>
  S.Struct({ name: S.String, portRange: IntegerRange }),
).annotate({
  identifier: "RangedSocketAddress",
}) as any as S.Schema<RangedSocketAddress>;
export interface RangedConnectionDetails {
  socketAddress: RangedSocketAddress;
  mtu?: number;
}
export const RangedConnectionDetails = S.suspend(() =>
  S.Struct({ socketAddress: RangedSocketAddress, mtu: S.optional(S.Number) }),
).annotate({
  identifier: "RangedConnectionDetails",
}) as any as S.Schema<RangedConnectionDetails>;
export type AuditResults = "HEALTHY" | "UNHEALTHY" | (string & {});
export const AuditResults = S.String;
export interface AwsGroundStationAgentEndpoint {
  name: string;
  egressAddress: ConnectionDetails;
  ingressAddress: RangedConnectionDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export const AwsGroundStationAgentEndpoint = S.suspend(() =>
  S.Struct({
    name: S.String,
    egressAddress: ConnectionDetails,
    ingressAddress: RangedConnectionDetails,
    agentStatus: S.optional(AgentStatus),
    auditResults: S.optional(AuditResults),
  }),
).annotate({
  identifier: "AwsGroundStationAgentEndpoint",
}) as any as S.Schema<AwsGroundStationAgentEndpoint>;
export interface UplinkConnectionDetails {
  ingressAddressAndPort: ConnectionDetails;
  agentIpAndPortAddress: RangedConnectionDetails;
}
export const UplinkConnectionDetails = S.suspend(() =>
  S.Struct({
    ingressAddressAndPort: ConnectionDetails,
    agentIpAndPortAddress: RangedConnectionDetails,
  }),
).annotate({
  identifier: "UplinkConnectionDetails",
}) as any as S.Schema<UplinkConnectionDetails>;
export type UplinkDataflowDetails = {
  agentConnectionDetails: UplinkConnectionDetails;
};
export const UplinkDataflowDetails = S.Union([
  S.Struct({ agentConnectionDetails: UplinkConnectionDetails }),
]);
export interface UplinkAwsGroundStationAgentEndpointDetails {
  name: string;
  dataflowDetails: UplinkDataflowDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export const UplinkAwsGroundStationAgentEndpointDetails = S.suspend(() =>
  S.Struct({
    name: S.String,
    dataflowDetails: UplinkDataflowDetails,
    agentStatus: S.optional(AgentStatus),
    auditResults: S.optional(AuditResults),
  }),
).annotate({
  identifier: "UplinkAwsGroundStationAgentEndpointDetails",
}) as any as S.Schema<UplinkAwsGroundStationAgentEndpointDetails>;
export interface DownlinkConnectionDetails {
  agentIpAndPortAddress: RangedConnectionDetails;
  egressAddressAndPort: ConnectionDetails;
}
export const DownlinkConnectionDetails = S.suspend(() =>
  S.Struct({
    agentIpAndPortAddress: RangedConnectionDetails,
    egressAddressAndPort: ConnectionDetails,
  }),
).annotate({
  identifier: "DownlinkConnectionDetails",
}) as any as S.Schema<DownlinkConnectionDetails>;
export type DownlinkDataflowDetails = {
  agentConnectionDetails: DownlinkConnectionDetails;
};
export const DownlinkDataflowDetails = S.Union([
  S.Struct({ agentConnectionDetails: DownlinkConnectionDetails }),
]);
export interface DownlinkAwsGroundStationAgentEndpointDetails {
  name: string;
  dataflowDetails: DownlinkDataflowDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export const DownlinkAwsGroundStationAgentEndpointDetails = S.suspend(() =>
  S.Struct({
    name: S.String,
    dataflowDetails: DownlinkDataflowDetails,
    agentStatus: S.optional(AgentStatus),
    auditResults: S.optional(AuditResults),
  }),
).annotate({
  identifier: "DownlinkAwsGroundStationAgentEndpointDetails",
}) as any as S.Schema<DownlinkAwsGroundStationAgentEndpointDetails>;
export type CapabilityHealth = "HEALTHY" | "UNHEALTHY" | (string & {});
export const CapabilityHealth = S.String;
export type CapabilityHealthReason =
  | "NO_REGISTERED_AGENT"
  | "INVALID_IP_OWNERSHIP"
  | "NOT_AUTHORIZED_TO_CREATE_SLR"
  | "UNVERIFIED_IP_OWNERSHIP"
  | "INITIALIZING_DATAPLANE"
  | "DATAPLANE_FAILURE"
  | "HEALTHY"
  | (string & {});
export const CapabilityHealthReason = S.String;
export type CapabilityHealthReasonList = CapabilityHealthReason[];
export const CapabilityHealthReasonList = S.Array(CapabilityHealthReason);
export interface EndpointDetails {
  securityDetails?: SecurityDetails;
  endpoint?: DataflowEndpoint;
  awsGroundStationAgentEndpoint?: AwsGroundStationAgentEndpoint;
  uplinkAwsGroundStationAgentEndpoint?: UplinkAwsGroundStationAgentEndpointDetails;
  downlinkAwsGroundStationAgentEndpoint?: DownlinkAwsGroundStationAgentEndpointDetails;
  healthStatus?: CapabilityHealth;
  healthReasons?: CapabilityHealthReason[];
}
export const EndpointDetails = S.suspend(() =>
  S.Struct({
    securityDetails: S.optional(SecurityDetails),
    endpoint: S.optional(DataflowEndpoint),
    awsGroundStationAgentEndpoint: S.optional(AwsGroundStationAgentEndpoint),
    uplinkAwsGroundStationAgentEndpoint: S.optional(
      UplinkAwsGroundStationAgentEndpointDetails,
    ),
    downlinkAwsGroundStationAgentEndpoint: S.optional(
      DownlinkAwsGroundStationAgentEndpointDetails,
    ),
    healthStatus: S.optional(CapabilityHealth),
    healthReasons: S.optional(CapabilityHealthReasonList),
  }),
).annotate({
  identifier: "EndpointDetails",
}) as any as S.Schema<EndpointDetails>;
export interface AntennaDemodDecodeDetails {
  outputNode?: string;
}
export const AntennaDemodDecodeDetails = S.suspend(() =>
  S.Struct({ outputNode: S.optional(S.String) }),
).annotate({
  identifier: "AntennaDemodDecodeDetails",
}) as any as S.Schema<AntennaDemodDecodeDetails>;
export interface S3RecordingDetails {
  bucketArn?: string;
  keyTemplate?: string;
}
export const S3RecordingDetails = S.suspend(() =>
  S.Struct({
    bucketArn: S.optional(S.String),
    keyTemplate: S.optional(S.String),
  }),
).annotate({
  identifier: "S3RecordingDetails",
}) as any as S.Schema<S3RecordingDetails>;
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
export const ConfigDetails = S.Union([
  S.Struct({ endpointDetails: EndpointDetails }),
  S.Struct({ antennaDemodDecodeDetails: AntennaDemodDecodeDetails }),
  S.Struct({ s3RecordingDetails: S3RecordingDetails }),
]);
export interface Source {
  configType?: ConfigCapabilityType;
  configId?: string;
  configDetails?: ConfigDetails;
  dataflowSourceRegion?: string;
}
export const Source = S.suspend(() =>
  S.Struct({
    configType: S.optional(ConfigCapabilityType),
    configId: S.optional(S.String),
    configDetails: S.optional(ConfigDetails),
    dataflowSourceRegion: S.optional(S.String),
  }),
).annotate({ identifier: "Source" }) as any as S.Schema<Source>;
export interface Destination {
  configType?: ConfigCapabilityType;
  configId?: string;
  configDetails?: ConfigDetails;
  dataflowDestinationRegion?: string;
}
export const Destination = S.suspend(() =>
  S.Struct({
    configType: S.optional(ConfigCapabilityType),
    configId: S.optional(S.String),
    configDetails: S.optional(ConfigDetails),
    dataflowDestinationRegion: S.optional(S.String),
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export interface DataflowDetail {
  source?: Source;
  destination?: Destination;
  errorMessage?: string;
}
export const DataflowDetail = S.suspend(() =>
  S.Struct({
    source: S.optional(Source),
    destination: S.optional(Destination),
    errorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "DataflowDetail" }) as any as S.Schema<DataflowDetail>;
export type DataflowList = DataflowDetail[];
export const DataflowList = S.Array(DataflowDetail);
export type EphemerisType =
  | "TLE"
  | "OEM"
  | "AZ_EL"
  | "SERVICE_MANAGED"
  | (string & {});
export const EphemerisType = S.String;
export interface EphemerisResponseData {
  ephemerisId?: string;
  ephemerisType: EphemerisType;
}
export const EphemerisResponseData = S.suspend(() =>
  S.Struct({ ephemerisId: S.optional(S.String), ephemerisType: EphemerisType }),
).annotate({
  identifier: "EphemerisResponseData",
}) as any as S.Schema<EphemerisResponseData>;
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
}
export const DescribeContactResponse = S.suspend(() =>
  S.Struct({
    contactId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    prePassStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    postPassEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    groundStation: S.optional(S.String),
    contactStatus: S.optional(ContactStatus),
    errorMessage: S.optional(S.String),
    maximumElevation: S.optional(Elevation),
    tags: S.optional(TagsMap),
    region: S.optional(S.String),
    dataflowList: S.optional(DataflowList),
    visibilityStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    visibilityEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    trackingOverrides: S.optional(TrackingOverrides),
    ephemeris: S.optional(EphemerisResponseData),
  }),
).annotate({
  identifier: "DescribeContactResponse",
}) as any as S.Schema<DescribeContactResponse>;
export interface CancelContactRequest {
  contactId: string;
}
export const CancelContactRequest = S.suspend(() =>
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
).annotate({
  identifier: "CancelContactRequest",
}) as any as S.Schema<CancelContactRequest>;
export type StatusList = ContactStatus[];
export const StatusList = S.Array(ContactStatus);
export interface AzElEphemerisFilter {
  id: string;
}
export const AzElEphemerisFilter = S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({
  identifier: "AzElEphemerisFilter",
}) as any as S.Schema<AzElEphemerisFilter>;
export type EphemerisFilter = { azEl: AzElEphemerisFilter };
export const EphemerisFilter = S.Union([
  S.Struct({ azEl: AzElEphemerisFilter }),
]);
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
export const ListContactsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    statusList: StatusList,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    groundStation: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    ephemeris: S.optional(EphemerisFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/contacts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContactsRequest",
}) as any as S.Schema<ListContactsRequest>;
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
}
export const ContactData = S.suspend(() =>
  S.Struct({
    contactId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    prePassStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    postPassEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    groundStation: S.optional(S.String),
    contactStatus: S.optional(ContactStatus),
    errorMessage: S.optional(S.String),
    maximumElevation: S.optional(Elevation),
    region: S.optional(S.String),
    tags: S.optional(TagsMap),
    visibilityStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    visibilityEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ephemeris: S.optional(EphemerisResponseData),
  }),
).annotate({ identifier: "ContactData" }) as any as S.Schema<ContactData>;
export type ContactList = ContactData[];
export const ContactList = S.Array(ContactData);
export interface ListContactsResponse {
  nextToken?: string;
  contactList?: ContactData[];
}
export const ListContactsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    contactList: S.optional(ContactList),
  }),
).annotate({
  identifier: "ListContactsResponse",
}) as any as S.Schema<ListContactsResponse>;
export type EndpointDetailsList = EndpointDetails[];
export const EndpointDetailsList = S.Array(EndpointDetails);
export interface CreateDataflowEndpointGroupRequest {
  endpointDetails: EndpointDetails[];
  tags?: { [key: string]: string | undefined };
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
}
export const CreateDataflowEndpointGroupRequest = S.suspend(() =>
  S.Struct({
    endpointDetails: EndpointDetailsList,
    tags: S.optional(TagsMap),
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
).annotate({
  identifier: "CreateDataflowEndpointGroupRequest",
}) as any as S.Schema<CreateDataflowEndpointGroupRequest>;
export interface DataflowEndpointGroupIdResponse {
  dataflowEndpointGroupId?: string;
}
export const DataflowEndpointGroupIdResponse = S.suspend(() =>
  S.Struct({ dataflowEndpointGroupId: S.optional(S.String) }),
).annotate({
  identifier: "DataflowEndpointGroupIdResponse",
}) as any as S.Schema<DataflowEndpointGroupIdResponse>;
export interface GetDataflowEndpointGroupRequest {
  dataflowEndpointGroupId: string;
}
export const GetDataflowEndpointGroupRequest = S.suspend(() =>
  S.Struct({
    dataflowEndpointGroupId: S.String.pipe(
      T.HttpLabel("dataflowEndpointGroupId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/dataflowEndpointGroup/{dataflowEndpointGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataflowEndpointGroupRequest",
}) as any as S.Schema<GetDataflowEndpointGroupRequest>;
export interface GetDataflowEndpointGroupResponse {
  dataflowEndpointGroupId?: string;
  dataflowEndpointGroupArn?: string;
  endpointsDetails?: EndpointDetails[];
  tags?: { [key: string]: string | undefined };
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
}
export const GetDataflowEndpointGroupResponse = S.suspend(() =>
  S.Struct({
    dataflowEndpointGroupId: S.optional(S.String),
    dataflowEndpointGroupArn: S.optional(S.String),
    endpointsDetails: S.optional(EndpointDetailsList),
    tags: S.optional(TagsMap),
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetDataflowEndpointGroupResponse",
}) as any as S.Schema<GetDataflowEndpointGroupResponse>;
export interface DeleteDataflowEndpointGroupRequest {
  dataflowEndpointGroupId: string;
}
export const DeleteDataflowEndpointGroupRequest = S.suspend(() =>
  S.Struct({
    dataflowEndpointGroupId: S.String.pipe(
      T.HttpLabel("dataflowEndpointGroupId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/dataflowEndpointGroup/{dataflowEndpointGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataflowEndpointGroupRequest",
}) as any as S.Schema<DeleteDataflowEndpointGroupRequest>;
export interface ListDataflowEndpointGroupsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListDataflowEndpointGroupsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListDataflowEndpointGroupsRequest",
}) as any as S.Schema<ListDataflowEndpointGroupsRequest>;
export interface DataflowEndpointListItem {
  dataflowEndpointGroupId?: string;
  dataflowEndpointGroupArn?: string;
}
export const DataflowEndpointListItem = S.suspend(() =>
  S.Struct({
    dataflowEndpointGroupId: S.optional(S.String),
    dataflowEndpointGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DataflowEndpointListItem",
}) as any as S.Schema<DataflowEndpointListItem>;
export type DataflowEndpointGroupList = DataflowEndpointListItem[];
export const DataflowEndpointGroupList = S.Array(DataflowEndpointListItem);
export interface ListDataflowEndpointGroupsResponse {
  nextToken?: string;
  dataflowEndpointGroupList?: DataflowEndpointListItem[];
}
export const ListDataflowEndpointGroupsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    dataflowEndpointGroupList: S.optional(DataflowEndpointGroupList),
  }),
).annotate({
  identifier: "ListDataflowEndpointGroupsResponse",
}) as any as S.Schema<ListDataflowEndpointGroupsResponse>;
export interface UplinkAwsGroundStationAgentEndpoint {
  name: string;
  dataflowDetails: UplinkDataflowDetails;
}
export const UplinkAwsGroundStationAgentEndpoint = S.suspend(() =>
  S.Struct({ name: S.String, dataflowDetails: UplinkDataflowDetails }),
).annotate({
  identifier: "UplinkAwsGroundStationAgentEndpoint",
}) as any as S.Schema<UplinkAwsGroundStationAgentEndpoint>;
export interface DownlinkAwsGroundStationAgentEndpoint {
  name: string;
  dataflowDetails: DownlinkDataflowDetails;
}
export const DownlinkAwsGroundStationAgentEndpoint = S.suspend(() =>
  S.Struct({ name: S.String, dataflowDetails: DownlinkDataflowDetails }),
).annotate({
  identifier: "DownlinkAwsGroundStationAgentEndpoint",
}) as any as S.Schema<DownlinkAwsGroundStationAgentEndpoint>;
export type CreateEndpointDetails =
  | {
      uplinkAwsGroundStationAgentEndpoint: UplinkAwsGroundStationAgentEndpoint;
      downlinkAwsGroundStationAgentEndpoint?: never;
    }
  | {
      uplinkAwsGroundStationAgentEndpoint?: never;
      downlinkAwsGroundStationAgentEndpoint: DownlinkAwsGroundStationAgentEndpoint;
    };
export const CreateEndpointDetails = S.Union([
  S.Struct({
    uplinkAwsGroundStationAgentEndpoint: UplinkAwsGroundStationAgentEndpoint,
  }),
  S.Struct({
    downlinkAwsGroundStationAgentEndpoint:
      DownlinkAwsGroundStationAgentEndpoint,
  }),
]);
export type CreateEndpointDetailsList = CreateEndpointDetails[];
export const CreateEndpointDetailsList = S.Array(CreateEndpointDetails);
export interface CreateDataflowEndpointGroupV2Request {
  endpoints: CreateEndpointDetails[];
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateDataflowEndpointGroupV2Request = S.suspend(() =>
  S.Struct({
    endpoints: CreateEndpointDetailsList,
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
    tags: S.optional(TagsMap),
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
).annotate({
  identifier: "CreateDataflowEndpointGroupV2Request",
}) as any as S.Schema<CreateDataflowEndpointGroupV2Request>;
export interface CreateDataflowEndpointGroupV2Response {
  dataflowEndpointGroupId?: string;
}
export const CreateDataflowEndpointGroupV2Response = S.suspend(() =>
  S.Struct({ dataflowEndpointGroupId: S.optional(S.String) }),
).annotate({
  identifier: "CreateDataflowEndpointGroupV2Response",
}) as any as S.Schema<CreateDataflowEndpointGroupV2Response>;
export interface S3Object {
  bucket?: string;
  key?: string;
  version?: string;
}
export const S3Object = S.suspend(() =>
  S.Struct({
    bucket: S.optional(S.String),
    key: S.optional(S.String),
    version: S.optional(S.String),
  }),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export interface TimeRange {
  startTime: Date;
  endTime: Date;
}
export const TimeRange = S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "TimeRange" }) as any as S.Schema<TimeRange>;
export interface TLEData {
  tleLine1: string;
  tleLine2: string;
  validTimeRange: TimeRange;
}
export const TLEData = S.suspend(() =>
  S.Struct({
    tleLine1: S.String,
    tleLine2: S.String,
    validTimeRange: TimeRange,
  }),
).annotate({ identifier: "TLEData" }) as any as S.Schema<TLEData>;
export type TLEDataList = TLEData[];
export const TLEDataList = S.Array(TLEData);
export interface TLEEphemeris {
  s3Object?: S3Object;
  tleData?: TLEData[];
}
export const TLEEphemeris = S.suspend(() =>
  S.Struct({
    s3Object: S.optional(S3Object),
    tleData: S.optional(TLEDataList),
  }),
).annotate({ identifier: "TLEEphemeris" }) as any as S.Schema<TLEEphemeris>;
export interface OEMEphemeris {
  s3Object?: S3Object;
  oemData?: string;
}
export const OEMEphemeris = S.suspend(() =>
  S.Struct({ s3Object: S.optional(S3Object), oemData: S.optional(S.String) }),
).annotate({ identifier: "OEMEphemeris" }) as any as S.Schema<OEMEphemeris>;
export interface ISO8601TimeRange {
  startTime: Date;
  endTime: Date;
}
export const ISO8601TimeRange = S.suspend(() =>
  S.Struct({
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ISO8601TimeRange",
}) as any as S.Schema<ISO8601TimeRange>;
export interface TimeAzEl {
  dt: number;
  az: number;
  el: number;
}
export const TimeAzEl = S.suspend(() =>
  S.Struct({ dt: S.Number, az: S.Number, el: S.Number }),
).annotate({ identifier: "TimeAzEl" }) as any as S.Schema<TimeAzEl>;
export type TimeAzElList = TimeAzEl[];
export const TimeAzElList = S.Array(TimeAzEl);
export interface AzElSegment {
  referenceEpoch: Date;
  validTimeRange: ISO8601TimeRange;
  azElList: TimeAzEl[];
}
export const AzElSegment = S.suspend(() =>
  S.Struct({
    referenceEpoch: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    validTimeRange: ISO8601TimeRange,
    azElList: TimeAzElList,
  }),
).annotate({ identifier: "AzElSegment" }) as any as S.Schema<AzElSegment>;
export type AzElSegmentList = AzElSegment[];
export const AzElSegmentList = S.Array(AzElSegment);
export interface AzElSegments {
  angleUnit: AngleUnits;
  azElSegmentList: AzElSegment[];
}
export const AzElSegments = S.suspend(() =>
  S.Struct({ angleUnit: AngleUnits, azElSegmentList: AzElSegmentList }),
).annotate({ identifier: "AzElSegments" }) as any as S.Schema<AzElSegments>;
export type AzElSegmentsData =
  | { s3Object: S3Object; azElData?: never }
  | { s3Object?: never; azElData: AzElSegments };
export const AzElSegmentsData = S.Union([
  S.Struct({ s3Object: S3Object }),
  S.Struct({ azElData: AzElSegments }),
]);
export interface AzElEphemeris {
  groundStation: string;
  data: AzElSegmentsData;
}
export const AzElEphemeris = S.suspend(() =>
  S.Struct({ groundStation: S.String, data: AzElSegmentsData }),
).annotate({ identifier: "AzElEphemeris" }) as any as S.Schema<AzElEphemeris>;
export type EphemerisData =
  | { tle: TLEEphemeris; oem?: never; azEl?: never }
  | { tle?: never; oem: OEMEphemeris; azEl?: never }
  | { tle?: never; oem?: never; azEl: AzElEphemeris };
export const EphemerisData = S.Union([
  S.Struct({ tle: TLEEphemeris }),
  S.Struct({ oem: OEMEphemeris }),
  S.Struct({ azEl: AzElEphemeris }),
]);
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
export const CreateEphemerisRequest = S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    priority: S.optional(S.Number),
    expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.String,
    kmsKeyArn: S.optional(S.String),
    ephemeris: S.optional(EphemerisData),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ephemeris" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEphemerisRequest",
}) as any as S.Schema<CreateEphemerisRequest>;
export interface EphemerisIdResponse {
  ephemerisId?: string;
}
export const EphemerisIdResponse = S.suspend(() =>
  S.Struct({ ephemerisId: S.optional(S.String) }),
).annotate({
  identifier: "EphemerisIdResponse",
}) as any as S.Schema<EphemerisIdResponse>;
export interface DescribeEphemerisRequest {
  ephemerisId: string;
}
export const DescribeEphemerisRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeEphemerisRequest",
}) as any as S.Schema<DescribeEphemerisRequest>;
export type EphemerisStatus =
  | "VALIDATING"
  | "INVALID"
  | "ERROR"
  | "ENABLED"
  | "DISABLED"
  | "EXPIRED"
  | (string & {});
export const EphemerisStatus = S.String;
export interface EphemerisDescription {
  sourceS3Object?: S3Object;
  ephemerisData?: string;
}
export const EphemerisDescription = S.suspend(() =>
  S.Struct({
    sourceS3Object: S.optional(S3Object),
    ephemerisData: S.optional(S.String),
  }),
).annotate({
  identifier: "EphemerisDescription",
}) as any as S.Schema<EphemerisDescription>;
export type EphemerisTypeDescription =
  | { tle: EphemerisDescription; oem?: never; azEl?: never }
  | { tle?: never; oem: EphemerisDescription; azEl?: never }
  | { tle?: never; oem?: never; azEl: EphemerisDescription };
export const EphemerisTypeDescription = S.Union([
  S.Struct({ tle: EphemerisDescription }),
  S.Struct({ oem: EphemerisDescription }),
  S.Struct({ azEl: EphemerisDescription }),
]);
export type EphemerisInvalidReason =
  | "METADATA_INVALID"
  | "TIME_RANGE_INVALID"
  | "TRAJECTORY_INVALID"
  | "KMS_KEY_INVALID"
  | "VALIDATION_ERROR"
  | (string & {});
export const EphemerisInvalidReason = S.String;
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
export const EphemerisErrorCode = S.String;
export interface EphemerisErrorReason {
  errorCode: EphemerisErrorCode;
  errorMessage: string;
}
export const EphemerisErrorReason = S.suspend(() =>
  S.Struct({ errorCode: EphemerisErrorCode, errorMessage: S.String }),
).annotate({
  identifier: "EphemerisErrorReason",
}) as any as S.Schema<EphemerisErrorReason>;
export type EphemerisErrorReasonList = EphemerisErrorReason[];
export const EphemerisErrorReasonList = S.Array(EphemerisErrorReason);
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
export const DescribeEphemerisResponse = S.suspend(() =>
  S.Struct({
    ephemerisId: S.optional(S.String),
    satelliteId: S.optional(S.String),
    status: S.optional(EphemerisStatus),
    priority: S.optional(S.Number),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    enabled: S.optional(S.Boolean),
    name: S.optional(S.String),
    tags: S.optional(TagsMap),
    suppliedData: S.optional(EphemerisTypeDescription),
    invalidReason: S.optional(EphemerisInvalidReason),
    errorReasons: S.optional(EphemerisErrorReasonList),
  }),
).annotate({
  identifier: "DescribeEphemerisResponse",
}) as any as S.Schema<DescribeEphemerisResponse>;
export interface UpdateEphemerisRequest {
  ephemerisId: string;
  enabled: boolean;
  name?: string;
  priority?: number;
}
export const UpdateEphemerisRequest = S.suspend(() =>
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
).annotate({
  identifier: "UpdateEphemerisRequest",
}) as any as S.Schema<UpdateEphemerisRequest>;
export interface DeleteEphemerisRequest {
  ephemerisId: string;
}
export const DeleteEphemerisRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteEphemerisRequest",
}) as any as S.Schema<DeleteEphemerisRequest>;
export type EphemerisStatusList = EphemerisStatus[];
export const EphemerisStatusList = S.Array(EphemerisStatus);
export interface ListEphemeridesRequest {
  satelliteId?: string;
  ephemerisType?: EphemerisType;
  startTime: Date;
  endTime: Date;
  statusList?: EphemerisStatus[];
  maxResults?: number;
  nextToken?: string;
}
export const ListEphemeridesRequest = S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String),
    ephemerisType: S.optional(EphemerisType),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    statusList: S.optional(EphemerisStatusList),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ephemerides" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEphemeridesRequest",
}) as any as S.Schema<ListEphemeridesRequest>;
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
export const EphemerisItem = S.suspend(() =>
  S.Struct({
    ephemerisId: S.optional(S.String),
    ephemerisType: S.optional(EphemerisType),
    status: S.optional(EphemerisStatus),
    priority: S.optional(S.Number),
    enabled: S.optional(S.Boolean),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.optional(S.String),
    sourceS3Object: S.optional(S3Object),
  }),
).annotate({ identifier: "EphemerisItem" }) as any as S.Schema<EphemerisItem>;
export type EphemeridesList = EphemerisItem[];
export const EphemeridesList = S.Array(EphemerisItem);
export interface ListEphemeridesResponse {
  nextToken?: string;
  ephemerides?: EphemerisItem[];
}
export const ListEphemeridesResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    ephemerides: S.optional(EphemeridesList),
  }),
).annotate({
  identifier: "ListEphemeridesResponse",
}) as any as S.Schema<ListEphemeridesResponse>;
export interface ListGroundStationsRequest {
  satelliteId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListGroundStationsRequest = S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String).pipe(T.HttpQuery("satelliteId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/groundstation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroundStationsRequest",
}) as any as S.Schema<ListGroundStationsRequest>;
export interface GroundStationData {
  groundStationId?: string;
  groundStationName?: string;
  region?: string;
}
export const GroundStationData = S.suspend(() =>
  S.Struct({
    groundStationId: S.optional(S.String),
    groundStationName: S.optional(S.String),
    region: S.optional(S.String),
  }),
).annotate({
  identifier: "GroundStationData",
}) as any as S.Schema<GroundStationData>;
export type GroundStationList = GroundStationData[];
export const GroundStationList = S.Array(GroundStationData);
export interface ListGroundStationsResponse {
  nextToken?: string;
  groundStationList?: GroundStationData[];
}
export const ListGroundStationsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    groundStationList: S.optional(GroundStationList),
  }),
).annotate({
  identifier: "ListGroundStationsResponse",
}) as any as S.Schema<ListGroundStationsResponse>;
export type DataflowEdge = string[];
export const DataflowEdge = S.Array(S.String);
export type DataflowEdgeList = string[][];
export const DataflowEdgeList = S.Array(DataflowEdge);
export type KmsKey =
  | { kmsKeyArn: string; kmsAliasArn?: never; kmsAliasName?: never }
  | { kmsKeyArn?: never; kmsAliasArn: string; kmsAliasName?: never }
  | { kmsKeyArn?: never; kmsAliasArn?: never; kmsAliasName: string };
export const KmsKey = S.Union([
  S.Struct({ kmsKeyArn: S.String }),
  S.Struct({ kmsAliasArn: S.String }),
  S.Struct({ kmsAliasName: S.String }),
]);
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
export const CreateMissionProfileRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
    minimumViableContactDurationSeconds: S.Number,
    dataflowEdges: DataflowEdgeList,
    trackingConfigArn: S.String,
    telemetrySinkConfigArn: S.optional(S.String),
    tags: S.optional(TagsMap),
    streamsKmsKey: S.optional(KmsKey),
    streamsKmsRole: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/missionprofile" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMissionProfileRequest",
}) as any as S.Schema<CreateMissionProfileRequest>;
export interface MissionProfileIdResponse {
  missionProfileId?: string;
}
export const MissionProfileIdResponse = S.suspend(() =>
  S.Struct({ missionProfileId: S.optional(S.String) }),
).annotate({
  identifier: "MissionProfileIdResponse",
}) as any as S.Schema<MissionProfileIdResponse>;
export interface GetMissionProfileRequest {
  missionProfileId: string;
}
export const GetMissionProfileRequest = S.suspend(() =>
  S.Struct({
    missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/missionprofile/{missionProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMissionProfileRequest",
}) as any as S.Schema<GetMissionProfileRequest>;
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
export const GetMissionProfileResponse = S.suspend(() =>
  S.Struct({
    missionProfileId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    name: S.optional(S.String),
    region: S.optional(S.String),
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
    minimumViableContactDurationSeconds: S.optional(S.Number),
    dataflowEdges: S.optional(DataflowEdgeList),
    trackingConfigArn: S.optional(S.String),
    telemetrySinkConfigArn: S.optional(S.String),
    tags: S.optional(TagsMap),
    streamsKmsKey: S.optional(KmsKey),
    streamsKmsRole: S.optional(S.String),
  }),
).annotate({
  identifier: "GetMissionProfileResponse",
}) as any as S.Schema<GetMissionProfileResponse>;
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
export const UpdateMissionProfileRequest = S.suspend(() =>
  S.Struct({
    missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")),
    name: S.optional(S.String),
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
    minimumViableContactDurationSeconds: S.optional(S.Number),
    dataflowEdges: S.optional(DataflowEdgeList),
    trackingConfigArn: S.optional(S.String),
    telemetrySinkConfigArn: S.optional(S.String),
    streamsKmsKey: S.optional(KmsKey),
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
).annotate({
  identifier: "UpdateMissionProfileRequest",
}) as any as S.Schema<UpdateMissionProfileRequest>;
export interface DeleteMissionProfileRequest {
  missionProfileId: string;
}
export const DeleteMissionProfileRequest = S.suspend(() =>
  S.Struct({
    missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/missionprofile/{missionProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMissionProfileRequest",
}) as any as S.Schema<DeleteMissionProfileRequest>;
export interface ListMissionProfilesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListMissionProfilesRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/missionprofile" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMissionProfilesRequest",
}) as any as S.Schema<ListMissionProfilesRequest>;
export interface MissionProfileListItem {
  missionProfileId?: string;
  missionProfileArn?: string;
  region?: string;
  name?: string;
}
export const MissionProfileListItem = S.suspend(() =>
  S.Struct({
    missionProfileId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    region: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "MissionProfileListItem",
}) as any as S.Schema<MissionProfileListItem>;
export type MissionProfileList = MissionProfileListItem[];
export const MissionProfileList = S.Array(MissionProfileListItem);
export interface ListMissionProfilesResponse {
  nextToken?: string;
  missionProfileList?: MissionProfileListItem[];
}
export const ListMissionProfilesResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    missionProfileList: S.optional(MissionProfileList),
  }),
).annotate({
  identifier: "ListMissionProfilesResponse",
}) as any as S.Schema<ListMissionProfilesResponse>;
export interface GetSatelliteRequest {
  satelliteId: string;
}
export const GetSatelliteRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetSatelliteRequest",
}) as any as S.Schema<GetSatelliteRequest>;
export type GroundStationIdList = string[];
export const GroundStationIdList = S.Array(S.String);
export type EphemerisSource =
  | "CUSTOMER_PROVIDED"
  | "SPACE_TRACK"
  | (string & {});
export const EphemerisSource = S.String;
export interface EphemerisMetaData {
  source: EphemerisSource;
  ephemerisId?: string;
  epoch?: Date;
  name?: string;
}
export const EphemerisMetaData = S.suspend(() =>
  S.Struct({
    source: EphemerisSource,
    ephemerisId: S.optional(S.String),
    epoch: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "EphemerisMetaData",
}) as any as S.Schema<EphemerisMetaData>;
export interface GetSatelliteResponse {
  satelliteId?: string;
  satelliteArn?: string;
  noradSatelliteID?: number;
  groundStations?: string[];
  currentEphemeris?: EphemerisMetaData;
}
export const GetSatelliteResponse = S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    noradSatelliteID: S.optional(S.Number),
    groundStations: S.optional(GroundStationIdList),
    currentEphemeris: S.optional(EphemerisMetaData),
  }),
).annotate({
  identifier: "GetSatelliteResponse",
}) as any as S.Schema<GetSatelliteResponse>;
export interface ListSatellitesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListSatellitesRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/satellite" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSatellitesRequest",
}) as any as S.Schema<ListSatellitesRequest>;
export interface SatelliteListItem {
  satelliteId?: string;
  satelliteArn?: string;
  noradSatelliteID?: number;
  groundStations?: string[];
  currentEphemeris?: EphemerisMetaData;
}
export const SatelliteListItem = S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    noradSatelliteID: S.optional(S.Number),
    groundStations: S.optional(GroundStationIdList),
    currentEphemeris: S.optional(EphemerisMetaData),
  }),
).annotate({
  identifier: "SatelliteListItem",
}) as any as S.Schema<SatelliteListItem>;
export type SatelliteList = SatelliteListItem[];
export const SatelliteList = S.Array(SatelliteListItem);
export interface ListSatellitesResponse {
  nextToken?: string;
  satellites?: SatelliteListItem[];
}
export const ListSatellitesResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    satellites: S.optional(SatelliteList),
  }),
).annotate({
  identifier: "ListSatellitesResponse",
}) as any as S.Schema<ListSatellitesResponse>;

//# Errors
export class DependencyException extends S.TaggedErrorClass<DependencyException>()(
  "DependencyException",
  { message: S.optional(S.String), parameterName: S.optional(S.String) },
).pipe(C.withServerError) {}
export class InvalidParameterException extends S.TaggedErrorClass<InvalidParameterException>()(
  "InvalidParameterException",
  { message: S.optional(S.String), parameterName: S.optional(S.String) },
) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
) {}
export class ResourceLimitExceededException extends S.TaggedErrorClass<ResourceLimitExceededException>()(
  "ResourceLimitExceededException",
  { message: S.optional(S.String), parameterName: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.optional(S.String), parameterName: S.optional(S.String) },
).pipe(C.withQuotaError) {}
export class ResourceInUseException extends S.TaggedErrorClass<ResourceInUseException>()(
  "ResourceInUseException",
  { message: S.optional(S.String) },
).pipe(C.withConflictError) {}

//# Operations
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Gets a presigned URL for uploading agent task response logs.
 */
export const getAgentTaskResponseUrl: (
  input: GetAgentTaskResponseUrlRequest,
) => effect.Effect<
  GetAgentTaskResponseUrlResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAgentTaskResponseUrlRequest,
  output: GetAgentTaskResponseUrlResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns the number of reserved minutes used by account.
 */
export const getMinuteUsage: (
  input: GetMinuteUsageRequest,
) => effect.Effect<
  GetMinuteUsageResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMinuteUsageRequest,
  output: GetMinuteUsageResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns a list of tags for a specified resource.
 */
export const listTagsForResource: (
  input: ListTagsForResourceRequest,
) => effect.Effect<
  ListTagsForResourceResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Assigns a tag to a resource.
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deassigns a resource tag.
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Registers a new agent with AWS Ground Station.
 */
export const registerAgent: (
  input: RegisterAgentRequest,
) => effect.Effect<
  RegisterAgentResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegisterAgentRequest,
  output: RegisterAgentResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Gets the latest configuration information for a registered agent.
 */
export const getAgentConfiguration: (
  input: GetAgentConfigurationRequest,
) => effect.Effect<
  GetAgentConfigurationResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAgentConfigurationRequest,
  output: GetAgentConfigurationResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Update the status of the agent.
 */
export const updateAgentStatus: (
  input: UpdateAgentStatusRequest,
) => effect.Effect<
  UpdateAgentStatusResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAgentStatusRequest,
  output: UpdateAgentStatusResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Creates a `Config` with the specified `configData` parameters.
 *
 * Only one type of `configData` can be specified.
 */
export const createConfig: (
  input: CreateConfigRequest,
) => effect.Effect<
  ConfigIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConfigRequest,
  output: ConfigIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns `Config` information.
 *
 * Only one `Config` response can be returned.
 */
export const getConfig: (
  input: GetConfigRequest,
) => effect.Effect<
  GetConfigResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigRequest,
  output: GetConfigResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates the `Config` used when scheduling contacts.
 *
 * Updating a `Config` will not update the execution parameters for existing future contacts scheduled with this `Config`.
 */
export const updateConfig: (
  input: UpdateConfigRequest,
) => effect.Effect<
  ConfigIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConfigRequest,
  output: ConfigIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes a `Config`.
 */
export const deleteConfig: (
  input: DeleteConfigRequest,
) => effect.Effect<
  ConfigIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConfigRequest,
  output: ConfigIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns a list of `Config` objects.
 */
export const listConfigs: {
  (
    input: ListConfigsRequest,
  ): effect.Effect<
    ListConfigsResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListConfigsRequest,
  ) => stream.Stream<
    ListConfigsResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListConfigsRequest,
  ) => stream.Stream<
    ConfigListItem,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListConfigsRequest,
  output: ListConfigsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configList",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Reserves a contact using specified parameters.
 */
export const reserveContact: (
  input: ReserveContactRequest,
) => effect.Effect<
  ContactIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReserveContactRequest,
  output: ContactIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Describes an existing contact.
 */
export const describeContact: (
  input: DescribeContactRequest,
) => effect.Effect<
  DescribeContactResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeContactRequest,
  output: DescribeContactResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Cancels or stops a contact with a specified contact ID based on its position in the contact lifecycle.
 *
 * For contacts that:
 *
 * - Have yet to start, the contact will be cancelled.
 *
 * - Have started but have yet to finish, the contact will be stopped.
 */
export const cancelContact: (
  input: CancelContactRequest,
) => effect.Effect<
  ContactIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelContactRequest,
  output: ContactIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns a list of contacts.
 *
 * If `statusList` contains AVAILABLE, the request must include ` groundStation`, `missionprofileArn`, and `satelliteArn`.
 */
export const listContacts: {
  (
    input: ListContactsRequest,
  ): effect.Effect<
    ListContactsResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListContactsRequest,
  ) => stream.Stream<
    ListContactsResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListContactsRequest,
  ) => stream.Stream<
    ContactData,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListContactsRequest,
  output: ListContactsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contactList",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Creates a `DataflowEndpoint` group containing the specified list of ` DataflowEndpoint` objects.
 *
 * The `name` field in each endpoint is used in your mission profile ` DataflowEndpointConfig` to specify which endpoints to use during a contact.
 *
 * When a contact uses multiple `DataflowEndpointConfig` objects, each ` Config` must match a `DataflowEndpoint` in the same group.
 */
export const createDataflowEndpointGroup: (
  input: CreateDataflowEndpointGroupRequest,
) => effect.Effect<
  DataflowEndpointGroupIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDataflowEndpointGroupRequest,
  output: DataflowEndpointGroupIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns the dataflow endpoint group.
 */
export const getDataflowEndpointGroup: (
  input: GetDataflowEndpointGroupRequest,
) => effect.Effect<
  GetDataflowEndpointGroupResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDataflowEndpointGroupRequest,
  output: GetDataflowEndpointGroupResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes a dataflow endpoint group.
 */
export const deleteDataflowEndpointGroup: (
  input: DeleteDataflowEndpointGroupRequest,
) => effect.Effect<
  DataflowEndpointGroupIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDataflowEndpointGroupRequest,
  output: DataflowEndpointGroupIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns a list of `DataflowEndpoint` groups.
 */
export const listDataflowEndpointGroups: {
  (
    input: ListDataflowEndpointGroupsRequest,
  ): effect.Effect<
    ListDataflowEndpointGroupsResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListDataflowEndpointGroupsRequest,
  ) => stream.Stream<
    ListDataflowEndpointGroupsResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDataflowEndpointGroupsRequest,
  ) => stream.Stream<
    DataflowEndpointListItem,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDataflowEndpointGroupsRequest,
  output: ListDataflowEndpointGroupsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataflowEndpointGroupList",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Creates a `DataflowEndpoint` group containing the specified list of Ground Station Agent based endpoints.
 *
 * The `name` field in each endpoint is used in your mission profile ` DataflowEndpointConfig` to specify which endpoints to use during a contact.
 *
 * When a contact uses multiple `DataflowEndpointConfig` objects, each ` Config` must match a `DataflowEndpoint` in the same group.
 */
export const createDataflowEndpointGroupV2: (
  input: CreateDataflowEndpointGroupV2Request,
) => effect.Effect<
  CreateDataflowEndpointGroupV2Response,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDataflowEndpointGroupV2Request,
  output: CreateDataflowEndpointGroupV2Response,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
}));
/**
 * Create an ephemeris with your specified EphemerisData.
 */
export const createEphemeris: (
  input: CreateEphemerisRequest,
) => effect.Effect<
  EphemerisIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEphemerisRequest,
  output: EphemerisIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieve information about an existing ephemeris.
 */
export const describeEphemeris: (
  input: DescribeEphemerisRequest,
) => effect.Effect<
  DescribeEphemerisResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeEphemerisRequest,
  output: DescribeEphemerisResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Update an existing ephemeris.
 */
export const updateEphemeris: (
  input: UpdateEphemerisRequest,
) => effect.Effect<
  EphemerisIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateEphemerisRequest,
  output: EphemerisIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Delete an ephemeris.
 */
export const deleteEphemeris: (
  input: DeleteEphemerisRequest,
) => effect.Effect<
  EphemerisIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEphemerisRequest,
  output: EphemerisIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
}));
/**
 * List your existing ephemerides.
 */
export const listEphemerides: {
  (
    input: ListEphemeridesRequest,
  ): effect.Effect<
    ListEphemeridesResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListEphemeridesRequest,
  ) => stream.Stream<
    ListEphemeridesResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEphemeridesRequest,
  ) => stream.Stream<
    EphemerisItem,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEphemeridesRequest,
  output: ListEphemeridesResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ephemerides",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a list of ground stations.
 */
export const listGroundStations: {
  (
    input: ListGroundStationsRequest,
  ): effect.Effect<
    ListGroundStationsResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListGroundStationsRequest,
  ) => stream.Stream<
    ListGroundStationsResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListGroundStationsRequest,
  ) => stream.Stream<
    GroundStationData,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGroundStationsRequest,
  output: ListGroundStationsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "groundStationList",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Creates a mission profile.
 *
 * `dataflowEdges` is a list of lists of strings. Each lower level list of strings has two elements: a *from* ARN and a *to* ARN.
 */
export const createMissionProfile: (
  input: CreateMissionProfileRequest,
) => effect.Effect<
  MissionProfileIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMissionProfileRequest,
  output: MissionProfileIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns a mission profile.
 */
export const getMissionProfile: (
  input: GetMissionProfileRequest,
) => effect.Effect<
  GetMissionProfileResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMissionProfileRequest,
  output: GetMissionProfileResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates a mission profile.
 *
 * Updating a mission profile will not update the execution parameters for existing future contacts.
 */
export const updateMissionProfile: (
  input: UpdateMissionProfileRequest,
) => effect.Effect<
  MissionProfileIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMissionProfileRequest,
  output: MissionProfileIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes a mission profile.
 */
export const deleteMissionProfile: (
  input: DeleteMissionProfileRequest,
) => effect.Effect<
  MissionProfileIdResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMissionProfileRequest,
  output: MissionProfileIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns a list of mission profiles.
 */
export const listMissionProfiles: {
  (
    input: ListMissionProfilesRequest,
  ): effect.Effect<
    ListMissionProfilesResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListMissionProfilesRequest,
  ) => stream.Stream<
    ListMissionProfilesResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMissionProfilesRequest,
  ) => stream.Stream<
    MissionProfileListItem,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMissionProfilesRequest,
  output: ListMissionProfilesResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "missionProfileList",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a satellite.
 */
export const getSatellite: (
  input: GetSatelliteRequest,
) => effect.Effect<
  GetSatelliteResponse,
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSatelliteRequest,
  output: GetSatelliteResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns a list of satellites.
 */
export const listSatellites: {
  (
    input: ListSatellitesRequest,
  ): effect.Effect<
    ListSatellitesResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListSatellitesRequest,
  ) => stream.Stream<
    ListSatellitesResponse,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSatellitesRequest,
  ) => stream.Stream<
    SatelliteListItem,
    | DependencyException
    | InvalidParameterException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSatellitesRequest,
  output: ListSatellitesResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "satellites",
    pageSize: "maxResults",
  } as const,
}));
