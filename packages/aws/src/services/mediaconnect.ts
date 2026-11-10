import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "MediaConnect",
  serviceShapeName: "MediaConnect",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mediaconnect" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-14");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediaconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://mediaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://mediaconnect.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "MediaConnect",
  service: "MediaConnect",
  propagate: TxXray.propagate,
} as const;

export class AddFlowOutputs420Exception
  extends /*@__PURE__*/ S.TaggedError<AddFlowOutputs420Exception>()(
    "AddFlowOutputs420Exception",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(409), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class CreateBridge420Exception
  extends /*@__PURE__*/ S.TaggedError<CreateBridge420Exception>()(
    "CreateBridge420Exception",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class CreateFlow420Exception
  extends /*@__PURE__*/ S.TaggedError<CreateFlow420Exception>()(
    "CreateFlow420Exception",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class CreateGateway420Exception
  extends /*@__PURE__*/ S.TaggedError<CreateGateway420Exception>()(
    "CreateGateway420Exception",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class DestinationEndpointServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<DestinationEndpointServiceQuotaExceededException>()(
    "DestinationEndpointServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GrantFlowEntitlements420Exception
  extends /*@__PURE__*/ S.TaggedError<GrantFlowEntitlements420Exception>()(
    "GrantFlowEntitlements420Exception",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RouterInputServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<RouterInputServiceQuotaExceededException>()(
    "RouterInputServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class RouterNetworkInterfaceServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<RouterNetworkInterfaceServiceQuotaExceededException>()(
    "RouterNetworkInterfaceServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class RouterOutputServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<RouterOutputServiceQuotaExceededException>()(
    "RouterOutputServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class SourceEndpointServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<SourceEndpointServiceQuotaExceededException>()(
    "SourceEndpointServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(420),
  ) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
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
  IpAddress?: string | undefined;
  Name?: string | undefined;
  NetworkName?: string | undefined;
  Port?: number | undefined;
  Protocol?: Protocol | undefined;
  Ttl?: number | undefined;
}
export interface AddBridgeOutputRequest {
  NetworkOutput?: AddBridgeNetworkOutputRequest | undefined;
}
export type __listOfAddBridgeOutputRequest = AddBridgeOutputRequest[];
const __listOfAddBridgeOutputRequest = /*@__PURE__*/ __L.at(__c14, 1);
export interface AddBridgeOutputsRequest {
  BridgeArn: string;
  Outputs?: AddBridgeOutputRequest[] | undefined;
}
export interface BridgeFlowOutput {
  FlowArn?: string | undefined;
  FlowSourceArn?: string | undefined;
  Name?: string | undefined;
}
export interface BridgeNetworkOutput {
  IpAddress?: string | undefined;
  Name?: string | undefined;
  NetworkName?: string | undefined;
  Port?: number | undefined;
  Protocol?: Protocol | undefined;
  Ttl?: number | undefined;
}
export interface BridgeOutput {
  FlowOutput?: BridgeFlowOutput | undefined;
  NetworkOutput?: BridgeNetworkOutput | undefined;
}
export type __listOfBridgeOutput = BridgeOutput[];
const __listOfBridgeOutput = /*@__PURE__*/ __L.at(__c15, 0);
export interface AddBridgeOutputsResponse {
  BridgeArn?: string | undefined;
  Outputs?:
    | (BridgeOutput & {
        FlowOutput: BridgeFlowOutput & { FlowArn: string; FlowSourceArn: string; Name: string };
        NetworkOutput: BridgeNetworkOutput & {
          IpAddress: string;
          Name: string;
          NetworkName: string;
          Port: number;
          Protocol: Protocol;
          Ttl: number;
        };
      })[]
    | undefined;
}
export interface VpcInterfaceAttachment {
  VpcInterfaceName?: string | undefined;
}
export interface AddBridgeFlowSourceRequest {
  FlowArn?: string | undefined;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
  Name?: string | undefined;
}
export interface MulticastSourceSettings {
  MulticastSourceIp?: string | undefined;
}
export interface AddBridgeNetworkSourceRequest {
  MulticastIp?: string | undefined;
  MulticastSourceSettings?: MulticastSourceSettings | undefined;
  Name?: string | undefined;
  NetworkName?: string | undefined;
  Port?: number | undefined;
  Protocol?: Protocol | undefined;
}
export interface AddBridgeSourceRequest {
  FlowSource?: AddBridgeFlowSourceRequest | undefined;
  NetworkSource?: AddBridgeNetworkSourceRequest | undefined;
}
export type __listOfAddBridgeSourceRequest = AddBridgeSourceRequest[];
const __listOfAddBridgeSourceRequest = /*@__PURE__*/ __L.at(__c19, 2);
export interface AddBridgeSourcesRequest {
  BridgeArn: string;
  Sources?: AddBridgeSourceRequest[] | undefined;
}
export interface BridgeFlowSource {
  FlowArn?: string | undefined;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
  Name?: string | undefined;
  OutputArn?: string | undefined;
}
export interface BridgeNetworkSource {
  MulticastIp?: string | undefined;
  MulticastSourceSettings?: MulticastSourceSettings | undefined;
  Name?: string | undefined;
  NetworkName?: string | undefined;
  Port?: number | undefined;
  Protocol?: Protocol | undefined;
}
export interface BridgeSource {
  FlowSource?: BridgeFlowSource | undefined;
  NetworkSource?: BridgeNetworkSource | undefined;
}
export type __listOfBridgeSource = BridgeSource[];
const __listOfBridgeSource = /*@__PURE__*/ __L.at(__c20, 0);
export interface AddBridgeSourcesResponse {
  BridgeArn?: string | undefined;
  Sources?:
    | (BridgeSource & {
        FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
        NetworkSource: BridgeNetworkSource & {
          MulticastIp: string;
          Name: string;
          NetworkName: string;
          Port: number;
          Protocol: Protocol;
        };
      })[]
    | undefined;
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
export type ScanMode = "progressive" | "interlace" | "progressive-segmented-frame" | (string & {});
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
  ChannelOrder?: string | undefined;
  Colorimetry?: Colorimetry | undefined;
  ExactFramerate?: string | undefined;
  Par?: string | undefined;
  Range?: Range | undefined;
  ScanMode?: ScanMode | undefined;
  Tcs?: Tcs | undefined;
}
export interface MediaStreamAttributesRequest {
  Fmtp?: FmtpRequest | undefined;
  Lang?: string | undefined;
}
export type MediaStreamType = "video" | "audio" | "ancillary-data" | (string & {});
export type __mapOfString = { [key: string]: string | undefined };
const __mapOfString = /*@__PURE__*/ __L.at(__c23, 0);
export interface AddMediaStreamRequest {
  Attributes?: MediaStreamAttributesRequest | undefined;
  ClockRate?: number | undefined;
  Description?: string | undefined;
  MediaStreamId?: number | undefined;
  MediaStreamName?: string | undefined;
  MediaStreamType?: MediaStreamType | undefined;
  VideoFormat?: string | undefined;
  MediaStreamTags?: { [key: string]: string | undefined } | undefined;
}
export type __listOfAddMediaStreamRequest = AddMediaStreamRequest[];
const __listOfAddMediaStreamRequest = /*@__PURE__*/ __L.at(__c24, 1);
export interface AddFlowMediaStreamsRequest {
  FlowArn: string;
  MediaStreams?: AddMediaStreamRequest[] | undefined;
}
export interface Fmtp {
  ChannelOrder?: string | undefined;
  Colorimetry?: Colorimetry | undefined;
  ExactFramerate?: string | undefined;
  Par?: string | undefined;
  Range?: Range | undefined;
  ScanMode?: ScanMode | undefined;
  Tcs?: Tcs | undefined;
}
export interface MediaStreamAttributes {
  Fmtp?: Fmtp | undefined;
  Lang?: string | undefined;
}
export interface MediaStream {
  Attributes?: MediaStreamAttributes | undefined;
  ClockRate?: number | undefined;
  Description?: string | undefined;
  Fmt?: number | undefined;
  MediaStreamId?: number | undefined;
  MediaStreamName?: string | undefined;
  MediaStreamType?: MediaStreamType | undefined;
  VideoFormat?: string | undefined;
}
export type __listOfMediaStream = MediaStream[];
const __listOfMediaStream = /*@__PURE__*/ __L.at(__c25, 0);
export interface AddFlowMediaStreamsResponse {
  FlowArn?: string | undefined;
  MediaStreams?:
    | (MediaStream & {
        Fmt: number;
        MediaStreamId: number;
        MediaStreamName: string;
        MediaStreamType: MediaStreamType;
        Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
      })[]
    | undefined;
}
export type __listOfString = string[];
const __listOfString = /*@__PURE__*/ __L.at(__c28, 0);
export type Algorithm = "aes128" | "aes192" | "aes256" | (string & {});
export type KeyType = "speke" | "static-key" | "srt-password" | (string & {});
export interface Encryption {
  Algorithm?: Algorithm | undefined;
  ConstantInitializationVector?: string | undefined;
  DeviceId?: string | undefined;
  KeyType?: KeyType | undefined;
  Region?: string | undefined;
  ResourceId?: string | undefined;
  RoleArn?: string | undefined;
  SecretArn?: string | undefined;
  Url?: string | undefined;
}
export interface InterfaceRequest {
  Name?: string | undefined;
}
export interface DestinationConfigurationRequest {
  DestinationIp?: string | undefined;
  DestinationPort?: number | undefined;
  Interface?: InterfaceRequest | undefined;
}
export type __listOfDestinationConfigurationRequest = DestinationConfigurationRequest[];
const __listOfDestinationConfigurationRequest = /*@__PURE__*/ __L.at(__c34, 1);
export type EncodingName = "jxsv" | "raw" | "smpte291" | "pcm" | (string & {});
export type EncoderProfile = "main" | "high" | (string & {});
export interface EncodingParametersRequest {
  CompressionFactor?: number | undefined;
  EncoderProfile?: EncoderProfile | undefined;
}
export interface MediaStreamOutputConfigurationRequest {
  DestinationConfigurations?: DestinationConfigurationRequest[] | undefined;
  EncodingName?: EncodingName | undefined;
  EncodingParameters?: EncodingParametersRequest | undefined;
  MediaStreamName?: string | undefined;
}
export type __listOfMediaStreamOutputConfigurationRequest = MediaStreamOutputConfigurationRequest[];
const __listOfMediaStreamOutputConfigurationRequest = /*@__PURE__*/ __L.at(__c34, 3);
export type OutputStatus = "ENABLED" | "DISABLED" | (string & {});
export type State = "ENABLED" | "DISABLED" | (string & {});
export type FlowTransitEncryptionKeyType = "SECRETS_MANAGER" | "AUTOMATIC" | (string & {});
export type SecretArn = string;
export type RoleArn = string;
export interface SecretsManagerEncryptionKeyConfiguration {
  SecretArn: string;
  RoleArn: string;
}
export interface AutomaticEncryptionKeyConfiguration {}
export type FlowTransitEncryptionKeyConfiguration =
  | { SecretsManager: SecretsManagerEncryptionKeyConfiguration; Automatic?: undefined }
  | { SecretsManager?: undefined; Automatic: AutomaticEncryptionKeyConfiguration };
export interface FlowTransitEncryption {
  EncryptionKeyType?: FlowTransitEncryptionKeyType | undefined;
  EncryptionKeyConfiguration: FlowTransitEncryptionKeyConfiguration;
}
export type NdiOutputTimecodeSource = "EMBEDDED_TIMECODE" | "UTC_SYSTEM_TIME" | (string & {});
export type NdiAudioReferenceLevel = number;
export interface AddOutputRequest {
  CidrAllowList?: string[] | undefined;
  Description?: string | undefined;
  Destination?: string | undefined;
  Encryption?: Encryption | undefined;
  MaxLatency?: number | undefined;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfigurationRequest[] | undefined;
  MinLatency?: number | undefined;
  Name?: string | undefined;
  Port?: number | undefined;
  Protocol?: Protocol | undefined;
  RemoteId?: string | undefined;
  SenderControlPort?: number | undefined;
  SmoothingLatency?: number | undefined;
  StreamId?: string | undefined;
  VpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
  OutputStatus?: OutputStatus | undefined;
  NdiSpeedHqQuality?: number | undefined;
  NdiProgramName?: string | undefined;
  OutputTags?: { [key: string]: string | undefined } | undefined;
  RouterIntegrationState?: State | undefined;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption | undefined;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource | undefined;
  NdiAudioReferenceLevel?: number | undefined;
}
export type __listOfAddOutputRequest = AddOutputRequest[];
const __listOfAddOutputRequest = /*@__PURE__*/ __L.at(__c33, 1);
export interface AddFlowOutputsRequest {
  FlowArn: string;
  Outputs?: AddOutputRequest[] | undefined;
}
export interface Interface {
  Name?: string | undefined;
}
export interface DestinationConfiguration {
  DestinationIp?: string | undefined;
  DestinationPort?: number | undefined;
  Interface?: Interface | undefined;
  OutboundIp?: string | undefined;
}
export type __listOfDestinationConfiguration = DestinationConfiguration[];
const __listOfDestinationConfiguration = /*@__PURE__*/ __L.at(__c36, 2);
export interface EncodingParameters {
  CompressionFactor?: number | undefined;
  EncoderProfile?: EncoderProfile | undefined;
}
export interface MediaStreamOutputConfiguration {
  DestinationConfigurations?: DestinationConfiguration[] | undefined;
  EncodingName?: EncodingName | undefined;
  EncodingParameters?: EncodingParameters | undefined;
  MediaStreamName?: string | undefined;
}
export type __listOfMediaStreamOutputConfiguration = MediaStreamOutputConfiguration[];
const __listOfMediaStreamOutputConfiguration = /*@__PURE__*/ __L.at(__c36, 4);
export interface NdiSourceSettings {
  SourceName?: string | undefined;
  AudioReferenceLevel?: number | undefined;
}
export interface Transport {
  CidrAllowList?: string[] | undefined;
  MaxBitrate?: number | undefined;
  MaxLatency?: number | undefined;
  MaxSyncBuffer?: number | undefined;
  MinLatency?: number | undefined;
  Protocol?: Protocol | undefined;
  RemoteId?: string | undefined;
  SenderControlPort?: number | undefined;
  SenderIpAddress?: string | undefined;
  SmoothingLatency?: number | undefined;
  SourceListenerAddress?: string | undefined;
  SourceListenerPort?: number | undefined;
  StreamId?: string | undefined;
  NdiSpeedHqQuality?: number | undefined;
  NdiProgramName?: string | undefined;
  NdiSourceSettings?: NdiSourceSettings | undefined;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource | undefined;
  NdiAudioReferenceLevel?: number | undefined;
}
export type __listOfInteger = number[];
const __listOfInteger = /*@__PURE__*/ __L.at(__c36, 5);
export interface Output {
  DataTransferSubscriberFeePercent?: number | undefined;
  Description?: string | undefined;
  Destination?: string | undefined;
  Encryption?: Encryption | undefined;
  EntitlementArn?: string | undefined;
  ListenerAddress?: string | undefined;
  MediaLiveInputArn?: string | undefined;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfiguration[] | undefined;
  Name?: string | undefined;
  OutputArn?: string | undefined;
  Port?: number | undefined;
  Transport?: Transport | undefined;
  VpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
  BridgeArn?: string | undefined;
  BridgePorts?: number[] | undefined;
  OutputStatus?: OutputStatus | undefined;
  PeerIpAddress?: string | undefined;
  RouterIntegrationState?: State | undefined;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption | undefined;
  ConnectedRouterInputArn?: string | undefined;
}
export type __listOfOutput = Output[];
const __listOfOutput = /*@__PURE__*/ __L.at(__c35, 0);
export interface AddFlowOutputsResponse {
  FlowArn?: string | undefined;
  Outputs?:
    | (Output & {
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
      })[]
    | undefined;
}
export interface InputConfigurationRequest {
  InputPort?: number | undefined;
  Interface?: InterfaceRequest | undefined;
}
export type __listOfInputConfigurationRequest = InputConfigurationRequest[];
const __listOfInputConfigurationRequest = /*@__PURE__*/ __L.at(__c39, 1);
export interface MediaStreamSourceConfigurationRequest {
  EncodingName?: EncodingName | undefined;
  InputConfigurations?: InputConfigurationRequest[] | undefined;
  MediaStreamName?: string | undefined;
}
export type __listOfMediaStreamSourceConfigurationRequest = MediaStreamSourceConfigurationRequest[];
const __listOfMediaStreamSourceConfigurationRequest = /*@__PURE__*/ __L.at(__c39, 3);
export interface SetGatewayBridgeSourceRequest {
  BridgeArn?: string | undefined;
  VpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
}
export interface SetSourceRequest {
  Decryption?: Encryption | undefined;
  Description?: string | undefined;
  EntitlementArn?: string | undefined;
  IngestPort?: number | undefined;
  MaxBitrate?: number | undefined;
  MaxLatency?: number | undefined;
  MaxSyncBuffer?: number | undefined;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfigurationRequest[] | undefined;
  MinLatency?: number | undefined;
  Name?: string | undefined;
  Protocol?: Protocol | undefined;
  SenderControlPort?: number | undefined;
  SenderIpAddress?: string | undefined;
  SourceListenerAddress?: string | undefined;
  SourceListenerPort?: number | undefined;
  StreamId?: string | undefined;
  VpcInterfaceName?: string | undefined;
  WhitelistCidr?: string | undefined;
  GatewayBridgeSource?: SetGatewayBridgeSourceRequest | undefined;
  NdiSourceSettings?: NdiSourceSettings | undefined;
  SourceTags?: { [key: string]: string | undefined } | undefined;
  RouterIntegrationState?: State | undefined;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption | undefined;
}
export type __listOfSetSourceRequest = SetSourceRequest[];
const __listOfSetSourceRequest = /*@__PURE__*/ __L.at(__c38, 1);
export interface AddFlowSourcesRequest {
  FlowArn: string;
  Sources?: SetSourceRequest[] | undefined;
}
export interface InputConfiguration {
  InputIp?: string | undefined;
  InputPort?: number | undefined;
  Interface?: Interface | undefined;
}
export type __listOfInputConfiguration = InputConfiguration[];
const __listOfInputConfiguration = /*@__PURE__*/ __L.at(__c41, 2);
export interface MediaStreamSourceConfiguration {
  EncodingName?: EncodingName | undefined;
  InputConfigurations?: InputConfiguration[] | undefined;
  MediaStreamName?: string | undefined;
}
export type __listOfMediaStreamSourceConfiguration = MediaStreamSourceConfiguration[];
const __listOfMediaStreamSourceConfiguration = /*@__PURE__*/ __L.at(__c41, 4);
export interface GatewayBridgeSource {
  BridgeArn?: string | undefined;
  VpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
}
export interface Source {
  DataTransferSubscriberFeePercent?: number | undefined;
  Decryption?: Encryption | undefined;
  Description?: string | undefined;
  EntitlementArn?: string | undefined;
  IngestIp?: string | undefined;
  IngestPort?: number | undefined;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfiguration[] | undefined;
  Name?: string | undefined;
  SenderControlPort?: number | undefined;
  SenderIpAddress?: string | undefined;
  SourceArn?: string | undefined;
  Transport?: Transport | undefined;
  VpcInterfaceName?: string | undefined;
  WhitelistCidr?: string | undefined;
  GatewayBridgeSource?: GatewayBridgeSource | undefined;
  PeerIpAddress?: string | undefined;
  RouterIntegrationState?: State | undefined;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption | undefined;
  ConnectedRouterOutputArn?: string | undefined;
}
export type __listOfSource = Source[];
const __listOfSource = /*@__PURE__*/ __L.at(__c40, 0);
export interface AddFlowSourcesResponse {
  FlowArn?: string | undefined;
  Sources?:
    | (Source & {
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
      })[]
    | undefined;
}
export type NetworkInterfaceType = "ena" | "efa" | (string & {});
export interface VpcInterfaceRequest {
  Name?: string | undefined;
  NetworkInterfaceType?: NetworkInterfaceType | undefined;
  RoleArn?: string | undefined;
  SecurityGroupIds?: string[] | undefined;
  SubnetId?: string | undefined;
  VpcInterfaceTags?: { [key: string]: string | undefined } | undefined;
}
export type __listOfVpcInterfaceRequest = VpcInterfaceRequest[];
const __listOfVpcInterfaceRequest = /*@__PURE__*/ __L.at(__c43, 1);
export interface AddFlowVpcInterfacesRequest {
  FlowArn: string;
  VpcInterfaces?: VpcInterfaceRequest[] | undefined;
}
export interface VpcInterface {
  Name?: string | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  NetworkInterfaceType?: NetworkInterfaceType | undefined;
  RoleArn?: string | undefined;
  SecurityGroupIds?: string[] | undefined;
  SubnetId?: string | undefined;
}
export type __listOfVpcInterface = VpcInterface[];
const __listOfVpcInterface = /*@__PURE__*/ __L.at(__c44, 1);
export interface AddFlowVpcInterfacesResponse {
  FlowArn?: string | undefined;
  VpcInterfaces?:
    | (VpcInterface & {
        Name: string;
        NetworkInterfaceIds: __listOfString;
        NetworkInterfaceType: NetworkInterfaceType;
        RoleArn: string;
        SecurityGroupIds: __listOfString;
        SubnetId: string;
      })[]
    | undefined;
}
export type DestinationEndpointArn = string;
export type DestinationEndpointArnList = string[];
const DestinationEndpointArnList = __listOfString as any as S.Schema<DestinationEndpointArnList>;
export interface BatchGetDestinationEndpointRequest {
  Arns: string[];
}
export type EndpointLifecycle = "MANAGED" | "UNMANAGED" | (string & {});
export interface DestinationEndpointMessage {
  Code: string;
  Message: string;
}
export type DestinationEndpointMessageList = DestinationEndpointMessage[];
export type DestinationEndpointType = "STANDARD" | "ROUTER_INPUT" | (string & {});
export interface PublicDestinationEndpointNetworkingConfigurationAllowRule {
  Cidr: string;
}
export type PublicDestinationEndpointNetworkingConfigurationAllowRuleList =
  PublicDestinationEndpointNetworkingConfigurationAllowRule[];
export interface PublicDestinationEndpointNetworkingConfiguration {
  DestinationAllowRules: PublicDestinationEndpointNetworkingConfigurationAllowRule[];
}
export type SecurityGroupIdList = string[];
const SecurityGroupIdList = __listOfString as any as S.Schema<SecurityGroupIdList>;
export interface VpcDestinationEndpointNetworkingConfiguration {
  SecurityGroupIds: string[];
  SubnetId: string;
}
export type StandardDestinationEndpointNetworkingConfiguration =
  | { Public: PublicDestinationEndpointNetworkingConfiguration; Vpc?: undefined }
  | { Public?: undefined; Vpc: VpcDestinationEndpointNetworkingConfiguration };
export interface RistStandardDestinationEndpointConfiguration {
  DestinationAddress: string;
  DestinationIngestPort: number;
}
export interface EndpointEncryptionSecretConfiguration {
  SecretArn: string;
}
export interface SrtListenerStandardDestinationEndpointConfiguration {
  DestinationAddress: string;
  DestinationIngestPort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string | undefined;
  EncryptionPassphrase?: EndpointEncryptionSecretConfiguration | undefined;
}
export interface SrtCallerStandardDestinationEndpointConfiguration {
  SourceListenerPort: number;
  MinimumLatencyMilliseconds: number;
  EncryptionPassphrase?: EndpointEncryptionSecretConfiguration | undefined;
}
export type ForwardErrorCorrectionState = "ENABLED" | "DISABLED" | (string & {});
export interface RtpStandardDestinationEndpointConfiguration {
  DestinationAddress: string;
  DestinationIngestPort: number;
  ForwardErrorCorrectionState: ForwardErrorCorrectionState;
}
export type StandardDestinationEndpointProtocolConfiguration =
  | {
      Rist: RistStandardDestinationEndpointConfiguration;
      SrtListener?: undefined;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener: SrtListenerStandardDestinationEndpointConfiguration;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      SrtCaller: SrtCallerStandardDestinationEndpointConfiguration;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      SrtCaller?: undefined;
      Rtp: RtpStandardDestinationEndpointConfiguration;
    };
export type DestinationEndpointNetworkingType = "PUBLIC" | "VPC" | (string & {});
export type DestinationEndpointProtocol =
  | "RTP"
  | "RIST"
  | "SRT_CALLER"
  | "SRT_LISTENER"
  | (string & {});
export interface StandardDestinationEndpointConfiguration {
  Name: string;
  DestinationNetworkingConfiguration: StandardDestinationEndpointNetworkingConfiguration;
  ProtocolConfiguration: StandardDestinationEndpointProtocolConfiguration;
  DestinationNetworkingType?: DestinationEndpointNetworkingType | undefined;
  Protocol?: DestinationEndpointProtocol | undefined;
}
export type RouterInputArn = string;
export interface RouterInputDestinationEndpointConfiguration {
  RouterInputArn: string;
}
export type DestinationEndpointConfiguration =
  | { Standard: StandardDestinationEndpointConfiguration; RouterInput?: undefined }
  | { Standard?: undefined; RouterInput: RouterInputDestinationEndpointConfiguration };
export type ResourceShareOwnership = "OWNED" | "CONSUMED" | (string & {});
export type ResourceShareState = "SHARED" | "UNSHARED" | (string & {});
export interface OwnedResourceShareDetails {
  ShareState: ResourceShareState;
}
export interface ConsumedResourceShareDetails {
  OwnerAccountId: string;
}
export type ResourceShareDetails =
  | { Owned: OwnedResourceShareDetails; Consumed?: undefined }
  | { Owned?: undefined; Consumed: ConsumedResourceShareDetails };
export type DestinationEndpointRegistrationState =
  | "REGISTERED"
  | "REGISTERING"
  | "DEREGISTERING"
  | "REGISTRATION_FAILED"
  | (string & {});
export type EndpointEncryptionType = "SECRETS_MANAGER" | "AUTOMATIC" | (string & {});
export type EndpointEncryptionSecretType =
  | "AES_128_KEY"
  | "AES_192_KEY"
  | "AES_256_KEY"
  | "SRT_PASSPHRASE"
  | (string & {});
export interface SecretsManagerEndpointEncryptionConfiguration {
  EncryptionSecretType?: EndpointEncryptionSecretType | undefined;
  EncryptionSecret: EndpointEncryptionSecretConfiguration;
}
export interface AutomaticEndpointEncryptionConfiguration {}
export type EndpointEncryptionConfiguration =
  | { SecretsManager: SecretsManagerEndpointEncryptionConfiguration; Automatic?: undefined }
  | { SecretsManager?: undefined; Automatic: AutomaticEndpointEncryptionConfiguration };
export type SourceEndpointType = "STANDARD" | "ROUTER_OUTPUT" | (string & {});
export interface StandardDestinationEndpointConnectionDetails {
  SourceIpAddress?: string | undefined;
  SourceListenerPort?: number | undefined;
  SourceEncryptionType?: EndpointEncryptionType | undefined;
  SourceEncryptionConfiguration?: EndpointEncryptionConfiguration | undefined;
  SourceEndpointType?: SourceEndpointType | undefined;
}
export interface RouterInputDestinationEndpointConnectionDetails {
  SourceEncryptionType?: EndpointEncryptionType | undefined;
  SourceEncryptionConfiguration?: EndpointEncryptionConfiguration | undefined;
  SourceEndpointType?: SourceEndpointType | undefined;
}
export type DestinationEndpointConnectionDetails =
  | { Standard: StandardDestinationEndpointConnectionDetails; RouterInput?: undefined }
  | { Standard?: undefined; RouterInput: RouterInputDestinationEndpointConnectionDetails };
export type DestinationEndpointConnectionState =
  | "CONNECTED"
  | "DISCONNECTED"
  | "CONNECTING"
  | "DISCONNECTING"
  | (string & {});
export type SourceEndpointArn = string;
export interface StandardDestinationEndpointAssociatedResourceDetails {}
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
export interface RouterInputMessage {
  Code: string;
  Message: string;
}
export type RouterInputMessages = RouterInputMessage[];
export interface RouterInputDestinationEndpointAssociatedResourceDetails {
  Name: string;
  MaximumBitrate: number;
  State: RouterInputState;
  Messages: RouterInputMessage[];
}
export type DestinationEndpointAssociatedResourceDetails =
  | { Standard: StandardDestinationEndpointAssociatedResourceDetails; RouterInput?: undefined }
  | { Standard?: undefined; RouterInput: RouterInputDestinationEndpointAssociatedResourceDetails };
export interface DestinationEndpoint {
  Name: string;
  Arn: string;
  Id: string;
  Description: string;
  RegionName: string;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  CreatedAt: Date;
  UpdatedAt: Date;
  LifecycleManagement: EndpointLifecycle;
  Messages: DestinationEndpointMessage[];
  DestinationType: DestinationEndpointType;
  Configuration: DestinationEndpointConfiguration;
  ResourceShareOwnership: ResourceShareOwnership;
  ResourceShareDetails: ResourceShareDetails;
  RegistrationState: DestinationEndpointRegistrationState;
  ConnectionDetails?: DestinationEndpointConnectionDetails | undefined;
  ConnectionState: DestinationEndpointConnectionState;
  ConnectedSource?: string | undefined;
  DecryptionType?: EndpointEncryptionType | undefined;
  DecryptionConfiguration?: EndpointEncryptionConfiguration | undefined;
  AssociatedResourceDetails: DestinationEndpointAssociatedResourceDetails;
  Tags: { [key: string]: string | undefined };
}
export type DestinationEndpointList = DestinationEndpoint[];
export interface BatchGetDestinationEndpointError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export type BatchGetDestinationEndpointErrorList = BatchGetDestinationEndpointError_[];
export interface BatchGetDestinationEndpointResponse {
  DestinationEndpoints: DestinationEndpoint[];
  Errors: BatchGetDestinationEndpointError_[];
}
export type RouterInputArnList = string[];
const RouterInputArnList = __listOfString as any as S.Schema<RouterInputArnList>;
export interface BatchGetRouterInputRequest {
  Arns: string[];
}
export type RouterInputType =
  | "STANDARD"
  | "FAILOVER"
  | "MERGE"
  | "MEDIACONNECT_FLOW"
  | "MEDIALIVE_CHANNEL"
  | "DESTINATION_ENDPOINT"
  | (string & {});
export interface DestinationEndpointRouterInputConfiguration {
  EndpointLifecycleManagement: EndpointLifecycle;
  SourceTransitDecryptionType?: EndpointEncryptionType | undefined;
  SourceTransitDecryption: EndpointEncryptionConfiguration;
}
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
  DecryptionConfiguration?: SrtDecryptionConfiguration | undefined;
}
export interface SrtCallerRouterInputConfiguration {
  SourceAddress: string;
  SourcePort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string | undefined;
  DecryptionConfiguration?: SrtDecryptionConfiguration | undefined;
}
export interface RtpRouterInputConfiguration {
  Port: number;
  ForwardErrorCorrection?: ForwardErrorCorrectionState | undefined;
}
export type RouterInputProtocolConfiguration =
  | {
      Rist: RistRouterInputConfiguration;
      SrtListener?: undefined;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener: SrtListenerRouterInputConfiguration;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      SrtCaller: SrtCallerRouterInputConfiguration;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      SrtCaller?: undefined;
      Rtp: RtpRouterInputConfiguration;
    };
export type RouterInputProtocol = "RTP" | "RIST" | "SRT_CALLER" | "SRT_LISTENER" | (string & {});
export interface StandardRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfiguration: RouterInputProtocolConfiguration;
  Protocol?: RouterInputProtocol | undefined;
}
export type MediaLiveChannelArn = string;
export type MediaLiveChannelPipelineId = "PIPELINE_0" | "PIPELINE_1" | (string & {});
export type MediaLiveTransitEncryptionKeyType = "SECRETS_MANAGER" | "AUTOMATIC" | (string & {});
export type MediaLiveTransitEncryptionKeyConfiguration =
  | { SecretsManager: SecretsManagerEncryptionKeyConfiguration; Automatic?: undefined }
  | { SecretsManager?: undefined; Automatic: AutomaticEncryptionKeyConfiguration };
export interface MediaLiveTransitEncryption {
  EncryptionKeyType?: MediaLiveTransitEncryptionKeyType | undefined;
  EncryptionKeyConfiguration: MediaLiveTransitEncryptionKeyConfiguration;
}
export interface MediaLiveChannelRouterInputConfiguration {
  MediaLiveChannelArn?: string | undefined;
  MediaLivePipelineId?: MediaLiveChannelPipelineId | undefined;
  MediaLiveChannelOutputName?: string | undefined;
  SourceTransitDecryption: MediaLiveTransitEncryption;
}
export type FailoverRouterInputProtocolConfiguration =
  | {
      Rist: RistRouterInputConfiguration;
      SrtListener?: undefined;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener: SrtListenerRouterInputConfiguration;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      SrtCaller: SrtCallerRouterInputConfiguration;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      SrtCaller?: undefined;
      Rtp: RtpRouterInputConfiguration;
    };
export type FailoverRouterInputProtocolConfigurationList =
  FailoverRouterInputProtocolConfiguration[];
export type FailoverInputSourcePriorityMode = "NO_PRIORITY" | "PRIMARY_SECONDARY" | (string & {});
export interface FailoverRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfigurations: FailoverRouterInputProtocolConfiguration[];
  SourcePriorityMode: FailoverInputSourcePriorityMode;
  PrimarySourceIndex?: number | undefined;
}
export type FlowOutputArn = string;
export interface MediaConnectFlowRouterInputConfiguration {
  FlowArn?: string | undefined;
  FlowOutputArn?: string | undefined;
  SourceTransitDecryption: FlowTransitEncryption;
}
export type MergeRouterInputProtocolConfiguration =
  | { Rtp: RtpRouterInputConfiguration; Rist?: undefined }
  | { Rtp?: undefined; Rist: RistRouterInputConfiguration };
export type MergeRouterInputProtocolConfigurationList = MergeRouterInputProtocolConfiguration[];
export interface MergeRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfigurations: MergeRouterInputProtocolConfiguration[];
  MergeRecoveryWindowMilliseconds: number;
}
export type RouterInputConfiguration =
  | {
      DestinationEndpoint: DestinationEndpointRouterInputConfiguration;
      Standard?: undefined;
      MediaLiveChannel?: undefined;
      Failover?: undefined;
      MediaConnectFlow?: undefined;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard: StandardRouterInputConfiguration;
      MediaLiveChannel?: undefined;
      Failover?: undefined;
      MediaConnectFlow?: undefined;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard?: undefined;
      MediaLiveChannel: MediaLiveChannelRouterInputConfiguration;
      Failover?: undefined;
      MediaConnectFlow?: undefined;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard?: undefined;
      MediaLiveChannel?: undefined;
      Failover: FailoverRouterInputConfiguration;
      MediaConnectFlow?: undefined;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard?: undefined;
      MediaLiveChannel?: undefined;
      Failover?: undefined;
      MediaConnectFlow: MediaConnectFlowRouterInputConfiguration;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard?: undefined;
      MediaLiveChannel?: undefined;
      Failover?: undefined;
      MediaConnectFlow?: undefined;
      Merge: MergeRouterInputConfiguration;
    };
export type RouterInputTier =
  | "INPUT_100"
  | "INPUT_50"
  | "INPUT_20"
  | "INPUT_500"
  | "INPUT_250"
  | (string & {});
export type RoutingScope = "REGIONAL" | "GLOBAL" | (string & {});
export type RouterInputTransitEncryptionKeyType = "SECRETS_MANAGER" | "AUTOMATIC" | (string & {});
export type RouterInputTransitEncryptionKeyConfiguration =
  | { SecretsManager: SecretsManagerEncryptionKeyConfiguration; Automatic?: undefined }
  | { SecretsManager?: undefined; Automatic: AutomaticEncryptionKeyConfiguration };
export interface RouterInputTransitEncryption {
  EncryptionKeyType?: RouterInputTransitEncryptionKeyType | undefined;
  EncryptionKeyConfiguration: RouterInputTransitEncryptionKeyConfiguration;
}
export interface DestinationEndpointRouterInputStreamDetails {}
export interface StandardRouterInputStreamDetails {
  SourceIpAddress?: string | undefined;
}
export interface MediaLiveChannelRouterInputStreamDetails {}
export interface FailoverRouterInputIndexedStreamDetails {
  SourceIndex: number;
  SourceIpAddress?: string | undefined;
}
export interface FailoverRouterInputStreamDetails {
  SourceIndexZeroStreamDetails: FailoverRouterInputIndexedStreamDetails;
  SourceIndexOneStreamDetails: FailoverRouterInputIndexedStreamDetails;
}
export interface MediaConnectFlowRouterInputStreamDetails {}
export interface MergeRouterInputIndexedStreamDetails {
  SourceIndex: number;
  SourceIpAddress?: string | undefined;
}
export interface MergeRouterInputStreamDetails {
  SourceIndexZeroStreamDetails: MergeRouterInputIndexedStreamDetails;
  SourceIndexOneStreamDetails: MergeRouterInputIndexedStreamDetails;
}
export type RouterInputStreamDetails =
  | {
      DestinationEndpoint: DestinationEndpointRouterInputStreamDetails;
      Standard?: undefined;
      MediaLiveChannel?: undefined;
      Failover?: undefined;
      MediaConnectFlow?: undefined;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard: StandardRouterInputStreamDetails;
      MediaLiveChannel?: undefined;
      Failover?: undefined;
      MediaConnectFlow?: undefined;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard?: undefined;
      MediaLiveChannel: MediaLiveChannelRouterInputStreamDetails;
      Failover?: undefined;
      MediaConnectFlow?: undefined;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard?: undefined;
      MediaLiveChannel?: undefined;
      Failover: FailoverRouterInputStreamDetails;
      MediaConnectFlow?: undefined;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard?: undefined;
      MediaLiveChannel?: undefined;
      Failover?: undefined;
      MediaConnectFlow: MediaConnectFlowRouterInputStreamDetails;
      Merge?: undefined;
    }
  | {
      DestinationEndpoint?: undefined;
      Standard?: undefined;
      MediaLiveChannel?: undefined;
      Failover?: undefined;
      MediaConnectFlow?: undefined;
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
  | { PreferredDayTime: PreferredDayTimeMaintenanceConfiguration; Default?: undefined }
  | { PreferredDayTime?: undefined; Default: DefaultMaintenanceConfiguration };
export type MaintenanceScheduleType = "WINDOW" | (string & {});
export interface WindowMaintenanceSchedule {
  Start: Date;
  End: Date;
  ScheduledTime: Date;
}
export type MaintenanceSchedule = { Window: WindowMaintenanceSchedule };
export type RouterContentQualityAnalysisType = "CONTENT_LEVEL" | (string & {});
export type ContentQualityAnalysisState = "ENABLED" | "DISABLED" | (string & {});
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
  BlackFrames?: BlackFramesConfiguration | undefined;
  FrozenFrames?: FrozenFramesConfiguration | undefined;
  SilentAudio?: SilentAudioConfiguration | undefined;
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
  MaximumRoutedOutputs?: number | undefined;
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
  IpAddress?: string | undefined;
  MaintenanceType: MaintenanceType;
  MaintenanceConfiguration: MaintenanceConfiguration;
  MaintenanceScheduleType?: MaintenanceScheduleType | undefined;
  MaintenanceSchedule?: MaintenanceSchedule | undefined;
  ContentQualityAnalysisType?: RouterContentQualityAnalysisType | undefined;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration | undefined;
  AssociatedDestinationEndpointArns?: string[] | undefined;
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
const RouterNetworkInterfaceArnList =
  __listOfString as any as S.Schema<RouterNetworkInterfaceArnList>;
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
export interface VpcRouterNetworkInterfaceConfiguration {
  SecurityGroupIds: string[];
  SubnetId: string;
}
export type RouterNetworkInterfaceConfiguration =
  | { Public: PublicRouterNetworkInterfaceConfiguration; Vpc?: undefined }
  | { Public?: undefined; Vpc: VpcRouterNetworkInterfaceConfiguration };
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
export type BatchGetRouterNetworkInterfaceErrorList = BatchGetRouterNetworkInterfaceError_[];
export interface BatchGetRouterNetworkInterfaceResponse {
  RouterNetworkInterfaces: RouterNetworkInterface[];
  Errors: BatchGetRouterNetworkInterfaceError_[];
}
export type RouterOutputArn = string;
export type RouterOutputArnList = string[];
const RouterOutputArnList = __listOfString as any as S.Schema<RouterOutputArnList>;
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
  | "SOURCE_ENDPOINT"
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
  EncryptionConfiguration?: SrtEncryptionConfiguration | undefined;
}
export type TlsEncryptionType = "PUBLIC" | (string & {});
export interface PublicTlsEncryptionConfiguration {}
export type TlsEncryptionConfiguration = { Public: PublicTlsEncryptionConfiguration };
export interface TlsEncryption {
  EncryptionType?: TlsEncryptionType | undefined;
  EncryptionConfiguration: TlsEncryptionConfiguration;
}
export interface RtmpPushRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  ApplicationName: string;
  StreamName: string;
  TlsEncryption?: TlsEncryption | undefined;
}
export interface SrtCallerRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string | undefined;
  EncryptionConfiguration?: SrtEncryptionConfiguration | undefined;
}
export interface RtpRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  ForwardErrorCorrection?: ForwardErrorCorrectionState | undefined;
}
export type RouterOutputProtocolConfiguration =
  | {
      Rist: RistRouterOutputConfiguration;
      SrtListener?: undefined;
      RtmpPush?: undefined;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener: SrtListenerRouterOutputConfiguration;
      RtmpPush?: undefined;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      RtmpPush: RtmpPushRouterOutputConfiguration;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      RtmpPush?: undefined;
      SrtCaller: SrtCallerRouterOutputConfiguration;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      RtmpPush?: undefined;
      SrtCaller?: undefined;
      Rtp: RtpRouterOutputConfiguration;
    };
export type RouterOutputProtocol =
  | "RTP"
  | "RIST"
  | "SRT_CALLER"
  | "SRT_LISTENER"
  | "RTMP_PUSH"
  | (string & {});
export interface StandardRouterOutputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfiguration: RouterOutputProtocolConfiguration;
  Protocol?: RouterOutputProtocol | undefined;
}
export type FlowSourceArn = string;
export interface MediaConnectFlowRouterOutputConfiguration {
  FlowArn?: string | undefined;
  FlowSourceArn?: string | undefined;
  DestinationTransitEncryption: FlowTransitEncryption;
}
export type MediaLiveInputArn = string;
export type MediaLiveInputPipelineId = "PIPELINE_0" | "PIPELINE_1" | (string & {});
export interface MediaLiveInputRouterOutputConfiguration {
  MediaLiveInputArn?: string | undefined;
  MediaLivePipelineId?: MediaLiveInputPipelineId | undefined;
  DestinationTransitEncryption: MediaLiveTransitEncryption;
}
export interface SourceEndpointRouterOutputConfiguration {
  EndpointLifecycleManagement: EndpointLifecycle;
  DestinationTransitEncryptionType?: EndpointEncryptionType | undefined;
  DestinationTransitEncryption: EndpointEncryptionConfiguration;
}
export type RouterOutputConfiguration =
  | {
      Standard: StandardRouterOutputConfiguration;
      MediaConnectFlow?: undefined;
      MediaLiveInput?: undefined;
      SourceEndpoint?: undefined;
    }
  | {
      Standard?: undefined;
      MediaConnectFlow: MediaConnectFlowRouterOutputConfiguration;
      MediaLiveInput?: undefined;
      SourceEndpoint?: undefined;
    }
  | {
      Standard?: undefined;
      MediaConnectFlow?: undefined;
      MediaLiveInput: MediaLiveInputRouterOutputConfiguration;
      SourceEndpoint?: undefined;
    }
  | {
      Standard?: undefined;
      MediaConnectFlow?: undefined;
      MediaLiveInput?: undefined;
      SourceEndpoint: SourceEndpointRouterOutputConfiguration;
    };
export type RouterOutputRoutedState = "ROUTED" | "ROUTING" | "UNROUTED" | (string & {});
export type RouterOutputTier =
  | "OUTPUT_100"
  | "OUTPUT_50"
  | "OUTPUT_20"
  | "OUTPUT_500"
  | "OUTPUT_250"
  | (string & {});
export interface RouterOutputMessage {
  Code: string;
  Message: string;
}
export type RouterOutputMessages = RouterOutputMessage[];
export interface StandardRouterOutputStreamDetails {
  DestinationIpAddress?: string | undefined;
}
export interface MediaConnectFlowRouterOutputStreamDetails {}
export interface MediaLiveInputRouterOutputStreamDetails {}
export interface SourceEndpointRouterOutputStreamDetails {}
export type RouterOutputStreamDetails =
  | {
      Standard: StandardRouterOutputStreamDetails;
      MediaConnectFlow?: undefined;
      MediaLiveInput?: undefined;
      SourceEndpoint?: undefined;
    }
  | {
      Standard?: undefined;
      MediaConnectFlow: MediaConnectFlowRouterOutputStreamDetails;
      MediaLiveInput?: undefined;
      SourceEndpoint?: undefined;
    }
  | {
      Standard?: undefined;
      MediaConnectFlow?: undefined;
      MediaLiveInput: MediaLiveInputRouterOutputStreamDetails;
      SourceEndpoint?: undefined;
    }
  | {
      Standard?: undefined;
      MediaConnectFlow?: undefined;
      MediaLiveInput?: undefined;
      SourceEndpoint: SourceEndpointRouterOutputStreamDetails;
    };
export type FabricLatencyMode = "BALANCED" | "LOW_LATENCY" | (string & {});
export interface FabricConfiguration {
  RecoveryLatencyMode: FabricLatencyMode;
}
export type SourceEndpointArnList = string[];
const SourceEndpointArnList = __listOfString as any as S.Schema<SourceEndpointArnList>;
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
  IpAddress?: string | undefined;
  RoutedInputArn?: string | undefined;
  MaintenanceType: MaintenanceType;
  MaintenanceConfiguration: MaintenanceConfiguration;
  MaintenanceScheduleType?: MaintenanceScheduleType | undefined;
  MaintenanceSchedule?: MaintenanceSchedule | undefined;
  FabricConfiguration?: FabricConfiguration | undefined;
  AssociatedSourceEndpointArns?: string[] | undefined;
}
export type RouterOutputList = RouterOutput[];
export interface BatchGetRouterOutputError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export type BatchGetRouterOutputErrorList = BatchGetRouterOutputError_[];
export interface BatchGetRouterOutputResponse {
  RouterOutputs: (RouterOutput & { FabricConfiguration: FabricConfiguration })[];
  Errors: BatchGetRouterOutputError_[];
}
export interface BatchGetSourceEndpointRequest {
  Arns: string[];
}
export interface SourceEndpointMessage {
  Code: string;
  Message: string;
}
export type SourceEndpointMessageList = SourceEndpointMessage[];
export interface PublicSourceEndpointNetworkingConfigurationAllowRule {
  Cidr: string;
}
export type PublicSourceEndpointNetworkingConfigurationAllowRuleList =
  PublicSourceEndpointNetworkingConfigurationAllowRule[];
export interface PublicSourceEndpointNetworkingConfiguration {
  SourceAllowRules: PublicSourceEndpointNetworkingConfigurationAllowRule[];
}
export interface VpcSourceEndpointNetworkingConfiguration {
  SecurityGroupIds: string[];
  SubnetId: string;
}
export type StandardSourceEndpointNetworkingConfiguration =
  | { Public: PublicSourceEndpointNetworkingConfiguration; Vpc?: undefined }
  | { Public?: undefined; Vpc: VpcSourceEndpointNetworkingConfiguration };
export interface RistStandardSourceEndpointConfiguration {
  DestinationIngestPort: number;
  RecoveryLatencyMilliseconds: number;
}
export interface SrtListenerStandardSourceEndpointConfiguration {
  SourceListenerPort: number;
  SourceAddress: string;
  MinimumLatencyMilliseconds: number;
  StreamId?: string | undefined;
  EncryptionPassphrase?: EndpointEncryptionSecretConfiguration | undefined;
}
export interface SrtCallerStandardSourceEndpointConfiguration {
  DestinationIngestPort: number;
  MinimumLatencyMilliseconds: number;
  EncryptionPassphrase?: EndpointEncryptionSecretConfiguration | undefined;
}
export interface RtpStandardSourceEndpointConfiguration {
  DestinationIngestPort: number;
  ForwardErrorCorrectionState: ForwardErrorCorrectionState;
}
export type StandardSourceEndpointProtocolConfiguration =
  | {
      Rist: RistStandardSourceEndpointConfiguration;
      SrtListener?: undefined;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener: SrtListenerStandardSourceEndpointConfiguration;
      SrtCaller?: undefined;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      SrtCaller: SrtCallerStandardSourceEndpointConfiguration;
      Rtp?: undefined;
    }
  | {
      Rist?: undefined;
      SrtListener?: undefined;
      SrtCaller?: undefined;
      Rtp: RtpStandardSourceEndpointConfiguration;
    };
export type SourceEndpointNetworkingType = "PUBLIC" | "VPC" | (string & {});
export type SourceEndpointProtocol = "RTP" | "RIST" | "SRT_CALLER" | "SRT_LISTENER" | (string & {});
export interface StandardSourceEndpointConfiguration {
  Name: string;
  SourceNetworkingConfiguration: StandardSourceEndpointNetworkingConfiguration;
  ProtocolConfiguration: StandardSourceEndpointProtocolConfiguration;
  SourceNetworkingType?: SourceEndpointNetworkingType | undefined;
  Protocol?: SourceEndpointProtocol | undefined;
}
export interface RouterOutputSourceEndpointConfiguration {
  RouterOutputArn: string;
}
export type SourceEndpointConfiguration =
  | { Standard: StandardSourceEndpointConfiguration; RouterOutput?: undefined }
  | { Standard?: undefined; RouterOutput: RouterOutputSourceEndpointConfiguration };
export type SourceEndpointRegistrationState =
  | "REGISTERED"
  | "REGISTERING"
  | "DEREGISTERING"
  | "REGISTRATION_FAILED"
  | (string & {});
export type SourceEndpointConnectionState =
  | "CONNECTED"
  | "DISCONNECTED"
  | "CONNECTING"
  | "DISCONNECTING"
  | (string & {});
export interface StandardSourceEndpointConnectionDetails {
  DestinationIpAddress?: string | undefined;
  DestinationIngestPort?: number | undefined;
  DestinationDecryptionType?: EndpointEncryptionType | undefined;
  DestinationDecryptionConfiguration?: EndpointEncryptionConfiguration | undefined;
  DestinationEndpointType?: DestinationEndpointType | undefined;
}
export interface RouterOutputSourceEndpointConnectionDetails {
  DestinationDecryptionType?: EndpointEncryptionType | undefined;
  DestinationDecryptionConfiguration?: EndpointEncryptionConfiguration | undefined;
  DestinationEndpointType?: DestinationEndpointType | undefined;
}
export type SourceEndpointConnectionDetails =
  | { Standard: StandardSourceEndpointConnectionDetails; RouterOutput?: undefined }
  | { Standard?: undefined; RouterOutput: RouterOutputSourceEndpointConnectionDetails };
export interface StandardSourceEndpointAssociatedResourceDetails {}
export interface RouterOutputSourceEndpointAssociatedResourceDetails {
  Name: string;
  MaximumBitrate: number;
  State: RouterOutputState;
  Messages: RouterOutputMessage[];
}
export type SourceEndpointAssociatedResourceDetails =
  | { Standard: StandardSourceEndpointAssociatedResourceDetails; RouterOutput?: undefined }
  | { Standard?: undefined; RouterOutput: RouterOutputSourceEndpointAssociatedResourceDetails };
export interface SourceEndpoint {
  Name: string;
  Arn: string;
  Id: string;
  Description: string;
  RegionName: string;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  CreatedAt: Date;
  UpdatedAt: Date;
  LifecycleManagement: EndpointLifecycle;
  Messages: SourceEndpointMessage[];
  SourceType: SourceEndpointType;
  Configuration: SourceEndpointConfiguration;
  ResourceShareOwnership: ResourceShareOwnership;
  ResourceShareDetails: ResourceShareDetails;
  RegistrationState: SourceEndpointRegistrationState;
  ConnectionState: SourceEndpointConnectionState;
  ConnectionDetails?: SourceEndpointConnectionDetails | undefined;
  ConnectedDestinations: string[];
  EncryptionType?: EndpointEncryptionType | undefined;
  EncryptionConfiguration?: EndpointEncryptionConfiguration | undefined;
  AssociatedResourceDetails: SourceEndpointAssociatedResourceDetails;
  Tags: { [key: string]: string | undefined };
}
export type SourceEndpointList = SourceEndpoint[];
export interface BatchGetSourceEndpointError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export type BatchGetSourceEndpointErrorList = BatchGetSourceEndpointError_[];
export interface BatchGetSourceEndpointResponse {
  SourceEndpoints: SourceEndpoint[];
  Errors: BatchGetSourceEndpointError_[];
}
export interface ConnectEndpointsRequest {
  DestinationEndpointArn: string;
  SourceEndpointArn: string;
}
export interface ConnectEndpointsResponse {
  DestinationEndpointArn: string;
  DestinationEndpointName: string;
  SourceEndpointArn: string;
  SourceEndpointName: string;
}
export interface AddEgressGatewayBridgeRequest {
  MaxBitrate?: number | undefined;
}
export interface AddIngressGatewayBridgeRequest {
  MaxBitrate?: number | undefined;
  MaxOutputs?: number | undefined;
}
export type FailoverMode = "MERGE" | "FAILOVER" | (string & {});
export interface SourcePriority {
  PrimarySource?: string | undefined;
}
export interface FailoverConfig {
  FailoverMode?: FailoverMode | undefined;
  RecoveryWindow?: number | undefined;
  SourcePriority?: SourcePriority | undefined;
  State?: State | undefined;
}
export interface CreateBridgeRequest {
  EgressGatewayBridge?: AddEgressGatewayBridgeRequest | undefined;
  IngressGatewayBridge?: AddIngressGatewayBridgeRequest | undefined;
  Name?: string | undefined;
  Outputs?: AddBridgeOutputRequest[] | undefined;
  PlacementArn?: string | undefined;
  SourceFailoverConfig?: FailoverConfig | undefined;
  Sources?: AddBridgeSourceRequest[] | undefined;
}
export interface MessageDetail {
  Code?: string | undefined;
  Message?: string | undefined;
  ResourceName?: string | undefined;
}
export type __listOfMessageDetail = MessageDetail[];
const __listOfMessageDetail = /*@__PURE__*/ __L.at(__c65, 1);
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
  InstanceId?: string | undefined;
  MaxBitrate?: number | undefined;
}
export interface IngressGatewayBridge {
  InstanceId?: string | undefined;
  MaxBitrate?: number | undefined;
  MaxOutputs?: number | undefined;
}
export interface Bridge {
  BridgeArn?: string | undefined;
  BridgeMessages?: MessageDetail[] | undefined;
  BridgeState?: BridgeState | undefined;
  EgressGatewayBridge?: EgressGatewayBridge | undefined;
  IngressGatewayBridge?: IngressGatewayBridge | undefined;
  Name?: string | undefined;
  Outputs?: BridgeOutput[] | undefined;
  PlacementArn?: string | undefined;
  SourceFailoverConfig?: FailoverConfig | undefined;
  Sources?: BridgeSource[] | undefined;
}
export interface CreateBridgeResponse {
  Bridge?:
    | (Bridge & {
        BridgeArn: string;
        BridgeState: BridgeState;
        Name: string;
        PlacementArn: string;
        BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
        EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
        IngressGatewayBridge: IngressGatewayBridge & { MaxBitrate: number; MaxOutputs: number };
        Outputs: (BridgeOutput & {
          FlowOutput: BridgeFlowOutput & { FlowArn: string; FlowSourceArn: string; Name: string };
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
      })
    | undefined;
}
export type EntitlementStatus = "ENABLED" | "DISABLED" | (string & {});
export interface GrantEntitlementRequest {
  DataTransferSubscriberFeePercent?: number | undefined;
  Description?: string | undefined;
  Encryption?: Encryption | undefined;
  EntitlementStatus?: EntitlementStatus | undefined;
  Name?: string | undefined;
  Subscribers?: string[] | undefined;
  EntitlementTags?: { [key: string]: string | undefined } | undefined;
}
export type __listOfGrantEntitlementRequest = GrantEntitlementRequest[];
const __listOfGrantEntitlementRequest = /*@__PURE__*/ __L.at(__c74, 1);
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
  MaintenanceDay?: MaintenanceDay | undefined;
  MaintenanceStartHour?: string | undefined;
}
export type ThumbnailState = "ENABLED" | "DISABLED" | (string & {});
export interface SilentAudio {
  State?: State | undefined;
  ThresholdSeconds?: number | undefined;
}
export interface AudioMonitoringSetting {
  SilentAudio?: SilentAudio | undefined;
}
export type __listOfAudioMonitoringSetting = AudioMonitoringSetting[];
const __listOfAudioMonitoringSetting = /*@__PURE__*/ __L.at(__c70, 2);
export interface BlackFrames {
  State?: State | undefined;
  ThresholdSeconds?: number | undefined;
}
export interface FrozenFrames {
  State?: State | undefined;
  ThresholdSeconds?: number | undefined;
}
export interface VideoMonitoringSetting {
  BlackFrames?: BlackFrames | undefined;
  FrozenFrames?: FrozenFrames | undefined;
}
export type __listOfVideoMonitoringSetting = VideoMonitoringSetting[];
const __listOfVideoMonitoringSetting = /*@__PURE__*/ __L.at(__c70, 4);
export interface MonitoringConfig {
  ThumbnailState?: ThumbnailState | undefined;
  AudioMonitoringSettings?: AudioMonitoringSetting[] | undefined;
  ContentQualityAnalysisState?: ContentQualityAnalysisState | undefined;
  VideoMonitoringSettings?: VideoMonitoringSetting[] | undefined;
}
export type FlowSize = "MEDIUM" | "LARGE" | "LARGE_4X" | (string & {});
export type NdiState = "ENABLED" | "DISABLED" | (string & {});
export interface NdiDiscoveryServerConfig {
  DiscoveryServerAddress?: string | undefined;
  DiscoveryServerPort?: number | undefined;
  VpcInterfaceAdapter?: string | undefined;
}
export type __listOfNdiDiscoveryServerConfig = NdiDiscoveryServerConfig[];
const __listOfNdiDiscoveryServerConfig = /*@__PURE__*/ __L.at(__c70, 7);
export interface NdiConfig {
  NdiState?: NdiState | undefined;
  MachineName?: string | undefined;
  NdiDiscoveryServers?: NdiDiscoveryServerConfig[] | undefined;
}
export type EncodingProfile =
  | "DISTRIBUTION_H264_DEFAULT"
  | "CONTRIBUTION_H264_DEFAULT"
  | (string & {});
export interface EncodingConfig {
  EncodingProfile?: EncodingProfile | undefined;
  VideoMaxBitrate?: number | undefined;
}
export interface CreateFlowRequest {
  AvailabilityZone?: string | undefined;
  Entitlements?: GrantEntitlementRequest[] | undefined;
  MediaStreams?: AddMediaStreamRequest[] | undefined;
  Name?: string | undefined;
  Outputs?: AddOutputRequest[] | undefined;
  Source?: SetSourceRequest | undefined;
  SourceFailoverConfig?: FailoverConfig | undefined;
  Sources?: SetSourceRequest[] | undefined;
  VpcInterfaces?: VpcInterfaceRequest[] | undefined;
  Maintenance?: AddMaintenance | undefined;
  SourceMonitoringConfig?: MonitoringConfig | undefined;
  FlowSize?: FlowSize | undefined;
  NdiConfig?: NdiConfig | undefined;
  EncodingConfig?: EncodingConfig | undefined;
  FlowTags?: { [key: string]: string | undefined } | undefined;
}
export interface Entitlement {
  DataTransferSubscriberFeePercent?: number | undefined;
  Description?: string | undefined;
  Encryption?: Encryption | undefined;
  EntitlementArn?: string | undefined;
  EntitlementStatus?: EntitlementStatus | undefined;
  Name?: string | undefined;
  Subscribers?: string[] | undefined;
}
export type __listOfEntitlement = Entitlement[];
const __listOfEntitlement = /*@__PURE__*/ __L.at(__c71, 0);
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
  MaintenanceDay?: MaintenanceDay | undefined;
  MaintenanceDeadline?: string | undefined;
  MaintenanceScheduledDate?: string | undefined;
  MaintenanceStartHour?: string | undefined;
}
export interface Flow {
  AvailabilityZone?: string | undefined;
  Description?: string | undefined;
  EgressIp?: string | undefined;
  Entitlements?: Entitlement[] | undefined;
  FlowArn?: string | undefined;
  MediaStreams?: MediaStream[] | undefined;
  Name?: string | undefined;
  Outputs?: Output[] | undefined;
  Source?: Source | undefined;
  SourceFailoverConfig?: FailoverConfig | undefined;
  Sources?: Source[] | undefined;
  Status?: Status | undefined;
  VpcInterfaces?: VpcInterface[] | undefined;
  Maintenance?: Maintenance | undefined;
  SourceMonitoringConfig?: MonitoringConfig | undefined;
  FlowSize?: FlowSize | undefined;
  NdiConfig?: NdiConfig | undefined;
  EncodingConfig?: EncodingConfig | undefined;
}
export interface CreateFlowResponse {
  Flow?:
    | (Flow & {
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
      })
    | undefined;
}
export interface GatewayNetwork {
  CidrBlock?: string | undefined;
  Name?: string | undefined;
}
export type __listOfGatewayNetwork = GatewayNetwork[];
const __listOfGatewayNetwork = /*@__PURE__*/ __L.at(__c76, 1);
export interface CreateGatewayRequest {
  EgressCidrBlocks?: string[] | undefined;
  Name?: string | undefined;
  Networks?: GatewayNetwork[] | undefined;
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
  EgressCidrBlocks?: string[] | undefined;
  GatewayArn?: string | undefined;
  GatewayMessages?: MessageDetail[] | undefined;
  GatewayState?: GatewayState | undefined;
  Name?: string | undefined;
  Networks?: GatewayNetwork[] | undefined;
}
export interface CreateGatewayResponse {
  Gateway?:
    | (Gateway & {
        EgressCidrBlocks: __listOfString;
        GatewayArn: string;
        Name: string;
        Networks: (GatewayNetwork & { CidrBlock: string; Name: string })[];
        GatewayMessages: (MessageDetail & { Code: string; Message: string })[];
      })
    | undefined;
}
export type ClientToken = string;
export interface CreateRouterInputRequest {
  Name: string;
  Configuration: RouterInputConfiguration;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  Tier: RouterInputTier;
  RegionName?: string | undefined;
  AvailabilityZone?: string | undefined;
  TransitEncryption?: RouterInputTransitEncryption | undefined;
  MaintenanceConfiguration?: MaintenanceConfiguration | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration | undefined;
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
  RegionName?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
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
  RegionName?: string | undefined;
  AvailabilityZone?: string | undefined;
  MaintenanceConfiguration?: MaintenanceConfiguration | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  FabricConfiguration?: FabricConfiguration | undefined;
  ClientToken?: string | undefined;
}
export interface CreateRouterOutputResponse {
  RouterOutput: RouterOutput & { FabricConfiguration: FabricConfiguration };
}
export interface DeleteBridgeRequest {
  BridgeArn: string;
}
export interface DeleteBridgeResponse {
  BridgeArn?: string | undefined;
}
export interface DeleteFlowRequest {
  FlowArn: string;
}
export interface DeleteFlowResponse {
  FlowArn?: string | undefined;
  Status?: Status | undefined;
}
export type GatewayArn = string;
export interface DeleteGatewayRequest {
  GatewayArn: string;
}
export interface DeleteGatewayResponse {
  GatewayArn?: string | undefined;
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
export interface DeregisterDestinationEndpointRequest {
  Arn: string;
}
export interface DeregisterDestinationEndpointResponse {
  Arn: string;
  Name: string;
}
export type GatewayInstanceArn = string;
export interface DeregisterGatewayInstanceRequest {
  Force?: boolean | undefined;
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
  GatewayInstanceArn?: string | undefined;
  InstanceState?: InstanceState | undefined;
}
export interface DeregisterSourceEndpointRequest {
  Arn: string;
}
export interface DeregisterSourceEndpointResponse {
  Arn: string;
  Name: string;
}
export interface DescribeBridgeRequest {
  BridgeArn: string;
}
export interface DescribeBridgeResponse {
  Bridge?:
    | (Bridge & {
        BridgeArn: string;
        BridgeState: BridgeState;
        Name: string;
        PlacementArn: string;
        BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
        EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
        IngressGatewayBridge: IngressGatewayBridge & { MaxBitrate: number; MaxOutputs: number };
        Outputs: (BridgeOutput & {
          FlowOutput: BridgeFlowOutput & { FlowArn: string; FlowSourceArn: string; Name: string };
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
      })
    | undefined;
}
export interface DescribeFlowRequest {
  FlowArn: string;
}
export interface Messages {
  Errors?: string[] | undefined;
}
export interface DescribeFlowResponse {
  Flow?:
    | (Flow & {
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
      })
    | undefined;
  Messages?: (Messages & { Errors: __listOfString }) | undefined;
}
export interface DescribeFlowSourceMetadataRequest {
  FlowArn: string;
}
export type VideoColorimetry =
  | "BT709"
  | "BT470M"
  | "BT470BG"
  | "BT601"
  | "SMPTE240M"
  | "GENERIC_FILM"
  | "BT2020"
  | "SMPTE428"
  | "SMPTE431"
  | "SMPTE432"
  | (string & {});
export type VideoTransferCharacteristics =
  | "BT709"
  | "BT470M"
  | "BT470BG"
  | "BT601"
  | "SMPTE240M"
  | "LINEAR"
  | "LOG100"
  | "LOG316"
  | "IEC61966_2_4"
  | "BT1361_ECG"
  | "IEC61966_2_1"
  | "BT2020_10"
  | "BT2020_12"
  | "BT2100_PQ"
  | "SMPTE428"
  | "BT2100_HLG"
  | (string & {});
export type VideoMatrixCoefficients =
  | "IDENTITY"
  | "BT709"
  | "FCC"
  | "BT470BG"
  | "BT601"
  | "SMPTE240M"
  | "YCGCO"
  | "BT2020_NCL"
  | "BT2020_CL"
  | "SMPTE2085"
  | "CHROMATICITY_DERIVED_NCL"
  | "CHROMATICITY_DERIVED_CL"
  | "BT2100_ICTCP"
  | "IPT_C2"
  | (string & {});
export interface ColorInformation {
  Colorimetry?: VideoColorimetry | undefined;
  TransferCharacteristics?: VideoTransferCharacteristics | undefined;
  MatrixCoefficients?: VideoMatrixCoefficients | undefined;
}
export interface FrameResolution {
  FrameHeight?: number | undefined;
  FrameWidth?: number | undefined;
}
export interface TransportStream {
  Channels?: number | undefined;
  Codec?: string | undefined;
  Color?: ColorInformation | undefined;
  FrameRate?: string | undefined;
  FrameResolution?: FrameResolution | undefined;
  Pid?: number | undefined;
  SampleRate?: number | undefined;
  SampleSize?: number | undefined;
  StreamType?: string | undefined;
}
export type __listOfTransportStream = TransportStream[];
const __listOfTransportStream = /*@__PURE__*/ __L.at(__c98, 3);
export interface TransportStreamProgram {
  PcrPid?: number | undefined;
  ProgramName?: string | undefined;
  ProgramNumber?: number | undefined;
  ProgramPid?: number | undefined;
  Streams?: TransportStream[] | undefined;
}
export type __listOfTransportStreamProgram = TransportStreamProgram[];
const __listOfTransportStreamProgram = /*@__PURE__*/ __L.at(__c98, 5);
export interface TransportMediaInfo {
  Programs?: TransportStreamProgram[] | undefined;
  TsId?: number | undefined;
}
export interface NdiSourceInfo {
  SourceName?: string | undefined;
}
export type __listOfNdiSourceInfo = NdiSourceInfo[];
const __listOfNdiSourceInfo = /*@__PURE__*/ __L.at(__c97, 2);
export interface NdiMediaStreamInfo {
  StreamType?: string | undefined;
  Codec?: string | undefined;
  StreamId?: number | undefined;
  ScanMode?: ScanMode | undefined;
  Color?: ColorInformation | undefined;
  FrameResolution?: FrameResolution | undefined;
  FrameRate?: string | undefined;
  Channels?: number | undefined;
  SampleRate?: number | undefined;
}
export type __listOfNdiMediaStreamInfo = NdiMediaStreamInfo[];
const __listOfNdiMediaStreamInfo = /*@__PURE__*/ __L.at(__c97, 4);
export interface NdiMediaInfo {
  Streams?: NdiMediaStreamInfo[] | undefined;
}
export interface NdiSourceMetadataInfo {
  ActiveSource?: NdiSourceInfo | undefined;
  DiscoveredSources?: NdiSourceInfo[] | undefined;
  MediaInfo?: NdiMediaInfo | undefined;
  Messages?: MessageDetail[] | undefined;
}
export interface DescribeFlowSourceMetadataResponse {
  FlowArn?: string | undefined;
  Messages?: (MessageDetail & { Code: string; Message: string })[] | undefined;
  Timestamp?: Date | undefined;
  TransportMediaInfo?:
    | (TransportMediaInfo & {
        Programs: (TransportStreamProgram & {
          PcrPid: number;
          ProgramNumber: number;
          ProgramPid: number;
          Streams: (TransportStream & {
            Pid: number;
            StreamType: string;
            FrameResolution: FrameResolution & { FrameHeight: number; FrameWidth: number };
          })[];
        })[];
      })
    | undefined;
  NdiInfo?:
    | (NdiSourceMetadataInfo & {
        DiscoveredSources: (NdiSourceInfo & { SourceName: string })[];
        MediaInfo: NdiMediaInfo & {
          Streams: (NdiMediaStreamInfo & {
            StreamType: string;
            Codec: string;
            StreamId: number;
            FrameResolution: FrameResolution & { FrameHeight: number; FrameWidth: number };
          })[];
        };
        Messages: (MessageDetail & { Code: string; Message: string })[];
        ActiveSource: NdiSourceInfo & { SourceName: string };
      })
    | undefined;
}
export interface DescribeFlowSourceThumbnailRequest {
  FlowArn: string;
}
export interface ThumbnailDetails {
  FlowArn?: string | undefined;
  Thumbnail?: string | undefined;
  ThumbnailMessages?: MessageDetail[] | undefined;
  Timecode?: string | undefined;
  Timestamp?: Date | undefined;
}
export interface DescribeFlowSourceThumbnailResponse {
  ThumbnailDetails?:
    | (ThumbnailDetails & {
        FlowArn: string;
        ThumbnailMessages: (MessageDetail & { Code: string; Message: string })[];
      })
    | undefined;
}
export interface DescribeGatewayRequest {
  GatewayArn: string;
}
export interface DescribeGatewayResponse {
  Gateway?:
    | (Gateway & {
        EgressCidrBlocks: __listOfString;
        GatewayArn: string;
        Name: string;
        Networks: (GatewayNetwork & { CidrBlock: string; Name: string })[];
        GatewayMessages: (MessageDetail & { Code: string; Message: string })[];
      })
    | undefined;
}
export interface DescribeGatewayInstanceRequest {
  GatewayInstanceArn: string;
}
export type BridgePlacement = "AVAILABLE" | "LOCKED" | (string & {});
export type ConnectionStatus = "CONNECTED" | "DISCONNECTED" | (string & {});
export interface GatewayInstance {
  BridgePlacement?: BridgePlacement | undefined;
  ConnectionStatus?: ConnectionStatus | undefined;
  GatewayArn?: string | undefined;
  GatewayInstanceArn?: string | undefined;
  InstanceId?: string | undefined;
  InstanceMessages?: MessageDetail[] | undefined;
  InstanceState?: InstanceState | undefined;
  RunningBridgeCount?: number | undefined;
}
export interface DescribeGatewayInstanceResponse {
  GatewayInstance?:
    | (GatewayInstance & {
        BridgePlacement: BridgePlacement;
        ConnectionStatus: ConnectionStatus;
        GatewayArn: string;
        GatewayInstanceArn: string;
        InstanceId: string;
        InstanceState: InstanceState;
        RunningBridgeCount: number;
        InstanceMessages: (MessageDetail & { Code: string; Message: string })[];
      })
    | undefined;
}
export type OfferingArn = string;
export interface DescribeOfferingRequest {
  OfferingArn: string;
}
export type DurationUnits = "MONTHS" | (string & {});
export type PriceUnits = "HOURLY" | (string & {});
export type ResourceType = "Mbps_Outbound_Bandwidth" | (string & {});
export interface ResourceSpecification {
  ReservedBitrate?: number | undefined;
  ResourceType?: ResourceType | undefined;
}
export interface Offering {
  CurrencyCode?: string | undefined;
  Duration?: number | undefined;
  DurationUnits?: DurationUnits | undefined;
  OfferingArn?: string | undefined;
  OfferingDescription?: string | undefined;
  PricePerUnit?: string | undefined;
  PriceUnits?: PriceUnits | undefined;
  ResourceSpecification?: ResourceSpecification | undefined;
}
export interface DescribeOfferingResponse {
  Offering?:
    | (Offering & {
        CurrencyCode: string;
        Duration: number;
        DurationUnits: DurationUnits;
        OfferingArn: string;
        OfferingDescription: string;
        PricePerUnit: string;
        PriceUnits: PriceUnits;
        ResourceSpecification: ResourceSpecification & { ResourceType: ResourceType };
      })
    | undefined;
}
export type ReservationArn = string;
export interface DescribeReservationRequest {
  ReservationArn: string;
}
export type ReservationState = "ACTIVE" | "EXPIRED" | "PROCESSING" | "CANCELED" | (string & {});
export interface Reservation {
  CurrencyCode?: string | undefined;
  Duration?: number | undefined;
  DurationUnits?: DurationUnits | undefined;
  End?: string | undefined;
  OfferingArn?: string | undefined;
  OfferingDescription?: string | undefined;
  PricePerUnit?: string | undefined;
  PriceUnits?: PriceUnits | undefined;
  ReservationArn?: string | undefined;
  ReservationName?: string | undefined;
  ReservationState?: ReservationState | undefined;
  ResourceSpecification?: ResourceSpecification | undefined;
  Start?: string | undefined;
}
export interface DescribeReservationResponse {
  Reservation?:
    | (Reservation & {
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
        ResourceSpecification: ResourceSpecification & { ResourceType: ResourceType };
        Start: string;
      })
    | undefined;
}
export interface DisconnectEndpointsRequest {
  DestinationEndpointArn: string;
  SourceEndpointArn: string;
}
export interface DisconnectEndpointsResponse {
  DestinationEndpointArn: string;
  DestinationEndpointName: string;
  SourceEndpointArn: string;
  SourceEndpointName: string;
}
export interface GetDestinationEndpointRequest {
  Arn: string;
}
export interface GetDestinationEndpointResponse {
  DestinationEndpoint: DestinationEndpoint;
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
export type RouterInputMetadata = { TransportStreamMediaInfo: TransportMediaInfo };
export interface RouterInputSourceMetadataDetails {
  SourceMetadataMessages: RouterInputMessage[];
  Timestamp: Date;
  RouterInputMetadata?: RouterInputMetadata | undefined;
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
  Thumbnail?: Uint8Array | undefined;
  Timecode?: string | undefined;
  Timestamp?: Date | undefined;
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
export interface GetSourceEndpointRequest {
  Arn: string;
}
export interface GetSourceEndpointResponse {
  SourceEndpoint: SourceEndpoint;
}
export interface GrantFlowEntitlementsRequest {
  Entitlements?: GrantEntitlementRequest[] | undefined;
  FlowArn: string;
}
export interface GrantFlowEntitlementsResponse {
  Entitlements?:
    | (Entitlement & {
        EntitlementArn: string;
        Name: string;
        Subscribers: __listOfString;
        Encryption: Encryption & { RoleArn: string };
      })[]
    | undefined;
  FlowArn?: string | undefined;
}
export type MaxResults = number;
export interface ListBridgesRequest {
  FilterArn?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListedBridge {
  BridgeArn?: string | undefined;
  BridgeState?: BridgeState | undefined;
  BridgeType?: string | undefined;
  Name?: string | undefined;
  PlacementArn?: string | undefined;
}
export type __listOfListedBridge = ListedBridge[];
const __listOfListedBridge = /*@__PURE__*/ __L.at(__c119, 2);
export interface ListBridgesResponse {
  Bridges?:
    | (ListedBridge & {
        BridgeArn: string;
        BridgeState: BridgeState;
        BridgeType: string;
        Name: string;
        PlacementArn: string;
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export type StringList = string[];
const StringList = __listOfString as any as S.Schema<StringList>;
export type DestinationEndpointTypeList = DestinationEndpointType[];
export type DestinationEndpointFilter =
  | { RegionNames: string[]; DestinationTypes?: undefined; NameContains?: undefined }
  | {
      RegionNames?: undefined;
      DestinationTypes: DestinationEndpointType[];
      NameContains?: undefined;
    }
  | { RegionNames?: undefined; DestinationTypes?: undefined; NameContains: string[] };
export type DestinationEndpointFilterList = DestinationEndpointFilter[];
export interface ListDestinationEndpointsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: DestinationEndpointFilter[] | undefined;
}
export interface ListedDestinationEndpoint {
  Name: string;
  Arn: string;
  Id: string;
  DestinationType: DestinationEndpointType;
  RegionName: string;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  CreatedAt: Date;
  UpdatedAt: Date;
  LifecycleManagement: EndpointLifecycle;
  MessageCount: number;
  ResourceShareOwnership: ResourceShareOwnership;
  ResourceShareState: ResourceShareState;
  RegistrationState: DestinationEndpointRegistrationState;
  ConnectionState: DestinationEndpointConnectionState;
  DecryptionType?: EndpointEncryptionType | undefined;
  ConnectedSource?: string | undefined;
  AssociatedResourceArn?: string | undefined;
}
export type ListedDestinationEndpointList = ListedDestinationEndpoint[];
export interface ListDestinationEndpointsResponse {
  DestinationEndpoints: ListedDestinationEndpoint[];
  NextToken?: string | undefined;
}
export interface ListEntitlementsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListedEntitlement {
  DataTransferSubscriberFeePercent?: number | undefined;
  EntitlementArn?: string | undefined;
  EntitlementName?: string | undefined;
}
export type __listOfListedEntitlement = ListedEntitlement[];
const __listOfListedEntitlement = /*@__PURE__*/ __L.at(__c122, 2);
export interface ListEntitlementsResponse {
  Entitlements?:
    | (ListedEntitlement & { EntitlementArn: string; EntitlementName: string })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface ListFlowsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type SourceType = "OWNED" | "ENTITLED" | (string & {});
export interface ListedFlow {
  AvailabilityZone?: string | undefined;
  Description?: string | undefined;
  FlowArn?: string | undefined;
  Name?: string | undefined;
  SourceType?: SourceType | undefined;
  Status?: Status | undefined;
  Maintenance?: Maintenance | undefined;
}
export type __listOfListedFlow = ListedFlow[];
const __listOfListedFlow = /*@__PURE__*/ __L.at(__c123, 2);
export interface ListFlowsResponse {
  Flows?:
    | (ListedFlow & {
        AvailabilityZone: string;
        Description: string;
        FlowArn: string;
        Name: string;
        SourceType: SourceType;
        Status: Status;
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface ListGatewayInstancesRequest {
  FilterArn?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListedGatewayInstance {
  GatewayArn?: string | undefined;
  GatewayInstanceArn?: string | undefined;
  InstanceId?: string | undefined;
  InstanceState?: InstanceState | undefined;
}
export type __listOfListedGatewayInstance = ListedGatewayInstance[];
const __listOfListedGatewayInstance = /*@__PURE__*/ __L.at(__c124, 2);
export interface ListGatewayInstancesResponse {
  Instances?:
    | (ListedGatewayInstance & {
        GatewayArn: string;
        GatewayInstanceArn: string;
        InstanceId: string;
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface ListGatewaysRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListedGateway {
  GatewayArn?: string | undefined;
  GatewayState?: GatewayState | undefined;
  Name?: string | undefined;
}
export type __listOfListedGateway = ListedGateway[];
const __listOfListedGateway = /*@__PURE__*/ __L.at(__c125, 2);
export interface ListGatewaysResponse {
  Gateways?:
    | (ListedGateway & { GatewayArn: string; GatewayState: GatewayState; Name: string })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface ListOfferingsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type __listOfOffering = Offering[];
const __listOfOffering = /*@__PURE__*/ __L.at(__c126, 1);
export interface ListOfferingsResponse {
  NextToken?: string | undefined;
  Offerings?:
    | (Offering & {
        CurrencyCode: string;
        Duration: number;
        DurationUnits: DurationUnits;
        OfferingArn: string;
        OfferingDescription: string;
        PricePerUnit: string;
        PriceUnits: PriceUnits;
        ResourceSpecification: ResourceSpecification & { ResourceType: ResourceType };
      })[]
    | undefined;
}
export interface ListReservationsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type __listOfReservation = Reservation[];
const __listOfReservation = /*@__PURE__*/ __L.at(__c127, 1);
export interface ListReservationsResponse {
  NextToken?: string | undefined;
  Reservations?:
    | (Reservation & {
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
        ResourceSpecification: ResourceSpecification & { ResourceType: ResourceType };
        Start: string;
      })[]
    | undefined;
}
export type RoutingScopeList = RoutingScope[];
export type RouterInputTypeList = RouterInputType[];
export type RouterInputFilter =
  | {
      NameContains: string[];
      RegionNames?: undefined;
      NetworkInterfaceArns?: undefined;
      RoutingScopes?: undefined;
      InputTypes?: undefined;
    }
  | {
      NameContains?: undefined;
      RegionNames: string[];
      NetworkInterfaceArns?: undefined;
      RoutingScopes?: undefined;
      InputTypes?: undefined;
    }
  | {
      NameContains?: undefined;
      RegionNames?: undefined;
      NetworkInterfaceArns: string[];
      RoutingScopes?: undefined;
      InputTypes?: undefined;
    }
  | {
      NameContains?: undefined;
      RegionNames?: undefined;
      NetworkInterfaceArns?: undefined;
      RoutingScopes: RoutingScope[];
      InputTypes?: undefined;
    }
  | {
      NameContains?: undefined;
      RegionNames?: undefined;
      NetworkInterfaceArns?: undefined;
      RoutingScopes?: undefined;
      InputTypes: RouterInputType[];
    };
export type RouterInputFilterList = RouterInputFilter[];
export interface ListRouterInputsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: RouterInputFilter[] | undefined;
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
  NetworkInterfaceArn?: string | undefined;
  MaintenanceScheduleType?: MaintenanceScheduleType | undefined;
  MaintenanceSchedule?: MaintenanceSchedule | undefined;
}
export type ListedRouterInputList = ListedRouterInput[];
export interface ListRouterInputsResponse {
  RouterInputs: ListedRouterInput[];
  NextToken?: string | undefined;
}
export type RouterNetworkInterfaceTypeList = RouterNetworkInterfaceType[];
export type RouterNetworkInterfaceFilter =
  | { RegionNames: string[]; NetworkInterfaceTypes?: undefined; NameContains?: undefined }
  | {
      RegionNames?: undefined;
      NetworkInterfaceTypes: RouterNetworkInterfaceType[];
      NameContains?: undefined;
    }
  | { RegionNames?: undefined; NetworkInterfaceTypes?: undefined; NameContains: string[] };
export type RouterNetworkInterfaceFilterList = RouterNetworkInterfaceFilter[];
export interface ListRouterNetworkInterfacesRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: RouterNetworkInterfaceFilter[] | undefined;
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
  NextToken?: string | undefined;
}
export type RouterOutputTypeList = RouterOutputType[];
export type RouterOutputFilter =
  | {
      RegionNames: string[];
      NetworkInterfaceArns?: undefined;
      RoutingScopes?: undefined;
      OutputTypes?: undefined;
      RoutedInputArns?: undefined;
      NameContains?: undefined;
    }
  | {
      RegionNames?: undefined;
      NetworkInterfaceArns: string[];
      RoutingScopes?: undefined;
      OutputTypes?: undefined;
      RoutedInputArns?: undefined;
      NameContains?: undefined;
    }
  | {
      RegionNames?: undefined;
      NetworkInterfaceArns?: undefined;
      RoutingScopes: RoutingScope[];
      OutputTypes?: undefined;
      RoutedInputArns?: undefined;
      NameContains?: undefined;
    }
  | {
      RegionNames?: undefined;
      NetworkInterfaceArns?: undefined;
      RoutingScopes?: undefined;
      OutputTypes: RouterOutputType[];
      RoutedInputArns?: undefined;
      NameContains?: undefined;
    }
  | {
      RegionNames?: undefined;
      NetworkInterfaceArns?: undefined;
      RoutingScopes?: undefined;
      OutputTypes?: undefined;
      RoutedInputArns: string[];
      NameContains?: undefined;
    }
  | {
      RegionNames?: undefined;
      NetworkInterfaceArns?: undefined;
      RoutingScopes?: undefined;
      OutputTypes?: undefined;
      RoutedInputArns?: undefined;
      NameContains: string[];
    };
export type RouterOutputFilterList = RouterOutputFilter[];
export interface ListRouterOutputsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: RouterOutputFilter[] | undefined;
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
  RoutedInputArn?: string | undefined;
  NetworkInterfaceArn?: string | undefined;
  MaintenanceScheduleType?: MaintenanceScheduleType | undefined;
  MaintenanceSchedule?: MaintenanceSchedule | undefined;
}
export type ListedRouterOutputList = ListedRouterOutput[];
export interface ListRouterOutputsResponse {
  RouterOutputs: ListedRouterOutput[];
  NextToken?: string | undefined;
}
export type SourceEndpointTypeList = SourceEndpointType[];
export type SourceEndpointFilter =
  | { RegionNames: string[]; SourceTypes?: undefined; NameContains?: undefined }
  | { RegionNames?: undefined; SourceTypes: SourceEndpointType[]; NameContains?: undefined }
  | { RegionNames?: undefined; SourceTypes?: undefined; NameContains: string[] };
export type SourceEndpointFilterList = SourceEndpointFilter[];
export interface ListSourceEndpointsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: SourceEndpointFilter[] | undefined;
}
export interface ListedSourceEndpoint {
  Name: string;
  Arn: string;
  Id: string;
  SourceType: SourceEndpointType;
  RegionName: string;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  CreatedAt: Date;
  UpdatedAt: Date;
  LifecycleManagement: EndpointLifecycle;
  MessageCount: number;
  ResourceShareOwnership: ResourceShareOwnership;
  ResourceShareState: ResourceShareState;
  RegistrationState: SourceEndpointRegistrationState;
  ConnectionState: SourceEndpointConnectionState;
  EncryptionType?: EndpointEncryptionType | undefined;
  ConnectedDestinationCount: number;
  AssociatedResourceArn?: string | undefined;
}
export type ListedSourceEndpointList = ListedSourceEndpoint[];
export interface ListSourceEndpointsResponse {
  SourceEndpoints: ListedSourceEndpoint[];
  NextToken?: string | undefined;
}
export interface ListTagsForGlobalResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForGlobalResourceResponse {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface PurchaseOfferingRequest {
  OfferingArn: string;
  ReservationName?: string | undefined;
  Start?: string | undefined;
}
export interface PurchaseOfferingResponse {
  Reservation?:
    | (Reservation & {
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
        ResourceSpecification: ResourceSpecification & { ResourceType: ResourceType };
        Start: string;
      })
    | undefined;
}
export interface RegisterDestinationEndpointRequest {
  Description?: string | undefined;
  Configuration: DestinationEndpointConfiguration;
  RegionName?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export interface RegisterDestinationEndpointResponse {
  DestinationEndpoint: DestinationEndpoint;
}
export interface RegisterSourceEndpointRequest {
  RegionName?: string | undefined;
  Description?: string | undefined;
  Configuration: SourceEndpointConfiguration;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export interface RegisterSourceEndpointResponse {
  SourceEndpoint: SourceEndpoint;
}
export interface RemoveBridgeOutputRequest {
  BridgeArn: string;
  OutputName: string;
}
export interface RemoveBridgeOutputResponse {
  BridgeArn?: string | undefined;
  OutputName?: string | undefined;
}
export interface RemoveBridgeSourceRequest {
  BridgeArn: string;
  SourceName: string;
}
export interface RemoveBridgeSourceResponse {
  BridgeArn?: string | undefined;
  SourceName?: string | undefined;
}
export interface RemoveFlowMediaStreamRequest {
  FlowArn: string;
  MediaStreamName: string;
}
export interface RemoveFlowMediaStreamResponse {
  FlowArn?: string | undefined;
  MediaStreamName?: string | undefined;
}
export interface RemoveFlowOutputRequest {
  FlowArn: string;
  OutputArn: string;
}
export interface RemoveFlowOutputResponse {
  FlowArn?: string | undefined;
  OutputArn?: string | undefined;
}
export interface RemoveFlowSourceRequest {
  FlowArn: string;
  SourceArn: string;
}
export interface RemoveFlowSourceResponse {
  FlowArn?: string | undefined;
  SourceArn?: string | undefined;
}
export interface RemoveFlowVpcInterfaceRequest {
  FlowArn: string;
  VpcInterfaceName: string;
}
export interface RemoveFlowVpcInterfaceResponse {
  FlowArn?: string | undefined;
  NonDeletedNetworkInterfaceIds?: string[] | undefined;
  VpcInterfaceName?: string | undefined;
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
  EntitlementArn?: string | undefined;
  FlowArn?: string | undefined;
}
export interface StartFlowRequest {
  FlowArn: string;
}
export interface StartFlowResponse {
  FlowArn?: string | undefined;
  Status?: Status | undefined;
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
  FlowArn?: string | undefined;
  Status?: Status | undefined;
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
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface TagGlobalResourceResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface TagResourceResponse {}
export interface TakeRouterInputRequest {
  RouterOutputArn: string;
  RouterInputArn?: string | undefined;
}
export interface TakeRouterInputResponse {
  RoutedState: RouterOutputRoutedState;
  RouterOutputArn: string;
  RouterOutputName: string;
  RouterInputArn?: string | undefined;
  RouterInputName?: string | undefined;
}
export interface UntagGlobalResourceRequest {
  ResourceArn: string;
  TagKeys?: string[] | undefined;
}
export interface UntagGlobalResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[] | undefined;
}
export interface UntagResourceResponse {}
export interface UpdateEgressGatewayBridgeRequest {
  MaxBitrate?: number | undefined;
}
export interface UpdateIngressGatewayBridgeRequest {
  MaxBitrate?: number | undefined;
  MaxOutputs?: number | undefined;
}
export interface UpdateFailoverConfig {
  FailoverMode?: FailoverMode | undefined;
  RecoveryWindow?: number | undefined;
  SourcePriority?: SourcePriority | undefined;
  State?: State | undefined;
}
export interface UpdateBridgeRequest {
  BridgeArn: string;
  EgressGatewayBridge?: UpdateEgressGatewayBridgeRequest | undefined;
  IngressGatewayBridge?: UpdateIngressGatewayBridgeRequest | undefined;
  SourceFailoverConfig?: UpdateFailoverConfig | undefined;
}
export interface UpdateBridgeResponse {
  Bridge?:
    | (Bridge & {
        BridgeArn: string;
        BridgeState: BridgeState;
        Name: string;
        PlacementArn: string;
        BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
        EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
        IngressGatewayBridge: IngressGatewayBridge & { MaxBitrate: number; MaxOutputs: number };
        Outputs: (BridgeOutput & {
          FlowOutput: BridgeFlowOutput & { FlowArn: string; FlowSourceArn: string; Name: string };
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
      })
    | undefined;
}
export interface UpdateBridgeNetworkOutputRequest {
  IpAddress?: string | undefined;
  NetworkName?: string | undefined;
  Port?: number | undefined;
  Protocol?: Protocol | undefined;
  Ttl?: number | undefined;
}
export interface UpdateBridgeOutputRequest {
  BridgeArn: string;
  NetworkOutput?: UpdateBridgeNetworkOutputRequest | undefined;
  OutputName: string;
}
export interface UpdateBridgeOutputResponse {
  BridgeArn?: string | undefined;
  Output?:
    | (BridgeOutput & {
        FlowOutput: BridgeFlowOutput & { FlowArn: string; FlowSourceArn: string; Name: string };
        NetworkOutput: BridgeNetworkOutput & {
          IpAddress: string;
          Name: string;
          NetworkName: string;
          Port: number;
          Protocol: Protocol;
          Ttl: number;
        };
      })
    | undefined;
}
export interface UpdateBridgeFlowSourceRequest {
  FlowArn?: string | undefined;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
}
export interface UpdateBridgeNetworkSourceRequest {
  MulticastIp?: string | undefined;
  MulticastSourceSettings?: MulticastSourceSettings | undefined;
  NetworkName?: string | undefined;
  Port?: number | undefined;
  Protocol?: Protocol | undefined;
}
export interface UpdateBridgeSourceRequest {
  BridgeArn: string;
  FlowSource?: UpdateBridgeFlowSourceRequest | undefined;
  NetworkSource?: UpdateBridgeNetworkSourceRequest | undefined;
  SourceName: string;
}
export interface UpdateBridgeSourceResponse {
  BridgeArn?: string | undefined;
  Source?:
    | (BridgeSource & {
        FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
        NetworkSource: BridgeNetworkSource & {
          MulticastIp: string;
          Name: string;
          NetworkName: string;
          Port: number;
          Protocol: Protocol;
        };
      })
    | undefined;
}
export type DesiredState = "ACTIVE" | "STANDBY" | "DELETED" | (string & {});
export interface UpdateBridgeStateRequest {
  BridgeArn: string;
  DesiredState?: DesiredState | undefined;
}
export interface UpdateBridgeStateResponse {
  BridgeArn?: string | undefined;
  DesiredState?: DesiredState | undefined;
}
export interface UpdateDestinationEndpointRequest {
  Arn: string;
  Description?: string | undefined;
  Configuration?: DestinationEndpointConfiguration | undefined;
}
export interface UpdateDestinationEndpointResponse {
  DestinationEndpoint: DestinationEndpoint;
}
export interface UpdateMaintenance {
  MaintenanceDay?: MaintenanceDay | undefined;
  MaintenanceScheduledDate?: string | undefined;
  MaintenanceStartHour?: string | undefined;
}
export interface UpdateFlowRequest {
  FlowArn: string;
  SourceFailoverConfig?: UpdateFailoverConfig | undefined;
  Maintenance?: UpdateMaintenance | undefined;
  SourceMonitoringConfig?: MonitoringConfig | undefined;
  NdiConfig?: NdiConfig | undefined;
  FlowSize?: FlowSize | undefined;
  EncodingConfig?: EncodingConfig | undefined;
}
export interface UpdateFlowResponse {
  Flow?:
    | (Flow & {
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
      })
    | undefined;
}
export interface UpdateEncryption {
  Algorithm?: Algorithm | undefined;
  ConstantInitializationVector?: string | undefined;
  DeviceId?: string | undefined;
  KeyType?: KeyType | undefined;
  Region?: string | undefined;
  ResourceId?: string | undefined;
  RoleArn?: string | undefined;
  SecretArn?: string | undefined;
  Url?: string | undefined;
}
export interface UpdateFlowEntitlementRequest {
  Description?: string | undefined;
  Encryption?: UpdateEncryption | undefined;
  EntitlementArn: string;
  EntitlementStatus?: EntitlementStatus | undefined;
  FlowArn: string;
  Subscribers?: string[] | undefined;
}
export interface UpdateFlowEntitlementResponse {
  Entitlement?:
    | (Entitlement & {
        EntitlementArn: string;
        Name: string;
        Subscribers: __listOfString;
        Encryption: Encryption & { RoleArn: string };
      })
    | undefined;
  FlowArn?: string | undefined;
}
export interface UpdateFlowMediaStreamRequest {
  Attributes?: MediaStreamAttributesRequest | undefined;
  ClockRate?: number | undefined;
  Description?: string | undefined;
  FlowArn: string;
  MediaStreamName: string;
  MediaStreamType?: MediaStreamType | undefined;
  VideoFormat?: string | undefined;
}
export interface UpdateFlowMediaStreamResponse {
  FlowArn?: string | undefined;
  MediaStream?:
    | (MediaStream & {
        Fmt: number;
        MediaStreamId: number;
        MediaStreamName: string;
        MediaStreamType: MediaStreamType;
        Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
      })
    | undefined;
}
export interface UpdateFlowOutputRequest {
  CidrAllowList?: string[] | undefined;
  Description?: string | undefined;
  Destination?: string | undefined;
  Encryption?: UpdateEncryption | undefined;
  FlowArn: string;
  MaxLatency?: number | undefined;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfigurationRequest[] | undefined;
  MinLatency?: number | undefined;
  OutputArn: string;
  Port?: number | undefined;
  Protocol?: Protocol | undefined;
  RemoteId?: string | undefined;
  SenderControlPort?: number | undefined;
  SenderIpAddress?: string | undefined;
  SmoothingLatency?: number | undefined;
  StreamId?: string | undefined;
  VpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
  OutputStatus?: OutputStatus | undefined;
  NdiProgramName?: string | undefined;
  NdiSpeedHqQuality?: number | undefined;
  RouterIntegrationState?: State | undefined;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption | undefined;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource | undefined;
  NdiAudioReferenceLevel?: number | undefined;
}
export interface UpdateFlowOutputResponse {
  FlowArn?: string | undefined;
  Output?:
    | (Output & {
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
      })
    | undefined;
}
export interface UpdateGatewayBridgeSourceRequest {
  BridgeArn?: string | undefined;
  VpcInterfaceAttachment?: VpcInterfaceAttachment | undefined;
}
export interface UpdateFlowSourceRequest {
  Decryption?: UpdateEncryption | undefined;
  Description?: string | undefined;
  EntitlementArn?: string | undefined;
  FlowArn: string;
  IngestPort?: number | undefined;
  MaxBitrate?: number | undefined;
  MaxLatency?: number | undefined;
  MaxSyncBuffer?: number | undefined;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfigurationRequest[] | undefined;
  MinLatency?: number | undefined;
  Protocol?: Protocol | undefined;
  SenderControlPort?: number | undefined;
  SenderIpAddress?: string | undefined;
  SourceArn: string;
  SourceListenerAddress?: string | undefined;
  SourceListenerPort?: number | undefined;
  StreamId?: string | undefined;
  VpcInterfaceName?: string | undefined;
  WhitelistCidr?: string | undefined;
  GatewayBridgeSource?: UpdateGatewayBridgeSourceRequest | undefined;
  NdiSourceSettings?: NdiSourceSettings | undefined;
  RouterIntegrationState?: State | undefined;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption | undefined;
}
export interface UpdateFlowSourceResponse {
  FlowArn?: string | undefined;
  Source?:
    | (Source & {
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
      })
    | undefined;
}
export interface UpdateGatewayInstanceRequest {
  BridgePlacement?: BridgePlacement | undefined;
  GatewayInstanceArn: string;
}
export interface UpdateGatewayInstanceResponse {
  BridgePlacement?: BridgePlacement | undefined;
  GatewayInstanceArn?: string | undefined;
}
export interface UpdateRouterInputRequest {
  Arn: string;
  Name?: string | undefined;
  Configuration?: RouterInputConfiguration | undefined;
  MaximumBitrate?: number | undefined;
  RoutingScope?: RoutingScope | undefined;
  Tier?: RouterInputTier | undefined;
  TransitEncryption?: RouterInputTransitEncryption | undefined;
  MaintenanceConfiguration?: MaintenanceConfiguration | undefined;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration | undefined;
}
export interface UpdateRouterInputResponse {
  RouterInput: RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  };
}
export interface UpdateRouterNetworkInterfaceRequest {
  Arn: string;
  Name?: string | undefined;
  Configuration?: RouterNetworkInterfaceConfiguration | undefined;
}
export interface UpdateRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export interface UpdateRouterOutputRequest {
  Arn: string;
  Name?: string | undefined;
  Configuration?: RouterOutputConfiguration | undefined;
  MaximumBitrate?: number | undefined;
  RoutingScope?: RoutingScope | undefined;
  Tier?: RouterOutputTier | undefined;
  MaintenanceConfiguration?: MaintenanceConfiguration | undefined;
  FabricConfiguration?: FabricConfiguration | undefined;
}
export interface UpdateRouterOutputResponse {
  RouterOutput: RouterOutput & { FabricConfiguration: FabricConfiguration };
}
export interface UpdateSourceEndpointRequest {
  Arn: string;
  Description?: string | undefined;
  Configuration?: SourceEndpointConfiguration | undefined;
}
export interface UpdateSourceEndpointResponse {
  SourceEndpoint: SourceEndpoint;
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
  AddBridgeOutputsRequest & RegionInput,
  AddBridgeOutputsResponse,
  AddBridgeOutputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<AddBridgeOutputsRequest>,
  output: __S(417, __c13, 1) as any as S.Schema<AddBridgeOutputsResponse>,
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
  telemetry: TELEMETRY,
  span: "AddBridgeOutputs",
}));

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
  AddBridgeSourcesRequest & RegionInput,
  AddBridgeSourcesResponse,
  AddBridgeSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<AddBridgeSourcesRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<AddBridgeSourcesResponse>,
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
  telemetry: TELEMETRY,
  span: "AddBridgeSources",
}));

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
  AddFlowMediaStreamsRequest & RegionInput,
  AddFlowMediaStreamsResponse,
  AddFlowMediaStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<AddFlowMediaStreamsRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<AddFlowMediaStreamsResponse>,
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
  telemetry: TELEMETRY,
  span: "AddFlowMediaStreams",
}));

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
  AddFlowOutputsRequest & RegionInput,
  AddFlowOutputsResponse,
  AddFlowOutputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<AddFlowOutputsRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<AddFlowOutputsResponse>,
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
  telemetry: TELEMETRY,
  span: "AddFlowOutputs",
}));

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
  AddFlowSourcesRequest & RegionInput,
  AddFlowSourcesResponse,
  AddFlowSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<AddFlowSourcesRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<AddFlowSourcesResponse>,
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
  telemetry: TELEMETRY,
  span: "AddFlowSources",
}));

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
  AddFlowVpcInterfacesRequest & RegionInput,
  AddFlowVpcInterfacesResponse,
  AddFlowVpcInterfacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<AddFlowVpcInterfacesRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<AddFlowVpcInterfacesResponse>,
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
  telemetry: TELEMETRY,
  span: "AddFlowVpcInterfaces",
}));

export type BatchGetDestinationEndpointError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about multiple destination endpoints in a single request.
 */
export const batchGetDestinationEndpoint: API.OperationMethod<
  BatchGetDestinationEndpointRequest & RegionInput,
  BatchGetDestinationEndpointResponse,
  BatchGetDestinationEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<BatchGetDestinationEndpointRequest>,
  output: __S(1444, __c45, 4) as any as S.Schema<BatchGetDestinationEndpointResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDestinationEndpoint",
  telemetry: TELEMETRY,
  span: "BatchGetDestinationEndpoint",
}));

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
  BatchGetRouterInputRequest & RegionInput,
  BatchGetRouterInputResponse,
  BatchGetRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<BatchGetRouterInputRequest>,
  output: __S(1636, __c51, 4) as any as S.Schema<BatchGetRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "BatchGetRouterInput",
}));

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
  BatchGetRouterNetworkInterfaceRequest & RegionInput,
  BatchGetRouterNetworkInterfaceResponse,
  BatchGetRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<BatchGetRouterNetworkInterfaceRequest>,
  output: __S(1764, __c55, 4) as any as S.Schema<BatchGetRouterNetworkInterfaceResponse>,
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
  telemetry: TELEMETRY,
  span: "BatchGetRouterNetworkInterface",
}));

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
  BatchGetRouterOutputRequest & RegionInput,
  BatchGetRouterOutputResponse,
  BatchGetRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<BatchGetRouterOutputRequest>,
  output: __S(1828, __c57, 4) as any as S.Schema<BatchGetRouterOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "BatchGetRouterOutput",
}));

export type BatchGetSourceEndpointError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about multiple source endpoints in a single request.
 */
export const batchGetSourceEndpoint: API.OperationMethod<
  BatchGetSourceEndpointRequest & RegionInput,
  BatchGetSourceEndpointResponse,
  BatchGetSourceEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<BatchGetSourceEndpointRequest>,
  output: __S(1892, __c59, 4) as any as S.Schema<BatchGetSourceEndpointResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSourceEndpoint",
  telemetry: TELEMETRY,
  span: "BatchGetSourceEndpoint",
}));

export type ConnectEndpointsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Connects a source endpoint to a destination endpoint.
 */
export const connectEndpoints: API.OperationMethod<
  ConnectEndpointsRequest & RegionInput,
  ConnectEndpointsResponse,
  ConnectEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<ConnectEndpointsRequest>,
  output: __S(1984, __c62, 0) as any as S.Schema<ConnectEndpointsResponse>,
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
  operationName: "ConnectEndpoints",
  telemetry: TELEMETRY,
  span: "ConnectEndpoints",
}));

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
  CreateBridgeRequest & RegionInput,
  CreateBridgeResponse,
  CreateBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<CreateBridgeRequest>,
  output: __S(2115, __c66, 3) as any as S.Schema<CreateBridgeResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateBridge",
}));

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
  CreateFlowRequest & RegionInput,
  CreateFlowResponse,
  CreateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2177, __c68, 1) as any as S.Schema<CreateFlowRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<CreateFlowResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateFlow",
}));

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
  CreateGatewayRequest & RegionInput,
  CreateGatewayResponse,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<CreateGatewayRequest>,
  output: __S(2435, __c76, 3) as any as S.Schema<CreateGatewayResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateGateway",
}));

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
  CreateRouterInputRequest & RegionInput,
  CreateRouterInputResponse,
  CreateRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<CreateRouterInputRequest>,
  output: __S(2496, __c78, 0) as any as S.Schema<CreateRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateRouterInput",
}));

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
  CreateRouterNetworkInterfaceRequest & RegionInput,
  CreateRouterNetworkInterfaceResponse,
  CreateRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<CreateRouterNetworkInterfaceRequest>,
  output: __S(2560, __c80, 0) as any as S.Schema<CreateRouterNetworkInterfaceResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateRouterNetworkInterface",
}));

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
  CreateRouterOutputRequest & RegionInput,
  CreateRouterOutputResponse,
  CreateRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<CreateRouterOutputRequest>,
  output: __S(2624, __c82, 0) as any as S.Schema<CreateRouterOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateRouterOutput",
}));

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
  DeleteBridgeRequest & RegionInput,
  DeleteBridgeResponse,
  DeleteBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<DeleteBridgeRequest>,
  output: __S(2657, __c83, 1) as any as S.Schema<DeleteBridgeResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteBridge",
}));

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
  DeleteFlowRequest & RegionInput,
  DeleteFlowResponse,
  DeleteFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<DeleteFlowRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<DeleteFlowResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteFlow",
}));

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
  DeleteGatewayRequest & RegionInput,
  DeleteGatewayResponse,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<DeleteGatewayRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<DeleteGatewayResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteGateway",
}));

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
  DeleteRouterInputRequest & RegionInput,
  DeleteRouterInputResponse,
  DeleteRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<DeleteRouterInputRequest>,
  output: __S(2816, __c88, 0) as any as S.Schema<DeleteRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteRouterInput",
}));

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
  DeleteRouterNetworkInterfaceRequest & RegionInput,
  DeleteRouterNetworkInterfaceResponse,
  DeleteRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<DeleteRouterNetworkInterfaceRequest>,
  output: __S(2816, __c88, 0) as any as S.Schema<DeleteRouterNetworkInterfaceResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteRouterNetworkInterface",
}));

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
  DeleteRouterOutputRequest & RegionInput,
  DeleteRouterOutputResponse,
  DeleteRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<DeleteRouterOutputRequest>,
  output: __S(2816, __c88, 0) as any as S.Schema<DeleteRouterOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteRouterOutput",
}));

export type DeregisterDestinationEndpointError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deregisters a destination endpoint from MediaConnect.
 */
export const deregisterDestinationEndpoint: API.OperationMethod<
  DeregisterDestinationEndpointRequest & RegionInput,
  DeregisterDestinationEndpointResponse,
  DeregisterDestinationEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<DeregisterDestinationEndpointRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<DeregisterDestinationEndpointResponse>,
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
  operationName: "DeregisterDestinationEndpoint",
  telemetry: TELEMETRY,
  span: "DeregisterDestinationEndpoint",
}));

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
  DeregisterGatewayInstanceRequest & RegionInput,
  DeregisterGatewayInstanceResponse,
  DeregisterGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<DeregisterGatewayInstanceRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<DeregisterGatewayInstanceResponse>,
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
  telemetry: TELEMETRY,
  span: "DeregisterGatewayInstance",
}));

export type DeregisterSourceEndpointError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deregisters a source endpoint from MediaConnect.
 */
export const deregisterSourceEndpoint: API.OperationMethod<
  DeregisterSourceEndpointRequest & RegionInput,
  DeregisterSourceEndpointResponse,
  DeregisterSourceEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<DeregisterSourceEndpointRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<DeregisterSourceEndpointResponse>,
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
  operationName: "DeregisterSourceEndpoint",
  telemetry: TELEMETRY,
  span: "DeregisterSourceEndpoint",
}));

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
  DescribeBridgeRequest & RegionInput,
  DescribeBridgeResponse,
  DescribeBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<DescribeBridgeRequest>,
  output: __S(2115, __c66, 3) as any as S.Schema<DescribeBridgeResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeBridge",
}));

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
  DescribeFlowRequest & RegionInput,
  DescribeFlowResponse,
  DescribeFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<DescribeFlowRequest>,
  output: __S(3074, __c96, 2) as any as S.Schema<DescribeFlowResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeFlow",
}));

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
  DescribeFlowSourceMetadataRequest & RegionInput,
  DescribeFlowSourceMetadataResponse,
  DescribeFlowSourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<DescribeFlowSourceMetadataRequest>,
  output: __S(3111, __c97, 7) as any as S.Schema<DescribeFlowSourceMetadataResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeFlowSourceMetadata",
}));

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
  DescribeFlowSourceThumbnailRequest & RegionInput,
  DescribeFlowSourceThumbnailResponse,
  DescribeFlowSourceThumbnailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<DescribeFlowSourceThumbnailRequest>,
  output: __S(3170, __c99, 2) as any as S.Schema<DescribeFlowSourceThumbnailResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeFlowSourceThumbnail",
}));

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
  DescribeGatewayRequest & RegionInput,
  DescribeGatewayResponse,
  DescribeGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<DescribeGatewayRequest>,
  output: __S(2435, __c76, 3) as any as S.Schema<DescribeGatewayResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeGateway",
}));

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
  DescribeGatewayInstanceRequest & RegionInput,
  DescribeGatewayInstanceResponse,
  DescribeGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<DescribeGatewayInstanceRequest>,
  output: __S(3234, __c101, 2) as any as S.Schema<DescribeGatewayInstanceResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeGatewayInstance",
}));

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
  DescribeOfferingRequest & RegionInput,
  DescribeOfferingResponse,
  DescribeOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<DescribeOfferingRequest>,
  output: __S(3265, __c102, 1) as any as S.Schema<DescribeOfferingResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeOffering",
}));

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
  DescribeReservationRequest & RegionInput,
  DescribeReservationResponse,
  DescribeReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<DescribeReservationRequest>,
  output: __S(3424, __c107, 0) as any as S.Schema<DescribeReservationResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeReservation",
}));

export type DisconnectEndpointsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disconnects a source endpoint from a destination endpoint.
 */
export const disconnectEndpoints: API.OperationMethod<
  DisconnectEndpointsRequest & RegionInput,
  DisconnectEndpointsResponse,
  DisconnectEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<DisconnectEndpointsRequest>,
  output: __S(1984, __c62, 0) as any as S.Schema<DisconnectEndpointsResponse>,
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
  operationName: "DisconnectEndpoints",
  telemetry: TELEMETRY,
  span: "DisconnectEndpoints",
}));

export type GetDestinationEndpointError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a destination endpoint.
 */
export const getDestinationEndpoint: API.OperationMethod<
  GetDestinationEndpointRequest & RegionInput,
  GetDestinationEndpointResponse,
  GetDestinationEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<GetDestinationEndpointRequest>,
  output: __S(3520, __c110, 0) as any as S.Schema<GetDestinationEndpointResponse>,
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
  operationName: "GetDestinationEndpoint",
  telemetry: TELEMETRY,
  span: "GetDestinationEndpoint",
}));

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
  GetRouterInputRequest & RegionInput,
  GetRouterInputResponse,
  GetRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<GetRouterInputRequest>,
  output: __S(2496, __c78, 0) as any as S.Schema<GetRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRouterInput",
}));

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
  GetRouterInputSourceMetadataRequest & RegionInput,
  GetRouterInputSourceMetadataResponse,
  GetRouterInputSourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<GetRouterInputSourceMetadataRequest>,
  output: __S(3587, __c112, 3) as any as S.Schema<GetRouterInputSourceMetadataResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRouterInputSourceMetadata",
}));

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
  GetRouterInputThumbnailRequest & RegionInput,
  GetRouterInputThumbnailResponse,
  GetRouterInputThumbnailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<GetRouterInputThumbnailRequest>,
  output: __S(3618, __c113, 2) as any as S.Schema<GetRouterInputThumbnailResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRouterInputThumbnail",
}));

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
  GetRouterNetworkInterfaceRequest & RegionInput,
  GetRouterNetworkInterfaceResponse,
  GetRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<GetRouterNetworkInterfaceRequest>,
  output: __S(2560, __c80, 0) as any as S.Schema<GetRouterNetworkInterfaceResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRouterNetworkInterface",
}));

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
  GetRouterOutputRequest & RegionInput,
  GetRouterOutputResponse,
  GetRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<GetRouterOutputRequest>,
  output: __S(2624, __c82, 0) as any as S.Schema<GetRouterOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRouterOutput",
}));

export type GetSourceEndpointError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a source endpoint.
 */
export const getSourceEndpoint: API.OperationMethod<
  GetSourceEndpointRequest & RegionInput,
  GetSourceEndpointResponse,
  GetSourceEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3712, __c116, 0) as any as S.Schema<GetSourceEndpointRequest>,
  output: __S(3744, __c117, 0) as any as S.Schema<GetSourceEndpointResponse>,
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
  operationName: "GetSourceEndpoint",
  telemetry: TELEMETRY,
  span: "GetSourceEndpoint",
}));

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
  GrantFlowEntitlementsRequest & RegionInput,
  GrantFlowEntitlementsResponse,
  GrantFlowEntitlementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<GrantFlowEntitlementsRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<GrantFlowEntitlementsResponse>,
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
  telemetry: TELEMETRY,
  span: "GrantFlowEntitlements",
}));

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
  ListBridgesRequest & RegionInput,
  ListBridgesResponse,
  ListBridgesError,
  Credentials | HttpClient.HttpClient,
  ListedBridge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<ListBridgesRequest>,
  output: __S(3811, __c119, 3) as any as S.Schema<ListBridgesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListBridges",
})) as any;

export type ListDestinationEndpointsError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of the destination endpoints in your account. The results are paginated. Use the NextToken value that's returned to retrieve additional results.
 */
export const listDestinationEndpoints: API.PaginatedOperationMethod<
  ListDestinationEndpointsRequest & RegionInput,
  ListDestinationEndpointsResponse,
  ListDestinationEndpointsError,
  Credentials | HttpClient.HttpClient,
  ListedDestinationEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3842, __c120, 2) as any as S.Schema<ListDestinationEndpointsRequest>,
  output: __S(3845, __c120, 5) as any as S.Schema<ListDestinationEndpointsResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDestinationEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DestinationEndpoints",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDestinationEndpoints",
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
  ListEntitlementsRequest & RegionInput,
  ListEntitlementsResponse,
  ListEntitlementsError,
  Credentials | HttpClient.HttpClient,
  ListedEntitlement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<ListEntitlementsRequest>,
  output: __S(3907, __c122, 3) as any as S.Schema<ListEntitlementsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListEntitlements",
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
  ListFlowsRequest & RegionInput,
  ListFlowsResponse,
  ListFlowsError,
  Credentials | HttpClient.HttpClient,
  ListedFlow
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<ListFlowsRequest>,
  output: __S(3939, __c123, 3) as any as S.Schema<ListFlowsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListFlows",
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
  ListGatewayInstancesRequest & RegionInput,
  ListGatewayInstancesResponse,
  ListGatewayInstancesError,
  Credentials | HttpClient.HttpClient,
  ListedGatewayInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<ListGatewayInstancesRequest>,
  output: __S(3971, __c124, 3) as any as S.Schema<ListGatewayInstancesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListGatewayInstances",
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
  ListGatewaysRequest & RegionInput,
  ListGatewaysResponse,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  ListedGateway
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4000, __c125, 0) as any as S.Schema<ListGatewaysRequest>,
  output: __S(4003, __c125, 3) as any as S.Schema<ListGatewaysResponse>,
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
  telemetry: TELEMETRY,
  span: "ListGateways",
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
  ListOfferingsRequest & RegionInput,
  ListOfferingsResponse,
  ListOfferingsError,
  Credentials | HttpClient.HttpClient,
  Offering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4032, __c126, 0) as any as S.Schema<ListOfferingsRequest>,
  output: __S(4034, __c126, 2) as any as S.Schema<ListOfferingsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListOfferings",
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
  ListReservationsRequest & RegionInput,
  ListReservationsResponse,
  ListReservationsError,
  Credentials | HttpClient.HttpClient,
  Reservation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<ListReservationsRequest>,
  output: __S(4066, __c127, 2) as any as S.Schema<ListReservationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListReservations",
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
  ListRouterInputsRequest & RegionInput,
  ListRouterInputsResponse,
  ListRouterInputsError,
  Credentials | HttpClient.HttpClient,
  ListedRouterInput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4098, __c128, 2) as any as S.Schema<ListRouterInputsRequest>,
  output: __S(4101, __c128, 5) as any as S.Schema<ListRouterInputsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListRouterInputs",
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
  ListRouterNetworkInterfacesRequest & RegionInput,
  ListRouterNetworkInterfacesResponse,
  ListRouterNetworkInterfacesError,
  Credentials | HttpClient.HttpClient,
  ListedRouterNetworkInterface
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4130, __c129, 2) as any as S.Schema<ListRouterNetworkInterfacesRequest>,
  output: __S(4133, __c129, 5) as any as S.Schema<ListRouterNetworkInterfacesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListRouterNetworkInterfaces",
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
  ListRouterOutputsRequest & RegionInput,
  ListRouterOutputsResponse,
  ListRouterOutputsError,
  Credentials | HttpClient.HttpClient,
  ListedRouterOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4162, __c130, 2) as any as S.Schema<ListRouterOutputsRequest>,
  output: __S(4165, __c130, 5) as any as S.Schema<ListRouterOutputsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListRouterOutputs",
})) as any;

export type ListSourceEndpointsError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of the source endpoints in your account. The results are paginated. Use the NextToken value that's returned to retrieve additional results.
 */
export const listSourceEndpoints: API.PaginatedOperationMethod<
  ListSourceEndpointsRequest & RegionInput,
  ListSourceEndpointsResponse,
  ListSourceEndpointsError,
  Credentials | HttpClient.HttpClient,
  ListedSourceEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4194, __c131, 2) as any as S.Schema<ListSourceEndpointsRequest>,
  output: __S(4197, __c131, 5) as any as S.Schema<ListSourceEndpointsResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SourceEndpoints",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSourceEndpoints",
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
  ListTagsForGlobalResourceRequest & RegionInput,
  ListTagsForGlobalResourceResponse,
  ListTagsForGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4224, __c132, 0) as any as S.Schema<ListTagsForGlobalResourceRequest>,
  output: __S(4256, __c133, 0) as any as S.Schema<ListTagsForGlobalResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForGlobalResource",
  telemetry: TELEMETRY,
  span: "ListTagsForGlobalResource",
}));

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * List all tags on a MediaConnect resource in the current region.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(4256, __c133, 0) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  PurchaseOfferingRequest & RegionInput,
  PurchaseOfferingResponse,
  PurchaseOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<PurchaseOfferingRequest>,
  output: __S(3424, __c107, 0) as any as S.Schema<PurchaseOfferingResponse>,
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
  telemetry: TELEMETRY,
  span: "PurchaseOffering",
}));

export type RegisterDestinationEndpointError =
  | BadRequestException
  | ConflictException
  | DestinationEndpointServiceQuotaExceededException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Registers a new destination endpoint in MediaConnect.
 */
export const registerDestinationEndpoint: API.OperationMethod<
  RegisterDestinationEndpointRequest & RegionInput,
  RegisterDestinationEndpointResponse,
  RegisterDestinationEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<RegisterDestinationEndpointRequest>,
  output: __S(3520, __c110, 0) as any as S.Schema<RegisterDestinationEndpointResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    DestinationEndpointServiceQuotaExceededException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDestinationEndpoint",
  telemetry: TELEMETRY,
  span: "RegisterDestinationEndpoint",
}));

export type RegisterSourceEndpointError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | SourceEndpointServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Registers a new source endpoint in MediaConnect.
 */
export const registerSourceEndpoint: API.OperationMethod<
  RegisterSourceEndpointRequest & RegionInput,
  RegisterSourceEndpointResponse,
  RegisterSourceEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<RegisterSourceEndpointRequest>,
  output: __S(3744, __c117, 0) as any as S.Schema<RegisterSourceEndpointResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    SourceEndpointServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterSourceEndpoint",
  telemetry: TELEMETRY,
  span: "RegisterSourceEndpoint",
}));

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
  RemoveBridgeOutputRequest & RegionInput,
  RemoveBridgeOutputResponse,
  RemoveBridgeOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4416, __c138, 0) as any as S.Schema<RemoveBridgeOutputRequest>,
  output: __S(4417, __c138, 1) as any as S.Schema<RemoveBridgeOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "RemoveBridgeOutput",
}));

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
  RemoveBridgeSourceRequest & RegionInput,
  RemoveBridgeSourceResponse,
  RemoveBridgeSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<RemoveBridgeSourceRequest>,
  output: __S(4449, __c139, 1) as any as S.Schema<RemoveBridgeSourceResponse>,
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
  telemetry: TELEMETRY,
  span: "RemoveBridgeSource",
}));

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
  RemoveFlowMediaStreamRequest & RegionInput,
  RemoveFlowMediaStreamResponse,
  RemoveFlowMediaStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4480, __c140, 0) as any as S.Schema<RemoveFlowMediaStreamRequest>,
  output: __S(4481, __c140, 1) as any as S.Schema<RemoveFlowMediaStreamResponse>,
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
  telemetry: TELEMETRY,
  span: "RemoveFlowMediaStream",
}));

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
  RemoveFlowOutputRequest & RegionInput,
  RemoveFlowOutputResponse,
  RemoveFlowOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4512, __c141, 0) as any as S.Schema<RemoveFlowOutputRequest>,
  output: __S(4513, __c141, 1) as any as S.Schema<RemoveFlowOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "RemoveFlowOutput",
}));

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
  RemoveFlowSourceRequest & RegionInput,
  RemoveFlowSourceResponse,
  RemoveFlowSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4544, __c142, 0) as any as S.Schema<RemoveFlowSourceRequest>,
  output: __S(4545, __c142, 1) as any as S.Schema<RemoveFlowSourceResponse>,
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
  telemetry: TELEMETRY,
  span: "RemoveFlowSource",
}));

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
  RemoveFlowVpcInterfaceRequest & RegionInput,
  RemoveFlowVpcInterfaceResponse,
  RemoveFlowVpcInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4576, __c143, 0) as any as S.Schema<RemoveFlowVpcInterfaceRequest>,
  output: __S(4577, __c143, 1) as any as S.Schema<RemoveFlowVpcInterfaceResponse>,
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
  telemetry: TELEMETRY,
  span: "RemoveFlowVpcInterface",
}));

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
  RestartRouterInputRequest & RegionInput,
  RestartRouterInputResponse,
  RestartRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<RestartRouterInputRequest>,
  output: __S(2816, __c88, 0) as any as S.Schema<RestartRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "RestartRouterInput",
}));

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
  RestartRouterOutputRequest & RegionInput,
  RestartRouterOutputResponse,
  RestartRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<RestartRouterOutputRequest>,
  output: __S(2816, __c88, 0) as any as S.Schema<RestartRouterOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "RestartRouterOutput",
}));

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
  RevokeFlowEntitlementRequest & RegionInput,
  RevokeFlowEntitlementResponse,
  RevokeFlowEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4672, __c146, 0) as any as S.Schema<RevokeFlowEntitlementRequest>,
  output: __S(4673, __c146, 1) as any as S.Schema<RevokeFlowEntitlementResponse>,
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
  telemetry: TELEMETRY,
  span: "RevokeFlowEntitlement",
}));

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
  StartFlowRequest & RegionInput,
  StartFlowResponse,
  StartFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4704, __c147, 0) as any as S.Schema<StartFlowRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<StartFlowResponse>,
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
  telemetry: TELEMETRY,
  span: "StartFlow",
}));

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
  StartRouterInputRequest & RegionInput,
  StartRouterInputResponse,
  StartRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4736, __c148, 0) as any as S.Schema<StartRouterInputRequest>,
  output: __S(4768, __c149, 0) as any as S.Schema<StartRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "StartRouterInput",
}));

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
  StartRouterOutputRequest & RegionInput,
  StartRouterOutputResponse,
  StartRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4800, __c150, 0) as any as S.Schema<StartRouterOutputRequest>,
  output: __S(4768, __c149, 0) as any as S.Schema<StartRouterOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "StartRouterOutput",
}));

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
  StopFlowRequest & RegionInput,
  StopFlowResponse,
  StopFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4832, __c151, 0) as any as S.Schema<StopFlowRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<StopFlowResponse>,
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
  telemetry: TELEMETRY,
  span: "StopFlow",
}));

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
  StopRouterInputRequest & RegionInput,
  StopRouterInputResponse,
  StopRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4864, __c152, 0) as any as S.Schema<StopRouterInputRequest>,
  output: __S(2816, __c88, 0) as any as S.Schema<StopRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "StopRouterInput",
}));

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
  StopRouterOutputRequest & RegionInput,
  StopRouterOutputResponse,
  StopRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4896, __c153, 0) as any as S.Schema<StopRouterOutputRequest>,
  output: __S(2816, __c88, 0) as any as S.Schema<StopRouterOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "StopRouterOutput",
}));

export type TagGlobalResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Adds tags to a global resource in AWS Elemental MediaConnect. The API supports the following global resources: router inputs, router outputs and router network interfaces.
 */
export const tagGlobalResource: API.OperationMethod<
  TagGlobalResourceRequest & RegionInput,
  TagGlobalResourceResponse,
  TagGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4928, __c154, 0) as any as S.Schema<TagGlobalResourceRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<TagGlobalResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagGlobalResource",
  telemetry: TELEMETRY,
  span: "TagGlobalResource",
}));

export type TagResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn` in the current region. If existing tags on a resource are not specified in the request parameters, they are not changed. When a resource is deleted, the tags associated with that resource are deleted as well.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4960, __c155, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<TagResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

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
  TakeRouterInputRequest & RegionInput,
  TakeRouterInputResponse,
  TakeRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4992, __c156, 0) as any as S.Schema<TakeRouterInputRequest>,
  output: __S(4993, __c156, 1) as any as S.Schema<TakeRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "TakeRouterInput",
}));

export type UntagGlobalResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags from a global resource in AWS Elemental MediaConnect. The API supports the following global resources: router inputs, router outputs and router network interfaces.
 */
export const untagGlobalResource: API.OperationMethod<
  UntagGlobalResourceRequest & RegionInput,
  UntagGlobalResourceResponse,
  UntagGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5024, __c157, 0) as any as S.Schema<UntagGlobalResourceRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<UntagGlobalResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagGlobalResource",
  telemetry: TELEMETRY,
  span: "UntagGlobalResource",
}));

export type UntagResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes specified tags from a resource in the current region.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5056, __c158, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

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
  UpdateBridgeRequest & RegionInput,
  UpdateBridgeResponse,
  UpdateBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5088, __c159, 0) as any as S.Schema<UpdateBridgeRequest>,
  output: __S(2115, __c66, 3) as any as S.Schema<UpdateBridgeResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateBridge",
}));

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
  UpdateBridgeOutputRequest & RegionInput,
  UpdateBridgeOutputResponse,
  UpdateBridgeOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5121, __c160, 1) as any as S.Schema<UpdateBridgeOutputRequest>,
  output: __S(5122, __c160, 2) as any as S.Schema<UpdateBridgeOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateBridgeOutput",
}));

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
  UpdateBridgeSourceRequest & RegionInput,
  UpdateBridgeSourceResponse,
  UpdateBridgeSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<UpdateBridgeSourceRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<UpdateBridgeSourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateBridgeSource",
}));

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
  UpdateBridgeStateRequest & RegionInput,
  UpdateBridgeStateResponse,
  UpdateBridgeStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<UpdateBridgeStateRequest>,
  output: __S(33, __c1, 1) as any as S.Schema<UpdateBridgeStateResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateBridgeState",
}));

export type UpdateDestinationEndpointError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of a destination endpoint.
 */
export const updateDestinationEndpoint: API.OperationMethod<
  UpdateDestinationEndpointRequest & RegionInput,
  UpdateDestinationEndpointResponse,
  UpdateDestinationEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<UpdateDestinationEndpointRequest>,
  output: __S(3520, __c110, 0) as any as S.Schema<UpdateDestinationEndpointResponse>,
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
  operationName: "UpdateDestinationEndpoint",
  telemetry: TELEMETRY,
  span: "UpdateDestinationEndpoint",
}));

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
  UpdateFlowRequest & RegionInput,
  UpdateFlowResponse,
  UpdateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(97, __c3, 1) as any as S.Schema<UpdateFlowRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<UpdateFlowResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateFlow",
}));

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
  UpdateFlowEntitlementRequest & RegionInput,
  UpdateFlowEntitlementResponse,
  UpdateFlowEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<UpdateFlowEntitlementRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<UpdateFlowEntitlementResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateFlowEntitlement",
}));

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
  UpdateFlowMediaStreamRequest & RegionInput,
  UpdateFlowMediaStreamResponse,
  UpdateFlowMediaStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<UpdateFlowMediaStreamRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<UpdateFlowMediaStreamResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateFlowMediaStream",
}));

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
  UpdateFlowOutputRequest & RegionInput,
  UpdateFlowOutputResponse,
  UpdateFlowOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<UpdateFlowOutputRequest>,
  output: __S(193, __c6, 1) as any as S.Schema<UpdateFlowOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateFlowOutput",
}));

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
  UpdateFlowSourceRequest & RegionInput,
  UpdateFlowSourceResponse,
  UpdateFlowSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<UpdateFlowSourceRequest>,
  output: __S(225, __c7, 1) as any as S.Schema<UpdateFlowSourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateFlowSource",
}));

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
  UpdateGatewayInstanceRequest & RegionInput,
  UpdateGatewayInstanceResponse,
  UpdateGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<UpdateGatewayInstanceRequest>,
  output: __S(257, __c8, 1) as any as S.Schema<UpdateGatewayInstanceResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateGatewayInstance",
}));

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
  UpdateRouterInputRequest & RegionInput,
  UpdateRouterInputResponse,
  UpdateRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<UpdateRouterInputRequest>,
  output: __S(2496, __c78, 0) as any as S.Schema<UpdateRouterInputResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateRouterInput",
}));

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
  UpdateRouterNetworkInterfaceRequest & RegionInput,
  UpdateRouterNetworkInterfaceResponse,
  UpdateRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<UpdateRouterNetworkInterfaceRequest>,
  output: __S(2560, __c80, 0) as any as S.Schema<UpdateRouterNetworkInterfaceResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateRouterNetworkInterface",
}));

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
  UpdateRouterOutputRequest & RegionInput,
  UpdateRouterOutputResponse,
  UpdateRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<UpdateRouterOutputRequest>,
  output: __S(2624, __c82, 0) as any as S.Schema<UpdateRouterOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateRouterOutput",
}));

export type UpdateSourceEndpointError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of a source endpoint.
 */
export const updateSourceEndpoint: API.OperationMethod<
  UpdateSourceEndpointRequest & RegionInput,
  UpdateSourceEndpointResponse,
  UpdateSourceEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<UpdateSourceEndpointRequest>,
  output: __S(3744, __c117, 0) as any as S.Schema<UpdateSourceEndpointResponse>,
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
  operationName: "UpdateSourceEndpoint",
  telemetry: TELEMETRY,
  span: "UpdateSourceEndpoint",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          FlowVpcInterfaceAttachment: S.optional(__S(576, __c18, 0)),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            FlowVpcInterfaceAttachment: "flowVpcInterfaceAttachment",
          }),
        ),
      ).annotate({ identifier: "UpdateBridgeFlowSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MulticastIp: S.optional(S.String),
          MulticastSourceSettings: S.optional(__S(672, __c21, 0)),
          NetworkName: S.optional(S.String),
          Port: S.optional(S.Number),
          Protocol: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MulticastIp: "multicastIp",
            MulticastSourceSettings: "multicastSourceSettings",
            NetworkName: "networkName",
            Port: "port",
            Protocol: "protocol",
          }),
        ),
      ).annotate({ identifier: "UpdateBridgeNetworkSourceRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
          FlowSource: S.optional(__S(0, __c0, 0)),
          NetworkSource: S.optional(__S(1, __c0, 1)),
          SourceName: S.String.pipe(T.HttpLabel("SourceName")),
        })
          .pipe(S.encodeKeys({ FlowSource: "flowSource", NetworkSource: "networkSource" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/bridges/{BridgeArn}/sources/{SourceName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBridgeSourceRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ BridgeArn: S.optional(S.String), Source: S.optional(__S(675, __c21, 3)) }).pipe(
          S.encodeKeys({ BridgeArn: "bridgeArn", Source: "source" }),
        ),
      ).annotate({ identifier: "UpdateBridgeSourceResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
          DesiredState: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ DesiredState: "desiredState" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/bridges/{BridgeArn}/state" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBridgeStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BridgeArn: S.optional(S.String), DesiredState: S.optional(S.String) }).pipe(
          S.encodeKeys({ BridgeArn: "bridgeArn", DesiredState: "desiredState" }),
        ),
      ).annotate({ identifier: "UpdateBridgeStateResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Description: S.optional(S.String),
          Configuration: S.optional(__S(1609, __c50, 9)),
        })
          .pipe(S.encodeKeys({ Description: "description", Configuration: "configuration" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/destinationEndpoint/{Arn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateDestinationEndpointRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaintenanceDay: S.optional(S.String),
          MaintenanceScheduledDate: S.optional(S.String),
          MaintenanceStartHour: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MaintenanceDay: "maintenanceDay",
            MaintenanceScheduledDate: "maintenanceScheduledDate",
            MaintenanceStartHour: "maintenanceStartHour",
          }),
        ),
      ).annotate({ identifier: "UpdateMaintenance" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          SourceFailoverConfig: S.optional(__S(2049, __c64, 1)),
          Maintenance: S.optional(__S(96, __c3, 0)),
          SourceMonitoringConfig: S.optional(__S(2245, __c70, 5)),
          NdiConfig: S.optional(__S(2248, __c70, 8)),
          FlowSize: S.optional(S.String),
          EncodingConfig: S.optional(__S(2249, __c70, 9)),
        })
          .pipe(
            S.encodeKeys({
              SourceFailoverConfig: "sourceFailoverConfig",
              Maintenance: "maintenance",
              SourceMonitoringConfig: "sourceMonitoringConfig",
              NdiConfig: "ndiConfig",
              FlowSize: "flowSize",
              EncodingConfig: "encodingConfig",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/flows/{FlowArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateFlowRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Encryption: S.optional(__S(1024, __c32, 0)),
          EntitlementArn: S.String.pipe(T.HttpLabel("EntitlementArn")),
          EntitlementStatus: S.optional(S.String),
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          Subscribers: S.optional(__listOfString),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              Encryption: "encryption",
              EntitlementStatus: "entitlementStatus",
              Subscribers: "subscribers",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/flows/{FlowArn}/entitlements/{EntitlementArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateFlowEntitlementRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Entitlement: S.optional(__S(2304, __c72, 0)),
          FlowArn: S.optional(S.String),
        }).pipe(S.encodeKeys({ Entitlement: "entitlement", FlowArn: "flowArn" })),
      ).annotate({ identifier: "UpdateFlowEntitlementResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(833, __c26, 1)),
          ClockRate: S.optional(S.Number),
          Description: S.optional(S.String),
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          MediaStreamName: S.String.pipe(T.HttpLabel("MediaStreamName")),
          MediaStreamType: S.optional(S.String),
          VideoFormat: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Attributes: "attributes",
              ClockRate: "clockRate",
              Description: "description",
              MediaStreamType: "mediaStreamType",
              VideoFormat: "videoFormat",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/flows/{FlowArn}/mediaStreams/{MediaStreamName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateFlowMediaStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          MediaStream: S.optional(__S(834, __c26, 2)),
        }).pipe(S.encodeKeys({ FlowArn: "flowArn", MediaStream: "mediaStream" })),
      ).annotate({ identifier: "UpdateFlowMediaStreamResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CidrAllowList: S.optional(__listOfString),
          Description: S.optional(S.String),
          Destination: S.optional(S.String),
          Encryption: S.optional(__S(1024, __c32, 0)),
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          MaxLatency: S.optional(S.Number),
          MediaStreamOutputConfigurations: S.optional(
            __listOfMediaStreamOutputConfigurationRequest,
          ),
          MinLatency: S.optional(S.Number),
          OutputArn: S.String.pipe(T.HttpLabel("OutputArn")),
          Port: S.optional(S.Number),
          Protocol: S.optional(S.String),
          RemoteId: S.optional(S.String),
          SenderControlPort: S.optional(S.Number),
          SenderIpAddress: S.optional(S.String),
          SmoothingLatency: S.optional(S.Number),
          StreamId: S.optional(S.String),
          VpcInterfaceAttachment: S.optional(__S(576, __c18, 0)),
          OutputStatus: S.optional(S.String),
          NdiProgramName: S.optional(S.String),
          NdiSpeedHqQuality: S.optional(S.Number),
          RouterIntegrationState: S.optional(S.String),
          RouterIntegrationTransitEncryption: S.optional(__S(962, __c30, 2)),
          NdiOutputTimecodeSource: S.optional(S.String),
          NdiAudioReferenceLevel: S.optional(S.Number),
        })
          .pipe(
            S.encodeKeys({
              CidrAllowList: "cidrAllowList",
              Description: "description",
              Destination: "destination",
              Encryption: "encryption",
              MaxLatency: "maxLatency",
              MediaStreamOutputConfigurations: "mediaStreamOutputConfigurations",
              MinLatency: "minLatency",
              Port: "port",
              Protocol: "protocol",
              RemoteId: "remoteId",
              SenderControlPort: "senderControlPort",
              SenderIpAddress: "senderIpAddress",
              SmoothingLatency: "smoothingLatency",
              StreamId: "streamId",
              VpcInterfaceAttachment: "vpcInterfaceAttachment",
              OutputStatus: "outputStatus",
              NdiProgramName: "ndiProgramName",
              NdiSpeedHqQuality: "ndiSpeedHqQuality",
              RouterIntegrationState: "routerIntegrationState",
              RouterIntegrationTransitEncryption: "routerIntegrationTransitEncryption",
              NdiOutputTimecodeSource: "ndiOutputTimecodeSource",
              NdiAudioReferenceLevel: "ndiAudioReferenceLevel",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/flows/{FlowArn}/outputs/{OutputArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateFlowOutputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String), Output: S.optional(__S(1158, __c36, 6)) }).pipe(
          S.encodeKeys({ FlowArn: "flowArn", Output: "output" }),
        ),
      ).annotate({ identifier: "UpdateFlowOutputResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Decryption: S.optional(__S(1024, __c32, 0)),
          Description: S.optional(S.String),
          EntitlementArn: S.optional(S.String),
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          IngestPort: S.optional(S.Number),
          MaxBitrate: S.optional(S.Number),
          MaxLatency: S.optional(S.Number),
          MaxSyncBuffer: S.optional(S.Number),
          MediaStreamSourceConfigurations: S.optional(
            __listOfMediaStreamSourceConfigurationRequest,
          ),
          MinLatency: S.optional(S.Number),
          Protocol: S.optional(S.String),
          SenderControlPort: S.optional(S.Number),
          SenderIpAddress: S.optional(S.String),
          SourceArn: S.String.pipe(T.HttpLabel("SourceArn")),
          SourceListenerAddress: S.optional(S.String),
          SourceListenerPort: S.optional(S.Number),
          StreamId: S.optional(S.String),
          VpcInterfaceName: S.optional(S.String),
          WhitelistCidr: S.optional(S.String),
          GatewayBridgeSource: S.optional(__S(1312, __c41, 0)),
          NdiSourceSettings: S.optional(__S(993, __c31, 1)),
          RouterIntegrationState: S.optional(S.String),
          RouterIntegrationTransitDecryption: S.optional(__S(962, __c30, 2)),
        })
          .pipe(
            S.encodeKeys({
              Decryption: "decryption",
              Description: "description",
              EntitlementArn: "entitlementArn",
              IngestPort: "ingestPort",
              MaxBitrate: "maxBitrate",
              MaxLatency: "maxLatency",
              MaxSyncBuffer: "maxSyncBuffer",
              MediaStreamSourceConfigurations: "mediaStreamSourceConfigurations",
              MinLatency: "minLatency",
              Protocol: "protocol",
              SenderControlPort: "senderControlPort",
              SenderIpAddress: "senderIpAddress",
              SourceListenerAddress: "sourceListenerAddress",
              SourceListenerPort: "sourceListenerPort",
              StreamId: "streamId",
              VpcInterfaceName: "vpcInterfaceName",
              WhitelistCidr: "whitelistCidr",
              GatewayBridgeSource: "gatewayBridgeSource",
              NdiSourceSettings: "ndiSourceSettings",
              RouterIntegrationState: "routerIntegrationState",
              RouterIntegrationTransitDecryption: "routerIntegrationTransitDecryption",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/flows/{FlowArn}/source/{SourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateFlowSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String), Source: S.optional(__S(1317, __c41, 5)) }).pipe(
          S.encodeKeys({ FlowArn: "flowArn", Source: "source" }),
        ),
      ).annotate({ identifier: "UpdateFlowSourceResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BridgePlacement: S.optional(S.String),
          GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")),
        })
          .pipe(S.encodeKeys({ BridgePlacement: "bridgePlacement" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/gateway-instances/{GatewayInstanceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateGatewayInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BridgePlacement: S.optional(S.String),
          GatewayInstanceArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BridgePlacement: "bridgePlacement",
            GatewayInstanceArn: "gatewayInstanceArn",
          }),
        ),
      ).annotate({ identifier: "UpdateGatewayInstanceResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Name: S.optional(S.String),
          Configuration: S.optional(__S(1742, __c54, 14)),
          MaximumBitrate: S.optional(S.Number),
          RoutingScope: S.optional(S.String),
          Tier: S.optional(S.String),
          TransitEncryption: S.optional(__S(962, __c30, 2)),
          MaintenanceConfiguration: S.optional(__S(1666, __c52, 2)),
          ContentQualityAnalysisConfiguration: S.optional(__S(1749, __c54, 21)),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Configuration: "configuration",
              MaximumBitrate: "maximumBitrate",
              RoutingScope: "routingScope",
              Tier: "tier",
              TransitEncryption: "transitEncryption",
              MaintenanceConfiguration: "maintenanceConfiguration",
              ContentQualityAnalysisConfiguration: "contentQualityAnalysisConfiguration",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/routerInput/{Arn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateRouterInputRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Name: S.optional(S.String),
          Configuration: S.optional(__S(1793, __c56, 1)),
        })
          .pipe(S.encodeKeys({ Name: "name", Configuration: "configuration" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/routerNetworkInterface/{Arn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateRouterNetworkInterfaceRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Name: S.optional(S.String),
          Configuration: S.optional(__S(1868, __c58, 12)),
          MaximumBitrate: S.optional(S.Number),
          RoutingScope: S.optional(S.String),
          Tier: S.optional(S.String),
          MaintenanceConfiguration: S.optional(__S(1666, __c52, 2)),
          FabricConfiguration: S.optional(__S(1871, __c58, 15)),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Configuration: "configuration",
              MaximumBitrate: "maximumBitrate",
              RoutingScope: "routingScope",
              Tier: "tier",
              MaintenanceConfiguration: "maintenanceConfiguration",
              FabricConfiguration: "fabricConfiguration",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/routerOutput/{Arn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateRouterOutputRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Description: S.optional(S.String),
          Configuration: S.optional(__S(1929, __c60, 9)),
        })
          .pipe(S.encodeKeys({ Description: "description", Configuration: "configuration" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/sourceEndpoint/{Arn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateSourceEndpointRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
          Outputs: S.optional(__listOfAddBridgeOutputRequest),
        })
          .pipe(S.encodeKeys({ Outputs: "outputs" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/bridges/{BridgeArn}/outputs" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AddBridgeOutputsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.optional(S.String),
          Outputs: S.optional(__listOfBridgeOutput),
        }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Outputs: "outputs" })),
      ).annotate({ identifier: "AddBridgeOutputsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NetworkOutput: S.optional(__S(512, __c16, 0)) }).pipe(
          S.encodeKeys({ NetworkOutput: "networkOutput" }),
        ),
      ).annotate({ identifier: "AddBridgeOutputRequest" });
    case 1:
      return S.Array(__S(448, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(514, __c16, 2));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IpAddress: S.optional(S.String),
          Name: S.optional(S.String),
          NetworkName: S.optional(S.String),
          Port: S.optional(S.Number),
          Protocol: S.optional(S.String),
          Ttl: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            IpAddress: "ipAddress",
            Name: "name",
            NetworkName: "networkName",
            Port: "port",
            Protocol: "protocol",
            Ttl: "ttl",
          }),
        ),
      ).annotate({ identifier: "AddBridgeNetworkOutputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          FlowSourceArn: S.optional(S.String),
          Name: S.optional(S.String),
        }).pipe(S.encodeKeys({ FlowArn: "flowArn", FlowSourceArn: "flowSourceArn", Name: "name" })),
      ).annotate({ identifier: "BridgeFlowOutput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FlowOutput: S.optional(__S(513, __c16, 1)),
          NetworkOutput: S.optional(__S(512, __c16, 0)),
        }).pipe(S.encodeKeys({ FlowOutput: "flowOutput", NetworkOutput: "networkOutput" })),
      ).annotate({ identifier: "BridgeOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
          Sources: S.optional(__listOfAddBridgeSourceRequest),
        })
          .pipe(S.encodeKeys({ Sources: "sources" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/bridges/{BridgeArn}/sources" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AddBridgeSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.optional(S.String),
          Sources: S.optional(__listOfBridgeSource),
        }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Sources: "sources" })),
      ).annotate({ identifier: "AddBridgeSourcesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcInterfaceName: S.optional(S.String) }).pipe(
          S.encodeKeys({ VpcInterfaceName: "vpcInterfaceName" }),
        ),
      ).annotate({ identifier: "VpcInterfaceAttachment" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          FlowVpcInterfaceAttachment: S.optional(__S(576, __c18, 0)),
          Name: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            FlowVpcInterfaceAttachment: "flowVpcInterfaceAttachment",
            Name: "name",
          }),
        ),
      ).annotate({ identifier: "AddBridgeFlowSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowSource: S.optional(__S(608, __c19, 0)),
          NetworkSource: S.optional(__S(673, __c21, 1)),
        }).pipe(S.encodeKeys({ FlowSource: "flowSource", NetworkSource: "networkSource" })),
      ).annotate({ identifier: "AddBridgeSourceRequest" });
    case 2:
      return S.Array(__S(609, __c19, 1));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(675, __c21, 3));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MulticastSourceIp: S.optional(S.String) }).pipe(
          S.encodeKeys({ MulticastSourceIp: "multicastSourceIp" }),
        ),
      ).annotate({ identifier: "MulticastSourceSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MulticastIp: S.optional(S.String),
          MulticastSourceSettings: S.optional(__S(672, __c21, 0)),
          Name: S.optional(S.String),
          NetworkName: S.optional(S.String),
          Port: S.optional(S.Number),
          Protocol: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MulticastIp: "multicastIp",
            MulticastSourceSettings: "multicastSourceSettings",
            Name: "name",
            NetworkName: "networkName",
            Port: "port",
            Protocol: "protocol",
          }),
        ),
      ).annotate({ identifier: "AddBridgeNetworkSourceRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          FlowVpcInterfaceAttachment: S.optional(__S(576, __c18, 0)),
          Name: S.optional(S.String),
          OutputArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            FlowVpcInterfaceAttachment: "flowVpcInterfaceAttachment",
            Name: "name",
            OutputArn: "outputArn",
          }),
        ),
      ).annotate({ identifier: "BridgeFlowSource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FlowSource: S.optional(__S(674, __c21, 2)),
          NetworkSource: S.optional(__S(673, __c21, 1)),
        }).pipe(S.encodeKeys({ FlowSource: "flowSource", NetworkSource: "networkSource" })),
      ).annotate({ identifier: "BridgeSource" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          MediaStreams: S.optional(__listOfAddMediaStreamRequest),
        })
          .pipe(S.encodeKeys({ MediaStreams: "mediaStreams" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/mediaStreams" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AddFlowMediaStreamsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          MediaStreams: S.optional(__listOfMediaStream),
        }).pipe(S.encodeKeys({ FlowArn: "flowArn", MediaStreams: "mediaStreams" })),
      ).annotate({ identifier: "AddFlowMediaStreamsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(833, __c26, 1)),
          ClockRate: S.optional(S.Number),
          Description: S.optional(S.String),
          MediaStreamId: S.optional(S.Number),
          MediaStreamName: S.optional(S.String),
          MediaStreamType: S.optional(S.String),
          VideoFormat: S.optional(S.String),
          MediaStreamTags: S.optional(__mapOfString),
        }).pipe(
          S.encodeKeys({
            Attributes: "attributes",
            ClockRate: "clockRate",
            Description: "description",
            MediaStreamId: "mediaStreamId",
            MediaStreamName: "mediaStreamName",
            MediaStreamType: "mediaStreamType",
            VideoFormat: "videoFormat",
            MediaStreamTags: "mediaStreamTags",
          }),
        ),
      ).annotate({ identifier: "AddMediaStreamRequest" });
    case 1:
      return S.Array(__S(768, __c24, 0));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(834, __c26, 2));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelOrder: S.optional(S.String),
          Colorimetry: S.optional(S.String),
          ExactFramerate: S.optional(S.String),
          Par: S.optional(S.String),
          Range: S.optional(S.String),
          ScanMode: S.optional(S.String),
          Tcs: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChannelOrder: "channelOrder",
            Colorimetry: "colorimetry",
            ExactFramerate: "exactFramerate",
            Par: "par",
            Range: "range",
            ScanMode: "scanMode",
            Tcs: "tcs",
          }),
        ),
      ).annotate({ identifier: "FmtpRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Fmtp: S.optional(__S(832, __c26, 0)), Lang: S.optional(S.String) }).pipe(
          S.encodeKeys({ Fmtp: "fmtp", Lang: "lang" }),
        ),
      ).annotate({ identifier: "MediaStreamAttributesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(833, __c26, 1)),
          ClockRate: S.optional(S.Number),
          Description: S.optional(S.String),
          Fmt: S.optional(S.Number),
          MediaStreamId: S.optional(S.Number),
          MediaStreamName: S.optional(S.String),
          MediaStreamType: S.optional(S.String),
          VideoFormat: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Attributes: "attributes",
            ClockRate: "clockRate",
            Description: "description",
            Fmt: "fmt",
            MediaStreamId: "mediaStreamId",
            MediaStreamName: "mediaStreamName",
            MediaStreamType: "mediaStreamType",
            VideoFormat: "videoFormat",
          }),
        ),
      ).annotate({ identifier: "MediaStream" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          Outputs: S.optional(__listOfAddOutputRequest),
        })
          .pipe(S.encodeKeys({ Outputs: "outputs" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/outputs" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AddFlowOutputsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String), Outputs: S.optional(__listOfOutput) }).pipe(
          S.encodeKeys({ FlowArn: "flowArn", Outputs: "outputs" }),
        ),
      ).annotate({ identifier: "AddFlowOutputsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AutomaticEncryptionKeyConfiguration",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SecretArn: S.String, RoleArn: S.String }).pipe(
          S.encodeKeys({ SecretArn: "secretArn", RoleArn: "roleArn" }),
        ),
      ).annotate({ identifier: "SecretsManagerEncryptionKeyConfiguration" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ SecretsManager: __S(960, __c30, 0) }),
        /*@__PURE__*/ S.Struct({ Automatic: __S(928, __c29, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          EncryptionKeyType: S.optional(S.String),
          EncryptionKeyConfiguration: __S(961, __c30, 1),
        }).pipe(
          S.encodeKeys({
            EncryptionKeyType: "encryptionKeyType",
            EncryptionKeyConfiguration: "encryptionKeyConfiguration",
          }),
        ),
      ).annotate({ identifier: "FlowTransitEncryption" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
      ).annotate({ identifier: "InterfaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceName: S.optional(S.String),
          AudioReferenceLevel: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ SourceName: "sourceName", AudioReferenceLevel: "audioReferenceLevel" }),
        ),
      ).annotate({ identifier: "NdiSourceSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CidrAllowList: S.optional(__listOfString),
          MaxBitrate: S.optional(S.Number),
          MaxLatency: S.optional(S.Number),
          MaxSyncBuffer: S.optional(S.Number),
          MinLatency: S.optional(S.Number),
          Protocol: S.optional(S.String),
          RemoteId: S.optional(S.String),
          SenderControlPort: S.optional(S.Number),
          SenderIpAddress: S.optional(S.String),
          SmoothingLatency: S.optional(S.Number),
          SourceListenerAddress: S.optional(S.String),
          SourceListenerPort: S.optional(S.Number),
          StreamId: S.optional(S.String),
          NdiSpeedHqQuality: S.optional(S.Number),
          NdiProgramName: S.optional(S.String),
          NdiSourceSettings: S.optional(__S(993, __c31, 1)),
          NdiOutputTimecodeSource: S.optional(S.String),
          NdiAudioReferenceLevel: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            CidrAllowList: "cidrAllowList",
            MaxBitrate: "maxBitrate",
            MaxLatency: "maxLatency",
            MaxSyncBuffer: "maxSyncBuffer",
            MinLatency: "minLatency",
            Protocol: "protocol",
            RemoteId: "remoteId",
            SenderControlPort: "senderControlPort",
            SenderIpAddress: "senderIpAddress",
            SmoothingLatency: "smoothingLatency",
            SourceListenerAddress: "sourceListenerAddress",
            SourceListenerPort: "sourceListenerPort",
            StreamId: "streamId",
            NdiSpeedHqQuality: "ndiSpeedHqQuality",
            NdiProgramName: "ndiProgramName",
            NdiSourceSettings: "ndiSourceSettings",
            NdiOutputTimecodeSource: "ndiOutputTimecodeSource",
            NdiAudioReferenceLevel: "ndiAudioReferenceLevel",
          }),
        ),
      ).annotate({ identifier: "Transport" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.optional(S.String),
          ConstantInitializationVector: S.optional(S.String),
          DeviceId: S.optional(S.String),
          KeyType: S.optional(S.String),
          Region: S.optional(S.String),
          ResourceId: S.optional(S.String),
          RoleArn: S.optional(S.String),
          SecretArn: S.optional(S.String),
          Url: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Algorithm: "algorithm",
            ConstantInitializationVector: "constantInitializationVector",
            DeviceId: "deviceId",
            KeyType: "keyType",
            Region: "region",
            ResourceId: "resourceId",
            RoleArn: "roleArn",
            SecretArn: "secretArn",
            Url: "url",
          }),
        ),
      ).annotate({ identifier: "Encryption" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CidrAllowList: S.optional(__listOfString),
          Description: S.optional(S.String),
          Destination: S.optional(S.String),
          Encryption: S.optional(__S(1024, __c32, 0)),
          MaxLatency: S.optional(S.Number),
          MediaStreamOutputConfigurations: S.optional(
            __listOfMediaStreamOutputConfigurationRequest,
          ),
          MinLatency: S.optional(S.Number),
          Name: S.optional(S.String),
          Port: S.optional(S.Number),
          Protocol: S.optional(S.String),
          RemoteId: S.optional(S.String),
          SenderControlPort: S.optional(S.Number),
          SmoothingLatency: S.optional(S.Number),
          StreamId: S.optional(S.String),
          VpcInterfaceAttachment: S.optional(__S(576, __c18, 0)),
          OutputStatus: S.optional(S.String),
          NdiSpeedHqQuality: S.optional(S.Number),
          NdiProgramName: S.optional(S.String),
          OutputTags: S.optional(__mapOfString),
          RouterIntegrationState: S.optional(S.String),
          RouterIntegrationTransitEncryption: S.optional(__S(962, __c30, 2)),
          NdiOutputTimecodeSource: S.optional(S.String),
          NdiAudioReferenceLevel: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            CidrAllowList: "cidrAllowList",
            Description: "description",
            Destination: "destination",
            Encryption: "encryption",
            MaxLatency: "maxLatency",
            MediaStreamOutputConfigurations: "mediaStreamOutputConfigurations",
            MinLatency: "minLatency",
            Name: "name",
            Port: "port",
            Protocol: "protocol",
            RemoteId: "remoteId",
            SenderControlPort: "senderControlPort",
            SmoothingLatency: "smoothingLatency",
            StreamId: "streamId",
            VpcInterfaceAttachment: "vpcInterfaceAttachment",
            OutputStatus: "outputStatus",
            NdiSpeedHqQuality: "ndiSpeedHqQuality",
            NdiProgramName: "ndiProgramName",
            OutputTags: "outputTags",
            RouterIntegrationState: "routerIntegrationState",
            RouterIntegrationTransitEncryption: "routerIntegrationTransitEncryption",
            NdiOutputTimecodeSource: "ndiOutputTimecodeSource",
            NdiAudioReferenceLevel: "ndiAudioReferenceLevel",
          }),
        ),
      ).annotate({ identifier: "AddOutputRequest" });
    case 1:
      return S.Array(__S(1056, __c33, 0));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationIp: S.optional(S.String),
          DestinationPort: S.optional(S.Number),
          Interface: S.optional(__S(992, __c31, 0)),
        }).pipe(
          S.encodeKeys({
            DestinationIp: "destinationIp",
            DestinationPort: "destinationPort",
            Interface: "interface",
          }),
        ),
      ).annotate({ identifier: "DestinationConfigurationRequest" });
    case 1:
      return S.Array(__S(1088, __c34, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DestinationConfigurations: S.optional(__listOfDestinationConfigurationRequest),
          EncodingName: S.optional(S.String),
          EncodingParameters: S.optional(__S(1152, __c36, 0)),
          MediaStreamName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DestinationConfigurations: "destinationConfigurations",
            EncodingName: "encodingName",
            EncodingParameters: "encodingParameters",
            MediaStreamName: "mediaStreamName",
          }),
        ),
      ).annotate({ identifier: "MediaStreamOutputConfigurationRequest" });
    case 3:
      return S.Array(__S(1090, __c34, 2));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1158, __c36, 6));
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CompressionFactor: S.optional(S.Number),
          EncoderProfile: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CompressionFactor: "compressionFactor",
            EncoderProfile: "encoderProfile",
          }),
        ),
      ).annotate({ identifier: "EncodingParametersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DestinationIp: S.optional(S.String),
          DestinationPort: S.optional(S.Number),
          Interface: S.optional(__S(992, __c31, 0)),
          OutboundIp: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DestinationIp: "destinationIp",
            DestinationPort: "destinationPort",
            Interface: "interface",
            OutboundIp: "outboundIp",
          }),
        ),
      ).annotate({ identifier: "DestinationConfiguration" });
    case 2:
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DestinationConfigurations: S.optional(__listOfDestinationConfiguration),
          EncodingName: S.optional(S.String),
          EncodingParameters: S.optional(__S(1152, __c36, 0)),
          MediaStreamName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DestinationConfigurations: "destinationConfigurations",
            EncodingName: "encodingName",
            EncodingParameters: "encodingParameters",
            MediaStreamName: "mediaStreamName",
          }),
        ),
      ).annotate({ identifier: "MediaStreamOutputConfiguration" });
    case 4:
      return S.Array(__S(1155, __c36, 3));
    case 5:
      return S.Array(S.Number);
    case 6:
      return S.suspend(() =>
        S.Struct({
          DataTransferSubscriberFeePercent: S.optional(S.Number),
          Description: S.optional(S.String),
          Destination: S.optional(S.String),
          Encryption: S.optional(__S(1024, __c32, 0)),
          EntitlementArn: S.optional(S.String),
          ListenerAddress: S.optional(S.String),
          MediaLiveInputArn: S.optional(S.String),
          MediaStreamOutputConfigurations: S.optional(__listOfMediaStreamOutputConfiguration),
          Name: S.optional(S.String),
          OutputArn: S.optional(S.String),
          Port: S.optional(S.Number),
          Transport: S.optional(__S(994, __c31, 2)),
          VpcInterfaceAttachment: S.optional(__S(576, __c18, 0)),
          BridgeArn: S.optional(S.String),
          BridgePorts: S.optional(__listOfInteger),
          OutputStatus: S.optional(S.String),
          PeerIpAddress: S.optional(S.String),
          RouterIntegrationState: S.optional(S.String),
          RouterIntegrationTransitEncryption: S.optional(__S(962, __c30, 2)),
          ConnectedRouterInputArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
            Description: "description",
            Destination: "destination",
            Encryption: "encryption",
            EntitlementArn: "entitlementArn",
            ListenerAddress: "listenerAddress",
            MediaLiveInputArn: "mediaLiveInputArn",
            MediaStreamOutputConfigurations: "mediaStreamOutputConfigurations",
            Name: "name",
            OutputArn: "outputArn",
            Port: "port",
            Transport: "transport",
            VpcInterfaceAttachment: "vpcInterfaceAttachment",
            BridgeArn: "bridgeArn",
            BridgePorts: "bridgePorts",
            OutputStatus: "outputStatus",
            PeerIpAddress: "peerIpAddress",
            RouterIntegrationState: "routerIntegrationState",
            RouterIntegrationTransitEncryption: "routerIntegrationTransitEncryption",
            ConnectedRouterInputArn: "connectedRouterInputArn",
          }),
        ),
      ).annotate({ identifier: "Output" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          Sources: S.optional(__listOfSetSourceRequest),
        })
          .pipe(S.encodeKeys({ Sources: "sources" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/source" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AddFlowSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String), Sources: S.optional(__listOfSource) }).pipe(
          S.encodeKeys({ FlowArn: "flowArn", Sources: "sources" }),
        ),
      ).annotate({ identifier: "AddFlowSourcesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Decryption: S.optional(__S(1024, __c32, 0)),
          Description: S.optional(S.String),
          EntitlementArn: S.optional(S.String),
          IngestPort: S.optional(S.Number),
          MaxBitrate: S.optional(S.Number),
          MaxLatency: S.optional(S.Number),
          MaxSyncBuffer: S.optional(S.Number),
          MediaStreamSourceConfigurations: S.optional(
            __listOfMediaStreamSourceConfigurationRequest,
          ),
          MinLatency: S.optional(S.Number),
          Name: S.optional(S.String),
          Protocol: S.optional(S.String),
          SenderControlPort: S.optional(S.Number),
          SenderIpAddress: S.optional(S.String),
          SourceListenerAddress: S.optional(S.String),
          SourceListenerPort: S.optional(S.Number),
          StreamId: S.optional(S.String),
          VpcInterfaceName: S.optional(S.String),
          WhitelistCidr: S.optional(S.String),
          GatewayBridgeSource: S.optional(__S(1312, __c41, 0)),
          NdiSourceSettings: S.optional(__S(993, __c31, 1)),
          SourceTags: S.optional(__mapOfString),
          RouterIntegrationState: S.optional(S.String),
          RouterIntegrationTransitDecryption: S.optional(__S(962, __c30, 2)),
        }).pipe(
          S.encodeKeys({
            Decryption: "decryption",
            Description: "description",
            EntitlementArn: "entitlementArn",
            IngestPort: "ingestPort",
            MaxBitrate: "maxBitrate",
            MaxLatency: "maxLatency",
            MaxSyncBuffer: "maxSyncBuffer",
            MediaStreamSourceConfigurations: "mediaStreamSourceConfigurations",
            MinLatency: "minLatency",
            Name: "name",
            Protocol: "protocol",
            SenderControlPort: "senderControlPort",
            SenderIpAddress: "senderIpAddress",
            SourceListenerAddress: "sourceListenerAddress",
            SourceListenerPort: "sourceListenerPort",
            StreamId: "streamId",
            VpcInterfaceName: "vpcInterfaceName",
            WhitelistCidr: "whitelistCidr",
            GatewayBridgeSource: "gatewayBridgeSource",
            NdiSourceSettings: "ndiSourceSettings",
            SourceTags: "sourceTags",
            RouterIntegrationState: "routerIntegrationState",
            RouterIntegrationTransitDecryption: "routerIntegrationTransitDecryption",
          }),
        ),
      ).annotate({ identifier: "SetSourceRequest" });
    case 1:
      return S.Array(__S(1216, __c38, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputPort: S.optional(S.Number),
          Interface: S.optional(__S(992, __c31, 0)),
        }).pipe(S.encodeKeys({ InputPort: "inputPort", Interface: "interface" })),
      ).annotate({ identifier: "InputConfigurationRequest" });
    case 1:
      return S.Array(__S(1248, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EncodingName: S.optional(S.String),
          InputConfigurations: S.optional(__listOfInputConfigurationRequest),
          MediaStreamName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EncodingName: "encodingName",
            InputConfigurations: "inputConfigurations",
            MediaStreamName: "mediaStreamName",
          }),
        ),
      ).annotate({ identifier: "MediaStreamSourceConfigurationRequest" });
    case 3:
      return S.Array(__S(1250, __c39, 2));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1317, __c41, 5));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.optional(S.String),
          VpcInterfaceAttachment: S.optional(__S(576, __c18, 0)),
        }).pipe(
          S.encodeKeys({
            BridgeArn: "bridgeArn",
            VpcInterfaceAttachment: "vpcInterfaceAttachment",
          }),
        ),
      ).annotate({ identifier: "SetGatewayBridgeSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InputIp: S.optional(S.String),
          InputPort: S.optional(S.Number),
          Interface: S.optional(__S(992, __c31, 0)),
        }).pipe(
          S.encodeKeys({ InputIp: "inputIp", InputPort: "inputPort", Interface: "interface" }),
        ),
      ).annotate({ identifier: "InputConfiguration" });
    case 2:
      return S.Array(__S(1313, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EncodingName: S.optional(S.String),
          InputConfigurations: S.optional(__listOfInputConfiguration),
          MediaStreamName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EncodingName: "encodingName",
            InputConfigurations: "inputConfigurations",
            MediaStreamName: "mediaStreamName",
          }),
        ),
      ).annotate({ identifier: "MediaStreamSourceConfiguration" });
    case 4:
      return S.Array(__S(1315, __c41, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          DataTransferSubscriberFeePercent: S.optional(S.Number),
          Decryption: S.optional(__S(1024, __c32, 0)),
          Description: S.optional(S.String),
          EntitlementArn: S.optional(S.String),
          IngestIp: S.optional(S.String),
          IngestPort: S.optional(S.Number),
          MediaStreamSourceConfigurations: S.optional(__listOfMediaStreamSourceConfiguration),
          Name: S.optional(S.String),
          SenderControlPort: S.optional(S.Number),
          SenderIpAddress: S.optional(S.String),
          SourceArn: S.optional(S.String),
          Transport: S.optional(__S(994, __c31, 2)),
          VpcInterfaceName: S.optional(S.String),
          WhitelistCidr: S.optional(S.String),
          GatewayBridgeSource: S.optional(__S(1312, __c41, 0)),
          PeerIpAddress: S.optional(S.String),
          RouterIntegrationState: S.optional(S.String),
          RouterIntegrationTransitDecryption: S.optional(__S(962, __c30, 2)),
          ConnectedRouterOutputArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
            Decryption: "decryption",
            Description: "description",
            EntitlementArn: "entitlementArn",
            IngestIp: "ingestIp",
            IngestPort: "ingestPort",
            MediaStreamSourceConfigurations: "mediaStreamSourceConfigurations",
            Name: "name",
            SenderControlPort: "senderControlPort",
            SenderIpAddress: "senderIpAddress",
            SourceArn: "sourceArn",
            Transport: "transport",
            VpcInterfaceName: "vpcInterfaceName",
            WhitelistCidr: "whitelistCidr",
            GatewayBridgeSource: "gatewayBridgeSource",
            PeerIpAddress: "peerIpAddress",
            RouterIntegrationState: "routerIntegrationState",
            RouterIntegrationTransitDecryption: "routerIntegrationTransitDecryption",
            ConnectedRouterOutputArn: "connectedRouterOutputArn",
          }),
        ),
      ).annotate({ identifier: "Source" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          VpcInterfaces: S.optional(__listOfVpcInterfaceRequest),
        })
          .pipe(S.encodeKeys({ VpcInterfaces: "vpcInterfaces" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/vpcInterfaces" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AddFlowVpcInterfacesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          VpcInterfaces: S.optional(__listOfVpcInterface),
        }).pipe(S.encodeKeys({ FlowArn: "flowArn", VpcInterfaces: "vpcInterfaces" })),
      ).annotate({ identifier: "AddFlowVpcInterfacesResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          NetworkInterfaceType: S.optional(S.String),
          RoleArn: S.optional(S.String),
          SecurityGroupIds: S.optional(__listOfString),
          SubnetId: S.optional(S.String),
          VpcInterfaceTags: S.optional(__mapOfString),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            NetworkInterfaceType: "networkInterfaceType",
            RoleArn: "roleArn",
            SecurityGroupIds: "securityGroupIds",
            SubnetId: "subnetId",
            VpcInterfaceTags: "vpcInterfaceTags",
          }),
        ),
      ).annotate({ identifier: "VpcInterfaceRequest" });
    case 1:
      return S.Array(__S(1376, __c43, 0));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          NetworkInterfaceIds: S.optional(__listOfString),
          NetworkInterfaceType: S.optional(S.String),
          RoleArn: S.optional(S.String),
          SecurityGroupIds: S.optional(__listOfString),
          SubnetId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            NetworkInterfaceIds: "networkInterfaceIds",
            NetworkInterfaceType: "networkInterfaceType",
            RoleArn: "roleArn",
            SecurityGroupIds: "securityGroupIds",
            SubnetId: "subnetId",
          }),
        ),
      ).annotate({ identifier: "VpcInterface" });
    case 1:
      return S.Array(__S(1408, __c44, 0));
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arns: DestinationEndpointArnList.pipe(T.HttpQuery("arns")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/destinationEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetDestinationEndpointRequest" });
    case 1:
      return S.Array(__S(1614, __c50, 14));
    case 2:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "BatchGetDestinationEndpointError" });
    case 3:
      return S.Array(__S(1442, __c45, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ DestinationEndpoints: __S(1441, __c45, 1), Errors: __S(1443, __c45, 3) }).pipe(
          S.encodeKeys({ DestinationEndpoints: "destinationEndpoints", Errors: "errors" }),
        ),
      ).annotate({ identifier: "BatchGetDestinationEndpointResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "DestinationEndpointMessage" });
    case 1:
      return S.Array(__S(1472, __c46, 0));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SecretArn: S.String }).pipe(S.encodeKeys({ SecretArn: "secretArn" })),
      ).annotate({ identifier: "EndpointEncryptionSecretConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EncryptionSecretType: S.optional(S.String),
          EncryptionSecret: __S(1504, __c47, 0),
        }).pipe(
          S.encodeKeys({
            EncryptionSecretType: "encryptionSecretType",
            EncryptionSecret: "encryptionSecret",
          }),
        ),
      ).annotate({ identifier: "SecretsManagerEndpointEncryptionConfiguration" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ SecretsManager: __S(1505, __c47, 1) }),
        /*@__PURE__*/ S.Struct({ Automatic: __S(928, __c29, 0) }),
      ]);
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Cidr: S.String }).pipe(S.encodeKeys({ Cidr: "cidr" })),
      ).annotate({ identifier: "PublicDestinationEndpointNetworkingConfigurationAllowRule" });
    case 1:
      return S.Array(__S(1536, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ SecurityGroupIds: SecurityGroupIdList, SubnetId: S.String }).pipe(
          S.encodeKeys({ SecurityGroupIds: "securityGroupIds", SubnetId: "subnetId" }),
        ),
      ).annotate({ identifier: "VpcDestinationEndpointNetworkingConfiguration" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ShareState: S.String }).pipe(S.encodeKeys({ ShareState: "shareState" })),
      ).annotate({ identifier: "OwnedResourceShareDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OwnerAccountId: S.String }).pipe(
          S.encodeKeys({ OwnerAccountId: "ownerAccountId" }),
        ),
      ).annotate({ identifier: "ConsumedResourceShareDetails" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Owned: __S(1568, __c49, 0) }),
        /*@__PURE__*/ S.Struct({ Consumed: __S(1569, __c49, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          MaximumBitrate: S.Number,
          State: S.String,
          Messages: __S(1473, __c46, 1),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            MaximumBitrate: "maximumBitrate",
            State: "state",
            Messages: "messages",
          }),
        ),
      ).annotate({ identifier: "RouterInputDestinationEndpointAssociatedResourceDetails" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DestinationAllowRules: __S(1537, __c48, 1) }).pipe(
          S.encodeKeys({ DestinationAllowRules: "destinationAllowRules" }),
        ),
      ).annotate({ identifier: "PublicDestinationEndpointNetworkingConfiguration" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Public: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ Vpc: __S(1538, __c48, 2) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ DestinationAddress: S.String, DestinationIngestPort: S.Number }).pipe(
          S.encodeKeys({
            DestinationAddress: "destinationAddress",
            DestinationIngestPort: "destinationIngestPort",
          }),
        ),
      ).annotate({ identifier: "RistStandardDestinationEndpointConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DestinationAddress: S.String,
          DestinationIngestPort: S.Number,
          MinimumLatencyMilliseconds: S.Number,
          StreamId: S.optional(S.String),
          EncryptionPassphrase: S.optional(__S(1504, __c47, 0)),
        }).pipe(
          S.encodeKeys({
            DestinationAddress: "destinationAddress",
            DestinationIngestPort: "destinationIngestPort",
            MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
            StreamId: "streamId",
            EncryptionPassphrase: "encryptionPassphrase",
          }),
        ),
      ).annotate({ identifier: "SrtListenerStandardDestinationEndpointConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          SourceListenerPort: S.Number,
          MinimumLatencyMilliseconds: S.Number,
          EncryptionPassphrase: S.optional(__S(1504, __c47, 0)),
        }).pipe(
          S.encodeKeys({
            SourceListenerPort: "sourceListenerPort",
            MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
            EncryptionPassphrase: "encryptionPassphrase",
          }),
        ),
      ).annotate({ identifier: "SrtCallerStandardDestinationEndpointConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DestinationAddress: S.String,
          DestinationIngestPort: S.Number,
          ForwardErrorCorrectionState: S.String,
        }).pipe(
          S.encodeKeys({
            DestinationAddress: "destinationAddress",
            DestinationIngestPort: "destinationIngestPort",
            ForwardErrorCorrectionState: "forwardErrorCorrectionState",
          }),
        ),
      ).annotate({ identifier: "RtpStandardDestinationEndpointConfiguration" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Rist: __S(1602, __c50, 2) }),
        /*@__PURE__*/ S.Struct({ SrtListener: __S(1603, __c50, 3) }),
        /*@__PURE__*/ S.Struct({ SrtCaller: __S(1604, __c50, 4) }),
        /*@__PURE__*/ S.Struct({ Rtp: __S(1605, __c50, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DestinationNetworkingConfiguration: __S(1601, __c50, 1),
          ProtocolConfiguration: __S(1606, __c50, 6),
          DestinationNetworkingType: S.optional(S.String),
          Protocol: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            DestinationNetworkingConfiguration: "destinationNetworkingConfiguration",
            ProtocolConfiguration: "protocolConfiguration",
            DestinationNetworkingType: "destinationNetworkingType",
            Protocol: "protocol",
          }),
        ),
      ).annotate({ identifier: "StandardDestinationEndpointConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({ RouterInputArn: S.String }).pipe(
          S.encodeKeys({ RouterInputArn: "routerInputArn" }),
        ),
      ).annotate({ identifier: "RouterInputDestinationEndpointConfiguration" });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Standard: __S(1607, __c50, 7) }),
        /*@__PURE__*/ S.Struct({ RouterInput: __S(1608, __c50, 8) }),
      ]);
    case 10:
      return S.suspend(() =>
        S.Struct({
          SourceIpAddress: S.optional(S.String),
          SourceListenerPort: S.optional(S.Number),
          SourceEncryptionType: S.optional(S.String),
          SourceEncryptionConfiguration: S.optional(__S(1506, __c47, 2)),
          SourceEndpointType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            SourceIpAddress: "sourceIpAddress",
            SourceListenerPort: "sourceListenerPort",
            SourceEncryptionType: "sourceEncryptionType",
            SourceEncryptionConfiguration: "sourceEncryptionConfiguration",
            SourceEndpointType: "sourceEndpointType",
          }),
        ),
      ).annotate({ identifier: "StandardDestinationEndpointConnectionDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          SourceEncryptionType: S.optional(S.String),
          SourceEncryptionConfiguration: S.optional(__S(1506, __c47, 2)),
          SourceEndpointType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            SourceEncryptionType: "sourceEncryptionType",
            SourceEncryptionConfiguration: "sourceEncryptionConfiguration",
            SourceEndpointType: "sourceEndpointType",
          }),
        ),
      ).annotate({ identifier: "RouterInputDestinationEndpointConnectionDetails" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Standard: __S(1610, __c50, 10) }),
        /*@__PURE__*/ S.Struct({ RouterInput: __S(1611, __c50, 11) }),
      ]);
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Standard: __S(928, __c29, 0) }),
        /*@__PURE__*/ S.Struct({ RouterInput: __S(1571, __c49, 3) }),
      ]);
    case 14:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          Description: S.String,
          RegionName: S.String,
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          LifecycleManagement: S.String,
          Messages: __S(1473, __c46, 1),
          DestinationType: S.String,
          Configuration: __S(1609, __c50, 9),
          ResourceShareOwnership: S.String,
          ResourceShareDetails: __S(1570, __c49, 2),
          RegistrationState: S.String,
          ConnectionDetails: S.optional(__S(1612, __c50, 12)),
          ConnectionState: S.String,
          ConnectedSource: S.optional(S.String),
          DecryptionType: S.optional(S.String),
          DecryptionConfiguration: S.optional(__S(1506, __c47, 2)),
          AssociatedResourceDetails: __S(1613, __c50, 13),
          Tags: __mapOfString,
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            Description: "description",
            RegionName: "regionName",
            AvailabilityZone: "availabilityZone",
            AvailabilityZoneId: "availabilityZoneId",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            LifecycleManagement: "lifecycleManagement",
            Messages: "messages",
            DestinationType: "destinationType",
            Configuration: "configuration",
            ResourceShareOwnership: "resourceShareOwnership",
            ResourceShareDetails: "resourceShareDetails",
            RegistrationState: "registrationState",
            ConnectionDetails: "connectionDetails",
            ConnectionState: "connectionState",
            ConnectedSource: "connectedSource",
            DecryptionType: "decryptionType",
            DecryptionConfiguration: "decryptionConfiguration",
            AssociatedResourceDetails: "associatedResourceDetails",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "DestinationEndpoint" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arns: RouterInputArnList.pipe(T.HttpQuery("arns")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/routerInputs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetRouterInputRequest" });
    case 1:
      return S.Array(__S(1750, __c54, 22));
    case 2:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "BatchGetRouterInputError" });
    case 3:
      return S.Array(__S(1634, __c51, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ RouterInputs: __S(1633, __c51, 1), Errors: __S(1635, __c51, 3) }).pipe(
          S.encodeKeys({ RouterInputs: "routerInputs", Errors: "errors" }),
        ),
      ).annotate({ identifier: "BatchGetRouterInputResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EncryptionKey: __S(960, __c30, 0) }).pipe(
          S.encodeKeys({ EncryptionKey: "encryptionKey" }),
        ),
      ).annotate({ identifier: "SrtDecryptionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Day: S.String, Time: S.String }).pipe(
          S.encodeKeys({ Day: "day", Time: "time" }),
        ),
      ).annotate({ identifier: "PreferredDayTimeMaintenanceConfiguration" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ PreferredDayTime: __S(1665, __c52, 1) }),
        /*@__PURE__*/ S.Struct({ Default: __S(928, __c29, 0) }),
      ]);
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Start: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          End: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ScheduledTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }).pipe(S.encodeKeys({ Start: "start", End: "end", ScheduledTime: "scheduledTime" })),
      ).annotate({ identifier: "WindowMaintenanceSchedule" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Window: __S(1696, __c53, 0) })]);
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EndpointLifecycleManagement: S.String,
          SourceTransitDecryptionType: S.optional(S.String),
          SourceTransitDecryption: __S(1506, __c47, 2),
        }).pipe(
          S.encodeKeys({
            EndpointLifecycleManagement: "endpointLifecycleManagement",
            SourceTransitDecryptionType: "sourceTransitDecryptionType",
            SourceTransitDecryption: "sourceTransitDecryption",
          }),
        ),
      ).annotate({ identifier: "DestinationEndpointRouterInputConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Port: S.Number, RecoveryLatencyMilliseconds: S.Number }).pipe(
          S.encodeKeys({
            Port: "port",
            RecoveryLatencyMilliseconds: "recoveryLatencyMilliseconds",
          }),
        ),
      ).annotate({ identifier: "RistRouterInputConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Port: S.Number,
          MinimumLatencyMilliseconds: S.Number,
          DecryptionConfiguration: S.optional(__S(1664, __c52, 0)),
        }).pipe(
          S.encodeKeys({
            Port: "port",
            MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
            DecryptionConfiguration: "decryptionConfiguration",
          }),
        ),
      ).annotate({ identifier: "SrtListenerRouterInputConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SourceAddress: S.String,
          SourcePort: S.Number,
          MinimumLatencyMilliseconds: S.Number,
          StreamId: S.optional(S.String),
          DecryptionConfiguration: S.optional(__S(1664, __c52, 0)),
        }).pipe(
          S.encodeKeys({
            SourceAddress: "sourceAddress",
            SourcePort: "sourcePort",
            MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
            StreamId: "streamId",
            DecryptionConfiguration: "decryptionConfiguration",
          }),
        ),
      ).annotate({ identifier: "SrtCallerRouterInputConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Port: S.Number, ForwardErrorCorrection: S.optional(S.String) }).pipe(
          S.encodeKeys({ Port: "port", ForwardErrorCorrection: "forwardErrorCorrection" }),
        ),
      ).annotate({ identifier: "RtpRouterInputConfiguration" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Rist: __S(1729, __c54, 1) }),
        /*@__PURE__*/ S.Struct({ SrtListener: __S(1730, __c54, 2) }),
        /*@__PURE__*/ S.Struct({ SrtCaller: __S(1731, __c54, 3) }),
        /*@__PURE__*/ S.Struct({ Rtp: __S(1732, __c54, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          NetworkInterfaceArn: S.String,
          ProtocolConfiguration: __S(1733, __c54, 5),
          Protocol: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            NetworkInterfaceArn: "networkInterfaceArn",
            ProtocolConfiguration: "protocolConfiguration",
            Protocol: "protocol",
          }),
        ),
      ).annotate({ identifier: "StandardRouterInputConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          MediaLiveChannelArn: S.optional(S.String),
          MediaLivePipelineId: S.optional(S.String),
          MediaLiveChannelOutputName: S.optional(S.String),
          SourceTransitDecryption: __S(962, __c30, 2),
        }).pipe(
          S.encodeKeys({
            MediaLiveChannelArn: "mediaLiveChannelArn",
            MediaLivePipelineId: "mediaLivePipelineId",
            MediaLiveChannelOutputName: "mediaLiveChannelOutputName",
            SourceTransitDecryption: "sourceTransitDecryption",
          }),
        ),
      ).annotate({ identifier: "MediaLiveChannelRouterInputConfiguration" });
    case 8:
      return S.Array(__S(1733, __c54, 5));
    case 9:
      return S.suspend(() =>
        S.Struct({
          NetworkInterfaceArn: S.String,
          ProtocolConfigurations: __S(1736, __c54, 8),
          SourcePriorityMode: S.String,
          PrimarySourceIndex: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            NetworkInterfaceArn: "networkInterfaceArn",
            ProtocolConfigurations: "protocolConfigurations",
            SourcePriorityMode: "sourcePriorityMode",
            PrimarySourceIndex: "primarySourceIndex",
          }),
        ),
      ).annotate({ identifier: "FailoverRouterInputConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          FlowOutputArn: S.optional(S.String),
          SourceTransitDecryption: __S(962, __c30, 2),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            FlowOutputArn: "flowOutputArn",
            SourceTransitDecryption: "sourceTransitDecryption",
          }),
        ),
      ).annotate({ identifier: "MediaConnectFlowRouterInputConfiguration" });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Rtp: __S(1732, __c54, 4) }),
        /*@__PURE__*/ S.Struct({ Rist: __S(1729, __c54, 1) }),
      ]);
    case 12:
      return S.Array(__S(1739, __c54, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          NetworkInterfaceArn: S.String,
          ProtocolConfigurations: __S(1740, __c54, 12),
          MergeRecoveryWindowMilliseconds: S.Number,
        }).pipe(
          S.encodeKeys({
            NetworkInterfaceArn: "networkInterfaceArn",
            ProtocolConfigurations: "protocolConfigurations",
            MergeRecoveryWindowMilliseconds: "mergeRecoveryWindowMilliseconds",
          }),
        ),
      ).annotate({ identifier: "MergeRouterInputConfiguration" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ DestinationEndpoint: __S(1728, __c54, 0) }),
        /*@__PURE__*/ S.Struct({ Standard: __S(1734, __c54, 6) }),
        /*@__PURE__*/ S.Struct({ MediaLiveChannel: __S(1735, __c54, 7) }),
        /*@__PURE__*/ S.Struct({ Failover: __S(1737, __c54, 9) }),
        /*@__PURE__*/ S.Struct({ MediaConnectFlow: __S(1738, __c54, 10) }),
        /*@__PURE__*/ S.Struct({ Merge: __S(1741, __c54, 13) }),
      ]);
    case 15:
      return S.suspend(() =>
        S.Struct({ SourceIpAddress: S.optional(S.String) }).pipe(
          S.encodeKeys({ SourceIpAddress: "sourceIpAddress" }),
        ),
      ).annotate({ identifier: "StandardRouterInputStreamDetails" });
    case 16:
      return S.suspend(() =>
        S.Struct({ SourceIndex: S.Number, SourceIpAddress: S.optional(S.String) }).pipe(
          S.encodeKeys({ SourceIndex: "sourceIndex", SourceIpAddress: "sourceIpAddress" }),
        ),
      ).annotate({ identifier: "FailoverRouterInputIndexedStreamDetails" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          SourceIndexZeroStreamDetails: __S(1744, __c54, 16),
          SourceIndexOneStreamDetails: __S(1744, __c54, 16),
        }).pipe(
          S.encodeKeys({
            SourceIndexZeroStreamDetails: "sourceIndexZeroStreamDetails",
            SourceIndexOneStreamDetails: "sourceIndexOneStreamDetails",
          }),
        ),
      ).annotate({ identifier: "FailoverRouterInputStreamDetails" });
    case 18:
      return S.Union([
        /*@__PURE__*/ S.Struct({ DestinationEndpoint: __S(928, __c29, 0) }),
        /*@__PURE__*/ S.Struct({ Standard: __S(1743, __c54, 15) }),
        /*@__PURE__*/ S.Struct({ MediaLiveChannel: __S(928, __c29, 0) }),
        /*@__PURE__*/ S.Struct({ Failover: __S(1745, __c54, 17) }),
        /*@__PURE__*/ S.Struct({ MediaConnectFlow: __S(928, __c29, 0) }),
        /*@__PURE__*/ S.Struct({ Merge: __S(1745, __c54, 17) }),
      ]);
    case 19:
      return S.suspend(() =>
        S.Struct({ State: S.String, ThresholdSeconds: S.Number }).pipe(
          S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
        ),
      ).annotate({ identifier: "BlackFramesConfiguration" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          BlackFrames: S.optional(__S(1747, __c54, 19)),
          FrozenFrames: S.optional(__S(1747, __c54, 19)),
          SilentAudio: S.optional(__S(1747, __c54, 19)),
        }).pipe(
          S.encodeKeys({
            BlackFrames: "blackFrames",
            FrozenFrames: "frozenFrames",
            SilentAudio: "silentAudio",
          }),
        ),
      ).annotate({ identifier: "ContentQualityAnalysisFeatureConfiguration" });
    case 21:
      return S.Union([/*@__PURE__*/ S.Struct({ ContentLevel: __S(1748, __c54, 20) })]);
    case 22:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          State: S.String,
          InputType: S.String,
          Configuration: __S(1742, __c54, 14),
          RoutedOutputs: S.Number,
          MaximumRoutedOutputs: S.optional(S.Number),
          RegionName: S.String,
          AvailabilityZone: S.String,
          MaximumBitrate: S.Number,
          Tier: S.String,
          RoutingScope: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Messages: __S(1473, __c46, 1),
          TransitEncryption: __S(962, __c30, 2),
          Tags: __mapOfString,
          StreamDetails: __S(1746, __c54, 18),
          IpAddress: S.optional(S.String),
          MaintenanceType: S.String,
          MaintenanceConfiguration: __S(1666, __c52, 2),
          MaintenanceScheduleType: S.optional(S.String),
          MaintenanceSchedule: S.optional(__S(1697, __c53, 1)),
          ContentQualityAnalysisType: S.optional(S.String),
          ContentQualityAnalysisConfiguration: S.optional(__S(1749, __c54, 21)),
          AssociatedDestinationEndpointArns: S.optional(DestinationEndpointArnList),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            State: "state",
            InputType: "inputType",
            Configuration: "configuration",
            RoutedOutputs: "routedOutputs",
            MaximumRoutedOutputs: "maximumRoutedOutputs",
            RegionName: "regionName",
            AvailabilityZone: "availabilityZone",
            MaximumBitrate: "maximumBitrate",
            Tier: "tier",
            RoutingScope: "routingScope",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            Messages: "messages",
            TransitEncryption: "transitEncryption",
            Tags: "tags",
            StreamDetails: "streamDetails",
            IpAddress: "ipAddress",
            MaintenanceType: "maintenanceType",
            MaintenanceConfiguration: "maintenanceConfiguration",
            MaintenanceScheduleType: "maintenanceScheduleType",
            MaintenanceSchedule: "maintenanceSchedule",
            ContentQualityAnalysisType: "contentQualityAnalysisType",
            ContentQualityAnalysisConfiguration: "contentQualityAnalysisConfiguration",
            AssociatedDestinationEndpointArns: "associatedDestinationEndpointArns",
          }),
        ),
      ).annotate({ identifier: "RouterInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arns: RouterNetworkInterfaceArnList.pipe(T.HttpQuery("arns")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/routerNetworkInterfaces" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetRouterNetworkInterfaceRequest" });
    case 1:
      return S.Array(__S(1794, __c56, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "BatchGetRouterNetworkInterfaceError" });
    case 3:
      return S.Array(__S(1762, __c55, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RouterNetworkInterfaces: __S(1761, __c55, 1),
          Errors: __S(1763, __c55, 3),
        }).pipe(
          S.encodeKeys({ RouterNetworkInterfaces: "routerNetworkInterfaces", Errors: "errors" }),
        ),
      ).annotate({ identifier: "BatchGetRouterNetworkInterfaceResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AllowRules: __S(1537, __c48, 1) }).pipe(
          S.encodeKeys({ AllowRules: "allowRules" }),
        ),
      ).annotate({ identifier: "PublicRouterNetworkInterfaceConfiguration" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Public: __S(1792, __c56, 0) }),
        /*@__PURE__*/ S.Struct({ Vpc: __S(1538, __c48, 2) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          State: S.String,
          NetworkInterfaceType: S.String,
          Configuration: __S(1793, __c56, 1),
          AssociatedOutputCount: S.Number,
          AssociatedInputCount: S.Number,
          RegionName: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Tags: __mapOfString,
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            State: "state",
            NetworkInterfaceType: "networkInterfaceType",
            Configuration: "configuration",
            AssociatedOutputCount: "associatedOutputCount",
            AssociatedInputCount: "associatedInputCount",
            RegionName: "regionName",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "RouterNetworkInterface" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arns: RouterOutputArnList.pipe(T.HttpQuery("arns")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/routerOutputs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetRouterOutputRequest" });
    case 1:
      return S.Array(__S(1872, __c58, 16));
    case 2:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "BatchGetRouterOutputError" });
    case 3:
      return S.Array(__S(1826, __c57, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ RouterOutputs: __S(1825, __c57, 1), Errors: __S(1827, __c57, 3) }).pipe(
          S.encodeKeys({ RouterOutputs: "routerOutputs", Errors: "errors" }),
        ),
      ).annotate({ identifier: "BatchGetRouterOutputResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DestinationAddress: S.String, DestinationPort: S.Number }).pipe(
          S.encodeKeys({
            DestinationAddress: "destinationAddress",
            DestinationPort: "destinationPort",
          }),
        ),
      ).annotate({ identifier: "RistRouterOutputConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Port: S.Number,
          MinimumLatencyMilliseconds: S.Number,
          EncryptionConfiguration: S.optional(__S(1664, __c52, 0)),
        }).pipe(
          S.encodeKeys({
            Port: "port",
            MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
            EncryptionConfiguration: "encryptionConfiguration",
          }),
        ),
      ).annotate({ identifier: "SrtListenerRouterOutputConfiguration" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ Public: __S(928, __c29, 0) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          EncryptionType: S.optional(S.String),
          EncryptionConfiguration: __S(1858, __c58, 2),
        }).pipe(
          S.encodeKeys({
            EncryptionType: "encryptionType",
            EncryptionConfiguration: "encryptionConfiguration",
          }),
        ),
      ).annotate({ identifier: "TlsEncryption" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DestinationAddress: S.String,
          DestinationPort: S.Number,
          ApplicationName: S.String,
          StreamName: S.String,
          TlsEncryption: S.optional(__S(1859, __c58, 3)),
        }).pipe(
          S.encodeKeys({
            DestinationAddress: "destinationAddress",
            DestinationPort: "destinationPort",
            ApplicationName: "applicationName",
            StreamName: "streamName",
            TlsEncryption: "tlsEncryption",
          }),
        ),
      ).annotate({ identifier: "RtmpPushRouterOutputConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DestinationAddress: S.String,
          DestinationPort: S.Number,
          MinimumLatencyMilliseconds: S.Number,
          StreamId: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(1664, __c52, 0)),
        }).pipe(
          S.encodeKeys({
            DestinationAddress: "destinationAddress",
            DestinationPort: "destinationPort",
            MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
            StreamId: "streamId",
            EncryptionConfiguration: "encryptionConfiguration",
          }),
        ),
      ).annotate({ identifier: "SrtCallerRouterOutputConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DestinationAddress: S.String,
          DestinationPort: S.Number,
          ForwardErrorCorrection: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DestinationAddress: "destinationAddress",
            DestinationPort: "destinationPort",
            ForwardErrorCorrection: "forwardErrorCorrection",
          }),
        ),
      ).annotate({ identifier: "RtpRouterOutputConfiguration" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Rist: __S(1856, __c58, 0) }),
        /*@__PURE__*/ S.Struct({ SrtListener: __S(1857, __c58, 1) }),
        /*@__PURE__*/ S.Struct({ RtmpPush: __S(1860, __c58, 4) }),
        /*@__PURE__*/ S.Struct({ SrtCaller: __S(1861, __c58, 5) }),
        /*@__PURE__*/ S.Struct({ Rtp: __S(1862, __c58, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          NetworkInterfaceArn: S.String,
          ProtocolConfiguration: __S(1863, __c58, 7),
          Protocol: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            NetworkInterfaceArn: "networkInterfaceArn",
            ProtocolConfiguration: "protocolConfiguration",
            Protocol: "protocol",
          }),
        ),
      ).annotate({ identifier: "StandardRouterOutputConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          FlowSourceArn: S.optional(S.String),
          DestinationTransitEncryption: __S(962, __c30, 2),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            FlowSourceArn: "flowSourceArn",
            DestinationTransitEncryption: "destinationTransitEncryption",
          }),
        ),
      ).annotate({ identifier: "MediaConnectFlowRouterOutputConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          MediaLiveInputArn: S.optional(S.String),
          MediaLivePipelineId: S.optional(S.String),
          DestinationTransitEncryption: __S(962, __c30, 2),
        }).pipe(
          S.encodeKeys({
            MediaLiveInputArn: "mediaLiveInputArn",
            MediaLivePipelineId: "mediaLivePipelineId",
            DestinationTransitEncryption: "destinationTransitEncryption",
          }),
        ),
      ).annotate({ identifier: "MediaLiveInputRouterOutputConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          EndpointLifecycleManagement: S.String,
          DestinationTransitEncryptionType: S.optional(S.String),
          DestinationTransitEncryption: __S(1506, __c47, 2),
        }).pipe(
          S.encodeKeys({
            EndpointLifecycleManagement: "endpointLifecycleManagement",
            DestinationTransitEncryptionType: "destinationTransitEncryptionType",
            DestinationTransitEncryption: "destinationTransitEncryption",
          }),
        ),
      ).annotate({ identifier: "SourceEndpointRouterOutputConfiguration" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Standard: __S(1864, __c58, 8) }),
        /*@__PURE__*/ S.Struct({ MediaConnectFlow: __S(1865, __c58, 9) }),
        /*@__PURE__*/ S.Struct({ MediaLiveInput: __S(1866, __c58, 10) }),
        /*@__PURE__*/ S.Struct({ SourceEndpoint: __S(1867, __c58, 11) }),
      ]);
    case 13:
      return S.suspend(() =>
        S.Struct({ DestinationIpAddress: S.optional(S.String) }).pipe(
          S.encodeKeys({ DestinationIpAddress: "destinationIpAddress" }),
        ),
      ).annotate({ identifier: "StandardRouterOutputStreamDetails" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Standard: __S(1869, __c58, 13) }),
        /*@__PURE__*/ S.Struct({ MediaConnectFlow: __S(928, __c29, 0) }),
        /*@__PURE__*/ S.Struct({ MediaLiveInput: __S(928, __c29, 0) }),
        /*@__PURE__*/ S.Struct({ SourceEndpoint: __S(928, __c29, 0) }),
      ]);
    case 15:
      return S.suspend(() =>
        S.Struct({ RecoveryLatencyMode: S.String }).pipe(
          S.encodeKeys({ RecoveryLatencyMode: "recoveryLatencyMode" }),
        ),
      ).annotate({ identifier: "FabricConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          State: S.String,
          OutputType: S.String,
          Configuration: __S(1868, __c58, 12),
          RoutedState: S.String,
          RegionName: S.String,
          AvailabilityZone: S.String,
          MaximumBitrate: S.Number,
          RoutingScope: S.String,
          Tier: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Messages: __S(1473, __c46, 1),
          Tags: __mapOfString,
          StreamDetails: __S(1870, __c58, 14),
          IpAddress: S.optional(S.String),
          RoutedInputArn: S.optional(S.String),
          MaintenanceType: S.String,
          MaintenanceConfiguration: __S(1666, __c52, 2),
          MaintenanceScheduleType: S.optional(S.String),
          MaintenanceSchedule: S.optional(__S(1697, __c53, 1)),
          FabricConfiguration: S.optional(__S(1871, __c58, 15)),
          AssociatedSourceEndpointArns: S.optional(SourceEndpointArnList),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            State: "state",
            OutputType: "outputType",
            Configuration: "configuration",
            RoutedState: "routedState",
            RegionName: "regionName",
            AvailabilityZone: "availabilityZone",
            MaximumBitrate: "maximumBitrate",
            RoutingScope: "routingScope",
            Tier: "tier",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            Messages: "messages",
            Tags: "tags",
            StreamDetails: "streamDetails",
            IpAddress: "ipAddress",
            RoutedInputArn: "routedInputArn",
            MaintenanceType: "maintenanceType",
            MaintenanceConfiguration: "maintenanceConfiguration",
            MaintenanceScheduleType: "maintenanceScheduleType",
            MaintenanceSchedule: "maintenanceSchedule",
            FabricConfiguration: "fabricConfiguration",
            AssociatedSourceEndpointArns: "associatedSourceEndpointArns",
          }),
        ),
      ).annotate({ identifier: "RouterOutput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arns: SourceEndpointArnList.pipe(T.HttpQuery("arns")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/sourceEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetSourceEndpointRequest" });
    case 1:
      return S.Array(__S(1934, __c60, 14));
    case 2:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "BatchGetSourceEndpointError" });
    case 3:
      return S.Array(__S(1890, __c59, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ SourceEndpoints: __S(1889, __c59, 1), Errors: __S(1891, __c59, 3) }).pipe(
          S.encodeKeys({ SourceEndpoints: "sourceEndpoints", Errors: "errors" }),
        ),
      ).annotate({ identifier: "BatchGetSourceEndpointResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceAllowRules: __S(1537, __c48, 1) }).pipe(
          S.encodeKeys({ SourceAllowRules: "sourceAllowRules" }),
        ),
      ).annotate({ identifier: "PublicSourceEndpointNetworkingConfiguration" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Public: __S(1920, __c60, 0) }),
        /*@__PURE__*/ S.Struct({ Vpc: __S(1538, __c48, 2) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ DestinationIngestPort: S.Number, RecoveryLatencyMilliseconds: S.Number }).pipe(
          S.encodeKeys({
            DestinationIngestPort: "destinationIngestPort",
            RecoveryLatencyMilliseconds: "recoveryLatencyMilliseconds",
          }),
        ),
      ).annotate({ identifier: "RistStandardSourceEndpointConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SourceListenerPort: S.Number,
          SourceAddress: S.String,
          MinimumLatencyMilliseconds: S.Number,
          StreamId: S.optional(S.String),
          EncryptionPassphrase: S.optional(__S(1504, __c47, 0)),
        }).pipe(
          S.encodeKeys({
            SourceListenerPort: "sourceListenerPort",
            SourceAddress: "sourceAddress",
            MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
            StreamId: "streamId",
            EncryptionPassphrase: "encryptionPassphrase",
          }),
        ),
      ).annotate({ identifier: "SrtListenerStandardSourceEndpointConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DestinationIngestPort: S.Number,
          MinimumLatencyMilliseconds: S.Number,
          EncryptionPassphrase: S.optional(__S(1504, __c47, 0)),
        }).pipe(
          S.encodeKeys({
            DestinationIngestPort: "destinationIngestPort",
            MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
            EncryptionPassphrase: "encryptionPassphrase",
          }),
        ),
      ).annotate({ identifier: "SrtCallerStandardSourceEndpointConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ DestinationIngestPort: S.Number, ForwardErrorCorrectionState: S.String }).pipe(
          S.encodeKeys({
            DestinationIngestPort: "destinationIngestPort",
            ForwardErrorCorrectionState: "forwardErrorCorrectionState",
          }),
        ),
      ).annotate({ identifier: "RtpStandardSourceEndpointConfiguration" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Rist: __S(1922, __c60, 2) }),
        /*@__PURE__*/ S.Struct({ SrtListener: __S(1923, __c60, 3) }),
        /*@__PURE__*/ S.Struct({ SrtCaller: __S(1924, __c60, 4) }),
        /*@__PURE__*/ S.Struct({ Rtp: __S(1925, __c60, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          SourceNetworkingConfiguration: __S(1921, __c60, 1),
          ProtocolConfiguration: __S(1926, __c60, 6),
          SourceNetworkingType: S.optional(S.String),
          Protocol: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            SourceNetworkingConfiguration: "sourceNetworkingConfiguration",
            ProtocolConfiguration: "protocolConfiguration",
            SourceNetworkingType: "sourceNetworkingType",
            Protocol: "protocol",
          }),
        ),
      ).annotate({ identifier: "StandardSourceEndpointConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({ RouterOutputArn: S.String }).pipe(
          S.encodeKeys({ RouterOutputArn: "routerOutputArn" }),
        ),
      ).annotate({ identifier: "RouterOutputSourceEndpointConfiguration" });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Standard: __S(1927, __c60, 7) }),
        /*@__PURE__*/ S.Struct({ RouterOutput: __S(1928, __c60, 8) }),
      ]);
    case 10:
      return S.suspend(() =>
        S.Struct({
          DestinationIpAddress: S.optional(S.String),
          DestinationIngestPort: S.optional(S.Number),
          DestinationDecryptionType: S.optional(S.String),
          DestinationDecryptionConfiguration: S.optional(__S(1506, __c47, 2)),
          DestinationEndpointType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DestinationIpAddress: "destinationIpAddress",
            DestinationIngestPort: "destinationIngestPort",
            DestinationDecryptionType: "destinationDecryptionType",
            DestinationDecryptionConfiguration: "destinationDecryptionConfiguration",
            DestinationEndpointType: "destinationEndpointType",
          }),
        ),
      ).annotate({ identifier: "StandardSourceEndpointConnectionDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          DestinationDecryptionType: S.optional(S.String),
          DestinationDecryptionConfiguration: S.optional(__S(1506, __c47, 2)),
          DestinationEndpointType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DestinationDecryptionType: "destinationDecryptionType",
            DestinationDecryptionConfiguration: "destinationDecryptionConfiguration",
            DestinationEndpointType: "destinationEndpointType",
          }),
        ),
      ).annotate({ identifier: "RouterOutputSourceEndpointConnectionDetails" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Standard: __S(1930, __c60, 10) }),
        /*@__PURE__*/ S.Struct({ RouterOutput: __S(1931, __c60, 11) }),
      ]);
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Standard: __S(928, __c29, 0) }),
        /*@__PURE__*/ S.Struct({ RouterOutput: __S(1571, __c49, 3) }),
      ]);
    case 14:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          Description: S.String,
          RegionName: S.String,
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          LifecycleManagement: S.String,
          Messages: __S(1473, __c46, 1),
          SourceType: S.String,
          Configuration: __S(1929, __c60, 9),
          ResourceShareOwnership: S.String,
          ResourceShareDetails: __S(1570, __c49, 2),
          RegistrationState: S.String,
          ConnectionState: S.String,
          ConnectionDetails: S.optional(__S(1932, __c60, 12)),
          ConnectedDestinations: DestinationEndpointArnList,
          EncryptionType: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(1506, __c47, 2)),
          AssociatedResourceDetails: __S(1933, __c60, 13),
          Tags: __mapOfString,
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            Description: "description",
            RegionName: "regionName",
            AvailabilityZone: "availabilityZone",
            AvailabilityZoneId: "availabilityZoneId",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            LifecycleManagement: "lifecycleManagement",
            Messages: "messages",
            SourceType: "sourceType",
            Configuration: "configuration",
            ResourceShareOwnership: "resourceShareOwnership",
            ResourceShareDetails: "resourceShareDetails",
            RegistrationState: "registrationState",
            ConnectionState: "connectionState",
            ConnectionDetails: "connectionDetails",
            ConnectedDestinations: "connectedDestinations",
            EncryptionType: "encryptionType",
            EncryptionConfiguration: "encryptionConfiguration",
            AssociatedResourceDetails: "associatedResourceDetails",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "SourceEndpoint" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationEndpointArn: S.String.pipe(T.HttpLabel("DestinationEndpointArn")),
          SourceEndpointArn: S.String,
        })
          .pipe(S.encodeKeys({ SourceEndpointArn: "sourceEndpointArn" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/connectEndpoints/{DestinationEndpointArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ConnectEndpointsRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationEndpointArn: S.String,
          DestinationEndpointName: S.String,
          SourceEndpointArn: S.String,
          SourceEndpointName: S.String,
        }).pipe(
          S.encodeKeys({
            DestinationEndpointArn: "destinationEndpointArn",
            DestinationEndpointName: "destinationEndpointName",
            SourceEndpointArn: "sourceEndpointArn",
            SourceEndpointName: "sourceEndpointName",
          }),
        ),
      ).annotate({ identifier: "ConnectEndpointsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EgressGatewayBridge: S.optional(__S(2144, __c67, 0)),
          IngressGatewayBridge: S.optional(__S(2145, __c67, 1)),
          Name: S.optional(S.String),
          Outputs: S.optional(__listOfAddBridgeOutputRequest),
          PlacementArn: S.optional(S.String),
          SourceFailoverConfig: S.optional(__S(2049, __c64, 1)),
          Sources: S.optional(__listOfAddBridgeSourceRequest),
        })
          .pipe(
            S.encodeKeys({
              EgressGatewayBridge: "egressGatewayBridge",
              IngressGatewayBridge: "ingressGatewayBridge",
              Name: "name",
              Outputs: "outputs",
              PlacementArn: "placementArn",
              SourceFailoverConfig: "sourceFailoverConfig",
              Sources: "sources",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/v1/bridges" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateBridgeRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PrimarySource: S.optional(S.String) }).pipe(
          S.encodeKeys({ PrimarySource: "primarySource" }),
        ),
      ).annotate({ identifier: "SourcePriority" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FailoverMode: S.optional(S.String),
          RecoveryWindow: S.optional(S.Number),
          SourcePriority: S.optional(__S(2048, __c64, 0)),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FailoverMode: "failoverMode",
            RecoveryWindow: "recoveryWindow",
            SourcePriority: "sourcePriority",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "FailoverConfig" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Code: S.optional(S.String),
          Message: S.optional(S.String),
          ResourceName: S.optional(S.String),
        }).pipe(S.encodeKeys({ Code: "code", Message: "message", ResourceName: "resourceName" })),
      ).annotate({ identifier: "MessageDetail" });
    case 1:
      return S.Array(__S(2080, __c65, 0));
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceId: S.optional(S.String), MaxBitrate: S.optional(S.Number) }).pipe(
          S.encodeKeys({ InstanceId: "instanceId", MaxBitrate: "maxBitrate" }),
        ),
      ).annotate({ identifier: "EgressGatewayBridge" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          MaxBitrate: S.optional(S.Number),
          MaxOutputs: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            InstanceId: "instanceId",
            MaxBitrate: "maxBitrate",
            MaxOutputs: "maxOutputs",
          }),
        ),
      ).annotate({ identifier: "IngressGatewayBridge" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.optional(S.String),
          BridgeMessages: S.optional(__listOfMessageDetail),
          BridgeState: S.optional(S.String),
          EgressGatewayBridge: S.optional(__S(2112, __c66, 0)),
          IngressGatewayBridge: S.optional(__S(2113, __c66, 1)),
          Name: S.optional(S.String),
          Outputs: S.optional(__listOfBridgeOutput),
          PlacementArn: S.optional(S.String),
          SourceFailoverConfig: S.optional(__S(2049, __c64, 1)),
          Sources: S.optional(__listOfBridgeSource),
        }).pipe(
          S.encodeKeys({
            BridgeArn: "bridgeArn",
            BridgeMessages: "bridgeMessages",
            BridgeState: "bridgeState",
            EgressGatewayBridge: "egressGatewayBridge",
            IngressGatewayBridge: "ingressGatewayBridge",
            Name: "name",
            Outputs: "outputs",
            PlacementArn: "placementArn",
            SourceFailoverConfig: "sourceFailoverConfig",
            Sources: "sources",
          }),
        ),
      ).annotate({ identifier: "Bridge" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Bridge: S.optional(__S(2114, __c66, 2)) }).pipe(
          S.encodeKeys({ Bridge: "bridge" }),
        ),
      ).annotate({ identifier: "CreateBridgeResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxBitrate: S.optional(S.Number) }).pipe(
          S.encodeKeys({ MaxBitrate: "maxBitrate" }),
        ),
      ).annotate({ identifier: "AddEgressGatewayBridgeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MaxBitrate: S.optional(S.Number), MaxOutputs: S.optional(S.Number) }).pipe(
          S.encodeKeys({ MaxBitrate: "maxBitrate", MaxOutputs: "maxOutputs" }),
        ),
      ).annotate({ identifier: "AddIngressGatewayBridgeRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaintenanceDay: S.optional(S.String),
          MaintenanceStartHour: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MaintenanceDay: "maintenanceDay",
            MaintenanceStartHour: "maintenanceStartHour",
          }),
        ),
      ).annotate({ identifier: "AddMaintenance" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          Entitlements: S.optional(__listOfGrantEntitlementRequest),
          MediaStreams: S.optional(__listOfAddMediaStreamRequest),
          Name: S.optional(S.String),
          Outputs: S.optional(__listOfAddOutputRequest),
          Source: S.optional(__S(1216, __c38, 0)),
          SourceFailoverConfig: S.optional(__S(2049, __c64, 1)),
          Sources: S.optional(__listOfSetSourceRequest),
          VpcInterfaces: S.optional(__listOfVpcInterfaceRequest),
          Maintenance: S.optional(__S(2176, __c68, 0)),
          SourceMonitoringConfig: S.optional(__S(2245, __c70, 5)),
          FlowSize: S.optional(S.String),
          NdiConfig: S.optional(__S(2248, __c70, 8)),
          EncodingConfig: S.optional(__S(2249, __c70, 9)),
          FlowTags: S.optional(__mapOfString),
        })
          .pipe(
            S.encodeKeys({
              AvailabilityZone: "availabilityZone",
              Entitlements: "entitlements",
              MediaStreams: "mediaStreams",
              Name: "name",
              Outputs: "outputs",
              Source: "source",
              SourceFailoverConfig: "sourceFailoverConfig",
              Sources: "sources",
              VpcInterfaces: "vpcInterfaces",
              Maintenance: "maintenance",
              SourceMonitoringConfig: "sourceMonitoringConfig",
              FlowSize: "flowSize",
              NdiConfig: "ndiConfig",
              EncodingConfig: "encodingConfig",
              FlowTags: "flowTags",
            }),
          )
          .pipe(T.all(T.Http({ method: "POST", uri: "/v1/flows" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFlowRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Flow: S.optional(__S(2250, __c70, 10)) }).pipe(S.encodeKeys({ Flow: "flow" })),
      ).annotate({ identifier: "CreateFlowResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ State: S.optional(S.String), ThresholdSeconds: S.optional(S.Number) }).pipe(
          S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
        ),
      ).annotate({ identifier: "SilentAudio" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SilentAudio: S.optional(__S(2240, __c70, 0)) }).pipe(
          S.encodeKeys({ SilentAudio: "silentAudio" }),
        ),
      ).annotate({ identifier: "AudioMonitoringSetting" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BlackFrames: S.optional(__S(2240, __c70, 0)),
          FrozenFrames: S.optional(__S(2240, __c70, 0)),
        }).pipe(S.encodeKeys({ BlackFrames: "blackFrames", FrozenFrames: "frozenFrames" })),
      ).annotate({ identifier: "VideoMonitoringSetting" });
    case 4:
      return S.Array(__S(2243, __c70, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ThumbnailState: S.optional(S.String),
          AudioMonitoringSettings: S.optional(__listOfAudioMonitoringSetting),
          ContentQualityAnalysisState: S.optional(S.String),
          VideoMonitoringSettings: S.optional(__listOfVideoMonitoringSetting),
        }).pipe(
          S.encodeKeys({
            ThumbnailState: "thumbnailState",
            AudioMonitoringSettings: "audioMonitoringSettings",
            ContentQualityAnalysisState: "contentQualityAnalysisState",
            VideoMonitoringSettings: "videoMonitoringSettings",
          }),
        ),
      ).annotate({ identifier: "MonitoringConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DiscoveryServerAddress: S.optional(S.String),
          DiscoveryServerPort: S.optional(S.Number),
          VpcInterfaceAdapter: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DiscoveryServerAddress: "discoveryServerAddress",
            DiscoveryServerPort: "discoveryServerPort",
            VpcInterfaceAdapter: "vpcInterfaceAdapter",
          }),
        ),
      ).annotate({ identifier: "NdiDiscoveryServerConfig" });
    case 7:
      return S.Array(__S(2246, __c70, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          NdiState: S.optional(S.String),
          MachineName: S.optional(S.String),
          NdiDiscoveryServers: S.optional(__listOfNdiDiscoveryServerConfig),
        }).pipe(
          S.encodeKeys({
            NdiState: "ndiState",
            MachineName: "machineName",
            NdiDiscoveryServers: "ndiDiscoveryServers",
          }),
        ),
      ).annotate({ identifier: "NdiConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          EncodingProfile: S.optional(S.String),
          VideoMaxBitrate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ EncodingProfile: "encodingProfile", VideoMaxBitrate: "videoMaxBitrate" }),
        ),
      ).annotate({ identifier: "EncodingConfig" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          Description: S.optional(S.String),
          EgressIp: S.optional(S.String),
          Entitlements: S.optional(__listOfEntitlement),
          FlowArn: S.optional(S.String),
          MediaStreams: S.optional(__listOfMediaStream),
          Name: S.optional(S.String),
          Outputs: S.optional(__listOfOutput),
          Source: S.optional(__S(1317, __c41, 5)),
          SourceFailoverConfig: S.optional(__S(2049, __c64, 1)),
          Sources: S.optional(__listOfSource),
          Status: S.optional(S.String),
          VpcInterfaces: S.optional(__listOfVpcInterface),
          Maintenance: S.optional(__S(2336, __c73, 0)),
          SourceMonitoringConfig: S.optional(__S(2245, __c70, 5)),
          FlowSize: S.optional(S.String),
          NdiConfig: S.optional(__S(2248, __c70, 8)),
          EncodingConfig: S.optional(__S(2249, __c70, 9)),
        }).pipe(
          S.encodeKeys({
            AvailabilityZone: "availabilityZone",
            Description: "description",
            EgressIp: "egressIp",
            Entitlements: "entitlements",
            FlowArn: "flowArn",
            MediaStreams: "mediaStreams",
            Name: "name",
            Outputs: "outputs",
            Source: "source",
            SourceFailoverConfig: "sourceFailoverConfig",
            Sources: "sources",
            Status: "status",
            VpcInterfaces: "vpcInterfaces",
            Maintenance: "maintenance",
            SourceMonitoringConfig: "sourceMonitoringConfig",
            FlowSize: "flowSize",
            NdiConfig: "ndiConfig",
            EncodingConfig: "encodingConfig",
          }),
        ),
      ).annotate({ identifier: "Flow" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2304, __c72, 0));
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataTransferSubscriberFeePercent: S.optional(S.Number),
          Description: S.optional(S.String),
          Encryption: S.optional(__S(1024, __c32, 0)),
          EntitlementArn: S.optional(S.String),
          EntitlementStatus: S.optional(S.String),
          Name: S.optional(S.String),
          Subscribers: S.optional(__listOfString),
        }).pipe(
          S.encodeKeys({
            DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
            Description: "description",
            Encryption: "encryption",
            EntitlementArn: "entitlementArn",
            EntitlementStatus: "entitlementStatus",
            Name: "name",
            Subscribers: "subscribers",
          }),
        ),
      ).annotate({ identifier: "Entitlement" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaintenanceDay: S.optional(S.String),
          MaintenanceDeadline: S.optional(S.String),
          MaintenanceScheduledDate: S.optional(S.String),
          MaintenanceStartHour: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MaintenanceDay: "maintenanceDay",
            MaintenanceDeadline: "maintenanceDeadline",
            MaintenanceScheduledDate: "maintenanceScheduledDate",
            MaintenanceStartHour: "maintenanceStartHour",
          }),
        ),
      ).annotate({ identifier: "Maintenance" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataTransferSubscriberFeePercent: S.optional(S.Number),
          Description: S.optional(S.String),
          Encryption: S.optional(__S(1024, __c32, 0)),
          EntitlementStatus: S.optional(S.String),
          Name: S.optional(S.String),
          Subscribers: S.optional(__listOfString),
          EntitlementTags: S.optional(__mapOfString),
        }).pipe(
          S.encodeKeys({
            DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
            Description: "description",
            Encryption: "encryption",
            EntitlementStatus: "entitlementStatus",
            Name: "name",
            Subscribers: "subscribers",
            EntitlementTags: "entitlementTags",
          }),
        ),
      ).annotate({ identifier: "GrantEntitlementRequest" });
    case 1:
      return S.Array(__S(2368, __c74, 0));
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EgressCidrBlocks: S.optional(__listOfString),
          Name: S.optional(S.String),
          Networks: S.optional(__listOfGatewayNetwork),
        })
          .pipe(
            S.encodeKeys({
              EgressCidrBlocks: "egressCidrBlocks",
              Name: "name",
              Networks: "networks",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/v1/gateways" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateGatewayRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CidrBlock: S.optional(S.String), Name: S.optional(S.String) }).pipe(
          S.encodeKeys({ CidrBlock: "cidrBlock", Name: "name" }),
        ),
      ).annotate({ identifier: "GatewayNetwork" });
    case 1:
      return S.Array(__S(2432, __c76, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EgressCidrBlocks: S.optional(__listOfString),
          GatewayArn: S.optional(S.String),
          GatewayMessages: S.optional(__listOfMessageDetail),
          GatewayState: S.optional(S.String),
          Name: S.optional(S.String),
          Networks: S.optional(__listOfGatewayNetwork),
        }).pipe(
          S.encodeKeys({
            EgressCidrBlocks: "egressCidrBlocks",
            GatewayArn: "gatewayArn",
            GatewayMessages: "gatewayMessages",
            GatewayState: "gatewayState",
            Name: "name",
            Networks: "networks",
          }),
        ),
      ).annotate({ identifier: "Gateway" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Gateway: S.optional(__S(2434, __c76, 2)) }).pipe(
          S.encodeKeys({ Gateway: "gateway" }),
        ),
      ).annotate({ identifier: "CreateGatewayResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Configuration: __S(1742, __c54, 14),
          MaximumBitrate: S.Number,
          RoutingScope: S.String,
          Tier: S.String,
          RegionName: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          TransitEncryption: S.optional(__S(962, __c30, 2)),
          MaintenanceConfiguration: S.optional(__S(1666, __c52, 2)),
          Tags: S.optional(__mapOfString),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ContentQualityAnalysisConfiguration: S.optional(__S(1749, __c54, 21)),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Configuration: "configuration",
              MaximumBitrate: "maximumBitrate",
              RoutingScope: "routingScope",
              Tier: "tier",
              RegionName: "regionName",
              AvailabilityZone: "availabilityZone",
              TransitEncryption: "transitEncryption",
              MaintenanceConfiguration: "maintenanceConfiguration",
              Tags: "tags",
              ClientToken: "clientToken",
              ContentQualityAnalysisConfiguration: "contentQualityAnalysisConfiguration",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/v1/routerInput" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateRouterInputRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RouterInput: __S(1750, __c54, 22) }).pipe(
          S.encodeKeys({ RouterInput: "routerInput" }),
        ),
      ).annotate({ identifier: "CreateRouterInputResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Configuration: __S(1793, __c56, 1),
          RegionName: S.optional(S.String),
          Tags: S.optional(__mapOfString),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Configuration: "configuration",
              RegionName: "regionName",
              Tags: "tags",
              ClientToken: "clientToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/routerNetworkInterface" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateRouterNetworkInterfaceRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RouterNetworkInterface: __S(1794, __c56, 2) }).pipe(
          S.encodeKeys({ RouterNetworkInterface: "routerNetworkInterface" }),
        ),
      ).annotate({ identifier: "CreateRouterNetworkInterfaceResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Configuration: __S(1868, __c58, 12),
          MaximumBitrate: S.Number,
          RoutingScope: S.String,
          Tier: S.String,
          RegionName: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          MaintenanceConfiguration: S.optional(__S(1666, __c52, 2)),
          Tags: S.optional(__mapOfString),
          FabricConfiguration: S.optional(__S(1871, __c58, 15)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Configuration: "configuration",
              MaximumBitrate: "maximumBitrate",
              RoutingScope: "routingScope",
              Tier: "tier",
              RegionName: "regionName",
              AvailabilityZone: "availabilityZone",
              MaintenanceConfiguration: "maintenanceConfiguration",
              Tags: "tags",
              FabricConfiguration: "fabricConfiguration",
              ClientToken: "clientToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/routerOutput" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateRouterOutputRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RouterOutput: __S(1872, __c58, 16) }).pipe(
          S.encodeKeys({ RouterOutput: "routerOutput" }),
        ),
      ).annotate({ identifier: "CreateRouterOutputResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/bridges/{BridgeArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBridgeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BridgeArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ BridgeArn: "bridgeArn" }),
        ),
      ).annotate({ identifier: "DeleteBridgeResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/flows/{FlowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFlowRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String), Status: S.optional(S.String) }).pipe(
          S.encodeKeys({ FlowArn: "flowArn", Status: "status" }),
        ),
      ).annotate({ identifier: "DeleteFlowResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String.pipe(T.HttpLabel("GatewayArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/gateways/{GatewayArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ GatewayArn: "gatewayArn" }),
        ),
      ).annotate({ identifier: "DeleteGatewayResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/routerInput/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouterInputRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Name: S.String, State: S.String }).pipe(
          S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
        ),
      ).annotate({ identifier: "DeleteRouterInputResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/routerNetworkInterface/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouterNetworkInterfaceRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/routerOutput/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouterOutputRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/destinationEndpoint/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterDestinationEndpointRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Name: S.String }).pipe(
          S.encodeKeys({ Arn: "arn", Name: "name" }),
        ),
      ).annotate({ identifier: "DeregisterDestinationEndpointResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
          GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/gateway-instances/{GatewayInstanceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterGatewayInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayInstanceArn: S.optional(S.String),
          InstanceState: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            GatewayInstanceArn: "gatewayInstanceArn",
            InstanceState: "instanceState",
          }),
        ),
      ).annotate({ identifier: "DeregisterGatewayInstanceResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/sourceEndpoint/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterSourceEndpointRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/bridges/{BridgeArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeBridgeRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/flows/{FlowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeFlowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Errors: S.optional(__listOfString) }).pipe(S.encodeKeys({ Errors: "errors" })),
      ).annotate({ identifier: "Messages" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Flow: S.optional(__S(2250, __c70, 10)),
          Messages: S.optional(__S(3073, __c96, 1)),
        }).pipe(S.encodeKeys({ Flow: "flow", Messages: "messages" })),
      ).annotate({ identifier: "DescribeFlowResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/flows/{FlowArn}/source-metadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeFlowSourceMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SourceName: S.optional(S.String) }).pipe(
          S.encodeKeys({ SourceName: "sourceName" }),
        ),
      ).annotate({ identifier: "NdiSourceInfo" });
    case 2:
      return S.Array(__S(3105, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StreamType: S.optional(S.String),
          Codec: S.optional(S.String),
          StreamId: S.optional(S.Number),
          ScanMode: S.optional(S.String),
          Color: S.optional(__S(3136, __c98, 0)),
          FrameResolution: S.optional(__S(3137, __c98, 1)),
          FrameRate: S.optional(S.String),
          Channels: S.optional(S.Number),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            StreamType: "streamType",
            Codec: "codec",
            StreamId: "streamId",
            ScanMode: "scanMode",
            Color: "color",
            FrameResolution: "frameResolution",
            FrameRate: "frameRate",
            Channels: "channels",
            SampleRate: "sampleRate",
          }),
        ),
      ).annotate({ identifier: "NdiMediaStreamInfo" });
    case 4:
      return S.Array(__S(3107, __c97, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Streams: S.optional(__listOfNdiMediaStreamInfo) }).pipe(
          S.encodeKeys({ Streams: "streams" }),
        ),
      ).annotate({ identifier: "NdiMediaInfo" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ActiveSource: S.optional(__S(3105, __c97, 1)),
          DiscoveredSources: S.optional(__listOfNdiSourceInfo),
          MediaInfo: S.optional(__S(3109, __c97, 5)),
          Messages: S.optional(__listOfMessageDetail),
        }).pipe(
          S.encodeKeys({
            ActiveSource: "activeSource",
            DiscoveredSources: "discoveredSources",
            MediaInfo: "mediaInfo",
            Messages: "messages",
          }),
        ),
      ).annotate({ identifier: "NdiSourceMetadataInfo" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          Messages: S.optional(__listOfMessageDetail),
          Timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TransportMediaInfo: S.optional(__S(3142, __c98, 6)),
          NdiInfo: S.optional(__S(3110, __c97, 6)),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            Messages: "messages",
            Timestamp: "timestamp",
            TransportMediaInfo: "transportMediaInfo",
            NdiInfo: "ndiInfo",
          }),
        ),
      ).annotate({ identifier: "DescribeFlowSourceMetadataResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Colorimetry: S.optional(S.String),
          TransferCharacteristics: S.optional(S.String),
          MatrixCoefficients: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Colorimetry: "colorimetry",
            TransferCharacteristics: "transferCharacteristics",
            MatrixCoefficients: "matrixCoefficients",
          }),
        ),
      ).annotate({ identifier: "ColorInformation" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FrameHeight: S.optional(S.Number), FrameWidth: S.optional(S.Number) }).pipe(
          S.encodeKeys({ FrameHeight: "frameHeight", FrameWidth: "frameWidth" }),
        ),
      ).annotate({ identifier: "FrameResolution" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(S.Number),
          Codec: S.optional(S.String),
          Color: S.optional(__S(3136, __c98, 0)),
          FrameRate: S.optional(S.String),
          FrameResolution: S.optional(__S(3137, __c98, 1)),
          Pid: S.optional(S.Number),
          SampleRate: S.optional(S.Number),
          SampleSize: S.optional(S.Number),
          StreamType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Channels: "channels",
            Codec: "codec",
            Color: "color",
            FrameRate: "frameRate",
            FrameResolution: "frameResolution",
            Pid: "pid",
            SampleRate: "sampleRate",
            SampleSize: "sampleSize",
            StreamType: "streamType",
          }),
        ),
      ).annotate({ identifier: "TransportStream" });
    case 3:
      return S.Array(__S(3138, __c98, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          PcrPid: S.optional(S.Number),
          ProgramName: S.optional(S.String),
          ProgramNumber: S.optional(S.Number),
          ProgramPid: S.optional(S.Number),
          Streams: S.optional(__listOfTransportStream),
        }).pipe(
          S.encodeKeys({
            PcrPid: "pcrPid",
            ProgramName: "programName",
            ProgramNumber: "programNumber",
            ProgramPid: "programPid",
            Streams: "streams",
          }),
        ),
      ).annotate({ identifier: "TransportStreamProgram" });
    case 5:
      return S.Array(__S(3140, __c98, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Programs: S.optional(__listOfTransportStreamProgram),
          TsId: S.optional(S.Number),
        }).pipe(S.encodeKeys({ Programs: "programs", TsId: "tsId" })),
      ).annotate({ identifier: "TransportMediaInfo" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/flows/{FlowArn}/source-thumbnail" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeFlowSourceThumbnailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          Thumbnail: S.optional(S.String),
          ThumbnailMessages: S.optional(__listOfMessageDetail),
          Timecode: S.optional(S.String),
          Timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            Thumbnail: "thumbnail",
            ThumbnailMessages: "thumbnailMessages",
            Timecode: "timecode",
            Timestamp: "timestamp",
          }),
        ),
      ).annotate({ identifier: "ThumbnailDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ThumbnailDetails: S.optional(__S(3169, __c99, 1)) }).pipe(
          S.encodeKeys({ ThumbnailDetails: "thumbnailDetails" }),
        ),
      ).annotate({ identifier: "DescribeFlowSourceThumbnailResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String.pipe(T.HttpLabel("GatewayArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/gateways/{GatewayArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeGatewayRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/gateway-instances/{GatewayInstanceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeGatewayInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BridgePlacement: S.optional(S.String),
          ConnectionStatus: S.optional(S.String),
          GatewayArn: S.optional(S.String),
          GatewayInstanceArn: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceMessages: S.optional(__listOfMessageDetail),
          InstanceState: S.optional(S.String),
          RunningBridgeCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BridgePlacement: "bridgePlacement",
            ConnectionStatus: "connectionStatus",
            GatewayArn: "gatewayArn",
            GatewayInstanceArn: "gatewayInstanceArn",
            InstanceId: "instanceId",
            InstanceMessages: "instanceMessages",
            InstanceState: "instanceState",
            RunningBridgeCount: "runningBridgeCount",
          }),
        ),
      ).annotate({ identifier: "GatewayInstance" });
    case 2:
      return S.suspend(() =>
        S.Struct({ GatewayInstance: S.optional(__S(3233, __c101, 1)) }).pipe(
          S.encodeKeys({ GatewayInstance: "gatewayInstance" }),
        ),
      ).annotate({ identifier: "DescribeGatewayInstanceResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OfferingArn: S.String.pipe(T.HttpLabel("OfferingArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/offerings/{OfferingArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeOfferingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Offering: S.optional(__S(3328, __c104, 0)) }).pipe(
          S.encodeKeys({ Offering: "offering" }),
        ),
      ).annotate({ identifier: "DescribeOfferingResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedBitrate: S.optional(S.Number),
          ResourceType: S.optional(S.String),
        }).pipe(S.encodeKeys({ ReservedBitrate: "reservedBitrate", ResourceType: "resourceType" })),
      ).annotate({ identifier: "ResourceSpecification" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CurrencyCode: S.optional(S.String),
          Duration: S.optional(S.Number),
          DurationUnits: S.optional(S.String),
          OfferingArn: S.optional(S.String),
          OfferingDescription: S.optional(S.String),
          PricePerUnit: S.optional(S.String),
          PriceUnits: S.optional(S.String),
          ResourceSpecification: S.optional(__S(3296, __c103, 0)),
        }).pipe(
          S.encodeKeys({
            CurrencyCode: "currencyCode",
            Duration: "duration",
            DurationUnits: "durationUnits",
            OfferingArn: "offeringArn",
            OfferingDescription: "offeringDescription",
            PricePerUnit: "pricePerUnit",
            PriceUnits: "priceUnits",
            ResourceSpecification: "resourceSpecification",
          }),
        ),
      ).annotate({ identifier: "Offering" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReservationArn: S.String.pipe(T.HttpLabel("ReservationArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/reservations/{ReservationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReservationRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CurrencyCode: S.optional(S.String),
          Duration: S.optional(S.Number),
          DurationUnits: S.optional(S.String),
          End: S.optional(S.String),
          OfferingArn: S.optional(S.String),
          OfferingDescription: S.optional(S.String),
          PricePerUnit: S.optional(S.String),
          PriceUnits: S.optional(S.String),
          ReservationArn: S.optional(S.String),
          ReservationName: S.optional(S.String),
          ReservationState: S.optional(S.String),
          ResourceSpecification: S.optional(__S(3296, __c103, 0)),
          Start: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CurrencyCode: "currencyCode",
            Duration: "duration",
            DurationUnits: "durationUnits",
            End: "end",
            OfferingArn: "offeringArn",
            OfferingDescription: "offeringDescription",
            PricePerUnit: "pricePerUnit",
            PriceUnits: "priceUnits",
            ReservationArn: "reservationArn",
            ReservationName: "reservationName",
            ReservationState: "reservationState",
            ResourceSpecification: "resourceSpecification",
            Start: "start",
          }),
        ),
      ).annotate({ identifier: "Reservation" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Reservation: S.optional(__S(3392, __c106, 0)) }).pipe(
          S.encodeKeys({ Reservation: "reservation" }),
        ),
      ).annotate({ identifier: "DescribeReservationResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationEndpointArn: S.String.pipe(T.HttpLabel("DestinationEndpointArn")),
          SourceEndpointArn: S.String,
        })
          .pipe(S.encodeKeys({ SourceEndpointArn: "sourceEndpointArn" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/disconnectEndpoints/{DestinationEndpointArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DisconnectEndpointsRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/destinationEndpoint/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDestinationEndpointRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DestinationEndpoint: __S(1614, __c50, 14) }).pipe(
          S.encodeKeys({ DestinationEndpoint: "destinationEndpoint" }),
        ),
      ).annotate({ identifier: "GetDestinationEndpointResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/routerInput/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouterInputRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/routerInput/{Arn}/source-metadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouterInputSourceMetadataRequest" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ TransportStreamMediaInfo: __S(3142, __c98, 6) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          SourceMetadataMessages: __S(1473, __c46, 1),
          Timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          RouterInputMetadata: S.optional(__S(3585, __c112, 1)),
        }).pipe(
          S.encodeKeys({
            SourceMetadataMessages: "sourceMetadataMessages",
            Timestamp: "timestamp",
            RouterInputMetadata: "routerInputMetadata",
          }),
        ),
      ).annotate({ identifier: "RouterInputSourceMetadataDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          SourceMetadataDetails: __S(3586, __c112, 2),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Name: "name",
            SourceMetadataDetails: "sourceMetadataDetails",
          }),
        ),
      ).annotate({ identifier: "GetRouterInputSourceMetadataResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/routerInput/{Arn}/thumbnail" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouterInputThumbnailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ThumbnailMessages: __S(1473, __c46, 1),
          Thumbnail: S.optional(T.Blob),
          Timecode: S.optional(S.String),
          Timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(
          S.encodeKeys({
            ThumbnailMessages: "thumbnailMessages",
            Thumbnail: "thumbnail",
            Timecode: "timecode",
            Timestamp: "timestamp",
          }),
        ),
      ).annotate({ identifier: "RouterInputThumbnailDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Name: S.String, ThumbnailDetails: __S(3617, __c113, 1) }).pipe(
          S.encodeKeys({ Arn: "arn", Name: "name", ThumbnailDetails: "thumbnailDetails" }),
        ),
      ).annotate({ identifier: "GetRouterInputThumbnailResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/routerNetworkInterface/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouterNetworkInterfaceRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/routerOutput/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouterOutputRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/sourceEndpoint/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSourceEndpointRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceEndpoint: __S(1934, __c60, 14) }).pipe(
          S.encodeKeys({ SourceEndpoint: "sourceEndpoint" }),
        ),
      ).annotate({ identifier: "GetSourceEndpointResponse" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Entitlements: S.optional(__listOfGrantEntitlementRequest),
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
        })
          .pipe(S.encodeKeys({ Entitlements: "entitlements" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/entitlements" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GrantFlowEntitlementsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Entitlements: S.optional(__listOfEntitlement),
          FlowArn: S.optional(S.String),
        }).pipe(S.encodeKeys({ Entitlements: "entitlements", FlowArn: "flowArn" })),
      ).annotate({ identifier: "GrantFlowEntitlementsResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FilterArn: S.optional(S.String).pipe(T.HttpQuery("filterArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/bridges" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBridgesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.optional(S.String),
          BridgeState: S.optional(S.String),
          BridgeType: S.optional(S.String),
          Name: S.optional(S.String),
          PlacementArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BridgeArn: "bridgeArn",
            BridgeState: "bridgeState",
            BridgeType: "bridgeType",
            Name: "name",
            PlacementArn: "placementArn",
          }),
        ),
      ).annotate({ identifier: "ListedBridge" });
    case 2:
      return S.Array(__S(3809, __c119, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Bridges: S.optional(__listOfListedBridge),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Bridges: "bridges", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListBridgesResponse" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ RegionNames: StringList }),
        /*@__PURE__*/ S.Struct({ DestinationTypes: __S(3872, __c121, 0) }),
        /*@__PURE__*/ S.Struct({ NameContains: StringList }),
      ]);
    case 1:
      return S.Array(__S(3840, __c120, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Filters: S.optional(__S(3841, __c120, 1)),
        })
          .pipe(S.encodeKeys({ Filters: "filters" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/destinationEndpoints" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListDestinationEndpointsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          DestinationType: S.String,
          RegionName: S.String,
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          LifecycleManagement: S.String,
          MessageCount: S.Number,
          ResourceShareOwnership: S.String,
          ResourceShareState: S.String,
          RegistrationState: S.String,
          ConnectionState: S.String,
          DecryptionType: S.optional(S.String),
          ConnectedSource: S.optional(S.String),
          AssociatedResourceArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            DestinationType: "destinationType",
            RegionName: "regionName",
            AvailabilityZone: "availabilityZone",
            AvailabilityZoneId: "availabilityZoneId",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            LifecycleManagement: "lifecycleManagement",
            MessageCount: "messageCount",
            ResourceShareOwnership: "resourceShareOwnership",
            ResourceShareState: "resourceShareState",
            RegistrationState: "registrationState",
            ConnectionState: "connectionState",
            DecryptionType: "decryptionType",
            ConnectedSource: "connectedSource",
            AssociatedResourceArn: "associatedResourceArn",
          }),
        ),
      ).annotate({ identifier: "ListedDestinationEndpoint" });
    case 4:
      return S.Array(__S(3843, __c120, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          DestinationEndpoints: __S(3844, __c120, 4),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ DestinationEndpoints: "destinationEndpoints", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListDestinationEndpointsResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/entitlements" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEntitlementsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataTransferSubscriberFeePercent: S.optional(S.Number),
          EntitlementArn: S.optional(S.String),
          EntitlementName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
            EntitlementArn: "entitlementArn",
            EntitlementName: "entitlementName",
          }),
        ),
      ).annotate({ identifier: "ListedEntitlement" });
    case 2:
      return S.Array(__S(3905, __c122, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Entitlements: S.optional(__listOfListedEntitlement),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Entitlements: "entitlements", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListEntitlementsResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/flows" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFlowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          Description: S.optional(S.String),
          FlowArn: S.optional(S.String),
          Name: S.optional(S.String),
          SourceType: S.optional(S.String),
          Status: S.optional(S.String),
          Maintenance: S.optional(__S(2336, __c73, 0)),
        }).pipe(
          S.encodeKeys({
            AvailabilityZone: "availabilityZone",
            Description: "description",
            FlowArn: "flowArn",
            Name: "name",
            SourceType: "sourceType",
            Status: "status",
            Maintenance: "maintenance",
          }),
        ),
      ).annotate({ identifier: "ListedFlow" });
    case 2:
      return S.Array(__S(3937, __c123, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Flows: S.optional(__listOfListedFlow), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Flows: "flows", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListFlowsResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FilterArn: S.optional(S.String).pipe(T.HttpQuery("filterArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/gateway-instances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGatewayInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayArn: S.optional(S.String),
          GatewayInstanceArn: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceState: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            GatewayArn: "gatewayArn",
            GatewayInstanceArn: "gatewayInstanceArn",
            InstanceId: "instanceId",
            InstanceState: "instanceState",
          }),
        ),
      ).annotate({ identifier: "ListedGatewayInstance" });
    case 2:
      return S.Array(__S(3969, __c124, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Instances: S.optional(__listOfListedGatewayInstance),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Instances: "instances", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListGatewayInstancesResponse" });
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
          T.all(T.Http({ method: "GET", uri: "/v1/gateways" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGatewaysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayArn: S.optional(S.String),
          GatewayState: S.optional(S.String),
          Name: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ GatewayArn: "gatewayArn", GatewayState: "gatewayState", Name: "name" }),
        ),
      ).annotate({ identifier: "ListedGateway" });
    case 2:
      return S.Array(__S(4001, __c125, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Gateways: S.optional(__listOfListedGateway),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Gateways: "gateways", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListGatewaysResponse" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/offerings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOfferingsRequest" });
    case 1:
      return S.Array(__S(3328, __c104, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Offerings: S.optional(__listOfOffering) }).pipe(
          S.encodeKeys({ NextToken: "nextToken", Offerings: "offerings" }),
        ),
      ).annotate({ identifier: "ListOfferingsResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/reservations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReservationsRequest" });
    case 1:
      return S.Array(__S(3392, __c106, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Reservations: S.optional(__listOfReservation),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Reservations: "reservations" })),
      ).annotate({ identifier: "ListReservationsResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ NameContains: StringList }),
        /*@__PURE__*/ S.Struct({ RegionNames: StringList }),
        /*@__PURE__*/ S.Struct({ NetworkInterfaceArns: RouterNetworkInterfaceArnList }),
        /*@__PURE__*/ S.Struct({ RoutingScopes: __S(3872, __c121, 0) }),
        /*@__PURE__*/ S.Struct({ InputTypes: __S(3872, __c121, 0) }),
      ]);
    case 1:
      return S.Array(__S(4096, __c128, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Filters: S.optional(__S(4097, __c128, 1)),
        })
          .pipe(S.encodeKeys({ Filters: "filters" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/routerInputs" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListRouterInputsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          InputType: S.String,
          State: S.String,
          RoutedOutputs: S.Number,
          RegionName: S.String,
          AvailabilityZone: S.String,
          MaximumBitrate: S.Number,
          RoutingScope: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          MessageCount: S.Number,
          NetworkInterfaceArn: S.optional(S.String),
          MaintenanceScheduleType: S.optional(S.String),
          MaintenanceSchedule: S.optional(__S(1697, __c53, 1)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            InputType: "inputType",
            State: "state",
            RoutedOutputs: "routedOutputs",
            RegionName: "regionName",
            AvailabilityZone: "availabilityZone",
            MaximumBitrate: "maximumBitrate",
            RoutingScope: "routingScope",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            MessageCount: "messageCount",
            NetworkInterfaceArn: "networkInterfaceArn",
            MaintenanceScheduleType: "maintenanceScheduleType",
            MaintenanceSchedule: "maintenanceSchedule",
          }),
        ),
      ).annotate({ identifier: "ListedRouterInput" });
    case 4:
      return S.Array(__S(4099, __c128, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ RouterInputs: __S(4100, __c128, 4), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ RouterInputs: "routerInputs", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListRouterInputsResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ RegionNames: StringList }),
        /*@__PURE__*/ S.Struct({ NetworkInterfaceTypes: __S(3872, __c121, 0) }),
        /*@__PURE__*/ S.Struct({ NameContains: StringList }),
      ]);
    case 1:
      return S.Array(__S(4128, __c129, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Filters: S.optional(__S(4129, __c129, 1)),
        })
          .pipe(S.encodeKeys({ Filters: "filters" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/routerNetworkInterfaces" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListRouterNetworkInterfacesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          NetworkInterfaceType: S.String,
          AssociatedOutputCount: S.Number,
          AssociatedInputCount: S.Number,
          State: S.String,
          RegionName: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            NetworkInterfaceType: "networkInterfaceType",
            AssociatedOutputCount: "associatedOutputCount",
            AssociatedInputCount: "associatedInputCount",
            State: "state",
            RegionName: "regionName",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
          }),
        ),
      ).annotate({ identifier: "ListedRouterNetworkInterface" });
    case 4:
      return S.Array(__S(4131, __c129, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          RouterNetworkInterfaces: __S(4132, __c129, 4),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            RouterNetworkInterfaces: "routerNetworkInterfaces",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListRouterNetworkInterfacesResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ RegionNames: StringList }),
        /*@__PURE__*/ S.Struct({ NetworkInterfaceArns: RouterNetworkInterfaceArnList }),
        /*@__PURE__*/ S.Struct({ RoutingScopes: __S(3872, __c121, 0) }),
        /*@__PURE__*/ S.Struct({ OutputTypes: __S(3872, __c121, 0) }),
        /*@__PURE__*/ S.Struct({ RoutedInputArns: RouterInputArnList }),
        /*@__PURE__*/ S.Struct({ NameContains: StringList }),
      ]);
    case 1:
      return S.Array(__S(4160, __c130, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Filters: S.optional(__S(4161, __c130, 1)),
        })
          .pipe(S.encodeKeys({ Filters: "filters" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/routerOutputs" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListRouterOutputsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          OutputType: S.String,
          State: S.String,
          RoutedState: S.String,
          RegionName: S.String,
          AvailabilityZone: S.String,
          MaximumBitrate: S.Number,
          RoutingScope: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          MessageCount: S.Number,
          RoutedInputArn: S.optional(S.String),
          NetworkInterfaceArn: S.optional(S.String),
          MaintenanceScheduleType: S.optional(S.String),
          MaintenanceSchedule: S.optional(__S(1697, __c53, 1)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            OutputType: "outputType",
            State: "state",
            RoutedState: "routedState",
            RegionName: "regionName",
            AvailabilityZone: "availabilityZone",
            MaximumBitrate: "maximumBitrate",
            RoutingScope: "routingScope",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            MessageCount: "messageCount",
            RoutedInputArn: "routedInputArn",
            NetworkInterfaceArn: "networkInterfaceArn",
            MaintenanceScheduleType: "maintenanceScheduleType",
            MaintenanceSchedule: "maintenanceSchedule",
          }),
        ),
      ).annotate({ identifier: "ListedRouterOutput" });
    case 4:
      return S.Array(__S(4163, __c130, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ RouterOutputs: __S(4164, __c130, 4), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ RouterOutputs: "routerOutputs", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListRouterOutputsResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ RegionNames: StringList }),
        /*@__PURE__*/ S.Struct({ SourceTypes: __S(3872, __c121, 0) }),
        /*@__PURE__*/ S.Struct({ NameContains: StringList }),
      ]);
    case 1:
      return S.Array(__S(4192, __c131, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Filters: S.optional(__S(4193, __c131, 1)),
        })
          .pipe(S.encodeKeys({ Filters: "filters" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/sourceEndpoints" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListSourceEndpointsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          Id: S.String,
          SourceType: S.String,
          RegionName: S.String,
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          LifecycleManagement: S.String,
          MessageCount: S.Number,
          ResourceShareOwnership: S.String,
          ResourceShareState: S.String,
          RegistrationState: S.String,
          ConnectionState: S.String,
          EncryptionType: S.optional(S.String),
          ConnectedDestinationCount: S.Number,
          AssociatedResourceArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Id: "id",
            SourceType: "sourceType",
            RegionName: "regionName",
            AvailabilityZone: "availabilityZone",
            AvailabilityZoneId: "availabilityZoneId",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            LifecycleManagement: "lifecycleManagement",
            MessageCount: "messageCount",
            ResourceShareOwnership: "resourceShareOwnership",
            ResourceShareState: "resourceShareState",
            RegistrationState: "registrationState",
            ConnectionState: "connectionState",
            EncryptionType: "encryptionType",
            ConnectedDestinationCount: "connectedDestinationCount",
            AssociatedResourceArn: "associatedResourceArn",
          }),
        ),
      ).annotate({ identifier: "ListedSourceEndpoint" });
    case 4:
      return S.Array(__S(4195, __c131, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ SourceEndpoints: __S(4196, __c131, 4), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ SourceEndpoints: "sourceEndpoints", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListSourceEndpointsResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/global/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForGlobalResourceRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__mapOfString) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForGlobalResourceResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OfferingArn: S.String.pipe(T.HttpLabel("OfferingArn")),
          ReservationName: S.optional(S.String),
          Start: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ReservationName: "reservationName", Start: "start" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/offerings/{OfferingArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PurchaseOfferingRequest" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Configuration: __S(1609, __c50, 9),
          RegionName: S.optional(S.String),
          Tags: S.optional(__mapOfString),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              Configuration: "configuration",
              RegionName: "regionName",
              Tags: "tags",
              ClientToken: "clientToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/destinationEndpoint" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "RegisterDestinationEndpointRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegionName: S.optional(S.String),
          Description: S.optional(S.String),
          Configuration: __S(1929, __c60, 9),
          Tags: S.optional(__mapOfString),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              RegionName: "regionName",
              Description: "description",
              Configuration: "configuration",
              Tags: "tags",
              ClientToken: "clientToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/sourceEndpoint" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "RegisterSourceEndpointRequest" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
          OutputName: S.String.pipe(T.HttpLabel("OutputName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/bridges/{BridgeArn}/outputs/{OutputName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveBridgeOutputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BridgeArn: S.optional(S.String), OutputName: S.optional(S.String) }).pipe(
          S.encodeKeys({ BridgeArn: "bridgeArn", OutputName: "outputName" }),
        ),
      ).annotate({ identifier: "RemoveBridgeOutputResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
          SourceName: S.String.pipe(T.HttpLabel("SourceName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/bridges/{BridgeArn}/sources/{SourceName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveBridgeSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BridgeArn: S.optional(S.String), SourceName: S.optional(S.String) }).pipe(
          S.encodeKeys({ BridgeArn: "bridgeArn", SourceName: "sourceName" }),
        ),
      ).annotate({ identifier: "RemoveBridgeSourceResponse" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          MediaStreamName: S.String.pipe(T.HttpLabel("MediaStreamName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/flows/{FlowArn}/mediaStreams/{MediaStreamName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveFlowMediaStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String), MediaStreamName: S.optional(S.String) }).pipe(
          S.encodeKeys({ FlowArn: "flowArn", MediaStreamName: "mediaStreamName" }),
        ),
      ).annotate({ identifier: "RemoveFlowMediaStreamResponse" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          OutputArn: S.String.pipe(T.HttpLabel("OutputArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/flows/{FlowArn}/outputs/{OutputArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveFlowOutputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String), OutputArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ FlowArn: "flowArn", OutputArn: "outputArn" }),
        ),
      ).annotate({ identifier: "RemoveFlowOutputResponse" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          SourceArn: S.String.pipe(T.HttpLabel("SourceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/flows/{FlowArn}/source/{SourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveFlowSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String), SourceArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ FlowArn: "flowArn", SourceArn: "sourceArn" }),
        ),
      ).annotate({ identifier: "RemoveFlowSourceResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
          VpcInterfaceName: S.String.pipe(T.HttpLabel("VpcInterfaceName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/flows/{FlowArn}/vpcInterfaces/{VpcInterfaceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveFlowVpcInterfaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          NonDeletedNetworkInterfaceIds: S.optional(__listOfString),
          VpcInterfaceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            NonDeletedNetworkInterfaceIds: "nonDeletedNetworkInterfaceIds",
            VpcInterfaceName: "vpcInterfaceName",
          }),
        ),
      ).annotate({ identifier: "RemoveFlowVpcInterfaceResponse" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/routerInput/restart/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestartRouterInputRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/routerOutput/restart/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestartRouterOutputRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EntitlementArn: S.String.pipe(T.HttpLabel("EntitlementArn")),
          FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/flows/{FlowArn}/entitlements/{EntitlementArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RevokeFlowEntitlementRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EntitlementArn: S.optional(S.String), FlowArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ EntitlementArn: "entitlementArn", FlowArn: "flowArn" }),
        ),
      ).annotate({ identifier: "RevokeFlowEntitlementResponse" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/flows/start/{FlowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartFlowRequest" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/routerInput/start/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartRouterInputRequest" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          State: S.String,
          MaintenanceScheduleType: S.String,
          MaintenanceSchedule: __S(1697, __c53, 1),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Name: "name",
            State: "state",
            MaintenanceScheduleType: "maintenanceScheduleType",
            MaintenanceSchedule: "maintenanceSchedule",
          }),
        ),
      ).annotate({ identifier: "StartRouterInputResponse" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/routerOutput/start/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartRouterOutputRequest" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/flows/stop/{FlowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopFlowRequest" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/routerInput/stop/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopRouterInputRequest" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/routerOutput/stop/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopRouterOutputRequest" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__mapOfString),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/tags/global/{ResourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "TagGlobalResourceRequest" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__mapOfString),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RouterOutputArn: S.String.pipe(T.HttpLabel("RouterOutputArn")),
          RouterInputArn: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ RouterInputArn: "routerInputArn" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/routerOutput/takeRouterInput/{RouterOutputArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "TakeRouterInputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoutedState: S.String,
          RouterOutputArn: S.String,
          RouterOutputName: S.String,
          RouterInputArn: S.optional(S.String),
          RouterInputName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            RoutedState: "routedState",
            RouterOutputArn: "routerOutputArn",
            RouterOutputName: "routerOutputName",
            RouterInputArn: "routerInputArn",
            RouterInputName: "routerInputName",
          }),
        ),
      ).annotate({ identifier: "TakeRouterInputResponse" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOfString).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/global/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagGlobalResourceRequest" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOfString).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
          EgressGatewayBridge: S.optional(__S(2144, __c67, 0)),
          IngressGatewayBridge: S.optional(__S(2145, __c67, 1)),
          SourceFailoverConfig: S.optional(__S(2049, __c64, 1)),
        })
          .pipe(
            S.encodeKeys({
              EgressGatewayBridge: "egressGatewayBridge",
              IngressGatewayBridge: "ingressGatewayBridge",
              SourceFailoverConfig: "sourceFailoverConfig",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/bridges/{BridgeArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBridgeRequest" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IpAddress: S.optional(S.String),
          NetworkName: S.optional(S.String),
          Port: S.optional(S.Number),
          Protocol: S.optional(S.String),
          Ttl: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            IpAddress: "ipAddress",
            NetworkName: "networkName",
            Port: "port",
            Protocol: "protocol",
            Ttl: "ttl",
          }),
        ),
      ).annotate({ identifier: "UpdateBridgeNetworkOutputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
          NetworkOutput: S.optional(__S(5120, __c160, 0)),
          OutputName: S.String.pipe(T.HttpLabel("OutputName")),
        })
          .pipe(S.encodeKeys({ NetworkOutput: "networkOutput" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/bridges/{BridgeArn}/outputs/{OutputName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBridgeOutputRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ BridgeArn: S.optional(S.String), Output: S.optional(__S(514, __c16, 2)) }).pipe(
          S.encodeKeys({ BridgeArn: "bridgeArn", Output: "output" }),
        ),
      ).annotate({ identifier: "UpdateBridgeOutputResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
