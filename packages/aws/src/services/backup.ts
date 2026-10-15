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
  sdkId: "Backup",
  serviceShapeName: "CryoControllerUserManager",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "backup" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-15");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://backup-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://backup-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://backup.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://backup.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://backup.{R}.{D}","properties":{},"headers":{}}');

export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()("AlreadyExistsException", {
    Code: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    CreatorRequestId: /*@__PURE__*/ S.optional(S.String),
    Arn: /*@__PURE__*/ S.optional(S.String),
    Type: /*@__PURE__*/ S.optional(S.String),
    Context: /*@__PURE__*/ S.optional(S.String),
  }).pipe(C.withAlreadyExistsError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
      Context: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class DependencyFailureException
  extends /*@__PURE__*/ S.TaggedError<DependencyFailureException>()("DependencyFailureException", {
    Code: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Type: /*@__PURE__*/ S.optional(S.String),
    Context: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
      Context: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    Code: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Type: /*@__PURE__*/ S.optional(S.String),
    Context: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateException>()(
    "InvalidResourceStateException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
      Context: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    Code: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Type: /*@__PURE__*/ S.optional(S.String),
    Context: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class MissingParameterValueException
  extends /*@__PURE__*/ S.TaggedError<MissingParameterValueException>()(
    "MissingParameterValueException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
      Context: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    Code: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Type: /*@__PURE__*/ S.optional(S.String),
    Context: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
      Context: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withServerError) {}
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
export type LegalHoldStatus = "CREATING" | "ACTIVE" | "CANCELING" | "CANCELED" | (string & {});
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
export type RestoreTestingRecoveryPointType = "CONTINUOUS" | "SNAPSHOT" | (string & {});
export type RestoreTestingRecoveryPointTypeList = RestoreTestingRecoveryPointType[];
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
export type MpaSessionStatus = "PENDING" | "APPROVED" | "FAILED" | (string & {});
export interface LatestMpaApprovalTeamUpdate {
  MpaSessionArn?: string;
  Status?: MpaSessionStatus;
  StatusMessage?: string;
  InitiationDate?: Date;
  ExpiryDate?: Date;
}
export type EncryptionKeyType = "AWS_OWNED_KMS_KEY" | "CUSTOMER_MANAGED_KMS_KEY" | (string & {});
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
export type IndexStatus = "PENDING" | "ACTIVE" | "FAILED" | "DELETING" | (string & {});
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
export type ResourceTypeOptInPreference = { [key: string]: boolean | undefined };
export type ResourceTypeManagementPreference = { [key: string]: boolean | undefined };
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
export type RestoreDeletionStatus = "DELETING" | "FAILED" | "SUCCESSFUL" | (string & {});
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
export type ScanResultStatus = "NO_THREATS_FOUND" | "THREATS_FOUND" | "UNKNOWN" | (string & {});
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
export type ListBackupAccessPointsByRecoveryPointRequestMaxResultsInteger = number;
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
export type AggregationPeriod = "ONE_DAY" | "SEVEN_DAYS" | "FOURTEEN_DAYS" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateBackupVaultMpaApprovalTeamInput>,
  output: __S(8, __c1, 0) as any as S.Schema<AssociateBackupVaultMpaApprovalTeamResponse>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<CancelLegalHoldInput>,
  output: __S(8, __c1, 0) as any as S.Schema<CancelLegalHoldOutput>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<CreateBackupAccessPointRequest>,
  output: __S(185, __c23, 1) as any as S.Schema<CreateBackupAccessPointResponse>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<CreateBackupPlanInput>,
  output: __S(241, __c30, 1) as any as S.Schema<CreateBackupPlanOutput>,
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
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<CreateBackupSelectionInput>,
  output: __S(297, __c37, 1) as any as S.Schema<CreateBackupSelectionOutput>,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<CreateBackupVaultInput>,
  output: __S(313, __c39, 1) as any as S.Schema<CreateBackupVaultOutput>,
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
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<CreateFrameworkInput>,
  output: __S(321, __c40, 1) as any as S.Schema<CreateFrameworkOutput>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<CreateLegalHoldInput>,
  output: __S(337, __c42, 1) as any as S.Schema<CreateLegalHoldOutput>,
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLegalHold",
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<CreateLogicallyAirGappedBackupVaultInput>,
  output: __S(353, __c44, 1) as any as S.Schema<CreateLogicallyAirGappedBackupVaultOutput>,
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
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<CreateReportPlanInput>,
  output: __S(368, __c46, 0) as any as S.Schema<CreateReportPlanOutput>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<CreateRestoreAccessBackupVaultInput>,
  output: __S(385, __c48, 1) as any as S.Schema<CreateRestoreAccessBackupVaultOutput>,
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
}));

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
  input: __S(393, __c49, 1) as any as S.Schema<CreateRestoreTestingPlanInput>,
  output: __S(394, __c49, 2) as any as S.Schema<CreateRestoreTestingPlanOutput>,
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
}));

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
  input: __S(417, __c52, 1) as any as S.Schema<CreateRestoreTestingSelectionInput>,
  output: __S(418, __c52, 2) as any as S.Schema<CreateRestoreTestingSelectionOutput>,
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
}));

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
  input: __S(433, __c54, 1) as any as S.Schema<CreateTieringConfigurationInput>,
  output: __S(434, __c54, 2) as any as S.Schema<CreateTieringConfigurationOutput>,
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
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<DeleteBackupAccessPointInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteBackupAccessPointResponse>,
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
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<DeleteBackupPlanInput>,
  output: __S(457, __c57, 1) as any as S.Schema<DeleteBackupPlanOutput>,
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
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<DeleteBackupSelectionInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteBackupSelectionResponse>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupSelection",
}));

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
  input: __S(472, __c59, 0) as any as S.Schema<DeleteBackupVaultInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteBackupVaultResponse>,
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
}));

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
  input: __S(480, __c60, 0) as any as S.Schema<DeleteBackupVaultAccessPolicyInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteBackupVaultAccessPolicyResponse>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupVaultAccessPolicy",
}));

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
  input: __S(488, __c61, 0) as any as S.Schema<DeleteBackupVaultLockConfigurationInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteBackupVaultLockConfigurationResponse>,
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
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<DeleteBackupVaultNotificationsInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteBackupVaultNotificationsResponse>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackupVaultNotifications",
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<DeleteFrameworkInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteFrameworkResponse>,
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
}));

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
  input: __S(512, __c64, 0) as any as S.Schema<DeleteRecoveryPointInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteRecoveryPointResponse>,
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
}));

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
  input: __S(520, __c65, 0) as any as S.Schema<DeleteReportPlanInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteReportPlanResponse>,
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
}));

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
  input: __S(528, __c66, 0) as any as S.Schema<DeleteRestoreTestingPlanInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteRestoreTestingPlanResponse>,
  errors: [InvalidRequestException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRestoreTestingPlan",
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<DeleteRestoreTestingSelectionInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteRestoreTestingSelectionResponse>,
  errors: [ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRestoreTestingSelection",
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<DeleteTieringConfigurationInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteTieringConfigurationOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTieringConfiguration",
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<DescribeBackupAccessPointInput>,
  output: __S(553, __c69, 1) as any as S.Schema<DescribeBackupAccessPointResponse>,
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
}));

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
  input: __S(560, __c70, 0) as any as S.Schema<DescribeBackupJobInput>,
  output: __S(561, __c70, 1) as any as S.Schema<DescribeBackupJobOutput>,
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
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<DescribeBackupVaultInput>,
  output: __S(585, __c73, 1) as any as S.Schema<DescribeBackupVaultOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackupVault",
}));

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
  input: __S(600, __c75, 0) as any as S.Schema<DescribeCopyJobInput>,
  output: __S(601, __c75, 1) as any as S.Schema<DescribeCopyJobOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCopyJob",
}));

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
  input: __S(616, __c77, 0) as any as S.Schema<DescribeFrameworkInput>,
  output: __S(617, __c77, 1) as any as S.Schema<DescribeFrameworkOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFramework",
}));

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
  input: __S(624, __c78, 0) as any as S.Schema<DescribeGlobalSettingsInput>,
  output: __S(625, __c78, 1) as any as S.Schema<DescribeGlobalSettingsOutput>,
  errors: [InvalidRequestException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalSettings",
}));

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
  input: __S(632, __c79, 0) as any as S.Schema<DescribeProtectedResourceInput>,
  output: __S(633, __c79, 1) as any as S.Schema<DescribeProtectedResourceOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProtectedResource",
}));

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
  input: __S(640, __c80, 0) as any as S.Schema<DescribeRecoveryPointInput>,
  output: __S(643, __c80, 3) as any as S.Schema<DescribeRecoveryPointOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecoveryPoint",
}));

export type DescribeRegionSettingsError = ServiceUnavailableException | CommonErrors;
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
  input: __S(656, __c82, 0) as any as S.Schema<DescribeRegionSettingsInput>,
  output: __S(657, __c82, 1) as any as S.Schema<DescribeRegionSettingsOutput>,
  errors: [ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegionSettings",
}));

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
  input: __S(672, __c84, 0) as any as S.Schema<DescribeReportJobInput>,
  output: __S(673, __c84, 1) as any as S.Schema<DescribeReportJobOutput>,
  errors: [MissingParameterValueException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReportJob",
}));

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
  input: __S(688, __c86, 0) as any as S.Schema<DescribeReportPlanInput>,
  output: __S(689, __c86, 1) as any as S.Schema<DescribeReportPlanOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReportPlan",
}));

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
  input: __S(704, __c88, 0) as any as S.Schema<DescribeRestoreJobInput>,
  output: __S(705, __c88, 1) as any as S.Schema<DescribeRestoreJobOutput>,
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
}));

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
  input: __S(720, __c90, 0) as any as S.Schema<DescribeScanJobInput>,
  output: __S(721, __c90, 1) as any as S.Schema<DescribeScanJobOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScanJob",
}));

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
  input: __S(744, __c93, 0) as any as S.Schema<DisassociateBackupVaultMpaApprovalTeamInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateBackupVaultMpaApprovalTeamResponse>,
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
}));

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
  input: __S(752, __c94, 0) as any as S.Schema<DisassociateRecoveryPointInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateRecoveryPointResponse>,
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
}));

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
  input: __S(760, __c95, 0) as any as S.Schema<DisassociateRecoveryPointFromParentInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateRecoveryPointFromParentResponse>,
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
}));

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
  input: __S(768, __c96, 0) as any as S.Schema<ExportBackupPlanTemplateInput>,
  output: __S(769, __c96, 1) as any as S.Schema<ExportBackupPlanTemplateOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportBackupPlanTemplate",
}));

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
  input: __S(776, __c97, 0) as any as S.Schema<GetBackupPlanInput>,
  output: __S(779, __c97, 3) as any as S.Schema<GetBackupPlanOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupPlan",
}));

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
  input: __S(792, __c99, 0) as any as S.Schema<GetBackupPlanFromJSONInput>,
  output: __S(793, __c99, 1) as any as S.Schema<GetBackupPlanFromJSONOutput>,
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
}));

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
  input: __S(800, __c100, 0) as any as S.Schema<GetBackupPlanFromTemplateInput>,
  output: __S(801, __c100, 1) as any as S.Schema<GetBackupPlanFromTemplateOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupPlanFromTemplate",
}));

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
  input: __S(808, __c101, 0) as any as S.Schema<GetBackupSelectionInput>,
  output: __S(809, __c101, 1) as any as S.Schema<GetBackupSelectionOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupSelection",
}));

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
  input: __S(816, __c102, 0) as any as S.Schema<GetBackupVaultAccessPolicyInput>,
  output: __S(817, __c102, 1) as any as S.Schema<GetBackupVaultAccessPolicyOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupVaultAccessPolicy",
}));

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
  input: __S(824, __c103, 0) as any as S.Schema<GetBackupVaultNotificationsInput>,
  output: __S(825, __c103, 1) as any as S.Schema<GetBackupVaultNotificationsOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackupVaultNotifications",
}));

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
  input: __S(832, __c104, 0) as any as S.Schema<GetLegalHoldInput>,
  output: __S(833, __c104, 1) as any as S.Schema<GetLegalHoldOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLegalHold",
}));

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
  input: __S(840, __c105, 0) as any as S.Schema<GetPITRMalwareScanResultsInput>,
  output: __S(841, __c105, 1) as any as S.Schema<GetPITRMalwareScanResultsOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPITRMalwareScanResults",
}));

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
  input: __S(848, __c106, 0) as any as S.Schema<GetRecoveryPointIndexDetailsInput>,
  output: __S(849, __c106, 1) as any as S.Schema<GetRecoveryPointIndexDetailsOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPointIndexDetails",
}));

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
  input: __S(856, __c107, 0) as any as S.Schema<GetRecoveryPointRestoreMetadataInput>,
  output: __S(857, __c107, 1) as any as S.Schema<GetRecoveryPointRestoreMetadataOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPointRestoreMetadata",
}));

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
  input: __S(864, __c108, 0) as any as S.Schema<GetRestoreJobMetadataInput>,
  output: __S(865, __c108, 1) as any as S.Schema<GetRestoreJobMetadataOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestoreJobMetadata",
}));

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
  input: __S(872, __c109, 0) as any as S.Schema<GetRestoreTestingInferredMetadataInput>,
  output: __S(873, __c109, 1) as any as S.Schema<GetRestoreTestingInferredMetadataOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestoreTestingInferredMetadata",
}));

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
  input: __S(880, __c110, 0) as any as S.Schema<GetRestoreTestingPlanInput>,
  output: __S(882, __c110, 2) as any as S.Schema<GetRestoreTestingPlanOutput>,
  errors: [ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestoreTestingPlan",
}));

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
  input: __S(888, __c111, 0) as any as S.Schema<GetRestoreTestingSelectionInput>,
  output: __S(890, __c111, 2) as any as S.Schema<GetRestoreTestingSelectionOutput>,
  errors: [ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestoreTestingSelection",
}));

export type GetSupportedResourceTypesError = ServiceUnavailableException | CommonErrors;
/**
 * Returns the Amazon Web Services resource types supported by Backup.
 */
export const getSupportedResourceTypes: API.OperationMethod<
  GetSupportedResourceTypesRequest,
  GetSupportedResourceTypesOutput,
  GetSupportedResourceTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c112, 0) as any as S.Schema<GetSupportedResourceTypesRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<GetSupportedResourceTypesOutput>,
  errors: [ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSupportedResourceTypes",
}));

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
  input: __S(904, __c113, 0) as any as S.Schema<GetTieringConfigurationInput>,
  output: __S(906, __c113, 2) as any as S.Schema<GetTieringConfigurationOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTieringConfiguration",
}));

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
  input: __S(912, __c114, 0) as any as S.Schema<ListBackupAccessPointsRequest>,
  output: __S(922, __c115, 2) as any as S.Schema<ListBackupAccessPointsResponse>,
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
  input: __S(928, __c116, 0) as any as S.Schema<ListBackupAccessPointsByRecoveryPointRequest>,
  output: __S(922, __c115, 2) as any as S.Schema<ListBackupAccessPointsByRecoveryPointResponse>,
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
  input: __S(936, __c117, 0) as any as S.Schema<ListBackupAccessPointsByResourceRequest>,
  output: __S(922, __c115, 2) as any as S.Schema<ListBackupAccessPointsByResourceResponse>,
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
  input: __S(944, __c118, 0) as any as S.Schema<ListBackupJobsInput>,
  output: __S(947, __c118, 3) as any as S.Schema<ListBackupJobsOutput>,
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
  input: __S(952, __c119, 0) as any as S.Schema<ListBackupJobSummariesInput>,
  output: __S(953, __c119, 1) as any as S.Schema<ListBackupJobSummariesOutput>,
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
  input: __S(968, __c121, 0) as any as S.Schema<ListBackupPlansInput>,
  output: __S(969, __c121, 1) as any as S.Schema<ListBackupPlansOutput>,
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
  input: __S(984, __c123, 0) as any as S.Schema<ListBackupPlanTemplatesInput>,
  output: __S(987, __c123, 3) as any as S.Schema<ListBackupPlanTemplatesOutput>,
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
  input: __S(992, __c124, 0) as any as S.Schema<ListBackupPlanVersionsInput>,
  output: __S(993, __c124, 1) as any as S.Schema<ListBackupPlanVersionsOutput>,
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
  input: __S(1000, __c125, 0) as any as S.Schema<ListBackupSelectionsInput>,
  output: __S(1003, __c125, 3) as any as S.Schema<ListBackupSelectionsOutput>,
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
  input: __S(1008, __c126, 0) as any as S.Schema<ListBackupVaultsInput>,
  output: __S(1011, __c126, 3) as any as S.Schema<ListBackupVaultsOutput>,
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
  input: __S(1016, __c127, 0) as any as S.Schema<ListCopyJobsInput>,
  output: __S(1018, __c127, 2) as any as S.Schema<ListCopyJobsOutput>,
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
  input: __S(1024, __c128, 0) as any as S.Schema<ListCopyJobSummariesInput>,
  output: __S(1025, __c128, 1) as any as S.Schema<ListCopyJobSummariesOutput>,
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
  input: __S(1032, __c129, 0) as any as S.Schema<ListFrameworksInput>,
  output: __S(1035, __c129, 3) as any as S.Schema<ListFrameworksOutput>,
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
  input: __S(1040, __c130, 0) as any as S.Schema<ListIndexedRecoveryPointsInput>,
  output: __S(1043, __c130, 3) as any as S.Schema<ListIndexedRecoveryPointsOutput>,
  errors: [InvalidParameterValueException, ResourceNotFoundException, ServiceUnavailableException],
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
  input: __S(1048, __c131, 0) as any as S.Schema<ListLegalHoldsInput>,
  output: __S(1051, __c131, 3) as any as S.Schema<ListLegalHoldsOutput>,
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
  input: __S(1056, __c132, 0) as any as S.Schema<ListProtectedResourcesInput>,
  output: __S(1066, __c133, 2) as any as S.Schema<ListProtectedResourcesOutput>,
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
  input: __S(1072, __c134, 0) as any as S.Schema<ListProtectedResourcesByBackupVaultInput>,
  output: __S(1066, __c133, 2) as any as S.Schema<ListProtectedResourcesByBackupVaultOutput>,
  errors: [InvalidParameterValueException, ResourceNotFoundException, ServiceUnavailableException],
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
  input: __S(1080, __c135, 0) as any as S.Schema<ListRecoveryPointsByBackupVaultInput>,
  output: __S(1083, __c135, 3) as any as S.Schema<ListRecoveryPointsByBackupVaultOutput>,
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
  input: __S(1096, __c137, 0) as any as S.Schema<ListRecoveryPointsByLegalHoldInput>,
  output: __S(1099, __c137, 3) as any as S.Schema<ListRecoveryPointsByLegalHoldOutput>,
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
  input: __S(1104, __c138, 0) as any as S.Schema<ListRecoveryPointsByResourceInput>,
  output: __S(1107, __c138, 3) as any as S.Schema<ListRecoveryPointsByResourceOutput>,
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
  input: __S(1112, __c139, 0) as any as S.Schema<ListReportJobsInput>,
  output: __S(1114, __c139, 2) as any as S.Schema<ListReportJobsOutput>,
  errors: [InvalidParameterValueException, ResourceNotFoundException, ServiceUnavailableException],
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
  input: __S(1120, __c140, 0) as any as S.Schema<ListReportPlansInput>,
  output: __S(1122, __c140, 2) as any as S.Schema<ListReportPlansOutput>,
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
  input: __S(1128, __c141, 0) as any as S.Schema<ListRestoreAccessBackupVaultsInput>,
  output: __S(1131, __c141, 3) as any as S.Schema<ListRestoreAccessBackupVaultsOutput>,
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
  input: __S(1136, __c142, 0) as any as S.Schema<ListRestoreJobsInput>,
  output: __S(1146, __c143, 2) as any as S.Schema<ListRestoreJobsOutput>,
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
  input: __S(1152, __c144, 0) as any as S.Schema<ListRestoreJobsByProtectedResourceInput>,
  output: __S(1146, __c143, 2) as any as S.Schema<ListRestoreJobsByProtectedResourceOutput>,
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
  input: __S(1160, __c145, 0) as any as S.Schema<ListRestoreJobSummariesInput>,
  output: __S(1163, __c145, 3) as any as S.Schema<ListRestoreJobSummariesOutput>,
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
  input: __S(1168, __c146, 0) as any as S.Schema<ListRestoreTestingPlansInput>,
  output: __S(1171, __c146, 3) as any as S.Schema<ListRestoreTestingPlansOutput>,
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
  input: __S(1176, __c147, 0) as any as S.Schema<ListRestoreTestingSelectionsInput>,
  output: __S(1179, __c147, 3) as any as S.Schema<ListRestoreTestingSelectionsOutput>,
  errors: [InvalidParameterValueException, ResourceNotFoundException, ServiceUnavailableException],
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
  input: __S(1184, __c148, 0) as any as S.Schema<ListScanJobsInput>,
  output: __S(1187, __c148, 3) as any as S.Schema<ListScanJobsOutput>,
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
  input: __S(1192, __c149, 0) as any as S.Schema<ListScanJobSummariesInput>,
  output: __S(1195, __c149, 3) as any as S.Schema<ListScanJobSummariesOutput>,
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
  input: __S(16, __c2, 0) as any as S.Schema<ListTagsInput>,
  output: __S(17, __c2, 1) as any as S.Schema<ListTagsOutput>,
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
  input: __S(24, __c3, 0) as any as S.Schema<ListTieringConfigurationsInput>,
  output: __S(27, __c3, 3) as any as S.Schema<ListTieringConfigurationsOutput>,
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
  input: __S(32, __c4, 0) as any as S.Schema<PutBackupVaultAccessPolicyInput>,
  output: __S(8, __c1, 0) as any as S.Schema<PutBackupVaultAccessPolicyResponse>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBackupVaultAccessPolicy",
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<PutBackupVaultLockConfigurationInput>,
  output: __S(8, __c1, 0) as any as S.Schema<PutBackupVaultLockConfigurationResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<PutBackupVaultNotificationsInput>,
  output: __S(8, __c1, 0) as any as S.Schema<PutBackupVaultNotificationsResponse>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBackupVaultNotifications",
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<PutRestoreValidationResultInput>,
  output: __S(8, __c1, 0) as any as S.Schema<PutRestoreValidationResultResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<RevokeRestoreAccessBackupVaultInput>,
  output: __S(8, __c1, 0) as any as S.Schema<RevokeRestoreAccessBackupVaultResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<StartBackupJobInput>,
  output: __S(73, __c9, 1) as any as S.Schema<StartBackupJobOutput>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<StartCopyJobInput>,
  output: __S(81, __c10, 1) as any as S.Schema<StartCopyJobOutput>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<StartReportJobInput>,
  output: __S(89, __c11, 1) as any as S.Schema<StartReportJobOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReportJob",
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<StartRestoreJobInput>,
  output: __S(105, __c13, 1) as any as S.Schema<StartRestoreJobOutput>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<StartScanJobInput>,
  output: __S(113, __c14, 1) as any as S.Schema<StartScanJobOutput>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<StopBackupJobInput>,
  output: __S(8, __c1, 0) as any as S.Schema<StopBackupJobResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<TagResourceInput>,
  output: __S(8, __c1, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(8, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<UpdateBackupPlanInput>,
  output: __S(145, __c18, 1) as any as S.Schema<UpdateBackupPlanOutput>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackupPlan",
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<UpdateFrameworkInput>,
  output: __S(153, __c19, 1) as any as S.Schema<UpdateFrameworkOutput>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<UpdateGlobalSettingsInput>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateGlobalSettingsResponse>,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalSettings",
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<UpdateRecoveryPointIndexSettingsInput>,
  output: __S(169, __c21, 1) as any as S.Schema<UpdateRecoveryPointIndexSettingsOutput>,
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
}));

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
 * days. Therefore, the "retention" setting must be 90 days greater than the "transition to
 * cold after days" setting. The "transition to cold after days" setting cannot be changed
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
  input: __S(176, __c22, 0) as any as S.Schema<UpdateRecoveryPointLifecycleInput>,
  output: __S(177, __c22, 1) as any as S.Schema<UpdateRecoveryPointLifecycleOutput>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<UpdateRegionSettingsInput>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateRegionSettingsResponse>,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegionSettings",
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<UpdateReportPlanInput>,
  output: __S(368, __c46, 0) as any as S.Schema<UpdateReportPlanOutput>,
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
}));

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
  input: __S(217, __c27, 1) as any as S.Schema<UpdateRestoreTestingPlanInput>,
  output: __S(218, __c27, 2) as any as S.Schema<UpdateRestoreTestingPlanOutput>,
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
}));

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
  input: __S(225, __c28, 1) as any as S.Schema<UpdateRestoreTestingSelectionInput>,
  output: __S(226, __c28, 2) as any as S.Schema<UpdateRestoreTestingSelectionOutput>,
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
}));

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
  input: __S(233, __c29, 1) as any as S.Schema<UpdateTieringConfigurationInput>,
  output: __S(234, __c29, 2) as any as S.Schema<UpdateTieringConfigurationOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          MpaApprovalTeamArn: S.String,
          RequesterComment: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/backup-vaults/{BackupVaultName}/mpaApprovalTeam" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateBackupVaultMpaApprovalTeamInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateBackupVaultMpaApprovalTeamResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Tags: S.optional(__S(192, __c24, 0)) }),
      ).annotate({ identifier: "ListTagsOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tiering-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTieringConfigurationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurationArn: S.optional(S.String),
          TieringConfigurationName: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TieringConfigurationsListMember" });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurations: S.optional(__S(26, __c3, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTieringConfigurationsOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          Policy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/backup-vaults/{BackupVaultName}/access-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutBackupVaultAccessPolicyInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          MinRetentionDays: S.optional(S.Number),
          MaxRetentionDays: S.optional(S.Number),
          ChangeableForDays: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/backup-vaults/{BackupVaultName}/vault-lock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutBackupVaultLockConfigurationInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          SNSTopicArn: S.String,
          BackupVaultEvents: __S(400, __c50, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/backup-vaults/{BackupVaultName}/notification-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutBackupVaultNotificationsInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RestoreJobId: S.String.pipe(T.HttpLabel("RestoreJobId")),
          ValidationStatus: S.String,
          ValidationStatusMessage: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/restore-jobs/{RestoreJobId}/validations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRestoreValidationResultInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RestoreAccessBackupVaultArn: S.String.pipe(T.HttpLabel("RestoreAccessBackupVaultArn")),
          RequesterComment: S.optional(SensitiveString).pipe(T.HttpQuery("requesterComment")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/logically-air-gapped-backup-vaults/{BackupVaultName}/restore-access-backup-vaults/{RestoreAccessBackupVaultArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RevokeRestoreAccessBackupVaultInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String,
          LogicallyAirGappedBackupVaultArn: S.optional(S.String),
          ResourceArn: S.String,
          IamRoleArn: S.String,
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StartWindowMinutes: S.optional(S.Number),
          CompleteWindowMinutes: S.optional(S.Number),
          Lifecycle: S.optional(__S(264, __c33, 0)),
          RecoveryPointTags: S.optional(__S(192, __c24, 0)),
          BackupOptions: S.optional(__S(192, __c24, 0)),
          Index: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/backup-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartBackupJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupJobId: S.optional(S.String),
          RecoveryPointArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IsParent: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "StartBackupJobOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.String,
          SourceBackupVaultName: S.String,
          DestinationBackupVaultArn: S.String,
          IamRoleArn: S.String,
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Lifecycle: S.optional(__S(264, __c33, 0)),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/copy-jobs" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartCopyJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CopyJobId: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IsParent: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "StartCopyJobOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportPlanName: S.String.pipe(T.HttpLabel("ReportPlanName")),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audit/report-jobs/{ReportPlanName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartReportJobInput" });
    case 1:
      return S.suspend(() => S.Struct({ ReportJobId: S.optional(S.String) })).annotate({
        identifier: "StartReportJobOutput",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LegalHoldId: S.String.pipe(T.HttpLabel("LegalHoldId")),
          CancelDescription: S.String.pipe(T.HttpQuery("cancelDescription")),
          RetainRecordInDays: S.optional(S.Number).pipe(T.HttpQuery("retainRecordInDays")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/legal-holds/{LegalHoldId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelLegalHoldInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.String,
          Metadata: __S(192, __c24, 0),
          IamRoleArn: S.optional(S.String),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ResourceType: S.optional(S.String),
          CopySourceTagsToRestoredResource: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/restore-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartRestoreJobInput" });
    case 1:
      return S.suspend(() => S.Struct({ RestoreJobId: S.optional(S.String) })).annotate({
        identifier: "StartRestoreJobOutput",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String,
          ContinuousScanEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IamRoleArn: S.String,
          IdempotencyToken: S.optional(S.String),
          MalwareScanner: S.String,
          RecoveryPointArn: S.String,
          ScanBaseRecoveryPointArn: S.optional(S.String),
          ScanMode: S.String,
          ScannerRoleArn: S.String,
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/scan/job" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartScanJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ScanJobId: S.String,
        }),
      ).annotate({ identifier: "StartScanJobOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupJobId: S.String.pipe(T.HttpLabel("BackupJobId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backup-jobs/{BackupJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopBackupJobInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(192, __c24, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeyList: __S(256, __c32, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/untag/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
          BackupPlan: __S(250, __c31, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backup/plans/{BackupPlanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBackupPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.optional(S.String),
          BackupPlanArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VersionId: S.optional(S.String),
          AdvancedBackupSettings: S.optional(__S(289, __c36, 1)),
          ScanSettings: S.optional(__S(278, __c34, 6)),
        }),
      ).annotate({ identifier: "UpdateBackupPlanOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FrameworkName: S.String.pipe(T.HttpLabel("FrameworkName")),
          FrameworkDescription: S.optional(S.String),
          FrameworkControls: S.optional(__S(332, __c41, 4)),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/audit/frameworks/{FrameworkName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFrameworkInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FrameworkName: S.optional(S.String),
          FrameworkArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateFrameworkOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GlobalSettings: S.optional(__S(192, __c24, 0)) }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/global-settings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateGlobalSettingsInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
          IamRoleArn: S.optional(S.String),
          Index: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/index",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRecoveryPointIndexSettingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          RecoveryPointArn: S.optional(S.String),
          IndexStatus: S.optional(S.String),
          Index: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateRecoveryPointIndexSettingsOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
          Lifecycle: S.optional(__S(264, __c33, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRecoveryPointLifecycleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultArn: S.optional(S.String),
          RecoveryPointArn: S.optional(S.String),
          Lifecycle: S.optional(__S(264, __c33, 0)),
          CalculatedLifecycle: S.optional(__S(648, __c81, 0)),
        }),
      ).annotate({ identifier: "UpdateRecoveryPointLifecycleOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessPointMetadata: S.optional(__S(192, __c24, 0)),
          AccessPointPolicy: S.optional(S.String),
          Name: S.String,
          RecoveryPointArn: S.String,
          Tags: S.optional(__S(192, __c24, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/backup-access-point/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBackupAccessPointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AccessPointArn: S.String, Status: S.String })).annotate({
        identifier: "CreateBackupAccessPointResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceTypeOptInPreference: S.optional(__S(664, __c83, 0)),
          ResourceTypeManagementPreference: S.optional(__S(664, __c83, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/account-settings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRegionSettingsInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportPlanName: S.String.pipe(T.HttpLabel("ReportPlanName")),
          ReportPlanDescription: S.optional(S.String),
          ReportDeliveryChannel: S.optional(__S(376, __c47, 0)),
          ReportSetting: S.optional(__S(377, __c47, 1)),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/audit/report-plans/{ReportPlanName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateReportPlanInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointSelection: S.optional(__S(408, __c51, 0)),
          ScheduleExpression: S.optional(S.String),
          ScheduleExpressionTimezone: S.optional(S.String),
          StartWindowHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingPlanForUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RestoreTestingPlan: __S(216, __c27, 0),
          RestoreTestingPlanName: S.String.pipe(T.HttpLabel("RestoreTestingPlanName")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/restore-testing/plans/{RestoreTestingPlanName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRestoreTestingPlanInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RestoreTestingPlanArn: S.String,
          RestoreTestingPlanName: S.String,
          UpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateRestoreTestingPlanOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IamRoleArn: S.optional(S.String),
          ProtectedResourceArns: S.optional(__S(256, __c32, 0)),
          ProtectedResourceConditions: S.optional(__S(426, __c53, 2)),
          RestoreMetadataOverrides: S.optional(__S(192, __c24, 0)),
          ValidationWindowHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingSelectionForUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RestoreTestingPlanName: S.String.pipe(T.HttpLabel("RestoreTestingPlanName")),
          RestoreTestingSelection: __S(224, __c28, 0),
          RestoreTestingSelectionName: S.String.pipe(T.HttpLabel("RestoreTestingSelectionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/restore-testing/plans/{RestoreTestingPlanName}/selections/{RestoreTestingSelectionName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRestoreTestingSelectionInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RestoreTestingPlanArn: S.String,
          RestoreTestingPlanName: S.String,
          RestoreTestingSelectionName: S.String,
          UpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateRestoreTestingSelectionOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceSelection: __S(441, __c55, 1), BackupVaultName: S.String }),
      ).annotate({ identifier: "TieringConfigurationInputForUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurationName: S.String.pipe(T.HttpLabel("TieringConfigurationName")),
          TieringConfiguration: __S(232, __c29, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tiering-configurations/{TieringConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTieringConfigurationInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurationArn: S.optional(S.String),
          TieringConfigurationName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateTieringConfigurationOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlan: __S(250, __c31, 2),
          BackupPlanTags: S.optional(__S(192, __c24, 0)),
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/backup/plans" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateBackupPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.optional(S.String),
          BackupPlanArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VersionId: S.optional(S.String),
          AdvancedBackupSettings: S.optional(__S(289, __c36, 1)),
        }),
      ).annotate({ identifier: "CreateBackupPlanOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          TargetBackupVaultName: S.String,
          TargetLogicallyAirGappedBackupVaultArn: S.optional(S.String),
          ScheduleExpression: S.optional(S.String),
          StartWindowMinutes: S.optional(S.Number),
          CompletionWindowMinutes: S.optional(S.Number),
          Lifecycle: S.optional(__S(264, __c33, 0)),
          RecoveryPointTags: S.optional(__S(192, __c24, 0)),
          CopyActions: S.optional(__S(273, __c34, 1)),
          EnableContinuousBackup: S.optional(S.Boolean),
          ScheduleExpressionTimezone: S.optional(S.String),
          IndexActions: S.optional(__S(274, __c34, 2)),
          ScanActions: S.optional(__S(276, __c34, 4)),
        }),
      ).annotate({ identifier: "BackupRuleInput" });
    case 1:
      return S.Array(__S(248, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BackupPlanName: S.String,
          Rules: __S(249, __c31, 1),
          AdvancedBackupSettings: S.optional(__S(289, __c36, 1)),
          ScanSettings: S.optional(__S(278, __c34, 6)),
        }),
      ).annotate({ identifier: "BackupPlanInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MoveToColdStorageAfterDays: S.optional(S.Number),
          DeleteAfterDays: S.optional(S.Number),
          OptInToArchiveForSupportedResources: S.optional(S.Boolean),
          DeleteAfterEvent: S.optional(S.String),
        }),
      ).annotate({ identifier: "Lifecycle" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Lifecycle: S.optional(__S(264, __c33, 0)),
          DestinationBackupVaultArn: S.String,
        }),
      ).annotate({ identifier: "CopyAction" });
    case 1:
      return S.Array(__S(272, __c34, 0));
    case 2:
      return S.Array(__S(280, __c35, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ MalwareScanner: S.optional(S.String), ScanMode: S.optional(S.String) }),
      ).annotate({ identifier: "ScanAction" });
    case 4:
      return S.Array(__S(275, __c34, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          MalwareScanner: S.optional(S.String),
          ResourceTypes: S.optional(__S(256, __c32, 0)),
          ScannerRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScanSetting" });
    case 6:
      return S.Array(__S(277, __c34, 5));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceTypes: S.optional(__S(256, __c32, 0)) })).annotate({
        identifier: "IndexAction",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          BackupOptions: S.optional(__S(192, __c24, 0)),
        }),
      ).annotate({ identifier: "AdvancedBackupSetting" });
    case 1:
      return S.Array(__S(288, __c36, 0));
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
          BackupSelection: __S(309, __c38, 5),
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/backup/plans/{BackupPlanId}/selections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBackupSelectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SelectionId: S.optional(S.String),
          BackupPlanId: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateBackupSelectionOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConditionType: S.String, ConditionKey: S.String, ConditionValue: S.String }),
      ).annotate({ identifier: "Condition" });
    case 1:
      return S.Array(__S(304, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ConditionKey: S.optional(S.String), ConditionValue: S.optional(S.String) }),
      ).annotate({ identifier: "ConditionParameter" });
    case 3:
      return S.Array(__S(306, __c38, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          StringEquals: S.optional(__S(307, __c38, 3)),
          StringNotEquals: S.optional(__S(307, __c38, 3)),
          StringLike: S.optional(__S(307, __c38, 3)),
          StringNotLike: S.optional(__S(307, __c38, 3)),
        }),
      ).annotate({ identifier: "Conditions" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          SelectionName: S.String,
          IamRoleArn: S.String,
          Resources: S.optional(__S(256, __c32, 0)),
          ListOfTags: S.optional(__S(305, __c38, 1)),
          NotResources: S.optional(__S(256, __c32, 0)),
          Conditions: S.optional(__S(308, __c38, 4)),
        }),
      ).annotate({ identifier: "BackupSelection" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          BackupVaultTags: S.optional(__S(192, __c24, 0)),
          EncryptionKeyArn: S.optional(S.String),
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/backup-vaults/{BackupVaultName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBackupVaultInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateBackupVaultOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FrameworkName: S.String,
          FrameworkDescription: S.optional(S.String),
          FrameworkControls: __S(332, __c41, 4),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FrameworkTags: S.optional(__S(192, __c24, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/audit/frameworks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFrameworkInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FrameworkName: S.optional(S.String), FrameworkArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateFrameworkOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterName: S.optional(S.String), ParameterValue: S.optional(S.String) }),
      ).annotate({ identifier: "ControlInputParameter" });
    case 1:
      return S.Array(__S(328, __c41, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ComplianceResourceIds: S.optional(__S(256, __c32, 0)),
          ComplianceResourceTypes: S.optional(__S(256, __c32, 0)),
          Tags: S.optional(__S(192, __c24, 0)),
        }),
      ).annotate({ identifier: "ControlScope" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ControlName: S.String,
          ControlInputParameters: S.optional(__S(329, __c41, 1)),
          ControlScope: S.optional(__S(330, __c41, 2)),
        }),
      ).annotate({ identifier: "FrameworkControl" });
    case 4:
      return S.Array(__S(331, __c41, 3));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Title: S.String,
          Description: S.String,
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          RecoveryPointSelection: S.optional(__S(345, __c43, 1)),
          Tags: S.optional(__S(192, __c24, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/legal-holds" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateLegalHoldInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(S.String),
          Status: S.optional(S.String),
          Description: S.optional(S.String),
          LegalHoldId: S.optional(S.String),
          LegalHoldArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RecoveryPointSelection: S.optional(__S(345, __c43, 1)),
        }),
      ).annotate({ identifier: "CreateLegalHoldOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FromDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ToDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DateRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VaultNames: S.optional(__S(256, __c32, 0)),
          ResourceIdentifiers: S.optional(__S(256, __c32, 0)),
          DateRange: S.optional(__S(344, __c43, 0)),
        }),
      ).annotate({ identifier: "RecoveryPointSelection" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          BackupVaultTags: S.optional(__S(192, __c24, 0)),
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          MinRetentionDays: S.Number,
          MaxRetentionDays: S.Number,
          EncryptionKeyArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/logically-air-gapped-backup-vaults/{BackupVaultName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLogicallyAirGappedBackupVaultInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VaultState: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateLogicallyAirGappedBackupVaultOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportPlanName: S.String,
          ReportPlanDescription: S.optional(S.String),
          ReportDeliveryChannel: __S(376, __c47, 0),
          ReportSetting: __S(377, __c47, 1),
          ReportPlanTags: S.optional(__S(192, __c24, 0)),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audit/report-plans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateReportPlanInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportPlanName: S.optional(S.String),
          ReportPlanArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateReportPlanOutput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3BucketName: S.String,
          S3KeyPrefix: S.optional(S.String),
          Formats: S.optional(__S(256, __c32, 0)),
        }),
      ).annotate({ identifier: "ReportDeliveryChannel" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReportTemplate: S.String,
          FrameworkArns: S.optional(__S(256, __c32, 0)),
          NumberOfFrameworks: S.optional(S.Number),
          Accounts: S.optional(__S(256, __c32, 0)),
          OrganizationUnits: S.optional(__S(256, __c32, 0)),
          Regions: S.optional(__S(256, __c32, 0)),
        }),
      ).annotate({ identifier: "ReportSetting" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceBackupVaultArn: S.String,
          BackupVaultName: S.optional(S.String),
          BackupVaultTags: S.optional(__S(192, __c24, 0)),
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          RequesterComment: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/restore-access-backup-vaults" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRestoreAccessBackupVaultInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RestoreAccessBackupVaultArn: S.optional(S.String),
          VaultState: S.optional(S.String),
          RestoreAccessBackupVaultName: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateRestoreAccessBackupVaultOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointSelection: __S(408, __c51, 0),
          RestoreTestingPlanName: S.String,
          ScheduleExpression: S.String,
          ScheduleExpressionTimezone: S.optional(S.String),
          StartWindowHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingPlanForCreate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.optional(S.String),
          RestoreTestingPlan: __S(392, __c49, 0),
          Tags: S.optional(__S(192, __c24, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/restore-testing/plans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRestoreTestingPlanInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RestoreTestingPlanArn: S.String,
          RestoreTestingPlanName: S.String,
        }),
      ).annotate({ identifier: "CreateRestoreTestingPlanOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.optional(S.String),
          ExcludeVaults: S.optional(__S(256, __c32, 0)),
          IncludeVaults: S.optional(__S(256, __c32, 0)),
          RecoveryPointTypes: S.optional(__S(400, __c50, 0)),
          SelectionWindowDays: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingRecoveryPointSelection" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IamRoleArn: S.String,
          ProtectedResourceArns: S.optional(__S(256, __c32, 0)),
          ProtectedResourceConditions: S.optional(__S(426, __c53, 2)),
          ProtectedResourceType: S.String,
          RestoreMetadataOverrides: S.optional(__S(192, __c24, 0)),
          RestoreTestingSelectionName: S.String,
          ValidationWindowHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingSelectionForCreate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.optional(S.String),
          RestoreTestingPlanName: S.String.pipe(T.HttpLabel("RestoreTestingPlanName")),
          RestoreTestingSelection: __S(416, __c52, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/restore-testing/plans/{RestoreTestingPlanName}/selections",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRestoreTestingSelectionInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RestoreTestingPlanArn: S.String,
          RestoreTestingPlanName: S.String,
          RestoreTestingSelectionName: S.String,
        }),
      ).annotate({ identifier: "CreateRestoreTestingSelectionOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "KeyValue",
      });
    case 1:
      return S.Array(__S(424, __c53, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StringEquals: S.optional(__S(425, __c53, 1)),
          StringNotEquals: S.optional(__S(425, __c53, 1)),
        }),
      ).annotate({ identifier: "ProtectedResourceConditions" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurationName: S.String,
          BackupVaultName: S.String,
          ResourceSelection: __S(441, __c55, 1),
        }),
      ).annotate({ identifier: "TieringConfigurationInputForCreate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TieringConfiguration: __S(432, __c54, 0),
          TieringConfigurationTags: S.optional(__S(192, __c24, 0)),
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tiering-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTieringConfigurationInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurationArn: S.optional(S.String),
          TieringConfigurationName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateTieringConfigurationOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Resources: __S(256, __c32, 0),
          TieringDownSettingsInDays: S.Number,
          ResourceType: S.String,
        }),
      ).annotate({ identifier: "ResourceSelection" });
    case 1:
      return S.Array(__S(440, __c55, 0));
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessPointArn: S.String.pipe(T.HttpLabel("AccessPointArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/backup-access-point/delete/{AccessPointArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackupAccessPointInput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/backup/plans/{BackupPlanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackupPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.optional(S.String),
          BackupPlanArn: S.optional(S.String),
          DeletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VersionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteBackupPlanOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
          SelectionId: S.String.pipe(T.HttpLabel("SelectionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/backup/plans/{BackupPlanId}/selections/{SelectionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackupSelectionInput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/backup-vaults/{BackupVaultName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackupVaultInput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/backup-vaults/{BackupVaultName}/access-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackupVaultAccessPolicyInput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/backup-vaults/{BackupVaultName}/vault-lock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackupVaultLockConfigurationInput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/backup-vaults/{BackupVaultName}/notification-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackupVaultNotificationsInput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FrameworkName: S.String.pipe(T.HttpLabel("FrameworkName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/audit/frameworks/{FrameworkName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFrameworkInput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRecoveryPointInput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportPlanName: S.String.pipe(T.HttpLabel("ReportPlanName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/audit/report-plans/{ReportPlanName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteReportPlanInput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RestoreTestingPlanName: S.String.pipe(T.HttpLabel("RestoreTestingPlanName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/restore-testing/plans/{RestoreTestingPlanName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRestoreTestingPlanInput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RestoreTestingPlanName: S.String.pipe(T.HttpLabel("RestoreTestingPlanName")),
          RestoreTestingSelectionName: S.String.pipe(T.HttpLabel("RestoreTestingSelectionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restore-testing/plans/{RestoreTestingPlanName}/selections/{RestoreTestingSelectionName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRestoreTestingSelectionInput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurationName: S.String.pipe(T.HttpLabel("TieringConfigurationName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tiering-configurations/{TieringConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTieringConfigurationInput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessPointArn: S.String.pipe(T.HttpLabel("AccessPointArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup-access-point/{AccessPointArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeBackupAccessPointInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessPointArn: S.String,
          AccessPointMetadata: S.optional(__S(192, __c24, 0)),
          BackupVaultArn: S.optional(S.String),
          BackupVaultName: S.String,
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Name: S.String,
          RecoveryPointArn: S.String,
          ResourceArn: S.String,
          ResourceType: S.String,
          Status: S.String,
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeBackupAccessPointResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupJobId: S.String.pipe(T.HttpLabel("BackupJobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup-jobs/{BackupJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeBackupJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          BackupJobId: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          RecoveryPointLifecycle: S.optional(__S(264, __c33, 0)),
          BackupVaultArn: S.optional(S.String),
          VaultType: S.optional(S.String),
          VaultLockState: S.optional(S.String),
          RecoveryPointArn: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          IsEncrypted: S.optional(S.Boolean),
          ResourceArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          PercentDone: S.optional(S.String),
          BackupSizeInBytes: S.optional(S.Number),
          IamRoleArn: S.optional(S.String),
          CreatedBy: S.optional(__S(568, __c71, 0)),
          ResourceType: S.optional(S.String),
          BytesTransferred: S.optional(S.Number),
          ExpectedCompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartBy: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BackupOptions: S.optional(__S(192, __c24, 0)),
          BackupType: S.optional(S.String),
          ParentJobId: S.optional(S.String),
          IsParent: S.optional(S.Boolean),
          NumberOfChildJobs: S.optional(S.Number),
          ChildJobsInState: S.optional(__S(576, __c72, 0)),
          ResourceName: S.optional(S.String),
          InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MessageCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeBackupJobOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.optional(S.String),
          BackupPlanArn: S.optional(S.String),
          BackupPlanName: S.optional(S.String),
          BackupPlanVersion: S.optional(S.String),
          BackupRuleId: S.optional(S.String),
          BackupRuleName: S.optional(S.String),
          BackupRuleCron: S.optional(S.String),
          BackupRuleTimezone: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecoveryPointCreator" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          BackupVaultAccountId: S.optional(S.String).pipe(T.HttpQuery("backupVaultAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup-vaults/{BackupVaultName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeBackupVaultInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          VaultType: S.optional(S.String),
          VaultState: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatorRequestId: S.optional(S.String),
          NumberOfRecoveryPoints: S.optional(S.Number),
          Locked: S.optional(S.Boolean),
          MinRetentionDays: S.optional(S.Number),
          MaxRetentionDays: S.optional(S.Number),
          LockDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceBackupVaultArn: S.optional(S.String),
          MpaApprovalTeamArn: S.optional(S.String),
          MpaSessionArn: S.optional(S.String),
          LatestMpaApprovalTeamUpdate: S.optional(__S(592, __c74, 0)),
          EncryptionKeyType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeBackupVaultOutput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MpaSessionArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpiryDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LatestMpaApprovalTeamUpdate" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CopyJobId: S.String.pipe(T.HttpLabel("CopyJobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/copy-jobs/{CopyJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCopyJobInput" });
    case 1:
      return S.suspend(() => S.Struct({ CopyJob: S.optional(__S(608, __c76, 0)) })).annotate({
        identifier: "DescribeCopyJobOutput",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          CopyJobId: S.optional(S.String),
          SourceBackupVaultArn: S.optional(S.String),
          SourceRecoveryPointArn: S.optional(S.String),
          DestinationBackupVaultArn: S.optional(S.String),
          DestinationVaultType: S.optional(S.String),
          DestinationVaultLockState: S.optional(S.String),
          DestinationRecoveryPointArn: S.optional(S.String),
          DestinationEncryptionKeyArn: S.optional(S.String),
          DestinationRecoveryPointLifecycle: S.optional(__S(264, __c33, 0)),
          ResourceArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          BackupSizeInBytes: S.optional(S.Number),
          IamRoleArn: S.optional(S.String),
          CreatedBy: S.optional(__S(568, __c71, 0)),
          CreatedByBackupJobId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ParentJobId: S.optional(S.String),
          IsParent: S.optional(S.Boolean),
          CompositeMemberIdentifier: S.optional(S.String),
          NumberOfChildJobs: S.optional(S.Number),
          ChildJobsInState: S.optional(__S(576, __c72, 0)),
          ResourceName: S.optional(S.String),
          MessageCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "CopyJob" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FrameworkName: S.String.pipe(T.HttpLabel("FrameworkName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/frameworks/{FrameworkName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeFrameworkInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FrameworkName: S.optional(S.String),
          FrameworkArn: S.optional(S.String),
          FrameworkDescription: S.optional(S.String),
          FrameworkControls: S.optional(__S(332, __c41, 4)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeploymentStatus: S.optional(S.String),
          FrameworkStatus: S.optional(S.String),
          IdempotencyToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeFrameworkOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/global-settings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGlobalSettingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GlobalSettings: S.optional(__S(192, __c24, 0)),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeGlobalSettingsOutput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resources/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeProtectedResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          LastBackupTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceName: S.optional(S.String),
          LastBackupVaultArn: S.optional(S.String),
          LastRecoveryPointArn: S.optional(S.String),
          LatestRestoreExecutionTimeMinutes: S.optional(S.Number),
          LatestRestoreJobCreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestRestoreRecoveryPointCreationDate: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
        }),
      ).annotate({ identifier: "DescribeProtectedResourceOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
          BackupVaultAccountId: S.optional(S.String).pipe(T.HttpQuery("backupVaultAccountId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRecoveryPointInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MalwareScanner: S.optional(S.String),
          ScanJobState: S.optional(S.String),
          LastScanTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Findings: S.optional(__S(400, __c50, 0)),
        }),
      ).annotate({ identifier: "ScanResult" });
    case 2:
      return S.Array(__S(641, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          SourceBackupVaultArn: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          CreatedBy: S.optional(__S(568, __c71, 0)),
          IamRoleArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BackupSizeInBytes: S.optional(S.Number),
          CalculatedLifecycle: S.optional(__S(648, __c81, 0)),
          Lifecycle: S.optional(__S(264, __c33, 0)),
          EncryptionKeyArn: S.optional(S.String),
          IsEncrypted: S.optional(S.Boolean),
          StorageClass: S.optional(S.String),
          LastRestoreTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ParentRecoveryPointArn: S.optional(S.String),
          CompositeMemberIdentifier: S.optional(S.String),
          IsParent: S.optional(S.Boolean),
          ResourceName: S.optional(S.String),
          VaultType: S.optional(S.String),
          IndexStatus: S.optional(S.String),
          IndexStatusMessage: S.optional(S.String),
          EncryptionKeyType: S.optional(S.String),
          ScanResults: S.optional(__S(642, __c80, 2)),
        }),
      ).annotate({ identifier: "DescribeRecoveryPointOutput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MoveToColdStorageAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeleteAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CalculatedLifecycle" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/account-settings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRegionSettingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceTypeOptInPreference: S.optional(__S(664, __c83, 0)),
          ResourceTypeManagementPreference: S.optional(__S(664, __c83, 0)),
        }),
      ).annotate({ identifier: "DescribeRegionSettingsOutput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Boolean.pipe(S.optional));
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportJobId: S.String.pipe(T.HttpLabel("ReportJobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/report-jobs/{ReportJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReportJobInput" });
    case 1:
      return S.suspend(() => S.Struct({ ReportJob: S.optional(__S(681, __c85, 1)) })).annotate({
        identifier: "DescribeReportJobOutput",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3BucketName: S.optional(S.String), S3Keys: S.optional(__S(256, __c32, 0)) }),
      ).annotate({ identifier: "ReportDestination" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReportJobId: S.optional(S.String),
          ReportPlanArn: S.optional(S.String),
          ReportTemplate: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          ReportDestination: S.optional(__S(680, __c85, 0)),
        }),
      ).annotate({ identifier: "ReportJob" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReportPlanName: S.String.pipe(T.HttpLabel("ReportPlanName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/report-plans/{ReportPlanName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReportPlanInput" });
    case 1:
      return S.suspend(() => S.Struct({ ReportPlan: S.optional(__S(696, __c87, 0)) })).annotate({
        identifier: "DescribeReportPlanOutput",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportPlanArn: S.optional(S.String),
          ReportPlanName: S.optional(S.String),
          ReportPlanDescription: S.optional(S.String),
          ReportSetting: S.optional(__S(377, __c47, 1)),
          ReportDeliveryChannel: S.optional(__S(376, __c47, 0)),
          DeploymentStatus: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAttemptedExecutionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSuccessfulExecutionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ReportPlan" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RestoreJobId: S.String.pipe(T.HttpLabel("RestoreJobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restore-jobs/{RestoreJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRestoreJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          RestoreJobId: S.optional(S.String),
          RecoveryPointArn: S.optional(S.String),
          SourceResourceArn: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          PercentDone: S.optional(S.String),
          BackupSizeInBytes: S.optional(S.Number),
          IamRoleArn: S.optional(S.String),
          ExpectedCompletionTimeMinutes: S.optional(S.Number),
          CreatedResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          RecoveryPointCreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(__S(712, __c89, 0)),
          ValidationStatus: S.optional(S.String),
          ValidationStatusMessage: S.optional(S.String),
          DeletionStatus: S.optional(S.String),
          DeletionStatusMessage: S.optional(S.String),
          IsParent: S.optional(S.Boolean),
          ParentJobId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRestoreJobOutput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RestoreTestingPlanArn: S.optional(S.String) })).annotate({
        identifier: "RestoreJobCreator",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScanJobId: S.String.pipe(T.HttpLabel("ScanJobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/scan/jobs/{ScanJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeScanJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BackupVaultArn: S.String,
          BackupVaultName: S.String,
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ContinuousScanEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ContinuousScanStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: __S(736, __c92, 0),
          CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          IamRoleArn: S.String,
          MalwareScanner: S.String,
          RecoveryPointArn: S.String,
          ResourceArn: S.String,
          ResourceName: S.String,
          ResourceType: S.String,
          ScanBaseRecoveryPointArn: S.optional(S.String),
          ScanId: S.optional(S.String),
          ScanJobId: S.String,
          ScanMode: S.String,
          ScanResult: S.optional(__S(728, __c91, 0)),
          ScannerRoleArn: S.String,
          State: S.String,
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeScanJobOutput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ScanResultStatus: S.String })).annotate({
        identifier: "ScanResultInfo",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanArn: S.String,
          BackupPlanId: S.String,
          BackupPlanVersion: S.String,
          BackupRuleId: S.String,
        }),
      ).annotate({ identifier: "ScanJobCreator" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RequesterComment: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/backup-vaults/{BackupVaultName}/mpaApprovalTeam?delete",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateBackupVaultMpaApprovalTeamInput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/disassociate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateRecoveryPointInput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/parentAssociation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateRecoveryPointFromParentInput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup/plans/{BackupPlanId}/toTemplate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExportBackupPlanTemplateInput" });
    case 1:
      return S.suspend(() => S.Struct({ BackupPlanTemplateJson: S.optional(S.String) })).annotate({
        identifier: "ExportBackupPlanTemplateOutput",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          MaxScheduledRunsPreview: S.optional(S.Number).pipe(
            T.HttpQuery("MaxScheduledRunsPreview"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup/plans/{BackupPlanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBackupPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExecutionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RuleId: S.optional(S.String),
          RuleExecutionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledPlanExecutionMember" });
    case 2:
      return S.Array(__S(777, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BackupPlan: S.optional(__S(786, __c98, 2)),
          BackupPlanId: S.optional(S.String),
          BackupPlanArn: S.optional(S.String),
          VersionId: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AdvancedBackupSettings: S.optional(__S(289, __c36, 1)),
          ScheduledRunsPreview: S.optional(__S(778, __c97, 2)),
        }),
      ).annotate({ identifier: "GetBackupPlanOutput" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          TargetBackupVaultName: S.String,
          TargetLogicallyAirGappedBackupVaultArn: S.optional(S.String),
          ScheduleExpression: S.optional(S.String),
          StartWindowMinutes: S.optional(S.Number),
          CompletionWindowMinutes: S.optional(S.Number),
          Lifecycle: S.optional(__S(264, __c33, 0)),
          RecoveryPointTags: S.optional(__S(192, __c24, 0)),
          RuleId: S.optional(S.String),
          CopyActions: S.optional(__S(273, __c34, 1)),
          EnableContinuousBackup: S.optional(S.Boolean),
          ScheduleExpressionTimezone: S.optional(S.String),
          IndexActions: S.optional(__S(274, __c34, 2)),
          ScanActions: S.optional(__S(276, __c34, 4)),
        }),
      ).annotate({ identifier: "BackupRule" });
    case 1:
      return S.Array(__S(784, __c98, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BackupPlanName: S.String,
          Rules: __S(785, __c98, 1),
          AdvancedBackupSettings: S.optional(__S(289, __c36, 1)),
          ScanSettings: S.optional(__S(278, __c34, 6)),
        }),
      ).annotate({ identifier: "BackupPlan" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupPlanTemplateJson: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backup/template/json/toPlan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBackupPlanFromJSONInput" });
    case 1:
      return S.suspend(() => S.Struct({ BackupPlan: S.optional(__S(786, __c98, 2)) })).annotate({
        identifier: "GetBackupPlanFromJSONOutput",
      });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupPlanTemplateId: S.String.pipe(T.HttpLabel("BackupPlanTemplateId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup/template/plans/{BackupPlanTemplateId}/toPlan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBackupPlanFromTemplateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BackupPlanDocument: S.optional(__S(786, __c98, 2)) }),
      ).annotate({ identifier: "GetBackupPlanFromTemplateOutput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
          SelectionId: S.String.pipe(T.HttpLabel("SelectionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup/plans/{BackupPlanId}/selections/{SelectionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBackupSelectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupSelection: S.optional(__S(309, __c38, 5)),
          SelectionId: S.optional(S.String),
          BackupPlanId: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatorRequestId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBackupSelectionOutput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup-vaults/{BackupVaultName}/access-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBackupVaultAccessPolicyInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          Policy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBackupVaultAccessPolicyOutput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/backup-vaults/{BackupVaultName}/notification-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBackupVaultNotificationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          SNSTopicArn: S.optional(S.String),
          BackupVaultEvents: S.optional(__S(400, __c50, 0)),
        }),
      ).annotate({ identifier: "GetBackupVaultNotificationsOutput" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LegalHoldId: S.String.pipe(T.HttpLabel("LegalHoldId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/legal-holds/{LegalHoldId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLegalHoldInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(S.String),
          Status: S.optional(S.String),
          Description: S.optional(S.String),
          CancelDescription: S.optional(S.String),
          LegalHoldId: S.optional(S.String),
          LegalHoldArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CancellationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RetainRecordUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RecoveryPointSelection: S.optional(__S(345, __c43, 1)),
        }),
      ).annotate({ identifier: "GetLegalHoldOutput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.String.pipe(T.HttpQuery("RecoveryPointArn")),
          BackupVaultName: S.String.pipe(T.HttpQuery("BackupVaultName")),
          ScanEndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
            T.HttpQuery("ScanEndTime"),
          ),
          MalwareScanner: S.String.pipe(T.HttpQuery("MalwareScanner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/scan/pitr-malware-scan-results" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPITRMalwareScanResultsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ScanEndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ScanResult: __S(728, __c91, 0),
          LastScanJobTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanId: S.optional(S.String),
          ScanMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPITRMalwareScanResultsOutput" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/index",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecoveryPointIndexDetailsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          SourceResourceArn: S.optional(S.String),
          IndexCreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IndexDeletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IndexCompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IndexStatus: S.optional(S.String),
          IndexStatusMessage: S.optional(S.String),
          TotalItemsIndexed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetRecoveryPointIndexDetailsOutput" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
          BackupVaultAccountId: S.optional(S.String).pipe(T.HttpQuery("backupVaultAccountId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/backup-vaults/{BackupVaultName}/recovery-points/{RecoveryPointArn}/restore-metadata",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecoveryPointRestoreMetadataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultArn: S.optional(S.String),
          RecoveryPointArn: S.optional(S.String),
          RestoreMetadata: S.optional(__S(192, __c24, 0)),
          ResourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRecoveryPointRestoreMetadataOutput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RestoreJobId: S.String.pipe(T.HttpLabel("RestoreJobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restore-jobs/{RestoreJobId}/metadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRestoreJobMetadataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RestoreJobId: S.optional(S.String), Metadata: S.optional(__S(192, __c24, 0)) }),
      ).annotate({ identifier: "GetRestoreJobMetadataOutput" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultAccountId: S.optional(S.String).pipe(T.HttpQuery("BackupVaultAccountId")),
          BackupVaultName: S.String.pipe(T.HttpQuery("BackupVaultName")),
          RecoveryPointArn: S.String.pipe(T.HttpQuery("RecoveryPointArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restore-testing/inferred-metadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRestoreTestingInferredMetadataInput" });
    case 1:
      return S.suspend(() => S.Struct({ InferredMetadata: __S(192, __c24, 0) })).annotate({
        identifier: "GetRestoreTestingInferredMetadataOutput",
      });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RestoreTestingPlanName: S.String.pipe(T.HttpLabel("RestoreTestingPlanName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restore-testing/plans/{RestoreTestingPlanName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRestoreTestingPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          CreatorRequestId: S.optional(S.String),
          LastExecutionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RecoveryPointSelection: __S(408, __c51, 0),
          RestoreTestingPlanArn: S.String,
          RestoreTestingPlanName: S.String,
          ScheduleExpression: S.String,
          ScheduleExpressionTimezone: S.optional(S.String),
          StartWindowHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingPlanForGet" });
    case 2:
      return S.suspend(() => S.Struct({ RestoreTestingPlan: __S(881, __c110, 1) })).annotate({
        identifier: "GetRestoreTestingPlanOutput",
      });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RestoreTestingPlanName: S.String.pipe(T.HttpLabel("RestoreTestingPlanName")),
          RestoreTestingSelectionName: S.String.pipe(T.HttpLabel("RestoreTestingSelectionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restore-testing/plans/{RestoreTestingPlanName}/selections/{RestoreTestingSelectionName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRestoreTestingSelectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          CreatorRequestId: S.optional(S.String),
          IamRoleArn: S.String,
          ProtectedResourceArns: S.optional(__S(256, __c32, 0)),
          ProtectedResourceConditions: S.optional(__S(426, __c53, 2)),
          ProtectedResourceType: S.String,
          RestoreMetadataOverrides: S.optional(__S(192, __c24, 0)),
          RestoreTestingPlanName: S.String,
          RestoreTestingSelectionName: S.String,
          ValidationWindowHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingSelectionForGet" });
    case 2:
      return S.suspend(() => S.Struct({ RestoreTestingSelection: __S(889, __c111, 1) })).annotate({
        identifier: "GetRestoreTestingSelectionOutput",
      });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/supported-resource-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSupportedResourceTypesRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurationName: S.String.pipe(T.HttpLabel("TieringConfigurationName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tiering-configurations/{TieringConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTieringConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TieringConfigurationName: S.String,
          TieringConfigurationArn: S.optional(S.String),
          BackupVaultName: S.String,
          ResourceSelection: __S(441, __c55, 1),
          CreatorRequestId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TieringConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ TieringConfiguration: S.optional(__S(905, __c113, 1)) }),
      ).annotate({ identifier: "GetTieringConfigurationOutput" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup-access-point" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBackupAccessPointsRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessPointArn: S.String,
          AccessPointMetadata: __S(192, __c24, 0),
          BackupVaultArn: S.optional(S.String),
          BackupVaultName: S.String,
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Name: S.String,
          RecoveryPointArn: S.String,
          ResourceArn: S.String,
          ResourceType: S.String,
          Status: S.String,
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccessPointsMember" });
    case 1:
      return S.Array(__S(920, __c115, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ BackupAccessPoints: __S(921, __c115, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBackupAccessPointsResponse" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/backup-access-point/recovery-point/{RecoveryPointArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBackupAccessPointsByRecoveryPointRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backup-access-point/resource/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBackupAccessPointsByResourceRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          ByResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
          ByState: S.optional(S.String).pipe(T.HttpQuery("state")),
          ByBackupVaultName: S.optional(S.String).pipe(T.HttpQuery("backupVaultName")),
          ByCreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          ByCreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          ByResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          ByAccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          ByCompleteAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("completeAfter"),
          ),
          ByCompleteBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("completeBefore"),
          ),
          ByParentJobId: S.optional(S.String).pipe(T.HttpQuery("parentJobId")),
          ByMessageCategory: S.optional(S.String).pipe(T.HttpQuery("messageCategory")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/backup-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBackupJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          BackupJobId: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          VaultType: S.optional(S.String),
          VaultLockState: S.optional(S.String),
          RecoveryPointArn: S.optional(S.String),
          RecoveryPointLifecycle: S.optional(__S(264, __c33, 0)),
          EncryptionKeyArn: S.optional(S.String),
          IsEncrypted: S.optional(S.Boolean),
          ResourceArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          PercentDone: S.optional(S.String),
          BackupSizeInBytes: S.optional(S.Number),
          IamRoleArn: S.optional(S.String),
          CreatedBy: S.optional(__S(568, __c71, 0)),
          ExpectedCompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartBy: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceType: S.optional(S.String),
          BytesTransferred: S.optional(S.Number),
          BackupOptions: S.optional(__S(192, __c24, 0)),
          BackupType: S.optional(S.String),
          ParentJobId: S.optional(S.String),
          IsParent: S.optional(S.Boolean),
          ResourceName: S.optional(S.String),
          InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MessageCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "BackupJob" });
    case 2:
      return S.Array(__S(945, __c118, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ BackupJobs: S.optional(__S(946, __c118, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBackupJobsOutput" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String).pipe(T.HttpQuery("AccountId")),
          State: S.optional(S.String).pipe(T.HttpQuery("State")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("ResourceType")),
          MessageCategory: S.optional(S.String).pipe(T.HttpQuery("MessageCategory")),
          AggregationPeriod: S.optional(S.String).pipe(T.HttpQuery("AggregationPeriod")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/backup-job-summaries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBackupJobSummariesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupJobSummaries: S.optional(__S(961, __c120, 1)),
          AggregationPeriod: S.optional(S.String),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBackupJobSummariesOutput" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          AccountId: S.optional(S.String),
          State: S.optional(S.String),
          ResourceType: S.optional(S.String),
          MessageCategory: S.optional(S.String),
          Count: S.optional(S.Number),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BackupJobSummary" });
    case 1:
      return S.Array(__S(960, __c120, 0));
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          IncludeDeleted: S.optional(S.Boolean).pipe(T.HttpQuery("includeDeleted")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/backup/plans" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBackupPlansInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          BackupPlansList: S.optional(__S(977, __c122, 1)),
        }),
      ).annotate({ identifier: "ListBackupPlansOutput" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanArn: S.optional(S.String),
          BackupPlanId: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VersionId: S.optional(S.String),
          BackupPlanName: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          LastExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AdvancedBackupSettings: S.optional(__S(289, __c36, 1)),
        }),
      ).annotate({ identifier: "BackupPlansListMember" });
    case 1:
      return S.Array(__S(976, __c122, 0));
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup/template/plans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBackupPlanTemplatesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupPlanTemplateId: S.optional(S.String),
          BackupPlanTemplateName: S.optional(S.String),
        }),
      ).annotate({ identifier: "BackupPlanTemplatesListMember" });
    case 2:
      return S.Array(__S(985, __c123, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          BackupPlanTemplatesList: S.optional(__S(986, __c123, 2)),
        }),
      ).annotate({ identifier: "ListBackupPlanTemplatesOutput" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup/plans/{BackupPlanId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBackupPlanVersionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          BackupPlanVersionsList: S.optional(__S(977, __c122, 1)),
        }),
      ).annotate({ identifier: "ListBackupPlanVersionsOutput" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup/plans/{BackupPlanId}/selections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBackupSelectionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SelectionId: S.optional(S.String),
          SelectionName: S.optional(S.String),
          BackupPlanId: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatorRequestId: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "BackupSelectionsListMember" });
    case 2:
      return S.Array(__S(1001, __c125, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          BackupSelectionsList: S.optional(__S(1002, __c125, 2)),
        }),
      ).annotate({ identifier: "ListBackupSelectionsOutput" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ByVaultType: S.optional(S.String).pipe(T.HttpQuery("vaultType")),
          ByShared: S.optional(S.Boolean).pipe(T.HttpQuery("shared")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/backup-vaults" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBackupVaultsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          VaultType: S.optional(S.String),
          VaultState: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EncryptionKeyArn: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          NumberOfRecoveryPoints: S.optional(S.Number),
          Locked: S.optional(S.Boolean),
          MinRetentionDays: S.optional(S.Number),
          MaxRetentionDays: S.optional(S.Number),
          LockDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EncryptionKeyType: S.optional(S.String),
        }),
      ).annotate({ identifier: "BackupVaultListMember" });
    case 2:
      return S.Array(__S(1009, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BackupVaultList: S.optional(__S(1010, __c126, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBackupVaultsOutput" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          ByResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
          ByState: S.optional(S.String).pipe(T.HttpQuery("state")),
          ByCreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          ByCreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          ByResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          ByDestinationVaultArn: S.optional(S.String).pipe(T.HttpQuery("destinationVaultArn")),
          ByAccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          ByCompleteBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("completeBefore"),
          ),
          ByCompleteAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("completeAfter"),
          ),
          ByParentJobId: S.optional(S.String).pipe(T.HttpQuery("parentJobId")),
          ByMessageCategory: S.optional(S.String).pipe(T.HttpQuery("messageCategory")),
          BySourceRecoveryPointArn: S.optional(S.String).pipe(
            T.HttpQuery("sourceRecoveryPointArn"),
          ),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/copy-jobs" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCopyJobsInput" });
    case 1:
      return S.Array(__S(608, __c76, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ CopyJobs: S.optional(__S(1017, __c127, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCopyJobsOutput" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String).pipe(T.HttpQuery("AccountId")),
          State: S.optional(S.String).pipe(T.HttpQuery("State")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("ResourceType")),
          MessageCategory: S.optional(S.String).pipe(T.HttpQuery("MessageCategory")),
          AggregationPeriod: S.optional(S.String).pipe(T.HttpQuery("AggregationPeriod")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/copy-job-summaries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCopyJobSummariesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CopyJobSummaries: S.optional(__S(961, __c120, 1)),
          AggregationPeriod: S.optional(S.String),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCopyJobSummariesOutput" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/audit/frameworks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFrameworksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FrameworkName: S.optional(S.String),
          FrameworkArn: S.optional(S.String),
          FrameworkDescription: S.optional(S.String),
          NumberOfControls: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeploymentStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Framework" });
    case 2:
      return S.Array(__S(1033, __c129, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Frameworks: S.optional(__S(1034, __c129, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFrameworksOutput" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          SourceResourceArn: S.optional(S.String).pipe(T.HttpQuery("sourceResourceArn")),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          IndexStatus: S.optional(S.String).pipe(T.HttpQuery("indexStatus")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/indexes/recovery-point" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIndexedRecoveryPointsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.optional(S.String),
          SourceResourceArn: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          BackupCreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceType: S.optional(S.String),
          IndexCreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IndexStatus: S.optional(S.String),
          IndexStatusMessage: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "IndexedRecoveryPoint" });
    case 2:
      return S.Array(__S(1041, __c130, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IndexedRecoveryPoints: S.optional(__S(1042, __c130, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIndexedRecoveryPointsOutput" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/legal-holds" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLegalHoldsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(S.String),
          Status: S.optional(S.String),
          Description: S.optional(S.String),
          LegalHoldId: S.optional(S.String),
          LegalHoldArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CancellationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LegalHold" });
    case 2:
      return S.Array(__S(1049, __c131, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), LegalHolds: S.optional(__S(1050, __c131, 2)) }),
      ).annotate({ identifier: "ListLegalHoldsOutput" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/resources" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProtectedResourcesInput" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          LastBackupTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceName: S.optional(S.String),
          LastBackupVaultArn: S.optional(S.String),
          LastRecoveryPointArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProtectedResource" });
    case 1:
      return S.Array(__S(1064, __c133, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Results: S.optional(__S(1065, __c133, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProtectedResourcesOutput" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          BackupVaultAccountId: S.optional(S.String).pipe(T.HttpQuery("backupVaultAccountId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup-vaults/{BackupVaultName}/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProtectedResourcesByBackupVaultInput" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          BackupVaultAccountId: S.optional(S.String).pipe(T.HttpQuery("backupVaultAccountId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          ByResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
          ByResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          ByBackupPlanId: S.optional(S.String).pipe(T.HttpQuery("backupPlanId")),
          ByCreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          ByCreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          ByParentRecoveryPointArn: S.optional(S.String).pipe(
            T.HttpQuery("parentRecoveryPointArn"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backup-vaults/{BackupVaultName}/recovery-points" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecoveryPointsByBackupVaultInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          SourceBackupVaultArn: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          CreatedBy: S.optional(__S(568, __c71, 0)),
          IamRoleArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BackupSizeInBytes: S.optional(S.Number),
          CalculatedLifecycle: S.optional(__S(648, __c81, 0)),
          Lifecycle: S.optional(__S(264, __c33, 0)),
          EncryptionKeyArn: S.optional(S.String),
          IsEncrypted: S.optional(S.Boolean),
          LastRestoreTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ParentRecoveryPointArn: S.optional(S.String),
          CompositeMemberIdentifier: S.optional(S.String),
          IsParent: S.optional(S.Boolean),
          ResourceName: S.optional(S.String),
          VaultType: S.optional(S.String),
          IndexStatus: S.optional(S.String),
          IndexStatusMessage: S.optional(S.String),
          EncryptionKeyType: S.optional(S.String),
          AggregatedScanResult: S.optional(__S(1088, __c136, 0)),
        }),
      ).annotate({ identifier: "RecoveryPointByBackupVault" });
    case 2:
      return S.Array(__S(1081, __c135, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RecoveryPoints: S.optional(__S(1082, __c135, 2)),
        }),
      ).annotate({ identifier: "ListRecoveryPointsByBackupVaultOutput" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FailedScan: S.optional(S.Boolean),
          Findings: S.optional(__S(400, __c50, 0)),
          LastComputed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AggregatedScanResult" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LegalHoldId: S.String.pipe(T.HttpLabel("LegalHoldId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/legal-holds/{LegalHoldId}/recovery-points" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecoveryPointsByLegalHoldInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecoveryPointMember" });
    case 2:
      return S.Array(__S(1097, __c137, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RecoveryPoints: S.optional(__S(1098, __c137, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecoveryPointsByLegalHoldOutput" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          ManagedByAWSBackupOnly: S.optional(S.Boolean).pipe(T.HttpQuery("managedByAWSBackupOnly")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resources/{ResourceArn}/recovery-points" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecoveryPointsByResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          BackupSizeBytes: S.optional(S.Number),
          BackupVaultName: S.optional(S.String),
          IsParent: S.optional(S.Boolean),
          ParentRecoveryPointArn: S.optional(S.String),
          ResourceName: S.optional(S.String),
          VaultType: S.optional(S.String),
          IndexStatus: S.optional(S.String),
          IndexStatusMessage: S.optional(S.String),
          EncryptionKeyType: S.optional(S.String),
          AggregatedScanResult: S.optional(__S(1088, __c136, 0)),
        }),
      ).annotate({ identifier: "RecoveryPointByResource" });
    case 2:
      return S.Array(__S(1105, __c138, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RecoveryPoints: S.optional(__S(1106, __c138, 2)),
        }),
      ).annotate({ identifier: "ListRecoveryPointsByResourceOutput" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ByReportPlanName: S.optional(S.String).pipe(T.HttpQuery("ReportPlanName")),
          ByCreationBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("CreationBefore"),
          ),
          ByCreationAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("CreationAfter"),
          ),
          ByStatus: S.optional(S.String).pipe(T.HttpQuery("Status")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/audit/report-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReportJobsInput" });
    case 1:
      return S.Array(__S(681, __c85, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ ReportJobs: S.optional(__S(1113, __c139, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListReportJobsOutput" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/report-plans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListReportPlansInput" });
    case 1:
      return S.Array(__S(696, __c87, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReportPlans: S.optional(__S(1121, __c140, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListReportPlansOutput" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/logically-air-gapped-backup-vaults/{BackupVaultName}/restore-access-backup-vaults",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRestoreAccessBackupVaultsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RestoreAccessBackupVaultArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ApprovalDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VaultState: S.optional(S.String),
          LatestRevokeRequest: S.optional(__S(592, __c74, 0)),
        }),
      ).annotate({ identifier: "RestoreAccessBackupVaultListMember" });
    case 2:
      return S.Array(__S(1129, __c141, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RestoreAccessBackupVaults: S.optional(__S(1130, __c141, 2)),
        }),
      ).annotate({ identifier: "ListRestoreAccessBackupVaultsOutput" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          ByAccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          ByResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          ByCreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          ByCreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          ByStatus: S.optional(S.String).pipe(T.HttpQuery("status")),
          ByCompleteBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("completeBefore"),
          ),
          ByCompleteAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("completeAfter"),
          ),
          ByRestoreTestingPlanArn: S.optional(S.String).pipe(T.HttpQuery("restoreTestingPlanArn")),
          ByParentJobId: S.optional(S.String).pipe(T.HttpQuery("parentJobId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/restore-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRestoreJobsInput" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          RestoreJobId: S.optional(S.String),
          RecoveryPointArn: S.optional(S.String),
          SourceResourceArn: S.optional(S.String),
          BackupVaultArn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          PercentDone: S.optional(S.String),
          BackupSizeInBytes: S.optional(S.Number),
          IamRoleArn: S.optional(S.String),
          ExpectedCompletionTimeMinutes: S.optional(S.Number),
          CreatedResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          RecoveryPointCreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IsParent: S.optional(S.Boolean),
          ParentJobId: S.optional(S.String),
          CreatedBy: S.optional(__S(712, __c89, 0)),
          ValidationStatus: S.optional(S.String),
          ValidationStatusMessage: S.optional(S.String),
          DeletionStatus: S.optional(S.String),
          DeletionStatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "RestoreJobsListMember" });
    case 1:
      return S.Array(__S(1144, __c143, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RestoreJobs: S.optional(__S(1145, __c143, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRestoreJobsOutput" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          ByStatus: S.optional(S.String).pipe(T.HttpQuery("status")),
          ByRecoveryPointCreationDateAfter: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ).pipe(T.HttpQuery("recoveryPointCreationDateAfter")),
          ByRecoveryPointCreationDateBefore: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ).pipe(T.HttpQuery("recoveryPointCreationDateBefore")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resources/{ResourceArn}/restore-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRestoreJobsByProtectedResourceInput" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String).pipe(T.HttpQuery("AccountId")),
          State: S.optional(S.String).pipe(T.HttpQuery("State")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("ResourceType")),
          AggregationPeriod: S.optional(S.String).pipe(T.HttpQuery("AggregationPeriod")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/restore-job-summaries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRestoreJobSummariesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          AccountId: S.optional(S.String),
          State: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Count: S.optional(S.Number),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RestoreJobSummary" });
    case 2:
      return S.Array(__S(1161, __c145, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RestoreJobSummaries: S.optional(__S(1162, __c145, 2)),
          AggregationPeriod: S.optional(S.String),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRestoreJobSummariesOutput" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restore-testing/plans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRestoreTestingPlansInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastExecutionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RestoreTestingPlanArn: S.String,
          RestoreTestingPlanName: S.String,
          ScheduleExpression: S.String,
          ScheduleExpressionTimezone: S.optional(S.String),
          StartWindowHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingPlanForList" });
    case 2:
      return S.Array(__S(1169, __c146, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), RestoreTestingPlans: __S(1170, __c146, 2) }),
      ).annotate({ identifier: "ListRestoreTestingPlansOutput" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          RestoreTestingPlanName: S.String.pipe(T.HttpLabel("RestoreTestingPlanName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restore-testing/plans/{RestoreTestingPlanName}/selections",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRestoreTestingSelectionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          IamRoleArn: S.String,
          ProtectedResourceType: S.String,
          RestoreTestingPlanName: S.String,
          RestoreTestingSelectionName: S.String,
          ValidationWindowHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreTestingSelectionForList" });
    case 2:
      return S.Array(__S(1177, __c147, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RestoreTestingSelections: __S(1178, __c147, 2),
        }),
      ).annotate({ identifier: "ListRestoreTestingSelectionsOutput" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ByAccountId: S.optional(S.String).pipe(T.HttpQuery("ByAccountId")),
          ByBackupVaultName: S.optional(S.String).pipe(T.HttpQuery("ByBackupVaultName")),
          ByCompleteAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("ByCompleteAfter"),
          ),
          ByCompleteBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("ByCompleteBefore"),
          ),
          ByMalwareScanner: S.optional(S.String).pipe(T.HttpQuery("ByMalwareScanner")),
          ByRecoveryPointArn: S.optional(S.String).pipe(T.HttpQuery("ByRecoveryPointArn")),
          ByResourceArn: S.optional(S.String).pipe(T.HttpQuery("ByResourceArn")),
          ByResourceType: S.optional(S.String).pipe(T.HttpQuery("ByResourceType")),
          ByScanResultStatus: S.optional(S.String).pipe(T.HttpQuery("ByScanResultStatus")),
          ByState: S.optional(S.String).pipe(T.HttpQuery("ByState")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/scan/jobs" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListScanJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BackupVaultArn: S.String,
          BackupVaultName: S.String,
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ContinuousScanEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ContinuousScanStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: __S(736, __c92, 0),
          CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          IamRoleArn: S.String,
          MalwareScanner: S.String,
          RecoveryPointArn: S.String,
          ResourceArn: S.String,
          ResourceName: S.String,
          ResourceType: S.String,
          ScanBaseRecoveryPointArn: S.optional(S.String),
          ScanId: S.optional(S.String),
          ScanJobId: S.String,
          ScanMode: S.String,
          ScanResult: S.optional(__S(728, __c91, 0)),
          ScannerRoleArn: S.String,
          State: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScanJob" });
    case 2:
      return S.Array(__S(1185, __c148, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), ScanJobs: __S(1186, __c148, 2) }),
      ).annotate({ identifier: "ListScanJobsOutput" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String).pipe(T.HttpQuery("AccountId")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("ResourceType")),
          MalwareScanner: S.optional(S.String).pipe(T.HttpQuery("MalwareScanner")),
          ScanResultStatus: S.optional(S.String).pipe(T.HttpQuery("ScanResultStatus")),
          State: S.optional(S.String).pipe(T.HttpQuery("State")),
          AggregationPeriod: S.optional(S.String).pipe(T.HttpQuery("AggregationPeriod")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/scan-job-summaries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListScanJobSummariesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          AccountId: S.optional(S.String),
          State: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Count: S.optional(S.Number),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MalwareScanner: S.optional(S.String),
          ScanResultStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScanJobSummary" });
    case 2:
      return S.Array(__S(1193, __c149, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScanJobSummaries: S.optional(__S(1194, __c149, 2)),
          AggregationPeriod: S.optional(S.String),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListScanJobSummariesOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
