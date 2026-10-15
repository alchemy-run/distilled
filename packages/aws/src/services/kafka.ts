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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Kafka", serviceShapeName: "Kafka" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "kafka" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-14");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
          return e(`https://kafka.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
            return e(`https://kafka-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://kafka.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://kafka.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://kafka.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ClusterConnectivityException
  extends /*@__PURE__*/ S.TaggedError<ClusterConnectivityException>()(
    "ClusterConnectivityException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ControllerMovedException
  extends /*@__PURE__*/ S.TaggedError<ControllerMovedException>()(
    "ControllerMovedException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GroupSubscribedToTopicException
  extends /*@__PURE__*/ S.TaggedError<GroupSubscribedToTopicException>()(
    "GroupSubscribedToTopicException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class KafkaRequestException
  extends /*@__PURE__*/ S.TaggedError<KafkaRequestException>()(
    "KafkaRequestException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KafkaTimeoutException
  extends /*@__PURE__*/ S.TaggedError<KafkaTimeoutException>()(
    "KafkaTimeoutException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class NotControllerException
  extends /*@__PURE__*/ S.TaggedError<NotControllerException>()(
    "NotControllerException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ReassignmentInProgressException
  extends /*@__PURE__*/ S.TaggedError<ReassignmentInProgressException>()(
    "ReassignmentInProgressException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ServerlessUnsupported
  extends /*@__PURE__*/ S.TaggedError<ServerlessUnsupported>()(
    "ServerlessUnsupported",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ServerlessUnsupportedException",
      message: { includes: "not supported on serverless" },
    }),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TopicExistsException
  extends /*@__PURE__*/ S.TaggedError<TopicExistsException>()(
    "TopicExistsException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnknownTopicOrPartitionException
  extends /*@__PURE__*/ S.TaggedError<UnknownTopicOrPartitionException>()(
    "UnknownTopicOrPartitionException",
    {
      InvalidParameter: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type __listOf__string = string[];
const __listOf__string = /*@__PURE__*/ __L.at(__c2, 0);
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
const __listOfUnprocessedScramSecret = /*@__PURE__*/ __L.at(__c1, 1);
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
const __listOfPartitionSource = /*@__PURE__*/ __L.at(__c9, 4);
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
const __listOfDestinationTable = /*@__PURE__*/ __L.at(__c9, 7);
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
export type S3StorageClass = "STANDARD" | "INTELLIGENT_TIERING" | "GLACIER_IR" | (string & {});
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
const __mapOf__string = /*@__PURE__*/ __L.at(__c5, 0);
export type ValueConverter = "BYTE_ARRAY" | "JSON" | "JSON_SCHEMA_GSR" | "STRING" | (string & {});
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
const __listOfTopicConfiguration = /*@__PURE__*/ __L.at(__c9, 16);
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
export type ClientBroker = "TLS" | "TLS_PLAINTEXT" | "PLAINTEXT" | (string & {});
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
const __listOfVpcConfig = /*@__PURE__*/ __L.at(__c20, 1);
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
export type ConfigurationState = "ACTIVE" | "DELETING" | "DELETE_FAILED" | (string & {});
export interface CreateConfigurationResponse {
  Arn?: string;
  CreationTime?: Date;
  LatestRevision?: ConfigurationRevision & { CreationTime: __timestampIso8601; Revision: number };
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
export type KafkaClusterSaslScramMechanism = "SHA256" | "SHA512" | (string & {});
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
export type TokenEndpointAuthenticationMethod = "POST" | "BASIC" | "NONE" | (string & {});
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
const __listOfKafkaCluster = /*@__PURE__*/ __L.at(__c23, 1);
export type __stringMax256 = string;
export type __listOf__stringMax256 = string[];
const __listOf__stringMax256 = __listOf__string as any as S.Schema<__listOf__stringMax256>;
export type ConsumerGroupOffsetSyncMode = "LEGACY" | "ENHANCED" | (string & {});
export interface ConsumerGroupReplication {
  ConsumerGroupsToExclude?: string[];
  ConsumerGroupsToReplicate?: string[];
  DetectAndCopyNewConsumerGroups?: boolean;
  SynchroniseConsumerGroupOffsets?: boolean;
  ConsumerGroupOffsetSyncMode?: ConsumerGroupOffsetSyncMode;
}
export type TargetCompressionType = "NONE" | "GZIP" | "SNAPPY" | "LZ4" | "ZSTD" | (string & {});
export type ReplicationStartingPositionType = "LATEST" | "EARLIEST" | (string & {});
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
const __listOf__stringMax249 = __listOf__string as any as S.Schema<__listOf__stringMax249>;
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
const __listOfReplicationInfo = /*@__PURE__*/ __L.at(__c23, 3);
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
export type TopicState = "CREATING" | "UPDATING" | "DELETING" | "ACTIVE" | (string & {});
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
const __listOfClusterOperationStep = /*@__PURE__*/ __L.at(__c46, 3);
export interface BrokerEBSVolumeInfo {
  KafkaBrokerNodeId?: string;
  ProvisionedThroughput?: ProvisionedThroughput;
  VolumeSizeGB?: number;
}
export type __listOfBrokerEBSVolumeInfo = BrokerEBSVolumeInfo[];
const __listOfBrokerEBSVolumeInfo = /*@__PURE__*/ __L.at(__c47, 1);
export interface ZookeeperAccess {
  Enabled?: boolean;
}
export type __listOf__double = number[];
const __listOf__double = /*@__PURE__*/ __L.at(__c45, 0);
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
      BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & { KafkaBrokerNodeId: string })[];
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
      BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & { KafkaBrokerNodeId: string })[];
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
        BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & { KafkaBrokerNodeId: string })[];
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
        BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & { KafkaBrokerNodeId: string })[];
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
    Serverless: Serverless & { VpcConfigs: (VpcConfig & { SubnetIds: __listOf__string })[] };
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
  LatestRevision?: ConfigurationRevision & { CreationTime: __timestampIso8601; Revision: number };
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
const __listOfKafkaClusterDescription = /*@__PURE__*/ __L.at(__c56, 2);
export interface ReplicationInfoDescription {
  ConsumerGroupReplication?: ConsumerGroupReplication;
  SourceKafkaClusterAlias?: string;
  TargetCompressionType?: TargetCompressionType;
  TargetKafkaClusterAlias?: string;
  TopicReplication?: TopicReplication;
}
export type __listOfReplicationInfoDescription = ReplicationInfoDescription[];
const __listOfReplicationInfoDescription = /*@__PURE__*/ __L.at(__c56, 4);
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
        ClientCredentials: KafkaClusterOAuthClientCredentials & { TokenRequestSecretArn: string };
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
    TopicReplication: TopicReplication & { TopicsToReplicate: __listOf__stringMax249 };
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
const __listOf__integer = __listOf__double as any as S.Schema<__listOf__integer>;
export interface TopicPartitionInfo {
  Partition?: number;
  Leader?: number;
  Replicas?: number[];
  Isr?: number[];
}
export type __listOfTopicPartitionInfo = TopicPartitionInfo[];
const __listOfTopicPartitionInfo = /*@__PURE__*/ __L.at(__c58, 2);
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
const __listOfCompatibleKafkaVersion = /*@__PURE__*/ __L.at(__c62, 2);
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
const __listOfChannelInfo = /*@__PURE__*/ __L.at(__c63, 2);
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
const __listOfClientVpcConnection = /*@__PURE__*/ __L.at(__c64, 2);
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
const __listOfClusterOperationInfo = /*@__PURE__*/ __L.at(__c65, 1);
export interface ListClusterOperationsResponse {
  ClusterOperationInfoList?: (ClusterOperationInfo & {
    SourceClusterInfo: MutableClusterInfo & {
      BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & { KafkaBrokerNodeId: string })[];
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
      BrokerEBSVolumeInfo: (BrokerEBSVolumeInfo & { KafkaBrokerNodeId: string })[];
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
const __listOfClusterOperationV2Summary = /*@__PURE__*/ __L.at(__c66, 2);
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
const __listOfClusterInfo = /*@__PURE__*/ __L.at(__c67, 1);
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
const __listOfCluster = /*@__PURE__*/ __L.at(__c68, 1);
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
    Serverless: Serverless & { VpcConfigs: (VpcConfig & { SubnetIds: __listOf__string })[] };
  })[];
  NextToken?: string;
}
export interface ListConfigurationRevisionsRequest {
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfConfigurationRevision = ConfigurationRevision[];
const __listOfConfigurationRevision = /*@__PURE__*/ __L.at(__c69, 1);
export interface ListConfigurationRevisionsResponse {
  NextToken?: string;
  Revisions?: (ConfigurationRevision & { CreationTime: __timestampIso8601; Revision: number })[];
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
const __listOfConfiguration = /*@__PURE__*/ __L.at(__c70, 1);
export interface ListConfigurationsResponse {
  Configurations?: (Configuration & {
    Arn: string;
    CreationTime: __timestampIso8601;
    Description: string;
    KafkaVersions: __listOf__string;
    LatestRevision: ConfigurationRevision & { CreationTime: __timestampIso8601; Revision: number };
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
const __listOfKafkaVersion = /*@__PURE__*/ __L.at(__c71, 2);
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
const __listOfNodeInfo = /*@__PURE__*/ __L.at(__c72, 5);
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
const __listOfKafkaClusterSummary = /*@__PURE__*/ __L.at(__c73, 2);
export interface ReplicationInfoSummary {
  SourceKafkaClusterAlias?: string;
  TargetKafkaClusterAlias?: string;
}
export type __listOfReplicationInfoSummary = ReplicationInfoSummary[];
const __listOfReplicationInfoSummary = /*@__PURE__*/ __L.at(__c73, 4);
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
const __listOfReplicatorSummary = /*@__PURE__*/ __L.at(__c73, 6);
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
const __listOfTopicInfo = /*@__PURE__*/ __L.at(__c76, 2);
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
const __listOfVpcConnection = /*@__PURE__*/ __L.at(__c77, 2);
export interface ListVpcConnectionsResponse {
  VpcConnections?: (VpcConnection & { VpcConnectionArn: string; TargetClusterArn: string })[];
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
  LatestRevision?: ConfigurationRevision & { CreationTime: __timestampIso8601; Revision: number };
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
  input: __S(0, __c0, 0) as any as S.Schema<BatchAssociateScramSecretRequest>,
  output: __S(18, __c1, 2) as any as S.Schema<BatchAssociateScramSecretResponse>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<BatchDisassociateScramSecretRequest>,
  output: __S(18, __c1, 2) as any as S.Schema<BatchDisassociateScramSecretResponse>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<CreateChannelRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<CreateChannelResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<CreateClusterRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<CreateClusterResponse>,
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
}));

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
  input: __S(306, __c19, 2) as any as S.Schema<CreateClusterV2Request>,
  output: __S(307, __c19, 3) as any as S.Schema<CreateClusterV2Response>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<CreateConfigurationRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<CreateConfigurationResponse>,
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
}));

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
  input: __S(372, __c23, 4) as any as S.Schema<CreateReplicatorRequest>,
  output: __S(373, __c23, 5) as any as S.Schema<CreateReplicatorResponse>,
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
}));

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
  | ServerlessUnsupported
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
  input: __S(432, __c27, 0) as any as S.Schema<CreateTopicRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<CreateTopicResponse>,
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
    ServerlessUnsupported,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopic",
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<CreateVpcConnectionRequest>,
  output: __S(465, __c29, 1) as any as S.Schema<CreateVpcConnectionResponse>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<DeleteChannelRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteChannelResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<DeleteClusterRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<DeleteClusterResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<DeleteClusterPolicyRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<DeleteClusterPolicyResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterPolicy",
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<DeleteConfigurationRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<DeleteConfigurationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguration",
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<DeleteReplicatorRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<DeleteReplicatorResponse>,
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
}));

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
  | ServerlessUnsupported
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
  input: __S(592, __c37, 0) as any as S.Schema<DeleteTopicRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteTopicResponse>,
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
    ServerlessUnsupported,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopic",
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<DeleteVpcConnectionRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<DeleteVpcConnectionResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcConnection",
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<DescribeChannelRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<DescribeChannelResponse>,
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
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<DescribeClusterRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<DescribeClusterResponse>,
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
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<DescribeClusterOperationRequest>,
  output: __S(705, __c44, 1) as any as S.Schema<DescribeClusterOperationResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<DescribeClusterOperationV2Request>,
  output: __S(789, __c49, 5) as any as S.Schema<DescribeClusterOperationV2Response>,
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
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<DescribeClusterV2Request>,
  output: __S(817, __c51, 1) as any as S.Schema<DescribeClusterV2Response>,
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
}));

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
  input: __S(848, __c53, 0) as any as S.Schema<DescribeConfigurationRequest>,
  output: __S(864, __c54, 0) as any as S.Schema<DescribeConfigurationResponse>,
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
}));

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
  input: __S(880, __c55, 0) as any as S.Schema<DescribeConfigurationRevisionRequest>,
  output: __S(881, __c55, 1) as any as S.Schema<DescribeConfigurationRevisionResponse>,
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
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<DescribeReplicatorRequest>,
  output: __S(901, __c56, 5) as any as S.Schema<DescribeReplicatorResponse>,
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
}));

export type DescribeTopicError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException
  | ServerlessUnsupported
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
  input: __S(912, __c57, 0) as any as S.Schema<DescribeTopicRequest>,
  output: __S(913, __c57, 1) as any as S.Schema<DescribeTopicResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
    ServerlessUnsupported,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopic",
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<DescribeTopicPartitionsRequest>,
  output: __S(931, __c58, 3) as any as S.Schema<DescribeTopicPartitionsResponse>,
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
  input: __S(944, __c59, 0) as any as S.Schema<DescribeVpcConnectionRequest>,
  output: __S(945, __c59, 1) as any as S.Schema<DescribeVpcConnectionResponse>,
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
}));

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
  input: __S(960, __c60, 0) as any as S.Schema<GetBootstrapBrokersRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<GetBootstrapBrokersResponse>,
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
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<GetClusterPolicyRequest>,
  output: __S(977, __c61, 1) as any as S.Schema<GetClusterPolicyResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterPolicy",
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<GetCompatibleKafkaVersionsRequest>,
  output: __S(995, __c62, 3) as any as S.Schema<GetCompatibleKafkaVersionsResponse>,
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
}));

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
  input: __S(1008, __c63, 0) as any as S.Schema<ListChannelsRequest>,
  output: __S(1011, __c63, 3) as any as S.Schema<ListChannelsResponse>,
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
}));

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
  input: __S(1024, __c64, 0) as any as S.Schema<ListClientVpcConnectionsRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<ListClientVpcConnectionsResponse>,
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
  input: __S(1040, __c65, 0) as any as S.Schema<ListClusterOperationsRequest>,
  output: __S(1042, __c65, 2) as any as S.Schema<ListClusterOperationsResponse>,
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
  input: __S(1056, __c66, 0) as any as S.Schema<ListClusterOperationsV2Request>,
  output: __S(1059, __c66, 3) as any as S.Schema<ListClusterOperationsV2Response>,
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
  input: __S(1072, __c67, 0) as any as S.Schema<ListClustersRequest>,
  output: __S(1074, __c67, 2) as any as S.Schema<ListClustersResponse>,
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
  input: __S(1088, __c68, 0) as any as S.Schema<ListClustersV2Request>,
  output: __S(1090, __c68, 2) as any as S.Schema<ListClustersV2Response>,
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
  input: __S(1104, __c69, 0) as any as S.Schema<ListConfigurationRevisionsRequest>,
  output: __S(1106, __c69, 2) as any as S.Schema<ListConfigurationRevisionsResponse>,
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
  input: __S(1120, __c70, 0) as any as S.Schema<ListConfigurationsRequest>,
  output: __S(1122, __c70, 2) as any as S.Schema<ListConfigurationsResponse>,
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
  input: __S(1136, __c71, 0) as any as S.Schema<ListKafkaVersionsRequest>,
  output: __S(1139, __c71, 3) as any as S.Schema<ListKafkaVersionsResponse>,
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
  input: __S(1152, __c72, 0) as any as S.Schema<ListNodesRequest>,
  output: __S(1158, __c72, 6) as any as S.Schema<ListNodesResponse>,
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
  input: __S(1168, __c73, 0) as any as S.Schema<ListReplicatorsRequest>,
  output: __S(1175, __c73, 7) as any as S.Schema<ListReplicatorsResponse>,
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
  input: __S(1184, __c74, 0) as any as S.Schema<ListScramSecretsRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<ListScramSecretsResponse>,
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
  input: __S(1200, __c75, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1201, __c75, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTopicsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | NotFoundException
  | ServerlessUnsupported
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
  input: __S(1216, __c76, 0) as any as S.Schema<ListTopicsRequest>,
  output: __S(1219, __c76, 3) as any as S.Schema<ListTopicsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
    NotFoundException,
    ServerlessUnsupported,
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
  input: __S(1232, __c77, 0) as any as S.Schema<ListVpcConnectionsRequest>,
  output: __S(1235, __c77, 3) as any as S.Schema<ListVpcConnectionsResponse>,
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
  input: __S(1248, __c78, 0) as any as S.Schema<PutClusterPolicyRequest>,
  output: __S(1249, __c78, 1) as any as S.Schema<PutClusterPolicyResponse>,
  errors: [BadRequestException, ForbiddenException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutClusterPolicy",
}));

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
  input: __S(1264, __c79, 0) as any as S.Schema<RebootBrokerRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<RebootBrokerResponse>,
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
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<RejectClientVpcConnectionRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<RejectClientVpcConnectionResponse>,
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
}));

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
  input: __S(1312, __c82, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<TagResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(1328, __c83, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [BadRequestException, InternalServerErrorException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<UpdateBrokerCountRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateBrokerCountResponse>,
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
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<UpdateBrokerStorageRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateBrokerStorageResponse>,
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
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<UpdateBrokerTypeRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateBrokerTypeResponse>,
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
}));

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
  input: __S(1393, __c87, 1) as any as S.Schema<UpdateChannelRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateChannelResponse>,
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
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<UpdateClusterConfigurationRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateClusterConfigurationResponse>,
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
}));

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
  input: __S(1424, __c89, 0) as any as S.Schema<UpdateClusterKafkaVersionRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateClusterKafkaVersionResponse>,
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
}));

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
  input: __S(1440, __c90, 0) as any as S.Schema<UpdateConfigurationRequest>,
  output: __S(1441, __c90, 1) as any as S.Schema<UpdateConfigurationResponse>,
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
}));

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
  input: __S(1456, __c91, 0) as any as S.Schema<UpdateConnectivityRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateConnectivityResponse>,
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
}));

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
  input: __S(1472, __c92, 0) as any as S.Schema<UpdateMonitoringRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateMonitoringResponse>,
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
}));

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
  input: __S(1488, __c93, 0) as any as S.Schema<UpdateRebalancingRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateRebalancingResponse>,
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
}));

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
  input: __S(1506, __c94, 2) as any as S.Schema<UpdateReplicationInfoRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<UpdateReplicationInfoResponse>,
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
}));

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
  input: __S(1520, __c95, 0) as any as S.Schema<UpdateSecurityRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateSecurityResponse>,
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
}));

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
  input: __S(1536, __c96, 0) as any as S.Schema<UpdateStorageRequest>,
  output: __S(1280, __c80, 0) as any as S.Schema<UpdateStorageResponse>,
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
}));

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
  | ServerlessUnsupported
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
  input: __S(1552, __c97, 0) as any as S.Schema<UpdateTopicRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<UpdateTopicResponse>,
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
    ServerlessUnsupported,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopic",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          SecretArnList: S.optional(__listOf__string),
        })
          .pipe(S.encodeKeys({ SecretArnList: "secretArnList" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/clusters/{ClusterArn}/scram-secrets" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "BatchAssociateScramSecretRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "UnprocessedScramSecret" });
    case 1:
      return S.Array(__S(16, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.optional(S.String),
          UnprocessedScramSecrets: S.optional(__listOfUnprocessedScramSecret),
        }).pipe(
          S.encodeKeys({
            ClusterArn: "clusterArn",
            UnprocessedScramSecrets: "unprocessedScramSecrets",
          }),
        ),
      ).annotate({ identifier: "BatchAssociateScramSecretResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          SecretArnList: S.optional(__listOf__string),
        })
          .pipe(S.encodeKeys({ SecretArnList: "secretArnList" }))
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v1/clusters/{ClusterArn}/scram-secrets" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "BatchDisassociateScramSecretRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.optional(S.String),
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          EncryptionConfiguration: S.optional(__S(144, __c9, 0)),
          IcebergDestinationConfiguration: S.optional(__S(154, __c9, 10)),
          S3DestinationConfiguration: S.optional(__S(156, __c9, 12)),
          Tags: S.optional(__mapOf__string),
          TopicConfigurationList: S.optional(__listOfTopicConfiguration),
          LoggingInfo: S.optional(__S(114, __c7, 2)),
        })
          .pipe(
            S.encodeKeys({
              ChannelName: "channelName",
              EncryptionConfiguration: "encryptionConfiguration",
              IcebergDestinationConfiguration: "icebergDestinationConfiguration",
              S3DestinationConfiguration: "s3DestinationConfiguration",
              Tags: "tags",
              TopicConfigurationList: "topicConfigurationList",
              LoggingInfo: "loggingInfo",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/clusters/{ClusterArn}/channels" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateChannelRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), LogGroup: S.optional(S.String) }).pipe(
          S.encodeKeys({ Enabled: "enabled", LogGroup: "logGroup" }),
        ),
      ).annotate({ identifier: "CloudWatchLogs" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryStream: S.optional(S.String), Enabled: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ DeliveryStream: "deliveryStream", Enabled: "enabled" }),
        ),
      ).annotate({ identifier: "Firehose" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          Prefix: S.optional(S.String),
        }).pipe(S.encodeKeys({ Bucket: "bucket", Enabled: "enabled", Prefix: "prefix" })),
      ).annotate({ identifier: "S3" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogs: S.optional(__S(96, __c6, 0)),
          Firehose: S.optional(__S(112, __c7, 0)),
          S3: S.optional(__S(113, __c7, 1)),
        }).pipe(S.encodeKeys({ CloudWatchLogs: "cloudWatchLogs", Firehose: "firehose", S3: "s3" })),
      ).annotate({ identifier: "ChannelLoggingInfo" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          ClusterOperationArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ ChannelArn: "channelArn", ClusterOperationArn: "clusterOperationArn" }),
        ),
      ).annotate({ identifier: "CreateChannelResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KmsKeyArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ KmsKeyArn: "kmsKeyArn" }),
        ),
      ).annotate({ identifier: "EncryptionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CatalogArn: S.optional(S.String),
          WarehouseLocation: S.optional(S.String),
        }).pipe(S.encodeKeys({ CatalogArn: "catalogArn", WarehouseLocation: "warehouseLocation" })),
      ).annotate({ identifier: "Catalog" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BucketArn: S.optional(S.String),
          ErrorOutputPrefix: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BucketArn: "bucketArn",
            ErrorOutputPrefix: "errorOutputPrefix",
            ExpectedBucketOwner: "expectedBucketOwner",
          }),
        ),
      ).annotate({ identifier: "DeadLetterQueueS3" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SourceName: S.optional(S.String) }).pipe(
          S.encodeKeys({ SourceName: "sourceName" }),
        ),
      ).annotate({ identifier: "PartitionSource" });
    case 4:
      return S.Array(__S(147, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          PartitionStrategy: S.optional(S.String),
          SourceList: S.optional(__listOfPartitionSource),
        }).pipe(S.encodeKeys({ PartitionStrategy: "partitionStrategy", SourceList: "sourceList" })),
      ).annotate({ identifier: "PartitionSpec" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DestinationDatabaseName: S.optional(S.String),
          DestinationTableName: S.optional(S.String),
          PartitionSpec: S.optional(__S(149, __c9, 5)),
        }).pipe(
          S.encodeKeys({
            DestinationDatabaseName: "destinationDatabaseName",
            DestinationTableName: "destinationTableName",
            PartitionSpec: "partitionSpec",
          }),
        ),
      ).annotate({ identifier: "DestinationTable" });
    case 7:
      return S.Array(__S(150, __c9, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ EnableSchemaEvolution: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ EnableSchemaEvolution: "enableSchemaEvolution" }),
        ),
      ).annotate({ identifier: "SchemaEvolution" });
    case 9:
      return S.suspend(() =>
        S.Struct({ EnableTableCreation: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ EnableTableCreation: "enableTableCreation" }),
        ),
      ).annotate({ identifier: "TableCreation" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AppendOnly: S.optional(S.Boolean),
          Catalog: S.optional(__S(145, __c9, 1)),
          DataFreshnessInSeconds: S.optional(S.Number),
          DeadLetterQueueS3: S.optional(__S(146, __c9, 2)),
          DestinationTableList: S.optional(__listOfDestinationTable),
          SchemaEvolution: S.optional(__S(152, __c9, 8)),
          ServiceExecutionRoleArn: S.optional(S.String),
          TableCreation: S.optional(__S(153, __c9, 9)),
          CompressionType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppendOnly: "appendOnly",
            Catalog: "catalog",
            DataFreshnessInSeconds: "dataFreshnessInSeconds",
            DeadLetterQueueS3: "deadLetterQueueS3",
            DestinationTableList: "destinationTableList",
            SchemaEvolution: "schemaEvolution",
            ServiceExecutionRoleArn: "serviceExecutionRoleArn",
            TableCreation: "tableCreation",
            CompressionType: "compressionType",
          }),
        ),
      ).annotate({ identifier: "IcebergDestinationConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          BucketArn: S.optional(S.String),
          CompressionType: S.optional(S.String),
          OutputPrefix: S.optional(S.String),
          OutputKeyTemplate: S.optional(S.String),
          StorageClass: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BucketArn: "bucketArn",
            CompressionType: "compressionType",
            OutputPrefix: "outputPrefix",
            OutputKeyTemplate: "outputKeyTemplate",
            StorageClass: "storageClass",
            ExpectedBucketOwner: "expectedBucketOwner",
          }),
        ),
      ).annotate({ identifier: "S3Storage" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          DataFreshnessInSeconds: S.optional(S.Number),
          DeadLetterQueueS3: S.optional(__S(146, __c9, 2)),
          ServiceExecutionRoleArn: S.optional(S.String),
          Storage: S.optional(__S(155, __c9, 11)),
        }).pipe(
          S.encodeKeys({
            DataFreshnessInSeconds: "dataFreshnessInSeconds",
            DeadLetterQueueS3: "deadLetterQueueS3",
            ServiceExecutionRoleArn: "serviceExecutionRoleArn",
            Storage: "storage",
          }),
        ),
      ).annotate({ identifier: "S3DestinationConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ ValueConverter: S.optional(S.String) }).pipe(
          S.encodeKeys({ ValueConverter: "valueConverter" }),
        ),
      ).annotate({ identifier: "RecordConverter" });
    case 14:
      return S.suspend(() =>
        S.Struct({ GsrArn: S.optional(S.String) }).pipe(S.encodeKeys({ GsrArn: "gsrArn" })),
      ).annotate({ identifier: "RecordSchema" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          RecordConverter: S.optional(__S(157, __c9, 13)),
          RecordSchema: S.optional(__S(158, __c9, 14)),
          TopicArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            RecordConverter: "recordConverter",
            RecordSchema: "recordSchema",
            TopicArn: "topicArn",
          }),
        ),
      ).annotate({ identifier: "TopicConfiguration" });
    case 16:
      return S.Array(__S(159, __c9, 15));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerNodeGroupInfo: S.optional(__S(274, __c17, 2)),
          Rebalancing: S.optional(__S(240, __c15, 0)),
          ClientAuthentication: S.optional(__S(257, __c16, 1)),
          ClusterName: S.optional(S.String),
          ConfigurationInfo: S.optional(__S(288, __c18, 0)),
          EncryptionInfo: S.optional(__S(260, __c16, 4)),
          EnhancedMonitoring: S.optional(S.String),
          OpenMonitoring: S.optional(__S(226, __c14, 2)),
          KafkaVersion: S.optional(S.String),
          LoggingInfo: S.optional(__S(227, __c14, 3)),
          NumberOfBrokerNodes: S.optional(S.Number),
          Tags: S.optional(__mapOf__string),
          StorageMode: S.optional(S.String),
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
            T.all(T.Http({ method: "POST", uri: "/v1/clusters" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.optional(S.String),
          ClusterName: S.optional(S.String),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ ClusterArn: "clusterArn", ClusterName: "clusterName", State: "state" }),
        ),
      ).annotate({ identifier: "CreateClusterResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), VolumeThroughput: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Enabled: "enabled", VolumeThroughput: "volumeThroughput" }),
        ),
      ).annotate({ identifier: "ProvisionedThroughput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String) }).pipe(S.encodeKeys({ Type: "type" })),
      ).annotate({ identifier: "PublicAccess" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Sasl: S.optional(__S(209, __c13, 1)),
          Tls: S.optional(__S(208, __c13, 0)),
        }).pipe(S.encodeKeys({ Sasl: "sasl", Tls: "tls" })),
      ).annotate({ identifier: "VpcConnectivityClientAuthentication" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ClientAuthentication: S.optional(__S(193, __c12, 1)) }).pipe(
          S.encodeKeys({ ClientAuthentication: "clientAuthentication" }),
        ),
      ).annotate({ identifier: "VpcConnectivity" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          PublicAccess: S.optional(__S(192, __c12, 0)),
          VpcConnectivity: S.optional(__S(194, __c12, 2)),
          NetworkType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            PublicAccess: "publicAccess",
            VpcConnectivity: "vpcConnectivity",
            NetworkType: "networkType",
          }),
        ),
      ).annotate({ identifier: "ConnectivityInfo" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(S.encodeKeys({ Enabled: "enabled" })),
      ).annotate({ identifier: "VpcConnectivityScram" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Scram: S.optional(__S(208, __c13, 0)),
          Iam: S.optional(__S(208, __c13, 0)),
        }).pipe(S.encodeKeys({ Scram: "scram", Iam: "iam" })),
      ).annotate({ identifier: "VpcConnectivitySasl" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EnabledInBroker: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ EnabledInBroker: "enabledInBroker" }),
        ),
      ).annotate({ identifier: "JmxExporterInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JmxExporter: S.optional(__S(224, __c14, 0)),
          NodeExporter: S.optional(__S(224, __c14, 0)),
        }).pipe(S.encodeKeys({ JmxExporter: "jmxExporter", NodeExporter: "nodeExporter" })),
      ).annotate({ identifier: "PrometheusInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Prometheus: S.optional(__S(225, __c14, 1)) }).pipe(
          S.encodeKeys({ Prometheus: "prometheus" }),
        ),
      ).annotate({ identifier: "OpenMonitoringInfo" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AuthorizerLogs: S.optional(__S(114, __c7, 2)),
          BrokerLogs: S.optional(__S(114, __c7, 2)),
        }).pipe(S.encodeKeys({ AuthorizerLogs: "authorizerLogs", BrokerLogs: "brokerLogs" })),
      ).annotate({ identifier: "LoggingInfo" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String) }).pipe(S.encodeKeys({ Status: "status" })),
      ).annotate({ identifier: "Rebalancing" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateAuthorityArnList: S.optional(__listOf__string),
          Enabled: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            CertificateAuthorityArnList: "certificateAuthorityArnList",
            Enabled: "enabled",
          }),
        ),
      ).annotate({ identifier: "Tls" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Sasl: S.optional(__S(209, __c13, 1)),
          Tls: S.optional(__S(256, __c16, 0)),
          Unauthenticated: S.optional(__S(208, __c13, 0)),
        }).pipe(S.encodeKeys({ Sasl: "sasl", Tls: "tls", Unauthenticated: "unauthenticated" })),
      ).annotate({ identifier: "ClientAuthentication" });
    case 2:
      return S.suspend(() =>
        S.Struct({ DataVolumeKMSKeyId: S.optional(S.String) }).pipe(
          S.encodeKeys({ DataVolumeKMSKeyId: "dataVolumeKMSKeyId" }),
        ),
      ).annotate({ identifier: "EncryptionAtRest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ClientBroker: S.optional(S.String), InCluster: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ ClientBroker: "clientBroker", InCluster: "inCluster" }),
        ),
      ).annotate({ identifier: "EncryptionInTransit" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          EncryptionAtRest: S.optional(__S(258, __c16, 2)),
          EncryptionInTransit: S.optional(__S(259, __c16, 3)),
        }).pipe(
          S.encodeKeys({
            EncryptionAtRest: "encryptionAtRest",
            EncryptionInTransit: "encryptionInTransit",
          }),
        ),
      ).annotate({ identifier: "EncryptionInfo" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProvisionedThroughput: S.optional(__S(176, __c11, 0)),
          VolumeSize: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ProvisionedThroughput: "provisionedThroughput",
            VolumeSize: "volumeSize",
          }),
        ),
      ).annotate({ identifier: "EBSStorageInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EbsStorageInfo: S.optional(__S(272, __c17, 0)) }).pipe(
          S.encodeKeys({ EbsStorageInfo: "ebsStorageInfo" }),
        ),
      ).annotate({ identifier: "StorageInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BrokerAZDistribution: S.optional(S.String),
          ClientSubnets: S.optional(__listOf__string),
          InstanceType: S.optional(S.String),
          SecurityGroups: S.optional(__listOf__string),
          StorageInfo: S.optional(__S(273, __c17, 1)),
          ConnectivityInfo: S.optional(__S(195, __c12, 3)),
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
      ).annotate({ identifier: "BrokerNodeGroupInfo" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Revision: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Arn: "arn", Revision: "revision" }),
        ),
      ).annotate({ identifier: "ConfigurationInfo" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerNodeGroupInfo: S.optional(__S(274, __c17, 2)),
          Rebalancing: S.optional(__S(240, __c15, 0)),
          ClientAuthentication: S.optional(__S(257, __c16, 1)),
          ConfigurationInfo: S.optional(__S(288, __c18, 0)),
          EncryptionInfo: S.optional(__S(260, __c16, 4)),
          EnhancedMonitoring: S.optional(S.String),
          OpenMonitoring: S.optional(__S(226, __c14, 2)),
          KafkaVersion: S.optional(S.String),
          LoggingInfo: S.optional(__S(227, __c14, 3)),
          NumberOfBrokerNodes: S.optional(S.Number),
          StorageMode: S.optional(S.String),
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
      ).annotate({ identifier: "ProvisionedRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcConfigs: S.optional(__listOfVpcConfig),
          ClientAuthentication: S.optional(__S(323, __c20, 3)),
        }).pipe(
          S.encodeKeys({ VpcConfigs: "vpcConfigs", ClientAuthentication: "clientAuthentication" }),
        ),
      ).annotate({ identifier: "ServerlessRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          Provisioned: S.optional(__S(304, __c19, 0)),
          Serverless: S.optional(__S(305, __c19, 1)),
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
      ).annotate({ identifier: "CreateClusterV2Request" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.optional(S.String),
          ClusterName: S.optional(S.String),
          State: S.optional(S.String),
          ClusterType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ClusterArn: "clusterArn",
            ClusterName: "clusterName",
            State: "state",
            ClusterType: "clusterType",
          }),
        ),
      ).annotate({ identifier: "CreateClusterV2Response" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__listOf__string),
          SecurityGroupIds: S.optional(__listOf__string),
        }).pipe(S.encodeKeys({ SubnetIds: "subnetIds", SecurityGroupIds: "securityGroupIds" })),
      ).annotate({ identifier: "VpcConfig" });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Iam: S.optional(__S(208, __c13, 0)) }).pipe(S.encodeKeys({ Iam: "iam" })),
      ).annotate({ identifier: "ServerlessSasl" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Sasl: S.optional(__S(322, __c20, 2)) }).pipe(S.encodeKeys({ Sasl: "sasl" })),
      ).annotate({ identifier: "ServerlessClientAuthentication" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "CreateConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LatestRevision: S.optional(__S(352, __c22, 0)),
          Name: S.optional(S.String),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreationTime: "creationTime",
            LatestRevision: "latestRevision",
            Name: "name",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "CreateConfigurationResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          Revision: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            CreationTime: "creationTime",
            Description: "description",
            Revision: "revision",
          }),
        ),
      ).annotate({ identifier: "ConfigurationRevision" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmazonMskCluster: S.optional(__S(400, __c25, 0)),
          ApacheKafkaCluster: S.optional(__S(401, __c25, 1)),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          ClientAuthentication: S.optional(__S(390, __c24, 6)),
          EncryptionInTransit: S.optional(__S(391, __c24, 7)),
        }).pipe(
          S.encodeKeys({
            AmazonMskCluster: "amazonMskCluster",
            ApacheKafkaCluster: "apacheKafkaCluster",
            VpcConfig: "vpcConfig",
            ClientAuthentication: "clientAuthentication",
            EncryptionInTransit: "encryptionInTransit",
          }),
        ),
      ).annotate({ identifier: "KafkaCluster" });
    case 1:
      return S.Array(__S(368, __c23, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConsumerGroupReplication: S.optional(__S(392, __c24, 8)),
          SourceKafkaClusterArn: S.optional(S.String),
          SourceKafkaClusterId: S.optional(S.String),
          TargetCompressionType: S.optional(S.String),
          TargetKafkaClusterArn: S.optional(S.String),
          TargetKafkaClusterId: S.optional(S.String),
          TopicReplication: S.optional(__S(394, __c24, 10)),
        }).pipe(
          S.encodeKeys({
            ConsumerGroupReplication: "consumerGroupReplication",
            SourceKafkaClusterArn: "sourceKafkaClusterArn",
            SourceKafkaClusterId: "sourceKafkaClusterId",
            TargetCompressionType: "targetCompressionType",
            TargetKafkaClusterArn: "targetKafkaClusterArn",
            TargetKafkaClusterId: "targetKafkaClusterId",
            TopicReplication: "topicReplication",
          }),
        ),
      ).annotate({ identifier: "ReplicationInfo" });
    case 3:
      return S.Array(__S(370, __c23, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          KafkaClusters: S.optional(__listOfKafkaCluster),
          ReplicationInfoList: S.optional(__listOfReplicationInfo),
          ReplicatorName: S.optional(S.String),
          ServiceExecutionRoleArn: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          LogDelivery: S.optional(__S(419, __c26, 3)),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              KafkaClusters: "kafkaClusters",
              ReplicationInfoList: "replicationInfoList",
              ReplicatorName: "replicatorName",
              ServiceExecutionRoleArn: "serviceExecutionRoleArn",
              Tags: "tags",
              LogDelivery: "logDelivery",
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
      ).annotate({ identifier: "CreateReplicatorRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ReplicatorArn: S.optional(S.String),
          ReplicatorName: S.optional(S.String),
          ReplicatorState: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ReplicatorArn: "replicatorArn",
            ReplicatorName: "replicatorName",
            ReplicatorState: "replicatorState",
          }),
        ),
      ).annotate({ identifier: "CreateReplicatorResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecurityGroupIds: S.optional(__listOf__string),
          SubnetIds: S.optional(__listOf__string),
        }).pipe(S.encodeKeys({ SecurityGroupIds: "securityGroupIds", SubnetIds: "subnetIds" })),
      ).annotate({ identifier: "KafkaClusterClientVpcConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Mechanism: S.optional(S.String), SecretArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ Mechanism: "mechanism", SecretArn: "secretArn" }),
        ),
      ).annotate({ identifier: "KafkaClusterSaslScramAuthentication" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SecretArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ SecretArn: "secretArn" }),
        ),
      ).annotate({ identifier: "KafkaClusterMTLSAuthentication" });
    case 3:
      return S.suspend(() =>
        S.Struct({ TokenRequestSecretArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ TokenRequestSecretArn: "tokenRequestSecretArn" }),
        ),
      ).annotate({ identifier: "KafkaClusterOAuthClientCredentials" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Audience: S.optional(S.String),
          SigningAlgorithm: S.optional(S.String),
          TokenRequestSecretArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Audience: "audience",
            SigningAlgorithm: "signingAlgorithm",
            TokenRequestSecretArn: "tokenRequestSecretArn",
          }),
        ),
      ).annotate({ identifier: "KafkaClusterOAuthIamJwtBearer" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          TokenEndpointUrl: S.optional(S.String),
          ClientCredentials: S.optional(__S(387, __c24, 3)),
          IamJwtBearer: S.optional(__S(388, __c24, 4)),
          ClientCredentialsAssertion: S.optional(__S(388, __c24, 4)),
          TokenEndpointAuthenticationMethod: S.optional(S.String),
          Scope: S.optional(S.String),
          TokenEndpointTlsCertificateArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            TokenEndpointUrl: "tokenEndpointUrl",
            ClientCredentials: "clientCredentials",
            IamJwtBearer: "iamJwtBearer",
            ClientCredentialsAssertion: "clientCredentialsAssertion",
            TokenEndpointAuthenticationMethod: "tokenEndpointAuthenticationMethod",
            Scope: "scope",
            TokenEndpointTlsCertificateArn: "tokenEndpointTlsCertificateArn",
          }),
        ),
      ).annotate({ identifier: "KafkaClusterSaslOAuthBearerAuthentication" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          SaslScram: S.optional(__S(385, __c24, 1)),
          MTLS: S.optional(__S(386, __c24, 2)),
          SaslOAuthBearer: S.optional(__S(389, __c24, 5)),
        }).pipe(
          S.encodeKeys({
            SaslScram: "saslScram",
            MTLS: "mTLS",
            SaslOAuthBearer: "saslOAuthBearer",
          }),
        ),
      ).annotate({ identifier: "KafkaClusterClientAuthentication" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          EncryptionType: S.optional(S.String),
          RootCaCertificate: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EncryptionType: "encryptionType",
            RootCaCertificate: "rootCaCertificate",
          }),
        ),
      ).annotate({ identifier: "KafkaClusterEncryptionInTransit" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ConsumerGroupsToExclude: S.optional(__listOf__stringMax256),
          ConsumerGroupsToReplicate: S.optional(__listOf__stringMax256),
          DetectAndCopyNewConsumerGroups: S.optional(S.Boolean),
          SynchroniseConsumerGroupOffsets: S.optional(S.Boolean),
          ConsumerGroupOffsetSyncMode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ConsumerGroupsToExclude: "consumerGroupsToExclude",
            ConsumerGroupsToReplicate: "consumerGroupsToReplicate",
            DetectAndCopyNewConsumerGroups: "detectAndCopyNewConsumerGroups",
            SynchroniseConsumerGroupOffsets: "synchroniseConsumerGroupOffsets",
            ConsumerGroupOffsetSyncMode: "consumerGroupOffsetSyncMode",
          }),
        ),
      ).annotate({ identifier: "ConsumerGroupReplication" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String) }).pipe(S.encodeKeys({ Type: "type" })),
      ).annotate({ identifier: "ReplicationStartingPosition" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          CopyAccessControlListsForTopics: S.optional(S.Boolean),
          CopyTopicConfigurations: S.optional(S.Boolean),
          DetectAndCopyNewTopics: S.optional(S.Boolean),
          StartingPosition: S.optional(__S(393, __c24, 9)),
          TopicNameConfiguration: S.optional(__S(393, __c24, 9)),
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
      ).annotate({ identifier: "TopicReplication" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MskClusterArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ MskClusterArn: "mskClusterArn" }),
        ),
      ).annotate({ identifier: "AmazonMskCluster" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApacheKafkaClusterId: S.optional(S.String),
          BootstrapBrokerString: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApacheKafkaClusterId: "apacheKafkaClusterId",
            BootstrapBrokerString: "bootstrapBrokerString",
          }),
        ),
      ).annotate({ identifier: "ApacheKafkaCluster" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), DeliveryStream: S.optional(S.String) }).pipe(
          S.encodeKeys({ Enabled: "enabled", DeliveryStream: "deliveryStream" }),
        ),
      ).annotate({ identifier: "ReplicatorFirehose" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          Bucket: S.optional(S.String),
          Prefix: S.optional(S.String),
        }).pipe(S.encodeKeys({ Enabled: "enabled", Bucket: "bucket", Prefix: "prefix" })),
      ).annotate({ identifier: "ReplicatorS3" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogs: S.optional(__S(96, __c6, 0)),
          Firehose: S.optional(__S(416, __c26, 0)),
          S3: S.optional(__S(417, __c26, 1)),
        }).pipe(S.encodeKeys({ CloudWatchLogs: "cloudWatchLogs", Firehose: "firehose", S3: "s3" })),
      ).annotate({ identifier: "ReplicatorLogDelivery" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ReplicatorLogDelivery: S.optional(__S(418, __c26, 2)) }).pipe(
          S.encodeKeys({ ReplicatorLogDelivery: "replicatorLogDelivery" }),
        ),
      ).annotate({ identifier: "LogDelivery" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "CreateTopicRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TopicArn: S.optional(S.String),
          TopicName: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(S.encodeKeys({ TopicArn: "topicArn", TopicName: "topicName", Status: "status" })),
      ).annotate({ identifier: "CreateTopicResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "CreateVpcConnectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcConnectionArn: S.optional(S.String),
          State: S.optional(S.String),
          Authentication: S.optional(S.String),
          VpcId: S.optional(S.String),
          ClientSubnets: S.optional(__listOf__string),
          SecurityGroups: S.optional(__listOf__string),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
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
      ).annotate({ identifier: "CreateVpcConnectionResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/clusters/{ClusterArn}/channels/{ChannelArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterArn: S.optional(S.String), State: S.optional(S.String) }).pipe(
          S.encodeKeys({ ClusterArn: "clusterArn", State: "state" }),
        ),
      ).annotate({ identifier: "DeleteClusterResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteClusterPolicyRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteClusterPolicyResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), State: S.optional(S.String) }).pipe(
          S.encodeKeys({ Arn: "arn", State: "state" }),
        ),
      ).annotate({ identifier: "DeleteConfigurationResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CurrentVersion: S.optional(S.String).pipe(T.HttpQuery("currentVersion")),
          ReplicatorArn: S.String.pipe(T.HttpLabel("ReplicatorArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/replication/v1/replicators/{ReplicatorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteReplicatorRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicatorArn: S.optional(S.String),
          ReplicatorState: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ ReplicatorArn: "replicatorArn", ReplicatorState: "replicatorState" }),
        ),
      ).annotate({ identifier: "DeleteReplicatorResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          TopicName: S.String.pipe(T.HttpLabel("TopicName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/clusters/{ClusterArn}/topics/{TopicName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTopicRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteVpcConnectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VpcConnectionArn: S.optional(S.String), State: S.optional(S.String) }).pipe(
          S.encodeKeys({ VpcConnectionArn: "vpcConnectionArn", State: "state" }),
        ),
      ).annotate({ identifier: "DeleteVpcConnectionResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/channels/{ChannelArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          ChannelName: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(144, __c9, 0)),
          IcebergDestinationConfiguration: S.optional(__S(154, __c9, 10)),
          S3DestinationConfiguration: S.optional(__S(156, __c9, 12)),
          Status: S.optional(S.String),
          DestinationType: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TopicConfigurationList: S.optional(__listOfTopicConfiguration),
          LoggingInfo: S.optional(__S(114, __c7, 2)),
          StateInfo: S.optional(__S(640, __c40, 0)),
          ClusterOperationArn: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        }).pipe(
          S.encodeKeys({
            ChannelArn: "channelArn",
            ChannelName: "channelName",
            EncryptionConfiguration: "encryptionConfiguration",
            IcebergDestinationConfiguration: "icebergDestinationConfiguration",
            S3DestinationConfiguration: "s3DestinationConfiguration",
            Status: "status",
            DestinationType: "destinationType",
            CreationTime: "creationTime",
            TopicConfigurationList: "topicConfigurationList",
            LoggingInfo: "loggingInfo",
            StateInfo: "stateInfo",
            ClusterOperationArn: "clusterOperationArn",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "DescribeChannelResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }).pipe(
          S.encodeKeys({ Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "ChannelStateInfo" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DescribeClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterInfo: S.optional(__S(688, __c43, 0)) }).pipe(
          S.encodeKeys({ ClusterInfo: "clusterInfo" }),
        ),
      ).annotate({ identifier: "DescribeClusterResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "BrokerSoftwareInfo" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActiveOperationArn: S.optional(S.String),
          BrokerNodeGroupInfo: S.optional(__S(274, __c17, 2)),
          Rebalancing: S.optional(__S(240, __c15, 0)),
          ClientAuthentication: S.optional(__S(257, __c16, 1)),
          ClusterArn: S.optional(S.String),
          ClusterName: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CurrentBrokerSoftwareInfo: S.optional(__S(672, __c42, 0)),
          CurrentVersion: S.optional(S.String),
          EncryptionInfo: S.optional(__S(260, __c16, 4)),
          EnhancedMonitoring: S.optional(S.String),
          OpenMonitoring: S.optional(__S(226, __c14, 2)),
          LoggingInfo: S.optional(__S(227, __c14, 3)),
          NumberOfBrokerNodes: S.optional(S.Number),
          State: S.optional(S.String),
          StateInfo: S.optional(__S(640, __c40, 0)),
          Tags: S.optional(__mapOf__string),
          ZookeeperConnectString: S.optional(S.String),
          ZookeeperConnectStringTls: S.optional(S.String),
          StorageMode: S.optional(S.String),
          CustomerActionStatus: S.optional(S.String),
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
      ).annotate({ identifier: "ClusterInfo" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterOperationArn: S.String.pipe(T.HttpLabel("ClusterOperationArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/operations/{ClusterOperationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeClusterOperationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterOperationInfo: S.optional(__S(768, __c48, 0)) }).pipe(
          S.encodeKeys({ ClusterOperationInfo: "clusterOperationInfo" }),
        ),
      ).annotate({ identifier: "DescribeClusterOperationResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorString: S.optional(S.String) }).pipe(
          S.encodeKeys({ ErrorCode: "errorCode", ErrorString: "errorString" }),
        ),
      ).annotate({ identifier: "ErrorInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({ StepStatus: S.optional(S.String) }).pipe(
          S.encodeKeys({ StepStatus: "stepStatus" }),
        ),
      ).annotate({ identifier: "ClusterOperationStepInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({ StepInfo: S.optional(__S(737, __c46, 1)), StepName: S.optional(S.String) }).pipe(
          S.encodeKeys({ StepInfo: "stepInfo", StepName: "stepName" }),
        ),
      ).annotate({ identifier: "ClusterOperationStep" });
    case 3:
      return S.Array(__S(738, __c46, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          CreatedBrokerIds: S.optional(__listOf__double),
          DeletedBrokerIds: S.optional(__listOf__double),
        }).pipe(
          S.encodeKeys({
            CreatedBrokerIds: "createdBrokerIds",
            DeletedBrokerIds: "deletedBrokerIds",
          }),
        ),
      ).annotate({ identifier: "BrokerCountUpdateInfo" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          BrokerEBSVolumeInfo: S.optional(__listOfBrokerEBSVolumeInfo),
          ConfigurationInfo: S.optional(__S(288, __c18, 0)),
          NumberOfBrokerNodes: S.optional(S.Number),
          EnhancedMonitoring: S.optional(S.String),
          OpenMonitoring: S.optional(__S(226, __c14, 2)),
          ZookeeperAccess: S.optional(__S(208, __c13, 0)),
          KafkaVersion: S.optional(S.String),
          LoggingInfo: S.optional(__S(227, __c14, 3)),
          InstanceType: S.optional(S.String),
          ClientAuthentication: S.optional(__S(257, __c16, 1)),
          EncryptionInfo: S.optional(__S(260, __c16, 4)),
          ConnectivityInfo: S.optional(__S(195, __c12, 3)),
          StorageMode: S.optional(S.String),
          BrokerCountUpdateInfo: S.optional(__S(740, __c46, 4)),
          Rebalancing: S.optional(__S(240, __c15, 0)),
        }).pipe(
          S.encodeKeys({
            BrokerEBSVolumeInfo: "brokerEBSVolumeInfo",
            ConfigurationInfo: "configurationInfo",
            NumberOfBrokerNodes: "numberOfBrokerNodes",
            EnhancedMonitoring: "enhancedMonitoring",
            OpenMonitoring: "openMonitoring",
            ZookeeperAccess: "zookeeperAccess",
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
      ).annotate({ identifier: "MutableClusterInfo" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), PrincipalId: S.optional(S.String) }).pipe(
          S.encodeKeys({ Type: "type", PrincipalId: "principalId" }),
        ),
      ).annotate({ identifier: "UserIdentity" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          VpcConnectionArn: S.optional(S.String),
          Owner: S.optional(S.String),
          UserIdentity: S.optional(__S(742, __c46, 6)),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(
          S.encodeKeys({
            VpcConnectionArn: "vpcConnectionArn",
            Owner: "owner",
            UserIdentity: "userIdentity",
            CreationTime: "creationTime",
          }),
        ),
      ).annotate({ identifier: "VpcConnectionInfo" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KafkaBrokerNodeId: S.optional(S.String),
          ProvisionedThroughput: S.optional(__S(176, __c11, 0)),
          VolumeSizeGB: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            KafkaBrokerNodeId: "kafkaBrokerNodeId",
            ProvisionedThroughput: "provisionedThroughput",
            VolumeSizeGB: "volumeSizeGB",
          }),
        ),
      ).annotate({ identifier: "BrokerEBSVolumeInfo" });
    case 1:
      return S.Array(__S(752, __c47, 0));
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestId: S.optional(S.String),
          ClusterArn: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ErrorInfo: S.optional(__S(736, __c46, 0)),
          OperationArn: S.optional(S.String),
          OperationState: S.optional(S.String),
          OperationSteps: S.optional(__listOfClusterOperationStep),
          OperationType: S.optional(S.String),
          SourceClusterInfo: S.optional(__S(741, __c46, 5)),
          TargetClusterInfo: S.optional(__S(741, __c46, 5)),
          VpcConnectionInfo: S.optional(__S(743, __c46, 7)),
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
      ).annotate({ identifier: "ClusterOperationInfo" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterOperationArn: S.String.pipe(T.HttpLabel("ClusterOperationArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/api/v2/operations/{ClusterOperationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeClusterOperationV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OperationSteps: S.optional(__listOfClusterOperationStep),
          SourceClusterInfo: S.optional(__S(741, __c46, 5)),
          TargetClusterInfo: S.optional(__S(741, __c46, 5)),
          VpcConnectionInfo: S.optional(__S(743, __c46, 7)),
        }).pipe(
          S.encodeKeys({
            OperationSteps: "operationSteps",
            SourceClusterInfo: "sourceClusterInfo",
            TargetClusterInfo: "targetClusterInfo",
            VpcConnectionInfo: "vpcConnectionInfo",
          }),
        ),
      ).annotate({ identifier: "ClusterOperationV2Provisioned" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Owner: S.optional(S.String),
          UserIdentity: S.optional(__S(742, __c46, 6)),
          VpcConnectionArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CreationTime: "creationTime",
            Owner: "owner",
            UserIdentity: "userIdentity",
            VpcConnectionArn: "vpcConnectionArn",
          }),
        ),
      ).annotate({ identifier: "VpcConnectionInfoServerless" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SourceClusterInfo: S.optional(__S(800, __c50, 0)),
          TargetClusterInfo: S.optional(__S(800, __c50, 0)),
          VpcConnectionInfo: S.optional(__S(786, __c49, 2)),
        }).pipe(
          S.encodeKeys({
            SourceClusterInfo: "sourceClusterInfo",
            TargetClusterInfo: "targetClusterInfo",
            VpcConnectionInfo: "vpcConnectionInfo",
          }),
        ),
      ).annotate({ identifier: "ClusterOperationV2Serverless" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.optional(S.String),
          ClusterType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ErrorInfo: S.optional(__S(736, __c46, 0)),
          OperationArn: S.optional(S.String),
          OperationState: S.optional(S.String),
          OperationType: S.optional(S.String),
          Provisioned: S.optional(__S(785, __c49, 1)),
          Serverless: S.optional(__S(787, __c49, 3)),
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
      ).annotate({ identifier: "ClusterOperationV2" });
    case 5:
      return S.suspend(() =>
        S.Struct({ ClusterOperationInfo: S.optional(__S(788, __c49, 4)) }).pipe(
          S.encodeKeys({ ClusterOperationInfo: "clusterOperationInfo" }),
        ),
      ).annotate({ identifier: "DescribeClusterOperationV2Response" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NetworkType: S.optional(S.String) }).pipe(
          S.encodeKeys({ NetworkType: "networkType" }),
        ),
      ).annotate({ identifier: "ServerlessConnectivityInfo" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DescribeClusterV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterInfo: S.optional(__S(834, __c52, 2)) }).pipe(
          S.encodeKeys({ ClusterInfo: "clusterInfo" }),
        ),
      ).annotate({ identifier: "DescribeClusterV2Response" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerNodeGroupInfo: S.optional(__S(274, __c17, 2)),
          Rebalancing: S.optional(__S(240, __c15, 0)),
          CurrentBrokerSoftwareInfo: S.optional(__S(672, __c42, 0)),
          ClientAuthentication: S.optional(__S(257, __c16, 1)),
          EncryptionInfo: S.optional(__S(260, __c16, 4)),
          EnhancedMonitoring: S.optional(S.String),
          OpenMonitoring: S.optional(__S(226, __c14, 2)),
          LoggingInfo: S.optional(__S(227, __c14, 3)),
          NumberOfBrokerNodes: S.optional(S.Number),
          ZookeeperConnectString: S.optional(S.String),
          ZookeeperConnectStringTls: S.optional(S.String),
          StorageMode: S.optional(S.String),
          CustomerActionStatus: S.optional(S.String),
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
      ).annotate({ identifier: "Provisioned" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcConfigs: S.optional(__listOfVpcConfig),
          ClientAuthentication: S.optional(__S(323, __c20, 3)),
          ConnectivityInfo: S.optional(__S(800, __c50, 0)),
        }).pipe(
          S.encodeKeys({
            VpcConfigs: "vpcConfigs",
            ClientAuthentication: "clientAuthentication",
            ConnectivityInfo: "connectivityInfo",
          }),
        ),
      ).annotate({ identifier: "Serverless" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ActiveOperationArn: S.optional(S.String),
          ClusterType: S.optional(S.String),
          ClusterArn: S.optional(S.String),
          ClusterName: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CurrentVersion: S.optional(S.String),
          State: S.optional(S.String),
          StateInfo: S.optional(__S(640, __c40, 0)),
          Tags: S.optional(__mapOf__string),
          Provisioned: S.optional(__S(832, __c52, 0)),
          Serverless: S.optional(__S(833, __c52, 1)),
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
      ).annotate({ identifier: "Cluster" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DescribeConfigurationRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          KafkaVersions: S.optional(__listOf__string),
          LatestRevision: S.optional(__S(352, __c22, 0)),
          Name: S.optional(S.String),
          State: S.optional(S.String),
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
      ).annotate({ identifier: "DescribeConfigurationResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Revision: S.Number.pipe(T.HttpLabel("Revision")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/configurations/{Arn}/revisions/{Revision}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeConfigurationRevisionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
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
      ).annotate({ identifier: "DescribeConfigurationRevisionResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReplicatorArn: S.String.pipe(T.HttpLabel("ReplicatorArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/replication/v1/replicators/{ReplicatorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReplicatorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AmazonMskCluster: S.optional(__S(400, __c25, 0)),
          ApacheKafkaCluster: S.optional(__S(401, __c25, 1)),
          KafkaClusterAlias: S.optional(S.String),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          ClientAuthentication: S.optional(__S(390, __c24, 6)),
          EncryptionInTransit: S.optional(__S(391, __c24, 7)),
        }).pipe(
          S.encodeKeys({
            AmazonMskCluster: "amazonMskCluster",
            ApacheKafkaCluster: "apacheKafkaCluster",
            KafkaClusterAlias: "kafkaClusterAlias",
            VpcConfig: "vpcConfig",
            ClientAuthentication: "clientAuthentication",
            EncryptionInTransit: "encryptionInTransit",
          }),
        ),
      ).annotate({ identifier: "KafkaClusterDescription" });
    case 2:
      return S.Array(__S(897, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConsumerGroupReplication: S.optional(__S(392, __c24, 8)),
          SourceKafkaClusterAlias: S.optional(S.String),
          TargetCompressionType: S.optional(S.String),
          TargetKafkaClusterAlias: S.optional(S.String),
          TopicReplication: S.optional(__S(394, __c24, 10)),
        }).pipe(
          S.encodeKeys({
            ConsumerGroupReplication: "consumerGroupReplication",
            SourceKafkaClusterAlias: "sourceKafkaClusterAlias",
            TargetCompressionType: "targetCompressionType",
            TargetKafkaClusterAlias: "targetKafkaClusterAlias",
            TopicReplication: "topicReplication",
          }),
        ),
      ).annotate({ identifier: "ReplicationInfoDescription" });
    case 4:
      return S.Array(__S(899, __c56, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CurrentVersion: S.optional(S.String),
          IsReplicatorReference: S.optional(S.Boolean),
          KafkaClusters: S.optional(__listOfKafkaClusterDescription),
          ReplicationInfoList: S.optional(__listOfReplicationInfoDescription),
          ReplicatorArn: S.optional(S.String),
          ReplicatorDescription: S.optional(S.String),
          ReplicatorName: S.optional(S.String),
          ReplicatorResourceArn: S.optional(S.String),
          ReplicatorState: S.optional(S.String),
          ServiceExecutionRoleArn: S.optional(S.String),
          StateInfo: S.optional(__S(640, __c40, 0)),
          Tags: S.optional(__mapOf__string),
          LogDelivery: S.optional(__S(419, __c26, 3)),
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
            LogDelivery: "logDelivery",
          }),
        ),
      ).annotate({ identifier: "DescribeReplicatorResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          TopicName: S.String.pipe(T.HttpLabel("TopicName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/topics/{TopicName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeTopicRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TopicArn: S.optional(S.String),
          TopicName: S.optional(S.String),
          ReplicationFactor: S.optional(S.Number),
          PartitionCount: S.optional(S.Number),
          Configs: S.optional(S.String),
          Status: S.optional(S.String),
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
      ).annotate({ identifier: "DescribeTopicResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DescribeTopicPartitionsRequest" });
    case 1:
      return S.suspend(() =>
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
      ).annotate({ identifier: "TopicPartitionInfo" });
    case 2:
      return S.Array(__S(929, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Partitions: S.optional(__listOfTopicPartitionInfo),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Partitions: "partitions", NextToken: "nextToken" })),
      ).annotate({ identifier: "DescribeTopicPartitionsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DescribeVpcConnectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcConnectionArn: S.optional(S.String),
          TargetClusterArn: S.optional(S.String),
          State: S.optional(S.String),
          Authentication: S.optional(S.String),
          VpcId: S.optional(S.String),
          Subnets: S.optional(__listOf__string),
          SecurityGroups: S.optional(__listOf__string),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
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
      ).annotate({ identifier: "DescribeVpcConnectionResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/bootstrap-brokers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBootstrapBrokersRequest" });
    case 1:
      return S.suspend(() =>
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
            BootstrapBrokerStringPublicSaslScram: "bootstrapBrokerStringPublicSaslScram",
            BootstrapBrokerStringPublicSaslIam: "bootstrapBrokerStringPublicSaslIam",
            BootstrapBrokerStringVpcConnectivityTls: "bootstrapBrokerStringVpcConnectivityTls",
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
      ).annotate({ identifier: "GetBootstrapBrokersResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetClusterPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CurrentVersion: S.optional(S.String), Policy: S.optional(S.String) }).pipe(
          S.encodeKeys({ CurrentVersion: "currentVersion", Policy: "policy" }),
        ),
      ).annotate({ identifier: "GetClusterPolicyResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterArn: S.optional(S.String).pipe(T.HttpQuery("clusterArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/compatible-kafka-versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCompatibleKafkaVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceVersion: S.optional(S.String),
          TargetVersions: S.optional(__listOf__string),
        }).pipe(S.encodeKeys({ SourceVersion: "sourceVersion", TargetVersions: "targetVersions" })),
      ).annotate({ identifier: "CompatibleKafkaVersion" });
    case 2:
      return S.Array(__S(993, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ CompatibleKafkaVersions: S.optional(__listOfCompatibleKafkaVersion) }).pipe(
          S.encodeKeys({ CompatibleKafkaVersions: "compatibleKafkaVersions" }),
        ),
      ).annotate({ identifier: "GetCompatibleKafkaVersionsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          TopicNameFilter: S.optional(S.String).pipe(T.HttpQuery("topicNameFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/channels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          ChannelName: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DestinationType: S.optional(S.String),
          ClusterOperationArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChannelArn: "channelArn",
            ChannelName: "channelName",
            Status: "status",
            CreationTime: "creationTime",
            DestinationType: "destinationType",
            ClusterOperationArn: "clusterOperationArn",
          }),
        ),
      ).annotate({ identifier: "ChannelInfo" });
    case 2:
      return S.Array(__S(1009, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(__listOfChannelInfo),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Channels: "channels", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListChannelsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/clusters/{ClusterArn}/client-vpc-connections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListClientVpcConnectionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Authentication: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          State: S.optional(S.String),
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
      ).annotate({ identifier: "ClientVpcConnection" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClientVpcConnections: S.optional(__listOfClientVpcConnection),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ ClientVpcConnections: "clientVpcConnections", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListClientVpcConnectionsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListClusterOperationsRequest" });
    case 1:
      return S.Array(__S(768, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterOperationInfoList: S.optional(__listOfClusterOperationInfo),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ClusterOperationInfoList: "clusterOperationInfoList",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListClusterOperationsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/api/v2/clusters/{ClusterArn}/operations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListClusterOperationsV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.optional(S.String),
          ClusterType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
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
      ).annotate({ identifier: "ClusterOperationV2Summary" });
    case 2:
      return S.Array(__S(1057, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClusterOperationInfoList: S.optional(__listOfClusterOperationV2Summary),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ClusterOperationInfoList: "clusterOperationInfoList",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListClusterOperationsV2Response" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterNameFilter: S.optional(S.String).pipe(T.HttpQuery("clusterNameFilter")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/clusters" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListClustersRequest" });
    case 1:
      return S.Array(__S(688, __c43, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterInfoList: S.optional(__listOfClusterInfo),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ ClusterInfoList: "clusterInfoList", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListClustersResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterNameFilter: S.optional(S.String).pipe(T.HttpQuery("clusterNameFilter")),
          ClusterTypeFilter: S.optional(S.String).pipe(T.HttpQuery("clusterTypeFilter")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/api/v2/clusters" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListClustersV2Request" });
    case 1:
      return S.Array(__S(834, __c52, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterInfoList: S.optional(__listOfCluster),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ ClusterInfoList: "clusterInfoList", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListClustersV2Response" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListConfigurationRevisionsRequest" });
    case 1:
      return S.Array(__S(352, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Revisions: S.optional(__listOfConfigurationRevision),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Revisions: "revisions" })),
      ).annotate({ identifier: "ListConfigurationRevisionsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/configurations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConfigurationsRequest" });
    case 1:
      return S.Array(__S(864, __c54, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Configurations: S.optional(__listOfConfiguration),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Configurations: "configurations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListConfigurationsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/kafka-versions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListKafkaVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Version: S.optional(S.String), Status: S.optional(S.String) }).pipe(
          S.encodeKeys({ Version: "version", Status: "status" }),
        ),
      ).annotate({ identifier: "KafkaVersion" });
    case 2:
      return S.Array(__S(1137, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          KafkaVersions: S.optional(__listOfKafkaVersion),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ KafkaVersions: "kafkaVersions", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListKafkaVersionsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListNodesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AttachedENIId: S.optional(S.String),
          BrokerId: S.optional(S.Number),
          ClientSubnet: S.optional(S.String),
          ClientVpcIpAddress: S.optional(S.String),
          CurrentBrokerSoftwareInfo: S.optional(__S(672, __c42, 0)),
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
      ).annotate({ identifier: "BrokerNodeInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Endpoints: S.optional(__listOf__string) }).pipe(
          S.encodeKeys({ Endpoints: "endpoints" }),
        ),
      ).annotate({ identifier: "ControllerNodeInfo" });
    case 3:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ZookeeperNodeInfo" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AddedToClusterTime: S.optional(S.String),
          BrokerNodeInfo: S.optional(__S(1153, __c72, 1)),
          ControllerNodeInfo: S.optional(__S(1154, __c72, 2)),
          InstanceType: S.optional(S.String),
          NodeARN: S.optional(S.String),
          NodeType: S.optional(S.String),
          ZookeeperNodeInfo: S.optional(__S(1155, __c72, 3)),
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
      ).annotate({ identifier: "NodeInfo" });
    case 5:
      return S.Array(__S(1156, __c72, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          NodeInfoList: S.optional(__listOfNodeInfo),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", NodeInfoList: "nodeInfoList" })),
      ).annotate({ identifier: "ListNodesResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ReplicatorNameFilter: S.optional(S.String).pipe(T.HttpQuery("replicatorNameFilter")),
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
      ).annotate({ identifier: "ListReplicatorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AmazonMskCluster: S.optional(__S(400, __c25, 0)),
          ApacheKafkaCluster: S.optional(__S(401, __c25, 1)),
          KafkaClusterAlias: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AmazonMskCluster: "amazonMskCluster",
            ApacheKafkaCluster: "apacheKafkaCluster",
            KafkaClusterAlias: "kafkaClusterAlias",
          }),
        ),
      ).annotate({ identifier: "KafkaClusterSummary" });
    case 2:
      return S.Array(__S(1169, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SourceKafkaClusterAlias: S.optional(S.String),
          TargetKafkaClusterAlias: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            SourceKafkaClusterAlias: "sourceKafkaClusterAlias",
            TargetKafkaClusterAlias: "targetKafkaClusterAlias",
          }),
        ),
      ).annotate({ identifier: "ReplicationInfoSummary" });
    case 4:
      return S.Array(__S(1171, __c73, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CurrentVersion: S.optional(S.String),
          IsReplicatorReference: S.optional(S.Boolean),
          KafkaClustersSummary: S.optional(__listOfKafkaClusterSummary),
          ReplicationInfoSummaryList: S.optional(__listOfReplicationInfoSummary),
          ReplicatorArn: S.optional(S.String),
          ReplicatorName: S.optional(S.String),
          ReplicatorResourceArn: S.optional(S.String),
          ReplicatorState: S.optional(S.String),
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
      ).annotate({ identifier: "ReplicatorSummary" });
    case 6:
      return S.Array(__S(1173, __c73, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Replicators: S.optional(__listOfReplicatorSummary),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Replicators: "replicators" })),
      ).annotate({ identifier: "ListReplicatorsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListScramSecretsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SecretArnList: S.optional(__listOf__string),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", SecretArnList: "secretArnList" })),
      ).annotate({ identifier: "ListScramSecretsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListTopicsRequest" });
    case 1:
      return S.suspend(() =>
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
      ).annotate({ identifier: "TopicInfo" });
    case 2:
      return S.Array(__S(1217, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Topics: S.optional(__listOfTopicInfo), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Topics: "topics", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListTopicsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListVpcConnectionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcConnectionArn: S.optional(S.String),
          TargetClusterArn: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Authentication: S.optional(S.String),
          VpcId: S.optional(S.String),
          State: S.optional(S.String),
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
      ).annotate({ identifier: "VpcConnection" });
    case 2:
      return S.Array(__S(1233, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          VpcConnections: S.optional(__listOfVpcConnection),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ VpcConnections: "vpcConnections", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListVpcConnectionsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "PutClusterPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CurrentVersion: S.optional(S.String) }).pipe(
          S.encodeKeys({ CurrentVersion: "currentVersion" }),
        ),
      ).annotate({ identifier: "PutClusterPolicyResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerIds: S.optional(__listOf__string),
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
        })
          .pipe(S.encodeKeys({ BrokerIds: "brokerIds" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/reboot-broker" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "RebootBrokerRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.optional(S.String),
          ClusterOperationArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ ClusterArn: "clusterArn", ClusterOperationArn: "clusterOperationArn" }),
        ),
      ).annotate({ identifier: "RebootBrokerResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          VpcConnectionArn: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ VpcConnectionArn: "vpcConnectionArn" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/client-vpc-connection" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "RejectClientVpcConnectionRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "UpdateBrokerCountRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
              T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/nodes/storage" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBrokerStorageRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "UpdateBrokerTypeRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataFreshnessInSeconds: S.optional(S.Number) }).pipe(
          S.encodeKeys({ DataFreshnessInSeconds: "dataFreshnessInSeconds" }),
        ),
      ).annotate({ identifier: "IcebergDestinationUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          IcebergDestinationUpdate: S.optional(__S(1392, __c87, 0)),
          S3DestinationUpdate: S.optional(__S(1392, __c87, 0)),
        })
          .pipe(
            S.encodeKeys({
              IcebergDestinationUpdate: "icebergDestinationUpdate",
              S3DestinationUpdate: "s3DestinationUpdate",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/channels/{ChannelArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateChannelRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          ConfigurationInfo: S.optional(__S(288, __c18, 0)),
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
              T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/configuration" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateClusterConfigurationRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          ConfigurationInfo: S.optional(__S(288, __c18, 0)),
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
      ).annotate({ identifier: "UpdateClusterKafkaVersionRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Description: S.optional(S.String),
          ServerProperties: S.optional(T.Blob),
        })
          .pipe(S.encodeKeys({ Description: "description", ServerProperties: "serverProperties" }))
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
      ).annotate({ identifier: "UpdateConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          LatestRevision: S.optional(__S(352, __c22, 0)),
        }).pipe(S.encodeKeys({ Arn: "arn", LatestRevision: "latestRevision" })),
      ).annotate({ identifier: "UpdateConfigurationResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          ConnectivityInfo: S.optional(__S(195, __c12, 3)),
          CurrentVersion: S.optional(S.String),
          ZookeeperAccess: S.optional(__S(208, __c13, 0)),
        })
          .pipe(
            S.encodeKeys({
              ConnectivityInfo: "connectivityInfo",
              CurrentVersion: "currentVersion",
              ZookeeperAccess: "zookeeperAccess",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/connectivity" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateConnectivityRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          CurrentVersion: S.optional(S.String),
          EnhancedMonitoring: S.optional(S.String),
          OpenMonitoring: S.optional(__S(226, __c14, 2)),
          LoggingInfo: S.optional(__S(227, __c14, 3)),
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
      ).annotate({ identifier: "UpdateMonitoringRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          CurrentVersion: S.optional(S.String),
          Rebalancing: S.optional(__S(240, __c15, 0)),
        })
          .pipe(S.encodeKeys({ CurrentVersion: "currentVersion", Rebalancing: "rebalancing" }))
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
      ).annotate({ identifier: "UpdateRebalancingRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ConsumerGroupReplicationUpdate" });
    case 1:
      return S.suspend(() =>
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
      ).annotate({ identifier: "TopicReplicationUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConsumerGroupReplication: S.optional(__S(1504, __c94, 0)),
          CurrentVersion: S.optional(S.String),
          ReplicatorArn: S.String.pipe(T.HttpLabel("ReplicatorArn")),
          SourceKafkaClusterArn: S.optional(S.String),
          SourceKafkaClusterId: S.optional(S.String),
          TargetKafkaClusterArn: S.optional(S.String),
          TargetKafkaClusterId: S.optional(S.String),
          TopicReplication: S.optional(__S(1505, __c94, 1)),
          LogDelivery: S.optional(__S(419, __c26, 3)),
        })
          .pipe(
            S.encodeKeys({
              ConsumerGroupReplication: "consumerGroupReplication",
              CurrentVersion: "currentVersion",
              SourceKafkaClusterArn: "sourceKafkaClusterArn",
              SourceKafkaClusterId: "sourceKafkaClusterId",
              TargetKafkaClusterArn: "targetKafkaClusterArn",
              TargetKafkaClusterId: "targetKafkaClusterId",
              TopicReplication: "topicReplication",
              LogDelivery: "logDelivery",
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
      ).annotate({ identifier: "UpdateReplicationInfoRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientAuthentication: S.optional(__S(257, __c16, 1)),
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          CurrentVersion: S.optional(S.String),
          EncryptionInfo: S.optional(__S(260, __c16, 4)),
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
      ).annotate({ identifier: "UpdateSecurityRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          CurrentVersion: S.optional(S.String),
          ProvisionedThroughput: S.optional(__S(176, __c11, 0)),
          StorageMode: S.optional(S.String),
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
      ).annotate({ identifier: "UpdateStorageRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.String.pipe(T.HttpLabel("ClusterArn")),
          TopicName: S.String.pipe(T.HttpLabel("TopicName")),
          Configs: S.optional(S.String),
          PartitionCount: S.optional(S.Number),
        })
          .pipe(S.encodeKeys({ Configs: "configs", PartitionCount: "partitionCount" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/clusters/{ClusterArn}/topics/{TopicName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateTopicRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
