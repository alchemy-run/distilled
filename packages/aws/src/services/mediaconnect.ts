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
  sdkId: "MediaConnect",
  target: "MediaConnect",
  version: "2018-11-14",
  sigv4: "mediaconnect",
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
                `https://mediaconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://mediaconnect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mediaconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mediaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AddFlowOutputs420Exception
  extends /*@__PURE__*/ TE.TaggedError("AddFlowOutputs420Exception", [], {
    status: 420,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictException",
    ["ConflictError", "RetryableError"],
    { status: 409, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class CreateBridge420Exception
  extends /*@__PURE__*/ TE.TaggedError("CreateBridge420Exception", [], {
    status: 420,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class CreateFlow420Exception
  extends /*@__PURE__*/ TE.TaggedError("CreateFlow420Exception", [], {
    status: 420,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class CreateGateway420Exception
  extends /*@__PURE__*/ TE.TaggedError("CreateGateway420Exception", [], {
    status: 420,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class GrantFlowEntitlements420Exception
  extends /*@__PURE__*/ TE.TaggedError(
    "GrantFlowEntitlements420Exception",
    [],
    { status: 420, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError", "RetryableError"],
    { status: 500, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class RouterInputServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "RouterInputServiceQuotaExceededException",
    [],
    { status: 420, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class RouterNetworkInterfaceServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "RouterNetworkInterfaceServiceQuotaExceededException",
    [],
    { status: 420, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class RouterOutputServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "RouterOutputServiceQuotaExceededException",
    [],
    { status: 420, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError", "RetryableError"],
    { status: 503, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export type BridgeArn = string;
export type Protocol =
  | "zixi-push"
  | "rtp-fec"
  | "rtp"
  | "zixi-pull"
  | "rist"
  | "st2110-jpegxs"
  | "cdi"
  | "srt-listener"
  | "srt-caller"
  | "fujitsu-qos"
  | "udp"
  | "ndi-speed-hq"
  | (string & {});
export interface AddBridgeNetworkOutputRequest {
  IpAddress?: string;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export interface AddBridgeOutputRequest {
  NetworkOutput?: AddBridgeNetworkOutputRequest;
}
export type __listOfAddBridgeOutputRequest = AddBridgeOutputRequest[];
export interface AddBridgeOutputsRequest {
  BridgeArn: string;
  Outputs?: AddBridgeOutputRequest[];
}
export interface BridgeFlowOutput {
  FlowArn?: string;
  FlowSourceArn?: string;
  Name?: string;
}
export interface BridgeNetworkOutput {
  IpAddress?: string;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export interface BridgeOutput {
  FlowOutput?: BridgeFlowOutput;
  NetworkOutput?: BridgeNetworkOutput;
}
export type __listOfBridgeOutput = BridgeOutput[];
export interface AddBridgeOutputsResponse {
  BridgeArn?: string;
  Outputs?: (BridgeOutput & {
    FlowOutput: BridgeFlowOutput & {
      FlowArn: string;
      FlowSourceArn: string;
      Name: string;
    };
    NetworkOutput: BridgeNetworkOutput & {
      IpAddress: string;
      Name: string;
      NetworkName: string;
      Port: number;
      Protocol: Protocol;
      Ttl: number;
    };
  })[];
}
export interface VpcInterfaceAttachment {
  VpcInterfaceName?: string;
}
export interface AddBridgeFlowSourceRequest {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
  Name?: string;
}
export interface MulticastSourceSettings {
  MulticastSourceIp?: string;
}
export interface AddBridgeNetworkSourceRequest {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export interface AddBridgeSourceRequest {
  FlowSource?: AddBridgeFlowSourceRequest;
  NetworkSource?: AddBridgeNetworkSourceRequest;
}
export type __listOfAddBridgeSourceRequest = AddBridgeSourceRequest[];
export interface AddBridgeSourcesRequest {
  BridgeArn: string;
  Sources?: AddBridgeSourceRequest[];
}
export interface BridgeFlowSource {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
  Name?: string;
  OutputArn?: string;
}
export interface BridgeNetworkSource {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export interface BridgeSource {
  FlowSource?: BridgeFlowSource;
  NetworkSource?: BridgeNetworkSource;
}
export type __listOfBridgeSource = BridgeSource[];
export interface AddBridgeSourcesResponse {
  BridgeArn?: string;
  Sources?: (BridgeSource & {
    FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
    NetworkSource: BridgeNetworkSource & {
      MulticastIp: string;
      Name: string;
      NetworkName: string;
      Port: number;
      Protocol: Protocol;
    };
  })[];
}
export type FlowArn = string;
export type Colorimetry =
  | "BT601"
  | "BT709"
  | "BT2020"
  | "BT2100"
  | "ST2065-1"
  | "ST2065-3"
  | "XYZ"
  | (string & {});
export type Range = "NARROW" | "FULL" | "FULLPROTECT" | (string & {});
export type ScanMode =
  | "progressive"
  | "interlace"
  | "progressive-segmented-frame"
  | (string & {});
export type Tcs =
  | "SDR"
  | "PQ"
  | "HLG"
  | "LINEAR"
  | "BT2100LINPQ"
  | "BT2100LINHLG"
  | "ST2065-1"
  | "ST428-1"
  | "DENSITY"
  | (string & {});
export interface FmtpRequest {
  ChannelOrder?: string;
  Colorimetry?: Colorimetry;
  ExactFramerate?: string;
  Par?: string;
  Range?: Range;
  ScanMode?: ScanMode;
  Tcs?: Tcs;
}
export interface MediaStreamAttributesRequest {
  Fmtp?: FmtpRequest;
  Lang?: string;
}
export type MediaStreamType =
  | "video"
  | "audio"
  | "ancillary-data"
  | (string & {});
export type __mapOfString = { [key: string]: string | undefined };
export interface AddMediaStreamRequest {
  Attributes?: MediaStreamAttributesRequest;
  ClockRate?: number;
  Description?: string;
  MediaStreamId?: number;
  MediaStreamName?: string;
  MediaStreamType?: MediaStreamType;
  VideoFormat?: string;
  MediaStreamTags?: { [key: string]: string | undefined };
}
export type __listOfAddMediaStreamRequest = AddMediaStreamRequest[];
export interface AddFlowMediaStreamsRequest {
  FlowArn: string;
  MediaStreams?: AddMediaStreamRequest[];
}
export interface Fmtp {
  ChannelOrder?: string;
  Colorimetry?: Colorimetry;
  ExactFramerate?: string;
  Par?: string;
  Range?: Range;
  ScanMode?: ScanMode;
  Tcs?: Tcs;
}
export interface MediaStreamAttributes {
  Fmtp?: Fmtp;
  Lang?: string;
}
export interface MediaStream {
  Attributes?: MediaStreamAttributes;
  ClockRate?: number;
  Description?: string;
  Fmt?: number;
  MediaStreamId?: number;
  MediaStreamName?: string;
  MediaStreamType?: MediaStreamType;
  VideoFormat?: string;
}
export type __listOfMediaStream = MediaStream[];
export interface AddFlowMediaStreamsResponse {
  FlowArn?: string;
  MediaStreams?: (MediaStream & {
    Fmt: number;
    MediaStreamId: number;
    MediaStreamName: string;
    MediaStreamType: MediaStreamType;
    Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
  })[];
}
export type __listOfString = string[];
export type Algorithm = "aes128" | "aes192" | "aes256" | (string & {});
export type KeyType = "speke" | "static-key" | "srt-password" | (string & {});
export interface Encryption {
  Algorithm?: Algorithm;
  ConstantInitializationVector?: string;
  DeviceId?: string;
  KeyType?: KeyType;
  Region?: string;
  ResourceId?: string;
  RoleArn?: string;
  SecretArn?: string;
  Url?: string;
}
export interface InterfaceRequest {
  Name?: string;
}
export interface DestinationConfigurationRequest {
  DestinationIp?: string;
  DestinationPort?: number;
  Interface?: InterfaceRequest;
}
export type __listOfDestinationConfigurationRequest =
  DestinationConfigurationRequest[];
export type EncodingName = "jxsv" | "raw" | "smpte291" | "pcm" | (string & {});
export type EncoderProfile = "main" | "high" | (string & {});
export interface EncodingParametersRequest {
  CompressionFactor?: number;
  EncoderProfile?: EncoderProfile;
}
export interface MediaStreamOutputConfigurationRequest {
  DestinationConfigurations?: DestinationConfigurationRequest[];
  EncodingName?: EncodingName;
  EncodingParameters?: EncodingParametersRequest;
  MediaStreamName?: string;
}
export type __listOfMediaStreamOutputConfigurationRequest =
  MediaStreamOutputConfigurationRequest[];
export type OutputStatus = "ENABLED" | "DISABLED" | (string & {});
export type State = "ENABLED" | "DISABLED" | (string & {});
export type FlowTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export type SecretArn = string;
export type RoleArn = string;
export interface SecretsManagerEncryptionKeyConfiguration {
  SecretArn: string;
  RoleArn: string;
}
export interface AutomaticEncryptionKeyConfiguration {}
export type FlowTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export interface FlowTransitEncryption {
  EncryptionKeyType?: FlowTransitEncryptionKeyType;
  EncryptionKeyConfiguration: FlowTransitEncryptionKeyConfiguration;
}
export type NdiOutputTimecodeSource =
  | "EMBEDDED_TIMECODE"
  | "UTC_SYSTEM_TIME"
  | (string & {});
export interface AddOutputRequest {
  CidrAllowList?: string[];
  Description?: string;
  Destination?: string;
  Encryption?: Encryption;
  MaxLatency?: number;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfigurationRequest[];
  MinLatency?: number;
  Name?: string;
  Port?: number;
  Protocol?: Protocol;
  RemoteId?: string;
  SenderControlPort?: number;
  SmoothingLatency?: number;
  StreamId?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
  OutputStatus?: OutputStatus;
  NdiSpeedHqQuality?: number;
  NdiProgramName?: string;
  OutputTags?: { [key: string]: string | undefined };
  RouterIntegrationState?: State;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource;
}
export type __listOfAddOutputRequest = AddOutputRequest[];
export interface AddFlowOutputsRequest {
  FlowArn: string;
  Outputs?: AddOutputRequest[];
}
export interface Interface {
  Name?: string;
}
export interface DestinationConfiguration {
  DestinationIp?: string;
  DestinationPort?: number;
  Interface?: Interface;
  OutboundIp?: string;
}
export type __listOfDestinationConfiguration = DestinationConfiguration[];
export interface EncodingParameters {
  CompressionFactor?: number;
  EncoderProfile?: EncoderProfile;
}
export interface MediaStreamOutputConfiguration {
  DestinationConfigurations?: DestinationConfiguration[];
  EncodingName?: EncodingName;
  EncodingParameters?: EncodingParameters;
  MediaStreamName?: string;
}
export type __listOfMediaStreamOutputConfiguration =
  MediaStreamOutputConfiguration[];
export interface NdiSourceSettings {
  SourceName?: string;
}
export interface Transport {
  CidrAllowList?: string[];
  MaxBitrate?: number;
  MaxLatency?: number;
  MaxSyncBuffer?: number;
  MinLatency?: number;
  Protocol?: Protocol;
  RemoteId?: string;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SmoothingLatency?: number;
  SourceListenerAddress?: string;
  SourceListenerPort?: number;
  StreamId?: string;
  NdiSpeedHqQuality?: number;
  NdiProgramName?: string;
  NdiSourceSettings?: NdiSourceSettings;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource;
}
export type __listOfInteger = number[];
export interface Output {
  DataTransferSubscriberFeePercent?: number;
  Description?: string;
  Destination?: string;
  Encryption?: Encryption;
  EntitlementArn?: string;
  ListenerAddress?: string;
  MediaLiveInputArn?: string;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfiguration[];
  Name?: string;
  OutputArn?: string;
  Port?: number;
  Transport?: Transport;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
  BridgeArn?: string;
  BridgePorts?: number[];
  OutputStatus?: OutputStatus;
  PeerIpAddress?: string;
  RouterIntegrationState?: State;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption;
  ConnectedRouterInputArn?: string;
}
export type __listOfOutput = Output[];
export interface AddFlowOutputsResponse {
  FlowArn?: string;
  Outputs?: (Output & {
    Name: string;
    OutputArn: string;
    Encryption: Encryption & { RoleArn: string };
    MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
      EncodingName: EncodingName;
      MediaStreamName: string;
      DestinationConfigurations: (DestinationConfiguration & {
        DestinationIp: string;
        DestinationPort: number;
        Interface: Interface & { Name: string };
        OutboundIp: string;
      })[];
      EncodingParameters: EncodingParameters & {
        CompressionFactor: number;
        EncoderProfile: EncoderProfile;
      };
    })[];
    Transport: Transport & { Protocol: Protocol };
  })[];
}
export interface InputConfigurationRequest {
  InputPort?: number;
  Interface?: InterfaceRequest;
}
export type __listOfInputConfigurationRequest = InputConfigurationRequest[];
export interface MediaStreamSourceConfigurationRequest {
  EncodingName?: EncodingName;
  InputConfigurations?: InputConfigurationRequest[];
  MediaStreamName?: string;
}
export type __listOfMediaStreamSourceConfigurationRequest =
  MediaStreamSourceConfigurationRequest[];
export interface SetGatewayBridgeSourceRequest {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export interface SetSourceRequest {
  Decryption?: Encryption;
  Description?: string;
  EntitlementArn?: string;
  IngestPort?: number;
  MaxBitrate?: number;
  MaxLatency?: number;
  MaxSyncBuffer?: number;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfigurationRequest[];
  MinLatency?: number;
  Name?: string;
  Protocol?: Protocol;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SourceListenerAddress?: string;
  SourceListenerPort?: number;
  StreamId?: string;
  VpcInterfaceName?: string;
  WhitelistCidr?: string;
  GatewayBridgeSource?: SetGatewayBridgeSourceRequest;
  NdiSourceSettings?: NdiSourceSettings;
  SourceTags?: { [key: string]: string | undefined };
  RouterIntegrationState?: State;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption;
}
export type __listOfSetSourceRequest = SetSourceRequest[];
export interface AddFlowSourcesRequest {
  FlowArn: string;
  Sources?: SetSourceRequest[];
}
export interface InputConfiguration {
  InputIp?: string;
  InputPort?: number;
  Interface?: Interface;
}
export type __listOfInputConfiguration = InputConfiguration[];
export interface MediaStreamSourceConfiguration {
  EncodingName?: EncodingName;
  InputConfigurations?: InputConfiguration[];
  MediaStreamName?: string;
}
export type __listOfMediaStreamSourceConfiguration =
  MediaStreamSourceConfiguration[];
export interface GatewayBridgeSource {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export interface Source {
  DataTransferSubscriberFeePercent?: number;
  Decryption?: Encryption;
  Description?: string;
  EntitlementArn?: string;
  IngestIp?: string;
  IngestPort?: number;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfiguration[];
  Name?: string;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SourceArn?: string;
  Transport?: Transport;
  VpcInterfaceName?: string;
  WhitelistCidr?: string;
  GatewayBridgeSource?: GatewayBridgeSource;
  PeerIpAddress?: string;
  RouterIntegrationState?: State;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption;
  ConnectedRouterOutputArn?: string;
}
export type __listOfSource = Source[];
export interface AddFlowSourcesResponse {
  FlowArn?: string;
  Sources?: (Source & {
    Name: string;
    SourceArn: string;
    Decryption: Encryption & { RoleArn: string };
    MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
      EncodingName: EncodingName;
      MediaStreamName: string;
      InputConfigurations: (InputConfiguration & {
        InputIp: string;
        InputPort: number;
        Interface: Interface & { Name: string };
      })[];
    })[];
    Transport: Transport & { Protocol: Protocol };
    GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
  })[];
}
export type NetworkInterfaceType = "ena" | "efa" | (string & {});
export interface VpcInterfaceRequest {
  Name?: string;
  NetworkInterfaceType?: NetworkInterfaceType;
  RoleArn?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  VpcInterfaceTags?: { [key: string]: string | undefined };
}
export type __listOfVpcInterfaceRequest = VpcInterfaceRequest[];
export interface AddFlowVpcInterfacesRequest {
  FlowArn: string;
  VpcInterfaces?: VpcInterfaceRequest[];
}
export interface VpcInterface {
  Name?: string;
  NetworkInterfaceIds?: string[];
  NetworkInterfaceType?: NetworkInterfaceType;
  RoleArn?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
}
export type __listOfVpcInterface = VpcInterface[];
export interface AddFlowVpcInterfacesResponse {
  FlowArn?: string;
  VpcInterfaces?: (VpcInterface & {
    Name: string;
    NetworkInterfaceIds: __listOfString;
    NetworkInterfaceType: NetworkInterfaceType;
    RoleArn: string;
    SecurityGroupIds: __listOfString;
    SubnetId: string;
  })[];
}
export type RouterInputArn = string;
export type RouterInputArnList = string[];
export interface BatchGetRouterInputRequest {
  Arns: string[];
}
export type RouterInputState =
  | "CREATING"
  | "STANDBY"
  | "STARTING"
  | "ACTIVE"
  | "STOPPING"
  | "DELETING"
  | "UPDATING"
  | "ERROR"
  | "RECOVERING"
  | "MIGRATING"
  | (string & {});
export type RouterInputType =
  | "STANDARD"
  | "FAILOVER"
  | "MERGE"
  | "MEDIACONNECT_FLOW"
  | "MEDIALIVE_CHANNEL"
  | (string & {});
export type RouterNetworkInterfaceArn = string;
export interface RistRouterInputConfiguration {
  Port: number;
  RecoveryLatencyMilliseconds: number;
}
export interface SrtDecryptionConfiguration {
  EncryptionKey: SecretsManagerEncryptionKeyConfiguration;
}
export interface SrtListenerRouterInputConfiguration {
  Port: number;
  MinimumLatencyMilliseconds: number;
  DecryptionConfiguration?: SrtDecryptionConfiguration;
}
export interface SrtCallerRouterInputConfiguration {
  SourceAddress: string;
  SourcePort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string;
  DecryptionConfiguration?: SrtDecryptionConfiguration;
}
export type ForwardErrorCorrectionState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface RtpRouterInputConfiguration {
  Port: number;
  ForwardErrorCorrection?: ForwardErrorCorrectionState;
}
export type RouterInputProtocolConfiguration =
  | {
      Rist: RistRouterInputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener: SrtListenerRouterInputConfiguration;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterInputConfiguration;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp: RtpRouterInputConfiguration;
    };
export type RouterInputProtocol =
  | "RTP"
  | "RIST"
  | "SRT_CALLER"
  | "SRT_LISTENER"
  | (string & {});
export interface StandardRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfiguration: RouterInputProtocolConfiguration;
  Protocol?: RouterInputProtocol;
}
export type MediaLiveChannelArn = string;
export type MediaLiveChannelPipelineId =
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export type MediaLiveTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export type MediaLiveTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export interface MediaLiveTransitEncryption {
  EncryptionKeyType?: MediaLiveTransitEncryptionKeyType;
  EncryptionKeyConfiguration: MediaLiveTransitEncryptionKeyConfiguration;
}
export interface MediaLiveChannelRouterInputConfiguration {
  MediaLiveChannelArn?: string;
  MediaLivePipelineId?: MediaLiveChannelPipelineId;
  MediaLiveChannelOutputName?: string;
  SourceTransitDecryption: MediaLiveTransitEncryption;
}
export type FailoverRouterInputProtocolConfiguration =
  | {
      Rist: RistRouterInputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener: SrtListenerRouterInputConfiguration;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterInputConfiguration;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp: RtpRouterInputConfiguration;
    };
export type FailoverRouterInputProtocolConfigurationList =
  FailoverRouterInputProtocolConfiguration[];
export type FailoverInputSourcePriorityMode =
  | "NO_PRIORITY"
  | "PRIMARY_SECONDARY"
  | (string & {});
export interface FailoverRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfigurations: FailoverRouterInputProtocolConfiguration[];
  SourcePriorityMode: FailoverInputSourcePriorityMode;
  PrimarySourceIndex?: number;
}
export type FlowOutputArn = string;
export interface MediaConnectFlowRouterInputConfiguration {
  FlowArn?: string;
  FlowOutputArn?: string;
  SourceTransitDecryption: FlowTransitEncryption;
}
export type MergeRouterInputProtocolConfiguration =
  | { Rtp: RtpRouterInputConfiguration; Rist?: never }
  | { Rtp?: never; Rist: RistRouterInputConfiguration };
export type MergeRouterInputProtocolConfigurationList =
  MergeRouterInputProtocolConfiguration[];
export interface MergeRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfigurations: MergeRouterInputProtocolConfiguration[];
  MergeRecoveryWindowMilliseconds: number;
}
export type RouterInputConfiguration =
  | {
      Standard: StandardRouterInputConfiguration;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel: MediaLiveChannelRouterInputConfiguration;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover: FailoverRouterInputConfiguration;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow: MediaConnectFlowRouterInputConfiguration;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge: MergeRouterInputConfiguration;
    };
export type RouterInputTier =
  | "INPUT_100"
  | "INPUT_50"
  | "INPUT_20"
  | (string & {});
export type RoutingScope = "REGIONAL" | "GLOBAL" | (string & {});
export interface RouterInputMessage {
  Code: string;
  Message: string;
}
export type RouterInputMessages = RouterInputMessage[];
export type RouterInputTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export type RouterInputTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export interface RouterInputTransitEncryption {
  EncryptionKeyType?: RouterInputTransitEncryptionKeyType;
  EncryptionKeyConfiguration: RouterInputTransitEncryptionKeyConfiguration;
}
export interface StandardRouterInputStreamDetails {
  SourceIpAddress?: string;
}
export interface MediaLiveChannelRouterInputStreamDetails {}
export interface FailoverRouterInputIndexedStreamDetails {
  SourceIndex: number;
  SourceIpAddress?: string;
}
export interface FailoverRouterInputStreamDetails {
  SourceIndexZeroStreamDetails: FailoverRouterInputIndexedStreamDetails;
  SourceIndexOneStreamDetails: FailoverRouterInputIndexedStreamDetails;
}
export interface MediaConnectFlowRouterInputStreamDetails {}
export interface MergeRouterInputIndexedStreamDetails {
  SourceIndex: number;
  SourceIpAddress?: string;
}
export interface MergeRouterInputStreamDetails {
  SourceIndexZeroStreamDetails: MergeRouterInputIndexedStreamDetails;
  SourceIndexOneStreamDetails: MergeRouterInputIndexedStreamDetails;
}
export type RouterInputStreamDetails =
  | {
      Standard: StandardRouterInputStreamDetails;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel: MediaLiveChannelRouterInputStreamDetails;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover: FailoverRouterInputStreamDetails;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow: MediaConnectFlowRouterInputStreamDetails;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge: MergeRouterInputStreamDetails;
    };
export type MaintenanceType = "PREFERRED_DAY_TIME" | "DEFAULT" | (string & {});
export type Day =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export interface PreferredDayTimeMaintenanceConfiguration {
  Day: Day;
  Time: string;
}
export interface DefaultMaintenanceConfiguration {}
export type MaintenanceConfiguration =
  | {
      PreferredDayTime: PreferredDayTimeMaintenanceConfiguration;
      Default?: never;
    }
  | { PreferredDayTime?: never; Default: DefaultMaintenanceConfiguration };
export type MaintenanceScheduleType = "WINDOW" | (string & {});
export interface WindowMaintenanceSchedule {
  Start: Date;
  End: Date;
  ScheduledTime: Date;
}
export type MaintenanceSchedule = { Window: WindowMaintenanceSchedule };
export type RouterContentQualityAnalysisType = "CONTENT_LEVEL" | (string & {});
export type ContentQualityAnalysisState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type RouterCqaThresholdSeconds = number;
export interface BlackFramesConfiguration {
  State: ContentQualityAnalysisState;
  ThresholdSeconds: number;
}
export interface FrozenFramesConfiguration {
  State: ContentQualityAnalysisState;
  ThresholdSeconds: number;
}
export interface SilentAudioConfiguration {
  State: ContentQualityAnalysisState;
  ThresholdSeconds: number;
}
export interface ContentQualityAnalysisFeatureConfiguration {
  BlackFrames?: BlackFramesConfiguration;
  FrozenFrames?: FrozenFramesConfiguration;
  SilentAudio?: SilentAudioConfiguration;
}
export type RouterContentQualityAnalysisConfiguration = {
  ContentLevel: ContentQualityAnalysisFeatureConfiguration;
};
export interface RouterInput {
  Name: string;
  Arn: string;
  Id: string;
  State: RouterInputState;
  InputType: RouterInputType;
  Configuration: RouterInputConfiguration;
  RoutedOutputs: number;
  MaximumRoutedOutputs?: number;
  RegionName: string;
  AvailabilityZone: string;
  MaximumBitrate: number;
  Tier: RouterInputTier;
  RoutingScope: RoutingScope;
  CreatedAt: Date;
  UpdatedAt: Date;
  Messages: RouterInputMessage[];
  TransitEncryption: RouterInputTransitEncryption;
  Tags: { [key: string]: string | undefined };
  StreamDetails: RouterInputStreamDetails;
  IpAddress?: string;
  MaintenanceType: MaintenanceType;
  MaintenanceConfiguration: MaintenanceConfiguration;
  MaintenanceScheduleType?: MaintenanceScheduleType;
  MaintenanceSchedule?: MaintenanceSchedule;
  ContentQualityAnalysisType?: RouterContentQualityAnalysisType;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration;
}
export type RouterInputList = RouterInput[];
export interface BatchGetRouterInputError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export type BatchGetRouterInputErrorList = BatchGetRouterInputError_[];
export interface BatchGetRouterInputResponse {
  RouterInputs: (RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  })[];
  Errors: BatchGetRouterInputError_[];
}
export type RouterNetworkInterfaceArnList = string[];
export interface BatchGetRouterNetworkInterfaceRequest {
  Arns: string[];
}
export type RouterNetworkInterfaceState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "ERROR"
  | "RECOVERING"
  | (string & {});
export type RouterNetworkInterfaceType = "PUBLIC" | "VPC" | (string & {});
export interface PublicRouterNetworkInterfaceRule {
  Cidr: string;
}
export type NetworkInterfaceRuleList = PublicRouterNetworkInterfaceRule[];
export interface PublicRouterNetworkInterfaceConfiguration {
  AllowRules: PublicRouterNetworkInterfaceRule[];
}
export type SecurityGroupIdList = string[];
export interface VpcRouterNetworkInterfaceConfiguration {
  SecurityGroupIds: string[];
  SubnetId: string;
}
export type RouterNetworkInterfaceConfiguration =
  | { Public: PublicRouterNetworkInterfaceConfiguration; Vpc?: never }
  | { Public?: never; Vpc: VpcRouterNetworkInterfaceConfiguration };
export interface RouterNetworkInterface {
  Name: string;
  Arn: string;
  Id: string;
  State: RouterNetworkInterfaceState;
  NetworkInterfaceType: RouterNetworkInterfaceType;
  Configuration: RouterNetworkInterfaceConfiguration;
  AssociatedOutputCount: number;
  AssociatedInputCount: number;
  RegionName: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Tags: { [key: string]: string | undefined };
}
export type RouterNetworkInterfaceList = RouterNetworkInterface[];
export interface BatchGetRouterNetworkInterfaceError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export type BatchGetRouterNetworkInterfaceErrorList =
  BatchGetRouterNetworkInterfaceError_[];
export interface BatchGetRouterNetworkInterfaceResponse {
  RouterNetworkInterfaces: RouterNetworkInterface[];
  Errors: BatchGetRouterNetworkInterfaceError_[];
}
export type RouterOutputArn = string;
export type RouterOutputArnList = string[];
export interface BatchGetRouterOutputRequest {
  Arns: string[];
}
export type RouterOutputState =
  | "CREATING"
  | "STANDBY"
  | "STARTING"
  | "ACTIVE"
  | "STOPPING"
  | "DELETING"
  | "UPDATING"
  | "ERROR"
  | "RECOVERING"
  | "MIGRATING"
  | (string & {});
export type RouterOutputType =
  | "STANDARD"
  | "MEDIACONNECT_FLOW"
  | "MEDIALIVE_INPUT"
  | (string & {});
export interface RistRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
}
export interface SrtEncryptionConfiguration {
  EncryptionKey: SecretsManagerEncryptionKeyConfiguration;
}
export interface SrtListenerRouterOutputConfiguration {
  Port: number;
  MinimumLatencyMilliseconds: number;
  EncryptionConfiguration?: SrtEncryptionConfiguration;
}
export interface SrtCallerRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string;
  EncryptionConfiguration?: SrtEncryptionConfiguration;
}
export interface RtpRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  ForwardErrorCorrection?: ForwardErrorCorrectionState;
}
export type RouterOutputProtocolConfiguration =
  | {
      Rist: RistRouterOutputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener: SrtListenerRouterOutputConfiguration;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterOutputConfiguration;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp: RtpRouterOutputConfiguration;
    };
export type RouterOutputProtocol =
  | "RTP"
  | "RIST"
  | "SRT_CALLER"
  | "SRT_LISTENER"
  | (string & {});
export interface StandardRouterOutputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfiguration: RouterOutputProtocolConfiguration;
  Protocol?: RouterOutputProtocol;
}
export type FlowSourceArn = string;
export interface MediaConnectFlowRouterOutputConfiguration {
  FlowArn?: string;
  FlowSourceArn?: string;
  DestinationTransitEncryption: FlowTransitEncryption;
}
export type MediaLiveInputArn = string;
export type MediaLiveInputPipelineId =
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export interface MediaLiveInputRouterOutputConfiguration {
  MediaLiveInputArn?: string;
  MediaLivePipelineId?: MediaLiveInputPipelineId;
  DestinationTransitEncryption: MediaLiveTransitEncryption;
}
export type RouterOutputConfiguration =
  | {
      Standard: StandardRouterOutputConfiguration;
      MediaConnectFlow?: never;
      MediaLiveInput?: never;
    }
  | {
      Standard?: never;
      MediaConnectFlow: MediaConnectFlowRouterOutputConfiguration;
      MediaLiveInput?: never;
    }
  | {
      Standard?: never;
      MediaConnectFlow?: never;
      MediaLiveInput: MediaLiveInputRouterOutputConfiguration;
    };
export type RouterOutputRoutedState =
  | "ROUTED"
  | "ROUTING"
  | "UNROUTED"
  | (string & {});
export type RouterOutputTier =
  | "OUTPUT_100"
  | "OUTPUT_50"
  | "OUTPUT_20"
  | (string & {});
export interface RouterOutputMessage {
  Code: string;
  Message: string;
}
export type RouterOutputMessages = RouterOutputMessage[];
export interface StandardRouterOutputStreamDetails {
  DestinationIpAddress?: string;
}
export interface MediaConnectFlowRouterOutputStreamDetails {}
export interface MediaLiveInputRouterOutputStreamDetails {}
export type RouterOutputStreamDetails =
  | {
      Standard: StandardRouterOutputStreamDetails;
      MediaConnectFlow?: never;
      MediaLiveInput?: never;
    }
  | {
      Standard?: never;
      MediaConnectFlow: MediaConnectFlowRouterOutputStreamDetails;
      MediaLiveInput?: never;
    }
  | {
      Standard?: never;
      MediaConnectFlow?: never;
      MediaLiveInput: MediaLiveInputRouterOutputStreamDetails;
    };
export type FabricLatencyMode = "BALANCED" | "LOW_LATENCY" | (string & {});
export interface FabricConfiguration {
  RecoveryLatencyMode: FabricLatencyMode;
}
export interface RouterOutput {
  Name: string;
  Arn: string;
  Id: string;
  State: RouterOutputState;
  OutputType: RouterOutputType;
  Configuration: RouterOutputConfiguration;
  RoutedState: RouterOutputRoutedState;
  RegionName: string;
  AvailabilityZone: string;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  Tier: RouterOutputTier;
  CreatedAt: Date;
  UpdatedAt: Date;
  Messages: RouterOutputMessage[];
  Tags: { [key: string]: string | undefined };
  StreamDetails: RouterOutputStreamDetails;
  IpAddress?: string;
  RoutedInputArn?: string;
  MaintenanceType: MaintenanceType;
  MaintenanceConfiguration: MaintenanceConfiguration;
  MaintenanceScheduleType?: MaintenanceScheduleType;
  MaintenanceSchedule?: MaintenanceSchedule;
  FabricConfiguration?: FabricConfiguration;
}
export type RouterOutputList = RouterOutput[];
export interface BatchGetRouterOutputError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export type BatchGetRouterOutputErrorList = BatchGetRouterOutputError_[];
export interface BatchGetRouterOutputResponse {
  RouterOutputs: (RouterOutput & {
    FabricConfiguration: FabricConfiguration;
  })[];
  Errors: BatchGetRouterOutputError_[];
}
export interface AddEgressGatewayBridgeRequest {
  MaxBitrate?: number;
}
export interface AddIngressGatewayBridgeRequest {
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export type FailoverMode = "MERGE" | "FAILOVER" | (string & {});
export interface SourcePriority {
  PrimarySource?: string;
}
export interface FailoverConfig {
  FailoverMode?: FailoverMode;
  RecoveryWindow?: number;
  SourcePriority?: SourcePriority;
  State?: State;
}
export interface CreateBridgeRequest {
  EgressGatewayBridge?: AddEgressGatewayBridgeRequest;
  IngressGatewayBridge?: AddIngressGatewayBridgeRequest;
  Name?: string;
  Outputs?: AddBridgeOutputRequest[];
  PlacementArn?: string;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: AddBridgeSourceRequest[];
}
export interface MessageDetail {
  Code?: string;
  Message?: string;
  ResourceName?: string;
}
export type __listOfMessageDetail = MessageDetail[];
export type BridgeState =
  | "CREATING"
  | "STANDBY"
  | "STARTING"
  | "DEPLOYING"
  | "ACTIVE"
  | "STOPPING"
  | "DELETING"
  | "DELETED"
  | "START_FAILED"
  | "START_PENDING"
  | "STOP_FAILED"
  | "UPDATING"
  | (string & {});
export interface EgressGatewayBridge {
  InstanceId?: string;
  MaxBitrate?: number;
}
export interface IngressGatewayBridge {
  InstanceId?: string;
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export interface Bridge {
  BridgeArn?: string;
  BridgeMessages?: MessageDetail[];
  BridgeState?: BridgeState;
  EgressGatewayBridge?: EgressGatewayBridge;
  IngressGatewayBridge?: IngressGatewayBridge;
  Name?: string;
  Outputs?: BridgeOutput[];
  PlacementArn?: string;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: BridgeSource[];
}
export interface CreateBridgeResponse {
  Bridge?: Bridge & {
    BridgeArn: string;
    BridgeState: BridgeState;
    Name: string;
    PlacementArn: string;
    BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
    EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
    IngressGatewayBridge: IngressGatewayBridge & {
      MaxBitrate: number;
      MaxOutputs: number;
    };
    Outputs: (BridgeOutput & {
      FlowOutput: BridgeFlowOutput & {
        FlowArn: string;
        FlowSourceArn: string;
        Name: string;
      };
      NetworkOutput: BridgeNetworkOutput & {
        IpAddress: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
        Ttl: number;
      };
    })[];
    Sources: (BridgeSource & {
      FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
      NetworkSource: BridgeNetworkSource & {
        MulticastIp: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
      };
    })[];
  };
}
export type EntitlementStatus = "ENABLED" | "DISABLED" | (string & {});
export interface GrantEntitlementRequest {
  DataTransferSubscriberFeePercent?: number;
  Description?: string;
  Encryption?: Encryption;
  EntitlementStatus?: EntitlementStatus;
  Name?: string;
  Subscribers?: string[];
  EntitlementTags?: { [key: string]: string | undefined };
}
export type __listOfGrantEntitlementRequest = GrantEntitlementRequest[];
export type MaintenanceDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
  | (string & {});
export interface AddMaintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceStartHour?: string;
}
export type ThumbnailState = "ENABLED" | "DISABLED" | (string & {});
export interface SilentAudio {
  State?: State;
  ThresholdSeconds?: number;
}
export interface AudioMonitoringSetting {
  SilentAudio?: SilentAudio;
}
export type __listOfAudioMonitoringSetting = AudioMonitoringSetting[];
export interface BlackFrames {
  State?: State;
  ThresholdSeconds?: number;
}
export interface FrozenFrames {
  State?: State;
  ThresholdSeconds?: number;
}
export interface VideoMonitoringSetting {
  BlackFrames?: BlackFrames;
  FrozenFrames?: FrozenFrames;
}
export type __listOfVideoMonitoringSetting = VideoMonitoringSetting[];
export interface MonitoringConfig {
  ThumbnailState?: ThumbnailState;
  AudioMonitoringSettings?: AudioMonitoringSetting[];
  ContentQualityAnalysisState?: ContentQualityAnalysisState;
  VideoMonitoringSettings?: VideoMonitoringSetting[];
}
export type FlowSize = "MEDIUM" | "LARGE" | "LARGE_4X" | (string & {});
export type NdiState = "ENABLED" | "DISABLED" | (string & {});
export interface NdiDiscoveryServerConfig {
  DiscoveryServerAddress?: string;
  DiscoveryServerPort?: number;
  VpcInterfaceAdapter?: string;
}
export type __listOfNdiDiscoveryServerConfig = NdiDiscoveryServerConfig[];
export interface NdiConfig {
  NdiState?: NdiState;
  MachineName?: string;
  NdiDiscoveryServers?: NdiDiscoveryServerConfig[];
}
export type EncodingProfile =
  | "DISTRIBUTION_H264_DEFAULT"
  | "CONTRIBUTION_H264_DEFAULT"
  | (string & {});
export interface EncodingConfig {
  EncodingProfile?: EncodingProfile;
  VideoMaxBitrate?: number;
}
export interface CreateFlowRequest {
  AvailabilityZone?: string;
  Entitlements?: GrantEntitlementRequest[];
  MediaStreams?: AddMediaStreamRequest[];
  Name?: string;
  Outputs?: AddOutputRequest[];
  Source?: SetSourceRequest;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: SetSourceRequest[];
  VpcInterfaces?: VpcInterfaceRequest[];
  Maintenance?: AddMaintenance;
  SourceMonitoringConfig?: MonitoringConfig;
  FlowSize?: FlowSize;
  NdiConfig?: NdiConfig;
  EncodingConfig?: EncodingConfig;
  FlowTags?: { [key: string]: string | undefined };
}
export interface Entitlement {
  DataTransferSubscriberFeePercent?: number;
  Description?: string;
  Encryption?: Encryption;
  EntitlementArn?: string;
  EntitlementStatus?: EntitlementStatus;
  Name?: string;
  Subscribers?: string[];
}
export type __listOfEntitlement = Entitlement[];
export type Status =
  | "STANDBY"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "STARTING"
  | "STOPPING"
  | "ERROR"
  | (string & {});
export interface Maintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceDeadline?: string;
  MaintenanceScheduledDate?: string;
  MaintenanceStartHour?: string;
}
export interface Flow {
  AvailabilityZone?: string;
  Description?: string;
  EgressIp?: string;
  Entitlements?: Entitlement[];
  FlowArn?: string;
  MediaStreams?: MediaStream[];
  Name?: string;
  Outputs?: Output[];
  Source?: Source;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: Source[];
  Status?: Status;
  VpcInterfaces?: VpcInterface[];
  Maintenance?: Maintenance;
  SourceMonitoringConfig?: MonitoringConfig;
  FlowSize?: FlowSize;
  NdiConfig?: NdiConfig;
  EncodingConfig?: EncodingConfig;
}
export interface CreateFlowResponse {
  Flow?: Flow & {
    AvailabilityZone: string;
    Entitlements: (Entitlement & {
      EntitlementArn: string;
      Name: string;
      Subscribers: __listOfString;
      Encryption: Encryption & { RoleArn: string };
    })[];
    FlowArn: string;
    Name: string;
    Outputs: (Output & {
      Name: string;
      OutputArn: string;
      Encryption: Encryption & { RoleArn: string };
      MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        DestinationConfigurations: (DestinationConfiguration & {
          DestinationIp: string;
          DestinationPort: number;
          Interface: Interface & { Name: string };
          OutboundIp: string;
        })[];
        EncodingParameters: EncodingParameters & {
          CompressionFactor: number;
          EncoderProfile: EncoderProfile;
        };
      })[];
      Transport: Transport & { Protocol: Protocol };
    })[];
    Source: Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    };
    Status: Status;
    MediaStreams: (MediaStream & {
      Fmt: number;
      MediaStreamId: number;
      MediaStreamName: string;
      MediaStreamType: MediaStreamType;
      Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
    })[];
    Sources: (Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    })[];
    VpcInterfaces: (VpcInterface & {
      Name: string;
      NetworkInterfaceIds: __listOfString;
      NetworkInterfaceType: NetworkInterfaceType;
      RoleArn: string;
      SecurityGroupIds: __listOfString;
      SubnetId: string;
    })[];
    NdiConfig: NdiConfig & {
      NdiDiscoveryServers: (NdiDiscoveryServerConfig & {
        DiscoveryServerAddress: string;
        VpcInterfaceAdapter: string;
      })[];
    };
  };
}
export interface GatewayNetwork {
  CidrBlock?: string;
  Name?: string;
}
export type __listOfGatewayNetwork = GatewayNetwork[];
export interface CreateGatewayRequest {
  EgressCidrBlocks?: string[];
  Name?: string;
  Networks?: GatewayNetwork[];
}
export type GatewayState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "ERROR"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface Gateway {
  EgressCidrBlocks?: string[];
  GatewayArn?: string;
  GatewayMessages?: MessageDetail[];
  GatewayState?: GatewayState;
  Name?: string;
  Networks?: GatewayNetwork[];
}
export interface CreateGatewayResponse {
  Gateway?: Gateway & {
    EgressCidrBlocks: __listOfString;
    GatewayArn: string;
    Name: string;
    Networks: (GatewayNetwork & { CidrBlock: string; Name: string })[];
    GatewayMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export type ClientToken = string;
export interface CreateRouterInputRequest {
  Name: string;
  Configuration: RouterInputConfiguration;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  Tier: RouterInputTier;
  RegionName?: string;
  AvailabilityZone?: string;
  TransitEncryption?: RouterInputTransitEncryption;
  MaintenanceConfiguration?: MaintenanceConfiguration;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration;
}
export interface CreateRouterInputResponse {
  RouterInput: RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  };
}
export interface CreateRouterNetworkInterfaceRequest {
  Name: string;
  Configuration: RouterNetworkInterfaceConfiguration;
  RegionName?: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export interface CreateRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export interface CreateRouterOutputRequest {
  Name: string;
  Configuration: RouterOutputConfiguration;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  Tier: RouterOutputTier;
  RegionName?: string;
  AvailabilityZone?: string;
  MaintenanceConfiguration?: MaintenanceConfiguration;
  Tags?: { [key: string]: string | undefined };
  FabricConfiguration?: FabricConfiguration;
  ClientToken?: string;
}
export interface CreateRouterOutputResponse {
  RouterOutput: RouterOutput & { FabricConfiguration: FabricConfiguration };
}
export interface DeleteBridgeRequest {
  BridgeArn: string;
}
export interface DeleteBridgeResponse {
  BridgeArn?: string;
}
export interface DeleteFlowRequest {
  FlowArn: string;
}
export interface DeleteFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export type GatewayArn = string;
export interface DeleteGatewayRequest {
  GatewayArn: string;
}
export interface DeleteGatewayResponse {
  GatewayArn?: string;
}
export interface DeleteRouterInputRequest {
  Arn: string;
}
export interface DeleteRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export interface DeleteRouterNetworkInterfaceRequest {
  Arn: string;
}
export interface DeleteRouterNetworkInterfaceResponse {
  Arn: string;
  Name: string;
  State: RouterNetworkInterfaceState;
}
export interface DeleteRouterOutputRequest {
  Arn: string;
}
export interface DeleteRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export type GatewayInstanceArn = string;
export interface DeregisterGatewayInstanceRequest {
  Force?: boolean;
  GatewayInstanceArn: string;
}
export type InstanceState =
  | "REGISTERING"
  | "ACTIVE"
  | "DEREGISTERING"
  | "DEREGISTERED"
  | "REGISTRATION_ERROR"
  | "DEREGISTRATION_ERROR"
  | (string & {});
export interface DeregisterGatewayInstanceResponse {
  GatewayInstanceArn?: string;
  InstanceState?: InstanceState;
}
export interface DescribeBridgeRequest {
  BridgeArn: string;
}
export interface DescribeBridgeResponse {
  Bridge?: Bridge & {
    BridgeArn: string;
    BridgeState: BridgeState;
    Name: string;
    PlacementArn: string;
    BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
    EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
    IngressGatewayBridge: IngressGatewayBridge & {
      MaxBitrate: number;
      MaxOutputs: number;
    };
    Outputs: (BridgeOutput & {
      FlowOutput: BridgeFlowOutput & {
        FlowArn: string;
        FlowSourceArn: string;
        Name: string;
      };
      NetworkOutput: BridgeNetworkOutput & {
        IpAddress: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
        Ttl: number;
      };
    })[];
    Sources: (BridgeSource & {
      FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
      NetworkSource: BridgeNetworkSource & {
        MulticastIp: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
      };
    })[];
  };
}
export interface DescribeFlowRequest {
  FlowArn: string;
}
export interface Messages {
  Errors?: string[];
}
export interface DescribeFlowResponse {
  Flow?: Flow & {
    AvailabilityZone: string;
    Entitlements: (Entitlement & {
      EntitlementArn: string;
      Name: string;
      Subscribers: __listOfString;
      Encryption: Encryption & { RoleArn: string };
    })[];
    FlowArn: string;
    Name: string;
    Outputs: (Output & {
      Name: string;
      OutputArn: string;
      Encryption: Encryption & { RoleArn: string };
      MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        DestinationConfigurations: (DestinationConfiguration & {
          DestinationIp: string;
          DestinationPort: number;
          Interface: Interface & { Name: string };
          OutboundIp: string;
        })[];
        EncodingParameters: EncodingParameters & {
          CompressionFactor: number;
          EncoderProfile: EncoderProfile;
        };
      })[];
      Transport: Transport & { Protocol: Protocol };
    })[];
    Source: Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    };
    Status: Status;
    MediaStreams: (MediaStream & {
      Fmt: number;
      MediaStreamId: number;
      MediaStreamName: string;
      MediaStreamType: MediaStreamType;
      Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
    })[];
    Sources: (Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    })[];
    VpcInterfaces: (VpcInterface & {
      Name: string;
      NetworkInterfaceIds: __listOfString;
      NetworkInterfaceType: NetworkInterfaceType;
      RoleArn: string;
      SecurityGroupIds: __listOfString;
      SubnetId: string;
    })[];
    NdiConfig: NdiConfig & {
      NdiDiscoveryServers: (NdiDiscoveryServerConfig & {
        DiscoveryServerAddress: string;
        VpcInterfaceAdapter: string;
      })[];
    };
  };
  Messages?: Messages & { Errors: __listOfString };
}
export interface DescribeFlowSourceMetadataRequest {
  FlowArn: string;
}
export interface FrameResolution {
  FrameHeight?: number;
  FrameWidth?: number;
}
export interface TransportStream {
  Channels?: number;
  Codec?: string;
  FrameRate?: string;
  FrameResolution?: FrameResolution;
  Pid?: number;
  SampleRate?: number;
  SampleSize?: number;
  StreamType?: string;
}
export type __listOfTransportStream = TransportStream[];
export interface TransportStreamProgram {
  PcrPid?: number;
  ProgramName?: string;
  ProgramNumber?: number;
  ProgramPid?: number;
  Streams?: TransportStream[];
}
export type __listOfTransportStreamProgram = TransportStreamProgram[];
export interface TransportMediaInfo {
  Programs?: TransportStreamProgram[];
}
export interface NdiSourceInfo {
  SourceName?: string;
}
export type __listOfNdiSourceInfo = NdiSourceInfo[];
export interface NdiMediaStreamInfo {
  StreamType?: string;
  Codec?: string;
  StreamId?: number;
  ScanMode?: ScanMode;
  FrameResolution?: FrameResolution;
  FrameRate?: string;
  Channels?: number;
  SampleRate?: number;
}
export type __listOfNdiMediaStreamInfo = NdiMediaStreamInfo[];
export interface NdiMediaInfo {
  Streams?: NdiMediaStreamInfo[];
}
export interface NdiSourceMetadataInfo {
  ActiveSource?: NdiSourceInfo;
  DiscoveredSources?: NdiSourceInfo[];
  MediaInfo?: NdiMediaInfo;
  Messages?: MessageDetail[];
}
export interface DescribeFlowSourceMetadataResponse {
  FlowArn?: string;
  Messages?: (MessageDetail & { Code: string; Message: string })[];
  Timestamp?: Date;
  TransportMediaInfo?: TransportMediaInfo & {
    Programs: (TransportStreamProgram & {
      PcrPid: number;
      ProgramNumber: number;
      ProgramPid: number;
      Streams: (TransportStream & {
        Pid: number;
        StreamType: string;
        FrameResolution: FrameResolution & {
          FrameHeight: number;
          FrameWidth: number;
        };
      })[];
    })[];
  };
  NdiInfo?: NdiSourceMetadataInfo & {
    DiscoveredSources: (NdiSourceInfo & { SourceName: string })[];
    MediaInfo: NdiMediaInfo & {
      Streams: (NdiMediaStreamInfo & {
        StreamType: string;
        Codec: string;
        StreamId: number;
        FrameResolution: FrameResolution & {
          FrameHeight: number;
          FrameWidth: number;
        };
      })[];
    };
    Messages: (MessageDetail & { Code: string; Message: string })[];
    ActiveSource: NdiSourceInfo & { SourceName: string };
  };
}
export interface DescribeFlowSourceThumbnailRequest {
  FlowArn: string;
}
export interface ThumbnailDetails {
  FlowArn?: string;
  Thumbnail?: string;
  ThumbnailMessages?: MessageDetail[];
  Timecode?: string;
  Timestamp?: Date;
}
export interface DescribeFlowSourceThumbnailResponse {
  ThumbnailDetails?: ThumbnailDetails & {
    FlowArn: string;
    ThumbnailMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export interface DescribeGatewayRequest {
  GatewayArn: string;
}
export interface DescribeGatewayResponse {
  Gateway?: Gateway & {
    EgressCidrBlocks: __listOfString;
    GatewayArn: string;
    Name: string;
    Networks: (GatewayNetwork & { CidrBlock: string; Name: string })[];
    GatewayMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export interface DescribeGatewayInstanceRequest {
  GatewayInstanceArn: string;
}
export type BridgePlacement = "AVAILABLE" | "LOCKED" | (string & {});
export type ConnectionStatus = "CONNECTED" | "DISCONNECTED" | (string & {});
export interface GatewayInstance {
  BridgePlacement?: BridgePlacement;
  ConnectionStatus?: ConnectionStatus;
  GatewayArn?: string;
  GatewayInstanceArn?: string;
  InstanceId?: string;
  InstanceMessages?: MessageDetail[];
  InstanceState?: InstanceState;
  RunningBridgeCount?: number;
}
export interface DescribeGatewayInstanceResponse {
  GatewayInstance?: GatewayInstance & {
    BridgePlacement: BridgePlacement;
    ConnectionStatus: ConnectionStatus;
    GatewayArn: string;
    GatewayInstanceArn: string;
    InstanceId: string;
    InstanceState: InstanceState;
    RunningBridgeCount: number;
    InstanceMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export type OfferingArn = string;
export interface DescribeOfferingRequest {
  OfferingArn: string;
}
export type DurationUnits = "MONTHS" | (string & {});
export type PriceUnits = "HOURLY" | (string & {});
export type ResourceType = "Mbps_Outbound_Bandwidth" | (string & {});
export interface ResourceSpecification {
  ReservedBitrate?: number;
  ResourceType?: ResourceType;
}
export interface Offering {
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: DurationUnits;
  OfferingArn?: string;
  OfferingDescription?: string;
  PricePerUnit?: string;
  PriceUnits?: PriceUnits;
  ResourceSpecification?: ResourceSpecification;
}
export interface DescribeOfferingResponse {
  Offering?: Offering & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
  };
}
export type ReservationArn = string;
export interface DescribeReservationRequest {
  ReservationArn: string;
}
export type ReservationState =
  | "ACTIVE"
  | "EXPIRED"
  | "PROCESSING"
  | "CANCELED"
  | (string & {});
export interface Reservation {
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: DurationUnits;
  End?: string;
  OfferingArn?: string;
  OfferingDescription?: string;
  PricePerUnit?: string;
  PriceUnits?: PriceUnits;
  ReservationArn?: string;
  ReservationName?: string;
  ReservationState?: ReservationState;
  ResourceSpecification?: ResourceSpecification;
  Start?: string;
}
export interface DescribeReservationResponse {
  Reservation?: Reservation & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    End: string;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ReservationArn: string;
    ReservationName: string;
    ReservationState: ReservationState;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
    Start: string;
  };
}
export interface GetRouterInputRequest {
  Arn: string;
}
export interface GetRouterInputResponse {
  RouterInput: RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  };
}
export interface GetRouterInputSourceMetadataRequest {
  Arn: string;
}
export type RouterInputMetadata = {
  TransportStreamMediaInfo: TransportMediaInfo;
};
export interface RouterInputSourceMetadataDetails {
  SourceMetadataMessages: RouterInputMessage[];
  Timestamp: Date;
  RouterInputMetadata?: RouterInputMetadata;
}
export interface GetRouterInputSourceMetadataResponse {
  Arn: string;
  Name: string;
  SourceMetadataDetails: RouterInputSourceMetadataDetails;
}
export interface GetRouterInputThumbnailRequest {
  Arn: string;
}
export interface RouterInputThumbnailDetails {
  ThumbnailMessages: RouterInputMessage[];
  Thumbnail?: Uint8Array;
  Timecode?: string;
  Timestamp?: Date;
}
export interface GetRouterInputThumbnailResponse {
  Arn: string;
  Name: string;
  ThumbnailDetails: RouterInputThumbnailDetails;
}
export interface GetRouterNetworkInterfaceRequest {
  Arn: string;
}
export interface GetRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export interface GetRouterOutputRequest {
  Arn: string;
}
export interface GetRouterOutputResponse {
  RouterOutput: RouterOutput & { FabricConfiguration: FabricConfiguration };
}
export interface GrantFlowEntitlementsRequest {
  Entitlements?: GrantEntitlementRequest[];
  FlowArn: string;
}
export interface GrantFlowEntitlementsResponse {
  Entitlements?: (Entitlement & {
    EntitlementArn: string;
    Name: string;
    Subscribers: __listOfString;
    Encryption: Encryption & { RoleArn: string };
  })[];
  FlowArn?: string;
}
export type MaxResults = number;
export interface ListBridgesRequest {
  FilterArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedBridge {
  BridgeArn?: string;
  BridgeState?: BridgeState;
  BridgeType?: string;
  Name?: string;
  PlacementArn?: string;
}
export type __listOfListedBridge = ListedBridge[];
export interface ListBridgesResponse {
  Bridges?: (ListedBridge & {
    BridgeArn: string;
    BridgeState: BridgeState;
    BridgeType: string;
    Name: string;
    PlacementArn: string;
  })[];
  NextToken?: string;
}
export interface ListEntitlementsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedEntitlement {
  DataTransferSubscriberFeePercent?: number;
  EntitlementArn?: string;
  EntitlementName?: string;
}
export type __listOfListedEntitlement = ListedEntitlement[];
export interface ListEntitlementsResponse {
  Entitlements?: (ListedEntitlement & {
    EntitlementArn: string;
    EntitlementName: string;
  })[];
  NextToken?: string;
}
export interface ListFlowsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type SourceType = "OWNED" | "ENTITLED" | (string & {});
export interface ListedFlow {
  AvailabilityZone?: string;
  Description?: string;
  FlowArn?: string;
  Name?: string;
  SourceType?: SourceType;
  Status?: Status;
  Maintenance?: Maintenance;
}
export type __listOfListedFlow = ListedFlow[];
export interface ListFlowsResponse {
  Flows?: (ListedFlow & {
    AvailabilityZone: string;
    Description: string;
    FlowArn: string;
    Name: string;
    SourceType: SourceType;
    Status: Status;
  })[];
  NextToken?: string;
}
export interface ListGatewayInstancesRequest {
  FilterArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedGatewayInstance {
  GatewayArn?: string;
  GatewayInstanceArn?: string;
  InstanceId?: string;
  InstanceState?: InstanceState;
}
export type __listOfListedGatewayInstance = ListedGatewayInstance[];
export interface ListGatewayInstancesResponse {
  Instances?: (ListedGatewayInstance & {
    GatewayArn: string;
    GatewayInstanceArn: string;
    InstanceId: string;
  })[];
  NextToken?: string;
}
export interface ListGatewaysRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedGateway {
  GatewayArn?: string;
  GatewayState?: GatewayState;
  Name?: string;
}
export type __listOfListedGateway = ListedGateway[];
export interface ListGatewaysResponse {
  Gateways?: (ListedGateway & {
    GatewayArn: string;
    GatewayState: GatewayState;
    Name: string;
  })[];
  NextToken?: string;
}
export interface ListOfferingsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfOffering = Offering[];
export interface ListOfferingsResponse {
  NextToken?: string;
  Offerings?: (Offering & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
  })[];
}
export interface ListReservationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfReservation = Reservation[];
export interface ListReservationsResponse {
  NextToken?: string;
  Reservations?: (Reservation & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    End: string;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ReservationArn: string;
    ReservationName: string;
    ReservationState: ReservationState;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
    Start: string;
  })[];
}
export type StringList = string[];
export type RoutingScopeList = RoutingScope[];
export type RouterInputTypeList = RouterInputType[];
export type RouterInputFilter =
  | {
      NameContains: string[];
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      InputTypes?: never;
    }
  | {
      NameContains?: never;
      RegionNames: string[];
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      InputTypes?: never;
    }
  | {
      NameContains?: never;
      RegionNames?: never;
      NetworkInterfaceArns: string[];
      RoutingScopes?: never;
      InputTypes?: never;
    }
  | {
      NameContains?: never;
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes: RoutingScope[];
      InputTypes?: never;
    }
  | {
      NameContains?: never;
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      InputTypes: RouterInputType[];
    };
export type RouterInputFilterList = RouterInputFilter[];
export interface ListRouterInputsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterInputFilter[];
}
export interface ListedRouterInput {
  Name: string;
  Arn: string;
  Id: string;
  InputType: RouterInputType;
  State: RouterInputState;
  RoutedOutputs: number;
  RegionName: string;
  AvailabilityZone: string;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  CreatedAt: Date;
  UpdatedAt: Date;
  MessageCount: number;
  NetworkInterfaceArn?: string;
  MaintenanceScheduleType?: MaintenanceScheduleType;
  MaintenanceSchedule?: MaintenanceSchedule;
}
export type ListedRouterInputList = ListedRouterInput[];
export interface ListRouterInputsResponse {
  RouterInputs: ListedRouterInput[];
  NextToken?: string;
}
export type RouterNetworkInterfaceTypeList = RouterNetworkInterfaceType[];
export type RouterNetworkInterfaceFilter =
  | {
      RegionNames: string[];
      NetworkInterfaceTypes?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceTypes: RouterNetworkInterfaceType[];
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceTypes?: never;
      NameContains: string[];
    };
export type RouterNetworkInterfaceFilterList = RouterNetworkInterfaceFilter[];
export interface ListRouterNetworkInterfacesRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterNetworkInterfaceFilter[];
}
export interface ListedRouterNetworkInterface {
  Name: string;
  Arn: string;
  Id: string;
  NetworkInterfaceType: RouterNetworkInterfaceType;
  AssociatedOutputCount: number;
  AssociatedInputCount: number;
  State: RouterNetworkInterfaceState;
  RegionName: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export type ListedRouterNetworkInterfaceList = ListedRouterNetworkInterface[];
export interface ListRouterNetworkInterfacesResponse {
  RouterNetworkInterfaces: ListedRouterNetworkInterface[];
  NextToken?: string;
}
export type RouterOutputTypeList = RouterOutputType[];
export type RouterOutputFilter =
  | {
      RegionNames: string[];
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      OutputTypes?: never;
      RoutedInputArns?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns: string[];
      RoutingScopes?: never;
      OutputTypes?: never;
      RoutedInputArns?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes: RoutingScope[];
      OutputTypes?: never;
      RoutedInputArns?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      OutputTypes: RouterOutputType[];
      RoutedInputArns?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      OutputTypes?: never;
      RoutedInputArns: string[];
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      OutputTypes?: never;
      RoutedInputArns?: never;
      NameContains: string[];
    };
export type RouterOutputFilterList = RouterOutputFilter[];
export interface ListRouterOutputsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterOutputFilter[];
}
export interface ListedRouterOutput {
  Name: string;
  Arn: string;
  Id: string;
  OutputType: RouterOutputType;
  State: RouterOutputState;
  RoutedState: RouterOutputRoutedState;
  RegionName: string;
  AvailabilityZone: string;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  CreatedAt: Date;
  UpdatedAt: Date;
  MessageCount: number;
  RoutedInputArn?: string;
  NetworkInterfaceArn?: string;
  MaintenanceScheduleType?: MaintenanceScheduleType;
  MaintenanceSchedule?: MaintenanceSchedule;
}
export type ListedRouterOutputList = ListedRouterOutput[];
export interface ListRouterOutputsResponse {
  RouterOutputs: ListedRouterOutput[];
  NextToken?: string;
}
export interface ListTagsForGlobalResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForGlobalResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface PurchaseOfferingRequest {
  OfferingArn: string;
  ReservationName?: string;
  Start?: string;
}
export interface PurchaseOfferingResponse {
  Reservation?: Reservation & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    End: string;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ReservationArn: string;
    ReservationName: string;
    ReservationState: ReservationState;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
    Start: string;
  };
}
export interface RemoveBridgeOutputRequest {
  BridgeArn: string;
  OutputName: string;
}
export interface RemoveBridgeOutputResponse {
  BridgeArn?: string;
  OutputName?: string;
}
export interface RemoveBridgeSourceRequest {
  BridgeArn: string;
  SourceName: string;
}
export interface RemoveBridgeSourceResponse {
  BridgeArn?: string;
  SourceName?: string;
}
export interface RemoveFlowMediaStreamRequest {
  FlowArn: string;
  MediaStreamName: string;
}
export interface RemoveFlowMediaStreamResponse {
  FlowArn?: string;
  MediaStreamName?: string;
}
export interface RemoveFlowOutputRequest {
  FlowArn: string;
  OutputArn: string;
}
export interface RemoveFlowOutputResponse {
  FlowArn?: string;
  OutputArn?: string;
}
export interface RemoveFlowSourceRequest {
  FlowArn: string;
  SourceArn: string;
}
export interface RemoveFlowSourceResponse {
  FlowArn?: string;
  SourceArn?: string;
}
export interface RemoveFlowVpcInterfaceRequest {
  FlowArn: string;
  VpcInterfaceName: string;
}
export interface RemoveFlowVpcInterfaceResponse {
  FlowArn?: string;
  NonDeletedNetworkInterfaceIds?: string[];
  VpcInterfaceName?: string;
}
export interface RestartRouterInputRequest {
  Arn: string;
}
export interface RestartRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export interface RestartRouterOutputRequest {
  Arn: string;
}
export interface RestartRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export interface RevokeFlowEntitlementRequest {
  EntitlementArn: string;
  FlowArn: string;
}
export interface RevokeFlowEntitlementResponse {
  EntitlementArn?: string;
  FlowArn?: string;
}
export interface StartFlowRequest {
  FlowArn: string;
}
export interface StartFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export interface StartRouterInputRequest {
  Arn: string;
}
export interface StartRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
  MaintenanceScheduleType: MaintenanceScheduleType;
  MaintenanceSchedule: MaintenanceSchedule;
}
export interface StartRouterOutputRequest {
  Arn: string;
}
export interface StartRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
  MaintenanceScheduleType: MaintenanceScheduleType;
  MaintenanceSchedule: MaintenanceSchedule;
}
export interface StopFlowRequest {
  FlowArn: string;
}
export interface StopFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export interface StopRouterInputRequest {
  Arn: string;
}
export interface StopRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export interface StopRouterOutputRequest {
  Arn: string;
}
export interface StopRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export interface TagGlobalResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagGlobalResourceResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TakeRouterInputRequest {
  RouterOutputArn: string;
  RouterInputArn?: string;
}
export interface TakeRouterInputResponse {
  RoutedState: RouterOutputRoutedState;
  RouterOutputArn: string;
  RouterOutputName: string;
  RouterInputArn?: string;
  RouterInputName?: string;
}
export interface UntagGlobalResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagGlobalResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateEgressGatewayBridgeRequest {
  MaxBitrate?: number;
}
export interface UpdateIngressGatewayBridgeRequest {
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export interface UpdateFailoverConfig {
  FailoverMode?: FailoverMode;
  RecoveryWindow?: number;
  SourcePriority?: SourcePriority;
  State?: State;
}
export interface UpdateBridgeRequest {
  BridgeArn: string;
  EgressGatewayBridge?: UpdateEgressGatewayBridgeRequest;
  IngressGatewayBridge?: UpdateIngressGatewayBridgeRequest;
  SourceFailoverConfig?: UpdateFailoverConfig;
}
export interface UpdateBridgeResponse {
  Bridge?: Bridge & {
    BridgeArn: string;
    BridgeState: BridgeState;
    Name: string;
    PlacementArn: string;
    BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
    EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
    IngressGatewayBridge: IngressGatewayBridge & {
      MaxBitrate: number;
      MaxOutputs: number;
    };
    Outputs: (BridgeOutput & {
      FlowOutput: BridgeFlowOutput & {
        FlowArn: string;
        FlowSourceArn: string;
        Name: string;
      };
      NetworkOutput: BridgeNetworkOutput & {
        IpAddress: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
        Ttl: number;
      };
    })[];
    Sources: (BridgeSource & {
      FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
      NetworkSource: BridgeNetworkSource & {
        MulticastIp: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
      };
    })[];
  };
}
export interface UpdateBridgeNetworkOutputRequest {
  IpAddress?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export interface UpdateBridgeOutputRequest {
  BridgeArn: string;
  NetworkOutput?: UpdateBridgeNetworkOutputRequest;
  OutputName: string;
}
export interface UpdateBridgeOutputResponse {
  BridgeArn?: string;
  Output?: BridgeOutput & {
    FlowOutput: BridgeFlowOutput & {
      FlowArn: string;
      FlowSourceArn: string;
      Name: string;
    };
    NetworkOutput: BridgeNetworkOutput & {
      IpAddress: string;
      Name: string;
      NetworkName: string;
      Port: number;
      Protocol: Protocol;
      Ttl: number;
    };
  };
}
export interface UpdateBridgeFlowSourceRequest {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export interface UpdateBridgeNetworkSourceRequest {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export interface UpdateBridgeSourceRequest {
  BridgeArn: string;
  FlowSource?: UpdateBridgeFlowSourceRequest;
  NetworkSource?: UpdateBridgeNetworkSourceRequest;
  SourceName: string;
}
export interface UpdateBridgeSourceResponse {
  BridgeArn?: string;
  Source?: BridgeSource & {
    FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
    NetworkSource: BridgeNetworkSource & {
      MulticastIp: string;
      Name: string;
      NetworkName: string;
      Port: number;
      Protocol: Protocol;
    };
  };
}
export type DesiredState = "ACTIVE" | "STANDBY" | "DELETED" | (string & {});
export interface UpdateBridgeStateRequest {
  BridgeArn: string;
  DesiredState?: DesiredState;
}
export interface UpdateBridgeStateResponse {
  BridgeArn?: string;
  DesiredState?: DesiredState;
}
export interface UpdateMaintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceScheduledDate?: string;
  MaintenanceStartHour?: string;
}
export interface UpdateFlowRequest {
  FlowArn: string;
  SourceFailoverConfig?: UpdateFailoverConfig;
  Maintenance?: UpdateMaintenance;
  SourceMonitoringConfig?: MonitoringConfig;
  NdiConfig?: NdiConfig;
  FlowSize?: FlowSize;
  EncodingConfig?: EncodingConfig;
}
export interface UpdateFlowResponse {
  Flow?: Flow & {
    AvailabilityZone: string;
    Entitlements: (Entitlement & {
      EntitlementArn: string;
      Name: string;
      Subscribers: __listOfString;
      Encryption: Encryption & { RoleArn: string };
    })[];
    FlowArn: string;
    Name: string;
    Outputs: (Output & {
      Name: string;
      OutputArn: string;
      Encryption: Encryption & { RoleArn: string };
      MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        DestinationConfigurations: (DestinationConfiguration & {
          DestinationIp: string;
          DestinationPort: number;
          Interface: Interface & { Name: string };
          OutboundIp: string;
        })[];
        EncodingParameters: EncodingParameters & {
          CompressionFactor: number;
          EncoderProfile: EncoderProfile;
        };
      })[];
      Transport: Transport & { Protocol: Protocol };
    })[];
    Source: Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    };
    Status: Status;
    MediaStreams: (MediaStream & {
      Fmt: number;
      MediaStreamId: number;
      MediaStreamName: string;
      MediaStreamType: MediaStreamType;
      Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
    })[];
    Sources: (Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    })[];
    VpcInterfaces: (VpcInterface & {
      Name: string;
      NetworkInterfaceIds: __listOfString;
      NetworkInterfaceType: NetworkInterfaceType;
      RoleArn: string;
      SecurityGroupIds: __listOfString;
      SubnetId: string;
    })[];
    NdiConfig: NdiConfig & {
      NdiDiscoveryServers: (NdiDiscoveryServerConfig & {
        DiscoveryServerAddress: string;
        VpcInterfaceAdapter: string;
      })[];
    };
  };
}
export interface UpdateEncryption {
  Algorithm?: Algorithm;
  ConstantInitializationVector?: string;
  DeviceId?: string;
  KeyType?: KeyType;
  Region?: string;
  ResourceId?: string;
  RoleArn?: string;
  SecretArn?: string;
  Url?: string;
}
export interface UpdateFlowEntitlementRequest {
  Description?: string;
  Encryption?: UpdateEncryption;
  EntitlementArn: string;
  EntitlementStatus?: EntitlementStatus;
  FlowArn: string;
  Subscribers?: string[];
}
export interface UpdateFlowEntitlementResponse {
  Entitlement?: Entitlement & {
    EntitlementArn: string;
    Name: string;
    Subscribers: __listOfString;
    Encryption: Encryption & { RoleArn: string };
  };
  FlowArn?: string;
}
export interface UpdateFlowMediaStreamRequest {
  Attributes?: MediaStreamAttributesRequest;
  ClockRate?: number;
  Description?: string;
  FlowArn: string;
  MediaStreamName: string;
  MediaStreamType?: MediaStreamType;
  VideoFormat?: string;
}
export interface UpdateFlowMediaStreamResponse {
  FlowArn?: string;
  MediaStream?: MediaStream & {
    Fmt: number;
    MediaStreamId: number;
    MediaStreamName: string;
    MediaStreamType: MediaStreamType;
    Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
  };
}
export interface UpdateFlowOutputRequest {
  CidrAllowList?: string[];
  Description?: string;
  Destination?: string;
  Encryption?: UpdateEncryption;
  FlowArn: string;
  MaxLatency?: number;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfigurationRequest[];
  MinLatency?: number;
  OutputArn: string;
  Port?: number;
  Protocol?: Protocol;
  RemoteId?: string;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SmoothingLatency?: number;
  StreamId?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
  OutputStatus?: OutputStatus;
  NdiProgramName?: string;
  NdiSpeedHqQuality?: number;
  RouterIntegrationState?: State;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource;
}
export interface UpdateFlowOutputResponse {
  FlowArn?: string;
  Output?: Output & {
    Name: string;
    OutputArn: string;
    Encryption: Encryption & { RoleArn: string };
    MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
      EncodingName: EncodingName;
      MediaStreamName: string;
      DestinationConfigurations: (DestinationConfiguration & {
        DestinationIp: string;
        DestinationPort: number;
        Interface: Interface & { Name: string };
        OutboundIp: string;
      })[];
      EncodingParameters: EncodingParameters & {
        CompressionFactor: number;
        EncoderProfile: EncoderProfile;
      };
    })[];
    Transport: Transport & { Protocol: Protocol };
  };
}
export interface UpdateGatewayBridgeSourceRequest {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export interface UpdateFlowSourceRequest {
  Decryption?: UpdateEncryption;
  Description?: string;
  EntitlementArn?: string;
  FlowArn: string;
  IngestPort?: number;
  MaxBitrate?: number;
  MaxLatency?: number;
  MaxSyncBuffer?: number;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfigurationRequest[];
  MinLatency?: number;
  Protocol?: Protocol;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SourceArn: string;
  SourceListenerAddress?: string;
  SourceListenerPort?: number;
  StreamId?: string;
  VpcInterfaceName?: string;
  WhitelistCidr?: string;
  GatewayBridgeSource?: UpdateGatewayBridgeSourceRequest;
  NdiSourceSettings?: NdiSourceSettings;
  RouterIntegrationState?: State;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption;
}
export interface UpdateFlowSourceResponse {
  FlowArn?: string;
  Source?: Source & {
    Name: string;
    SourceArn: string;
    Decryption: Encryption & { RoleArn: string };
    MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
      EncodingName: EncodingName;
      MediaStreamName: string;
      InputConfigurations: (InputConfiguration & {
        InputIp: string;
        InputPort: number;
        Interface: Interface & { Name: string };
      })[];
    })[];
    Transport: Transport & { Protocol: Protocol };
    GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
  };
}
export interface UpdateGatewayInstanceRequest {
  BridgePlacement?: BridgePlacement;
  GatewayInstanceArn: string;
}
export interface UpdateGatewayInstanceResponse {
  BridgePlacement?: BridgePlacement;
  GatewayInstanceArn?: string;
}
export interface UpdateRouterInputRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterInputConfiguration;
  MaximumBitrate?: number;
  RoutingScope?: RoutingScope;
  Tier?: RouterInputTier;
  TransitEncryption?: RouterInputTransitEncryption;
  MaintenanceConfiguration?: MaintenanceConfiguration;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration;
}
export interface UpdateRouterInputResponse {
  RouterInput: RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  };
}
export interface UpdateRouterNetworkInterfaceRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterNetworkInterfaceConfiguration;
}
export interface UpdateRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export interface UpdateRouterOutputRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterOutputConfiguration;
  MaximumBitrate?: number;
  RoutingScope?: RoutingScope;
  Tier?: RouterOutputTier;
  MaintenanceConfiguration?: MaintenanceConfiguration;
  FabricConfiguration?: FabricConfiguration;
}
export interface UpdateRouterOutputResponse {
  RouterOutput: RouterOutput & { FabricConfiguration: FabricConfiguration };
}
export type AddBridgeOutputsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds outputs to an existing bridge.
 */
export const addBridgeOutputs: API.OperationMethod<
  AddBridgeOutputsRequest,
  AddBridgeOutputsResponse,
  AddBridgeOutputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/bridges/{BridgeArn}/outputs",
    input: {
      BridgeArn: 0,
      Outputs: D.m({
        wire: "outputs",
        shape: D.list(i_AddBridgeOutputRequest),
      }),
    },
    output: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      Outputs: D.m({ wire: "outputs", shape: D.list(o_BridgeOutput) }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddBridgeOutputs",
})) as any;

export type AddBridgeSourcesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds sources to an existing bridge.
 */
export const addBridgeSources: API.OperationMethod<
  AddBridgeSourcesRequest,
  AddBridgeSourcesResponse,
  AddBridgeSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/bridges/{BridgeArn}/sources",
    input: {
      BridgeArn: 0,
      Sources: D.m({
        wire: "sources",
        shape: D.list(i_AddBridgeSourceRequest),
      }),
    },
    output: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      Sources: D.m({ wire: "sources", shape: D.list(o_BridgeSource) }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddBridgeSources",
})) as any;

export type AddFlowMediaStreamsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds media streams to an existing flow. After you add a media stream to a flow, you can associate it with a source and/or an output that uses the ST 2110 JPEG XS or CDI protocol.
 */
export const addFlowMediaStreams: API.OperationMethod<
  AddFlowMediaStreamsRequest,
  AddFlowMediaStreamsResponse,
  AddFlowMediaStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/flows/{FlowArn}/mediaStreams",
    input: {
      FlowArn: 0,
      MediaStreams: D.m({
        wire: "mediaStreams",
        shape: D.list(i_AddMediaStreamRequest),
      }),
    },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      MediaStreams: D.m({ wire: "mediaStreams", shape: D.list(o_MediaStream) }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFlowMediaStreams",
})) as any;

export type AddFlowOutputsError =
  | AddFlowOutputs420Exception
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds outputs to an existing flow. You can create up to 50 outputs per flow.
 */
export const addFlowOutputs: API.OperationMethod<
  AddFlowOutputsRequest,
  AddFlowOutputsResponse,
  AddFlowOutputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/flows/{FlowArn}/outputs",
    input: {
      FlowArn: 0,
      Outputs: D.m({ wire: "outputs", shape: D.list(i_AddOutputRequest) }),
    },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      Outputs: D.m({ wire: "outputs", shape: D.list(o_Output) }),
    },
    body: true,
  },
  errors: [
    AddFlowOutputs420Exception,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFlowOutputs",
})) as any;

export type AddFlowSourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds sources to a flow.
 */
export const addFlowSources: API.OperationMethod<
  AddFlowSourcesRequest,
  AddFlowSourcesResponse,
  AddFlowSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/flows/{FlowArn}/source",
    input: {
      FlowArn: 0,
      Sources: D.m({ wire: "sources", shape: D.list(i_SetSourceRequest) }),
    },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      Sources: D.m({ wire: "sources", shape: D.list(o_Source) }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFlowSources",
})) as any;

export type AddFlowVpcInterfacesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds VPC interfaces to a flow.
 */
export const addFlowVpcInterfaces: API.OperationMethod<
  AddFlowVpcInterfacesRequest,
  AddFlowVpcInterfacesResponse,
  AddFlowVpcInterfacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/flows/{FlowArn}/vpcInterfaces",
    input: {
      FlowArn: 0,
      VpcInterfaces: D.m({
        wire: "vpcInterfaces",
        shape: D.list(i_VpcInterfaceRequest),
      }),
    },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      VpcInterfaces: D.m({
        wire: "vpcInterfaces",
        shape: D.list(o_VpcInterface),
      }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFlowVpcInterfaces",
})) as any;

export type BatchGetRouterInputError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about multiple router inputs in AWS Elemental MediaConnect.
 */
export const batchGetRouterInput: API.OperationMethod<
  BatchGetRouterInputRequest,
  BatchGetRouterInputResponse,
  BatchGetRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/routerInputs",
    input: { Arns: D.m({ query: "arns" }) },
    output: {
      RouterInputs: D.m({ wire: "routerInputs", shape: D.list(o_RouterInput) }),
      Errors: D.m({
        wire: "errors",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          Code: D.m({ wire: "code" }),
          Message: D.m({ wire: "message" }),
        }),
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRouterInput",
})) as any;

export type BatchGetRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about multiple router network interfaces in AWS Elemental MediaConnect.
 */
export const batchGetRouterNetworkInterface: API.OperationMethod<
  BatchGetRouterNetworkInterfaceRequest,
  BatchGetRouterNetworkInterfaceResponse,
  BatchGetRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/routerNetworkInterfaces",
    input: { Arns: D.m({ query: "arns" }) },
    output: {
      RouterNetworkInterfaces: D.m({
        wire: "routerNetworkInterfaces",
        shape: D.list(o_RouterNetworkInterface),
      }),
      Errors: D.m({
        wire: "errors",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          Code: D.m({ wire: "code" }),
          Message: D.m({ wire: "message" }),
        }),
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRouterNetworkInterface",
})) as any;

export type BatchGetRouterOutputError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about multiple router outputs in AWS Elemental MediaConnect.
 */
export const batchGetRouterOutput: API.OperationMethod<
  BatchGetRouterOutputRequest,
  BatchGetRouterOutputResponse,
  BatchGetRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/routerOutputs",
    input: { Arns: D.m({ query: "arns" }) },
    output: {
      RouterOutputs: D.m({
        wire: "routerOutputs",
        shape: D.list(o_RouterOutput),
      }),
      Errors: D.m({
        wire: "errors",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          Code: D.m({ wire: "code" }),
          Message: D.m({ wire: "message" }),
        }),
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRouterOutput",
})) as any;

export type CreateBridgeError =
  | BadRequestException
  | ConflictException
  | CreateBridge420Exception
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new bridge. The request must include one source.
 */
export const createBridge: API.OperationMethod<
  CreateBridgeRequest,
  CreateBridgeResponse,
  CreateBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/bridges",
    input: {
      EgressGatewayBridge: D.m({
        wire: "egressGatewayBridge",
        shape: { MaxBitrate: D.m({ wire: "maxBitrate" }) },
      }),
      IngressGatewayBridge: D.m({
        wire: "ingressGatewayBridge",
        shape: {
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          MaxOutputs: D.m({ wire: "maxOutputs" }),
        },
      }),
      Name: D.m({ wire: "name" }),
      Outputs: D.m({
        wire: "outputs",
        shape: D.list(i_AddBridgeOutputRequest),
      }),
      PlacementArn: D.m({ wire: "placementArn" }),
      SourceFailoverConfig: D.m({
        wire: "sourceFailoverConfig",
        shape: i_FailoverConfig,
      }),
      Sources: D.m({
        wire: "sources",
        shape: D.list(i_AddBridgeSourceRequest),
      }),
    },
    output: { Bridge: D.m({ wire: "bridge", shape: o_Bridge }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    CreateBridge420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBridge",
})) as any;

export type CreateFlowError =
  | BadRequestException
  | CreateFlow420Exception
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new flow. The request must include one source. The request optionally can include outputs (up to 50) and entitlements (up to 50).
 */
export const createFlow: API.OperationMethod<
  CreateFlowRequest,
  CreateFlowResponse,
  CreateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/flows",
    input: {
      AvailabilityZone: D.m({ wire: "availabilityZone" }),
      Entitlements: D.m({
        wire: "entitlements",
        shape: D.list(i_GrantEntitlementRequest),
      }),
      MediaStreams: D.m({
        wire: "mediaStreams",
        shape: D.list(i_AddMediaStreamRequest),
      }),
      Name: D.m({ wire: "name" }),
      Outputs: D.m({ wire: "outputs", shape: D.list(i_AddOutputRequest) }),
      Source: D.m({ wire: "source", shape: i_SetSourceRequest }),
      SourceFailoverConfig: D.m({
        wire: "sourceFailoverConfig",
        shape: i_FailoverConfig,
      }),
      Sources: D.m({ wire: "sources", shape: D.list(i_SetSourceRequest) }),
      VpcInterfaces: D.m({
        wire: "vpcInterfaces",
        shape: D.list(i_VpcInterfaceRequest),
      }),
      Maintenance: D.m({
        wire: "maintenance",
        shape: {
          MaintenanceDay: D.m({ wire: "maintenanceDay" }),
          MaintenanceStartHour: D.m({ wire: "maintenanceStartHour" }),
        },
      }),
      SourceMonitoringConfig: D.m({
        wire: "sourceMonitoringConfig",
        shape: i_MonitoringConfig,
      }),
      FlowSize: D.m({ wire: "flowSize" }),
      NdiConfig: D.m({ wire: "ndiConfig", shape: i_NdiConfig }),
      EncodingConfig: D.m({ wire: "encodingConfig", shape: i_EncodingConfig }),
      FlowTags: D.m({ wire: "flowTags" }),
    },
    output: { Flow: D.m({ wire: "flow", shape: o_Flow }) },
    body: true,
  },
  errors: [
    BadRequestException,
    CreateFlow420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFlow",
})) as any;

export type CreateGatewayError =
  | BadRequestException
  | ConflictException
  | CreateGateway420Exception
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new gateway. The request must include at least one network (up to four).
 */
export const createGateway: API.OperationMethod<
  CreateGatewayRequest,
  CreateGatewayResponse,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/gateways",
    input: {
      EgressCidrBlocks: D.m({ wire: "egressCidrBlocks" }),
      Name: D.m({ wire: "name" }),
      Networks: D.m({
        wire: "networks",
        shape: D.list({
          CidrBlock: D.m({ wire: "cidrBlock" }),
          Name: D.m({ wire: "name" }),
        }),
      }),
    },
    output: { Gateway: D.m({ wire: "gateway", shape: o_Gateway }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    CreateGateway420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGateway",
})) as any;

export type CreateRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | RouterInputServiceQuotaExceededException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new router input in AWS Elemental MediaConnect.
 */
export const createRouterInput: API.OperationMethod<
  CreateRouterInputRequest,
  CreateRouterInputResponse,
  CreateRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerInput",
    input: {
      Name: D.m({ wire: "name" }),
      Configuration: D.m({
        wire: "configuration",
        shape: i_RouterInputConfiguration,
      }),
      MaximumBitrate: D.m({ wire: "maximumBitrate" }),
      RoutingScope: D.m({ wire: "routingScope" }),
      Tier: D.m({ wire: "tier" }),
      RegionName: D.m({ wire: "regionName" }),
      AvailabilityZone: D.m({ wire: "availabilityZone" }),
      TransitEncryption: D.m({
        wire: "transitEncryption",
        shape: i_RouterInputTransitEncryption,
      }),
      MaintenanceConfiguration: D.m({
        wire: "maintenanceConfiguration",
        shape: i_MaintenanceConfiguration,
      }),
      Tags: D.m({ wire: "tags" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      ContentQualityAnalysisConfiguration: D.m({
        wire: "contentQualityAnalysisConfiguration",
        shape: i_RouterContentQualityAnalysisConfiguration,
      }),
    },
    output: { RouterInput: D.m({ wire: "routerInput", shape: o_RouterInput }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterInputServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouterInput",
})) as any;

export type CreateRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | RouterNetworkInterfaceServiceQuotaExceededException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new router network interface in AWS Elemental MediaConnect.
 */
export const createRouterNetworkInterface: API.OperationMethod<
  CreateRouterNetworkInterfaceRequest,
  CreateRouterNetworkInterfaceResponse,
  CreateRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerNetworkInterface",
    input: {
      Name: D.m({ wire: "name" }),
      Configuration: D.m({
        wire: "configuration",
        shape: i_RouterNetworkInterfaceConfiguration,
      }),
      RegionName: D.m({ wire: "regionName" }),
      Tags: D.m({ wire: "tags" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
    },
    output: {
      RouterNetworkInterface: D.m({
        wire: "routerNetworkInterface",
        shape: o_RouterNetworkInterface,
      }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterNetworkInterfaceServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouterNetworkInterface",
})) as any;

export type CreateRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | RouterOutputServiceQuotaExceededException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new router output in AWS Elemental MediaConnect.
 */
export const createRouterOutput: API.OperationMethod<
  CreateRouterOutputRequest,
  CreateRouterOutputResponse,
  CreateRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerOutput",
    input: {
      Name: D.m({ wire: "name" }),
      Configuration: D.m({
        wire: "configuration",
        shape: i_RouterOutputConfiguration,
      }),
      MaximumBitrate: D.m({ wire: "maximumBitrate" }),
      RoutingScope: D.m({ wire: "routingScope" }),
      Tier: D.m({ wire: "tier" }),
      RegionName: D.m({ wire: "regionName" }),
      AvailabilityZone: D.m({ wire: "availabilityZone" }),
      MaintenanceConfiguration: D.m({
        wire: "maintenanceConfiguration",
        shape: i_MaintenanceConfiguration,
      }),
      Tags: D.m({ wire: "tags" }),
      FabricConfiguration: D.m({
        wire: "fabricConfiguration",
        shape: i_FabricConfiguration,
      }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
    },
    output: {
      RouterOutput: D.m({ wire: "routerOutput", shape: o_RouterOutput }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterOutputServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouterOutput",
})) as any;

export type DeleteBridgeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a bridge. Before you can delete a bridge, you must stop the bridge.
 */
export const deleteBridge: API.OperationMethod<
  DeleteBridgeRequest,
  DeleteBridgeResponse,
  DeleteBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/bridges/{BridgeArn}",
    input: { BridgeArn: 0 },
    output: { BridgeArn: D.m({ wire: "bridgeArn" }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBridge",
})) as any;

export type DeleteFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a flow. Before you can delete a flow, you must stop the flow.
 */
export const deleteFlow: API.OperationMethod<
  DeleteFlowRequest,
  DeleteFlowResponse,
  DeleteFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/flows/{FlowArn}",
    input: { FlowArn: 0 },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      Status: D.m({ wire: "status" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFlow",
})) as any;

export type DeleteGatewayError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a gateway. Before you can delete a gateway, you must deregister its instances and delete its bridges.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayRequest,
  DeleteGatewayResponse,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/gateways/{GatewayArn}",
    input: { GatewayArn: 0 },
    output: { GatewayArn: D.m({ wire: "gatewayArn" }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGateway",
})) as any;

export type DeleteRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a router input from AWS Elemental MediaConnect.
 */
export const deleteRouterInput: API.OperationMethod<
  DeleteRouterInputRequest,
  DeleteRouterInputResponse,
  DeleteRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/routerInput/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouterInput",
})) as any;

export type DeleteRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a router network interface from AWS Elemental MediaConnect.
 */
export const deleteRouterNetworkInterface: API.OperationMethod<
  DeleteRouterNetworkInterfaceRequest,
  DeleteRouterNetworkInterfaceResponse,
  DeleteRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/routerNetworkInterface/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouterNetworkInterface",
})) as any;

export type DeleteRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a router output from AWS Elemental MediaConnect.
 */
export const deleteRouterOutput: API.OperationMethod<
  DeleteRouterOutputRequest,
  DeleteRouterOutputResponse,
  DeleteRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/routerOutput/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouterOutput",
})) as any;

export type DeregisterGatewayInstanceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deregisters an instance. Before you deregister an instance, all bridges running on the instance must be stopped. If you want to deregister an instance without stopping the bridges, you must use the --force option.
 */
export const deregisterGatewayInstance: API.OperationMethod<
  DeregisterGatewayInstanceRequest,
  DeregisterGatewayInstanceResponse,
  DeregisterGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/gateway-instances/{GatewayInstanceArn}",
    input: { Force: D.m({ query: "force" }), GatewayInstanceArn: 0 },
    output: {
      GatewayInstanceArn: D.m({ wire: "gatewayInstanceArn" }),
      InstanceState: D.m({ wire: "instanceState" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterGatewayInstance",
})) as any;

export type DescribeBridgeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of a bridge.
 */
export const describeBridge: API.OperationMethod<
  DescribeBridgeRequest,
  DescribeBridgeResponse,
  DescribeBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/bridges/{BridgeArn}",
    input: { BridgeArn: 0 },
    output: { Bridge: D.m({ wire: "bridge", shape: o_Bridge }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBridge",
})) as any;

export type DescribeFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of a flow. The response includes the flow Amazon Resource Name (ARN), name, and Availability Zone, as well as details about the source, outputs, and entitlements.
 */
export const describeFlow: API.OperationMethod<
  DescribeFlowRequest,
  DescribeFlowResponse,
  DescribeFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/flows/{FlowArn}",
    input: { FlowArn: 0 },
    output: {
      Flow: D.m({ wire: "flow", shape: o_Flow }),
      Messages: D.m({
        wire: "messages",
        shape: { Errors: D.m({ wire: "errors" }) },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlow",
})) as any;

export type DescribeFlowSourceMetadataError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * The `DescribeFlowSourceMetadata` API is used to view information about the flow's source transport stream and programs. This API displays status messages about the flow's source as well as details about the program's video, audio, and other data.
 */
export const describeFlowSourceMetadata: API.OperationMethod<
  DescribeFlowSourceMetadataRequest,
  DescribeFlowSourceMetadataResponse,
  DescribeFlowSourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/flows/{FlowArn}/source-metadata",
    input: { FlowArn: 0 },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      Messages: D.m({ wire: "messages", shape: D.list(o_MessageDetail) }),
      Timestamp: D.m({ wire: "timestamp", shape: D.ts }),
      TransportMediaInfo: D.m({
        wire: "transportMediaInfo",
        shape: o_TransportMediaInfo,
      }),
      NdiInfo: D.m({
        wire: "ndiInfo",
        shape: {
          ActiveSource: D.m({ wire: "activeSource", shape: o_NdiSourceInfo }),
          DiscoveredSources: D.m({
            wire: "discoveredSources",
            shape: D.list(o_NdiSourceInfo),
          }),
          MediaInfo: D.m({
            wire: "mediaInfo",
            shape: {
              Streams: D.m({
                wire: "streams",
                shape: D.list({
                  StreamType: D.m({ wire: "streamType" }),
                  Codec: D.m({ wire: "codec" }),
                  StreamId: D.m({ wire: "streamId" }),
                  ScanMode: D.m({ wire: "scanMode" }),
                  FrameResolution: D.m({
                    wire: "frameResolution",
                    shape: o_FrameResolution,
                  }),
                  FrameRate: D.m({ wire: "frameRate" }),
                  Channels: D.m({ wire: "channels" }),
                  SampleRate: D.m({ wire: "sampleRate" }),
                }),
              }),
            },
          }),
          Messages: D.m({ wire: "messages", shape: D.list(o_MessageDetail) }),
        },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowSourceMetadata",
})) as any;

export type DescribeFlowSourceThumbnailError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes the thumbnail for the flow source.
 */
export const describeFlowSourceThumbnail: API.OperationMethod<
  DescribeFlowSourceThumbnailRequest,
  DescribeFlowSourceThumbnailResponse,
  DescribeFlowSourceThumbnailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/flows/{FlowArn}/source-thumbnail",
    input: { FlowArn: 0 },
    output: {
      ThumbnailDetails: D.m({
        wire: "thumbnailDetails",
        shape: {
          FlowArn: D.m({ wire: "flowArn" }),
          Thumbnail: D.m({ wire: "thumbnail" }),
          ThumbnailMessages: D.m({
            wire: "thumbnailMessages",
            shape: D.list(o_MessageDetail),
          }),
          Timecode: D.m({ wire: "timecode" }),
          Timestamp: D.m({ wire: "timestamp", shape: D.ts }),
        },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowSourceThumbnail",
})) as any;

export type DescribeGatewayError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of a gateway. The response includes the gateway Amazon Resource Name (ARN), name, and CIDR blocks, as well as details about the networks.
 */
export const describeGateway: API.OperationMethod<
  DescribeGatewayRequest,
  DescribeGatewayResponse,
  DescribeGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/gateways/{GatewayArn}",
    input: { GatewayArn: 0 },
    output: { Gateway: D.m({ wire: "gateway", shape: o_Gateway }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGateway",
})) as any;

export type DescribeGatewayInstanceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of an instance.
 */
export const describeGatewayInstance: API.OperationMethod<
  DescribeGatewayInstanceRequest,
  DescribeGatewayInstanceResponse,
  DescribeGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/gateway-instances/{GatewayInstanceArn}",
    input: { GatewayInstanceArn: 0 },
    output: {
      GatewayInstance: D.m({
        wire: "gatewayInstance",
        shape: {
          BridgePlacement: D.m({ wire: "bridgePlacement" }),
          ConnectionStatus: D.m({ wire: "connectionStatus" }),
          GatewayArn: D.m({ wire: "gatewayArn" }),
          GatewayInstanceArn: D.m({ wire: "gatewayInstanceArn" }),
          InstanceId: D.m({ wire: "instanceId" }),
          InstanceMessages: D.m({
            wire: "instanceMessages",
            shape: D.list(o_MessageDetail),
          }),
          InstanceState: D.m({ wire: "instanceState" }),
          RunningBridgeCount: D.m({ wire: "runningBridgeCount" }),
        },
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGatewayInstance",
})) as any;

export type DescribeOfferingError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of an offering. The response includes the offering description, duration, outbound bandwidth, price, and Amazon Resource Name (ARN).
 */
export const describeOffering: API.OperationMethod<
  DescribeOfferingRequest,
  DescribeOfferingResponse,
  DescribeOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/offerings/{OfferingArn}",
    input: { OfferingArn: 0 },
    output: { Offering: D.m({ wire: "offering", shape: o_Offering }) },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOffering",
})) as any;

export type DescribeReservationError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of a reservation. The response includes the reservation name, state, start date and time, and the details of the offering that make up the rest of the reservation (such as price, duration, and outbound bandwidth).
 */
export const describeReservation: API.OperationMethod<
  DescribeReservationRequest,
  DescribeReservationResponse,
  DescribeReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/reservations/{ReservationArn}",
    input: { ReservationArn: 0 },
    output: { Reservation: D.m({ wire: "reservation", shape: o_Reservation }) },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservation",
})) as any;

export type GetRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific router input in AWS Elemental MediaConnect.
 */
export const getRouterInput: API.OperationMethod<
  GetRouterInputRequest,
  GetRouterInputResponse,
  GetRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/routerInput/{Arn}",
    input: { Arn: 0 },
    output: { RouterInput: D.m({ wire: "routerInput", shape: o_RouterInput }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterInput",
})) as any;

export type GetRouterInputSourceMetadataError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves detailed metadata information about a specific router input source, including stream details and connection state.
 */
export const getRouterInputSourceMetadata: API.OperationMethod<
  GetRouterInputSourceMetadataRequest,
  GetRouterInputSourceMetadataResponse,
  GetRouterInputSourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/routerInput/{Arn}/source-metadata",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      SourceMetadataDetails: D.m({
        wire: "sourceMetadataDetails",
        shape: {
          SourceMetadataMessages: D.m({
            wire: "sourceMetadataMessages",
            shape: D.list(o_RouterInputMessage),
          }),
          Timestamp: D.m({ wire: "timestamp", shape: D.ts }),
          RouterInputMetadata: D.m({
            wire: "routerInputMetadata",
            shape: {
              TransportStreamMediaInfo: D.m({
                wire: "transportStreamMediaInfo",
                shape: o_TransportMediaInfo,
              }),
            },
          }),
        },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterInputSourceMetadata",
})) as any;

export type GetRouterInputThumbnailError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the thumbnail for a router input in AWS Elemental MediaConnect.
 */
export const getRouterInputThumbnail: API.OperationMethod<
  GetRouterInputThumbnailRequest,
  GetRouterInputThumbnailResponse,
  GetRouterInputThumbnailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/routerInput/{Arn}/thumbnail",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      ThumbnailDetails: D.m({
        wire: "thumbnailDetails",
        shape: {
          ThumbnailMessages: D.m({
            wire: "thumbnailMessages",
            shape: D.list(o_RouterInputMessage),
          }),
          Thumbnail: D.m({ wire: "thumbnail", shape: D.blob }),
          Timecode: D.m({ wire: "timecode" }),
          Timestamp: D.m({ wire: "timestamp", shape: D.ts }),
        },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterInputThumbnail",
})) as any;

export type GetRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific router network interface in AWS Elemental MediaConnect.
 */
export const getRouterNetworkInterface: API.OperationMethod<
  GetRouterNetworkInterfaceRequest,
  GetRouterNetworkInterfaceResponse,
  GetRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/routerNetworkInterface/{Arn}",
    input: { Arn: 0 },
    output: {
      RouterNetworkInterface: D.m({
        wire: "routerNetworkInterface",
        shape: o_RouterNetworkInterface,
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterNetworkInterface",
})) as any;

export type GetRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific router output in AWS Elemental MediaConnect.
 */
export const getRouterOutput: API.OperationMethod<
  GetRouterOutputRequest,
  GetRouterOutputResponse,
  GetRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/routerOutput/{Arn}",
    input: { Arn: 0 },
    output: {
      RouterOutput: D.m({ wire: "routerOutput", shape: o_RouterOutput }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterOutput",
})) as any;

export type GrantFlowEntitlementsError =
  | BadRequestException
  | ForbiddenException
  | GrantFlowEntitlements420Exception
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Grants entitlements to an existing flow.
 */
export const grantFlowEntitlements: API.OperationMethod<
  GrantFlowEntitlementsRequest,
  GrantFlowEntitlementsResponse,
  GrantFlowEntitlementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/flows/{FlowArn}/entitlements",
    input: {
      Entitlements: D.m({
        wire: "entitlements",
        shape: D.list(i_GrantEntitlementRequest),
      }),
      FlowArn: 0,
    },
    output: {
      Entitlements: D.m({ wire: "entitlements", shape: D.list(o_Entitlement) }),
      FlowArn: D.m({ wire: "flowArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    GrantFlowEntitlements420Exception,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GrantFlowEntitlements",
})) as any;

export type ListBridgesError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of bridges that are associated with this account and an optionally specified Amazon Resource Name (ARN). This request returns a paginated result.
 */
export const listBridges: API.PaginatedOperationMethod<
  ListBridgesRequest,
  ListBridgesResponse,
  ListBridgesError,
  Credentials | HttpClient.HttpClient,
  ListedBridge
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/bridges",
    input: {
      FilterArn: D.m({ query: "filterArn" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Bridges: D.m({
        wire: "bridges",
        shape: D.list({
          BridgeArn: D.m({ wire: "bridgeArn" }),
          BridgeState: D.m({ wire: "bridgeState" }),
          BridgeType: D.m({ wire: "bridgeType" }),
          Name: D.m({ wire: "name" }),
          PlacementArn: D.m({ wire: "placementArn" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBridges",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Bridges",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntitlementsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all entitlements that have been granted to this account. This request returns 20 results per page.
 */
export const listEntitlements: API.PaginatedOperationMethod<
  ListEntitlementsRequest,
  ListEntitlementsResponse,
  ListEntitlementsError,
  Credentials | HttpClient.HttpClient,
  ListedEntitlement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/entitlements",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Entitlements: D.m({
        wire: "entitlements",
        shape: D.list({
          DataTransferSubscriberFeePercent: D.m({
            wire: "dataTransferSubscriberFeePercent",
          }),
          EntitlementArn: D.m({ wire: "entitlementArn" }),
          EntitlementName: D.m({ wire: "entitlementName" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitlements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entitlements",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlowsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of flows that are associated with this account. This request returns a paginated result.
 */
export const listFlows: API.PaginatedOperationMethod<
  ListFlowsRequest,
  ListFlowsResponse,
  ListFlowsError,
  Credentials | HttpClient.HttpClient,
  ListedFlow
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/flows",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Flows: D.m({
        wire: "flows",
        shape: D.list({
          AvailabilityZone: D.m({ wire: "availabilityZone" }),
          Description: D.m({ wire: "description" }),
          FlowArn: D.m({ wire: "flowArn" }),
          Name: D.m({ wire: "name" }),
          SourceType: D.m({ wire: "sourceType" }),
          Status: D.m({ wire: "status" }),
          Maintenance: D.m({ wire: "maintenance", shape: o_Maintenance }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Flows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGatewayInstancesError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of instances associated with the Amazon Web Services account. This request returns a paginated result. You can use the filterArn property to display only the instances associated with the selected Gateway Amazon Resource Name (ARN).
 */
export const listGatewayInstances: API.PaginatedOperationMethod<
  ListGatewayInstancesRequest,
  ListGatewayInstancesResponse,
  ListGatewayInstancesError,
  Credentials | HttpClient.HttpClient,
  ListedGatewayInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/gateway-instances",
    input: {
      FilterArn: D.m({ query: "filterArn" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Instances: D.m({
        wire: "instances",
        shape: D.list({
          GatewayArn: D.m({ wire: "gatewayArn" }),
          GatewayInstanceArn: D.m({ wire: "gatewayInstanceArn" }),
          InstanceId: D.m({ wire: "instanceId" }),
          InstanceState: D.m({ wire: "instanceState" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGatewayInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGatewaysError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of gateways that are associated with this account. This request returns a paginated result.
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysRequest,
  ListGatewaysResponse,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  ListedGateway
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/gateways",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Gateways: D.m({
        wire: "gateways",
        shape: D.list({
          GatewayArn: D.m({ wire: "gatewayArn" }),
          GatewayState: D.m({ wire: "gatewayState" }),
          Name: D.m({ wire: "name" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGateways",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Gateways",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOfferingsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all offerings that are available to this account in the current Amazon Web Services Region. If you have an active reservation (which means you've purchased an offering that has already started and hasn't expired yet), your account isn't eligible for other offerings.
 */
export const listOfferings: API.PaginatedOperationMethod<
  ListOfferingsRequest,
  ListOfferingsResponse,
  ListOfferingsError,
  Credentials | HttpClient.HttpClient,
  Offering
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/offerings",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Offerings: D.m({ wire: "offerings", shape: D.list(o_Offering) }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Offerings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReservationsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all reservations that have been purchased by this account in the current Amazon Web Services Region. This list includes all reservations in all states (such as active and expired).
 */
export const listReservations: API.PaginatedOperationMethod<
  ListReservationsRequest,
  ListReservationsResponse,
  ListReservationsError,
  Credentials | HttpClient.HttpClient,
  Reservation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/reservations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Reservations: D.m({ wire: "reservations", shape: D.list(o_Reservation) }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReservations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Reservations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRouterInputsError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of router inputs in AWS Elemental MediaConnect.
 */
export const listRouterInputs: API.PaginatedOperationMethod<
  ListRouterInputsRequest,
  ListRouterInputsResponse,
  ListRouterInputsError,
  Credentials | HttpClient.HttpClient,
  ListedRouterInput
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerInputs",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Filters: D.m({
        wire: "filters",
        shape: D.list({
          NameContains: D.m({ wire: "nameContains" }),
          RegionNames: D.m({ wire: "regionNames" }),
          NetworkInterfaceArns: D.m({ wire: "networkInterfaceArns" }),
          RoutingScopes: D.m({ wire: "routingScopes" }),
          InputTypes: D.m({ wire: "inputTypes" }),
        }),
      }),
    },
    output: {
      RouterInputs: D.m({
        wire: "routerInputs",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          Arn: D.m({ wire: "arn" }),
          Id: D.m({ wire: "id" }),
          InputType: D.m({ wire: "inputType" }),
          State: D.m({ wire: "state" }),
          RoutedOutputs: D.m({ wire: "routedOutputs" }),
          RegionName: D.m({ wire: "regionName" }),
          AvailabilityZone: D.m({ wire: "availabilityZone" }),
          MaximumBitrate: D.m({ wire: "maximumBitrate" }),
          RoutingScope: D.m({ wire: "routingScope" }),
          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
          UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
          MessageCount: D.m({ wire: "messageCount" }),
          NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
          MaintenanceScheduleType: D.m({ wire: "maintenanceScheduleType" }),
          MaintenanceSchedule: D.m({
            wire: "maintenanceSchedule",
            shape: o_MaintenanceSchedule,
          }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRouterInputs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterInputs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRouterNetworkInterfacesError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of router network interfaces in AWS Elemental MediaConnect.
 */
export const listRouterNetworkInterfaces: API.PaginatedOperationMethod<
  ListRouterNetworkInterfacesRequest,
  ListRouterNetworkInterfacesResponse,
  ListRouterNetworkInterfacesError,
  Credentials | HttpClient.HttpClient,
  ListedRouterNetworkInterface
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerNetworkInterfaces",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Filters: D.m({
        wire: "filters",
        shape: D.list({
          RegionNames: D.m({ wire: "regionNames" }),
          NetworkInterfaceTypes: D.m({ wire: "networkInterfaceTypes" }),
          NameContains: D.m({ wire: "nameContains" }),
        }),
      }),
    },
    output: {
      RouterNetworkInterfaces: D.m({
        wire: "routerNetworkInterfaces",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          Arn: D.m({ wire: "arn" }),
          Id: D.m({ wire: "id" }),
          NetworkInterfaceType: D.m({ wire: "networkInterfaceType" }),
          AssociatedOutputCount: D.m({ wire: "associatedOutputCount" }),
          AssociatedInputCount: D.m({ wire: "associatedInputCount" }),
          State: D.m({ wire: "state" }),
          RegionName: D.m({ wire: "regionName" }),
          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
          UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRouterNetworkInterfaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterNetworkInterfaces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRouterOutputsError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of router outputs in AWS Elemental MediaConnect.
 */
export const listRouterOutputs: API.PaginatedOperationMethod<
  ListRouterOutputsRequest,
  ListRouterOutputsResponse,
  ListRouterOutputsError,
  Credentials | HttpClient.HttpClient,
  ListedRouterOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerOutputs",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Filters: D.m({
        wire: "filters",
        shape: D.list({
          RegionNames: D.m({ wire: "regionNames" }),
          NetworkInterfaceArns: D.m({ wire: "networkInterfaceArns" }),
          RoutingScopes: D.m({ wire: "routingScopes" }),
          OutputTypes: D.m({ wire: "outputTypes" }),
          RoutedInputArns: D.m({ wire: "routedInputArns" }),
          NameContains: D.m({ wire: "nameContains" }),
        }),
      }),
    },
    output: {
      RouterOutputs: D.m({
        wire: "routerOutputs",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          Arn: D.m({ wire: "arn" }),
          Id: D.m({ wire: "id" }),
          OutputType: D.m({ wire: "outputType" }),
          State: D.m({ wire: "state" }),
          RoutedState: D.m({ wire: "routedState" }),
          RegionName: D.m({ wire: "regionName" }),
          AvailabilityZone: D.m({ wire: "availabilityZone" }),
          MaximumBitrate: D.m({ wire: "maximumBitrate" }),
          RoutingScope: D.m({ wire: "routingScope" }),
          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
          UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
          MessageCount: D.m({ wire: "messageCount" }),
          RoutedInputArn: D.m({ wire: "routedInputArn" }),
          NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
          MaintenanceScheduleType: D.m({ wire: "maintenanceScheduleType" }),
          MaintenanceSchedule: D.m({
            wire: "maintenanceSchedule",
            shape: o_MaintenanceSchedule,
          }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRouterOutputs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterOutputs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForGlobalResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Lists the tags associated with a global resource in AWS Elemental MediaConnect. The API supports the following global resources: router inputs, router outputs and router network interfaces.
 */
export const listTagsForGlobalResource: API.OperationMethod<
  ListTagsForGlobalResourceRequest,
  ListTagsForGlobalResourceResponse,
  ListTagsForGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/global/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForGlobalResource",
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * List all tags on a MediaConnect resource in the current region.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PurchaseOfferingError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Submits a request to purchase an offering. If you already have an active reservation, you can't purchase another offering.
 */
export const purchaseOffering: API.OperationMethod<
  PurchaseOfferingRequest,
  PurchaseOfferingResponse,
  PurchaseOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/offerings/{OfferingArn}",
    input: {
      OfferingArn: 0,
      ReservationName: D.m({ wire: "reservationName" }),
      Start: D.m({ wire: "start" }),
    },
    output: { Reservation: D.m({ wire: "reservation", shape: o_Reservation }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseOffering",
})) as any;

export type RemoveBridgeOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an output from a bridge.
 */
export const removeBridgeOutput: API.OperationMethod<
  RemoveBridgeOutputRequest,
  RemoveBridgeOutputResponse,
  RemoveBridgeOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/bridges/{BridgeArn}/outputs/{OutputName}",
    input: { BridgeArn: 0, OutputName: 0 },
    output: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      OutputName: D.m({ wire: "outputName" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveBridgeOutput",
})) as any;

export type RemoveBridgeSourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a source from a bridge.
 */
export const removeBridgeSource: API.OperationMethod<
  RemoveBridgeSourceRequest,
  RemoveBridgeSourceResponse,
  RemoveBridgeSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/bridges/{BridgeArn}/sources/{SourceName}",
    input: { BridgeArn: 0, SourceName: 0 },
    output: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      SourceName: D.m({ wire: "sourceName" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveBridgeSource",
})) as any;

export type RemoveFlowMediaStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a media stream from a flow. This action is only available if the media stream is not associated with a source or output.
 */
export const removeFlowMediaStream: API.OperationMethod<
  RemoveFlowMediaStreamRequest,
  RemoveFlowMediaStreamResponse,
  RemoveFlowMediaStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/flows/{FlowArn}/mediaStreams/{MediaStreamName}",
    input: { FlowArn: 0, MediaStreamName: 0 },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      MediaStreamName: D.m({ wire: "mediaStreamName" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFlowMediaStream",
})) as any;

export type RemoveFlowOutputError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an output from an existing flow. This request can be made only on an output that does not have an entitlement associated with it. If the output has an entitlement, you must revoke the entitlement instead. When an entitlement is revoked from a flow, the service automatically removes the associated output.
 */
export const removeFlowOutput: API.OperationMethod<
  RemoveFlowOutputRequest,
  RemoveFlowOutputResponse,
  RemoveFlowOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/flows/{FlowArn}/outputs/{OutputArn}",
    input: { FlowArn: 0, OutputArn: 0 },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      OutputArn: D.m({ wire: "outputArn" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFlowOutput",
})) as any;

export type RemoveFlowSourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a source from an existing flow. This request can be made only if there is more than one source on the flow.
 */
export const removeFlowSource: API.OperationMethod<
  RemoveFlowSourceRequest,
  RemoveFlowSourceResponse,
  RemoveFlowSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/flows/{FlowArn}/source/{SourceArn}",
    input: { FlowArn: 0, SourceArn: 0 },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      SourceArn: D.m({ wire: "sourceArn" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFlowSource",
})) as any;

export type RemoveFlowVpcInterfaceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a VPC Interface from an existing flow. This request can be made only on a VPC interface that does not have a Source or Output associated with it. If the VPC interface is referenced by a Source or Output, you must first delete or update the Source or Output to no longer reference the VPC interface.
 */
export const removeFlowVpcInterface: API.OperationMethod<
  RemoveFlowVpcInterfaceRequest,
  RemoveFlowVpcInterfaceResponse,
  RemoveFlowVpcInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/flows/{FlowArn}/vpcInterfaces/{VpcInterfaceName}",
    input: { FlowArn: 0, VpcInterfaceName: 0 },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      NonDeletedNetworkInterfaceIds: D.m({
        wire: "nonDeletedNetworkInterfaceIds",
      }),
      VpcInterfaceName: D.m({ wire: "vpcInterfaceName" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFlowVpcInterface",
})) as any;

export type RestartRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Restarts a router input. This operation can be used to recover from errors or refresh the input state.
 */
export const restartRouterInput: API.OperationMethod<
  RestartRouterInputRequest,
  RestartRouterInputResponse,
  RestartRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerInput/restart/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartRouterInput",
})) as any;

export type RestartRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Restarts a router output. This operation can be used to recover from errors or refresh the output state.
 */
export const restartRouterOutput: API.OperationMethod<
  RestartRouterOutputRequest,
  RestartRouterOutputResponse,
  RestartRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerOutput/restart/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartRouterOutput",
})) as any;

export type RevokeFlowEntitlementError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Revokes an entitlement from a flow. Once an entitlement is revoked, the content becomes unavailable to the subscriber and the associated output is removed.
 */
export const revokeFlowEntitlement: API.OperationMethod<
  RevokeFlowEntitlementRequest,
  RevokeFlowEntitlementResponse,
  RevokeFlowEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/flows/{FlowArn}/entitlements/{EntitlementArn}",
    input: { EntitlementArn: 0, FlowArn: 0 },
    output: {
      EntitlementArn: D.m({ wire: "entitlementArn" }),
      FlowArn: D.m({ wire: "flowArn" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeFlowEntitlement",
})) as any;

export type StartFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts a flow.
 */
export const startFlow: API.OperationMethod<
  StartFlowRequest,
  StartFlowResponse,
  StartFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/flows/start/{FlowArn}",
    input: { FlowArn: 0 },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      Status: D.m({ wire: "status" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlow",
})) as any;

export type StartRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts a router input in AWS Elemental MediaConnect.
 */
export const startRouterInput: API.OperationMethod<
  StartRouterInputRequest,
  StartRouterInputResponse,
  StartRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerInput/start/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
      MaintenanceScheduleType: D.m({ wire: "maintenanceScheduleType" }),
      MaintenanceSchedule: D.m({
        wire: "maintenanceSchedule",
        shape: o_MaintenanceSchedule,
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRouterInput",
})) as any;

export type StartRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts a router output in AWS Elemental MediaConnect.
 */
export const startRouterOutput: API.OperationMethod<
  StartRouterOutputRequest,
  StartRouterOutputResponse,
  StartRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerOutput/start/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
      MaintenanceScheduleType: D.m({ wire: "maintenanceScheduleType" }),
      MaintenanceSchedule: D.m({
        wire: "maintenanceSchedule",
        shape: o_MaintenanceSchedule,
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRouterOutput",
})) as any;

export type StopFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a flow.
 */
export const stopFlow: API.OperationMethod<
  StopFlowRequest,
  StopFlowResponse,
  StopFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/flows/stop/{FlowArn}",
    input: { FlowArn: 0 },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      Status: D.m({ wire: "status" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFlow",
})) as any;

export type StopRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a router input in AWS Elemental MediaConnect.
 */
export const stopRouterInput: API.OperationMethod<
  StopRouterInputRequest,
  StopRouterInputResponse,
  StopRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerInput/stop/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRouterInput",
})) as any;

export type StopRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a router output in AWS Elemental MediaConnect.
 */
export const stopRouterOutput: API.OperationMethod<
  StopRouterOutputRequest,
  StopRouterOutputResponse,
  StopRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/routerOutput/stop/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRouterOutput",
})) as any;

export type TagGlobalResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Adds tags to a global resource in AWS Elemental MediaConnect. The API supports the following global resources: router inputs, router outputs and router network interfaces.
 */
export const tagGlobalResource: API.OperationMethod<
  TagGlobalResourceRequest,
  TagGlobalResourceResponse,
  TagGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/global/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagGlobalResource",
})) as any;

export type TagResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn` in the current region. If existing tags on a resource are not specified in the request parameters, they are not changed. When a resource is deleted, the tags associated with that resource are deleted as well.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TakeRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associates a router input with a router output in AWS Elemental MediaConnect.
 */
export const takeRouterInput: API.OperationMethod<
  TakeRouterInputRequest,
  TakeRouterInputResponse,
  TakeRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/routerOutput/takeRouterInput/{RouterOutputArn}",
    input: {
      RouterOutputArn: 0,
      RouterInputArn: D.m({ wire: "routerInputArn" }),
    },
    output: {
      RoutedState: D.m({ wire: "routedState" }),
      RouterOutputArn: D.m({ wire: "routerOutputArn" }),
      RouterOutputName: D.m({ wire: "routerOutputName" }),
      RouterInputArn: D.m({ wire: "routerInputArn" }),
      RouterInputName: D.m({ wire: "routerInputName" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TakeRouterInput",
})) as any;

export type UntagGlobalResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags from a global resource in AWS Elemental MediaConnect. The API supports the following global resources: router inputs, router outputs and router network interfaces.
 */
export const untagGlobalResource: API.OperationMethod<
  UntagGlobalResourceRequest,
  UntagGlobalResourceResponse,
  UntagGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/global/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagGlobalResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes specified tags from a resource in the current region.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateBridgeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the bridge.
 */
export const updateBridge: API.OperationMethod<
  UpdateBridgeRequest,
  UpdateBridgeResponse,
  UpdateBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/bridges/{BridgeArn}",
    input: {
      BridgeArn: 0,
      EgressGatewayBridge: D.m({
        wire: "egressGatewayBridge",
        shape: { MaxBitrate: D.m({ wire: "maxBitrate" }) },
      }),
      IngressGatewayBridge: D.m({
        wire: "ingressGatewayBridge",
        shape: {
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          MaxOutputs: D.m({ wire: "maxOutputs" }),
        },
      }),
      SourceFailoverConfig: D.m({
        wire: "sourceFailoverConfig",
        shape: i_UpdateFailoverConfig,
      }),
    },
    output: { Bridge: D.m({ wire: "bridge", shape: o_Bridge }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBridge",
})) as any;

export type UpdateBridgeOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing bridge output.
 */
export const updateBridgeOutput: API.OperationMethod<
  UpdateBridgeOutputRequest,
  UpdateBridgeOutputResponse,
  UpdateBridgeOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/bridges/{BridgeArn}/outputs/{OutputName}",
    input: {
      BridgeArn: 0,
      NetworkOutput: D.m({
        wire: "networkOutput",
        shape: {
          IpAddress: D.m({ wire: "ipAddress" }),
          NetworkName: D.m({ wire: "networkName" }),
          Port: D.m({ wire: "port" }),
          Protocol: D.m({ wire: "protocol" }),
          Ttl: D.m({ wire: "ttl" }),
        },
      }),
      OutputName: 0,
    },
    output: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      Output: D.m({ wire: "output", shape: o_BridgeOutput }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBridgeOutput",
})) as any;

export type UpdateBridgeSourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing bridge source.
 */
export const updateBridgeSource: API.OperationMethod<
  UpdateBridgeSourceRequest,
  UpdateBridgeSourceResponse,
  UpdateBridgeSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/bridges/{BridgeArn}/sources/{SourceName}",
    input: {
      BridgeArn: 0,
      FlowSource: D.m({
        wire: "flowSource",
        shape: {
          FlowArn: D.m({ wire: "flowArn" }),
          FlowVpcInterfaceAttachment: D.m({
            wire: "flowVpcInterfaceAttachment",
            shape: i_VpcInterfaceAttachment,
          }),
        },
      }),
      NetworkSource: D.m({
        wire: "networkSource",
        shape: {
          MulticastIp: D.m({ wire: "multicastIp" }),
          MulticastSourceSettings: D.m({
            wire: "multicastSourceSettings",
            shape: i_MulticastSourceSettings,
          }),
          NetworkName: D.m({ wire: "networkName" }),
          Port: D.m({ wire: "port" }),
          Protocol: D.m({ wire: "protocol" }),
        },
      }),
      SourceName: 0,
    },
    output: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      Source: D.m({ wire: "source", shape: o_BridgeSource }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBridgeSource",
})) as any;

export type UpdateBridgeStateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the bridge state.
 */
export const updateBridgeState: API.OperationMethod<
  UpdateBridgeStateRequest,
  UpdateBridgeStateResponse,
  UpdateBridgeStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/bridges/{BridgeArn}/state",
    input: { BridgeArn: 0, DesiredState: D.m({ wire: "desiredState" }) },
    output: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      DesiredState: D.m({ wire: "desiredState" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBridgeState",
})) as any;

export type UpdateFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing flow.
 *
 * Because `UpdateFlowSources` and `UpdateFlow` are separate operations, you can't change both the source type AND the flow size in a single request.
 *
 * - If you have a `MEDIUM` flow and you want to change the flow source to NDI®:
 *
 * - First, use the `UpdateFlow` operation to upgrade the flow size to `LARGE`.
 *
 * - After that, you can then use the `UpdateFlowSource` operation to configure the NDI source.
 *
 * - If you're switching from an NDI source to a transport stream (TS) source and want to downgrade the flow size:
 *
 * - First, use the `UpdateFlowSource` operation to change the flow source type.
 *
 * - After that, you can then use the `UpdateFlow` operation to downgrade the flow size to `MEDIUM`.
 */
export const updateFlow: API.OperationMethod<
  UpdateFlowRequest,
  UpdateFlowResponse,
  UpdateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/flows/{FlowArn}",
    input: {
      FlowArn: 0,
      SourceFailoverConfig: D.m({
        wire: "sourceFailoverConfig",
        shape: i_UpdateFailoverConfig,
      }),
      Maintenance: D.m({
        wire: "maintenance",
        shape: {
          MaintenanceDay: D.m({ wire: "maintenanceDay" }),
          MaintenanceScheduledDate: D.m({ wire: "maintenanceScheduledDate" }),
          MaintenanceStartHour: D.m({ wire: "maintenanceStartHour" }),
        },
      }),
      SourceMonitoringConfig: D.m({
        wire: "sourceMonitoringConfig",
        shape: i_MonitoringConfig,
      }),
      NdiConfig: D.m({ wire: "ndiConfig", shape: i_NdiConfig }),
      FlowSize: D.m({ wire: "flowSize" }),
      EncodingConfig: D.m({ wire: "encodingConfig", shape: i_EncodingConfig }),
    },
    output: { Flow: D.m({ wire: "flow", shape: o_Flow }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlow",
})) as any;

export type UpdateFlowEntitlementError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an entitlement. You can change an entitlement's description, subscribers, and encryption. If you change the subscribers, the service will remove the outputs that are are used by the subscribers that are removed.
 */
export const updateFlowEntitlement: API.OperationMethod<
  UpdateFlowEntitlementRequest,
  UpdateFlowEntitlementResponse,
  UpdateFlowEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/flows/{FlowArn}/entitlements/{EntitlementArn}",
    input: {
      Description: D.m({ wire: "description" }),
      Encryption: D.m({ wire: "encryption", shape: i_UpdateEncryption }),
      EntitlementArn: 0,
      EntitlementStatus: D.m({ wire: "entitlementStatus" }),
      FlowArn: 0,
      Subscribers: D.m({ wire: "subscribers" }),
    },
    output: {
      Entitlement: D.m({ wire: "entitlement", shape: o_Entitlement }),
      FlowArn: D.m({ wire: "flowArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowEntitlement",
})) as any;

export type UpdateFlowMediaStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing media stream.
 */
export const updateFlowMediaStream: API.OperationMethod<
  UpdateFlowMediaStreamRequest,
  UpdateFlowMediaStreamResponse,
  UpdateFlowMediaStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/flows/{FlowArn}/mediaStreams/{MediaStreamName}",
    input: {
      Attributes: D.m({
        wire: "attributes",
        shape: i_MediaStreamAttributesRequest,
      }),
      ClockRate: D.m({ wire: "clockRate" }),
      Description: D.m({ wire: "description" }),
      FlowArn: 0,
      MediaStreamName: 0,
      MediaStreamType: D.m({ wire: "mediaStreamType" }),
      VideoFormat: D.m({ wire: "videoFormat" }),
    },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      MediaStream: D.m({ wire: "mediaStream", shape: o_MediaStream }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowMediaStream",
})) as any;

export type UpdateFlowOutputError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing flow output.
 */
export const updateFlowOutput: API.OperationMethod<
  UpdateFlowOutputRequest,
  UpdateFlowOutputResponse,
  UpdateFlowOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/flows/{FlowArn}/outputs/{OutputArn}",
    input: {
      CidrAllowList: D.m({ wire: "cidrAllowList" }),
      Description: D.m({ wire: "description" }),
      Destination: D.m({ wire: "destination" }),
      Encryption: D.m({ wire: "encryption", shape: i_UpdateEncryption }),
      FlowArn: 0,
      MaxLatency: D.m({ wire: "maxLatency" }),
      MediaStreamOutputConfigurations: D.m({
        wire: "mediaStreamOutputConfigurations",
        shape: D.list(i_MediaStreamOutputConfigurationRequest),
      }),
      MinLatency: D.m({ wire: "minLatency" }),
      OutputArn: 0,
      Port: D.m({ wire: "port" }),
      Protocol: D.m({ wire: "protocol" }),
      RemoteId: D.m({ wire: "remoteId" }),
      SenderControlPort: D.m({ wire: "senderControlPort" }),
      SenderIpAddress: D.m({ wire: "senderIpAddress" }),
      SmoothingLatency: D.m({ wire: "smoothingLatency" }),
      StreamId: D.m({ wire: "streamId" }),
      VpcInterfaceAttachment: D.m({
        wire: "vpcInterfaceAttachment",
        shape: i_VpcInterfaceAttachment,
      }),
      OutputStatus: D.m({ wire: "outputStatus" }),
      NdiProgramName: D.m({ wire: "ndiProgramName" }),
      NdiSpeedHqQuality: D.m({ wire: "ndiSpeedHqQuality" }),
      RouterIntegrationState: D.m({ wire: "routerIntegrationState" }),
      RouterIntegrationTransitEncryption: D.m({
        wire: "routerIntegrationTransitEncryption",
        shape: i_FlowTransitEncryption,
      }),
      NdiOutputTimecodeSource: D.m({ wire: "ndiOutputTimecodeSource" }),
    },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      Output: D.m({ wire: "output", shape: o_Output }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowOutput",
})) as any;

export type UpdateFlowSourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the source of a flow.
 *
 * Because `UpdateFlowSources` and `UpdateFlow` are separate operations, you can't change both the source type AND the flow size in a single request.
 *
 * - If you have a `MEDIUM` flow and you want to change the flow source to NDI®:
 *
 * - First, use the `UpdateFlow` operation to upgrade the flow size to `LARGE`.
 *
 * - After that, you can then use the `UpdateFlowSource` operation to configure the NDI source.
 *
 * - If you're switching from an NDI source to a transport stream (TS) source and want to downgrade the flow size:
 *
 * - First, use the `UpdateFlowSource` operation to change the flow source type.
 *
 * - After that, you can then use the `UpdateFlow` operation to downgrade the flow size to `MEDIUM`.
 */
export const updateFlowSource: API.OperationMethod<
  UpdateFlowSourceRequest,
  UpdateFlowSourceResponse,
  UpdateFlowSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/flows/{FlowArn}/source/{SourceArn}",
    input: {
      Decryption: D.m({ wire: "decryption", shape: i_UpdateEncryption }),
      Description: D.m({ wire: "description" }),
      EntitlementArn: D.m({ wire: "entitlementArn" }),
      FlowArn: 0,
      IngestPort: D.m({ wire: "ingestPort" }),
      MaxBitrate: D.m({ wire: "maxBitrate" }),
      MaxLatency: D.m({ wire: "maxLatency" }),
      MaxSyncBuffer: D.m({ wire: "maxSyncBuffer" }),
      MediaStreamSourceConfigurations: D.m({
        wire: "mediaStreamSourceConfigurations",
        shape: D.list(i_MediaStreamSourceConfigurationRequest),
      }),
      MinLatency: D.m({ wire: "minLatency" }),
      Protocol: D.m({ wire: "protocol" }),
      SenderControlPort: D.m({ wire: "senderControlPort" }),
      SenderIpAddress: D.m({ wire: "senderIpAddress" }),
      SourceArn: 0,
      SourceListenerAddress: D.m({ wire: "sourceListenerAddress" }),
      SourceListenerPort: D.m({ wire: "sourceListenerPort" }),
      StreamId: D.m({ wire: "streamId" }),
      VpcInterfaceName: D.m({ wire: "vpcInterfaceName" }),
      WhitelistCidr: D.m({ wire: "whitelistCidr" }),
      GatewayBridgeSource: D.m({
        wire: "gatewayBridgeSource",
        shape: {
          BridgeArn: D.m({ wire: "bridgeArn" }),
          VpcInterfaceAttachment: D.m({
            wire: "vpcInterfaceAttachment",
            shape: i_VpcInterfaceAttachment,
          }),
        },
      }),
      NdiSourceSettings: D.m({
        wire: "ndiSourceSettings",
        shape: i_NdiSourceSettings,
      }),
      RouterIntegrationState: D.m({ wire: "routerIntegrationState" }),
      RouterIntegrationTransitDecryption: D.m({
        wire: "routerIntegrationTransitDecryption",
        shape: i_FlowTransitEncryption,
      }),
    },
    output: {
      FlowArn: D.m({ wire: "flowArn" }),
      Source: D.m({ wire: "source", shape: o_Source }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowSource",
})) as any;

export type UpdateGatewayInstanceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing gateway instance.
 */
export const updateGatewayInstance: API.OperationMethod<
  UpdateGatewayInstanceRequest,
  UpdateGatewayInstanceResponse,
  UpdateGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/gateway-instances/{GatewayInstanceArn}",
    input: {
      BridgePlacement: D.m({ wire: "bridgePlacement" }),
      GatewayInstanceArn: 0,
    },
    output: {
      BridgePlacement: D.m({ wire: "bridgePlacement" }),
      GatewayInstanceArn: D.m({ wire: "gatewayInstanceArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayInstance",
})) as any;

export type UpdateRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing router input in AWS Elemental MediaConnect.
 */
export const updateRouterInput: API.OperationMethod<
  UpdateRouterInputRequest,
  UpdateRouterInputResponse,
  UpdateRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/routerInput/{Arn}",
    input: {
      Arn: 0,
      Name: D.m({ wire: "name" }),
      Configuration: D.m({
        wire: "configuration",
        shape: i_RouterInputConfiguration,
      }),
      MaximumBitrate: D.m({ wire: "maximumBitrate" }),
      RoutingScope: D.m({ wire: "routingScope" }),
      Tier: D.m({ wire: "tier" }),
      TransitEncryption: D.m({
        wire: "transitEncryption",
        shape: i_RouterInputTransitEncryption,
      }),
      MaintenanceConfiguration: D.m({
        wire: "maintenanceConfiguration",
        shape: i_MaintenanceConfiguration,
      }),
      ContentQualityAnalysisConfiguration: D.m({
        wire: "contentQualityAnalysisConfiguration",
        shape: i_RouterContentQualityAnalysisConfiguration,
      }),
    },
    output: { RouterInput: D.m({ wire: "routerInput", shape: o_RouterInput }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouterInput",
})) as any;

export type UpdateRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing router network interface in AWS Elemental MediaConnect.
 */
export const updateRouterNetworkInterface: API.OperationMethod<
  UpdateRouterNetworkInterfaceRequest,
  UpdateRouterNetworkInterfaceResponse,
  UpdateRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/routerNetworkInterface/{Arn}",
    input: {
      Arn: 0,
      Name: D.m({ wire: "name" }),
      Configuration: D.m({
        wire: "configuration",
        shape: i_RouterNetworkInterfaceConfiguration,
      }),
    },
    output: {
      RouterNetworkInterface: D.m({
        wire: "routerNetworkInterface",
        shape: o_RouterNetworkInterface,
      }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouterNetworkInterface",
})) as any;

export type UpdateRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing router output in AWS Elemental MediaConnect.
 */
export const updateRouterOutput: API.OperationMethod<
  UpdateRouterOutputRequest,
  UpdateRouterOutputResponse,
  UpdateRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/routerOutput/{Arn}",
    input: {
      Arn: 0,
      Name: D.m({ wire: "name" }),
      Configuration: D.m({
        wire: "configuration",
        shape: i_RouterOutputConfiguration,
      }),
      MaximumBitrate: D.m({ wire: "maximumBitrate" }),
      RoutingScope: D.m({ wire: "routingScope" }),
      Tier: D.m({ wire: "tier" }),
      MaintenanceConfiguration: D.m({
        wire: "maintenanceConfiguration",
        shape: i_MaintenanceConfiguration,
      }),
      FabricConfiguration: D.m({
        wire: "fabricConfiguration",
        shape: i_FabricConfiguration,
      }),
    },
    output: {
      RouterOutput: D.m({ wire: "routerOutput", shape: o_RouterOutput }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouterOutput",
})) as any;

const i_AddBridgeOutputRequest: D.LazyStruct = () => ({
  NetworkOutput: D.m({
    wire: "networkOutput",
    shape: {
      IpAddress: D.m({ wire: "ipAddress" }),
      Name: D.m({ wire: "name" }),
      NetworkName: D.m({ wire: "networkName" }),
      Port: D.m({ wire: "port" }),
      Protocol: D.m({ wire: "protocol" }),
      Ttl: D.m({ wire: "ttl" }),
    },
  }),
});
const i_AddBridgeSourceRequest: D.LazyStruct = () => ({
  FlowSource: D.m({
    wire: "flowSource",
    shape: {
      FlowArn: D.m({ wire: "flowArn" }),
      FlowVpcInterfaceAttachment: D.m({
        wire: "flowVpcInterfaceAttachment",
        shape: i_VpcInterfaceAttachment,
      }),
      Name: D.m({ wire: "name" }),
    },
  }),
  NetworkSource: D.m({
    wire: "networkSource",
    shape: {
      MulticastIp: D.m({ wire: "multicastIp" }),
      MulticastSourceSettings: D.m({
        wire: "multicastSourceSettings",
        shape: i_MulticastSourceSettings,
      }),
      Name: D.m({ wire: "name" }),
      NetworkName: D.m({ wire: "networkName" }),
      Port: D.m({ wire: "port" }),
      Protocol: D.m({ wire: "protocol" }),
    },
  }),
});
const i_AddMediaStreamRequest: D.LazyStruct = () => ({
  Attributes: D.m({
    wire: "attributes",
    shape: i_MediaStreamAttributesRequest,
  }),
  ClockRate: D.m({ wire: "clockRate" }),
  Description: D.m({ wire: "description" }),
  MediaStreamId: D.m({ wire: "mediaStreamId" }),
  MediaStreamName: D.m({ wire: "mediaStreamName" }),
  MediaStreamType: D.m({ wire: "mediaStreamType" }),
  VideoFormat: D.m({ wire: "videoFormat" }),
  MediaStreamTags: D.m({ wire: "mediaStreamTags" }),
});
const i_AddOutputRequest: D.LazyStruct = () => ({
  CidrAllowList: D.m({ wire: "cidrAllowList" }),
  Description: D.m({ wire: "description" }),
  Destination: D.m({ wire: "destination" }),
  Encryption: D.m({ wire: "encryption", shape: i_Encryption }),
  MaxLatency: D.m({ wire: "maxLatency" }),
  MediaStreamOutputConfigurations: D.m({
    wire: "mediaStreamOutputConfigurations",
    shape: D.list(i_MediaStreamOutputConfigurationRequest),
  }),
  MinLatency: D.m({ wire: "minLatency" }),
  Name: D.m({ wire: "name" }),
  Port: D.m({ wire: "port" }),
  Protocol: D.m({ wire: "protocol" }),
  RemoteId: D.m({ wire: "remoteId" }),
  SenderControlPort: D.m({ wire: "senderControlPort" }),
  SmoothingLatency: D.m({ wire: "smoothingLatency" }),
  StreamId: D.m({ wire: "streamId" }),
  VpcInterfaceAttachment: D.m({
    wire: "vpcInterfaceAttachment",
    shape: i_VpcInterfaceAttachment,
  }),
  OutputStatus: D.m({ wire: "outputStatus" }),
  NdiSpeedHqQuality: D.m({ wire: "ndiSpeedHqQuality" }),
  NdiProgramName: D.m({ wire: "ndiProgramName" }),
  OutputTags: D.m({ wire: "outputTags" }),
  RouterIntegrationState: D.m({ wire: "routerIntegrationState" }),
  RouterIntegrationTransitEncryption: D.m({
    wire: "routerIntegrationTransitEncryption",
    shape: i_FlowTransitEncryption,
  }),
  NdiOutputTimecodeSource: D.m({ wire: "ndiOutputTimecodeSource" }),
});
const i_EncodingConfig: D.LazyStruct = () => ({
  EncodingProfile: D.m({ wire: "encodingProfile" }),
  VideoMaxBitrate: D.m({ wire: "videoMaxBitrate" }),
});
const i_FabricConfiguration: D.LazyStruct = () => ({
  RecoveryLatencyMode: D.m({ wire: "recoveryLatencyMode" }),
});
const i_FailoverConfig: D.LazyStruct = () => ({
  FailoverMode: D.m({ wire: "failoverMode" }),
  RecoveryWindow: D.m({ wire: "recoveryWindow" }),
  SourcePriority: D.m({ wire: "sourcePriority", shape: i_SourcePriority }),
  State: D.m({ wire: "state" }),
});
const i_FlowTransitEncryption: D.LazyStruct = () => ({
  EncryptionKeyType: D.m({ wire: "encryptionKeyType" }),
  EncryptionKeyConfiguration: D.m({
    wire: "encryptionKeyConfiguration",
    shape: {
      SecretsManager: D.m({
        wire: "secretsManager",
        shape: i_SecretsManagerEncryptionKeyConfiguration,
      }),
      Automatic: D.m({
        wire: "automatic",
        shape: i_AutomaticEncryptionKeyConfiguration,
      }),
    },
  }),
});
const i_GrantEntitlementRequest: D.LazyStruct = () => ({
  DataTransferSubscriberFeePercent: D.m({
    wire: "dataTransferSubscriberFeePercent",
  }),
  Description: D.m({ wire: "description" }),
  Encryption: D.m({ wire: "encryption", shape: i_Encryption }),
  EntitlementStatus: D.m({ wire: "entitlementStatus" }),
  Name: D.m({ wire: "name" }),
  Subscribers: D.m({ wire: "subscribers" }),
  EntitlementTags: D.m({ wire: "entitlementTags" }),
});
const i_MaintenanceConfiguration: D.LazyStruct = () => ({
  PreferredDayTime: D.m({
    wire: "preferredDayTime",
    shape: { Day: D.m({ wire: "day" }), Time: D.m({ wire: "time" }) },
  }),
  Default: D.m({ wire: "default", shape: {} }),
});
const i_MediaStreamAttributesRequest: D.LazyStruct = () => ({
  Fmtp: D.m({
    wire: "fmtp",
    shape: {
      ChannelOrder: D.m({ wire: "channelOrder" }),
      Colorimetry: D.m({ wire: "colorimetry" }),
      ExactFramerate: D.m({ wire: "exactFramerate" }),
      Par: D.m({ wire: "par" }),
      Range: D.m({ wire: "range" }),
      ScanMode: D.m({ wire: "scanMode" }),
      Tcs: D.m({ wire: "tcs" }),
    },
  }),
  Lang: D.m({ wire: "lang" }),
});
const i_MediaStreamOutputConfigurationRequest: D.LazyStruct = () => ({
  DestinationConfigurations: D.m({
    wire: "destinationConfigurations",
    shape: D.list({
      DestinationIp: D.m({ wire: "destinationIp" }),
      DestinationPort: D.m({ wire: "destinationPort" }),
      Interface: D.m({ wire: "interface", shape: i_InterfaceRequest }),
    }),
  }),
  EncodingName: D.m({ wire: "encodingName" }),
  EncodingParameters: D.m({
    wire: "encodingParameters",
    shape: {
      CompressionFactor: D.m({ wire: "compressionFactor" }),
      EncoderProfile: D.m({ wire: "encoderProfile" }),
    },
  }),
  MediaStreamName: D.m({ wire: "mediaStreamName" }),
});
const i_MediaStreamSourceConfigurationRequest: D.LazyStruct = () => ({
  EncodingName: D.m({ wire: "encodingName" }),
  InputConfigurations: D.m({
    wire: "inputConfigurations",
    shape: D.list({
      InputPort: D.m({ wire: "inputPort" }),
      Interface: D.m({ wire: "interface", shape: i_InterfaceRequest }),
    }),
  }),
  MediaStreamName: D.m({ wire: "mediaStreamName" }),
});
const i_MonitoringConfig: D.LazyStruct = () => ({
  ThumbnailState: D.m({ wire: "thumbnailState" }),
  AudioMonitoringSettings: D.m({
    wire: "audioMonitoringSettings",
    shape: D.list({
      SilentAudio: D.m({
        wire: "silentAudio",
        shape: {
          State: D.m({ wire: "state" }),
          ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
        },
      }),
    }),
  }),
  ContentQualityAnalysisState: D.m({ wire: "contentQualityAnalysisState" }),
  VideoMonitoringSettings: D.m({
    wire: "videoMonitoringSettings",
    shape: D.list({
      BlackFrames: D.m({
        wire: "blackFrames",
        shape: {
          State: D.m({ wire: "state" }),
          ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
        },
      }),
      FrozenFrames: D.m({
        wire: "frozenFrames",
        shape: {
          State: D.m({ wire: "state" }),
          ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
        },
      }),
    }),
  }),
});
const i_MulticastSourceSettings: D.LazyStruct = () => ({
  MulticastSourceIp: D.m({ wire: "multicastSourceIp" }),
});
const i_NdiConfig: D.LazyStruct = () => ({
  NdiState: D.m({ wire: "ndiState" }),
  MachineName: D.m({ wire: "machineName" }),
  NdiDiscoveryServers: D.m({
    wire: "ndiDiscoveryServers",
    shape: D.list({
      DiscoveryServerAddress: D.m({ wire: "discoveryServerAddress" }),
      DiscoveryServerPort: D.m({ wire: "discoveryServerPort" }),
      VpcInterfaceAdapter: D.m({ wire: "vpcInterfaceAdapter" }),
    }),
  }),
});
const i_NdiSourceSettings: D.LazyStruct = () => ({
  SourceName: D.m({ wire: "sourceName" }),
});
const i_RouterContentQualityAnalysisConfiguration: D.LazyStruct = () => ({
  ContentLevel: D.m({
    wire: "contentLevel",
    shape: {
      BlackFrames: D.m({
        wire: "blackFrames",
        shape: {
          State: D.m({ wire: "state" }),
          ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
        },
      }),
      FrozenFrames: D.m({
        wire: "frozenFrames",
        shape: {
          State: D.m({ wire: "state" }),
          ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
        },
      }),
      SilentAudio: D.m({
        wire: "silentAudio",
        shape: {
          State: D.m({ wire: "state" }),
          ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
        },
      }),
    },
  }),
});
const i_RouterInputConfiguration: D.LazyStruct = () => ({
  Standard: D.m({
    wire: "standard",
    shape: {
      NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
      ProtocolConfiguration: D.m({
        wire: "protocolConfiguration",
        shape: {
          Rist: D.m({ wire: "rist", shape: i_RistRouterInputConfiguration }),
          SrtListener: D.m({
            wire: "srtListener",
            shape: i_SrtListenerRouterInputConfiguration,
          }),
          SrtCaller: D.m({
            wire: "srtCaller",
            shape: i_SrtCallerRouterInputConfiguration,
          }),
          Rtp: D.m({ wire: "rtp", shape: i_RtpRouterInputConfiguration }),
        },
      }),
      Protocol: D.m({ wire: "protocol" }),
    },
  }),
  MediaLiveChannel: D.m({
    wire: "mediaLiveChannel",
    shape: {
      MediaLiveChannelArn: D.m({ wire: "mediaLiveChannelArn" }),
      MediaLivePipelineId: D.m({ wire: "mediaLivePipelineId" }),
      MediaLiveChannelOutputName: D.m({ wire: "mediaLiveChannelOutputName" }),
      SourceTransitDecryption: D.m({
        wire: "sourceTransitDecryption",
        shape: i_MediaLiveTransitEncryption,
      }),
    },
  }),
  Failover: D.m({
    wire: "failover",
    shape: {
      NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
      ProtocolConfigurations: D.m({
        wire: "protocolConfigurations",
        shape: D.list({
          Rist: D.m({ wire: "rist", shape: i_RistRouterInputConfiguration }),
          SrtListener: D.m({
            wire: "srtListener",
            shape: i_SrtListenerRouterInputConfiguration,
          }),
          SrtCaller: D.m({
            wire: "srtCaller",
            shape: i_SrtCallerRouterInputConfiguration,
          }),
          Rtp: D.m({ wire: "rtp", shape: i_RtpRouterInputConfiguration }),
        }),
      }),
      SourcePriorityMode: D.m({ wire: "sourcePriorityMode" }),
      PrimarySourceIndex: D.m({ wire: "primarySourceIndex" }),
    },
  }),
  MediaConnectFlow: D.m({
    wire: "mediaConnectFlow",
    shape: {
      FlowArn: D.m({ wire: "flowArn" }),
      FlowOutputArn: D.m({ wire: "flowOutputArn" }),
      SourceTransitDecryption: D.m({
        wire: "sourceTransitDecryption",
        shape: i_FlowTransitEncryption,
      }),
    },
  }),
  Merge: D.m({
    wire: "merge",
    shape: {
      NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
      ProtocolConfigurations: D.m({
        wire: "protocolConfigurations",
        shape: D.list({
          Rtp: D.m({ wire: "rtp", shape: i_RtpRouterInputConfiguration }),
          Rist: D.m({ wire: "rist", shape: i_RistRouterInputConfiguration }),
        }),
      }),
      MergeRecoveryWindowMilliseconds: D.m({
        wire: "mergeRecoveryWindowMilliseconds",
      }),
    },
  }),
});
const i_RouterInputTransitEncryption: D.LazyStruct = () => ({
  EncryptionKeyType: D.m({ wire: "encryptionKeyType" }),
  EncryptionKeyConfiguration: D.m({
    wire: "encryptionKeyConfiguration",
    shape: {
      SecretsManager: D.m({
        wire: "secretsManager",
        shape: i_SecretsManagerEncryptionKeyConfiguration,
      }),
      Automatic: D.m({
        wire: "automatic",
        shape: i_AutomaticEncryptionKeyConfiguration,
      }),
    },
  }),
});
const i_RouterNetworkInterfaceConfiguration: D.LazyStruct = () => ({
  Public: D.m({
    wire: "public",
    shape: {
      AllowRules: D.m({
        wire: "allowRules",
        shape: D.list({ Cidr: D.m({ wire: "cidr" }) }),
      }),
    },
  }),
  Vpc: D.m({
    wire: "vpc",
    shape: {
      SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
      SubnetId: D.m({ wire: "subnetId" }),
    },
  }),
});
const i_RouterOutputConfiguration: D.LazyStruct = () => ({
  Standard: D.m({
    wire: "standard",
    shape: {
      NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
      ProtocolConfiguration: D.m({
        wire: "protocolConfiguration",
        shape: {
          Rist: D.m({
            wire: "rist",
            shape: {
              DestinationAddress: D.m({ wire: "destinationAddress" }),
              DestinationPort: D.m({ wire: "destinationPort" }),
            },
          }),
          SrtListener: D.m({
            wire: "srtListener",
            shape: {
              Port: D.m({ wire: "port" }),
              MinimumLatencyMilliseconds: D.m({
                wire: "minimumLatencyMilliseconds",
              }),
              EncryptionConfiguration: D.m({
                wire: "encryptionConfiguration",
                shape: i_SrtEncryptionConfiguration,
              }),
            },
          }),
          SrtCaller: D.m({
            wire: "srtCaller",
            shape: {
              DestinationAddress: D.m({ wire: "destinationAddress" }),
              DestinationPort: D.m({ wire: "destinationPort" }),
              MinimumLatencyMilliseconds: D.m({
                wire: "minimumLatencyMilliseconds",
              }),
              StreamId: D.m({ wire: "streamId" }),
              EncryptionConfiguration: D.m({
                wire: "encryptionConfiguration",
                shape: i_SrtEncryptionConfiguration,
              }),
            },
          }),
          Rtp: D.m({
            wire: "rtp",
            shape: {
              DestinationAddress: D.m({ wire: "destinationAddress" }),
              DestinationPort: D.m({ wire: "destinationPort" }),
              ForwardErrorCorrection: D.m({ wire: "forwardErrorCorrection" }),
            },
          }),
        },
      }),
      Protocol: D.m({ wire: "protocol" }),
    },
  }),
  MediaConnectFlow: D.m({
    wire: "mediaConnectFlow",
    shape: {
      FlowArn: D.m({ wire: "flowArn" }),
      FlowSourceArn: D.m({ wire: "flowSourceArn" }),
      DestinationTransitEncryption: D.m({
        wire: "destinationTransitEncryption",
        shape: i_FlowTransitEncryption,
      }),
    },
  }),
  MediaLiveInput: D.m({
    wire: "mediaLiveInput",
    shape: {
      MediaLiveInputArn: D.m({ wire: "mediaLiveInputArn" }),
      MediaLivePipelineId: D.m({ wire: "mediaLivePipelineId" }),
      DestinationTransitEncryption: D.m({
        wire: "destinationTransitEncryption",
        shape: i_MediaLiveTransitEncryption,
      }),
    },
  }),
});
const i_SetSourceRequest: D.LazyStruct = () => ({
  Decryption: D.m({ wire: "decryption", shape: i_Encryption }),
  Description: D.m({ wire: "description" }),
  EntitlementArn: D.m({ wire: "entitlementArn" }),
  IngestPort: D.m({ wire: "ingestPort" }),
  MaxBitrate: D.m({ wire: "maxBitrate" }),
  MaxLatency: D.m({ wire: "maxLatency" }),
  MaxSyncBuffer: D.m({ wire: "maxSyncBuffer" }),
  MediaStreamSourceConfigurations: D.m({
    wire: "mediaStreamSourceConfigurations",
    shape: D.list(i_MediaStreamSourceConfigurationRequest),
  }),
  MinLatency: D.m({ wire: "minLatency" }),
  Name: D.m({ wire: "name" }),
  Protocol: D.m({ wire: "protocol" }),
  SenderControlPort: D.m({ wire: "senderControlPort" }),
  SenderIpAddress: D.m({ wire: "senderIpAddress" }),
  SourceListenerAddress: D.m({ wire: "sourceListenerAddress" }),
  SourceListenerPort: D.m({ wire: "sourceListenerPort" }),
  StreamId: D.m({ wire: "streamId" }),
  VpcInterfaceName: D.m({ wire: "vpcInterfaceName" }),
  WhitelistCidr: D.m({ wire: "whitelistCidr" }),
  GatewayBridgeSource: D.m({
    wire: "gatewayBridgeSource",
    shape: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      VpcInterfaceAttachment: D.m({
        wire: "vpcInterfaceAttachment",
        shape: i_VpcInterfaceAttachment,
      }),
    },
  }),
  NdiSourceSettings: D.m({
    wire: "ndiSourceSettings",
    shape: i_NdiSourceSettings,
  }),
  SourceTags: D.m({ wire: "sourceTags" }),
  RouterIntegrationState: D.m({ wire: "routerIntegrationState" }),
  RouterIntegrationTransitDecryption: D.m({
    wire: "routerIntegrationTransitDecryption",
    shape: i_FlowTransitEncryption,
  }),
});
const i_UpdateEncryption: D.LazyStruct = () => ({
  Algorithm: D.m({ wire: "algorithm" }),
  ConstantInitializationVector: D.m({ wire: "constantInitializationVector" }),
  DeviceId: D.m({ wire: "deviceId" }),
  KeyType: D.m({ wire: "keyType" }),
  Region: D.m({ wire: "region" }),
  ResourceId: D.m({ wire: "resourceId" }),
  RoleArn: D.m({ wire: "roleArn" }),
  SecretArn: D.m({ wire: "secretArn" }),
  Url: D.m({ wire: "url" }),
});
const i_UpdateFailoverConfig: D.LazyStruct = () => ({
  FailoverMode: D.m({ wire: "failoverMode" }),
  RecoveryWindow: D.m({ wire: "recoveryWindow" }),
  SourcePriority: D.m({ wire: "sourcePriority", shape: i_SourcePriority }),
  State: D.m({ wire: "state" }),
});
const i_VpcInterfaceAttachment: D.LazyStruct = () => ({
  VpcInterfaceName: D.m({ wire: "vpcInterfaceName" }),
});
const i_VpcInterfaceRequest: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
  NetworkInterfaceType: D.m({ wire: "networkInterfaceType" }),
  RoleArn: D.m({ wire: "roleArn" }),
  SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
  SubnetId: D.m({ wire: "subnetId" }),
  VpcInterfaceTags: D.m({ wire: "vpcInterfaceTags" }),
});
const o_Bridge: D.LazyStruct = () => ({
  BridgeArn: D.m({ wire: "bridgeArn" }),
  BridgeMessages: D.m({
    wire: "bridgeMessages",
    shape: D.list(o_MessageDetail),
  }),
  BridgeState: D.m({ wire: "bridgeState" }),
  EgressGatewayBridge: D.m({
    wire: "egressGatewayBridge",
    shape: {
      InstanceId: D.m({ wire: "instanceId" }),
      MaxBitrate: D.m({ wire: "maxBitrate" }),
    },
  }),
  IngressGatewayBridge: D.m({
    wire: "ingressGatewayBridge",
    shape: {
      InstanceId: D.m({ wire: "instanceId" }),
      MaxBitrate: D.m({ wire: "maxBitrate" }),
      MaxOutputs: D.m({ wire: "maxOutputs" }),
    },
  }),
  Name: D.m({ wire: "name" }),
  Outputs: D.m({ wire: "outputs", shape: D.list(o_BridgeOutput) }),
  PlacementArn: D.m({ wire: "placementArn" }),
  SourceFailoverConfig: D.m({
    wire: "sourceFailoverConfig",
    shape: o_FailoverConfig,
  }),
  Sources: D.m({ wire: "sources", shape: D.list(o_BridgeSource) }),
});
const o_BridgeOutput: D.LazyStruct = () => ({
  FlowOutput: D.m({
    wire: "flowOutput",
    shape: {
      FlowArn: D.m({ wire: "flowArn" }),
      FlowSourceArn: D.m({ wire: "flowSourceArn" }),
      Name: D.m({ wire: "name" }),
    },
  }),
  NetworkOutput: D.m({
    wire: "networkOutput",
    shape: {
      IpAddress: D.m({ wire: "ipAddress" }),
      Name: D.m({ wire: "name" }),
      NetworkName: D.m({ wire: "networkName" }),
      Port: D.m({ wire: "port" }),
      Protocol: D.m({ wire: "protocol" }),
      Ttl: D.m({ wire: "ttl" }),
    },
  }),
});
const o_BridgeSource: D.LazyStruct = () => ({
  FlowSource: D.m({
    wire: "flowSource",
    shape: {
      FlowArn: D.m({ wire: "flowArn" }),
      FlowVpcInterfaceAttachment: D.m({
        wire: "flowVpcInterfaceAttachment",
        shape: o_VpcInterfaceAttachment,
      }),
      Name: D.m({ wire: "name" }),
      OutputArn: D.m({ wire: "outputArn" }),
    },
  }),
  NetworkSource: D.m({
    wire: "networkSource",
    shape: {
      MulticastIp: D.m({ wire: "multicastIp" }),
      MulticastSourceSettings: D.m({
        wire: "multicastSourceSettings",
        shape: { MulticastSourceIp: D.m({ wire: "multicastSourceIp" }) },
      }),
      Name: D.m({ wire: "name" }),
      NetworkName: D.m({ wire: "networkName" }),
      Port: D.m({ wire: "port" }),
      Protocol: D.m({ wire: "protocol" }),
    },
  }),
});
const o_Entitlement: D.LazyStruct = () => ({
  DataTransferSubscriberFeePercent: D.m({
    wire: "dataTransferSubscriberFeePercent",
  }),
  Description: D.m({ wire: "description" }),
  Encryption: D.m({ wire: "encryption", shape: o_Encryption }),
  EntitlementArn: D.m({ wire: "entitlementArn" }),
  EntitlementStatus: D.m({ wire: "entitlementStatus" }),
  Name: D.m({ wire: "name" }),
  Subscribers: D.m({ wire: "subscribers" }),
});
const o_Flow: D.LazyStruct = () => ({
  AvailabilityZone: D.m({ wire: "availabilityZone" }),
  Description: D.m({ wire: "description" }),
  EgressIp: D.m({ wire: "egressIp" }),
  Entitlements: D.m({ wire: "entitlements", shape: D.list(o_Entitlement) }),
  FlowArn: D.m({ wire: "flowArn" }),
  MediaStreams: D.m({ wire: "mediaStreams", shape: D.list(o_MediaStream) }),
  Name: D.m({ wire: "name" }),
  Outputs: D.m({ wire: "outputs", shape: D.list(o_Output) }),
  Source: D.m({ wire: "source", shape: o_Source }),
  SourceFailoverConfig: D.m({
    wire: "sourceFailoverConfig",
    shape: o_FailoverConfig,
  }),
  Sources: D.m({ wire: "sources", shape: D.list(o_Source) }),
  Status: D.m({ wire: "status" }),
  VpcInterfaces: D.m({ wire: "vpcInterfaces", shape: D.list(o_VpcInterface) }),
  Maintenance: D.m({ wire: "maintenance", shape: o_Maintenance }),
  SourceMonitoringConfig: D.m({
    wire: "sourceMonitoringConfig",
    shape: {
      ThumbnailState: D.m({ wire: "thumbnailState" }),
      AudioMonitoringSettings: D.m({
        wire: "audioMonitoringSettings",
        shape: D.list({
          SilentAudio: D.m({
            wire: "silentAudio",
            shape: {
              State: D.m({ wire: "state" }),
              ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
            },
          }),
        }),
      }),
      ContentQualityAnalysisState: D.m({ wire: "contentQualityAnalysisState" }),
      VideoMonitoringSettings: D.m({
        wire: "videoMonitoringSettings",
        shape: D.list({
          BlackFrames: D.m({
            wire: "blackFrames",
            shape: {
              State: D.m({ wire: "state" }),
              ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
            },
          }),
          FrozenFrames: D.m({
            wire: "frozenFrames",
            shape: {
              State: D.m({ wire: "state" }),
              ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
            },
          }),
        }),
      }),
    },
  }),
  FlowSize: D.m({ wire: "flowSize" }),
  NdiConfig: D.m({
    wire: "ndiConfig",
    shape: {
      NdiState: D.m({ wire: "ndiState" }),
      MachineName: D.m({ wire: "machineName" }),
      NdiDiscoveryServers: D.m({
        wire: "ndiDiscoveryServers",
        shape: D.list({
          DiscoveryServerAddress: D.m({ wire: "discoveryServerAddress" }),
          DiscoveryServerPort: D.m({ wire: "discoveryServerPort" }),
          VpcInterfaceAdapter: D.m({ wire: "vpcInterfaceAdapter" }),
        }),
      }),
    },
  }),
  EncodingConfig: D.m({
    wire: "encodingConfig",
    shape: {
      EncodingProfile: D.m({ wire: "encodingProfile" }),
      VideoMaxBitrate: D.m({ wire: "videoMaxBitrate" }),
    },
  }),
});
const o_FrameResolution: D.LazyStruct = () => ({
  FrameHeight: D.m({ wire: "frameHeight" }),
  FrameWidth: D.m({ wire: "frameWidth" }),
});
const o_Gateway: D.LazyStruct = () => ({
  EgressCidrBlocks: D.m({ wire: "egressCidrBlocks" }),
  GatewayArn: D.m({ wire: "gatewayArn" }),
  GatewayMessages: D.m({
    wire: "gatewayMessages",
    shape: D.list(o_MessageDetail),
  }),
  GatewayState: D.m({ wire: "gatewayState" }),
  Name: D.m({ wire: "name" }),
  Networks: D.m({
    wire: "networks",
    shape: D.list({
      CidrBlock: D.m({ wire: "cidrBlock" }),
      Name: D.m({ wire: "name" }),
    }),
  }),
});
const o_Maintenance: D.LazyStruct = () => ({
  MaintenanceDay: D.m({ wire: "maintenanceDay" }),
  MaintenanceDeadline: D.m({ wire: "maintenanceDeadline" }),
  MaintenanceScheduledDate: D.m({ wire: "maintenanceScheduledDate" }),
  MaintenanceStartHour: D.m({ wire: "maintenanceStartHour" }),
});
const o_MaintenanceSchedule: D.LazyStruct = () => ({
  Window: D.m({
    wire: "window",
    shape: {
      Start: D.m({ wire: "start", shape: D.ts }),
      End: D.m({ wire: "end", shape: D.ts }),
      ScheduledTime: D.m({ wire: "scheduledTime", shape: D.ts }),
    },
  }),
});
const o_MediaStream: D.LazyStruct = () => ({
  Attributes: D.m({
    wire: "attributes",
    shape: {
      Fmtp: D.m({
        wire: "fmtp",
        shape: {
          ChannelOrder: D.m({ wire: "channelOrder" }),
          Colorimetry: D.m({ wire: "colorimetry" }),
          ExactFramerate: D.m({ wire: "exactFramerate" }),
          Par: D.m({ wire: "par" }),
          Range: D.m({ wire: "range" }),
          ScanMode: D.m({ wire: "scanMode" }),
          Tcs: D.m({ wire: "tcs" }),
        },
      }),
      Lang: D.m({ wire: "lang" }),
    },
  }),
  ClockRate: D.m({ wire: "clockRate" }),
  Description: D.m({ wire: "description" }),
  Fmt: D.m({ wire: "fmt" }),
  MediaStreamId: D.m({ wire: "mediaStreamId" }),
  MediaStreamName: D.m({ wire: "mediaStreamName" }),
  MediaStreamType: D.m({ wire: "mediaStreamType" }),
  VideoFormat: D.m({ wire: "videoFormat" }),
});
const o_MessageDetail: D.LazyStruct = () => ({
  Code: D.m({ wire: "code" }),
  Message: D.m({ wire: "message" }),
  ResourceName: D.m({ wire: "resourceName" }),
});
const o_NdiSourceInfo: D.LazyStruct = () => ({
  SourceName: D.m({ wire: "sourceName" }),
});
const o_Offering: D.LazyStruct = () => ({
  CurrencyCode: D.m({ wire: "currencyCode" }),
  Duration: D.m({ wire: "duration" }),
  DurationUnits: D.m({ wire: "durationUnits" }),
  OfferingArn: D.m({ wire: "offeringArn" }),
  OfferingDescription: D.m({ wire: "offeringDescription" }),
  PricePerUnit: D.m({ wire: "pricePerUnit" }),
  PriceUnits: D.m({ wire: "priceUnits" }),
  ResourceSpecification: D.m({
    wire: "resourceSpecification",
    shape: o_ResourceSpecification,
  }),
});
const o_Output: D.LazyStruct = () => ({
  DataTransferSubscriberFeePercent: D.m({
    wire: "dataTransferSubscriberFeePercent",
  }),
  Description: D.m({ wire: "description" }),
  Destination: D.m({ wire: "destination" }),
  Encryption: D.m({ wire: "encryption", shape: o_Encryption }),
  EntitlementArn: D.m({ wire: "entitlementArn" }),
  ListenerAddress: D.m({ wire: "listenerAddress" }),
  MediaLiveInputArn: D.m({ wire: "mediaLiveInputArn" }),
  MediaStreamOutputConfigurations: D.m({
    wire: "mediaStreamOutputConfigurations",
    shape: D.list({
      DestinationConfigurations: D.m({
        wire: "destinationConfigurations",
        shape: D.list({
          DestinationIp: D.m({ wire: "destinationIp" }),
          DestinationPort: D.m({ wire: "destinationPort" }),
          Interface: D.m({ wire: "interface", shape: o_Interface }),
          OutboundIp: D.m({ wire: "outboundIp" }),
        }),
      }),
      EncodingName: D.m({ wire: "encodingName" }),
      EncodingParameters: D.m({
        wire: "encodingParameters",
        shape: {
          CompressionFactor: D.m({ wire: "compressionFactor" }),
          EncoderProfile: D.m({ wire: "encoderProfile" }),
        },
      }),
      MediaStreamName: D.m({ wire: "mediaStreamName" }),
    }),
  }),
  Name: D.m({ wire: "name" }),
  OutputArn: D.m({ wire: "outputArn" }),
  Port: D.m({ wire: "port" }),
  Transport: D.m({ wire: "transport", shape: o_Transport }),
  VpcInterfaceAttachment: D.m({
    wire: "vpcInterfaceAttachment",
    shape: o_VpcInterfaceAttachment,
  }),
  BridgeArn: D.m({ wire: "bridgeArn" }),
  BridgePorts: D.m({ wire: "bridgePorts" }),
  OutputStatus: D.m({ wire: "outputStatus" }),
  PeerIpAddress: D.m({ wire: "peerIpAddress" }),
  RouterIntegrationState: D.m({ wire: "routerIntegrationState" }),
  RouterIntegrationTransitEncryption: D.m({
    wire: "routerIntegrationTransitEncryption",
    shape: o_FlowTransitEncryption,
  }),
  ConnectedRouterInputArn: D.m({ wire: "connectedRouterInputArn" }),
});
const o_Reservation: D.LazyStruct = () => ({
  CurrencyCode: D.m({ wire: "currencyCode" }),
  Duration: D.m({ wire: "duration" }),
  DurationUnits: D.m({ wire: "durationUnits" }),
  End: D.m({ wire: "end" }),
  OfferingArn: D.m({ wire: "offeringArn" }),
  OfferingDescription: D.m({ wire: "offeringDescription" }),
  PricePerUnit: D.m({ wire: "pricePerUnit" }),
  PriceUnits: D.m({ wire: "priceUnits" }),
  ReservationArn: D.m({ wire: "reservationArn" }),
  ReservationName: D.m({ wire: "reservationName" }),
  ReservationState: D.m({ wire: "reservationState" }),
  ResourceSpecification: D.m({
    wire: "resourceSpecification",
    shape: o_ResourceSpecification,
  }),
  Start: D.m({ wire: "start" }),
});
const o_RouterInput: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
  Arn: D.m({ wire: "arn" }),
  Id: D.m({ wire: "id" }),
  State: D.m({ wire: "state" }),
  InputType: D.m({ wire: "inputType" }),
  Configuration: D.m({
    wire: "configuration",
    shape: {
      Standard: D.m({
        wire: "standard",
        shape: {
          NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
          ProtocolConfiguration: D.m({
            wire: "protocolConfiguration",
            shape: {
              Rist: D.m({
                wire: "rist",
                shape: o_RistRouterInputConfiguration,
              }),
              SrtListener: D.m({
                wire: "srtListener",
                shape: o_SrtListenerRouterInputConfiguration,
              }),
              SrtCaller: D.m({
                wire: "srtCaller",
                shape: o_SrtCallerRouterInputConfiguration,
              }),
              Rtp: D.m({ wire: "rtp", shape: o_RtpRouterInputConfiguration }),
            },
          }),
          Protocol: D.m({ wire: "protocol" }),
        },
      }),
      MediaLiveChannel: D.m({
        wire: "mediaLiveChannel",
        shape: {
          MediaLiveChannelArn: D.m({ wire: "mediaLiveChannelArn" }),
          MediaLivePipelineId: D.m({ wire: "mediaLivePipelineId" }),
          MediaLiveChannelOutputName: D.m({
            wire: "mediaLiveChannelOutputName",
          }),
          SourceTransitDecryption: D.m({
            wire: "sourceTransitDecryption",
            shape: o_MediaLiveTransitEncryption,
          }),
        },
      }),
      Failover: D.m({
        wire: "failover",
        shape: {
          NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
          ProtocolConfigurations: D.m({
            wire: "protocolConfigurations",
            shape: D.list({
              Rist: D.m({
                wire: "rist",
                shape: o_RistRouterInputConfiguration,
              }),
              SrtListener: D.m({
                wire: "srtListener",
                shape: o_SrtListenerRouterInputConfiguration,
              }),
              SrtCaller: D.m({
                wire: "srtCaller",
                shape: o_SrtCallerRouterInputConfiguration,
              }),
              Rtp: D.m({ wire: "rtp", shape: o_RtpRouterInputConfiguration }),
            }),
          }),
          SourcePriorityMode: D.m({ wire: "sourcePriorityMode" }),
          PrimarySourceIndex: D.m({ wire: "primarySourceIndex" }),
        },
      }),
      MediaConnectFlow: D.m({
        wire: "mediaConnectFlow",
        shape: {
          FlowArn: D.m({ wire: "flowArn" }),
          FlowOutputArn: D.m({ wire: "flowOutputArn" }),
          SourceTransitDecryption: D.m({
            wire: "sourceTransitDecryption",
            shape: o_FlowTransitEncryption,
          }),
        },
      }),
      Merge: D.m({
        wire: "merge",
        shape: {
          NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
          ProtocolConfigurations: D.m({
            wire: "protocolConfigurations",
            shape: D.list({
              Rtp: D.m({ wire: "rtp", shape: o_RtpRouterInputConfiguration }),
              Rist: D.m({
                wire: "rist",
                shape: o_RistRouterInputConfiguration,
              }),
            }),
          }),
          MergeRecoveryWindowMilliseconds: D.m({
            wire: "mergeRecoveryWindowMilliseconds",
          }),
        },
      }),
    },
  }),
  RoutedOutputs: D.m({ wire: "routedOutputs" }),
  MaximumRoutedOutputs: D.m({ wire: "maximumRoutedOutputs" }),
  RegionName: D.m({ wire: "regionName" }),
  AvailabilityZone: D.m({ wire: "availabilityZone" }),
  MaximumBitrate: D.m({ wire: "maximumBitrate" }),
  Tier: D.m({ wire: "tier" }),
  RoutingScope: D.m({ wire: "routingScope" }),
  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
  UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
  Messages: D.m({ wire: "messages", shape: D.list(o_RouterInputMessage) }),
  TransitEncryption: D.m({
    wire: "transitEncryption",
    shape: {
      EncryptionKeyType: D.m({ wire: "encryptionKeyType" }),
      EncryptionKeyConfiguration: D.m({
        wire: "encryptionKeyConfiguration",
        shape: {
          SecretsManager: D.m({
            wire: "secretsManager",
            shape: o_SecretsManagerEncryptionKeyConfiguration,
          }),
          Automatic: D.m({ wire: "automatic" }),
        },
      }),
    },
  }),
  Tags: D.m({ wire: "tags" }),
  StreamDetails: D.m({
    wire: "streamDetails",
    shape: {
      Standard: D.m({
        wire: "standard",
        shape: { SourceIpAddress: D.m({ wire: "sourceIpAddress" }) },
      }),
      MediaLiveChannel: D.m({ wire: "mediaLiveChannel" }),
      Failover: D.m({
        wire: "failover",
        shape: {
          SourceIndexZeroStreamDetails: D.m({
            wire: "sourceIndexZeroStreamDetails",
            shape: o_FailoverRouterInputIndexedStreamDetails,
          }),
          SourceIndexOneStreamDetails: D.m({
            wire: "sourceIndexOneStreamDetails",
            shape: o_FailoverRouterInputIndexedStreamDetails,
          }),
        },
      }),
      MediaConnectFlow: D.m({ wire: "mediaConnectFlow" }),
      Merge: D.m({
        wire: "merge",
        shape: {
          SourceIndexZeroStreamDetails: D.m({
            wire: "sourceIndexZeroStreamDetails",
            shape: o_MergeRouterInputIndexedStreamDetails,
          }),
          SourceIndexOneStreamDetails: D.m({
            wire: "sourceIndexOneStreamDetails",
            shape: o_MergeRouterInputIndexedStreamDetails,
          }),
        },
      }),
    },
  }),
  IpAddress: D.m({ wire: "ipAddress" }),
  MaintenanceType: D.m({ wire: "maintenanceType" }),
  MaintenanceConfiguration: D.m({
    wire: "maintenanceConfiguration",
    shape: o_MaintenanceConfiguration,
  }),
  MaintenanceScheduleType: D.m({ wire: "maintenanceScheduleType" }),
  MaintenanceSchedule: D.m({
    wire: "maintenanceSchedule",
    shape: o_MaintenanceSchedule,
  }),
  ContentQualityAnalysisType: D.m({ wire: "contentQualityAnalysisType" }),
  ContentQualityAnalysisConfiguration: D.m({
    wire: "contentQualityAnalysisConfiguration",
    shape: {
      ContentLevel: D.m({
        wire: "contentLevel",
        shape: {
          BlackFrames: D.m({
            wire: "blackFrames",
            shape: {
              State: D.m({ wire: "state" }),
              ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
            },
          }),
          FrozenFrames: D.m({
            wire: "frozenFrames",
            shape: {
              State: D.m({ wire: "state" }),
              ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
            },
          }),
          SilentAudio: D.m({
            wire: "silentAudio",
            shape: {
              State: D.m({ wire: "state" }),
              ThresholdSeconds: D.m({ wire: "thresholdSeconds" }),
            },
          }),
        },
      }),
    },
  }),
});
const o_RouterInputMessage: D.LazyStruct = () => ({
  Code: D.m({ wire: "code" }),
  Message: D.m({ wire: "message" }),
});
const o_RouterNetworkInterface: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
  Arn: D.m({ wire: "arn" }),
  Id: D.m({ wire: "id" }),
  State: D.m({ wire: "state" }),
  NetworkInterfaceType: D.m({ wire: "networkInterfaceType" }),
  Configuration: D.m({
    wire: "configuration",
    shape: {
      Public: D.m({
        wire: "public",
        shape: {
          AllowRules: D.m({
            wire: "allowRules",
            shape: D.list({ Cidr: D.m({ wire: "cidr" }) }),
          }),
        },
      }),
      Vpc: D.m({
        wire: "vpc",
        shape: {
          SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
          SubnetId: D.m({ wire: "subnetId" }),
        },
      }),
    },
  }),
  AssociatedOutputCount: D.m({ wire: "associatedOutputCount" }),
  AssociatedInputCount: D.m({ wire: "associatedInputCount" }),
  RegionName: D.m({ wire: "regionName" }),
  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
  UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
  Tags: D.m({ wire: "tags" }),
});
const o_RouterOutput: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
  Arn: D.m({ wire: "arn" }),
  Id: D.m({ wire: "id" }),
  State: D.m({ wire: "state" }),
  OutputType: D.m({ wire: "outputType" }),
  Configuration: D.m({
    wire: "configuration",
    shape: {
      Standard: D.m({
        wire: "standard",
        shape: {
          NetworkInterfaceArn: D.m({ wire: "networkInterfaceArn" }),
          ProtocolConfiguration: D.m({
            wire: "protocolConfiguration",
            shape: {
              Rist: D.m({
                wire: "rist",
                shape: {
                  DestinationAddress: D.m({ wire: "destinationAddress" }),
                  DestinationPort: D.m({ wire: "destinationPort" }),
                },
              }),
              SrtListener: D.m({
                wire: "srtListener",
                shape: {
                  Port: D.m({ wire: "port" }),
                  MinimumLatencyMilliseconds: D.m({
                    wire: "minimumLatencyMilliseconds",
                  }),
                  EncryptionConfiguration: D.m({
                    wire: "encryptionConfiguration",
                    shape: o_SrtEncryptionConfiguration,
                  }),
                },
              }),
              SrtCaller: D.m({
                wire: "srtCaller",
                shape: {
                  DestinationAddress: D.m({ wire: "destinationAddress" }),
                  DestinationPort: D.m({ wire: "destinationPort" }),
                  MinimumLatencyMilliseconds: D.m({
                    wire: "minimumLatencyMilliseconds",
                  }),
                  StreamId: D.m({ wire: "streamId" }),
                  EncryptionConfiguration: D.m({
                    wire: "encryptionConfiguration",
                    shape: o_SrtEncryptionConfiguration,
                  }),
                },
              }),
              Rtp: D.m({
                wire: "rtp",
                shape: {
                  DestinationAddress: D.m({ wire: "destinationAddress" }),
                  DestinationPort: D.m({ wire: "destinationPort" }),
                  ForwardErrorCorrection: D.m({
                    wire: "forwardErrorCorrection",
                  }),
                },
              }),
            },
          }),
          Protocol: D.m({ wire: "protocol" }),
        },
      }),
      MediaConnectFlow: D.m({
        wire: "mediaConnectFlow",
        shape: {
          FlowArn: D.m({ wire: "flowArn" }),
          FlowSourceArn: D.m({ wire: "flowSourceArn" }),
          DestinationTransitEncryption: D.m({
            wire: "destinationTransitEncryption",
            shape: o_FlowTransitEncryption,
          }),
        },
      }),
      MediaLiveInput: D.m({
        wire: "mediaLiveInput",
        shape: {
          MediaLiveInputArn: D.m({ wire: "mediaLiveInputArn" }),
          MediaLivePipelineId: D.m({ wire: "mediaLivePipelineId" }),
          DestinationTransitEncryption: D.m({
            wire: "destinationTransitEncryption",
            shape: o_MediaLiveTransitEncryption,
          }),
        },
      }),
    },
  }),
  RoutedState: D.m({ wire: "routedState" }),
  RegionName: D.m({ wire: "regionName" }),
  AvailabilityZone: D.m({ wire: "availabilityZone" }),
  MaximumBitrate: D.m({ wire: "maximumBitrate" }),
  RoutingScope: D.m({ wire: "routingScope" }),
  Tier: D.m({ wire: "tier" }),
  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
  UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
  Messages: D.m({
    wire: "messages",
    shape: D.list({
      Code: D.m({ wire: "code" }),
      Message: D.m({ wire: "message" }),
    }),
  }),
  Tags: D.m({ wire: "tags" }),
  StreamDetails: D.m({
    wire: "streamDetails",
    shape: {
      Standard: D.m({
        wire: "standard",
        shape: { DestinationIpAddress: D.m({ wire: "destinationIpAddress" }) },
      }),
      MediaConnectFlow: D.m({ wire: "mediaConnectFlow" }),
      MediaLiveInput: D.m({ wire: "mediaLiveInput" }),
    },
  }),
  IpAddress: D.m({ wire: "ipAddress" }),
  RoutedInputArn: D.m({ wire: "routedInputArn" }),
  MaintenanceType: D.m({ wire: "maintenanceType" }),
  MaintenanceConfiguration: D.m({
    wire: "maintenanceConfiguration",
    shape: o_MaintenanceConfiguration,
  }),
  MaintenanceScheduleType: D.m({ wire: "maintenanceScheduleType" }),
  MaintenanceSchedule: D.m({
    wire: "maintenanceSchedule",
    shape: o_MaintenanceSchedule,
  }),
  FabricConfiguration: D.m({
    wire: "fabricConfiguration",
    shape: { RecoveryLatencyMode: D.m({ wire: "recoveryLatencyMode" }) },
  }),
});
const o_Source: D.LazyStruct = () => ({
  DataTransferSubscriberFeePercent: D.m({
    wire: "dataTransferSubscriberFeePercent",
  }),
  Decryption: D.m({ wire: "decryption", shape: o_Encryption }),
  Description: D.m({ wire: "description" }),
  EntitlementArn: D.m({ wire: "entitlementArn" }),
  IngestIp: D.m({ wire: "ingestIp" }),
  IngestPort: D.m({ wire: "ingestPort" }),
  MediaStreamSourceConfigurations: D.m({
    wire: "mediaStreamSourceConfigurations",
    shape: D.list({
      EncodingName: D.m({ wire: "encodingName" }),
      InputConfigurations: D.m({
        wire: "inputConfigurations",
        shape: D.list({
          InputIp: D.m({ wire: "inputIp" }),
          InputPort: D.m({ wire: "inputPort" }),
          Interface: D.m({ wire: "interface", shape: o_Interface }),
        }),
      }),
      MediaStreamName: D.m({ wire: "mediaStreamName" }),
    }),
  }),
  Name: D.m({ wire: "name" }),
  SenderControlPort: D.m({ wire: "senderControlPort" }),
  SenderIpAddress: D.m({ wire: "senderIpAddress" }),
  SourceArn: D.m({ wire: "sourceArn" }),
  Transport: D.m({ wire: "transport", shape: o_Transport }),
  VpcInterfaceName: D.m({ wire: "vpcInterfaceName" }),
  WhitelistCidr: D.m({ wire: "whitelistCidr" }),
  GatewayBridgeSource: D.m({
    wire: "gatewayBridgeSource",
    shape: {
      BridgeArn: D.m({ wire: "bridgeArn" }),
      VpcInterfaceAttachment: D.m({
        wire: "vpcInterfaceAttachment",
        shape: o_VpcInterfaceAttachment,
      }),
    },
  }),
  PeerIpAddress: D.m({ wire: "peerIpAddress" }),
  RouterIntegrationState: D.m({ wire: "routerIntegrationState" }),
  RouterIntegrationTransitDecryption: D.m({
    wire: "routerIntegrationTransitDecryption",
    shape: o_FlowTransitEncryption,
  }),
  ConnectedRouterOutputArn: D.m({ wire: "connectedRouterOutputArn" }),
});
const o_TransportMediaInfo: D.LazyStruct = () => ({
  Programs: D.m({
    wire: "programs",
    shape: D.list({
      PcrPid: D.m({ wire: "pcrPid" }),
      ProgramName: D.m({ wire: "programName" }),
      ProgramNumber: D.m({ wire: "programNumber" }),
      ProgramPid: D.m({ wire: "programPid" }),
      Streams: D.m({
        wire: "streams",
        shape: D.list({
          Channels: D.m({ wire: "channels" }),
          Codec: D.m({ wire: "codec" }),
          FrameRate: D.m({ wire: "frameRate" }),
          FrameResolution: D.m({
            wire: "frameResolution",
            shape: o_FrameResolution,
          }),
          Pid: D.m({ wire: "pid" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          SampleSize: D.m({ wire: "sampleSize" }),
          StreamType: D.m({ wire: "streamType" }),
        }),
      }),
    }),
  }),
});
const o_VpcInterface: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
  NetworkInterfaceIds: D.m({ wire: "networkInterfaceIds" }),
  NetworkInterfaceType: D.m({ wire: "networkInterfaceType" }),
  RoleArn: D.m({ wire: "roleArn" }),
  SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
  SubnetId: D.m({ wire: "subnetId" }),
});
const i_AutomaticEncryptionKeyConfiguration: D.LazyStruct = () => ({});
const i_Encryption: D.LazyStruct = () => ({
  Algorithm: D.m({ wire: "algorithm" }),
  ConstantInitializationVector: D.m({ wire: "constantInitializationVector" }),
  DeviceId: D.m({ wire: "deviceId" }),
  KeyType: D.m({ wire: "keyType" }),
  Region: D.m({ wire: "region" }),
  ResourceId: D.m({ wire: "resourceId" }),
  RoleArn: D.m({ wire: "roleArn" }),
  SecretArn: D.m({ wire: "secretArn" }),
  Url: D.m({ wire: "url" }),
});
const i_InterfaceRequest: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
});
const i_MediaLiveTransitEncryption: D.LazyStruct = () => ({
  EncryptionKeyType: D.m({ wire: "encryptionKeyType" }),
  EncryptionKeyConfiguration: D.m({
    wire: "encryptionKeyConfiguration",
    shape: {
      SecretsManager: D.m({
        wire: "secretsManager",
        shape: i_SecretsManagerEncryptionKeyConfiguration,
      }),
      Automatic: D.m({
        wire: "automatic",
        shape: i_AutomaticEncryptionKeyConfiguration,
      }),
    },
  }),
});
const i_RistRouterInputConfiguration: D.LazyStruct = () => ({
  Port: D.m({ wire: "port" }),
  RecoveryLatencyMilliseconds: D.m({ wire: "recoveryLatencyMilliseconds" }),
});
const i_RtpRouterInputConfiguration: D.LazyStruct = () => ({
  Port: D.m({ wire: "port" }),
  ForwardErrorCorrection: D.m({ wire: "forwardErrorCorrection" }),
});
const i_SecretsManagerEncryptionKeyConfiguration: D.LazyStruct = () => ({
  SecretArn: D.m({ wire: "secretArn" }),
  RoleArn: D.m({ wire: "roleArn" }),
});
const i_SourcePriority: D.LazyStruct = () => ({
  PrimarySource: D.m({ wire: "primarySource" }),
});
const i_SrtCallerRouterInputConfiguration: D.LazyStruct = () => ({
  SourceAddress: D.m({ wire: "sourceAddress" }),
  SourcePort: D.m({ wire: "sourcePort" }),
  MinimumLatencyMilliseconds: D.m({ wire: "minimumLatencyMilliseconds" }),
  StreamId: D.m({ wire: "streamId" }),
  DecryptionConfiguration: D.m({
    wire: "decryptionConfiguration",
    shape: i_SrtDecryptionConfiguration,
  }),
});
const i_SrtEncryptionConfiguration: D.LazyStruct = () => ({
  EncryptionKey: D.m({
    wire: "encryptionKey",
    shape: i_SecretsManagerEncryptionKeyConfiguration,
  }),
});
const i_SrtListenerRouterInputConfiguration: D.LazyStruct = () => ({
  Port: D.m({ wire: "port" }),
  MinimumLatencyMilliseconds: D.m({ wire: "minimumLatencyMilliseconds" }),
  DecryptionConfiguration: D.m({
    wire: "decryptionConfiguration",
    shape: i_SrtDecryptionConfiguration,
  }),
});
const o_Encryption: D.LazyStruct = () => ({
  Algorithm: D.m({ wire: "algorithm" }),
  ConstantInitializationVector: D.m({ wire: "constantInitializationVector" }),
  DeviceId: D.m({ wire: "deviceId" }),
  KeyType: D.m({ wire: "keyType" }),
  Region: D.m({ wire: "region" }),
  ResourceId: D.m({ wire: "resourceId" }),
  RoleArn: D.m({ wire: "roleArn" }),
  SecretArn: D.m({ wire: "secretArn" }),
  Url: D.m({ wire: "url" }),
});
const o_FailoverConfig: D.LazyStruct = () => ({
  FailoverMode: D.m({ wire: "failoverMode" }),
  RecoveryWindow: D.m({ wire: "recoveryWindow" }),
  SourcePriority: D.m({
    wire: "sourcePriority",
    shape: { PrimarySource: D.m({ wire: "primarySource" }) },
  }),
  State: D.m({ wire: "state" }),
});
const o_FailoverRouterInputIndexedStreamDetails: D.LazyStruct = () => ({
  SourceIndex: D.m({ wire: "sourceIndex" }),
  SourceIpAddress: D.m({ wire: "sourceIpAddress" }),
});
const o_FlowTransitEncryption: D.LazyStruct = () => ({
  EncryptionKeyType: D.m({ wire: "encryptionKeyType" }),
  EncryptionKeyConfiguration: D.m({
    wire: "encryptionKeyConfiguration",
    shape: {
      SecretsManager: D.m({
        wire: "secretsManager",
        shape: o_SecretsManagerEncryptionKeyConfiguration,
      }),
      Automatic: D.m({ wire: "automatic" }),
    },
  }),
});
const o_Interface: D.LazyStruct = () => ({ Name: D.m({ wire: "name" }) });
const o_MaintenanceConfiguration: D.LazyStruct = () => ({
  PreferredDayTime: D.m({
    wire: "preferredDayTime",
    shape: { Day: D.m({ wire: "day" }), Time: D.m({ wire: "time" }) },
  }),
  Default: D.m({ wire: "default" }),
});
const o_MediaLiveTransitEncryption: D.LazyStruct = () => ({
  EncryptionKeyType: D.m({ wire: "encryptionKeyType" }),
  EncryptionKeyConfiguration: D.m({
    wire: "encryptionKeyConfiguration",
    shape: {
      SecretsManager: D.m({
        wire: "secretsManager",
        shape: o_SecretsManagerEncryptionKeyConfiguration,
      }),
      Automatic: D.m({ wire: "automatic" }),
    },
  }),
});
const o_MergeRouterInputIndexedStreamDetails: D.LazyStruct = () => ({
  SourceIndex: D.m({ wire: "sourceIndex" }),
  SourceIpAddress: D.m({ wire: "sourceIpAddress" }),
});
const o_ResourceSpecification: D.LazyStruct = () => ({
  ReservedBitrate: D.m({ wire: "reservedBitrate" }),
  ResourceType: D.m({ wire: "resourceType" }),
});
const o_RistRouterInputConfiguration: D.LazyStruct = () => ({
  Port: D.m({ wire: "port" }),
  RecoveryLatencyMilliseconds: D.m({ wire: "recoveryLatencyMilliseconds" }),
});
const o_RtpRouterInputConfiguration: D.LazyStruct = () => ({
  Port: D.m({ wire: "port" }),
  ForwardErrorCorrection: D.m({ wire: "forwardErrorCorrection" }),
});
const o_SecretsManagerEncryptionKeyConfiguration: D.LazyStruct = () => ({
  SecretArn: D.m({ wire: "secretArn" }),
  RoleArn: D.m({ wire: "roleArn" }),
});
const o_SrtCallerRouterInputConfiguration: D.LazyStruct = () => ({
  SourceAddress: D.m({ wire: "sourceAddress" }),
  SourcePort: D.m({ wire: "sourcePort" }),
  MinimumLatencyMilliseconds: D.m({ wire: "minimumLatencyMilliseconds" }),
  StreamId: D.m({ wire: "streamId" }),
  DecryptionConfiguration: D.m({
    wire: "decryptionConfiguration",
    shape: o_SrtDecryptionConfiguration,
  }),
});
const o_SrtEncryptionConfiguration: D.LazyStruct = () => ({
  EncryptionKey: D.m({
    wire: "encryptionKey",
    shape: o_SecretsManagerEncryptionKeyConfiguration,
  }),
});
const o_SrtListenerRouterInputConfiguration: D.LazyStruct = () => ({
  Port: D.m({ wire: "port" }),
  MinimumLatencyMilliseconds: D.m({ wire: "minimumLatencyMilliseconds" }),
  DecryptionConfiguration: D.m({
    wire: "decryptionConfiguration",
    shape: o_SrtDecryptionConfiguration,
  }),
});
const o_Transport: D.LazyStruct = () => ({
  CidrAllowList: D.m({ wire: "cidrAllowList" }),
  MaxBitrate: D.m({ wire: "maxBitrate" }),
  MaxLatency: D.m({ wire: "maxLatency" }),
  MaxSyncBuffer: D.m({ wire: "maxSyncBuffer" }),
  MinLatency: D.m({ wire: "minLatency" }),
  Protocol: D.m({ wire: "protocol" }),
  RemoteId: D.m({ wire: "remoteId" }),
  SenderControlPort: D.m({ wire: "senderControlPort" }),
  SenderIpAddress: D.m({ wire: "senderIpAddress" }),
  SmoothingLatency: D.m({ wire: "smoothingLatency" }),
  SourceListenerAddress: D.m({ wire: "sourceListenerAddress" }),
  SourceListenerPort: D.m({ wire: "sourceListenerPort" }),
  StreamId: D.m({ wire: "streamId" }),
  NdiSpeedHqQuality: D.m({ wire: "ndiSpeedHqQuality" }),
  NdiProgramName: D.m({ wire: "ndiProgramName" }),
  NdiSourceSettings: D.m({
    wire: "ndiSourceSettings",
    shape: { SourceName: D.m({ wire: "sourceName" }) },
  }),
  NdiOutputTimecodeSource: D.m({ wire: "ndiOutputTimecodeSource" }),
});
const o_VpcInterfaceAttachment: D.LazyStruct = () => ({
  VpcInterfaceName: D.m({ wire: "vpcInterfaceName" }),
});
const i_SrtDecryptionConfiguration: D.LazyStruct = () => ({
  EncryptionKey: D.m({
    wire: "encryptionKey",
    shape: i_SecretsManagerEncryptionKeyConfiguration,
  }),
});
const o_SrtDecryptionConfiguration: D.LazyStruct = () => ({
  EncryptionKey: D.m({
    wire: "encryptionKey",
    shape: o_SecretsManagerEncryptionKeyConfiguration,
  }),
});
