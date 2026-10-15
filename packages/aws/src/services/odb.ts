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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "odb", serviceShapeName: "Odb" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "odb" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-08-20");
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
              `https://odb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://odb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://odb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://odb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://odb.{R}.{D}","properties":{},"headers":{}}');

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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      quotaCode: S.String,
    },
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
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1313, __c82, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface AcceptMarketplaceRegistrationInput {
  marketplaceRegistrationToken: string;
}
export interface AcceptMarketplaceRegistrationOutput {}
export type RoleArn = string;
export type SupportedAwsIntegration = "KmsTde" | (string & {});
export type Arn = string;
export interface AssociateIamRoleToResourceInput {
  iamRoleArn: string;
  awsIntegration: SupportedAwsIntegration;
  resourceArn: string;
}
export interface AssociateIamRoleToResourceOutput {}
export type ResourceIdOrArn = string;
export interface AssociateVirtualMachinesToExadbVmClusterInput {
  exadbVmClusterId: string;
  desiredNodeCount: number;
}
export type ResourceStatus =
  | "AVAILABLE"
  | "FAILED"
  | "PROVISIONING"
  | "TERMINATED"
  | "TERMINATING"
  | "UPDATING"
  | "MAINTENANCE_IN_PROGRESS"
  | (string & {});
export interface AssociateVirtualMachinesToExadbVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exadbVmClusterId: string;
}
export type ResourceDisplayName = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type DbWorkload = "OLTP" | "AJD" | "APEX" | "LH" | (string & {});
export type LicenseModel = "BRING_YOUR_OWN_LICENSE" | "LICENSE_INCLUDED" | (string & {});
export type DatabaseEdition = "STANDARD_EDITION" | "ENTERPRISE_EDITION" | (string & {});
export type StandbyAllowlistedIpsSource = "PRIMARY" | "SEPARATE" | "NOT_APPLICABLE" | (string & {});
export type AutonomousMaintenanceScheduleType = "EARLY" | "REGULAR" | (string & {});
export interface CustomerContact {
  email?: string | redacted.Redacted<string>;
}
export type CustomerContacts = CustomerContact[];
export interface ResourcePoolSummary {
  isDisabled?: boolean;
  poolSize?: number;
  poolStorageSizeInTBs?: number;
  availableStorageCapacityInTBs?: number;
  totalComputeCapacity?: number;
  availableComputeCapacity?: number;
}
export type DayOfWeekName =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export interface DayOfWeek {
  name?: DayOfWeekName;
}
export interface ScheduledOperationDetails {
  dayOfWeek: DayOfWeek;
  scheduledStartTime?: string;
  scheduledStopTime?: string;
}
export type ScheduledOperationDetailsList = ScheduledOperationDetails[];
export type StringList = string[];
export interface TransportableTablespace {
  ttsBundleUrl?: string;
}
export interface DatabaseTool {
  isEnabled?: boolean;
  name?: string;
  computeCount?: number;
  maxIdleTimeInMinutes?: number;
}
export type DatabaseToolList = DatabaseTool[];
export type SourceType =
  | "NONE"
  | "DATABASE"
  | "BACKUP_FROM_ID"
  | "BACKUP_FROM_TIMESTAMP"
  | "CROSS_REGION_DATAGUARD"
  | "CROSS_REGION_DISASTER_RECOVERY"
  | "CLONE_TO_REFRESHABLE"
  | (string & {});
export type CloneType = "FULL" | "METADATA" | "PARTIAL" | (string & {});
export interface DatabaseCloneConfiguration {
  sourceAutonomousDatabaseId: string;
  cloneType: CloneType;
}
export type IntegerList = number[];
export interface RestoreFromBackupConfiguration {
  autonomousDatabaseBackupId: string;
  cloneType: CloneType;
  cloneTableSpaceList?: number[];
}
export interface PointInTimeRestoreConfiguration {
  sourceAutonomousDatabaseId: string;
  cloneType: CloneType;
  timestamp?: Date;
  useLatestAvailableBackupTimestamp?: boolean;
  cloneTableSpaceList?: number[];
}
export interface CrossRegionDataGuardConfiguration {
  sourceAutonomousDatabaseArn: string;
}
export type DisasterRecoveryType = "ADG" | "BACKUP_BASED" | (string & {});
export interface CrossRegionDisasterRecoveryConfiguration {
  sourceAutonomousDatabaseArn: string;
  remoteDisasterRecoveryType: DisasterRecoveryType;
  isReplicateAutomaticBackups?: boolean;
}
export type RefreshableMode = "AUTOMATIC" | "MANUAL" | (string & {});
export type OpenMode = "READ_ONLY" | "READ_WRITE" | (string & {});
export interface CloneToRefreshableConfiguration {
  sourceAutonomousDatabaseId: string;
  refreshableMode?: RefreshableMode;
  autoRefreshFrequencyInSeconds?: number;
  autoRefreshPointLagInSeconds?: number;
  timeOfAutoRefreshStart?: Date;
  openMode?: OpenMode;
  cloneType?: CloneType;
}
export type SourceConfiguration =
  | {
      databaseClone: DatabaseCloneConfiguration;
      restoreFromBackup?: never;
      pointInTimeRestore?: never;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup: RestoreFromBackupConfiguration;
      pointInTimeRestore?: never;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup?: never;
      pointInTimeRestore: PointInTimeRestoreConfiguration;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup?: never;
      pointInTimeRestore?: never;
      crossRegionDataGuard: CrossRegionDataGuardConfiguration;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup?: never;
      pointInTimeRestore?: never;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery: CrossRegionDisasterRecoveryConfiguration;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup?: never;
      pointInTimeRestore?: never;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable: CloneToRefreshableConfiguration;
    };
export type EncryptionKeyProviderInput = "ORACLE_MANAGED" | "AWS_KMS" | (string & {});
export type ExternalIdType = "database_ocid" | "compartment_ocid" | "tenant_ocid" | (string & {});
export type KmsKeyIdOrArn = string;
export interface AwsEncryptionKeyConfigurationInput {
  iamRoleArn?: string;
  externalIdType?: ExternalIdType;
  kmsKeyId?: string;
}
export type EncryptionKeyConfigurationInput = {
  awsEncryptionKey: AwsEncryptionKeyConfigurationInput;
};
export type AdminPasswordSource =
  | "CUSTOMER_MANAGED_AWS_SECRET"
  | "API_REQUEST_PARAMETER"
  | (string & {});
export type SecretIdOrArn = string;
export interface CustomerManagedAwsSecretConfigurationInput {
  secretId?: string;
  iamRoleArn?: string;
  externalIdType?: ExternalIdType;
}
export type AdminPasswordSourceConfigurationInput = {
  customerManagedAwsSecret: CustomerManagedAwsSecretConfigurationInput;
};
export type GeneralInputString = string;
export type TagKey = string;
export type TagValue = string;
export type RequestTagMap = { [key: string]: string | undefined };
export interface CreateAutonomousDatabaseInput {
  odbNetworkId?: string;
  displayName?: string;
  dbName?: string;
  adminPassword?: string | redacted.Redacted<string>;
  computeCount?: number;
  dataStorageSizeInTBs?: number;
  dataStorageSizeInGBs?: number;
  dbWorkload?: DbWorkload;
  isAutoScalingEnabled?: boolean;
  isAutoScalingForStorageEnabled?: boolean;
  licenseModel?: LicenseModel;
  characterSet?: string;
  ncharacterSet?: string;
  dbVersion?: string;
  databaseEdition?: DatabaseEdition;
  standbyAllowlistedIpsSource?: StandbyAllowlistedIpsSource;
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  backupRetentionPeriodInDays?: number;
  byolComputeCountLimit?: number;
  cpuCoreCount?: number;
  customerContactsToSendToOCI?: CustomerContact[];
  privateEndpointIp?: string;
  privateEndpointLabel?: string;
  resourcePoolLeaderId?: string;
  resourcePoolSummary?: ResourcePoolSummary;
  scheduledOperations?: ScheduledOperationDetails[];
  standbyAllowlistedIps?: string[];
  allowlistedIps?: string[];
  transportableTablespace?: TransportableTablespace;
  isBackupRetentionLocked?: boolean;
  isLocalDataGuardEnabled?: boolean;
  isMtlsConnectionRequired?: boolean;
  dbToolsDetails?: DatabaseTool[];
  source?: SourceType;
  sourceConfiguration?: SourceConfiguration;
  encryptionKeyProvider?: EncryptionKeyProviderInput;
  encryptionKeyConfiguration?: EncryptionKeyConfigurationInput;
  adminPasswordSource?: AdminPasswordSource;
  adminPasswordSourceConfiguration?: AdminPasswordSourceConfigurationInput;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type AutonomousDatabaseResourceStatus =
  | "AVAILABLE"
  | "FAILED"
  | "PROVISIONING"
  | "TERMINATED"
  | "TERMINATING"
  | "UPDATING"
  | "MAINTENANCE_IN_PROGRESS"
  | "STOPPING"
  | "STOPPED"
  | "STARTING"
  | "UNAVAILABLE"
  | "RESTORE_IN_PROGRESS"
  | "RESTORE_FAILED"
  | "BACKUP_IN_PROGRESS"
  | "SCALE_IN_PROGRESS"
  | "AVAILABLE_NEEDS_ATTENTION"
  | "RESTARTING"
  | "RECREATING"
  | "ROLE_CHANGE_IN_PROGRESS"
  | "UPGRADING"
  | "INACCESSIBLE"
  | "STANDBY"
  | (string & {});
export interface CreateAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export interface CreateAutonomousDatabaseBackupInput {
  autonomousDatabaseId: string;
  displayName?: string;
  retentionPeriodInDays?: number;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAutonomousDatabaseBackupOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  autonomousDatabaseBackupId: string;
}
export type WalletType = "REGIONAL" | "INSTANCE" | (string & {});
export type WalletPasswordSource =
  | "CUSTOMER_MANAGED_AWS_SECRET"
  | "API_REQUEST_PARAMETER"
  | (string & {});
export type WalletPasswordSourceConfigurationInput = {
  customerManagedAwsSecret: CustomerManagedAwsSecretConfigurationInput;
};
export interface CreateAutonomousDatabaseWalletInput {
  autonomousDatabaseId: string;
  walletType?: WalletType;
  password?: string | redacted.Redacted<string>;
  passwordSource?: WalletPasswordSource;
  passwordSourceConfiguration?: WalletPasswordSourceConfigurationInput;
  clientToken?: string;
}
export type AutonomousDatabaseWalletFile = Uint8Array | redacted.Redacted<Uint8Array>;
export interface CreateAutonomousDatabaseWalletOutput {
  autonomousDatabaseWalletFile: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type DaysOfWeek = DayOfWeek[];
export type HoursOfDay = number[];
export type MonthName =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER"
  | (string & {});
export interface Month {
  name?: MonthName;
}
export type Months = Month[];
export type PatchingModeType = "ROLLING" | "NONROLLING" | (string & {});
export type PreferenceType = "NO_PREFERENCE" | "CUSTOM_PREFERENCE" | (string & {});
export type WeeksOfMonth = number[];
export interface MaintenanceWindow {
  customActionTimeoutInMins?: number;
  daysOfWeek?: DayOfWeek[];
  hoursOfDay?: number[];
  isCustomActionTimeoutEnabled?: boolean;
  leadTimeInWeeks?: number;
  months?: Month[];
  patchingMode?: PatchingModeType;
  preference?: PreferenceType;
  skipRu?: boolean;
  weeksOfMonth?: number[];
}
export interface CreateCloudAutonomousVmClusterInput {
  cloudExadataInfrastructureId: string;
  odbNetworkId: string;
  displayName: string;
  clientToken?: string;
  autonomousDataStorageSizeInTBs: number;
  cpuCoreCountPerNode: number;
  dbServers?: string[];
  description?: string;
  isMtlsEnabledVmCluster?: boolean;
  licenseModel?: LicenseModel;
  maintenanceWindow?: MaintenanceWindow;
  memoryPerOracleComputeUnitInGBs: number;
  scanListenerPortNonTls?: number;
  scanListenerPortTls?: number;
  tags?: { [key: string]: string | undefined };
  timeZone?: string;
  totalContainerDatabases: number;
}
export interface CreateCloudAutonomousVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudAutonomousVmClusterId: string;
}
export interface CreateCloudExadataInfrastructureInput {
  displayName: string;
  shape: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  tags?: { [key: string]: string | undefined };
  computeCount: number;
  customerContactsToSendToOCI?: CustomerContact[];
  maintenanceWindow?: MaintenanceWindow;
  storageCount: number;
  clientToken?: string;
  databaseServerType?: string;
  storageServerType?: string;
}
export interface CreateCloudExadataInfrastructureOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureId: string;
}
export type Hostname = string;
export type ClusterName = string;
export interface DataCollectionOptions {
  isDiagnosticsEventsEnabled?: boolean;
  isHealthMonitoringEnabled?: boolean;
  isIncidentLogsEnabled?: boolean;
}
export interface CreateCloudVmClusterInput {
  cloudExadataInfrastructureId: string;
  cpuCoreCount: number;
  displayName: string;
  giVersion: string;
  hostname: string;
  sshPublicKeys: string[];
  odbNetworkId: string;
  clusterName?: string;
  dataCollectionOptions?: DataCollectionOptions;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  tags?: { [key: string]: string | undefined };
  isLocalBackupEnabled?: boolean;
  isSparseDiskgroupEnabled?: boolean;
  licenseModel?: LicenseModel;
  memorySizeInGBs?: number;
  systemVersion?: string;
  timeZone?: string;
  clientToken?: string;
  scanListenerPortTcp?: number;
}
export interface CreateCloudVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudVmClusterId: string;
}
export type ShapeAttribute = "SMART_STORAGE" | "BLOCK_STORAGE" | (string & {});
export interface CreateExadbVmClusterInput {
  displayName: string;
  enabledEcpuCount: number;
  exascaleDbStorageVaultId: string;
  gridImageId: string;
  hostname: string;
  nodeCount: number;
  odbNetworkId: string;
  shape: string;
  sshPublicKeys: string[];
  totalEcpuCount: number;
  vmFileSystemStorageTotalSizeInGBs: number;
  clusterName?: string;
  dataCollectionOptions?: DataCollectionOptions;
  licenseModel?: LicenseModel;
  scanListenerPortTcp?: number;
  scanListenerPortTcpSsl?: number;
  shapeAttribute?: ShapeAttribute;
  systemVersion?: string;
  tags?: { [key: string]: string | undefined };
  timeZone?: string;
  clientToken?: string;
}
export interface CreateExadbVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exadbVmClusterId: string;
}
export interface CreateExascaleDbStorageVaultInput {
  displayName: string;
  highCapacityDatabaseStorageTotalSizeInGBs: number;
  additionalFlashCacheInPercent?: number;
  autoscaleLimitInGBs?: number;
  availabilityZoneId?: string;
  availabilityZone?: string;
  description?: string;
  isAutoscaleEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
  timeZone?: string;
  clientToken?: string;
}
export interface CreateExascaleDbStorageVaultOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exascaleDbStorageVaultId: string;
}
export type Access = "ENABLED" | "DISABLED" | (string & {});
export type PolicyDocument = string;
export interface CreateOdbNetworkInput {
  displayName: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  clientSubnetCidr: string;
  backupSubnetCidr?: string;
  customDomainName?: string;
  defaultDnsPrefix?: string;
  clientToken?: string;
  s3Access?: Access;
  zeroEtlAccess?: Access;
  stsAccess?: Access;
  kmsAccess?: Access;
  s3PolicyDocument?: string;
  stsPolicyDocument?: string;
  kmsPolicyDocument?: string;
  crossRegionS3RestoreSourcesToEnable?: string[];
  tags?: { [key: string]: string | undefined };
}
export interface CreateOdbNetworkOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbNetworkId: string;
}
export type PeeredCidr = string;
export type PeeredCidrList = string[];
export type PeerNetworkRouteTableId = string;
export type PeerNetworkRouteTableIdList = string[];
export interface CreateOdbPeeringConnectionInput {
  odbNetworkId: string;
  peerNetworkId: string;
  displayName?: string;
  peerNetworkCidrsToBeAdded?: string[];
  peerNetworkRouteTableIds?: string[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateOdbPeeringConnectionOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbPeeringConnectionId: string;
}
export interface DeleteAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export interface DeleteAutonomousDatabaseOutput {}
export type ResourceId = string;
export interface DeleteAutonomousDatabaseBackupInput {
  autonomousDatabaseBackupId: string;
}
export interface DeleteAutonomousDatabaseBackupOutput {}
export interface DeleteCloudAutonomousVmClusterInput {
  cloudAutonomousVmClusterId: string;
}
export interface DeleteCloudAutonomousVmClusterOutput {}
export interface DeleteCloudExadataInfrastructureInput {
  cloudExadataInfrastructureId: string;
}
export interface DeleteCloudExadataInfrastructureOutput {}
export interface DeleteCloudVmClusterInput {
  cloudVmClusterId: string;
}
export interface DeleteCloudVmClusterOutput {}
export interface DeleteExadbVmClusterInput {
  exadbVmClusterId: string;
}
export interface DeleteExadbVmClusterOutput {}
export interface DeleteExascaleDbStorageVaultInput {
  exascaleDbStorageVaultId: string;
}
export interface DeleteExascaleDbStorageVaultOutput {}
export interface DeleteOdbNetworkInput {
  odbNetworkId: string;
  deleteAssociatedResources: boolean;
}
export interface DeleteOdbNetworkOutput {}
export interface DeleteOdbPeeringConnectionInput {
  odbPeeringConnectionId: string;
}
export interface DeleteOdbPeeringConnectionOutput {}
export interface DisassociateIamRoleFromResourceInput {
  iamRoleArn: string;
  awsIntegration: SupportedAwsIntegration;
  resourceArn: string;
}
export interface DisassociateIamRoleFromResourceOutput {}
export type ResourceIdList = string[];
export interface DisassociateVirtualMachinesFromExadbVmClusterInput {
  exadbVmClusterId: string;
  dbNodeIds: string[];
}
export interface DisassociateVirtualMachinesFromExadbVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exadbVmClusterId: string;
}
export type ResourceArn = string;
export interface FailoverAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  peerDbArn?: string;
}
export interface FailoverAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export interface GetAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export type DatabaseType = "REGULAR" | "CLONE" | (string & {});
export type PermissionLevel = "RESTRICTED" | "UNRESTRICTED" | (string & {});
export type NetServicesArchitecture = "DEDICATED" | "SHARED" | (string & {});
export type DatabaseConnectionStringMap = { [key: string]: string | undefined };
export interface DatabaseConnectionStringProfile {
  consumerGroup?: string;
  displayName?: string;
  hostFormat?: string;
  isRegional?: boolean;
  protocol?: string;
  sessionMode?: string;
  syntaxFormat?: string;
  tlsAuthentication?: string;
  value?: string;
}
export type DatabaseConnectionStringProfileList = DatabaseConnectionStringProfile[];
export interface AutonomousDatabaseConnectionStrings {
  allConnectionStrings?: { [key: string]: string | undefined };
  dedicated?: string;
  high?: string;
  medium?: string;
  low?: string;
  profiles?: DatabaseConnectionStringProfile[];
}
export interface AutonomousDatabaseApex {
  apexVersion?: string;
  ordsVersion?: string;
}
export interface DatabaseStandbySummary {
  availabilityDomain?: string;
  lagTimeInSeconds?: number;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
  maintenanceTargetComponent?: string;
  timeDataGuardRoleChanged?: Date;
  timeDisasterRecoveryRoleChanged?: Date;
  timeMaintenanceBegin?: Date;
  timeMaintenanceEnd?: Date;
}
export type DataSafeStatus =
  | "REGISTERING"
  | "REGISTERED"
  | "DEREGISTERING"
  | "NOT_REGISTERED"
  | "FAILED"
  | (string & {});
export type DatabaseManagementStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "NOT_ENABLED"
  | "FAILED_ENABLING"
  | "FAILED_DISABLING"
  | (string & {});
export type OperationsInsightsStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "NOT_ENABLED"
  | "FAILED_ENABLING"
  | "FAILED_DISABLING"
  | (string & {});
export interface AutonomousDatabaseConnectionUrls {
  apexUrl?: string;
  databaseTransformsUrl?: string;
  graphStudioUrl?: string;
  machineLearningNotebookUrl?: string;
  machineLearningUserManagementUrl?: string;
  mongoDbUrl?: string;
  ordsUrl?: string;
  spatialStudioUrl?: string;
  sqlDevWebUrl?: string;
}
export type ComputeModel = "ECPU" | "OCPU" | (string & {});
export type DataGuardRole =
  | "PRIMARY"
  | "STANDBY"
  | "DISABLED_STANDBY"
  | "BACKUP_COPY"
  | "SNAPSHOT_STANDBY"
  | (string & {});
export interface DisasterRecoveryConfiguration {
  disasterRecoveryType?: DisasterRecoveryType;
  isReplicateAutomaticBackups?: boolean;
  isSnapshotStandby?: boolean;
  timeSnapshotStandbyEnabledTill?: Date;
}
export type RefreshableStatus = "REFRESHING" | "NOT_REFRESHING" | (string & {});
export type RepeatCadence = "ONE_TIME" | "WEEKLY" | "MONTHLY" | "YEARLY" | (string & {});
export interface LongTermBackupSchedule {
  isDisabled?: boolean;
  repeatCadence?: RepeatCadence;
  retentionPeriodInDays?: number;
  timeOfBackup?: Date;
}
export type EncryptionKeyProvider = "ORACLE_MANAGED" | "AWS_KMS" | "OKV" | "OCI" | (string & {});
export interface AwsEncryptionKeyConfiguration {
  iamRoleArn?: string;
  externalIdType?: ExternalIdType;
  kmsKeyId?: string;
}
export interface OciEncryptionKeyConfiguration {
  kmsKeyId: string;
  vaultId: string;
}
export interface OkvEncryptionKeyConfiguration {
  certificateDirectoryName: string;
  certificateId?: string;
  directoryName: string;
  okvKmsKey: string;
  okvUri: string;
}
export type EncryptionKeyConfiguration =
  | {
      awsEncryptionKey: AwsEncryptionKeyConfiguration;
      ociEncryptionKey?: never;
      okvEncryptionKey?: never;
    }
  | {
      awsEncryptionKey?: never;
      ociEncryptionKey: OciEncryptionKeyConfiguration;
      okvEncryptionKey?: never;
    }
  | {
      awsEncryptionKey?: never;
      ociEncryptionKey?: never;
      okvEncryptionKey: OkvEncryptionKeyConfiguration;
    };
export interface EncryptionSummary {
  encryptionKeyProvider?: EncryptionKeyProvider;
  encryptionKeyConfiguration?: EncryptionKeyConfiguration;
}
export interface CustomerManagedAwsSecretConfiguration {
  iamRoleArn?: string;
  secretId?: string;
  externalIdType?: ExternalIdType;
}
export type AdminPasswordSourceConfiguration = {
  customerManagedAwsSecret: CustomerManagedAwsSecretConfiguration;
};
export interface AdminPasswordSourceSummary {
  adminPasswordSource?: AdminPasswordSource;
  adminPasswordSourceConfiguration?: AdminPasswordSourceConfiguration;
}
export interface AutonomousDatabase {
  autonomousDatabaseId?: string;
  autonomousDatabaseArn?: string;
  ociResourceAnchorName?: string;
  percentProgress?: number;
  ocid?: string;
  ociUrl?: string;
  displayName?: string;
  dbName?: string;
  sourceId?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
  databaseType?: DatabaseType;
  dbVersion?: string;
  dbWorkload?: DbWorkload;
  characterSet?: string;
  ncharacterSet?: string;
  databaseEdition?: DatabaseEdition;
  licenseModel?: LicenseModel;
  openMode?: OpenMode;
  permissionLevel?: PermissionLevel;
  isMtlsConnectionRequired?: boolean;
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  netServicesArchitecture?: NetServicesArchitecture;
  availableUpgradeVersions?: string[];
  byolComputeCountLimit?: number;
  connectionStringDetails?: AutonomousDatabaseConnectionStrings;
  serviceConsoleUrl?: string;
  sqlWebDeveloperUrl?: string;
  customerContacts?: CustomerContact[];
  apexDetails?: AutonomousDatabaseApex;
  standbyDb?: DatabaseStandbySummary;
  localStandbyDb?: DatabaseStandbySummary;
  dataSafeStatus?: DataSafeStatus;
  databaseManagementStatus?: DatabaseManagementStatus;
  operationsInsightsStatus?: OperationsInsightsStatus;
  availabilityZone?: string;
  availabilityZoneId?: string;
  maintenanceTargetComponent?: string;
  connectionUrls?: AutonomousDatabaseConnectionUrls;
  dbToolsDetails?: DatabaseTool[];
  scheduledOperations?: ScheduledOperationDetails[];
  resourcePoolLeaderId?: string;
  computeCount?: number;
  computeModel?: ComputeModel;
  cpuCoreCount?: number;
  memoryPerOracleComputeUnitInGBs?: number;
  provisionableCpus?: number[];
  isAutoScalingEnabled?: boolean;
  dataStorageSizeInTBs?: number;
  dataStorageSizeInGBs?: number;
  usedDataStorageSizeInTBs?: number;
  usedDataStorageSizeInGBs?: number;
  actualUsedDataStorageSizeInTBs?: number;
  allocatedStorageSizeInTBs?: number;
  inMemoryAreaInGBs?: number;
  isAutoScalingForStorageEnabled?: boolean;
  odbNetworkId?: string;
  odbNetworkArn?: string;
  privateEndpoint?: string;
  privateEndpointIp?: string;
  privateEndpointLabel?: string;
  allowlistedIps?: string[];
  standbyAllowlistedIps?: string[];
  standbyAllowlistedIpsSource?: StandbyAllowlistedIpsSource;
  isLocalDataGuardEnabled?: boolean;
  isRemoteDataGuardEnabled?: boolean;
  localDisasterRecoveryType?: DisasterRecoveryType;
  role?: DataGuardRole;
  peerDbIds?: string[];
  failedDataRecoveryInSeconds?: number;
  localAdgAutoFailoverMaxDataLossLimit?: number;
  remoteDisasterRecoveryConfiguration?: DisasterRecoveryConfiguration;
  isRefreshableClone?: boolean;
  refreshableMode?: RefreshableMode;
  refreshableStatus?: RefreshableStatus;
  autoRefreshFrequencyInSeconds?: number;
  autoRefreshPointLagInSeconds?: number;
  isReconnectCloneEnabled?: boolean;
  cloneTableSpaceList?: number[];
  backupRetentionPeriodInDays?: number;
  longTermBackupSchedule?: LongTermBackupSchedule;
  isBackupRetentionLocked?: boolean;
  totalBackupStorageSizeInGBs?: number;
  resourcePoolSummary?: ResourcePoolSummary;
  encryptionSummary?: EncryptionSummary;
  createdAt?: Date;
  timeOfLastBackup?: Date;
  timeMaintenanceBegin?: Date;
  timeMaintenanceEnd?: Date;
  timeLocalDataGuardEnabled?: Date;
  timeDataGuardRoleChanged?: Date;
  timeOfLastSwitchover?: Date;
  timeOfLastFailover?: Date;
  timeOfLastRefresh?: Date;
  timeOfLastRefreshPoint?: Date;
  timeOfNextRefresh?: Date;
  timeOfAutoRefreshStart?: Date;
  timeDeletionOfFreeAutonomousDatabase?: Date;
  timeReclamationOfFreeAutonomousDatabase?: Date;
  timeDisasterRecoveryRoleChanged?: Date;
  timeUntilReconnectCloneEnabled?: Date;
  nextLongTermBackupTimeStamp?: Date;
  timeUndeleted?: Date;
  adminPasswordSourceSummary?: AdminPasswordSourceSummary;
}
export interface GetAutonomousDatabaseOutput {
  autonomousDatabase: AutonomousDatabase;
}
export interface GetAutonomousDatabaseBackupInput {
  autonomousDatabaseBackupId: string;
}
export type AutonomousDatabaseBackupStatus =
  | "ACTIVE"
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type AutonomousDatabaseBackupType =
  | "INCREMENTAL"
  | "FULL"
  | "LONGTERM"
  | "VIRTUAL_FULL"
  | "CUMULATIVE_INCREMENTAL"
  | "ROLL_FORWARD_IMAGE_COPY"
  | (string & {});
export interface AutonomousDatabaseBackup {
  autonomousDatabaseBackupId?: string;
  autonomousDatabaseBackupArn?: string;
  autonomousDatabaseId?: string;
  ocid?: string;
  displayName?: string;
  dbVersion?: string;
  status?: AutonomousDatabaseBackupStatus;
  statusReason?: string;
  isAutomatic?: boolean;
  retentionPeriodInDays?: number;
  sizeInTBs?: number;
  timeAvailableTill?: Date;
  timeStarted?: Date;
  timeEnded?: Date;
  type?: AutonomousDatabaseBackupType;
}
export interface GetAutonomousDatabaseBackupOutput {
  autonomousDatabaseBackup?: AutonomousDatabaseBackup;
}
export interface GetAutonomousDatabaseWalletDetailsInput {
  autonomousDatabaseId: string;
}
export type AutonomousDatabaseWalletStatus = "ACTIVE" | "UPDATING" | (string & {});
export type WalletPasswordSourceConfiguration = {
  customerManagedAwsSecret: CustomerManagedAwsSecretConfiguration;
};
export interface WalletPasswordSourceSummary {
  passwordSource?: WalletPasswordSource;
  passwordSourceConfiguration?: WalletPasswordSourceConfiguration;
}
export interface AutonomousDatabaseWalletDetails {
  status?: AutonomousDatabaseWalletStatus;
  timeRotated?: Date;
  passwordSourceSummary?: WalletPasswordSourceSummary;
}
export interface GetAutonomousDatabaseWalletDetailsOutput {
  autonomousDatabaseWalletDetails: AutonomousDatabaseWalletDetails;
}
export interface GetCloudAutonomousVmClusterInput {
  cloudAutonomousVmClusterId: string;
}
export type IamRoleStatus =
  | "ASSOCIATING"
  | "DISASSOCIATING"
  | "FAILED"
  | "CONNECTED"
  | "DISCONNECTED"
  | "PARTIALLY_CONNECTED"
  | "UNKNOWN"
  | (string & {});
export interface IamRole {
  iamRoleArn?: string;
  status?: IamRoleStatus;
  statusReason?: string;
  awsIntegration?: SupportedAwsIntegration;
}
export type IamRoleList = IamRole[];
export interface CloudAutonomousVmCluster {
  cloudAutonomousVmClusterId: string;
  cloudAutonomousVmClusterArn?: string;
  odbNetworkId?: string;
  odbNetworkArn?: string;
  ociResourceAnchorName?: string;
  percentProgress?: number;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureId?: string;
  cloudExadataInfrastructureArn?: string;
  autonomousDataStoragePercentage?: number;
  autonomousDataStorageSizeInTBs?: number;
  availableAutonomousDataStorageSizeInTBs?: number;
  availableContainerDatabases?: number;
  availableCpus?: number;
  computeModel?: ComputeModel;
  cpuCoreCount?: number;
  cpuCoreCountPerNode?: number;
  cpuPercentage?: number;
  dataStorageSizeInGBs?: number;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  description?: string;
  domain?: string;
  exadataStorageInTBsLowestScaledValue?: number;
  hostname?: string;
  ocid?: string;
  ociUrl?: string;
  isMtlsEnabledVmCluster?: boolean;
  licenseModel?: LicenseModel;
  maintenanceWindow?: MaintenanceWindow;
  maxAcdsLowestScaledValue?: number;
  memoryPerOracleComputeUnitInGBs?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  nonProvisionableAutonomousContainerDatabases?: number;
  provisionableAutonomousContainerDatabases?: number;
  provisionedAutonomousContainerDatabases?: number;
  provisionedCpus?: number;
  reclaimableCpus?: number;
  reservedCpus?: number;
  scanListenerPortNonTls?: number;
  scanListenerPortTls?: number;
  shape?: string;
  createdAt?: Date;
  timeDatabaseSslCertificateExpires?: Date;
  timeOrdsCertificateExpires?: Date;
  timeZone?: string;
  totalContainerDatabases?: number;
  iamRoles?: IamRole[];
}
export interface GetCloudAutonomousVmClusterOutput {
  cloudAutonomousVmCluster?: CloudAutonomousVmCluster;
}
export interface GetCloudExadataInfrastructureInput {
  cloudExadataInfrastructureId: string;
}
export interface CloudExadataInfrastructure {
  cloudExadataInfrastructureId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureArn?: string;
  activatedStorageCount?: number;
  additionalStorageCount?: number;
  availableStorageSizeInGBs?: number;
  availabilityZone?: string;
  availabilityZoneId?: string;
  computeCount?: number;
  cpuCount?: number;
  customerContactsToSendToOCI?: CustomerContact[];
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerVersion?: string;
  lastMaintenanceRunId?: string;
  maintenanceWindow?: MaintenanceWindow;
  maxCpuCount?: number;
  maxDataStorageInTBs?: number;
  maxDbNodeStorageSizeInGBs?: number;
  maxMemoryInGBs?: number;
  memorySizeInGBs?: number;
  monthlyDbServerVersion?: string;
  monthlyStorageServerVersion?: string;
  nextMaintenanceRunId?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  ocid?: string;
  shape?: string;
  storageCount?: number;
  storageServerVersion?: string;
  createdAt?: Date;
  totalStorageSizeInGBs?: number;
  percentProgress?: number;
  databaseServerType?: string;
  storageServerType?: string;
  computeModel?: ComputeModel;
}
export interface GetCloudExadataInfrastructureOutput {
  cloudExadataInfrastructure?: CloudExadataInfrastructure;
}
export interface GetCloudExadataInfrastructureUnallocatedResourcesInput {
  cloudExadataInfrastructureId: string;
  dbServers?: string[];
}
export interface CloudAutonomousVmClusterResourceDetails {
  cloudAutonomousVmClusterId?: string;
  unallocatedAdbStorageInTBs?: number;
}
export type CloudAutonomousVmClusterResourceDetailsList = CloudAutonomousVmClusterResourceDetails[];
export interface CloudExadataInfrastructureUnallocatedResources {
  cloudAutonomousVmClusters?: CloudAutonomousVmClusterResourceDetails[];
  cloudExadataInfrastructureDisplayName?: string;
  exadataStorageInTBs?: number;
  cloudExadataInfrastructureId?: string;
  localStorageInGBs?: number;
  memoryInGBs?: number;
  ocpus?: number;
}
export interface GetCloudExadataInfrastructureUnallocatedResourcesOutput {
  cloudExadataInfrastructureUnallocatedResources?: CloudExadataInfrastructureUnallocatedResources;
}
export interface GetCloudVmClusterInput {
  cloudVmClusterId: string;
}
export type DiskRedundancy = "HIGH" | "NORMAL" | (string & {});
export interface DbIormConfig {
  dbName?: string;
  flashCacheLimit?: string;
  share?: number;
}
export type DbIormConfigList = DbIormConfig[];
export type IormLifecycleState =
  | "BOOTSTRAPPING"
  | "DISABLED"
  | "ENABLED"
  | "FAILED"
  | "UPDATING"
  | (string & {});
export type Objective =
  | "AUTO"
  | "BALANCED"
  | "BASIC"
  | "HIGH_THROUGHPUT"
  | "LOW_LATENCY"
  | (string & {});
export interface ExadataIormConfig {
  dbPlans?: DbIormConfig[];
  lifecycleDetails?: string;
  lifecycleState?: IormLifecycleState;
  objective?: Objective;
}
export type SensitiveStringList = (string | redacted.Redacted<string>)[];
export interface CloudVmCluster {
  cloudVmClusterId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudVmClusterArn?: string;
  cloudExadataInfrastructureId?: string;
  cloudExadataInfrastructureArn?: string;
  clusterName?: string;
  cpuCoreCount?: number;
  dataCollectionOptions?: DataCollectionOptions;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  diskRedundancy?: DiskRedundancy;
  giVersion?: string;
  hostname?: string;
  iormConfigCache?: ExadataIormConfig;
  isLocalBackupEnabled?: boolean;
  isSparseDiskgroupEnabled?: boolean;
  lastUpdateHistoryEntryId?: string;
  licenseModel?: LicenseModel;
  listenerPort?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  domain?: string;
  scanDnsName?: string;
  scanDnsRecordId?: string;
  scanIpIds?: string[];
  shape?: string;
  sshPublicKeys?: (string | redacted.Redacted<string>)[];
  storageSizeInGBs?: number;
  systemVersion?: string;
  createdAt?: Date;
  timeZone?: string;
  vipIds?: string[];
  odbNetworkId?: string;
  odbNetworkArn?: string;
  percentProgress?: number;
  computeModel?: ComputeModel;
  iamRoles?: IamRole[];
}
export interface GetCloudVmClusterOutput {
  cloudVmCluster?: CloudVmCluster;
}
export interface GetDbNodeInput {
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
  dbNodeId: string;
}
export type DbNodeResourceStatus =
  | "AVAILABLE"
  | "FAILED"
  | "PROVISIONING"
  | "TERMINATED"
  | "TERMINATING"
  | "UPDATING"
  | "STOPPING"
  | "STOPPED"
  | "STARTING"
  | (string & {});
export type DbNodeMaintenanceType = "VMDB_REBOOT_MIGRATION" | (string & {});
export interface DbNode {
  dbNodeId?: string;
  dbNodeArn?: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
  additionalDetails?: string;
  backupIpId?: string;
  backupVnic2Id?: string;
  backupVnicId?: string;
  cpuCoreCount?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerId?: string;
  dbSystemId?: string;
  faultDomain?: string;
  hostIpId?: string;
  hostname?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
  maintenanceType?: DbNodeMaintenanceType;
  memorySizeInGBs?: number;
  softwareStorageSizeInGB?: number;
  createdAt?: Date;
  timeMaintenanceWindowEnd?: string;
  timeMaintenanceWindowStart?: string;
  totalCpuCoreCount?: number;
  vnic2Id?: string;
  vnicId?: string;
  privateIpAddress?: string;
  floatingIpAddress?: string;
}
export interface GetDbNodeOutput {
  dbNode?: DbNode;
}
export interface GetDbServerInput {
  cloudExadataInfrastructureId: string;
  dbServerId: string;
}
export type DbServerPatchingStatus =
  | "COMPLETE"
  | "FAILED"
  | "MAINTENANCE_IN_PROGRESS"
  | "SCHEDULED"
  | (string & {});
export interface DbServerPatchingDetails {
  estimatedPatchDuration?: number;
  patchingStatus?: DbServerPatchingStatus;
  timePatchingEnded?: string;
  timePatchingStarted?: string;
}
export interface DbServer {
  dbServerId?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cpuCoreCount?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerPatchingDetails?: DbServerPatchingDetails;
  displayName?: string;
  exadataInfrastructureId?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
  maxCpuCount?: number;
  maxDbNodeStorageInGBs?: number;
  maxMemoryInGBs?: number;
  memorySizeInGBs?: number;
  shape?: string;
  createdAt?: Date;
  vmClusterIds?: string[];
  computeModel?: ComputeModel;
  autonomousVmClusterIds?: string[];
  autonomousVirtualMachineIds?: string[];
}
export interface GetDbServerOutput {
  dbServer?: DbServer;
}
export interface GetExadbVmClusterInput {
  exadbVmClusterId: string;
}
export type GridImageType = "RELEASE_UPDATE" | "CUSTOM_IMAGE" | (string & {});
export interface ExadbVmClusterStorageDetails {
  totalSizeInGBs?: number;
}
export interface ExadbVmCluster {
  exadbVmClusterId: string;
  clusterName?: string;
  createdAt?: Date;
  dataCollectionOptions?: DataCollectionOptions;
  displayName?: string;
  domain?: string;
  enabledEcpuCount?: number;
  exadbVmClusterArn?: string;
  exascaleDbStorageVaultArn?: string;
  exascaleDbStorageVaultId?: string;
  giVersion?: string;
  gridImageId?: string;
  gridImageType?: GridImageType;
  hostname?: string;
  iamRoles?: IamRole[];
  iormConfigCache?: ExadataIormConfig;
  lastUpdateHistoryEntryId?: string;
  licenseModel?: LicenseModel;
  listenerPort?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  odbNetworkArn?: string;
  odbNetworkId?: string;
  percentProgress?: number;
  scanDnsName?: string;
  scanDnsRecordId?: string;
  scanIpIds?: string[];
  scanListenerPortTcp?: number;
  scanListenerPortTcpSsl?: number;
  shape?: string;
  shapeAttribute?: ShapeAttribute;
  snapshotFileSystemStorage?: ExadbVmClusterStorageDetails;
  sshPublicKeys?: string[];
  status?: ResourceStatus;
  statusReason?: string;
  systemVersion?: string;
  timeZone?: string;
  totalEcpuCount?: number;
  totalFileSystemStorage?: ExadbVmClusterStorageDetails;
  vipIds?: string[];
  vmFileSystemStorage?: ExadbVmClusterStorageDetails;
}
export interface GetExadbVmClusterOutput {
  exadbVmCluster: ExadbVmCluster;
}
export interface GetExascaleDbStorageVaultInput {
  exascaleDbStorageVaultId: string;
}
export type ShapeAttributeList = ShapeAttribute[];
export type ResourceArnList = string[];
export interface ExascaleDbStorageDetails {
  availableSizeInGBs?: number;
  totalSizeInGBs?: number;
}
export interface ExascaleDbStorageVault {
  exascaleDbStorageVaultId: string;
  additionalFlashCacheInPercent?: number;
  attachedShapeAttributes?: ShapeAttribute[];
  autoscaleLimitInGBs?: number;
  availabilityZone?: string;
  availabilityZoneId?: string;
  createdAt?: Date;
  description?: string;
  displayName?: string;
  vmClusterArns?: string[];
  vmClusterCount?: number;
  vmClusterIds?: string[];
  exascaleDbStorageVaultArn?: string;
  highCapacityDatabaseStorage?: ExascaleDbStorageDetails;
  isAutoscaleEnabled?: boolean;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  percentProgress?: number;
  status?: ResourceStatus;
  statusReason?: string;
  timeZone?: string;
}
export interface GetExascaleDbStorageVaultOutput {
  exascaleDbStorageVault: ExascaleDbStorageVault;
}
export interface GetOciOnboardingStatusInput {}
export type OciOnboardingStatus =
  | "NOT_STARTED"
  | "PENDING_LINK_GENERATION"
  | "PENDING_CUSTOMER_ACTION"
  | "PENDING_INITIALIZATION"
  | "ACTIVATING"
  | "ACTIVE_IN_HOME_REGION"
  | "ACTIVE"
  | "ACTIVE_LIMITED"
  | "FAILED"
  | "PUBLIC_OFFER_UNSUPPORTED"
  | "SUSPENDED"
  | "CANCELED"
  | (string & {});
export interface OciIdentityDomain {
  ociIdentityDomainId?: string;
  ociIdentityDomainResourceUrl?: string;
  ociIdentityDomainUrl?: string;
  status?: ResourceStatus;
  statusReason?: string;
  accountSetupCloudFormationUrl?: string;
}
export type OciAwsIntegration = "KmsTde" | "SecretsManager" | (string & {});
export type OciIamRoleStatus =
  | "PROVISIONING"
  | "AVAILABLE"
  | "PROVISION_FAILED"
  | "TERMINATING"
  | "TERMINATE_FAILED"
  | (string & {});
export interface OciIamRole {
  iamRoleArn?: string;
  awsIntegration?: OciAwsIntegration;
  status?: OciIamRoleStatus;
  statusReason?: string;
}
export type OciIamRoleList = OciIamRole[];
export interface SubscriptionError {
  errorMessage?: string;
}
export type SubscriptionErrors = SubscriptionError[];
export interface GetOciOnboardingStatusOutput {
  status?: OciOnboardingStatus;
  existingTenancyActivationLink?: string;
  newTenancyActivationLink?: string;
  ociIdentityDomain?: OciIdentityDomain;
  autonomousDatabaseOciIntegrationIamRoles?: OciIamRole[];
  linkedOciTenancyId?: string;
  linkedOciCompartmentId?: string;
  subscriptionErrors?: SubscriptionError[];
}
export interface GetOdbNetworkInput {
  odbNetworkId: string;
}
export interface OciDnsForwardingConfig {
  domainName?: string;
  ociDnsListenerIp?: string;
}
export type OciDnsForwardingConfigList = OciDnsForwardingConfig[];
export type VpcEndpointType = "SERVICENETWORK" | (string & {});
export interface ServiceNetworkEndpoint {
  vpcEndpointId?: string;
  vpcEndpointType?: VpcEndpointType;
}
export type ManagedResourceStatus =
  | "ENABLED"
  | "ENABLING"
  | "DISABLED"
  | "DISABLING"
  | (string & {});
export interface ManagedS3BackupAccess {
  status?: ManagedResourceStatus;
  ipv4Addresses?: string[];
}
export interface ZeroEtlAccess {
  status?: ManagedResourceStatus;
  cidr?: string;
}
export interface S3Access {
  status?: ManagedResourceStatus;
  ipv4Addresses?: string[];
  domainName?: string;
  s3PolicyDocument?: string;
}
export interface StsAccess {
  status?: ManagedResourceStatus;
  ipv4Addresses?: string[];
  domainName?: string;
  stsPolicyDocument?: string;
}
export interface KmsAccess {
  status?: ManagedResourceStatus;
  ipv4Addresses?: string[];
  domainName?: string;
  kmsPolicyDocument?: string;
}
export interface CrossRegionS3RestoreSourcesAccess {
  region?: string;
  ipv4Addresses?: string[];
  status?: ManagedResourceStatus;
}
export type CrossRegionS3RestoreSourcesAccessList = CrossRegionS3RestoreSourcesAccess[];
export interface ManagedServices {
  serviceNetworkArn?: string;
  resourceGatewayArn?: string;
  managedServicesIpv4Cidrs?: string[];
  serviceNetworkEndpoint?: ServiceNetworkEndpoint;
  managedS3BackupAccess?: ManagedS3BackupAccess;
  zeroEtlAccess?: ZeroEtlAccess;
  s3Access?: S3Access;
  stsAccess?: StsAccess;
  kmsAccess?: KmsAccess;
  crossRegionS3RestoreSourcesAccess?: CrossRegionS3RestoreSourcesAccess[];
}
export interface OdbNetwork {
  odbNetworkId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbNetworkArn?: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  clientSubnetCidr?: string;
  backupSubnetCidr?: string;
  customDomainName?: string;
  defaultDnsPrefix?: string;
  peeredCidrs?: string[];
  ociNetworkAnchorId?: string;
  ociNetworkAnchorUrl?: string;
  ociResourceAnchorName?: string;
  ociVcnId?: string;
  ociVcnUrl?: string;
  ociDnsForwardingConfigs?: OciDnsForwardingConfig[];
  createdAt?: Date;
  percentProgress?: number;
  managedServices?: ManagedServices;
  ec2PlacementGroupIds?: string[];
}
export interface GetOdbNetworkOutput {
  odbNetwork?: OdbNetwork;
}
export interface GetOdbPeeringConnectionInput {
  odbPeeringConnectionId: string;
}
export interface OdbPeeringConnection {
  odbPeeringConnectionId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbPeeringConnectionArn?: string;
  odbNetworkArn?: string;
  peerNetworkArn?: string;
  odbPeeringConnectionType?: string;
  peerNetworkCidrs?: string[];
  createdAt?: Date;
  percentProgress?: number;
}
export interface GetOdbPeeringConnectionOutput {
  odbPeeringConnection?: OdbPeeringConnection;
}
export interface InitializeServiceInput {
  ociIdentityDomain?: boolean;
  autonomousDatabaseOciAwsSecretsManagerIntegration?: Access;
}
export interface InitializeServiceOutput {}
export interface ListAutonomousDatabaseBackupsInput {
  maxResults?: number;
  nextToken?: string;
  autonomousDatabaseId: string;
  status?: AutonomousDatabaseBackupStatus;
  type?: AutonomousDatabaseBackupType;
}
export interface AutonomousDatabaseBackupSummary {
  autonomousDatabaseBackupId?: string;
  autonomousDatabaseBackupArn?: string;
  autonomousDatabaseId?: string;
  ocid?: string;
  displayName?: string;
  dbVersion?: string;
  status?: AutonomousDatabaseBackupStatus;
  statusReason?: string;
  isAutomatic?: boolean;
  retentionPeriodInDays?: number;
  sizeInTBs?: number;
  timeAvailableTill?: Date;
  timeStarted?: Date;
  timeEnded?: Date;
  type?: AutonomousDatabaseBackupType;
}
export type AutonomousDatabaseBackupList = AutonomousDatabaseBackupSummary[];
export interface ListAutonomousDatabaseBackupsOutput {
  nextToken?: string;
  autonomousDatabaseBackups: AutonomousDatabaseBackupSummary[];
}
export type CharacterSetType = "DATABASE" | "NATIONAL" | (string & {});
export interface ListAutonomousDatabaseCharacterSetsInput {
  maxResults?: number;
  nextToken?: string;
  characterSetType?: CharacterSetType;
}
export interface AutonomousDatabaseCharacterSetSummary {
  characterSet?: string;
}
export type AutonomousDatabaseCharacterSetList = AutonomousDatabaseCharacterSetSummary[];
export interface ListAutonomousDatabaseCharacterSetsOutput {
  nextToken?: string;
  autonomousDatabaseCharacterSets: AutonomousDatabaseCharacterSetSummary[];
}
export interface ListAutonomousDatabaseClonesInput {
  maxResults?: number;
  nextToken?: string;
  autonomousDatabaseId: string;
}
export interface AutonomousDatabaseSummary {
  autonomousDatabaseId?: string;
  autonomousDatabaseArn?: string;
  ociResourceAnchorName?: string;
  percentProgress?: number;
  ocid?: string;
  ociUrl?: string;
  displayName?: string;
  dbName?: string;
  sourceId?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
  databaseType?: DatabaseType;
  dbVersion?: string;
  dbWorkload?: DbWorkload;
  characterSet?: string;
  ncharacterSet?: string;
  databaseEdition?: DatabaseEdition;
  licenseModel?: LicenseModel;
  openMode?: OpenMode;
  permissionLevel?: PermissionLevel;
  isMtlsConnectionRequired?: boolean;
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  netServicesArchitecture?: NetServicesArchitecture;
  availableUpgradeVersions?: string[];
  byolComputeCountLimit?: number;
  connectionStringDetails?: AutonomousDatabaseConnectionStrings;
  serviceConsoleUrl?: string;
  sqlWebDeveloperUrl?: string;
  customerContacts?: CustomerContact[];
  apexDetails?: AutonomousDatabaseApex;
  standbyDb?: DatabaseStandbySummary;
  localStandbyDb?: DatabaseStandbySummary;
  dataSafeStatus?: DataSafeStatus;
  databaseManagementStatus?: DatabaseManagementStatus;
  operationsInsightsStatus?: OperationsInsightsStatus;
  availabilityZone?: string;
  availabilityZoneId?: string;
  maintenanceTargetComponent?: string;
  connectionUrls?: AutonomousDatabaseConnectionUrls;
  dbToolsDetails?: DatabaseTool[];
  scheduledOperations?: ScheduledOperationDetails[];
  resourcePoolLeaderId?: string;
  computeCount?: number;
  computeModel?: ComputeModel;
  cpuCoreCount?: number;
  memoryPerOracleComputeUnitInGBs?: number;
  provisionableCpus?: number[];
  isAutoScalingEnabled?: boolean;
  dataStorageSizeInTBs?: number;
  dataStorageSizeInGBs?: number;
  usedDataStorageSizeInTBs?: number;
  usedDataStorageSizeInGBs?: number;
  actualUsedDataStorageSizeInTBs?: number;
  allocatedStorageSizeInTBs?: number;
  inMemoryAreaInGBs?: number;
  isAutoScalingForStorageEnabled?: boolean;
  odbNetworkId?: string;
  odbNetworkArn?: string;
  privateEndpoint?: string;
  privateEndpointIp?: string;
  privateEndpointLabel?: string;
  allowlistedIps?: string[];
  standbyAllowlistedIps?: string[];
  standbyAllowlistedIpsSource?: StandbyAllowlistedIpsSource;
  isLocalDataGuardEnabled?: boolean;
  isRemoteDataGuardEnabled?: boolean;
  localDisasterRecoveryType?: DisasterRecoveryType;
  role?: DataGuardRole;
  peerDbIds?: string[];
  failedDataRecoveryInSeconds?: number;
  localAdgAutoFailoverMaxDataLossLimit?: number;
  remoteDisasterRecoveryConfiguration?: DisasterRecoveryConfiguration;
  isRefreshableClone?: boolean;
  refreshableMode?: RefreshableMode;
  refreshableStatus?: RefreshableStatus;
  autoRefreshFrequencyInSeconds?: number;
  autoRefreshPointLagInSeconds?: number;
  isReconnectCloneEnabled?: boolean;
  cloneTableSpaceList?: number[];
  backupRetentionPeriodInDays?: number;
  longTermBackupSchedule?: LongTermBackupSchedule;
  isBackupRetentionLocked?: boolean;
  totalBackupStorageSizeInGBs?: number;
  resourcePoolSummary?: ResourcePoolSummary;
  encryptionSummary?: EncryptionSummary;
  createdAt?: Date;
  timeOfLastBackup?: Date;
  timeMaintenanceBegin?: Date;
  timeMaintenanceEnd?: Date;
  timeLocalDataGuardEnabled?: Date;
  timeDataGuardRoleChanged?: Date;
  timeOfLastSwitchover?: Date;
  timeOfLastFailover?: Date;
  timeOfLastRefresh?: Date;
  timeOfLastRefreshPoint?: Date;
  timeOfNextRefresh?: Date;
  timeOfAutoRefreshStart?: Date;
  timeDeletionOfFreeAutonomousDatabase?: Date;
  timeReclamationOfFreeAutonomousDatabase?: Date;
  timeDisasterRecoveryRoleChanged?: Date;
  timeUntilReconnectCloneEnabled?: Date;
  nextLongTermBackupTimeStamp?: Date;
  timeUndeleted?: Date;
  adminPasswordSourceSummary?: AdminPasswordSourceSummary;
}
export type AutonomousDatabaseList = AutonomousDatabaseSummary[];
export interface ListAutonomousDatabaseClonesOutput {
  nextToken?: string;
  autonomousDatabaseClones: AutonomousDatabaseSummary[];
}
export interface ListAutonomousDatabasePeersInput {
  maxResults?: number;
  nextToken?: string;
  autonomousDatabaseId: string;
}
export interface AutonomousDatabasePeerSummary {
  autonomousDatabaseId?: string;
  autonomousDatabaseArn?: string;
  ocid?: string;
  region?: string;
}
export type AutonomousDatabasePeerList = AutonomousDatabasePeerSummary[];
export interface ListAutonomousDatabasePeersOutput {
  nextToken?: string;
  autonomousDatabasePeers: AutonomousDatabasePeerSummary[];
}
export interface ListAutonomousDatabasesInput {
  maxResults?: number;
  nextToken?: string;
}
export interface ListAutonomousDatabasesOutput {
  nextToken?: string;
  autonomousDatabases: AutonomousDatabaseSummary[];
}
export interface ListAutonomousDatabaseVersionsInput {
  maxResults?: number;
  nextToken?: string;
  dbWorkload?: DbWorkload;
}
export interface AutonomousDatabaseVersionSummary {
  dbWorkload?: DbWorkload;
  details?: string;
  version?: string;
}
export type AutonomousDatabaseVersionList = AutonomousDatabaseVersionSummary[];
export interface ListAutonomousDatabaseVersionsOutput {
  nextToken?: string;
  autonomousDatabaseVersions: AutonomousDatabaseVersionSummary[];
}
export interface ListAutonomousVirtualMachinesInput {
  maxResults?: number;
  nextToken?: string;
  cloudAutonomousVmClusterId: string;
}
export interface AutonomousVirtualMachineSummary {
  autonomousVirtualMachineId?: string;
  status?: ResourceStatus;
  statusReason?: string;
  vmName?: string;
  dbServerId?: string;
  dbServerDisplayName?: string;
  cpuCoreCount?: number;
  memorySizeInGBs?: number;
  dbNodeStorageSizeInGBs?: number;
  clientIpAddress?: string;
  cloudAutonomousVmClusterId?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
}
export type AutonomousVirtualMachineList = AutonomousVirtualMachineSummary[];
export interface ListAutonomousVirtualMachinesOutput {
  nextToken?: string;
  autonomousVirtualMachines: AutonomousVirtualMachineSummary[];
}
export interface ListCloudAutonomousVmClustersInput {
  maxResults?: number;
  nextToken?: string;
  cloudExadataInfrastructureId?: string;
}
export interface CloudAutonomousVmClusterSummary {
  cloudAutonomousVmClusterId: string;
  cloudAutonomousVmClusterArn?: string;
  odbNetworkId?: string;
  odbNetworkArn?: string;
  ociResourceAnchorName?: string;
  percentProgress?: number;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureId?: string;
  cloudExadataInfrastructureArn?: string;
  autonomousDataStoragePercentage?: number;
  autonomousDataStorageSizeInTBs?: number;
  availableAutonomousDataStorageSizeInTBs?: number;
  availableContainerDatabases?: number;
  availableCpus?: number;
  computeModel?: ComputeModel;
  cpuCoreCount?: number;
  cpuCoreCountPerNode?: number;
  cpuPercentage?: number;
  dataStorageSizeInGBs?: number;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  description?: string;
  domain?: string;
  exadataStorageInTBsLowestScaledValue?: number;
  hostname?: string;
  ocid?: string;
  ociUrl?: string;
  isMtlsEnabledVmCluster?: boolean;
  licenseModel?: LicenseModel;
  maintenanceWindow?: MaintenanceWindow;
  maxAcdsLowestScaledValue?: number;
  memoryPerOracleComputeUnitInGBs?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  nonProvisionableAutonomousContainerDatabases?: number;
  provisionableAutonomousContainerDatabases?: number;
  provisionedAutonomousContainerDatabases?: number;
  provisionedCpus?: number;
  reclaimableCpus?: number;
  reservedCpus?: number;
  scanListenerPortNonTls?: number;
  scanListenerPortTls?: number;
  shape?: string;
  createdAt?: Date;
  timeDatabaseSslCertificateExpires?: Date;
  timeOrdsCertificateExpires?: Date;
  timeZone?: string;
  totalContainerDatabases?: number;
  iamRoles?: IamRole[];
}
export type CloudAutonomousVmClusterList = CloudAutonomousVmClusterSummary[];
export interface ListCloudAutonomousVmClustersOutput {
  nextToken?: string;
  cloudAutonomousVmClusters: CloudAutonomousVmClusterSummary[];
}
export interface ListCloudExadataInfrastructuresInput {
  maxResults?: number;
  nextToken?: string;
}
export interface CloudExadataInfrastructureSummary {
  cloudExadataInfrastructureId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureArn?: string;
  activatedStorageCount?: number;
  additionalStorageCount?: number;
  availableStorageSizeInGBs?: number;
  availabilityZone?: string;
  availabilityZoneId?: string;
  computeCount?: number;
  cpuCount?: number;
  customerContactsToSendToOCI?: CustomerContact[];
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerVersion?: string;
  lastMaintenanceRunId?: string;
  maintenanceWindow?: MaintenanceWindow;
  maxCpuCount?: number;
  maxDataStorageInTBs?: number;
  maxDbNodeStorageSizeInGBs?: number;
  maxMemoryInGBs?: number;
  memorySizeInGBs?: number;
  monthlyDbServerVersion?: string;
  monthlyStorageServerVersion?: string;
  nextMaintenanceRunId?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  ocid?: string;
  shape?: string;
  storageCount?: number;
  storageServerVersion?: string;
  createdAt?: Date;
  totalStorageSizeInGBs?: number;
  percentProgress?: number;
  databaseServerType?: string;
  storageServerType?: string;
  computeModel?: ComputeModel;
}
export type CloudExadataInfrastructureList = CloudExadataInfrastructureSummary[];
export interface ListCloudExadataInfrastructuresOutput {
  nextToken?: string;
  cloudExadataInfrastructures: CloudExadataInfrastructureSummary[];
}
export interface ListCloudVmClustersInput {
  maxResults?: number;
  nextToken?: string;
  cloudExadataInfrastructureId?: string;
}
export interface CloudVmClusterSummary {
  cloudVmClusterId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudVmClusterArn?: string;
  cloudExadataInfrastructureId?: string;
  cloudExadataInfrastructureArn?: string;
  clusterName?: string;
  cpuCoreCount?: number;
  dataCollectionOptions?: DataCollectionOptions;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  diskRedundancy?: DiskRedundancy;
  giVersion?: string;
  hostname?: string;
  iormConfigCache?: ExadataIormConfig;
  isLocalBackupEnabled?: boolean;
  isSparseDiskgroupEnabled?: boolean;
  lastUpdateHistoryEntryId?: string;
  licenseModel?: LicenseModel;
  listenerPort?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  domain?: string;
  scanDnsName?: string;
  scanDnsRecordId?: string;
  scanIpIds?: string[];
  shape?: string;
  sshPublicKeys?: (string | redacted.Redacted<string>)[];
  storageSizeInGBs?: number;
  systemVersion?: string;
  createdAt?: Date;
  timeZone?: string;
  vipIds?: string[];
  odbNetworkId?: string;
  odbNetworkArn?: string;
  percentProgress?: number;
  computeModel?: ComputeModel;
  iamRoles?: IamRole[];
}
export type CloudVmClusterList = CloudVmClusterSummary[];
export interface ListCloudVmClustersOutput {
  nextToken?: string;
  cloudVmClusters: CloudVmClusterSummary[];
}
export interface ListDbNodesInput {
  maxResults?: number;
  nextToken?: string;
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
}
export interface DbNodeSummary {
  dbNodeId?: string;
  dbNodeArn?: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
  additionalDetails?: string;
  backupIpId?: string;
  backupVnic2Id?: string;
  backupVnicId?: string;
  cpuCoreCount?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerId?: string;
  dbSystemId?: string;
  faultDomain?: string;
  hostIpId?: string;
  hostname?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
  maintenanceType?: DbNodeMaintenanceType;
  memorySizeInGBs?: number;
  softwareStorageSizeInGB?: number;
  createdAt?: Date;
  timeMaintenanceWindowEnd?: string;
  timeMaintenanceWindowStart?: string;
  totalCpuCoreCount?: number;
  vnic2Id?: string;
  vnicId?: string;
}
export type DbNodeList = DbNodeSummary[];
export interface ListDbNodesOutput {
  nextToken?: string;
  dbNodes: DbNodeSummary[];
}
export interface ListDbServersInput {
  cloudExadataInfrastructureId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface DbServerSummary {
  dbServerId?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cpuCoreCount?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerPatchingDetails?: DbServerPatchingDetails;
  displayName?: string;
  exadataInfrastructureId?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
  maxCpuCount?: number;
  maxDbNodeStorageInGBs?: number;
  maxMemoryInGBs?: number;
  memorySizeInGBs?: number;
  shape?: string;
  createdAt?: Date;
  vmClusterIds?: string[];
  computeModel?: ComputeModel;
  autonomousVmClusterIds?: string[];
  autonomousVirtualMachineIds?: string[];
}
export type DbServerList = DbServerSummary[];
export interface ListDbServersOutput {
  nextToken?: string;
  dbServers: DbServerSummary[];
}
export interface ListDbSystemShapesInput {
  maxResults?: number;
  nextToken?: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  shapeFamily?: string;
}
export type ShapeType = "AMD" | "INTEL" | "INTEL_FLEX_X9" | "AMPERE_FLEX_A1" | (string & {});
export interface DbSystemShapeSummary {
  availableCoreCount?: number;
  availableCoreCountPerNode?: number;
  availableDataStorageInTBs?: number;
  availableDataStoragePerServerInTBs?: number;
  availableDbNodePerNodeInGBs?: number;
  availableDbNodeStorageInGBs?: number;
  availableMemoryInGBs?: number;
  availableMemoryPerNodeInGBs?: number;
  coreCountIncrement?: number;
  maxStorageCount?: number;
  maximumNodeCount?: number;
  minCoreCountPerNode?: number;
  minDataStorageInTBs?: number;
  minDbNodeStoragePerNodeInGBs?: number;
  minMemoryPerNodeInGBs?: number;
  minStorageCount?: number;
  minimumCoreCount?: number;
  minimumNodeCount?: number;
  runtimeMinimumCoreCount?: number;
  shapeFamily?: string;
  shapeType?: ShapeType;
  shapeAttributes?: ShapeAttribute[];
  name?: string;
  computeModel?: ComputeModel;
  areServerTypesSupported?: boolean;
}
export type DbSystemShapeList = DbSystemShapeSummary[];
export interface ListDbSystemShapesOutput {
  nextToken?: string;
  dbSystemShapes: DbSystemShapeSummary[];
}
export interface ListExadbVmClustersInput {
  exascaleDbStorageVaultId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ExadbVmClusterSummary {
  exadbVmClusterId: string;
  clusterName?: string;
  createdAt?: Date;
  dataCollectionOptions?: DataCollectionOptions;
  displayName?: string;
  domain?: string;
  enabledEcpuCount?: number;
  exadbVmClusterArn?: string;
  exascaleDbStorageVaultArn?: string;
  exascaleDbStorageVaultId?: string;
  giVersion?: string;
  gridImageId?: string;
  gridImageType?: GridImageType;
  hostname?: string;
  iamRoles?: IamRole[];
  iormConfigCache?: ExadataIormConfig;
  lastUpdateHistoryEntryId?: string;
  licenseModel?: LicenseModel;
  listenerPort?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  odbNetworkArn?: string;
  odbNetworkId?: string;
  percentProgress?: number;
  scanDnsName?: string;
  scanDnsRecordId?: string;
  scanIpIds?: string[];
  scanListenerPortTcp?: number;
  scanListenerPortTcpSsl?: number;
  shape?: string;
  shapeAttribute?: ShapeAttribute;
  snapshotFileSystemStorage?: ExadbVmClusterStorageDetails;
  sshPublicKeys?: string[];
  status?: ResourceStatus;
  statusReason?: string;
  systemVersion?: string;
  timeZone?: string;
  totalEcpuCount?: number;
  totalFileSystemStorage?: ExadbVmClusterStorageDetails;
  vipIds?: string[];
  vmFileSystemStorage?: ExadbVmClusterStorageDetails;
}
export type ExadbVmClusterList = ExadbVmClusterSummary[];
export interface ListExadbVmClustersOutput {
  nextToken?: string;
  exadbVmClusters: ExadbVmClusterSummary[];
}
export interface ListExascaleDbStorageVaultsInput {
  maxResults?: number;
  nextToken?: string;
}
export interface ExascaleDbStorageVaultSummary {
  exascaleDbStorageVaultId: string;
  additionalFlashCacheInPercent?: number;
  attachedShapeAttributes?: ShapeAttribute[];
  autoscaleLimitInGBs?: number;
  availabilityZone?: string;
  availabilityZoneId?: string;
  createdAt?: Date;
  description?: string;
  displayName?: string;
  vmClusterArns?: string[];
  vmClusterCount?: number;
  vmClusterIds?: string[];
  exascaleDbStorageVaultArn?: string;
  highCapacityDatabaseStorage?: ExascaleDbStorageDetails;
  isAutoscaleEnabled?: boolean;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  percentProgress?: number;
  status?: ResourceStatus;
  statusReason?: string;
  timeZone?: string;
}
export type ExascaleDbStorageVaultList = ExascaleDbStorageVaultSummary[];
export interface ListExascaleDbStorageVaultsOutput {
  nextToken?: string;
  exascaleDbStorageVaults: ExascaleDbStorageVaultSummary[];
}
export interface ListFlexComponentsInput {
  maxResults?: number;
  nextToken?: string;
  shape?: string;
}
export type HardwareType = "COMPUTE" | "CELL" | (string & {});
export interface FlexComponentSummary {
  availableCoreCount?: number;
  availableDbStorageInGBs?: number;
  availableLocalStorageInGBs?: number;
  availableMemoryInGBs?: number;
  computeModel?: ComputeModel;
  descriptionSummary?: string;
  hardwareType?: HardwareType;
  minimumCoreCount?: number;
  name?: string;
  runtimeMinimumCoreCount?: number;
  shape?: string;
}
export type FlexComponentList = FlexComponentSummary[];
export interface ListFlexComponentsOutput {
  nextToken?: string;
  flexComponents: FlexComponentSummary[];
}
export interface ListGiMinorVersionsInput {
  giVersion: string;
  maxResults?: number;
  nextToken?: string;
  shapeFamily?: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
}
export interface GiMinorVersionSummary {
  version: string;
  gridImageId?: string;
}
export type GiMinorVersionList = GiMinorVersionSummary[];
export interface ListGiMinorVersionsOutput {
  nextToken?: string;
  giMinorVersions: GiMinorVersionSummary[];
}
export interface ListGiVersionsInput {
  maxResults?: number;
  nextToken?: string;
  shape?: string;
}
export interface GiVersionSummary {
  version?: string;
}
export type GiVersionList = GiVersionSummary[];
export interface ListGiVersionsOutput {
  nextToken?: string;
  giVersions: GiVersionSummary[];
}
export interface ListOdbNetworksInput {
  maxResults?: number;
  nextToken?: string;
}
export interface OdbNetworkSummary {
  odbNetworkId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbNetworkArn?: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  clientSubnetCidr?: string;
  backupSubnetCidr?: string;
  customDomainName?: string;
  defaultDnsPrefix?: string;
  peeredCidrs?: string[];
  ociNetworkAnchorId?: string;
  ociNetworkAnchorUrl?: string;
  ociResourceAnchorName?: string;
  ociVcnId?: string;
  ociVcnUrl?: string;
  ociDnsForwardingConfigs?: OciDnsForwardingConfig[];
  createdAt?: Date;
  percentProgress?: number;
  managedServices?: ManagedServices;
  ec2PlacementGroupIds?: string[];
}
export type OdbNetworkList = OdbNetworkSummary[];
export interface ListOdbNetworksOutput {
  nextToken?: string;
  odbNetworks: OdbNetworkSummary[];
}
export interface ListOdbPeeringConnectionsInput {
  maxResults?: number;
  nextToken?: string;
  odbNetworkId?: string;
}
export interface OdbPeeringConnectionSummary {
  odbPeeringConnectionId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbPeeringConnectionArn?: string;
  odbNetworkArn?: string;
  peerNetworkArn?: string;
  odbPeeringConnectionType?: string;
  peerNetworkCidrs?: string[];
  createdAt?: Date;
  percentProgress?: number;
}
export type OdbPeeringConnectionList = OdbPeeringConnectionSummary[];
export interface ListOdbPeeringConnectionsOutput {
  nextToken?: string;
  odbPeeringConnections: OdbPeeringConnectionSummary[];
}
export interface ListSystemVersionsInput {
  maxResults?: number;
  nextToken?: string;
  giVersion: string;
  shape: string;
}
export interface SystemVersionSummary {
  giVersion?: string;
  shape?: string;
  systemVersions?: string[];
}
export type SystemVersionList = SystemVersionSummary[];
export interface ListSystemVersionsOutput {
  nextToken?: string;
  systemVersions: SystemVersionSummary[];
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type ResponseTagMap = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface RebootAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  isOnlineReboot?: boolean;
}
export interface RebootAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export interface RebootDbNodeInput {
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
  dbNodeId: string;
}
export interface RebootDbNodeOutput {
  dbNodeId: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
}
export interface RestoreAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  timestamp: Date;
}
export interface RestoreAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export interface ShrinkAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export interface ShrinkAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export interface StartAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export interface StartAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export interface StartDbNodeInput {
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
  dbNodeId: string;
}
export interface StartDbNodeOutput {
  dbNodeId: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
}
export interface StopAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export interface StopAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export interface StopDbNodeInput {
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
  dbNodeId: string;
}
export interface StopDbNodeOutput {
  dbNodeId: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
}
export interface SwitchoverAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  peerDbArn?: string;
}
export interface SwitchoverAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
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
export interface UpdateAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  adminPassword?: string | redacted.Redacted<string>;
  computeCount?: number;
  cpuCoreCount?: number;
  dataStorageSizeInTBs?: number;
  dataStorageSizeInGBs?: number;
  displayName?: string;
  dbName?: string;
  dbVersion?: string;
  dbWorkload?: DbWorkload;
  dbToolsDetails?: DatabaseTool[];
  databaseEdition?: DatabaseEdition;
  licenseModel?: LicenseModel;
  isAutoScalingEnabled?: boolean;
  isAutoScalingForStorageEnabled?: boolean;
  isBackupRetentionLocked?: boolean;
  isLocalDataGuardEnabled?: boolean;
  isMtlsConnectionRequired?: boolean;
  isRefreshableClone?: boolean;
  isDisconnectPeer?: boolean;
  backupRetentionPeriodInDays?: number;
  byolComputeCountLimit?: number;
  localAdgAutoFailoverMaxDataLossLimit?: number;
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  customerContactsToSendToOCI?: CustomerContact[];
  scheduledOperations?: ScheduledOperationDetails[];
  longTermBackupSchedule?: LongTermBackupSchedule;
  openMode?: OpenMode;
  permissionLevel?: PermissionLevel;
  refreshableMode?: RefreshableMode;
  privateEndpointIp?: string;
  privateEndpointLabel?: string;
  peerDbId?: string;
  resourcePoolLeaderId?: string;
  resourcePoolSummary?: ResourcePoolSummary;
  standbyAllowlistedIpsSource?: StandbyAllowlistedIpsSource;
  standbyAllowlistedIps?: string[];
  allowlistedIps?: string[];
  autoRefreshFrequencyInSeconds?: number;
  autoRefreshPointLagInSeconds?: number;
  timeOfAutoRefreshStart?: Date;
  encryptionKeyProvider?: EncryptionKeyProviderInput;
  encryptionKeyConfiguration?: EncryptionKeyConfigurationInput;
  adminPasswordSource?: AdminPasswordSource;
  adminPasswordSourceConfiguration?: AdminPasswordSourceConfigurationInput;
}
export interface UpdateAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export interface UpdateAutonomousDatabaseBackupInput {
  autonomousDatabaseBackupId: string;
  retentionPeriodInDays?: number;
}
export interface UpdateAutonomousDatabaseBackupOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  autonomousDatabaseBackupId: string;
}
export interface UpdateCloudExadataInfrastructureInput {
  cloudExadataInfrastructureId: string;
  maintenanceWindow?: MaintenanceWindow;
}
export interface UpdateCloudExadataInfrastructureOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureId: string;
}
export type UpdateAction =
  | "ROLLING_APPLY"
  | "NON_ROLLING_APPLY"
  | "PRECHECK"
  | "ROLLBACK"
  | (string & {});
export interface UpdateExadbVmClusterInput {
  exadbVmClusterId: string;
  dataCollectionOptions?: DataCollectionOptions;
  displayName?: string;
  enabledEcpuCount?: number;
  gridImageId?: string;
  licenseModel?: LicenseModel;
  sshPublicKeys?: string[];
  systemVersion?: string;
  totalEcpuCount?: number;
  updateAction?: UpdateAction;
  vmFileSystemStorageTotalSizeInGBs?: number;
}
export interface UpdateExadbVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exadbVmClusterId: string;
}
export interface UpdateExascaleDbStorageVaultInput {
  exascaleDbStorageVaultId: string;
  additionalFlashCacheInPercent?: number;
  autoscaleLimitInGBs?: number;
  description?: string;
  displayName?: string;
  highCapacityDatabaseStorageTotalSizeInGBs?: number;
  isAutoscaleEnabled?: boolean;
}
export interface UpdateExascaleDbStorageVaultOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exascaleDbStorageVaultId: string;
}
export interface UpdateOdbNetworkInput {
  odbNetworkId: string;
  displayName?: string;
  peeredCidrsToBeAdded?: string[];
  peeredCidrsToBeRemoved?: string[];
  s3Access?: Access;
  zeroEtlAccess?: Access;
  stsAccess?: Access;
  kmsAccess?: Access;
  s3PolicyDocument?: string;
  stsPolicyDocument?: string;
  kmsPolicyDocument?: string;
  crossRegionS3RestoreSourcesToEnable?: string[];
  crossRegionS3RestoreSourcesToDisable?: string[];
}
export interface UpdateOdbNetworkOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbNetworkId: string;
}
export interface UpdateOdbPeeringConnectionInput {
  odbPeeringConnectionId: string;
  displayName?: string;
  peerNetworkCidrsToBeAdded?: string[];
  peerNetworkCidrsToBeRemoved?: string[];
}
export interface UpdateOdbPeeringConnectionOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbPeeringConnectionId: string;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AcceptMarketplaceRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers the Amazon Web Services Marketplace token for your Amazon Web Services account to activate your Oracle Database@Amazon Web Services subscription.
 */
export const acceptMarketplaceRegistration: API.OperationMethod<
  AcceptMarketplaceRegistrationInput,
  AcceptMarketplaceRegistrationOutput,
  AcceptMarketplaceRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<AcceptMarketplaceRegistrationInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<AcceptMarketplaceRegistrationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptMarketplaceRegistration",
}));

export type AssociateIamRoleToResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an Amazon Web Services Identity and Access Management (IAM) service role with a specified resource to enable Amazon Web Services service integration.
 */
export const associateIamRoleToResource: API.OperationMethod<
  AssociateIamRoleToResourceInput,
  AssociateIamRoleToResourceOutput,
  AssociateIamRoleToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c106, 0) as any as S.Schema<AssociateIamRoleToResourceInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<AssociateIamRoleToResourceOutput>,
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
  operationName: "AssociateIamRoleToResource",
}));

export type AssociateVirtualMachinesToExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds virtual machines to the specified Exascale VM cluster.
 */
export const associateVirtualMachinesToExadbVmCluster: API.OperationMethod<
  AssociateVirtualMachinesToExadbVmClusterInput,
  AssociateVirtualMachinesToExadbVmClusterOutput,
  AssociateVirtualMachinesToExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<AssociateVirtualMachinesToExadbVmClusterInput>,
  output: __S(1840, __c115, 0) as any as S.Schema<AssociateVirtualMachinesToExadbVmClusterOutput>,
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
  operationName: "AssociateVirtualMachinesToExadbVmCluster",
}));

export type CreateAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Autonomous Database.
 */
export const createAutonomousDatabase: API.OperationMethod<
  CreateAutonomousDatabaseInput,
  CreateAutonomousDatabaseOutput,
  CreateAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c0, 8) as any as S.Schema<CreateAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<CreateAutonomousDatabaseOutput>,
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
  operationName: "CreateAutonomousDatabase",
}));

export type CreateAutonomousDatabaseBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new backup of the specified Autonomous Database.
 */
export const createAutonomousDatabaseBackup: API.OperationMethod<
  CreateAutonomousDatabaseBackupInput,
  CreateAutonomousDatabaseBackupOutput,
  CreateAutonomousDatabaseBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateAutonomousDatabaseBackupInput>,
  output: __S(176, __c11, 0) as any as S.Schema<CreateAutonomousDatabaseBackupOutput>,
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
  operationName: "CreateAutonomousDatabaseBackup",
}));

export type CreateAutonomousDatabaseWalletError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new wallet for the specified Autonomous Database.
 */
export const createAutonomousDatabaseWallet: API.OperationMethod<
  CreateAutonomousDatabaseWalletInput,
  CreateAutonomousDatabaseWalletOutput,
  CreateAutonomousDatabaseWalletError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreateAutonomousDatabaseWalletInput>,
  output: __S(193, __c12, 1) as any as S.Schema<CreateAutonomousDatabaseWalletOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutonomousDatabaseWallet",
}));

export type CreateCloudAutonomousVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Autonomous VM cluster in the specified Exadata infrastructure.
 */
export const createCloudAutonomousVmCluster: API.OperationMethod<
  CreateCloudAutonomousVmClusterInput,
  CreateCloudAutonomousVmClusterOutput,
  CreateCloudAutonomousVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<CreateCloudAutonomousVmClusterInput>,
  output: __S(209, __c13, 1) as any as S.Schema<CreateCloudAutonomousVmClusterOutput>,
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
  operationName: "CreateCloudAutonomousVmCluster",
}));

export type CreateCloudExadataInfrastructureError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Exadata infrastructure.
 */
export const createCloudExadataInfrastructure: API.OperationMethod<
  CreateCloudExadataInfrastructureInput,
  CreateCloudExadataInfrastructureOutput,
  CreateCloudExadataInfrastructureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<CreateCloudExadataInfrastructureInput>,
  output: __S(256, __c16, 0) as any as S.Schema<CreateCloudExadataInfrastructureOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudExadataInfrastructure",
}));

export type CreateCloudVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a VM cluster on the specified Exadata infrastructure.
 */
export const createCloudVmCluster: API.OperationMethod<
  CreateCloudVmClusterInput,
  CreateCloudVmClusterOutput,
  CreateCloudVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<CreateCloudVmClusterInput>,
  output: __S(273, __c17, 1) as any as S.Schema<CreateCloudVmClusterOutput>,
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
  operationName: "CreateCloudVmCluster",
}));

export type CreateExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Exascale VM cluster.
 */
export const createExadbVmCluster: API.OperationMethod<
  CreateExadbVmClusterInput,
  CreateExadbVmClusterOutput,
  CreateExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<CreateExadbVmClusterInput>,
  output: __S(1840, __c115, 0) as any as S.Schema<CreateExadbVmClusterOutput>,
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
  operationName: "CreateExadbVmCluster",
}));

export type CreateExascaleDbStorageVaultError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Exascale storage vault.
 */
export const createExascaleDbStorageVault: API.OperationMethod<
  CreateExascaleDbStorageVaultInput,
  CreateExascaleDbStorageVaultOutput,
  CreateExascaleDbStorageVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<CreateExascaleDbStorageVaultInput>,
  output: __S(336, __c21, 0) as any as S.Schema<CreateExascaleDbStorageVaultOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExascaleDbStorageVault",
}));

export type CreateOdbNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ODB network.
 */
export const createOdbNetwork: API.OperationMethod<
  CreateOdbNetworkInput,
  CreateOdbNetworkOutput,
  CreateOdbNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<CreateOdbNetworkInput>,
  output: __S(368, __c23, 0) as any as S.Schema<CreateOdbNetworkOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOdbNetwork",
}));

export type CreateOdbPeeringConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a peering connection between an ODB network and a VPC.
 *
 * A peering connection enables private connectivity between the networks for application-tier communication.
 */
export const createOdbPeeringConnection: API.OperationMethod<
  CreateOdbPeeringConnectionInput,
  CreateOdbPeeringConnectionOutput,
  CreateOdbPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<CreateOdbPeeringConnectionInput>,
  output: __S(400, __c25, 0) as any as S.Schema<CreateOdbPeeringConnectionOutput>,
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
  operationName: "CreateOdbPeeringConnection",
}));

export type DeleteAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Autonomous Database.
 */
export const deleteAutonomousDatabase: API.OperationMethod<
  DeleteAutonomousDatabaseInput,
  DeleteAutonomousDatabaseOutput,
  DeleteAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteAutonomousDatabaseInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteAutonomousDatabaseOutput>,
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
  operationName: "DeleteAutonomousDatabase",
}));

export type DeleteAutonomousDatabaseBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Autonomous Database backup.
 */
export const deleteAutonomousDatabaseBackup: API.OperationMethod<
  DeleteAutonomousDatabaseBackupInput,
  DeleteAutonomousDatabaseBackupOutput,
  DeleteAutonomousDatabaseBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DeleteAutonomousDatabaseBackupInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteAutonomousDatabaseBackupOutput>,
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
  operationName: "DeleteAutonomousDatabaseBackup",
}));

export type DeleteCloudAutonomousVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Autonomous VM cluster.
 */
export const deleteCloudAutonomousVmCluster: API.OperationMethod<
  DeleteCloudAutonomousVmClusterInput,
  DeleteCloudAutonomousVmClusterOutput,
  DeleteCloudAutonomousVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteCloudAutonomousVmClusterInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteCloudAutonomousVmClusterOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudAutonomousVmCluster",
}));

export type DeleteCloudExadataInfrastructureError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Exadata infrastructure. Before you use this operation, make sure to delete all of the VM clusters that are hosted on this Exadata infrastructure.
 */
export const deleteCloudExadataInfrastructure: API.OperationMethod<
  DeleteCloudExadataInfrastructureInput,
  DeleteCloudExadataInfrastructureOutput,
  DeleteCloudExadataInfrastructureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DeleteCloudExadataInfrastructureInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteCloudExadataInfrastructureOutput>,
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
  operationName: "DeleteCloudExadataInfrastructure",
}));

export type DeleteCloudVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified VM cluster.
 */
export const deleteCloudVmCluster: API.OperationMethod<
  DeleteCloudVmClusterInput,
  DeleteCloudVmClusterOutput,
  DeleteCloudVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteCloudVmClusterInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteCloudVmClusterOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudVmCluster",
}));

export type DeleteExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Exascale VM cluster.
 */
export const deleteExadbVmCluster: API.OperationMethod<
  DeleteExadbVmClusterInput,
  DeleteExadbVmClusterOutput,
  DeleteExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DeleteExadbVmClusterInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteExadbVmClusterOutput>,
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
  operationName: "DeleteExadbVmCluster",
}));

export type DeleteExascaleDbStorageVaultError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Exascale storage vault.
 */
export const deleteExascaleDbStorageVault: API.OperationMethod<
  DeleteExascaleDbStorageVaultInput,
  DeleteExascaleDbStorageVaultOutput,
  DeleteExascaleDbStorageVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<DeleteExascaleDbStorageVaultInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteExascaleDbStorageVaultOutput>,
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
  operationName: "DeleteExascaleDbStorageVault",
}));

export type DeleteOdbNetworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified ODB network.
 */
export const deleteOdbNetwork: API.OperationMethod<
  DeleteOdbNetworkInput,
  DeleteOdbNetworkOutput,
  DeleteOdbNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<DeleteOdbNetworkInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteOdbNetworkOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOdbNetwork",
}));

export type DeleteOdbPeeringConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ODB peering connection.
 *
 * When you delete an ODB peering connection, the underlying VPC peering connection is also deleted.
 */
export const deleteOdbPeeringConnection: API.OperationMethod<
  DeleteOdbPeeringConnectionInput,
  DeleteOdbPeeringConnectionOutput,
  DeleteOdbPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<DeleteOdbPeeringConnectionInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DeleteOdbPeeringConnectionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOdbPeeringConnection",
}));

export type DisassociateIamRoleFromResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an Amazon Web Services Identity and Access Management (IAM) service role from a specified resource to disable Amazon Web Services service integration.
 */
export const disassociateIamRoleFromResource: API.OperationMethod<
  DisassociateIamRoleFromResourceInput,
  DisassociateIamRoleFromResourceOutput,
  DisassociateIamRoleFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<DisassociateIamRoleFromResourceInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<DisassociateIamRoleFromResourceOutput>,
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
  operationName: "DisassociateIamRoleFromResource",
}));

export type DisassociateVirtualMachinesFromExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes virtual machines from the specified Exascale VM cluster.
 */
export const disassociateVirtualMachinesFromExadbVmCluster: API.OperationMethod<
  DisassociateVirtualMachinesFromExadbVmClusterInput,
  DisassociateVirtualMachinesFromExadbVmClusterOutput,
  DisassociateVirtualMachinesFromExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<DisassociateVirtualMachinesFromExadbVmClusterInput>,
  output: __S(
    1840,
    __c115,
    0,
  ) as any as S.Schema<DisassociateVirtualMachinesFromExadbVmClusterOutput>,
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
  operationName: "DisassociateVirtualMachinesFromExadbVmCluster",
}));

export type FailoverAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a failover of the specified Autonomous Database to a standby peer database.
 */
export const failoverAutonomousDatabase: API.OperationMethod<
  FailoverAutonomousDatabaseInput,
  FailoverAutonomousDatabaseOutput,
  FailoverAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<FailoverAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<FailoverAutonomousDatabaseOutput>,
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
  operationName: "FailoverAutonomousDatabase",
}));

export type GetAutonomousDatabaseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific Autonomous Database.
 */
export const getAutonomousDatabase: API.OperationMethod<
  GetAutonomousDatabaseInput,
  GetAutonomousDatabaseOutput,
  GetAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<GetAutonomousDatabaseInput>,
  output: __S(609, __c38, 1) as any as S.Schema<GetAutonomousDatabaseOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutonomousDatabase",
}));

export type GetAutonomousDatabaseBackupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific Autonomous Database backup.
 */
export const getAutonomousDatabaseBackup: API.OperationMethod<
  GetAutonomousDatabaseBackupInput,
  GetAutonomousDatabaseBackupOutput,
  GetAutonomousDatabaseBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<GetAutonomousDatabaseBackupInput>,
  output: __S(673, __c42, 1) as any as S.Schema<GetAutonomousDatabaseBackupOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutonomousDatabaseBackup",
}));

export type GetAutonomousDatabaseWalletDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the wallet details for the specified Autonomous Database.
 */
export const getAutonomousDatabaseWalletDetails: API.OperationMethod<
  GetAutonomousDatabaseWalletDetailsInput,
  GetAutonomousDatabaseWalletDetailsOutput,
  GetAutonomousDatabaseWalletDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<GetAutonomousDatabaseWalletDetailsInput>,
  output: __S(707, __c44, 3) as any as S.Schema<GetAutonomousDatabaseWalletDetailsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutonomousDatabaseWalletDetails",
}));

export type GetCloudAutonomousVmClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific Autonomous VM cluster.
 */
export const getCloudAutonomousVmCluster: API.OperationMethod<
  GetCloudAutonomousVmClusterInput,
  GetCloudAutonomousVmClusterOutput,
  GetCloudAutonomousVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<GetCloudAutonomousVmClusterInput>,
  output: __S(721, __c45, 1) as any as S.Schema<GetCloudAutonomousVmClusterOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudAutonomousVmCluster",
}));

export type GetCloudExadataInfrastructureError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified Exadata infrastructure.
 */
export const getCloudExadataInfrastructure: API.OperationMethod<
  GetCloudExadataInfrastructureInput,
  GetCloudExadataInfrastructureOutput,
  GetCloudExadataInfrastructureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<GetCloudExadataInfrastructureInput>,
  output: __S(769, __c48, 1) as any as S.Schema<GetCloudExadataInfrastructureOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudExadataInfrastructure",
}));

export type GetCloudExadataInfrastructureUnallocatedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about unallocated resources in a specified Cloud Exadata Infrastructure.
 */
export const getCloudExadataInfrastructureUnallocatedResources: API.OperationMethod<
  GetCloudExadataInfrastructureUnallocatedResourcesInput,
  GetCloudExadataInfrastructureUnallocatedResourcesOutput,
  GetCloudExadataInfrastructureUnallocatedResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    800,
    __c50,
    0,
  ) as any as S.Schema<GetCloudExadataInfrastructureUnallocatedResourcesInput>,
  output: __S(
    804,
    __c50,
    4,
  ) as any as S.Schema<GetCloudExadataInfrastructureUnallocatedResourcesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudExadataInfrastructureUnallocatedResources",
}));

export type GetCloudVmClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified VM cluster.
 */
export const getCloudVmCluster: API.OperationMethod<
  GetCloudVmClusterInput,
  GetCloudVmClusterOutput,
  GetCloudVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<GetCloudVmClusterInput>,
  output: __S(817, __c51, 1) as any as S.Schema<GetCloudVmClusterOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudVmCluster",
}));

export type GetDbNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified DB node.
 */
export const getDbNode: API.OperationMethod<
  GetDbNodeInput,
  GetDbNodeOutput,
  GetDbNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<GetDbNodeInput>,
  output: __S(866, __c54, 2) as any as S.Schema<GetDbNodeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbNode",
}));

export type GetDbServerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified database server.
 */
export const getDbServer: API.OperationMethod<
  GetDbServerInput,
  GetDbServerOutput,
  GetDbServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<GetDbServerInput>,
  output: __S(881, __c55, 1) as any as S.Schema<GetDbServerOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbServer",
}));

export type GetExadbVmClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified Exascale VM cluster.
 */
export const getExadbVmCluster: API.OperationMethod<
  GetExadbVmClusterInput,
  GetExadbVmClusterOutput,
  GetExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<GetExadbVmClusterInput>,
  output: __S(913, __c57, 1) as any as S.Schema<GetExadbVmClusterOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExadbVmCluster",
}));

export type GetExascaleDbStorageVaultError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified Exascale storage vault.
 */
export const getExascaleDbStorageVault: API.OperationMethod<
  GetExascaleDbStorageVaultInput,
  GetExascaleDbStorageVaultOutput,
  GetExascaleDbStorageVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<GetExascaleDbStorageVaultInput>,
  output: __S(945, __c59, 1) as any as S.Schema<GetExascaleDbStorageVaultOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExascaleDbStorageVault",
}));

export type GetOciOnboardingStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the tenancy activation link and onboarding status for your Amazon Web Services account.
 */
export const getOciOnboardingStatus: API.OperationMethod<
  GetOciOnboardingStatusInput,
  GetOciOnboardingStatusOutput,
  GetOciOnboardingStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<GetOciOnboardingStatusInput>,
  output: __S(998, __c62, 6) as any as S.Schema<GetOciOnboardingStatusOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOciOnboardingStatus",
}));

export type GetOdbNetworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified ODB network.
 */
export const getOdbNetwork: API.OperationMethod<
  GetOdbNetworkInput,
  GetOdbNetworkOutput,
  GetOdbNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<GetOdbNetworkInput>,
  output: __S(1009, __c63, 1) as any as S.Schema<GetOdbNetworkOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOdbNetwork",
}));

export type GetOdbPeeringConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an ODB peering connection.
 */
export const getOdbPeeringConnection: API.OperationMethod<
  GetOdbPeeringConnectionInput,
  GetOdbPeeringConnectionOutput,
  GetOdbPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<GetOdbPeeringConnectionInput>,
  output: __S(1041, __c65, 1) as any as S.Schema<GetOdbPeeringConnectionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOdbPeeringConnection",
}));

export type InitializeServiceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initializes the ODB service for the first time in an account.
 */
export const initializeService: API.OperationMethod<
  InitializeServiceInput,
  InitializeServiceOutput,
  InitializeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<InitializeServiceInput>,
  output: __S(1504, __c94, 0) as any as S.Schema<InitializeServiceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeService",
}));

export type ListAutonomousDatabaseBackupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the backups of the specified Autonomous Database.
 */
export const listAutonomousDatabaseBackups: API.PaginatedOperationMethod<
  ListAutonomousDatabaseBackupsInput,
  ListAutonomousDatabaseBackupsOutput,
  ListAutonomousDatabaseBackupsError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseBackupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<ListAutonomousDatabaseBackupsInput>,
  output: __S(1090, __c68, 2) as any as S.Schema<ListAutonomousDatabaseBackupsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabaseBackups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabaseBackups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabaseCharacterSetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available character sets for Autonomous Databases.
 */
export const listAutonomousDatabaseCharacterSets: API.PaginatedOperationMethod<
  ListAutonomousDatabaseCharacterSetsInput,
  ListAutonomousDatabaseCharacterSetsOutput,
  ListAutonomousDatabaseCharacterSetsError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseCharacterSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<ListAutonomousDatabaseCharacterSetsInput>,
  output: __S(1107, __c69, 3) as any as S.Schema<ListAutonomousDatabaseCharacterSetsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabaseCharacterSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabaseCharacterSets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabaseClonesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the clones of the specified Autonomous Database.
 */
export const listAutonomousDatabaseClones: API.PaginatedOperationMethod<
  ListAutonomousDatabaseClonesInput,
  ListAutonomousDatabaseClonesOutput,
  ListAutonomousDatabaseClonesError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<ListAutonomousDatabaseClonesInput>,
  output: __S(1121, __c70, 1) as any as S.Schema<ListAutonomousDatabaseClonesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabaseClones",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabaseClones",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabasePeersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the peer databases of the specified Autonomous Database.
 */
export const listAutonomousDatabasePeers: API.PaginatedOperationMethod<
  ListAutonomousDatabasePeersInput,
  ListAutonomousDatabasePeersOutput,
  ListAutonomousDatabasePeersError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabasePeerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<ListAutonomousDatabasePeersInput>,
  output: __S(1155, __c72, 3) as any as S.Schema<ListAutonomousDatabasePeersOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabasePeers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabasePeers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabasesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Autonomous Databases owned by your Amazon Web Services account in the current Amazon Web Services Region.
 */
export const listAutonomousDatabases: API.PaginatedOperationMethod<
  ListAutonomousDatabasesInput,
  ListAutonomousDatabasesOutput,
  ListAutonomousDatabasesError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<ListAutonomousDatabasesInput>,
  output: __S(1169, __c73, 1) as any as S.Schema<ListAutonomousDatabasesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabaseVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available Oracle Database software versions for Autonomous Databases.
 */
export const listAutonomousDatabaseVersions: API.PaginatedOperationMethod<
  ListAutonomousDatabaseVersionsInput,
  ListAutonomousDatabaseVersionsOutput,
  ListAutonomousDatabaseVersionsError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<ListAutonomousDatabaseVersionsInput>,
  output: __S(1187, __c74, 3) as any as S.Schema<ListAutonomousDatabaseVersionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabaseVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabaseVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousVirtualMachinesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Autonomous VMs in an Autonomous VM cluster.
 */
export const listAutonomousVirtualMachines: API.PaginatedOperationMethod<
  ListAutonomousVirtualMachinesInput,
  ListAutonomousVirtualMachinesOutput,
  ListAutonomousVirtualMachinesError,
  Credentials | HttpClient.HttpClient,
  AutonomousVirtualMachineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<ListAutonomousVirtualMachinesInput>,
  output: __S(1203, __c75, 3) as any as S.Schema<ListAutonomousVirtualMachinesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousVirtualMachines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousVirtualMachines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCloudAutonomousVmClustersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Autonomous VM clusters in a specified Cloud Exadata infrastructure.
 */
export const listCloudAutonomousVmClusters: API.PaginatedOperationMethod<
  ListCloudAutonomousVmClustersInput,
  ListCloudAutonomousVmClustersOutput,
  ListCloudAutonomousVmClustersError,
  Credentials | HttpClient.HttpClient,
  CloudAutonomousVmClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<ListCloudAutonomousVmClustersInput>,
  output: __S(1218, __c76, 2) as any as S.Schema<ListCloudAutonomousVmClustersOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudAutonomousVmClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cloudAutonomousVmClusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCloudExadataInfrastructuresError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Exadata infrastructures owned by your Amazon Web Services account.
 */
export const listCloudExadataInfrastructures: API.PaginatedOperationMethod<
  ListCloudExadataInfrastructuresInput,
  ListCloudExadataInfrastructuresOutput,
  ListCloudExadataInfrastructuresError,
  Credentials | HttpClient.HttpClient,
  CloudExadataInfrastructureSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<ListCloudExadataInfrastructuresInput>,
  output: __S(1234, __c77, 2) as any as S.Schema<ListCloudExadataInfrastructuresOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudExadataInfrastructures",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cloudExadataInfrastructures",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCloudVmClustersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the VM clusters owned by your Amazon Web Services account or only the ones on the specified Exadata infrastructure.
 */
export const listCloudVmClusters: API.PaginatedOperationMethod<
  ListCloudVmClustersInput,
  ListCloudVmClustersOutput,
  ListCloudVmClustersError,
  Credentials | HttpClient.HttpClient,
  CloudVmClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<ListCloudVmClustersInput>,
  output: __S(1250, __c78, 2) as any as S.Schema<ListCloudVmClustersOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudVmClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cloudVmClusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbNodesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the DB nodes for the specified VM cluster.
 */
export const listDbNodes: API.PaginatedOperationMethod<
  ListDbNodesInput,
  ListDbNodesOutput,
  ListDbNodesError,
  Credentials | HttpClient.HttpClient,
  DbNodeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<ListDbNodesInput>,
  output: __S(1267, __c79, 3) as any as S.Schema<ListDbNodesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dbNodes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbServersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the database servers that belong to the specified Exadata infrastructure.
 */
export const listDbServers: API.PaginatedOperationMethod<
  ListDbServersInput,
  ListDbServersOutput,
  ListDbServersError,
  Credentials | HttpClient.HttpClient,
  DbServerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<ListDbServersInput>,
  output: __S(1282, __c80, 2) as any as S.Schema<ListDbServersOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dbServers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbSystemShapesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the shapes that are available for an Exadata infrastructure.
 */
export const listDbSystemShapes: API.PaginatedOperationMethod<
  ListDbSystemShapesInput,
  ListDbSystemShapesOutput,
  ListDbSystemShapesError,
  Credentials | HttpClient.HttpClient,
  DbSystemShapeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<ListDbSystemShapesInput>,
  output: __S(1299, __c81, 3) as any as S.Schema<ListDbSystemShapesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbSystemShapes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dbSystemShapes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExadbVmClustersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Exascale VM clusters owned by your Amazon Web Services account.
 */
export const listExadbVmClusters: API.PaginatedOperationMethod<
  ListExadbVmClustersInput,
  ListExadbVmClustersOutput,
  ListExadbVmClustersError,
  Credentials | HttpClient.HttpClient,
  ExadbVmClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<ListExadbVmClustersInput>,
  output: __S(1330, __c83, 2) as any as S.Schema<ListExadbVmClustersOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExadbVmClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exadbVmClusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExascaleDbStorageVaultsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Exascale storage vaults owned by your Amazon Web Services account.
 */
export const listExascaleDbStorageVaults: API.PaginatedOperationMethod<
  ListExascaleDbStorageVaultsInput,
  ListExascaleDbStorageVaultsOutput,
  ListExascaleDbStorageVaultsError,
  Credentials | HttpClient.HttpClient,
  ExascaleDbStorageVaultSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<ListExascaleDbStorageVaultsInput>,
  output: __S(1346, __c84, 2) as any as S.Schema<ListExascaleDbStorageVaultsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExascaleDbStorageVaults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exascaleDbStorageVaults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFlexComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the flex components that are available for an Exadata infrastructure.
 */
export const listFlexComponents: API.PaginatedOperationMethod<
  ListFlexComponentsInput,
  ListFlexComponentsOutput,
  ListFlexComponentsError,
  Credentials | HttpClient.HttpClient,
  FlexComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<ListFlexComponentsInput>,
  output: __S(1363, __c85, 3) as any as S.Schema<ListFlexComponentsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlexComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flexComponents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGiMinorVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the Oracle Grid Infrastructure (GI) minor versions for the specified major version.
 */
export const listGiMinorVersions: API.PaginatedOperationMethod<
  ListGiMinorVersionsInput,
  ListGiMinorVersionsOutput,
  ListGiMinorVersionsError,
  Credentials | HttpClient.HttpClient,
  GiMinorVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<ListGiMinorVersionsInput>,
  output: __S(1379, __c86, 3) as any as S.Schema<ListGiMinorVersionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGiMinorVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "giMinorVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGiVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about Oracle Grid Infrastructure (GI) software versions that are available for a VM cluster for the specified shape.
 */
export const listGiVersions: API.PaginatedOperationMethod<
  ListGiVersionsInput,
  ListGiVersionsOutput,
  ListGiVersionsError,
  Credentials | HttpClient.HttpClient,
  GiVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<ListGiVersionsInput>,
  output: __S(1395, __c87, 3) as any as S.Schema<ListGiVersionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGiVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "giVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOdbNetworksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the ODB networks owned by your Amazon Web Services account.
 */
export const listOdbNetworks: API.PaginatedOperationMethod<
  ListOdbNetworksInput,
  ListOdbNetworksOutput,
  ListOdbNetworksError,
  Credentials | HttpClient.HttpClient,
  OdbNetworkSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<ListOdbNetworksInput>,
  output: __S(1410, __c88, 2) as any as S.Schema<ListOdbNetworksOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOdbNetworks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "odbNetworks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOdbPeeringConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all ODB peering connections or those associated with a specific ODB network.
 */
export const listOdbPeeringConnections: API.PaginatedOperationMethod<
  ListOdbPeeringConnectionsInput,
  ListOdbPeeringConnectionsOutput,
  ListOdbPeeringConnectionsError,
  Credentials | HttpClient.HttpClient,
  OdbPeeringConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<ListOdbPeeringConnectionsInput>,
  output: __S(1426, __c89, 2) as any as S.Schema<ListOdbPeeringConnectionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOdbPeeringConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "odbPeeringConnections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSystemVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the system versions that are available for a VM cluster for the specified `giVersion` and `shape`.
 */
export const listSystemVersions: API.PaginatedOperationMethod<
  ListSystemVersionsInput,
  ListSystemVersionsOutput,
  ListSystemVersionsError,
  Credentials | HttpClient.HttpClient,
  SystemVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<ListSystemVersionsInput>,
  output: __S(1443, __c90, 3) as any as S.Schema<ListSystemVersionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSystemVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "systemVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Returns information about the tags applied to this resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1457, __c91, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RebootAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reboots the specified Autonomous Database.
 */
export const rebootAutonomousDatabase: API.OperationMethod<
  RebootAutonomousDatabaseInput,
  RebootAutonomousDatabaseOutput,
  RebootAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<RebootAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<RebootAutonomousDatabaseOutput>,
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
  operationName: "RebootAutonomousDatabase",
}));

export type RebootDbNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reboots the specified DB node in a VM cluster.
 */
export const rebootDbNode: API.OperationMethod<
  RebootDbNodeInput,
  RebootDbNodeOutput,
  RebootDbNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<RebootDbNodeInput>,
  output: __S(1536, __c96, 0) as any as S.Schema<RebootDbNodeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDbNode",
}));

export type RestoreAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores the specified Autonomous Database to a point in time.
 */
export const restoreAutonomousDatabase: API.OperationMethod<
  RestoreAutonomousDatabaseInput,
  RestoreAutonomousDatabaseOutput,
  RestoreAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<RestoreAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<RestoreAutonomousDatabaseOutput>,
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
  operationName: "RestoreAutonomousDatabase",
}));

export type ShrinkAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Shrinks the storage of the specified Autonomous Database to reclaim unused space.
 */
export const shrinkAutonomousDatabase: API.OperationMethod<
  ShrinkAutonomousDatabaseInput,
  ShrinkAutonomousDatabaseOutput,
  ShrinkAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<ShrinkAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<ShrinkAutonomousDatabaseOutput>,
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
  operationName: "ShrinkAutonomousDatabase",
}));

export type StartAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specified Autonomous Database.
 */
export const startAutonomousDatabase: API.OperationMethod<
  StartAutonomousDatabaseInput,
  StartAutonomousDatabaseOutput,
  StartAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<StartAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<StartAutonomousDatabaseOutput>,
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
  operationName: "StartAutonomousDatabase",
}));

export type StartDbNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specified DB node in a VM cluster.
 */
export const startDbNode: API.OperationMethod<
  StartDbNodeInput,
  StartDbNodeOutput,
  StartDbNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<StartDbNodeInput>,
  output: __S(1536, __c96, 0) as any as S.Schema<StartDbNodeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDbNode",
}));

export type StopAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified Autonomous Database.
 */
export const stopAutonomousDatabase: API.OperationMethod<
  StopAutonomousDatabaseInput,
  StopAutonomousDatabaseOutput,
  StopAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<StopAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<StopAutonomousDatabaseOutput>,
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
  operationName: "StopAutonomousDatabase",
}));

export type StopDbNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified DB node in a VM cluster.
 */
export const stopDbNode: API.OperationMethod<
  StopDbNodeInput,
  StopDbNodeOutput,
  StopDbNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<StopDbNodeInput>,
  output: __S(1536, __c96, 0) as any as S.Schema<StopDbNodeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDbNode",
}));

export type SwitchoverAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Performs a switchover of the specified Autonomous Database to a standby peer database.
 */
export const switchoverAutonomousDatabase: API.OperationMethod<
  SwitchoverAutonomousDatabaseInput,
  SwitchoverAutonomousDatabaseOutput,
  SwitchoverAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<SwitchoverAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<SwitchoverAutonomousDatabaseOutput>,
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
  operationName: "SwitchoverAutonomousDatabase",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Applies tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c104, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1504, __c94, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1504, __c94, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an Autonomous Database.
 */
export const updateAutonomousDatabase: API.OperationMethod<
  UpdateAutonomousDatabaseInput,
  UpdateAutonomousDatabaseOutput,
  UpdateAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1712, __c107, 0) as any as S.Schema<UpdateAutonomousDatabaseInput>,
  output: __S(112, __c7, 0) as any as S.Schema<UpdateAutonomousDatabaseOutput>,
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
  operationName: "UpdateAutonomousDatabase",
}));

export type UpdateAutonomousDatabaseBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an Autonomous Database backup.
 */
export const updateAutonomousDatabaseBackup: API.OperationMethod<
  UpdateAutonomousDatabaseBackupInput,
  UpdateAutonomousDatabaseBackupOutput,
  UpdateAutonomousDatabaseBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<UpdateAutonomousDatabaseBackupInput>,
  output: __S(176, __c11, 0) as any as S.Schema<UpdateAutonomousDatabaseBackupOutput>,
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
  operationName: "UpdateAutonomousDatabaseBackup",
}));

export type UpdateCloudExadataInfrastructureError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an Exadata infrastructure resource.
 */
export const updateCloudExadataInfrastructure: API.OperationMethod<
  UpdateCloudExadataInfrastructureInput,
  UpdateCloudExadataInfrastructureOutput,
  UpdateCloudExadataInfrastructureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<UpdateCloudExadataInfrastructureInput>,
  output: __S(256, __c16, 0) as any as S.Schema<UpdateCloudExadataInfrastructureOutput>,
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
  operationName: "UpdateCloudExadataInfrastructure",
}));

export type UpdateExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified Exascale VM cluster.
 */
export const updateExadbVmCluster: API.OperationMethod<
  UpdateExadbVmClusterInput,
  UpdateExadbVmClusterOutput,
  UpdateExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<UpdateExadbVmClusterInput>,
  output: __S(1840, __c115, 0) as any as S.Schema<UpdateExadbVmClusterOutput>,
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
  operationName: "UpdateExadbVmCluster",
}));

export type UpdateExascaleDbStorageVaultError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified Exascale storage vault.
 */
export const updateExascaleDbStorageVault: API.OperationMethod<
  UpdateExascaleDbStorageVaultInput,
  UpdateExascaleDbStorageVaultOutput,
  UpdateExascaleDbStorageVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<UpdateExascaleDbStorageVaultInput>,
  output: __S(336, __c21, 0) as any as S.Schema<UpdateExascaleDbStorageVaultOutput>,
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
  operationName: "UpdateExascaleDbStorageVault",
}));

export type UpdateOdbNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates properties of a specified ODB network.
 */
export const updateOdbNetwork: API.OperationMethod<
  UpdateOdbNetworkInput,
  UpdateOdbNetworkOutput,
  UpdateOdbNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<UpdateOdbNetworkInput>,
  output: __S(368, __c23, 0) as any as S.Schema<UpdateOdbNetworkOutput>,
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
  operationName: "UpdateOdbNetwork",
}));

export type UpdateOdbPeeringConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the settings of an Oracle Database@Amazon Web Services peering connection. You can update the display name and add or remove CIDR blocks from the peering connection.
 */
export const updateOdbPeeringConnection: API.OperationMethod<
  UpdateOdbPeeringConnectionInput,
  UpdateOdbPeeringConnectionOutput,
  UpdateOdbPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<UpdateOdbPeeringConnectionInput>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateOdbPeeringConnectionOutput>,
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
  operationName: "UpdateOdbPeeringConnection",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ttsBundleUrl: S.optional(S.String) })).annotate({
        identifier: "TransportableTablespace",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ sourceAutonomousDatabaseId: S.String, cloneType: S.String }),
      ).annotate({ identifier: "DatabaseCloneConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseBackupId: S.String,
          cloneType: S.String,
          cloneTableSpaceList: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "RestoreFromBackupConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          sourceAutonomousDatabaseId: S.String,
          cloneType: S.String,
          timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          useLatestAvailableBackupTimestamp: S.optional(S.Boolean),
          cloneTableSpaceList: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "PointInTimeRestoreConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ sourceAutonomousDatabaseArn: S.String })).annotate({
        identifier: "CrossRegionDataGuardConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          sourceAutonomousDatabaseArn: S.String,
          remoteDisasterRecoveryType: S.String,
          isReplicateAutomaticBackups: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CrossRegionDisasterRecoveryConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          sourceAutonomousDatabaseId: S.String,
          refreshableMode: S.optional(S.String),
          autoRefreshFrequencyInSeconds: S.optional(S.Number),
          autoRefreshPointLagInSeconds: S.optional(S.Number),
          timeOfAutoRefreshStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          openMode: S.optional(S.String),
          cloneType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloneToRefreshableConfiguration" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ databaseClone: __S(1, __c0, 1) }),
        /*@__PURE__*/ S.Struct({ restoreFromBackup: __S(2, __c0, 2) }),
        /*@__PURE__*/ S.Struct({ pointInTimeRestore: __S(3, __c0, 3) }),
        /*@__PURE__*/ S.Struct({ crossRegionDataGuard: __S(4, __c0, 4) }),
        /*@__PURE__*/ S.Struct({ crossRegionDisasterRecovery: __S(5, __c0, 5) }),
        /*@__PURE__*/ S.Struct({ cloneToRefreshable: __S(6, __c0, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          odbNetworkId: S.optional(S.String),
          displayName: S.optional(S.String),
          dbName: S.optional(S.String),
          adminPassword: S.optional(SensitiveString),
          computeCount: S.optional(S.Number),
          dataStorageSizeInTBs: S.optional(S.Number),
          dataStorageSizeInGBs: S.optional(S.Number),
          dbWorkload: S.optional(S.String),
          isAutoScalingEnabled: S.optional(S.Boolean),
          isAutoScalingForStorageEnabled: S.optional(S.Boolean),
          licenseModel: S.optional(S.String),
          characterSet: S.optional(S.String),
          ncharacterSet: S.optional(S.String),
          dbVersion: S.optional(S.String),
          databaseEdition: S.optional(S.String),
          standbyAllowlistedIpsSource: S.optional(S.String),
          autonomousMaintenanceScheduleType: S.optional(S.String),
          backupRetentionPeriodInDays: S.optional(S.Number),
          byolComputeCountLimit: S.optional(S.Number),
          cpuCoreCount: S.optional(S.Number),
          customerContactsToSendToOCI: S.optional(__S(97, __c6, 1)),
          privateEndpointIp: S.optional(S.String),
          privateEndpointLabel: S.optional(S.String),
          resourcePoolLeaderId: S.optional(S.String),
          resourcePoolSummary: S.optional(__S(128, __c8, 0)),
          scheduledOperations: S.optional(__S(130, __c8, 2)),
          standbyAllowlistedIps: S.optional(__S(80, __c5, 0)),
          allowlistedIps: S.optional(__S(80, __c5, 0)),
          transportableTablespace: S.optional(__S(0, __c0, 0)),
          isBackupRetentionLocked: S.optional(S.Boolean),
          isLocalDataGuardEnabled: S.optional(S.Boolean),
          isMtlsConnectionRequired: S.optional(S.Boolean),
          dbToolsDetails: S.optional(__S(132, __c8, 4)),
          source: S.optional(S.String),
          sourceConfiguration: S.optional(__S(7, __c0, 7)),
          encryptionKeyProvider: S.optional(S.String),
          encryptionKeyConfiguration: S.optional(__S(144, __c9, 0)),
          adminPasswordSource: S.optional(S.String),
          adminPasswordSourceConfiguration: S.optional(__S(33, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAutonomousDatabaseInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          secretId: S.optional(S.String),
          iamRoleArn: S.optional(S.String),
          externalIdType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomerManagedAwsSecretConfigurationInput" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ customerManagedAwsSecret: __S(32, __c2, 0) })]);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "DayOfWeek",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ email: S.optional(SensitiveString) })).annotate({
        identifier: "CustomerContact",
      });
    case 1:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseId: S.String,
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAutonomousDatabaseOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          isDisabled: S.optional(S.Boolean),
          poolSize: S.optional(S.Number),
          poolStorageSizeInTBs: S.optional(S.Number),
          availableStorageCapacityInTBs: S.optional(S.Number),
          totalComputeCapacity: S.optional(S.Number),
          availableComputeCapacity: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResourcePoolSummary" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dayOfWeek: __S(48, __c3, 0),
          scheduledStartTime: S.optional(S.String),
          scheduledStopTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledOperationDetails" });
    case 2:
      return S.Array(__S(129, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          isEnabled: S.optional(S.Boolean),
          name: S.optional(S.String),
          computeCount: S.optional(S.Number),
          maxIdleTimeInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DatabaseTool" });
    case 4:
      return S.Array(__S(131, __c8, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          iamRoleArn: S.optional(S.String),
          externalIdType: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEncryptionKeyConfigurationInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ awsEncryptionKey: __S(133, __c8, 5) })]);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseId: S.String,
          displayName: S.optional(S.String),
          retentionPeriodInDays: S.optional(S.Number),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAutonomousDatabaseBackupInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          autonomousDatabaseBackupId: S.String,
        }),
      ).annotate({ identifier: "CreateAutonomousDatabaseBackupOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseId: S.String,
          walletType: S.optional(S.String),
          password: S.optional(SensitiveString),
          passwordSource: S.optional(S.String),
          passwordSourceConfiguration: S.optional(__S(33, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAutonomousDatabaseWalletInput" });
    case 1:
      return S.suspend(() => S.Struct({ autonomousDatabaseWalletFile: SensitiveBlob })).annotate({
        identifier: "CreateAutonomousDatabaseWalletOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String,
          odbNetworkId: S.String,
          displayName: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          autonomousDataStorageSizeInTBs: S.Number,
          cpuCoreCountPerNode: S.Number,
          dbServers: S.optional(__S(80, __c5, 0)),
          description: S.optional(S.String),
          isMtlsEnabledVmCluster: S.optional(S.Boolean),
          licenseModel: S.optional(S.String),
          maintenanceWindow: S.optional(__S(225, __c14, 1)),
          memoryPerOracleComputeUnitInGBs: S.Number,
          scanListenerPortNonTls: S.optional(S.Number),
          scanListenerPortTls: S.optional(S.Number),
          tags: S.optional(__S(16, __c1, 0)),
          timeZone: S.optional(S.String),
          totalContainerDatabases: S.Number,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCloudAutonomousVmClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          cloudAutonomousVmClusterId: S.String,
        }),
      ).annotate({ identifier: "CreateCloudAutonomousVmClusterOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(48, __c3, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          customActionTimeoutInMins: S.optional(S.Number),
          daysOfWeek: S.optional(__S(224, __c14, 0)),
          hoursOfDay: S.optional(__S(64, __c4, 0)),
          isCustomActionTimeoutEnabled: S.optional(S.Boolean),
          leadTimeInWeeks: S.optional(S.Number),
          months: S.optional(__S(224, __c14, 0)),
          patchingMode: S.optional(S.String),
          preference: S.optional(S.String),
          skipRu: S.optional(S.Boolean),
          weeksOfMonth: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "MaintenanceWindow" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.String,
          shape: S.String,
          availabilityZone: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          tags: S.optional(__S(16, __c1, 0)),
          computeCount: S.Number,
          customerContactsToSendToOCI: S.optional(__S(97, __c6, 1)),
          maintenanceWindow: S.optional(__S(225, __c14, 1)),
          storageCount: S.Number,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          databaseServerType: S.optional(S.String),
          storageServerType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCloudExadataInfrastructureInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          cloudExadataInfrastructureId: S.String,
        }),
      ).annotate({ identifier: "CreateCloudExadataInfrastructureOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String,
          cpuCoreCount: S.Number,
          displayName: S.String,
          giVersion: S.String,
          hostname: S.String,
          sshPublicKeys: __S(80, __c5, 0),
          odbNetworkId: S.String,
          clusterName: S.optional(S.String),
          dataCollectionOptions: S.optional(__S(288, __c18, 0)),
          dataStorageSizeInTBs: S.optional(S.Number),
          dbNodeStorageSizeInGBs: S.optional(S.Number),
          dbServers: S.optional(__S(80, __c5, 0)),
          tags: S.optional(__S(16, __c1, 0)),
          isLocalBackupEnabled: S.optional(S.Boolean),
          isSparseDiskgroupEnabled: S.optional(S.Boolean),
          licenseModel: S.optional(S.String),
          memorySizeInGBs: S.optional(S.Number),
          systemVersion: S.optional(S.String),
          timeZone: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          scanListenerPortTcp: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCloudVmClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          cloudVmClusterId: S.String,
        }),
      ).annotate({ identifier: "CreateCloudVmClusterOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          isDiagnosticsEventsEnabled: S.optional(S.Boolean),
          isHealthMonitoringEnabled: S.optional(S.Boolean),
          isIncidentLogsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DataCollectionOptions" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.String,
          enabledEcpuCount: S.Number,
          exascaleDbStorageVaultId: S.String,
          gridImageId: S.String,
          hostname: S.String,
          nodeCount: S.Number,
          odbNetworkId: S.String,
          shape: S.String,
          sshPublicKeys: __S(80, __c5, 0),
          totalEcpuCount: S.Number,
          vmFileSystemStorageTotalSizeInGBs: S.Number,
          clusterName: S.optional(S.String),
          dataCollectionOptions: S.optional(__S(288, __c18, 0)),
          licenseModel: S.optional(S.String),
          scanListenerPortTcp: S.optional(S.Number),
          scanListenerPortTcpSsl: S.optional(S.Number),
          shapeAttribute: S.optional(S.String),
          systemVersion: S.optional(S.String),
          tags: S.optional(__S(16, __c1, 0)),
          timeZone: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateExadbVmClusterInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.String,
          highCapacityDatabaseStorageTotalSizeInGBs: S.Number,
          additionalFlashCacheInPercent: S.optional(S.Number),
          autoscaleLimitInGBs: S.optional(S.Number),
          availabilityZoneId: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          description: S.optional(S.String),
          isAutoscaleEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(16, __c1, 0)),
          timeZone: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateExascaleDbStorageVaultInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          exascaleDbStorageVaultId: S.String,
        }),
      ).annotate({ identifier: "CreateExascaleDbStorageVaultOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.String,
          availabilityZone: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          clientSubnetCidr: S.String,
          backupSubnetCidr: S.optional(S.String),
          customDomainName: S.optional(S.String),
          defaultDnsPrefix: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          s3Access: S.optional(S.String),
          zeroEtlAccess: S.optional(S.String),
          stsAccess: S.optional(S.String),
          kmsAccess: S.optional(S.String),
          s3PolicyDocument: S.optional(S.String),
          stsPolicyDocument: S.optional(S.String),
          kmsPolicyDocument: S.optional(S.String),
          crossRegionS3RestoreSourcesToEnable: S.optional(__S(80, __c5, 0)),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOdbNetworkInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          odbNetworkId: S.String,
        }),
      ).annotate({ identifier: "CreateOdbNetworkOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          odbNetworkId: S.String,
          peerNetworkId: S.String,
          displayName: S.optional(S.String),
          peerNetworkCidrsToBeAdded: S.optional(__S(80, __c5, 0)),
          peerNetworkRouteTableIds: S.optional(__S(80, __c5, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOdbPeeringConnectionInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          odbPeeringConnectionId: S.String,
        }),
      ).annotate({ identifier: "CreateOdbPeeringConnectionOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAutonomousDatabaseInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseBackupId: S.String.pipe(T.HttpLabel("autonomousDatabaseBackupId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAutonomousDatabaseBackupInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudAutonomousVmClusterId: S.String.pipe(T.HttpLabel("cloudAutonomousVmClusterId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteCloudAutonomousVmClusterInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String.pipe(T.HttpLabel("cloudExadataInfrastructureId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteCloudExadataInfrastructureInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cloudVmClusterId: S.String.pipe(T.HttpLabel("cloudVmClusterId")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCloudVmClusterInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exadbVmClusterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteExadbVmClusterInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exascaleDbStorageVaultId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteExascaleDbStorageVaultInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          odbNetworkId: S.String.pipe(T.HttpLabel("odbNetworkId")),
          deleteAssociatedResources: S.Boolean,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteOdbNetworkInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          odbPeeringConnectionId: S.String.pipe(T.HttpLabel("odbPeeringConnectionId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteOdbPeeringConnectionInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ iamRoleArn: S.String, awsIntegration: S.String, resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateIamRoleFromResourceInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exadbVmClusterId: S.String, dbNodeIds: __S(80, __c5, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateVirtualMachinesFromExadbVmClusterInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String, peerDbArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "FailoverAutonomousDatabaseInput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAutonomousDatabaseInput" });
    case 1:
      return S.suspend(() => S.Struct({ autonomousDatabase: __S(652, __c40, 12) })).annotate({
        identifier: "GetAutonomousDatabaseOutput",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          iamRoleArn: S.optional(S.String),
          secretId: S.optional(S.String),
          externalIdType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomerManagedAwsSecretConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ customerManagedAwsSecret: __S(624, __c39, 0) })]);
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          consumerGroup: S.optional(S.String),
          displayName: S.optional(S.String),
          hostFormat: S.optional(S.String),
          isRegional: S.optional(S.Boolean),
          protocol: S.optional(S.String),
          sessionMode: S.optional(S.String),
          syntaxFormat: S.optional(S.String),
          tlsAuthentication: S.optional(S.String),
          value: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatabaseConnectionStringProfile" });
    case 1:
      return S.Array(__S(640, __c40, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          allConnectionStrings: S.optional(__S(16, __c1, 0)),
          dedicated: S.optional(S.String),
          high: S.optional(S.String),
          medium: S.optional(S.String),
          low: S.optional(S.String),
          profiles: S.optional(__S(641, __c40, 1)),
        }),
      ).annotate({ identifier: "AutonomousDatabaseConnectionStrings" });
    case 3:
      return S.suspend(() =>
        S.Struct({ apexVersion: S.optional(S.String), ordsVersion: S.optional(S.String) }),
      ).annotate({ identifier: "AutonomousDatabaseApex" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          availabilityDomain: S.optional(S.String),
          lagTimeInSeconds: S.optional(S.Number),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          maintenanceTargetComponent: S.optional(S.String),
          timeDataGuardRoleChanged: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeDisasterRecoveryRoleChanged: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeMaintenanceBegin: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeMaintenanceEnd: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DatabaseStandbySummary" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          apexUrl: S.optional(S.String),
          databaseTransformsUrl: S.optional(S.String),
          graphStudioUrl: S.optional(S.String),
          machineLearningNotebookUrl: S.optional(S.String),
          machineLearningUserManagementUrl: S.optional(S.String),
          mongoDbUrl: S.optional(S.String),
          ordsUrl: S.optional(S.String),
          spatialStudioUrl: S.optional(S.String),
          sqlDevWebUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutonomousDatabaseConnectionUrls" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          disasterRecoveryType: S.optional(S.String),
          isReplicateAutomaticBackups: S.optional(S.Boolean),
          isSnapshotStandby: S.optional(S.Boolean),
          timeSnapshotStandbyEnabledTill: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "DisasterRecoveryConfiguration" });
    case 7:
      return S.suspend(() => S.Struct({ kmsKeyId: S.String, vaultId: S.String })).annotate({
        identifier: "OciEncryptionKeyConfiguration",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          certificateDirectoryName: S.String,
          certificateId: S.optional(S.String),
          directoryName: S.String,
          okvKmsKey: S.String,
          okvUri: S.String,
        }),
      ).annotate({ identifier: "OkvEncryptionKeyConfiguration" });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ awsEncryptionKey: __S(133, __c8, 5) }),
        /*@__PURE__*/ S.Struct({ ociEncryptionKey: __S(647, __c40, 7) }),
        /*@__PURE__*/ S.Struct({ okvEncryptionKey: __S(648, __c40, 8) }),
      ]);
    case 10:
      return S.suspend(() =>
        S.Struct({
          encryptionKeyProvider: S.optional(S.String),
          encryptionKeyConfiguration: S.optional(__S(649, __c40, 9)),
        }),
      ).annotate({ identifier: "EncryptionSummary" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          adminPasswordSource: S.optional(S.String),
          adminPasswordSourceConfiguration: S.optional(__S(625, __c39, 1)),
        }),
      ).annotate({ identifier: "AdminPasswordSourceSummary" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseId: S.optional(S.String),
          autonomousDatabaseArn: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          percentProgress: S.optional(S.Number),
          ocid: S.optional(S.String),
          ociUrl: S.optional(S.String),
          displayName: S.optional(S.String),
          dbName: S.optional(S.String),
          sourceId: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          databaseType: S.optional(S.String),
          dbVersion: S.optional(S.String),
          dbWorkload: S.optional(S.String),
          characterSet: S.optional(S.String),
          ncharacterSet: S.optional(S.String),
          databaseEdition: S.optional(S.String),
          licenseModel: S.optional(S.String),
          openMode: S.optional(S.String),
          permissionLevel: S.optional(S.String),
          isMtlsConnectionRequired: S.optional(S.Boolean),
          autonomousMaintenanceScheduleType: S.optional(S.String),
          netServicesArchitecture: S.optional(S.String),
          availableUpgradeVersions: S.optional(__S(80, __c5, 0)),
          byolComputeCountLimit: S.optional(S.Number),
          connectionStringDetails: S.optional(__S(642, __c40, 2)),
          serviceConsoleUrl: S.optional(S.String),
          sqlWebDeveloperUrl: S.optional(S.String),
          customerContacts: S.optional(__S(97, __c6, 1)),
          apexDetails: S.optional(__S(643, __c40, 3)),
          standbyDb: S.optional(__S(644, __c40, 4)),
          localStandbyDb: S.optional(__S(644, __c40, 4)),
          dataSafeStatus: S.optional(S.String),
          databaseManagementStatus: S.optional(S.String),
          operationsInsightsStatus: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          maintenanceTargetComponent: S.optional(S.String),
          connectionUrls: S.optional(__S(645, __c40, 5)),
          dbToolsDetails: S.optional(__S(132, __c8, 4)),
          scheduledOperations: S.optional(__S(130, __c8, 2)),
          resourcePoolLeaderId: S.optional(S.String),
          computeCount: S.optional(S.Number),
          computeModel: S.optional(S.String),
          cpuCoreCount: S.optional(S.Number),
          memoryPerOracleComputeUnitInGBs: S.optional(S.Number),
          provisionableCpus: S.optional(__S(64, __c4, 0)),
          isAutoScalingEnabled: S.optional(S.Boolean),
          dataStorageSizeInTBs: S.optional(S.Number),
          dataStorageSizeInGBs: S.optional(S.Number),
          usedDataStorageSizeInTBs: S.optional(S.Number),
          usedDataStorageSizeInGBs: S.optional(S.Number),
          actualUsedDataStorageSizeInTBs: S.optional(S.Number),
          allocatedStorageSizeInTBs: S.optional(S.Number),
          inMemoryAreaInGBs: S.optional(S.Number),
          isAutoScalingForStorageEnabled: S.optional(S.Boolean),
          odbNetworkId: S.optional(S.String),
          odbNetworkArn: S.optional(S.String),
          privateEndpoint: S.optional(S.String),
          privateEndpointIp: S.optional(S.String),
          privateEndpointLabel: S.optional(S.String),
          allowlistedIps: S.optional(__S(80, __c5, 0)),
          standbyAllowlistedIps: S.optional(__S(80, __c5, 0)),
          standbyAllowlistedIpsSource: S.optional(S.String),
          isLocalDataGuardEnabled: S.optional(S.Boolean),
          isRemoteDataGuardEnabled: S.optional(S.Boolean),
          localDisasterRecoveryType: S.optional(S.String),
          role: S.optional(S.String),
          peerDbIds: S.optional(__S(80, __c5, 0)),
          failedDataRecoveryInSeconds: S.optional(S.Number),
          localAdgAutoFailoverMaxDataLossLimit: S.optional(S.Number),
          remoteDisasterRecoveryConfiguration: S.optional(__S(646, __c40, 6)),
          isRefreshableClone: S.optional(S.Boolean),
          refreshableMode: S.optional(S.String),
          refreshableStatus: S.optional(S.String),
          autoRefreshFrequencyInSeconds: S.optional(S.Number),
          autoRefreshPointLagInSeconds: S.optional(S.Number),
          isReconnectCloneEnabled: S.optional(S.Boolean),
          cloneTableSpaceList: S.optional(__S(64, __c4, 0)),
          backupRetentionPeriodInDays: S.optional(S.Number),
          longTermBackupSchedule: S.optional(__S(656, __c41, 0)),
          isBackupRetentionLocked: S.optional(S.Boolean),
          totalBackupStorageSizeInGBs: S.optional(S.Number),
          resourcePoolSummary: S.optional(__S(128, __c8, 0)),
          encryptionSummary: S.optional(__S(650, __c40, 10)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeOfLastBackup: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeMaintenanceBegin: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeMaintenanceEnd: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeLocalDataGuardEnabled: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeDataGuardRoleChanged: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeOfLastSwitchover: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeOfLastFailover: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeOfLastRefresh: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeOfLastRefreshPoint: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeOfNextRefresh: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeOfAutoRefreshStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeDeletionOfFreeAutonomousDatabase: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeReclamationOfFreeAutonomousDatabase: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeDisasterRecoveryRoleChanged: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeUntilReconnectCloneEnabled: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          nextLongTermBackupTimeStamp: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeUndeleted: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          adminPasswordSourceSummary: S.optional(__S(651, __c40, 11)),
        }),
      ).annotate({ identifier: "AutonomousDatabase" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          isDisabled: S.optional(S.Boolean),
          repeatCadence: S.optional(S.String),
          retentionPeriodInDays: S.optional(S.Number),
          timeOfBackup: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "LongTermBackupSchedule" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseBackupId: S.String.pipe(T.HttpLabel("autonomousDatabaseBackupId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAutonomousDatabaseBackupInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseBackup: S.optional(__S(688, __c43, 0)) }),
      ).annotate({ identifier: "GetAutonomousDatabaseBackupOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseBackupId: S.optional(S.String),
          autonomousDatabaseBackupArn: S.optional(S.String),
          autonomousDatabaseId: S.optional(S.String),
          ocid: S.optional(S.String),
          displayName: S.optional(S.String),
          dbVersion: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          isAutomatic: S.optional(S.Boolean),
          retentionPeriodInDays: S.optional(S.Number),
          sizeInTBs: S.optional(S.Number),
          timeAvailableTill: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeStarted: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeEnded: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutonomousDatabaseBackup" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAutonomousDatabaseWalletDetailsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          passwordSource: S.optional(S.String),
          passwordSourceConfiguration: S.optional(__S(625, __c39, 1)),
        }),
      ).annotate({ identifier: "WalletPasswordSourceSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          timeRotated: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          passwordSourceSummary: S.optional(__S(705, __c44, 1)),
        }),
      ).annotate({ identifier: "AutonomousDatabaseWalletDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseWalletDetails: __S(706, __c44, 2) }),
      ).annotate({ identifier: "GetAutonomousDatabaseWalletDetailsOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudAutonomousVmClusterId: S.String.pipe(T.HttpLabel("cloudAutonomousVmClusterId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCloudAutonomousVmClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ cloudAutonomousVmCluster: S.optional(__S(752, __c47, 0)) }),
      ).annotate({ identifier: "GetCloudAutonomousVmClusterOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          iamRoleArn: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          awsIntegration: S.optional(S.String),
        }),
      ).annotate({ identifier: "IamRole" });
    case 1:
      return S.Array(__S(736, __c46, 0));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudAutonomousVmClusterId: S.String,
          cloudAutonomousVmClusterArn: S.optional(S.String),
          odbNetworkId: S.optional(S.String),
          odbNetworkArn: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          percentProgress: S.optional(S.Number),
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          cloudExadataInfrastructureId: S.optional(S.String),
          cloudExadataInfrastructureArn: S.optional(S.String),
          autonomousDataStoragePercentage: S.optional(S.Number),
          autonomousDataStorageSizeInTBs: S.optional(S.Number),
          availableAutonomousDataStorageSizeInTBs: S.optional(S.Number),
          availableContainerDatabases: S.optional(S.Number),
          availableCpus: S.optional(S.Number),
          computeModel: S.optional(S.String),
          cpuCoreCount: S.optional(S.Number),
          cpuCoreCountPerNode: S.optional(S.Number),
          cpuPercentage: S.optional(S.Number),
          dataStorageSizeInGBs: S.optional(S.Number),
          dataStorageSizeInTBs: S.optional(S.Number),
          dbNodeStorageSizeInGBs: S.optional(S.Number),
          dbServers: S.optional(__S(80, __c5, 0)),
          description: S.optional(S.String),
          domain: S.optional(S.String),
          exadataStorageInTBsLowestScaledValue: S.optional(S.Number),
          hostname: S.optional(S.String),
          ocid: S.optional(S.String),
          ociUrl: S.optional(S.String),
          isMtlsEnabledVmCluster: S.optional(S.Boolean),
          licenseModel: S.optional(S.String),
          maintenanceWindow: S.optional(__S(225, __c14, 1)),
          maxAcdsLowestScaledValue: S.optional(S.Number),
          memoryPerOracleComputeUnitInGBs: S.optional(S.Number),
          memorySizeInGBs: S.optional(S.Number),
          nodeCount: S.optional(S.Number),
          nonProvisionableAutonomousContainerDatabases: S.optional(S.Number),
          provisionableAutonomousContainerDatabases: S.optional(S.Number),
          provisionedAutonomousContainerDatabases: S.optional(S.Number),
          provisionedCpus: S.optional(S.Number),
          reclaimableCpus: S.optional(S.Number),
          reservedCpus: S.optional(S.Number),
          scanListenerPortNonTls: S.optional(S.Number),
          scanListenerPortTls: S.optional(S.Number),
          shape: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeDatabaseSslCertificateExpires: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeOrdsCertificateExpires: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          timeZone: S.optional(S.String),
          totalContainerDatabases: S.optional(S.Number),
          iamRoles: S.optional(__S(737, __c46, 1)),
        }),
      ).annotate({ identifier: "CloudAutonomousVmCluster" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String.pipe(T.HttpLabel("cloudExadataInfrastructureId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCloudExadataInfrastructureInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ cloudExadataInfrastructure: S.optional(__S(784, __c49, 0)) }),
      ).annotate({ identifier: "GetCloudExadataInfrastructureOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String,
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          cloudExadataInfrastructureArn: S.optional(S.String),
          activatedStorageCount: S.optional(S.Number),
          additionalStorageCount: S.optional(S.Number),
          availableStorageSizeInGBs: S.optional(S.Number),
          availabilityZone: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          computeCount: S.optional(S.Number),
          cpuCount: S.optional(S.Number),
          customerContactsToSendToOCI: S.optional(__S(97, __c6, 1)),
          dataStorageSizeInTBs: S.optional(S.Number),
          dbNodeStorageSizeInGBs: S.optional(S.Number),
          dbServerVersion: S.optional(S.String),
          lastMaintenanceRunId: S.optional(S.String),
          maintenanceWindow: S.optional(__S(225, __c14, 1)),
          maxCpuCount: S.optional(S.Number),
          maxDataStorageInTBs: S.optional(S.Number),
          maxDbNodeStorageSizeInGBs: S.optional(S.Number),
          maxMemoryInGBs: S.optional(S.Number),
          memorySizeInGBs: S.optional(S.Number),
          monthlyDbServerVersion: S.optional(S.String),
          monthlyStorageServerVersion: S.optional(S.String),
          nextMaintenanceRunId: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          ociUrl: S.optional(S.String),
          ocid: S.optional(S.String),
          shape: S.optional(S.String),
          storageCount: S.optional(S.Number),
          storageServerVersion: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          totalStorageSizeInGBs: S.optional(S.Number),
          percentProgress: S.optional(S.Number),
          databaseServerType: S.optional(S.String),
          storageServerType: S.optional(S.String),
          computeModel: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudExadataInfrastructure" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String.pipe(T.HttpLabel("cloudExadataInfrastructureId")),
          dbServers: S.optional(__S(80, __c5, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCloudExadataInfrastructureUnallocatedResourcesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          cloudAutonomousVmClusterId: S.optional(S.String),
          unallocatedAdbStorageInTBs: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CloudAutonomousVmClusterResourceDetails" });
    case 2:
      return S.Array(__S(801, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          cloudAutonomousVmClusters: S.optional(__S(802, __c50, 2)),
          cloudExadataInfrastructureDisplayName: S.optional(S.String),
          exadataStorageInTBs: S.optional(S.Number),
          cloudExadataInfrastructureId: S.optional(S.String),
          localStorageInGBs: S.optional(S.Number),
          memoryInGBs: S.optional(S.Number),
          ocpus: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CloudExadataInfrastructureUnallocatedResources" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureUnallocatedResources: S.optional(__S(803, __c50, 3)),
        }),
      ).annotate({ identifier: "GetCloudExadataInfrastructureUnallocatedResourcesOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cloudVmClusterId: S.String.pipe(T.HttpLabel("cloudVmClusterId")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCloudVmClusterInput" });
    case 1:
      return S.suspend(() => S.Struct({ cloudVmCluster: S.optional(__S(849, __c53, 1)) })).annotate(
        { identifier: "GetCloudVmClusterOutput" },
      );
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dbName: S.optional(S.String),
          flashCacheLimit: S.optional(S.String),
          share: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DbIormConfig" });
    case 1:
      return S.Array(__S(832, __c52, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          dbPlans: S.optional(__S(833, __c52, 1)),
          lifecycleDetails: S.optional(S.String),
          lifecycleState: S.optional(S.String),
          objective: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExadataIormConfig" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({
          cloudVmClusterId: S.String,
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          cloudVmClusterArn: S.optional(S.String),
          cloudExadataInfrastructureId: S.optional(S.String),
          cloudExadataInfrastructureArn: S.optional(S.String),
          clusterName: S.optional(S.String),
          cpuCoreCount: S.optional(S.Number),
          dataCollectionOptions: S.optional(__S(288, __c18, 0)),
          dataStorageSizeInTBs: S.optional(S.Number),
          dbNodeStorageSizeInGBs: S.optional(S.Number),
          dbServers: S.optional(__S(80, __c5, 0)),
          diskRedundancy: S.optional(S.String),
          giVersion: S.optional(S.String),
          hostname: S.optional(S.String),
          iormConfigCache: S.optional(__S(834, __c52, 2)),
          isLocalBackupEnabled: S.optional(S.Boolean),
          isSparseDiskgroupEnabled: S.optional(S.Boolean),
          lastUpdateHistoryEntryId: S.optional(S.String),
          licenseModel: S.optional(S.String),
          listenerPort: S.optional(S.Number),
          memorySizeInGBs: S.optional(S.Number),
          nodeCount: S.optional(S.Number),
          ocid: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          ociUrl: S.optional(S.String),
          domain: S.optional(S.String),
          scanDnsName: S.optional(S.String),
          scanDnsRecordId: S.optional(S.String),
          scanIpIds: S.optional(__S(80, __c5, 0)),
          shape: S.optional(S.String),
          sshPublicKeys: S.optional(__S(848, __c53, 0)),
          storageSizeInGBs: S.optional(S.Number),
          systemVersion: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeZone: S.optional(S.String),
          vipIds: S.optional(__S(80, __c5, 0)),
          odbNetworkId: S.optional(S.String),
          odbNetworkArn: S.optional(S.String),
          percentProgress: S.optional(S.Number),
          computeModel: S.optional(S.String),
          iamRoles: S.optional(__S(737, __c46, 1)),
        }),
      ).annotate({ identifier: "CloudVmCluster" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudVmClusterId: S.optional(S.String),
          exadbVmClusterId: S.optional(S.String),
          dbNodeId: S.String.pipe(T.HttpLabel("dbNodeId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDbNodeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dbNodeId: S.optional(S.String),
          dbNodeArn: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          additionalDetails: S.optional(S.String),
          backupIpId: S.optional(S.String),
          backupVnic2Id: S.optional(S.String),
          backupVnicId: S.optional(S.String),
          cpuCoreCount: S.optional(S.Number),
          dbNodeStorageSizeInGBs: S.optional(S.Number),
          dbServerId: S.optional(S.String),
          dbSystemId: S.optional(S.String),
          faultDomain: S.optional(S.String),
          hostIpId: S.optional(S.String),
          hostname: S.optional(S.String),
          ocid: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          maintenanceType: S.optional(S.String),
          memorySizeInGBs: S.optional(S.Number),
          softwareStorageSizeInGB: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeMaintenanceWindowEnd: S.optional(S.String),
          timeMaintenanceWindowStart: S.optional(S.String),
          totalCpuCoreCount: S.optional(S.Number),
          vnic2Id: S.optional(S.String),
          vnicId: S.optional(S.String),
          privateIpAddress: S.optional(S.String),
          floatingIpAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "DbNode" });
    case 2:
      return S.suspend(() => S.Struct({ dbNode: S.optional(__S(865, __c54, 1)) })).annotate({
        identifier: "GetDbNodeOutput",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String.pipe(T.HttpLabel("cloudExadataInfrastructureId")),
          dbServerId: S.String.pipe(T.HttpLabel("dbServerId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDbServerInput" });
    case 1:
      return S.suspend(() => S.Struct({ dbServer: S.optional(__S(897, __c56, 1)) })).annotate({
        identifier: "GetDbServerOutput",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          estimatedPatchDuration: S.optional(S.Number),
          patchingStatus: S.optional(S.String),
          timePatchingEnded: S.optional(S.String),
          timePatchingStarted: S.optional(S.String),
        }),
      ).annotate({ identifier: "DbServerPatchingDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dbServerId: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          cpuCoreCount: S.optional(S.Number),
          dbNodeStorageSizeInGBs: S.optional(S.Number),
          dbServerPatchingDetails: S.optional(__S(896, __c56, 0)),
          displayName: S.optional(S.String),
          exadataInfrastructureId: S.optional(S.String),
          ocid: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          maxCpuCount: S.optional(S.Number),
          maxDbNodeStorageInGBs: S.optional(S.Number),
          maxMemoryInGBs: S.optional(S.Number),
          memorySizeInGBs: S.optional(S.Number),
          shape: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          vmClusterIds: S.optional(__S(80, __c5, 0)),
          computeModel: S.optional(S.String),
          autonomousVmClusterIds: S.optional(__S(80, __c5, 0)),
          autonomousVirtualMachineIds: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "DbServer" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exadbVmClusterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetExadbVmClusterInput" });
    case 1:
      return S.suspend(() => S.Struct({ exadbVmCluster: __S(929, __c58, 1) })).annotate({
        identifier: "GetExadbVmClusterOutput",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ totalSizeInGBs: S.optional(S.Number) })).annotate({
        identifier: "ExadbVmClusterStorageDetails",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          exadbVmClusterId: S.String,
          clusterName: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dataCollectionOptions: S.optional(__S(288, __c18, 0)),
          displayName: S.optional(S.String),
          domain: S.optional(S.String),
          enabledEcpuCount: S.optional(S.Number),
          exadbVmClusterArn: S.optional(S.String),
          exascaleDbStorageVaultArn: S.optional(S.String),
          exascaleDbStorageVaultId: S.optional(S.String),
          giVersion: S.optional(S.String),
          gridImageId: S.optional(S.String),
          gridImageType: S.optional(S.String),
          hostname: S.optional(S.String),
          iamRoles: S.optional(__S(737, __c46, 1)),
          iormConfigCache: S.optional(__S(834, __c52, 2)),
          lastUpdateHistoryEntryId: S.optional(S.String),
          licenseModel: S.optional(S.String),
          listenerPort: S.optional(S.Number),
          memorySizeInGBs: S.optional(S.Number),
          nodeCount: S.optional(S.Number),
          ocid: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          ociUrl: S.optional(S.String),
          odbNetworkArn: S.optional(S.String),
          odbNetworkId: S.optional(S.String),
          percentProgress: S.optional(S.Number),
          scanDnsName: S.optional(S.String),
          scanDnsRecordId: S.optional(S.String),
          scanIpIds: S.optional(__S(80, __c5, 0)),
          scanListenerPortTcp: S.optional(S.Number),
          scanListenerPortTcpSsl: S.optional(S.Number),
          shape: S.optional(S.String),
          shapeAttribute: S.optional(S.String),
          snapshotFileSystemStorage: S.optional(__S(928, __c58, 0)),
          sshPublicKeys: S.optional(__S(80, __c5, 0)),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          systemVersion: S.optional(S.String),
          timeZone: S.optional(S.String),
          totalEcpuCount: S.optional(S.Number),
          totalFileSystemStorage: S.optional(__S(928, __c58, 0)),
          vipIds: S.optional(__S(80, __c5, 0)),
          vmFileSystemStorage: S.optional(__S(928, __c58, 0)),
        }),
      ).annotate({ identifier: "ExadbVmCluster" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exascaleDbStorageVaultId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetExascaleDbStorageVaultInput" });
    case 1:
      return S.suspend(() => S.Struct({ exascaleDbStorageVault: __S(977, __c61, 1) })).annotate({
        identifier: "GetExascaleDbStorageVaultOutput",
      });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          availableSizeInGBs: S.optional(S.Number),
          totalSizeInGBs: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExascaleDbStorageDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          exascaleDbStorageVaultId: S.String,
          additionalFlashCacheInPercent: S.optional(S.Number),
          attachedShapeAttributes: S.optional(__S(960, __c60, 0)),
          autoscaleLimitInGBs: S.optional(S.Number),
          availabilityZone: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(S.String),
          displayName: S.optional(S.String),
          vmClusterArns: S.optional(__S(80, __c5, 0)),
          vmClusterCount: S.optional(S.Number),
          vmClusterIds: S.optional(__S(80, __c5, 0)),
          exascaleDbStorageVaultArn: S.optional(S.String),
          highCapacityDatabaseStorage: S.optional(__S(976, __c61, 0)),
          isAutoscaleEnabled: S.optional(S.Boolean),
          ocid: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          ociUrl: S.optional(S.String),
          percentProgress: S.optional(S.Number),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          timeZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExascaleDbStorageVault" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOciOnboardingStatusInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ociIdentityDomainId: S.optional(S.String),
          ociIdentityDomainResourceUrl: S.optional(S.String),
          ociIdentityDomainUrl: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          accountSetupCloudFormationUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "OciIdentityDomain" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          iamRoleArn: S.optional(S.String),
          awsIntegration: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "OciIamRole" });
    case 3:
      return S.Array(__S(994, __c62, 2));
    case 4:
      return S.suspend(() => S.Struct({ errorMessage: S.optional(S.String) })).annotate({
        identifier: "SubscriptionError",
      });
    case 5:
      return S.Array(__S(996, __c62, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          existingTenancyActivationLink: S.optional(S.String),
          newTenancyActivationLink: S.optional(S.String),
          ociIdentityDomain: S.optional(__S(993, __c62, 1)),
          autonomousDatabaseOciIntegrationIamRoles: S.optional(__S(995, __c62, 3)),
          linkedOciTenancyId: S.optional(S.String),
          linkedOciCompartmentId: S.optional(S.String),
          subscriptionErrors: S.optional(__S(997, __c62, 5)),
        }),
      ).annotate({ identifier: "GetOciOnboardingStatusOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ odbNetworkId: S.String.pipe(T.HttpLabel("odbNetworkId")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOdbNetworkInput" });
    case 1:
      return S.suspend(() => S.Struct({ odbNetwork: S.optional(__S(1035, __c64, 11)) })).annotate({
        identifier: "GetOdbNetworkOutput",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.optional(S.String), ociDnsListenerIp: S.optional(S.String) }),
      ).annotate({ identifier: "OciDnsForwardingConfig" });
    case 1:
      return S.Array(__S(1024, __c64, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ vpcEndpointId: S.optional(S.String), vpcEndpointType: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceNetworkEndpoint" });
    case 3:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), ipv4Addresses: S.optional(__S(80, __c5, 0)) }),
      ).annotate({ identifier: "ManagedS3BackupAccess" });
    case 4:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), cidr: S.optional(S.String) }),
      ).annotate({ identifier: "ZeroEtlAccess" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          ipv4Addresses: S.optional(__S(80, __c5, 0)),
          domainName: S.optional(S.String),
          s3PolicyDocument: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Access" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          ipv4Addresses: S.optional(__S(80, __c5, 0)),
          domainName: S.optional(S.String),
          stsPolicyDocument: S.optional(S.String),
        }),
      ).annotate({ identifier: "StsAccess" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          ipv4Addresses: S.optional(__S(80, __c5, 0)),
          domainName: S.optional(S.String),
          kmsPolicyDocument: S.optional(S.String),
        }),
      ).annotate({ identifier: "KmsAccess" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          region: S.optional(S.String),
          ipv4Addresses: S.optional(__S(80, __c5, 0)),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CrossRegionS3RestoreSourcesAccess" });
    case 9:
      return S.Array(__S(1032, __c64, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          serviceNetworkArn: S.optional(S.String),
          resourceGatewayArn: S.optional(S.String),
          managedServicesIpv4Cidrs: S.optional(__S(80, __c5, 0)),
          serviceNetworkEndpoint: S.optional(__S(1026, __c64, 2)),
          managedS3BackupAccess: S.optional(__S(1027, __c64, 3)),
          zeroEtlAccess: S.optional(__S(1028, __c64, 4)),
          s3Access: S.optional(__S(1029, __c64, 5)),
          stsAccess: S.optional(__S(1030, __c64, 6)),
          kmsAccess: S.optional(__S(1031, __c64, 7)),
          crossRegionS3RestoreSourcesAccess: S.optional(__S(1033, __c64, 9)),
        }),
      ).annotate({ identifier: "ManagedServices" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          odbNetworkId: S.String,
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          odbNetworkArn: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          clientSubnetCidr: S.optional(S.String),
          backupSubnetCidr: S.optional(S.String),
          customDomainName: S.optional(S.String),
          defaultDnsPrefix: S.optional(S.String),
          peeredCidrs: S.optional(__S(80, __c5, 0)),
          ociNetworkAnchorId: S.optional(S.String),
          ociNetworkAnchorUrl: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          ociVcnId: S.optional(S.String),
          ociVcnUrl: S.optional(S.String),
          ociDnsForwardingConfigs: S.optional(__S(1025, __c64, 1)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          percentProgress: S.optional(S.Number),
          managedServices: S.optional(__S(1034, __c64, 10)),
          ec2PlacementGroupIds: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "OdbNetwork" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          odbPeeringConnectionId: S.String.pipe(T.HttpLabel("odbPeeringConnectionId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetOdbPeeringConnectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ odbPeeringConnection: S.optional(__S(1056, __c66, 0)) }),
      ).annotate({ identifier: "GetOdbPeeringConnectionOutput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          odbPeeringConnectionId: S.String,
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          odbPeeringConnectionArn: S.optional(S.String),
          odbNetworkArn: S.optional(S.String),
          peerNetworkArn: S.optional(S.String),
          odbPeeringConnectionType: S.optional(S.String),
          peerNetworkCidrs: S.optional(__S(80, __c5, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          percentProgress: S.optional(S.Number),
        }),
      ).annotate({ identifier: "OdbPeeringConnection" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ociIdentityDomain: S.optional(S.Boolean),
          autonomousDatabaseOciAwsSecretsManagerIntegration: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "InitializeServiceInput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")),
          status: S.optional(S.String),
          type: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutonomousDatabaseBackupsInput" });
    case 1:
      return S.Array(__S(688, __c43, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          autonomousDatabaseBackups: __S(1089, __c68, 1),
        }),
      ).annotate({ identifier: "ListAutonomousDatabaseBackupsOutput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          characterSetType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutonomousDatabaseCharacterSetsInput" });
    case 1:
      return S.suspend(() => S.Struct({ characterSet: S.optional(S.String) })).annotate({
        identifier: "AutonomousDatabaseCharacterSetSummary",
      });
    case 2:
      return S.Array(__S(1105, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          autonomousDatabaseCharacterSets: __S(1106, __c69, 2),
        }),
      ).annotate({ identifier: "ListAutonomousDatabaseCharacterSetsOutput" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutonomousDatabaseClonesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          autonomousDatabaseClones: __S(1136, __c71, 0),
        }),
      ).annotate({ identifier: "ListAutonomousDatabaseClonesOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(652, __c40, 12));
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutonomousDatabasePeersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseId: S.optional(S.String),
          autonomousDatabaseArn: S.optional(S.String),
          ocid: S.optional(S.String),
          region: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutonomousDatabasePeerSummary" });
    case 2:
      return S.Array(__S(1153, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), autonomousDatabasePeers: __S(1154, __c72, 2) }),
      ).annotate({ identifier: "ListAutonomousDatabasePeersOutput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutonomousDatabasesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), autonomousDatabases: __S(1136, __c71, 0) }),
      ).annotate({ identifier: "ListAutonomousDatabasesOutput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          dbWorkload: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutonomousDatabaseVersionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dbWorkload: S.optional(S.String),
          details: S.optional(S.String),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutonomousDatabaseVersionSummary" });
    case 2:
      return S.Array(__S(1185, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          autonomousDatabaseVersions: __S(1186, __c74, 2),
        }),
      ).annotate({ identifier: "ListAutonomousDatabaseVersionsOutput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          cloudAutonomousVmClusterId: S.String.pipe(T.HttpLabel("cloudAutonomousVmClusterId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutonomousVirtualMachinesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          autonomousVirtualMachineId: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          vmName: S.optional(S.String),
          dbServerId: S.optional(S.String),
          dbServerDisplayName: S.optional(S.String),
          cpuCoreCount: S.optional(S.Number),
          memorySizeInGBs: S.optional(S.Number),
          dbNodeStorageSizeInGBs: S.optional(S.Number),
          clientIpAddress: S.optional(S.String),
          cloudAutonomousVmClusterId: S.optional(S.String),
          ocid: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutonomousVirtualMachineSummary" });
    case 2:
      return S.Array(__S(1201, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          autonomousVirtualMachines: __S(1202, __c75, 2),
        }),
      ).annotate({ identifier: "ListAutonomousVirtualMachinesOutput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          cloudExadataInfrastructureId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCloudAutonomousVmClustersInput" });
    case 1:
      return S.Array(__S(752, __c47, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          cloudAutonomousVmClusters: __S(1217, __c76, 1),
        }),
      ).annotate({ identifier: "ListCloudAutonomousVmClustersOutput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCloudExadataInfrastructuresInput" });
    case 1:
      return S.Array(__S(784, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          cloudExadataInfrastructures: __S(1233, __c77, 1),
        }),
      ).annotate({ identifier: "ListCloudExadataInfrastructuresOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          cloudExadataInfrastructureId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCloudVmClustersInput" });
    case 1:
      return S.Array(__S(849, __c53, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), cloudVmClusters: __S(1249, __c78, 1) }),
      ).annotate({ identifier: "ListCloudVmClustersOutput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          cloudVmClusterId: S.optional(S.String),
          exadbVmClusterId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDbNodesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dbNodeId: S.optional(S.String),
          dbNodeArn: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          additionalDetails: S.optional(S.String),
          backupIpId: S.optional(S.String),
          backupVnic2Id: S.optional(S.String),
          backupVnicId: S.optional(S.String),
          cpuCoreCount: S.optional(S.Number),
          dbNodeStorageSizeInGBs: S.optional(S.Number),
          dbServerId: S.optional(S.String),
          dbSystemId: S.optional(S.String),
          faultDomain: S.optional(S.String),
          hostIpId: S.optional(S.String),
          hostname: S.optional(S.String),
          ocid: S.optional(S.String),
          ociResourceAnchorName: S.optional(S.String),
          maintenanceType: S.optional(S.String),
          memorySizeInGBs: S.optional(S.Number),
          softwareStorageSizeInGB: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          timeMaintenanceWindowEnd: S.optional(S.String),
          timeMaintenanceWindowStart: S.optional(S.String),
          totalCpuCoreCount: S.optional(S.Number),
          vnic2Id: S.optional(S.String),
          vnicId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DbNodeSummary" });
    case 2:
      return S.Array(__S(1265, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), dbNodes: __S(1266, __c79, 2) }),
      ).annotate({ identifier: "ListDbNodesOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String.pipe(T.HttpLabel("cloudExadataInfrastructureId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDbServersInput" });
    case 1:
      return S.Array(__S(897, __c56, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), dbServers: __S(1281, __c80, 1) }),
      ).annotate({ identifier: "ListDbServersOutput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          availabilityZone: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          shapeFamily: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDbSystemShapesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          availableCoreCount: S.optional(S.Number),
          availableCoreCountPerNode: S.optional(S.Number),
          availableDataStorageInTBs: S.optional(S.Number),
          availableDataStoragePerServerInTBs: S.optional(S.Number),
          availableDbNodePerNodeInGBs: S.optional(S.Number),
          availableDbNodeStorageInGBs: S.optional(S.Number),
          availableMemoryInGBs: S.optional(S.Number),
          availableMemoryPerNodeInGBs: S.optional(S.Number),
          coreCountIncrement: S.optional(S.Number),
          maxStorageCount: S.optional(S.Number),
          maximumNodeCount: S.optional(S.Number),
          minCoreCountPerNode: S.optional(S.Number),
          minDataStorageInTBs: S.optional(S.Number),
          minDbNodeStoragePerNodeInGBs: S.optional(S.Number),
          minMemoryPerNodeInGBs: S.optional(S.Number),
          minStorageCount: S.optional(S.Number),
          minimumCoreCount: S.optional(S.Number),
          minimumNodeCount: S.optional(S.Number),
          runtimeMinimumCoreCount: S.optional(S.Number),
          shapeFamily: S.optional(S.String),
          shapeType: S.optional(S.String),
          shapeAttributes: S.optional(__S(960, __c60, 0)),
          name: S.optional(S.String),
          computeModel: S.optional(S.String),
          areServerTypesSupported: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DbSystemShapeSummary" });
    case 2:
      return S.Array(__S(1297, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), dbSystemShapes: __S(1298, __c81, 2) }),
      ).annotate({ identifier: "ListDbSystemShapesOutput" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1312, __c82, 0));
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          exascaleDbStorageVaultId: S.optional(S.String).pipe(
            T.HttpQuery("exascaleDbStorageVaultId"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExadbVmClustersInput" });
    case 1:
      return S.Array(__S(929, __c58, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), exadbVmClusters: __S(1329, __c83, 1) }),
      ).annotate({ identifier: "ListExadbVmClustersOutput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExascaleDbStorageVaultsInput" });
    case 1:
      return S.Array(__S(977, __c61, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), exascaleDbStorageVaults: __S(1345, __c84, 1) }),
      ).annotate({ identifier: "ListExascaleDbStorageVaultsOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          shape: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFlexComponentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          availableCoreCount: S.optional(S.Number),
          availableDbStorageInGBs: S.optional(S.Number),
          availableLocalStorageInGBs: S.optional(S.Number),
          availableMemoryInGBs: S.optional(S.Number),
          computeModel: S.optional(S.String),
          descriptionSummary: S.optional(S.String),
          hardwareType: S.optional(S.String),
          minimumCoreCount: S.optional(S.Number),
          name: S.optional(S.String),
          runtimeMinimumCoreCount: S.optional(S.Number),
          shape: S.optional(S.String),
        }),
      ).annotate({ identifier: "FlexComponentSummary" });
    case 2:
      return S.Array(__S(1361, __c85, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), flexComponents: __S(1362, __c85, 2) }),
      ).annotate({ identifier: "ListFlexComponentsOutput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          giVersion: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          shapeFamily: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGiMinorVersionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ version: S.String, gridImageId: S.optional(S.String) }),
      ).annotate({ identifier: "GiMinorVersionSummary" });
    case 2:
      return S.Array(__S(1377, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), giMinorVersions: __S(1378, __c86, 2) }),
      ).annotate({ identifier: "ListGiMinorVersionsOutput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          shape: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGiVersionsInput" });
    case 1:
      return S.suspend(() => S.Struct({ version: S.optional(S.String) })).annotate({
        identifier: "GiVersionSummary",
      });
    case 2:
      return S.Array(__S(1393, __c87, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), giVersions: __S(1394, __c87, 2) }),
      ).annotate({ identifier: "ListGiVersionsOutput" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOdbNetworksInput" });
    case 1:
      return S.Array(__S(1035, __c64, 11));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), odbNetworks: __S(1409, __c88, 1) }),
      ).annotate({ identifier: "ListOdbNetworksOutput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          odbNetworkId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOdbPeeringConnectionsInput" });
    case 1:
      return S.Array(__S(1056, __c66, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), odbPeeringConnections: __S(1425, __c89, 1) }),
      ).annotate({ identifier: "ListOdbPeeringConnectionsOutput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          giVersion: S.String,
          shape: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSystemVersionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          giVersion: S.optional(S.String),
          shape: S.optional(S.String),
          systemVersions: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "SystemVersionSummary" });
    case 2:
      return S.Array(__S(1441, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), systemVersions: __S(1442, __c90, 2) }),
      ).annotate({ identifier: "ListSystemVersionsOutput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String, isOnlineReboot: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RebootAutonomousDatabaseInput" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ marketplaceRegistrationToken: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptMarketplaceRegistrationInput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AcceptMarketplaceRegistrationOutput",
      });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudVmClusterId: S.optional(S.String),
          exadbVmClusterId: S.optional(S.String),
          dbNodeId: S.String.pipe(T.HttpLabel("dbNodeId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RebootDbNodeInput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dbNodeId: S.String,
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "RebootDbNodeOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseId: S.String,
          timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreAutonomousDatabaseInput" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ShrinkAutonomousDatabaseInput" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartAutonomousDatabaseInput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudVmClusterId: S.optional(S.String),
          exadbVmClusterId: S.optional(S.String),
          dbNodeId: S.String.pipe(T.HttpLabel("dbNodeId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDbNodeInput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopAutonomousDatabaseInput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudVmClusterId: S.optional(S.String),
          exadbVmClusterId: S.optional(S.String),
          dbNodeId: S.String.pipe(T.HttpLabel("dbNodeId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StopDbNodeInput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autonomousDatabaseId: S.String, peerDbArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SwitchoverAutonomousDatabaseInput" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(16, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(80, __c5, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ iamRoleArn: S.String, awsIntegration: S.String, resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateIamRoleToResourceInput" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseId: S.String,
          adminPassword: S.optional(SensitiveString),
          computeCount: S.optional(S.Number),
          cpuCoreCount: S.optional(S.Number),
          dataStorageSizeInTBs: S.optional(S.Number),
          dataStorageSizeInGBs: S.optional(S.Number),
          displayName: S.optional(S.String),
          dbName: S.optional(S.String),
          dbVersion: S.optional(S.String),
          dbWorkload: S.optional(S.String),
          dbToolsDetails: S.optional(__S(132, __c8, 4)),
          databaseEdition: S.optional(S.String),
          licenseModel: S.optional(S.String),
          isAutoScalingEnabled: S.optional(S.Boolean),
          isAutoScalingForStorageEnabled: S.optional(S.Boolean),
          isBackupRetentionLocked: S.optional(S.Boolean),
          isLocalDataGuardEnabled: S.optional(S.Boolean),
          isMtlsConnectionRequired: S.optional(S.Boolean),
          isRefreshableClone: S.optional(S.Boolean),
          isDisconnectPeer: S.optional(S.Boolean),
          backupRetentionPeriodInDays: S.optional(S.Number),
          byolComputeCountLimit: S.optional(S.Number),
          localAdgAutoFailoverMaxDataLossLimit: S.optional(S.Number),
          autonomousMaintenanceScheduleType: S.optional(S.String),
          customerContactsToSendToOCI: S.optional(__S(97, __c6, 1)),
          scheduledOperations: S.optional(__S(130, __c8, 2)),
          longTermBackupSchedule: S.optional(__S(656, __c41, 0)),
          openMode: S.optional(S.String),
          permissionLevel: S.optional(S.String),
          refreshableMode: S.optional(S.String),
          privateEndpointIp: S.optional(S.String),
          privateEndpointLabel: S.optional(S.String),
          peerDbId: S.optional(S.String),
          resourcePoolLeaderId: S.optional(S.String),
          resourcePoolSummary: S.optional(__S(128, __c8, 0)),
          standbyAllowlistedIpsSource: S.optional(S.String),
          standbyAllowlistedIps: S.optional(__S(80, __c5, 0)),
          allowlistedIps: S.optional(__S(80, __c5, 0)),
          autoRefreshFrequencyInSeconds: S.optional(S.Number),
          autoRefreshPointLagInSeconds: S.optional(S.Number),
          timeOfAutoRefreshStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          encryptionKeyProvider: S.optional(S.String),
          encryptionKeyConfiguration: S.optional(__S(144, __c9, 0)),
          adminPasswordSource: S.optional(S.String),
          adminPasswordSourceConfiguration: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAutonomousDatabaseInput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autonomousDatabaseBackupId: S.String.pipe(T.HttpLabel("autonomousDatabaseBackupId")),
          retentionPeriodInDays: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAutonomousDatabaseBackupInput" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudExadataInfrastructureId: S.String.pipe(T.HttpLabel("cloudExadataInfrastructureId")),
          maintenanceWindow: S.optional(__S(225, __c14, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCloudExadataInfrastructureInput" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          exadbVmClusterId: S.String,
          dataCollectionOptions: S.optional(__S(288, __c18, 0)),
          displayName: S.optional(S.String),
          enabledEcpuCount: S.optional(S.Number),
          gridImageId: S.optional(S.String),
          licenseModel: S.optional(S.String),
          sshPublicKeys: S.optional(__S(80, __c5, 0)),
          systemVersion: S.optional(S.String),
          totalEcpuCount: S.optional(S.Number),
          updateAction: S.optional(S.String),
          vmFileSystemStorageTotalSizeInGBs: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateExadbVmClusterInput" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          exascaleDbStorageVaultId: S.String,
          additionalFlashCacheInPercent: S.optional(S.Number),
          autoscaleLimitInGBs: S.optional(S.Number),
          description: S.optional(S.String),
          displayName: S.optional(S.String),
          highCapacityDatabaseStorageTotalSizeInGBs: S.optional(S.Number),
          isAutoscaleEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateExascaleDbStorageVaultInput" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          odbNetworkId: S.String.pipe(T.HttpLabel("odbNetworkId")),
          displayName: S.optional(S.String),
          peeredCidrsToBeAdded: S.optional(__S(80, __c5, 0)),
          peeredCidrsToBeRemoved: S.optional(__S(80, __c5, 0)),
          s3Access: S.optional(S.String),
          zeroEtlAccess: S.optional(S.String),
          stsAccess: S.optional(S.String),
          kmsAccess: S.optional(S.String),
          s3PolicyDocument: S.optional(S.String),
          stsPolicyDocument: S.optional(S.String),
          kmsPolicyDocument: S.optional(S.String),
          crossRegionS3RestoreSourcesToEnable: S.optional(__S(80, __c5, 0)),
          crossRegionS3RestoreSourcesToDisable: S.optional(__S(80, __c5, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateOdbNetworkInput" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          odbPeeringConnectionId: S.String.pipe(T.HttpLabel("odbPeeringConnectionId")),
          displayName: S.optional(S.String),
          peerNetworkCidrsToBeAdded: S.optional(__S(80, __c5, 0)),
          peerNetworkCidrsToBeRemoved: S.optional(__S(80, __c5, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateOdbPeeringConnectionInput" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exadbVmClusterId: S.String, desiredNodeCount: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateVirtualMachinesToExadbVmClusterInput" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          exadbVmClusterId: S.String,
        }),
      ).annotate({ identifier: "AssociateVirtualMachinesToExadbVmClusterOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
