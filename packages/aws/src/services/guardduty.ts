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
  ).pipe(C.withServerError) {}
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
  AdministratorId?: string;
  InvitationId?: string;
}
export interface AcceptAdministratorInvitationResponse {}
export interface AcceptInvitationRequest {
  DetectorId: string;
  MasterId?: string;
  InvitationId?: string;
}
export interface AcceptInvitationResponse {}
export type FindingId = string;
export type FindingIds = string[];
export interface ArchiveFindingsRequest {
  DetectorId: string;
  FindingIds?: string[];
}
export interface ArchiveFindingsResponse {}
export type RuleId = string;
export type AssociationMode = "LIVE" | "DRY_RUN" | (string & {});
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateCustomDetectionRuleAssociationRequest {
  RuleId?: string;
  Mode?: AssociationMode;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type AssociationId = string;
export type DetectionRuleArn = string;
export type AccountId = string;
export interface AssociationDetail {
  AssociationId?: string;
  Arn?: string;
  RuleId?: string;
  AccountId?: string;
  Mode?: AssociationMode;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ExpiresAt?: Date;
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
  RuleId?: string;
  Mode?: AssociationMode;
  IncludeAccountIds?: string[];
  ExcludeAccountIds?: string[];
  ClientToken?: string;
}
export interface CreateCustomDetectionRuleOrgConfigurationResponse {}
export type FindingPublishingFrequency =
  | "FIFTEEN_MINUTES"
  | "ONE_HOUR"
  | "SIX_HOURS"
  | (string & {});
export interface S3LogsConfiguration {
  Enable?: boolean;
}
export interface KubernetesAuditLogsConfiguration {
  Enable?: boolean;
}
export interface KubernetesConfiguration {
  AuditLogs?: KubernetesAuditLogsConfiguration;
}
export interface ScanEc2InstanceWithFindings {
  EbsVolumes?: boolean;
}
export interface MalwareProtectionConfiguration {
  ScanEc2InstanceWithFindings?: ScanEc2InstanceWithFindings;
}
export interface DataSourceConfigurations {
  S3Logs?: S3LogsConfiguration;
  Kubernetes?: KubernetesConfiguration;
  MalwareProtection?: MalwareProtectionConfiguration;
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
  | (string & {});
export interface DetectorAdditionalConfiguration {
  Name?: FeatureAdditionalConfiguration;
  Status?: FeatureStatus;
}
export type DetectorAdditionalConfigurations = DetectorAdditionalConfiguration[];
export interface DetectorFeatureConfiguration {
  Name?: DetectorFeature;
  Status?: FeatureStatus;
  AdditionalConfiguration?: DetectorAdditionalConfiguration[];
}
export type DetectorFeatureConfigurations = DetectorFeatureConfiguration[];
export interface CreateDetectorRequest {
  Enable?: boolean;
  ClientToken?: string;
  FindingPublishingFrequency?: FindingPublishingFrequency;
  DataSources?: DataSourceConfigurations;
  Tags?: { [key: string]: string | undefined };
  Features?: DetectorFeatureConfiguration[];
}
export type DataSourceStatus = "ENABLED" | "DISABLED" | (string & {});
export interface EbsVolumesResult {
  Status?: DataSourceStatus;
  Reason?: string;
}
export interface ScanEc2InstanceWithFindingsResult {
  EbsVolumes?: EbsVolumesResult;
}
export interface MalwareProtectionConfigurationResult {
  ScanEc2InstanceWithFindings?: ScanEc2InstanceWithFindingsResult;
  ServiceRole?: string;
}
export interface UnprocessedDataSourcesResult {
  MalwareProtection?: MalwareProtectionConfigurationResult;
}
export interface CreateDetectorResponse {
  DetectorId?: string;
  UnprocessedDataSources?: UnprocessedDataSourcesResult;
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
  Eq?: string[];
  Neq?: string[];
  Gt?: number;
  Gte?: number;
  Lt?: number;
  Lte?: number;
  Equals?: string[];
  NotEquals?: string[];
  GreaterThan?: number;
  GreaterThanOrEqual?: number;
  LessThan?: number;
  LessThanOrEqual?: number;
  Matches?: string[];
  NotMatches?: string[];
}
export type Criterion = { [key: string]: Condition | undefined };
export interface FindingCriteria {
  Criterion?: { [key: string]: Condition | undefined };
}
export interface CreateFilterRequest {
  DetectorId: string;
  Name?: string;
  Description?: string;
  Action?: FilterAction;
  Rank?: number;
  FindingCriteria?: FindingCriteria;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateFilterResponse {
  Name: string;
}
export type TriggerPrompt = string;
export interface CreateInvestigationRequest {
  DetectorId: string;
  TriggerPrompt?: string;
  ClientToken?: string;
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
  Name?: string;
  Format?: IpSetFormat;
  Location?: string;
  Activate?: boolean;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  ExpectedBucketOwner?: string;
}
export interface CreateIPSetResponse {
  IpSetId: string;
}
export type MalwareProtectionPlanObjectPrefixesList = string[];
export interface CreateS3BucketResource {
  BucketName?: string;
  ObjectPrefixes?: string[];
}
export interface CreateProtectedResource {
  S3Bucket?: CreateS3BucketResource;
}
export type MalwareProtectionPlanTaggingActionStatus = "ENABLED" | "DISABLED" | (string & {});
export interface MalwareProtectionPlanTaggingAction {
  Status?: MalwareProtectionPlanTaggingActionStatus;
}
export interface MalwareProtectionPlanActions {
  Tagging?: MalwareProtectionPlanTaggingAction;
}
export interface CreateMalwareProtectionPlanRequest {
  ClientToken?: string;
  Role?: string;
  ProtectedResource?: CreateProtectedResource;
  Actions?: MalwareProtectionPlanActions;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateMalwareProtectionPlanResponse {
  MalwareProtectionPlanId?: string;
}
export type Email = string | redacted.Redacted<string>;
export interface AccountDetail {
  AccountId?: string;
  Email?: string | redacted.Redacted<string>;
}
export type AccountDetails = AccountDetail[];
export interface CreateMembersRequest {
  DetectorId: string;
  AccountDetails?: AccountDetail[];
}
export interface UnprocessedAccount {
  AccountId?: string;
  Result?: string;
}
export type UnprocessedAccounts = UnprocessedAccount[];
export interface CreateMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export type DestinationType = "S3" | (string & {});
export interface DestinationProperties {
  DestinationArn?: string;
  KmsKeyArn?: string;
}
export interface CreatePublishingDestinationRequest {
  DetectorId: string;
  DestinationType?: DestinationType;
  DestinationProperties?: DestinationProperties;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePublishingDestinationResponse {
  DestinationId: string;
}
export type FindingType = string;
export type FindingTypes = string[];
export interface CreateSampleFindingsRequest {
  DetectorId: string;
  FindingTypes?: string[];
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
  Name?: string;
  Format?: ThreatEntitySetFormat;
  Location?: string;
  ExpectedBucketOwner?: string;
  Activate?: boolean;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
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
  Name?: string;
  Format?: ThreatIntelSetFormat;
  Location?: string;
  Activate?: boolean;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  ExpectedBucketOwner?: string;
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
  Name?: string;
  Format?: TrustedEntitySetFormat;
  Location?: string;
  ExpectedBucketOwner?: string;
  Activate?: boolean;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateTrustedEntitySetResponse {
  TrustedEntitySetId: string;
}
export type AccountIds = string[];
export interface DeclineInvitationsRequest {
  AccountIds?: string[];
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
  Mode?: AssociationMode;
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
  AccountIds?: string[];
}
export interface DeleteInvitationsResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface DeleteIPSetRequest {
  DetectorId: string;
  IpSetId?: string;
}
export interface DeleteIPSetResponse {}
export interface DeleteMalwareProtectionPlanRequest {
  MalwareProtectionPlanId?: string;
}
export interface DeleteMalwareProtectionPlanResponse {}
export interface DeleteMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
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
  ThreatEntitySetId?: string;
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
  EqualsValue?: string;
  GreaterThan?: number;
  LessThan?: number;
}
export interface FilterCriterion {
  CriterionKey?: CriterionKey;
  FilterCondition?: FilterCondition;
}
export type FilterCriterionList = FilterCriterion[];
export interface FilterCriteria {
  FilterCriterion?: FilterCriterion[];
}
export type OrderBy = "ASC" | "DESC" | (string & {});
export interface SortCriteria {
  AttributeName?: string;
  OrderBy?: OrderBy;
}
export interface DescribeMalwareScansRequest {
  DetectorId: string;
  NextToken?: string;
  MaxResults?: number;
  FilterCriteria?: FilterCriteria;
  SortCriteria?: SortCriteria;
}
export type ScanStatus = "RUNNING" | "COMPLETED" | "FAILED" | "SKIPPED" | (string & {});
export type TriggerType = "BACKUP" | "GUARDDUTY" | (string & {});
export interface TriggerDetails {
  GuardDutyFindingId?: string;
  Description?: string;
  TriggerType?: TriggerType;
}
export type InstanceArn = string;
export interface ResourceDetails {
  InstanceArn?: string;
}
export type ScanResult = "CLEAN" | "INFECTED" | (string & {});
export interface ScanResultDetails {
  ScanResult?: ScanResult;
}
export type PositiveLong = number;
export interface VolumeDetail {
  VolumeArn?: string;
  VolumeType?: string;
  DeviceName?: string;
  VolumeSizeInGB?: number;
  EncryptionType?: string;
  SnapshotArn?: string;
  KmsKeyArn?: string;
}
export type VolumeDetails = VolumeDetail[];
export type ScanType = "GUARDDUTY_INITIATED" | "ON_DEMAND" | (string & {});
export interface Scan {
  DetectorId?: string;
  AdminDetectorId?: string;
  ScanId?: string;
  ScanStatus?: ScanStatus;
  FailureReason?: string;
  ScanStartTime?: Date;
  ScanEndTime?: Date;
  TriggerDetails?: TriggerDetails;
  ResourceDetails?: ResourceDetails;
  ScanResultDetails?: ScanResultDetails;
  AccountId?: string;
  TotalBytes?: number;
  FileCount?: number;
  AttachedVolumes?: VolumeDetail[];
  ScanType?: ScanType;
}
export type Scans = Scan[];
export interface DescribeMalwareScansResponse {
  Scans: Scan[];
  NextToken?: string;
}
export type MaxResults = number;
export interface DescribeOrganizationConfigurationRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface OrganizationS3LogsConfigurationResult {
  AutoEnable?: boolean;
}
export interface OrganizationKubernetesAuditLogsConfigurationResult {
  AutoEnable?: boolean;
}
export interface OrganizationKubernetesConfigurationResult {
  AuditLogs?: OrganizationKubernetesAuditLogsConfigurationResult;
}
export interface OrganizationEbsVolumesResult {
  AutoEnable?: boolean;
}
export interface OrganizationScanEc2InstanceWithFindingsResult {
  EbsVolumes?: OrganizationEbsVolumesResult;
}
export interface OrganizationMalwareProtectionConfigurationResult {
  ScanEc2InstanceWithFindings?: OrganizationScanEc2InstanceWithFindingsResult;
}
export interface OrganizationDataSourceConfigurationsResult {
  S3Logs?: OrganizationS3LogsConfigurationResult;
  Kubernetes?: OrganizationKubernetesConfigurationResult;
  MalwareProtection?: OrganizationMalwareProtectionConfigurationResult;
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
  | (string & {});
export interface OrganizationAdditionalConfigurationResult {
  Name?: OrgFeatureAdditionalConfiguration;
  AutoEnable?: OrgFeatureStatus;
}
export type OrganizationAdditionalConfigurationResults =
  OrganizationAdditionalConfigurationResult[];
export interface OrganizationFeatureConfigurationResult {
  Name?: OrgFeature;
  AutoEnable?: OrgFeatureStatus;
  AdditionalConfiguration?: OrganizationAdditionalConfigurationResult[];
}
export type OrganizationFeaturesConfigurationsResults = OrganizationFeatureConfigurationResult[];
export type AutoEnableMembers = "NEW" | "ALL" | "NONE" | (string & {});
export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean;
  MemberAccountLimitReached: boolean;
  DataSources?: OrganizationDataSourceConfigurationsResult & {
    S3Logs: OrganizationS3LogsConfigurationResult & { AutoEnable: boolean };
    Kubernetes: OrganizationKubernetesConfigurationResult & {
      AuditLogs: OrganizationKubernetesAuditLogsConfigurationResult & { AutoEnable: boolean };
    };
  };
  Features?: OrganizationFeatureConfigurationResult[];
  NextToken?: string;
  AutoEnableOrganizationMembers?: AutoEnableMembers;
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
  Tags?: { [key: string]: string | undefined };
}
export interface DisableOrganizationAdminAccountRequest {
  AdminAccountId?: string;
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
  AccountIds?: string[];
}
export interface DisassociateMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface EnableOrganizationAdminAccountRequest {
  AdminAccountId?: string;
}
export interface EnableOrganizationAdminAccountResponse {}
export interface GetAdministratorAccountRequest {
  DetectorId: string;
}
export interface Administrator {
  AccountId?: string;
  InvitationId?: string;
  RelationshipStatus?: string;
  InvitedAt?: string;
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
  Equals?: string[];
  NotEquals?: string[];
}
export interface CoverageFilterCriterion {
  CriterionKey?: CoverageFilterCriterionKey;
  FilterCondition?: CoverageFilterCondition;
}
export type CoverageFilterCriterionList = CoverageFilterCriterion[];
export interface CoverageFilterCriteria {
  FilterCriterion?: CoverageFilterCriterion[];
}
export type CoverageStatisticsType =
  | "COUNT_BY_RESOURCE_TYPE"
  | "COUNT_BY_COVERAGE_STATUS"
  | (string & {});
export type CoverageStatisticsTypeList = CoverageStatisticsType[];
export interface GetCoverageStatisticsRequest {
  DetectorId: string;
  FilterCriteria?: CoverageFilterCriteria;
  StatisticsType?: CoverageStatisticsType[];
}
export type ResourceType = "EKS" | "ECS" | "EC2" | (string & {});
export type CountByResourceType = { [key in ResourceType]?: number };
export type CoverageStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export type CountByCoverageStatus = { [key in CoverageStatus]?: number };
export interface CoverageStatistics {
  CountByResourceType?: { [key: string]: number | undefined };
  CountByCoverageStatus?: { [key: string]: number | undefined };
}
export interface GetCoverageStatisticsResponse {
  CoverageStatistics?: CoverageStatistics;
}
export interface GetCustomDetectionRuleRequest {
  RuleId: string;
}
export type RuleName = string;
export type DetectionRuleDescription = string;
export type DetectionRuleSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
export type DetectionRuleDataSource = "CloudTrailManagementEvent" | (string & {});
export type MitreTactic = string;
export type MitreTechnique = string;
export type DetectionRuleServiceName = string;
export type RuleExpression = string;
export interface RuleDefinition {
  Expression?: string;
}
export type RuleLanguage = "SQL" | (string & {});
export type RuleSchema = "CloudTrail" | (string & {});
export interface RuleDetail {
  RuleId?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  Severity?: DetectionRuleSeverity;
  DataSource?: DetectionRuleDataSource;
  Tactic?: string;
  Technique?: string;
  Service?: string;
  Definition?: RuleDefinition;
  Language?: RuleLanguage;
  Schema?: RuleSchema;
  CreatedAt?: Date;
  UpdatedAt?: Date;
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
  Tags?: { [key: string]: string | undefined };
}
export interface GetCustomDetectionRuleOrgConfigurationRequest {
  RuleId: string;
  Mode?: AssociationMode;
}
export type DetectionRuleConfigurationStatus = "ACTIVE" | "PROCESSING" | "FAILED" | (string & {});
export interface DetectionRuleOrgConfiguration {
  RuleId?: string;
  Mode?: AssociationMode;
  Status?: DetectionRuleConfigurationStatus;
  StatusReason?: string;
  IncludeAccountIds?: string[];
  ExcludeAccountIds?: string[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ExpiresAt?: Date;
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
  Status?: DataSourceStatus;
}
export interface DNSLogsConfigurationResult {
  Status?: DataSourceStatus;
}
export interface FlowLogsConfigurationResult {
  Status?: DataSourceStatus;
}
export interface S3LogsConfigurationResult {
  Status?: DataSourceStatus;
}
export interface KubernetesAuditLogsConfigurationResult {
  Status?: DataSourceStatus;
}
export interface KubernetesConfigurationResult {
  AuditLogs?: KubernetesAuditLogsConfigurationResult;
}
export interface DataSourceConfigurationsResult {
  CloudTrail?: CloudTrailConfigurationResult;
  DNSLogs?: DNSLogsConfigurationResult;
  FlowLogs?: FlowLogsConfigurationResult;
  S3Logs?: S3LogsConfigurationResult;
  Kubernetes?: KubernetesConfigurationResult;
  MalwareProtection?: MalwareProtectionConfigurationResult;
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
  Name?: FeatureAdditionalConfiguration;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
  ManagedBy?: ManagedBy;
}
export type DetectorAdditionalConfigurationResults = DetectorAdditionalConfigurationResult[];
export interface DetectorFeatureConfigurationResult {
  Name?: DetectorFeatureResult;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
  AdditionalConfiguration?: DetectorAdditionalConfigurationResult[];
  ManagedBy?: ManagedBy;
}
export type DetectorFeatureConfigurationsResults = DetectorFeatureConfigurationResult[];
export interface GetDetectorResponse {
  CreatedAt?: string;
  FindingPublishingFrequency?: FindingPublishingFrequency;
  ServiceRole: string;
  Status: DetectorStatus;
  UpdatedAt?: string;
  DataSources?: DataSourceConfigurationsResult & {
    CloudTrail: CloudTrailConfigurationResult & { Status: DataSourceStatus };
    DNSLogs: DNSLogsConfigurationResult & { Status: DataSourceStatus };
    FlowLogs: FlowLogsConfigurationResult & { Status: DataSourceStatus };
    S3Logs: S3LogsConfigurationResult & { Status: DataSourceStatus };
    Kubernetes: KubernetesConfigurationResult & {
      AuditLogs: KubernetesAuditLogsConfigurationResult & { Status: DataSourceStatus };
    };
  };
  Tags?: { [key: string]: string | undefined };
  Features?: DetectorFeatureConfigurationResult[];
}
export interface GetFilterRequest {
  DetectorId: string;
  FilterName: string;
}
export type FilterVersion = number;
export interface GetFilterResponse {
  Name: string;
  Description?: string;
  Action: FilterAction;
  Rank?: number;
  FindingCriteria: FindingCriteria;
  Tags?: { [key: string]: string | undefined };
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Version?: number;
}
export interface GetFindingsRequest {
  DetectorId: string;
  FindingIds?: string[];
  SortCriteria?: SortCriteria;
}
export interface AccessKeyDetails {
  AccessKeyId?: string;
  PrincipalId?: string;
  UserName?: string;
  UserType?: string;
}
export interface Owner {
  Id?: string;
}
export interface Tag {
  Key?: string;
  Value?: string;
}
export type Tags = Tag[];
export interface DefaultServerSideEncryption {
  EncryptionType?: string;
  KmsMasterKeyArn?: string;
}
export interface AccessControlList {
  AllowsPublicReadAccess?: boolean;
  AllowsPublicWriteAccess?: boolean;
}
export interface BucketPolicy {
  AllowsPublicReadAccess?: boolean;
  AllowsPublicWriteAccess?: boolean;
}
export interface BlockPublicAccess {
  IgnorePublicAcls?: boolean;
  RestrictPublicBuckets?: boolean;
  BlockPublicAcls?: boolean;
  BlockPublicPolicy?: boolean;
}
export interface BucketLevelPermissions {
  AccessControlList?: AccessControlList;
  BucketPolicy?: BucketPolicy;
  BlockPublicAccess?: BlockPublicAccess;
}
export interface AccountLevelPermissions {
  BlockPublicAccess?: BlockPublicAccess;
}
export interface PermissionConfiguration {
  BucketLevelPermissions?: BucketLevelPermissions;
  AccountLevelPermissions?: AccountLevelPermissions;
}
export interface PublicAccess {
  PermissionConfiguration?: PermissionConfiguration;
  EffectivePermission?: string;
}
export interface S3ObjectDetail {
  ObjectArn?: string;
  Key?: string;
  ETag?: string;
  Hash?: string;
  VersionId?: string;
}
export type S3ObjectDetails = S3ObjectDetail[];
export interface S3BucketDetail {
  Arn?: string;
  Name?: string;
  Type?: string;
  CreatedAt?: Date;
  Owner?: Owner;
  Tags?: Tag[];
  DefaultServerSideEncryption?: DefaultServerSideEncryption;
  PublicAccess?: PublicAccess;
  S3ObjectDetails?: S3ObjectDetail[];
}
export type S3BucketDetails = S3BucketDetail[];
export interface IamInstanceProfile {
  Arn?: string;
  Id?: string;
}
export type Ipv6Addresses = string[];
export type SensitiveString = string | redacted.Redacted<string>;
export interface PrivateIpAddressDetails {
  PrivateDnsName?: string;
  PrivateIpAddress?: string | redacted.Redacted<string>;
}
export type PrivateIpAddresses = PrivateIpAddressDetails[];
export interface SecurityGroup {
  GroupId?: string;
  GroupName?: string;
}
export type SecurityGroups = SecurityGroup[];
export interface NetworkInterface {
  Ipv6Addresses?: string[];
  NetworkInterfaceId?: string;
  PrivateDnsName?: string;
  PrivateIpAddress?: string | redacted.Redacted<string>;
  PrivateIpAddresses?: PrivateIpAddressDetails[];
  PublicDnsName?: string;
  PublicIp?: string;
  SecurityGroups?: SecurityGroup[];
  SubnetId?: string;
  VpcId?: string;
}
export type NetworkInterfaces = NetworkInterface[];
export interface ProductCode {
  Code?: string;
  ProductType?: string;
}
export type ProductCodes = ProductCode[];
export interface InstanceDetails {
  AvailabilityZone?: string;
  IamInstanceProfile?: IamInstanceProfile;
  ImageDescription?: string;
  ImageId?: string;
  InstanceId?: string;
  InstanceState?: string;
  InstanceType?: string;
  OutpostArn?: string;
  LaunchTime?: string;
  NetworkInterfaces?: NetworkInterface[];
  Platform?: string;
  ProductCodes?: ProductCode[];
  Tags?: Tag[];
}
export interface EksClusterDetails {
  Name?: string;
  Arn?: string;
  VpcId?: string;
  Status?: string;
  Tags?: Tag[];
  CreatedAt?: Date;
}
export type Groups = string[];
export type SessionNameList = string[];
export interface ImpersonatedUser {
  Username?: string;
  Groups?: string[];
}
export interface KubernetesUserDetails {
  Username?: string;
  Uid?: string;
  Groups?: string[];
  SessionName?: string[];
  ImpersonatedUser?: ImpersonatedUser;
}
export interface VolumeMount {
  Name?: string;
  MountPath?: string;
}
export type VolumeMounts = VolumeMount[];
export interface SecurityContext {
  Privileged?: boolean;
  AllowPrivilegeEscalation?: boolean;
}
export interface Container {
  ContainerRuntime?: string;
  Id?: string;
  Name?: string;
  Image?: string;
  ImagePrefix?: string;
  VolumeMounts?: VolumeMount[];
  SecurityContext?: SecurityContext;
}
export type Containers = Container[];
export interface HostPath {
  Path?: string;
}
export interface Volume {
  Name?: string;
  HostPath?: HostPath;
}
export type Volumes = Volume[];
export interface KubernetesWorkloadDetails {
  Name?: string;
  Type?: string;
  Uid?: string;
  Namespace?: string;
  HostNetwork?: boolean;
  ServiceAccountName?: string;
  Containers?: Container[];
  Volumes?: Volume[];
  HostIPC?: boolean;
  HostPID?: boolean;
}
export interface KubernetesDetails {
  KubernetesUserDetails?: KubernetesUserDetails;
  KubernetesWorkloadDetails?: KubernetesWorkloadDetails;
}
export interface EbsVolumeDetails {
  ScannedVolumeDetails?: VolumeDetail[];
  SkippedVolumeDetails?: VolumeDetail[];
}
export interface EcsTaskDetails {
  Arn?: string;
  DefinitionArn?: string;
  Version?: string;
  TaskCreatedAt?: Date;
  StartedAt?: Date;
  StartedBy?: string;
  Tags?: Tag[];
  Volumes?: Volume[];
  Containers?: Container[];
  Group?: string;
  LaunchType?: string;
}
export interface EcsClusterDetails {
  Name?: string;
  Arn?: string;
  Status?: string;
  ActiveServicesCount?: number;
  RegisteredContainerInstancesCount?: number;
  RunningTasksCount?: number;
  Tags?: Tag[];
  TaskDetails?: EcsTaskDetails;
}
export type SubnetIds = string[];
export interface VpcConfig {
  SubnetIds?: string[];
  VpcId?: string;
  SecurityGroups?: SecurityGroup[];
}
export interface LambdaDetails {
  FunctionArn?: string;
  FunctionName?: string;
  Description?: string;
  LastModifiedAt?: Date;
  RevisionId?: string;
  FunctionVersion?: string;
  Role?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export interface RdsDbInstanceDetails {
  DbInstanceIdentifier?: string;
  Engine?: string;
  EngineVersion?: string;
  DbClusterIdentifier?: string;
  DbInstanceArn?: string;
  DbiResourceId?: string;
  Tags?: Tag[];
}
export interface RdsLimitlessDbDetails {
  DbShardGroupIdentifier?: string;
  DbShardGroupResourceId?: string;
  DbShardGroupArn?: string;
  Engine?: string;
  EngineVersion?: string;
  DbClusterIdentifier?: string;
  Tags?: Tag[];
}
export interface RdsDbUserDetails {
  User?: string;
  Application?: string;
  Database?: string;
  Ssl?: string;
  AuthMethod?: string;
}
export interface EbsSnapshotDetails {
  SnapshotArn?: string;
}
export interface Ec2ImageDetails {
  ImageArn?: string;
}
export interface ScanConfigurationContinuousScanDetails {
  StartTime?: Date;
  EndTime: Date;
}
export interface RecoveryPointDetails {
  RecoveryPointArn?: string;
  BackupVaultName?: string;
  ContinuousScanDetails?: ScanConfigurationContinuousScanDetails;
}
export interface BedrockGuardrail {
  Arn?: string;
  Version?: string;
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
  Type?: ContentPolicyFilterType;
  Confidence?: ConfidenceLevel;
  Action?: ContentPolicyFilterAction;
}
export type ContentPolicyFilters = ContentPolicyFilter[];
export interface BedrockGuardrailDetails {
  GuardrailArn?: string;
  GuardrailVersion?: string;
  Guardrails?: BedrockGuardrail[];
  GuardrailAction?: GuardrailAction;
  GuardrailSource?: GuardrailSource;
  ContentPolicyFilters?: ContentPolicyFilter[];
}
export interface ModelDetail {
  ModelId?: string;
}
export type ModelDetails = ModelDetail[];
export interface Resource {
  AccessKeyDetails?: AccessKeyDetails;
  S3BucketDetails?: S3BucketDetail[];
  InstanceDetails?: InstanceDetails;
  EksClusterDetails?: EksClusterDetails;
  KubernetesDetails?: KubernetesDetails;
  ResourceType?: string;
  EbsVolumeDetails?: EbsVolumeDetails;
  EcsClusterDetails?: EcsClusterDetails;
  ContainerDetails?: Container;
  LambdaDetails?: LambdaDetails;
  RdsDbInstanceDetails?: RdsDbInstanceDetails;
  RdsLimitlessDbDetails?: RdsLimitlessDbDetails;
  RdsDbUserDetails?: RdsDbUserDetails;
  EbsSnapshotDetails?: EbsSnapshotDetails;
  Ec2ImageDetails?: Ec2ImageDetails;
  RecoveryPointDetails?: RecoveryPointDetails;
  BedrockGuardrailDetails?: BedrockGuardrailDetails;
  ModelDetails?: ModelDetail[];
}
export interface DomainDetails {
  Domain?: string;
}
export interface City {
  CityName?: string;
}
export interface Country {
  CountryCode?: string;
  CountryName?: string;
}
export interface GeoLocation {
  Lat?: number;
  Lon?: number;
}
export interface Organization {
  Asn?: string;
  AsnOrg?: string;
  Isp?: string;
  Org?: string;
}
export interface RemoteIpDetails {
  City?: City;
  Country?: Country;
  GeoLocation?: GeoLocation;
  IpAddressV4?: string | redacted.Redacted<string>;
  IpAddressV6?: string | redacted.Redacted<string>;
  Organization?: Organization;
}
export interface RemoteAccountDetails {
  AccountId?: string;
  Affiliated?: boolean;
  AwsServiceName?: string;
}
export type AffectedResources = { [key: string]: string | undefined };
export interface AwsApiCallAction {
  Api?: string;
  CallerType?: string;
  DomainDetails?: DomainDetails;
  ErrorCode?: string;
  UserAgent?: string;
  RemoteIpDetails?: RemoteIpDetails;
  ServiceName?: string;
  RemoteAccountDetails?: RemoteAccountDetails;
  AffectedResources?: { [key: string]: string | undefined };
}
export interface DnsRequestAction {
  Domain?: string;
  Protocol?: string;
  Blocked?: boolean;
  DomainWithSuffix?: string;
  VpcOwnerAccountId?: string;
}
export interface LocalPortDetails {
  Port?: number;
  PortName?: string;
}
export interface LocalIpDetails {
  IpAddressV4?: string | redacted.Redacted<string>;
  IpAddressV6?: string | redacted.Redacted<string>;
}
export interface RemotePortDetails {
  Port?: number;
  PortName?: string;
}
export interface NetworkConnectionAction {
  Blocked?: boolean;
  ConnectionDirection?: string;
  LocalPortDetails?: LocalPortDetails;
  Protocol?: string;
  LocalIpDetails?: LocalIpDetails;
  LocalNetworkInterface?: string;
  RemoteIpDetails?: RemoteIpDetails;
  RemotePortDetails?: RemotePortDetails;
}
export interface PortProbeDetail {
  LocalPortDetails?: LocalPortDetails;
  LocalIpDetails?: LocalIpDetails;
  RemoteIpDetails?: RemoteIpDetails;
}
export type PortProbeDetails = PortProbeDetail[];
export interface PortProbeAction {
  Blocked?: boolean;
  PortProbeDetails?: PortProbeDetail[];
}
export type SourceIps = string[];
export interface KubernetesApiCallAction {
  RequestUri?: string;
  Verb?: string;
  Resource?: string;
  Subresource?: string;
  Namespace?: string;
  ResourceName?: string;
  SourceIps?: string[];
  UserAgent?: string;
  RemoteIpDetails?: RemoteIpDetails;
  StatusCode?: number;
  Parameters?: string;
}
export interface KubernetesPermissionCheckedDetails {
  Verb?: string;
  Resource?: string;
  Namespace?: string;
  Allowed?: boolean;
}
export interface KubernetesRoleBindingDetails {
  Kind?: string;
  Name?: string;
  Uid?: string;
  RoleRefName?: string;
  RoleRefKind?: string;
}
export interface KubernetesRoleDetails {
  Kind?: string;
  Name?: string;
  Uid?: string;
}
export interface LoginAttribute {
  User?: string;
  Application?: string;
  FailedLoginAttempts?: number;
  SuccessfulLoginAttempts?: number;
}
export type LoginAttributes = LoginAttribute[];
export interface RdsLoginAttemptAction {
  RemoteIpDetails?: RemoteIpDetails;
  LoginAttributes?: LoginAttribute[];
}
export interface Action {
  ActionType?: string;
  AwsApiCallAction?: AwsApiCallAction;
  DnsRequestAction?: DnsRequestAction;
  NetworkConnectionAction?: NetworkConnectionAction;
  PortProbeAction?: PortProbeAction;
  KubernetesApiCallAction?: KubernetesApiCallAction;
  KubernetesPermissionCheckedDetails?: KubernetesPermissionCheckedDetails;
  KubernetesRoleBindingDetails?: KubernetesRoleBindingDetails;
  KubernetesRoleDetails?: KubernetesRoleDetails;
  RdsLoginAttemptAction?: RdsLoginAttemptAction;
}
export type ThreatNames = string[];
export interface ThreatIntelligenceDetail {
  ThreatListName?: string;
  ThreatNames?: string[];
  ThreatFileSha256?: string;
}
export type ThreatIntelligenceDetails = ThreatIntelligenceDetail[];
export interface Evidence {
  ThreatIntelligenceDetails?: ThreatIntelligenceDetail[];
}
export interface ServiceAdditionalInfo {
  Value?: string;
  Type?: string;
}
export type Sources = string[];
export interface ScannedItemCount {
  TotalGb?: number;
  Files?: number;
  Volumes?: number;
}
export interface ThreatsDetectedItemCount {
  Files?: number;
}
export interface HighestSeverityThreatDetails {
  Severity?: string;
  ThreatName?: string;
  Count?: number;
}
export interface ScanFilePath {
  FilePath?: string;
  VolumeArn?: string;
  Hash?: string;
  FileName?: string;
}
export type FilePaths = ScanFilePath[];
export interface ScanThreatName {
  Name?: string;
  Severity?: string;
  ItemCount?: number;
  FilePaths?: ScanFilePath[];
}
export type ScanThreatNames = ScanThreatName[];
export interface ThreatDetectedByName {
  ItemCount?: number;
  UniqueThreatNameCount?: number;
  Shortened?: boolean;
  ThreatNames?: ScanThreatName[];
}
export interface ScanDetections {
  ScannedItemCount?: ScannedItemCount;
  ThreatsDetectedItemCount?: ThreatsDetectedItemCount;
  HighestSeverityThreatDetails?: HighestSeverityThreatDetails;
  ThreatDetectedByName?: ThreatDetectedByName;
}
export interface EbsVolumeScanDetails {
  ScanId?: string;
  ScanStartedAt?: Date;
  ScanCompletedAt?: Date;
  TriggerFindingId?: string;
  Sources?: string[];
  ScanDetections?: ScanDetections;
  ScanType?: ScanType;
}
export interface LineageObject {
  StartTime?: Date;
  NamespacePid?: number;
  UserId?: number;
  Name?: string;
  Pid?: number;
  Uuid?: string;
  ExecutablePath?: string;
  Euid?: number;
  ParentUuid?: string;
}
export type Lineage = LineageObject[];
export interface ProcessDetails {
  Name?: string;
  ExecutablePath?: string;
  ExecutableSha256?: string;
  NamespacePid?: number;
  Pwd?: string;
  Pid?: number;
  StartTime?: Date;
  Uuid?: string;
  ParentUuid?: string;
  User?: string;
  UserId?: number;
  Euid?: number;
  Lineage?: LineageObject[];
}
export type FlagsList = string[];
export type MemoryRegionsList = string[];
export type RelatedFilePathsList = string[];
export interface RuntimeContext {
  ModifyingProcess?: ProcessDetails;
  ModifiedAt?: Date;
  ScriptPath?: string;
  LibraryPath?: string;
  LdPreloadValue?: string;
  SocketPath?: string;
  RuncBinaryPath?: string;
  ReleaseAgentPath?: string;
  MountSource?: string;
  MountTarget?: string;
  FileSystemType?: string;
  Flags?: string[];
  ModuleName?: string;
  ModuleFilePath?: string;
  ModuleSha256?: string;
  ShellHistoryFilePath?: string;
  TargetProcess?: ProcessDetails;
  AddressFamily?: string;
  IanaProtocolNumber?: number;
  MemoryRegions?: string[];
  ToolName?: string;
  ToolCategory?: string;
  ServiceName?: string;
  CommandLineExample?: string;
  ThreatFilePath?: string;
  FileOperation?: string;
  FilePath?: string;
  RelatedFilePaths?: string[];
}
export interface RuntimeDetails {
  Process?: ProcessDetails;
  Context?: RuntimeContext;
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
  Text?: string[];
  Number?: number[];
}
export interface AnomalyObject {
  ProfileType?: ProfileType;
  ProfileSubtype?: ProfileSubtype;
  Observations?: Observations;
}
export type AnomalyProfileFeatureObjects = AnomalyObject[];
export type AnomalyProfileFeatures = { [key: string]: AnomalyObject[] | undefined };
export type AnomalyProfiles = {
  [key: string]: { [key: string]: AnomalyObject[] | undefined } | undefined;
};
export type AnomalyUnusualBehaviorFeature = { [key: string]: AnomalyObject | undefined };
export type Behavior = { [key: string]: { [key: string]: AnomalyObject | undefined } | undefined };
export interface AnomalyUnusual {
  Behavior?: { [key: string]: { [key: string]: AnomalyObject | undefined } | undefined };
}
export interface Anomaly {
  Profiles?: { [key: string]: { [key: string]: AnomalyObject[] | undefined } | undefined };
  Unusual?: AnomalyUnusual;
}
export type SequenceDescription = string;
export interface Account {
  Uid?: string;
  Name?: string;
}
export interface User {
  Name?: string;
  Uid?: string;
  Type?: string;
  CredentialUid?: string;
  Account?: Account;
}
export type MfaStatus = "ENABLED" | "DISABLED" | (string & {});
export interface Session {
  Uid?: string;
  MfaStatus?: MfaStatus;
  CreatedTime?: Date;
  Issuer?: string;
}
export type ProcessName = string;
export type ProcessPath = string;
export type ProcessSha256 = string;
export interface ActorProcess {
  Name?: string;
  Path?: string;
  Sha256?: string;
}
export interface Actor {
  Id?: string;
  User?: User;
  Session?: Session;
  Process?: ActorProcess;
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
  PublicAclAccess?: PublicAccessStatus;
  PublicPolicyAccess?: PublicAccessStatus;
  PublicAclIgnoreBehavior?: PublicAclIgnoreBehavior;
  PublicBucketRestrictBehavior?: PublicBucketRestrictBehavior;
}
export type S3ObjectUids = string[];
export interface S3Bucket {
  OwnerId?: string;
  CreatedAt?: Date;
  EncryptionType?: string;
  EncryptionKeyArn?: string;
  EffectivePermission?: string;
  PublicReadAccess?: PublicAccessStatus;
  PublicWriteAccess?: PublicAccessStatus;
  AccountPublicAccess?: PublicAccessConfiguration;
  BucketPublicAccess?: PublicAccessConfiguration;
  S3ObjectUids?: string[];
}
export type Ec2NetworkInterfaceUids = string[];
export interface Ec2Instance {
  AvailabilityZone?: string;
  ImageDescription?: string;
  InstanceState?: string;
  IamInstanceProfile?: IamInstanceProfile;
  InstanceType?: string;
  OutpostArn?: string;
  Platform?: string;
  ProductCodes?: ProductCode[];
  Ec2NetworkInterfaceUids?: string[];
}
export interface AccessKey {
  PrincipalId?: string;
  UserName?: string;
  UserType?: string;
}
export interface Ec2NetworkInterface {
  Ipv6Addresses?: string[];
  PrivateIpAddresses?: PrivateIpAddressDetails[];
  PublicIp?: string;
  SecurityGroups?: SecurityGroup[];
  SubNetId?: string;
  VpcId?: string;
}
export interface S3Object {
  ETag?: string;
  Key?: string;
  VersionId?: string;
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
  Arn?: string;
  CreatedAt?: Date;
  Status?: ClusterStatus;
  VpcId?: string;
  Ec2InstanceUids?: string[];
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
  ContainerUids?: string[];
  Namespace?: string;
  KubernetesResourcesTypes?: KubernetesResourcesTypes;
}
export type ContainerImageUid = string;
export interface ContainerFindingResource {
  Image?: string;
  ImageUid?: string;
}
export type EcsClusterStatus =
  | "ACTIVE"
  | "PROVISIONING"
  | "DEPROVISIONING"
  | "FAILED"
  | "INACTIVE"
  | (string & {});
export interface EcsCluster {
  Status?: EcsClusterStatus;
  Ec2InstanceUids?: string[];
}
export type EcsLaunchType = "FARGATE" | "EC2" | (string & {});
export interface EcsTask {
  CreatedAt?: Date;
  TaskDefinitionArn?: string;
  LaunchType?: EcsLaunchType;
  ContainerUids?: string[];
}
export interface IamInstanceProfileV2 {
  Ec2InstanceUids?: string[];
}
export interface AutoscalingAutoScalingGroup {
  Ec2InstanceUids?: string[];
}
export type LaunchTemplateVersion = string;
export interface Ec2LaunchTemplate {
  Ec2InstanceUids?: string[];
  Version?: string;
}
export interface Ec2Vpc {
  Ec2InstanceUids?: string[];
}
export interface Ec2Image {
  Ec2InstanceUids?: string[];
}
export interface CloudformationStack {
  Ec2InstanceUids?: string[];
}
export interface BedrockGuardrailResource {
  Version?: string;
  GuardrailAction?: GuardrailAction;
  GuardrailSource?: GuardrailSource;
}
export interface ResourceData {
  S3Bucket?: S3Bucket;
  Ec2Instance?: Ec2Instance;
  AccessKey?: AccessKey;
  Ec2NetworkInterface?: Ec2NetworkInterface;
  S3Object?: S3Object;
  EksCluster?: EksCluster;
  KubernetesWorkload?: KubernetesWorkload;
  Container?: ContainerFindingResource;
  EcsCluster?: EcsCluster;
  EcsTask?: EcsTask;
  IamInstanceProfile?: IamInstanceProfileV2;
  AutoscalingAutoScalingGroup?: AutoscalingAutoScalingGroup;
  Ec2LaunchTemplate?: Ec2LaunchTemplate;
  Ec2Vpc?: Ec2Vpc;
  Ec2Image?: Ec2Image;
  CloudformationStack?: CloudformationStack;
  BedrockGuardrail?: BedrockGuardrailResource;
}
export interface ResourceV2 {
  Uid?: string;
  Name?: string;
  AccountId?: string;
  ResourceType?: FindingResourceType;
  Region?: string;
  Service?: string;
  CloudPartition?: string;
  Tags?: Tag[];
  Data?: ResourceData;
}
export type Resources = ResourceV2[];
export interface NetworkGeoLocation {
  City?: string;
  Country?: string;
  Latitude?: number;
  Longitude?: number;
}
export interface AutonomousSystem {
  Name?: string;
  Number?: number;
}
export type NetworkDirection = "INBOUND" | "OUTBOUND" | (string & {});
export interface NetworkConnection {
  Direction?: NetworkDirection;
}
export interface NetworkEndpoint {
  Id?: string;
  Ip?: string;
  Domain?: string;
  Port?: number;
  Location?: NetworkGeoLocation;
  AutonomousSystem?: AutonomousSystem;
  Connection?: NetworkConnection;
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
  Key?: IndicatorType;
  Values?: string[];
  Title?: string;
}
export type Indicators = Indicator[];
export type ActivityType = "API_CALL" | (string & {});
export interface ApiCall {
  Operation?: string;
  Service?: string;
  Error?: string;
  UserAgent?: string;
}
export interface Activity {
  Type?: ActivityType;
  Api?: ApiCall;
}
export type Activities = Activity[];
export interface Signal {
  Uid?: string;
  Type?: SignalType;
  Description?: string;
  Name?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  FirstSeenAt?: Date;
  LastSeenAt?: Date;
  Severity?: number;
  Count?: number;
  ResourceUids?: string[];
  ActorIds?: string[];
  EndpointIds?: string[];
  SignalIndicators?: Indicator[];
  Activities?: Activity[];
}
export type Signals = Signal[];
export type AdditionalSequenceTypes = string[];
export interface Sequence {
  Uid?: string;
  Description?: string;
  Actors?: Actor[];
  Resources?: ResourceV2[];
  Endpoints?: NetworkEndpoint[];
  Signals?: Signal[];
  SequenceIndicators?: Indicator[];
  AdditionalSequenceTypes?: string[];
}
export interface Detection {
  Anomaly?: Anomaly;
  Sequence?: Sequence;
}
export interface ItemPath {
  NestedItemPath?: string;
  Hash?: string;
}
export type ItemPaths = ItemPath[];
export interface AdditionalInfo {
  VersionId?: string;
  DeviceName?: string;
}
export interface ItemDetails {
  ResourceArn?: string;
  ItemPath?: string;
  Hash?: string;
  AdditionalInfo?: AdditionalInfo;
}
export type ItemDetailsList = ItemDetails[];
export interface Threat {
  Name?: string;
  Source?: string;
  ItemPaths?: ItemPath[];
  Count?: number;
  Hash?: string;
  ItemDetails?: ItemDetails[];
}
export type Threats = Threat[];
export type MalwareProtectionScanType =
  | "BACKUP_INITIATED"
  | "ON_DEMAND"
  | "GUARDDUTY_INITIATED"
  | (string & {});
export type ScanCategory = "FULL_SCAN" | "INCREMENTAL_SCAN" | (string & {});
export interface IncrementalScanDetails {
  BaselineResourceArn?: string;
}
export interface MalwareProtectionFindingsScanConfiguration {
  TriggerType?: TriggerType;
  IncrementalScanDetails?: IncrementalScanDetails;
}
export interface MalwareScanDetails {
  Threats?: Threat[];
  ScanId?: string;
  ScanType?: MalwareProtectionScanType;
  ScanCategory?: ScanCategory;
  ScanConfiguration?: MalwareProtectionFindingsScanConfiguration;
  UniqueThreatCount?: number;
}
export interface Service {
  Action?: Action;
  Evidence?: Evidence;
  Archived?: boolean;
  Count?: number;
  DetectorId?: string;
  EventFirstSeen?: string;
  EventLastSeen?: string;
  ResourceRole?: string;
  ServiceName?: string;
  UserFeedback?: string;
  AdditionalInfo?: ServiceAdditionalInfo;
  FeatureName?: string;
  EbsVolumeScanDetails?: EbsVolumeScanDetails;
  RuntimeDetails?: RuntimeDetails;
  Detection?: Detection;
  MalwareScanDetails?: MalwareScanDetails;
}
export interface Finding {
  AccountId?: string;
  Arn?: string;
  Confidence?: number;
  CreatedAt?: string;
  Description?: string;
  Id?: string;
  Partition?: string;
  Region?: string;
  Resource?: Resource;
  SchemaVersion?: string;
  Service?: Service;
  Severity?: number;
  Title?: string;
  Type?: string;
  UpdatedAt?: string;
  AssociatedAttackSequenceArn?: string;
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
  FindingStatisticTypes?: FindingStatisticType[];
  FindingCriteria?: FindingCriteria;
  GroupBy?: GroupByType;
  OrderBy?: OrderBy;
  MaxResults?: number;
}
export type CountBySeverity = { [key: string]: number | undefined };
export interface AccountStatistics {
  AccountId?: string;
  LastGeneratedAt?: Date;
  TotalFindings?: number;
}
export type GroupedByAccount = AccountStatistics[];
export interface DateStatistics {
  Date?: Date;
  LastGeneratedAt?: Date;
  Severity?: number;
  TotalFindings?: number;
}
export type GroupedByDate = DateStatistics[];
export interface FindingTypeStatistics {
  FindingType?: string;
  LastGeneratedAt?: Date;
  TotalFindings?: number;
}
export type GroupedByFindingType = FindingTypeStatistics[];
export interface ResourceStatistics {
  AccountId?: string;
  LastGeneratedAt?: Date;
  ResourceId?: string;
  ResourceType?: string;
  TotalFindings?: number;
}
export type GroupedByResource = ResourceStatistics[];
export interface SeverityStatistics {
  LastGeneratedAt?: Date;
  Severity?: number;
  TotalFindings?: number;
}
export type GroupedBySeverity = SeverityStatistics[];
export interface FindingStatistics {
  CountBySeverity?: { [key: string]: number | undefined };
  GroupedByAccount?: AccountStatistics[];
  GroupedByDate?: DateStatistics[];
  GroupedByFindingType?: FindingTypeStatistics[];
  GroupedByResource?: ResourceStatistics[];
  GroupedBySeverity?: SeverityStatistics[];
}
export interface GetFindingsStatisticsResponse {
  FindingStatistics: FindingStatistics;
  NextToken?: string;
}
export interface GetInvestigationRequest {
  DetectorId: string;
  InvestigationId: string;
}
export type InvestigationStatus = "RUNNING" | "COMPLETED" | "FAILED" | (string & {});
export type TriggeredBy = string;
export interface Product {
  Name?: string;
  Feature?: string;
}
export interface InvestigationMetadata {
  Version?: string;
  Product?: Product;
}
export type CloudProvider = "AWS" | (string & {});
export interface CloudDetails {
  Provider?: CloudProvider;
  Region?: string;
  Account?: string;
}
export type RiskLevel = "Info" | "Low" | "Medium" | "High" | "Critical" | (string & {});
export type RiskDetails = string;
export type Confidence = "Unknown" | "Low" | "Medium" | "High" | (string & {});
export type InvestigationErrorDetails = string;
export interface Investigation {
  InvestigationId?: string;
  Status?: InvestigationStatus;
  TriggerPrompt?: string;
  TriggeredBy?: string;
  Metadata?: InvestigationMetadata;
  Cloud?: CloudDetails;
  RiskLevel?: RiskLevel;
  Risk?: string;
  Confidence?: Confidence;
  Summary?: string;
  StartTime?: Date;
  EndTime?: Date;
  Error?: string;
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
  InvitationsCount?: number;
}
export interface GetIPSetRequest {
  DetectorId: string;
  IpSetId?: string;
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
  Tags?: { [key: string]: string | undefined };
  ExpectedBucketOwner?: string;
}
export interface GetMalwareProtectionPlanRequest {
  MalwareProtectionPlanId?: string;
}
export type MalwareProtectionPlanStatus = "ACTIVE" | "WARNING" | "ERROR" | (string & {});
export interface MalwareProtectionPlanStatusReason {
  Code?: string;
  Message?: string;
}
export type MalwareProtectionPlanStatusReasonsList = MalwareProtectionPlanStatusReason[];
export interface GetMalwareProtectionPlanResponse {
  Arn?: string;
  Role?: string;
  ProtectedResource?: CreateProtectedResource;
  Actions?: MalwareProtectionPlanActions;
  CreatedAt?: Date;
  Status?: MalwareProtectionPlanStatus;
  StatusReasons?: MalwareProtectionPlanStatusReason[];
  Tags?: { [key: string]: string | undefined };
}
export interface GetMalwareScanRequest {
  ScanId?: string;
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
  DeviceName?: string;
}
export interface ScannedResourceDetails {
  EbsVolume?: VolumeDetail;
  EbsSnapshot?: EbsSnapshot;
}
export interface ScannedResource {
  ScannedResourceArn?: string;
  ScannedResourceType?: MalwareProtectionResourceType;
  ScannedResourceStatus?: MalwareProtectionScanStatus;
  ScanStatusReason?: ScanStatusReason;
  ResourceDetails?: ScannedResourceDetails;
}
export type ScannedResources = ScannedResource[];
export interface ScanConfigurationRecoveryPoint {
  BackupVaultName?: string;
  ContinuousScanDetails?: ScanConfigurationContinuousScanDetails;
}
export interface ScanConfiguration {
  Role?: string;
  TriggerDetails?: TriggerDetails;
  IncrementalScanDetails?: IncrementalScanDetails;
  RecoveryPoint?: ScanConfigurationRecoveryPoint;
}
export type ScanResultStatus = "NO_THREATS_FOUND" | "THREATS_FOUND" | (string & {});
export type DetectionSource = "AMAZON" | "BITDEFENDER" | (string & {});
export interface ScanResultThreat {
  Name?: string;
  Source?: DetectionSource;
  Count?: number;
  Hash?: string;
  ItemDetails?: ItemDetails[];
}
export type ScanResultThreats = ScanResultThreat[];
export interface GetMalwareScanResultDetails {
  ScanResultStatus?: ScanResultStatus;
  SkippedFileCount?: number;
  FailedFileCount?: number;
  ThreatFoundFileCount?: number;
  TotalFileCount?: number;
  TotalBytes?: number;
  UniqueThreatCount?: number;
  Threats?: ScanResultThreat[];
}
export interface GetMalwareScanResponse {
  ScanId?: string;
  DetectorId?: string;
  AdminDetectorId?: string;
  ResourceArn?: string;
  ResourceType?: MalwareProtectionResourceType;
  ScannedResourcesCount?: number;
  SkippedResourcesCount?: number;
  FailedResourcesCount?: number;
  ScannedResources?: ScannedResource[];
  ScanConfiguration?: ScanConfiguration & {
    IncrementalScanDetails: IncrementalScanDetails & { BaselineResourceArn: NonEmptyString };
  };
  ScanCategory?: ScanCategory;
  ScanStatus?: MalwareProtectionScanStatus;
  ScanStatusReason?: ScanStatusReason;
  ScanType?: MalwareProtectionScanType;
  ScanStartedAt?: Date;
  ScanCompletedAt?: Date;
  ScanResultDetails?: GetMalwareScanResultDetails;
}
export interface GetMalwareScanSettingsRequest {
  DetectorId: string;
}
export type ScanCriterionKey = "EC2_INSTANCE_TAG" | (string & {});
export interface ScanConditionPair {
  Key?: string;
  Value?: string;
}
export type MapEquals = ScanConditionPair[];
export interface ScanCondition {
  MapEquals?: ScanConditionPair[];
}
export type ScanCriterion = { [key in ScanCriterionKey]?: ScanCondition };
export interface ScanResourceCriteria {
  Include?: { [key: string]: ScanCondition | undefined };
  Exclude?: { [key: string]: ScanCondition | undefined };
}
export type EbsSnapshotPreservation = "NO_RETENTION" | "RETENTION_WITH_FINDING" | (string & {});
export interface GetMalwareScanSettingsResponse {
  ScanResourceCriteria?: ScanResourceCriteria & {
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
  };
  EbsSnapshotPreservation?: EbsSnapshotPreservation;
}
export interface GetMasterAccountRequest {
  DetectorId: string;
}
export interface Master {
  AccountId?: string;
  InvitationId?: string;
  RelationshipStatus?: string;
  InvitedAt?: string;
}
export interface GetMasterAccountResponse {
  Master: Master;
}
export interface GetMemberDetectorsRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export interface MemberAdditionalConfigurationResult {
  Name?: OrgFeatureAdditionalConfiguration;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
  ManagedBy?: ManagedBy;
}
export type MemberAdditionalConfigurationResults = MemberAdditionalConfigurationResult[];
export interface MemberFeaturesConfigurationResult {
  Name?: OrgFeature;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
  AdditionalConfiguration?: MemberAdditionalConfigurationResult[];
  ManagedBy?: ManagedBy;
}
export type MemberFeaturesConfigurationsResults = MemberFeaturesConfigurationResult[];
export interface MemberDataSourceConfiguration {
  AccountId?: string;
  DataSources?: DataSourceConfigurationsResult;
  Features?: MemberFeaturesConfigurationResult[];
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
  AccountIds?: string[];
}
export interface Member {
  AccountId?: string;
  DetectorId?: string;
  MasterId?: string;
  Email?: string | redacted.Redacted<string>;
  RelationshipStatus?: string;
  InvitedAt?: string;
  UpdatedAt?: string;
  AdministratorId?: string;
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
  Name?: OrgFeatureAdditionalConfiguration;
  EnabledAccountsCount?: number;
}
export type OrganizationFeatureStatisticsAdditionalConfigurations =
  OrganizationFeatureStatisticsAdditionalConfiguration[];
export interface OrganizationFeatureStatistics {
  Name?: OrgFeature;
  EnabledAccountsCount?: number;
  AdditionalConfiguration?: OrganizationFeatureStatisticsAdditionalConfiguration[];
}
export type OrganizationFeatureStatisticsResults = OrganizationFeatureStatistics[];
export interface OrganizationStatistics {
  TotalAccountsCount?: number;
  MemberAccountsCount?: number;
  ActiveAccountsCount?: number;
  EnabledAccountsCount?: number;
  CountByFeature?: OrganizationFeatureStatistics[];
}
export interface OrganizationDetails {
  UpdatedAt?: Date;
  OrganizationStatistics?: OrganizationStatistics;
}
export interface GetOrganizationStatisticsResponse {
  OrganizationDetails?: OrganizationDetails;
}
export interface GetRemainingFreeTrialDaysRequest {
  DetectorId: string;
  AccountIds: string[];
}
export interface DataSourceFreeTrial {
  FreeTrialDaysRemaining?: number;
}
export interface KubernetesDataSourceFreeTrial {
  AuditLogs?: DataSourceFreeTrial;
}
export interface MalwareProtectionDataSourceFreeTrial {
  ScanEc2InstanceWithFindings?: DataSourceFreeTrial;
}
export interface DataSourcesFreeTrial {
  CloudTrail?: DataSourceFreeTrial;
  DnsLogs?: DataSourceFreeTrial;
  FlowLogs?: DataSourceFreeTrial;
  S3Logs?: DataSourceFreeTrial;
  Kubernetes?: KubernetesDataSourceFreeTrial;
  MalwareProtection?: MalwareProtectionDataSourceFreeTrial;
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
  Name?: FreeTrialFeatureResult;
  FreeTrialDaysRemaining?: number;
}
export type FreeTrialFeatureConfigurationsResults = FreeTrialFeatureConfigurationResult[];
export interface AccountFreeTrialInfo {
  AccountId?: string;
  DataSources?: DataSourcesFreeTrial;
  Features?: FreeTrialFeatureConfigurationResult[];
}
export type AccountFreeTrialInfos = AccountFreeTrialInfo[];
export interface GetRemainingFreeTrialDaysResponse {
  Accounts?: AccountFreeTrialInfo[];
  UnprocessedAccounts?: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface GetThreatEntitySetRequest {
  DetectorId: string;
  ThreatEntitySetId?: string;
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
  ExpectedBucketOwner?: string;
  Status: ThreatEntitySetStatus;
  Tags?: { [key: string]: string | undefined };
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ErrorDetails?: string;
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
  Tags?: { [key: string]: string | undefined };
  ExpectedBucketOwner?: string;
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
  ExpectedBucketOwner?: string;
  Status: TrustedEntitySetStatus;
  Tags?: { [key: string]: string | undefined };
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ErrorDetails?: string;
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
  | "AI_PROTECTION"
  | (string & {});
export type UsageFeatureList = UsageFeature[];
export interface UsageCriteria {
  AccountIds?: string[];
  DataSources?: DataSource[];
  Resources?: string[];
  Features?: UsageFeature[];
}
export interface GetUsageStatisticsRequest {
  DetectorId: string;
  UsageStatisticType?: UsageStatisticType;
  UsageCriteria?: UsageCriteria;
  Unit?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Total {
  Amount?: string;
  Unit?: string;
}
export interface UsageAccountResult {
  AccountId?: string;
  Total?: Total;
}
export type UsageAccountResultList = UsageAccountResult[];
export interface UsageTopAccountResult {
  AccountId?: string;
  Total?: Total;
}
export type UsageTopAccountsByFeatureList = UsageTopAccountResult[];
export interface UsageTopAccountsResult {
  Feature?: UsageFeature;
  Accounts?: UsageTopAccountResult[];
}
export type UsageTopAccountsResultList = UsageTopAccountsResult[];
export interface UsageDataSourceResult {
  DataSource?: DataSource;
  Total?: Total;
}
export type UsageDataSourceResultList = UsageDataSourceResult[];
export interface UsageResourceResult {
  Resource?: string;
  Total?: Total;
}
export type UsageResourceResultList = UsageResourceResult[];
export interface UsageFeatureResult {
  Feature?: UsageFeature;
  Total?: Total;
}
export type UsageFeatureResultList = UsageFeatureResult[];
export interface UsageStatistics {
  SumByAccount?: UsageAccountResult[];
  TopAccountsByFeature?: UsageTopAccountsResult[];
  SumByDataSource?: UsageDataSourceResult[];
  SumByResource?: UsageResourceResult[];
  TopResources?: UsageResourceResult[];
  SumByFeature?: UsageFeatureResult[];
}
export interface GetUsageStatisticsResponse {
  UsageStatistics?: UsageStatistics;
  NextToken?: string;
}
export interface InviteMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
  DisableEmailNotification?: boolean;
  Message?: string;
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
  AttributeName?: CoverageSortKey;
  OrderBy?: OrderBy;
}
export interface ListCoverageRequest {
  DetectorId: string;
  NextToken?: string;
  MaxResults?: number;
  FilterCriteria?: CoverageFilterCriteria;
  SortCriteria?: CoverageSortCriteria;
}
export interface AddonDetails {
  AddonVersion?: string;
  AddonStatus?: string;
}
export type ManagementType = "AUTO_MANAGED" | "MANUAL" | "DISABLED" | (string & {});
export interface CoverageEksClusterDetails {
  ClusterName?: string;
  CoveredNodes?: number;
  CompatibleNodes?: number;
  AddonDetails?: AddonDetails;
  ManagementType?: ManagementType;
}
export type Issues = string[];
export interface FargateDetails {
  Issues?: string[];
  ManagementType?: ManagementType;
}
export interface ContainerInstanceDetails {
  CoveredContainerInstances?: number;
  CompatibleContainerInstances?: number;
}
export interface CoverageEcsClusterDetails {
  ClusterName?: string;
  FargateDetails?: FargateDetails;
  ContainerInstanceDetails?: ContainerInstanceDetails;
}
export interface AgentDetails {
  Version?: string;
}
export interface CoverageEc2InstanceDetails {
  InstanceId?: string;
  InstanceType?: string;
  ClusterArn?: string;
  AgentDetails?: AgentDetails;
  ManagementType?: ManagementType;
}
export interface CoverageResourceDetails {
  EksClusterDetails?: CoverageEksClusterDetails;
  EcsClusterDetails?: CoverageEcsClusterDetails;
  Ec2InstanceDetails?: CoverageEc2InstanceDetails;
  ResourceType?: ResourceType;
}
export interface CoverageResource {
  ResourceId?: string;
  DetectorId?: string;
  AccountId?: string;
  ResourceDetails?: CoverageResourceDetails;
  CoverageStatus?: CoverageStatus;
  Issue?: string;
  UpdatedAt?: Date;
}
export type CoverageResources = CoverageResource[];
export interface ListCoverageResponse {
  Resources: CoverageResource[];
  NextToken?: string;
}
export type DetectionRuleMaxResults = number;
export interface ListCustomDetectionRuleAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
  RuleId?: string;
  Mode?: AssociationMode;
}
export interface AssociationSummary {
  AssociationId?: string;
  Arn?: string;
  RuleId?: string;
  Mode?: AssociationMode;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ExpiresAt?: Date;
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
  NextToken?: string;
}
export interface ListCustomDetectionRuleOrgConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  Status?: DetectionRuleConfigurationStatus;
}
export interface DetectionRuleOrgConfigurationSummary {
  RuleId?: string;
  Mode?: AssociationMode;
  Status?: DetectionRuleConfigurationStatus;
  StatusReason?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ExpiresAt?: Date;
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
  NextToken?: string;
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
  Name?: FilterFieldName;
  Values?: string[];
  Condition?: DetectionRuleFilterCondition;
}
export type DetectionRuleFilterList = DetectionRuleFilter[];
export interface ListCustomDetectionRulesRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: DetectionRuleFilter[];
}
export interface RuleSummary {
  RuleId?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  Severity?: DetectionRuleSeverity;
  DataSource?: DetectionRuleDataSource;
  Tactic?: string;
  Technique?: string;
  Service?: string;
  Language?: RuleLanguage;
  Schema?: RuleSchema;
  CreatedAt?: Date;
  UpdatedAt?: Date;
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
  NextToken?: string;
}
export interface ListDetectorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type DetectorIds = string[];
export interface ListDetectorsResponse {
  DetectorIds: string[];
  NextToken?: string;
}
export interface ListFiltersRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type FilterNames = string[];
export interface ListFiltersResponse {
  FilterNames: string[];
  NextToken?: string;
}
export interface ListFindingsRequest {
  DetectorId: string;
  FindingCriteria?: FindingCriteria;
  SortCriteria?: SortCriteria;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListFindingsResponse {
  FindingIds: string[];
  NextToken?: string;
}
export type InvestigationSortField =
  | "START_TIME"
  | "END_TIME"
  | "STATUS"
  | "RISK_LEVEL"
  | "CONFIDENCE"
  | (string & {});
export interface InvestigationSortCriteria {
  AttributeName?: InvestigationSortField;
  OrderBy?: OrderBy;
}
export type NextToken = string;
export interface ListInvestigationsRequest {
  DetectorId: string;
  SortCriteria?: InvestigationSortCriteria;
  MaxResults?: number;
  NextToken?: string;
}
export type InvestigationTitle = string;
export interface InvestigationSummary {
  InvestigationId?: string;
  Status?: InvestigationStatus;
  TriggerPrompt?: string;
  RiskLevel?: RiskLevel;
  Confidence?: Confidence;
  Title?: string;
  AccountId?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export type InvestigationSummaries = InvestigationSummary[];
export interface ListInvestigationsResponse {
  Investigations: InvestigationSummary[];
  NextToken?: string;
}
export interface ListInvitationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Invitation {
  AccountId?: string;
  InvitationId?: string;
  RelationshipStatus?: string;
  InvitedAt?: string;
}
export type Invitations = Invitation[];
export interface ListInvitationsResponse {
  Invitations?: Invitation[];
  NextToken?: string;
}
export interface ListIPSetsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type IpSetIds = string[];
export interface ListIPSetsResponse {
  IpSetIds: string[];
  NextToken?: string;
}
export interface ListMalwareProtectionPlansRequest {
  NextToken?: string;
}
export interface MalwareProtectionPlanSummary {
  MalwareProtectionPlanId?: string;
}
export type MalwareProtectionPlansSummary = MalwareProtectionPlanSummary[];
export interface ListMalwareProtectionPlansResponse {
  MalwareProtectionPlans?: MalwareProtectionPlanSummary[];
  NextToken?: string;
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
  ListMalwareScansCriterionKey?: ListMalwareScansCriterionKey;
  FilterCondition?: FilterCondition;
}
export type ListMalwareScansFilterCriterionList = ListMalwareScansFilterCriterion[];
export interface ListMalwareScansFilterCriteria {
  ListMalwareScansFilterCriterion?: ListMalwareScansFilterCriterion[];
}
export interface ListMalwareScansRequest {
  MaxResults?: number;
  NextToken?: string;
  FilterCriteria?: ListMalwareScansFilterCriteria;
  SortCriteria?: SortCriteria;
}
export interface MalwareScan {
  ResourceArn?: string;
  ResourceType?: MalwareProtectionResourceType;
  ScanId?: string;
  ScanStatus?: MalwareProtectionScanStatus;
  ScanResultStatus?: ScanResultStatus;
  ScanType?: MalwareProtectionScanType;
  ScanStartedAt?: Date;
  ScanCompletedAt?: Date;
}
export type MalwareScans = MalwareScan[];
export interface ListMalwareScansResponse {
  Scans: MalwareScan[];
  NextToken?: string;
}
export interface ListMembersRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
  OnlyAssociated?: string;
}
export interface ListMembersResponse {
  Members?: (Member & {
    AccountId: AccountId;
    MasterId: string;
    Email: Email;
    RelationshipStatus: string;
    UpdatedAt: string;
  })[];
  NextToken?: string;
}
export interface ListOrganizationAdminAccountsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type AdminStatus = "ENABLED" | "DISABLE_IN_PROGRESS" | (string & {});
export interface AdminAccount {
  AdminAccountId?: string;
  AdminStatus?: AdminStatus;
}
export type AdminAccounts = AdminAccount[];
export interface ListOrganizationAdminAccountsResponse {
  AdminAccounts?: AdminAccount[];
  NextToken?: string;
}
export interface ListPublishingDestinationsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Destination {
  DestinationId?: string;
  DestinationType?: DestinationType;
  Status?: PublishingStatus;
}
export type Destinations = Destination[];
export interface ListPublishingDestinationsResponse {
  Destinations: (Destination & {
    DestinationId: string;
    DestinationType: DestinationType;
    Status: PublishingStatus;
  })[];
  NextToken?: string;
}
export type GuardDutyArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListThreatEntitySetsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ThreatEntitySetIds = string[];
export interface ListThreatEntitySetsResponse {
  ThreatEntitySetIds: string[];
  NextToken?: string;
}
export interface ListThreatIntelSetsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ThreatIntelSetIds = string[];
export interface ListThreatIntelSetsResponse {
  ThreatIntelSetIds: string[];
  NextToken?: string;
}
export interface ListTrustedEntitySetsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type TrustedEntitySetIds = string[];
export interface ListTrustedEntitySetsResponse {
  TrustedEntitySetIds: string[];
  NextToken?: string;
}
export interface S3ObjectForSendObjectMalwareScan {
  Bucket?: string;
  Key?: string;
  VersionId?: string;
}
export interface SendObjectMalwareScanRequest {
  S3Object?: S3ObjectForSendObjectMalwareScan;
}
export interface SendObjectMalwareScanResponse {}
export type ResourceArn = string;
export interface ContinuousScanDetails {
  StartTime?: Date;
  EndTime: Date;
}
export interface RecoveryPoint {
  BackupVaultName?: string;
  ContinuousScanDetails?: ContinuousScanDetails;
}
export interface StartMalwareScanConfiguration {
  Role?: string;
  IncrementalScanDetails?: IncrementalScanDetails;
  RecoveryPoint?: RecoveryPoint;
}
export interface StartMalwareScanRequest {
  ResourceArn?: string;
  ClientToken?: string;
  ScanConfiguration?: StartMalwareScanConfiguration;
}
export interface StartMalwareScanResponse {
  ScanId?: string;
}
export interface StartMonitoringMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export interface StartMonitoringMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface StopMonitoringMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export interface StopMonitoringMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface TagResourceRequest {
  ResourceArn?: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UnarchiveFindingsRequest {
  DetectorId: string;
  FindingIds?: string[];
}
export interface UnarchiveFindingsResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCustomDetectionRuleAssociationRequest {
  RuleId: string;
  AssociationId: string;
  Mode?: AssociationMode;
}
export interface UpdateCustomDetectionRuleAssociationResponse {}
export interface UpdateCustomDetectionRuleOrgConfigurationRequest {
  RuleId: string;
  Mode?: AssociationMode;
  IncludeAccountIds?: string[];
  ExcludeAccountIds?: string[];
}
export interface UpdateCustomDetectionRuleOrgConfigurationResponse {}
export interface UpdateDetectorRequest {
  DetectorId: string;
  Enable?: boolean;
  FindingPublishingFrequency?: FindingPublishingFrequency;
  DataSources?: DataSourceConfigurations;
  Features?: DetectorFeatureConfiguration[];
}
export interface UpdateDetectorResponse {}
export interface UpdateFilterRequest {
  DetectorId: string;
  FilterName: string;
  Description?: string;
  Action?: FilterAction;
  Rank?: number;
  FindingCriteria?: FindingCriteria;
}
export interface UpdateFilterResponse {
  Name: string;
}
export type Feedback = "USEFUL" | "NOT_USEFUL" | (string & {});
export interface UpdateFindingsFeedbackRequest {
  DetectorId: string;
  FindingIds?: string[];
  Feedback?: Feedback;
  Comments?: string | redacted.Redacted<string>;
}
export interface UpdateFindingsFeedbackResponse {}
export interface UpdateIPSetRequest {
  DetectorId: string;
  IpSetId?: string;
  Name?: string;
  Location?: string;
  Activate?: boolean;
  ExpectedBucketOwner?: string;
}
export interface UpdateIPSetResponse {}
export interface UpdateS3BucketResource {
  ObjectPrefixes?: string[];
}
export interface UpdateProtectedResource {
  S3Bucket?: UpdateS3BucketResource;
}
export interface UpdateMalwareProtectionPlanRequest {
  MalwareProtectionPlanId: string;
  Role?: string;
  Actions?: MalwareProtectionPlanActions;
  ProtectedResource?: UpdateProtectedResource;
}
export interface UpdateMalwareProtectionPlanResponse {}
export interface UpdateMalwareScanSettingsRequest {
  DetectorId: string;
  ScanResourceCriteria?: ScanResourceCriteria;
  EbsSnapshotPreservation?: EbsSnapshotPreservation;
}
export interface UpdateMalwareScanSettingsResponse {}
export interface MemberAdditionalConfiguration {
  Name?: OrgFeatureAdditionalConfiguration;
  Status?: FeatureStatus;
}
export type MemberAdditionalConfigurations = MemberAdditionalConfiguration[];
export interface MemberFeaturesConfiguration {
  Name?: OrgFeature;
  Status?: FeatureStatus;
  AdditionalConfiguration?: MemberAdditionalConfiguration[];
}
export type MemberFeaturesConfigurations = MemberFeaturesConfiguration[];
export interface UpdateMemberDetectorsRequest {
  DetectorId: string;
  AccountIds?: string[];
  DataSources?: DataSourceConfigurations;
  Features?: MemberFeaturesConfiguration[];
}
export interface UpdateMemberDetectorsResponse {
  UnprocessedAccounts: (UnprocessedAccount & { AccountId: AccountId; Result: string })[];
}
export interface OrganizationS3LogsConfiguration {
  AutoEnable?: boolean;
}
export interface OrganizationKubernetesAuditLogsConfiguration {
  AutoEnable?: boolean;
}
export interface OrganizationKubernetesConfiguration {
  AuditLogs?: OrganizationKubernetesAuditLogsConfiguration;
}
export interface OrganizationEbsVolumes {
  AutoEnable?: boolean;
}
export interface OrganizationScanEc2InstanceWithFindings {
  EbsVolumes?: OrganizationEbsVolumes;
}
export interface OrganizationMalwareProtectionConfiguration {
  ScanEc2InstanceWithFindings?: OrganizationScanEc2InstanceWithFindings;
}
export interface OrganizationDataSourceConfigurations {
  S3Logs?: OrganizationS3LogsConfiguration;
  Kubernetes?: OrganizationKubernetesConfiguration;
  MalwareProtection?: OrganizationMalwareProtectionConfiguration;
}
export interface OrganizationAdditionalConfiguration {
  Name?: OrgFeatureAdditionalConfiguration;
  AutoEnable?: OrgFeatureStatus;
}
export type OrganizationAdditionalConfigurations = OrganizationAdditionalConfiguration[];
export interface OrganizationFeatureConfiguration {
  Name?: OrgFeature;
  AutoEnable?: OrgFeatureStatus;
  AdditionalConfiguration?: OrganizationAdditionalConfiguration[];
}
export type OrganizationFeaturesConfigurations = OrganizationFeatureConfiguration[];
export interface UpdateOrganizationConfigurationRequest {
  DetectorId: string;
  AutoEnable?: boolean;
  DataSources?: OrganizationDataSourceConfigurations;
  Features?: OrganizationFeatureConfiguration[];
  AutoEnableOrganizationMembers?: AutoEnableMembers;
}
export interface UpdateOrganizationConfigurationResponse {}
export interface UpdatePublishingDestinationRequest {
  DetectorId: string;
  DestinationId: string;
  DestinationProperties?: DestinationProperties;
}
export interface UpdatePublishingDestinationResponse {}
export interface UpdateThreatEntitySetRequest {
  DetectorId: string;
  ThreatEntitySetId?: string;
  Name?: string;
  Location?: string;
  ExpectedBucketOwner?: string;
  Activate?: boolean;
}
export interface UpdateThreatEntitySetResponse {}
export interface UpdateThreatIntelSetRequest {
  DetectorId: string;
  ThreatIntelSetId: string;
  Name?: string;
  Location?: string;
  Activate?: boolean;
  ExpectedBucketOwner?: string;
}
export interface UpdateThreatIntelSetResponse {}
export interface UpdateTrustedEntitySetRequest {
  DetectorId: string;
  TrustedEntitySetId: string;
  Name?: string;
  Location?: string;
  ExpectedBucketOwner?: string;
  Activate?: boolean;
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
  AcceptAdministratorInvitationRequest,
  AcceptAdministratorInvitationResponse,
  AcceptAdministratorInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<AcceptAdministratorInvitationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<AcceptAdministratorInvitationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAdministratorInvitation",
}));

export type AcceptInvitationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Accepts the invitation to be monitored by a GuardDuty administrator account.
 */
export const acceptInvitation: API.OperationMethod<
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  AcceptInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<AcceptInvitationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<AcceptInvitationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInvitation",
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
  ArchiveFindingsRequest,
  ArchiveFindingsResponse,
  ArchiveFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<ArchiveFindingsRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<ArchiveFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveFindings",
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
  CreateCustomDetectionRuleAssociationRequest,
  CreateCustomDetectionRuleAssociationResponse,
  CreateCustomDetectionRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3712, __c116, 0) as any as S.Schema<CreateCustomDetectionRuleAssociationRequest>,
  output: __S(3713, __c116, 1) as any as S.Schema<CreateCustomDetectionRuleAssociationResponse>,
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
  CreateCustomDetectionRuleOrgConfigurationRequest,
  CreateCustomDetectionRuleOrgConfigurationResponse,
  CreateCustomDetectionRuleOrgConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4128, __c129, 0) as any as S.Schema<CreateCustomDetectionRuleOrgConfigurationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<CreateCustomDetectionRuleOrgConfigurationResponse>,
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
  CreateDetectorRequest,
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
}));

export type CreateFilterError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Creates a filter using the specified finding criteria. The maximum number of saved filters per Amazon Web Services account per Region is 100. For more information, see Quotas for GuardDuty.
 */
export const createFilter: API.OperationMethod<
  CreateFilterRequest,
  CreateFilterResponse,
  CreateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<CreateFilterRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<CreateFilterResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFilter",
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
  CreateInvestigationRequest,
  CreateInvestigationResponse,
  CreateInvestigationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<CreateInvestigationRequest>,
  output: __S(417, __c13, 1) as any as S.Schema<CreateInvestigationResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvestigation",
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
  CreateIPSetRequest,
  CreateIPSetResponse,
  CreateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<CreateIPSetRequest>,
  output: __S(449, __c14, 1) as any as S.Schema<CreateIPSetResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIPSet",
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
  CreateMalwareProtectionPlanRequest,
  CreateMalwareProtectionPlanResponse,
  CreateMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<CreateMalwareProtectionPlanRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<CreateMalwareProtectionPlanResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMalwareProtectionPlan",
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
  CreateMembersRequest,
  CreateMembersResponse,
  CreateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(642, __c20, 2) as any as S.Schema<CreateMembersRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<CreateMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembers",
}));

export type CreatePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a publishing destination where you can export your GuardDuty findings. Before you start exporting the findings, the destination resource must exist.
 */
export const createPublishingDestination: API.OperationMethod<
  CreatePublishingDestinationRequest,
  CreatePublishingDestinationResponse,
  CreatePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<CreatePublishingDestinationRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<CreatePublishingDestinationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublishingDestination",
}));

export type CreateSampleFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Generates sample findings of types specified by the list of finding types. If 'NULL' is specified for `findingTypes`, the API generates sample findings of all supported finding types.
 */
export const createSampleFindings: API.OperationMethod<
  CreateSampleFindingsRequest,
  CreateSampleFindingsResponse,
  CreateSampleFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<CreateSampleFindingsRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<CreateSampleFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSampleFindings",
}));

export type CreateThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new threat entity set. In a threat entity set, you can provide known malicious threat entities for your Amazon Web Services environment. GuardDuty generates findings based on the entries in the threat entity sets. Only users of the administrator account can manage entity sets, which automatically apply to member accounts.
 */
export const createThreatEntitySet: API.OperationMethod<
  CreateThreatEntitySetRequest,
  CreateThreatEntitySetResponse,
  CreateThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<CreateThreatEntitySetRequest>,
  output: __S(833, __c26, 1) as any as S.Schema<CreateThreatEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatEntitySet",
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
  CreateThreatIntelSetRequest,
  CreateThreatIntelSetResponse,
  CreateThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<CreateThreatIntelSetRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<CreateThreatIntelSetResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatIntelSet",
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
  CreateTrustedEntitySetRequest,
  CreateTrustedEntitySetResponse,
  CreateTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<CreateTrustedEntitySetRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<CreateTrustedEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustedEntitySet",
}));

export type DeclineInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Declines invitations sent to the current member account by Amazon Web Services accounts specified by their account IDs.
 */
export const declineInvitations: API.OperationMethod<
  DeclineInvitationsRequest,
  DeclineInvitationsResponse,
  DeclineInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<DeclineInvitationsRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<DeclineInvitationsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineInvitations",
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
  DeleteCustomDetectionRuleAssociationRequest,
  DeleteCustomDetectionRuleAssociationResponse,
  DeleteCustomDetectionRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<DeleteCustomDetectionRuleAssociationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteCustomDetectionRuleAssociationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomDetectionRuleAssociation",
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
  DeleteCustomDetectionRuleOrgConfigurationRequest,
  DeleteCustomDetectionRuleOrgConfigurationResponse,
  DeleteCustomDetectionRuleOrgConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<DeleteCustomDetectionRuleOrgConfigurationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteCustomDetectionRuleOrgConfigurationResponse>,
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
}));

export type DeleteDetectorError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Deletes an Amazon GuardDuty detector that is specified by the detector ID.
 */
export const deleteDetector: API.OperationMethod<
  DeleteDetectorRequest,
  DeleteDetectorResponse,
  DeleteDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<DeleteDetectorRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteDetectorResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDetector",
}));

export type DeleteFilterError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Deletes the filter specified by the filter name.
 */
export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest,
  DeleteFilterResponse,
  DeleteFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<DeleteFilterRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteFilterResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFilter",
}));

export type DeleteInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes invitations sent to the current member account by Amazon Web Services accounts specified by their account IDs.
 */
export const deleteInvitations: API.OperationMethod<
  DeleteInvitationsRequest,
  DeleteInvitationsResponse,
  DeleteInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<DeleteInvitationsRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<DeleteInvitationsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvitations",
}));

export type DeleteIPSetError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Deletes the IPSet specified by the `ipSetId`. IPSets are called trusted IP lists in the console user interface.
 */
export const deleteIPSet: API.OperationMethod<
  DeleteIPSetRequest,
  DeleteIPSetResponse,
  DeleteIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<DeleteIPSetRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteIPSetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIPSet",
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
  DeleteMalwareProtectionPlanRequest,
  DeleteMalwareProtectionPlanResponse,
  DeleteMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<DeleteMalwareProtectionPlanRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteMalwareProtectionPlanResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMalwareProtectionPlan",
}));

export type DeleteMembersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Deletes GuardDuty member accounts (to the current GuardDuty administrator account) specified by the account IDs.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to disable GuardDuty for a member account in your organization.
 */
export const deleteMembers: API.OperationMethod<
  DeleteMembersRequest,
  DeleteMembersResponse,
  DeleteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<DeleteMembersRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<DeleteMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembers",
}));

export type DeletePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the publishing definition with the specified `destinationId`.
 */
export const deletePublishingDestination: API.OperationMethod<
  DeletePublishingDestinationRequest,
  DeletePublishingDestinationResponse,
  DeletePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<DeletePublishingDestinationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeletePublishingDestinationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublishingDestination",
}));

export type DeleteThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the threat entity set that is associated with the specified `threatEntitySetId`.
 */
export const deleteThreatEntitySet: API.OperationMethod<
  DeleteThreatEntitySetRequest,
  DeleteThreatEntitySetResponse,
  DeleteThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<DeleteThreatEntitySetRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteThreatEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThreatEntitySet",
}));

export type DeleteThreatIntelSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the ThreatIntelSet specified by the ThreatIntelSet ID.
 */
export const deleteThreatIntelSet: API.OperationMethod<
  DeleteThreatIntelSetRequest,
  DeleteThreatIntelSetResponse,
  DeleteThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<DeleteThreatIntelSetRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteThreatIntelSetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThreatIntelSet",
}));

export type DeleteTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the trusted entity set that is associated with the specified `trustedEntitySetId`.
 */
export const deleteTrustedEntitySet: API.OperationMethod<
  DeleteTrustedEntitySetRequest,
  DeleteTrustedEntitySetResponse,
  DeleteTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteTrustedEntitySetRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteTrustedEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustedEntitySet",
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
  DescribeMalwareScansRequest,
  DescribeMalwareScansResponse,
  DescribeMalwareScansError,
  Credentials | HttpClient.HttpClient,
  Scan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1347, __c42, 3) as any as S.Schema<DescribeMalwareScansRequest>,
  output: __S(1352, __c42, 8) as any as S.Schema<DescribeMalwareScansResponse>,
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
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<DescribeOrganizationConfigurationRequest>,
  output: __S(1537, __c48, 1) as any as S.Schema<DescribeOrganizationConfigurationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns information about the publishing destination specified by the provided `destinationId`.
 */
export const describePublishingDestination: API.OperationMethod<
  DescribePublishingDestinationRequest,
  DescribePublishingDestinationResponse,
  DescribePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<DescribePublishingDestinationRequest>,
  output: __S(1601, __c50, 1) as any as S.Schema<DescribePublishingDestinationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePublishingDestination",
}));

export type DisableOrganizationAdminAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Removes the existing GuardDuty delegated administrator of the organization. Only the organization's management account can run this API operation.
 */
export const disableOrganizationAdminAccount: API.OperationMethod<
  DisableOrganizationAdminAccountRequest,
  DisableOrganizationAdminAccountResponse,
  DisableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<DisableOrganizationAdminAccountRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DisableOrganizationAdminAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
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
  DisassociateFromAdministratorAccountRequest,
  DisassociateFromAdministratorAccountResponse,
  DisassociateFromAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<DisassociateFromAdministratorAccountRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DisassociateFromAdministratorAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromAdministratorAccount",
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
  DisassociateFromMasterAccountRequest,
  DisassociateFromMasterAccountResponse,
  DisassociateFromMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<DisassociateFromMasterAccountRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DisassociateFromMasterAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromMasterAccount",
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
  DisassociateMembersRequest,
  DisassociateMembersResponse,
  DisassociateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<DisassociateMembersRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<DisassociateMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMembers",
}));

export type EnableOrganizationAdminAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Designates an Amazon Web Services account within the organization as your GuardDuty delegated administrator. Only the organization's management account can run this API operation.
 */
export const enableOrganizationAdminAccount: API.OperationMethod<
  EnableOrganizationAdminAccountRequest,
  EnableOrganizationAdminAccountResponse,
  EnableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<EnableOrganizationAdminAccountRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<EnableOrganizationAdminAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
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
  GetAdministratorAccountRequest,
  GetAdministratorAccountResponse,
  GetAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<GetAdministratorAccountRequest>,
  output: __S(1793, __c56, 1) as any as S.Schema<GetAdministratorAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdministratorAccount",
}));

export type GetCoverageStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves aggregated statistics for your account. If you are a GuardDuty administrator, you can retrieve the statistics for all the resources associated with the active member accounts in your organization who have enabled Runtime Monitoring and have the GuardDuty security agent running on their resources.
 */
export const getCoverageStatistics: API.OperationMethod<
  GetCoverageStatisticsRequest,
  GetCoverageStatisticsResponse,
  GetCoverageStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<GetCoverageStatisticsRequest>,
  output: __S(1859, __c58, 3) as any as S.Schema<GetCoverageStatisticsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoverageStatistics",
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
  GetCustomDetectionRuleRequest,
  GetCustomDetectionRuleResponse,
  GetCustomDetectionRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<GetCustomDetectionRuleRequest>,
  output: __S(1955, __c61, 3) as any as S.Schema<GetCustomDetectionRuleResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomDetectionRule",
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
  GetCustomDetectionRuleAssociationRequest,
  GetCustomDetectionRuleAssociationResponse,
  GetCustomDetectionRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<GetCustomDetectionRuleAssociationRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<GetCustomDetectionRuleAssociationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomDetectionRuleAssociation",
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
  GetCustomDetectionRuleOrgConfigurationRequest,
  GetCustomDetectionRuleOrgConfigurationResponse,
  GetCustomDetectionRuleOrgConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<GetCustomDetectionRuleOrgConfigurationRequest>,
  output: __S(2018, __c63, 2) as any as S.Schema<GetCustomDetectionRuleOrgConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomDetectionRuleOrgConfiguration",
}));

export type GetDetectorError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Retrieves a GuardDuty detector specified by the detectorId.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getDetector: API.OperationMethod<
  GetDetectorRequest,
  GetDetectorResponse,
  GetDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<GetDetectorRequest>,
  output: __S(2049, __c64, 1) as any as S.Schema<GetDetectorResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDetector",
}));

export type GetFilterError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Returns the details of the filter specified by the filter name.
 */
export const getFilter: API.OperationMethod<
  GetFilterRequest,
  GetFilterResponse,
  GetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<GetFilterRequest>,
  output: __S(2113, __c66, 1) as any as S.Schema<GetFilterResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFilter",
}));

export type GetFindingsError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Describes Amazon GuardDuty findings specified by finding IDs.
 */
export const getFindings: API.OperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<GetFindingsRequest>,
  output: __S(2298, __c71, 26) as any as S.Schema<GetFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindings",
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
  GetFindingsStatisticsRequest,
  GetFindingsStatisticsResponse,
  GetFindingsStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<GetFindingsStatisticsRequest>,
  output: __S(2477, __c77, 13) as any as S.Schema<GetFindingsStatisticsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsStatistics",
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
 * An administrator account can retrieve any investigation within the organization. Member accounts can only retrieve investigations that belong to them.
 */
export const getInvestigation: API.OperationMethod<
  GetInvestigationRequest,
  GetInvestigationResponse,
  GetInvestigationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<GetInvestigationRequest>,
  output: __S(2501, __c78, 5) as any as S.Schema<GetInvestigationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvestigation",
}));

export type GetInvitationsCountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns the count of all GuardDuty membership invitations that were sent to the current member account except the currently accepted invitation.
 */
export const getInvitationsCount: API.OperationMethod<
  GetInvitationsCountRequest,
  GetInvitationsCountResponse,
  GetInvitationsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<GetInvitationsCountRequest>,
  output: __S(2529, __c79, 1) as any as S.Schema<GetInvitationsCountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvitationsCount",
}));

export type GetIPSetError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Retrieves the IPSet specified by the `ipSetId`.
 */
export const getIPSet: API.OperationMethod<
  GetIPSetRequest,
  GetIPSetResponse,
  GetIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<GetIPSetRequest>,
  output: __S(2592, __c81, 0) as any as S.Schema<GetIPSetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIPSet",
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
  GetMalwareProtectionPlanRequest,
  GetMalwareProtectionPlanResponse,
  GetMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<GetMalwareProtectionPlanRequest>,
  output: __S(2627, __c82, 3) as any as S.Schema<GetMalwareProtectionPlanResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareProtectionPlan",
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
  GetMalwareScanRequest,
  GetMalwareScanResponse,
  GetMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<GetMalwareScanRequest>,
  output: __S(2665, __c83, 9) as any as S.Schema<GetMalwareScanResponse>,
  errors: [BadRequestException, InternalServerErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareScan",
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
  GetMalwareScanSettingsRequest,
  GetMalwareScanSettingsResponse,
  GetMalwareScanSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<GetMalwareScanSettingsRequest>,
  output: __S(2721, __c85, 1) as any as S.Schema<GetMalwareScanSettingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareScanSettings",
}));

export type GetMasterAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Provides the details for the GuardDuty administrator account associated with the current GuardDuty member account.
 */
export const getMasterAccount: API.OperationMethod<
  GetMasterAccountRequest,
  GetMasterAccountResponse,
  GetMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<GetMasterAccountRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<GetMasterAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMasterAccount",
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
  GetMemberDetectorsRequest,
  GetMemberDetectorsResponse,
  GetMemberDetectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<GetMemberDetectorsRequest>,
  output: __S(2819, __c88, 3) as any as S.Schema<GetMemberDetectorsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemberDetectors",
}));

export type GetMembersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Retrieves GuardDuty member accounts (of the current GuardDuty administrator account) specified by the account IDs.
 */
export const getMembers: API.OperationMethod<
  GetMembersRequest,
  GetMembersResponse,
  GetMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<GetMembersRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<GetMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembers",
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
  GetOrganizationStatisticsRequest,
  GetOrganizationStatisticsResponse,
  GetOrganizationStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<GetOrganizationStatisticsRequest>,
  output: __S(2951, __c92, 7) as any as S.Schema<GetOrganizationStatisticsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationStatistics",
}));

export type GetRemainingFreeTrialDaysError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Provides the number of days left for each data source used in the free trial period.
 */
export const getRemainingFreeTrialDays: API.OperationMethod<
  GetRemainingFreeTrialDaysRequest,
  GetRemainingFreeTrialDaysResponse,
  GetRemainingFreeTrialDaysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<GetRemainingFreeTrialDaysRequest>,
  output: __S(2985, __c93, 9) as any as S.Schema<GetRemainingFreeTrialDaysResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRemainingFreeTrialDays",
}));

export type GetThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the threat entity set associated with the specified `threatEntitySetId`.
 */
export const getThreatEntitySet: API.OperationMethod<
  GetThreatEntitySetRequest,
  GetThreatEntitySetResponse,
  GetThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<GetThreatEntitySetRequest>,
  output: __S(3040, __c95, 0) as any as S.Schema<GetThreatEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThreatEntitySet",
}));

export type GetThreatIntelSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the ThreatIntelSet that is specified by the ThreatIntelSet ID.
 */
export const getThreatIntelSet: API.OperationMethod<
  GetThreatIntelSetRequest,
  GetThreatIntelSetResponse,
  GetThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<GetThreatIntelSetRequest>,
  output: __S(2592, __c81, 0) as any as S.Schema<GetThreatIntelSetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThreatIntelSet",
}));

export type GetTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the trusted entity set associated with the specified `trustedEntitySetId`.
 */
export const getTrustedEntitySet: API.OperationMethod<
  GetTrustedEntitySetRequest,
  GetTrustedEntitySetResponse,
  GetTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<GetTrustedEntitySetRequest>,
  output: __S(3040, __c95, 0) as any as S.Schema<GetTrustedEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustedEntitySet",
}));

export type GetUsageStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists Amazon GuardDuty usage statistics over the last 30 days for the specified detector ID. For newly enabled detectors or data sources, the cost returned will include only the usage so far under 30 days. This may differ from the cost metrics in the console, which project usage over 30 days to provide a monthly cost estimate. For more information, see Understanding How Usage Costs are Calculated.
 */
export const getUsageStatistics: API.PaginatedOperationMethod<
  GetUsageStatisticsRequest,
  GetUsageStatisticsResponse,
  GetUsageStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3137, __c98, 1) as any as S.Schema<GetUsageStatisticsRequest>,
  output: __S(3150, __c98, 14) as any as S.Schema<GetUsageStatisticsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageStatistics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
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
  InviteMembersRequest,
  InviteMembersResponse,
  InviteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<InviteMembersRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<InviteMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteMembers",
}));

export type ListCoverageError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists coverage details for your GuardDuty account. If you're a GuardDuty administrator, you can retrieve all resources associated with the active member accounts in your organization.
 *
 * Make sure the accounts have Runtime Monitoring enabled and GuardDuty agent running on their resources.
 */
export const listCoverage: API.PaginatedOperationMethod<
  ListCoverageRequest,
  ListCoverageResponse,
  ListCoverageError,
  Credentials | HttpClient.HttpClient,
  CoverageResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<ListCoverageRequest>,
  output: __S(3211, __c100, 11) as any as S.Schema<ListCoverageResponse>,
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
  ListCustomDetectionRuleAssociationsRequest,
  ListCustomDetectionRuleAssociationsResponse,
  ListCustomDetectionRuleAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<ListCustomDetectionRuleAssociationsRequest>,
  output: __S(3267, __c102, 3) as any as S.Schema<ListCustomDetectionRuleAssociationsResponse>,
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
  ListCustomDetectionRuleOrgConfigurationsRequest,
  ListCustomDetectionRuleOrgConfigurationsResponse,
  ListCustomDetectionRuleOrgConfigurationsError,
  Credentials | HttpClient.HttpClient,
  DetectionRuleOrgConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<ListCustomDetectionRuleOrgConfigurationsRequest>,
  output: __S(3299, __c103, 3) as any as S.Schema<ListCustomDetectionRuleOrgConfigurationsResponse>,
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
  ListCustomDetectionRulesRequest,
  ListCustomDetectionRulesResponse,
  ListCustomDetectionRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3394, __c106, 2) as any as S.Schema<ListCustomDetectionRulesRequest>,
  output: __S(3397, __c106, 5) as any as S.Schema<ListCustomDetectionRulesResponse>,
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
})) as any;

export type ListDetectorsError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists detectorIds of all the existing Amazon GuardDuty detector resources.
 */
export const listDetectors: API.PaginatedOperationMethod<
  ListDetectorsRequest,
  ListDetectorsResponse,
  ListDetectorsError,
  Credentials | HttpClient.HttpClient,
  DetectorId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<ListDetectorsRequest>,
  output: __S(3425, __c107, 1) as any as S.Schema<ListDetectorsResponse>,
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
})) as any;

export type ListFiltersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Returns a paginated list of the current filters.
 */
export const listFilters: API.PaginatedOperationMethod<
  ListFiltersRequest,
  ListFiltersResponse,
  ListFiltersError,
  Credentials | HttpClient.HttpClient,
  FilterName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<ListFiltersRequest>,
  output: __S(3457, __c108, 1) as any as S.Schema<ListFiltersResponse>,
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
})) as any;

export type ListFindingsError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists GuardDuty findings for the specified detector ID.
 *
 * There might be regional differences because some flags might not be available in all the Regions where GuardDuty is currently supported. For more information, see Regions and endpoints.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<ListFindingsRequest>,
  output: __S(3489, __c109, 1) as any as S.Schema<ListFindingsResponse>,
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
})) as any;

export type ListInvestigationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * This API is currently available as a preview. This feature is available in the following Amazon Web Services Regions: US East (N. Virginia), US East (Ohio), US West (Oregon), Canada (Central), Europe (Frankfurt), Europe (Ireland), Europe (London), Europe (Paris), Europe (Stockholm), and Asia Pacific (Tokyo).
 *
 * Returns a list of investigations associated with the specified GuardDuty detector.
 *
 * An administrator account sees all investigations across the organization. Member accounts see only the investigations that belong to them.
 */
export const listInvestigations: API.PaginatedOperationMethod<
  ListInvestigationsRequest,
  ListInvestigationsResponse,
  ListInvestigationsError,
  Credentials | HttpClient.HttpClient,
  InvestigationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<ListInvestigationsRequest>,
  output: __S(3523, __c110, 3) as any as S.Schema<ListInvestigationsResponse>,
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
})) as any;

export type ListInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists all GuardDuty membership invitations that were sent to the current Amazon Web Services account.
 */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsRequest,
  ListInvitationsResponse,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  Invitation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<ListInvitationsRequest>,
  output: __S(3554, __c111, 2) as any as S.Schema<ListInvitationsResponse>,
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
})) as any;

export type ListIPSetsError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists the IPSets of the GuardDuty service specified by the detector ID. If you use this operation from a member account, the IPSets returned are the IPSets from the associated administrator account.
 */
export const listIPSets: API.PaginatedOperationMethod<
  ListIPSetsRequest,
  ListIPSetsResponse,
  ListIPSetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<ListIPSetsRequest>,
  output: __S(3585, __c112, 1) as any as S.Schema<ListIPSetsResponse>,
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
  ListMalwareProtectionPlansRequest,
  ListMalwareProtectionPlansResponse,
  ListMalwareProtectionPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<ListMalwareProtectionPlansRequest>,
  output: __S(3618, __c113, 2) as any as S.Schema<ListMalwareProtectionPlansResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMalwareProtectionPlans",
}));

export type ListMalwareScansError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of malware scans. Each member account can view the malware scans for their own accounts. An administrator can view the malware scans for all of its members' accounts.
 */
export const listMalwareScans: API.PaginatedOperationMethod<
  ListMalwareScansRequest,
  ListMalwareScansResponse,
  ListMalwareScansError,
  Credentials | HttpClient.HttpClient,
  MalwareScan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3651, __c114, 3) as any as S.Schema<ListMalwareScansRequest>,
  output: __S(3654, __c114, 6) as any as S.Schema<ListMalwareScansResponse>,
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
})) as any;

export type ListMembersError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Lists details about all member accounts for the current GuardDuty administrator account.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<ListMembersRequest>,
  output: __S(3681, __c115, 1) as any as S.Schema<ListMembersResponse>,
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
})) as any;

export type ListOrganizationAdminAccountsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the accounts designated as GuardDuty delegated administrators. Only the organization's management account can run this API operation.
 */
export const listOrganizationAdminAccounts: API.PaginatedOperationMethod<
  ListOrganizationAdminAccountsRequest,
  ListOrganizationAdminAccountsResponse,
  ListOrganizationAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  AdminAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<ListOrganizationAdminAccountsRequest>,
  output: __S(3811, __c119, 3) as any as S.Schema<ListOrganizationAdminAccountsResponse>,
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
})) as any;

export type ListPublishingDestinationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of publishing destinations associated with the specified `detectorId`.
 */
export const listPublishingDestinations: API.PaginatedOperationMethod<
  ListPublishingDestinationsRequest,
  ListPublishingDestinationsResponse,
  ListPublishingDestinationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<ListPublishingDestinationsRequest>,
  output: __S(3843, __c120, 3) as any as S.Schema<ListPublishingDestinationsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublishingDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
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
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(3873, __c121, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListThreatEntitySetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the threat entity sets associated with the specified GuardDuty detector ID. If you use this operation from a member account, the threat entity sets that are returned as a response, belong to the administrator account.
 */
export const listThreatEntitySets: API.PaginatedOperationMethod<
  ListThreatEntitySetsRequest,
  ListThreatEntitySetsResponse,
  ListThreatEntitySetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<ListThreatEntitySetsRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<ListThreatEntitySetsResponse>,
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
})) as any;

export type ListThreatIntelSetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the ThreatIntelSets of the GuardDuty service specified by the detector ID. If you use this operation from a member account, the ThreatIntelSets associated with the administrator account are returned.
 */
export const listThreatIntelSets: API.PaginatedOperationMethod<
  ListThreatIntelSetsRequest,
  ListThreatIntelSetsResponse,
  ListThreatIntelSetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<ListThreatIntelSetsRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<ListThreatIntelSetsResponse>,
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
})) as any;

export type ListTrustedEntitySetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the trusted entity sets associated with the specified GuardDuty detector ID. If you use this operation from a member account, the trusted entity sets that are returned as a response, belong to the administrator account.
 */
export const listTrustedEntitySets: API.PaginatedOperationMethod<
  ListTrustedEntitySetsRequest,
  ListTrustedEntitySetsResponse,
  ListTrustedEntitySetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<ListTrustedEntitySetsRequest>,
  output: __S(3969, __c124, 1) as any as S.Schema<ListTrustedEntitySetsResponse>,
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
  SendObjectMalwareScanRequest,
  SendObjectMalwareScanResponse,
  SendObjectMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4001, __c125, 1) as any as S.Schema<SendObjectMalwareScanRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<SendObjectMalwareScanResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendObjectMalwareScan",
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
  StartMalwareScanRequest,
  StartMalwareScanResponse,
  StartMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4033, __c126, 1) as any as S.Schema<StartMalwareScanRequest>,
  output: __S(4034, __c126, 2) as any as S.Schema<StartMalwareScanResponse>,
  errors: [BadRequestException, ConflictException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMalwareScan",
}));

export type StartMonitoringMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Turns on GuardDuty monitoring of the specified member accounts. Use this operation to restart monitoring of accounts that you stopped monitoring with the StopMonitoringMembers operation.
 */
export const startMonitoringMembers: API.OperationMethod<
  StartMonitoringMembersRequest,
  StartMonitoringMembersResponse,
  StartMonitoringMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<StartMonitoringMembersRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<StartMonitoringMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMonitoringMembers",
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
  StopMonitoringMembersRequest,
  StopMonitoringMembersResponse,
  StopMonitoringMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<StopMonitoringMembersRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<StopMonitoringMembersResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMonitoringMembers",
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
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4160, __c130, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<TagResourceResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UnarchiveFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Unarchives GuardDuty findings specified by the `findingIds`.
 */
export const unarchiveFindings: API.OperationMethod<
  UnarchiveFindingsRequest,
  UnarchiveFindingsResponse,
  UnarchiveFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4192, __c131, 0) as any as S.Schema<UnarchiveFindingsRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UnarchiveFindingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveFindings",
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
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4224, __c132, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
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
  UpdateCustomDetectionRuleAssociationRequest,
  UpdateCustomDetectionRuleAssociationResponse,
  UpdateCustomDetectionRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4256, __c133, 0) as any as S.Schema<UpdateCustomDetectionRuleAssociationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateCustomDetectionRuleAssociationResponse>,
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
  UpdateCustomDetectionRuleOrgConfigurationRequest,
  UpdateCustomDetectionRuleOrgConfigurationResponse,
  UpdateCustomDetectionRuleOrgConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<UpdateCustomDetectionRuleOrgConfigurationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateCustomDetectionRuleOrgConfigurationResponse>,
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
  UpdateDetectorRequest,
  UpdateDetectorResponse,
  UpdateDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<UpdateDetectorRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateDetectorResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDetector",
}));

export type UpdateFilterError = BadRequestException | InternalServerErrorException | CommonErrors;
/**
 * Updates the filter specified by the filter name.
 */
export const updateFilter: API.OperationMethod<
  UpdateFilterRequest,
  UpdateFilterResponse,
  UpdateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<UpdateFilterRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<UpdateFilterResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFilter",
}));

export type UpdateFindingsFeedbackError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Marks the specified GuardDuty findings as useful or not useful.
 */
export const updateFindingsFeedback: API.OperationMethod<
  UpdateFindingsFeedbackRequest,
  UpdateFindingsFeedbackResponse,
  UpdateFindingsFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<UpdateFindingsFeedbackRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateFindingsFeedbackResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFindingsFeedback",
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
  UpdateIPSetRequest,
  UpdateIPSetResponse,
  UpdateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4416, __c138, 0) as any as S.Schema<UpdateIPSetRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateIPSetResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIPSet",
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
  UpdateMalwareProtectionPlanRequest,
  UpdateMalwareProtectionPlanResponse,
  UpdateMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4450, __c139, 2) as any as S.Schema<UpdateMalwareProtectionPlanRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateMalwareProtectionPlanResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMalwareProtectionPlan",
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
  UpdateMalwareScanSettingsRequest,
  UpdateMalwareScanSettingsResponse,
  UpdateMalwareScanSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<UpdateMalwareScanSettingsRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateMalwareScanSettingsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMalwareScanSettings",
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
  UpdateMemberDetectorsRequest,
  UpdateMemberDetectorsResponse,
  UpdateMemberDetectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<UpdateMemberDetectorsRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<UpdateMemberDetectorsResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMemberDetectors",
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
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<UpdateOrganizationConfigurationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateOrganizationConfigurationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
}));

export type UpdatePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates information about the publishing destination specified by the `destinationId`.
 */
export const updatePublishingDestination: API.OperationMethod<
  UpdatePublishingDestinationRequest,
  UpdatePublishingDestinationResponse,
  UpdatePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<UpdatePublishingDestinationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdatePublishingDestinationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublishingDestination",
}));

export type UpdateThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the threat entity set associated with the specified `threatEntitySetId`.
 */
export const updateThreatEntitySet: API.OperationMethod<
  UpdateThreatEntitySetRequest,
  UpdateThreatEntitySetResponse,
  UpdateThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<UpdateThreatEntitySetRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateThreatEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatEntitySet",
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
  UpdateThreatIntelSetRequest,
  UpdateThreatIntelSetResponse,
  UpdateThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<UpdateThreatIntelSetRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateThreatIntelSetResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatIntelSet",
}));

export type UpdateTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the trusted entity set associated with the specified `trustedEntitySetId`.
 */
export const updateTrustedEntitySet: API.OperationMethod<
  UpdateTrustedEntitySetRequest,
  UpdateTrustedEntitySetResponse,
  UpdateTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<UpdateTrustedEntitySetRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateTrustedEntitySetResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustedEntitySet",
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
          DataSources: S.optional(__S(68, __c2, 4)),
          Tags: S.optional(__S(3744, __c117, 0)),
          Features: S.optional(__S(72, __c2, 8)),
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
        S.Struct({ Enable: S.optional(S.Boolean) }).pipe(S.encodeKeys({ Enable: "enable" })),
      ).annotate({ identifier: "S3LogsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AuditLogs: S.optional(__S(64, __c2, 0)) }).pipe(
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
        S.Struct({ ScanEc2InstanceWithFindings: S.optional(__S(66, __c2, 2)) }).pipe(
          S.encodeKeys({ ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings" }),
        ),
      ).annotate({ identifier: "MalwareProtectionConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          S3Logs: S.optional(__S(64, __c2, 0)),
          Kubernetes: S.optional(__S(65, __c2, 1)),
          MalwareProtection: S.optional(__S(67, __c2, 3)),
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
        S.Struct({ Name: S.optional(S.String), Status: S.optional(S.String) }).pipe(
          S.encodeKeys({ Name: "name", Status: "status" }),
        ),
      ).annotate({ identifier: "DetectorAdditionalConfiguration" });
    case 6:
      return S.Array(__S(69, __c2, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AdditionalConfiguration: S.optional(__S(70, __c2, 6)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            Status: "status",
            AdditionalConfiguration: "additionalConfiguration",
          }),
        ),
      ).annotate({ identifier: "DetectorFeatureConfiguration" });
    case 8:
      return S.Array(__S(71, __c2, 7));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          ScanResourceCriteria: S.optional(__S(2754, __c86, 2)),
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
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3360, __c105, 0)),
          DataSources: S.optional(__S(68, __c2, 4)),
          Features: S.optional(__S(72, __c2, 8)),
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
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AutoEnable: S.optional(S.Boolean),
          DataSources: S.optional(__S(1572, __c49, 4)),
          Features: S.optional(__S(1576, __c49, 8)),
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
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          DestinationId: S.String.pipe(T.HttpLabel("DestinationId")),
          DestinationProperties: S.optional(__S(768, __c24, 0)),
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
function __c7(j: number): any {
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
function __c8(j: number): any {
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
function __c9(j: number): any {
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
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Action: S.optional(S.String),
          Rank: S.optional(S.Number),
          FindingCriteria: S.optional(__S(354, __c11, 2)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Eq: S.optional(__S(3360, __c105, 0)),
          Neq: S.optional(__S(3360, __c105, 0)),
          Gt: S.optional(S.Number),
          Gte: S.optional(S.Number),
          Lt: S.optional(S.Number),
          Lte: S.optional(S.Number),
          Equals: S.optional(__S(3360, __c105, 0)),
          NotEquals: S.optional(__S(3360, __c105, 0)),
          GreaterThan: S.optional(S.Number),
          GreaterThanOrEqual: S.optional(S.Number),
          LessThan: S.optional(S.Number),
          LessThanOrEqual: S.optional(S.Number),
          Matches: S.optional(__S(3360, __c105, 0)),
          NotMatches: S.optional(__S(3360, __c105, 0)),
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
      return S.Record(S.String, /*@__PURE__*/ __S(352, __c11, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ Criterion: S.optional(__S(353, __c11, 1)) }).pipe(
          S.encodeKeys({ Criterion: "criterion" }),
        ),
      ).annotate({ identifier: "FindingCriteria" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
      ).annotate({ identifier: "CreateFilterResponse" });
  }
}
function __c13(j: number): any {
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
function __c14(j: number): any {
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
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Role: S.optional(S.String),
          ProtectedResource: S.optional(__S(545, __c17, 1)),
          Actions: S.optional(__S(576, __c18, 0)),
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String) }).pipe(S.encodeKeys({ Status: "status" })),
      ).annotate({ identifier: "MalwareProtectionPlanTaggingAction" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.optional(S.String),
          ObjectPrefixes: S.optional(__S(3360, __c105, 0)),
        }).pipe(S.encodeKeys({ BucketName: "bucketName", ObjectPrefixes: "objectPrefixes" })),
      ).annotate({ identifier: "CreateS3BucketResource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ S3Bucket: S.optional(__S(544, __c17, 0)) }).pipe(
          S.encodeKeys({ S3Bucket: "s3Bucket" }),
        ),
      ).annotate({ identifier: "CreateProtectedResource" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tagging: S.optional(__S(512, __c16, 0)) }).pipe(
          S.encodeKeys({ Tagging: "tagging" }),
        ),
      ).annotate({ identifier: "MalwareProtectionPlanActions" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MalwareProtectionPlanId: S.optional(S.String) }).pipe(
          S.encodeKeys({ MalwareProtectionPlanId: "malwareProtectionPlanId" }),
        ),
      ).annotate({ identifier: "CreateMalwareProtectionPlanResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Email: S.optional(SensitiveString) }).pipe(
          S.encodeKeys({ AccountId: "accountId", Email: "email" }),
        ),
      ).annotate({ identifier: "AccountDetail" });
    case 1:
      return S.Array(__S(640, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountDetails: S.optional(__S(641, __c20, 1)),
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
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Result: S.optional(S.String) }).pipe(
          S.encodeKeys({ AccountId: "accountId", Result: "result" }),
        ),
      ).annotate({ identifier: "UnprocessedAccount" });
    case 1:
      return S.Array(__S(672, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UnprocessedAccounts: S.optional(__S(673, __c21, 1)) }).pipe(
          S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
        ),
      ).annotate({ identifier: "CreateMembersResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          DestinationType: S.optional(S.String),
          DestinationProperties: S.optional(__S(768, __c24, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DestinationArn: S.optional(S.String), KmsKeyArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ DestinationArn: "destinationArn", KmsKeyArn: "kmsKeyArn" }),
        ),
      ).annotate({ identifier: "DestinationProperties" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingTypes: S.optional(__S(3360, __c105, 0)),
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
function __c26(j: number): any {
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
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c27(j: number): any {
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
          Tags: S.optional(__S(3744, __c117, 0)),
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
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(3360, __c105, 0)) })
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
function __c30(j: number): any {
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
function __c31(j: number): any {
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
function __c32(j: number): any {
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
function __c33(j: number): any {
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
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(3360, __c105, 0)) })
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
function __c35(j: number): any {
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
function __c36(j: number): any {
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
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3360, __c105, 0)),
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
function __c38(j: number): any {
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
function __c39(j: number): any {
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
function __c40(j: number): any {
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
function __c41(j: number): any {
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
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CriterionKey: S.optional(S.String),
          FilterCondition: S.optional(__S(1504, __c47, 0)),
        }).pipe(S.encodeKeys({ CriterionKey: "criterionKey", FilterCondition: "filterCondition" })),
      ).annotate({ identifier: "FilterCriterion" });
    case 1:
      return S.Array(__S(1344, __c42, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FilterCriterion: S.optional(__S(1345, __c42, 1)) }).pipe(
          S.encodeKeys({ FilterCriterion: "filterCriterion" }),
        ),
      ).annotate({ identifier: "FilterCriteria" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          FilterCriteria: S.optional(__S(1346, __c42, 2)),
          SortCriteria: S.optional(__S(1440, __c45, 0)),
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
          TriggerDetails: S.optional(__S(1472, __c46, 0)),
          ResourceDetails: S.optional(__S(1348, __c42, 4)),
          ScanResultDetails: S.optional(__S(1349, __c42, 5)),
          AccountId: S.optional(S.String),
          TotalBytes: S.optional(S.Number),
          FileCount: S.optional(S.Number),
          AttachedVolumes: S.optional(__S(1376, __c43, 0)),
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
      return S.Array(__S(1350, __c42, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ Scans: S.optional(__S(1351, __c42, 7)), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Scans: "scans", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "DescribeMalwareScansResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1408, __c44, 0));
  }
}
function __c44(j: number): any {
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
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), OrderBy: S.optional(S.String) }).pipe(
          S.encodeKeys({ AttributeName: "attributeName", OrderBy: "orderBy" }),
        ),
      ).annotate({ identifier: "SortCriteria" });
  }
}
function __c46(j: number): any {
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
function __c47(j: number): any {
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
function __c48(j: number): any {
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
          DataSources: S.optional(__S(1572, __c49, 4)),
          Features: S.optional(__S(1576, __c49, 8)),
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
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoEnable: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ AutoEnable: "autoEnable" }),
        ),
      ).annotate({ identifier: "OrganizationS3LogsConfigurationResult" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AuditLogs: S.optional(__S(1568, __c49, 0)) }).pipe(
          S.encodeKeys({ AuditLogs: "auditLogs" }),
        ),
      ).annotate({ identifier: "OrganizationKubernetesConfigurationResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({ EbsVolumes: S.optional(__S(1568, __c49, 0)) }).pipe(
          S.encodeKeys({ EbsVolumes: "ebsVolumes" }),
        ),
      ).annotate({ identifier: "OrganizationScanEc2InstanceWithFindingsResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ScanEc2InstanceWithFindings: S.optional(__S(1570, __c49, 2)) }).pipe(
          S.encodeKeys({ ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings" }),
        ),
      ).annotate({ identifier: "OrganizationMalwareProtectionConfigurationResult" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          S3Logs: S.optional(__S(1568, __c49, 0)),
          Kubernetes: S.optional(__S(1569, __c49, 1)),
          MalwareProtection: S.optional(__S(1571, __c49, 3)),
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
      return S.Array(__S(1573, __c49, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          AutoEnable: S.optional(S.String),
          AdditionalConfiguration: S.optional(__S(1574, __c49, 6)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            AutoEnable: "autoEnable",
            AdditionalConfiguration: "additionalConfiguration",
          }),
        ),
      ).annotate({ identifier: "OrganizationFeatureConfigurationResult" });
    case 8:
      return S.Array(__S(1575, __c49, 7));
  }
}
function __c50(j: number): any {
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
          DestinationProperties: S.optional(__S(768, __c24, 0)),
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c51(j: number): any {
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
function __c52(j: number): any {
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
function __c53(j: number): any {
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
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3360, __c105, 0)),
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
function __c55(j: number): any {
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
function __c56(j: number): any {
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
        S.Struct({ Administrator: S.optional(__S(1824, __c57, 0)) }).pipe(
          S.encodeKeys({ Administrator: "administrator" }),
        ),
      ).annotate({ identifier: "GetAdministratorAccountResponse" });
  }
}
function __c57(j: number): any {
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
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FilterCriteria: S.optional(__S(1923, __c60, 3)),
          StatisticsType: S.optional(__S(1888, __c59, 0)),
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
          CountByResourceType: S.optional(__S(1857, __c58, 1)),
          CountByCoverageStatus: S.optional(__S(1857, __c58, 1)),
        }).pipe(
          S.encodeKeys({
            CountByResourceType: "countByResourceType",
            CountByCoverageStatus: "countByCoverageStatus",
          }),
        ),
      ).annotate({ identifier: "CoverageStatistics" });
    case 3:
      return S.suspend(() =>
        S.Struct({ CoverageStatistics: S.optional(__S(1858, __c58, 2)) }).pipe(
          S.encodeKeys({ CoverageStatistics: "coverageStatistics" }),
        ),
      ).annotate({ identifier: "GetCoverageStatisticsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Equals: S.optional(__S(3360, __c105, 0)),
          NotEquals: S.optional(__S(3360, __c105, 0)),
        }).pipe(S.encodeKeys({ Equals: "equals", NotEquals: "notEquals" })),
      ).annotate({ identifier: "CoverageFilterCondition" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CriterionKey: S.optional(S.String),
          FilterCondition: S.optional(__S(1920, __c60, 0)),
        }).pipe(S.encodeKeys({ CriterionKey: "criterionKey", FilterCondition: "filterCondition" })),
      ).annotate({ identifier: "CoverageFilterCriterion" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ FilterCriterion: S.optional(__S(1922, __c60, 2)) }).pipe(
          S.encodeKeys({ FilterCriterion: "filterCriterion" }),
        ),
      ).annotate({ identifier: "CoverageFilterCriteria" });
  }
}
function __c61(j: number): any {
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
          Definition: S.optional(__S(1953, __c61, 1)),
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
            Definition: "definition",
            Language: "language",
            Schema: "schema",
            CreatedAt: "createdAt",
            UpdatedAt: "updatedAt",
          }),
        ),
      ).annotate({ identifier: "RuleDetail" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Rule: S.optional(__S(1954, __c61, 2)) }).pipe(S.encodeKeys({ Rule: "rule" })),
      ).annotate({ identifier: "GetCustomDetectionRuleResponse" });
  }
}
function __c62(j: number): any {
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
          RuleAssociation: S.optional(__S(3776, __c118, 0)),
          Tags: S.optional(__S(3744, __c117, 0)),
        }).pipe(S.encodeKeys({ RuleAssociation: "ruleAssociation", Tags: "tags" })),
      ).annotate({ identifier: "GetCustomDetectionRuleAssociationResponse" });
  }
}
function __c63(j: number): any {
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
          IncludeAccountIds: S.optional(__S(3360, __c105, 0)),
          ExcludeAccountIds: S.optional(__S(3360, __c105, 0)),
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
        S.Struct({ Configuration: S.optional(__S(2017, __c63, 1)) }).pipe(
          S.encodeKeys({ Configuration: "configuration" }),
        ),
      ).annotate({ identifier: "GetCustomDetectionRuleOrgConfigurationResponse" });
  }
}
function __c64(j: number): any {
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
          DataSources: S.optional(__S(2081, __c65, 1)),
          Tags: S.optional(__S(3744, __c117, 0)),
          Features: S.optional(__S(2085, __c65, 5)),
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
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AuditLogs: S.optional(__S(512, __c16, 0)) }).pipe(
          S.encodeKeys({ AuditLogs: "auditLogs" }),
        ),
      ).annotate({ identifier: "KubernetesConfigurationResult" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudTrail: S.optional(__S(512, __c16, 0)),
          DNSLogs: S.optional(__S(512, __c16, 0)),
          FlowLogs: S.optional(__S(512, __c16, 0)),
          S3Logs: S.optional(__S(512, __c16, 0)),
          Kubernetes: S.optional(__S(2080, __c65, 0)),
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
      return S.Array(__S(2082, __c65, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AdditionalConfiguration: S.optional(__S(2083, __c65, 3)),
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
      return S.Array(__S(2084, __c65, 4));
  }
}
function __c66(j: number): any {
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
          FindingCriteria: S.optional(__S(354, __c11, 2)),
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingIds: S.optional(__S(3360, __c105, 0)),
          SortCriteria: S.optional(__S(1440, __c45, 0)),
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
          AccessControlList: S.optional(__S(2148, __c67, 4)),
          BucketPolicy: S.optional(__S(2148, __c67, 4)),
          BlockPublicAccess: S.optional(__S(2149, __c67, 5)),
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
        S.Struct({ BlockPublicAccess: S.optional(__S(2149, __c67, 5)) }).pipe(
          S.encodeKeys({ BlockPublicAccess: "blockPublicAccess" }),
        ),
      ).annotate({ identifier: "AccountLevelPermissions" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          BucketLevelPermissions: S.optional(__S(2150, __c67, 6)),
          AccountLevelPermissions: S.optional(__S(2151, __c67, 7)),
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
          PermissionConfiguration: S.optional(__S(2152, __c67, 8)),
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
      return S.Array(__S(2154, __c67, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Owner: S.optional(__S(2146, __c67, 2)),
          Tags: S.optional(__S(2369, __c74, 1)),
          DefaultServerSideEncryption: S.optional(__S(2147, __c67, 3)),
          PublicAccess: S.optional(__S(2153, __c67, 9)),
          S3ObjectDetails: S.optional(__S(2155, __c67, 11)),
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
      return S.Array(__S(2156, __c67, 12));
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
      return S.Array(__S(2159, __c67, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ GroupId: S.optional(S.String), GroupName: S.optional(S.String) }).pipe(
          S.encodeKeys({ GroupId: "groupId", GroupName: "groupName" }),
        ),
      ).annotate({ identifier: "SecurityGroup" });
    case 18:
      return S.Array(__S(2161, __c67, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          Ipv6Addresses: S.optional(__S(3360, __c105, 0)),
          NetworkInterfaceId: S.optional(S.String),
          PrivateDnsName: S.optional(S.String),
          PrivateIpAddress: S.optional(SensitiveString),
          PrivateIpAddresses: S.optional(__S(2160, __c67, 16)),
          PublicDnsName: S.optional(S.String),
          PublicIp: S.optional(S.String),
          SecurityGroups: S.optional(__S(2162, __c67, 18)),
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
      return S.Array(__S(2163, __c67, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), ProductType: S.optional(S.String) }).pipe(
          S.encodeKeys({ Code: "productCodeId", ProductType: "productCodeType" }),
        ),
      ).annotate({ identifier: "ProductCode" });
    case 22:
      return S.Array(__S(2165, __c67, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          IamInstanceProfile: S.optional(__S(2158, __c67, 14)),
          ImageDescription: S.optional(S.String),
          ImageId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceState: S.optional(S.String),
          InstanceType: S.optional(S.String),
          OutpostArn: S.optional(S.String),
          LaunchTime: S.optional(S.String),
          NetworkInterfaces: S.optional(__S(2164, __c67, 20)),
          Platform: S.optional(S.String),
          ProductCodes: S.optional(__S(2166, __c67, 22)),
          Tags: S.optional(__S(2369, __c74, 1)),
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
          Tags: S.optional(__S(2369, __c74, 1)),
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
        S.Struct({ Username: S.optional(S.String), Groups: S.optional(__S(3360, __c105, 0)) }).pipe(
          S.encodeKeys({ Username: "username", Groups: "groups" }),
        ),
      ).annotate({ identifier: "ImpersonatedUser" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Username: S.optional(S.String),
          Uid: S.optional(S.String),
          Groups: S.optional(__S(3360, __c105, 0)),
          SessionName: S.optional(__S(3360, __c105, 0)),
          ImpersonatedUser: S.optional(__S(2169, __c67, 25)),
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
      return S.Array(__S(2171, __c67, 27));
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
          VolumeMounts: S.optional(__S(2172, __c67, 28)),
          SecurityContext: S.optional(__S(2173, __c67, 29)),
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
      return S.Array(__S(2174, __c67, 30));
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Path: S.optional(S.String) }).pipe(S.encodeKeys({ Path: "path" })),
      ).annotate({ identifier: "HostPath" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), HostPath: S.optional(__S(2176, __c68, 0)) }).pipe(
          S.encodeKeys({ Name: "name", HostPath: "hostPath" }),
        ),
      ).annotate({ identifier: "Volume" });
    case 2:
      return S.Array(__S(2177, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Uid: S.optional(S.String),
          Namespace: S.optional(S.String),
          HostNetwork: S.optional(S.Boolean),
          ServiceAccountName: S.optional(S.String),
          Containers: S.optional(__S(2175, __c67, 31)),
          Volumes: S.optional(__S(2178, __c68, 2)),
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
          KubernetesUserDetails: S.optional(__S(2170, __c67, 26)),
          KubernetesWorkloadDetails: S.optional(__S(2179, __c68, 3)),
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
          ScannedVolumeDetails: S.optional(__S(1376, __c43, 0)),
          SkippedVolumeDetails: S.optional(__S(1376, __c43, 0)),
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
          Tags: S.optional(__S(2369, __c74, 1)),
          Volumes: S.optional(__S(2178, __c68, 2)),
          Containers: S.optional(__S(2175, __c67, 31)),
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
          Tags: S.optional(__S(2369, __c74, 1)),
          TaskDetails: S.optional(__S(2182, __c68, 6)),
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
          SubnetIds: S.optional(__S(3360, __c105, 0)),
          VpcId: S.optional(S.String),
          SecurityGroups: S.optional(__S(2162, __c67, 18)),
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
          VpcConfig: S.optional(__S(2184, __c68, 8)),
          Tags: S.optional(__S(2369, __c74, 1)),
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
          Tags: S.optional(__S(2369, __c74, 1)),
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
          Tags: S.optional(__S(2369, __c74, 1)),
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
          ContinuousScanDetails: S.optional(__S(2336, __c73, 0)),
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
      return S.Array(__S(2192, __c68, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Confidence: S.optional(S.String),
          Action: S.optional(S.String),
        }).pipe(S.encodeKeys({ Type: "type", Confidence: "confidence", Action: "action" })),
      ).annotate({ identifier: "ContentPolicyFilter" });
    case 19:
      return S.Array(__S(2194, __c68, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          GuardrailArn: S.optional(S.String),
          GuardrailVersion: S.optional(S.String),
          Guardrails: S.optional(__S(2193, __c68, 17)),
          GuardrailAction: S.optional(S.String),
          GuardrailSource: S.optional(S.String),
          ContentPolicyFilters: S.optional(__S(2195, __c68, 19)),
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
      return S.Array(__S(2197, __c68, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AccessKeyDetails: S.optional(__S(2145, __c67, 1)),
          S3BucketDetails: S.optional(__S(2157, __c67, 13)),
          InstanceDetails: S.optional(__S(2167, __c67, 23)),
          EksClusterDetails: S.optional(__S(2168, __c67, 24)),
          KubernetesDetails: S.optional(__S(2180, __c68, 4)),
          ResourceType: S.optional(S.String),
          EbsVolumeDetails: S.optional(__S(2181, __c68, 5)),
          EcsClusterDetails: S.optional(__S(2183, __c68, 7)),
          ContainerDetails: S.optional(__S(2174, __c67, 30)),
          LambdaDetails: S.optional(__S(2185, __c68, 9)),
          RdsDbInstanceDetails: S.optional(__S(2186, __c68, 10)),
          RdsLimitlessDbDetails: S.optional(__S(2187, __c68, 11)),
          RdsDbUserDetails: S.optional(__S(2188, __c68, 12)),
          EbsSnapshotDetails: S.optional(__S(2189, __c68, 13)),
          Ec2ImageDetails: S.optional(__S(2190, __c68, 14)),
          RecoveryPointDetails: S.optional(__S(2191, __c68, 15)),
          BedrockGuardrailDetails: S.optional(__S(2196, __c68, 20)),
          ModelDetails: S.optional(__S(2198, __c68, 22)),
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
          City: S.optional(__S(2201, __c68, 25)),
          Country: S.optional(__S(2202, __c68, 26)),
          GeoLocation: S.optional(__S(2203, __c68, 27)),
          IpAddressV4: S.optional(SensitiveString),
          IpAddressV6: S.optional(SensitiveString),
          Organization: S.optional(__S(2204, __c68, 28)),
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
          DomainDetails: S.optional(__S(2200, __c68, 24)),
          ErrorCode: S.optional(S.String),
          UserAgent: S.optional(S.String),
          RemoteIpDetails: S.optional(__S(2205, __c68, 29)),
          ServiceName: S.optional(S.String),
          RemoteAccountDetails: S.optional(__S(2206, __c68, 30)),
          AffectedResources: S.optional(__S(3744, __c117, 0)),
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
function __c69(j: number): any {
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
          LocalPortDetails: S.optional(__S(2209, __c69, 1)),
          Protocol: S.optional(S.String),
          LocalIpDetails: S.optional(__S(2210, __c69, 2)),
          LocalNetworkInterface: S.optional(S.String),
          RemoteIpDetails: S.optional(__S(2205, __c68, 29)),
          RemotePortDetails: S.optional(__S(2209, __c69, 1)),
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
          LocalPortDetails: S.optional(__S(2209, __c69, 1)),
          LocalIpDetails: S.optional(__S(2210, __c69, 2)),
          RemoteIpDetails: S.optional(__S(2205, __c68, 29)),
        }).pipe(
          S.encodeKeys({
            LocalPortDetails: "localPortDetails",
            LocalIpDetails: "localIpDetails",
            RemoteIpDetails: "remoteIpDetails",
          }),
        ),
      ).annotate({ identifier: "PortProbeDetail" });
    case 5:
      return S.Array(__S(2212, __c69, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Blocked: S.optional(S.Boolean),
          PortProbeDetails: S.optional(__S(2213, __c69, 5)),
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
          SourceIps: S.optional(__S(3360, __c105, 0)),
          UserAgent: S.optional(S.String),
          RemoteIpDetails: S.optional(__S(2205, __c68, 29)),
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
      return S.Array(__S(2219, __c69, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          RemoteIpDetails: S.optional(__S(2205, __c68, 29)),
          LoginAttributes: S.optional(__S(2220, __c69, 12)),
        }).pipe(S.encodeKeys({ RemoteIpDetails: "remoteIpDetails" })),
      ).annotate({ identifier: "RdsLoginAttemptAction" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          ActionType: S.optional(S.String),
          AwsApiCallAction: S.optional(__S(2207, __c68, 31)),
          DnsRequestAction: S.optional(__S(2208, __c69, 0)),
          NetworkConnectionAction: S.optional(__S(2211, __c69, 3)),
          PortProbeAction: S.optional(__S(2214, __c69, 6)),
          KubernetesApiCallAction: S.optional(__S(2215, __c69, 7)),
          KubernetesPermissionCheckedDetails: S.optional(__S(2216, __c69, 8)),
          KubernetesRoleBindingDetails: S.optional(__S(2217, __c69, 9)),
          KubernetesRoleDetails: S.optional(__S(2218, __c69, 10)),
          RdsLoginAttemptAction: S.optional(__S(2221, __c69, 13)),
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
          ThreatNames: S.optional(__S(3360, __c105, 0)),
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
      return S.Array(__S(2223, __c69, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ ThreatIntelligenceDetails: S.optional(__S(2224, __c69, 16)) }).pipe(
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
      return S.Array(__S(2230, __c69, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Severity: S.optional(S.String),
          ItemCount: S.optional(S.Number),
          FilePaths: S.optional(__S(2231, __c69, 23)),
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
      return S.Array(__S(2232, __c69, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          ItemCount: S.optional(S.Number),
          UniqueThreatNameCount: S.optional(S.Number),
          Shortened: S.optional(S.Boolean),
          ThreatNames: S.optional(__S(2233, __c69, 25)),
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
          ScannedItemCount: S.optional(__S(2227, __c69, 19)),
          ThreatsDetectedItemCount: S.optional(__S(2228, __c69, 20)),
          HighestSeverityThreatDetails: S.optional(__S(2229, __c69, 21)),
          ThreatDetectedByName: S.optional(__S(2234, __c69, 26)),
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
          Sources: S.optional(__S(3360, __c105, 0)),
          ScanDetections: S.optional(__S(2235, __c69, 27)),
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
      return S.Array(__S(2237, __c69, 29));
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
          Lineage: S.optional(__S(2238, __c69, 30)),
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
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModifyingProcess: S.optional(__S(2239, __c69, 31)),
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
          Flags: S.optional(__S(3360, __c105, 0)),
          ModuleName: S.optional(S.String),
          ModuleFilePath: S.optional(S.String),
          ModuleSha256: S.optional(S.String),
          ShellHistoryFilePath: S.optional(S.String),
          TargetProcess: S.optional(__S(2239, __c69, 31)),
          AddressFamily: S.optional(S.String),
          IanaProtocolNumber: S.optional(S.Number),
          MemoryRegions: S.optional(__S(3360, __c105, 0)),
          ToolName: S.optional(S.String),
          ToolCategory: S.optional(S.String),
          ServiceName: S.optional(S.String),
          CommandLineExample: S.optional(S.String),
          ThreatFilePath: S.optional(S.String),
          FileOperation: S.optional(S.String),
          FilePath: S.optional(S.String),
          RelatedFilePaths: S.optional(__S(3360, __c105, 0)),
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
          Process: S.optional(__S(2239, __c69, 31)),
          Context: S.optional(__S(2240, __c70, 0)),
        }).pipe(S.encodeKeys({ Process: "process", Context: "context" })),
      ).annotate({ identifier: "RuntimeDetails" });
    case 2:
      return S.Array(S.Number);
    case 3:
      return S.suspend(() =>
        S.Struct({
          Text: S.optional(__S(3360, __c105, 0)),
          Number: S.optional(__S(2242, __c70, 2)),
        }).pipe(S.encodeKeys({ Text: "text", Number: "number" })),
      ).annotate({ identifier: "Observations" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProfileType: S.optional(S.String),
          ProfileSubtype: S.optional(S.String),
          Observations: S.optional(__S(2243, __c70, 3)),
        }).pipe(
          S.encodeKeys({
            ProfileType: "profileType",
            ProfileSubtype: "profileSubtype",
            Observations: "observations",
          }),
        ),
      ).annotate({ identifier: "AnomalyObject" });
    case 5:
      return S.Array(__S(2244, __c70, 4));
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(2245, __c70, 5).pipe(S.optional));
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(2246, __c70, 6).pipe(S.optional));
    case 8:
      return S.Record(S.String, /*@__PURE__*/ __S(2244, __c70, 4).pipe(S.optional));
    case 9:
      return S.Record(S.String, /*@__PURE__*/ __S(2248, __c70, 8).pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({ Behavior: S.optional(__S(2249, __c70, 9)) }).pipe(
          S.encodeKeys({ Behavior: "behavior" }),
        ),
      ).annotate({ identifier: "AnomalyUnusual" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Profiles: S.optional(__S(2247, __c70, 7)),
          Unusual: S.optional(__S(2250, __c70, 10)),
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
          Account: S.optional(__S(2252, __c70, 12)),
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
          User: S.optional(__S(2253, __c70, 13)),
          Session: S.optional(__S(2254, __c70, 14)),
          Process: S.optional(__S(2255, __c70, 15)),
        }).pipe(S.encodeKeys({ Id: "id", User: "user", Session: "session", Process: "process" })),
      ).annotate({ identifier: "Actor" });
    case 17:
      return S.Array(__S(2256, __c70, 16));
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
          AccountPublicAccess: S.optional(__S(2258, __c70, 18)),
          BucketPublicAccess: S.optional(__S(2258, __c70, 18)),
          S3ObjectUids: S.optional(__S(3360, __c105, 0)),
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
          IamInstanceProfile: S.optional(__S(2158, __c67, 14)),
          InstanceType: S.optional(S.String),
          OutpostArn: S.optional(S.String),
          Platform: S.optional(S.String),
          ProductCodes: S.optional(__S(2166, __c67, 22)),
          Ec2NetworkInterfaceUids: S.optional(__S(3360, __c105, 0)),
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
          Ipv6Addresses: S.optional(__S(3360, __c105, 0)),
          PrivateIpAddresses: S.optional(__S(2160, __c67, 16)),
          PublicIp: S.optional(S.String),
          SecurityGroups: S.optional(__S(2162, __c67, 18)),
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
          Ec2InstanceUids: S.optional(__S(3360, __c105, 0)),
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
          ContainerUids: S.optional(__S(3360, __c105, 0)),
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
          Ec2InstanceUids: S.optional(__S(3360, __c105, 0)),
        }).pipe(S.encodeKeys({ Status: "status", Ec2InstanceUids: "ec2InstanceUids" })),
      ).annotate({ identifier: "EcsCluster" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TaskDefinitionArn: S.optional(S.String),
          LaunchType: S.optional(S.String),
          ContainerUids: S.optional(__S(3360, __c105, 0)),
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
        S.Struct({ Ec2InstanceUids: S.optional(__S(3360, __c105, 0)) }).pipe(
          S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids" }),
        ),
      ).annotate({ identifier: "IamInstanceProfileV2" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Ec2InstanceUids: S.optional(__S(3360, __c105, 0)),
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
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3Bucket: S.optional(__S(2259, __c70, 19)),
          Ec2Instance: S.optional(__S(2260, __c70, 20)),
          AccessKey: S.optional(__S(2261, __c70, 21)),
          Ec2NetworkInterface: S.optional(__S(2262, __c70, 22)),
          S3Object: S.optional(__S(2263, __c70, 23)),
          EksCluster: S.optional(__S(2264, __c70, 24)),
          KubernetesWorkload: S.optional(__S(2265, __c70, 25)),
          Container: S.optional(__S(2266, __c70, 26)),
          EcsCluster: S.optional(__S(2267, __c70, 27)),
          EcsTask: S.optional(__S(2268, __c70, 28)),
          IamInstanceProfile: S.optional(__S(2269, __c70, 29)),
          AutoscalingAutoScalingGroup: S.optional(__S(2269, __c70, 29)),
          Ec2LaunchTemplate: S.optional(__S(2270, __c70, 30)),
          Ec2Vpc: S.optional(__S(2269, __c70, 29)),
          Ec2Image: S.optional(__S(2269, __c70, 29)),
          CloudformationStack: S.optional(__S(2269, __c70, 29)),
          BedrockGuardrail: S.optional(__S(2271, __c70, 31)),
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
          Tags: S.optional(__S(2369, __c74, 1)),
          Data: S.optional(__S(2272, __c71, 0)),
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
      return S.Array(__S(2273, __c71, 1));
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
          Location: S.optional(__S(2275, __c71, 3)),
          AutonomousSystem: S.optional(__S(2276, __c71, 4)),
          Connection: S.optional(__S(2277, __c71, 5)),
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
      return S.Array(__S(2278, __c71, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Values: S.optional(__S(3360, __c105, 0)),
          Title: S.optional(S.String),
        }).pipe(S.encodeKeys({ Key: "key", Values: "values", Title: "title" })),
      ).annotate({ identifier: "Indicator" });
    case 9:
      return S.Array(__S(2280, __c71, 8));
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
        S.Struct({ Type: S.optional(S.String), Api: S.optional(__S(2282, __c71, 10)) }).pipe(
          S.encodeKeys({ Type: "type", Api: "api" }),
        ),
      ).annotate({ identifier: "Activity" });
    case 12:
      return S.Array(__S(2283, __c71, 11));
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
          ResourceUids: S.optional(__S(3360, __c105, 0)),
          ActorIds: S.optional(__S(3360, __c105, 0)),
          EndpointIds: S.optional(__S(3360, __c105, 0)),
          SignalIndicators: S.optional(__S(2281, __c71, 9)),
          Activities: S.optional(__S(2284, __c71, 12)),
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
      return S.Array(__S(2285, __c71, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.String),
          Description: S.optional(S.String),
          Actors: S.optional(__S(2257, __c70, 17)),
          Resources: S.optional(__S(2274, __c71, 2)),
          Endpoints: S.optional(__S(2279, __c71, 7)),
          Signals: S.optional(__S(2286, __c71, 14)),
          SequenceIndicators: S.optional(__S(2281, __c71, 9)),
          AdditionalSequenceTypes: S.optional(__S(3360, __c105, 0)),
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
          Anomaly: S.optional(__S(2251, __c70, 11)),
          Sequence: S.optional(__S(2287, __c71, 15)),
        }).pipe(S.encodeKeys({ Anomaly: "anomaly", Sequence: "sequence" })),
      ).annotate({ identifier: "Detection" });
    case 17:
      return S.suspend(() =>
        S.Struct({ NestedItemPath: S.optional(S.String), Hash: S.optional(S.String) }).pipe(
          S.encodeKeys({ NestedItemPath: "nestedItemPath", Hash: "hash" }),
        ),
      ).annotate({ identifier: "ItemPath" });
    case 18:
      return S.Array(__S(2289, __c71, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Source: S.optional(S.String),
          ItemPaths: S.optional(__S(2290, __c71, 18)),
          Count: S.optional(S.Number),
          Hash: S.optional(S.String),
          ItemDetails: S.optional(__S(2306, __c72, 2)),
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
      return S.Array(__S(2291, __c71, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          TriggerType: S.optional(S.String),
          IncrementalScanDetails: S.optional(__S(2337, __c73, 1)),
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
          Threats: S.optional(__S(2292, __c71, 20)),
          ScanId: S.optional(S.String),
          ScanType: S.optional(S.String),
          ScanCategory: S.optional(S.String),
          ScanConfiguration: S.optional(__S(2293, __c71, 21)),
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
          Action: S.optional(__S(2222, __c69, 14)),
          Evidence: S.optional(__S(2225, __c69, 17)),
          Archived: S.optional(S.Boolean),
          Count: S.optional(S.Number),
          DetectorId: S.optional(S.String),
          EventFirstSeen: S.optional(S.String),
          EventLastSeen: S.optional(S.String),
          ResourceRole: S.optional(S.String),
          ServiceName: S.optional(S.String),
          UserFeedback: S.optional(S.String),
          AdditionalInfo: S.optional(__S(2226, __c69, 18)),
          FeatureName: S.optional(S.String),
          EbsVolumeScanDetails: S.optional(__S(2236, __c69, 28)),
          RuntimeDetails: S.optional(__S(2241, __c70, 1)),
          Detection: S.optional(__S(2288, __c71, 16)),
          MalwareScanDetails: S.optional(__S(2294, __c71, 22)),
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
          Resource: S.optional(__S(2199, __c68, 23)),
          SchemaVersion: S.optional(S.String),
          Service: S.optional(__S(2295, __c71, 23)),
          Severity: S.optional(S.Number),
          Title: S.optional(S.String),
          Type: S.optional(S.String),
          UpdatedAt: S.optional(S.String),
          AssociatedAttackSequenceArn: S.optional(S.String),
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
          }),
        ),
      ).annotate({ identifier: "Finding" });
    case 25:
      return S.Array(__S(2296, __c71, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({ Findings: S.optional(__S(2297, __c71, 25)) }).pipe(
          S.encodeKeys({ Findings: "findings" }),
        ),
      ).annotate({ identifier: "GetFindingsResponse" });
  }
}
function __c72(j: number): any {
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
          AdditionalInfo: S.optional(__S(2304, __c72, 0)),
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
      return S.Array(__S(2305, __c72, 1));
  }
}
function __c73(j: number): any {
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
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }).pipe(
          S.encodeKeys({ Key: "key", Value: "value" }),
        ),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(2368, __c74, 0));
  }
}
function __c75(j: number): any {
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
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AcceptAdministratorInvitationResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingStatisticTypes: S.optional(__S(1888, __c59, 0)),
          FindingCriteria: S.optional(__S(354, __c11, 2)),
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
      return S.Array(__S(2466, __c77, 2));
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
      return S.Array(__S(2468, __c77, 4));
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
      return S.Array(__S(2470, __c77, 6));
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
      return S.Array(__S(2472, __c77, 8));
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
      return S.Array(__S(2474, __c77, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          CountBySeverity: S.optional(__S(2465, __c77, 1)),
          GroupedByAccount: S.optional(__S(2467, __c77, 3)),
          GroupedByDate: S.optional(__S(2469, __c77, 5)),
          GroupedByFindingType: S.optional(__S(2471, __c77, 7)),
          GroupedByResource: S.optional(__S(2473, __c77, 9)),
          GroupedBySeverity: S.optional(__S(2475, __c77, 11)),
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
          FindingStatistics: S.optional(__S(2476, __c77, 12)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ FindingStatistics: "findingStatistics", NextToken: "nextToken" })),
      ).annotate({ identifier: "GetFindingsStatisticsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          InvestigationId: S.String.pipe(T.HttpLabel("InvestigationId")),
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
        S.Struct({ Version: S.optional(S.String), Product: S.optional(__S(2497, __c78, 1)) }).pipe(
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
          InvestigationId: S.optional(S.String),
          Status: S.optional(S.String),
          TriggerPrompt: S.optional(S.String),
          TriggeredBy: S.optional(S.String),
          Metadata: S.optional(__S(2498, __c78, 2)),
          Cloud: S.optional(__S(2499, __c78, 3)),
          RiskLevel: S.optional(S.String),
          Risk: S.optional(S.String),
          Confidence: S.optional(S.String),
          Summary: S.optional(S.String),
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
            StartTime: "startTime",
            EndTime: "endTime",
            Error: "error",
          }),
        ),
      ).annotate({ identifier: "Investigation" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Investigation: S.optional(__S(2500, __c78, 4)) }).pipe(
          S.encodeKeys({ Investigation: "investigation" }),
        ),
      ).annotate({ identifier: "GetInvestigationResponse" });
  }
}
function __c79(j: number): any {
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
function __c80(j: number): any {
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
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Format: S.optional(S.String),
          Location: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c82(j: number): any {
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
      return S.Array(__S(2625, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Role: S.optional(S.String),
          ProtectedResource: S.optional(__S(545, __c17, 1)),
          Actions: S.optional(__S(576, __c18, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusReasons: S.optional(__S(2626, __c82, 2)),
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c83(j: number): any {
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
          EbsVolume: S.optional(__S(1408, __c44, 0)),
          EbsSnapshot: S.optional(__S(2657, __c83, 1)),
        }).pipe(S.encodeKeys({ EbsVolume: "ebsVolume", EbsSnapshot: "ebsSnapshot" })),
      ).annotate({ identifier: "ScannedResourceDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScannedResourceArn: S.optional(S.String),
          ScannedResourceType: S.optional(S.String),
          ScannedResourceStatus: S.optional(S.String),
          ScanStatusReason: S.optional(S.String),
          ResourceDetails: S.optional(__S(2658, __c83, 2)),
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
      return S.Array(__S(2659, __c83, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Role: S.optional(S.String),
          TriggerDetails: S.optional(__S(1472, __c46, 0)),
          IncrementalScanDetails: S.optional(__S(2337, __c73, 1)),
          RecoveryPoint: S.optional(__S(2688, __c84, 0)),
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
          ItemDetails: S.optional(__S(2306, __c72, 2)),
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
      return S.Array(__S(2662, __c83, 6));
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
          Threats: S.optional(__S(2663, __c83, 7)),
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
          ScannedResources: S.optional(__S(2660, __c83, 4)),
          ScanConfiguration: S.optional(__S(2661, __c83, 5)),
          ScanCategory: S.optional(S.String),
          ScanStatus: S.optional(S.String),
          ScanStatusReason: S.optional(S.String),
          ScanType: S.optional(S.String),
          ScanStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanCompletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScanResultDetails: S.optional(__S(2664, __c83, 8)),
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
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupVaultName: S.optional(S.String),
          ContinuousScanDetails: S.optional(__S(2336, __c73, 0)),
        }).pipe(
          S.encodeKeys({
            BackupVaultName: "backupVaultName",
            ContinuousScanDetails: "continuousScanDetails",
          }),
        ),
      ).annotate({ identifier: "ScanConfigurationRecoveryPoint" });
  }
}
function __c85(j: number): any {
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
          ScanResourceCriteria: S.optional(__S(2754, __c86, 2)),
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
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MapEquals: S.optional(__S(2369, __c74, 1)) }).pipe(
          S.encodeKeys({ MapEquals: "mapEquals" }),
        ),
      ).annotate({ identifier: "ScanCondition" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(2752, __c86, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Include: S.optional(__S(2753, __c86, 1)),
          Exclude: S.optional(__S(2753, __c86, 1)),
        }).pipe(S.encodeKeys({ Include: "include", Exclude: "exclude" })),
      ).annotate({ identifier: "ScanResourceCriteria" });
  }
}
function __c87(j: number): any {
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
        S.Struct({ Master: S.optional(__S(1824, __c57, 0)) }).pipe(
          S.encodeKeys({ Master: "master" }),
        ),
      ).annotate({ identifier: "GetMasterAccountResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3360, __c105, 0)),
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
          DataSources: S.optional(__S(2081, __c65, 1)),
          Features: S.optional(__S(2085, __c65, 5)),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            DataSources: "dataSources",
            Features: "features",
          }),
        ),
      ).annotate({ identifier: "MemberDataSourceConfiguration" });
    case 2:
      return S.Array(__S(2817, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MemberDataSourceConfigurations: S.optional(__S(2818, __c88, 2)),
          UnprocessedAccounts: S.optional(__S(673, __c21, 1)),
        }).pipe(
          S.encodeKeys({
            MemberDataSourceConfigurations: "members",
            UnprocessedAccounts: "unprocessedAccounts",
          }),
        ),
      ).annotate({ identifier: "GetMemberDetectorsResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3360, __c105, 0)),
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
          Members: S.optional(__S(2881, __c90, 1)),
          UnprocessedAccounts: S.optional(__S(673, __c21, 1)),
        }).pipe(S.encodeKeys({ Members: "members", UnprocessedAccounts: "unprocessedAccounts" })),
      ).annotate({ identifier: "GetMembersResponse" });
  }
}
function __c90(j: number): any {
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
      return S.Array(__S(2880, __c90, 0));
  }
}
function __c91(j: number): any {
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
function __c92(j: number): any {
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
      return S.Array(__S(2945, __c92, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          EnabledAccountsCount: S.optional(S.Number),
          AdditionalConfiguration: S.optional(__S(2946, __c92, 2)),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            EnabledAccountsCount: "enabledAccountsCount",
            AdditionalConfiguration: "additionalConfiguration",
          }),
        ),
      ).annotate({ identifier: "OrganizationFeatureStatistics" });
    case 4:
      return S.Array(__S(2947, __c92, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          TotalAccountsCount: S.optional(S.Number),
          MemberAccountsCount: S.optional(S.Number),
          ActiveAccountsCount: S.optional(S.Number),
          EnabledAccountsCount: S.optional(S.Number),
          CountByFeature: S.optional(__S(2948, __c92, 4)),
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
          OrganizationStatistics: S.optional(__S(2949, __c92, 5)),
        }).pipe(
          S.encodeKeys({
            UpdatedAt: "updatedAt",
            OrganizationStatistics: "organizationStatistics",
          }),
        ),
      ).annotate({ identifier: "OrganizationDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({ OrganizationDetails: S.optional(__S(2950, __c92, 6)) }).pipe(
          S.encodeKeys({ OrganizationDetails: "organizationDetails" }),
        ),
      ).annotate({ identifier: "GetOrganizationStatisticsResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: __S(3360, __c105, 0),
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
        S.Struct({ AuditLogs: S.optional(__S(2977, __c93, 1)) }).pipe(
          S.encodeKeys({ AuditLogs: "auditLogs" }),
        ),
      ).annotate({ identifier: "KubernetesDataSourceFreeTrial" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ScanEc2InstanceWithFindings: S.optional(__S(2977, __c93, 1)) }).pipe(
          S.encodeKeys({ ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings" }),
        ),
      ).annotate({ identifier: "MalwareProtectionDataSourceFreeTrial" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CloudTrail: S.optional(__S(2977, __c93, 1)),
          DnsLogs: S.optional(__S(2977, __c93, 1)),
          FlowLogs: S.optional(__S(2977, __c93, 1)),
          S3Logs: S.optional(__S(2977, __c93, 1)),
          Kubernetes: S.optional(__S(2978, __c93, 2)),
          MalwareProtection: S.optional(__S(2979, __c93, 3)),
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
      return S.Array(__S(2981, __c93, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          DataSources: S.optional(__S(2980, __c93, 4)),
          Features: S.optional(__S(2982, __c93, 6)),
        }).pipe(
          S.encodeKeys({
            AccountId: "accountId",
            DataSources: "dataSources",
            Features: "features",
          }),
        ),
      ).annotate({ identifier: "AccountFreeTrialInfo" });
    case 8:
      return S.Array(__S(2983, __c93, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Accounts: S.optional(__S(2984, __c93, 8)),
          UnprocessedAccounts: S.optional(__S(673, __c21, 1)),
        }).pipe(S.encodeKeys({ Accounts: "accounts", UnprocessedAccounts: "unprocessedAccounts" })),
      ).annotate({ identifier: "GetRemainingFreeTrialDaysResponse" });
  }
}
function __c94(j: number): any {
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
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Format: S.optional(S.String),
          Location: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(3744, __c117, 0)),
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
function __c96(j: number): any {
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
function __c97(j: number): any {
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
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountIds: S.optional(__S(3360, __c105, 0)),
          DataSources: S.optional(__S(1888, __c59, 0)),
          Resources: S.optional(__S(3360, __c105, 0)),
          Features: S.optional(__S(1888, __c59, 0)),
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
          UsageCriteria: S.optional(__S(3136, __c98, 0)),
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
        S.Struct({ AccountId: S.optional(S.String), Total: S.optional(__S(3138, __c98, 2)) }).pipe(
          S.encodeKeys({ AccountId: "accountId", Total: "total" }),
        ),
      ).annotate({ identifier: "UsageAccountResult" });
    case 4:
      return S.Array(__S(3139, __c98, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Feature: S.optional(S.String), Accounts: S.optional(__S(3140, __c98, 4)) }).pipe(
          S.encodeKeys({ Feature: "feature", Accounts: "accounts" }),
        ),
      ).annotate({ identifier: "UsageTopAccountsResult" });
    case 6:
      return S.Array(__S(3141, __c98, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ DataSource: S.optional(S.String), Total: S.optional(__S(3138, __c98, 2)) }).pipe(
          S.encodeKeys({ DataSource: "dataSource", Total: "total" }),
        ),
      ).annotate({ identifier: "UsageDataSourceResult" });
    case 8:
      return S.Array(__S(3143, __c98, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ Resource: S.optional(S.String), Total: S.optional(__S(3138, __c98, 2)) }).pipe(
          S.encodeKeys({ Resource: "resource", Total: "total" }),
        ),
      ).annotate({ identifier: "UsageResourceResult" });
    case 10:
      return S.Array(__S(3145, __c98, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ Feature: S.optional(S.String), Total: S.optional(__S(3138, __c98, 2)) }).pipe(
          S.encodeKeys({ Feature: "feature", Total: "total" }),
        ),
      ).annotate({ identifier: "UsageFeatureResult" });
    case 12:
      return S.Array(__S(3147, __c98, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          SumByAccount: S.optional(__S(3140, __c98, 4)),
          TopAccountsByFeature: S.optional(__S(3142, __c98, 6)),
          SumByDataSource: S.optional(__S(3144, __c98, 8)),
          SumByResource: S.optional(__S(3146, __c98, 10)),
          TopResources: S.optional(__S(3146, __c98, 10)),
          SumByFeature: S.optional(__S(3148, __c98, 12)),
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
          UsageStatistics: S.optional(__S(3149, __c98, 13)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ UsageStatistics: "usageStatistics", NextToken: "nextToken" })),
      ).annotate({ identifier: "GetUsageStatisticsResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3360, __c105, 0)),
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
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          FilterCriteria: S.optional(__S(1923, __c60, 3)),
          SortCriteria: S.optional(__S(3232, __c101, 0)),
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
          AddonDetails: S.optional(__S(3201, __c100, 1)),
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
          Issues: S.optional(__S(3360, __c105, 0)),
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
          FargateDetails: S.optional(__S(3203, __c100, 3)),
          ContainerInstanceDetails: S.optional(__S(3204, __c100, 4)),
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
          AgentDetails: S.optional(__S(3206, __c100, 6)),
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
          EksClusterDetails: S.optional(__S(3202, __c100, 2)),
          EcsClusterDetails: S.optional(__S(3205, __c100, 5)),
          Ec2InstanceDetails: S.optional(__S(3207, __c100, 7)),
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
          ResourceDetails: S.optional(__S(3208, __c100, 8)),
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
      return S.Array(__S(3209, __c100, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Resources: S.optional(__S(3210, __c100, 10)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Resources: "resources", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListCoverageResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), OrderBy: S.optional(S.String) }).pipe(
          S.encodeKeys({ AttributeName: "attributeName", OrderBy: "orderBy" }),
        ),
      ).annotate({ identifier: "CoverageSortCriteria" });
  }
}
function __c102(j: number): any {
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
      return S.Array(__S(3265, __c102, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RuleAssociations: S.optional(__S(3266, __c102, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ RuleAssociations: "ruleAssociations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListCustomDetectionRuleAssociationsResponse" });
  }
}
function __c103(j: number): any {
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
      return S.Array(__S(3297, __c103, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Configurations: S.optional(__S(3298, __c103, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Configurations: "configurations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListCustomDetectionRuleOrgConfigurationsResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingIds: S.optional(__S(3360, __c105, 0)),
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
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Values: S.optional(__S(3360, __c105, 0)),
          Condition: S.optional(S.String),
        }).pipe(S.encodeKeys({ Name: "name", Values: "values", Condition: "condition" })),
      ).annotate({ identifier: "DetectionRuleFilter" });
    case 1:
      return S.Array(__S(3392, __c106, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(3393, __c106, 1)),
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
      return S.Array(__S(3395, __c106, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Rules: S.optional(__S(3396, __c106, 4)), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Rules: "rules", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListCustomDetectionRulesResponse" });
  }
}
function __c107(j: number): any {
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
          DetectorIds: S.optional(__S(3360, __c105, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ DetectorIds: "detectorIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListDetectorsResponse" });
  }
}
function __c108(j: number): any {
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
          FilterNames: S.optional(__S(3360, __c105, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ FilterNames: "filterNames", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListFiltersResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingCriteria: S.optional(__S(354, __c11, 2)),
          SortCriteria: S.optional(__S(1440, __c45, 0)),
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
          FindingIds: S.optional(__S(3360, __c105, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ FindingIds: "findingIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListFindingsResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          SortCriteria: S.optional(__S(3232, __c101, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
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
    case 1:
      return S.suspend(() =>
        S.Struct({
          InvestigationId: S.optional(S.String),
          Status: S.optional(S.String),
          TriggerPrompt: S.optional(S.String),
          RiskLevel: S.optional(S.String),
          Confidence: S.optional(S.String),
          Title: S.optional(S.String),
          AccountId: S.optional(S.String),
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
            AccountId: "accountId",
            StartTime: "startTime",
            EndTime: "endTime",
          }),
        ),
      ).annotate({ identifier: "InvestigationSummary" });
    case 2:
      return S.Array(__S(3521, __c110, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Investigations: S.optional(__S(3522, __c110, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Investigations: "investigations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListInvestigationsResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/invitation" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInvitationsRequest" });
    case 1:
      return S.Array(__S(1824, __c57, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Invitations: S.optional(__S(3553, __c111, 1)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Invitations: "invitations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListInvitationsResponse" });
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
          IpSetIds: S.optional(__S(3360, __c105, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ IpSetIds: "ipSetIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListIPSetsResponse" });
  }
}
function __c113(j: number): any {
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
      return S.Array(__S(608, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MalwareProtectionPlans: S.optional(__S(3617, __c113, 1)),
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
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ListMalwareScansCriterionKey: S.optional(S.String),
          FilterCondition: S.optional(__S(1504, __c47, 0)),
        }).pipe(
          S.encodeKeys({
            ListMalwareScansCriterionKey: "criterionKey",
            FilterCondition: "filterCondition",
          }),
        ),
      ).annotate({ identifier: "ListMalwareScansFilterCriterion" });
    case 1:
      return S.Array(__S(3648, __c114, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ListMalwareScansFilterCriterion: S.optional(__S(3649, __c114, 1)) }).pipe(
          S.encodeKeys({ ListMalwareScansFilterCriterion: "filterCriterion" }),
        ),
      ).annotate({ identifier: "ListMalwareScansFilterCriteria" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          FilterCriteria: S.optional(__S(3650, __c114, 2)),
          SortCriteria: S.optional(__S(1440, __c45, 0)),
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
      return S.Array(__S(3652, __c114, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Scans: S.optional(__S(3653, __c114, 5)), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Scans: "scans", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListMalwareScansResponse" });
  }
}
function __c115(j: number): any {
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
          Members: S.optional(__S(2881, __c90, 1)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Members: "members", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListMembersResponse" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          Mode: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(3744, __c117, 0)),
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
        S.Struct({ RuleAssociation: S.optional(__S(3776, __c118, 0)) }).pipe(
          S.encodeKeys({ RuleAssociation: "ruleAssociation" }),
        ),
      ).annotate({ identifier: "CreateCustomDetectionRuleAssociationResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c118(j: number): any {
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
function __c119(j: number): any {
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
      return S.Array(__S(3809, __c119, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdminAccounts: S.optional(__S(3810, __c119, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ AdminAccounts: "adminAccounts", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListOrganizationAdminAccountsResponse" });
  }
}
function __c120(j: number): any {
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
      return S.Array(__S(3841, __c120, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__S(3842, __c120, 2)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Destinations: "destinations", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListPublishingDestinationsResponse" });
  }
}
function __c121(j: number): any {
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
        S.Struct({ Tags: S.optional(__S(3744, __c117, 0)) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c122(j: number): any {
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
          ThreatEntitySetIds: S.optional(__S(3360, __c105, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ ThreatEntitySetIds: "threatEntitySetIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListThreatEntitySetsResponse" });
  }
}
function __c123(j: number): any {
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
          ThreatIntelSetIds: S.optional(__S(3360, __c105, 0)),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ ThreatIntelSetIds: "threatIntelSetIds", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListThreatIntelSetsResponse" });
  }
}
function __c124(j: number): any {
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
          TrustedEntitySetIds: S.optional(__S(3360, __c105, 0)),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ TrustedEntitySetIds: "trustedEntitySetIds", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListTrustedEntitySetsResponse" });
  }
}
function __c125(j: number): any {
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
        S.Struct({ S3Object: S.optional(__S(4000, __c125, 0)) })
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
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Role: S.optional(S.String),
          IncrementalScanDetails: S.optional(__S(2337, __c73, 1)),
          RecoveryPoint: S.optional(__S(2688, __c84, 0)),
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
          ScanConfiguration: S.optional(__S(4032, __c126, 0)),
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
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3360, __c105, 0)),
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
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          AccountIds: S.optional(__S(3360, __c105, 0)),
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
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          Mode: S.optional(S.String),
          IncludeAccountIds: S.optional(__S(3360, __c105, 0)),
          ExcludeAccountIds: S.optional(__S(3360, __c105, 0)),
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
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String).pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(3744, __c117, 0),
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
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingIds: S.optional(__S(3360, __c105, 0)),
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
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__S(3360, __c105, 0)).pipe(T.HttpQuery("tagKeys")),
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
function __c133(j: number): any {
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
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String.pipe(T.HttpLabel("RuleId")),
          Mode: S.optional(S.String),
          IncludeAccountIds: S.optional(__S(3360, __c105, 0)),
          ExcludeAccountIds: S.optional(__S(3360, __c105, 0)),
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
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          Enable: S.optional(S.Boolean),
          FindingPublishingFrequency: S.optional(S.String),
          DataSources: S.optional(__S(68, __c2, 4)),
          Features: S.optional(__S(72, __c2, 8)),
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
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FilterName: S.String.pipe(T.HttpLabel("FilterName")),
          Description: S.optional(S.String),
          Action: S.optional(S.String),
          Rank: S.optional(S.Number),
          FindingCriteria: S.optional(__S(354, __c11, 2)),
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
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
          FindingIds: S.optional(__S(3360, __c105, 0)),
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
function __c138(j: number): any {
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
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ObjectPrefixes: S.optional(__S(3360, __c105, 0)) }).pipe(
          S.encodeKeys({ ObjectPrefixes: "objectPrefixes" }),
        ),
      ).annotate({ identifier: "UpdateS3BucketResource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ S3Bucket: S.optional(__S(4448, __c139, 0)) }).pipe(
          S.encodeKeys({ S3Bucket: "s3Bucket" }),
        ),
      ).annotate({ identifier: "UpdateProtectedResource" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MalwareProtectionPlanId: S.String.pipe(T.HttpLabel("MalwareProtectionPlanId")),
          Role: S.optional(S.String),
          Actions: S.optional(__S(576, __c18, 0)),
          ProtectedResource: S.optional(__S(4449, __c139, 1)),
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
