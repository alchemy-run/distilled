import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Firehose",
  target: "Firehose_20150804",
  version: "2015-08-04",
  sigv4: "firehose",
  protocol: awsJson1_1Protocol,
  xmlns: "http://firehose.amazonaws.com/doc/2015-08-04",
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
                `https://firehose-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://firehose-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://firehose.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://firehose.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentModificationException")<{
    readonly message?: string;
  }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArgumentException")<{
    readonly message?: string;
  }> {}
export class InvalidKMSResourceException
  extends /*@__PURE__*/ TE.TaggedError("InvalidKMSResourceException")<{
    readonly code?: string;
    readonly message?: string;
  }> {}
export class InvalidSourceException
  extends /*@__PURE__*/ TE.TaggedError("InvalidSourceException")<{
    readonly code?: string;
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export type DeliveryStreamName = string;
export type DeliveryStreamType =
  | "DirectPut"
  | "KinesisStreamAsSource"
  | "MSKAsSource"
  | "DatabaseAsSource"
  | (string & {});
export type ThroughputHintInMBs = number;
export interface DirectPutSourceConfiguration {
  ThroughputHintInMBs: number;
}
export type KinesisStreamARN = string;
export type RoleARN = string;
export interface KinesisStreamSourceConfiguration {
  KinesisStreamARN: string;
  RoleARN: string;
}
export type AWSKMSKeyARNForSSE = string;
export type KeyType = "AWS_OWNED_CMK" | "CUSTOMER_MANAGED_CMK" | (string & {});
export interface DeliveryStreamEncryptionConfigurationInput {
  KeyARN?: string;
  KeyType: KeyType;
}
export type BucketARN = string;
export type Prefix = string;
export type ErrorOutputPrefix = string;
export type SizeInMBs = number;
export type IntervalInSeconds = number;
export interface BufferingHints {
  SizeInMBs?: number;
  IntervalInSeconds?: number;
}
export type CompressionFormat =
  | "UNCOMPRESSED"
  | "GZIP"
  | "ZIP"
  | "Snappy"
  | "HADOOP_SNAPPY"
  | (string & {});
export type NoEncryptionConfig = "NoEncryption" | (string & {});
export type AWSKMSKeyARN = string;
export interface KMSEncryptionConfig {
  AWSKMSKeyARN: string;
}
export interface EncryptionConfiguration {
  NoEncryptionConfig?: NoEncryptionConfig;
  KMSEncryptionConfig?: KMSEncryptionConfig;
}
export type LogGroupName = string;
export type LogStreamName = string;
export interface CloudWatchLoggingOptions {
  Enabled?: boolean;
  LogGroupName?: string;
  LogStreamName?: string;
}
export interface S3DestinationConfiguration {
  RoleARN: string;
  BucketARN: string;
  Prefix?: string;
  ErrorOutputPrefix?: string;
  BufferingHints?: BufferingHints;
  CompressionFormat?: CompressionFormat;
  EncryptionConfiguration?: EncryptionConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
}
export type ProcessorType =
  | "RecordDeAggregation"
  | "Decompression"
  | "CloudWatchLogProcessing"
  | "Lambda"
  | "MetadataExtraction"
  | "AppendDelimiterToRecord"
  | (string & {});
export type ProcessorParameterName =
  | "LambdaArn"
  | "NumberOfRetries"
  | "MetadataExtractionQuery"
  | "JsonParsingEngine"
  | "RoleArn"
  | "BufferSizeInMBs"
  | "BufferIntervalInSeconds"
  | "SubRecordType"
  | "Delimiter"
  | "CompressionFormat"
  | "DataMessageExtraction"
  | (string & {});
export type ProcessorParameterValue = string;
export interface ProcessorParameter {
  ParameterName: ProcessorParameterName;
  ParameterValue: string;
}
export type ProcessorParameterList = ProcessorParameter[];
export interface Processor {
  Type: ProcessorType;
  Parameters?: ProcessorParameter[];
}
export type ProcessorList = Processor[];
export interface ProcessingConfiguration {
  Enabled?: boolean;
  Processors?: Processor[];
}
export type S3BackupMode = "Disabled" | "Enabled" | (string & {});
export type NonEmptyStringWithoutWhitespace = string;
export interface SchemaConfiguration {
  RoleARN?: string;
  CatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  Region?: string;
  VersionId?: string;
}
export type NonEmptyString = string;
export type ColumnToJsonKeyMappings = { [key: string]: string | undefined };
export interface OpenXJsonSerDe {
  ConvertDotsInJsonKeysToUnderscores?: boolean;
  CaseInsensitive?: boolean;
  ColumnToJsonKeyMappings?: { [key: string]: string | undefined };
}
export type ListOfNonEmptyStrings = string[];
export interface HiveJsonSerDe {
  TimestampFormats?: string[];
}
export interface Deserializer {
  OpenXJsonSerDe?: OpenXJsonSerDe;
  HiveJsonSerDe?: HiveJsonSerDe;
}
export interface InputFormatConfiguration {
  Deserializer?: Deserializer;
}
export type BlockSizeBytes = number;
export type ParquetPageSizeBytes = number;
export type ParquetCompression =
  | "UNCOMPRESSED"
  | "GZIP"
  | "SNAPPY"
  | (string & {});
export type NonNegativeIntegerObject = number;
export type ParquetWriterVersion = "V1" | "V2" | (string & {});
export interface ParquetSerDe {
  BlockSizeBytes?: number;
  PageSizeBytes?: number;
  Compression?: ParquetCompression;
  EnableDictionaryCompression?: boolean;
  MaxPaddingBytes?: number;
  WriterVersion?: ParquetWriterVersion;
}
export type OrcStripeSizeBytes = number;
export type OrcRowIndexStride = number;
export type Proportion = number;
export type OrcCompression = "NONE" | "ZLIB" | "SNAPPY" | (string & {});
export type ListOfNonEmptyStringsWithoutWhitespace = string[];
export type OrcFormatVersion = "V0_11" | "V0_12" | (string & {});
export interface OrcSerDe {
  StripeSizeBytes?: number;
  BlockSizeBytes?: number;
  RowIndexStride?: number;
  EnablePadding?: boolean;
  PaddingTolerance?: number;
  Compression?: OrcCompression;
  BloomFilterColumns?: string[];
  BloomFilterFalsePositiveProbability?: number;
  DictionaryKeyThreshold?: number;
  FormatVersion?: OrcFormatVersion;
}
export interface Serializer {
  ParquetSerDe?: ParquetSerDe;
  OrcSerDe?: OrcSerDe;
}
export interface OutputFormatConfiguration {
  Serializer?: Serializer;
}
export interface DataFormatConversionConfiguration {
  SchemaConfiguration?: SchemaConfiguration;
  InputFormatConfiguration?: InputFormatConfiguration;
  OutputFormatConfiguration?: OutputFormatConfiguration;
  Enabled?: boolean;
}
export type RetryDurationInSeconds = number;
export interface RetryOptions {
  DurationInSeconds?: number;
}
export interface DynamicPartitioningConfiguration {
  RetryOptions?: RetryOptions;
  Enabled?: boolean;
}
export type FileExtension = string;
export type CustomTimeZone = string;
export interface ExtendedS3DestinationConfiguration {
  RoleARN: string;
  BucketARN: string;
  Prefix?: string;
  ErrorOutputPrefix?: string;
  BufferingHints?: BufferingHints;
  CompressionFormat?: CompressionFormat;
  EncryptionConfiguration?: EncryptionConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: S3BackupMode;
  S3BackupConfiguration?: S3DestinationConfiguration;
  DataFormatConversionConfiguration?: DataFormatConversionConfiguration;
  DynamicPartitioningConfiguration?: DynamicPartitioningConfiguration;
  FileExtension?: string;
  CustomTimeZone?: string;
}
export type ClusterJDBCURL = string;
export type DataTableName = string;
export type DataTableColumns = string;
export type CopyOptions = string;
export interface CopyCommand {
  DataTableName: string;
  DataTableColumns?: string;
  CopyOptions?: string;
}
export type Username = string | redacted.Redacted<string>;
export type Password = string | redacted.Redacted<string>;
export type RedshiftRetryDurationInSeconds = number;
export interface RedshiftRetryOptions {
  DurationInSeconds?: number;
}
export type RedshiftS3BackupMode = "Disabled" | "Enabled" | (string & {});
export type SecretARN = string;
export interface SecretsManagerConfiguration {
  SecretARN?: string;
  RoleARN?: string;
  Enabled: boolean;
}
export interface RedshiftDestinationConfiguration {
  RoleARN: string;
  ClusterJDBCURL: string;
  CopyCommand: CopyCommand;
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  RetryOptions?: RedshiftRetryOptions;
  S3Configuration: S3DestinationConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: RedshiftS3BackupMode;
  S3BackupConfiguration?: S3DestinationConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export type ElasticsearchDomainARN = string;
export type ElasticsearchClusterEndpoint = string;
export type ElasticsearchIndexName = string;
export type ElasticsearchTypeName = string;
export type ElasticsearchIndexRotationPeriod =
  | "NoRotation"
  | "OneHour"
  | "OneDay"
  | "OneWeek"
  | "OneMonth"
  | (string & {});
export type ElasticsearchBufferingIntervalInSeconds = number;
export type ElasticsearchBufferingSizeInMBs = number;
export interface ElasticsearchBufferingHints {
  IntervalInSeconds?: number;
  SizeInMBs?: number;
}
export type ElasticsearchRetryDurationInSeconds = number;
export interface ElasticsearchRetryOptions {
  DurationInSeconds?: number;
}
export type ElasticsearchS3BackupMode =
  | "FailedDocumentsOnly"
  | "AllDocuments"
  | (string & {});
export type SubnetIdList = string[];
export type SecurityGroupIdList = string[];
export interface VpcConfiguration {
  SubnetIds: string[];
  RoleARN: string;
  SecurityGroupIds: string[];
}
export type DefaultDocumentIdFormat =
  | "FIREHOSE_DEFAULT"
  | "NO_DOCUMENT_ID"
  | (string & {});
export interface DocumentIdOptions {
  DefaultDocumentIdFormat: DefaultDocumentIdFormat;
}
export interface ElasticsearchDestinationConfiguration {
  RoleARN: string;
  DomainARN?: string;
  ClusterEndpoint?: string;
  IndexName: string;
  TypeName?: string;
  IndexRotationPeriod?: ElasticsearchIndexRotationPeriod;
  BufferingHints?: ElasticsearchBufferingHints;
  RetryOptions?: ElasticsearchRetryOptions;
  S3BackupMode?: ElasticsearchS3BackupMode;
  S3Configuration: S3DestinationConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  VpcConfiguration?: VpcConfiguration;
  DocumentIdOptions?: DocumentIdOptions;
}
export type AmazonopensearchserviceDomainARN = string;
export type AmazonopensearchserviceClusterEndpoint = string;
export type AmazonopensearchserviceIndexName = string;
export type AmazonopensearchserviceTypeName = string;
export type AmazonopensearchserviceIndexRotationPeriod =
  | "NoRotation"
  | "OneHour"
  | "OneDay"
  | "OneWeek"
  | "OneMonth"
  | (string & {});
export type AmazonopensearchserviceBufferingIntervalInSeconds = number;
export type AmazonopensearchserviceBufferingSizeInMBs = number;
export interface AmazonopensearchserviceBufferingHints {
  IntervalInSeconds?: number;
  SizeInMBs?: number;
}
export type AmazonopensearchserviceRetryDurationInSeconds = number;
export interface AmazonopensearchserviceRetryOptions {
  DurationInSeconds?: number;
}
export type AmazonopensearchserviceS3BackupMode =
  | "FailedDocumentsOnly"
  | "AllDocuments"
  | (string & {});
export interface AmazonopensearchserviceDestinationConfiguration {
  RoleARN: string;
  DomainARN?: string;
  ClusterEndpoint?: string;
  IndexName: string;
  TypeName?: string;
  IndexRotationPeriod?: AmazonopensearchserviceIndexRotationPeriod;
  BufferingHints?: AmazonopensearchserviceBufferingHints;
  RetryOptions?: AmazonopensearchserviceRetryOptions;
  S3BackupMode?: AmazonopensearchserviceS3BackupMode;
  S3Configuration: S3DestinationConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  VpcConfiguration?: VpcConfiguration;
  DocumentIdOptions?: DocumentIdOptions;
}
export type HECEndpoint = string;
export type HECEndpointType = "Raw" | "Event" | (string & {});
export type HECToken = string;
export type HECAcknowledgmentTimeoutInSeconds = number;
export type SplunkRetryDurationInSeconds = number;
export interface SplunkRetryOptions {
  DurationInSeconds?: number;
}
export type SplunkS3BackupMode =
  | "FailedEventsOnly"
  | "AllEvents"
  | (string & {});
export type SplunkBufferingIntervalInSeconds = number;
export type SplunkBufferingSizeInMBs = number;
export interface SplunkBufferingHints {
  IntervalInSeconds?: number;
  SizeInMBs?: number;
}
export interface SplunkDestinationConfiguration {
  HECEndpoint: string;
  HECEndpointType: HECEndpointType;
  HECToken?: string | redacted.Redacted<string>;
  HECAcknowledgmentTimeoutInSeconds?: number;
  RetryOptions?: SplunkRetryOptions;
  S3BackupMode?: SplunkS3BackupMode;
  S3Configuration: S3DestinationConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  BufferingHints?: SplunkBufferingHints;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export type HttpEndpointUrl = string | redacted.Redacted<string>;
export type HttpEndpointName = string;
export type HttpEndpointAccessKey = string | redacted.Redacted<string>;
export interface HttpEndpointConfiguration {
  Url: string | redacted.Redacted<string>;
  Name?: string;
  AccessKey?: string | redacted.Redacted<string>;
}
export type HttpEndpointBufferingSizeInMBs = number;
export type HttpEndpointBufferingIntervalInSeconds = number;
export interface HttpEndpointBufferingHints {
  SizeInMBs?: number;
  IntervalInSeconds?: number;
}
export type ContentEncoding = "NONE" | "GZIP" | (string & {});
export type HttpEndpointAttributeName = string | redacted.Redacted<string>;
export type HttpEndpointAttributeValue = string | redacted.Redacted<string>;
export interface HttpEndpointCommonAttribute {
  AttributeName: string | redacted.Redacted<string>;
  AttributeValue: string | redacted.Redacted<string>;
}
export type HttpEndpointCommonAttributesList = HttpEndpointCommonAttribute[];
export interface HttpEndpointRequestConfiguration {
  ContentEncoding?: ContentEncoding;
  CommonAttributes?: HttpEndpointCommonAttribute[];
}
export type HttpEndpointRetryDurationInSeconds = number;
export interface HttpEndpointRetryOptions {
  DurationInSeconds?: number;
}
export type HttpEndpointS3BackupMode =
  | "FailedDataOnly"
  | "AllData"
  | (string & {});
export interface HttpEndpointDestinationConfiguration {
  EndpointConfiguration: HttpEndpointConfiguration;
  BufferingHints?: HttpEndpointBufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  RequestConfiguration?: HttpEndpointRequestConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  RoleARN?: string;
  RetryOptions?: HttpEndpointRetryOptions;
  S3BackupMode?: HttpEndpointS3BackupMode;
  S3Configuration: S3DestinationConfiguration;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagDeliveryStreamInputTagList = Tag[];
export type AmazonOpenSearchServerlessCollectionEndpoint = string;
export type AmazonOpenSearchServerlessIndexName = string;
export type AmazonOpenSearchServerlessBufferingIntervalInSeconds = number;
export type AmazonOpenSearchServerlessBufferingSizeInMBs = number;
export interface AmazonOpenSearchServerlessBufferingHints {
  IntervalInSeconds?: number;
  SizeInMBs?: number;
}
export type AmazonOpenSearchServerlessRetryDurationInSeconds = number;
export interface AmazonOpenSearchServerlessRetryOptions {
  DurationInSeconds?: number;
}
export type AmazonOpenSearchServerlessS3BackupMode =
  | "FailedDocumentsOnly"
  | "AllDocuments"
  | (string & {});
export interface AmazonOpenSearchServerlessDestinationConfiguration {
  RoleARN: string;
  CollectionEndpoint?: string;
  IndexName: string;
  BufferingHints?: AmazonOpenSearchServerlessBufferingHints;
  RetryOptions?: AmazonOpenSearchServerlessRetryOptions;
  S3BackupMode?: AmazonOpenSearchServerlessS3BackupMode;
  S3Configuration: S3DestinationConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  VpcConfiguration?: VpcConfiguration;
}
export type MSKClusterARN = string;
export type TopicName = string;
export type Connectivity = "PUBLIC" | "PRIVATE" | (string & {});
export interface AuthenticationConfiguration {
  RoleARN: string;
  Connectivity: Connectivity;
}
export type ReadFromTimestamp = Date;
export interface MSKSourceConfiguration {
  MSKClusterARN: string;
  TopicName: string;
  AuthenticationConfiguration: AuthenticationConfiguration;
  ReadFromTimestamp?: Date;
}
export type SnowflakeAccountUrl = string | redacted.Redacted<string>;
export type SnowflakePrivateKey = string | redacted.Redacted<string>;
export type SnowflakeKeyPassphrase = string | redacted.Redacted<string>;
export type SnowflakeUser = string | redacted.Redacted<string>;
export type SnowflakeDatabase = string | redacted.Redacted<string>;
export type SnowflakeSchema = string | redacted.Redacted<string>;
export type SnowflakeTable = string | redacted.Redacted<string>;
export type SnowflakeRole = string | redacted.Redacted<string>;
export interface SnowflakeRoleConfiguration {
  Enabled?: boolean;
  SnowflakeRole?: string | redacted.Redacted<string>;
}
export type SnowflakeDataLoadingOption =
  | "JSON_MAPPING"
  | "VARIANT_CONTENT_MAPPING"
  | "VARIANT_CONTENT_AND_METADATA_MAPPING"
  | (string & {});
export type SnowflakeMetaDataColumnName = string | redacted.Redacted<string>;
export type SnowflakeContentColumnName = string | redacted.Redacted<string>;
export type SnowflakePrivateLinkVpceId = string | redacted.Redacted<string>;
export interface SnowflakeVpcConfiguration {
  PrivateLinkVpceId: string | redacted.Redacted<string>;
}
export type SnowflakeRetryDurationInSeconds = number;
export interface SnowflakeRetryOptions {
  DurationInSeconds?: number;
}
export type SnowflakeS3BackupMode =
  | "FailedDataOnly"
  | "AllData"
  | (string & {});
export type SnowflakeBufferingSizeInMBs = number;
export type SnowflakeBufferingIntervalInSeconds = number;
export interface SnowflakeBufferingHints {
  SizeInMBs?: number;
  IntervalInSeconds?: number;
}
export interface SnowflakeDestinationConfiguration {
  AccountUrl: string | redacted.Redacted<string>;
  PrivateKey?: string | redacted.Redacted<string>;
  KeyPassphrase?: string | redacted.Redacted<string>;
  User?: string | redacted.Redacted<string>;
  Database: string | redacted.Redacted<string>;
  Schema: string | redacted.Redacted<string>;
  Table: string | redacted.Redacted<string>;
  SnowflakeRoleConfiguration?: SnowflakeRoleConfiguration;
  DataLoadingOption?: SnowflakeDataLoadingOption;
  MetaDataColumnName?: string | redacted.Redacted<string>;
  ContentColumnName?: string | redacted.Redacted<string>;
  SnowflakeVpcConfiguration?: SnowflakeVpcConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  RoleARN: string;
  RetryOptions?: SnowflakeRetryOptions;
  S3BackupMode?: SnowflakeS3BackupMode;
  S3Configuration: S3DestinationConfiguration;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
  BufferingHints?: SnowflakeBufferingHints;
}
export type StringWithLettersDigitsUnderscoresDots = string;
export interface PartitionField {
  SourceName: string;
}
export type PartitionFields = PartitionField[];
export interface PartitionSpec {
  Identity?: PartitionField[];
}
export interface DestinationTableConfiguration {
  DestinationTableName: string;
  DestinationDatabaseName: string;
  UniqueKeys?: string[];
  PartitionSpec?: PartitionSpec;
  S3ErrorOutputPrefix?: string;
}
export type DestinationTableConfigurationList = DestinationTableConfiguration[];
export interface SchemaEvolutionConfiguration {
  Enabled: boolean;
}
export interface TableCreationConfiguration {
  Enabled: boolean;
}
export type IcebergS3BackupMode = "FailedDataOnly" | "AllData" | (string & {});
export type GlueDataCatalogARN = string;
export type WarehouseLocation = string;
export interface CatalogConfiguration {
  CatalogARN?: string;
  WarehouseLocation?: string;
}
export interface IcebergDestinationConfiguration {
  DestinationTableConfigurationList?: DestinationTableConfiguration[];
  SchemaEvolutionConfiguration?: SchemaEvolutionConfiguration;
  TableCreationConfiguration?: TableCreationConfiguration;
  BufferingHints?: BufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: IcebergS3BackupMode;
  RetryOptions?: RetryOptions;
  RoleARN: string;
  AppendOnly?: boolean;
  CatalogConfiguration: CatalogConfiguration;
  S3Configuration: S3DestinationConfiguration;
}
export type DatabaseType = "MySQL" | "PostgreSQL" | (string & {});
export type DatabaseEndpoint = string;
export type DatabasePort = number;
export type SSLMode = "Disabled" | "Enabled" | (string & {});
export type DatabaseName = string;
export type DatabaseIncludeOrExcludeList = string[];
export interface DatabaseList {
  Include?: string[];
  Exclude?: string[];
}
export type DatabaseTableName = string;
export type DatabaseTableIncludeOrExcludeList = string[];
export interface DatabaseTableList {
  Include?: string[];
  Exclude?: string[];
}
export type DatabaseColumnName = string;
export type DatabaseColumnIncludeOrExcludeList = string[];
export interface DatabaseColumnList {
  Include?: string[];
  Exclude?: string[];
}
export type DatabaseSurrogateKeyList = string[];
export interface DatabaseSourceAuthenticationConfiguration {
  SecretsManagerConfiguration: SecretsManagerConfiguration;
}
export type VpcEndpointServiceName = string;
export interface DatabaseSourceVPCConfiguration {
  VpcEndpointServiceName: string;
}
export interface DatabaseSourceConfiguration {
  Type: DatabaseType;
  Endpoint: string;
  Port: number;
  SSLMode?: SSLMode;
  Databases: DatabaseList;
  Tables: DatabaseTableList;
  Columns?: DatabaseColumnList;
  SurrogateKeys?: string[];
  SnapshotWatermarkTable: string;
  DatabaseSourceAuthenticationConfiguration: DatabaseSourceAuthenticationConfiguration;
  DatabaseSourceVPCConfiguration: DatabaseSourceVPCConfiguration;
}
export interface CreateDeliveryStreamInput {
  DeliveryStreamName: string;
  DeliveryStreamType?: DeliveryStreamType;
  DirectPutSourceConfiguration?: DirectPutSourceConfiguration;
  KinesisStreamSourceConfiguration?: KinesisStreamSourceConfiguration;
  DeliveryStreamEncryptionConfigurationInput?: DeliveryStreamEncryptionConfigurationInput;
  S3DestinationConfiguration?: S3DestinationConfiguration;
  ExtendedS3DestinationConfiguration?: ExtendedS3DestinationConfiguration;
  RedshiftDestinationConfiguration?: RedshiftDestinationConfiguration;
  ElasticsearchDestinationConfiguration?: ElasticsearchDestinationConfiguration;
  AmazonopensearchserviceDestinationConfiguration?: AmazonopensearchserviceDestinationConfiguration;
  SplunkDestinationConfiguration?: SplunkDestinationConfiguration;
  HttpEndpointDestinationConfiguration?: HttpEndpointDestinationConfiguration;
  Tags?: Tag[];
  AmazonOpenSearchServerlessDestinationConfiguration?: AmazonOpenSearchServerlessDestinationConfiguration;
  MSKSourceConfiguration?: MSKSourceConfiguration;
  SnowflakeDestinationConfiguration?: SnowflakeDestinationConfiguration;
  IcebergDestinationConfiguration?: IcebergDestinationConfiguration;
  DatabaseSourceConfiguration?: DatabaseSourceConfiguration;
}
export type DeliveryStreamARN = string;
export interface CreateDeliveryStreamOutput {
  DeliveryStreamARN?: string;
}
export interface DeleteDeliveryStreamInput {
  DeliveryStreamName: string;
  AllowForceDelete?: boolean;
}
export interface DeleteDeliveryStreamOutput {}
export type DescribeDeliveryStreamInputLimit = number;
export type DestinationId = string;
export interface DescribeDeliveryStreamInput {
  DeliveryStreamName: string;
  Limit?: number;
  ExclusiveStartDestinationId?: string;
}
export type DeliveryStreamStatus =
  | "CREATING"
  | "CREATING_FAILED"
  | "DELETING"
  | "DELETING_FAILED"
  | "ACTIVE"
  | (string & {});
export type DeliveryStreamFailureType =
  | "VPC_ENDPOINT_SERVICE_NAME_NOT_FOUND"
  | "VPC_INTERFACE_ENDPOINT_SERVICE_ACCESS_DENIED"
  | "RETIRE_KMS_GRANT_FAILED"
  | "CREATE_KMS_GRANT_FAILED"
  | "KMS_ACCESS_DENIED"
  | "DISABLED_KMS_KEY"
  | "INVALID_KMS_KEY"
  | "KMS_KEY_NOT_FOUND"
  | "KMS_OPT_IN_REQUIRED"
  | "CREATE_ENI_FAILED"
  | "DELETE_ENI_FAILED"
  | "SUBNET_NOT_FOUND"
  | "SECURITY_GROUP_NOT_FOUND"
  | "ENI_ACCESS_DENIED"
  | "SUBNET_ACCESS_DENIED"
  | "SECURITY_GROUP_ACCESS_DENIED"
  | "UNKNOWN_ERROR"
  | (string & {});
export interface FailureDescription {
  Type: DeliveryStreamFailureType;
  Details: string;
}
export type DeliveryStreamEncryptionStatus =
  | "ENABLED"
  | "ENABLING"
  | "ENABLING_FAILED"
  | "DISABLED"
  | "DISABLING"
  | "DISABLING_FAILED"
  | (string & {});
export interface DeliveryStreamEncryptionConfiguration {
  KeyARN?: string;
  KeyType?: KeyType;
  Status?: DeliveryStreamEncryptionStatus;
  FailureDescription?: FailureDescription;
}
export type DeliveryStreamVersionId = string;
export interface DirectPutSourceDescription {
  ThroughputHintInMBs?: number;
}
export type DeliveryStartTimestamp = Date;
export interface KinesisStreamSourceDescription {
  KinesisStreamARN?: string;
  RoleARN?: string;
  DeliveryStartTimestamp?: Date;
}
export interface MSKSourceDescription {
  MSKClusterARN?: string;
  TopicName?: string;
  AuthenticationConfiguration?: AuthenticationConfiguration;
  DeliveryStartTimestamp?: Date;
  ReadFromTimestamp?: Date;
}
export type SnapshotRequestedBy = "USER" | "FIREHOSE" | (string & {});
export type SnapshotStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "SUSPENDED"
  | (string & {});
export interface DatabaseSnapshotInfo {
  Id: string;
  Table: string;
  RequestTimestamp: Date;
  RequestedBy: SnapshotRequestedBy;
  Status: SnapshotStatus;
  FailureDescription?: FailureDescription;
}
export type DatabaseSnapshotInfoList = DatabaseSnapshotInfo[];
export interface DatabaseSourceDescription {
  Type?: DatabaseType;
  Endpoint?: string;
  Port?: number;
  SSLMode?: SSLMode;
  Databases?: DatabaseList;
  Tables?: DatabaseTableList;
  Columns?: DatabaseColumnList;
  SurrogateKeys?: string[];
  SnapshotWatermarkTable?: string;
  SnapshotInfo?: DatabaseSnapshotInfo[];
  DatabaseSourceAuthenticationConfiguration?: DatabaseSourceAuthenticationConfiguration;
  DatabaseSourceVPCConfiguration?: DatabaseSourceVPCConfiguration;
}
export interface SourceDescription {
  DirectPutSourceDescription?: DirectPutSourceDescription;
  KinesisStreamSourceDescription?: KinesisStreamSourceDescription;
  MSKSourceDescription?: MSKSourceDescription;
  DatabaseSourceDescription?: DatabaseSourceDescription;
}
export interface S3DestinationDescription {
  RoleARN: string;
  BucketARN: string;
  Prefix?: string;
  ErrorOutputPrefix?: string;
  BufferingHints: BufferingHints;
  CompressionFormat: CompressionFormat;
  EncryptionConfiguration: EncryptionConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
}
export interface ExtendedS3DestinationDescription {
  RoleARN: string;
  BucketARN: string;
  Prefix?: string;
  ErrorOutputPrefix?: string;
  BufferingHints: BufferingHints;
  CompressionFormat: CompressionFormat;
  EncryptionConfiguration: EncryptionConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: S3BackupMode;
  S3BackupDescription?: S3DestinationDescription;
  DataFormatConversionConfiguration?: DataFormatConversionConfiguration;
  DynamicPartitioningConfiguration?: DynamicPartitioningConfiguration;
  FileExtension?: string;
  CustomTimeZone?: string;
}
export interface RedshiftDestinationDescription {
  RoleARN: string;
  ClusterJDBCURL: string;
  CopyCommand: CopyCommand;
  Username?: string | redacted.Redacted<string>;
  RetryOptions?: RedshiftRetryOptions;
  S3DestinationDescription: S3DestinationDescription;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: RedshiftS3BackupMode;
  S3BackupDescription?: S3DestinationDescription;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export interface VpcConfigurationDescription {
  SubnetIds: string[];
  RoleARN: string;
  SecurityGroupIds: string[];
  VpcId: string;
}
export interface ElasticsearchDestinationDescription {
  RoleARN?: string;
  DomainARN?: string;
  ClusterEndpoint?: string;
  IndexName?: string;
  TypeName?: string;
  IndexRotationPeriod?: ElasticsearchIndexRotationPeriod;
  BufferingHints?: ElasticsearchBufferingHints;
  RetryOptions?: ElasticsearchRetryOptions;
  S3BackupMode?: ElasticsearchS3BackupMode;
  S3DestinationDescription?: S3DestinationDescription;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  VpcConfigurationDescription?: VpcConfigurationDescription;
  DocumentIdOptions?: DocumentIdOptions;
}
export interface AmazonopensearchserviceDestinationDescription {
  RoleARN?: string;
  DomainARN?: string;
  ClusterEndpoint?: string;
  IndexName?: string;
  TypeName?: string;
  IndexRotationPeriod?: AmazonopensearchserviceIndexRotationPeriod;
  BufferingHints?: AmazonopensearchserviceBufferingHints;
  RetryOptions?: AmazonopensearchserviceRetryOptions;
  S3BackupMode?: AmazonopensearchserviceS3BackupMode;
  S3DestinationDescription?: S3DestinationDescription;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  VpcConfigurationDescription?: VpcConfigurationDescription;
  DocumentIdOptions?: DocumentIdOptions;
}
export interface SplunkDestinationDescription {
  HECEndpoint?: string;
  HECEndpointType?: HECEndpointType;
  HECToken?: string | redacted.Redacted<string>;
  HECAcknowledgmentTimeoutInSeconds?: number;
  RetryOptions?: SplunkRetryOptions;
  S3BackupMode?: SplunkS3BackupMode;
  S3DestinationDescription?: S3DestinationDescription;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  BufferingHints?: SplunkBufferingHints;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export interface HttpEndpointDescription {
  Url?: string | redacted.Redacted<string>;
  Name?: string;
}
export interface HttpEndpointDestinationDescription {
  EndpointConfiguration?: HttpEndpointDescription;
  BufferingHints?: HttpEndpointBufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  RequestConfiguration?: HttpEndpointRequestConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  RoleARN?: string;
  RetryOptions?: HttpEndpointRetryOptions;
  S3BackupMode?: HttpEndpointS3BackupMode;
  S3DestinationDescription?: S3DestinationDescription;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export interface SnowflakeDestinationDescription {
  AccountUrl?: string | redacted.Redacted<string>;
  User?: string | redacted.Redacted<string>;
  Database?: string | redacted.Redacted<string>;
  Schema?: string | redacted.Redacted<string>;
  Table?: string | redacted.Redacted<string>;
  SnowflakeRoleConfiguration?: SnowflakeRoleConfiguration;
  DataLoadingOption?: SnowflakeDataLoadingOption;
  MetaDataColumnName?: string | redacted.Redacted<string>;
  ContentColumnName?: string | redacted.Redacted<string>;
  SnowflakeVpcConfiguration?: SnowflakeVpcConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  RoleARN?: string;
  RetryOptions?: SnowflakeRetryOptions;
  S3BackupMode?: SnowflakeS3BackupMode;
  S3DestinationDescription?: S3DestinationDescription;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
  BufferingHints?: SnowflakeBufferingHints;
}
export interface AmazonOpenSearchServerlessDestinationDescription {
  RoleARN?: string;
  CollectionEndpoint?: string;
  IndexName?: string;
  BufferingHints?: AmazonOpenSearchServerlessBufferingHints;
  RetryOptions?: AmazonOpenSearchServerlessRetryOptions;
  S3BackupMode?: AmazonOpenSearchServerlessS3BackupMode;
  S3DestinationDescription?: S3DestinationDescription;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  VpcConfigurationDescription?: VpcConfigurationDescription;
}
export interface IcebergDestinationDescription {
  DestinationTableConfigurationList?: DestinationTableConfiguration[];
  SchemaEvolutionConfiguration?: SchemaEvolutionConfiguration;
  TableCreationConfiguration?: TableCreationConfiguration;
  BufferingHints?: BufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: IcebergS3BackupMode;
  RetryOptions?: RetryOptions;
  RoleARN?: string;
  AppendOnly?: boolean;
  CatalogConfiguration?: CatalogConfiguration;
  S3DestinationDescription?: S3DestinationDescription;
}
export interface DestinationDescription {
  DestinationId: string;
  S3DestinationDescription?: S3DestinationDescription;
  ExtendedS3DestinationDescription?: ExtendedS3DestinationDescription;
  RedshiftDestinationDescription?: RedshiftDestinationDescription;
  ElasticsearchDestinationDescription?: ElasticsearchDestinationDescription;
  AmazonopensearchserviceDestinationDescription?: AmazonopensearchserviceDestinationDescription;
  SplunkDestinationDescription?: SplunkDestinationDescription;
  HttpEndpointDestinationDescription?: HttpEndpointDestinationDescription;
  SnowflakeDestinationDescription?: SnowflakeDestinationDescription;
  AmazonOpenSearchServerlessDestinationDescription?: AmazonOpenSearchServerlessDestinationDescription;
  IcebergDestinationDescription?: IcebergDestinationDescription;
}
export type DestinationDescriptionList = DestinationDescription[];
export interface DeliveryStreamDescription {
  DeliveryStreamName: string;
  DeliveryStreamARN: string;
  DeliveryStreamStatus: DeliveryStreamStatus;
  FailureDescription?: FailureDescription;
  DeliveryStreamEncryptionConfiguration?: DeliveryStreamEncryptionConfiguration;
  DeliveryStreamType: DeliveryStreamType;
  VersionId: string;
  CreateTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  Source?: SourceDescription;
  Destinations: DestinationDescription[];
  HasMoreDestinations: boolean;
}
export interface DescribeDeliveryStreamOutput {
  DeliveryStreamDescription: DeliveryStreamDescription;
}
export type ListDeliveryStreamsInputLimit = number;
export interface ListDeliveryStreamsInput {
  Limit?: number;
  DeliveryStreamType?: DeliveryStreamType;
  ExclusiveStartDeliveryStreamName?: string;
}
export type DeliveryStreamNameList = string[];
export interface ListDeliveryStreamsOutput {
  DeliveryStreamNames: string[];
  HasMoreDeliveryStreams: boolean;
}
export type ListTagsForDeliveryStreamInputLimit = number;
export interface ListTagsForDeliveryStreamInput {
  DeliveryStreamName: string;
  ExclusiveStartTagKey?: string;
  Limit?: number;
}
export type ListTagsForDeliveryStreamOutputTagList = Tag[];
export interface ListTagsForDeliveryStreamOutput {
  Tags: Tag[];
  HasMoreTags: boolean;
}
export type Data = Uint8Array;
export interface Record {
  Data: Uint8Array;
}
export interface PutRecordInput {
  DeliveryStreamName: string;
  Record: Record;
}
export type PutResponseRecordId = string;
export interface PutRecordOutput {
  RecordId: string;
  Encrypted?: boolean;
}
export type PutRecordBatchRequestEntryList = Record[];
export interface PutRecordBatchInput {
  DeliveryStreamName: string;
  Records: Record[];
}
export type ErrorCode = string;
export type ErrorMessage = string;
export interface PutRecordBatchResponseEntry {
  RecordId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type PutRecordBatchResponseEntryList = PutRecordBatchResponseEntry[];
export interface PutRecordBatchOutput {
  FailedPutCount: number;
  Encrypted?: boolean;
  RequestResponses: PutRecordBatchResponseEntry[];
}
export interface StartDeliveryStreamEncryptionInput {
  DeliveryStreamName: string;
  DeliveryStreamEncryptionConfigurationInput?: DeliveryStreamEncryptionConfigurationInput;
}
export interface StartDeliveryStreamEncryptionOutput {}
export interface StopDeliveryStreamEncryptionInput {
  DeliveryStreamName: string;
}
export interface StopDeliveryStreamEncryptionOutput {}
export interface TagDeliveryStreamInput {
  DeliveryStreamName: string;
  Tags: Tag[];
}
export interface TagDeliveryStreamOutput {}
export type TagKeyList = string[];
export interface UntagDeliveryStreamInput {
  DeliveryStreamName: string;
  TagKeys: string[];
}
export interface UntagDeliveryStreamOutput {}
export interface S3DestinationUpdate {
  RoleARN?: string;
  BucketARN?: string;
  Prefix?: string;
  ErrorOutputPrefix?: string;
  BufferingHints?: BufferingHints;
  CompressionFormat?: CompressionFormat;
  EncryptionConfiguration?: EncryptionConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
}
export interface ExtendedS3DestinationUpdate {
  RoleARN?: string;
  BucketARN?: string;
  Prefix?: string;
  ErrorOutputPrefix?: string;
  BufferingHints?: BufferingHints;
  CompressionFormat?: CompressionFormat;
  EncryptionConfiguration?: EncryptionConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: S3BackupMode;
  S3BackupUpdate?: S3DestinationUpdate;
  DataFormatConversionConfiguration?: DataFormatConversionConfiguration;
  DynamicPartitioningConfiguration?: DynamicPartitioningConfiguration;
  FileExtension?: string;
  CustomTimeZone?: string;
}
export interface RedshiftDestinationUpdate {
  RoleARN?: string;
  ClusterJDBCURL?: string;
  CopyCommand?: CopyCommand;
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  RetryOptions?: RedshiftRetryOptions;
  S3Update?: S3DestinationUpdate;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: RedshiftS3BackupMode;
  S3BackupUpdate?: S3DestinationUpdate;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export interface ElasticsearchDestinationUpdate {
  RoleARN?: string;
  DomainARN?: string;
  ClusterEndpoint?: string;
  IndexName?: string;
  TypeName?: string;
  IndexRotationPeriod?: ElasticsearchIndexRotationPeriod;
  BufferingHints?: ElasticsearchBufferingHints;
  RetryOptions?: ElasticsearchRetryOptions;
  S3Update?: S3DestinationUpdate;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  DocumentIdOptions?: DocumentIdOptions;
}
export interface AmazonopensearchserviceDestinationUpdate {
  RoleARN?: string;
  DomainARN?: string;
  ClusterEndpoint?: string;
  IndexName?: string;
  TypeName?: string;
  IndexRotationPeriod?: AmazonopensearchserviceIndexRotationPeriod;
  BufferingHints?: AmazonopensearchserviceBufferingHints;
  RetryOptions?: AmazonopensearchserviceRetryOptions;
  S3Update?: S3DestinationUpdate;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  DocumentIdOptions?: DocumentIdOptions;
}
export interface SplunkDestinationUpdate {
  HECEndpoint?: string;
  HECEndpointType?: HECEndpointType;
  HECToken?: string | redacted.Redacted<string>;
  HECAcknowledgmentTimeoutInSeconds?: number;
  RetryOptions?: SplunkRetryOptions;
  S3BackupMode?: SplunkS3BackupMode;
  S3Update?: S3DestinationUpdate;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  BufferingHints?: SplunkBufferingHints;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export interface HttpEndpointDestinationUpdate {
  EndpointConfiguration?: HttpEndpointConfiguration;
  BufferingHints?: HttpEndpointBufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  RequestConfiguration?: HttpEndpointRequestConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  RoleARN?: string;
  RetryOptions?: HttpEndpointRetryOptions;
  S3BackupMode?: HttpEndpointS3BackupMode;
  S3Update?: S3DestinationUpdate;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}
export interface AmazonOpenSearchServerlessDestinationUpdate {
  RoleARN?: string;
  CollectionEndpoint?: string;
  IndexName?: string;
  BufferingHints?: AmazonOpenSearchServerlessBufferingHints;
  RetryOptions?: AmazonOpenSearchServerlessRetryOptions;
  S3Update?: S3DestinationUpdate;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
}
export interface SnowflakeDestinationUpdate {
  AccountUrl?: string | redacted.Redacted<string>;
  PrivateKey?: string | redacted.Redacted<string>;
  KeyPassphrase?: string | redacted.Redacted<string>;
  User?: string | redacted.Redacted<string>;
  Database?: string | redacted.Redacted<string>;
  Schema?: string | redacted.Redacted<string>;
  Table?: string | redacted.Redacted<string>;
  SnowflakeRoleConfiguration?: SnowflakeRoleConfiguration;
  DataLoadingOption?: SnowflakeDataLoadingOption;
  MetaDataColumnName?: string | redacted.Redacted<string>;
  ContentColumnName?: string | redacted.Redacted<string>;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  RoleARN?: string;
  RetryOptions?: SnowflakeRetryOptions;
  S3BackupMode?: SnowflakeS3BackupMode;
  S3Update?: S3DestinationUpdate;
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
  BufferingHints?: SnowflakeBufferingHints;
}
export interface IcebergDestinationUpdate {
  DestinationTableConfigurationList?: DestinationTableConfiguration[];
  SchemaEvolutionConfiguration?: SchemaEvolutionConfiguration;
  TableCreationConfiguration?: TableCreationConfiguration;
  BufferingHints?: BufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  S3BackupMode?: IcebergS3BackupMode;
  RetryOptions?: RetryOptions;
  RoleARN?: string;
  AppendOnly?: boolean;
  CatalogConfiguration?: CatalogConfiguration;
  S3Configuration?: S3DestinationConfiguration;
}
export interface UpdateDestinationInput {
  DeliveryStreamName: string;
  CurrentDeliveryStreamVersionId: string;
  DestinationId: string;
  S3DestinationUpdate?: S3DestinationUpdate;
  ExtendedS3DestinationUpdate?: ExtendedS3DestinationUpdate;
  RedshiftDestinationUpdate?: RedshiftDestinationUpdate;
  ElasticsearchDestinationUpdate?: ElasticsearchDestinationUpdate;
  AmazonopensearchserviceDestinationUpdate?: AmazonopensearchserviceDestinationUpdate;
  SplunkDestinationUpdate?: SplunkDestinationUpdate;
  HttpEndpointDestinationUpdate?: HttpEndpointDestinationUpdate;
  AmazonOpenSearchServerlessDestinationUpdate?: AmazonOpenSearchServerlessDestinationUpdate;
  SnowflakeDestinationUpdate?: SnowflakeDestinationUpdate;
  IcebergDestinationUpdate?: IcebergDestinationUpdate;
}
export interface UpdateDestinationOutput {}
export type CreateDeliveryStreamError =
  | InvalidArgumentException
  | InvalidKMSResourceException
  | LimitExceededException
  | ResourceInUseException
  | CommonErrors;
/**
 * Creates a Firehose stream.
 *
 * By default, you can create up to 5,000 Firehose streams per Amazon Web Services
 * Region.
 *
 * This is an asynchronous operation that immediately returns. The initial status of the
 * Firehose stream is `CREATING`. After the Firehose stream is created, its status
 * is `ACTIVE` and it now accepts data. If the Firehose stream creation fails, the
 * status transitions to `CREATING_FAILED`. Attempts to send data to a delivery
 * stream that is not in the `ACTIVE` state cause an exception. To check the state
 * of a Firehose stream, use DescribeDeliveryStream.
 *
 * If the status of a Firehose stream is `CREATING_FAILED`, this status
 * doesn't change, and you can't invoke `CreateDeliveryStream` again on it.
 * However, you can invoke the DeleteDeliveryStream operation to delete
 * it.
 *
 * A Firehose stream can be configured to receive records directly
 * from providers using PutRecord or PutRecordBatch, or it
 * can be configured to use an existing Kinesis stream as its source. To specify a Kinesis
 * data stream as input, set the `DeliveryStreamType` parameter to
 * `KinesisStreamAsSource`, and provide the Kinesis stream Amazon Resource Name
 * (ARN) and role ARN in the `KinesisStreamSourceConfiguration`
 * parameter.
 *
 * To create a Firehose stream with server-side encryption (SSE) enabled, include DeliveryStreamEncryptionConfigurationInput in your request. This is
 * optional. You can also invoke StartDeliveryStreamEncryption to turn on
 * SSE for an existing Firehose stream that doesn't have SSE enabled.
 *
 * A Firehose stream is configured with a single destination, such as Amazon Simple
 * Storage Service (Amazon S3), Amazon Redshift, Amazon OpenSearch Service, Amazon OpenSearch
 * Serverless, Splunk, and any custom HTTP endpoint or HTTP endpoints owned by or supported by
 * third-party service providers, including Datadog, Dynatrace, LogicMonitor, MongoDB, New
 * Relic, and Sumo Logic. You must specify only one of the following destination configuration
 * parameters: `ExtendedS3DestinationConfiguration`,
 * `S3DestinationConfiguration`,
 * `ElasticsearchDestinationConfiguration`,
 * `RedshiftDestinationConfiguration`, or
 * `SplunkDestinationConfiguration`.
 *
 * When you specify `S3DestinationConfiguration`, you can also provide the
 * following optional values: BufferingHints, `EncryptionConfiguration`, and
 * `CompressionFormat`. By default, if no `BufferingHints` value is
 * provided, Firehose buffers data up to 5 MB or for 5 minutes, whichever
 * condition is satisfied first. `BufferingHints` is a hint, so there are some
 * cases where the service cannot adhere to these conditions strictly. For example, record
 * boundaries might be such that the size is a little over or under the configured buffering
 * size. By default, no encryption is performed. We strongly recommend that you enable
 * encryption to ensure secure data storage in Amazon S3.
 *
 * A few notes about Amazon Redshift as a destination:
 *
 * - An Amazon Redshift destination requires an S3 bucket as intermediate location.
 * Firehose first delivers data to Amazon S3 and then uses
 * `COPY` syntax to load data into an Amazon Redshift table. This is
 * specified in the `RedshiftDestinationConfiguration.S3Configuration`
 * parameter.
 *
 * - The compression formats `SNAPPY` or `ZIP` cannot be
 * specified in `RedshiftDestinationConfiguration.S3Configuration` because
 * the Amazon Redshift `COPY` operation that reads from the S3 bucket doesn't
 * support these compression formats.
 *
 * - We strongly recommend that you use the user name and password you provide
 * exclusively with Firehose, and that the permissions for the account are
 * restricted for Amazon Redshift `INSERT` permissions.
 *
 * Firehose assumes the IAM role that is configured as part of the
 * destination. The role should allow the Firehose principal to assume the role,
 * and the role should have permissions that allow the service to deliver the data. For more
 * information, see Grant Firehose Access to an Amazon S3 Destination in the *Amazon Firehose Developer Guide*.
 */
export const createDeliveryStream: API.OperationMethod<
  CreateDeliveryStreamInput,
  CreateDeliveryStreamOutput,
  CreateDeliveryStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DeliveryStreamName: 0,
      DeliveryStreamType: 0,
      DirectPutSourceConfiguration: { ThroughputHintInMBs: 0 },
      KinesisStreamSourceConfiguration: { KinesisStreamARN: 0, RoleARN: 0 },
      DeliveryStreamEncryptionConfigurationInput:
        i_DeliveryStreamEncryptionConfigurationInput,
      S3DestinationConfiguration: i_S3DestinationConfiguration,
      ExtendedS3DestinationConfiguration: {
        RoleARN: 0,
        BucketARN: 0,
        Prefix: 0,
        ErrorOutputPrefix: 0,
        BufferingHints: i_BufferingHints,
        CompressionFormat: 0,
        EncryptionConfiguration: i_EncryptionConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        ProcessingConfiguration: i_ProcessingConfiguration,
        S3BackupMode: 0,
        S3BackupConfiguration: i_S3DestinationConfiguration,
        DataFormatConversionConfiguration: i_DataFormatConversionConfiguration,
        DynamicPartitioningConfiguration: i_DynamicPartitioningConfiguration,
        FileExtension: 0,
        CustomTimeZone: 0,
      },
      RedshiftDestinationConfiguration: {
        RoleARN: 0,
        ClusterJDBCURL: 0,
        CopyCommand: i_CopyCommand,
        Username: 0,
        Password: 0,
        RetryOptions: i_RedshiftRetryOptions,
        S3Configuration: i_S3DestinationConfiguration,
        ProcessingConfiguration: i_ProcessingConfiguration,
        S3BackupMode: 0,
        S3BackupConfiguration: i_S3DestinationConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        SecretsManagerConfiguration: i_SecretsManagerConfiguration,
      },
      ElasticsearchDestinationConfiguration: {
        RoleARN: 0,
        DomainARN: 0,
        ClusterEndpoint: 0,
        IndexName: 0,
        TypeName: 0,
        IndexRotationPeriod: 0,
        BufferingHints: i_ElasticsearchBufferingHints,
        RetryOptions: i_ElasticsearchRetryOptions,
        S3BackupMode: 0,
        S3Configuration: i_S3DestinationConfiguration,
        ProcessingConfiguration: i_ProcessingConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        VpcConfiguration: i_VpcConfiguration,
        DocumentIdOptions: i_DocumentIdOptions,
      },
      AmazonopensearchserviceDestinationConfiguration: {
        RoleARN: 0,
        DomainARN: 0,
        ClusterEndpoint: 0,
        IndexName: 0,
        TypeName: 0,
        IndexRotationPeriod: 0,
        BufferingHints: i_AmazonopensearchserviceBufferingHints,
        RetryOptions: i_AmazonopensearchserviceRetryOptions,
        S3BackupMode: 0,
        S3Configuration: i_S3DestinationConfiguration,
        ProcessingConfiguration: i_ProcessingConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        VpcConfiguration: i_VpcConfiguration,
        DocumentIdOptions: i_DocumentIdOptions,
      },
      SplunkDestinationConfiguration: {
        HECEndpoint: 0,
        HECEndpointType: 0,
        HECToken: 0,
        HECAcknowledgmentTimeoutInSeconds: 0,
        RetryOptions: i_SplunkRetryOptions,
        S3BackupMode: 0,
        S3Configuration: i_S3DestinationConfiguration,
        ProcessingConfiguration: i_ProcessingConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        BufferingHints: i_SplunkBufferingHints,
        SecretsManagerConfiguration: i_SecretsManagerConfiguration,
      },
      HttpEndpointDestinationConfiguration: {
        EndpointConfiguration: i_HttpEndpointConfiguration,
        BufferingHints: i_HttpEndpointBufferingHints,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        RequestConfiguration: i_HttpEndpointRequestConfiguration,
        ProcessingConfiguration: i_ProcessingConfiguration,
        RoleARN: 0,
        RetryOptions: i_HttpEndpointRetryOptions,
        S3BackupMode: 0,
        S3Configuration: i_S3DestinationConfiguration,
        SecretsManagerConfiguration: i_SecretsManagerConfiguration,
      },
      Tags: D.list(i_Tag),
      AmazonOpenSearchServerlessDestinationConfiguration: {
        RoleARN: 0,
        CollectionEndpoint: 0,
        IndexName: 0,
        BufferingHints: i_AmazonOpenSearchServerlessBufferingHints,
        RetryOptions: i_AmazonOpenSearchServerlessRetryOptions,
        S3BackupMode: 0,
        S3Configuration: i_S3DestinationConfiguration,
        ProcessingConfiguration: i_ProcessingConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        VpcConfiguration: i_VpcConfiguration,
      },
      MSKSourceConfiguration: {
        MSKClusterARN: 0,
        TopicName: 0,
        AuthenticationConfiguration: { RoleARN: 0, Connectivity: 0 },
        ReadFromTimestamp: 0,
      },
      SnowflakeDestinationConfiguration: {
        AccountUrl: 0,
        PrivateKey: 0,
        KeyPassphrase: 0,
        User: 0,
        Database: 0,
        Schema: 0,
        Table: 0,
        SnowflakeRoleConfiguration: i_SnowflakeRoleConfiguration,
        DataLoadingOption: 0,
        MetaDataColumnName: 0,
        ContentColumnName: 0,
        SnowflakeVpcConfiguration: { PrivateLinkVpceId: 0 },
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        ProcessingConfiguration: i_ProcessingConfiguration,
        RoleARN: 0,
        RetryOptions: i_SnowflakeRetryOptions,
        S3BackupMode: 0,
        S3Configuration: i_S3DestinationConfiguration,
        SecretsManagerConfiguration: i_SecretsManagerConfiguration,
        BufferingHints: i_SnowflakeBufferingHints,
      },
      IcebergDestinationConfiguration: {
        DestinationTableConfigurationList: D.list(
          i_DestinationTableConfiguration,
        ),
        SchemaEvolutionConfiguration: i_SchemaEvolutionConfiguration,
        TableCreationConfiguration: i_TableCreationConfiguration,
        BufferingHints: i_BufferingHints,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        ProcessingConfiguration: i_ProcessingConfiguration,
        S3BackupMode: 0,
        RetryOptions: i_RetryOptions,
        RoleARN: 0,
        AppendOnly: 0,
        CatalogConfiguration: i_CatalogConfiguration,
        S3Configuration: i_S3DestinationConfiguration,
      },
      DatabaseSourceConfiguration: {
        Type: 0,
        Endpoint: 0,
        Port: 0,
        SSLMode: 0,
        Databases: { Include: 0, Exclude: 0 },
        Tables: { Include: 0, Exclude: 0 },
        Columns: { Include: 0, Exclude: 0 },
        SurrogateKeys: 0,
        SnapshotWatermarkTable: 0,
        DatabaseSourceAuthenticationConfiguration: {
          SecretsManagerConfiguration: i_SecretsManagerConfiguration,
        },
        DatabaseSourceVPCConfiguration: { VpcEndpointServiceName: 0 },
      },
    },
  },
  errors: [
    InvalidArgumentException,
    InvalidKMSResourceException,
    LimitExceededException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeliveryStream",
})) as any;

export type DeleteDeliveryStreamError =
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Firehose stream and its data.
 *
 * You can delete a Firehose stream only if it is in one of the following states:
 * `ACTIVE`, `DELETING`, `CREATING_FAILED`, or
 * `DELETING_FAILED`. You can't delete a Firehose stream that is in the
 * `CREATING` state. To check the state of a Firehose stream, use DescribeDeliveryStream.
 *
 * DeleteDeliveryStream is an asynchronous API. When an API request to DeleteDeliveryStream succeeds, the Firehose stream is marked for deletion, and it goes into the
 * `DELETING` state.While the Firehose stream is in the `DELETING` state, the service might
 * continue to accept records, but it doesn't make any guarantees with respect to delivering
 * the data. Therefore, as a best practice, first stop any applications that are sending
 * records before you delete a Firehose stream.
 *
 * Removal of a Firehose stream that is in the `DELETING` state is a low priority operation for the service. A stream may remain in the
 * `DELETING` state for several minutes. Therefore, as a best practice, applications should not wait for streams in the `DELETING` state
 * to be removed.
 */
export const deleteDeliveryStream: API.OperationMethod<
  DeleteDeliveryStreamInput,
  DeleteDeliveryStreamOutput,
  DeleteDeliveryStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeliveryStreamName: 0, AllowForceDelete: 0 },
  },
  errors: [ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeliveryStream",
})) as any;

export type DescribeDeliveryStreamError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the specified Firehose stream and its status. For example, after your
 * Firehose stream is created, call `DescribeDeliveryStream` to see whether the
 * Firehose stream is `ACTIVE` and therefore ready for data to be sent to it.
 *
 * If the status of a Firehose stream is `CREATING_FAILED`, this status
 * doesn't change, and you can't invoke CreateDeliveryStream again on it.
 * However, you can invoke the DeleteDeliveryStream operation to delete it.
 * If the status is `DELETING_FAILED`, you can force deletion by invoking DeleteDeliveryStream again but with DeleteDeliveryStreamInput$AllowForceDelete set to true.
 */
export const describeDeliveryStream: API.OperationMethod<
  DescribeDeliveryStreamInput,
  DescribeDeliveryStreamOutput,
  DescribeDeliveryStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeliveryStreamName: 0, Limit: 0, ExclusiveStartDestinationId: 0 },
    output: {
      DeliveryStreamDescription: {
        CreateTimestamp: D.ts,
        LastUpdateTimestamp: D.ts,
        Source: {
          KinesisStreamSourceDescription: { DeliveryStartTimestamp: D.ts },
          MSKSourceDescription: {
            DeliveryStartTimestamp: D.ts,
            ReadFromTimestamp: D.ts,
          },
          DatabaseSourceDescription: {
            SnapshotInfo: D.list({ RequestTimestamp: D.ts }),
          },
        },
        Destinations: D.list({
          RedshiftDestinationDescription: { Username: D.secret },
          SplunkDestinationDescription: { HECToken: D.secret },
          HttpEndpointDestinationDescription: {
            EndpointConfiguration: { Url: D.secret },
            RequestConfiguration: {
              CommonAttributes: D.list({
                AttributeName: D.secret,
                AttributeValue: D.secret,
              }),
            },
          },
          SnowflakeDestinationDescription: {
            AccountUrl: D.secret,
            User: D.secret,
            Database: D.secret,
            Schema: D.secret,
            Table: D.secret,
            SnowflakeRoleConfiguration: { SnowflakeRole: D.secret },
            MetaDataColumnName: D.secret,
            ContentColumnName: D.secret,
            SnowflakeVpcConfiguration: { PrivateLinkVpceId: D.secret },
          },
        }),
      },
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeliveryStream",
})) as any;

export type ListDeliveryStreamsError = CommonErrors;
/**
 * Lists your Firehose streams in alphabetical order of their names.
 *
 * The number of Firehose streams might be too large to return using a single call to
 * `ListDeliveryStreams`. You can limit the number of Firehose streams returned,
 * using the `Limit` parameter. To determine whether there are more delivery
 * streams to list, check the value of `HasMoreDeliveryStreams` in the output. If
 * there are more Firehose streams to list, you can request them by calling this operation
 * again and setting the `ExclusiveStartDeliveryStreamName` parameter to the name
 * of the last Firehose stream returned in the last call.
 */
export const listDeliveryStreams: API.OperationMethod<
  ListDeliveryStreamsInput,
  ListDeliveryStreamsOutput,
  ListDeliveryStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Limit: 0,
      DeliveryStreamType: 0,
      ExclusiveStartDeliveryStreamName: 0,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeliveryStreams",
})) as any;

export type ListTagsForDeliveryStreamError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags for the specified Firehose stream. This operation has a limit of five
 * transactions per second per account.
 */
export const listTagsForDeliveryStream: API.OperationMethod<
  ListTagsForDeliveryStreamInput,
  ListTagsForDeliveryStreamOutput,
  ListTagsForDeliveryStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeliveryStreamName: 0, ExclusiveStartTagKey: 0, Limit: 0 },
  },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForDeliveryStream",
})) as any;

export type PutRecordError =
  | InvalidArgumentException
  | InvalidKMSResourceException
  | InvalidSourceException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Writes a single data record into an Firehose stream. To
 * write multiple data records into a Firehose stream, use PutRecordBatch.
 * Applications using these operations are referred to as producers.
 *
 * By default, each Firehose stream can take in up to 2,000 transactions per second,
 * 5,000 records per second, or 5 MB per second. If you use PutRecord and
 * PutRecordBatch, the limits are an aggregate across these two
 * operations for each Firehose stream. For more information about limits and how to request
 * an increase, see Amazon
 * Firehose Limits.
 *
 * Firehose accumulates and publishes a particular metric for a customer account in one minute intervals. It is possible that the bursts of incoming bytes/records ingested to a Firehose stream last only for a few seconds. Due to this, the actual spikes in the traffic might not be fully visible in the customer's 1 minute CloudWatch metrics.
 *
 * You must specify the name of the Firehose stream and the data record when using PutRecord. The data record consists of a data blob that can be up to 1,000
 * KiB in size, and any kind of data. For example, it can be a segment from a log file,
 * geographic location data, website clickstream data, and so on.
 *
 * For multi record de-aggregation, you can not put more than 500 records even if the
 * data blob length is less than 1000 KiB. If you include more than 500 records, the request
 * succeeds but the record de-aggregation doesn't work as expected and transformation lambda
 * is invoked with the complete base64 encoded data blob instead of de-aggregated base64
 * decoded records.
 *
 * Firehose buffers records before delivering them to the destination. To
 * disambiguate the data blobs at the destination, a common solution is to use delimiters in
 * the data, such as a newline (`\n`) or some other character unique within the
 * data. This allows the consumer application to parse individual data items when reading the
 * data from the destination.
 *
 * The `PutRecord` operation returns a `RecordId`, which is a
 * unique string assigned to each record. Producer applications can use this ID for purposes
 * such as auditability and investigation.
 *
 * If the `PutRecord` operation throws a
 * `ServiceUnavailableException`, the API is automatically reinvoked (retried) 3
 * times. If the exception persists, it is possible that the throughput limits have been
 * exceeded for the Firehose stream.
 *
 * Re-invoking the Put API operations (for example, PutRecord and PutRecordBatch) can
 * result in data duplicates. For larger data assets, allow for a longer time out before
 * retrying Put API operations.
 *
 * Data records sent to Firehose are stored for 24 hours from the time they
 * are added to a Firehose stream as it tries to send the records to the destination. If the
 * destination is unreachable for more than 24 hours, the data is no longer
 * available.
 *
 * Don't concatenate two or more base64 strings to form the data fields of your records.
 * Instead, concatenate the raw data, then perform base64 encoding.
 */
export const putRecord: API.OperationMethod<
  PutRecordInput,
  PutRecordOutput,
  PutRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeliveryStreamName: 0, Record: i_Record },
  },
  errors: [
    InvalidArgumentException,
    InvalidKMSResourceException,
    InvalidSourceException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecord",
})) as any;

export type PutRecordBatchError =
  | InvalidArgumentException
  | InvalidKMSResourceException
  | InvalidSourceException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Writes multiple data records into a Firehose stream in a single call, which can
 * achieve higher throughput per producer than when writing single records. To write single
 * data records into a Firehose stream, use PutRecord. Applications using
 * these operations are referred to as producers.
 *
 * Firehose accumulates and publishes a particular metric for a customer account in one minute intervals. It is possible that the bursts of incoming bytes/records ingested to a Firehose stream last only for a few seconds. Due to this, the actual spikes in the traffic might not be fully visible in the customer's 1 minute CloudWatch metrics.
 *
 * For information about service quota, see Amazon Firehose
 * Quota.
 *
 * Each PutRecordBatch request supports up to 500 records. Each record
 * in the request can be as large as 1,000 KB (before base64 encoding), up to a limit of 4 MB
 * for the entire request. These limits cannot be changed.
 *
 * You must specify the name of the Firehose stream and the data record when using PutRecord. The data record consists of a data blob that can be up to 1,000
 * KB in size, and any kind of data. For example, it could be a segment from a log file,
 * geographic location data, website clickstream data, and so on.
 *
 * For multi record de-aggregation, you can not put more than 500 records even if the
 * data blob length is less than 1000 KiB. If you include more than 500 records, the request
 * succeeds but the record de-aggregation doesn't work as expected and transformation lambda
 * is invoked with the complete base64 encoded data blob instead of de-aggregated base64
 * decoded records.
 *
 * Firehose buffers records before delivering them to the destination. To
 * disambiguate the data blobs at the destination, a common solution is to use delimiters in
 * the data, such as a newline (`\n`) or some other character unique within the
 * data. This allows the consumer application to parse individual data items when reading the
 * data from the destination.
 *
 * The PutRecordBatch response includes a count of failed records,
 * `FailedPutCount`, and an array of responses, `RequestResponses`.
 * Even if the PutRecordBatch call succeeds, the value of
 * `FailedPutCount` may be greater than 0, indicating that there are records for
 * which the operation didn't succeed. Each entry in the `RequestResponses` array
 * provides additional information about the processed record. It directly correlates with a
 * record in the request array using the same ordering, from the top to the bottom. The
 * response array always includes the same number of records as the request array.
 * `RequestResponses` includes both successfully and unsuccessfully processed
 * records. Firehose tries to process all records in each PutRecordBatch request. A single record failure does not stop the processing
 * of subsequent records.
 *
 * A successfully processed record includes a `RecordId` value, which is
 * unique for the record. An unsuccessfully processed record includes `ErrorCode`
 * and `ErrorMessage` values. `ErrorCode` reflects the type of error,
 * and is one of the following values: `ServiceUnavailableException` or
 * `InternalFailure`. `ErrorMessage` provides more detailed
 * information about the error.
 *
 * If there is an internal server error or a timeout, the write might have completed or
 * it might have failed. If `FailedPutCount` is greater than 0, retry the request,
 * resending only those records that might have failed processing. This minimizes the possible
 * duplicate records and also reduces the total bytes sent (and corresponding charges). We
 * recommend that you handle any duplicates at the destination.
 *
 * If PutRecordBatch throws `ServiceUnavailableException`,
 * the API is automatically reinvoked (retried) 3 times. If the exception persists, it is
 * possible that the throughput limits have been exceeded for the Firehose stream.
 *
 * Re-invoking the Put API operations (for example, PutRecord and PutRecordBatch) can
 * result in data duplicates. For larger data assets, allow for a longer time out before
 * retrying Put API operations.
 *
 * Data records sent to Firehose are stored for 24 hours from the time they
 * are added to a Firehose stream as it attempts to send the records to the destination. If
 * the destination is unreachable for more than 24 hours, the data is no longer
 * available.
 *
 * Don't concatenate two or more base64 strings to form the data fields of your records.
 * Instead, concatenate the raw data, then perform base64 encoding.
 */
export const putRecordBatch: API.OperationMethod<
  PutRecordBatchInput,
  PutRecordBatchOutput,
  PutRecordBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeliveryStreamName: 0, Records: D.list(i_Record) },
  },
  errors: [
    InvalidArgumentException,
    InvalidKMSResourceException,
    InvalidSourceException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecordBatch",
})) as any;

export type StartDeliveryStreamEncryptionError =
  | InvalidArgumentException
  | InvalidKMSResourceException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables server-side encryption (SSE) for the Firehose stream.
 *
 * This operation is asynchronous. It returns immediately. When you invoke it, Firehose first sets the encryption status of the stream to `ENABLING`, and then
 * to `ENABLED`. The encryption status of a Firehose stream is the
 * `Status` property in DeliveryStreamEncryptionConfiguration.
 * If the operation fails, the encryption status changes to `ENABLING_FAILED`. You
 * can continue to read and write data to your Firehose stream while the encryption status is
 * `ENABLING`, but the data is not encrypted. It can take up to 5 seconds after
 * the encryption status changes to `ENABLED` before all records written to the
 * Firehose stream are encrypted. To find out whether a record or a batch of records was
 * encrypted, check the response elements PutRecordOutput$Encrypted and
 * PutRecordBatchOutput$Encrypted, respectively.
 *
 * To check the encryption status of a Firehose stream, use DescribeDeliveryStream.
 *
 * Even if encryption is currently enabled for a Firehose stream, you can still invoke this
 * operation on it to change the ARN of the CMK or both its type and ARN. If you invoke this
 * method to change the CMK, and the old CMK is of type `CUSTOMER_MANAGED_CMK`,
 * Firehose schedules the grant it had on the old CMK for retirement. If the new
 * CMK is of type `CUSTOMER_MANAGED_CMK`, Firehose creates a grant
 * that enables it to use the new CMK to encrypt and decrypt data and to manage the
 * grant.
 *
 * For the KMS grant creation to be successful, the Firehose API operations
 * `StartDeliveryStreamEncryption` and `CreateDeliveryStream` should
 * not be called with session credentials that are more than 6 hours old.
 *
 * If a Firehose stream already has encryption enabled and then you invoke this operation
 * to change the ARN of the CMK or both its type and ARN and you get
 * `ENABLING_FAILED`, this only means that the attempt to change the CMK failed.
 * In this case, encryption remains enabled with the old CMK.
 *
 * If the encryption status of your Firehose stream is `ENABLING_FAILED`, you
 * can invoke this operation again with a valid CMK. The CMK must be enabled and the key
 * policy mustn't explicitly deny the permission for Firehose to invoke KMS
 * encrypt and decrypt operations.
 *
 * You can enable SSE for a Firehose stream only if it's a Firehose stream that uses
 * `DirectPut` as its source.
 *
 * The `StartDeliveryStreamEncryption` and
 * `StopDeliveryStreamEncryption` operations have a combined limit of 25 calls
 * per Firehose stream per 24 hours. For example, you reach the limit if you call
 * `StartDeliveryStreamEncryption` 13 times and
 * `StopDeliveryStreamEncryption` 12 times for the same Firehose stream in a
 * 24-hour period.
 */
export const startDeliveryStreamEncryption: API.OperationMethod<
  StartDeliveryStreamEncryptionInput,
  StartDeliveryStreamEncryptionOutput,
  StartDeliveryStreamEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DeliveryStreamName: 0,
      DeliveryStreamEncryptionConfigurationInput:
        i_DeliveryStreamEncryptionConfigurationInput,
    },
  },
  errors: [
    InvalidArgumentException,
    InvalidKMSResourceException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeliveryStreamEncryption",
})) as any;

export type StopDeliveryStreamEncryptionError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables server-side encryption (SSE) for the Firehose stream.
 *
 * This operation is asynchronous. It returns immediately. When you invoke it, Firehose first sets the encryption status of the stream to `DISABLING`, and then
 * to `DISABLED`. You can continue to read and write data to your stream while its
 * status is `DISABLING`. It can take up to 5 seconds after the encryption status
 * changes to `DISABLED` before all records written to the Firehose stream are no
 * longer subject to encryption. To find out whether a record or a batch of records was
 * encrypted, check the response elements PutRecordOutput$Encrypted and
 * PutRecordBatchOutput$Encrypted, respectively.
 *
 * To check the encryption state of a Firehose stream, use DescribeDeliveryStream.
 *
 * If SSE is enabled using a customer managed CMK and then you invoke
 * `StopDeliveryStreamEncryption`, Firehose schedules the related
 * KMS grant for retirement and then retires it after it ensures that it is finished
 * delivering records to the destination.
 *
 * The `StartDeliveryStreamEncryption` and
 * `StopDeliveryStreamEncryption` operations have a combined limit of 25 calls
 * per Firehose stream per 24 hours. For example, you reach the limit if you call
 * `StartDeliveryStreamEncryption` 13 times and
 * `StopDeliveryStreamEncryption` 12 times for the same Firehose stream in a
 * 24-hour period.
 */
export const stopDeliveryStreamEncryption: API.OperationMethod<
  StopDeliveryStreamEncryptionInput,
  StopDeliveryStreamEncryptionOutput,
  StopDeliveryStreamEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DeliveryStreamName: 0 } },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDeliveryStreamEncryption",
})) as any;

export type TagDeliveryStreamError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or updates tags for the specified Firehose stream. A tag is a key-value pair
 * that you can define and assign to Amazon Web Services resources. If you specify a tag that
 * already exists, the tag value is replaced with the value that you specify in the request.
 * Tags are metadata. For example, you can add friendly names and descriptions or other types
 * of information that can help you distinguish the Firehose stream. For more information
 * about tags, see Using Cost Allocation
 * Tags in the Amazon Web Services Billing and Cost Management User
 * Guide.
 *
 * Each Firehose stream can have up to 50 tags.
 *
 * This operation has a limit of five transactions per second per account.
 */
export const tagDeliveryStream: API.OperationMethod<
  TagDeliveryStreamInput,
  TagDeliveryStreamOutput,
  TagDeliveryStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeliveryStreamName: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagDeliveryStream",
})) as any;

export type UntagDeliveryStreamError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from the specified Firehose stream. Removed tags are deleted, and you
 * can't recover them after this operation successfully completes.
 *
 * If you specify a tag that doesn't exist, the operation ignores it.
 *
 * This operation has a limit of five transactions per second per account.
 */
export const untagDeliveryStream: API.OperationMethod<
  UntagDeliveryStreamInput,
  UntagDeliveryStreamOutput,
  UntagDeliveryStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DeliveryStreamName: 0, TagKeys: 0 } },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagDeliveryStream",
})) as any;

export type UpdateDestinationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified destination of the specified Firehose stream.
 *
 * Use this operation to change the destination type (for example, to replace the Amazon
 * S3 destination with Amazon Redshift) or change the parameters associated with a destination
 * (for example, to change the bucket name of the Amazon S3 destination). The update might not
 * occur immediately. The target Firehose stream remains active while the configurations are
 * updated, so data writes to the Firehose stream can continue during this process. The
 * updated configurations are usually effective within a few minutes.
 *
 * Switching between Amazon OpenSearch Service and other services is not supported. For
 * an Amazon OpenSearch Service destination, you can only update to another Amazon OpenSearch
 * Service destination.
 *
 * If the destination type is the same, Firehose merges the configuration
 * parameters specified with the destination configuration that already exists on the delivery
 * stream. If any of the parameters are not specified in the call, the existing values are
 * retained. For example, in the Amazon S3 destination, if EncryptionConfiguration is not specified, then the existing
 * `EncryptionConfiguration` is maintained on the destination.
 *
 * If the destination type is not the same, for example, changing the destination from
 * Amazon S3 to Amazon Redshift, Firehose does not merge any parameters. In this
 * case, all parameters must be specified.
 *
 * Firehose uses `CurrentDeliveryStreamVersionId` to avoid race
 * conditions and conflicting merges. This is a required field, and the service updates the
 * configuration only if the existing configuration has a version ID that matches. After the
 * update is applied successfully, the version ID is updated, and can be retrieved using DescribeDeliveryStream. Use the new version ID to set
 * `CurrentDeliveryStreamVersionId` in the next call.
 */
export const updateDestination: API.OperationMethod<
  UpdateDestinationInput,
  UpdateDestinationOutput,
  UpdateDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DeliveryStreamName: 0,
      CurrentDeliveryStreamVersionId: 0,
      DestinationId: 0,
      S3DestinationUpdate: i_S3DestinationUpdate,
      ExtendedS3DestinationUpdate: {
        RoleARN: 0,
        BucketARN: 0,
        Prefix: 0,
        ErrorOutputPrefix: 0,
        BufferingHints: i_BufferingHints,
        CompressionFormat: 0,
        EncryptionConfiguration: i_EncryptionConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        ProcessingConfiguration: i_ProcessingConfiguration,
        S3BackupMode: 0,
        S3BackupUpdate: i_S3DestinationUpdate,
        DataFormatConversionConfiguration: i_DataFormatConversionConfiguration,
        DynamicPartitioningConfiguration: i_DynamicPartitioningConfiguration,
        FileExtension: 0,
        CustomTimeZone: 0,
      },
      RedshiftDestinationUpdate: {
        RoleARN: 0,
        ClusterJDBCURL: 0,
        CopyCommand: i_CopyCommand,
        Username: 0,
        Password: 0,
        RetryOptions: i_RedshiftRetryOptions,
        S3Update: i_S3DestinationUpdate,
        ProcessingConfiguration: i_ProcessingConfiguration,
        S3BackupMode: 0,
        S3BackupUpdate: i_S3DestinationUpdate,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        SecretsManagerConfiguration: i_SecretsManagerConfiguration,
      },
      ElasticsearchDestinationUpdate: {
        RoleARN: 0,
        DomainARN: 0,
        ClusterEndpoint: 0,
        IndexName: 0,
        TypeName: 0,
        IndexRotationPeriod: 0,
        BufferingHints: i_ElasticsearchBufferingHints,
        RetryOptions: i_ElasticsearchRetryOptions,
        S3Update: i_S3DestinationUpdate,
        ProcessingConfiguration: i_ProcessingConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        DocumentIdOptions: i_DocumentIdOptions,
      },
      AmazonopensearchserviceDestinationUpdate: {
        RoleARN: 0,
        DomainARN: 0,
        ClusterEndpoint: 0,
        IndexName: 0,
        TypeName: 0,
        IndexRotationPeriod: 0,
        BufferingHints: i_AmazonopensearchserviceBufferingHints,
        RetryOptions: i_AmazonopensearchserviceRetryOptions,
        S3Update: i_S3DestinationUpdate,
        ProcessingConfiguration: i_ProcessingConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        DocumentIdOptions: i_DocumentIdOptions,
      },
      SplunkDestinationUpdate: {
        HECEndpoint: 0,
        HECEndpointType: 0,
        HECToken: 0,
        HECAcknowledgmentTimeoutInSeconds: 0,
        RetryOptions: i_SplunkRetryOptions,
        S3BackupMode: 0,
        S3Update: i_S3DestinationUpdate,
        ProcessingConfiguration: i_ProcessingConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        BufferingHints: i_SplunkBufferingHints,
        SecretsManagerConfiguration: i_SecretsManagerConfiguration,
      },
      HttpEndpointDestinationUpdate: {
        EndpointConfiguration: i_HttpEndpointConfiguration,
        BufferingHints: i_HttpEndpointBufferingHints,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        RequestConfiguration: i_HttpEndpointRequestConfiguration,
        ProcessingConfiguration: i_ProcessingConfiguration,
        RoleARN: 0,
        RetryOptions: i_HttpEndpointRetryOptions,
        S3BackupMode: 0,
        S3Update: i_S3DestinationUpdate,
        SecretsManagerConfiguration: i_SecretsManagerConfiguration,
      },
      AmazonOpenSearchServerlessDestinationUpdate: {
        RoleARN: 0,
        CollectionEndpoint: 0,
        IndexName: 0,
        BufferingHints: i_AmazonOpenSearchServerlessBufferingHints,
        RetryOptions: i_AmazonOpenSearchServerlessRetryOptions,
        S3Update: i_S3DestinationUpdate,
        ProcessingConfiguration: i_ProcessingConfiguration,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
      },
      SnowflakeDestinationUpdate: {
        AccountUrl: 0,
        PrivateKey: 0,
        KeyPassphrase: 0,
        User: 0,
        Database: 0,
        Schema: 0,
        Table: 0,
        SnowflakeRoleConfiguration: i_SnowflakeRoleConfiguration,
        DataLoadingOption: 0,
        MetaDataColumnName: 0,
        ContentColumnName: 0,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        ProcessingConfiguration: i_ProcessingConfiguration,
        RoleARN: 0,
        RetryOptions: i_SnowflakeRetryOptions,
        S3BackupMode: 0,
        S3Update: i_S3DestinationUpdate,
        SecretsManagerConfiguration: i_SecretsManagerConfiguration,
        BufferingHints: i_SnowflakeBufferingHints,
      },
      IcebergDestinationUpdate: {
        DestinationTableConfigurationList: D.list(
          i_DestinationTableConfiguration,
        ),
        SchemaEvolutionConfiguration: i_SchemaEvolutionConfiguration,
        TableCreationConfiguration: i_TableCreationConfiguration,
        BufferingHints: i_BufferingHints,
        CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
        ProcessingConfiguration: i_ProcessingConfiguration,
        S3BackupMode: 0,
        RetryOptions: i_RetryOptions,
        RoleARN: 0,
        AppendOnly: 0,
        CatalogConfiguration: i_CatalogConfiguration,
        S3Configuration: i_S3DestinationConfiguration,
      },
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDestination",
})) as any;

const i_AmazonOpenSearchServerlessBufferingHints: D.LazyStruct = () => ({
  IntervalInSeconds: 0,
  SizeInMBs: 0,
});
const i_AmazonOpenSearchServerlessRetryOptions: D.LazyStruct = () => ({
  DurationInSeconds: 0,
});
const i_AmazonopensearchserviceBufferingHints: D.LazyStruct = () => ({
  IntervalInSeconds: 0,
  SizeInMBs: 0,
});
const i_AmazonopensearchserviceRetryOptions: D.LazyStruct = () => ({
  DurationInSeconds: 0,
});
const i_BufferingHints: D.LazyStruct = () => ({
  SizeInMBs: 0,
  IntervalInSeconds: 0,
});
const i_CatalogConfiguration: D.LazyStruct = () => ({
  CatalogARN: 0,
  WarehouseLocation: 0,
});
const i_CloudWatchLoggingOptions: D.LazyStruct = () => ({
  Enabled: 0,
  LogGroupName: 0,
  LogStreamName: 0,
});
const i_CopyCommand: D.LazyStruct = () => ({
  DataTableName: 0,
  DataTableColumns: 0,
  CopyOptions: 0,
});
const i_DataFormatConversionConfiguration: D.LazyStruct = () => ({
  SchemaConfiguration: {
    RoleARN: 0,
    CatalogId: 0,
    DatabaseName: 0,
    TableName: 0,
    Region: 0,
    VersionId: 0,
  },
  InputFormatConfiguration: {
    Deserializer: {
      OpenXJsonSerDe: {
        ConvertDotsInJsonKeysToUnderscores: 0,
        CaseInsensitive: 0,
        ColumnToJsonKeyMappings: 0,
      },
      HiveJsonSerDe: { TimestampFormats: 0 },
    },
  },
  OutputFormatConfiguration: {
    Serializer: {
      ParquetSerDe: {
        BlockSizeBytes: 0,
        PageSizeBytes: 0,
        Compression: 0,
        EnableDictionaryCompression: 0,
        MaxPaddingBytes: 0,
        WriterVersion: 0,
      },
      OrcSerDe: {
        StripeSizeBytes: 0,
        BlockSizeBytes: 0,
        RowIndexStride: 0,
        EnablePadding: 0,
        PaddingTolerance: 0,
        Compression: 0,
        BloomFilterColumns: 0,
        BloomFilterFalsePositiveProbability: 0,
        DictionaryKeyThreshold: 0,
        FormatVersion: 0,
      },
    },
  },
  Enabled: 0,
});
const i_DeliveryStreamEncryptionConfigurationInput: D.LazyStruct = () => ({
  KeyARN: 0,
  KeyType: 0,
});
const i_DestinationTableConfiguration: D.LazyStruct = () => ({
  DestinationTableName: 0,
  DestinationDatabaseName: 0,
  UniqueKeys: 0,
  PartitionSpec: { Identity: D.list({ SourceName: 0 }) },
  S3ErrorOutputPrefix: 0,
});
const i_DocumentIdOptions: D.LazyStruct = () => ({
  DefaultDocumentIdFormat: 0,
});
const i_DynamicPartitioningConfiguration: D.LazyStruct = () => ({
  RetryOptions: i_RetryOptions,
  Enabled: 0,
});
const i_ElasticsearchBufferingHints: D.LazyStruct = () => ({
  IntervalInSeconds: 0,
  SizeInMBs: 0,
});
const i_ElasticsearchRetryOptions: D.LazyStruct = () => ({
  DurationInSeconds: 0,
});
const i_EncryptionConfiguration: D.LazyStruct = () => ({
  NoEncryptionConfig: 0,
  KMSEncryptionConfig: { AWSKMSKeyARN: 0 },
});
const i_HttpEndpointBufferingHints: D.LazyStruct = () => ({
  SizeInMBs: 0,
  IntervalInSeconds: 0,
});
const i_HttpEndpointConfiguration: D.LazyStruct = () => ({
  Url: 0,
  Name: 0,
  AccessKey: 0,
});
const i_HttpEndpointRequestConfiguration: D.LazyStruct = () => ({
  ContentEncoding: 0,
  CommonAttributes: D.list({ AttributeName: 0, AttributeValue: 0 }),
});
const i_HttpEndpointRetryOptions: D.LazyStruct = () => ({
  DurationInSeconds: 0,
});
const i_ProcessingConfiguration: D.LazyStruct = () => ({
  Enabled: 0,
  Processors: D.list({
    Type: 0,
    Parameters: D.list({ ParameterName: 0, ParameterValue: 0 }),
  }),
});
const i_Record: D.LazyStruct = () => ({ Data: 0 });
const i_RedshiftRetryOptions: D.LazyStruct = () => ({ DurationInSeconds: 0 });
const i_RetryOptions: D.LazyStruct = () => ({ DurationInSeconds: 0 });
const i_S3DestinationConfiguration: D.LazyStruct = () => ({
  RoleARN: 0,
  BucketARN: 0,
  Prefix: 0,
  ErrorOutputPrefix: 0,
  BufferingHints: i_BufferingHints,
  CompressionFormat: 0,
  EncryptionConfiguration: i_EncryptionConfiguration,
  CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
});
const i_S3DestinationUpdate: D.LazyStruct = () => ({
  RoleARN: 0,
  BucketARN: 0,
  Prefix: 0,
  ErrorOutputPrefix: 0,
  BufferingHints: i_BufferingHints,
  CompressionFormat: 0,
  EncryptionConfiguration: i_EncryptionConfiguration,
  CloudWatchLoggingOptions: i_CloudWatchLoggingOptions,
});
const i_SchemaEvolutionConfiguration: D.LazyStruct = () => ({ Enabled: 0 });
const i_SecretsManagerConfiguration: D.LazyStruct = () => ({
  SecretARN: 0,
  RoleARN: 0,
  Enabled: 0,
});
const i_SnowflakeBufferingHints: D.LazyStruct = () => ({
  SizeInMBs: 0,
  IntervalInSeconds: 0,
});
const i_SnowflakeRetryOptions: D.LazyStruct = () => ({ DurationInSeconds: 0 });
const i_SnowflakeRoleConfiguration: D.LazyStruct = () => ({
  Enabled: 0,
  SnowflakeRole: 0,
});
const i_SplunkBufferingHints: D.LazyStruct = () => ({
  IntervalInSeconds: 0,
  SizeInMBs: 0,
});
const i_SplunkRetryOptions: D.LazyStruct = () => ({ DurationInSeconds: 0 });
const i_TableCreationConfiguration: D.LazyStruct = () => ({ Enabled: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VpcConfiguration: D.LazyStruct = () => ({
  SubnetIds: 0,
  RoleARN: 0,
  SecurityGroupIds: 0,
});
