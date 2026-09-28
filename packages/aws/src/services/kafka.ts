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
  sdkId: "Kafka",
  target: "Kafka",
  version: "2018-11-14",
  sigv4: "kafka",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://kafka-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://kafka-api-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://kafka-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://kafka-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://kafka-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://kafka.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://kafka-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
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
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://kafka-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
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
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    {
      status: 400,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class ClusterConnectivityException
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterConnectivityException",
    ["ConflictError"],
    {
      status: 409,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    renames: { InvalidParameter: "invalidParameter", Message: "message" },
  })<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class ControllerMovedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ControllerMovedException",
    ["ConflictError"],
    {
      status: 409,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
    renames: { InvalidParameter: "invalidParameter", Message: "message" },
  })<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class GroupSubscribedToTopicException
  extends /*@__PURE__*/ TE.TaggedError(
    "GroupSubscribedToTopicException",
    ["ConflictError"],
    {
      status: 409,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    {
      status: 500,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class KafkaRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "KafkaRequestException",
    ["BadRequestError"],
    {
      status: 400,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class KafkaTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "KafkaTimeoutException",
    ["ConflictError"],
    {
      status: 409,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class NotControllerException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotControllerException",
    ["ConflictError"],
    {
      status: 409,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    {
      status: 404,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class ReassignmentInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "ReassignmentInProgressException",
    ["ConflictError"],
    {
      status: 409,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    {
      status: 503,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    {
      status: 429,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class TopicExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TopicExistsException",
    ["ConflictError"],
    {
      status: 409,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
    renames: { InvalidParameter: "invalidParameter", Message: "message" },
  })<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export class UnknownTopicOrPartitionException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnknownTopicOrPartitionException",
    ["BadRequestError"],
    {
      status: 404,
      renames: { InvalidParameter: "invalidParameter", Message: "message" },
    },
  )<{ readonly InvalidParameter?: string; readonly message?: string }> {}
export type __listOf__string = string[];
export interface BatchAssociateScramSecretRequest {
  ClusterArn: string;
  SecretArnList?: string[];
}
export interface UnprocessedScramSecret {
  ErrorCode?: string;
  ErrorMessage?: string;
  SecretArn?: string;
}
export type __listOfUnprocessedScramSecret = UnprocessedScramSecret[];
export interface BatchAssociateScramSecretResponse {
  ClusterArn?: string;
  UnprocessedScramSecrets?: UnprocessedScramSecret[];
}
export interface BatchDisassociateScramSecretRequest {
  ClusterArn: string;
  SecretArnList?: string[];
}
export interface BatchDisassociateScramSecretResponse {
  ClusterArn?: string;
  UnprocessedScramSecrets?: UnprocessedScramSecret[];
}
export interface EncryptionConfiguration {
  KmsKeyArn?: string;
}
export interface Catalog {
  CatalogArn?: string;
  WarehouseLocation?: string;
}
export interface DeadLetterQueueS3 {
  BucketArn?: string;
  ErrorOutputPrefix?: string;
  ExpectedBucketOwner?: string;
}
export type PartitionStrategy = "TIME_HOUR" | (string & {});
export interface PartitionSource {
  SourceName?: string;
}
export type __listOfPartitionSource = PartitionSource[];
export interface PartitionSpec {
  PartitionStrategy?: PartitionStrategy;
  SourceList?: PartitionSource[];
}
export interface DestinationTable {
  DestinationDatabaseName?: string;
  DestinationTableName?: string;
  PartitionSpec?: PartitionSpec;
}
export type __listOfDestinationTable = DestinationTable[];
export interface SchemaEvolution {
  EnableSchemaEvolution?: boolean;
}
export interface TableCreation {
  EnableTableCreation?: boolean;
}
export type IcebergCompressionType = "ZSTD" | "SNAPPY" | (string & {});
export interface IcebergDestinationConfiguration {
  AppendOnly?: boolean;
  Catalog?: Catalog;
  DataFreshnessInSeconds?: number;
  DeadLetterQueueS3?: DeadLetterQueueS3;
  DestinationTableList?: DestinationTable[];
  SchemaEvolution?: SchemaEvolution;
  ServiceExecutionRoleArn?: string;
  TableCreation?: TableCreation;
  CompressionType?: IcebergCompressionType;
}
export type S3CompressionType = "NONE" | "GZIP" | "ZSTD" | (string & {});
export type S3StorageClass =
  | "STANDARD"
  | "INTELLIGENT_TIERING"
  | "GLACIER_IR"
  | (string & {});
export interface S3Storage {
  BucketArn?: string;
  CompressionType?: S3CompressionType;
  OutputPrefix?: string;
  OutputKeyTemplate?: string;
  StorageClass?: S3StorageClass;
  ExpectedBucketOwner?: string;
}
export interface S3DestinationConfiguration {
  DataFreshnessInSeconds?: number;
  DeadLetterQueueS3?: DeadLetterQueueS3;
  ServiceExecutionRoleArn?: string;
  Storage?: S3Storage;
}
export type __mapOf__string = { [key: string]: string | undefined };
export type ValueConverter =
  | "BYTE_ARRAY"
  | "JSON"
  | "JSON_SCHEMA_GSR"
  | "STRING"
  | (string & {});
export interface RecordConverter {
  ValueConverter?: ValueConverter;
}
export interface RecordSchema {
  GsrArn?: string;
}
export interface TopicConfiguration {
  RecordConverter?: RecordConverter;
  RecordSchema?: RecordSchema;
  TopicArn?: string;
}
export type __listOfTopicConfiguration = TopicConfiguration[];
export interface CloudWatchLogs {
  Enabled?: boolean;
  LogGroup?: string;
}
export interface Firehose {
  DeliveryStream?: string;
  Enabled?: boolean;
}
export interface S3 {
  Bucket?: string;
  Enabled?: boolean;
  Prefix?: string;
}
export interface ChannelLoggingInfo {
  CloudWatchLogs?: CloudWatchLogs;
  Firehose?: Firehose;
  S3?: S3;
}
export interface CreateChannelRequest {
  ChannelName?: string;
  ClusterArn: string;
  EncryptionConfiguration?: EncryptionConfiguration;
  IcebergDestinationConfiguration?: IcebergDestinationConfiguration;
  S3DestinationConfiguration?: S3DestinationConfiguration;
  Tags?: { [key: string]: string | undefined };
  TopicConfigurationList?: TopicConfiguration[];
  LoggingInfo?: ChannelLoggingInfo;
}
export interface CreateChannelResponse {
  ChannelArn: string;
  ClusterOperationArn?: string;
}
export type BrokerAZDistribution = "DEFAULT" | (string & {});
export type __stringMin5Max32 = string;
export interface ProvisionedThroughput {
  Enabled?: boolean;
  VolumeThroughput?: number;
}
export type __integerMin1Max16384 = number;
export interface EBSStorageInfo {
  ProvisionedThroughput?: ProvisionedThroughput;
  VolumeSize?: number;
}
export interface StorageInfo {
  EbsStorageInfo?: EBSStorageInfo;
}
export interface PublicAccess {
  Type?: string;
}
export interface VpcConnectivityScram {
  Enabled?: boolean;
}
export interface VpcConnectivityIam {
  Enabled?: boolean;
}
export interface VpcConnectivitySasl {
  Scram?: VpcConnectivityScram;
  Iam?: VpcConnectivityIam;
}
export interface VpcConnectivityTls {
  Enabled?: boolean;
}
export interface VpcConnectivityClientAuthentication {
  Sasl?: VpcConnectivitySasl;
  Tls?: VpcConnectivityTls;
}
export interface VpcConnectivity {
  ClientAuthentication?: VpcConnectivityClientAuthentication;
}
export type NetworkType = "IPV4" | "DUAL" | (string & {});
export interface ConnectivityInfo {
  PublicAccess?: PublicAccess;
  VpcConnectivity?: VpcConnectivity;
  NetworkType?: NetworkType;
}
export interface BrokerNodeGroupInfo {
  BrokerAZDistribution?: BrokerAZDistribution;
  ClientSubnets?: string[];
  InstanceType?: string;
  SecurityGroups?: string[];
  StorageInfo?: StorageInfo;
  ConnectivityInfo?: ConnectivityInfo;
  ZoneIds?: string[];
}
export type RebalancingStatus = "PAUSED" | "ACTIVE" | (string & {});
export interface Rebalancing {
  Status?: RebalancingStatus;
}
export interface Scram {
  Enabled?: boolean;
}
export interface Iam {
  Enabled?: boolean;
}
export interface Sasl {
  Scram?: Scram;
  Iam?: Iam;
}
export interface Tls {
  CertificateAuthorityArnList?: string[];
  Enabled?: boolean;
}
export interface Unauthenticated {
  Enabled?: boolean;
}
export interface ClientAuthentication {
  Sasl?: Sasl;
  Tls?: Tls;
  Unauthenticated?: Unauthenticated;
}
export type __stringMin1Max64 = string;
export interface ConfigurationInfo {
  Arn?: string;
  Revision?: number;
}
export interface EncryptionAtRest {
  DataVolumeKMSKeyId?: string;
}
export type ClientBroker =
  | "TLS"
  | "TLS_PLAINTEXT"
  | "PLAINTEXT"
  | (string & {});
export interface EncryptionInTransit {
  ClientBroker?: ClientBroker;
  InCluster?: boolean;
}
export interface EncryptionInfo {
  EncryptionAtRest?: EncryptionAtRest;
  EncryptionInTransit?: EncryptionInTransit;
}
export type EnhancedMonitoring =
  | "DEFAULT"
  | "PER_BROKER"
  | "PER_TOPIC_PER_BROKER"
  | "PER_TOPIC_PER_PARTITION"
  | (string & {});
export interface JmxExporterInfo {
  EnabledInBroker?: boolean;
}
export interface NodeExporterInfo {
  EnabledInBroker?: boolean;
}
export interface PrometheusInfo {
  JmxExporter?: JmxExporterInfo;
  NodeExporter?: NodeExporterInfo;
}
export interface OpenMonitoringInfo {
  Prometheus?: PrometheusInfo;
}
export type __stringMin1Max128 = string;
export interface AuthorizerLogs {
  CloudWatchLogs?: CloudWatchLogs;
  Firehose?: Firehose;
  S3?: S3;
}
export interface BrokerLogs {
  CloudWatchLogs?: CloudWatchLogs;
  Firehose?: Firehose;
  S3?: S3;
}
export interface LoggingInfo {
  AuthorizerLogs?: AuthorizerLogs;
  BrokerLogs?: BrokerLogs;
}
export type __integerMin1Max15 = number;
export type StorageMode = "LOCAL" | "TIERED" | (string & {});
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
export interface CreateClusterResponse {
  ClusterArn?: string;
  ClusterName?: string;
  State?: ClusterState;
}
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
export interface VpcConfig {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export type __listOfVpcConfig = VpcConfig[];
export interface ServerlessSasl {
  Iam?: Iam;
}
export interface ServerlessClientAuthentication {
  Sasl?: ServerlessSasl;
}
export interface ServerlessRequest {
  VpcConfigs?: VpcConfig[];
  ClientAuthentication?: ServerlessClientAuthentication;
}
export interface CreateClusterV2Request {
  ClusterName?: string;
  Tags?: { [key: string]: string | undefined };
  Provisioned?: ProvisionedRequest;
  Serverless?: ServerlessRequest;
}
export type ClusterType = "PROVISIONED" | "SERVERLESS" | (string & {});
export interface CreateClusterV2Response {
  ClusterArn?: string;
  ClusterName?: string;
  State?: ClusterState;
  ClusterType?: ClusterType;
}
export type __blob = Uint8Array;
export interface CreateConfigurationRequest {
  Description?: string;
  KafkaVersions?: string[];
  Name?: string;
  ServerProperties?: Uint8Array;
}
export type __timestampIso8601 = Date;
export interface ConfigurationRevision {
  CreationTime?: Date;
  Description?: string;
  Revision?: number;
}
export type ConfigurationState =
  | "ACTIVE"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
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
export type __stringMax1024 = string;
export interface AmazonMskCluster {
  MskClusterArn?: string;
}
export interface ApacheKafkaCluster {
  ApacheKafkaClusterId?: string;
  BootstrapBrokerString?: string;
}
export interface KafkaClusterClientVpcConfig {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export type KafkaClusterSaslScramMechanism =
  | "SHA256"
  | "SHA512"
  | (string & {});
export interface KafkaClusterSaslScramAuthentication {
  Mechanism?: KafkaClusterSaslScramMechanism;
  SecretArn?: string;
}
export interface KafkaClusterMTLSAuthentication {
  SecretArn?: string;
}
export interface KafkaClusterOAuthClientCredentials {
  TokenRequestSecretArn?: string;
}
export type JwtSigningAlgorithm = "RS256" | "ES384" | (string & {});
export interface KafkaClusterOAuthIamJwtBearer {
  Audience?: string;
  SigningAlgorithm?: JwtSigningAlgorithm;
  TokenRequestSecretArn?: string;
}
export interface KafkaClusterOAuthClientCredentialsAssertion {
  Audience?: string;
  SigningAlgorithm?: JwtSigningAlgorithm;
  TokenRequestSecretArn?: string;
}
export type TokenEndpointAuthenticationMethod =
  | "POST"
  | "BASIC"
  | "NONE"
  | (string & {});
export interface KafkaClusterSaslOAuthBearerAuthentication {
  TokenEndpointUrl?: string;
  ClientCredentials?: KafkaClusterOAuthClientCredentials;
  IamJwtBearer?: KafkaClusterOAuthIamJwtBearer;
  ClientCredentialsAssertion?: KafkaClusterOAuthClientCredentialsAssertion;
  TokenEndpointAuthenticationMethod?: TokenEndpointAuthenticationMethod;
  Scope?: string;
  TokenEndpointTlsCertificateArn?: string;
}
export interface KafkaClusterClientAuthentication {
  SaslScram?: KafkaClusterSaslScramAuthentication;
  MTLS?: KafkaClusterMTLSAuthentication;
  SaslOAuthBearer?: KafkaClusterSaslOAuthBearerAuthentication;
}
export type KafkaClusterEncryptionInTransitType = "TLS" | (string & {});
export interface KafkaClusterEncryptionInTransit {
  EncryptionType?: KafkaClusterEncryptionInTransitType;
  RootCaCertificate?: string;
}
export interface KafkaCluster {
  AmazonMskCluster?: AmazonMskCluster;
  ApacheKafkaCluster?: ApacheKafkaCluster;
  VpcConfig?: KafkaClusterClientVpcConfig;
  ClientAuthentication?: KafkaClusterClientAuthentication;
  EncryptionInTransit?: KafkaClusterEncryptionInTransit;
}
export type __listOfKafkaCluster = KafkaCluster[];
export type __stringMax256 = string;
export type __listOf__stringMax256 = string[];
export type ConsumerGroupOffsetSyncMode = "LEGACY" | "ENHANCED" | (string & {});
export interface ConsumerGroupReplication {
  ConsumerGroupsToExclude?: string[];
  ConsumerGroupsToReplicate?: string[];
  DetectAndCopyNewConsumerGroups?: boolean;
  SynchroniseConsumerGroupOffsets?: boolean;
  ConsumerGroupOffsetSyncMode?: ConsumerGroupOffsetSyncMode;
}
export type TargetCompressionType =
  | "NONE"
  | "GZIP"
  | "SNAPPY"
  | "LZ4"
  | "ZSTD"
  | (string & {});
export type ReplicationStartingPositionType =
  | "LATEST"
  | "EARLIEST"
  | (string & {});
export interface ReplicationStartingPosition {
  Type?: ReplicationStartingPositionType;
}
export type ReplicationTopicNameConfigurationType =
  | "PREFIXED_WITH_SOURCE_CLUSTER_ALIAS"
  | "IDENTICAL"
  | (string & {});
export interface ReplicationTopicNameConfiguration {
  Type?: ReplicationTopicNameConfigurationType;
}
export type __stringMax249 = string;
export type __listOf__stringMax249 = string[];
export interface TopicReplication {
  CopyAccessControlListsForTopics?: boolean;
  CopyTopicConfigurations?: boolean;
  DetectAndCopyNewTopics?: boolean;
  StartingPosition?: ReplicationStartingPosition;
  TopicNameConfiguration?: ReplicationTopicNameConfiguration;
  TopicsToExclude?: string[];
  TopicsToReplicate?: string[];
}
export interface ReplicationInfo {
  ConsumerGroupReplication?: ConsumerGroupReplication;
  SourceKafkaClusterArn?: string;
  SourceKafkaClusterId?: string;
  TargetCompressionType?: TargetCompressionType;
  TargetKafkaClusterArn?: string;
  TargetKafkaClusterId?: string;
  TopicReplication?: TopicReplication;
}
export type __listOfReplicationInfo = ReplicationInfo[];
export type __stringMin1Max128Pattern09AZaZ09AZaZ0 = string;
export interface ReplicatorCloudWatchLogs {
  Enabled?: boolean;
  LogGroup?: string;
}
export interface ReplicatorFirehose {
  Enabled?: boolean;
  DeliveryStream?: string;
}
export interface ReplicatorS3 {
  Enabled?: boolean;
  Bucket?: string;
  Prefix?: string;
}
export interface ReplicatorLogDelivery {
  CloudWatchLogs?: ReplicatorCloudWatchLogs;
  Firehose?: ReplicatorFirehose;
  S3?: ReplicatorS3;
}
export interface LogDelivery {
  ReplicatorLogDelivery?: ReplicatorLogDelivery;
}
export interface CreateReplicatorRequest {
  Description?: string;
  KafkaClusters?: KafkaCluster[];
  ReplicationInfoList?: ReplicationInfo[];
  ReplicatorName?: string;
  ServiceExecutionRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
  LogDelivery?: LogDelivery;
}
export type ReplicatorState =
  | "RUNNING"
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface CreateReplicatorResponse {
  ReplicatorArn?: string;
  ReplicatorName?: string;
  ReplicatorState?: ReplicatorState;
}
export type __integerMin1 = number;
export interface CreateTopicRequest {
  ClusterArn: string;
  TopicName?: string;
  PartitionCount?: number;
  ReplicationFactor?: number;
  Configs?: string;
}
export type TopicState =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | (string & {});
export interface CreateTopicResponse {
  TopicArn?: string;
  TopicName?: string;
  Status?: TopicState;
}
export interface CreateVpcConnectionRequest {
  TargetClusterArn?: string;
  Authentication?: string;
  VpcId?: string;
  ClientSubnets?: string[];
  SecurityGroups?: string[];
  Tags?: { [key: string]: string | undefined };
}
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
export interface DeleteChannelRequest {
  ChannelArn: string;
  ClusterArn: string;
}
export interface DeleteChannelResponse {
  ChannelArn: string;
  ClusterOperationArn?: string;
}
export interface DeleteClusterRequest {
  ClusterArn: string;
  CurrentVersion?: string;
}
export interface DeleteClusterResponse {
  ClusterArn?: string;
  State?: ClusterState;
}
export interface DeleteClusterPolicyRequest {
  ClusterArn: string;
}
export interface DeleteClusterPolicyResponse {}
export interface DeleteConfigurationRequest {
  Arn: string;
}
export interface DeleteConfigurationResponse {
  Arn?: string;
  State?: ConfigurationState;
}
export interface DeleteReplicatorRequest {
  CurrentVersion?: string;
  ReplicatorArn: string;
}
export interface DeleteReplicatorResponse {
  ReplicatorArn?: string;
  ReplicatorState?: ReplicatorState;
}
export interface DeleteTopicRequest {
  ClusterArn: string;
  TopicName: string;
}
export interface DeleteTopicResponse {
  TopicArn?: string;
  TopicName?: string;
  Status?: TopicState;
}
export interface DeleteVpcConnectionRequest {
  Arn: string;
}
export interface DeleteVpcConnectionResponse {
  VpcConnectionArn?: string;
  State?: VpcConnectionState;
}
export interface DescribeChannelRequest {
  ChannelArn: string;
  ClusterArn: string;
}
export type ChannelStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | "SUSPENDING"
  | "SUSPENDED"
  | (string & {});
export type ChannelDestinationType = "ICEBERG" | "S3" | (string & {});
export interface ChannelStateInfo {
  Code?: string;
  Message?: string;
}
export interface DescribeChannelResponse {
  ChannelArn: string;
  ChannelName: string;
  EncryptionConfiguration?: EncryptionConfiguration & { KmsKeyArn: string };
  IcebergDestinationConfiguration?: IcebergDestinationConfiguration & {
    AppendOnly: boolean;
    DeadLetterQueueS3: DeadLetterQueueS3 & { BucketArn: string };
    DestinationTableList: (DestinationTable & {
      PartitionSpec: PartitionSpec & { PartitionStrategy: PartitionStrategy };
    })[];
    SchemaEvolution: SchemaEvolution;
    ServiceExecutionRoleArn: string;
    TableCreation: TableCreation;
  };
  S3DestinationConfiguration?: S3DestinationConfiguration & {
    DeadLetterQueueS3: DeadLetterQueueS3 & { BucketArn: string };
    ServiceExecutionRoleArn: string;
    Storage: S3Storage & {
      BucketArn: string;
      CompressionType: S3CompressionType;
      StorageClass: S3StorageClass;
    };
  };
  Status: ChannelStatus;
  DestinationType: ChannelDestinationType;
  CreationTime: Date;
  TopicConfigurationList: (TopicConfiguration & {
    RecordConverter: RecordConverter & { ValueConverter: ValueConverter };
    TopicArn: string;
    RecordSchema: RecordSchema & { GsrArn: string };
  })[];
  LoggingInfo?: ChannelLoggingInfo & {
    CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
    Firehose: Firehose & { Enabled: boolean };
    S3: S3 & { Enabled: boolean };
  };
  StateInfo?: ChannelStateInfo;
  ClusterOperationArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeClusterRequest {
  ClusterArn: string;
}
export interface BrokerSoftwareInfo {
  ConfigurationArn?: string;
  ConfigurationRevision?: number;
  KafkaVersion?: string;
}
export interface JmxExporter {
  EnabledInBroker?: boolean;
}
export interface NodeExporter {
  EnabledInBroker?: boolean;
}
export interface Prometheus {
  JmxExporter?: JmxExporter;
  NodeExporter?: NodeExporter;
}
export interface OpenMonitoring {
  Prometheus?: Prometheus;
}
export interface StateInfo {
  Code?: string;
  Message?: string;
}
export type CustomerActionStatus =
  | "CRITICAL_ACTION_REQUIRED"
  | "ACTION_RECOMMENDED"
  | "NONE"
  | (string & {});
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
      AuthorizerLogs: AuthorizerLogs & {
        CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
        Firehose: Firehose & { Enabled: boolean };
        S3: S3 & { Enabled: boolean };
      };
    };
  };
}
export interface DescribeClusterOperationRequest {
  ClusterOperationArn: string;
}
export interface ErrorInfo {
  ErrorCode?: string;
  ErrorString?: string;
}
export interface ClusterOperationStepInfo {
  StepStatus?: string;
}
export interface ClusterOperationStep {
  StepInfo?: ClusterOperationStepInfo;
  StepName?: string;
}
export type __listOfClusterOperationStep = ClusterOperationStep[];
export interface BrokerEBSVolumeInfo {
  KafkaBrokerNodeId?: string;
  ProvisionedThroughput?: ProvisionedThroughput;
  VolumeSizeGB?: number;
}
export type __listOfBrokerEBSVolumeInfo = BrokerEBSVolumeInfo[];
export interface ZookeeperAccess {
  Enabled?: boolean;
}
export type __listOf__double = number[];
export interface BrokerCountUpdateInfo {
  CreatedBrokerIds?: number[];
  DeletedBrokerIds?: number[];
}
export interface MutableClusterInfo {
  BrokerEBSVolumeInfo?: BrokerEBSVolumeInfo[];
  ConfigurationInfo?: ConfigurationInfo;
  NumberOfBrokerNodes?: number;
  EnhancedMonitoring?: EnhancedMonitoring;
  OpenMonitoring?: OpenMonitoring;
  ZookeeperAccess?: ZookeeperAccess;
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
export type UserIdentityType = "AWSACCOUNT" | "AWSSERVICE" | (string & {});
export interface UserIdentity {
  Type?: UserIdentityType;
  PrincipalId?: string;
}
export interface VpcConnectionInfo {
  VpcConnectionArn?: string;
  Owner?: string;
  UserIdentity?: UserIdentity;
  CreationTime?: Date;
}
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
        AuthorizerLogs: AuthorizerLogs & {
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
        AuthorizerLogs: AuthorizerLogs & {
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
export interface DescribeClusterOperationV2Request {
  ClusterOperationArn: string;
}
export interface ClusterOperationV2Provisioned {
  OperationSteps?: ClusterOperationStep[];
  SourceClusterInfo?: MutableClusterInfo;
  TargetClusterInfo?: MutableClusterInfo;
  VpcConnectionInfo?: VpcConnectionInfo;
}
export interface ServerlessConnectivityInfo {
  NetworkType?: NetworkType;
}
export interface VpcConnectionInfoServerless {
  CreationTime?: Date;
  Owner?: string;
  UserIdentity?: UserIdentity;
  VpcConnectionArn?: string;
}
export interface ClusterOperationV2Serverless {
  SourceClusterInfo?: ServerlessConnectivityInfo;
  TargetClusterInfo?: ServerlessConnectivityInfo;
  VpcConnectionInfo?: VpcConnectionInfoServerless;
}
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
          AuthorizerLogs: AuthorizerLogs & {
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
          AuthorizerLogs: AuthorizerLogs & {
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
export interface DescribeClusterV2Request {
  ClusterArn: string;
}
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
export interface Serverless {
  VpcConfigs?: VpcConfig[];
  ClientAuthentication?: ServerlessClientAuthentication;
  ConnectivityInfo?: ServerlessConnectivityInfo;
}
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
        AuthorizerLogs: AuthorizerLogs & {
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
export interface DescribeConfigurationRequest {
  Arn: string;
}
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
export interface DescribeConfigurationRevisionRequest {
  Arn: string;
  Revision: number;
}
export interface DescribeConfigurationRevisionResponse {
  Arn?: string;
  CreationTime?: Date;
  Description?: string;
  Revision?: number;
  ServerProperties?: Uint8Array;
}
export interface DescribeReplicatorRequest {
  ReplicatorArn: string;
}
export interface KafkaClusterDescription {
  AmazonMskCluster?: AmazonMskCluster;
  ApacheKafkaCluster?: ApacheKafkaCluster;
  KafkaClusterAlias?: string;
  VpcConfig?: KafkaClusterClientVpcConfig;
  ClientAuthentication?: KafkaClusterClientAuthentication;
  EncryptionInTransit?: KafkaClusterEncryptionInTransit;
}
export type __listOfKafkaClusterDescription = KafkaClusterDescription[];
export interface ReplicationInfoDescription {
  ConsumerGroupReplication?: ConsumerGroupReplication;
  SourceKafkaClusterAlias?: string;
  TargetCompressionType?: TargetCompressionType;
  TargetKafkaClusterAlias?: string;
  TopicReplication?: TopicReplication;
}
export type __listOfReplicationInfoDescription = ReplicationInfoDescription[];
export interface ReplicationStateInfo {
  Code?: string;
  Message?: string;
}
export interface DescribeReplicatorResponse {
  CreationTime?: Date;
  CurrentVersion?: string;
  IsReplicatorReference?: boolean;
  KafkaClusters?: (KafkaClusterDescription & {
    AmazonMskCluster: AmazonMskCluster & { MskClusterArn: string };
    ApacheKafkaCluster: ApacheKafkaCluster & {
      ApacheKafkaClusterId: string;
      BootstrapBrokerString: string;
    };
    VpcConfig: KafkaClusterClientVpcConfig & { SubnetIds: __listOf__string };
    ClientAuthentication: KafkaClusterClientAuthentication & {
      SaslScram: KafkaClusterSaslScramAuthentication & {
        Mechanism: KafkaClusterSaslScramMechanism;
        SecretArn: string;
      };
      MTLS: KafkaClusterMTLSAuthentication & { SecretArn: string };
      SaslOAuthBearer: KafkaClusterSaslOAuthBearerAuthentication & {
        TokenEndpointUrl: string;
        TokenEndpointAuthenticationMethod: TokenEndpointAuthenticationMethod;
        ClientCredentials: KafkaClusterOAuthClientCredentials & {
          TokenRequestSecretArn: string;
        };
        IamJwtBearer: KafkaClusterOAuthIamJwtBearer & {
          Audience: string;
          SigningAlgorithm: JwtSigningAlgorithm;
        };
        ClientCredentialsAssertion: KafkaClusterOAuthClientCredentialsAssertion & {
          Audience: string;
          SigningAlgorithm: JwtSigningAlgorithm;
        };
      };
    };
    EncryptionInTransit: KafkaClusterEncryptionInTransit & {
      EncryptionType: KafkaClusterEncryptionInTransitType;
    };
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
  LogDelivery?: LogDelivery & {
    ReplicatorLogDelivery: ReplicatorLogDelivery & {
      CloudWatchLogs: ReplicatorCloudWatchLogs & { Enabled: boolean };
      Firehose: ReplicatorFirehose & { Enabled: boolean };
      S3: ReplicatorS3 & { Enabled: boolean };
    };
  };
}
export interface DescribeTopicRequest {
  ClusterArn: string;
  TopicName: string;
}
export interface DescribeTopicResponse {
  TopicArn?: string;
  TopicName?: string;
  ReplicationFactor?: number;
  PartitionCount?: number;
  Configs?: string;
  Status?: TopicState;
}
export type MaxResults = number;
export interface DescribeTopicPartitionsRequest {
  ClusterArn: string;
  TopicName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type __listOf__integer = number[];
export interface TopicPartitionInfo {
  Partition?: number;
  Leader?: number;
  Replicas?: number[];
  Isr?: number[];
}
export type __listOfTopicPartitionInfo = TopicPartitionInfo[];
export interface DescribeTopicPartitionsResponse {
  Partitions?: TopicPartitionInfo[];
  NextToken?: string;
}
export interface DescribeVpcConnectionRequest {
  Arn: string;
}
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
export interface GetBootstrapBrokersRequest {
  ClusterArn: string;
}
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
export interface GetClusterPolicyRequest {
  ClusterArn: string;
}
export interface GetClusterPolicyResponse {
  CurrentVersion?: string;
  Policy?: string;
}
export interface GetCompatibleKafkaVersionsRequest {
  ClusterArn?: string;
}
export interface CompatibleKafkaVersion {
  SourceVersion?: string;
  TargetVersions?: string[];
}
export type __listOfCompatibleKafkaVersion = CompatibleKafkaVersion[];
export interface GetCompatibleKafkaVersionsResponse {
  CompatibleKafkaVersions?: CompatibleKafkaVersion[];
}
export interface ListChannelsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
  TopicNameFilter?: string;
}
export interface ChannelInfo {
  ChannelArn?: string;
  ChannelName?: string;
  Status?: ChannelStatus;
  CreationTime?: Date;
  DestinationType?: ChannelDestinationType;
  ClusterOperationArn?: string;
}
export type __listOfChannelInfo = ChannelInfo[];
export interface ListChannelsResponse {
  Channels?: (ChannelInfo & {
    ChannelArn: string;
    ChannelName: string;
    Status: ChannelStatus;
    CreationTime: __timestampIso8601;
    DestinationType: ChannelDestinationType;
  })[];
  NextToken?: string;
}
export interface ListClientVpcConnectionsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ClientVpcConnection {
  Authentication?: string;
  CreationTime?: Date;
  State?: VpcConnectionState;
  VpcConnectionArn?: string;
  Owner?: string;
}
export type __listOfClientVpcConnection = ClientVpcConnection[];
export interface ListClientVpcConnectionsResponse {
  ClientVpcConnections?: (ClientVpcConnection & { VpcConnectionArn: string })[];
  NextToken?: string;
}
export interface ListClusterOperationsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfClusterOperationInfo = ClusterOperationInfo[];
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
        AuthorizerLogs: AuthorizerLogs & {
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
        AuthorizerLogs: AuthorizerLogs & {
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
export interface ListClusterOperationsV2Request {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ClusterOperationV2Summary {
  ClusterArn?: string;
  ClusterType?: ClusterType;
  StartTime?: Date;
  EndTime?: Date;
  OperationArn?: string;
  OperationState?: string;
  OperationType?: string;
}
export type __listOfClusterOperationV2Summary = ClusterOperationV2Summary[];
export interface ListClusterOperationsV2Response {
  ClusterOperationInfoList?: ClusterOperationV2Summary[];
  NextToken?: string;
}
export interface ListClustersRequest {
  ClusterNameFilter?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfClusterInfo = ClusterInfo[];
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
      AuthorizerLogs: AuthorizerLogs & {
        CloudWatchLogs: CloudWatchLogs & { Enabled: boolean };
        Firehose: Firehose & { Enabled: boolean };
        S3: S3 & { Enabled: boolean };
      };
    };
  })[];
  NextToken?: string;
}
export interface ListClustersV2Request {
  ClusterNameFilter?: string;
  ClusterTypeFilter?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfCluster = Cluster[];
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
        AuthorizerLogs: AuthorizerLogs & {
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
export interface ListConfigurationRevisionsRequest {
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfConfigurationRevision = ConfigurationRevision[];
export interface ListConfigurationRevisionsResponse {
  NextToken?: string;
  Revisions?: (ConfigurationRevision & {
    CreationTime: __timestampIso8601;
    Revision: number;
  })[];
}
export interface ListConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Configuration {
  Arn?: string;
  CreationTime?: Date;
  Description?: string;
  KafkaVersions?: string[];
  LatestRevision?: ConfigurationRevision;
  Name?: string;
  State?: ConfigurationState;
}
export type __listOfConfiguration = Configuration[];
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
export interface ListKafkaVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type KafkaVersionStatus = "ACTIVE" | "DEPRECATED" | (string & {});
export interface KafkaVersion {
  Version?: string;
  Status?: KafkaVersionStatus;
}
export type __listOfKafkaVersion = KafkaVersion[];
export interface ListKafkaVersionsResponse {
  KafkaVersions?: KafkaVersion[];
  NextToken?: string;
}
export interface ListNodesRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface BrokerNodeInfo {
  AttachedENIId?: string;
  BrokerId?: number;
  ClientSubnet?: string;
  ClientVpcIpAddress?: string;
  CurrentBrokerSoftwareInfo?: BrokerSoftwareInfo;
  Endpoints?: string[];
}
export interface ControllerNodeInfo {
  Endpoints?: string[];
}
export type NodeType = "BROKER" | (string & {});
export interface ZookeeperNodeInfo {
  AttachedENIId?: string;
  ClientVpcIpAddress?: string;
  Endpoints?: string[];
  ZookeeperId?: number;
  ZookeeperVersion?: string;
}
export interface NodeInfo {
  AddedToClusterTime?: string;
  BrokerNodeInfo?: BrokerNodeInfo;
  ControllerNodeInfo?: ControllerNodeInfo;
  InstanceType?: string;
  NodeARN?: string;
  NodeType?: NodeType;
  ZookeeperNodeInfo?: ZookeeperNodeInfo;
}
export type __listOfNodeInfo = NodeInfo[];
export interface ListNodesResponse {
  NextToken?: string;
  NodeInfoList?: NodeInfo[];
}
export interface ListReplicatorsRequest {
  MaxResults?: number;
  NextToken?: string;
  ReplicatorNameFilter?: string;
}
export interface KafkaClusterSummary {
  AmazonMskCluster?: AmazonMskCluster;
  ApacheKafkaCluster?: ApacheKafkaCluster;
  KafkaClusterAlias?: string;
}
export type __listOfKafkaClusterSummary = KafkaClusterSummary[];
export interface ReplicationInfoSummary {
  SourceKafkaClusterAlias?: string;
  TargetKafkaClusterAlias?: string;
}
export type __listOfReplicationInfoSummary = ReplicationInfoSummary[];
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
export type __listOfReplicatorSummary = ReplicatorSummary[];
export interface ListReplicatorsResponse {
  NextToken?: string;
  Replicators?: (ReplicatorSummary & {
    KafkaClustersSummary: (KafkaClusterSummary & {
      AmazonMskCluster: AmazonMskCluster & { MskClusterArn: string };
      ApacheKafkaCluster: ApacheKafkaCluster & {
        ApacheKafkaClusterId: string;
        BootstrapBrokerString: string;
      };
    })[];
  })[];
}
export interface ListScramSecretsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListScramSecretsResponse {
  NextToken?: string;
  SecretArnList?: string[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListTopicsRequest {
  ClusterArn: string;
  MaxResults?: number;
  NextToken?: string;
  TopicNameFilter?: string;
}
export interface TopicInfo {
  TopicArn?: string;
  TopicName?: string;
  ReplicationFactor?: number;
  PartitionCount?: number;
  OutOfSyncReplicaCount?: number;
}
export type __listOfTopicInfo = TopicInfo[];
export interface ListTopicsResponse {
  Topics?: TopicInfo[];
  NextToken?: string;
}
export interface ListVpcConnectionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface VpcConnection {
  VpcConnectionArn?: string;
  TargetClusterArn?: string;
  CreationTime?: Date;
  Authentication?: string;
  VpcId?: string;
  State?: VpcConnectionState;
}
export type __listOfVpcConnection = VpcConnection[];
export interface ListVpcConnectionsResponse {
  VpcConnections?: (VpcConnection & {
    VpcConnectionArn: string;
    TargetClusterArn: string;
  })[];
  NextToken?: string;
}
export interface PutClusterPolicyRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  Policy?: string;
}
export interface PutClusterPolicyResponse {
  CurrentVersion?: string;
}
export interface RebootBrokerRequest {
  BrokerIds?: string[];
  ClusterArn: string;
}
export interface RebootBrokerResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface RejectClientVpcConnectionRequest {
  ClusterArn: string;
  VpcConnectionArn?: string;
}
export interface RejectClientVpcConnectionResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateBrokerCountRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  TargetNumberOfBrokerNodes?: number;
}
export interface UpdateBrokerCountResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface UpdateBrokerStorageRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  TargetBrokerEBSVolumeInfo?: BrokerEBSVolumeInfo[];
}
export interface UpdateBrokerStorageResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface UpdateBrokerTypeRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  TargetInstanceType?: string;
}
export interface UpdateBrokerTypeResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface IcebergDestinationUpdate {
  DataFreshnessInSeconds?: number;
}
export interface S3DestinationUpdate {
  DataFreshnessInSeconds?: number;
}
export interface UpdateChannelRequest {
  ChannelArn: string;
  ClusterArn: string;
  IcebergDestinationUpdate?: IcebergDestinationUpdate;
  S3DestinationUpdate?: S3DestinationUpdate;
}
export interface UpdateChannelResponse {
  ChannelArn: string;
  ClusterOperationArn?: string;
}
export interface UpdateClusterConfigurationRequest {
  ClusterArn: string;
  ConfigurationInfo?: ConfigurationInfo;
  CurrentVersion?: string;
}
export interface UpdateClusterConfigurationResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface UpdateClusterKafkaVersionRequest {
  ClusterArn: string;
  ConfigurationInfo?: ConfigurationInfo;
  CurrentVersion?: string;
  TargetKafkaVersion?: string;
}
export interface UpdateClusterKafkaVersionResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface UpdateConfigurationRequest {
  Arn: string;
  Description?: string;
  ServerProperties?: Uint8Array;
}
export interface UpdateConfigurationResponse {
  Arn?: string;
  LatestRevision?: ConfigurationRevision & {
    CreationTime: __timestampIso8601;
    Revision: number;
  };
}
export interface UpdateConnectivityRequest {
  ClusterArn: string;
  ConnectivityInfo?: ConnectivityInfo;
  CurrentVersion?: string;
  ZookeeperAccess?: ZookeeperAccess;
}
export interface UpdateConnectivityResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface UpdateMonitoringRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  EnhancedMonitoring?: EnhancedMonitoring;
  OpenMonitoring?: OpenMonitoringInfo;
  LoggingInfo?: LoggingInfo;
}
export interface UpdateMonitoringResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface UpdateRebalancingRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  Rebalancing?: Rebalancing;
}
export interface UpdateRebalancingResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface ConsumerGroupReplicationUpdate {
  ConsumerGroupsToExclude?: string[];
  ConsumerGroupsToReplicate?: string[];
  DetectAndCopyNewConsumerGroups?: boolean;
  SynchroniseConsumerGroupOffsets?: boolean;
}
export interface TopicReplicationUpdate {
  CopyAccessControlListsForTopics?: boolean;
  CopyTopicConfigurations?: boolean;
  DetectAndCopyNewTopics?: boolean;
  TopicsToExclude?: string[];
  TopicsToReplicate?: string[];
}
export interface UpdateReplicationInfoRequest {
  ConsumerGroupReplication?: ConsumerGroupReplicationUpdate;
  CurrentVersion?: string;
  ReplicatorArn: string;
  SourceKafkaClusterArn?: string;
  SourceKafkaClusterId?: string;
  TargetKafkaClusterArn?: string;
  TargetKafkaClusterId?: string;
  TopicReplication?: TopicReplicationUpdate;
  LogDelivery?: LogDelivery;
}
export interface UpdateReplicationInfoResponse {
  ReplicatorArn?: string;
  ReplicatorState?: ReplicatorState;
}
export interface UpdateSecurityRequest {
  ClientAuthentication?: ClientAuthentication;
  ClusterArn: string;
  CurrentVersion?: string;
  EncryptionInfo?: EncryptionInfo;
}
export interface UpdateSecurityResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface UpdateStorageRequest {
  ClusterArn: string;
  CurrentVersion?: string;
  ProvisionedThroughput?: ProvisionedThroughput;
  StorageMode?: StorageMode;
  VolumeSizeGB?: number;
}
export interface UpdateStorageResponse {
  ClusterArn?: string;
  ClusterOperationArn?: string;
}
export interface UpdateTopicRequest {
  ClusterArn: string;
  TopicName: string;
  Configs?: string;
  PartitionCount?: number;
}
export interface UpdateTopicResponse {
  TopicArn?: string;
  TopicName?: string;
  Status?: TopicState;
}
export type BatchAssociateScramSecretError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Associates one or more Scram Secrets with an Amazon MSK cluster.
 */
export const batchAssociateScramSecret: API.OperationMethod<
  BatchAssociateScramSecretRequest,
  BatchAssociateScramSecretResponse,
  BatchAssociateScramSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/clusters/{ClusterArn}/scram-secrets",
    input: { ClusterArn: 0, SecretArnList: D.m({ wire: "secretArnList" }) },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      UnprocessedScramSecrets: D.m({
        wire: "unprocessedScramSecrets",
        shape: D.list(o_UnprocessedScramSecret),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateScramSecret",
})) as any;

export type BatchDisassociateScramSecretError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Disassociates one or more Scram Secrets from an Amazon MSK cluster.
 */
export const batchDisassociateScramSecret: API.OperationMethod<
  BatchDisassociateScramSecretRequest,
  BatchDisassociateScramSecretResponse,
  BatchDisassociateScramSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v1/clusters/{ClusterArn}/scram-secrets",
    input: { ClusterArn: 0, SecretArnList: D.m({ wire: "secretArnList" }) },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      UnprocessedScramSecrets: D.m({
        wire: "unprocessedScramSecrets",
        shape: D.list(o_UnprocessedScramSecret),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateScramSecret",
})) as any;

export type CreateChannelError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a Channel that streams records from an Amazon MSK Express cluster topic to Amazon S3 or Apache Iceberg.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/clusters/{ClusterArn}/channels",
    input: {
      ChannelName: D.m({ wire: "channelName" }),
      ClusterArn: 0,
      EncryptionConfiguration: D.m({
        wire: "encryptionConfiguration",
        shape: { KmsKeyArn: D.m({ wire: "kmsKeyArn" }) },
      }),
      IcebergDestinationConfiguration: D.m({
        wire: "icebergDestinationConfiguration",
        shape: {
          AppendOnly: D.m({ wire: "appendOnly" }),
          Catalog: D.m({
            wire: "catalog",
            shape: {
              CatalogArn: D.m({ wire: "catalogArn" }),
              WarehouseLocation: D.m({ wire: "warehouseLocation" }),
            },
          }),
          DataFreshnessInSeconds: D.m({ wire: "dataFreshnessInSeconds" }),
          DeadLetterQueueS3: D.m({
            wire: "deadLetterQueueS3",
            shape: i_DeadLetterQueueS3,
          }),
          DestinationTableList: D.m({
            wire: "destinationTableList",
            shape: D.list({
              DestinationDatabaseName: D.m({ wire: "destinationDatabaseName" }),
              DestinationTableName: D.m({ wire: "destinationTableName" }),
              PartitionSpec: D.m({
                wire: "partitionSpec",
                shape: {
                  PartitionStrategy: D.m({ wire: "partitionStrategy" }),
                  SourceList: D.m({
                    wire: "sourceList",
                    shape: D.list({ SourceName: D.m({ wire: "sourceName" }) }),
                  }),
                },
              }),
            }),
          }),
          SchemaEvolution: D.m({
            wire: "schemaEvolution",
            shape: {
              EnableSchemaEvolution: D.m({ wire: "enableSchemaEvolution" }),
            },
          }),
          ServiceExecutionRoleArn: D.m({ wire: "serviceExecutionRoleArn" }),
          TableCreation: D.m({
            wire: "tableCreation",
            shape: {
              EnableTableCreation: D.m({ wire: "enableTableCreation" }),
            },
          }),
          CompressionType: D.m({ wire: "compressionType" }),
        },
      }),
      S3DestinationConfiguration: D.m({
        wire: "s3DestinationConfiguration",
        shape: {
          DataFreshnessInSeconds: D.m({ wire: "dataFreshnessInSeconds" }),
          DeadLetterQueueS3: D.m({
            wire: "deadLetterQueueS3",
            shape: i_DeadLetterQueueS3,
          }),
          ServiceExecutionRoleArn: D.m({ wire: "serviceExecutionRoleArn" }),
          Storage: D.m({
            wire: "storage",
            shape: {
              BucketArn: D.m({ wire: "bucketArn" }),
              CompressionType: D.m({ wire: "compressionType" }),
              OutputPrefix: D.m({ wire: "outputPrefix" }),
              OutputKeyTemplate: D.m({ wire: "outputKeyTemplate" }),
              StorageClass: D.m({ wire: "storageClass" }),
              ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
            },
          }),
        },
      }),
      Tags: D.m({ wire: "tags" }),
      TopicConfigurationList: D.m({
        wire: "topicConfigurationList",
        shape: D.list({
          RecordConverter: D.m({
            wire: "recordConverter",
            shape: { ValueConverter: D.m({ wire: "valueConverter" }) },
          }),
          RecordSchema: D.m({
            wire: "recordSchema",
            shape: { GsrArn: D.m({ wire: "gsrArn" }) },
          }),
          TopicArn: D.m({ wire: "topicArn" }),
        }),
      }),
      LoggingInfo: D.m({
        wire: "loggingInfo",
        shape: {
          CloudWatchLogs: D.m({
            wire: "cloudWatchLogs",
            shape: i_CloudWatchLogs,
          }),
          Firehose: D.m({ wire: "firehose", shape: i_Firehose }),
          S3: D.m({ wire: "s3", shape: i_S3 }),
        },
      }),
    },
    output: {
      ChannelArn: D.m({ wire: "channelArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
})) as any;

export type CreateClusterError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new MSK cluster.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/clusters",
    input: {
      BrokerNodeGroupInfo: D.m({
        wire: "brokerNodeGroupInfo",
        shape: i_BrokerNodeGroupInfo,
      }),
      Rebalancing: D.m({ wire: "rebalancing", shape: i_Rebalancing }),
      ClientAuthentication: D.m({
        wire: "clientAuthentication",
        shape: i_ClientAuthentication,
      }),
      ClusterName: D.m({ wire: "clusterName" }),
      ConfigurationInfo: D.m({
        wire: "configurationInfo",
        shape: i_ConfigurationInfo,
      }),
      EncryptionInfo: D.m({ wire: "encryptionInfo", shape: i_EncryptionInfo }),
      EnhancedMonitoring: D.m({ wire: "enhancedMonitoring" }),
      OpenMonitoring: D.m({
        wire: "openMonitoring",
        shape: i_OpenMonitoringInfo,
      }),
      KafkaVersion: D.m({ wire: "kafkaVersion" }),
      LoggingInfo: D.m({ wire: "loggingInfo", shape: i_LoggingInfo }),
      NumberOfBrokerNodes: D.m({ wire: "numberOfBrokerNodes" }),
      Tags: D.m({ wire: "tags" }),
      StorageMode: D.m({ wire: "storageMode" }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterName: D.m({ wire: "clusterName" }),
      State: D.m({ wire: "state" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
})) as any;

export type CreateClusterV2Error =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new MSK cluster.
 */
export const createClusterV2: API.OperationMethod<
  CreateClusterV2Request,
  CreateClusterV2Response,
  CreateClusterV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v2/clusters",
    input: {
      ClusterName: D.m({ wire: "clusterName" }),
      Tags: D.m({ wire: "tags" }),
      Provisioned: D.m({
        wire: "provisioned",
        shape: {
          BrokerNodeGroupInfo: D.m({
            wire: "brokerNodeGroupInfo",
            shape: i_BrokerNodeGroupInfo,
          }),
          Rebalancing: D.m({ wire: "rebalancing", shape: i_Rebalancing }),
          ClientAuthentication: D.m({
            wire: "clientAuthentication",
            shape: i_ClientAuthentication,
          }),
          ConfigurationInfo: D.m({
            wire: "configurationInfo",
            shape: i_ConfigurationInfo,
          }),
          EncryptionInfo: D.m({
            wire: "encryptionInfo",
            shape: i_EncryptionInfo,
          }),
          EnhancedMonitoring: D.m({ wire: "enhancedMonitoring" }),
          OpenMonitoring: D.m({
            wire: "openMonitoring",
            shape: i_OpenMonitoringInfo,
          }),
          KafkaVersion: D.m({ wire: "kafkaVersion" }),
          LoggingInfo: D.m({ wire: "loggingInfo", shape: i_LoggingInfo }),
          NumberOfBrokerNodes: D.m({ wire: "numberOfBrokerNodes" }),
          StorageMode: D.m({ wire: "storageMode" }),
        },
      }),
      Serverless: D.m({
        wire: "serverless",
        shape: {
          VpcConfigs: D.m({
            wire: "vpcConfigs",
            shape: D.list({
              SubnetIds: D.m({ wire: "subnetIds" }),
              SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
            }),
          }),
          ClientAuthentication: D.m({
            wire: "clientAuthentication",
            shape: {
              Sasl: D.m({
                wire: "sasl",
                shape: { Iam: D.m({ wire: "iam", shape: i_Iam }) },
              }),
            },
          }),
        },
      }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterName: D.m({ wire: "clusterName" }),
      State: D.m({ wire: "state" }),
      ClusterType: D.m({ wire: "clusterType" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterV2",
})) as any;

export type CreateConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new MSK configuration.
 */
export const createConfiguration: API.OperationMethod<
  CreateConfigurationRequest,
  CreateConfigurationResponse,
  CreateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/configurations",
    input: {
      Description: D.m({ wire: "description" }),
      KafkaVersions: D.m({ wire: "kafkaVersions" }),
      Name: D.m({ wire: "name" }),
      ServerProperties: D.m({ wire: "serverProperties" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
      LatestRevision: D.m({
        wire: "latestRevision",
        shape: o_ConfigurationRevision,
      }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguration",
})) as any;

export type CreateReplicatorError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates the replicator.
 */
export const createReplicator: API.OperationMethod<
  CreateReplicatorRequest,
  CreateReplicatorResponse,
  CreateReplicatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /replication/v1/replicators",
    input: {
      Description: D.m({ wire: "description" }),
      KafkaClusters: D.m({
        wire: "kafkaClusters",
        shape: D.list({
          AmazonMskCluster: D.m({
            wire: "amazonMskCluster",
            shape: { MskClusterArn: D.m({ wire: "mskClusterArn" }) },
          }),
          ApacheKafkaCluster: D.m({
            wire: "apacheKafkaCluster",
            shape: {
              ApacheKafkaClusterId: D.m({ wire: "apacheKafkaClusterId" }),
              BootstrapBrokerString: D.m({ wire: "bootstrapBrokerString" }),
            },
          }),
          VpcConfig: D.m({
            wire: "vpcConfig",
            shape: {
              SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
              SubnetIds: D.m({ wire: "subnetIds" }),
            },
          }),
          ClientAuthentication: D.m({
            wire: "clientAuthentication",
            shape: {
              SaslScram: D.m({
                wire: "saslScram",
                shape: {
                  Mechanism: D.m({ wire: "mechanism" }),
                  SecretArn: D.m({ wire: "secretArn" }),
                },
              }),
              MTLS: D.m({
                wire: "mTLS",
                shape: { SecretArn: D.m({ wire: "secretArn" }) },
              }),
              SaslOAuthBearer: D.m({
                wire: "saslOAuthBearer",
                shape: {
                  TokenEndpointUrl: D.m({ wire: "tokenEndpointUrl" }),
                  ClientCredentials: D.m({
                    wire: "clientCredentials",
                    shape: {
                      TokenRequestSecretArn: D.m({
                        wire: "tokenRequestSecretArn",
                      }),
                    },
                  }),
                  IamJwtBearer: D.m({
                    wire: "iamJwtBearer",
                    shape: {
                      Audience: D.m({ wire: "audience" }),
                      SigningAlgorithm: D.m({ wire: "signingAlgorithm" }),
                      TokenRequestSecretArn: D.m({
                        wire: "tokenRequestSecretArn",
                      }),
                    },
                  }),
                  ClientCredentialsAssertion: D.m({
                    wire: "clientCredentialsAssertion",
                    shape: {
                      Audience: D.m({ wire: "audience" }),
                      SigningAlgorithm: D.m({ wire: "signingAlgorithm" }),
                      TokenRequestSecretArn: D.m({
                        wire: "tokenRequestSecretArn",
                      }),
                    },
                  }),
                  TokenEndpointAuthenticationMethod: D.m({
                    wire: "tokenEndpointAuthenticationMethod",
                  }),
                  Scope: D.m({ wire: "scope" }),
                  TokenEndpointTlsCertificateArn: D.m({
                    wire: "tokenEndpointTlsCertificateArn",
                  }),
                },
              }),
            },
          }),
          EncryptionInTransit: D.m({
            wire: "encryptionInTransit",
            shape: {
              EncryptionType: D.m({ wire: "encryptionType" }),
              RootCaCertificate: D.m({ wire: "rootCaCertificate" }),
            },
          }),
        }),
      }),
      ReplicationInfoList: D.m({
        wire: "replicationInfoList",
        shape: D.list({
          ConsumerGroupReplication: D.m({
            wire: "consumerGroupReplication",
            shape: {
              ConsumerGroupsToExclude: D.m({ wire: "consumerGroupsToExclude" }),
              ConsumerGroupsToReplicate: D.m({
                wire: "consumerGroupsToReplicate",
              }),
              DetectAndCopyNewConsumerGroups: D.m({
                wire: "detectAndCopyNewConsumerGroups",
              }),
              SynchroniseConsumerGroupOffsets: D.m({
                wire: "synchroniseConsumerGroupOffsets",
              }),
              ConsumerGroupOffsetSyncMode: D.m({
                wire: "consumerGroupOffsetSyncMode",
              }),
            },
          }),
          SourceKafkaClusterArn: D.m({ wire: "sourceKafkaClusterArn" }),
          SourceKafkaClusterId: D.m({ wire: "sourceKafkaClusterId" }),
          TargetCompressionType: D.m({ wire: "targetCompressionType" }),
          TargetKafkaClusterArn: D.m({ wire: "targetKafkaClusterArn" }),
          TargetKafkaClusterId: D.m({ wire: "targetKafkaClusterId" }),
          TopicReplication: D.m({
            wire: "topicReplication",
            shape: {
              CopyAccessControlListsForTopics: D.m({
                wire: "copyAccessControlListsForTopics",
              }),
              CopyTopicConfigurations: D.m({ wire: "copyTopicConfigurations" }),
              DetectAndCopyNewTopics: D.m({ wire: "detectAndCopyNewTopics" }),
              StartingPosition: D.m({
                wire: "startingPosition",
                shape: { Type: D.m({ wire: "type" }) },
              }),
              TopicNameConfiguration: D.m({
                wire: "topicNameConfiguration",
                shape: { Type: D.m({ wire: "type" }) },
              }),
              TopicsToExclude: D.m({ wire: "topicsToExclude" }),
              TopicsToReplicate: D.m({ wire: "topicsToReplicate" }),
            },
          }),
        }),
      }),
      ReplicatorName: D.m({ wire: "replicatorName" }),
      ServiceExecutionRoleArn: D.m({ wire: "serviceExecutionRoleArn" }),
      Tags: D.m({ wire: "tags" }),
      LogDelivery: D.m({ wire: "logDelivery", shape: i_LogDelivery }),
    },
    output: {
      ReplicatorArn: D.m({ wire: "replicatorArn" }),
      ReplicatorName: D.m({ wire: "replicatorName" }),
      ReplicatorState: D.m({ wire: "replicatorState" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicator",
})) as any;

export type CreateTopicError =
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
  | CommonErrors;
/**
 * Creates a topic in the specified MSK cluster.
 */
export const createTopic: API.OperationMethod<
  CreateTopicRequest,
  CreateTopicResponse,
  CreateTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/clusters/{ClusterArn}/topics",
    input: {
      ClusterArn: 0,
      TopicName: D.m({ wire: "topicName" }),
      PartitionCount: D.m({ wire: "partitionCount" }),
      ReplicationFactor: D.m({ wire: "replicationFactor" }),
      Configs: D.m({ wire: "configs" }),
    },
    output: {
      TopicArn: D.m({ wire: "topicArn" }),
      TopicName: D.m({ wire: "topicName" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopic",
})) as any;

export type CreateVpcConnectionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new MSK VPC connection.
 */
export const createVpcConnection: API.OperationMethod<
  CreateVpcConnectionRequest,
  CreateVpcConnectionResponse,
  CreateVpcConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/vpc-connection",
    input: {
      TargetClusterArn: D.m({ wire: "targetClusterArn" }),
      Authentication: D.m({ wire: "authentication" }),
      VpcId: D.m({ wire: "vpcId" }),
      ClientSubnets: D.m({ wire: "clientSubnets" }),
      SecurityGroups: D.m({ wire: "securityGroups" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      VpcConnectionArn: D.m({ wire: "vpcConnectionArn" }),
      State: D.m({ wire: "state" }),
      Authentication: D.m({ wire: "authentication" }),
      VpcId: D.m({ wire: "vpcId" }),
      ClientSubnets: D.m({ wire: "clientSubnets" }),
      SecurityGroups: D.m({ wire: "securityGroups" }),
      CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcConnection",
})) as any;

export type DeleteChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the channel specified by channelArn from the cluster specified by clusterArn. The channel transitions through DELETING and is removed when the asynchronous delete completes.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/clusters/{ClusterArn}/channels/{ChannelArn}",
    input: { ChannelArn: 0, ClusterArn: 0 },
    output: {
      ChannelArn: D.m({ wire: "channelArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
})) as any;

export type DeleteClusterError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes the MSK cluster specified by the Amazon Resource Name (ARN) in the request.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/clusters/{ClusterArn}",
    input: { ClusterArn: 0, CurrentVersion: D.m({ query: "currentVersion" }) },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
})) as any;

export type DeleteClusterPolicyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes the MSK cluster policy specified by the Amazon Resource Name (ARN) in the request.
 */
export const deleteClusterPolicy: API.OperationMethod<
  DeleteClusterPolicyRequest,
  DeleteClusterPolicyResponse,
  DeleteClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/clusters/{ClusterArn}/policy",
    input: { ClusterArn: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterPolicy",
})) as any;

export type DeleteConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes an MSK Configuration.
 */
export const deleteConfiguration: API.OperationMethod<
  DeleteConfigurationRequest,
  DeleteConfigurationResponse,
  DeleteConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/configurations/{Arn}",
    input: { Arn: 0 },
    output: { Arn: D.m({ wire: "arn" }), State: D.m({ wire: "state" }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguration",
})) as any;

export type DeleteReplicatorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a replicator.
 */
export const deleteReplicator: API.OperationMethod<
  DeleteReplicatorRequest,
  DeleteReplicatorResponse,
  DeleteReplicatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /replication/v1/replicators/{ReplicatorArn}",
    input: {
      CurrentVersion: D.m({ query: "currentVersion" }),
      ReplicatorArn: 0,
    },
    output: {
      ReplicatorArn: D.m({ wire: "replicatorArn" }),
      ReplicatorState: D.m({ wire: "replicatorState" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicator",
})) as any;

export type DeleteTopicError =
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
  | CommonErrors;
/**
 * Deletes a topic in the specified MSK cluster.
 */
export const deleteTopic: API.OperationMethod<
  DeleteTopicRequest,
  DeleteTopicResponse,
  DeleteTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/clusters/{ClusterArn}/topics/{TopicName}",
    input: { ClusterArn: 0, TopicName: 0 },
    output: {
      TopicArn: D.m({ wire: "topicArn" }),
      TopicName: D.m({ wire: "topicName" }),
      Status: D.m({ wire: "status" }),
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopic",
})) as any;

export type DeleteVpcConnectionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a MSK VPC connection.
 */
export const deleteVpcConnection: API.OperationMethod<
  DeleteVpcConnectionRequest,
  DeleteVpcConnectionResponse,
  DeleteVpcConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/vpc-connection/{Arn}",
    input: { Arn: 0 },
    output: {
      VpcConnectionArn: D.m({ wire: "vpcConnectionArn" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcConnection",
})) as any;

export type DescribeChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the current configuration and state of a channel.
 */
export const describeChannel: API.OperationMethod<
  DescribeChannelRequest,
  DescribeChannelResponse,
  DescribeChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/channels/{ChannelArn}",
    input: { ChannelArn: 0, ClusterArn: 0 },
    output: {
      ChannelArn: D.m({ wire: "channelArn" }),
      ChannelName: D.m({ wire: "channelName" }),
      EncryptionConfiguration: D.m({
        wire: "encryptionConfiguration",
        shape: { KmsKeyArn: D.m({ wire: "kmsKeyArn" }) },
      }),
      IcebergDestinationConfiguration: D.m({
        wire: "icebergDestinationConfiguration",
        shape: {
          AppendOnly: D.m({ wire: "appendOnly" }),
          Catalog: D.m({
            wire: "catalog",
            shape: {
              CatalogArn: D.m({ wire: "catalogArn" }),
              WarehouseLocation: D.m({ wire: "warehouseLocation" }),
            },
          }),
          DataFreshnessInSeconds: D.m({ wire: "dataFreshnessInSeconds" }),
          DeadLetterQueueS3: D.m({
            wire: "deadLetterQueueS3",
            shape: o_DeadLetterQueueS3,
          }),
          DestinationTableList: D.m({
            wire: "destinationTableList",
            shape: D.list({
              DestinationDatabaseName: D.m({ wire: "destinationDatabaseName" }),
              DestinationTableName: D.m({ wire: "destinationTableName" }),
              PartitionSpec: D.m({
                wire: "partitionSpec",
                shape: {
                  PartitionStrategy: D.m({ wire: "partitionStrategy" }),
                  SourceList: D.m({
                    wire: "sourceList",
                    shape: D.list({ SourceName: D.m({ wire: "sourceName" }) }),
                  }),
                },
              }),
            }),
          }),
          SchemaEvolution: D.m({
            wire: "schemaEvolution",
            shape: {
              EnableSchemaEvolution: D.m({ wire: "enableSchemaEvolution" }),
            },
          }),
          ServiceExecutionRoleArn: D.m({ wire: "serviceExecutionRoleArn" }),
          TableCreation: D.m({
            wire: "tableCreation",
            shape: {
              EnableTableCreation: D.m({ wire: "enableTableCreation" }),
            },
          }),
          CompressionType: D.m({ wire: "compressionType" }),
        },
      }),
      S3DestinationConfiguration: D.m({
        wire: "s3DestinationConfiguration",
        shape: {
          DataFreshnessInSeconds: D.m({ wire: "dataFreshnessInSeconds" }),
          DeadLetterQueueS3: D.m({
            wire: "deadLetterQueueS3",
            shape: o_DeadLetterQueueS3,
          }),
          ServiceExecutionRoleArn: D.m({ wire: "serviceExecutionRoleArn" }),
          Storage: D.m({
            wire: "storage",
            shape: {
              BucketArn: D.m({ wire: "bucketArn" }),
              CompressionType: D.m({ wire: "compressionType" }),
              OutputPrefix: D.m({ wire: "outputPrefix" }),
              OutputKeyTemplate: D.m({ wire: "outputKeyTemplate" }),
              StorageClass: D.m({ wire: "storageClass" }),
              ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
            },
          }),
        },
      }),
      Status: D.m({ wire: "status" }),
      DestinationType: D.m({ wire: "destinationType" }),
      CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
      TopicConfigurationList: D.m({
        wire: "topicConfigurationList",
        shape: D.list({
          RecordConverter: D.m({
            wire: "recordConverter",
            shape: { ValueConverter: D.m({ wire: "valueConverter" }) },
          }),
          RecordSchema: D.m({
            wire: "recordSchema",
            shape: { GsrArn: D.m({ wire: "gsrArn" }) },
          }),
          TopicArn: D.m({ wire: "topicArn" }),
        }),
      }),
      LoggingInfo: D.m({
        wire: "loggingInfo",
        shape: {
          CloudWatchLogs: D.m({
            wire: "cloudWatchLogs",
            shape: o_CloudWatchLogs,
          }),
          Firehose: D.m({ wire: "firehose", shape: o_Firehose }),
          S3: D.m({ wire: "s3", shape: o_S3 }),
        },
      }),
      StateInfo: D.m({
        wire: "stateInfo",
        shape: {
          Code: D.m({ wire: "code" }),
          Message: D.m({ wire: "message" }),
        },
      }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannel",
})) as any;

export type DescribeClusterError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a description of the MSK cluster whose Amazon Resource Name (ARN) is specified in the request.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResponse,
  DescribeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}",
    input: { ClusterArn: 0 },
    output: { ClusterInfo: D.m({ wire: "clusterInfo", shape: o_ClusterInfo }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
})) as any;

export type DescribeClusterOperationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a description of the cluster operation specified by the ARN.
 */
export const describeClusterOperation: API.OperationMethod<
  DescribeClusterOperationRequest,
  DescribeClusterOperationResponse,
  DescribeClusterOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/operations/{ClusterOperationArn}",
    input: { ClusterOperationArn: 0 },
    output: {
      ClusterOperationInfo: D.m({
        wire: "clusterOperationInfo",
        shape: o_ClusterOperationInfo,
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterOperation",
})) as any;

export type DescribeClusterOperationV2Error =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a description of the cluster operation specified by the ARN.
 */
export const describeClusterOperationV2: API.OperationMethod<
  DescribeClusterOperationV2Request,
  DescribeClusterOperationV2Response,
  DescribeClusterOperationV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v2/operations/{ClusterOperationArn}",
    input: { ClusterOperationArn: 0 },
    output: {
      ClusterOperationInfo: D.m({
        wire: "clusterOperationInfo",
        shape: {
          ClusterArn: D.m({ wire: "clusterArn" }),
          ClusterType: D.m({ wire: "clusterType" }),
          StartTime: D.m({ wire: "startTime", shape: D.ts }),
          EndTime: D.m({ wire: "endTime", shape: D.ts }),
          ErrorInfo: D.m({ wire: "errorInfo", shape: o_ErrorInfo }),
          OperationArn: D.m({ wire: "operationArn" }),
          OperationState: D.m({ wire: "operationState" }),
          OperationType: D.m({ wire: "operationType" }),
          Provisioned: D.m({
            wire: "provisioned",
            shape: {
              OperationSteps: D.m({
                wire: "operationSteps",
                shape: D.list(o_ClusterOperationStep),
              }),
              SourceClusterInfo: D.m({
                wire: "sourceClusterInfo",
                shape: o_MutableClusterInfo,
              }),
              TargetClusterInfo: D.m({
                wire: "targetClusterInfo",
                shape: o_MutableClusterInfo,
              }),
              VpcConnectionInfo: D.m({
                wire: "vpcConnectionInfo",
                shape: o_VpcConnectionInfo,
              }),
            },
          }),
          Serverless: D.m({
            wire: "serverless",
            shape: {
              SourceClusterInfo: D.m({
                wire: "sourceClusterInfo",
                shape: o_ServerlessConnectivityInfo,
              }),
              TargetClusterInfo: D.m({
                wire: "targetClusterInfo",
                shape: o_ServerlessConnectivityInfo,
              }),
              VpcConnectionInfo: D.m({
                wire: "vpcConnectionInfo",
                shape: {
                  CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
                  Owner: D.m({ wire: "owner" }),
                  UserIdentity: D.m({
                    wire: "userIdentity",
                    shape: o_UserIdentity,
                  }),
                  VpcConnectionArn: D.m({ wire: "vpcConnectionArn" }),
                },
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterOperationV2",
})) as any;

export type DescribeClusterV2Error =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a description of the MSK cluster whose Amazon Resource Name (ARN) is specified in the request.
 */
export const describeClusterV2: API.OperationMethod<
  DescribeClusterV2Request,
  DescribeClusterV2Response,
  DescribeClusterV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v2/clusters/{ClusterArn}",
    input: { ClusterArn: 0 },
    output: { ClusterInfo: D.m({ wire: "clusterInfo", shape: o_Cluster }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterV2",
})) as any;

export type DescribeConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a description of this MSK configuration.
 */
export const describeConfiguration: API.OperationMethod<
  DescribeConfigurationRequest,
  DescribeConfigurationResponse,
  DescribeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/configurations/{Arn}",
    input: { Arn: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      KafkaVersions: D.m({ wire: "kafkaVersions" }),
      LatestRevision: D.m({
        wire: "latestRevision",
        shape: o_ConfigurationRevision,
      }),
      Name: D.m({ wire: "name" }),
      State: D.m({ wire: "state" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfiguration",
})) as any;

export type DescribeConfigurationRevisionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a description of this revision of the configuration.
 */
export const describeConfigurationRevision: API.OperationMethod<
  DescribeConfigurationRevisionRequest,
  DescribeConfigurationRevisionResponse,
  DescribeConfigurationRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/configurations/{Arn}/revisions/{Revision}",
    input: { Arn: 0, Revision: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      Revision: D.m({ wire: "revision" }),
      ServerProperties: D.m({ wire: "serverProperties", shape: D.blob }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationRevision",
})) as any;

export type DescribeReplicatorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a replicator.
 */
export const describeReplicator: API.OperationMethod<
  DescribeReplicatorRequest,
  DescribeReplicatorResponse,
  DescribeReplicatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /replication/v1/replicators/{ReplicatorArn}",
    input: { ReplicatorArn: 0 },
    output: {
      CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
      CurrentVersion: D.m({ wire: "currentVersion" }),
      IsReplicatorReference: D.m({ wire: "isReplicatorReference" }),
      KafkaClusters: D.m({
        wire: "kafkaClusters",
        shape: D.list({
          AmazonMskCluster: D.m({
            wire: "amazonMskCluster",
            shape: o_AmazonMskCluster,
          }),
          ApacheKafkaCluster: D.m({
            wire: "apacheKafkaCluster",
            shape: o_ApacheKafkaCluster,
          }),
          KafkaClusterAlias: D.m({ wire: "kafkaClusterAlias" }),
          VpcConfig: D.m({
            wire: "vpcConfig",
            shape: {
              SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
              SubnetIds: D.m({ wire: "subnetIds" }),
            },
          }),
          ClientAuthentication: D.m({
            wire: "clientAuthentication",
            shape: {
              SaslScram: D.m({
                wire: "saslScram",
                shape: {
                  Mechanism: D.m({ wire: "mechanism" }),
                  SecretArn: D.m({ wire: "secretArn" }),
                },
              }),
              MTLS: D.m({
                wire: "mTLS",
                shape: { SecretArn: D.m({ wire: "secretArn" }) },
              }),
              SaslOAuthBearer: D.m({
                wire: "saslOAuthBearer",
                shape: {
                  TokenEndpointUrl: D.m({ wire: "tokenEndpointUrl" }),
                  ClientCredentials: D.m({
                    wire: "clientCredentials",
                    shape: {
                      TokenRequestSecretArn: D.m({
                        wire: "tokenRequestSecretArn",
                      }),
                    },
                  }),
                  IamJwtBearer: D.m({
                    wire: "iamJwtBearer",
                    shape: {
                      Audience: D.m({ wire: "audience" }),
                      SigningAlgorithm: D.m({ wire: "signingAlgorithm" }),
                      TokenRequestSecretArn: D.m({
                        wire: "tokenRequestSecretArn",
                      }),
                    },
                  }),
                  ClientCredentialsAssertion: D.m({
                    wire: "clientCredentialsAssertion",
                    shape: {
                      Audience: D.m({ wire: "audience" }),
                      SigningAlgorithm: D.m({ wire: "signingAlgorithm" }),
                      TokenRequestSecretArn: D.m({
                        wire: "tokenRequestSecretArn",
                      }),
                    },
                  }),
                  TokenEndpointAuthenticationMethod: D.m({
                    wire: "tokenEndpointAuthenticationMethod",
                  }),
                  Scope: D.m({ wire: "scope" }),
                  TokenEndpointTlsCertificateArn: D.m({
                    wire: "tokenEndpointTlsCertificateArn",
                  }),
                },
              }),
            },
          }),
          EncryptionInTransit: D.m({
            wire: "encryptionInTransit",
            shape: {
              EncryptionType: D.m({ wire: "encryptionType" }),
              RootCaCertificate: D.m({ wire: "rootCaCertificate" }),
            },
          }),
        }),
      }),
      ReplicationInfoList: D.m({
        wire: "replicationInfoList",
        shape: D.list({
          ConsumerGroupReplication: D.m({
            wire: "consumerGroupReplication",
            shape: {
              ConsumerGroupsToExclude: D.m({ wire: "consumerGroupsToExclude" }),
              ConsumerGroupsToReplicate: D.m({
                wire: "consumerGroupsToReplicate",
              }),
              DetectAndCopyNewConsumerGroups: D.m({
                wire: "detectAndCopyNewConsumerGroups",
              }),
              SynchroniseConsumerGroupOffsets: D.m({
                wire: "synchroniseConsumerGroupOffsets",
              }),
              ConsumerGroupOffsetSyncMode: D.m({
                wire: "consumerGroupOffsetSyncMode",
              }),
            },
          }),
          SourceKafkaClusterAlias: D.m({ wire: "sourceKafkaClusterAlias" }),
          TargetCompressionType: D.m({ wire: "targetCompressionType" }),
          TargetKafkaClusterAlias: D.m({ wire: "targetKafkaClusterAlias" }),
          TopicReplication: D.m({
            wire: "topicReplication",
            shape: {
              CopyAccessControlListsForTopics: D.m({
                wire: "copyAccessControlListsForTopics",
              }),
              CopyTopicConfigurations: D.m({ wire: "copyTopicConfigurations" }),
              DetectAndCopyNewTopics: D.m({ wire: "detectAndCopyNewTopics" }),
              StartingPosition: D.m({
                wire: "startingPosition",
                shape: { Type: D.m({ wire: "type" }) },
              }),
              TopicNameConfiguration: D.m({
                wire: "topicNameConfiguration",
                shape: { Type: D.m({ wire: "type" }) },
              }),
              TopicsToExclude: D.m({ wire: "topicsToExclude" }),
              TopicsToReplicate: D.m({ wire: "topicsToReplicate" }),
            },
          }),
        }),
      }),
      ReplicatorArn: D.m({ wire: "replicatorArn" }),
      ReplicatorDescription: D.m({ wire: "replicatorDescription" }),
      ReplicatorName: D.m({ wire: "replicatorName" }),
      ReplicatorResourceArn: D.m({ wire: "replicatorResourceArn" }),
      ReplicatorState: D.m({ wire: "replicatorState" }),
      ServiceExecutionRoleArn: D.m({ wire: "serviceExecutionRoleArn" }),
      StateInfo: D.m({
        wire: "stateInfo",
        shape: {
          Code: D.m({ wire: "code" }),
          Message: D.m({ wire: "message" }),
        },
      }),
      Tags: D.m({ wire: "tags" }),
      LogDelivery: D.m({
        wire: "logDelivery",
        shape: {
          ReplicatorLogDelivery: D.m({
            wire: "replicatorLogDelivery",
            shape: {
              CloudWatchLogs: D.m({
                wire: "cloudWatchLogs",
                shape: {
                  Enabled: D.m({ wire: "enabled" }),
                  LogGroup: D.m({ wire: "logGroup" }),
                },
              }),
              Firehose: D.m({
                wire: "firehose",
                shape: {
                  Enabled: D.m({ wire: "enabled" }),
                  DeliveryStream: D.m({ wire: "deliveryStream" }),
                },
              }),
              S3: D.m({
                wire: "s3",
                shape: {
                  Enabled: D.m({ wire: "enabled" }),
                  Bucket: D.m({ wire: "bucket" }),
                  Prefix: D.m({ wire: "prefix" }),
                },
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicator",
})) as any;

export type DescribeTopicError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns topic details of this topic on a MSK cluster.
 */
export const describeTopic: API.OperationMethod<
  DescribeTopicRequest,
  DescribeTopicResponse,
  DescribeTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/topics/{TopicName}",
    input: { ClusterArn: 0, TopicName: 0 },
    output: {
      TopicArn: D.m({ wire: "topicArn" }),
      TopicName: D.m({ wire: "topicName" }),
      ReplicationFactor: D.m({ wire: "replicationFactor" }),
      PartitionCount: D.m({ wire: "partitionCount" }),
      Configs: D.m({ wire: "configs" }),
      Status: D.m({ wire: "status" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopic",
})) as any;

export type DescribeTopicPartitionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns partition details of this topic on a MSK cluster.
 */
export const describeTopicPartitions: API.PaginatedOperationMethod<
  DescribeTopicPartitionsRequest,
  DescribeTopicPartitionsResponse,
  DescribeTopicPartitionsError,
  Credentials | HttpClient.HttpClient,
  TopicPartitionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/topics/{TopicName}/partitions",
    input: {
      ClusterArn: 0,
      TopicName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Partitions: D.m({
        wire: "partitions",
        shape: D.list({
          Partition: D.m({ wire: "partition" }),
          Leader: D.m({ wire: "leader" }),
          Replicas: D.m({ wire: "replicas" }),
          Isr: D.m({ wire: "isr" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopicPartitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Partitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeVpcConnectionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a description of this MSK VPC connection.
 */
export const describeVpcConnection: API.OperationMethod<
  DescribeVpcConnectionRequest,
  DescribeVpcConnectionResponse,
  DescribeVpcConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/vpc-connection/{Arn}",
    input: { Arn: 0 },
    output: {
      VpcConnectionArn: D.m({ wire: "vpcConnectionArn" }),
      TargetClusterArn: D.m({ wire: "targetClusterArn" }),
      State: D.m({ wire: "state" }),
      Authentication: D.m({ wire: "authentication" }),
      VpcId: D.m({ wire: "vpcId" }),
      Subnets: D.m({ wire: "subnets" }),
      SecurityGroups: D.m({ wire: "securityGroups" }),
      CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcConnection",
})) as any;

export type GetBootstrapBrokersError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | NotFoundException
  | CommonErrors;
/**
 * A list of brokers that a client application can use to bootstrap. This list doesn't necessarily include all of the brokers in the cluster. The following Python 3.6 example shows how you can use the Amazon Resource Name (ARN) of a cluster to get its bootstrap brokers. If you don't know the ARN of your cluster, you can use the `ListClusters` operation to get the ARNs of all the clusters in this account and Region.
 */
export const getBootstrapBrokers: API.OperationMethod<
  GetBootstrapBrokersRequest,
  GetBootstrapBrokersResponse,
  GetBootstrapBrokersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/bootstrap-brokers",
    input: { ClusterArn: 0 },
    output: {
      BootstrapBrokerString: D.m({ wire: "bootstrapBrokerString" }),
      BootstrapBrokerStringTls: D.m({ wire: "bootstrapBrokerStringTls" }),
      BootstrapBrokerStringSaslScram: D.m({
        wire: "bootstrapBrokerStringSaslScram",
      }),
      BootstrapBrokerStringSaslIam: D.m({
        wire: "bootstrapBrokerStringSaslIam",
      }),
      BootstrapBrokerStringPublicTls: D.m({
        wire: "bootstrapBrokerStringPublicTls",
      }),
      BootstrapBrokerStringPublicSaslScram: D.m({
        wire: "bootstrapBrokerStringPublicSaslScram",
      }),
      BootstrapBrokerStringPublicSaslIam: D.m({
        wire: "bootstrapBrokerStringPublicSaslIam",
      }),
      BootstrapBrokerStringVpcConnectivityTls: D.m({
        wire: "bootstrapBrokerStringVpcConnectivityTls",
      }),
      BootstrapBrokerStringVpcConnectivitySaslScram: D.m({
        wire: "bootstrapBrokerStringVpcConnectivitySaslScram",
      }),
      BootstrapBrokerStringVpcConnectivitySaslIam: D.m({
        wire: "bootstrapBrokerStringVpcConnectivitySaslIam",
      }),
      BootstrapBrokerStringIpv6: D.m({ wire: "bootstrapBrokerStringIpv6" }),
      BootstrapBrokerStringTlsIpv6: D.m({
        wire: "bootstrapBrokerStringTlsIpv6",
      }),
      BootstrapBrokerStringSaslScramIpv6: D.m({
        wire: "bootstrapBrokerStringSaslScramIpv6",
      }),
      BootstrapBrokerStringSaslIamIpv6: D.m({
        wire: "bootstrapBrokerStringSaslIamIpv6",
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBootstrapBrokers",
})) as any;

export type GetClusterPolicyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Get the MSK cluster policy specified by the Amazon Resource Name (ARN) in the request.
 */
export const getClusterPolicy: API.OperationMethod<
  GetClusterPolicyRequest,
  GetClusterPolicyResponse,
  GetClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/policy",
    input: { ClusterArn: 0 },
    output: {
      CurrentVersion: D.m({ wire: "currentVersion" }),
      Policy: D.m({ wire: "policy" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterPolicy",
})) as any;

export type GetCompatibleKafkaVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the Apache Kafka versions to which you can update the MSK cluster.
 */
export const getCompatibleKafkaVersions: API.OperationMethod<
  GetCompatibleKafkaVersionsRequest,
  GetCompatibleKafkaVersionsResponse,
  GetCompatibleKafkaVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/compatible-kafka-versions",
    input: { ClusterArn: D.m({ query: "clusterArn" }) },
    output: {
      CompatibleKafkaVersions: D.m({
        wire: "compatibleKafkaVersions",
        shape: D.list({
          SourceVersion: D.m({ wire: "sourceVersion" }),
          TargetVersions: D.m({ wire: "targetVersions" }),
        }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCompatibleKafkaVersions",
})) as any;

export type ListChannelsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the list of channels in a cluster.
 */
export const listChannels: API.OperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/channels",
    input: {
      ClusterArn: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      TopicNameFilter: D.m({ query: "topicNameFilter" }),
    },
    output: {
      Channels: D.m({
        wire: "channels",
        shape: D.list({
          ChannelArn: D.m({ wire: "channelArn" }),
          ChannelName: D.m({ wire: "channelName" }),
          Status: D.m({ wire: "status" }),
          CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
          DestinationType: D.m({ wire: "destinationType" }),
          ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
})) as any;

export type ListClientVpcConnectionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the VPC connections in this Region.
 */
export const listClientVpcConnections: API.PaginatedOperationMethod<
  ListClientVpcConnectionsRequest,
  ListClientVpcConnectionsResponse,
  ListClientVpcConnectionsError,
  Credentials | HttpClient.HttpClient,
  ClientVpcConnection
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/client-vpc-connections",
    input: {
      ClusterArn: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ClientVpcConnections: D.m({
        wire: "clientVpcConnections",
        shape: D.list({
          Authentication: D.m({ wire: "authentication" }),
          CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
          State: D.m({ wire: "state" }),
          VpcConnectionArn: D.m({ wire: "vpcConnectionArn" }),
          Owner: D.m({ wire: "owner" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClientVpcConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClientVpcConnections",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClusterOperationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the operations that have been performed on the specified MSK cluster.
 */
export const listClusterOperations: API.PaginatedOperationMethod<
  ListClusterOperationsRequest,
  ListClusterOperationsResponse,
  ListClusterOperationsError,
  Credentials | HttpClient.HttpClient,
  ClusterOperationInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/operations",
    input: {
      ClusterArn: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ClusterOperationInfoList: D.m({
        wire: "clusterOperationInfoList",
        shape: D.list(o_ClusterOperationInfo),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterOperationInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClusterOperationsV2Error =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the operations that have been performed on the specified MSK cluster.
 */
export const listClusterOperationsV2: API.PaginatedOperationMethod<
  ListClusterOperationsV2Request,
  ListClusterOperationsV2Response,
  ListClusterOperationsV2Error,
  Credentials | HttpClient.HttpClient,
  ClusterOperationV2Summary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v2/clusters/{ClusterArn}/operations",
    input: {
      ClusterArn: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ClusterOperationInfoList: D.m({
        wire: "clusterOperationInfoList",
        shape: D.list({
          ClusterArn: D.m({ wire: "clusterArn" }),
          ClusterType: D.m({ wire: "clusterType" }),
          StartTime: D.m({ wire: "startTime", shape: D.ts }),
          EndTime: D.m({ wire: "endTime", shape: D.ts }),
          OperationArn: D.m({ wire: "operationArn" }),
          OperationState: D.m({ wire: "operationState" }),
          OperationType: D.m({ wire: "operationType" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterOperationsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterOperationInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClustersError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the MSK clusters in the current Region.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters",
    input: {
      ClusterNameFilter: D.m({ query: "clusterNameFilter" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ClusterInfoList: D.m({
        wire: "clusterInfoList",
        shape: D.list(o_ClusterInfo),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClustersV2Error =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the MSK clusters in the current Region.
 */
export const listClustersV2: API.PaginatedOperationMethod<
  ListClustersV2Request,
  ListClustersV2Response,
  ListClustersV2Error,
  Credentials | HttpClient.HttpClient,
  Cluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v2/clusters",
    input: {
      ClusterNameFilter: D.m({ query: "clusterNameFilter" }),
      ClusterTypeFilter: D.m({ query: "clusterTypeFilter" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ClusterInfoList: D.m({
        wire: "clusterInfoList",
        shape: D.list(o_Cluster),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClustersV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationRevisionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the MSK configurations in this Region.
 */
export const listConfigurationRevisions: API.PaginatedOperationMethod<
  ListConfigurationRevisionsRequest,
  ListConfigurationRevisionsResponse,
  ListConfigurationRevisionsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/configurations/{Arn}/revisions",
    input: {
      Arn: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Revisions: D.m({
        wire: "revisions",
        shape: D.list(o_ConfigurationRevision),
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationRevisions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Revisions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the MSK configurations in this Region.
 */
export const listConfigurations: API.PaginatedOperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient,
  Configuration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/configurations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Configurations: D.m({
        wire: "configurations",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
          Description: D.m({ wire: "description" }),
          KafkaVersions: D.m({ wire: "kafkaVersions" }),
          LatestRevision: D.m({
            wire: "latestRevision",
            shape: o_ConfigurationRevision,
          }),
          Name: D.m({ wire: "name" }),
          State: D.m({ wire: "state" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Configurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListKafkaVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of Apache Kafka versions.
 */
export const listKafkaVersions: API.PaginatedOperationMethod<
  ListKafkaVersionsRequest,
  ListKafkaVersionsResponse,
  ListKafkaVersionsError,
  Credentials | HttpClient.HttpClient,
  KafkaVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/kafka-versions",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      KafkaVersions: D.m({
        wire: "kafkaVersions",
        shape: D.list({
          Version: D.m({ wire: "version" }),
          Status: D.m({ wire: "status" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKafkaVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "KafkaVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNodesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns a list of the broker nodes in the cluster.
 */
export const listNodes: API.PaginatedOperationMethod<
  ListNodesRequest,
  ListNodesResponse,
  ListNodesError,
  Credentials | HttpClient.HttpClient,
  NodeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/nodes",
    input: {
      ClusterArn: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      NodeInfoList: D.m({
        wire: "nodeInfoList",
        shape: D.list({
          AddedToClusterTime: D.m({ wire: "addedToClusterTime" }),
          BrokerNodeInfo: D.m({
            wire: "brokerNodeInfo",
            shape: {
              AttachedENIId: D.m({ wire: "attachedENIId" }),
              BrokerId: D.m({ wire: "brokerId" }),
              ClientSubnet: D.m({ wire: "clientSubnet" }),
              ClientVpcIpAddress: D.m({ wire: "clientVpcIpAddress" }),
              CurrentBrokerSoftwareInfo: D.m({
                wire: "currentBrokerSoftwareInfo",
                shape: o_BrokerSoftwareInfo,
              }),
              Endpoints: D.m({ wire: "endpoints" }),
            },
          }),
          ControllerNodeInfo: D.m({
            wire: "controllerNodeInfo",
            shape: { Endpoints: D.m({ wire: "endpoints" }) },
          }),
          InstanceType: D.m({ wire: "instanceType" }),
          NodeARN: D.m({ wire: "nodeARN" }),
          NodeType: D.m({ wire: "nodeType" }),
          ZookeeperNodeInfo: D.m({
            wire: "zookeeperNodeInfo",
            shape: {
              AttachedENIId: D.m({ wire: "attachedENIId" }),
              ClientVpcIpAddress: D.m({ wire: "clientVpcIpAddress" }),
              Endpoints: D.m({ wire: "endpoints" }),
              ZookeeperId: D.m({ wire: "zookeeperId" }),
              ZookeeperVersion: D.m({ wire: "zookeeperVersion" }),
            },
          }),
        }),
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NodeInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReplicatorsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the replicators.
 */
export const listReplicators: API.PaginatedOperationMethod<
  ListReplicatorsRequest,
  ListReplicatorsResponse,
  ListReplicatorsError,
  Credentials | HttpClient.HttpClient,
  ReplicatorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /replication/v1/replicators",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      ReplicatorNameFilter: D.m({ query: "replicatorNameFilter" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Replicators: D.m({
        wire: "replicators",
        shape: D.list({
          CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
          CurrentVersion: D.m({ wire: "currentVersion" }),
          IsReplicatorReference: D.m({ wire: "isReplicatorReference" }),
          KafkaClustersSummary: D.m({
            wire: "kafkaClustersSummary",
            shape: D.list({
              AmazonMskCluster: D.m({
                wire: "amazonMskCluster",
                shape: o_AmazonMskCluster,
              }),
              ApacheKafkaCluster: D.m({
                wire: "apacheKafkaCluster",
                shape: o_ApacheKafkaCluster,
              }),
              KafkaClusterAlias: D.m({ wire: "kafkaClusterAlias" }),
            }),
          }),
          ReplicationInfoSummaryList: D.m({
            wire: "replicationInfoSummaryList",
            shape: D.list({
              SourceKafkaClusterAlias: D.m({ wire: "sourceKafkaClusterAlias" }),
              TargetKafkaClusterAlias: D.m({ wire: "targetKafkaClusterAlias" }),
            }),
          }),
          ReplicatorArn: D.m({ wire: "replicatorArn" }),
          ReplicatorName: D.m({ wire: "replicatorName" }),
          ReplicatorResourceArn: D.m({ wire: "replicatorResourceArn" }),
          ReplicatorState: D.m({ wire: "replicatorState" }),
        }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReplicators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Replicators",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListScramSecretsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of the Scram Secrets associated with an Amazon MSK cluster.
 */
export const listScramSecrets: API.PaginatedOperationMethod<
  ListScramSecretsRequest,
  ListScramSecretsResponse,
  ListScramSecretsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/scram-secrets",
    input: {
      ClusterArn: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      SecretArnList: D.m({ wire: "secretArnList" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScramSecrets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecretArnList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns a list of the tags associated with the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{ResourceArn}",
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

export type ListTopicsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | NotFoundException
  | CommonErrors;
/**
 * List topics in a MSK cluster.
 */
export const listTopics: API.PaginatedOperationMethod<
  ListTopicsRequest,
  ListTopicsResponse,
  ListTopicsError,
  Credentials | HttpClient.HttpClient,
  TopicInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/clusters/{ClusterArn}/topics",
    input: {
      ClusterArn: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      TopicNameFilter: D.m({ query: "topicNameFilter" }),
    },
    output: {
      Topics: D.m({
        wire: "topics",
        shape: D.list({
          TopicArn: D.m({ wire: "topicArn" }),
          TopicName: D.m({ wire: "topicName" }),
          ReplicationFactor: D.m({ wire: "replicationFactor" }),
          PartitionCount: D.m({ wire: "partitionCount" }),
          OutOfSyncReplicaCount: D.m({ wire: "outOfSyncReplicaCount" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Topics",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVpcConnectionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the VPC connections in this Region.
 */
export const listVpcConnections: API.PaginatedOperationMethod<
  ListVpcConnectionsRequest,
  ListVpcConnectionsResponse,
  ListVpcConnectionsError,
  Credentials | HttpClient.HttpClient,
  VpcConnection
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/vpc-connections",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      VpcConnections: D.m({
        wire: "vpcConnections",
        shape: D.list({
          VpcConnectionArn: D.m({ wire: "vpcConnectionArn" }),
          TargetClusterArn: D.m({ wire: "targetClusterArn" }),
          CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
          Authentication: D.m({ wire: "authentication" }),
          VpcId: D.m({ wire: "vpcId" }),
          State: D.m({ wire: "state" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VpcConnections",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutClusterPolicyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates or updates the MSK cluster policy specified by the cluster Amazon Resource Name (ARN) in the request.
 */
export const putClusterPolicy: API.OperationMethod<
  PutClusterPolicyRequest,
  PutClusterPolicyResponse,
  PutClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/policy",
    input: {
      ClusterArn: 0,
      CurrentVersion: D.m({ wire: "currentVersion" }),
      Policy: D.m({ wire: "policy" }),
    },
    output: { CurrentVersion: D.m({ wire: "currentVersion" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutClusterPolicy",
})) as any;

export type RebootBrokerError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Reboots brokers.
 */
export const rebootBroker: API.OperationMethod<
  RebootBrokerRequest,
  RebootBrokerResponse,
  RebootBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/reboot-broker",
    input: { BrokerIds: D.m({ wire: "brokerIds" }), ClusterArn: 0 },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootBroker",
})) as any;

export type RejectClientVpcConnectionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns empty response.
 */
export const rejectClientVpcConnection: API.OperationMethod<
  RejectClientVpcConnectionRequest,
  RejectClientVpcConnectionResponse,
  RejectClientVpcConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/client-vpc-connection",
    input: {
      ClusterArn: 0,
      VpcConnectionArn: D.m({ wire: "vpcConnectionArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectClientVpcConnection",
})) as any;

export type TagResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Adds tags to the specified MSK resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{ResourceArn}",
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

export type UntagResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes the tags associated with the keys that are provided in the query.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{ResourceArn}",
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

export type UpdateBrokerCountError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the number of broker nodes in the cluster.
 */
export const updateBrokerCount: API.OperationMethod<
  UpdateBrokerCountRequest,
  UpdateBrokerCountResponse,
  UpdateBrokerCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/nodes/count",
    input: {
      ClusterArn: 0,
      CurrentVersion: D.m({ wire: "currentVersion" }),
      TargetNumberOfBrokerNodes: D.m({ wire: "targetNumberOfBrokerNodes" }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBrokerCount",
})) as any;

export type UpdateBrokerStorageError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the EBS storage associated with MSK brokers.
 */
export const updateBrokerStorage: API.OperationMethod<
  UpdateBrokerStorageRequest,
  UpdateBrokerStorageResponse,
  UpdateBrokerStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/nodes/storage",
    input: {
      ClusterArn: 0,
      CurrentVersion: D.m({ wire: "currentVersion" }),
      TargetBrokerEBSVolumeInfo: D.m({
        wire: "targetBrokerEBSVolumeInfo",
        shape: D.list({
          KafkaBrokerNodeId: D.m({ wire: "kafkaBrokerNodeId" }),
          ProvisionedThroughput: D.m({
            wire: "provisionedThroughput",
            shape: i_ProvisionedThroughput,
          }),
          VolumeSizeGB: D.m({ wire: "volumeSizeGB" }),
        }),
      }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBrokerStorage",
})) as any;

export type UpdateBrokerTypeError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates EC2 instance type.
 */
export const updateBrokerType: API.OperationMethod<
  UpdateBrokerTypeRequest,
  UpdateBrokerTypeResponse,
  UpdateBrokerTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/nodes/type",
    input: {
      ClusterArn: 0,
      CurrentVersion: D.m({ wire: "currentVersion" }),
      TargetInstanceType: D.m({ wire: "targetInstanceType" }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBrokerType",
})) as any;

export type UpdateChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the destination configuration of an existing channel. Exactly one of icebergDestinationUpdate or s3DestinationUpdate must be supplied.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/channels/{ChannelArn}",
    input: {
      ChannelArn: 0,
      ClusterArn: 0,
      IcebergDestinationUpdate: D.m({
        wire: "icebergDestinationUpdate",
        shape: {
          DataFreshnessInSeconds: D.m({ wire: "dataFreshnessInSeconds" }),
        },
      }),
      S3DestinationUpdate: D.m({
        wire: "s3DestinationUpdate",
        shape: {
          DataFreshnessInSeconds: D.m({ wire: "dataFreshnessInSeconds" }),
        },
      }),
    },
    output: {
      ChannelArn: D.m({ wire: "channelArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
})) as any;

export type UpdateClusterConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the cluster with the configuration that is specified in the request body.
 */
export const updateClusterConfiguration: API.OperationMethod<
  UpdateClusterConfigurationRequest,
  UpdateClusterConfigurationResponse,
  UpdateClusterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/configuration",
    input: {
      ClusterArn: 0,
      ConfigurationInfo: D.m({
        wire: "configurationInfo",
        shape: i_ConfigurationInfo,
      }),
      CurrentVersion: D.m({ wire: "currentVersion" }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterConfiguration",
})) as any;

export type UpdateClusterKafkaVersionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the Apache Kafka version for the cluster.
 */
export const updateClusterKafkaVersion: API.OperationMethod<
  UpdateClusterKafkaVersionRequest,
  UpdateClusterKafkaVersionResponse,
  UpdateClusterKafkaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/version",
    input: {
      ClusterArn: 0,
      ConfigurationInfo: D.m({
        wire: "configurationInfo",
        shape: i_ConfigurationInfo,
      }),
      CurrentVersion: D.m({ wire: "currentVersion" }),
      TargetKafkaVersion: D.m({ wire: "targetKafkaVersion" }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterKafkaVersion",
})) as any;

export type UpdateConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an MSK configuration.
 */
export const updateConfiguration: API.OperationMethod<
  UpdateConfigurationRequest,
  UpdateConfigurationResponse,
  UpdateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/configurations/{Arn}",
    input: {
      Arn: 0,
      Description: D.m({ wire: "description" }),
      ServerProperties: D.m({ wire: "serverProperties" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      LatestRevision: D.m({
        wire: "latestRevision",
        shape: o_ConfigurationRevision,
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfiguration",
})) as any;

export type UpdateConnectivityError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the cluster's connectivity configuration.
 */
export const updateConnectivity: API.OperationMethod<
  UpdateConnectivityRequest,
  UpdateConnectivityResponse,
  UpdateConnectivityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/connectivity",
    input: {
      ClusterArn: 0,
      ConnectivityInfo: D.m({
        wire: "connectivityInfo",
        shape: i_ConnectivityInfo,
      }),
      CurrentVersion: D.m({ wire: "currentVersion" }),
      ZookeeperAccess: D.m({
        wire: "zookeeperAccess",
        shape: { Enabled: D.m({ wire: "enabled" }) },
      }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectivity",
})) as any;

export type UpdateMonitoringError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the monitoring settings for the cluster. You can use this operation to specify which Apache Kafka metrics you want Amazon MSK to send to Amazon CloudWatch. You can also specify settings for open monitoring with Prometheus.
 */
export const updateMonitoring: API.OperationMethod<
  UpdateMonitoringRequest,
  UpdateMonitoringResponse,
  UpdateMonitoringError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/monitoring",
    input: {
      ClusterArn: 0,
      CurrentVersion: D.m({ wire: "currentVersion" }),
      EnhancedMonitoring: D.m({ wire: "enhancedMonitoring" }),
      OpenMonitoring: D.m({
        wire: "openMonitoring",
        shape: i_OpenMonitoringInfo,
      }),
      LoggingInfo: D.m({ wire: "loggingInfo", shape: i_LoggingInfo }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitoring",
})) as any;

export type UpdateRebalancingError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Use this resource to update the intelligent rebalancing status of an Amazon MSK Provisioned cluster with Express brokers.
 */
export const updateRebalancing: API.OperationMethod<
  UpdateRebalancingRequest,
  UpdateRebalancingResponse,
  UpdateRebalancingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/rebalancing",
    input: {
      ClusterArn: 0,
      CurrentVersion: D.m({ wire: "currentVersion" }),
      Rebalancing: D.m({ wire: "rebalancing", shape: i_Rebalancing }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRebalancing",
})) as any;

export type UpdateReplicationInfoError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates replication info of a replicator.
 */
export const updateReplicationInfo: API.OperationMethod<
  UpdateReplicationInfoRequest,
  UpdateReplicationInfoResponse,
  UpdateReplicationInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /replication/v1/replicators/{ReplicatorArn}/replication-info",
    input: {
      ConsumerGroupReplication: D.m({
        wire: "consumerGroupReplication",
        shape: {
          ConsumerGroupsToExclude: D.m({ wire: "consumerGroupsToExclude" }),
          ConsumerGroupsToReplicate: D.m({ wire: "consumerGroupsToReplicate" }),
          DetectAndCopyNewConsumerGroups: D.m({
            wire: "detectAndCopyNewConsumerGroups",
          }),
          SynchroniseConsumerGroupOffsets: D.m({
            wire: "synchroniseConsumerGroupOffsets",
          }),
        },
      }),
      CurrentVersion: D.m({ wire: "currentVersion" }),
      ReplicatorArn: 0,
      SourceKafkaClusterArn: D.m({ wire: "sourceKafkaClusterArn" }),
      SourceKafkaClusterId: D.m({ wire: "sourceKafkaClusterId" }),
      TargetKafkaClusterArn: D.m({ wire: "targetKafkaClusterArn" }),
      TargetKafkaClusterId: D.m({ wire: "targetKafkaClusterId" }),
      TopicReplication: D.m({
        wire: "topicReplication",
        shape: {
          CopyAccessControlListsForTopics: D.m({
            wire: "copyAccessControlListsForTopics",
          }),
          CopyTopicConfigurations: D.m({ wire: "copyTopicConfigurations" }),
          DetectAndCopyNewTopics: D.m({ wire: "detectAndCopyNewTopics" }),
          TopicsToExclude: D.m({ wire: "topicsToExclude" }),
          TopicsToReplicate: D.m({ wire: "topicsToReplicate" }),
        },
      }),
      LogDelivery: D.m({ wire: "logDelivery", shape: i_LogDelivery }),
    },
    output: {
      ReplicatorArn: D.m({ wire: "replicatorArn" }),
      ReplicatorState: D.m({ wire: "replicatorState" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationInfo",
})) as any;

export type UpdateSecurityError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the security settings for the cluster. You can use this operation to specify encryption and authentication on existing clusters.
 */
export const updateSecurity: API.OperationMethod<
  UpdateSecurityRequest,
  UpdateSecurityResponse,
  UpdateSecurityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v1/clusters/{ClusterArn}/security",
    input: {
      ClientAuthentication: D.m({
        wire: "clientAuthentication",
        shape: i_ClientAuthentication,
      }),
      ClusterArn: 0,
      CurrentVersion: D.m({ wire: "currentVersion" }),
      EncryptionInfo: D.m({ wire: "encryptionInfo", shape: i_EncryptionInfo }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurity",
})) as any;

export type UpdateStorageError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates cluster broker volume size (or) sets cluster storage mode to TIERED.
 */
export const updateStorage: API.OperationMethod<
  UpdateStorageRequest,
  UpdateStorageResponse,
  UpdateStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/storage",
    input: {
      ClusterArn: 0,
      CurrentVersion: D.m({ wire: "currentVersion" }),
      ProvisionedThroughput: D.m({
        wire: "provisionedThroughput",
        shape: i_ProvisionedThroughput,
      }),
      StorageMode: D.m({ wire: "storageMode" }),
      VolumeSizeGB: D.m({ wire: "volumeSizeGB" }),
    },
    output: {
      ClusterArn: D.m({ wire: "clusterArn" }),
      ClusterOperationArn: D.m({ wire: "clusterOperationArn" }),
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorage",
})) as any;

export type UpdateTopicError =
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
  | CommonErrors;
/**
 * Updates the configuration of the specified topic.
 */
export const updateTopic: API.OperationMethod<
  UpdateTopicRequest,
  UpdateTopicResponse,
  UpdateTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/clusters/{ClusterArn}/topics/{TopicName}",
    input: {
      ClusterArn: 0,
      TopicName: 0,
      Configs: D.m({ wire: "configs" }),
      PartitionCount: D.m({ wire: "partitionCount" }),
    },
    output: {
      TopicArn: D.m({ wire: "topicArn" }),
      TopicName: D.m({ wire: "topicName" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopic",
})) as any;

const i_BrokerNodeGroupInfo: D.LazyStruct = () => ({
  BrokerAZDistribution: D.m({ wire: "brokerAZDistribution" }),
  ClientSubnets: D.m({ wire: "clientSubnets" }),
  InstanceType: D.m({ wire: "instanceType" }),
  SecurityGroups: D.m({ wire: "securityGroups" }),
  StorageInfo: D.m({
    wire: "storageInfo",
    shape: {
      EbsStorageInfo: D.m({
        wire: "ebsStorageInfo",
        shape: {
          ProvisionedThroughput: D.m({
            wire: "provisionedThroughput",
            shape: i_ProvisionedThroughput,
          }),
          VolumeSize: D.m({ wire: "volumeSize" }),
        },
      }),
    },
  }),
  ConnectivityInfo: D.m({
    wire: "connectivityInfo",
    shape: i_ConnectivityInfo,
  }),
  ZoneIds: D.m({ wire: "zoneIds" }),
});
const i_ClientAuthentication: D.LazyStruct = () => ({
  Sasl: D.m({
    wire: "sasl",
    shape: {
      Scram: D.m({
        wire: "scram",
        shape: { Enabled: D.m({ wire: "enabled" }) },
      }),
      Iam: D.m({ wire: "iam", shape: i_Iam }),
    },
  }),
  Tls: D.m({
    wire: "tls",
    shape: {
      CertificateAuthorityArnList: D.m({ wire: "certificateAuthorityArnList" }),
      Enabled: D.m({ wire: "enabled" }),
    },
  }),
  Unauthenticated: D.m({
    wire: "unauthenticated",
    shape: { Enabled: D.m({ wire: "enabled" }) },
  }),
});
const i_CloudWatchLogs: D.LazyStruct = () => ({
  Enabled: D.m({ wire: "enabled" }),
  LogGroup: D.m({ wire: "logGroup" }),
});
const i_ConfigurationInfo: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Revision: D.m({ wire: "revision" }),
});
const i_ConnectivityInfo: D.LazyStruct = () => ({
  PublicAccess: D.m({
    wire: "publicAccess",
    shape: { Type: D.m({ wire: "type" }) },
  }),
  VpcConnectivity: D.m({
    wire: "vpcConnectivity",
    shape: {
      ClientAuthentication: D.m({
        wire: "clientAuthentication",
        shape: {
          Sasl: D.m({
            wire: "sasl",
            shape: {
              Scram: D.m({
                wire: "scram",
                shape: { Enabled: D.m({ wire: "enabled" }) },
              }),
              Iam: D.m({
                wire: "iam",
                shape: { Enabled: D.m({ wire: "enabled" }) },
              }),
            },
          }),
          Tls: D.m({
            wire: "tls",
            shape: { Enabled: D.m({ wire: "enabled" }) },
          }),
        },
      }),
    },
  }),
  NetworkType: D.m({ wire: "networkType" }),
});
const i_DeadLetterQueueS3: D.LazyStruct = () => ({
  BucketArn: D.m({ wire: "bucketArn" }),
  ErrorOutputPrefix: D.m({ wire: "errorOutputPrefix" }),
  ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
});
const i_EncryptionInfo: D.LazyStruct = () => ({
  EncryptionAtRest: D.m({
    wire: "encryptionAtRest",
    shape: { DataVolumeKMSKeyId: D.m({ wire: "dataVolumeKMSKeyId" }) },
  }),
  EncryptionInTransit: D.m({
    wire: "encryptionInTransit",
    shape: {
      ClientBroker: D.m({ wire: "clientBroker" }),
      InCluster: D.m({ wire: "inCluster" }),
    },
  }),
});
const i_Firehose: D.LazyStruct = () => ({
  DeliveryStream: D.m({ wire: "deliveryStream" }),
  Enabled: D.m({ wire: "enabled" }),
});
const i_Iam: D.LazyStruct = () => ({ Enabled: D.m({ wire: "enabled" }) });
const i_LogDelivery: D.LazyStruct = () => ({
  ReplicatorLogDelivery: D.m({
    wire: "replicatorLogDelivery",
    shape: {
      CloudWatchLogs: D.m({
        wire: "cloudWatchLogs",
        shape: {
          Enabled: D.m({ wire: "enabled" }),
          LogGroup: D.m({ wire: "logGroup" }),
        },
      }),
      Firehose: D.m({
        wire: "firehose",
        shape: {
          Enabled: D.m({ wire: "enabled" }),
          DeliveryStream: D.m({ wire: "deliveryStream" }),
        },
      }),
      S3: D.m({
        wire: "s3",
        shape: {
          Enabled: D.m({ wire: "enabled" }),
          Bucket: D.m({ wire: "bucket" }),
          Prefix: D.m({ wire: "prefix" }),
        },
      }),
    },
  }),
});
const i_LoggingInfo: D.LazyStruct = () => ({
  AuthorizerLogs: D.m({
    wire: "authorizerLogs",
    shape: {
      CloudWatchLogs: D.m({ wire: "cloudWatchLogs", shape: i_CloudWatchLogs }),
      Firehose: D.m({ wire: "firehose", shape: i_Firehose }),
      S3: D.m({ wire: "s3", shape: i_S3 }),
    },
  }),
  BrokerLogs: D.m({
    wire: "brokerLogs",
    shape: {
      CloudWatchLogs: D.m({ wire: "cloudWatchLogs", shape: i_CloudWatchLogs }),
      Firehose: D.m({ wire: "firehose", shape: i_Firehose }),
      S3: D.m({ wire: "s3", shape: i_S3 }),
    },
  }),
});
const i_OpenMonitoringInfo: D.LazyStruct = () => ({
  Prometheus: D.m({
    wire: "prometheus",
    shape: {
      JmxExporter: D.m({
        wire: "jmxExporter",
        shape: { EnabledInBroker: D.m({ wire: "enabledInBroker" }) },
      }),
      NodeExporter: D.m({
        wire: "nodeExporter",
        shape: { EnabledInBroker: D.m({ wire: "enabledInBroker" }) },
      }),
    },
  }),
});
const i_ProvisionedThroughput: D.LazyStruct = () => ({
  Enabled: D.m({ wire: "enabled" }),
  VolumeThroughput: D.m({ wire: "volumeThroughput" }),
});
const i_Rebalancing: D.LazyStruct = () => ({ Status: D.m({ wire: "status" }) });
const i_S3: D.LazyStruct = () => ({
  Bucket: D.m({ wire: "bucket" }),
  Enabled: D.m({ wire: "enabled" }),
  Prefix: D.m({ wire: "prefix" }),
});
const o_AmazonMskCluster: D.LazyStruct = () => ({
  MskClusterArn: D.m({ wire: "mskClusterArn" }),
});
const o_ApacheKafkaCluster: D.LazyStruct = () => ({
  ApacheKafkaClusterId: D.m({ wire: "apacheKafkaClusterId" }),
  BootstrapBrokerString: D.m({ wire: "bootstrapBrokerString" }),
});
const o_BrokerSoftwareInfo: D.LazyStruct = () => ({
  ConfigurationArn: D.m({ wire: "configurationArn" }),
  ConfigurationRevision: D.m({ wire: "configurationRevision" }),
  KafkaVersion: D.m({ wire: "kafkaVersion" }),
});
const o_CloudWatchLogs: D.LazyStruct = () => ({
  Enabled: D.m({ wire: "enabled" }),
  LogGroup: D.m({ wire: "logGroup" }),
});
const o_Cluster: D.LazyStruct = () => ({
  ActiveOperationArn: D.m({ wire: "activeOperationArn" }),
  ClusterType: D.m({ wire: "clusterType" }),
  ClusterArn: D.m({ wire: "clusterArn" }),
  ClusterName: D.m({ wire: "clusterName" }),
  CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
  CurrentVersion: D.m({ wire: "currentVersion" }),
  State: D.m({ wire: "state" }),
  StateInfo: D.m({ wire: "stateInfo", shape: o_StateInfo }),
  Tags: D.m({ wire: "tags" }),
  Provisioned: D.m({
    wire: "provisioned",
    shape: {
      BrokerNodeGroupInfo: D.m({
        wire: "brokerNodeGroupInfo",
        shape: o_BrokerNodeGroupInfo,
      }),
      Rebalancing: D.m({ wire: "rebalancing", shape: o_Rebalancing }),
      CurrentBrokerSoftwareInfo: D.m({
        wire: "currentBrokerSoftwareInfo",
        shape: o_BrokerSoftwareInfo,
      }),
      ClientAuthentication: D.m({
        wire: "clientAuthentication",
        shape: o_ClientAuthentication,
      }),
      EncryptionInfo: D.m({ wire: "encryptionInfo", shape: o_EncryptionInfo }),
      EnhancedMonitoring: D.m({ wire: "enhancedMonitoring" }),
      OpenMonitoring: D.m({
        wire: "openMonitoring",
        shape: {
          Prometheus: D.m({
            wire: "prometheus",
            shape: {
              JmxExporter: D.m({
                wire: "jmxExporter",
                shape: { EnabledInBroker: D.m({ wire: "enabledInBroker" }) },
              }),
              NodeExporter: D.m({
                wire: "nodeExporter",
                shape: { EnabledInBroker: D.m({ wire: "enabledInBroker" }) },
              }),
            },
          }),
        },
      }),
      LoggingInfo: D.m({ wire: "loggingInfo", shape: o_LoggingInfo }),
      NumberOfBrokerNodes: D.m({ wire: "numberOfBrokerNodes" }),
      ZookeeperConnectString: D.m({ wire: "zookeeperConnectString" }),
      ZookeeperConnectStringTls: D.m({ wire: "zookeeperConnectStringTls" }),
      StorageMode: D.m({ wire: "storageMode" }),
      CustomerActionStatus: D.m({ wire: "customerActionStatus" }),
    },
  }),
  Serverless: D.m({
    wire: "serverless",
    shape: {
      VpcConfigs: D.m({
        wire: "vpcConfigs",
        shape: D.list({
          SubnetIds: D.m({ wire: "subnetIds" }),
          SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
        }),
      }),
      ClientAuthentication: D.m({
        wire: "clientAuthentication",
        shape: {
          Sasl: D.m({
            wire: "sasl",
            shape: { Iam: D.m({ wire: "iam", shape: o_Iam }) },
          }),
        },
      }),
      ConnectivityInfo: D.m({
        wire: "connectivityInfo",
        shape: o_ServerlessConnectivityInfo,
      }),
    },
  }),
});
const o_ClusterInfo: D.LazyStruct = () => ({
  ActiveOperationArn: D.m({ wire: "activeOperationArn" }),
  BrokerNodeGroupInfo: D.m({
    wire: "brokerNodeGroupInfo",
    shape: o_BrokerNodeGroupInfo,
  }),
  Rebalancing: D.m({ wire: "rebalancing", shape: o_Rebalancing }),
  ClientAuthentication: D.m({
    wire: "clientAuthentication",
    shape: o_ClientAuthentication,
  }),
  ClusterArn: D.m({ wire: "clusterArn" }),
  ClusterName: D.m({ wire: "clusterName" }),
  CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
  CurrentBrokerSoftwareInfo: D.m({
    wire: "currentBrokerSoftwareInfo",
    shape: o_BrokerSoftwareInfo,
  }),
  CurrentVersion: D.m({ wire: "currentVersion" }),
  EncryptionInfo: D.m({ wire: "encryptionInfo", shape: o_EncryptionInfo }),
  EnhancedMonitoring: D.m({ wire: "enhancedMonitoring" }),
  OpenMonitoring: D.m({ wire: "openMonitoring", shape: o_OpenMonitoring }),
  LoggingInfo: D.m({ wire: "loggingInfo", shape: o_LoggingInfo }),
  NumberOfBrokerNodes: D.m({ wire: "numberOfBrokerNodes" }),
  State: D.m({ wire: "state" }),
  StateInfo: D.m({ wire: "stateInfo", shape: o_StateInfo }),
  Tags: D.m({ wire: "tags" }),
  ZookeeperConnectString: D.m({ wire: "zookeeperConnectString" }),
  ZookeeperConnectStringTls: D.m({ wire: "zookeeperConnectStringTls" }),
  StorageMode: D.m({ wire: "storageMode" }),
  CustomerActionStatus: D.m({ wire: "customerActionStatus" }),
});
const o_ClusterOperationInfo: D.LazyStruct = () => ({
  ClientRequestId: D.m({ wire: "clientRequestId" }),
  ClusterArn: D.m({ wire: "clusterArn" }),
  CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
  EndTime: D.m({ wire: "endTime", shape: D.ts }),
  ErrorInfo: D.m({ wire: "errorInfo", shape: o_ErrorInfo }),
  OperationArn: D.m({ wire: "operationArn" }),
  OperationState: D.m({ wire: "operationState" }),
  OperationSteps: D.m({
    wire: "operationSteps",
    shape: D.list(o_ClusterOperationStep),
  }),
  OperationType: D.m({ wire: "operationType" }),
  SourceClusterInfo: D.m({
    wire: "sourceClusterInfo",
    shape: o_MutableClusterInfo,
  }),
  TargetClusterInfo: D.m({
    wire: "targetClusterInfo",
    shape: o_MutableClusterInfo,
  }),
  VpcConnectionInfo: D.m({
    wire: "vpcConnectionInfo",
    shape: o_VpcConnectionInfo,
  }),
});
const o_ClusterOperationStep: D.LazyStruct = () => ({
  StepInfo: D.m({
    wire: "stepInfo",
    shape: { StepStatus: D.m({ wire: "stepStatus" }) },
  }),
  StepName: D.m({ wire: "stepName" }),
});
const o_ConfigurationRevision: D.LazyStruct = () => ({
  CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
  Description: D.m({ wire: "description" }),
  Revision: D.m({ wire: "revision" }),
});
const o_DeadLetterQueueS3: D.LazyStruct = () => ({
  BucketArn: D.m({ wire: "bucketArn" }),
  ErrorOutputPrefix: D.m({ wire: "errorOutputPrefix" }),
  ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
});
const o_ErrorInfo: D.LazyStruct = () => ({
  ErrorCode: D.m({ wire: "errorCode" }),
  ErrorString: D.m({ wire: "errorString" }),
});
const o_Firehose: D.LazyStruct = () => ({
  DeliveryStream: D.m({ wire: "deliveryStream" }),
  Enabled: D.m({ wire: "enabled" }),
});
const o_MutableClusterInfo: D.LazyStruct = () => ({
  BrokerEBSVolumeInfo: D.m({
    wire: "brokerEBSVolumeInfo",
    shape: D.list({
      KafkaBrokerNodeId: D.m({ wire: "kafkaBrokerNodeId" }),
      ProvisionedThroughput: D.m({
        wire: "provisionedThroughput",
        shape: o_ProvisionedThroughput,
      }),
      VolumeSizeGB: D.m({ wire: "volumeSizeGB" }),
    }),
  }),
  ConfigurationInfo: D.m({
    wire: "configurationInfo",
    shape: { Arn: D.m({ wire: "arn" }), Revision: D.m({ wire: "revision" }) },
  }),
  NumberOfBrokerNodes: D.m({ wire: "numberOfBrokerNodes" }),
  EnhancedMonitoring: D.m({ wire: "enhancedMonitoring" }),
  OpenMonitoring: D.m({ wire: "openMonitoring", shape: o_OpenMonitoring }),
  ZookeeperAccess: D.m({
    wire: "zookeeperAccess",
    shape: { Enabled: D.m({ wire: "enabled" }) },
  }),
  KafkaVersion: D.m({ wire: "kafkaVersion" }),
  LoggingInfo: D.m({ wire: "loggingInfo", shape: o_LoggingInfo }),
  InstanceType: D.m({ wire: "instanceType" }),
  ClientAuthentication: D.m({
    wire: "clientAuthentication",
    shape: o_ClientAuthentication,
  }),
  EncryptionInfo: D.m({ wire: "encryptionInfo", shape: o_EncryptionInfo }),
  ConnectivityInfo: D.m({
    wire: "connectivityInfo",
    shape: o_ConnectivityInfo,
  }),
  StorageMode: D.m({ wire: "storageMode" }),
  BrokerCountUpdateInfo: D.m({
    wire: "brokerCountUpdateInfo",
    shape: {
      CreatedBrokerIds: D.m({ wire: "createdBrokerIds" }),
      DeletedBrokerIds: D.m({ wire: "deletedBrokerIds" }),
    },
  }),
  Rebalancing: D.m({ wire: "rebalancing", shape: o_Rebalancing }),
});
const o_S3: D.LazyStruct = () => ({
  Bucket: D.m({ wire: "bucket" }),
  Enabled: D.m({ wire: "enabled" }),
  Prefix: D.m({ wire: "prefix" }),
});
const o_ServerlessConnectivityInfo: D.LazyStruct = () => ({
  NetworkType: D.m({ wire: "networkType" }),
});
const o_UnprocessedScramSecret: D.LazyStruct = () => ({
  ErrorCode: D.m({ wire: "errorCode" }),
  ErrorMessage: D.m({ wire: "errorMessage" }),
  SecretArn: D.m({ wire: "secretArn" }),
});
const o_UserIdentity: D.LazyStruct = () => ({
  Type: D.m({ wire: "type" }),
  PrincipalId: D.m({ wire: "principalId" }),
});
const o_VpcConnectionInfo: D.LazyStruct = () => ({
  VpcConnectionArn: D.m({ wire: "vpcConnectionArn" }),
  Owner: D.m({ wire: "owner" }),
  UserIdentity: D.m({ wire: "userIdentity", shape: o_UserIdentity }),
  CreationTime: D.m({ wire: "creationTime", shape: D.ts }),
});
const o_BrokerNodeGroupInfo: D.LazyStruct = () => ({
  BrokerAZDistribution: D.m({ wire: "brokerAZDistribution" }),
  ClientSubnets: D.m({ wire: "clientSubnets" }),
  InstanceType: D.m({ wire: "instanceType" }),
  SecurityGroups: D.m({ wire: "securityGroups" }),
  StorageInfo: D.m({
    wire: "storageInfo",
    shape: {
      EbsStorageInfo: D.m({
        wire: "ebsStorageInfo",
        shape: {
          ProvisionedThroughput: D.m({
            wire: "provisionedThroughput",
            shape: o_ProvisionedThroughput,
          }),
          VolumeSize: D.m({ wire: "volumeSize" }),
        },
      }),
    },
  }),
  ConnectivityInfo: D.m({
    wire: "connectivityInfo",
    shape: o_ConnectivityInfo,
  }),
  ZoneIds: D.m({ wire: "zoneIds" }),
});
const o_ClientAuthentication: D.LazyStruct = () => ({
  Sasl: D.m({
    wire: "sasl",
    shape: {
      Scram: D.m({
        wire: "scram",
        shape: { Enabled: D.m({ wire: "enabled" }) },
      }),
      Iam: D.m({ wire: "iam", shape: o_Iam }),
    },
  }),
  Tls: D.m({
    wire: "tls",
    shape: {
      CertificateAuthorityArnList: D.m({ wire: "certificateAuthorityArnList" }),
      Enabled: D.m({ wire: "enabled" }),
    },
  }),
  Unauthenticated: D.m({
    wire: "unauthenticated",
    shape: { Enabled: D.m({ wire: "enabled" }) },
  }),
});
const o_ConnectivityInfo: D.LazyStruct = () => ({
  PublicAccess: D.m({
    wire: "publicAccess",
    shape: { Type: D.m({ wire: "type" }) },
  }),
  VpcConnectivity: D.m({
    wire: "vpcConnectivity",
    shape: {
      ClientAuthentication: D.m({
        wire: "clientAuthentication",
        shape: {
          Sasl: D.m({
            wire: "sasl",
            shape: {
              Scram: D.m({
                wire: "scram",
                shape: { Enabled: D.m({ wire: "enabled" }) },
              }),
              Iam: D.m({
                wire: "iam",
                shape: { Enabled: D.m({ wire: "enabled" }) },
              }),
            },
          }),
          Tls: D.m({
            wire: "tls",
            shape: { Enabled: D.m({ wire: "enabled" }) },
          }),
        },
      }),
    },
  }),
  NetworkType: D.m({ wire: "networkType" }),
});
const o_EncryptionInfo: D.LazyStruct = () => ({
  EncryptionAtRest: D.m({
    wire: "encryptionAtRest",
    shape: { DataVolumeKMSKeyId: D.m({ wire: "dataVolumeKMSKeyId" }) },
  }),
  EncryptionInTransit: D.m({
    wire: "encryptionInTransit",
    shape: {
      ClientBroker: D.m({ wire: "clientBroker" }),
      InCluster: D.m({ wire: "inCluster" }),
    },
  }),
});
const o_Iam: D.LazyStruct = () => ({ Enabled: D.m({ wire: "enabled" }) });
const o_LoggingInfo: D.LazyStruct = () => ({
  AuthorizerLogs: D.m({
    wire: "authorizerLogs",
    shape: {
      CloudWatchLogs: D.m({ wire: "cloudWatchLogs", shape: o_CloudWatchLogs }),
      Firehose: D.m({ wire: "firehose", shape: o_Firehose }),
      S3: D.m({ wire: "s3", shape: o_S3 }),
    },
  }),
  BrokerLogs: D.m({
    wire: "brokerLogs",
    shape: {
      CloudWatchLogs: D.m({ wire: "cloudWatchLogs", shape: o_CloudWatchLogs }),
      Firehose: D.m({ wire: "firehose", shape: o_Firehose }),
      S3: D.m({ wire: "s3", shape: o_S3 }),
    },
  }),
});
const o_OpenMonitoring: D.LazyStruct = () => ({
  Prometheus: D.m({
    wire: "prometheus",
    shape: {
      JmxExporter: D.m({
        wire: "jmxExporter",
        shape: { EnabledInBroker: D.m({ wire: "enabledInBroker" }) },
      }),
      NodeExporter: D.m({
        wire: "nodeExporter",
        shape: { EnabledInBroker: D.m({ wire: "enabledInBroker" }) },
      }),
    },
  }),
});
const o_ProvisionedThroughput: D.LazyStruct = () => ({
  Enabled: D.m({ wire: "enabled" }),
  VolumeThroughput: D.m({ wire: "volumeThroughput" }),
});
const o_Rebalancing: D.LazyStruct = () => ({ Status: D.m({ wire: "status" }) });
const o_StateInfo: D.LazyStruct = () => ({
  Code: D.m({ wire: "code" }),
  Message: D.m({ wire: "message" }),
});
