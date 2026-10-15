import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://firehose.amazonaws.com/doc/2015-08-04");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Firehose",
  serviceShapeName: "Firehose_20150804",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "firehose" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-08-04");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://firehose-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://firehose-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://firehose.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://firehose.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://firehose.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()("InvalidArgumentException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidKMSResourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidKMSResourceException>()(
    "InvalidKMSResourceException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
  ) {}
export class InvalidSourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidSourceException>()("InvalidSourceException", {
    code: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()("ResourceInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
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
export type ParquetCompression = "UNCOMPRESSED" | "GZIP" | "SNAPPY" | (string & {});
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
export type ElasticsearchS3BackupMode = "FailedDocumentsOnly" | "AllDocuments" | (string & {});
export type SubnetIdList = string[];
export type SecurityGroupIdList = string[];
export interface VpcConfiguration {
  SubnetIds: string[];
  RoleARN: string;
  SecurityGroupIds: string[];
}
export type DefaultDocumentIdFormat = "FIREHOSE_DEFAULT" | "NO_DOCUMENT_ID" | (string & {});
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
export type SplunkS3BackupMode = "FailedEventsOnly" | "AllEvents" | (string & {});
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
export type HttpEndpointS3BackupMode = "FailedDataOnly" | "AllData" | (string & {});
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
export type SnowflakeS3BackupMode = "FailedDataOnly" | "AllData" | (string & {});
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
export type SnapshotStatus = "IN_PROGRESS" | "COMPLETE" | "SUSPENDED" | (string & {});
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
  input: __S(365, __c11, 13) as any as S.Schema<CreateDeliveryStreamInput>,
  output: __S(366, __c11, 14) as any as S.Schema<CreateDeliveryStreamOutput>,
  errors: [
    InvalidArgumentException,
    InvalidKMSResourceException,
    LimitExceededException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeliveryStream",
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<DeleteDeliveryStreamInput>,
  output: __S(640, __c20, 0) as any as S.Schema<DeleteDeliveryStreamOutput>,
  errors: [ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeliveryStream",
}));

export type DescribeDeliveryStreamError = ResourceNotFoundException | CommonErrors;
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
  input: __S(0, __c0, 0) as any as S.Schema<DescribeDeliveryStreamInput>,
  output: __S(24, __c0, 24) as any as S.Schema<DescribeDeliveryStreamOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeliveryStream",
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<ListDeliveryStreamsInput>,
  output: __S(33, __c1, 1) as any as S.Schema<ListDeliveryStreamsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeliveryStreams",
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<ListTagsForDeliveryStreamInput>,
  output: __S(65, __c2, 1) as any as S.Schema<ListTagsForDeliveryStreamOutput>,
  errors: [InvalidArgumentException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForDeliveryStream",
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<PutRecordInput>,
  output: __S(97, __c3, 1) as any as S.Schema<PutRecordOutput>,
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
}));

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
  input: __S(161, __c5, 1) as any as S.Schema<PutRecordBatchInput>,
  output: __S(164, __c5, 4) as any as S.Schema<PutRecordBatchOutput>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<StartDeliveryStreamEncryptionInput>,
  output: __S(640, __c20, 0) as any as S.Schema<StartDeliveryStreamEncryptionOutput>,
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
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<StopDeliveryStreamEncryptionInput>,
  output: __S(640, __c20, 0) as any as S.Schema<StopDeliveryStreamEncryptionOutput>,
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDeliveryStreamEncryption",
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<TagDeliveryStreamInput>,
  output: __S(640, __c20, 0) as any as S.Schema<TagDeliveryStreamOutput>,
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagDeliveryStream",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<UntagDeliveryStreamInput>,
  output: __S(640, __c20, 0) as any as S.Schema<UntagDeliveryStreamOutput>,
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagDeliveryStream",
}));

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
  input: __S(329, __c10, 9) as any as S.Schema<UpdateDestinationInput>,
  output: __S(640, __c20, 0) as any as S.Schema<UpdateDestinationOutput>,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDestination",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeliveryStreamName: S.String,
          Limit: S.optional(S.Number),
          ExclusiveStartDestinationId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDeliveryStreamInput" });
    case 1:
      return S.suspend(() => S.Struct({ Type: S.String, Details: S.String })).annotate({
        identifier: "FailureDescription",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          KeyARN: S.optional(S.String),
          KeyType: S.optional(S.String),
          Status: S.optional(S.String),
          FailureDescription: S.optional(__S(1, __c0, 1)),
        }),
      ).annotate({ identifier: "DeliveryStreamEncryptionConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ ThroughputHintInMBs: S.optional(S.Number) })).annotate({
        identifier: "DirectPutSourceDescription",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          KinesisStreamARN: S.optional(S.String),
          RoleARN: S.optional(S.String),
          DeliveryStartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "KinesisStreamSourceDescription" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          MSKClusterARN: S.optional(S.String),
          TopicName: S.optional(S.String),
          AuthenticationConfiguration: S.optional(__S(384, __c12, 0)),
          DeliveryStartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReadFromTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MSKSourceDescription" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Table: S.String,
          RequestTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RequestedBy: S.String,
          Status: S.String,
          FailureDescription: S.optional(__S(1, __c0, 1)),
        }),
      ).annotate({ identifier: "DatabaseSnapshotInfo" });
    case 7:
      return S.Array(__S(6, __c0, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Port: S.optional(S.Number),
          SSLMode: S.optional(S.String),
          Databases: S.optional(__S(386, __c12, 2)),
          Tables: S.optional(__S(386, __c12, 2)),
          Columns: S.optional(__S(386, __c12, 2)),
          SurrogateKeys: S.optional(__S(416, __c13, 0)),
          SnapshotWatermarkTable: S.optional(S.String),
          SnapshotInfo: S.optional(__S(7, __c0, 7)),
          DatabaseSourceAuthenticationConfiguration: S.optional(__S(387, __c12, 3)),
          DatabaseSourceVPCConfiguration: S.optional(__S(388, __c12, 4)),
        }),
      ).annotate({ identifier: "DatabaseSourceDescription" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          DirectPutSourceDescription: S.optional(__S(3, __c0, 3)),
          KinesisStreamSourceDescription: S.optional(__S(4, __c0, 4)),
          MSKSourceDescription: S.optional(__S(5, __c0, 5)),
          DatabaseSourceDescription: S.optional(__S(8, __c0, 8)),
        }),
      ).annotate({ identifier: "SourceDescription" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.String,
          BucketARN: S.String,
          Prefix: S.optional(S.String),
          ErrorOutputPrefix: S.optional(S.String),
          BufferingHints: __S(448, __c14, 0),
          CompressionFormat: S.String,
          EncryptionConfiguration: __S(450, __c14, 2),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
        }),
      ).annotate({ identifier: "S3DestinationDescription" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.String,
          BucketARN: S.String,
          Prefix: S.optional(S.String),
          ErrorOutputPrefix: S.optional(S.String),
          BufferingHints: __S(448, __c14, 0),
          CompressionFormat: S.String,
          EncryptionConfiguration: __S(450, __c14, 2),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          S3BackupDescription: S.optional(__S(10, __c0, 10)),
          DataFormatConversionConfiguration: S.optional(__S(467, __c14, 19)),
          DynamicPartitioningConfiguration: S.optional(__S(469, __c14, 21)),
          FileExtension: S.optional(S.String),
          CustomTimeZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExtendedS3DestinationDescription" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.String,
          ClusterJDBCURL: S.String,
          CopyCommand: __S(470, __c14, 22),
          Username: S.optional(SensitiveString),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3DestinationDescription: __S(10, __c0, 10),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          S3BackupDescription: S.optional(__S(10, __c0, 10)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "RedshiftDestinationDescription" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: __S(416, __c13, 0),
          RoleARN: S.String,
          SecurityGroupIds: __S(416, __c13, 0),
          VpcId: S.String,
        }),
      ).annotate({ identifier: "VpcConfigurationDescription" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.optional(S.String),
          DomainARN: S.optional(S.String),
          ClusterEndpoint: S.optional(S.String),
          IndexName: S.optional(S.String),
          TypeName: S.optional(S.String),
          IndexRotationPeriod: S.optional(S.String),
          BufferingHints: S.optional(__S(472, __c14, 24)),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3DestinationDescription: S.optional(__S(10, __c0, 10)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          VpcConfigurationDescription: S.optional(__S(13, __c0, 13)),
          DocumentIdOptions: S.optional(__S(473, __c14, 25)),
        }),
      ).annotate({ identifier: "ElasticsearchDestinationDescription" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          HECEndpoint: S.optional(S.String),
          HECEndpointType: S.optional(S.String),
          HECToken: S.optional(SensitiveString),
          HECAcknowledgmentTimeoutInSeconds: S.optional(S.Number),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3DestinationDescription: S.optional(__S(10, __c0, 10)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          BufferingHints: S.optional(__S(472, __c14, 24)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "SplunkDestinationDescription" });
    case 16:
      return S.suspend(() =>
        S.Struct({ Url: S.optional(SensitiveString), Name: S.optional(S.String) }),
      ).annotate({ identifier: "HttpEndpointDescription" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          EndpointConfiguration: S.optional(__S(16, __c0, 16)),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          RequestConfiguration: S.optional(__S(476, __c14, 28)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          RoleARN: S.optional(S.String),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3DestinationDescription: S.optional(__S(10, __c0, 10)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "HttpEndpointDestinationDescription" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          AccountUrl: S.optional(SensitiveString),
          User: S.optional(SensitiveString),
          Database: S.optional(SensitiveString),
          Schema: S.optional(SensitiveString),
          Table: S.optional(SensitiveString),
          SnowflakeRoleConfiguration: S.optional(__S(477, __c14, 29)),
          DataLoadingOption: S.optional(S.String),
          MetaDataColumnName: S.optional(SensitiveString),
          ContentColumnName: S.optional(SensitiveString),
          SnowflakeVpcConfiguration: S.optional(__S(385, __c12, 1)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          RoleARN: S.optional(S.String),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3DestinationDescription: S.optional(__S(10, __c0, 10)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
          BufferingHints: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "SnowflakeDestinationDescription" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.optional(S.String),
          CollectionEndpoint: S.optional(S.String),
          IndexName: S.optional(S.String),
          BufferingHints: S.optional(__S(472, __c14, 24)),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3DestinationDescription: S.optional(__S(10, __c0, 10)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          VpcConfigurationDescription: S.optional(__S(13, __c0, 13)),
        }),
      ).annotate({ identifier: "AmazonOpenSearchServerlessDestinationDescription" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          DestinationTableConfigurationList: S.optional(__S(482, __c15, 2)),
          SchemaEvolutionConfiguration: S.optional(__S(483, __c15, 3)),
          TableCreationConfiguration: S.optional(__S(483, __c15, 3)),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          RoleARN: S.optional(S.String),
          AppendOnly: S.optional(S.Boolean),
          CatalogConfiguration: S.optional(__S(484, __c15, 4)),
          S3DestinationDescription: S.optional(__S(10, __c0, 10)),
        }),
      ).annotate({ identifier: "IcebergDestinationDescription" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          DestinationId: S.String,
          S3DestinationDescription: S.optional(__S(10, __c0, 10)),
          ExtendedS3DestinationDescription: S.optional(__S(11, __c0, 11)),
          RedshiftDestinationDescription: S.optional(__S(12, __c0, 12)),
          ElasticsearchDestinationDescription: S.optional(__S(14, __c0, 14)),
          AmazonopensearchserviceDestinationDescription: S.optional(__S(14, __c0, 14)),
          SplunkDestinationDescription: S.optional(__S(15, __c0, 15)),
          HttpEndpointDestinationDescription: S.optional(__S(17, __c0, 17)),
          SnowflakeDestinationDescription: S.optional(__S(18, __c0, 18)),
          AmazonOpenSearchServerlessDestinationDescription: S.optional(__S(19, __c0, 19)),
          IcebergDestinationDescription: S.optional(__S(20, __c0, 20)),
        }),
      ).annotate({ identifier: "DestinationDescription" });
    case 22:
      return S.Array(__S(21, __c0, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          DeliveryStreamName: S.String,
          DeliveryStreamARN: S.String,
          DeliveryStreamStatus: S.String,
          FailureDescription: S.optional(__S(1, __c0, 1)),
          DeliveryStreamEncryptionConfiguration: S.optional(__S(2, __c0, 2)),
          DeliveryStreamType: S.String,
          VersionId: S.String,
          CreateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Source: S.optional(__S(9, __c0, 9)),
          Destinations: __S(22, __c0, 22),
          HasMoreDestinations: S.Boolean,
        }),
      ).annotate({ identifier: "DeliveryStreamDescription" });
    case 24:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamDescription: __S(23, __c0, 23) }).pipe(ns),
      ).annotate({ identifier: "DescribeDeliveryStreamOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Limit: S.optional(S.Number),
          DeliveryStreamType: S.optional(S.String),
          ExclusiveStartDeliveryStreamName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDeliveryStreamsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeliveryStreamNames: __S(416, __c13, 0),
          HasMoreDeliveryStreams: S.Boolean,
        }).pipe(ns),
      ).annotate({ identifier: "ListDeliveryStreamsOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeliveryStreamName: S.String,
          ExclusiveStartTagKey: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForDeliveryStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: __S(513, __c16, 1), HasMoreTags: S.Boolean }).pipe(ns),
      ).annotate({ identifier: "ListTagsForDeliveryStreamOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamName: S.String, Record: __S(128, __c4, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutRecordInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RecordId: S.String, Encrypted: S.optional(S.Boolean) }).pipe(ns),
      ).annotate({ identifier: "PutRecordOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Data: T.Blob })).annotate({ identifier: "Record" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(128, __c4, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamName: S.String, Records: __S(160, __c5, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutRecordBatchInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecordId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutRecordBatchResponseEntry" });
    case 3:
      return S.Array(__S(162, __c5, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          FailedPutCount: S.Number,
          Encrypted: S.optional(S.Boolean),
          RequestResponses: __S(163, __c5, 3),
        }).pipe(ns),
      ).annotate({ identifier: "PutRecordBatchOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeliveryStreamName: S.String,
          DeliveryStreamEncryptionConfigurationInput: S.optional(__S(544, __c17, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDeliveryStreamEncryptionInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopDeliveryStreamEncryptionInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamName: S.String, Tags: __S(513, __c16, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagDeliveryStreamInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamName: S.String, TagKeys: __S(416, __c13, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagDeliveryStreamInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.optional(S.String),
          BucketARN: S.optional(S.String),
          Prefix: S.optional(S.String),
          ErrorOutputPrefix: S.optional(S.String),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CompressionFormat: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(450, __c14, 2)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
        }),
      ).annotate({ identifier: "S3DestinationUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.optional(S.String),
          BucketARN: S.optional(S.String),
          Prefix: S.optional(S.String),
          ErrorOutputPrefix: S.optional(S.String),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CompressionFormat: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(450, __c14, 2)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          S3BackupUpdate: S.optional(__S(320, __c10, 0)),
          DataFormatConversionConfiguration: S.optional(__S(467, __c14, 19)),
          DynamicPartitioningConfiguration: S.optional(__S(469, __c14, 21)),
          FileExtension: S.optional(S.String),
          CustomTimeZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExtendedS3DestinationUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.optional(S.String),
          ClusterJDBCURL: S.optional(S.String),
          CopyCommand: S.optional(__S(470, __c14, 22)),
          Username: S.optional(SensitiveString),
          Password: S.optional(SensitiveString),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3Update: S.optional(__S(320, __c10, 0)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          S3BackupUpdate: S.optional(__S(320, __c10, 0)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "RedshiftDestinationUpdate" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.optional(S.String),
          DomainARN: S.optional(S.String),
          ClusterEndpoint: S.optional(S.String),
          IndexName: S.optional(S.String),
          TypeName: S.optional(S.String),
          IndexRotationPeriod: S.optional(S.String),
          BufferingHints: S.optional(__S(472, __c14, 24)),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3Update: S.optional(__S(320, __c10, 0)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          DocumentIdOptions: S.optional(__S(473, __c14, 25)),
        }),
      ).annotate({ identifier: "ElasticsearchDestinationUpdate" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          HECEndpoint: S.optional(S.String),
          HECEndpointType: S.optional(S.String),
          HECToken: S.optional(SensitiveString),
          HECAcknowledgmentTimeoutInSeconds: S.optional(S.Number),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3Update: S.optional(__S(320, __c10, 0)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          BufferingHints: S.optional(__S(472, __c14, 24)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "SplunkDestinationUpdate" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          EndpointConfiguration: S.optional(__S(577, __c18, 1)),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          RequestConfiguration: S.optional(__S(476, __c14, 28)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          RoleARN: S.optional(S.String),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3Update: S.optional(__S(320, __c10, 0)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "HttpEndpointDestinationUpdate" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.optional(S.String),
          CollectionEndpoint: S.optional(S.String),
          IndexName: S.optional(S.String),
          BufferingHints: S.optional(__S(472, __c14, 24)),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3Update: S.optional(__S(320, __c10, 0)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
        }),
      ).annotate({ identifier: "AmazonOpenSearchServerlessDestinationUpdate" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AccountUrl: S.optional(SensitiveString),
          PrivateKey: S.optional(SensitiveString),
          KeyPassphrase: S.optional(SensitiveString),
          User: S.optional(SensitiveString),
          Database: S.optional(SensitiveString),
          Schema: S.optional(SensitiveString),
          Table: S.optional(SensitiveString),
          SnowflakeRoleConfiguration: S.optional(__S(477, __c14, 29)),
          DataLoadingOption: S.optional(S.String),
          MetaDataColumnName: S.optional(SensitiveString),
          ContentColumnName: S.optional(SensitiveString),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          RoleARN: S.optional(S.String),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3Update: S.optional(__S(320, __c10, 0)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
          BufferingHints: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "SnowflakeDestinationUpdate" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DestinationTableConfigurationList: S.optional(__S(482, __c15, 2)),
          SchemaEvolutionConfiguration: S.optional(__S(483, __c15, 3)),
          TableCreationConfiguration: S.optional(__S(483, __c15, 3)),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          RoleARN: S.optional(S.String),
          AppendOnly: S.optional(S.Boolean),
          CatalogConfiguration: S.optional(__S(484, __c15, 4)),
          S3Configuration: S.optional(__S(576, __c18, 0)),
        }),
      ).annotate({ identifier: "IcebergDestinationUpdate" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          DeliveryStreamName: S.String,
          CurrentDeliveryStreamVersionId: S.String,
          DestinationId: S.String,
          S3DestinationUpdate: S.optional(__S(320, __c10, 0)),
          ExtendedS3DestinationUpdate: S.optional(__S(321, __c10, 1)),
          RedshiftDestinationUpdate: S.optional(__S(322, __c10, 2)),
          ElasticsearchDestinationUpdate: S.optional(__S(323, __c10, 3)),
          AmazonopensearchserviceDestinationUpdate: S.optional(__S(323, __c10, 3)),
          SplunkDestinationUpdate: S.optional(__S(324, __c10, 4)),
          HttpEndpointDestinationUpdate: S.optional(__S(325, __c10, 5)),
          AmazonOpenSearchServerlessDestinationUpdate: S.optional(__S(326, __c10, 6)),
          SnowflakeDestinationUpdate: S.optional(__S(327, __c10, 7)),
          IcebergDestinationUpdate: S.optional(__S(328, __c10, 8)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDestinationInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ThroughputHintInMBs: S.Number })).annotate({
        identifier: "DirectPutSourceConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ KinesisStreamARN: S.String, RoleARN: S.String })).annotate({
        identifier: "KinesisStreamSourceConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.String,
          BucketARN: S.String,
          Prefix: S.optional(S.String),
          ErrorOutputPrefix: S.optional(S.String),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CompressionFormat: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(450, __c14, 2)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          S3BackupConfiguration: S.optional(__S(576, __c18, 0)),
          DataFormatConversionConfiguration: S.optional(__S(467, __c14, 19)),
          DynamicPartitioningConfiguration: S.optional(__S(469, __c14, 21)),
          FileExtension: S.optional(S.String),
          CustomTimeZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExtendedS3DestinationConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.String,
          ClusterJDBCURL: S.String,
          CopyCommand: __S(470, __c14, 22),
          Username: S.optional(SensitiveString),
          Password: S.optional(SensitiveString),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3Configuration: __S(576, __c18, 0),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          S3BackupConfiguration: S.optional(__S(576, __c18, 0)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "RedshiftDestinationConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: __S(416, __c13, 0),
          RoleARN: S.String,
          SecurityGroupIds: __S(416, __c13, 0),
        }),
      ).annotate({ identifier: "VpcConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.String,
          DomainARN: S.optional(S.String),
          ClusterEndpoint: S.optional(S.String),
          IndexName: S.String,
          TypeName: S.optional(S.String),
          IndexRotationPeriod: S.optional(S.String),
          BufferingHints: S.optional(__S(472, __c14, 24)),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3Configuration: __S(576, __c18, 0),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          VpcConfiguration: S.optional(__S(356, __c11, 4)),
          DocumentIdOptions: S.optional(__S(473, __c14, 25)),
        }),
      ).annotate({ identifier: "ElasticsearchDestinationConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          HECEndpoint: S.String,
          HECEndpointType: S.String,
          HECToken: S.optional(SensitiveString),
          HECAcknowledgmentTimeoutInSeconds: S.optional(S.Number),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3Configuration: __S(576, __c18, 0),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          BufferingHints: S.optional(__S(472, __c14, 24)),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "SplunkDestinationConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          EndpointConfiguration: __S(577, __c18, 1),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          RequestConfiguration: S.optional(__S(476, __c14, 28)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          RoleARN: S.optional(S.String),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3Configuration: __S(576, __c18, 0),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "HttpEndpointDestinationConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.String,
          CollectionEndpoint: S.optional(S.String),
          IndexName: S.String,
          BufferingHints: S.optional(__S(472, __c14, 24)),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3Configuration: __S(576, __c18, 0),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          VpcConfiguration: S.optional(__S(356, __c11, 4)),
        }),
      ).annotate({ identifier: "AmazonOpenSearchServerlessDestinationConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          MSKClusterARN: S.String,
          TopicName: S.String,
          AuthenticationConfiguration: __S(384, __c12, 0),
          ReadFromTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MSKSourceConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AccountUrl: SensitiveString,
          PrivateKey: S.optional(SensitiveString),
          KeyPassphrase: S.optional(SensitiveString),
          User: S.optional(SensitiveString),
          Database: SensitiveString,
          Schema: SensitiveString,
          Table: SensitiveString,
          SnowflakeRoleConfiguration: S.optional(__S(477, __c14, 29)),
          DataLoadingOption: S.optional(S.String),
          MetaDataColumnName: S.optional(SensitiveString),
          ContentColumnName: S.optional(SensitiveString),
          SnowflakeVpcConfiguration: S.optional(__S(385, __c12, 1)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          RoleARN: S.String,
          RetryOptions: S.optional(__S(468, __c14, 20)),
          S3BackupMode: S.optional(S.String),
          S3Configuration: __S(576, __c18, 0),
          SecretsManagerConfiguration: S.optional(__S(471, __c14, 23)),
          BufferingHints: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "SnowflakeDestinationConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          DestinationTableConfigurationList: S.optional(__S(482, __c15, 2)),
          SchemaEvolutionConfiguration: S.optional(__S(483, __c15, 3)),
          TableCreationConfiguration: S.optional(__S(483, __c15, 3)),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
          ProcessingConfiguration: S.optional(__S(456, __c14, 8)),
          S3BackupMode: S.optional(S.String),
          RetryOptions: S.optional(__S(468, __c14, 20)),
          RoleARN: S.String,
          AppendOnly: S.optional(S.Boolean),
          CatalogConfiguration: __S(484, __c15, 4),
          S3Configuration: __S(576, __c18, 0),
        }),
      ).annotate({ identifier: "IcebergDestinationConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Endpoint: S.String,
          Port: S.Number,
          SSLMode: S.optional(S.String),
          Databases: __S(386, __c12, 2),
          Tables: __S(386, __c12, 2),
          Columns: S.optional(__S(386, __c12, 2)),
          SurrogateKeys: S.optional(__S(416, __c13, 0)),
          SnapshotWatermarkTable: S.String,
          DatabaseSourceAuthenticationConfiguration: __S(387, __c12, 3),
          DatabaseSourceVPCConfiguration: __S(388, __c12, 4),
        }),
      ).annotate({ identifier: "DatabaseSourceConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          DeliveryStreamName: S.String,
          DeliveryStreamType: S.optional(S.String),
          DirectPutSourceConfiguration: S.optional(__S(352, __c11, 0)),
          KinesisStreamSourceConfiguration: S.optional(__S(353, __c11, 1)),
          DeliveryStreamEncryptionConfigurationInput: S.optional(__S(544, __c17, 0)),
          S3DestinationConfiguration: S.optional(__S(576, __c18, 0)),
          ExtendedS3DestinationConfiguration: S.optional(__S(354, __c11, 2)),
          RedshiftDestinationConfiguration: S.optional(__S(355, __c11, 3)),
          ElasticsearchDestinationConfiguration: S.optional(__S(357, __c11, 5)),
          AmazonopensearchserviceDestinationConfiguration: S.optional(__S(357, __c11, 5)),
          SplunkDestinationConfiguration: S.optional(__S(358, __c11, 6)),
          HttpEndpointDestinationConfiguration: S.optional(__S(359, __c11, 7)),
          Tags: S.optional(__S(513, __c16, 1)),
          AmazonOpenSearchServerlessDestinationConfiguration: S.optional(__S(360, __c11, 8)),
          MSKSourceConfiguration: S.optional(__S(361, __c11, 9)),
          SnowflakeDestinationConfiguration: S.optional(__S(362, __c11, 10)),
          IcebergDestinationConfiguration: S.optional(__S(363, __c11, 11)),
          DatabaseSourceConfiguration: S.optional(__S(364, __c11, 12)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDeliveryStreamInput" });
    case 14:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamARN: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateDeliveryStreamOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RoleARN: S.String, Connectivity: S.String })).annotate({
        identifier: "AuthenticationConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ PrivateLinkVpceId: SensitiveString })).annotate({
        identifier: "SnowflakeVpcConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Include: S.optional(__S(416, __c13, 0)),
          Exclude: S.optional(__S(416, __c13, 0)),
        }),
      ).annotate({ identifier: "DatabaseList" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SecretsManagerConfiguration: __S(471, __c14, 23) }),
      ).annotate({ identifier: "DatabaseSourceAuthenticationConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ VpcEndpointServiceName: S.String })).annotate({
        identifier: "DatabaseSourceVPCConfiguration",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SizeInMBs: S.optional(S.Number), IntervalInSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "BufferingHints" });
    case 1:
      return S.suspend(() => S.Struct({ AWSKMSKeyARN: S.String })).annotate({
        identifier: "KMSEncryptionConfig",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NoEncryptionConfig: S.optional(S.String),
          KMSEncryptionConfig: S.optional(__S(449, __c14, 1)),
        }),
      ).annotate({ identifier: "EncryptionConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          LogGroupName: S.optional(S.String),
          LogStreamName: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudWatchLoggingOptions" });
    case 4:
      return S.suspend(() =>
        S.Struct({ ParameterName: S.String, ParameterValue: S.String }),
      ).annotate({ identifier: "ProcessorParameter" });
    case 5:
      return S.Array(__S(452, __c14, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Type: S.String, Parameters: S.optional(__S(453, __c14, 5)) }),
      ).annotate({ identifier: "Processor" });
    case 7:
      return S.Array(__S(454, __c14, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), Processors: S.optional(__S(455, __c14, 7)) }),
      ).annotate({ identifier: "ProcessingConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.optional(S.String),
          CatalogId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          Region: S.optional(S.String),
          VersionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SchemaConfiguration" });
    case 10:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 11:
      return S.suspend(() =>
        S.Struct({
          ConvertDotsInJsonKeysToUnderscores: S.optional(S.Boolean),
          CaseInsensitive: S.optional(S.Boolean),
          ColumnToJsonKeyMappings: S.optional(__S(458, __c14, 10)),
        }),
      ).annotate({ identifier: "OpenXJsonSerDe" });
    case 12:
      return S.suspend(() =>
        S.Struct({ TimestampFormats: S.optional(__S(416, __c13, 0)) }),
      ).annotate({ identifier: "HiveJsonSerDe" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          OpenXJsonSerDe: S.optional(__S(459, __c14, 11)),
          HiveJsonSerDe: S.optional(__S(460, __c14, 12)),
        }),
      ).annotate({ identifier: "Deserializer" });
    case 14:
      return S.suspend(() => S.Struct({ Deserializer: S.optional(__S(461, __c14, 13)) })).annotate({
        identifier: "InputFormatConfiguration",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({
          BlockSizeBytes: S.optional(S.Number),
          PageSizeBytes: S.optional(S.Number),
          Compression: S.optional(S.String),
          EnableDictionaryCompression: S.optional(S.Boolean),
          MaxPaddingBytes: S.optional(S.Number),
          WriterVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "ParquetSerDe" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          StripeSizeBytes: S.optional(S.Number),
          BlockSizeBytes: S.optional(S.Number),
          RowIndexStride: S.optional(S.Number),
          EnablePadding: S.optional(S.Boolean),
          PaddingTolerance: S.optional(S.Number),
          Compression: S.optional(S.String),
          BloomFilterColumns: S.optional(__S(416, __c13, 0)),
          BloomFilterFalsePositiveProbability: S.optional(S.Number),
          DictionaryKeyThreshold: S.optional(S.Number),
          FormatVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "OrcSerDe" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          ParquetSerDe: S.optional(__S(463, __c14, 15)),
          OrcSerDe: S.optional(__S(464, __c14, 16)),
        }),
      ).annotate({ identifier: "Serializer" });
    case 18:
      return S.suspend(() => S.Struct({ Serializer: S.optional(__S(465, __c14, 17)) })).annotate({
        identifier: "OutputFormatConfiguration",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          SchemaConfiguration: S.optional(__S(457, __c14, 9)),
          InputFormatConfiguration: S.optional(__S(462, __c14, 14)),
          OutputFormatConfiguration: S.optional(__S(466, __c14, 18)),
          Enabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DataFormatConversionConfiguration" });
    case 20:
      return S.suspend(() => S.Struct({ DurationInSeconds: S.optional(S.Number) })).annotate({
        identifier: "RetryOptions",
      });
    case 21:
      return S.suspend(() =>
        S.Struct({ RetryOptions: S.optional(__S(468, __c14, 20)), Enabled: S.optional(S.Boolean) }),
      ).annotate({ identifier: "DynamicPartitioningConfiguration" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          DataTableName: S.String,
          DataTableColumns: S.optional(S.String),
          CopyOptions: S.optional(S.String),
        }),
      ).annotate({ identifier: "CopyCommand" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          SecretARN: S.optional(S.String),
          RoleARN: S.optional(S.String),
          Enabled: S.Boolean,
        }),
      ).annotate({ identifier: "SecretsManagerConfiguration" });
    case 24:
      return S.suspend(() =>
        S.Struct({ IntervalInSeconds: S.optional(S.Number), SizeInMBs: S.optional(S.Number) }),
      ).annotate({ identifier: "ElasticsearchBufferingHints" });
    case 25:
      return S.suspend(() => S.Struct({ DefaultDocumentIdFormat: S.String })).annotate({
        identifier: "DocumentIdOptions",
      });
    case 26:
      return S.suspend(() =>
        S.Struct({ AttributeName: SensitiveString, AttributeValue: SensitiveString }),
      ).annotate({ identifier: "HttpEndpointCommonAttribute" });
    case 27:
      return S.Array(__S(474, __c14, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          ContentEncoding: S.optional(S.String),
          CommonAttributes: S.optional(__S(475, __c14, 27)),
        }),
      ).annotate({ identifier: "HttpEndpointRequestConfiguration" });
    case 29:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), SnowflakeRole: S.optional(SensitiveString) }),
      ).annotate({ identifier: "SnowflakeRoleConfiguration" });
    case 30:
      return S.suspend(() => S.Struct({ SourceName: S.String })).annotate({
        identifier: "PartitionField",
      });
    case 31:
      return S.Array(__S(478, __c14, 30));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Identity: S.optional(__S(479, __c14, 31)) })).annotate({
        identifier: "PartitionSpec",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DestinationTableName: S.String,
          DestinationDatabaseName: S.String,
          UniqueKeys: S.optional(__S(416, __c13, 0)),
          PartitionSpec: S.optional(__S(480, __c15, 0)),
          S3ErrorOutputPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "DestinationTableConfiguration" });
    case 2:
      return S.Array(__S(481, __c15, 1));
    case 3:
      return S.suspend(() => S.Struct({ Enabled: S.Boolean })).annotate({
        identifier: "SchemaEvolutionConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ CatalogARN: S.optional(S.String), WarehouseLocation: S.optional(S.String) }),
      ).annotate({ identifier: "CatalogConfiguration" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(512, __c16, 0));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KeyARN: S.optional(S.String), KeyType: S.String }),
      ).annotate({ identifier: "DeliveryStreamEncryptionConfigurationInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RoleARN: S.String,
          BucketARN: S.String,
          Prefix: S.optional(S.String),
          ErrorOutputPrefix: S.optional(S.String),
          BufferingHints: S.optional(__S(448, __c14, 0)),
          CompressionFormat: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(450, __c14, 2)),
          CloudWatchLoggingOptions: S.optional(__S(451, __c14, 3)),
        }),
      ).annotate({ identifier: "S3DestinationConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Url: SensitiveString,
          Name: S.optional(S.String),
          AccessKey: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "HttpEndpointConfiguration" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamName: S.String, AllowForceDelete: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeliveryStreamInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDeliveryStreamOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
