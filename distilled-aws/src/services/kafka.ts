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
const svc = T.AwsApiService({ sdkId: "Kafka", serviceShapeName: "Kafka" });
const auth = T.AwsAuthSigv4({ name: "kafka" });
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
              `https://kafka-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://kafka.${Region}.amazonaws.com`);
            }
            return e(
              `https://kafka-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kafka.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://kafka.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type __stringMin5Max32 = string;
export type __integerMin1Max16384 = number;
export type __stringMin1Max64 = string;
export type __stringMin1Max128 = string;
export type __integerMin1Max15 = number;
export type __blob = Uint8Array;
export type __timestampIso8601 = Date;
export type __stringMax1024 = string;
export type __stringMax256 = string;
export type __stringMax249 = string;
export type __stringMin1Max128Pattern09AZaZ09AZaZ0 = string;
export type __integerMin1 = number;
export type MaxResults = number;

//# Schemas
export type __listOf__string = string[];
export const __listOf__string = S.Array(S.String);
export interface BatchAssociateScramSecretRequest {
  ClusterArn: string;
  SecretArnList?: string[];
}
export const BatchAssociateScramSecretRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    SecretArnList: S.optional(__listOf__string),
  })
    .pipe(S.encodeKeys({ SecretArnList: "secretArnList" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/clusters/{ClusterArn}/scram-secrets",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchAssociateScramSecretRequest",
}) as any as S.Schema<BatchAssociateScramSecretRequest>;
export interface UnprocessedScramSecret {
  ErrorCode?: string;
  ErrorMessage?: string;
  SecretArn?: string;
}
export const UnprocessedScramSecret = S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    SecretArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ErrorCode: "errorCode",
      ErrorMessage: "errorMessage",
      SecretArn: "secretArn",
    }),
  ),
).annotate({
  identifier: "UnprocessedScramSecret",
}) as any as S.Schema<UnprocessedScramSecret>;
export type __listOfUnprocessedScramSecret = UnprocessedScramSecret[];
export const __listOfUnprocessedScramSecret = S.Array(UnprocessedScramSecret);
export interface BatchAssociateScramSecretResponse {
  ClusterArn?: string;
  UnprocessedScramSecrets?: UnprocessedScramSecret[];
}
export const BatchAssociateScramSecretResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    UnprocessedScramSecrets: S.optional(__listOfUnprocessedScramSecret),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      UnprocessedScramSecrets: "unprocessedScramSecrets",
    }),
  ),
).annotate({
  identifier: "BatchAssociateScramSecretResponse",
}) as any as S.Schema<BatchAssociateScramSecretResponse>;
export interface BatchDisassociateScramSecretRequest {
  ClusterArn: string;
  SecretArnList?: string[];
}
export const BatchDisassociateScramSecretRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    SecretArnList: S.optional(__listOf__string),
  })
    .pipe(S.encodeKeys({ SecretArnList: "secretArnList" }))
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v1/clusters/{ClusterArn}/scram-secrets",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchDisassociateScramSecretRequest",
}) as any as S.Schema<BatchDisassociateScramSecretRequest>;
export interface BatchDisassociateScramSecretResponse {
  ClusterArn?: string;
  UnprocessedScramSecrets?: UnprocessedScramSecret[];
}
export const BatchDisassociateScramSecretResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    UnprocessedScramSecrets: S.optional(__listOfUnprocessedScramSecret),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      UnprocessedScramSecrets: "unprocessedScramSecrets",
    }),
  ),
).annotate({
  identifier: "BatchDisassociateScramSecretResponse",
}) as any as S.Schema<BatchDisassociateScramSecretResponse>;
export type BrokerAZDistribution = "DEFAULT" | (string & {});
export const BrokerAZDistribution = S.String;
export interface ProvisionedThroughput {
  Enabled?: boolean;
  VolumeThroughput?: number;
}
export const ProvisionedThroughput = S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    VolumeThroughput: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ Enabled: "enabled", VolumeThroughput: "volumeThroughput" }),
  ),
).annotate({
  identifier: "ProvisionedThroughput",
}) as any as S.Schema<ProvisionedThroughput>;
export interface EBSStorageInfo {
  ProvisionedThroughput?: ProvisionedThroughput;
  VolumeSize?: number;
}
export const EBSStorageInfo = S.suspend(() =>
  S.Struct({
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    VolumeSize: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      ProvisionedThroughput: "provisionedThroughput",
      VolumeSize: "volumeSize",
    }),
  ),
).annotate({ identifier: "EBSStorageInfo" }) as any as S.Schema<EBSStorageInfo>;
export interface StorageInfo {
  EbsStorageInfo?: EBSStorageInfo;
}
export const StorageInfo = S.suspend(() =>
  S.Struct({ EbsStorageInfo: S.optional(EBSStorageInfo) }).pipe(
    S.encodeKeys({ EbsStorageInfo: "ebsStorageInfo" }),
  ),
).annotate({ identifier: "StorageInfo" }) as any as S.Schema<StorageInfo>;
export interface PublicAccess {
  Type?: string;
}
export const PublicAccess = S.suspend(() =>
  S.Struct({ Type: S.optional(S.String) }).pipe(S.encodeKeys({ Type: "type" })),
).annotate({ identifier: "PublicAccess" }) as any as S.Schema<PublicAccess>;
export interface VpcConnectivityScram {
  Enabled?: boolean;
}
export const VpcConnectivityScram = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Enabled: "enabled" }),
  ),
).annotate({
  identifier: "VpcConnectivityScram",
}) as any as S.Schema<VpcConnectivityScram>;
export interface VpcConnectivityIam {
  Enabled?: boolean;
}
export const VpcConnectivityIam = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Enabled: "enabled" }),
  ),
).annotate({
  identifier: "VpcConnectivityIam",
}) as any as S.Schema<VpcConnectivityIam>;
export interface VpcConnectivitySasl {
  Scram?: VpcConnectivityScram;
  Iam?: VpcConnectivityIam;
}
export const VpcConnectivitySasl = S.suspend(() =>
  S.Struct({
    Scram: S.optional(VpcConnectivityScram),
    Iam: S.optional(VpcConnectivityIam),
  }).pipe(S.encodeKeys({ Scram: "scram", Iam: "iam" })),
).annotate({
  identifier: "VpcConnectivitySasl",
}) as any as S.Schema<VpcConnectivitySasl>;
export interface VpcConnectivityTls {
  Enabled?: boolean;
}
export const VpcConnectivityTls = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Enabled: "enabled" }),
  ),
).annotate({
  identifier: "VpcConnectivityTls",
}) as any as S.Schema<VpcConnectivityTls>;
export interface VpcConnectivityClientAuthentication {
  Sasl?: VpcConnectivitySasl;
  Tls?: VpcConnectivityTls;
}
export const VpcConnectivityClientAuthentication = S.suspend(() =>
  S.Struct({
    Sasl: S.optional(VpcConnectivitySasl),
    Tls: S.optional(VpcConnectivityTls),
  }).pipe(S.encodeKeys({ Sasl: "sasl", Tls: "tls" })),
).annotate({
  identifier: "VpcConnectivityClientAuthentication",
}) as any as S.Schema<VpcConnectivityClientAuthentication>;
export interface VpcConnectivity {
  ClientAuthentication?: VpcConnectivityClientAuthentication;
}
export const VpcConnectivity = S.suspend(() =>
  S.Struct({
    ClientAuthentication: S.optional(VpcConnectivityClientAuthentication),
  }).pipe(S.encodeKeys({ ClientAuthentication: "clientAuthentication" })),
).annotate({
  identifier: "VpcConnectivity",
}) as any as S.Schema<VpcConnectivity>;
export type NetworkType = "IPV4" | "DUAL" | (string & {});
export const NetworkType = S.String;
export interface ConnectivityInfo {
  PublicAccess?: PublicAccess;
  VpcConnectivity?: VpcConnectivity;
  NetworkType?: NetworkType;
}
export const ConnectivityInfo = S.suspend(() =>
  S.Struct({
    PublicAccess: S.optional(PublicAccess),
    VpcConnectivity: S.optional(VpcConnectivity),
    NetworkType: S.optional(NetworkType),
  }).pipe(
    S.encodeKeys({
      PublicAccess: "publicAccess",
      VpcConnectivity: "vpcConnectivity",
      NetworkType: "networkType",
    }),
  ),
).annotate({
  identifier: "ConnectivityInfo",
}) as any as S.Schema<ConnectivityInfo>;
export interface BrokerNodeGroupInfo {
  BrokerAZDistribution?: BrokerAZDistribution;
  ClientSubnets?: string[];
  InstanceType?: string;
  SecurityGroups?: string[];
  StorageInfo?: StorageInfo;
  ConnectivityInfo?: ConnectivityInfo;
  ZoneIds?: string[];
}
export const BrokerNodeGroupInfo = S.suspend(() =>
  S.Struct({
    BrokerAZDistribution: S.optional(BrokerAZDistribution),
    ClientSubnets: S.optional(__listOf__string),
    InstanceType: S.optional(S.String),
    SecurityGroups: S.optional(__listOf__string),
    StorageInfo: S.optional(StorageInfo),
    ConnectivityInfo: S.optional(ConnectivityInfo),
    ZoneIds: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      BrokerAZDistribution: "brokerAZDistribution",
      ClientSubnets: "clientSubnets",
      InstanceType: "instanceType",
      SecurityGroups: "securityGroups",
      StorageInfo: "storageInfo",
      ConnectivityInfo: "connectivityInfo",
      ZoneIds: "zoneIds",
    }),
  ),
).annotate({
  identifier: "BrokerNodeGroupInfo",
}) as any as S.Schema<BrokerNodeGroupInfo>;
export type RebalancingStatus = "PAUSED" | "ACTIVE" | (string & {});
export const RebalancingStatus = S.String;
export interface Rebalancing {
  Status?: RebalancingStatus;
}
export const Rebalancing = S.suspend(() =>
  S.Struct({ Status: S.optional(RebalancingStatus) }).pipe(
    S.encodeKeys({ Status: "status" }),
  ),
).annotate({ identifier: "Rebalancing" }) as any as S.Schema<Rebalancing>;
export interface Scram {
  Enabled?: boolean;
}
export const Scram = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Enabled: "enabled" }),
  ),
).annotate({ identifier: "Scram" }) as any as S.Schema<Scram>;
export interface Iam {
  Enabled?: boolean;
}
export const Iam = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Enabled: "enabled" }),
  ),
).annotate({ identifier: "Iam" }) as any as S.Schema<Iam>;
export interface Sasl {
  Scram?: Scram;
  Iam?: Iam;
}
export const Sasl = S.suspend(() =>
  S.Struct({ Scram: S.optional(Scram), Iam: S.optional(Iam) }).pipe(
    S.encodeKeys({ Scram: "scram", Iam: "iam" }),
  ),
).annotate({ identifier: "Sasl" }) as any as S.Schema<Sasl>;
export interface Tls {
  CertificateAuthorityArnList?: string[];
  Enabled?: boolean;
}
export const Tls = S.suspend(() =>
  S.Struct({
    CertificateAuthorityArnList: S.optional(__listOf__string),
    Enabled: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      CertificateAuthorityArnList: "certificateAuthorityArnList",
      Enabled: "enabled",
    }),
  ),
).annotate({ identifier: "Tls" }) as any as S.Schema<Tls>;
export interface Unauthenticated {
  Enabled?: boolean;
}
export const Unauthenticated = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Enabled: "enabled" }),
  ),
).annotate({
  identifier: "Unauthenticated",
}) as any as S.Schema<Unauthenticated>;
export interface ClientAuthentication {
  Sasl?: Sasl;
  Tls?: Tls;
  Unauthenticated?: Unauthenticated;
}
export const ClientAuthentication = S.suspend(() =>
  S.Struct({
    Sasl: S.optional(Sasl),
    Tls: S.optional(Tls),
    Unauthenticated: S.optional(Unauthenticated),
  }).pipe(
    S.encodeKeys({
      Sasl: "sasl",
      Tls: "tls",
      Unauthenticated: "unauthenticated",
    }),
  ),
).annotate({
  identifier: "ClientAuthentication",
}) as any as S.Schema<ClientAuthentication>;
export interface ConfigurationInfo {
  Arn?: string;
  Revision?: number;
}
export const ConfigurationInfo = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Revision: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Arn: "arn", Revision: "revision" }),
  ),
).annotate({
  identifier: "ConfigurationInfo",
}) as any as S.Schema<ConfigurationInfo>;
export interface EncryptionAtRest {
  DataVolumeKMSKeyId?: string;
}
export const EncryptionAtRest = S.suspend(() =>
  S.Struct({ DataVolumeKMSKeyId: S.optional(S.String) }).pipe(
    S.encodeKeys({ DataVolumeKMSKeyId: "dataVolumeKMSKeyId" }),
  ),
).annotate({
  identifier: "EncryptionAtRest",
}) as any as S.Schema<EncryptionAtRest>;
export type ClientBroker =
  | "TLS"
  | "TLS_PLAINTEXT"
  | "PLAINTEXT"
  | (string & {});
export const ClientBroker = S.String;
export interface EncryptionInTransit {
  ClientBroker?: ClientBroker;
  InCluster?: boolean;
}
export const EncryptionInTransit = S.suspend(() =>
  S.Struct({
    ClientBroker: S.optional(ClientBroker),
    InCluster: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({ ClientBroker: "clientBroker", InCluster: "inCluster" }),
  ),
).annotate({
  identifier: "EncryptionInTransit",
}) as any as S.Schema<EncryptionInTransit>;
export interface EncryptionInfo {
  EncryptionAtRest?: EncryptionAtRest;
  EncryptionInTransit?: EncryptionInTransit;
}
export const EncryptionInfo = S.suspend(() =>
  S.Struct({
    EncryptionAtRest: S.optional(EncryptionAtRest),
    EncryptionInTransit: S.optional(EncryptionInTransit),
  }).pipe(
    S.encodeKeys({
      EncryptionAtRest: "encryptionAtRest",
      EncryptionInTransit: "encryptionInTransit",
    }),
  ),
).annotate({ identifier: "EncryptionInfo" }) as any as S.Schema<EncryptionInfo>;
export type EnhancedMonitoring =
  | "DEFAULT"
  | "PER_BROKER"
  | "PER_TOPIC_PER_BROKER"
  | "PER_TOPIC_PER_PARTITION"
  | (string & {});
export const EnhancedMonitoring = S.String;
export interface JmxExporterInfo {
  EnabledInBroker?: boolean;
}
export const JmxExporterInfo = S.suspend(() =>
  S.Struct({ EnabledInBroker: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ EnabledInBroker: "enabledInBroker" }),
  ),
).annotate({
  identifier: "JmxExporterInfo",
}) as any as S.Schema<JmxExporterInfo>;
export interface NodeExporterInfo {
  EnabledInBroker?: boolean;
}
export const NodeExporterInfo = S.suspend(() =>
  S.Struct({ EnabledInBroker: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ EnabledInBroker: "enabledInBroker" }),
  ),
).annotate({
  identifier: "NodeExporterInfo",
}) as any as S.Schema<NodeExporterInfo>;
export interface PrometheusInfo {
  JmxExporter?: JmxExporterInfo;
  NodeExporter?: NodeExporterInfo;
}
export const PrometheusInfo = S.suspend(() =>
  S.Struct({
    JmxExporter: S.optional(JmxExporterInfo),
    NodeExporter: S.optional(NodeExporterInfo),
  }).pipe(
    S.encodeKeys({ JmxExporter: "jmxExporter", NodeExporter: "nodeExporter" }),
  ),
).annotate({ identifier: "PrometheusInfo" }) as any as S.Schema<PrometheusInfo>;
export interface OpenMonitoringInfo {
  Prometheus?: PrometheusInfo;
}
export const OpenMonitoringInfo = S.suspend(() =>
  S.Struct({ Prometheus: S.optional(PrometheusInfo) }).pipe(
    S.encodeKeys({ Prometheus: "prometheus" }),
  ),
).annotate({
  identifier: "OpenMonitoringInfo",
}) as any as S.Schema<OpenMonitoringInfo>;
export interface CloudWatchLogs {
  Enabled?: boolean;
  LogGroup?: string;
}
export const CloudWatchLogs = S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    LogGroup: S.optional(S.String),
  }).pipe(S.encodeKeys({ Enabled: "enabled", LogGroup: "logGroup" })),
).annotate({ identifier: "CloudWatchLogs" }) as any as S.Schema<CloudWatchLogs>;
export interface Firehose {
  DeliveryStream?: string;
  Enabled?: boolean;
}
export const Firehose = S.suspend(() =>
  S.Struct({
    DeliveryStream: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({ DeliveryStream: "deliveryStream", Enabled: "enabled" }),
  ),
).annotate({ identifier: "Firehose" }) as any as S.Schema<Firehose>;
export interface S3 {
  Bucket?: string;
  Enabled?: boolean;
  Prefix?: string;
}
export const S3 = S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    Prefix: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Bucket: "bucket", Enabled: "enabled", Prefix: "prefix" }),
  ),
).annotate({ identifier: "S3" }) as any as S.Schema<S3>;
export interface BrokerLogs {
  CloudWatchLogs?: CloudWatchLogs;
  Firehose?: Firehose;
  S3?: S3;
}
export const BrokerLogs = S.suspend(() =>
  S.Struct({
    CloudWatchLogs: S.optional(CloudWatchLogs),
    Firehose: S.optional(Firehose),
    S3: S.optional(S3),
  }).pipe(
    S.encodeKeys({
      CloudWatchLogs: "cloudWatchLogs",
      Firehose: "firehose",
      S3: "s3",
    }),
  ),
).annotate({ identifier: "BrokerLogs" }) as any as S.Schema<BrokerLogs>;
export interface LoggingInfo {
  BrokerLogs?: BrokerLogs;
}
export const LoggingInfo = S.suspend(() =>
  S.Struct({ BrokerLogs: S.optional(BrokerLogs) }).pipe(
    S.encodeKeys({ BrokerLogs: "brokerLogs" }),
  ),
).annotate({ identifier: "LoggingInfo" }) as any as S.Schema<LoggingInfo>;
export type __mapOf__string = { [key: string]: string | undefined };
export const __mapOf__string = S.Record(S.String, S.String.pipe(S.optional));
export type StorageMode = "LOCAL" | "TIERED" | (string & {});
export const StorageMode = S.String;
export interface CreateClusterRequest {
  BrokerNodeGroupInfo?: BrokerNodeGroupInfo;
  Rebalancing?: Rebalancing;
  ClientAuthentication?: ClientAuthentication;
  ClusterName?: string;
  ConfigurationInfo?: ConfigurationInfo;
  EncryptionInfo?: EncryptionInfo;
  EnhancedMonitoring?: EnhancedMonitoring;
  OpenMonitoring?: OpenMonitoringInfo;
  KafkaVersion?: string;
  LoggingInfo?: LoggingInfo;
  NumberOfBrokerNodes?: number;
  Tags?: { [key: string]: string | undefined };
  StorageMode?: StorageMode;
}
export const CreateClusterRequest = S.suspend(() =>
  S.Struct({
    BrokerNodeGroupInfo: S.optional(BrokerNodeGroupInfo),
    Rebalancing: S.optional(Rebalancing),
    ClientAuthentication: S.optional(ClientAuthentication),
    ClusterName: S.optional(S.String),
    ConfigurationInfo: S.optional(ConfigurationInfo),
    EncryptionInfo: S.optional(EncryptionInfo),
    EnhancedMonitoring: S.optional(EnhancedMonitoring),
    OpenMonitoring: S.optional(OpenMonitoringInfo),
    KafkaVersion: S.optional(S.String),
    LoggingInfo: S.optional(LoggingInfo),
    NumberOfBrokerNodes: S.optional(S.Number),
    Tags: S.optional(__mapOf__string),
    StorageMode: S.optional(StorageMode),
  })
    .pipe(
      S.encodeKeys({
        BrokerNodeGroupInfo: "brokerNodeGroupInfo",
        Rebalancing: "rebalancing",
        ClientAuthentication: "clientAuthentication",
        ClusterName: "clusterName",
        ConfigurationInfo: "configurationInfo",
        EncryptionInfo: "encryptionInfo",
        EnhancedMonitoring: "enhancedMonitoring",
        OpenMonitoring: "openMonitoring",
        KafkaVersion: "kafkaVersion",
        LoggingInfo: "loggingInfo",
        NumberOfBrokerNodes: "numberOfBrokerNodes",
        Tags: "tags",
        StorageMode: "storageMode",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/clusters" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateClusterRequest",
}) as any as S.Schema<CreateClusterRequest>;
export type ClusterState =
  | "ACTIVE"
  | "CREATING"
  | "DELETING"
  | "FAILED"
  | "HEALING"
  | "MAINTENANCE"
  | "REBOOTING_BROKER"
  | "UPDATING"
  | (string & {});
export const ClusterState = S.String;
export interface CreateClusterResponse {
  ClusterArn?: string;
  ClusterName?: string;
  State?: ClusterState;
}
export const CreateClusterResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterName: S.optional(S.String),
    State: S.optional(ClusterState),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterName: "clusterName",
      State: "state",
    }),
  ),
).annotate({
  identifier: "CreateClusterResponse",
}) as any as S.Schema<CreateClusterResponse>;
export interface ProvisionedRequest {
  BrokerNodeGroupInfo?: BrokerNodeGroupInfo;
  Rebalancing?: Rebalancing;
  ClientAuthentication?: ClientAuthentication;
  ConfigurationInfo?: ConfigurationInfo;
  EncryptionInfo?: EncryptionInfo;
  EnhancedMonitoring?: EnhancedMonitoring;
  OpenMonitoring?: OpenMonitoringInfo;
  KafkaVersion?: string;
  LoggingInfo?: LoggingInfo;
  NumberOfBrokerNodes?: number;
  StorageMode?: StorageMode;
}
export const ProvisionedRequest = S.suspend(() =>
  S.Struct({
    BrokerNodeGroupInfo: S.optional(BrokerNodeGroupInfo),
    Rebalancing: S.optional(Rebalancing),
    ClientAuthentication: S.optional(ClientAuthentication),
    ConfigurationInfo: S.optional(ConfigurationInfo),
    EncryptionInfo: S.optional(EncryptionInfo),
    EnhancedMonitoring: S.optional(EnhancedMonitoring),
    OpenMonitoring: S.optional(OpenMonitoringInfo),
    KafkaVersion: S.optional(S.String),
    LoggingInfo: S.optional(LoggingInfo),
    NumberOfBrokerNodes: S.optional(S.Number),
    StorageMode: S.optional(StorageMode),
  }).pipe(
    S.encodeKeys({
      BrokerNodeGroupInfo: "brokerNodeGroupInfo",
      Rebalancing: "rebalancing",
      ClientAuthentication: "clientAuthentication",
      ConfigurationInfo: "configurationInfo",
      EncryptionInfo: "encryptionInfo",
      EnhancedMonitoring: "enhancedMonitoring",
      OpenMonitoring: "openMonitoring",
      KafkaVersion: "kafkaVersion",
      LoggingInfo: "loggingInfo",
      NumberOfBrokerNodes: "numberOfBrokerNodes",
      StorageMode: "storageMode",
    }),
  ),
).annotate({
  identifier: "ProvisionedRequest",
}) as any as S.Schema<ProvisionedRequest>;
export interface VpcConfig {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export const VpcConfig = S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(__listOf__string),
    SecurityGroupIds: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      SubnetIds: "subnetIds",
      SecurityGroupIds: "securityGroupIds",
    }),
  ),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export type __listOfVpcConfig = VpcConfig[];
export const __listOfVpcConfig = S.Array(VpcConfig);
export interface ServerlessSasl {
  Iam?: Iam;
}
export const ServerlessSasl = S.suspend(() =>
  S.Struct({ Iam: S.optional(Iam) }).pipe(S.encodeKeys({ Iam: "iam" })),
).annotate({ identifier: "ServerlessSasl" }) as any as S.Schema<ServerlessSasl>;
export interface ServerlessClientAuthentication {
  Sasl?: ServerlessSasl;
}
export const ServerlessClientAuthentication = S.suspend(() =>
  S.Struct({ Sasl: S.optional(ServerlessSasl) }).pipe(
    S.encodeKeys({ Sasl: "sasl" }),
  ),
).annotate({
  identifier: "ServerlessClientAuthentication",
}) as any as S.Schema<ServerlessClientAuthentication>;
export interface ServerlessRequest {
  VpcConfigs?: VpcConfig[];
  ClientAuthentication?: ServerlessClientAuthentication;
}
export const ServerlessRequest = S.suspend(() =>
  S.Struct({
    VpcConfigs: S.optional(__listOfVpcConfig),
    ClientAuthentication: S.optional(ServerlessClientAuthentication),
  }).pipe(
    S.encodeKeys({
      VpcConfigs: "vpcConfigs",
      ClientAuthentication: "clientAuthentication",
    }),
  ),
).annotate({
  identifier: "ServerlessRequest",
}) as any as S.Schema<ServerlessRequest>;
export interface CreateClusterV2Request {
  ClusterName?: string;
  Tags?: { [key: string]: string | undefined };
  Provisioned?: ProvisionedRequest;
  Serverless?: ServerlessRequest;
}
export const CreateClusterV2Request = S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    Provisioned: S.optional(ProvisionedRequest),
    Serverless: S.optional(ServerlessRequest),
  })
    .pipe(
      S.encodeKeys({
        ClusterName: "clusterName",
        Tags: "tags",
        Provisioned: "provisioned",
        Serverless: "serverless",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/api/v2/clusters" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateClusterV2Request",
}) as any as S.Schema<CreateClusterV2Request>;
export type ClusterType = "PROVISIONED" | "SERVERLESS" | (string & {});
export const ClusterType = S.String;
export interface CreateClusterV2Response {
  ClusterArn?: string;
  ClusterName?: string;
  State?: ClusterState;
  ClusterType?: ClusterType;
}
export const CreateClusterV2Response = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterName: S.optional(S.String),
    State: S.optional(ClusterState),
    ClusterType: S.optional(ClusterType),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterName: "clusterName",
      State: "state",
      ClusterType: "clusterType",
    }),
  ),
).annotate({
  identifier: "CreateClusterV2Response",
}) as any as S.Schema<CreateClusterV2Response>;
export interface CreateConfigurationRequest {
  Description?: string;
  KafkaVersions?: string[];
  Name?: string;
  ServerProperties?: Uint8Array;
}
export const CreateConfigurationRequest = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    KafkaVersions: S.optional(__listOf__string),
    Name: S.optional(S.String),
    ServerProperties: S.optional(T.Blob),
  })
    .pipe(
      S.encodeKeys({
        Description: "description",
        KafkaVersions: "kafkaVersions",
        Name: "name",
        ServerProperties: "serverProperties",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/configurations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateConfigurationRequest",
}) as any as S.Schema<CreateConfigurationRequest>;
export interface ConfigurationRevision {
  CreationTime?: Date;
  Description?: string;
  Revision?: number;
}
export const ConfigurationRevision = S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Revision: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      CreationTime: "creationTime",
      Description: "description",
      Revision: "revision",
    }),
  ),
).annotate({
  identifier: "ConfigurationRevision",
}) as any as S.Schema<ConfigurationRevision>;
export type ConfigurationState =
  | "ACTIVE"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const ConfigurationState = S.String;
export interface CreateConfigurationResponse {
  Arn?: string;
  CreationTime?: Date;
  LatestRevision?: ConfigurationRevision & {
    CreationTime: __timestampIso8601;
    Revision: number;
  };
  Name?: string;
  State?: ConfigurationState;
}
export const CreateConfigurationResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LatestRevision: S.optional(ConfigurationRevision),
    Name: S.optional(S.String),
    State: S.optional(ConfigurationState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreationTime: "creationTime",
      LatestRevision: "latestRevision",
      Name: "name",
      State: "state",
    }),
  ),
).annotate({
  identifier: "CreateConfigurationResponse",
}) as any as S.Schema<CreateConfigurationResponse>;
export interface AmazonMskCluster {
  MskClusterArn?: string;
}
export const AmazonMskCluster = S.suspend(() =>
  S.Struct({ MskClusterArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ MskClusterArn: "mskClusterArn" }),
  ),
).annotate({
  identifier: "AmazonMskCluster",
}) as any as S.Schema<AmazonMskCluster>;
export interface KafkaClusterClientVpcConfig {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export const KafkaClusterClientVpcConfig = S.suspend(() =>
  S.Struct({
    SecurityGroupIds: S.optional(__listOf__string),
    SubnetIds: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      SecurityGroupIds: "securityGroupIds",
      SubnetIds: "subnetIds",
    }),
  ),
).annotate({
  identifier: "KafkaClusterClientVpcConfig",
}) as any as S.Schema<KafkaClusterClientVpcConfig>;
export interface KafkaCluster {
  AmazonMskCluster?: AmazonMskCluster;
  VpcConfig?: KafkaClusterClientVpcConfig;
}
export const KafkaCluster = S.suspend(() =>
  S.Struct({
    AmazonMskCluster: S.optional(AmazonMskCluster),
    VpcConfig: S.optional(KafkaClusterClientVpcConfig),
  }).pipe(
    S.encodeKeys({
      AmazonMskCluster: "amazonMskCluster",
      VpcConfig: "vpcConfig",
    }),
  ),
).annotate({ identifier: "KafkaCluster" }) as any as S.Schema<KafkaCluster>;
export type __listOfKafkaCluster = KafkaCluster[];
export const __listOfKafkaCluster = S.Array(KafkaCluster);
export type __listOf__stringMax256 = string[];
export const __listOf__stringMax256 = S.Array(S.String);
export interface ConsumerGroupReplication {
  ConsumerGroupsToExclude?: string[];
  ConsumerGroupsToReplicate?: string[];
  DetectAndCopyNewConsumerGroups?: boolean;
  SynchroniseConsumerGroupOffsets?: boolean;
}
export const ConsumerGroupReplication = S.suspend(() =>
  S.Struct({
    ConsumerGroupsToExclude: S.optional(__listOf__stringMax256),
    ConsumerGroupsToReplicate: S.optional(__listOf__stringMax256),
    DetectAndCopyNewConsumerGroups: S.optional(S.Boolean),
    SynchroniseConsumerGroupOffsets: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      ConsumerGroupsToExclude: "consumerGroupsToExclude",
      ConsumerGroupsToReplicate: "consumerGroupsToReplicate",
      DetectAndCopyNewConsumerGroups: "detectAndCopyNewConsumerGroups",
      SynchroniseConsumerGroupOffsets: "synchroniseConsumerGroupOffsets",
    }),
  ),
).annotate({
  identifier: "ConsumerGroupReplication",
}) as any as S.Schema<ConsumerGroupReplication>;
export type TargetCompressionType =
  | "NONE"
  | "GZIP"
  | "SNAPPY"
  | "LZ4"
  | "ZSTD"
  | (string & {});
export const TargetCompressionType = S.String;
export type ReplicationStartingPositionType =
  | "LATEST"
  | "EARLIEST"
  | (string & {});
export const ReplicationStartingPositionType = S.String;
export interface ReplicationStartingPosition {
  Type?: ReplicationStartingPositionType;
}
export const ReplicationStartingPosition = S.suspend(() =>
  S.Struct({ Type: S.optional(ReplicationStartingPositionType) }).pipe(
    S.encodeKeys({ Type: "type" }),
  ),
).annotate({
  identifier: "ReplicationStartingPosition",
}) as any as S.Schema<ReplicationStartingPosition>;
export type ReplicationTopicNameConfigurationType =
  | "PREFIXED_WITH_SOURCE_CLUSTER_ALIAS"
  | "IDENTICAL"
  | (string & {});
export const ReplicationTopicNameConfigurationType = S.String;
export interface ReplicationTopicNameConfiguration {
  Type?: ReplicationTopicNameConfigurationType;
}
export const ReplicationTopicNameConfiguration = S.suspend(() =>
  S.Struct({ Type: S.optional(ReplicationTopicNameConfigurationType) }).pipe(
    S.encodeKeys({ Type: "type" }),
  ),
).annotate({
  identifier: "ReplicationTopicNameConfiguration",
}) as any as S.Schema<ReplicationTopicNameConfiguration>;
export type __listOf__stringMax249 = string[];
export const __listOf__stringMax249 = S.Array(S.String);
export interface TopicReplication {
  CopyAccessControlListsForTopics?: boolean;
  CopyTopicConfigurations?: boolean;
  DetectAndCopyNewTopics?: boolean;
  StartingPosition?: ReplicationStartingPosition;
  TopicNameConfiguration?: ReplicationTopicNameConfiguration;
  TopicsToExclude?: string[];
  TopicsToReplicate?: string[];
}
export const TopicReplication = S.suspend(() =>
  S.Struct({
    CopyAccessControlListsForTopics: S.optional(S.Boolean),
    CopyTopicConfigurations: S.optional(S.Boolean),
    DetectAndCopyNewTopics: S.optional(S.Boolean),
    StartingPosition: S.optional(ReplicationStartingPosition),
    TopicNameConfiguration: S.optional(ReplicationTopicNameConfiguration),
    TopicsToExclude: S.optional(__listOf__stringMax249),
    TopicsToReplicate: S.optional(__listOf__stringMax249),
  }).pipe(
    S.encodeKeys({
      CopyAccessControlListsForTopics: "copyAccessControlListsForTopics",
      CopyTopicConfigurations: "copyTopicConfigurations",
      DetectAndCopyNewTopics: "detectAndCopyNewTopics",
      StartingPosition: "startingPosition",
      TopicNameConfiguration: "topicNameConfiguration",
      TopicsToExclude: "topicsToExclude",
      TopicsToReplicate: "topicsToReplicate",
    }),
  ),
).annotate({
  identifier: "TopicReplication",
}) as any as S.Schema<TopicReplication>;
export interface ReplicationInfo {
  ConsumerGroupReplication?: ConsumerGroupReplication;
  SourceKafkaClusterArn?: string;
  TargetCompressionType?: TargetCompressionType;
  TargetKafkaClusterArn?: string;
  TopicReplication?: TopicReplication;
}
export const ReplicationInfo = S.suspend(() =>
  S.Struct({
    ConsumerGroupReplication: S.optional(ConsumerGroupReplication),
    SourceKafkaClusterArn: S.optional(S.String),
    TargetCompressionType: S.optional(TargetCompressionType),
    TargetKafkaClusterArn: S.optional(S.String),
    TopicReplication: S.optional(TopicReplication),
  }).pipe(
    S.encodeKeys({
      ConsumerGroupReplication: "consumerGroupReplication",
      SourceKafkaClusterArn: "sourceKafkaClusterArn",
      TargetCompressionType: "targetCompressionType",
      TargetKafkaClusterArn: "targetKafkaClusterArn",
      TopicReplication: "topicReplication",
    }),
  ),
).annotate({
  identifier: "ReplicationInfo",
}) as any as S.Schema<ReplicationInfo>;
export type __listOfReplicationInfo = ReplicationInfo[];
export const __listOfReplicationInfo = S.Array(ReplicationInfo);
export interface CreateReplicatorRequest {
  Description?: string;
  KafkaClusters?: KafkaCluster[];
  ReplicationInfoList?: ReplicationInfo[];
  ReplicatorName?: string;
  ServiceExecutionRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateReplicatorRequest = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    KafkaClusters: S.optional(__listOfKafkaCluster),
    ReplicationInfoList: S.optional(__listOfReplicationInfo),
    ReplicatorName: S.optional(S.String),
    ServiceExecutionRoleArn: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(
      S.encodeKeys({
        Description: "description",
        KafkaClusters: "kafkaClusters",
        ReplicationInfoList: "replicationInfoList",
        ReplicatorName: "replicatorName",
        ServiceExecutionRoleArn: "serviceExecutionRoleArn",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/replication/v1/replicators" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateReplicatorRequest",
}) as any as S.Schema<CreateReplicatorRequest>;
export type ReplicatorState =
  | "RUNNING"
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const ReplicatorState = S.String;
export interface CreateReplicatorResponse {
  ReplicatorArn?: string;
  ReplicatorName?: string;
  ReplicatorState?: ReplicatorState;
}
export const CreateReplicatorResponse = S.suspend(() =>
  S.Struct({
    ReplicatorArn: S.optional(S.String),
    ReplicatorName: S.optional(S.String),
    ReplicatorState: S.optional(ReplicatorState),
  }).pipe(
    S.encodeKeys({
      ReplicatorArn: "replicatorArn",
      ReplicatorName: "replicatorName",
      ReplicatorState: "replicatorState",
    }),
  ),
).annotate({
  identifier: "CreateReplicatorResponse",
}) as any as S.Schema<CreateReplicatorResponse>;
export interface CreateTopicRequest {
  ClusterArn: string;
  TopicName?: string;
  PartitionCount?: number;
  ReplicationFactor?: number;
  Configs?: string;
}
export const CreateTopicRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    TopicName: S.optional(S.String),
    PartitionCount: S.optional(S.Number),
    ReplicationFactor: S.optional(S.Number),
    Configs: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        TopicName: "topicName",
        PartitionCount: "partitionCount",
        ReplicationFactor: "replicationFactor",
        Configs: "configs",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/clusters/{ClusterArn}/topics" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTopicRequest",
}) as any as S.Schema<CreateTopicRequest>;
export type TopicState =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | (string & {});
export const TopicState = S.String;
export interface CreateTopicResponse {
  TopicArn?: string;
  TopicName?: string;
  Status?: TopicState;
}
export const CreateTopicResponse = S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    TopicName: S.optional(S.String),
    Status: S.optional(TopicState),
  }).pipe(
    S.encodeKeys({
      TopicArn: "topicArn",
      TopicName: "topicName",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "CreateTopicResponse",
}) as any as S.Schema<CreateTopicResponse>;
export interface CreateVpcConnectionRequest {
  TargetClusterArn?: string;
  Authentication?: string;
  VpcId?: string;
  ClientSubnets?: string[];
  SecurityGroups?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateVpcConnectionRequest = S.suspend(() =>
  S.Struct({
    TargetClusterArn: S.optional(S.String),
    Authentication: S.optional(S.String),
    VpcId: S.optional(S.String),
    ClientSubnets: S.optional(__listOf__string),
    SecurityGroups: S.optional(__listOf__string),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(
      S.encodeKeys({
        TargetClusterArn: "targetClusterArn",
        Authentication: "authentication",
        VpcId: "vpcId",
        ClientSubnets: "clientSubnets",
        SecurityGroups: "securityGroups",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/vpc-connection" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateVpcConnectionRequest",
}) as any as S.Schema<CreateVpcConnectionRequest>;
export type VpcConnectionState =
  | "CREATING"
  | "AVAILABLE"
  | "INACTIVE"
  | "DEACTIVATING"
  | "DELETING"
  | "FAILED"
  | "REJECTED"
  | "REJECTING"
  | (string & {});
export const VpcConnectionState = S.String;
export interface CreateVpcConnectionResponse {
  VpcConnectionArn?: string;
  State?: VpcConnectionState;
  Authentication?: string;
  VpcId?: string;
  ClientSubnets?: string[];
  SecurityGroups?: string[];
  CreationTime?: Date;
  Tags?: { [key: string]: string | undefined };
}
export const CreateVpcConnectionResponse = S.suspend(() =>
  S.Struct({
    VpcConnectionArn: S.optional(S.String),
    State: S.optional(VpcConnectionState),
    Authentication: S.optional(S.String),
    VpcId: S.optional(S.String),
    ClientSubnets: S.optional(__listOf__string),
    SecurityGroups: S.optional(__listOf__string),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(__mapOf__string),
  }).pipe(
    S.encodeKeys({
      VpcConnectionArn: "vpcConnectionArn",
      State: "state",
      Authentication: "authentication",
      VpcId: "vpcId",
      ClientSubnets: "clientSubnets",
      SecurityGroups: "securityGroups",
      CreationTime: "creationTime",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateVpcConnectionResponse",
}) as any as S.Schema<CreateVpcConnectionResponse>;
export interface DeleteClusterRequest {
  ClusterArn: string;
  CurrentVersion?: string;
}
export const DeleteClusterRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String).pipe(T.HttpQuery("currentVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/clusters/{ClusterArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterRequest",
}) as any as S.Schema<DeleteClusterRequest>;
export interface DeleteClusterResponse {
  ClusterArn?: string;
  State?: ClusterState;
}
export const DeleteClusterResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    State: S.optional(ClusterState),
  }).pipe(S.encodeKeys({ ClusterArn: "clusterArn", State: "state" })),
).annotate({
  identifier: "DeleteClusterResponse",
}) as any as S.Schema<DeleteClusterResponse>;
export interface DeleteClusterPolicyRequest {
  ClusterArn: string;
}
export const DeleteClusterPolicyRequest = S.suspend(() =>
  S.Struct({ ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/clusters/{ClusterArn}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterPolicyRequest",
}) as any as S.Schema<DeleteClusterPolicyRequest>;
export interface DeleteClusterPolicyResponse {}
export const DeleteClusterPolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteClusterPolicyResponse",
}) as any as S.Schema<DeleteClusterPolicyResponse>;
export interface DeleteConfigurationRequest {
  Arn: string;
}
export const DeleteConfigurationRequest = S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/configurations/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationRequest",
}) as any as S.Schema<DeleteConfigurationRequest>;
export interface DeleteConfigurationResponse {
  Arn?: string;
  State?: ConfigurationState;
}
export const DeleteConfigurationResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    State: S.optional(ConfigurationState),
  }).pipe(S.encodeKeys({ Arn: "arn", State: "state" })),
).annotate({
  identifier: "DeleteConfigurationResponse",
}) as any as S.Schema<DeleteConfigurationResponse>;
export interface DeleteReplicatorRequest {
  CurrentVersion?: string;
  ReplicatorArn: string;
}
export const DeleteReplicatorRequest = S.suspend(() =>
  S.Struct({
    CurrentVersion: S.optional(S.String).pipe(T.HttpQuery("currentVersion")),
    ReplicatorArn: S.String.pipe(T.HttpLabel("ReplicatorArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/replication/v1/replicators/{ReplicatorArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReplicatorRequest",
}) as any as S.Schema<DeleteReplicatorRequest>;
export interface DeleteReplicatorResponse {
  ReplicatorArn?: string;
  ReplicatorState?: ReplicatorState;
}
export const DeleteReplicatorResponse = S.suspend(() =>
  S.Struct({
    ReplicatorArn: S.optional(S.String),
    ReplicatorState: S.optional(ReplicatorState),
  }).pipe(
    S.encodeKeys({
      ReplicatorArn: "replicatorArn",
      ReplicatorState: "replicatorState",
    }),
  ),
).annotate({
  identifier: "DeleteReplicatorResponse",
}) as any as S.Schema<DeleteReplicatorResponse>;
export interface DeleteTopicRequest {
  ClusterArn: string;
  TopicName: string;
}
export const DeleteTopicRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    TopicName: S.String.pipe(T.HttpLabel("TopicName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/clusters/{ClusterArn}/topics/{TopicName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTopicRequest",
}) as any as S.Schema<DeleteTopicRequest>;
export interface DeleteTopicResponse {
  TopicArn?: string;
  TopicName?: string;
  Status?: TopicState;
}
export const DeleteTopicResponse = S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    TopicName: S.optional(S.String),
    Status: S.optional(TopicState),
  }).pipe(
    S.encodeKeys({
      TopicArn: "topicArn",
      TopicName: "topicName",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "DeleteTopicResponse",
}) as any as S.Schema<DeleteTopicResponse>;
export interface DeleteVpcConnectionRequest {
  Arn: string;
}
export const DeleteVpcConnectionRequest = S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/vpc-connection/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVpcConnectionRequest",
}) as any as S.Schema<DeleteVpcConnectionRequest>;
export interface DeleteVpcConnectionResponse {
  VpcConnectionArn?: string;
  State?: VpcConnectionState;
}
export const DeleteVpcConnectionResponse = S.suspend(() =>
  S.Struct({
    VpcConnectionArn: S.optional(S.String),
    State: S.optional(VpcConnectionState),
  }).pipe(
    S.encodeKeys({ VpcConnectionArn: "vpcConnectionArn", State: "state" }),
  ),
).annotate({
  identifier: "DeleteVpcConnectionResponse",
}) as any as S.Schema<DeleteVpcConnectionResponse>;
export interface DescribeClusterRequest {
  ClusterArn: string;
}
export const DescribeClusterRequest = S.suspend(() =>
  S.Struct({ ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClusterRequest",
}) as any as S.Schema<DescribeClusterRequest>;
export interface BrokerSoftwareInfo {
  ConfigurationArn?: string;
  ConfigurationRevision?: number;
  KafkaVersion?: string;
}
export const BrokerSoftwareInfo = S.suspend(() =>
  S.Struct({
    ConfigurationArn: S.optional(S.String),
    ConfigurationRevision: S.optional(S.Number),
    KafkaVersion: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ConfigurationArn: "configurationArn",
      ConfigurationRevision: "configurationRevision",
      KafkaVersion: "kafkaVersion",
    }),
  ),
).annotate({
  identifier: "BrokerSoftwareInfo",
}) as any as S.Schema<BrokerSoftwareInfo>;
export interface JmxExporter {
  EnabledInBroker?: boolean;
}
export const JmxExporter = S.suspend(() =>
  S.Struct({ EnabledInBroker: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ EnabledInBroker: "enabledInBroker" }),
  ),
).annotate({ identifier: "JmxExporter" }) as any as S.Schema<JmxExporter>;
export interface NodeExporter {
  EnabledInBroker?: boolean;
}
export const NodeExporter = S.suspend(() =>
  S.Struct({ EnabledInBroker: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ EnabledInBroker: "enabledInBroker" }),
  ),
).annotate({ identifier: "NodeExporter" }) as any as S.Schema<NodeExporter>;
export interface Prometheus {
  JmxExporter?: JmxExporter;
  NodeExporter?: NodeExporter;
}
export const Prometheus = S.suspend(() =>
  S.Struct({
    JmxExporter: S.optional(JmxExporter),
    NodeExporter: S.optional(NodeExporter),
  }).pipe(
    S.encodeKeys({ JmxExporter: "jmxExporter", NodeExporter: "nodeExporter" }),
  ),
).annotate({ identifier: "Prometheus" }) as any as S.Schema<Prometheus>;
export interface OpenMonitoring {
  Prometheus?: Prometheus;
}
export const OpenMonitoring = S.suspend(() =>
  S.Struct({ Prometheus: S.optional(Prometheus) }).pipe(
    S.encodeKeys({ Prometheus: "prometheus" }),
  ),
).annotate({ identifier: "OpenMonitoring" }) as any as S.Schema<OpenMonitoring>;
export interface StateInfo {
  Code?: string;
  Message?: string;
}
export const StateInfo = S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }).pipe(
    S.encodeKeys({ Code: "code", Message: "message" }),
  ),
).annotate({ identifier: "StateInfo" }) as any as S.Schema<StateInfo>;
export type CustomerActionStatus =
  | "CRITICAL_ACTION_REQUIRED"
  | "ACTION_RECOMMENDED"
  | "NONE"
  | (string & {});
export const CustomerActionStatus = S.String;
export interface ClusterInfo {
  ActiveOperationArn?: string;
  BrokerNodeGroupInfo?: BrokerNodeGroupInfo;
  Rebalancing?: Rebalancing;
  ClientAuthentication?: ClientAuthentication;
  ClusterArn?: string;
  ClusterName?: string;
  CreationTime?: Date;
  CurrentBrokerSoftwareInfo?: BrokerSoftwareInfo;
  CurrentVersion?: string;
  EncryptionInfo?: EncryptionInfo;
  EnhancedMonitoring?: EnhancedMonitoring;
  OpenMonitoring?: OpenMonitoring;
  LoggingInfo?: LoggingInfo;
  NumberOfBrokerNodes?: number;
  State?: ClusterState;
  StateInfo?: StateInfo;
  Tags?: { [key: string]: string | undefined };
  ZookeeperConnectString?: string;
  ZookeeperConnectStringTls?: string;
  StorageMode?: StorageMode;
  CustomerActionStatus?: CustomerActionStatus;
}
export const ClusterInfo = S.suspend(() =>
  S.Struct({
    ActiveOperationArn: S.optional(S.String),
    BrokerNodeGroupInfo: S.optional(BrokerNodeGroupInfo),
    Rebalancing: S.optional(Rebalancing),
    ClientAuthentication: S.optional(ClientAuthentication),
    ClusterArn: S.optional(S.String),
    ClusterName: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CurrentBrokerSoftwareInfo: S.optional(BrokerSoftwareInfo),
    CurrentVersion: S.optional(S.String),
    EncryptionInfo: S.optional(EncryptionInfo),
    EnhancedMonitoring: S.optional(EnhancedMonitoring),
    OpenMonitoring: S.optional(OpenMonitoring),
    LoggingInfo: S.optional(LoggingInfo),
    NumberOfBrokerNodes: S.optional(S.Number),
    State: S.optional(ClusterState),
    StateInfo: S.optional(StateInfo),
    Tags: S.optional(__mapOf__string),
    ZookeeperConnectString: S.optional(S.String),
    ZookeeperConnectStringTls: S.optional(S.String),
    StorageMode: S.optional(StorageMode),
    CustomerActionStatus: S.optional(CustomerActionStatus),
  }).pipe(
    S.encodeKeys({
      ActiveOperationArn: "activeOperationArn",
      BrokerNodeGroupInfo: "brokerNodeGroupInfo",
      Rebalancing: "rebalancing",
      ClientAuthentication: "clientAuthentication",
      ClusterArn: "clusterArn",
      ClusterName: "clusterName",
      CreationTime: "creationTime",
      CurrentBrokerSoftwareInfo: "currentBrokerSoftwareInfo",
      CurrentVersion: "currentVersion",
      EncryptionInfo: "encryptionInfo",
      EnhancedMonitoring: "enhancedMonitoring",
      OpenMonitoring: "openMonitoring",
      LoggingInfo: "loggingInfo",
      NumberOfBrokerNodes: "numberOfBrokerNodes",
      State: "state",
      StateInfo: "stateInfo",
      Tags: "tags",
      ZookeeperConnectString: "zookeeperConnectString",
      ZookeeperConnectStringTls: "zookeeperConnectStringTls",
      StorageMode: "storageMode",
      CustomerActionStatus: "customerActionStatus",
    }),
  ),
).annotate({ identifier: "ClusterInfo" }) as any as S.Schema<ClusterInfo>;
export interface DescribeClusterResponse {
  ClusterInfo?: ClusterInfo & {
    BrokerNodeGroupInfo: BrokerNodeGroupInfo & {
      ClientSubnets: __listOf__string;
      InstanceType: __stringMin5Max32;
    };
    EncryptionInfo: EncryptionInfo & {
      EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
    };
    OpenMonitoring: OpenMonitoring & {
      Prometheus: Prometheus & {
        JmxExporter: JmxExporter & { EnabledInBroker: boolean };
        NodeExporter: NodeExporter & { EnabledInBroker: boolean };
      };
    };
    LoggingInfo: LoggingInfo & {
      BrokerLogs: BrokerLogs & {
        CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
        Firehose: Firehose & { Enabled: boolean };
        S3: S3 & { Enabled: boolean };
      };
    };
  };
}
export const DescribeClusterResponse = S.suspend(() =>
  S.Struct({ ClusterInfo: S.optional(ClusterInfo) }).pipe(
    S.encodeKeys({ ClusterInfo: "clusterInfo" }),
  ),
).annotate({
  identifier: "DescribeClusterResponse",
}) as any as S.Schema<DescribeClusterResponse>;
export interface DescribeClusterOperationRequest {
  ClusterOperationArn: string;
}
export const DescribeClusterOperationRequest = S.suspend(() =>
  S.Struct({
    ClusterOperationArn: S.String.pipe(T.HttpLabel("ClusterOperationArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/operations/{ClusterOperationArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClusterOperationRequest",
}) as any as S.Schema<DescribeClusterOperationRequest>;
export interface ErrorInfo {
  ErrorCode?: string;
  ErrorString?: string;
}
export const ErrorInfo = S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorString: S.optional(S.String),
  }).pipe(S.encodeKeys({ ErrorCode: "errorCode", ErrorString: "errorString" })),
).annotate({ identifier: "ErrorInfo" }) as any as S.Schema<ErrorInfo>;
export interface ClusterOperationStepInfo {
  StepStatus?: string;
}
export const ClusterOperationStepInfo = S.suspend(() =>
  S.Struct({ StepStatus: S.optional(S.String) }).pipe(
    S.encodeKeys({ StepStatus: "stepStatus" }),
  ),
).annotate({
  identifier: "ClusterOperationStepInfo",
}) as any as S.Schema<ClusterOperationStepInfo>;
export interface ClusterOperationStep {
  StepInfo?: ClusterOperationStepInfo;
  StepName?: string;
}
export const ClusterOperationStep = S.suspend(() =>
  S.Struct({
    StepInfo: S.optional(ClusterOperationStepInfo),
    StepName: S.optional(S.String),
  }).pipe(S.encodeKeys({ StepInfo: "stepInfo", StepName: "stepName" })),
).annotate({
  identifier: "ClusterOperationStep",
}) as any as S.Schema<ClusterOperationStep>;
export type __listOfClusterOperationStep = ClusterOperationStep[];
export const __listOfClusterOperationStep = S.Array(ClusterOperationStep);
export interface BrokerEBSVolumeInfo {
  KafkaBrokerNodeId?: string;
  ProvisionedThroughput?: ProvisionedThroughput;
  VolumeSizeGB?: number;
}
export const BrokerEBSVolumeInfo = S.suspend(() =>
  S.Struct({
    KafkaBrokerNodeId: S.optional(S.String),
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    VolumeSizeGB: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      KafkaBrokerNodeId: "kafkaBrokerNodeId",
      ProvisionedThroughput: "provisionedThroughput",
      VolumeSizeGB: "volumeSizeGB",
    }),
  ),
).annotate({
  identifier: "BrokerEBSVolumeInfo",
}) as any as S.Schema<BrokerEBSVolumeInfo>;
export type __listOfBrokerEBSVolumeInfo = BrokerEBSVolumeInfo[];
export const __listOfBrokerEBSVolumeInfo = S.Array(BrokerEBSVolumeInfo);
export type __listOf__double = number[];
export const __listOf__double = S.Array(S.Number);
export interface BrokerCountUpdateInfo {
  CreatedBrokerIds?: number[];
  DeletedBrokerIds?: number[];
}
export const BrokerCountUpdateInfo = S.suspend(() =>
  S.Struct({
    CreatedBrokerIds: S.optional(__listOf__double),
    DeletedBrokerIds: S.optional(__listOf__double),
  }).pipe(
    S.encodeKeys({
      CreatedBrokerIds: "createdBrokerIds",
      DeletedBrokerIds: "deletedBrokerIds",
    }),
  ),
).annotate({
  identifier: "BrokerCountUpdateInfo",
}) as any as S.Schema<BrokerCountUpdateInfo>;
export interface MutableClusterInfo {
  BrokerEBSVolumeInfo?: BrokerEBSVolumeInfo[];
  ConfigurationInfo?: ConfigurationInfo;
  NumberOfBrokerNodes?: number;
  EnhancedMonitoring?: EnhancedMonitoring;
  OpenMonitoring?: OpenMonitoring;
  KafkaVersion?: string;
  LoggingInfo?: LoggingInfo;
  InstanceType?: string;
  ClientAuthentication?: ClientAuthentication;
  EncryptionInfo?: EncryptionInfo;
  ConnectivityInfo?: ConnectivityInfo;
  StorageMode?: StorageMode;
  BrokerCountUpdateInfo?: BrokerCountUpdateInfo;
  Rebalancing?: Rebalancing;
}
export const MutableClusterInfo = S.suspend(() =>
  S.Struct({
    BrokerEBSVolumeInfo: S.optional(__listOfBrokerEBSVolumeInfo),
    ConfigurationInfo: S.optional(ConfigurationInfo),
    NumberOfBrokerNodes: S.optional(S.Number),
    EnhancedMonitoring: S.optional(EnhancedMonitoring),
    OpenMonitoring: S.optional(OpenMonitoring),
    KafkaVersion: S.optional(S.String),
    LoggingInfo: S.optional(LoggingInfo),
    InstanceType: S.optional(S.String),
    ClientAuthentication: S.optional(ClientAuthentication),
    EncryptionInfo: S.optional(EncryptionInfo),
    ConnectivityInfo: S.optional(ConnectivityInfo),
    StorageMode: S.optional(StorageMode),
    BrokerCountUpdateInfo: S.optional(BrokerCountUpdateInfo),
    Rebalancing: S.optional(Rebalancing),
  }).pipe(
    S.encodeKeys({
      BrokerEBSVolumeInfo: "brokerEBSVolumeInfo",
      ConfigurationInfo: "configurationInfo",
      NumberOfBrokerNodes: "numberOfBrokerNodes",
      EnhancedMonitoring: "enhancedMonitoring",
      OpenMonitoring: "openMonitoring",
      KafkaVersion: "kafkaVersion",
      LoggingInfo: "loggingInfo",
      InstanceType: "instanceType",
      ClientAuthentication: "clientAuthentication",
      EncryptionInfo: "encryptionInfo",
      ConnectivityInfo: "connectivityInfo",
      StorageMode: "storageMode",
      BrokerCountUpdateInfo: "brokerCountUpdateInfo",
      Rebalancing: "rebalancing",
    }),
  ),
).annotate({
  identifier: "MutableClusterInfo",
}) as any as S.Schema<MutableClusterInfo>;
export type UserIdentityType = "AWSACCOUNT" | "AWSSERVICE" | (string & {});
export const UserIdentityType = S.String;
export interface UserIdentity {
  Type?: UserIdentityType;
  PrincipalId?: string;
}
export const UserIdentity = S.suspend(() =>
  S.Struct({
    Type: S.optional(UserIdentityType),
    PrincipalId: S.optional(S.String),
  }).pipe(S.encodeKeys({ Type: "type", PrincipalId: "principalId" })),
).annotate({ identifier: "UserIdentity" }) as any as S.Schema<UserIdentity>;
export interface VpcConnectionInfo {
  VpcConnectionArn?: string;
  Owner?: string;
  UserIdentity?: UserIdentity;
  CreationTime?: Date;
}
export const VpcConnectionInfo = S.suspend(() =>
  S.Struct({
    VpcConnectionArn: S.optional(S.String),
    Owner: S.optional(S.String),
    UserIdentity: S.optional(UserIdentity),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      VpcConnectionArn: "vpcConnectionArn",
      Owner: "owner",
      UserIdentity: "userIdentity",
      CreationTime: "creationTime",
    }),
  ),
).annotate({
  identifier: "VpcConnectionInfo",
}) as any as S.Schema<VpcConnectionInfo>;
export interface ClusterOperationInfo {
  ClientRequestId?: string;
  ClusterArn?: string;
  CreationTime?: Date;
  EndTime?: Date;
  ErrorInfo?: ErrorInfo;
  OperationArn?: string;
  OperationState?: string;
  OperationSteps?: ClusterOperationStep[];
  OperationType?: string;
  SourceClusterInfo?: MutableClusterInfo;
  TargetClusterInfo?: MutableClusterInfo;
  VpcConnectionInfo?: VpcConnectionInfo;
}
export const ClusterOperationInfo = S.suspend(() =>
  S.Struct({
    ClientRequestId: S.optional(S.String),
    ClusterArn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ErrorInfo: S.optional(ErrorInfo),
    OperationArn: S.optional(S.String),
    OperationState: S.optional(S.String),
    OperationSteps: S.optional(__listOfClusterOperationStep),
    OperationType: S.optional(S.String),
    SourceClusterInfo: S.optional(MutableClusterInfo),
    TargetClusterInfo: S.optional(MutableClusterInfo),
    VpcConnectionInfo: S.optional(VpcConnectionInfo),
  }).pipe(
    S.encodeKeys({
      ClientRequestId: "clientRequestId",
      ClusterArn: "clusterArn",
      CreationTime: "creationTime",
      EndTime: "endTime",
      ErrorInfo: "errorInfo",
      OperationArn: "operationArn",
      OperationState: "operationState",
      OperationSteps: "operationSteps",
      OperationType: "operationType",
      SourceClusterInfo: "sourceClusterInfo",
      TargetClusterInfo: "targetClusterInfo",
      VpcConnectionInfo: "vpcConnectionInfo",
    }),
  ),
).annotate({
  identifier: "ClusterOperationInfo",
}) as any as S.Schema<ClusterOperationInfo>;
export interface DescribeClusterOperationResponse {
  ClusterOperationInfo?: ClusterOperationInfo & {
    SourceClusterInfo: MutableClusterInfo & {
      BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & {
        KafkaBrokerNodeId: string;
      })[];
      ConfigurationInfo: ConfigurationInfo & { Arn: string; Revision: number };
      OpenMonitoring: OpenMonitoring & {
        Prometheus: Prometheus & {
          JmxExporter: JmxExporter & { EnabledInBroker: boolean };
          NodeExporter: NodeExporter & { EnabledInBroker: boolean };
        };
      };
      LoggingInfo: LoggingInfo & {
        BrokerLogs: BrokerLogs & {
          CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
          Firehose: Firehose & { Enabled: boolean };
          S3: S3 & { Enabled: boolean };
        };
      };
      EncryptionInfo: EncryptionInfo & {
        EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
      };
    };
    TargetClusterInfo: MutableClusterInfo & {
      BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & {
        KafkaBrokerNodeId: string;
      })[];
      ConfigurationInfo: ConfigurationInfo & { Arn: string; Revision: number };
      OpenMonitoring: OpenMonitoring & {
        Prometheus: Prometheus & {
          JmxExporter: JmxExporter & { EnabledInBroker: boolean };
          NodeExporter: NodeExporter & { EnabledInBroker: boolean };
        };
      };
      LoggingInfo: LoggingInfo & {
        BrokerLogs: BrokerLogs & {
          CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
          Firehose: Firehose & { Enabled: boolean };
          S3: S3 & { Enabled: boolean };
        };
      };
      EncryptionInfo: EncryptionInfo & {
        EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
      };
    };
  };
}
export const DescribeClusterOperationResponse = S.suspend(() =>
  S.Struct({ ClusterOperationInfo: S.optional(ClusterOperationInfo) }).pipe(
    S.encodeKeys({ ClusterOperationInfo: "clusterOperationInfo" }),
  ),
).annotate({
  identifier: "DescribeClusterOperationResponse",
}) as any as S.Schema<DescribeClusterOperationResponse>;
export interface DescribeClusterOperationV2Request {
  ClusterOperationArn: string;
}
export const DescribeClusterOperationV2Request = S.suspend(() =>
  S.Struct({
    ClusterOperationArn: S.String.pipe(T.HttpLabel("ClusterOperationArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v2/operations/{ClusterOperationArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClusterOperationV2Request",
}) as any as S.Schema<DescribeClusterOperationV2Request>;
export interface ClusterOperationV2Provisioned {
  OperationSteps?: ClusterOperationStep[];
  SourceClusterInfo?: MutableClusterInfo;
  TargetClusterInfo?: MutableClusterInfo;
  VpcConnectionInfo?: VpcConnectionInfo;
}
export const ClusterOperationV2Provisioned = S.suspend(() =>
  S.Struct({
    OperationSteps: S.optional(__listOfClusterOperationStep),
    SourceClusterInfo: S.optional(MutableClusterInfo),
    TargetClusterInfo: S.optional(MutableClusterInfo),
    VpcConnectionInfo: S.optional(VpcConnectionInfo),
  }).pipe(
    S.encodeKeys({
      OperationSteps: "operationSteps",
      SourceClusterInfo: "sourceClusterInfo",
      TargetClusterInfo: "targetClusterInfo",
      VpcConnectionInfo: "vpcConnectionInfo",
    }),
  ),
).annotate({
  identifier: "ClusterOperationV2Provisioned",
}) as any as S.Schema<ClusterOperationV2Provisioned>;
export interface ServerlessConnectivityInfo {
  NetworkType?: NetworkType;
}
export const ServerlessConnectivityInfo = S.suspend(() =>
  S.Struct({ NetworkType: S.optional(NetworkType) }).pipe(
    S.encodeKeys({ NetworkType: "networkType" }),
  ),
).annotate({
  identifier: "ServerlessConnectivityInfo",
}) as any as S.Schema<ServerlessConnectivityInfo>;
export interface VpcConnectionInfoServerless {
  CreationTime?: Date;
  Owner?: string;
  UserIdentity?: UserIdentity;
  VpcConnectionArn?: string;
}
export const VpcConnectionInfoServerless = S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Owner: S.optional(S.String),
    UserIdentity: S.optional(UserIdentity),
    VpcConnectionArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CreationTime: "creationTime",
      Owner: "owner",
      UserIdentity: "userIdentity",
      VpcConnectionArn: "vpcConnectionArn",
    }),
  ),
).annotate({
  identifier: "VpcConnectionInfoServerless",
}) as any as S.Schema<VpcConnectionInfoServerless>;
export interface ClusterOperationV2Serverless {
  SourceClusterInfo?: ServerlessConnectivityInfo;
  TargetClusterInfo?: ServerlessConnectivityInfo;
  VpcConnectionInfo?: VpcConnectionInfoServerless;
}
export const ClusterOperationV2Serverless = S.suspend(() =>
  S.Struct({
    SourceClusterInfo: S.optional(ServerlessConnectivityInfo),
    TargetClusterInfo: S.optional(ServerlessConnectivityInfo),
    VpcConnectionInfo: S.optional(VpcConnectionInfoServerless),
  }).pipe(
    S.encodeKeys({
      SourceClusterInfo: "sourceClusterInfo",
      TargetClusterInfo: "targetClusterInfo",
      VpcConnectionInfo: "vpcConnectionInfo",
    }),
  ),
).annotate({
  identifier: "ClusterOperationV2Serverless",
}) as any as S.Schema<ClusterOperationV2Serverless>;
export interface ClusterOperationV2 {
  ClusterArn?: string;
  ClusterType?: ClusterType;
  StartTime?: Date;
  EndTime?: Date;
  ErrorInfo?: ErrorInfo;
  OperationArn?: string;
  OperationState?: string;
  OperationType?: string;
  Provisioned?: ClusterOperationV2Provisioned;
  Serverless?: ClusterOperationV2Serverless;
}
export const ClusterOperationV2 = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterType: S.optional(ClusterType),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ErrorInfo: S.optional(ErrorInfo),
    OperationArn: S.optional(S.String),
    OperationState: S.optional(S.String),
    OperationType: S.optional(S.String),
    Provisioned: S.optional(ClusterOperationV2Provisioned),
    Serverless: S.optional(ClusterOperationV2Serverless),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterType: "clusterType",
      StartTime: "startTime",
      EndTime: "endTime",
      ErrorInfo: "errorInfo",
      OperationArn: "operationArn",
      OperationState: "operationState",
      OperationType: "operationType",
      Provisioned: "provisioned",
      Serverless: "serverless",
    }),
  ),
).annotate({
  identifier: "ClusterOperationV2",
}) as any as S.Schema<ClusterOperationV2>;
export interface DescribeClusterOperationV2Response {
  ClusterOperationInfo?: ClusterOperationV2 & {
    Provisioned: ClusterOperationV2Provisioned & {
      SourceClusterInfo: MutableClusterInfo & {
        BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & {
          KafkaBrokerNodeId: string;
        })[];
        ConfigurationInfo: ConfigurationInfo & {
          Arn: string;
          Revision: number;
        };
        OpenMonitoring: OpenMonitoring & {
          Prometheus: Prometheus & {
            JmxExporter: JmxExporter & { EnabledInBroker: boolean };
            NodeExporter: NodeExporter & { EnabledInBroker: boolean };
          };
        };
        LoggingInfo: LoggingInfo & {
          BrokerLogs: BrokerLogs & {
            CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
            Firehose: Firehose & { Enabled: boolean };
            S3: S3 & { Enabled: boolean };
          };
        };
        EncryptionInfo: EncryptionInfo & {
          EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
        };
      };
      TargetClusterInfo: MutableClusterInfo & {
        BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & {
          KafkaBrokerNodeId: string;
        })[];
        ConfigurationInfo: ConfigurationInfo & {
          Arn: string;
          Revision: number;
        };
        OpenMonitoring: OpenMonitoring & {
          Prometheus: Prometheus & {
            JmxExporter: JmxExporter & { EnabledInBroker: boolean };
            NodeExporter: NodeExporter & { EnabledInBroker: boolean };
          };
        };
        LoggingInfo: LoggingInfo & {
          BrokerLogs: BrokerLogs & {
            CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
            Firehose: Firehose & { Enabled: boolean };
            S3: S3 & { Enabled: boolean };
          };
        };
        EncryptionInfo: EncryptionInfo & {
          EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
        };
      };
    };
  };
}
export const DescribeClusterOperationV2Response = S.suspend(() =>
  S.Struct({ ClusterOperationInfo: S.optional(ClusterOperationV2) }).pipe(
    S.encodeKeys({ ClusterOperationInfo: "clusterOperationInfo" }),
  ),
).annotate({
  identifier: "DescribeClusterOperationV2Response",
}) as any as S.Schema<DescribeClusterOperationV2Response>;
export interface DescribeClusterV2Request {
  ClusterArn: string;
}
export const DescribeClusterV2Request = S.suspend(() =>
  S.Struct({ ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/api/v2/clusters/{ClusterArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClusterV2Request",
}) as any as S.Schema<DescribeClusterV2Request>;
export interface Provisioned {
  BrokerNodeGroupInfo?: BrokerNodeGroupInfo;
  Rebalancing?: Rebalancing;
  CurrentBrokerSoftwareInfo?: BrokerSoftwareInfo;
  ClientAuthentication?: ClientAuthentication;
  EncryptionInfo?: EncryptionInfo;
  EnhancedMonitoring?: EnhancedMonitoring;
  OpenMonitoring?: OpenMonitoringInfo;
  LoggingInfo?: LoggingInfo;
  NumberOfBrokerNodes?: number;
  ZookeeperConnectString?: string;
  ZookeeperConnectStringTls?: string;
  StorageMode?: StorageMode;
  CustomerActionStatus?: CustomerActionStatus;
}
export const Provisioned = S.suspend(() =>
  S.Struct({
    BrokerNodeGroupInfo: S.optional(BrokerNodeGroupInfo),
    Rebalancing: S.optional(Rebalancing),
    CurrentBrokerSoftwareInfo: S.optional(BrokerSoftwareInfo),
    ClientAuthentication: S.optional(ClientAuthentication),
    EncryptionInfo: S.optional(EncryptionInfo),
    EnhancedMonitoring: S.optional(EnhancedMonitoring),
    OpenMonitoring: S.optional(OpenMonitoringInfo),
    LoggingInfo: S.optional(LoggingInfo),
    NumberOfBrokerNodes: S.optional(S.Number),
    ZookeeperConnectString: S.optional(S.String),
    ZookeeperConnectStringTls: S.optional(S.String),
    StorageMode: S.optional(StorageMode),
    CustomerActionStatus: S.optional(CustomerActionStatus),
  }).pipe(
    S.encodeKeys({
      BrokerNodeGroupInfo: "brokerNodeGroupInfo",
      Rebalancing: "rebalancing",
      CurrentBrokerSoftwareInfo: "currentBrokerSoftwareInfo",
      ClientAuthentication: "clientAuthentication",
      EncryptionInfo: "encryptionInfo",
      EnhancedMonitoring: "enhancedMonitoring",
      OpenMonitoring: "openMonitoring",
      LoggingInfo: "loggingInfo",
      NumberOfBrokerNodes: "numberOfBrokerNodes",
      ZookeeperConnectString: "zookeeperConnectString",
      ZookeeperConnectStringTls: "zookeeperConnectStringTls",
      StorageMode: "storageMode",
      CustomerActionStatus: "customerActionStatus",
    }),
  ),
).annotate({ identifier: "Provisioned" }) as any as S.Schema<Provisioned>;
export interface Serverless {
  VpcConfigs?: VpcConfig[];
  ClientAuthentication?: ServerlessClientAuthentication;
  ConnectivityInfo?: ServerlessConnectivityInfo;
}
export const Serverless = S.suspend(() =>
  S.Struct({
    VpcConfigs: S.optional(__listOfVpcConfig),
    ClientAuthentication: S.optional(ServerlessClientAuthentication),
    ConnectivityInfo: S.optional(ServerlessConnectivityInfo),
  }).pipe(
    S.encodeKeys({
      VpcConfigs: "vpcConfigs",
      ClientAuthentication: "clientAuthentication",
      ConnectivityInfo: "connectivityInfo",
    }),
  ),
).annotate({ identifier: "Serverless" }) as any as S.Schema<Serverless>;
export interface Cluster {
  ActiveOperationArn?: string;
  ClusterType?: ClusterType;
  ClusterArn?: string;
  ClusterName?: string;
  CreationTime?: Date;
  CurrentVersion?: string;
  State?: ClusterState;
  StateInfo?: StateInfo;
  Tags?: { [key: string]: string | undefined };
  Provisioned?: Provisioned;
  Serverless?: Serverless;
}
export const Cluster = S.suspend(() =>
  S.Struct({
    ActiveOperationArn: S.optional(S.String),
    ClusterType: S.optional(ClusterType),
    ClusterArn: S.optional(S.String),
    ClusterName: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CurrentVersion: S.optional(S.String),
    State: S.optional(ClusterState),
    StateInfo: S.optional(StateInfo),
    Tags: S.optional(__mapOf__string),
    Provisioned: S.optional(Provisioned),
    Serverless: S.optional(Serverless),
  }).pipe(
    S.encodeKeys({
      ActiveOperationArn: "activeOperationArn",
      ClusterType: "clusterType",
      ClusterArn: "clusterArn",
      ClusterName: "clusterName",
      CreationTime: "creationTime",
      CurrentVersion: "currentVersion",
      State: "state",
      StateInfo: "stateInfo",
      Tags: "tags",
      Provisioned: "provisioned",
      Serverless: "serverless",
    }),
  ),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export interface DescribeClusterV2Response {
  ClusterInfo?: Cluster & {
    Provisioned: Provisioned & {
      BrokerNodeGroupInfo: BrokerNodeGroupInfo & {
        ClientSubnets: __listOf__string;
        InstanceType: __stringMin5Max32;
      };
      NumberOfBrokerNodes: __integerMin1Max15;
      EncryptionInfo: EncryptionInfo & {
        EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
      };
      OpenMonitoring: OpenMonitoringInfo & {
        Prometheus: PrometheusInfo & {
          JmxExporter: JmxExporterInfo & { EnabledInBroker: boolean };
          NodeExporter: NodeExporterInfo & { EnabledInBroker: boolean };
        };
      };
      LoggingInfo: LoggingInfo & {
        BrokerLogs: BrokerLogs & {
          CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
          Firehose: Firehose & { Enabled: boolean };
          S3: S3 & { Enabled: boolean };
        };
      };
    };
    Serverless: Serverless & {
      VpcConfigs: (VpcConfig & { SubnetIds: __listOf__string })[];
    };
  };
}
export const DescribeClusterV2Response = S.suspend(() =>
  S.Struct({ ClusterInfo: S.optional(Cluster) }).pipe(
    S.encodeKeys({ ClusterInfo: "clusterInfo" }),
  ),
).annotate({
  identifier: "DescribeClusterV2Response",
}) as any as S.Schema<DescribeClusterV2Response>;
export interface DescribeConfigurationRequest {
  Arn: string;
}
export const DescribeConfigurationRequest = S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/configurations/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConfigurationRequest",
}) as any as S.Schema<DescribeConfigurationRequest>;
export interface DescribeConfigurationResponse {
  Arn?: string;
  CreationTime?: Date;
  Description?: string;
  KafkaVersions?: string[];
  LatestRevision?: ConfigurationRevision & {
    CreationTime: __timestampIso8601;
    Revision: number;
  };
  Name?: string;
  State?: ConfigurationState;
}
export const DescribeConfigurationResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    KafkaVersions: S.optional(__listOf__string),
    LatestRevision: S.optional(ConfigurationRevision),
    Name: S.optional(S.String),
    State: S.optional(ConfigurationState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreationTime: "creationTime",
      Description: "description",
      KafkaVersions: "kafkaVersions",
      LatestRevision: "latestRevision",
      Name: "name",
      State: "state",
    }),
  ),
).annotate({
  identifier: "DescribeConfigurationResponse",
}) as any as S.Schema<DescribeConfigurationResponse>;
export interface DescribeConfigurationRevisionRequest {
  Arn: string;
  Revision: number;
}
export const DescribeConfigurationRevisionRequest = S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Revision: S.Number.pipe(T.HttpLabel("Revision")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/configurations/{Arn}/revisions/{Revision}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConfigurationRevisionRequest",
}) as any as S.Schema<DescribeConfigurationRevisionRequest>;
export interface DescribeConfigurationRevisionResponse {
  Arn?: string;
  CreationTime?: Date;
  Description?: string;
  Revision?: number;
  ServerProperties?: Uint8Array;
}
export const DescribeConfigurationRevisionResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Revision: S.optional(S.Number),
    ServerProperties: S.optional(T.Blob),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreationTime: "creationTime",
      Description: "description",
      Revision: "revision",
      ServerProperties: "serverProperties",
    }),
  ),
).annotate({
  identifier: "DescribeConfigurationRevisionResponse",
}) as any as S.Schema<DescribeConfigurationRevisionResponse>;
export interface DescribeReplicatorRequest {
  ReplicatorArn: string;
}
export const DescribeReplicatorRequest = S.suspend(() =>
  S.Struct({ ReplicatorArn: S.String.pipe(T.HttpLabel("ReplicatorArn")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/replication/v1/replicators/{ReplicatorArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReplicatorRequest",
}) as any as S.Schema<DescribeReplicatorRequest>;
export interface KafkaClusterDescription {
  AmazonMskCluster?: AmazonMskCluster;
  KafkaClusterAlias?: string;
  VpcConfig?: KafkaClusterClientVpcConfig;
}
export const KafkaClusterDescription = S.suspend(() =>
  S.Struct({
    AmazonMskCluster: S.optional(AmazonMskCluster),
    KafkaClusterAlias: S.optional(S.String),
    VpcConfig: S.optional(KafkaClusterClientVpcConfig),
  }).pipe(
    S.encodeKeys({
      AmazonMskCluster: "amazonMskCluster",
      KafkaClusterAlias: "kafkaClusterAlias",
      VpcConfig: "vpcConfig",
    }),
  ),
).annotate({
  identifier: "KafkaClusterDescription",
}) as any as S.Schema<KafkaClusterDescription>;
export type __listOfKafkaClusterDescription = KafkaClusterDescription[];
export const __listOfKafkaClusterDescription = S.Array(KafkaClusterDescription);
export interface ReplicationInfoDescription {
  ConsumerGroupReplication?: ConsumerGroupReplication;
  SourceKafkaClusterAlias?: string;
  TargetCompressionType?: TargetCompressionType;
  TargetKafkaClusterAlias?: string;
  TopicReplication?: TopicReplication;
}
export const ReplicationInfoDescription = S.suspend(() =>
  S.Struct({
    ConsumerGroupReplication: S.optional(ConsumerGroupReplication),
    SourceKafkaClusterAlias: S.optional(S.String),
    TargetCompressionType: S.optional(TargetCompressionType),
    TargetKafkaClusterAlias: S.optional(S.String),
    TopicReplication: S.optional(TopicReplication),
  }).pipe(
    S.encodeKeys({
      ConsumerGroupReplication: "consumerGroupReplication",
      SourceKafkaClusterAlias: "sourceKafkaClusterAlias",
      TargetCompressionType: "targetCompressionType",
      TargetKafkaClusterAlias: "targetKafkaClusterAlias",
      TopicReplication: "topicReplication",
    }),
  ),
).annotate({
  identifier: "ReplicationInfoDescription",
}) as any as S.Schema<ReplicationInfoDescription>;
export type __listOfReplicationInfoDescription = ReplicationInfoDescription[];
export const __listOfReplicationInfoDescription = S.Array(
  ReplicationInfoDescription,
);
export interface ReplicationStateInfo {
  Code?: string;
  Message?: string;
}
export const ReplicationStateInfo = S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }).pipe(
    S.encodeKeys({ Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "ReplicationStateInfo",
}) as any as S.Schema<ReplicationStateInfo>;
export interface DescribeReplicatorResponse {
  CreationTime?: Date;
  CurrentVersion?: string;
  IsReplicatorReference?: boolean;
  KafkaClusters?: (KafkaClusterDescription & {
    AmazonMskCluster: AmazonMskCluster & { MskClusterArn: string };
    VpcConfig: KafkaClusterClientVpcConfig & { SubnetIds: __listOf__string };
  })[];
  ReplicationInfoList?: (ReplicationInfoDescription & {
    ConsumerGroupReplication: ConsumerGroupReplication & {
      ConsumerGroupsToReplicate: __listOf__stringMax256;
    };
    TopicReplication: TopicReplication & {
      TopicsToReplicate: __listOf__stringMax249;
    };
  })[];
  ReplicatorArn?: string;
  ReplicatorDescription?: string;
  ReplicatorName?: string;
  ReplicatorResourceArn?: string;
  ReplicatorState?: ReplicatorState;
  ServiceExecutionRoleArn?: string;
  StateInfo?: ReplicationStateInfo;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeReplicatorResponse = S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CurrentVersion: S.optional(S.String),
    IsReplicatorReference: S.optional(S.Boolean),
    KafkaClusters: S.optional(__listOfKafkaClusterDescription),
    ReplicationInfoList: S.optional(__listOfReplicationInfoDescription),
    ReplicatorArn: S.optional(S.String),
    ReplicatorDescription: S.optional(S.String),
    ReplicatorName: S.optional(S.String),
    ReplicatorResourceArn: S.optional(S.String),
    ReplicatorState: S.optional(ReplicatorState),
    ServiceExecutionRoleArn: S.optional(S.String),
    StateInfo: S.optional(ReplicationStateInfo),
    Tags: S.optional(__mapOf__string),
  }).pipe(
    S.encodeKeys({
      CreationTime: "creationTime",
      CurrentVersion: "currentVersion",
      IsReplicatorReference: "isReplicatorReference",
      KafkaClusters: "kafkaClusters",
      ReplicationInfoList: "replicationInfoList",
      ReplicatorArn: "replicatorArn",
      ReplicatorDescription: "replicatorDescription",
      ReplicatorName: "replicatorName",
      ReplicatorResourceArn: "replicatorResourceArn",
      ReplicatorState: "replicatorState",
      ServiceExecutionRoleArn: "serviceExecutionRoleArn",
      StateInfo: "stateInfo",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "DescribeReplicatorResponse",
}) as any as S.Schema<DescribeReplicatorResponse>;
export interface DescribeTopicRequest {
  ClusterArn: string;
  TopicName: string;
}
export const DescribeTopicRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    TopicName: S.String.pipe(T.HttpLabel("TopicName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/clusters/{ClusterArn}/topics/{TopicName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTopicRequest",
}) as any as S.Schema<DescribeTopicRequest>;
export interface DescribeTopicResponse {
  TopicArn?: string;
  TopicName?: string;
  ReplicationFactor?: number;
  PartitionCount?: number;
  Configs?: string;
  Status?: TopicState;
}
export const DescribeTopicResponse = S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    TopicName: S.optional(S.String),
    ReplicationFactor: S.optional(S.Number),
    PartitionCount: S.optional(S.Number),
    Configs: S.optional(S.String),
    Status: S.optional(TopicState),
  }).pipe(
    S.encodeKeys({
      TopicArn: "topicArn",
      TopicName: "topicName",
      ReplicationFactor: "replicationFactor",
      PartitionCount: "partitionCount",
      Configs: "configs",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "DescribeTopicResponse",
}) as any as S.Schema<DescribeTopicResponse>;
export interface DescribeTopicPartitionsRequest {
  ClusterArn: string;
  TopicName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeTopicPartitionsRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    TopicName: S.String.pipe(T.HttpLabel("TopicName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/clusters/{ClusterArn}/topics/{TopicName}/partitions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTopicPartitionsRequest",
}) as any as S.Schema<DescribeTopicPartitionsRequest>;
export type __listOf__integer = number[];
export const __listOf__integer = S.Array(S.Number);
export interface TopicPartitionInfo {
  Partition?: number;
  Leader?: number;
  Replicas?: number[];
  Isr?: number[];
}
export const TopicPartitionInfo = S.suspend(() =>
  S.Struct({
    Partition: S.optional(S.Number),
    Leader: S.optional(S.Number),
    Replicas: S.optional(__listOf__integer),
    Isr: S.optional(__listOf__integer),
  }).pipe(
    S.encodeKeys({
      Partition: "partition",
      Leader: "leader",
      Replicas: "replicas",
      Isr: "isr",
    }),
  ),
).annotate({
  identifier: "TopicPartitionInfo",
}) as any as S.Schema<TopicPartitionInfo>;
export type __listOfTopicPartitionInfo = TopicPartitionInfo[];
export const __listOfTopicPartitionInfo = S.Array(TopicPartitionInfo);
export interface DescribeTopicPartitionsResponse {
  Partitions?: TopicPartitionInfo[];
  NextToken?: string;
}
export const DescribeTopicPartitionsResponse = S.suspend(() =>
  S.Struct({
    Partitions: S.optional(__listOfTopicPartitionInfo),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Partitions: "partitions", NextToken: "nextToken" })),
).annotate({
  identifier: "DescribeTopicPartitionsResponse",
}) as any as S.Schema<DescribeTopicPartitionsResponse>;
export interface DescribeVpcConnectionRequest {
  Arn: string;
}
export const DescribeVpcConnectionRequest = S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/vpc-connection/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVpcConnectionRequest",
}) as any as S.Schema<DescribeVpcConnectionRequest>;
export interface DescribeVpcConnectionResponse {
  VpcConnectionArn?: string;
  TargetClusterArn?: string;
  State?: VpcConnectionState;
  Authentication?: string;
  VpcId?: string;
  Subnets?: string[];
  SecurityGroups?: string[];
  CreationTime?: Date;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeVpcConnectionResponse = S.suspend(() =>
  S.Struct({
    VpcConnectionArn: S.optional(S.String),
    TargetClusterArn: S.optional(S.String),
    State: S.optional(VpcConnectionState),
    Authentication: S.optional(S.String),
    VpcId: S.optional(S.String),
    Subnets: S.optional(__listOf__string),
    SecurityGroups: S.optional(__listOf__string),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(__mapOf__string),
  }).pipe(
    S.encodeKeys({
      VpcConnectionArn: "vpcConnectionArn",
      TargetClusterArn: "targetClusterArn",
      State: "state",
      Authentication: "authentication",
      VpcId: "vpcId",
      Subnets: "subnets",
      SecurityGroups: "securityGroups",
      CreationTime: "creationTime",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "DescribeVpcConnectionResponse",
}) as any as S.Schema<DescribeVpcConnectionResponse>;
export interface GetBootstrapBrokersRequest {
  ClusterArn: string;
}
export const GetBootstrapBrokersRequest = S.suspend(() =>
  S.Struct({ ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/clusters/{ClusterArn}/bootstrap-brokers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBootstrapBrokersRequest",
}) as any as S.Schema<GetBootstrapBrokersRequest>;
export interface GetBootstrapBrokersResponse {
  BootstrapBrokerString?: string;
  BootstrapBrokerStringTls?: string;
  BootstrapBrokerStringSaslScram?: string;
  BootstrapBrokerStringSaslIam?: string;
  BootstrapBrokerStringPublicTls?: string;
  BootstrapBrokerStringPublicSaslScram?: string;
  BootstrapBrokerStringPublicSaslIam?: string;
  BootstrapBrokerStringVpcConnectivityTls?: string;
  BootstrapBrokerStringVpcConnectivitySaslScram?: string;
  BootstrapBrokerStringVpcConnectivitySaslIam?: string;
  BootstrapBrokerStringIpv6?: string;
  BootstrapBrokerStringTlsIpv6?: string;
  BootstrapBrokerStringSaslScramIpv6?: string;
  BootstrapBrokerStringSaslIamIpv6?: string;
}
export const GetBootstrapBrokersResponse = S.suspend(() =>
  S.Struct({
    BootstrapBrokerString: S.optional(S.String),
    BootstrapBrokerStringTls: S.optional(S.String),
    BootstrapBrokerStringSaslScram: S.optional(S.String),
    BootstrapBrokerStringSaslIam: S.optional(S.String),
    BootstrapBrokerStringPublicTls: S.optional(S.String),
    BootstrapBrokerStringPublicSaslScram: S.optional(S.String),
    BootstrapBrokerStringPublicSaslIam: S.optional(S.String),
    BootstrapBrokerStringVpcConnectivityTls: S.optional(S.String),
    BootstrapBrokerStringVpcConnectivitySaslScram: S.optional(S.String),
    BootstrapBrokerStringVpcConnectivitySaslIam: S.optional(S.String),
    BootstrapBrokerStringIpv6: S.optional(S.String),
    BootstrapBrokerStringTlsIpv6: S.optional(S.String),
    BootstrapBrokerStringSaslScramIpv6: S.optional(S.String),
    BootstrapBrokerStringSaslIamIpv6: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      BootstrapBrokerString: "bootstrapBrokerString",
      BootstrapBrokerStringTls: "bootstrapBrokerStringTls",
      BootstrapBrokerStringSaslScram: "bootstrapBrokerStringSaslScram",
      BootstrapBrokerStringSaslIam: "bootstrapBrokerStringSaslIam",
      BootstrapBrokerStringPublicTls: "bootstrapBrokerStringPublicTls",
      BootstrapBrokerStringPublicSaslScram:
        "bootstrapBrokerStringPublicSaslScram",
      BootstrapBrokerStringPublicSaslIam: "bootstrapBrokerStringPublicSaslIam",
      BootstrapBrokerStringVpcConnectivityTls:
        "bootstrapBrokerStringVpcConnectivityTls",
      BootstrapBrokerStringVpcConnectivitySaslScram:
        "bootstrapBrokerStringVpcConnectivitySaslScram",
      BootstrapBrokerStringVpcConnectivitySaslIam:
        "bootstrapBrokerStringVpcConnectivitySaslIam",
      BootstrapBrokerStringIpv6: "bootstrapBrokerStringIpv6",
      BootstrapBrokerStringTlsIpv6: "bootstrapBrokerStringTlsIpv6",
      BootstrapBrokerStringSaslScramIpv6: "bootstrapBrokerStringSaslScramIpv6",
      BootstrapBrokerStringSaslIamIpv6: "bootstrapBrokerStringSaslIamIpv6",
    }),
  ),
).annotate({
  identifier: "GetBootstrapBrokersResponse",
}) as any as S.Schema<GetBootstrapBrokersResponse>;
export interface GetClusterPolicyRequest {
  ClusterArn: string;
}
export const GetClusterPolicyRequest = S.suspend(() =>
  S.Struct({ ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClusterPolicyRequest",
}) as any as S.Schema<GetClusterPolicyRequest>;
export interface GetClusterPolicyResponse {
  CurrentVersion?: string;
  Policy?: string;
}
export const GetClusterPolicyResponse = S.suspend(() =>
  S.Struct({
    CurrentVersion: S.optional(S.String),
    Policy: S.optional(S.String),
  }).pipe(S.encodeKeys({ CurrentVersion: "currentVersion", Policy: "policy" })),
).annotate({
  identifier: "GetClusterPolicyResponse",
}) as any as S.Schema<GetClusterPolicyResponse>;
export interface GetCompatibleKafkaVersionsRequest {
  ClusterArn?: string;
}
export const GetCompatibleKafkaVersionsRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String).pipe(T.HttpQuery("clusterArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/compatible-kafka-versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCompatibleKafkaVersionsRequest",
}) as any as S.Schema<GetCompatibleKafkaVersionsRequest>;
export interface CompatibleKafkaVersion {
  SourceVersion?: string;
  TargetVersions?: string[];
}
export const CompatibleKafkaVersion = S.suspend(() =>
  S.Struct({
    SourceVersion: S.optional(S.String),
    TargetVersions: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      SourceVersion: "sourceVersion",
      TargetVersions: "targetVersions",
    }),
  ),
).annotate({
  identifier: "CompatibleKafkaVersion",
}) as any as S.Schema<CompatibleKafkaVersion>;
export type __listOfCompatibleKafkaVersion = CompatibleKafkaVersion[];
export const __listOfCompatibleKafkaVersion = S.Array(CompatibleKafkaVersion);
export interface GetCompatibleKafkaVersionsResponse {
  CompatibleKafkaVersions?: CompatibleKafkaVersion[];
}
export const GetCompatibleKafkaVersionsResponse = S.suspend(() =>
  S.Struct({
    CompatibleKafkaVersions: S.optional(__listOfCompatibleKafkaVersion),
  }).pipe(S.encodeKeys({ CompatibleKafkaVersions: "compatibleKafkaVersions" })),
).annotate({
  identifier: "GetCompatibleKafkaVersionsResponse",
}) as any as S.Schema<GetCompatibleKafkaVersionsResponse>;
export interface ListClientVpcConnectionsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListClientVpcConnectionsRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/clusters/{ClusterArn}/client-vpc-connections",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClientVpcConnectionsRequest",
}) as any as S.Schema<ListClientVpcConnectionsRequest>;
export interface ClientVpcConnection {
  Authentication?: string;
  CreationTime?: Date;
  State?: VpcConnectionState;
  VpcConnectionArn?: string;
  Owner?: string;
}
export const ClientVpcConnection = S.suspend(() =>
  S.Struct({
    Authentication: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    State: S.optional(VpcConnectionState),
    VpcConnectionArn: S.optional(S.String),
    Owner: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Authentication: "authentication",
      CreationTime: "creationTime",
      State: "state",
      VpcConnectionArn: "vpcConnectionArn",
      Owner: "owner",
    }),
  ),
).annotate({
  identifier: "ClientVpcConnection",
}) as any as S.Schema<ClientVpcConnection>;
export type __listOfClientVpcConnection = ClientVpcConnection[];
export const __listOfClientVpcConnection = S.Array(ClientVpcConnection);
export interface ListClientVpcConnectionsResponse {
  ClientVpcConnections?: (ClientVpcConnection & { VpcConnectionArn: string })[];
  NextToken?: string;
}
export const ListClientVpcConnectionsResponse = S.suspend(() =>
  S.Struct({
    ClientVpcConnections: S.optional(__listOfClientVpcConnection),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClientVpcConnections: "clientVpcConnections",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListClientVpcConnectionsResponse",
}) as any as S.Schema<ListClientVpcConnectionsResponse>;
export interface ListClusterOperationsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListClusterOperationsRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/operations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClusterOperationsRequest",
}) as any as S.Schema<ListClusterOperationsRequest>;
export type __listOfClusterOperationInfo = ClusterOperationInfo[];
export const __listOfClusterOperationInfo = S.Array(ClusterOperationInfo);
export interface ListClusterOperationsResponse {
  ClusterOperationInfoList?: (ClusterOperationInfo & {
    SourceClusterInfo: MutableClusterInfo & {
      BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & {
        KafkaBrokerNodeId: string;
      })[];
      ConfigurationInfo: ConfigurationInfo & { Arn: string; Revision: number };
      OpenMonitoring: OpenMonitoring & {
        Prometheus: Prometheus & {
          JmxExporter: JmxExporter & { EnabledInBroker: boolean };
          NodeExporter: NodeExporter & { EnabledInBroker: boolean };
        };
      };
      LoggingInfo: LoggingInfo & {
        BrokerLogs: BrokerLogs & {
          CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
          Firehose: Firehose & { Enabled: boolean };
          S3: S3 & { Enabled: boolean };
        };
      };
      EncryptionInfo: EncryptionInfo & {
        EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
      };
    };
    TargetClusterInfo: MutableClusterInfo & {
      BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & {
        KafkaBrokerNodeId: string;
      })[];
      ConfigurationInfo: ConfigurationInfo & { Arn: string; Revision: number };
      OpenMonitoring: OpenMonitoring & {
        Prometheus: Prometheus & {
          JmxExporter: JmxExporter & { EnabledInBroker: boolean };
          NodeExporter: NodeExporter & { EnabledInBroker: boolean };
        };
      };
      LoggingInfo: LoggingInfo & {
        BrokerLogs: BrokerLogs & {
          CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
          Firehose: Firehose & { Enabled: boolean };
          S3: S3 & { Enabled: boolean };
        };
      };
      EncryptionInfo: EncryptionInfo & {
        EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
      };
    };
  })[];
  NextToken?: string;
}
export const ListClusterOperationsResponse = S.suspend(() =>
  S.Struct({
    ClusterOperationInfoList: S.optional(__listOfClusterOperationInfo),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterOperationInfoList: "clusterOperationInfoList",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListClusterOperationsResponse",
}) as any as S.Schema<ListClusterOperationsResponse>;
export interface ListClusterOperationsV2Request {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListClusterOperationsV2Request = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v2/clusters/{ClusterArn}/operations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClusterOperationsV2Request",
}) as any as S.Schema<ListClusterOperationsV2Request>;
export interface ClusterOperationV2Summary {
  ClusterArn?: string;
  ClusterType?: ClusterType;
  StartTime?: Date;
  EndTime?: Date;
  OperationArn?: string;
  OperationState?: string;
  OperationType?: string;
}
export const ClusterOperationV2Summary = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterType: S.optional(ClusterType),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    OperationArn: S.optional(S.String),
    OperationState: S.optional(S.String),
    OperationType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterType: "clusterType",
      StartTime: "startTime",
      EndTime: "endTime",
      OperationArn: "operationArn",
      OperationState: "operationState",
      OperationType: "operationType",
    }),
  ),
).annotate({
  identifier: "ClusterOperationV2Summary",
}) as any as S.Schema<ClusterOperationV2Summary>;
export type __listOfClusterOperationV2Summary = ClusterOperationV2Summary[];
export const __listOfClusterOperationV2Summary = S.Array(
  ClusterOperationV2Summary,
);
export interface ListClusterOperationsV2Response {
  ClusterOperationInfoList?: ClusterOperationV2Summary[];
  NextToken?: string;
}
export const ListClusterOperationsV2Response = S.suspend(() =>
  S.Struct({
    ClusterOperationInfoList: S.optional(__listOfClusterOperationV2Summary),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterOperationInfoList: "clusterOperationInfoList",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListClusterOperationsV2Response",
}) as any as S.Schema<ListClusterOperationsV2Response>;
export interface ListClustersRequest {
  ClusterNameFilter?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListClustersRequest = S.suspend(() =>
  S.Struct({
    ClusterNameFilter: S.optional(S.String).pipe(
      T.HttpQuery("clusterNameFilter"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/clusters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClustersRequest",
}) as any as S.Schema<ListClustersRequest>;
export type __listOfClusterInfo = ClusterInfo[];
export const __listOfClusterInfo = S.Array(ClusterInfo);
export interface ListClustersResponse {
  ClusterInfoList?: (ClusterInfo & {
    BrokerNodeGroupInfo: BrokerNodeGroupInfo & {
      ClientSubnets: __listOf__string;
      InstanceType: __stringMin5Max32;
    };
    EncryptionInfo: EncryptionInfo & {
      EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
    };
    OpenMonitoring: OpenMonitoring & {
      Prometheus: Prometheus & {
        JmxExporter: JmxExporter & { EnabledInBroker: boolean };
        NodeExporter: NodeExporter & { EnabledInBroker: boolean };
      };
    };
    LoggingInfo: LoggingInfo & {
      BrokerLogs: BrokerLogs & {
        CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
        Firehose: Firehose & { Enabled: boolean };
        S3: S3 & { Enabled: boolean };
      };
    };
  })[];
  NextToken?: string;
}
export const ListClustersResponse = S.suspend(() =>
  S.Struct({
    ClusterInfoList: S.optional(__listOfClusterInfo),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterInfoList: "clusterInfoList",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListClustersResponse",
}) as any as S.Schema<ListClustersResponse>;
export interface ListClustersV2Request {
  ClusterNameFilter?: string;
  ClusterTypeFilter?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListClustersV2Request = S.suspend(() =>
  S.Struct({
    ClusterNameFilter: S.optional(S.String).pipe(
      T.HttpQuery("clusterNameFilter"),
    ),
    ClusterTypeFilter: S.optional(S.String).pipe(
      T.HttpQuery("clusterTypeFilter"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/api/v2/clusters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClustersV2Request",
}) as any as S.Schema<ListClustersV2Request>;
export type __listOfCluster = Cluster[];
export const __listOfCluster = S.Array(Cluster);
export interface ListClustersV2Response {
  ClusterInfoList?: (Cluster & {
    Provisioned: Provisioned & {
      BrokerNodeGroupInfo: BrokerNodeGroupInfo & {
        ClientSubnets: __listOf__string;
        InstanceType: __stringMin5Max32;
      };
      NumberOfBrokerNodes: __integerMin1Max15;
      EncryptionInfo: EncryptionInfo & {
        EncryptionAtRest: EncryptionAtRest & { DataVolumeKMSKeyId: string };
      };
      OpenMonitoring: OpenMonitoringInfo & {
        Prometheus: PrometheusInfo & {
          JmxExporter: JmxExporterInfo & { EnabledInBroker: boolean };
          NodeExporter: NodeExporterInfo & { EnabledInBroker: boolean };
        };
      };
      LoggingInfo: LoggingInfo & {
        BrokerLogs: BrokerLogs & {
          CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
          Firehose: Firehose & { Enabled: boolean };
          S3: S3 & { Enabled: boolean };
        };
      };
    };
    Serverless: Serverless & {
      VpcConfigs: (VpcConfig & { SubnetIds: __listOf__string })[];
    };
  })[];
  NextToken?: string;
}
export const ListClustersV2Response = S.suspend(() =>
  S.Struct({
    ClusterInfoList: S.optional(__listOfCluster),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterInfoList: "clusterInfoList",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListClustersV2Response",
}) as any as S.Schema<ListClustersV2Response>;
export interface ListConfigurationRevisionsRequest {
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListConfigurationRevisionsRequest = S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/configurations/{Arn}/revisions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationRevisionsRequest",
}) as any as S.Schema<ListConfigurationRevisionsRequest>;
export type __listOfConfigurationRevision = ConfigurationRevision[];
export const __listOfConfigurationRevision = S.Array(ConfigurationRevision);
export interface ListConfigurationRevisionsResponse {
  NextToken?: string;
  Revisions?: (ConfigurationRevision & {
    CreationTime: __timestampIso8601;
    Revision: number;
  })[];
}
export const ListConfigurationRevisionsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Revisions: S.optional(__listOfConfigurationRevision),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Revisions: "revisions" })),
).annotate({
  identifier: "ListConfigurationRevisionsResponse",
}) as any as S.Schema<ListConfigurationRevisionsResponse>;
export interface ListConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListConfigurationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationsRequest",
}) as any as S.Schema<ListConfigurationsRequest>;
export interface Configuration {
  Arn?: string;
  CreationTime?: Date;
  Description?: string;
  KafkaVersions?: string[];
  LatestRevision?: ConfigurationRevision;
  Name?: string;
  State?: ConfigurationState;
}
export const Configuration = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    KafkaVersions: S.optional(__listOf__string),
    LatestRevision: S.optional(ConfigurationRevision),
    Name: S.optional(S.String),
    State: S.optional(ConfigurationState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreationTime: "creationTime",
      Description: "description",
      KafkaVersions: "kafkaVersions",
      LatestRevision: "latestRevision",
      Name: "name",
      State: "state",
    }),
  ),
).annotate({ identifier: "Configuration" }) as any as S.Schema<Configuration>;
export type __listOfConfiguration = Configuration[];
export const __listOfConfiguration = S.Array(Configuration);
export interface ListConfigurationsResponse {
  Configurations?: (Configuration & {
    Arn: string;
    CreationTime: __timestampIso8601;
    Description: string;
    KafkaVersions: __listOf__string;
    LatestRevision: ConfigurationRevision & {
      CreationTime: __timestampIso8601;
      Revision: number;
    };
    Name: string;
    State: ConfigurationState;
  })[];
  NextToken?: string;
}
export const ListConfigurationsResponse = S.suspend(() =>
  S.Struct({
    Configurations: S.optional(__listOfConfiguration),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Configurations: "configurations", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListConfigurationsResponse",
}) as any as S.Schema<ListConfigurationsResponse>;
export interface ListKafkaVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListKafkaVersionsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/kafka-versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListKafkaVersionsRequest",
}) as any as S.Schema<ListKafkaVersionsRequest>;
export type KafkaVersionStatus = "ACTIVE" | "DEPRECATED" | (string & {});
export const KafkaVersionStatus = S.String;
export interface KafkaVersion {
  Version?: string;
  Status?: KafkaVersionStatus;
}
export const KafkaVersion = S.suspend(() =>
  S.Struct({
    Version: S.optional(S.String),
    Status: S.optional(KafkaVersionStatus),
  }).pipe(S.encodeKeys({ Version: "version", Status: "status" })),
).annotate({ identifier: "KafkaVersion" }) as any as S.Schema<KafkaVersion>;
export type __listOfKafkaVersion = KafkaVersion[];
export const __listOfKafkaVersion = S.Array(KafkaVersion);
export interface ListKafkaVersionsResponse {
  KafkaVersions?: KafkaVersion[];
  NextToken?: string;
}
export const ListKafkaVersionsResponse = S.suspend(() =>
  S.Struct({
    KafkaVersions: S.optional(__listOfKafkaVersion),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ KafkaVersions: "kafkaVersions", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListKafkaVersionsResponse",
}) as any as S.Schema<ListKafkaVersionsResponse>;
export interface ListNodesRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListNodesRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNodesRequest",
}) as any as S.Schema<ListNodesRequest>;
export interface BrokerNodeInfo {
  AttachedENIId?: string;
  BrokerId?: number;
  ClientSubnet?: string;
  ClientVpcIpAddress?: string;
  CurrentBrokerSoftwareInfo?: BrokerSoftwareInfo;
  Endpoints?: string[];
}
export const BrokerNodeInfo = S.suspend(() =>
  S.Struct({
    AttachedENIId: S.optional(S.String),
    BrokerId: S.optional(S.Number),
    ClientSubnet: S.optional(S.String),
    ClientVpcIpAddress: S.optional(S.String),
    CurrentBrokerSoftwareInfo: S.optional(BrokerSoftwareInfo),
    Endpoints: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      AttachedENIId: "attachedENIId",
      BrokerId: "brokerId",
      ClientSubnet: "clientSubnet",
      ClientVpcIpAddress: "clientVpcIpAddress",
      CurrentBrokerSoftwareInfo: "currentBrokerSoftwareInfo",
      Endpoints: "endpoints",
    }),
  ),
).annotate({ identifier: "BrokerNodeInfo" }) as any as S.Schema<BrokerNodeInfo>;
export interface ControllerNodeInfo {
  Endpoints?: string[];
}
export const ControllerNodeInfo = S.suspend(() =>
  S.Struct({ Endpoints: S.optional(__listOf__string) }).pipe(
    S.encodeKeys({ Endpoints: "endpoints" }),
  ),
).annotate({
  identifier: "ControllerNodeInfo",
}) as any as S.Schema<ControllerNodeInfo>;
export type NodeType = "BROKER" | (string & {});
export const NodeType = S.String;
export interface ZookeeperNodeInfo {
  AttachedENIId?: string;
  ClientVpcIpAddress?: string;
  Endpoints?: string[];
  ZookeeperId?: number;
  ZookeeperVersion?: string;
}
export const ZookeeperNodeInfo = S.suspend(() =>
  S.Struct({
    AttachedENIId: S.optional(S.String),
    ClientVpcIpAddress: S.optional(S.String),
    Endpoints: S.optional(__listOf__string),
    ZookeeperId: S.optional(S.Number),
    ZookeeperVersion: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AttachedENIId: "attachedENIId",
      ClientVpcIpAddress: "clientVpcIpAddress",
      Endpoints: "endpoints",
      ZookeeperId: "zookeeperId",
      ZookeeperVersion: "zookeeperVersion",
    }),
  ),
).annotate({
  identifier: "ZookeeperNodeInfo",
}) as any as S.Schema<ZookeeperNodeInfo>;
export interface NodeInfo {
  AddedToClusterTime?: string;
  BrokerNodeInfo?: BrokerNodeInfo;
  ControllerNodeInfo?: ControllerNodeInfo;
  InstanceType?: string;
  NodeARN?: string;
  NodeType?: NodeType;
  ZookeeperNodeInfo?: ZookeeperNodeInfo;
}
export const NodeInfo = S.suspend(() =>
  S.Struct({
    AddedToClusterTime: S.optional(S.String),
    BrokerNodeInfo: S.optional(BrokerNodeInfo),
    ControllerNodeInfo: S.optional(ControllerNodeInfo),
    InstanceType: S.optional(S.String),
    NodeARN: S.optional(S.String),
    NodeType: S.optional(NodeType),
    ZookeeperNodeInfo: S.optional(ZookeeperNodeInfo),
  }).pipe(
    S.encodeKeys({
      AddedToClusterTime: "addedToClusterTime",
      BrokerNodeInfo: "brokerNodeInfo",
      ControllerNodeInfo: "controllerNodeInfo",
      InstanceType: "instanceType",
      NodeARN: "nodeARN",
      NodeType: "nodeType",
      ZookeeperNodeInfo: "zookeeperNodeInfo",
    }),
  ),
).annotate({ identifier: "NodeInfo" }) as any as S.Schema<NodeInfo>;
export type __listOfNodeInfo = NodeInfo[];
export const __listOfNodeInfo = S.Array(NodeInfo);
export interface ListNodesResponse {
  NextToken?: string;
  NodeInfoList?: NodeInfo[];
}
export const ListNodesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    NodeInfoList: S.optional(__listOfNodeInfo),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", NodeInfoList: "nodeInfoList" }),
  ),
).annotate({
  identifier: "ListNodesResponse",
}) as any as S.Schema<ListNodesResponse>;
export interface ListReplicatorsRequest {
  MaxResults?: number;
  NextToken?: string;
  ReplicatorNameFilter?: string;
}
export const ListReplicatorsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ReplicatorNameFilter: S.optional(S.String).pipe(
      T.HttpQuery("replicatorNameFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/replication/v1/replicators" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReplicatorsRequest",
}) as any as S.Schema<ListReplicatorsRequest>;
export interface KafkaClusterSummary {
  AmazonMskCluster?: AmazonMskCluster;
  KafkaClusterAlias?: string;
}
export const KafkaClusterSummary = S.suspend(() =>
  S.Struct({
    AmazonMskCluster: S.optional(AmazonMskCluster),
    KafkaClusterAlias: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AmazonMskCluster: "amazonMskCluster",
      KafkaClusterAlias: "kafkaClusterAlias",
    }),
  ),
).annotate({
  identifier: "KafkaClusterSummary",
}) as any as S.Schema<KafkaClusterSummary>;
export type __listOfKafkaClusterSummary = KafkaClusterSummary[];
export const __listOfKafkaClusterSummary = S.Array(KafkaClusterSummary);
export interface ReplicationInfoSummary {
  SourceKafkaClusterAlias?: string;
  TargetKafkaClusterAlias?: string;
}
export const ReplicationInfoSummary = S.suspend(() =>
  S.Struct({
    SourceKafkaClusterAlias: S.optional(S.String),
    TargetKafkaClusterAlias: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      SourceKafkaClusterAlias: "sourceKafkaClusterAlias",
      TargetKafkaClusterAlias: "targetKafkaClusterAlias",
    }),
  ),
).annotate({
  identifier: "ReplicationInfoSummary",
}) as any as S.Schema<ReplicationInfoSummary>;
export type __listOfReplicationInfoSummary = ReplicationInfoSummary[];
export const __listOfReplicationInfoSummary = S.Array(ReplicationInfoSummary);
export interface ReplicatorSummary {
  CreationTime?: Date;
  CurrentVersion?: string;
  IsReplicatorReference?: boolean;
  KafkaClustersSummary?: KafkaClusterSummary[];
  ReplicationInfoSummaryList?: ReplicationInfoSummary[];
  ReplicatorArn?: string;
  ReplicatorName?: string;
  ReplicatorResourceArn?: string;
  ReplicatorState?: ReplicatorState;
}
export const ReplicatorSummary = S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CurrentVersion: S.optional(S.String),
    IsReplicatorReference: S.optional(S.Boolean),
    KafkaClustersSummary: S.optional(__listOfKafkaClusterSummary),
    ReplicationInfoSummaryList: S.optional(__listOfReplicationInfoSummary),
    ReplicatorArn: S.optional(S.String),
    ReplicatorName: S.optional(S.String),
    ReplicatorResourceArn: S.optional(S.String),
    ReplicatorState: S.optional(ReplicatorState),
  }).pipe(
    S.encodeKeys({
      CreationTime: "creationTime",
      CurrentVersion: "currentVersion",
      IsReplicatorReference: "isReplicatorReference",
      KafkaClustersSummary: "kafkaClustersSummary",
      ReplicationInfoSummaryList: "replicationInfoSummaryList",
      ReplicatorArn: "replicatorArn",
      ReplicatorName: "replicatorName",
      ReplicatorResourceArn: "replicatorResourceArn",
      ReplicatorState: "replicatorState",
    }),
  ),
).annotate({
  identifier: "ReplicatorSummary",
}) as any as S.Schema<ReplicatorSummary>;
export type __listOfReplicatorSummary = ReplicatorSummary[];
export const __listOfReplicatorSummary = S.Array(ReplicatorSummary);
export interface ListReplicatorsResponse {
  NextToken?: string;
  Replicators?: (ReplicatorSummary & {
    KafkaClustersSummary: (KafkaClusterSummary & {
      AmazonMskCluster: AmazonMskCluster & { MskClusterArn: string };
    })[];
  })[];
}
export const ListReplicatorsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Replicators: S.optional(__listOfReplicatorSummary),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Replicators: "replicators" })),
).annotate({
  identifier: "ListReplicatorsResponse",
}) as any as S.Schema<ListReplicatorsResponse>;
export interface ListScramSecretsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListScramSecretsRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/scram-secrets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListScramSecretsRequest",
}) as any as S.Schema<ListScramSecretsRequest>;
export interface ListScramSecretsResponse {
  NextToken?: string;
  SecretArnList?: string[];
}
export const ListScramSecretsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SecretArnList: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", SecretArnList: "secretArnList" }),
  ),
).annotate({
  identifier: "ListScramSecretsResponse",
}) as any as S.Schema<ListScramSecretsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/tags/{ResourceArn}" }),
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
  S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTopicsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
  TopicNameFilter?: string;
}
export const ListTopicsRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    TopicNameFilter: S.optional(S.String).pipe(T.HttpQuery("topicNameFilter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/topics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTopicsRequest",
}) as any as S.Schema<ListTopicsRequest>;
export interface TopicInfo {
  TopicArn?: string;
  TopicName?: string;
  ReplicationFactor?: number;
  PartitionCount?: number;
  OutOfSyncReplicaCount?: number;
}
export const TopicInfo = S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    TopicName: S.optional(S.String),
    ReplicationFactor: S.optional(S.Number),
    PartitionCount: S.optional(S.Number),
    OutOfSyncReplicaCount: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      TopicArn: "topicArn",
      TopicName: "topicName",
      ReplicationFactor: "replicationFactor",
      PartitionCount: "partitionCount",
      OutOfSyncReplicaCount: "outOfSyncReplicaCount",
    }),
  ),
).annotate({ identifier: "TopicInfo" }) as any as S.Schema<TopicInfo>;
export type __listOfTopicInfo = TopicInfo[];
export const __listOfTopicInfo = S.Array(TopicInfo);
export interface ListTopicsResponse {
  Topics?: TopicInfo[];
  NextToken?: string;
}
export const ListTopicsResponse = S.suspend(() =>
  S.Struct({
    Topics: S.optional(__listOfTopicInfo),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Topics: "topics", NextToken: "nextToken" })),
).annotate({
  identifier: "ListTopicsResponse",
}) as any as S.Schema<ListTopicsResponse>;
export interface ListVpcConnectionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListVpcConnectionsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/vpc-connections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVpcConnectionsRequest",
}) as any as S.Schema<ListVpcConnectionsRequest>;
export interface VpcConnection {
  VpcConnectionArn?: string;
  TargetClusterArn?: string;
  CreationTime?: Date;
  Authentication?: string;
  VpcId?: string;
  State?: VpcConnectionState;
}
export const VpcConnection = S.suspend(() =>
  S.Struct({
    VpcConnectionArn: S.optional(S.String),
    TargetClusterArn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Authentication: S.optional(S.String),
    VpcId: S.optional(S.String),
    State: S.optional(VpcConnectionState),
  }).pipe(
    S.encodeKeys({
      VpcConnectionArn: "vpcConnectionArn",
      TargetClusterArn: "targetClusterArn",
      CreationTime: "creationTime",
      Authentication: "authentication",
      VpcId: "vpcId",
      State: "state",
    }),
  ),
).annotate({ identifier: "VpcConnection" }) as any as S.Schema<VpcConnection>;
export type __listOfVpcConnection = VpcConnection[];
export const __listOfVpcConnection = S.Array(VpcConnection);
export interface ListVpcConnectionsResponse {
  VpcConnections?: (VpcConnection & {
    VpcConnectionArn: string;
    TargetClusterArn: string;
  })[];
  NextToken?: string;
}
export const ListVpcConnectionsResponse = S.suspend(() =>
  S.Struct({
    VpcConnections: S.optional(__listOfVpcConnection),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ VpcConnections: "vpcConnections", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListVpcConnectionsResponse",
}) as any as S.Schema<ListVpcConnectionsResponse>;
export interface PutClusterPolicyRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  Policy?: string;
}
export const PutClusterPolicyRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String),
    Policy: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ CurrentVersion: "currentVersion", Policy: "policy" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/policy" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutClusterPolicyRequest",
}) as any as S.Schema<PutClusterPolicyRequest>;
export interface PutClusterPolicyResponse {
  CurrentVersion?: string;
}
export const PutClusterPolicyResponse = S.suspend(() =>
  S.Struct({ CurrentVersion: S.optional(S.String) }).pipe(
    S.encodeKeys({ CurrentVersion: "currentVersion" }),
  ),
).annotate({
  identifier: "PutClusterPolicyResponse",
}) as any as S.Schema<PutClusterPolicyResponse>;
export interface RebootBrokerRequest {
  BrokerIds?: string[];
  ClusterArn: string;
}
export const RebootBrokerRequest = S.suspend(() =>
  S.Struct({
    BrokerIds: S.optional(__listOf__string),
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
  })
    .pipe(S.encodeKeys({ BrokerIds: "brokerIds" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/clusters/{ClusterArn}/reboot-broker",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RebootBrokerRequest",
}) as any as S.Schema<RebootBrokerRequest>;
export interface RebootBrokerResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const RebootBrokerResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "RebootBrokerResponse",
}) as any as S.Schema<RebootBrokerResponse>;
export interface RejectClientVpcConnectionRequest {
  ClusterArn: string;
  VpcConnectionArn?: string;
}
export const RejectClientVpcConnectionRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    VpcConnectionArn: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ VpcConnectionArn: "vpcConnectionArn" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/clusters/{ClusterArn}/client-vpc-connection",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RejectClientVpcConnectionRequest",
}) as any as S.Schema<RejectClientVpcConnectionRequest>;
export interface RejectClientVpcConnectionResponse {}
export const RejectClientVpcConnectionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RejectClientVpcConnectionResponse",
}) as any as S.Schema<RejectClientVpcConnectionResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/tags/{ResourceArn}" }),
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
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/tags/{ResourceArn}" }),
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
export interface UpdateBrokerCountRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  TargetNumberOfBrokerNodes?: number;
}
export const UpdateBrokerCountRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String),
    TargetNumberOfBrokerNodes: S.optional(S.Number),
  })
    .pipe(
      S.encodeKeys({
        CurrentVersion: "currentVersion",
        TargetNumberOfBrokerNodes: "targetNumberOfBrokerNodes",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/nodes/count" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBrokerCountRequest",
}) as any as S.Schema<UpdateBrokerCountRequest>;
export interface UpdateBrokerCountResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateBrokerCountResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateBrokerCountResponse",
}) as any as S.Schema<UpdateBrokerCountResponse>;
export interface UpdateBrokerStorageRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  TargetBrokerEBSVolumeInfo?: BrokerEBSVolumeInfo[];
}
export const UpdateBrokerStorageRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String),
    TargetBrokerEBSVolumeInfo: S.optional(__listOfBrokerEBSVolumeInfo),
  })
    .pipe(
      S.encodeKeys({
        CurrentVersion: "currentVersion",
        TargetBrokerEBSVolumeInfo: "targetBrokerEBSVolumeInfo",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/clusters/{ClusterArn}/nodes/storage",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBrokerStorageRequest",
}) as any as S.Schema<UpdateBrokerStorageRequest>;
export interface UpdateBrokerStorageResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateBrokerStorageResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateBrokerStorageResponse",
}) as any as S.Schema<UpdateBrokerStorageResponse>;
export interface UpdateBrokerTypeRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  TargetInstanceType?: string;
}
export const UpdateBrokerTypeRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String),
    TargetInstanceType: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        CurrentVersion: "currentVersion",
        TargetInstanceType: "targetInstanceType",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/nodes/type" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBrokerTypeRequest",
}) as any as S.Schema<UpdateBrokerTypeRequest>;
export interface UpdateBrokerTypeResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateBrokerTypeResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateBrokerTypeResponse",
}) as any as S.Schema<UpdateBrokerTypeResponse>;
export interface UpdateClusterConfigurationRequest {
  ClusterArn: string;
  ConfigurationInfo?: ConfigurationInfo;
  CurrentVersion?: string;
}
export const UpdateClusterConfigurationRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    ConfigurationInfo: S.optional(ConfigurationInfo),
    CurrentVersion: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ConfigurationInfo: "configurationInfo",
        CurrentVersion: "currentVersion",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/clusters/{ClusterArn}/configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateClusterConfigurationRequest",
}) as any as S.Schema<UpdateClusterConfigurationRequest>;
export interface UpdateClusterConfigurationResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateClusterConfigurationResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateClusterConfigurationResponse",
}) as any as S.Schema<UpdateClusterConfigurationResponse>;
export interface UpdateClusterKafkaVersionRequest {
  ClusterArn: string;
  ConfigurationInfo?: ConfigurationInfo;
  CurrentVersion?: string;
  TargetKafkaVersion?: string;
}
export const UpdateClusterKafkaVersionRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    ConfigurationInfo: S.optional(ConfigurationInfo),
    CurrentVersion: S.optional(S.String),
    TargetKafkaVersion: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ConfigurationInfo: "configurationInfo",
        CurrentVersion: "currentVersion",
        TargetKafkaVersion: "targetKafkaVersion",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/version" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateClusterKafkaVersionRequest",
}) as any as S.Schema<UpdateClusterKafkaVersionRequest>;
export interface UpdateClusterKafkaVersionResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateClusterKafkaVersionResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateClusterKafkaVersionResponse",
}) as any as S.Schema<UpdateClusterKafkaVersionResponse>;
export interface UpdateConfigurationRequest {
  Arn: string;
  Description?: string;
  ServerProperties?: Uint8Array;
}
export const UpdateConfigurationRequest = S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Description: S.optional(S.String),
    ServerProperties: S.optional(T.Blob),
  })
    .pipe(
      S.encodeKeys({
        Description: "description",
        ServerProperties: "serverProperties",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/configurations/{Arn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateConfigurationRequest",
}) as any as S.Schema<UpdateConfigurationRequest>;
export interface UpdateConfigurationResponse {
  Arn?: string;
  LatestRevision?: ConfigurationRevision & {
    CreationTime: __timestampIso8601;
    Revision: number;
  };
}
export const UpdateConfigurationResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    LatestRevision: S.optional(ConfigurationRevision),
  }).pipe(S.encodeKeys({ Arn: "arn", LatestRevision: "latestRevision" })),
).annotate({
  identifier: "UpdateConfigurationResponse",
}) as any as S.Schema<UpdateConfigurationResponse>;
export interface UpdateConnectivityRequest {
  ClusterArn: string;
  ConnectivityInfo?: ConnectivityInfo;
  CurrentVersion?: string;
}
export const UpdateConnectivityRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    ConnectivityInfo: S.optional(ConnectivityInfo),
    CurrentVersion: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ConnectivityInfo: "connectivityInfo",
        CurrentVersion: "currentVersion",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/clusters/{ClusterArn}/connectivity",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateConnectivityRequest",
}) as any as S.Schema<UpdateConnectivityRequest>;
export interface UpdateConnectivityResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateConnectivityResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateConnectivityResponse",
}) as any as S.Schema<UpdateConnectivityResponse>;
export interface UpdateMonitoringRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  EnhancedMonitoring?: EnhancedMonitoring;
  OpenMonitoring?: OpenMonitoringInfo;
  LoggingInfo?: LoggingInfo;
}
export const UpdateMonitoringRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String),
    EnhancedMonitoring: S.optional(EnhancedMonitoring),
    OpenMonitoring: S.optional(OpenMonitoringInfo),
    LoggingInfo: S.optional(LoggingInfo),
  })
    .pipe(
      S.encodeKeys({
        CurrentVersion: "currentVersion",
        EnhancedMonitoring: "enhancedMonitoring",
        OpenMonitoring: "openMonitoring",
        LoggingInfo: "loggingInfo",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/monitoring" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMonitoringRequest",
}) as any as S.Schema<UpdateMonitoringRequest>;
export interface UpdateMonitoringResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateMonitoringResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateMonitoringResponse",
}) as any as S.Schema<UpdateMonitoringResponse>;
export interface UpdateRebalancingRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  Rebalancing?: Rebalancing;
}
export const UpdateRebalancingRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String),
    Rebalancing: S.optional(Rebalancing),
  })
    .pipe(
      S.encodeKeys({
        CurrentVersion: "currentVersion",
        Rebalancing: "rebalancing",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/rebalancing" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRebalancingRequest",
}) as any as S.Schema<UpdateRebalancingRequest>;
export interface UpdateRebalancingResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateRebalancingResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateRebalancingResponse",
}) as any as S.Schema<UpdateRebalancingResponse>;
export interface ConsumerGroupReplicationUpdate {
  ConsumerGroupsToExclude?: string[];
  ConsumerGroupsToReplicate?: string[];
  DetectAndCopyNewConsumerGroups?: boolean;
  SynchroniseConsumerGroupOffsets?: boolean;
}
export const ConsumerGroupReplicationUpdate = S.suspend(() =>
  S.Struct({
    ConsumerGroupsToExclude: S.optional(__listOf__stringMax256),
    ConsumerGroupsToReplicate: S.optional(__listOf__stringMax256),
    DetectAndCopyNewConsumerGroups: S.optional(S.Boolean),
    SynchroniseConsumerGroupOffsets: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      ConsumerGroupsToExclude: "consumerGroupsToExclude",
      ConsumerGroupsToReplicate: "consumerGroupsToReplicate",
      DetectAndCopyNewConsumerGroups: "detectAndCopyNewConsumerGroups",
      SynchroniseConsumerGroupOffsets: "synchroniseConsumerGroupOffsets",
    }),
  ),
).annotate({
  identifier: "ConsumerGroupReplicationUpdate",
}) as any as S.Schema<ConsumerGroupReplicationUpdate>;
export interface TopicReplicationUpdate {
  CopyAccessControlListsForTopics?: boolean;
  CopyTopicConfigurations?: boolean;
  DetectAndCopyNewTopics?: boolean;
  TopicsToExclude?: string[];
  TopicsToReplicate?: string[];
}
export const TopicReplicationUpdate = S.suspend(() =>
  S.Struct({
    CopyAccessControlListsForTopics: S.optional(S.Boolean),
    CopyTopicConfigurations: S.optional(S.Boolean),
    DetectAndCopyNewTopics: S.optional(S.Boolean),
    TopicsToExclude: S.optional(__listOf__stringMax249),
    TopicsToReplicate: S.optional(__listOf__stringMax249),
  }).pipe(
    S.encodeKeys({
      CopyAccessControlListsForTopics: "copyAccessControlListsForTopics",
      CopyTopicConfigurations: "copyTopicConfigurations",
      DetectAndCopyNewTopics: "detectAndCopyNewTopics",
      TopicsToExclude: "topicsToExclude",
      TopicsToReplicate: "topicsToReplicate",
    }),
  ),
).annotate({
  identifier: "TopicReplicationUpdate",
}) as any as S.Schema<TopicReplicationUpdate>;
export interface UpdateReplicationInfoRequest {
  ConsumerGroupReplication?: ConsumerGroupReplicationUpdate;
  CurrentVersion?: string;
  ReplicatorArn: string;
  SourceKafkaClusterArn?: string;
  TargetKafkaClusterArn?: string;
  TopicReplication?: TopicReplicationUpdate;
}
export const UpdateReplicationInfoRequest = S.suspend(() =>
  S.Struct({
    ConsumerGroupReplication: S.optional(ConsumerGroupReplicationUpdate),
    CurrentVersion: S.optional(S.String),
    ReplicatorArn: S.String.pipe(T.HttpLabel("ReplicatorArn")),
    SourceKafkaClusterArn: S.optional(S.String),
    TargetKafkaClusterArn: S.optional(S.String),
    TopicReplication: S.optional(TopicReplicationUpdate),
  })
    .pipe(
      S.encodeKeys({
        ConsumerGroupReplication: "consumerGroupReplication",
        CurrentVersion: "currentVersion",
        SourceKafkaClusterArn: "sourceKafkaClusterArn",
        TargetKafkaClusterArn: "targetKafkaClusterArn",
        TopicReplication: "topicReplication",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/replication/v1/replicators/{ReplicatorArn}/replication-info",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateReplicationInfoRequest",
}) as any as S.Schema<UpdateReplicationInfoRequest>;
export interface UpdateReplicationInfoResponse {
  ReplicatorArn?: string;
  ReplicatorState?: ReplicatorState;
}
export const UpdateReplicationInfoResponse = S.suspend(() =>
  S.Struct({
    ReplicatorArn: S.optional(S.String),
    ReplicatorState: S.optional(ReplicatorState),
  }).pipe(
    S.encodeKeys({
      ReplicatorArn: "replicatorArn",
      ReplicatorState: "replicatorState",
    }),
  ),
).annotate({
  identifier: "UpdateReplicationInfoResponse",
}) as any as S.Schema<UpdateReplicationInfoResponse>;
export interface UpdateSecurityRequest {
  ClientAuthentication?: ClientAuthentication;
  ClusterArn: string;
  CurrentVersion?: string;
  EncryptionInfo?: EncryptionInfo;
}
export const UpdateSecurityRequest = S.suspend(() =>
  S.Struct({
    ClientAuthentication: S.optional(ClientAuthentication),
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String),
    EncryptionInfo: S.optional(EncryptionInfo),
  })
    .pipe(
      S.encodeKeys({
        ClientAuthentication: "clientAuthentication",
        CurrentVersion: "currentVersion",
        EncryptionInfo: "encryptionInfo",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/v1/clusters/{ClusterArn}/security" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateSecurityRequest",
}) as any as S.Schema<UpdateSecurityRequest>;
export interface UpdateSecurityResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateSecurityResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateSecurityResponse",
}) as any as S.Schema<UpdateSecurityResponse>;
export interface UpdateStorageRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  ProvisionedThroughput?: ProvisionedThroughput;
  StorageMode?: StorageMode;
  VolumeSizeGB?: number;
}
export const UpdateStorageRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    CurrentVersion: S.optional(S.String),
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    StorageMode: S.optional(StorageMode),
    VolumeSizeGB: S.optional(S.Number),
  })
    .pipe(
      S.encodeKeys({
        CurrentVersion: "currentVersion",
        ProvisionedThroughput: "provisionedThroughput",
        StorageMode: "storageMode",
        VolumeSizeGB: "volumeSizeGB",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/storage" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateStorageRequest",
}) as any as S.Schema<UpdateStorageRequest>;
export interface UpdateStorageResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export const UpdateStorageResponse = S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ClusterOperationArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClusterArn: "clusterArn",
      ClusterOperationArn: "clusterOperationArn",
    }),
  ),
).annotate({
  identifier: "UpdateStorageResponse",
}) as any as S.Schema<UpdateStorageResponse>;
export interface UpdateTopicRequest {
  ClusterArn: string;
  TopicName: string;
  Configs?: string;
  PartitionCount?: number;
}
export const UpdateTopicRequest = S.suspend(() =>
  S.Struct({
    ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
    TopicName: S.String.pipe(T.HttpLabel("TopicName")),
    Configs: S.optional(S.String),
    PartitionCount: S.optional(S.Number),
  })
    .pipe(
      S.encodeKeys({ Configs: "configs", PartitionCount: "partitionCount" }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/clusters/{ClusterArn}/topics/{TopicName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateTopicRequest",
}) as any as S.Schema<UpdateTopicRequest>;
export interface UpdateTopicResponse {
  TopicArn?: string;
  TopicName?: string;
  Status?: TopicState;
}
export const UpdateTopicResponse = S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    TopicName: S.optional(S.String),
    Status: S.optional(TopicState),
  }).pipe(
    S.encodeKeys({
      TopicArn: "topicArn",
      TopicName: "topicName",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "UpdateTopicResponse",
}) as any as S.Schema<UpdateTopicResponse>;

//# Errors
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ForbiddenException extends S.TaggedErrorClass<ForbiddenException>()(
  "ForbiddenException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class InternalServerErrorException extends S.TaggedErrorClass<InternalServerErrorException>()(
  "InternalServerErrorException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class UnauthorizedException extends S.TaggedErrorClass<UnauthorizedException>()(
  "UnauthorizedException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class ClusterConnectivityException extends S.TaggedErrorClass<ClusterConnectivityException>()(
  "ClusterConnectivityException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class ControllerMovedException extends S.TaggedErrorClass<ControllerMovedException>()(
  "ControllerMovedException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class GroupSubscribedToTopicException extends S.TaggedErrorClass<GroupSubscribedToTopicException>()(
  "GroupSubscribedToTopicException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class KafkaRequestException extends S.TaggedErrorClass<KafkaRequestException>()(
  "KafkaRequestException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class KafkaTimeoutException extends S.TaggedErrorClass<KafkaTimeoutException>()(
  "KafkaTimeoutException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class NotControllerException extends S.TaggedErrorClass<NotControllerException>()(
  "NotControllerException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class ReassignmentInProgressException extends S.TaggedErrorClass<ReassignmentInProgressException>()(
  "ReassignmentInProgressException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class TopicExistsException extends S.TaggedErrorClass<TopicExistsException>()(
  "TopicExistsException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class UnknownTopicOrPartitionException extends S.TaggedErrorClass<UnknownTopicOrPartitionException>()(
  "UnknownTopicOrPartitionException",
  { InvalidParameter: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Associates one or more Scram Secrets with an Amazon MSK cluster.
 */
export const batchAssociateScramSecret: API.OperationMethod<
  BatchAssociateScramSecretRequest,
  BatchAssociateScramSecretResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchAssociateScramSecretRequest,
  output: BatchAssociateScramSecretResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Disassociates one or more Scram Secrets from an Amazon MSK cluster.
 */
export const batchDisassociateScramSecret: API.OperationMethod<
  BatchDisassociateScramSecretRequest,
  BatchDisassociateScramSecretResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDisassociateScramSecretRequest,
  output: BatchDisassociateScramSecretResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Creates a new MSK cluster.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateClusterRequest,
  output: CreateClusterResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Creates a new MSK cluster.
 */
export const createClusterV2: API.OperationMethod<
  CreateClusterV2Request,
  CreateClusterV2Response,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateClusterV2Request,
  output: CreateClusterV2Response,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Creates a new MSK configuration.
 */
export const createConfiguration: API.OperationMethod<
  CreateConfigurationRequest,
  CreateConfigurationResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConfigurationRequest,
  output: CreateConfigurationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Creates the replicator.
 */
export const createReplicator: API.OperationMethod<
  CreateReplicatorRequest,
  CreateReplicatorResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateReplicatorRequest,
  output: CreateReplicatorResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Creates a topic in the specified MSK cluster.
 */
export const createTopic: API.OperationMethod<
  CreateTopicRequest,
  CreateTopicResponse,
  | BadRequestException
  | ClusterConnectivityException
  | ConflictException
  | ControllerMovedException
  | ForbiddenException
  | GroupSubscribedToTopicException
  | InternalServerErrorException
  | KafkaRequestException
  | KafkaTimeoutException
  | NotControllerException
  | ReassignmentInProgressException
  | ServiceUnavailableException
  | TooManyRequestsException
  | TopicExistsException
  | UnauthorizedException
  | UnknownTopicOrPartitionException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTopicRequest,
  output: CreateTopicResponse,
  errors: [
    BadRequestException,
    ClusterConnectivityException,
    ConflictException,
    ControllerMovedException,
    ForbiddenException,
    GroupSubscribedToTopicException,
    InternalServerErrorException,
    KafkaRequestException,
    KafkaTimeoutException,
    NotControllerException,
    ReassignmentInProgressException,
    ServiceUnavailableException,
    TooManyRequestsException,
    TopicExistsException,
    UnauthorizedException,
    UnknownTopicOrPartitionException,
  ],
}));
/**
 * Creates a new MSK VPC connection.
 */
export const createVpcConnection: API.OperationMethod<
  CreateVpcConnectionRequest,
  CreateVpcConnectionResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVpcConnectionRequest,
  output: CreateVpcConnectionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Deletes the MSK cluster specified by the Amazon Resource Name (ARN) in the request.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteClusterRequest,
  output: DeleteClusterResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
}));
/**
 * Deletes the MSK cluster policy specified by the Amazon Resource Name (ARN) in the request.
 */
export const deleteClusterPolicy: API.OperationMethod<
  DeleteClusterPolicyRequest,
  DeleteClusterPolicyResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteClusterPolicyRequest,
  output: DeleteClusterPolicyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
}));
/**
 * Deletes an MSK Configuration.
 */
export const deleteConfiguration: API.OperationMethod<
  DeleteConfigurationRequest,
  DeleteConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConfigurationRequest,
  output: DeleteConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
}));
/**
 * Deletes a replicator.
 */
export const deleteReplicator: API.OperationMethod<
  DeleteReplicatorRequest,
  DeleteReplicatorResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteReplicatorRequest,
  output: DeleteReplicatorResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Deletes a topic in the specified MSK cluster.
 */
export const deleteTopic: API.OperationMethod<
  DeleteTopicRequest,
  DeleteTopicResponse,
  | BadRequestException
  | ClusterConnectivityException
  | ControllerMovedException
  | ForbiddenException
  | GroupSubscribedToTopicException
  | InternalServerErrorException
  | KafkaRequestException
  | KafkaTimeoutException
  | NotControllerException
  | NotFoundException
  | ReassignmentInProgressException
  | UnknownTopicOrPartitionException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTopicRequest,
  output: DeleteTopicResponse,
  errors: [
    BadRequestException,
    ClusterConnectivityException,
    ControllerMovedException,
    ForbiddenException,
    GroupSubscribedToTopicException,
    InternalServerErrorException,
    KafkaRequestException,
    KafkaTimeoutException,
    NotControllerException,
    NotFoundException,
    ReassignmentInProgressException,
    UnknownTopicOrPartitionException,
  ],
}));
/**
 * Deletes a MSK VPC connection.
 */
export const deleteVpcConnection: API.OperationMethod<
  DeleteVpcConnectionRequest,
  DeleteVpcConnectionResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVpcConnectionRequest,
  output: DeleteVpcConnectionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
}));
/**
 * Returns a description of the MSK cluster whose Amazon Resource Name (ARN) is specified in the request.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeClusterRequest,
  output: DescribeClusterResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
}));
/**
 * Returns a description of the cluster operation specified by the ARN.
 */
export const describeClusterOperation: API.OperationMethod<
  DescribeClusterOperationRequest,
  DescribeClusterOperationResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeClusterOperationRequest,
  output: DescribeClusterOperationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
}));
/**
 * Returns a description of the cluster operation specified by the ARN.
 */
export const describeClusterOperationV2: API.OperationMethod<
  DescribeClusterOperationV2Request,
  DescribeClusterOperationV2Response,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeClusterOperationV2Request,
  output: DescribeClusterOperationV2Response,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Returns a description of the MSK cluster whose Amazon Resource Name (ARN) is specified in the request.
 */
export const describeClusterV2: API.OperationMethod<
  DescribeClusterV2Request,
  DescribeClusterV2Response,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeClusterV2Request,
  output: DescribeClusterV2Response,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
}));
/**
 * Returns a description of this MSK configuration.
 */
export const describeConfiguration: API.OperationMethod<
  DescribeConfigurationRequest,
  DescribeConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeConfigurationRequest,
  output: DescribeConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Returns a description of this revision of the configuration.
 */
export const describeConfigurationRevision: API.OperationMethod<
  DescribeConfigurationRevisionRequest,
  DescribeConfigurationRevisionResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeConfigurationRevisionRequest,
  output: DescribeConfigurationRevisionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Describes a replicator.
 */
export const describeReplicator: API.OperationMethod<
  DescribeReplicatorRequest,
  DescribeReplicatorResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeReplicatorRequest,
  output: DescribeReplicatorResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Returns topic details of this topic on a MSK cluster.
 */
export const describeTopic: API.OperationMethod<
  DescribeTopicRequest,
  DescribeTopicResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeTopicRequest,
  output: DescribeTopicResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
}));
/**
 * Returns partition details of this topic on a MSK cluster.
 */
export const describeTopicPartitions: API.OperationMethod<
  DescribeTopicPartitionsRequest,
  DescribeTopicPartitionsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeTopicPartitionsRequest,
  ) => stream.Stream<
    DescribeTopicPartitionsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeTopicPartitionsRequest,
  ) => stream.Stream<
    TopicPartitionInfo,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeTopicPartitionsRequest,
  output: DescribeTopicPartitionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Partitions",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a description of this MSK VPC connection.
 */
export const describeVpcConnection: API.OperationMethod<
  DescribeVpcConnectionRequest,
  DescribeVpcConnectionResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeVpcConnectionRequest,
  output: DescribeVpcConnectionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * A list of brokers that a client application can use to bootstrap. This list doesn't necessarily include all of the brokers in the cluster. The following Python 3.6 example shows how you can use the Amazon Resource Name (ARN) of a cluster to get its bootstrap brokers. If you don't know the ARN of your cluster, you can use the `ListClusters` operation to get the ARNs of all the clusters in this account and Region.
 */
export const getBootstrapBrokers: API.OperationMethod<
  GetBootstrapBrokersRequest,
  GetBootstrapBrokersResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBootstrapBrokersRequest,
  output: GetBootstrapBrokersResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
}));
/**
 * Get the MSK cluster policy specified by the Amazon Resource Name (ARN) in the request.
 */
export const getClusterPolicy: API.OperationMethod<
  GetClusterPolicyRequest,
  GetClusterPolicyResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetClusterPolicyRequest,
  output: GetClusterPolicyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
}));
/**
 * Gets the Apache Kafka versions to which you can update the MSK cluster.
 */
export const getCompatibleKafkaVersions: API.OperationMethod<
  GetCompatibleKafkaVersionsRequest,
  GetCompatibleKafkaVersionsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCompatibleKafkaVersionsRequest,
  output: GetCompatibleKafkaVersionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Returns a list of all the VPC connections in this Region.
 */
export const listClientVpcConnections: API.OperationMethod<
  ListClientVpcConnectionsRequest,
  ListClientVpcConnectionsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListClientVpcConnectionsRequest,
  ) => stream.Stream<
    ListClientVpcConnectionsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListClientVpcConnectionsRequest,
  ) => stream.Stream<
    ClientVpcConnection,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListClientVpcConnectionsRequest,
  output: ListClientVpcConnectionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClientVpcConnections",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of all the operations that have been performed on the specified MSK cluster.
 */
export const listClusterOperations: API.OperationMethod<
  ListClusterOperationsRequest,
  ListClusterOperationsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListClusterOperationsRequest,
  ) => stream.Stream<
    ListClusterOperationsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListClusterOperationsRequest,
  ) => stream.Stream<
    ClusterOperationInfo,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListClusterOperationsRequest,
  output: ListClusterOperationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterOperationInfoList",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of all the operations that have been performed on the specified MSK cluster.
 */
export const listClusterOperationsV2: API.OperationMethod<
  ListClusterOperationsV2Request,
  ListClusterOperationsV2Response,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListClusterOperationsV2Request,
  ) => stream.Stream<
    ListClusterOperationsV2Response,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListClusterOperationsV2Request,
  ) => stream.Stream<
    ClusterOperationV2Summary,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListClusterOperationsV2Request,
  output: ListClusterOperationsV2Response,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterOperationInfoList",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of all the MSK clusters in the current Region.
 */
export const listClusters: API.OperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListClustersRequest,
  ) => stream.Stream<
    ListClustersResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListClustersRequest,
  ) => stream.Stream<
    ClusterInfo,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListClustersRequest,
  output: ListClustersResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterInfoList",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of all the MSK clusters in the current Region.
 */
export const listClustersV2: API.OperationMethod<
  ListClustersV2Request,
  ListClustersV2Response,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListClustersV2Request,
  ) => stream.Stream<
    ListClustersV2Response,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListClustersV2Request,
  ) => stream.Stream<
    Cluster,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListClustersV2Request,
  output: ListClustersV2Response,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterInfoList",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of all the MSK configurations in this Region.
 */
export const listConfigurationRevisions: API.OperationMethod<
  ListConfigurationRevisionsRequest,
  ListConfigurationRevisionsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListConfigurationRevisionsRequest,
  ) => stream.Stream<
    ListConfigurationRevisionsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListConfigurationRevisionsRequest,
  ) => stream.Stream<
    ConfigurationRevision,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationRevisionsRequest,
  output: ListConfigurationRevisionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Revisions",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of all the MSK configurations in this Region.
 */
export const listConfigurations: API.OperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListConfigurationsRequest,
  ) => stream.Stream<
    ListConfigurationsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListConfigurationsRequest,
  ) => stream.Stream<
    Configuration,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationsRequest,
  output: ListConfigurationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Configurations",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of Apache Kafka versions.
 */
export const listKafkaVersions: API.OperationMethod<
  ListKafkaVersionsRequest,
  ListKafkaVersionsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListKafkaVersionsRequest,
  ) => stream.Stream<
    ListKafkaVersionsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListKafkaVersionsRequest,
  ) => stream.Stream<
    KafkaVersion,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListKafkaVersionsRequest,
  output: ListKafkaVersionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "KafkaVersions",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of the broker nodes in the cluster.
 */
export const listNodes: API.OperationMethod<
  ListNodesRequest,
  ListNodesResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListNodesRequest,
  ) => stream.Stream<
    ListNodesResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListNodesRequest,
  ) => stream.Stream<
    NodeInfo,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListNodesRequest,
  output: ListNodesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NodeInfoList",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the replicators.
 */
export const listReplicators: API.OperationMethod<
  ListReplicatorsRequest,
  ListReplicatorsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListReplicatorsRequest,
  ) => stream.Stream<
    ListReplicatorsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReplicatorsRequest,
  ) => stream.Stream<
    ReplicatorSummary,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReplicatorsRequest,
  output: ListReplicatorsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Replicators",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of the Scram Secrets associated with an Amazon MSK cluster.
 */
export const listScramSecrets: API.OperationMethod<
  ListScramSecretsRequest,
  ListScramSecretsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListScramSecretsRequest,
  ) => stream.Stream<
    ListScramSecretsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListScramSecretsRequest,
  ) => stream.Stream<
    string,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScramSecretsRequest,
  output: ListScramSecretsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecretArnList",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of the tags associated with the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
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
/**
 * List topics in a MSK cluster.
 */
export const listTopics: API.OperationMethod<
  ListTopicsRequest,
  ListTopicsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTopicsRequest,
  ) => stream.Stream<
    ListTopicsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTopicsRequest,
  ) => stream.Stream<
    TopicInfo,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTopicsRequest,
  output: ListTopicsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Topics",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of all the VPC connections in this Region.
 */
export const listVpcConnections: API.OperationMethod<
  ListVpcConnectionsRequest,
  ListVpcConnectionsResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVpcConnectionsRequest,
  ) => stream.Stream<
    ListVpcConnectionsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVpcConnectionsRequest,
  ) => stream.Stream<
    VpcConnection,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | ServiceUnavailableException
    | UnauthorizedException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVpcConnectionsRequest,
  output: ListVpcConnectionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VpcConnections",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Creates or updates the MSK cluster policy specified by the cluster Amazon Resource Name (ARN) in the request.
 */
export const putClusterPolicy: API.OperationMethod<
  PutClusterPolicyRequest,
  PutClusterPolicyResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutClusterPolicyRequest,
  output: PutClusterPolicyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
}));
/**
 * Reboots brokers.
 */
export const rebootBroker: API.OperationMethod<
  RebootBrokerRequest,
  RebootBrokerResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RebootBrokerRequest,
  output: RebootBrokerResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Returns empty response.
 */
export const rejectClientVpcConnection: API.OperationMethod<
  RejectClientVpcConnectionRequest,
  RejectClientVpcConnectionResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RejectClientVpcConnectionRequest,
  output: RejectClientVpcConnectionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Adds tags to the specified MSK resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
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
/**
 * Removes the tags associated with the keys that are provided in the query.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors,
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
/**
 * Updates the number of broker nodes in the cluster.
 */
export const updateBrokerCount: API.OperationMethod<
  UpdateBrokerCountRequest,
  UpdateBrokerCountResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBrokerCountRequest,
  output: UpdateBrokerCountResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Updates the EBS storage associated with MSK brokers.
 */
export const updateBrokerStorage: API.OperationMethod<
  UpdateBrokerStorageRequest,
  UpdateBrokerStorageResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBrokerStorageRequest,
  output: UpdateBrokerStorageResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Updates EC2 instance type.
 */
export const updateBrokerType: API.OperationMethod<
  UpdateBrokerTypeRequest,
  UpdateBrokerTypeResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBrokerTypeRequest,
  output: UpdateBrokerTypeResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Updates the cluster with the configuration that is specified in the request body.
 */
export const updateClusterConfiguration: API.OperationMethod<
  UpdateClusterConfigurationRequest,
  UpdateClusterConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateClusterConfigurationRequest,
  output: UpdateClusterConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Updates the Apache Kafka version for the cluster.
 */
export const updateClusterKafkaVersion: API.OperationMethod<
  UpdateClusterKafkaVersionRequest,
  UpdateClusterKafkaVersionResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateClusterKafkaVersionRequest,
  output: UpdateClusterKafkaVersionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Updates an MSK configuration.
 */
export const updateConfiguration: API.OperationMethod<
  UpdateConfigurationRequest,
  UpdateConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConfigurationRequest,
  output: UpdateConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Updates the cluster's connectivity configuration.
 */
export const updateConnectivity: API.OperationMethod<
  UpdateConnectivityRequest,
  UpdateConnectivityResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConnectivityRequest,
  output: UpdateConnectivityResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Updates the monitoring settings for the cluster. You can use this operation to specify which Apache Kafka metrics you want Amazon MSK to send to Amazon CloudWatch. You can also specify settings for open monitoring with Prometheus.
 */
export const updateMonitoring: API.OperationMethod<
  UpdateMonitoringRequest,
  UpdateMonitoringResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMonitoringRequest,
  output: UpdateMonitoringResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
}));
/**
 * Use this resource to update the intelligent rebalancing status of an Amazon MSK Provisioned cluster with Express brokers.
 */
export const updateRebalancing: API.OperationMethod<
  UpdateRebalancingRequest,
  UpdateRebalancingResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRebalancingRequest,
  output: UpdateRebalancingResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Updates replication info of a replicator.
 */
export const updateReplicationInfo: API.OperationMethod<
  UpdateReplicationInfoRequest,
  UpdateReplicationInfoResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateReplicationInfoRequest,
  output: UpdateReplicationInfoResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Updates the security settings for the cluster. You can use this operation to specify encryption and authentication on existing clusters.
 */
export const updateSecurity: API.OperationMethod<
  UpdateSecurityRequest,
  UpdateSecurityResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSecurityRequest,
  output: UpdateSecurityResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Updates cluster broker volume size (or) sets cluster storage mode to TIERED.
 */
export const updateStorage: API.OperationMethod<
  UpdateStorageRequest,
  UpdateStorageResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateStorageRequest,
  output: UpdateStorageResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
}));
/**
 * Updates the configuration of the specified topic.
 */
export const updateTopic: API.OperationMethod<
  UpdateTopicRequest,
  UpdateTopicResponse,
  | BadRequestException
  | ClusterConnectivityException
  | ControllerMovedException
  | ForbiddenException
  | GroupSubscribedToTopicException
  | InternalServerErrorException
  | KafkaRequestException
  | KafkaTimeoutException
  | NotControllerException
  | NotFoundException
  | ReassignmentInProgressException
  | ServiceUnavailableException
  | UnauthorizedException
  | UnknownTopicOrPartitionException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateTopicRequest,
  output: UpdateTopicResponse,
  errors: [
    BadRequestException,
    ClusterConnectivityException,
    ControllerMovedException,
    ForbiddenException,
    GroupSubscribedToTopicException,
    InternalServerErrorException,
    KafkaRequestException,
    KafkaTimeoutException,
    NotControllerException,
    NotFoundException,
    ReassignmentInProgressException,
    ServiceUnavailableException,
    UnauthorizedException,
    UnknownTopicOrPartitionException,
  ],
}));
