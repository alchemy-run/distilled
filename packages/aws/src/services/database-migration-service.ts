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
  sdkId: "Database Migration Service",
  target: "AmazonDMSv20160101",
  version: "2016-01-01",
  sigv4: "dms",
  protocol: awsJson1_1Protocol,
  xmlns: "http://dms.amazonaws.com/doc/2016-01-01/",
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
                `https://dms-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://dms.${Region}.amazonaws.com`);
              }
              if (_.getAttr(PartitionResult, "name") === "aws-iso") {
                return e(`https://dms.${Region}.c2s.ic.gov`);
              }
              if (_.getAttr(PartitionResult, "name") === "aws-iso-b") {
                return e(`https://dms.${Region}.sc2s.sgov.gov`);
              }
              return e(
                `https://dms-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://dms.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://dms.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedFault
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedFault", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class CollectorNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CollectorNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class FailedDependencyFault
  extends /*@__PURE__*/ TE.TaggedError("FailedDependencyFault")<{
    readonly message?: string;
  }> {}
export class InsufficientResourceCapacityFault
  extends /*@__PURE__*/ TE.TaggedError("InsufficientResourceCapacityFault")<{
    readonly message?: string;
  }> {}
export class InvalidCertificateFault
  extends /*@__PURE__*/ TE.TaggedError("InvalidCertificateFault")<{
    readonly message?: string;
  }> {}
export class InvalidOperationFault
  extends /*@__PURE__*/ TE.TaggedError("InvalidOperationFault")<{
    readonly message?: string;
  }> {}
export class InvalidResourceStateFault
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceStateFault")<{
    readonly message?: string;
  }> {}
export class InvalidSubnet
  extends /*@__PURE__*/ TE.TaggedError("InvalidSubnet")<{
    readonly message?: string;
  }> {}
export class KMSAccessDeniedFault
  extends /*@__PURE__*/ TE.TaggedError("KMSAccessDeniedFault", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class KMSDisabledFault
  extends /*@__PURE__*/ TE.TaggedError("KMSDisabledFault")<{
    readonly message?: string;
  }> {}
export class KMSFault
  extends /*@__PURE__*/ TE.TaggedError("KMSFault")<{
    readonly message?: string;
  }> {}
export class KMSInvalidStateFault
  extends /*@__PURE__*/ TE.TaggedError("KMSInvalidStateFault")<{
    readonly message?: string;
  }> {}
export class KMSKeyNotAccessibleFault
  extends /*@__PURE__*/ TE.TaggedError("KMSKeyNotAccessibleFault")<{
    readonly message?: string;
  }> {}
export class KMSNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError("KMSNotFoundFault")<{
    readonly message?: string;
  }> {}
export class KMSThrottlingFault
  extends /*@__PURE__*/ TE.TaggedError("KMSThrottlingFault")<{
    readonly message?: string;
  }> {}
export class ReplicationSubnetGroupDoesNotCoverEnoughAZs
  extends /*@__PURE__*/ TE.TaggedError(
    "ReplicationSubnetGroupDoesNotCoverEnoughAZs",
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError("ResourceAlreadyExistsFault", [
    "AlreadyExistsError",
  ])<{ readonly message?: string; readonly resourceArn?: string }> {}
export class ResourceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundFault")<{
    readonly message?: string;
  }> {}
export class ResourceQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError("ResourceQuotaExceededFault")<{
    readonly message?: string;
  }> {}
export class S3AccessDeniedFault
  extends /*@__PURE__*/ TE.TaggedError("S3AccessDeniedFault", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class S3ResourceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError("S3ResourceNotFoundFault")<{
    readonly message?: string;
  }> {}
export class SNSInvalidTopicFault
  extends /*@__PURE__*/ TE.TaggedError("SNSInvalidTopicFault")<{
    readonly message?: string;
  }> {}
export class SNSNoAuthorizationFault
  extends /*@__PURE__*/ TE.TaggedError("SNSNoAuthorizationFault")<{
    readonly message?: string;
  }> {}
export class StorageQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError("StorageQuotaExceededFault")<{
    readonly message?: string;
  }> {}
export class SubnetAlreadyInUse
  extends /*@__PURE__*/ TE.TaggedError("SubnetAlreadyInUse", [
    "DependencyViolationError",
  ])<{ readonly message?: string }> {}
export class UpgradeDependencyFailureFault
  extends /*@__PURE__*/ TE.TaggedError("UpgradeDependencyFailureFault")<{
    readonly message?: string;
  }> {}
export interface Tag {
  Key?: string;
  Value?: string;
  ResourceArn?: string;
}
export type TagList = Tag[];
export interface AddTagsToResourceMessage {
  ResourceArn: string;
  Tags: Tag[];
}
export interface AddTagsToResourceResponse {}
export interface ApplyPendingMaintenanceActionMessage {
  ReplicationInstanceArn: string;
  ApplyAction: string;
  OptInType: string;
}
export interface PendingMaintenanceAction {
  Action?: string;
  AutoAppliedAfterDate?: Date;
  ForcedApplyDate?: Date;
  OptInStatus?: string;
  CurrentApplyDate?: Date;
  Description?: string;
}
export type PendingMaintenanceActionDetails = PendingMaintenanceAction[];
export interface ResourcePendingMaintenanceActions {
  ResourceIdentifier?: string;
  PendingMaintenanceActionDetails?: PendingMaintenanceAction[];
}
export interface ApplyPendingMaintenanceActionResponse {
  ResourcePendingMaintenanceActions?: ResourcePendingMaintenanceActions;
}
export interface RecommendationSettings {
  InstanceSizingType: string;
  WorkloadType: string;
}
export interface StartRecommendationsRequestEntry {
  DatabaseId: string;
  Settings: RecommendationSettings;
}
export type StartRecommendationsRequestEntryList =
  StartRecommendationsRequestEntry[];
export interface BatchStartRecommendationsRequest {
  Data?: StartRecommendationsRequestEntry[];
}
export interface BatchStartRecommendationsErrorEntry {
  DatabaseId?: string;
  Message?: string;
  Code?: string;
}
export type BatchStartRecommendationsErrorEntryList =
  BatchStartRecommendationsErrorEntry[];
export interface BatchStartRecommendationsResponse {
  ErrorEntries?: BatchStartRecommendationsErrorEntry[];
}
export type MigrationProjectIdentifier = string;
export interface CancelMetadataModelConversionMessage {
  MigrationProjectIdentifier: string;
  RequestIdentifier: string;
}
export interface DefaultErrorDetails {
  Message?: string;
}
export type ErrorDetails = { defaultErrorDetails: DefaultErrorDetails };
export interface ExportSqlDetails {
  S3ObjectKey?: string;
  ObjectURL?: string;
}
export interface ProcessedObject {
  Name?: string;
  Type?: string;
  EndpointType?: string;
}
export interface Progress {
  ProgressPercent?: number;
  TotalObjects?: number;
  ProgressStep?: string;
  ProcessedObject?: ProcessedObject;
}
export interface SchemaConversionRequest {
  Status?: string;
  RequestIdentifier?: string;
  MigrationProjectArn?: string;
  Error?: ErrorDetails;
  ExportSqlDetails?: ExportSqlDetails;
  Progress?: Progress;
}
export interface CancelMetadataModelConversionResponse {
  Request?: SchemaConversionRequest;
}
export interface CancelMetadataModelCreationMessage {
  MigrationProjectIdentifier: string;
  RequestIdentifier: string;
}
export interface CancelMetadataModelCreationResponse {
  Request?: SchemaConversionRequest;
}
export interface CancelReplicationTaskAssessmentRunMessage {
  ReplicationTaskAssessmentRunArn: string;
}
export interface ReplicationTaskAssessmentRunProgress {
  IndividualAssessmentCount?: number;
  IndividualAssessmentCompletedCount?: number;
}
export interface ReplicationTaskAssessmentRunResultStatistic {
  Passed?: number;
  Failed?: number;
  Error?: number;
  Warning?: number;
  Cancelled?: number;
  Skipped?: number;
}
export interface ReplicationTaskAssessmentRun {
  ReplicationTaskAssessmentRunArn?: string;
  ReplicationTaskArn?: string;
  Status?: string;
  ReplicationTaskAssessmentRunCreationDate?: Date;
  AssessmentProgress?: ReplicationTaskAssessmentRunProgress;
  LastFailureMessage?: string;
  ServiceAccessRoleArn?: string;
  ResultLocationBucket?: string;
  ResultLocationFolder?: string;
  ResultEncryptionMode?: string;
  ResultKmsKeyArn?: string;
  AssessmentRunName?: string;
  IsLatestTaskAssessmentRun?: boolean;
  ResultStatistic?: ReplicationTaskAssessmentRunResultStatistic;
}
export interface CancelReplicationTaskAssessmentRunResponse {
  ReplicationTaskAssessmentRun?: ReplicationTaskAssessmentRun;
}
export type MigrationTypeValue =
  | "full-load"
  | "cdc"
  | "full-load-and-cdc"
  | (string & {});
export type Iso8601DateTime = Date;
export interface SourceDataSetting {
  CDCStartPosition?: string;
  CDCStartTime?: Date;
  CDCStopTime?: Date;
  SlotName?: string;
}
export type SourceDataSettings = SourceDataSetting[];
export type TablePreparationMode =
  | "do-nothing"
  | "truncate"
  | "drop-tables-on-target"
  | (string & {});
export interface TargetDataSetting {
  TablePreparationMode?: TablePreparationMode;
}
export type TargetDataSettings = TargetDataSetting[];
export type SecretString = string | redacted.Redacted<string>;
export interface CreateDataMigrationMessage {
  DataMigrationName?: string;
  MigrationProjectIdentifier: string;
  DataMigrationType: MigrationTypeValue;
  ServiceAccessRoleArn: string;
  EnableCloudwatchLogs?: boolean;
  SourceDataSettings?: SourceDataSetting[];
  TargetDataSettings?: TargetDataSetting[];
  NumberOfJobs?: number;
  Tags?: Tag[];
  SelectionRules?: string | redacted.Redacted<string>;
}
export interface DataMigrationSettings {
  NumberOfJobs?: number;
  CloudwatchLogsEnabled?: boolean;
  SelectionRules?: string | redacted.Redacted<string>;
}
export interface DataMigrationStatistics {
  TablesLoaded?: number;
  ElapsedTimeMillis?: number;
  TablesLoading?: number;
  FullLoadPercentage?: number;
  CDCLatency?: number;
  TablesQueued?: number;
  TablesErrored?: number;
  StartTime?: Date;
  StopTime?: Date;
}
export type PublicIpAddressList = string[];
export type DataMigrationCidrBlock = string[];
export interface DataMigration {
  DataMigrationName?: string;
  DataMigrationArn?: string;
  DataMigrationCreateTime?: Date;
  DataMigrationStartTime?: Date;
  DataMigrationEndTime?: Date;
  ServiceAccessRoleArn?: string;
  MigrationProjectArn?: string;
  DataMigrationType?: MigrationTypeValue;
  DataMigrationSettings?: DataMigrationSettings;
  SourceDataSettings?: SourceDataSetting[];
  TargetDataSettings?: TargetDataSetting[];
  DataMigrationStatistics?: DataMigrationStatistics;
  DataMigrationStatus?: string;
  PublicIpAddresses?: string[];
  DataMigrationCidrBlocks?: string[];
  LastFailureMessage?: string;
  StopReason?: string;
}
export interface CreateDataMigrationResponse {
  DataMigration?: DataMigration;
}
export interface RedshiftDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export type DmsSslModeValue =
  | "none"
  | "require"
  | "verify-ca"
  | "verify-full"
  | (string & {});
export interface PostgreSqlDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export interface MySqlDataProviderSettings {
  ServerName?: string;
  Port?: number;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export interface OracleDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  AsmServer?: string;
  SecretsManagerOracleAsmSecretId?: string;
  SecretsManagerOracleAsmAccessRoleArn?: string;
  SecretsManagerSecurityDbEncryptionSecretId?: string;
  SecretsManagerSecurityDbEncryptionAccessRoleArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export interface SybaseAseDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  EncryptPassword?: boolean;
  CertificateArn?: string;
}
export interface MicrosoftSqlServerDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export interface DocDbDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
}
export interface MariaDbDataProviderSettings {
  ServerName?: string;
  Port?: number;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export interface IbmDb2LuwDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  EncryptionAlgorithm?: number;
  SecurityMechanism?: number;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export interface IbmDb2zOsDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export type AuthTypeValue = "no" | "password" | (string & {});
export type AuthMechanismValue =
  | "default"
  | "mongodb_cr"
  | "scram_sha_1"
  | (string & {});
export interface MongoDbDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  AuthType?: AuthTypeValue;
  AuthSource?: string;
  AuthMechanism?: AuthMechanismValue;
}
export type DataProviderSettings =
  | {
      RedshiftSettings: RedshiftDataProviderSettings;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings: PostgreSqlDataProviderSettings;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings: MySqlDataProviderSettings;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings: OracleDataProviderSettings;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings: SybaseAseDataProviderSettings;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings: MicrosoftSqlServerDataProviderSettings;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings: DocDbDataProviderSettings;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings: MariaDbDataProviderSettings;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings: IbmDb2LuwDataProviderSettings;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings: IbmDb2zOsDataProviderSettings;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings: MongoDbDataProviderSettings;
    };
export interface CreateDataProviderMessage {
  DataProviderName?: string;
  Description?: string;
  Engine: string;
  Virtual?: boolean;
  Settings: DataProviderSettings;
  Tags?: Tag[];
}
export interface DataProvider {
  DataProviderName?: string;
  DataProviderArn?: string;
  DataProviderCreationTime?: Date;
  Description?: string;
  Engine?: string;
  Virtual?: boolean;
  Settings?: DataProviderSettings;
}
export interface CreateDataProviderResponse {
  DataProvider?: DataProvider;
}
export type ReplicationEndpointTypeValue = "source" | "target" | (string & {});
export interface DynamoDbSettings {
  ServiceAccessRoleArn: string;
}
export type CompressionTypeValue = "none" | "gzip" | (string & {});
export type EncryptionModeValue = "sse-s3" | "sse-kms" | (string & {});
export type DataFormatValue = "csv" | "parquet" | (string & {});
export type EncodingTypeValue =
  | "plain"
  | "plain-dictionary"
  | "rle-dictionary"
  | (string & {});
export type ParquetVersionValue = "parquet-1-0" | "parquet-2-0" | (string & {});
export type DatePartitionSequenceValue =
  | "YYYYMMDD"
  | "YYYYMMDDHH"
  | "YYYYMM"
  | "MMYYYYDD"
  | "DDMMYYYY"
  | (string & {});
export type DatePartitionDelimiterValue =
  | "SLASH"
  | "UNDERSCORE"
  | "DASH"
  | "NONE"
  | (string & {});
export type CannedAclForObjectsValue =
  | "none"
  | "private"
  | "public-read"
  | "public-read-write"
  | "authenticated-read"
  | "aws-exec-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | (string & {});
export interface S3Settings {
  ServiceAccessRoleArn?: string;
  ExternalTableDefinition?: string;
  CsvRowDelimiter?: string;
  CsvDelimiter?: string;
  BucketFolder?: string;
  BucketName?: string;
  CompressionType?: CompressionTypeValue;
  EncryptionMode?: EncryptionModeValue;
  ServerSideEncryptionKmsKeyId?: string;
  DataFormat?: DataFormatValue;
  EncodingType?: EncodingTypeValue;
  DictPageSizeLimit?: number;
  RowGroupLength?: number;
  DataPageSize?: number;
  ParquetVersion?: ParquetVersionValue;
  EnableStatistics?: boolean;
  IncludeOpForFullLoad?: boolean;
  CdcInsertsOnly?: boolean;
  TimestampColumnName?: string;
  ParquetTimestampInMillisecond?: boolean;
  CdcInsertsAndUpdates?: boolean;
  DatePartitionEnabled?: boolean;
  DatePartitionSequence?: DatePartitionSequenceValue;
  DatePartitionDelimiter?: DatePartitionDelimiterValue;
  UseCsvNoSupValue?: boolean;
  CsvNoSupValue?: string;
  PreserveTransactions?: boolean;
  CdcPath?: string;
  UseTaskStartTimeForFullLoadTimestamp?: boolean;
  CannedAclForObjects?: CannedAclForObjectsValue;
  AddColumnName?: boolean;
  CdcMaxBatchInterval?: number;
  CdcMinFileSize?: number;
  CsvNullValue?: string;
  IgnoreHeaderRows?: number;
  MaxFileSize?: number;
  Rfc4180?: boolean;
  DatePartitionTimezone?: string;
  AddTrailingPaddingCharacter?: boolean;
  ExpectedBucketOwner?: string;
  GlueCatalogGeneration?: boolean;
}
export interface DmsTransferSettings {
  ServiceAccessRoleArn?: string;
  BucketName?: string;
}
export type NestingLevelValue = "none" | "one" | (string & {});
export interface MongoDbSettings {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  AuthType?: AuthTypeValue;
  AuthMechanism?: AuthMechanismValue;
  NestingLevel?: NestingLevelValue;
  ExtractDocId?: string;
  DocsToInvestigate?: string;
  AuthSource?: string;
  KmsKeyId?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  UseUpdateLookUp?: boolean;
  ReplicateShardCollections?: boolean;
}
export type MessageFormatValue = "json" | "json-unformatted" | (string & {});
export interface KinesisSettings {
  StreamArn?: string;
  MessageFormat?: MessageFormatValue;
  ServiceAccessRoleArn?: string;
  IncludeTransactionDetails?: boolean;
  IncludePartitionValue?: boolean;
  PartitionIncludeSchemaTable?: boolean;
  IncludeTableAlterOperations?: boolean;
  IncludeControlDetails?: boolean;
  IncludeNullAndEmpty?: boolean;
  NoHexPrefix?: boolean;
  UseLargeIntegerValue?: boolean;
}
export type KafkaSecurityProtocol =
  | "plaintext"
  | "ssl-authentication"
  | "ssl-encryption"
  | "sasl-ssl"
  | (string & {});
export type KafkaSaslMechanism = "scram-sha-512" | "plain" | (string & {});
export type KafkaSslEndpointIdentificationAlgorithm =
  | "none"
  | "https"
  | (string & {});
export interface KafkaSettings {
  Broker?: string;
  Topic?: string;
  MessageFormat?: MessageFormatValue;
  IncludeTransactionDetails?: boolean;
  IncludePartitionValue?: boolean;
  PartitionIncludeSchemaTable?: boolean;
  IncludeTableAlterOperations?: boolean;
  IncludeControlDetails?: boolean;
  MessageMaxBytes?: number;
  IncludeNullAndEmpty?: boolean;
  SecurityProtocol?: KafkaSecurityProtocol;
  SslClientCertificateArn?: string;
  SslClientKeyArn?: string;
  SslClientKeyPassword?: string | redacted.Redacted<string>;
  SslCaCertificateArn?: string;
  SaslUsername?: string;
  SaslPassword?: string | redacted.Redacted<string>;
  NoHexPrefix?: boolean;
  SaslMechanism?: KafkaSaslMechanism;
  SslEndpointIdentificationAlgorithm?: KafkaSslEndpointIdentificationAlgorithm;
  UseLargeIntegerValue?: boolean;
}
export interface ElasticsearchSettings {
  ServiceAccessRoleArn: string;
  EndpointUri: string;
  FullLoadErrorPercentage?: number;
  ErrorRetryDuration?: number;
  UseNewMappingType?: boolean;
}
export interface NeptuneSettings {
  ServiceAccessRoleArn?: string;
  S3BucketName: string;
  S3BucketFolder: string;
  ErrorRetryDuration?: number;
  MaxFileSize?: number;
  MaxRetryCount?: number;
  IamAuthEnabled?: boolean;
}
export interface RedshiftSettings {
  AcceptAnyDate?: boolean;
  AfterConnectScript?: string;
  BucketFolder?: string;
  BucketName?: string;
  CaseSensitiveNames?: boolean;
  CompUpdate?: boolean;
  ConnectionTimeout?: number;
  DatabaseName?: string;
  DateFormat?: string;
  EmptyAsNull?: boolean;
  EncryptionMode?: EncryptionModeValue;
  ExplicitIds?: boolean;
  FileTransferUploadStreams?: number;
  LoadTimeout?: number;
  MaxFileSize?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  RemoveQuotes?: boolean;
  ReplaceInvalidChars?: string;
  ReplaceChars?: string;
  ServerName?: string;
  ServiceAccessRoleArn?: string;
  ServerSideEncryptionKmsKeyId?: string;
  TimeFormat?: string;
  TrimBlanks?: boolean;
  TruncateColumns?: boolean;
  Username?: string;
  WriteBufferSize?: number;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  MapBooleanAsBoolean?: boolean;
}
export type PluginNameValue =
  | "no-preference"
  | "test-decoding"
  | "pglogical"
  | (string & {});
export type LongVarcharMappingType =
  | "wstring"
  | "clob"
  | "nclob"
  | (string & {});
export type DatabaseMode = "default" | "babelfish" | (string & {});
export type PostgreSQLAuthenticationMethod = "password" | "iam" | (string & {});
export interface PostgreSQLSettings {
  AfterConnectScript?: string;
  CaptureDdls?: boolean;
  MaxFileSize?: number;
  DatabaseName?: string;
  DdlArtifactsSchema?: string;
  ExecuteTimeout?: number;
  FailTasksOnLobTruncation?: boolean;
  HeartbeatEnable?: boolean;
  HeartbeatSchema?: string;
  HeartbeatFrequency?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  Username?: string;
  SlotName?: string;
  PluginName?: PluginNameValue;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  TrimSpaceInChar?: boolean;
  MapBooleanAsBoolean?: boolean;
  MapJsonbAsClob?: boolean;
  MapLongVarcharAs?: LongVarcharMappingType;
  DatabaseMode?: DatabaseMode;
  BabelfishDatabaseName?: string;
  DisableUnicodeSourceFilter?: boolean;
  ServiceAccessRoleArn?: string;
  AuthenticationMethod?: PostgreSQLAuthenticationMethod;
}
export type TargetDbType =
  | "specific-database"
  | "multiple-databases"
  | (string & {});
export type MySQLAuthenticationMethod = "password" | "iam" | (string & {});
export interface MySQLSettings {
  AfterConnectScript?: string;
  CleanSourceMetadataOnMismatch?: boolean;
  DatabaseName?: string;
  EventsPollInterval?: number;
  TargetDbType?: TargetDbType;
  MaxFileSize?: number;
  ParallelLoadThreads?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  ServerTimezone?: string;
  Username?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  ExecuteTimeout?: number;
  ServiceAccessRoleArn?: string;
  AuthenticationMethod?: MySQLAuthenticationMethod;
}
export type IntegerList = number[];
export type CharLengthSemantics = "default" | "char" | "byte" | (string & {});
export type OracleAuthenticationMethod =
  | "password"
  | "kerberos"
  | (string & {});
export interface OracleSettings {
  AddSupplementalLogging?: boolean;
  ArchivedLogDestId?: number;
  AdditionalArchivedLogDestId?: number;
  ExtraArchivedLogDestIds?: number[];
  AllowSelectNestedTables?: boolean;
  ParallelAsmReadThreads?: number;
  ReadAheadBlocks?: number;
  AccessAlternateDirectly?: boolean;
  UseAlternateFolderForOnline?: boolean;
  OraclePathPrefix?: string;
  UsePathPrefix?: string;
  ReplacePathPrefix?: boolean;
  EnableHomogenousTablespace?: boolean;
  DirectPathNoLog?: boolean;
  ArchivedLogsOnly?: boolean;
  AsmPassword?: string | redacted.Redacted<string>;
  AsmServer?: string;
  AsmUser?: string;
  CharLengthSemantics?: CharLengthSemantics;
  DatabaseName?: string;
  DirectPathParallelLoad?: boolean;
  FailTasksOnLobTruncation?: boolean;
  NumberDatatypeScale?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ReadTableSpaceName?: boolean;
  RetryInterval?: number;
  SecurityDbEncryption?: string | redacted.Redacted<string>;
  SecurityDbEncryptionName?: string;
  ServerName?: string;
  SpatialDataOptionToGeoJsonFunctionName?: string;
  StandbyDelayTime?: number;
  Username?: string;
  UseBFile?: boolean;
  UseDirectPathFullLoad?: boolean;
  UseLogminerReader?: boolean;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  SecretsManagerOracleAsmAccessRoleArn?: string;
  SecretsManagerOracleAsmSecretId?: string;
  TrimSpaceInChar?: boolean;
  ConvertTimestampWithZoneToUTC?: boolean;
  OpenTransactionWindow?: number;
  AuthenticationMethod?: OracleAuthenticationMethod;
}
export interface SybaseSettings {
  DatabaseName?: string;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  Username?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
}
export type SafeguardPolicy =
  | "rely-on-sql-server-replication-agent"
  | "exclusive-automatic-truncation"
  | "shared-automatic-truncation"
  | (string & {});
export type TlogAccessMode =
  | "BackupOnly"
  | "PreferBackup"
  | "PreferTlog"
  | "TlogOnly"
  | (string & {});
export type SqlServerAuthenticationMethod =
  | "password"
  | "kerberos"
  | (string & {});
export interface MicrosoftSQLServerSettings {
  Port?: number;
  BcpPacketSize?: number;
  DatabaseName?: string;
  ControlTablesFileGroup?: string;
  Password?: string | redacted.Redacted<string>;
  QuerySingleAlwaysOnNode?: boolean;
  ReadBackupOnly?: boolean;
  SafeguardPolicy?: SafeguardPolicy;
  ServerName?: string;
  Username?: string;
  UseBcpFullLoad?: boolean;
  UseThirdPartyBackupDevice?: boolean;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  TrimSpaceInChar?: boolean;
  TlogAccessMode?: TlogAccessMode;
  ForceLobLookup?: boolean;
  AuthenticationMethod?: SqlServerAuthenticationMethod;
}
export interface IBMDb2Settings {
  DatabaseName?: string;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  SetDataCaptureChanges?: boolean;
  CurrentLsn?: string;
  MaxKBytesPerRead?: number;
  Username?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  LoadTimeout?: number;
  WriteBufferSize?: number;
  MaxFileSize?: number;
  KeepCsvFiles?: boolean;
}
export interface DocDbSettings {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  NestingLevel?: NestingLevelValue;
  ExtractDocId?: boolean;
  DocsToInvestigate?: number;
  KmsKeyId?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  UseUpdateLookUp?: boolean;
  ReplicateShardCollections?: boolean;
}
export type SslSecurityProtocolValue =
  | "plaintext"
  | "ssl-encryption"
  | (string & {});
export type RedisAuthTypeValue =
  | "none"
  | "auth-role"
  | "auth-token"
  | (string & {});
export interface RedisSettings {
  ServerName: string;
  Port: number;
  SslSecurityProtocol?: SslSecurityProtocolValue;
  AuthType?: RedisAuthTypeValue;
  AuthUserName?: string;
  AuthPassword?: string | redacted.Redacted<string>;
  SslCaCertificateArn?: string;
}
export interface GcpMySQLSettings {
  AfterConnectScript?: string;
  CleanSourceMetadataOnMismatch?: boolean;
  DatabaseName?: string;
  EventsPollInterval?: number;
  TargetDbType?: TargetDbType;
  MaxFileSize?: number;
  ParallelLoadThreads?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  ServerTimezone?: string;
  Username?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
}
export interface TimestreamSettings {
  DatabaseName: string;
  MemoryDuration: number;
  MagneticDuration: number;
  CdcInsertsAndUpdates?: boolean;
  EnableMagneticStoreWrites?: boolean;
}
export interface CreateEndpointMessage {
  EndpointIdentifier: string;
  EndpointType: ReplicationEndpointTypeValue;
  EngineName: string;
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  ExtraConnectionAttributes?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
  CertificateArn?: string;
  SslMode?: DmsSslModeValue;
  ServiceAccessRoleArn?: string;
  ExternalTableDefinition?: string;
  DynamoDbSettings?: DynamoDbSettings;
  S3Settings?: S3Settings;
  DmsTransferSettings?: DmsTransferSettings;
  MongoDbSettings?: MongoDbSettings;
  KinesisSettings?: KinesisSettings;
  KafkaSettings?: KafkaSettings;
  ElasticsearchSettings?: ElasticsearchSettings;
  NeptuneSettings?: NeptuneSettings;
  RedshiftSettings?: RedshiftSettings;
  PostgreSQLSettings?: PostgreSQLSettings;
  MySQLSettings?: MySQLSettings;
  OracleSettings?: OracleSettings;
  SybaseSettings?: SybaseSettings;
  MicrosoftSQLServerSettings?: MicrosoftSQLServerSettings;
  IBMDb2Settings?: IBMDb2Settings;
  ResourceIdentifier?: string;
  DocDbSettings?: DocDbSettings;
  RedisSettings?: RedisSettings;
  GcpMySQLSettings?: GcpMySQLSettings;
  TimestreamSettings?: TimestreamSettings;
}
export interface LakehouseSettings {
  Arn: string;
}
export interface Endpoint {
  EndpointIdentifier?: string;
  EndpointType?: ReplicationEndpointTypeValue;
  EngineName?: string;
  EngineDisplayName?: string;
  Username?: string;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  ExtraConnectionAttributes?: string;
  Status?: string;
  KmsKeyId?: string;
  EndpointArn?: string;
  CertificateArn?: string;
  SslMode?: DmsSslModeValue;
  ServiceAccessRoleArn?: string;
  ExternalTableDefinition?: string;
  ExternalId?: string;
  IsReadOnly?: boolean;
  DynamoDbSettings?: DynamoDbSettings;
  S3Settings?: S3Settings;
  DmsTransferSettings?: DmsTransferSettings;
  MongoDbSettings?: MongoDbSettings;
  KinesisSettings?: KinesisSettings;
  KafkaSettings?: KafkaSettings;
  ElasticsearchSettings?: ElasticsearchSettings;
  NeptuneSettings?: NeptuneSettings;
  RedshiftSettings?: RedshiftSettings;
  PostgreSQLSettings?: PostgreSQLSettings;
  MySQLSettings?: MySQLSettings;
  OracleSettings?: OracleSettings;
  SybaseSettings?: SybaseSettings;
  MicrosoftSQLServerSettings?: MicrosoftSQLServerSettings;
  IBMDb2Settings?: IBMDb2Settings;
  DocDbSettings?: DocDbSettings;
  RedisSettings?: RedisSettings;
  GcpMySQLSettings?: GcpMySQLSettings;
  TimestreamSettings?: TimestreamSettings;
  LakehouseSettings?: LakehouseSettings;
}
export interface CreateEndpointResponse {
  Endpoint?: Endpoint;
}
export type EventCategoriesList = string[];
export type SourceIdsList = string[];
export interface CreateEventSubscriptionMessage {
  SubscriptionName: string;
  SnsTopicArn: string;
  SourceType?: string;
  EventCategories?: string[];
  SourceIds?: string[];
  Enabled?: boolean;
  Tags?: Tag[];
}
export interface EventSubscription {
  CustomerAwsId?: string;
  CustSubscriptionId?: string;
  SnsTopicArn?: string;
  Status?: string;
  SubscriptionCreationTime?: string;
  SourceType?: string;
  SourceIdsList?: string[];
  EventCategoriesList?: string[];
  Enabled?: boolean;
}
export interface CreateEventSubscriptionResponse {
  EventSubscription?: EventSubscription;
}
export interface CreateFleetAdvisorCollectorRequest {
  CollectorName: string;
  Description?: string;
  ServiceAccessRoleArn: string;
  S3BucketName: string;
}
export interface CreateFleetAdvisorCollectorResponse {
  CollectorReferencedId?: string;
  CollectorName?: string;
  Description?: string;
  ServiceAccessRoleArn?: string;
  S3BucketName?: string;
}
export type StringList = string[];
export interface CreateInstanceProfileMessage {
  AvailabilityZone?: string;
  KmsKeyArn?: string;
  PubliclyAccessible?: boolean;
  Tags?: Tag[];
  NetworkType?: string;
  InstanceProfileName?: string;
  Description?: string;
  SubnetGroupIdentifier?: string;
  VpcSecurityGroups?: string[];
}
export interface InstanceProfile {
  InstanceProfileArn?: string;
  AvailabilityZone?: string;
  KmsKeyArn?: string;
  PubliclyAccessible?: boolean;
  NetworkType?: string;
  InstanceProfileName?: string;
  Description?: string;
  InstanceProfileCreationTime?: Date;
  SubnetGroupIdentifier?: string;
  VpcSecurityGroups?: string[];
}
export interface CreateInstanceProfileResponse {
  InstanceProfile?: InstanceProfile;
}
export interface DataProviderDescriptorDefinition {
  DataProviderIdentifier: string;
  SecretsManagerSecretId?: string;
  SecretsManagerAccessRoleArn?: string;
}
export type DataProviderDescriptorDefinitionList =
  DataProviderDescriptorDefinition[];
export interface SCApplicationAttributes {
  S3BucketPath?: string;
  S3BucketRoleArn?: string;
}
export interface CreateMigrationProjectMessage {
  MigrationProjectName?: string;
  SourceDataProviderDescriptors: DataProviderDescriptorDefinition[];
  TargetDataProviderDescriptors: DataProviderDescriptorDefinition[];
  InstanceProfileIdentifier: string;
  TransformationRules?: string;
  Description?: string;
  Tags?: Tag[];
  SchemaConversionApplicationAttributes?: SCApplicationAttributes;
}
export interface DataProviderDescriptor {
  SecretsManagerSecretId?: string;
  SecretsManagerAccessRoleArn?: string;
  DataProviderName?: string;
  DataProviderArn?: string;
}
export type DataProviderDescriptorList = DataProviderDescriptor[];
export interface MigrationProject {
  MigrationProjectName?: string;
  MigrationProjectArn?: string;
  MigrationProjectCreationTime?: Date;
  SourceDataProviderDescriptors?: DataProviderDescriptor[];
  TargetDataProviderDescriptors?: DataProviderDescriptor[];
  InstanceProfileArn?: string;
  InstanceProfileName?: string;
  TransformationRules?: string;
  Description?: string;
  SchemaConversionApplicationAttributes?: SCApplicationAttributes;
}
export interface CreateMigrationProjectResponse {
  MigrationProject?: MigrationProject;
}
export interface ComputeConfig {
  AvailabilityZone?: string;
  DnsNameServers?: string;
  KmsKeyId?: string;
  MaxCapacityUnits?: number;
  MinCapacityUnits?: number;
  MultiAZ?: boolean;
  PreferredMaintenanceWindow?: string;
  ReplicationSubnetGroupId?: string;
  VpcSecurityGroupIds?: string[];
}
export interface CreateReplicationConfigMessage {
  ReplicationConfigIdentifier: string;
  SourceEndpointArn: string;
  TargetEndpointArn: string;
  ComputeConfig: ComputeConfig;
  ReplicationType: MigrationTypeValue;
  TableMappings: string;
  ReplicationSettings?: string;
  SupplementalSettings?: string;
  ResourceIdentifier?: string;
  Tags?: Tag[];
}
export interface ReplicationConfig {
  ReplicationConfigIdentifier?: string;
  ReplicationConfigArn?: string;
  SourceEndpointArn?: string;
  TargetEndpointArn?: string;
  ReplicationType?: MigrationTypeValue;
  ComputeConfig?: ComputeConfig;
  ReplicationSettings?: string;
  SupplementalSettings?: string;
  TableMappings?: string;
  ReplicationConfigCreateTime?: Date;
  ReplicationConfigUpdateTime?: Date;
  IsReadOnly?: boolean;
}
export interface CreateReplicationConfigResponse {
  ReplicationConfig?: ReplicationConfig;
}
export type ReplicationInstanceClass = string;
export type VpcSecurityGroupIdList = string[];
export interface KerberosAuthenticationSettings {
  KeyCacheSecretId?: string;
  KeyCacheSecretIamArn?: string;
  Krb5FileContents?: string;
}
export interface CreateReplicationInstanceMessage {
  ReplicationInstanceIdentifier: string;
  AllocatedStorage?: number;
  ReplicationInstanceClass: string;
  VpcSecurityGroupIds?: string[];
  AvailabilityZone?: string;
  ReplicationSubnetGroupIdentifier?: string;
  PreferredMaintenanceWindow?: string;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  Tags?: Tag[];
  KmsKeyId?: string;
  PubliclyAccessible?: boolean;
  DnsNameServers?: string;
  ResourceIdentifier?: string;
  NetworkType?: string;
  KerberosAuthenticationSettings?: KerberosAuthenticationSettings;
}
export interface VpcSecurityGroupMembership {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export interface AvailabilityZone {
  Name?: string;
}
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetStatus?: string;
}
export type SubnetList = Subnet[];
export interface ReplicationSubnetGroup {
  ReplicationSubnetGroupIdentifier?: string;
  ReplicationSubnetGroupDescription?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: Subnet[];
  SupportedNetworkTypes?: string[];
  IsReadOnly?: boolean;
}
export interface ReplicationPendingModifiedValues {
  ReplicationInstanceClass?: string;
  AllocatedStorage?: number;
  MultiAZ?: boolean;
  EngineVersion?: string;
  NetworkType?: string;
}
export type ReplicationInstancePublicIpAddressList = string[];
export type ReplicationInstancePrivateIpAddressList = string[];
export type ReplicationInstanceIpv6AddressList = string[];
export interface ReplicationInstance {
  ReplicationInstanceIdentifier?: string;
  ReplicationInstanceClass?: string;
  ReplicationInstanceStatus?: string;
  AllocatedStorage?: number;
  InstanceCreateTime?: Date;
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  AvailabilityZone?: string;
  ReplicationSubnetGroup?: ReplicationSubnetGroup;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: ReplicationPendingModifiedValues;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  KmsKeyId?: string;
  ReplicationInstanceArn?: string;
  ReplicationInstancePublicIpAddress?: string;
  ReplicationInstancePrivateIpAddress?: string;
  ReplicationInstancePublicIpAddresses?: string[];
  ReplicationInstancePrivateIpAddresses?: string[];
  ReplicationInstanceIpv6Addresses?: string[];
  PubliclyAccessible?: boolean;
  SecondaryAvailabilityZone?: string;
  FreeUntil?: Date;
  DnsNameServers?: string;
  NetworkType?: string;
  KerberosAuthenticationSettings?: KerberosAuthenticationSettings;
}
export interface CreateReplicationInstanceResponse {
  ReplicationInstance?: ReplicationInstance;
}
export type SubnetIdentifierList = string[];
export interface CreateReplicationSubnetGroupMessage {
  ReplicationSubnetGroupIdentifier: string;
  ReplicationSubnetGroupDescription: string;
  SubnetIds: string[];
  Tags?: Tag[];
}
export interface CreateReplicationSubnetGroupResponse {
  ReplicationSubnetGroup?: ReplicationSubnetGroup;
}
export interface CreateReplicationTaskMessage {
  ReplicationTaskIdentifier: string;
  SourceEndpointArn: string;
  TargetEndpointArn: string;
  ReplicationInstanceArn: string;
  MigrationType: MigrationTypeValue;
  TableMappings: string;
  ReplicationTaskSettings?: string;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
  Tags?: Tag[];
  TaskData?: string;
  ResourceIdentifier?: string;
}
export interface ReplicationTaskStats {
  FullLoadProgressPercent?: number;
  ElapsedTimeMillis?: number;
  TablesLoaded?: number;
  TablesLoading?: number;
  TablesQueued?: number;
  TablesErrored?: number;
  FreshStartDate?: Date;
  StartDate?: Date;
  StopDate?: Date;
  FullLoadStartDate?: Date;
  FullLoadFinishDate?: Date;
}
export interface ReplicationTask {
  ReplicationTaskIdentifier?: string;
  SourceEndpointArn?: string;
  TargetEndpointArn?: string;
  ReplicationInstanceArn?: string;
  MigrationType?: MigrationTypeValue;
  TableMappings?: string;
  ReplicationTaskSettings?: string;
  Status?: string;
  LastFailureMessage?: string;
  StopReason?: string;
  ReplicationTaskCreationDate?: Date;
  ReplicationTaskStartDate?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
  RecoveryCheckpoint?: string;
  ReplicationTaskArn?: string;
  ReplicationTaskStats?: ReplicationTaskStats;
  TaskData?: string;
  TargetReplicationInstanceArn?: string;
}
export interface CreateReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export interface DeleteCertificateMessage {
  CertificateArn: string;
}
export type CertificateWallet = Uint8Array;
export interface Certificate {
  CertificateIdentifier?: string;
  CertificateCreationDate?: Date;
  CertificatePem?: string;
  CertificateWallet?: Uint8Array;
  CertificateArn?: string;
  CertificateOwner?: string;
  ValidFromDate?: Date;
  ValidToDate?: Date;
  SigningAlgorithm?: string;
  KeyLength?: number;
  KmsKeyId?: string;
}
export interface DeleteCertificateResponse {
  Certificate?: Certificate;
}
export interface DeleteConnectionMessage {
  EndpointArn: string;
  ReplicationInstanceArn: string;
}
export interface Connection {
  ReplicationInstanceArn?: string;
  EndpointArn?: string;
  Status?: string;
  LastFailureMessage?: string;
  EndpointIdentifier?: string;
  ReplicationInstanceIdentifier?: string;
}
export interface DeleteConnectionResponse {
  Connection?: Connection;
}
export interface DeleteDataMigrationMessage {
  DataMigrationIdentifier: string;
}
export interface DeleteDataMigrationResponse {
  DataMigration?: DataMigration;
}
export interface DeleteDataProviderMessage {
  DataProviderIdentifier: string;
}
export interface DeleteDataProviderResponse {
  DataProvider?: DataProvider;
}
export interface DeleteEndpointMessage {
  EndpointArn: string;
}
export interface DeleteEndpointResponse {
  Endpoint?: Endpoint;
}
export interface DeleteEventSubscriptionMessage {
  SubscriptionName: string;
}
export interface DeleteEventSubscriptionResponse {
  EventSubscription?: EventSubscription;
}
export interface DeleteCollectorRequest {
  CollectorReferencedId: string;
}
export interface DeleteFleetAdvisorCollectorResponse {}
export interface DeleteFleetAdvisorDatabasesRequest {
  DatabaseIds: string[];
}
export interface DeleteFleetAdvisorDatabasesResponse {
  DatabaseIds?: string[];
}
export interface DeleteInstanceProfileMessage {
  InstanceProfileIdentifier: string;
}
export interface DeleteInstanceProfileResponse {
  InstanceProfile?: InstanceProfile;
}
export interface DeleteMigrationProjectMessage {
  MigrationProjectIdentifier: string;
}
export interface DeleteMigrationProjectResponse {
  MigrationProject?: MigrationProject;
}
export interface DeleteReplicationConfigMessage {
  ReplicationConfigArn: string;
}
export interface DeleteReplicationConfigResponse {
  ReplicationConfig?: ReplicationConfig;
}
export interface DeleteReplicationInstanceMessage {
  ReplicationInstanceArn: string;
}
export interface DeleteReplicationInstanceResponse {
  ReplicationInstance?: ReplicationInstance;
}
export interface DeleteReplicationSubnetGroupMessage {
  ReplicationSubnetGroupIdentifier: string;
}
export interface DeleteReplicationSubnetGroupResponse {}
export interface DeleteReplicationTaskMessage {
  ReplicationTaskArn: string;
}
export interface DeleteReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export interface DeleteReplicationTaskAssessmentRunMessage {
  ReplicationTaskAssessmentRunArn: string;
}
export interface DeleteReplicationTaskAssessmentRunResponse {
  ReplicationTaskAssessmentRun?: ReplicationTaskAssessmentRun;
}
export interface DescribeAccountAttributesMessage {}
export interface AccountQuota {
  AccountQuotaName?: string;
  Used?: number;
  Max?: number;
}
export type AccountQuotaList = AccountQuota[];
export interface DescribeAccountAttributesResponse {
  AccountQuotas?: AccountQuota[];
  UniqueAccountIdentifier?: string;
}
export interface DescribeApplicableIndividualAssessmentsMessage {
  ReplicationTaskArn?: string;
  ReplicationInstanceArn?: string;
  ReplicationConfigArn?: string;
  SourceEngineName?: string;
  TargetEngineName?: string;
  MigrationType?: MigrationTypeValue;
  MaxRecords?: number;
  Marker?: string;
}
export type IndividualAssessmentNameList = string[];
export interface DescribeApplicableIndividualAssessmentsResponse {
  IndividualAssessmentNames?: string[];
  Marker?: string;
}
export type FilterValueList = string[];
export interface Filter {
  Name: string;
  Values: string[];
}
export type FilterList = Filter[];
export interface DescribeCertificatesMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type CertificateList = Certificate[];
export interface DescribeCertificatesResponse {
  Marker?: string;
  Certificates?: Certificate[];
}
export interface DescribeConnectionsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type ConnectionList = Connection[];
export interface DescribeConnectionsResponse {
  Marker?: string;
  Connections?: Connection[];
}
export interface DescribeConversionConfigurationMessage {
  MigrationProjectIdentifier: string;
}
export interface DescribeConversionConfigurationResponse {
  MigrationProjectIdentifier?: string;
  ConversionConfiguration?: string;
}
export type Marker = string;
export interface DescribeDataMigrationsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  WithoutSettings?: boolean;
  WithoutStatistics?: boolean;
}
export type DataMigrations = DataMigration[];
export interface DescribeDataMigrationsResponse {
  DataMigrations?: DataMigration[];
  Marker?: string;
}
export interface DescribeDataProvidersMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DataProviderList = DataProvider[];
export interface DescribeDataProvidersResponse {
  Marker?: string;
  DataProviders?: DataProvider[];
}
export interface DescribeEndpointsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type EndpointList = Endpoint[];
export interface DescribeEndpointsResponse {
  Marker?: string;
  Endpoints?: Endpoint[];
}
export interface DescribeEndpointSettingsMessage {
  EngineName: string;
  MaxRecords?: number;
  Marker?: string;
}
export type EndpointSettingTypeValue =
  | "string"
  | "boolean"
  | "integer"
  | "enum"
  | (string & {});
export type EndpointSettingEnumValues = string[];
export interface EndpointSetting {
  Name?: string;
  Type?: EndpointSettingTypeValue;
  EnumValues?: string[];
  Sensitive?: boolean;
  Units?: string;
  Applicability?: string;
  IntValueMin?: number;
  IntValueMax?: number;
  DefaultValue?: string;
}
export type EndpointSettingsList = EndpointSetting[];
export interface DescribeEndpointSettingsResponse {
  Marker?: string;
  EndpointSettings?: EndpointSetting[];
}
export interface DescribeEndpointTypesMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface SupportedEndpointType {
  EngineName?: string;
  SupportsCDC?: boolean;
  EndpointType?: ReplicationEndpointTypeValue;
  ReplicationInstanceEngineMinimumVersion?: string;
  EngineDisplayName?: string;
}
export type SupportedEndpointTypeList = SupportedEndpointType[];
export interface DescribeEndpointTypesResponse {
  Marker?: string;
  SupportedEndpointTypes?: SupportedEndpointType[];
}
export interface DescribeEngineVersionsMessage {
  MaxRecords?: number;
  Marker?: string;
}
export type ReleaseStatusValues = "beta" | "prod" | (string & {});
export type AvailableUpgradesList = string[];
export interface EngineVersion {
  Version?: string;
  Lifecycle?: string;
  ReleaseStatus?: ReleaseStatusValues;
  LaunchDate?: Date;
  AutoUpgradeDate?: Date;
  DeprecationDate?: Date;
  ForceUpgradeDate?: Date;
  AvailableUpgrades?: string[];
}
export type EngineVersionList = EngineVersion[];
export interface DescribeEngineVersionsResponse {
  EngineVersions?: EngineVersion[];
  Marker?: string;
}
export interface DescribeEventCategoriesMessage {
  SourceType?: string;
  Filters?: Filter[];
}
export interface EventCategoryGroup {
  SourceType?: string;
  EventCategories?: string[];
}
export type EventCategoryGroupList = EventCategoryGroup[];
export interface DescribeEventCategoriesResponse {
  EventCategoryGroupList?: EventCategoryGroup[];
}
export type SourceType = "replication-instance" | (string & {});
export interface DescribeEventsMessage {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  EventCategories?: string[];
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface Event {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  Message?: string;
  EventCategories?: string[];
  Date?: Date;
}
export type EventList = Event[];
export interface DescribeEventsResponse {
  Marker?: string;
  Events?: Event[];
}
export interface DescribeEventSubscriptionsMessage {
  SubscriptionName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type EventSubscriptionsList = EventSubscription[];
export interface DescribeEventSubscriptionsResponse {
  Marker?: string;
  EventSubscriptionsList?: EventSubscription[];
}
export interface DescribeExtensionPackAssociationsMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type SchemaConversionRequestList = SchemaConversionRequest[];
export interface DescribeExtensionPackAssociationsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export interface DescribeFleetAdvisorCollectorsRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export type VersionStatus =
  | "UP_TO_DATE"
  | "OUTDATED"
  | "UNSUPPORTED"
  | (string & {});
export type CollectorStatus = "UNREGISTERED" | "ACTIVE" | (string & {});
export interface CollectorHealthCheck {
  CollectorStatus?: CollectorStatus;
  LocalCollectorS3Access?: boolean;
  WebCollectorS3Access?: boolean;
  WebCollectorGrantedRoleBasedAccess?: boolean;
}
export interface InventoryData {
  NumberOfDatabases?: number;
  NumberOfSchemas?: number;
}
export interface CollectorResponse {
  CollectorReferencedId?: string;
  CollectorName?: string;
  CollectorVersion?: string;
  VersionStatus?: VersionStatus;
  Description?: string;
  S3BucketName?: string;
  ServiceAccessRoleArn?: string;
  CollectorHealthCheck?: CollectorHealthCheck;
  LastDataReceived?: string;
  RegisteredDate?: string;
  CreatedDate?: string;
  ModifiedDate?: string;
  InventoryData?: InventoryData;
}
export type CollectorResponses = CollectorResponse[];
export interface DescribeFleetAdvisorCollectorsResponse {
  Collectors?: CollectorResponse[];
  NextToken?: string;
}
export interface DescribeFleetAdvisorDatabasesRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export interface ServerShortInfoResponse {
  ServerId?: string;
  IpAddress?: string;
  ServerName?: string;
}
export interface DatabaseInstanceSoftwareDetailsResponse {
  Engine?: string;
  EngineVersion?: string;
  EngineEdition?: string;
  ServicePack?: string;
  SupportLevel?: string;
  OsArchitecture?: number;
  Tooltip?: string;
}
export interface CollectorShortInfoResponse {
  CollectorReferencedId?: string;
  CollectorName?: string;
}
export type CollectorsList = CollectorShortInfoResponse[];
export interface DatabaseResponse {
  DatabaseId?: string;
  DatabaseName?: string;
  IpAddress?: string;
  NumberOfSchemas?: number;
  Server?: ServerShortInfoResponse;
  SoftwareDetails?: DatabaseInstanceSoftwareDetailsResponse;
  Collectors?: CollectorShortInfoResponse[];
}
export type DatabaseList = DatabaseResponse[];
export interface DescribeFleetAdvisorDatabasesResponse {
  Databases?: DatabaseResponse[];
  NextToken?: string;
}
export interface DescribeFleetAdvisorLsaAnalysisRequest {
  MaxRecords?: number;
  NextToken?: string;
}
export interface FleetAdvisorLsaAnalysisResponse {
  LsaAnalysisId?: string;
  Status?: string;
}
export type FleetAdvisorLsaAnalysisResponseList =
  FleetAdvisorLsaAnalysisResponse[];
export interface DescribeFleetAdvisorLsaAnalysisResponse {
  Analysis?: FleetAdvisorLsaAnalysisResponse[];
  NextToken?: string;
}
export interface DescribeFleetAdvisorSchemaObjectSummaryRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export interface FleetAdvisorSchemaObjectResponse {
  SchemaId?: string;
  ObjectType?: string;
  NumberOfObjects?: number;
  CodeLineCount?: number;
  CodeSize?: number;
}
export type FleetAdvisorSchemaObjectList = FleetAdvisorSchemaObjectResponse[];
export interface DescribeFleetAdvisorSchemaObjectSummaryResponse {
  FleetAdvisorSchemaObjects?: FleetAdvisorSchemaObjectResponse[];
  NextToken?: string;
}
export interface DescribeFleetAdvisorSchemasRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export interface DatabaseShortInfoResponse {
  DatabaseId?: string;
  DatabaseName?: string;
  DatabaseIpAddress?: string;
  DatabaseEngine?: string;
}
export interface SchemaShortInfoResponse {
  SchemaId?: string;
  SchemaName?: string;
  DatabaseId?: string;
  DatabaseName?: string;
  DatabaseIpAddress?: string;
}
export interface SchemaResponse {
  CodeLineCount?: number;
  CodeSize?: number;
  Complexity?: string;
  Server?: ServerShortInfoResponse;
  DatabaseInstance?: DatabaseShortInfoResponse;
  SchemaId?: string;
  SchemaName?: string;
  OriginalSchema?: SchemaShortInfoResponse;
  Similarity?: number;
}
export type FleetAdvisorSchemaList = SchemaResponse[];
export interface DescribeFleetAdvisorSchemasResponse {
  FleetAdvisorSchemas?: SchemaResponse[];
  NextToken?: string;
}
export interface DescribeInstanceProfilesMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type InstanceProfileList = InstanceProfile[];
export interface DescribeInstanceProfilesResponse {
  Marker?: string;
  InstanceProfiles?: InstanceProfile[];
}
export type OriginTypeValue = "SOURCE" | "TARGET" | (string & {});
export interface DescribeMetadataModelMessage {
  SelectionRules: string;
  MigrationProjectIdentifier: string;
  Origin: OriginTypeValue;
}
export interface MetadataModelReference {
  MetadataModelName?: string;
  SelectionRules?: string;
}
export type MetadataModelReferenceList = MetadataModelReference[];
export interface DescribeMetadataModelResponse {
  MetadataModelName?: string;
  MetadataModelType?: string;
  TargetMetadataModels?: MetadataModelReference[];
  Definition?: string;
}
export interface DescribeMetadataModelAssessmentsMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export interface DescribeMetadataModelAssessmentsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export interface DescribeMetadataModelChildrenMessage {
  SelectionRules: string;
  MigrationProjectIdentifier: string;
  Origin: OriginTypeValue;
  Marker?: string;
  MaxRecords?: number;
}
export interface DescribeMetadataModelChildrenResponse {
  Marker?: string;
  MetadataModelChildren?: MetadataModelReference[];
}
export interface DescribeMetadataModelConversionsMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export interface DescribeMetadataModelConversionsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export interface DescribeMetadataModelCreationsMessage {
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
  MigrationProjectIdentifier: string;
}
export interface DescribeMetadataModelCreationsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export interface DescribeMetadataModelExportsAsScriptMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export interface DescribeMetadataModelExportsAsScriptResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export interface DescribeMetadataModelExportsToTargetMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export interface DescribeMetadataModelExportsToTargetResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export interface DescribeMetadataModelImportsMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export interface DescribeMetadataModelImportsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export interface DescribeMigrationProjectsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type MigrationProjectList = MigrationProject[];
export interface DescribeMigrationProjectsResponse {
  Marker?: string;
  MigrationProjects?: MigrationProject[];
}
export interface DescribeOrderableReplicationInstancesMessage {
  MaxRecords?: number;
  Marker?: string;
}
export type AvailabilityZonesList = string[];
export interface OrderableReplicationInstance {
  EngineVersion?: string;
  ReplicationInstanceClass?: string;
  StorageType?: string;
  MinAllocatedStorage?: number;
  MaxAllocatedStorage?: number;
  DefaultAllocatedStorage?: number;
  IncludedAllocatedStorage?: number;
  AvailabilityZones?: string[];
  ReleaseStatus?: ReleaseStatusValues;
}
export type OrderableReplicationInstanceList = OrderableReplicationInstance[];
export interface DescribeOrderableReplicationInstancesResponse {
  OrderableReplicationInstances?: OrderableReplicationInstance[];
  Marker?: string;
}
export interface DescribePendingMaintenanceActionsMessage {
  ReplicationInstanceArn?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type PendingMaintenanceActions = ResourcePendingMaintenanceActions[];
export interface DescribePendingMaintenanceActionsResponse {
  PendingMaintenanceActions?: ResourcePendingMaintenanceActions[];
  Marker?: string;
}
export interface DescribeRecommendationLimitationsRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export interface Limitation {
  DatabaseId?: string;
  EngineName?: string;
  Name?: string;
  Description?: string;
  Impact?: string;
  Type?: string;
}
export type LimitationList = Limitation[];
export interface DescribeRecommendationLimitationsResponse {
  NextToken?: string;
  Limitations?: Limitation[];
}
export interface DescribeRecommendationsRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export interface RdsRequirements {
  EngineEdition?: string;
  InstanceVcpu?: number;
  InstanceMemory?: number;
  StorageSize?: number;
  StorageIops?: number;
  DeploymentOption?: string;
  EngineVersion?: string;
}
export interface RdsConfiguration {
  EngineEdition?: string;
  InstanceType?: string;
  InstanceVcpu?: number;
  InstanceMemory?: number;
  StorageType?: string;
  StorageSize?: number;
  StorageIops?: number;
  DeploymentOption?: string;
  EngineVersion?: string;
}
export interface RdsRecommendation {
  RequirementsToTarget?: RdsRequirements;
  TargetConfiguration?: RdsConfiguration;
}
export interface RecommendationData {
  RdsEngine?: RdsRecommendation;
}
export interface Recommendation {
  DatabaseId?: string;
  EngineName?: string;
  CreatedDate?: string;
  Status?: string;
  Preferred?: boolean;
  Settings?: RecommendationSettings;
  Data?: RecommendationData;
}
export type RecommendationList = Recommendation[];
export interface DescribeRecommendationsResponse {
  NextToken?: string;
  Recommendations?: Recommendation[];
}
export interface DescribeRefreshSchemasStatusMessage {
  EndpointArn: string;
}
export type RefreshSchemasStatusTypeValue =
  | "successful"
  | "failed"
  | "refreshing"
  | (string & {});
export interface RefreshSchemasStatus {
  EndpointArn?: string;
  ReplicationInstanceArn?: string;
  Status?: RefreshSchemasStatusTypeValue;
  LastRefreshDate?: Date;
  LastFailureMessage?: string;
}
export interface DescribeRefreshSchemasStatusResponse {
  RefreshSchemasStatus?: RefreshSchemasStatus;
}
export interface DescribeReplicationConfigsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type ReplicationConfigList = ReplicationConfig[];
export interface DescribeReplicationConfigsResponse {
  Marker?: string;
  ReplicationConfigs?: ReplicationConfig[];
}
export interface DescribeReplicationInstancesMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type ReplicationInstanceList = ReplicationInstance[];
export interface DescribeReplicationInstancesResponse {
  Marker?: string;
  ReplicationInstances?: ReplicationInstance[];
}
export interface DescribeReplicationInstanceTaskLogsMessage {
  ReplicationInstanceArn: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ReplicationInstanceTaskLog {
  ReplicationTaskName?: string;
  ReplicationTaskArn?: string;
  ReplicationInstanceTaskLogSize?: number;
}
export type ReplicationInstanceTaskLogsList = ReplicationInstanceTaskLog[];
export interface DescribeReplicationInstanceTaskLogsResponse {
  ReplicationInstanceArn?: string;
  ReplicationInstanceTaskLogs?: ReplicationInstanceTaskLog[];
  Marker?: string;
}
export interface DescribeReplicationsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface ProvisionData {
  ProvisionState?: string;
  ProvisionedCapacityUnits?: number;
  DateProvisioned?: Date;
  IsNewProvisioningAvailable?: boolean;
  DateNewProvisioningDataAvailable?: Date;
  ReasonForNewProvisioningData?: string;
}
export interface PremigrationAssessmentStatus {
  PremigrationAssessmentRunArn?: string;
  FailOnAssessmentFailure?: boolean;
  Status?: string;
  PremigrationAssessmentRunCreationDate?: Date;
  AssessmentProgress?: ReplicationTaskAssessmentRunProgress;
  LastFailureMessage?: string;
  ResultLocationBucket?: string;
  ResultLocationFolder?: string;
  ResultEncryptionMode?: string;
  ResultKmsKeyArn?: string;
  ResultStatistic?: ReplicationTaskAssessmentRunResultStatistic;
}
export type PremigrationAssessmentStatusList = PremigrationAssessmentStatus[];
export interface ReplicationStats {
  FullLoadProgressPercent?: number;
  ElapsedTimeMillis?: number;
  TablesLoaded?: number;
  TablesLoading?: number;
  TablesQueued?: number;
  TablesErrored?: number;
  FreshStartDate?: Date;
  StartDate?: Date;
  StopDate?: Date;
  FullLoadStartDate?: Date;
  FullLoadFinishDate?: Date;
}
export interface Replication {
  ReplicationConfigIdentifier?: string;
  ReplicationConfigArn?: string;
  SourceEndpointArn?: string;
  TargetEndpointArn?: string;
  ReplicationType?: MigrationTypeValue;
  Status?: string;
  ProvisionData?: ProvisionData;
  PremigrationAssessmentStatuses?: PremigrationAssessmentStatus[];
  StopReason?: string;
  FailureMessages?: string[];
  ReplicationStats?: ReplicationStats;
  StartReplicationType?: string;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
  RecoveryCheckpoint?: string;
  ReplicationCreateTime?: Date;
  ReplicationUpdateTime?: Date;
  ReplicationLastStopTime?: Date;
  ReplicationDeprovisionTime?: Date;
  IsReadOnly?: boolean;
}
export type ReplicationList = Replication[];
export interface DescribeReplicationsResponse {
  Marker?: string;
  Replications?: Replication[];
}
export interface DescribeReplicationSubnetGroupsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type ReplicationSubnetGroups = ReplicationSubnetGroup[];
export interface DescribeReplicationSubnetGroupsResponse {
  Marker?: string;
  ReplicationSubnetGroups?: ReplicationSubnetGroup[];
}
export interface DescribeReplicationTableStatisticsMessage {
  ReplicationConfigArn: string;
  MaxRecords?: number;
  Marker?: string;
  Filters?: Filter[];
}
export interface TableStatistics {
  SchemaName?: string;
  TableName?: string;
  Inserts?: number;
  Deletes?: number;
  Updates?: number;
  Ddls?: number;
  AppliedInserts?: number;
  AppliedDeletes?: number;
  AppliedUpdates?: number;
  AppliedDdls?: number;
  FullLoadRows?: number;
  FullLoadCondtnlChkFailedRows?: number;
  FullLoadErrorRows?: number;
  FullLoadStartTime?: Date;
  FullLoadEndTime?: Date;
  FullLoadReloaded?: boolean;
  LastUpdateTime?: Date;
  TableState?: string;
  ValidationPendingRecords?: number;
  ValidationFailedRecords?: number;
  ValidationSuspendedRecords?: number;
  ValidationState?: string;
  ValidationStateDetails?: string;
  ResyncState?: string;
  ResyncRowsAttempted?: number;
  ResyncRowsSucceeded?: number;
  ResyncRowsFailed?: number;
  ResyncProgress?: number;
}
export type ReplicationTableStatisticsList = TableStatistics[];
export interface DescribeReplicationTableStatisticsResponse {
  ReplicationConfigArn?: string;
  Marker?: string;
  ReplicationTableStatistics?: TableStatistics[];
}
export interface DescribeReplicationTaskAssessmentResultsMessage {
  ReplicationTaskArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ReplicationTaskAssessmentResult {
  ReplicationTaskIdentifier?: string;
  ReplicationTaskArn?: string;
  ReplicationTaskLastAssessmentDate?: Date;
  AssessmentStatus?: string;
  AssessmentResultsFile?: string;
  AssessmentResults?: string;
  S3ObjectUrl?: string | redacted.Redacted<string>;
}
export type ReplicationTaskAssessmentResultList =
  ReplicationTaskAssessmentResult[];
export interface DescribeReplicationTaskAssessmentResultsResponse {
  Marker?: string;
  BucketName?: string;
  ReplicationTaskAssessmentResults?: ReplicationTaskAssessmentResult[];
}
export interface DescribeReplicationTaskAssessmentRunsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type ReplicationTaskAssessmentRunList = ReplicationTaskAssessmentRun[];
export interface DescribeReplicationTaskAssessmentRunsResponse {
  Marker?: string;
  ReplicationTaskAssessmentRuns?: ReplicationTaskAssessmentRun[];
}
export interface DescribeReplicationTaskIndividualAssessmentsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface ReplicationTaskIndividualAssessment {
  ReplicationTaskIndividualAssessmentArn?: string;
  ReplicationTaskAssessmentRunArn?: string;
  IndividualAssessmentName?: string;
  Status?: string;
  ReplicationTaskIndividualAssessmentStartDate?: Date;
}
export type ReplicationTaskIndividualAssessmentList =
  ReplicationTaskIndividualAssessment[];
export interface DescribeReplicationTaskIndividualAssessmentsResponse {
  Marker?: string;
  ReplicationTaskIndividualAssessments?: ReplicationTaskIndividualAssessment[];
}
export interface DescribeReplicationTasksMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  WithoutSettings?: boolean;
}
export type ReplicationTaskList = ReplicationTask[];
export interface DescribeReplicationTasksResponse {
  Marker?: string;
  ReplicationTasks?: ReplicationTask[];
}
export interface DescribeSchemasMessage {
  EndpointArn: string;
  MaxRecords?: number;
  Marker?: string;
}
export type SchemaList = string[];
export interface DescribeSchemasResponse {
  Marker?: string;
  Schemas?: string[];
}
export interface DescribeTableStatisticsMessage {
  ReplicationTaskArn: string;
  MaxRecords?: number;
  Marker?: string;
  Filters?: Filter[];
}
export type TableStatisticsList = TableStatistics[];
export interface DescribeTableStatisticsResponse {
  ReplicationTaskArn?: string;
  TableStatistics?: TableStatistics[];
  Marker?: string;
}
export type AssessmentReportType = "pdf" | "csv" | (string & {});
export type AssessmentReportTypesList = AssessmentReportType[];
export interface ExportMetadataModelAssessmentMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  FileName?: string;
  AssessmentReportTypes?: AssessmentReportType[];
}
export interface ExportMetadataModelAssessmentResultEntry {
  S3ObjectKey?: string;
  ObjectURL?: string;
}
export interface ExportMetadataModelAssessmentResponse {
  PdfReport?: ExportMetadataModelAssessmentResultEntry;
  CsvReport?: ExportMetadataModelAssessmentResultEntry;
}
export interface GetTargetSelectionRulesMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
}
export interface GetTargetSelectionRulesResponse {
  TargetSelectionRules?: string;
}
export interface ImportCertificateMessage {
  CertificateIdentifier: string;
  CertificatePem?: string | redacted.Redacted<string>;
  CertificateWallet?: Uint8Array;
  Tags?: Tag[];
  KmsKeyId?: string;
}
export interface ImportCertificateResponse {
  Certificate?: Certificate;
}
export type ArnList = string[];
export interface ListTagsForResourceMessage {
  ResourceArn?: string;
  ResourceArnList?: string[];
}
export interface ListTagsForResourceResponse {
  TagList?: Tag[];
}
export interface ModifyConversionConfigurationMessage {
  MigrationProjectIdentifier: string;
  ConversionConfiguration: string;
}
export interface ModifyConversionConfigurationResponse {
  MigrationProjectIdentifier?: string;
}
export interface ModifyDataMigrationMessage {
  DataMigrationIdentifier: string;
  DataMigrationName?: string;
  EnableCloudwatchLogs?: boolean;
  ServiceAccessRoleArn?: string;
  DataMigrationType?: MigrationTypeValue;
  SourceDataSettings?: SourceDataSetting[];
  TargetDataSettings?: TargetDataSetting[];
  NumberOfJobs?: number;
  SelectionRules?: string | redacted.Redacted<string>;
}
export interface ModifyDataMigrationResponse {
  DataMigration?: DataMigration;
}
export interface ModifyDataProviderMessage {
  DataProviderIdentifier: string;
  DataProviderName?: string;
  Description?: string;
  Engine?: string;
  Virtual?: boolean;
  ExactSettings?: boolean;
  Settings?: DataProviderSettings;
}
export interface ModifyDataProviderResponse {
  DataProvider?: DataProvider;
}
export interface ModifyEndpointMessage {
  EndpointArn: string;
  EndpointIdentifier?: string;
  EndpointType?: ReplicationEndpointTypeValue;
  EngineName?: string;
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  ExtraConnectionAttributes?: string;
  CertificateArn?: string;
  SslMode?: DmsSslModeValue;
  ServiceAccessRoleArn?: string;
  ExternalTableDefinition?: string;
  DynamoDbSettings?: DynamoDbSettings;
  S3Settings?: S3Settings;
  DmsTransferSettings?: DmsTransferSettings;
  MongoDbSettings?: MongoDbSettings;
  KinesisSettings?: KinesisSettings;
  KafkaSettings?: KafkaSettings;
  ElasticsearchSettings?: ElasticsearchSettings;
  NeptuneSettings?: NeptuneSettings;
  RedshiftSettings?: RedshiftSettings;
  PostgreSQLSettings?: PostgreSQLSettings;
  MySQLSettings?: MySQLSettings;
  OracleSettings?: OracleSettings;
  SybaseSettings?: SybaseSettings;
  MicrosoftSQLServerSettings?: MicrosoftSQLServerSettings;
  IBMDb2Settings?: IBMDb2Settings;
  DocDbSettings?: DocDbSettings;
  RedisSettings?: RedisSettings;
  ExactSettings?: boolean;
  GcpMySQLSettings?: GcpMySQLSettings;
  TimestreamSettings?: TimestreamSettings;
}
export interface ModifyEndpointResponse {
  Endpoint?: Endpoint;
}
export interface ModifyEventSubscriptionMessage {
  SubscriptionName: string;
  SnsTopicArn?: string;
  SourceType?: string;
  EventCategories?: string[];
  Enabled?: boolean;
}
export interface ModifyEventSubscriptionResponse {
  EventSubscription?: EventSubscription;
}
export interface ModifyInstanceProfileMessage {
  InstanceProfileIdentifier: string;
  AvailabilityZone?: string;
  KmsKeyArn?: string;
  PubliclyAccessible?: boolean;
  NetworkType?: string;
  InstanceProfileName?: string;
  Description?: string;
  SubnetGroupIdentifier?: string;
  VpcSecurityGroups?: string[];
}
export interface ModifyInstanceProfileResponse {
  InstanceProfile?: InstanceProfile;
}
export interface ModifyMigrationProjectMessage {
  MigrationProjectIdentifier: string;
  MigrationProjectName?: string;
  SourceDataProviderDescriptors?: DataProviderDescriptorDefinition[];
  TargetDataProviderDescriptors?: DataProviderDescriptorDefinition[];
  InstanceProfileIdentifier?: string;
  TransformationRules?: string;
  Description?: string;
  SchemaConversionApplicationAttributes?: SCApplicationAttributes;
}
export interface ModifyMigrationProjectResponse {
  MigrationProject?: MigrationProject;
}
export interface ModifyReplicationConfigMessage {
  ReplicationConfigArn: string;
  ReplicationConfigIdentifier?: string;
  ReplicationType?: MigrationTypeValue;
  TableMappings?: string;
  ReplicationSettings?: string;
  SupplementalSettings?: string;
  ComputeConfig?: ComputeConfig;
  SourceEndpointArn?: string;
  TargetEndpointArn?: string;
}
export interface ModifyReplicationConfigResponse {
  ReplicationConfig?: ReplicationConfig;
}
export interface ModifyReplicationInstanceMessage {
  ReplicationInstanceArn: string;
  AllocatedStorage?: number;
  ApplyImmediately?: boolean;
  ReplicationInstanceClass?: string;
  VpcSecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AllowMajorVersionUpgrade?: boolean;
  AutoMinorVersionUpgrade?: boolean;
  ReplicationInstanceIdentifier?: string;
  NetworkType?: string;
  KerberosAuthenticationSettings?: KerberosAuthenticationSettings;
}
export interface ModifyReplicationInstanceResponse {
  ReplicationInstance?: ReplicationInstance;
}
export interface ModifyReplicationSubnetGroupMessage {
  ReplicationSubnetGroupIdentifier: string;
  ReplicationSubnetGroupDescription?: string;
  SubnetIds: string[];
}
export interface ModifyReplicationSubnetGroupResponse {
  ReplicationSubnetGroup?: ReplicationSubnetGroup;
}
export interface ModifyReplicationTaskMessage {
  ReplicationTaskArn: string;
  ReplicationTaskIdentifier?: string;
  MigrationType?: MigrationTypeValue;
  TableMappings?: string;
  ReplicationTaskSettings?: string;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
  TaskData?: string;
}
export interface ModifyReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export interface MoveReplicationTaskMessage {
  ReplicationTaskArn: string;
  TargetReplicationInstanceArn: string;
}
export interface MoveReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export interface RebootReplicationInstanceMessage {
  ReplicationInstanceArn: string;
  ForceFailover?: boolean;
  ForcePlannedFailover?: boolean;
}
export interface RebootReplicationInstanceResponse {
  ReplicationInstance?: ReplicationInstance;
}
export interface RefreshSchemasMessage {
  EndpointArn: string;
  ReplicationInstanceArn: string;
}
export interface RefreshSchemasResponse {
  RefreshSchemasStatus?: RefreshSchemasStatus;
}
export interface TableToReload {
  SchemaName: string;
  TableName: string;
}
export type TableListToReload = TableToReload[];
export type ReloadOptionValue = "data-reload" | "validate-only" | (string & {});
export interface ReloadReplicationTablesMessage {
  ReplicationConfigArn: string;
  TablesToReload: TableToReload[];
  ReloadOption?: ReloadOptionValue;
}
export interface ReloadReplicationTablesResponse {
  ReplicationConfigArn?: string;
}
export interface ReloadTablesMessage {
  ReplicationTaskArn: string;
  TablesToReload: TableToReload[];
  ReloadOption?: ReloadOptionValue;
}
export interface ReloadTablesResponse {
  ReplicationTaskArn?: string;
}
export type KeyList = string[];
export interface RemoveTagsFromResourceMessage {
  ResourceArn: string;
  TagKeys: string[];
}
export interface RemoveTagsFromResourceResponse {}
export interface RunFleetAdvisorLsaAnalysisRequest {}
export interface RunFleetAdvisorLsaAnalysisResponse {
  LsaAnalysisId?: string;
  Status?: string;
}
export type StartReplicationMigrationTypeValue =
  | "reload-target"
  | "resume-processing"
  | "start-replication"
  | (string & {});
export interface StartDataMigrationMessage {
  DataMigrationIdentifier: string;
  StartType: StartReplicationMigrationTypeValue;
}
export interface StartDataMigrationResponse {
  DataMigration?: DataMigration;
}
export interface StartExtensionPackAssociationMessage {
  MigrationProjectIdentifier: string;
}
export interface StartExtensionPackAssociationResponse {
  RequestIdentifier?: string;
}
export interface StartMetadataModelAssessmentMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
}
export interface StartMetadataModelAssessmentResponse {
  RequestIdentifier?: string;
}
export interface StartMetadataModelConversionMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
}
export interface StartMetadataModelConversionResponse {
  RequestIdentifier?: string;
}
export interface StatementProperties {
  Definition: string;
}
export type MetadataModelProperties = {
  StatementProperties: StatementProperties;
};
export interface StartMetadataModelCreationMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  MetadataModelName: string;
  Properties: MetadataModelProperties;
}
export interface StartMetadataModelCreationResponse {
  RequestIdentifier?: string;
}
export interface StartMetadataModelExportAsScriptMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  Origin: OriginTypeValue;
  FileName?: string;
}
export interface StartMetadataModelExportAsScriptResponse {
  RequestIdentifier?: string;
}
export interface StartMetadataModelExportToTargetMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  OverwriteExtensionPack?: boolean;
}
export interface StartMetadataModelExportToTargetResponse {
  RequestIdentifier?: string;
}
export interface StartMetadataModelImportMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  Origin: OriginTypeValue;
  Refresh?: boolean;
}
export interface StartMetadataModelImportResponse {
  RequestIdentifier?: string;
}
export interface StartRecommendationsRequest {
  DatabaseId: string;
  Settings: RecommendationSettings;
}
export interface StartRecommendationsResponse {}
export interface StartReplicationMessage {
  ReplicationConfigArn: string;
  StartReplicationType: string;
  PremigrationAssessmentSettings?: string;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
}
export interface StartReplicationResponse {
  Replication?: Replication;
}
export type StartReplicationTaskTypeValue =
  | "start-replication"
  | "resume-processing"
  | "reload-target"
  | (string & {});
export interface StartReplicationTaskMessage {
  ReplicationTaskArn: string;
  StartReplicationTaskType: StartReplicationTaskTypeValue;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
}
export interface StartReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export interface StartReplicationTaskAssessmentMessage {
  ReplicationTaskArn: string;
}
export interface StartReplicationTaskAssessmentResponse {
  ReplicationTask?: ReplicationTask;
}
export type IncludeTestList = string[];
export type ExcludeTestList = string[];
export interface StartReplicationTaskAssessmentRunMessage {
  ReplicationTaskArn: string;
  ServiceAccessRoleArn: string;
  ResultLocationBucket: string;
  ResultLocationFolder?: string;
  ResultEncryptionMode?: string;
  ResultKmsKeyArn?: string;
  AssessmentRunName: string;
  IncludeOnly?: string[];
  Exclude?: string[];
  Tags?: Tag[];
}
export interface StartReplicationTaskAssessmentRunResponse {
  ReplicationTaskAssessmentRun?: ReplicationTaskAssessmentRun;
}
export interface StopDataMigrationMessage {
  DataMigrationIdentifier: string;
}
export interface StopDataMigrationResponse {
  DataMigration?: DataMigration;
}
export interface StopReplicationMessage {
  ReplicationConfigArn: string;
}
export interface StopReplicationResponse {
  Replication?: Replication;
}
export interface StopReplicationTaskMessage {
  ReplicationTaskArn: string;
}
export interface StopReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export interface TestConnectionMessage {
  ReplicationInstanceArn: string;
  EndpointArn: string;
}
export interface TestConnectionResponse {
  Connection?: Connection;
}
export interface UpdateSubscriptionsToEventBridgeMessage {
  ForceMove?: boolean;
}
export interface UpdateSubscriptionsToEventBridgeResponse {
  Result?: string;
}
export type ExceptionMessage = string;
export type ResourceArn = string;
export type AddTagsToResourceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Adds metadata tags to an DMS resource, including replication instance, endpoint,
 * subnet group, and migration task. These tags can also be used with cost allocation
 * reporting to track cost associated with DMS resources, or used in a Condition statement in
 * an IAM policy for DMS. For more information, see
 * `Tag`
 * data type
 * description.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceMessage,
  AddTagsToResourceResponse,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
})) as any;

export type ApplyPendingMaintenanceActionError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Applies a pending maintenance action to a resource (for example, to a replication
 * instance).
 */
export const applyPendingMaintenanceAction: API.OperationMethod<
  ApplyPendingMaintenanceActionMessage,
  ApplyPendingMaintenanceActionResponse,
  ApplyPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationInstanceArn: 0, ApplyAction: 0, OptInType: 0 },
    output: {
      ResourcePendingMaintenanceActions: o_ResourcePendingMaintenanceActions,
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyPendingMaintenanceAction",
})) as any;

export type BatchStartRecommendationsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Starts the analysis of up to 20 source databases to recommend target engines for each
 * source database. This is a batch version of StartRecommendations.
 *
 * The result of analysis of each source database is reported individually in the
 * response. Because the batch request can result in a combination of successful and
 * unsuccessful actions, you should check for batch errors even when the call returns an
 * HTTP status code of `200`.
 */
export const batchStartRecommendations: API.OperationMethod<
  BatchStartRecommendationsRequest,
  BatchStartRecommendationsResponse,
  BatchStartRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Data: D.list({ DatabaseId: 0, Settings: i_RecommendationSettings }),
    },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStartRecommendations",
})) as any;

export type CancelMetadataModelConversionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Cancels a single metadata model conversion operation that was started with `StartMetadataModelConversion`.
 *
 * **Required permissions:**
 * `dms:CancelMetadataModelConversion`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const cancelMetadataModelConversion: API.OperationMethod<
  CancelMetadataModelConversionMessage,
  CancelMetadataModelConversionResponse,
  CancelMetadataModelConversionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MigrationProjectIdentifier: 0, RequestIdentifier: 0 },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMetadataModelConversion",
})) as any;

export type CancelMetadataModelCreationError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Cancels a single metadata model creation operation that was started with `StartMetadataModelCreation`.
 *
 * **Required permissions:**
 * `dms:CancelMetadataModelCreation`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const cancelMetadataModelCreation: API.OperationMethod<
  CancelMetadataModelCreationMessage,
  CancelMetadataModelCreationResponse,
  CancelMetadataModelCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MigrationProjectIdentifier: 0, RequestIdentifier: 0 },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMetadataModelCreation",
})) as any;

export type CancelReplicationTaskAssessmentRunError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Cancels a single premigration assessment run.
 *
 * This operation prevents any individual assessments from running if they haven't started
 * running. It also attempts to cancel any individual assessments that are currently
 * running.
 */
export const cancelReplicationTaskAssessmentRun: API.OperationMethod<
  CancelReplicationTaskAssessmentRunMessage,
  CancelReplicationTaskAssessmentRunResponse,
  CancelReplicationTaskAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationTaskAssessmentRunArn: 0 },
    output: { ReplicationTaskAssessmentRun: o_ReplicationTaskAssessmentRun },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelReplicationTaskAssessmentRun",
})) as any;

export type CreateDataMigrationError =
  | FailedDependencyFault
  | InvalidOperationFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a data migration using the provided settings.
 */
export const createDataMigration: API.OperationMethod<
  CreateDataMigrationMessage,
  CreateDataMigrationResponse,
  CreateDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DataMigrationName: 0,
      MigrationProjectIdentifier: 0,
      DataMigrationType: 0,
      ServiceAccessRoleArn: 0,
      EnableCloudwatchLogs: 0,
      SourceDataSettings: D.list(i_SourceDataSetting),
      TargetDataSettings: D.list(i_TargetDataSetting),
      NumberOfJobs: 0,
      Tags: D.list(i_Tag),
      SelectionRules: 0,
    },
    output: { DataMigration: o_DataMigration },
  },
  errors: [
    FailedDependencyFault,
    InvalidOperationFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataMigration",
})) as any;

export type CreateDataProviderError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceAlreadyExistsFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a data provider using the provided settings. A data provider stores a data store
 * type and location information about your database.
 *
 * **Required permissions:**
 * `dms:CreateDataProvider`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const createDataProvider: API.OperationMethod<
  CreateDataProviderMessage,
  CreateDataProviderResponse,
  CreateDataProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DataProviderName: 0,
      Description: 0,
      Engine: 0,
      Virtual: 0,
      Settings: i_DataProviderSettings,
      Tags: D.list(i_Tag),
    },
    output: { DataProvider: o_DataProvider },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    ResourceAlreadyExistsFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataProvider",
})) as any;

export type CreateEndpointError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | CommonErrors;
/**
 * Creates an endpoint using the provided settings.
 *
 * For a MySQL source or target endpoint, don't explicitly specify the database using
 * the `DatabaseName` request parameter on the `CreateEndpoint` API
 * call. Specifying `DatabaseName` when you create a MySQL endpoint replicates
 * all the task tables to this single database. For MySQL endpoints, you specify the
 * database only when you specify the schema in the table-mapping rules of the DMS
 * task.
 */
export const createEndpoint: API.OperationMethod<
  CreateEndpointMessage,
  CreateEndpointResponse,
  CreateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointIdentifier: 0,
      EndpointType: 0,
      EngineName: 0,
      Username: 0,
      Password: 0,
      ServerName: 0,
      Port: 0,
      DatabaseName: 0,
      ExtraConnectionAttributes: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag),
      CertificateArn: 0,
      SslMode: 0,
      ServiceAccessRoleArn: 0,
      ExternalTableDefinition: 0,
      DynamoDbSettings: i_DynamoDbSettings,
      S3Settings: i_S3Settings,
      DmsTransferSettings: i_DmsTransferSettings,
      MongoDbSettings: i_MongoDbSettings,
      KinesisSettings: i_KinesisSettings,
      KafkaSettings: i_KafkaSettings,
      ElasticsearchSettings: i_ElasticsearchSettings,
      NeptuneSettings: i_NeptuneSettings,
      RedshiftSettings: i_RedshiftSettings,
      PostgreSQLSettings: i_PostgreSQLSettings,
      MySQLSettings: i_MySQLSettings,
      OracleSettings: i_OracleSettings,
      SybaseSettings: i_SybaseSettings,
      MicrosoftSQLServerSettings: i_MicrosoftSQLServerSettings,
      IBMDb2Settings: i_IBMDb2Settings,
      ResourceIdentifier: 0,
      DocDbSettings: i_DocDbSettings,
      RedisSettings: i_RedisSettings,
      GcpMySQLSettings: i_GcpMySQLSettings,
      TimestreamSettings: i_TimestreamSettings,
    },
    output: { Endpoint: o_Endpoint },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpoint",
})) as any;

export type CreateEventSubscriptionError =
  | KMSAccessDeniedFault
  | KMSDisabledFault
  | KMSInvalidStateFault
  | KMSNotFoundFault
  | KMSThrottlingFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | CommonErrors;
/**
 * Creates an DMS event notification subscription.
 *
 * You can specify the type of source (`SourceType`) you want to be notified of,
 * provide a list of DMS source IDs (`SourceIds`) that triggers the events, and
 * provide a list of event categories (`EventCategories`) for events you want to be
 * notified of. If you specify both the `SourceType` and `SourceIds`,
 * such as `SourceType = replication-instance` and SourceIdentifier =
 * my-replinstance, you will be notified of all the replication instance events for
 * the specified source. If you specify a `SourceType` but don't specify a
 * `SourceIdentifier`, you receive notice of the events for that source type for
 * all your DMS sources. If you don't specify either `SourceType` nor
 * `SourceIdentifier`, you will be notified of events generated from all DMS
 * sources belonging to your customer account.
 *
 * For more information about DMS events, see Working with Events and
 * Notifications in the *Database Migration Service User Guide.*
 */
export const createEventSubscription: API.OperationMethod<
  CreateEventSubscriptionMessage,
  CreateEventSubscriptionResponse,
  CreateEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      SnsTopicArn: 0,
      SourceType: 0,
      EventCategories: 0,
      SourceIds: 0,
      Enabled: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    KMSAccessDeniedFault,
    KMSDisabledFault,
    KMSInvalidStateFault,
    KMSNotFoundFault,
    KMSThrottlingFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSubscription",
})) as any;

export type CreateFleetAdvisorCollectorError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Creates a Fleet Advisor collector using the specified parameters.
 */
export const createFleetAdvisorCollector: API.OperationMethod<
  CreateFleetAdvisorCollectorRequest,
  CreateFleetAdvisorCollectorResponse,
  CreateFleetAdvisorCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectorName: 0,
      Description: 0,
      ServiceAccessRoleArn: 0,
      S3BucketName: 0,
    },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleetAdvisorCollector",
})) as any;

export type CreateInstanceProfileError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Creates the instance profile using the specified parameters.
 *
 * **Required permissions:**
 * `dms:CreateInstanceProfile`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const createInstanceProfile: API.OperationMethod<
  CreateInstanceProfileMessage,
  CreateInstanceProfileResponse,
  CreateInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AvailabilityZone: 0,
      KmsKeyArn: 0,
      PubliclyAccessible: 0,
      Tags: D.list(i_Tag),
      NetworkType: 0,
      InstanceProfileName: 0,
      Description: 0,
      SubnetGroupIdentifier: 0,
      VpcSecurityGroups: 0,
    },
    output: { InstanceProfile: o_InstanceProfile },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceProfile",
})) as any;

export type CreateMigrationProjectError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Creates the migration project using the specified parameters.
 *
 * You can run this action only after you create an instance profile and data providers
 * using CreateInstanceProfile and CreateDataProvider.
 *
 * **Required permissions:**
 * `dms:CreateMigrationProject`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const createMigrationProject: API.OperationMethod<
  CreateMigrationProjectMessage,
  CreateMigrationProjectResponse,
  CreateMigrationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectName: 0,
      SourceDataProviderDescriptors: D.list(i_DataProviderDescriptorDefinition),
      TargetDataProviderDescriptors: D.list(i_DataProviderDescriptorDefinition),
      InstanceProfileIdentifier: 0,
      TransformationRules: 0,
      Description: 0,
      Tags: D.list(i_Tag),
      SchemaConversionApplicationAttributes: i_SCApplicationAttributes,
    },
    output: { MigrationProject: o_MigrationProject },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMigrationProject",
})) as any;

export type CreateReplicationConfigError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | InvalidSubnet
  | KMSKeyNotAccessibleFault
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a configuration that you can later provide to configure and start an DMS
 * Serverless replication. You can also provide options to validate the configuration inputs
 * before you start the replication.
 */
export const createReplicationConfig: API.OperationMethod<
  CreateReplicationConfigMessage,
  CreateReplicationConfigResponse,
  CreateReplicationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationConfigIdentifier: 0,
      SourceEndpointArn: 0,
      TargetEndpointArn: 0,
      ComputeConfig: i_ComputeConfig,
      ReplicationType: 0,
      TableMappings: 0,
      ReplicationSettings: 0,
      SupplementalSettings: 0,
      ResourceIdentifier: 0,
      Tags: D.list(i_Tag),
    },
    output: { ReplicationConfig: o_ReplicationConfig },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    InvalidSubnet,
    KMSKeyNotAccessibleFault,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfig",
})) as any;

export type CreateReplicationInstanceError =
  | AccessDeniedFault
  | InsufficientResourceCapacityFault
  | InvalidResourceStateFault
  | InvalidSubnet
  | KMSKeyNotAccessibleFault
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates the replication instance using the specified parameters.
 *
 * DMS requires that your account have certain roles with appropriate permissions before
 * you can create a replication instance. For information on the required roles, see Creating the IAM Roles to Use With the CLI and DMS API. For information on
 * the required permissions, see IAM
 * Permissions Needed to Use DMS.
 *
 * If you don't specify a version when creating a replication instance, DMS will
 * create the instance using the default engine version. For information about the default
 * engine version, see Release Notes.
 */
export const createReplicationInstance: API.OperationMethod<
  CreateReplicationInstanceMessage,
  CreateReplicationInstanceResponse,
  CreateReplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationInstanceIdentifier: 0,
      AllocatedStorage: 0,
      ReplicationInstanceClass: 0,
      VpcSecurityGroupIds: 0,
      AvailabilityZone: 0,
      ReplicationSubnetGroupIdentifier: 0,
      PreferredMaintenanceWindow: 0,
      MultiAZ: 0,
      EngineVersion: 0,
      AutoMinorVersionUpgrade: 0,
      Tags: D.list(i_Tag),
      KmsKeyId: 0,
      PubliclyAccessible: 0,
      DnsNameServers: 0,
      ResourceIdentifier: 0,
      NetworkType: 0,
      KerberosAuthenticationSettings: i_KerberosAuthenticationSettings,
    },
    output: { ReplicationInstance: o_ReplicationInstance },
  },
  errors: [
    AccessDeniedFault,
    InsufficientResourceCapacityFault,
    InvalidResourceStateFault,
    InvalidSubnet,
    KMSKeyNotAccessibleFault,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationInstance",
})) as any;

export type CreateReplicationSubnetGroupError =
  | AccessDeniedFault
  | InvalidSubnet
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a replication subnet group given a list of the subnet IDs in a VPC.
 *
 * The VPC needs to have at least one subnet in at least two availability zones in the
 * Amazon Web Services Region, otherwise the service will throw a
 * `ReplicationSubnetGroupDoesNotCoverEnoughAZs` exception.
 *
 * If a replication subnet group exists in your Amazon Web Services account, the
 * CreateReplicationSubnetGroup action returns the following error message: The Replication
 * Subnet Group already exists. In this case, delete the existing replication subnet group. To
 * do so, use the DeleteReplicationSubnetGroup action. Optionally, choose Subnet groups in the
 * DMS console, then choose your subnet group. Next, choose Delete from Actions.
 */
export const createReplicationSubnetGroup: API.OperationMethod<
  CreateReplicationSubnetGroupMessage,
  CreateReplicationSubnetGroupResponse,
  CreateReplicationSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationSubnetGroupIdentifier: 0,
      ReplicationSubnetGroupDescription: 0,
      SubnetIds: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedFault,
    InvalidSubnet,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationSubnetGroup",
})) as any;

export type CreateReplicationTaskError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a replication task using the specified parameters.
 */
export const createReplicationTask: API.OperationMethod<
  CreateReplicationTaskMessage,
  CreateReplicationTaskResponse,
  CreateReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationTaskIdentifier: 0,
      SourceEndpointArn: 0,
      TargetEndpointArn: 0,
      ReplicationInstanceArn: 0,
      MigrationType: 0,
      TableMappings: 0,
      ReplicationTaskSettings: 0,
      CdcStartTime: 0,
      CdcStartPosition: 0,
      CdcStopPosition: 0,
      Tags: D.list(i_Tag),
      TaskData: 0,
      ResourceIdentifier: 0,
    },
    output: { ReplicationTask: o_ReplicationTask },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationTask",
})) as any;

export type DeleteCertificateError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified certificate.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateMessage,
  DeleteCertificateResponse,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0 },
    output: { Certificate: o_Certificate },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
})) as any;

export type DeleteConnectionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the connection between a replication instance and an endpoint.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionMessage,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointArn: 0, ReplicationInstanceArn: 0 },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

export type DeleteDataMigrationError =
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified data migration.
 */
export const deleteDataMigration: API.OperationMethod<
  DeleteDataMigrationMessage,
  DeleteDataMigrationResponse,
  DeleteDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DataMigrationIdentifier: 0 },
    output: { DataMigration: o_DataMigration },
  },
  errors: [
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataMigration",
})) as any;

export type DeleteDataProviderError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified data provider.
 *
 * **Required permissions:**
 * `dms:DeleteDataProvider`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 *
 * All migration projects associated with the data provider must be deleted or modified
 * before you can delete the data provider.
 */
export const deleteDataProvider: API.OperationMethod<
  DeleteDataProviderMessage,
  DeleteDataProviderResponse,
  DeleteDataProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DataProviderIdentifier: 0 },
    output: { DataProvider: o_DataProvider },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataProvider",
})) as any;

export type DeleteEndpointError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified endpoint.
 *
 * All tasks associated with the endpoint must be deleted before you can delete the
 * endpoint.
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointMessage,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointArn: 0 },
    output: { Endpoint: o_Endpoint },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
})) as any;

export type DeleteEventSubscriptionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes an DMS event subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResponse,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SubscriptionName: 0 } },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSubscription",
})) as any;

export type DeleteFleetAdvisorCollectorError =
  | AccessDeniedFault
  | CollectorNotFoundFault
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Deletes the specified Fleet Advisor collector.
 */
export const deleteFleetAdvisorCollector: API.OperationMethod<
  DeleteCollectorRequest,
  DeleteFleetAdvisorCollectorResponse,
  DeleteFleetAdvisorCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CollectorReferencedId: 0 } },
  errors: [
    AccessDeniedFault,
    CollectorNotFoundFault,
    InvalidResourceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleetAdvisorCollector",
})) as any;

export type DeleteFleetAdvisorDatabasesError =
  | AccessDeniedFault
  | InvalidOperationFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Deletes the specified Fleet Advisor collector databases.
 */
export const deleteFleetAdvisorDatabases: API.OperationMethod<
  DeleteFleetAdvisorDatabasesRequest,
  DeleteFleetAdvisorDatabasesResponse,
  DeleteFleetAdvisorDatabasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatabaseIds: 0 } },
  errors: [AccessDeniedFault, InvalidOperationFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleetAdvisorDatabases",
})) as any;

export type DeleteInstanceProfileError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified instance profile.
 *
 * **Required permissions:**
 * `dms:DeleteInstanceProfile`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 *
 * All migration projects associated with the instance profile must be deleted or
 * modified before you can delete the instance profile.
 */
export const deleteInstanceProfile: API.OperationMethod<
  DeleteInstanceProfileMessage,
  DeleteInstanceProfileResponse,
  DeleteInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceProfileIdentifier: 0 },
    output: { InstanceProfile: o_InstanceProfile },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceProfile",
})) as any;

export type DeleteMigrationProjectError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified migration project.
 *
 * **Required permissions:**
 * `dms:DeleteMigrationProject`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 *
 * The migration project must be closed before you can delete it.
 */
export const deleteMigrationProject: API.OperationMethod<
  DeleteMigrationProjectMessage,
  DeleteMigrationProjectResponse,
  DeleteMigrationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MigrationProjectIdentifier: 0 },
    output: { MigrationProject: o_MigrationProject },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMigrationProject",
})) as any;

export type DeleteReplicationConfigError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes an DMS Serverless replication configuration. This effectively deprovisions any
 * and all replications that use this configuration. You can't delete the configuration for an
 * DMS Serverless replication that is ongoing. You can delete the configuration when the
 * replication is in a non-RUNNING and non-STARTING state.
 */
export const deleteReplicationConfig: API.OperationMethod<
  DeleteReplicationConfigMessage,
  DeleteReplicationConfigResponse,
  DeleteReplicationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationConfigArn: 0 },
    output: { ReplicationConfig: o_ReplicationConfig },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfig",
})) as any;

export type DeleteReplicationInstanceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified replication instance.
 *
 * You must delete any migration tasks that are associated with the replication instance
 * before you can delete it.
 */
export const deleteReplicationInstance: API.OperationMethod<
  DeleteReplicationInstanceMessage,
  DeleteReplicationInstanceResponse,
  DeleteReplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationInstanceArn: 0 },
    output: { ReplicationInstance: o_ReplicationInstance },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationInstance",
})) as any;

export type DeleteReplicationSubnetGroupError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes a subnet group.
 */
export const deleteReplicationSubnetGroup: API.OperationMethod<
  DeleteReplicationSubnetGroupMessage,
  DeleteReplicationSubnetGroupResponse,
  DeleteReplicationSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ReplicationSubnetGroupIdentifier: 0 } },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationSubnetGroup",
})) as any;

export type DeleteReplicationTaskError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified replication task.
 */
export const deleteReplicationTask: API.OperationMethod<
  DeleteReplicationTaskMessage,
  DeleteReplicationTaskResponse,
  DeleteReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationTaskArn: 0 },
    output: { ReplicationTask: o_ReplicationTask },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationTask",
})) as any;

export type DeleteReplicationTaskAssessmentRunError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the record of a single premigration assessment run.
 *
 * This operation removes all metadata that DMS maintains about this assessment run.
 * However, the operation leaves untouched all information about this assessment run that is
 * stored in your Amazon S3 bucket.
 */
export const deleteReplicationTaskAssessmentRun: API.OperationMethod<
  DeleteReplicationTaskAssessmentRunMessage,
  DeleteReplicationTaskAssessmentRunResponse,
  DeleteReplicationTaskAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationTaskAssessmentRunArn: 0 },
    output: { ReplicationTaskAssessmentRun: o_ReplicationTaskAssessmentRun },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationTaskAssessmentRun",
})) as any;

export type DescribeAccountAttributesError = CommonErrors;
/**
 * Lists all of the DMS attributes for a customer account. These attributes include DMS
 * quotas for the account and a unique account identifier in a particular DMS region. DMS
 * quotas include a list of resource quotas supported by the account, such as the number of
 * replication instances allowed. The description for each resource quota, includes the quota
 * name, current usage toward that quota, and the quota's maximum value. DMS uses the unique
 * account identifier to name each artifact used by DMS in the given region.
 *
 * This command does not take any parameters.
 */
export const describeAccountAttributes: API.OperationMethod<
  DescribeAccountAttributesMessage,
  DescribeAccountAttributesResponse,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
})) as any;

export type DescribeApplicableIndividualAssessmentsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Provides a list of individual assessments that you can specify for a new premigration
 * assessment run, given one or more parameters.
 *
 * If you specify an existing migration task, this operation provides the default
 * individual assessments you can specify for that task. Otherwise, the specified parameters
 * model elements of a possible migration task on which to base a premigration assessment
 * run.
 *
 * To use these migration task modeling parameters, you must specify an existing
 * replication instance, a source database engine, a target database engine, and a migration
 * type. This combination of parameters potentially limits the default individual assessments
 * available for an assessment run created for a corresponding migration task.
 *
 * If you specify no parameters, this operation provides a list of all possible individual
 * assessments that you can specify for an assessment run. If you specify any one of the task
 * modeling parameters, you must specify all of them or the operation cannot provide a list of
 * individual assessments. The only parameter that you can specify alone is for an existing
 * migration task. The specified task definition then determines the default list of
 * individual assessments that you can specify in an assessment run for the task.
 */
export const describeApplicableIndividualAssessments: API.PaginatedOperationMethod<
  DescribeApplicableIndividualAssessmentsMessage,
  DescribeApplicableIndividualAssessmentsResponse,
  DescribeApplicableIndividualAssessmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationTaskArn: 0,
      ReplicationInstanceArn: 0,
      ReplicationConfigArn: 0,
      SourceEngineName: 0,
      TargetEngineName: 0,
      MigrationType: 0,
      MaxRecords: 0,
      Marker: 0,
    },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicableIndividualAssessments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCertificatesError = ResourceNotFoundFault | CommonErrors;
/**
 * Provides a description of the certificate.
 */
export const describeCertificates: API.PaginatedOperationMethod<
  DescribeCertificatesMessage,
  DescribeCertificatesResponse,
  DescribeCertificatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: { Certificates: D.list(o_Certificate) },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeConnectionsError = ResourceNotFoundFault | CommonErrors;
/**
 * Describes the status of the connections that have been made between the replication
 * instance and an endpoint. Connections are created when you test an endpoint.
 */
export const describeConnections: API.PaginatedOperationMethod<
  DescribeConnectionsMessage,
  DescribeConnectionsResponse,
  DescribeConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnections",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeConversionConfigurationError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns configuration parameters for a schema conversion project.
 *
 * **Required permissions:**
 * `dms:DescribeConversionConfiguration`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeConversionConfiguration: API.OperationMethod<
  DescribeConversionConfigurationMessage,
  DescribeConversionConfigurationResponse,
  DescribeConversionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MigrationProjectIdentifier: 0 } },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConversionConfiguration",
})) as any;

export type DescribeDataMigrationsError =
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about data migrations.
 */
export const describeDataMigrations: API.PaginatedOperationMethod<
  DescribeDataMigrationsMessage,
  DescribeDataMigrationsResponse,
  DescribeDataMigrationsError,
  Credentials | HttpClient.HttpClient,
  DataMigration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_Filter),
      MaxRecords: 0,
      Marker: 0,
      WithoutSettings: 0,
      WithoutStatistics: 0,
    },
    output: { DataMigrations: D.list(o_DataMigration) },
  },
  errors: [
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataMigrations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataMigrations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataProvidersError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of data providers for your account in the current
 * region.
 *
 * **Required permissions:**
 * `dms:ListDataProviders`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeDataProviders: API.PaginatedOperationMethod<
  DescribeDataProvidersMessage,
  DescribeDataProvidersResponse,
  DescribeDataProvidersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: { DataProviders: D.list(o_DataProvider) },
  },
  errors: [AccessDeniedFault, FailedDependencyFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataProviders",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointsError = ResourceNotFoundFault | CommonErrors;
/**
 * Returns information about the endpoints for your account in the current region.
 */
export const describeEndpoints: API.PaginatedOperationMethod<
  DescribeEndpointsMessage,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: { Endpoints: D.list(o_Endpoint) },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointSettingsError = CommonErrors;
/**
 * Returns information about the possible endpoint settings available when you create an
 * endpoint for a specific database engine.
 */
export const describeEndpointSettings: API.PaginatedOperationMethod<
  DescribeEndpointSettingsMessage,
  DescribeEndpointSettingsResponse,
  DescribeEndpointSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { EngineName: 0, MaxRecords: 0, Marker: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointSettings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointTypesError = CommonErrors;
/**
 * Returns information about the type of endpoints available.
 */
export const describeEndpointTypes: API.PaginatedOperationMethod<
  DescribeEndpointTypesMessage,
  DescribeEndpointTypesResponse,
  DescribeEndpointTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointTypes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEngineVersionsError = CommonErrors;
/**
 * Returns information about the replication instance versions used in the project.
 */
export const describeEngineVersions: API.PaginatedOperationMethod<
  DescribeEngineVersionsMessage,
  DescribeEngineVersionsResponse,
  DescribeEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxRecords: 0, Marker: 0 },
    output: {
      EngineVersions: D.list({
        LaunchDate: D.ts,
        AutoUpgradeDate: D.ts,
        DeprecationDate: D.ts,
        ForceUpgradeDate: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventCategoriesError = CommonErrors;
/**
 * Lists categories for all event source types, or, if specified, for a specified source
 * type. You can see a list of the event categories and source types in Working with Events
 * and Notifications in the *Database Migration Service User Guide.*
 */
export const describeEventCategories: API.OperationMethod<
  DescribeEventCategoriesMessage,
  DescribeEventCategoriesResponse,
  DescribeEventCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SourceType: 0, Filters: D.list(i_Filter) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
})) as any;

export type DescribeEventsError = CommonErrors;
/**
 * Lists events for a given source identifier and source type. You can also specify a
 * start and end time. For more information on DMS events, see Working with Events and
 * Notifications in the *Database Migration Service User Guide.*
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  DescribeEventsResponse,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceIdentifier: 0,
      SourceType: 0,
      StartTime: 0,
      EndTime: 0,
      Duration: 0,
      EventCategories: 0,
      Filters: D.list(i_Filter),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { Events: D.list({ Date: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventSubscriptionsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Lists all the event subscriptions for a customer account. The description of a
 * subscription includes `SubscriptionName`, `SNSTopicARN`,
 * `CustomerID`, `SourceType`, `SourceID`,
 * `CreationTime`, and `Status`.
 *
 * If you specify `SubscriptionName`, this action lists the description for that
 * subscription.
 */
export const describeEventSubscriptions: API.PaginatedOperationMethod<
  DescribeEventSubscriptionsMessage,
  DescribeEventSubscriptionsResponse,
  DescribeEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      Filters: D.list(i_Filter),
      MaxRecords: 0,
      Marker: 0,
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSubscriptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeExtensionPackAssociationsError = CommonErrors;
/**
 * Returns a paginated list of extension pack installation requests for a migration
 * project, initiated by
 * StartExtensionPackAssociation.
 *
 * **Required permissions:**
 * `dms:ListExtensionPacks`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeExtensionPackAssociations: API.PaginatedOperationMethod<
  DescribeExtensionPackAssociationsMessage,
  DescribeExtensionPackAssociationsResponse,
  DescribeExtensionPackAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      Filters: D.list(i_Filter),
      Marker: 0,
      MaxRecords: 0,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExtensionPackAssociations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorCollectorsError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a list of the Fleet Advisor collectors in your account.
 */
export const describeFleetAdvisorCollectors: API.PaginatedOperationMethod<
  DescribeFleetAdvisorCollectorsRequest,
  DescribeFleetAdvisorCollectorsResponse,
  DescribeFleetAdvisorCollectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, NextToken: 0 },
  },
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorCollectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorDatabasesError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a list of Fleet Advisor databases in your account.
 */
export const describeFleetAdvisorDatabases: API.PaginatedOperationMethod<
  DescribeFleetAdvisorDatabasesRequest,
  DescribeFleetAdvisorDatabasesResponse,
  DescribeFleetAdvisorDatabasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, NextToken: 0 },
  },
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorLsaAnalysisError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Provides descriptions of large-scale assessment (LSA) analyses produced by your Fleet
 * Advisor collectors.
 */
export const describeFleetAdvisorLsaAnalysis: API.PaginatedOperationMethod<
  DescribeFleetAdvisorLsaAnalysisRequest,
  DescribeFleetAdvisorLsaAnalysisResponse,
  DescribeFleetAdvisorLsaAnalysisError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxRecords: 0, NextToken: 0 } },
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorLsaAnalysis",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorSchemaObjectSummaryError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Provides descriptions of the schemas discovered by your Fleet Advisor
 * collectors.
 */
export const describeFleetAdvisorSchemaObjectSummary: API.PaginatedOperationMethod<
  DescribeFleetAdvisorSchemaObjectSummaryRequest,
  DescribeFleetAdvisorSchemaObjectSummaryResponse,
  DescribeFleetAdvisorSchemaObjectSummaryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, NextToken: 0 },
  },
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorSchemaObjectSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorSchemasError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a list of schemas detected by Fleet Advisor Collectors in your account.
 */
export const describeFleetAdvisorSchemas: API.PaginatedOperationMethod<
  DescribeFleetAdvisorSchemasRequest,
  DescribeFleetAdvisorSchemasResponse,
  DescribeFleetAdvisorSchemasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, NextToken: 0 },
  },
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeInstanceProfilesError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of instance profiles for your account in the current
 * region.
 *
 * **Required permissions:**
 * `dms:ListInstanceProfiles`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeInstanceProfiles: API.PaginatedOperationMethod<
  DescribeInstanceProfilesMessage,
  DescribeInstanceProfilesResponse,
  DescribeInstanceProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: { InstanceProfiles: D.list(o_InstanceProfile) },
  },
  errors: [AccessDeniedFault, FailedDependencyFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceProfiles",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelError =
  | AccessDeniedFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Gets detailed information about the specified metadata model, including its definition and corresponding converted objects in the target database if applicable.
 *
 * **Required permissions:**
 * `dms:DescribeMetadataModel`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMetadataModel: API.OperationMethod<
  DescribeMetadataModelMessage,
  DescribeMetadataModelResponse,
  DescribeMetadataModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SelectionRules: 0, MigrationProjectIdentifier: 0, Origin: 0 },
  },
  errors: [AccessDeniedFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModel",
})) as any;

export type DescribeMetadataModelAssessmentsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model assessment requests for a migration
 * project, initiated by
 * StartMetadataModelAssessment.
 *
 * **Required permissions:**
 * `dms:ListMetadataModelAssessments`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMetadataModelAssessments: API.PaginatedOperationMethod<
  DescribeMetadataModelAssessmentsMessage,
  DescribeMetadataModelAssessmentsResponse,
  DescribeMetadataModelAssessmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      Filters: D.list(i_Filter),
      Marker: 0,
      MaxRecords: 0,
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelAssessments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelChildrenError =
  | AccessDeniedFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Gets a list of child metadata models for the specified metadata model in the database hierarchy.
 *
 * **Required permissions:**
 * `dms:DescribeMetadataModelChildren`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMetadataModelChildren: API.PaginatedOperationMethod<
  DescribeMetadataModelChildrenMessage,
  DescribeMetadataModelChildrenResponse,
  DescribeMetadataModelChildrenError,
  Credentials | HttpClient.HttpClient,
  MetadataModelReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SelectionRules: 0,
      MigrationProjectIdentifier: 0,
      Origin: 0,
      Marker: 0,
      MaxRecords: 0,
    },
  },
  errors: [AccessDeniedFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelChildren",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "MetadataModelChildren",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelConversionsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model conversion requests for a migration
 * project, initiated by
 * StartMetadataModelConversion.
 *
 * To cancel a queued or in-progress request, call
 * CancelMetadataModelConversion.
 *
 * **Required permissions:**
 * `dms:ListMetadataModelConversions`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMetadataModelConversions: API.PaginatedOperationMethod<
  DescribeMetadataModelConversionsMessage,
  DescribeMetadataModelConversionsResponse,
  DescribeMetadataModelConversionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      Filters: D.list(i_Filter),
      Marker: 0,
      MaxRecords: 0,
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelConversions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelCreationsError =
  | AccessDeniedFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model creation requests for a migration
 * project, initiated by
 * StartMetadataModelCreation.
 *
 * To cancel a queued or in-progress request, call
 * CancelMetadataModelCreation.
 *
 * **Required permissions:**
 * `dms:DescribeMetadataModelCreations`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMetadataModelCreations: API.PaginatedOperationMethod<
  DescribeMetadataModelCreationsMessage,
  DescribeMetadataModelCreationsResponse,
  DescribeMetadataModelCreationsError,
  Credentials | HttpClient.HttpClient,
  SchemaConversionRequest
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_Filter),
      Marker: 0,
      MaxRecords: 0,
      MigrationProjectIdentifier: 0,
    },
  },
  errors: [AccessDeniedFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelCreations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Requests",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelExportsAsScriptError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model export requests for a migration
 * project, initiated by
 * StartMetadataModelExportAsScript.
 *
 * **Required permissions:**
 * `dms:ListMetadataModelExports`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMetadataModelExportsAsScript: API.PaginatedOperationMethod<
  DescribeMetadataModelExportsAsScriptMessage,
  DescribeMetadataModelExportsAsScriptResponse,
  DescribeMetadataModelExportsAsScriptError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      Filters: D.list(i_Filter),
      Marker: 0,
      MaxRecords: 0,
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelExportsAsScript",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelExportsToTargetError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model export requests for a migration
 * project, initiated by
 * StartMetadataModelExportToTarget.
 *
 * **Required permissions:**
 * `dms:ListMetadataModelExports`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMetadataModelExportsToTarget: API.PaginatedOperationMethod<
  DescribeMetadataModelExportsToTargetMessage,
  DescribeMetadataModelExportsToTargetResponse,
  DescribeMetadataModelExportsToTargetError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      Filters: D.list(i_Filter),
      Marker: 0,
      MaxRecords: 0,
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelExportsToTarget",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelImportsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model import requests for a migration
 * project, initiated by
 * StartMetadataModelImport.
 *
 * **Required permissions:**
 * `dms:DescribeMetadataModelImports`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMetadataModelImports: API.PaginatedOperationMethod<
  DescribeMetadataModelImportsMessage,
  DescribeMetadataModelImportsResponse,
  DescribeMetadataModelImportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      Filters: D.list(i_Filter),
      Marker: 0,
      MaxRecords: 0,
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelImports",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMigrationProjectsError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of migration projects for your account in the current
 * region.
 *
 * **Required permissions:**
 * `dms:ListMigrationProjects`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const describeMigrationProjects: API.PaginatedOperationMethod<
  DescribeMigrationProjectsMessage,
  DescribeMigrationProjectsResponse,
  DescribeMigrationProjectsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: { MigrationProjects: D.list(o_MigrationProject) },
  },
  errors: [AccessDeniedFault, FailedDependencyFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMigrationProjects",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOrderableReplicationInstancesError = CommonErrors;
/**
 * Returns information about the replication instance types that can be created in the
 * specified region.
 */
export const describeOrderableReplicationInstances: API.PaginatedOperationMethod<
  DescribeOrderableReplicationInstancesMessage,
  DescribeOrderableReplicationInstancesResponse,
  DescribeOrderableReplicationInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxRecords: 0, Marker: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrderableReplicationInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribePendingMaintenanceActionsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a list of upcoming maintenance events for replication instances in your account
 * in the current Region.
 */
export const describePendingMaintenanceActions: API.PaginatedOperationMethod<
  DescribePendingMaintenanceActionsMessage,
  DescribePendingMaintenanceActionsResponse,
  DescribePendingMaintenanceActionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationInstanceArn: 0,
      Filters: D.list(i_Filter),
      Marker: 0,
      MaxRecords: 0,
    },
    output: {
      PendingMaintenanceActions: D.list(o_ResourcePendingMaintenanceActions),
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePendingMaintenanceActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRecommendationLimitationsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a paginated list of limitations for recommendations of target Amazon Web Services
 * engines.
 */
export const describeRecommendationLimitations: API.PaginatedOperationMethod<
  DescribeRecommendationLimitationsRequest,
  DescribeRecommendationLimitationsResponse,
  DescribeRecommendationLimitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, NextToken: 0 },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommendationLimitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRecommendationsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a paginated list of target engine recommendations for your source
 * databases.
 */
export const describeRecommendations: API.PaginatedOperationMethod<
  DescribeRecommendationsRequest,
  DescribeRecommendationsResponse,
  DescribeRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, NextToken: 0 },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommendations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRefreshSchemasStatusError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns the status of the RefreshSchemas operation.
 */
export const describeRefreshSchemasStatus: API.OperationMethod<
  DescribeRefreshSchemasStatusMessage,
  DescribeRefreshSchemasStatusResponse,
  DescribeRefreshSchemasStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointArn: 0 },
    output: { RefreshSchemasStatus: o_RefreshSchemasStatus },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRefreshSchemasStatus",
})) as any;

export type DescribeReplicationConfigsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns one or more existing DMS Serverless replication configurations as a list of
 * structures.
 */
export const describeReplicationConfigs: API.PaginatedOperationMethod<
  DescribeReplicationConfigsMessage,
  DescribeReplicationConfigsResponse,
  DescribeReplicationConfigsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: { ReplicationConfigs: D.list(o_ReplicationConfig) },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationInstancesError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about replication instances for your account in the current
 * region.
 */
export const describeReplicationInstances: API.PaginatedOperationMethod<
  DescribeReplicationInstancesMessage,
  DescribeReplicationInstancesResponse,
  DescribeReplicationInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: { ReplicationInstances: D.list(o_ReplicationInstance) },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationInstanceTaskLogsError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about the task logs for the specified task.
 */
export const describeReplicationInstanceTaskLogs: API.PaginatedOperationMethod<
  DescribeReplicationInstanceTaskLogsMessage,
  DescribeReplicationInstanceTaskLogsResponse,
  DescribeReplicationInstanceTaskLogsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationInstanceArn: 0, MaxRecords: 0, Marker: 0 },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationInstanceTaskLogs",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationsError = ResourceNotFoundFault | CommonErrors;
/**
 * Provides details on replication progress by returning status information for one or more
 * provisioned DMS Serverless replications.
 */
export const describeReplications: API.PaginatedOperationMethod<
  DescribeReplicationsMessage,
  DescribeReplicationsResponse,
  DescribeReplicationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: { Replications: D.list(o_Replication) },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplications",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationSubnetGroupsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about the replication subnet groups.
 */
export const describeReplicationSubnetGroups: API.PaginatedOperationMethod<
  DescribeReplicationSubnetGroupsMessage,
  DescribeReplicationSubnetGroupsResponse,
  DescribeReplicationSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTableStatisticsError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns table and schema statistics for one or more provisioned replications that use a
 * given DMS Serverless replication configuration.
 */
export const describeReplicationTableStatistics: API.PaginatedOperationMethod<
  DescribeReplicationTableStatisticsMessage,
  DescribeReplicationTableStatisticsResponse,
  DescribeReplicationTableStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationConfigArn: 0,
      MaxRecords: 0,
      Marker: 0,
      Filters: D.list(i_Filter),
    },
    output: { ReplicationTableStatistics: D.list(o_TableStatistics) },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTableStatistics",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTaskAssessmentResultsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns the task assessment results from the Amazon S3 bucket that DMS creates in your
 * Amazon Web Services account. This action always returns the latest results.
 *
 * For more information about DMS task assessments, see Creating a task assessment
 * report in the *Database Migration Service User Guide*.
 */
export const describeReplicationTaskAssessmentResults: API.PaginatedOperationMethod<
  DescribeReplicationTaskAssessmentResultsMessage,
  DescribeReplicationTaskAssessmentResultsResponse,
  DescribeReplicationTaskAssessmentResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationTaskArn: 0, MaxRecords: 0, Marker: 0 },
    output: {
      ReplicationTaskAssessmentResults: D.list({
        ReplicationTaskLastAssessmentDate: D.ts,
        S3ObjectUrl: D.secret,
      }),
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTaskAssessmentResults",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTaskAssessmentRunsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of premigration assessment runs based on filter
 * settings.
 *
 * These filter settings can specify a combination of premigration assessment runs,
 * migration tasks, replication instances, and assessment run status values.
 *
 * This operation doesn't return information about individual assessments. For this
 * information, see the `DescribeReplicationTaskIndividualAssessments`
 * operation.
 */
export const describeReplicationTaskAssessmentRuns: API.PaginatedOperationMethod<
  DescribeReplicationTaskAssessmentRunsMessage,
  DescribeReplicationTaskAssessmentRunsResponse,
  DescribeReplicationTaskAssessmentRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: {
      ReplicationTaskAssessmentRuns: D.list(o_ReplicationTaskAssessmentRun),
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTaskAssessmentRuns",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTaskIndividualAssessmentsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of individual assessments based on filter settings.
 *
 * These filter settings can specify a combination of premigration assessment runs,
 * migration tasks, and assessment status values.
 */
export const describeReplicationTaskIndividualAssessments: API.PaginatedOperationMethod<
  DescribeReplicationTaskIndividualAssessmentsMessage,
  DescribeReplicationTaskIndividualAssessmentsResponse,
  DescribeReplicationTaskIndividualAssessmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxRecords: 0, Marker: 0 },
    output: {
      ReplicationTaskIndividualAssessments: D.list({
        ReplicationTaskIndividualAssessmentStartDate: D.ts,
      }),
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTaskIndividualAssessments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTasksError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about replication tasks for your account in the current
 * region.
 */
export const describeReplicationTasks: API.PaginatedOperationMethod<
  DescribeReplicationTasksMessage,
  DescribeReplicationTasksResponse,
  DescribeReplicationTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_Filter),
      MaxRecords: 0,
      Marker: 0,
      WithoutSettings: 0,
    },
    output: { ReplicationTasks: D.list(o_ReplicationTask) },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTasks",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSchemasError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about the schema for the specified endpoint.
 */
export const describeSchemas: API.PaginatedOperationMethod<
  DescribeSchemasMessage,
  DescribeSchemasResponse,
  DescribeSchemasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { EndpointArn: 0, MaxRecords: 0, Marker: 0 },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchemas",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeTableStatisticsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns table statistics on the database migration task, including table name, rows
 * inserted, rows updated, and rows deleted.
 *
 * Note that the "last updated" column the DMS console only indicates the time that DMS
 * last updated the table statistics record for a table. It does not indicate the time of the
 * last update to the table.
 */
export const describeTableStatistics: API.PaginatedOperationMethod<
  DescribeTableStatisticsMessage,
  DescribeTableStatisticsResponse,
  DescribeTableStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationTaskArn: 0,
      MaxRecords: 0,
      Marker: 0,
      Filters: D.list(i_Filter),
    },
    output: { TableStatistics: D.list(o_TableStatistics) },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTableStatistics",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ExportMetadataModelAssessmentError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Saves a copy of a database migration assessment report to your Amazon S3 bucket. DMS can
 * save your assessment report as a comma-separated value (CSV) or a PDF file.
 *
 * **Required permissions:**
 * `dms:ExportMetadataModelAssessment`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const exportMetadataModelAssessment: API.OperationMethod<
  ExportMetadataModelAssessmentMessage,
  ExportMetadataModelAssessmentResponse,
  ExportMetadataModelAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      SelectionRules: 0,
      FileName: 0,
      AssessmentReportTypes: 0,
    },
  },
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportMetadataModelAssessment",
})) as any;

export type GetTargetSelectionRulesError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Converts source selection rules into their target counterparts for schema conversion operations.
 *
 * **Required permissions:**
 * `dms:GetTargetSelectionRules`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const getTargetSelectionRules: API.OperationMethod<
  GetTargetSelectionRulesMessage,
  GetTargetSelectionRulesResponse,
  GetTargetSelectionRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MigrationProjectIdentifier: 0, SelectionRules: 0 },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTargetSelectionRules",
})) as any;

export type ImportCertificateError =
  | InvalidCertificateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Uploads the specified certificate.
 */
export const importCertificate: API.OperationMethod<
  ImportCertificateMessage,
  ImportCertificateResponse,
  ImportCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CertificateIdentifier: 0,
      CertificatePem: 0,
      CertificateWallet: 0,
      Tags: D.list(i_Tag),
      KmsKeyId: 0,
    },
    output: { Certificate: o_Certificate },
  },
  errors: [
    InvalidCertificateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCertificate",
})) as any;

export type ListTagsForResourceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Lists all metadata tags attached to an DMS resource, including replication instance,
 * endpoint, subnet group, and migration task. For more information, see
 * `Tag`
 *
 * data type description.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, ResourceArnList: 0 } },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ModifyConversionConfigurationError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified schema conversion configuration using the provided parameters.
 *
 * **Required permissions:**
 * `dms:UpdateConversionConfiguration`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const modifyConversionConfiguration: API.OperationMethod<
  ModifyConversionConfigurationMessage,
  ModifyConversionConfigurationResponse,
  ModifyConversionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MigrationProjectIdentifier: 0, ConversionConfiguration: 0 },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyConversionConfiguration",
})) as any;

export type ModifyDataMigrationError =
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing DMS data migration.
 */
export const modifyDataMigration: API.OperationMethod<
  ModifyDataMigrationMessage,
  ModifyDataMigrationResponse,
  ModifyDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DataMigrationIdentifier: 0,
      DataMigrationName: 0,
      EnableCloudwatchLogs: 0,
      ServiceAccessRoleArn: 0,
      DataMigrationType: 0,
      SourceDataSettings: D.list(i_SourceDataSetting),
      TargetDataSettings: D.list(i_TargetDataSetting),
      NumberOfJobs: 0,
      SelectionRules: 0,
    },
    output: { DataMigration: o_DataMigration },
  },
  errors: [
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDataMigration",
})) as any;

export type ModifyDataProviderError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified data provider using the provided settings.
 *
 * **Required permissions:**
 * `dms:UpdateDataProvider`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 *
 * You must remove the data provider from all migration projects before you can modify
 * it.
 */
export const modifyDataProvider: API.OperationMethod<
  ModifyDataProviderMessage,
  ModifyDataProviderResponse,
  ModifyDataProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DataProviderIdentifier: 0,
      DataProviderName: 0,
      Description: 0,
      Engine: 0,
      Virtual: 0,
      ExactSettings: 0,
      Settings: i_DataProviderSettings,
    },
    output: { DataProvider: o_DataProvider },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDataProvider",
})) as any;

export type ModifyEndpointError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified endpoint.
 *
 * For a MySQL source or target endpoint, don't explicitly specify the database using
 * the `DatabaseName` request parameter on the `ModifyEndpoint` API
 * call. Specifying `DatabaseName` when you modify a MySQL endpoint replicates
 * all the task tables to this single database. For MySQL endpoints, you specify the
 * database only when you specify the schema in the table-mapping rules of the DMS
 * task.
 */
export const modifyEndpoint: API.OperationMethod<
  ModifyEndpointMessage,
  ModifyEndpointResponse,
  ModifyEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointArn: 0,
      EndpointIdentifier: 0,
      EndpointType: 0,
      EngineName: 0,
      Username: 0,
      Password: 0,
      ServerName: 0,
      Port: 0,
      DatabaseName: 0,
      ExtraConnectionAttributes: 0,
      CertificateArn: 0,
      SslMode: 0,
      ServiceAccessRoleArn: 0,
      ExternalTableDefinition: 0,
      DynamoDbSettings: i_DynamoDbSettings,
      S3Settings: i_S3Settings,
      DmsTransferSettings: i_DmsTransferSettings,
      MongoDbSettings: i_MongoDbSettings,
      KinesisSettings: i_KinesisSettings,
      KafkaSettings: i_KafkaSettings,
      ElasticsearchSettings: i_ElasticsearchSettings,
      NeptuneSettings: i_NeptuneSettings,
      RedshiftSettings: i_RedshiftSettings,
      PostgreSQLSettings: i_PostgreSQLSettings,
      MySQLSettings: i_MySQLSettings,
      OracleSettings: i_OracleSettings,
      SybaseSettings: i_SybaseSettings,
      MicrosoftSQLServerSettings: i_MicrosoftSQLServerSettings,
      IBMDb2Settings: i_IBMDb2Settings,
      DocDbSettings: i_DocDbSettings,
      RedisSettings: i_RedisSettings,
      ExactSettings: 0,
      GcpMySQLSettings: i_GcpMySQLSettings,
      TimestreamSettings: i_TimestreamSettings,
    },
    output: { Endpoint: o_Endpoint },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEndpoint",
})) as any;

export type ModifyEventSubscriptionError =
  | AccessDeniedFault
  | KMSAccessDeniedFault
  | KMSDisabledFault
  | KMSInvalidStateFault
  | KMSNotFoundFault
  | KMSThrottlingFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | CommonErrors;
/**
 * Modifies an existing DMS event notification subscription.
 */
export const modifyEventSubscription: API.OperationMethod<
  ModifyEventSubscriptionMessage,
  ModifyEventSubscriptionResponse,
  ModifyEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      SnsTopicArn: 0,
      SourceType: 0,
      EventCategories: 0,
      Enabled: 0,
    },
  },
  errors: [
    AccessDeniedFault,
    KMSAccessDeniedFault,
    KMSDisabledFault,
    KMSInvalidStateFault,
    KMSNotFoundFault,
    KMSThrottlingFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEventSubscription",
})) as any;

export type ModifyInstanceProfileError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified instance profile using the provided parameters.
 *
 * **Required permissions:**
 * `dms:UpdateInstanceProfile`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 *
 * All migration projects associated with the instance profile must be deleted or
 * modified before you can modify the instance profile.
 */
export const modifyInstanceProfile: API.OperationMethod<
  ModifyInstanceProfileMessage,
  ModifyInstanceProfileResponse,
  ModifyInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceProfileIdentifier: 0,
      AvailabilityZone: 0,
      KmsKeyArn: 0,
      PubliclyAccessible: 0,
      NetworkType: 0,
      InstanceProfileName: 0,
      Description: 0,
      SubnetGroupIdentifier: 0,
      VpcSecurityGroups: 0,
    },
    output: { InstanceProfile: o_InstanceProfile },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyInstanceProfile",
})) as any;

export type ModifyMigrationProjectError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified migration project using the provided parameters.
 *
 * **Required permissions:**
 * `dms:UpdateMigrationProject`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 *
 * The migration project must be closed before you can modify it.
 */
export const modifyMigrationProject: API.OperationMethod<
  ModifyMigrationProjectMessage,
  ModifyMigrationProjectResponse,
  ModifyMigrationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      MigrationProjectName: 0,
      SourceDataProviderDescriptors: D.list(i_DataProviderDescriptorDefinition),
      TargetDataProviderDescriptors: D.list(i_DataProviderDescriptorDefinition),
      InstanceProfileIdentifier: 0,
      TransformationRules: 0,
      Description: 0,
      SchemaConversionApplicationAttributes: i_SCApplicationAttributes,
    },
    output: { MigrationProject: o_MigrationProject },
  },
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyMigrationProject",
})) as any;

export type ModifyReplicationConfigError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | InvalidSubnet
  | KMSKeyNotAccessibleFault
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing DMS Serverless replication configuration that you can use to
 * start a replication. This command includes input validation and logic to check the state of
 * any replication that uses this configuration. You can only modify a replication
 * configuration before any replication that uses it has started. As soon as you have
 * initially started a replication with a given configuiration, you can't modify that
 * configuration, even if you stop it.
 *
 * Other run statuses that allow you to run this command include FAILED and CREATED. A
 * provisioning state that allows you to run this command is FAILED_PROVISION.
 */
export const modifyReplicationConfig: API.OperationMethod<
  ModifyReplicationConfigMessage,
  ModifyReplicationConfigResponse,
  ModifyReplicationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationConfigArn: 0,
      ReplicationConfigIdentifier: 0,
      ReplicationType: 0,
      TableMappings: 0,
      ReplicationSettings: 0,
      SupplementalSettings: 0,
      ComputeConfig: i_ComputeConfig,
      SourceEndpointArn: 0,
      TargetEndpointArn: 0,
    },
    output: { ReplicationConfig: o_ReplicationConfig },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    InvalidSubnet,
    KMSKeyNotAccessibleFault,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationConfig",
})) as any;

export type ModifyReplicationInstanceError =
  | AccessDeniedFault
  | InsufficientResourceCapacityFault
  | InvalidResourceStateFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | StorageQuotaExceededFault
  | UpgradeDependencyFailureFault
  | CommonErrors;
/**
 * Modifies the replication instance to apply new settings. You can change one or more
 * parameters by specifying these parameters and the new values in the request.
 *
 * Some settings are applied during the maintenance window.
 */
export const modifyReplicationInstance: API.OperationMethod<
  ModifyReplicationInstanceMessage,
  ModifyReplicationInstanceResponse,
  ModifyReplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationInstanceArn: 0,
      AllocatedStorage: 0,
      ApplyImmediately: 0,
      ReplicationInstanceClass: 0,
      VpcSecurityGroupIds: 0,
      PreferredMaintenanceWindow: 0,
      MultiAZ: 0,
      EngineVersion: 0,
      AllowMajorVersionUpgrade: 0,
      AutoMinorVersionUpgrade: 0,
      ReplicationInstanceIdentifier: 0,
      NetworkType: 0,
      KerberosAuthenticationSettings: i_KerberosAuthenticationSettings,
    },
    output: { ReplicationInstance: o_ReplicationInstance },
  },
  errors: [
    AccessDeniedFault,
    InsufficientResourceCapacityFault,
    InvalidResourceStateFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    StorageQuotaExceededFault,
    UpgradeDependencyFailureFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationInstance",
})) as any;

export type ModifyReplicationSubnetGroupError =
  | AccessDeniedFault
  | InvalidSubnet
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | SubnetAlreadyInUse
  | CommonErrors;
/**
 * Modifies the settings for the specified replication subnet group.
 */
export const modifyReplicationSubnetGroup: API.OperationMethod<
  ModifyReplicationSubnetGroupMessage,
  ModifyReplicationSubnetGroupResponse,
  ModifyReplicationSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationSubnetGroupIdentifier: 0,
      ReplicationSubnetGroupDescription: 0,
      SubnetIds: 0,
    },
  },
  errors: [
    AccessDeniedFault,
    InvalidSubnet,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    SubnetAlreadyInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationSubnetGroup",
})) as any;

export type ModifyReplicationTaskError =
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified replication task.
 *
 * You can't modify the task endpoints. The task must be stopped before you can modify it.
 *
 * For more information about DMS tasks, see Working with Migration Tasks in the
 * *Database Migration Service User Guide*.
 */
export const modifyReplicationTask: API.OperationMethod<
  ModifyReplicationTaskMessage,
  ModifyReplicationTaskResponse,
  ModifyReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationTaskArn: 0,
      ReplicationTaskIdentifier: 0,
      MigrationType: 0,
      TableMappings: 0,
      ReplicationTaskSettings: 0,
      CdcStartTime: 0,
      CdcStartPosition: 0,
      CdcStopPosition: 0,
      TaskData: 0,
    },
    output: { ReplicationTask: o_ReplicationTask },
  },
  errors: [
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationTask",
})) as any;

export type MoveReplicationTaskError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Moves a replication task from its current replication instance to a different target
 * replication instance using the specified parameters. The target replication instance must
 * be created with the same or later DMS version as the current replication instance.
 */
export const moveReplicationTask: API.OperationMethod<
  MoveReplicationTaskMessage,
  MoveReplicationTaskResponse,
  MoveReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationTaskArn: 0, TargetReplicationInstanceArn: 0 },
    output: { ReplicationTask: o_ReplicationTask },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MoveReplicationTask",
})) as any;

export type RebootReplicationInstanceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Reboots a replication instance. Rebooting results in a momentary outage, until the
 * replication instance becomes available again.
 */
export const rebootReplicationInstance: API.OperationMethod<
  RebootReplicationInstanceMessage,
  RebootReplicationInstanceResponse,
  RebootReplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationInstanceArn: 0,
      ForceFailover: 0,
      ForcePlannedFailover: 0,
    },
    output: { ReplicationInstance: o_ReplicationInstance },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootReplicationInstance",
})) as any;

export type RefreshSchemasError =
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Populates the schema for the specified endpoint. This is an asynchronous operation and
 * can take several minutes. You can check the status of this operation by calling the
 * DescribeRefreshSchemasStatus operation.
 */
export const refreshSchemas: API.OperationMethod<
  RefreshSchemasMessage,
  RefreshSchemasResponse,
  RefreshSchemasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointArn: 0, ReplicationInstanceArn: 0 },
    output: { RefreshSchemasStatus: o_RefreshSchemasStatus },
  },
  errors: [
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RefreshSchemas",
})) as any;

export type ReloadReplicationTablesError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Reloads the target database table with the source data for a given DMS Serverless
 * replication configuration.
 *
 * You can only use this operation with a task in the RUNNING state, otherwise the service
 * will throw an `InvalidResourceStateFault` exception.
 */
export const reloadReplicationTables: API.OperationMethod<
  ReloadReplicationTablesMessage,
  ReloadReplicationTablesResponse,
  ReloadReplicationTablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationConfigArn: 0,
      TablesToReload: D.list(i_TableToReload),
      ReloadOption: 0,
    },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReloadReplicationTables",
})) as any;

export type ReloadTablesError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Reloads the target database table with the source data.
 *
 * You can only use this operation with a task in the `RUNNING` state, otherwise
 * the service will throw an `InvalidResourceStateFault` exception.
 */
export const reloadTables: API.OperationMethod<
  ReloadTablesMessage,
  ReloadTablesResponse,
  ReloadTablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationTaskArn: 0,
      TablesToReload: D.list(i_TableToReload),
      ReloadOption: 0,
    },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReloadTables",
})) as any;

export type RemoveTagsFromResourceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Removes metadata tags from an DMS resource, including replication instance, endpoint,
 * subnet group, and migration task. For more information, see
 * `Tag`
 * data type
 * description.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage,
  RemoveTagsFromResourceResponse,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
})) as any;

export type RunFleetAdvisorLsaAnalysisError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Runs large-scale assessment (LSA) analysis on every Fleet Advisor collector in your account.
 */
export const runFleetAdvisorLsaAnalysis: API.OperationMethod<
  RunFleetAdvisorLsaAnalysisRequest,
  RunFleetAdvisorLsaAnalysisResponse,
  RunFleetAdvisorLsaAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunFleetAdvisorLsaAnalysis",
})) as any;

export type StartDataMigrationError =
  | FailedDependencyFault
  | InvalidOperationFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Starts the specified data migration.
 */
export const startDataMigration: API.OperationMethod<
  StartDataMigrationMessage,
  StartDataMigrationResponse,
  StartDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DataMigrationIdentifier: 0, StartType: 0 },
    output: { DataMigration: o_DataMigration },
  },
  errors: [
    FailedDependencyFault,
    InvalidOperationFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataMigration",
})) as any;

export type StartExtensionPackAssociationError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Queues the installation of the extension pack on your target database. If other
 * requests created by `Start*` operations are already in the migration project's
 * queue, the installation begins after they complete.
 *
 * This operation requires a non-virtual target data provider.
 *
 * If the extension pack already exists, the operation reinstalls it. To ensure
 * compatibility, reconvert your database objects if the version has changed since your last
 * conversion. For more information, see Using extension packs in DMS Schema Conversion.
 *
 * To check the status of the request, call
 * DescribeExtensionPackAssociations using the returned
 * `RequestIdentifier` as a filter.
 *
 * **Required permissions:**
 * `dms:AssociateExtensionPack`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const startExtensionPackAssociation: API.OperationMethod<
  StartExtensionPackAssociationMessage,
  StartExtensionPackAssociationResponse,
  StartExtensionPackAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MigrationProjectIdentifier: 0 } },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExtensionPackAssociation",
})) as any;

export type StartMetadataModelAssessmentError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Queues an assessment of the selected source metadata models (database objects such as
 * tables, views, and procedures) to evaluate conversion complexity to the target database
 * format. If other requests created by `Start*` operations are already in the
 * migration project's queue, the assessment begins after they complete.
 *
 * The assessment request loads metadata models that are not yet in the metadata tree, but
 * does not reload metadata models that are already present. If your source database has
 * changed since the metadata was loaded, refresh the affected metadata models with
 * StartMetadataModelImport before calling this operation.
 *
 * To check the status of the assessment request, call
 * DescribeMetadataModelAssessments using the returned
 * `RequestIdentifier` as a filter.
 *
 * To export the conversion assessment report after the request completes successfully,
 * call ExportMetadataModelAssessment.
 *
 * **Required permissions:**
 * `dms:StartMetadataModelAssessment`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const startMetadataModelAssessment: API.OperationMethod<
  StartMetadataModelAssessmentMessage,
  StartMetadataModelAssessmentResponse,
  StartMetadataModelAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MigrationProjectIdentifier: 0, SelectionRules: 0 },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelAssessment",
})) as any;

export type StartMetadataModelConversionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Queues a conversion of the selected source metadata models (database objects such as
 * tables, views, and procedures) to the target database format. If other requests created
 * by `Start*` operations are already in the migration project's queue, the
 * conversion begins after they complete.
 *
 * The conversion request loads metadata models that are not yet in the metadata tree, but
 * does not reload metadata models that are already present. If your source database has
 * changed since the metadata was loaded, refresh the affected metadata models with
 * StartMetadataModelImport before calling this operation.
 *
 * If converted objects already exist in the target metadata tree, the conversion
 * overwrites them, including any manual edits.
 *
 * To check the status of the conversion request, call
 * DescribeMetadataModelConversions using the returned
 * `RequestIdentifier` as a filter.
 *
 * To cancel a queued or in-progress request, call
 * CancelMetadataModelConversion with the returned
 * `RequestIdentifier`.
 *
 * After the conversion completes successfully:
 *
 * - To export a post-conversion assessment report, call
 * ExportMetadataModelAssessment.
 *
 * - To retrieve converted code, use any of the following
 * options:
 *
 * - DescribeMetadataModel and
 * DescribeMetadataModelChildren – navigate the target metadata
 * tree and retrieve converted definitions.
 *
 * - StartMetadataModelExportAsScript – export as data definition
 * language (DDL) scripts to your Amazon S3 bucket.
 *
 * - StartMetadataModelExportToTarget – apply directly to your
 * target database.
 *
 * **Required permissions:**
 * `dms:StartMetadataModelConversion`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const startMetadataModelConversion: API.OperationMethod<
  StartMetadataModelConversionMessage,
  StartMetadataModelConversionResponse,
  StartMetadataModelConversionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MigrationProjectIdentifier: 0, SelectionRules: 0 },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelConversion",
})) as any;

export type StartMetadataModelCreationError =
  | AccessDeniedFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Queues the creation of a metadata model in the source metadata tree. If other requests
 * created by `Start*` operations are already in the migration project's queue, the
 * creation begins after they complete.
 *
 * This operation supports only Microsoft SQL Server to Aurora PostgreSQL and
 * Microsoft SQL Server to Amazon RDS for PostgreSQL conversion paths.
 *
 * To check the status of the creation request, call
 * DescribeMetadataModelCreations using the returned
 * `RequestIdentifier` as a filter.
 *
 * To cancel a queued or in-progress request, call
 * CancelMetadataModelCreation with the returned
 * `RequestIdentifier`.
 *
 * Calling
 * StartMetadataModelImport with `Refresh` deletes metadata models
 * created by this operation.
 *
 * After the creation completes successfully:
 *
 * - To evaluate conversion complexity, call
 * StartMetadataModelAssessment.
 *
 * - To convert to the target database format, call
 * StartMetadataModelConversion.
 *
 * **Required permissions:**
 * `dms:StartMetadataModelCreation`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const startMetadataModelCreation: API.OperationMethod<
  StartMetadataModelCreationMessage,
  StartMetadataModelCreationResponse,
  StartMetadataModelCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      SelectionRules: 0,
      MetadataModelName: 0,
      Properties: { StatementProperties: { Definition: 0 } },
    },
  },
  errors: [
    AccessDeniedFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelCreation",
})) as any;

export type StartMetadataModelExportAsScriptError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Queues an export of metadata models (database objects such as tables, views, and
 * procedures) as a data definition language (DDL) script. The script is stored as a ZIP
 * archive in the Amazon S3 bucket associated with the migration project. If other requests
 * created by `Start*` operations are already in the migration project's queue,
 * the export begins after they complete.
 *
 * When exporting from the target metadata tree, the export applies only to metadata
 * models created by conversion. Metadata models imported from the database are
 * skipped.
 *
 * To check the status of the export request, call
 * DescribeMetadataModelExportsAsScript using the returned
 * `RequestIdentifier` as a filter.
 *
 * **Required permissions:**
 * `dms:StartMetadataModelExportAsScripts`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const startMetadataModelExportAsScript: API.OperationMethod<
  StartMetadataModelExportAsScriptMessage,
  StartMetadataModelExportAsScriptResponse,
  StartMetadataModelExportAsScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      SelectionRules: 0,
      Origin: 0,
      FileName: 0,
    },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelExportAsScript",
})) as any;

export type StartMetadataModelExportToTargetError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Queues an export of the selected converted metadata models (database objects such as
 * tables, views, and procedures) to your target database. If other requests created by
 * `Start*` operations are already in the migration project's queue, the export
 * begins after they complete.
 *
 * This operation requires a non-virtual target data provider.
 *
 * The export applies only metadata models created by conversion. Metadata models
 * imported from the database are skipped.
 *
 * If objects with the same name already exist on the target database, the export
 * overwrites them.
 *
 * The operation installs the extension pack on the target database. For more
 * information, see Using extension packs in DMS Schema Conversion.
 *
 * To check the status of the export request, call
 * DescribeMetadataModelExportsToTarget using the returned
 * `RequestIdentifier` as a filter.
 *
 * **Required permissions:**
 * `dms:StartMetadataModelExportToTarget`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const startMetadataModelExportToTarget: API.OperationMethod<
  StartMetadataModelExportToTargetMessage,
  StartMetadataModelExportToTargetResponse,
  StartMetadataModelExportToTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      SelectionRules: 0,
      OverwriteExtensionPack: 0,
    },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelExportToTarget",
})) as any;

export type StartMetadataModelImportError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Queues an import of metadata models (database objects such as tables, views, and
 * procedures) from your data provider into the metadata tree. If other requests created
 * by `Start*` operations are already in the migration project's queue, the
 * import begins after they complete.
 *
 * To check the status of the import request, call
 * DescribeMetadataModelImports using the returned
 * `RequestIdentifier` as a filter.
 *
 * **Required permissions:**
 * `dms:StartMetadataModelImport`. For more information, see
 * Actions, resources, and condition keys for Database Migration Service.
 */
export const startMetadataModelImport: API.OperationMethod<
  StartMetadataModelImportMessage,
  StartMetadataModelImportResponse,
  StartMetadataModelImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MigrationProjectIdentifier: 0,
      SelectionRules: 0,
      Origin: 0,
      Refresh: 0,
    },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelImport",
})) as any;

export type StartRecommendationsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Starts the analysis of your source database to provide recommendations of target
 * engines.
 *
 * You can create recommendations for multiple source databases using BatchStartRecommendations.
 */
export const startRecommendations: API.OperationMethod<
  StartRecommendationsRequest,
  StartRecommendationsResponse,
  StartRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatabaseId: 0, Settings: i_RecommendationSettings },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecommendations",
})) as any;

export type StartReplicationError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * For a given DMS Serverless replication configuration, DMS connects to the source
 * endpoint and collects the metadata to analyze the replication workload. Using this
 * metadata, DMS then computes and provisions the required capacity and starts replicating
 * to the target endpoint using the server resources that DMS has provisioned for the DMS
 * Serverless replication.
 */
export const startReplication: API.OperationMethod<
  StartReplicationMessage,
  StartReplicationResponse,
  StartReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationConfigArn: 0,
      StartReplicationType: 0,
      PremigrationAssessmentSettings: 0,
      CdcStartTime: 0,
      CdcStartPosition: 0,
      CdcStopPosition: 0,
    },
    output: { Replication: o_Replication },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplication",
})) as any;

export type StartReplicationTaskError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Starts the replication task.
 *
 * For more information about DMS tasks, see Working with Migration Tasks in the
 * *Database Migration Service User Guide.*
 */
export const startReplicationTask: API.OperationMethod<
  StartReplicationTaskMessage,
  StartReplicationTaskResponse,
  StartReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationTaskArn: 0,
      StartReplicationTaskType: 0,
      CdcStartTime: 0,
      CdcStartPosition: 0,
      CdcStopPosition: 0,
    },
    output: { ReplicationTask: o_ReplicationTask },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplicationTask",
})) as any;

export type StartReplicationTaskAssessmentError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Starts the replication task assessment for unsupported data types in the source
 * database.
 *
 * You can only use this operation for a task if the following conditions are true:
 *
 * - The task must be in the `stopped` state.
 *
 * - The task must have successful connections to the source and target.
 *
 * If either of these conditions are not met, an `InvalidResourceStateFault`
 * error will result.
 *
 * For information about DMS task assessments, see Creating a task assessment report in the Database Migration Service User
 * Guide.
 */
export const startReplicationTaskAssessment: API.OperationMethod<
  StartReplicationTaskAssessmentMessage,
  StartReplicationTaskAssessmentResponse,
  StartReplicationTaskAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationTaskArn: 0 },
    output: { ReplicationTask: o_ReplicationTask },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplicationTaskAssessment",
})) as any;

export type StartReplicationTaskAssessmentRunError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSAccessDeniedFault
  | KMSDisabledFault
  | KMSFault
  | KMSInvalidStateFault
  | KMSKeyNotAccessibleFault
  | KMSNotFoundFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Starts a new premigration assessment run for one or more individual assessments of a
 * migration task.
 *
 * The assessments that you can specify depend on the source and target database engine and
 * the migration type defined for the given task. To run this operation, your migration task
 * must already be created. After you run this operation, you can review the status of each
 * individual assessment. You can also run the migration task manually after the assessment
 * run and its individual assessments complete.
 */
export const startReplicationTaskAssessmentRun: API.OperationMethod<
  StartReplicationTaskAssessmentRunMessage,
  StartReplicationTaskAssessmentRunResponse,
  StartReplicationTaskAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationTaskArn: 0,
      ServiceAccessRoleArn: 0,
      ResultLocationBucket: 0,
      ResultLocationFolder: 0,
      ResultEncryptionMode: 0,
      ResultKmsKeyArn: 0,
      AssessmentRunName: 0,
      IncludeOnly: 0,
      Exclude: 0,
      Tags: D.list(i_Tag),
    },
    output: { ReplicationTaskAssessmentRun: o_ReplicationTaskAssessmentRun },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSAccessDeniedFault,
    KMSDisabledFault,
    KMSFault,
    KMSInvalidStateFault,
    KMSKeyNotAccessibleFault,
    KMSNotFoundFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplicationTaskAssessmentRun",
})) as any;

export type StopDataMigrationError =
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Stops the specified data migration.
 */
export const stopDataMigration: API.OperationMethod<
  StopDataMigrationMessage,
  StopDataMigrationResponse,
  StopDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DataMigrationIdentifier: 0 },
    output: { DataMigration: o_DataMigration },
  },
  errors: [
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDataMigration",
})) as any;

export type StopReplicationError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * For a given DMS Serverless replication configuration, DMS stops any and all ongoing
 * DMS Serverless replications. This command doesn't deprovision the stopped
 * replications.
 */
export const stopReplication: API.OperationMethod<
  StopReplicationMessage,
  StopReplicationResponse,
  StopReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationConfigArn: 0 },
    output: { Replication: o_Replication },
  },
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplication",
})) as any;

export type StopReplicationTaskError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Stops the replication task.
 */
export const stopReplicationTask: API.OperationMethod<
  StopReplicationTaskMessage,
  StopReplicationTaskResponse,
  StopReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationTaskArn: 0 },
    output: { ReplicationTask: o_ReplicationTask },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplicationTask",
})) as any;

export type TestConnectionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Tests the connection between the replication instance and the endpoint.
 */
export const testConnection: API.OperationMethod<
  TestConnectionMessage,
  TestConnectionResponse,
  TestConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationInstanceArn: 0, EndpointArn: 0 },
  },
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestConnection",
})) as any;

export type UpdateSubscriptionsToEventBridgeError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * Migrates 10 active and enabled Amazon SNS subscriptions at a time and converts them to
 * corresponding Amazon EventBridge rules. By default, this operation migrates subscriptions
 * only when all your replication instance versions are 3.4.5 or higher. If any replication
 * instances are from versions earlier than 3.4.5, the operation raises an error and tells you
 * to upgrade these instances to version 3.4.5 or higher. To enable migration regardless of
 * version, set the `Force` option to true. However, if you don't upgrade instances
 * earlier than version 3.4.5, some types of events might not be available when you use Amazon
 * EventBridge.
 *
 * To call this operation, make sure that you have certain permissions added to your user
 * account. For more information, see Migrating event subscriptions to Amazon EventBridge in the
 * *Amazon Web Services Database Migration Service User Guide*.
 */
export const updateSubscriptionsToEventBridge: API.OperationMethod<
  UpdateSubscriptionsToEventBridgeMessage,
  UpdateSubscriptionsToEventBridgeResponse,
  UpdateSubscriptionsToEventBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ForceMove: 0 } },
  errors: [AccessDeniedFault, InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriptionsToEventBridge",
})) as any;

const i_ComputeConfig: D.LazyStruct = () => ({
  AvailabilityZone: 0,
  DnsNameServers: 0,
  KmsKeyId: 0,
  MaxCapacityUnits: 0,
  MinCapacityUnits: 0,
  MultiAZ: 0,
  PreferredMaintenanceWindow: 0,
  ReplicationSubnetGroupId: 0,
  VpcSecurityGroupIds: 0,
});
const i_DataProviderDescriptorDefinition: D.LazyStruct = () => ({
  DataProviderIdentifier: 0,
  SecretsManagerSecretId: 0,
  SecretsManagerAccessRoleArn: 0,
});
const i_DataProviderSettings: D.LazyStruct = () => ({
  RedshiftSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    S3Path: 0,
    S3AccessRoleArn: 0,
  },
  PostgreSqlSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    SslMode: 0,
    CertificateArn: 0,
    S3Path: 0,
    S3AccessRoleArn: 0,
  },
  MySqlSettings: {
    ServerName: 0,
    Port: 0,
    SslMode: 0,
    CertificateArn: 0,
    S3Path: 0,
    S3AccessRoleArn: 0,
  },
  OracleSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    SslMode: 0,
    CertificateArn: 0,
    AsmServer: 0,
    SecretsManagerOracleAsmSecretId: 0,
    SecretsManagerOracleAsmAccessRoleArn: 0,
    SecretsManagerSecurityDbEncryptionSecretId: 0,
    SecretsManagerSecurityDbEncryptionAccessRoleArn: 0,
    S3Path: 0,
    S3AccessRoleArn: 0,
  },
  SybaseAseSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    SslMode: 0,
    EncryptPassword: 0,
    CertificateArn: 0,
  },
  MicrosoftSqlServerSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    SslMode: 0,
    CertificateArn: 0,
    S3Path: 0,
    S3AccessRoleArn: 0,
  },
  DocDbSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    SslMode: 0,
    CertificateArn: 0,
  },
  MariaDbSettings: {
    ServerName: 0,
    Port: 0,
    SslMode: 0,
    CertificateArn: 0,
    S3Path: 0,
    S3AccessRoleArn: 0,
  },
  IbmDb2LuwSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    SslMode: 0,
    CertificateArn: 0,
    EncryptionAlgorithm: 0,
    SecurityMechanism: 0,
    S3Path: 0,
    S3AccessRoleArn: 0,
  },
  IbmDb2zOsSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    SslMode: 0,
    CertificateArn: 0,
    S3Path: 0,
    S3AccessRoleArn: 0,
  },
  MongoDbSettings: {
    ServerName: 0,
    Port: 0,
    DatabaseName: 0,
    SslMode: 0,
    CertificateArn: 0,
    AuthType: 0,
    AuthSource: 0,
    AuthMechanism: 0,
  },
});
const i_DmsTransferSettings: D.LazyStruct = () => ({
  ServiceAccessRoleArn: 0,
  BucketName: 0,
});
const i_DocDbSettings: D.LazyStruct = () => ({
  Username: 0,
  Password: 0,
  ServerName: 0,
  Port: 0,
  DatabaseName: 0,
  NestingLevel: 0,
  ExtractDocId: 0,
  DocsToInvestigate: 0,
  KmsKeyId: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
  UseUpdateLookUp: 0,
  ReplicateShardCollections: 0,
});
const i_DynamoDbSettings: D.LazyStruct = () => ({ ServiceAccessRoleArn: 0 });
const i_ElasticsearchSettings: D.LazyStruct = () => ({
  ServiceAccessRoleArn: 0,
  EndpointUri: 0,
  FullLoadErrorPercentage: 0,
  ErrorRetryDuration: 0,
  UseNewMappingType: 0,
});
const i_Filter: D.LazyStruct = () => ({ Name: 0, Values: 0 });
const i_GcpMySQLSettings: D.LazyStruct = () => ({
  AfterConnectScript: 0,
  CleanSourceMetadataOnMismatch: 0,
  DatabaseName: 0,
  EventsPollInterval: 0,
  TargetDbType: 0,
  MaxFileSize: 0,
  ParallelLoadThreads: 0,
  Password: 0,
  Port: 0,
  ServerName: 0,
  ServerTimezone: 0,
  Username: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
});
const i_IBMDb2Settings: D.LazyStruct = () => ({
  DatabaseName: 0,
  Password: 0,
  Port: 0,
  ServerName: 0,
  SetDataCaptureChanges: 0,
  CurrentLsn: 0,
  MaxKBytesPerRead: 0,
  Username: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
  LoadTimeout: 0,
  WriteBufferSize: 0,
  MaxFileSize: 0,
  KeepCsvFiles: 0,
});
const i_KafkaSettings: D.LazyStruct = () => ({
  Broker: 0,
  Topic: 0,
  MessageFormat: 0,
  IncludeTransactionDetails: 0,
  IncludePartitionValue: 0,
  PartitionIncludeSchemaTable: 0,
  IncludeTableAlterOperations: 0,
  IncludeControlDetails: 0,
  MessageMaxBytes: 0,
  IncludeNullAndEmpty: 0,
  SecurityProtocol: 0,
  SslClientCertificateArn: 0,
  SslClientKeyArn: 0,
  SslClientKeyPassword: 0,
  SslCaCertificateArn: 0,
  SaslUsername: 0,
  SaslPassword: 0,
  NoHexPrefix: 0,
  SaslMechanism: 0,
  SslEndpointIdentificationAlgorithm: 0,
  UseLargeIntegerValue: 0,
});
const i_KerberosAuthenticationSettings: D.LazyStruct = () => ({
  KeyCacheSecretId: 0,
  KeyCacheSecretIamArn: 0,
  Krb5FileContents: 0,
});
const i_KinesisSettings: D.LazyStruct = () => ({
  StreamArn: 0,
  MessageFormat: 0,
  ServiceAccessRoleArn: 0,
  IncludeTransactionDetails: 0,
  IncludePartitionValue: 0,
  PartitionIncludeSchemaTable: 0,
  IncludeTableAlterOperations: 0,
  IncludeControlDetails: 0,
  IncludeNullAndEmpty: 0,
  NoHexPrefix: 0,
  UseLargeIntegerValue: 0,
});
const i_MicrosoftSQLServerSettings: D.LazyStruct = () => ({
  Port: 0,
  BcpPacketSize: 0,
  DatabaseName: 0,
  ControlTablesFileGroup: 0,
  Password: 0,
  QuerySingleAlwaysOnNode: 0,
  ReadBackupOnly: 0,
  SafeguardPolicy: 0,
  ServerName: 0,
  Username: 0,
  UseBcpFullLoad: 0,
  UseThirdPartyBackupDevice: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
  TrimSpaceInChar: 0,
  TlogAccessMode: 0,
  ForceLobLookup: 0,
  AuthenticationMethod: 0,
});
const i_MongoDbSettings: D.LazyStruct = () => ({
  Username: 0,
  Password: 0,
  ServerName: 0,
  Port: 0,
  DatabaseName: 0,
  AuthType: 0,
  AuthMechanism: 0,
  NestingLevel: 0,
  ExtractDocId: 0,
  DocsToInvestigate: 0,
  AuthSource: 0,
  KmsKeyId: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
  UseUpdateLookUp: 0,
  ReplicateShardCollections: 0,
});
const i_MySQLSettings: D.LazyStruct = () => ({
  AfterConnectScript: 0,
  CleanSourceMetadataOnMismatch: 0,
  DatabaseName: 0,
  EventsPollInterval: 0,
  TargetDbType: 0,
  MaxFileSize: 0,
  ParallelLoadThreads: 0,
  Password: 0,
  Port: 0,
  ServerName: 0,
  ServerTimezone: 0,
  Username: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
  ExecuteTimeout: 0,
  ServiceAccessRoleArn: 0,
  AuthenticationMethod: 0,
});
const i_NeptuneSettings: D.LazyStruct = () => ({
  ServiceAccessRoleArn: 0,
  S3BucketName: 0,
  S3BucketFolder: 0,
  ErrorRetryDuration: 0,
  MaxFileSize: 0,
  MaxRetryCount: 0,
  IamAuthEnabled: 0,
});
const i_OracleSettings: D.LazyStruct = () => ({
  AddSupplementalLogging: 0,
  ArchivedLogDestId: 0,
  AdditionalArchivedLogDestId: 0,
  ExtraArchivedLogDestIds: 0,
  AllowSelectNestedTables: 0,
  ParallelAsmReadThreads: 0,
  ReadAheadBlocks: 0,
  AccessAlternateDirectly: 0,
  UseAlternateFolderForOnline: 0,
  OraclePathPrefix: 0,
  UsePathPrefix: 0,
  ReplacePathPrefix: 0,
  EnableHomogenousTablespace: 0,
  DirectPathNoLog: 0,
  ArchivedLogsOnly: 0,
  AsmPassword: 0,
  AsmServer: 0,
  AsmUser: 0,
  CharLengthSemantics: 0,
  DatabaseName: 0,
  DirectPathParallelLoad: 0,
  FailTasksOnLobTruncation: 0,
  NumberDatatypeScale: 0,
  Password: 0,
  Port: 0,
  ReadTableSpaceName: 0,
  RetryInterval: 0,
  SecurityDbEncryption: 0,
  SecurityDbEncryptionName: 0,
  ServerName: 0,
  SpatialDataOptionToGeoJsonFunctionName: 0,
  StandbyDelayTime: 0,
  Username: 0,
  UseBFile: 0,
  UseDirectPathFullLoad: 0,
  UseLogminerReader: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
  SecretsManagerOracleAsmAccessRoleArn: 0,
  SecretsManagerOracleAsmSecretId: 0,
  TrimSpaceInChar: 0,
  ConvertTimestampWithZoneToUTC: 0,
  OpenTransactionWindow: 0,
  AuthenticationMethod: 0,
});
const i_PostgreSQLSettings: D.LazyStruct = () => ({
  AfterConnectScript: 0,
  CaptureDdls: 0,
  MaxFileSize: 0,
  DatabaseName: 0,
  DdlArtifactsSchema: 0,
  ExecuteTimeout: 0,
  FailTasksOnLobTruncation: 0,
  HeartbeatEnable: 0,
  HeartbeatSchema: 0,
  HeartbeatFrequency: 0,
  Password: 0,
  Port: 0,
  ServerName: 0,
  Username: 0,
  SlotName: 0,
  PluginName: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
  TrimSpaceInChar: 0,
  MapBooleanAsBoolean: 0,
  MapJsonbAsClob: 0,
  MapLongVarcharAs: 0,
  DatabaseMode: 0,
  BabelfishDatabaseName: 0,
  DisableUnicodeSourceFilter: 0,
  ServiceAccessRoleArn: 0,
  AuthenticationMethod: 0,
});
const i_RecommendationSettings: D.LazyStruct = () => ({
  InstanceSizingType: 0,
  WorkloadType: 0,
});
const i_RedisSettings: D.LazyStruct = () => ({
  ServerName: 0,
  Port: 0,
  SslSecurityProtocol: 0,
  AuthType: 0,
  AuthUserName: 0,
  AuthPassword: 0,
  SslCaCertificateArn: 0,
});
const i_RedshiftSettings: D.LazyStruct = () => ({
  AcceptAnyDate: 0,
  AfterConnectScript: 0,
  BucketFolder: 0,
  BucketName: 0,
  CaseSensitiveNames: 0,
  CompUpdate: 0,
  ConnectionTimeout: 0,
  DatabaseName: 0,
  DateFormat: 0,
  EmptyAsNull: 0,
  EncryptionMode: 0,
  ExplicitIds: 0,
  FileTransferUploadStreams: 0,
  LoadTimeout: 0,
  MaxFileSize: 0,
  Password: 0,
  Port: 0,
  RemoveQuotes: 0,
  ReplaceInvalidChars: 0,
  ReplaceChars: 0,
  ServerName: 0,
  ServiceAccessRoleArn: 0,
  ServerSideEncryptionKmsKeyId: 0,
  TimeFormat: 0,
  TrimBlanks: 0,
  TruncateColumns: 0,
  Username: 0,
  WriteBufferSize: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
  MapBooleanAsBoolean: 0,
});
const i_S3Settings: D.LazyStruct = () => ({
  ServiceAccessRoleArn: 0,
  ExternalTableDefinition: 0,
  CsvRowDelimiter: 0,
  CsvDelimiter: 0,
  BucketFolder: 0,
  BucketName: 0,
  CompressionType: 0,
  EncryptionMode: 0,
  ServerSideEncryptionKmsKeyId: 0,
  DataFormat: 0,
  EncodingType: 0,
  DictPageSizeLimit: 0,
  RowGroupLength: 0,
  DataPageSize: 0,
  ParquetVersion: 0,
  EnableStatistics: 0,
  IncludeOpForFullLoad: 0,
  CdcInsertsOnly: 0,
  TimestampColumnName: 0,
  ParquetTimestampInMillisecond: 0,
  CdcInsertsAndUpdates: 0,
  DatePartitionEnabled: 0,
  DatePartitionSequence: 0,
  DatePartitionDelimiter: 0,
  UseCsvNoSupValue: 0,
  CsvNoSupValue: 0,
  PreserveTransactions: 0,
  CdcPath: 0,
  UseTaskStartTimeForFullLoadTimestamp: 0,
  CannedAclForObjects: 0,
  AddColumnName: 0,
  CdcMaxBatchInterval: 0,
  CdcMinFileSize: 0,
  CsvNullValue: 0,
  IgnoreHeaderRows: 0,
  MaxFileSize: 0,
  Rfc4180: 0,
  DatePartitionTimezone: 0,
  AddTrailingPaddingCharacter: 0,
  ExpectedBucketOwner: 0,
  GlueCatalogGeneration: 0,
});
const i_SCApplicationAttributes: D.LazyStruct = () => ({
  S3BucketPath: 0,
  S3BucketRoleArn: 0,
});
const i_SourceDataSetting: D.LazyStruct = () => ({
  CDCStartPosition: 0,
  CDCStartTime: D.tsAs("date-time"),
  CDCStopTime: D.tsAs("date-time"),
  SlotName: 0,
});
const i_SybaseSettings: D.LazyStruct = () => ({
  DatabaseName: 0,
  Password: 0,
  Port: 0,
  ServerName: 0,
  Username: 0,
  SecretsManagerAccessRoleArn: 0,
  SecretsManagerSecretId: 0,
});
const i_TableToReload: D.LazyStruct = () => ({ SchemaName: 0, TableName: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0, ResourceArn: 0 });
const i_TargetDataSetting: D.LazyStruct = () => ({ TablePreparationMode: 0 });
const i_TimestreamSettings: D.LazyStruct = () => ({
  DatabaseName: 0,
  MemoryDuration: 0,
  MagneticDuration: 0,
  CdcInsertsAndUpdates: 0,
  EnableMagneticStoreWrites: 0,
});
const o_Certificate: D.LazyStruct = () => ({
  CertificateCreationDate: D.ts,
  CertificateWallet: D.blob,
  ValidFromDate: D.ts,
  ValidToDate: D.ts,
});
const o_DataMigration: D.LazyStruct = () => ({
  DataMigrationCreateTime: D.ts,
  DataMigrationStartTime: D.ts,
  DataMigrationEndTime: D.ts,
  DataMigrationSettings: { SelectionRules: D.secret },
  SourceDataSettings: D.list({ CDCStartTime: D.ts, CDCStopTime: D.ts }),
  DataMigrationStatistics: { StartTime: D.ts, StopTime: D.ts },
});
const o_DataProvider: D.LazyStruct = () => ({ DataProviderCreationTime: D.ts });
const o_Endpoint: D.LazyStruct = () => ({
  MongoDbSettings: { Password: D.secret },
  KafkaSettings: { SslClientKeyPassword: D.secret, SaslPassword: D.secret },
  RedshiftSettings: { Password: D.secret },
  PostgreSQLSettings: { Password: D.secret },
  MySQLSettings: { Password: D.secret },
  OracleSettings: {
    AsmPassword: D.secret,
    Password: D.secret,
    SecurityDbEncryption: D.secret,
  },
  SybaseSettings: { Password: D.secret },
  MicrosoftSQLServerSettings: { Password: D.secret },
  IBMDb2Settings: { Password: D.secret },
  DocDbSettings: { Password: D.secret },
  RedisSettings: { AuthPassword: D.secret },
  GcpMySQLSettings: { Password: D.secret },
});
const o_InstanceProfile: D.LazyStruct = () => ({
  InstanceProfileCreationTime: D.ts,
});
const o_MigrationProject: D.LazyStruct = () => ({
  MigrationProjectCreationTime: D.ts,
});
const o_RefreshSchemasStatus: D.LazyStruct = () => ({ LastRefreshDate: D.ts });
const o_Replication: D.LazyStruct = () => ({
  ProvisionData: {
    DateProvisioned: D.ts,
    DateNewProvisioningDataAvailable: D.ts,
  },
  PremigrationAssessmentStatuses: D.list({
    PremigrationAssessmentRunCreationDate: D.ts,
  }),
  ReplicationStats: {
    FreshStartDate: D.ts,
    StartDate: D.ts,
    StopDate: D.ts,
    FullLoadStartDate: D.ts,
    FullLoadFinishDate: D.ts,
  },
  CdcStartTime: D.ts,
  ReplicationCreateTime: D.ts,
  ReplicationUpdateTime: D.ts,
  ReplicationLastStopTime: D.ts,
  ReplicationDeprovisionTime: D.ts,
});
const o_ReplicationConfig: D.LazyStruct = () => ({
  ReplicationConfigCreateTime: D.ts,
  ReplicationConfigUpdateTime: D.ts,
});
const o_ReplicationInstance: D.LazyStruct = () => ({
  InstanceCreateTime: D.ts,
  FreeUntil: D.ts,
});
const o_ReplicationTask: D.LazyStruct = () => ({
  ReplicationTaskCreationDate: D.ts,
  ReplicationTaskStartDate: D.ts,
  ReplicationTaskStats: {
    FreshStartDate: D.ts,
    StartDate: D.ts,
    StopDate: D.ts,
    FullLoadStartDate: D.ts,
    FullLoadFinishDate: D.ts,
  },
});
const o_ReplicationTaskAssessmentRun: D.LazyStruct = () => ({
  ReplicationTaskAssessmentRunCreationDate: D.ts,
});
const o_ResourcePendingMaintenanceActions: D.LazyStruct = () => ({
  PendingMaintenanceActionDetails: D.list({
    AutoAppliedAfterDate: D.ts,
    ForcedApplyDate: D.ts,
    CurrentApplyDate: D.ts,
  }),
});
const o_TableStatistics: D.LazyStruct = () => ({
  FullLoadStartTime: D.ts,
  FullLoadEndTime: D.ts,
  LastUpdateTime: D.ts,
});
