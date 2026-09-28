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
  sdkId: "GuardDuty",
  target: "GuardDutyAPIService",
  version: "2017-11-28",
  sigv4: "guardduty",
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
              return e(
                `https://guardduty-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://guardduty.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://guardduty.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    renames: { Message: "message", Type: "type" },
  })<{ readonly message?: string; readonly Type?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400, renames: { Message: "message", Type: "type" } },
  )<{ readonly message?: string; readonly Type?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    renames: { Message: "message", Type: "type" },
  })<{ readonly message?: string; readonly Type?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500, renames: { Message: "message", Type: "type" } },
  )<{ readonly message?: string; readonly Type?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404, renames: { Message: "message", Type: "type" } },
  )<{ readonly message?: string; readonly Type?: string }> {}
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
export type ClientToken = string;
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
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
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
export type DetectorAdditionalConfigurations =
  DetectorAdditionalConfiguration[];
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
export type AccountId = string;
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
export type MalwareProtectionPlanTaggingActionStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
export type ScanStatus =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
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
export type OrganizationFeaturesConfigurationsResults =
  OrganizationFeatureConfigurationResult[];
export type AutoEnableMembers = "NEW" | "ALL" | "NONE" | (string & {});
export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean;
  MemberAccountLimitReached: boolean;
  DataSources?: OrganizationDataSourceConfigurationsResult & {
    S3Logs: OrganizationS3LogsConfigurationResult & { AutoEnable: boolean };
    Kubernetes: OrganizationKubernetesConfigurationResult & {
      AuditLogs: OrganizationKubernetesAuditLogsConfigurationResult & {
        AutoEnable: boolean;
      };
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
export interface DetectorAdditionalConfigurationResult {
  Name?: FeatureAdditionalConfiguration;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
}
export type DetectorAdditionalConfigurationResults =
  DetectorAdditionalConfigurationResult[];
export interface DetectorFeatureConfigurationResult {
  Name?: DetectorFeatureResult;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
  AdditionalConfiguration?: DetectorAdditionalConfigurationResult[];
}
export type DetectorFeatureConfigurationsResults =
  DetectorFeatureConfigurationResult[];
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
      AuditLogs: KubernetesAuditLogsConfigurationResult & {
        Status: DataSourceStatus;
      };
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
export type ConfidenceLevel =
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "NONE"
  | (string & {});
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
export type AnomalyProfileFeatures = {
  [key: string]: AnomalyObject[] | undefined;
};
export type AnomalyProfiles = {
  [key: string]: { [key: string]: AnomalyObject[] | undefined } | undefined;
};
export type AnomalyUnusualBehaviorFeature = {
  [key: string]: AnomalyObject | undefined;
};
export type Behavior = {
  [key: string]: { [key: string]: AnomalyObject | undefined } | undefined;
};
export interface AnomalyUnusual {
  Behavior?: {
    [key: string]: { [key: string]: AnomalyObject | undefined } | undefined;
  };
}
export interface Anomaly {
  Profiles?: {
    [key: string]: { [key: string]: AnomalyObject[] | undefined } | undefined;
  };
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
  | (string & {});
export type PublicAccessStatus = "BLOCKED" | "ALLOWED" | (string & {});
export type PublicAclIgnoreBehavior = "IGNORED" | "NOT_IGNORED" | (string & {});
export type PublicBucketRestrictBehavior =
  | "RESTRICTED"
  | "NOT_RESTRICTED"
  | (string & {});
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
            Data: ResourceData & {
              Container: ContainerFindingResource & { Image: string };
            };
          })[];
          Endpoints: (NetworkEndpoint & {
            Id: string;
            Location: NetworkGeoLocation & {
              City: string;
              Country: string;
              Latitude: number;
              Longitude: number;
            };
            AutonomousSystem: AutonomousSystem & {
              Name: string;
              Number: number;
            };
            Connection: NetworkConnection & { Direction: NetworkDirection };
          })[];
          SequenceIndicators: (Indicator & { Key: IndicatorType })[];
        };
      };
      MalwareScanDetails: MalwareScanDetails & {
        ScanConfiguration: MalwareProtectionFindingsScanConfiguration & {
          IncrementalScanDetails: IncrementalScanDetails & {
            BaselineResourceArn: NonEmptyString;
          };
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
export type InvestigationStatus =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
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
export type RiskLevel =
  | "Info"
  | "Low"
  | "Medium"
  | "High"
  | "Critical"
  | (string & {});
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
    Metadata: InvestigationMetadata & {
      Version: string;
      Product: Product & { Name: string };
    };
    Cloud: CloudDetails & {
      Provider: CloudProvider;
      Region: string;
      Account: string;
    };
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
export type MalwareProtectionPlanStatus =
  | "ACTIVE"
  | "WARNING"
  | "ERROR"
  | (string & {});
export interface MalwareProtectionPlanStatusReason {
  Code?: string;
  Message?: string;
}
export type MalwareProtectionPlanStatusReasonsList =
  MalwareProtectionPlanStatusReason[];
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
export type ScanResultStatus =
  | "NO_THREATS_FOUND"
  | "THREATS_FOUND"
  | (string & {});
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
    IncrementalScanDetails: IncrementalScanDetails & {
      BaselineResourceArn: NonEmptyString;
    };
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
export type EbsSnapshotPreservation =
  | "NO_RETENTION"
  | "RETENTION_WITH_FINDING"
  | (string & {});
export interface GetMalwareScanSettingsResponse {
  ScanResourceCriteria?: ScanResourceCriteria & {
    Include: {
      [key: string]:
        | (ScanCondition & {
            MapEquals: (ScanConditionPair & { Key: TagKey })[];
          })
        | undefined;
    };
    Exclude: {
      [key: string]:
        | (ScanCondition & {
            MapEquals: (ScanConditionPair & { Key: TagKey })[];
          })
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
}
export type MemberAdditionalConfigurationResults =
  MemberAdditionalConfigurationResult[];
export interface MemberFeaturesConfigurationResult {
  Name?: OrgFeature;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
  AdditionalConfiguration?: MemberAdditionalConfigurationResult[];
}
export type MemberFeaturesConfigurationsResults =
  MemberFeaturesConfigurationResult[];
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
        AuditLogs: KubernetesAuditLogsConfigurationResult & {
          Status: DataSourceStatus;
        };
      };
    };
  })[];
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
export type OrganizationFeatureStatisticsResults =
  OrganizationFeatureStatistics[];
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
export type FreeTrialFeatureConfigurationsResults =
  FreeTrialFeatureConfigurationResult[];
export interface AccountFreeTrialInfo {
  AccountId?: string;
  DataSources?: DataSourcesFreeTrial;
  Features?: FreeTrialFeatureConfigurationResult[];
}
export type AccountFreeTrialInfos = AccountFreeTrialInfo[];
export interface GetRemainingFreeTrialDaysResponse {
  Accounts?: AccountFreeTrialInfo[];
  UnprocessedAccounts?: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
export type ManagementType =
  | "AUTO_MANAGED"
  | "MANUAL"
  | "DISABLED"
  | (string & {});
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
export type ListMalwareScansFilterCriterionList =
  ListMalwareScansFilterCriterion[];
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export interface StopMonitoringMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export interface StopMonitoringMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
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
export type OrganizationAdditionalConfigurations =
  OrganizationAdditionalConfiguration[];
export interface OrganizationFeatureConfiguration {
  Name?: OrgFeature;
  AutoEnable?: OrgFeatureStatus;
  AdditionalConfiguration?: OrganizationAdditionalConfiguration[];
}
export type OrganizationFeaturesConfigurations =
  OrganizationFeatureConfiguration[];
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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/administrator",
    input: {
      DetectorId: 0,
      AdministratorId: D.m({ wire: "administratorId" }),
      InvitationId: D.m({ wire: "invitationId" }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAdministratorInvitation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/master",
    input: {
      DetectorId: 0,
      MasterId: D.m({ wire: "masterId" }),
      InvitationId: D.m({ wire: "invitationId" }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInvitation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/findings/archive",
    input: { DetectorId: 0, FindingIds: D.m({ wire: "findingIds" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveFindings",
})) as any;

export type CreateDetectorError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /detector",
    input: {
      Enable: D.m({ wire: "enable" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      FindingPublishingFrequency: D.m({ wire: "findingPublishingFrequency" }),
      DataSources: D.m({
        wire: "dataSources",
        shape: i_DataSourceConfigurations,
      }),
      Tags: D.m({ wire: "tags" }),
      Features: D.m({
        wire: "features",
        shape: D.list(i_DetectorFeatureConfiguration),
      }),
    },
    output: {
      DetectorId: D.m({ wire: "detectorId" }),
      UnprocessedDataSources: D.m({
        wire: "unprocessedDataSources",
        shape: {
          MalwareProtection: D.m({
            wire: "malwareProtection",
            shape: o_MalwareProtectionConfigurationResult,
          }),
        },
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDetector",
})) as any;

export type CreateFilterError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a filter using the specified finding criteria. The maximum number of saved filters per Amazon Web Services account per Region is 100. For more information, see Quotas for GuardDuty.
 */
export const createFilter: API.OperationMethod<
  CreateFilterRequest,
  CreateFilterResponse,
  CreateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/filter",
    input: {
      DetectorId: 0,
      Name: D.m({ wire: "name" }),
      Description: D.m({ wire: "description" }),
      Action: D.m({ wire: "action" }),
      Rank: D.m({ wire: "rank" }),
      FindingCriteria: D.m({
        wire: "findingCriteria",
        shape: i_FindingCriteria,
      }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { Name: D.m({ wire: "name" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFilter",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/investigation",
    input: {
      DetectorId: 0,
      TriggerPrompt: D.m({ wire: "triggerPrompt" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
    },
    output: { InvestigationId: D.m({ wire: "investigationId" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvestigation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/ipset",
    input: {
      DetectorId: 0,
      Name: D.m({ wire: "name" }),
      Format: D.m({ wire: "format" }),
      Location: D.m({ wire: "location" }),
      Activate: D.m({ wire: "activate" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      Tags: D.m({ wire: "tags" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
    },
    output: { IpSetId: D.m({ wire: "ipSetId" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIPSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /malware-protection-plan",
    input: {
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      Role: D.m({ wire: "role" }),
      ProtectedResource: D.m({
        wire: "protectedResource",
        shape: {
          S3Bucket: D.m({
            wire: "s3Bucket",
            shape: {
              BucketName: D.m({ wire: "bucketName" }),
              ObjectPrefixes: D.m({ wire: "objectPrefixes" }),
            },
          }),
        },
      }),
      Actions: D.m({ wire: "actions", shape: i_MalwareProtectionPlanActions }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      MalwareProtectionPlanId: D.m({ wire: "malwareProtectionPlanId" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMalwareProtectionPlan",
})) as any;

export type CreateMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member",
    input: {
      DetectorId: 0,
      AccountDetails: D.m({
        wire: "accountDetails",
        shape: D.list({
          AccountId: D.m({ wire: "accountId" }),
          Email: D.m({ wire: "email" }),
        }),
      }),
    },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/publishingDestination",
    input: {
      DetectorId: 0,
      DestinationType: D.m({ wire: "destinationType" }),
      DestinationProperties: D.m({
        wire: "destinationProperties",
        shape: i_DestinationProperties,
      }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { DestinationId: D.m({ wire: "destinationId" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublishingDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/findings/create",
    input: { DetectorId: 0, FindingTypes: D.m({ wire: "findingTypes" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSampleFindings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/threatentityset",
    input: {
      DetectorId: 0,
      Name: D.m({ wire: "name" }),
      Format: D.m({ wire: "format" }),
      Location: D.m({ wire: "location" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
      Activate: D.m({ wire: "activate" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { ThreatEntitySetId: D.m({ wire: "threatEntitySetId" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatEntitySet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/threatintelset",
    input: {
      DetectorId: 0,
      Name: D.m({ wire: "name" }),
      Format: D.m({ wire: "format" }),
      Location: D.m({ wire: "location" }),
      Activate: D.m({ wire: "activate" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      Tags: D.m({ wire: "tags" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
    },
    output: { ThreatIntelSetId: D.m({ wire: "threatIntelSetId" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatIntelSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/trustedentityset",
    input: {
      DetectorId: 0,
      Name: D.m({ wire: "name" }),
      Format: D.m({ wire: "format" }),
      Location: D.m({ wire: "location" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
      Activate: D.m({ wire: "activate" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { TrustedEntitySetId: D.m({ wire: "trustedEntitySetId" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustedEntitySet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /invitation/decline",
    input: { AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineInvitations",
})) as any;

export type DeleteDetectorError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes an Amazon GuardDuty detector that is specified by the detector ID.
 */
export const deleteDetector: API.OperationMethod<
  DeleteDetectorRequest,
  DeleteDetectorResponse,
  DeleteDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /detector/{DetectorId}",
    input: { DetectorId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDetector",
})) as any;

export type DeleteFilterError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the filter specified by the filter name.
 */
export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest,
  DeleteFilterResponse,
  DeleteFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /detector/{DetectorId}/filter/{FilterName}",
    input: { DetectorId: 0, FilterName: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFilter",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /invitation/delete",
    input: { AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvitations",
})) as any;

export type DeleteIPSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the IPSet specified by the `ipSetId`. IPSets are called trusted IP lists in the console user interface.
 */
export const deleteIPSet: API.OperationMethod<
  DeleteIPSetRequest,
  DeleteIPSetResponse,
  DeleteIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /detector/{DetectorId}/ipset/{IpSetId}",
    input: { DetectorId: 0, IpSetId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIPSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /malware-protection-plan/{MalwareProtectionPlanId}",
    input: { MalwareProtectionPlanId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMalwareProtectionPlan",
})) as any;

export type DeleteMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member/delete",
    input: { DetectorId: 0, AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /detector/{DetectorId}/publishingDestination/{DestinationId}",
    input: { DetectorId: 0, DestinationId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublishingDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
    input: { DetectorId: 0, ThreatEntitySetId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThreatEntitySet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
    input: { DetectorId: 0, ThreatIntelSetId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThreatIntelSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
    input: { DetectorId: 0, TrustedEntitySetId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustedEntitySet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/malware-scans",
    input: {
      DetectorId: 0,
      NextToken: D.m({ wire: "nextToken" }),
      MaxResults: D.m({ wire: "maxResults" }),
      FilterCriteria: D.m({
        wire: "filterCriteria",
        shape: {
          FilterCriterion: D.m({
            wire: "filterCriterion",
            shape: D.list({
              CriterionKey: D.m({ wire: "criterionKey" }),
              FilterCondition: D.m({
                wire: "filterCondition",
                shape: i_FilterCondition,
              }),
            }),
          }),
        },
      }),
      SortCriteria: D.m({ wire: "sortCriteria", shape: i_SortCriteria }),
    },
    output: {
      Scans: D.m({
        wire: "scans",
        shape: D.list({
          DetectorId: D.m({ wire: "detectorId" }),
          AdminDetectorId: D.m({ wire: "adminDetectorId" }),
          ScanId: D.m({ wire: "scanId" }),
          ScanStatus: D.m({ wire: "scanStatus" }),
          FailureReason: D.m({ wire: "failureReason" }),
          ScanStartTime: D.m({ wire: "scanStartTime", shape: D.ts }),
          ScanEndTime: D.m({ wire: "scanEndTime", shape: D.ts }),
          TriggerDetails: D.m({
            wire: "triggerDetails",
            shape: o_TriggerDetails,
          }),
          ResourceDetails: D.m({
            wire: "resourceDetails",
            shape: { InstanceArn: D.m({ wire: "instanceArn" }) },
          }),
          ScanResultDetails: D.m({
            wire: "scanResultDetails",
            shape: { ScanResult: D.m({ wire: "scanResult" }) },
          }),
          AccountId: D.m({ wire: "accountId" }),
          TotalBytes: D.m({ wire: "totalBytes" }),
          FileCount: D.m({ wire: "fileCount" }),
          AttachedVolumes: D.m({
            wire: "attachedVolumes",
            shape: D.list(o_VolumeDetail),
          }),
          ScanType: D.m({ wire: "scanType" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/admin",
    input: {
      DetectorId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      AutoEnable: D.m({ wire: "autoEnable" }),
      MemberAccountLimitReached: D.m({ wire: "memberAccountLimitReached" }),
      DataSources: D.m({
        wire: "dataSources",
        shape: {
          S3Logs: D.m({
            wire: "s3Logs",
            shape: { AutoEnable: D.m({ wire: "autoEnable" }) },
          }),
          Kubernetes: D.m({
            wire: "kubernetes",
            shape: {
              AuditLogs: D.m({
                wire: "auditLogs",
                shape: { AutoEnable: D.m({ wire: "autoEnable" }) },
              }),
            },
          }),
          MalwareProtection: D.m({
            wire: "malwareProtection",
            shape: {
              ScanEc2InstanceWithFindings: D.m({
                wire: "scanEc2InstanceWithFindings",
                shape: {
                  EbsVolumes: D.m({
                    wire: "ebsVolumes",
                    shape: { AutoEnable: D.m({ wire: "autoEnable" }) },
                  }),
                },
              }),
            },
          }),
        },
      }),
      Features: D.m({
        wire: "features",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          AutoEnable: D.m({ wire: "autoEnable" }),
          AdditionalConfiguration: D.m({
            wire: "additionalConfiguration",
            shape: D.list({
              Name: D.m({ wire: "name" }),
              AutoEnable: D.m({ wire: "autoEnable" }),
            }),
          }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
      AutoEnableOrganizationMembers: D.m({
        wire: "autoEnableOrganizationMembers",
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/publishingDestination/{DestinationId}",
    input: { DetectorId: 0, DestinationId: 0 },
    output: {
      DestinationId: D.m({ wire: "destinationId" }),
      DestinationType: D.m({ wire: "destinationType" }),
      Status: D.m({ wire: "status" }),
      PublishingFailureStartTimestamp: D.m({
        wire: "publishingFailureStartTimestamp",
      }),
      DestinationProperties: D.m({
        wire: "destinationProperties",
        shape: {
          DestinationArn: D.m({ wire: "destinationArn" }),
          KmsKeyArn: D.m({ wire: "kmsKeyArn" }),
        },
      }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePublishingDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /admin/disable",
    input: { AdminAccountId: D.m({ wire: "adminAccountId" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/administrator/disassociate",
    input: { DetectorId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromAdministratorAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/master/disassociate",
    input: { DetectorId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromMasterAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member/disassociate",
    input: { DetectorId: 0, AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMembers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /admin/enable",
    input: { AdminAccountId: D.m({ wire: "adminAccountId" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/administrator",
    input: { DetectorId: 0 },
    output: {
      Administrator: D.m({
        wire: "administrator",
        shape: {
          AccountId: D.m({ wire: "accountId" }),
          InvitationId: D.m({ wire: "invitationId" }),
          RelationshipStatus: D.m({ wire: "relationshipStatus" }),
          InvitedAt: D.m({ wire: "invitedAt" }),
        },
      }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdministratorAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/coverage/statistics",
    input: {
      DetectorId: 0,
      FilterCriteria: D.m({
        wire: "filterCriteria",
        shape: i_CoverageFilterCriteria,
      }),
      StatisticsType: D.m({ wire: "statisticsType" }),
    },
    output: {
      CoverageStatistics: D.m({
        wire: "coverageStatistics",
        shape: {
          CountByResourceType: D.m({ wire: "countByResourceType" }),
          CountByCoverageStatus: D.m({ wire: "countByCoverageStatus" }),
        },
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoverageStatistics",
})) as any;

export type GetDetectorError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}",
    input: { DetectorId: 0 },
    output: {
      CreatedAt: D.m({ wire: "createdAt" }),
      FindingPublishingFrequency: D.m({ wire: "findingPublishingFrequency" }),
      ServiceRole: D.m({ wire: "serviceRole" }),
      Status: D.m({ wire: "status" }),
      UpdatedAt: D.m({ wire: "updatedAt" }),
      DataSources: D.m({
        wire: "dataSources",
        shape: o_DataSourceConfigurationsResult,
      }),
      Tags: D.m({ wire: "tags" }),
      Features: D.m({
        wire: "features",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          Status: D.m({ wire: "status" }),
          UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
          AdditionalConfiguration: D.m({
            wire: "additionalConfiguration",
            shape: D.list({
              Name: D.m({ wire: "name" }),
              Status: D.m({ wire: "status" }),
              UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
            }),
          }),
        }),
      }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDetector",
})) as any;

export type GetFilterError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns the details of the filter specified by the filter name.
 */
export const getFilter: API.OperationMethod<
  GetFilterRequest,
  GetFilterResponse,
  GetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/filter/{FilterName}",
    input: { DetectorId: 0, FilterName: 0 },
    output: {
      Name: D.m({ wire: "name" }),
      Description: D.m({ wire: "description" }),
      Action: D.m({ wire: "action" }),
      Rank: D.m({ wire: "rank" }),
      FindingCriteria: D.m({
        wire: "findingCriteria",
        shape: {
          Criterion: D.m({
            wire: "criterion",
            shape: D.map({
              Eq: D.m({ wire: "eq" }),
              Neq: D.m({ wire: "neq" }),
              Gt: D.m({ wire: "gt" }),
              Gte: D.m({ wire: "gte" }),
              Lt: D.m({ wire: "lt" }),
              Lte: D.m({ wire: "lte" }),
              Equals: D.m({ wire: "equals" }),
              NotEquals: D.m({ wire: "notEquals" }),
              GreaterThan: D.m({ wire: "greaterThan" }),
              GreaterThanOrEqual: D.m({ wire: "greaterThanOrEqual" }),
              LessThan: D.m({ wire: "lessThan" }),
              LessThanOrEqual: D.m({ wire: "lessThanOrEqual" }),
              Matches: D.m({ wire: "matches" }),
              NotMatches: D.m({ wire: "notMatches" }),
            }),
          }),
        },
      }),
      Tags: D.m({ wire: "tags" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
      Version: D.m({ wire: "version" }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFilter",
})) as any;

export type GetFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Describes Amazon GuardDuty findings specified by finding IDs.
 */
export const getFindings: API.OperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/findings/get",
    input: {
      DetectorId: 0,
      FindingIds: D.m({ wire: "findingIds" }),
      SortCriteria: D.m({ wire: "sortCriteria", shape: i_SortCriteria }),
    },
    output: {
      Findings: D.m({
        wire: "findings",
        shape: D.list({
          AccountId: D.m({ wire: "accountId" }),
          Arn: D.m({ wire: "arn" }),
          Confidence: D.m({ wire: "confidence" }),
          CreatedAt: D.m({ wire: "createdAt" }),
          Description: D.m({ wire: "description" }),
          Id: D.m({ wire: "id" }),
          Partition: D.m({ wire: "partition" }),
          Region: D.m({ wire: "region" }),
          Resource: D.m({
            wire: "resource",
            shape: {
              AccessKeyDetails: D.m({
                wire: "accessKeyDetails",
                shape: {
                  AccessKeyId: D.m({ wire: "accessKeyId" }),
                  PrincipalId: D.m({ wire: "principalId" }),
                  UserName: D.m({ wire: "userName" }),
                  UserType: D.m({ wire: "userType" }),
                },
              }),
              S3BucketDetails: D.m({
                wire: "s3BucketDetails",
                shape: D.list({
                  Arn: D.m({ wire: "arn" }),
                  Name: D.m({ wire: "name" }),
                  Type: D.m({ wire: "type" }),
                  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
                  Owner: D.m({
                    wire: "owner",
                    shape: { Id: D.m({ wire: "id" }) },
                  }),
                  Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                  DefaultServerSideEncryption: D.m({
                    wire: "defaultServerSideEncryption",
                    shape: {
                      EncryptionType: D.m({ wire: "encryptionType" }),
                      KmsMasterKeyArn: D.m({ wire: "kmsMasterKeyArn" }),
                    },
                  }),
                  PublicAccess: D.m({
                    wire: "publicAccess",
                    shape: {
                      PermissionConfiguration: D.m({
                        wire: "permissionConfiguration",
                        shape: {
                          BucketLevelPermissions: D.m({
                            wire: "bucketLevelPermissions",
                            shape: {
                              AccessControlList: D.m({
                                wire: "accessControlList",
                                shape: {
                                  AllowsPublicReadAccess: D.m({
                                    wire: "allowsPublicReadAccess",
                                  }),
                                  AllowsPublicWriteAccess: D.m({
                                    wire: "allowsPublicWriteAccess",
                                  }),
                                },
                              }),
                              BucketPolicy: D.m({
                                wire: "bucketPolicy",
                                shape: {
                                  AllowsPublicReadAccess: D.m({
                                    wire: "allowsPublicReadAccess",
                                  }),
                                  AllowsPublicWriteAccess: D.m({
                                    wire: "allowsPublicWriteAccess",
                                  }),
                                },
                              }),
                              BlockPublicAccess: D.m({
                                wire: "blockPublicAccess",
                                shape: o_BlockPublicAccess,
                              }),
                            },
                          }),
                          AccountLevelPermissions: D.m({
                            wire: "accountLevelPermissions",
                            shape: {
                              BlockPublicAccess: D.m({
                                wire: "blockPublicAccess",
                                shape: o_BlockPublicAccess,
                              }),
                            },
                          }),
                        },
                      }),
                      EffectivePermission: D.m({ wire: "effectivePermission" }),
                    },
                  }),
                  S3ObjectDetails: D.m({
                    wire: "s3ObjectDetails",
                    shape: D.list({
                      ObjectArn: D.m({ wire: "objectArn" }),
                      Key: D.m({ wire: "key" }),
                      ETag: D.m({ wire: "eTag" }),
                      Hash: D.m({ wire: "hash" }),
                      VersionId: D.m({ wire: "versionId" }),
                    }),
                  }),
                }),
              }),
              InstanceDetails: D.m({
                wire: "instanceDetails",
                shape: {
                  AvailabilityZone: D.m({ wire: "availabilityZone" }),
                  IamInstanceProfile: D.m({
                    wire: "iamInstanceProfile",
                    shape: o_IamInstanceProfile,
                  }),
                  ImageDescription: D.m({ wire: "imageDescription" }),
                  ImageId: D.m({ wire: "imageId" }),
                  InstanceId: D.m({ wire: "instanceId" }),
                  InstanceState: D.m({ wire: "instanceState" }),
                  InstanceType: D.m({ wire: "instanceType" }),
                  OutpostArn: D.m({ wire: "outpostArn" }),
                  LaunchTime: D.m({ wire: "launchTime" }),
                  NetworkInterfaces: D.m({
                    wire: "networkInterfaces",
                    shape: D.list({
                      Ipv6Addresses: D.m({ wire: "ipv6Addresses" }),
                      NetworkInterfaceId: D.m({ wire: "networkInterfaceId" }),
                      PrivateDnsName: D.m({ wire: "privateDnsName" }),
                      PrivateIpAddress: D.m({
                        wire: "privateIpAddress",
                        shape: D.secret,
                      }),
                      PrivateIpAddresses: D.m({
                        wire: "privateIpAddresses",
                        shape: D.list(o_PrivateIpAddressDetails),
                      }),
                      PublicDnsName: D.m({ wire: "publicDnsName" }),
                      PublicIp: D.m({ wire: "publicIp" }),
                      SecurityGroups: D.m({
                        wire: "securityGroups",
                        shape: D.list(o_SecurityGroup),
                      }),
                      SubnetId: D.m({ wire: "subnetId" }),
                      VpcId: D.m({ wire: "vpcId" }),
                    }),
                  }),
                  Platform: D.m({ wire: "platform" }),
                  ProductCodes: D.m({
                    wire: "productCodes",
                    shape: D.list(o_ProductCode),
                  }),
                  Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                },
              }),
              EksClusterDetails: D.m({
                wire: "eksClusterDetails",
                shape: {
                  Name: D.m({ wire: "name" }),
                  Arn: D.m({ wire: "arn" }),
                  VpcId: D.m({ wire: "vpcId" }),
                  Status: D.m({ wire: "status" }),
                  Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
                },
              }),
              KubernetesDetails: D.m({
                wire: "kubernetesDetails",
                shape: {
                  KubernetesUserDetails: D.m({
                    wire: "kubernetesUserDetails",
                    shape: {
                      Username: D.m({ wire: "username" }),
                      Uid: D.m({ wire: "uid" }),
                      Groups: D.m({ wire: "groups" }),
                      SessionName: D.m({ wire: "sessionName" }),
                      ImpersonatedUser: D.m({
                        wire: "impersonatedUser",
                        shape: {
                          Username: D.m({ wire: "username" }),
                          Groups: D.m({ wire: "groups" }),
                        },
                      }),
                    },
                  }),
                  KubernetesWorkloadDetails: D.m({
                    wire: "kubernetesWorkloadDetails",
                    shape: {
                      Name: D.m({ wire: "name" }),
                      Type: D.m({ wire: "type" }),
                      Uid: D.m({ wire: "uid" }),
                      Namespace: D.m({ wire: "namespace" }),
                      HostNetwork: D.m({ wire: "hostNetwork" }),
                      ServiceAccountName: D.m({ wire: "serviceAccountName" }),
                      Containers: D.m({
                        wire: "containers",
                        shape: D.list(o_Container),
                      }),
                      Volumes: D.m({
                        wire: "volumes",
                        shape: D.list(o_Volume),
                      }),
                      HostIPC: D.m({ wire: "hostIPC" }),
                      HostPID: D.m({ wire: "hostPID" }),
                    },
                  }),
                },
              }),
              ResourceType: D.m({ wire: "resourceType" }),
              EbsVolumeDetails: D.m({
                wire: "ebsVolumeDetails",
                shape: {
                  ScannedVolumeDetails: D.m({
                    wire: "scannedVolumeDetails",
                    shape: D.list(o_VolumeDetail),
                  }),
                  SkippedVolumeDetails: D.m({
                    wire: "skippedVolumeDetails",
                    shape: D.list(o_VolumeDetail),
                  }),
                },
              }),
              EcsClusterDetails: D.m({
                wire: "ecsClusterDetails",
                shape: {
                  Name: D.m({ wire: "name" }),
                  Arn: D.m({ wire: "arn" }),
                  Status: D.m({ wire: "status" }),
                  ActiveServicesCount: D.m({ wire: "activeServicesCount" }),
                  RegisteredContainerInstancesCount: D.m({
                    wire: "registeredContainerInstancesCount",
                  }),
                  RunningTasksCount: D.m({ wire: "runningTasksCount" }),
                  Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                  TaskDetails: D.m({
                    wire: "taskDetails",
                    shape: {
                      Arn: D.m({ wire: "arn" }),
                      DefinitionArn: D.m({ wire: "definitionArn" }),
                      Version: D.m({ wire: "version" }),
                      TaskCreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
                      StartedAt: D.m({ wire: "startedAt", shape: D.ts }),
                      StartedBy: D.m({ wire: "startedBy" }),
                      Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                      Volumes: D.m({
                        wire: "volumes",
                        shape: D.list(o_Volume),
                      }),
                      Containers: D.m({
                        wire: "containers",
                        shape: D.list(o_Container),
                      }),
                      Group: D.m({ wire: "group" }),
                      LaunchType: D.m({ wire: "launchType" }),
                    },
                  }),
                },
              }),
              ContainerDetails: D.m({
                wire: "containerDetails",
                shape: o_Container,
              }),
              LambdaDetails: D.m({
                wire: "lambdaDetails",
                shape: {
                  FunctionArn: D.m({ wire: "functionArn" }),
                  FunctionName: D.m({ wire: "functionName" }),
                  Description: D.m({ wire: "description" }),
                  LastModifiedAt: D.m({ wire: "lastModifiedAt", shape: D.ts }),
                  RevisionId: D.m({ wire: "revisionId" }),
                  FunctionVersion: D.m({ wire: "functionVersion" }),
                  Role: D.m({ wire: "role" }),
                  VpcConfig: D.m({
                    wire: "vpcConfig",
                    shape: {
                      SubnetIds: D.m({ wire: "subnetIds" }),
                      VpcId: D.m({ wire: "vpcId" }),
                      SecurityGroups: D.m({
                        wire: "securityGroups",
                        shape: D.list(o_SecurityGroup),
                      }),
                    },
                  }),
                  Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                },
              }),
              RdsDbInstanceDetails: D.m({
                wire: "rdsDbInstanceDetails",
                shape: {
                  DbInstanceIdentifier: D.m({ wire: "dbInstanceIdentifier" }),
                  Engine: D.m({ wire: "engine" }),
                  EngineVersion: D.m({ wire: "engineVersion" }),
                  DbClusterIdentifier: D.m({ wire: "dbClusterIdentifier" }),
                  DbInstanceArn: D.m({ wire: "dbInstanceArn" }),
                  DbiResourceId: D.m({ wire: "dbiResourceId" }),
                  Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                },
              }),
              RdsLimitlessDbDetails: D.m({
                wire: "rdsLimitlessDbDetails",
                shape: {
                  DbShardGroupIdentifier: D.m({
                    wire: "dbShardGroupIdentifier",
                  }),
                  DbShardGroupResourceId: D.m({
                    wire: "dbShardGroupResourceId",
                  }),
                  DbShardGroupArn: D.m({ wire: "dbShardGroupArn" }),
                  Engine: D.m({ wire: "engine" }),
                  EngineVersion: D.m({ wire: "engineVersion" }),
                  DbClusterIdentifier: D.m({ wire: "dbClusterIdentifier" }),
                  Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                },
              }),
              RdsDbUserDetails: D.m({
                wire: "rdsDbUserDetails",
                shape: {
                  User: D.m({ wire: "user" }),
                  Application: D.m({ wire: "application" }),
                  Database: D.m({ wire: "database" }),
                  Ssl: D.m({ wire: "ssl" }),
                  AuthMethod: D.m({ wire: "authMethod" }),
                },
              }),
              EbsSnapshotDetails: D.m({
                wire: "ebsSnapshotDetails",
                shape: { SnapshotArn: D.m({ wire: "snapshotArn" }) },
              }),
              Ec2ImageDetails: D.m({
                wire: "ec2ImageDetails",
                shape: { ImageArn: D.m({ wire: "imageArn" }) },
              }),
              RecoveryPointDetails: D.m({
                wire: "recoveryPointDetails",
                shape: {
                  RecoveryPointArn: D.m({ wire: "recoveryPointArn" }),
                  BackupVaultName: D.m({ wire: "backupVaultName" }),
                  ContinuousScanDetails: D.m({
                    wire: "continuousScanDetails",
                    shape: o_ScanConfigurationContinuousScanDetails,
                  }),
                },
              }),
              BedrockGuardrailDetails: D.m({
                wire: "bedrockGuardrailDetails",
                shape: {
                  GuardrailArn: D.m({ wire: "guardrailArn" }),
                  GuardrailVersion: D.m({ wire: "guardrailVersion" }),
                  Guardrails: D.m({
                    wire: "guardrails",
                    shape: D.list({
                      Arn: D.m({ wire: "arn" }),
                      Version: D.m({ wire: "version" }),
                    }),
                  }),
                  GuardrailAction: D.m({ wire: "guardrailAction" }),
                  GuardrailSource: D.m({ wire: "guardrailSource" }),
                  ContentPolicyFilters: D.m({
                    wire: "contentPolicyFilters",
                    shape: D.list({
                      Type: D.m({ wire: "type" }),
                      Confidence: D.m({ wire: "confidence" }),
                      Action: D.m({ wire: "action" }),
                    }),
                  }),
                },
              }),
              ModelDetails: D.m({
                wire: "modelDetails",
                shape: D.list({ ModelId: D.m({ wire: "modelId" }) }),
              }),
            },
          }),
          SchemaVersion: D.m({ wire: "schemaVersion" }),
          Service: D.m({
            wire: "service",
            shape: {
              Action: D.m({
                wire: "action",
                shape: {
                  ActionType: D.m({ wire: "actionType" }),
                  AwsApiCallAction: D.m({
                    wire: "awsApiCallAction",
                    shape: {
                      Api: D.m({ wire: "api" }),
                      CallerType: D.m({ wire: "callerType" }),
                      DomainDetails: D.m({
                        wire: "domainDetails",
                        shape: { Domain: D.m({ wire: "domain" }) },
                      }),
                      ErrorCode: D.m({ wire: "errorCode" }),
                      UserAgent: D.m({ wire: "userAgent" }),
                      RemoteIpDetails: D.m({
                        wire: "remoteIpDetails",
                        shape: o_RemoteIpDetails,
                      }),
                      ServiceName: D.m({ wire: "serviceName" }),
                      RemoteAccountDetails: D.m({
                        wire: "remoteAccountDetails",
                        shape: {
                          AccountId: D.m({ wire: "accountId" }),
                          Affiliated: D.m({ wire: "affiliated" }),
                        },
                      }),
                      AffectedResources: D.m({ wire: "affectedResources" }),
                    },
                  }),
                  DnsRequestAction: D.m({
                    wire: "dnsRequestAction",
                    shape: {
                      Domain: D.m({ wire: "domain" }),
                      Protocol: D.m({ wire: "protocol" }),
                      Blocked: D.m({ wire: "blocked" }),
                      DomainWithSuffix: D.m({ wire: "domainWithSuffix" }),
                      VpcOwnerAccountId: D.m({ wire: "vpcOwnerAccountId" }),
                    },
                  }),
                  NetworkConnectionAction: D.m({
                    wire: "networkConnectionAction",
                    shape: {
                      Blocked: D.m({ wire: "blocked" }),
                      ConnectionDirection: D.m({ wire: "connectionDirection" }),
                      LocalPortDetails: D.m({
                        wire: "localPortDetails",
                        shape: o_LocalPortDetails,
                      }),
                      Protocol: D.m({ wire: "protocol" }),
                      LocalIpDetails: D.m({
                        wire: "localIpDetails",
                        shape: o_LocalIpDetails,
                      }),
                      LocalNetworkInterface: D.m({
                        wire: "localNetworkInterface",
                      }),
                      RemoteIpDetails: D.m({
                        wire: "remoteIpDetails",
                        shape: o_RemoteIpDetails,
                      }),
                      RemotePortDetails: D.m({
                        wire: "remotePortDetails",
                        shape: {
                          Port: D.m({ wire: "port" }),
                          PortName: D.m({ wire: "portName" }),
                        },
                      }),
                    },
                  }),
                  PortProbeAction: D.m({
                    wire: "portProbeAction",
                    shape: {
                      Blocked: D.m({ wire: "blocked" }),
                      PortProbeDetails: D.m({
                        wire: "portProbeDetails",
                        shape: D.list({
                          LocalPortDetails: D.m({
                            wire: "localPortDetails",
                            shape: o_LocalPortDetails,
                          }),
                          LocalIpDetails: D.m({
                            wire: "localIpDetails",
                            shape: o_LocalIpDetails,
                          }),
                          RemoteIpDetails: D.m({
                            wire: "remoteIpDetails",
                            shape: o_RemoteIpDetails,
                          }),
                        }),
                      }),
                    },
                  }),
                  KubernetesApiCallAction: D.m({
                    wire: "kubernetesApiCallAction",
                    shape: {
                      RequestUri: D.m({ wire: "requestUri" }),
                      Verb: D.m({ wire: "verb" }),
                      Resource: D.m({ wire: "resource" }),
                      Subresource: D.m({ wire: "subresource" }),
                      Namespace: D.m({ wire: "namespace" }),
                      ResourceName: D.m({ wire: "resourceName" }),
                      SourceIps: D.m({ wire: "sourceIPs" }),
                      UserAgent: D.m({ wire: "userAgent" }),
                      RemoteIpDetails: D.m({
                        wire: "remoteIpDetails",
                        shape: o_RemoteIpDetails,
                      }),
                      StatusCode: D.m({ wire: "statusCode" }),
                      Parameters: D.m({ wire: "parameters" }),
                    },
                  }),
                  KubernetesPermissionCheckedDetails: D.m({
                    wire: "kubernetesPermissionCheckedDetails",
                    shape: {
                      Verb: D.m({ wire: "verb" }),
                      Resource: D.m({ wire: "resource" }),
                      Namespace: D.m({ wire: "namespace" }),
                      Allowed: D.m({ wire: "allowed" }),
                    },
                  }),
                  KubernetesRoleBindingDetails: D.m({
                    wire: "kubernetesRoleBindingDetails",
                    shape: {
                      Kind: D.m({ wire: "kind" }),
                      Name: D.m({ wire: "name" }),
                      Uid: D.m({ wire: "uid" }),
                      RoleRefName: D.m({ wire: "roleRefName" }),
                      RoleRefKind: D.m({ wire: "roleRefKind" }),
                    },
                  }),
                  KubernetesRoleDetails: D.m({
                    wire: "kubernetesRoleDetails",
                    shape: {
                      Kind: D.m({ wire: "kind" }),
                      Name: D.m({ wire: "name" }),
                      Uid: D.m({ wire: "uid" }),
                    },
                  }),
                  RdsLoginAttemptAction: D.m({
                    wire: "rdsLoginAttemptAction",
                    shape: {
                      RemoteIpDetails: D.m({
                        wire: "remoteIpDetails",
                        shape: o_RemoteIpDetails,
                      }),
                      LoginAttributes: D.list({
                        User: D.m({ wire: "user" }),
                        Application: D.m({ wire: "application" }),
                        FailedLoginAttempts: D.m({
                          wire: "failedLoginAttempts",
                        }),
                        SuccessfulLoginAttempts: D.m({
                          wire: "successfulLoginAttempts",
                        }),
                      }),
                    },
                  }),
                },
              }),
              Evidence: D.m({
                wire: "evidence",
                shape: {
                  ThreatIntelligenceDetails: D.m({
                    wire: "threatIntelligenceDetails",
                    shape: D.list({
                      ThreatListName: D.m({ wire: "threatListName" }),
                      ThreatNames: D.m({ wire: "threatNames" }),
                      ThreatFileSha256: D.m({ wire: "threatFileSha256" }),
                    }),
                  }),
                },
              }),
              Archived: D.m({ wire: "archived" }),
              Count: D.m({ wire: "count" }),
              DetectorId: D.m({ wire: "detectorId" }),
              EventFirstSeen: D.m({ wire: "eventFirstSeen" }),
              EventLastSeen: D.m({ wire: "eventLastSeen" }),
              ResourceRole: D.m({ wire: "resourceRole" }),
              ServiceName: D.m({ wire: "serviceName" }),
              UserFeedback: D.m({ wire: "userFeedback" }),
              AdditionalInfo: D.m({
                wire: "additionalInfo",
                shape: {
                  Value: D.m({ wire: "value" }),
                  Type: D.m({ wire: "type" }),
                },
              }),
              FeatureName: D.m({ wire: "featureName" }),
              EbsVolumeScanDetails: D.m({
                wire: "ebsVolumeScanDetails",
                shape: {
                  ScanId: D.m({ wire: "scanId" }),
                  ScanStartedAt: D.m({ wire: "scanStartedAt", shape: D.ts }),
                  ScanCompletedAt: D.m({
                    wire: "scanCompletedAt",
                    shape: D.ts,
                  }),
                  TriggerFindingId: D.m({ wire: "triggerFindingId" }),
                  Sources: D.m({ wire: "sources" }),
                  ScanDetections: D.m({
                    wire: "scanDetections",
                    shape: {
                      ScannedItemCount: D.m({
                        wire: "scannedItemCount",
                        shape: {
                          TotalGb: D.m({ wire: "totalGb" }),
                          Files: D.m({ wire: "files" }),
                          Volumes: D.m({ wire: "volumes" }),
                        },
                      }),
                      ThreatsDetectedItemCount: D.m({
                        wire: "threatsDetectedItemCount",
                        shape: { Files: D.m({ wire: "files" }) },
                      }),
                      HighestSeverityThreatDetails: D.m({
                        wire: "highestSeverityThreatDetails",
                        shape: {
                          Severity: D.m({ wire: "severity" }),
                          ThreatName: D.m({ wire: "threatName" }),
                          Count: D.m({ wire: "count" }),
                        },
                      }),
                      ThreatDetectedByName: D.m({
                        wire: "threatDetectedByName",
                        shape: {
                          ItemCount: D.m({ wire: "itemCount" }),
                          UniqueThreatNameCount: D.m({
                            wire: "uniqueThreatNameCount",
                          }),
                          Shortened: D.m({ wire: "shortened" }),
                          ThreatNames: D.m({
                            wire: "threatNames",
                            shape: D.list({
                              Name: D.m({ wire: "name" }),
                              Severity: D.m({ wire: "severity" }),
                              ItemCount: D.m({ wire: "itemCount" }),
                              FilePaths: D.m({
                                wire: "filePaths",
                                shape: D.list({
                                  FilePath: D.m({ wire: "filePath" }),
                                  VolumeArn: D.m({ wire: "volumeArn" }),
                                  Hash: D.m({ wire: "hash" }),
                                  FileName: D.m({ wire: "fileName" }),
                                }),
                              }),
                            }),
                          }),
                        },
                      }),
                    },
                  }),
                  ScanType: D.m({ wire: "scanType" }),
                },
              }),
              RuntimeDetails: D.m({
                wire: "runtimeDetails",
                shape: {
                  Process: D.m({ wire: "process", shape: o_ProcessDetails }),
                  Context: D.m({
                    wire: "context",
                    shape: {
                      ModifyingProcess: D.m({
                        wire: "modifyingProcess",
                        shape: o_ProcessDetails,
                      }),
                      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
                      ScriptPath: D.m({ wire: "scriptPath" }),
                      LibraryPath: D.m({ wire: "libraryPath" }),
                      LdPreloadValue: D.m({ wire: "ldPreloadValue" }),
                      SocketPath: D.m({ wire: "socketPath" }),
                      RuncBinaryPath: D.m({ wire: "runcBinaryPath" }),
                      ReleaseAgentPath: D.m({ wire: "releaseAgentPath" }),
                      MountSource: D.m({ wire: "mountSource" }),
                      MountTarget: D.m({ wire: "mountTarget" }),
                      FileSystemType: D.m({ wire: "fileSystemType" }),
                      Flags: D.m({ wire: "flags" }),
                      ModuleName: D.m({ wire: "moduleName" }),
                      ModuleFilePath: D.m({ wire: "moduleFilePath" }),
                      ModuleSha256: D.m({ wire: "moduleSha256" }),
                      ShellHistoryFilePath: D.m({
                        wire: "shellHistoryFilePath",
                      }),
                      TargetProcess: D.m({
                        wire: "targetProcess",
                        shape: o_ProcessDetails,
                      }),
                      AddressFamily: D.m({ wire: "addressFamily" }),
                      IanaProtocolNumber: D.m({ wire: "ianaProtocolNumber" }),
                      MemoryRegions: D.m({ wire: "memoryRegions" }),
                      ToolName: D.m({ wire: "toolName" }),
                      ToolCategory: D.m({ wire: "toolCategory" }),
                      ServiceName: D.m({ wire: "serviceName" }),
                      CommandLineExample: D.m({ wire: "commandLineExample" }),
                      ThreatFilePath: D.m({ wire: "threatFilePath" }),
                      FileOperation: D.m({ wire: "fileOperation" }),
                      FilePath: D.m({ wire: "filePath" }),
                      RelatedFilePaths: D.m({ wire: "relatedFilePaths" }),
                    },
                  }),
                },
              }),
              Detection: D.m({
                wire: "detection",
                shape: {
                  Anomaly: D.m({
                    wire: "anomaly",
                    shape: {
                      Profiles: D.m({
                        wire: "profiles",
                        shape: D.map(D.map(D.list(o_AnomalyObject))),
                      }),
                      Unusual: D.m({
                        wire: "unusual",
                        shape: {
                          Behavior: D.m({
                            wire: "behavior",
                            shape: D.map(D.map(o_AnomalyObject)),
                          }),
                        },
                      }),
                    },
                  }),
                  Sequence: D.m({
                    wire: "sequence",
                    shape: {
                      Uid: D.m({ wire: "uid" }),
                      Description: D.m({ wire: "description" }),
                      Actors: D.m({
                        wire: "actors",
                        shape: D.list({
                          Id: D.m({ wire: "id" }),
                          User: D.m({
                            wire: "user",
                            shape: {
                              Name: D.m({ wire: "name" }),
                              Uid: D.m({ wire: "uid" }),
                              Type: D.m({ wire: "type" }),
                              CredentialUid: D.m({ wire: "credentialUid" }),
                              Account: D.m({
                                wire: "account",
                                shape: {
                                  Uid: D.m({ wire: "uid" }),
                                  Name: D.m({ wire: "account" }),
                                },
                              }),
                            },
                          }),
                          Session: D.m({
                            wire: "session",
                            shape: {
                              Uid: D.m({ wire: "uid" }),
                              MfaStatus: D.m({ wire: "mfaStatus" }),
                              CreatedTime: D.m({
                                wire: "createdTime",
                                shape: D.ts,
                              }),
                              Issuer: D.m({ wire: "issuer" }),
                            },
                          }),
                          Process: D.m({
                            wire: "process",
                            shape: {
                              Name: D.m({ wire: "name" }),
                              Path: D.m({ wire: "path" }),
                              Sha256: D.m({ wire: "sha256" }),
                            },
                          }),
                        }),
                      }),
                      Resources: D.m({
                        wire: "resources",
                        shape: D.list({
                          Uid: D.m({ wire: "uid" }),
                          Name: D.m({ wire: "name" }),
                          AccountId: D.m({ wire: "accountId" }),
                          ResourceType: D.m({ wire: "resourceType" }),
                          Region: D.m({ wire: "region" }),
                          Service: D.m({ wire: "service" }),
                          CloudPartition: D.m({ wire: "cloudPartition" }),
                          Tags: D.m({ wire: "tags", shape: D.list(o_Tag) }),
                          Data: D.m({
                            wire: "data",
                            shape: {
                              S3Bucket: D.m({
                                wire: "s3Bucket",
                                shape: {
                                  OwnerId: D.m({ wire: "ownerId" }),
                                  CreatedAt: D.m({
                                    wire: "createdAt",
                                    shape: D.ts,
                                  }),
                                  EncryptionType: D.m({
                                    wire: "encryptionType",
                                  }),
                                  EncryptionKeyArn: D.m({
                                    wire: "encryptionKeyArn",
                                  }),
                                  EffectivePermission: D.m({
                                    wire: "effectivePermission",
                                  }),
                                  PublicReadAccess: D.m({
                                    wire: "publicReadAccess",
                                  }),
                                  PublicWriteAccess: D.m({
                                    wire: "publicWriteAccess",
                                  }),
                                  AccountPublicAccess: D.m({
                                    wire: "accountPublicAccess",
                                    shape: o_PublicAccessConfiguration,
                                  }),
                                  BucketPublicAccess: D.m({
                                    wire: "bucketPublicAccess",
                                    shape: o_PublicAccessConfiguration,
                                  }),
                                  S3ObjectUids: D.m({ wire: "s3ObjectUids" }),
                                },
                              }),
                              Ec2Instance: D.m({
                                wire: "ec2Instance",
                                shape: {
                                  AvailabilityZone: D.m({
                                    wire: "availabilityZone",
                                  }),
                                  ImageDescription: D.m({
                                    wire: "imageDescription",
                                  }),
                                  InstanceState: D.m({ wire: "instanceState" }),
                                  IamInstanceProfile: o_IamInstanceProfile,
                                  InstanceType: D.m({ wire: "instanceType" }),
                                  OutpostArn: D.m({ wire: "outpostArn" }),
                                  Platform: D.m({ wire: "platform" }),
                                  ProductCodes: D.m({
                                    wire: "productCodes",
                                    shape: D.list(o_ProductCode),
                                  }),
                                  Ec2NetworkInterfaceUids: D.m({
                                    wire: "ec2NetworkInterfaceUids",
                                  }),
                                },
                              }),
                              AccessKey: D.m({
                                wire: "accessKey",
                                shape: {
                                  PrincipalId: D.m({ wire: "principalId" }),
                                  UserName: D.m({ wire: "userName" }),
                                  UserType: D.m({ wire: "userType" }),
                                },
                              }),
                              Ec2NetworkInterface: D.m({
                                wire: "ec2NetworkInterface",
                                shape: {
                                  Ipv6Addresses: D.m({ wire: "ipv6Addresses" }),
                                  PrivateIpAddresses: D.m({
                                    wire: "privateIpAddresses",
                                    shape: D.list(o_PrivateIpAddressDetails),
                                  }),
                                  PublicIp: D.m({ wire: "publicIp" }),
                                  SecurityGroups: D.m({
                                    wire: "securityGroups",
                                    shape: D.list(o_SecurityGroup),
                                  }),
                                  SubNetId: D.m({ wire: "subNetId" }),
                                  VpcId: D.m({ wire: "vpcId" }),
                                },
                              }),
                              S3Object: D.m({
                                wire: "s3Object",
                                shape: {
                                  ETag: D.m({ wire: "eTag" }),
                                  Key: D.m({ wire: "key" }),
                                  VersionId: D.m({ wire: "versionId" }),
                                },
                              }),
                              EksCluster: D.m({
                                wire: "eksCluster",
                                shape: {
                                  Arn: D.m({ wire: "arn" }),
                                  CreatedAt: D.m({
                                    wire: "createdAt",
                                    shape: D.ts,
                                  }),
                                  Status: D.m({ wire: "status" }),
                                  VpcId: D.m({ wire: "vpcId" }),
                                  Ec2InstanceUids: D.m({
                                    wire: "ec2InstanceUids",
                                  }),
                                },
                              }),
                              KubernetesWorkload: D.m({
                                wire: "kubernetesWorkload",
                                shape: {
                                  ContainerUids: D.m({ wire: "containerUids" }),
                                  Namespace: D.m({ wire: "namespace" }),
                                  KubernetesResourcesTypes: D.m({
                                    wire: "type",
                                  }),
                                },
                              }),
                              Container: D.m({
                                wire: "container",
                                shape: {
                                  Image: D.m({ wire: "image" }),
                                  ImageUid: D.m({ wire: "imageUid" }),
                                },
                              }),
                              EcsCluster: D.m({
                                wire: "ecsCluster",
                                shape: {
                                  Status: D.m({ wire: "status" }),
                                  Ec2InstanceUids: D.m({
                                    wire: "ec2InstanceUids",
                                  }),
                                },
                              }),
                              EcsTask: D.m({
                                wire: "ecsTask",
                                shape: {
                                  CreatedAt: D.m({
                                    wire: "createdAt",
                                    shape: D.ts,
                                  }),
                                  TaskDefinitionArn: D.m({
                                    wire: "taskDefinitionArn",
                                  }),
                                  LaunchType: D.m({ wire: "launchType" }),
                                  ContainerUids: D.m({ wire: "containerUids" }),
                                },
                              }),
                              IamInstanceProfile: D.m({
                                wire: "iamInstanceProfile",
                                shape: {
                                  Ec2InstanceUids: D.m({
                                    wire: "ec2InstanceUids",
                                  }),
                                },
                              }),
                              AutoscalingAutoScalingGroup: D.m({
                                wire: "autoscalingAutoScalingGroup",
                                shape: {
                                  Ec2InstanceUids: D.m({
                                    wire: "ec2InstanceUids",
                                  }),
                                },
                              }),
                              Ec2LaunchTemplate: D.m({
                                wire: "ec2LaunchTemplate",
                                shape: {
                                  Ec2InstanceUids: D.m({
                                    wire: "ec2InstanceUids",
                                  }),
                                  Version: D.m({ wire: "version" }),
                                },
                              }),
                              Ec2Vpc: D.m({
                                wire: "ec2Vpc",
                                shape: {
                                  Ec2InstanceUids: D.m({
                                    wire: "ec2InstanceUids",
                                  }),
                                },
                              }),
                              Ec2Image: D.m({
                                wire: "ec2Image",
                                shape: {
                                  Ec2InstanceUids: D.m({
                                    wire: "ec2InstanceUids",
                                  }),
                                },
                              }),
                              CloudformationStack: D.m({
                                wire: "cloudformationStack",
                                shape: {
                                  Ec2InstanceUids: D.m({
                                    wire: "ec2InstanceUids",
                                  }),
                                },
                              }),
                            },
                          }),
                        }),
                      }),
                      Endpoints: D.m({
                        wire: "endpoints",
                        shape: D.list({
                          Id: D.m({ wire: "id" }),
                          Ip: D.m({ wire: "ip" }),
                          Domain: D.m({ wire: "domain" }),
                          Port: D.m({ wire: "port" }),
                          Location: D.m({
                            wire: "location",
                            shape: {
                              City: D.m({ wire: "city" }),
                              Country: D.m({ wire: "country" }),
                              Latitude: D.m({ wire: "lat" }),
                              Longitude: D.m({ wire: "lon" }),
                            },
                          }),
                          AutonomousSystem: D.m({
                            wire: "autonomousSystem",
                            shape: {
                              Name: D.m({ wire: "name" }),
                              Number: D.m({ wire: "number" }),
                            },
                          }),
                          Connection: D.m({
                            wire: "connection",
                            shape: { Direction: D.m({ wire: "direction" }) },
                          }),
                        }),
                      }),
                      Signals: D.m({
                        wire: "signals",
                        shape: D.list({
                          Uid: D.m({ wire: "uid" }),
                          Type: D.m({ wire: "type" }),
                          Description: D.m({ wire: "description" }),
                          Name: D.m({ wire: "name" }),
                          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
                          UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
                          FirstSeenAt: D.m({
                            wire: "firstSeenAt",
                            shape: D.ts,
                          }),
                          LastSeenAt: D.m({ wire: "lastSeenAt", shape: D.ts }),
                          Severity: D.m({ wire: "severity" }),
                          Count: D.m({ wire: "count" }),
                          ResourceUids: D.m({ wire: "resourceUids" }),
                          ActorIds: D.m({ wire: "actorIds" }),
                          EndpointIds: D.m({ wire: "endpointIds" }),
                          SignalIndicators: D.m({
                            wire: "signalIndicators",
                            shape: D.list(o_Indicator),
                          }),
                        }),
                      }),
                      SequenceIndicators: D.m({
                        wire: "sequenceIndicators",
                        shape: D.list(o_Indicator),
                      }),
                      AdditionalSequenceTypes: D.m({
                        wire: "additionalSequenceTypes",
                      }),
                    },
                  }),
                },
              }),
              MalwareScanDetails: D.m({
                wire: "malwareScanDetails",
                shape: {
                  Threats: D.m({
                    wire: "threats",
                    shape: D.list({
                      Name: D.m({ wire: "name" }),
                      Source: D.m({ wire: "source" }),
                      ItemPaths: D.m({
                        wire: "itemPaths",
                        shape: D.list({
                          NestedItemPath: D.m({ wire: "nestedItemPath" }),
                          Hash: D.m({ wire: "hash" }),
                        }),
                      }),
                      Count: D.m({ wire: "count" }),
                      Hash: D.m({ wire: "hash" }),
                      ItemDetails: D.m({
                        wire: "itemDetails",
                        shape: D.list(o_ItemDetails),
                      }),
                    }),
                  }),
                  ScanId: D.m({ wire: "scanId" }),
                  ScanType: D.m({ wire: "scanType" }),
                  ScanCategory: D.m({ wire: "scanCategory" }),
                  ScanConfiguration: D.m({
                    wire: "scanConfiguration",
                    shape: {
                      TriggerType: D.m({ wire: "triggerType" }),
                      IncrementalScanDetails: D.m({
                        wire: "incrementalScanDetails",
                        shape: o_IncrementalScanDetails,
                      }),
                    },
                  }),
                  UniqueThreatCount: D.m({ wire: "uniqueThreatCount" }),
                },
              }),
            },
          }),
          Severity: D.m({ wire: "severity" }),
          Title: D.m({ wire: "title" }),
          Type: D.m({ wire: "type" }),
          UpdatedAt: D.m({ wire: "updatedAt" }),
          AssociatedAttackSequenceArn: D.m({
            wire: "associatedAttackSequenceArn",
          }),
        }),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/findings/statistics",
    input: {
      DetectorId: 0,
      FindingStatisticTypes: D.m({ wire: "findingStatisticTypes" }),
      FindingCriteria: D.m({
        wire: "findingCriteria",
        shape: i_FindingCriteria,
      }),
      GroupBy: D.m({ wire: "groupBy" }),
      OrderBy: D.m({ wire: "orderBy" }),
      MaxResults: D.m({ wire: "maxResults" }),
    },
    output: {
      FindingStatistics: D.m({
        wire: "findingStatistics",
        shape: {
          CountBySeverity: D.m({ wire: "countBySeverity" }),
          GroupedByAccount: D.m({
            wire: "groupedByAccount",
            shape: D.list({
              AccountId: D.m({ wire: "accountId" }),
              LastGeneratedAt: D.m({ wire: "lastGeneratedAt", shape: D.ts }),
              TotalFindings: D.m({ wire: "totalFindings" }),
            }),
          }),
          GroupedByDate: D.m({
            wire: "groupedByDate",
            shape: D.list({
              Date: D.m({ wire: "date", shape: D.ts }),
              LastGeneratedAt: D.m({ wire: "lastGeneratedAt", shape: D.ts }),
              Severity: D.m({ wire: "severity" }),
              TotalFindings: D.m({ wire: "totalFindings" }),
            }),
          }),
          GroupedByFindingType: D.m({
            wire: "groupedByFindingType",
            shape: D.list({
              FindingType: D.m({ wire: "findingType" }),
              LastGeneratedAt: D.m({ wire: "lastGeneratedAt", shape: D.ts }),
              TotalFindings: D.m({ wire: "totalFindings" }),
            }),
          }),
          GroupedByResource: D.m({
            wire: "groupedByResource",
            shape: D.list({
              AccountId: D.m({ wire: "accountId" }),
              LastGeneratedAt: D.m({ wire: "lastGeneratedAt", shape: D.ts }),
              ResourceId: D.m({ wire: "resourceId" }),
              ResourceType: D.m({ wire: "resourceType" }),
              TotalFindings: D.m({ wire: "totalFindings" }),
            }),
          }),
          GroupedBySeverity: D.m({
            wire: "groupedBySeverity",
            shape: D.list({
              LastGeneratedAt: D.m({ wire: "lastGeneratedAt", shape: D.ts }),
              Severity: D.m({ wire: "severity" }),
              TotalFindings: D.m({ wire: "totalFindings" }),
            }),
          }),
        },
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsStatistics",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/investigation/{InvestigationId}",
    input: { DetectorId: 0, InvestigationId: 0 },
    output: {
      Investigation: D.m({
        wire: "investigation",
        shape: {
          InvestigationId: D.m({ wire: "investigationId" }),
          Status: D.m({ wire: "status" }),
          TriggerPrompt: D.m({ wire: "triggerPrompt" }),
          TriggeredBy: D.m({ wire: "triggeredBy" }),
          Metadata: D.m({
            wire: "metadata",
            shape: {
              Version: D.m({ wire: "version" }),
              Product: D.m({
                wire: "product",
                shape: {
                  Name: D.m({ wire: "name" }),
                  Feature: D.m({ wire: "feature" }),
                },
              }),
            },
          }),
          Cloud: D.m({
            wire: "cloud",
            shape: {
              Provider: D.m({ wire: "provider" }),
              Region: D.m({ wire: "region" }),
              Account: D.m({ wire: "account" }),
            },
          }),
          RiskLevel: D.m({ wire: "riskLevel" }),
          Risk: D.m({ wire: "risk" }),
          Confidence: D.m({ wire: "confidence" }),
          Summary: D.m({ wire: "summary" }),
          StartTime: D.m({ wire: "startTime", shape: D.ts }),
          EndTime: D.m({ wire: "endTime", shape: D.ts }),
          Error: D.m({ wire: "error" }),
        },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvestigation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /invitation/count",
    input: {},
    output: { InvitationsCount: D.m({ wire: "invitationsCount" }) },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvitationsCount",
})) as any;

export type GetIPSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the IPSet specified by the `ipSetId`.
 */
export const getIPSet: API.OperationMethod<
  GetIPSetRequest,
  GetIPSetResponse,
  GetIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/ipset/{IpSetId}",
    input: { DetectorId: 0, IpSetId: 0 },
    output: {
      Name: D.m({ wire: "name" }),
      Format: D.m({ wire: "format" }),
      Location: D.m({ wire: "location" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIPSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /malware-protection-plan/{MalwareProtectionPlanId}",
    input: { MalwareProtectionPlanId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Role: D.m({ wire: "role" }),
      ProtectedResource: D.m({
        wire: "protectedResource",
        shape: {
          S3Bucket: D.m({
            wire: "s3Bucket",
            shape: {
              BucketName: D.m({ wire: "bucketName" }),
              ObjectPrefixes: D.m({ wire: "objectPrefixes" }),
            },
          }),
        },
      }),
      Actions: D.m({
        wire: "actions",
        shape: {
          Tagging: D.m({
            wire: "tagging",
            shape: { Status: D.m({ wire: "status" }) },
          }),
        },
      }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Status: D.m({ wire: "status" }),
      StatusReasons: D.m({
        wire: "statusReasons",
        shape: D.list({
          Code: D.m({ wire: "code" }),
          Message: D.m({ wire: "message" }),
        }),
      }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareProtectionPlan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /malware-scan/{ScanId}",
    input: { ScanId: 0 },
    output: {
      ScanId: D.m({ wire: "scanId" }),
      DetectorId: D.m({ wire: "detectorId" }),
      AdminDetectorId: D.m({ wire: "adminDetectorId" }),
      ResourceArn: D.m({ wire: "resourceArn" }),
      ResourceType: D.m({ wire: "resourceType" }),
      ScannedResourcesCount: D.m({ wire: "scannedResourcesCount" }),
      SkippedResourcesCount: D.m({ wire: "skippedResourcesCount" }),
      FailedResourcesCount: D.m({ wire: "failedResourcesCount" }),
      ScannedResources: D.m({
        wire: "scannedResources",
        shape: D.list({
          ScannedResourceArn: D.m({ wire: "scannedResourceArn" }),
          ScannedResourceType: D.m({ wire: "scannedResourceType" }),
          ScannedResourceStatus: D.m({ wire: "scannedResourceStatus" }),
          ScanStatusReason: D.m({ wire: "scanStatusReason" }),
          ResourceDetails: D.m({
            wire: "resourceDetails",
            shape: {
              EbsVolume: D.m({ wire: "ebsVolume", shape: o_VolumeDetail }),
              EbsSnapshot: D.m({
                wire: "ebsSnapshot",
                shape: { DeviceName: D.m({ wire: "deviceName" }) },
              }),
            },
          }),
        }),
      }),
      ScanConfiguration: D.m({
        wire: "scanConfiguration",
        shape: {
          Role: D.m({ wire: "role" }),
          TriggerDetails: D.m({
            wire: "triggerDetails",
            shape: o_TriggerDetails,
          }),
          IncrementalScanDetails: D.m({
            wire: "incrementalScanDetails",
            shape: o_IncrementalScanDetails,
          }),
          RecoveryPoint: D.m({
            wire: "recoveryPoint",
            shape: {
              BackupVaultName: D.m({ wire: "backupVaultName" }),
              ContinuousScanDetails: D.m({
                wire: "continuousScanDetails",
                shape: o_ScanConfigurationContinuousScanDetails,
              }),
            },
          }),
        },
      }),
      ScanCategory: D.m({ wire: "scanCategory" }),
      ScanStatus: D.m({ wire: "scanStatus" }),
      ScanStatusReason: D.m({ wire: "scanStatusReason" }),
      ScanType: D.m({ wire: "scanType" }),
      ScanStartedAt: D.m({ wire: "scanStartedAt", shape: D.ts }),
      ScanCompletedAt: D.m({ wire: "scanCompletedAt", shape: D.ts }),
      ScanResultDetails: D.m({
        wire: "scanResultDetails",
        shape: {
          ScanResultStatus: D.m({ wire: "scanResultStatus" }),
          SkippedFileCount: D.m({ wire: "skippedFileCount" }),
          FailedFileCount: D.m({ wire: "failedFileCount" }),
          ThreatFoundFileCount: D.m({ wire: "threatFoundFileCount" }),
          TotalFileCount: D.m({ wire: "totalFileCount" }),
          TotalBytes: D.m({ wire: "totalBytes" }),
          UniqueThreatCount: D.m({ wire: "uniqueThreatCount" }),
          Threats: D.m({
            wire: "threats",
            shape: D.list({
              Name: D.m({ wire: "name" }),
              Source: D.m({ wire: "source" }),
              Count: D.m({ wire: "count" }),
              Hash: D.m({ wire: "hash" }),
              ItemDetails: D.m({
                wire: "itemDetails",
                shape: D.list(o_ItemDetails),
              }),
            }),
          }),
        },
      }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareScan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/malware-scan-settings",
    input: { DetectorId: 0 },
    output: {
      ScanResourceCriteria: D.m({
        wire: "scanResourceCriteria",
        shape: {
          Include: D.m({ wire: "include", shape: D.map(o_ScanCondition) }),
          Exclude: D.m({ wire: "exclude", shape: D.map(o_ScanCondition) }),
        },
      }),
      EbsSnapshotPreservation: D.m({ wire: "ebsSnapshotPreservation" }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareScanSettings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/master",
    input: { DetectorId: 0 },
    output: {
      Master: D.m({
        wire: "master",
        shape: {
          AccountId: D.m({ wire: "accountId" }),
          InvitationId: D.m({ wire: "invitationId" }),
          RelationshipStatus: D.m({ wire: "relationshipStatus" }),
          InvitedAt: D.m({ wire: "invitedAt" }),
        },
      }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMasterAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member/detector/get",
    input: { DetectorId: 0, AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      MemberDataSourceConfigurations: D.m({
        wire: "members",
        shape: D.list({
          AccountId: D.m({ wire: "accountId" }),
          DataSources: D.m({
            wire: "dataSources",
            shape: o_DataSourceConfigurationsResult,
          }),
          Features: D.m({
            wire: "features",
            shape: D.list({
              Name: D.m({ wire: "name" }),
              Status: D.m({ wire: "status" }),
              UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
              AdditionalConfiguration: D.m({
                wire: "additionalConfiguration",
                shape: D.list({
                  Name: D.m({ wire: "name" }),
                  Status: D.m({ wire: "status" }),
                  UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
                }),
              }),
            }),
          }),
        }),
      }),
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemberDetectors",
})) as any;

export type GetMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves GuardDuty member accounts (of the current GuardDuty administrator account) specified by the account IDs.
 */
export const getMembers: API.OperationMethod<
  GetMembersRequest,
  GetMembersResponse,
  GetMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member/get",
    input: { DetectorId: 0, AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      Members: D.m({ wire: "members", shape: D.list(o_Member) }),
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /organization/statistics",
    output: {
      OrganizationDetails: D.m({
        wire: "organizationDetails",
        shape: {
          UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
          OrganizationStatistics: D.m({
            wire: "organizationStatistics",
            shape: {
              TotalAccountsCount: D.m({ wire: "totalAccountsCount" }),
              MemberAccountsCount: D.m({ wire: "memberAccountsCount" }),
              ActiveAccountsCount: D.m({ wire: "activeAccountsCount" }),
              EnabledAccountsCount: D.m({ wire: "enabledAccountsCount" }),
              CountByFeature: D.m({
                wire: "countByFeature",
                shape: D.list({
                  Name: D.m({ wire: "name" }),
                  EnabledAccountsCount: D.m({ wire: "enabledAccountsCount" }),
                  AdditionalConfiguration: D.m({
                    wire: "additionalConfiguration",
                    shape: D.list({
                      Name: D.m({ wire: "name" }),
                      EnabledAccountsCount: D.m({
                        wire: "enabledAccountsCount",
                      }),
                    }),
                  }),
                }),
              }),
            },
          }),
        },
      }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationStatistics",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/freeTrial/daysRemaining",
    input: { DetectorId: 0, AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      Accounts: D.m({
        wire: "accounts",
        shape: D.list({
          AccountId: D.m({ wire: "accountId" }),
          DataSources: D.m({
            wire: "dataSources",
            shape: {
              CloudTrail: D.m({
                wire: "cloudTrail",
                shape: o_DataSourceFreeTrial,
              }),
              DnsLogs: D.m({ wire: "dnsLogs", shape: o_DataSourceFreeTrial }),
              FlowLogs: D.m({ wire: "flowLogs", shape: o_DataSourceFreeTrial }),
              S3Logs: D.m({ wire: "s3Logs", shape: o_DataSourceFreeTrial }),
              Kubernetes: D.m({
                wire: "kubernetes",
                shape: {
                  AuditLogs: D.m({
                    wire: "auditLogs",
                    shape: o_DataSourceFreeTrial,
                  }),
                },
              }),
              MalwareProtection: D.m({
                wire: "malwareProtection",
                shape: {
                  ScanEc2InstanceWithFindings: D.m({
                    wire: "scanEc2InstanceWithFindings",
                    shape: o_DataSourceFreeTrial,
                  }),
                },
              }),
            },
          }),
          Features: D.m({
            wire: "features",
            shape: D.list({
              Name: D.m({ wire: "name" }),
              FreeTrialDaysRemaining: D.m({ wire: "freeTrialDaysRemaining" }),
            }),
          }),
        }),
      }),
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRemainingFreeTrialDays",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
    input: { DetectorId: 0, ThreatEntitySetId: 0 },
    output: {
      Name: D.m({ wire: "name" }),
      Format: D.m({ wire: "format" }),
      Location: D.m({ wire: "location" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
      ErrorDetails: D.m({ wire: "errorDetails" }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThreatEntitySet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
    input: { DetectorId: 0, ThreatIntelSetId: 0 },
    output: {
      Name: D.m({ wire: "name" }),
      Format: D.m({ wire: "format" }),
      Location: D.m({ wire: "location" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThreatIntelSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
    input: { DetectorId: 0, TrustedEntitySetId: 0 },
    output: {
      Name: D.m({ wire: "name" }),
      Format: D.m({ wire: "format" }),
      Location: D.m({ wire: "location" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
      ErrorDetails: D.m({ wire: "errorDetails" }),
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustedEntitySet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/usage/statistics",
    input: {
      DetectorId: 0,
      UsageStatisticType: D.m({ wire: "usageStatisticsType" }),
      UsageCriteria: D.m({
        wire: "usageCriteria",
        shape: {
          AccountIds: D.m({ wire: "accountIds" }),
          DataSources: D.m({ wire: "dataSources" }),
          Resources: D.m({ wire: "resources" }),
          Features: D.m({ wire: "features" }),
        },
      }),
      Unit: D.m({ wire: "unit" }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    output: {
      UsageStatistics: D.m({
        wire: "usageStatistics",
        shape: {
          SumByAccount: D.m({
            wire: "sumByAccount",
            shape: D.list({
              AccountId: D.m({ wire: "accountId" }),
              Total: D.m({ wire: "total", shape: o_Total }),
            }),
          }),
          TopAccountsByFeature: D.m({
            wire: "topAccountsByFeature",
            shape: D.list({
              Feature: D.m({ wire: "feature" }),
              Accounts: D.m({
                wire: "accounts",
                shape: D.list({
                  AccountId: D.m({ wire: "accountId" }),
                  Total: D.m({ wire: "total", shape: o_Total }),
                }),
              }),
            }),
          }),
          SumByDataSource: D.m({
            wire: "sumByDataSource",
            shape: D.list({
              DataSource: D.m({ wire: "dataSource" }),
              Total: D.m({ wire: "total", shape: o_Total }),
            }),
          }),
          SumByResource: D.m({
            wire: "sumByResource",
            shape: D.list(o_UsageResourceResult),
          }),
          TopResources: D.m({
            wire: "topResources",
            shape: D.list(o_UsageResourceResult),
          }),
          SumByFeature: D.m({
            wire: "sumByFeature",
            shape: D.list({
              Feature: D.m({ wire: "feature" }),
              Total: D.m({ wire: "total", shape: o_Total }),
            }),
          }),
        },
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
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

export type InviteMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member/invite",
    input: {
      DetectorId: 0,
      AccountIds: D.m({ wire: "accountIds" }),
      DisableEmailNotification: D.m({ wire: "disableEmailNotification" }),
      Message: D.m({ wire: "message" }),
    },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteMembers",
})) as any;

export type ListCoverageError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/coverage",
    input: {
      DetectorId: 0,
      NextToken: D.m({ wire: "nextToken" }),
      MaxResults: D.m({ wire: "maxResults" }),
      FilterCriteria: D.m({
        wire: "filterCriteria",
        shape: i_CoverageFilterCriteria,
      }),
      SortCriteria: D.m({
        wire: "sortCriteria",
        shape: {
          AttributeName: D.m({ wire: "attributeName" }),
          OrderBy: D.m({ wire: "orderBy" }),
        },
      }),
    },
    output: {
      Resources: D.m({
        wire: "resources",
        shape: D.list({
          ResourceId: D.m({ wire: "resourceId" }),
          DetectorId: D.m({ wire: "detectorId" }),
          AccountId: D.m({ wire: "accountId" }),
          ResourceDetails: D.m({
            wire: "resourceDetails",
            shape: {
              EksClusterDetails: D.m({
                wire: "eksClusterDetails",
                shape: {
                  ClusterName: D.m({ wire: "clusterName" }),
                  CoveredNodes: D.m({ wire: "coveredNodes" }),
                  CompatibleNodes: D.m({ wire: "compatibleNodes" }),
                  AddonDetails: D.m({
                    wire: "addonDetails",
                    shape: {
                      AddonVersion: D.m({ wire: "addonVersion" }),
                      AddonStatus: D.m({ wire: "addonStatus" }),
                    },
                  }),
                  ManagementType: D.m({ wire: "managementType" }),
                },
              }),
              EcsClusterDetails: D.m({
                wire: "ecsClusterDetails",
                shape: {
                  ClusterName: D.m({ wire: "clusterName" }),
                  FargateDetails: D.m({
                    wire: "fargateDetails",
                    shape: {
                      Issues: D.m({ wire: "issues" }),
                      ManagementType: D.m({ wire: "managementType" }),
                    },
                  }),
                  ContainerInstanceDetails: D.m({
                    wire: "containerInstanceDetails",
                    shape: {
                      CoveredContainerInstances: D.m({
                        wire: "coveredContainerInstances",
                      }),
                      CompatibleContainerInstances: D.m({
                        wire: "compatibleContainerInstances",
                      }),
                    },
                  }),
                },
              }),
              Ec2InstanceDetails: D.m({
                wire: "ec2InstanceDetails",
                shape: {
                  InstanceId: D.m({ wire: "instanceId" }),
                  InstanceType: D.m({ wire: "instanceType" }),
                  ClusterArn: D.m({ wire: "clusterArn" }),
                  AgentDetails: D.m({
                    wire: "agentDetails",
                    shape: { Version: D.m({ wire: "version" }) },
                  }),
                  ManagementType: D.m({ wire: "managementType" }),
                },
              }),
              ResourceType: D.m({ wire: "resourceType" }),
            },
          }),
          CoverageStatus: D.m({ wire: "coverageStatus" }),
          Issue: D.m({ wire: "issue" }),
          UpdatedAt: D.m({ wire: "updatedAt", shape: D.ts }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
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

export type ListDetectorsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /detector",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      DetectorIds: D.m({ wire: "detectorIds" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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

export type ListFiltersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/filter",
    input: {
      DetectorId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      FilterNames: D.m({ wire: "filterNames" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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

export type ListFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/findings",
    input: {
      DetectorId: 0,
      FindingCriteria: D.m({
        wire: "findingCriteria",
        shape: i_FindingCriteria,
      }),
      SortCriteria: D.m({ wire: "sortCriteria", shape: i_SortCriteria }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    output: {
      FindingIds: D.m({ wire: "findingIds" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/investigation/list",
    input: {
      DetectorId: 0,
      SortCriteria: D.m({
        wire: "sortCriteria",
        shape: {
          AttributeName: D.m({ wire: "attributeName" }),
          OrderBy: D.m({ wire: "orderBy" }),
        },
      }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    output: {
      Investigations: D.m({
        wire: "investigations",
        shape: D.list({
          InvestigationId: D.m({ wire: "investigationId" }),
          Status: D.m({ wire: "status" }),
          TriggerPrompt: D.m({ wire: "triggerPrompt" }),
          RiskLevel: D.m({ wire: "riskLevel" }),
          Confidence: D.m({ wire: "confidence" }),
          Title: D.m({ wire: "title" }),
          AccountId: D.m({ wire: "accountId" }),
          StartTime: D.m({ wire: "startTime", shape: D.ts }),
          EndTime: D.m({ wire: "endTime", shape: D.ts }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /invitation",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Invitations: D.m({
        wire: "invitations",
        shape: D.list({
          AccountId: D.m({ wire: "accountId" }),
          InvitationId: D.m({ wire: "invitationId" }),
          RelationshipStatus: D.m({ wire: "relationshipStatus" }),
          InvitedAt: D.m({ wire: "invitedAt" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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

export type ListIPSetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/ipset",
    input: {
      DetectorId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      IpSetIds: D.m({ wire: "ipSetIds" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /malware-protection-plan",
    input: { NextToken: D.m({ query: "nextToken" }) },
    output: {
      MalwareProtectionPlans: D.m({
        wire: "malwareProtectionPlans",
        shape: D.list({
          MalwareProtectionPlanId: D.m({ wire: "malwareProtectionPlanId" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMalwareProtectionPlans",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /malware-scan",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      FilterCriteria: D.m({
        wire: "filterCriteria",
        shape: {
          ListMalwareScansFilterCriterion: D.m({
            wire: "filterCriterion",
            shape: D.list({
              ListMalwareScansCriterionKey: D.m({ wire: "criterionKey" }),
              FilterCondition: D.m({
                wire: "filterCondition",
                shape: i_FilterCondition,
              }),
            }),
          }),
        },
      }),
      SortCriteria: D.m({ wire: "sortCriteria", shape: i_SortCriteria }),
    },
    output: {
      Scans: D.m({
        wire: "scans",
        shape: D.list({
          ResourceArn: D.m({ wire: "resourceArn" }),
          ResourceType: D.m({ wire: "resourceType" }),
          ScanId: D.m({ wire: "scanId" }),
          ScanStatus: D.m({ wire: "scanStatus" }),
          ScanResultStatus: D.m({ wire: "scanResultStatus" }),
          ScanType: D.m({ wire: "scanType" }),
          ScanStartedAt: D.m({ wire: "scanStartedAt", shape: D.ts }),
          ScanCompletedAt: D.m({ wire: "scanCompletedAt", shape: D.ts }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
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

export type ListMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/member",
    input: {
      DetectorId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      OnlyAssociated: D.m({ query: "onlyAssociated" }),
    },
    output: {
      Members: D.m({ wire: "members", shape: D.list(o_Member) }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /admin",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      AdminAccounts: D.m({
        wire: "adminAccounts",
        shape: D.list({
          AdminAccountId: D.m({ wire: "adminAccountId" }),
          AdminStatus: D.m({ wire: "adminStatus" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/publishingDestination",
    input: {
      DetectorId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Destinations: D.m({
        wire: "destinations",
        shape: D.list({
          DestinationId: D.m({ wire: "destinationId" }),
          DestinationType: D.m({ wire: "destinationType" }),
          Status: D.m({ wire: "status" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/threatentityset",
    input: {
      DetectorId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ThreatEntitySetIds: D.m({ wire: "threatEntitySetIds" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/threatintelset",
    input: {
      DetectorId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ThreatIntelSetIds: D.m({ wire: "threatIntelSetIds" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /detector/{DetectorId}/trustedentityset",
    input: {
      DetectorId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      TrustedEntitySetIds: D.m({ wire: "trustedEntitySetIds" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "POST /object-malware-scan/send",
    input: {
      S3Object: D.m({
        wire: "s3Object",
        shape: {
          Bucket: D.m({ wire: "bucket" }),
          Key: D.m({ wire: "key" }),
          VersionId: D.m({ wire: "versionId" }),
        },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendObjectMalwareScan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /malware-scan/start",
    input: {
      ResourceArn: D.m({ wire: "resourceArn" }),
      ClientToken: D.m({ idempotency: true, wire: "clientToken" }),
      ScanConfiguration: D.m({
        wire: "scanConfiguration",
        shape: {
          Role: D.m({ wire: "role" }),
          IncrementalScanDetails: D.m({
            wire: "incrementalScanDetails",
            shape: {
              BaselineResourceArn: D.m({ wire: "baselineResourceArn" }),
            },
          }),
          RecoveryPoint: D.m({
            wire: "recoveryPoint",
            shape: {
              BackupVaultName: D.m({ wire: "backupVaultName" }),
              ContinuousScanDetails: D.m({
                wire: "continuousScanDetails",
                shape: {
                  StartTime: D.m({ wire: "startTime" }),
                  EndTime: D.m({ wire: "endTime" }),
                },
              }),
            },
          }),
        },
      }),
    },
    output: { ScanId: D.m({ wire: "scanId" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMalwareScan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member/start",
    input: { DetectorId: 0, AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMonitoringMembers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member/stop",
    input: { DetectorId: 0, AccountIds: D.m({ wire: "accountIds" }) },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMonitoringMembers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/findings/unarchive",
    input: { DetectorId: 0, FindingIds: D.m({ wire: "findingIds" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveFindings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDetectorError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}",
    input: {
      DetectorId: 0,
      Enable: D.m({ wire: "enable" }),
      FindingPublishingFrequency: D.m({ wire: "findingPublishingFrequency" }),
      DataSources: D.m({
        wire: "dataSources",
        shape: i_DataSourceConfigurations,
      }),
      Features: D.m({
        wire: "features",
        shape: D.list(i_DetectorFeatureConfiguration),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDetector",
})) as any;

export type UpdateFilterError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the filter specified by the filter name.
 */
export const updateFilter: API.OperationMethod<
  UpdateFilterRequest,
  UpdateFilterResponse,
  UpdateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/filter/{FilterName}",
    input: {
      DetectorId: 0,
      FilterName: 0,
      Description: D.m({ wire: "description" }),
      Action: D.m({ wire: "action" }),
      Rank: D.m({ wire: "rank" }),
      FindingCriteria: D.m({
        wire: "findingCriteria",
        shape: i_FindingCriteria,
      }),
    },
    output: { Name: D.m({ wire: "name" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFilter",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/findings/feedback",
    input: {
      DetectorId: 0,
      FindingIds: D.m({ wire: "findingIds" }),
      Feedback: D.m({ wire: "feedback" }),
      Comments: D.m({ wire: "comments" }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFindingsFeedback",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/ipset/{IpSetId}",
    input: {
      DetectorId: 0,
      IpSetId: 0,
      Name: D.m({ wire: "name" }),
      Location: D.m({ wire: "location" }),
      Activate: D.m({ wire: "activate" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIPSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /malware-protection-plan/{MalwareProtectionPlanId}",
    input: {
      MalwareProtectionPlanId: 0,
      Role: D.m({ wire: "role" }),
      Actions: D.m({ wire: "actions", shape: i_MalwareProtectionPlanActions }),
      ProtectedResource: D.m({
        wire: "protectedResource",
        shape: {
          S3Bucket: D.m({
            wire: "s3Bucket",
            shape: { ObjectPrefixes: D.m({ wire: "objectPrefixes" }) },
          }),
        },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMalwareProtectionPlan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/malware-scan-settings",
    input: {
      DetectorId: 0,
      ScanResourceCriteria: D.m({
        wire: "scanResourceCriteria",
        shape: {
          Include: D.m({ wire: "include", shape: D.map(i_ScanCondition) }),
          Exclude: D.m({ wire: "exclude", shape: D.map(i_ScanCondition) }),
        },
      }),
      EbsSnapshotPreservation: D.m({ wire: "ebsSnapshotPreservation" }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMalwareScanSettings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/member/detector/update",
    input: {
      DetectorId: 0,
      AccountIds: D.m({ wire: "accountIds" }),
      DataSources: D.m({
        wire: "dataSources",
        shape: i_DataSourceConfigurations,
      }),
      Features: D.m({
        wire: "features",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          Status: D.m({ wire: "status" }),
          AdditionalConfiguration: D.m({
            wire: "additionalConfiguration",
            shape: D.list({
              Name: D.m({ wire: "name" }),
              Status: D.m({ wire: "status" }),
            }),
          }),
        }),
      }),
    },
    output: {
      UnprocessedAccounts: D.m({
        wire: "unprocessedAccounts",
        shape: D.list(o_UnprocessedAccount),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMemberDetectors",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/admin",
    input: {
      DetectorId: 0,
      AutoEnable: D.m({ wire: "autoEnable" }),
      DataSources: D.m({
        wire: "dataSources",
        shape: {
          S3Logs: D.m({
            wire: "s3Logs",
            shape: { AutoEnable: D.m({ wire: "autoEnable" }) },
          }),
          Kubernetes: D.m({
            wire: "kubernetes",
            shape: {
              AuditLogs: D.m({
                wire: "auditLogs",
                shape: { AutoEnable: D.m({ wire: "autoEnable" }) },
              }),
            },
          }),
          MalwareProtection: D.m({
            wire: "malwareProtection",
            shape: {
              ScanEc2InstanceWithFindings: D.m({
                wire: "scanEc2InstanceWithFindings",
                shape: {
                  EbsVolumes: D.m({
                    wire: "ebsVolumes",
                    shape: { AutoEnable: D.m({ wire: "autoEnable" }) },
                  }),
                },
              }),
            },
          }),
        },
      }),
      Features: D.m({
        wire: "features",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          AutoEnable: D.m({ wire: "autoEnable" }),
          AdditionalConfiguration: D.m({
            wire: "additionalConfiguration",
            shape: D.list({
              Name: D.m({ wire: "name" }),
              AutoEnable: D.m({ wire: "autoEnable" }),
            }),
          }),
        }),
      }),
      AutoEnableOrganizationMembers: D.m({
        wire: "autoEnableOrganizationMembers",
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/publishingDestination/{DestinationId}",
    input: {
      DetectorId: 0,
      DestinationId: 0,
      DestinationProperties: D.m({
        wire: "destinationProperties",
        shape: i_DestinationProperties,
      }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublishingDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
    input: {
      DetectorId: 0,
      ThreatEntitySetId: 0,
      Name: D.m({ wire: "name" }),
      Location: D.m({ wire: "location" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
      Activate: D.m({ wire: "activate" }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatEntitySet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
    input: {
      DetectorId: 0,
      ThreatIntelSetId: 0,
      Name: D.m({ wire: "name" }),
      Location: D.m({ wire: "location" }),
      Activate: D.m({ wire: "activate" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatIntelSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
    input: {
      DetectorId: 0,
      TrustedEntitySetId: 0,
      Name: D.m({ wire: "name" }),
      Location: D.m({ wire: "location" }),
      ExpectedBucketOwner: D.m({ wire: "expectedBucketOwner" }),
      Activate: D.m({ wire: "activate" }),
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustedEntitySet",
})) as any;

const i_CoverageFilterCriteria: D.LazyStruct = () => ({
  FilterCriterion: D.m({
    wire: "filterCriterion",
    shape: D.list({
      CriterionKey: D.m({ wire: "criterionKey" }),
      FilterCondition: D.m({
        wire: "filterCondition",
        shape: {
          Equals: D.m({ wire: "equals" }),
          NotEquals: D.m({ wire: "notEquals" }),
        },
      }),
    }),
  }),
});
const i_DataSourceConfigurations: D.LazyStruct = () => ({
  S3Logs: D.m({ wire: "s3Logs", shape: { Enable: D.m({ wire: "enable" }) } }),
  Kubernetes: D.m({
    wire: "kubernetes",
    shape: {
      AuditLogs: D.m({
        wire: "auditLogs",
        shape: { Enable: D.m({ wire: "enable" }) },
      }),
    },
  }),
  MalwareProtection: D.m({
    wire: "malwareProtection",
    shape: {
      ScanEc2InstanceWithFindings: D.m({
        wire: "scanEc2InstanceWithFindings",
        shape: { EbsVolumes: D.m({ wire: "ebsVolumes" }) },
      }),
    },
  }),
});
const i_DestinationProperties: D.LazyStruct = () => ({
  DestinationArn: D.m({ wire: "destinationArn" }),
  KmsKeyArn: D.m({ wire: "kmsKeyArn" }),
});
const i_DetectorFeatureConfiguration: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
  Status: D.m({ wire: "status" }),
  AdditionalConfiguration: D.m({
    wire: "additionalConfiguration",
    shape: D.list({
      Name: D.m({ wire: "name" }),
      Status: D.m({ wire: "status" }),
    }),
  }),
});
const i_FilterCondition: D.LazyStruct = () => ({
  EqualsValue: D.m({ wire: "equalsValue" }),
  GreaterThan: D.m({ wire: "greaterThan" }),
  LessThan: D.m({ wire: "lessThan" }),
});
const i_FindingCriteria: D.LazyStruct = () => ({
  Criterion: D.m({
    wire: "criterion",
    shape: D.map({
      Eq: D.m({ wire: "eq" }),
      Neq: D.m({ wire: "neq" }),
      Gt: D.m({ wire: "gt" }),
      Gte: D.m({ wire: "gte" }),
      Lt: D.m({ wire: "lt" }),
      Lte: D.m({ wire: "lte" }),
      Equals: D.m({ wire: "equals" }),
      NotEquals: D.m({ wire: "notEquals" }),
      GreaterThan: D.m({ wire: "greaterThan" }),
      GreaterThanOrEqual: D.m({ wire: "greaterThanOrEqual" }),
      LessThan: D.m({ wire: "lessThan" }),
      LessThanOrEqual: D.m({ wire: "lessThanOrEqual" }),
      Matches: D.m({ wire: "matches" }),
      NotMatches: D.m({ wire: "notMatches" }),
    }),
  }),
});
const i_MalwareProtectionPlanActions: D.LazyStruct = () => ({
  Tagging: D.m({ wire: "tagging", shape: { Status: D.m({ wire: "status" }) } }),
});
const i_ScanCondition: D.LazyStruct = () => ({
  MapEquals: D.m({
    wire: "mapEquals",
    shape: D.list({ Key: D.m({ wire: "key" }), Value: D.m({ wire: "value" }) }),
  }),
});
const i_SortCriteria: D.LazyStruct = () => ({
  AttributeName: D.m({ wire: "attributeName" }),
  OrderBy: D.m({ wire: "orderBy" }),
});
const o_AnomalyObject: D.LazyStruct = () => ({
  ProfileType: D.m({ wire: "profileType" }),
  ProfileSubtype: D.m({ wire: "profileSubtype" }),
  Observations: D.m({
    wire: "observations",
    shape: { Text: D.m({ wire: "text" }), Number: D.m({ wire: "number" }) },
  }),
});
const o_BlockPublicAccess: D.LazyStruct = () => ({
  IgnorePublicAcls: D.m({ wire: "ignorePublicAcls" }),
  RestrictPublicBuckets: D.m({ wire: "restrictPublicBuckets" }),
  BlockPublicAcls: D.m({ wire: "blockPublicAcls" }),
  BlockPublicPolicy: D.m({ wire: "blockPublicPolicy" }),
});
const o_Container: D.LazyStruct = () => ({
  ContainerRuntime: D.m({ wire: "containerRuntime" }),
  Id: D.m({ wire: "id" }),
  Name: D.m({ wire: "name" }),
  Image: D.m({ wire: "image" }),
  ImagePrefix: D.m({ wire: "imagePrefix" }),
  VolumeMounts: D.m({
    wire: "volumeMounts",
    shape: D.list({
      Name: D.m({ wire: "name" }),
      MountPath: D.m({ wire: "mountPath" }),
    }),
  }),
  SecurityContext: D.m({
    wire: "securityContext",
    shape: {
      Privileged: D.m({ wire: "privileged" }),
      AllowPrivilegeEscalation: D.m({ wire: "allowPrivilegeEscalation" }),
    },
  }),
});
const o_DataSourceConfigurationsResult: D.LazyStruct = () => ({
  CloudTrail: D.m({
    wire: "cloudTrail",
    shape: { Status: D.m({ wire: "status" }) },
  }),
  DNSLogs: D.m({ wire: "dnsLogs", shape: { Status: D.m({ wire: "status" }) } }),
  FlowLogs: D.m({
    wire: "flowLogs",
    shape: { Status: D.m({ wire: "status" }) },
  }),
  S3Logs: D.m({ wire: "s3Logs", shape: { Status: D.m({ wire: "status" }) } }),
  Kubernetes: D.m({
    wire: "kubernetes",
    shape: {
      AuditLogs: D.m({
        wire: "auditLogs",
        shape: { Status: D.m({ wire: "status" }) },
      }),
    },
  }),
  MalwareProtection: D.m({
    wire: "malwareProtection",
    shape: o_MalwareProtectionConfigurationResult,
  }),
});
const o_DataSourceFreeTrial: D.LazyStruct = () => ({
  FreeTrialDaysRemaining: D.m({ wire: "freeTrialDaysRemaining" }),
});
const o_IamInstanceProfile: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Id: D.m({ wire: "id" }),
});
const o_IncrementalScanDetails: D.LazyStruct = () => ({
  BaselineResourceArn: D.m({ wire: "baselineResourceArn" }),
});
const o_Indicator: D.LazyStruct = () => ({
  Key: D.m({ wire: "key" }),
  Values: D.m({ wire: "values" }),
  Title: D.m({ wire: "title" }),
});
const o_ItemDetails: D.LazyStruct = () => ({
  ResourceArn: D.m({ wire: "resourceArn" }),
  ItemPath: D.m({ wire: "itemPath" }),
  Hash: D.m({ wire: "hash" }),
  AdditionalInfo: D.m({
    wire: "additionalInfo",
    shape: {
      VersionId: D.m({ wire: "versionId" }),
      DeviceName: D.m({ wire: "deviceName" }),
    },
  }),
});
const o_LocalIpDetails: D.LazyStruct = () => ({
  IpAddressV4: D.m({ wire: "ipAddressV4", shape: D.secret }),
  IpAddressV6: D.m({ wire: "ipAddressV6", shape: D.secret }),
});
const o_LocalPortDetails: D.LazyStruct = () => ({
  Port: D.m({ wire: "port" }),
  PortName: D.m({ wire: "portName" }),
});
const o_MalwareProtectionConfigurationResult: D.LazyStruct = () => ({
  ScanEc2InstanceWithFindings: D.m({
    wire: "scanEc2InstanceWithFindings",
    shape: {
      EbsVolumes: D.m({
        wire: "ebsVolumes",
        shape: {
          Status: D.m({ wire: "status" }),
          Reason: D.m({ wire: "reason" }),
        },
      }),
    },
  }),
  ServiceRole: D.m({ wire: "serviceRole" }),
});
const o_Member: D.LazyStruct = () => ({
  AccountId: D.m({ wire: "accountId" }),
  DetectorId: D.m({ wire: "detectorId" }),
  MasterId: D.m({ wire: "masterId" }),
  Email: D.m({ wire: "email", shape: D.secret }),
  RelationshipStatus: D.m({ wire: "relationshipStatus" }),
  InvitedAt: D.m({ wire: "invitedAt" }),
  UpdatedAt: D.m({ wire: "updatedAt" }),
  AdministratorId: D.m({ wire: "administratorId" }),
});
const o_PrivateIpAddressDetails: D.LazyStruct = () => ({
  PrivateDnsName: D.m({ wire: "privateDnsName" }),
  PrivateIpAddress: D.m({ wire: "privateIpAddress", shape: D.secret }),
});
const o_ProcessDetails: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
  ExecutablePath: D.m({ wire: "executablePath" }),
  ExecutableSha256: D.m({ wire: "executableSha256" }),
  NamespacePid: D.m({ wire: "namespacePid" }),
  Pwd: D.m({ wire: "pwd" }),
  Pid: D.m({ wire: "pid" }),
  StartTime: D.m({ wire: "startTime", shape: D.ts }),
  Uuid: D.m({ wire: "uuid" }),
  ParentUuid: D.m({ wire: "parentUuid" }),
  User: D.m({ wire: "user" }),
  UserId: D.m({ wire: "userId" }),
  Euid: D.m({ wire: "euid" }),
  Lineage: D.m({
    wire: "lineage",
    shape: D.list({
      StartTime: D.m({ wire: "startTime", shape: D.ts }),
      NamespacePid: D.m({ wire: "namespacePid" }),
      UserId: D.m({ wire: "userId" }),
      Name: D.m({ wire: "name" }),
      Pid: D.m({ wire: "pid" }),
      Uuid: D.m({ wire: "uuid" }),
      ExecutablePath: D.m({ wire: "executablePath" }),
      Euid: D.m({ wire: "euid" }),
      ParentUuid: D.m({ wire: "parentUuid" }),
    }),
  }),
});
const o_ProductCode: D.LazyStruct = () => ({
  Code: D.m({ wire: "productCodeId" }),
  ProductType: D.m({ wire: "productCodeType" }),
});
const o_PublicAccessConfiguration: D.LazyStruct = () => ({
  PublicAclAccess: D.m({ wire: "publicAclAccess" }),
  PublicPolicyAccess: D.m({ wire: "publicPolicyAccess" }),
  PublicAclIgnoreBehavior: D.m({ wire: "publicAclIgnoreBehavior" }),
  PublicBucketRestrictBehavior: D.m({ wire: "publicBucketRestrictBehavior" }),
});
const o_RemoteIpDetails: D.LazyStruct = () => ({
  City: D.m({ wire: "city", shape: { CityName: D.m({ wire: "cityName" }) } }),
  Country: D.m({
    wire: "country",
    shape: {
      CountryCode: D.m({ wire: "countryCode" }),
      CountryName: D.m({ wire: "countryName" }),
    },
  }),
  GeoLocation: D.m({
    wire: "geoLocation",
    shape: { Lat: D.m({ wire: "lat" }), Lon: D.m({ wire: "lon" }) },
  }),
  IpAddressV4: D.m({ wire: "ipAddressV4", shape: D.secret }),
  IpAddressV6: D.m({ wire: "ipAddressV6", shape: D.secret }),
  Organization: D.m({
    wire: "organization",
    shape: {
      Asn: D.m({ wire: "asn" }),
      AsnOrg: D.m({ wire: "asnOrg" }),
      Isp: D.m({ wire: "isp" }),
      Org: D.m({ wire: "org" }),
    },
  }),
});
const o_ScanCondition: D.LazyStruct = () => ({
  MapEquals: D.m({
    wire: "mapEquals",
    shape: D.list({ Key: D.m({ wire: "key" }), Value: D.m({ wire: "value" }) }),
  }),
});
const o_ScanConfigurationContinuousScanDetails: D.LazyStruct = () => ({
  StartTime: D.m({ wire: "startTime", shape: D.ts }),
  EndTime: D.m({ wire: "endTime", shape: D.ts }),
});
const o_SecurityGroup: D.LazyStruct = () => ({
  GroupId: D.m({ wire: "groupId" }),
  GroupName: D.m({ wire: "groupName" }),
});
const o_Tag: D.LazyStruct = () => ({
  Key: D.m({ wire: "key" }),
  Value: D.m({ wire: "value" }),
});
const o_Total: D.LazyStruct = () => ({
  Amount: D.m({ wire: "amount" }),
  Unit: D.m({ wire: "unit" }),
});
const o_TriggerDetails: D.LazyStruct = () => ({
  GuardDutyFindingId: D.m({ wire: "guardDutyFindingId" }),
  Description: D.m({ wire: "description" }),
  TriggerType: D.m({ wire: "triggerType" }),
});
const o_UnprocessedAccount: D.LazyStruct = () => ({
  AccountId: D.m({ wire: "accountId" }),
  Result: D.m({ wire: "result" }),
});
const o_UsageResourceResult: D.LazyStruct = () => ({
  Resource: D.m({ wire: "resource" }),
  Total: D.m({ wire: "total", shape: o_Total }),
});
const o_Volume: D.LazyStruct = () => ({
  Name: D.m({ wire: "name" }),
  HostPath: D.m({ wire: "hostPath", shape: { Path: D.m({ wire: "path" }) } }),
});
const o_VolumeDetail: D.LazyStruct = () => ({
  VolumeArn: D.m({ wire: "volumeArn" }),
  VolumeType: D.m({ wire: "volumeType" }),
  DeviceName: D.m({ wire: "deviceName" }),
  VolumeSizeInGB: D.m({ wire: "volumeSizeInGB" }),
  EncryptionType: D.m({ wire: "encryptionType" }),
  SnapshotArn: D.m({ wire: "snapshotArn" }),
  KmsKeyArn: D.m({ wire: "kmsKeyArn" }),
});
