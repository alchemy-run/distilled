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
  sdkId: "AccessAnalyzer",
  target: "AccessAnalyzer",
  version: "2019-11-01",
  sigv4: "access-analyzer",
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
                `https://access-analyzer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://access-analyzer.${Region}.amazonaws.com`);
              }
              return e(
                `https://access-analyzer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://access-analyzer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://access-analyzer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
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
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableEntityException",
    ["BadRequestError", "RetryableError"],
    { status: 422 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type AnalyzerArn = string;
export type Name = string;
export interface ApplyArchiveRuleRequest {
  analyzerArn: string;
  ruleName: string;
  clientToken?: string;
}
export interface ApplyArchiveRuleResponse {}
export type JobId = string;
export interface CancelPolicyGenerationRequest {
  jobId: string;
}
export interface CancelPolicyGenerationResponse {}
export type AccessCheckPolicyDocument = string | redacted.Redacted<string>;
export type Action = string;
export type ActionsList = string[];
export type Resource = string;
export type ResourcesList = string[];
export interface Access {
  actions?: string[];
  resources?: string[];
}
export type AccessList = Access[];
export type AccessCheckPolicyType = string;
export interface CheckAccessNotGrantedRequest {
  policyDocument: string | redacted.Redacted<string>;
  access: Access[];
  policyType: string;
}
export type CheckAccessNotGrantedResult = string;
export interface ReasonSummary {
  description?: string;
  statementIndex?: number;
  statementId?: string;
}
export type ReasonSummaryList = ReasonSummary[];
export interface CheckAccessNotGrantedResponse {
  result?: string;
  message?: string;
  reasons?: ReasonSummary[];
}
export interface CheckNoNewAccessRequest {
  newPolicyDocument: string | redacted.Redacted<string>;
  existingPolicyDocument: string | redacted.Redacted<string>;
  policyType: string;
}
export type CheckNoNewAccessResult = string;
export interface CheckNoNewAccessResponse {
  result?: string;
  message?: string;
  reasons?: ReasonSummary[];
}
export type AccessCheckResourceType = string;
export interface CheckNoPublicAccessRequest {
  policyDocument: string | redacted.Redacted<string>;
  resourceType: string;
}
export type CheckNoPublicAccessResult = string;
export interface CheckNoPublicAccessResponse {
  result?: string;
  message?: string;
  reasons?: ReasonSummary[];
}
export type ConfigurationsMapKey = string;
export type EbsUserId = string;
export type EbsUserIdList = string[];
export type EbsGroup = string;
export type EbsGroupList = string[];
export type EbsSnapshotDataEncryptionKeyId = string;
export interface EbsSnapshotConfiguration {
  userIds?: string[];
  groups?: string[];
  kmsKeyId?: string;
}
export type EcrRepositoryPolicy = string;
export interface EcrRepositoryConfiguration {
  repositoryPolicy?: string;
}
export type IamTrustPolicy = string;
export interface IamRoleConfiguration {
  trustPolicy?: string;
}
export type EfsFileSystemPolicy = string;
export interface EfsFileSystemConfiguration {
  fileSystemPolicy?: string;
}
export type PolicyName = string;
export type KmsKeyPolicy = string;
export type KmsKeyPoliciesMap = { [key: string]: string | undefined };
export type KmsGrantOperation = string;
export type KmsGrantOperationsList = string[];
export type GranteePrincipal = string;
export type RetiringPrincipal = string;
export type KmsConstraintsKey = string;
export type KmsConstraintsValue = string;
export type KmsConstraintsMap = { [key: string]: string | undefined };
export interface KmsGrantConstraints {
  encryptionContextEquals?: { [key: string]: string | undefined };
  encryptionContextSubset?: { [key: string]: string | undefined };
}
export type IssuingAccount = string;
export interface KmsGrantConfiguration {
  operations: string[];
  granteePrincipal: string;
  retiringPrincipal?: string;
  constraints?: KmsGrantConstraints;
  issuingAccount: string;
}
export type KmsGrantConfigurationsList = KmsGrantConfiguration[];
export interface KmsKeyConfiguration {
  keyPolicies?: { [key: string]: string | undefined };
  grants?: KmsGrantConfiguration[];
}
export type RdsDbClusterSnapshotAttributeName = string;
export type RdsDbClusterSnapshotAccountId = string;
export type RdsDbClusterSnapshotAccountIdsList = string[];
export type RdsDbClusterSnapshotAttributeValue = { accountIds: string[] };
export type RdsDbClusterSnapshotAttributesMap = {
  [key: string]: RdsDbClusterSnapshotAttributeValue | undefined;
};
export type RdsDbClusterSnapshotKmsKeyId = string;
export interface RdsDbClusterSnapshotConfiguration {
  attributes?: {
    [key: string]: RdsDbClusterSnapshotAttributeValue | undefined;
  };
  kmsKeyId?: string;
}
export type RdsDbSnapshotAttributeName = string;
export type RdsDbSnapshotAccountId = string;
export type RdsDbSnapshotAccountIdsList = string[];
export type RdsDbSnapshotAttributeValue = { accountIds: string[] };
export type RdsDbSnapshotAttributesMap = {
  [key: string]: RdsDbSnapshotAttributeValue | undefined;
};
export type RdsDbSnapshotKmsKeyId = string;
export interface RdsDbSnapshotConfiguration {
  attributes?: { [key: string]: RdsDbSnapshotAttributeValue | undefined };
  kmsKeyId?: string;
}
export type SecretsManagerSecretKmsId = string;
export type SecretsManagerSecretPolicy = string;
export interface SecretsManagerSecretConfiguration {
  kmsKeyId?: string;
  secretPolicy?: string;
}
export type S3BucketPolicy = string;
export type AclPermission = string;
export type AclCanonicalId = string;
export type AclUri = string;
export type AclGrantee =
  | { id: string; uri?: never }
  | { id?: never; uri: string };
export interface S3BucketAclGrantConfiguration {
  permission: string;
  grantee: AclGrantee;
}
export type S3BucketAclGrantConfigurationsList =
  S3BucketAclGrantConfiguration[];
export interface S3PublicAccessBlockConfiguration {
  ignorePublicAcls: boolean;
  restrictPublicBuckets: boolean;
}
export type AccessPointArn = string;
export type AccessPointPolicy = string;
export type VpcId = string;
export interface VpcConfiguration {
  vpcId: string;
}
export interface InternetConfiguration {}
export type NetworkOriginConfiguration =
  | { vpcConfiguration: VpcConfiguration; internetConfiguration?: never }
  | { vpcConfiguration?: never; internetConfiguration: InternetConfiguration };
export interface S3AccessPointConfiguration {
  accessPointPolicy?: string;
  publicAccessBlock?: S3PublicAccessBlockConfiguration;
  networkOrigin?: NetworkOriginConfiguration;
}
export type S3AccessPointConfigurationsMap = {
  [key: string]: S3AccessPointConfiguration | undefined;
};
export interface S3BucketConfiguration {
  bucketPolicy?: string;
  bucketAclGrants?: S3BucketAclGrantConfiguration[];
  bucketPublicAccessBlock?: S3PublicAccessBlockConfiguration;
  accessPoints?: { [key: string]: S3AccessPointConfiguration | undefined };
}
export type SnsTopicPolicy = string;
export interface SnsTopicConfiguration {
  topicPolicy?: string;
}
export type SqsQueuePolicy = string;
export interface SqsQueueConfiguration {
  queuePolicy?: string;
}
export type S3ExpressDirectoryBucketPolicy = string;
export type S3ExpressDirectoryAccessPointArn = string;
export interface S3ExpressDirectoryAccessPointConfiguration {
  accessPointPolicy?: string;
  networkOrigin?: NetworkOriginConfiguration;
}
export type S3ExpressDirectoryAccessPointConfigurationsMap = {
  [key: string]: S3ExpressDirectoryAccessPointConfiguration | undefined;
};
export interface S3ExpressDirectoryBucketConfiguration {
  bucketPolicy?: string;
  accessPoints?: {
    [key: string]: S3ExpressDirectoryAccessPointConfiguration | undefined;
  };
}
export type DynamodbStreamPolicy = string;
export interface DynamodbStreamConfiguration {
  streamPolicy?: string;
}
export type DynamodbTablePolicy = string;
export interface DynamodbTableConfiguration {
  tablePolicy?: string;
}
export type Configuration =
  | {
      ebsSnapshot: EbsSnapshotConfiguration;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository: EcrRepositoryConfiguration;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole: IamRoleConfiguration;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem: EfsFileSystemConfiguration;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey: KmsKeyConfiguration;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot: RdsDbClusterSnapshotConfiguration;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot: RdsDbSnapshotConfiguration;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret: SecretsManagerSecretConfiguration;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket: S3BucketConfiguration;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic: SnsTopicConfiguration;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue: SqsQueueConfiguration;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket: S3ExpressDirectoryBucketConfiguration;
      dynamodbStream?: never;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream: DynamodbStreamConfiguration;
      dynamodbTable?: never;
    }
  | {
      ebsSnapshot?: never;
      ecrRepository?: never;
      iamRole?: never;
      efsFileSystem?: never;
      kmsKey?: never;
      rdsDbClusterSnapshot?: never;
      rdsDbSnapshot?: never;
      secretsManagerSecret?: never;
      s3Bucket?: never;
      snsTopic?: never;
      sqsQueue?: never;
      s3ExpressDirectoryBucket?: never;
      dynamodbStream?: never;
      dynamodbTable: DynamodbTableConfiguration;
    };
export type ConfigurationsMap = { [key: string]: Configuration | undefined };
export interface CreateAccessPreviewRequest {
  analyzerArn: string;
  configurations: { [key: string]: Configuration | undefined };
  clientToken?: string;
}
export type AccessPreviewId = string;
export interface CreateAccessPreviewResponse {
  id: string;
}
export type AnalyzerName = string;
export type Type = string;
export type ValueList = string[];
export interface Criterion {
  eq?: string[];
  neq?: string[];
  contains?: string[];
  exists?: boolean;
}
export type FilterCriteriaMap = { [key: string]: Criterion | undefined };
export interface InlineArchiveRule {
  ruleName: string;
  filter: { [key: string]: Criterion | undefined };
}
export type InlineArchiveRulesList = InlineArchiveRule[];
export type TagsMap = { [key: string]: string | undefined };
export type AccountIdsList = string[];
export type TagsList = { [key: string]: string | undefined }[];
export interface AnalysisRuleCriteria {
  accountIds?: string[];
  resourceTags?: { [key: string]: string | undefined }[];
}
export type AnalysisRuleCriteriaList = AnalysisRuleCriteria[];
export interface AnalysisRule {
  exclusions?: AnalysisRuleCriteria[];
}
export interface UnusedAccessConfiguration {
  unusedAccessAge?: number;
  analysisRule?: AnalysisRule;
}
export type ResourceType = string;
export type ResourceTypeList = string[];
export type ResourceArnsList = string[];
export interface InternalAccessAnalysisRuleCriteria {
  accountIds?: string[];
  resourceTypes?: string[];
  resourceArns?: string[];
}
export type InternalAccessAnalysisRuleCriteriaList =
  InternalAccessAnalysisRuleCriteria[];
export interface InternalAccessAnalysisRule {
  inclusions?: InternalAccessAnalysisRuleCriteria[];
}
export interface InternalAccessConfiguration {
  analysisRule?: InternalAccessAnalysisRule;
}
export type AnalyzerConfiguration =
  | { unusedAccess: UnusedAccessConfiguration; internalAccess?: never }
  | { unusedAccess?: never; internalAccess: InternalAccessConfiguration };
export interface CreateAnalyzerRequest {
  analyzerName: string;
  type: string;
  archiveRules?: InlineArchiveRule[];
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
  configuration?: AnalyzerConfiguration;
}
export interface CreateAnalyzerResponse {
  arn?: string;
}
export interface CreateArchiveRuleRequest {
  analyzerName: string;
  ruleName: string;
  filter: { [key: string]: Criterion | undefined };
  clientToken?: string;
}
export interface CreateArchiveRuleResponse {}
export interface CreateServiceLinkedAnalyzerRequest {
  type: string;
  archiveRules?: InlineArchiveRule[];
  clientToken?: string;
  configuration?: AnalyzerConfiguration;
}
export interface CreateServiceLinkedAnalyzerResponse {
  arn?: string;
}
export interface DeleteAnalyzerRequest {
  analyzerName: string;
  clientToken?: string;
}
export interface DeleteAnalyzerResponse {}
export interface DeleteArchiveRuleRequest {
  analyzerName: string;
  ruleName: string;
  clientToken?: string;
}
export interface DeleteArchiveRuleResponse {}
export interface DeleteServiceLinkedAnalyzerRequest {
  analyzerName: string;
  clientToken?: string;
}
export interface DeleteServiceLinkedAnalyzerResponse {}
export interface GenerateFindingRecommendationRequest {
  analyzerArn: string;
  id: string;
}
export interface GenerateFindingRecommendationResponse {}
export interface GetAccessPreviewRequest {
  accessPreviewId: string;
  analyzerArn: string;
}
export type AccessPreviewStatus = string;
export type AccessPreviewStatusReasonCode = string;
export interface AccessPreviewStatusReason {
  code: string;
}
export interface AccessPreview {
  id: string;
  analyzerArn: string;
  configurations: { [key: string]: Configuration | undefined };
  createdAt: Date;
  status: string;
  statusReason?: AccessPreviewStatusReason;
}
export interface GetAccessPreviewResponse {
  accessPreview: AccessPreview;
}
export type ResourceArn = string;
export interface GetAnalyzedResourceRequest {
  analyzerArn: string;
  resourceArn: string;
}
export type ActionList = string[];
export type SharedViaList = string[];
export type FindingStatus = string;
export interface AnalyzedResource {
  resourceArn: string;
  resourceType: string;
  createdAt: Date;
  analyzedAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  actions?: string[];
  sharedVia?: string[];
  status?: string;
  resourceOwnerAccount: string;
  error?: string;
}
export interface GetAnalyzedResourceResponse {
  resource?: AnalyzedResource;
}
export interface GetAnalyzerRequest {
  analyzerName: string;
}
export type AnalyzerStatus = string;
export type ReasonCode = string;
export interface StatusReason {
  code: string;
}
export interface AnalyzerSummary {
  arn: string;
  name: string;
  type: string;
  createdAt: Date;
  lastResourceAnalyzed?: string;
  lastResourceAnalyzedAt?: Date;
  tags?: { [key: string]: string | undefined };
  status: string;
  statusReason?: StatusReason;
  configuration?: AnalyzerConfiguration;
  managedBy?: string;
}
export interface GetAnalyzerResponse {
  analyzer: AnalyzerSummary;
}
export interface GetArchiveRuleRequest {
  analyzerName: string;
  ruleName: string;
}
export interface ArchiveRuleSummary {
  ruleName: string;
  filter: { [key: string]: Criterion | undefined };
  createdAt: Date;
  updatedAt: Date;
}
export interface GetArchiveRuleResponse {
  archiveRule: ArchiveRuleSummary;
}
export type FindingId = string;
export interface GetFindingRequest {
  analyzerArn: string;
  id: string;
}
export type PrincipalMap = { [key: string]: string | undefined };
export type ConditionKeyMap = { [key: string]: string | undefined };
export type FindingSourceType = string;
export interface FindingSourceDetail {
  accessPointArn?: string;
  accessPointAccount?: string;
}
export interface FindingSource {
  type: string;
  detail?: FindingSourceDetail;
}
export type FindingSourceList = FindingSource[];
export type ResourceControlPolicyRestriction = string;
export interface Finding {
  id: string;
  principal?: { [key: string]: string | undefined };
  action?: string[];
  resource?: string;
  isPublic?: boolean;
  resourceType: string;
  condition: { [key: string]: string | undefined };
  createdAt: Date;
  analyzedAt: Date;
  updatedAt: Date;
  status: string;
  resourceOwnerAccount: string;
  error?: string;
  sources?: FindingSource[];
  resourceControlPolicyRestriction?: string;
}
export interface GetFindingResponse {
  finding?: Finding;
}
export type Token = string;
export interface GetFindingRecommendationRequest {
  analyzerArn: string;
  id: string;
  maxResults?: number;
  nextToken?: string;
}
export interface RecommendationError {
  code: string;
  message: string;
}
export type RecommendedRemediationAction = string;
export interface UnusedPermissionsRecommendedStep {
  policyUpdatedAt?: Date;
  recommendedAction: string;
  recommendedPolicy?: string;
  existingPolicyId?: string;
}
export type RecommendedStep = {
  unusedPermissionsRecommendedStep: UnusedPermissionsRecommendedStep;
};
export type RecommendedStepList = RecommendedStep[];
export type RecommendationType = string;
export type Status = string;
export interface GetFindingRecommendationResponse {
  startedAt: Date;
  completedAt?: Date;
  nextToken?: string;
  error?: RecommendationError;
  resourceArn: string;
  recommendedSteps?: RecommendedStep[];
  recommendationType: string;
  status: string;
}
export interface GetFindingsStatisticsRequest {
  analyzerArn: string;
}
export interface ResourceTypeDetails {
  totalActivePublic?: number;
  totalActiveCrossAccount?: number;
  totalActiveErrors?: number;
}
export type ResourceTypeStatisticsMap = {
  [key: string]: ResourceTypeDetails | undefined;
};
export interface ExternalAccessFindingsStatistics {
  resourceTypeStatistics?: { [key: string]: ResourceTypeDetails | undefined };
  totalActiveFindings?: number;
  totalArchivedFindings?: number;
  totalResolvedFindings?: number;
}
export interface InternalAccessResourceTypeDetails {
  totalActiveFindings?: number;
  totalResolvedFindings?: number;
  totalArchivedFindings?: number;
}
export type InternalAccessResourceTypeStatisticsMap = {
  [key: string]: InternalAccessResourceTypeDetails | undefined;
};
export interface InternalAccessFindingsStatistics {
  resourceTypeStatistics?: {
    [key: string]: InternalAccessResourceTypeDetails | undefined;
  };
  totalActiveFindings?: number;
  totalArchivedFindings?: number;
  totalResolvedFindings?: number;
}
export interface UnusedAccessTypeStatistics {
  unusedAccessType?: string;
  total?: number;
}
export type UnusedAccessTypeStatisticsList = UnusedAccessTypeStatistics[];
export type FindingAggregationAccountDetailsMap = {
  [key: string]: number | undefined;
};
export interface FindingAggregationAccountDetails {
  account?: string;
  numberOfActiveFindings?: number;
  details?: { [key: string]: number | undefined };
}
export type AccountAggregations = FindingAggregationAccountDetails[];
export interface UnusedAccessFindingsStatistics {
  unusedAccessTypeStatistics?: UnusedAccessTypeStatistics[];
  topAccounts?: FindingAggregationAccountDetails[];
  totalActiveFindings?: number;
  totalArchivedFindings?: number;
  totalResolvedFindings?: number;
}
export type FindingsStatistics =
  | {
      externalAccessFindingsStatistics: ExternalAccessFindingsStatistics;
      internalAccessFindingsStatistics?: never;
      unusedAccessFindingsStatistics?: never;
    }
  | {
      externalAccessFindingsStatistics?: never;
      internalAccessFindingsStatistics: InternalAccessFindingsStatistics;
      unusedAccessFindingsStatistics?: never;
    }
  | {
      externalAccessFindingsStatistics?: never;
      internalAccessFindingsStatistics?: never;
      unusedAccessFindingsStatistics: UnusedAccessFindingsStatistics;
    };
export type FindingsStatisticsList = FindingsStatistics[];
export interface GetFindingsStatisticsResponse {
  findingsStatistics?: FindingsStatistics[];
  lastUpdatedAt?: Date;
}
export interface GetFindingV2Request {
  analyzerArn: string;
  id: string;
  maxResults?: number;
  nextToken?: string;
}
export type InternalAccessType = string;
export type PrincipalType = string;
export type ServiceControlPolicyRestriction = string;
export interface InternalAccessDetails {
  action?: string[];
  condition?: { [key: string]: string | undefined };
  principal?: { [key: string]: string | undefined };
  principalOwnerAccount?: string;
  accessType?: string;
  principalType?: string;
  sources?: FindingSource[];
  resourceControlPolicyRestriction?: string;
  serviceControlPolicyRestriction?: string;
}
export interface ExternalAccessDetails {
  action?: string[];
  condition: { [key: string]: string | undefined };
  isPublic?: boolean;
  principal?: { [key: string]: string | undefined };
  sources?: FindingSource[];
  resourceControlPolicyRestriction?: string;
}
export interface UnusedAction {
  action: string;
  lastAccessed?: Date;
}
export type UnusedActionList = UnusedAction[];
export interface UnusedPermissionDetails {
  actions?: UnusedAction[];
  serviceNamespace: string;
  lastAccessed?: Date;
}
export interface UnusedIamUserAccessKeyDetails {
  accessKeyId: string;
  lastAccessed?: Date;
}
export interface UnusedIamRoleDetails {
  lastAccessed?: Date;
}
export interface UnusedIamUserPasswordDetails {
  lastAccessed?: Date;
}
export type FindingDetails =
  | {
      internalAccessDetails: InternalAccessDetails;
      externalAccessDetails?: never;
      unusedPermissionDetails?: never;
      unusedIamUserAccessKeyDetails?: never;
      unusedIamRoleDetails?: never;
      unusedIamUserPasswordDetails?: never;
    }
  | {
      internalAccessDetails?: never;
      externalAccessDetails: ExternalAccessDetails;
      unusedPermissionDetails?: never;
      unusedIamUserAccessKeyDetails?: never;
      unusedIamRoleDetails?: never;
      unusedIamUserPasswordDetails?: never;
    }
  | {
      internalAccessDetails?: never;
      externalAccessDetails?: never;
      unusedPermissionDetails: UnusedPermissionDetails;
      unusedIamUserAccessKeyDetails?: never;
      unusedIamRoleDetails?: never;
      unusedIamUserPasswordDetails?: never;
    }
  | {
      internalAccessDetails?: never;
      externalAccessDetails?: never;
      unusedPermissionDetails?: never;
      unusedIamUserAccessKeyDetails: UnusedIamUserAccessKeyDetails;
      unusedIamRoleDetails?: never;
      unusedIamUserPasswordDetails?: never;
    }
  | {
      internalAccessDetails?: never;
      externalAccessDetails?: never;
      unusedPermissionDetails?: never;
      unusedIamUserAccessKeyDetails?: never;
      unusedIamRoleDetails: UnusedIamRoleDetails;
      unusedIamUserPasswordDetails?: never;
    }
  | {
      internalAccessDetails?: never;
      externalAccessDetails?: never;
      unusedPermissionDetails?: never;
      unusedIamUserAccessKeyDetails?: never;
      unusedIamRoleDetails?: never;
      unusedIamUserPasswordDetails: UnusedIamUserPasswordDetails;
    };
export type FindingDetailsList = FindingDetails[];
export type FindingType = string;
export interface GetFindingV2Response {
  analyzedAt: Date;
  createdAt: Date;
  error?: string;
  id: string;
  nextToken?: string;
  resource?: string;
  resourceType: string;
  resourceOwnerAccount: string;
  status: string;
  updatedAt: Date;
  findingDetails: FindingDetails[];
  findingType?: string;
}
export interface GetGeneratedPolicyRequest {
  jobId: string;
  includeResourcePlaceholders?: boolean;
  includeServiceLevelTemplate?: boolean;
}
export type JobStatus = string;
export type JobErrorCode = string;
export interface JobError {
  code: string;
  message: string;
}
export interface JobDetails {
  jobId: string;
  status: string;
  startedOn: Date;
  completedOn?: Date;
  jobError?: JobError;
}
export type PrincipalArn = string;
export type CloudTrailArn = string;
export type RegionList = string[];
export interface TrailProperties {
  cloudTrailArn: string;
  regions?: string[];
  allRegions?: boolean;
}
export type TrailPropertiesList = TrailProperties[];
export interface CloudTrailProperties {
  trailProperties: TrailProperties[];
  startTime: Date;
  endTime: Date;
}
export interface GeneratedPolicyProperties {
  isComplete?: boolean;
  principalArn: string;
  cloudTrailProperties?: CloudTrailProperties;
}
export interface GeneratedPolicy {
  policy: string;
}
export type GeneratedPolicyList = GeneratedPolicy[];
export interface GeneratedPolicyResult {
  properties: GeneratedPolicyProperties;
  generatedPolicies?: GeneratedPolicy[];
}
export interface GetGeneratedPolicyResponse {
  jobDetails: JobDetails;
  generatedPolicyResult: GeneratedPolicyResult;
}
export interface ListAccessPreviewFindingsRequest {
  accessPreviewId: string;
  analyzerArn: string;
  filter?: { [key: string]: Criterion | undefined };
  nextToken?: string;
  maxResults?: number;
}
export type AccessPreviewFindingId = string;
export type FindingChangeType = string;
export interface AccessPreviewFinding {
  id: string;
  existingFindingId?: string;
  existingFindingStatus?: string;
  principal?: { [key: string]: string | undefined };
  action?: string[];
  condition?: { [key: string]: string | undefined };
  resource?: string;
  isPublic?: boolean;
  resourceType: string;
  createdAt: Date;
  changeType: string;
  status: string;
  resourceOwnerAccount: string;
  error?: string;
  sources?: FindingSource[];
  resourceControlPolicyRestriction?: string;
}
export type AccessPreviewFindingsList = AccessPreviewFinding[];
export interface ListAccessPreviewFindingsResponse {
  findings: AccessPreviewFinding[];
  nextToken?: string;
}
export interface ListAccessPreviewsRequest {
  analyzerArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AccessPreviewSummary {
  id: string;
  analyzerArn: string;
  createdAt: Date;
  status: string;
  statusReason?: AccessPreviewStatusReason;
}
export type AccessPreviewsList = AccessPreviewSummary[];
export interface ListAccessPreviewsResponse {
  accessPreviews: AccessPreviewSummary[];
  nextToken?: string;
}
export interface ListAnalyzedResourcesRequest {
  analyzerArn: string;
  resourceType?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AnalyzedResourceSummary {
  resourceArn: string;
  resourceOwnerAccount: string;
  resourceType: string;
}
export type AnalyzedResourcesList = AnalyzedResourceSummary[];
export interface ListAnalyzedResourcesResponse {
  analyzedResources: AnalyzedResourceSummary[];
  nextToken?: string;
}
export interface ListAnalyzersRequest {
  nextToken?: string;
  maxResults?: number;
  type?: string;
}
export type AnalyzersList = AnalyzerSummary[];
export interface ListAnalyzersResponse {
  analyzers: AnalyzerSummary[];
  nextToken?: string;
}
export interface ListArchiveRulesRequest {
  analyzerName: string;
  nextToken?: string;
  maxResults?: number;
}
export type ArchiveRulesList = ArchiveRuleSummary[];
export interface ListArchiveRulesResponse {
  archiveRules: ArchiveRuleSummary[];
  nextToken?: string;
}
export type OrderBy = string;
export interface SortCriteria {
  attributeName?: string;
  orderBy?: string;
}
export interface ListFindingsRequest {
  analyzerArn: string;
  filter?: { [key: string]: Criterion | undefined };
  sort?: SortCriteria;
  nextToken?: string;
  maxResults?: number;
}
export interface FindingSummary {
  id: string;
  principal?: { [key: string]: string | undefined };
  action?: string[];
  resource?: string;
  isPublic?: boolean;
  resourceType: string;
  condition: { [key: string]: string | undefined };
  createdAt: Date;
  analyzedAt: Date;
  updatedAt: Date;
  status: string;
  resourceOwnerAccount: string;
  error?: string;
  sources?: FindingSource[];
  resourceControlPolicyRestriction?: string;
}
export type FindingsList = FindingSummary[];
export interface ListFindingsResponse {
  findings: FindingSummary[];
  nextToken?: string;
}
export interface ListFindingsV2Request {
  analyzerArn: string;
  filter?: { [key: string]: Criterion | undefined };
  maxResults?: number;
  nextToken?: string;
  sort?: SortCriteria;
}
export interface FindingSummaryV2 {
  analyzedAt: Date;
  createdAt: Date;
  error?: string;
  id: string;
  resource?: string;
  resourceType: string;
  resourceOwnerAccount: string;
  status: string;
  updatedAt: Date;
  findingType?: string;
}
export type FindingsListV2 = FindingSummaryV2[];
export interface ListFindingsV2Response {
  findings: FindingSummaryV2[];
  nextToken?: string;
}
export interface ListPolicyGenerationsRequest {
  principalArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface PolicyGeneration {
  jobId: string;
  principalArn: string;
  status: string;
  startedOn: Date;
  completedOn?: Date;
}
export type PolicyGenerationList = PolicyGeneration[];
export interface ListPolicyGenerationsResponse {
  policyGenerations: PolicyGeneration[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PolicyGenerationDetails {
  principalArn: string;
}
export interface Trail {
  cloudTrailArn: string;
  regions?: string[];
  allRegions?: boolean;
}
export type TrailList = Trail[];
export type RoleArn = string;
export interface CloudTrailDetails {
  trails: Trail[];
  accessRole: string;
  startTime: Date;
  endTime?: Date;
}
export interface StartPolicyGenerationRequest {
  policyGenerationDetails: PolicyGenerationDetails;
  cloudTrailDetails?: CloudTrailDetails;
  clientToken?: string;
}
export interface StartPolicyGenerationResponse {
  jobId: string;
}
export interface StartResourceScanRequest {
  analyzerArn: string;
  resourceArn: string;
  resourceOwnerAccount?: string;
}
export interface StartResourceScanResponse {}
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
export interface UpdateAnalyzerRequest {
  analyzerName: string;
  configuration?: AnalyzerConfiguration;
}
export interface UpdateAnalyzerResponse {
  configuration?: AnalyzerConfiguration;
}
export interface UpdateArchiveRuleRequest {
  analyzerName: string;
  ruleName: string;
  filter: { [key: string]: Criterion | undefined };
  clientToken?: string;
}
export interface UpdateArchiveRuleResponse {}
export type FindingStatusUpdate = string;
export type FindingIdList = string[];
export interface UpdateFindingsRequest {
  analyzerArn: string;
  status: string;
  ids?: string[];
  resourceArn?: string;
  clientToken?: string;
}
export interface UpdateFindingsResponse {}
export type Locale = string;
export type PolicyDocument = string;
export type PolicyType = string;
export type ValidatePolicyResourceType = string;
export interface ValidatePolicyRequest {
  locale?: string;
  maxResults?: number;
  nextToken?: string;
  policyDocument: string;
  policyType: string;
  validatePolicyResourceType?: string;
}
export type ValidatePolicyFindingType = string;
export type IssueCode = string;
export type LearnMoreLink = string;
export interface Substring {
  start: number;
  length: number;
}
export type PathElement =
  | { index: number; key?: never; substring?: never; value?: never }
  | { index?: never; key: string; substring?: never; value?: never }
  | { index?: never; key?: never; substring: Substring; value?: never }
  | { index?: never; key?: never; substring?: never; value: string };
export type PathElementList = PathElement[];
export interface Position {
  line: number;
  column: number;
  offset: number;
}
export interface Span {
  start: Position;
  end: Position;
}
export interface Location {
  path: PathElement[];
  span: Span;
}
export type LocationList = Location[];
export interface ValidatePolicyFinding {
  findingDetails: string;
  findingType: string;
  issueCode: string;
  learnMoreLink: string;
  locations: Location[];
}
export type ValidatePolicyFindingList = ValidatePolicyFinding[];
export interface ValidatePolicyResponse {
  findings: ValidatePolicyFinding[];
  nextToken?: string;
}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type ApplyArchiveRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retroactively applies the archive rule to existing findings that meet the archive rule criteria.
 */
export const applyArchiveRule: API.OperationMethod<
  ApplyArchiveRuleRequest,
  ApplyArchiveRuleResponse,
  ApplyArchiveRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /archive-rule",
    input: {
      analyzerArn: 0,
      ruleName: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "ApplyArchiveRule",
})) as any;

export type CancelPolicyGenerationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the requested policy generation.
 */
export const cancelPolicyGeneration: API.OperationMethod<
  CancelPolicyGenerationRequest,
  CancelPolicyGenerationResponse,
  CancelPolicyGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /policy/generation/{jobId}",
    input: { jobId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelPolicyGeneration",
})) as any;

export type CheckAccessNotGrantedError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterException
  | ThrottlingException
  | UnprocessableEntityException
  | ValidationException
  | CommonErrors;
/**
 * Checks whether the specified access isn't allowed by a policy.
 */
export const checkAccessNotGranted: API.OperationMethod<
  CheckAccessNotGrantedRequest,
  CheckAccessNotGrantedResponse,
  CheckAccessNotGrantedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy/check-access-not-granted",
    input: {
      policyDocument: 0,
      access: D.list({ actions: 0, resources: 0 }),
      policyType: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterException,
    ThrottlingException,
    UnprocessableEntityException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckAccessNotGranted",
})) as any;

export type CheckNoNewAccessError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterException
  | ThrottlingException
  | UnprocessableEntityException
  | ValidationException
  | CommonErrors;
/**
 * Checks whether new access is allowed for an updated policy when compared to the existing policy.
 *
 * You can find examples for reference policies and learn how to set up and run a custom policy check for new access in the IAM Access Analyzer custom policy checks samples repository on GitHub. The reference policies in this repository are meant to be passed to the `existingPolicyDocument` request parameter.
 */
export const checkNoNewAccess: API.OperationMethod<
  CheckNoNewAccessRequest,
  CheckNoNewAccessResponse,
  CheckNoNewAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy/check-no-new-access",
    input: { newPolicyDocument: 0, existingPolicyDocument: 0, policyType: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterException,
    ThrottlingException,
    UnprocessableEntityException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckNoNewAccess",
})) as any;

export type CheckNoPublicAccessError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterException
  | ThrottlingException
  | UnprocessableEntityException
  | ValidationException
  | CommonErrors;
/**
 * Checks whether a resource policy can grant public access to the specified resource type.
 */
export const checkNoPublicAccess: API.OperationMethod<
  CheckNoPublicAccessRequest,
  CheckNoPublicAccessResponse,
  CheckNoPublicAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy/check-no-public-access",
    input: { policyDocument: 0, resourceType: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterException,
    ThrottlingException,
    UnprocessableEntityException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckNoPublicAccess",
})) as any;

export type CreateAccessPreviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an access preview that allows you to preview IAM Access Analyzer findings for your resource before deploying resource permissions.
 */
export const createAccessPreview: API.OperationMethod<
  CreateAccessPreviewRequest,
  CreateAccessPreviewResponse,
  CreateAccessPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /access-preview",
    input: {
      analyzerArn: 0,
      configurations: D.map({
        ebsSnapshot: { userIds: 0, groups: 0, kmsKeyId: 0 },
        ecrRepository: { repositoryPolicy: 0 },
        iamRole: { trustPolicy: 0 },
        efsFileSystem: { fileSystemPolicy: 0 },
        kmsKey: {
          keyPolicies: 0,
          grants: D.list({
            operations: 0,
            granteePrincipal: 0,
            retiringPrincipal: 0,
            constraints: {
              encryptionContextEquals: 0,
              encryptionContextSubset: 0,
            },
            issuingAccount: 0,
          }),
        },
        rdsDbClusterSnapshot: {
          attributes: D.map({ accountIds: 0 }),
          kmsKeyId: 0,
        },
        rdsDbSnapshot: { attributes: D.map({ accountIds: 0 }), kmsKeyId: 0 },
        secretsManagerSecret: { kmsKeyId: 0, secretPolicy: 0 },
        s3Bucket: {
          bucketPolicy: 0,
          bucketAclGrants: D.list({
            permission: 0,
            grantee: { id: 0, uri: 0 },
          }),
          bucketPublicAccessBlock: i_S3PublicAccessBlockConfiguration,
          accessPoints: D.map({
            accessPointPolicy: 0,
            publicAccessBlock: i_S3PublicAccessBlockConfiguration,
            networkOrigin: i_NetworkOriginConfiguration,
          }),
        },
        snsTopic: { topicPolicy: 0 },
        sqsQueue: { queuePolicy: 0 },
        s3ExpressDirectoryBucket: {
          bucketPolicy: 0,
          accessPoints: D.map({
            accessPointPolicy: 0,
            networkOrigin: i_NetworkOriginConfiguration,
          }),
        },
        dynamodbStream: { streamPolicy: 0 },
        dynamodbTable: { tablePolicy: 0 },
      }),
      clientToken: D.m({ idempotency: true }),
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
  operationName: "CreateAccessPreview",
})) as any;

export type CreateAnalyzerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an analyzer for your account.
 */
export const createAnalyzer: API.OperationMethod<
  CreateAnalyzerRequest,
  CreateAnalyzerResponse,
  CreateAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /analyzer",
    input: {
      analyzerName: 0,
      type: 0,
      archiveRules: D.list(i_InlineArchiveRule),
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      configuration: i_AnalyzerConfiguration,
    },
    body: true,
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
  operationName: "CreateAnalyzer",
})) as any;

export type CreateArchiveRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an archive rule for the specified analyzer. Archive rules automatically archive new findings that meet the criteria you define when you create the rule.
 *
 * To learn about filter keys that you can use to create an archive rule, see IAM Access Analyzer filter keys in the **IAM User Guide**.
 */
export const createArchiveRule: API.OperationMethod<
  CreateArchiveRuleRequest,
  CreateArchiveRuleResponse,
  CreateArchiveRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /analyzer/{analyzerName}/archive-rule",
    input: {
      analyzerName: 0,
      ruleName: 0,
      filter: D.map(i_Criterion),
      clientToken: D.m({ idempotency: true }),
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
  operationName: "CreateArchiveRule",
})) as any;

export type CreateServiceLinkedAnalyzerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service-linked analyzer managed by an Amazon Web Services service. This operation can only be invoked by authorized Amazon Web Services services. Direct customer invocation returns `AccessDeniedException`.
 *
 * Service-linked analyzers enable Amazon Web Services services to create and manage analyzers on behalf of customers. The lifecycle of these analyzers is managed by the calling service.
 */
export const createServiceLinkedAnalyzer: API.OperationMethod<
  CreateServiceLinkedAnalyzerRequest,
  CreateServiceLinkedAnalyzerResponse,
  CreateServiceLinkedAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /service-linked-analyzer",
    input: {
      type: 0,
      archiveRules: D.list(i_InlineArchiveRule),
      clientToken: D.m({ idempotency: true }),
      configuration: i_AnalyzerConfiguration,
    },
    body: true,
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
  operationName: "CreateServiceLinkedAnalyzer",
})) as any;

export type DeleteAnalyzerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified analyzer. When you delete an analyzer, IAM Access Analyzer is disabled for the account or organization in the current or specific Region. All findings that were generated by the analyzer are deleted. You cannot undo this action.
 */
export const deleteAnalyzer: API.OperationMethod<
  DeleteAnalyzerRequest,
  DeleteAnalyzerResponse,
  DeleteAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /analyzer/{analyzerName}",
    input: {
      analyzerName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
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
  operationName: "DeleteAnalyzer",
})) as any;

export type DeleteArchiveRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified archive rule.
 */
export const deleteArchiveRule: API.OperationMethod<
  DeleteArchiveRuleRequest,
  DeleteArchiveRuleResponse,
  DeleteArchiveRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /analyzer/{analyzerName}/archive-rule/{ruleName}",
    input: {
      analyzerName: 0,
      ruleName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
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
  operationName: "DeleteArchiveRule",
})) as any;

export type DeleteServiceLinkedAnalyzerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a service-linked analyzer. This operation can be invoked by both authorized Amazon Web Services services and customers.
 *
 * When invoked by a customer, IAM Access Analyzer performs a callback to the managing service to verify whether the analyzer is still in use and can be deleted. If the service indicates the analyzer is still in use, the deletion is rejected with `ConflictException`.
 */
export const deleteServiceLinkedAnalyzer: API.OperationMethod<
  DeleteServiceLinkedAnalyzerRequest,
  DeleteServiceLinkedAnalyzerResponse,
  DeleteServiceLinkedAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /service-linked-analyzer/{analyzerName}",
    input: {
      analyzerName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
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
  operationName: "DeleteServiceLinkedAnalyzer",
})) as any;

export type GenerateFindingRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a recommendation for an unused permissions finding.
 */
export const generateFindingRecommendation: API.OperationMethod<
  GenerateFindingRecommendationRequest,
  GenerateFindingRecommendationResponse,
  GenerateFindingRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /recommendation/{id}",
    input: { analyzerArn: D.m({ query: "analyzerArn" }), id: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateFindingRecommendation",
})) as any;

export type GetAccessPreviewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an access preview for the specified analyzer.
 */
export const getAccessPreview: API.OperationMethod<
  GetAccessPreviewRequest,
  GetAccessPreviewResponse,
  GetAccessPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-preview/{accessPreviewId}",
    input: { accessPreviewId: 0, analyzerArn: D.m({ query: "analyzerArn" }) },
    output: { accessPreview: { createdAt: D.ts } },
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
  operationName: "GetAccessPreview",
})) as any;

export type GetAnalyzedResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a resource that was analyzed.
 *
 * This action is supported only for external access analyzers.
 */
export const getAnalyzedResource: API.OperationMethod<
  GetAnalyzedResourceRequest,
  GetAnalyzedResourceResponse,
  GetAnalyzedResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /analyzed-resource",
    input: {
      analyzerArn: D.m({ query: "analyzerArn" }),
      resourceArn: D.m({ query: "resourceArn" }),
    },
    output: {
      resource: { createdAt: D.ts, analyzedAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetAnalyzedResource",
})) as any;

export type GetAnalyzerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified analyzer.
 */
export const getAnalyzer: API.OperationMethod<
  GetAnalyzerRequest,
  GetAnalyzerResponse,
  GetAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /analyzer/{analyzerName}",
    input: { analyzerName: 0 },
    output: { analyzer: o_AnalyzerSummary },
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
  operationName: "GetAnalyzer",
})) as any;

export type GetArchiveRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an archive rule.
 *
 * To learn about filter keys that you can use to create an archive rule, see IAM Access Analyzer filter keys in the **IAM User Guide**.
 */
export const getArchiveRule: API.OperationMethod<
  GetArchiveRuleRequest,
  GetArchiveRuleResponse,
  GetArchiveRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /analyzer/{analyzerName}/archive-rule/{ruleName}",
    input: { analyzerName: 0, ruleName: 0 },
    output: { archiveRule: o_ArchiveRuleSummary },
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
  operationName: "GetArchiveRule",
})) as any;

export type GetFindingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified finding. GetFinding and GetFindingV2 both use `access-analyzer:GetFinding` in the `Action` element of an IAM policy statement. You must have permission to perform the `access-analyzer:GetFinding` action.
 *
 * GetFinding is supported only for external access analyzers. You must use GetFindingV2 for internal and unused access analyzers.
 */
export const getFinding: API.OperationMethod<
  GetFindingRequest,
  GetFindingResponse,
  GetFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /finding/{id}",
    input: { analyzerArn: D.m({ query: "analyzerArn" }), id: 0 },
    output: { finding: { createdAt: D.ts, analyzedAt: D.ts, updatedAt: D.ts } },
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
  operationName: "GetFinding",
})) as any;

export type GetFindingRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a finding recommendation for the specified analyzer.
 */
export const getFindingRecommendation: API.PaginatedOperationMethod<
  GetFindingRecommendationRequest,
  GetFindingRecommendationResponse,
  GetFindingRecommendationError,
  Credentials | HttpClient.HttpClient,
  RecommendedStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /recommendation/{id}",
    input: {
      analyzerArn: D.m({ query: "analyzerArn" }),
      id: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      startedAt: D.ts,
      completedAt: D.ts,
      recommendedSteps: D.list({
        unusedPermissionsRecommendedStep: { policyUpdatedAt: D.ts },
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
  operationName: "GetFindingRecommendation",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendedSteps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetFindingsStatisticsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of aggregated finding statistics for an external access or unused access analyzer.
 */
export const getFindingsStatistics: API.OperationMethod<
  GetFindingsStatisticsRequest,
  GetFindingsStatisticsResponse,
  GetFindingsStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /analyzer/findings/statistics",
    input: { analyzerArn: 0 },
    output: { lastUpdatedAt: D.ts },
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
  operationName: "GetFindingsStatistics",
})) as any;

export type GetFindingV2Error =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified finding. GetFinding and GetFindingV2 both use `access-analyzer:GetFinding` in the `Action` element of an IAM policy statement. You must have permission to perform the `access-analyzer:GetFinding` action.
 */
export const getFindingV2: API.PaginatedOperationMethod<
  GetFindingV2Request,
  GetFindingV2Response,
  GetFindingV2Error,
  Credentials | HttpClient.HttpClient,
  FindingDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /findingv2/{id}",
    input: {
      analyzerArn: D.m({ query: "analyzerArn" }),
      id: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      analyzedAt: D.ts,
      createdAt: D.ts,
      updatedAt: D.ts,
      findingDetails: D.list({
        unusedPermissionDetails: {
          actions: D.list({ lastAccessed: D.ts }),
          lastAccessed: D.ts,
        },
        unusedIamUserAccessKeyDetails: { lastAccessed: D.ts },
        unusedIamRoleDetails: { lastAccessed: D.ts },
        unusedIamUserPasswordDetails: { lastAccessed: D.ts },
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
  operationName: "GetFindingV2",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetGeneratedPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the policy that was generated using `StartPolicyGeneration`.
 */
export const getGeneratedPolicy: API.OperationMethod<
  GetGeneratedPolicyRequest,
  GetGeneratedPolicyResponse,
  GetGeneratedPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy/generation/{jobId}",
    input: {
      jobId: 0,
      includeResourcePlaceholders: D.m({
        query: "includeResourcePlaceholders",
      }),
      includeServiceLevelTemplate: D.m({
        query: "includeServiceLevelTemplate",
      }),
    },
    output: {
      jobDetails: { startedOn: D.ts, completedOn: D.ts },
      generatedPolicyResult: {
        properties: {
          cloudTrailProperties: { startTime: D.ts, endTime: D.ts },
        },
      },
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
  operationName: "GetGeneratedPolicy",
})) as any;

export type ListAccessPreviewFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of access preview findings generated by the specified access preview.
 */
export const listAccessPreviewFindings: API.PaginatedOperationMethod<
  ListAccessPreviewFindingsRequest,
  ListAccessPreviewFindingsResponse,
  ListAccessPreviewFindingsError,
  Credentials | HttpClient.HttpClient,
  AccessPreviewFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /access-preview/{accessPreviewId}",
    input: {
      accessPreviewId: 0,
      analyzerArn: 0,
      filter: D.map(i_Criterion),
      nextToken: 0,
      maxResults: 0,
    },
    output: { findings: D.list({ createdAt: D.ts }) },
    body: true,
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
  operationName: "ListAccessPreviewFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccessPreviewsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of access previews for the specified analyzer.
 */
export const listAccessPreviews: API.PaginatedOperationMethod<
  ListAccessPreviewsRequest,
  ListAccessPreviewsResponse,
  ListAccessPreviewsError,
  Credentials | HttpClient.HttpClient,
  AccessPreviewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-preview",
    input: {
      analyzerArn: D.m({ query: "analyzerArn" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { accessPreviews: D.list({ createdAt: D.ts }) },
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
  operationName: "ListAccessPreviews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessPreviews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnalyzedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of resources of the specified type that have been analyzed by the specified analyzer.
 */
export const listAnalyzedResources: API.PaginatedOperationMethod<
  ListAnalyzedResourcesRequest,
  ListAnalyzedResourcesResponse,
  ListAnalyzedResourcesError,
  Credentials | HttpClient.HttpClient,
  AnalyzedResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /analyzed-resource",
    input: { analyzerArn: 0, resourceType: 0, nextToken: 0, maxResults: 0 },
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
  operationName: "ListAnalyzedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "analyzedResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnalyzersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of analyzers.
 */
export const listAnalyzers: API.PaginatedOperationMethod<
  ListAnalyzersRequest,
  ListAnalyzersResponse,
  ListAnalyzersError,
  Credentials | HttpClient.HttpClient,
  AnalyzerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /analyzer",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      type: D.m({ query: "type" }),
    },
    output: { analyzers: D.list(o_AnalyzerSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalyzers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "analyzers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListArchiveRulesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of archive rules created for the specified analyzer.
 */
export const listArchiveRules: API.PaginatedOperationMethod<
  ListArchiveRulesRequest,
  ListArchiveRulesResponse,
  ListArchiveRulesError,
  Credentials | HttpClient.HttpClient,
  ArchiveRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /analyzer/{analyzerName}/archive-rule",
    input: {
      analyzerName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { archiveRules: D.list(o_ArchiveRuleSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchiveRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "archiveRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of findings generated by the specified analyzer. ListFindings and ListFindingsV2 both use `access-analyzer:ListFindings` in the `Action` element of an IAM policy statement. You must have permission to perform the `access-analyzer:ListFindings` action.
 *
 * To learn about filter keys that you can use to retrieve a list of findings, see IAM Access Analyzer filter keys in the **IAM User Guide**.
 *
 * ListFindings is supported only for external access analyzers. You must use ListFindingsV2 for internal and unused access analyzers.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /finding",
    input: {
      analyzerArn: 0,
      filter: D.map(i_Criterion),
      sort: i_SortCriteria,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      findings: D.list({ createdAt: D.ts, analyzedAt: D.ts, updatedAt: D.ts }),
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
  operationName: "ListFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsV2Error =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of findings generated by the specified analyzer. ListFindings and ListFindingsV2 both use `access-analyzer:ListFindings` in the `Action` element of an IAM policy statement. You must have permission to perform the `access-analyzer:ListFindings` action.
 *
 * To learn about filter keys that you can use to retrieve a list of findings, see IAM Access Analyzer filter keys in the **IAM User Guide**.
 */
export const listFindingsV2: API.PaginatedOperationMethod<
  ListFindingsV2Request,
  ListFindingsV2Response,
  ListFindingsV2Error,
  Credentials | HttpClient.HttpClient,
  FindingSummaryV2
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /findingv2",
    input: {
      analyzerArn: 0,
      filter: D.map(i_Criterion),
      maxResults: 0,
      nextToken: 0,
      sort: i_SortCriteria,
    },
    output: {
      findings: D.list({ analyzedAt: D.ts, createdAt: D.ts, updatedAt: D.ts }),
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
  operationName: "ListFindingsV2",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGenerationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the policy generations requested in the last seven days.
 */
export const listPolicyGenerations: API.PaginatedOperationMethod<
  ListPolicyGenerationsRequest,
  ListPolicyGenerationsResponse,
  ListPolicyGenerationsError,
  Credentials | HttpClient.HttpClient,
  PolicyGeneration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy/generation",
    input: {
      principalArn: D.m({ query: "principalArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      policyGenerations: D.list({ startedOn: D.ts, completedOn: D.ts }),
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
  operationName: "ListPolicyGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyGenerations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of tags applied to the specified resource.
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
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartPolicyGenerationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the policy generation request.
 */
export const startPolicyGeneration: API.OperationMethod<
  StartPolicyGenerationRequest,
  StartPolicyGenerationResponse,
  StartPolicyGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /policy/generation",
    input: {
      policyGenerationDetails: { principalArn: 0 },
      cloudTrailDetails: {
        trails: D.list({ cloudTrailArn: 0, regions: 0, allRegions: 0 }),
        accessRole: 0,
        startTime: D.tsAs("date-time"),
        endTime: D.tsAs("date-time"),
      },
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
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
  operationName: "StartPolicyGeneration",
})) as any;

export type StartResourceScanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Immediately starts a scan of the policies applied to the specified resource.
 *
 * This action is supported only for external access analyzers.
 */
export const startResourceScan: API.OperationMethod<
  StartResourceScanRequest,
  StartResourceScanResponse,
  StartResourceScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /resource/scan",
    input: { analyzerArn: 0, resourceArn: 0, resourceOwnerAccount: 0 },
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
  operationName: "StartResourceScan",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to the specified resource.
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
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from the specified resource.
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
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAnalyzerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the configuration of an existing analyzer.
 *
 * This action is not supported for external access analyzers.
 */
export const updateAnalyzer: API.OperationMethod<
  UpdateAnalyzerRequest,
  UpdateAnalyzerResponse,
  UpdateAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /analyzer/{analyzerName}",
    input: { analyzerName: 0, configuration: i_AnalyzerConfiguration },
    body: true,
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
  operationName: "UpdateAnalyzer",
})) as any;

export type UpdateArchiveRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the criteria and values for the specified archive rule.
 */
export const updateArchiveRule: API.OperationMethod<
  UpdateArchiveRuleRequest,
  UpdateArchiveRuleResponse,
  UpdateArchiveRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /analyzer/{analyzerName}/archive-rule/{ruleName}",
    input: {
      analyzerName: 0,
      ruleName: 0,
      filter: D.map(i_Criterion),
      clientToken: D.m({ idempotency: true }),
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
  operationName: "UpdateArchiveRule",
})) as any;

export type UpdateFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status for the specified findings.
 */
export const updateFindings: API.OperationMethod<
  UpdateFindingsRequest,
  UpdateFindingsResponse,
  UpdateFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /finding",
    input: {
      analyzerArn: 0,
      status: 0,
      ids: 0,
      resourceArn: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "UpdateFindings",
})) as any;

export type ValidatePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Requests the validation of a policy and returns a list of findings. The findings help you identify issues and provide actionable recommendations to resolve the issue and enable you to author functional policies that meet security best practices.
 */
export const validatePolicy: API.PaginatedOperationMethod<
  ValidatePolicyRequest,
  ValidatePolicyResponse,
  ValidatePolicyError,
  Credentials | HttpClient.HttpClient,
  ValidatePolicyFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy/validation",
    input: {
      locale: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      policyDocument: 0,
      policyType: 0,
      validatePolicyResourceType: 0,
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
  operationName: "ValidatePolicy",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

const i_AnalyzerConfiguration: D.LazyStruct = () => ({
  unusedAccess: {
    unusedAccessAge: 0,
    analysisRule: { exclusions: D.list({ accountIds: 0, resourceTags: 0 }) },
  },
  internalAccess: {
    analysisRule: {
      inclusions: D.list({ accountIds: 0, resourceTypes: 0, resourceArns: 0 }),
    },
  },
});
const i_Criterion: D.LazyStruct = () => ({
  eq: 0,
  neq: 0,
  contains: 0,
  exists: 0,
});
const i_InlineArchiveRule: D.LazyStruct = () => ({
  ruleName: 0,
  filter: D.map(i_Criterion),
});
const i_NetworkOriginConfiguration: D.LazyStruct = () => ({
  vpcConfiguration: { vpcId: 0 },
  internetConfiguration: {},
});
const i_S3PublicAccessBlockConfiguration: D.LazyStruct = () => ({
  ignorePublicAcls: 0,
  restrictPublicBuckets: 0,
});
const i_SortCriteria: D.LazyStruct = () => ({ attributeName: 0, orderBy: 0 });
const o_AnalyzerSummary: D.LazyStruct = () => ({
  createdAt: D.ts,
  lastResourceAnalyzedAt: D.ts,
});
const o_ArchiveRuleSummary: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
