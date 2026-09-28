import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Timestream InfluxDB",
  target: "AmazonTimestreamInfluxDB",
  version: "2023-01-27",
  sigv4: "timestream-influxdb",
  protocol: awsJson1_0Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://timestream-influxdb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://timestream-influxdb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string; readonly reason: ValidationExceptionReason }> {}
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
export type DeploymentType =
  | "SINGLE_AZ"
  | "WITH_MULTIAZ_STANDBY"
  | (string & {});
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
export type DataFusionRuntimeType =
  | "multi-thread"
  | "multi-thread-alt"
  | (string & {});
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
  | {
      InfluxDBv2: InfluxDBv2Parameters;
      InfluxDBv3Core?: never;
      InfluxDBv3Enterprise?: never;
    }
  | {
      InfluxDBv2?: never;
      InfluxDBv3Core: InfluxDBv3CoreParameters;
      InfluxDBv3Enterprise?: never;
    }
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
export type ValidationExceptionReason =
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: { name: 0, dbResourceId: 0, retentionDays: 0, tags: 0 },
    output: { createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      name: 0,
      username: 0,
      password: 0,
      organization: 0,
      bucket: 0,
      port: 0,
      dbParameterGroupIdentifier: 0,
      dbInstanceType: 0,
      dbStorageType: 0,
      allocatedStorage: 0,
      networkType: 0,
      publiclyAccessible: 0,
      vpcSubnetIds: 0,
      vpcSecurityGroupIds: 0,
      deploymentType: 0,
      failoverMode: 0,
      logDeliveryConfiguration: i_LogDeliveryConfiguration,
      maintenanceSchedule: i_MaintenanceSchedule,
      dbBackupConfigurations: D.list(i_DbBackupConfiguration),
      kmsKeyId: 0,
      tags: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      name: 0,
      username: 0,
      password: 0,
      organization: 0,
      bucket: 0,
      dbInstanceType: 0,
      vpcSubnetIds: 0,
      vpcSecurityGroupIds: 0,
      publiclyAccessible: 0,
      dbStorageType: 0,
      allocatedStorage: 0,
      dbParameterGroupIdentifier: 0,
      deploymentType: 0,
      logDeliveryConfiguration: i_LogDeliveryConfiguration,
      maintenanceSchedule: i_MaintenanceSchedule,
      tags: 0,
      port: 0,
      networkType: 0,
      dbBackupConfigurations: D.list(i_DbBackupConfiguration),
      kmsKeyId: 0,
    },
    output: {
      lastMaintenanceTime: D.ts,
      nextMaintenanceTime: D.ts,
      dbBackupConfigurations: D.list(o_DbBackupConfigurationOutput),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      parameters: {
        InfluxDBv2: {
          fluxLogEnabled: 0,
          logLevel: 0,
          noTasks: 0,
          queryConcurrency: 0,
          queryQueueSize: 0,
          tracingType: 0,
          metricsDisabled: 0,
          httpIdleTimeout: i_Duration,
          httpReadHeaderTimeout: i_Duration,
          httpReadTimeout: i_Duration,
          httpWriteTimeout: i_Duration,
          influxqlMaxSelectBuckets: 0,
          influxqlMaxSelectPoint: 0,
          influxqlMaxSelectSeries: 0,
          pprofDisabled: 0,
          queryInitialMemoryBytes: 0,
          queryMaxMemoryBytes: 0,
          queryMemoryBytes: 0,
          sessionLength: 0,
          sessionRenewDisabled: 0,
          storageCacheMaxMemorySize: 0,
          storageCacheSnapshotMemorySize: 0,
          storageCacheSnapshotWriteColdDuration: i_Duration,
          storageCompactFullWriteColdDuration: i_Duration,
          storageCompactThroughputBurst: 0,
          storageMaxConcurrentCompactions: 0,
          storageMaxIndexLogFileSize: 0,
          storageNoValidateFieldSize: 0,
          storageRetentionCheckInterval: i_Duration,
          storageSeriesFileMaxConcurrentSnapshotCompactions: 0,
          storageSeriesIdSetCacheSize: 0,
          storageWalMaxConcurrentWrites: 0,
          storageWalMaxWriteDelay: i_Duration,
          uiDisabled: 0,
        },
        InfluxDBv3Core: {
          queryFileLimit: 0,
          queryLogSize: 0,
          logFilter: 0,
          logFormat: 0,
          dataFusionNumThreads: 0,
          dataFusionRuntimeType: 0,
          dataFusionRuntimeDisableLifoSlot: 0,
          dataFusionRuntimeEventInterval: 0,
          dataFusionRuntimeGlobalQueueInterval: 0,
          dataFusionRuntimeMaxBlockingThreads: 0,
          dataFusionRuntimeMaxIoEventsPerTick: 0,
          dataFusionRuntimeThreadKeepAlive: i_Duration,
          dataFusionRuntimeThreadPriority: 0,
          dataFusionMaxParquetFanout: 0,
          dataFusionUseCachedParquetLoader: 0,
          dataFusionConfig: 0,
          maxHttpRequestSize: 0,
          forceSnapshotMemThreshold: i_PercentOrAbsoluteLong,
          walSnapshotSize: 0,
          walMaxWriteBufferSize: 0,
          snapshottedWalFilesToKeep: 0,
          preemptiveCacheAge: i_Duration,
          parquetMemCachePrunePercentage: 0,
          parquetMemCachePruneInterval: i_Duration,
          disableParquetMemCache: 0,
          parquetMemCacheQueryPathDuration: i_Duration,
          lastCacheEvictionInterval: i_Duration,
          distinctCacheEvictionInterval: i_Duration,
          gen1Duration: i_Duration,
          execMemPoolBytes: i_PercentOrAbsoluteLong,
          parquetMemCacheSize: i_PercentOrAbsoluteLong,
          walReplayFailOnError: 0,
          walReplayConcurrencyLimit: 0,
          tableIndexCacheMaxEntries: 0,
          tableIndexCacheConcurrencyLimit: 0,
          gen1LookbackDuration: i_Duration,
          retentionCheckInterval: i_Duration,
          deleteGracePeriod: i_Duration,
          hardDeleteDefaultDuration: i_Duration,
          pluginRepositoryUrl: 0,
          pluginRepositorySecretArn: 0,
        },
        InfluxDBv3Enterprise: {
          queryFileLimit: 0,
          queryLogSize: 0,
          logFilter: 0,
          logFormat: 0,
          dataFusionNumThreads: 0,
          dataFusionRuntimeType: 0,
          dataFusionRuntimeDisableLifoSlot: 0,
          dataFusionRuntimeEventInterval: 0,
          dataFusionRuntimeGlobalQueueInterval: 0,
          dataFusionRuntimeMaxBlockingThreads: 0,
          dataFusionRuntimeMaxIoEventsPerTick: 0,
          dataFusionRuntimeThreadKeepAlive: i_Duration,
          dataFusionRuntimeThreadPriority: 0,
          dataFusionMaxParquetFanout: 0,
          dataFusionUseCachedParquetLoader: 0,
          dataFusionConfig: 0,
          maxHttpRequestSize: 0,
          forceSnapshotMemThreshold: i_PercentOrAbsoluteLong,
          walSnapshotSize: 0,
          walMaxWriteBufferSize: 0,
          snapshottedWalFilesToKeep: 0,
          preemptiveCacheAge: i_Duration,
          parquetMemCachePrunePercentage: 0,
          parquetMemCachePruneInterval: i_Duration,
          disableParquetMemCache: 0,
          parquetMemCacheQueryPathDuration: i_Duration,
          lastCacheEvictionInterval: i_Duration,
          distinctCacheEvictionInterval: i_Duration,
          gen1Duration: i_Duration,
          execMemPoolBytes: i_PercentOrAbsoluteLong,
          parquetMemCacheSize: i_PercentOrAbsoluteLong,
          walReplayFailOnError: 0,
          walReplayConcurrencyLimit: 0,
          tableIndexCacheMaxEntries: 0,
          tableIndexCacheConcurrencyLimit: 0,
          gen1LookbackDuration: i_Duration,
          retentionCheckInterval: i_Duration,
          deleteGracePeriod: i_Duration,
          hardDeleteDefaultDuration: i_Duration,
          pluginRepositoryUrl: 0,
          pluginRepositorySecretArn: 0,
          ingestQueryInstances: 0,
          queryOnlyInstances: 0,
          dedicatedCompactor: 0,
          compactionRowLimit: 0,
          compactionMaxNumFilesPerPlan: 0,
          compactionGen2Duration: i_Duration,
          compactionMultipliers: 0,
          compactionCleanupWait: i_Duration,
          compactionCheckInterval: i_Duration,
          lastValueCacheDisableFromHistory: 0,
          distinctValueCacheDisableFromHistory: 0,
          replicationInterval: i_Duration,
          catalogSyncInterval: i_Duration,
        },
      },
      tags: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: { createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { dbClusterId: 0, retainAutomatedBackups: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { identifier: 0, retainAutomatedBackups: 0 },
    output: {
      lastMaintenanceTime: D.ts,
      nextMaintenanceTime: D.ts,
      dbBackupConfigurations: D.list(o_DbBackupConfigurationOutput),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: { createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { dbClusterId: 0 },
    output: {
      lastMaintenanceTime: D.ts,
      nextMaintenanceTime: D.ts,
      dbBackupConfigurations: D.list(o_DbBackupConfigurationOutput),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: {
      lastMaintenanceTime: D.ts,
      nextMaintenanceTime: D.ts,
      dbBackupConfigurations: D.list(o_DbBackupConfigurationOutput),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { identifier: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { dbResourceId: 0, nextToken: 0, maxResults: 0 },
    output: { items: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
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
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
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
  descriptor: {
    service: svc,
    input: { dbClusterId: 0, nextToken: 0, maxResults: 0 },
  },
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
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: { service: svc, input: { dbClusterId: 0, instanceIds: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: {
      lastMaintenanceTime: D.ts,
      nextMaintenanceTime: D.ts,
      dbBackupConfigurations: D.list(o_DbBackupConfigurationOutput),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      name: 0,
      dbBackupId: 0,
      restoreToTime: D.tsAs("date-time"),
      restoreMode: 0,
      vpcSubnetIds: 0,
      vpcSecurityGroupIds: 0,
      publiclyAccessible: 0,
      logDeliveryConfiguration: i_LogDeliveryConfiguration,
      maintenanceSchedule: i_MaintenanceSchedule,
      tags: 0,
      port: 0,
      networkType: 0,
      deploymentType: 0,
      dbBackupConfigurations: D.list(i_DbBackupConfiguration),
      kmsKeyId: 0,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tags: 0 } },
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      dbClusterId: 0,
      logDeliveryConfiguration: i_LogDeliveryConfiguration,
      dbParameterGroupIdentifier: 0,
      port: 0,
      dbInstanceType: 0,
      failoverMode: 0,
      maintenanceSchedule: i_MaintenanceSchedule,
      dbBackupConfigurations: D.list(i_DbBackupConfiguration),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      identifier: 0,
      logDeliveryConfiguration: i_LogDeliveryConfiguration,
      dbParameterGroupIdentifier: 0,
      port: 0,
      dbInstanceType: 0,
      deploymentType: 0,
      dbStorageType: 0,
      allocatedStorage: 0,
      maintenanceSchedule: i_MaintenanceSchedule,
      dbBackupConfigurations: D.list(i_DbBackupConfiguration),
    },
    output: {
      lastMaintenanceTime: D.ts,
      nextMaintenanceTime: D.ts,
      dbBackupConfigurations: D.list(o_DbBackupConfigurationOutput),
    },
  },
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
})) as any;

const i_DbBackupConfiguration: D.LazyStruct = () => ({
  type: 0,
  retentionDays: 0,
  enabled: 0,
  customSchedule: 0,
});
const i_Duration: D.LazyStruct = () => ({ durationType: 0, value: 0 });
const i_LogDeliveryConfiguration: D.LazyStruct = () => ({
  s3Configuration: { bucketName: 0, enabled: 0 },
});
const i_MaintenanceSchedule: D.LazyStruct = () => ({
  timezone: 0,
  preferredMaintenanceWindow: 0,
});
const i_PercentOrAbsoluteLong: D.LazyStruct = () => ({
  percent: 0,
  absolute: 0,
});
const o_DbBackupConfigurationOutput: D.LazyStruct = () => ({
  nextAutomatedBackupTime: D.ts,
});
