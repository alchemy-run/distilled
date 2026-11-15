import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "GuardDuty",
  serviceShapeName: "GuardDutyAPIService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "guardduty" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-11-28");
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
              `https://guardduty-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://guardduty.${Region}.amazonaws.com`);
            }
            return e(`https://guardduty-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://guardduty.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://guardduty.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://guardduty.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "GuardDuty",
  service: "GuardDuty",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Type: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type DetectorId = string;
export interface AcceptAdministratorInvitationRequest {
  DetectorId: string;
  AdministratorId?: string | undefined;
  InvitationId?: string | undefined;
}
export interface AcceptAdministratorInvitationResponse {}
export interface AcceptInvitationRequest {
  DetectorId: string;
  MasterId?: string | undefined;
  InvitationId?: string | undefined;
}
export interface AcceptInvitationResponse {}
export type FindingId = string;
export type FindingIds = string[];
export interface ArchiveFindingsRequest {
  DetectorId: string;
  FindingIds?: string[] | undefined;
}
export interface ArchiveFindingsResponse {}
export type RuleId = string;
export type AssociationMode = "LIVE" | "DRY_RUN" | (string & {});
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateCustomDetectionRuleAssociationRequest {
  RuleId?: string | undefined;
  Mode?: AssociationMode | undefined;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type AssociationId = string;
export type DetectionRuleArn = string;
export type AccountId = string;
export interface AssociationDetail {
  AssociationId?: string | undefined;
  Arn?: string | undefined;
  RuleId?: string | undefined;
  AccountId?: string | undefined;
  Mode?: AssociationMode | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  ExpiresAt?: Date | undefined;
}
export interface CreateCustomDetectionRuleAssociationResponse {
  RuleAssociation: AssociationDetail & {
    AssociationId: AssociationId;
    Arn: DetectionRuleArn;
    RuleId: RuleId;
    AccountId: AccountId;
    Mode: AssociationMode;
    CreatedAt: Date;
    UpdatedAt: Date;
  };
}
export type DetectionRuleAccountIds = string[];
export interface CreateCustomDetectionRuleOrgConfigurationRequest {
  RuleId?: string | undefined;
  Mode?: AssociationMode | undefined;
  IncludeAccountIds?: string[] | undefined;
  ExcludeAccountIds?: string[] | undefined;
  ClientToken?: string | undefined;
}
export interface CreateCustomDetectionRuleOrgConfigurationResponse {}
export type FindingPublishingFrequency =
  | "FIFTEEN_MINUTES"
  | "ONE_HOUR"
  | "SIX_HOURS"
  | (string & {});
export interface S3LogsConfiguration {
  Enable?: boolean | undefined;
}
export interface KubernetesAuditLogsConfiguration {
  Enable?: boolean | undefined;
}
export interface KubernetesConfiguration {
  AuditLogs?: KubernetesAuditLogsConfiguration | undefined;
}
export interface ScanEc2InstanceWithFindings {
  EbsVolumes?: boolean | undefined;
}
export interface MalwareProtectionConfiguration {
  ScanEc2InstanceWithFindings?: ScanEc2InstanceWithFindings | undefined;
}
export interface DataSourceConfigurations {
  S3Logs?: S3LogsConfiguration | undefined;
  Kubernetes?: KubernetesConfiguration | undefined;
  MalwareProtection?: MalwareProtectionConfiguration | undefined;
}
export type DetectorFeature =
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "RUNTIME_MONITORING"
  | "AI_PROTECTION"
  | "AI_ANALYST"
  | (string & {});
export type FeatureStatus = "ENABLED" | "DISABLED" | (string & {});
export type FeatureAdditionalConfiguration =
  | "EKS_ADDON_MANAGEMENT"
  | "ECS_FARGATE_AGENT_MANAGEMENT"
  | "EC2_AGENT_MANAGEMENT"
  | "RDS_DATA_RISK"
  | (string & {});
export interface DetectorAdditionalConfiguration {
  Name?: FeatureAdditionalConfiguration | undefined;
  Status?: FeatureStatus | undefined;
}
export type DetectorAdditionalConfigurations = DetectorAdditionalConfiguration[];
export interface DetectorFeatureConfiguration {
  Name?: DetectorFeature | undefined;
  Status?: FeatureStatus | undefined;
  AdditionalConfiguration?: DetectorAdditionalConfiguration[] | undefined;
}
export type DetectorFeatureConfigurations = DetectorFeatureConfiguration[];
export interface CreateDetectorRequest {
  Enable?: boolean | undefined;
  ClientToken?: string | undefined;
  FindingPublishingFrequency?: FindingPublishingFrequency | undefined;
  DataSources?: DataSourceConfigurations | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  Features?: DetectorFeatureConfiguration[] | undefined;
}
export type DataSourceStatus = "ENABLED" | "DISABLED" | (string & {});
export interface EbsVolumesResult {
  Status?: DataSourceStatus | undefined;
  Reason?: string | undefined;
}
export interface ScanEc2InstanceWithFindingsResult {
  EbsVolumes?: EbsVolumesResult | undefined;
}
export interface MalwareProtectionConfigurationResult {
  ScanEc2InstanceWithFindings?: ScanEc2InstanceWithFindingsResult | undefined;
  ServiceRole?: string | undefined;
}
export interface UnprocessedDataSourcesResult {
  MalwareProtection?: MalwareProtectionConfigurationResult | undefined;
}
export interface CreateDetectorResponse {
  DetectorId?: string | undefined;
  UnprocessedDataSources?: UnprocessedDataSourcesResult | undefined;
}
export type FilterName = string;
export type FilterDescription = string;
export type FilterAction = "NOOP" | "ARCHIVE" | (string & {});
export type FilterRank = number;
export type Eq = string[];
export type Neq = string[];
export type Equals = string[];
export type NotEquals = string[];
export type Match = string;
export type Matches = string[];
export type NotMatch = string;
export type NotMatches = string[];
export interface Condition {
  Eq?: string[] | undefined;
  Neq?: string[] | undefined;
  Gt?: number | undefined;
  Gte?: number | undefined;
  Lt?: number | undefined;
  Lte?: number | undefined;
  Equals?: string[] | undefined;
  NotEquals?: string[] | undefined;
  GreaterThan?: number | undefined;
  GreaterThanOrEqual?: number | undefined;
  LessThan?: number | undefined;
  LessThanOrEqual?: number | undefined;
  Matches?: string[] | undefined;
  NotMatches?: string[] | undefined;
}
export type Criterion = { [key: string]: Condition | undefined };
export interface FindingCriteria {
  Criterion?: { [key: string]: Condition | undefined } | undefined;
}
export interface CreateFilterRequest {
  DetectorId: string;
  Name?: string | undefined;
  Description?: string | undefined;
  Action?: FilterAction | undefined;
  Rank?: number | undefined;
  FindingCriteria?: FindingCriteria | undefined;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateFilterResponse {
  Name: string;
}
export type TriggerPrompt = string;
export interface CreateInvestigationRequest {
  DetectorId: string;
  TriggerPrompt?: string | undefined;
  ClientToken?: string | undefined;
}
export type InvestigationId = string;
export interface CreateInvestigationResponse {
  InvestigationId: string;
}
export type Name = string;
export type IpSetFormat =
  | "TXT"
  | "STIX"
  | "OTX_CSV"
  | "ALIEN_VAULT"
  | "PROOF_POINT"
  | "FIRE_EYE"
  | (string & {});
export type Location = string;
export interface CreateIPSetRequest {
  DetectorId: string;
  Name?: string | undefined;
  Format?: IpSetFormat | undefined;
  Location?: string | undefined;
  Activate?: boolean | undefined;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface CreateIPSetResponse {
  IpSetId: string;
}
export type MalwareProtectionPlanObjectPrefixesList = string[];
export interface CreateS3BucketResource {
  BucketName?: string | undefined;
  ObjectPrefixes?: string[] | undefined;
}
export interface CreateProtectedResource {
  S3Bucket?: CreateS3BucketResource | undefined;
}
export type MalwareProtectionPlanTaggingActionStatus = "ENABLED" | "DISABLED" | (string & {});
export interface MalwareProtectionPlanTaggingAction {
  Status?: MalwareProtectionPlanTaggingActionStatus | undefined;
}
export interface MalwareProtectionPlanActions {
  Tagging?: MalwareProtectionPlanTaggingAction | undefined;
}
export interface CreateMalwareProtectionPlanRequest {
  ClientToken?: string | undefined;
  Role?: string | undefined;
  ProtectedResource?: CreateProtectedResource | undefined;
  Actions?: MalwareProtectionPlanActions | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateMalwareProtectionPlanResponse {
  MalwareProtectionPlanId?: string | undefined;
}
export type Email = string | redacted.Redacted<string>;
export interface AccountDetail {
  AccountId?: string | undefined;
  Email?: string | redacted.Redacted<string> | undefined;
}
export type AccountDetails = AccountDetail[];
export interface CreateMembersRequest {
  DetectorId: string;
  AccountDetails?: AccountDetail[] | undefined;
}
export interface UnprocessedAccount {
  AccountId?: string | undefined;
  Result?: string | undefined;
}
export type UnprocessedAccounts = UnprocessedAccount[];
export interface CreateMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export type DestinationType = "S3" | (string & {});
export interface DestinationProperties {
  DestinationArn?: string | undefined;
  KmsKeyArn?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface CreatePublishingDestinationRequest {
  DetectorId: string;
  DestinationType?: DestinationType | undefined;
  DestinationProperties?: DestinationProperties | undefined;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreatePublishingDestinationResponse {
  DestinationId: string;
}
export type FindingType = string;
export type FindingTypes = string[];
export interface CreateSampleFindingsRequest {
  DetectorId: string;
  FindingTypes?: string[] | undefined;
}
export interface CreateSampleFindingsResponse {}
export type ThreatEntitySetFormat =
  | "TXT"
  | "STIX"
  | "OTX_CSV"
  | "ALIEN_VAULT"
  | "PROOF_POINT"
  | "FIRE_EYE"
  | (string & {});
export type ExpectedBucketOwner = string;
export interface CreateThreatEntitySetRequest {
  DetectorId: string;
  Name?: string | undefined;
  Format?: ThreatEntitySetFormat | undefined;
  Location?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  Activate?: boolean | undefined;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateThreatEntitySetResponse {
  ThreatEntitySetId: string;
}
export type ThreatIntelSetFormat =
  | "TXT"
  | "STIX"
  | "OTX_CSV"
  | "ALIEN_VAULT"
  | "PROOF_POINT"
  | "FIRE_EYE"
  | (string & {});
export interface CreateThreatIntelSetRequest {
  DetectorId: string;
  Name?: string | undefined;
  Format?: ThreatIntelSetFormat | undefined;
  Location?: string | undefined;
  Activate?: boolean | undefined;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface CreateThreatIntelSetResponse {
  ThreatIntelSetId: string;
}
export type TrustedEntitySetFormat =
  | "TXT"
  | "STIX"
  | "OTX_CSV"
  | "ALIEN_VAULT"
  | "PROOF_POINT"
  | "FIRE_EYE"
  | (string & {});
export interface CreateTrustedEntitySetRequest {
  DetectorId: string;
  Name?: string | undefined;
  Format?: TrustedEntitySetFormat | undefined;
  Location?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  Activate?: boolean | undefined;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateTrustedEntitySetResponse {
  TrustedEntitySetId: string;
}
export type AccountIds = string[];
export interface DeclineInvitationsRequest {
  AccountIds?: string[] | undefined;
}
export interface DeclineInvitationsResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface DeleteCustomDetectionRuleAssociationRequest {
  RuleId: string;
  AssociationId: string;
}
export interface DeleteCustomDetectionRuleAssociationResponse {}
export interface DeleteCustomDetectionRuleOrgConfigurationRequest {
  RuleId: string;
  Mode?: AssociationMode | undefined;
}
export interface DeleteCustomDetectionRuleOrgConfigurationResponse {}
export interface DeleteDetectorRequest {
  DetectorId: string;
}
export interface DeleteDetectorResponse {}
export interface DeleteFilterRequest {
  DetectorId: string;
  FilterName: string;
}
export interface DeleteFilterResponse {}
export interface DeleteInvitationsRequest {
  AccountIds?: string[] | undefined;
}
export interface DeleteInvitationsResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface DeleteIPSetRequest {
  DetectorId: string;
  IpSetId?: string | undefined;
}
export interface DeleteIPSetResponse {}
export interface DeleteMalwareProtectionPlanRequest {
  MalwareProtectionPlanId?: string | undefined;
}
export interface DeleteMalwareProtectionPlanResponse {}
export interface DeleteMembersRequest {
  DetectorId: string;
  AccountIds?: string[] | undefined;
}
export interface DeleteMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface DeletePublishingDestinationRequest {
  DetectorId: string;
  DestinationId: string;
}
export interface DeletePublishingDestinationResponse {}
export interface DeleteThreatEntitySetRequest {
  DetectorId: string;
  ThreatEntitySetId?: string | undefined;
}
export interface DeleteThreatEntitySetResponse {}
export interface DeleteThreatIntelSetRequest {
  DetectorId: string;
  ThreatIntelSetId: string;
}
export interface DeleteThreatIntelSetResponse {}
export interface DeleteTrustedEntitySetRequest {
  DetectorId: string;
  TrustedEntitySetId: string;
}
export interface DeleteTrustedEntitySetResponse {}
export type IntegerValueWithMax = number;
export type CriterionKey =
  | "EC2_INSTANCE_ARN"
  | "SCAN_ID"
  | "ACCOUNT_ID"
  | "GUARDDUTY_FINDING_ID"
  | "SCAN_START_TIME"
  | "SCAN_STATUS"
  | "SCAN_TYPE"
  | (string & {});
export type NonEmptyString = string;
export type LongValue = number;
export interface FilterCondition {
  EqualsValue?: string | undefined;
  GreaterThan?: number | undefined;
  LessThan?: number | undefined;
}
export interface FilterCriterion {
  CriterionKey?: CriterionKey | undefined;
  FilterCondition?: FilterCondition | undefined;
}
export type FilterCriterionList = FilterCriterion[];
export interface FilterCriteria {
  FilterCriterion?: FilterCriterion[] | undefined;
}
export type OrderBy = "ASC" | "DESC" | (string & {});
export interface SortCriteria {
  AttributeName?: string | undefined;
  OrderBy?: OrderBy | undefined;
}
export interface DescribeMalwareScansRequest {
  DetectorId: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  FilterCriteria?: FilterCriteria | undefined;
  SortCriteria?: SortCriteria | undefined;
}
export type ScanStatus = "RUNNING" | "COMPLETED" | "FAILED" | "SKIPPED" | (string & {});
export type TriggerType = "BACKUP" | "GUARDDUTY" | (string & {});
export interface TriggerDetails {
  GuardDutyFindingId?: string | undefined;
  Description?: string | undefined;
  TriggerType?: TriggerType | undefined;
}
export type InstanceArn = string;
export interface ResourceDetails {
  InstanceArn?: string | undefined;
}
export type ScanResult = "CLEAN" | "INFECTED" | (string & {});
export interface ScanResultDetails {
  ScanResult?: ScanResult | undefined;
}
export type PositiveLong = number;
export interface VolumeDetail {
  VolumeArn?: string | undefined;
  VolumeType?: string | undefined;
  DeviceName?: string | undefined;
  VolumeSizeInGB?: number | undefined;
  EncryptionType?: string | undefined;
  SnapshotArn?: string | undefined;
  KmsKeyArn?: string | undefined;
}
export type VolumeDetails = VolumeDetail[];
export type ScanType = "GUARDDUTY_INITIATED" | "ON_DEMAND" | (string & {});
export interface Scan {
  DetectorId?: string | undefined;
  AdminDetectorId?: string | undefined;
  ScanId?: string | undefined;
  ScanStatus?: ScanStatus | undefined;
  FailureReason?: string | undefined;
  ScanStartTime?: Date | undefined;
  ScanEndTime?: Date | undefined;
  TriggerDetails?: TriggerDetails | undefined;
  ResourceDetails?: ResourceDetails | undefined;
  ScanResultDetails?: ScanResultDetails | undefined;
  AccountId?: string | undefined;
  TotalBytes?: number | undefined;
  FileCount?: number | undefined;
  AttachedVolumes?: VolumeDetail[] | undefined;
  ScanType?: ScanType | undefined;
}
export type Scans = Scan[];
export interface DescribeMalwareScansResponse {
  Scans: Scan[];
  NextToken?: string | undefined;
}
export type MaxResults = number;
export interface DescribeOrganizationConfigurationRequest {
  DetectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface OrganizationS3LogsConfigurationResult {
  AutoEnable?: boolean | undefined;
}
export interface OrganizationKubernetesAuditLogsConfigurationResult {
  AutoEnable?: boolean | undefined;
}
export interface OrganizationKubernetesConfigurationResult {
  AuditLogs?: OrganizationKubernetesAuditLogsConfigurationResult | undefined;
}
export interface OrganizationEbsVolumesResult {
  AutoEnable?: boolean | undefined;
}
export interface OrganizationScanEc2InstanceWithFindingsResult {
  EbsVolumes?: OrganizationEbsVolumesResult | undefined;
}
export interface OrganizationMalwareProtectionConfigurationResult {
  ScanEc2InstanceWithFindings?: OrganizationScanEc2InstanceWithFindingsResult | undefined;
}
export interface OrganizationDataSourceConfigurationsResult {
  S3Logs?: OrganizationS3LogsConfigurationResult | undefined;
  Kubernetes?: OrganizationKubernetesConfigurationResult | undefined;
  MalwareProtection?: OrganizationMalwareProtectionConfigurationResult | undefined;
}
export type OrgFeature =
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "RUNTIME_MONITORING"
  | "AI_PROTECTION"
  | (string & {});
export type OrgFeatureStatus = "NEW" | "NONE" | "ALL" | (string & {});
export type OrgFeatureAdditionalConfiguration =
  | "EKS_ADDON_MANAGEMENT"
  | "ECS_FARGATE_AGENT_MANAGEMENT"
  | "EC2_AGENT_MANAGEMENT"
  | "RDS_DATA_RISK"
  | (string & {});
export interface OrganizationAdditionalConfigurationResult {
  Name?: OrgFeatureAdditionalConfiguration | undefined;
  AutoEnable?: OrgFeatureStatus | undefined;
}
export type OrganizationAdditionalConfigurationResults =
  OrganizationAdditionalConfigurationResult[];
export interface OrganizationFeatureConfigurationResult {
  Name?: OrgFeature | undefined;
  AutoEnable?: OrgFeatureStatus | undefined;
  AdditionalConfiguration?: OrganizationAdditionalConfigurationResult[] | undefined;
}
export type OrganizationFeaturesConfigurationsResults = OrganizationFeatureConfigurationResult[];
export type AutoEnableMembers = "NEW" | "ALL" | "NONE" | (string & {});
export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean | undefined;
  MemberAccountLimitReached: boolean;
  DataSources?:
    | (OrganizationDataSourceConfigurationsResult & {
        S3Logs: OrganizationS3LogsConfigurationResult & { AutoEnable: boolean };
        Kubernetes: OrganizationKubernetesConfigurationResult & {
          AuditLogs: OrganizationKubernetesAuditLogsConfigurationResult & { AutoEnable: boolean };
        };
      })
    | undefined;
  Features?: OrganizationFeatureConfigurationResult[] | undefined;
  NextToken?: string | undefined;
  AutoEnableOrganizationMembers?: AutoEnableMembers | undefined;
}
export interface DescribePublishingDestinationRequest {
  DetectorId: string;
  DestinationId: string;
}
export type PublishingStatus =
  | "PENDING_VERIFICATION"
  | "PUBLISHING"
  | "UNABLE_TO_PUBLISH_FIX_DESTINATION_PROPERTY"
  | "STOPPED"
  | (string & {});
export interface DescribePublishingDestinationResponse {
  DestinationId: string;
  DestinationType: DestinationType;
  Status: PublishingStatus;
  PublishingFailureStartTimestamp: number;
  DestinationProperties: DestinationProperties;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface DisableOrganizationAdminAccountRequest {
  AdminAccountId?: string | undefined;
}
export interface DisableOrganizationAdminAccountResponse {}
export interface DisassociateFromAdministratorAccountRequest {
  DetectorId: string;
}
export interface DisassociateFromAdministratorAccountResponse {}
export interface DisassociateFromMasterAccountRequest {
  DetectorId: string;
}
export interface DisassociateFromMasterAccountResponse {}
export interface DisassociateMembersRequest {
  DetectorId: string;
  AccountIds?: string[] | undefined;
}
export interface DisassociateMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface EnableOrganizationAdminAccountRequest {
  AdminAccountId?: string | undefined;
}
export interface EnableOrganizationAdminAccountResponse {}
export interface GetAdministratorAccountRequest {
  DetectorId: string;
}
export interface Administrator {
  AccountId?: string | undefined;
  InvitationId?: string | undefined;
  RelationshipStatus?: string | undefined;
  InvitedAt?: string | undefined;
}
export interface GetAdministratorAccountResponse {
  Administrator: Administrator;
}
export type CoverageFilterCriterionKey =
  | "ACCOUNT_ID"
  | "RESOURCE_TYPE"
  | "COVERAGE_STATUS"
  | "ADDON_VERSION"
  | "CLUSTER_NAME"
  | "ECS_CLUSTER_NAME"
  | "MANAGEMENT_TYPE"
  | "EKS_CLUSTER_NAME"
  | "AGENT_VERSION"
  | "INSTANCE_ID"
  | "CLUSTER_ARN"
  | (string & {});
export interface CoverageFilterCondition {
  Equals?: string[] | undefined;
  NotEquals?: string[] | undefined;
}
export interface CoverageFilterCriterion {
  CriterionKey?: CoverageFilterCriterionKey | undefined;
  FilterCondition?: CoverageFilterCondition | undefined;
}
export type CoverageFilterCriterionList = CoverageFilterCriterion[];
export interface CoverageFilterCriteria {
  FilterCriterion?: CoverageFilterCriterion[] | undefined;
}
export type CoverageStatisticsType =
  | "COUNT_BY_RESOURCE_TYPE"
  | "COUNT_BY_COVERAGE_STATUS"
  | (string & {});
export type CoverageStatisticsTypeList = CoverageStatisticsType[];
export interface GetCoverageStatisticsRequest {
  DetectorId: string;
  FilterCriteria?: CoverageFilterCriteria | undefined;
  StatisticsType?: CoverageStatisticsType[] | undefined;
}
export type ResourceType = "EKS" | "ECS" | "EC2" | (string & {});
export type CountByResourceType = { [key in ResourceType]?: number | undefined };
export type CoverageStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export type CountByCoverageStatus = { [key in CoverageStatus]?: number | undefined };
export interface CoverageStatistics {
  CountByResourceType?: { [key: string]: number | undefined } | undefined;
  CountByCoverageStatus?: { [key: string]: number | undefined } | undefined;
}
export interface GetCoverageStatisticsResponse {
  CoverageStatistics?: CoverageStatistics | undefined;
}
export interface GetCustomDetectionRuleRequest {
  RuleId: string;
}
export type RuleName = string;
export type DetectionRuleDescription = string;
export type DetectionRuleSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
export type DetectionRuleDataSource =
  | "CloudTrailManagementEvent"
  | "RuntimeMonitoring"
  | (string & {});
export type MitreTactic = string;
export type MitreTechnique = string;
export type DetectionRuleServiceName = string;
export type RuleExpression = string;
export interface RuleDefinition {
  Expression?: string | undefined;
}
export type RuleLanguage = "SQL" | (string & {});
export type RuleSchema = "CloudTrail" | (string & {});
export type DetectionRuleAgentVersion = string;
export interface DetectionRuleEksRequirements {
  MinAgentVersion?: string | undefined;
}
export interface DetectionRuleEc2Requirements {
  MinAgentVersion?: string | undefined;
}
export interface DetectionRuleEcsFargateRequirements {
  MinAgentVersion?: string | undefined;
}
export interface DetectionRuleRuntimePlatforms {
  Eks?: DetectionRuleEksRequirements | undefined;
  Ec2?: DetectionRuleEc2Requirements | undefined;
  EcsFargate?: DetectionRuleEcsFargateRequirements | undefined;
}
export interface DetectionRuleRuntimeMonitoringDetails {
  Platforms?: DetectionRuleRuntimePlatforms | undefined;
}
export interface RuleDetail {
  RuleId?: string | undefined;
  Arn?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  Severity?: DetectionRuleSeverity | undefined;
  DataSource?: DetectionRuleDataSource | undefined;
  Tactic?: string | undefined;
  Technique?: string | undefined;
  Service?: string | undefined;
  Definition?: RuleDefinition | undefined;
  Language?: RuleLanguage | undefined;
  Schema?: RuleSchema | undefined;
  RuntimeMonitoringDetails?: DetectionRuleRuntimeMonitoringDetails | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export interface GetCustomDetectionRuleResponse {
  Rule: RuleDetail & {
    RuleId: RuleId;
    Arn: DetectionRuleArn;
    Name: RuleName;
    Description: DetectionRuleDescription;
    Severity: DetectionRuleSeverity;
    DataSource: DetectionRuleDataSource;
    Tactic: MitreTactic;
    Technique: MitreTechnique;
    Service: DetectionRuleServiceName;
    Definition: RuleDefinition & { Expression: RuleExpression };
    CreatedAt: Date;
  };
}
export interface GetCustomDetectionRuleAssociationRequest {
  RuleId: string;
  AssociationId: string;
}
export interface GetCustomDetectionRuleAssociationResponse {
  RuleAssociation: AssociationDetail & {
    AssociationId: AssociationId;
    Arn: DetectionRuleArn;
    RuleId: RuleId;
    AccountId: AccountId;
    Mode: AssociationMode;
    CreatedAt: Date;
    UpdatedAt: Date;
  };
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetCustomDetectionRuleOrgConfigurationRequest {
  RuleId: string;
  Mode?: AssociationMode | undefined;
}
export type DetectionRuleConfigurationStatus = "ACTIVE" | "PROCESSING" | "FAILED" | (string & {});
export interface DetectionRuleOrgConfiguration {
  RuleId?: string | undefined;
  Mode?: AssociationMode | undefined;
  Status?: DetectionRuleConfigurationStatus | undefined;
  StatusReason?: string | undefined;
  IncludeAccountIds?: string[] | undefined;
  ExcludeAccountIds?: string[] | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  ExpiresAt?: Date | undefined;
}
export interface GetCustomDetectionRuleOrgConfigurationResponse {
  Configuration: DetectionRuleOrgConfiguration & {
    RuleId: RuleId;
    Mode: AssociationMode;
    Status: DetectionRuleConfigurationStatus;
    IncludeAccountIds: DetectionRuleAccountIds;
    ExcludeAccountIds: DetectionRuleAccountIds;
    CreatedAt: Date;
    UpdatedAt: Date;
  };
}
export interface GetDetectorRequest {
  DetectorId: string;
}
export type DetectorStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CloudTrailConfigurationResult {
  Status?: DataSourceStatus | undefined;
}
export interface DNSLogsConfigurationResult {
  Status?: DataSourceStatus | undefined;
}
export interface FlowLogsConfigurationResult {
  Status?: DataSourceStatus | undefined;
}
export interface S3LogsConfigurationResult {
  Status?: DataSourceStatus | undefined;
}
export interface KubernetesAuditLogsConfigurationResult {
  Status?: DataSourceStatus | undefined;
}
export interface KubernetesConfigurationResult {
  AuditLogs?: KubernetesAuditLogsConfigurationResult | undefined;
}
export interface DataSourceConfigurationsResult {
  CloudTrail?: CloudTrailConfigurationResult | undefined;
  DNSLogs?: DNSLogsConfigurationResult | undefined;
  FlowLogs?: FlowLogsConfigurationResult | undefined;
  S3Logs?: S3LogsConfigurationResult | undefined;
  Kubernetes?: KubernetesConfigurationResult | undefined;
  MalwareProtection?: MalwareProtectionConfigurationResult | undefined;
}
export type DetectorFeatureResult =
  | "FLOW_LOGS"
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "RUNTIME_MONITORING"
  | "AI_PROTECTION"
  | "AI_ANALYST"
  | (string & {});
export type ManagedBy = "GUARDDUTY_POLICY" | (string & {});
export interface DetectorAdditionalConfigurationResult {
  Name?: FeatureAdditionalConfiguration | undefined;
  Status?: FeatureStatus | undefined;
  UpdatedAt?: Date | undefined;
  ManagedBy?: ManagedBy | undefined;
}
export type DetectorAdditionalConfigurationResults = DetectorAdditionalConfigurationResult[];
export interface DetectorFeatureConfigurationResult {
  Name?: DetectorFeatureResult | undefined;
  Status?: FeatureStatus | undefined;
  UpdatedAt?: Date | undefined;
  AdditionalConfiguration?: DetectorAdditionalConfigurationResult[] | undefined;
  ManagedBy?: ManagedBy | undefined;
}
export type DetectorFeatureConfigurationsResults = DetectorFeatureConfigurationResult[];
export interface GetDetectorResponse {
  CreatedAt?: string | undefined;
  FindingPublishingFrequency?: FindingPublishingFrequency | undefined;
  ServiceRole: string;
  Status: DetectorStatus;
  UpdatedAt?: string | undefined;
  DataSources?:
    | (DataSourceConfigurationsResult & {
        CloudTrail: CloudTrailConfigurationResult & { Status: DataSourceStatus };
        DNSLogs: DNSLogsConfigurationResult & { Status: DataSourceStatus };
        FlowLogs: FlowLogsConfigurationResult & { Status: DataSourceStatus };
        S3Logs: S3LogsConfigurationResult & { Status: DataSourceStatus };
        Kubernetes: KubernetesConfigurationResult & {
          AuditLogs: KubernetesAuditLogsConfigurationResult & { Status: DataSourceStatus };
        };
      })
    | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  Features?: DetectorFeatureConfigurationResult[] | undefined;
}
export interface GetFilterRequest {
  DetectorId: string;
  FilterName: string;
}
export type FilterVersion = number;
export interface GetFilterResponse {
  Name: string;
  Description?: string | undefined;
  Action: FilterAction;
  Rank?: number | undefined;
  FindingCriteria: FindingCriteria;
  Tags?: { [key: string]: string | undefined } | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  Version?: number | undefined;
}
export interface GetFindingsRequest {
  DetectorId: string;
  FindingIds?: string[] | undefined;
  SortCriteria?: SortCriteria | undefined;
}
export interface AccessKeyDetails {
  AccessKeyId?: string | undefined;
  PrincipalId?: string | undefined;
  UserName?: string | undefined;
  UserType?: string | undefined;
}
export interface Owner {
  Id?: string | undefined;
}
export interface Tag {
  Key?: string | undefined;
  Value?: string | undefined;
}
export type Tags = Tag[];
export interface DefaultServerSideEncryption {
  EncryptionType?: string | undefined;
  KmsMasterKeyArn?: string | undefined;
}
export interface AccessControlList {
  AllowsPublicReadAccess?: boolean | undefined;
  AllowsPublicWriteAccess?: boolean | undefined;
}
export interface BucketPolicy {
  AllowsPublicReadAccess?: boolean | undefined;
  AllowsPublicWriteAccess?: boolean | undefined;
}
export interface BlockPublicAccess {
  IgnorePublicAcls?: boolean | undefined;
  RestrictPublicBuckets?: boolean | undefined;
  BlockPublicAcls?: boolean | undefined;
  BlockPublicPolicy?: boolean | undefined;
}
export interface BucketLevelPermissions {
  AccessControlList?: AccessControlList | undefined;
  BucketPolicy?: BucketPolicy | undefined;
  BlockPublicAccess?: BlockPublicAccess | undefined;
}
export interface AccountLevelPermissions {
  BlockPublicAccess?: BlockPublicAccess | undefined;
}
export interface PermissionConfiguration {
  BucketLevelPermissions?: BucketLevelPermissions | undefined;
  AccountLevelPermissions?: AccountLevelPermissions | undefined;
}
export interface PublicAccess {
  PermissionConfiguration?: PermissionConfiguration | undefined;
  EffectivePermission?: string | undefined;
}
export interface S3ObjectDetail {
  ObjectArn?: string | undefined;
  Key?: string | undefined;
  ETag?: string | undefined;
  Hash?: string | undefined;
  VersionId?: string | undefined;
}
export type S3ObjectDetails = S3ObjectDetail[];
export interface S3BucketDetail {
  Arn?: string | undefined;
  Name?: string | undefined;
  Type?: string | undefined;
  CreatedAt?: Date | undefined;
  Owner?: Owner | undefined;
  Tags?: Tag[] | undefined;
  DefaultServerSideEncryption?: DefaultServerSideEncryption | undefined;
  PublicAccess?: PublicAccess | undefined;
  S3ObjectDetails?: S3ObjectDetail[] | undefined;
}
export type S3BucketDetails = S3BucketDetail[];
export interface IamInstanceProfile {
  Arn?: string | undefined;
  Id?: string | undefined;
}
export type Ipv6Addresses = string[];
export type SensitiveString = string | redacted.Redacted<string>;
export interface PrivateIpAddressDetails {
  PrivateDnsName?: string | undefined;
  PrivateIpAddress?: string | redacted.Redacted<string> | undefined;
}
export type PrivateIpAddresses = PrivateIpAddressDetails[];
export interface SecurityGroup {
  GroupId?: string | undefined;
  GroupName?: string | undefined;
}
export type SecurityGroups = SecurityGroup[];
export interface NetworkInterface {
  Ipv6Addresses?: string[] | undefined;
  NetworkInterfaceId?: string | undefined;
  PrivateDnsName?: string | undefined;
  PrivateIpAddress?: string | redacted.Redacted<string> | undefined;
  PrivateIpAddresses?: PrivateIpAddressDetails[] | undefined;
  PublicDnsName?: string | undefined;
  PublicIp?: string | undefined;
  SecurityGroups?: SecurityGroup[] | undefined;
  SubnetId?: string | undefined;
  VpcId?: string | undefined;
}
export type NetworkInterfaces = NetworkInterface[];
export interface ProductCode {
  Code?: string | undefined;
  ProductType?: string | undefined;
}
export type ProductCodes = ProductCode[];
export interface InstanceDetails {
  AvailabilityZone?: string | undefined;
  IamInstanceProfile?: IamInstanceProfile | undefined;
  ImageDescription?: string | undefined;
  ImageId?: string | undefined;
  InstanceId?: string | undefined;
  InstanceState?: string | undefined;
  InstanceType?: string | undefined;
  OutpostArn?: string | undefined;
  LaunchTime?: string | undefined;
  NetworkInterfaces?: NetworkInterface[] | undefined;
  Platform?: string | undefined;
  ProductCodes?: ProductCode[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface EksClusterDetails {
  Name?: string | undefined;
  Arn?: string | undefined;
  VpcId?: string | undefined;
  Status?: string | undefined;
  Tags?: Tag[] | undefined;
  CreatedAt?: Date | undefined;
}
export type Groups = string[];
export type SessionNameList = string[];
export interface ImpersonatedUser {
  Username?: string | undefined;
  Groups?: string[] | undefined;
}
export interface KubernetesUserDetails {
  Username?: string | undefined;
  Uid?: string | undefined;
  Groups?: string[] | undefined;
  SessionName?: string[] | undefined;
  ImpersonatedUser?: ImpersonatedUser | undefined;
}
export interface VolumeMount {
  Name?: string | undefined;
  MountPath?: string | undefined;
}
export type VolumeMounts = VolumeMount[];
export interface SecurityContext {
  Privileged?: boolean | undefined;
  AllowPrivilegeEscalation?: boolean | undefined;
}
export interface Container {
  ContainerRuntime?: string | undefined;
  Id?: string | undefined;
  Name?: string | undefined;
  Image?: string | undefined;
  ImagePrefix?: string | undefined;
  VolumeMounts?: VolumeMount[] | undefined;
  SecurityContext?: SecurityContext | undefined;
}
export type Containers = Container[];
export interface HostPath {
  Path?: string | undefined;
}
export interface Volume {
  Name?: string | undefined;
  HostPath?: HostPath | undefined;
}
export type Volumes = Volume[];
export interface KubernetesWorkloadDetails {
  Name?: string | undefined;
  Type?: string | undefined;
  Uid?: string | undefined;
  Namespace?: string | undefined;
  HostNetwork?: boolean | undefined;
  ServiceAccountName?: string | undefined;
  Containers?: Container[] | undefined;
  Volumes?: Volume[] | undefined;
  HostIPC?: boolean | undefined;
  HostPID?: boolean | undefined;
}
export interface KubernetesDetails {
  KubernetesUserDetails?: KubernetesUserDetails | undefined;
  KubernetesWorkloadDetails?: KubernetesWorkloadDetails | undefined;
}
export interface EbsVolumeDetails {
  ScannedVolumeDetails?: VolumeDetail[] | undefined;
  SkippedVolumeDetails?: VolumeDetail[] | undefined;
}
export interface EcsTaskDetails {
  Arn?: string | undefined;
  DefinitionArn?: string | undefined;
  Version?: string | undefined;
  TaskCreatedAt?: Date | undefined;
  StartedAt?: Date | undefined;
  StartedBy?: string | undefined;
  Tags?: Tag[] | undefined;
  Volumes?: Volume[] | undefined;
  Containers?: Container[] | undefined;
  Group?: string | undefined;
  LaunchType?: string | undefined;
}
export interface EcsClusterDetails {
  Name?: string | undefined;
  Arn?: string | undefined;
  Status?: string | undefined;
  ActiveServicesCount?: number | undefined;
  RegisteredContainerInstancesCount?: number | undefined;
  RunningTasksCount?: number | undefined;
  Tags?: Tag[] | undefined;
  TaskDetails?: EcsTaskDetails | undefined;
}
export type SubnetIds = string[];
export interface VpcConfig {
  SubnetIds?: string[] | undefined;
  VpcId?: string | undefined;
  SecurityGroups?: SecurityGroup[] | undefined;
}
export interface LambdaDetails {
  FunctionArn?: string | undefined;
  FunctionName?: string | undefined;
  Description?: string | undefined;
  LastModifiedAt?: Date | undefined;
  RevisionId?: string | undefined;
  FunctionVersion?: string | undefined;
  Role?: string | undefined;
  VpcConfig?: VpcConfig | undefined;
  Tags?: Tag[] | undefined;
}
export interface RdsDbInstanceDetails {
  DbInstanceIdentifier?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  DbClusterIdentifier?: string | undefined;
  DbInstanceArn?: string | undefined;
  DbiResourceId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface RdsLimitlessDbDetails {
  DbShardGroupIdentifier?: string | undefined;
  DbShardGroupResourceId?: string | undefined;
  DbShardGroupArn?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  DbClusterIdentifier?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface RdsDbUserDetails {
  User?: string | undefined;
  Application?: string | undefined;
  Database?: string | undefined;
  Ssl?: string | undefined;
  AuthMethod?: string | undefined;
}
export interface EbsSnapshotDetails {
  SnapshotArn?: string | undefined;
}
export interface Ec2ImageDetails {
  ImageArn?: string | undefined;
}
export interface ScanConfigurationContinuousScanDetails {
  StartTime?: Date | undefined;
  EndTime: Date;
}
export interface RecoveryPointDetails {
  RecoveryPointArn?: string | undefined;
  BackupVaultName?: string | undefined;
  ContinuousScanDetails?: ScanConfigurationContinuousScanDetails | undefined;
}
export interface BedrockGuardrail {
  Arn?: string | undefined;
  Version?: string | undefined;
}
export type BedrockGuardrails = BedrockGuardrail[];
export type GuardrailAction = "GUARDRAIL_INTERVENED" | "NONE" | (string & {});
export type GuardrailSource = "INPUT" | "OUTPUT" | (string & {});
export type ContentPolicyFilterType =
  | "PROMPT_ATTACK"
  | "JAILBREAK"
  | "HATE"
  | "INSULTS"
  | "SEXUAL"
  | "VIOLENCE"
  | "MISCONDUCT"
  | (string & {});
export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
export type ContentPolicyFilterAction = "BLOCKED" | "NONE" | (string & {});
export interface ContentPolicyFilter {
  Type?: ContentPolicyFilterType | undefined;
  Confidence?: ConfidenceLevel | undefined;
  Action?: ContentPolicyFilterAction | undefined;
}
export type ContentPolicyFilters = ContentPolicyFilter[];
export interface BedrockGuardrailDetails {
  GuardrailArn?: string | undefined;
  GuardrailVersion?: string | undefined;
  Guardrails?: BedrockGuardrail[] | undefined;
  GuardrailAction?: GuardrailAction | undefined;
  GuardrailSource?: GuardrailSource | undefined;
  ContentPolicyFilters?: ContentPolicyFilter[] | undefined;
}
export interface ModelDetail {
  ModelId?: string | undefined;
}
export type ModelDetails = ModelDetail[];
export interface Resource {
  AccessKeyDetails?: AccessKeyDetails | undefined;
  S3BucketDetails?: S3BucketDetail[] | undefined;
  InstanceDetails?: InstanceDetails | undefined;
  EksClusterDetails?: EksClusterDetails | undefined;
  KubernetesDetails?: KubernetesDetails | undefined;
  ResourceType?: string | undefined;
  EbsVolumeDetails?: EbsVolumeDetails | undefined;
  EcsClusterDetails?: EcsClusterDetails | undefined;
  ContainerDetails?: Container | undefined;
  LambdaDetails?: LambdaDetails | undefined;
  RdsDbInstanceDetails?: RdsDbInstanceDetails | undefined;
  RdsLimitlessDbDetails?: RdsLimitlessDbDetails | undefined;
  RdsDbUserDetails?: RdsDbUserDetails | undefined;
  EbsSnapshotDetails?: EbsSnapshotDetails | undefined;
  Ec2ImageDetails?: Ec2ImageDetails | undefined;
  RecoveryPointDetails?: RecoveryPointDetails | undefined;
  BedrockGuardrailDetails?: BedrockGuardrailDetails | undefined;
  ModelDetails?: ModelDetail[] | undefined;
}
export interface DomainDetails {
  Domain?: string | undefined;
}
export interface City {
  CityName?: string | undefined;
}
export interface Country {
  CountryCode?: string | undefined;
  CountryName?: string | undefined;
}
export interface GeoLocation {
  Lat?: number | undefined;
  Lon?: number | undefined;
}
export interface Organization {
  Asn?: string | undefined;
  AsnOrg?: string | undefined;
  Isp?: string | undefined;
  Org?: string | undefined;
}
export interface RemoteIpDetails {
  City?: City | undefined;
  Country?: Country | undefined;
  GeoLocation?: GeoLocation | undefined;
  IpAddressV4?: string | redacted.Redacted<string> | undefined;
  IpAddressV6?: string | redacted.Redacted<string> | undefined;
  Organization?: Organization | undefined;
}
export interface RemoteAccountDetails {
  AccountId?: string | undefined;
  Affiliated?: boolean | undefined;
  AwsServiceName?: string | undefined;
}
export type AffectedResources = { [key: string]: string | undefined };
export interface AwsApiCallAction {
  Api?: string | undefined;
  CallerType?: string | undefined;
  DomainDetails?: DomainDetails | undefined;
  ErrorCode?: string | undefined;
  UserAgent?: string | undefined;
  RemoteIpDetails?: RemoteIpDetails | undefined;
  ServiceName?: string | undefined;
  RemoteAccountDetails?: RemoteAccountDetails | undefined;
  AffectedResources?: { [key: string]: string | undefined } | undefined;
}
export interface DnsRequestAction {
  Domain?: string | undefined;
  Protocol?: string | undefined;
  Blocked?: boolean | undefined;
  DomainWithSuffix?: string | undefined;
  VpcOwnerAccountId?: string | undefined;
}
export interface LocalPortDetails {
  Port?: number | undefined;
  PortName?: string | undefined;
}
export interface LocalIpDetails {
  IpAddressV4?: string | redacted.Redacted<string> | undefined;
  IpAddressV6?: string | redacted.Redacted<string> | undefined;
}
export interface RemotePortDetails {
  Port?: number | undefined;
  PortName?: string | undefined;
}
export interface NetworkConnectionAction {
  Blocked?: boolean | undefined;
  ConnectionDirection?: string | undefined;
  LocalPortDetails?: LocalPortDetails | undefined;
  Protocol?: string | undefined;
  LocalIpDetails?: LocalIpDetails | undefined;
  LocalNetworkInterface?: string | undefined;
  RemoteIpDetails?: RemoteIpDetails | undefined;
  RemotePortDetails?: RemotePortDetails | undefined;
}
export interface PortProbeDetail {
  LocalPortDetails?: LocalPortDetails | undefined;
  LocalIpDetails?: LocalIpDetails | undefined;
  RemoteIpDetails?: RemoteIpDetails | undefined;
}
export type PortProbeDetails = PortProbeDetail[];
export interface PortProbeAction {
  Blocked?: boolean | undefined;
  PortProbeDetails?: PortProbeDetail[] | undefined;
}
export type SourceIps = string[];
export interface KubernetesApiCallAction {
  RequestUri?: string | undefined;
  Verb?: string | undefined;
  Resource?: string | undefined;
  Subresource?: string | undefined;
  Namespace?: string | undefined;
  ResourceName?: string | undefined;
  SourceIps?: string[] | undefined;
  UserAgent?: string | undefined;
  RemoteIpDetails?: RemoteIpDetails | undefined;
  StatusCode?: number | undefined;
  Parameters?: string | undefined;
}
export interface KubernetesPermissionCheckedDetails {
  Verb?: string | undefined;
  Resource?: string | undefined;
  Namespace?: string | undefined;
  Allowed?: boolean | undefined;
}
export interface KubernetesRoleBindingDetails {
  Kind?: string | undefined;
  Name?: string | undefined;
  Uid?: string | undefined;
  RoleRefName?: string | undefined;
  RoleRefKind?: string | undefined;
}
export interface KubernetesRoleDetails {
  Kind?: string | undefined;
  Name?: string | undefined;
  Uid?: string | undefined;
}
export interface LoginAttribute {
  User?: string | undefined;
  Application?: string | undefined;
  FailedLoginAttempts?: number | undefined;
  SuccessfulLoginAttempts?: number | undefined;
}
export type LoginAttributes = LoginAttribute[];
export interface RdsLoginAttemptAction {
  RemoteIpDetails?: RemoteIpDetails | undefined;
  LoginAttributes?: LoginAttribute[] | undefined;
}
export interface Action {
  ActionType?: string | undefined;
  AwsApiCallAction?: AwsApiCallAction | undefined;
  DnsRequestAction?: DnsRequestAction | undefined;
  NetworkConnectionAction?: NetworkConnectionAction | undefined;
  PortProbeAction?: PortProbeAction | undefined;
  KubernetesApiCallAction?: KubernetesApiCallAction | undefined;
  KubernetesPermissionCheckedDetails?: KubernetesPermissionCheckedDetails | undefined;
  KubernetesRoleBindingDetails?: KubernetesRoleBindingDetails | undefined;
  KubernetesRoleDetails?: KubernetesRoleDetails | undefined;
  RdsLoginAttemptAction?: RdsLoginAttemptAction | undefined;
}
export type ThreatNames = string[];
export interface ThreatIntelligenceDetail {
  ThreatListName?: string | undefined;
  ThreatNames?: string[] | undefined;
  ThreatFileSha256?: string | undefined;
}
export type ThreatIntelligenceDetails = ThreatIntelligenceDetail[];
export interface Evidence {
  ThreatIntelligenceDetails?: ThreatIntelligenceDetail[] | undefined;
}
export interface ServiceAdditionalInfo {
  Value?: string | undefined;
  Type?: string | undefined;
}
export type Sources = string[];
export interface ScannedItemCount {
  TotalGb?: number | undefined;
  Files?: number | undefined;
  Volumes?: number | undefined;
}
export interface ThreatsDetectedItemCount {
  Files?: number | undefined;
}
export interface HighestSeverityThreatDetails {
  Severity?: string | undefined;
  ThreatName?: string | undefined;
  Count?: number | undefined;
}
export interface ScanFilePath {
  FilePath?: string | undefined;
  VolumeArn?: string | undefined;
  Hash?: string | undefined;
  FileName?: string | undefined;
}
export type FilePaths = ScanFilePath[];
export interface ScanThreatName {
  Name?: string | undefined;
  Severity?: string | undefined;
  ItemCount?: number | undefined;
  FilePaths?: ScanFilePath[] | undefined;
}
export type ScanThreatNames = ScanThreatName[];
export interface ThreatDetectedByName {
  ItemCount?: number | undefined;
  UniqueThreatNameCount?: number | undefined;
  Shortened?: boolean | undefined;
  ThreatNames?: ScanThreatName[] | undefined;
}
export interface ScanDetections {
  ScannedItemCount?: ScannedItemCount | undefined;
  ThreatsDetectedItemCount?: ThreatsDetectedItemCount | undefined;
  HighestSeverityThreatDetails?: HighestSeverityThreatDetails | undefined;
  ThreatDetectedByName?: ThreatDetectedByName | undefined;
}
export interface EbsVolumeScanDetails {
  ScanId?: string | undefined;
  ScanStartedAt?: Date | undefined;
  ScanCompletedAt?: Date | undefined;
  TriggerFindingId?: string | undefined;
  Sources?: string[] | undefined;
  ScanDetections?: ScanDetections | undefined;
  ScanType?: ScanType | undefined;
}
export interface LineageObject {
  StartTime?: Date | undefined;
  NamespacePid?: number | undefined;
  UserId?: number | undefined;
  Name?: string | undefined;
  Pid?: number | undefined;
  Uuid?: string | undefined;
  ExecutablePath?: string | undefined;
  Euid?: number | undefined;
  ParentUuid?: string | undefined;
}
export type Lineage = LineageObject[];
export interface ProcessDetails {
  Name?: string | undefined;
  ExecutablePath?: string | undefined;
  ExecutableSha256?: string | undefined;
  NamespacePid?: number | undefined;
  Pwd?: string | undefined;
  Pid?: number | undefined;
  StartTime?: Date | undefined;
  Uuid?: string | undefined;
  ParentUuid?: string | undefined;
  User?: string | undefined;
  UserId?: number | undefined;
  Euid?: number | undefined;
  Lineage?: LineageObject[] | undefined;
}
export type FlagsList = string[];
export type MemoryRegionsList = string[];
export type RelatedFilePathsList = string[];
export interface RuntimeContext {
  ModifyingProcess?: ProcessDetails | undefined;
  ModifiedAt?: Date | undefined;
  ScriptPath?: string | undefined;
  LibraryPath?: string | undefined;
  LdPreloadValue?: string | undefined;
  SocketPath?: string | undefined;
  RuncBinaryPath?: string | undefined;
  ReleaseAgentPath?: string | undefined;
  MountSource?: string | undefined;
  MountTarget?: string | undefined;
  FileSystemType?: string | undefined;
  Flags?: string[] | undefined;
  ModuleName?: string | undefined;
  ModuleFilePath?: string | undefined;
  ModuleSha256?: string | undefined;
  ShellHistoryFilePath?: string | undefined;
  TargetProcess?: ProcessDetails | undefined;
  AddressFamily?: string | undefined;
  IanaProtocolNumber?: number | undefined;
  MemoryRegions?: string[] | undefined;
  ToolName?: string | undefined;
  ToolCategory?: string | undefined;
  ServiceName?: string | undefined;
  CommandLineExample?: string | undefined;
  ThreatFilePath?: string | undefined;
  FileOperation?: string | undefined;
  FilePath?: string | undefined;
  RelatedFilePaths?: string[] | undefined;
}
export interface RuntimeDetails {
  Process?: ProcessDetails | undefined;
  Context?: RuntimeContext | undefined;
}
export type ProfileType = "FREQUENCY" | "VOLUME" | (string & {});
export type ProfileSubtype =
  | "FREQUENT"
  | "INFREQUENT"
  | "UNSEEN"
  | "RARE"
  | "COUNT"
  | "AVERAGE"
  | (string & {});
export type ObservationTexts = string[];
export type ObservationNumbers = number[];
export interface Observations {
  Text?: string[] | undefined;
  Number?: number[] | undefined;
}
export interface AnomalyObject {
  ProfileType?: ProfileType | undefined;
  ProfileSubtype?: ProfileSubtype | undefined;
  Observations?: Observations | undefined;
}
export type AnomalyProfileFeatureObjects = AnomalyObject[];
export type AnomalyProfileFeatures = { [key: string]: AnomalyObject[] | undefined };
export type AnomalyProfiles = {
  [key: string]: { [key: string]: AnomalyObject[] | undefined } | undefined;
};
export type AnomalyUnusualBehaviorFeature = { [key: string]: AnomalyObject | undefined };
export type Behavior = { [key: string]: { [key: string]: AnomalyObject | undefined } | undefined };
export interface AnomalyUnusual {
  Behavior?:
    | { [key: string]: { [key: string]: AnomalyObject | undefined } | undefined }
    | undefined;
}
export interface Anomaly {
  Profiles?:
    | { [key: string]: { [key: string]: AnomalyObject[] | undefined } | undefined }
    | undefined;
  Unusual?: AnomalyUnusual | undefined;
}
export type SequenceDescription = string;
export interface Account {
  Uid?: string | undefined;
  Name?: string | undefined;
}
export interface User {
  Name?: string | undefined;
  Uid?: string | undefined;
  Type?: string | undefined;
  CredentialUid?: string | undefined;
  Account?: Account | undefined;
}
export type MfaStatus = "ENABLED" | "DISABLED" | (string & {});
export interface Session {
  Uid?: string | undefined;
  MfaStatus?: MfaStatus | undefined;
  CreatedTime?: Date | undefined;
  Issuer?: string | undefined;
}
export type ProcessName = string;
export type ProcessPath = string;
export type ProcessSha256 = string;
export interface ActorProcess {
  Name?: string | undefined;
  Path?: string | undefined;
  Sha256?: string | undefined;
}
export interface Actor {
  Id?: string | undefined;
  User?: User | undefined;
  Session?: Session | undefined;
  Process?: ActorProcess | undefined;
}
export type Actors = Actor[];
export type FindingResourceType =
  | "EC2_INSTANCE"
  | "EC2_NETWORK_INTERFACE"
  | "S3_BUCKET"
  | "S3_OBJECT"
  | "ACCESS_KEY"
  | "EKS_CLUSTER"
  | "KUBERNETES_WORKLOAD"
  | "CONTAINER"
  | "ECS_CLUSTER"
  | "ECS_TASK"
  | "AUTOSCALING_AUTO_SCALING_GROUP"
  | "IAM_INSTANCE_PROFILE"
  | "CLOUDFORMATION_STACK"
  | "EC2_LAUNCH_TEMPLATE"
  | "EC2_VPC"
  | "EC2_IMAGE"
  | "BEDROCK_CUSTOM_MODEL"
  | "BEDROCK_IMPORTED_MODEL"
  | "BEDROCK_PROVISIONED_MODEL"
  | "BEDROCK_CUSTOM_MODEL_DEPLOYMENT"
  | "BEDROCK_INFERENCE_PROFILE"
  | "BEDROCK_APPLICATION_INFERENCE_PROFILE"
  | "BEDROCK_PROMPT"
  | "BEDROCK_PROMPT_ROUTER"
  | "BEDROCK_GUARDRAIL"
  | "SAGEMAKER_ENDPOINT"
  | (string & {});
export type PublicAccessStatus = "BLOCKED" | "ALLOWED" | (string & {});
export type PublicAclIgnoreBehavior = "IGNORED" | "NOT_IGNORED" | (string & {});
export type PublicBucketRestrictBehavior = "RESTRICTED" | "NOT_RESTRICTED" | (string & {});
export interface PublicAccessConfiguration {
  PublicAclAccess?: PublicAccessStatus | undefined;
  PublicPolicyAccess?: PublicAccessStatus | undefined;
  PublicAclIgnoreBehavior?: PublicAclIgnoreBehavior | undefined;
  PublicBucketRestrictBehavior?: PublicBucketRestrictBehavior | undefined;
}
export type S3ObjectUids = string[];
export interface S3Bucket {
  OwnerId?: string | undefined;
  CreatedAt?: Date | undefined;
  EncryptionType?: string | undefined;
  EncryptionKeyArn?: string | undefined;
  EffectivePermission?: string | undefined;
  PublicReadAccess?: PublicAccessStatus | undefined;
  PublicWriteAccess?: PublicAccessStatus | undefined;
  AccountPublicAccess?: PublicAccessConfiguration | undefined;
  BucketPublicAccess?: PublicAccessConfiguration | undefined;
  S3ObjectUids?: string[] | undefined;
}
export type Ec2NetworkInterfaceUids = string[];
export interface Ec2Instance {
  AvailabilityZone?: string | undefined;
  ImageDescription?: string | undefined;
  InstanceState?: string | undefined;
  IamInstanceProfile?: IamInstanceProfile | undefined;
  InstanceType?: string | undefined;
  OutpostArn?: string | undefined;
  Platform?: string | undefined;
  ProductCodes?: ProductCode[] | undefined;
  Ec2NetworkInterfaceUids?: string[] | undefined;
}
export interface AccessKey {
  PrincipalId?: string | undefined;
  UserName?: string | undefined;
  UserType?: string | undefined;
}
export interface Ec2NetworkInterface {
  Ipv6Addresses?: string[] | undefined;
  PrivateIpAddresses?: PrivateIpAddressDetails[] | undefined;
  PublicIp?: string | undefined;
  SecurityGroups?: SecurityGroup[] | undefined;
  SubNetId?: string | undefined;
  VpcId?: string | undefined;
}
export interface S3Object {
  ETag?: string | undefined;
  Key?: string | undefined;
  VersionId?: string | undefined;
}
export type ClusterStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | "PENDING"
  | (string & {});
export type Ec2InstanceUid = string;
export type Ec2InstanceUids = string[];
export interface EksCluster {
  Arn?: string | undefined;
  CreatedAt?: Date | undefined;
  Status?: ClusterStatus | undefined;
  VpcId?: string | undefined;
  Ec2InstanceUids?: string[] | undefined;
}
export type ContainerUid = string;
export type ContainerUids = string[];
export type KubernetesResourcesTypes =
  | "PODS"
  | "JOBS"
  | "CRONJOBS"
  | "DEPLOYMENTS"
  | "DAEMONSETS"
  | "STATEFULSETS"
  | "REPLICASETS"
  | "REPLICATIONCONTROLLERS"
  | (string & {});
export interface KubernetesWorkload {
  ContainerUids?: string[] | undefined;
  Namespace?: string | undefined;
  KubernetesResourcesTypes?: KubernetesResourcesTypes | undefined;
}
export type ContainerImageUid = string;
export interface ContainerFindingResource {
  Image?: string | undefined;
  ImageUid?: string | undefined;
}
export type EcsClusterStatus =
  | "ACTIVE"
  | "PROVISIONING"
  | "DEPROVISIONING"
  | "FAILED"
  | "INACTIVE"
  | (string & {});
export interface EcsCluster {
  Status?: EcsClusterStatus | undefined;
  Ec2InstanceUids?: string[] | undefined;
}
export type EcsLaunchType = "FARGATE" | "EC2" | (string & {});
export interface EcsTask {
  CreatedAt?: Date | undefined;
  TaskDefinitionArn?: string | undefined;
  LaunchType?: EcsLaunchType | undefined;
  ContainerUids?: string[] | undefined;
}
export interface IamInstanceProfileV2 {
  Ec2InstanceUids?: string[] | undefined;
}
export interface AutoscalingAutoScalingGroup {
  Ec2InstanceUids?: string[] | undefined;
}
export type LaunchTemplateVersion = string;
export interface Ec2LaunchTemplate {
  Ec2InstanceUids?: string[] | undefined;
  Version?: string | undefined;
}
export interface Ec2Vpc {
  Ec2InstanceUids?: string[] | undefined;
}
export interface Ec2Image {
  Ec2InstanceUids?: string[] | undefined;
}
export interface CloudformationStack {
  Ec2InstanceUids?: string[] | undefined;
}
export interface BedrockGuardrailResource {
  Version?: string | undefined;
  GuardrailAction?: GuardrailAction | undefined;
  GuardrailSource?: GuardrailSource | undefined;
}
export interface ResourceData {
  S3Bucket?: S3Bucket | undefined;
  Ec2Instance?: Ec2Instance | undefined;
  AccessKey?: AccessKey | undefined;
  Ec2NetworkInterface?: Ec2NetworkInterface | undefined;
  S3Object?: S3Object | undefined;
  EksCluster?: EksCluster | undefined;
  KubernetesWorkload?: KubernetesWorkload | undefined;
  Container?: ContainerFindingResource | undefined;
  EcsCluster?: EcsCluster | undefined;
  EcsTask?: EcsTask | undefined;
  IamInstanceProfile?: IamInstanceProfileV2 | undefined;
  AutoscalingAutoScalingGroup?: AutoscalingAutoScalingGroup | undefined;
  Ec2LaunchTemplate?: Ec2LaunchTemplate | undefined;
  Ec2Vpc?: Ec2Vpc | undefined;
  Ec2Image?: Ec2Image | undefined;
  CloudformationStack?: CloudformationStack | undefined;
  BedrockGuardrail?: BedrockGuardrailResource | undefined;
}
export interface ResourceV2 {
  Uid?: string | undefined;
  Name?: string | undefined;
  AccountId?: string | undefined;
  ResourceType?: FindingResourceType | undefined;
  Region?: string | undefined;
  Service?: string | undefined;
  CloudPartition?: string | undefined;
  Tags?: Tag[] | undefined;
  Data?: ResourceData | undefined;
}
export type Resources = ResourceV2[];
export interface NetworkGeoLocation {
  City?: string | undefined;
  Country?: string | undefined;
  Latitude?: number | undefined;
  Longitude?: number | undefined;
}
export interface AutonomousSystem {
  Name?: string | undefined;
  Number?: number | undefined;
}
export type NetworkDirection = "INBOUND" | "OUTBOUND" | (string & {});
export interface NetworkConnection {
  Direction?: NetworkDirection | undefined;
}
export interface NetworkEndpoint {
  Id?: string | undefined;
  Ip?: string | undefined;
  Domain?: string | undefined;
  Port?: number | undefined;
  Location?: NetworkGeoLocation | undefined;
  AutonomousSystem?: AutonomousSystem | undefined;
  Connection?: NetworkConnection | undefined;
}
export type NetworkEndpoints = NetworkEndpoint[];
export type SignalType =
  | "FINDING"
  | "CLOUD_TRAIL"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "FLOW_LOGS"
  | "DNS_LOGS"
  | "RUNTIME_MONITORING"
  | (string & {});
export type SignalDescription = string;
export type ResourceUids = string[];
export type ActorIds = string[];
export type EndpointIds = string[];
export type IndicatorType =
  | "SUSPICIOUS_USER_AGENT"
  | "SUSPICIOUS_NETWORK"
  | "MALICIOUS_IP"
  | "TOR_IP"
  | "ATTACK_TACTIC"
  | "HIGH_RISK_API"
  | "ATTACK_TECHNIQUE"
  | "UNUSUAL_API_FOR_ACCOUNT"
  | "UNUSUAL_ASN_FOR_ACCOUNT"
  | "UNUSUAL_ASN_FOR_USER"
  | "SUSPICIOUS_PROCESS"
  | "MALICIOUS_DOMAIN"
  | "MALICIOUS_PROCESS"
  | "CRYPTOMINING_IP"
  | "CRYPTOMINING_DOMAIN"
  | "CRYPTOMINING_PROCESS"
  | "MALICIOUS_FILE"
  | "VULNERABILITY"
  | "MALICIOUS_PACKAGE"
  | "MISCONFIGURATION"
  | "REACHABILITY"
  | "SENSITIVE_DATA"
  | (string & {});
export type IndicatorValueString = string;
export type IndicatorValues = string[];
export type IndicatorTitle = string;
export interface Indicator {
  Key?: IndicatorType | undefined;
  Values?: string[] | undefined;
  Title?: string | undefined;
}
export type Indicators = Indicator[];
export type ActivityType = "API_CALL" | (string & {});
export interface ApiCall {
  Operation?: string | undefined;
  Service?: string | undefined;
  Error?: string | undefined;
  UserAgent?: string | undefined;
}
export interface Activity {
  Type?: ActivityType | undefined;
  Api?: ApiCall | undefined;
}
export type Activities = Activity[];
export interface Signal {
  Uid?: string | undefined;
  Type?: SignalType | undefined;
  Description?: string | undefined;
  Name?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  FirstSeenAt?: Date | undefined;
  LastSeenAt?: Date | undefined;
  Severity?: number | undefined;
  Count?: number | undefined;
  ResourceUids?: string[] | undefined;
  ActorIds?: string[] | undefined;
  EndpointIds?: string[] | undefined;
  SignalIndicators?: Indicator[] | undefined;
  Activities?: Activity[] | undefined;
}
export type Signals = Signal[];
export type AdditionalSequenceTypes = string[];
export interface Sequence {
  Uid?: string | undefined;
  Description?: string | undefined;
  Actors?: Actor[] | undefined;
  Resources?: ResourceV2[] | undefined;
  Endpoints?: NetworkEndpoint[] | undefined;
  Signals?: Signal[] | undefined;
  SequenceIndicators?: Indicator[] | undefined;
  AdditionalSequenceTypes?: string[] | undefined;
}
export interface Detection {
  Anomaly?: Anomaly | undefined;
  Sequence?: Sequence | undefined;
}
export interface ItemPath {
  NestedItemPath?: string | undefined;
  Hash?: string | undefined;
}
export type ItemPaths = ItemPath[];
export interface AdditionalInfo {
  VersionId?: string | undefined;
  DeviceName?: string | undefined;
}
export interface ItemDetails {
  ResourceArn?: string | undefined;
  ItemPath?: string | undefined;
  Hash?: string | undefined;
  AdditionalInfo?: AdditionalInfo | undefined;
}
export type ItemDetailsList = ItemDetails[];
export interface Threat {
  Name?: string | undefined;
  Source?: string | undefined;
  ItemPaths?: ItemPath[] | undefined;
  Count?: number | undefined;
  Hash?: string | undefined;
  ItemDetails?: ItemDetails[] | undefined;
}
export type Threats = Threat[];
export type MalwareProtectionScanType =
  | "BACKUP_INITIATED"
  | "ON_DEMAND"
  | "GUARDDUTY_INITIATED"
  | (string & {});
export type ScanCategory = "FULL_SCAN" | "INCREMENTAL_SCAN" | (string & {});
export interface IncrementalScanDetails {
  BaselineResourceArn?: string | undefined;
}
export interface MalwareProtectionFindingsScanConfiguration {
  TriggerType?: TriggerType | undefined;
  IncrementalScanDetails?: IncrementalScanDetails | undefined;
}
export interface MalwareScanDetails {
  Threats?: Threat[] | undefined;
  ScanId?: string | undefined;
  ScanType?: MalwareProtectionScanType | undefined;
  ScanCategory?: ScanCategory | undefined;
  ScanConfiguration?: MalwareProtectionFindingsScanConfiguration | undefined;
  UniqueThreatCount?: number | undefined;
}
export interface Service {
  Action?: Action | undefined;
  Evidence?: Evidence | undefined;
  Archived?: boolean | undefined;
  Count?: number | undefined;
  DetectorId?: string | undefined;
  EventFirstSeen?: string | undefined;
  EventLastSeen?: string | undefined;
  ResourceRole?: string | undefined;
  ServiceName?: string | undefined;
  UserFeedback?: string | undefined;
  AdditionalInfo?: ServiceAdditionalInfo | undefined;
  FeatureName?: string | undefined;
  EbsVolumeScanDetails?: EbsVolumeScanDetails | undefined;
  RuntimeDetails?: RuntimeDetails | undefined;
  Detection?: Detection | undefined;
  MalwareScanDetails?: MalwareScanDetails | undefined;
}
export interface Finding {
  AccountId?: string | undefined;
  Arn?: string | undefined;
  Confidence?: number | undefined;
  CreatedAt?: string | undefined;
  Description?: string | undefined;
  Id?: string | undefined;
  Partition?: string | undefined;
  Region?: string | undefined;
  Resource?: Resource | undefined;
  SchemaVersion?: string | undefined;
  Service?: Service | undefined;
  Severity?: number | undefined;
  Title?: string | undefined;
  Type?: string | undefined;
  UpdatedAt?: string | undefined;
  AssociatedAttackSequenceArn?: string | undefined;
  CustomDetectionRuleName?: string | undefined;
}
export type Findings = Finding[];
export interface GetFindingsResponse {
  Findings: (Finding & {
    AccountId: string;
    Arn: string;
    CreatedAt: string;
    Id: string;
    Region: string;
    Resource: Resource;
    SchemaVersion: string;
    Severity: number;
    Type: FindingType;
    UpdatedAt: string;
    Service: Service & {
      Detection: Detection & {
        Sequence: Sequence & {
          Uid: string;
          Description: SequenceDescription;
          Signals: (Signal & {
            Uid: string;
            Type: SignalType;
            Name: string;
            CreatedAt: Date;
            UpdatedAt: Date;
            FirstSeenAt: Date;
            LastSeenAt: Date;
            Count: number;
            SignalIndicators: (Indicator & { Key: IndicatorType })[];
            Activities: (Activity & { Type: ActivityType })[];
          })[];
          Actors: (Actor & {
            Id: string;
            User: User & {
              Name: string;
              Uid: string;
              Type: string;
              Account: Account & { Uid: string };
            };
            Process: ActorProcess & { Name: ProcessName; Path: ProcessPath };
          })[];
          Resources: (ResourceV2 & {
            Uid: string;
            ResourceType: FindingResourceType;
            Data: ResourceData & { Container: ContainerFindingResource & { Image: string } };
          })[];
          Endpoints: (NetworkEndpoint & {
            Id: string;
            Location: NetworkGeoLocation & {
              City: string;
              Country: string;
              Latitude: number;
              Longitude: number;
            };
            AutonomousSystem: AutonomousSystem & { Name: string; Number: number };
            Connection: NetworkConnection & { Direction: NetworkDirection };
          })[];
          SequenceIndicators: (Indicator & { Key: IndicatorType })[];
        };
      };
      MalwareScanDetails: MalwareScanDetails & {
        ScanConfiguration: MalwareProtectionFindingsScanConfiguration & {
          IncrementalScanDetails: IncrementalScanDetails & { BaselineResourceArn: NonEmptyString };
        };
      };
    };
  })[];
}
export type FindingStatisticType = "COUNT_BY_SEVERITY" | (string & {});
export type FindingStatisticTypes = FindingStatisticType[];
export type GroupByType =
  | "ACCOUNT"
  | "DATE"
  | "FINDING_TYPE"
  | "RESOURCE"
  | "SEVERITY"
  | (string & {});
export type MaxResults100 = number;
export interface GetFindingsStatisticsRequest {
  DetectorId: string;
  FindingStatisticTypes?: FindingStatisticType[] | undefined;
  FindingCriteria?: FindingCriteria | undefined;
  GroupBy?: GroupByType | undefined;
  OrderBy?: OrderBy | undefined;
  MaxResults?: number | undefined;
}
export type CountBySeverity = { [key: string]: number | undefined };
export interface AccountStatistics {
  AccountId?: string | undefined;
  LastGeneratedAt?: Date | undefined;
  TotalFindings?: number | undefined;
}
export type GroupedByAccount = AccountStatistics[];
export interface DateStatistics {
  Date?: Date | undefined;
  LastGeneratedAt?: Date | undefined;
  Severity?: number | undefined;
  TotalFindings?: number | undefined;
}
export type GroupedByDate = DateStatistics[];
export interface FindingTypeStatistics {
  FindingType?: string | undefined;
  LastGeneratedAt?: Date | undefined;
  TotalFindings?: number | undefined;
}
export type GroupedByFindingType = FindingTypeStatistics[];
export interface ResourceStatistics {
  AccountId?: string | undefined;
  LastGeneratedAt?: Date | undefined;
  ResourceId?: string | undefined;
  ResourceType?: string | undefined;
  TotalFindings?: number | undefined;
}
export type GroupedByResource = ResourceStatistics[];
export interface SeverityStatistics {
  LastGeneratedAt?: Date | undefined;
  Severity?: number | undefined;
  TotalFindings?: number | undefined;
}
export type GroupedBySeverity = SeverityStatistics[];
export interface FindingStatistics {
  CountBySeverity?: { [key: string]: number | undefined } | undefined;
  GroupedByAccount?: AccountStatistics[] | undefined;
  GroupedByDate?: DateStatistics[] | undefined;
  GroupedByFindingType?: FindingTypeStatistics[] | undefined;
  GroupedByResource?: ResourceStatistics[] | undefined;
  GroupedBySeverity?: SeverityStatistics[] | undefined;
}
export interface GetFindingsStatisticsResponse {
  FindingStatistics: FindingStatistics;
  NextToken?: string | undefined;
}
export type SummaryFormat = "STRING" | "STRUCTURED" | (string & {});
export interface GetInvestigationRequest {
  DetectorId: string;
  InvestigationId: string;
  SummaryFormat?: SummaryFormat | undefined;
}
export type InvestigationStatus = "RUNNING" | "COMPLETED" | "FAILED" | (string & {});
export type TriggeredBy = string;
export interface Product {
  Name?: string | undefined;
  Feature?: string | undefined;
}
export interface InvestigationMetadata {
  Version?: string | undefined;
  Product?: Product | undefined;
}
export type CloudProvider = "AWS" | (string & {});
export interface CloudDetails {
  Provider?: CloudProvider | undefined;
  Region?: string | undefined;
  Account?: string | undefined;
}
export type RiskLevel = "Info" | "Low" | "Medium" | "High" | "Critical" | (string & {});
export type RiskDetails = string;
export type Confidence = "Unknown" | "Low" | "Medium" | "High" | (string & {});
export type InvestigationSummaryText = string;
export type AttackPhaseName =
  | "Reconnaissance"
  | "Resource Development"
  | "Initial Access"
  | "Execution"
  | "Persistence"
  | "Privilege Escalation"
  | "Defense Evasion"
  | "Credential Access"
  | "Discovery"
  | "Lateral Movement"
  | "Collection"
  | "Command and Control"
  | "Exfiltration"
  | "Impact"
  | (string & {});
export type MitreThreatId = string;
export interface ThreatReference {
  Name?: string | undefined;
  Uid?: string | undefined;
}
export interface FindingReference {
  FindingType?: string | undefined;
  Uid?: string | undefined;
}
export type FindingReferences = FindingReference[];
export interface Attack {
  Tactic?: ThreatReference | undefined;
  Technique?: ThreatReference | undefined;
  Findings?: FindingReference[] | undefined;
  Version?: string | undefined;
}
export type Attacks = Attack[];
export interface AttackPhase {
  Phase?: AttackPhaseName | undefined;
  Description?: string | undefined;
  Attacks?: Attack[] | undefined;
}
export type AttackPhases = AttackPhase[];
export interface ThreatAssessment {
  AttackProgression?: AttackPhase[] | undefined;
  ThreatActorProfile?: string | undefined;
}
export type DefenseTactic = "Isolate" | "Evict" | "Restore" | "Harden" | "Detect" | (string & {});
export type ActionPriority = "IMMEDIATE" | "SHORT_TERM" | "STRATEGIC" | (string & {});
export type MitreTechniqueIds = string[];
export type CliCommands = string[];
export type Disposition =
  | "Isolated"
  | "Blocked"
  | "Deleted"
  | "Access Revoked"
  | "Logged"
  | (string & {});
export type InvestigationResourceType =
  | "EC2_INSTANCE"
  | "EBS_VOLUME"
  | "S3_BUCKET"
  | "IAM_ROLE"
  | "IAM_USER"
  | "IAM_ACCESS_KEY"
  | "LAMBDA_FUNCTION"
  | "EKS_CLUSTER"
  | "ECS_CLUSTER"
  | "KUBERNETES_WORKLOAD"
  | "RDS_INSTANCE"
  | "RDS_DB_USER"
  | "EC2_SECURITY_GROUP"
  | (string & {});
export interface AffectedResource {
  Identifier?: string | undefined;
  Type?: InvestigationResourceType | undefined;
  Arn?: string | undefined;
}
export type RemediationAffectedResources = AffectedResource[];
export interface CountermeasureAction {
  Title?: string | undefined;
  Description?: string | undefined;
  Priority?: ActionPriority | undefined;
  DefenseTechnique?: string | undefined;
  Mitigates?: string[] | undefined;
  CliCommands?: string[] | undefined;
  DispositionId?: number | undefined;
  Disposition?: Disposition | undefined;
  AffectedResources?: AffectedResource[] | undefined;
}
export type CountermeasureActions = CountermeasureAction[];
export interface Countermeasure {
  DefenseTactic?: DefenseTactic | undefined;
  Actions?: CountermeasureAction[] | undefined;
  Description?: string | undefined;
}
export type Countermeasures = Countermeasure[];
export interface SeverityBreakdown {
  Critical?: number | undefined;
  High?: number | undefined;
  Medium?: number | undefined;
  Low?: number | undefined;
  Info?: number | undefined;
}
export interface FindingTypeCount {
  FindingType?: string | undefined;
  Count?: number | undefined;
}
export type FindingTypeCounts = FindingTypeCount[];
export interface TimeWindowGroup {
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  FindingCount?: number | undefined;
}
export type TimeWindowGroups = TimeWindowGroup[];
export interface FindingsSummary {
  TotalFindings?: number | undefined;
  SeverityBreakdown?: SeverityBreakdown | undefined;
  TopFindingTypes?: FindingTypeCount[] | undefined;
  ByTimeWindow?: TimeWindowGroup[] | undefined;
}
export type FindingTypeNames = string[];
export interface TechniqueCoverage {
  Technique?: ThreatReference | undefined;
  FindingCount?: number | undefined;
  FindingTypes?: string[] | undefined;
}
export type TechniqueCoverages = TechniqueCoverage[];
export interface TacticCoverage {
  Phase?: AttackPhaseName | undefined;
  FindingCount?: number | undefined;
  FindingTypes?: string[] | undefined;
  Techniques?: TechniqueCoverage[] | undefined;
}
export type TacticCoverages = TacticCoverage[];
export interface AccountAffectedResource {
  Identifier?: string | undefined;
  Type?: InvestigationResourceType | undefined;
  FindingCount?: number | undefined;
}
export type AccountAffectedResources = AccountAffectedResource[];
export interface AccountAnalysis {
  FindingsSummary?: FindingsSummary | undefined;
  TacticCoverage?: TacticCoverage[] | undefined;
  AffectedResources?: AccountAffectedResource[] | undefined;
}
export interface OrganizationFindingsSummary {
  TotalFindings?: number | undefined;
  SeverityBreakdown?: SeverityBreakdown | undefined;
  TopFindingTypes?: FindingTypeCount[] | undefined;
  ByTimeWindow?: TimeWindowGroup[] | undefined;
  TotalAccountCount?: number | undefined;
  AffectedAccountCount?: number | undefined;
}
export interface AccountSummary {
  AccountId?: string | undefined;
  FindingCount?: number | undefined;
}
export type AccountSummaries = AccountSummary[];
export interface OrganizationAnalysis {
  FindingsSummary?: OrganizationFindingsSummary | undefined;
  AccountBreakdown?: AccountSummary[] | undefined;
}
export type InvestigationObservations = string[];
export interface KeyObservations {
  Title?: string | undefined;
  Narrative?: string | undefined;
  Observations?: string[] | undefined;
}
export type RecommendationCategory =
  | "ENABLE_PROTECTION"
  | "FURTHER_INVESTIGATION"
  | "SUPPRESSION_RULE"
  | "HARDENING"
  | "MONITORING"
  | (string & {});
export interface Recommendation {
  Title?: string | undefined;
  Rationale?: string | undefined;
  Category?: RecommendationCategory | undefined;
  Priority?: ActionPriority | undefined;
  CliCommands?: string[] | undefined;
}
export type Recommendations = Recommendation[];
export interface InvestigationSummaryData {
  FindingType?: string | undefined;
  ThreatAssessment?: ThreatAssessment | undefined;
  Countermeasures?: Countermeasure[] | undefined;
  AccountAnalysis?: AccountAnalysis | undefined;
  OrganizationAnalysis?: OrganizationAnalysis | undefined;
  KeyObservations?: KeyObservations | undefined;
  Recommendations?: Recommendation[] | undefined;
}
export type InvestigationType = "FINDING" | "ACCOUNT" | "ORGANIZATION" | (string & {});
export interface QueryTimeWindow {
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
}
export interface InvestigationScope {
  InvestigationType?: InvestigationType | undefined;
  FindingId?: string | undefined;
  AccountId?: string | undefined;
  AdminAccountId?: string | undefined;
  QueryTimeWindow?: QueryTimeWindow | undefined;
}
export type InvestigationErrorDetails = string;
export interface Investigation {
  InvestigationId?: string | undefined;
  Status?: InvestigationStatus | undefined;
  TriggerPrompt?: string | undefined;
  TriggeredBy?: string | undefined;
  Metadata?: InvestigationMetadata | undefined;
  Cloud?: CloudDetails | undefined;
  RiskLevel?: RiskLevel | undefined;
  Risk?: string | undefined;
  Confidence?: Confidence | undefined;
  Summary?: string | undefined;
  SummaryData?: InvestigationSummaryData | undefined;
  Scope?: InvestigationScope | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  Error?: string | undefined;
}
export interface GetInvestigationResponse {
  Investigation: Investigation & {
    InvestigationId: InvestigationId;
    Status: InvestigationStatus;
    TriggerPrompt: TriggerPrompt;
    TriggeredBy: TriggeredBy;
    Metadata: InvestigationMetadata & { Version: string; Product: Product & { Name: string } };
    Cloud: CloudDetails & { Provider: CloudProvider; Region: string; Account: string };
  };
}
export interface GetInvitationsCountRequest {}
export interface GetInvitationsCountResponse {
  InvitationsCount?: number | undefined;
}
export interface GetIPSetRequest {
  DetectorId: string;
  IpSetId?: string | undefined;
}
export type IpSetStatus =
  | "INACTIVE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "ERROR"
  | "DELETE_PENDING"
  | "DELETED"
  | (string & {});
export interface GetIPSetResponse {
  Name: string;
  Format: IpSetFormat;
  Location: string;
  Status: IpSetStatus;
  Tags?: { [key: string]: string | undefined } | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetMalwareProtectionPlanRequest {
  MalwareProtectionPlanId?: string | undefined;
}
export type MalwareProtectionPlanStatus = "ACTIVE" | "WARNING" | "ERROR" | (string & {});
export interface MalwareProtectionPlanStatusReason {
  Code?: string | undefined;
  Message?: string | undefined;
}
export type MalwareProtectionPlanStatusReasonsList = MalwareProtectionPlanStatusReason[];
export interface GetMalwareProtectionPlanResponse {
  Arn?: string | undefined;
  Role?: string | undefined;
  ProtectedResource?: CreateProtectedResource | undefined;
  Actions?: MalwareProtectionPlanActions | undefined;
  CreatedAt?: Date | undefined;
  Status?: MalwareProtectionPlanStatus | undefined;
  StatusReasons?: MalwareProtectionPlanStatusReason[] | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetMalwareScanRequest {
  ScanId?: string | undefined;
}
export type MalwareProtectionResourceType =
  | "EBS_RECOVERY_POINT"
  | "EBS_SNAPSHOT"
  | "EBS_VOLUME"
  | "EC2_AMI"
  | "EC2_INSTANCE"
  | "EC2_RECOVERY_POINT"
  | "S3_RECOVERY_POINT"
  | "S3_BUCKET"
  | "S3_POINT_IN_TIME_RECOVERY"
  | (string & {});
export type NonNegativeInteger = number;
export type MalwareProtectionScanStatus =
  | "RUNNING"
  | "COMPLETED"
  | "COMPLETED_WITH_ISSUES"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export type ScanStatusReason =
  | "ACCESS_DENIED"
  | "RESOURCE_NOT_FOUND"
  | "SNAPSHOT_SIZE_LIMIT_EXCEEDED"
  | "RESOURCE_UNAVAILABLE"
  | "INCONSISTENT_SOURCE"
  | "INCREMENTAL_NO_DIFFERENCE"
  | "NO_EBS_VOLUMES_FOUND"
  | "UNSUPPORTED_PRODUCT_CODE_TYPE"
  | "AMI_SNAPSHOT_LIMIT_EXCEEDED"
  | "UNRELATED_RESOURCES"
  | "BASE_RESOURCE_NOT_SCANNED"
  | "BASE_CREATED_AFTER_TARGET"
  | "UNSUPPORTED_FOR_INCREMENTAL"
  | "UNSUPPORTED_AMI"
  | "UNSUPPORTED_SNAPSHOT"
  | "UNSUPPORTED_COMPOSITE_RECOVERY_POINT"
  | "ALL_FILES_SKIPPED_OR_FAILED"
  | (string & {});
export interface EbsSnapshot {
  DeviceName?: string | undefined;
}
export interface ScannedResourceDetails {
  EbsVolume?: VolumeDetail | undefined;
  EbsSnapshot?: EbsSnapshot | undefined;
}
export interface ScannedResource {
  ScannedResourceArn?: string | undefined;
  ScannedResourceType?: MalwareProtectionResourceType | undefined;
  ScannedResourceStatus?: MalwareProtectionScanStatus | undefined;
  ScanStatusReason?: ScanStatusReason | undefined;
  ResourceDetails?: ScannedResourceDetails | undefined;
}
export type ScannedResources = ScannedResource[];
export interface ScanConfigurationRecoveryPoint {
  BackupVaultName?: string | undefined;
  ContinuousScanDetails?: ScanConfigurationContinuousScanDetails | undefined;
}
export interface ScanConfiguration {
  Role?: string | undefined;
  TriggerDetails?: TriggerDetails | undefined;
  IncrementalScanDetails?: IncrementalScanDetails | undefined;
  RecoveryPoint?: ScanConfigurationRecoveryPoint | undefined;
}
export type ScanResultStatus = "NO_THREATS_FOUND" | "THREATS_FOUND" | (string & {});
export type DetectionSource = "AMAZON" | "BITDEFENDER" | (string & {});
export interface ScanResultThreat {
  Name?: string | undefined;
  Source?: DetectionSource | undefined;
  Count?: number | undefined;
  Hash?: string | undefined;
  ItemDetails?: ItemDetails[] | undefined;
}
export type ScanResultThreats = ScanResultThreat[];
export interface GetMalwareScanResultDetails {
  ScanResultStatus?: ScanResultStatus | undefined;
  SkippedFileCount?: number | undefined;
  FailedFileCount?: number | undefined;
  ThreatFoundFileCount?: number | undefined;
  TotalFileCount?: number | undefined;
  TotalBytes?: number | undefined;
  UniqueThreatCount?: number | undefined;
  Threats?: ScanResultThreat[] | undefined;
}
export interface GetMalwareScanResponse {
  ScanId?: string | undefined;
  DetectorId?: string | undefined;
  AdminDetectorId?: string | undefined;
  ResourceArn?: string | undefined;
  ResourceType?: MalwareProtectionResourceType | undefined;
  ScannedResourcesCount?: number | undefined;
  SkippedResourcesCount?: number | undefined;
  FailedResourcesCount?: number | undefined;
  ScannedResources?: ScannedResource[] | undefined;
  ScanConfiguration?:
    | (ScanConfiguration & {
        IncrementalScanDetails: IncrementalScanDetails & { BaselineResourceArn: NonEmptyString };
      })
    | undefined;
  ScanCategory?: ScanCategory | undefined;
  ScanStatus?: MalwareProtectionScanStatus | undefined;
  ScanStatusReason?: ScanStatusReason | undefined;
  ScanType?: MalwareProtectionScanType | undefined;
  ScanStartedAt?: Date | undefined;
  ScanCompletedAt?: Date | undefined;
  ScanResultDetails?: GetMalwareScanResultDetails | undefined;
}
export interface GetMalwareScanSettingsRequest {
  DetectorId: string;
}
export type ScanCriterionKey = "EC2_INSTANCE_TAG" | (string & {});
export interface ScanConditionPair {
  Key?: string | undefined;
  Value?: string | undefined;
}
export type MapEquals = ScanConditionPair[];
export interface ScanCondition {
  MapEquals?: ScanConditionPair[] | undefined;
}
export type ScanCriterion = { [key in ScanCriterionKey]?: ScanCondition | undefined };
export interface ScanResourceCriteria {
  Include?: { [key: string]: ScanCondition | undefined } | undefined;
  Exclude?: { [key: string]: ScanCondition | undefined } | undefined;
}
export type EbsSnapshotPreservation = "NO_RETENTION" | "RETENTION_WITH_FINDING" | (string & {});
export interface GetMalwareScanSettingsResponse {
  ScanResourceCriteria?:
    | (ScanResourceCriteria & {
        Include: {
          [key: string]:
            | (ScanCondition & { MapEquals: (ScanConditionPair & { Key: TagKey })[] })
            | undefined;
        };
        Exclude: {
          [key: string]:
            | (ScanCondition & { MapEquals: (ScanConditionPair & { Key: TagKey })[] })
            | undefined;
        };
      })
    | undefined;
  EbsSnapshotPreservation?: EbsSnapshotPreservation | undefined;
}
export interface GetMasterAccountRequest {
  DetectorId: string;
}
export interface Master {
  AccountId?: string | undefined;
  InvitationId?: string | undefined;
  RelationshipStatus?: string | undefined;
  InvitedAt?: string | undefined;
}
export interface GetMasterAccountResponse {
  Master: Master;
}
export interface GetMemberDetectorsRequest {
  DetectorId: string;
  AccountIds?: string[] | undefined;
}
export interface MemberAdditionalConfigurationResult {
  Name?: OrgFeatureAdditionalConfiguration | undefined;
  Status?: FeatureStatus | undefined;
  UpdatedAt?: Date | undefined;
  ManagedBy?: ManagedBy | undefined;
}
export type MemberAdditionalConfigurationResults = MemberAdditionalConfigurationResult[];
export interface MemberFeaturesConfigurationResult {
  Name?: OrgFeature | undefined;
  Status?: FeatureStatus | undefined;
  UpdatedAt?: Date | undefined;
  AdditionalConfiguration?: MemberAdditionalConfigurationResult[] | undefined;
  ManagedBy?: ManagedBy | undefined;
}
export type MemberFeaturesConfigurationsResults = MemberFeaturesConfigurationResult[];
export interface MemberDataSourceConfiguration {
  AccountId?: string | undefined;
  DataSources?: DataSourceConfigurationsResult | undefined;
  Features?: MemberFeaturesConfigurationResult[] | undefined;
}
export type MemberDataSourceConfigurations = MemberDataSourceConfiguration[];
export interface GetMemberDetectorsResponse {
  MemberDataSourceConfigurations: (MemberDataSourceConfiguration & {
    AccountId: AccountId;
    DataSources: DataSourceConfigurationsResult & {
      CloudTrail: CloudTrailConfigurationResult & { Status: DataSourceStatus };
      DNSLogs: DNSLogsConfigurationResult & { Status: DataSourceStatus };
      FlowLogs: FlowLogsConfigurationResult & { Status: DataSourceStatus };
      S3Logs: S3LogsConfigurationResult & { Status: DataSourceStatus };
      Kubernetes: KubernetesConfigurationResult & {
        AuditLogs: KubernetesAuditLogsConfigurationResult & { Status: DataSourceStatus };
      };
    };
  })[];
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface GetMembersRequest {
  DetectorId: string;
  AccountIds?: string[] | undefined;
}
export interface Member {
  AccountId?: string | undefined;
  DetectorId?: string | undefined;
  MasterId?: string | undefined;
  Email?: string | redacted.Redacted<string> | undefined;
  RelationshipStatus?: string | undefined;
  InvitedAt?: string | undefined;
  UpdatedAt?: string | undefined;
  AdministratorId?: string | undefined;
}
export type Members = Member[];
export interface GetMembersResponse {
  Members: (Member & {
    AccountId: AccountId;
    MasterId: string;
    Email: Email;
    RelationshipStatus: string;
    UpdatedAt: string;
  })[];
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface GetOrganizationStatisticsRequest {}
export interface OrganizationFeatureStatisticsAdditionalConfiguration {
  Name?: OrgFeatureAdditionalConfiguration | undefined;
  EnabledAccountsCount?: number | undefined;
}
export type OrganizationFeatureStatisticsAdditionalConfigurations =
  OrganizationFeatureStatisticsAdditionalConfiguration[];
export interface OrganizationFeatureStatistics {
  Name?: OrgFeature | undefined;
  EnabledAccountsCount?: number | undefined;
  AdditionalConfiguration?: OrganizationFeatureStatisticsAdditionalConfiguration[] | undefined;
}
export type OrganizationFeatureStatisticsResults = OrganizationFeatureStatistics[];
export interface OrganizationStatistics {
  TotalAccountsCount?: number | undefined;
  MemberAccountsCount?: number | undefined;
  ActiveAccountsCount?: number | undefined;
  EnabledAccountsCount?: number | undefined;
  CountByFeature?: OrganizationFeatureStatistics[] | undefined;
}
export interface OrganizationDetails {
  UpdatedAt?: Date | undefined;
  OrganizationStatistics?: OrganizationStatistics | undefined;
}
export interface GetOrganizationStatisticsResponse {
  OrganizationDetails?: OrganizationDetails | undefined;
}
export interface GetRemainingFreeTrialDaysRequest {
  DetectorId: string;
  AccountIds: string[];
}
export interface DataSourceFreeTrial {
  FreeTrialDaysRemaining?: number | undefined;
}
export interface KubernetesDataSourceFreeTrial {
  AuditLogs?: DataSourceFreeTrial | undefined;
}
export interface MalwareProtectionDataSourceFreeTrial {
  ScanEc2InstanceWithFindings?: DataSourceFreeTrial | undefined;
}
export interface DataSourcesFreeTrial {
  CloudTrail?: DataSourceFreeTrial | undefined;
  DnsLogs?: DataSourceFreeTrial | undefined;
  FlowLogs?: DataSourceFreeTrial | undefined;
  S3Logs?: DataSourceFreeTrial | undefined;
  Kubernetes?: KubernetesDataSourceFreeTrial | undefined;
  MalwareProtection?: MalwareProtectionDataSourceFreeTrial | undefined;
}
export type FreeTrialFeatureResult =
  | "FLOW_LOGS"
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "EC2_RUNTIME_MONITORING"
  | "FARGATE_RUNTIME_MONITORING"
  | "AI_PROTECTION"
  | (string & {});
export interface FreeTrialFeatureConfigurationResult {
  Name?: FreeTrialFeatureResult | undefined;
  FreeTrialDaysRemaining?: number | undefined;
}
export type FreeTrialFeatureConfigurationsResults = FreeTrialFeatureConfigurationResult[];
export interface AccountFreeTrialInfo {
  AccountId?: string | undefined;
  DataSources?: DataSourcesFreeTrial | undefined;
  Features?: FreeTrialFeatureConfigurationResult[] | undefined;
}
export type AccountFreeTrialInfos = AccountFreeTrialInfo[];
export interface GetRemainingFreeTrialDaysResponse {
  Accounts?: AccountFreeTrialInfo[] | undefined;
  UnprocessedAccounts?:
    | (UnprocessedAccount & { AccountId: AccountId; Result: string })[]
    | undefined;
}
export interface GetThreatEntitySetRequest {
  DetectorId: string;
  ThreatEntitySetId?: string | undefined;
}
export type ThreatEntitySetStatus =
  | "INACTIVE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "ERROR"
  | "DELETE_PENDING"
  | "DELETED"
  | (string & {});
export interface GetThreatEntitySetResponse {
  Name: string;
  Format: ThreatEntitySetFormat;
  Location: string;
  ExpectedBucketOwner?: string | undefined;
  Status: ThreatEntitySetStatus;
  Tags?: { [key: string]: string | undefined } | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  ErrorDetails?: string | undefined;
}
export interface GetThreatIntelSetRequest {
  DetectorId: string;
  ThreatIntelSetId: string;
}
export type ThreatIntelSetStatus =
  | "INACTIVE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "ERROR"
  | "DELETE_PENDING"
  | "DELETED"
  | (string & {});
export interface GetThreatIntelSetResponse {
  Name: string;
  Format: ThreatIntelSetFormat;
  Location: string;
  Status: ThreatIntelSetStatus;
  Tags?: { [key: string]: string | undefined } | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetTrustedEntitySetRequest {
  DetectorId: string;
  TrustedEntitySetId: string;
}
export type TrustedEntitySetStatus =
  | "INACTIVE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "ERROR"
  | "DELETE_PENDING"
  | "DELETED"
  | (string & {});
export interface GetTrustedEntitySetResponse {
  Name: string;
  Format: TrustedEntitySetFormat;
  Location: string;
  ExpectedBucketOwner?: string | undefined;
  Status: TrustedEntitySetStatus;
  Tags?: { [key: string]: string | undefined } | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  ErrorDetails?: string | undefined;
}
export type UsageStatisticType =
  | "SUM_BY_ACCOUNT"
  | "SUM_BY_DATA_SOURCE"
  | "SUM_BY_RESOURCE"
  | "TOP_RESOURCES"
  | "SUM_BY_FEATURES"
  | "TOP_ACCOUNTS_BY_FEATURE"
  | (string & {});
export type DataSource =
  | "FLOW_LOGS"
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "S3_LOGS"
  | "KUBERNETES_AUDIT_LOGS"
  | "EC2_MALWARE_SCAN"
  | (string & {});
export type DataSourceList = DataSource[];
export type ResourceList = string[];
export type UsageFeature =
  | "FLOW_LOGS"
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "EC2_RUNTIME_MONITORING"
  | "FARGATE_RUNTIME_MONITORING"
  | "RDS_DBI_PROTECTION_PROVISIONED"
  | "RDS_DBI_PROTECTION_SERVERLESS"
  | "RDS_DBI_PROTECTION_LIMITLESS"
  | "RDS_DATA_ACTIVITY_DBI_PROTECTION_PROVISIONED"
  | "RDS_DATA_ACTIVITY_DBI_PROTECTION_SERVERLESS"
  | "RDS_DATA_ACTIVITY_DBI_PROTECTION_LIMITLESS"
  | "AI_PROTECTION"
  | (string & {});
export type UsageFeatureList = UsageFeature[];
export interface UsageCriteria {
  AccountIds?: string[] | undefined;
  DataSources?: DataSource[] | undefined;
  Resources?: string[] | undefined;
  Features?: UsageFeature[] | undefined;
}
export interface GetUsageStatisticsRequest {
  DetectorId: string;
  UsageStatisticType?: UsageStatisticType | undefined;
  UsageCriteria?: UsageCriteria | undefined;
  Unit?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface Total {
  Amount?: string | undefined;
  Unit?: string | undefined;
}
export interface UsageAccountResult {
  AccountId?: string | undefined;
  Total?: Total | undefined;
}
export type UsageAccountResultList = UsageAccountResult[];
export interface UsageTopAccountResult {
  AccountId?: string | undefined;
  Total?: Total | undefined;
}
export type UsageTopAccountsByFeatureList = UsageTopAccountResult[];
export interface UsageTopAccountsResult {
  Feature?: UsageFeature | undefined;
  Accounts?: UsageTopAccountResult[] | undefined;
}
export type UsageTopAccountsResultList = UsageTopAccountsResult[];
export interface UsageDataSourceResult {
  DataSource?: DataSource | undefined;
  Total?: Total | undefined;
}
export type UsageDataSourceResultList = UsageDataSourceResult[];
export interface UsageResourceResult {
  Resource?: string | undefined;
  Total?: Total | undefined;
}
export type UsageResourceResultList = UsageResourceResult[];
export interface UsageFeatureResult {
  Feature?: UsageFeature | undefined;
  Total?: Total | undefined;
}
export type UsageFeatureResultList = UsageFeatureResult[];
export interface UsageStatistics {
  SumByAccount?: UsageAccountResult[] | undefined;
  TopAccountsByFeature?: UsageTopAccountsResult[] | undefined;
  SumByDataSource?: UsageDataSourceResult[] | undefined;
  SumByResource?: UsageResourceResult[] | undefined;
  TopResources?: UsageResourceResult[] | undefined;
  SumByFeature?: UsageFeatureResult[] | undefined;
}
export interface GetUsageStatisticsResponse {
  UsageStatistics?: UsageStatistics | undefined;
  NextToken?: string | undefined;
}
export interface InviteMembersRequest {
  DetectorId: string;
  AccountIds?: string[] | undefined;
  DisableEmailNotification?: boolean | undefined;
  Message?: string | undefined;
}
export interface InviteMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export type CoverageSortKey =
  | "ACCOUNT_ID"
  | "COVERAGE_STATUS"
  | "ISSUE"
  | "ADDON_VERSION"
  | "UPDATED_AT"
  | "CLUSTER_NAME"
  | "EKS_CLUSTER_NAME"
  | "ECS_CLUSTER_NAME"
  | "INSTANCE_ID"
  | (string & {});
export interface CoverageSortCriteria {
  AttributeName?: CoverageSortKey | undefined;
  OrderBy?: OrderBy | undefined;
}
export interface ListCoverageRequest {
  DetectorId: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  FilterCriteria?: CoverageFilterCriteria | undefined;
  SortCriteria?: CoverageSortCriteria | undefined;
}
export interface AddonDetails {
  AddonVersion?: string | undefined;
  AddonStatus?: string | undefined;
}
export type ManagementType = "AUTO_MANAGED" | "MANUAL" | "DISABLED" | (string & {});
export interface CoverageEksClusterDetails {
  ClusterName?: string | undefined;
  CoveredNodes?: number | undefined;
  CompatibleNodes?: number | undefined;
  AddonDetails?: AddonDetails | undefined;
  ManagementType?: ManagementType | undefined;
}
export type Issues = string[];
export interface FargateDetails {
  Issues?: string[] | undefined;
  ManagementType?: ManagementType | undefined;
}
export interface ContainerInstanceDetails {
  CoveredContainerInstances?: number | undefined;
  CompatibleContainerInstances?: number | undefined;
}
export interface CoverageEcsClusterDetails {
  ClusterName?: string | undefined;
  FargateDetails?: FargateDetails | undefined;
  ContainerInstanceDetails?: ContainerInstanceDetails | undefined;
}
export interface AgentDetails {
  Version?: string | undefined;
}
export interface CoverageEc2InstanceDetails {
  InstanceId?: string | undefined;
  InstanceType?: string | undefined;
  ClusterArn?: string | undefined;
  AgentDetails?: AgentDetails | undefined;
  ManagementType?: ManagementType | undefined;
}
export interface CoverageResourceDetails {
  EksClusterDetails?: CoverageEksClusterDetails | undefined;
  EcsClusterDetails?: CoverageEcsClusterDetails | undefined;
  Ec2InstanceDetails?: CoverageEc2InstanceDetails | undefined;
  ResourceType?: ResourceType | undefined;
}
export interface CoverageResource {
  ResourceId?: string | undefined;
  DetectorId?: string | undefined;
  AccountId?: string | undefined;
  ResourceDetails?: CoverageResourceDetails | undefined;
  CoverageStatus?: CoverageStatus | undefined;
  Issue?: string | undefined;
  UpdatedAt?: Date | undefined;
}
export type CoverageResources = CoverageResource[];
export interface ListCoverageResponse {
  Resources: CoverageResource[];
  NextToken?: string | undefined;
}
export type DetectionRuleMaxResults = number;
export interface ListCustomDetectionRuleAssociationsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  RuleId?: string | undefined;
  Mode?: AssociationMode | undefined;
}
export interface AssociationSummary {
  AssociationId?: string | undefined;
  Arn?: string | undefined;
  RuleId?: string | undefined;
  Mode?: AssociationMode | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  ExpiresAt?: Date | undefined;
}
export type AssociationSummaryList = AssociationSummary[];
export interface ListCustomDetectionRuleAssociationsResponse {
  RuleAssociations: (AssociationSummary & {
    AssociationId: AssociationId;
    Arn: DetectionRuleArn;
    RuleId: RuleId;
    Mode: AssociationMode;
    CreatedAt: Date;
    UpdatedAt: Date;
  })[];
  NextToken?: string | undefined;
}
export interface ListCustomDetectionRuleOrgConfigurationsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Status?: DetectionRuleConfigurationStatus | undefined;
}
export interface DetectionRuleOrgConfigurationSummary {
  RuleId?: string | undefined;
  Mode?: AssociationMode | undefined;
  Status?: DetectionRuleConfigurationStatus | undefined;
  StatusReason?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  ExpiresAt?: Date | undefined;
}
export type DetectionRuleOrgConfigurationSummaryList = DetectionRuleOrgConfigurationSummary[];
export interface ListCustomDetectionRuleOrgConfigurationsResponse {
  Configurations: (DetectionRuleOrgConfigurationSummary & {
    RuleId: RuleId;
    Mode: AssociationMode;
    Status: DetectionRuleConfigurationStatus;
    CreatedAt: Date;
    UpdatedAt: Date;
  })[];
  NextToken?: string | undefined;
}
export type FilterFieldName =
  | "name"
  | "description"
  | "dataSource"
  | "severity"
  | "tactic"
  | "technique"
  | "service"
  | (string & {});
export type DetectionRuleFilterValue = string;
export type DetectionRuleFilterValues = string[];
export type DetectionRuleFilterCondition = "EQUALS" | "CONTAINS" | (string & {});
export interface DetectionRuleFilter {
  Name?: FilterFieldName | undefined;
  Values?: string[] | undefined;
  Condition?: DetectionRuleFilterCondition | undefined;
}
export type DetectionRuleFilterList = DetectionRuleFilter[];
export interface ListCustomDetectionRulesRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: DetectionRuleFilter[] | undefined;
}
export interface RuleSummary {
  RuleId?: string | undefined;
  Arn?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  Severity?: DetectionRuleSeverity | undefined;
  DataSource?: DetectionRuleDataSource | undefined;
  Tactic?: string | undefined;
  Technique?: string | undefined;
  Service?: string | undefined;
  Language?: RuleLanguage | undefined;
  Schema?: RuleSchema | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export type RuleSummaryList = RuleSummary[];
export interface ListCustomDetectionRulesResponse {
  Rules: (RuleSummary & {
    RuleId: RuleId;
    Arn: DetectionRuleArn;
    Name: RuleName;
    Description: DetectionRuleDescription;
    Severity: DetectionRuleSeverity;
    DataSource: DetectionRuleDataSource;
    Tactic: MitreTactic;
    Technique: MitreTechnique;
    Service: DetectionRuleServiceName;
    CreatedAt: Date;
  })[];
  NextToken?: string | undefined;
}
export interface ListDetectorsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type DetectorIds = string[];
export interface ListDetectorsResponse {
  DetectorIds: string[];
  NextToken?: string | undefined;
}
export interface ListFiltersRequest {
  DetectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type FilterNames = string[];
export interface ListFiltersResponse {
  FilterNames: string[];
  NextToken?: string | undefined;
}
export interface ListFindingsRequest {
  DetectorId: string;
  FindingCriteria?: FindingCriteria | undefined;
  SortCriteria?: SortCriteria | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListFindingsResponse {
  FindingIds: string[];
  NextToken?: string | undefined;
}
export type RecordType =
  | "OBSERVATION"
  | "ANALYSIS"
  | "UPDATE"
  | "FETCH"
  | "METADATA"
  | (string & {});
export type RecordTypes = RecordType[];
export type NextToken = string;
export interface ListInvestigationRecordsRequest {
  DetectorId: string;
  InvestigationId?: string | undefined;
  RecordTypes?: RecordType[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type RecordId = string;
export type RecordTitle = string;
export type Narrative = string;
export type FetchType =
  | "FINDINGS"
  | "DETECTOR"
  | "REPUTATION"
  | "FINDING_TYPE_DOCUMENTATION"
  | "CLOUD_TRAIL_RAW_EVENTS"
  | "RUNTIME_SIGNALS"
  | "MEMBER_ACCOUNTS"
  | (string & {});
export type FetchFieldName = string;
export type FetchCriterionCondition =
  | "EQUALS"
  | "NOT_EQUALS"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUAL"
  | (string & {});
export type FetchFieldValue = string;
export type FetchFieldValues = string[];
export interface FetchCriterion {
  Field?: string | undefined;
  Condition?: FetchCriterionCondition | undefined;
  Values?: string[] | undefined;
}
export type FetchCriteria = FetchCriterion[];
export type FetchDurationInMinutes = number;
export interface FetchTimeWindow {
  StartedAt?: Date | undefined;
  DurationInMinutes?: number | undefined;
}
export type FetchRowLimit = number;
export type IndicatorValue = string | redacted.Redacted<string>;
export type InvestigationIndicatorType = "IP" | "DOMAIN" | "FILE" | (string & {});
export interface FetchQuery {
  Criteria?: FetchCriterion[] | undefined;
  TimeWindow?: FetchTimeWindow | undefined;
  RowLimit?: number | undefined;
  AccountId?: string | undefined;
  Indicator?: string | redacted.Redacted<string> | undefined;
  IndicatorType?: InvestigationIndicatorType | undefined;
  FindingType?: string | undefined;
  FindingId?: string | undefined;
}
export type FetchItemId = string;
export type FetchItemIds = string[];
export type Count = number;
export type InvestigationDetectorFeature =
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "FLOW_LOGS"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "EKS_RUNTIME_MONITORING"
  | "EKS_ADDON_MANAGEMENT"
  | "LAMBDA_NETWORK_LOGS"
  | "RUNTIME_MONITORING"
  | "ECS_FARGATE_AGENT_MANAGEMENT"
  | "EC2_AGENT_MANAGEMENT"
  | (string & {});
export interface InvestigationDetectorFeatureConfiguration {
  Name?: InvestigationDetectorFeature | undefined;
  Status?: FeatureStatus | undefined;
  UpdatedAt?: Date | undefined;
}
export type FetchDetectorFeatures = InvestigationDetectorFeatureConfiguration[];
export type FetchVerdict = "THREAT" | "BENIGN" | "NEUTRAL" | (string & {});
export type InvestigationText = string;
export type FetchLearnMoreLink = string;
export type FetchLearnMoreLinks = string[];
export interface FindingTypeDocumentation {
  Description?: string | undefined;
  Severity?: string | undefined;
  Feature?: string | undefined;
  FullDescription?: string | undefined;
  Remediation?: string | undefined;
  LearnMoreLinks?: string[] | undefined;
}
export interface FetchResult {
  ItemIds?: string[] | undefined;
  TotalCount?: number | undefined;
  Features?: InvestigationDetectorFeatureConfiguration[] | undefined;
  Verdict?: FetchVerdict | undefined;
  Documentation?: FindingTypeDocumentation | undefined;
}
export interface FetchRecord {
  FetchType?: FetchType | undefined;
  Query?: FetchQuery | undefined;
  Result?: FetchResult | undefined;
}
export type AnalysisType =
  | "REPUTATION"
  | "THREAT_ASSESSMENT"
  | "RDS_THREAT_ASSESSMENT"
  | "KUBERNETES_POLICY_VIOLATION"
  | "S3_EXPOSURE"
  | "S3_ACTOR_CONTEXT"
  | "S3_PEN_TEST"
  | "PROCESS_LINEAGE"
  | "TREND"
  | "BASELINE"
  | (string & {});
export interface Reputation {
  FindingTimeDisposition?: string | undefined;
  CurrentDisposition?: string | undefined;
  ReputationComparison?: string | undefined;
}
export type ThreatConfidence = "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
export interface InvestigationThreatAssessment {
  Reputation?: Reputation | undefined;
  ThreatConfidence?: ThreatConfidence | undefined;
  Classification?: string | undefined;
  Assessment?: string | undefined;
  AuthenticationContext?: string | undefined;
  RdsControlPlaneActivity?: string | undefined;
  IpAccountActivity?: string | undefined;
  CredentialCompromise?: string | undefined;
}
export interface KubernetesPolicyViolation {
  ViolationType?: string | undefined;
  AffectedResource?: string | undefined;
  Subject?: string | undefined;
  GrantedAccess?: string | undefined;
  ExposureVector?: string | undefined;
  MisconfigurationImpact?: string | undefined;
}
export interface S3Analysis {
  FindingSubtype?: string | undefined;
  EffectivePermission?: string | undefined;
  BlockPublicAccessSettings?: string | undefined;
  Exposure?: string | undefined;
  UserAgent?: string | undefined;
  UserAgentClassification?: string | undefined;
  SourceIp?: string | undefined;
  IpReputation?: string | undefined;
  ActorAssessment?: string | undefined;
  S3ApiActivity?: string | undefined;
  SourceContext?: string | undefined;
  AuthorizationAssessment?: string | undefined;
}
export interface Process {
  Uuid?: string | undefined;
  Name?: string | undefined;
  Path?: string | undefined;
  ParentUuid?: string | undefined;
  Findings?: FindingReference[] | undefined;
}
export type Processes = Process[];
export type TimeGranularity = "DAY" | "WEEK" | "MONTH" | (string & {});
export interface Trend {
  Granularity?: TimeGranularity | undefined;
  StartedAt?: Date | undefined;
  EndedAt?: Date | undefined;
  TotalFindings?: number | undefined;
  ByTimeWindow?: TimeWindowGroup[] | undefined;
}
export type Percentage = number;
export interface FindingTypeClassification {
  FindingType?: string | undefined;
  Classification?: string | undefined;
  Count?: number | undefined;
  Percentage?: number | undefined;
  Description?: string | undefined;
}
export type FindingTypeClassifications = FindingTypeClassification[];
export interface Baseline {
  TotalFindings?: number | undefined;
  BaselineFindings?: FindingTypeClassification[] | undefined;
  AnomalousFindings?: FindingTypeClassification[] | undefined;
}
export interface InvestigationAccountAnalysis {
  Trend?: Trend | undefined;
  Baseline?: Baseline | undefined;
}
export interface InvestigationIndicator {
  Value?: string | redacted.Redacted<string> | undefined;
  Type?: InvestigationIndicatorType | undefined;
}
export type InvestigationIndicators = InvestigationIndicator[];
export interface AnalysisRecord {
  AnalysisType?: AnalysisType | undefined;
  ThreatAssessment?: InvestigationThreatAssessment | undefined;
  KubernetesPolicyViolation?: KubernetesPolicyViolation | undefined;
  S3Analysis?: S3Analysis | undefined;
  Processes?: Process[] | undefined;
  AccountAnalysis?: InvestigationAccountAnalysis | undefined;
  Indicators?: InvestigationIndicator[] | undefined;
}
export type ObservationType =
  | "FINDING_DETAIL"
  | "RESOURCE"
  | "NETWORK_ACTIVITY"
  | "RDS_LOGIN_ACTIVITY"
  | "S3_ACTIVITY"
  | "KUBERNETES_ACTIVITY"
  | "MALWARE_SCAN"
  | "RELATED_FINDINGS"
  | "DETECTION_COVERAGE"
  | "ACCOUNT_OVERVIEW"
  | "RECOMMENDATION"
  | "RUNTIME_SIGNALS"
  | "DISTRIBUTION"
  | "REPRESENTATIVE_RESOURCE"
  | (string & {});
export interface ActivityWindow {
  FirstSeenAt?: Date | undefined;
  LastSeenAt?: Date | undefined;
}
export interface FindingDetail {
  FindingId?: string | undefined;
  FindingType?: string | undefined;
  Severity?: string | undefined;
  AccountId?: string | undefined;
  Region?: string | undefined;
  ActivityWindow?: ActivityWindow | undefined;
}
export interface InvestigationEc2Instance {
  InstanceId?: string | undefined;
  InstanceType?: string | undefined;
  InstanceState?: string | undefined;
  AvailabilityZone?: string | undefined;
  PrivateIpAddress?: string | redacted.Redacted<string> | undefined;
  PublicIp?: string | undefined;
  VpcId?: string | undefined;
  SubnetId?: string | undefined;
  ImageId?: string | undefined;
  LaunchedAt?: Date | undefined;
}
export interface LambdaFunction {
  FunctionName?: string | undefined;
  FunctionArn?: string | undefined;
  FunctionVersion?: string | undefined;
  Role?: string | undefined;
  Description?: string | undefined;
  RevisionId?: string | undefined;
  UpdatedAt?: Date | undefined;
  VpcConfigurationSummary?: string | undefined;
}
export interface RdsDbInstance {
  DbInstanceIdentifier?: string | undefined;
  DbClusterIdentifier?: string | undefined;
  DbInstanceArn?: string | undefined;
  DbiResourceId?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
}
export interface RdsDbUser {
  User?: string | undefined;
  Application?: string | undefined;
  Database?: string | undefined;
  AuthMethod?: string | undefined;
  Ssl?: string | undefined;
}
export interface InvestigationEksCluster {
  Name?: string | undefined;
  Arn?: string | undefined;
  Status?: string | undefined;
  VpcId?: string | undefined;
}
export interface InvestigationEcsCluster {
  Name?: string | undefined;
  Arn?: string | undefined;
  Status?: string | undefined;
}
export interface InvestigationResourceData {
  Ec2Instance?: InvestigationEc2Instance | undefined;
  LambdaFunction?: LambdaFunction | undefined;
  RdsDbInstance?: RdsDbInstance | undefined;
  RdsDbUser?: RdsDbUser | undefined;
  EksCluster?: InvestigationEksCluster | undefined;
  EcsCluster?: InvestigationEcsCluster | undefined;
}
export interface InvestigationResource {
  Uid?: string | undefined;
  Name?: string | undefined;
  ResourceType?: InvestigationResourceType | undefined;
  Data?: InvestigationResourceData | undefined;
}
export interface NetworkPorts {
  TargetPort?: string | undefined;
  RemotePort?: string | undefined;
  ResolverPort?: string | undefined;
  Ports?: string | undefined;
  PortsUsed?: string | undefined;
  PortCount?: number | undefined;
}
export interface NetworkTraffic {
  BytesSent?: number | undefined;
  BytesReceived?: number | undefined;
}
export interface NetworkAnomaly {
  BaselineBytes?: string | undefined;
  Deviation?: string | undefined;
  ProfileAgeDays?: number | undefined;
  RemoteService?: string | undefined;
  RemoteRegion?: string | undefined;
  Duration?: string | undefined;
  ResetRatio?: string | undefined;
  TargetHostCount?: number | undefined;
}
export interface DnsContext {
  DomainSuffix?: string | undefined;
  OtherDomains?: string | undefined;
  ResolverHistory?: string | undefined;
}
export interface NetworkCounts {
  RequestCount?: number | undefined;
  TotalAttempts?: number | undefined;
  SuspiciousAttempts?: number | undefined;
  ResetAttempts?: number | undefined;
}
export interface Enrichment {
  CountryName?: string | undefined;
  AsnOrg?: string | undefined;
  ThreatListName?: string | undefined;
  ThreatName?: string | undefined;
}
export interface NetworkActivity {
  Protocol?: string | undefined;
  Direction?: string | undefined;
  Method?: string | undefined;
  Blocked?: string | undefined;
  Platform?: string | undefined;
  Ports?: NetworkPorts | undefined;
  Traffic?: NetworkTraffic | undefined;
  Anomaly?: NetworkAnomaly | undefined;
  Dns?: DnsContext | undefined;
  Counts?: NetworkCounts | undefined;
  Enrichment?: Enrichment | undefined;
}
export interface RdsLoginActivity {
  Outcome?: string | undefined;
  Rate?: string | undefined;
  AnomalyContext?: string | undefined;
  LoginCount?: number | undefined;
  ActivityWindow?: ActivityWindow | undefined;
  Enrichment?: Enrichment | undefined;
}
export interface InvestigationActor {
  AccessKeyId?: string | undefined;
  PrincipalId?: string | undefined;
  UserName?: string | undefined;
  UserType?: string | undefined;
  UserAgent?: string | undefined;
}
export interface S3Activity {
  Api?: string | undefined;
  AffectedBucket?: string | undefined;
  OtherS3Activity?: string | undefined;
  NonS3Activity?: string | undefined;
  SessionAssessment?: string | undefined;
  EventCount?: number | undefined;
  Actor?: InvestigationActor | undefined;
  SourceIp?: string | undefined;
  Enrichment?: Enrichment | undefined;
  ActivityWindow?: ActivityWindow | undefined;
}
export interface KubernetesApiCall {
  ClusterName?: string | undefined;
  Username?: string | undefined;
  UserGroups?: string | undefined;
  UserId?: string | undefined;
  Verb?: string | undefined;
  ResourceType?: string | undefined;
  ResourceName?: string | undefined;
  Namespace?: string | undefined;
  RequestUri?: string | undefined;
  StatusCode?: number | undefined;
  SourceIps?: string | undefined;
  UserAgent?: string | undefined;
  EventCount?: number | undefined;
}
export interface KubernetesAnomaly {
  UnusualBehavior?: string | undefined;
  BaselineContext?: string | undefined;
  AnomalyScore?: string | undefined;
  TrainingPeriod?: string | undefined;
}
export interface InvestigationKubernetesWorkload {
  WorkloadType?: string | undefined;
  WorkloadName?: string | undefined;
  Containers?: string | undefined;
  Volumes?: string | undefined;
  SecurityContext?: string | undefined;
}
export interface KubernetesActivity {
  ApiCall?: KubernetesApiCall | undefined;
  Anomaly?: KubernetesAnomaly | undefined;
  Workload?: InvestigationKubernetesWorkload | undefined;
  Enrichment?: Enrichment | undefined;
}
export interface MalwareThreat {
  Name?: string | undefined;
  Severity?: string | undefined;
  InfectedFileCount?: number | undefined;
  SampleFiles?: string | undefined;
}
export type MalwareThreats = MalwareThreat[];
export interface InvestigationMalwareScan {
  ScanId?: string | undefined;
  ScanType?: MalwareProtectionScanType | undefined;
  ScanCategory?: ScanCategory | undefined;
  TriggerFindingId?: string | undefined;
  EngineSources?: string | undefined;
  ScanStartedAt?: Date | undefined;
  ScanCompletedAt?: Date | undefined;
  FilesScanned?: number | undefined;
  GigabytesScanned?: number | undefined;
  VolumesScanned?: number | undefined;
  InfectedFileCount?: number | undefined;
  ResourceType?: string | undefined;
  ResourceIdentifier?: string | undefined;
  HighestSeverity?: string | undefined;
  HighestSeverityThreatName?: string | undefined;
  UniqueThreatCount?: number | undefined;
  TotalInfectedItems?: number | undefined;
  Threats?: MalwareThreat[] | undefined;
}
export type SeverityScore = number;
export type CorrelationReason = "HIGH_SEVERITY" | "SAME_RESOURCE" | "SAME_BEHAVIOR" | (string & {});
export type CorrelationReasons = CorrelationReason[];
export type RelatedFindingIds = string[];
export interface SharedResource {
  ResourceType?: string | undefined;
  Identifier?: string | undefined;
}
export type SharedResources = SharedResource[];
export interface SharedBehavior {
  Path?: string | undefined;
  Value?: string | undefined;
}
export type SharedBehaviors = SharedBehavior[];
export interface CorrelatedFinding {
  FindingType?: string | undefined;
  Count?: number | undefined;
  SeverityMax?: number | undefined;
  CorrelationReasons?: CorrelationReason[] | undefined;
  FindingIds?: string[] | undefined;
  SharedResources?: SharedResource[] | undefined;
  SharedBehaviors?: SharedBehavior[] | undefined;
}
export type CorrelatedFindings = CorrelatedFinding[];
export interface ObservedFindingType {
  FindingType?: string | undefined;
  Count?: number | undefined;
  SeverityMax?: number | undefined;
  SharedResources?: SharedResource[] | undefined;
}
export type ObservedFindingTypes = ObservedFindingType[];
export interface RelatedFindings {
  Correlated?: CorrelatedFinding[] | undefined;
  Observed?: ObservedFindingType[] | undefined;
}
export interface ProtectionPlan {
  Name?: InvestigationDetectorFeature | undefined;
  Status?: FeatureStatus | undefined;
}
export type ProtectionPlans = ProtectionPlan[];
export type FoundationalDataSources = InvestigationDetectorFeature[];
export interface DetectionCoverage {
  ProtectionPlans?: ProtectionPlan[] | undefined;
  FoundationalDataSources?: InvestigationDetectorFeature[] | undefined;
  CoverageGaps?: string | undefined;
  KeyObservation?: string | undefined;
}
export interface MemberAccountRanking {
  Rank?: number | undefined;
  AccountId?: string | undefined;
  FindingCount?: number | undefined;
  RiskLevel?: RiskLevel | undefined;
  RiskRationale?: string | undefined;
}
export type MemberAccountRankings = MemberAccountRanking[];
export interface AccountOverview {
  AccountId?: string | undefined;
  AccountStatus?: string | undefined;
  DetectorId?: string | undefined;
  Region?: string | undefined;
  DelegatedAdminAccountId?: string | undefined;
  TotalMemberAccounts?: number | undefined;
  TotalFindings?: number | undefined;
  AffectedAccountCount?: number | undefined;
  AccountRankings?: MemberAccountRanking[] | undefined;
}
export interface SignalGroup {
  FindingType?: string | undefined;
  Severity?: number | undefined;
  Count?: number | undefined;
}
export type SignalGroups = SignalGroup[];
export interface RuntimeSignals {
  SignalGroups?: SignalGroup[] | undefined;
  KeyObservation?: string | undefined;
}
export type DistributionDimension =
  | "SEVERITY"
  | "TYPE"
  | "RESOURCE"
  | "ATTACK_VECTOR"
  | "ARCHIVE"
  | (string & {});
export interface TypeDistribution {
  FindingType?: string | undefined;
  Count?: number | undefined;
  Percentage?: number | undefined;
  DominantSeverity?: string | undefined;
}
export type TypeDistributions = TypeDistribution[];
export interface ResourceDistribution {
  ResourceType?: string | undefined;
  Identifier?: string | undefined;
  Count?: number | undefined;
}
export type ResourceDistributions = ResourceDistribution[];
export interface ArchiveDistribution {
  ArchivedCount?: number | undefined;
  UnarchivedCount?: number | undefined;
  ArchivedPercentage?: number | undefined;
  UnarchivedPercentage?: number | undefined;
}
export interface Distribution {
  Dimension?: DistributionDimension | undefined;
  TotalFindings?: number | undefined;
  SeverityBreakdown?: SeverityBreakdown | undefined;
  FindingTypes?: TypeDistribution[] | undefined;
  TopFindingTypes?: FindingTypeCount[] | undefined;
  Resources?: ResourceDistribution[] | undefined;
  AttackVectors?: TacticCoverage[] | undefined;
  Archive?: ArchiveDistribution | undefined;
}
export interface RepresentativeFinding {
  ResourceType?: string | undefined;
  Identifier?: string | undefined;
  FindingId?: string | undefined;
  FindingCount?: number | undefined;
  RiskLevel?: RiskLevel | undefined;
  RiskRationale?: string | undefined;
}
export type RepresentativeFindings = RepresentativeFinding[];
export interface ObservationRecord {
  ObservationType?: ObservationType | undefined;
  FindingDetail?: FindingDetail | undefined;
  Resource?: InvestigationResource | undefined;
  NetworkActivity?: NetworkActivity | undefined;
  RdsLoginActivity?: RdsLoginActivity | undefined;
  S3Activity?: S3Activity | undefined;
  KubernetesActivity?: KubernetesActivity | undefined;
  MalwareScan?: InvestigationMalwareScan | undefined;
  RelatedFindings?: RelatedFindings | undefined;
  DetectionCoverage?: DetectionCoverage | undefined;
  AccountOverview?: AccountOverview | undefined;
  Recommendations?: Recommendation[] | undefined;
  RuntimeSignals?: RuntimeSignals | undefined;
  Distribution?: Distribution | undefined;
  RepresentativeResources?: RepresentativeFinding[] | undefined;
  Indicators?: InvestigationIndicator[] | undefined;
}
export type MetadataTotalTimeMilliseconds = number;
export interface MetadataRecord {
  TotalTimeMilliseconds?: number | undefined;
}
export type SupportingData =
  | { Fetch: FetchRecord; Analysis?: undefined; Observation?: undefined; Metadata?: undefined }
  | { Fetch?: undefined; Analysis: AnalysisRecord; Observation?: undefined; Metadata?: undefined }
  | {
      Fetch?: undefined;
      Analysis?: undefined;
      Observation: ObservationRecord;
      Metadata?: undefined;
    }
  | { Fetch?: undefined; Analysis?: undefined; Observation?: undefined; Metadata: MetadataRecord };
export interface InvestigationRecord {
  RecordId?: string | undefined;
  Type?: RecordType | undefined;
  Title?: string | undefined;
  Narrative?: string | undefined;
  CreatedAt?: Date | undefined;
  SupportingData?: SupportingData | undefined;
}
export type Records = InvestigationRecord[];
export interface ListInvestigationRecordsResponse {
  InvestigationId: string;
  Status: InvestigationStatus;
  Records: (InvestigationRecord & {
    RecordId: RecordId;
    Type: RecordType;
    Title: RecordTitle;
    CreatedAt: Date;
  })[];
  NextToken?: string | undefined;
}
export type InvestigationFilterCriterionKey =
  | "STATUS"
  | "RISK_LEVEL"
  | "CONFIDENCE"
  | "FINDING_ID"
  | "INVESTIGATION_TYPE"
  | (string & {});
export interface InvestigationFilterCondition {
  Equals?: string[] | undefined;
  NotEquals?: string[] | undefined;
}
export type InvestigationCriterion = {
  [key in InvestigationFilterCriterionKey]?: InvestigationFilterCondition | undefined;
};
export interface InvestigationFilterCriteria {
  Criterion?: { [key: string]: InvestigationFilterCondition | undefined } | undefined;
}
export type InvestigationSortField =
  | "START_TIME"
  | "END_TIME"
  | "STATUS"
  | "RISK_LEVEL"
  | "CONFIDENCE"
  | (string & {});
export interface InvestigationSortCriteria {
  AttributeName?: InvestigationSortField | undefined;
  OrderBy?: OrderBy | undefined;
}
export interface ListInvestigationsRequest {
  DetectorId: string;
  FilterCriteria?: InvestigationFilterCriteria | undefined;
  SortCriteria?: InvestigationSortCriteria | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type InvestigationTitle = string;
export interface InvestigationSummary {
  InvestigationId?: string | undefined;
  Status?: InvestigationStatus | undefined;
  TriggerPrompt?: string | undefined;
  RiskLevel?: RiskLevel | undefined;
  Confidence?: Confidence | undefined;
  Title?: string | undefined;
  InvestigationType?: InvestigationType | undefined;
  FindingId?: string | undefined;
  AccountId?: string | undefined;
  AdminAccountId?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
}
export type InvestigationSummaries = InvestigationSummary[];
export interface ListInvestigationsResponse {
  Investigations: InvestigationSummary[];
  NextToken?: string | undefined;
}
export interface ListInvitationsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface Invitation {
  AccountId?: string | undefined;
  InvitationId?: string | undefined;
  RelationshipStatus?: string | undefined;
  InvitedAt?: string | undefined;
}
export type Invitations = Invitation[];
export interface ListInvitationsResponse {
  Invitations?: Invitation[] | undefined;
  NextToken?: string | undefined;
}
export interface ListIPSetsRequest {
  DetectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type IpSetIds = string[];
export interface ListIPSetsResponse {
  IpSetIds: string[];
  NextToken?: string | undefined;
}
export interface ListMalwareProtectionPlansRequest {
  NextToken?: string | undefined;
}
export interface MalwareProtectionPlanSummary {
  MalwareProtectionPlanId?: string | undefined;
}
export type MalwareProtectionPlansSummary = MalwareProtectionPlanSummary[];
export interface ListMalwareProtectionPlansResponse {
  MalwareProtectionPlans?: MalwareProtectionPlanSummary[] | undefined;
  NextToken?: string | undefined;
}
export type ListMalwareScansCriterionKey =
  | "RESOURCE_ARN"
  | "SCAN_ID"
  | "ACCOUNT_ID"
  | "GUARDDUTY_FINDING_ID"
  | "RESOURCE_TYPE"
  | "SCAN_START_TIME"
  | "SCAN_STATUS"
  | "SCAN_TYPE"
  | (string & {});
export interface ListMalwareScansFilterCriterion {
  ListMalwareScansCriterionKey?: ListMalwareScansCriterionKey | undefined;
  FilterCondition?: FilterCondition | undefined;
}
export type ListMalwareScansFilterCriterionList = ListMalwareScansFilterCriterion[];
export interface ListMalwareScansFilterCriteria {
  ListMalwareScansFilterCriterion?: ListMalwareScansFilterCriterion[] | undefined;
}
export interface ListMalwareScansRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  FilterCriteria?: ListMalwareScansFilterCriteria | undefined;
  SortCriteria?: SortCriteria | undefined;
}
export interface MalwareScan {
  ResourceArn?: string | undefined;
  ResourceType?: MalwareProtectionResourceType | undefined;
  ScanId?: string | undefined;
  ScanStatus?: MalwareProtectionScanStatus | undefined;
  ScanResultStatus?: ScanResultStatus | undefined;
  ScanType?: MalwareProtectionScanType | undefined;
  ScanStartedAt?: Date | undefined;
  ScanCompletedAt?: Date | undefined;
}
export type MalwareScans = MalwareScan[];
export interface ListMalwareScansResponse {
  Scans: MalwareScan[];
  NextToken?: string | undefined;
}
export interface ListMembersRequest {
  DetectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  OnlyAssociated?: string | undefined;
}
export interface ListMembersResponse {
  Members?:
    | (Member & {
        AccountId: AccountId;
        MasterId: string;
        Email: Email;
        RelationshipStatus: string;
        UpdatedAt: string;
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface ListOrganizationAdminAccountsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type AdminStatus = "ENABLED" | "DISABLE_IN_PROGRESS" | (string & {});
export interface AdminAccount {
  AdminAccountId?: string | undefined;
  AdminStatus?: AdminStatus | undefined;
}
export type AdminAccounts = AdminAccount[];
export interface ListOrganizationAdminAccountsResponse {
  AdminAccounts?: AdminAccount[] | undefined;
  NextToken?: string | undefined;
}
export interface ListPublishingDestinationsRequest {
  DetectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface Destination {
  DestinationId?: string | undefined;
  DestinationType?: DestinationType | undefined;
  Status?: PublishingStatus | undefined;
}
export type Destinations = Destination[];
export interface ListPublishingDestinationsResponse {
  Destinations: (Destination & {
    DestinationId: string;
    DestinationType: DestinationType;
    Status: PublishingStatus;
  })[];
  NextToken?: string | undefined;
}
export type GuardDutyArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface ListThreatEntitySetsRequest {
  DetectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ThreatEntitySetIds = string[];
export interface ListThreatEntitySetsResponse {
  ThreatEntitySetIds: string[];
  NextToken?: string | undefined;
}
export interface ListThreatIntelSetsRequest {
  DetectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ThreatIntelSetIds = string[];
export interface ListThreatIntelSetsResponse {
  ThreatIntelSetIds: string[];
  NextToken?: string | undefined;
}
export interface ListTrustedEntitySetsRequest {
  DetectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type TrustedEntitySetIds = string[];
export interface ListTrustedEntitySetsResponse {
  TrustedEntitySetIds: string[];
  NextToken?: string | undefined;
}
export interface S3ObjectForSendObjectMalwareScan {
  Bucket?: string | undefined;
  Key?: string | undefined;
  VersionId?: string | undefined;
}
export interface SendObjectMalwareScanRequest {
  S3Object?: S3ObjectForSendObjectMalwareScan | undefined;
}
export interface SendObjectMalwareScanResponse {}
export type ResourceArn = string;
export interface ContinuousScanDetails {
  StartTime?: Date | undefined;
  EndTime: Date;
}
export interface RecoveryPoint {
  BackupVaultName?: string | undefined;
  ContinuousScanDetails?: ContinuousScanDetails | undefined;
}
export interface StartMalwareScanConfiguration {
  Role?: string | undefined;
  IncrementalScanDetails?: IncrementalScanDetails | undefined;
  RecoveryPoint?: RecoveryPoint | undefined;
}
export interface StartMalwareScanRequest {
  ResourceArn?: string | undefined;
  ClientToken?: string | undefined;
  ScanConfiguration?: StartMalwareScanConfiguration | undefined;
}
export interface StartMalwareScanResponse {
  ScanId?: string | undefined;
}
export interface StartMonitoringMembersRequest {
  DetectorId: string;
  AccountIds?: string[] | undefined;
}
export interface StartMonitoringMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface StopMonitoringMembersRequest {
  DetectorId: string;
  AccountIds?: string[] | undefined;
}
export interface StopMonitoringMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface TagResourceRequest {
  ResourceArn?: string | undefined;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UnarchiveFindingsRequest {
  DetectorId: string;
  FindingIds?: string[] | undefined;
}
export interface UnarchiveFindingsResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[] | undefined;
}
export interface UntagResourceResponse {}
export interface UpdateCustomDetectionRuleAssociationRequest {
  RuleId: string;
  AssociationId: string;
  Mode?: AssociationMode | undefined;
}
export interface UpdateCustomDetectionRuleAssociationResponse {}
export interface UpdateCustomDetectionRuleOrgConfigurationRequest {
  RuleId: string;
  Mode?: AssociationMode | undefined;
  IncludeAccountIds?: string[] | undefined;
  ExcludeAccountIds?: string[] | undefined;
}
export interface UpdateCustomDetectionRuleOrgConfigurationResponse {}
export interface UpdateDetectorRequest {
  DetectorId: string;
  Enable?: boolean | undefined;
  FindingPublishingFrequency?: FindingPublishingFrequency | undefined;
  DataSources?: DataSourceConfigurations | undefined;
  Features?: DetectorFeatureConfiguration[] | undefined;
}
export interface UpdateDetectorResponse {}
export interface UpdateFilterRequest {
  DetectorId: string;
  FilterName: string;
  Description?: string | undefined;
  Action?: FilterAction | undefined;
  Rank?: number | undefined;
  FindingCriteria?: FindingCriteria | undefined;
}
export interface UpdateFilterResponse {
  Name: string;
}
export type Feedback = "USEFUL" | "NOT_USEFUL" | (string & {});
export interface UpdateFindingsFeedbackRequest {
  DetectorId: string;
  FindingIds?: string[] | undefined;
  Feedback?: Feedback | undefined;
  Comments?: string | redacted.Redacted<string> | undefined;
}
export interface UpdateFindingsFeedbackResponse {}
export interface UpdateIPSetRequest {
  DetectorId: string;
  IpSetId?: string | undefined;
  Name?: string | undefined;
  Location?: string | undefined;
  Activate?: boolean | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface UpdateIPSetResponse {}
export interface UpdateS3BucketResource {
  ObjectPrefixes?: string[] | undefined;
}
export interface UpdateProtectedResource {
  S3Bucket?: UpdateS3BucketResource | undefined;
}
export interface UpdateMalwareProtectionPlanRequest {
  MalwareProtectionPlanId: string;
  Role?: string | undefined;
  Actions?: MalwareProtectionPlanActions | undefined;
  ProtectedResource?: UpdateProtectedResource | undefined;
}
export interface UpdateMalwareProtectionPlanResponse {}
export interface UpdateMalwareScanSettingsRequest {
  DetectorId: string;
  ScanResourceCriteria?: ScanResourceCriteria | undefined;
  EbsSnapshotPreservation?: EbsSnapshotPreservation | undefined;
}
export interface UpdateMalwareScanSettingsResponse {}
export interface MemberAdditionalConfiguration {
  Name?: OrgFeatureAdditionalConfiguration | undefined;
  Status?: FeatureStatus | undefined;
}
export type MemberAdditionalConfigurations = MemberAdditionalConfiguration[];
export interface MemberFeaturesConfiguration {
  Name?: OrgFeature | undefined;
  Status?: FeatureStatus | undefined;
  AdditionalConfiguration?: MemberAdditionalConfiguration[] | undefined;
}
export type MemberFeaturesConfigurations = MemberFeaturesConfiguration[];
export interface UpdateMemberDetectorsRequest {
  DetectorId: string;
  AccountIds?: string[] | undefined;
  DataSources?: DataSourceConfigurations | undefined;
  Features?: MemberFeaturesConfiguration[] | undefined;
}
export interface UpdateMemberDetectorsResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface OrganizationS3LogsConfiguration {
  AutoEnable?: boolean | undefined;
}
export interface OrganizationKubernetesAuditLogsConfiguration {
  AutoEnable?: boolean | undefined;
}
export interface OrganizationKubernetesConfiguration {
  AuditLogs?: OrganizationKubernetesAuditLogsConfiguration | undefined;
}
export interface OrganizationEbsVolumes {
  AutoEnable?: boolean | undefined;
}
export interface OrganizationScanEc2InstanceWithFindings {
  EbsVolumes?: OrganizationEbsVolumes | undefined;
}
export interface OrganizationMalwareProtectionConfiguration {
  ScanEc2InstanceWithFindings?: OrganizationScanEc2InstanceWithFindings | undefined;
}
export interface OrganizationDataSourceConfigurations {
  S3Logs?: OrganizationS3LogsConfiguration | undefined;
  Kubernetes?: OrganizationKubernetesConfiguration | undefined;
  MalwareProtection?: OrganizationMalwareProtectionConfiguration | undefined;
}
export interface OrganizationAdditionalConfiguration {
  Name?: OrgFeatureAdditionalConfiguration | undefined;
  AutoEnable?: OrgFeatureStatus | undefined;
}
export type OrganizationAdditionalConfigurations = OrganizationAdditionalConfiguration[];
export interface OrganizationFeatureConfiguration {
  Name?: OrgFeature | undefined;
  AutoEnable?: OrgFeatureStatus | undefined;
  AdditionalConfiguration?: OrganizationAdditionalConfiguration[] | undefined;
}
export type OrganizationFeaturesConfigurations = OrganizationFeatureConfiguration[];
export interface UpdateOrganizationConfigurationRequest {
  DetectorId: string;
  AutoEnable?: boolean | undefined;
  DataSources?: OrganizationDataSourceConfigurations | undefined;
  Features?: OrganizationFeatureConfiguration[] | undefined;
  AutoEnableOrganizationMembers?: AutoEnableMembers | undefined;
}
export interface UpdateOrganizationConfigurationResponse {}
export interface UpdatePublishingDestinationRequest {
  DetectorId: string;
  DestinationId: string;
  DestinationProperties?: DestinationProperties | undefined;
}
export interface UpdatePublishingDestinationResponse {}
export interface UpdateThreatEntitySetRequest {
  DetectorId: string;
  ThreatEntitySetId?: string | undefined;
  Name?: string | undefined;
  Location?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  Activate?: boolean | undefined;
}
export interface UpdateThreatEntitySetResponse {}
export interface UpdateThreatIntelSetRequest {
  DetectorId: string;
  ThreatIntelSetId: string;
  Name?: string | undefined;
  Location?: string | undefined;
  Activate?: boolean | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface UpdateThreatIntelSetResponse {}
export interface UpdateTrustedEntitySetRequest {
  DetectorId: string;
  TrustedEntitySetId: string;
  Name?: string | undefined;
  Location?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  Activate?: boolean | undefined;
}
export interface UpdateTrustedEntitySetResponse {}
export type AcceptAdministratorInvitationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Accepts the invitation to be a member account and get monitored by a GuardDuty administrator account that sent the invitation.
 */
export const acceptAdministratorInvitation: API.OperationMethod<
  AcceptAdministratorInvitationRequest & RegionInput,
  AcceptAdministratorInvitationResponse,
  AcceptAdministratorInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<AcceptAdministratorInvitationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<AcceptAdministratorInvitationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAdministratorInvitation",
  telemetry: TELEMETRY,
  span: "AcceptAdministratorInvitation",
}));

export type AcceptInvitationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Accepts the invitation to be monitored by a GuardDuty administrator account.
 */
export const acceptInvitation: API.OperationMethod<
  AcceptInvitationRequest & RegionInput,
  AcceptInvitationResponse,
  AcceptInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<AcceptInvitationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<AcceptInvitationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInvitation",
  telemetry: TELEMETRY,
  span: "AcceptInvitation",
}));

export type ArchiveFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Archives GuardDuty findings that are specified by the list of finding IDs.
 *
 * Only the administrator account can archive findings. Member accounts don't have permission to archive findings from their accounts.
 */
export const archiveFindings: API.OperationMethod<
  ArchiveFindingsRequest & RegionInput,
  ArchiveFindingsResponse,
  ArchiveFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<ArchiveFindingsRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<ArchiveFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveFindings",
  telemetry: TELEMETRY,
  span: "ArchiveFindings",
}));

export type CreateCustomDetectionRuleAssociationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables a custom detection rule for your account by creating an association. You specify the rule and the mode in which it operates.
 */
export const createCustomDetectionRuleAssociation: API.OperationMethod<
  CreateCustomDetectionRuleAssociationRequest & RegionInput,
  CreateCustomDetectionRuleAssociationResponse,
  CreateCustomDetectionRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<CreateCustomDetectionRuleAssociationRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<CreateCustomDetectionRuleAssociationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomDetectionRuleAssociation",
  telemetry: TELEMETRY,
  span: "CreateCustomDetectionRuleAssociation",
}));

export type CreateCustomDetectionRuleOrgConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an organization-level configuration that enables a custom detection rule across your organization. This operation is available only to the delegated administrator account.
 */
export const createCustomDetectionRuleOrgConfiguration: API.OperationMethod<
  CreateCustomDetectionRuleOrgConfigurationRequest & RegionInput,
  CreateCustomDetectionRuleOrgConfigurationResponse,
  CreateCustomDetectionRuleOrgConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<CreateCustomDetectionRuleOrgConfigurationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<CreateCustomDetectionRuleOrgConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomDetectionRuleOrgConfiguration",
  telemetry: TELEMETRY,
  span: "CreateCustomDetectionRuleOrgConfiguration",
}));

export type CreateDetectorError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Creates a single GuardDuty detector. A detector is a resource that represents the GuardDuty service. To start using GuardDuty, you must create a detector in each Region where you enable the service. You can have only one detector per account per Region. All data sources are enabled in a new detector by default.
 *
 * - When you don't specify any `features`, with an exception to `RUNTIME_MONITORING`, all the optional features are enabled by default.
 *
 * - When you specify some of the `features`, any feature that is not specified in the API call gets enabled by default, with an exception to `RUNTIME_MONITORING`.
 *
 * Specifying both EKS Runtime Monitoring (`EKS_RUNTIME_MONITORING`) and Runtime Monitoring (`RUNTIME_MONITORING`) will cause an error. You can add only one of these two features because Runtime Monitoring already includes the threat detection for Amazon EKS resources. For more information, see Runtime Monitoring.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const createDetector: API.OperationMethod<
  CreateDetectorRequest & RegionInput,
  CreateDetectorResponse,
  CreateDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDetectorRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<CreateDetectorResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDetector",
  telemetry: TELEMETRY,
  span: "CreateDetector",
}));

export type CreateFilterError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Creates a filter using the specified finding criteria. The maximum number of saved filters per Amazon Web Services account per Region is 100. For more information, see Quotas for GuardDuty.
 */
export const createFilter: API.OperationMethod<
  CreateFilterRequest & RegionInput,
  CreateFilterResponse,
  CreateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<CreateFilterRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CreateFilterResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFilter",
  telemetry: TELEMETRY,
  span: "CreateFilter",
}));

export type CreateInvestigationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * This API is currently available as a preview. During the preview, you can initiate up to 10 investigations per account per day, with a total limit of 100 investigations per account. This feature is available in the following Amazon Web Services Regions: US East (N. Virginia), US East (Ohio), US West (Oregon), Canada (Central), Europe (Frankfurt), Europe (Ireland), Europe (London), Europe (Paris), Europe (Stockholm), and Asia Pacific (Tokyo).
 *
 * Initiates a GuardDuty investigation that automatically analyzes security findings, correlates related activity, performs account-level analysis, and produces a structured investigation summary with recommended next steps.
 *
 * Only the administrator account can create an investigation. Member accounts don't have permission to create investigations from their accounts.
 *
 * To use this operation, the `AI_ANALYST` feature must be enabled on your detector.
 *
 * This feature uses Amazon Bedrock models that leverage Cross-Region Inference (CRIS), which automatically selects the optimal Amazon Web Services Region within your geography to process the investigation analysis and generate the investigation report. This maximizes available compute resources, model availability, and delivers the best customer experience. Your data remains stored only in the Region where the investigation request originates, however, investigation data and summary results may be processed outside that Region. All data is transmitted encrypted across Amazon's secure network. For more information, see GuardDuty Investigation.
 */
export const createInvestigation: API.OperationMethod<
  CreateInvestigationRequest & RegionInput,
  CreateInvestigationResponse,
  CreateInvestigationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<CreateInvestigationRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<CreateInvestigationResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvestigation",
  telemetry: TELEMETRY,
  span: "CreateInvestigation",
}));

export type CreateIPSetError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new IPSet, which is called a trusted IP list in the console user interface. An IPSet is a list of IP addresses that are trusted for secure communication with Amazon Web Services infrastructure and applications. GuardDuty doesn't generate findings for IP addresses that are included in IPSets. Only users from the administrator account can use this operation.
 */
export const createIPSet: API.OperationMethod<
  CreateIPSetRequest & RegionInput,
  CreateIPSetResponse,
  CreateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<CreateIPSetRequest>,
  output: __S(513, __c16, 1) as any as S.Schema<CreateIPSetResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIPSet",
  telemetry: TELEMETRY,
  span: "CreateIPSet",
}));

export type CreateMalwareProtectionPlanError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new Malware Protection plan for the protected resource.
 *
 * When you create a Malware Protection plan, the Amazon Web Services service terms for GuardDuty Malware Protection apply. For more information, see Amazon Web Services service terms for GuardDuty Malware Protection.
 */
export const createMalwareProtectionPlan: API.OperationMethod<
  CreateMalwareProtectionPlanRequest & RegionInput,
  CreateMalwareProtectionPlanResponse,
  CreateMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<CreateMalwareProtectionPlanRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CreateMalwareProtectionPlanResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMalwareProtectionPlan",
  telemetry: TELEMETRY,
  span: "CreateMalwareProtectionPlan",
}));

export type CreateMembersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Creates member accounts of the current Amazon Web Services account by specifying a list of Amazon Web Services account IDs. This step is a prerequisite for managing the associated member accounts either by invitation or through an organization.
 *
 * As a delegated administrator, using `CreateMembers` will enable GuardDuty in the added member accounts, with the exception of the organization delegated administrator account. A delegated administrator must enable GuardDuty prior to being added as a member.
 *
 * When you use CreateMembers as an Organizations delegated administrator, GuardDuty applies your organization's auto-enable settings to the member accounts in this request, irrespective of the accounts being new or existing members. For more information about the existing auto-enable settings for your organization, see DescribeOrganizationConfiguration.
 *
 * If you disassociate a member account that was added by invitation, the member account details obtained from this API, including the associated email addresses, will be retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * When the member accounts added through Organizations are later disassociated, you (administrator) can't invite them by calling the InviteMembers API. You can create an association with these member accounts again only by calling the CreateMembers API.
 */
export const createMembers: API.OperationMethod<
  CreateMembersRequest & RegionInput,
  CreateMembersResponse,
  CreateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(706, __c22, 2) as any as S.Schema<CreateMembersRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<CreateMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembers",
  telemetry: TELEMETRY,
  span: "CreateMembers",
}));

export type CreatePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a publishing destination where you can export your GuardDuty findings. Before you start exporting the findings, the destination resource must exist.
 */
export const createPublishingDestination: API.OperationMethod<
  CreatePublishingDestinationRequest & RegionInput,
  CreatePublishingDestinationResponse,
  CreatePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<CreatePublishingDestinationRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<CreatePublishingDestinationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublishingDestination",
  telemetry: TELEMETRY,
  span: "CreatePublishingDestination",
}));

export type CreateSampleFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Generates sample findings of types specified by the list of finding types. If 'NULL' is specified for `findingTypes`, the API generates sample findings of all supported finding types.
 */
export const createSampleFindings: API.OperationMethod<
  CreateSampleFindingsRequest & RegionInput,
  CreateSampleFindingsResponse,
  CreateSampleFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<CreateSampleFindingsRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<CreateSampleFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSampleFindings",
  telemetry: TELEMETRY,
  span: "CreateSampleFindings",
}));

export type CreateThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new threat entity set. In a threat entity set, you can provide known malicious threat entities for your Amazon Web Services environment. GuardDuty generates findings based on the entries in the threat entity sets. Only users of the administrator account can manage entity sets, which automatically apply to member accounts.
 */
export const createThreatEntitySet: API.OperationMethod<
  CreateThreatEntitySetRequest & RegionInput,
  CreateThreatEntitySetResponse,
  CreateThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<CreateThreatEntitySetRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<CreateThreatEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatEntitySet",
  telemetry: TELEMETRY,
  span: "CreateThreatEntitySet",
}));

export type CreateThreatIntelSetError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new ThreatIntelSet. ThreatIntelSets consist of known malicious IP addresses. GuardDuty generates findings based on ThreatIntelSets. Only users of the administrator account can use this operation.
 */
export const createThreatIntelSet: API.OperationMethod<
  CreateThreatIntelSetRequest & RegionInput,
  CreateThreatIntelSetResponse,
  CreateThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<CreateThreatIntelSetRequest>,
  output: __S(929, __c29, 1) as any as S.Schema<CreateThreatIntelSetResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatIntelSet",
  telemetry: TELEMETRY,
  span: "CreateThreatIntelSet",
}));

export type CreateTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new trusted entity set. In the trusted entity set, you can provide IP addresses and domains that you believe are secure for communication in your Amazon Web Services environment. GuardDuty will not generate findings for the entries that are specified in a trusted entity set. At any given time, you can have only one trusted entity set.
 *
 * Only users of the administrator account can manage the entity sets, which automatically apply to member accounts.
 */
export const createTrustedEntitySet: API.OperationMethod<
  CreateTrustedEntitySetRequest & RegionInput,
  CreateTrustedEntitySetResponse,
  CreateTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<CreateTrustedEntitySetRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<CreateTrustedEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustedEntitySet",
  telemetry: TELEMETRY,
  span: "CreateTrustedEntitySet",
}));

export type DeclineInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Declines invitations sent to the current member account by Amazon Web Services accounts specified by their account IDs.
 */
export const declineInvitations: API.OperationMethod<
  DeclineInvitationsRequest & RegionInput,
  DeclineInvitationsResponse,
  DeclineInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<DeclineInvitationsRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<DeclineInvitationsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineInvitations",
  telemetry: TELEMETRY,
  span: "DeclineInvitations",
}));

export type DeleteCustomDetectionRuleAssociationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables a custom detection rule by deleting its association. This operation is idempotent.
 */
export const deleteCustomDetectionRuleAssociation: API.OperationMethod<
  DeleteCustomDetectionRuleAssociationRequest & RegionInput,
  DeleteCustomDetectionRuleAssociationResponse,
  DeleteCustomDetectionRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<DeleteCustomDetectionRuleAssociationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteCustomDetectionRuleAssociationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomDetectionRuleAssociation",
  telemetry: TELEMETRY,
  span: "DeleteCustomDetectionRuleAssociation",
}));

export type DeleteCustomDetectionRuleOrgConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the organization-level configuration for a custom detection rule. This operation is available only to the delegated administrator account.
 */
export const deleteCustomDetectionRuleOrgConfiguration: API.OperationMethod<
  DeleteCustomDetectionRuleOrgConfigurationRequest & RegionInput,
  DeleteCustomDetectionRuleOrgConfigurationResponse,
  DeleteCustomDetectionRuleOrgConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<DeleteCustomDetectionRuleOrgConfigurationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteCustomDetectionRuleOrgConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomDetectionRuleOrgConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteCustomDetectionRuleOrgConfiguration",
}));

export type DeleteDetectorError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Deletes an Amazon GuardDuty detector that is specified by the detector ID.
 */
export const deleteDetector: API.OperationMethod<
  DeleteDetectorRequest & RegionInput,
  DeleteDetectorResponse,
  DeleteDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<DeleteDetectorRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteDetectorResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDetector",
  telemetry: TELEMETRY,
  span: "DeleteDetector",
}));

export type DeleteFilterError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Deletes the filter specified by the filter name.
 */
export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest & RegionInput,
  DeleteFilterResponse,
  DeleteFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<DeleteFilterRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteFilterResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFilter",
  telemetry: TELEMETRY,
  span: "DeleteFilter",
}));

export type DeleteInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes invitations sent to the current member account by Amazon Web Services accounts specified by their account IDs.
 */
export const deleteInvitations: API.OperationMethod<
  DeleteInvitationsRequest & RegionInput,
  DeleteInvitationsResponse,
  DeleteInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<DeleteInvitationsRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteInvitationsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvitations",
  telemetry: TELEMETRY,
  span: "DeleteInvitations",
}));

export type DeleteIPSetError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Deletes the IPSet specified by the `ipSetId`. IPSets are called trusted IP lists in the console user interface.
 */
export const deleteIPSet: API.OperationMethod<
  DeleteIPSetRequest & RegionInput,
  DeleteIPSetResponse,
  DeleteIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<DeleteIPSetRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteIPSetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIPSet",
  telemetry: TELEMETRY,
  span: "DeleteIPSet",
}));

export type DeleteMalwareProtectionPlanError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the Malware Protection plan ID associated with the Malware Protection plan resource. Use this API only when you no longer want to protect the resource associated with this Malware Protection plan ID.
 */
export const deleteMalwareProtectionPlan: API.OperationMethod<
  DeleteMalwareProtectionPlanRequest & RegionInput,
  DeleteMalwareProtectionPlanResponse,
  DeleteMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<DeleteMalwareProtectionPlanRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteMalwareProtectionPlanResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMalwareProtectionPlan",
  telemetry: TELEMETRY,
  span: "DeleteMalwareProtectionPlan",
}));

export type DeleteMembersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Deletes GuardDuty member accounts (to the current GuardDuty administrator account) specified by the account IDs.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to disable GuardDuty for a member account in your organization.
 */
export const deleteMembers: API.OperationMethod<
  DeleteMembersRequest & RegionInput,
  DeleteMembersResponse,
  DeleteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<DeleteMembersRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembers",
  telemetry: TELEMETRY,
  span: "DeleteMembers",
}));

export type DeletePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the publishing definition with the specified `destinationId`.
 */
export const deletePublishingDestination: API.OperationMethod<
  DeletePublishingDestinationRequest & RegionInput,
  DeletePublishingDestinationResponse,
  DeletePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<DeletePublishingDestinationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeletePublishingDestinationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublishingDestination",
  telemetry: TELEMETRY,
  span: "DeletePublishingDestination",
}));

export type DeleteThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the threat entity set that is associated with the specified `threatEntitySetId`.
 */
export const deleteThreatEntitySet: API.OperationMethod<
  DeleteThreatEntitySetRequest & RegionInput,
  DeleteThreatEntitySetResponse,
  DeleteThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteThreatEntitySetRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteThreatEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThreatEntitySet",
  telemetry: TELEMETRY,
  span: "DeleteThreatEntitySet",
}));

export type DeleteThreatIntelSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the ThreatIntelSet specified by the ThreatIntelSet ID.
 */
export const deleteThreatIntelSet: API.OperationMethod<
  DeleteThreatIntelSetRequest & RegionInput,
  DeleteThreatIntelSetResponse,
  DeleteThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<DeleteThreatIntelSetRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteThreatIntelSetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThreatIntelSet",
  telemetry: TELEMETRY,
  span: "DeleteThreatIntelSet",
}));

export type DeleteTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the trusted entity set that is associated with the specified `trustedEntitySetId`.
 */
export const deleteTrustedEntitySet: API.OperationMethod<
  DeleteTrustedEntitySetRequest & RegionInput,
  DeleteTrustedEntitySetResponse,
  DeleteTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<DeleteTrustedEntitySetRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DeleteTrustedEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustedEntitySet",
  telemetry: TELEMETRY,
  span: "DeleteTrustedEntitySet",
}));

export type DescribeMalwareScansError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of malware scans. Each member account can view the malware scans for their own accounts. An administrator can view the malware scans for all the member accounts.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const describeMalwareScans: API.PaginatedOperationMethod<
  DescribeMalwareScansRequest & RegionInput,
  DescribeMalwareScansResponse,
  DescribeMalwareScansError,
  Credentials | HttpClient.HttpClient,
  Scan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1411, __c44, 3) as any as S.Schema<DescribeMalwareScansRequest>,
  output: __S(1416, __c44, 8) as any as S.Schema<DescribeMalwareScansResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMalwareScans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Scans",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMalwareScans",
})) as any;

export type DescribeOrganizationConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns information about the account selected as the delegated administrator for GuardDuty.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const describeOrganizationConfiguration: API.PaginatedOperationMethod<
  DescribeOrganizationConfigurationRequest & RegionInput,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<DescribeOrganizationConfigurationRequest>,
  output: __S(1601, __c50, 1) as any as S.Schema<DescribeOrganizationConfigurationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeOrganizationConfiguration",
})) as any;

export type DescribePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns information about the publishing destination specified by the provided `destinationId`.
 */
export const describePublishingDestination: API.OperationMethod<
  DescribePublishingDestinationRequest & RegionInput,
  DescribePublishingDestinationResponse,
  DescribePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<DescribePublishingDestinationRequest>,
  output: __S(1665, __c52, 1) as any as S.Schema<DescribePublishingDestinationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePublishingDestination",
  telemetry: TELEMETRY,
  span: "DescribePublishingDestination",
}));

export type DisableOrganizationAdminAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Removes the existing GuardDuty delegated administrator of the organization. Only the organization's management account can run this API operation.
 */
export const disableOrganizationAdminAccount: API.OperationMethod<
  DisableOrganizationAdminAccountRequest & RegionInput,
  DisableOrganizationAdminAccountResponse,
  DisableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<DisableOrganizationAdminAccountRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DisableOrganizationAdminAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
  telemetry: TELEMETRY,
  span: "DisableOrganizationAdminAccount",
}));

export type DisassociateFromAdministratorAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates the current GuardDuty member account from its administrator account.
 *
 * When you disassociate an invited member from a GuardDuty delegated administrator, the member account details obtained from the CreateMembers API, including the associated email addresses, are retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to disable GuardDuty in a member account.
 */
export const disassociateFromAdministratorAccount: API.OperationMethod<
  DisassociateFromAdministratorAccountRequest & RegionInput,
  DisassociateFromAdministratorAccountResponse,
  DisassociateFromAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<DisassociateFromAdministratorAccountRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DisassociateFromAdministratorAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromAdministratorAccount",
  telemetry: TELEMETRY,
  span: "DisassociateFromAdministratorAccount",
}));

export type DisassociateFromMasterAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates the current GuardDuty member account from its administrator account.
 *
 * When you disassociate an invited member from a GuardDuty delegated administrator, the member account details obtained from the CreateMembers API, including the associated email addresses, are retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 */
export const disassociateFromMasterAccount: API.OperationMethod<
  DisassociateFromMasterAccountRequest & RegionInput,
  DisassociateFromMasterAccountResponse,
  DisassociateFromMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<DisassociateFromMasterAccountRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<DisassociateFromMasterAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromMasterAccount",
  telemetry: TELEMETRY,
  span: "DisassociateFromMasterAccount",
}));

export type DisassociateMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates GuardDuty member accounts (from the current administrator account) specified by the account IDs.
 *
 * When you disassociate an invited member from a GuardDuty delegated administrator, the member account details obtained from the CreateMembers API, including the associated email addresses, are retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to disassociate a member account before removing them from your organization.
 *
 * If you disassociate a member account that was added by invitation, the member account details obtained from this API, including the associated email addresses, will be retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * When the member accounts added through Organizations are later disassociated, you (administrator) can't invite them by calling the InviteMembers API. You can create an association with these member accounts again only by calling the CreateMembers API.
 */
export const disassociateMembers: API.OperationMethod<
  DisassociateMembersRequest & RegionInput,
  DisassociateMembersResponse,
  DisassociateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<DisassociateMembersRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<DisassociateMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMembers",
  telemetry: TELEMETRY,
  span: "DisassociateMembers",
}));

export type EnableOrganizationAdminAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Designates an Amazon Web Services account within the organization as your GuardDuty delegated administrator. Only the organization's management account can run this API operation.
 */
export const enableOrganizationAdminAccount: API.OperationMethod<
  EnableOrganizationAdminAccountRequest & RegionInput,
  EnableOrganizationAdminAccountResponse,
  EnableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<EnableOrganizationAdminAccountRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<EnableOrganizationAdminAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
  telemetry: TELEMETRY,
  span: "EnableOrganizationAdminAccount",
}));

export type GetAdministratorAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Provides the details of the GuardDuty administrator account associated with the current GuardDuty member account.
 *
 * Based on the type of account that runs this API, the following list shows how the API behavior varies:
 *
 * - When the GuardDuty administrator account runs this API, it will return success (`HTTP 200`) but no content.
 *
 * - When a member account runs this API, it will return the details of the GuardDuty administrator account that is associated with this calling member account.
 *
 * - When an individual account (not associated with an organization) runs this API, it will return success (`HTTP 200`) but no content.
 */
export const getAdministratorAccount: API.OperationMethod<
  GetAdministratorAccountRequest & RegionInput,
  GetAdministratorAccountResponse,
  GetAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<GetAdministratorAccountRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<GetAdministratorAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdministratorAccount",
  telemetry: TELEMETRY,
  span: "GetAdministratorAccount",
}));

export type GetCoverageStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves aggregated statistics for your account. If you are a GuardDuty administrator, you can retrieve the statistics for all the resources associated with the active member accounts in your organization who have enabled Runtime Monitoring and have the GuardDuty security agent running on their resources.
 */
export const getCoverageStatistics: API.OperationMethod<
  GetCoverageStatisticsRequest & RegionInput,
  GetCoverageStatisticsResponse,
  GetCoverageStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<GetCoverageStatisticsRequest>,
  output: __S(1923, __c60, 3) as any as S.Schema<GetCoverageStatisticsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoverageStatistics",
  telemetry: TELEMETRY,
  span: "GetCoverageStatistics",
}));

export type GetCustomDetectionRuleError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns details for a custom detection rule in GuardDuty, including its detection logic.
 */
export const getCustomDetectionRule: API.OperationMethod<
  GetCustomDetectionRuleRequest & RegionInput,
  GetCustomDetectionRuleResponse,
  GetCustomDetectionRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<GetCustomDetectionRuleRequest>,
  output: __S(2054, __c64, 6) as any as S.Schema<GetCustomDetectionRuleResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomDetectionRule",
  telemetry: TELEMETRY,
  span: "GetCustomDetectionRule",
}));

export type GetCustomDetectionRuleAssociationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns details for a custom detection rule association.
 */
export const getCustomDetectionRuleAssociation: API.OperationMethod<
  GetCustomDetectionRuleAssociationRequest & RegionInput,
  GetCustomDetectionRuleAssociationResponse,
  GetCustomDetectionRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<GetCustomDetectionRuleAssociationRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<GetCustomDetectionRuleAssociationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomDetectionRuleAssociation",
  telemetry: TELEMETRY,
  span: "GetCustomDetectionRuleAssociation",
}));

export type GetCustomDetectionRuleOrgConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the organization-level configuration for a custom detection rule.
 */
export const getCustomDetectionRuleOrgConfiguration: API.OperationMethod<
  GetCustomDetectionRuleOrgConfigurationRequest & RegionInput,
  GetCustomDetectionRuleOrgConfigurationResponse,
  GetCustomDetectionRuleOrgConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<GetCustomDetectionRuleOrgConfigurationRequest>,
  output: __S(2114, __c66, 2) as any as S.Schema<GetCustomDetectionRuleOrgConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomDetectionRuleOrgConfiguration",
  telemetry: TELEMETRY,
  span: "GetCustomDetectionRuleOrgConfiguration",
}));

export type GetDetectorError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Retrieves a GuardDuty detector specified by the detectorId.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getDetector: API.OperationMethod<
  GetDetectorRequest & RegionInput,
  GetDetectorResponse,
  GetDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<GetDetectorRequest>,
  output: __S(2145, __c67, 1) as any as S.Schema<GetDetectorResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDetector",
  telemetry: TELEMETRY,
  span: "GetDetector",
}));

export type GetFilterError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Returns the details of the filter specified by the filter name.
 */
export const getFilter: API.OperationMethod<
  GetFilterRequest & RegionInput,
  GetFilterResponse,
  GetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<GetFilterRequest>,
  output: __S(2209, __c69, 1) as any as S.Schema<GetFilterResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFilter",
  telemetry: TELEMETRY,
  span: "GetFilter",
}));

export type GetFindingsError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Describes Amazon GuardDuty findings specified by finding IDs.
 */
export const getFindings: API.OperationMethod<
  GetFindingsRequest & RegionInput,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<GetFindingsRequest>,
  output: __S(2394, __c74, 26) as any as S.Schema<GetFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindings",
  telemetry: TELEMETRY,
  span: "GetFindings",
}));

export type GetFindingsStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists GuardDuty findings statistics for the specified detector ID.
 *
 * You must provide either `findingStatisticTypes` or `groupBy` parameter, and not both. You can use the `maxResults` and `orderBy` parameters only when using `groupBy`.
 *
 * There might be regional differences because some flags might not be available in all the Regions where GuardDuty is currently supported. For more information, see Regions and endpoints.
 */
export const getFindingsStatistics: API.OperationMethod<
  GetFindingsStatisticsRequest & RegionInput,
  GetFindingsStatisticsResponse,
  GetFindingsStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<GetFindingsStatisticsRequest>,
  output: __S(2573, __c80, 13) as any as S.Schema<GetFindingsStatisticsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsStatistics",
  telemetry: TELEMETRY,
  span: "GetFindingsStatistics",
}));

export type GetInvestigationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This API is currently available as a preview. This feature is available in the following Amazon Web Services Regions: US East (N. Virginia), US East (Ohio), US West (Oregon), Canada (Central), Europe (Frankfurt), Europe (Ireland), Europe (London), Europe (Paris), Europe (Stockholm), and Asia Pacific (Tokyo).
 *
 * Retrieves the results and status of a specific GuardDuty investigation.
 *
 * GuardDuty returns the results, including the summary and the scope of the investigation, only when the investigation status is `COMPLETED`. By default, GuardDuty returns the summary as text in `Summary`. To return a typed summary in `SummaryData` instead, set `SummaryFormat` to `STRUCTURED`.
 *
 * An administrator account can retrieve any investigation within the organization. Member accounts can only retrieve investigations that belong to them.
 */
export const getInvestigation: API.OperationMethod<
  GetInvestigationRequest & RegionInput,
  GetInvestigationResponse,
  GetInvestigationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<GetInvestigationRequest>,
  output: __S(2620, __c81, 28) as any as S.Schema<GetInvestigationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvestigation",
  telemetry: TELEMETRY,
  span: "GetInvestigation",
}));

export type GetInvitationsCountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns the count of all GuardDuty membership invitations that were sent to the current member account except the currently accepted invitation.
 */
export const getInvitationsCount: API.OperationMethod<
  GetInvitationsCountRequest & RegionInput,
  GetInvitationsCountResponse,
  GetInvitationsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<GetInvitationsCountRequest>,
  output: __S(2657, __c83, 1) as any as S.Schema<GetInvitationsCountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvitationsCount",
  telemetry: TELEMETRY,
  span: "GetInvitationsCount",
}));

export type GetIPSetError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Retrieves the IPSet specified by the `ipSetId`.
 */
export const getIPSet: API.OperationMethod<
  GetIPSetRequest & RegionInput,
  GetIPSetResponse,
  GetIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<GetIPSetRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<GetIPSetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIPSet",
  telemetry: TELEMETRY,
  span: "GetIPSet",
}));

export type GetMalwareProtectionPlanError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the Malware Protection plan details associated with a Malware Protection plan ID.
 */
export const getMalwareProtectionPlan: API.OperationMethod<
  GetMalwareProtectionPlanRequest & RegionInput,
  GetMalwareProtectionPlanResponse,
  GetMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<GetMalwareProtectionPlanRequest>,
  output: __S(2755, __c86, 3) as any as S.Schema<GetMalwareProtectionPlanResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareProtectionPlan",
  telemetry: TELEMETRY,
  span: "GetMalwareProtectionPlan",
}));

export type GetMalwareScanError =
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the detailed information for a specific malware scan. Each member account can view the malware scan details for their own account. An administrator can view malware scan details for all accounts in the organization.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getMalwareScan: API.OperationMethod<
  GetMalwareScanRequest & RegionInput,
  GetMalwareScanResponse,
  GetMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<GetMalwareScanRequest>,
  output: __S(2793, __c87, 9) as any as S.Schema<GetMalwareScanResponse>,
  errors: [BadRequestException, InternalServerErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareScan",
  telemetry: TELEMETRY,
  span: "GetMalwareScan",
}));

export type GetMalwareScanSettingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns the details of the malware scan settings.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getMalwareScanSettings: API.OperationMethod<
  GetMalwareScanSettingsRequest & RegionInput,
  GetMalwareScanSettingsResponse,
  GetMalwareScanSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<GetMalwareScanSettingsRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<GetMalwareScanSettingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareScanSettings",
  telemetry: TELEMETRY,
  span: "GetMalwareScanSettings",
}));

export type GetMasterAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Provides the details for the GuardDuty administrator account associated with the current GuardDuty member account.
 */
export const getMasterAccount: API.OperationMethod<
  GetMasterAccountRequest & RegionInput,
  GetMasterAccountResponse,
  GetMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<GetMasterAccountRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<GetMasterAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMasterAccount",
  telemetry: TELEMETRY,
  span: "GetMasterAccount",
}));

export type GetMemberDetectorsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Describes which data sources are enabled for the member account's detector.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getMemberDetectors: API.OperationMethod<
  GetMemberDetectorsRequest & RegionInput,
  GetMemberDetectorsResponse,
  GetMemberDetectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<GetMemberDetectorsRequest>,
  output: __S(2947, __c92, 3) as any as S.Schema<GetMemberDetectorsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemberDetectors",
  telemetry: TELEMETRY,
  span: "GetMemberDetectors",
}));

export type GetMembersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Retrieves GuardDuty member accounts (of the current GuardDuty administrator account) specified by the account IDs.
 */
export const getMembers: API.OperationMethod<
  GetMembersRequest & RegionInput,
  GetMembersResponse,
  GetMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<GetMembersRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<GetMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembers",
  telemetry: TELEMETRY,
  span: "GetMembers",
}));

export type GetOrganizationStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves how many active member accounts have each feature enabled within GuardDuty. Only a delegated GuardDuty administrator of an organization can run this API.
 *
 * When you create a new organization, it might take up to 24 hours to generate the statistics for the entire organization.
 */
export const getOrganizationStatistics: API.OperationMethod<
  GetOrganizationStatisticsRequest & RegionInput,
  GetOrganizationStatisticsResponse,
  GetOrganizationStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<GetOrganizationStatisticsRequest>,
  output: __S(3079, __c96, 7) as any as S.Schema<GetOrganizationStatisticsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationStatistics",
  telemetry: TELEMETRY,
  span: "GetOrganizationStatistics",
}));

export type GetRemainingFreeTrialDaysError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Provides the number of days left for each data source used in the free trial period.
 */
export const getRemainingFreeTrialDays: API.OperationMethod<
  GetRemainingFreeTrialDaysRequest & RegionInput,
  GetRemainingFreeTrialDaysResponse,
  GetRemainingFreeTrialDaysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<GetRemainingFreeTrialDaysRequest>,
  output: __S(3113, __c97, 9) as any as S.Schema<GetRemainingFreeTrialDaysResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRemainingFreeTrialDays",
  telemetry: TELEMETRY,
  span: "GetRemainingFreeTrialDays",
}));

export type GetThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the threat entity set associated with the specified `threatEntitySetId`.
 */
export const getThreatEntitySet: API.OperationMethod<
  GetThreatEntitySetRequest & RegionInput,
  GetThreatEntitySetResponse,
  GetThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<GetThreatEntitySetRequest>,
  output: __S(3168, __c99, 0) as any as S.Schema<GetThreatEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThreatEntitySet",
  telemetry: TELEMETRY,
  span: "GetThreatEntitySet",
}));

export type GetThreatIntelSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the ThreatIntelSet that is specified by the ThreatIntelSet ID.
 */
export const getThreatIntelSet: API.OperationMethod<
  GetThreatIntelSetRequest & RegionInput,
  GetThreatIntelSetResponse,
  GetThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<GetThreatIntelSetRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<GetThreatIntelSetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThreatIntelSet",
  telemetry: TELEMETRY,
  span: "GetThreatIntelSet",
}));

export type GetTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the trusted entity set associated with the specified `trustedEntitySetId`.
 */
export const getTrustedEntitySet: API.OperationMethod<
  GetTrustedEntitySetRequest & RegionInput,
  GetTrustedEntitySetResponse,
  GetTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<GetTrustedEntitySetRequest>,
  output: __S(3168, __c99, 0) as any as S.Schema<GetTrustedEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustedEntitySet",
  telemetry: TELEMETRY,
  span: "GetTrustedEntitySet",
}));

export type GetUsageStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists Amazon GuardDuty usage statistics over the last 30 days for the specified detector ID. For newly enabled detectors or data sources, the cost returned will include only the usage so far under 30 days. This may differ from the cost metrics in the console, which project usage over 30 days to provide a monthly cost estimate. For more information, see Understanding How Usage Costs are Calculated.
 */
export const getUsageStatistics: API.PaginatedOperationMethod<
  GetUsageStatisticsRequest & RegionInput,
  GetUsageStatisticsResponse,
  GetUsageStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3265, __c102, 1) as any as S.Schema<GetUsageStatisticsRequest>,
  output: __S(3278, __c102, 14) as any as S.Schema<GetUsageStatisticsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageStatistics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetUsageStatistics",
})) as any;

export type InviteMembersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Invites Amazon Web Services accounts to become members of an organization administered by the Amazon Web Services account that invokes this API. If you are using Amazon Web Services Organizations to manage your GuardDuty environment, this step is not needed. For more information, see Managing accounts with organizations.
 *
 * To invite Amazon Web Services accounts, the first step is to ensure that GuardDuty has been enabled in the potential member accounts. You can now invoke this API to add accounts by invitation. The invited accounts can either accept or decline the invitation from their GuardDuty accounts. Each invited Amazon Web Services account can choose to accept the invitation from only one Amazon Web Services account. For more information, see Managing GuardDuty accounts by invitation.
 *
 * After the invite has been accepted and you choose to disassociate a member account (by using DisassociateMembers) from your account, the details of the member account obtained by invoking CreateMembers, including the associated email addresses, will be retained. This is done so that you can invoke InviteMembers without the need to invoke CreateMembers again. To remove the details associated with a member account, you must also invoke DeleteMembers.
 *
 * If you disassociate a member account that was added by invitation, the member account details obtained from this API, including the associated email addresses, will be retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * When the member accounts added through Organizations are later disassociated, you (administrator) can't invite them by calling the InviteMembers API. You can create an association with these member accounts again only by calling the CreateMembers API.
 */
export const inviteMembers: API.OperationMethod<
  InviteMembersRequest & RegionInput,
  InviteMembersResponse,
  InviteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<InviteMembersRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<InviteMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteMembers",
  telemetry: TELEMETRY,
  span: "InviteMembers",
}));

export type ListCoverageError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists coverage details for your GuardDuty account. If you're a GuardDuty administrator, you can retrieve all resources associated with the active member accounts in your organization.
 *
 * Make sure the accounts have Runtime Monitoring enabled and GuardDuty agent running on their resources.
 */
export const listCoverage: API.PaginatedOperationMethod<
  ListCoverageRequest & RegionInput,
  ListCoverageResponse,
  ListCoverageError,
  Credentials | HttpClient.HttpClient,
  CoverageResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<ListCoverageRequest>,
  output: __S(3339, __c104, 11) as any as S.Schema<ListCoverageResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoverage",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCoverage",
})) as any;

export type ListCustomDetectionRuleAssociationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns all custom detection rule associations for your account. You can filter by rule ID and mode.
 */
export const listCustomDetectionRuleAssociations: API.PaginatedOperationMethod<
  ListCustomDetectionRuleAssociationsRequest & RegionInput,
  ListCustomDetectionRuleAssociationsResponse,
  ListCustomDetectionRuleAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<ListCustomDetectionRuleAssociationsRequest>,
  output: __S(3395, __c106, 3) as any as S.Schema<ListCustomDetectionRuleAssociationsResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomDetectionRuleAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleAssociations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCustomDetectionRuleAssociations",
})) as any;

export type ListCustomDetectionRuleOrgConfigurationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns all organization-level configurations for custom detection rules. You can filter the results by status.
 */
export const listCustomDetectionRuleOrgConfigurations: API.PaginatedOperationMethod<
  ListCustomDetectionRuleOrgConfigurationsRequest & RegionInput,
  ListCustomDetectionRuleOrgConfigurationsResponse,
  ListCustomDetectionRuleOrgConfigurationsError,
  Credentials | HttpClient.HttpClient,
  DetectionRuleOrgConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<ListCustomDetectionRuleOrgConfigurationsRequest>,
  output: __S(3427, __c107, 3) as any as S.Schema<ListCustomDetectionRuleOrgConfigurationsResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomDetectionRuleOrgConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Configurations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCustomDetectionRuleOrgConfigurations",
})) as any;

export type ListCustomDetectionRulesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns all available custom detection rules in GuardDuty. You can filter the results by data source, severity, tactic, technique, and service.
 */
export const listCustomDetectionRules: API.PaginatedOperationMethod<
  ListCustomDetectionRulesRequest & RegionInput,
  ListCustomDetectionRulesResponse,
  ListCustomDetectionRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3522, __c110, 2) as any as S.Schema<ListCustomDetectionRulesRequest>,
  output: __S(3525, __c110, 5) as any as S.Schema<ListCustomDetectionRulesResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomDetectionRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCustomDetectionRules",
})) as any;

export type ListDetectorsError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists detectorIds of all the existing Amazon GuardDuty detector resources.
 */
export const listDetectors: API.PaginatedOperationMethod<
  ListDetectorsRequest & RegionInput,
  ListDetectorsResponse,
  ListDetectorsError,
  Credentials | HttpClient.HttpClient,
  DetectorId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<ListDetectorsRequest>,
  output: __S(3553, __c111, 1) as any as S.Schema<ListDetectorsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DetectorIds",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDetectors",
})) as any;

export type ListFiltersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Returns a paginated list of the current filters.
 */
export const listFilters: API.PaginatedOperationMethod<
  ListFiltersRequest & RegionInput,
  ListFiltersResponse,
  ListFiltersError,
  Credentials | HttpClient.HttpClient,
  FilterName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<ListFiltersRequest>,
  output: __S(3585, __c112, 1) as any as S.Schema<ListFiltersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFilters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FilterNames",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFilters",
})) as any;

export type ListFindingsError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists GuardDuty findings for the specified detector ID.
 *
 * There might be regional differences because some flags might not be available in all the Regions where GuardDuty is currently supported. For more information, see Regions and endpoints.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest & RegionInput,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<ListFindingsRequest>,
  output: __S(3617, __c113, 1) as any as S.Schema<ListFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FindingIds",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFindings",
})) as any;

export type ListInvestigationRecordsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This API is currently available as a preview. This feature is available in the following Amazon Web Services Regions: US East (N. Virginia), US East (Ohio), US West (Oregon), Canada (Central), Europe (Frankfurt), Europe (Ireland), Europe (London), Europe (Paris), Europe (Stockholm), and Asia Pacific (Tokyo).
 *
 * Returns the records for a specific GuardDuty investigation. Each record is one step in the reasoning that GuardDuty followed to reach the results of the investigation.
 *
 * An administrator account can list the records of any investigation within the organization. Member accounts can only list the records of investigations that belong to them.
 */
export const listInvestigationRecords: API.PaginatedOperationMethod<
  ListInvestigationRecordsRequest & RegionInput,
  ListInvestigationRecordsResponse,
  ListInvestigationRecordsError,
  Credentials | HttpClient.HttpClient,
  InvestigationRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<ListInvestigationRecordsRequest>,
  output: __S(3728, __c116, 16) as any as S.Schema<ListInvestigationRecordsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvestigationRecords",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Records",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListInvestigationRecords",
})) as any;

export type ListInvestigationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * This API is currently available as a preview. This feature is available in the following Amazon Web Services Regions: US East (N. Virginia), US East (Ohio), US West (Oregon), Canada (Central), Europe (Frankfurt), Europe (Ireland), Europe (London), Europe (Paris), Europe (Stockholm), and Asia Pacific (Tokyo).
 *
 * Returns a list of investigations associated with the specified GuardDuty detector. You can filter the investigations by status, risk level, confidence, finding ID, and investigation type, and sort them by start time, end time, status, risk level, or confidence.
 *
 * An administrator account sees all investigations across the organization. Member accounts see only the investigations that belong to them.
 */
export const listInvestigations: API.PaginatedOperationMethod<
  ListInvestigationsRequest & RegionInput,
  ListInvestigationsResponse,
  ListInvestigationsError,
  Credentials | HttpClient.HttpClient,
  InvestigationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3746, __c117, 2) as any as S.Schema<ListInvestigationsRequest>,
  output: __S(3749, __c117, 5) as any as S.Schema<ListInvestigationsResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvestigations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Investigations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListInvestigations",
})) as any;

export type ListInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists all GuardDuty membership invitations that were sent to the current Amazon Web Services account.
 */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsRequest & RegionInput,
  ListInvitationsResponse,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  Invitation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<ListInvitationsRequest>,
  output: __S(3778, __c118, 2) as any as S.Schema<ListInvitationsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Invitations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListInvitations",
})) as any;

export type ListIPSetsError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists the IPSets of the GuardDuty service specified by the detector ID. If you use this operation from a member account, the IPSets returned are the IPSets from the associated administrator account.
 */
export const listIPSets: API.PaginatedOperationMethod<
  ListIPSetsRequest & RegionInput,
  ListIPSetsResponse,
  ListIPSetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<ListIPSetsRequest>,
  output: __S(3809, __c119, 1) as any as S.Schema<ListIPSetsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIPSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IpSetIds",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListIPSets",
})) as any;

export type ListMalwareProtectionPlansError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the Malware Protection plan IDs associated with the protected resources in your Amazon Web Services account.
 */
export const listMalwareProtectionPlans: API.OperationMethod<
  ListMalwareProtectionPlansRequest & RegionInput,
  ListMalwareProtectionPlansResponse,
  ListMalwareProtectionPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<ListMalwareProtectionPlansRequest>,
  output: __S(3842, __c120, 2) as any as S.Schema<ListMalwareProtectionPlansResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMalwareProtectionPlans",
  telemetry: TELEMETRY,
  span: "ListMalwareProtectionPlans",
}));

export type ListMalwareScansError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of malware scans. Each member account can view the malware scans for their own accounts. An administrator can view the malware scans for all of its members' accounts.
 */
export const listMalwareScans: API.PaginatedOperationMethod<
  ListMalwareScansRequest & RegionInput,
  ListMalwareScansResponse,
  ListMalwareScansError,
  Credentials | HttpClient.HttpClient,
  MalwareScan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3875, __c121, 3) as any as S.Schema<ListMalwareScansRequest>,
  output: __S(3878, __c121, 6) as any as S.Schema<ListMalwareScansResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMalwareScans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Scans",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMalwareScans",
})) as any;

export type ListMembersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists details about all member accounts for the current GuardDuty administrator account.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersRequest & RegionInput,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4000, __c125, 0) as any as S.Schema<ListMembersRequest>,
  output: __S(4001, __c125, 1) as any as S.Schema<ListMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Members",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMembers",
})) as any;

export type ListOrganizationAdminAccountsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the accounts designated as GuardDuty delegated administrators. Only the organization's management account can run this API operation.
 */
export const listOrganizationAdminAccounts: API.PaginatedOperationMethod<
  ListOrganizationAdminAccountsRequest & RegionInput,
  ListOrganizationAdminAccountsResponse,
  ListOrganizationAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  AdminAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4032, __c126, 0) as any as S.Schema<ListOrganizationAdminAccountsRequest>,
  output: __S(4035, __c126, 3) as any as S.Schema<ListOrganizationAdminAccountsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationAdminAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdminAccounts",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOrganizationAdminAccounts",
})) as any;

export type ListPublishingDestinationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of publishing destinations associated with the specified `detectorId`.
 */
export const listPublishingDestinations: API.PaginatedOperationMethod<
  ListPublishingDestinationsRequest & RegionInput,
  ListPublishingDestinationsResponse,
  ListPublishingDestinationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<ListPublishingDestinationsRequest>,
  output: __S(4067, __c127, 3) as any as S.Schema<ListPublishingDestinationsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublishingDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListPublishingDestinations",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists tags for a resource. Tagging is currently supported for detectors, finding filters, IP sets, threat intel sets, and publishing destination, with a limit of 50 tags per resource. When invoked, this operation returns all assigned tags for a given resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(4097, __c128, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListThreatEntitySetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the threat entity sets associated with the specified GuardDuty detector ID. If you use this operation from a member account, the threat entity sets that are returned as a response, belong to the administrator account.
 */
export const listThreatEntitySets: API.PaginatedOperationMethod<
  ListThreatEntitySetsRequest & RegionInput,
  ListThreatEntitySetsResponse,
  ListThreatEntitySetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4128, __c129, 0) as any as S.Schema<ListThreatEntitySetsRequest>,
  output: __S(4129, __c129, 1) as any as S.Schema<ListThreatEntitySetsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatEntitySets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ThreatEntitySetIds",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListThreatEntitySets",
})) as any;

export type ListThreatIntelSetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the ThreatIntelSets of the GuardDuty service specified by the detector ID. If you use this operation from a member account, the ThreatIntelSets associated with the administrator account are returned.
 */
export const listThreatIntelSets: API.PaginatedOperationMethod<
  ListThreatIntelSetsRequest & RegionInput,
  ListThreatIntelSetsResponse,
  ListThreatIntelSetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4160, __c130, 0) as any as S.Schema<ListThreatIntelSetsRequest>,
  output: __S(4161, __c130, 1) as any as S.Schema<ListThreatIntelSetsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatIntelSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ThreatIntelSetIds",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListThreatIntelSets",
})) as any;

export type ListTrustedEntitySetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the trusted entity sets associated with the specified GuardDuty detector ID. If you use this operation from a member account, the trusted entity sets that are returned as a response, belong to the administrator account.
 */
export const listTrustedEntitySets: API.PaginatedOperationMethod<
  ListTrustedEntitySetsRequest & RegionInput,
  ListTrustedEntitySetsResponse,
  ListTrustedEntitySetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4192, __c131, 0) as any as S.Schema<ListTrustedEntitySetsRequest>,
  output: __S(4193, __c131, 1) as any as S.Schema<ListTrustedEntitySetsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustedEntitySets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrustedEntitySetIds",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTrustedEntitySets",
})) as any;

export type SendObjectMalwareScanError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Initiates a malware scan for a specific S3 object. This API allows you to perform on-demand malware scanning of individual objects in S3 buckets that have Malware Protection for S3 enabled.
 *
 * When you use this API, the Amazon Web Services service terms for GuardDuty Malware Protection apply. For more information, see Amazon Web Services service terms for GuardDuty Malware Protection.
 */
export const sendObjectMalwareScan: API.OperationMethod<
  SendObjectMalwareScanRequest & RegionInput,
  SendObjectMalwareScanResponse,
  SendObjectMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4225, __c132, 1) as any as S.Schema<SendObjectMalwareScanRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<SendObjectMalwareScanResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendObjectMalwareScan",
  telemetry: TELEMETRY,
  span: "SendObjectMalwareScan",
}));

export type StartMalwareScanError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Initiates the malware scan. Invoking this API will automatically create the Service-linked role in the corresponding account if the resourceArn belongs to an EC2 instance.
 *
 * When the malware scan starts, you can use the associated scan ID to track the status of the scan. For more information, see ListMalwareScans and GetMalwareScan.
 *
 * When you use this API, the Amazon Web Services service terms for GuardDuty Malware Protection apply. For more information, see Amazon Web Services service terms for GuardDuty Malware Protection.
 */
export const startMalwareScan: API.OperationMethod<
  StartMalwareScanRequest & RegionInput,
  StartMalwareScanResponse,
  StartMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4257, __c133, 1) as any as S.Schema<StartMalwareScanRequest>,
  output: __S(4258, __c133, 2) as any as S.Schema<StartMalwareScanResponse>,
  errors: [BadRequestException, ConflictException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMalwareScan",
  telemetry: TELEMETRY,
  span: "StartMalwareScan",
}));

export type StartMonitoringMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Turns on GuardDuty monitoring of the specified member accounts. Use this operation to restart monitoring of accounts that you stopped monitoring with the StopMonitoringMembers operation.
 */
export const startMonitoringMembers: API.OperationMethod<
  StartMonitoringMembersRequest & RegionInput,
  StartMonitoringMembersResponse,
  StartMonitoringMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<StartMonitoringMembersRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<StartMonitoringMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMonitoringMembers",
  telemetry: TELEMETRY,
  span: "StartMonitoringMembers",
}));

export type StopMonitoringMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Stops GuardDuty monitoring for the specified member accounts. Use the `StartMonitoringMembers` operation to restart monitoring for those accounts.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to stop monitoring the member accounts in your organization.
 */
export const stopMonitoringMembers: API.OperationMethod<
  StopMonitoringMembersRequest & RegionInput,
  StopMonitoringMembersResponse,
  StopMonitoringMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<StopMonitoringMembersRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<StopMonitoringMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMonitoringMembers",
  telemetry: TELEMETRY,
  span: "StopMonitoringMembers",
}));

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Adds tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<TagResourceResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UnarchiveFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Unarchives GuardDuty findings specified by the `findingIds`.
 */
export const unarchiveFindings: API.OperationMethod<
  UnarchiveFindingsRequest & RegionInput,
  UnarchiveFindingsResponse,
  UnarchiveFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4416, __c138, 0) as any as S.Schema<UnarchiveFindingsRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UnarchiveFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveFindings",
  telemetry: TELEMETRY,
  span: "UnarchiveFindings",
}));

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateCustomDetectionRuleAssociationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the mode of an existing custom detection rule association.
 */
export const updateCustomDetectionRuleAssociation: API.OperationMethod<
  UpdateCustomDetectionRuleAssociationRequest & RegionInput,
  UpdateCustomDetectionRuleAssociationResponse,
  UpdateCustomDetectionRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4480, __c140, 0) as any as S.Schema<UpdateCustomDetectionRuleAssociationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateCustomDetectionRuleAssociationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomDetectionRuleAssociation",
  telemetry: TELEMETRY,
  span: "UpdateCustomDetectionRuleAssociation",
}));

export type UpdateCustomDetectionRuleOrgConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the organization-level configuration for a custom detection rule, including the mode and include/exclude account lists.
 */
export const updateCustomDetectionRuleOrgConfiguration: API.OperationMethod<
  UpdateCustomDetectionRuleOrgConfigurationRequest & RegionInput,
  UpdateCustomDetectionRuleOrgConfigurationResponse,
  UpdateCustomDetectionRuleOrgConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4512, __c141, 0) as any as S.Schema<UpdateCustomDetectionRuleOrgConfigurationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateCustomDetectionRuleOrgConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomDetectionRuleOrgConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateCustomDetectionRuleOrgConfiguration",
}));

export type UpdateDetectorError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Updates the GuardDuty detector specified by the detector ID.
 *
 * Specifying both EKS Runtime Monitoring (`EKS_RUNTIME_MONITORING`) and Runtime Monitoring (`RUNTIME_MONITORING`) will cause an error. You can add only one of these two features because Runtime Monitoring already includes the threat detection for Amazon EKS resources. For more information, see Runtime Monitoring.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const updateDetector: API.OperationMethod<
  UpdateDetectorRequest & RegionInput,
  UpdateDetectorResponse,
  UpdateDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4544, __c142, 0) as any as S.Schema<UpdateDetectorRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateDetectorResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDetector",
  telemetry: TELEMETRY,
  span: "UpdateDetector",
}));

export type UpdateFilterError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Updates the filter specified by the filter name.
 */
export const updateFilter: API.OperationMethod<
  UpdateFilterRequest & RegionInput,
  UpdateFilterResponse,
  UpdateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4576, __c143, 0) as any as S.Schema<UpdateFilterRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UpdateFilterResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFilter",
  telemetry: TELEMETRY,
  span: "UpdateFilter",
}));

export type UpdateFindingsFeedbackError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Marks the specified GuardDuty findings as useful or not useful.
 */
export const updateFindingsFeedback: API.OperationMethod<
  UpdateFindingsFeedbackRequest & RegionInput,
  UpdateFindingsFeedbackResponse,
  UpdateFindingsFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<UpdateFindingsFeedbackRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateFindingsFeedbackResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFindingsFeedback",
  telemetry: TELEMETRY,
  span: "UpdateFindingsFeedback",
}));

export type UpdateIPSetError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the IPSet specified by the IPSet ID.
 */
export const updateIPSet: API.OperationMethod<
  UpdateIPSetRequest & RegionInput,
  UpdateIPSetResponse,
  UpdateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<UpdateIPSetRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateIPSetResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIPSet",
  telemetry: TELEMETRY,
  span: "UpdateIPSet",
}));

export type UpdateMalwareProtectionPlanError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing Malware Protection plan resource.
 */
export const updateMalwareProtectionPlan: API.OperationMethod<
  UpdateMalwareProtectionPlanRequest & RegionInput,
  UpdateMalwareProtectionPlanResponse,
  UpdateMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(130, __c4, 2) as any as S.Schema<UpdateMalwareProtectionPlanRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateMalwareProtectionPlanResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMalwareProtectionPlan",
  telemetry: TELEMETRY,
  span: "UpdateMalwareProtectionPlan",
}));

export type UpdateMalwareScanSettingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the malware scan settings.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const updateMalwareScanSettings: API.OperationMethod<
  UpdateMalwareScanSettingsRequest & RegionInput,
  UpdateMalwareScanSettingsResponse,
  UpdateMalwareScanSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<UpdateMalwareScanSettingsRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateMalwareScanSettingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMalwareScanSettings",
  telemetry: TELEMETRY,
  span: "UpdateMalwareScanSettings",
}));

export type UpdateMemberDetectorsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Contains information on member accounts to be updated.
 *
 * Specifying both EKS Runtime Monitoring (`EKS_RUNTIME_MONITORING`) and Runtime Monitoring (`RUNTIME_MONITORING`) will cause an error. You can add only one of these two features because Runtime Monitoring already includes the threat detection for Amazon EKS resources. For more information, see Runtime Monitoring.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const updateMemberDetectors: API.OperationMethod<
  UpdateMemberDetectorsRequest & RegionInput,
  UpdateMemberDetectorsResponse,
  UpdateMemberDetectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<UpdateMemberDetectorsRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<UpdateMemberDetectorsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMemberDetectors",
  telemetry: TELEMETRY,
  span: "UpdateMemberDetectors",
}));

export type UpdateOrganizationConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Configures the delegated administrator account with the provided values. You must provide a value for either `autoEnableOrganizationMembers` or `autoEnable`, but not both.
 *
 * Specifying both EKS Runtime Monitoring (`EKS_RUNTIME_MONITORING`) and Runtime Monitoring (`RUNTIME_MONITORING`) will cause an error. You can add only one of these two features because Runtime Monitoring already includes the threat detection for Amazon EKS resources. For more information, see Runtime Monitoring.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest & RegionInput,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<UpdateOrganizationConfigurationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateOrganizationConfigurationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateOrganizationConfiguration",
}));

export type UpdatePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates information about the publishing destination specified by the `destinationId`.
 */
export const updatePublishingDestination: API.OperationMethod<
  UpdatePublishingDestinationRequest & RegionInput,
  UpdatePublishingDestinationResponse,
  UpdatePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<UpdatePublishingDestinationRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdatePublishingDestinationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublishingDestination",
  telemetry: TELEMETRY,
  span: "UpdatePublishingDestination",
}));

export type UpdateThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the threat entity set associated with the specified `threatEntitySetId`.
 */
export const updateThreatEntitySet: API.OperationMethod<
  UpdateThreatEntitySetRequest & RegionInput,
  UpdateThreatEntitySetResponse,
  UpdateThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<UpdateThreatEntitySetRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateThreatEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatEntitySet",
  telemetry: TELEMETRY,
  span: "UpdateThreatEntitySet",
}));

export type UpdateThreatIntelSetError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the ThreatIntelSet specified by the ThreatIntelSet ID.
 */
export const updateThreatIntelSet: API.OperationMethod<
  UpdateThreatIntelSetRequest & RegionInput,
  UpdateThreatIntelSetResponse,
  UpdateThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<UpdateThreatIntelSetRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateThreatIntelSetResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatIntelSet",
  telemetry: TELEMETRY,
  span: "UpdateThreatIntelSet",
}));

export type UpdateTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the trusted entity set associated with the specified `trustedEntitySetId`.
 */
export const updateTrustedEntitySet: API.OperationMethod<
  UpdateTrustedEntitySetRequest & RegionInput,
  UpdateTrustedEntitySetResponse,
  UpdateTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<UpdateTrustedEntitySetRequest>,
  output: __S(2528, __c79, 0) as any as S.Schema<UpdateTrustedEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustedEntitySet",
  telemetry: TELEMETRY,
  span: "UpdateTrustedEntitySet",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enable: S.optional(S.Boolean),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FindingPublishingFrequency: S.optional(S.String),
          DataSources: S.optional(__S(100, __c3, 4)),
          Tags: S.optional(__S(3936, __c123, 0)),
          Features: S.optional(__S(102, __c3, 6)),
        })
          .pipe(
            S.encodeKeys({
              Enable: "enable",
              ClientToken: "clientToken",
              FindingPublishingFrequency: "findingPublishingFrequency",
              DataSources: "dataSources",
              Tags: "tags",
              Features: "features",
            }),
          )
          .pipe(T.all(T.Http({ method: "POST", uri: "/detector" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDetectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MalwareProtection: S.optional(__S(34, __c1, 2)) }).pipe(
          S.encodeKeys({ MalwareProtection: "malwareProtection" }),
        ),
      ).annotate({ identifier: "UnprocessedDataSourcesResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.optional(S.String),
          UnprocessedDataSources: S.optional(__S(1, __c0, 1)),
        }).pipe(
          S.encodeKeys({
            DetectorId: "detectorId",
            UnprocessedDataSources: "unprocessedDataSources",
          }),
        ),
      ).annotate({ identifier: "CreateDetectorResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), Reason: S.optional(S.String) }).pipe(
          S.encodeKeys({ Status: "status", Reason: "reason" }),
        ),
      ).annotate({ identifier: "EbsVolumesResult" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EbsVolumes: S.optional(__S(32, __c1, 0)) }).pipe(
          S.encodeKeys({ EbsVolumes: "ebsVolumes" }),
        ),
      ).annotate({ identifier: "ScanEc2InstanceWithFindingsResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ScanEc2InstanceWithFindings: S.optional(__S(33, __c1, 1)),
          ServiceRole: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings",
            ServiceRole: "serviceRole",
          }),
        ),
      ).annotate({ identifier: "MalwareProtectionConfigurationResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Status: S.optional(S.String) }).pipe(
          S.encodeKeys({ Name: "name", Status: "status" }),
        ),
      ).annotate({ identifier: "DetectorAdditionalConfiguration" });
    case 1:
      return S.Array(__S(64, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enable: S.optional(S.Boolean) }).pipe(S.encodeKeys({ Enable: "enable" })),
      ).annotate({ identifier: "S3LogsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AuditLogs: S.optional(__S(96, __c3, 0)) }).pipe(
          S.encodeKeys({ AuditLogs: "auditLogs" }),
        ),
      ).annotate({ identifier: "KubernetesConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ EbsVolumes: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ EbsVolumes: "ebsVolumes" }),
        ),
      ).annotate({ identifier: "ScanEc2InstanceWithFindings" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ScanEc2InstanceWithFindings: S.optional(__S(98, __c3, 2)) }).pipe(
          S.encodeKeys({ ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings" }),
        ),
      ).annotate({ identifier: "MalwareProtectionConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          S3Logs: S.optional(__S(96, __c3, 0)),
          Kubernetes: S.optional(__S(97, __c3, 1)),
          MalwareProtection: S.optional(__S(99, __c3, 3)),
        }).pipe(
          S.encodeKeys({
            S3Logs: "s3Logs",
            Kubernetes: "kubernetes",
            MalwareProtection: "malwareProtection",
          }),
        ),
      ).annotate({ identifier: "DataSourceConfigurations" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AdditionalConfiguration: S.optional(__S(65, __c2, 1)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Status: "status",
            AdditionalConfiguration: "additionalConfiguration",
          }),
        ),
      ).annotate({ identifier: "DetectorFeatureConfiguration" });
    case 6:
      return S.Array(__S(101, __c3, 5));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ObjectPrefixes: S.optional(__S(3488, __c109, 0)) }).pipe(
          S.encodeKeys({ ObjectPrefixes: "objectPrefixes" }),
        ),
      ).annotate({ identifier: "UpdateS3BucketResource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ S3Bucket: S.optional(__S(128, __c4, 0)) }).pipe(
          S.encodeKeys({ S3Bucket: "s3Bucket" }),
        ),
      ).annotate({ identifier: "UpdateProtectedResource" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MalwareProtectionPlanId: S.String.pipe(T.HttpLabel("MalwareProtectionPlanId")),
          Role: S.optional(S.String),
          Actions: S.optional(__S(640, __c20, 0)),
          ProtectedResource: S.optional(__S(129, __c4, 1)),
        })
          .pipe(
            S.encodeKeys({
              Role: "role",
              Actions: "actions",
              ProtectedResource: "protectedResource",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "PATCH",
                uri: "/malware-protection-plan/{MalwareProtectionPlanId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateMalwareProtectionPlanRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          ScanResourceCriteria: S.optional(__S(2882, __c90, 2)),
          EbsSnapshotPreservation: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ScanResourceCriteria: "scanResourceCriteria",
              EbsSnapshotPreservation: "ebsSnapshotPreservation",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/malware-scan-settings" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateMalwareScanSettingsRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3488, __c109, 0)),
          DataSources: S.optional(__S(100, __c3, 4)),
          Features: S.optional(__S(102, __c3, 6)),
        })
          .pipe(
            S.encodeKeys({
              AccountIds: "accountIds",
              DataSources: "dataSources",
              Features: "features",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/detector/update" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateMemberDetectorsRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AutoEnable: S.optional(S.Boolean),
          DataSources: S.optional(__S(1636, __c51, 4)),
          Features: S.optional(__S(1640, __c51, 8)),
          AutoEnableOrganizationMembers: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              AutoEnable: "autoEnable",
              DataSources: "dataSources",
              Features: "features",
              AutoEnableOrganizationMembers: "autoEnableOrganizationMembers",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/admin" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateOrganizationConfigurationRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          DestinationId: S.String.pipe(T.HttpLabel("DestinationId")),
          DestinationProperties: S.optional(__S(832, __c26, 0)),
        })
          .pipe(S.encodeKeys({ DestinationProperties: "destinationProperties" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/detector/{DetectorId}/publishingDestination/{DestinationId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdatePublishingDestinationRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          ThreatEntitySetId: S.optional(S.String).pipe(T.HttpLabel("ThreatEntitySetId")),
          Name: S.optional(S.String),
          Location: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
          Activate: S.optional(S.Boolean),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Location: "location",
              ExpectedBucketOwner: "expectedBucketOwner",
              Activate: "activate",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateThreatEntitySetRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          ThreatIntelSetId: S.String.pipe(T.HttpLabel("ThreatIntelSetId")),
          Name: S.optional(S.String),
          Location: S.optional(S.String),
          Activate: S.optional(S.Boolean),
          ExpectedBucketOwner: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Location: "location",
              Activate: "activate",
              ExpectedBucketOwner: "expectedBucketOwner",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateThreatIntelSetRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          TrustedEntitySetId: S.String.pipe(T.HttpLabel("TrustedEntitySetId")),
          Name: S.optional(S.String),
          Location: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
          Activate: S.optional(S.Boolean),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Location: "location",
              ExpectedBucketOwner: "expectedBucketOwner",
              Activate: "activate",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateTrustedEntitySetRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Action: S.optional(S.String),
          Rank: S.optional(S.Number),
          FindingCriteria: S.optional(__S(418, __c13, 2)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3936, __c123, 0)),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Description: "description",
              Action: "action",
              Rank: "rank",
              FindingCriteria: "findingCriteria",
              ClientToken: "clientToken",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/filter" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateFilterRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Eq: S.optional(__S(3488, __c109, 0)),
          Neq: S.optional(__S(3488, __c109, 0)),
          Gt: S.optional(S.Number),
          Gte: S.optional(S.Number),
          Lt: S.optional(S.Number),
          Lte: S.optional(S.Number),
          Equals: S.optional(__S(3488, __c109, 0)),
          NotEquals: S.optional(__S(3488, __c109, 0)),
          GreaterThan: S.optional(S.Number),
          GreaterThanOrEqual: S.optional(S.Number),
          LessThan: S.optional(S.Number),
          LessThanOrEqual: S.optional(S.Number),
          Matches: S.optional(__S(3488, __c109, 0)),
          NotMatches: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            Eq: "eq",
            Neq: "neq",
            Gt: "gt",
            Gte: "gte",
            Lt: "lt",
            Lte: "lte",
            Equals: "equals",
            NotEquals: "notEquals",
            GreaterThan: "greaterThan",
            GreaterThanOrEqual: "greaterThanOrEqual",
            LessThan: "lessThan",
            LessThanOrEqual: "lessThanOrEqual",
            Matches: "matches",
            NotMatches: "notMatches",
          }),
        ),
      ).annotate({ identifier: "Condition" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(416, __c13, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ Criterion: S.optional(__S(417, __c13, 1)) }).pipe(
          S.encodeKeys({ Criterion: "criterion" }),
        ),
      ).annotate({ identifier: "FindingCriteria" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
      ).annotate({ identifier: "CreateFilterResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          TriggerPrompt: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(S.encodeKeys({ TriggerPrompt: "triggerPrompt", ClientToken: "clientToken" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/investigation" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateInvestigationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ InvestigationId: S.optional(S.String) }).pipe(
          S.encodeKeys({ InvestigationId: "investigationId" }),
        ),
      ).annotate({ identifier: "CreateInvestigationResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          Name: S.optional(S.String),
          Format: S.optional(S.String),
          Location: S.optional(S.String),
          Activate: S.optional(S.Boolean),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3936, __c123, 0)),
          ExpectedBucketOwner: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Format: "format",
              Location: "location",
              Activate: "activate",
              ClientToken: "clientToken",
              Tags: "tags",
              ExpectedBucketOwner: "expectedBucketOwner",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/ipset" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateIPSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IpSetId: S.optional(S.String) }).pipe(S.encodeKeys({ IpSetId: "ipSetId" })),
      ).annotate({ identifier: "CreateIPSetResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Role: S.optional(S.String),
          ProtectedResource: S.optional(__S(609, __c19, 1)),
          Actions: S.optional(__S(640, __c20, 0)),
          Tags: S.optional(__S(3936, __c123, 0)),
        })
          .pipe(
            S.encodeKeys({
              ClientToken: "clientToken",
              Role: "role",
              ProtectedResource: "protectedResource",
              Actions: "actions",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/malware-protection-plan" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateMalwareProtectionPlanRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String) }).pipe(S.encodeKeys({ Status: "status" })),
      ).annotate({ identifier: "MalwareProtectionPlanTaggingAction" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.optional(S.String),
          ObjectPrefixes: S.optional(__S(3488, __c109, 0)),
        }).pipe(S.encodeKeys({ BucketName: "bucketName", ObjectPrefixes: "objectPrefixes" })),
      ).annotate({ identifier: "CreateS3BucketResource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ S3Bucket: S.optional(__S(608, __c19, 0)) }).pipe(
          S.encodeKeys({ S3Bucket: "s3Bucket" }),
        ),
      ).annotate({ identifier: "CreateProtectedResource" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tagging: S.optional(__S(576, __c18, 0)) }).pipe(
          S.encodeKeys({ Tagging: "tagging" }),
        ),
      ).annotate({ identifier: "MalwareProtectionPlanActions" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MalwareProtectionPlanId: S.optional(S.String) }).pipe(
          S.encodeKeys({ MalwareProtectionPlanId: "malwareProtectionPlanId" }),
        ),
      ).annotate({ identifier: "CreateMalwareProtectionPlanResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Email: S.optional(SensitiveString) }).pipe(
          S.encodeKeys({ AccountId: "accountId", Email: "email" }),
        ),
      ).annotate({ identifier: "AccountDetail" });
    case 1:
      return S.Array(__S(704, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountDetails: S.optional(__S(705, __c22, 1)),
        })
          .pipe(S.encodeKeys({ AccountDetails: "accountDetails" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateMembersRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Result: S.optional(S.String) }).pipe(
          S.encodeKeys({ AccountId: "accountId", Result: "result" }),
        ),
      ).annotate({ identifier: "UnprocessedAccount" });
    case 1:
      return S.Array(__S(736, __c23, 0));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UnprocessedAccounts: S.optional(__S(737, __c23, 1)) }).pipe(
          S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
        ),
      ).annotate({ identifier: "CreateMembersResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          DestinationType: S.optional(S.String),
          DestinationProperties: S.optional(__S(832, __c26, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3936, __c123, 0)),
        })
          .pipe(
            S.encodeKeys({
              DestinationType: "destinationType",
              DestinationProperties: "destinationProperties",
              ClientToken: "clientToken",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/publishingDestination" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreatePublishingDestinationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DestinationId: S.optional(S.String) }).pipe(
          S.encodeKeys({ DestinationId: "destinationId" }),
        ),
      ).annotate({ identifier: "CreatePublishingDestinationResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationArn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DestinationArn: "destinationArn",
            KmsKeyArn: "kmsKeyArn",
            ExpectedBucketOwner: "expectedBucketOwner",
          }),
        ),
      ).annotate({ identifier: "DestinationProperties" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingTypes: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ FindingTypes: "findingTypes" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings/create" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateSampleFindingsRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          Name: S.optional(S.String),
          Format: S.optional(S.String),
          Location: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
          Activate: S.optional(S.Boolean),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3936, __c123, 0)),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Format: "format",
              Location: "location",
              ExpectedBucketOwner: "expectedBucketOwner",
              Activate: "activate",
              ClientToken: "clientToken",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/threatentityset" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateThreatEntitySetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ThreatEntitySetId: S.optional(S.String) }).pipe(
          S.encodeKeys({ ThreatEntitySetId: "threatEntitySetId" }),
        ),
      ).annotate({ identifier: "CreateThreatEntitySetResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          Name: S.optional(S.String),
          Format: S.optional(S.String),
          Location: S.optional(S.String),
          Activate: S.optional(S.Boolean),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3936, __c123, 0)),
          ExpectedBucketOwner: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Format: "format",
              Location: "location",
              Activate: "activate",
              ClientToken: "clientToken",
              Tags: "tags",
              ExpectedBucketOwner: "expectedBucketOwner",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/threatintelset" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateThreatIntelSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ThreatIntelSetId: S.optional(S.String) }).pipe(
          S.encodeKeys({ ThreatIntelSetId: "threatIntelSetId" }),
        ),
      ).annotate({ identifier: "CreateThreatIntelSetResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          Name: S.optional(S.String),
          Format: S.optional(S.String),
          Location: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
          Activate: S.optional(S.Boolean),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3936, __c123, 0)),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Format: "format",
              Location: "location",
              ExpectedBucketOwner: "expectedBucketOwner",
              Activate: "activate",
              ClientToken: "clientToken",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/trustedentityset" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateTrustedEntitySetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TrustedEntitySetId: S.optional(S.String) }).pipe(
          S.encodeKeys({ TrustedEntitySetId: "trustedEntitySetId" }),
        ),
      ).annotate({ identifier: "CreateTrustedEntitySetResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(3488, __c109, 0)) })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/invitation/decline" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DeclineInvitationsRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String.pipe(T.HttpLabel("RuleId")),
          AssociationId: S.String.pipe(T.HttpLabel("AssociationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/custom-detection-rule/rule/{RuleId}/association/{AssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomDetectionRuleAssociationRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String.pipe(T.HttpLabel("RuleId")),
          Mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/custom-detection-rule/org-configuration/{RuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomDetectionRuleOrgConfigurationRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/detector/{DetectorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDetectorRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FilterName: S.String.pipe(T.HttpLabel("FilterName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/detector/{DetectorId}/filter/{FilterName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFilterRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(3488, __c109, 0)) })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/invitation/delete" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DeleteInvitationsRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          IpSetId: S.optional(S.String).pipe(T.HttpLabel("IpSetId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/detector/{DetectorId}/ipset/{IpSetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIPSetRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MalwareProtectionPlanId: S.optional(S.String).pipe(
            T.HttpLabel("MalwareProtectionPlanId"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/malware-protection-plan/{MalwareProtectionPlanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMalwareProtectionPlanRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/delete" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DeleteMembersRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          DestinationId: S.String.pipe(T.HttpLabel("DestinationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/detector/{DetectorId}/publishingDestination/{DestinationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePublishingDestinationRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          ThreatEntitySetId: S.optional(S.String).pipe(T.HttpLabel("ThreatEntitySetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteThreatEntitySetRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          ThreatIntelSetId: S.String.pipe(T.HttpLabel("ThreatIntelSetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteThreatIntelSetRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          TrustedEntitySetId: S.String.pipe(T.HttpLabel("TrustedEntitySetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTrustedEntitySetRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CriterionKey: S.optional(S.String),
          FilterCondition: S.optional(__S(1568, __c49, 0)),
        }).pipe(S.encodeKeys({ CriterionKey: "criterionKey", FilterCondition: "filterCondition" })),
      ).annotate({ identifier: "FilterCriterion" });
    case 1:
      return S.Array(__S(1408, __c44, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FilterCriterion: S.optional(__S(1409, __c44, 1)) }).pipe(
          S.encodeKeys({ FilterCriterion: "filterCriterion" }),
        ),
      ).annotate({ identifier: "FilterCriteria" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          FilterCriteria: S.optional(__S(1410, __c44, 2)),
          SortCriteria: S.optional(__S(1504, __c47, 0)),
        })
          .pipe(
            S.encodeKeys({
              NextToken: "nextToken",
              MaxResults: "maxResults",
              FilterCriteria: "filterCriteria",
              SortCriteria: "sortCriteria",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/malware-scans" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DescribeMalwareScansRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ InstanceArn: "instanceArn" }),
        ),
      ).annotate({ identifier: "ResourceDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({ ScanResult: S.optional(S.String) }).pipe(
          S.encodeKeys({ ScanResult: "scanResult" }),
        ),
      ).annotate({ identifier: "ScanResultDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.optional(S.String),
          AdminDetectorId: S.optional(S.String),
          ScanId: S.optional(S.String),
          ScanStatus: S.optional(S.String),
          FailureReason: S.optional(S.String),
          ScanStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TriggerDetails: S.optional(__S(1536, __c48, 0)),
          ResourceDetails: S.optional(__S(1412, __c44, 4)),
          ScanResultDetails: S.optional(__S(1413, __c44, 5)),
          AccountId: S.optional(S.String),
          TotalBytes: S.optional(S.Number),
          FileCount: S.optional(S.Number),
          AttachedVolumes: S.optional(__S(1440, __c45, 0)),
          ScanType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DetectorId: "detectorId",
            AdminDetectorId: "adminDetectorId",
            ScanId: "scanId",
            ScanStatus: "scanStatus",
            FailureReason: "failureReason",
            ScanStartTime: "scanStartTime",
            ScanEndTime: "scanEndTime",
            TriggerDetails: "triggerDetails",
            ResourceDetails: "resourceDetails",
            ScanResultDetails: "scanResultDetails",
            AccountId: "accountId",
            TotalBytes: "totalBytes",
            FileCount: "fileCount",
            AttachedVolumes: "attachedVolumes",
            ScanType: "scanType",
          }),
        ),
      ).annotate({ identifier: "Scan" });
    case 7:
      return S.Array(__S(1414, __c44, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ Scans: S.optional(__S(1415, __c44, 7)), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Scans: "scans", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "DescribeMalwareScansResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1472, __c46, 0));
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeArn: S.optional(S.String),
          VolumeType: S.optional(S.String),
          DeviceName: S.optional(S.String),
          VolumeSizeInGB: S.optional(S.Number),
          EncryptionType: S.optional(S.String),
          SnapshotArn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            VolumeArn: "volumeArn",
            VolumeType: "volumeType",
            DeviceName: "deviceName",
            VolumeSizeInGB: "volumeSizeInGB",
            EncryptionType: "encryptionType",
            SnapshotArn: "snapshotArn",
            KmsKeyArn: "kmsKeyArn",
          }),
        ),
      ).annotate({ identifier: "VolumeDetail" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), OrderBy: S.optional(S.String) }).pipe(
          S.encodeKeys({ AttributeName: "attributeName", OrderBy: "orderBy" }),
        ),
      ).annotate({ identifier: "SortCriteria" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GuardDutyFindingId: S.optional(S.String),
          Description: S.optional(S.String),
          TriggerType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            GuardDutyFindingId: "guardDutyFindingId",
            Description: "description",
            TriggerType: "triggerType",
          }),
        ),
      ).annotate({ identifier: "TriggerDetails" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EqualsValue: S.optional(S.String),
          GreaterThan: S.optional(S.Number),
          LessThan: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            EqualsValue: "equalsValue",
            GreaterThan: "greaterThan",
            LessThan: "lessThan",
          }),
        ),
      ).annotate({ identifier: "FilterCondition" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/admin" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeOrganizationConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoEnable: S.optional(S.Boolean),
          MemberAccountLimitReached: S.optional(S.Boolean),
          DataSources: S.optional(__S(1636, __c51, 4)),
          Features: S.optional(__S(1640, __c51, 8)),
          NextToken: S.optional(S.String),
          AutoEnableOrganizationMembers: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AutoEnable: "autoEnable",
            MemberAccountLimitReached: "memberAccountLimitReached",
            DataSources: "dataSources",
            Features: "features",
            NextToken: "nextToken",
            AutoEnableOrganizationMembers: "autoEnableOrganizationMembers",
          }),
        ),
      ).annotate({ identifier: "DescribeOrganizationConfigurationResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoEnable: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ AutoEnable: "autoEnable" }),
        ),
      ).annotate({ identifier: "OrganizationS3LogsConfigurationResult" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AuditLogs: S.optional(__S(1632, __c51, 0)) }).pipe(
          S.encodeKeys({ AuditLogs: "auditLogs" }),
        ),
      ).annotate({ identifier: "OrganizationKubernetesConfigurationResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({ EbsVolumes: S.optional(__S(1632, __c51, 0)) }).pipe(
          S.encodeKeys({ EbsVolumes: "ebsVolumes" }),
        ),
      ).annotate({ identifier: "OrganizationScanEc2InstanceWithFindingsResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ScanEc2InstanceWithFindings: S.optional(__S(1634, __c51, 2)) }).pipe(
          S.encodeKeys({ ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings" }),
        ),
      ).annotate({ identifier: "OrganizationMalwareProtectionConfigurationResult" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          S3Logs: S.optional(__S(1632, __c51, 0)),
          Kubernetes: S.optional(__S(1633, __c51, 1)),
          MalwareProtection: S.optional(__S(1635, __c51, 3)),
        }).pipe(
          S.encodeKeys({
            S3Logs: "s3Logs",
            Kubernetes: "kubernetes",
            MalwareProtection: "malwareProtection",
          }),
        ),
      ).annotate({ identifier: "OrganizationDataSourceConfigurationsResult" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), AutoEnable: S.optional(S.String) }).pipe(
          S.encodeKeys({ Name: "name", AutoEnable: "autoEnable" }),
        ),
      ).annotate({ identifier: "OrganizationAdditionalConfigurationResult" });
    case 6:
      return S.Array(__S(1637, __c51, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          AutoEnable: S.optional(S.String),
          AdditionalConfiguration: S.optional(__S(1638, __c51, 6)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            AutoEnable: "autoEnable",
            AdditionalConfiguration: "additionalConfiguration",
          }),
        ),
      ).annotate({ identifier: "OrganizationFeatureConfigurationResult" });
    case 8:
      return S.Array(__S(1639, __c51, 7));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          DestinationId: S.String.pipe(T.HttpLabel("DestinationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/detector/{DetectorId}/publishingDestination/{DestinationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePublishingDestinationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DestinationId: S.optional(S.String),
          DestinationType: S.optional(S.String),
          Status: S.optional(S.String),
          PublishingFailureStartTimestamp: S.optional(S.Number),
          DestinationProperties: S.optional(__S(832, __c26, 0)),
          Tags: S.optional(__S(3936, __c123, 0)),
        }).pipe(
          S.encodeKeys({
            DestinationId: "destinationId",
            DestinationType: "destinationType",
            Status: "status",
            PublishingFailureStartTimestamp: "publishingFailureStartTimestamp",
            DestinationProperties: "destinationProperties",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "DescribePublishingDestinationResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdminAccountId: S.optional(S.String) })
          .pipe(S.encodeKeys({ AdminAccountId: "adminAccountId" }))
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/admin/disable" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "DisableOrganizationAdminAccountRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/detector/{DetectorId}/administrator/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateFromAdministratorAccountRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/detector/{DetectorId}/master/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateFromMasterAccountRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/disassociate" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DisassociateMembersRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdminAccountId: S.optional(S.String) })
          .pipe(S.encodeKeys({ AdminAccountId: "adminAccountId" }))
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/admin/enable" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "EnableOrganizationAdminAccountRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/administrator" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAdministratorAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Administrator: S.optional(__S(1888, __c59, 0)) }).pipe(
          S.encodeKeys({ Administrator: "administrator" }),
        ),
      ).annotate({ identifier: "GetAdministratorAccountResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          InvitationId: S.optional(S.String),
          RelationshipStatus: S.optional(S.String),
          InvitedAt: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            InvitationId: "invitationId",
            RelationshipStatus: "relationshipStatus",
            InvitedAt: "invitedAt",
          }),
        ),
      ).annotate({ identifier: "Administrator" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FilterCriteria: S.optional(__S(1986, __c62, 2)),
          StatisticsType: S.optional(__S(1952, __c61, 0)),
        })
          .pipe(
            S.encodeKeys({ FilterCriteria: "filterCriteria", StatisticsType: "statisticsType" }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/coverage/statistics" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetCoverageStatisticsRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CountByResourceType: S.optional(__S(1921, __c60, 1)),
          CountByCoverageStatus: S.optional(__S(1921, __c60, 1)),
        }).pipe(
          S.encodeKeys({
            CountByResourceType: "countByResourceType",
            CountByCoverageStatus: "countByCoverageStatus",
          }),
        ),
      ).annotate({ identifier: "CoverageStatistics" });
    case 3:
      return S.suspend(() =>
        S.Struct({ CoverageStatistics: S.optional(__S(1922, __c60, 2)) }).pipe(
          S.encodeKeys({ CoverageStatistics: "coverageStatistics" }),
        ),
      ).annotate({ identifier: "GetCoverageStatisticsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CriterionKey: S.optional(S.String),
          FilterCondition: S.optional(__S(2016, __c63, 0)),
        }).pipe(S.encodeKeys({ CriterionKey: "criterionKey", FilterCondition: "filterCondition" })),
      ).annotate({ identifier: "CoverageFilterCriterion" });
    case 1:
      return S.Array(__S(1984, __c62, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FilterCriterion: S.optional(__S(1985, __c62, 1)) }).pipe(
          S.encodeKeys({ FilterCriterion: "filterCriterion" }),
        ),
      ).annotate({ identifier: "CoverageFilterCriteria" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Equals: S.optional(__S(3488, __c109, 0)),
          NotEquals: S.optional(__S(3488, __c109, 0)),
        }).pipe(S.encodeKeys({ Equals: "equals", NotEquals: "notEquals" })),
      ).annotate({ identifier: "CoverageFilterCondition" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleId: S.String.pipe(T.HttpLabel("RuleId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/custom-detection-rule/rule/{RuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomDetectionRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Expression: S.optional(S.String) }).pipe(
          S.encodeKeys({ Expression: "expression" }),
        ),
      ).annotate({ identifier: "RuleDefinition" });
    case 2:
      return S.suspend(() =>
        S.Struct({ MinAgentVersion: S.optional(S.String) }).pipe(
          S.encodeKeys({ MinAgentVersion: "minAgentVersion" }),
        ),
      ).annotate({ identifier: "DetectionRuleEksRequirements" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Eks: S.optional(__S(2050, __c64, 2)),
          Ec2: S.optional(__S(2050, __c64, 2)),
          EcsFargate: S.optional(__S(2050, __c64, 2)),
        }).pipe(S.encodeKeys({ Eks: "eks", Ec2: "ec2", EcsFargate: "ecsFargate" })),
      ).annotate({ identifier: "DetectionRuleRuntimePlatforms" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Platforms: S.optional(__S(2051, __c64, 3)) }).pipe(
          S.encodeKeys({ Platforms: "platforms" }),
        ),
      ).annotate({ identifier: "DetectionRuleRuntimeMonitoringDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Severity: S.optional(S.String),
          DataSource: S.optional(S.String),
          Tactic: S.optional(S.String),
          Technique: S.optional(S.String),
          Service: S.optional(S.String),
          Definition: S.optional(__S(2049, __c64, 1)),
          Language: S.optional(S.String),
          Schema: S.optional(S.String),
          RuntimeMonitoringDetails: S.optional(__S(2052, __c64, 4)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            RuleId: "ruleId",
            Arn: "arn",
            Name: "name",
            Description: "description",
            Severity: "severity",
            DataSource: "dataSource",
            Tactic: "tactic",
            Technique: "technique",
            Service: "service",
            Definition: "definition",
            Language: "language",
            Schema: "schema",
            RuntimeMonitoringDetails: "runtimeMonitoringDetails",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
          }),
        ),
      ).annotate({ identifier: "RuleDetail" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Rule: S.optional(__S(2053, __c64, 5)) }).pipe(S.encodeKeys({ Rule: "rule" })),
      ).annotate({ identifier: "GetCustomDetectionRuleResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String.pipe(T.HttpLabel("RuleId")),
          AssociationId: S.String.pipe(T.HttpLabel("AssociationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/custom-detection-rule/rule/{RuleId}/association/{AssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomDetectionRuleAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleAssociation: S.optional(__S(3968, __c124, 0)),
          Tags: S.optional(__S(3936, __c123, 0)),
        }).pipe(S.encodeKeys({ RuleAssociation: "ruleAssociation", Tags: "tags" })),
      ).annotate({ identifier: "GetCustomDetectionRuleAssociationResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String.pipe(T.HttpLabel("RuleId")),
          Mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/custom-detection-rule/org-configuration/{RuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomDetectionRuleOrgConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          Mode: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          IncludeAccountIds: S.optional(__S(3488, __c109, 0)),
          ExcludeAccountIds: S.optional(__S(3488, __c109, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            RuleId: "ruleId",
            Mode: "mode",
            Status: "status",
            StatusReason: "statusReason",
            IncludeAccountIds: "includeAccountIds",
            ExcludeAccountIds: "excludeAccountIds",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            ExpiresAt: "expiresAt",
          }),
        ),
      ).annotate({ identifier: "DetectionRuleOrgConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Configuration: S.optional(__S(2113, __c66, 1)) }).pipe(
          S.encodeKeys({ Configuration: "configuration" }),
        ),
      ).annotate({ identifier: "GetCustomDetectionRuleOrgConfigurationResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDetectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(S.String),
          FindingPublishingFrequency: S.optional(S.String),
          ServiceRole: S.optional(S.String),
          Status: S.optional(S.String),
          UpdatedAt: S.optional(S.String),
          DataSources: S.optional(__S(2177, __c68, 1)),
          Tags: S.optional(__S(3936, __c123, 0)),
          Features: S.optional(__S(2181, __c68, 5)),
        }).pipe(
          S.encodeKeys({
            CreatedAt: "createdAt",
            FindingPublishingFrequency: "findingPublishingFrequency",
            ServiceRole: "serviceRole",
            Status: "status",
            UpdatedAt: "updatedAt",
            DataSources: "dataSources",
            Tags: "tags",
            Features: "features",
          }),
        ),
      ).annotate({ identifier: "GetDetectorResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AuditLogs: S.optional(__S(576, __c18, 0)) }).pipe(
          S.encodeKeys({ AuditLogs: "auditLogs" }),
        ),
      ).annotate({ identifier: "KubernetesConfigurationResult" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudTrail: S.optional(__S(576, __c18, 0)),
          DNSLogs: S.optional(__S(576, __c18, 0)),
          FlowLogs: S.optional(__S(576, __c18, 0)),
          S3Logs: S.optional(__S(576, __c18, 0)),
          Kubernetes: S.optional(__S(2176, __c68, 0)),
          MalwareProtection: S.optional(__S(34, __c1, 2)),
        }).pipe(
          S.encodeKeys({
            CloudTrail: "cloudTrail",
            DNSLogs: "dnsLogs",
            FlowLogs: "flowLogs",
            S3Logs: "s3Logs",
            Kubernetes: "kubernetes",
            MalwareProtection: "malwareProtection",
          }),
        ),
      ).annotate({ identifier: "DataSourceConfigurationsResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ManagedBy: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Status: "status",
            UpdatedAt: "updatedAt",
            ManagedBy: "managedBy",
          }),
        ),
      ).annotate({ identifier: "DetectorAdditionalConfigurationResult" });
    case 3:
      return S.Array(__S(2178, __c68, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AdditionalConfiguration: S.optional(__S(2179, __c68, 3)),
          ManagedBy: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Status: "status",
            UpdatedAt: "updatedAt",
            AdditionalConfiguration: "additionalConfiguration",
            ManagedBy: "managedBy",
          }),
        ),
      ).annotate({ identifier: "DetectorFeatureConfigurationResult" });
    case 5:
      return S.Array(__S(2180, __c68, 4));
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FilterName: S.String.pipe(T.HttpLabel("FilterName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/filter/{FilterName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFilterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Action: S.optional(S.String),
          Rank: S.optional(S.Number),
          FindingCriteria: S.optional(__S(418, __c13, 2)),
          Tags: S.optional(__S(3936, __c123, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Version: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Description: "description",
            Action: "action",
            Rank: "rank",
            FindingCriteria: "findingCriteria",
            Tags: "tags",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            Version: "version",
          }),
        ),
      ).annotate({ identifier: "GetFilterResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingIds: S.optional(__S(3488, __c109, 0)),
          SortCriteria: S.optional(__S(1504, __c47, 0)),
        })
          .pipe(S.encodeKeys({ FindingIds: "findingIds", SortCriteria: "sortCriteria" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings/get" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessKeyId: S.optional(S.String),
          PrincipalId: S.optional(S.String),
          UserName: S.optional(S.String),
          UserType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccessKeyId: "accessKeyId",
            PrincipalId: "principalId",
            UserName: "userName",
            UserType: "userType",
          }),
        ),
      ).annotate({ identifier: "AccessKeyDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String) }).pipe(S.encodeKeys({ Id: "id" })),
      ).annotate({ identifier: "Owner" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EncryptionType: S.optional(S.String),
          KmsMasterKeyArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ EncryptionType: "encryptionType", KmsMasterKeyArn: "kmsMasterKeyArn" }),
        ),
      ).annotate({ identifier: "DefaultServerSideEncryption" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AllowsPublicReadAccess: S.optional(S.Boolean),
          AllowsPublicWriteAccess: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            AllowsPublicReadAccess: "allowsPublicReadAccess",
            AllowsPublicWriteAccess: "allowsPublicWriteAccess",
          }),
        ),
      ).annotate({ identifier: "AccessControlList" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          IgnorePublicAcls: S.optional(S.Boolean),
          RestrictPublicBuckets: S.optional(S.Boolean),
          BlockPublicAcls: S.optional(S.Boolean),
          BlockPublicPolicy: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            IgnorePublicAcls: "ignorePublicAcls",
            RestrictPublicBuckets: "restrictPublicBuckets",
            BlockPublicAcls: "blockPublicAcls",
            BlockPublicPolicy: "blockPublicPolicy",
          }),
        ),
      ).annotate({ identifier: "BlockPublicAccess" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          AccessControlList: S.optional(__S(2244, __c70, 4)),
          BucketPolicy: S.optional(__S(2244, __c70, 4)),
          BlockPublicAccess: S.optional(__S(2245, __c70, 5)),
        }).pipe(
          S.encodeKeys({
            AccessControlList: "accessControlList",
            BucketPolicy: "bucketPolicy",
            BlockPublicAccess: "blockPublicAccess",
          }),
        ),
      ).annotate({ identifier: "BucketLevelPermissions" });
    case 7:
      return S.suspend(() =>
        S.Struct({ BlockPublicAccess: S.optional(__S(2245, __c70, 5)) }).pipe(
          S.encodeKeys({ BlockPublicAccess: "blockPublicAccess" }),
        ),
      ).annotate({ identifier: "AccountLevelPermissions" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          BucketLevelPermissions: S.optional(__S(2246, __c70, 6)),
          AccountLevelPermissions: S.optional(__S(2247, __c70, 7)),
        }).pipe(
          S.encodeKeys({
            BucketLevelPermissions: "bucketLevelPermissions",
            AccountLevelPermissions: "accountLevelPermissions",
          }),
        ),
      ).annotate({ identifier: "PermissionConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          PermissionConfiguration: S.optional(__S(2248, __c70, 8)),
          EffectivePermission: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            PermissionConfiguration: "permissionConfiguration",
            EffectivePermission: "effectivePermission",
          }),
        ),
      ).annotate({ identifier: "PublicAccess" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          ObjectArn: S.optional(S.String),
          Key: S.optional(S.String),
          ETag: S.optional(S.String),
          Hash: S.optional(S.String),
          VersionId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ObjectArn: "objectArn",
            Key: "key",
            ETag: "eTag",
            Hash: "hash",
            VersionId: "versionId",
          }),
        ),
      ).annotate({ identifier: "S3ObjectDetail" });
    case 11:
      return S.Array(__S(2250, __c70, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Owner: S.optional(__S(2242, __c70, 2)),
          Tags: S.optional(__S(2465, __c77, 1)),
          DefaultServerSideEncryption: S.optional(__S(2243, __c70, 3)),
          PublicAccess: S.optional(__S(2249, __c70, 9)),
          S3ObjectDetails: S.optional(__S(2251, __c70, 11)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Name: "name",
            Type: "type",
            CreatedAt: "createdAt",
            Owner: "owner",
            Tags: "tags",
            DefaultServerSideEncryption: "defaultServerSideEncryption",
            PublicAccess: "publicAccess",
            S3ObjectDetails: "s3ObjectDetails",
          }),
        ),
      ).annotate({ identifier: "S3BucketDetail" });
    case 13:
      return S.Array(__S(2252, __c70, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Id: S.optional(S.String) }).pipe(
          S.encodeKeys({ Arn: "arn", Id: "id" }),
        ),
      ).annotate({ identifier: "IamInstanceProfile" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          PrivateDnsName: S.optional(S.String),
          PrivateIpAddress: S.optional(SensitiveString),
        }).pipe(
          S.encodeKeys({ PrivateDnsName: "privateDnsName", PrivateIpAddress: "privateIpAddress" }),
        ),
      ).annotate({ identifier: "PrivateIpAddressDetails" });
    case 16:
      return S.Array(__S(2255, __c70, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ GroupId: S.optional(S.String), GroupName: S.optional(S.String) }).pipe(
          S.encodeKeys({ GroupId: "groupId", GroupName: "groupName" }),
        ),
      ).annotate({ identifier: "SecurityGroup" });
    case 18:
      return S.Array(__S(2257, __c70, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          Ipv6Addresses: S.optional(__S(3488, __c109, 0)),
          NetworkInterfaceId: S.optional(S.String),
          PrivateDnsName: S.optional(S.String),
          PrivateIpAddress: S.optional(SensitiveString),
          PrivateIpAddresses: S.optional(__S(2256, __c70, 16)),
          PublicDnsName: S.optional(S.String),
          PublicIp: S.optional(S.String),
          SecurityGroups: S.optional(__S(2258, __c70, 18)),
          SubnetId: S.optional(S.String),
          VpcId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Ipv6Addresses: "ipv6Addresses",
            NetworkInterfaceId: "networkInterfaceId",
            PrivateDnsName: "privateDnsName",
            PrivateIpAddress: "privateIpAddress",
            PrivateIpAddresses: "privateIpAddresses",
            PublicDnsName: "publicDnsName",
            PublicIp: "publicIp",
            SecurityGroups: "securityGroups",
            SubnetId: "subnetId",
            VpcId: "vpcId",
          }),
        ),
      ).annotate({ identifier: "NetworkInterface" });
    case 20:
      return S.Array(__S(2259, __c70, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), ProductType: S.optional(S.String) }).pipe(
          S.encodeKeys({ Code: "productCodeId", ProductType: "productCodeType" }),
        ),
      ).annotate({ identifier: "ProductCode" });
    case 22:
      return S.Array(__S(2261, __c70, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          IamInstanceProfile: S.optional(__S(2254, __c70, 14)),
          ImageDescription: S.optional(S.String),
          ImageId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceState: S.optional(S.String),
          InstanceType: S.optional(S.String),
          OutpostArn: S.optional(S.String),
          LaunchTime: S.optional(S.String),
          NetworkInterfaces: S.optional(__S(2260, __c70, 20)),
          Platform: S.optional(S.String),
          ProductCodes: S.optional(__S(2262, __c70, 22)),
          Tags: S.optional(__S(2465, __c77, 1)),
        }).pipe(
          S.encodeKeys({
            AvailabilityZone: "availabilityZone",
            IamInstanceProfile: "iamInstanceProfile",
            ImageDescription: "imageDescription",
            ImageId: "imageId",
            InstanceId: "instanceId",
            InstanceState: "instanceState",
            InstanceType: "instanceType",
            OutpostArn: "outpostArn",
            LaunchTime: "launchTime",
            NetworkInterfaces: "networkInterfaces",
            Platform: "platform",
            ProductCodes: "productCodes",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "InstanceDetails" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          VpcId: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(2465, __c77, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            VpcId: "vpcId",
            Status: "status",
            Tags: "tags",
            CreatedAt: "createdAt",
          }),
        ),
      ).annotate({ identifier: "EksClusterDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({ Username: S.optional(S.String), Groups: S.optional(__S(3488, __c109, 0)) }).pipe(
          S.encodeKeys({ Username: "username", Groups: "groups" }),
        ),
      ).annotate({ identifier: "ImpersonatedUser" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Username: S.optional(S.String),
          Uid: S.optional(S.String),
          Groups: S.optional(__S(3488, __c109, 0)),
          SessionName: S.optional(__S(3488, __c109, 0)),
          ImpersonatedUser: S.optional(__S(2265, __c70, 25)),
        }).pipe(
          S.encodeKeys({
            Username: "username",
            Uid: "uid",
            Groups: "groups",
            SessionName: "sessionName",
            ImpersonatedUser: "impersonatedUser",
          }),
        ),
      ).annotate({ identifier: "KubernetesUserDetails" });
    case 27:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), MountPath: S.optional(S.String) }).pipe(
          S.encodeKeys({ Name: "name", MountPath: "mountPath" }),
        ),
      ).annotate({ identifier: "VolumeMount" });
    case 28:
      return S.Array(__S(2267, __c70, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          Privileged: S.optional(S.Boolean),
          AllowPrivilegeEscalation: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            Privileged: "privileged",
            AllowPrivilegeEscalation: "allowPrivilegeEscalation",
          }),
        ),
      ).annotate({ identifier: "SecurityContext" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          ContainerRuntime: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Image: S.optional(S.String),
          ImagePrefix: S.optional(S.String),
          VolumeMounts: S.optional(__S(2268, __c70, 28)),
          SecurityContext: S.optional(__S(2269, __c70, 29)),
        }).pipe(
          S.encodeKeys({
            ContainerRuntime: "containerRuntime",
            Id: "id",
            Name: "name",
            Image: "image",
            ImagePrefix: "imagePrefix",
            VolumeMounts: "volumeMounts",
            SecurityContext: "securityContext",
          }),
        ),
      ).annotate({ identifier: "Container" });
    case 31:
      return S.Array(__S(2270, __c70, 30));
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Path: S.optional(S.String) }).pipe(S.encodeKeys({ Path: "path" })),
      ).annotate({ identifier: "HostPath" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), HostPath: S.optional(__S(2272, __c71, 0)) }).pipe(
          S.encodeKeys({ Name: "name", HostPath: "hostPath" }),
        ),
      ).annotate({ identifier: "Volume" });
    case 2:
      return S.Array(__S(2273, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Uid: S.optional(S.String),
          Namespace: S.optional(S.String),
          HostNetwork: S.optional(S.Boolean),
          ServiceAccountName: S.optional(S.String),
          Containers: S.optional(__S(2271, __c70, 31)),
          Volumes: S.optional(__S(2274, __c71, 2)),
          HostIPC: S.optional(S.Boolean),
          HostPID: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Type: "type",
            Uid: "uid",
            Namespace: "namespace",
            HostNetwork: "hostNetwork",
            ServiceAccountName: "serviceAccountName",
            Containers: "containers",
            Volumes: "volumes",
            HostIPC: "hostIPC",
            HostPID: "hostPID",
          }),
        ),
      ).annotate({ identifier: "KubernetesWorkloadDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          KubernetesUserDetails: S.optional(__S(2266, __c70, 26)),
          KubernetesWorkloadDetails: S.optional(__S(2275, __c71, 3)),
        }).pipe(
          S.encodeKeys({
            KubernetesUserDetails: "kubernetesUserDetails",
            KubernetesWorkloadDetails: "kubernetesWorkloadDetails",
          }),
        ),
      ).annotate({ identifier: "KubernetesDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ScannedVolumeDetails: S.optional(__S(1440, __c45, 0)),
          SkippedVolumeDetails: S.optional(__S(1440, __c45, 0)),
        }).pipe(
          S.encodeKeys({
            ScannedVolumeDetails: "scannedVolumeDetails",
            SkippedVolumeDetails: "skippedVolumeDetails",
          }),
        ),
      ).annotate({ identifier: "EbsVolumeDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          DefinitionArn: S.optional(S.String),
          Version: S.optional(S.String),
          TaskCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedBy: S.optional(S.String),
          Tags: S.optional(__S(2465, __c77, 1)),
          Volumes: S.optional(__S(2274, __c71, 2)),
          Containers: S.optional(__S(2271, __c70, 31)),
          Group: S.optional(S.String),
          LaunchType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            DefinitionArn: "definitionArn",
            Version: "version",
            TaskCreatedAt: "createdAt",
            StartedAt: "startedAt",
            StartedBy: "startedBy",
            Tags: "tags",
            Volumes: "volumes",
            Containers: "containers",
            Group: "group",
            LaunchType: "launchType",
          }),
        ),
      ).annotate({ identifier: "EcsTaskDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Status: S.optional(S.String),
          ActiveServicesCount: S.optional(S.Number),
          RegisteredContainerInstancesCount: S.optional(S.Number),
          RunningTasksCount: S.optional(S.Number),
          Tags: S.optional(__S(2465, __c77, 1)),
          TaskDetails: S.optional(__S(2278, __c71, 6)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Arn: "arn",
            Status: "status",
            ActiveServicesCount: "activeServicesCount",
            RegisteredContainerInstancesCount: "registeredContainerInstancesCount",
            RunningTasksCount: "runningTasksCount",
            Tags: "tags",
            TaskDetails: "taskDetails",
          }),
        ),
      ).annotate({ identifier: "EcsClusterDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(3488, __c109, 0)),
          VpcId: S.optional(S.String),
          SecurityGroups: S.optional(__S(2258, __c70, 18)),
        }).pipe(
          S.encodeKeys({
            SubnetIds: "subnetIds",
            VpcId: "vpcId",
            SecurityGroups: "securityGroups",
          }),
        ),
      ).annotate({ identifier: "VpcConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          FunctionArn: S.optional(S.String),
          FunctionName: S.optional(S.String),
          Description: S.optional(S.String),
          LastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RevisionId: S.optional(S.String),
          FunctionVersion: S.optional(S.String),
          Role: S.optional(S.String),
          VpcConfig: S.optional(__S(2280, __c71, 8)),
          Tags: S.optional(__S(2465, __c77, 1)),
        }).pipe(
          S.encodeKeys({
            FunctionArn: "functionArn",
            FunctionName: "functionName",
            Description: "description",
            LastModifiedAt: "lastModifiedAt",
            RevisionId: "revisionId",
            FunctionVersion: "functionVersion",
            Role: "role",
            VpcConfig: "vpcConfig",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "LambdaDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          DbInstanceIdentifier: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DbClusterIdentifier: S.optional(S.String),
          DbInstanceArn: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
          Tags: S.optional(__S(2465, __c77, 1)),
        }).pipe(
          S.encodeKeys({
            DbInstanceIdentifier: "dbInstanceIdentifier",
            Engine: "engine",
            EngineVersion: "engineVersion",
            DbClusterIdentifier: "dbClusterIdentifier",
            DbInstanceArn: "dbInstanceArn",
            DbiResourceId: "dbiResourceId",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "RdsDbInstanceDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          DbShardGroupIdentifier: S.optional(S.String),
          DbShardGroupResourceId: S.optional(S.String),
          DbShardGroupArn: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DbClusterIdentifier: S.optional(S.String),
          Tags: S.optional(__S(2465, __c77, 1)),
        }).pipe(
          S.encodeKeys({
            DbShardGroupIdentifier: "dbShardGroupIdentifier",
            DbShardGroupResourceId: "dbShardGroupResourceId",
            DbShardGroupArn: "dbShardGroupArn",
            Engine: "engine",
            EngineVersion: "engineVersion",
            DbClusterIdentifier: "dbClusterIdentifier",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "RdsLimitlessDbDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          User: S.optional(S.String),
          Application: S.optional(S.String),
          Database: S.optional(S.String),
          Ssl: S.optional(S.String),
          AuthMethod: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            User: "user",
            Application: "application",
            Database: "database",
            Ssl: "ssl",
            AuthMethod: "authMethod",
          }),
        ),
      ).annotate({ identifier: "RdsDbUserDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({ SnapshotArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ SnapshotArn: "snapshotArn" }),
        ),
      ).annotate({ identifier: "EbsSnapshotDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({ ImageArn: S.optional(S.String) }).pipe(S.encodeKeys({ ImageArn: "imageArn" })),
      ).annotate({ identifier: "Ec2ImageDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointArn: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          ContinuousScanDetails: S.optional(__S(2432, __c76, 0)),
        }).pipe(
          S.encodeKeys({
            RecoveryPointArn: "recoveryPointArn",
            BackupVaultName: "backupVaultName",
            ContinuousScanDetails: "continuousScanDetails",
          }),
        ),
      ).annotate({ identifier: "RecoveryPointDetails" });
    case 16:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Version: S.optional(S.String) }).pipe(
          S.encodeKeys({ Arn: "arn", Version: "version" }),
        ),
      ).annotate({ identifier: "BedrockGuardrail" });
    case 17:
      return S.Array(__S(2288, __c71, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Confidence: S.optional(S.String),
          Action: S.optional(S.String),
        }).pipe(S.encodeKeys({ Type: "type", Confidence: "confidence", Action: "action" })),
      ).annotate({ identifier: "ContentPolicyFilter" });
    case 19:
      return S.Array(__S(2290, __c71, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          GuardrailArn: S.optional(S.String),
          GuardrailVersion: S.optional(S.String),
          Guardrails: S.optional(__S(2289, __c71, 17)),
          GuardrailAction: S.optional(S.String),
          GuardrailSource: S.optional(S.String),
          ContentPolicyFilters: S.optional(__S(2291, __c71, 19)),
        }).pipe(
          S.encodeKeys({
            GuardrailArn: "guardrailArn",
            GuardrailVersion: "guardrailVersion",
            Guardrails: "guardrails",
            GuardrailAction: "guardrailAction",
            GuardrailSource: "guardrailSource",
            ContentPolicyFilters: "contentPolicyFilters",
          }),
        ),
      ).annotate({ identifier: "BedrockGuardrailDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({ ModelId: S.optional(S.String) }).pipe(S.encodeKeys({ ModelId: "modelId" })),
      ).annotate({ identifier: "ModelDetail" });
    case 22:
      return S.Array(__S(2293, __c71, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AccessKeyDetails: S.optional(__S(2241, __c70, 1)),
          S3BucketDetails: S.optional(__S(2253, __c70, 13)),
          InstanceDetails: S.optional(__S(2263, __c70, 23)),
          EksClusterDetails: S.optional(__S(2264, __c70, 24)),
          KubernetesDetails: S.optional(__S(2276, __c71, 4)),
          ResourceType: S.optional(S.String),
          EbsVolumeDetails: S.optional(__S(2277, __c71, 5)),
          EcsClusterDetails: S.optional(__S(2279, __c71, 7)),
          ContainerDetails: S.optional(__S(2270, __c70, 30)),
          LambdaDetails: S.optional(__S(2281, __c71, 9)),
          RdsDbInstanceDetails: S.optional(__S(2282, __c71, 10)),
          RdsLimitlessDbDetails: S.optional(__S(2283, __c71, 11)),
          RdsDbUserDetails: S.optional(__S(2284, __c71, 12)),
          EbsSnapshotDetails: S.optional(__S(2285, __c71, 13)),
          Ec2ImageDetails: S.optional(__S(2286, __c71, 14)),
          RecoveryPointDetails: S.optional(__S(2287, __c71, 15)),
          BedrockGuardrailDetails: S.optional(__S(2292, __c71, 20)),
          ModelDetails: S.optional(__S(2294, __c71, 22)),
        }).pipe(
          S.encodeKeys({
            AccessKeyDetails: "accessKeyDetails",
            S3BucketDetails: "s3BucketDetails",
            InstanceDetails: "instanceDetails",
            EksClusterDetails: "eksClusterDetails",
            KubernetesDetails: "kubernetesDetails",
            ResourceType: "resourceType",
            EbsVolumeDetails: "ebsVolumeDetails",
            EcsClusterDetails: "ecsClusterDetails",
            ContainerDetails: "containerDetails",
            LambdaDetails: "lambdaDetails",
            RdsDbInstanceDetails: "rdsDbInstanceDetails",
            RdsLimitlessDbDetails: "rdsLimitlessDbDetails",
            RdsDbUserDetails: "rdsDbUserDetails",
            EbsSnapshotDetails: "ebsSnapshotDetails",
            Ec2ImageDetails: "ec2ImageDetails",
            RecoveryPointDetails: "recoveryPointDetails",
            BedrockGuardrailDetails: "bedrockGuardrailDetails",
            ModelDetails: "modelDetails",
          }),
        ),
      ).annotate({ identifier: "Resource" });
    case 24:
      return S.suspend(() =>
        S.Struct({ Domain: S.optional(S.String) }).pipe(S.encodeKeys({ Domain: "domain" })),
      ).annotate({ identifier: "DomainDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({ CityName: S.optional(S.String) }).pipe(S.encodeKeys({ CityName: "cityName" })),
      ).annotate({ identifier: "City" });
    case 26:
      return S.suspend(() =>
        S.Struct({ CountryCode: S.optional(S.String), CountryName: S.optional(S.String) }).pipe(
          S.encodeKeys({ CountryCode: "countryCode", CountryName: "countryName" }),
        ),
      ).annotate({ identifier: "Country" });
    case 27:
      return S.suspend(() =>
        S.Struct({ Lat: S.optional(S.Number), Lon: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Lat: "lat", Lon: "lon" }),
        ),
      ).annotate({ identifier: "GeoLocation" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Asn: S.optional(S.String),
          AsnOrg: S.optional(S.String),
          Isp: S.optional(S.String),
          Org: S.optional(S.String),
        }).pipe(S.encodeKeys({ Asn: "asn", AsnOrg: "asnOrg", Isp: "isp", Org: "org" })),
      ).annotate({ identifier: "Organization" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          City: S.optional(__S(2297, __c71, 25)),
          Country: S.optional(__S(2298, __c71, 26)),
          GeoLocation: S.optional(__S(2299, __c71, 27)),
          IpAddressV4: S.optional(SensitiveString),
          IpAddressV6: S.optional(SensitiveString),
          Organization: S.optional(__S(2300, __c71, 28)),
        }).pipe(
          S.encodeKeys({
            City: "city",
            Country: "country",
            GeoLocation: "geoLocation",
            IpAddressV4: "ipAddressV4",
            IpAddressV6: "ipAddressV6",
            Organization: "organization",
          }),
        ),
      ).annotate({ identifier: "RemoteIpDetails" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          Affiliated: S.optional(S.Boolean),
          AwsServiceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            Affiliated: "affiliated",
            AwsServiceName: "awsServiceName",
          }),
        ),
      ).annotate({ identifier: "RemoteAccountDetails" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          Api: S.optional(S.String),
          CallerType: S.optional(S.String),
          DomainDetails: S.optional(__S(2296, __c71, 24)),
          ErrorCode: S.optional(S.String),
          UserAgent: S.optional(S.String),
          RemoteIpDetails: S.optional(__S(2301, __c71, 29)),
          ServiceName: S.optional(S.String),
          RemoteAccountDetails: S.optional(__S(2302, __c71, 30)),
          AffectedResources: S.optional(__S(3936, __c123, 0)),
        }).pipe(
          S.encodeKeys({
            Api: "api",
            CallerType: "callerType",
            DomainDetails: "domainDetails",
            ErrorCode: "errorCode",
            UserAgent: "userAgent",
            RemoteIpDetails: "remoteIpDetails",
            ServiceName: "serviceName",
            RemoteAccountDetails: "remoteAccountDetails",
            AffectedResources: "affectedResources",
          }),
        ),
      ).annotate({ identifier: "AwsApiCallAction" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          Protocol: S.optional(S.String),
          Blocked: S.optional(S.Boolean),
          DomainWithSuffix: S.optional(S.String),
          VpcOwnerAccountId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Domain: "domain",
            Protocol: "protocol",
            Blocked: "blocked",
            DomainWithSuffix: "domainWithSuffix",
            VpcOwnerAccountId: "vpcOwnerAccountId",
          }),
        ),
      ).annotate({ identifier: "DnsRequestAction" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Port: S.optional(S.Number), PortName: S.optional(S.String) }).pipe(
          S.encodeKeys({ Port: "port", PortName: "portName" }),
        ),
      ).annotate({ identifier: "LocalPortDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IpAddressV4: S.optional(SensitiveString),
          IpAddressV6: S.optional(SensitiveString),
        }).pipe(S.encodeKeys({ IpAddressV4: "ipAddressV4", IpAddressV6: "ipAddressV6" })),
      ).annotate({ identifier: "LocalIpDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Blocked: S.optional(S.Boolean),
          ConnectionDirection: S.optional(S.String),
          LocalPortDetails: S.optional(__S(2305, __c72, 1)),
          Protocol: S.optional(S.String),
          LocalIpDetails: S.optional(__S(2306, __c72, 2)),
          LocalNetworkInterface: S.optional(S.String),
          RemoteIpDetails: S.optional(__S(2301, __c71, 29)),
          RemotePortDetails: S.optional(__S(2305, __c72, 1)),
        }).pipe(
          S.encodeKeys({
            Blocked: "blocked",
            ConnectionDirection: "connectionDirection",
            LocalPortDetails: "localPortDetails",
            Protocol: "protocol",
            LocalIpDetails: "localIpDetails",
            LocalNetworkInterface: "localNetworkInterface",
            RemoteIpDetails: "remoteIpDetails",
            RemotePortDetails: "remotePortDetails",
          }),
        ),
      ).annotate({ identifier: "NetworkConnectionAction" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          LocalPortDetails: S.optional(__S(2305, __c72, 1)),
          LocalIpDetails: S.optional(__S(2306, __c72, 2)),
          RemoteIpDetails: S.optional(__S(2301, __c71, 29)),
        }).pipe(
          S.encodeKeys({
            LocalPortDetails: "localPortDetails",
            LocalIpDetails: "localIpDetails",
            RemoteIpDetails: "remoteIpDetails",
          }),
        ),
      ).annotate({ identifier: "PortProbeDetail" });
    case 5:
      return S.Array(__S(2308, __c72, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Blocked: S.optional(S.Boolean),
          PortProbeDetails: S.optional(__S(2309, __c72, 5)),
        }).pipe(S.encodeKeys({ Blocked: "blocked", PortProbeDetails: "portProbeDetails" })),
      ).annotate({ identifier: "PortProbeAction" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          RequestUri: S.optional(S.String),
          Verb: S.optional(S.String),
          Resource: S.optional(S.String),
          Subresource: S.optional(S.String),
          Namespace: S.optional(S.String),
          ResourceName: S.optional(S.String),
          SourceIps: S.optional(__S(3488, __c109, 0)),
          UserAgent: S.optional(S.String),
          RemoteIpDetails: S.optional(__S(2301, __c71, 29)),
          StatusCode: S.optional(S.Number),
          Parameters: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            RequestUri: "requestUri",
            Verb: "verb",
            Resource: "resource",
            Subresource: "subresource",
            Namespace: "namespace",
            ResourceName: "resourceName",
            SourceIps: "sourceIPs",
            UserAgent: "userAgent",
            RemoteIpDetails: "remoteIpDetails",
            StatusCode: "statusCode",
            Parameters: "parameters",
          }),
        ),
      ).annotate({ identifier: "KubernetesApiCallAction" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Verb: S.optional(S.String),
          Resource: S.optional(S.String),
          Namespace: S.optional(S.String),
          Allowed: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            Verb: "verb",
            Resource: "resource",
            Namespace: "namespace",
            Allowed: "allowed",
          }),
        ),
      ).annotate({ identifier: "KubernetesPermissionCheckedDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Kind: S.optional(S.String),
          Name: S.optional(S.String),
          Uid: S.optional(S.String),
          RoleRefName: S.optional(S.String),
          RoleRefKind: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Kind: "kind",
            Name: "name",
            Uid: "uid",
            RoleRefName: "roleRefName",
            RoleRefKind: "roleRefKind",
          }),
        ),
      ).annotate({ identifier: "KubernetesRoleBindingDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Kind: S.optional(S.String),
          Name: S.optional(S.String),
          Uid: S.optional(S.String),
        }).pipe(S.encodeKeys({ Kind: "kind", Name: "name", Uid: "uid" })),
      ).annotate({ identifier: "KubernetesRoleDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          User: S.optional(S.String),
          Application: S.optional(S.String),
          FailedLoginAttempts: S.optional(S.Number),
          SuccessfulLoginAttempts: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            User: "user",
            Application: "application",
            FailedLoginAttempts: "failedLoginAttempts",
            SuccessfulLoginAttempts: "successfulLoginAttempts",
          }),
        ),
      ).annotate({ identifier: "LoginAttribute" });
    case 12:
      return S.Array(__S(2315, __c72, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          RemoteIpDetails: S.optional(__S(2301, __c71, 29)),
          LoginAttributes: S.optional(__S(2316, __c72, 12)),
        }).pipe(S.encodeKeys({ RemoteIpDetails: "remoteIpDetails" })),
      ).annotate({ identifier: "RdsLoginAttemptAction" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          ActionType: S.optional(S.String),
          AwsApiCallAction: S.optional(__S(2303, __c71, 31)),
          DnsRequestAction: S.optional(__S(2304, __c72, 0)),
          NetworkConnectionAction: S.optional(__S(2307, __c72, 3)),
          PortProbeAction: S.optional(__S(2310, __c72, 6)),
          KubernetesApiCallAction: S.optional(__S(2311, __c72, 7)),
          KubernetesPermissionCheckedDetails: S.optional(__S(2312, __c72, 8)),
          KubernetesRoleBindingDetails: S.optional(__S(2313, __c72, 9)),
          KubernetesRoleDetails: S.optional(__S(2314, __c72, 10)),
          RdsLoginAttemptAction: S.optional(__S(2317, __c72, 13)),
        }).pipe(
          S.encodeKeys({
            ActionType: "actionType",
            AwsApiCallAction: "awsApiCallAction",
            DnsRequestAction: "dnsRequestAction",
            NetworkConnectionAction: "networkConnectionAction",
            PortProbeAction: "portProbeAction",
            KubernetesApiCallAction: "kubernetesApiCallAction",
            KubernetesPermissionCheckedDetails: "kubernetesPermissionCheckedDetails",
            KubernetesRoleBindingDetails: "kubernetesRoleBindingDetails",
            KubernetesRoleDetails: "kubernetesRoleDetails",
            RdsLoginAttemptAction: "rdsLoginAttemptAction",
          }),
        ),
      ).annotate({ identifier: "Action" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ThreatListName: S.optional(S.String),
          ThreatNames: S.optional(__S(3488, __c109, 0)),
          ThreatFileSha256: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ThreatListName: "threatListName",
            ThreatNames: "threatNames",
            ThreatFileSha256: "threatFileSha256",
          }),
        ),
      ).annotate({ identifier: "ThreatIntelligenceDetail" });
    case 16:
      return S.Array(__S(2319, __c72, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ ThreatIntelligenceDetails: S.optional(__S(2320, __c72, 16)) }).pipe(
          S.encodeKeys({ ThreatIntelligenceDetails: "threatIntelligenceDetails" }),
        ),
      ).annotate({ identifier: "Evidence" });
    case 18:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), Type: S.optional(S.String) }).pipe(
          S.encodeKeys({ Value: "value", Type: "type" }),
        ),
      ).annotate({ identifier: "ServiceAdditionalInfo" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          TotalGb: S.optional(S.Number),
          Files: S.optional(S.Number),
          Volumes: S.optional(S.Number),
        }).pipe(S.encodeKeys({ TotalGb: "totalGb", Files: "files", Volumes: "volumes" })),
      ).annotate({ identifier: "ScannedItemCount" });
    case 20:
      return S.suspend(() =>
        S.Struct({ Files: S.optional(S.Number) }).pipe(S.encodeKeys({ Files: "files" })),
      ).annotate({ identifier: "ThreatsDetectedItemCount" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Severity: S.optional(S.String),
          ThreatName: S.optional(S.String),
          Count: S.optional(S.Number),
        }).pipe(S.encodeKeys({ Severity: "severity", ThreatName: "threatName", Count: "count" })),
      ).annotate({ identifier: "HighestSeverityThreatDetails" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          FilePath: S.optional(S.String),
          VolumeArn: S.optional(S.String),
          Hash: S.optional(S.String),
          FileName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FilePath: "filePath",
            VolumeArn: "volumeArn",
            Hash: "hash",
            FileName: "fileName",
          }),
        ),
      ).annotate({ identifier: "ScanFilePath" });
    case 23:
      return S.Array(__S(2326, __c72, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Severity: S.optional(S.String),
          ItemCount: S.optional(S.Number),
          FilePaths: S.optional(__S(2327, __c72, 23)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Severity: "severity",
            ItemCount: "itemCount",
            FilePaths: "filePaths",
          }),
        ),
      ).annotate({ identifier: "ScanThreatName" });
    case 25:
      return S.Array(__S(2328, __c72, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          ItemCount: S.optional(S.Number),
          UniqueThreatNameCount: S.optional(S.Number),
          Shortened: S.optional(S.Boolean),
          ThreatNames: S.optional(__S(2329, __c72, 25)),
        }).pipe(
          S.encodeKeys({
            ItemCount: "itemCount",
            UniqueThreatNameCount: "uniqueThreatNameCount",
            Shortened: "shortened",
            ThreatNames: "threatNames",
          }),
        ),
      ).annotate({ identifier: "ThreatDetectedByName" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          ScannedItemCount: S.optional(__S(2323, __c72, 19)),
          ThreatsDetectedItemCount: S.optional(__S(2324, __c72, 20)),
          HighestSeverityThreatDetails: S.optional(__S(2325, __c72, 21)),
          ThreatDetectedByName: S.optional(__S(2330, __c72, 26)),
        }).pipe(
          S.encodeKeys({
            ScannedItemCount: "scannedItemCount",
            ThreatsDetectedItemCount: "threatsDetectedItemCount",
            HighestSeverityThreatDetails: "highestSeverityThreatDetails",
            ThreatDetectedByName: "threatDetectedByName",
          }),
        ),
      ).annotate({ identifier: "ScanDetections" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          ScanId: S.optional(S.String),
          ScanStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanCompletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TriggerFindingId: S.optional(S.String),
          Sources: S.optional(__S(3488, __c109, 0)),
          ScanDetections: S.optional(__S(2331, __c72, 27)),
          ScanType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ScanId: "scanId",
            ScanStartedAt: "scanStartedAt",
            ScanCompletedAt: "scanCompletedAt",
            TriggerFindingId: "triggerFindingId",
            Sources: "sources",
            ScanDetections: "scanDetections",
            ScanType: "scanType",
          }),
        ),
      ).annotate({ identifier: "EbsVolumeScanDetails" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NamespacePid: S.optional(S.Number),
          UserId: S.optional(S.Number),
          Name: S.optional(S.String),
          Pid: S.optional(S.Number),
          Uuid: S.optional(S.String),
          ExecutablePath: S.optional(S.String),
          Euid: S.optional(S.Number),
          ParentUuid: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            StartTime: "startTime",
            NamespacePid: "namespacePid",
            UserId: "userId",
            Name: "name",
            Pid: "pid",
            Uuid: "uuid",
            ExecutablePath: "executablePath",
            Euid: "euid",
            ParentUuid: "parentUuid",
          }),
        ),
      ).annotate({ identifier: "LineageObject" });
    case 30:
      return S.Array(__S(2333, __c72, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ExecutablePath: S.optional(S.String),
          ExecutableSha256: S.optional(S.String),
          NamespacePid: S.optional(S.Number),
          Pwd: S.optional(S.String),
          Pid: S.optional(S.Number),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Uuid: S.optional(S.String),
          ParentUuid: S.optional(S.String),
          User: S.optional(S.String),
          UserId: S.optional(S.Number),
          Euid: S.optional(S.Number),
          Lineage: S.optional(__S(2334, __c72, 30)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            ExecutablePath: "executablePath",
            ExecutableSha256: "executableSha256",
            NamespacePid: "namespacePid",
            Pwd: "pwd",
            Pid: "pid",
            StartTime: "startTime",
            Uuid: "uuid",
            ParentUuid: "parentUuid",
            User: "user",
            UserId: "userId",
            Euid: "euid",
            Lineage: "lineage",
          }),
        ),
      ).annotate({ identifier: "ProcessDetails" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModifyingProcess: S.optional(__S(2335, __c72, 31)),
          ModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScriptPath: S.optional(S.String),
          LibraryPath: S.optional(S.String),
          LdPreloadValue: S.optional(S.String),
          SocketPath: S.optional(S.String),
          RuncBinaryPath: S.optional(S.String),
          ReleaseAgentPath: S.optional(S.String),
          MountSource: S.optional(S.String),
          MountTarget: S.optional(S.String),
          FileSystemType: S.optional(S.String),
          Flags: S.optional(__S(3488, __c109, 0)),
          ModuleName: S.optional(S.String),
          ModuleFilePath: S.optional(S.String),
          ModuleSha256: S.optional(S.String),
          ShellHistoryFilePath: S.optional(S.String),
          TargetProcess: S.optional(__S(2335, __c72, 31)),
          AddressFamily: S.optional(S.String),
          IanaProtocolNumber: S.optional(S.Number),
          MemoryRegions: S.optional(__S(3488, __c109, 0)),
          ToolName: S.optional(S.String),
          ToolCategory: S.optional(S.String),
          ServiceName: S.optional(S.String),
          CommandLineExample: S.optional(S.String),
          ThreatFilePath: S.optional(S.String),
          FileOperation: S.optional(S.String),
          FilePath: S.optional(S.String),
          RelatedFilePaths: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            ModifyingProcess: "modifyingProcess",
            ModifiedAt: "modifiedAt",
            ScriptPath: "scriptPath",
            LibraryPath: "libraryPath",
            LdPreloadValue: "ldPreloadValue",
            SocketPath: "socketPath",
            RuncBinaryPath: "runcBinaryPath",
            ReleaseAgentPath: "releaseAgentPath",
            MountSource: "mountSource",
            MountTarget: "mountTarget",
            FileSystemType: "fileSystemType",
            Flags: "flags",
            ModuleName: "moduleName",
            ModuleFilePath: "moduleFilePath",
            ModuleSha256: "moduleSha256",
            ShellHistoryFilePath: "shellHistoryFilePath",
            TargetProcess: "targetProcess",
            AddressFamily: "addressFamily",
            IanaProtocolNumber: "ianaProtocolNumber",
            MemoryRegions: "memoryRegions",
            ToolName: "toolName",
            ToolCategory: "toolCategory",
            ServiceName: "serviceName",
            CommandLineExample: "commandLineExample",
            ThreatFilePath: "threatFilePath",
            FileOperation: "fileOperation",
            FilePath: "filePath",
            RelatedFilePaths: "relatedFilePaths",
          }),
        ),
      ).annotate({ identifier: "RuntimeContext" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Process: S.optional(__S(2335, __c72, 31)),
          Context: S.optional(__S(2336, __c73, 0)),
        }).pipe(S.encodeKeys({ Process: "process", Context: "context" })),
      ).annotate({ identifier: "RuntimeDetails" });
    case 2:
      return S.Array(S.Number);
    case 3:
      return S.suspend(() =>
        S.Struct({
          Text: S.optional(__S(3488, __c109, 0)),
          Number: S.optional(__S(2338, __c73, 2)),
        }).pipe(S.encodeKeys({ Text: "text", Number: "number" })),
      ).annotate({ identifier: "Observations" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProfileType: S.optional(S.String),
          ProfileSubtype: S.optional(S.String),
          Observations: S.optional(__S(2339, __c73, 3)),
        }).pipe(
          S.encodeKeys({
            ProfileType: "profileType",
            ProfileSubtype: "profileSubtype",
            Observations: "observations",
          }),
        ),
      ).annotate({ identifier: "AnomalyObject" });
    case 5:
      return S.Array(__S(2340, __c73, 4));
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(2341, __c73, 5).pipe(S.optional));
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(2342, __c73, 6).pipe(S.optional));
    case 8:
      return S.Record(S.String, /*@__PURE__*/ __S(2340, __c73, 4).pipe(S.optional));
    case 9:
      return S.Record(S.String, /*@__PURE__*/ __S(2344, __c73, 8).pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({ Behavior: S.optional(__S(2345, __c73, 9)) }).pipe(
          S.encodeKeys({ Behavior: "behavior" }),
        ),
      ).annotate({ identifier: "AnomalyUnusual" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Profiles: S.optional(__S(2343, __c73, 7)),
          Unusual: S.optional(__S(2346, __c73, 10)),
        }).pipe(S.encodeKeys({ Profiles: "profiles", Unusual: "unusual" })),
      ).annotate({ identifier: "Anomaly" });
    case 12:
      return S.suspend(() =>
        S.Struct({ Uid: S.optional(S.String), Name: S.optional(S.String) }).pipe(
          S.encodeKeys({ Uid: "uid", Name: "account" }),
        ),
      ).annotate({ identifier: "Account" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Uid: S.optional(S.String),
          Type: S.optional(S.String),
          CredentialUid: S.optional(S.String),
          Account: S.optional(__S(2348, __c73, 12)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Uid: "uid",
            Type: "type",
            CredentialUid: "credentialUid",
            Account: "account",
          }),
        ),
      ).annotate({ identifier: "User" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.String),
          MfaStatus: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Issuer: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Uid: "uid",
            MfaStatus: "mfaStatus",
            CreatedTime: "createdTime",
            Issuer: "issuer",
          }),
        ),
      ).annotate({ identifier: "Session" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Path: S.optional(S.String),
          Sha256: S.optional(S.String),
        }).pipe(S.encodeKeys({ Name: "name", Path: "path", Sha256: "sha256" })),
      ).annotate({ identifier: "ActorProcess" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          User: S.optional(__S(2349, __c73, 13)),
          Session: S.optional(__S(2350, __c73, 14)),
          Process: S.optional(__S(2351, __c73, 15)),
        }).pipe(S.encodeKeys({ Id: "id", User: "user", Session: "session", Process: "process" })),
      ).annotate({ identifier: "Actor" });
    case 17:
      return S.Array(__S(2352, __c73, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          PublicAclAccess: S.optional(S.String),
          PublicPolicyAccess: S.optional(S.String),
          PublicAclIgnoreBehavior: S.optional(S.String),
          PublicBucketRestrictBehavior: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            PublicAclAccess: "publicAclAccess",
            PublicPolicyAccess: "publicPolicyAccess",
            PublicAclIgnoreBehavior: "publicAclIgnoreBehavior",
            PublicBucketRestrictBehavior: "publicBucketRestrictBehavior",
          }),
        ),
      ).annotate({ identifier: "PublicAccessConfiguration" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          OwnerId: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EncryptionType: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          EffectivePermission: S.optional(S.String),
          PublicReadAccess: S.optional(S.String),
          PublicWriteAccess: S.optional(S.String),
          AccountPublicAccess: S.optional(__S(2354, __c73, 18)),
          BucketPublicAccess: S.optional(__S(2354, __c73, 18)),
          S3ObjectUids: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            OwnerId: "ownerId",
            CreatedAt: "createdAt",
            EncryptionType: "encryptionType",
            EncryptionKeyArn: "encryptionKeyArn",
            EffectivePermission: "effectivePermission",
            PublicReadAccess: "publicReadAccess",
            PublicWriteAccess: "publicWriteAccess",
            AccountPublicAccess: "accountPublicAccess",
            BucketPublicAccess: "bucketPublicAccess",
            S3ObjectUids: "s3ObjectUids",
          }),
        ),
      ).annotate({ identifier: "S3Bucket" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          ImageDescription: S.optional(S.String),
          InstanceState: S.optional(S.String),
          IamInstanceProfile: S.optional(__S(2254, __c70, 14)),
          InstanceType: S.optional(S.String),
          OutpostArn: S.optional(S.String),
          Platform: S.optional(S.String),
          ProductCodes: S.optional(__S(2262, __c70, 22)),
          Ec2NetworkInterfaceUids: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            AvailabilityZone: "availabilityZone",
            ImageDescription: "imageDescription",
            InstanceState: "instanceState",
            InstanceType: "instanceType",
            OutpostArn: "outpostArn",
            Platform: "platform",
            ProductCodes: "productCodes",
            Ec2NetworkInterfaceUids: "ec2NetworkInterfaceUids",
          }),
        ),
      ).annotate({ identifier: "Ec2Instance" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          PrincipalId: S.optional(S.String),
          UserName: S.optional(S.String),
          UserType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ PrincipalId: "principalId", UserName: "userName", UserType: "userType" }),
        ),
      ).annotate({ identifier: "AccessKey" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Ipv6Addresses: S.optional(__S(3488, __c109, 0)),
          PrivateIpAddresses: S.optional(__S(2256, __c70, 16)),
          PublicIp: S.optional(S.String),
          SecurityGroups: S.optional(__S(2258, __c70, 18)),
          SubNetId: S.optional(S.String),
          VpcId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Ipv6Addresses: "ipv6Addresses",
            PrivateIpAddresses: "privateIpAddresses",
            PublicIp: "publicIp",
            SecurityGroups: "securityGroups",
            SubNetId: "subNetId",
            VpcId: "vpcId",
          }),
        ),
      ).annotate({ identifier: "Ec2NetworkInterface" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          ETag: S.optional(S.String),
          Key: S.optional(S.String),
          VersionId: S.optional(S.String),
        }).pipe(S.encodeKeys({ ETag: "eTag", Key: "key", VersionId: "versionId" })),
      ).annotate({ identifier: "S3Object" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          VpcId: S.optional(S.String),
          Ec2InstanceUids: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            Status: "status",
            VpcId: "vpcId",
            Ec2InstanceUids: "ec2InstanceUids",
          }),
        ),
      ).annotate({ identifier: "EksCluster" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          ContainerUids: S.optional(__S(3488, __c109, 0)),
          Namespace: S.optional(S.String),
          KubernetesResourcesTypes: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ContainerUids: "containerUids",
            Namespace: "namespace",
            KubernetesResourcesTypes: "type",
          }),
        ),
      ).annotate({ identifier: "KubernetesWorkload" });
    case 26:
      return S.suspend(() =>
        S.Struct({ Image: S.optional(S.String), ImageUid: S.optional(S.String) }).pipe(
          S.encodeKeys({ Image: "image", ImageUid: "imageUid" }),
        ),
      ).annotate({ identifier: "ContainerFindingResource" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          Ec2InstanceUids: S.optional(__S(3488, __c109, 0)),
        }).pipe(S.encodeKeys({ Status: "status", Ec2InstanceUids: "ec2InstanceUids" })),
      ).annotate({ identifier: "EcsCluster" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TaskDefinitionArn: S.optional(S.String),
          LaunchType: S.optional(S.String),
          ContainerUids: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            CreatedAt: "createdAt",
            TaskDefinitionArn: "taskDefinitionArn",
            LaunchType: "launchType",
            ContainerUids: "containerUids",
          }),
        ),
      ).annotate({ identifier: "EcsTask" });
    case 29:
      return S.suspend(() =>
        S.Struct({ Ec2InstanceUids: S.optional(__S(3488, __c109, 0)) }).pipe(
          S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids" }),
        ),
      ).annotate({ identifier: "IamInstanceProfileV2" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Ec2InstanceUids: S.optional(__S(3488, __c109, 0)),
          Version: S.optional(S.String),
        }).pipe(S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids", Version: "version" })),
      ).annotate({ identifier: "Ec2LaunchTemplate" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          Version: S.optional(S.String),
          GuardrailAction: S.optional(S.String),
          GuardrailSource: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Version: "version",
            GuardrailAction: "guardrailAction",
            GuardrailSource: "guardrailSource",
          }),
        ),
      ).annotate({ identifier: "BedrockGuardrailResource" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3Bucket: S.optional(__S(2355, __c73, 19)),
          Ec2Instance: S.optional(__S(2356, __c73, 20)),
          AccessKey: S.optional(__S(2357, __c73, 21)),
          Ec2NetworkInterface: S.optional(__S(2358, __c73, 22)),
          S3Object: S.optional(__S(2359, __c73, 23)),
          EksCluster: S.optional(__S(2360, __c73, 24)),
          KubernetesWorkload: S.optional(__S(2361, __c73, 25)),
          Container: S.optional(__S(2362, __c73, 26)),
          EcsCluster: S.optional(__S(2363, __c73, 27)),
          EcsTask: S.optional(__S(2364, __c73, 28)),
          IamInstanceProfile: S.optional(__S(2365, __c73, 29)),
          AutoscalingAutoScalingGroup: S.optional(__S(2365, __c73, 29)),
          Ec2LaunchTemplate: S.optional(__S(2366, __c73, 30)),
          Ec2Vpc: S.optional(__S(2365, __c73, 29)),
          Ec2Image: S.optional(__S(2365, __c73, 29)),
          CloudformationStack: S.optional(__S(2365, __c73, 29)),
          BedrockGuardrail: S.optional(__S(2367, __c73, 31)),
        }).pipe(
          S.encodeKeys({
            S3Bucket: "s3Bucket",
            Ec2Instance: "ec2Instance",
            AccessKey: "accessKey",
            Ec2NetworkInterface: "ec2NetworkInterface",
            S3Object: "s3Object",
            EksCluster: "eksCluster",
            KubernetesWorkload: "kubernetesWorkload",
            Container: "container",
            EcsCluster: "ecsCluster",
            EcsTask: "ecsTask",
            IamInstanceProfile: "iamInstanceProfile",
            AutoscalingAutoScalingGroup: "autoscalingAutoScalingGroup",
            Ec2LaunchTemplate: "ec2LaunchTemplate",
            Ec2Vpc: "ec2Vpc",
            Ec2Image: "ec2Image",
            CloudformationStack: "cloudformationStack",
            BedrockGuardrail: "bedrockGuardrail",
          }),
        ),
      ).annotate({ identifier: "ResourceData" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.String),
          Name: S.optional(S.String),
          AccountId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Region: S.optional(S.String),
          Service: S.optional(S.String),
          CloudPartition: S.optional(S.String),
          Tags: S.optional(__S(2465, __c77, 1)),
          Data: S.optional(__S(2368, __c74, 0)),
        }).pipe(
          S.encodeKeys({
            Uid: "uid",
            Name: "name",
            AccountId: "accountId",
            ResourceType: "resourceType",
            Region: "region",
            Service: "service",
            CloudPartition: "cloudPartition",
            Tags: "tags",
            Data: "data",
          }),
        ),
      ).annotate({ identifier: "ResourceV2" });
    case 2:
      return S.Array(__S(2369, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          City: S.optional(S.String),
          Country: S.optional(S.String),
          Latitude: S.optional(S.Number),
          Longitude: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ City: "city", Country: "country", Latitude: "lat", Longitude: "lon" }),
        ),
      ).annotate({ identifier: "NetworkGeoLocation" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Number: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Name: "name", Number: "number" }),
        ),
      ).annotate({ identifier: "AutonomousSystem" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Direction: S.optional(S.String) }).pipe(
          S.encodeKeys({ Direction: "direction" }),
        ),
      ).annotate({ identifier: "NetworkConnection" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Ip: S.optional(S.String),
          Domain: S.optional(S.String),
          Port: S.optional(S.Number),
          Location: S.optional(__S(2371, __c74, 3)),
          AutonomousSystem: S.optional(__S(2372, __c74, 4)),
          Connection: S.optional(__S(2373, __c74, 5)),
        }).pipe(
          S.encodeKeys({
            Id: "id",
            Ip: "ip",
            Domain: "domain",
            Port: "port",
            Location: "location",
            AutonomousSystem: "autonomousSystem",
            Connection: "connection",
          }),
        ),
      ).annotate({ identifier: "NetworkEndpoint" });
    case 7:
      return S.Array(__S(2374, __c74, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Values: S.optional(__S(3488, __c109, 0)),
          Title: S.optional(S.String),
        }).pipe(S.encodeKeys({ Key: "key", Values: "values", Title: "title" })),
      ).annotate({ identifier: "Indicator" });
    case 9:
      return S.Array(__S(2376, __c74, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          Operation: S.optional(S.String),
          Service: S.optional(S.String),
          Error: S.optional(S.String),
          UserAgent: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Operation: "operation",
            Service: "service",
            Error: "error",
            UserAgent: "userAgent",
          }),
        ),
      ).annotate({ identifier: "ApiCall" });
    case 11:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Api: S.optional(__S(2378, __c74, 10)) }).pipe(
          S.encodeKeys({ Type: "type", Api: "api" }),
        ),
      ).annotate({ identifier: "Activity" });
    case 12:
      return S.Array(__S(2379, __c74, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FirstSeenAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSeenAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Severity: S.optional(S.Number),
          Count: S.optional(S.Number),
          ResourceUids: S.optional(__S(3488, __c109, 0)),
          ActorIds: S.optional(__S(3488, __c109, 0)),
          EndpointIds: S.optional(__S(3488, __c109, 0)),
          SignalIndicators: S.optional(__S(2377, __c74, 9)),
          Activities: S.optional(__S(2380, __c74, 12)),
        }).pipe(
          S.encodeKeys({
            Uid: "uid",
            Type: "type",
            Description: "description",
            Name: "name",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            FirstSeenAt: "firstSeenAt",
            LastSeenAt: "lastSeenAt",
            Severity: "severity",
            Count: "count",
            ResourceUids: "resourceUids",
            ActorIds: "actorIds",
            EndpointIds: "endpointIds",
            SignalIndicators: "signalIndicators",
            Activities: "activities",
          }),
        ),
      ).annotate({ identifier: "Signal" });
    case 14:
      return S.Array(__S(2381, __c74, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.String),
          Description: S.optional(S.String),
          Actors: S.optional(__S(2353, __c73, 17)),
          Resources: S.optional(__S(2370, __c74, 2)),
          Endpoints: S.optional(__S(2375, __c74, 7)),
          Signals: S.optional(__S(2382, __c74, 14)),
          SequenceIndicators: S.optional(__S(2377, __c74, 9)),
          AdditionalSequenceTypes: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            Uid: "uid",
            Description: "description",
            Actors: "actors",
            Resources: "resources",
            Endpoints: "endpoints",
            Signals: "signals",
            SequenceIndicators: "sequenceIndicators",
            AdditionalSequenceTypes: "additionalSequenceTypes",
          }),
        ),
      ).annotate({ identifier: "Sequence" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Anomaly: S.optional(__S(2347, __c73, 11)),
          Sequence: S.optional(__S(2383, __c74, 15)),
        }).pipe(S.encodeKeys({ Anomaly: "anomaly", Sequence: "sequence" })),
      ).annotate({ identifier: "Detection" });
    case 17:
      return S.suspend(() =>
        S.Struct({ NestedItemPath: S.optional(S.String), Hash: S.optional(S.String) }).pipe(
          S.encodeKeys({ NestedItemPath: "nestedItemPath", Hash: "hash" }),
        ),
      ).annotate({ identifier: "ItemPath" });
    case 18:
      return S.Array(__S(2385, __c74, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Source: S.optional(S.String),
          ItemPaths: S.optional(__S(2386, __c74, 18)),
          Count: S.optional(S.Number),
          Hash: S.optional(S.String),
          ItemDetails: S.optional(__S(2402, __c75, 2)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Source: "source",
            ItemPaths: "itemPaths",
            Count: "count",
            Hash: "hash",
            ItemDetails: "itemDetails",
          }),
        ),
      ).annotate({ identifier: "Threat" });
    case 20:
      return S.Array(__S(2387, __c74, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          TriggerType: S.optional(S.String),
          IncrementalScanDetails: S.optional(__S(2433, __c76, 1)),
        }).pipe(
          S.encodeKeys({
            TriggerType: "triggerType",
            IncrementalScanDetails: "incrementalScanDetails",
          }),
        ),
      ).annotate({ identifier: "MalwareProtectionFindingsScanConfiguration" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Threats: S.optional(__S(2388, __c74, 20)),
          ScanId: S.optional(S.String),
          ScanType: S.optional(S.String),
          ScanCategory: S.optional(S.String),
          ScanConfiguration: S.optional(__S(2389, __c74, 21)),
          UniqueThreatCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Threats: "threats",
            ScanId: "scanId",
            ScanType: "scanType",
            ScanCategory: "scanCategory",
            ScanConfiguration: "scanConfiguration",
            UniqueThreatCount: "uniqueThreatCount",
          }),
        ),
      ).annotate({ identifier: "MalwareScanDetails" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(__S(2318, __c72, 14)),
          Evidence: S.optional(__S(2321, __c72, 17)),
          Archived: S.optional(S.Boolean),
          Count: S.optional(S.Number),
          DetectorId: S.optional(S.String),
          EventFirstSeen: S.optional(S.String),
          EventLastSeen: S.optional(S.String),
          ResourceRole: S.optional(S.String),
          ServiceName: S.optional(S.String),
          UserFeedback: S.optional(S.String),
          AdditionalInfo: S.optional(__S(2322, __c72, 18)),
          FeatureName: S.optional(S.String),
          EbsVolumeScanDetails: S.optional(__S(2332, __c72, 28)),
          RuntimeDetails: S.optional(__S(2337, __c73, 1)),
          Detection: S.optional(__S(2384, __c74, 16)),
          MalwareScanDetails: S.optional(__S(2390, __c74, 22)),
        }).pipe(
          S.encodeKeys({
            Action: "action",
            Evidence: "evidence",
            Archived: "archived",
            Count: "count",
            DetectorId: "detectorId",
            EventFirstSeen: "eventFirstSeen",
            EventLastSeen: "eventLastSeen",
            ResourceRole: "resourceRole",
            ServiceName: "serviceName",
            UserFeedback: "userFeedback",
            AdditionalInfo: "additionalInfo",
            FeatureName: "featureName",
            EbsVolumeScanDetails: "ebsVolumeScanDetails",
            RuntimeDetails: "runtimeDetails",
            Detection: "detection",
            MalwareScanDetails: "malwareScanDetails",
          }),
        ),
      ).annotate({ identifier: "Service" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          Arn: S.optional(S.String),
          Confidence: S.optional(S.Number),
          CreatedAt: S.optional(S.String),
          Description: S.optional(S.String),
          Id: S.optional(S.String),
          Partition: S.optional(S.String),
          Region: S.optional(S.String),
          Resource: S.optional(__S(2295, __c71, 23)),
          SchemaVersion: S.optional(S.String),
          Service: S.optional(__S(2391, __c74, 23)),
          Severity: S.optional(S.Number),
          Title: S.optional(S.String),
          Type: S.optional(S.String),
          UpdatedAt: S.optional(S.String),
          AssociatedAttackSequenceArn: S.optional(S.String),
          CustomDetectionRuleName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            Arn: "arn",
            Confidence: "confidence",
            CreatedAt: "createdAt",
            Description: "description",
            Id: "id",
            Partition: "partition",
            Region: "region",
            Resource: "resource",
            SchemaVersion: "schemaVersion",
            Service: "service",
            Severity: "severity",
            Title: "title",
            Type: "type",
            UpdatedAt: "updatedAt",
            AssociatedAttackSequenceArn: "associatedAttackSequenceArn",
            CustomDetectionRuleName: "customDetectionRuleName",
          }),
        ),
      ).annotate({ identifier: "Finding" });
    case 25:
      return S.Array(__S(2392, __c74, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({ Findings: S.optional(__S(2393, __c74, 25)) }).pipe(
          S.encodeKeys({ Findings: "findings" }),
        ),
      ).annotate({ identifier: "GetFindingsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VersionId: S.optional(S.String), DeviceName: S.optional(S.String) }).pipe(
          S.encodeKeys({ VersionId: "versionId", DeviceName: "deviceName" }),
        ),
      ).annotate({ identifier: "AdditionalInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ItemPath: S.optional(S.String),
          Hash: S.optional(S.String),
          AdditionalInfo: S.optional(__S(2400, __c75, 0)),
        }).pipe(
          S.encodeKeys({
            ResourceArn: "resourceArn",
            ItemPath: "itemPath",
            Hash: "hash",
            AdditionalInfo: "additionalInfo",
          }),
        ),
      ).annotate({ identifier: "ItemDetails" });
    case 2:
      return S.Array(__S(2401, __c75, 1));
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(S.encodeKeys({ StartTime: "startTime", EndTime: "endTime" })),
      ).annotate({ identifier: "ScanConfigurationContinuousScanDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BaselineResourceArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ BaselineResourceArn: "baselineResourceArn" }),
        ),
      ).annotate({ identifier: "IncrementalScanDetails" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }).pipe(
          S.encodeKeys({ Key: "key", Value: "value" }),
        ),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(2464, __c77, 0));
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AdministratorId: S.optional(S.String),
          InvitationId: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ AdministratorId: "administratorId", InvitationId: "invitationId" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/administrator" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AcceptAdministratorInvitationRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AcceptAdministratorInvitationResponse",
      });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingStatisticTypes: S.optional(__S(1952, __c61, 0)),
          FindingCriteria: S.optional(__S(418, __c13, 2)),
          GroupBy: S.optional(S.String),
          OrderBy: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        })
          .pipe(
            S.encodeKeys({
              FindingStatisticTypes: "findingStatisticTypes",
              FindingCriteria: "findingCriteria",
              GroupBy: "groupBy",
              OrderBy: "orderBy",
              MaxResults: "maxResults",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings/statistics" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetFindingsStatisticsRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          LastGeneratedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TotalFindings: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            LastGeneratedAt: "lastGeneratedAt",
            TotalFindings: "totalFindings",
          }),
        ),
      ).annotate({ identifier: "AccountStatistics" });
    case 3:
      return S.Array(__S(2562, __c80, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastGeneratedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Severity: S.optional(S.Number),
          TotalFindings: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Date: "date",
            LastGeneratedAt: "lastGeneratedAt",
            Severity: "severity",
            TotalFindings: "totalFindings",
          }),
        ),
      ).annotate({ identifier: "DateStatistics" });
    case 5:
      return S.Array(__S(2564, __c80, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          FindingType: S.optional(S.String),
          LastGeneratedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TotalFindings: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            FindingType: "findingType",
            LastGeneratedAt: "lastGeneratedAt",
            TotalFindings: "totalFindings",
          }),
        ),
      ).annotate({ identifier: "FindingTypeStatistics" });
    case 7:
      return S.Array(__S(2566, __c80, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          LastGeneratedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          TotalFindings: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            LastGeneratedAt: "lastGeneratedAt",
            ResourceId: "resourceId",
            ResourceType: "resourceType",
            TotalFindings: "totalFindings",
          }),
        ),
      ).annotate({ identifier: "ResourceStatistics" });
    case 9:
      return S.Array(__S(2568, __c80, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          LastGeneratedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Severity: S.optional(S.Number),
          TotalFindings: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            LastGeneratedAt: "lastGeneratedAt",
            Severity: "severity",
            TotalFindings: "totalFindings",
          }),
        ),
      ).annotate({ identifier: "SeverityStatistics" });
    case 11:
      return S.Array(__S(2570, __c80, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          CountBySeverity: S.optional(__S(2561, __c80, 1)),
          GroupedByAccount: S.optional(__S(2563, __c80, 3)),
          GroupedByDate: S.optional(__S(2565, __c80, 5)),
          GroupedByFindingType: S.optional(__S(2567, __c80, 7)),
          GroupedByResource: S.optional(__S(2569, __c80, 9)),
          GroupedBySeverity: S.optional(__S(2571, __c80, 11)),
        }).pipe(
          S.encodeKeys({
            CountBySeverity: "countBySeverity",
            GroupedByAccount: "groupedByAccount",
            GroupedByDate: "groupedByDate",
            GroupedByFindingType: "groupedByFindingType",
            GroupedByResource: "groupedByResource",
            GroupedBySeverity: "groupedBySeverity",
          }),
        ),
      ).annotate({ identifier: "FindingStatistics" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          FindingStatistics: S.optional(__S(2572, __c80, 12)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ FindingStatistics: "findingStatistics", NextToken: "nextToken" })),
      ).annotate({ identifier: "GetFindingsStatisticsResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          InvestigationId: S.String.pipe(T.HttpLabel("InvestigationId")),
          SummaryFormat: S.optional(S.String).pipe(T.HttpQuery("summaryFormat")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/detector/{DetectorId}/investigation/{InvestigationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInvestigationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Feature: S.optional(S.String) }).pipe(
          S.encodeKeys({ Name: "name", Feature: "feature" }),
        ),
      ).annotate({ identifier: "Product" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Version: S.optional(S.String), Product: S.optional(__S(2593, __c81, 1)) }).pipe(
          S.encodeKeys({ Version: "version", Product: "product" }),
        ),
      ).annotate({ identifier: "InvestigationMetadata" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Provider: S.optional(S.String),
          Region: S.optional(S.String),
          Account: S.optional(S.String),
        }).pipe(S.encodeKeys({ Provider: "provider", Region: "region", Account: "account" })),
      ).annotate({ identifier: "CloudDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Tactic: S.optional(__S(2624, __c82, 0)),
          Technique: S.optional(__S(2624, __c82, 0)),
          Findings: S.optional(__S(2626, __c82, 2)),
          Version: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Tactic: "tactic",
            Technique: "technique",
            Findings: "findings",
            Version: "version",
          }),
        ),
      ).annotate({ identifier: "Attack" });
    case 5:
      return S.Array(__S(2596, __c81, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Phase: S.optional(S.String),
          Description: S.optional(S.String),
          Attacks: S.optional(__S(2597, __c81, 5)),
        }).pipe(S.encodeKeys({ Phase: "phase", Description: "description", Attacks: "attacks" })),
      ).annotate({ identifier: "AttackPhase" });
    case 7:
      return S.Array(__S(2598, __c81, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          AttackProgression: S.optional(__S(2599, __c81, 7)),
          ThreatActorProfile: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AttackProgression: "attackProgression",
            ThreatActorProfile: "threatActorProfile",
          }),
        ),
      ).annotate({ identifier: "ThreatAssessment" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          Type: S.optional(S.String),
          Arn: S.optional(S.String),
        }).pipe(S.encodeKeys({ Identifier: "identifier", Type: "type", Arn: "arn" })),
      ).annotate({ identifier: "AffectedResource" });
    case 10:
      return S.Array(__S(2601, __c81, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          Priority: S.optional(S.String),
          DefenseTechnique: S.optional(S.String),
          Mitigates: S.optional(__S(3488, __c109, 0)),
          CliCommands: S.optional(__S(3488, __c109, 0)),
          DispositionId: S.optional(S.Number),
          Disposition: S.optional(S.String),
          AffectedResources: S.optional(__S(2602, __c81, 10)),
        }).pipe(
          S.encodeKeys({
            Title: "title",
            Description: "description",
            Priority: "priority",
            DefenseTechnique: "defenseTechnique",
            Mitigates: "mitigates",
            CliCommands: "cliCommands",
            DispositionId: "dispositionId",
            Disposition: "disposition",
            AffectedResources: "affectedResources",
          }),
        ),
      ).annotate({ identifier: "CountermeasureAction" });
    case 12:
      return S.Array(__S(2603, __c81, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          DefenseTactic: S.optional(S.String),
          Actions: S.optional(__S(2604, __c81, 12)),
          Description: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DefenseTactic: "defenseTactic",
            Actions: "actions",
            Description: "description",
          }),
        ),
      ).annotate({ identifier: "Countermeasure" });
    case 14:
      return S.Array(__S(2605, __c81, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          TotalFindings: S.optional(S.Number),
          SeverityBreakdown: S.optional(__S(2627, __c82, 3)),
          TopFindingTypes: S.optional(__S(2629, __c82, 5)),
          ByTimeWindow: S.optional(__S(2631, __c82, 7)),
        }).pipe(
          S.encodeKeys({
            TotalFindings: "totalFindings",
            SeverityBreakdown: "severityBreakdown",
            TopFindingTypes: "topFindingTypes",
            ByTimeWindow: "byTimeWindow",
          }),
        ),
      ).annotate({ identifier: "FindingsSummary" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          Type: S.optional(S.String),
          FindingCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ Identifier: "identifier", Type: "type", FindingCount: "findingCount" }),
        ),
      ).annotate({ identifier: "AccountAffectedResource" });
    case 17:
      return S.Array(__S(2608, __c81, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          FindingsSummary: S.optional(__S(2607, __c81, 15)),
          TacticCoverage: S.optional(__S(2635, __c82, 11)),
          AffectedResources: S.optional(__S(2609, __c81, 17)),
        }).pipe(
          S.encodeKeys({
            FindingsSummary: "findingsSummary",
            TacticCoverage: "tacticCoverage",
            AffectedResources: "affectedResources",
          }),
        ),
      ).annotate({ identifier: "AccountAnalysis" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          TotalFindings: S.optional(S.Number),
          SeverityBreakdown: S.optional(__S(2627, __c82, 3)),
          TopFindingTypes: S.optional(__S(2629, __c82, 5)),
          ByTimeWindow: S.optional(__S(2631, __c82, 7)),
          TotalAccountCount: S.optional(S.Number),
          AffectedAccountCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            TotalFindings: "totalFindings",
            SeverityBreakdown: "severityBreakdown",
            TopFindingTypes: "topFindingTypes",
            ByTimeWindow: "byTimeWindow",
            TotalAccountCount: "totalAccountCount",
            AffectedAccountCount: "affectedAccountCount",
          }),
        ),
      ).annotate({ identifier: "OrganizationFindingsSummary" });
    case 20:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), FindingCount: S.optional(S.Number) }).pipe(
          S.encodeKeys({ AccountId: "accountId", FindingCount: "findingCount" }),
        ),
      ).annotate({ identifier: "AccountSummary" });
    case 21:
      return S.Array(__S(2612, __c81, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          FindingsSummary: S.optional(__S(2611, __c81, 19)),
          AccountBreakdown: S.optional(__S(2613, __c81, 21)),
        }).pipe(
          S.encodeKeys({
            FindingsSummary: "findingsSummary",
            AccountBreakdown: "accountBreakdown",
          }),
        ),
      ).annotate({ identifier: "OrganizationAnalysis" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(S.String),
          Narrative: S.optional(S.String),
          Observations: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({ Title: "title", Narrative: "narrative", Observations: "observations" }),
        ),
      ).annotate({ identifier: "KeyObservations" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          FindingType: S.optional(S.String),
          ThreatAssessment: S.optional(__S(2600, __c81, 8)),
          Countermeasures: S.optional(__S(2606, __c81, 14)),
          AccountAnalysis: S.optional(__S(2610, __c81, 18)),
          OrganizationAnalysis: S.optional(__S(2614, __c81, 22)),
          KeyObservations: S.optional(__S(2615, __c81, 23)),
          Recommendations: S.optional(__S(2637, __c82, 13)),
        }).pipe(
          S.encodeKeys({
            FindingType: "findingType",
            ThreatAssessment: "threatAssessment",
            Countermeasures: "countermeasures",
            AccountAnalysis: "accountAnalysis",
            OrganizationAnalysis: "organizationAnalysis",
            KeyObservations: "keyObservations",
            Recommendations: "recommendations",
          }),
        ),
      ).annotate({ identifier: "InvestigationSummaryData" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(S.encodeKeys({ StartTime: "startTime", EndTime: "endTime" })),
      ).annotate({ identifier: "QueryTimeWindow" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          InvestigationType: S.optional(S.String),
          FindingId: S.optional(S.String),
          AccountId: S.optional(S.String),
          AdminAccountId: S.optional(S.String),
          QueryTimeWindow: S.optional(__S(2617, __c81, 25)),
        }).pipe(
          S.encodeKeys({
            InvestigationType: "investigationType",
            FindingId: "findingId",
            AccountId: "accountId",
            AdminAccountId: "adminAccountId",
            QueryTimeWindow: "queryTimeWindow",
          }),
        ),
      ).annotate({ identifier: "InvestigationScope" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          InvestigationId: S.optional(S.String),
          Status: S.optional(S.String),
          TriggerPrompt: S.optional(S.String),
          TriggeredBy: S.optional(S.String),
          Metadata: S.optional(__S(2594, __c81, 2)),
          Cloud: S.optional(__S(2595, __c81, 3)),
          RiskLevel: S.optional(S.String),
          Risk: S.optional(S.String),
          Confidence: S.optional(S.String),
          Summary: S.optional(S.String),
          SummaryData: S.optional(__S(2616, __c81, 24)),
          Scope: S.optional(__S(2618, __c81, 26)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Error: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            InvestigationId: "investigationId",
            Status: "status",
            TriggerPrompt: "triggerPrompt",
            TriggeredBy: "triggeredBy",
            Metadata: "metadata",
            Cloud: "cloud",
            RiskLevel: "riskLevel",
            Risk: "risk",
            Confidence: "confidence",
            Summary: "summary",
            SummaryData: "summaryData",
            Scope: "scope",
            StartTime: "startTime",
            EndTime: "endTime",
            Error: "error",
          }),
        ),
      ).annotate({ identifier: "Investigation" });
    case 28:
      return S.suspend(() =>
        S.Struct({ Investigation: S.optional(__S(2619, __c81, 27)) }).pipe(
          S.encodeKeys({ Investigation: "investigation" }),
        ),
      ).annotate({ identifier: "GetInvestigationResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Uid: S.optional(S.String) }).pipe(
          S.encodeKeys({ Name: "name", Uid: "uid" }),
        ),
      ).annotate({ identifier: "ThreatReference" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FindingType: S.optional(S.String), Uid: S.optional(S.String) }).pipe(
          S.encodeKeys({ FindingType: "findingType", Uid: "uid" }),
        ),
      ).annotate({ identifier: "FindingReference" });
    case 2:
      return S.Array(__S(2625, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Critical: S.optional(S.Number),
          High: S.optional(S.Number),
          Medium: S.optional(S.Number),
          Low: S.optional(S.Number),
          Info: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Critical: "critical",
            High: "high",
            Medium: "medium",
            Low: "low",
            Info: "info",
          }),
        ),
      ).annotate({ identifier: "SeverityBreakdown" });
    case 4:
      return S.suspend(() =>
        S.Struct({ FindingType: S.optional(S.String), Count: S.optional(S.Number) }).pipe(
          S.encodeKeys({ FindingType: "findingType", Count: "count" }),
        ),
      ).annotate({ identifier: "FindingTypeCount" });
    case 5:
      return S.Array(__S(2628, __c82, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FindingCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            StartTime: "startTime",
            EndTime: "endTime",
            FindingCount: "findingCount",
          }),
        ),
      ).annotate({ identifier: "TimeWindowGroup" });
    case 7:
      return S.Array(__S(2630, __c82, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Technique: S.optional(__S(2624, __c82, 0)),
          FindingCount: S.optional(S.Number),
          FindingTypes: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            Technique: "technique",
            FindingCount: "findingCount",
            FindingTypes: "findingTypes",
          }),
        ),
      ).annotate({ identifier: "TechniqueCoverage" });
    case 9:
      return S.Array(__S(2632, __c82, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          Phase: S.optional(S.String),
          FindingCount: S.optional(S.Number),
          FindingTypes: S.optional(__S(3488, __c109, 0)),
          Techniques: S.optional(__S(2633, __c82, 9)),
        }).pipe(
          S.encodeKeys({
            Phase: "phase",
            FindingCount: "findingCount",
            FindingTypes: "findingTypes",
            Techniques: "techniques",
          }),
        ),
      ).annotate({ identifier: "TacticCoverage" });
    case 11:
      return S.Array(__S(2634, __c82, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(S.String),
          Rationale: S.optional(S.String),
          Category: S.optional(S.String),
          Priority: S.optional(S.String),
          CliCommands: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            Title: "title",
            Rationale: "rationale",
            Category: "category",
            Priority: "priority",
            CliCommands: "cliCommands",
          }),
        ),
      ).annotate({ identifier: "Recommendation" });
    case 13:
      return S.Array(__S(2636, __c82, 12));
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/invitation/count" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInvitationsCountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ InvitationsCount: S.optional(S.Number) }).pipe(
          S.encodeKeys({ InvitationsCount: "invitationsCount" }),
        ),
      ).annotate({ identifier: "GetInvitationsCountResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          IpSetId: S.optional(S.String).pipe(T.HttpLabel("IpSetId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/ipset/{IpSetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIPSetRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Format: S.optional(S.String),
          Location: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(3936, __c123, 0)),
          ExpectedBucketOwner: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Format: "format",
            Location: "location",
            Status: "status",
            Tags: "tags",
            ExpectedBucketOwner: "expectedBucketOwner",
          }),
        ),
      ).annotate({ identifier: "GetIPSetResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MalwareProtectionPlanId: S.optional(S.String).pipe(
            T.HttpLabel("MalwareProtectionPlanId"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/malware-protection-plan/{MalwareProtectionPlanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMalwareProtectionPlanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }).pipe(
          S.encodeKeys({ Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "MalwareProtectionPlanStatusReason" });
    case 2:
      return S.Array(__S(2753, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Role: S.optional(S.String),
          ProtectedResource: S.optional(__S(609, __c19, 1)),
          Actions: S.optional(__S(640, __c20, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusReasons: S.optional(__S(2754, __c86, 2)),
          Tags: S.optional(__S(3936, __c123, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Role: "role",
            ProtectedResource: "protectedResource",
            Actions: "actions",
            CreatedAt: "createdAt",
            Status: "status",
            StatusReasons: "statusReasons",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "GetMalwareProtectionPlanResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScanId: S.optional(S.String).pipe(T.HttpLabel("ScanId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/malware-scan/{ScanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMalwareScanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DeviceName: S.optional(S.String) }).pipe(
          S.encodeKeys({ DeviceName: "deviceName" }),
        ),
      ).annotate({ identifier: "EbsSnapshot" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EbsVolume: S.optional(__S(1472, __c46, 0)),
          EbsSnapshot: S.optional(__S(2785, __c87, 1)),
        }).pipe(S.encodeKeys({ EbsVolume: "ebsVolume", EbsSnapshot: "ebsSnapshot" })),
      ).annotate({ identifier: "ScannedResourceDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScannedResourceArn: S.optional(S.String),
          ScannedResourceType: S.optional(S.String),
          ScannedResourceStatus: S.optional(S.String),
          ScanStatusReason: S.optional(S.String),
          ResourceDetails: S.optional(__S(2786, __c87, 2)),
        }).pipe(
          S.encodeKeys({
            ScannedResourceArn: "scannedResourceArn",
            ScannedResourceType: "scannedResourceType",
            ScannedResourceStatus: "scannedResourceStatus",
            ScanStatusReason: "scanStatusReason",
            ResourceDetails: "resourceDetails",
          }),
        ),
      ).annotate({ identifier: "ScannedResource" });
    case 4:
      return S.Array(__S(2787, __c87, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Role: S.optional(S.String),
          TriggerDetails: S.optional(__S(1536, __c48, 0)),
          IncrementalScanDetails: S.optional(__S(2433, __c76, 1)),
          RecoveryPoint: S.optional(__S(2816, __c88, 0)),
        }).pipe(
          S.encodeKeys({
            Role: "role",
            TriggerDetails: "triggerDetails",
            IncrementalScanDetails: "incrementalScanDetails",
            RecoveryPoint: "recoveryPoint",
          }),
        ),
      ).annotate({ identifier: "ScanConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Source: S.optional(S.String),
          Count: S.optional(S.Number),
          Hash: S.optional(S.String),
          ItemDetails: S.optional(__S(2402, __c75, 2)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Source: "source",
            Count: "count",
            Hash: "hash",
            ItemDetails: "itemDetails",
          }),
        ),
      ).annotate({ identifier: "ScanResultThreat" });
    case 7:
      return S.Array(__S(2790, __c87, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          ScanResultStatus: S.optional(S.String),
          SkippedFileCount: S.optional(S.Number),
          FailedFileCount: S.optional(S.Number),
          ThreatFoundFileCount: S.optional(S.Number),
          TotalFileCount: S.optional(S.Number),
          TotalBytes: S.optional(S.Number),
          UniqueThreatCount: S.optional(S.Number),
          Threats: S.optional(__S(2791, __c87, 7)),
        }).pipe(
          S.encodeKeys({
            ScanResultStatus: "scanResultStatus",
            SkippedFileCount: "skippedFileCount",
            FailedFileCount: "failedFileCount",
            ThreatFoundFileCount: "threatFoundFileCount",
            TotalFileCount: "totalFileCount",
            TotalBytes: "totalBytes",
            UniqueThreatCount: "uniqueThreatCount",
            Threats: "threats",
          }),
        ),
      ).annotate({ identifier: "GetMalwareScanResultDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ScanId: S.optional(S.String),
          DetectorId: S.optional(S.String),
          AdminDetectorId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ScannedResourcesCount: S.optional(S.Number),
          SkippedResourcesCount: S.optional(S.Number),
          FailedResourcesCount: S.optional(S.Number),
          ScannedResources: S.optional(__S(2788, __c87, 4)),
          ScanConfiguration: S.optional(__S(2789, __c87, 5)),
          ScanCategory: S.optional(S.String),
          ScanStatus: S.optional(S.String),
          ScanStatusReason: S.optional(S.String),
          ScanType: S.optional(S.String),
          ScanStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanCompletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanResultDetails: S.optional(__S(2792, __c87, 8)),
        }).pipe(
          S.encodeKeys({
            ScanId: "scanId",
            DetectorId: "detectorId",
            AdminDetectorId: "adminDetectorId",
            ResourceArn: "resourceArn",
            ResourceType: "resourceType",
            ScannedResourcesCount: "scannedResourcesCount",
            SkippedResourcesCount: "skippedResourcesCount",
            FailedResourcesCount: "failedResourcesCount",
            ScannedResources: "scannedResources",
            ScanConfiguration: "scanConfiguration",
            ScanCategory: "scanCategory",
            ScanStatus: "scanStatus",
            ScanStatusReason: "scanStatusReason",
            ScanType: "scanType",
            ScanStartedAt: "scanStartedAt",
            ScanCompletedAt: "scanCompletedAt",
            ScanResultDetails: "scanResultDetails",
          }),
        ),
      ).annotate({ identifier: "GetMalwareScanResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          ContinuousScanDetails: S.optional(__S(2432, __c76, 0)),
        }).pipe(
          S.encodeKeys({
            BackupVaultName: "backupVaultName",
            ContinuousScanDetails: "continuousScanDetails",
          }),
        ),
      ).annotate({ identifier: "ScanConfigurationRecoveryPoint" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/malware-scan-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMalwareScanSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ScanResourceCriteria: S.optional(__S(2882, __c90, 2)),
          EbsSnapshotPreservation: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ScanResourceCriteria: "scanResourceCriteria",
            EbsSnapshotPreservation: "ebsSnapshotPreservation",
          }),
        ),
      ).annotate({ identifier: "GetMalwareScanSettingsResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MapEquals: S.optional(__S(2465, __c77, 1)) }).pipe(
          S.encodeKeys({ MapEquals: "mapEquals" }),
        ),
      ).annotate({ identifier: "ScanCondition" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(2880, __c90, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Include: S.optional(__S(2881, __c90, 1)),
          Exclude: S.optional(__S(2881, __c90, 1)),
        }).pipe(S.encodeKeys({ Include: "include", Exclude: "exclude" })),
      ).annotate({ identifier: "ScanResourceCriteria" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/master" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMasterAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Master: S.optional(__S(1888, __c59, 0)) }).pipe(
          S.encodeKeys({ Master: "master" }),
        ),
      ).annotate({ identifier: "GetMasterAccountResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/detector/get" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetMemberDetectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          DataSources: S.optional(__S(2177, __c68, 1)),
          Features: S.optional(__S(2181, __c68, 5)),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            DataSources: "dataSources",
            Features: "features",
          }),
        ),
      ).annotate({ identifier: "MemberDataSourceConfiguration" });
    case 2:
      return S.Array(__S(2945, __c92, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MemberDataSourceConfigurations: S.optional(__S(2946, __c92, 2)),
          UnprocessedAccounts: S.optional(__S(737, __c23, 1)),
        }).pipe(
          S.encodeKeys({
            MemberDataSourceConfigurations: "members",
            UnprocessedAccounts: "unprocessedAccounts",
          }),
        ),
      ).annotate({ identifier: "GetMemberDetectorsResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/get" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Members: S.optional(__S(3009, __c94, 1)),
          UnprocessedAccounts: S.optional(__S(737, __c23, 1)),
        }).pipe(S.encodeKeys({ Members: "members", UnprocessedAccounts: "unprocessedAccounts" })),
      ).annotate({ identifier: "GetMembersResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          DetectorId: S.optional(S.String),
          MasterId: S.optional(S.String),
          Email: S.optional(SensitiveString),
          RelationshipStatus: S.optional(S.String),
          InvitedAt: S.optional(S.String),
          UpdatedAt: S.optional(S.String),
          AdministratorId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            DetectorId: "detectorId",
            MasterId: "masterId",
            Email: "email",
            RelationshipStatus: "relationshipStatus",
            InvitedAt: "invitedAt",
            UpdatedAt: "updatedAt",
            AdministratorId: "administratorId",
          }),
        ),
      ).annotate({ identifier: "Member" });
    case 1:
      return S.Array(__S(3008, __c94, 0));
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MasterId: S.optional(S.String),
          InvitationId: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ MasterId: "masterId", InvitationId: "invitationId" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/master" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AcceptInvitationRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/organization/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOrganizationStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), EnabledAccountsCount: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Name: "name", EnabledAccountsCount: "enabledAccountsCount" }),
        ),
      ).annotate({ identifier: "OrganizationFeatureStatisticsAdditionalConfiguration" });
    case 2:
      return S.Array(__S(3073, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          EnabledAccountsCount: S.optional(S.Number),
          AdditionalConfiguration: S.optional(__S(3074, __c96, 2)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            EnabledAccountsCount: "enabledAccountsCount",
            AdditionalConfiguration: "additionalConfiguration",
          }),
        ),
      ).annotate({ identifier: "OrganizationFeatureStatistics" });
    case 4:
      return S.Array(__S(3075, __c96, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          TotalAccountsCount: S.optional(S.Number),
          MemberAccountsCount: S.optional(S.Number),
          ActiveAccountsCount: S.optional(S.Number),
          EnabledAccountsCount: S.optional(S.Number),
          CountByFeature: S.optional(__S(3076, __c96, 4)),
        }).pipe(
          S.encodeKeys({
            TotalAccountsCount: "totalAccountsCount",
            MemberAccountsCount: "memberAccountsCount",
            ActiveAccountsCount: "activeAccountsCount",
            EnabledAccountsCount: "enabledAccountsCount",
            CountByFeature: "countByFeature",
          }),
        ),
      ).annotate({ identifier: "OrganizationStatistics" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OrganizationStatistics: S.optional(__S(3077, __c96, 5)),
        }).pipe(
          S.encodeKeys({
            UpdatedAt: "updatedAt",
            OrganizationStatistics: "organizationStatistics",
          }),
        ),
      ).annotate({ identifier: "OrganizationDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({ OrganizationDetails: S.optional(__S(3078, __c96, 6)) }).pipe(
          S.encodeKeys({ OrganizationDetails: "organizationDetails" }),
        ),
      ).annotate({ identifier: "GetOrganizationStatisticsResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: __S(3488, __c109, 0),
        })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/freeTrial/daysRemaining" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetRemainingFreeTrialDaysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FreeTrialDaysRemaining: S.optional(S.Number) }).pipe(
          S.encodeKeys({ FreeTrialDaysRemaining: "freeTrialDaysRemaining" }),
        ),
      ).annotate({ identifier: "DataSourceFreeTrial" });
    case 2:
      return S.suspend(() =>
        S.Struct({ AuditLogs: S.optional(__S(3105, __c97, 1)) }).pipe(
          S.encodeKeys({ AuditLogs: "auditLogs" }),
        ),
      ).annotate({ identifier: "KubernetesDataSourceFreeTrial" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ScanEc2InstanceWithFindings: S.optional(__S(3105, __c97, 1)) }).pipe(
          S.encodeKeys({ ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings" }),
        ),
      ).annotate({ identifier: "MalwareProtectionDataSourceFreeTrial" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CloudTrail: S.optional(__S(3105, __c97, 1)),
          DnsLogs: S.optional(__S(3105, __c97, 1)),
          FlowLogs: S.optional(__S(3105, __c97, 1)),
          S3Logs: S.optional(__S(3105, __c97, 1)),
          Kubernetes: S.optional(__S(3106, __c97, 2)),
          MalwareProtection: S.optional(__S(3107, __c97, 3)),
        }).pipe(
          S.encodeKeys({
            CloudTrail: "cloudTrail",
            DnsLogs: "dnsLogs",
            FlowLogs: "flowLogs",
            S3Logs: "s3Logs",
            Kubernetes: "kubernetes",
            MalwareProtection: "malwareProtection",
          }),
        ),
      ).annotate({ identifier: "DataSourcesFreeTrial" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), FreeTrialDaysRemaining: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Name: "name", FreeTrialDaysRemaining: "freeTrialDaysRemaining" }),
        ),
      ).annotate({ identifier: "FreeTrialFeatureConfigurationResult" });
    case 6:
      return S.Array(__S(3109, __c97, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          DataSources: S.optional(__S(3108, __c97, 4)),
          Features: S.optional(__S(3110, __c97, 6)),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            DataSources: "dataSources",
            Features: "features",
          }),
        ),
      ).annotate({ identifier: "AccountFreeTrialInfo" });
    case 8:
      return S.Array(__S(3111, __c97, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Accounts: S.optional(__S(3112, __c97, 8)),
          UnprocessedAccounts: S.optional(__S(737, __c23, 1)),
        }).pipe(S.encodeKeys({ Accounts: "accounts", UnprocessedAccounts: "unprocessedAccounts" })),
      ).annotate({ identifier: "GetRemainingFreeTrialDaysResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          ThreatEntitySetId: S.optional(S.String).pipe(T.HttpLabel("ThreatEntitySetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetThreatEntitySetRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Format: S.optional(S.String),
          Location: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(3936, __c123, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorDetails: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Format: "format",
            Location: "location",
            ExpectedBucketOwner: "expectedBucketOwner",
            Status: "status",
            Tags: "tags",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            ErrorDetails: "errorDetails",
          }),
        ),
      ).annotate({ identifier: "GetThreatEntitySetResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          ThreatIntelSetId: S.String.pipe(T.HttpLabel("ThreatIntelSetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetThreatIntelSetRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          TrustedEntitySetId: S.String.pipe(T.HttpLabel("TrustedEntitySetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrustedEntitySetRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountIds: S.optional(__S(3488, __c109, 0)),
          DataSources: S.optional(__S(1952, __c61, 0)),
          Resources: S.optional(__S(3488, __c109, 0)),
          Features: S.optional(__S(1952, __c61, 0)),
        }).pipe(
          S.encodeKeys({
            AccountIds: "accountIds",
            DataSources: "dataSources",
            Resources: "resources",
            Features: "features",
          }),
        ),
      ).annotate({ identifier: "UsageCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          UsageStatisticType: S.optional(S.String),
          UsageCriteria: S.optional(__S(3264, __c102, 0)),
          Unit: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              UsageStatisticType: "usageStatisticsType",
              UsageCriteria: "usageCriteria",
              Unit: "unit",
              MaxResults: "maxResults",
              NextToken: "nextToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/usage/statistics" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetUsageStatisticsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Amount: S.optional(S.String), Unit: S.optional(S.String) }).pipe(
          S.encodeKeys({ Amount: "amount", Unit: "unit" }),
        ),
      ).annotate({ identifier: "Total" });
    case 3:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Total: S.optional(__S(3266, __c102, 2)) }).pipe(
          S.encodeKeys({ AccountId: "accountId", Total: "total" }),
        ),
      ).annotate({ identifier: "UsageAccountResult" });
    case 4:
      return S.Array(__S(3267, __c102, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Feature: S.optional(S.String),
          Accounts: S.optional(__S(3268, __c102, 4)),
        }).pipe(S.encodeKeys({ Feature: "feature", Accounts: "accounts" })),
      ).annotate({ identifier: "UsageTopAccountsResult" });
    case 6:
      return S.Array(__S(3269, __c102, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          DataSource: S.optional(S.String),
          Total: S.optional(__S(3266, __c102, 2)),
        }).pipe(S.encodeKeys({ DataSource: "dataSource", Total: "total" })),
      ).annotate({ identifier: "UsageDataSourceResult" });
    case 8:
      return S.Array(__S(3271, __c102, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ Resource: S.optional(S.String), Total: S.optional(__S(3266, __c102, 2)) }).pipe(
          S.encodeKeys({ Resource: "resource", Total: "total" }),
        ),
      ).annotate({ identifier: "UsageResourceResult" });
    case 10:
      return S.Array(__S(3273, __c102, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ Feature: S.optional(S.String), Total: S.optional(__S(3266, __c102, 2)) }).pipe(
          S.encodeKeys({ Feature: "feature", Total: "total" }),
        ),
      ).annotate({ identifier: "UsageFeatureResult" });
    case 12:
      return S.Array(__S(3275, __c102, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          SumByAccount: S.optional(__S(3268, __c102, 4)),
          TopAccountsByFeature: S.optional(__S(3270, __c102, 6)),
          SumByDataSource: S.optional(__S(3272, __c102, 8)),
          SumByResource: S.optional(__S(3274, __c102, 10)),
          TopResources: S.optional(__S(3274, __c102, 10)),
          SumByFeature: S.optional(__S(3276, __c102, 12)),
        }).pipe(
          S.encodeKeys({
            SumByAccount: "sumByAccount",
            TopAccountsByFeature: "topAccountsByFeature",
            SumByDataSource: "sumByDataSource",
            SumByResource: "sumByResource",
            TopResources: "topResources",
            SumByFeature: "sumByFeature",
          }),
        ),
      ).annotate({ identifier: "UsageStatistics" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          UsageStatistics: S.optional(__S(3277, __c102, 13)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ UsageStatistics: "usageStatistics", NextToken: "nextToken" })),
      ).annotate({ identifier: "GetUsageStatisticsResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3488, __c109, 0)),
          DisableEmailNotification: S.optional(S.Boolean),
          Message: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              AccountIds: "accountIds",
              DisableEmailNotification: "disableEmailNotification",
              Message: "message",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/invite" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "InviteMembersRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          FilterCriteria: S.optional(__S(1986, __c62, 2)),
          SortCriteria: S.optional(__S(3360, __c105, 0)),
        })
          .pipe(
            S.encodeKeys({
              NextToken: "nextToken",
              MaxResults: "maxResults",
              FilterCriteria: "filterCriteria",
              SortCriteria: "sortCriteria",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/coverage" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListCoverageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AddonVersion: S.optional(S.String), AddonStatus: S.optional(S.String) }).pipe(
          S.encodeKeys({ AddonVersion: "addonVersion", AddonStatus: "addonStatus" }),
        ),
      ).annotate({ identifier: "AddonDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          CoveredNodes: S.optional(S.Number),
          CompatibleNodes: S.optional(S.Number),
          AddonDetails: S.optional(__S(3329, __c104, 1)),
          ManagementType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ClusterName: "clusterName",
            CoveredNodes: "coveredNodes",
            CompatibleNodes: "compatibleNodes",
            AddonDetails: "addonDetails",
            ManagementType: "managementType",
          }),
        ),
      ).annotate({ identifier: "CoverageEksClusterDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Issues: S.optional(__S(3488, __c109, 0)),
          ManagementType: S.optional(S.String),
        }).pipe(S.encodeKeys({ Issues: "issues", ManagementType: "managementType" })),
      ).annotate({ identifier: "FargateDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CoveredContainerInstances: S.optional(S.Number),
          CompatibleContainerInstances: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            CoveredContainerInstances: "coveredContainerInstances",
            CompatibleContainerInstances: "compatibleContainerInstances",
          }),
        ),
      ).annotate({ identifier: "ContainerInstanceDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          FargateDetails: S.optional(__S(3331, __c104, 3)),
          ContainerInstanceDetails: S.optional(__S(3332, __c104, 4)),
        }).pipe(
          S.encodeKeys({
            ClusterName: "clusterName",
            FargateDetails: "fargateDetails",
            ContainerInstanceDetails: "containerInstanceDetails",
          }),
        ),
      ).annotate({ identifier: "CoverageEcsClusterDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Version: S.optional(S.String) }).pipe(S.encodeKeys({ Version: "version" })),
      ).annotate({ identifier: "AgentDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          InstanceType: S.optional(S.String),
          ClusterArn: S.optional(S.String),
          AgentDetails: S.optional(__S(3334, __c104, 6)),
          ManagementType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            InstanceId: "instanceId",
            InstanceType: "instanceType",
            ClusterArn: "clusterArn",
            AgentDetails: "agentDetails",
            ManagementType: "managementType",
          }),
        ),
      ).annotate({ identifier: "CoverageEc2InstanceDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          EksClusterDetails: S.optional(__S(3330, __c104, 2)),
          EcsClusterDetails: S.optional(__S(3333, __c104, 5)),
          Ec2InstanceDetails: S.optional(__S(3335, __c104, 7)),
          ResourceType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EksClusterDetails: "eksClusterDetails",
            EcsClusterDetails: "ecsClusterDetails",
            Ec2InstanceDetails: "ec2InstanceDetails",
            ResourceType: "resourceType",
          }),
        ),
      ).annotate({ identifier: "CoverageResourceDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          DetectorId: S.optional(S.String),
          AccountId: S.optional(S.String),
          ResourceDetails: S.optional(__S(3336, __c104, 8)),
          CoverageStatus: S.optional(S.String),
          Issue: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            ResourceId: "resourceId",
            DetectorId: "detectorId",
            AccountId: "accountId",
            ResourceDetails: "resourceDetails",
            CoverageStatus: "coverageStatus",
            Issue: "issue",
            UpdatedAt: "updatedAt",
          }),
        ),
      ).annotate({ identifier: "CoverageResource" });
    case 10:
      return S.Array(__S(3337, __c104, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Resources: S.optional(__S(3338, __c104, 10)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Resources: "resources", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListCoverageResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), OrderBy: S.optional(S.String) }).pipe(
          S.encodeKeys({ AttributeName: "attributeName", OrderBy: "orderBy" }),
        ),
      ).annotate({ identifier: "CoverageSortCriteria" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RuleId: S.optional(S.String).pipe(T.HttpQuery("ruleId")),
          Mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/custom-detection-rule/association" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomDetectionRuleAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          Arn: S.optional(S.String),
          RuleId: S.optional(S.String),
          Mode: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            AssociationId: "associationId",
            Arn: "arn",
            RuleId: "ruleId",
            Mode: "mode",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            ExpiresAt: "expiresAt",
          }),
        ),
      ).annotate({ identifier: "AssociationSummary" });
    case 2:
      return S.Array(__S(3393, __c106, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RuleAssociations: S.optional(__S(3394, __c106, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ RuleAssociations: "ruleAssociations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListCustomDetectionRuleAssociationsResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/custom-detection-rule/org-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomDetectionRuleOrgConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          Mode: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            RuleId: "ruleId",
            Mode: "mode",
            Status: "status",
            StatusReason: "statusReason",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            ExpiresAt: "expiresAt",
          }),
        ),
      ).annotate({ identifier: "DetectionRuleOrgConfigurationSummary" });
    case 2:
      return S.Array(__S(3425, __c107, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Configurations: S.optional(__S(3426, __c107, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Configurations: "configurations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListCustomDetectionRuleOrgConfigurationsResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ FindingIds: "findingIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings/archive" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ArchiveFindingsRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Values: S.optional(__S(3488, __c109, 0)),
          Condition: S.optional(S.String),
        }).pipe(S.encodeKeys({ Name: "name", Values: "values", Condition: "condition" })),
      ).annotate({ identifier: "DetectionRuleFilter" });
    case 1:
      return S.Array(__S(3520, __c110, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(3521, __c110, 1)),
        })
          .pipe(
            S.encodeKeys({ MaxResults: "maxResults", NextToken: "nextToken", Filters: "filters" }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/custom-detection-rule/rule" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListCustomDetectionRulesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Severity: S.optional(S.String),
          DataSource: S.optional(S.String),
          Tactic: S.optional(S.String),
          Technique: S.optional(S.String),
          Service: S.optional(S.String),
          Language: S.optional(S.String),
          Schema: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            RuleId: "ruleId",
            Arn: "arn",
            Name: "name",
            Description: "description",
            Severity: "severity",
            DataSource: "dataSource",
            Tactic: "tactic",
            Technique: "technique",
            Service: "service",
            Language: "language",
            Schema: "schema",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
          }),
        ),
      ).annotate({ identifier: "RuleSummary" });
    case 4:
      return S.Array(__S(3523, __c110, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Rules: S.optional(__S(3524, __c110, 4)), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Rules: "rules", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListCustomDetectionRulesResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/detector" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDetectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DetectorIds: S.optional(__S(3488, __c109, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ DetectorIds: "detectorIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListDetectorsResponse" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/filter" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFiltersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FilterNames: S.optional(__S(3488, __c109, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ FilterNames: "filterNames", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListFiltersResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingCriteria: S.optional(__S(418, __c13, 2)),
          SortCriteria: S.optional(__S(1504, __c47, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              FindingCriteria: "findingCriteria",
              SortCriteria: "sortCriteria",
              MaxResults: "maxResults",
              NextToken: "nextToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FindingIds: S.optional(__S(3488, __c109, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ FindingIds: "findingIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListFindingsResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          InvestigationId: S.optional(S.String),
          RecordTypes: S.optional(__S(1952, __c61, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              InvestigationId: "investigationId",
              RecordTypes: "recordTypes",
              MaxResults: "maxResults",
              NextToken: "nextToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/investigation/records" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListInvestigationRecordsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Field: S.optional(S.String),
          Condition: S.optional(S.String),
          Values: S.optional(__S(3488, __c109, 0)),
        }).pipe(S.encodeKeys({ Field: "field", Condition: "condition", Values: "values" })),
      ).annotate({ identifier: "FetchCriterion" });
    case 2:
      return S.Array(__S(3649, __c114, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DurationInMinutes: S.optional(S.Number),
        }).pipe(S.encodeKeys({ StartedAt: "startedAt", DurationInMinutes: "durationInMinutes" })),
      ).annotate({ identifier: "FetchTimeWindow" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Criteria: S.optional(__S(3650, __c114, 2)),
          TimeWindow: S.optional(__S(3651, __c114, 3)),
          RowLimit: S.optional(S.Number),
          AccountId: S.optional(S.String),
          Indicator: S.optional(SensitiveString),
          IndicatorType: S.optional(S.String),
          FindingType: S.optional(S.String),
          FindingId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Criteria: "criteria",
            TimeWindow: "timeWindow",
            RowLimit: "rowLimit",
            AccountId: "accountId",
            Indicator: "indicator",
            IndicatorType: "indicatorType",
            FindingType: "findingType",
            FindingId: "findingId",
          }),
        ),
      ).annotate({ identifier: "FetchQuery" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(S.encodeKeys({ Name: "name", Status: "status", UpdatedAt: "updatedAt" })),
      ).annotate({ identifier: "InvestigationDetectorFeatureConfiguration" });
    case 6:
      return S.Array(__S(3653, __c114, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Severity: S.optional(S.String),
          Feature: S.optional(S.String),
          FullDescription: S.optional(S.String),
          Remediation: S.optional(S.String),
          LearnMoreLinks: S.optional(__S(3488, __c109, 0)),
        }).pipe(
          S.encodeKeys({
            Description: "description",
            Severity: "severity",
            Feature: "feature",
            FullDescription: "fullDescription",
            Remediation: "remediation",
            LearnMoreLinks: "learnMoreLinks",
          }),
        ),
      ).annotate({ identifier: "FindingTypeDocumentation" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ItemIds: S.optional(__S(3488, __c109, 0)),
          TotalCount: S.optional(S.Number),
          Features: S.optional(__S(3654, __c114, 6)),
          Verdict: S.optional(S.String),
          Documentation: S.optional(__S(3655, __c114, 7)),
        }).pipe(
          S.encodeKeys({
            ItemIds: "itemIds",
            TotalCount: "totalCount",
            Features: "features",
            Verdict: "verdict",
            Documentation: "documentation",
          }),
        ),
      ).annotate({ identifier: "FetchResult" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          FetchType: S.optional(S.String),
          Query: S.optional(__S(3652, __c114, 4)),
          Result: S.optional(__S(3656, __c114, 8)),
        }).pipe(S.encodeKeys({ FetchType: "fetchType", Query: "query", Result: "result" })),
      ).annotate({ identifier: "FetchRecord" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          FindingTimeDisposition: S.optional(S.String),
          CurrentDisposition: S.optional(S.String),
          ReputationComparison: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FindingTimeDisposition: "findingTimeDisposition",
            CurrentDisposition: "currentDisposition",
            ReputationComparison: "reputationComparison",
          }),
        ),
      ).annotate({ identifier: "Reputation" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Reputation: S.optional(__S(3658, __c114, 10)),
          ThreatConfidence: S.optional(S.String),
          Classification: S.optional(S.String),
          Assessment: S.optional(S.String),
          AuthenticationContext: S.optional(S.String),
          RdsControlPlaneActivity: S.optional(S.String),
          IpAccountActivity: S.optional(S.String),
          CredentialCompromise: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Reputation: "reputation",
            ThreatConfidence: "threatConfidence",
            Classification: "classification",
            Assessment: "assessment",
            AuthenticationContext: "authenticationContext",
            RdsControlPlaneActivity: "rdsControlPlaneActivity",
            IpAccountActivity: "ipAccountActivity",
            CredentialCompromise: "credentialCompromise",
          }),
        ),
      ).annotate({ identifier: "InvestigationThreatAssessment" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          ViolationType: S.optional(S.String),
          AffectedResource: S.optional(S.String),
          Subject: S.optional(S.String),
          GrantedAccess: S.optional(S.String),
          ExposureVector: S.optional(S.String),
          MisconfigurationImpact: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ViolationType: "violationType",
            AffectedResource: "affectedResource",
            Subject: "subject",
            GrantedAccess: "grantedAccess",
            ExposureVector: "exposureVector",
            MisconfigurationImpact: "misconfigurationImpact",
          }),
        ),
      ).annotate({ identifier: "KubernetesPolicyViolation" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          FindingSubtype: S.optional(S.String),
          EffectivePermission: S.optional(S.String),
          BlockPublicAccessSettings: S.optional(S.String),
          Exposure: S.optional(S.String),
          UserAgent: S.optional(S.String),
          UserAgentClassification: S.optional(S.String),
          SourceIp: S.optional(S.String),
          IpReputation: S.optional(S.String),
          ActorAssessment: S.optional(S.String),
          S3ApiActivity: S.optional(S.String),
          SourceContext: S.optional(S.String),
          AuthorizationAssessment: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FindingSubtype: "findingSubtype",
            EffectivePermission: "effectivePermission",
            BlockPublicAccessSettings: "blockPublicAccessSettings",
            Exposure: "exposure",
            UserAgent: "userAgent",
            UserAgentClassification: "userAgentClassification",
            SourceIp: "sourceIp",
            IpReputation: "ipReputation",
            ActorAssessment: "actorAssessment",
            S3ApiActivity: "s3ApiActivity",
            SourceContext: "sourceContext",
            AuthorizationAssessment: "authorizationAssessment",
          }),
        ),
      ).annotate({ identifier: "S3Analysis" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Uuid: S.optional(S.String),
          Name: S.optional(S.String),
          Path: S.optional(S.String),
          ParentUuid: S.optional(S.String),
          Findings: S.optional(__S(2626, __c82, 2)),
        }).pipe(
          S.encodeKeys({
            Uuid: "uuid",
            Name: "name",
            Path: "path",
            ParentUuid: "parentUuid",
            Findings: "findings",
          }),
        ),
      ).annotate({ identifier: "Process" });
    case 15:
      return S.Array(__S(3662, __c114, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Granularity: S.optional(S.String),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TotalFindings: S.optional(S.Number),
          ByTimeWindow: S.optional(__S(2631, __c82, 7)),
        }).pipe(
          S.encodeKeys({
            Granularity: "granularity",
            StartedAt: "startTime",
            EndedAt: "endTime",
            TotalFindings: "totalFindings",
            ByTimeWindow: "byTimeWindow",
          }),
        ),
      ).annotate({ identifier: "Trend" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          FindingType: S.optional(S.String),
          Classification: S.optional(S.String),
          Count: S.optional(S.Number),
          Percentage: S.optional(S.Number),
          Description: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FindingType: "findingType",
            Classification: "classification",
            Count: "count",
            Percentage: "percentage",
            Description: "description",
          }),
        ),
      ).annotate({ identifier: "FindingTypeClassification" });
    case 18:
      return S.Array(__S(3665, __c114, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          TotalFindings: S.optional(S.Number),
          BaselineFindings: S.optional(__S(3666, __c114, 18)),
          AnomalousFindings: S.optional(__S(3666, __c114, 18)),
        }).pipe(
          S.encodeKeys({
            TotalFindings: "totalFindings",
            BaselineFindings: "baselineFindings",
            AnomalousFindings: "anomalousFindings",
          }),
        ),
      ).annotate({ identifier: "Baseline" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Trend: S.optional(__S(3664, __c114, 16)),
          Baseline: S.optional(__S(3667, __c114, 19)),
        }).pipe(S.encodeKeys({ Trend: "trend", Baseline: "baseline" })),
      ).annotate({ identifier: "InvestigationAccountAnalysis" });
    case 21:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(SensitiveString), Type: S.optional(S.String) }).pipe(
          S.encodeKeys({ Value: "value", Type: "type" }),
        ),
      ).annotate({ identifier: "InvestigationIndicator" });
    case 22:
      return S.Array(__S(3669, __c114, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AnalysisType: S.optional(S.String),
          ThreatAssessment: S.optional(__S(3659, __c114, 11)),
          KubernetesPolicyViolation: S.optional(__S(3660, __c114, 12)),
          S3Analysis: S.optional(__S(3661, __c114, 13)),
          Processes: S.optional(__S(3663, __c114, 15)),
          AccountAnalysis: S.optional(__S(3668, __c114, 20)),
          Indicators: S.optional(__S(3670, __c114, 22)),
        }).pipe(
          S.encodeKeys({
            AnalysisType: "analysisType",
            ThreatAssessment: "threatAssessment",
            KubernetesPolicyViolation: "kubernetesPolicyViolation",
            S3Analysis: "s3Analysis",
            Processes: "processes",
            AccountAnalysis: "accountAnalysis",
            Indicators: "indicators",
          }),
        ),
      ).annotate({ identifier: "AnalysisRecord" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          FirstSeenAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSeenAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(S.encodeKeys({ FirstSeenAt: "firstSeenAt", LastSeenAt: "lastSeenAt" })),
      ).annotate({ identifier: "ActivityWindow" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          FindingId: S.optional(S.String),
          FindingType: S.optional(S.String),
          Severity: S.optional(S.String),
          AccountId: S.optional(S.String),
          Region: S.optional(S.String),
          ActivityWindow: S.optional(__S(3672, __c114, 24)),
        }).pipe(
          S.encodeKeys({
            FindingId: "findingId",
            FindingType: "findingType",
            Severity: "severity",
            AccountId: "accountId",
            Region: "region",
            ActivityWindow: "activityWindow",
          }),
        ),
      ).annotate({ identifier: "FindingDetail" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          InstanceType: S.optional(S.String),
          InstanceState: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          PrivateIpAddress: S.optional(SensitiveString),
          PublicIp: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          ImageId: S.optional(S.String),
          LaunchedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            InstanceId: "instanceId",
            InstanceType: "instanceType",
            InstanceState: "instanceState",
            AvailabilityZone: "availabilityZone",
            PrivateIpAddress: "privateIpAddress",
            PublicIp: "publicIp",
            VpcId: "vpcId",
            SubnetId: "subnetId",
            ImageId: "imageId",
            LaunchedAt: "launchedAt",
          }),
        ),
      ).annotate({ identifier: "InvestigationEc2Instance" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.optional(S.String),
          FunctionArn: S.optional(S.String),
          FunctionVersion: S.optional(S.String),
          Role: S.optional(S.String),
          Description: S.optional(S.String),
          RevisionId: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VpcConfigurationSummary: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FunctionName: "functionName",
            FunctionArn: "functionArn",
            FunctionVersion: "functionVersion",
            Role: "role",
            Description: "description",
            RevisionId: "revisionId",
            UpdatedAt: "updatedAt",
            VpcConfigurationSummary: "vpcConfigurationSummary",
          }),
        ),
      ).annotate({ identifier: "LambdaFunction" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          DbInstanceIdentifier: S.optional(S.String),
          DbClusterIdentifier: S.optional(S.String),
          DbInstanceArn: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DbInstanceIdentifier: "dbInstanceIdentifier",
            DbClusterIdentifier: "dbClusterIdentifier",
            DbInstanceArn: "dbInstanceArn",
            DbiResourceId: "dbiResourceId",
            Engine: "engine",
            EngineVersion: "engineVersion",
          }),
        ),
      ).annotate({ identifier: "RdsDbInstance" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          User: S.optional(S.String),
          Application: S.optional(S.String),
          Database: S.optional(S.String),
          AuthMethod: S.optional(S.String),
          Ssl: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            User: "user",
            Application: "application",
            Database: "database",
            AuthMethod: "authMethod",
            Ssl: "ssl",
          }),
        ),
      ).annotate({ identifier: "RdsDbUser" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Status: S.optional(S.String),
          VpcId: S.optional(S.String),
        }).pipe(S.encodeKeys({ Name: "name", Arn: "arn", Status: "status", VpcId: "vpcId" })),
      ).annotate({ identifier: "InvestigationEksCluster" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(S.encodeKeys({ Name: "name", Arn: "arn", Status: "status" })),
      ).annotate({ identifier: "InvestigationEcsCluster" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Ec2Instance: S.optional(__S(3674, __c114, 26)),
          LambdaFunction: S.optional(__S(3675, __c114, 27)),
          RdsDbInstance: S.optional(__S(3676, __c114, 28)),
          RdsDbUser: S.optional(__S(3677, __c114, 29)),
          EksCluster: S.optional(__S(3678, __c114, 30)),
          EcsCluster: S.optional(__S(3679, __c114, 31)),
        }).pipe(
          S.encodeKeys({
            Ec2Instance: "ec2Instance",
            LambdaFunction: "lambdaFunction",
            RdsDbInstance: "rdsDbInstance",
            RdsDbUser: "rdsDbUser",
            EksCluster: "eksCluster",
            EcsCluster: "ecsCluster",
          }),
        ),
      ).annotate({ identifier: "InvestigationResourceData" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.String),
          Name: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Data: S.optional(__S(3680, __c115, 0)),
        }).pipe(
          S.encodeKeys({ Uid: "uid", Name: "name", ResourceType: "resourceType", Data: "data" }),
        ),
      ).annotate({ identifier: "InvestigationResource" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TargetPort: S.optional(S.String),
          RemotePort: S.optional(S.String),
          ResolverPort: S.optional(S.String),
          Ports: S.optional(S.String),
          PortsUsed: S.optional(S.String),
          PortCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            TargetPort: "targetPort",
            RemotePort: "remotePort",
            ResolverPort: "resolverPort",
            Ports: "ports",
            PortsUsed: "portsUsed",
            PortCount: "portCount",
          }),
        ),
      ).annotate({ identifier: "NetworkPorts" });
    case 3:
      return S.suspend(() =>
        S.Struct({ BytesSent: S.optional(S.Number), BytesReceived: S.optional(S.Number) }).pipe(
          S.encodeKeys({ BytesSent: "bytesSent", BytesReceived: "bytesReceived" }),
        ),
      ).annotate({ identifier: "NetworkTraffic" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BaselineBytes: S.optional(S.String),
          Deviation: S.optional(S.String),
          ProfileAgeDays: S.optional(S.Number),
          RemoteService: S.optional(S.String),
          RemoteRegion: S.optional(S.String),
          Duration: S.optional(S.String),
          ResetRatio: S.optional(S.String),
          TargetHostCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BaselineBytes: "baselineBytes",
            Deviation: "deviation",
            ProfileAgeDays: "profileAgeDays",
            RemoteService: "remoteService",
            RemoteRegion: "remoteRegion",
            Duration: "duration",
            ResetRatio: "resetRatio",
            TargetHostCount: "targetHostCount",
          }),
        ),
      ).annotate({ identifier: "NetworkAnomaly" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DomainSuffix: S.optional(S.String),
          OtherDomains: S.optional(S.String),
          ResolverHistory: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DomainSuffix: "domainSuffix",
            OtherDomains: "otherDomains",
            ResolverHistory: "resolverHistory",
          }),
        ),
      ).annotate({ identifier: "DnsContext" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          RequestCount: S.optional(S.Number),
          TotalAttempts: S.optional(S.Number),
          SuspiciousAttempts: S.optional(S.Number),
          ResetAttempts: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            RequestCount: "requestCount",
            TotalAttempts: "totalAttempts",
            SuspiciousAttempts: "suspiciousAttempts",
            ResetAttempts: "resetAttempts",
          }),
        ),
      ).annotate({ identifier: "NetworkCounts" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          CountryName: S.optional(S.String),
          AsnOrg: S.optional(S.String),
          ThreatListName: S.optional(S.String),
          ThreatName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CountryName: "countryName",
            AsnOrg: "asnOrg",
            ThreatListName: "threatListName",
            ThreatName: "threatName",
          }),
        ),
      ).annotate({ identifier: "Enrichment" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Protocol: S.optional(S.String),
          Direction: S.optional(S.String),
          Method: S.optional(S.String),
          Blocked: S.optional(S.String),
          Platform: S.optional(S.String),
          Ports: S.optional(__S(3682, __c115, 2)),
          Traffic: S.optional(__S(3683, __c115, 3)),
          Anomaly: S.optional(__S(3684, __c115, 4)),
          Dns: S.optional(__S(3685, __c115, 5)),
          Counts: S.optional(__S(3686, __c115, 6)),
          Enrichment: S.optional(__S(3687, __c115, 7)),
        }).pipe(
          S.encodeKeys({
            Protocol: "protocol",
            Direction: "direction",
            Method: "method",
            Blocked: "blocked",
            Platform: "platform",
            Ports: "ports",
            Traffic: "traffic",
            Anomaly: "anomaly",
            Dns: "dns",
            Counts: "counts",
            Enrichment: "enrichment",
          }),
        ),
      ).annotate({ identifier: "NetworkActivity" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Outcome: S.optional(S.String),
          Rate: S.optional(S.String),
          AnomalyContext: S.optional(S.String),
          LoginCount: S.optional(S.Number),
          ActivityWindow: S.optional(__S(3672, __c114, 24)),
          Enrichment: S.optional(__S(3687, __c115, 7)),
        }).pipe(
          S.encodeKeys({
            Outcome: "outcome",
            Rate: "rate",
            AnomalyContext: "anomalyContext",
            LoginCount: "loginCount",
            ActivityWindow: "activityWindow",
            Enrichment: "enrichment",
          }),
        ),
      ).annotate({ identifier: "RdsLoginActivity" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AccessKeyId: S.optional(S.String),
          PrincipalId: S.optional(S.String),
          UserName: S.optional(S.String),
          UserType: S.optional(S.String),
          UserAgent: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccessKeyId: "accessKeyId",
            PrincipalId: "principalId",
            UserName: "userName",
            UserType: "userType",
            UserAgent: "userAgent",
          }),
        ),
      ).annotate({ identifier: "InvestigationActor" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Api: S.optional(S.String),
          AffectedBucket: S.optional(S.String),
          OtherS3Activity: S.optional(S.String),
          NonS3Activity: S.optional(S.String),
          SessionAssessment: S.optional(S.String),
          EventCount: S.optional(S.Number),
          Actor: S.optional(__S(3690, __c115, 10)),
          SourceIp: S.optional(S.String),
          Enrichment: S.optional(__S(3687, __c115, 7)),
          ActivityWindow: S.optional(__S(3672, __c114, 24)),
        }).pipe(
          S.encodeKeys({
            Api: "api",
            AffectedBucket: "affectedBucket",
            OtherS3Activity: "otherS3Activity",
            NonS3Activity: "nonS3Activity",
            SessionAssessment: "sessionAssessment",
            EventCount: "eventCount",
            Actor: "actor",
            SourceIp: "sourceIp",
            Enrichment: "enrichment",
            ActivityWindow: "activityWindow",
          }),
        ),
      ).annotate({ identifier: "S3Activity" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          Username: S.optional(S.String),
          UserGroups: S.optional(S.String),
          UserId: S.optional(S.String),
          Verb: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceName: S.optional(S.String),
          Namespace: S.optional(S.String),
          RequestUri: S.optional(S.String),
          StatusCode: S.optional(S.Number),
          SourceIps: S.optional(S.String),
          UserAgent: S.optional(S.String),
          EventCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ClusterName: "clusterName",
            Username: "username",
            UserGroups: "userGroups",
            UserId: "userId",
            Verb: "verb",
            ResourceType: "resourceType",
            ResourceName: "resourceName",
            Namespace: "namespace",
            RequestUri: "requestUri",
            StatusCode: "statusCode",
            SourceIps: "sourceIPs",
            UserAgent: "userAgent",
            EventCount: "eventCount",
          }),
        ),
      ).annotate({ identifier: "KubernetesApiCall" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          UnusualBehavior: S.optional(S.String),
          BaselineContext: S.optional(S.String),
          AnomalyScore: S.optional(S.String),
          TrainingPeriod: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            UnusualBehavior: "unusualBehavior",
            BaselineContext: "baselineContext",
            AnomalyScore: "anomalyScore",
            TrainingPeriod: "trainingPeriod",
          }),
        ),
      ).annotate({ identifier: "KubernetesAnomaly" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          WorkloadType: S.optional(S.String),
          WorkloadName: S.optional(S.String),
          Containers: S.optional(S.String),
          Volumes: S.optional(S.String),
          SecurityContext: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            WorkloadType: "workloadType",
            WorkloadName: "workloadName",
            Containers: "containers",
            Volumes: "volumes",
            SecurityContext: "securityContext",
          }),
        ),
      ).annotate({ identifier: "InvestigationKubernetesWorkload" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ApiCall: S.optional(__S(3692, __c115, 12)),
          Anomaly: S.optional(__S(3693, __c115, 13)),
          Workload: S.optional(__S(3694, __c115, 14)),
          Enrichment: S.optional(__S(3687, __c115, 7)),
        }).pipe(
          S.encodeKeys({
            ApiCall: "apiCall",
            Anomaly: "anomaly",
            Workload: "workload",
            Enrichment: "enrichment",
          }),
        ),
      ).annotate({ identifier: "KubernetesActivity" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Severity: S.optional(S.String),
          InfectedFileCount: S.optional(S.Number),
          SampleFiles: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Severity: "severity",
            InfectedFileCount: "infectedFileCount",
            SampleFiles: "sampleFiles",
          }),
        ),
      ).annotate({ identifier: "MalwareThreat" });
    case 17:
      return S.Array(__S(3696, __c115, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          ScanId: S.optional(S.String),
          ScanType: S.optional(S.String),
          ScanCategory: S.optional(S.String),
          TriggerFindingId: S.optional(S.String),
          EngineSources: S.optional(S.String),
          ScanStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanCompletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FilesScanned: S.optional(S.Number),
          GigabytesScanned: S.optional(S.Number),
          VolumesScanned: S.optional(S.Number),
          InfectedFileCount: S.optional(S.Number),
          ResourceType: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          HighestSeverity: S.optional(S.String),
          HighestSeverityThreatName: S.optional(S.String),
          UniqueThreatCount: S.optional(S.Number),
          TotalInfectedItems: S.optional(S.Number),
          Threats: S.optional(__S(3697, __c115, 17)),
        }).pipe(
          S.encodeKeys({
            ScanId: "scanId",
            ScanType: "scanType",
            ScanCategory: "scanCategory",
            TriggerFindingId: "triggerFindingId",
            EngineSources: "engineSources",
            ScanStartedAt: "scanStartedAt",
            ScanCompletedAt: "scanCompletedAt",
            FilesScanned: "filesScanned",
            GigabytesScanned: "gigabytesScanned",
            VolumesScanned: "volumesScanned",
            InfectedFileCount: "infectedFileCount",
            ResourceType: "resourceType",
            ResourceIdentifier: "resourceIdentifier",
            HighestSeverity: "highestSeverity",
            HighestSeverityThreatName: "highestSeverityThreatName",
            UniqueThreatCount: "uniqueThreatCount",
            TotalInfectedItems: "totalInfectedItems",
            Threats: "threats",
          }),
        ),
      ).annotate({ identifier: "InvestigationMalwareScan" });
    case 19:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), Identifier: S.optional(S.String) }).pipe(
          S.encodeKeys({ ResourceType: "resourceType", Identifier: "identifier" }),
        ),
      ).annotate({ identifier: "SharedResource" });
    case 20:
      return S.Array(__S(3699, __c115, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({ Path: S.optional(S.String), Value: S.optional(S.String) }).pipe(
          S.encodeKeys({ Path: "path", Value: "value" }),
        ),
      ).annotate({ identifier: "SharedBehavior" });
    case 22:
      return S.Array(__S(3701, __c115, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          FindingType: S.optional(S.String),
          Count: S.optional(S.Number),
          SeverityMax: S.optional(S.Number),
          CorrelationReasons: S.optional(__S(1952, __c61, 0)),
          FindingIds: S.optional(__S(3488, __c109, 0)),
          SharedResources: S.optional(__S(3700, __c115, 20)),
          SharedBehaviors: S.optional(__S(3702, __c115, 22)),
        }).pipe(
          S.encodeKeys({
            FindingType: "findingType",
            Count: "count",
            SeverityMax: "severityMax",
            CorrelationReasons: "correlationReasons",
            FindingIds: "findingIds",
            SharedResources: "sharedResources",
            SharedBehaviors: "sharedBehaviors",
          }),
        ),
      ).annotate({ identifier: "CorrelatedFinding" });
    case 24:
      return S.Array(__S(3703, __c115, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({
          FindingType: S.optional(S.String),
          Count: S.optional(S.Number),
          SeverityMax: S.optional(S.Number),
          SharedResources: S.optional(__S(3700, __c115, 20)),
        }).pipe(
          S.encodeKeys({
            FindingType: "findingType",
            Count: "count",
            SeverityMax: "severityMax",
            SharedResources: "sharedResources",
          }),
        ),
      ).annotate({ identifier: "ObservedFindingType" });
    case 26:
      return S.Array(__S(3705, __c115, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          Correlated: S.optional(__S(3704, __c115, 24)),
          Observed: S.optional(__S(3706, __c115, 26)),
        }).pipe(S.encodeKeys({ Correlated: "correlated", Observed: "observed" })),
      ).annotate({ identifier: "RelatedFindings" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          ProtectionPlans: S.optional(__S(65, __c2, 1)),
          FoundationalDataSources: S.optional(__S(1952, __c61, 0)),
          CoverageGaps: S.optional(S.String),
          KeyObservation: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ProtectionPlans: "protectionPlans",
            FoundationalDataSources: "foundationalDataSources",
            CoverageGaps: "coverageGaps",
            KeyObservation: "keyObservation",
          }),
        ),
      ).annotate({ identifier: "DetectionCoverage" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Rank: S.optional(S.Number),
          AccountId: S.optional(S.String),
          FindingCount: S.optional(S.Number),
          RiskLevel: S.optional(S.String),
          RiskRationale: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Rank: "rank",
            AccountId: "accountId",
            FindingCount: "findingCount",
            RiskLevel: "riskLevel",
            RiskRationale: "riskRationale",
          }),
        ),
      ).annotate({ identifier: "MemberAccountRanking" });
    case 30:
      return S.Array(__S(3709, __c115, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          AccountStatus: S.optional(S.String),
          DetectorId: S.optional(S.String),
          Region: S.optional(S.String),
          DelegatedAdminAccountId: S.optional(S.String),
          TotalMemberAccounts: S.optional(S.Number),
          TotalFindings: S.optional(S.Number),
          AffectedAccountCount: S.optional(S.Number),
          AccountRankings: S.optional(__S(3710, __c115, 30)),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            AccountStatus: "accountStatus",
            DetectorId: "detectorId",
            Region: "region",
            DelegatedAdminAccountId: "delegatedAdminAccountId",
            TotalMemberAccounts: "totalMemberAccounts",
            TotalFindings: "totalFindings",
            AffectedAccountCount: "affectedAccountCount",
            AccountRankings: "accountRankings",
          }),
        ),
      ).annotate({ identifier: "AccountOverview" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FindingType: S.optional(S.String),
          Severity: S.optional(S.Number),
          Count: S.optional(S.Number),
        }).pipe(S.encodeKeys({ FindingType: "findingType", Severity: "severity", Count: "count" })),
      ).annotate({ identifier: "SignalGroup" });
    case 1:
      return S.Array(__S(3712, __c116, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SignalGroups: S.optional(__S(3713, __c116, 1)),
          KeyObservation: S.optional(S.String),
        }).pipe(S.encodeKeys({ SignalGroups: "signalGroups", KeyObservation: "keyObservation" })),
      ).annotate({ identifier: "RuntimeSignals" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FindingType: S.optional(S.String),
          Count: S.optional(S.Number),
          Percentage: S.optional(S.Number),
          DominantSeverity: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FindingType: "findingType",
            Count: "count",
            Percentage: "percentage",
            DominantSeverity: "dominantSeverity",
          }),
        ),
      ).annotate({ identifier: "TypeDistribution" });
    case 4:
      return S.Array(__S(3715, __c116, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          Identifier: S.optional(S.String),
          Count: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ ResourceType: "resourceType", Identifier: "identifier", Count: "count" }),
        ),
      ).annotate({ identifier: "ResourceDistribution" });
    case 6:
      return S.Array(__S(3717, __c116, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          ArchivedCount: S.optional(S.Number),
          UnarchivedCount: S.optional(S.Number),
          ArchivedPercentage: S.optional(S.Number),
          UnarchivedPercentage: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ArchivedCount: "archivedCount",
            UnarchivedCount: "unarchivedCount",
            ArchivedPercentage: "archivedPercentage",
            UnarchivedPercentage: "unarchivedPercentage",
          }),
        ),
      ).annotate({ identifier: "ArchiveDistribution" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Dimension: S.optional(S.String),
          TotalFindings: S.optional(S.Number),
          SeverityBreakdown: S.optional(__S(2627, __c82, 3)),
          FindingTypes: S.optional(__S(3716, __c116, 4)),
          TopFindingTypes: S.optional(__S(2629, __c82, 5)),
          Resources: S.optional(__S(3718, __c116, 6)),
          AttackVectors: S.optional(__S(2635, __c82, 11)),
          Archive: S.optional(__S(3719, __c116, 7)),
        }).pipe(
          S.encodeKeys({
            Dimension: "dimension",
            TotalFindings: "totalFindings",
            SeverityBreakdown: "severityBreakdown",
            FindingTypes: "findingTypes",
            TopFindingTypes: "topFindingTypes",
            Resources: "resources",
            AttackVectors: "attackVectors",
            Archive: "archive",
          }),
        ),
      ).annotate({ identifier: "Distribution" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          Identifier: S.optional(S.String),
          FindingId: S.optional(S.String),
          FindingCount: S.optional(S.Number),
          RiskLevel: S.optional(S.String),
          RiskRationale: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ResourceType: "resourceType",
            Identifier: "identifier",
            FindingId: "findingId",
            FindingCount: "findingCount",
            RiskLevel: "riskLevel",
            RiskRationale: "riskRationale",
          }),
        ),
      ).annotate({ identifier: "RepresentativeFinding" });
    case 10:
      return S.Array(__S(3721, __c116, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          ObservationType: S.optional(S.String),
          FindingDetail: S.optional(__S(3673, __c114, 25)),
          Resource: S.optional(__S(3681, __c115, 1)),
          NetworkActivity: S.optional(__S(3688, __c115, 8)),
          RdsLoginActivity: S.optional(__S(3689, __c115, 9)),
          S3Activity: S.optional(__S(3691, __c115, 11)),
          KubernetesActivity: S.optional(__S(3695, __c115, 15)),
          MalwareScan: S.optional(__S(3698, __c115, 18)),
          RelatedFindings: S.optional(__S(3707, __c115, 27)),
          DetectionCoverage: S.optional(__S(3708, __c115, 28)),
          AccountOverview: S.optional(__S(3711, __c115, 31)),
          Recommendations: S.optional(__S(2637, __c82, 13)),
          RuntimeSignals: S.optional(__S(3714, __c116, 2)),
          Distribution: S.optional(__S(3720, __c116, 8)),
          RepresentativeResources: S.optional(__S(3722, __c116, 10)),
          Indicators: S.optional(__S(3670, __c114, 22)),
        }).pipe(
          S.encodeKeys({
            ObservationType: "observationType",
            FindingDetail: "findingDetail",
            Resource: "resource",
            NetworkActivity: "networkActivity",
            RdsLoginActivity: "rdsLoginActivity",
            S3Activity: "s3Activity",
            KubernetesActivity: "kubernetesActivity",
            MalwareScan: "malwareScan",
            RelatedFindings: "relatedFindings",
            DetectionCoverage: "detectionCoverage",
            AccountOverview: "accountOverview",
            Recommendations: "recommendations",
            RuntimeSignals: "runtimeSignals",
            Distribution: "distribution",
            RepresentativeResources: "representativeResources",
            Indicators: "indicators",
          }),
        ),
      ).annotate({ identifier: "ObservationRecord" });
    case 12:
      return S.suspend(() =>
        S.Struct({ TotalTimeMilliseconds: S.optional(S.Number) }).pipe(
          S.encodeKeys({ TotalTimeMilliseconds: "totalTimeMilliseconds" }),
        ),
      ).annotate({ identifier: "MetadataRecord" });
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Fetch: __S(3657, __c114, 9) }),
        /*@__PURE__*/ S.Struct({ Analysis: __S(3671, __c114, 23) }),
        /*@__PURE__*/ S.Struct({ Observation: __S(3723, __c116, 11) }),
        /*@__PURE__*/ S.Struct({ Metadata: __S(3724, __c116, 12) }),
      ]);
    case 14:
      return S.suspend(() =>
        S.Struct({
          RecordId: S.optional(S.String),
          Type: S.optional(S.String),
          Title: S.optional(S.String),
          Narrative: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SupportingData: S.optional(__S(3725, __c116, 13)),
        }).pipe(
          S.encodeKeys({
            RecordId: "recordId",
            Type: "type",
            Title: "title",
            Narrative: "narrative",
            CreatedAt: "createdAt",
            SupportingData: "supportingData",
          }),
        ),
      ).annotate({ identifier: "InvestigationRecord" });
    case 15:
      return S.Array(__S(3726, __c116, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          InvestigationId: S.optional(S.String),
          Status: S.optional(S.String),
          Records: S.optional(__S(3727, __c116, 15)),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            InvestigationId: "investigationId",
            Status: "status",
            Records: "records",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListInvestigationRecordsResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(2016, __c63, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ Criterion: S.optional(__S(3744, __c117, 0)) }).pipe(
          S.encodeKeys({ Criterion: "criterion" }),
        ),
      ).annotate({ identifier: "InvestigationFilterCriteria" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FilterCriteria: S.optional(__S(3745, __c117, 1)),
          SortCriteria: S.optional(__S(3360, __c105, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              FilterCriteria: "filterCriteria",
              SortCriteria: "sortCriteria",
              MaxResults: "maxResults",
              NextToken: "nextToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/investigation/list" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListInvestigationsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          InvestigationId: S.optional(S.String),
          Status: S.optional(S.String),
          TriggerPrompt: S.optional(S.String),
          RiskLevel: S.optional(S.String),
          Confidence: S.optional(S.String),
          Title: S.optional(S.String),
          InvestigationType: S.optional(S.String),
          FindingId: S.optional(S.String),
          AccountId: S.optional(S.String),
          AdminAccountId: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            InvestigationId: "investigationId",
            Status: "status",
            TriggerPrompt: "triggerPrompt",
            RiskLevel: "riskLevel",
            Confidence: "confidence",
            Title: "title",
            InvestigationType: "investigationType",
            FindingId: "findingId",
            AccountId: "accountId",
            AdminAccountId: "adminAccountId",
            StartTime: "startTime",
            EndTime: "endTime",
          }),
        ),
      ).annotate({ identifier: "InvestigationSummary" });
    case 4:
      return S.Array(__S(3747, __c117, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Investigations: S.optional(__S(3748, __c117, 4)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Investigations: "investigations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListInvestigationsResponse" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/invitation" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInvitationsRequest" });
    case 1:
      return S.Array(__S(1888, __c59, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Invitations: S.optional(__S(3777, __c118, 1)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Invitations: "invitations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListInvitationsResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/ipset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIPSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IpSetIds: S.optional(__S(3488, __c109, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ IpSetIds: "ipSetIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListIPSetsResponse" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/malware-protection-plan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMalwareProtectionPlansRequest" });
    case 1:
      return S.Array(__S(672, __c21, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MalwareProtectionPlans: S.optional(__S(3841, __c120, 1)),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MalwareProtectionPlans: "malwareProtectionPlans",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListMalwareProtectionPlansResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ListMalwareScansCriterionKey: S.optional(S.String),
          FilterCondition: S.optional(__S(1568, __c49, 0)),
        }).pipe(
          S.encodeKeys({
            ListMalwareScansCriterionKey: "criterionKey",
            FilterCondition: "filterCondition",
          }),
        ),
      ).annotate({ identifier: "ListMalwareScansFilterCriterion" });
    case 1:
      return S.Array(__S(3872, __c121, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ListMalwareScansFilterCriterion: S.optional(__S(3873, __c121, 1)) }).pipe(
          S.encodeKeys({ ListMalwareScansFilterCriterion: "filterCriterion" }),
        ),
      ).annotate({ identifier: "ListMalwareScansFilterCriteria" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          FilterCriteria: S.optional(__S(3874, __c121, 2)),
          SortCriteria: S.optional(__S(1504, __c47, 0)),
        })
          .pipe(S.encodeKeys({ FilterCriteria: "filterCriteria", SortCriteria: "sortCriteria" }))
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/malware-scan" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "ListMalwareScansRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ScanId: S.optional(S.String),
          ScanStatus: S.optional(S.String),
          ScanResultStatus: S.optional(S.String),
          ScanType: S.optional(S.String),
          ScanStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanCompletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            ResourceArn: "resourceArn",
            ResourceType: "resourceType",
            ScanId: "scanId",
            ScanStatus: "scanStatus",
            ScanResultStatus: "scanResultStatus",
            ScanType: "scanType",
            ScanStartedAt: "scanStartedAt",
            ScanCompletedAt: "scanCompletedAt",
          }),
        ),
      ).annotate({ identifier: "MalwareScan" });
    case 5:
      return S.Array(__S(3876, __c121, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Scans: S.optional(__S(3877, __c121, 5)), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Scans: "scans", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListMalwareScansResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          Mode: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3936, __c123, 0)),
        })
          .pipe(
            S.encodeKeys({
              RuleId: "ruleId",
              Mode: "mode",
              ClientToken: "clientToken",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/custom-detection-rule/association" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateCustomDetectionRuleAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RuleAssociation: S.optional(__S(3968, __c124, 0)) }).pipe(
          S.encodeKeys({ RuleAssociation: "ruleAssociation" }),
        ),
      ).annotate({ identifier: "CreateCustomDetectionRuleAssociationResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          Arn: S.optional(S.String),
          RuleId: S.optional(S.String),
          AccountId: S.optional(S.String),
          Mode: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            AssociationId: "associationId",
            Arn: "arn",
            RuleId: "ruleId",
            AccountId: "accountId",
            Mode: "mode",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
            ExpiresAt: "expiresAt",
          }),
        ),
      ).annotate({ identifier: "AssociationDetail" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          OnlyAssociated: S.optional(S.String).pipe(T.HttpQuery("onlyAssociated")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/member" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Members: S.optional(__S(3009, __c94, 1)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Members: "members", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListMembersResponse" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/admin" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOrganizationAdminAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AdminAccountId: S.optional(S.String), AdminStatus: S.optional(S.String) }).pipe(
          S.encodeKeys({ AdminAccountId: "adminAccountId", AdminStatus: "adminStatus" }),
        ),
      ).annotate({ identifier: "AdminAccount" });
    case 2:
      return S.Array(__S(4033, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdminAccounts: S.optional(__S(4034, __c126, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ AdminAccounts: "adminAccounts", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListOrganizationAdminAccountsResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/publishingDestination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPublishingDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DestinationId: S.optional(S.String),
          DestinationType: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DestinationId: "destinationId",
            DestinationType: "destinationType",
            Status: "status",
          }),
        ),
      ).annotate({ identifier: "Destination" });
    case 2:
      return S.Array(__S(4065, __c127, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__S(4066, __c127, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Destinations: "destinations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListPublishingDestinationsResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(3936, __c123, 0)) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/threatentityset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThreatEntitySetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ThreatEntitySetIds: S.optional(__S(3488, __c109, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ ThreatEntitySetIds: "threatEntitySetIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListThreatEntitySetsResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/threatintelset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThreatIntelSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ThreatIntelSetIds: S.optional(__S(3488, __c109, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ ThreatIntelSetIds: "threatIntelSetIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListThreatIntelSetsResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector/{DetectorId}/trustedentityset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrustedEntitySetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrustedEntitySetIds: S.optional(__S(3488, __c109, 0)),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ TrustedEntitySetIds: "trustedEntitySetIds", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListTrustedEntitySetsResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Key: S.optional(S.String),
          VersionId: S.optional(S.String),
        }).pipe(S.encodeKeys({ Bucket: "bucket", Key: "key", VersionId: "versionId" })),
      ).annotate({ identifier: "S3ObjectForSendObjectMalwareScan" });
    case 1:
      return S.suspend(() =>
        S.Struct({ S3Object: S.optional(__S(4224, __c132, 0)) })
          .pipe(S.encodeKeys({ S3Object: "s3Object" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/object-malware-scan/send" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "SendObjectMalwareScanRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Role: S.optional(S.String),
          IncrementalScanDetails: S.optional(__S(2433, __c76, 1)),
          RecoveryPoint: S.optional(__S(2816, __c88, 0)),
        }).pipe(
          S.encodeKeys({
            Role: "role",
            IncrementalScanDetails: "incrementalScanDetails",
            RecoveryPoint: "recoveryPoint",
          }),
        ),
      ).annotate({ identifier: "StartMalwareScanConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ScanConfiguration: S.optional(__S(4256, __c133, 0)),
        })
          .pipe(
            S.encodeKeys({
              ResourceArn: "resourceArn",
              ClientToken: "clientToken",
              ScanConfiguration: "scanConfiguration",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/malware-scan/start" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "StartMalwareScanRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ScanId: S.optional(S.String) }).pipe(S.encodeKeys({ ScanId: "scanId" })),
      ).annotate({ identifier: "StartMalwareScanResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/start" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "StartMonitoringMembersRequest" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          Mode: S.optional(S.String),
          IncludeAccountIds: S.optional(__S(3488, __c109, 0)),
          ExcludeAccountIds: S.optional(__S(3488, __c109, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              RuleId: "ruleId",
              Mode: "mode",
              IncludeAccountIds: "includeAccountIds",
              ExcludeAccountIds: "excludeAccountIds",
              ClientToken: "clientToken",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/custom-detection-rule/org-configuration" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateCustomDetectionRuleOrgConfigurationRequest" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/stop" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "StopMonitoringMembersRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String).pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(3936, __c123, 0),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(S.encodeKeys({ FindingIds: "findingIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings/unarchive" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UnarchiveFindingsRequest" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__S(3488, __c109, 0)).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String.pipe(T.HttpLabel("RuleId")),
          AssociationId: S.String.pipe(T.HttpLabel("AssociationId")),
          Mode: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ Mode: "mode" }))
          .pipe(
            T.all(
              T.Http({
                method: "PUT",
                uri: "/custom-detection-rule/rule/{RuleId}/association/{AssociationId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateCustomDetectionRuleAssociationRequest" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String.pipe(T.HttpLabel("RuleId")),
          Mode: S.optional(S.String),
          IncludeAccountIds: S.optional(__S(3488, __c109, 0)),
          ExcludeAccountIds: S.optional(__S(3488, __c109, 0)),
        })
          .pipe(
            S.encodeKeys({
              Mode: "mode",
              IncludeAccountIds: "includeAccountIds",
              ExcludeAccountIds: "excludeAccountIds",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/custom-detection-rule/org-configuration/{RuleId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateCustomDetectionRuleOrgConfigurationRequest" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          Enable: S.optional(S.Boolean),
          FindingPublishingFrequency: S.optional(S.String),
          DataSources: S.optional(__S(100, __c3, 4)),
          Features: S.optional(__S(102, __c3, 6)),
        })
          .pipe(
            S.encodeKeys({
              Enable: "enable",
              FindingPublishingFrequency: "findingPublishingFrequency",
              DataSources: "dataSources",
              Features: "features",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateDetectorRequest" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FilterName: S.String.pipe(T.HttpLabel("FilterName")),
          Description: S.optional(S.String),
          Action: S.optional(S.String),
          Rank: S.optional(S.Number),
          FindingCriteria: S.optional(__S(418, __c13, 2)),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              Action: "action",
              Rank: "rank",
              FindingCriteria: "findingCriteria",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/filter/{FilterName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateFilterRequest" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingIds: S.optional(__S(3488, __c109, 0)),
          Feedback: S.optional(S.String),
          Comments: S.optional(SensitiveString),
        })
          .pipe(
            S.encodeKeys({ FindingIds: "findingIds", Feedback: "feedback", Comments: "comments" }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings/feedback" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateFindingsFeedbackRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          IpSetId: S.optional(S.String).pipe(T.HttpLabel("IpSetId")),
          Name: S.optional(S.String),
          Location: S.optional(S.String),
          Activate: S.optional(S.Boolean),
          ExpectedBucketOwner: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              Location: "location",
              Activate: "activate",
              ExpectedBucketOwner: "expectedBucketOwner",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/detector/{DetectorId}/ipset/{IpSetId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateIPSetRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
