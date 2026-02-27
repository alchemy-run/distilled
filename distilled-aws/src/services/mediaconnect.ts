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
  sdkId: "MediaConnect",
  serviceShapeName: "MediaConnect",
});
const auth = T.AwsAuthSigv4({ name: "mediaconnect" });
const ver = T.ServiceVersion("2018-11-14");
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
});

//# Newtypes
export type MaxResults = number;
export type BridgeArn = string;
export type SecretArn = string;
export type RoleArn = string;
export type FlowArn = string;
export type GatewayInstanceArn = string;
export type GatewayArn = string;
export type OfferingArn = string;
export type ReservationArn = string;
export type RouterNetworkInterfaceArn = string;
export type FlowOutputArn = string;
export type RouterInputArn = string;
export type FlowSourceArn = string;
export type MediaLiveInputArn = string;
export type RouterOutputArn = string;

//# Schemas
export interface ListEntitlementsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListEntitlementsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/entitlements" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntitlementsRequest",
}) as any as S.Schema<ListEntitlementsRequest>;
export interface ListedEntitlement {
  DataTransferSubscriberFeePercent?: number;
  EntitlementArn?: string;
  EntitlementName?: string;
}
export const ListedEntitlement = S.suspend(() =>
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
).annotate({
  identifier: "ListedEntitlement",
}) as any as S.Schema<ListedEntitlement>;
export type __listOfListedEntitlement = ListedEntitlement[];
export const __listOfListedEntitlement = S.Array(ListedEntitlement);
export interface ListEntitlementsResponse {
  Entitlements?: (ListedEntitlement & {
    EntitlementArn: string;
    EntitlementName: string;
  })[];
  NextToken?: string;
}
export const ListEntitlementsResponse = S.suspend(() =>
  S.Struct({
    Entitlements: S.optional(__listOfListedEntitlement),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Entitlements: "entitlements", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListEntitlementsResponse",
}) as any as S.Schema<ListEntitlementsResponse>;
export interface ListTagsForGlobalResourceRequest {
  ResourceArn: string;
}
export const ListTagsForGlobalResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForGlobalResourceRequest",
}) as any as S.Schema<ListTagsForGlobalResourceRequest>;
export type __mapOfString = { [key: string]: string | undefined };
export const __mapOfString = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForGlobalResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForGlobalResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(__mapOfString) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForGlobalResourceResponse",
}) as any as S.Schema<ListTagsForGlobalResourceResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(__mapOfString) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagGlobalResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagGlobalResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "TagGlobalResourceRequest",
}) as any as S.Schema<TagGlobalResourceRequest>;
export interface TagGlobalResourceResponse {}
export const TagGlobalResourceResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "TagGlobalResourceResponse" },
) as any as S.Schema<TagGlobalResourceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type __listOfString = string[];
export const __listOfString = S.Array(S.String);
export interface UntagGlobalResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagGlobalResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "UntagGlobalResourceRequest",
}) as any as S.Schema<UntagGlobalResourceRequest>;
export interface UntagGlobalResourceResponse {}
export const UntagGlobalResourceResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagGlobalResourceResponse",
}) as any as S.Schema<UntagGlobalResourceResponse>;
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface AddEgressGatewayBridgeRequest {
  MaxBitrate?: number;
}
export const AddEgressGatewayBridgeRequest = S.suspend(() =>
  S.Struct({ MaxBitrate: S.optional(S.Number) }).pipe(
    S.encodeKeys({ MaxBitrate: "maxBitrate" }),
  ),
).annotate({
  identifier: "AddEgressGatewayBridgeRequest",
}) as any as S.Schema<AddEgressGatewayBridgeRequest>;
export interface AddIngressGatewayBridgeRequest {
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export const AddIngressGatewayBridgeRequest = S.suspend(() =>
  S.Struct({
    MaxBitrate: S.optional(S.Number),
    MaxOutputs: S.optional(S.Number),
  }).pipe(S.encodeKeys({ MaxBitrate: "maxBitrate", MaxOutputs: "maxOutputs" })),
).annotate({
  identifier: "AddIngressGatewayBridgeRequest",
}) as any as S.Schema<AddIngressGatewayBridgeRequest>;
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
export const Protocol = S.String;
export interface AddBridgeNetworkOutputRequest {
  IpAddress?: string;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export const AddBridgeNetworkOutputRequest = S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
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
).annotate({
  identifier: "AddBridgeNetworkOutputRequest",
}) as any as S.Schema<AddBridgeNetworkOutputRequest>;
export interface AddBridgeOutputRequest {
  NetworkOutput?: AddBridgeNetworkOutputRequest;
}
export const AddBridgeOutputRequest = S.suspend(() =>
  S.Struct({ NetworkOutput: S.optional(AddBridgeNetworkOutputRequest) }).pipe(
    S.encodeKeys({ NetworkOutput: "networkOutput" }),
  ),
).annotate({
  identifier: "AddBridgeOutputRequest",
}) as any as S.Schema<AddBridgeOutputRequest>;
export type __listOfAddBridgeOutputRequest = AddBridgeOutputRequest[];
export const __listOfAddBridgeOutputRequest = S.Array(AddBridgeOutputRequest);
export type FailoverMode = "MERGE" | "FAILOVER" | (string & {});
export const FailoverMode = S.String;
export interface SourcePriority {
  PrimarySource?: string;
}
export const SourcePriority = S.suspend(() =>
  S.Struct({ PrimarySource: S.optional(S.String) }).pipe(
    S.encodeKeys({ PrimarySource: "primarySource" }),
  ),
).annotate({ identifier: "SourcePriority" }) as any as S.Schema<SourcePriority>;
export type State = "ENABLED" | "DISABLED" | (string & {});
export const State = S.String;
export interface FailoverConfig {
  FailoverMode?: FailoverMode;
  RecoveryWindow?: number;
  SourcePriority?: SourcePriority;
  State?: State;
}
export const FailoverConfig = S.suspend(() =>
  S.Struct({
    FailoverMode: S.optional(FailoverMode),
    RecoveryWindow: S.optional(S.Number),
    SourcePriority: S.optional(SourcePriority),
    State: S.optional(State),
  }).pipe(
    S.encodeKeys({
      FailoverMode: "failoverMode",
      RecoveryWindow: "recoveryWindow",
      SourcePriority: "sourcePriority",
      State: "state",
    }),
  ),
).annotate({ identifier: "FailoverConfig" }) as any as S.Schema<FailoverConfig>;
export interface VpcInterfaceAttachment {
  VpcInterfaceName?: string;
}
export const VpcInterfaceAttachment = S.suspend(() =>
  S.Struct({ VpcInterfaceName: S.optional(S.String) }).pipe(
    S.encodeKeys({ VpcInterfaceName: "vpcInterfaceName" }),
  ),
).annotate({
  identifier: "VpcInterfaceAttachment",
}) as any as S.Schema<VpcInterfaceAttachment>;
export interface AddBridgeFlowSourceRequest {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
  Name?: string;
}
export const AddBridgeFlowSourceRequest = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowVpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowVpcInterfaceAttachment: "flowVpcInterfaceAttachment",
      Name: "name",
    }),
  ),
).annotate({
  identifier: "AddBridgeFlowSourceRequest",
}) as any as S.Schema<AddBridgeFlowSourceRequest>;
export interface MulticastSourceSettings {
  MulticastSourceIp?: string;
}
export const MulticastSourceSettings = S.suspend(() =>
  S.Struct({ MulticastSourceIp: S.optional(S.String) }).pipe(
    S.encodeKeys({ MulticastSourceIp: "multicastSourceIp" }),
  ),
).annotate({
  identifier: "MulticastSourceSettings",
}) as any as S.Schema<MulticastSourceSettings>;
export interface AddBridgeNetworkSourceRequest {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export const AddBridgeNetworkSourceRequest = S.suspend(() =>
  S.Struct({
    MulticastIp: S.optional(S.String),
    MulticastSourceSettings: S.optional(MulticastSourceSettings),
    Name: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
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
).annotate({
  identifier: "AddBridgeNetworkSourceRequest",
}) as any as S.Schema<AddBridgeNetworkSourceRequest>;
export interface AddBridgeSourceRequest {
  FlowSource?: AddBridgeFlowSourceRequest;
  NetworkSource?: AddBridgeNetworkSourceRequest;
}
export const AddBridgeSourceRequest = S.suspend(() =>
  S.Struct({
    FlowSource: S.optional(AddBridgeFlowSourceRequest),
    NetworkSource: S.optional(AddBridgeNetworkSourceRequest),
  }).pipe(
    S.encodeKeys({ FlowSource: "flowSource", NetworkSource: "networkSource" }),
  ),
).annotate({
  identifier: "AddBridgeSourceRequest",
}) as any as S.Schema<AddBridgeSourceRequest>;
export type __listOfAddBridgeSourceRequest = AddBridgeSourceRequest[];
export const __listOfAddBridgeSourceRequest = S.Array(AddBridgeSourceRequest);
export interface CreateBridgeRequest {
  EgressGatewayBridge?: AddEgressGatewayBridgeRequest;
  IngressGatewayBridge?: AddIngressGatewayBridgeRequest;
  Name?: string;
  Outputs?: AddBridgeOutputRequest[];
  PlacementArn?: string;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: AddBridgeSourceRequest[];
}
export const CreateBridgeRequest = S.suspend(() =>
  S.Struct({
    EgressGatewayBridge: S.optional(AddEgressGatewayBridgeRequest),
    IngressGatewayBridge: S.optional(AddIngressGatewayBridgeRequest),
    Name: S.optional(S.String),
    Outputs: S.optional(__listOfAddBridgeOutputRequest),
    PlacementArn: S.optional(S.String),
    SourceFailoverConfig: S.optional(FailoverConfig),
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
      T.all(
        T.Http({ method: "POST", uri: "/v1/bridges" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateBridgeRequest",
}) as any as S.Schema<CreateBridgeRequest>;
export interface MessageDetail {
  Code?: string;
  Message?: string;
  ResourceName?: string;
}
export const MessageDetail = S.suspend(() =>
  S.Struct({
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    ResourceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Code: "code",
      Message: "message",
      ResourceName: "resourceName",
    }),
  ),
).annotate({ identifier: "MessageDetail" }) as any as S.Schema<MessageDetail>;
export type __listOfMessageDetail = MessageDetail[];
export const __listOfMessageDetail = S.Array(MessageDetail);
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
export const BridgeState = S.String;
export interface EgressGatewayBridge {
  InstanceId?: string;
  MaxBitrate?: number;
}
export const EgressGatewayBridge = S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    MaxBitrate: S.optional(S.Number),
  }).pipe(S.encodeKeys({ InstanceId: "instanceId", MaxBitrate: "maxBitrate" })),
).annotate({
  identifier: "EgressGatewayBridge",
}) as any as S.Schema<EgressGatewayBridge>;
export interface IngressGatewayBridge {
  InstanceId?: string;
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export const IngressGatewayBridge = S.suspend(() =>
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
).annotate({
  identifier: "IngressGatewayBridge",
}) as any as S.Schema<IngressGatewayBridge>;
export interface BridgeFlowOutput {
  FlowArn?: string;
  FlowSourceArn?: string;
  Name?: string;
}
export const BridgeFlowOutput = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowSourceArn: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowSourceArn: "flowSourceArn",
      Name: "name",
    }),
  ),
).annotate({
  identifier: "BridgeFlowOutput",
}) as any as S.Schema<BridgeFlowOutput>;
export interface BridgeNetworkOutput {
  IpAddress?: string;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export const BridgeNetworkOutput = S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
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
).annotate({
  identifier: "BridgeNetworkOutput",
}) as any as S.Schema<BridgeNetworkOutput>;
export interface BridgeOutput {
  FlowOutput?: BridgeFlowOutput;
  NetworkOutput?: BridgeNetworkOutput;
}
export const BridgeOutput = S.suspend(() =>
  S.Struct({
    FlowOutput: S.optional(BridgeFlowOutput),
    NetworkOutput: S.optional(BridgeNetworkOutput),
  }).pipe(
    S.encodeKeys({ FlowOutput: "flowOutput", NetworkOutput: "networkOutput" }),
  ),
).annotate({ identifier: "BridgeOutput" }) as any as S.Schema<BridgeOutput>;
export type __listOfBridgeOutput = BridgeOutput[];
export const __listOfBridgeOutput = S.Array(BridgeOutput);
export interface BridgeFlowSource {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
  Name?: string;
  OutputArn?: string;
}
export const BridgeFlowSource = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowVpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
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
).annotate({
  identifier: "BridgeFlowSource",
}) as any as S.Schema<BridgeFlowSource>;
export interface BridgeNetworkSource {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export const BridgeNetworkSource = S.suspend(() =>
  S.Struct({
    MulticastIp: S.optional(S.String),
    MulticastSourceSettings: S.optional(MulticastSourceSettings),
    Name: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
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
).annotate({
  identifier: "BridgeNetworkSource",
}) as any as S.Schema<BridgeNetworkSource>;
export interface BridgeSource {
  FlowSource?: BridgeFlowSource;
  NetworkSource?: BridgeNetworkSource;
}
export const BridgeSource = S.suspend(() =>
  S.Struct({
    FlowSource: S.optional(BridgeFlowSource),
    NetworkSource: S.optional(BridgeNetworkSource),
  }).pipe(
    S.encodeKeys({ FlowSource: "flowSource", NetworkSource: "networkSource" }),
  ),
).annotate({ identifier: "BridgeSource" }) as any as S.Schema<BridgeSource>;
export type __listOfBridgeSource = BridgeSource[];
export const __listOfBridgeSource = S.Array(BridgeSource);
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
export const Bridge = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    BridgeMessages: S.optional(__listOfMessageDetail),
    BridgeState: S.optional(BridgeState),
    EgressGatewayBridge: S.optional(EgressGatewayBridge),
    IngressGatewayBridge: S.optional(IngressGatewayBridge),
    Name: S.optional(S.String),
    Outputs: S.optional(__listOfBridgeOutput),
    PlacementArn: S.optional(S.String),
    SourceFailoverConfig: S.optional(FailoverConfig),
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
).annotate({ identifier: "Bridge" }) as any as S.Schema<Bridge>;
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
export const CreateBridgeResponse = S.suspend(() =>
  S.Struct({ Bridge: S.optional(Bridge) }).pipe(
    S.encodeKeys({ Bridge: "bridge" }),
  ),
).annotate({
  identifier: "CreateBridgeResponse",
}) as any as S.Schema<CreateBridgeResponse>;
export interface DescribeBridgeRequest {
  BridgeArn: string;
}
export const DescribeBridgeRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeBridgeRequest",
}) as any as S.Schema<DescribeBridgeRequest>;
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
export const DescribeBridgeResponse = S.suspend(() =>
  S.Struct({ Bridge: S.optional(Bridge) }).pipe(
    S.encodeKeys({ Bridge: "bridge" }),
  ),
).annotate({
  identifier: "DescribeBridgeResponse",
}) as any as S.Schema<DescribeBridgeResponse>;
export interface UpdateEgressGatewayBridgeRequest {
  MaxBitrate?: number;
}
export const UpdateEgressGatewayBridgeRequest = S.suspend(() =>
  S.Struct({ MaxBitrate: S.optional(S.Number) }).pipe(
    S.encodeKeys({ MaxBitrate: "maxBitrate" }),
  ),
).annotate({
  identifier: "UpdateEgressGatewayBridgeRequest",
}) as any as S.Schema<UpdateEgressGatewayBridgeRequest>;
export interface UpdateIngressGatewayBridgeRequest {
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export const UpdateIngressGatewayBridgeRequest = S.suspend(() =>
  S.Struct({
    MaxBitrate: S.optional(S.Number),
    MaxOutputs: S.optional(S.Number),
  }).pipe(S.encodeKeys({ MaxBitrate: "maxBitrate", MaxOutputs: "maxOutputs" })),
).annotate({
  identifier: "UpdateIngressGatewayBridgeRequest",
}) as any as S.Schema<UpdateIngressGatewayBridgeRequest>;
export interface UpdateFailoverConfig {
  FailoverMode?: FailoverMode;
  RecoveryWindow?: number;
  SourcePriority?: SourcePriority;
  State?: State;
}
export const UpdateFailoverConfig = S.suspend(() =>
  S.Struct({
    FailoverMode: S.optional(FailoverMode),
    RecoveryWindow: S.optional(S.Number),
    SourcePriority: S.optional(SourcePriority),
    State: S.optional(State),
  }).pipe(
    S.encodeKeys({
      FailoverMode: "failoverMode",
      RecoveryWindow: "recoveryWindow",
      SourcePriority: "sourcePriority",
      State: "state",
    }),
  ),
).annotate({
  identifier: "UpdateFailoverConfig",
}) as any as S.Schema<UpdateFailoverConfig>;
export interface UpdateBridgeRequest {
  BridgeArn: string;
  EgressGatewayBridge?: UpdateEgressGatewayBridgeRequest;
  IngressGatewayBridge?: UpdateIngressGatewayBridgeRequest;
  SourceFailoverConfig?: UpdateFailoverConfig;
}
export const UpdateBridgeRequest = S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    EgressGatewayBridge: S.optional(UpdateEgressGatewayBridgeRequest),
    IngressGatewayBridge: S.optional(UpdateIngressGatewayBridgeRequest),
    SourceFailoverConfig: S.optional(UpdateFailoverConfig),
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
).annotate({
  identifier: "UpdateBridgeRequest",
}) as any as S.Schema<UpdateBridgeRequest>;
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
export const UpdateBridgeResponse = S.suspend(() =>
  S.Struct({ Bridge: S.optional(Bridge) }).pipe(
    S.encodeKeys({ Bridge: "bridge" }),
  ),
).annotate({
  identifier: "UpdateBridgeResponse",
}) as any as S.Schema<UpdateBridgeResponse>;
export interface DeleteBridgeRequest {
  BridgeArn: string;
}
export const DeleteBridgeRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteBridgeRequest",
}) as any as S.Schema<DeleteBridgeRequest>;
export interface DeleteBridgeResponse {
  BridgeArn?: string;
}
export const DeleteBridgeResponse = S.suspend(() =>
  S.Struct({ BridgeArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ BridgeArn: "bridgeArn" }),
  ),
).annotate({
  identifier: "DeleteBridgeResponse",
}) as any as S.Schema<DeleteBridgeResponse>;
export interface ListBridgesRequest {
  FilterArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListBridgesRequest = S.suspend(() =>
  S.Struct({
    FilterArn: S.optional(S.String).pipe(T.HttpQuery("filterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/bridges" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBridgesRequest",
}) as any as S.Schema<ListBridgesRequest>;
export interface ListedBridge {
  BridgeArn?: string;
  BridgeState?: BridgeState;
  BridgeType?: string;
  Name?: string;
  PlacementArn?: string;
}
export const ListedBridge = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    BridgeState: S.optional(BridgeState),
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
).annotate({ identifier: "ListedBridge" }) as any as S.Schema<ListedBridge>;
export type __listOfListedBridge = ListedBridge[];
export const __listOfListedBridge = S.Array(ListedBridge);
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
export const ListBridgesResponse = S.suspend(() =>
  S.Struct({
    Bridges: S.optional(__listOfListedBridge),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Bridges: "bridges", NextToken: "nextToken" })),
).annotate({
  identifier: "ListBridgesResponse",
}) as any as S.Schema<ListBridgesResponse>;
export interface AddBridgeOutputsRequest {
  BridgeArn: string;
  Outputs?: AddBridgeOutputRequest[];
}
export const AddBridgeOutputsRequest = S.suspend(() =>
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
).annotate({
  identifier: "AddBridgeOutputsRequest",
}) as any as S.Schema<AddBridgeOutputsRequest>;
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
export const AddBridgeOutputsResponse = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    Outputs: S.optional(__listOfBridgeOutput),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Outputs: "outputs" })),
).annotate({
  identifier: "AddBridgeOutputsResponse",
}) as any as S.Schema<AddBridgeOutputsResponse>;
export interface AddBridgeSourcesRequest {
  BridgeArn: string;
  Sources?: AddBridgeSourceRequest[];
}
export const AddBridgeSourcesRequest = S.suspend(() =>
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
).annotate({
  identifier: "AddBridgeSourcesRequest",
}) as any as S.Schema<AddBridgeSourcesRequest>;
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
export const AddBridgeSourcesResponse = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    Sources: S.optional(__listOfBridgeSource),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Sources: "sources" })),
).annotate({
  identifier: "AddBridgeSourcesResponse",
}) as any as S.Schema<AddBridgeSourcesResponse>;
export interface RemoveBridgeOutputRequest {
  BridgeArn: string;
  OutputName: string;
}
export const RemoveBridgeOutputRequest = S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    OutputName: S.String.pipe(T.HttpLabel("OutputName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/bridges/{BridgeArn}/outputs/{OutputName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveBridgeOutputRequest",
}) as any as S.Schema<RemoveBridgeOutputRequest>;
export interface RemoveBridgeOutputResponse {
  BridgeArn?: string;
  OutputName?: string;
}
export const RemoveBridgeOutputResponse = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    OutputName: S.optional(S.String),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", OutputName: "outputName" })),
).annotate({
  identifier: "RemoveBridgeOutputResponse",
}) as any as S.Schema<RemoveBridgeOutputResponse>;
export interface RemoveBridgeSourceRequest {
  BridgeArn: string;
  SourceName: string;
}
export const RemoveBridgeSourceRequest = S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    SourceName: S.String.pipe(T.HttpLabel("SourceName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/bridges/{BridgeArn}/sources/{SourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveBridgeSourceRequest",
}) as any as S.Schema<RemoveBridgeSourceRequest>;
export interface RemoveBridgeSourceResponse {
  BridgeArn?: string;
  SourceName?: string;
}
export const RemoveBridgeSourceResponse = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    SourceName: S.optional(S.String),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", SourceName: "sourceName" })),
).annotate({
  identifier: "RemoveBridgeSourceResponse",
}) as any as S.Schema<RemoveBridgeSourceResponse>;
export interface UpdateBridgeNetworkOutputRequest {
  IpAddress?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export const UpdateBridgeNetworkOutputRequest = S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
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
).annotate({
  identifier: "UpdateBridgeNetworkOutputRequest",
}) as any as S.Schema<UpdateBridgeNetworkOutputRequest>;
export interface UpdateBridgeOutputRequest {
  BridgeArn: string;
  NetworkOutput?: UpdateBridgeNetworkOutputRequest;
  OutputName: string;
}
export const UpdateBridgeOutputRequest = S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    NetworkOutput: S.optional(UpdateBridgeNetworkOutputRequest),
    OutputName: S.String.pipe(T.HttpLabel("OutputName")),
  })
    .pipe(S.encodeKeys({ NetworkOutput: "networkOutput" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/bridges/{BridgeArn}/outputs/{OutputName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBridgeOutputRequest",
}) as any as S.Schema<UpdateBridgeOutputRequest>;
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
export const UpdateBridgeOutputResponse = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    Output: S.optional(BridgeOutput),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Output: "output" })),
).annotate({
  identifier: "UpdateBridgeOutputResponse",
}) as any as S.Schema<UpdateBridgeOutputResponse>;
export interface UpdateBridgeFlowSourceRequest {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export const UpdateBridgeFlowSourceRequest = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowVpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowVpcInterfaceAttachment: "flowVpcInterfaceAttachment",
    }),
  ),
).annotate({
  identifier: "UpdateBridgeFlowSourceRequest",
}) as any as S.Schema<UpdateBridgeFlowSourceRequest>;
export interface UpdateBridgeNetworkSourceRequest {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export const UpdateBridgeNetworkSourceRequest = S.suspend(() =>
  S.Struct({
    MulticastIp: S.optional(S.String),
    MulticastSourceSettings: S.optional(MulticastSourceSettings),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
  }).pipe(
    S.encodeKeys({
      MulticastIp: "multicastIp",
      MulticastSourceSettings: "multicastSourceSettings",
      NetworkName: "networkName",
      Port: "port",
      Protocol: "protocol",
    }),
  ),
).annotate({
  identifier: "UpdateBridgeNetworkSourceRequest",
}) as any as S.Schema<UpdateBridgeNetworkSourceRequest>;
export interface UpdateBridgeSourceRequest {
  BridgeArn: string;
  FlowSource?: UpdateBridgeFlowSourceRequest;
  NetworkSource?: UpdateBridgeNetworkSourceRequest;
  SourceName: string;
}
export const UpdateBridgeSourceRequest = S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    FlowSource: S.optional(UpdateBridgeFlowSourceRequest),
    NetworkSource: S.optional(UpdateBridgeNetworkSourceRequest),
    SourceName: S.String.pipe(T.HttpLabel("SourceName")),
  })
    .pipe(
      S.encodeKeys({
        FlowSource: "flowSource",
        NetworkSource: "networkSource",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/bridges/{BridgeArn}/sources/{SourceName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBridgeSourceRequest",
}) as any as S.Schema<UpdateBridgeSourceRequest>;
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
export const UpdateBridgeSourceResponse = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    Source: S.optional(BridgeSource),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Source: "source" })),
).annotate({
  identifier: "UpdateBridgeSourceResponse",
}) as any as S.Schema<UpdateBridgeSourceResponse>;
export type DesiredState = "ACTIVE" | "STANDBY" | "DELETED" | (string & {});
export const DesiredState = S.String;
export interface UpdateBridgeStateRequest {
  BridgeArn: string;
  DesiredState?: DesiredState;
}
export const UpdateBridgeStateRequest = S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    DesiredState: S.optional(DesiredState),
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
).annotate({
  identifier: "UpdateBridgeStateRequest",
}) as any as S.Schema<UpdateBridgeStateRequest>;
export interface UpdateBridgeStateResponse {
  BridgeArn?: string;
  DesiredState?: DesiredState;
}
export const UpdateBridgeStateResponse = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    DesiredState: S.optional(DesiredState),
  }).pipe(
    S.encodeKeys({ BridgeArn: "bridgeArn", DesiredState: "desiredState" }),
  ),
).annotate({
  identifier: "UpdateBridgeStateResponse",
}) as any as S.Schema<UpdateBridgeStateResponse>;
export type Algorithm = "aes128" | "aes192" | "aes256" | (string & {});
export const Algorithm = S.String;
export type KeyType = "speke" | "static-key" | "srt-password" | (string & {});
export const KeyType = S.String;
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
export const Encryption = S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(Algorithm),
    ConstantInitializationVector: S.optional(S.String),
    DeviceId: S.optional(S.String),
    KeyType: S.optional(KeyType),
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
).annotate({ identifier: "Encryption" }) as any as S.Schema<Encryption>;
export type EntitlementStatus = "ENABLED" | "DISABLED" | (string & {});
export const EntitlementStatus = S.String;
export interface GrantEntitlementRequest {
  DataTransferSubscriberFeePercent?: number;
  Description?: string;
  Encryption?: Encryption;
  EntitlementStatus?: EntitlementStatus;
  Name?: string;
  Subscribers?: string[];
  EntitlementTags?: { [key: string]: string | undefined };
}
export const GrantEntitlementRequest = S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    Description: S.optional(S.String),
    Encryption: S.optional(Encryption),
    EntitlementStatus: S.optional(EntitlementStatus),
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
).annotate({
  identifier: "GrantEntitlementRequest",
}) as any as S.Schema<GrantEntitlementRequest>;
export type __listOfGrantEntitlementRequest = GrantEntitlementRequest[];
export const __listOfGrantEntitlementRequest = S.Array(GrantEntitlementRequest);
export type Colorimetry =
  | "BT601"
  | "BT709"
  | "BT2020"
  | "BT2100"
  | "ST2065-1"
  | "ST2065-3"
  | "XYZ"
  | (string & {});
export const Colorimetry = S.String;
export type Range = "NARROW" | "FULL" | "FULLPROTECT" | (string & {});
export const Range = S.String;
export type ScanMode =
  | "progressive"
  | "interlace"
  | "progressive-segmented-frame"
  | (string & {});
export const ScanMode = S.String;
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
export const Tcs = S.String;
export interface FmtpRequest {
  ChannelOrder?: string;
  Colorimetry?: Colorimetry;
  ExactFramerate?: string;
  Par?: string;
  Range?: Range;
  ScanMode?: ScanMode;
  Tcs?: Tcs;
}
export const FmtpRequest = S.suspend(() =>
  S.Struct({
    ChannelOrder: S.optional(S.String),
    Colorimetry: S.optional(Colorimetry),
    ExactFramerate: S.optional(S.String),
    Par: S.optional(S.String),
    Range: S.optional(Range),
    ScanMode: S.optional(ScanMode),
    Tcs: S.optional(Tcs),
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
).annotate({ identifier: "FmtpRequest" }) as any as S.Schema<FmtpRequest>;
export interface MediaStreamAttributesRequest {
  Fmtp?: FmtpRequest;
  Lang?: string;
}
export const MediaStreamAttributesRequest = S.suspend(() =>
  S.Struct({ Fmtp: S.optional(FmtpRequest), Lang: S.optional(S.String) }).pipe(
    S.encodeKeys({ Fmtp: "fmtp", Lang: "lang" }),
  ),
).annotate({
  identifier: "MediaStreamAttributesRequest",
}) as any as S.Schema<MediaStreamAttributesRequest>;
export type MediaStreamType =
  | "video"
  | "audio"
  | "ancillary-data"
  | (string & {});
export const MediaStreamType = S.String;
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
export const AddMediaStreamRequest = S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MediaStreamAttributesRequest),
    ClockRate: S.optional(S.Number),
    Description: S.optional(S.String),
    MediaStreamId: S.optional(S.Number),
    MediaStreamName: S.optional(S.String),
    MediaStreamType: S.optional(MediaStreamType),
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
).annotate({
  identifier: "AddMediaStreamRequest",
}) as any as S.Schema<AddMediaStreamRequest>;
export type __listOfAddMediaStreamRequest = AddMediaStreamRequest[];
export const __listOfAddMediaStreamRequest = S.Array(AddMediaStreamRequest);
export interface InterfaceRequest {
  Name?: string;
}
export const InterfaceRequest = S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
).annotate({
  identifier: "InterfaceRequest",
}) as any as S.Schema<InterfaceRequest>;
export interface DestinationConfigurationRequest {
  DestinationIp?: string;
  DestinationPort?: number;
  Interface?: InterfaceRequest;
}
export const DestinationConfigurationRequest = S.suspend(() =>
  S.Struct({
    DestinationIp: S.optional(S.String),
    DestinationPort: S.optional(S.Number),
    Interface: S.optional(InterfaceRequest),
  }).pipe(
    S.encodeKeys({
      DestinationIp: "destinationIp",
      DestinationPort: "destinationPort",
      Interface: "interface",
    }),
  ),
).annotate({
  identifier: "DestinationConfigurationRequest",
}) as any as S.Schema<DestinationConfigurationRequest>;
export type __listOfDestinationConfigurationRequest =
  DestinationConfigurationRequest[];
export const __listOfDestinationConfigurationRequest = S.Array(
  DestinationConfigurationRequest,
);
export type EncodingName = "jxsv" | "raw" | "smpte291" | "pcm" | (string & {});
export const EncodingName = S.String;
export type EncoderProfile = "main" | "high" | (string & {});
export const EncoderProfile = S.String;
export interface EncodingParametersRequest {
  CompressionFactor?: number;
  EncoderProfile?: EncoderProfile;
}
export const EncodingParametersRequest = S.suspend(() =>
  S.Struct({
    CompressionFactor: S.optional(S.Number),
    EncoderProfile: S.optional(EncoderProfile),
  }).pipe(
    S.encodeKeys({
      CompressionFactor: "compressionFactor",
      EncoderProfile: "encoderProfile",
    }),
  ),
).annotate({
  identifier: "EncodingParametersRequest",
}) as any as S.Schema<EncodingParametersRequest>;
export interface MediaStreamOutputConfigurationRequest {
  DestinationConfigurations?: DestinationConfigurationRequest[];
  EncodingName?: EncodingName;
  EncodingParameters?: EncodingParametersRequest;
  MediaStreamName?: string;
}
export const MediaStreamOutputConfigurationRequest = S.suspend(() =>
  S.Struct({
    DestinationConfigurations: S.optional(
      __listOfDestinationConfigurationRequest,
    ),
    EncodingName: S.optional(EncodingName),
    EncodingParameters: S.optional(EncodingParametersRequest),
    MediaStreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DestinationConfigurations: "destinationConfigurations",
      EncodingName: "encodingName",
      EncodingParameters: "encodingParameters",
      MediaStreamName: "mediaStreamName",
    }),
  ),
).annotate({
  identifier: "MediaStreamOutputConfigurationRequest",
}) as any as S.Schema<MediaStreamOutputConfigurationRequest>;
export type __listOfMediaStreamOutputConfigurationRequest =
  MediaStreamOutputConfigurationRequest[];
export const __listOfMediaStreamOutputConfigurationRequest = S.Array(
  MediaStreamOutputConfigurationRequest,
);
export type OutputStatus = "ENABLED" | "DISABLED" | (string & {});
export const OutputStatus = S.String;
export type FlowTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export const FlowTransitEncryptionKeyType = S.String;
export interface SecretsManagerEncryptionKeyConfiguration {
  SecretArn: string;
  RoleArn: string;
}
export const SecretsManagerEncryptionKeyConfiguration = S.suspend(() =>
  S.Struct({ SecretArn: S.String, RoleArn: S.String }).pipe(
    S.encodeKeys({ SecretArn: "secretArn", RoleArn: "roleArn" }),
  ),
).annotate({
  identifier: "SecretsManagerEncryptionKeyConfiguration",
}) as any as S.Schema<SecretsManagerEncryptionKeyConfiguration>;
export interface AutomaticEncryptionKeyConfiguration {}
export const AutomaticEncryptionKeyConfiguration = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AutomaticEncryptionKeyConfiguration",
}) as any as S.Schema<AutomaticEncryptionKeyConfiguration>;
export type FlowTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export const FlowTransitEncryptionKeyConfiguration = S.Union([
  S.Struct({ SecretsManager: SecretsManagerEncryptionKeyConfiguration }),
  S.Struct({ Automatic: AutomaticEncryptionKeyConfiguration }),
]);
export interface FlowTransitEncryption {
  EncryptionKeyType?: FlowTransitEncryptionKeyType;
  EncryptionKeyConfiguration: FlowTransitEncryptionKeyConfiguration;
}
export const FlowTransitEncryption = S.suspend(() =>
  S.Struct({
    EncryptionKeyType: S.optional(FlowTransitEncryptionKeyType),
    EncryptionKeyConfiguration: FlowTransitEncryptionKeyConfiguration,
  }).pipe(
    S.encodeKeys({
      EncryptionKeyType: "encryptionKeyType",
      EncryptionKeyConfiguration: "encryptionKeyConfiguration",
    }),
  ),
).annotate({
  identifier: "FlowTransitEncryption",
}) as any as S.Schema<FlowTransitEncryption>;
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
}
export const AddOutputRequest = S.suspend(() =>
  S.Struct({
    CidrAllowList: S.optional(__listOfString),
    Description: S.optional(S.String),
    Destination: S.optional(S.String),
    Encryption: S.optional(Encryption),
    MaxLatency: S.optional(S.Number),
    MediaStreamOutputConfigurations: S.optional(
      __listOfMediaStreamOutputConfigurationRequest,
    ),
    MinLatency: S.optional(S.Number),
    Name: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    RemoteId: S.optional(S.String),
    SenderControlPort: S.optional(S.Number),
    SmoothingLatency: S.optional(S.Number),
    StreamId: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    OutputStatus: S.optional(OutputStatus),
    NdiSpeedHqQuality: S.optional(S.Number),
    NdiProgramName: S.optional(S.String),
    OutputTags: S.optional(__mapOfString),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitEncryption: S.optional(FlowTransitEncryption),
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
    }),
  ),
).annotate({
  identifier: "AddOutputRequest",
}) as any as S.Schema<AddOutputRequest>;
export type __listOfAddOutputRequest = AddOutputRequest[];
export const __listOfAddOutputRequest = S.Array(AddOutputRequest);
export interface InputConfigurationRequest {
  InputPort?: number;
  Interface?: InterfaceRequest;
}
export const InputConfigurationRequest = S.suspend(() =>
  S.Struct({
    InputPort: S.optional(S.Number),
    Interface: S.optional(InterfaceRequest),
  }).pipe(S.encodeKeys({ InputPort: "inputPort", Interface: "interface" })),
).annotate({
  identifier: "InputConfigurationRequest",
}) as any as S.Schema<InputConfigurationRequest>;
export type __listOfInputConfigurationRequest = InputConfigurationRequest[];
export const __listOfInputConfigurationRequest = S.Array(
  InputConfigurationRequest,
);
export interface MediaStreamSourceConfigurationRequest {
  EncodingName?: EncodingName;
  InputConfigurations?: InputConfigurationRequest[];
  MediaStreamName?: string;
}
export const MediaStreamSourceConfigurationRequest = S.suspend(() =>
  S.Struct({
    EncodingName: S.optional(EncodingName),
    InputConfigurations: S.optional(__listOfInputConfigurationRequest),
    MediaStreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EncodingName: "encodingName",
      InputConfigurations: "inputConfigurations",
      MediaStreamName: "mediaStreamName",
    }),
  ),
).annotate({
  identifier: "MediaStreamSourceConfigurationRequest",
}) as any as S.Schema<MediaStreamSourceConfigurationRequest>;
export type __listOfMediaStreamSourceConfigurationRequest =
  MediaStreamSourceConfigurationRequest[];
export const __listOfMediaStreamSourceConfigurationRequest = S.Array(
  MediaStreamSourceConfigurationRequest,
);
export interface SetGatewayBridgeSourceRequest {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export const SetGatewayBridgeSourceRequest = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
  }).pipe(
    S.encodeKeys({
      BridgeArn: "bridgeArn",
      VpcInterfaceAttachment: "vpcInterfaceAttachment",
    }),
  ),
).annotate({
  identifier: "SetGatewayBridgeSourceRequest",
}) as any as S.Schema<SetGatewayBridgeSourceRequest>;
export interface NdiSourceSettings {
  SourceName?: string;
}
export const NdiSourceSettings = S.suspend(() =>
  S.Struct({ SourceName: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceName: "sourceName" }),
  ),
).annotate({
  identifier: "NdiSourceSettings",
}) as any as S.Schema<NdiSourceSettings>;
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
export const SetSourceRequest = S.suspend(() =>
  S.Struct({
    Decryption: S.optional(Encryption),
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
    Protocol: S.optional(Protocol),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SourceListenerAddress: S.optional(S.String),
    SourceListenerPort: S.optional(S.Number),
    StreamId: S.optional(S.String),
    VpcInterfaceName: S.optional(S.String),
    WhitelistCidr: S.optional(S.String),
    GatewayBridgeSource: S.optional(SetGatewayBridgeSourceRequest),
    NdiSourceSettings: S.optional(NdiSourceSettings),
    SourceTags: S.optional(__mapOfString),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitDecryption: S.optional(FlowTransitEncryption),
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
).annotate({
  identifier: "SetSourceRequest",
}) as any as S.Schema<SetSourceRequest>;
export type __listOfSetSourceRequest = SetSourceRequest[];
export const __listOfSetSourceRequest = S.Array(SetSourceRequest);
export type NetworkInterfaceType = "ena" | "efa" | (string & {});
export const NetworkInterfaceType = S.String;
export interface VpcInterfaceRequest {
  Name?: string;
  NetworkInterfaceType?: NetworkInterfaceType;
  RoleArn?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  VpcInterfaceTags?: { [key: string]: string | undefined };
}
export const VpcInterfaceRequest = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    NetworkInterfaceType: S.optional(NetworkInterfaceType),
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
).annotate({
  identifier: "VpcInterfaceRequest",
}) as any as S.Schema<VpcInterfaceRequest>;
export type __listOfVpcInterfaceRequest = VpcInterfaceRequest[];
export const __listOfVpcInterfaceRequest = S.Array(VpcInterfaceRequest);
export type MaintenanceDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
  | (string & {});
export const MaintenanceDay = S.String;
export interface AddMaintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceStartHour?: string;
}
export const AddMaintenance = S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
    MaintenanceStartHour: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MaintenanceDay: "maintenanceDay",
      MaintenanceStartHour: "maintenanceStartHour",
    }),
  ),
).annotate({ identifier: "AddMaintenance" }) as any as S.Schema<AddMaintenance>;
export type ThumbnailState = "ENABLED" | "DISABLED" | (string & {});
export const ThumbnailState = S.String;
export interface SilentAudio {
  State?: State;
  ThresholdSeconds?: number;
}
export const SilentAudio = S.suspend(() =>
  S.Struct({
    State: S.optional(State),
    ThresholdSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({ identifier: "SilentAudio" }) as any as S.Schema<SilentAudio>;
export interface AudioMonitoringSetting {
  SilentAudio?: SilentAudio;
}
export const AudioMonitoringSetting = S.suspend(() =>
  S.Struct({ SilentAudio: S.optional(SilentAudio) }).pipe(
    S.encodeKeys({ SilentAudio: "silentAudio" }),
  ),
).annotate({
  identifier: "AudioMonitoringSetting",
}) as any as S.Schema<AudioMonitoringSetting>;
export type __listOfAudioMonitoringSetting = AudioMonitoringSetting[];
export const __listOfAudioMonitoringSetting = S.Array(AudioMonitoringSetting);
export type ContentQualityAnalysisState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const ContentQualityAnalysisState = S.String;
export interface BlackFrames {
  State?: State;
  ThresholdSeconds?: number;
}
export const BlackFrames = S.suspend(() =>
  S.Struct({
    State: S.optional(State),
    ThresholdSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({ identifier: "BlackFrames" }) as any as S.Schema<BlackFrames>;
export interface FrozenFrames {
  State?: State;
  ThresholdSeconds?: number;
}
export const FrozenFrames = S.suspend(() =>
  S.Struct({
    State: S.optional(State),
    ThresholdSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({ identifier: "FrozenFrames" }) as any as S.Schema<FrozenFrames>;
export interface VideoMonitoringSetting {
  BlackFrames?: BlackFrames;
  FrozenFrames?: FrozenFrames;
}
export const VideoMonitoringSetting = S.suspend(() =>
  S.Struct({
    BlackFrames: S.optional(BlackFrames),
    FrozenFrames: S.optional(FrozenFrames),
  }).pipe(
    S.encodeKeys({ BlackFrames: "blackFrames", FrozenFrames: "frozenFrames" }),
  ),
).annotate({
  identifier: "VideoMonitoringSetting",
}) as any as S.Schema<VideoMonitoringSetting>;
export type __listOfVideoMonitoringSetting = VideoMonitoringSetting[];
export const __listOfVideoMonitoringSetting = S.Array(VideoMonitoringSetting);
export interface MonitoringConfig {
  ThumbnailState?: ThumbnailState;
  AudioMonitoringSettings?: AudioMonitoringSetting[];
  ContentQualityAnalysisState?: ContentQualityAnalysisState;
  VideoMonitoringSettings?: VideoMonitoringSetting[];
}
export const MonitoringConfig = S.suspend(() =>
  S.Struct({
    ThumbnailState: S.optional(ThumbnailState),
    AudioMonitoringSettings: S.optional(__listOfAudioMonitoringSetting),
    ContentQualityAnalysisState: S.optional(ContentQualityAnalysisState),
    VideoMonitoringSettings: S.optional(__listOfVideoMonitoringSetting),
  }).pipe(
    S.encodeKeys({
      ThumbnailState: "thumbnailState",
      AudioMonitoringSettings: "audioMonitoringSettings",
      ContentQualityAnalysisState: "contentQualityAnalysisState",
      VideoMonitoringSettings: "videoMonitoringSettings",
    }),
  ),
).annotate({
  identifier: "MonitoringConfig",
}) as any as S.Schema<MonitoringConfig>;
export type FlowSize = "MEDIUM" | "LARGE" | "LARGE_4X" | (string & {});
export const FlowSize = S.String;
export type NdiState = "ENABLED" | "DISABLED" | (string & {});
export const NdiState = S.String;
export interface NdiDiscoveryServerConfig {
  DiscoveryServerAddress?: string;
  DiscoveryServerPort?: number;
  VpcInterfaceAdapter?: string;
}
export const NdiDiscoveryServerConfig = S.suspend(() =>
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
).annotate({
  identifier: "NdiDiscoveryServerConfig",
}) as any as S.Schema<NdiDiscoveryServerConfig>;
export type __listOfNdiDiscoveryServerConfig = NdiDiscoveryServerConfig[];
export const __listOfNdiDiscoveryServerConfig = S.Array(
  NdiDiscoveryServerConfig,
);
export interface NdiConfig {
  NdiState?: NdiState;
  MachineName?: string;
  NdiDiscoveryServers?: NdiDiscoveryServerConfig[];
}
export const NdiConfig = S.suspend(() =>
  S.Struct({
    NdiState: S.optional(NdiState),
    MachineName: S.optional(S.String),
    NdiDiscoveryServers: S.optional(__listOfNdiDiscoveryServerConfig),
  }).pipe(
    S.encodeKeys({
      NdiState: "ndiState",
      MachineName: "machineName",
      NdiDiscoveryServers: "ndiDiscoveryServers",
    }),
  ),
).annotate({ identifier: "NdiConfig" }) as any as S.Schema<NdiConfig>;
export type EncodingProfile =
  | "DISTRIBUTION_H264_DEFAULT"
  | "CONTRIBUTION_H264_DEFAULT"
  | (string & {});
export const EncodingProfile = S.String;
export interface EncodingConfig {
  EncodingProfile?: EncodingProfile;
  VideoMaxBitrate?: number;
}
export const EncodingConfig = S.suspend(() =>
  S.Struct({
    EncodingProfile: S.optional(EncodingProfile),
    VideoMaxBitrate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      EncodingProfile: "encodingProfile",
      VideoMaxBitrate: "videoMaxBitrate",
    }),
  ),
).annotate({ identifier: "EncodingConfig" }) as any as S.Schema<EncodingConfig>;
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
export const CreateFlowRequest = S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    Entitlements: S.optional(__listOfGrantEntitlementRequest),
    MediaStreams: S.optional(__listOfAddMediaStreamRequest),
    Name: S.optional(S.String),
    Outputs: S.optional(__listOfAddOutputRequest),
    Source: S.optional(SetSourceRequest),
    SourceFailoverConfig: S.optional(FailoverConfig),
    Sources: S.optional(__listOfSetSourceRequest),
    VpcInterfaces: S.optional(__listOfVpcInterfaceRequest),
    Maintenance: S.optional(AddMaintenance),
    SourceMonitoringConfig: S.optional(MonitoringConfig),
    FlowSize: S.optional(FlowSize),
    NdiConfig: S.optional(NdiConfig),
    EncodingConfig: S.optional(EncodingConfig),
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
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/flows" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateFlowRequest",
}) as any as S.Schema<CreateFlowRequest>;
export interface Entitlement {
  DataTransferSubscriberFeePercent?: number;
  Description?: string;
  Encryption?: Encryption;
  EntitlementArn?: string;
  EntitlementStatus?: EntitlementStatus;
  Name?: string;
  Subscribers?: string[];
}
export const Entitlement = S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    Description: S.optional(S.String),
    Encryption: S.optional(Encryption),
    EntitlementArn: S.optional(S.String),
    EntitlementStatus: S.optional(EntitlementStatus),
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
).annotate({ identifier: "Entitlement" }) as any as S.Schema<Entitlement>;
export type __listOfEntitlement = Entitlement[];
export const __listOfEntitlement = S.Array(Entitlement);
export interface Fmtp {
  ChannelOrder?: string;
  Colorimetry?: Colorimetry;
  ExactFramerate?: string;
  Par?: string;
  Range?: Range;
  ScanMode?: ScanMode;
  Tcs?: Tcs;
}
export const Fmtp = S.suspend(() =>
  S.Struct({
    ChannelOrder: S.optional(S.String),
    Colorimetry: S.optional(Colorimetry),
    ExactFramerate: S.optional(S.String),
    Par: S.optional(S.String),
    Range: S.optional(Range),
    ScanMode: S.optional(ScanMode),
    Tcs: S.optional(Tcs),
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
).annotate({ identifier: "Fmtp" }) as any as S.Schema<Fmtp>;
export interface MediaStreamAttributes {
  Fmtp?: Fmtp;
  Lang?: string;
}
export const MediaStreamAttributes = S.suspend(() =>
  S.Struct({ Fmtp: S.optional(Fmtp), Lang: S.optional(S.String) }).pipe(
    S.encodeKeys({ Fmtp: "fmtp", Lang: "lang" }),
  ),
).annotate({
  identifier: "MediaStreamAttributes",
}) as any as S.Schema<MediaStreamAttributes>;
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
export const MediaStream = S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MediaStreamAttributes),
    ClockRate: S.optional(S.Number),
    Description: S.optional(S.String),
    Fmt: S.optional(S.Number),
    MediaStreamId: S.optional(S.Number),
    MediaStreamName: S.optional(S.String),
    MediaStreamType: S.optional(MediaStreamType),
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
).annotate({ identifier: "MediaStream" }) as any as S.Schema<MediaStream>;
export type __listOfMediaStream = MediaStream[];
export const __listOfMediaStream = S.Array(MediaStream);
export interface Interface {
  Name?: string;
}
export const Interface = S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
).annotate({ identifier: "Interface" }) as any as S.Schema<Interface>;
export interface DestinationConfiguration {
  DestinationIp?: string;
  DestinationPort?: number;
  Interface?: Interface;
  OutboundIp?: string;
}
export const DestinationConfiguration = S.suspend(() =>
  S.Struct({
    DestinationIp: S.optional(S.String),
    DestinationPort: S.optional(S.Number),
    Interface: S.optional(Interface),
    OutboundIp: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DestinationIp: "destinationIp",
      DestinationPort: "destinationPort",
      Interface: "interface",
      OutboundIp: "outboundIp",
    }),
  ),
).annotate({
  identifier: "DestinationConfiguration",
}) as any as S.Schema<DestinationConfiguration>;
export type __listOfDestinationConfiguration = DestinationConfiguration[];
export const __listOfDestinationConfiguration = S.Array(
  DestinationConfiguration,
);
export interface EncodingParameters {
  CompressionFactor?: number;
  EncoderProfile?: EncoderProfile;
}
export const EncodingParameters = S.suspend(() =>
  S.Struct({
    CompressionFactor: S.optional(S.Number),
    EncoderProfile: S.optional(EncoderProfile),
  }).pipe(
    S.encodeKeys({
      CompressionFactor: "compressionFactor",
      EncoderProfile: "encoderProfile",
    }),
  ),
).annotate({
  identifier: "EncodingParameters",
}) as any as S.Schema<EncodingParameters>;
export interface MediaStreamOutputConfiguration {
  DestinationConfigurations?: DestinationConfiguration[];
  EncodingName?: EncodingName;
  EncodingParameters?: EncodingParameters;
  MediaStreamName?: string;
}
export const MediaStreamOutputConfiguration = S.suspend(() =>
  S.Struct({
    DestinationConfigurations: S.optional(__listOfDestinationConfiguration),
    EncodingName: S.optional(EncodingName),
    EncodingParameters: S.optional(EncodingParameters),
    MediaStreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DestinationConfigurations: "destinationConfigurations",
      EncodingName: "encodingName",
      EncodingParameters: "encodingParameters",
      MediaStreamName: "mediaStreamName",
    }),
  ),
).annotate({
  identifier: "MediaStreamOutputConfiguration",
}) as any as S.Schema<MediaStreamOutputConfiguration>;
export type __listOfMediaStreamOutputConfiguration =
  MediaStreamOutputConfiguration[];
export const __listOfMediaStreamOutputConfiguration = S.Array(
  MediaStreamOutputConfiguration,
);
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
}
export const Transport = S.suspend(() =>
  S.Struct({
    CidrAllowList: S.optional(__listOfString),
    MaxBitrate: S.optional(S.Number),
    MaxLatency: S.optional(S.Number),
    MaxSyncBuffer: S.optional(S.Number),
    MinLatency: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    RemoteId: S.optional(S.String),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SmoothingLatency: S.optional(S.Number),
    SourceListenerAddress: S.optional(S.String),
    SourceListenerPort: S.optional(S.Number),
    StreamId: S.optional(S.String),
    NdiSpeedHqQuality: S.optional(S.Number),
    NdiProgramName: S.optional(S.String),
    NdiSourceSettings: S.optional(NdiSourceSettings),
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
    }),
  ),
).annotate({ identifier: "Transport" }) as any as S.Schema<Transport>;
export type __listOfInteger = number[];
export const __listOfInteger = S.Array(S.Number);
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
export const Output = S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    Description: S.optional(S.String),
    Destination: S.optional(S.String),
    Encryption: S.optional(Encryption),
    EntitlementArn: S.optional(S.String),
    ListenerAddress: S.optional(S.String),
    MediaLiveInputArn: S.optional(S.String),
    MediaStreamOutputConfigurations: S.optional(
      __listOfMediaStreamOutputConfiguration,
    ),
    Name: S.optional(S.String),
    OutputArn: S.optional(S.String),
    Port: S.optional(S.Number),
    Transport: S.optional(Transport),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    BridgeArn: S.optional(S.String),
    BridgePorts: S.optional(__listOfInteger),
    OutputStatus: S.optional(OutputStatus),
    PeerIpAddress: S.optional(S.String),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitEncryption: S.optional(FlowTransitEncryption),
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
).annotate({ identifier: "Output" }) as any as S.Schema<Output>;
export type __listOfOutput = Output[];
export const __listOfOutput = S.Array(Output);
export interface InputConfiguration {
  InputIp?: string;
  InputPort?: number;
  Interface?: Interface;
}
export const InputConfiguration = S.suspend(() =>
  S.Struct({
    InputIp: S.optional(S.String),
    InputPort: S.optional(S.Number),
    Interface: S.optional(Interface),
  }).pipe(
    S.encodeKeys({
      InputIp: "inputIp",
      InputPort: "inputPort",
      Interface: "interface",
    }),
  ),
).annotate({
  identifier: "InputConfiguration",
}) as any as S.Schema<InputConfiguration>;
export type __listOfInputConfiguration = InputConfiguration[];
export const __listOfInputConfiguration = S.Array(InputConfiguration);
export interface MediaStreamSourceConfiguration {
  EncodingName?: EncodingName;
  InputConfigurations?: InputConfiguration[];
  MediaStreamName?: string;
}
export const MediaStreamSourceConfiguration = S.suspend(() =>
  S.Struct({
    EncodingName: S.optional(EncodingName),
    InputConfigurations: S.optional(__listOfInputConfiguration),
    MediaStreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EncodingName: "encodingName",
      InputConfigurations: "inputConfigurations",
      MediaStreamName: "mediaStreamName",
    }),
  ),
).annotate({
  identifier: "MediaStreamSourceConfiguration",
}) as any as S.Schema<MediaStreamSourceConfiguration>;
export type __listOfMediaStreamSourceConfiguration =
  MediaStreamSourceConfiguration[];
export const __listOfMediaStreamSourceConfiguration = S.Array(
  MediaStreamSourceConfiguration,
);
export interface GatewayBridgeSource {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export const GatewayBridgeSource = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
  }).pipe(
    S.encodeKeys({
      BridgeArn: "bridgeArn",
      VpcInterfaceAttachment: "vpcInterfaceAttachment",
    }),
  ),
).annotate({
  identifier: "GatewayBridgeSource",
}) as any as S.Schema<GatewayBridgeSource>;
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
export const Source = S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    Decryption: S.optional(Encryption),
    Description: S.optional(S.String),
    EntitlementArn: S.optional(S.String),
    IngestIp: S.optional(S.String),
    IngestPort: S.optional(S.Number),
    MediaStreamSourceConfigurations: S.optional(
      __listOfMediaStreamSourceConfiguration,
    ),
    Name: S.optional(S.String),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SourceArn: S.optional(S.String),
    Transport: S.optional(Transport),
    VpcInterfaceName: S.optional(S.String),
    WhitelistCidr: S.optional(S.String),
    GatewayBridgeSource: S.optional(GatewayBridgeSource),
    PeerIpAddress: S.optional(S.String),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitDecryption: S.optional(FlowTransitEncryption),
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
).annotate({ identifier: "Source" }) as any as S.Schema<Source>;
export type __listOfSource = Source[];
export const __listOfSource = S.Array(Source);
export type Status =
  | "STANDBY"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "STARTING"
  | "STOPPING"
  | "ERROR"
  | (string & {});
export const Status = S.String;
export interface VpcInterface {
  Name?: string;
  NetworkInterfaceIds?: string[];
  NetworkInterfaceType?: NetworkInterfaceType;
  RoleArn?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
}
export const VpcInterface = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    NetworkInterfaceIds: S.optional(__listOfString),
    NetworkInterfaceType: S.optional(NetworkInterfaceType),
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
).annotate({ identifier: "VpcInterface" }) as any as S.Schema<VpcInterface>;
export type __listOfVpcInterface = VpcInterface[];
export const __listOfVpcInterface = S.Array(VpcInterface);
export interface Maintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceDeadline?: string;
  MaintenanceScheduledDate?: string;
  MaintenanceStartHour?: string;
}
export const Maintenance = S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
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
).annotate({ identifier: "Maintenance" }) as any as S.Schema<Maintenance>;
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
export const Flow = S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    Description: S.optional(S.String),
    EgressIp: S.optional(S.String),
    Entitlements: S.optional(__listOfEntitlement),
    FlowArn: S.optional(S.String),
    MediaStreams: S.optional(__listOfMediaStream),
    Name: S.optional(S.String),
    Outputs: S.optional(__listOfOutput),
    Source: S.optional(Source),
    SourceFailoverConfig: S.optional(FailoverConfig),
    Sources: S.optional(__listOfSource),
    Status: S.optional(Status),
    VpcInterfaces: S.optional(__listOfVpcInterface),
    Maintenance: S.optional(Maintenance),
    SourceMonitoringConfig: S.optional(MonitoringConfig),
    FlowSize: S.optional(FlowSize),
    NdiConfig: S.optional(NdiConfig),
    EncodingConfig: S.optional(EncodingConfig),
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
).annotate({ identifier: "Flow" }) as any as S.Schema<Flow>;
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
export const CreateFlowResponse = S.suspend(() =>
  S.Struct({ Flow: S.optional(Flow) }).pipe(S.encodeKeys({ Flow: "flow" })),
).annotate({
  identifier: "CreateFlowResponse",
}) as any as S.Schema<CreateFlowResponse>;
export interface DescribeFlowRequest {
  FlowArn: string;
}
export const DescribeFlowRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeFlowRequest",
}) as any as S.Schema<DescribeFlowRequest>;
export interface Messages {
  Errors?: string[];
}
export const Messages = S.suspend(() =>
  S.Struct({ Errors: S.optional(__listOfString) }).pipe(
    S.encodeKeys({ Errors: "errors" }),
  ),
).annotate({ identifier: "Messages" }) as any as S.Schema<Messages>;
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
export const DescribeFlowResponse = S.suspend(() =>
  S.Struct({ Flow: S.optional(Flow), Messages: S.optional(Messages) }).pipe(
    S.encodeKeys({ Flow: "flow", Messages: "messages" }),
  ),
).annotate({
  identifier: "DescribeFlowResponse",
}) as any as S.Schema<DescribeFlowResponse>;
export interface UpdateMaintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceScheduledDate?: string;
  MaintenanceStartHour?: string;
}
export const UpdateMaintenance = S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
    MaintenanceScheduledDate: S.optional(S.String),
    MaintenanceStartHour: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MaintenanceDay: "maintenanceDay",
      MaintenanceScheduledDate: "maintenanceScheduledDate",
      MaintenanceStartHour: "maintenanceStartHour",
    }),
  ),
).annotate({
  identifier: "UpdateMaintenance",
}) as any as S.Schema<UpdateMaintenance>;
export interface UpdateFlowRequest {
  FlowArn: string;
  SourceFailoverConfig?: UpdateFailoverConfig;
  Maintenance?: UpdateMaintenance;
  SourceMonitoringConfig?: MonitoringConfig;
  NdiConfig?: NdiConfig;
  FlowSize?: FlowSize;
  EncodingConfig?: EncodingConfig;
}
export const UpdateFlowRequest = S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    SourceFailoverConfig: S.optional(UpdateFailoverConfig),
    Maintenance: S.optional(UpdateMaintenance),
    SourceMonitoringConfig: S.optional(MonitoringConfig),
    NdiConfig: S.optional(NdiConfig),
    FlowSize: S.optional(FlowSize),
    EncodingConfig: S.optional(EncodingConfig),
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
).annotate({
  identifier: "UpdateFlowRequest",
}) as any as S.Schema<UpdateFlowRequest>;
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
export const UpdateFlowResponse = S.suspend(() =>
  S.Struct({ Flow: S.optional(Flow) }).pipe(S.encodeKeys({ Flow: "flow" })),
).annotate({
  identifier: "UpdateFlowResponse",
}) as any as S.Schema<UpdateFlowResponse>;
export interface DeleteFlowRequest {
  FlowArn: string;
}
export const DeleteFlowRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteFlowRequest",
}) as any as S.Schema<DeleteFlowRequest>;
export interface DeleteFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export const DeleteFlowResponse = S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Status: S.optional(Status) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Status: "status" }),
  ),
).annotate({
  identifier: "DeleteFlowResponse",
}) as any as S.Schema<DeleteFlowResponse>;
export interface ListFlowsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListFlowsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/flows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFlowsRequest",
}) as any as S.Schema<ListFlowsRequest>;
export type SourceType = "OWNED" | "ENTITLED" | (string & {});
export const SourceType = S.String;
export interface ListedFlow {
  AvailabilityZone?: string;
  Description?: string;
  FlowArn?: string;
  Name?: string;
  SourceType?: SourceType;
  Status?: Status;
  Maintenance?: Maintenance;
}
export const ListedFlow = S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    Description: S.optional(S.String),
    FlowArn: S.optional(S.String),
    Name: S.optional(S.String),
    SourceType: S.optional(SourceType),
    Status: S.optional(Status),
    Maintenance: S.optional(Maintenance),
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
).annotate({ identifier: "ListedFlow" }) as any as S.Schema<ListedFlow>;
export type __listOfListedFlow = ListedFlow[];
export const __listOfListedFlow = S.Array(ListedFlow);
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
export const ListFlowsResponse = S.suspend(() =>
  S.Struct({
    Flows: S.optional(__listOfListedFlow),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Flows: "flows", NextToken: "nextToken" })),
).annotate({
  identifier: "ListFlowsResponse",
}) as any as S.Schema<ListFlowsResponse>;
export interface AddFlowMediaStreamsRequest {
  FlowArn: string;
  MediaStreams?: AddMediaStreamRequest[];
}
export const AddFlowMediaStreamsRequest = S.suspend(() =>
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
).annotate({
  identifier: "AddFlowMediaStreamsRequest",
}) as any as S.Schema<AddFlowMediaStreamsRequest>;
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
export const AddFlowMediaStreamsResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    MediaStreams: S.optional(__listOfMediaStream),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", MediaStreams: "mediaStreams" })),
).annotate({
  identifier: "AddFlowMediaStreamsResponse",
}) as any as S.Schema<AddFlowMediaStreamsResponse>;
export interface AddFlowOutputsRequest {
  FlowArn: string;
  Outputs?: AddOutputRequest[];
}
export const AddFlowOutputsRequest = S.suspend(() =>
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
).annotate({
  identifier: "AddFlowOutputsRequest",
}) as any as S.Schema<AddFlowOutputsRequest>;
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
export const AddFlowOutputsResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    Outputs: S.optional(__listOfOutput),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", Outputs: "outputs" })),
).annotate({
  identifier: "AddFlowOutputsResponse",
}) as any as S.Schema<AddFlowOutputsResponse>;
export interface AddFlowSourcesRequest {
  FlowArn: string;
  Sources?: SetSourceRequest[];
}
export const AddFlowSourcesRequest = S.suspend(() =>
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
).annotate({
  identifier: "AddFlowSourcesRequest",
}) as any as S.Schema<AddFlowSourcesRequest>;
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
export const AddFlowSourcesResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    Sources: S.optional(__listOfSource),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", Sources: "sources" })),
).annotate({
  identifier: "AddFlowSourcesResponse",
}) as any as S.Schema<AddFlowSourcesResponse>;
export interface AddFlowVpcInterfacesRequest {
  FlowArn: string;
  VpcInterfaces?: VpcInterfaceRequest[];
}
export const AddFlowVpcInterfacesRequest = S.suspend(() =>
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
).annotate({
  identifier: "AddFlowVpcInterfacesRequest",
}) as any as S.Schema<AddFlowVpcInterfacesRequest>;
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
export const AddFlowVpcInterfacesResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    VpcInterfaces: S.optional(__listOfVpcInterface),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", VpcInterfaces: "vpcInterfaces" })),
).annotate({
  identifier: "AddFlowVpcInterfacesResponse",
}) as any as S.Schema<AddFlowVpcInterfacesResponse>;
export interface DescribeFlowSourceMetadataRequest {
  FlowArn: string;
}
export const DescribeFlowSourceMetadataRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeFlowSourceMetadataRequest",
}) as any as S.Schema<DescribeFlowSourceMetadataRequest>;
export interface FrameResolution {
  FrameHeight?: number;
  FrameWidth?: number;
}
export const FrameResolution = S.suspend(() =>
  S.Struct({
    FrameHeight: S.optional(S.Number),
    FrameWidth: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ FrameHeight: "frameHeight", FrameWidth: "frameWidth" }),
  ),
).annotate({
  identifier: "FrameResolution",
}) as any as S.Schema<FrameResolution>;
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
export const TransportStream = S.suspend(() =>
  S.Struct({
    Channels: S.optional(S.Number),
    Codec: S.optional(S.String),
    FrameRate: S.optional(S.String),
    FrameResolution: S.optional(FrameResolution),
    Pid: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
    SampleSize: S.optional(S.Number),
    StreamType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Channels: "channels",
      Codec: "codec",
      FrameRate: "frameRate",
      FrameResolution: "frameResolution",
      Pid: "pid",
      SampleRate: "sampleRate",
      SampleSize: "sampleSize",
      StreamType: "streamType",
    }),
  ),
).annotate({
  identifier: "TransportStream",
}) as any as S.Schema<TransportStream>;
export type __listOfTransportStream = TransportStream[];
export const __listOfTransportStream = S.Array(TransportStream);
export interface TransportStreamProgram {
  PcrPid?: number;
  ProgramName?: string;
  ProgramNumber?: number;
  ProgramPid?: number;
  Streams?: TransportStream[];
}
export const TransportStreamProgram = S.suspend(() =>
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
).annotate({
  identifier: "TransportStreamProgram",
}) as any as S.Schema<TransportStreamProgram>;
export type __listOfTransportStreamProgram = TransportStreamProgram[];
export const __listOfTransportStreamProgram = S.Array(TransportStreamProgram);
export interface TransportMediaInfo {
  Programs?: TransportStreamProgram[];
}
export const TransportMediaInfo = S.suspend(() =>
  S.Struct({ Programs: S.optional(__listOfTransportStreamProgram) }).pipe(
    S.encodeKeys({ Programs: "programs" }),
  ),
).annotate({
  identifier: "TransportMediaInfo",
}) as any as S.Schema<TransportMediaInfo>;
export interface NdiSourceInfo {
  SourceName?: string;
}
export const NdiSourceInfo = S.suspend(() =>
  S.Struct({ SourceName: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceName: "sourceName" }),
  ),
).annotate({ identifier: "NdiSourceInfo" }) as any as S.Schema<NdiSourceInfo>;
export type __listOfNdiSourceInfo = NdiSourceInfo[];
export const __listOfNdiSourceInfo = S.Array(NdiSourceInfo);
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
export const NdiMediaStreamInfo = S.suspend(() =>
  S.Struct({
    StreamType: S.optional(S.String),
    Codec: S.optional(S.String),
    StreamId: S.optional(S.Number),
    ScanMode: S.optional(ScanMode),
    FrameResolution: S.optional(FrameResolution),
    FrameRate: S.optional(S.String),
    Channels: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      StreamType: "streamType",
      Codec: "codec",
      StreamId: "streamId",
      ScanMode: "scanMode",
      FrameResolution: "frameResolution",
      FrameRate: "frameRate",
      Channels: "channels",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({
  identifier: "NdiMediaStreamInfo",
}) as any as S.Schema<NdiMediaStreamInfo>;
export type __listOfNdiMediaStreamInfo = NdiMediaStreamInfo[];
export const __listOfNdiMediaStreamInfo = S.Array(NdiMediaStreamInfo);
export interface NdiMediaInfo {
  Streams?: NdiMediaStreamInfo[];
}
export const NdiMediaInfo = S.suspend(() =>
  S.Struct({ Streams: S.optional(__listOfNdiMediaStreamInfo) }).pipe(
    S.encodeKeys({ Streams: "streams" }),
  ),
).annotate({ identifier: "NdiMediaInfo" }) as any as S.Schema<NdiMediaInfo>;
export interface NdiSourceMetadataInfo {
  ActiveSource?: NdiSourceInfo;
  DiscoveredSources?: NdiSourceInfo[];
  MediaInfo?: NdiMediaInfo;
  Messages?: MessageDetail[];
}
export const NdiSourceMetadataInfo = S.suspend(() =>
  S.Struct({
    ActiveSource: S.optional(NdiSourceInfo),
    DiscoveredSources: S.optional(__listOfNdiSourceInfo),
    MediaInfo: S.optional(NdiMediaInfo),
    Messages: S.optional(__listOfMessageDetail),
  }).pipe(
    S.encodeKeys({
      ActiveSource: "activeSource",
      DiscoveredSources: "discoveredSources",
      MediaInfo: "mediaInfo",
      Messages: "messages",
    }),
  ),
).annotate({
  identifier: "NdiSourceMetadataInfo",
}) as any as S.Schema<NdiSourceMetadataInfo>;
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
export const DescribeFlowSourceMetadataResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    Messages: S.optional(__listOfMessageDetail),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TransportMediaInfo: S.optional(TransportMediaInfo),
    NdiInfo: S.optional(NdiSourceMetadataInfo),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      Messages: "messages",
      Timestamp: "timestamp",
      TransportMediaInfo: "transportMediaInfo",
      NdiInfo: "ndiInfo",
    }),
  ),
).annotate({
  identifier: "DescribeFlowSourceMetadataResponse",
}) as any as S.Schema<DescribeFlowSourceMetadataResponse>;
export interface DescribeFlowSourceThumbnailRequest {
  FlowArn: string;
}
export const DescribeFlowSourceThumbnailRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeFlowSourceThumbnailRequest",
}) as any as S.Schema<DescribeFlowSourceThumbnailRequest>;
export interface ThumbnailDetails {
  FlowArn?: string;
  Thumbnail?: string;
  ThumbnailMessages?: MessageDetail[];
  Timecode?: string;
  Timestamp?: Date;
}
export const ThumbnailDetails = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    Thumbnail: S.optional(S.String),
    ThumbnailMessages: S.optional(__listOfMessageDetail),
    Timecode: S.optional(S.String),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      Thumbnail: "thumbnail",
      ThumbnailMessages: "thumbnailMessages",
      Timecode: "timecode",
      Timestamp: "timestamp",
    }),
  ),
).annotate({
  identifier: "ThumbnailDetails",
}) as any as S.Schema<ThumbnailDetails>;
export interface DescribeFlowSourceThumbnailResponse {
  ThumbnailDetails?: ThumbnailDetails & {
    FlowArn: string;
    ThumbnailMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export const DescribeFlowSourceThumbnailResponse = S.suspend(() =>
  S.Struct({ ThumbnailDetails: S.optional(ThumbnailDetails) }).pipe(
    S.encodeKeys({ ThumbnailDetails: "thumbnailDetails" }),
  ),
).annotate({
  identifier: "DescribeFlowSourceThumbnailResponse",
}) as any as S.Schema<DescribeFlowSourceThumbnailResponse>;
export interface GrantFlowEntitlementsRequest {
  Entitlements?: GrantEntitlementRequest[];
  FlowArn: string;
}
export const GrantFlowEntitlementsRequest = S.suspend(() =>
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
).annotate({
  identifier: "GrantFlowEntitlementsRequest",
}) as any as S.Schema<GrantFlowEntitlementsRequest>;
export interface GrantFlowEntitlementsResponse {
  Entitlements?: (Entitlement & {
    EntitlementArn: string;
    Name: string;
    Subscribers: __listOfString;
    Encryption: Encryption & { RoleArn: string };
  })[];
  FlowArn?: string;
}
export const GrantFlowEntitlementsResponse = S.suspend(() =>
  S.Struct({
    Entitlements: S.optional(__listOfEntitlement),
    FlowArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ Entitlements: "entitlements", FlowArn: "flowArn" })),
).annotate({
  identifier: "GrantFlowEntitlementsResponse",
}) as any as S.Schema<GrantFlowEntitlementsResponse>;
export interface RemoveFlowMediaStreamRequest {
  FlowArn: string;
  MediaStreamName: string;
}
export const RemoveFlowMediaStreamRequest = S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    MediaStreamName: S.String.pipe(T.HttpLabel("MediaStreamName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/mediaStreams/{MediaStreamName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveFlowMediaStreamRequest",
}) as any as S.Schema<RemoveFlowMediaStreamRequest>;
export interface RemoveFlowMediaStreamResponse {
  FlowArn?: string;
  MediaStreamName?: string;
}
export const RemoveFlowMediaStreamResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    MediaStreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", MediaStreamName: "mediaStreamName" }),
  ),
).annotate({
  identifier: "RemoveFlowMediaStreamResponse",
}) as any as S.Schema<RemoveFlowMediaStreamResponse>;
export interface RemoveFlowOutputRequest {
  FlowArn: string;
  OutputArn: string;
}
export const RemoveFlowOutputRequest = S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    OutputArn: S.String.pipe(T.HttpLabel("OutputArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/outputs/{OutputArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveFlowOutputRequest",
}) as any as S.Schema<RemoveFlowOutputRequest>;
export interface RemoveFlowOutputResponse {
  FlowArn?: string;
  OutputArn?: string;
}
export const RemoveFlowOutputResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    OutputArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", OutputArn: "outputArn" })),
).annotate({
  identifier: "RemoveFlowOutputResponse",
}) as any as S.Schema<RemoveFlowOutputResponse>;
export interface RemoveFlowSourceRequest {
  FlowArn: string;
  SourceArn: string;
}
export const RemoveFlowSourceRequest = S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    SourceArn: S.String.pipe(T.HttpLabel("SourceArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/source/{SourceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveFlowSourceRequest",
}) as any as S.Schema<RemoveFlowSourceRequest>;
export interface RemoveFlowSourceResponse {
  FlowArn?: string;
  SourceArn?: string;
}
export const RemoveFlowSourceResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    SourceArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", SourceArn: "sourceArn" })),
).annotate({
  identifier: "RemoveFlowSourceResponse",
}) as any as S.Schema<RemoveFlowSourceResponse>;
export interface RemoveFlowVpcInterfaceRequest {
  FlowArn: string;
  VpcInterfaceName: string;
}
export const RemoveFlowVpcInterfaceRequest = S.suspend(() =>
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
).annotate({
  identifier: "RemoveFlowVpcInterfaceRequest",
}) as any as S.Schema<RemoveFlowVpcInterfaceRequest>;
export interface RemoveFlowVpcInterfaceResponse {
  FlowArn?: string;
  NonDeletedNetworkInterfaceIds?: string[];
  VpcInterfaceName?: string;
}
export const RemoveFlowVpcInterfaceResponse = S.suspend(() =>
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
).annotate({
  identifier: "RemoveFlowVpcInterfaceResponse",
}) as any as S.Schema<RemoveFlowVpcInterfaceResponse>;
export interface RevokeFlowEntitlementRequest {
  EntitlementArn: string;
  FlowArn: string;
}
export const RevokeFlowEntitlementRequest = S.suspend(() =>
  S.Struct({
    EntitlementArn: S.String.pipe(T.HttpLabel("EntitlementArn")),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/entitlements/{EntitlementArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokeFlowEntitlementRequest",
}) as any as S.Schema<RevokeFlowEntitlementRequest>;
export interface RevokeFlowEntitlementResponse {
  EntitlementArn?: string;
  FlowArn?: string;
}
export const RevokeFlowEntitlementResponse = S.suspend(() =>
  S.Struct({
    EntitlementArn: S.optional(S.String),
    FlowArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ EntitlementArn: "entitlementArn", FlowArn: "flowArn" }),
  ),
).annotate({
  identifier: "RevokeFlowEntitlementResponse",
}) as any as S.Schema<RevokeFlowEntitlementResponse>;
export interface StartFlowRequest {
  FlowArn: string;
}
export const StartFlowRequest = S.suspend(() =>
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
).annotate({
  identifier: "StartFlowRequest",
}) as any as S.Schema<StartFlowRequest>;
export interface StartFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export const StartFlowResponse = S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Status: S.optional(Status) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Status: "status" }),
  ),
).annotate({
  identifier: "StartFlowResponse",
}) as any as S.Schema<StartFlowResponse>;
export interface StopFlowRequest {
  FlowArn: string;
}
export const StopFlowRequest = S.suspend(() =>
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
).annotate({
  identifier: "StopFlowRequest",
}) as any as S.Schema<StopFlowRequest>;
export interface StopFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export const StopFlowResponse = S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Status: S.optional(Status) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Status: "status" }),
  ),
).annotate({
  identifier: "StopFlowResponse",
}) as any as S.Schema<StopFlowResponse>;
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
export const UpdateEncryption = S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(Algorithm),
    ConstantInitializationVector: S.optional(S.String),
    DeviceId: S.optional(S.String),
    KeyType: S.optional(KeyType),
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
).annotate({
  identifier: "UpdateEncryption",
}) as any as S.Schema<UpdateEncryption>;
export interface UpdateFlowEntitlementRequest {
  Description?: string;
  Encryption?: UpdateEncryption;
  EntitlementArn: string;
  EntitlementStatus?: EntitlementStatus;
  FlowArn: string;
  Subscribers?: string[];
}
export const UpdateFlowEntitlementRequest = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Encryption: S.optional(UpdateEncryption),
    EntitlementArn: S.String.pipe(T.HttpLabel("EntitlementArn")),
    EntitlementStatus: S.optional(EntitlementStatus),
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
        T.Http({
          method: "PUT",
          uri: "/v1/flows/{FlowArn}/entitlements/{EntitlementArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowEntitlementRequest",
}) as any as S.Schema<UpdateFlowEntitlementRequest>;
export interface UpdateFlowEntitlementResponse {
  Entitlement?: Entitlement & {
    EntitlementArn: string;
    Name: string;
    Subscribers: __listOfString;
    Encryption: Encryption & { RoleArn: string };
  };
  FlowArn?: string;
}
export const UpdateFlowEntitlementResponse = S.suspend(() =>
  S.Struct({
    Entitlement: S.optional(Entitlement),
    FlowArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ Entitlement: "entitlement", FlowArn: "flowArn" })),
).annotate({
  identifier: "UpdateFlowEntitlementResponse",
}) as any as S.Schema<UpdateFlowEntitlementResponse>;
export interface UpdateFlowMediaStreamRequest {
  Attributes?: MediaStreamAttributesRequest;
  ClockRate?: number;
  Description?: string;
  FlowArn: string;
  MediaStreamName: string;
  MediaStreamType?: MediaStreamType;
  VideoFormat?: string;
}
export const UpdateFlowMediaStreamRequest = S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MediaStreamAttributesRequest),
    ClockRate: S.optional(S.Number),
    Description: S.optional(S.String),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    MediaStreamName: S.String.pipe(T.HttpLabel("MediaStreamName")),
    MediaStreamType: S.optional(MediaStreamType),
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
        T.Http({
          method: "PUT",
          uri: "/v1/flows/{FlowArn}/mediaStreams/{MediaStreamName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowMediaStreamRequest",
}) as any as S.Schema<UpdateFlowMediaStreamRequest>;
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
export const UpdateFlowMediaStreamResponse = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    MediaStream: S.optional(MediaStream),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", MediaStream: "mediaStream" })),
).annotate({
  identifier: "UpdateFlowMediaStreamResponse",
}) as any as S.Schema<UpdateFlowMediaStreamResponse>;
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
}
export const UpdateFlowOutputRequest = S.suspend(() =>
  S.Struct({
    CidrAllowList: S.optional(__listOfString),
    Description: S.optional(S.String),
    Destination: S.optional(S.String),
    Encryption: S.optional(UpdateEncryption),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    MaxLatency: S.optional(S.Number),
    MediaStreamOutputConfigurations: S.optional(
      __listOfMediaStreamOutputConfigurationRequest,
    ),
    MinLatency: S.optional(S.Number),
    OutputArn: S.String.pipe(T.HttpLabel("OutputArn")),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    RemoteId: S.optional(S.String),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SmoothingLatency: S.optional(S.Number),
    StreamId: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    OutputStatus: S.optional(OutputStatus),
    NdiProgramName: S.optional(S.String),
    NdiSpeedHqQuality: S.optional(S.Number),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitEncryption: S.optional(FlowTransitEncryption),
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
        RouterIntegrationTransitEncryption:
          "routerIntegrationTransitEncryption",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/flows/{FlowArn}/outputs/{OutputArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowOutputRequest",
}) as any as S.Schema<UpdateFlowOutputRequest>;
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
export const UpdateFlowOutputResponse = S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Output: S.optional(Output) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Output: "output" }),
  ),
).annotate({
  identifier: "UpdateFlowOutputResponse",
}) as any as S.Schema<UpdateFlowOutputResponse>;
export interface UpdateGatewayBridgeSourceRequest {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export const UpdateGatewayBridgeSourceRequest = S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
  }).pipe(
    S.encodeKeys({
      BridgeArn: "bridgeArn",
      VpcInterfaceAttachment: "vpcInterfaceAttachment",
    }),
  ),
).annotate({
  identifier: "UpdateGatewayBridgeSourceRequest",
}) as any as S.Schema<UpdateGatewayBridgeSourceRequest>;
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
export const UpdateFlowSourceRequest = S.suspend(() =>
  S.Struct({
    Decryption: S.optional(UpdateEncryption),
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
    Protocol: S.optional(Protocol),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SourceArn: S.String.pipe(T.HttpLabel("SourceArn")),
    SourceListenerAddress: S.optional(S.String),
    SourceListenerPort: S.optional(S.Number),
    StreamId: S.optional(S.String),
    VpcInterfaceName: S.optional(S.String),
    WhitelistCidr: S.optional(S.String),
    GatewayBridgeSource: S.optional(UpdateGatewayBridgeSourceRequest),
    NdiSourceSettings: S.optional(NdiSourceSettings),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitDecryption: S.optional(FlowTransitEncryption),
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
        RouterIntegrationTransitDecryption:
          "routerIntegrationTransitDecryption",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/flows/{FlowArn}/source/{SourceArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowSourceRequest",
}) as any as S.Schema<UpdateFlowSourceRequest>;
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
export const UpdateFlowSourceResponse = S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Source: S.optional(Source) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Source: "source" }),
  ),
).annotate({
  identifier: "UpdateFlowSourceResponse",
}) as any as S.Schema<UpdateFlowSourceResponse>;
export interface DescribeGatewayInstanceRequest {
  GatewayInstanceArn: string;
}
export const DescribeGatewayInstanceRequest = S.suspend(() =>
  S.Struct({
    GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/gateway-instances/{GatewayInstanceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGatewayInstanceRequest",
}) as any as S.Schema<DescribeGatewayInstanceRequest>;
export type BridgePlacement = "AVAILABLE" | "LOCKED" | (string & {});
export const BridgePlacement = S.String;
export type ConnectionStatus = "CONNECTED" | "DISCONNECTED" | (string & {});
export const ConnectionStatus = S.String;
export type InstanceState =
  | "REGISTERING"
  | "ACTIVE"
  | "DEREGISTERING"
  | "DEREGISTERED"
  | "REGISTRATION_ERROR"
  | "DEREGISTRATION_ERROR"
  | (string & {});
export const InstanceState = S.String;
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
export const GatewayInstance = S.suspend(() =>
  S.Struct({
    BridgePlacement: S.optional(BridgePlacement),
    ConnectionStatus: S.optional(ConnectionStatus),
    GatewayArn: S.optional(S.String),
    GatewayInstanceArn: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceMessages: S.optional(__listOfMessageDetail),
    InstanceState: S.optional(InstanceState),
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
).annotate({
  identifier: "GatewayInstance",
}) as any as S.Schema<GatewayInstance>;
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
export const DescribeGatewayInstanceResponse = S.suspend(() =>
  S.Struct({ GatewayInstance: S.optional(GatewayInstance) }).pipe(
    S.encodeKeys({ GatewayInstance: "gatewayInstance" }),
  ),
).annotate({
  identifier: "DescribeGatewayInstanceResponse",
}) as any as S.Schema<DescribeGatewayInstanceResponse>;
export interface UpdateGatewayInstanceRequest {
  BridgePlacement?: BridgePlacement;
  GatewayInstanceArn: string;
}
export const UpdateGatewayInstanceRequest = S.suspend(() =>
  S.Struct({
    BridgePlacement: S.optional(BridgePlacement),
    GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")),
  })
    .pipe(S.encodeKeys({ BridgePlacement: "bridgePlacement" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/gateway-instances/{GatewayInstanceArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateGatewayInstanceRequest",
}) as any as S.Schema<UpdateGatewayInstanceRequest>;
export interface UpdateGatewayInstanceResponse {
  BridgePlacement?: BridgePlacement;
  GatewayInstanceArn?: string;
}
export const UpdateGatewayInstanceResponse = S.suspend(() =>
  S.Struct({
    BridgePlacement: S.optional(BridgePlacement),
    GatewayInstanceArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      BridgePlacement: "bridgePlacement",
      GatewayInstanceArn: "gatewayInstanceArn",
    }),
  ),
).annotate({
  identifier: "UpdateGatewayInstanceResponse",
}) as any as S.Schema<UpdateGatewayInstanceResponse>;
export interface DeregisterGatewayInstanceRequest {
  Force?: boolean;
  GatewayInstanceArn: string;
}
export const DeregisterGatewayInstanceRequest = S.suspend(() =>
  S.Struct({
    Force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/gateway-instances/{GatewayInstanceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterGatewayInstanceRequest",
}) as any as S.Schema<DeregisterGatewayInstanceRequest>;
export interface DeregisterGatewayInstanceResponse {
  GatewayInstanceArn?: string;
  InstanceState?: InstanceState;
}
export const DeregisterGatewayInstanceResponse = S.suspend(() =>
  S.Struct({
    GatewayInstanceArn: S.optional(S.String),
    InstanceState: S.optional(InstanceState),
  }).pipe(
    S.encodeKeys({
      GatewayInstanceArn: "gatewayInstanceArn",
      InstanceState: "instanceState",
    }),
  ),
).annotate({
  identifier: "DeregisterGatewayInstanceResponse",
}) as any as S.Schema<DeregisterGatewayInstanceResponse>;
export interface ListGatewayInstancesRequest {
  FilterArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListGatewayInstancesRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListGatewayInstancesRequest",
}) as any as S.Schema<ListGatewayInstancesRequest>;
export interface ListedGatewayInstance {
  GatewayArn?: string;
  GatewayInstanceArn?: string;
  InstanceId?: string;
  InstanceState?: InstanceState;
}
export const ListedGatewayInstance = S.suspend(() =>
  S.Struct({
    GatewayArn: S.optional(S.String),
    GatewayInstanceArn: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceState: S.optional(InstanceState),
  }).pipe(
    S.encodeKeys({
      GatewayArn: "gatewayArn",
      GatewayInstanceArn: "gatewayInstanceArn",
      InstanceId: "instanceId",
      InstanceState: "instanceState",
    }),
  ),
).annotate({
  identifier: "ListedGatewayInstance",
}) as any as S.Schema<ListedGatewayInstance>;
export type __listOfListedGatewayInstance = ListedGatewayInstance[];
export const __listOfListedGatewayInstance = S.Array(ListedGatewayInstance);
export interface ListGatewayInstancesResponse {
  Instances?: (ListedGatewayInstance & {
    GatewayArn: string;
    GatewayInstanceArn: string;
    InstanceId: string;
  })[];
  NextToken?: string;
}
export const ListGatewayInstancesResponse = S.suspend(() =>
  S.Struct({
    Instances: S.optional(__listOfListedGatewayInstance),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Instances: "instances", NextToken: "nextToken" })),
).annotate({
  identifier: "ListGatewayInstancesResponse",
}) as any as S.Schema<ListGatewayInstancesResponse>;
export interface GatewayNetwork {
  CidrBlock?: string;
  Name?: string;
}
export const GatewayNetwork = S.suspend(() =>
  S.Struct({
    CidrBlock: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(S.encodeKeys({ CidrBlock: "cidrBlock", Name: "name" })),
).annotate({ identifier: "GatewayNetwork" }) as any as S.Schema<GatewayNetwork>;
export type __listOfGatewayNetwork = GatewayNetwork[];
export const __listOfGatewayNetwork = S.Array(GatewayNetwork);
export interface CreateGatewayRequest {
  EgressCidrBlocks?: string[];
  Name?: string;
  Networks?: GatewayNetwork[];
}
export const CreateGatewayRequest = S.suspend(() =>
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
      T.all(
        T.Http({ method: "POST", uri: "/v1/gateways" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateGatewayRequest",
}) as any as S.Schema<CreateGatewayRequest>;
export type GatewayState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "ERROR"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const GatewayState = S.String;
export interface Gateway {
  EgressCidrBlocks?: string[];
  GatewayArn?: string;
  GatewayMessages?: MessageDetail[];
  GatewayState?: GatewayState;
  Name?: string;
  Networks?: GatewayNetwork[];
}
export const Gateway = S.suspend(() =>
  S.Struct({
    EgressCidrBlocks: S.optional(__listOfString),
    GatewayArn: S.optional(S.String),
    GatewayMessages: S.optional(__listOfMessageDetail),
    GatewayState: S.optional(GatewayState),
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
).annotate({ identifier: "Gateway" }) as any as S.Schema<Gateway>;
export interface CreateGatewayResponse {
  Gateway?: Gateway & {
    EgressCidrBlocks: __listOfString;
    GatewayArn: string;
    Name: string;
    Networks: (GatewayNetwork & { CidrBlock: string; Name: string })[];
    GatewayMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export const CreateGatewayResponse = S.suspend(() =>
  S.Struct({ Gateway: S.optional(Gateway) }).pipe(
    S.encodeKeys({ Gateway: "gateway" }),
  ),
).annotate({
  identifier: "CreateGatewayResponse",
}) as any as S.Schema<CreateGatewayResponse>;
export interface DescribeGatewayRequest {
  GatewayArn: string;
}
export const DescribeGatewayRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeGatewayRequest",
}) as any as S.Schema<DescribeGatewayRequest>;
export interface DescribeGatewayResponse {
  Gateway?: Gateway & {
    EgressCidrBlocks: __listOfString;
    GatewayArn: string;
    Name: string;
    Networks: (GatewayNetwork & { CidrBlock: string; Name: string })[];
    GatewayMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export const DescribeGatewayResponse = S.suspend(() =>
  S.Struct({ Gateway: S.optional(Gateway) }).pipe(
    S.encodeKeys({ Gateway: "gateway" }),
  ),
).annotate({
  identifier: "DescribeGatewayResponse",
}) as any as S.Schema<DescribeGatewayResponse>;
export interface DeleteGatewayRequest {
  GatewayArn: string;
}
export const DeleteGatewayRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteGatewayRequest",
}) as any as S.Schema<DeleteGatewayRequest>;
export interface DeleteGatewayResponse {
  GatewayArn?: string;
}
export const DeleteGatewayResponse = S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ GatewayArn: "gatewayArn" }),
  ),
).annotate({
  identifier: "DeleteGatewayResponse",
}) as any as S.Schema<DeleteGatewayResponse>;
export interface ListGatewaysRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListGatewaysRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/gateways" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewaysRequest",
}) as any as S.Schema<ListGatewaysRequest>;
export interface ListedGateway {
  GatewayArn?: string;
  GatewayState?: GatewayState;
  Name?: string;
}
export const ListedGateway = S.suspend(() =>
  S.Struct({
    GatewayArn: S.optional(S.String),
    GatewayState: S.optional(GatewayState),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      GatewayArn: "gatewayArn",
      GatewayState: "gatewayState",
      Name: "name",
    }),
  ),
).annotate({ identifier: "ListedGateway" }) as any as S.Schema<ListedGateway>;
export type __listOfListedGateway = ListedGateway[];
export const __listOfListedGateway = S.Array(ListedGateway);
export interface ListGatewaysResponse {
  Gateways?: (ListedGateway & {
    GatewayArn: string;
    GatewayState: GatewayState;
    Name: string;
  })[];
  NextToken?: string;
}
export const ListGatewaysResponse = S.suspend(() =>
  S.Struct({
    Gateways: S.optional(__listOfListedGateway),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Gateways: "gateways", NextToken: "nextToken" })),
).annotate({
  identifier: "ListGatewaysResponse",
}) as any as S.Schema<ListGatewaysResponse>;
export interface DescribeOfferingRequest {
  OfferingArn: string;
}
export const DescribeOfferingRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeOfferingRequest",
}) as any as S.Schema<DescribeOfferingRequest>;
export type DurationUnits = "MONTHS" | (string & {});
export const DurationUnits = S.String;
export type PriceUnits = "HOURLY" | (string & {});
export const PriceUnits = S.String;
export type ResourceType = "Mbps_Outbound_Bandwidth" | (string & {});
export const ResourceType = S.String;
export interface ResourceSpecification {
  ReservedBitrate?: number;
  ResourceType?: ResourceType;
}
export const ResourceSpecification = S.suspend(() =>
  S.Struct({
    ReservedBitrate: S.optional(S.Number),
    ResourceType: S.optional(ResourceType),
  }).pipe(
    S.encodeKeys({
      ReservedBitrate: "reservedBitrate",
      ResourceType: "resourceType",
    }),
  ),
).annotate({
  identifier: "ResourceSpecification",
}) as any as S.Schema<ResourceSpecification>;
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
export const Offering = S.suspend(() =>
  S.Struct({
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(DurationUnits),
    OfferingArn: S.optional(S.String),
    OfferingDescription: S.optional(S.String),
    PricePerUnit: S.optional(S.String),
    PriceUnits: S.optional(PriceUnits),
    ResourceSpecification: S.optional(ResourceSpecification),
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
).annotate({ identifier: "Offering" }) as any as S.Schema<Offering>;
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
export const DescribeOfferingResponse = S.suspend(() =>
  S.Struct({ Offering: S.optional(Offering) }).pipe(
    S.encodeKeys({ Offering: "offering" }),
  ),
).annotate({
  identifier: "DescribeOfferingResponse",
}) as any as S.Schema<DescribeOfferingResponse>;
export interface ListOfferingsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListOfferingsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/offerings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOfferingsRequest",
}) as any as S.Schema<ListOfferingsRequest>;
export type __listOfOffering = Offering[];
export const __listOfOffering = S.Array(Offering);
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
export const ListOfferingsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Offerings: S.optional(__listOfOffering),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Offerings: "offerings" })),
).annotate({
  identifier: "ListOfferingsResponse",
}) as any as S.Schema<ListOfferingsResponse>;
export interface PurchaseOfferingRequest {
  OfferingArn: string;
  ReservationName?: string;
  Start?: string;
}
export const PurchaseOfferingRequest = S.suspend(() =>
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
).annotate({
  identifier: "PurchaseOfferingRequest",
}) as any as S.Schema<PurchaseOfferingRequest>;
export type ReservationState =
  | "ACTIVE"
  | "EXPIRED"
  | "PROCESSING"
  | "CANCELED"
  | (string & {});
export const ReservationState = S.String;
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
export const Reservation = S.suspend(() =>
  S.Struct({
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(DurationUnits),
    End: S.optional(S.String),
    OfferingArn: S.optional(S.String),
    OfferingDescription: S.optional(S.String),
    PricePerUnit: S.optional(S.String),
    PriceUnits: S.optional(PriceUnits),
    ReservationArn: S.optional(S.String),
    ReservationName: S.optional(S.String),
    ReservationState: S.optional(ReservationState),
    ResourceSpecification: S.optional(ResourceSpecification),
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
).annotate({ identifier: "Reservation" }) as any as S.Schema<Reservation>;
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
export const PurchaseOfferingResponse = S.suspend(() =>
  S.Struct({ Reservation: S.optional(Reservation) }).pipe(
    S.encodeKeys({ Reservation: "reservation" }),
  ),
).annotate({
  identifier: "PurchaseOfferingResponse",
}) as any as S.Schema<PurchaseOfferingResponse>;
export interface DescribeReservationRequest {
  ReservationArn: string;
}
export const DescribeReservationRequest = S.suspend(() =>
  S.Struct({
    ReservationArn: S.String.pipe(T.HttpLabel("ReservationArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/reservations/{ReservationArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReservationRequest",
}) as any as S.Schema<DescribeReservationRequest>;
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
export const DescribeReservationResponse = S.suspend(() =>
  S.Struct({ Reservation: S.optional(Reservation) }).pipe(
    S.encodeKeys({ Reservation: "reservation" }),
  ),
).annotate({
  identifier: "DescribeReservationResponse",
}) as any as S.Schema<DescribeReservationResponse>;
export interface ListReservationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListReservationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/reservations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReservationsRequest",
}) as any as S.Schema<ListReservationsRequest>;
export type __listOfReservation = Reservation[];
export const __listOfReservation = S.Array(Reservation);
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
export const ListReservationsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Reservations: S.optional(__listOfReservation),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", Reservations: "reservations" }),
  ),
).annotate({
  identifier: "ListReservationsResponse",
}) as any as S.Schema<ListReservationsResponse>;
export type ForwardErrorCorrectionState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const ForwardErrorCorrectionState = S.String;
export interface RtpRouterInputConfiguration {
  Port: number;
  ForwardErrorCorrection?: ForwardErrorCorrectionState;
}
export const RtpRouterInputConfiguration = S.suspend(() =>
  S.Struct({
    Port: S.Number,
    ForwardErrorCorrection: S.optional(ForwardErrorCorrectionState),
  }).pipe(
    S.encodeKeys({
      Port: "port",
      ForwardErrorCorrection: "forwardErrorCorrection",
    }),
  ),
).annotate({
  identifier: "RtpRouterInputConfiguration",
}) as any as S.Schema<RtpRouterInputConfiguration>;
export interface RistRouterInputConfiguration {
  Port: number;
  RecoveryLatencyMilliseconds: number;
}
export const RistRouterInputConfiguration = S.suspend(() =>
  S.Struct({ Port: S.Number, RecoveryLatencyMilliseconds: S.Number }).pipe(
    S.encodeKeys({
      Port: "port",
      RecoveryLatencyMilliseconds: "recoveryLatencyMilliseconds",
    }),
  ),
).annotate({
  identifier: "RistRouterInputConfiguration",
}) as any as S.Schema<RistRouterInputConfiguration>;
export interface SrtDecryptionConfiguration {
  EncryptionKey: SecretsManagerEncryptionKeyConfiguration;
}
export const SrtDecryptionConfiguration = S.suspend(() =>
  S.Struct({ EncryptionKey: SecretsManagerEncryptionKeyConfiguration }).pipe(
    S.encodeKeys({ EncryptionKey: "encryptionKey" }),
  ),
).annotate({
  identifier: "SrtDecryptionConfiguration",
}) as any as S.Schema<SrtDecryptionConfiguration>;
export interface SrtListenerRouterInputConfiguration {
  Port: number;
  MinimumLatencyMilliseconds: number;
  DecryptionConfiguration?: SrtDecryptionConfiguration;
}
export const SrtListenerRouterInputConfiguration = S.suspend(() =>
  S.Struct({
    Port: S.Number,
    MinimumLatencyMilliseconds: S.Number,
    DecryptionConfiguration: S.optional(SrtDecryptionConfiguration),
  }).pipe(
    S.encodeKeys({
      Port: "port",
      MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
      DecryptionConfiguration: "decryptionConfiguration",
    }),
  ),
).annotate({
  identifier: "SrtListenerRouterInputConfiguration",
}) as any as S.Schema<SrtListenerRouterInputConfiguration>;
export interface SrtCallerRouterInputConfiguration {
  SourceAddress: string;
  SourcePort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string;
  DecryptionConfiguration?: SrtDecryptionConfiguration;
}
export const SrtCallerRouterInputConfiguration = S.suspend(() =>
  S.Struct({
    SourceAddress: S.String,
    SourcePort: S.Number,
    MinimumLatencyMilliseconds: S.Number,
    StreamId: S.optional(S.String),
    DecryptionConfiguration: S.optional(SrtDecryptionConfiguration),
  }).pipe(
    S.encodeKeys({
      SourceAddress: "sourceAddress",
      SourcePort: "sourcePort",
      MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
      StreamId: "streamId",
      DecryptionConfiguration: "decryptionConfiguration",
    }),
  ),
).annotate({
  identifier: "SrtCallerRouterInputConfiguration",
}) as any as S.Schema<SrtCallerRouterInputConfiguration>;
export type RouterInputProtocolConfiguration =
  | {
      Rtp: RtpRouterInputConfiguration;
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist: RistRouterInputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist?: never;
      SrtListener: SrtListenerRouterInputConfiguration;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterInputConfiguration;
    };
export const RouterInputProtocolConfiguration = S.Union([
  S.Struct({ Rtp: RtpRouterInputConfiguration }),
  S.Struct({ Rist: RistRouterInputConfiguration }),
  S.Struct({ SrtListener: SrtListenerRouterInputConfiguration }),
  S.Struct({ SrtCaller: SrtCallerRouterInputConfiguration }),
]);
export type RouterInputProtocol =
  | "RTP"
  | "RIST"
  | "SRT_CALLER"
  | "SRT_LISTENER"
  | (string & {});
export const RouterInputProtocol = S.String;
export interface StandardRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfiguration: RouterInputProtocolConfiguration;
  Protocol?: RouterInputProtocol;
}
export const StandardRouterInputConfiguration = S.suspend(() =>
  S.Struct({
    NetworkInterfaceArn: S.String,
    ProtocolConfiguration: RouterInputProtocolConfiguration,
    Protocol: S.optional(RouterInputProtocol),
  }).pipe(
    S.encodeKeys({
      NetworkInterfaceArn: "networkInterfaceArn",
      ProtocolConfiguration: "protocolConfiguration",
      Protocol: "protocol",
    }),
  ),
).annotate({
  identifier: "StandardRouterInputConfiguration",
}) as any as S.Schema<StandardRouterInputConfiguration>;
export type FailoverRouterInputProtocolConfiguration =
  | {
      Rtp: RtpRouterInputConfiguration;
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist: RistRouterInputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist?: never;
      SrtListener: SrtListenerRouterInputConfiguration;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterInputConfiguration;
    };
export const FailoverRouterInputProtocolConfiguration = S.Union([
  S.Struct({ Rtp: RtpRouterInputConfiguration }),
  S.Struct({ Rist: RistRouterInputConfiguration }),
  S.Struct({ SrtListener: SrtListenerRouterInputConfiguration }),
  S.Struct({ SrtCaller: SrtCallerRouterInputConfiguration }),
]);
export type FailoverRouterInputProtocolConfigurationList =
  FailoverRouterInputProtocolConfiguration[];
export const FailoverRouterInputProtocolConfigurationList = S.Array(
  FailoverRouterInputProtocolConfiguration,
);
export type FailoverInputSourcePriorityMode =
  | "NO_PRIORITY"
  | "PRIMARY_SECONDARY"
  | (string & {});
export const FailoverInputSourcePriorityMode = S.String;
export interface FailoverRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfigurations: FailoverRouterInputProtocolConfiguration[];
  SourcePriorityMode: FailoverInputSourcePriorityMode;
  PrimarySourceIndex?: number;
}
export const FailoverRouterInputConfiguration = S.suspend(() =>
  S.Struct({
    NetworkInterfaceArn: S.String,
    ProtocolConfigurations: FailoverRouterInputProtocolConfigurationList,
    SourcePriorityMode: FailoverInputSourcePriorityMode,
    PrimarySourceIndex: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      NetworkInterfaceArn: "networkInterfaceArn",
      ProtocolConfigurations: "protocolConfigurations",
      SourcePriorityMode: "sourcePriorityMode",
      PrimarySourceIndex: "primarySourceIndex",
    }),
  ),
).annotate({
  identifier: "FailoverRouterInputConfiguration",
}) as any as S.Schema<FailoverRouterInputConfiguration>;
export type MergeRouterInputProtocolConfiguration =
  | { Rtp: RtpRouterInputConfiguration; Rist?: never }
  | { Rtp?: never; Rist: RistRouterInputConfiguration };
export const MergeRouterInputProtocolConfiguration = S.Union([
  S.Struct({ Rtp: RtpRouterInputConfiguration }),
  S.Struct({ Rist: RistRouterInputConfiguration }),
]);
export type MergeRouterInputProtocolConfigurationList =
  MergeRouterInputProtocolConfiguration[];
export const MergeRouterInputProtocolConfigurationList = S.Array(
  MergeRouterInputProtocolConfiguration,
);
export interface MergeRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfigurations: MergeRouterInputProtocolConfiguration[];
  MergeRecoveryWindowMilliseconds: number;
}
export const MergeRouterInputConfiguration = S.suspend(() =>
  S.Struct({
    NetworkInterfaceArn: S.String,
    ProtocolConfigurations: MergeRouterInputProtocolConfigurationList,
    MergeRecoveryWindowMilliseconds: S.Number,
  }).pipe(
    S.encodeKeys({
      NetworkInterfaceArn: "networkInterfaceArn",
      ProtocolConfigurations: "protocolConfigurations",
      MergeRecoveryWindowMilliseconds: "mergeRecoveryWindowMilliseconds",
    }),
  ),
).annotate({
  identifier: "MergeRouterInputConfiguration",
}) as any as S.Schema<MergeRouterInputConfiguration>;
export interface MediaConnectFlowRouterInputConfiguration {
  FlowArn?: string;
  FlowOutputArn?: string;
  SourceTransitDecryption: FlowTransitEncryption;
}
export const MediaConnectFlowRouterInputConfiguration = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowOutputArn: S.optional(S.String),
    SourceTransitDecryption: FlowTransitEncryption,
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowOutputArn: "flowOutputArn",
      SourceTransitDecryption: "sourceTransitDecryption",
    }),
  ),
).annotate({
  identifier: "MediaConnectFlowRouterInputConfiguration",
}) as any as S.Schema<MediaConnectFlowRouterInputConfiguration>;
export type RouterInputConfiguration =
  | {
      Standard: StandardRouterInputConfiguration;
      Failover?: never;
      Merge?: never;
      MediaConnectFlow?: never;
    }
  | {
      Standard?: never;
      Failover: FailoverRouterInputConfiguration;
      Merge?: never;
      MediaConnectFlow?: never;
    }
  | {
      Standard?: never;
      Failover?: never;
      Merge: MergeRouterInputConfiguration;
      MediaConnectFlow?: never;
    }
  | {
      Standard?: never;
      Failover?: never;
      Merge?: never;
      MediaConnectFlow: MediaConnectFlowRouterInputConfiguration;
    };
export const RouterInputConfiguration = S.Union([
  S.Struct({ Standard: StandardRouterInputConfiguration }),
  S.Struct({ Failover: FailoverRouterInputConfiguration }),
  S.Struct({ Merge: MergeRouterInputConfiguration }),
  S.Struct({ MediaConnectFlow: MediaConnectFlowRouterInputConfiguration }),
]);
export type RoutingScope = "REGIONAL" | "GLOBAL" | (string & {});
export const RoutingScope = S.String;
export type RouterInputTier =
  | "INPUT_100"
  | "INPUT_50"
  | "INPUT_20"
  | (string & {});
export const RouterInputTier = S.String;
export type RouterInputTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export const RouterInputTransitEncryptionKeyType = S.String;
export type RouterInputTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export const RouterInputTransitEncryptionKeyConfiguration = S.Union([
  S.Struct({ SecretsManager: SecretsManagerEncryptionKeyConfiguration }),
  S.Struct({ Automatic: AutomaticEncryptionKeyConfiguration }),
]);
export interface RouterInputTransitEncryption {
  EncryptionKeyType?: RouterInputTransitEncryptionKeyType;
  EncryptionKeyConfiguration: RouterInputTransitEncryptionKeyConfiguration;
}
export const RouterInputTransitEncryption = S.suspend(() =>
  S.Struct({
    EncryptionKeyType: S.optional(RouterInputTransitEncryptionKeyType),
    EncryptionKeyConfiguration: RouterInputTransitEncryptionKeyConfiguration,
  }).pipe(
    S.encodeKeys({
      EncryptionKeyType: "encryptionKeyType",
      EncryptionKeyConfiguration: "encryptionKeyConfiguration",
    }),
  ),
).annotate({
  identifier: "RouterInputTransitEncryption",
}) as any as S.Schema<RouterInputTransitEncryption>;
export type Day =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export const Day = S.String;
export interface PreferredDayTimeMaintenanceConfiguration {
  Day: Day;
  Time: string;
}
export const PreferredDayTimeMaintenanceConfiguration = S.suspend(() =>
  S.Struct({ Day: Day, Time: S.String }).pipe(
    S.encodeKeys({ Day: "day", Time: "time" }),
  ),
).annotate({
  identifier: "PreferredDayTimeMaintenanceConfiguration",
}) as any as S.Schema<PreferredDayTimeMaintenanceConfiguration>;
export interface DefaultMaintenanceConfiguration {}
export const DefaultMaintenanceConfiguration = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DefaultMaintenanceConfiguration",
}) as any as S.Schema<DefaultMaintenanceConfiguration>;
export type MaintenanceConfiguration =
  | {
      PreferredDayTime: PreferredDayTimeMaintenanceConfiguration;
      Default?: never;
    }
  | { PreferredDayTime?: never; Default: DefaultMaintenanceConfiguration };
export const MaintenanceConfiguration = S.Union([
  S.Struct({ PreferredDayTime: PreferredDayTimeMaintenanceConfiguration }),
  S.Struct({ Default: DefaultMaintenanceConfiguration }),
]);
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
}
export const CreateRouterInputRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: RouterInputConfiguration,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    Tier: RouterInputTier,
    RegionName: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    TransitEncryption: S.optional(RouterInputTransitEncryption),
    MaintenanceConfiguration: S.optional(MaintenanceConfiguration),
    Tags: S.optional(__mapOfString),
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
        TransitEncryption: "transitEncryption",
        MaintenanceConfiguration: "maintenanceConfiguration",
        Tags: "tags",
        ClientToken: "clientToken",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/routerInput" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRouterInputRequest",
}) as any as S.Schema<CreateRouterInputRequest>;
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
export const RouterInputState = S.String;
export type RouterInputType =
  | "STANDARD"
  | "FAILOVER"
  | "MERGE"
  | "MEDIACONNECT_FLOW"
  | (string & {});
export const RouterInputType = S.String;
export interface RouterInputMessage {
  Code: string;
  Message: string;
}
export const RouterInputMessage = S.suspend(() =>
  S.Struct({ Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "RouterInputMessage",
}) as any as S.Schema<RouterInputMessage>;
export type RouterInputMessages = RouterInputMessage[];
export const RouterInputMessages = S.Array(RouterInputMessage);
export interface StandardRouterInputStreamDetails {
  SourceIpAddress?: string;
}
export const StandardRouterInputStreamDetails = S.suspend(() =>
  S.Struct({ SourceIpAddress: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceIpAddress: "sourceIpAddress" }),
  ),
).annotate({
  identifier: "StandardRouterInputStreamDetails",
}) as any as S.Schema<StandardRouterInputStreamDetails>;
export interface FailoverRouterInputIndexedStreamDetails {
  SourceIndex: number;
  SourceIpAddress?: string;
}
export const FailoverRouterInputIndexedStreamDetails = S.suspend(() =>
  S.Struct({
    SourceIndex: S.Number,
    SourceIpAddress: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      SourceIndex: "sourceIndex",
      SourceIpAddress: "sourceIpAddress",
    }),
  ),
).annotate({
  identifier: "FailoverRouterInputIndexedStreamDetails",
}) as any as S.Schema<FailoverRouterInputIndexedStreamDetails>;
export interface FailoverRouterInputStreamDetails {
  SourceIndexZeroStreamDetails: FailoverRouterInputIndexedStreamDetails;
  SourceIndexOneStreamDetails: FailoverRouterInputIndexedStreamDetails;
}
export const FailoverRouterInputStreamDetails = S.suspend(() =>
  S.Struct({
    SourceIndexZeroStreamDetails: FailoverRouterInputIndexedStreamDetails,
    SourceIndexOneStreamDetails: FailoverRouterInputIndexedStreamDetails,
  }).pipe(
    S.encodeKeys({
      SourceIndexZeroStreamDetails: "sourceIndexZeroStreamDetails",
      SourceIndexOneStreamDetails: "sourceIndexOneStreamDetails",
    }),
  ),
).annotate({
  identifier: "FailoverRouterInputStreamDetails",
}) as any as S.Schema<FailoverRouterInputStreamDetails>;
export interface MergeRouterInputIndexedStreamDetails {
  SourceIndex: number;
  SourceIpAddress?: string;
}
export const MergeRouterInputIndexedStreamDetails = S.suspend(() =>
  S.Struct({
    SourceIndex: S.Number,
    SourceIpAddress: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      SourceIndex: "sourceIndex",
      SourceIpAddress: "sourceIpAddress",
    }),
  ),
).annotate({
  identifier: "MergeRouterInputIndexedStreamDetails",
}) as any as S.Schema<MergeRouterInputIndexedStreamDetails>;
export interface MergeRouterInputStreamDetails {
  SourceIndexZeroStreamDetails: MergeRouterInputIndexedStreamDetails;
  SourceIndexOneStreamDetails: MergeRouterInputIndexedStreamDetails;
}
export const MergeRouterInputStreamDetails = S.suspend(() =>
  S.Struct({
    SourceIndexZeroStreamDetails: MergeRouterInputIndexedStreamDetails,
    SourceIndexOneStreamDetails: MergeRouterInputIndexedStreamDetails,
  }).pipe(
    S.encodeKeys({
      SourceIndexZeroStreamDetails: "sourceIndexZeroStreamDetails",
      SourceIndexOneStreamDetails: "sourceIndexOneStreamDetails",
    }),
  ),
).annotate({
  identifier: "MergeRouterInputStreamDetails",
}) as any as S.Schema<MergeRouterInputStreamDetails>;
export interface MediaConnectFlowRouterInputStreamDetails {}
export const MediaConnectFlowRouterInputStreamDetails = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "MediaConnectFlowRouterInputStreamDetails",
}) as any as S.Schema<MediaConnectFlowRouterInputStreamDetails>;
export type RouterInputStreamDetails =
  | {
      Standard: StandardRouterInputStreamDetails;
      Failover?: never;
      Merge?: never;
      MediaConnectFlow?: never;
    }
  | {
      Standard?: never;
      Failover: FailoverRouterInputStreamDetails;
      Merge?: never;
      MediaConnectFlow?: never;
    }
  | {
      Standard?: never;
      Failover?: never;
      Merge: MergeRouterInputStreamDetails;
      MediaConnectFlow?: never;
    }
  | {
      Standard?: never;
      Failover?: never;
      Merge?: never;
      MediaConnectFlow: MediaConnectFlowRouterInputStreamDetails;
    };
export const RouterInputStreamDetails = S.Union([
  S.Struct({ Standard: StandardRouterInputStreamDetails }),
  S.Struct({ Failover: FailoverRouterInputStreamDetails }),
  S.Struct({ Merge: MergeRouterInputStreamDetails }),
  S.Struct({ MediaConnectFlow: MediaConnectFlowRouterInputStreamDetails }),
]);
export type MaintenanceType = "PREFERRED_DAY_TIME" | "DEFAULT" | (string & {});
export const MaintenanceType = S.String;
export type MaintenanceScheduleType = "WINDOW" | (string & {});
export const MaintenanceScheduleType = S.String;
export interface WindowMaintenanceSchedule {
  Start: Date;
  End: Date;
  ScheduledTime: Date;
}
export const WindowMaintenanceSchedule = S.suspend(() =>
  S.Struct({
    Start: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    End: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ScheduledTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }).pipe(
    S.encodeKeys({
      Start: "start",
      End: "end",
      ScheduledTime: "scheduledTime",
    }),
  ),
).annotate({
  identifier: "WindowMaintenanceSchedule",
}) as any as S.Schema<WindowMaintenanceSchedule>;
export type MaintenanceSchedule = { Window: WindowMaintenanceSchedule };
export const MaintenanceSchedule = S.Union([
  S.Struct({ Window: WindowMaintenanceSchedule }),
]);
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
}
export const RouterInput = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    State: RouterInputState,
    InputType: RouterInputType,
    Configuration: RouterInputConfiguration,
    RoutedOutputs: S.Number,
    MaximumRoutedOutputs: S.optional(S.Number),
    RegionName: S.String,
    AvailabilityZone: S.String,
    MaximumBitrate: S.Number,
    Tier: RouterInputTier,
    RoutingScope: RoutingScope,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Messages: RouterInputMessages,
    TransitEncryption: RouterInputTransitEncryption,
    Tags: __mapOfString,
    StreamDetails: RouterInputStreamDetails,
    IpAddress: S.optional(S.String),
    MaintenanceType: MaintenanceType,
    MaintenanceConfiguration: MaintenanceConfiguration,
    MaintenanceScheduleType: S.optional(MaintenanceScheduleType),
    MaintenanceSchedule: S.optional(MaintenanceSchedule),
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
    }),
  ),
).annotate({ identifier: "RouterInput" }) as any as S.Schema<RouterInput>;
export interface CreateRouterInputResponse {
  RouterInput: RouterInput;
}
export const CreateRouterInputResponse = S.suspend(() =>
  S.Struct({ RouterInput: RouterInput }).pipe(
    S.encodeKeys({ RouterInput: "routerInput" }),
  ),
).annotate({
  identifier: "CreateRouterInputResponse",
}) as any as S.Schema<CreateRouterInputResponse>;
export interface GetRouterInputRequest {
  Arn: string;
}
export const GetRouterInputRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRouterInputRequest",
}) as any as S.Schema<GetRouterInputRequest>;
export interface GetRouterInputResponse {
  RouterInput: RouterInput;
}
export const GetRouterInputResponse = S.suspend(() =>
  S.Struct({ RouterInput: RouterInput }).pipe(
    S.encodeKeys({ RouterInput: "routerInput" }),
  ),
).annotate({
  identifier: "GetRouterInputResponse",
}) as any as S.Schema<GetRouterInputResponse>;
export interface UpdateRouterInputRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterInputConfiguration;
  MaximumBitrate?: number;
  RoutingScope?: RoutingScope;
  Tier?: RouterInputTier;
  TransitEncryption?: RouterInputTransitEncryption;
  MaintenanceConfiguration?: MaintenanceConfiguration;
}
export const UpdateRouterInputRequest = S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Name: S.optional(S.String),
    Configuration: S.optional(RouterInputConfiguration),
    MaximumBitrate: S.optional(S.Number),
    RoutingScope: S.optional(RoutingScope),
    Tier: S.optional(RouterInputTier),
    TransitEncryption: S.optional(RouterInputTransitEncryption),
    MaintenanceConfiguration: S.optional(MaintenanceConfiguration),
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
).annotate({
  identifier: "UpdateRouterInputRequest",
}) as any as S.Schema<UpdateRouterInputRequest>;
export interface UpdateRouterInputResponse {
  RouterInput: RouterInput;
}
export const UpdateRouterInputResponse = S.suspend(() =>
  S.Struct({ RouterInput: RouterInput }).pipe(
    S.encodeKeys({ RouterInput: "routerInput" }),
  ),
).annotate({
  identifier: "UpdateRouterInputResponse",
}) as any as S.Schema<UpdateRouterInputResponse>;
export interface DeleteRouterInputRequest {
  Arn: string;
}
export const DeleteRouterInputRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRouterInputRequest",
}) as any as S.Schema<DeleteRouterInputRequest>;
export interface DeleteRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export const DeleteRouterInputResponse = S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterInputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "DeleteRouterInputResponse",
}) as any as S.Schema<DeleteRouterInputResponse>;
export type StringList = string[];
export const StringList = S.Array(S.String);
export type RouterInputTypeList = RouterInputType[];
export const RouterInputTypeList = S.Array(RouterInputType);
export type RouterNetworkInterfaceArnList = string[];
export const RouterNetworkInterfaceArnList = S.Array(S.String);
export type RoutingScopeList = RoutingScope[];
export const RoutingScopeList = S.Array(RoutingScope);
export type RouterInputFilter =
  | {
      RegionNames: string[];
      InputTypes?: never;
      NameContains?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      InputTypes: RouterInputType[];
      NameContains?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      InputTypes?: never;
      NameContains: string[];
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      InputTypes?: never;
      NameContains?: never;
      NetworkInterfaceArns: string[];
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      InputTypes?: never;
      NameContains?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes: RoutingScope[];
    };
export const RouterInputFilter = S.Union([
  S.Struct({ RegionNames: StringList }),
  S.Struct({ InputTypes: RouterInputTypeList }),
  S.Struct({ NameContains: StringList }),
  S.Struct({ NetworkInterfaceArns: RouterNetworkInterfaceArnList }),
  S.Struct({ RoutingScopes: RoutingScopeList }),
]);
export type RouterInputFilterList = RouterInputFilter[];
export const RouterInputFilterList = S.Array(RouterInputFilter);
export interface ListRouterInputsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterInputFilter[];
}
export const ListRouterInputsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Filters: S.optional(RouterInputFilterList),
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
).annotate({
  identifier: "ListRouterInputsRequest",
}) as any as S.Schema<ListRouterInputsRequest>;
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
export const ListedRouterInput = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    InputType: RouterInputType,
    State: RouterInputState,
    RoutedOutputs: S.Number,
    RegionName: S.String,
    AvailabilityZone: S.String,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    MessageCount: S.Number,
    NetworkInterfaceArn: S.optional(S.String),
    MaintenanceScheduleType: S.optional(MaintenanceScheduleType),
    MaintenanceSchedule: S.optional(MaintenanceSchedule),
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
).annotate({
  identifier: "ListedRouterInput",
}) as any as S.Schema<ListedRouterInput>;
export type ListedRouterInputList = ListedRouterInput[];
export const ListedRouterInputList = S.Array(ListedRouterInput);
export interface ListRouterInputsResponse {
  RouterInputs: ListedRouterInput[];
  NextToken?: string;
}
export const ListRouterInputsResponse = S.suspend(() =>
  S.Struct({
    RouterInputs: ListedRouterInputList,
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ RouterInputs: "routerInputs", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListRouterInputsResponse",
}) as any as S.Schema<ListRouterInputsResponse>;
export interface GetRouterInputSourceMetadataRequest {
  Arn: string;
}
export const GetRouterInputSourceMetadataRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRouterInputSourceMetadataRequest",
}) as any as S.Schema<GetRouterInputSourceMetadataRequest>;
export type RouterInputMetadata = {
  TransportStreamMediaInfo: TransportMediaInfo;
};
export const RouterInputMetadata = S.Union([
  S.Struct({ TransportStreamMediaInfo: TransportMediaInfo }),
]);
export interface RouterInputSourceMetadataDetails {
  SourceMetadataMessages: RouterInputMessage[];
  Timestamp: Date;
  RouterInputMetadata?: RouterInputMetadata;
}
export const RouterInputSourceMetadataDetails = S.suspend(() =>
  S.Struct({
    SourceMetadataMessages: RouterInputMessages,
    Timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    RouterInputMetadata: S.optional(RouterInputMetadata),
  }).pipe(
    S.encodeKeys({
      SourceMetadataMessages: "sourceMetadataMessages",
      Timestamp: "timestamp",
      RouterInputMetadata: "routerInputMetadata",
    }),
  ),
).annotate({
  identifier: "RouterInputSourceMetadataDetails",
}) as any as S.Schema<RouterInputSourceMetadataDetails>;
export interface GetRouterInputSourceMetadataResponse {
  Arn: string;
  Name: string;
  SourceMetadataDetails: RouterInputSourceMetadataDetails;
}
export const GetRouterInputSourceMetadataResponse = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    SourceMetadataDetails: RouterInputSourceMetadataDetails,
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Name: "name",
      SourceMetadataDetails: "sourceMetadataDetails",
    }),
  ),
).annotate({
  identifier: "GetRouterInputSourceMetadataResponse",
}) as any as S.Schema<GetRouterInputSourceMetadataResponse>;
export interface GetRouterInputThumbnailRequest {
  Arn: string;
}
export const GetRouterInputThumbnailRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRouterInputThumbnailRequest",
}) as any as S.Schema<GetRouterInputThumbnailRequest>;
export interface RouterInputThumbnailDetails {
  ThumbnailMessages: RouterInputMessage[];
  Thumbnail?: Uint8Array;
  Timecode?: string;
  Timestamp?: Date;
}
export const RouterInputThumbnailDetails = S.suspend(() =>
  S.Struct({
    ThumbnailMessages: RouterInputMessages,
    Thumbnail: S.optional(T.Blob),
    Timecode: S.optional(S.String),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      ThumbnailMessages: "thumbnailMessages",
      Thumbnail: "thumbnail",
      Timecode: "timecode",
      Timestamp: "timestamp",
    }),
  ),
).annotate({
  identifier: "RouterInputThumbnailDetails",
}) as any as S.Schema<RouterInputThumbnailDetails>;
export interface GetRouterInputThumbnailResponse {
  Arn: string;
  Name: string;
  ThumbnailDetails: RouterInputThumbnailDetails;
}
export const GetRouterInputThumbnailResponse = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    ThumbnailDetails: RouterInputThumbnailDetails,
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Name: "name",
      ThumbnailDetails: "thumbnailDetails",
    }),
  ),
).annotate({
  identifier: "GetRouterInputThumbnailResponse",
}) as any as S.Schema<GetRouterInputThumbnailResponse>;
export interface RestartRouterInputRequest {
  Arn: string;
}
export const RestartRouterInputRequest = S.suspend(() =>
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
).annotate({
  identifier: "RestartRouterInputRequest",
}) as any as S.Schema<RestartRouterInputRequest>;
export interface RestartRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export const RestartRouterInputResponse = S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterInputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "RestartRouterInputResponse",
}) as any as S.Schema<RestartRouterInputResponse>;
export interface StartRouterInputRequest {
  Arn: string;
}
export const StartRouterInputRequest = S.suspend(() =>
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
).annotate({
  identifier: "StartRouterInputRequest",
}) as any as S.Schema<StartRouterInputRequest>;
export interface StartRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
  MaintenanceScheduleType: MaintenanceScheduleType;
  MaintenanceSchedule: MaintenanceSchedule;
}
export const StartRouterInputResponse = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    State: RouterInputState,
    MaintenanceScheduleType: MaintenanceScheduleType,
    MaintenanceSchedule: MaintenanceSchedule,
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Name: "name",
      State: "state",
      MaintenanceScheduleType: "maintenanceScheduleType",
      MaintenanceSchedule: "maintenanceSchedule",
    }),
  ),
).annotate({
  identifier: "StartRouterInputResponse",
}) as any as S.Schema<StartRouterInputResponse>;
export interface StopRouterInputRequest {
  Arn: string;
}
export const StopRouterInputRequest = S.suspend(() =>
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
).annotate({
  identifier: "StopRouterInputRequest",
}) as any as S.Schema<StopRouterInputRequest>;
export interface StopRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export const StopRouterInputResponse = S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterInputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "StopRouterInputResponse",
}) as any as S.Schema<StopRouterInputResponse>;
export type RouterInputArnList = string[];
export const RouterInputArnList = S.Array(S.String);
export interface BatchGetRouterInputRequest {
  Arns: string[];
}
export const BatchGetRouterInputRequest = S.suspend(() =>
  S.Struct({ Arns: RouterInputArnList.pipe(T.HttpQuery("arns")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerInputs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetRouterInputRequest",
}) as any as S.Schema<BatchGetRouterInputRequest>;
export type RouterInputList = RouterInput[];
export const RouterInputList = S.Array(RouterInput);
export interface BatchGetRouterInputError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export const BatchGetRouterInputError_ = S.suspend(() =>
  S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "BatchGetRouterInputError",
}) as any as S.Schema<BatchGetRouterInputError_>;
export type BatchGetRouterInputErrorList = BatchGetRouterInputError_[];
export const BatchGetRouterInputErrorList = S.Array(BatchGetRouterInputError_);
export interface BatchGetRouterInputResponse {
  RouterInputs: RouterInput[];
  Errors: BatchGetRouterInputError_[];
}
export const BatchGetRouterInputResponse = S.suspend(() =>
  S.Struct({
    RouterInputs: RouterInputList,
    Errors: BatchGetRouterInputErrorList,
  }).pipe(S.encodeKeys({ RouterInputs: "routerInputs", Errors: "errors" })),
).annotate({
  identifier: "BatchGetRouterInputResponse",
}) as any as S.Schema<BatchGetRouterInputResponse>;
export interface PublicRouterNetworkInterfaceRule {
  Cidr: string;
}
export const PublicRouterNetworkInterfaceRule = S.suspend(() =>
  S.Struct({ Cidr: S.String }).pipe(S.encodeKeys({ Cidr: "cidr" })),
).annotate({
  identifier: "PublicRouterNetworkInterfaceRule",
}) as any as S.Schema<PublicRouterNetworkInterfaceRule>;
export type NetworkInterfaceRuleList = PublicRouterNetworkInterfaceRule[];
export const NetworkInterfaceRuleList = S.Array(
  PublicRouterNetworkInterfaceRule,
);
export interface PublicRouterNetworkInterfaceConfiguration {
  AllowRules: PublicRouterNetworkInterfaceRule[];
}
export const PublicRouterNetworkInterfaceConfiguration = S.suspend(() =>
  S.Struct({ AllowRules: NetworkInterfaceRuleList }).pipe(
    S.encodeKeys({ AllowRules: "allowRules" }),
  ),
).annotate({
  identifier: "PublicRouterNetworkInterfaceConfiguration",
}) as any as S.Schema<PublicRouterNetworkInterfaceConfiguration>;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = S.Array(S.String);
export interface VpcRouterNetworkInterfaceConfiguration {
  SecurityGroupIds: string[];
  SubnetId: string;
}
export const VpcRouterNetworkInterfaceConfiguration = S.suspend(() =>
  S.Struct({ SecurityGroupIds: SecurityGroupIdList, SubnetId: S.String }).pipe(
    S.encodeKeys({
      SecurityGroupIds: "securityGroupIds",
      SubnetId: "subnetId",
    }),
  ),
).annotate({
  identifier: "VpcRouterNetworkInterfaceConfiguration",
}) as any as S.Schema<VpcRouterNetworkInterfaceConfiguration>;
export type RouterNetworkInterfaceConfiguration =
  | { Public: PublicRouterNetworkInterfaceConfiguration; Vpc?: never }
  | { Public?: never; Vpc: VpcRouterNetworkInterfaceConfiguration };
export const RouterNetworkInterfaceConfiguration = S.Union([
  S.Struct({ Public: PublicRouterNetworkInterfaceConfiguration }),
  S.Struct({ Vpc: VpcRouterNetworkInterfaceConfiguration }),
]);
export interface CreateRouterNetworkInterfaceRequest {
  Name: string;
  Configuration: RouterNetworkInterfaceConfiguration;
  RegionName?: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export const CreateRouterNetworkInterfaceRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: RouterNetworkInterfaceConfiguration,
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
).annotate({
  identifier: "CreateRouterNetworkInterfaceRequest",
}) as any as S.Schema<CreateRouterNetworkInterfaceRequest>;
export type RouterNetworkInterfaceState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "ERROR"
  | "RECOVERING"
  | (string & {});
export const RouterNetworkInterfaceState = S.String;
export type RouterNetworkInterfaceType = "PUBLIC" | "VPC" | (string & {});
export const RouterNetworkInterfaceType = S.String;
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
export const RouterNetworkInterface = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    State: RouterNetworkInterfaceState,
    NetworkInterfaceType: RouterNetworkInterfaceType,
    Configuration: RouterNetworkInterfaceConfiguration,
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
).annotate({
  identifier: "RouterNetworkInterface",
}) as any as S.Schema<RouterNetworkInterface>;
export interface CreateRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export const CreateRouterNetworkInterfaceResponse = S.suspend(() =>
  S.Struct({ RouterNetworkInterface: RouterNetworkInterface }).pipe(
    S.encodeKeys({ RouterNetworkInterface: "routerNetworkInterface" }),
  ),
).annotate({
  identifier: "CreateRouterNetworkInterfaceResponse",
}) as any as S.Schema<CreateRouterNetworkInterfaceResponse>;
export interface GetRouterNetworkInterfaceRequest {
  Arn: string;
}
export const GetRouterNetworkInterfaceRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRouterNetworkInterfaceRequest",
}) as any as S.Schema<GetRouterNetworkInterfaceRequest>;
export interface GetRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export const GetRouterNetworkInterfaceResponse = S.suspend(() =>
  S.Struct({ RouterNetworkInterface: RouterNetworkInterface }).pipe(
    S.encodeKeys({ RouterNetworkInterface: "routerNetworkInterface" }),
  ),
).annotate({
  identifier: "GetRouterNetworkInterfaceResponse",
}) as any as S.Schema<GetRouterNetworkInterfaceResponse>;
export interface UpdateRouterNetworkInterfaceRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterNetworkInterfaceConfiguration;
}
export const UpdateRouterNetworkInterfaceRequest = S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Name: S.optional(S.String),
    Configuration: S.optional(RouterNetworkInterfaceConfiguration),
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
).annotate({
  identifier: "UpdateRouterNetworkInterfaceRequest",
}) as any as S.Schema<UpdateRouterNetworkInterfaceRequest>;
export interface UpdateRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export const UpdateRouterNetworkInterfaceResponse = S.suspend(() =>
  S.Struct({ RouterNetworkInterface: RouterNetworkInterface }).pipe(
    S.encodeKeys({ RouterNetworkInterface: "routerNetworkInterface" }),
  ),
).annotate({
  identifier: "UpdateRouterNetworkInterfaceResponse",
}) as any as S.Schema<UpdateRouterNetworkInterfaceResponse>;
export interface DeleteRouterNetworkInterfaceRequest {
  Arn: string;
}
export const DeleteRouterNetworkInterfaceRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRouterNetworkInterfaceRequest",
}) as any as S.Schema<DeleteRouterNetworkInterfaceRequest>;
export interface DeleteRouterNetworkInterfaceResponse {
  Arn: string;
  Name: string;
  State: RouterNetworkInterfaceState;
}
export const DeleteRouterNetworkInterfaceResponse = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    State: RouterNetworkInterfaceState,
  }).pipe(S.encodeKeys({ Arn: "arn", Name: "name", State: "state" })),
).annotate({
  identifier: "DeleteRouterNetworkInterfaceResponse",
}) as any as S.Schema<DeleteRouterNetworkInterfaceResponse>;
export type RouterNetworkInterfaceTypeList = RouterNetworkInterfaceType[];
export const RouterNetworkInterfaceTypeList = S.Array(
  RouterNetworkInterfaceType,
);
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
export const RouterNetworkInterfaceFilter = S.Union([
  S.Struct({ RegionNames: StringList }),
  S.Struct({ NetworkInterfaceTypes: RouterNetworkInterfaceTypeList }),
  S.Struct({ NameContains: StringList }),
]);
export type RouterNetworkInterfaceFilterList = RouterNetworkInterfaceFilter[];
export const RouterNetworkInterfaceFilterList = S.Array(
  RouterNetworkInterfaceFilter,
);
export interface ListRouterNetworkInterfacesRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterNetworkInterfaceFilter[];
}
export const ListRouterNetworkInterfacesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Filters: S.optional(RouterNetworkInterfaceFilterList),
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
).annotate({
  identifier: "ListRouterNetworkInterfacesRequest",
}) as any as S.Schema<ListRouterNetworkInterfacesRequest>;
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
export const ListedRouterNetworkInterface = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    NetworkInterfaceType: RouterNetworkInterfaceType,
    AssociatedOutputCount: S.Number,
    AssociatedInputCount: S.Number,
    State: RouterNetworkInterfaceState,
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
).annotate({
  identifier: "ListedRouterNetworkInterface",
}) as any as S.Schema<ListedRouterNetworkInterface>;
export type ListedRouterNetworkInterfaceList = ListedRouterNetworkInterface[];
export const ListedRouterNetworkInterfaceList = S.Array(
  ListedRouterNetworkInterface,
);
export interface ListRouterNetworkInterfacesResponse {
  RouterNetworkInterfaces: ListedRouterNetworkInterface[];
  NextToken?: string;
}
export const ListRouterNetworkInterfacesResponse = S.suspend(() =>
  S.Struct({
    RouterNetworkInterfaces: ListedRouterNetworkInterfaceList,
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      RouterNetworkInterfaces: "routerNetworkInterfaces",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListRouterNetworkInterfacesResponse",
}) as any as S.Schema<ListRouterNetworkInterfacesResponse>;
export interface BatchGetRouterNetworkInterfaceRequest {
  Arns: string[];
}
export const BatchGetRouterNetworkInterfaceRequest = S.suspend(() =>
  S.Struct({
    Arns: RouterNetworkInterfaceArnList.pipe(T.HttpQuery("arns")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerNetworkInterfaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetRouterNetworkInterfaceRequest",
}) as any as S.Schema<BatchGetRouterNetworkInterfaceRequest>;
export type RouterNetworkInterfaceList = RouterNetworkInterface[];
export const RouterNetworkInterfaceList = S.Array(RouterNetworkInterface);
export interface BatchGetRouterNetworkInterfaceError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export const BatchGetRouterNetworkInterfaceError_ = S.suspend(() =>
  S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "BatchGetRouterNetworkInterfaceError",
}) as any as S.Schema<BatchGetRouterNetworkInterfaceError_>;
export type BatchGetRouterNetworkInterfaceErrorList =
  BatchGetRouterNetworkInterfaceError_[];
export const BatchGetRouterNetworkInterfaceErrorList = S.Array(
  BatchGetRouterNetworkInterfaceError_,
);
export interface BatchGetRouterNetworkInterfaceResponse {
  RouterNetworkInterfaces: RouterNetworkInterface[];
  Errors: BatchGetRouterNetworkInterfaceError_[];
}
export const BatchGetRouterNetworkInterfaceResponse = S.suspend(() =>
  S.Struct({
    RouterNetworkInterfaces: RouterNetworkInterfaceList,
    Errors: BatchGetRouterNetworkInterfaceErrorList,
  }).pipe(
    S.encodeKeys({
      RouterNetworkInterfaces: "routerNetworkInterfaces",
      Errors: "errors",
    }),
  ),
).annotate({
  identifier: "BatchGetRouterNetworkInterfaceResponse",
}) as any as S.Schema<BatchGetRouterNetworkInterfaceResponse>;
export interface RtpRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  ForwardErrorCorrection?: ForwardErrorCorrectionState;
}
export const RtpRouterOutputConfiguration = S.suspend(() =>
  S.Struct({
    DestinationAddress: S.String,
    DestinationPort: S.Number,
    ForwardErrorCorrection: S.optional(ForwardErrorCorrectionState),
  }).pipe(
    S.encodeKeys({
      DestinationAddress: "destinationAddress",
      DestinationPort: "destinationPort",
      ForwardErrorCorrection: "forwardErrorCorrection",
    }),
  ),
).annotate({
  identifier: "RtpRouterOutputConfiguration",
}) as any as S.Schema<RtpRouterOutputConfiguration>;
export interface RistRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
}
export const RistRouterOutputConfiguration = S.suspend(() =>
  S.Struct({ DestinationAddress: S.String, DestinationPort: S.Number }).pipe(
    S.encodeKeys({
      DestinationAddress: "destinationAddress",
      DestinationPort: "destinationPort",
    }),
  ),
).annotate({
  identifier: "RistRouterOutputConfiguration",
}) as any as S.Schema<RistRouterOutputConfiguration>;
export interface SrtEncryptionConfiguration {
  EncryptionKey: SecretsManagerEncryptionKeyConfiguration;
}
export const SrtEncryptionConfiguration = S.suspend(() =>
  S.Struct({ EncryptionKey: SecretsManagerEncryptionKeyConfiguration }).pipe(
    S.encodeKeys({ EncryptionKey: "encryptionKey" }),
  ),
).annotate({
  identifier: "SrtEncryptionConfiguration",
}) as any as S.Schema<SrtEncryptionConfiguration>;
export interface SrtListenerRouterOutputConfiguration {
  Port: number;
  MinimumLatencyMilliseconds: number;
  EncryptionConfiguration?: SrtEncryptionConfiguration;
}
export const SrtListenerRouterOutputConfiguration = S.suspend(() =>
  S.Struct({
    Port: S.Number,
    MinimumLatencyMilliseconds: S.Number,
    EncryptionConfiguration: S.optional(SrtEncryptionConfiguration),
  }).pipe(
    S.encodeKeys({
      Port: "port",
      MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
      EncryptionConfiguration: "encryptionConfiguration",
    }),
  ),
).annotate({
  identifier: "SrtListenerRouterOutputConfiguration",
}) as any as S.Schema<SrtListenerRouterOutputConfiguration>;
export interface SrtCallerRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string;
  EncryptionConfiguration?: SrtEncryptionConfiguration;
}
export const SrtCallerRouterOutputConfiguration = S.suspend(() =>
  S.Struct({
    DestinationAddress: S.String,
    DestinationPort: S.Number,
    MinimumLatencyMilliseconds: S.Number,
    StreamId: S.optional(S.String),
    EncryptionConfiguration: S.optional(SrtEncryptionConfiguration),
  }).pipe(
    S.encodeKeys({
      DestinationAddress: "destinationAddress",
      DestinationPort: "destinationPort",
      MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
      StreamId: "streamId",
      EncryptionConfiguration: "encryptionConfiguration",
    }),
  ),
).annotate({
  identifier: "SrtCallerRouterOutputConfiguration",
}) as any as S.Schema<SrtCallerRouterOutputConfiguration>;
export type RouterOutputProtocolConfiguration =
  | {
      Rtp: RtpRouterOutputConfiguration;
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist: RistRouterOutputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist?: never;
      SrtListener: SrtListenerRouterOutputConfiguration;
      SrtCaller?: never;
    }
  | {
      Rtp?: never;
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterOutputConfiguration;
    };
export const RouterOutputProtocolConfiguration = S.Union([
  S.Struct({ Rtp: RtpRouterOutputConfiguration }),
  S.Struct({ Rist: RistRouterOutputConfiguration }),
  S.Struct({ SrtListener: SrtListenerRouterOutputConfiguration }),
  S.Struct({ SrtCaller: SrtCallerRouterOutputConfiguration }),
]);
export type RouterOutputProtocol =
  | "RTP"
  | "RIST"
  | "SRT_CALLER"
  | "SRT_LISTENER"
  | (string & {});
export const RouterOutputProtocol = S.String;
export interface StandardRouterOutputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfiguration: RouterOutputProtocolConfiguration;
  Protocol?: RouterOutputProtocol;
}
export const StandardRouterOutputConfiguration = S.suspend(() =>
  S.Struct({
    NetworkInterfaceArn: S.String,
    ProtocolConfiguration: RouterOutputProtocolConfiguration,
    Protocol: S.optional(RouterOutputProtocol),
  }).pipe(
    S.encodeKeys({
      NetworkInterfaceArn: "networkInterfaceArn",
      ProtocolConfiguration: "protocolConfiguration",
      Protocol: "protocol",
    }),
  ),
).annotate({
  identifier: "StandardRouterOutputConfiguration",
}) as any as S.Schema<StandardRouterOutputConfiguration>;
export interface MediaConnectFlowRouterOutputConfiguration {
  FlowArn?: string;
  FlowSourceArn?: string;
  DestinationTransitEncryption: FlowTransitEncryption;
}
export const MediaConnectFlowRouterOutputConfiguration = S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowSourceArn: S.optional(S.String),
    DestinationTransitEncryption: FlowTransitEncryption,
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowSourceArn: "flowSourceArn",
      DestinationTransitEncryption: "destinationTransitEncryption",
    }),
  ),
).annotate({
  identifier: "MediaConnectFlowRouterOutputConfiguration",
}) as any as S.Schema<MediaConnectFlowRouterOutputConfiguration>;
export type MediaLiveInputPipelineId =
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export const MediaLiveInputPipelineId = S.String;
export type MediaLiveTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export const MediaLiveTransitEncryptionKeyType = S.String;
export type MediaLiveTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export const MediaLiveTransitEncryptionKeyConfiguration = S.Union([
  S.Struct({ SecretsManager: SecretsManagerEncryptionKeyConfiguration }),
  S.Struct({ Automatic: AutomaticEncryptionKeyConfiguration }),
]);
export interface MediaLiveTransitEncryption {
  EncryptionKeyType?: MediaLiveTransitEncryptionKeyType;
  EncryptionKeyConfiguration: MediaLiveTransitEncryptionKeyConfiguration;
}
export const MediaLiveTransitEncryption = S.suspend(() =>
  S.Struct({
    EncryptionKeyType: S.optional(MediaLiveTransitEncryptionKeyType),
    EncryptionKeyConfiguration: MediaLiveTransitEncryptionKeyConfiguration,
  }).pipe(
    S.encodeKeys({
      EncryptionKeyType: "encryptionKeyType",
      EncryptionKeyConfiguration: "encryptionKeyConfiguration",
    }),
  ),
).annotate({
  identifier: "MediaLiveTransitEncryption",
}) as any as S.Schema<MediaLiveTransitEncryption>;
export interface MediaLiveInputRouterOutputConfiguration {
  MediaLiveInputArn?: string;
  MediaLivePipelineId?: MediaLiveInputPipelineId;
  DestinationTransitEncryption: MediaLiveTransitEncryption;
}
export const MediaLiveInputRouterOutputConfiguration = S.suspend(() =>
  S.Struct({
    MediaLiveInputArn: S.optional(S.String),
    MediaLivePipelineId: S.optional(MediaLiveInputPipelineId),
    DestinationTransitEncryption: MediaLiveTransitEncryption,
  }).pipe(
    S.encodeKeys({
      MediaLiveInputArn: "mediaLiveInputArn",
      MediaLivePipelineId: "mediaLivePipelineId",
      DestinationTransitEncryption: "destinationTransitEncryption",
    }),
  ),
).annotate({
  identifier: "MediaLiveInputRouterOutputConfiguration",
}) as any as S.Schema<MediaLiveInputRouterOutputConfiguration>;
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
export const RouterOutputConfiguration = S.Union([
  S.Struct({ Standard: StandardRouterOutputConfiguration }),
  S.Struct({ MediaConnectFlow: MediaConnectFlowRouterOutputConfiguration }),
  S.Struct({ MediaLiveInput: MediaLiveInputRouterOutputConfiguration }),
]);
export type RouterOutputTier =
  | "OUTPUT_100"
  | "OUTPUT_50"
  | "OUTPUT_20"
  | (string & {});
export const RouterOutputTier = S.String;
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
  ClientToken?: string;
}
export const CreateRouterOutputRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: RouterOutputConfiguration,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    Tier: RouterOutputTier,
    RegionName: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    MaintenanceConfiguration: S.optional(MaintenanceConfiguration),
    Tags: S.optional(__mapOfString),
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
).annotate({
  identifier: "CreateRouterOutputRequest",
}) as any as S.Schema<CreateRouterOutputRequest>;
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
export const RouterOutputState = S.String;
export type RouterOutputType =
  | "STANDARD"
  | "MEDIACONNECT_FLOW"
  | "MEDIALIVE_INPUT"
  | (string & {});
export const RouterOutputType = S.String;
export type RouterOutputRoutedState =
  | "ROUTED"
  | "ROUTING"
  | "UNROUTED"
  | (string & {});
export const RouterOutputRoutedState = S.String;
export interface RouterOutputMessage {
  Code: string;
  Message: string;
}
export const RouterOutputMessage = S.suspend(() =>
  S.Struct({ Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "RouterOutputMessage",
}) as any as S.Schema<RouterOutputMessage>;
export type RouterOutputMessages = RouterOutputMessage[];
export const RouterOutputMessages = S.Array(RouterOutputMessage);
export interface StandardRouterOutputStreamDetails {
  DestinationIpAddress?: string;
}
export const StandardRouterOutputStreamDetails = S.suspend(() =>
  S.Struct({ DestinationIpAddress: S.optional(S.String) }).pipe(
    S.encodeKeys({ DestinationIpAddress: "destinationIpAddress" }),
  ),
).annotate({
  identifier: "StandardRouterOutputStreamDetails",
}) as any as S.Schema<StandardRouterOutputStreamDetails>;
export interface MediaConnectFlowRouterOutputStreamDetails {}
export const MediaConnectFlowRouterOutputStreamDetails = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "MediaConnectFlowRouterOutputStreamDetails",
}) as any as S.Schema<MediaConnectFlowRouterOutputStreamDetails>;
export interface MediaLiveInputRouterOutputStreamDetails {}
export const MediaLiveInputRouterOutputStreamDetails = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "MediaLiveInputRouterOutputStreamDetails",
}) as any as S.Schema<MediaLiveInputRouterOutputStreamDetails>;
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
export const RouterOutputStreamDetails = S.Union([
  S.Struct({ Standard: StandardRouterOutputStreamDetails }),
  S.Struct({ MediaConnectFlow: MediaConnectFlowRouterOutputStreamDetails }),
  S.Struct({ MediaLiveInput: MediaLiveInputRouterOutputStreamDetails }),
]);
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
}
export const RouterOutput = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    State: RouterOutputState,
    OutputType: RouterOutputType,
    Configuration: RouterOutputConfiguration,
    RoutedState: RouterOutputRoutedState,
    RegionName: S.String,
    AvailabilityZone: S.String,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    Tier: RouterOutputTier,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Messages: RouterOutputMessages,
    Tags: __mapOfString,
    StreamDetails: RouterOutputStreamDetails,
    IpAddress: S.optional(S.String),
    RoutedInputArn: S.optional(S.String),
    MaintenanceType: MaintenanceType,
    MaintenanceConfiguration: MaintenanceConfiguration,
    MaintenanceScheduleType: S.optional(MaintenanceScheduleType),
    MaintenanceSchedule: S.optional(MaintenanceSchedule),
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
    }),
  ),
).annotate({ identifier: "RouterOutput" }) as any as S.Schema<RouterOutput>;
export interface CreateRouterOutputResponse {
  RouterOutput: RouterOutput;
}
export const CreateRouterOutputResponse = S.suspend(() =>
  S.Struct({ RouterOutput: RouterOutput }).pipe(
    S.encodeKeys({ RouterOutput: "routerOutput" }),
  ),
).annotate({
  identifier: "CreateRouterOutputResponse",
}) as any as S.Schema<CreateRouterOutputResponse>;
export interface GetRouterOutputRequest {
  Arn: string;
}
export const GetRouterOutputRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRouterOutputRequest",
}) as any as S.Schema<GetRouterOutputRequest>;
export interface GetRouterOutputResponse {
  RouterOutput: RouterOutput;
}
export const GetRouterOutputResponse = S.suspend(() =>
  S.Struct({ RouterOutput: RouterOutput }).pipe(
    S.encodeKeys({ RouterOutput: "routerOutput" }),
  ),
).annotate({
  identifier: "GetRouterOutputResponse",
}) as any as S.Schema<GetRouterOutputResponse>;
export interface UpdateRouterOutputRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterOutputConfiguration;
  MaximumBitrate?: number;
  RoutingScope?: RoutingScope;
  Tier?: RouterOutputTier;
  MaintenanceConfiguration?: MaintenanceConfiguration;
}
export const UpdateRouterOutputRequest = S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Name: S.optional(S.String),
    Configuration: S.optional(RouterOutputConfiguration),
    MaximumBitrate: S.optional(S.Number),
    RoutingScope: S.optional(RoutingScope),
    Tier: S.optional(RouterOutputTier),
    MaintenanceConfiguration: S.optional(MaintenanceConfiguration),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Configuration: "configuration",
        MaximumBitrate: "maximumBitrate",
        RoutingScope: "routingScope",
        Tier: "tier",
        MaintenanceConfiguration: "maintenanceConfiguration",
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
).annotate({
  identifier: "UpdateRouterOutputRequest",
}) as any as S.Schema<UpdateRouterOutputRequest>;
export interface UpdateRouterOutputResponse {
  RouterOutput: RouterOutput;
}
export const UpdateRouterOutputResponse = S.suspend(() =>
  S.Struct({ RouterOutput: RouterOutput }).pipe(
    S.encodeKeys({ RouterOutput: "routerOutput" }),
  ),
).annotate({
  identifier: "UpdateRouterOutputResponse",
}) as any as S.Schema<UpdateRouterOutputResponse>;
export interface DeleteRouterOutputRequest {
  Arn: string;
}
export const DeleteRouterOutputRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRouterOutputRequest",
}) as any as S.Schema<DeleteRouterOutputRequest>;
export interface DeleteRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export const DeleteRouterOutputResponse = S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterOutputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "DeleteRouterOutputResponse",
}) as any as S.Schema<DeleteRouterOutputResponse>;
export type RouterOutputTypeList = RouterOutputType[];
export const RouterOutputTypeList = S.Array(RouterOutputType);
export type RouterOutputFilter =
  | {
      RegionNames: string[];
      OutputTypes?: never;
      NameContains?: never;
      NetworkInterfaceArns?: never;
      RoutedInputArns?: never;
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      OutputTypes: RouterOutputType[];
      NameContains?: never;
      NetworkInterfaceArns?: never;
      RoutedInputArns?: never;
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      OutputTypes?: never;
      NameContains: string[];
      NetworkInterfaceArns?: never;
      RoutedInputArns?: never;
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      OutputTypes?: never;
      NameContains?: never;
      NetworkInterfaceArns: string[];
      RoutedInputArns?: never;
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      OutputTypes?: never;
      NameContains?: never;
      NetworkInterfaceArns?: never;
      RoutedInputArns: string[];
      RoutingScopes?: never;
    }
  | {
      RegionNames?: never;
      OutputTypes?: never;
      NameContains?: never;
      NetworkInterfaceArns?: never;
      RoutedInputArns?: never;
      RoutingScopes: RoutingScope[];
    };
export const RouterOutputFilter = S.Union([
  S.Struct({ RegionNames: StringList }),
  S.Struct({ OutputTypes: RouterOutputTypeList }),
  S.Struct({ NameContains: StringList }),
  S.Struct({ NetworkInterfaceArns: RouterNetworkInterfaceArnList }),
  S.Struct({ RoutedInputArns: RouterInputArnList }),
  S.Struct({ RoutingScopes: RoutingScopeList }),
]);
export type RouterOutputFilterList = RouterOutputFilter[];
export const RouterOutputFilterList = S.Array(RouterOutputFilter);
export interface ListRouterOutputsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterOutputFilter[];
}
export const ListRouterOutputsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Filters: S.optional(RouterOutputFilterList),
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
).annotate({
  identifier: "ListRouterOutputsRequest",
}) as any as S.Schema<ListRouterOutputsRequest>;
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
export const ListedRouterOutput = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    OutputType: RouterOutputType,
    State: RouterOutputState,
    RoutedState: RouterOutputRoutedState,
    RegionName: S.String,
    AvailabilityZone: S.String,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    MessageCount: S.Number,
    RoutedInputArn: S.optional(S.String),
    NetworkInterfaceArn: S.optional(S.String),
    MaintenanceScheduleType: S.optional(MaintenanceScheduleType),
    MaintenanceSchedule: S.optional(MaintenanceSchedule),
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
).annotate({
  identifier: "ListedRouterOutput",
}) as any as S.Schema<ListedRouterOutput>;
export type ListedRouterOutputList = ListedRouterOutput[];
export const ListedRouterOutputList = S.Array(ListedRouterOutput);
export interface ListRouterOutputsResponse {
  RouterOutputs: ListedRouterOutput[];
  NextToken?: string;
}
export const ListRouterOutputsResponse = S.suspend(() =>
  S.Struct({
    RouterOutputs: ListedRouterOutputList,
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ RouterOutputs: "routerOutputs", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListRouterOutputsResponse",
}) as any as S.Schema<ListRouterOutputsResponse>;
export interface RestartRouterOutputRequest {
  Arn: string;
}
export const RestartRouterOutputRequest = S.suspend(() =>
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
).annotate({
  identifier: "RestartRouterOutputRequest",
}) as any as S.Schema<RestartRouterOutputRequest>;
export interface RestartRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export const RestartRouterOutputResponse = S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterOutputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "RestartRouterOutputResponse",
}) as any as S.Schema<RestartRouterOutputResponse>;
export interface StartRouterOutputRequest {
  Arn: string;
}
export const StartRouterOutputRequest = S.suspend(() =>
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
).annotate({
  identifier: "StartRouterOutputRequest",
}) as any as S.Schema<StartRouterOutputRequest>;
export interface StartRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
  MaintenanceScheduleType: MaintenanceScheduleType;
  MaintenanceSchedule: MaintenanceSchedule;
}
export const StartRouterOutputResponse = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    State: RouterOutputState,
    MaintenanceScheduleType: MaintenanceScheduleType,
    MaintenanceSchedule: MaintenanceSchedule,
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Name: "name",
      State: "state",
      MaintenanceScheduleType: "maintenanceScheduleType",
      MaintenanceSchedule: "maintenanceSchedule",
    }),
  ),
).annotate({
  identifier: "StartRouterOutputResponse",
}) as any as S.Schema<StartRouterOutputResponse>;
export interface StopRouterOutputRequest {
  Arn: string;
}
export const StopRouterOutputRequest = S.suspend(() =>
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
).annotate({
  identifier: "StopRouterOutputRequest",
}) as any as S.Schema<StopRouterOutputRequest>;
export interface StopRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export const StopRouterOutputResponse = S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterOutputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "StopRouterOutputResponse",
}) as any as S.Schema<StopRouterOutputResponse>;
export interface TakeRouterInputRequest {
  RouterOutputArn: string;
  RouterInputArn?: string;
}
export const TakeRouterInputRequest = S.suspend(() =>
  S.Struct({
    RouterOutputArn: S.String.pipe(T.HttpLabel("RouterOutputArn")),
    RouterInputArn: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ RouterInputArn: "routerInputArn" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/routerOutput/takeRouterInput/{RouterOutputArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "TakeRouterInputRequest",
}) as any as S.Schema<TakeRouterInputRequest>;
export interface TakeRouterInputResponse {
  RoutedState: RouterOutputRoutedState;
  RouterOutputArn: string;
  RouterOutputName: string;
  RouterInputArn?: string;
  RouterInputName?: string;
}
export const TakeRouterInputResponse = S.suspend(() =>
  S.Struct({
    RoutedState: RouterOutputRoutedState,
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
).annotate({
  identifier: "TakeRouterInputResponse",
}) as any as S.Schema<TakeRouterInputResponse>;
export type RouterOutputArnList = string[];
export const RouterOutputArnList = S.Array(S.String);
export interface BatchGetRouterOutputRequest {
  Arns: string[];
}
export const BatchGetRouterOutputRequest = S.suspend(() =>
  S.Struct({ Arns: RouterOutputArnList.pipe(T.HttpQuery("arns")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerOutputs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetRouterOutputRequest",
}) as any as S.Schema<BatchGetRouterOutputRequest>;
export type RouterOutputList = RouterOutput[];
export const RouterOutputList = S.Array(RouterOutput);
export interface BatchGetRouterOutputError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export const BatchGetRouterOutputError_ = S.suspend(() =>
  S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "BatchGetRouterOutputError",
}) as any as S.Schema<BatchGetRouterOutputError_>;
export type BatchGetRouterOutputErrorList = BatchGetRouterOutputError_[];
export const BatchGetRouterOutputErrorList = S.Array(
  BatchGetRouterOutputError_,
);
export interface BatchGetRouterOutputResponse {
  RouterOutputs: RouterOutput[];
  Errors: BatchGetRouterOutputError_[];
}
export const BatchGetRouterOutputResponse = S.suspend(() =>
  S.Struct({
    RouterOutputs: RouterOutputList,
    Errors: BatchGetRouterOutputErrorList,
  }).pipe(S.encodeKeys({ RouterOutputs: "routerOutputs", Errors: "errors" })),
).annotate({
  identifier: "BatchGetRouterOutputResponse",
}) as any as S.Schema<BatchGetRouterOutputResponse>;

//# Errors
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InternalServerErrorException extends S.TaggedErrorClass<InternalServerErrorException>()(
  "InternalServerErrorException",
  { Message: S.optional(S.String) },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  { Message: S.optional(S.String) },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { Message: S.optional(S.String) },
  T.Retryable(),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
  T.Retryable(),
).pipe(C.withConflictError, C.withRetryableError) {}
export class CreateBridge420Exception extends S.TaggedErrorClass<CreateBridge420Exception>()(
  "CreateBridge420Exception",
  { Message: S.optional(S.String) },
) {}
export class ForbiddenException extends S.TaggedErrorClass<ForbiddenException>()(
  "ForbiddenException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class CreateFlow420Exception extends S.TaggedErrorClass<CreateFlow420Exception>()(
  "CreateFlow420Exception",
  { Message: S.optional(S.String) },
) {}
export class AddFlowOutputs420Exception extends S.TaggedErrorClass<AddFlowOutputs420Exception>()(
  "AddFlowOutputs420Exception",
  { Message: S.optional(S.String) },
) {}
export class GrantFlowEntitlements420Exception extends S.TaggedErrorClass<GrantFlowEntitlements420Exception>()(
  "GrantFlowEntitlements420Exception",
  { Message: S.optional(S.String) },
) {}
export class CreateGateway420Exception extends S.TaggedErrorClass<CreateGateway420Exception>()(
  "CreateGateway420Exception",
  { Message: S.optional(S.String) },
) {}
export class RouterInputServiceQuotaExceededException extends S.TaggedErrorClass<RouterInputServiceQuotaExceededException>()(
  "RouterInputServiceQuotaExceededException",
  { Message: S.String },
) {}
export class RouterNetworkInterfaceServiceQuotaExceededException extends S.TaggedErrorClass<RouterNetworkInterfaceServiceQuotaExceededException>()(
  "RouterNetworkInterfaceServiceQuotaExceededException",
  { Message: S.String },
) {}
export class RouterOutputServiceQuotaExceededException extends S.TaggedErrorClass<RouterOutputServiceQuotaExceededException>()(
  "RouterOutputServiceQuotaExceededException",
  { Message: S.String },
) {}

//# Operations
export type ListEntitlementsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all entitlements that have been granted to this account. This request returns 20 results per page.
 */
export const listEntitlements: API.OperationMethod<
  ListEntitlementsRequest,
  ListEntitlementsResponse,
  ListEntitlementsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEntitlementsRequest,
  ) => stream.Stream<
    ListEntitlementsResponse,
    ListEntitlementsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEntitlementsRequest,
  ) => stream.Stream<
    ListedEntitlement,
    ListEntitlementsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEntitlementsRequest,
  output: ListEntitlementsResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entitlements",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForGlobalResourceRequest,
  output: ListTagsForGlobalResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
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
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
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
  TagGlobalResourceRequest,
  TagGlobalResourceResponse,
  TagGlobalResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagGlobalResourceRequest,
  output: TagGlobalResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
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
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
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
  UntagGlobalResourceRequest,
  UntagGlobalResourceResponse,
  UntagGlobalResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagGlobalResourceRequest,
  output: UntagGlobalResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
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
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
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
  CreateBridgeRequest,
  CreateBridgeResponse,
  CreateBridgeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBridgeRequest,
  output: CreateBridgeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    CreateBridge420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DescribeBridgeRequest,
  DescribeBridgeResponse,
  DescribeBridgeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeBridgeRequest,
  output: DescribeBridgeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateBridgeRequest,
  UpdateBridgeResponse,
  UpdateBridgeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBridgeRequest,
  output: UpdateBridgeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DeleteBridgeRequest,
  DeleteBridgeResponse,
  DeleteBridgeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBridgeRequest,
  output: DeleteBridgeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
export const listBridges: API.OperationMethod<
  ListBridgesRequest,
  ListBridgesResponse,
  ListBridgesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListBridgesRequest,
  ) => stream.Stream<
    ListBridgesResponse,
    ListBridgesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListBridgesRequest,
  ) => stream.Stream<
    ListedBridge,
    ListBridgesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBridgesRequest,
  output: ListBridgesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Bridges",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddBridgeOutputsRequest,
  output: AddBridgeOutputsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  AddBridgeSourcesRequest,
  AddBridgeSourcesResponse,
  AddBridgeSourcesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddBridgeSourcesRequest,
  output: AddBridgeSourcesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  RemoveBridgeOutputRequest,
  RemoveBridgeOutputResponse,
  RemoveBridgeOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveBridgeOutputRequest,
  output: RemoveBridgeOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  RemoveBridgeSourceRequest,
  RemoveBridgeSourceResponse,
  RemoveBridgeSourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveBridgeSourceRequest,
  output: RemoveBridgeSourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateBridgeOutputRequest,
  UpdateBridgeOutputResponse,
  UpdateBridgeOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBridgeOutputRequest,
  output: UpdateBridgeOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateBridgeSourceRequest,
  UpdateBridgeSourceResponse,
  UpdateBridgeSourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBridgeSourceRequest,
  output: UpdateBridgeSourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateBridgeStateRequest,
  UpdateBridgeStateResponse,
  UpdateBridgeStateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBridgeStateRequest,
  output: UpdateBridgeStateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  CreateFlowRequest,
  CreateFlowResponse,
  CreateFlowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFlowRequest,
  output: CreateFlowResponse,
  errors: [
    BadRequestException,
    CreateFlow420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DescribeFlowRequest,
  DescribeFlowResponse,
  DescribeFlowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFlowRequest,
  output: DescribeFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateFlowRequest,
  UpdateFlowResponse,
  UpdateFlowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFlowRequest,
  output: UpdateFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DeleteFlowRequest,
  DeleteFlowResponse,
  DeleteFlowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFlowRequest,
  output: DeleteFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
export type ListFlowsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of flows that are associated with this account. This request returns a paginated result.
 */
export const listFlows: API.OperationMethod<
  ListFlowsRequest,
  ListFlowsResponse,
  ListFlowsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFlowsRequest,
  ) => stream.Stream<
    ListFlowsResponse,
    ListFlowsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFlowsRequest,
  ) => stream.Stream<
    ListedFlow,
    ListFlowsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFlowsRequest,
  output: ListFlowsResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Flows",
    pageSize: "MaxResults",
  } as const,
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
  AddFlowMediaStreamsRequest,
  AddFlowMediaStreamsResponse,
  AddFlowMediaStreamsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddFlowMediaStreamsRequest,
  output: AddFlowMediaStreamsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  AddFlowOutputsRequest,
  AddFlowOutputsResponse,
  AddFlowOutputsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddFlowOutputsRequest,
  output: AddFlowOutputsResponse,
  errors: [
    AddFlowOutputs420Exception,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  AddFlowSourcesRequest,
  AddFlowSourcesResponse,
  AddFlowSourcesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddFlowSourcesRequest,
  output: AddFlowSourcesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  AddFlowVpcInterfacesRequest,
  AddFlowVpcInterfacesResponse,
  AddFlowVpcInterfacesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddFlowVpcInterfacesRequest,
  output: AddFlowVpcInterfacesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DescribeFlowSourceMetadataRequest,
  DescribeFlowSourceMetadataResponse,
  DescribeFlowSourceMetadataError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFlowSourceMetadataRequest,
  output: DescribeFlowSourceMetadataResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DescribeFlowSourceThumbnailRequest,
  DescribeFlowSourceThumbnailResponse,
  DescribeFlowSourceThumbnailError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFlowSourceThumbnailRequest,
  output: DescribeFlowSourceThumbnailResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  GrantFlowEntitlementsRequest,
  GrantFlowEntitlementsResponse,
  GrantFlowEntitlementsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GrantFlowEntitlementsRequest,
  output: GrantFlowEntitlementsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    GrantFlowEntitlements420Exception,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  RemoveFlowMediaStreamRequest,
  RemoveFlowMediaStreamResponse,
  RemoveFlowMediaStreamError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveFlowMediaStreamRequest,
  output: RemoveFlowMediaStreamResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  RemoveFlowOutputRequest,
  RemoveFlowOutputResponse,
  RemoveFlowOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveFlowOutputRequest,
  output: RemoveFlowOutputResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  RemoveFlowSourceRequest,
  RemoveFlowSourceResponse,
  RemoveFlowSourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveFlowSourceRequest,
  output: RemoveFlowSourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  RemoveFlowVpcInterfaceRequest,
  RemoveFlowVpcInterfaceResponse,
  RemoveFlowVpcInterfaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveFlowVpcInterfaceRequest,
  output: RemoveFlowVpcInterfaceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  RevokeFlowEntitlementRequest,
  RevokeFlowEntitlementResponse,
  RevokeFlowEntitlementError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RevokeFlowEntitlementRequest,
  output: RevokeFlowEntitlementResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  StartFlowRequest,
  StartFlowResponse,
  StartFlowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartFlowRequest,
  output: StartFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  StopFlowRequest,
  StopFlowResponse,
  StopFlowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopFlowRequest,
  output: StopFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateFlowEntitlementRequest,
  UpdateFlowEntitlementResponse,
  UpdateFlowEntitlementError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFlowEntitlementRequest,
  output: UpdateFlowEntitlementResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateFlowMediaStreamRequest,
  UpdateFlowMediaStreamResponse,
  UpdateFlowMediaStreamError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFlowMediaStreamRequest,
  output: UpdateFlowMediaStreamResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateFlowOutputRequest,
  UpdateFlowOutputResponse,
  UpdateFlowOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFlowOutputRequest,
  output: UpdateFlowOutputResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateFlowSourceRequest,
  UpdateFlowSourceResponse,
  UpdateFlowSourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFlowSourceRequest,
  output: UpdateFlowSourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DescribeGatewayInstanceRequest,
  DescribeGatewayInstanceResponse,
  DescribeGatewayInstanceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeGatewayInstanceRequest,
  output: DescribeGatewayInstanceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateGatewayInstanceRequest,
  UpdateGatewayInstanceResponse,
  UpdateGatewayInstanceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGatewayInstanceRequest,
  output: UpdateGatewayInstanceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DeregisterGatewayInstanceRequest,
  DeregisterGatewayInstanceResponse,
  DeregisterGatewayInstanceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeregisterGatewayInstanceRequest,
  output: DeregisterGatewayInstanceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listGatewayInstances: API.OperationMethod<
  ListGatewayInstancesRequest,
  ListGatewayInstancesResponse,
  ListGatewayInstancesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListGatewayInstancesRequest,
  ) => stream.Stream<
    ListGatewayInstancesResponse,
    ListGatewayInstancesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListGatewayInstancesRequest,
  ) => stream.Stream<
    ListedGatewayInstance,
    ListGatewayInstancesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGatewayInstancesRequest,
  output: ListGatewayInstancesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxResults",
  } as const,
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
  CreateGatewayRequest,
  CreateGatewayResponse,
  CreateGatewayError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateGatewayRequest,
  output: CreateGatewayResponse,
  errors: [
    BadRequestException,
    ConflictException,
    CreateGateway420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DescribeGatewayRequest,
  DescribeGatewayResponse,
  DescribeGatewayError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeGatewayRequest,
  output: DescribeGatewayResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DeleteGatewayRequest,
  DeleteGatewayResponse,
  DeleteGatewayError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteGatewayRequest,
  output: DeleteGatewayResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listGateways: API.OperationMethod<
  ListGatewaysRequest,
  ListGatewaysResponse,
  ListGatewaysError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListGatewaysRequest,
  ) => stream.Stream<
    ListGatewaysResponse,
    ListGatewaysError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListGatewaysRequest,
  ) => stream.Stream<
    ListedGateway,
    ListGatewaysError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGatewaysRequest,
  output: ListGatewaysResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Gateways",
    pageSize: "MaxResults",
  } as const,
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
  DescribeOfferingRequest,
  DescribeOfferingResponse,
  DescribeOfferingError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeOfferingRequest,
  output: DescribeOfferingResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
export type ListOfferingsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all offerings that are available to this account in the current Amazon Web Services Region. If you have an active reservation (which means you've purchased an offering that has already started and hasn't expired yet), your account isn't eligible for other offerings.
 */
export const listOfferings: API.OperationMethod<
  ListOfferingsRequest,
  ListOfferingsResponse,
  ListOfferingsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListOfferingsRequest,
  ) => stream.Stream<
    ListOfferingsResponse,
    ListOfferingsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListOfferingsRequest,
  ) => stream.Stream<
    Offering,
    ListOfferingsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOfferingsRequest,
  output: ListOfferingsResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Offerings",
    pageSize: "MaxResults",
  } as const,
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
  PurchaseOfferingRequest,
  PurchaseOfferingResponse,
  PurchaseOfferingError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PurchaseOfferingRequest,
  output: PurchaseOfferingResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DescribeReservationRequest,
  DescribeReservationResponse,
  DescribeReservationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeReservationRequest,
  output: DescribeReservationResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
export type ListReservationsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all reservations that have been purchased by this account in the current Amazon Web Services Region. This list includes all reservations in all states (such as active and expired).
 */
export const listReservations: API.OperationMethod<
  ListReservationsRequest,
  ListReservationsResponse,
  ListReservationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListReservationsRequest,
  ) => stream.Stream<
    ListReservationsResponse,
    ListReservationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReservationsRequest,
  ) => stream.Stream<
    Reservation,
    ListReservationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReservationsRequest,
  output: ListReservationsResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Reservations",
    pageSize: "MaxResults",
  } as const,
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
  CreateRouterInputRequest,
  CreateRouterInputResponse,
  CreateRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRouterInputRequest,
  output: CreateRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterInputServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  GetRouterInputRequest,
  GetRouterInputResponse,
  GetRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouterInputRequest,
  output: GetRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateRouterInputRequest,
  UpdateRouterInputResponse,
  UpdateRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRouterInputRequest,
  output: UpdateRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DeleteRouterInputRequest,
  DeleteRouterInputResponse,
  DeleteRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouterInputRequest,
  output: DeleteRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listRouterInputs: API.OperationMethod<
  ListRouterInputsRequest,
  ListRouterInputsResponse,
  ListRouterInputsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRouterInputsRequest,
  ) => stream.Stream<
    ListRouterInputsResponse,
    ListRouterInputsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRouterInputsRequest,
  ) => stream.Stream<
    ListedRouterInput,
    ListRouterInputsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRouterInputsRequest,
  output: ListRouterInputsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterInputs",
    pageSize: "MaxResults",
  } as const,
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
  GetRouterInputSourceMetadataRequest,
  GetRouterInputSourceMetadataResponse,
  GetRouterInputSourceMetadataError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouterInputSourceMetadataRequest,
  output: GetRouterInputSourceMetadataResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  GetRouterInputThumbnailRequest,
  GetRouterInputThumbnailResponse,
  GetRouterInputThumbnailError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouterInputThumbnailRequest,
  output: GetRouterInputThumbnailResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  RestartRouterInputRequest,
  RestartRouterInputResponse,
  RestartRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestartRouterInputRequest,
  output: RestartRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  StartRouterInputRequest,
  StartRouterInputResponse,
  StartRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartRouterInputRequest,
  output: StartRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  StopRouterInputRequest,
  StopRouterInputResponse,
  StopRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopRouterInputRequest,
  output: StopRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  BatchGetRouterInputRequest,
  BatchGetRouterInputResponse,
  BatchGetRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetRouterInputRequest,
  output: BatchGetRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  CreateRouterNetworkInterfaceRequest,
  CreateRouterNetworkInterfaceResponse,
  CreateRouterNetworkInterfaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRouterNetworkInterfaceRequest,
  output: CreateRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterNetworkInterfaceServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  GetRouterNetworkInterfaceRequest,
  GetRouterNetworkInterfaceResponse,
  GetRouterNetworkInterfaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouterNetworkInterfaceRequest,
  output: GetRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateRouterNetworkInterfaceRequest,
  UpdateRouterNetworkInterfaceResponse,
  UpdateRouterNetworkInterfaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRouterNetworkInterfaceRequest,
  output: UpdateRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DeleteRouterNetworkInterfaceRequest,
  DeleteRouterNetworkInterfaceResponse,
  DeleteRouterNetworkInterfaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouterNetworkInterfaceRequest,
  output: DeleteRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listRouterNetworkInterfaces: API.OperationMethod<
  ListRouterNetworkInterfacesRequest,
  ListRouterNetworkInterfacesResponse,
  ListRouterNetworkInterfacesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRouterNetworkInterfacesRequest,
  ) => stream.Stream<
    ListRouterNetworkInterfacesResponse,
    ListRouterNetworkInterfacesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRouterNetworkInterfacesRequest,
  ) => stream.Stream<
    ListedRouterNetworkInterface,
    ListRouterNetworkInterfacesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRouterNetworkInterfacesRequest,
  output: ListRouterNetworkInterfacesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterNetworkInterfaces",
    pageSize: "MaxResults",
  } as const,
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
  BatchGetRouterNetworkInterfaceRequest,
  BatchGetRouterNetworkInterfaceResponse,
  BatchGetRouterNetworkInterfaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetRouterNetworkInterfaceRequest,
  output: BatchGetRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  CreateRouterOutputRequest,
  CreateRouterOutputResponse,
  CreateRouterOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRouterOutputRequest,
  output: CreateRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterOutputServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  GetRouterOutputRequest,
  GetRouterOutputResponse,
  GetRouterOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouterOutputRequest,
  output: GetRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  UpdateRouterOutputRequest,
  UpdateRouterOutputResponse,
  UpdateRouterOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRouterOutputRequest,
  output: UpdateRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  DeleteRouterOutputRequest,
  DeleteRouterOutputResponse,
  DeleteRouterOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouterOutputRequest,
  output: DeleteRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listRouterOutputs: API.OperationMethod<
  ListRouterOutputsRequest,
  ListRouterOutputsResponse,
  ListRouterOutputsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRouterOutputsRequest,
  ) => stream.Stream<
    ListRouterOutputsResponse,
    ListRouterOutputsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRouterOutputsRequest,
  ) => stream.Stream<
    ListedRouterOutput,
    ListRouterOutputsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRouterOutputsRequest,
  output: ListRouterOutputsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterOutputs",
    pageSize: "MaxResults",
  } as const,
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
  RestartRouterOutputRequest,
  RestartRouterOutputResponse,
  RestartRouterOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestartRouterOutputRequest,
  output: RestartRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  StartRouterOutputRequest,
  StartRouterOutputResponse,
  StartRouterOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartRouterOutputRequest,
  output: StartRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  StopRouterOutputRequest,
  StopRouterOutputResponse,
  StopRouterOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopRouterOutputRequest,
  output: StopRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  TakeRouterInputRequest,
  TakeRouterInputResponse,
  TakeRouterInputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TakeRouterInputRequest,
  output: TakeRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  BatchGetRouterOutputRequest,
  BatchGetRouterOutputResponse,
  BatchGetRouterOutputError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetRouterOutputRequest,
  output: BatchGetRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
