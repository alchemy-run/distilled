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
  sdkId: "Macie2",
  target: "Macie2",
  version: "2020-01-01",
  sigv4: "macie2",
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
                `https://macie2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://macie2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://macie2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://macie2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class MacieNotEnabled
  extends /*@__PURE__*/ TE.TaggedError("MacieNotEnabled", ["RetryableError"], {
    synthetic: {
      from: "AccessDeniedException",
      message: { matches: "Macie is(n[’']t| not) enabled" },
    },
  })<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableEntityException",
    ["BadRequestError"],
    { status: 422 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export interface AcceptInvitationRequest {
  administratorAccountId?: string;
  invitationId?: string;
  masterAccount?: string;
}
export interface AcceptInvitationResponse {}
export type __listOf__string = string[];
export interface BatchGetCustomDataIdentifiersRequest {
  ids?: string[];
}
export type __timestampIso8601 = Date;
export interface BatchGetCustomDataIdentifierSummary {
  arn?: string;
  createdAt?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  name?: string;
}
export type __listOfBatchGetCustomDataIdentifierSummary =
  BatchGetCustomDataIdentifierSummary[];
export interface BatchGetCustomDataIdentifiersResponse {
  customDataIdentifiers?: BatchGetCustomDataIdentifierSummary[];
  notFoundIdentifierIds?: string[];
}
export type AutomatedDiscoveryAccountStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface AutomatedDiscoveryAccountUpdate {
  accountId?: string;
  status?: AutomatedDiscoveryAccountStatus;
}
export type __listOfAutomatedDiscoveryAccountUpdate =
  AutomatedDiscoveryAccountUpdate[];
export interface BatchUpdateAutomatedDiscoveryAccountsRequest {
  accounts?: AutomatedDiscoveryAccountUpdate[];
}
export type AutomatedDiscoveryAccountUpdateErrorCode =
  | "ACCOUNT_PAUSED"
  | "ACCOUNT_NOT_FOUND"
  | (string & {});
export interface AutomatedDiscoveryAccountUpdateError {
  accountId?: string;
  errorCode?: AutomatedDiscoveryAccountUpdateErrorCode;
}
export type __listOfAutomatedDiscoveryAccountUpdateError =
  AutomatedDiscoveryAccountUpdateError[];
export interface BatchUpdateAutomatedDiscoveryAccountsResponse {
  errors?: AutomatedDiscoveryAccountUpdateError[];
}
export type __stringMin1Max512PatternSS = string;
export type __stringMin3Max255PatternAZaZ093255 = string;
export type __stringMin1Max1024PatternSS = string;
export interface S3WordsList {
  bucketName?: string;
  objectKey?: string;
}
export interface AllowListCriteria {
  regex?: string;
  s3WordsList?: S3WordsList;
}
export type __stringMin1Max128Pattern = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateAllowListRequest {
  clientToken?: string;
  criteria?: AllowListCriteria;
  description?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export type __stringMin71Max89PatternArnAwsAwsCnAwsUsGovMacie2AZ19920D12AllowListAZ0922 =
  string;
export type __stringMin22Max22PatternAZ0922 = string;
export interface CreateAllowListResponse {
  arn?: string;
  id?: string;
}
export type JobType = "ONE_TIME" | "SCHEDULED" | (string & {});
export type ManagedDataIdentifierSelector =
  | "ALL"
  | "EXCLUDE"
  | "INCLUDE"
  | "NONE"
  | "RECOMMENDED"
  | (string & {});
export type JobComparator =
  | "EQ"
  | "GT"
  | "GTE"
  | "LT"
  | "LTE"
  | "NE"
  | "CONTAINS"
  | "STARTS_WITH"
  | (string & {});
export type SimpleCriterionKeyForJob =
  | "ACCOUNT_ID"
  | "S3_BUCKET_NAME"
  | "S3_BUCKET_EFFECTIVE_PERMISSION"
  | "S3_BUCKET_SHARED_ACCESS"
  | (string & {});
export interface SimpleCriterionForJob {
  comparator?: JobComparator;
  key?: SimpleCriterionKeyForJob;
  values?: string[];
}
export interface TagCriterionPairForJob {
  key?: string;
  value?: string;
}
export type __listOfTagCriterionPairForJob = TagCriterionPairForJob[];
export interface TagCriterionForJob {
  comparator?: JobComparator;
  tagValues?: TagCriterionPairForJob[];
}
export interface CriteriaForJob {
  simpleCriterion?: SimpleCriterionForJob;
  tagCriterion?: TagCriterionForJob;
}
export type __listOfCriteriaForJob = CriteriaForJob[];
export interface CriteriaBlockForJob {
  and?: CriteriaForJob[];
}
export interface S3BucketCriteriaForJob {
  excludes?: CriteriaBlockForJob;
  includes?: CriteriaBlockForJob;
}
export interface S3BucketDefinitionForJob {
  accountId?: string;
  buckets?: string[];
}
export type __listOfS3BucketDefinitionForJob = S3BucketDefinitionForJob[];
export type ScopeFilterKey =
  | "OBJECT_EXTENSION"
  | "OBJECT_LAST_MODIFIED_DATE"
  | "OBJECT_SIZE"
  | "OBJECT_KEY"
  | (string & {});
export interface SimpleScopeTerm {
  comparator?: JobComparator;
  key?: ScopeFilterKey;
  values?: string[];
}
export interface TagValuePair {
  key?: string;
  value?: string;
}
export type __listOfTagValuePair = TagValuePair[];
export type TagTarget = "S3_OBJECT" | (string & {});
export interface TagScopeTerm {
  comparator?: JobComparator;
  key?: string;
  tagValues?: TagValuePair[];
  target?: TagTarget;
}
export interface JobScopeTerm {
  simpleScopeTerm?: SimpleScopeTerm;
  tagScopeTerm?: TagScopeTerm;
}
export type __listOfJobScopeTerm = JobScopeTerm[];
export interface JobScopingBlock {
  and?: JobScopeTerm[];
}
export interface Scoping {
  excludes?: JobScopingBlock;
  includes?: JobScopingBlock;
}
export interface S3JobDefinition {
  bucketCriteria?: S3BucketCriteriaForJob;
  bucketDefinitions?: S3BucketDefinitionForJob[];
  scoping?: Scoping;
}
export interface DailySchedule {}
export interface MonthlySchedule {
  dayOfMonth?: number;
}
export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export interface WeeklySchedule {
  dayOfWeek?: DayOfWeek;
}
export interface JobScheduleFrequency {
  dailySchedule?: DailySchedule;
  monthlySchedule?: MonthlySchedule;
  weeklySchedule?: WeeklySchedule;
}
export interface CreateClassificationJobRequest {
  allowListIds?: string[];
  clientToken?: string;
  customDataIdentifierIds?: string[];
  description?: string;
  initialRun?: boolean;
  jobType?: JobType;
  managedDataIdentifierIds?: string[];
  managedDataIdentifierSelector?: ManagedDataIdentifierSelector;
  name?: string;
  s3JobDefinition?: S3JobDefinition;
  samplingPercentage?: number;
  scheduleFrequency?: JobScheduleFrequency;
  tags?: { [key: string]: string | undefined };
}
export interface CreateClassificationJobResponse {
  jobArn?: string;
  jobId?: string;
}
export type DataIdentifierSeverity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export interface SeverityLevel {
  occurrencesThreshold?: number;
  severity?: DataIdentifierSeverity;
}
export type SeverityLevelList = SeverityLevel[];
export interface CreateCustomDataIdentifierRequest {
  clientToken?: string;
  description?: string;
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  name?: string;
  regex?: string;
  severityLevels?: SeverityLevel[];
  tags?: { [key: string]: string | undefined };
}
export interface CreateCustomDataIdentifierResponse {
  customDataIdentifierId?: string;
}
export type FindingsFilterAction = "ARCHIVE" | "NOOP" | (string & {});
export interface CriterionAdditionalProperties {
  eq?: string[];
  eqExactMatch?: string[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  neq?: string[];
}
export type Criterion = {
  [key: string]: CriterionAdditionalProperties | undefined;
};
export interface FindingCriteria {
  criterion?: { [key: string]: CriterionAdditionalProperties | undefined };
}
export interface CreateFindingsFilterRequest {
  action?: FindingsFilterAction;
  clientToken?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  name?: string;
  position?: number;
  tags?: { [key: string]: string | undefined };
}
export interface CreateFindingsFilterResponse {
  arn?: string;
  id?: string;
}
export interface CreateInvitationsRequest {
  accountIds?: string[];
  disableEmailNotification?: boolean;
  message?: string;
}
export type ErrorCode = "ClientError" | "InternalError" | (string & {});
export interface UnprocessedAccount {
  accountId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export type __listOfUnprocessedAccount = UnprocessedAccount[];
export interface CreateInvitationsResponse {
  unprocessedAccounts?: UnprocessedAccount[];
}
export interface AccountDetail {
  accountId?: string;
  email?: string;
}
export interface CreateMemberRequest {
  account?: AccountDetail;
  tags?: { [key: string]: string | undefined };
}
export interface CreateMemberResponse {
  arn?: string;
}
export type FindingType =
  | "SensitiveData:S3Object/Multiple"
  | "SensitiveData:S3Object/Financial"
  | "SensitiveData:S3Object/Personal"
  | "SensitiveData:S3Object/Credentials"
  | "SensitiveData:S3Object/CustomIdentifier"
  | "Policy:IAMUser/S3BucketPublic"
  | "Policy:IAMUser/S3BucketSharedExternally"
  | "Policy:IAMUser/S3BucketReplicatedExternally"
  | "Policy:IAMUser/S3BucketEncryptionDisabled"
  | "Policy:IAMUser/S3BlockPublicAccessDisabled"
  | "Policy:IAMUser/S3BucketSharedWithCloudFront"
  | (string & {});
export type __listOfFindingType = FindingType[];
export interface CreateSampleFindingsRequest {
  findingTypes?: FindingType[];
}
export interface CreateSampleFindingsResponse {}
export interface DeclineInvitationsRequest {
  accountIds?: string[];
}
export interface DeclineInvitationsResponse {
  unprocessedAccounts?: UnprocessedAccount[];
}
export interface DeleteAllowListRequest {
  id: string;
  ignoreJobChecks?: string;
}
export interface DeleteAllowListResponse {}
export interface DeleteCustomDataIdentifierRequest {
  id: string;
}
export interface DeleteCustomDataIdentifierResponse {}
export interface DeleteFindingsFilterRequest {
  id: string;
}
export interface DeleteFindingsFilterResponse {}
export interface DeleteInvitationsRequest {
  accountIds?: string[];
}
export interface DeleteInvitationsResponse {
  unprocessedAccounts?: UnprocessedAccount[];
}
export interface DeleteMemberRequest {
  id: string;
}
export interface DeleteMemberResponse {}
export interface BucketCriteriaAdditionalProperties {
  eq?: string[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  neq?: string[];
  prefix?: string;
}
export type BucketCriteria = {
  [key: string]: BucketCriteriaAdditionalProperties | undefined;
};
export type OrderBy = "ASC" | "DESC" | (string & {});
export interface BucketSortCriteria {
  attributeName?: string;
  orderBy?: OrderBy;
}
export interface DescribeBucketsRequest {
  criteria?: { [key: string]: BucketCriteriaAdditionalProperties | undefined };
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: BucketSortCriteria;
}
export type AllowsUnencryptedObjectUploads =
  | "TRUE"
  | "FALSE"
  | "UNKNOWN"
  | (string & {});
export type AutomatedDiscoveryMonitoringStatus =
  | "MONITORED"
  | "NOT_MONITORED"
  | (string & {});
export type BucketMetadataErrorCode =
  | "ACCESS_DENIED"
  | "BUCKET_COUNT_EXCEEDS_QUOTA"
  | (string & {});
export type IsDefinedInJob = "TRUE" | "FALSE" | "UNKNOWN" | (string & {});
export type IsMonitoredByJob = "TRUE" | "FALSE" | "UNKNOWN" | (string & {});
export interface JobDetails {
  isDefinedInJob?: IsDefinedInJob;
  isMonitoredByJob?: IsMonitoredByJob;
  lastJobId?: string;
  lastJobRunTime?: Date;
}
export interface ObjectCountByEncryptionType {
  customerManaged?: number;
  kmsManaged?: number;
  s3Managed?: number;
  unencrypted?: number;
  unknown?: number;
}
export type EffectivePermission =
  | "PUBLIC"
  | "NOT_PUBLIC"
  | "UNKNOWN"
  | (string & {});
export interface BlockPublicAccess {
  blockPublicAcls?: boolean;
  blockPublicPolicy?: boolean;
  ignorePublicAcls?: boolean;
  restrictPublicBuckets?: boolean;
}
export interface AccountLevelPermissions {
  blockPublicAccess?: BlockPublicAccess;
}
export interface AccessControlList {
  allowsPublicReadAccess?: boolean;
  allowsPublicWriteAccess?: boolean;
}
export interface BucketPolicy {
  allowsPublicReadAccess?: boolean;
  allowsPublicWriteAccess?: boolean;
}
export interface BucketLevelPermissions {
  accessControlList?: AccessControlList;
  blockPublicAccess?: BlockPublicAccess;
  bucketPolicy?: BucketPolicy;
}
export interface BucketPermissionConfiguration {
  accountLevelPermissions?: AccountLevelPermissions;
  bucketLevelPermissions?: BucketLevelPermissions;
}
export interface BucketPublicAccess {
  effectivePermission?: EffectivePermission;
  permissionConfiguration?: BucketPermissionConfiguration;
}
export interface ReplicationDetails {
  replicated?: boolean;
  replicatedExternally?: boolean;
  replicationAccounts?: string[];
}
export type Type =
  | "NONE"
  | "AES256"
  | "aws:kms"
  | "aws:kms:dsse"
  | (string & {});
export interface BucketServerSideEncryption {
  kmsMasterKeyId?: string;
  type?: Type;
}
export type SharedAccess =
  | "EXTERNAL"
  | "INTERNAL"
  | "NOT_SHARED"
  | "UNKNOWN"
  | (string & {});
export interface KeyValuePair {
  key?: string;
  value?: string;
}
export type __listOfKeyValuePair = KeyValuePair[];
export interface ObjectLevelStatistics {
  fileType?: number;
  storageClass?: number;
  total?: number;
}
export interface BucketMetadata {
  accountId?: string;
  allowsUnencryptedObjectUploads?: AllowsUnencryptedObjectUploads;
  automatedDiscoveryMonitoringStatus?: AutomatedDiscoveryMonitoringStatus;
  bucketArn?: string;
  bucketCreatedAt?: Date;
  bucketName?: string;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  errorCode?: BucketMetadataErrorCode;
  errorMessage?: string;
  jobDetails?: JobDetails;
  lastAutomatedDiscoveryTime?: Date;
  lastUpdated?: Date;
  objectCount?: number;
  objectCountByEncryptionType?: ObjectCountByEncryptionType;
  publicAccess?: BucketPublicAccess;
  region?: string;
  replicationDetails?: ReplicationDetails;
  sensitivityScore?: number;
  serverSideEncryption?: BucketServerSideEncryption;
  sharedAccess?: SharedAccess;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  tags?: KeyValuePair[];
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
  versioning?: boolean;
}
export type __listOfBucketMetadata = BucketMetadata[];
export interface DescribeBucketsResponse {
  buckets?: BucketMetadata[];
  nextToken?: string;
}
export interface DescribeClassificationJobRequest {
  jobId: string;
}
export type JobStatus =
  | "RUNNING"
  | "PAUSED"
  | "CANCELLED"
  | "COMPLETE"
  | "IDLE"
  | "USER_PAUSED"
  | (string & {});
export type LastRunErrorStatusCode = "NONE" | "ERROR" | (string & {});
export interface LastRunErrorStatus {
  code?: LastRunErrorStatusCode;
}
export interface Statistics {
  approximateNumberOfObjectsToProcess?: number;
  numberOfRuns?: number;
}
export interface UserPausedDetails {
  jobExpiresAt?: Date;
  jobImminentExpirationHealthEventArn?: string;
  jobPausedAt?: Date;
}
export interface DescribeClassificationJobResponse {
  allowListIds?: string[];
  clientToken?: string;
  createdAt?: Date;
  customDataIdentifierIds?: string[];
  description?: string;
  initialRun?: boolean;
  jobArn?: string;
  jobId?: string;
  jobStatus?: JobStatus;
  jobType?: JobType;
  lastRunErrorStatus?: LastRunErrorStatus;
  lastRunTime?: Date;
  managedDataIdentifierIds?: string[];
  managedDataIdentifierSelector?: ManagedDataIdentifierSelector;
  name?: string;
  s3JobDefinition?: S3JobDefinition & {
    bucketDefinitions: (S3BucketDefinitionForJob & {
      accountId: string;
      buckets: __listOf__string;
    })[];
  };
  samplingPercentage?: number;
  scheduleFrequency?: JobScheduleFrequency;
  statistics?: Statistics;
  tags?: { [key: string]: string | undefined };
  userPausedDetails?: UserPausedDetails;
}
export interface DescribeOrganizationConfigurationRequest {}
export interface DescribeOrganizationConfigurationResponse {
  autoEnable?: boolean;
  maxAccountLimitReached?: boolean;
}
export interface DisableMacieRequest {}
export interface DisableMacieResponse {}
export interface DisableOrganizationAdminAccountRequest {
  adminAccountId?: string;
}
export interface DisableOrganizationAdminAccountResponse {}
export interface DisassociateFromAdministratorAccountRequest {}
export interface DisassociateFromAdministratorAccountResponse {}
export interface DisassociateFromMasterAccountRequest {}
export interface DisassociateFromMasterAccountResponse {}
export interface DisassociateMemberRequest {
  id: string;
}
export interface DisassociateMemberResponse {}
export type FindingPublishingFrequency =
  | "FIFTEEN_MINUTES"
  | "ONE_HOUR"
  | "SIX_HOURS"
  | (string & {});
export type MacieStatus = "PAUSED" | "ENABLED" | (string & {});
export interface EnableMacieRequest {
  clientToken?: string;
  findingPublishingFrequency?: FindingPublishingFrequency;
  status?: MacieStatus;
}
export interface EnableMacieResponse {}
export interface EnableOrganizationAdminAccountRequest {
  adminAccountId?: string;
  clientToken?: string;
}
export interface EnableOrganizationAdminAccountResponse {}
export interface GetAdministratorAccountRequest {}
export type RelationshipStatus =
  | "Enabled"
  | "Paused"
  | "Invited"
  | "Created"
  | "Removed"
  | "Resigned"
  | "EmailVerificationInProgress"
  | "EmailVerificationFailed"
  | "RegionDisabled"
  | "AccountSuspended"
  | (string & {});
export interface Invitation {
  accountId?: string;
  invitationId?: string;
  invitedAt?: Date;
  relationshipStatus?: RelationshipStatus;
}
export interface GetAdministratorAccountResponse {
  administrator?: Invitation;
}
export interface GetAllowListRequest {
  id: string;
}
export type AllowListStatusCode =
  | "OK"
  | "S3_OBJECT_NOT_FOUND"
  | "S3_USER_ACCESS_DENIED"
  | "S3_OBJECT_ACCESS_DENIED"
  | "S3_THROTTLED"
  | "S3_OBJECT_OVERSIZE"
  | "S3_OBJECT_EMPTY"
  | "UNKNOWN_ERROR"
  | (string & {});
export interface AllowListStatus {
  code?: AllowListStatusCode;
  description?: string;
}
export interface GetAllowListResponse {
  arn?: string;
  createdAt?: Date;
  criteria?: AllowListCriteria & {
    s3WordsList: S3WordsList & {
      bucketName: __stringMin3Max255PatternAZaZ093255;
      objectKey: __stringMin1Max1024PatternSS;
    };
  };
  description?: string;
  id?: string;
  name?: string;
  status?: AllowListStatus & { code: AllowListStatusCode };
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export interface GetAutomatedDiscoveryConfigurationRequest {}
export type AutoEnableMode = "ALL" | "NEW" | "NONE" | (string & {});
export type ClassificationScopeId = string;
export type SensitivityInspectionTemplateId = string;
export type AutomatedDiscoveryStatus = "ENABLED" | "DISABLED" | (string & {});
export interface GetAutomatedDiscoveryConfigurationResponse {
  autoEnableOrganizationMembers?: AutoEnableMode;
  classificationScopeId?: string;
  disabledAt?: Date;
  firstEnabledAt?: Date;
  lastUpdatedAt?: Date;
  sensitivityInspectionTemplateId?: string;
  status?: AutomatedDiscoveryStatus;
}
export interface GetBucketStatisticsRequest {
  accountId?: string;
}
export interface BucketCountByEffectivePermission {
  publiclyAccessible?: number;
  publiclyReadable?: number;
  publiclyWritable?: number;
  unknown?: number;
}
export interface BucketCountByEncryptionType {
  kmsManaged?: number;
  s3Managed?: number;
  unencrypted?: number;
  unknown?: number;
}
export interface BucketCountPolicyAllowsUnencryptedObjectUploads {
  allowsUnencryptedObjectUploads?: number;
  deniesUnencryptedObjectUploads?: number;
  unknown?: number;
}
export interface BucketCountBySharedAccessType {
  external?: number;
  internal?: number;
  notShared?: number;
  unknown?: number;
}
export interface SensitivityAggregations {
  classifiableSizeInBytes?: number;
  publiclyAccessibleCount?: number;
  totalCount?: number;
  totalSizeInBytes?: number;
}
export interface BucketStatisticsBySensitivity {
  classificationError?: SensitivityAggregations;
  notClassified?: SensitivityAggregations;
  notSensitive?: SensitivityAggregations;
  sensitive?: SensitivityAggregations;
}
export interface GetBucketStatisticsResponse {
  bucketCount?: number;
  bucketCountByEffectivePermission?: BucketCountByEffectivePermission;
  bucketCountByEncryptionType?: BucketCountByEncryptionType;
  bucketCountByObjectEncryptionRequirement?: BucketCountPolicyAllowsUnencryptedObjectUploads;
  bucketCountBySharedAccessType?: BucketCountBySharedAccessType;
  bucketStatisticsBySensitivity?: BucketStatisticsBySensitivity;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  lastUpdated?: Date;
  objectCount?: number;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
}
export interface GetClassificationExportConfigurationRequest {}
export interface S3Destination {
  bucketName?: string;
  expectedBucketOwner?: string;
  keyPrefix?: string;
  kmsKeyArn?: string;
}
export interface ClassificationExportConfiguration {
  s3Destination?: S3Destination;
}
export interface GetClassificationExportConfigurationResponse {
  configuration?: ClassificationExportConfiguration & {
    s3Destination: S3Destination & { bucketName: string; kmsKeyArn: string };
  };
}
export interface GetClassificationScopeRequest {
  id: string;
}
export type ClassificationScopeName = string;
export type S3BucketName = string;
export type __listOfS3BucketName = string[];
export interface S3ClassificationScopeExclusion {
  bucketNames?: string[];
}
export interface S3ClassificationScope {
  excludes?: S3ClassificationScopeExclusion;
}
export interface GetClassificationScopeResponse {
  id?: string;
  name?: string;
  s3?: S3ClassificationScope & {
    excludes: S3ClassificationScopeExclusion & {
      bucketNames: __listOfS3BucketName;
    };
  };
}
export interface GetCustomDataIdentifierRequest {
  id: string;
}
export interface GetCustomDataIdentifierResponse {
  arn?: string;
  createdAt?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  name?: string;
  regex?: string;
  severityLevels?: (SeverityLevel & {
    occurrencesThreshold: number;
    severity: DataIdentifierSeverity;
  })[];
  tags?: { [key: string]: string | undefined };
}
export interface SortCriteria {
  attributeName?: string;
  orderBy?: OrderBy;
}
export interface GetFindingsRequest {
  findingIds?: string[];
  sortCriteria?: SortCriteria;
}
export type FindingCategory = "CLASSIFICATION" | "POLICY" | (string & {});
export type OriginType =
  | "SENSITIVE_DATA_DISCOVERY_JOB"
  | "AUTOMATED_SENSITIVE_DATA_DISCOVERY"
  | (string & {});
export interface Cell {
  cellReference?: string;
  column?: number;
  columnName?: string;
  row?: number;
}
export type Cells = Cell[];
export interface Range {
  end?: number;
  start?: number;
  startColumn?: number;
}
export type Ranges = Range[];
export interface Page {
  lineRange?: Range;
  offsetRange?: Range;
  pageNumber?: number;
}
export type Pages = Page[];
export interface Record {
  jsonPath?: string;
  recordIndex?: number;
}
export type Records = Record[];
export interface Occurrences {
  cells?: Cell[];
  lineRanges?: Range[];
  offsetRanges?: Range[];
  pages?: Page[];
  records?: Record[];
}
export interface CustomDetection {
  arn?: string;
  count?: number;
  name?: string;
  occurrences?: Occurrences;
}
export type CustomDetections = CustomDetection[];
export interface CustomDataIdentifiers {
  detections?: CustomDetection[];
  totalCount?: number;
}
export type SensitiveDataItemCategory =
  | "FINANCIAL_INFORMATION"
  | "PERSONAL_INFORMATION"
  | "CREDENTIALS"
  | "CUSTOM_IDENTIFIER"
  | (string & {});
export interface DefaultDetection {
  count?: number;
  occurrences?: Occurrences;
  type?: string;
}
export type DefaultDetections = DefaultDetection[];
export interface SensitiveDataItem {
  category?: SensitiveDataItemCategory;
  detections?: DefaultDetection[];
  totalCount?: number;
}
export type SensitiveData = SensitiveDataItem[];
export interface ClassificationResultStatus {
  code?: string;
  reason?: string;
}
export interface ClassificationResult {
  additionalOccurrences?: boolean;
  customDataIdentifiers?: CustomDataIdentifiers;
  mimeType?: string;
  sensitiveData?: SensitiveDataItem[];
  sizeClassified?: number;
  status?: ClassificationResultStatus;
}
export interface ClassificationDetails {
  detailedResultsLocation?: string;
  jobArn?: string;
  jobId?: string;
  originType?: OriginType;
  result?: ClassificationResult;
}
export type FindingActionType = "AWS_API_CALL" | (string & {});
export interface ApiCallDetails {
  api?: string;
  apiServiceName?: string;
  firstSeen?: Date;
  lastSeen?: Date;
}
export interface FindingAction {
  actionType?: FindingActionType;
  apiCallDetails?: ApiCallDetails;
}
export interface DomainDetails {
  domainName?: string;
}
export interface IpCity {
  name?: string;
}
export interface IpCountry {
  code?: string;
  name?: string;
}
export interface IpGeoLocation {
  lat?: number;
  lon?: number;
}
export interface IpOwner {
  asn?: string;
  asnOrg?: string;
  isp?: string;
  org?: string;
}
export interface IpAddressDetails {
  ipAddressV4?: string;
  ipCity?: IpCity;
  ipCountry?: IpCountry;
  ipGeoLocation?: IpGeoLocation;
  ipOwner?: IpOwner;
}
export interface SessionContextAttributes {
  creationDate?: Date;
  mfaAuthenticated?: boolean;
}
export interface SessionIssuer {
  accountId?: string;
  arn?: string;
  principalId?: string;
  type?: string;
  userName?: string;
}
export interface SessionContext {
  attributes?: SessionContextAttributes;
  sessionIssuer?: SessionIssuer;
}
export interface AssumedRole {
  accessKeyId?: string;
  accountId?: string;
  arn?: string;
  principalId?: string;
  sessionContext?: SessionContext;
}
export interface AwsAccount {
  accountId?: string;
  principalId?: string;
}
export interface AwsService {
  invokedBy?: string;
}
export interface FederatedUser {
  accessKeyId?: string;
  accountId?: string;
  arn?: string;
  principalId?: string;
  sessionContext?: SessionContext;
}
export interface IamUser {
  accountId?: string;
  arn?: string;
  principalId?: string;
  userName?: string;
}
export interface UserIdentityRoot {
  accountId?: string;
  arn?: string;
  principalId?: string;
}
export type UserIdentityType =
  | "AssumedRole"
  | "IAMUser"
  | "FederatedUser"
  | "Root"
  | "AWSAccount"
  | "AWSService"
  | (string & {});
export interface UserIdentity {
  assumedRole?: AssumedRole;
  awsAccount?: AwsAccount;
  awsService?: AwsService;
  federatedUser?: FederatedUser;
  iamUser?: IamUser;
  root?: UserIdentityRoot;
  type?: UserIdentityType;
}
export interface FindingActor {
  domainDetails?: DomainDetails;
  ipAddressDetails?: IpAddressDetails;
  userIdentity?: UserIdentity;
}
export interface PolicyDetails {
  action?: FindingAction;
  actor?: FindingActor;
}
export type EncryptionType =
  | "NONE"
  | "AES256"
  | "aws:kms"
  | "UNKNOWN"
  | "aws:kms:dsse"
  | (string & {});
export interface ServerSideEncryption {
  encryptionType?: EncryptionType;
  kmsMasterKeyId?: string;
}
export interface S3BucketOwner {
  displayName?: string;
  id?: string;
}
export type KeyValuePairList = KeyValuePair[];
export interface S3Bucket {
  allowsUnencryptedObjectUploads?: AllowsUnencryptedObjectUploads;
  arn?: string;
  createdAt?: Date;
  defaultServerSideEncryption?: ServerSideEncryption;
  name?: string;
  owner?: S3BucketOwner;
  publicAccess?: BucketPublicAccess;
  tags?: KeyValuePair[];
}
export type StorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | "ONEZONE_IA"
  | "GLACIER"
  | "GLACIER_IR"
  | "OUTPOSTS"
  | (string & {});
export interface S3Object {
  bucketArn?: string;
  eTag?: string;
  extension?: string;
  key?: string;
  lastModified?: Date;
  path?: string;
  publicAccess?: boolean;
  serverSideEncryption?: ServerSideEncryption;
  size?: number;
  storageClass?: StorageClass;
  tags?: KeyValuePair[];
  versionId?: string;
}
export interface ResourcesAffected {
  s3Bucket?: S3Bucket;
  s3Object?: S3Object;
}
export type SeverityDescription = "Low" | "Medium" | "High" | (string & {});
export interface Severity {
  description?: SeverityDescription;
  score?: number;
}
export interface Finding {
  accountId?: string;
  archived?: boolean;
  category?: FindingCategory;
  classificationDetails?: ClassificationDetails;
  count?: number;
  createdAt?: Date;
  description?: string;
  id?: string;
  partition?: string;
  policyDetails?: PolicyDetails;
  region?: string;
  resourcesAffected?: ResourcesAffected;
  sample?: boolean;
  schemaVersion?: string;
  severity?: Severity;
  title?: string;
  type?: FindingType;
  updatedAt?: Date;
}
export type __listOfFinding = Finding[];
export interface GetFindingsResponse {
  findings?: Finding[];
}
export interface GetFindingsFilterRequest {
  id: string;
}
export interface GetFindingsFilterResponse {
  action?: FindingsFilterAction;
  arn?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  id?: string;
  name?: string;
  position?: number;
  tags?: { [key: string]: string | undefined };
}
export interface GetFindingsPublicationConfigurationRequest {}
export interface SecurityHubConfiguration {
  publishClassificationFindings?: boolean;
  publishPolicyFindings?: boolean;
}
export interface GetFindingsPublicationConfigurationResponse {
  securityHubConfiguration?: SecurityHubConfiguration & {
    publishClassificationFindings: boolean;
    publishPolicyFindings: boolean;
  };
}
export type GroupBy =
  | "resourcesAffected.s3Bucket.name"
  | "type"
  | "classificationDetails.jobId"
  | "severity.description"
  | (string & {});
export type FindingStatisticsSortAttributeName =
  | "groupKey"
  | "count"
  | (string & {});
export interface FindingStatisticsSortCriteria {
  attributeName?: FindingStatisticsSortAttributeName;
  orderBy?: OrderBy;
}
export interface GetFindingStatisticsRequest {
  findingCriteria?: FindingCriteria;
  groupBy?: GroupBy;
  size?: number;
  sortCriteria?: FindingStatisticsSortCriteria;
}
export interface GroupCount {
  count?: number;
  groupKey?: string;
}
export type __listOfGroupCount = GroupCount[];
export interface GetFindingStatisticsResponse {
  countsByGroup?: GroupCount[];
}
export interface GetInvitationsCountRequest {}
export interface GetInvitationsCountResponse {
  invitationsCount?: number;
}
export interface GetMacieSessionRequest {}
export interface GetMacieSessionResponse {
  createdAt?: Date;
  findingPublishingFrequency?: FindingPublishingFrequency;
  serviceRole?: string;
  status?: MacieStatus;
  updatedAt?: Date;
}
export interface GetMasterAccountRequest {}
export interface GetMasterAccountResponse {
  master?: Invitation;
}
export interface GetMemberRequest {
  id: string;
}
export interface GetMemberResponse {
  accountId?: string;
  administratorAccountId?: string;
  arn?: string;
  email?: string;
  invitedAt?: Date;
  masterAccountId?: string;
  relationshipStatus?: RelationshipStatus;
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export interface GetResourceProfileRequest {
  resourceArn?: string;
}
export interface ResourceStatistics {
  totalBytesClassified?: number;
  totalDetections?: number;
  totalDetectionsSuppressed?: number;
  totalItemsClassified?: number;
  totalItemsSensitive?: number;
  totalItemsSkipped?: number;
  totalItemsSkippedInvalidEncryption?: number;
  totalItemsSkippedInvalidKms?: number;
  totalItemsSkippedPermissionDenied?: number;
}
export interface GetResourceProfileResponse {
  profileUpdatedAt?: Date;
  sensitivityScore?: number;
  sensitivityScoreOverridden?: boolean;
  statistics?: ResourceStatistics;
}
export interface GetRevealConfigurationRequest {}
export type __stringMin1Max2048 = string;
export type RevealStatus = "ENABLED" | "DISABLED" | (string & {});
export interface RevealConfiguration {
  kmsKeyId?: string;
  status?: RevealStatus;
}
export type RetrievalMode =
  | "CALLER_CREDENTIALS"
  | "ASSUME_ROLE"
  | (string & {});
export type __stringMin1Max64PatternW = string;
export interface RetrievalConfiguration {
  externalId?: string;
  retrievalMode?: RetrievalMode;
  roleName?: string;
}
export interface GetRevealConfigurationResponse {
  configuration?: RevealConfiguration & { status: RevealStatus };
  retrievalConfiguration?: RetrievalConfiguration & {
    retrievalMode: RetrievalMode;
  };
}
export interface GetSensitiveDataOccurrencesRequest {
  findingId: string;
}
export type __stringMin1Max128 = string;
export interface DetectedDataDetails {
  value?: string | redacted.Redacted<string>;
}
export type __listOfDetectedDataDetails = DetectedDataDetails[];
export type SensitiveDataOccurrences = {
  [key: string]: DetectedDataDetails[] | undefined;
};
export type RevealRequestStatus =
  | "SUCCESS"
  | "PROCESSING"
  | "ERROR"
  | (string & {});
export interface GetSensitiveDataOccurrencesResponse {
  error?: string;
  sensitiveDataOccurrences?: {
    [key: string]:
      | (DetectedDataDetails & { value: __stringMin1Max128 })[]
      | undefined;
  };
  status?: RevealRequestStatus;
}
export interface GetSensitiveDataOccurrencesAvailabilityRequest {
  findingId: string;
}
export type AvailabilityCode = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export type UnavailabilityReasonCode =
  | "OBJECT_EXCEEDS_SIZE_QUOTA"
  | "UNSUPPORTED_OBJECT_TYPE"
  | "UNSUPPORTED_FINDING_TYPE"
  | "INVALID_CLASSIFICATION_RESULT"
  | "OBJECT_UNAVAILABLE"
  | "ACCOUNT_NOT_IN_ORGANIZATION"
  | "MISSING_GET_MEMBER_PERMISSION"
  | "ROLE_TOO_PERMISSIVE"
  | "MEMBER_ROLE_TOO_PERMISSIVE"
  | "INVALID_RESULT_SIGNATURE"
  | "RESULT_NOT_SIGNED"
  | (string & {});
export type __listOfUnavailabilityReasonCode = UnavailabilityReasonCode[];
export interface GetSensitiveDataOccurrencesAvailabilityResponse {
  code?: AvailabilityCode;
  reasons?: UnavailabilityReasonCode[];
}
export interface GetSensitivityInspectionTemplateRequest {
  id: string;
}
export interface SensitivityInspectionTemplateExcludes {
  managedDataIdentifierIds?: string[];
}
export interface SensitivityInspectionTemplateIncludes {
  allowListIds?: string[];
  customDataIdentifierIds?: string[];
  managedDataIdentifierIds?: string[];
}
export interface GetSensitivityInspectionTemplateResponse {
  description?: string;
  excludes?: SensitivityInspectionTemplateExcludes;
  includes?: SensitivityInspectionTemplateIncludes;
  name?: string;
  sensitivityInspectionTemplateId?: string;
}
export type UsageStatisticsFilterComparator =
  | "GT"
  | "GTE"
  | "LT"
  | "LTE"
  | "EQ"
  | "NE"
  | "CONTAINS"
  | (string & {});
export type UsageStatisticsFilterKey =
  | "accountId"
  | "serviceLimit"
  | "freeTrialStartDate"
  | "total"
  | (string & {});
export interface UsageStatisticsFilter {
  comparator?: UsageStatisticsFilterComparator;
  key?: UsageStatisticsFilterKey;
  values?: string[];
}
export type __listOfUsageStatisticsFilter = UsageStatisticsFilter[];
export type UsageStatisticsSortKey =
  | "accountId"
  | "total"
  | "serviceLimitValue"
  | "freeTrialStartDate"
  | (string & {});
export interface UsageStatisticsSortBy {
  key?: UsageStatisticsSortKey;
  orderBy?: OrderBy;
}
export type TimeRange = "MONTH_TO_DATE" | "PAST_30_DAYS" | (string & {});
export interface GetUsageStatisticsRequest {
  filterBy?: UsageStatisticsFilter[];
  maxResults?: number;
  nextToken?: string;
  sortBy?: UsageStatisticsSortBy;
  timeRange?: TimeRange;
}
export type Currency = "USD" | (string & {});
export type Unit = "TERABYTES" | (string & {});
export interface ServiceLimit {
  isServiceLimited?: boolean;
  unit?: Unit;
  value?: number;
}
export type UsageType =
  | "DATA_INVENTORY_EVALUATION"
  | "SENSITIVE_DATA_DISCOVERY"
  | "AUTOMATED_SENSITIVE_DATA_DISCOVERY"
  | "AUTOMATED_OBJECT_MONITORING"
  | (string & {});
export interface UsageByAccount {
  currency?: Currency;
  estimatedCost?: string;
  serviceLimit?: ServiceLimit;
  type?: UsageType;
}
export type __listOfUsageByAccount = UsageByAccount[];
export interface UsageRecord {
  accountId?: string;
  automatedDiscoveryFreeTrialStartDate?: Date;
  freeTrialStartDate?: Date;
  usage?: UsageByAccount[];
}
export type __listOfUsageRecord = UsageRecord[];
export interface GetUsageStatisticsResponse {
  nextToken?: string;
  records?: UsageRecord[];
  timeRange?: TimeRange;
}
export interface GetUsageTotalsRequest {
  timeRange?: string;
}
export interface UsageTotal {
  currency?: Currency;
  estimatedCost?: string;
  type?: UsageType;
}
export type __listOfUsageTotal = UsageTotal[];
export interface GetUsageTotalsResponse {
  timeRange?: TimeRange;
  usageTotals?: UsageTotal[];
}
export type MaxResults = number;
export interface ListAllowListsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AllowListSummary {
  arn?: string;
  createdAt?: Date;
  description?: string;
  id?: string;
  name?: string;
  updatedAt?: Date;
}
export type __listOfAllowListSummary = AllowListSummary[];
export interface ListAllowListsResponse {
  allowLists?: AllowListSummary[];
  nextToken?: string;
}
export interface ListAutomatedDiscoveryAccountsRequest {
  accountIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export interface AutomatedDiscoveryAccount {
  accountId?: string;
  status?: AutomatedDiscoveryAccountStatus;
}
export type __listOfAutomatedDiscoveryAccount = AutomatedDiscoveryAccount[];
export interface ListAutomatedDiscoveryAccountsResponse {
  items?: AutomatedDiscoveryAccount[];
  nextToken?: string;
}
export type ListJobsFilterKey =
  | "jobType"
  | "jobStatus"
  | "createdAt"
  | "name"
  | (string & {});
export interface ListJobsFilterTerm {
  comparator?: JobComparator;
  key?: ListJobsFilterKey;
  values?: string[];
}
export type __listOfListJobsFilterTerm = ListJobsFilterTerm[];
export interface ListJobsFilterCriteria {
  excludes?: ListJobsFilterTerm[];
  includes?: ListJobsFilterTerm[];
}
export type ListJobsSortAttributeName =
  | "createdAt"
  | "jobStatus"
  | "name"
  | "jobType"
  | (string & {});
export interface ListJobsSortCriteria {
  attributeName?: ListJobsSortAttributeName;
  orderBy?: OrderBy;
}
export interface ListClassificationJobsRequest {
  filterCriteria?: ListJobsFilterCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: ListJobsSortCriteria;
}
export interface JobSummary {
  bucketCriteria?: S3BucketCriteriaForJob;
  bucketDefinitions?: S3BucketDefinitionForJob[];
  createdAt?: Date;
  jobId?: string;
  jobStatus?: JobStatus;
  jobType?: JobType;
  lastRunErrorStatus?: LastRunErrorStatus;
  name?: string;
  userPausedDetails?: UserPausedDetails;
}
export type __listOfJobSummary = JobSummary[];
export interface ListClassificationJobsResponse {
  items?: (JobSummary & {
    bucketDefinitions: (S3BucketDefinitionForJob & {
      accountId: string;
      buckets: __listOf__string;
    })[];
  })[];
  nextToken?: string;
}
export interface ListClassificationScopesRequest {
  name?: string;
  nextToken?: string;
}
export interface ClassificationScopeSummary {
  id?: string;
  name?: string;
}
export type __listOfClassificationScopeSummary = ClassificationScopeSummary[];
export type NextToken = string;
export interface ListClassificationScopesResponse {
  classificationScopes?: ClassificationScopeSummary[];
  nextToken?: string;
}
export interface ListCustomDataIdentifiersRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface CustomDataIdentifierSummary {
  arn?: string;
  createdAt?: Date;
  description?: string;
  id?: string;
  name?: string;
}
export type __listOfCustomDataIdentifierSummary = CustomDataIdentifierSummary[];
export interface ListCustomDataIdentifiersResponse {
  items?: CustomDataIdentifierSummary[];
  nextToken?: string;
}
export interface ListFindingsRequest {
  findingCriteria?: FindingCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: SortCriteria;
}
export interface ListFindingsResponse {
  findingIds?: string[];
  nextToken?: string;
}
export interface ListFindingsFiltersRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface FindingsFilterListItem {
  action?: FindingsFilterAction;
  arn?: string;
  id?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export type __listOfFindingsFilterListItem = FindingsFilterListItem[];
export interface ListFindingsFiltersResponse {
  findingsFilterListItems?: FindingsFilterListItem[];
  nextToken?: string;
}
export interface ListInvitationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type __listOfInvitation = Invitation[];
export interface ListInvitationsResponse {
  invitations?: Invitation[];
  nextToken?: string;
}
export interface ListManagedDataIdentifiersRequest {
  nextToken?: string;
}
export interface ManagedDataIdentifierSummary {
  category?: SensitiveDataItemCategory;
  id?: string;
}
export type __listOfManagedDataIdentifierSummary =
  ManagedDataIdentifierSummary[];
export interface ListManagedDataIdentifiersResponse {
  items?: ManagedDataIdentifierSummary[];
  nextToken?: string;
}
export interface ListMembersRequest {
  maxResults?: number;
  nextToken?: string;
  onlyAssociated?: string;
}
export interface Member {
  accountId?: string;
  administratorAccountId?: string;
  arn?: string;
  email?: string;
  invitedAt?: Date;
  masterAccountId?: string;
  relationshipStatus?: RelationshipStatus;
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export type __listOfMember = Member[];
export interface ListMembersResponse {
  members?: Member[];
  nextToken?: string;
}
export interface ListOrganizationAdminAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type AdminStatus = "ENABLED" | "DISABLING_IN_PROGRESS" | (string & {});
export interface AdminAccount {
  accountId?: string;
  status?: AdminStatus;
}
export type __listOfAdminAccount = AdminAccount[];
export interface ListOrganizationAdminAccountsResponse {
  adminAccounts?: AdminAccount[];
  nextToken?: string;
}
export interface ListResourceProfileArtifactsRequest {
  nextToken?: string;
  resourceArn?: string;
}
export interface ResourceProfileArtifact {
  arn?: string;
  classificationResultStatus?: string;
  sensitive?: boolean;
}
export type __listOfResourceProfileArtifact = ResourceProfileArtifact[];
export interface ListResourceProfileArtifactsResponse {
  artifacts?: (ResourceProfileArtifact & {
    arn: string;
    classificationResultStatus: string;
  })[];
  nextToken?: string;
}
export interface ListResourceProfileDetectionsRequest {
  maxResults?: number;
  nextToken?: string;
  resourceArn?: string;
}
export type DataIdentifierType = "CUSTOM" | "MANAGED" | (string & {});
export interface Detection {
  arn?: string;
  count?: number;
  id?: string;
  name?: string;
  suppressed?: boolean;
  type?: DataIdentifierType;
}
export type __listOfDetection = Detection[];
export interface ListResourceProfileDetectionsResponse {
  detections?: Detection[];
  nextToken?: string;
}
export interface ListSensitivityInspectionTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface SensitivityInspectionTemplatesEntry {
  id?: string;
  name?: string;
}
export type __listOfSensitivityInspectionTemplatesEntry =
  SensitivityInspectionTemplatesEntry[];
export interface ListSensitivityInspectionTemplatesResponse {
  nextToken?: string;
  sensitivityInspectionTemplates?: SensitivityInspectionTemplatesEntry[];
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PutClassificationExportConfigurationRequest {
  configuration?: ClassificationExportConfiguration;
}
export interface PutClassificationExportConfigurationResponse {
  configuration?: ClassificationExportConfiguration & {
    s3Destination: S3Destination & { bucketName: string; kmsKeyArn: string };
  };
}
export interface PutFindingsPublicationConfigurationRequest {
  clientToken?: string;
  securityHubConfiguration?: SecurityHubConfiguration;
}
export interface PutFindingsPublicationConfigurationResponse {}
export type SearchResourcesComparator = "EQ" | "NE" | (string & {});
export type SearchResourcesSimpleCriterionKey =
  | "ACCOUNT_ID"
  | "S3_BUCKET_NAME"
  | "S3_BUCKET_EFFECTIVE_PERMISSION"
  | "S3_BUCKET_SHARED_ACCESS"
  | "AUTOMATED_DISCOVERY_MONITORING_STATUS"
  | (string & {});
export interface SearchResourcesSimpleCriterion {
  comparator?: SearchResourcesComparator;
  key?: SearchResourcesSimpleCriterionKey;
  values?: string[];
}
export interface SearchResourcesTagCriterionPair {
  key?: string;
  value?: string;
}
export type __listOfSearchResourcesTagCriterionPair =
  SearchResourcesTagCriterionPair[];
export interface SearchResourcesTagCriterion {
  comparator?: SearchResourcesComparator;
  tagValues?: SearchResourcesTagCriterionPair[];
}
export interface SearchResourcesCriteria {
  simpleCriterion?: SearchResourcesSimpleCriterion;
  tagCriterion?: SearchResourcesTagCriterion;
}
export type __listOfSearchResourcesCriteria = SearchResourcesCriteria[];
export interface SearchResourcesCriteriaBlock {
  and?: SearchResourcesCriteria[];
}
export interface SearchResourcesBucketCriteria {
  excludes?: SearchResourcesCriteriaBlock;
  includes?: SearchResourcesCriteriaBlock;
}
export type SearchResourcesSortAttributeName =
  | "ACCOUNT_ID"
  | "RESOURCE_NAME"
  | "S3_CLASSIFIABLE_OBJECT_COUNT"
  | "S3_CLASSIFIABLE_SIZE_IN_BYTES"
  | (string & {});
export interface SearchResourcesSortCriteria {
  attributeName?: SearchResourcesSortAttributeName;
  orderBy?: OrderBy;
}
export interface SearchResourcesRequest {
  bucketCriteria?: SearchResourcesBucketCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: SearchResourcesSortCriteria;
}
export interface MatchingBucket {
  accountId?: string;
  automatedDiscoveryMonitoringStatus?: AutomatedDiscoveryMonitoringStatus;
  bucketName?: string;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  errorCode?: BucketMetadataErrorCode;
  errorMessage?: string;
  jobDetails?: JobDetails;
  lastAutomatedDiscoveryTime?: Date;
  objectCount?: number;
  objectCountByEncryptionType?: ObjectCountByEncryptionType;
  sensitivityScore?: number;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
}
export interface MatchingResource {
  matchingBucket?: MatchingBucket;
}
export type __listOfMatchingResource = MatchingResource[];
export interface SearchResourcesResponse {
  matchingResources?: MatchingResource[];
  nextToken?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TestCustomDataIdentifierRequest {
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  regex?: string;
  sampleText?: string;
}
export interface TestCustomDataIdentifierResponse {
  matchCount?: number;
}
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAllowListRequest {
  criteria?: AllowListCriteria;
  description?: string;
  id: string;
  name?: string;
}
export interface UpdateAllowListResponse {
  arn?: string;
  id?: string;
}
export interface UpdateAutomatedDiscoveryConfigurationRequest {
  autoEnableOrganizationMembers?: AutoEnableMode;
  status?: AutomatedDiscoveryStatus;
}
export interface UpdateAutomatedDiscoveryConfigurationResponse {}
export interface UpdateClassificationJobRequest {
  jobId: string;
  jobStatus?: JobStatus;
}
export interface UpdateClassificationJobResponse {}
export type ClassificationScopeUpdateOperation =
  | "ADD"
  | "REPLACE"
  | "REMOVE"
  | (string & {});
export interface S3ClassificationScopeExclusionUpdate {
  bucketNames?: string[];
  operation?: ClassificationScopeUpdateOperation;
}
export interface S3ClassificationScopeUpdate {
  excludes?: S3ClassificationScopeExclusionUpdate;
}
export interface UpdateClassificationScopeRequest {
  id: string;
  s3?: S3ClassificationScopeUpdate;
}
export interface UpdateClassificationScopeResponse {}
export interface UpdateFindingsFilterRequest {
  action?: FindingsFilterAction;
  clientToken?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  id: string;
  name?: string;
  position?: number;
}
export interface UpdateFindingsFilterResponse {
  arn?: string;
  id?: string;
}
export interface UpdateMacieSessionRequest {
  findingPublishingFrequency?: FindingPublishingFrequency;
  status?: MacieStatus;
}
export interface UpdateMacieSessionResponse {}
export interface UpdateMemberSessionRequest {
  id: string;
  status?: MacieStatus;
}
export interface UpdateMemberSessionResponse {}
export interface UpdateOrganizationConfigurationRequest {
  autoEnable?: boolean;
}
export interface UpdateOrganizationConfigurationResponse {}
export interface UpdateResourceProfileRequest {
  resourceArn?: string;
  sensitivityScoreOverride?: number;
}
export interface UpdateResourceProfileResponse {}
export interface SuppressDataIdentifier {
  id?: string;
  type?: DataIdentifierType;
}
export type __listOfSuppressDataIdentifier = SuppressDataIdentifier[];
export interface UpdateResourceProfileDetectionsRequest {
  resourceArn?: string;
  suppressDataIdentifiers?: SuppressDataIdentifier[];
}
export interface UpdateResourceProfileDetectionsResponse {}
export interface UpdateRetrievalConfiguration {
  retrievalMode?: RetrievalMode;
  roleName?: string;
}
export interface UpdateRevealConfigurationRequest {
  configuration?: RevealConfiguration;
  retrievalConfiguration?: UpdateRetrievalConfiguration;
}
export interface UpdateRevealConfigurationResponse {
  configuration?: RevealConfiguration & { status: RevealStatus };
  retrievalConfiguration?: RetrievalConfiguration & {
    retrievalMode: RetrievalMode;
  };
}
export interface UpdateSensitivityInspectionTemplateRequest {
  description?: string;
  excludes?: SensitivityInspectionTemplateExcludes;
  id: string;
  includes?: SensitivityInspectionTemplateIncludes;
}
export interface UpdateSensitivityInspectionTemplateResponse {}
export type AcceptInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts an Amazon Macie membership invitation that was received from a specific account.
 */
export const acceptInvitation: API.OperationMethod<
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  AcceptInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /invitations/accept",
    input: { administratorAccountId: 0, invitationId: 0, masterAccount: 0 },
    body: true,
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
  operationName: "AcceptInvitation",
})) as any;

export type BatchGetCustomDataIdentifiersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about one or more custom data identifiers.
 */
export const batchGetCustomDataIdentifiers: API.OperationMethod<
  BatchGetCustomDataIdentifiersRequest,
  BatchGetCustomDataIdentifiersResponse,
  BatchGetCustomDataIdentifiersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /custom-data-identifiers/get",
    input: { ids: 0 },
    output: { customDataIdentifiers: D.list({ createdAt: D.ts }) },
    body: true,
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
  operationName: "BatchGetCustomDataIdentifiers",
})) as any;

export type BatchUpdateAutomatedDiscoveryAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the status of automated sensitive data discovery for one or more accounts.
 */
export const batchUpdateAutomatedDiscoveryAccounts: API.OperationMethod<
  BatchUpdateAutomatedDiscoveryAccountsRequest,
  BatchUpdateAutomatedDiscoveryAccountsResponse,
  BatchUpdateAutomatedDiscoveryAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /automated-discovery/accounts",
    input: { accounts: D.list({ accountId: 0, status: 0 }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateAutomatedDiscoveryAccounts",
})) as any;

export type CreateAllowListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | MacieNotEnabled
  | CommonErrors;
/**
 * Creates and defines the settings for an allow list.
 */
export const createAllowList: API.OperationMethod<
  CreateAllowListRequest,
  CreateAllowListResponse,
  CreateAllowListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /allow-lists",
    input: {
      clientToken: D.m({ idempotency: true }),
      criteria: i_AllowListCriteria,
      description: 0,
      name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    MacieNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAllowList",
})) as any;

export type CreateClassificationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | MacieNotEnabled
  | CommonErrors;
/**
 * Creates and defines the settings for a classification job.
 */
export const createClassificationJob: API.OperationMethod<
  CreateClassificationJobRequest,
  CreateClassificationJobResponse,
  CreateClassificationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /jobs",
    input: {
      allowListIds: 0,
      clientToken: D.m({ idempotency: true }),
      customDataIdentifierIds: 0,
      description: 0,
      initialRun: 0,
      jobType: 0,
      managedDataIdentifierIds: 0,
      managedDataIdentifierSelector: 0,
      name: 0,
      s3JobDefinition: {
        bucketCriteria: {
          excludes: i_CriteriaBlockForJob,
          includes: i_CriteriaBlockForJob,
        },
        bucketDefinitions: D.list({ accountId: 0, buckets: 0 }),
        scoping: { excludes: i_JobScopingBlock, includes: i_JobScopingBlock },
      },
      samplingPercentage: 0,
      scheduleFrequency: {
        dailySchedule: {},
        monthlySchedule: { dayOfMonth: 0 },
        weeklySchedule: { dayOfWeek: 0 },
      },
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    MacieNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClassificationJob",
})) as any;

export type CreateCustomDataIdentifierError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | MacieNotEnabled
  | CommonErrors;
/**
 * Creates and defines the criteria and other settings for a custom data identifier.
 */
export const createCustomDataIdentifier: API.OperationMethod<
  CreateCustomDataIdentifierRequest,
  CreateCustomDataIdentifierResponse,
  CreateCustomDataIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /custom-data-identifiers",
    input: {
      clientToken: D.m({ idempotency: true }),
      description: 0,
      ignoreWords: 0,
      keywords: 0,
      maximumMatchDistance: 0,
      name: 0,
      regex: 0,
      severityLevels: D.list({ occurrencesThreshold: 0, severity: 0 }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    MacieNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomDataIdentifier",
})) as any;

export type CreateFindingsFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | MacieNotEnabled
  | CommonErrors;
/**
 * Creates and defines the criteria and other settings for a findings filter.
 */
export const createFindingsFilter: API.OperationMethod<
  CreateFindingsFilterRequest,
  CreateFindingsFilterResponse,
  CreateFindingsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /findingsfilters",
    input: {
      action: 0,
      clientToken: D.m({ idempotency: true }),
      description: 0,
      findingCriteria: i_FindingCriteria,
      name: 0,
      position: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    MacieNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFindingsFilter",
})) as any;

export type CreateInvitationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an Amazon Macie membership invitation to one or more accounts.
 */
export const createInvitations: API.OperationMethod<
  CreateInvitationsRequest,
  CreateInvitationsResponse,
  CreateInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /invitations",
    input: { accountIds: 0, disableEmailNotification: 0, message: 0 },
    body: true,
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
  operationName: "CreateInvitations",
})) as any;

export type CreateMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an account with an Amazon Macie administrator account.
 */
export const createMember: API.OperationMethod<
  CreateMemberRequest,
  CreateMemberResponse,
  CreateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members",
    input: { account: { accountId: 0, email: 0 }, tags: 0 },
    body: true,
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
  operationName: "CreateMember",
})) as any;

export type CreateSampleFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates sample findings.
 */
export const createSampleFindings: API.OperationMethod<
  CreateSampleFindingsRequest,
  CreateSampleFindingsResponse,
  CreateSampleFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings/sample",
    input: { findingTypes: 0 },
    body: true,
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
  operationName: "CreateSampleFindings",
})) as any;

export type DeclineInvitationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Declines Amazon Macie membership invitations that were received from specific accounts.
 */
export const declineInvitations: API.OperationMethod<
  DeclineInvitationsRequest,
  DeclineInvitationsResponse,
  DeclineInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /invitations/decline",
    input: { accountIds: 0 },
    body: true,
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
  operationName: "DeclineInvitations",
})) as any;

export type DeleteAllowListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an allow list.
 */
export const deleteAllowList: API.OperationMethod<
  DeleteAllowListRequest,
  DeleteAllowListResponse,
  DeleteAllowListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /allow-lists/{id}",
    input: { id: 0, ignoreJobChecks: D.m({ query: "ignoreJobChecks" }) },
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
  operationName: "DeleteAllowList",
})) as any;

export type DeleteCustomDataIdentifierError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Soft deletes a custom data identifier.
 */
export const deleteCustomDataIdentifier: API.OperationMethod<
  DeleteCustomDataIdentifierRequest,
  DeleteCustomDataIdentifierResponse,
  DeleteCustomDataIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /custom-data-identifiers/{id}",
    input: { id: 0 },
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
  operationName: "DeleteCustomDataIdentifier",
})) as any;

export type DeleteFindingsFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a findings filter.
 */
export const deleteFindingsFilter: API.OperationMethod<
  DeleteFindingsFilterRequest,
  DeleteFindingsFilterResponse,
  DeleteFindingsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /findingsfilters/{id}",
    input: { id: 0 },
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
  operationName: "DeleteFindingsFilter",
})) as any;

export type DeleteInvitationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes Amazon Macie membership invitations that were received from specific accounts.
 */
export const deleteInvitations: API.OperationMethod<
  DeleteInvitationsRequest,
  DeleteInvitationsResponse,
  DeleteInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /invitations/delete",
    input: { accountIds: 0 },
    body: true,
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
  operationName: "DeleteInvitations",
})) as any;

export type DeleteMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the association between an Amazon Macie administrator account and an account.
 */
export const deleteMember: API.OperationMethod<
  DeleteMemberRequest,
  DeleteMemberResponse,
  DeleteMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /members/{id}", input: { id: 0 } },
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
  operationName: "DeleteMember",
})) as any;

export type DescribeBucketsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) statistical data and other information about one or more S3 buckets that Amazon Macie monitors and analyzes for an account.
 */
export const describeBuckets: API.PaginatedOperationMethod<
  DescribeBucketsRequest,
  DescribeBucketsResponse,
  DescribeBucketsError,
  Credentials | HttpClient.HttpClient,
  BucketMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasources/s3",
    input: {
      criteria: D.map({
        eq: 0,
        gt: 0,
        gte: 0,
        lt: 0,
        lte: 0,
        neq: 0,
        prefix: 0,
      }),
      maxResults: 0,
      nextToken: 0,
      sortCriteria: { attributeName: 0, orderBy: 0 },
    },
    output: {
      buckets: D.list({
        bucketCreatedAt: D.ts,
        jobDetails: o_JobDetails,
        lastAutomatedDiscoveryTime: D.ts,
        lastUpdated: D.ts,
      }),
    },
    body: true,
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
  operationName: "DescribeBuckets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "buckets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeClassificationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and settings for a classification job.
 */
export const describeClassificationJob: API.OperationMethod<
  DescribeClassificationJobRequest,
  DescribeClassificationJobResponse,
  DescribeClassificationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs/{jobId}",
    input: { jobId: 0 },
    output: {
      createdAt: D.ts,
      lastRunTime: D.ts,
      userPausedDetails: o_UserPausedDetails,
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
  operationName: "DescribeClassificationJob",
})) as any;

export type DescribeOrganizationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the Amazon Macie configuration settings for an organization in Organizations.
 */
export const describeOrganizationConfiguration: API.OperationMethod<
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /admin/configuration", input: {} },
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
  operationName: "DescribeOrganizationConfiguration",
})) as any;

export type DisableMacieError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables Amazon Macie and deletes all settings and resources for a Macie account.
 */
export const disableMacie: API.OperationMethod<
  DisableMacieRequest,
  DisableMacieResponse,
  DisableMacieError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /macie", input: {} },
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
  operationName: "DisableMacie",
})) as any;

export type DisableOrganizationAdminAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables an account as the delegated Amazon Macie administrator account for an organization in Organizations.
 */
export const disableOrganizationAdminAccount: API.OperationMethod<
  DisableOrganizationAdminAccountRequest,
  DisableOrganizationAdminAccountResponse,
  DisableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /admin",
    input: { adminAccountId: D.m({ query: "adminAccountId" }) },
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
  operationName: "DisableOrganizationAdminAccount",
})) as any;

export type DisassociateFromAdministratorAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member account from its Amazon Macie administrator account.
 */
export const disassociateFromAdministratorAccount: API.OperationMethod<
  DisassociateFromAdministratorAccountRequest,
  DisassociateFromAdministratorAccountResponse,
  DisassociateFromAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /administrator/disassociate",
    input: {},
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
  operationName: "DisassociateFromAdministratorAccount",
})) as any;

export type DisassociateFromMasterAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * (Deprecated) Disassociates a member account from its Amazon Macie administrator account. This operation has been replaced by the DisassociateFromAdministratorAccount operation.
 */
export const disassociateFromMasterAccount: API.OperationMethod<
  DisassociateFromMasterAccountRequest,
  DisassociateFromMasterAccountResponse,
  DisassociateFromMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /master/disassociate", input: {} },
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
  operationName: "DisassociateFromMasterAccount",
})) as any;

export type DisassociateMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an Amazon Macie administrator account from a member account.
 */
export const disassociateMember: API.OperationMethod<
  DisassociateMemberRequest,
  DisassociateMemberResponse,
  DisassociateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/disassociate/{id}",
    input: { id: 0 },
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
  operationName: "DisassociateMember",
})) as any;

export type EnableMacieError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables Amazon Macie and specifies the configuration settings for a Macie account.
 */
export const enableMacie: API.OperationMethod<
  EnableMacieRequest,
  EnableMacieResponse,
  EnableMacieError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /macie",
    input: {
      clientToken: D.m({ idempotency: true }),
      findingPublishingFrequency: 0,
      status: 0,
    },
    body: true,
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
  operationName: "EnableMacie",
})) as any;

export type EnableOrganizationAdminAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Designates an account as the delegated Amazon Macie administrator account for an organization in Organizations.
 */
export const enableOrganizationAdminAccount: API.OperationMethod<
  EnableOrganizationAdminAccountRequest,
  EnableOrganizationAdminAccountResponse,
  EnableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /admin",
    input: { adminAccountId: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
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
  operationName: "EnableOrganizationAdminAccount",
})) as any;

export type GetAdministratorAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the Amazon Macie administrator account for an account.
 */
export const getAdministratorAccount: API.OperationMethod<
  GetAdministratorAccountRequest,
  GetAdministratorAccountResponse,
  GetAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /administrator",
    input: {},
    output: { administrator: o_Invitation },
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
  operationName: "GetAdministratorAccount",
})) as any;

export type GetAllowListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the settings and status of an allow list.
 */
export const getAllowList: API.OperationMethod<
  GetAllowListRequest,
  GetAllowListResponse,
  GetAllowListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /allow-lists/{id}",
    input: { id: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetAllowList",
})) as any;

export type GetAutomatedDiscoveryConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration settings and status of automated sensitive data discovery for an organization or standalone account.
 */
export const getAutomatedDiscoveryConfiguration: API.OperationMethod<
  GetAutomatedDiscoveryConfigurationRequest,
  GetAutomatedDiscoveryConfigurationResponse,
  GetAutomatedDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /automated-discovery/configuration",
    input: {},
    output: { disabledAt: D.ts, firstEnabledAt: D.ts, lastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedDiscoveryConfiguration",
})) as any;

export type GetBucketStatisticsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) aggregated statistical data about all the S3 buckets that Amazon Macie monitors and analyzes for an account.
 */
export const getBucketStatistics: API.OperationMethod<
  GetBucketStatisticsRequest,
  GetBucketStatisticsResponse,
  GetBucketStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasources/s3/statistics",
    input: { accountId: 0 },
    output: { lastUpdated: D.ts },
    body: true,
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
  operationName: "GetBucketStatistics",
})) as any;

export type GetClassificationExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration settings for storing data classification results.
 */
export const getClassificationExportConfiguration: API.OperationMethod<
  GetClassificationExportConfigurationRequest,
  GetClassificationExportConfigurationResponse,
  GetClassificationExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /classification-export-configuration",
    input: {},
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
  operationName: "GetClassificationExportConfiguration",
})) as any;

export type GetClassificationScopeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the classification scope settings for an account.
 */
export const getClassificationScope: API.OperationMethod<
  GetClassificationScopeRequest,
  GetClassificationScopeResponse,
  GetClassificationScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /classification-scopes/{id}",
    input: { id: 0 },
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
  operationName: "GetClassificationScope",
})) as any;

export type GetCustomDataIdentifierError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the criteria and other settings for a custom data identifier.
 */
export const getCustomDataIdentifier: API.OperationMethod<
  GetCustomDataIdentifierRequest,
  GetCustomDataIdentifierResponse,
  GetCustomDataIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /custom-data-identifiers/{id}",
    input: { id: 0 },
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
  operationName: "GetCustomDataIdentifier",
})) as any;

export type GetFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of one or more findings.
 */
export const getFindings: API.OperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings/describe",
    input: { findingIds: 0, sortCriteria: i_SortCriteria },
    output: {
      findings: D.list({
        createdAt: D.ts,
        policyDetails: {
          action: { apiCallDetails: { firstSeen: D.ts, lastSeen: D.ts } },
          actor: {
            userIdentity: {
              assumedRole: { sessionContext: o_SessionContext },
              federatedUser: { sessionContext: o_SessionContext },
            },
          },
        },
        resourcesAffected: {
          s3Bucket: { createdAt: D.ts },
          s3Object: { lastModified: D.ts },
        },
        updatedAt: D.ts,
      }),
    },
    body: true,
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
  operationName: "GetFindings",
})) as any;

export type GetFindingsFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the criteria and other settings for a findings filter.
 */
export const getFindingsFilter: API.OperationMethod<
  GetFindingsFilterRequest,
  GetFindingsFilterResponse,
  GetFindingsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /findingsfilters/{id}",
    input: { id: 0 },
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
  operationName: "GetFindingsFilter",
})) as any;

export type GetFindingsPublicationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration settings for publishing findings to Security Hub.
 */
export const getFindingsPublicationConfiguration: API.OperationMethod<
  GetFindingsPublicationConfigurationRequest,
  GetFindingsPublicationConfigurationResponse,
  GetFindingsPublicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /findings-publication-configuration",
    input: {},
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
  operationName: "GetFindingsPublicationConfiguration",
})) as any;

export type GetFindingStatisticsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) aggregated statistical data about findings.
 */
export const getFindingStatistics: API.OperationMethod<
  GetFindingStatisticsRequest,
  GetFindingStatisticsResponse,
  GetFindingStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings/statistics",
    input: {
      findingCriteria: i_FindingCriteria,
      groupBy: 0,
      size: 0,
      sortCriteria: { attributeName: 0, orderBy: 0 },
    },
    body: true,
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
  operationName: "GetFindingStatistics",
})) as any;

export type GetInvitationsCountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the count of Amazon Macie membership invitations that were received by an account.
 */
export const getInvitationsCount: API.OperationMethod<
  GetInvitationsCountRequest,
  GetInvitationsCountResponse,
  GetInvitationsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /invitations/count", input: {} },
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
  operationName: "GetInvitationsCount",
})) as any;

export type GetMacieSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and configuration settings for an Amazon Macie account.
 */
export const getMacieSession: API.OperationMethod<
  GetMacieSessionRequest,
  GetMacieSessionResponse,
  GetMacieSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /macie",
    input: {},
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetMacieSession",
})) as any;

export type GetMasterAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * (Deprecated) Retrieves information about the Amazon Macie administrator account for an account. This operation has been replaced by the GetAdministratorAccount operation.
 */
export const getMasterAccount: API.OperationMethod<
  GetMasterAccountRequest,
  GetMasterAccountResponse,
  GetMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /master",
    input: {},
    output: { master: o_Invitation },
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
  operationName: "GetMasterAccount",
})) as any;

export type GetMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an account that's associated with an Amazon Macie administrator account.
 */
export const getMember: API.OperationMethod<
  GetMemberRequest,
  GetMemberResponse,
  GetMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /members/{id}",
    input: { id: 0 },
    output: { invitedAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetMember",
})) as any;

export type GetResourceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) sensitive data discovery statistics and the sensitivity score for an S3 bucket.
 */
export const getResourceProfile: API.OperationMethod<
  GetResourceProfileRequest,
  GetResourceProfileResponse,
  GetResourceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /resource-profiles",
    input: { resourceArn: D.m({ query: "resourceArn" }) },
    output: { profileUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceProfile",
})) as any;

export type GetRevealConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and configuration settings for retrieving occurrences of sensitive data reported by findings.
 */
export const getRevealConfiguration: API.OperationMethod<
  GetRevealConfigurationRequest,
  GetRevealConfigurationResponse,
  GetRevealConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /reveal-configuration", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevealConfiguration",
})) as any;

export type GetSensitiveDataOccurrencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Retrieves occurrences of sensitive data reported by a finding.
 */
export const getSensitiveDataOccurrences: API.OperationMethod<
  GetSensitiveDataOccurrencesRequest,
  GetSensitiveDataOccurrencesResponse,
  GetSensitiveDataOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /findings/{findingId}/reveal",
    input: { findingId: 0 },
    output: { sensitiveDataOccurrences: D.map(D.list({ value: D.secret })) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSensitiveDataOccurrences",
})) as any;

export type GetSensitiveDataOccurrencesAvailabilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Checks whether occurrences of sensitive data can be retrieved for a finding.
 */
export const getSensitiveDataOccurrencesAvailability: API.OperationMethod<
  GetSensitiveDataOccurrencesAvailabilityRequest,
  GetSensitiveDataOccurrencesAvailabilityResponse,
  GetSensitiveDataOccurrencesAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /findings/{findingId}/reveal/availability",
    input: { findingId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSensitiveDataOccurrencesAvailability",
})) as any;

export type GetSensitivityInspectionTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the settings for the sensitivity inspection template for an account.
 */
export const getSensitivityInspectionTemplate: API.OperationMethod<
  GetSensitivityInspectionTemplateRequest,
  GetSensitivityInspectionTemplateResponse,
  GetSensitivityInspectionTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /templates/sensitivity-inspections/{id}",
    input: { id: 0 },
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
  operationName: "GetSensitivityInspectionTemplate",
})) as any;

export type GetUsageStatisticsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) quotas and aggregated usage data for one or more accounts.
 */
export const getUsageStatistics: API.PaginatedOperationMethod<
  GetUsageStatisticsRequest,
  GetUsageStatisticsResponse,
  GetUsageStatisticsError,
  Credentials | HttpClient.HttpClient,
  UsageRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /usage/statistics",
    input: {
      filterBy: D.list({ comparator: 0, key: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
      sortBy: { key: 0, orderBy: 0 },
      timeRange: 0,
    },
    output: {
      records: D.list({
        automatedDiscoveryFreeTrialStartDate: D.ts,
        freeTrialStartDate: D.ts,
      }),
    },
    body: true,
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
  operationName: "GetUsageStatistics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "records",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetUsageTotalsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) aggregated usage data for an account.
 */
export const getUsageTotals: API.OperationMethod<
  GetUsageTotalsRequest,
  GetUsageTotalsResponse,
  GetUsageTotalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /usage",
    input: { timeRange: D.m({ query: "timeRange" }) },
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
  operationName: "GetUsageTotals",
})) as any;

export type ListAllowListsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about all the allow lists for an account.
 */
export const listAllowLists: API.PaginatedOperationMethod<
  ListAllowListsRequest,
  ListAllowListsResponse,
  ListAllowListsError,
  Credentials | HttpClient.HttpClient,
  AllowListSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /allow-lists",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { allowLists: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowLists",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "allowLists",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedDiscoveryAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status of automated sensitive data discovery for one or more accounts.
 */
export const listAutomatedDiscoveryAccounts: API.PaginatedOperationMethod<
  ListAutomatedDiscoveryAccountsRequest,
  ListAutomatedDiscoveryAccountsResponse,
  ListAutomatedDiscoveryAccountsError,
  Credentials | HttpClient.HttpClient,
  AutomatedDiscoveryAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /automated-discovery/accounts",
    input: {
      accountIds: D.m({ query: "accountIds" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListAutomatedDiscoveryAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClassificationJobsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about one or more classification jobs.
 */
export const listClassificationJobs: API.PaginatedOperationMethod<
  ListClassificationJobsRequest,
  ListClassificationJobsResponse,
  ListClassificationJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /jobs/list",
    input: {
      filterCriteria: {
        excludes: D.list(i_ListJobsFilterTerm),
        includes: D.list(i_ListJobsFilterTerm),
      },
      maxResults: 0,
      nextToken: 0,
      sortCriteria: { attributeName: 0, orderBy: 0 },
    },
    output: {
      items: D.list({
        createdAt: D.ts,
        userPausedDetails: o_UserPausedDetails,
      }),
    },
    body: true,
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
  operationName: "ListClassificationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClassificationScopesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about the classification scope for an account.
 */
export const listClassificationScopes: API.PaginatedOperationMethod<
  ListClassificationScopesRequest,
  ListClassificationScopesResponse,
  ListClassificationScopesError,
  Credentials | HttpClient.HttpClient,
  ClassificationScopeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /classification-scopes",
    input: {
      name: D.m({ query: "name" }),
      nextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListClassificationScopes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "classificationScopes",
  } as const,
})) as any;

export type ListCustomDataIdentifiersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about the custom data identifiers for an account.
 */
export const listCustomDataIdentifiers: API.PaginatedOperationMethod<
  ListCustomDataIdentifiersRequest,
  ListCustomDataIdentifiersResponse,
  ListCustomDataIdentifiersError,
  Credentials | HttpClient.HttpClient,
  CustomDataIdentifierSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /custom-data-identifiers/list",
    input: { maxResults: 0, nextToken: 0 },
    output: { items: D.list({ createdAt: D.ts }) },
    body: true,
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
  operationName: "ListCustomDataIdentifiers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about one or more findings.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings",
    input: {
      findingCriteria: i_FindingCriteria,
      maxResults: 0,
      nextToken: 0,
      sortCriteria: i_SortCriteria,
    },
    body: true,
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
  operationName: "ListFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsFiltersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about all the findings filters for an account.
 */
export const listFindingsFilters: API.PaginatedOperationMethod<
  ListFindingsFiltersRequest,
  ListFindingsFiltersResponse,
  ListFindingsFiltersError,
  Credentials | HttpClient.HttpClient,
  FindingsFilterListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /findingsfilters",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListFindingsFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsFilterListItems",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInvitationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about Amazon Macie membership invitations that were received by an account.
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
    http: "GET /invitations",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { invitations: D.list(o_Invitation) },
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
  operationName: "ListInvitations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invitations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedDataIdentifiersError = CommonErrors;
/**
 * Retrieves information about all the managed data identifiers that Amazon Macie currently provides.
 */
export const listManagedDataIdentifiers: API.PaginatedOperationMethod<
  ListManagedDataIdentifiersRequest,
  ListManagedDataIdentifiersResponse,
  ListManagedDataIdentifiersError,
  Credentials | HttpClient.HttpClient,
  ManagedDataIdentifierSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /managed-data-identifiers/list",
    input: { nextToken: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedDataIdentifiers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
  } as const,
})) as any;

export type ListMembersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the accounts that are associated with an Amazon Macie administrator account.
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
    http: "GET /members",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      onlyAssociated: D.m({ query: "onlyAssociated" }),
    },
    output: { members: D.list({ invitedAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListMembers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationAdminAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the delegated Amazon Macie administrator account for an organization in Organizations.
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
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListOrganizationAdminAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "adminAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceProfileArtifactsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about objects that Amazon Macie selected from an S3 bucket for automated sensitive data discovery.
 */
export const listResourceProfileArtifacts: API.PaginatedOperationMethod<
  ListResourceProfileArtifactsRequest,
  ListResourceProfileArtifactsResponse,
  ListResourceProfileArtifactsError,
  Credentials | HttpClient.HttpClient,
  ResourceProfileArtifact
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /resource-profiles/artifacts",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      resourceArn: D.m({ query: "resourceArn" }),
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
  operationName: "ListResourceProfileArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "artifacts",
  } as const,
})) as any;

export type ListResourceProfileDetectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the types and amount of sensitive data that Amazon Macie found in an S3 bucket.
 */
export const listResourceProfileDetections: API.PaginatedOperationMethod<
  ListResourceProfileDetectionsRequest,
  ListResourceProfileDetectionsResponse,
  ListResourceProfileDetectionsError,
  Credentials | HttpClient.HttpClient,
  Detection
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /resource-profiles/detections",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      resourceArn: D.m({ query: "resourceArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceProfileDetections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "detections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSensitivityInspectionTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about the sensitivity inspection template for an account.
 */
export const listSensitivityInspectionTemplates: API.PaginatedOperationMethod<
  ListSensitivityInspectionTemplatesRequest,
  ListSensitivityInspectionTemplatesResponse,
  ListSensitivityInspectionTemplatesError,
  Credentials | HttpClient.HttpClient,
  SensitivityInspectionTemplatesEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /templates/sensitivity-inspections",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSensitivityInspectionTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sensitivityInspectionTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * Retrieves the tags (keys and values) that are associated with an Amazon Macie resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutClassificationExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates the configuration settings for storing data classification results.
 */
export const putClassificationExportConfiguration: API.OperationMethod<
  PutClassificationExportConfigurationRequest,
  PutClassificationExportConfigurationResponse,
  PutClassificationExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /classification-export-configuration",
    input: {
      configuration: {
        s3Destination: {
          bucketName: 0,
          expectedBucketOwner: 0,
          keyPrefix: 0,
          kmsKeyArn: 0,
        },
      },
    },
    body: true,
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
  operationName: "PutClassificationExportConfiguration",
})) as any;

export type PutFindingsPublicationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration settings for publishing findings to Security Hub.
 */
export const putFindingsPublicationConfiguration: API.OperationMethod<
  PutFindingsPublicationConfigurationRequest,
  PutFindingsPublicationConfigurationResponse,
  PutFindingsPublicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /findings-publication-configuration",
    input: {
      clientToken: D.m({ idempotency: true }),
      securityHubConfiguration: {
        publishClassificationFindings: 0,
        publishPolicyFindings: 0,
      },
    },
    body: true,
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
  operationName: "PutFindingsPublicationConfiguration",
})) as any;

export type SearchResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) statistical data and other information about Amazon Web Services resources that Amazon Macie monitors and analyzes for an account.
 */
export const searchResources: API.PaginatedOperationMethod<
  SearchResourcesRequest,
  SearchResourcesResponse,
  SearchResourcesError,
  Credentials | HttpClient.HttpClient,
  MatchingResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasources/search-resources",
    input: {
      bucketCriteria: {
        excludes: i_SearchResourcesCriteriaBlock,
        includes: i_SearchResourcesCriteriaBlock,
      },
      maxResults: 0,
      nextToken: 0,
      sortCriteria: { attributeName: 0, orderBy: 0 },
    },
    output: {
      matchingResources: D.list({
        matchingBucket: {
          jobDetails: o_JobDetails,
          lastAutomatedDiscoveryTime: D.ts,
        },
      }),
    },
    body: true,
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
  operationName: "SearchResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "matchingResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError = CommonErrors;
/**
 * Adds or updates one or more tags (keys and values) that are associated with an Amazon Macie resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestCustomDataIdentifierError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tests criteria for a custom data identifier.
 */
export const testCustomDataIdentifier: API.OperationMethod<
  TestCustomDataIdentifierRequest,
  TestCustomDataIdentifierResponse,
  TestCustomDataIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /custom-data-identifiers/test",
    input: {
      ignoreWords: 0,
      keywords: 0,
      maximumMatchDistance: 0,
      regex: 0,
      sampleText: 0,
    },
    body: true,
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
  operationName: "TestCustomDataIdentifier",
})) as any;

export type UntagResourceError = CommonErrors;
/**
 * Removes one or more tags (keys and values) from an Amazon Macie resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAllowListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for an allow list.
 */
export const updateAllowList: API.OperationMethod<
  UpdateAllowListRequest,
  UpdateAllowListResponse,
  UpdateAllowListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /allow-lists/{id}",
    input: { criteria: i_AllowListCriteria, description: 0, id: 0, name: 0 },
    body: true,
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
  operationName: "UpdateAllowList",
})) as any;

export type UpdateAutomatedDiscoveryConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the configuration settings and status of automated sensitive data discovery for an organization or standalone account.
 */
export const updateAutomatedDiscoveryConfiguration: API.OperationMethod<
  UpdateAutomatedDiscoveryConfigurationRequest,
  UpdateAutomatedDiscoveryConfigurationResponse,
  UpdateAutomatedDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /automated-discovery/configuration",
    input: { autoEnableOrganizationMembers: 0, status: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomatedDiscoveryConfiguration",
})) as any;

export type UpdateClassificationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the status of a classification job.
 */
export const updateClassificationJob: API.OperationMethod<
  UpdateClassificationJobRequest,
  UpdateClassificationJobResponse,
  UpdateClassificationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /jobs/{jobId}",
    input: { jobId: 0, jobStatus: 0 },
    body: true,
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
  operationName: "UpdateClassificationJob",
})) as any;

export type UpdateClassificationScopeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the classification scope settings for an account.
 */
export const updateClassificationScope: API.OperationMethod<
  UpdateClassificationScopeRequest,
  UpdateClassificationScopeResponse,
  UpdateClassificationScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /classification-scopes/{id}",
    input: { id: 0, s3: { excludes: { bucketNames: 0, operation: 0 } } },
    body: true,
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
  operationName: "UpdateClassificationScope",
})) as any;

export type UpdateFindingsFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the criteria and other settings for a findings filter.
 */
export const updateFindingsFilter: API.OperationMethod<
  UpdateFindingsFilterRequest,
  UpdateFindingsFilterResponse,
  UpdateFindingsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /findingsfilters/{id}",
    input: {
      action: 0,
      clientToken: D.m({ idempotency: true }),
      description: 0,
      findingCriteria: i_FindingCriteria,
      id: 0,
      name: 0,
      position: 0,
    },
    body: true,
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
  operationName: "UpdateFindingsFilter",
})) as any;

export type UpdateMacieSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Suspends or re-enables Amazon Macie, or updates the configuration settings for a Macie account.
 */
export const updateMacieSession: API.OperationMethod<
  UpdateMacieSessionRequest,
  UpdateMacieSessionResponse,
  UpdateMacieSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /macie",
    input: { findingPublishingFrequency: 0, status: 0 },
    body: true,
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
  operationName: "UpdateMacieSession",
})) as any;

export type UpdateMemberSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables an Amazon Macie administrator to suspend or re-enable Macie for a member account.
 */
export const updateMemberSession: API.OperationMethod<
  UpdateMemberSessionRequest,
  UpdateMemberSessionResponse,
  UpdateMemberSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /macie/members/{id}",
    input: { id: 0, status: 0 },
    body: true,
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
  operationName: "UpdateMemberSession",
})) as any;

export type UpdateOrganizationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the Amazon Macie configuration settings for an organization in Organizations.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /admin/configuration",
    input: { autoEnable: 0 },
    body: true,
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
  operationName: "UpdateOrganizationConfiguration",
})) as any;

export type UpdateResourceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the sensitivity score for an S3 bucket.
 */
export const updateResourceProfile: API.OperationMethod<
  UpdateResourceProfileRequest,
  UpdateResourceProfileResponse,
  UpdateResourceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /resource-profiles",
    input: {
      resourceArn: D.m({ query: "resourceArn" }),
      sensitivityScoreOverride: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceProfile",
})) as any;

export type UpdateResourceProfileDetectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the sensitivity scoring settings for an S3 bucket.
 */
export const updateResourceProfileDetections: API.OperationMethod<
  UpdateResourceProfileDetectionsRequest,
  UpdateResourceProfileDetectionsResponse,
  UpdateResourceProfileDetectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /resource-profiles/detections",
    input: {
      resourceArn: D.m({ query: "resourceArn" }),
      suppressDataIdentifiers: D.list({ id: 0, type: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceProfileDetections",
})) as any;

export type UpdateRevealConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status and configuration settings for retrieving occurrences of sensitive data reported by findings.
 */
export const updateRevealConfiguration: API.OperationMethod<
  UpdateRevealConfigurationRequest,
  UpdateRevealConfigurationResponse,
  UpdateRevealConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /reveal-configuration",
    input: {
      configuration: { kmsKeyId: 0, status: 0 },
      retrievalConfiguration: { retrievalMode: 0, roleName: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRevealConfiguration",
})) as any;

export type UpdateSensitivityInspectionTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for the sensitivity inspection template for an account.
 */
export const updateSensitivityInspectionTemplate: API.OperationMethod<
  UpdateSensitivityInspectionTemplateRequest,
  UpdateSensitivityInspectionTemplateResponse,
  UpdateSensitivityInspectionTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /templates/sensitivity-inspections/{id}",
    input: {
      description: 0,
      excludes: { managedDataIdentifierIds: 0 },
      id: 0,
      includes: {
        allowListIds: 0,
        customDataIdentifierIds: 0,
        managedDataIdentifierIds: 0,
      },
    },
    body: true,
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
  operationName: "UpdateSensitivityInspectionTemplate",
})) as any;

const i_AllowListCriteria: D.LazyStruct = () => ({
  regex: 0,
  s3WordsList: { bucketName: 0, objectKey: 0 },
});
const i_CriteriaBlockForJob: D.LazyStruct = () => ({
  and: D.list({
    simpleCriterion: { comparator: 0, key: 0, values: 0 },
    tagCriterion: { comparator: 0, tagValues: D.list({ key: 0, value: 0 }) },
  }),
});
const i_FindingCriteria: D.LazyStruct = () => ({
  criterion: D.map({
    eq: 0,
    eqExactMatch: 0,
    gt: 0,
    gte: 0,
    lt: 0,
    lte: 0,
    neq: 0,
  }),
});
const i_JobScopingBlock: D.LazyStruct = () => ({
  and: D.list({
    simpleScopeTerm: { comparator: 0, key: 0, values: 0 },
    tagScopeTerm: {
      comparator: 0,
      key: 0,
      tagValues: D.list({ key: 0, value: 0 }),
      target: 0,
    },
  }),
});
const i_ListJobsFilterTerm: D.LazyStruct = () => ({
  comparator: 0,
  key: 0,
  values: 0,
});
const i_SearchResourcesCriteriaBlock: D.LazyStruct = () => ({
  and: D.list({
    simpleCriterion: { comparator: 0, key: 0, values: 0 },
    tagCriterion: { comparator: 0, tagValues: D.list({ key: 0, value: 0 }) },
  }),
});
const i_SortCriteria: D.LazyStruct = () => ({ attributeName: 0, orderBy: 0 });
const o_Invitation: D.LazyStruct = () => ({ invitedAt: D.ts });
const o_JobDetails: D.LazyStruct = () => ({ lastJobRunTime: D.ts });
const o_SessionContext: D.LazyStruct = () => ({
  attributes: { creationDate: D.ts },
});
const o_UserPausedDetails: D.LazyStruct = () => ({
  jobExpiresAt: D.ts,
  jobPausedAt: D.ts,
});
