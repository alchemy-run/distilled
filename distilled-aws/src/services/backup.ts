import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region as Rgn } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Backup",
  serviceShapeName: "CryoControllerUserManager",
});
const auth = T.AwsAuthSigv4({ name: "backup" });
const ver = T.ServiceVersion("2018-11-15");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type BackupVaultName = string;
export type ARN = string;
export type RequesterComment = string | redacted.Redacted<string>;
export type BackupPlanName = string;
export type BackupRuleName = string;
export type CronExpression = string;
export type WindowMinutes = number;
export type TagKey = string;
export type TagValue = string;
export type Timezone = string;
export type ResourceType = string;
export type BackupOptionKey = string;
export type BackupOptionValue = string;
export type IAMRoleArn = string;
export type BackupSelectionName = string;
export type ConditionKey = string;
export type ConditionValue = string;
export type FrameworkName = string;
export type FrameworkDescription = string;
export type ControlName = string;
export type ParameterName = string;
export type ParameterValue = string;
export type ReportPlanName = string;
export type ReportPlanDescription = string;
export type TieringConfigurationName = string;
export type BackupVaultNameOrWildcard = string;
export type TieringDownSettingsInDays = number;
export type CreatorRequestId = string;
export type AccountId = string;
export type Long2 = number;
export type GlobalSettingsName = string;
export type GlobalSettingsValue = string;
export type IsEnabled = boolean;
export type ReportJobId = string;
export type RestoreJobId = string;
export type MaxScheduledRunsPreview = number;
export type IAMPolicy = string;
export type MetadataKey = string;
export type MetadataValue = string;
export type MaxResults = number;
export type MessageCategory = string;
export type Region = string;
export type MaxFrameworkInputs = number;
export type ListRestoreTestingPlansInputMaxResultsInteger = number;
export type ListRestoreTestingSelectionsInputMaxResultsInteger = number;
export type ListScanJobsInputMaxResultsInteger = number;

//# Schemas
export interface AssociateBackupVaultMpaApprovalTeamInput {
  BackupVaultName: string;
  MpaApprovalTeamArn: string;
  RequesterComment?: string | redacted.Redacted<string>;
}
export const AssociateBackupVaultMpaApprovalTeamInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    MpaApprovalTeamArn: S.String,
    RequesterComment: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/backup-vaults/{BackupVaultName}/mpaApprovalTeam",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateBackupVaultMpaApprovalTeamInput",
}) as any as S.Schema<AssociateBackupVaultMpaApprovalTeamInput>;
export interface AssociateBackupVaultMpaApprovalTeamResponse {}
export const AssociateBackupVaultMpaApprovalTeamResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateBackupVaultMpaApprovalTeamResponse",
}) as any as S.Schema<AssociateBackupVaultMpaApprovalTeamResponse>;
export interface CancelLegalHoldInput {
  LegalHoldId: string;
  CancelDescription: string;
  RetainRecordInDays?: number;
}
export const CancelLegalHoldInput = S.suspend(() =>
  S.Struct({
    LegalHoldId: S.String.pipe(T.HttpLabel("LegalHoldId")),
    CancelDescription: S.String.pipe(T.HttpQuery("cancelDescription")),
    RetainRecordInDays: S.optional(S.Number).pipe(
      T.HttpQuery("retainRecordInDays"),
    ),
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
).annotate({
  identifier: "CancelLegalHoldInput",
}) as any as S.Schema<CancelLegalHoldInput>;
export interface CancelLegalHoldOutput {}
export const CancelLegalHoldOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "CancelLegalHoldOutput",
}) as any as S.Schema<CancelLegalHoldOutput>;
export type LifecycleDeleteAfterEvent = "DELETE_AFTER_COPY" | (string & {});
export const LifecycleDeleteAfterEvent = S.String;
export interface Lifecycle {
  MoveToColdStorageAfterDays?: number;
  DeleteAfterDays?: number;
  OptInToArchiveForSupportedResources?: boolean;
  DeleteAfterEvent?: LifecycleDeleteAfterEvent;
}
export const Lifecycle = S.suspend(() =>
  S.Struct({
    MoveToColdStorageAfterDays: S.optional(S.Number),
    DeleteAfterDays: S.optional(S.Number),
    OptInToArchiveForSupportedResources: S.optional(S.Boolean),
    DeleteAfterEvent: S.optional(LifecycleDeleteAfterEvent),
  }),
).annotate({ identifier: "Lifecycle" }) as any as S.Schema<Lifecycle>;
export type Tags = { [key: string]: string | undefined };
export const Tags = S.Record(S.String, S.String.pipe(S.optional));
export interface CopyAction {
  Lifecycle?: Lifecycle;
  DestinationBackupVaultArn: string;
}
export const CopyAction = S.suspend(() =>
  S.Struct({
    Lifecycle: S.optional(Lifecycle),
    DestinationBackupVaultArn: S.String,
  }),
).annotate({ identifier: "CopyAction" }) as any as S.Schema<CopyAction>;
export type CopyActions = CopyAction[];
export const CopyActions = S.Array(CopyAction);
export type ResourceTypes = string[];
export const ResourceTypes = S.Array(S.String);
export interface IndexAction {
  ResourceTypes?: string[];
}
export const IndexAction = S.suspend(() =>
  S.Struct({ ResourceTypes: S.optional(ResourceTypes) }),
).annotate({ identifier: "IndexAction" }) as any as S.Schema<IndexAction>;
export type IndexActions = IndexAction[];
export const IndexActions = S.Array(IndexAction);
export type MalwareScanner = "GUARDDUTY" | (string & {});
export const MalwareScanner = S.String;
export type ScanMode = "FULL_SCAN" | "INCREMENTAL_SCAN" | (string & {});
export const ScanMode = S.String;
export interface ScanAction {
  MalwareScanner?: MalwareScanner;
  ScanMode?: ScanMode;
}
export const ScanAction = S.suspend(() =>
  S.Struct({
    MalwareScanner: S.optional(MalwareScanner),
    ScanMode: S.optional(ScanMode),
  }),
).annotate({ identifier: "ScanAction" }) as any as S.Schema<ScanAction>;
export type ScanActions = ScanAction[];
export const ScanActions = S.Array(ScanAction);
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
export const BackupRuleInput = S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    TargetBackupVaultName: S.String,
    TargetLogicallyAirGappedBackupVaultArn: S.optional(S.String),
    ScheduleExpression: S.optional(S.String),
    StartWindowMinutes: S.optional(S.Number),
    CompletionWindowMinutes: S.optional(S.Number),
    Lifecycle: S.optional(Lifecycle),
    RecoveryPointTags: S.optional(Tags),
    CopyActions: S.optional(CopyActions),
    EnableContinuousBackup: S.optional(S.Boolean),
    ScheduleExpressionTimezone: S.optional(S.String),
    IndexActions: S.optional(IndexActions),
    ScanActions: S.optional(ScanActions),
  }),
).annotate({
  identifier: "BackupRuleInput",
}) as any as S.Schema<BackupRuleInput>;
export type BackupRulesInput = BackupRuleInput[];
export const BackupRulesInput = S.Array(BackupRuleInput);
export type BackupOptions = { [key: string]: string | undefined };
export const BackupOptions = S.Record(S.String, S.String.pipe(S.optional));
export interface AdvancedBackupSetting {
  ResourceType?: string;
  BackupOptions?: { [key: string]: string | undefined };
}
export const AdvancedBackupSetting = S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    BackupOptions: S.optional(BackupOptions),
  }),
).annotate({
  identifier: "AdvancedBackupSetting",
}) as any as S.Schema<AdvancedBackupSetting>;
export type AdvancedBackupSettings = AdvancedBackupSetting[];
export const AdvancedBackupSettings = S.Array(AdvancedBackupSetting);
export interface ScanSetting {
  MalwareScanner?: MalwareScanner;
  ResourceTypes?: string[];
  ScannerRoleArn?: string;
}
export const ScanSetting = S.suspend(() =>
  S.Struct({
    MalwareScanner: S.optional(MalwareScanner),
    ResourceTypes: S.optional(ResourceTypes),
    ScannerRoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "ScanSetting" }) as any as S.Schema<ScanSetting>;
export type ScanSettings = ScanSetting[];
export const ScanSettings = S.Array(ScanSetting);
export interface BackupPlanInput {
  BackupPlanName: string;
  Rules: BackupRuleInput[];
  AdvancedBackupSettings?: AdvancedBackupSetting[];
  ScanSettings?: ScanSetting[];
}
export const BackupPlanInput = S.suspend(() =>
  S.Struct({
    BackupPlanName: S.String,
    Rules: BackupRulesInput,
    AdvancedBackupSettings: S.optional(AdvancedBackupSettings),
    ScanSettings: S.optional(ScanSettings),
  }),
).annotate({
  identifier: "BackupPlanInput",
}) as any as S.Schema<BackupPlanInput>;
export interface CreateBackupPlanInput {
  BackupPlan: BackupPlanInput;
  BackupPlanTags?: { [key: string]: string | undefined };
  CreatorRequestId?: string;
}
export const CreateBackupPlanInput = S.suspend(() =>
  S.Struct({
    BackupPlan: BackupPlanInput,
    BackupPlanTags: S.optional(Tags),
    CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/backup/plans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBackupPlanInput",
}) as any as S.Schema<CreateBackupPlanInput>;
export interface CreateBackupPlanOutput {
  BackupPlanId?: string;
  BackupPlanArn?: string;
  CreationDate?: Date;
  VersionId?: string;
  AdvancedBackupSettings?: AdvancedBackupSetting[];
}
export const CreateBackupPlanOutput = S.suspend(() =>
  S.Struct({
    BackupPlanId: S.optional(S.String),
    BackupPlanArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VersionId: S.optional(S.String),
    AdvancedBackupSettings: S.optional(AdvancedBackupSettings),
  }),
).annotate({
  identifier: "CreateBackupPlanOutput",
}) as any as S.Schema<CreateBackupPlanOutput>;
export type ResourceArns = string[];
export const ResourceArns = S.Array(S.String);
export type ConditionType = "STRINGEQUALS" | (string & {});
export const ConditionType = S.String;
export interface Condition {
  ConditionType: ConditionType;
  ConditionKey: string;
  ConditionValue: string;
}
export const Condition = S.suspend(() =>
  S.Struct({
    ConditionType: ConditionType,
    ConditionKey: S.String,
    ConditionValue: S.String,
  }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export type ListOfTags = Condition[];
export const ListOfTags = S.Array(Condition);
export interface ConditionParameter {
  ConditionKey?: string;
  ConditionValue?: string;
}
export const ConditionParameter = S.suspend(() =>
  S.Struct({
    ConditionKey: S.optional(S.String),
    ConditionValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ConditionParameter",
}) as any as S.Schema<ConditionParameter>;
export type ConditionParameters = ConditionParameter[];
export const ConditionParameters = S.Array(ConditionParameter);
export interface Conditions {
  StringEquals?: ConditionParameter[];
  StringNotEquals?: ConditionParameter[];
  StringLike?: ConditionParameter[];
  StringNotLike?: ConditionParameter[];
}
export const Conditions = S.suspend(() =>
  S.Struct({
    StringEquals: S.optional(ConditionParameters),
    StringNotEquals: S.optional(ConditionParameters),
    StringLike: S.optional(ConditionParameters),
    StringNotLike: S.optional(ConditionParameters),
  }),
).annotate({ identifier: "Conditions" }) as any as S.Schema<Conditions>;
export interface BackupSelection {
  SelectionName: string;
  IamRoleArn: string;
  Resources?: string[];
  ListOfTags?: Condition[];
  NotResources?: string[];
  Conditions?: Conditions;
}
export const BackupSelection = S.suspend(() =>
  S.Struct({
    SelectionName: S.String,
    IamRoleArn: S.String,
    Resources: S.optional(ResourceArns),
    ListOfTags: S.optional(ListOfTags),
    NotResources: S.optional(ResourceArns),
    Conditions: S.optional(Conditions),
  }),
).annotate({
  identifier: "BackupSelection",
}) as any as S.Schema<BackupSelection>;
export interface CreateBackupSelectionInput {
  BackupPlanId: string;
  BackupSelection: BackupSelection;
  CreatorRequestId?: string;
}
export const CreateBackupSelectionInput = S.suspend(() =>
  S.Struct({
    BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
    BackupSelection: BackupSelection,
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
).annotate({
  identifier: "CreateBackupSelectionInput",
}) as any as S.Schema<CreateBackupSelectionInput>;
export interface CreateBackupSelectionOutput {
  SelectionId?: string;
  BackupPlanId?: string;
  CreationDate?: Date;
}
export const CreateBackupSelectionOutput = S.suspend(() =>
  S.Struct({
    SelectionId: S.optional(S.String),
    BackupPlanId: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateBackupSelectionOutput",
}) as any as S.Schema<CreateBackupSelectionOutput>;
export interface CreateBackupVaultInput {
  BackupVaultName: string;
  BackupVaultTags?: { [key: string]: string | undefined };
  EncryptionKeyArn?: string;
  CreatorRequestId?: string;
}
export const CreateBackupVaultInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    BackupVaultTags: S.optional(Tags),
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
).annotate({
  identifier: "CreateBackupVaultInput",
}) as any as S.Schema<CreateBackupVaultInput>;
export interface CreateBackupVaultOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  CreationDate?: Date;
}
export const CreateBackupVaultOutput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateBackupVaultOutput",
}) as any as S.Schema<CreateBackupVaultOutput>;
export interface ControlInputParameter {
  ParameterName?: string;
  ParameterValue?: string;
}
export const ControlInputParameter = S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ControlInputParameter",
}) as any as S.Schema<ControlInputParameter>;
export type ControlInputParameters = ControlInputParameter[];
export const ControlInputParameters = S.Array(ControlInputParameter);
export type ComplianceResourceIdList = string[];
export const ComplianceResourceIdList = S.Array(S.String);
export type ResourceTypeList = string[];
export const ResourceTypeList = S.Array(S.String);
export type StringMap = { [key: string]: string | undefined };
export const StringMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ControlScope {
  ComplianceResourceIds?: string[];
  ComplianceResourceTypes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const ControlScope = S.suspend(() =>
  S.Struct({
    ComplianceResourceIds: S.optional(ComplianceResourceIdList),
    ComplianceResourceTypes: S.optional(ResourceTypeList),
    Tags: S.optional(StringMap),
  }),
).annotate({ identifier: "ControlScope" }) as any as S.Schema<ControlScope>;
export interface FrameworkControl {
  ControlName: string;
  ControlInputParameters?: ControlInputParameter[];
  ControlScope?: ControlScope;
}
export const FrameworkControl = S.suspend(() =>
  S.Struct({
    ControlName: S.String,
    ControlInputParameters: S.optional(ControlInputParameters),
    ControlScope: S.optional(ControlScope),
  }),
).annotate({
  identifier: "FrameworkControl",
}) as any as S.Schema<FrameworkControl>;
export type FrameworkControls = FrameworkControl[];
export const FrameworkControls = S.Array(FrameworkControl);
export interface CreateFrameworkInput {
  FrameworkName: string;
  FrameworkDescription?: string;
  FrameworkControls: FrameworkControl[];
  IdempotencyToken?: string;
  FrameworkTags?: { [key: string]: string | undefined };
}
export const CreateFrameworkInput = S.suspend(() =>
  S.Struct({
    FrameworkName: S.String,
    FrameworkDescription: S.optional(S.String),
    FrameworkControls: FrameworkControls,
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FrameworkTags: S.optional(StringMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audit/frameworks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFrameworkInput",
}) as any as S.Schema<CreateFrameworkInput>;
export interface CreateFrameworkOutput {
  FrameworkName?: string;
  FrameworkArn?: string;
}
export const CreateFrameworkOutput = S.suspend(() =>
  S.Struct({
    FrameworkName: S.optional(S.String),
    FrameworkArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateFrameworkOutput",
}) as any as S.Schema<CreateFrameworkOutput>;
export type VaultNames = string[];
export const VaultNames = S.Array(S.String);
export type ResourceIdentifiers = string[];
export const ResourceIdentifiers = S.Array(S.String);
export interface DateRange {
  FromDate: Date;
  ToDate: Date;
}
export const DateRange = S.suspend(() =>
  S.Struct({
    FromDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ToDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "DateRange" }) as any as S.Schema<DateRange>;
export interface RecoveryPointSelection {
  VaultNames?: string[];
  ResourceIdentifiers?: string[];
  DateRange?: DateRange;
}
export const RecoveryPointSelection = S.suspend(() =>
  S.Struct({
    VaultNames: S.optional(VaultNames),
    ResourceIdentifiers: S.optional(ResourceIdentifiers),
    DateRange: S.optional(DateRange),
  }),
).annotate({
  identifier: "RecoveryPointSelection",
}) as any as S.Schema<RecoveryPointSelection>;
export interface CreateLegalHoldInput {
  Title: string;
  Description: string;
  IdempotencyToken?: string;
  RecoveryPointSelection?: RecoveryPointSelection;
  Tags?: { [key: string]: string | undefined };
}
export const CreateLegalHoldInput = S.suspend(() =>
  S.Struct({
    Title: S.String,
    Description: S.String,
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    RecoveryPointSelection: S.optional(RecoveryPointSelection),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/legal-holds" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLegalHoldInput",
}) as any as S.Schema<CreateLegalHoldInput>;
export type LegalHoldStatus =
  | "CREATING"
  | "ACTIVE"
  | "CANCELING"
  | "CANCELED"
  | (string & {});
export const LegalHoldStatus = S.String;
export interface CreateLegalHoldOutput {
  Title?: string;
  Status?: LegalHoldStatus;
  Description?: string;
  LegalHoldId?: string;
  LegalHoldArn?: string;
  CreationDate?: Date;
  RecoveryPointSelection?: RecoveryPointSelection;
}
export const CreateLegalHoldOutput = S.suspend(() =>
  S.Struct({
    Title: S.optional(S.String),
    Status: S.optional(LegalHoldStatus),
    Description: S.optional(S.String),
    LegalHoldId: S.optional(S.String),
    LegalHoldArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RecoveryPointSelection: S.optional(RecoveryPointSelection),
  }),
).annotate({
  identifier: "CreateLegalHoldOutput",
}) as any as S.Schema<CreateLegalHoldOutput>;
export interface CreateLogicallyAirGappedBackupVaultInput {
  BackupVaultName: string;
  BackupVaultTags?: { [key: string]: string | undefined };
  CreatorRequestId?: string;
  MinRetentionDays: number;
  MaxRetentionDays: number;
  EncryptionKeyArn?: string;
}
export const CreateLogicallyAirGappedBackupVaultInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    BackupVaultTags: S.optional(Tags),
    CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    MinRetentionDays: S.Number,
    MaxRetentionDays: S.Number,
    EncryptionKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/logically-air-gapped-backup-vaults/{BackupVaultName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLogicallyAirGappedBackupVaultInput",
}) as any as S.Schema<CreateLogicallyAirGappedBackupVaultInput>;
export type VaultState = "CREATING" | "AVAILABLE" | "FAILED" | (string & {});
export const VaultState = S.String;
export interface CreateLogicallyAirGappedBackupVaultOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  CreationDate?: Date;
  VaultState?: VaultState;
}
export const CreateLogicallyAirGappedBackupVaultOutput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VaultState: S.optional(VaultState),
  }),
).annotate({
  identifier: "CreateLogicallyAirGappedBackupVaultOutput",
}) as any as S.Schema<CreateLogicallyAirGappedBackupVaultOutput>;
export type FormatList = string[];
export const FormatList = S.Array(S.String);
export interface ReportDeliveryChannel {
  S3BucketName: string;
  S3KeyPrefix?: string;
  Formats?: string[];
}
export const ReportDeliveryChannel = S.suspend(() =>
  S.Struct({
    S3BucketName: S.String,
    S3KeyPrefix: S.optional(S.String),
    Formats: S.optional(FormatList),
  }),
).annotate({
  identifier: "ReportDeliveryChannel",
}) as any as S.Schema<ReportDeliveryChannel>;
export type StringList = string[];
export const StringList = S.Array(S.String);
export interface ReportSetting {
  ReportTemplate: string;
  FrameworkArns?: string[];
  NumberOfFrameworks?: number;
  Accounts?: string[];
  OrganizationUnits?: string[];
  Regions?: string[];
}
export const ReportSetting = S.suspend(() =>
  S.Struct({
    ReportTemplate: S.String,
    FrameworkArns: S.optional(StringList),
    NumberOfFrameworks: S.optional(S.Number),
    Accounts: S.optional(StringList),
    OrganizationUnits: S.optional(StringList),
    Regions: S.optional(StringList),
  }),
).annotate({ identifier: "ReportSetting" }) as any as S.Schema<ReportSetting>;
export interface CreateReportPlanInput {
  ReportPlanName: string;
  ReportPlanDescription?: string;
  ReportDeliveryChannel: ReportDeliveryChannel;
  ReportSetting: ReportSetting;
  ReportPlanTags?: { [key: string]: string | undefined };
  IdempotencyToken?: string;
}
export const CreateReportPlanInput = S.suspend(() =>
  S.Struct({
    ReportPlanName: S.String,
    ReportPlanDescription: S.optional(S.String),
    ReportDeliveryChannel: ReportDeliveryChannel,
    ReportSetting: ReportSetting,
    ReportPlanTags: S.optional(StringMap),
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
).annotate({
  identifier: "CreateReportPlanInput",
}) as any as S.Schema<CreateReportPlanInput>;
export interface CreateReportPlanOutput {
  ReportPlanName?: string;
  ReportPlanArn?: string;
  CreationTime?: Date;
}
export const CreateReportPlanOutput = S.suspend(() =>
  S.Struct({
    ReportPlanName: S.optional(S.String),
    ReportPlanArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateReportPlanOutput",
}) as any as S.Schema<CreateReportPlanOutput>;
export interface CreateRestoreAccessBackupVaultInput {
  SourceBackupVaultArn: string;
  BackupVaultName?: string;
  BackupVaultTags?: { [key: string]: string | undefined };
  CreatorRequestId?: string;
  RequesterComment?: string | redacted.Redacted<string>;
}
export const CreateRestoreAccessBackupVaultInput = S.suspend(() =>
  S.Struct({
    SourceBackupVaultArn: S.String,
    BackupVaultName: S.optional(S.String),
    BackupVaultTags: S.optional(Tags),
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
).annotate({
  identifier: "CreateRestoreAccessBackupVaultInput",
}) as any as S.Schema<CreateRestoreAccessBackupVaultInput>;
export interface CreateRestoreAccessBackupVaultOutput {
  RestoreAccessBackupVaultArn?: string;
  VaultState?: VaultState;
  RestoreAccessBackupVaultName?: string;
  CreationDate?: Date;
}
export const CreateRestoreAccessBackupVaultOutput = S.suspend(() =>
  S.Struct({
    RestoreAccessBackupVaultArn: S.optional(S.String),
    VaultState: S.optional(VaultState),
    RestoreAccessBackupVaultName: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateRestoreAccessBackupVaultOutput",
}) as any as S.Schema<CreateRestoreAccessBackupVaultOutput>;
export type RestoreTestingRecoveryPointSelectionAlgorithm =
  | "LATEST_WITHIN_WINDOW"
  | "RANDOM_WITHIN_WINDOW"
  | (string & {});
export const RestoreTestingRecoveryPointSelectionAlgorithm = S.String;
export type RestoreTestingRecoveryPointType =
  | "CONTINUOUS"
  | "SNAPSHOT"
  | (string & {});
export const RestoreTestingRecoveryPointType = S.String;
export type RestoreTestingRecoveryPointTypeList =
  RestoreTestingRecoveryPointType[];
export const RestoreTestingRecoveryPointTypeList = S.Array(
  RestoreTestingRecoveryPointType,
);
export interface RestoreTestingRecoveryPointSelection {
  Algorithm?: RestoreTestingRecoveryPointSelectionAlgorithm;
  ExcludeVaults?: string[];
  IncludeVaults?: string[];
  RecoveryPointTypes?: RestoreTestingRecoveryPointType[];
  SelectionWindowDays?: number;
}
export const RestoreTestingRecoveryPointSelection = S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(RestoreTestingRecoveryPointSelectionAlgorithm),
    ExcludeVaults: S.optional(StringList),
    IncludeVaults: S.optional(StringList),
    RecoveryPointTypes: S.optional(RestoreTestingRecoveryPointTypeList),
    SelectionWindowDays: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingRecoveryPointSelection",
}) as any as S.Schema<RestoreTestingRecoveryPointSelection>;
export interface RestoreTestingPlanForCreate {
  RecoveryPointSelection: RestoreTestingRecoveryPointSelection;
  RestoreTestingPlanName: string;
  ScheduleExpression: string;
  ScheduleExpressionTimezone?: string;
  StartWindowHours?: number;
}
export const RestoreTestingPlanForCreate = S.suspend(() =>
  S.Struct({
    RecoveryPointSelection: RestoreTestingRecoveryPointSelection,
    RestoreTestingPlanName: S.String,
    ScheduleExpression: S.String,
    ScheduleExpressionTimezone: S.optional(S.String),
    StartWindowHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingPlanForCreate",
}) as any as S.Schema<RestoreTestingPlanForCreate>;
export type SensitiveStringMap = { [key: string]: string | undefined };
export const SensitiveStringMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateRestoreTestingPlanInput {
  CreatorRequestId?: string;
  RestoreTestingPlan: RestoreTestingPlanForCreate;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRestoreTestingPlanInput = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.optional(S.String),
    RestoreTestingPlan: RestoreTestingPlanForCreate,
    Tags: S.optional(SensitiveStringMap),
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
).annotate({
  identifier: "CreateRestoreTestingPlanInput",
}) as any as S.Schema<CreateRestoreTestingPlanInput>;
export interface CreateRestoreTestingPlanOutput {
  CreationTime: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
}
export const CreateRestoreTestingPlanOutput = S.suspend(() =>
  S.Struct({
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RestoreTestingPlanArn: S.String,
    RestoreTestingPlanName: S.String,
  }),
).annotate({
  identifier: "CreateRestoreTestingPlanOutput",
}) as any as S.Schema<CreateRestoreTestingPlanOutput>;
export interface KeyValue {
  Key: string;
  Value: string;
}
export const KeyValue = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "KeyValue" }) as any as S.Schema<KeyValue>;
export type KeyValueList = KeyValue[];
export const KeyValueList = S.Array(KeyValue);
export interface ProtectedResourceConditions {
  StringEquals?: KeyValue[];
  StringNotEquals?: KeyValue[];
}
export const ProtectedResourceConditions = S.suspend(() =>
  S.Struct({
    StringEquals: S.optional(KeyValueList),
    StringNotEquals: S.optional(KeyValueList),
  }),
).annotate({
  identifier: "ProtectedResourceConditions",
}) as any as S.Schema<ProtectedResourceConditions>;
export interface RestoreTestingSelectionForCreate {
  IamRoleArn: string;
  ProtectedResourceArns?: string[];
  ProtectedResourceConditions?: ProtectedResourceConditions;
  ProtectedResourceType: string;
  RestoreMetadataOverrides?: { [key: string]: string | undefined };
  RestoreTestingSelectionName: string;
  ValidationWindowHours?: number;
}
export const RestoreTestingSelectionForCreate = S.suspend(() =>
  S.Struct({
    IamRoleArn: S.String,
    ProtectedResourceArns: S.optional(StringList),
    ProtectedResourceConditions: S.optional(ProtectedResourceConditions),
    ProtectedResourceType: S.String,
    RestoreMetadataOverrides: S.optional(SensitiveStringMap),
    RestoreTestingSelectionName: S.String,
    ValidationWindowHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingSelectionForCreate",
}) as any as S.Schema<RestoreTestingSelectionForCreate>;
export interface CreateRestoreTestingSelectionInput {
  CreatorRequestId?: string;
  RestoreTestingPlanName: string;
  RestoreTestingSelection: RestoreTestingSelectionForCreate;
}
export const CreateRestoreTestingSelectionInput = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.optional(S.String),
    RestoreTestingPlanName: S.String.pipe(
      T.HttpLabel("RestoreTestingPlanName"),
    ),
    RestoreTestingSelection: RestoreTestingSelectionForCreate,
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
).annotate({
  identifier: "CreateRestoreTestingSelectionInput",
}) as any as S.Schema<CreateRestoreTestingSelectionInput>;
export interface CreateRestoreTestingSelectionOutput {
  CreationTime: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
}
export const CreateRestoreTestingSelectionOutput = S.suspend(() =>
  S.Struct({
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RestoreTestingPlanArn: S.String,
    RestoreTestingPlanName: S.String,
    RestoreTestingSelectionName: S.String,
  }),
).annotate({
  identifier: "CreateRestoreTestingSelectionOutput",
}) as any as S.Schema<CreateRestoreTestingSelectionOutput>;
export interface ResourceSelection {
  Resources: string[];
  TieringDownSettingsInDays: number;
  ResourceType: string;
}
export const ResourceSelection = S.suspend(() =>
  S.Struct({
    Resources: ResourceArns,
    TieringDownSettingsInDays: S.Number,
    ResourceType: S.String,
  }),
).annotate({
  identifier: "ResourceSelection",
}) as any as S.Schema<ResourceSelection>;
export type ResourceSelections = ResourceSelection[];
export const ResourceSelections = S.Array(ResourceSelection);
export interface TieringConfigurationInputForCreate {
  TieringConfigurationName: string;
  BackupVaultName: string;
  ResourceSelection: ResourceSelection[];
}
export const TieringConfigurationInputForCreate = S.suspend(() =>
  S.Struct({
    TieringConfigurationName: S.String,
    BackupVaultName: S.String,
    ResourceSelection: ResourceSelections,
  }),
).annotate({
  identifier: "TieringConfigurationInputForCreate",
}) as any as S.Schema<TieringConfigurationInputForCreate>;
export interface CreateTieringConfigurationInput {
  TieringConfiguration: TieringConfigurationInputForCreate;
  TieringConfigurationTags?: { [key: string]: string | undefined };
  CreatorRequestId?: string;
}
export const CreateTieringConfigurationInput = S.suspend(() =>
  S.Struct({
    TieringConfiguration: TieringConfigurationInputForCreate,
    TieringConfigurationTags: S.optional(Tags),
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
).annotate({
  identifier: "CreateTieringConfigurationInput",
}) as any as S.Schema<CreateTieringConfigurationInput>;
export interface CreateTieringConfigurationOutput {
  TieringConfigurationArn?: string;
  TieringConfigurationName?: string;
  CreationTime?: Date;
}
export const CreateTieringConfigurationOutput = S.suspend(() =>
  S.Struct({
    TieringConfigurationArn: S.optional(S.String),
    TieringConfigurationName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateTieringConfigurationOutput",
}) as any as S.Schema<CreateTieringConfigurationOutput>;
export interface DeleteBackupPlanInput {
  BackupPlanId: string;
}
export const DeleteBackupPlanInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteBackupPlanInput",
}) as any as S.Schema<DeleteBackupPlanInput>;
export interface DeleteBackupPlanOutput {
  BackupPlanId?: string;
  BackupPlanArn?: string;
  DeletionDate?: Date;
  VersionId?: string;
}
export const DeleteBackupPlanOutput = S.suspend(() =>
  S.Struct({
    BackupPlanId: S.optional(S.String),
    BackupPlanArn: S.optional(S.String),
    DeletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteBackupPlanOutput",
}) as any as S.Schema<DeleteBackupPlanOutput>;
export interface DeleteBackupSelectionInput {
  BackupPlanId: string;
  SelectionId: string;
}
export const DeleteBackupSelectionInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteBackupSelectionInput",
}) as any as S.Schema<DeleteBackupSelectionInput>;
export interface DeleteBackupSelectionResponse {}
export const DeleteBackupSelectionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBackupSelectionResponse",
}) as any as S.Schema<DeleteBackupSelectionResponse>;
export interface DeleteBackupVaultInput {
  BackupVaultName: string;
}
export const DeleteBackupVaultInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/backup-vaults/{BackupVaultName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBackupVaultInput",
}) as any as S.Schema<DeleteBackupVaultInput>;
export interface DeleteBackupVaultResponse {}
export const DeleteBackupVaultResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteBackupVaultResponse" },
) as any as S.Schema<DeleteBackupVaultResponse>;
export interface DeleteBackupVaultAccessPolicyInput {
  BackupVaultName: string;
}
export const DeleteBackupVaultAccessPolicyInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/backup-vaults/{BackupVaultName}/access-policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBackupVaultAccessPolicyInput",
}) as any as S.Schema<DeleteBackupVaultAccessPolicyInput>;
export interface DeleteBackupVaultAccessPolicyResponse {}
export const DeleteBackupVaultAccessPolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBackupVaultAccessPolicyResponse",
}) as any as S.Schema<DeleteBackupVaultAccessPolicyResponse>;
export interface DeleteBackupVaultLockConfigurationInput {
  BackupVaultName: string;
}
export const DeleteBackupVaultLockConfigurationInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/backup-vaults/{BackupVaultName}/vault-lock",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBackupVaultLockConfigurationInput",
}) as any as S.Schema<DeleteBackupVaultLockConfigurationInput>;
export interface DeleteBackupVaultLockConfigurationResponse {}
export const DeleteBackupVaultLockConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBackupVaultLockConfigurationResponse",
}) as any as S.Schema<DeleteBackupVaultLockConfigurationResponse>;
export interface DeleteBackupVaultNotificationsInput {
  BackupVaultName: string;
}
export const DeleteBackupVaultNotificationsInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
  }).pipe(
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
).annotate({
  identifier: "DeleteBackupVaultNotificationsInput",
}) as any as S.Schema<DeleteBackupVaultNotificationsInput>;
export interface DeleteBackupVaultNotificationsResponse {}
export const DeleteBackupVaultNotificationsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBackupVaultNotificationsResponse",
}) as any as S.Schema<DeleteBackupVaultNotificationsResponse>;
export interface DeleteFrameworkInput {
  FrameworkName: string;
}
export const DeleteFrameworkInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteFrameworkInput",
}) as any as S.Schema<DeleteFrameworkInput>;
export interface DeleteFrameworkResponse {}
export const DeleteFrameworkResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteFrameworkResponse",
}) as any as S.Schema<DeleteFrameworkResponse>;
export interface DeleteRecoveryPointInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export const DeleteRecoveryPointInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRecoveryPointInput",
}) as any as S.Schema<DeleteRecoveryPointInput>;
export interface DeleteRecoveryPointResponse {}
export const DeleteRecoveryPointResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRecoveryPointResponse",
}) as any as S.Schema<DeleteRecoveryPointResponse>;
export interface DeleteReportPlanInput {
  ReportPlanName: string;
}
export const DeleteReportPlanInput = S.suspend(() =>
  S.Struct({
    ReportPlanName: S.String.pipe(T.HttpLabel("ReportPlanName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/audit/report-plans/{ReportPlanName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReportPlanInput",
}) as any as S.Schema<DeleteReportPlanInput>;
export interface DeleteReportPlanResponse {}
export const DeleteReportPlanResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteReportPlanResponse",
}) as any as S.Schema<DeleteReportPlanResponse>;
export interface DeleteRestoreTestingPlanInput {
  RestoreTestingPlanName: string;
}
export const DeleteRestoreTestingPlanInput = S.suspend(() =>
  S.Struct({
    RestoreTestingPlanName: S.String.pipe(
      T.HttpLabel("RestoreTestingPlanName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restore-testing/plans/{RestoreTestingPlanName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRestoreTestingPlanInput",
}) as any as S.Schema<DeleteRestoreTestingPlanInput>;
export interface DeleteRestoreTestingPlanResponse {}
export const DeleteRestoreTestingPlanResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRestoreTestingPlanResponse",
}) as any as S.Schema<DeleteRestoreTestingPlanResponse>;
export interface DeleteRestoreTestingSelectionInput {
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
}
export const DeleteRestoreTestingSelectionInput = S.suspend(() =>
  S.Struct({
    RestoreTestingPlanName: S.String.pipe(
      T.HttpLabel("RestoreTestingPlanName"),
    ),
    RestoreTestingSelectionName: S.String.pipe(
      T.HttpLabel("RestoreTestingSelectionName"),
    ),
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
).annotate({
  identifier: "DeleteRestoreTestingSelectionInput",
}) as any as S.Schema<DeleteRestoreTestingSelectionInput>;
export interface DeleteRestoreTestingSelectionResponse {}
export const DeleteRestoreTestingSelectionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRestoreTestingSelectionResponse",
}) as any as S.Schema<DeleteRestoreTestingSelectionResponse>;
export interface DeleteTieringConfigurationInput {
  TieringConfigurationName: string;
}
export const DeleteTieringConfigurationInput = S.suspend(() =>
  S.Struct({
    TieringConfigurationName: S.String.pipe(
      T.HttpLabel("TieringConfigurationName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/tiering-configurations/{TieringConfigurationName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTieringConfigurationInput",
}) as any as S.Schema<DeleteTieringConfigurationInput>;
export interface DeleteTieringConfigurationOutput {}
export const DeleteTieringConfigurationOutput = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTieringConfigurationOutput",
}) as any as S.Schema<DeleteTieringConfigurationOutput>;
export interface DescribeBackupJobInput {
  BackupJobId: string;
}
export const DescribeBackupJobInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeBackupJobInput",
}) as any as S.Schema<DescribeBackupJobInput>;
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
export const BackupJobState = S.String;
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
export const RecoveryPointCreator = S.suspend(() =>
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
).annotate({
  identifier: "RecoveryPointCreator",
}) as any as S.Schema<RecoveryPointCreator>;
export type BackupJobChildJobsInState = { [key in BackupJobState]?: number };
export const BackupJobChildJobsInState = S.Record(
  BackupJobState,
  S.Number.pipe(S.optional),
);
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
export const DescribeBackupJobOutput = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    BackupJobId: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    RecoveryPointLifecycle: S.optional(Lifecycle),
    BackupVaultArn: S.optional(S.String),
    VaultType: S.optional(S.String),
    VaultLockState: S.optional(S.String),
    RecoveryPointArn: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    IsEncrypted: S.optional(S.Boolean),
    ResourceArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: S.optional(BackupJobState),
    StatusMessage: S.optional(S.String),
    PercentDone: S.optional(S.String),
    BackupSizeInBytes: S.optional(S.Number),
    IamRoleArn: S.optional(S.String),
    CreatedBy: S.optional(RecoveryPointCreator),
    ResourceType: S.optional(S.String),
    BytesTransferred: S.optional(S.Number),
    ExpectedCompletionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartBy: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    BackupOptions: S.optional(BackupOptions),
    BackupType: S.optional(S.String),
    ParentJobId: S.optional(S.String),
    IsParent: S.optional(S.Boolean),
    NumberOfChildJobs: S.optional(S.Number),
    ChildJobsInState: S.optional(BackupJobChildJobsInState),
    ResourceName: S.optional(S.String),
    InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MessageCategory: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeBackupJobOutput",
}) as any as S.Schema<DescribeBackupJobOutput>;
export interface DescribeBackupVaultInput {
  BackupVaultName: string;
  BackupVaultAccountId?: string;
}
export const DescribeBackupVaultInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    BackupVaultAccountId: S.optional(S.String).pipe(
      T.HttpQuery("backupVaultAccountId"),
    ),
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
).annotate({
  identifier: "DescribeBackupVaultInput",
}) as any as S.Schema<DescribeBackupVaultInput>;
export type VaultType =
  | "BACKUP_VAULT"
  | "LOGICALLY_AIR_GAPPED_BACKUP_VAULT"
  | "RESTORE_ACCESS_BACKUP_VAULT"
  | (string & {});
export const VaultType = S.String;
export type MpaSessionStatus =
  | "PENDING"
  | "APPROVED"
  | "FAILED"
  | (string & {});
export const MpaSessionStatus = S.String;
export interface LatestMpaApprovalTeamUpdate {
  MpaSessionArn?: string;
  Status?: MpaSessionStatus;
  StatusMessage?: string;
  InitiationDate?: Date;
  ExpiryDate?: Date;
}
export const LatestMpaApprovalTeamUpdate = S.suspend(() =>
  S.Struct({
    MpaSessionArn: S.optional(S.String),
    Status: S.optional(MpaSessionStatus),
    StatusMessage: S.optional(S.String),
    InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExpiryDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LatestMpaApprovalTeamUpdate",
}) as any as S.Schema<LatestMpaApprovalTeamUpdate>;
export type EncryptionKeyType =
  | "AWS_OWNED_KMS_KEY"
  | "CUSTOMER_MANAGED_KMS_KEY"
  | (string & {});
export const EncryptionKeyType = S.String;
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
export const DescribeBackupVaultOutput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    VaultType: S.optional(VaultType),
    VaultState: S.optional(VaultState),
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
    LatestMpaApprovalTeamUpdate: S.optional(LatestMpaApprovalTeamUpdate),
    EncryptionKeyType: S.optional(EncryptionKeyType),
  }),
).annotate({
  identifier: "DescribeBackupVaultOutput",
}) as any as S.Schema<DescribeBackupVaultOutput>;
export interface DescribeCopyJobInput {
  CopyJobId: string;
}
export const DescribeCopyJobInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeCopyJobInput",
}) as any as S.Schema<DescribeCopyJobInput>;
export type CopyJobState =
  | "CREATED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "PARTIAL"
  | (string & {});
export const CopyJobState = S.String;
export type CopyJobChildJobsInState = { [key in CopyJobState]?: number };
export const CopyJobChildJobsInState = S.Record(
  CopyJobState,
  S.Number.pipe(S.optional),
);
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
export const CopyJob = S.suspend(() =>
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
    DestinationRecoveryPointLifecycle: S.optional(Lifecycle),
    ResourceArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: S.optional(CopyJobState),
    StatusMessage: S.optional(S.String),
    BackupSizeInBytes: S.optional(S.Number),
    IamRoleArn: S.optional(S.String),
    CreatedBy: S.optional(RecoveryPointCreator),
    CreatedByBackupJobId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    ParentJobId: S.optional(S.String),
    IsParent: S.optional(S.Boolean),
    CompositeMemberIdentifier: S.optional(S.String),
    NumberOfChildJobs: S.optional(S.Number),
    ChildJobsInState: S.optional(CopyJobChildJobsInState),
    ResourceName: S.optional(S.String),
    MessageCategory: S.optional(S.String),
  }),
).annotate({ identifier: "CopyJob" }) as any as S.Schema<CopyJob>;
export interface DescribeCopyJobOutput {
  CopyJob?: CopyJob;
}
export const DescribeCopyJobOutput = S.suspend(() =>
  S.Struct({ CopyJob: S.optional(CopyJob) }),
).annotate({
  identifier: "DescribeCopyJobOutput",
}) as any as S.Schema<DescribeCopyJobOutput>;
export interface DescribeFrameworkInput {
  FrameworkName: string;
}
export const DescribeFrameworkInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeFrameworkInput",
}) as any as S.Schema<DescribeFrameworkInput>;
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
export const DescribeFrameworkOutput = S.suspend(() =>
  S.Struct({
    FrameworkName: S.optional(S.String),
    FrameworkArn: S.optional(S.String),
    FrameworkDescription: S.optional(S.String),
    FrameworkControls: S.optional(FrameworkControls),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeploymentStatus: S.optional(S.String),
    FrameworkStatus: S.optional(S.String),
    IdempotencyToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeFrameworkOutput",
}) as any as S.Schema<DescribeFrameworkOutput>;
export interface DescribeGlobalSettingsInput {}
export const DescribeGlobalSettingsInput = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/global-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGlobalSettingsInput",
}) as any as S.Schema<DescribeGlobalSettingsInput>;
export type GlobalSettings = { [key: string]: string | undefined };
export const GlobalSettings = S.Record(S.String, S.String.pipe(S.optional));
export interface DescribeGlobalSettingsOutput {
  GlobalSettings?: { [key: string]: string | undefined };
  LastUpdateTime?: Date;
}
export const DescribeGlobalSettingsOutput = S.suspend(() =>
  S.Struct({
    GlobalSettings: S.optional(GlobalSettings),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeGlobalSettingsOutput",
}) as any as S.Schema<DescribeGlobalSettingsOutput>;
export interface DescribeProtectedResourceInput {
  ResourceArn: string;
}
export const DescribeProtectedResourceInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeProtectedResourceInput",
}) as any as S.Schema<DescribeProtectedResourceInput>;
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
export const DescribeProtectedResourceOutput = S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    LastBackupTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceName: S.optional(S.String),
    LastBackupVaultArn: S.optional(S.String),
    LastRecoveryPointArn: S.optional(S.String),
    LatestRestoreExecutionTimeMinutes: S.optional(S.Number),
    LatestRestoreJobCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestRestoreRecoveryPointCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeProtectedResourceOutput",
}) as any as S.Schema<DescribeProtectedResourceOutput>;
export interface DescribeRecoveryPointInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
  BackupVaultAccountId?: string;
}
export const DescribeRecoveryPointInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
    BackupVaultAccountId: S.optional(S.String).pipe(
      T.HttpQuery("backupVaultAccountId"),
    ),
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
).annotate({
  identifier: "DescribeRecoveryPointInput",
}) as any as S.Schema<DescribeRecoveryPointInput>;
export type RecoveryPointStatus =
  | "COMPLETED"
  | "PARTIAL"
  | "DELETING"
  | "EXPIRED"
  | "AVAILABLE"
  | "STOPPED"
  | "CREATING"
  | (string & {});
export const RecoveryPointStatus = S.String;
export interface CalculatedLifecycle {
  MoveToColdStorageAt?: Date;
  DeleteAt?: Date;
}
export const CalculatedLifecycle = S.suspend(() =>
  S.Struct({
    MoveToColdStorageAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeleteAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CalculatedLifecycle",
}) as any as S.Schema<CalculatedLifecycle>;
export type StorageClass = "WARM" | "COLD" | "DELETED" | (string & {});
export const StorageClass = S.String;
export type IndexStatus =
  | "PENDING"
  | "ACTIVE"
  | "FAILED"
  | "DELETING"
  | (string & {});
export const IndexStatus = S.String;
export type ScanJobState =
  | "COMPLETED"
  | "COMPLETED_WITH_ISSUES"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export const ScanJobState = S.String;
export type ScanFinding = "MALWARE" | (string & {});
export const ScanFinding = S.String;
export type ScanFindings = ScanFinding[];
export const ScanFindings = S.Array(ScanFinding);
export interface ScanResult {
  MalwareScanner?: MalwareScanner;
  ScanJobState?: ScanJobState;
  LastScanTimestamp?: Date;
  Findings?: ScanFinding[];
}
export const ScanResult = S.suspend(() =>
  S.Struct({
    MalwareScanner: S.optional(MalwareScanner),
    ScanJobState: S.optional(ScanJobState),
    LastScanTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Findings: S.optional(ScanFindings),
  }),
).annotate({ identifier: "ScanResult" }) as any as S.Schema<ScanResult>;
export type ScanResults = ScanResult[];
export const ScanResults = S.Array(ScanResult);
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
export const DescribeRecoveryPointOutput = S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    SourceBackupVaultArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    CreatedBy: S.optional(RecoveryPointCreator),
    IamRoleArn: S.optional(S.String),
    Status: S.optional(RecoveryPointStatus),
    StatusMessage: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    BackupSizeInBytes: S.optional(S.Number),
    CalculatedLifecycle: S.optional(CalculatedLifecycle),
    Lifecycle: S.optional(Lifecycle),
    EncryptionKeyArn: S.optional(S.String),
    IsEncrypted: S.optional(S.Boolean),
    StorageClass: S.optional(StorageClass),
    LastRestoreTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ParentRecoveryPointArn: S.optional(S.String),
    CompositeMemberIdentifier: S.optional(S.String),
    IsParent: S.optional(S.Boolean),
    ResourceName: S.optional(S.String),
    VaultType: S.optional(VaultType),
    IndexStatus: S.optional(IndexStatus),
    IndexStatusMessage: S.optional(S.String),
    EncryptionKeyType: S.optional(EncryptionKeyType),
    ScanResults: S.optional(ScanResults),
  }),
).annotate({
  identifier: "DescribeRecoveryPointOutput",
}) as any as S.Schema<DescribeRecoveryPointOutput>;
export interface DescribeRegionSettingsInput {}
export const DescribeRegionSettingsInput = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/account-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRegionSettingsInput",
}) as any as S.Schema<DescribeRegionSettingsInput>;
export type ResourceTypeOptInPreference = {
  [key: string]: boolean | undefined;
};
export const ResourceTypeOptInPreference = S.Record(
  S.String,
  S.Boolean.pipe(S.optional),
);
export type ResourceTypeManagementPreference = {
  [key: string]: boolean | undefined;
};
export const ResourceTypeManagementPreference = S.Record(
  S.String,
  S.Boolean.pipe(S.optional),
);
export interface DescribeRegionSettingsOutput {
  ResourceTypeOptInPreference?: { [key: string]: boolean | undefined };
  ResourceTypeManagementPreference?: { [key: string]: boolean | undefined };
}
export const DescribeRegionSettingsOutput = S.suspend(() =>
  S.Struct({
    ResourceTypeOptInPreference: S.optional(ResourceTypeOptInPreference),
    ResourceTypeManagementPreference: S.optional(
      ResourceTypeManagementPreference,
    ),
  }),
).annotate({
  identifier: "DescribeRegionSettingsOutput",
}) as any as S.Schema<DescribeRegionSettingsOutput>;
export interface DescribeReportJobInput {
  ReportJobId: string;
}
export const DescribeReportJobInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeReportJobInput",
}) as any as S.Schema<DescribeReportJobInput>;
export interface ReportDestination {
  S3BucketName?: string;
  S3Keys?: string[];
}
export const ReportDestination = S.suspend(() =>
  S.Struct({
    S3BucketName: S.optional(S.String),
    S3Keys: S.optional(StringList),
  }),
).annotate({
  identifier: "ReportDestination",
}) as any as S.Schema<ReportDestination>;
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
export const ReportJob = S.suspend(() =>
  S.Struct({
    ReportJobId: S.optional(S.String),
    ReportPlanArn: S.optional(S.String),
    ReportTemplate: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    ReportDestination: S.optional(ReportDestination),
  }),
).annotate({ identifier: "ReportJob" }) as any as S.Schema<ReportJob>;
export interface DescribeReportJobOutput {
  ReportJob?: ReportJob;
}
export const DescribeReportJobOutput = S.suspend(() =>
  S.Struct({ ReportJob: S.optional(ReportJob) }),
).annotate({
  identifier: "DescribeReportJobOutput",
}) as any as S.Schema<DescribeReportJobOutput>;
export interface DescribeReportPlanInput {
  ReportPlanName: string;
}
export const DescribeReportPlanInput = S.suspend(() =>
  S.Struct({
    ReportPlanName: S.String.pipe(T.HttpLabel("ReportPlanName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audit/report-plans/{ReportPlanName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReportPlanInput",
}) as any as S.Schema<DescribeReportPlanInput>;
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
export const ReportPlan = S.suspend(() =>
  S.Struct({
    ReportPlanArn: S.optional(S.String),
    ReportPlanName: S.optional(S.String),
    ReportPlanDescription: S.optional(S.String),
    ReportSetting: S.optional(ReportSetting),
    ReportDeliveryChannel: S.optional(ReportDeliveryChannel),
    DeploymentStatus: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAttemptedExecutionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSuccessfulExecutionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ReportPlan" }) as any as S.Schema<ReportPlan>;
export interface DescribeReportPlanOutput {
  ReportPlan?: ReportPlan;
}
export const DescribeReportPlanOutput = S.suspend(() =>
  S.Struct({ ReportPlan: S.optional(ReportPlan) }),
).annotate({
  identifier: "DescribeReportPlanOutput",
}) as any as S.Schema<DescribeReportPlanOutput>;
export interface DescribeRestoreJobInput {
  RestoreJobId: string;
}
export const DescribeRestoreJobInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeRestoreJobInput",
}) as any as S.Schema<DescribeRestoreJobInput>;
export type RestoreJobStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "ABORTED"
  | "FAILED"
  | (string & {});
export const RestoreJobStatus = S.String;
export interface RestoreJobCreator {
  RestoreTestingPlanArn?: string;
}
export const RestoreJobCreator = S.suspend(() =>
  S.Struct({ RestoreTestingPlanArn: S.optional(S.String) }),
).annotate({
  identifier: "RestoreJobCreator",
}) as any as S.Schema<RestoreJobCreator>;
export type RestoreValidationStatus =
  | "FAILED"
  | "SUCCESSFUL"
  | "TIMED_OUT"
  | "VALIDATING"
  | (string & {});
export const RestoreValidationStatus = S.String;
export type RestoreDeletionStatus =
  | "DELETING"
  | "FAILED"
  | "SUCCESSFUL"
  | (string & {});
export const RestoreDeletionStatus = S.String;
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
export const DescribeRestoreJobOutput = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    RestoreJobId: S.optional(S.String),
    RecoveryPointArn: S.optional(S.String),
    SourceResourceArn: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(RestoreJobStatus),
    StatusMessage: S.optional(S.String),
    PercentDone: S.optional(S.String),
    BackupSizeInBytes: S.optional(S.Number),
    IamRoleArn: S.optional(S.String),
    ExpectedCompletionTimeMinutes: S.optional(S.Number),
    CreatedResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    RecoveryPointCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreatedBy: S.optional(RestoreJobCreator),
    ValidationStatus: S.optional(RestoreValidationStatus),
    ValidationStatusMessage: S.optional(S.String),
    DeletionStatus: S.optional(RestoreDeletionStatus),
    DeletionStatusMessage: S.optional(S.String),
    IsParent: S.optional(S.Boolean),
    ParentJobId: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRestoreJobOutput",
}) as any as S.Schema<DescribeRestoreJobOutput>;
export interface DescribeScanJobInput {
  ScanJobId: string;
}
export const DescribeScanJobInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeScanJobInput",
}) as any as S.Schema<DescribeScanJobInput>;
export interface ScanJobCreator {
  BackupPlanArn: string;
  BackupPlanId: string;
  BackupPlanVersion: string;
  BackupRuleId: string;
}
export const ScanJobCreator = S.suspend(() =>
  S.Struct({
    BackupPlanArn: S.String,
    BackupPlanId: S.String,
    BackupPlanVersion: S.String,
    BackupRuleId: S.String,
  }),
).annotate({ identifier: "ScanJobCreator" }) as any as S.Schema<ScanJobCreator>;
export type ScanResourceType = "EBS" | "EC2" | "S3" | (string & {});
export const ScanResourceType = S.String;
export type ScanResultStatus =
  | "NO_THREATS_FOUND"
  | "THREATS_FOUND"
  | (string & {});
export const ScanResultStatus = S.String;
export interface ScanResultInfo {
  ScanResultStatus: ScanResultStatus;
}
export const ScanResultInfo = S.suspend(() =>
  S.Struct({ ScanResultStatus: ScanResultStatus }),
).annotate({ identifier: "ScanResultInfo" }) as any as S.Schema<ScanResultInfo>;
export type ScanState =
  | "CANCELED"
  | "COMPLETED"
  | "COMPLETED_WITH_ISSUES"
  | "CREATED"
  | "FAILED"
  | "RUNNING"
  | (string & {});
export const ScanState = S.String;
export interface DescribeScanJobOutput {
  AccountId: string;
  BackupVaultArn: string;
  BackupVaultName: string;
  CompletionDate?: Date;
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
export const DescribeScanJobOutput = S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BackupVaultArn: S.String,
    BackupVaultName: S.String,
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: ScanJobCreator,
    CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    IamRoleArn: S.String,
    MalwareScanner: MalwareScanner,
    RecoveryPointArn: S.String,
    ResourceArn: S.String,
    ResourceName: S.String,
    ResourceType: ScanResourceType,
    ScanBaseRecoveryPointArn: S.optional(S.String),
    ScanId: S.optional(S.String),
    ScanJobId: S.String,
    ScanMode: ScanMode,
    ScanResult: S.optional(ScanResultInfo),
    ScannerRoleArn: S.String,
    State: ScanState,
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeScanJobOutput",
}) as any as S.Schema<DescribeScanJobOutput>;
export interface DisassociateBackupVaultMpaApprovalTeamInput {
  BackupVaultName: string;
  RequesterComment?: string | redacted.Redacted<string>;
}
export const DisassociateBackupVaultMpaApprovalTeamInput = S.suspend(() =>
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
).annotate({
  identifier: "DisassociateBackupVaultMpaApprovalTeamInput",
}) as any as S.Schema<DisassociateBackupVaultMpaApprovalTeamInput>;
export interface DisassociateBackupVaultMpaApprovalTeamResponse {}
export const DisassociateBackupVaultMpaApprovalTeamResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateBackupVaultMpaApprovalTeamResponse",
}) as any as S.Schema<DisassociateBackupVaultMpaApprovalTeamResponse>;
export interface DisassociateRecoveryPointInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export const DisassociateRecoveryPointInput = S.suspend(() =>
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
).annotate({
  identifier: "DisassociateRecoveryPointInput",
}) as any as S.Schema<DisassociateRecoveryPointInput>;
export interface DisassociateRecoveryPointResponse {}
export const DisassociateRecoveryPointResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateRecoveryPointResponse",
}) as any as S.Schema<DisassociateRecoveryPointResponse>;
export interface DisassociateRecoveryPointFromParentInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export const DisassociateRecoveryPointFromParentInput = S.suspend(() =>
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
).annotate({
  identifier: "DisassociateRecoveryPointFromParentInput",
}) as any as S.Schema<DisassociateRecoveryPointFromParentInput>;
export interface DisassociateRecoveryPointFromParentResponse {}
export const DisassociateRecoveryPointFromParentResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateRecoveryPointFromParentResponse",
}) as any as S.Schema<DisassociateRecoveryPointFromParentResponse>;
export interface ExportBackupPlanTemplateInput {
  BackupPlanId: string;
}
export const ExportBackupPlanTemplateInput = S.suspend(() =>
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
).annotate({
  identifier: "ExportBackupPlanTemplateInput",
}) as any as S.Schema<ExportBackupPlanTemplateInput>;
export interface ExportBackupPlanTemplateOutput {
  BackupPlanTemplateJson?: string;
}
export const ExportBackupPlanTemplateOutput = S.suspend(() =>
  S.Struct({ BackupPlanTemplateJson: S.optional(S.String) }),
).annotate({
  identifier: "ExportBackupPlanTemplateOutput",
}) as any as S.Schema<ExportBackupPlanTemplateOutput>;
export interface GetBackupPlanInput {
  BackupPlanId: string;
  VersionId?: string;
  MaxScheduledRunsPreview?: number;
}
export const GetBackupPlanInput = S.suspend(() =>
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
).annotate({
  identifier: "GetBackupPlanInput",
}) as any as S.Schema<GetBackupPlanInput>;
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
export const BackupRule = S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    TargetBackupVaultName: S.String,
    TargetLogicallyAirGappedBackupVaultArn: S.optional(S.String),
    ScheduleExpression: S.optional(S.String),
    StartWindowMinutes: S.optional(S.Number),
    CompletionWindowMinutes: S.optional(S.Number),
    Lifecycle: S.optional(Lifecycle),
    RecoveryPointTags: S.optional(Tags),
    RuleId: S.optional(S.String),
    CopyActions: S.optional(CopyActions),
    EnableContinuousBackup: S.optional(S.Boolean),
    ScheduleExpressionTimezone: S.optional(S.String),
    IndexActions: S.optional(IndexActions),
    ScanActions: S.optional(ScanActions),
  }),
).annotate({ identifier: "BackupRule" }) as any as S.Schema<BackupRule>;
export type BackupRules = BackupRule[];
export const BackupRules = S.Array(BackupRule);
export interface BackupPlan {
  BackupPlanName: string;
  Rules: BackupRule[];
  AdvancedBackupSettings?: AdvancedBackupSetting[];
  ScanSettings?: ScanSetting[];
}
export const BackupPlan = S.suspend(() =>
  S.Struct({
    BackupPlanName: S.String,
    Rules: BackupRules,
    AdvancedBackupSettings: S.optional(AdvancedBackupSettings),
    ScanSettings: S.optional(ScanSettings),
  }),
).annotate({ identifier: "BackupPlan" }) as any as S.Schema<BackupPlan>;
export type RuleExecutionType =
  | "CONTINUOUS"
  | "SNAPSHOTS"
  | "CONTINUOUS_AND_SNAPSHOTS"
  | (string & {});
export const RuleExecutionType = S.String;
export interface ScheduledPlanExecutionMember {
  ExecutionTime?: Date;
  RuleId?: string;
  RuleExecutionType?: RuleExecutionType;
}
export const ScheduledPlanExecutionMember = S.suspend(() =>
  S.Struct({
    ExecutionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RuleId: S.optional(S.String),
    RuleExecutionType: S.optional(RuleExecutionType),
  }),
).annotate({
  identifier: "ScheduledPlanExecutionMember",
}) as any as S.Schema<ScheduledPlanExecutionMember>;
export type ScheduledRunsPreview = ScheduledPlanExecutionMember[];
export const ScheduledRunsPreview = S.Array(ScheduledPlanExecutionMember);
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
export const GetBackupPlanOutput = S.suspend(() =>
  S.Struct({
    BackupPlan: S.optional(BackupPlan),
    BackupPlanId: S.optional(S.String),
    BackupPlanArn: S.optional(S.String),
    VersionId: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AdvancedBackupSettings: S.optional(AdvancedBackupSettings),
    ScheduledRunsPreview: S.optional(ScheduledRunsPreview),
  }),
).annotate({
  identifier: "GetBackupPlanOutput",
}) as any as S.Schema<GetBackupPlanOutput>;
export interface GetBackupPlanFromJSONInput {
  BackupPlanTemplateJson: string;
}
export const GetBackupPlanFromJSONInput = S.suspend(() =>
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
).annotate({
  identifier: "GetBackupPlanFromJSONInput",
}) as any as S.Schema<GetBackupPlanFromJSONInput>;
export interface GetBackupPlanFromJSONOutput {
  BackupPlan?: BackupPlan;
}
export const GetBackupPlanFromJSONOutput = S.suspend(() =>
  S.Struct({ BackupPlan: S.optional(BackupPlan) }),
).annotate({
  identifier: "GetBackupPlanFromJSONOutput",
}) as any as S.Schema<GetBackupPlanFromJSONOutput>;
export interface GetBackupPlanFromTemplateInput {
  BackupPlanTemplateId: string;
}
export const GetBackupPlanFromTemplateInput = S.suspend(() =>
  S.Struct({
    BackupPlanTemplateId: S.String.pipe(T.HttpLabel("BackupPlanTemplateId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/backup/template/plans/{BackupPlanTemplateId}/toPlan",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBackupPlanFromTemplateInput",
}) as any as S.Schema<GetBackupPlanFromTemplateInput>;
export interface GetBackupPlanFromTemplateOutput {
  BackupPlanDocument?: BackupPlan;
}
export const GetBackupPlanFromTemplateOutput = S.suspend(() =>
  S.Struct({ BackupPlanDocument: S.optional(BackupPlan) }),
).annotate({
  identifier: "GetBackupPlanFromTemplateOutput",
}) as any as S.Schema<GetBackupPlanFromTemplateOutput>;
export interface GetBackupSelectionInput {
  BackupPlanId: string;
  SelectionId: string;
}
export const GetBackupSelectionInput = S.suspend(() =>
  S.Struct({
    BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
    SelectionId: S.String.pipe(T.HttpLabel("SelectionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/backup/plans/{BackupPlanId}/selections/{SelectionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBackupSelectionInput",
}) as any as S.Schema<GetBackupSelectionInput>;
export interface GetBackupSelectionOutput {
  BackupSelection?: BackupSelection;
  SelectionId?: string;
  BackupPlanId?: string;
  CreationDate?: Date;
  CreatorRequestId?: string;
}
export const GetBackupSelectionOutput = S.suspend(() =>
  S.Struct({
    BackupSelection: S.optional(BackupSelection),
    SelectionId: S.optional(S.String),
    BackupPlanId: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatorRequestId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBackupSelectionOutput",
}) as any as S.Schema<GetBackupSelectionOutput>;
export interface GetBackupVaultAccessPolicyInput {
  BackupVaultName: string;
}
export const GetBackupVaultAccessPolicyInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/backup-vaults/{BackupVaultName}/access-policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBackupVaultAccessPolicyInput",
}) as any as S.Schema<GetBackupVaultAccessPolicyInput>;
export interface GetBackupVaultAccessPolicyOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  Policy?: string;
}
export const GetBackupVaultAccessPolicyOutput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    Policy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBackupVaultAccessPolicyOutput",
}) as any as S.Schema<GetBackupVaultAccessPolicyOutput>;
export interface GetBackupVaultNotificationsInput {
  BackupVaultName: string;
}
export const GetBackupVaultNotificationsInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
  }).pipe(
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
).annotate({
  identifier: "GetBackupVaultNotificationsInput",
}) as any as S.Schema<GetBackupVaultNotificationsInput>;
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
  | (string & {});
export const BackupVaultEvent = S.String;
export type BackupVaultEvents = BackupVaultEvent[];
export const BackupVaultEvents = S.Array(BackupVaultEvent);
export interface GetBackupVaultNotificationsOutput {
  BackupVaultName?: string;
  BackupVaultArn?: string;
  SNSTopicArn?: string;
  BackupVaultEvents?: BackupVaultEvent[];
}
export const GetBackupVaultNotificationsOutput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    SNSTopicArn: S.optional(S.String),
    BackupVaultEvents: S.optional(BackupVaultEvents),
  }),
).annotate({
  identifier: "GetBackupVaultNotificationsOutput",
}) as any as S.Schema<GetBackupVaultNotificationsOutput>;
export interface GetLegalHoldInput {
  LegalHoldId: string;
}
export const GetLegalHoldInput = S.suspend(() =>
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
).annotate({
  identifier: "GetLegalHoldInput",
}) as any as S.Schema<GetLegalHoldInput>;
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
export const GetLegalHoldOutput = S.suspend(() =>
  S.Struct({
    Title: S.optional(S.String),
    Status: S.optional(LegalHoldStatus),
    Description: S.optional(S.String),
    CancelDescription: S.optional(S.String),
    LegalHoldId: S.optional(S.String),
    LegalHoldArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CancellationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RetainRecordUntil: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RecoveryPointSelection: S.optional(RecoveryPointSelection),
  }),
).annotate({
  identifier: "GetLegalHoldOutput",
}) as any as S.Schema<GetLegalHoldOutput>;
export interface GetRecoveryPointIndexDetailsInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export const GetRecoveryPointIndexDetailsInput = S.suspend(() =>
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
).annotate({
  identifier: "GetRecoveryPointIndexDetailsInput",
}) as any as S.Schema<GetRecoveryPointIndexDetailsInput>;
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
export const GetRecoveryPointIndexDetailsOutput = S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    SourceResourceArn: S.optional(S.String),
    IndexCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IndexDeletionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IndexCompletionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IndexStatus: S.optional(IndexStatus),
    IndexStatusMessage: S.optional(S.String),
    TotalItemsIndexed: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetRecoveryPointIndexDetailsOutput",
}) as any as S.Schema<GetRecoveryPointIndexDetailsOutput>;
export interface GetRecoveryPointRestoreMetadataInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
  BackupVaultAccountId?: string;
}
export const GetRecoveryPointRestoreMetadataInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
    BackupVaultAccountId: S.optional(S.String).pipe(
      T.HttpQuery("backupVaultAccountId"),
    ),
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
).annotate({
  identifier: "GetRecoveryPointRestoreMetadataInput",
}) as any as S.Schema<GetRecoveryPointRestoreMetadataInput>;
export type Metadata = { [key: string]: string | undefined };
export const Metadata = S.Record(S.String, S.String.pipe(S.optional));
export interface GetRecoveryPointRestoreMetadataOutput {
  BackupVaultArn?: string;
  RecoveryPointArn?: string;
  RestoreMetadata?: { [key: string]: string | undefined };
  ResourceType?: string;
}
export const GetRecoveryPointRestoreMetadataOutput = S.suspend(() =>
  S.Struct({
    BackupVaultArn: S.optional(S.String),
    RecoveryPointArn: S.optional(S.String),
    RestoreMetadata: S.optional(Metadata),
    ResourceType: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRecoveryPointRestoreMetadataOutput",
}) as any as S.Schema<GetRecoveryPointRestoreMetadataOutput>;
export interface GetRestoreJobMetadataInput {
  RestoreJobId: string;
}
export const GetRestoreJobMetadataInput = S.suspend(() =>
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
).annotate({
  identifier: "GetRestoreJobMetadataInput",
}) as any as S.Schema<GetRestoreJobMetadataInput>;
export interface GetRestoreJobMetadataOutput {
  RestoreJobId?: string;
  Metadata?: { [key: string]: string | undefined };
}
export const GetRestoreJobMetadataOutput = S.suspend(() =>
  S.Struct({
    RestoreJobId: S.optional(S.String),
    Metadata: S.optional(Metadata),
  }),
).annotate({
  identifier: "GetRestoreJobMetadataOutput",
}) as any as S.Schema<GetRestoreJobMetadataOutput>;
export interface GetRestoreTestingInferredMetadataInput {
  BackupVaultAccountId?: string;
  BackupVaultName: string;
  RecoveryPointArn: string;
}
export const GetRestoreTestingInferredMetadataInput = S.suspend(() =>
  S.Struct({
    BackupVaultAccountId: S.optional(S.String).pipe(
      T.HttpQuery("BackupVaultAccountId"),
    ),
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
).annotate({
  identifier: "GetRestoreTestingInferredMetadataInput",
}) as any as S.Schema<GetRestoreTestingInferredMetadataInput>;
export interface GetRestoreTestingInferredMetadataOutput {
  InferredMetadata: { [key: string]: string | undefined };
}
export const GetRestoreTestingInferredMetadataOutput = S.suspend(() =>
  S.Struct({ InferredMetadata: StringMap }),
).annotate({
  identifier: "GetRestoreTestingInferredMetadataOutput",
}) as any as S.Schema<GetRestoreTestingInferredMetadataOutput>;
export interface GetRestoreTestingPlanInput {
  RestoreTestingPlanName: string;
}
export const GetRestoreTestingPlanInput = S.suspend(() =>
  S.Struct({
    RestoreTestingPlanName: S.String.pipe(
      T.HttpLabel("RestoreTestingPlanName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restore-testing/plans/{RestoreTestingPlanName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRestoreTestingPlanInput",
}) as any as S.Schema<GetRestoreTestingPlanInput>;
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
export const RestoreTestingPlanForGet = S.suspend(() =>
  S.Struct({
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    CreatorRequestId: S.optional(S.String),
    LastExecutionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RecoveryPointSelection: RestoreTestingRecoveryPointSelection,
    RestoreTestingPlanArn: S.String,
    RestoreTestingPlanName: S.String,
    ScheduleExpression: S.String,
    ScheduleExpressionTimezone: S.optional(S.String),
    StartWindowHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingPlanForGet",
}) as any as S.Schema<RestoreTestingPlanForGet>;
export interface GetRestoreTestingPlanOutput {
  RestoreTestingPlan: RestoreTestingPlanForGet;
}
export const GetRestoreTestingPlanOutput = S.suspend(() =>
  S.Struct({ RestoreTestingPlan: RestoreTestingPlanForGet }),
).annotate({
  identifier: "GetRestoreTestingPlanOutput",
}) as any as S.Schema<GetRestoreTestingPlanOutput>;
export interface GetRestoreTestingSelectionInput {
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
}
export const GetRestoreTestingSelectionInput = S.suspend(() =>
  S.Struct({
    RestoreTestingPlanName: S.String.pipe(
      T.HttpLabel("RestoreTestingPlanName"),
    ),
    RestoreTestingSelectionName: S.String.pipe(
      T.HttpLabel("RestoreTestingSelectionName"),
    ),
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
).annotate({
  identifier: "GetRestoreTestingSelectionInput",
}) as any as S.Schema<GetRestoreTestingSelectionInput>;
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
export const RestoreTestingSelectionForGet = S.suspend(() =>
  S.Struct({
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    CreatorRequestId: S.optional(S.String),
    IamRoleArn: S.String,
    ProtectedResourceArns: S.optional(StringList),
    ProtectedResourceConditions: S.optional(ProtectedResourceConditions),
    ProtectedResourceType: S.String,
    RestoreMetadataOverrides: S.optional(SensitiveStringMap),
    RestoreTestingPlanName: S.String,
    RestoreTestingSelectionName: S.String,
    ValidationWindowHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingSelectionForGet",
}) as any as S.Schema<RestoreTestingSelectionForGet>;
export interface GetRestoreTestingSelectionOutput {
  RestoreTestingSelection: RestoreTestingSelectionForGet;
}
export const GetRestoreTestingSelectionOutput = S.suspend(() =>
  S.Struct({ RestoreTestingSelection: RestoreTestingSelectionForGet }),
).annotate({
  identifier: "GetRestoreTestingSelectionOutput",
}) as any as S.Schema<GetRestoreTestingSelectionOutput>;
export interface GetSupportedResourceTypesRequest {}
export const GetSupportedResourceTypesRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSupportedResourceTypesRequest",
}) as any as S.Schema<GetSupportedResourceTypesRequest>;
export interface GetSupportedResourceTypesOutput {
  ResourceTypes?: string[];
}
export const GetSupportedResourceTypesOutput = S.suspend(() =>
  S.Struct({ ResourceTypes: S.optional(ResourceTypes) }),
).annotate({
  identifier: "GetSupportedResourceTypesOutput",
}) as any as S.Schema<GetSupportedResourceTypesOutput>;
export interface GetTieringConfigurationInput {
  TieringConfigurationName: string;
}
export const GetTieringConfigurationInput = S.suspend(() =>
  S.Struct({
    TieringConfigurationName: S.String.pipe(
      T.HttpLabel("TieringConfigurationName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/tiering-configurations/{TieringConfigurationName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTieringConfigurationInput",
}) as any as S.Schema<GetTieringConfigurationInput>;
export interface TieringConfiguration {
  TieringConfigurationName: string;
  TieringConfigurationArn?: string;
  BackupVaultName: string;
  ResourceSelection: ResourceSelection[];
  CreatorRequestId?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export const TieringConfiguration = S.suspend(() =>
  S.Struct({
    TieringConfigurationName: S.String,
    TieringConfigurationArn: S.optional(S.String),
    BackupVaultName: S.String,
    ResourceSelection: ResourceSelections,
    CreatorRequestId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "TieringConfiguration",
}) as any as S.Schema<TieringConfiguration>;
export interface GetTieringConfigurationOutput {
  TieringConfiguration?: TieringConfiguration;
}
export const GetTieringConfigurationOutput = S.suspend(() =>
  S.Struct({ TieringConfiguration: S.optional(TieringConfiguration) }),
).annotate({
  identifier: "GetTieringConfigurationOutput",
}) as any as S.Schema<GetTieringConfigurationOutput>;
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
export const ListBackupJobsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ByResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
    ByState: S.optional(BackupJobState).pipe(T.HttpQuery("state")),
    ByBackupVaultName: S.optional(S.String).pipe(
      T.HttpQuery("backupVaultName"),
    ),
    ByCreatedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdBefore")),
    ByCreatedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAfter")),
    ByResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
    ByAccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
    ByCompleteAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("completeAfter")),
    ByCompleteBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("completeBefore")),
    ByParentJobId: S.optional(S.String).pipe(T.HttpQuery("parentJobId")),
    ByMessageCategory: S.optional(S.String).pipe(
      T.HttpQuery("messageCategory"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/backup-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBackupJobsInput",
}) as any as S.Schema<ListBackupJobsInput>;
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
export const BackupJob = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    BackupJobId: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    VaultType: S.optional(S.String),
    VaultLockState: S.optional(S.String),
    RecoveryPointArn: S.optional(S.String),
    RecoveryPointLifecycle: S.optional(Lifecycle),
    EncryptionKeyArn: S.optional(S.String),
    IsEncrypted: S.optional(S.Boolean),
    ResourceArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: S.optional(BackupJobState),
    StatusMessage: S.optional(S.String),
    PercentDone: S.optional(S.String),
    BackupSizeInBytes: S.optional(S.Number),
    IamRoleArn: S.optional(S.String),
    CreatedBy: S.optional(RecoveryPointCreator),
    ExpectedCompletionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartBy: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceType: S.optional(S.String),
    BytesTransferred: S.optional(S.Number),
    BackupOptions: S.optional(BackupOptions),
    BackupType: S.optional(S.String),
    ParentJobId: S.optional(S.String),
    IsParent: S.optional(S.Boolean),
    ResourceName: S.optional(S.String),
    InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MessageCategory: S.optional(S.String),
  }),
).annotate({ identifier: "BackupJob" }) as any as S.Schema<BackupJob>;
export type BackupJobsList = BackupJob[];
export const BackupJobsList = S.Array(BackupJob);
export interface ListBackupJobsOutput {
  BackupJobs?: BackupJob[];
  NextToken?: string;
}
export const ListBackupJobsOutput = S.suspend(() =>
  S.Struct({
    BackupJobs: S.optional(BackupJobsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBackupJobsOutput",
}) as any as S.Schema<ListBackupJobsOutput>;
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
export const BackupJobStatus = S.String;
export type AggregationPeriod =
  | "ONE_DAY"
  | "SEVEN_DAYS"
  | "FOURTEEN_DAYS"
  | (string & {});
export const AggregationPeriod = S.String;
export interface ListBackupJobSummariesInput {
  AccountId?: string;
  State?: BackupJobStatus;
  ResourceType?: string;
  MessageCategory?: string;
  AggregationPeriod?: AggregationPeriod;
  MaxResults?: number;
  NextToken?: string;
}
export const ListBackupJobSummariesInput = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String).pipe(T.HttpQuery("AccountId")),
    State: S.optional(BackupJobStatus).pipe(T.HttpQuery("State")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("ResourceType")),
    MessageCategory: S.optional(S.String).pipe(T.HttpQuery("MessageCategory")),
    AggregationPeriod: S.optional(AggregationPeriod).pipe(
      T.HttpQuery("AggregationPeriod"),
    ),
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
).annotate({
  identifier: "ListBackupJobSummariesInput",
}) as any as S.Schema<ListBackupJobSummariesInput>;
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
export const BackupJobSummary = S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    AccountId: S.optional(S.String),
    State: S.optional(BackupJobStatus),
    ResourceType: S.optional(S.String),
    MessageCategory: S.optional(S.String),
    Count: S.optional(S.Number),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "BackupJobSummary",
}) as any as S.Schema<BackupJobSummary>;
export type BackupJobSummaryList = BackupJobSummary[];
export const BackupJobSummaryList = S.Array(BackupJobSummary);
export interface ListBackupJobSummariesOutput {
  BackupJobSummaries?: BackupJobSummary[];
  AggregationPeriod?: string;
  NextToken?: string;
}
export const ListBackupJobSummariesOutput = S.suspend(() =>
  S.Struct({
    BackupJobSummaries: S.optional(BackupJobSummaryList),
    AggregationPeriod: S.optional(S.String),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBackupJobSummariesOutput",
}) as any as S.Schema<ListBackupJobSummariesOutput>;
export interface ListBackupPlansInput {
  NextToken?: string;
  MaxResults?: number;
  IncludeDeleted?: boolean;
}
export const ListBackupPlansInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    IncludeDeleted: S.optional(S.Boolean).pipe(T.HttpQuery("includeDeleted")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/backup/plans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBackupPlansInput",
}) as any as S.Schema<ListBackupPlansInput>;
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
export const BackupPlansListMember = S.suspend(() =>
  S.Struct({
    BackupPlanArn: S.optional(S.String),
    BackupPlanId: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VersionId: S.optional(S.String),
    BackupPlanName: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    LastExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AdvancedBackupSettings: S.optional(AdvancedBackupSettings),
  }),
).annotate({
  identifier: "BackupPlansListMember",
}) as any as S.Schema<BackupPlansListMember>;
export type BackupPlansList = BackupPlansListMember[];
export const BackupPlansList = S.Array(BackupPlansListMember);
export interface ListBackupPlansOutput {
  NextToken?: string;
  BackupPlansList?: BackupPlansListMember[];
}
export const ListBackupPlansOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    BackupPlansList: S.optional(BackupPlansList),
  }),
).annotate({
  identifier: "ListBackupPlansOutput",
}) as any as S.Schema<ListBackupPlansOutput>;
export interface ListBackupPlanTemplatesInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListBackupPlanTemplatesInput = S.suspend(() =>
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
).annotate({
  identifier: "ListBackupPlanTemplatesInput",
}) as any as S.Schema<ListBackupPlanTemplatesInput>;
export interface BackupPlanTemplatesListMember {
  BackupPlanTemplateId?: string;
  BackupPlanTemplateName?: string;
}
export const BackupPlanTemplatesListMember = S.suspend(() =>
  S.Struct({
    BackupPlanTemplateId: S.optional(S.String),
    BackupPlanTemplateName: S.optional(S.String),
  }),
).annotate({
  identifier: "BackupPlanTemplatesListMember",
}) as any as S.Schema<BackupPlanTemplatesListMember>;
export type BackupPlanTemplatesList = BackupPlanTemplatesListMember[];
export const BackupPlanTemplatesList = S.Array(BackupPlanTemplatesListMember);
export interface ListBackupPlanTemplatesOutput {
  NextToken?: string;
  BackupPlanTemplatesList?: BackupPlanTemplatesListMember[];
}
export const ListBackupPlanTemplatesOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    BackupPlanTemplatesList: S.optional(BackupPlanTemplatesList),
  }),
).annotate({
  identifier: "ListBackupPlanTemplatesOutput",
}) as any as S.Schema<ListBackupPlanTemplatesOutput>;
export interface ListBackupPlanVersionsInput {
  BackupPlanId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListBackupPlanVersionsInput = S.suspend(() =>
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
).annotate({
  identifier: "ListBackupPlanVersionsInput",
}) as any as S.Schema<ListBackupPlanVersionsInput>;
export type BackupPlanVersionsList = BackupPlansListMember[];
export const BackupPlanVersionsList = S.Array(BackupPlansListMember);
export interface ListBackupPlanVersionsOutput {
  NextToken?: string;
  BackupPlanVersionsList?: BackupPlansListMember[];
}
export const ListBackupPlanVersionsOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    BackupPlanVersionsList: S.optional(BackupPlanVersionsList),
  }),
).annotate({
  identifier: "ListBackupPlanVersionsOutput",
}) as any as S.Schema<ListBackupPlanVersionsOutput>;
export interface ListBackupSelectionsInput {
  BackupPlanId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListBackupSelectionsInput = S.suspend(() =>
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
).annotate({
  identifier: "ListBackupSelectionsInput",
}) as any as S.Schema<ListBackupSelectionsInput>;
export interface BackupSelectionsListMember {
  SelectionId?: string;
  SelectionName?: string;
  BackupPlanId?: string;
  CreationDate?: Date;
  CreatorRequestId?: string;
  IamRoleArn?: string;
}
export const BackupSelectionsListMember = S.suspend(() =>
  S.Struct({
    SelectionId: S.optional(S.String),
    SelectionName: S.optional(S.String),
    BackupPlanId: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatorRequestId: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "BackupSelectionsListMember",
}) as any as S.Schema<BackupSelectionsListMember>;
export type BackupSelectionsList = BackupSelectionsListMember[];
export const BackupSelectionsList = S.Array(BackupSelectionsListMember);
export interface ListBackupSelectionsOutput {
  NextToken?: string;
  BackupSelectionsList?: BackupSelectionsListMember[];
}
export const ListBackupSelectionsOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    BackupSelectionsList: S.optional(BackupSelectionsList),
  }),
).annotate({
  identifier: "ListBackupSelectionsOutput",
}) as any as S.Schema<ListBackupSelectionsOutput>;
export interface ListBackupVaultsInput {
  ByVaultType?: VaultType;
  ByShared?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export const ListBackupVaultsInput = S.suspend(() =>
  S.Struct({
    ByVaultType: S.optional(VaultType).pipe(T.HttpQuery("vaultType")),
    ByShared: S.optional(S.Boolean).pipe(T.HttpQuery("shared")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/backup-vaults" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBackupVaultsInput",
}) as any as S.Schema<ListBackupVaultsInput>;
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
export const BackupVaultListMember = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    VaultType: S.optional(VaultType),
    VaultState: S.optional(VaultState),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EncryptionKeyArn: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    NumberOfRecoveryPoints: S.optional(S.Number),
    Locked: S.optional(S.Boolean),
    MinRetentionDays: S.optional(S.Number),
    MaxRetentionDays: S.optional(S.Number),
    LockDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EncryptionKeyType: S.optional(EncryptionKeyType),
  }),
).annotate({
  identifier: "BackupVaultListMember",
}) as any as S.Schema<BackupVaultListMember>;
export type BackupVaultList = BackupVaultListMember[];
export const BackupVaultList = S.Array(BackupVaultListMember);
export interface ListBackupVaultsOutput {
  BackupVaultList?: BackupVaultListMember[];
  NextToken?: string;
}
export const ListBackupVaultsOutput = S.suspend(() =>
  S.Struct({
    BackupVaultList: S.optional(BackupVaultList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBackupVaultsOutput",
}) as any as S.Schema<ListBackupVaultsOutput>;
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
export const ListCopyJobsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ByResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
    ByState: S.optional(CopyJobState).pipe(T.HttpQuery("state")),
    ByCreatedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdBefore")),
    ByCreatedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAfter")),
    ByResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
    ByDestinationVaultArn: S.optional(S.String).pipe(
      T.HttpQuery("destinationVaultArn"),
    ),
    ByAccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
    ByCompleteBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("completeBefore")),
    ByCompleteAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("completeAfter")),
    ByParentJobId: S.optional(S.String).pipe(T.HttpQuery("parentJobId")),
    ByMessageCategory: S.optional(S.String).pipe(
      T.HttpQuery("messageCategory"),
    ),
    BySourceRecoveryPointArn: S.optional(S.String).pipe(
      T.HttpQuery("sourceRecoveryPointArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/copy-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCopyJobsInput",
}) as any as S.Schema<ListCopyJobsInput>;
export type CopyJobsList = CopyJob[];
export const CopyJobsList = S.Array(CopyJob);
export interface ListCopyJobsOutput {
  CopyJobs?: CopyJob[];
  NextToken?: string;
}
export const ListCopyJobsOutput = S.suspend(() =>
  S.Struct({
    CopyJobs: S.optional(CopyJobsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCopyJobsOutput",
}) as any as S.Schema<ListCopyJobsOutput>;
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
export const CopyJobStatus = S.String;
export interface ListCopyJobSummariesInput {
  AccountId?: string;
  State?: CopyJobStatus;
  ResourceType?: string;
  MessageCategory?: string;
  AggregationPeriod?: AggregationPeriod;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCopyJobSummariesInput = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String).pipe(T.HttpQuery("AccountId")),
    State: S.optional(CopyJobStatus).pipe(T.HttpQuery("State")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("ResourceType")),
    MessageCategory: S.optional(S.String).pipe(T.HttpQuery("MessageCategory")),
    AggregationPeriod: S.optional(AggregationPeriod).pipe(
      T.HttpQuery("AggregationPeriod"),
    ),
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
).annotate({
  identifier: "ListCopyJobSummariesInput",
}) as any as S.Schema<ListCopyJobSummariesInput>;
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
export const CopyJobSummary = S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    AccountId: S.optional(S.String),
    State: S.optional(CopyJobStatus),
    ResourceType: S.optional(S.String),
    MessageCategory: S.optional(S.String),
    Count: S.optional(S.Number),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "CopyJobSummary" }) as any as S.Schema<CopyJobSummary>;
export type CopyJobSummaryList = CopyJobSummary[];
export const CopyJobSummaryList = S.Array(CopyJobSummary);
export interface ListCopyJobSummariesOutput {
  CopyJobSummaries?: CopyJobSummary[];
  AggregationPeriod?: string;
  NextToken?: string;
}
export const ListCopyJobSummariesOutput = S.suspend(() =>
  S.Struct({
    CopyJobSummaries: S.optional(CopyJobSummaryList),
    AggregationPeriod: S.optional(S.String),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCopyJobSummariesOutput",
}) as any as S.Schema<ListCopyJobSummariesOutput>;
export interface ListFrameworksInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListFrameworksInput = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audit/frameworks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFrameworksInput",
}) as any as S.Schema<ListFrameworksInput>;
export interface Framework {
  FrameworkName?: string;
  FrameworkArn?: string;
  FrameworkDescription?: string;
  NumberOfControls?: number;
  CreationTime?: Date;
  DeploymentStatus?: string;
}
export const Framework = S.suspend(() =>
  S.Struct({
    FrameworkName: S.optional(S.String),
    FrameworkArn: S.optional(S.String),
    FrameworkDescription: S.optional(S.String),
    NumberOfControls: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeploymentStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Framework" }) as any as S.Schema<Framework>;
export type FrameworkList = Framework[];
export const FrameworkList = S.Array(Framework);
export interface ListFrameworksOutput {
  Frameworks?: Framework[];
  NextToken?: string;
}
export const ListFrameworksOutput = S.suspend(() =>
  S.Struct({
    Frameworks: S.optional(FrameworkList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFrameworksOutput",
}) as any as S.Schema<ListFrameworksOutput>;
export interface ListIndexedRecoveryPointsInput {
  NextToken?: string;
  MaxResults?: number;
  SourceResourceArn?: string;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
  ResourceType?: string;
  IndexStatus?: IndexStatus;
}
export const ListIndexedRecoveryPointsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    SourceResourceArn: S.optional(S.String).pipe(
      T.HttpQuery("sourceResourceArn"),
    ),
    CreatedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdBefore")),
    CreatedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAfter")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
    IndexStatus: S.optional(IndexStatus).pipe(T.HttpQuery("indexStatus")),
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
).annotate({
  identifier: "ListIndexedRecoveryPointsInput",
}) as any as S.Schema<ListIndexedRecoveryPointsInput>;
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
export const IndexedRecoveryPoint = S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.optional(S.String),
    SourceResourceArn: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
    BackupCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceType: S.optional(S.String),
    IndexCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IndexStatus: S.optional(IndexStatus),
    IndexStatusMessage: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IndexedRecoveryPoint",
}) as any as S.Schema<IndexedRecoveryPoint>;
export type IndexedRecoveryPointList = IndexedRecoveryPoint[];
export const IndexedRecoveryPointList = S.Array(IndexedRecoveryPoint);
export interface ListIndexedRecoveryPointsOutput {
  IndexedRecoveryPoints?: IndexedRecoveryPoint[];
  NextToken?: string;
}
export const ListIndexedRecoveryPointsOutput = S.suspend(() =>
  S.Struct({
    IndexedRecoveryPoints: S.optional(IndexedRecoveryPointList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIndexedRecoveryPointsOutput",
}) as any as S.Schema<ListIndexedRecoveryPointsOutput>;
export interface ListLegalHoldsInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListLegalHoldsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/legal-holds" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLegalHoldsInput",
}) as any as S.Schema<ListLegalHoldsInput>;
export interface LegalHold {
  Title?: string;
  Status?: LegalHoldStatus;
  Description?: string;
  LegalHoldId?: string;
  LegalHoldArn?: string;
  CreationDate?: Date;
  CancellationDate?: Date;
}
export const LegalHold = S.suspend(() =>
  S.Struct({
    Title: S.optional(S.String),
    Status: S.optional(LegalHoldStatus),
    Description: S.optional(S.String),
    LegalHoldId: S.optional(S.String),
    LegalHoldArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CancellationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "LegalHold" }) as any as S.Schema<LegalHold>;
export type LegalHoldsList = LegalHold[];
export const LegalHoldsList = S.Array(LegalHold);
export interface ListLegalHoldsOutput {
  NextToken?: string;
  LegalHolds?: LegalHold[];
}
export const ListLegalHoldsOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    LegalHolds: S.optional(LegalHoldsList),
  }),
).annotate({
  identifier: "ListLegalHoldsOutput",
}) as any as S.Schema<ListLegalHoldsOutput>;
export interface ListProtectedResourcesInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListProtectedResourcesInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProtectedResourcesInput",
}) as any as S.Schema<ListProtectedResourcesInput>;
export interface ProtectedResource {
  ResourceArn?: string;
  ResourceType?: string;
  LastBackupTime?: Date;
  ResourceName?: string;
  LastBackupVaultArn?: string;
  LastRecoveryPointArn?: string;
}
export const ProtectedResource = S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    LastBackupTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceName: S.optional(S.String),
    LastBackupVaultArn: S.optional(S.String),
    LastRecoveryPointArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ProtectedResource",
}) as any as S.Schema<ProtectedResource>;
export type ProtectedResourcesList = ProtectedResource[];
export const ProtectedResourcesList = S.Array(ProtectedResource);
export interface ListProtectedResourcesOutput {
  Results?: ProtectedResource[];
  NextToken?: string;
}
export const ListProtectedResourcesOutput = S.suspend(() =>
  S.Struct({
    Results: S.optional(ProtectedResourcesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProtectedResourcesOutput",
}) as any as S.Schema<ListProtectedResourcesOutput>;
export interface ListProtectedResourcesByBackupVaultInput {
  BackupVaultName: string;
  BackupVaultAccountId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListProtectedResourcesByBackupVaultInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    BackupVaultAccountId: S.optional(S.String).pipe(
      T.HttpQuery("backupVaultAccountId"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/backup-vaults/{BackupVaultName}/resources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProtectedResourcesByBackupVaultInput",
}) as any as S.Schema<ListProtectedResourcesByBackupVaultInput>;
export interface ListProtectedResourcesByBackupVaultOutput {
  Results?: ProtectedResource[];
  NextToken?: string;
}
export const ListProtectedResourcesByBackupVaultOutput = S.suspend(() =>
  S.Struct({
    Results: S.optional(ProtectedResourcesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProtectedResourcesByBackupVaultOutput",
}) as any as S.Schema<ListProtectedResourcesByBackupVaultOutput>;
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
export const ListRecoveryPointsByBackupVaultInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    BackupVaultAccountId: S.optional(S.String).pipe(
      T.HttpQuery("backupVaultAccountId"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ByResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
    ByResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
    ByBackupPlanId: S.optional(S.String).pipe(T.HttpQuery("backupPlanId")),
    ByCreatedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdBefore")),
    ByCreatedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAfter")),
    ByParentRecoveryPointArn: S.optional(S.String).pipe(
      T.HttpQuery("parentRecoveryPointArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/backup-vaults/{BackupVaultName}/recovery-points",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecoveryPointsByBackupVaultInput",
}) as any as S.Schema<ListRecoveryPointsByBackupVaultInput>;
export interface AggregatedScanResult {
  FailedScan?: boolean;
  Findings?: ScanFinding[];
  LastComputed?: Date;
}
export const AggregatedScanResult = S.suspend(() =>
  S.Struct({
    FailedScan: S.optional(S.Boolean),
    Findings: S.optional(ScanFindings),
    LastComputed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AggregatedScanResult",
}) as any as S.Schema<AggregatedScanResult>;
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
export const RecoveryPointByBackupVault = S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    SourceBackupVaultArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    CreatedBy: S.optional(RecoveryPointCreator),
    IamRoleArn: S.optional(S.String),
    Status: S.optional(RecoveryPointStatus),
    StatusMessage: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    BackupSizeInBytes: S.optional(S.Number),
    CalculatedLifecycle: S.optional(CalculatedLifecycle),
    Lifecycle: S.optional(Lifecycle),
    EncryptionKeyArn: S.optional(S.String),
    IsEncrypted: S.optional(S.Boolean),
    LastRestoreTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ParentRecoveryPointArn: S.optional(S.String),
    CompositeMemberIdentifier: S.optional(S.String),
    IsParent: S.optional(S.Boolean),
    ResourceName: S.optional(S.String),
    VaultType: S.optional(VaultType),
    IndexStatus: S.optional(IndexStatus),
    IndexStatusMessage: S.optional(S.String),
    EncryptionKeyType: S.optional(EncryptionKeyType),
    AggregatedScanResult: S.optional(AggregatedScanResult),
  }),
).annotate({
  identifier: "RecoveryPointByBackupVault",
}) as any as S.Schema<RecoveryPointByBackupVault>;
export type RecoveryPointByBackupVaultList = RecoveryPointByBackupVault[];
export const RecoveryPointByBackupVaultList = S.Array(
  RecoveryPointByBackupVault,
);
export interface ListRecoveryPointsByBackupVaultOutput {
  NextToken?: string;
  RecoveryPoints?: RecoveryPointByBackupVault[];
}
export const ListRecoveryPointsByBackupVaultOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RecoveryPoints: S.optional(RecoveryPointByBackupVaultList),
  }),
).annotate({
  identifier: "ListRecoveryPointsByBackupVaultOutput",
}) as any as S.Schema<ListRecoveryPointsByBackupVaultOutput>;
export interface ListRecoveryPointsByLegalHoldInput {
  LegalHoldId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListRecoveryPointsByLegalHoldInput = S.suspend(() =>
  S.Struct({
    LegalHoldId: S.String.pipe(T.HttpLabel("LegalHoldId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/legal-holds/{LegalHoldId}/recovery-points",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecoveryPointsByLegalHoldInput",
}) as any as S.Schema<ListRecoveryPointsByLegalHoldInput>;
export interface RecoveryPointMember {
  RecoveryPointArn?: string;
  ResourceArn?: string;
  ResourceType?: string;
  BackupVaultName?: string;
}
export const RecoveryPointMember = S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
  }),
).annotate({
  identifier: "RecoveryPointMember",
}) as any as S.Schema<RecoveryPointMember>;
export type RecoveryPointsList = RecoveryPointMember[];
export const RecoveryPointsList = S.Array(RecoveryPointMember);
export interface ListRecoveryPointsByLegalHoldOutput {
  RecoveryPoints?: RecoveryPointMember[];
  NextToken?: string;
}
export const ListRecoveryPointsByLegalHoldOutput = S.suspend(() =>
  S.Struct({
    RecoveryPoints: S.optional(RecoveryPointsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecoveryPointsByLegalHoldOutput",
}) as any as S.Schema<ListRecoveryPointsByLegalHoldOutput>;
export interface ListRecoveryPointsByResourceInput {
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
  ManagedByAWSBackupOnly?: boolean;
}
export const ListRecoveryPointsByResourceInput = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ManagedByAWSBackupOnly: S.optional(S.Boolean).pipe(
      T.HttpQuery("managedByAWSBackupOnly"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/resources/{ResourceArn}/recovery-points",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecoveryPointsByResourceInput",
}) as any as S.Schema<ListRecoveryPointsByResourceInput>;
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
export const RecoveryPointByResource = S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(RecoveryPointStatus),
    StatusMessage: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    BackupSizeBytes: S.optional(S.Number),
    BackupVaultName: S.optional(S.String),
    IsParent: S.optional(S.Boolean),
    ParentRecoveryPointArn: S.optional(S.String),
    ResourceName: S.optional(S.String),
    VaultType: S.optional(VaultType),
    IndexStatus: S.optional(IndexStatus),
    IndexStatusMessage: S.optional(S.String),
    EncryptionKeyType: S.optional(EncryptionKeyType),
    AggregatedScanResult: S.optional(AggregatedScanResult),
  }),
).annotate({
  identifier: "RecoveryPointByResource",
}) as any as S.Schema<RecoveryPointByResource>;
export type RecoveryPointByResourceList = RecoveryPointByResource[];
export const RecoveryPointByResourceList = S.Array(RecoveryPointByResource);
export interface ListRecoveryPointsByResourceOutput {
  NextToken?: string;
  RecoveryPoints?: RecoveryPointByResource[];
}
export const ListRecoveryPointsByResourceOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RecoveryPoints: S.optional(RecoveryPointByResourceList),
  }),
).annotate({
  identifier: "ListRecoveryPointsByResourceOutput",
}) as any as S.Schema<ListRecoveryPointsByResourceOutput>;
export interface ListReportJobsInput {
  ByReportPlanName?: string;
  ByCreationBefore?: Date;
  ByCreationAfter?: Date;
  ByStatus?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListReportJobsInput = S.suspend(() =>
  S.Struct({
    ByReportPlanName: S.optional(S.String).pipe(T.HttpQuery("ReportPlanName")),
    ByCreationBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("CreationBefore")),
    ByCreationAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("CreationAfter")),
    ByStatus: S.optional(S.String).pipe(T.HttpQuery("Status")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audit/report-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReportJobsInput",
}) as any as S.Schema<ListReportJobsInput>;
export type ReportJobList = ReportJob[];
export const ReportJobList = S.Array(ReportJob);
export interface ListReportJobsOutput {
  ReportJobs?: ReportJob[];
  NextToken?: string;
}
export const ListReportJobsOutput = S.suspend(() =>
  S.Struct({
    ReportJobs: S.optional(ReportJobList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReportJobsOutput",
}) as any as S.Schema<ListReportJobsOutput>;
export interface ListReportPlansInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListReportPlansInput = S.suspend(() =>
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
).annotate({
  identifier: "ListReportPlansInput",
}) as any as S.Schema<ListReportPlansInput>;
export type ReportPlanList = ReportPlan[];
export const ReportPlanList = S.Array(ReportPlan);
export interface ListReportPlansOutput {
  ReportPlans?: ReportPlan[];
  NextToken?: string;
}
export const ListReportPlansOutput = S.suspend(() =>
  S.Struct({
    ReportPlans: S.optional(ReportPlanList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReportPlansOutput",
}) as any as S.Schema<ListReportPlansOutput>;
export interface ListRestoreAccessBackupVaultsInput {
  BackupVaultName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListRestoreAccessBackupVaultsInput = S.suspend(() =>
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
).annotate({
  identifier: "ListRestoreAccessBackupVaultsInput",
}) as any as S.Schema<ListRestoreAccessBackupVaultsInput>;
export type MpaRevokeSessionStatus = "PENDING" | "FAILED" | (string & {});
export const MpaRevokeSessionStatus = S.String;
export interface LatestRevokeRequest {
  MpaSessionArn?: string;
  Status?: MpaRevokeSessionStatus;
  StatusMessage?: string;
  InitiationDate?: Date;
  ExpiryDate?: Date;
}
export const LatestRevokeRequest = S.suspend(() =>
  S.Struct({
    MpaSessionArn: S.optional(S.String),
    Status: S.optional(MpaRevokeSessionStatus),
    StatusMessage: S.optional(S.String),
    InitiationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExpiryDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LatestRevokeRequest",
}) as any as S.Schema<LatestRevokeRequest>;
export interface RestoreAccessBackupVaultListMember {
  RestoreAccessBackupVaultArn?: string;
  CreationDate?: Date;
  ApprovalDate?: Date;
  VaultState?: VaultState;
  LatestRevokeRequest?: LatestRevokeRequest;
}
export const RestoreAccessBackupVaultListMember = S.suspend(() =>
  S.Struct({
    RestoreAccessBackupVaultArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ApprovalDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VaultState: S.optional(VaultState),
    LatestRevokeRequest: S.optional(LatestRevokeRequest),
  }),
).annotate({
  identifier: "RestoreAccessBackupVaultListMember",
}) as any as S.Schema<RestoreAccessBackupVaultListMember>;
export type RestoreAccessBackupVaultList = RestoreAccessBackupVaultListMember[];
export const RestoreAccessBackupVaultList = S.Array(
  RestoreAccessBackupVaultListMember,
);
export interface ListRestoreAccessBackupVaultsOutput {
  NextToken?: string;
  RestoreAccessBackupVaults?: RestoreAccessBackupVaultListMember[];
}
export const ListRestoreAccessBackupVaultsOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RestoreAccessBackupVaults: S.optional(RestoreAccessBackupVaultList),
  }),
).annotate({
  identifier: "ListRestoreAccessBackupVaultsOutput",
}) as any as S.Schema<ListRestoreAccessBackupVaultsOutput>;
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
export const ListRestoreJobsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ByAccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
    ByResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
    ByCreatedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdBefore")),
    ByCreatedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAfter")),
    ByStatus: S.optional(RestoreJobStatus).pipe(T.HttpQuery("status")),
    ByCompleteBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("completeBefore")),
    ByCompleteAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("completeAfter")),
    ByRestoreTestingPlanArn: S.optional(S.String).pipe(
      T.HttpQuery("restoreTestingPlanArn"),
    ),
    ByParentJobId: S.optional(S.String).pipe(T.HttpQuery("parentJobId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restore-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRestoreJobsInput",
}) as any as S.Schema<ListRestoreJobsInput>;
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
export const RestoreJobsListMember = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    RestoreJobId: S.optional(S.String),
    RecoveryPointArn: S.optional(S.String),
    SourceResourceArn: S.optional(S.String),
    BackupVaultArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(RestoreJobStatus),
    StatusMessage: S.optional(S.String),
    PercentDone: S.optional(S.String),
    BackupSizeInBytes: S.optional(S.Number),
    IamRoleArn: S.optional(S.String),
    ExpectedCompletionTimeMinutes: S.optional(S.Number),
    CreatedResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    RecoveryPointCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IsParent: S.optional(S.Boolean),
    ParentJobId: S.optional(S.String),
    CreatedBy: S.optional(RestoreJobCreator),
    ValidationStatus: S.optional(RestoreValidationStatus),
    ValidationStatusMessage: S.optional(S.String),
    DeletionStatus: S.optional(RestoreDeletionStatus),
    DeletionStatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "RestoreJobsListMember",
}) as any as S.Schema<RestoreJobsListMember>;
export type RestoreJobsList = RestoreJobsListMember[];
export const RestoreJobsList = S.Array(RestoreJobsListMember);
export interface ListRestoreJobsOutput {
  RestoreJobs?: RestoreJobsListMember[];
  NextToken?: string;
}
export const ListRestoreJobsOutput = S.suspend(() =>
  S.Struct({
    RestoreJobs: S.optional(RestoreJobsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRestoreJobsOutput",
}) as any as S.Schema<ListRestoreJobsOutput>;
export interface ListRestoreJobsByProtectedResourceInput {
  ResourceArn: string;
  ByStatus?: RestoreJobStatus;
  ByRecoveryPointCreationDateAfter?: Date;
  ByRecoveryPointCreationDateBefore?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export const ListRestoreJobsByProtectedResourceInput = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    ByStatus: S.optional(RestoreJobStatus).pipe(T.HttpQuery("status")),
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
).annotate({
  identifier: "ListRestoreJobsByProtectedResourceInput",
}) as any as S.Schema<ListRestoreJobsByProtectedResourceInput>;
export interface ListRestoreJobsByProtectedResourceOutput {
  RestoreJobs?: RestoreJobsListMember[];
  NextToken?: string;
}
export const ListRestoreJobsByProtectedResourceOutput = S.suspend(() =>
  S.Struct({
    RestoreJobs: S.optional(RestoreJobsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRestoreJobsByProtectedResourceOutput",
}) as any as S.Schema<ListRestoreJobsByProtectedResourceOutput>;
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
export const RestoreJobState = S.String;
export interface ListRestoreJobSummariesInput {
  AccountId?: string;
  State?: RestoreJobState;
  ResourceType?: string;
  AggregationPeriod?: AggregationPeriod;
  MaxResults?: number;
  NextToken?: string;
}
export const ListRestoreJobSummariesInput = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String).pipe(T.HttpQuery("AccountId")),
    State: S.optional(RestoreJobState).pipe(T.HttpQuery("State")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("ResourceType")),
    AggregationPeriod: S.optional(AggregationPeriod).pipe(
      T.HttpQuery("AggregationPeriod"),
    ),
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
).annotate({
  identifier: "ListRestoreJobSummariesInput",
}) as any as S.Schema<ListRestoreJobSummariesInput>;
export interface RestoreJobSummary {
  Region?: string;
  AccountId?: string;
  State?: RestoreJobState;
  ResourceType?: string;
  Count?: number;
  StartTime?: Date;
  EndTime?: Date;
}
export const RestoreJobSummary = S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    AccountId: S.optional(S.String),
    State: S.optional(RestoreJobState),
    ResourceType: S.optional(S.String),
    Count: S.optional(S.Number),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "RestoreJobSummary",
}) as any as S.Schema<RestoreJobSummary>;
export type RestoreJobSummaryList = RestoreJobSummary[];
export const RestoreJobSummaryList = S.Array(RestoreJobSummary);
export interface ListRestoreJobSummariesOutput {
  RestoreJobSummaries?: RestoreJobSummary[];
  AggregationPeriod?: string;
  NextToken?: string;
}
export const ListRestoreJobSummariesOutput = S.suspend(() =>
  S.Struct({
    RestoreJobSummaries: S.optional(RestoreJobSummaryList),
    AggregationPeriod: S.optional(S.String),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRestoreJobSummariesOutput",
}) as any as S.Schema<ListRestoreJobSummariesOutput>;
export interface ListRestoreTestingPlansInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListRestoreTestingPlansInput = S.suspend(() =>
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
).annotate({
  identifier: "ListRestoreTestingPlansInput",
}) as any as S.Schema<ListRestoreTestingPlansInput>;
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
export const RestoreTestingPlanForList = S.suspend(() =>
  S.Struct({
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastExecutionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RestoreTestingPlanArn: S.String,
    RestoreTestingPlanName: S.String,
    ScheduleExpression: S.String,
    ScheduleExpressionTimezone: S.optional(S.String),
    StartWindowHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingPlanForList",
}) as any as S.Schema<RestoreTestingPlanForList>;
export type RestoreTestingPlans = RestoreTestingPlanForList[];
export const RestoreTestingPlans = S.Array(RestoreTestingPlanForList);
export interface ListRestoreTestingPlansOutput {
  NextToken?: string;
  RestoreTestingPlans: RestoreTestingPlanForList[];
}
export const ListRestoreTestingPlansOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RestoreTestingPlans: RestoreTestingPlans,
  }),
).annotate({
  identifier: "ListRestoreTestingPlansOutput",
}) as any as S.Schema<ListRestoreTestingPlansOutput>;
export interface ListRestoreTestingSelectionsInput {
  MaxResults?: number;
  NextToken?: string;
  RestoreTestingPlanName: string;
}
export const ListRestoreTestingSelectionsInput = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    RestoreTestingPlanName: S.String.pipe(
      T.HttpLabel("RestoreTestingPlanName"),
    ),
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
).annotate({
  identifier: "ListRestoreTestingSelectionsInput",
}) as any as S.Schema<ListRestoreTestingSelectionsInput>;
export interface RestoreTestingSelectionForList {
  CreationTime: Date;
  IamRoleArn: string;
  ProtectedResourceType: string;
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
  ValidationWindowHours?: number;
}
export const RestoreTestingSelectionForList = S.suspend(() =>
  S.Struct({
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    IamRoleArn: S.String,
    ProtectedResourceType: S.String,
    RestoreTestingPlanName: S.String,
    RestoreTestingSelectionName: S.String,
    ValidationWindowHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingSelectionForList",
}) as any as S.Schema<RestoreTestingSelectionForList>;
export type RestoreTestingSelections = RestoreTestingSelectionForList[];
export const RestoreTestingSelections = S.Array(RestoreTestingSelectionForList);
export interface ListRestoreTestingSelectionsOutput {
  NextToken?: string;
  RestoreTestingSelections: RestoreTestingSelectionForList[];
}
export const ListRestoreTestingSelectionsOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RestoreTestingSelections: RestoreTestingSelections,
  }),
).annotate({
  identifier: "ListRestoreTestingSelectionsOutput",
}) as any as S.Schema<ListRestoreTestingSelectionsOutput>;
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
export const ListScanJobsInput = S.suspend(() =>
  S.Struct({
    ByAccountId: S.optional(S.String).pipe(T.HttpQuery("ByAccountId")),
    ByBackupVaultName: S.optional(S.String).pipe(
      T.HttpQuery("ByBackupVaultName"),
    ),
    ByCompleteAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("ByCompleteAfter")),
    ByCompleteBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("ByCompleteBefore")),
    ByMalwareScanner: S.optional(MalwareScanner).pipe(
      T.HttpQuery("ByMalwareScanner"),
    ),
    ByRecoveryPointArn: S.optional(S.String).pipe(
      T.HttpQuery("ByRecoveryPointArn"),
    ),
    ByResourceArn: S.optional(S.String).pipe(T.HttpQuery("ByResourceArn")),
    ByResourceType: S.optional(ScanResourceType).pipe(
      T.HttpQuery("ByResourceType"),
    ),
    ByScanResultStatus: S.optional(ScanResultStatus).pipe(
      T.HttpQuery("ByScanResultStatus"),
    ),
    ByState: S.optional(ScanState).pipe(T.HttpQuery("ByState")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/scan/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListScanJobsInput",
}) as any as S.Schema<ListScanJobsInput>;
export interface ScanJob {
  AccountId: string;
  BackupVaultArn: string;
  BackupVaultName: string;
  CompletionDate?: Date;
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
export const ScanJob = S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BackupVaultArn: S.String,
    BackupVaultName: S.String,
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: ScanJobCreator,
    CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    IamRoleArn: S.String,
    MalwareScanner: MalwareScanner,
    RecoveryPointArn: S.String,
    ResourceArn: S.String,
    ResourceName: S.String,
    ResourceType: ScanResourceType,
    ScanBaseRecoveryPointArn: S.optional(S.String),
    ScanId: S.optional(S.String),
    ScanJobId: S.String,
    ScanMode: ScanMode,
    ScanResult: S.optional(ScanResultInfo),
    ScannerRoleArn: S.String,
    State: S.optional(ScanState),
    StatusMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ScanJob" }) as any as S.Schema<ScanJob>;
export type ScanJobs = ScanJob[];
export const ScanJobs = S.Array(ScanJob);
export interface ListScanJobsOutput {
  NextToken?: string;
  ScanJobs: ScanJob[];
}
export const ListScanJobsOutput = S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), ScanJobs: ScanJobs }),
).annotate({
  identifier: "ListScanJobsOutput",
}) as any as S.Schema<ListScanJobsOutput>;
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
export const ScanJobStatus = S.String;
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
export const ListScanJobSummariesInput = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String).pipe(T.HttpQuery("AccountId")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("ResourceType")),
    MalwareScanner: S.optional(MalwareScanner).pipe(
      T.HttpQuery("MalwareScanner"),
    ),
    ScanResultStatus: S.optional(ScanResultStatus).pipe(
      T.HttpQuery("ScanResultStatus"),
    ),
    State: S.optional(ScanJobStatus).pipe(T.HttpQuery("State")),
    AggregationPeriod: S.optional(AggregationPeriod).pipe(
      T.HttpQuery("AggregationPeriod"),
    ),
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
).annotate({
  identifier: "ListScanJobSummariesInput",
}) as any as S.Schema<ListScanJobSummariesInput>;
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
export const ScanJobSummary = S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    AccountId: S.optional(S.String),
    State: S.optional(ScanJobStatus),
    ResourceType: S.optional(S.String),
    Count: S.optional(S.Number),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MalwareScanner: S.optional(MalwareScanner),
    ScanResultStatus: S.optional(ScanResultStatus),
  }),
).annotate({ identifier: "ScanJobSummary" }) as any as S.Schema<ScanJobSummary>;
export type ScanJobSummaryList = ScanJobSummary[];
export const ScanJobSummaryList = S.Array(ScanJobSummary);
export interface ListScanJobSummariesOutput {
  ScanJobSummaries?: ScanJobSummary[];
  AggregationPeriod?: string;
  NextToken?: string;
}
export const ListScanJobSummariesOutput = S.suspend(() =>
  S.Struct({
    ScanJobSummaries: S.optional(ScanJobSummaryList),
    AggregationPeriod: S.optional(S.String),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListScanJobSummariesOutput",
}) as any as S.Schema<ListScanJobSummariesOutput>;
export interface ListTagsInput {
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTagsInput = S.suspend(() =>
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
).annotate({ identifier: "ListTagsInput" }) as any as S.Schema<ListTagsInput>;
export interface ListTagsOutput {
  NextToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsOutput = S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Tags: S.optional(Tags) }),
).annotate({ identifier: "ListTagsOutput" }) as any as S.Schema<ListTagsOutput>;
export interface ListTieringConfigurationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListTieringConfigurationsInput = S.suspend(() =>
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
).annotate({
  identifier: "ListTieringConfigurationsInput",
}) as any as S.Schema<ListTieringConfigurationsInput>;
export interface TieringConfigurationsListMember {
  TieringConfigurationArn?: string;
  TieringConfigurationName?: string;
  BackupVaultName?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export const TieringConfigurationsListMember = S.suspend(() =>
  S.Struct({
    TieringConfigurationArn: S.optional(S.String),
    TieringConfigurationName: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "TieringConfigurationsListMember",
}) as any as S.Schema<TieringConfigurationsListMember>;
export type TieringConfigurationsList = TieringConfigurationsListMember[];
export const TieringConfigurationsList = S.Array(
  TieringConfigurationsListMember,
);
export interface ListTieringConfigurationsOutput {
  TieringConfigurations?: TieringConfigurationsListMember[];
  NextToken?: string;
}
export const ListTieringConfigurationsOutput = S.suspend(() =>
  S.Struct({
    TieringConfigurations: S.optional(TieringConfigurationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTieringConfigurationsOutput",
}) as any as S.Schema<ListTieringConfigurationsOutput>;
export interface PutBackupVaultAccessPolicyInput {
  BackupVaultName: string;
  Policy?: string;
}
export const PutBackupVaultAccessPolicyInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    Policy: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/backup-vaults/{BackupVaultName}/access-policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutBackupVaultAccessPolicyInput",
}) as any as S.Schema<PutBackupVaultAccessPolicyInput>;
export interface PutBackupVaultAccessPolicyResponse {}
export const PutBackupVaultAccessPolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutBackupVaultAccessPolicyResponse",
}) as any as S.Schema<PutBackupVaultAccessPolicyResponse>;
export interface PutBackupVaultLockConfigurationInput {
  BackupVaultName: string;
  MinRetentionDays?: number;
  MaxRetentionDays?: number;
  ChangeableForDays?: number;
}
export const PutBackupVaultLockConfigurationInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    MinRetentionDays: S.optional(S.Number),
    MaxRetentionDays: S.optional(S.Number),
    ChangeableForDays: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/backup-vaults/{BackupVaultName}/vault-lock",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutBackupVaultLockConfigurationInput",
}) as any as S.Schema<PutBackupVaultLockConfigurationInput>;
export interface PutBackupVaultLockConfigurationResponse {}
export const PutBackupVaultLockConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutBackupVaultLockConfigurationResponse",
}) as any as S.Schema<PutBackupVaultLockConfigurationResponse>;
export interface PutBackupVaultNotificationsInput {
  BackupVaultName: string;
  SNSTopicArn: string;
  BackupVaultEvents: BackupVaultEvent[];
}
export const PutBackupVaultNotificationsInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    SNSTopicArn: S.String,
    BackupVaultEvents: BackupVaultEvents,
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
).annotate({
  identifier: "PutBackupVaultNotificationsInput",
}) as any as S.Schema<PutBackupVaultNotificationsInput>;
export interface PutBackupVaultNotificationsResponse {}
export const PutBackupVaultNotificationsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutBackupVaultNotificationsResponse",
}) as any as S.Schema<PutBackupVaultNotificationsResponse>;
export interface PutRestoreValidationResultInput {
  RestoreJobId: string;
  ValidationStatus: RestoreValidationStatus;
  ValidationStatusMessage?: string;
}
export const PutRestoreValidationResultInput = S.suspend(() =>
  S.Struct({
    RestoreJobId: S.String.pipe(T.HttpLabel("RestoreJobId")),
    ValidationStatus: RestoreValidationStatus,
    ValidationStatusMessage: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/restore-jobs/{RestoreJobId}/validations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRestoreValidationResultInput",
}) as any as S.Schema<PutRestoreValidationResultInput>;
export interface PutRestoreValidationResultResponse {}
export const PutRestoreValidationResultResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutRestoreValidationResultResponse",
}) as any as S.Schema<PutRestoreValidationResultResponse>;
export interface RevokeRestoreAccessBackupVaultInput {
  BackupVaultName: string;
  RestoreAccessBackupVaultArn: string;
  RequesterComment?: string | redacted.Redacted<string>;
}
export const RevokeRestoreAccessBackupVaultInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    RestoreAccessBackupVaultArn: S.String.pipe(
      T.HttpLabel("RestoreAccessBackupVaultArn"),
    ),
    RequesterComment: S.optional(SensitiveString).pipe(
      T.HttpQuery("requesterComment"),
    ),
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
).annotate({
  identifier: "RevokeRestoreAccessBackupVaultInput",
}) as any as S.Schema<RevokeRestoreAccessBackupVaultInput>;
export interface RevokeRestoreAccessBackupVaultResponse {}
export const RevokeRestoreAccessBackupVaultResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RevokeRestoreAccessBackupVaultResponse",
}) as any as S.Schema<RevokeRestoreAccessBackupVaultResponse>;
export type Index = "ENABLED" | "DISABLED" | (string & {});
export const Index = S.String;
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
export const StartBackupJobInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String,
    LogicallyAirGappedBackupVaultArn: S.optional(S.String),
    ResourceArn: S.String,
    IamRoleArn: S.String,
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    StartWindowMinutes: S.optional(S.Number),
    CompleteWindowMinutes: S.optional(S.Number),
    Lifecycle: S.optional(Lifecycle),
    RecoveryPointTags: S.optional(Tags),
    BackupOptions: S.optional(BackupOptions),
    Index: S.optional(Index),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/backup-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBackupJobInput",
}) as any as S.Schema<StartBackupJobInput>;
export interface StartBackupJobOutput {
  BackupJobId?: string;
  RecoveryPointArn?: string;
  CreationDate?: Date;
  IsParent?: boolean;
}
export const StartBackupJobOutput = S.suspend(() =>
  S.Struct({
    BackupJobId: S.optional(S.String),
    RecoveryPointArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IsParent: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "StartBackupJobOutput",
}) as any as S.Schema<StartBackupJobOutput>;
export interface StartCopyJobInput {
  RecoveryPointArn: string;
  SourceBackupVaultName: string;
  DestinationBackupVaultArn: string;
  IamRoleArn: string;
  IdempotencyToken?: string;
  Lifecycle?: Lifecycle;
}
export const StartCopyJobInput = S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.String,
    SourceBackupVaultName: S.String,
    DestinationBackupVaultArn: S.String,
    IamRoleArn: S.String,
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Lifecycle: S.optional(Lifecycle),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/copy-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCopyJobInput",
}) as any as S.Schema<StartCopyJobInput>;
export interface StartCopyJobOutput {
  CopyJobId?: string;
  CreationDate?: Date;
  IsParent?: boolean;
}
export const StartCopyJobOutput = S.suspend(() =>
  S.Struct({
    CopyJobId: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IsParent: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "StartCopyJobOutput",
}) as any as S.Schema<StartCopyJobOutput>;
export interface StartReportJobInput {
  ReportPlanName: string;
  IdempotencyToken?: string;
}
export const StartReportJobInput = S.suspend(() =>
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
).annotate({
  identifier: "StartReportJobInput",
}) as any as S.Schema<StartReportJobInput>;
export interface StartReportJobOutput {
  ReportJobId?: string;
}
export const StartReportJobOutput = S.suspend(() =>
  S.Struct({ ReportJobId: S.optional(S.String) }),
).annotate({
  identifier: "StartReportJobOutput",
}) as any as S.Schema<StartReportJobOutput>;
export interface StartRestoreJobInput {
  RecoveryPointArn: string;
  Metadata: { [key: string]: string | undefined };
  IamRoleArn?: string;
  IdempotencyToken?: string;
  ResourceType?: string;
  CopySourceTagsToRestoredResource?: boolean;
}
export const StartRestoreJobInput = S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.String,
    Metadata: Metadata,
    IamRoleArn: S.optional(S.String),
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ResourceType: S.optional(S.String),
    CopySourceTagsToRestoredResource: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/restore-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRestoreJobInput",
}) as any as S.Schema<StartRestoreJobInput>;
export interface StartRestoreJobOutput {
  RestoreJobId?: string;
}
export const StartRestoreJobOutput = S.suspend(() =>
  S.Struct({ RestoreJobId: S.optional(S.String) }),
).annotate({
  identifier: "StartRestoreJobOutput",
}) as any as S.Schema<StartRestoreJobOutput>;
export interface StartScanJobInput {
  BackupVaultName: string;
  IamRoleArn: string;
  IdempotencyToken?: string;
  MalwareScanner: MalwareScanner;
  RecoveryPointArn: string;
  ScanBaseRecoveryPointArn?: string;
  ScanMode: ScanMode;
  ScannerRoleArn: string;
}
export const StartScanJobInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String,
    IamRoleArn: S.String,
    IdempotencyToken: S.optional(S.String),
    MalwareScanner: MalwareScanner,
    RecoveryPointArn: S.String,
    ScanBaseRecoveryPointArn: S.optional(S.String),
    ScanMode: ScanMode,
    ScannerRoleArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/scan/job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartScanJobInput",
}) as any as S.Schema<StartScanJobInput>;
export interface StartScanJobOutput {
  CreationDate: Date;
  ScanJobId: string;
}
export const StartScanJobOutput = S.suspend(() =>
  S.Struct({
    CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ScanJobId: S.String,
  }),
).annotate({
  identifier: "StartScanJobOutput",
}) as any as S.Schema<StartScanJobOutput>;
export interface StopBackupJobInput {
  BackupJobId: string;
}
export const StopBackupJobInput = S.suspend(() =>
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
).annotate({
  identifier: "StopBackupJobInput",
}) as any as S.Schema<StopBackupJobInput>;
export interface StopBackupJobResponse {}
export const StopBackupJobResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "StopBackupJobResponse",
}) as any as S.Schema<StopBackupJobResponse>;
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceInput = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: Tags,
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
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeyList: string[];
}
export const UntagResourceInput = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeyList: TagKeyList,
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
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateBackupPlanInput {
  BackupPlanId: string;
  BackupPlan: BackupPlanInput;
}
export const UpdateBackupPlanInput = S.suspend(() =>
  S.Struct({
    BackupPlanId: S.String.pipe(T.HttpLabel("BackupPlanId")),
    BackupPlan: BackupPlanInput,
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
).annotate({
  identifier: "UpdateBackupPlanInput",
}) as any as S.Schema<UpdateBackupPlanInput>;
export interface UpdateBackupPlanOutput {
  BackupPlanId?: string;
  BackupPlanArn?: string;
  CreationDate?: Date;
  VersionId?: string;
  AdvancedBackupSettings?: AdvancedBackupSetting[];
  ScanSettings?: ScanSetting[];
}
export const UpdateBackupPlanOutput = S.suspend(() =>
  S.Struct({
    BackupPlanId: S.optional(S.String),
    BackupPlanArn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VersionId: S.optional(S.String),
    AdvancedBackupSettings: S.optional(AdvancedBackupSettings),
    ScanSettings: S.optional(ScanSettings),
  }),
).annotate({
  identifier: "UpdateBackupPlanOutput",
}) as any as S.Schema<UpdateBackupPlanOutput>;
export interface UpdateFrameworkInput {
  FrameworkName: string;
  FrameworkDescription?: string;
  FrameworkControls?: FrameworkControl[];
  IdempotencyToken?: string;
}
export const UpdateFrameworkInput = S.suspend(() =>
  S.Struct({
    FrameworkName: S.String.pipe(T.HttpLabel("FrameworkName")),
    FrameworkDescription: S.optional(S.String),
    FrameworkControls: S.optional(FrameworkControls),
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
).annotate({
  identifier: "UpdateFrameworkInput",
}) as any as S.Schema<UpdateFrameworkInput>;
export interface UpdateFrameworkOutput {
  FrameworkName?: string;
  FrameworkArn?: string;
  CreationTime?: Date;
}
export const UpdateFrameworkOutput = S.suspend(() =>
  S.Struct({
    FrameworkName: S.optional(S.String),
    FrameworkArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UpdateFrameworkOutput",
}) as any as S.Schema<UpdateFrameworkOutput>;
export interface UpdateGlobalSettingsInput {
  GlobalSettings?: { [key: string]: string | undefined };
}
export const UpdateGlobalSettingsInput = S.suspend(() =>
  S.Struct({ GlobalSettings: S.optional(GlobalSettings) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/global-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlobalSettingsInput",
}) as any as S.Schema<UpdateGlobalSettingsInput>;
export interface UpdateGlobalSettingsResponse {}
export const UpdateGlobalSettingsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateGlobalSettingsResponse",
}) as any as S.Schema<UpdateGlobalSettingsResponse>;
export interface UpdateRecoveryPointIndexSettingsInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
  IamRoleArn?: string;
  Index: Index;
}
export const UpdateRecoveryPointIndexSettingsInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
    IamRoleArn: S.optional(S.String),
    Index: Index,
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
).annotate({
  identifier: "UpdateRecoveryPointIndexSettingsInput",
}) as any as S.Schema<UpdateRecoveryPointIndexSettingsInput>;
export interface UpdateRecoveryPointIndexSettingsOutput {
  BackupVaultName?: string;
  RecoveryPointArn?: string;
  IndexStatus?: IndexStatus;
  Index?: Index;
}
export const UpdateRecoveryPointIndexSettingsOutput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    RecoveryPointArn: S.optional(S.String),
    IndexStatus: S.optional(IndexStatus),
    Index: S.optional(Index),
  }),
).annotate({
  identifier: "UpdateRecoveryPointIndexSettingsOutput",
}) as any as S.Schema<UpdateRecoveryPointIndexSettingsOutput>;
export interface UpdateRecoveryPointLifecycleInput {
  BackupVaultName: string;
  RecoveryPointArn: string;
  Lifecycle?: Lifecycle;
}
export const UpdateRecoveryPointLifecycleInput = S.suspend(() =>
  S.Struct({
    BackupVaultName: S.String.pipe(T.HttpLabel("BackupVaultName")),
    RecoveryPointArn: S.String.pipe(T.HttpLabel("RecoveryPointArn")),
    Lifecycle: S.optional(Lifecycle),
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
).annotate({
  identifier: "UpdateRecoveryPointLifecycleInput",
}) as any as S.Schema<UpdateRecoveryPointLifecycleInput>;
export interface UpdateRecoveryPointLifecycleOutput {
  BackupVaultArn?: string;
  RecoveryPointArn?: string;
  Lifecycle?: Lifecycle;
  CalculatedLifecycle?: CalculatedLifecycle;
}
export const UpdateRecoveryPointLifecycleOutput = S.suspend(() =>
  S.Struct({
    BackupVaultArn: S.optional(S.String),
    RecoveryPointArn: S.optional(S.String),
    Lifecycle: S.optional(Lifecycle),
    CalculatedLifecycle: S.optional(CalculatedLifecycle),
  }),
).annotate({
  identifier: "UpdateRecoveryPointLifecycleOutput",
}) as any as S.Schema<UpdateRecoveryPointLifecycleOutput>;
export interface UpdateRegionSettingsInput {
  ResourceTypeOptInPreference?: { [key: string]: boolean | undefined };
  ResourceTypeManagementPreference?: { [key: string]: boolean | undefined };
}
export const UpdateRegionSettingsInput = S.suspend(() =>
  S.Struct({
    ResourceTypeOptInPreference: S.optional(ResourceTypeOptInPreference),
    ResourceTypeManagementPreference: S.optional(
      ResourceTypeManagementPreference,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/account-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRegionSettingsInput",
}) as any as S.Schema<UpdateRegionSettingsInput>;
export interface UpdateRegionSettingsResponse {}
export const UpdateRegionSettingsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRegionSettingsResponse",
}) as any as S.Schema<UpdateRegionSettingsResponse>;
export interface UpdateReportPlanInput {
  ReportPlanName: string;
  ReportPlanDescription?: string;
  ReportDeliveryChannel?: ReportDeliveryChannel;
  ReportSetting?: ReportSetting;
  IdempotencyToken?: string;
}
export const UpdateReportPlanInput = S.suspend(() =>
  S.Struct({
    ReportPlanName: S.String.pipe(T.HttpLabel("ReportPlanName")),
    ReportPlanDescription: S.optional(S.String),
    ReportDeliveryChannel: S.optional(ReportDeliveryChannel),
    ReportSetting: S.optional(ReportSetting),
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
).annotate({
  identifier: "UpdateReportPlanInput",
}) as any as S.Schema<UpdateReportPlanInput>;
export interface UpdateReportPlanOutput {
  ReportPlanName?: string;
  ReportPlanArn?: string;
  CreationTime?: Date;
}
export const UpdateReportPlanOutput = S.suspend(() =>
  S.Struct({
    ReportPlanName: S.optional(S.String),
    ReportPlanArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UpdateReportPlanOutput",
}) as any as S.Schema<UpdateReportPlanOutput>;
export interface RestoreTestingPlanForUpdate {
  RecoveryPointSelection?: RestoreTestingRecoveryPointSelection;
  ScheduleExpression?: string;
  ScheduleExpressionTimezone?: string;
  StartWindowHours?: number;
}
export const RestoreTestingPlanForUpdate = S.suspend(() =>
  S.Struct({
    RecoveryPointSelection: S.optional(RestoreTestingRecoveryPointSelection),
    ScheduleExpression: S.optional(S.String),
    ScheduleExpressionTimezone: S.optional(S.String),
    StartWindowHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingPlanForUpdate",
}) as any as S.Schema<RestoreTestingPlanForUpdate>;
export interface UpdateRestoreTestingPlanInput {
  RestoreTestingPlan: RestoreTestingPlanForUpdate;
  RestoreTestingPlanName: string;
}
export const UpdateRestoreTestingPlanInput = S.suspend(() =>
  S.Struct({
    RestoreTestingPlan: RestoreTestingPlanForUpdate,
    RestoreTestingPlanName: S.String.pipe(
      T.HttpLabel("RestoreTestingPlanName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/restore-testing/plans/{RestoreTestingPlanName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRestoreTestingPlanInput",
}) as any as S.Schema<UpdateRestoreTestingPlanInput>;
export interface UpdateRestoreTestingPlanOutput {
  CreationTime: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
  UpdateTime: Date;
}
export const UpdateRestoreTestingPlanOutput = S.suspend(() =>
  S.Struct({
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RestoreTestingPlanArn: S.String,
    RestoreTestingPlanName: S.String,
    UpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateRestoreTestingPlanOutput",
}) as any as S.Schema<UpdateRestoreTestingPlanOutput>;
export interface RestoreTestingSelectionForUpdate {
  IamRoleArn?: string;
  ProtectedResourceArns?: string[];
  ProtectedResourceConditions?: ProtectedResourceConditions;
  RestoreMetadataOverrides?: { [key: string]: string | undefined };
  ValidationWindowHours?: number;
}
export const RestoreTestingSelectionForUpdate = S.suspend(() =>
  S.Struct({
    IamRoleArn: S.optional(S.String),
    ProtectedResourceArns: S.optional(StringList),
    ProtectedResourceConditions: S.optional(ProtectedResourceConditions),
    RestoreMetadataOverrides: S.optional(SensitiveStringMap),
    ValidationWindowHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "RestoreTestingSelectionForUpdate",
}) as any as S.Schema<RestoreTestingSelectionForUpdate>;
export interface UpdateRestoreTestingSelectionInput {
  RestoreTestingPlanName: string;
  RestoreTestingSelection: RestoreTestingSelectionForUpdate;
  RestoreTestingSelectionName: string;
}
export const UpdateRestoreTestingSelectionInput = S.suspend(() =>
  S.Struct({
    RestoreTestingPlanName: S.String.pipe(
      T.HttpLabel("RestoreTestingPlanName"),
    ),
    RestoreTestingSelection: RestoreTestingSelectionForUpdate,
    RestoreTestingSelectionName: S.String.pipe(
      T.HttpLabel("RestoreTestingSelectionName"),
    ),
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
).annotate({
  identifier: "UpdateRestoreTestingSelectionInput",
}) as any as S.Schema<UpdateRestoreTestingSelectionInput>;
export interface UpdateRestoreTestingSelectionOutput {
  CreationTime: Date;
  RestoreTestingPlanArn: string;
  RestoreTestingPlanName: string;
  RestoreTestingSelectionName: string;
  UpdateTime: Date;
}
export const UpdateRestoreTestingSelectionOutput = S.suspend(() =>
  S.Struct({
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RestoreTestingPlanArn: S.String,
    RestoreTestingPlanName: S.String,
    RestoreTestingSelectionName: S.String,
    UpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateRestoreTestingSelectionOutput",
}) as any as S.Schema<UpdateRestoreTestingSelectionOutput>;
export interface TieringConfigurationInputForUpdate {
  ResourceSelection: ResourceSelection[];
  BackupVaultName: string;
}
export const TieringConfigurationInputForUpdate = S.suspend(() =>
  S.Struct({
    ResourceSelection: ResourceSelections,
    BackupVaultName: S.String,
  }),
).annotate({
  identifier: "TieringConfigurationInputForUpdate",
}) as any as S.Schema<TieringConfigurationInputForUpdate>;
export interface UpdateTieringConfigurationInput {
  TieringConfigurationName: string;
  TieringConfiguration: TieringConfigurationInputForUpdate;
}
export const UpdateTieringConfigurationInput = S.suspend(() =>
  S.Struct({
    TieringConfigurationName: S.String.pipe(
      T.HttpLabel("TieringConfigurationName"),
    ),
    TieringConfiguration: TieringConfigurationInputForUpdate,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/tiering-configurations/{TieringConfigurationName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTieringConfigurationInput",
}) as any as S.Schema<UpdateTieringConfigurationInput>;
export interface UpdateTieringConfigurationOutput {
  TieringConfigurationArn?: string;
  TieringConfigurationName?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export const UpdateTieringConfigurationOutput = S.suspend(() =>
  S.Struct({
    TieringConfigurationArn: S.optional(S.String),
    TieringConfigurationName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateTieringConfigurationOutput",
}) as any as S.Schema<UpdateTieringConfigurationOutput>;

//# Errors
export class InvalidParameterValueException extends S.TaggedErrorClass<InvalidParameterValueException>()(
  "InvalidParameterValueException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
) {}
export class InvalidRequestException extends S.TaggedErrorClass<InvalidRequestException>()(
  "InvalidRequestException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
) {}
export class MissingParameterValueException extends S.TaggedErrorClass<MissingParameterValueException>()(
  "MissingParameterValueException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
).pipe(C.withServerError) {}
export class InvalidResourceStateException extends S.TaggedErrorClass<InvalidResourceStateException>()(
  "InvalidResourceStateException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
) {}
export class AlreadyExistsException extends S.TaggedErrorClass<AlreadyExistsException>()(
  "AlreadyExistsException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    Arn: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
).pipe(C.withAlreadyExistsError) {}
export class LimitExceededException extends S.TaggedErrorClass<LimitExceededException>()(
  "LimitExceededException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
  T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
).pipe(C.withConflictError) {}
export class DependencyFailureException extends S.TaggedErrorClass<DependencyFailureException>()(
  "DependencyFailureException",
  {
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Type: S.optional(S.String),
    Context: S.optional(S.String),
  },
) {}

//# Operations
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateBackupVaultMpaApprovalTeamInput,
  output: AssociateBackupVaultMpaApprovalTeamResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelLegalHoldInput,
  output: CancelLegalHoldOutput,
  errors: [
    InvalidParameterValueException,
    InvalidResourceStateException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBackupPlanInput,
  output: CreateBackupPlanOutput,
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBackupSelectionInput,
  output: CreateBackupSelectionOutput,
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBackupVaultInput,
  output: CreateBackupVaultOutput,
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFrameworkInput,
  output: CreateFrameworkOutput,
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLegalHoldInput,
  output: CreateLegalHoldOutput,
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLogicallyAirGappedBackupVaultInput,
  output: CreateLogicallyAirGappedBackupVaultOutput,
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateReportPlanInput,
  output: CreateReportPlanOutput,
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRestoreAccessBackupVaultInput,
  output: CreateRestoreAccessBackupVaultOutput,
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRestoreTestingPlanInput,
  output: CreateRestoreTestingPlanOutput,
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRestoreTestingSelectionInput,
  output: CreateRestoreTestingSelectionOutput,
  errors: [
    AlreadyExistsException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTieringConfigurationInput,
  output: CreateTieringConfigurationOutput,
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBackupPlanInput,
  output: DeleteBackupPlanOutput,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBackupSelectionInput,
  output: DeleteBackupSelectionResponse,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBackupVaultInput,
  output: DeleteBackupVaultResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBackupVaultAccessPolicyInput,
  output: DeleteBackupVaultAccessPolicyResponse,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBackupVaultLockConfigurationInput,
  output: DeleteBackupVaultLockConfigurationResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBackupVaultNotificationsInput,
  output: DeleteBackupVaultNotificationsResponse,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFrameworkInput,
  output: DeleteFrameworkResponse,
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRecoveryPointInput,
  output: DeleteRecoveryPointResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    InvalidResourceStateException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteReportPlanInput,
  output: DeleteReportPlanResponse,
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRestoreTestingPlanInput,
  output: DeleteRestoreTestingPlanResponse,
  errors: [InvalidRequestException, ServiceUnavailableException],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRestoreTestingSelectionInput,
  output: DeleteRestoreTestingSelectionResponse,
  errors: [ResourceNotFoundException, ServiceUnavailableException],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTieringConfigurationInput,
  output: DeleteTieringConfigurationOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeBackupJobInput,
  output: DescribeBackupJobOutput,
  errors: [
    DependencyFailureException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeBackupVaultInput,
  output: DescribeBackupVaultOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeCopyJobInput,
  output: DescribeCopyJobOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFrameworkInput,
  output: DescribeFrameworkOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
}));
export type DescribeGlobalSettingsError =
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes whether the Amazon Web Services account is opted in to cross-account backup.
 * Returns an error if the account is not a member of an Organizations organization.
 * Example: `describe-global-settings --region us-west-2`
 */
export const describeGlobalSettings: API.OperationMethod<
  DescribeGlobalSettingsInput,
  DescribeGlobalSettingsOutput,
  DescribeGlobalSettingsError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeGlobalSettingsInput,
  output: DescribeGlobalSettingsOutput,
  errors: [InvalidRequestException, ServiceUnavailableException],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeProtectedResourceInput,
  output: DescribeProtectedResourceOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeRecoveryPointInput,
  output: DescribeRecoveryPointOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
}));
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeRegionSettingsInput,
  output: DescribeRegionSettingsOutput,
  errors: [ServiceUnavailableException],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeReportJobInput,
  output: DescribeReportJobOutput,
  errors: [
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeReportPlanInput,
  output: DescribeReportPlanOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeRestoreJobInput,
  output: DescribeRestoreJobOutput,
  errors: [
    DependencyFailureException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeScanJobInput,
  output: DescribeScanJobOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateBackupVaultMpaApprovalTeamInput,
  output: DisassociateBackupVaultMpaApprovalTeamResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateRecoveryPointInput,
  output: DisassociateRecoveryPointResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    InvalidResourceStateException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateRecoveryPointFromParentInput,
  output: DisassociateRecoveryPointFromParentResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportBackupPlanTemplateInput,
  output: ExportBackupPlanTemplateOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBackupPlanInput,
  output: GetBackupPlanOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBackupPlanFromJSONInput,
  output: GetBackupPlanFromJSONOutput,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBackupPlanFromTemplateInput,
  output: GetBackupPlanFromTemplateOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBackupSelectionInput,
  output: GetBackupSelectionOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBackupVaultAccessPolicyInput,
  output: GetBackupVaultAccessPolicyOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBackupVaultNotificationsInput,
  output: GetBackupVaultNotificationsOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLegalHoldInput,
  output: GetLegalHoldOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRecoveryPointIndexDetailsInput,
  output: GetRecoveryPointIndexDetailsOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRecoveryPointRestoreMetadataInput,
  output: GetRecoveryPointRestoreMetadataOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRestoreJobMetadataInput,
  output: GetRestoreJobMetadataOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRestoreTestingInferredMetadataInput,
  output: GetRestoreTestingInferredMetadataOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRestoreTestingPlanInput,
  output: GetRestoreTestingPlanOutput,
  errors: [ResourceNotFoundException, ServiceUnavailableException],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRestoreTestingSelectionInput,
  output: GetRestoreTestingSelectionOutput,
  errors: [ResourceNotFoundException, ServiceUnavailableException],
}));
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSupportedResourceTypesRequest,
  output: GetSupportedResourceTypesOutput,
  errors: [ServiceUnavailableException],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetTieringConfigurationInput,
  output: GetTieringConfigurationOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
}));
export type ListBackupJobsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of existing backup jobs for an authenticated account for the last 30
 * days. For a longer period of time, consider using these monitoring tools.
 */
export const listBackupJobs: API.OperationMethod<
  ListBackupJobsInput,
  ListBackupJobsOutput,
  ListBackupJobsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListBackupJobsInput,
  ) => stream.Stream<
    ListBackupJobsOutput,
    ListBackupJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListBackupJobsInput,
  ) => stream.Stream<
    BackupJob,
    ListBackupJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBackupJobsInput,
  output: ListBackupJobsOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupJobs",
    pageSize: "MaxResults",
  } as const,
}));
export type ListBackupJobSummariesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This is a request for a summary of backup jobs created
 * or running within the most recent 30 days. You can
 * include parameters AccountID, State, ResourceType, MessageCategory,
 * AggregationPeriod, MaxResults, or NextToken to filter
 * results.
 *
 * This request returns a summary that contains
 * Region, Account, State, ResourceType, MessageCategory,
 * StartTime, EndTime, and Count of included jobs.
 */
export const listBackupJobSummaries: API.OperationMethod<
  ListBackupJobSummariesInput,
  ListBackupJobSummariesOutput,
  ListBackupJobSummariesError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListBackupJobSummariesInput,
  ) => stream.Stream<
    ListBackupJobSummariesOutput,
    ListBackupJobSummariesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListBackupJobSummariesInput,
  ) => stream.Stream<
    unknown,
    ListBackupJobSummariesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBackupJobSummariesInput,
  output: ListBackupJobSummariesOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListBackupPlansError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the active backup plans for the account.
 */
export const listBackupPlans: API.OperationMethod<
  ListBackupPlansInput,
  ListBackupPlansOutput,
  ListBackupPlansError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListBackupPlansInput,
  ) => stream.Stream<
    ListBackupPlansOutput,
    ListBackupPlansError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListBackupPlansInput,
  ) => stream.Stream<
    BackupPlansListMember,
    ListBackupPlansError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBackupPlansInput,
  output: ListBackupPlansOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupPlansList",
    pageSize: "MaxResults",
  } as const,
}));
export type ListBackupPlanTemplatesError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the backup plan templates.
 */
export const listBackupPlanTemplates: API.OperationMethod<
  ListBackupPlanTemplatesInput,
  ListBackupPlanTemplatesOutput,
  ListBackupPlanTemplatesError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListBackupPlanTemplatesInput,
  ) => stream.Stream<
    ListBackupPlanTemplatesOutput,
    ListBackupPlanTemplatesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListBackupPlanTemplatesInput,
  ) => stream.Stream<
    BackupPlanTemplatesListMember,
    ListBackupPlanTemplatesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBackupPlanTemplatesInput,
  output: ListBackupPlanTemplatesOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupPlanTemplatesList",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listBackupPlanVersions: API.OperationMethod<
  ListBackupPlanVersionsInput,
  ListBackupPlanVersionsOutput,
  ListBackupPlanVersionsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListBackupPlanVersionsInput,
  ) => stream.Stream<
    ListBackupPlanVersionsOutput,
    ListBackupPlanVersionsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListBackupPlanVersionsInput,
  ) => stream.Stream<
    BackupPlansListMember,
    ListBackupPlanVersionsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBackupPlanVersionsInput,
  output: ListBackupPlanVersionsOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupPlanVersionsList",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listBackupSelections: API.OperationMethod<
  ListBackupSelectionsInput,
  ListBackupSelectionsOutput,
  ListBackupSelectionsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListBackupSelectionsInput,
  ) => stream.Stream<
    ListBackupSelectionsOutput,
    ListBackupSelectionsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListBackupSelectionsInput,
  ) => stream.Stream<
    BackupSelectionsListMember,
    ListBackupSelectionsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBackupSelectionsInput,
  output: ListBackupSelectionsOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupSelectionsList",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listBackupVaults: API.OperationMethod<
  ListBackupVaultsInput,
  ListBackupVaultsOutput,
  ListBackupVaultsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListBackupVaultsInput,
  ) => stream.Stream<
    ListBackupVaultsOutput,
    ListBackupVaultsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListBackupVaultsInput,
  ) => stream.Stream<
    BackupVaultListMember,
    ListBackupVaultsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBackupVaultsInput,
  output: ListBackupVaultsOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackupVaultList",
    pageSize: "MaxResults",
  } as const,
}));
export type ListCopyJobsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns metadata about your copy jobs.
 */
export const listCopyJobs: API.OperationMethod<
  ListCopyJobsInput,
  ListCopyJobsOutput,
  ListCopyJobsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListCopyJobsInput,
  ) => stream.Stream<
    ListCopyJobsOutput,
    ListCopyJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListCopyJobsInput,
  ) => stream.Stream<
    CopyJob,
    ListCopyJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCopyJobsInput,
  output: ListCopyJobsOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CopyJobs",
    pageSize: "MaxResults",
  } as const,
}));
export type ListCopyJobSummariesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request obtains a list of copy jobs created
 * or running within the the most recent 30 days. You can
 * include parameters AccountID, State, ResourceType, MessageCategory,
 * AggregationPeriod, MaxResults, or NextToken to filter
 * results.
 *
 * This request returns a summary that contains
 * Region, Account, State, RestourceType, MessageCategory,
 * StartTime, EndTime, and Count of included jobs.
 */
export const listCopyJobSummaries: API.OperationMethod<
  ListCopyJobSummariesInput,
  ListCopyJobSummariesOutput,
  ListCopyJobSummariesError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListCopyJobSummariesInput,
  ) => stream.Stream<
    ListCopyJobSummariesOutput,
    ListCopyJobSummariesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListCopyJobSummariesInput,
  ) => stream.Stream<
    unknown,
    ListCopyJobSummariesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCopyJobSummariesInput,
  output: ListCopyJobSummariesOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListFrameworksError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of all frameworks for an Amazon Web Services account and Amazon Web Services Region.
 */
export const listFrameworks: API.OperationMethod<
  ListFrameworksInput,
  ListFrameworksOutput,
  ListFrameworksError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListFrameworksInput,
  ) => stream.Stream<
    ListFrameworksOutput,
    ListFrameworksError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListFrameworksInput,
  ) => stream.Stream<
    unknown,
    ListFrameworksError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFrameworksInput,
  output: ListFrameworksOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listIndexedRecoveryPoints: API.OperationMethod<
  ListIndexedRecoveryPointsInput,
  ListIndexedRecoveryPointsOutput,
  ListIndexedRecoveryPointsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListIndexedRecoveryPointsInput,
  ) => stream.Stream<
    ListIndexedRecoveryPointsOutput,
    ListIndexedRecoveryPointsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListIndexedRecoveryPointsInput,
  ) => stream.Stream<
    IndexedRecoveryPoint,
    ListIndexedRecoveryPointsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListIndexedRecoveryPointsInput,
  output: ListIndexedRecoveryPointsOutput,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IndexedRecoveryPoints",
    pageSize: "MaxResults",
  } as const,
}));
export type ListLegalHoldsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This action returns metadata about active and previous legal holds.
 */
export const listLegalHolds: API.OperationMethod<
  ListLegalHoldsInput,
  ListLegalHoldsOutput,
  ListLegalHoldsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListLegalHoldsInput,
  ) => stream.Stream<
    ListLegalHoldsOutput,
    ListLegalHoldsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListLegalHoldsInput,
  ) => stream.Stream<
    LegalHold,
    ListLegalHoldsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLegalHoldsInput,
  output: ListLegalHoldsOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LegalHolds",
    pageSize: "MaxResults",
  } as const,
}));
export type ListProtectedResourcesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns an array of resources successfully backed up by Backup, including
 * the time the resource was saved, an Amazon Resource Name (ARN) of the resource, and a
 * resource type.
 */
export const listProtectedResources: API.OperationMethod<
  ListProtectedResourcesInput,
  ListProtectedResourcesOutput,
  ListProtectedResourcesError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListProtectedResourcesInput,
  ) => stream.Stream<
    ListProtectedResourcesOutput,
    ListProtectedResourcesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListProtectedResourcesInput,
  ) => stream.Stream<
    ProtectedResource,
    ListProtectedResourcesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProtectedResourcesInput,
  output: ListProtectedResourcesOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
}));
export type ListProtectedResourcesByBackupVaultError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request lists the protected resources corresponding to each backup vault.
 */
export const listProtectedResourcesByBackupVault: API.OperationMethod<
  ListProtectedResourcesByBackupVaultInput,
  ListProtectedResourcesByBackupVaultOutput,
  ListProtectedResourcesByBackupVaultError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListProtectedResourcesByBackupVaultInput,
  ) => stream.Stream<
    ListProtectedResourcesByBackupVaultOutput,
    ListProtectedResourcesByBackupVaultError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListProtectedResourcesByBackupVaultInput,
  ) => stream.Stream<
    ProtectedResource,
    ListProtectedResourcesByBackupVaultError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProtectedResourcesByBackupVaultInput,
  output: ListProtectedResourcesByBackupVaultOutput,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
}));
export type ListRecoveryPointsByBackupVaultError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns detailed information about the recovery points stored in a backup vault.
 */
export const listRecoveryPointsByBackupVault: API.OperationMethod<
  ListRecoveryPointsByBackupVaultInput,
  ListRecoveryPointsByBackupVaultOutput,
  ListRecoveryPointsByBackupVaultError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRecoveryPointsByBackupVaultInput,
  ) => stream.Stream<
    ListRecoveryPointsByBackupVaultOutput,
    ListRecoveryPointsByBackupVaultError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRecoveryPointsByBackupVaultInput,
  ) => stream.Stream<
    RecoveryPointByBackupVault,
    ListRecoveryPointsByBackupVaultError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRecoveryPointsByBackupVaultInput,
  output: ListRecoveryPointsByBackupVaultOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryPoints",
    pageSize: "MaxResults",
  } as const,
}));
export type ListRecoveryPointsByLegalHoldError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This action returns recovery point ARNs (Amazon Resource Names) of the
 * specified legal hold.
 */
export const listRecoveryPointsByLegalHold: API.OperationMethod<
  ListRecoveryPointsByLegalHoldInput,
  ListRecoveryPointsByLegalHoldOutput,
  ListRecoveryPointsByLegalHoldError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRecoveryPointsByLegalHoldInput,
  ) => stream.Stream<
    ListRecoveryPointsByLegalHoldOutput,
    ListRecoveryPointsByLegalHoldError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRecoveryPointsByLegalHoldInput,
  ) => stream.Stream<
    RecoveryPointMember,
    ListRecoveryPointsByLegalHoldError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRecoveryPointsByLegalHoldInput,
  output: ListRecoveryPointsByLegalHoldOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryPoints",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listRecoveryPointsByResource: API.OperationMethod<
  ListRecoveryPointsByResourceInput,
  ListRecoveryPointsByResourceOutput,
  ListRecoveryPointsByResourceError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRecoveryPointsByResourceInput,
  ) => stream.Stream<
    ListRecoveryPointsByResourceOutput,
    ListRecoveryPointsByResourceError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRecoveryPointsByResourceInput,
  ) => stream.Stream<
    RecoveryPointByResource,
    ListRecoveryPointsByResourceError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRecoveryPointsByResourceInput,
  output: ListRecoveryPointsByResourceOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryPoints",
    pageSize: "MaxResults",
  } as const,
}));
export type ListReportJobsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns details about your report jobs.
 */
export const listReportJobs: API.OperationMethod<
  ListReportJobsInput,
  ListReportJobsOutput,
  ListReportJobsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListReportJobsInput,
  ) => stream.Stream<
    ListReportJobsOutput,
    ListReportJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListReportJobsInput,
  ) => stream.Stream<
    unknown,
    ListReportJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReportJobsInput,
  output: ListReportJobsOutput,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListReportPlansError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of your report plans. For detailed information about a single report
 * plan, use `DescribeReportPlan`.
 */
export const listReportPlans: API.OperationMethod<
  ListReportPlansInput,
  ListReportPlansOutput,
  ListReportPlansError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListReportPlansInput,
  ) => stream.Stream<
    ListReportPlansOutput,
    ListReportPlansError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListReportPlansInput,
  ) => stream.Stream<
    unknown,
    ListReportPlansError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReportPlansInput,
  output: ListReportPlansOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListRestoreAccessBackupVaultsError =
  | InvalidParameterValueException
  | MissingParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of restore access backup vaults associated with a specified backup vault.
 */
export const listRestoreAccessBackupVaults: API.OperationMethod<
  ListRestoreAccessBackupVaultsInput,
  ListRestoreAccessBackupVaultsOutput,
  ListRestoreAccessBackupVaultsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRestoreAccessBackupVaultsInput,
  ) => stream.Stream<
    ListRestoreAccessBackupVaultsOutput,
    ListRestoreAccessBackupVaultsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRestoreAccessBackupVaultsInput,
  ) => stream.Stream<
    RestoreAccessBackupVaultListMember,
    ListRestoreAccessBackupVaultsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRestoreAccessBackupVaultsInput,
  output: ListRestoreAccessBackupVaultsOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreAccessBackupVaults",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listRestoreJobs: API.OperationMethod<
  ListRestoreJobsInput,
  ListRestoreJobsOutput,
  ListRestoreJobsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRestoreJobsInput,
  ) => stream.Stream<
    ListRestoreJobsOutput,
    ListRestoreJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRestoreJobsInput,
  ) => stream.Stream<
    RestoreJobsListMember,
    ListRestoreJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRestoreJobsInput,
  output: ListRestoreJobsOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreJobs",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listRestoreJobsByProtectedResource: API.OperationMethod<
  ListRestoreJobsByProtectedResourceInput,
  ListRestoreJobsByProtectedResourceOutput,
  ListRestoreJobsByProtectedResourceError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRestoreJobsByProtectedResourceInput,
  ) => stream.Stream<
    ListRestoreJobsByProtectedResourceOutput,
    ListRestoreJobsByProtectedResourceError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRestoreJobsByProtectedResourceInput,
  ) => stream.Stream<
    RestoreJobsListMember,
    ListRestoreJobsByProtectedResourceError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRestoreJobsByProtectedResourceInput,
  output: ListRestoreJobsByProtectedResourceOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreJobs",
    pageSize: "MaxResults",
  } as const,
}));
export type ListRestoreJobSummariesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This request obtains a summary of restore jobs created
 * or running within the the most recent 30 days. You can
 * include parameters AccountID, State, ResourceType,
 * AggregationPeriod, MaxResults, or NextToken to filter
 * results.
 *
 * This request returns a summary that contains
 * Region, Account, State, RestourceType, MessageCategory,
 * StartTime, EndTime, and Count of included jobs.
 */
export const listRestoreJobSummaries: API.OperationMethod<
  ListRestoreJobSummariesInput,
  ListRestoreJobSummariesOutput,
  ListRestoreJobSummariesError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRestoreJobSummariesInput,
  ) => stream.Stream<
    ListRestoreJobSummariesOutput,
    ListRestoreJobSummariesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRestoreJobSummariesInput,
  ) => stream.Stream<
    unknown,
    ListRestoreJobSummariesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRestoreJobSummariesInput,
  output: ListRestoreJobSummariesOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListRestoreTestingPlansError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of restore testing plans.
 */
export const listRestoreTestingPlans: API.OperationMethod<
  ListRestoreTestingPlansInput,
  ListRestoreTestingPlansOutput,
  ListRestoreTestingPlansError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRestoreTestingPlansInput,
  ) => stream.Stream<
    ListRestoreTestingPlansOutput,
    ListRestoreTestingPlansError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRestoreTestingPlansInput,
  ) => stream.Stream<
    RestoreTestingPlanForList,
    ListRestoreTestingPlansError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRestoreTestingPlansInput,
  output: ListRestoreTestingPlansOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreTestingPlans",
    pageSize: "MaxResults",
  } as const,
}));
export type ListRestoreTestingSelectionsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of restore testing selections. Can be filtered
 * by `MaxResults` and `RestoreTestingPlanName`.
 */
export const listRestoreTestingSelections: API.OperationMethod<
  ListRestoreTestingSelectionsInput,
  ListRestoreTestingSelectionsOutput,
  ListRestoreTestingSelectionsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRestoreTestingSelectionsInput,
  ) => stream.Stream<
    ListRestoreTestingSelectionsOutput,
    ListRestoreTestingSelectionsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRestoreTestingSelectionsInput,
  ) => stream.Stream<
    RestoreTestingSelectionForList,
    ListRestoreTestingSelectionsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRestoreTestingSelectionsInput,
  output: ListRestoreTestingSelectionsOutput,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RestoreTestingSelections",
    pageSize: "MaxResults",
  } as const,
}));
export type ListScanJobsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of existing scan jobs for an authenticated account for the last 30 days.
 */
export const listScanJobs: API.OperationMethod<
  ListScanJobsInput,
  ListScanJobsOutput,
  ListScanJobsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListScanJobsInput,
  ) => stream.Stream<
    ListScanJobsOutput,
    ListScanJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListScanJobsInput,
  ) => stream.Stream<
    ScanJob,
    ListScanJobsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScanJobsInput,
  output: ListScanJobsOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScanJobs",
    pageSize: "MaxResults",
  } as const,
}));
export type ListScanJobSummariesError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This is a request for a summary of scan jobs created or running within the most recent 30 days.
 */
export const listScanJobSummaries: API.OperationMethod<
  ListScanJobSummariesInput,
  ListScanJobSummariesOutput,
  ListScanJobSummariesError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListScanJobSummariesInput,
  ) => stream.Stream<
    ListScanJobSummariesOutput,
    ListScanJobSummariesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListScanJobSummariesInput,
  ) => stream.Stream<
    ScanJobSummary,
    ListScanJobSummariesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScanJobSummariesInput,
  output: ListScanJobSummariesOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScanJobSummaries",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listTags: API.OperationMethod<
  ListTagsInput,
  ListTagsOutput,
  ListTagsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListTagsInput,
  ) => stream.Stream<
    ListTagsOutput,
    ListTagsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListTagsInput,
  ) => stream.Stream<
    unknown,
    ListTagsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTagsInput,
  output: ListTagsOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListTieringConfigurationsError =
  | InvalidParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of tiering configurations.
 */
export const listTieringConfigurations: API.OperationMethod<
  ListTieringConfigurationsInput,
  ListTieringConfigurationsOutput,
  ListTieringConfigurationsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListTieringConfigurationsInput,
  ) => stream.Stream<
    ListTieringConfigurationsOutput,
    ListTieringConfigurationsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListTieringConfigurationsInput,
  ) => stream.Stream<
    TieringConfigurationsListMember,
    ListTieringConfigurationsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTieringConfigurationsInput,
  output: ListTieringConfigurationsOutput,
  errors: [InvalidParameterValueException, ServiceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TieringConfigurations",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutBackupVaultAccessPolicyInput,
  output: PutBackupVaultAccessPolicyResponse,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutBackupVaultLockConfigurationInput,
  output: PutBackupVaultLockConfigurationResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutBackupVaultNotificationsInput,
  output: PutBackupVaultNotificationsResponse,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutRestoreValidationResultInput,
  output: PutRestoreValidationResultResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RevokeRestoreAccessBackupVaultInput,
  output: RevokeRestoreAccessBackupVaultResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartBackupJobInput,
  output: StartBackupJobOutput,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartCopyJobInput,
  output: StartCopyJobOutput,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartReportJobInput,
  output: StartReportJobOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartRestoreJobInput,
  output: StartRestoreJobOutput,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartScanJobInput,
  output: StartScanJobOutput,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopBackupJobInput,
  output: StopBackupJobResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBackupPlanInput,
  output: UpdateBackupPlanOutput,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFrameworkInput,
  output: UpdateFrameworkOutput,
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
}));
export type UpdateGlobalSettingsError =
  | InvalidParameterValueException
  | InvalidRequestException
  | MissingParameterValueException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates whether the Amazon Web Services account is opted in to cross-account backup.
 * Returns an error if the account is not an Organizations management account. Use the
 * `DescribeGlobalSettings` API to determine the current settings.
 */
export const updateGlobalSettings: API.OperationMethod<
  UpdateGlobalSettingsInput,
  UpdateGlobalSettingsResponse,
  UpdateGlobalSettingsError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGlobalSettingsInput,
  output: UpdateGlobalSettingsResponse,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRecoveryPointIndexSettingsInput,
  output: UpdateRecoveryPointIndexSettingsOutput,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRecoveryPointLifecycleInput,
  output: UpdateRecoveryPointLifecycleOutput,
  errors: [
    InvalidParameterValueException,
    InvalidRequestException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRegionSettingsInput,
  output: UpdateRegionSettingsResponse,
  errors: [
    InvalidParameterValueException,
    MissingParameterValueException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateReportPlanInput,
  output: UpdateReportPlanOutput,
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRestoreTestingPlanInput,
  output: UpdateRestoreTestingPlanOutput,
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRestoreTestingSelectionInput,
  output: UpdateRestoreTestingSelectionOutput,
  errors: [
    ConflictException,
    InvalidParameterValueException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
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
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateTieringConfigurationInput,
  output: UpdateTieringConfigurationOutput,
  errors: [
    AlreadyExistsException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingParameterValueException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
}));
