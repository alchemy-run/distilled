import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Backup",
  target: "CryoControllerUserManager",
  version: "2018-11-15",
  sigv4: "backup",
  protocol: restJson1Protocol,
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
                `https://backup-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://backup-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://backup.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://backup.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("AlreadyExistsException", [
    "AlreadyExistsError",
  ])<{
    readonly Code?: string;
    readonly message?: string;
    readonly CreatorRequestId?: string;
    readonly Arn?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class DependencyFailureException
  extends /*@__PURE__*/ TE.TaggedError("DependencyFailureException")<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterValueException")<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceStateException")<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class MissingParameterValueException
  extends /*@__PURE__*/ TE.TaggedError("MissingParameterValueException")<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("ServiceUnavailableException", [
    "ServerError",
  ])<{
    readonly Code?: string;
    readonly message?: string;
    readonly Type?: string;
    readonly Context?: string;
  }> {}
export type BackupVaultName = string;
export type ARN = string;
export type RequesterComment = string | redacted.Redacted<string>;
export interface AssociateBackupVaultMpaApprovalTeamInput {
  BackupVaultName: string;
  MpaApprovalTeamArn: string;
  RequesterComment?: string | redacted.Redacted<string>;
}
export interface AssociateBackupVaultMpaApprovalTeamResponse {}
export interface CancelLegalHoldInput {
  LegalHoldId: string;
  CancelDescription: string;
  RetainRecordInDays?: number;
}
export interface CancelLegalHoldOutput {}
export type AccessPointMetadataMapKeyString = string;
export type AccessPointMetadataMapValueString = string;
export type AccessPointMetadataMap = { [key: string]: string | undefined };
export type AccessPointPolicy = string;
export type AccessPointName = string;
export type RecoveryPointArn = string;
export type TagMapKeyString = string;
export type TagMapValueString = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateBackupAccessPointRequest {
  AccessPointMetadata?: { [key: string]: string | undefined };
  AccessPointPolicy?: string;
  Name: string;
  RecoveryPointArn: string;
  Tags?: { [key: string]: string | undefined };
}
export type AccessPointArn = string;
export type AccessPointStatus =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "DISASSOCIATED"
  | "DISASSOCIATING"
  | "EXPIRED"
  | "FAILED"
  | (string & {});
export interface CreateBackupAccessPointResponse {
  AccessPointArn: string;
  Status: AccessPointStatus;
}
export type BackupPlanName = string;
export type BackupRuleName = string;
export type CronExpression = string;
export type WindowMinutes = number;
export type LifecycleDeleteAfterEvent = "DELETE_AFTER_COPY" | (string & {});
export interface Lifecycle {
  MoveToColdStorageAfterDays?: number;
  DeleteAfterDays?: number;
  OptInToArchiveForSupportedResources?: boolean;
  DeleteAfterEvent?: LifecycleDeleteAfterEvent;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CopyAction {
  Lifecycle?: Lifecycle;
  DestinationBackupVaultArn: string;
}
export type CopyActions = CopyAction[];
export type Timezone = string;
export type ResourceType = string;
export type ResourceTypes = string[];
export interface IndexAction {
  ResourceTypes?: string[];
}
export type IndexActions = IndexAction[];
export type MalwareScanner = "GUARDDUTY" | (string & {});
export type ScanMode = "FULL_SCAN" | "INCREMENTAL_SCAN" | (string & {});
export interface ScanAction {
  MalwareScanner?: MalwareScanner;
  ScanMode?: ScanMode;
}
export type ScanActions = ScanAction[];
export interface BackupRuleInput {
  RuleName: string;
  TargetBackupVaultName: string;
  TargetLogicallyAirGappedBackupVaultArn?: string;
  ScheduleExpression?: string;
  StartWindowMinutes?: number;
  CompletionWindowMinutes?: number;
  Lifecycle?: Lifecycle;
  RecoveryPointTags?: { [key: string]: string | undefined };
  CopyActions?: CopyAction[];
  EnableContinuousBackup?: boolean;
  ScheduleExpressionTimezone?: string;
  IndexActions?: IndexAction[];
  ScanActions?: ScanAction[];
}
export type BackupRulesInput = BackupRuleInput[];
export type BackupOptionKey = string;
export type BackupOptionValue = string;
export type BackupOptions = { [key: string]: string | undefined };
export interface AdvancedBackupSetting {
  ResourceType?: string;
  BackupOptions?: { [key: string]: string | undefined };
}
export type AdvancedBackupSettings = AdvancedBackupSetting[];
export type IAMRoleArn = string;
export interface ScanSetting {
  MalwareScanner?: MalwareScanner;
  ResourceTypes?: string[];
  ScannerRoleArn?: string;
}
export type ScanSettings = ScanSetting[];
export interface BackupPlanInput {
  BackupPlanName: string;
  Rules: BackupRuleInput[];
  AdvancedBackupSettings?: AdvancedBackupSetting[];
  ScanSettings?: ScanSetting[];
}
export interface CreateBackupPlanInput {
  BackupPlan: BackupPlanInput;
  BackupPlanTags?: { [key: string]: string | undefined };
  CreatorRequestId?: string;
}
export interface CreateBackupPlanOutput {
  BackupPlanId?: string;
  BackupPlanArn?: string;
  CreationDate?: Date;
  VersionId?: string;
  AdvancedBackupSettings?: AdvancedBackupSetting[];
}
export type BackupSelectionName = string;
export type ResourceArns = string[];
export type ConditionType = "STRINGEQUALS" | (string & {});
export type ConditionKey = string;
export type ConditionValue = string;
export interface Condition {
  ConditionType: ConditionType;
  ConditionKey: string;
  ConditionValue: string;
}
export type ListOfTags = Condition[];
export interface ConditionParameter {
  ConditionKey?: string;
  ConditionValue?: string;
}
export type ConditionParameters = ConditionParameter[];
export interface Conditions {
  StringEquals?: ConditionParameter[];
  StringNotEquals?: ConditionParameter[];
  StringLike?: ConditionParameter[];
  StringNotLike?: ConditionParameter[];
}
export interface BackupSelection {
  SelectionName: string;
  IamRoleArn: string;
  Resources?: string[];
  ListOfTags?: Condition[];
  NotResources?: string[];
  Conditions?: Conditions;
}
export interface CreateBackupSelectionInput {
  BackupPlanId: string;
  BackupSelection: BackupSelection;
  CreatorRequestId?: string;
}
export interface CreateBackupSelectionOutput {
  SelectionId?: string;
  BackupPlanId?: string;
  CreationDate?: Date;
}
export interface CreateBackupVaultInput {
  BackupVaultName: string;
  BackupVaultTags?: { [key: string]: string | undefined };
  EncryptionKeyArn?: string;
  CreatorRequestId?: string;
}
export interface CreateBackupVaultOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  CreationDate?: Date;
}
export type FrameworkName = string;
export type FrameworkDescription = string;
export type ControlName = string;
export type ParameterName = string;
export type ParameterValue = string;
export interface ControlInputParameter {
  ParameterName?: string;
  ParameterValue?: string;
}
export type ControlInputParameters = ControlInputParameter[];
export type ComplianceResourceIdList = string[];
export type ResourceTypeList = string[];
export type StringMap = { [key: string]: string | undefined };
export interface ControlScope {
  ComplianceResourceIds?: string[];
  ComplianceResourceTypes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export interface FrameworkControl {
  ControlName: string;
  ControlInputParameters?: ControlInputParameter[];
  ControlScope?: ControlScope;
}
export type FrameworkControls = FrameworkControl[];
export interface CreateFrameworkInput {
  FrameworkName: string;
  FrameworkDescription?: string;
  FrameworkControls: FrameworkControl[];
  IdempotencyToken?: string;
  FrameworkTags?: { [key: string]: string | undefined };
}
export interface CreateFrameworkOutput {
  FrameworkName?: string;
  FrameworkArn?: string;
}
export type VaultNames = string[];
export type ResourceIdentifiers = string[];
export interface DateRange {
  FromDate: Date;
  ToDate: Date;
}
export interface RecoveryPointSelection {
  VaultNames?: string[];
  ResourceIdentifiers?: string[];
  DateRange?: DateRange;
}
export interface CreateLegalHoldInput {
  Title: string;
  Description: string;
  IdempotencyToken?: string;
  RecoveryPointSelection?: RecoveryPointSelection;
  Tags?: { [key: string]: string | undefined };
}
export type LegalHoldStatus =
  | "CREATING"
  | "ACTIVE"
  | "CANCELING"
  | "CANCELED"
  | (string & {});
export interface CreateLegalHoldOutput {
  Title?: string;
  Status?: LegalHoldStatus;
  Description?: string;
  LegalHoldId?: string;
  LegalHoldArn?: string;
  CreationDate?: Date;
  RecoveryPointSelection?: RecoveryPointSelection;
}
export interface CreateLogicallyAirGappedBackupVaultInput {
  BackupVaultName: string;
  BackupVaultTags?: { [key: string]: string | undefined };
  CreatorRequestId?: string;
  MinRetentionDays: number;
  MaxRetentionDays: number;
  EncryptionKeyArn?: string;
}
export type VaultState = "CREATING" | "AVAILABLE" | "FAILED" | (string & {});
export interface CreateLogicallyAirGappedBackupVaultOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  CreationDate?: Date;
  VaultState?: VaultState;
}
export type ReportPlanName = string;
export type ReportPlanDescription = string;
export type FormatList = string[];
export interface ReportDeliveryChannel {
  S3BucketName: string;
  S3KeyPrefix?: string;
  Formats?: string[];
}
export type StringList = string[];
export interface ReportSetting {
  ReportTemplate: string;
  FrameworkArns?: string[];
  NumberOfFrameworks?: number;
  Accounts?: string[];
  OrganizationUnits?: string[];
  Regions?: string[];
}
export interface CreateReportPlanInput {
  ReportPlanName: string;
  ReportPlanDescription?: string;
  ReportDeliveryChannel: ReportDeliveryChannel;
  ReportSetting: ReportSetting;
  ReportPlanTags?: { [key: string]: string | undefined };
  IdempotencyToken?: string;
}
export interface CreateReportPlanOutput {
  ReportPlanName?: string;
  ReportPlanArn?: string;
  CreationTime?: Date;
}
export interface CreateRestoreAccessBackupVaultInput {
  SourceBackupVaultArn: string;
  BackupVaultName?: string;
  BackupVaultTags?: { [key: string]: string | undefined };
  CreatorRequestId?: string;
  RequesterComment?: string | redacted.Redacted<string>;
}
export interface CreateRestoreAccessBackupVaultOutput {
  RestoreAccessBackupVaultArn?: string;
  VaultState?: VaultState;
  RestoreAccessBackupVaultName?: string;
  CreationDate?: Date;
}
export type RestoreTestingRecoveryPointSelectionAlgorithm =
  | "LATEST_WITHIN_WINDOW"
  | "RANDOM_WITHIN_WINDOW"
  | (string & {});
export type RestoreTestingRecoveryPointType =
  | "CONTINUOUS"
  | "SNAPSHOT"
  | (string & {});
export type RestoreTestingRecoveryPointTypeList =
  RestoreTestingRecoveryPointType[];
export interface RestoreTestingRecoveryPointSelection {
  Algorithm?: RestoreTestingRecoveryPointSelectionAlgorithm;
  ExcludeVaults?: string[];
  IncludeVaults?: string[];
  RecoveryPointTypes?: RestoreTestingRecoveryPointType[];
  SelectionWindowDays?: number;
}
export interface RestoreTestingPlanForCreate {
  RecoveryPointSelection: RestoreTestingRecoveryPointSelection;
  RestoreTestingPlanName: string;
  ScheduleExpression: string;
  ScheduleExpressionTimezone?: string;
  StartWindowHours?: number;
}
export type SensitiveStringMap = { [key: string]: string | undefined };
export interface CreateRestoreTestingPlanInput {
  CreatorRequestId?: string;
  RestoreTestingPlan: RestoreTestingPlanForCreate;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRestoreTestingPlanOutput {
  CreationTime: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
}
export interface KeyValue {
  Key: string;
  Value: string;
}
export type KeyValueList = KeyValue[];
export interface ProtectedResourceConditions {
  StringEquals?: KeyValue[];
  StringNotEquals?: KeyValue[];
}
export interface RestoreTestingSelectionForCreate {
  IamRoleArn: string;
  ProtectedResourceArns?: string[];
  ProtectedResourceConditions?: ProtectedResourceConditions;
  ProtectedResourceType: string;
  RestoreMetadataOverrides?: { [key: string]: string | undefined };
  RestoreTestingSelectionName: string;
  ValidationWindowHours?: number;
}
export interface CreateRestoreTestingSelectionInput {
  CreatorRequestId?: string;
  RestoreTestingPlanName: string;
  RestoreTestingSelection: RestoreTestingSelectionForCreate;
}
export interface CreateRestoreTestingSelectionOutput {
  CreationTime: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
}
export type TieringConfigurationName = string;
export type BackupVaultNameOrWildcard = string;
export type TieringDownSettingsInDays = number;
export interface ResourceSelection {
  Resources: string[];
  TieringDownSettingsInDays: number;
  ResourceType: string;
}
export type ResourceSelections = ResourceSelection[];
export interface TieringConfigurationInputForCreate {
  TieringConfigurationName: string;
  BackupVaultName: string;
  ResourceSelection: ResourceSelection[];
}
export type CreatorRequestId = string;
export interface CreateTieringConfigurationInput {
  TieringConfiguration: TieringConfigurationInputForCreate;
  TieringConfigurationTags?: { [key: string]: string | undefined };
  CreatorRequestId?: string;
}
export interface CreateTieringConfigurationOutput {
  TieringConfigurationArn?: string;
  TieringConfigurationName?: string;
  CreationTime?: Date;
}
export interface DeleteBackupAccessPointInput {
  AccessPointArn: string;
}
export interface DeleteBackupAccessPointResponse {}
export interface DeleteBackupPlanInput {
  BackupPlanId: string;
}
export interface DeleteBackupPlanOutput {
  BackupPlanId?: string;
  BackupPlanArn?: string;
  DeletionDate?: Date;
  VersionId?: string;
}
export interface DeleteBackupSelectionInput {
  BackupPlanId: string;
  SelectionId: string;
}
export interface DeleteBackupSelectionResponse {}
export interface DeleteBackupVaultInput {
  BackupVaultName: string;
}
export interface DeleteBackupVaultResponse {}
export interface DeleteBackupVaultAccessPolicyInput {
  BackupVaultName: string;
}
export interface DeleteBackupVaultAccessPolicyResponse {}
export interface DeleteBackupVaultLockConfigurationInput {
  BackupVaultName: string;
}
export interface DeleteBackupVaultLockConfigurationResponse {}
export interface DeleteBackupVaultNotificationsInput {
  BackupVaultName: string;
}
export interface DeleteBackupVaultNotificationsResponse {}
export interface DeleteFrameworkInput {
  FrameworkName: string;
}
export interface DeleteFrameworkResponse {}
export interface DeleteRecoveryPointInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export interface DeleteRecoveryPointResponse {}
export interface DeleteReportPlanInput {
  ReportPlanName: string;
}
export interface DeleteReportPlanResponse {}
export interface DeleteRestoreTestingPlanInput {
  RestoreTestingPlanName: string;
}
export interface DeleteRestoreTestingPlanResponse {}
export interface DeleteRestoreTestingSelectionInput {
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
}
export interface DeleteRestoreTestingSelectionResponse {}
export interface DeleteTieringConfigurationInput {
  TieringConfigurationName: string;
}
export interface DeleteTieringConfigurationOutput {}
export interface DescribeBackupAccessPointInput {
  AccessPointArn: string;
}
export type BackupVaultArn = string;
export type ResourceArn = string;
export interface DescribeBackupAccessPointResponse {
  AccessPointArn: string;
  AccessPointMetadata?: { [key: string]: string | undefined };
  BackupVaultArn?: string;
  BackupVaultName: string;
  CreationTime: Date;
  Name: string;
  RecoveryPointArn: string;
  ResourceArn: string;
  ResourceType: string;
  Status: AccessPointStatus;
  StatusMessage?: string;
}
export interface DescribeBackupJobInput {
  BackupJobId: string;
}
export type AccountId = string;
export type BackupJobState =
  | "CREATED"
  | "PENDING"
  | "RUNNING"
  | "ABORTING"
  | "ABORTED"
  | "COMPLETED"
  | "FAILED"
  | "EXPIRED"
  | "PARTIAL"
  | (string & {});
export interface RecoveryPointCreator {
  BackupPlanId?: string;
  BackupPlanArn?: string;
  BackupPlanName?: string;
  BackupPlanVersion?: string;
  BackupRuleId?: string;
  BackupRuleName?: string;
  BackupRuleCron?: string;
  BackupRuleTimezone?: string;
}
export type BackupJobChildJobsInState = { [key in BackupJobState]?: number };
export interface DescribeBackupJobOutput {
  AccountId?: string;
  BackupJobId?: string;
  BackupVaultName?: string;
  RecoveryPointLifecycle?: Lifecycle;
  BackupVaultArn?: string;
  VaultType?: string;
  VaultLockState?: string;
  RecoveryPointArn?: string;
  EncryptionKeyArn?: string;
  IsEncrypted?: boolean;
  ResourceArn?: string;
  CreationDate?: Date;
  CompletionDate?: Date;
  State?: BackupJobState;
  StatusMessage?: string;
  PercentDone?: string;
  BackupSizeInBytes?: number;
  IamRoleArn?: string;
  CreatedBy?: RecoveryPointCreator;
  ResourceType?: string;
  BytesTransferred?: number;
  ExpectedCompletionDate?: Date;
  StartBy?: Date;
  BackupOptions?: { [key: string]: string | undefined };
  BackupType?: string;
  ParentJobId?: string;
  IsParent?: boolean;
  NumberOfChildJobs?: number;
  ChildJobsInState?: { [key: string]: number | undefined };
  ResourceName?: string;
  InitiationDate?: Date;
  MessageCategory?: string;
}
export interface DescribeBackupVaultInput {
  BackupVaultName: string;
  BackupVaultAccountId?: string;
}
export type VaultType =
  | "BACKUP_VAULT"
  | "LOGICALLY_AIR_GAPPED_BACKUP_VAULT"
  | "RESTORE_ACCESS_BACKUP_VAULT"
  | (string & {});
export type Long2 = number;
export type MpaSessionStatus =
  | "PENDING"
  | "APPROVED"
  | "FAILED"
  | (string & {});
export interface LatestMpaApprovalTeamUpdate {
  MpaSessionArn?: string;
  Status?: MpaSessionStatus;
  StatusMessage?: string;
  InitiationDate?: Date;
  ExpiryDate?: Date;
}
export type EncryptionKeyType =
  | "AWS_OWNED_KMS_KEY"
  | "CUSTOMER_MANAGED_KMS_KEY"
  | (string & {});
export interface DescribeBackupVaultOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  VaultType?: VaultType;
  VaultState?: VaultState;
  EncryptionKeyArn?: string;
  CreationDate?: Date;
  CreatorRequestId?: string;
  NumberOfRecoveryPoints?: number;
  Locked?: boolean;
  MinRetentionDays?: number;
  MaxRetentionDays?: number;
  LockDate?: Date;
  SourceBackupVaultArn?: string;
  MpaApprovalTeamArn?: string;
  MpaSessionArn?: string;
  LatestMpaApprovalTeamUpdate?: LatestMpaApprovalTeamUpdate;
  EncryptionKeyType?: EncryptionKeyType;
}
export interface DescribeCopyJobInput {
  CopyJobId: string;
}
export type CopyJobState =
  | "CREATED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "PARTIAL"
  | (string & {});
export type CopyJobChildJobsInState = { [key in CopyJobState]?: number };
export interface CopyJob {
  AccountId?: string;
  CopyJobId?: string;
  SourceBackupVaultArn?: string;
  SourceRecoveryPointArn?: string;
  DestinationBackupVaultArn?: string;
  DestinationVaultType?: string;
  DestinationVaultLockState?: string;
  DestinationRecoveryPointArn?: string;
  DestinationEncryptionKeyArn?: string;
  DestinationRecoveryPointLifecycle?: Lifecycle;
  ResourceArn?: string;
  CreationDate?: Date;
  CompletionDate?: Date;
  State?: CopyJobState;
  StatusMessage?: string;
  BackupSizeInBytes?: number;
  IamRoleArn?: string;
  CreatedBy?: RecoveryPointCreator;
  CreatedByBackupJobId?: string;
  ResourceType?: string;
  ParentJobId?: string;
  IsParent?: boolean;
  CompositeMemberIdentifier?: string;
  NumberOfChildJobs?: number;
  ChildJobsInState?: { [key: string]: number | undefined };
  ResourceName?: string;
  MessageCategory?: string;
}
export interface DescribeCopyJobOutput {
  CopyJob?: CopyJob;
}
export interface DescribeFrameworkInput {
  FrameworkName: string;
}
export interface DescribeFrameworkOutput {
  FrameworkName?: string;
  FrameworkArn?: string;
  FrameworkDescription?: string;
  FrameworkControls?: FrameworkControl[];
  CreationTime?: Date;
  DeploymentStatus?: string;
  FrameworkStatus?: string;
  IdempotencyToken?: string;
}
export interface DescribeGlobalSettingsInput {}
export type GlobalSettingsName = string;
export type GlobalSettingsValue = string;
export type GlobalSettings = { [key: string]: string | undefined };
export interface DescribeGlobalSettingsOutput {
  GlobalSettings?: { [key: string]: string | undefined };
  LastUpdateTime?: Date;
}
export interface DescribeProtectedResourceInput {
  ResourceArn: string;
}
export interface DescribeProtectedResourceOutput {
  ResourceArn?: string;
  ResourceType?: string;
  LastBackupTime?: Date;
  ResourceName?: string;
  LastBackupVaultArn?: string;
  LastRecoveryPointArn?: string;
  LatestRestoreExecutionTimeMinutes?: number;
  LatestRestoreJobCreationDate?: Date;
  LatestRestoreRecoveryPointCreationDate?: Date;
}
export interface DescribeRecoveryPointInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
  BackupVaultAccountId?: string;
}
export type RecoveryPointStatus =
  | "COMPLETED"
  | "PARTIAL"
  | "DELETING"
  | "EXPIRED"
  | "AVAILABLE"
  | "STOPPED"
  | "CREATING"
  | (string & {});
export interface CalculatedLifecycle {
  MoveToColdStorageAt?: Date;
  DeleteAt?: Date;
}
export type StorageClass = "WARM" | "COLD" | "DELETED" | (string & {});
export type IndexStatus =
  | "PENDING"
  | "ACTIVE"
  | "FAILED"
  | "DELETING"
  | (string & {});
export type ScanJobState =
  | "COMPLETED"
  | "COMPLETED_WITH_ISSUES"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export type ScanFinding = "MALWARE" | (string & {});
export type ScanFindings = ScanFinding[];
export interface ScanResult {
  MalwareScanner?: MalwareScanner;
  ScanJobState?: ScanJobState;
  LastScanTimestamp?: Date;
  Findings?: ScanFinding[];
}
export type ScanResults = ScanResult[];
export interface DescribeRecoveryPointOutput {
  RecoveryPointArn?: string;
  BackupVaultName?: string;
  BackupVaultArn?: string;
  SourceBackupVaultArn?: string;
  ResourceArn?: string;
  ResourceType?: string;
  CreatedBy?: RecoveryPointCreator;
  IamRoleArn?: string;
  Status?: RecoveryPointStatus;
  StatusMessage?: string;
  CreationDate?: Date;
  InitiationDate?: Date;
  CompletionDate?: Date;
  BackupSizeInBytes?: number;
  CalculatedLifecycle?: CalculatedLifecycle;
  Lifecycle?: Lifecycle;
  EncryptionKeyArn?: string;
  IsEncrypted?: boolean;
  StorageClass?: StorageClass;
  LastRestoreTime?: Date;
  ParentRecoveryPointArn?: string;
  CompositeMemberIdentifier?: string;
  IsParent?: boolean;
  ResourceName?: string;
  VaultType?: VaultType;
  IndexStatus?: IndexStatus;
  IndexStatusMessage?: string;
  EncryptionKeyType?: EncryptionKeyType;
  ScanResults?: ScanResult[];
}
export interface DescribeRegionSettingsInput {}
export type IsEnabled = boolean;
export type ResourceTypeOptInPreference = {
  [key: string]: boolean | undefined;
};
export type ResourceTypeManagementPreference = {
  [key: string]: boolean | undefined;
};
export interface DescribeRegionSettingsOutput {
  ResourceTypeOptInPreference?: { [key: string]: boolean | undefined };
  ResourceTypeManagementPreference?: { [key: string]: boolean | undefined };
}
export type ReportJobId = string;
export interface DescribeReportJobInput {
  ReportJobId: string;
}
export interface ReportDestination {
  S3BucketName?: string;
  S3Keys?: string[];
}
export interface ReportJob {
  ReportJobId?: string;
  ReportPlanArn?: string;
  ReportTemplate?: string;
  CreationTime?: Date;
  CompletionTime?: Date;
  Status?: string;
  StatusMessage?: string;
  ReportDestination?: ReportDestination;
}
export interface DescribeReportJobOutput {
  ReportJob?: ReportJob;
}
export interface DescribeReportPlanInput {
  ReportPlanName: string;
}
export interface ReportPlan {
  ReportPlanArn?: string;
  ReportPlanName?: string;
  ReportPlanDescription?: string;
  ReportSetting?: ReportSetting;
  ReportDeliveryChannel?: ReportDeliveryChannel;
  DeploymentStatus?: string;
  CreationTime?: Date;
  LastAttemptedExecutionTime?: Date;
  LastSuccessfulExecutionTime?: Date;
}
export interface DescribeReportPlanOutput {
  ReportPlan?: ReportPlan;
}
export type RestoreJobId = string;
export interface DescribeRestoreJobInput {
  RestoreJobId: string;
}
export type RestoreJobStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "ABORTED"
  | "FAILED"
  | (string & {});
export interface RestoreJobCreator {
  RestoreTestingPlanArn?: string;
}
export type RestoreValidationStatus =
  | "FAILED"
  | "SUCCESSFUL"
  | "TIMED_OUT"
  | "VALIDATING"
  | (string & {});
export type RestoreDeletionStatus =
  | "DELETING"
  | "FAILED"
  | "SUCCESSFUL"
  | (string & {});
export interface DescribeRestoreJobOutput {
  AccountId?: string;
  RestoreJobId?: string;
  RecoveryPointArn?: string;
  SourceResourceArn?: string;
  BackupVaultArn?: string;
  CreationDate?: Date;
  CompletionDate?: Date;
  Status?: RestoreJobStatus;
  StatusMessage?: string;
  PercentDone?: string;
  BackupSizeInBytes?: number;
  IamRoleArn?: string;
  ExpectedCompletionTimeMinutes?: number;
  CreatedResourceArn?: string;
  ResourceType?: string;
  RecoveryPointCreationDate?: Date;
  CreatedBy?: RestoreJobCreator;
  ValidationStatus?: RestoreValidationStatus;
  ValidationStatusMessage?: string;
  DeletionStatus?: RestoreDeletionStatus;
  DeletionStatusMessage?: string;
  IsParent?: boolean;
  ParentJobId?: string;
}
export interface DescribeScanJobInput {
  ScanJobId: string;
}
export interface ScanJobCreator {
  BackupPlanArn: string;
  BackupPlanId: string;
  BackupPlanVersion: string;
  BackupRuleId: string;
}
export type ScanResourceType = "EBS" | "EC2" | "S3" | (string & {});
export type ScanResultStatus =
  | "NO_THREATS_FOUND"
  | "THREATS_FOUND"
  | "UNKNOWN"
  | (string & {});
export interface ScanResultInfo {
  ScanResultStatus: ScanResultStatus;
}
export type ScanState =
  | "CANCELED"
  | "COMPLETED"
  | "COMPLETED_WITH_ISSUES"
  | "CREATED"
  | "FAILED"
  | "RUNNING"
  | (string & {});
export interface DescribeScanJobOutput {
  AccountId: string;
  BackupVaultArn: string;
  BackupVaultName: string;
  CompletionDate?: Date;
  ContinuousScanEndTime?: Date;
  ContinuousScanStartTime?: Date;
  CreatedBy: ScanJobCreator;
  CreationDate: Date;
  IamRoleArn: string;
  MalwareScanner: MalwareScanner;
  RecoveryPointArn: string;
  ResourceArn: string;
  ResourceName: string;
  ResourceType: ScanResourceType;
  ScanBaseRecoveryPointArn?: string;
  ScanId?: string;
  ScanJobId: string;
  ScanMode: ScanMode;
  ScanResult?: ScanResultInfo;
  ScannerRoleArn: string;
  State: ScanState;
  StatusMessage?: string;
}
export interface DisassociateBackupVaultMpaApprovalTeamInput {
  BackupVaultName: string;
  RequesterComment?: string | redacted.Redacted<string>;
}
export interface DisassociateBackupVaultMpaApprovalTeamResponse {}
export interface DisassociateRecoveryPointInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export interface DisassociateRecoveryPointResponse {}
export interface DisassociateRecoveryPointFromParentInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export interface DisassociateRecoveryPointFromParentResponse {}
export interface ExportBackupPlanTemplateInput {
  BackupPlanId: string;
}
export interface ExportBackupPlanTemplateOutput {
  BackupPlanTemplateJson?: string;
}
export type MaxScheduledRunsPreview = number;
export interface GetBackupPlanInput {
  BackupPlanId: string;
  VersionId?: string;
  MaxScheduledRunsPreview?: number;
}
export interface BackupRule {
  RuleName: string;
  TargetBackupVaultName: string;
  TargetLogicallyAirGappedBackupVaultArn?: string;
  ScheduleExpression?: string;
  StartWindowMinutes?: number;
  CompletionWindowMinutes?: number;
  Lifecycle?: Lifecycle;
  RecoveryPointTags?: { [key: string]: string | undefined };
  RuleId?: string;
  CopyActions?: CopyAction[];
  EnableContinuousBackup?: boolean;
  ScheduleExpressionTimezone?: string;
  IndexActions?: IndexAction[];
  ScanActions?: ScanAction[];
}
export type BackupRules = BackupRule[];
export interface BackupPlan {
  BackupPlanName: string;
  Rules: BackupRule[];
  AdvancedBackupSettings?: AdvancedBackupSetting[];
  ScanSettings?: ScanSetting[];
}
export type RuleExecutionType =
  | "CONTINUOUS"
  | "SNAPSHOTS"
  | "CONTINUOUS_AND_SNAPSHOTS"
  | (string & {});
export interface ScheduledPlanExecutionMember {
  ExecutionTime?: Date;
  RuleId?: string;
  RuleExecutionType?: RuleExecutionType;
}
export type ScheduledRunsPreview = ScheduledPlanExecutionMember[];
export interface GetBackupPlanOutput {
  BackupPlan?: BackupPlan;
  BackupPlanId?: string;
  BackupPlanArn?: string;
  VersionId?: string;
  CreatorRequestId?: string;
  CreationDate?: Date;
  DeletionDate?: Date;
  LastExecutionDate?: Date;
  AdvancedBackupSettings?: AdvancedBackupSetting[];
  ScheduledRunsPreview?: ScheduledPlanExecutionMember[];
}
export interface GetBackupPlanFromJSONInput {
  BackupPlanTemplateJson: string;
}
export interface GetBackupPlanFromJSONOutput {
  BackupPlan?: BackupPlan;
}
export interface GetBackupPlanFromTemplateInput {
  BackupPlanTemplateId: string;
}
export interface GetBackupPlanFromTemplateOutput {
  BackupPlanDocument?: BackupPlan;
}
export interface GetBackupSelectionInput {
  BackupPlanId: string;
  SelectionId: string;
}
export interface GetBackupSelectionOutput {
  BackupSelection?: BackupSelection;
  SelectionId?: string;
  BackupPlanId?: string;
  CreationDate?: Date;
  CreatorRequestId?: string;
}
export interface GetBackupVaultAccessPolicyInput {
  BackupVaultName: string;
}
export type IAMPolicy = string;
export interface GetBackupVaultAccessPolicyOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  Policy?: string;
}
export interface GetBackupVaultNotificationsInput {
  BackupVaultName: string;
}
export type BackupVaultEvent =
  | "BACKUP_JOB_STARTED"
  | "BACKUP_JOB_COMPLETED"
  | "BACKUP_JOB_SUCCESSFUL"
  | "BACKUP_JOB_FAILED"
  | "BACKUP_JOB_EXPIRED"
  | "RESTORE_JOB_STARTED"
  | "RESTORE_JOB_COMPLETED"
  | "RESTORE_JOB_SUCCESSFUL"
  | "RESTORE_JOB_FAILED"
  | "COPY_JOB_STARTED"
  | "COPY_JOB_SUCCESSFUL"
  | "COPY_JOB_FAILED"
  | "RECOVERY_POINT_MODIFIED"
  | "BACKUP_PLAN_CREATED"
  | "BACKUP_PLAN_MODIFIED"
  | "S3_BACKUP_OBJECT_FAILED"
  | "S3_RESTORE_OBJECT_FAILED"
  | "CONTINUOUS_BACKUP_INTERRUPTED"
  | "RECOVERY_POINT_INDEX_COMPLETED"
  | "RECOVERY_POINT_INDEX_DELETED"
  | "RECOVERY_POINT_INDEXING_FAILED"
  | "EKS_RESTORE_OBJECT_FAILED"
  | "EKS_RESTORE_OBJECT_SKIPPED"
  | "EKS_BACKUP_OBJECT_FAILED"
  | "ACCESS_POINT_AVAILABLE"
  | "ACCESS_POINT_CREATION_FAILED"
  | "ACCESS_POINT_DELETED"
  | "ACCESS_POINT_DELETION_FAILED"
  | "ACCESS_POINT_EXPIRED"
  | "ACCESS_POINT_DISASSOCIATED"
  | (string & {});
export type BackupVaultEvents = BackupVaultEvent[];
export interface GetBackupVaultNotificationsOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  SNSTopicArn?: string;
  BackupVaultEvents?: BackupVaultEvent[];
}
export interface GetLegalHoldInput {
  LegalHoldId: string;
}
export interface GetLegalHoldOutput {
  Title?: string;
  Status?: LegalHoldStatus;
  Description?: string;
  CancelDescription?: string;
  LegalHoldId?: string;
  LegalHoldArn?: string;
  CreationDate?: Date;
  CancellationDate?: Date;
  RetainRecordUntil?: Date;
  RecoveryPointSelection?: RecoveryPointSelection;
}
export interface GetPITRMalwareScanResultsInput {
  RecoveryPointArn: string;
  BackupVaultName: string;
  ScanEndTime: Date;
  MalwareScanner: MalwareScanner;
}
export interface GetPITRMalwareScanResultsOutput {
  ScanEndTime: Date;
  ScanResult: ScanResultInfo;
  LastScanJobTime?: Date;
  ScanId?: string;
  ScanMode?: ScanMode;
}
export interface GetRecoveryPointIndexDetailsInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export interface GetRecoveryPointIndexDetailsOutput {
  RecoveryPointArn?: string;
  BackupVaultArn?: string;
  SourceResourceArn?: string;
  IndexCreationDate?: Date;
  IndexDeletionDate?: Date;
  IndexCompletionDate?: Date;
  IndexStatus?: IndexStatus;
  IndexStatusMessage?: string;
  TotalItemsIndexed?: number;
}
export interface GetRecoveryPointRestoreMetadataInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
  BackupVaultAccountId?: string;
}
export type MetadataKey = string;
export type MetadataValue = string;
export type Metadata = { [key: string]: string | undefined };
export interface GetRecoveryPointRestoreMetadataOutput {
  BackupVaultArn?: string;
  RecoveryPointArn?: string;
  RestoreMetadata?: { [key: string]: string | undefined };
  ResourceType?: string;
}
export interface GetRestoreJobMetadataInput {
  RestoreJobId: string;
}
export interface GetRestoreJobMetadataOutput {
  RestoreJobId?: string;
  Metadata?: { [key: string]: string | undefined };
}
export interface GetRestoreTestingInferredMetadataInput {
  BackupVaultAccountId?: string;
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export interface GetRestoreTestingInferredMetadataOutput {
  InferredMetadata: { [key: string]: string | undefined };
}
export interface GetRestoreTestingPlanInput {
  RestoreTestingPlanName: string;
}
export interface RestoreTestingPlanForGet {
  CreationTime: Date;
  CreatorRequestId?: string;
  LastExecutionTime?: Date;
  LastUpdateTime?: Date;
  RecoveryPointSelection: RestoreTestingRecoveryPointSelection;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
  ScheduleExpression: string;
  ScheduleExpressionTimezone?: string;
  StartWindowHours?: number;
}
export interface GetRestoreTestingPlanOutput {
  RestoreTestingPlan: RestoreTestingPlanForGet;
}
export interface GetRestoreTestingSelectionInput {
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
}
export interface RestoreTestingSelectionForGet {
  CreationTime: Date;
  CreatorRequestId?: string;
  IamRoleArn: string;
  ProtectedResourceArns?: string[];
  ProtectedResourceConditions?: ProtectedResourceConditions;
  ProtectedResourceType: string;
  RestoreMetadataOverrides?: { [key: string]: string | undefined };
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
  ValidationWindowHours?: number;
}
export interface GetRestoreTestingSelectionOutput {
  RestoreTestingSelection: RestoreTestingSelectionForGet;
}
export interface GetSupportedResourceTypesRequest {}
export interface GetSupportedResourceTypesOutput {
  ResourceTypes?: string[];
}
export interface GetTieringConfigurationInput {
  TieringConfigurationName: string;
}
export interface TieringConfiguration {
  TieringConfigurationName: string;
  TieringConfigurationArn?: string;
  BackupVaultName: string;
  ResourceSelection: ResourceSelection[];
  CreatorRequestId?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export interface GetTieringConfigurationOutput {
  TieringConfiguration?: TieringConfiguration;
}
export type ListBackupAccessPointsRequestMaxResultsInteger = number;
export interface ListBackupAccessPointsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListAccessPointsMember {
  AccessPointArn: string;
  AccessPointMetadata: { [key: string]: string | undefined };
  BackupVaultArn?: string;
  BackupVaultName: string;
  CreationTime: Date;
  Name: string;
  RecoveryPointArn: string;
  ResourceArn: string;
  ResourceType: string;
  Status: AccessPointStatus;
  StatusMessage?: string;
}
export type BackupAccessPoints = ListAccessPointsMember[];
export interface ListBackupAccessPointsResponse {
  BackupAccessPoints: ListAccessPointsMember[];
  NextToken?: string;
}
export type ListBackupAccessPointsByRecoveryPointRequestMaxResultsInteger =
  number;
export interface ListBackupAccessPointsByRecoveryPointRequest {
  MaxResults?: number;
  NextToken?: string;
  RecoveryPointArn: string;
}
export interface ListBackupAccessPointsByRecoveryPointResponse {
  BackupAccessPoints: ListAccessPointsMember[];
  NextToken?: string;
}
export type ListBackupAccessPointsByResourceRequestMaxResultsInteger = number;
export interface ListBackupAccessPointsByResourceRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceArn: string;
}
export interface ListBackupAccessPointsByResourceResponse {
  BackupAccessPoints: ListAccessPointsMember[];
  NextToken?: string;
}
export type MaxResults = number;
export interface ListBackupJobsInput {
  NextToken?: string;
  MaxResults?: number;
  ByResourceArn?: string;
  ByState?: BackupJobState;
  ByBackupVaultName?: string;
  ByCreatedBefore?: Date;
  ByCreatedAfter?: Date;
  ByResourceType?: string;
  ByAccountId?: string;
  ByCompleteAfter?: Date;
  ByCompleteBefore?: Date;
  ByParentJobId?: string;
  ByMessageCategory?: string;
}
export interface BackupJob {
  AccountId?: string;
  BackupJobId?: string;
  BackupVaultName?: string;
  BackupVaultArn?: string;
  VaultType?: string;
  VaultLockState?: string;
  RecoveryPointArn?: string;
  RecoveryPointLifecycle?: Lifecycle;
  EncryptionKeyArn?: string;
  IsEncrypted?: boolean;
  ResourceArn?: string;
  CreationDate?: Date;
  CompletionDate?: Date;
  State?: BackupJobState;
  StatusMessage?: string;
  PercentDone?: string;
  BackupSizeInBytes?: number;
  IamRoleArn?: string;
  CreatedBy?: RecoveryPointCreator;
  ExpectedCompletionDate?: Date;
  StartBy?: Date;
  ResourceType?: string;
  BytesTransferred?: number;
  BackupOptions?: { [key: string]: string | undefined };
  BackupType?: string;
  ParentJobId?: string;
  IsParent?: boolean;
  ResourceName?: string;
  InitiationDate?: Date;
  MessageCategory?: string;
}
export type BackupJobsList = BackupJob[];
export interface ListBackupJobsOutput {
  BackupJobs?: BackupJob[];
  NextToken?: string;
}
export type BackupJobStatus =
  | "CREATED"
  | "PENDING"
  | "RUNNING"
  | "ABORTING"
  | "ABORTED"
  | "COMPLETED"
  | "FAILED"
  | "EXPIRED"
  | "PARTIAL"
  | "AGGREGATE_ALL"
  | "ANY"
  | (string & {});
export type MessageCategory = string;
export type AggregationPeriod =
  | "ONE_DAY"
  | "SEVEN_DAYS"
  | "FOURTEEN_DAYS"
  | (string & {});
export interface ListBackupJobSummariesInput {
  AccountId?: string;
  State?: BackupJobStatus;
  ResourceType?: string;
  MessageCategory?: string;
  AggregationPeriod?: AggregationPeriod;
  MaxResults?: number;
  NextToken?: string;
}
export type Region = string;
export interface BackupJobSummary {
  Region?: string;
  AccountId?: string;
  State?: BackupJobStatus;
  ResourceType?: string;
  MessageCategory?: string;
  Count?: number;
  StartTime?: Date;
  EndTime?: Date;
}
export type BackupJobSummaryList = BackupJobSummary[];
export interface ListBackupJobSummariesOutput {
  BackupJobSummaries?: BackupJobSummary[];
  AggregationPeriod?: string;
  NextToken?: string;
}
export interface ListBackupPlansInput {
  NextToken?: string;
  MaxResults?: number;
  IncludeDeleted?: boolean;
}
export interface BackupPlansListMember {
  BackupPlanArn?: string;
  BackupPlanId?: string;
  CreationDate?: Date;
  DeletionDate?: Date;
  VersionId?: string;
  BackupPlanName?: string;
  CreatorRequestId?: string;
  LastExecutionDate?: Date;
  AdvancedBackupSettings?: AdvancedBackupSetting[];
}
export type BackupPlansList = BackupPlansListMember[];
export interface ListBackupPlansOutput {
  NextToken?: string;
  BackupPlansList?: BackupPlansListMember[];
}
export interface ListBackupPlanTemplatesInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface BackupPlanTemplatesListMember {
  BackupPlanTemplateId?: string;
  BackupPlanTemplateName?: string;
}
export type BackupPlanTemplatesList = BackupPlanTemplatesListMember[];
export interface ListBackupPlanTemplatesOutput {
  NextToken?: string;
  BackupPlanTemplatesList?: BackupPlanTemplatesListMember[];
}
export interface ListBackupPlanVersionsInput {
  BackupPlanId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type BackupPlanVersionsList = BackupPlansListMember[];
export interface ListBackupPlanVersionsOutput {
  NextToken?: string;
  BackupPlanVersionsList?: BackupPlansListMember[];
}
export interface ListBackupSelectionsInput {
  BackupPlanId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface BackupSelectionsListMember {
  SelectionId?: string;
  SelectionName?: string;
  BackupPlanId?: string;
  CreationDate?: Date;
  CreatorRequestId?: string;
  IamRoleArn?: string;
}
export type BackupSelectionsList = BackupSelectionsListMember[];
export interface ListBackupSelectionsOutput {
  NextToken?: string;
  BackupSelectionsList?: BackupSelectionsListMember[];
}
export interface ListBackupVaultsInput {
  ByVaultType?: VaultType;
  ByShared?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export interface BackupVaultListMember {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  VaultType?: VaultType;
  VaultState?: VaultState;
  CreationDate?: Date;
  EncryptionKeyArn?: string;
  CreatorRequestId?: string;
  NumberOfRecoveryPoints?: number;
  Locked?: boolean;
  MinRetentionDays?: number;
  MaxRetentionDays?: number;
  LockDate?: Date;
  EncryptionKeyType?: EncryptionKeyType;
}
export type BackupVaultList = BackupVaultListMember[];
export interface ListBackupVaultsOutput {
  BackupVaultList?: BackupVaultListMember[];
  NextToken?: string;
}
export interface ListCopyJobsInput {
  NextToken?: string;
  MaxResults?: number;
  ByResourceArn?: string;
  ByState?: CopyJobState;
  ByCreatedBefore?: Date;
  ByCreatedAfter?: Date;
  ByResourceType?: string;
  ByDestinationVaultArn?: string;
  ByAccountId?: string;
  ByCompleteBefore?: Date;
  ByCompleteAfter?: Date;
  ByParentJobId?: string;
  ByMessageCategory?: string;
  BySourceRecoveryPointArn?: string;
}
export type CopyJobsList = CopyJob[];
export interface ListCopyJobsOutput {
  CopyJobs?: CopyJob[];
  NextToken?: string;
}
export type CopyJobStatus =
  | "CREATED"
  | "RUNNING"
  | "ABORTING"
  | "ABORTED"
  | "COMPLETING"
  | "COMPLETED"
  | "FAILING"
  | "FAILED"
  | "PARTIAL"
  | "AGGREGATE_ALL"
  | "ANY"
  | (string & {});
export interface ListCopyJobSummariesInput {
  AccountId?: string;
  State?: CopyJobStatus;
  ResourceType?: string;
  MessageCategory?: string;
  AggregationPeriod?: AggregationPeriod;
  MaxResults?: number;
  NextToken?: string;
}
export interface CopyJobSummary {
  Region?: string;
  AccountId?: string;
  State?: CopyJobStatus;
  ResourceType?: string;
  MessageCategory?: string;
  Count?: number;
  StartTime?: Date;
  EndTime?: Date;
}
export type CopyJobSummaryList = CopyJobSummary[];
export interface ListCopyJobSummariesOutput {
  CopyJobSummaries?: CopyJobSummary[];
  AggregationPeriod?: string;
  NextToken?: string;
}
export type MaxFrameworkInputs = number;
export interface ListFrameworksInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface Framework {
  FrameworkName?: string;
  FrameworkArn?: string;
  FrameworkDescription?: string;
  NumberOfControls?: number;
  CreationTime?: Date;
  DeploymentStatus?: string;
}
export type FrameworkList = Framework[];
export interface ListFrameworksOutput {
  Frameworks?: Framework[];
  NextToken?: string;
}
export interface ListIndexedRecoveryPointsInput {
  NextToken?: string;
  MaxResults?: number;
  SourceResourceArn?: string;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
  ResourceType?: string;
  IndexStatus?: IndexStatus;
}
export interface IndexedRecoveryPoint {
  RecoveryPointArn?: string;
  SourceResourceArn?: string;
  IamRoleArn?: string;
  BackupCreationDate?: Date;
  ResourceType?: string;
  IndexCreationDate?: Date;
  IndexStatus?: IndexStatus;
  IndexStatusMessage?: string;
  BackupVaultArn?: string;
}
export type IndexedRecoveryPointList = IndexedRecoveryPoint[];
export interface ListIndexedRecoveryPointsOutput {
  IndexedRecoveryPoints?: IndexedRecoveryPoint[];
  NextToken?: string;
}
export interface ListLegalHoldsInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface LegalHold {
  Title?: string;
  Status?: LegalHoldStatus;
  Description?: string;
  LegalHoldId?: string;
  LegalHoldArn?: string;
  CreationDate?: Date;
  CancellationDate?: Date;
}
export type LegalHoldsList = LegalHold[];
export interface ListLegalHoldsOutput {
  NextToken?: string;
  LegalHolds?: LegalHold[];
}
export interface ListProtectedResourcesInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface ProtectedResource {
  ResourceArn?: string;
  ResourceType?: string;
  LastBackupTime?: Date;
  ResourceName?: string;
  LastBackupVaultArn?: string;
  LastRecoveryPointArn?: string;
}
export type ProtectedResourcesList = ProtectedResource[];
export interface ListProtectedResourcesOutput {
  Results?: ProtectedResource[];
  NextToken?: string;
}
export interface ListProtectedResourcesByBackupVaultInput {
  BackupVaultName: string;
  BackupVaultAccountId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListProtectedResourcesByBackupVaultOutput {
  Results?: ProtectedResource[];
  NextToken?: string;
}
export interface ListRecoveryPointsByBackupVaultInput {
  BackupVaultName: string;
  BackupVaultAccountId?: string;
  NextToken?: string;
  MaxResults?: number;
  ByResourceArn?: string;
  ByResourceType?: string;
  ByBackupPlanId?: string;
  ByCreatedBefore?: Date;
  ByCreatedAfter?: Date;
  ByParentRecoveryPointArn?: string;
}
export interface AggregatedScanResult {
  FailedScan?: boolean;
  Findings?: ScanFinding[];
  LastComputed?: Date;
}
export interface RecoveryPointByBackupVault {
  RecoveryPointArn?: string;
  BackupVaultName?: string;
  BackupVaultArn?: string;
  SourceBackupVaultArn?: string;
  ResourceArn?: string;
  ResourceType?: string;
  CreatedBy?: RecoveryPointCreator;
  IamRoleArn?: string;
  Status?: RecoveryPointStatus;
  StatusMessage?: string;
  CreationDate?: Date;
  InitiationDate?: Date;
  CompletionDate?: Date;
  BackupSizeInBytes?: number;
  CalculatedLifecycle?: CalculatedLifecycle;
  Lifecycle?: Lifecycle;
  EncryptionKeyArn?: string;
  IsEncrypted?: boolean;
  LastRestoreTime?: Date;
  ParentRecoveryPointArn?: string;
  CompositeMemberIdentifier?: string;
  IsParent?: boolean;
  ResourceName?: string;
  VaultType?: VaultType;
  IndexStatus?: IndexStatus;
  IndexStatusMessage?: string;
  EncryptionKeyType?: EncryptionKeyType;
  AggregatedScanResult?: AggregatedScanResult;
}
export type RecoveryPointByBackupVaultList = RecoveryPointByBackupVault[];
export interface ListRecoveryPointsByBackupVaultOutput {
  NextToken?: string;
  RecoveryPoints?: RecoveryPointByBackupVault[];
}
export interface ListRecoveryPointsByLegalHoldInput {
  LegalHoldId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface RecoveryPointMember {
  RecoveryPointArn?: string;
  ResourceArn?: string;
  ResourceType?: string;
  BackupVaultName?: string;
}
export type RecoveryPointsList = RecoveryPointMember[];
export interface ListRecoveryPointsByLegalHoldOutput {
  RecoveryPoints?: RecoveryPointMember[];
  NextToken?: string;
}
export interface ListRecoveryPointsByResourceInput {
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
  ManagedByAWSBackupOnly?: boolean;
}
export interface RecoveryPointByResource {
  RecoveryPointArn?: string;
  CreationDate?: Date;
  Status?: RecoveryPointStatus;
  StatusMessage?: string;
  EncryptionKeyArn?: string;
  BackupSizeBytes?: number;
  BackupVaultName?: string;
  IsParent?: boolean;
  ParentRecoveryPointArn?: string;
  ResourceName?: string;
  VaultType?: VaultType;
  IndexStatus?: IndexStatus;
  IndexStatusMessage?: string;
  EncryptionKeyType?: EncryptionKeyType;
  AggregatedScanResult?: AggregatedScanResult;
}
export type RecoveryPointByResourceList = RecoveryPointByResource[];
export interface ListRecoveryPointsByResourceOutput {
  NextToken?: string;
  RecoveryPoints?: RecoveryPointByResource[];
}
export interface ListReportJobsInput {
  ByReportPlanName?: string;
  ByCreationBefore?: Date;
  ByCreationAfter?: Date;
  ByStatus?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ReportJobList = ReportJob[];
export interface ListReportJobsOutput {
  ReportJobs?: ReportJob[];
  NextToken?: string;
}
export interface ListReportPlansInput {
  MaxResults?: number;
  NextToken?: string;
}
export type ReportPlanList = ReportPlan[];
export interface ListReportPlansOutput {
  ReportPlans?: ReportPlan[];
  NextToken?: string;
}
export interface ListRestoreAccessBackupVaultsInput {
  BackupVaultName: string;
  NextToken?: string;
  MaxResults?: number;
}
export type MpaRevokeSessionStatus = "PENDING" | "FAILED" | (string & {});
export interface LatestRevokeRequest {
  MpaSessionArn?: string;
  Status?: MpaRevokeSessionStatus;
  StatusMessage?: string;
  InitiationDate?: Date;
  ExpiryDate?: Date;
}
export interface RestoreAccessBackupVaultListMember {
  RestoreAccessBackupVaultArn?: string;
  CreationDate?: Date;
  ApprovalDate?: Date;
  VaultState?: VaultState;
  LatestRevokeRequest?: LatestRevokeRequest;
}
export type RestoreAccessBackupVaultList = RestoreAccessBackupVaultListMember[];
export interface ListRestoreAccessBackupVaultsOutput {
  NextToken?: string;
  RestoreAccessBackupVaults?: RestoreAccessBackupVaultListMember[];
}
export interface ListRestoreJobsInput {
  NextToken?: string;
  MaxResults?: number;
  ByAccountId?: string;
  ByResourceType?: string;
  ByCreatedBefore?: Date;
  ByCreatedAfter?: Date;
  ByStatus?: RestoreJobStatus;
  ByCompleteBefore?: Date;
  ByCompleteAfter?: Date;
  ByRestoreTestingPlanArn?: string;
  ByParentJobId?: string;
}
export interface RestoreJobsListMember {
  AccountId?: string;
  RestoreJobId?: string;
  RecoveryPointArn?: string;
  SourceResourceArn?: string;
  BackupVaultArn?: string;
  CreationDate?: Date;
  CompletionDate?: Date;
  Status?: RestoreJobStatus;
  StatusMessage?: string;
  PercentDone?: string;
  BackupSizeInBytes?: number;
  IamRoleArn?: string;
  ExpectedCompletionTimeMinutes?: number;
  CreatedResourceArn?: string;
  ResourceType?: string;
  RecoveryPointCreationDate?: Date;
  IsParent?: boolean;
  ParentJobId?: string;
  CreatedBy?: RestoreJobCreator;
  ValidationStatus?: RestoreValidationStatus;
  ValidationStatusMessage?: string;
  DeletionStatus?: RestoreDeletionStatus;
  DeletionStatusMessage?: string;
}
export type RestoreJobsList = RestoreJobsListMember[];
export interface ListRestoreJobsOutput {
  RestoreJobs?: RestoreJobsListMember[];
  NextToken?: string;
}
export interface ListRestoreJobsByProtectedResourceInput {
  ResourceArn: string;
  ByStatus?: RestoreJobStatus;
  ByRecoveryPointCreationDateAfter?: Date;
  ByRecoveryPointCreationDateBefore?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListRestoreJobsByProtectedResourceOutput {
  RestoreJobs?: RestoreJobsListMember[];
  NextToken?: string;
}
export type RestoreJobState =
  | "CREATED"
  | "PENDING"
  | "RUNNING"
  | "ABORTED"
  | "COMPLETED"
  | "FAILED"
  | "AGGREGATE_ALL"
  | "ANY"
  | (string & {});
export interface ListRestoreJobSummariesInput {
  AccountId?: string;
  State?: RestoreJobState;
  ResourceType?: string;
  AggregationPeriod?: AggregationPeriod;
  MaxResults?: number;
  NextToken?: string;
}
export interface RestoreJobSummary {
  Region?: string;
  AccountId?: string;
  State?: RestoreJobState;
  ResourceType?: string;
  Count?: number;
  StartTime?: Date;
  EndTime?: Date;
}
export type RestoreJobSummaryList = RestoreJobSummary[];
export interface ListRestoreJobSummariesOutput {
  RestoreJobSummaries?: RestoreJobSummary[];
  AggregationPeriod?: string;
  NextToken?: string;
}
export type ListRestoreTestingPlansInputMaxResultsInteger = number;
export interface ListRestoreTestingPlansInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface RestoreTestingPlanForList {
  CreationTime: Date;
  LastExecutionTime?: Date;
  LastUpdateTime?: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
  ScheduleExpression: string;
  ScheduleExpressionTimezone?: string;
  StartWindowHours?: number;
}
export type RestoreTestingPlans = RestoreTestingPlanForList[];
export interface ListRestoreTestingPlansOutput {
  NextToken?: string;
  RestoreTestingPlans: RestoreTestingPlanForList[];
}
export type ListRestoreTestingSelectionsInputMaxResultsInteger = number;
export interface ListRestoreTestingSelectionsInput {
  MaxResults?: number;
  NextToken?: string;
  RestoreTestingPlanName: string;
}
export interface RestoreTestingSelectionForList {
  CreationTime: Date;
  IamRoleArn: string;
  ProtectedResourceType: string;
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
  ValidationWindowHours?: number;
}
export type RestoreTestingSelections = RestoreTestingSelectionForList[];
export interface ListRestoreTestingSelectionsOutput {
  NextToken?: string;
  RestoreTestingSelections: RestoreTestingSelectionForList[];
}
export type ListScanJobsInputMaxResultsInteger = number;
export interface ListScanJobsInput {
  ByAccountId?: string;
  ByBackupVaultName?: string;
  ByCompleteAfter?: Date;
  ByCompleteBefore?: Date;
  ByMalwareScanner?: MalwareScanner;
  ByRecoveryPointArn?: string;
  ByResourceArn?: string;
  ByResourceType?: ScanResourceType;
  ByScanResultStatus?: ScanResultStatus;
  ByState?: ScanState;
  MaxResults?: number;
  NextToken?: string;
}
export interface ScanJob {
  AccountId: string;
  BackupVaultArn: string;
  BackupVaultName: string;
  CompletionDate?: Date;
  ContinuousScanEndTime?: Date;
  ContinuousScanStartTime?: Date;
  CreatedBy: ScanJobCreator;
  CreationDate: Date;
  IamRoleArn: string;
  MalwareScanner: MalwareScanner;
  RecoveryPointArn: string;
  ResourceArn: string;
  ResourceName: string;
  ResourceType: ScanResourceType;
  ScanBaseRecoveryPointArn?: string;
  ScanId?: string;
  ScanJobId: string;
  ScanMode: ScanMode;
  ScanResult?: ScanResultInfo;
  ScannerRoleArn: string;
  State?: ScanState;
  StatusMessage?: string;
}
export type ScanJobs = ScanJob[];
export interface ListScanJobsOutput {
  NextToken?: string;
  ScanJobs: ScanJob[];
}
export type ScanJobStatus =
  | "CREATED"
  | "COMPLETED"
  | "COMPLETED_WITH_ISSUES"
  | "RUNNING"
  | "FAILED"
  | "CANCELED"
  | "AGGREGATE_ALL"
  | "ANY"
  | (string & {});
export interface ListScanJobSummariesInput {
  AccountId?: string;
  ResourceType?: string;
  MalwareScanner?: MalwareScanner;
  ScanResultStatus?: ScanResultStatus;
  State?: ScanJobStatus;
  AggregationPeriod?: AggregationPeriod;
  MaxResults?: number;
  NextToken?: string;
}
export interface ScanJobSummary {
  Region?: string;
  AccountId?: string;
  State?: ScanJobStatus;
  ResourceType?: string;
  Count?: number;
  StartTime?: Date;
  EndTime?: Date;
  MalwareScanner?: MalwareScanner;
  ScanResultStatus?: ScanResultStatus;
}
export type ScanJobSummaryList = ScanJobSummary[];
export interface ListScanJobSummariesOutput {
  ScanJobSummaries?: ScanJobSummary[];
  AggregationPeriod?: string;
  NextToken?: string;
}
export interface ListTagsInput {
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListTagsOutput {
  NextToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface ListTieringConfigurationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface TieringConfigurationsListMember {
  TieringConfigurationArn?: string;
  TieringConfigurationName?: string;
  BackupVaultName?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export type TieringConfigurationsList = TieringConfigurationsListMember[];
export interface ListTieringConfigurationsOutput {
  TieringConfigurations?: TieringConfigurationsListMember[];
  NextToken?: string;
}
export interface PutBackupVaultAccessPolicyInput {
  BackupVaultName: string;
  Policy?: string;
}
export interface PutBackupVaultAccessPolicyResponse {}
export interface PutBackupVaultLockConfigurationInput {
  BackupVaultName: string;
  MinRetentionDays?: number;
  MaxRetentionDays?: number;
  ChangeableForDays?: number;
}
export interface PutBackupVaultLockConfigurationResponse {}
export interface PutBackupVaultNotificationsInput {
  BackupVaultName: string;
  SNSTopicArn: string;
  BackupVaultEvents: BackupVaultEvent[];
}
export interface PutBackupVaultNotificationsResponse {}
export interface PutRestoreValidationResultInput {
  RestoreJobId: string;
  ValidationStatus: RestoreValidationStatus;
  ValidationStatusMessage?: string;
}
export interface PutRestoreValidationResultResponse {}
export interface RevokeRestoreAccessBackupVaultInput {
  BackupVaultName: string;
  RestoreAccessBackupVaultArn: string;
  RequesterComment?: string | redacted.Redacted<string>;
}
export interface RevokeRestoreAccessBackupVaultResponse {}
export type Index = "ENABLED" | "DISABLED" | (string & {});
export interface StartBackupJobInput {
  BackupVaultName: string;
  LogicallyAirGappedBackupVaultArn?: string;
  ResourceArn: string;
  IamRoleArn: string;
  IdempotencyToken?: string;
  StartWindowMinutes?: number;
  CompleteWindowMinutes?: number;
  Lifecycle?: Lifecycle;
  RecoveryPointTags?: { [key: string]: string | undefined };
  BackupOptions?: { [key: string]: string | undefined };
  Index?: Index;
}
export interface StartBackupJobOutput {
  BackupJobId?: string;
  RecoveryPointArn?: string;
  CreationDate?: Date;
  IsParent?: boolean;
}
export interface StartCopyJobInput {
  RecoveryPointArn: string;
  SourceBackupVaultName: string;
  DestinationBackupVaultArn: string;
  IamRoleArn: string;
  IdempotencyToken?: string;
  Lifecycle?: Lifecycle;
}
export interface StartCopyJobOutput {
  CopyJobId?: string;
  CreationDate?: Date;
  IsParent?: boolean;
}
export interface StartReportJobInput {
  ReportPlanName: string;
  IdempotencyToken?: string;
}
export interface StartReportJobOutput {
  ReportJobId?: string;
}
export interface StartRestoreJobInput {
  RecoveryPointArn: string;
  Metadata: { [key: string]: string | undefined };
  IamRoleArn?: string;
  IdempotencyToken?: string;
  ResourceType?: string;
  CopySourceTagsToRestoredResource?: boolean;
}
export interface StartRestoreJobOutput {
  RestoreJobId?: string;
}
export interface StartScanJobInput {
  BackupVaultName: string;
  ContinuousScanEndTime?: Date;
  IamRoleArn: string;
  IdempotencyToken?: string;
  MalwareScanner: MalwareScanner;
  RecoveryPointArn: string;
  ScanBaseRecoveryPointArn?: string;
  ScanMode: ScanMode;
  ScannerRoleArn: string;
}
export interface StartScanJobOutput {
  CreationDate: Date;
  ScanJobId: string;
}
export interface StopBackupJobInput {
  BackupJobId: string;
}
export interface StopBackupJobResponse {}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeyList: string[];
}
export interface UntagResourceResponse {}
export interface UpdateBackupPlanInput {
  BackupPlanId: string;
  BackupPlan: BackupPlanInput;
}
export interface UpdateBackupPlanOutput {
  BackupPlanId?: string;
  BackupPlanArn?: string;
  CreationDate?: Date;
  VersionId?: string;
  AdvancedBackupSettings?: AdvancedBackupSetting[];
  ScanSettings?: ScanSetting[];
}
export interface UpdateFrameworkInput {
  FrameworkName: string;
  FrameworkDescription?: string;
  FrameworkControls?: FrameworkControl[];
  IdempotencyToken?: string;
}
export interface UpdateFrameworkOutput {
  FrameworkName?: string;
  FrameworkArn?: string;
  CreationTime?: Date;
}
export interface UpdateGlobalSettingsInput {
  GlobalSettings?: { [key: string]: string | undefined };
}
export interface UpdateGlobalSettingsResponse {}
export interface UpdateRecoveryPointIndexSettingsInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
  IamRoleArn?: string;
  Index: Index;
}
export interface UpdateRecoveryPointIndexSettingsOutput {
  BackupVaultName?: string;
  RecoveryPointArn?: string;
  IndexStatus?: IndexStatus;
  Index?: Index;
}
export interface UpdateRecoveryPointLifecycleInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
  Lifecycle?: Lifecycle;
}
export interface UpdateRecoveryPointLifecycleOutput {
  BackupVaultArn?: string;
  RecoveryPointArn?: string;
  Lifecycle?: Lifecycle;
  CalculatedLifecycle?: CalculatedLifecycle;
}
export interface UpdateRegionSettingsInput {
  ResourceTypeOptInPreference?: { [key: string]: boolean | undefined };
  ResourceTypeManagementPreference?: { [key: string]: boolean | undefined };
}
export interface UpdateRegionSettingsResponse {}
export interface UpdateReportPlanInput {
  ReportPlanName: string;
  ReportPlanDescription?: string;
  ReportDeliveryChannel?: ReportDeliveryChannel;
  ReportSetting?: ReportSetting;
  IdempotencyToken?: string;
}
export interface UpdateReportPlanOutput {
  ReportPlanName?: string;
  ReportPlanArn?: string;
  CreationTime?: Date;
}
export interface RestoreTestingPlanForUpdate {
  RecoveryPointSelection?: RestoreTestingRecoveryPointSelection;
  ScheduleExpression?: string;
  ScheduleExpressionTimezone?: string;
  StartWindowHours?: number;
}
export interface UpdateRestoreTestingPlanInput {
  RestoreTestingPlan: RestoreTestingPlanForUpdate;
  RestoreTestingPlanName: string;
}
export interface UpdateRestoreTestingPlanOutput {
  CreationTime: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
  UpdateTime: Date;
}
export interface RestoreTestingSelectionForUpdate {
  IamRoleArn?: string;
  ProtectedResourceArns?: string[];
  ProtectedResourceConditions?: ProtectedResourceConditions;
  RestoreMetadataOverrides?: { [key: string]: string | undefined };
  ValidationWindowHours?: number;
}
export interface UpdateRestoreTestingSelectionInput {
  RestoreTestingPlanName: string;
  RestoreTestingSelection: RestoreTestingSelectionForUpdate;
  RestoreTestingSelectionName: string;
}
export interface UpdateRestoreTestingSelectionOutput {
  CreationTime: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
  UpdateTime: Date;
}
export interface TieringConfigurationInputForUpdate {
  ResourceSelection: ResourceSelection[];
  BackupVaultName: string;
}
export interface UpdateTieringConfigurationInput {
  TieringConfigurationName: string;
  TieringConfiguration: TieringConfigurationInputForUpdate;
}
export interface UpdateTieringConfigurationOutput {
  TieringConfigurationArn?: string;
  TieringConfigurationName?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export type AssociateBackupVaultMpaApprovalTeamError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Associates an MPA approval team with a backup vault.
 */
export const associateBackupVaultMpaApprovalTeam: API.OperationMethod<
  AssociateBackupVaultMpaApprovalTeamInput,
  AssociateBackupVaultMpaApprovalTeamResponse,
  AssociateBackupVaultMpaApprovalTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup-vaults/{BackupVaultName}/mpaApprovalTeam",
    input: { BackupVaultName: 0, MpaApprovalTeamArn: 0, RequesterComment: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateBackupVaultMpaApprovalTeam",
})) as any;

export type CancelLegalHoldError =
  | InvalidParameterValueException
  | InvalidResourceStateException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Removes the specified legal hold on a recovery point. This action can only be performed
 * by a user with sufficient permissions.
 */
export const cancelLegalHold: API.OperationMethod<
  CancelLegalHoldInput,
  CancelLegalHoldOutput,
  CancelLegalHoldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /legal-holds/{LegalHoldId}",
    input: {
      LegalHoldId: 0,
      CancelDescription: D.m({ query: "cancelDescription" }),
      RetainRecordInDays: D.m({ query: "retainRecordInDays" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    InvalidResourceStateException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelLegalHold",
})) as any;

export type CreateBackupAccessPointError =
  | AlreadyExistsException
  | ConflictException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a backup access point for an Amazon S3 recovery point. A backup access point provides
 * on-demand, read-only access to the backup data in a recovery point through an Amazon S3 access point,
 * without initiating a restore.
 *
 * While a backup access point is active for a recovery point, Backup pauses lifecycle transitions
 * and blocks deletion of that recovery point.
 */
export const createBackupAccessPoint: API.OperationMethod<
  CreateBackupAccessPointRequest,
  CreateBackupAccessPointResponse,
  CreateBackupAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup-access-point/create",
    input: {
      AccessPointMetadata: 0,
      AccessPointPolicy: 0,
      Name: 0,
      RecoveryPointArn: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackupAccessPoint",
})) as any;

export type CreateBackupPlanError =
  | AlreadyExistsException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a backup plan using a backup plan name and backup rules. A backup plan is a
 * document that contains information that Backup uses to schedule tasks that
 * create recovery points for resources.
 *
 * If you call `CreateBackupPlan` with a plan that already exists, you receive
 * an `AlreadyExistsException` exception.
 */
export const createBackupPlan: API.OperationMethod<
  CreateBackupPlanInput,
  CreateBackupPlanOutput,
  CreateBackupPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup/plans",
    input: {
      BackupPlan: i_BackupPlanInput,
      BackupPlanTags: 0,
      CreatorRequestId: D.m({ idempotency: true }),
    },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackupPlan",
})) as any;

export type CreateBackupSelectionError =
  | AlreadyExistsException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a JSON document that specifies a set of resources to assign to a backup plan.
 * For examples, see Assigning resources programmatically.
 */
export const createBackupSelection: API.OperationMethod<
  CreateBackupSelectionInput,
  CreateBackupSelectionOutput,
  CreateBackupSelectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup/plans/{BackupPlanId}/selections",
    input: {
      BackupPlanId: 0,
      BackupSelection: {
        SelectionName: 0,
        IamRoleArn: 0,
        Resources: 0,
        ListOfTags: D.list({
          ConditionType: 0,
          ConditionKey: 0,
          ConditionValue: 0,
        }),
        NotResources: 0,
        Conditions: {
          StringEquals: D.list(i_ConditionParameter),
          StringNotEquals: D.list(i_ConditionParameter),
          StringLike: D.list(i_ConditionParameter),
          StringNotLike: D.list(i_ConditionParameter),
        },
      },
      CreatorRequestId: D.m({ idempotency: true }),
    },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackupSelection",
})) as any;

export type CreateBackupVaultError =
  | AlreadyExistsException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a logical container where backups are stored. A `CreateBackupVault`
 * request includes a name, optionally one or more resource tags, an encryption key, and a
 * request ID.
 *
 * Do not include sensitive data, such as passport numbers, in the name of a backup
 * vault.
 */
export const createBackupVault: API.OperationMethod<
  CreateBackupVaultInput,
  CreateBackupVaultOutput,
  CreateBackupVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup-vaults/{BackupVaultName}",
    input: {
      BackupVaultName: 0,
      BackupVaultTags: 0,
      EncryptionKeyArn: 0,
      CreatorRequestId: D.m({ idempotency: true }),
    },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackupVault",
})) as any;

export type CreateFrameworkError =
  | AlreadyExistsException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a framework with one or more controls. A framework is a collection of controls
 * that you can use to evaluate your backup practices. By using pre-built customizable
 * controls to define your policies, you can evaluate whether your backup practices comply
 * with your policies and which resources are not yet in compliance.
 */
export const createFramework: API.OperationMethod<
  CreateFrameworkInput,
  CreateFrameworkOutput,
  CreateFrameworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/frameworks",
    input: {
      FrameworkName: 0,
      FrameworkDescription: 0,
      FrameworkControls: D.list(i_FrameworkControl),
      IdempotencyToken: D.m({ idempotency: true }),
      FrameworkTags: 0,
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFramework",
})) as any;

export type CreateLegalHoldError =
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a legal hold on a recovery point (backup). A legal hold is a restraint on
 * altering or deleting a backup until an authorized user cancels the legal hold. Any actions
 * to delete or disassociate a recovery point will fail with an error if one or more active
 * legal holds are on the recovery point.
 */
export const createLegalHold: API.OperationMethod<
  CreateLegalHoldInput,
  CreateLegalHoldOutput,
  CreateLegalHoldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /legal-holds",
    input: {
      Title: 0,
      Description: 0,
      IdempotencyToken: D.m({ idempotency: true }),
      RecoveryPointSelection: {
        VaultNames: 0,
        ResourceIdentifiers: 0,
        DateRange: { FromDate: 0, ToDate: 0 },
      },
      Tags: 0,
    },
    output: {
      CreationDate: D.ts,
      RecoveryPointSelection: o_RecoveryPointSelection,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLegalHold",
})) as any;

export type CreateLogicallyAirGappedBackupVaultError =
  | AlreadyExistsException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a logical container to where backups may be copied.
 *
 * This request includes a name, the Region, the maximum number of retention days, the
 * minimum number of retention days, and optionally can include tags and a creator request
 * ID.
 *
 * Do not include sensitive data, such as passport numbers, in the name of a backup
 * vault.
 */
export const createLogicallyAirGappedBackupVault: API.OperationMethod<
  CreateLogicallyAirGappedBackupVaultInput,
  CreateLogicallyAirGappedBackupVaultOutput,
  CreateLogicallyAirGappedBackupVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /logically-air-gapped-backup-vaults/{BackupVaultName}",
    input: {
      BackupVaultName: 0,
      BackupVaultTags: 0,
      CreatorRequestId: D.m({ idempotency: true }),
      MinRetentionDays: 0,
      MaxRetentionDays: 0,
      EncryptionKeyArn: 0,
    },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLogicallyAirGappedBackupVault",
})) as any;

export type CreateReportPlanError =
  | AlreadyExistsException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a report plan. A report plan is a document that contains information about the
 * contents of the report and where Backup will deliver it.
 *
 * If you call `CreateReportPlan` with a plan that already exists, you receive
 * an `AlreadyExistsException` exception.
 */
export const createReportPlan: API.OperationMethod<
  CreateReportPlanInput,
  CreateReportPlanOutput,
  CreateReportPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/report-plans",
    input: {
      ReportPlanName: 0,
      ReportPlanDescription: 0,
      ReportDeliveryChannel: i_ReportDeliveryChannel,
      ReportSetting: i_ReportSetting,
      ReportPlanTags: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
    output: { CreationTime: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReportPlan",
})) as any;

export type CreateRestoreAccessBackupVaultError =
  | AlreadyExistsException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a restore access backup vault that provides temporary access to recovery points in a logically air-gapped backup vault, subject to MPA approval.
 */
export const createRestoreAccessBackupVault: API.OperationMethod<
  CreateRestoreAccessBackupVaultInput,
  CreateRestoreAccessBackupVaultOutput,
  CreateRestoreAccessBackupVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /restore-access-backup-vaults",
    input: {
      SourceBackupVaultArn: 0,
      BackupVaultName: 0,
      BackupVaultTags: 0,
      CreatorRequestId: D.m({ idempotency: true }),
      RequesterComment: 0,
    },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRestoreAccessBackupVault",
})) as any;

export type CreateRestoreTestingPlanError =
  | AlreadyExistsException
  | ConflictException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a restore testing plan.
 *
 * The first of two steps to create a restore testing
 * plan. After this request is successful, finish the procedure using
 * CreateRestoreTestingSelection.
 */
export const createRestoreTestingPlan: API.OperationMethod<
  CreateRestoreTestingPlanInput,
  CreateRestoreTestingPlanOutput,
  CreateRestoreTestingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /restore-testing/plans",
    input: {
      CreatorRequestId: 0,
      RestoreTestingPlan: {
        RecoveryPointSelection: i_RestoreTestingRecoveryPointSelection,
        RestoreTestingPlanName: 0,
        ScheduleExpression: 0,
        ScheduleExpressionTimezone: 0,
        StartWindowHours: 0,
      },
      Tags: 0,
    },
    output: { CreationTime: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRestoreTestingPlan",
})) as any;

export type CreateRestoreTestingSelectionError =
  | AlreadyExistsException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request can be sent after CreateRestoreTestingPlan request
 * returns successfully. This is the second part of creating a resource testing
 * plan, and it must be completed sequentially.
 *
 * This consists of `RestoreTestingSelectionName`,
 * `ProtectedResourceType`, and one of the following:
 *
 * - `ProtectedResourceArns`
 *
 * - `ProtectedResourceConditions`
 *
 * Each protected resource type can have one single value.
 *
 * A restore testing selection can include a wildcard value ("*") for
 * `ProtectedResourceArns` along with `ProtectedResourceConditions`.
 * Alternatively, you can include up to 30 specific protected resource ARNs in
 * `ProtectedResourceArns`.
 *
 * Cannot select by both protected resource types AND specific ARNs.
 * Request will fail if both are included.
 */
export const createRestoreTestingSelection: API.OperationMethod<
  CreateRestoreTestingSelectionInput,
  CreateRestoreTestingSelectionOutput,
  CreateRestoreTestingSelectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /restore-testing/plans/{RestoreTestingPlanName}/selections",
    input: {
      CreatorRequestId: 0,
      RestoreTestingPlanName: 0,
      RestoreTestingSelection: {
        IamRoleArn: 0,
        ProtectedResourceArns: 0,
        ProtectedResourceConditions: i_ProtectedResourceConditions,
        ProtectedResourceType: 0,
        RestoreMetadataOverrides: 0,
        RestoreTestingSelectionName: 0,
        ValidationWindowHours: 0,
      },
    },
    output: { CreationTime: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRestoreTestingSelection",
})) as any;

export type CreateTieringConfigurationError =
  | AlreadyExistsException
  | ConflictException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a tiering configuration.
 *
 * A tiering configuration enables automatic movement of backup data to a lower-cost storage tier based on the age of backed-up objects in the backup vault.
 *
 * Each vault can only have one vault-specific tiering configuration, in addition to any global configuration that applies to all vaults.
 */
export const createTieringConfiguration: API.OperationMethod<
  CreateTieringConfigurationInput,
  CreateTieringConfigurationOutput,
  CreateTieringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /tiering-configurations",
    input: {
      TieringConfiguration: {
        TieringConfigurationName: 0,
        BackupVaultName: 0,
        ResourceSelection: D.list(i_ResourceSelection),
      },
      TieringConfigurationTags: 0,
      CreatorRequestId: D.m({ idempotency: true }),
    },
    output: { CreationTime: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTieringConfiguration",
})) as any;

export type DeleteBackupAccessPointError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a backup access point. This deletes the underlying Amazon S3 access point and, if no other
 * backup access points remain for the recovery point, resumes lifecycle transitions for that recovery point.
 *
 * Always delete backup access points using this operation rather than deleting the underlying Amazon S3
 * access point directly.
 */
export const deleteBackupAccessPoint: API.OperationMethod<
  DeleteBackupAccessPointInput,
  DeleteBackupAccessPointResponse,
  DeleteBackupAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup-access-point/delete/{AccessPointArn}",
    input: { AccessPointArn: 0 },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupAccessPoint",
})) as any;

export type DeleteBackupPlanError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a backup plan. A backup plan can only be deleted after all associated selections
 * of resources have been deleted. Deleting a backup plan deletes the current version of a
 * backup plan. Previous versions, if any, will still exist.
 */
export const deleteBackupPlan: API.OperationMethod<
  DeleteBackupPlanInput,
  DeleteBackupPlanOutput,
  DeleteBackupPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup/plans/{BackupPlanId}",
    input: { BackupPlanId: 0 },
    output: { DeletionDate: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupPlan",
})) as any;

export type DeleteBackupSelectionError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the resource selection associated with a backup plan that is specified by the
 * `SelectionId`.
 */
export const deleteBackupSelection: API.OperationMethod<
  DeleteBackupSelectionInput,
  DeleteBackupSelectionResponse,
  DeleteBackupSelectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup/plans/{BackupPlanId}/selections/{SelectionId}",
    input: { BackupPlanId: 0, SelectionId: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupSelection",
})) as any;

export type DeleteBackupVaultError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the backup vault identified by its name. A vault can be deleted only if it is
 * empty.
 */
export const deleteBackupVault: API.OperationMethod<
  DeleteBackupVaultInput,
  DeleteBackupVaultResponse,
  DeleteBackupVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup-vaults/{BackupVaultName}",
    input: { BackupVaultName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupVault",
})) as any;

export type DeleteBackupVaultAccessPolicyError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the policy document that manages permissions on a backup vault.
 */
export const deleteBackupVaultAccessPolicy: API.OperationMethod<
  DeleteBackupVaultAccessPolicyInput,
  DeleteBackupVaultAccessPolicyResponse,
  DeleteBackupVaultAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup-vaults/{BackupVaultName}/access-policy",
    input: { BackupVaultName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupVaultAccessPolicy",
})) as any;

export type DeleteBackupVaultLockConfigurationError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes Backup Vault Lock from a backup vault specified by a backup vault
 * name.
 *
 * If the Vault Lock configuration is immutable, then you cannot delete Vault Lock using
 * API operations, and you will receive an `InvalidRequestException` if you attempt
 * to do so. For more information, see Vault Lock in the
 * *Backup Developer Guide*.
 */
export const deleteBackupVaultLockConfiguration: API.OperationMethod<
  DeleteBackupVaultLockConfigurationInput,
  DeleteBackupVaultLockConfigurationResponse,
  DeleteBackupVaultLockConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup-vaults/{BackupVaultName}/vault-lock",
    input: { BackupVaultName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupVaultLockConfiguration",
})) as any;

export type DeleteBackupVaultNotificationsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes event notifications for the specified backup vault.
 */
export const deleteBackupVaultNotifications: API.OperationMethod<
  DeleteBackupVaultNotificationsInput,
  DeleteBackupVaultNotificationsResponse,
  DeleteBackupVaultNotificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup-vaults/{BackupVaultName}/notification-configuration",
    input: { BackupVaultName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupVaultNotifications",
})) as any;

export type DeleteFrameworkError =
  | ConflictException
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the framework specified by a framework name.
 */
export const deleteFramework: API.OperationMethod<
  DeleteFrameworkInput,
  DeleteFrameworkResponse,
  DeleteFrameworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /audit/frameworks/{FrameworkName}",
    input: { FrameworkName: 0 },
  },
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFramework",
})) as any;

export type DeleteRecoveryPointError =
  | InvalidParameterValueException
  | InvalidRequestException
  | InvalidResourceStateException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the recovery point specified by a recovery point ID.
 *
 * If the recovery point ID belongs to a continuous backup, calling this endpoint deletes
 * the existing continuous backup and stops future continuous backup.
 *
 * When an IAM role's permissions are insufficient to call this API, the service sends back
 * an HTTP 200 response with an empty HTTP body, but the recovery point is not deleted.
 * Instead, it enters an `EXPIRED` state.
 *
 * `EXPIRED` recovery points can be deleted with this API once the IAM role
 * has the `iam:CreateServiceLinkedRole` action. To learn more about adding this role, see
 *
 * Troubleshooting manual deletions.
 *
 * If the user or role is deleted or the permission within the role is removed,
 * the deletion will not be successful and will enter an `EXPIRED` state.
 */
export const deleteRecoveryPoint: API.OperationMethod<
  DeleteRecoveryPointInput,
  DeleteRecoveryPointResponse,
  DeleteRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}",
    input: { BackupVaultName: 0, RecoveryPointArn: 0 },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    InvalidResourceStateException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecoveryPoint",
})) as any;

export type DeleteReportPlanError =
  | ConflictException
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the report plan specified by a report plan name.
 */
export const deleteReportPlan: API.OperationMethod<
  DeleteReportPlanInput,
  DeleteReportPlanResponse,
  DeleteReportPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /audit/report-plans/{ReportPlanName}",
    input: { ReportPlanName: 0 },
  },
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportPlan",
})) as any;

export type DeleteRestoreTestingPlanError =
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request deletes the specified restore testing plan.
 *
 * Deletion can only successfully occur if all associated
 * restore testing selections are deleted first.
 */
export const deleteRestoreTestingPlan: API.OperationMethod<
  DeleteRestoreTestingPlanInput,
  DeleteRestoreTestingPlanResponse,
  DeleteRestoreTestingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /restore-testing/plans/{RestoreTestingPlanName}",
    input: { RestoreTestingPlanName: 0 },
  },
  errors: [InvalidRequestException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRestoreTestingPlan",
})) as any;

export type DeleteRestoreTestingSelectionError =
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Input the Restore Testing Plan name and Restore Testing Selection
 * name.
 *
 * All testing selections associated with a restore testing plan must
 * be deleted before the restore testing plan can be deleted.
 */
export const deleteRestoreTestingSelection: API.OperationMethod<
  DeleteRestoreTestingSelectionInput,
  DeleteRestoreTestingSelectionResponse,
  DeleteRestoreTestingSelectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /restore-testing/plans/{RestoreTestingPlanName}/selections/{RestoreTestingSelectionName}",
    input: { RestoreTestingPlanName: 0, RestoreTestingSelectionName: 0 },
  },
  errors: [ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRestoreTestingSelection",
})) as any;

export type DeleteTieringConfigurationError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the tiering configuration specified by a tiering configuration name.
 */
export const deleteTieringConfiguration: API.OperationMethod<
  DeleteTieringConfigurationInput,
  DeleteTieringConfigurationOutput,
  DeleteTieringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tiering-configurations/{TieringConfigurationName}",
    input: { TieringConfigurationName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTieringConfiguration",
})) as any;

export type DescribeBackupAccessPointError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns metadata about a backup access point, including its status and the details of the underlying
 * Amazon S3 access point.
 *
 * After a backup access point reaches the `AVAILABLE` status, use this operation to retrieve the
 * Amazon S3 access point ARN and alias that you need to read the backup data.
 */
export const describeBackupAccessPoint: API.OperationMethod<
  DescribeBackupAccessPointInput,
  DescribeBackupAccessPointResponse,
  DescribeBackupAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-access-point/{AccessPointArn}",
    input: { AccessPointArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackupAccessPoint",
})) as any;

export type DescribeBackupJobError =
  | DependencyFailureException
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns backup job details for the specified `BackupJobId`.
 */
export const describeBackupJob: API.OperationMethod<
  DescribeBackupJobInput,
  DescribeBackupJobOutput,
  DescribeBackupJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-jobs/{BackupJobId}",
    input: { BackupJobId: 0 },
    output: {
      CreationDate: D.ts,
      CompletionDate: D.ts,
      ExpectedCompletionDate: D.ts,
      StartBy: D.ts,
      InitiationDate: D.ts,
    },
  },
  errors: [
    DependencyFailureException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackupJob",
})) as any;

export type DescribeBackupVaultError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns metadata about a backup vault specified by its name.
 */
export const describeBackupVault: API.OperationMethod<
  DescribeBackupVaultInput,
  DescribeBackupVaultOutput,
  DescribeBackupVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults/{BackupVaultName}",
    input: {
      BackupVaultName: 0,
      BackupVaultAccountId: D.m({ query: "backupVaultAccountId" }),
    },
    output: {
      CreationDate: D.ts,
      LockDate: D.ts,
      LatestMpaApprovalTeamUpdate: { InitiationDate: D.ts, ExpiryDate: D.ts },
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackupVault",
})) as any;

export type DescribeCopyJobError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns metadata associated with creating a copy of a resource.
 */
export const describeCopyJob: API.OperationMethod<
  DescribeCopyJobInput,
  DescribeCopyJobOutput,
  DescribeCopyJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /copy-jobs/{CopyJobId}",
    input: { CopyJobId: 0 },
    output: { CopyJob: o_CopyJob },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCopyJob",
})) as any;

export type DescribeFrameworkError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the framework details for the specified `FrameworkName`.
 */
export const describeFramework: API.OperationMethod<
  DescribeFrameworkInput,
  DescribeFrameworkOutput,
  DescribeFrameworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/frameworks/{FrameworkName}",
    input: { FrameworkName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFramework",
})) as any;

export type DescribeGlobalSettingsError =
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes whether the Amazon Web Services account has enabled different cross-account management options, including cross-account backup, multi-party approval, and delegated administrator. Returns an error if the account is not a member of an Organizations organization. Example: `describe-global-settings --region us-west-2`
 */
export const describeGlobalSettings: API.OperationMethod<
  DescribeGlobalSettingsInput,
  DescribeGlobalSettingsOutput,
  DescribeGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-settings",
    input: {},
    output: { LastUpdateTime: D.ts },
  },
  errors: [InvalidRequestException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalSettings",
})) as any;

export type DescribeProtectedResourceError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns information about a saved resource, including the last time it was backed up,
 * its Amazon Resource Name (ARN), and the Amazon Web Services service type of the saved
 * resource.
 */
export const describeProtectedResource: API.OperationMethod<
  DescribeProtectedResourceInput,
  DescribeProtectedResourceOutput,
  DescribeProtectedResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /resources/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: {
      LastBackupTime: D.ts,
      LatestRestoreJobCreationDate: D.ts,
      LatestRestoreRecoveryPointCreationDate: D.ts,
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProtectedResource",
})) as any;

export type DescribeRecoveryPointError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns metadata associated with a recovery point, including ID, status, encryption, and
 * lifecycle.
 */
export const describeRecoveryPoint: API.OperationMethod<
  DescribeRecoveryPointInput,
  DescribeRecoveryPointOutput,
  DescribeRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}",
    input: {
      BackupVaultName: 0,
      RecoveryPointArn: 0,
      BackupVaultAccountId: D.m({ query: "backupVaultAccountId" }),
    },
    output: {
      CreationDate: D.ts,
      InitiationDate: D.ts,
      CompletionDate: D.ts,
      CalculatedLifecycle: o_CalculatedLifecycle,
      LastRestoreTime: D.ts,
      ScanResults: D.list({ LastScanTimestamp: D.ts }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecoveryPoint",
})) as any;

export type DescribeRegionSettingsError =
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the current service opt-in settings for the Region. If service opt-in is enabled
 * for a service, Backup tries to protect that service's resources in this Region,
 * when the resource is included in an on-demand backup or scheduled backup plan. Otherwise,
 * Backup does not try to protect that service's resources in this
 * Region.
 */
export const describeRegionSettings: API.OperationMethod<
  DescribeRegionSettingsInput,
  DescribeRegionSettingsOutput,
  DescribeRegionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /account-settings", input: {} },
  errors: [ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegionSettings",
})) as any;

export type DescribeReportJobError =
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the details associated with creating a report as specified by its
 * `ReportJobId`.
 */
export const describeReportJob: API.OperationMethod<
  DescribeReportJobInput,
  DescribeReportJobOutput,
  DescribeReportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/report-jobs/{ReportJobId}",
    input: { ReportJobId: 0 },
    output: { ReportJob: o_ReportJob },
  },
  errors: [
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReportJob",
})) as any;

export type DescribeReportPlanError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of all report plans for an Amazon Web Services account and Amazon Web Services Region.
 */
export const describeReportPlan: API.OperationMethod<
  DescribeReportPlanInput,
  DescribeReportPlanOutput,
  DescribeReportPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/report-plans/{ReportPlanName}",
    input: { ReportPlanName: 0 },
    output: { ReportPlan: o_ReportPlan },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReportPlan",
})) as any;

export type DescribeRestoreJobError =
  | DependencyFailureException
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns metadata associated with a restore job that is specified by a job ID.
 */
export const describeRestoreJob: API.OperationMethod<
  DescribeRestoreJobInput,
  DescribeRestoreJobOutput,
  DescribeRestoreJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /restore-jobs/{RestoreJobId}",
    input: { RestoreJobId: 0 },
    output: {
      CreationDate: D.ts,
      CompletionDate: D.ts,
      RecoveryPointCreationDate: D.ts,
    },
  },
  errors: [
    DependencyFailureException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRestoreJob",
})) as any;

export type DescribeScanJobError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns scan job details for the specified ScanJobID.
 */
export const describeScanJob: API.OperationMethod<
  DescribeScanJobInput,
  DescribeScanJobOutput,
  DescribeScanJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /scan/jobs/{ScanJobId}",
    input: { ScanJobId: 0 },
    output: {
      CompletionDate: D.ts,
      ContinuousScanEndTime: D.ts,
      ContinuousScanStartTime: D.ts,
      CreationDate: D.ts,
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScanJob",
})) as any;

export type DisassociateBackupVaultMpaApprovalTeamError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Removes the association between an MPA approval team and a backup vault, disabling the MPA approval workflow for restore operations.
 */
export const disassociateBackupVaultMpaApprovalTeam: API.OperationMethod<
  DisassociateBackupVaultMpaApprovalTeamInput,
  DisassociateBackupVaultMpaApprovalTeamResponse,
  DisassociateBackupVaultMpaApprovalTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup-vaults/{BackupVaultName}/mpaApprovalTeam?delete",
    input: { BackupVaultName: 0, RequesterComment: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateBackupVaultMpaApprovalTeam",
})) as any;

export type DisassociateRecoveryPointError =
  | InvalidParameterValueException
  | InvalidRequestException
  | InvalidResourceStateException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the specified continuous backup recovery point from Backup and
 * releases control of that continuous backup to the source service, such as Amazon RDS. The source service will continue to create and retain continuous backups using the
 * lifecycle that you specified in your original backup plan.
 *
 * Does not support snapshot backup recovery points.
 */
export const disassociateRecoveryPoint: API.OperationMethod<
  DisassociateRecoveryPointInput,
  DisassociateRecoveryPointResponse,
  DisassociateRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/disassociate",
    input: { BackupVaultName: 0, RecoveryPointArn: 0 },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    InvalidResourceStateException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateRecoveryPoint",
})) as any;

export type DisassociateRecoveryPointFromParentError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This action to a specific child (nested) recovery point removes the relationship
 * between the specified recovery point and its parent (composite) recovery point.
 */
export const disassociateRecoveryPointFromParent: API.OperationMethod<
  DisassociateRecoveryPointFromParentInput,
  DisassociateRecoveryPointFromParentResponse,
  DisassociateRecoveryPointFromParentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/parentAssociation",
    input: { BackupVaultName: 0, RecoveryPointArn: 0 },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateRecoveryPointFromParent",
})) as any;

export type ExportBackupPlanTemplateError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the backup plan that is specified by the plan ID as a backup template.
 */
export const exportBackupPlanTemplate: API.OperationMethod<
  ExportBackupPlanTemplateInput,
  ExportBackupPlanTemplateOutput,
  ExportBackupPlanTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup/plans/{BackupPlanId}/toTemplate",
    input: { BackupPlanId: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportBackupPlanTemplate",
})) as any;

export type GetBackupPlanError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns `BackupPlan` details for the specified `BackupPlanId`. The
 * details are the body of a backup plan in JSON format, in addition to plan metadata.
 */
export const getBackupPlan: API.OperationMethod<
  GetBackupPlanInput,
  GetBackupPlanOutput,
  GetBackupPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup/plans/{BackupPlanId}",
    input: {
      BackupPlanId: 0,
      VersionId: D.m({ query: "versionId" }),
      MaxScheduledRunsPreview: D.m({ query: "MaxScheduledRunsPreview" }),
    },
    output: {
      CreationDate: D.ts,
      DeletionDate: D.ts,
      LastExecutionDate: D.ts,
      ScheduledRunsPreview: D.list({ ExecutionTime: D.ts }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupPlan",
})) as any;

export type GetBackupPlanFromJSONError =
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a valid JSON document specifying a backup plan or an error.
 */
export const getBackupPlanFromJSON: API.OperationMethod<
  GetBackupPlanFromJSONInput,
  GetBackupPlanFromJSONOutput,
  GetBackupPlanFromJSONError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup/template/json/toPlan",
    input: { BackupPlanTemplateJson: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupPlanFromJSON",
})) as any;

export type GetBackupPlanFromTemplateError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the template specified by its `templateId` as a backup plan.
 */
export const getBackupPlanFromTemplate: API.OperationMethod<
  GetBackupPlanFromTemplateInput,
  GetBackupPlanFromTemplateOutput,
  GetBackupPlanFromTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup/template/plans/{BackupPlanTemplateId}/toPlan",
    input: { BackupPlanTemplateId: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupPlanFromTemplate",
})) as any;

export type GetBackupSelectionError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns selection metadata and a document in JSON format that specifies a list of
 * resources that are associated with a backup plan.
 */
export const getBackupSelection: API.OperationMethod<
  GetBackupSelectionInput,
  GetBackupSelectionOutput,
  GetBackupSelectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup/plans/{BackupPlanId}/selections/{SelectionId}",
    input: { BackupPlanId: 0, SelectionId: 0 },
    output: { CreationDate: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupSelection",
})) as any;

export type GetBackupVaultAccessPolicyError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the access policy document that is associated with the named backup
 * vault.
 */
export const getBackupVaultAccessPolicy: API.OperationMethod<
  GetBackupVaultAccessPolicyInput,
  GetBackupVaultAccessPolicyOutput,
  GetBackupVaultAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults/{BackupVaultName}/access-policy",
    input: { BackupVaultName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupVaultAccessPolicy",
})) as any;

export type GetBackupVaultNotificationsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns event notifications for the specified backup vault.
 */
export const getBackupVaultNotifications: API.OperationMethod<
  GetBackupVaultNotificationsInput,
  GetBackupVaultNotificationsOutput,
  GetBackupVaultNotificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults/{BackupVaultName}/notification-configuration",
    input: { BackupVaultName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupVaultNotifications",
})) as any;

export type GetLegalHoldError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This action returns details for a specified legal hold. The details are the
 * body of a legal hold in JSON format, in addition to metadata.
 */
export const getLegalHold: API.OperationMethod<
  GetLegalHoldInput,
  GetLegalHoldOutput,
  GetLegalHoldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /legal-holds/{LegalHoldId}",
    input: { LegalHoldId: 0 },
    output: {
      CreationDate: D.ts,
      CancellationDate: D.ts,
      RetainRecordUntil: D.ts,
      RecoveryPointSelection: o_RecoveryPointSelection,
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLegalHold",
})) as any;

export type GetPITRMalwareScanResultsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the malware scan results for a specified point in time within a continuous (point-in-time recovery) backup.
 */
export const getPITRMalwareScanResults: API.OperationMethod<
  GetPITRMalwareScanResultsInput,
  GetPITRMalwareScanResultsOutput,
  GetPITRMalwareScanResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /scan/pitr-malware-scan-results",
    input: {
      RecoveryPointArn: D.m({ query: "RecoveryPointArn" }),
      BackupVaultName: D.m({ query: "BackupVaultName" }),
      ScanEndTime: D.m({
        query: "ScanEndTime",
        shape: D.tsAs("epoch-seconds"),
      }),
      MalwareScanner: D.m({ query: "MalwareScanner" }),
    },
    output: { ScanEndTime: D.ts, LastScanJobTime: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPITRMalwareScanResults",
})) as any;

export type GetRecoveryPointIndexDetailsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This operation returns the metadata and details specific to
 * the backup index associated with the specified recovery point.
 */
export const getRecoveryPointIndexDetails: API.OperationMethod<
  GetRecoveryPointIndexDetailsInput,
  GetRecoveryPointIndexDetailsOutput,
  GetRecoveryPointIndexDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/index",
    input: { BackupVaultName: 0, RecoveryPointArn: 0 },
    output: {
      IndexCreationDate: D.ts,
      IndexDeletionDate: D.ts,
      IndexCompletionDate: D.ts,
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPointIndexDetails",
})) as any;

export type GetRecoveryPointRestoreMetadataError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a set of metadata key-value pairs that were used to create the backup.
 */
export const getRecoveryPointRestoreMetadata: API.OperationMethod<
  GetRecoveryPointRestoreMetadataInput,
  GetRecoveryPointRestoreMetadataOutput,
  GetRecoveryPointRestoreMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/restore-metadata",
    input: {
      BackupVaultName: 0,
      RecoveryPointArn: 0,
      BackupVaultAccountId: D.m({ query: "backupVaultAccountId" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPointRestoreMetadata",
})) as any;

export type GetRestoreJobMetadataError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request returns the metadata for the specified restore job.
 */
export const getRestoreJobMetadata: API.OperationMethod<
  GetRestoreJobMetadataInput,
  GetRestoreJobMetadataOutput,
  GetRestoreJobMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /restore-jobs/{RestoreJobId}/metadata",
    input: { RestoreJobId: 0 },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestoreJobMetadata",
})) as any;

export type GetRestoreTestingInferredMetadataError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request returns the minimal required set of metadata needed to
 * start a restore job with secure default settings. `BackupVaultName`
 * and `RecoveryPointArn` are required parameters.
 * `BackupVaultAccountId` is an optional parameter.
 */
export const getRestoreTestingInferredMetadata: API.OperationMethod<
  GetRestoreTestingInferredMetadataInput,
  GetRestoreTestingInferredMetadataOutput,
  GetRestoreTestingInferredMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /restore-testing/inferred-metadata",
    input: {
      BackupVaultAccountId: D.m({ query: "BackupVaultAccountId" }),
      BackupVaultName: D.m({ query: "BackupVaultName" }),
      RecoveryPointArn: D.m({ query: "RecoveryPointArn" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestoreTestingInferredMetadata",
})) as any;

export type GetRestoreTestingPlanError =
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns `RestoreTestingPlan` details for the specified
 * `RestoreTestingPlanName`. The details are the body of a restore testing plan
 * in JSON format, in addition to plan metadata.
 */
export const getRestoreTestingPlan: API.OperationMethod<
  GetRestoreTestingPlanInput,
  GetRestoreTestingPlanOutput,
  GetRestoreTestingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /restore-testing/plans/{RestoreTestingPlanName}",
    input: { RestoreTestingPlanName: 0 },
    output: {
      RestoreTestingPlan: {
        CreationTime: D.ts,
        LastExecutionTime: D.ts,
        LastUpdateTime: D.ts,
      },
    },
  },
  errors: [ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestoreTestingPlan",
})) as any;

export type GetRestoreTestingSelectionError =
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns RestoreTestingSelection, which displays resources
 * and elements of the restore testing plan.
 */
export const getRestoreTestingSelection: API.OperationMethod<
  GetRestoreTestingSelectionInput,
  GetRestoreTestingSelectionOutput,
  GetRestoreTestingSelectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /restore-testing/plans/{RestoreTestingPlanName}/selections/{RestoreTestingSelectionName}",
    input: { RestoreTestingPlanName: 0, RestoreTestingSelectionName: 0 },
    output: { RestoreTestingSelection: { CreationTime: D.ts } },
  },
  errors: [ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestoreTestingSelection",
})) as any;

export type GetSupportedResourceTypesError =
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the Amazon Web Services resource types supported by Backup.
 */
export const getSupportedResourceTypes: API.OperationMethod<
  GetSupportedResourceTypesRequest,
  GetSupportedResourceTypesOutput,
  GetSupportedResourceTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /supported-resource-types" },
  errors: [ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSupportedResourceTypes",
})) as any;

export type GetTieringConfigurationError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns `TieringConfiguration` details for the specified
 * `TieringConfigurationName`. The details are the body of a tiering configuration
 * in JSON format, in addition to configuration metadata.
 */
export const getTieringConfiguration: API.OperationMethod<
  GetTieringConfigurationInput,
  GetTieringConfigurationOutput,
  GetTieringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tiering-configurations/{TieringConfigurationName}",
    input: { TieringConfigurationName: 0 },
    output: {
      TieringConfiguration: { CreationTime: D.ts, LastUpdatedTime: D.ts },
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTieringConfiguration",
})) as any;

export type ListBackupAccessPointsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of the backup access points in your account and Region.
 */
export const listBackupAccessPoints: API.PaginatedOperationMethod<
  ListBackupAccessPointsRequest,
  ListBackupAccessPointsResponse,
  ListBackupAccessPointsError,
  Credentials | HttpClient.HttpClient,
  ListAccessPointsMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-access-point",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { BackupAccessPoints: D.list(o_ListAccessPointsMember) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupAccessPoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupAccessPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupAccessPointsByRecoveryPointError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the backup access points associated with the specified recovery point.
 *
 * If you own the recovery point and have shared it with other accounts, the response includes backup access
 * points created by those accounts.
 */
export const listBackupAccessPointsByRecoveryPoint: API.PaginatedOperationMethod<
  ListBackupAccessPointsByRecoveryPointRequest,
  ListBackupAccessPointsByRecoveryPointResponse,
  ListBackupAccessPointsByRecoveryPointError,
  Credentials | HttpClient.HttpClient,
  ListAccessPointsMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup-access-point/recovery-point/{RecoveryPointArn}",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      RecoveryPointArn: 0,
    },
    output: { BackupAccessPoints: D.list(o_ListAccessPointsMember) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupAccessPointsByRecoveryPoint",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupAccessPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupAccessPointsByResourceError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the backup access points associated with the specified resource, such as an Amazon S3
 * bucket.
 */
export const listBackupAccessPointsByResource: API.PaginatedOperationMethod<
  ListBackupAccessPointsByResourceRequest,
  ListBackupAccessPointsByResourceResponse,
  ListBackupAccessPointsByResourceError,
  Credentials | HttpClient.HttpClient,
  ListAccessPointsMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup-access-point/resource/{ResourceArn}",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      ResourceArn: 0,
    },
    output: { BackupAccessPoints: D.list(o_ListAccessPointsMember) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupAccessPointsByResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupAccessPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupJobsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of existing backup jobs for an authenticated account for the last 30
 * days. For a longer period of time, consider using these monitoring tools.
 */
export const listBackupJobs: API.PaginatedOperationMethod<
  ListBackupJobsInput,
  ListBackupJobsOutput,
  ListBackupJobsError,
  Credentials | HttpClient.HttpClient,
  BackupJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-jobs",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      ByResourceArn: D.m({ query: "resourceArn" }),
      ByState: D.m({ query: "state" }),
      ByBackupVaultName: D.m({ query: "backupVaultName" }),
      ByCreatedBefore: D.m({
        query: "createdBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCreatedAfter: D.m({
        query: "createdAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByResourceType: D.m({ query: "resourceType" }),
      ByAccountId: D.m({ query: "accountId" }),
      ByCompleteAfter: D.m({
        query: "completeAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCompleteBefore: D.m({
        query: "completeBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByParentJobId: D.m({ query: "parentJobId" }),
      ByMessageCategory: D.m({ query: "messageCategory" }),
    },
    output: {
      BackupJobs: D.list({
        CreationDate: D.ts,
        CompletionDate: D.ts,
        ExpectedCompletionDate: D.ts,
        StartBy: D.ts,
        InitiationDate: D.ts,
      }),
    },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupJobSummariesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This is a request for a summary of backup jobs created
 * or running within the most recent 14 days. You can
 * include parameters AccountID, State, ResourceType, MessageCategory,
 * AggregationPeriod, MaxResults, or NextToken to filter
 * results.
 *
 * This request returns a summary that contains
 * Region, Account, State, ResourceType, MessageCategory,
 * StartTime, EndTime, and Count of included jobs.
 */
export const listBackupJobSummaries: API.PaginatedOperationMethod<
  ListBackupJobSummariesInput,
  ListBackupJobSummariesOutput,
  ListBackupJobSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/backup-job-summaries",
    input: {
      AccountId: D.m({ query: "AccountId" }),
      State: D.m({ query: "State" }),
      ResourceType: D.m({ query: "ResourceType" }),
      MessageCategory: D.m({ query: "MessageCategory" }),
      AggregationPeriod: D.m({ query: "AggregationPeriod" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { BackupJobSummaries: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupJobSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupPlansError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the active backup plans for the account.
 */
export const listBackupPlans: API.PaginatedOperationMethod<
  ListBackupPlansInput,
  ListBackupPlansOutput,
  ListBackupPlansError,
  Credentials | HttpClient.HttpClient,
  BackupPlansListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup/plans",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      IncludeDeleted: D.m({ query: "includeDeleted" }),
    },
    output: { BackupPlansList: D.list(o_BackupPlansListMember) },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupPlansList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupPlanTemplatesError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the backup plan templates.
 */
export const listBackupPlanTemplates: API.PaginatedOperationMethod<
  ListBackupPlanTemplatesInput,
  ListBackupPlanTemplatesOutput,
  ListBackupPlanTemplatesError,
  Credentials | HttpClient.HttpClient,
  BackupPlanTemplatesListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup/template/plans",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupPlanTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupPlanTemplatesList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupPlanVersionsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns version metadata of your backup plans, including Amazon Resource Names (ARNs),
 * backup plan IDs, creation and deletion dates, plan names, and version IDs.
 */
export const listBackupPlanVersions: API.PaginatedOperationMethod<
  ListBackupPlanVersionsInput,
  ListBackupPlanVersionsOutput,
  ListBackupPlanVersionsError,
  Credentials | HttpClient.HttpClient,
  BackupPlansListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup/plans/{BackupPlanId}/versions",
    input: {
      BackupPlanId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { BackupPlanVersionsList: D.list(o_BackupPlansListMember) },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupPlanVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupPlanVersionsList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupSelectionsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns an array containing metadata of the resources associated with the target backup
 * plan.
 */
export const listBackupSelections: API.PaginatedOperationMethod<
  ListBackupSelectionsInput,
  ListBackupSelectionsOutput,
  ListBackupSelectionsError,
  Credentials | HttpClient.HttpClient,
  BackupSelectionsListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup/plans/{BackupPlanId}/selections",
    input: {
      BackupPlanId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { BackupSelectionsList: D.list({ CreationDate: D.ts }) },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupSelections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupSelectionsList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBackupVaultsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of recovery point storage containers along with information about
 * them.
 */
export const listBackupVaults: API.PaginatedOperationMethod<
  ListBackupVaultsInput,
  ListBackupVaultsOutput,
  ListBackupVaultsError,
  Credentials | HttpClient.HttpClient,
  BackupVaultListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults",
    input: {
      ByVaultType: D.m({ query: "vaultType" }),
      ByShared: D.m({ query: "shared" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { BackupVaultList: D.list({ CreationDate: D.ts, LockDate: D.ts }) },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackupVaults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupVaultList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCopyJobsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns metadata about your copy jobs.
 */
export const listCopyJobs: API.PaginatedOperationMethod<
  ListCopyJobsInput,
  ListCopyJobsOutput,
  ListCopyJobsError,
  Credentials | HttpClient.HttpClient,
  CopyJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /copy-jobs",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      ByResourceArn: D.m({ query: "resourceArn" }),
      ByState: D.m({ query: "state" }),
      ByCreatedBefore: D.m({
        query: "createdBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCreatedAfter: D.m({
        query: "createdAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByResourceType: D.m({ query: "resourceType" }),
      ByDestinationVaultArn: D.m({ query: "destinationVaultArn" }),
      ByAccountId: D.m({ query: "accountId" }),
      ByCompleteBefore: D.m({
        query: "completeBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCompleteAfter: D.m({
        query: "completeAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByParentJobId: D.m({ query: "parentJobId" }),
      ByMessageCategory: D.m({ query: "messageCategory" }),
      BySourceRecoveryPointArn: D.m({ query: "sourceRecoveryPointArn" }),
    },
    output: { CopyJobs: D.list(o_CopyJob) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCopyJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CopyJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCopyJobSummariesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request obtains a list of copy jobs created
 * or running within the the most recent 14 days. You can
 * include parameters AccountID, State, ResourceType, MessageCategory,
 * AggregationPeriod, MaxResults, or NextToken to filter
 * results.
 *
 * This request returns a summary that contains
 * Region, Account, State, RestourceType, MessageCategory,
 * StartTime, EndTime, and Count of included jobs.
 */
export const listCopyJobSummaries: API.PaginatedOperationMethod<
  ListCopyJobSummariesInput,
  ListCopyJobSummariesOutput,
  ListCopyJobSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/copy-job-summaries",
    input: {
      AccountId: D.m({ query: "AccountId" }),
      State: D.m({ query: "State" }),
      ResourceType: D.m({ query: "ResourceType" }),
      MessageCategory: D.m({ query: "MessageCategory" }),
      AggregationPeriod: D.m({ query: "AggregationPeriod" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { CopyJobSummaries: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCopyJobSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFrameworksError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of all frameworks for an Amazon Web Services account and Amazon Web Services Region.
 */
export const listFrameworks: API.PaginatedOperationMethod<
  ListFrameworksInput,
  ListFrameworksOutput,
  ListFrameworksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/frameworks",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Frameworks: D.list({ CreationTime: D.ts }) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFrameworks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIndexedRecoveryPointsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This operation returns a list of recovery points that have an
 * associated index, belonging to the specified account.
 *
 * Optional parameters you can include are: MaxResults;
 * NextToken; SourceResourceArns; CreatedBefore; CreatedAfter;
 * and ResourceType.
 */
export const listIndexedRecoveryPoints: API.PaginatedOperationMethod<
  ListIndexedRecoveryPointsInput,
  ListIndexedRecoveryPointsOutput,
  ListIndexedRecoveryPointsError,
  Credentials | HttpClient.HttpClient,
  IndexedRecoveryPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /indexes/recovery-point",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      SourceResourceArn: D.m({ query: "sourceResourceArn" }),
      CreatedBefore: D.m({
        query: "createdBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      CreatedAfter: D.m({
        query: "createdAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ResourceType: D.m({ query: "resourceType" }),
      IndexStatus: D.m({ query: "indexStatus" }),
    },
    output: {
      IndexedRecoveryPoints: D.list({
        BackupCreationDate: D.ts,
        IndexCreationDate: D.ts,
      }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndexedRecoveryPoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IndexedRecoveryPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLegalHoldsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This action returns metadata about active and previous legal holds.
 */
export const listLegalHolds: API.PaginatedOperationMethod<
  ListLegalHoldsInput,
  ListLegalHoldsOutput,
  ListLegalHoldsError,
  Credentials | HttpClient.HttpClient,
  LegalHold
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /legal-holds",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      LegalHolds: D.list({ CreationDate: D.ts, CancellationDate: D.ts }),
    },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLegalHolds",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LegalHolds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProtectedResourcesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns an array of resources with recovery points created by Backup
 * (regardless of the recovery point's status),
 * including the time the resource was saved, an Amazon Resource Name (ARN) of the resource,
 * and a resource type.
 */
export const listProtectedResources: API.PaginatedOperationMethod<
  ListProtectedResourcesInput,
  ListProtectedResourcesOutput,
  ListProtectedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProtectedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /resources",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { Results: D.list(o_ProtectedResource) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtectedResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProtectedResourcesByBackupVaultError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request lists the protected resources corresponding to each backup vault.
 */
export const listProtectedResourcesByBackupVault: API.PaginatedOperationMethod<
  ListProtectedResourcesByBackupVaultInput,
  ListProtectedResourcesByBackupVaultOutput,
  ListProtectedResourcesByBackupVaultError,
  Credentials | HttpClient.HttpClient,
  ProtectedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults/{BackupVaultName}/resources",
    input: {
      BackupVaultName: 0,
      BackupVaultAccountId: D.m({ query: "backupVaultAccountId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { Results: D.list(o_ProtectedResource) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtectedResourcesByBackupVault",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecoveryPointsByBackupVaultError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns detailed information about the recovery points stored in a backup vault.
 */
export const listRecoveryPointsByBackupVault: API.PaginatedOperationMethod<
  ListRecoveryPointsByBackupVaultInput,
  ListRecoveryPointsByBackupVaultOutput,
  ListRecoveryPointsByBackupVaultError,
  Credentials | HttpClient.HttpClient,
  RecoveryPointByBackupVault
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /backup-vaults/{BackupVaultName}/recovery-points",
    input: {
      BackupVaultName: 0,
      BackupVaultAccountId: D.m({ query: "backupVaultAccountId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      ByResourceArn: D.m({ query: "resourceArn" }),
      ByResourceType: D.m({ query: "resourceType" }),
      ByBackupPlanId: D.m({ query: "backupPlanId" }),
      ByCreatedBefore: D.m({
        query: "createdBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCreatedAfter: D.m({
        query: "createdAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByParentRecoveryPointArn: D.m({ query: "parentRecoveryPointArn" }),
    },
    output: {
      RecoveryPoints: D.list({
        CreationDate: D.ts,
        InitiationDate: D.ts,
        CompletionDate: D.ts,
        CalculatedLifecycle: o_CalculatedLifecycle,
        LastRestoreTime: D.ts,
        AggregatedScanResult: o_AggregatedScanResult,
      }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPointsByBackupVault",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecoveryPointsByLegalHoldError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This action returns recovery point ARNs (Amazon Resource Names) of the
 * specified legal hold.
 */
export const listRecoveryPointsByLegalHold: API.PaginatedOperationMethod<
  ListRecoveryPointsByLegalHoldInput,
  ListRecoveryPointsByLegalHoldOutput,
  ListRecoveryPointsByLegalHoldError,
  Credentials | HttpClient.HttpClient,
  RecoveryPointMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /legal-holds/{LegalHoldId}/recovery-points",
    input: {
      LegalHoldId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPointsByLegalHold",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecoveryPointsByResourceError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * The information about the recovery points of the type specified by a
 * resource Amazon Resource Name (ARN).
 *
 * For Amazon EFS and Amazon EC2, this action only lists recovery points
 * created by Backup.
 */
export const listRecoveryPointsByResource: API.PaginatedOperationMethod<
  ListRecoveryPointsByResourceInput,
  ListRecoveryPointsByResourceOutput,
  ListRecoveryPointsByResourceError,
  Credentials | HttpClient.HttpClient,
  RecoveryPointByResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /resources/{ResourceArn}/recovery-points",
    input: {
      ResourceArn: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      ManagedByAWSBackupOnly: D.m({ query: "managedByAWSBackupOnly" }),
    },
    output: {
      RecoveryPoints: D.list({
        CreationDate: D.ts,
        AggregatedScanResult: o_AggregatedScanResult,
      }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPointsByResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReportJobsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns details about your report jobs.
 */
export const listReportJobs: API.PaginatedOperationMethod<
  ListReportJobsInput,
  ListReportJobsOutput,
  ListReportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/report-jobs",
    input: {
      ByReportPlanName: D.m({ query: "ReportPlanName" }),
      ByCreationBefore: D.m({
        query: "CreationBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCreationAfter: D.m({
        query: "CreationAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByStatus: D.m({ query: "Status" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { ReportJobs: D.list(o_ReportJob) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReportPlansError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of your report plans. For detailed information about a single report
 * plan, use `DescribeReportPlan`.
 */
export const listReportPlans: API.PaginatedOperationMethod<
  ListReportPlansInput,
  ListReportPlansOutput,
  ListReportPlansError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/report-plans",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { ReportPlans: D.list(o_ReportPlan) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReportPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRestoreAccessBackupVaultsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of restore access backup vaults associated with a specified backup vault.
 */
export const listRestoreAccessBackupVaults: API.PaginatedOperationMethod<
  ListRestoreAccessBackupVaultsInput,
  ListRestoreAccessBackupVaultsOutput,
  ListRestoreAccessBackupVaultsError,
  Credentials | HttpClient.HttpClient,
  RestoreAccessBackupVaultListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /logically-air-gapped-backup-vaults/{BackupVaultName}/restore-access-backup-vaults",
    input: {
      BackupVaultName: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      RestoreAccessBackupVaults: D.list({
        CreationDate: D.ts,
        ApprovalDate: D.ts,
        LatestRevokeRequest: { InitiationDate: D.ts, ExpiryDate: D.ts },
      }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRestoreAccessBackupVaults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreAccessBackupVaults",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRestoreJobsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of jobs that Backup initiated to restore a saved resource,
 * including details about the recovery process.
 */
export const listRestoreJobs: API.PaginatedOperationMethod<
  ListRestoreJobsInput,
  ListRestoreJobsOutput,
  ListRestoreJobsError,
  Credentials | HttpClient.HttpClient,
  RestoreJobsListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /restore-jobs",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      ByAccountId: D.m({ query: "accountId" }),
      ByResourceType: D.m({ query: "resourceType" }),
      ByCreatedBefore: D.m({
        query: "createdBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCreatedAfter: D.m({
        query: "createdAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByStatus: D.m({ query: "status" }),
      ByCompleteBefore: D.m({
        query: "completeBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCompleteAfter: D.m({
        query: "completeAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByRestoreTestingPlanArn: D.m({ query: "restoreTestingPlanArn" }),
      ByParentJobId: D.m({ query: "parentJobId" }),
    },
    output: { RestoreJobs: D.list(o_RestoreJobsListMember) },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRestoreJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRestoreJobsByProtectedResourceError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This returns restore jobs that contain the specified protected resource.
 *
 * You must include `ResourceArn`. You can optionally include
 * `NextToken`, `ByStatus`, `MaxResults`,
 * `ByRecoveryPointCreationDateAfter` , and
 * `ByRecoveryPointCreationDateBefore`.
 */
export const listRestoreJobsByProtectedResource: API.PaginatedOperationMethod<
  ListRestoreJobsByProtectedResourceInput,
  ListRestoreJobsByProtectedResourceOutput,
  ListRestoreJobsByProtectedResourceError,
  Credentials | HttpClient.HttpClient,
  RestoreJobsListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /resources/{ResourceArn}/restore-jobs",
    input: {
      ResourceArn: 0,
      ByStatus: D.m({ query: "status" }),
      ByRecoveryPointCreationDateAfter: D.m({
        query: "recoveryPointCreationDateAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByRecoveryPointCreationDateBefore: D.m({
        query: "recoveryPointCreationDateBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { RestoreJobs: D.list(o_RestoreJobsListMember) },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRestoreJobsByProtectedResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRestoreJobSummariesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request obtains a summary of restore jobs created
 * or running within the the most recent 14 days. You can
 * include parameters AccountID, State, ResourceType,
 * AggregationPeriod, MaxResults, or NextToken to filter
 * results.
 *
 * This request returns a summary that contains
 * Region, Account, State, RestourceType, MessageCategory,
 * StartTime, EndTime, and Count of included jobs.
 */
export const listRestoreJobSummaries: API.PaginatedOperationMethod<
  ListRestoreJobSummariesInput,
  ListRestoreJobSummariesOutput,
  ListRestoreJobSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/restore-job-summaries",
    input: {
      AccountId: D.m({ query: "AccountId" }),
      State: D.m({ query: "State" }),
      ResourceType: D.m({ query: "ResourceType" }),
      AggregationPeriod: D.m({ query: "AggregationPeriod" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { RestoreJobSummaries: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRestoreJobSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRestoreTestingPlansError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of restore testing plans.
 */
export const listRestoreTestingPlans: API.PaginatedOperationMethod<
  ListRestoreTestingPlansInput,
  ListRestoreTestingPlansOutput,
  ListRestoreTestingPlansError,
  Credentials | HttpClient.HttpClient,
  RestoreTestingPlanForList
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /restore-testing/plans",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: {
      RestoreTestingPlans: D.list({
        CreationTime: D.ts,
        LastExecutionTime: D.ts,
        LastUpdateTime: D.ts,
      }),
    },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRestoreTestingPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreTestingPlans",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRestoreTestingSelectionsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of restore testing selections. Can be filtered
 * by `MaxResults` and `RestoreTestingPlanName`.
 */
export const listRestoreTestingSelections: API.PaginatedOperationMethod<
  ListRestoreTestingSelectionsInput,
  ListRestoreTestingSelectionsOutput,
  ListRestoreTestingSelectionsError,
  Credentials | HttpClient.HttpClient,
  RestoreTestingSelectionForList
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /restore-testing/plans/{RestoreTestingPlanName}/selections",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      RestoreTestingPlanName: 0,
    },
    output: { RestoreTestingSelections: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRestoreTestingSelections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreTestingSelections",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListScanJobsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of existing scan jobs for an authenticated account for the last 30 days.
 */
export const listScanJobs: API.PaginatedOperationMethod<
  ListScanJobsInput,
  ListScanJobsOutput,
  ListScanJobsError,
  Credentials | HttpClient.HttpClient,
  ScanJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /scan/jobs",
    input: {
      ByAccountId: D.m({ query: "ByAccountId" }),
      ByBackupVaultName: D.m({ query: "ByBackupVaultName" }),
      ByCompleteAfter: D.m({
        query: "ByCompleteAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByCompleteBefore: D.m({
        query: "ByCompleteBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ByMalwareScanner: D.m({ query: "ByMalwareScanner" }),
      ByRecoveryPointArn: D.m({ query: "ByRecoveryPointArn" }),
      ByResourceArn: D.m({ query: "ByResourceArn" }),
      ByResourceType: D.m({ query: "ByResourceType" }),
      ByScanResultStatus: D.m({ query: "ByScanResultStatus" }),
      ByState: D.m({ query: "ByState" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: {
      ScanJobs: D.list({
        CompletionDate: D.ts,
        ContinuousScanEndTime: D.ts,
        ContinuousScanStartTime: D.ts,
        CreationDate: D.ts,
      }),
    },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScanJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScanJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListScanJobSummariesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This is a request for a summary of scan jobs created or running within the most recent 14 days.
 */
export const listScanJobSummaries: API.PaginatedOperationMethod<
  ListScanJobSummariesInput,
  ListScanJobSummariesOutput,
  ListScanJobSummariesError,
  Credentials | HttpClient.HttpClient,
  ScanJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/scan-job-summaries",
    input: {
      AccountId: D.m({ query: "AccountId" }),
      ResourceType: D.m({ query: "ResourceType" }),
      MalwareScanner: D.m({ query: "MalwareScanner" }),
      ScanResultStatus: D.m({ query: "ScanResultStatus" }),
      State: D.m({ query: "State" }),
      AggregationPeriod: D.m({ query: "AggregationPeriod" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { ScanJobSummaries: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScanJobSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScanJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the tags assigned to the resource, such as a target recovery point, backup plan,
 * or backup vault.
 *
 * This operation returns results depending on the resource type used in the value for
 * `resourceArn`. For example, recovery points of Amazon DynamoDB with
 * Advanced Settings have an ARN (Amazon Resource Name) that begins with
 * `arn:aws:backup`. Recovery points (backups) of DynamoDB without
 * Advanced Settings enabled have an ARN that begins with
 * `arn:aws:dynamodb`.
 *
 * When this operation is called and when you include values of `resourceArn`
 * that have an ARN other than `arn:aws:backup`, it may return one of the
 * exceptions listed below. To prevent this exception, include only values representing
 * resource types that are fully managed by Backup. These have an ARN that begins
 * `arn:aws:backup` and they are noted in the Feature availability by resource table.
 */
export const listTags: API.PaginatedOperationMethod<
  ListTagsInput,
  ListTagsOutput,
  ListTagsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: {
      ResourceArn: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTieringConfigurationsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of tiering configurations.
 */
export const listTieringConfigurations: API.PaginatedOperationMethod<
  ListTieringConfigurationsInput,
  ListTieringConfigurationsOutput,
  ListTieringConfigurationsError,
  Credentials | HttpClient.HttpClient,
  TieringConfigurationsListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /tiering-configurations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      TieringConfigurations: D.list({
        CreationTime: D.ts,
        LastUpdatedTime: D.ts,
      }),
    },
  },
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTieringConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TieringConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutBackupVaultAccessPolicyError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets a resource-based policy that is used to manage access permissions on the target
 * backup vault. Requires a backup vault name and an access policy document in JSON
 * format.
 */
export const putBackupVaultAccessPolicy: API.OperationMethod<
  PutBackupVaultAccessPolicyInput,
  PutBackupVaultAccessPolicyResponse,
  PutBackupVaultAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup-vaults/{BackupVaultName}/access-policy",
    input: { BackupVaultName: 0, Policy: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBackupVaultAccessPolicy",
})) as any;

export type PutBackupVaultLockConfigurationError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Applies Backup Vault Lock to a backup vault, preventing attempts to delete
 * any recovery point stored in or created in a backup vault. Vault Lock also prevents
 * attempts to update the lifecycle policy that controls the retention period of any recovery
 * point currently stored in a backup vault. If specified, Vault Lock enforces a minimum and
 * maximum retention period for future backup and copy jobs that target a backup vault.
 *
 * Backup Vault Lock has been assessed by Cohasset Associates for use in environments
 * that are subject to SEC 17a-4, CFTC, and FINRA regulations. For more information about
 * how Backup Vault Lock relates to these regulations, see the
 * Cohasset Associates
 * Compliance Assessment.
 *
 * For more information, see Backup Vault Lock.
 */
export const putBackupVaultLockConfiguration: API.OperationMethod<
  PutBackupVaultLockConfigurationInput,
  PutBackupVaultLockConfigurationResponse,
  PutBackupVaultLockConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup-vaults/{BackupVaultName}/vault-lock",
    input: {
      BackupVaultName: 0,
      MinRetentionDays: 0,
      MaxRetentionDays: 0,
      ChangeableForDays: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBackupVaultLockConfiguration",
})) as any;

export type PutBackupVaultNotificationsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Turns on notifications on a backup vault for the specified topic and events.
 */
export const putBackupVaultNotifications: API.OperationMethod<
  PutBackupVaultNotificationsInput,
  PutBackupVaultNotificationsResponse,
  PutBackupVaultNotificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup-vaults/{BackupVaultName}/notification-configuration",
    input: { BackupVaultName: 0, SNSTopicArn: 0, BackupVaultEvents: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBackupVaultNotifications",
})) as any;

export type PutRestoreValidationResultError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request allows you to send your independent self-run
 * restore test validation results.
 * `RestoreJobId` and `ValidationStatus`
 * are required. Optionally, you can input a
 * `ValidationStatusMessage`.
 */
export const putRestoreValidationResult: API.OperationMethod<
  PutRestoreValidationResultInput,
  PutRestoreValidationResultResponse,
  PutRestoreValidationResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /restore-jobs/{RestoreJobId}/validations",
    input: { RestoreJobId: 0, ValidationStatus: 0, ValidationStatusMessage: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRestoreValidationResult",
})) as any;

export type RevokeRestoreAccessBackupVaultError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Revokes access to a restore access backup vault, removing the ability to restore from its recovery points and permanently deleting the vault.
 */
export const revokeRestoreAccessBackupVault: API.OperationMethod<
  RevokeRestoreAccessBackupVaultInput,
  RevokeRestoreAccessBackupVaultResponse,
  RevokeRestoreAccessBackupVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /logically-air-gapped-backup-vaults/{BackupVaultName}/restore-access-backup-vaults/{RestoreAccessBackupVaultArn}",
    input: {
      BackupVaultName: 0,
      RestoreAccessBackupVaultArn: 0,
      RequesterComment: D.m({ query: "requesterComment" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeRestoreAccessBackupVault",
})) as any;

export type StartBackupJobError =
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts an on-demand backup job for the specified resource.
 */
export const startBackupJob: API.OperationMethod<
  StartBackupJobInput,
  StartBackupJobOutput,
  StartBackupJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /backup-jobs",
    input: {
      BackupVaultName: 0,
      LogicallyAirGappedBackupVaultArn: 0,
      ResourceArn: 0,
      IamRoleArn: 0,
      IdempotencyToken: D.m({ idempotency: true }),
      StartWindowMinutes: 0,
      CompleteWindowMinutes: 0,
      Lifecycle: i_Lifecycle,
      RecoveryPointTags: 0,
      BackupOptions: 0,
      Index: 0,
    },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBackupJob",
})) as any;

export type StartCopyJobError =
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a job to create a one-time copy of the specified resource.
 *
 * Does not support continuous backups.
 *
 * See Copy
 * job retry for information on how Backup retries copy job
 * operations.
 */
export const startCopyJob: API.OperationMethod<
  StartCopyJobInput,
  StartCopyJobOutput,
  StartCopyJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /copy-jobs",
    input: {
      RecoveryPointArn: 0,
      SourceBackupVaultName: 0,
      DestinationBackupVaultArn: 0,
      IamRoleArn: 0,
      IdempotencyToken: D.m({ idempotency: true }),
      Lifecycle: i_Lifecycle,
    },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCopyJob",
})) as any;

export type StartReportJobError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts an on-demand report job for the specified report plan.
 */
export const startReportJob: API.OperationMethod<
  StartReportJobInput,
  StartReportJobOutput,
  StartReportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/report-jobs/{ReportPlanName}",
    input: { ReportPlanName: 0, IdempotencyToken: D.m({ idempotency: true }) },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReportJob",
})) as any;

export type StartRestoreJobError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Recovers the saved resource identified by an Amazon Resource Name (ARN).
 */
export const startRestoreJob: API.OperationMethod<
  StartRestoreJobInput,
  StartRestoreJobOutput,
  StartRestoreJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /restore-jobs",
    input: {
      RecoveryPointArn: 0,
      Metadata: 0,
      IamRoleArn: 0,
      IdempotencyToken: D.m({ idempotency: true }),
      ResourceType: 0,
      CopySourceTagsToRestoredResource: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRestoreJob",
})) as any;

export type StartScanJobError =
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts scanning jobs for specific resources.
 */
export const startScanJob: API.OperationMethod<
  StartScanJobInput,
  StartScanJobOutput,
  StartScanJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /scan/job",
    input: {
      BackupVaultName: 0,
      ContinuousScanEndTime: 0,
      IamRoleArn: 0,
      IdempotencyToken: 0,
      MalwareScanner: 0,
      RecoveryPointArn: 0,
      ScanBaseRecoveryPointArn: 0,
      ScanMode: 0,
      ScannerRoleArn: 0,
    },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartScanJob",
})) as any;

export type StopBackupJobError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Attempts to cancel a job to create a one-time backup of a resource.
 *
 * This action is not supported for the following services:
 *
 * - Amazon Aurora
 *
 * - Amazon DocumentDB (with MongoDB compatibility)
 *
 * - Amazon FSx for Lustre
 *
 * - Amazon FSx for NetApp ONTAP
 *
 * - Amazon FSx for OpenZFS
 *
 * - Amazon FSx for Windows File Server
 *
 * - Amazon Neptune
 *
 * - SAP HANA databases on Amazon EC2 instances
 *
 * - Amazon RDS
 */
export const stopBackupJob: API.OperationMethod<
  StopBackupJobInput,
  StopBackupJobResponse,
  StopBackupJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup-jobs/{BackupJobId}",
    input: { BackupJobId: 0 },
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBackupJob",
})) as any;

export type TagResourceError =
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Assigns a set of key-value pairs to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Removes a set of key-value pairs from a recovery point, backup plan, or backup vault
 * identified by an Amazon Resource Name (ARN)
 *
 * This API is not supported for recovery points for resource types
 * including Aurora, Amazon DocumentDB. Amazon EBS,
 * Amazon FSx, Neptune, and Amazon RDS.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /untag/{ResourceArn}",
    input: { ResourceArn: 0, TagKeyList: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateBackupPlanError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates the specified backup plan. The new version is uniquely identified by its ID.
 */
export const updateBackupPlan: API.OperationMethod<
  UpdateBackupPlanInput,
  UpdateBackupPlanOutput,
  UpdateBackupPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup/plans/{BackupPlanId}",
    input: { BackupPlanId: 0, BackupPlan: i_BackupPlanInput },
    output: { CreationDate: D.ts },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackupPlan",
})) as any;

export type UpdateFrameworkError =
  | AlreadyExistsException
  | ConflictException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates the specified framework.
 */
export const updateFramework: API.OperationMethod<
  UpdateFrameworkInput,
  UpdateFrameworkOutput,
  UpdateFrameworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /audit/frameworks/{FrameworkName}",
    input: {
      FrameworkName: 0,
      FrameworkDescription: 0,
      FrameworkControls: D.list(i_FrameworkControl),
      IdempotencyToken: D.m({ idempotency: true }),
    },
    output: { CreationTime: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFramework",
})) as any;

export type UpdateGlobalSettingsError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates whether the Amazon Web Services account has enabled different cross-account management options, including cross-account backup, multi-party approval, and delegated administrator. Returns an error if the account is not an Organizations management account. Use the `DescribeGlobalSettings` API to determine the current settings.
 */
export const updateGlobalSettings: API.OperationMethod<
  UpdateGlobalSettingsInput,
  UpdateGlobalSettingsResponse,
  UpdateGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /global-settings",
    input: { GlobalSettings: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalSettings",
})) as any;

export type UpdateRecoveryPointIndexSettingsError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This operation updates the settings of a recovery point index.
 *
 * Required: BackupVaultName, RecoveryPointArn, and IAMRoleArn
 */
export const updateRecoveryPointIndexSettings: API.OperationMethod<
  UpdateRecoveryPointIndexSettingsInput,
  UpdateRecoveryPointIndexSettingsOutput,
  UpdateRecoveryPointIndexSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/index",
    input: { BackupVaultName: 0, RecoveryPointArn: 0, IamRoleArn: 0, Index: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecoveryPointIndexSettings",
})) as any;

export type UpdateRecoveryPointLifecycleError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the transition lifecycle of a recovery point.
 *
 * The lifecycle defines when a protected resource is transitioned to cold storage and when
 * it expires. Backup transitions and expires backups automatically according to
 * the lifecycle that you define.
 *
 * Resource types that can transition to cold storage are listed in the Feature availability by resource table. Backup ignores this expression for
 * other resource types.
 *
 * Backups transitioned to cold storage must be stored in cold storage for a minimum of 90
 * days. Therefore, the “retention” setting must be 90 days greater than the “transition to
 * cold after days” setting. The “transition to cold after days” setting cannot be changed
 * after a backup has been transitioned to cold.
 *
 * If your lifecycle currently uses the parameters `DeleteAfterDays` and
 * `MoveToColdStorageAfterDays`, include these parameters and their values when you call
 * this operation. Not including them may result in your plan updating with null values.
 *
 * This operation does not support continuous backups.
 */
export const updateRecoveryPointLifecycle: API.OperationMethod<
  UpdateRecoveryPointLifecycleInput,
  UpdateRecoveryPointLifecycleOutput,
  UpdateRecoveryPointLifecycleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}",
    input: { BackupVaultName: 0, RecoveryPointArn: 0, Lifecycle: i_Lifecycle },
    output: { CalculatedLifecycle: o_CalculatedLifecycle },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecoveryPointLifecycle",
})) as any;

export type UpdateRegionSettingsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates the current service opt-in settings for the Region.
 *
 * Use
 * the `DescribeRegionSettings` API to determine the resource types that are
 * supported.
 */
export const updateRegionSettings: API.OperationMethod<
  UpdateRegionSettingsInput,
  UpdateRegionSettingsResponse,
  UpdateRegionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /account-settings",
    input: {
      ResourceTypeOptInPreference: 0,
      ResourceTypeManagementPreference: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegionSettings",
})) as any;

export type UpdateReportPlanError =
  | ConflictException
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates the specified report plan.
 */
export const updateReportPlan: API.OperationMethod<
  UpdateReportPlanInput,
  UpdateReportPlanOutput,
  UpdateReportPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /audit/report-plans/{ReportPlanName}",
    input: {
      ReportPlanName: 0,
      ReportPlanDescription: 0,
      ReportDeliveryChannel: i_ReportDeliveryChannel,
      ReportSetting: i_ReportSetting,
      IdempotencyToken: D.m({ idempotency: true }),
    },
    output: { CreationTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReportPlan",
})) as any;

export type UpdateRestoreTestingPlanError =
  | ConflictException
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request will send changes to your specified restore testing
 * plan. `RestoreTestingPlanName`
 * cannot be updated after it is created.
 *
 * `RecoveryPointSelection` can contain:
 *
 * - `Algorithm`
 *
 * - `ExcludeVaults`
 *
 * - `IncludeVaults`
 *
 * - `RecoveryPointTypes`
 *
 * - `SelectionWindowDays`
 */
export const updateRestoreTestingPlan: API.OperationMethod<
  UpdateRestoreTestingPlanInput,
  UpdateRestoreTestingPlanOutput,
  UpdateRestoreTestingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /restore-testing/plans/{RestoreTestingPlanName}",
    input: {
      RestoreTestingPlan: {
        RecoveryPointSelection: i_RestoreTestingRecoveryPointSelection,
        ScheduleExpression: 0,
        ScheduleExpressionTimezone: 0,
        StartWindowHours: 0,
      },
      RestoreTestingPlanName: 0,
    },
    output: { CreationTime: D.ts, UpdateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRestoreTestingPlan",
})) as any;

export type UpdateRestoreTestingSelectionError =
  | ConflictException
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates the specified restore testing selection.
 *
 * Most elements except the `RestoreTestingSelectionName`
 * can be updated with this request.
 *
 * You can use either protected resource ARNs or conditions, but not both.
 */
export const updateRestoreTestingSelection: API.OperationMethod<
  UpdateRestoreTestingSelectionInput,
  UpdateRestoreTestingSelectionOutput,
  UpdateRestoreTestingSelectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /restore-testing/plans/{RestoreTestingPlanName}/selections/{RestoreTestingSelectionName}",
    input: {
      RestoreTestingPlanName: 0,
      RestoreTestingSelection: {
        IamRoleArn: 0,
        ProtectedResourceArns: 0,
        ProtectedResourceConditions: i_ProtectedResourceConditions,
        RestoreMetadataOverrides: 0,
        ValidationWindowHours: 0,
      },
      RestoreTestingSelectionName: 0,
    },
    output: { CreationTime: D.ts, UpdateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRestoreTestingSelection",
})) as any;

export type UpdateTieringConfigurationError =
  | AlreadyExistsException
  | ConflictException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request will send changes to your specified tiering
 * configuration. `TieringConfigurationName`
 * cannot be updated after it is created.
 *
 * `ResourceSelection` can contain:
 *
 * - `Resources`
 *
 * - `TieringDownSettingsInDays`
 *
 * - `ResourceType`
 */
export const updateTieringConfiguration: API.OperationMethod<
  UpdateTieringConfigurationInput,
  UpdateTieringConfigurationOutput,
  UpdateTieringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /tiering-configurations/{TieringConfigurationName}",
    input: {
      TieringConfigurationName: 0,
      TieringConfiguration: {
        ResourceSelection: D.list(i_ResourceSelection),
        BackupVaultName: 0,
      },
    },
    output: { CreationTime: D.ts, LastUpdatedTime: D.ts },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTieringConfiguration",
})) as any;

const i_BackupPlanInput: D.LazyStruct = () => ({
  BackupPlanName: 0,
  Rules: D.list({
    RuleName: 0,
    TargetBackupVaultName: 0,
    TargetLogicallyAirGappedBackupVaultArn: 0,
    ScheduleExpression: 0,
    StartWindowMinutes: 0,
    CompletionWindowMinutes: 0,
    Lifecycle: i_Lifecycle,
    RecoveryPointTags: 0,
    CopyActions: D.list({
      Lifecycle: i_Lifecycle,
      DestinationBackupVaultArn: 0,
    }),
    EnableContinuousBackup: 0,
    ScheduleExpressionTimezone: 0,
    IndexActions: D.list({ ResourceTypes: 0 }),
    ScanActions: D.list({ MalwareScanner: 0, ScanMode: 0 }),
  }),
  AdvancedBackupSettings: D.list({ ResourceType: 0, BackupOptions: 0 }),
  ScanSettings: D.list({
    MalwareScanner: 0,
    ResourceTypes: 0,
    ScannerRoleArn: 0,
  }),
});
const i_ConditionParameter: D.LazyStruct = () => ({
  ConditionKey: 0,
  ConditionValue: 0,
});
const i_FrameworkControl: D.LazyStruct = () => ({
  ControlName: 0,
  ControlInputParameters: D.list({ ParameterName: 0, ParameterValue: 0 }),
  ControlScope: {
    ComplianceResourceIds: 0,
    ComplianceResourceTypes: 0,
    Tags: 0,
  },
});
const i_Lifecycle: D.LazyStruct = () => ({
  MoveToColdStorageAfterDays: 0,
  DeleteAfterDays: 0,
  OptInToArchiveForSupportedResources: 0,
  DeleteAfterEvent: 0,
});
const i_ProtectedResourceConditions: D.LazyStruct = () => ({
  StringEquals: D.list(i_KeyValue),
  StringNotEquals: D.list(i_KeyValue),
});
const i_ReportDeliveryChannel: D.LazyStruct = () => ({
  S3BucketName: 0,
  S3KeyPrefix: 0,
  Formats: 0,
});
const i_ReportSetting: D.LazyStruct = () => ({
  ReportTemplate: 0,
  FrameworkArns: 0,
  NumberOfFrameworks: 0,
  Accounts: 0,
  OrganizationUnits: 0,
  Regions: 0,
});
const i_ResourceSelection: D.LazyStruct = () => ({
  Resources: 0,
  TieringDownSettingsInDays: 0,
  ResourceType: 0,
});
const i_RestoreTestingRecoveryPointSelection: D.LazyStruct = () => ({
  Algorithm: 0,
  ExcludeVaults: 0,
  IncludeVaults: 0,
  RecoveryPointTypes: 0,
  SelectionWindowDays: 0,
});
const o_AggregatedScanResult: D.LazyStruct = () => ({ LastComputed: D.ts });
const o_BackupPlansListMember: D.LazyStruct = () => ({
  CreationDate: D.ts,
  DeletionDate: D.ts,
  LastExecutionDate: D.ts,
});
const o_CalculatedLifecycle: D.LazyStruct = () => ({
  MoveToColdStorageAt: D.ts,
  DeleteAt: D.ts,
});
const o_CopyJob: D.LazyStruct = () => ({
  CreationDate: D.ts,
  CompletionDate: D.ts,
});
const o_ListAccessPointsMember: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_ProtectedResource: D.LazyStruct = () => ({ LastBackupTime: D.ts });
const o_RecoveryPointSelection: D.LazyStruct = () => ({
  DateRange: { FromDate: D.ts, ToDate: D.ts },
});
const o_ReportJob: D.LazyStruct = () => ({
  CreationTime: D.ts,
  CompletionTime: D.ts,
});
const o_ReportPlan: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastAttemptedExecutionTime: D.ts,
  LastSuccessfulExecutionTime: D.ts,
});
const o_RestoreJobsListMember: D.LazyStruct = () => ({
  CreationDate: D.ts,
  CompletionDate: D.ts,
  RecoveryPointCreationDate: D.ts,
});
const i_KeyValue: D.LazyStruct = () => ({ Key: 0, Value: 0 });
