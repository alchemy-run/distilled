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
  sdkId: "odb",
  target: "Odb",
  version: "2024-08-20",
  sigv4: "odb",
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
                `https://odb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://odb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://odb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://odb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
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
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type LicenseModel =
  | "BRING_YOUR_OWN_LICENSE"
  | "LICENSE_INCLUDED"
  | (string & {});
export type DatabaseEdition =
  | "STANDARD_EDITION"
  | "ENTERPRISE_EDITION"
  | (string & {});
export type StandbyAllowlistedIpsSource =
  | "PRIMARY"
  | "SEPARATE"
  | "NOT_APPLICABLE"
  | (string & {});
export type AutonomousMaintenanceScheduleType =
  | "EARLY"
  | "REGULAR"
  | (string & {});
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
export type EncryptionKeyProviderInput =
  | "ORACLE_MANAGED"
  | "AWS_KMS"
  | (string & {});
export type ExternalIdType =
  | "database_ocid"
  | "compartment_ocid"
  | "tenant_ocid"
  | (string & {});
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
export type AutonomousDatabaseWalletFile =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
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
export type PreferenceType =
  | "NO_PREFERENCE"
  | "CUSTOM_PREFERENCE"
  | (string & {});
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
export type DatabaseConnectionStringProfileList =
  DatabaseConnectionStringProfile[];
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
export type RepeatCadence =
  | "ONE_TIME"
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY"
  | (string & {});
export interface LongTermBackupSchedule {
  isDisabled?: boolean;
  repeatCadence?: RepeatCadence;
  retentionPeriodInDays?: number;
  timeOfBackup?: Date;
}
export type EncryptionKeyProvider =
  | "ORACLE_MANAGED"
  | "AWS_KMS"
  | "OKV"
  | "OCI"
  | (string & {});
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
export type AutonomousDatabaseWalletStatus =
  | "ACTIVE"
  | "UPDATING"
  | (string & {});
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
export type CloudAutonomousVmClusterResourceDetailsList =
  CloudAutonomousVmClusterResourceDetails[];
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
export type CrossRegionS3RestoreSourcesAccessList =
  CrossRegionS3RestoreSourcesAccess[];
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
export type AutonomousDatabaseCharacterSetList =
  AutonomousDatabaseCharacterSetSummary[];
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
export type CloudExadataInfrastructureList =
  CloudExadataInfrastructureSummary[];
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
export type ShapeType =
  | "AMD"
  | "INTEL"
  | "INTEL_FLEX_X9"
  | "AMPERE_FLEX_A1"
  | (string & {});
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
  descriptor: { service: svc, input: { marketplaceRegistrationToken: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { iamRoleArn: 0, awsIntegration: 0, resourceArn: 0 },
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
  operationName: "AssociateIamRoleToResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { exadbVmClusterId: 0, desiredNodeCount: 0 },
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
  operationName: "AssociateVirtualMachinesToExadbVmCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      odbNetworkId: 0,
      displayName: 0,
      dbName: 0,
      adminPassword: 0,
      computeCount: 0,
      dataStorageSizeInTBs: 0,
      dataStorageSizeInGBs: 0,
      dbWorkload: 0,
      isAutoScalingEnabled: 0,
      isAutoScalingForStorageEnabled: 0,
      licenseModel: 0,
      characterSet: 0,
      ncharacterSet: 0,
      dbVersion: 0,
      databaseEdition: 0,
      standbyAllowlistedIpsSource: 0,
      autonomousMaintenanceScheduleType: 0,
      backupRetentionPeriodInDays: 0,
      byolComputeCountLimit: 0,
      cpuCoreCount: 0,
      customerContactsToSendToOCI: D.list(i_CustomerContact),
      privateEndpointIp: 0,
      privateEndpointLabel: 0,
      resourcePoolLeaderId: 0,
      resourcePoolSummary: i_ResourcePoolSummary,
      scheduledOperations: D.list(i_ScheduledOperationDetails),
      standbyAllowlistedIps: 0,
      allowlistedIps: 0,
      transportableTablespace: { ttsBundleUrl: 0 },
      isBackupRetentionLocked: 0,
      isLocalDataGuardEnabled: 0,
      isMtlsConnectionRequired: 0,
      dbToolsDetails: D.list(i_DatabaseTool),
      source: 0,
      sourceConfiguration: {
        databaseClone: { sourceAutonomousDatabaseId: 0, cloneType: 0 },
        restoreFromBackup: {
          autonomousDatabaseBackupId: 0,
          cloneType: 0,
          cloneTableSpaceList: 0,
        },
        pointInTimeRestore: {
          sourceAutonomousDatabaseId: 0,
          cloneType: 0,
          timestamp: D.tsAs("date-time"),
          useLatestAvailableBackupTimestamp: 0,
          cloneTableSpaceList: 0,
        },
        crossRegionDataGuard: { sourceAutonomousDatabaseArn: 0 },
        crossRegionDisasterRecovery: {
          sourceAutonomousDatabaseArn: 0,
          remoteDisasterRecoveryType: 0,
          isReplicateAutomaticBackups: 0,
        },
        cloneToRefreshable: {
          sourceAutonomousDatabaseId: 0,
          refreshableMode: 0,
          autoRefreshFrequencyInSeconds: 0,
          autoRefreshPointLagInSeconds: 0,
          timeOfAutoRefreshStart: D.tsAs("date-time"),
          openMode: 0,
          cloneType: 0,
        },
      },
      encryptionKeyProvider: 0,
      encryptionKeyConfiguration: i_EncryptionKeyConfigurationInput,
      adminPasswordSource: 0,
      adminPasswordSourceConfiguration: i_AdminPasswordSourceConfigurationInput,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "CreateAutonomousDatabase",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      autonomousDatabaseId: 0,
      displayName: 0,
      retentionPeriodInDays: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "CreateAutonomousDatabaseBackup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      autonomousDatabaseId: 0,
      walletType: 0,
      password: 0,
      passwordSource: 0,
      passwordSourceConfiguration: {
        customerManagedAwsSecret: i_CustomerManagedAwsSecretConfigurationInput,
      },
      clientToken: D.m({ idempotency: true }),
    },
    output: { autonomousDatabaseWalletFile: D.secretBlob },
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
  operationName: "CreateAutonomousDatabaseWallet",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      cloudExadataInfrastructureId: 0,
      odbNetworkId: 0,
      displayName: 0,
      clientToken: D.m({ idempotency: true }),
      autonomousDataStorageSizeInTBs: 0,
      cpuCoreCountPerNode: 0,
      dbServers: 0,
      description: 0,
      isMtlsEnabledVmCluster: 0,
      licenseModel: 0,
      maintenanceWindow: i_MaintenanceWindow,
      memoryPerOracleComputeUnitInGBs: 0,
      scanListenerPortNonTls: 0,
      scanListenerPortTls: 0,
      tags: 0,
      timeZone: 0,
      totalContainerDatabases: 0,
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
  operationName: "CreateCloudAutonomousVmCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      displayName: 0,
      shape: 0,
      availabilityZone: 0,
      availabilityZoneId: 0,
      tags: 0,
      computeCount: 0,
      customerContactsToSendToOCI: D.list(i_CustomerContact),
      maintenanceWindow: i_MaintenanceWindow,
      storageCount: 0,
      clientToken: D.m({ idempotency: true }),
      databaseServerType: 0,
      storageServerType: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      cloudExadataInfrastructureId: 0,
      cpuCoreCount: 0,
      displayName: 0,
      giVersion: 0,
      hostname: 0,
      sshPublicKeys: 0,
      odbNetworkId: 0,
      clusterName: 0,
      dataCollectionOptions: i_DataCollectionOptions,
      dataStorageSizeInTBs: 0,
      dbNodeStorageSizeInGBs: 0,
      dbServers: 0,
      tags: 0,
      isLocalBackupEnabled: 0,
      isSparseDiskgroupEnabled: 0,
      licenseModel: 0,
      memorySizeInGBs: 0,
      systemVersion: 0,
      timeZone: 0,
      clientToken: D.m({ idempotency: true }),
      scanListenerPortTcp: 0,
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
  operationName: "CreateCloudVmCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      displayName: 0,
      enabledEcpuCount: 0,
      exascaleDbStorageVaultId: 0,
      gridImageId: 0,
      hostname: 0,
      nodeCount: 0,
      odbNetworkId: 0,
      shape: 0,
      sshPublicKeys: 0,
      totalEcpuCount: 0,
      vmFileSystemStorageTotalSizeInGBs: 0,
      clusterName: 0,
      dataCollectionOptions: i_DataCollectionOptions,
      licenseModel: 0,
      scanListenerPortTcp: 0,
      scanListenerPortTcpSsl: 0,
      shapeAttribute: 0,
      systemVersion: 0,
      tags: 0,
      timeZone: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "CreateExadbVmCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      displayName: 0,
      highCapacityDatabaseStorageTotalSizeInGBs: 0,
      additionalFlashCacheInPercent: 0,
      autoscaleLimitInGBs: 0,
      availabilityZoneId: 0,
      availabilityZone: 0,
      description: 0,
      isAutoscaleEnabled: 0,
      tags: 0,
      timeZone: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      displayName: 0,
      availabilityZone: 0,
      availabilityZoneId: 0,
      clientSubnetCidr: 0,
      backupSubnetCidr: 0,
      customDomainName: 0,
      defaultDnsPrefix: 0,
      clientToken: D.m({ idempotency: true }),
      s3Access: 0,
      zeroEtlAccess: 0,
      stsAccess: 0,
      kmsAccess: 0,
      s3PolicyDocument: 0,
      stsPolicyDocument: 0,
      kmsPolicyDocument: 0,
      crossRegionS3RestoreSourcesToEnable: 0,
      tags: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      odbNetworkId: 0,
      peerNetworkId: 0,
      displayName: 0,
      peerNetworkCidrsToBeAdded: 0,
      peerNetworkRouteTableIds: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
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
  operationName: "CreateOdbPeeringConnection",
})) as any;

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
  descriptor: { service: svc, input: { autonomousDatabaseId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { autonomousDatabaseBackupId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { cloudAutonomousVmClusterId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { cloudExadataInfrastructureId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { cloudVmClusterId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { exadbVmClusterId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { exascaleDbStorageVaultId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { odbNetworkId: 0, deleteAssociatedResources: 0 },
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
  operationName: "DeleteOdbNetwork",
})) as any;

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
  descriptor: { service: svc, input: { odbPeeringConnectionId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { iamRoleArn: 0, awsIntegration: 0, resourceArn: 0 },
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
  operationName: "DisassociateIamRoleFromResource",
})) as any;

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
  descriptor: { service: svc, input: { exadbVmClusterId: 0, dbNodeIds: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { autonomousDatabaseId: 0, peerDbArn: 0 },
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
  operationName: "FailoverAutonomousDatabase",
})) as any;

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
  descriptor: {
    service: svc,
    input: { autonomousDatabaseId: 0 },
    output: {
      autonomousDatabase: {
        customerContacts: D.list(o_CustomerContact),
        standbyDb: o_DatabaseStandbySummary,
        localStandbyDb: o_DatabaseStandbySummary,
        remoteDisasterRecoveryConfiguration: o_DisasterRecoveryConfiguration,
        longTermBackupSchedule: o_LongTermBackupSchedule,
        createdAt: D.ts,
        timeOfLastBackup: D.ts,
        timeMaintenanceBegin: D.ts,
        timeMaintenanceEnd: D.ts,
        timeLocalDataGuardEnabled: D.ts,
        timeDataGuardRoleChanged: D.ts,
        timeOfLastSwitchover: D.ts,
        timeOfLastFailover: D.ts,
        timeOfLastRefresh: D.ts,
        timeOfLastRefreshPoint: D.ts,
        timeOfNextRefresh: D.ts,
        timeOfAutoRefreshStart: D.ts,
        timeDeletionOfFreeAutonomousDatabase: D.ts,
        timeReclamationOfFreeAutonomousDatabase: D.ts,
        timeDisasterRecoveryRoleChanged: D.ts,
        timeUntilReconnectCloneEnabled: D.ts,
        nextLongTermBackupTimeStamp: D.ts,
        timeUndeleted: D.ts,
      },
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
  operationName: "GetAutonomousDatabase",
})) as any;

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
  descriptor: {
    service: svc,
    input: { autonomousDatabaseBackupId: 0 },
    output: {
      autonomousDatabaseBackup: {
        timeAvailableTill: D.ts,
        timeStarted: D.ts,
        timeEnded: D.ts,
      },
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
  operationName: "GetAutonomousDatabaseBackup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { autonomousDatabaseId: 0 },
    output: { autonomousDatabaseWalletDetails: { timeRotated: D.ts } },
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
  operationName: "GetAutonomousDatabaseWalletDetails",
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudAutonomousVmClusterId: 0 },
    output: {
      cloudAutonomousVmCluster: {
        createdAt: D.ts,
        timeDatabaseSslCertificateExpires: D.ts,
        timeOrdsCertificateExpires: D.ts,
      },
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
  operationName: "GetCloudAutonomousVmCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudExadataInfrastructureId: 0 },
    output: {
      cloudExadataInfrastructure: {
        customerContactsToSendToOCI: D.list(o_CustomerContact),
        createdAt: D.ts,
      },
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
  operationName: "GetCloudExadataInfrastructure",
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudExadataInfrastructureId: 0, dbServers: 0 },
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
  operationName: "GetCloudExadataInfrastructureUnallocatedResources",
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudVmClusterId: 0 },
    output: {
      cloudVmCluster: { sshPublicKeys: D.list(D.secret), createdAt: D.ts },
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
  operationName: "GetCloudVmCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudVmClusterId: 0, exadbVmClusterId: 0, dbNodeId: 0 },
    output: { dbNode: { createdAt: D.ts } },
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
  operationName: "GetDbNode",
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudExadataInfrastructureId: 0, dbServerId: 0 },
    output: { dbServer: { createdAt: D.ts } },
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
  operationName: "GetDbServer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { exadbVmClusterId: 0 },
    output: { exadbVmCluster: { createdAt: D.ts } },
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
  operationName: "GetExadbVmCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { exascaleDbStorageVaultId: 0 },
    output: { exascaleDbStorageVault: { createdAt: D.ts } },
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
  operationName: "GetExascaleDbStorageVault",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOciOnboardingStatus",
})) as any;

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
  descriptor: {
    service: svc,
    input: { odbNetworkId: 0 },
    output: { odbNetwork: { createdAt: D.ts } },
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
  operationName: "GetOdbNetwork",
})) as any;

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
  descriptor: {
    service: svc,
    input: { odbPeeringConnectionId: 0 },
    output: { odbPeeringConnection: { createdAt: D.ts } },
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
  operationName: "GetOdbPeeringConnection",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ociIdentityDomain: 0,
      autonomousDatabaseOciAwsSecretsManagerIntegration: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeService",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      maxResults: 0,
      nextToken: 0,
      autonomousDatabaseId: 0,
      status: 0,
      type: 0,
    },
    output: {
      autonomousDatabaseBackups: D.list({
        timeAvailableTill: D.ts,
        timeStarted: D.ts,
        timeEnded: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, characterSetType: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, autonomousDatabaseId: 0 },
    output: { autonomousDatabaseClones: D.list(o_AutonomousDatabaseSummary) },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, autonomousDatabaseId: 0 },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0 },
    output: { autonomousDatabases: D.list(o_AutonomousDatabaseSummary) },
  },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, dbWorkload: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, cloudAutonomousVmClusterId: 0 },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, cloudExadataInfrastructureId: 0 },
    output: {
      cloudAutonomousVmClusters: D.list({
        createdAt: D.ts,
        timeDatabaseSslCertificateExpires: D.ts,
        timeOrdsCertificateExpires: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0 },
    output: {
      cloudExadataInfrastructures: D.list({
        customerContactsToSendToOCI: D.list(o_CustomerContact),
        createdAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, cloudExadataInfrastructureId: 0 },
    output: {
      cloudVmClusters: D.list({
        sshPublicKeys: D.list(D.secret),
        createdAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: {
      maxResults: 0,
      nextToken: 0,
      cloudVmClusterId: 0,
      exadbVmClusterId: 0,
    },
    output: { dbNodes: D.list({ createdAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { cloudExadataInfrastructureId: 0, maxResults: 0, nextToken: 0 },
    output: { dbServers: D.list({ createdAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      maxResults: 0,
      nextToken: 0,
      availabilityZone: 0,
      availabilityZoneId: 0,
      shapeFamily: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: { exascaleDbStorageVaultId: 0, maxResults: 0, nextToken: 0 },
    output: { exadbVmClusters: D.list({ createdAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0 },
    output: { exascaleDbStorageVaults: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      giVersion: 0,
      maxResults: 0,
      nextToken: 0,
      shapeFamily: 0,
      availabilityZone: 0,
      availabilityZoneId: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, shape: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0 },
    output: { odbNetworks: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, odbNetworkId: 0 },
    output: { odbPeeringConnections: D.list({ createdAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, giVersion: 0, shape: 0 },
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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { autonomousDatabaseId: 0, isOnlineReboot: 0 },
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
  operationName: "RebootAutonomousDatabase",
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudVmClusterId: 0, exadbVmClusterId: 0, dbNodeId: 0 },
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
  operationName: "RebootDbNode",
})) as any;

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
  descriptor: {
    service: svc,
    input: { autonomousDatabaseId: 0, timestamp: D.tsAs("date-time") },
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
  operationName: "RestoreAutonomousDatabase",
})) as any;

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
  descriptor: { service: svc, input: { autonomousDatabaseId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { autonomousDatabaseId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudVmClusterId: 0, exadbVmClusterId: 0, dbNodeId: 0 },
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
  operationName: "StartDbNode",
})) as any;

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
  descriptor: { service: svc, input: { autonomousDatabaseId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { cloudVmClusterId: 0, exadbVmClusterId: 0, dbNodeId: 0 },
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
  operationName: "StopDbNode",
})) as any;

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
  descriptor: {
    service: svc,
    input: { autonomousDatabaseId: 0, peerDbArn: 0 },
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
  operationName: "SwitchoverAutonomousDatabase",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tags: 0 } },
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      autonomousDatabaseId: 0,
      adminPassword: 0,
      computeCount: 0,
      cpuCoreCount: 0,
      dataStorageSizeInTBs: 0,
      dataStorageSizeInGBs: 0,
      displayName: 0,
      dbName: 0,
      dbVersion: 0,
      dbWorkload: 0,
      dbToolsDetails: D.list(i_DatabaseTool),
      databaseEdition: 0,
      licenseModel: 0,
      isAutoScalingEnabled: 0,
      isAutoScalingForStorageEnabled: 0,
      isBackupRetentionLocked: 0,
      isLocalDataGuardEnabled: 0,
      isMtlsConnectionRequired: 0,
      isRefreshableClone: 0,
      isDisconnectPeer: 0,
      backupRetentionPeriodInDays: 0,
      byolComputeCountLimit: 0,
      localAdgAutoFailoverMaxDataLossLimit: 0,
      autonomousMaintenanceScheduleType: 0,
      customerContactsToSendToOCI: D.list(i_CustomerContact),
      scheduledOperations: D.list(i_ScheduledOperationDetails),
      longTermBackupSchedule: {
        isDisabled: 0,
        repeatCadence: 0,
        retentionPeriodInDays: 0,
        timeOfBackup: D.tsAs("date-time"),
      },
      openMode: 0,
      permissionLevel: 0,
      refreshableMode: 0,
      privateEndpointIp: 0,
      privateEndpointLabel: 0,
      peerDbId: 0,
      resourcePoolLeaderId: 0,
      resourcePoolSummary: i_ResourcePoolSummary,
      standbyAllowlistedIpsSource: 0,
      standbyAllowlistedIps: 0,
      allowlistedIps: 0,
      autoRefreshFrequencyInSeconds: 0,
      autoRefreshPointLagInSeconds: 0,
      timeOfAutoRefreshStart: D.tsAs("date-time"),
      encryptionKeyProvider: 0,
      encryptionKeyConfiguration: i_EncryptionKeyConfigurationInput,
      adminPasswordSource: 0,
      adminPasswordSourceConfiguration: i_AdminPasswordSourceConfigurationInput,
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
  operationName: "UpdateAutonomousDatabase",
})) as any;

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
  descriptor: {
    service: svc,
    input: { autonomousDatabaseBackupId: 0, retentionPeriodInDays: 0 },
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
  operationName: "UpdateAutonomousDatabaseBackup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      cloudExadataInfrastructureId: 0,
      maintenanceWindow: i_MaintenanceWindow,
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
  operationName: "UpdateCloudExadataInfrastructure",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      exadbVmClusterId: 0,
      dataCollectionOptions: i_DataCollectionOptions,
      displayName: 0,
      enabledEcpuCount: 0,
      gridImageId: 0,
      licenseModel: 0,
      sshPublicKeys: 0,
      systemVersion: 0,
      totalEcpuCount: 0,
      updateAction: 0,
      vmFileSystemStorageTotalSizeInGBs: 0,
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
  operationName: "UpdateExadbVmCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      exascaleDbStorageVaultId: 0,
      additionalFlashCacheInPercent: 0,
      autoscaleLimitInGBs: 0,
      description: 0,
      displayName: 0,
      highCapacityDatabaseStorageTotalSizeInGBs: 0,
      isAutoscaleEnabled: 0,
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
  operationName: "UpdateExascaleDbStorageVault",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      odbNetworkId: 0,
      displayName: 0,
      peeredCidrsToBeAdded: 0,
      peeredCidrsToBeRemoved: 0,
      s3Access: 0,
      zeroEtlAccess: 0,
      stsAccess: 0,
      kmsAccess: 0,
      s3PolicyDocument: 0,
      stsPolicyDocument: 0,
      kmsPolicyDocument: 0,
      crossRegionS3RestoreSourcesToEnable: 0,
      crossRegionS3RestoreSourcesToDisable: 0,
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
  operationName: "UpdateOdbNetwork",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      odbPeeringConnectionId: 0,
      displayName: 0,
      peerNetworkCidrsToBeAdded: 0,
      peerNetworkCidrsToBeRemoved: 0,
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
  operationName: "UpdateOdbPeeringConnection",
})) as any;

const i_AdminPasswordSourceConfigurationInput: D.LazyStruct = () => ({
  customerManagedAwsSecret: i_CustomerManagedAwsSecretConfigurationInput,
});
const i_CustomerContact: D.LazyStruct = () => ({ email: 0 });
const i_CustomerManagedAwsSecretConfigurationInput: D.LazyStruct = () => ({
  secretId: 0,
  iamRoleArn: 0,
  externalIdType: 0,
});
const i_DataCollectionOptions: D.LazyStruct = () => ({
  isDiagnosticsEventsEnabled: 0,
  isHealthMonitoringEnabled: 0,
  isIncidentLogsEnabled: 0,
});
const i_DatabaseTool: D.LazyStruct = () => ({
  isEnabled: 0,
  name: 0,
  computeCount: 0,
  maxIdleTimeInMinutes: 0,
});
const i_EncryptionKeyConfigurationInput: D.LazyStruct = () => ({
  awsEncryptionKey: { iamRoleArn: 0, externalIdType: 0, kmsKeyId: 0 },
});
const i_MaintenanceWindow: D.LazyStruct = () => ({
  customActionTimeoutInMins: 0,
  daysOfWeek: D.list(i_DayOfWeek),
  hoursOfDay: 0,
  isCustomActionTimeoutEnabled: 0,
  leadTimeInWeeks: 0,
  months: D.list({ name: 0 }),
  patchingMode: 0,
  preference: 0,
  skipRu: 0,
  weeksOfMonth: 0,
});
const i_ResourcePoolSummary: D.LazyStruct = () => ({
  isDisabled: 0,
  poolSize: 0,
  poolStorageSizeInTBs: 0,
  availableStorageCapacityInTBs: 0,
  totalComputeCapacity: 0,
  availableComputeCapacity: 0,
});
const i_ScheduledOperationDetails: D.LazyStruct = () => ({
  dayOfWeek: i_DayOfWeek,
  scheduledStartTime: 0,
  scheduledStopTime: 0,
});
const o_AutonomousDatabaseSummary: D.LazyStruct = () => ({
  customerContacts: D.list(o_CustomerContact),
  standbyDb: o_DatabaseStandbySummary,
  localStandbyDb: o_DatabaseStandbySummary,
  remoteDisasterRecoveryConfiguration: o_DisasterRecoveryConfiguration,
  longTermBackupSchedule: o_LongTermBackupSchedule,
  createdAt: D.ts,
  timeOfLastBackup: D.ts,
  timeMaintenanceBegin: D.ts,
  timeMaintenanceEnd: D.ts,
  timeLocalDataGuardEnabled: D.ts,
  timeDataGuardRoleChanged: D.ts,
  timeOfLastSwitchover: D.ts,
  timeOfLastFailover: D.ts,
  timeOfLastRefresh: D.ts,
  timeOfLastRefreshPoint: D.ts,
  timeOfNextRefresh: D.ts,
  timeOfAutoRefreshStart: D.ts,
  timeDeletionOfFreeAutonomousDatabase: D.ts,
  timeReclamationOfFreeAutonomousDatabase: D.ts,
  timeDisasterRecoveryRoleChanged: D.ts,
  timeUntilReconnectCloneEnabled: D.ts,
  nextLongTermBackupTimeStamp: D.ts,
  timeUndeleted: D.ts,
});
const o_CustomerContact: D.LazyStruct = () => ({ email: D.secret });
const o_DatabaseStandbySummary: D.LazyStruct = () => ({
  timeDataGuardRoleChanged: D.ts,
  timeDisasterRecoveryRoleChanged: D.ts,
  timeMaintenanceBegin: D.ts,
  timeMaintenanceEnd: D.ts,
});
const o_DisasterRecoveryConfiguration: D.LazyStruct = () => ({
  timeSnapshotStandbyEnabledTill: D.ts,
});
const o_LongTermBackupSchedule: D.LazyStruct = () => ({ timeOfBackup: D.ts });
const i_DayOfWeek: D.LazyStruct = () => ({ name: 0 });
