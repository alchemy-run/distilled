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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Timestream InfluxDB",
  serviceShapeName: "AmazonTimestreamInfluxDB",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "timestream-influxdb" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-01-27");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://timestream-influxdb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://timestream-influxdb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://timestream-influxdb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://timestream-influxdb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://timestream-influxdb.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DbBackupName = string;
export type DbResourceId = string;
export type RetentionDays = number;
export type TagKey = string;
export type TagValue = string;
export type RequestTagMap = { [key: string]: string | undefined };
export interface CreateDbBackupInput {
  name: string;
  dbResourceId: string;
  retentionDays?: number;
  tags?: { [key: string]: string | undefined };
}
export type DbBackupId = string;
export type Arn = string;
export type DbBackupStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type DbBackupType =
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "CUSTOM_SCHEDULE"
  | "ON_DEMAND"
  | "CONTINUOUS"
  | (string & {});
export type EngineType =
  | "INFLUXDB_V2"
  | "INFLUXDB_V3_CORE"
  | "INFLUXDB_V3_ENTERPRISE"
  | (string & {});
export type ResourceDeploymentType =
  | "SINGLE_AZ"
  | "WITH_MULTIAZ_STANDBY"
  | "MULTI_NODE_READ_REPLICAS"
  | (string & {});
export type KmsKeyId = string;
export interface ClusterConfiguration {
  ingestQueryInstances?: number;
  queryOnlyInstances?: number;
  dedicatedCompactor?: boolean;
}
export type DbParameterGroupId = string;
export type DbInstanceType =
  | "db.influx.medium"
  | "db.influx.large"
  | "db.influx.xlarge"
  | "db.influx.2xlarge"
  | "db.influx.4xlarge"
  | "db.influx.8xlarge"
  | "db.influx.12xlarge"
  | "db.influx.16xlarge"
  | "db.influx.24xlarge"
  | (string & {});
export interface S3Configuration {
  bucketName: string;
  enabled: boolean;
}
export interface LogDeliveryConfiguration {
  s3Configuration: S3Configuration;
}
export type FailoverMode = "AUTOMATIC" | "NO_FAILOVER" | (string & {});
export type DbStorageType =
  | "InfluxIOIncludedT1"
  | "InfluxIOIncludedT2"
  | "InfluxIOIncludedT3"
  | (string & {});
export type AllocatedStorage = number;
export type VpcSubnetId = string;
export type VpcSubnetIdList = string[];
export type VpcSecurityGroupId = string;
export type VpcSecurityGroupIdList = string[];
export type NetworkType = "IPV4" | "DUAL" | (string & {});
export type IanaTimezone = string;
export type MaintenanceWindow = string;
export interface MaintenanceSchedule {
  timezone: string;
  preferredMaintenanceWindow: string;
}
export interface CreateDbBackupOutput {
  id: string;
  name?: string;
  arn: string;
  status?: DbBackupStatus;
  createdAt?: Date;
  expiresAfter?: string;
  dbResourceId?: string;
  type?: DbBackupType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
  kmsKeyId?: string;
  clusterConfiguration?: ClusterConfiguration;
  dbParameterGroupId?: string;
  dbInstanceType?: DbInstanceType;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  failoverMode?: FailoverMode;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  publiclyAccessible?: boolean;
  port?: number;
  networkType?: NetworkType;
  influxAuthParametersSecretArn?: string;
  maintenanceSchedule?: MaintenanceSchedule;
}
export type DbClusterName = string;
export type Username = string | redacted.Redacted<string>;
export type Password = string | redacted.Redacted<string>;
export type Organization = string;
export type Bucket = string;
export type Port = number;
export type DbParameterGroupIdentifier = string;
export type ClusterDeploymentType = "MULTI_NODE_READ_REPLICAS" | (string & {});
export type AutomatedDbBackupType =
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "CUSTOM_SCHEDULE"
  | "CONTINUOUS"
  | (string & {});
export type AutomatedBackupRetentionDays = number;
export type AwsCronSchedule = string;
export interface DbBackupConfiguration {
  type: AutomatedDbBackupType;
  retentionDays: number;
  enabled: boolean;
  customSchedule?: string;
}
export type DbBackupConfigurationInputList = DbBackupConfiguration[];
export interface CreateDbClusterInput {
  name: string;
  username?: string | redacted.Redacted<string>;
  password?: string | redacted.Redacted<string>;
  organization?: string;
  bucket?: string;
  port?: number;
  dbParameterGroupIdentifier?: string;
  dbInstanceType: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  networkType?: NetworkType;
  publiclyAccessible?: boolean;
  vpcSubnetIds: string[];
  vpcSecurityGroupIds: string[];
  deploymentType?: ClusterDeploymentType;
  failoverMode?: FailoverMode;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  maintenanceSchedule?: MaintenanceSchedule;
  dbBackupConfigurations?: DbBackupConfiguration[];
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export type DbClusterId = string;
export type ClusterStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "AVAILABLE"
  | "FAILED"
  | "DELETED"
  | "MAINTENANCE"
  | "UPDATING_INSTANCE_TYPE"
  | "REBOOTING"
  | "REBOOT_FAILED"
  | "PARTIALLY_AVAILABLE"
  | "RESTORING"
  | "RESTORE_FAILED"
  | (string & {});
export interface CreateDbClusterOutput {
  dbClusterId?: string;
  dbClusterStatus?: ClusterStatus;
}
export type DbInstanceName = string;
export type DeploymentType = "SINGLE_AZ" | "WITH_MULTIAZ_STANDBY" | (string & {});
export interface CreateDbInstanceInput {
  name: string;
  username?: string | redacted.Redacted<string>;
  password: string | redacted.Redacted<string>;
  organization?: string;
  bucket?: string;
  dbInstanceType: DbInstanceType;
  vpcSubnetIds: string[];
  vpcSecurityGroupIds: string[];
  publiclyAccessible?: boolean;
  dbStorageType?: DbStorageType;
  allocatedStorage: number;
  dbParameterGroupIdentifier?: string;
  deploymentType?: DeploymentType;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  maintenanceSchedule?: MaintenanceSchedule;
  tags?: { [key: string]: string | undefined };
  port?: number;
  networkType?: NetworkType;
  dbBackupConfigurations?: DbBackupConfiguration[];
  kmsKeyId?: string;
}
export type DbInstanceId = string;
export type Status =
  | "CREATING"
  | "AVAILABLE"
  | "DELETING"
  | "MODIFYING"
  | "UPDATING"
  | "DELETED"
  | "FAILED"
  | "UPDATING_DEPLOYMENT_TYPE"
  | "UPDATING_INSTANCE_TYPE"
  | "MAINTENANCE"
  | "REBOOTING"
  | "REBOOT_FAILED"
  | "RESTORING"
  | "RESTORE_FAILED"
  | (string & {});
export type InstanceMode =
  | "PRIMARY"
  | "STANDBY"
  | "REPLICA"
  | "INGEST"
  | "QUERY"
  | "COMPACT"
  | "PROCESS"
  | (string & {});
export type InstanceModeList = InstanceMode[];
export interface DbBackupConfigurationOutput {
  type: AutomatedDbBackupType;
  retentionDays: number;
  enabled: boolean;
  customSchedule?: string;
  nextAutomatedBackupTime?: Date;
}
export type DbBackupConfigurationOutputList = DbBackupConfigurationOutput[];
export interface CreateDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export type DbParameterGroupName = string;
export type LogLevel = "debug" | "info" | "error" | (string & {});
export type TracingType = "log" | "jaeger" | "disabled" | (string & {});
export type DurationType =
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds"
  | "days"
  | (string & {});
export interface Duration {
  durationType: DurationType;
  value: number;
}
export interface InfluxDBv2Parameters {
  fluxLogEnabled?: boolean;
  logLevel?: LogLevel;
  noTasks?: boolean;
  queryConcurrency?: number;
  queryQueueSize?: number;
  tracingType?: TracingType;
  metricsDisabled?: boolean;
  httpIdleTimeout?: Duration;
  httpReadHeaderTimeout?: Duration;
  httpReadTimeout?: Duration;
  httpWriteTimeout?: Duration;
  influxqlMaxSelectBuckets?: number;
  influxqlMaxSelectPoint?: number;
  influxqlMaxSelectSeries?: number;
  pprofDisabled?: boolean;
  queryInitialMemoryBytes?: number;
  queryMaxMemoryBytes?: number;
  queryMemoryBytes?: number;
  sessionLength?: number;
  sessionRenewDisabled?: boolean;
  storageCacheMaxMemorySize?: number;
  storageCacheSnapshotMemorySize?: number;
  storageCacheSnapshotWriteColdDuration?: Duration;
  storageCompactFullWriteColdDuration?: Duration;
  storageCompactThroughputBurst?: number;
  storageMaxConcurrentCompactions?: number;
  storageMaxIndexLogFileSize?: number;
  storageNoValidateFieldSize?: boolean;
  storageRetentionCheckInterval?: Duration;
  storageSeriesFileMaxConcurrentSnapshotCompactions?: number;
  storageSeriesIdSetCacheSize?: number;
  storageWalMaxConcurrentWrites?: number;
  storageWalMaxWriteDelay?: Duration;
  uiDisabled?: boolean;
}
export type LogFormats = "full" | (string & {});
export type DataFusionRuntimeType = "multi-thread" | "multi-thread-alt" | (string & {});
export type PercentOrAbsoluteLong =
  | { percent: string; absolute?: never }
  | { percent?: never; absolute: number };
export type PluginRepositorySecretArn = string;
export interface InfluxDBv3CoreParameters {
  queryFileLimit?: number;
  queryLogSize?: number;
  logFilter?: string;
  logFormat?: LogFormats;
  dataFusionNumThreads?: number;
  dataFusionRuntimeType?: DataFusionRuntimeType;
  dataFusionRuntimeDisableLifoSlot?: boolean;
  dataFusionRuntimeEventInterval?: number;
  dataFusionRuntimeGlobalQueueInterval?: number;
  dataFusionRuntimeMaxBlockingThreads?: number;
  dataFusionRuntimeMaxIoEventsPerTick?: number;
  dataFusionRuntimeThreadKeepAlive?: Duration;
  dataFusionRuntimeThreadPriority?: number;
  dataFusionMaxParquetFanout?: number;
  dataFusionUseCachedParquetLoader?: boolean;
  dataFusionConfig?: string;
  maxHttpRequestSize?: number;
  forceSnapshotMemThreshold?: PercentOrAbsoluteLong;
  walSnapshotSize?: number;
  walMaxWriteBufferSize?: number;
  snapshottedWalFilesToKeep?: number;
  preemptiveCacheAge?: Duration;
  parquetMemCachePrunePercentage?: number;
  parquetMemCachePruneInterval?: Duration;
  disableParquetMemCache?: boolean;
  parquetMemCacheQueryPathDuration?: Duration;
  lastCacheEvictionInterval?: Duration;
  distinctCacheEvictionInterval?: Duration;
  gen1Duration?: Duration;
  execMemPoolBytes?: PercentOrAbsoluteLong;
  parquetMemCacheSize?: PercentOrAbsoluteLong;
  walReplayFailOnError?: boolean;
  walReplayConcurrencyLimit?: number;
  tableIndexCacheMaxEntries?: number;
  tableIndexCacheConcurrencyLimit?: number;
  gen1LookbackDuration?: Duration;
  retentionCheckInterval?: Duration;
  deleteGracePeriod?: Duration;
  hardDeleteDefaultDuration?: Duration;
  pluginRepositoryUrl?: string;
  pluginRepositorySecretArn?: string;
}
export interface InfluxDBv3EnterpriseParameters {
  queryFileLimit?: number;
  queryLogSize?: number;
  logFilter?: string;
  logFormat?: LogFormats;
  dataFusionNumThreads?: number;
  dataFusionRuntimeType?: DataFusionRuntimeType;
  dataFusionRuntimeDisableLifoSlot?: boolean;
  dataFusionRuntimeEventInterval?: number;
  dataFusionRuntimeGlobalQueueInterval?: number;
  dataFusionRuntimeMaxBlockingThreads?: number;
  dataFusionRuntimeMaxIoEventsPerTick?: number;
  dataFusionRuntimeThreadKeepAlive?: Duration;
  dataFusionRuntimeThreadPriority?: number;
  dataFusionMaxParquetFanout?: number;
  dataFusionUseCachedParquetLoader?: boolean;
  dataFusionConfig?: string;
  maxHttpRequestSize?: number;
  forceSnapshotMemThreshold?: PercentOrAbsoluteLong;
  walSnapshotSize?: number;
  walMaxWriteBufferSize?: number;
  snapshottedWalFilesToKeep?: number;
  preemptiveCacheAge?: Duration;
  parquetMemCachePrunePercentage?: number;
  parquetMemCachePruneInterval?: Duration;
  disableParquetMemCache?: boolean;
  parquetMemCacheQueryPathDuration?: Duration;
  lastCacheEvictionInterval?: Duration;
  distinctCacheEvictionInterval?: Duration;
  gen1Duration?: Duration;
  execMemPoolBytes?: PercentOrAbsoluteLong;
  parquetMemCacheSize?: PercentOrAbsoluteLong;
  walReplayFailOnError?: boolean;
  walReplayConcurrencyLimit?: number;
  tableIndexCacheMaxEntries?: number;
  tableIndexCacheConcurrencyLimit?: number;
  gen1LookbackDuration?: Duration;
  retentionCheckInterval?: Duration;
  deleteGracePeriod?: Duration;
  hardDeleteDefaultDuration?: Duration;
  pluginRepositoryUrl?: string;
  pluginRepositorySecretArn?: string;
  ingestQueryInstances: number;
  queryOnlyInstances: number;
  dedicatedCompactor: boolean;
  compactionRowLimit?: number;
  compactionMaxNumFilesPerPlan?: number;
  compactionGen2Duration?: Duration;
  compactionMultipliers?: string;
  compactionCleanupWait?: Duration;
  compactionCheckInterval?: Duration;
  lastValueCacheDisableFromHistory?: boolean;
  distinctValueCacheDisableFromHistory?: boolean;
  replicationInterval?: Duration;
  catalogSyncInterval?: Duration;
}
export type Parameters =
  | { InfluxDBv2: InfluxDBv2Parameters; InfluxDBv3Core?: never; InfluxDBv3Enterprise?: never }
  | { InfluxDBv2?: never; InfluxDBv3Core: InfluxDBv3CoreParameters; InfluxDBv3Enterprise?: never }
  | {
      InfluxDBv2?: never;
      InfluxDBv3Core?: never;
      InfluxDBv3Enterprise: InfluxDBv3EnterpriseParameters;
    };
export interface CreateDbParameterGroupInput {
  name: string;
  description?: string;
  parameters?: Parameters;
  tags?: { [key: string]: string | undefined };
}
export interface CreateDbParameterGroupOutput {
  id: string;
  name: string;
  arn: string;
  description?: string;
  parameters?: Parameters;
}
export interface DeleteDbBackupInput {
  identifier: string;
}
export interface DeleteDbBackupOutput {
  id: string;
  name?: string;
  arn: string;
  status?: DbBackupStatus;
  createdAt?: Date;
  expiresAfter?: string;
  dbResourceId?: string;
  type?: DbBackupType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
  kmsKeyId?: string;
  clusterConfiguration?: ClusterConfiguration;
  dbParameterGroupId?: string;
  dbInstanceType?: DbInstanceType;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  failoverMode?: FailoverMode;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  publiclyAccessible?: boolean;
  port?: number;
  networkType?: NetworkType;
  influxAuthParametersSecretArn?: string;
  maintenanceSchedule?: MaintenanceSchedule;
}
export interface DeleteDbClusterInput {
  dbClusterId: string;
  retainAutomatedBackups?: boolean;
}
export interface DeleteDbClusterOutput {
  dbClusterStatus?: ClusterStatus;
}
export type DbInstanceIdentifier = string;
export interface DeleteDbInstanceInput {
  identifier: string;
  retainAutomatedBackups?: boolean;
}
export interface DeleteDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export interface GetDbBackupInput {
  identifier: string;
}
export interface GetDbBackupOutput {
  id: string;
  name?: string;
  arn: string;
  status?: DbBackupStatus;
  createdAt?: Date;
  expiresAfter?: string;
  dbResourceId?: string;
  type?: DbBackupType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
  kmsKeyId?: string;
  clusterConfiguration?: ClusterConfiguration;
  dbParameterGroupId?: string;
  dbInstanceType?: DbInstanceType;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  failoverMode?: FailoverMode;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  publiclyAccessible?: boolean;
  port?: number;
  networkType?: NetworkType;
  influxAuthParametersSecretArn?: string;
  maintenanceSchedule?: MaintenanceSchedule;
}
export interface GetDbClusterInput {
  dbClusterId: string;
}
export interface GetDbClusterOutput {
  id: string;
  name: string;
  arn: string;
  status?: ClusterStatus;
  endpoint?: string;
  readerEndpoint?: string;
  port?: number;
  deploymentType?: ClusterDeploymentType;
  dbInstanceType?: DbInstanceType;
  networkType?: NetworkType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  engineType?: EngineType;
  publiclyAccessible?: boolean;
  dbParameterGroupIdentifier?: string;
  effectiveDbParameterGroupIdentifier?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  influxAuthParametersSecretArn?: string;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  failoverMode?: FailoverMode;
  clusterConfiguration?: ClusterConfiguration;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export interface GetDbInstanceInput {
  identifier: string;
}
export interface GetDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export interface GetDbParameterGroupInput {
  identifier: string;
}
export interface GetDbParameterGroupOutput {
  id: string;
  name: string;
  arn: string;
  description?: string;
  parameters?: Parameters;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListDbBackupsInput {
  dbResourceId?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DbBackupSummary {
  id: string;
  name?: string;
  arn: string;
  status?: DbBackupStatus;
  createdAt?: Date;
  expiresAfter?: string;
  dbResourceId?: string;
  type?: DbBackupType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
  kmsKeyId?: string;
}
export type DbBackupSummaryList = DbBackupSummary[];
export interface ListDbBackupsOutput {
  items: DbBackupSummary[];
  nextToken?: string;
}
export interface ListDbClustersInput {
  nextToken?: string;
  maxResults?: number;
}
export interface DbClusterSummary {
  id: string;
  name: string;
  arn: string;
  status?: ClusterStatus;
  endpoint?: string;
  readerEndpoint?: string;
  port?: number;
  deploymentType?: ClusterDeploymentType;
  dbInstanceType?: DbInstanceType;
  networkType?: NetworkType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  engineType?: EngineType;
}
export type DbClusterSummaryList = DbClusterSummary[];
export interface ListDbClustersOutput {
  items: DbClusterSummary[];
  nextToken?: string;
}
export interface ListDbInstancesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface DbInstanceSummary {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
}
export type DbInstanceSummaryList = DbInstanceSummary[];
export interface ListDbInstancesOutput {
  items: DbInstanceSummary[];
  nextToken?: string;
}
export interface ListDbInstancesForClusterInput {
  dbClusterId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DbInstanceForClusterSummary {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
}
export type DbInstanceForClusterSummaryList = DbInstanceForClusterSummary[];
export interface ListDbInstancesForClusterOutput {
  items: DbInstanceForClusterSummary[];
  nextToken?: string;
}
export interface ListDbParameterGroupsInput {
  nextToken?: string;
  maxResults?: number;
}
export interface DbParameterGroupSummary {
  id: string;
  name: string;
  arn: string;
  description?: string;
}
export type DbParameterGroupSummaryList = DbParameterGroupSummary[];
export interface ListDbParameterGroupsOutput {
  items: DbParameterGroupSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type ResponseTagMap = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type DbInstanceIdList = string[];
export interface RebootDbClusterInput {
  dbClusterId: string;
  instanceIds?: string[];
}
export interface RebootDbClusterOutput {
  dbClusterStatus?: ClusterStatus;
}
export interface RebootDbInstanceInput {
  identifier: string;
}
export interface RebootDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export type DbResourceName = string;
export type RestoreMode = "NEW_RESOURCE" | "REPLACE_EXISTING" | (string & {});
export interface RestoreFromDbBackupInput {
  name: string;
  dbBackupId: string;
  restoreToTime?: Date;
  restoreMode?: RestoreMode;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  publiclyAccessible?: boolean;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  maintenanceSchedule?: MaintenanceSchedule;
  tags?: { [key: string]: string | undefined };
  port?: number;
  networkType?: NetworkType;
  deploymentType?: ResourceDeploymentType;
  dbBackupConfigurations?: DbBackupConfiguration[];
  kmsKeyId?: string;
}
export type RestoreStatus = "RESTORING" | (string & {});
export type ResourceType = "DB_INSTANCE" | "DB_CLUSTER" | (string & {});
export interface RestoreFromDbBackupOutput {
  restoredDbResourceId?: string;
  restoreStatus?: RestoreStatus;
  resourceType?: ResourceType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDbClusterInput {
  dbClusterId: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  dbParameterGroupIdentifier?: string;
  port?: number;
  dbInstanceType?: DbInstanceType;
  failoverMode?: FailoverMode;
  maintenanceSchedule?: MaintenanceSchedule;
  dbBackupConfigurations?: DbBackupConfiguration[];
}
export interface UpdateDbClusterOutput {
  dbClusterStatus?: ClusterStatus;
}
export interface UpdateDbInstanceInput {
  identifier: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  dbParameterGroupIdentifier?: string;
  port?: number;
  dbInstanceType?: DbInstanceType;
  deploymentType?: DeploymentType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  maintenanceSchedule?: MaintenanceSchedule;
  dbBackupConfigurations?: DbBackupConfiguration[];
}
export interface UpdateDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export type ValidationExceptionReason = "FIELD_VALIDATION_FAILED" | "OTHER" | (string & {});
export type CreateDbBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new on-demand backup of a Timestream for InfluxDB resource.
 */
export const createDbBackup: API.OperationMethod<
  CreateDbBackupInput,
  CreateDbBackupOutput,
  CreateDbBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<CreateDbBackupInput>,
  output: __S(200, __c25, 0) as any as S.Schema<CreateDbBackupOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDbBackup",
}));

export type CreateDbClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Timestream for InfluxDB cluster.
 */
export const createDbCluster: API.OperationMethod<
  CreateDbClusterInput,
  CreateDbClusterOutput,
  CreateDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<CreateDbClusterInput>,
  output: __S(241, __c30, 1) as any as S.Schema<CreateDbClusterOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDbCluster",
}));

export type CreateDbInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Timestream for InfluxDB DB instance.
 */
export const createDbInstance: API.OperationMethod<
  CreateDbInstanceInput,
  CreateDbInstanceOutput,
  CreateDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<CreateDbInstanceInput>,
  output: __S(280, __c35, 0) as any as S.Schema<CreateDbInstanceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDbInstance",
}));

export type CreateDbParameterGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Timestream for InfluxDB DB parameter group to associate with DB instances.
 */
export const createDbParameterGroup: API.OperationMethod<
  CreateDbParameterGroupInput,
  CreateDbParameterGroupOutput,
  CreateDbParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDbParameterGroupInput>,
  output: __S(14, __c1, 6) as any as S.Schema<CreateDbParameterGroupOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDbParameterGroup",
}));

export type DeleteDbBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Timestream for InfluxDB backup.
 */
export const deleteDbBackup: API.OperationMethod<
  DeleteDbBackupInput,
  DeleteDbBackupOutput,
  DeleteDbBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<DeleteDbBackupInput>,
  output: __S(200, __c25, 0) as any as S.Schema<DeleteDbBackupOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDbBackup",
}));

export type DeleteDbClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Timestream for InfluxDB cluster.
 */
export const deleteDbCluster: API.OperationMethod<
  DeleteDbClusterInput,
  DeleteDbClusterOutput,
  DeleteDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<DeleteDbClusterInput>,
  output: __S(32, __c4, 0) as any as S.Schema<DeleteDbClusterOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDbCluster",
}));

export type DeleteDbInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Timestream for InfluxDB DB instance.
 */
export const deleteDbInstance: API.OperationMethod<
  DeleteDbInstanceInput,
  DeleteDbInstanceOutput,
  DeleteDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteDbInstanceInput>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteDbInstanceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDbInstance",
}));

export type GetDbBackupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific Timestream for InfluxDB backup.
 */
export const getDbBackup: API.OperationMethod<
  GetDbBackupInput,
  GetDbBackupOutput,
  GetDbBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<GetDbBackupInput>,
  output: __S(200, __c25, 0) as any as S.Schema<GetDbBackupOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbBackup",
}));

export type GetDbClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a Timestream for InfluxDB cluster.
 */
export const getDbCluster: API.OperationMethod<
  GetDbClusterInput,
  GetDbClusterOutput,
  GetDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<GetDbClusterInput>,
  output: __S(57, __c7, 1) as any as S.Schema<GetDbClusterOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbCluster",
}));

export type GetDbInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a Timestream for InfluxDB DB instance.
 */
export const getDbInstance: API.OperationMethod<
  GetDbInstanceInput,
  GetDbInstanceOutput,
  GetDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<GetDbInstanceInput>,
  output: __S(280, __c35, 0) as any as S.Schema<GetDbInstanceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbInstance",
}));

export type GetDbParameterGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a Timestream for InfluxDB DB parameter group.
 */
export const getDbParameterGroup: API.OperationMethod<
  GetDbParameterGroupInput,
  GetDbParameterGroupOutput,
  GetDbParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<GetDbParameterGroupInput>,
  output: __S(14, __c1, 6) as any as S.Schema<GetDbParameterGroupOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbParameterGroup",
}));

export type ListDbBackupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB backups.
 */
export const listDbBackups: API.PaginatedOperationMethod<
  ListDbBackupsInput,
  ListDbBackupsOutput,
  ListDbBackupsError,
  Credentials | HttpClient.HttpClient,
  DbBackupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<ListDbBackupsInput>,
  output: __S(83, __c10, 3) as any as S.Schema<ListDbBackupsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbBackups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbClustersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB DB clusters.
 */
export const listDbClusters: API.PaginatedOperationMethod<
  ListDbClustersInput,
  ListDbClustersOutput,
  ListDbClustersError,
  Credentials | HttpClient.HttpClient,
  DbClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<ListDbClustersInput>,
  output: __S(91, __c11, 3) as any as S.Schema<ListDbClustersOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB DB instances.
 */
export const listDbInstances: API.PaginatedOperationMethod<
  ListDbInstancesInput,
  ListDbInstancesOutput,
  ListDbInstancesError,
  Credentials | HttpClient.HttpClient,
  DbInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<ListDbInstancesInput>,
  output: __S(99, __c12, 3) as any as S.Schema<ListDbInstancesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbInstancesForClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB clusters.
 */
export const listDbInstancesForCluster: API.PaginatedOperationMethod<
  ListDbInstancesForClusterInput,
  ListDbInstancesForClusterOutput,
  ListDbInstancesForClusterError,
  Credentials | HttpClient.HttpClient,
  DbInstanceForClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<ListDbInstancesForClusterInput>,
  output: __S(107, __c13, 3) as any as S.Schema<ListDbInstancesForClusterOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbInstancesForCluster",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbParameterGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB DB parameter groups.
 */
export const listDbParameterGroups: API.PaginatedOperationMethod<
  ListDbParameterGroupsInput,
  ListDbParameterGroupsOutput,
  ListDbParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  DbParameterGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<ListDbParameterGroupsInput>,
  output: __S(115, __c14, 3) as any as S.Schema<ListDbParameterGroupsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbParameterGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * A list of tags applied to the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RebootDbClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reboots a Timestream for InfluxDB cluster.
 */
export const rebootDbCluster: API.OperationMethod<
  RebootDbClusterInput,
  RebootDbClusterOutput,
  RebootDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<RebootDbClusterInput>,
  output: __S(32, __c4, 0) as any as S.Schema<RebootDbClusterOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDbCluster",
}));

export type RebootDbInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reboots a Timestream for InfluxDB instance.
 */
export const rebootDbInstance: API.OperationMethod<
  RebootDbInstanceInput,
  RebootDbInstanceOutput,
  RebootDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<RebootDbInstanceInput>,
  output: __S(280, __c35, 0) as any as S.Schema<RebootDbInstanceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDbInstance",
}));

export type RestoreFromDbBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores a Timestream for InfluxDB resource from a backup. By default, a new resource is created. You can optionally restore to the same resource using the REPLACE_EXISTING restore mode.
 */
export const restoreFromDbBackup: API.OperationMethod<
  RestoreFromDbBackupInput,
  RestoreFromDbBackupOutput,
  RestoreFromDbBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<RestoreFromDbBackupInput>,
  output: __S(145, __c18, 1) as any as S.Schema<RestoreFromDbBackupOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromDbBackup",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Tags are composed of a Key/Value pairs. You can use tags to categorize and track your Timestream for InfluxDB resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes the tag from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDbClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Timestream for InfluxDB cluster.
 */
export const updateDbCluster: API.OperationMethod<
  UpdateDbClusterInput,
  UpdateDbClusterOutput,
  UpdateDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<UpdateDbClusterInput>,
  output: __S(32, __c4, 0) as any as S.Schema<UpdateDbClusterOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDbCluster",
}));

export type UpdateDbInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Timestream for InfluxDB DB instance.
 */
export const updateDbInstance: API.OperationMethod<
  UpdateDbInstanceInput,
  UpdateDbInstanceOutput,
  UpdateDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<UpdateDbInstanceInput>,
  output: __S(280, __c35, 0) as any as S.Schema<UpdateDbInstanceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDbInstance",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          parameters: S.optional(__S(13, __c1, 5)),
          tags: S.optional(__S(216, __c27, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDbParameterGroupInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ durationType: S.String, value: S.Number })).annotate({
        identifier: "Duration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fluxLogEnabled: S.optional(S.Boolean),
          logLevel: S.optional(S.String),
          noTasks: S.optional(S.Boolean),
          queryConcurrency: S.optional(S.Number),
          queryQueueSize: S.optional(S.Number),
          tracingType: S.optional(S.String),
          metricsDisabled: S.optional(S.Boolean),
          httpIdleTimeout: S.optional(__S(8, __c1, 0)),
          httpReadHeaderTimeout: S.optional(__S(8, __c1, 0)),
          httpReadTimeout: S.optional(__S(8, __c1, 0)),
          httpWriteTimeout: S.optional(__S(8, __c1, 0)),
          influxqlMaxSelectBuckets: S.optional(S.Number),
          influxqlMaxSelectPoint: S.optional(S.Number),
          influxqlMaxSelectSeries: S.optional(S.Number),
          pprofDisabled: S.optional(S.Boolean),
          queryInitialMemoryBytes: S.optional(S.Number),
          queryMaxMemoryBytes: S.optional(S.Number),
          queryMemoryBytes: S.optional(S.Number),
          sessionLength: S.optional(S.Number),
          sessionRenewDisabled: S.optional(S.Boolean),
          storageCacheMaxMemorySize: S.optional(S.Number),
          storageCacheSnapshotMemorySize: S.optional(S.Number),
          storageCacheSnapshotWriteColdDuration: S.optional(__S(8, __c1, 0)),
          storageCompactFullWriteColdDuration: S.optional(__S(8, __c1, 0)),
          storageCompactThroughputBurst: S.optional(S.Number),
          storageMaxConcurrentCompactions: S.optional(S.Number),
          storageMaxIndexLogFileSize: S.optional(S.Number),
          storageNoValidateFieldSize: S.optional(S.Boolean),
          storageRetentionCheckInterval: S.optional(__S(8, __c1, 0)),
          storageSeriesFileMaxConcurrentSnapshotCompactions: S.optional(S.Number),
          storageSeriesIdSetCacheSize: S.optional(S.Number),
          storageWalMaxConcurrentWrites: S.optional(S.Number),
          storageWalMaxWriteDelay: S.optional(__S(8, __c1, 0)),
          uiDisabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InfluxDBv2Parameters" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ percent: S.String }),
        /*@__PURE__*/ S.Struct({ absolute: S.Number }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          queryFileLimit: S.optional(S.Number),
          queryLogSize: S.optional(S.Number),
          logFilter: S.optional(S.String),
          logFormat: S.optional(S.String),
          dataFusionNumThreads: S.optional(S.Number),
          dataFusionRuntimeType: S.optional(S.String),
          dataFusionRuntimeDisableLifoSlot: S.optional(S.Boolean),
          dataFusionRuntimeEventInterval: S.optional(S.Number),
          dataFusionRuntimeGlobalQueueInterval: S.optional(S.Number),
          dataFusionRuntimeMaxBlockingThreads: S.optional(S.Number),
          dataFusionRuntimeMaxIoEventsPerTick: S.optional(S.Number),
          dataFusionRuntimeThreadKeepAlive: S.optional(__S(8, __c1, 0)),
          dataFusionRuntimeThreadPriority: S.optional(S.Number),
          dataFusionMaxParquetFanout: S.optional(S.Number),
          dataFusionUseCachedParquetLoader: S.optional(S.Boolean),
          dataFusionConfig: S.optional(S.String),
          maxHttpRequestSize: S.optional(S.Number),
          forceSnapshotMemThreshold: S.optional(__S(10, __c1, 2)),
          walSnapshotSize: S.optional(S.Number),
          walMaxWriteBufferSize: S.optional(S.Number),
          snapshottedWalFilesToKeep: S.optional(S.Number),
          preemptiveCacheAge: S.optional(__S(8, __c1, 0)),
          parquetMemCachePrunePercentage: S.optional(S.Number),
          parquetMemCachePruneInterval: S.optional(__S(8, __c1, 0)),
          disableParquetMemCache: S.optional(S.Boolean),
          parquetMemCacheQueryPathDuration: S.optional(__S(8, __c1, 0)),
          lastCacheEvictionInterval: S.optional(__S(8, __c1, 0)),
          distinctCacheEvictionInterval: S.optional(__S(8, __c1, 0)),
          gen1Duration: S.optional(__S(8, __c1, 0)),
          execMemPoolBytes: S.optional(__S(10, __c1, 2)),
          parquetMemCacheSize: S.optional(__S(10, __c1, 2)),
          walReplayFailOnError: S.optional(S.Boolean),
          walReplayConcurrencyLimit: S.optional(S.Number),
          tableIndexCacheMaxEntries: S.optional(S.Number),
          tableIndexCacheConcurrencyLimit: S.optional(S.Number),
          gen1LookbackDuration: S.optional(__S(8, __c1, 0)),
          retentionCheckInterval: S.optional(__S(8, __c1, 0)),
          deleteGracePeriod: S.optional(__S(8, __c1, 0)),
          hardDeleteDefaultDuration: S.optional(__S(8, __c1, 0)),
          pluginRepositoryUrl: S.optional(S.String),
          pluginRepositorySecretArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "InfluxDBv3CoreParameters" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          queryFileLimit: S.optional(S.Number),
          queryLogSize: S.optional(S.Number),
          logFilter: S.optional(S.String),
          logFormat: S.optional(S.String),
          dataFusionNumThreads: S.optional(S.Number),
          dataFusionRuntimeType: S.optional(S.String),
          dataFusionRuntimeDisableLifoSlot: S.optional(S.Boolean),
          dataFusionRuntimeEventInterval: S.optional(S.Number),
          dataFusionRuntimeGlobalQueueInterval: S.optional(S.Number),
          dataFusionRuntimeMaxBlockingThreads: S.optional(S.Number),
          dataFusionRuntimeMaxIoEventsPerTick: S.optional(S.Number),
          dataFusionRuntimeThreadKeepAlive: S.optional(__S(8, __c1, 0)),
          dataFusionRuntimeThreadPriority: S.optional(S.Number),
          dataFusionMaxParquetFanout: S.optional(S.Number),
          dataFusionUseCachedParquetLoader: S.optional(S.Boolean),
          dataFusionConfig: S.optional(S.String),
          maxHttpRequestSize: S.optional(S.Number),
          forceSnapshotMemThreshold: S.optional(__S(10, __c1, 2)),
          walSnapshotSize: S.optional(S.Number),
          walMaxWriteBufferSize: S.optional(S.Number),
          snapshottedWalFilesToKeep: S.optional(S.Number),
          preemptiveCacheAge: S.optional(__S(8, __c1, 0)),
          parquetMemCachePrunePercentage: S.optional(S.Number),
          parquetMemCachePruneInterval: S.optional(__S(8, __c1, 0)),
          disableParquetMemCache: S.optional(S.Boolean),
          parquetMemCacheQueryPathDuration: S.optional(__S(8, __c1, 0)),
          lastCacheEvictionInterval: S.optional(__S(8, __c1, 0)),
          distinctCacheEvictionInterval: S.optional(__S(8, __c1, 0)),
          gen1Duration: S.optional(__S(8, __c1, 0)),
          execMemPoolBytes: S.optional(__S(10, __c1, 2)),
          parquetMemCacheSize: S.optional(__S(10, __c1, 2)),
          walReplayFailOnError: S.optional(S.Boolean),
          walReplayConcurrencyLimit: S.optional(S.Number),
          tableIndexCacheMaxEntries: S.optional(S.Number),
          tableIndexCacheConcurrencyLimit: S.optional(S.Number),
          gen1LookbackDuration: S.optional(__S(8, __c1, 0)),
          retentionCheckInterval: S.optional(__S(8, __c1, 0)),
          deleteGracePeriod: S.optional(__S(8, __c1, 0)),
          hardDeleteDefaultDuration: S.optional(__S(8, __c1, 0)),
          pluginRepositoryUrl: S.optional(S.String),
          pluginRepositorySecretArn: S.optional(S.String),
          ingestQueryInstances: S.Number,
          queryOnlyInstances: S.Number,
          dedicatedCompactor: S.Boolean,
          compactionRowLimit: S.optional(S.Number),
          compactionMaxNumFilesPerPlan: S.optional(S.Number),
          compactionGen2Duration: S.optional(__S(8, __c1, 0)),
          compactionMultipliers: S.optional(S.String),
          compactionCleanupWait: S.optional(__S(8, __c1, 0)),
          compactionCheckInterval: S.optional(__S(8, __c1, 0)),
          lastValueCacheDisableFromHistory: S.optional(S.Boolean),
          distinctValueCacheDisableFromHistory: S.optional(S.Boolean),
          replicationInterval: S.optional(__S(8, __c1, 0)),
          catalogSyncInterval: S.optional(__S(8, __c1, 0)),
        }),
      ).annotate({ identifier: "InfluxDBv3EnterpriseParameters" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ InfluxDBv2: __S(9, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ InfluxDBv3Core: __S(11, __c1, 3) }),
        /*@__PURE__*/ S.Struct({ InfluxDBv3Enterprise: __S(12, __c1, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          description: S.optional(S.String),
          parameters: S.optional(__S(13, __c1, 5)),
        }),
      ).annotate({ identifier: "CreateDbParameterGroupOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDbBackupInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dbClusterId: S.String, retainAutomatedBackups: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDbClusterInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ dbClusterStatus: S.optional(S.String) })).annotate({
        identifier: "DeleteDbClusterOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String, retainAutomatedBackups: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDbInstanceInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDbBackupInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dbClusterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDbClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          status: S.optional(S.String),
          endpoint: S.optional(S.String),
          readerEndpoint: S.optional(S.String),
          port: S.optional(S.Number),
          deploymentType: S.optional(S.String),
          dbInstanceType: S.optional(S.String),
          networkType: S.optional(S.String),
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          engineType: S.optional(S.String),
          publiclyAccessible: S.optional(S.Boolean),
          dbParameterGroupIdentifier: S.optional(S.String),
          effectiveDbParameterGroupIdentifier: S.optional(S.String),
          logDeliveryConfiguration: S.optional(__S(233, __c29, 1)),
          maintenanceSchedule: S.optional(__S(234, __c29, 2)),
          lastMaintenanceTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          nextMaintenanceTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          influxAuthParametersSecretArn: S.optional(S.String),
          vpcSubnetIds: S.optional(__S(224, __c28, 0)),
          vpcSecurityGroupIds: S.optional(__S(224, __c28, 0)),
          failoverMode: S.optional(S.String),
          clusterConfiguration: S.optional(__S(208, __c26, 0)),
          dbBackupConfigurations: S.optional(__S(265, __c33, 1)),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDbClusterOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDbInstanceInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDbParameterGroupInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dbResourceId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDbBackupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.optional(S.String),
          arn: S.String,
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          expiresAfter: S.optional(S.String),
          dbResourceId: S.optional(S.String),
          type: S.optional(S.String),
          engineType: S.optional(S.String),
          deploymentType: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DbBackupSummary" });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(82, __c10, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDbBackupsOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDbClustersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          status: S.optional(S.String),
          endpoint: S.optional(S.String),
          readerEndpoint: S.optional(S.String),
          port: S.optional(S.Number),
          deploymentType: S.optional(S.String),
          dbInstanceType: S.optional(S.String),
          networkType: S.optional(S.String),
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          engineType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DbClusterSummary" });
    case 2:
      return S.Array(__S(89, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(90, __c11, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDbClustersOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDbInstancesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          status: S.optional(S.String),
          endpoint: S.optional(S.String),
          port: S.optional(S.Number),
          networkType: S.optional(S.String),
          dbInstanceType: S.optional(S.String),
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          deploymentType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DbInstanceSummary" });
    case 2:
      return S.Array(__S(97, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(98, __c12, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDbInstancesOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dbClusterId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDbInstancesForClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          status: S.optional(S.String),
          endpoint: S.optional(S.String),
          port: S.optional(S.Number),
          networkType: S.optional(S.String),
          dbInstanceType: S.optional(S.String),
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          deploymentType: S.optional(S.String),
          instanceMode: S.optional(S.String),
          instanceModes: S.optional(__S(272, __c34, 0)),
        }),
      ).annotate({ identifier: "DbInstanceForClusterSummary" });
    case 2:
      return S.Array(__S(105, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(106, __c13, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDbInstancesForClusterOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDbParameterGroupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "DbParameterGroupSummary" });
    case 2:
      return S.Array(__S(113, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(114, __c14, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDbParameterGroupsOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(216, __c27, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dbClusterId: S.String, instanceIds: S.optional(__S(224, __c28, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RebootDbClusterInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RebootDbInstanceInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          dbBackupId: S.String,
          restoreToTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          restoreMode: S.optional(S.String),
          vpcSubnetIds: S.optional(__S(224, __c28, 0)),
          vpcSecurityGroupIds: S.optional(__S(224, __c28, 0)),
          publiclyAccessible: S.optional(S.Boolean),
          logDeliveryConfiguration: S.optional(__S(233, __c29, 1)),
          maintenanceSchedule: S.optional(__S(234, __c29, 2)),
          tags: S.optional(__S(216, __c27, 0)),
          port: S.optional(S.Number),
          networkType: S.optional(S.String),
          deploymentType: S.optional(S.String),
          dbBackupConfigurations: S.optional(__S(249, __c31, 1)),
          kmsKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreFromDbBackupInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          restoredDbResourceId: S.optional(S.String),
          restoreStatus: S.optional(S.String),
          resourceType: S.optional(S.String),
          engineType: S.optional(S.String),
          deploymentType: S.optional(S.String),
        }),
      ).annotate({ identifier: "RestoreFromDbBackupOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(216, __c27, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(224, __c28, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dbClusterId: S.String,
          logDeliveryConfiguration: S.optional(__S(233, __c29, 1)),
          dbParameterGroupIdentifier: S.optional(S.String),
          port: S.optional(S.Number),
          dbInstanceType: S.optional(S.String),
          failoverMode: S.optional(S.String),
          maintenanceSchedule: S.optional(__S(234, __c29, 2)),
          dbBackupConfigurations: S.optional(__S(249, __c31, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDbClusterInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          logDeliveryConfiguration: S.optional(__S(233, __c29, 1)),
          dbParameterGroupIdentifier: S.optional(S.String),
          port: S.optional(S.Number),
          dbInstanceType: S.optional(S.String),
          deploymentType: S.optional(S.String),
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          maintenanceSchedule: S.optional(__S(234, __c29, 2)),
          dbBackupConfigurations: S.optional(__S(249, __c31, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDbInstanceInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          dbResourceId: S.String,
          retentionDays: S.optional(S.Number),
          tags: S.optional(__S(216, __c27, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDbBackupInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.optional(S.String),
          arn: S.String,
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          expiresAfter: S.optional(S.String),
          dbResourceId: S.optional(S.String),
          type: S.optional(S.String),
          engineType: S.optional(S.String),
          deploymentType: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          clusterConfiguration: S.optional(__S(208, __c26, 0)),
          dbParameterGroupId: S.optional(S.String),
          dbInstanceType: S.optional(S.String),
          logDeliveryConfiguration: S.optional(__S(233, __c29, 1)),
          failoverMode: S.optional(S.String),
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          vpcSubnetIds: S.optional(__S(224, __c28, 0)),
          vpcSecurityGroupIds: S.optional(__S(224, __c28, 0)),
          publiclyAccessible: S.optional(S.Boolean),
          port: S.optional(S.Number),
          networkType: S.optional(S.String),
          influxAuthParametersSecretArn: S.optional(S.String),
          maintenanceSchedule: S.optional(__S(234, __c29, 2)),
        }),
      ).annotate({ identifier: "CreateDbBackupOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ingestQueryInstances: S.optional(S.Number),
          queryOnlyInstances: S.optional(S.Number),
          dedicatedCompactor: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ClusterConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
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
      return S.suspend(() => S.Struct({ bucketName: S.String, enabled: S.Boolean })).annotate({
        identifier: "S3Configuration",
      });
    case 1:
      return S.suspend(() => S.Struct({ s3Configuration: __S(232, __c29, 0) })).annotate({
        identifier: "LogDeliveryConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ timezone: S.String, preferredMaintenanceWindow: S.String }),
      ).annotate({ identifier: "MaintenanceSchedule" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          username: S.optional(SensitiveString),
          password: S.optional(SensitiveString),
          organization: S.optional(S.String),
          bucket: S.optional(S.String),
          port: S.optional(S.Number),
          dbParameterGroupIdentifier: S.optional(S.String),
          dbInstanceType: S.String,
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          networkType: S.optional(S.String),
          publiclyAccessible: S.optional(S.Boolean),
          vpcSubnetIds: __S(224, __c28, 0),
          vpcSecurityGroupIds: __S(224, __c28, 0),
          deploymentType: S.optional(S.String),
          failoverMode: S.optional(S.String),
          logDeliveryConfiguration: S.optional(__S(233, __c29, 1)),
          maintenanceSchedule: S.optional(__S(234, __c29, 2)),
          dbBackupConfigurations: S.optional(__S(249, __c31, 1)),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(216, __c27, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDbClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ dbClusterId: S.optional(S.String), dbClusterStatus: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDbClusterOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          retentionDays: S.Number,
          enabled: S.Boolean,
          customSchedule: S.optional(S.String),
        }),
      ).annotate({ identifier: "DbBackupConfiguration" });
    case 1:
      return S.Array(__S(248, __c31, 0));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          username: S.optional(SensitiveString),
          password: SensitiveString,
          organization: S.optional(S.String),
          bucket: S.optional(S.String),
          dbInstanceType: S.String,
          vpcSubnetIds: __S(224, __c28, 0),
          vpcSecurityGroupIds: __S(224, __c28, 0),
          publiclyAccessible: S.optional(S.Boolean),
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.Number,
          dbParameterGroupIdentifier: S.optional(S.String),
          deploymentType: S.optional(S.String),
          logDeliveryConfiguration: S.optional(__S(233, __c29, 1)),
          maintenanceSchedule: S.optional(__S(234, __c29, 2)),
          tags: S.optional(__S(216, __c27, 0)),
          port: S.optional(S.Number),
          networkType: S.optional(S.String),
          dbBackupConfigurations: S.optional(__S(249, __c31, 1)),
          kmsKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDbInstanceInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          retentionDays: S.Number,
          enabled: S.Boolean,
          customSchedule: S.optional(S.String),
          nextAutomatedBackupTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "DbBackupConfigurationOutput" });
    case 1:
      return S.Array(__S(264, __c33, 0));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          status: S.optional(S.String),
          endpoint: S.optional(S.String),
          port: S.optional(S.Number),
          networkType: S.optional(S.String),
          dbInstanceType: S.optional(S.String),
          dbStorageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          deploymentType: S.optional(S.String),
          vpcSubnetIds: __S(224, __c28, 0),
          publiclyAccessible: S.optional(S.Boolean),
          vpcSecurityGroupIds: S.optional(__S(224, __c28, 0)),
          dbParameterGroupIdentifier: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          secondaryAvailabilityZone: S.optional(S.String),
          logDeliveryConfiguration: S.optional(__S(233, __c29, 1)),
          influxAuthParametersSecretArn: S.optional(S.String),
          dbClusterId: S.optional(S.String),
          instanceMode: S.optional(S.String),
          instanceModes: S.optional(__S(272, __c34, 0)),
          maintenanceSchedule: S.optional(__S(234, __c29, 2)),
          lastMaintenanceTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          nextMaintenanceTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dbBackupConfigurations: S.optional(__S(265, __c33, 1)),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDbInstanceOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
