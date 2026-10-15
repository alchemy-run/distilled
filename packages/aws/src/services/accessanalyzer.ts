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
  sdkId: "AccessAnalyzer",
  serviceShapeName: "AccessAnalyzer",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "access-analyzer" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-11-01");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://access-analyzer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://access-analyzer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://access-analyzer.{R}.{D}","properties":{},"headers":{}}');

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
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(422), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: S.String,
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1697, __c53, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  attributes?: { [key: string]: RdsDbClusterSnapshotAttributeValue | undefined };
  kmsKeyId?: string;
}
export type RdsDbSnapshotAttributeName = string;
export type RdsDbSnapshotAccountId = string;
export type RdsDbSnapshotAccountIdsList = string[];
export type RdsDbSnapshotAttributeValue = { accountIds: string[] };
export type RdsDbSnapshotAttributesMap = { [key: string]: RdsDbSnapshotAttributeValue | undefined };
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
export type AclGrantee = { id: string; uri?: never } | { id?: never; uri: string };
export interface S3BucketAclGrantConfiguration {
  permission: string;
  grantee: AclGrantee;
}
export type S3BucketAclGrantConfigurationsList = S3BucketAclGrantConfiguration[];
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
  accessPoints?: { [key: string]: S3ExpressDirectoryAccessPointConfiguration | undefined };
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
export type InternalAccessAnalysisRuleCriteriaList = InternalAccessAnalysisRuleCriteria[];
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
export type ResourceTypeStatisticsMap = { [key: string]: ResourceTypeDetails | undefined };
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
  resourceTypeStatistics?: { [key: string]: InternalAccessResourceTypeDetails | undefined };
  totalActiveFindings?: number;
  totalArchivedFindings?: number;
  totalResolvedFindings?: number;
}
export interface UnusedAccessTypeStatistics {
  unusedAccessType?: string;
  total?: number;
}
export type UnusedAccessTypeStatisticsList = UnusedAccessTypeStatistics[];
export type FindingAggregationAccountDetailsMap = { [key: string]: number | undefined };
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
  input: __S(1728, __c54, 0) as any as S.Schema<ApplyArchiveRuleRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<ApplyArchiveRuleResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CancelPolicyGenerationRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<CancelPolicyGenerationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelPolicyGeneration",
}));

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
  input: __S(34, __c1, 2) as any as S.Schema<CheckAccessNotGrantedRequest>,
  output: __S(66, __c2, 2) as any as S.Schema<CheckAccessNotGrantedResponse>,
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
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<CheckNoNewAccessRequest>,
  output: __S(66, __c2, 2) as any as S.Schema<CheckNoNewAccessResponse>,
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
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<CheckNoPublicAccessRequest>,
  output: __S(66, __c2, 2) as any as S.Schema<CheckNoPublicAccessResponse>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<CreateAccessPreviewRequest>,
  output: __S(193, __c6, 1) as any as S.Schema<CreateAccessPreviewResponse>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<CreateAnalyzerRequest>,
  output: __S(354, __c11, 2) as any as S.Schema<CreateAnalyzerResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<CreateArchiveRuleRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<CreateArchiveRuleResponse>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<CreateServiceLinkedAnalyzerRequest>,
  output: __S(354, __c11, 2) as any as S.Schema<CreateServiceLinkedAnalyzerResponse>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<DeleteAnalyzerRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeleteAnalyzerResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteArchiveRuleRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeleteArchiveRuleResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DeleteServiceLinkedAnalyzerRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeleteServiceLinkedAnalyzerResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<GenerateFindingRecommendationRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<GenerateFindingRecommendationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateFindingRecommendation",
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<GetAccessPreviewRequest>,
  output: __S(610, __c19, 2) as any as S.Schema<GetAccessPreviewResponse>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<GetAnalyzedResourceRequest>,
  output: __S(674, __c21, 2) as any as S.Schema<GetAnalyzedResourceResponse>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<GetAnalyzerRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<GetAnalyzerResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<GetArchiveRuleRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<GetArchiveRuleResponse>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<GetFindingRequest>,
  output: __S(833, __c26, 1) as any as S.Schema<GetFindingResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<GetFindingRecommendationRequest>,
  output: __S(932, __c29, 4) as any as S.Schema<GetFindingRecommendationResponse>,
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
  input: __S(992, __c31, 0) as any as S.Schema<GetFindingsStatisticsRequest>,
  output: __S(1007, __c31, 15) as any as S.Schema<GetFindingsStatisticsResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<GetFindingV2Request>,
  output: __S(1034, __c32, 10) as any as S.Schema<GetFindingV2Response>,
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
  input: __S(1056, __c33, 0) as any as S.Schema<GetGeneratedPolicyRequest>,
  output: __S(1063, __c33, 7) as any as S.Schema<GetGeneratedPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeneratedPolicy",
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<ListAccessPreviewFindingsRequest>,
  output: __S(1123, __c35, 3) as any as S.Schema<ListAccessPreviewFindingsResponse>,
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
  input: __S(1152, __c36, 0) as any as S.Schema<ListAccessPreviewsRequest>,
  output: __S(1155, __c36, 3) as any as S.Schema<ListAccessPreviewsResponse>,
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
  input: __S(1184, __c37, 0) as any as S.Schema<ListAnalyzedResourcesRequest>,
  output: __S(1187, __c37, 3) as any as S.Schema<ListAnalyzedResourcesResponse>,
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
  input: __S(1216, __c38, 0) as any as S.Schema<ListAnalyzersRequest>,
  output: __S(1218, __c38, 2) as any as S.Schema<ListAnalyzersResponse>,
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
  input: __S(1248, __c39, 0) as any as S.Schema<ListArchiveRulesRequest>,
  output: __S(1250, __c39, 2) as any as S.Schema<ListArchiveRulesResponse>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<ListFindingsRequest>,
  output: __S(1282, __c40, 2) as any as S.Schema<ListFindingsResponse>,
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
  input: __S(1344, __c42, 0) as any as S.Schema<ListFindingsV2Request>,
  output: __S(1347, __c42, 3) as any as S.Schema<ListFindingsV2Response>,
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
  input: __S(1376, __c43, 0) as any as S.Schema<ListPolicyGenerationsRequest>,
  output: __S(1379, __c43, 3) as any as S.Schema<ListPolicyGenerationsResponse>,
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
  input: __S(1408, __c44, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1409, __c44, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(1442, __c45, 2) as any as S.Schema<StartPolicyGenerationRequest>,
  output: __S(1443, __c45, 3) as any as S.Schema<StartPolicyGenerationResponse>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<StartResourceScanRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<StartResourceScanResponse>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<UpdateAnalyzerRequest>,
  output: __S(1569, __c49, 1) as any as S.Schema<UpdateAnalyzerResponse>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<UpdateArchiveRuleRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<UpdateArchiveRuleResponse>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<UpdateFindingsRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<UpdateFindingsResponse>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<ValidatePolicyRequest>,
  output: __S(1674, __c52, 10) as any as S.Schema<ValidatePolicyResponse>,
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

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/policy/generation/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelPolicyGenerationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actions: S.optional(__S(96, __c3, 0)),
          resources: S.optional(__S(96, __c3, 0)),
        }),
      ).annotate({ identifier: "Access" });
    case 1:
      return S.Array(__S(32, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          policyDocument: SensitiveString,
          access: __S(33, __c1, 1),
          policyType: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policy/check-access-not-granted" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CheckAccessNotGrantedRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          statementIndex: S.optional(S.Number),
          statementId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReasonSummary" });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          result: S.optional(S.String),
          message: S.optional(S.String),
          reasons: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "CheckAccessNotGrantedResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          newPolicyDocument: SensitiveString,
          existingPolicyDocument: SensitiveString,
          policyType: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policy/check-no-new-access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CheckNoNewAccessRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyDocument: SensitiveString, resourceType: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policy/check-no-public-access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CheckNoPublicAccessRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String,
          configurations: __S(285, __c8, 29),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/access-preview" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAccessPreviewRequest" });
    case 1:
      return S.suspend(() => S.Struct({ id: S.String })).annotate({
        identifier: "CreateAccessPreviewResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userIds: S.optional(__S(96, __c3, 0)),
          groups: S.optional(__S(96, __c3, 0)),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EbsSnapshotConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ repositoryPolicy: S.optional(S.String) })).annotate({
        identifier: "EcrRepositoryConfiguration",
      });
    case 2:
      return S.suspend(() => S.Struct({ trustPolicy: S.optional(S.String) })).annotate({
        identifier: "IamRoleConfiguration",
      });
    case 3:
      return S.suspend(() => S.Struct({ fileSystemPolicy: S.optional(S.String) })).annotate({
        identifier: "EfsFileSystemConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          encryptionContextEquals: S.optional(__S(224, __c7, 0)),
          encryptionContextSubset: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "KmsGrantConstraints" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          operations: __S(96, __c3, 0),
          granteePrincipal: S.String,
          retiringPrincipal: S.optional(S.String),
          constraints: S.optional(__S(260, __c8, 4)),
          issuingAccount: S.String,
        }),
      ).annotate({ identifier: "KmsGrantConfiguration" });
    case 6:
      return S.Array(__S(261, __c8, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          keyPolicies: S.optional(__S(224, __c7, 0)),
          grants: S.optional(__S(262, __c8, 6)),
        }),
      ).annotate({ identifier: "KmsKeyConfiguration" });
    case 8:
      return S.Union([/*@__PURE__*/ S.Struct({ accountIds: __S(96, __c3, 0) })]);
    case 9:
      return S.Record(S.String, /*@__PURE__*/ __S(264, __c8, 8).pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({ attributes: S.optional(__S(265, __c8, 9)), kmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "RdsDbClusterSnapshotConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({ kmsKeyId: S.optional(S.String), secretPolicy: S.optional(S.String) }),
      ).annotate({ identifier: "SecretsManagerSecretConfiguration" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ id: S.String }),
        /*@__PURE__*/ S.Struct({ uri: S.String }),
      ]);
    case 13:
      return S.suspend(() =>
        S.Struct({ permission: S.String, grantee: __S(268, __c8, 12) }),
      ).annotate({ identifier: "S3BucketAclGrantConfiguration" });
    case 14:
      return S.Array(__S(269, __c8, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({ ignorePublicAcls: S.Boolean, restrictPublicBuckets: S.Boolean }),
      ).annotate({ identifier: "S3PublicAccessBlockConfiguration" });
    case 16:
      return S.suspend(() => S.Struct({ vpcId: S.String })).annotate({
        identifier: "VpcConfiguration",
      });
    case 17:
      return S.Union([
        /*@__PURE__*/ S.Struct({ vpcConfiguration: __S(272, __c8, 16) }),
        /*@__PURE__*/ S.Struct({ internetConfiguration: __S(1760, __c55, 0) }),
      ]);
    case 18:
      return S.suspend(() =>
        S.Struct({
          accessPointPolicy: S.optional(S.String),
          publicAccessBlock: S.optional(__S(271, __c8, 15)),
          networkOrigin: S.optional(__S(273, __c8, 17)),
        }),
      ).annotate({ identifier: "S3AccessPointConfiguration" });
    case 19:
      return S.Record(S.String, /*@__PURE__*/ __S(274, __c8, 18).pipe(S.optional));
    case 20:
      return S.suspend(() =>
        S.Struct({
          bucketPolicy: S.optional(S.String),
          bucketAclGrants: S.optional(__S(270, __c8, 14)),
          bucketPublicAccessBlock: S.optional(__S(271, __c8, 15)),
          accessPoints: S.optional(__S(275, __c8, 19)),
        }),
      ).annotate({ identifier: "S3BucketConfiguration" });
    case 21:
      return S.suspend(() => S.Struct({ topicPolicy: S.optional(S.String) })).annotate({
        identifier: "SnsTopicConfiguration",
      });
    case 22:
      return S.suspend(() => S.Struct({ queuePolicy: S.optional(S.String) })).annotate({
        identifier: "SqsQueueConfiguration",
      });
    case 23:
      return S.suspend(() =>
        S.Struct({
          accessPointPolicy: S.optional(S.String),
          networkOrigin: S.optional(__S(273, __c8, 17)),
        }),
      ).annotate({ identifier: "S3ExpressDirectoryAccessPointConfiguration" });
    case 24:
      return S.Record(S.String, /*@__PURE__*/ __S(279, __c8, 23).pipe(S.optional));
    case 25:
      return S.suspend(() =>
        S.Struct({
          bucketPolicy: S.optional(S.String),
          accessPoints: S.optional(__S(280, __c8, 24)),
        }),
      ).annotate({ identifier: "S3ExpressDirectoryBucketConfiguration" });
    case 26:
      return S.suspend(() => S.Struct({ streamPolicy: S.optional(S.String) })).annotate({
        identifier: "DynamodbStreamConfiguration",
      });
    case 27:
      return S.suspend(() => S.Struct({ tablePolicy: S.optional(S.String) })).annotate({
        identifier: "DynamodbTableConfiguration",
      });
    case 28:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ebsSnapshot: __S(256, __c8, 0) }),
        /*@__PURE__*/ S.Struct({ ecrRepository: __S(257, __c8, 1) }),
        /*@__PURE__*/ S.Struct({ iamRole: __S(258, __c8, 2) }),
        /*@__PURE__*/ S.Struct({ efsFileSystem: __S(259, __c8, 3) }),
        /*@__PURE__*/ S.Struct({ kmsKey: __S(263, __c8, 7) }),
        /*@__PURE__*/ S.Struct({ rdsDbClusterSnapshot: __S(266, __c8, 10) }),
        /*@__PURE__*/ S.Struct({ rdsDbSnapshot: __S(266, __c8, 10) }),
        /*@__PURE__*/ S.Struct({ secretsManagerSecret: __S(267, __c8, 11) }),
        /*@__PURE__*/ S.Struct({ s3Bucket: __S(276, __c8, 20) }),
        /*@__PURE__*/ S.Struct({ snsTopic: __S(277, __c8, 21) }),
        /*@__PURE__*/ S.Struct({ sqsQueue: __S(278, __c8, 22) }),
        /*@__PURE__*/ S.Struct({ s3ExpressDirectoryBucket: __S(281, __c8, 25) }),
        /*@__PURE__*/ S.Struct({ dynamodbStream: __S(282, __c8, 26) }),
        /*@__PURE__*/ S.Struct({ dynamodbTable: __S(283, __c8, 27) }),
      ]);
    case 29:
      return S.Record(S.String, /*@__PURE__*/ __S(284, __c8, 28).pipe(S.optional));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String,
          type: S.String,
          archiveRules: S.optional(__S(353, __c11, 1)),
          tags: S.optional(__S(224, __c7, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          configuration: S.optional(__S(393, __c12, 9)),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/analyzer" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAnalyzerRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eq: S.optional(__S(96, __c3, 0)),
          neq: S.optional(__S(96, __c3, 0)),
          contains: S.optional(__S(96, __c3, 0)),
          exists: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Criterion" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(320, __c10, 0).pipe(S.optional));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ruleName: S.String, filter: __S(321, __c10, 1) })).annotate(
        { identifier: "InlineArchiveRule" },
      );
    case 1:
      return S.Array(__S(352, __c11, 0));
    case 2:
      return S.suspend(() => S.Struct({ arn: S.optional(S.String) })).annotate({
        identifier: "CreateAnalyzerResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(224, __c7, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(96, __c3, 0)),
          resourceTags: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "AnalysisRuleCriteria" });
    case 2:
      return S.Array(__S(385, __c12, 1));
    case 3:
      return S.suspend(() => S.Struct({ exclusions: S.optional(__S(386, __c12, 2)) })).annotate({
        identifier: "AnalysisRule",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          unusedAccessAge: S.optional(S.Number),
          analysisRule: S.optional(__S(387, __c12, 3)),
        }),
      ).annotate({ identifier: "UnusedAccessConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(96, __c3, 0)),
          resourceTypes: S.optional(__S(96, __c3, 0)),
          resourceArns: S.optional(__S(96, __c3, 0)),
        }),
      ).annotate({ identifier: "InternalAccessAnalysisRuleCriteria" });
    case 6:
      return S.Array(__S(389, __c12, 5));
    case 7:
      return S.suspend(() => S.Struct({ inclusions: S.optional(__S(390, __c12, 6)) })).annotate({
        identifier: "InternalAccessAnalysisRule",
      });
    case 8:
      return S.suspend(() => S.Struct({ analysisRule: S.optional(__S(391, __c12, 7)) })).annotate({
        identifier: "InternalAccessConfiguration",
      });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ unusedAccess: __S(388, __c12, 4) }),
        /*@__PURE__*/ S.Struct({ internalAccess: __S(392, __c12, 8) }),
      ]);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String.pipe(T.HttpLabel("analyzerName")),
          ruleName: S.String,
          filter: __S(321, __c10, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/analyzer/{analyzerName}/archive-rule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateArchiveRuleRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          archiveRules: S.optional(__S(353, __c11, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          configuration: S.optional(__S(393, __c12, 9)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/service-linked-analyzer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateServiceLinkedAnalyzerRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String.pipe(T.HttpLabel("analyzerName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/analyzer/{analyzerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAnalyzerRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String.pipe(T.HttpLabel("analyzerName")),
          ruleName: S.String.pipe(T.HttpLabel("ruleName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/analyzer/{analyzerName}/archive-rule/{ruleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteArchiveRuleRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String.pipe(T.HttpLabel("analyzerName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/service-linked-analyzer/{analyzerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceLinkedAnalyzerRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String.pipe(T.HttpQuery("analyzerArn")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/recommendation/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateFindingRecommendationRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessPreviewId: S.String.pipe(T.HttpLabel("accessPreviewId")),
          analyzerArn: S.String.pipe(T.HttpQuery("analyzerArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/access-preview/{accessPreviewId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccessPreviewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          analyzerArn: S.String,
          configurations: __S(285, __c8, 29),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          statusReason: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "AccessPreview" });
    case 2:
      return S.suspend(() => S.Struct({ accessPreview: __S(609, __c19, 1) })).annotate({
        identifier: "GetAccessPreviewResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ code: S.String })).annotate({
        identifier: "AccessPreviewStatusReason",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String.pipe(T.HttpQuery("analyzerArn")),
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/analyzed-resource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAnalyzedResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          resourceType: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          analyzedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          isPublic: S.Boolean,
          actions: S.optional(__S(96, __c3, 0)),
          sharedVia: S.optional(__S(96, __c3, 0)),
          status: S.optional(S.String),
          resourceOwnerAccount: S.String,
          error: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalyzedResource" });
    case 2:
      return S.suspend(() => S.Struct({ resource: S.optional(__S(673, __c21, 1)) })).annotate({
        identifier: "GetAnalyzedResourceResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ analyzerName: S.String.pipe(T.HttpLabel("analyzerName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/analyzer/{analyzerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAnalyzerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ analyzer: __S(736, __c23, 0) })).annotate({
        identifier: "GetAnalyzerResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          type: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastResourceAnalyzed: S.optional(S.String),
          lastResourceAnalyzedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          tags: S.optional(__S(224, __c7, 0)),
          status: S.String,
          statusReason: S.optional(__S(640, __c20, 0)),
          configuration: S.optional(__S(393, __c12, 9)),
          managedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalyzerSummary" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String.pipe(T.HttpLabel("analyzerName")),
          ruleName: S.String.pipe(T.HttpLabel("ruleName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/analyzer/{analyzerName}/archive-rule/{ruleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetArchiveRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ archiveRule: __S(800, __c25, 0) })).annotate({
        identifier: "GetArchiveRuleResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleName: S.String,
          filter: __S(321, __c10, 1),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ArchiveRuleSummary" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String.pipe(T.HttpQuery("analyzerArn")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/finding/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFindingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ finding: S.optional(__S(896, __c28, 0)) })).annotate({
        identifier: "GetFindingResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessPointArn: S.optional(S.String),
          accessPointAccount: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingSourceDetail" });
    case 1:
      return S.suspend(() =>
        S.Struct({ type: S.String, detail: S.optional(__S(864, __c27, 0)) }),
      ).annotate({ identifier: "FindingSource" });
    case 2:
      return S.Array(__S(865, __c27, 1));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          principal: S.optional(__S(224, __c7, 0)),
          action: S.optional(__S(96, __c3, 0)),
          resource: S.optional(S.String),
          isPublic: S.optional(S.Boolean),
          resourceType: S.String,
          condition: __S(224, __c7, 0),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          analyzedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          resourceOwnerAccount: S.String,
          error: S.optional(S.String),
          sources: S.optional(__S(866, __c27, 2)),
          resourceControlPolicyRestriction: S.optional(S.String),
        }),
      ).annotate({ identifier: "Finding" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String.pipe(T.HttpQuery("analyzerArn")),
          id: S.String.pipe(T.HttpLabel("id")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/recommendation/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFindingRecommendationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          recommendedAction: S.String,
          recommendedPolicy: S.optional(S.String),
          existingPolicyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnusedPermissionsRecommendedStep" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ unusedPermissionsRecommendedStep: __S(929, __c29, 1) }),
      ]);
    case 3:
      return S.Array(__S(930, __c29, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          completedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          nextToken: S.optional(S.String),
          error: S.optional(__S(960, __c30, 0)),
          resourceArn: S.String,
          recommendedSteps: S.optional(__S(931, __c29, 3)),
          recommendationType: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "GetFindingRecommendationResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ code: S.String, message: S.String })).annotate({
        identifier: "RecommendationError",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ analyzerArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/analyzer/findings/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFindingsStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          totalActivePublic: S.optional(S.Number),
          totalActiveCrossAccount: S.optional(S.Number),
          totalActiveErrors: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResourceTypeDetails" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(993, __c31, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceTypeStatistics: S.optional(__S(994, __c31, 2)),
          totalActiveFindings: S.optional(S.Number),
          totalArchivedFindings: S.optional(S.Number),
          totalResolvedFindings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExternalAccessFindingsStatistics" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          totalActiveFindings: S.optional(S.Number),
          totalResolvedFindings: S.optional(S.Number),
          totalArchivedFindings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InternalAccessResourceTypeDetails" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(996, __c31, 4).pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          resourceTypeStatistics: S.optional(__S(997, __c31, 5)),
          totalActiveFindings: S.optional(S.Number),
          totalArchivedFindings: S.optional(S.Number),
          totalResolvedFindings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InternalAccessFindingsStatistics" });
    case 7:
      return S.suspend(() =>
        S.Struct({ unusedAccessType: S.optional(S.String), total: S.optional(S.Number) }),
      ).annotate({ identifier: "UnusedAccessTypeStatistics" });
    case 8:
      return S.Array(__S(999, __c31, 7));
    case 9:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({
          account: S.optional(S.String),
          numberOfActiveFindings: S.optional(S.Number),
          details: S.optional(__S(1001, __c31, 9)),
        }),
      ).annotate({ identifier: "FindingAggregationAccountDetails" });
    case 11:
      return S.Array(__S(1002, __c31, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          unusedAccessTypeStatistics: S.optional(__S(1000, __c31, 8)),
          topAccounts: S.optional(__S(1003, __c31, 11)),
          totalActiveFindings: S.optional(S.Number),
          totalArchivedFindings: S.optional(S.Number),
          totalResolvedFindings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UnusedAccessFindingsStatistics" });
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ externalAccessFindingsStatistics: __S(995, __c31, 3) }),
        /*@__PURE__*/ S.Struct({ internalAccessFindingsStatistics: __S(998, __c31, 6) }),
        /*@__PURE__*/ S.Struct({ unusedAccessFindingsStatistics: __S(1004, __c31, 12) }),
      ]);
    case 14:
      return S.Array(__S(1005, __c31, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          findingsStatistics: S.optional(__S(1006, __c31, 14)),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetFindingsStatisticsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String.pipe(T.HttpQuery("analyzerArn")),
          id: S.String.pipe(T.HttpLabel("id")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/findingv2/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFindingV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(__S(96, __c3, 0)),
          condition: S.optional(__S(224, __c7, 0)),
          principal: S.optional(__S(224, __c7, 0)),
          principalOwnerAccount: S.optional(S.String),
          accessType: S.optional(S.String),
          principalType: S.optional(S.String),
          sources: S.optional(__S(866, __c27, 2)),
          resourceControlPolicyRestriction: S.optional(S.String),
          serviceControlPolicyRestriction: S.optional(S.String),
        }),
      ).annotate({ identifier: "InternalAccessDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(__S(96, __c3, 0)),
          condition: __S(224, __c7, 0),
          isPublic: S.optional(S.Boolean),
          principal: S.optional(__S(224, __c7, 0)),
          sources: S.optional(__S(866, __c27, 2)),
          resourceControlPolicyRestriction: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExternalAccessDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          lastAccessed: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UnusedAction" });
    case 4:
      return S.Array(__S(1027, __c32, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          actions: S.optional(__S(1028, __c32, 4)),
          serviceNamespace: S.String,
          lastAccessed: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UnusedPermissionDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: S.String,
          lastAccessed: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UnusedIamUserAccessKeyDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          lastAccessed: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UnusedIamRoleDetails" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ internalAccessDetails: __S(1025, __c32, 1) }),
        /*@__PURE__*/ S.Struct({ externalAccessDetails: __S(1026, __c32, 2) }),
        /*@__PURE__*/ S.Struct({ unusedPermissionDetails: __S(1029, __c32, 5) }),
        /*@__PURE__*/ S.Struct({ unusedIamUserAccessKeyDetails: __S(1030, __c32, 6) }),
        /*@__PURE__*/ S.Struct({ unusedIamRoleDetails: __S(1031, __c32, 7) }),
        /*@__PURE__*/ S.Struct({ unusedIamUserPasswordDetails: __S(1031, __c32, 7) }),
      ]);
    case 9:
      return S.Array(__S(1032, __c32, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          analyzedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          error: S.optional(S.String),
          id: S.String,
          nextToken: S.optional(S.String),
          resource: S.optional(S.String),
          resourceType: S.String,
          resourceOwnerAccount: S.String,
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          findingDetails: __S(1033, __c32, 9),
          findingType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetFindingV2Response" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          includeResourcePlaceholders: S.optional(S.Boolean).pipe(
            T.HttpQuery("includeResourcePlaceholders"),
          ),
          includeServiceLevelTemplate: S.optional(S.Boolean).pipe(
            T.HttpQuery("includeServiceLevelTemplate"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/policy/generation/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGeneratedPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          status: S.String,
          startedOn: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          completedOn: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          jobError: S.optional(__S(960, __c30, 0)),
        }),
      ).annotate({ identifier: "JobDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          trailProperties: __S(1089, __c34, 1),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CloudTrailProperties" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          isComplete: S.optional(S.Boolean),
          principalArn: S.String,
          cloudTrailProperties: S.optional(__S(1058, __c33, 2)),
        }),
      ).annotate({ identifier: "GeneratedPolicyProperties" });
    case 4:
      return S.suspend(() => S.Struct({ policy: S.String })).annotate({
        identifier: "GeneratedPolicy",
      });
    case 5:
      return S.Array(__S(1060, __c33, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          properties: __S(1059, __c33, 3),
          generatedPolicies: S.optional(__S(1061, __c33, 5)),
        }),
      ).annotate({ identifier: "GeneratedPolicyResult" });
    case 7:
      return S.suspend(() =>
        S.Struct({ jobDetails: __S(1057, __c33, 1), generatedPolicyResult: __S(1062, __c33, 6) }),
      ).annotate({ identifier: "GetGeneratedPolicyResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudTrailArn: S.String,
          regions: S.optional(__S(96, __c3, 0)),
          allRegions: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TrailProperties" });
    case 1:
      return S.Array(__S(1088, __c34, 0));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessPreviewId: S.String.pipe(T.HttpLabel("accessPreviewId")),
          analyzerArn: S.String,
          filter: S.optional(__S(321, __c10, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/access-preview/{accessPreviewId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAccessPreviewFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          existingFindingId: S.optional(S.String),
          existingFindingStatus: S.optional(S.String),
          principal: S.optional(__S(224, __c7, 0)),
          action: S.optional(__S(96, __c3, 0)),
          condition: S.optional(__S(224, __c7, 0)),
          resource: S.optional(S.String),
          isPublic: S.optional(S.Boolean),
          resourceType: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          changeType: S.String,
          status: S.String,
          resourceOwnerAccount: S.String,
          error: S.optional(S.String),
          sources: S.optional(__S(866, __c27, 2)),
          resourceControlPolicyRestriction: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccessPreviewFinding" });
    case 2:
      return S.Array(__S(1121, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ findings: __S(1122, __c35, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccessPreviewFindingsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String.pipe(T.HttpQuery("analyzerArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/access-preview" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccessPreviewsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          analyzerArn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          statusReason: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "AccessPreviewSummary" });
    case 2:
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ accessPreviews: __S(1154, __c36, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccessPreviewsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String,
          resourceType: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/analyzed-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAnalyzedResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, resourceOwnerAccount: S.String, resourceType: S.String }),
      ).annotate({ identifier: "AnalyzedResourceSummary" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ analyzedResources: __S(1186, __c37, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAnalyzedResourcesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/analyzer" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAnalyzersRequest" });
    case 1:
      return S.Array(__S(736, __c23, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ analyzers: __S(1217, __c38, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAnalyzersResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String.pipe(T.HttpLabel("analyzerName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/analyzer/{analyzerName}/archive-rule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListArchiveRulesRequest" });
    case 1:
      return S.Array(__S(800, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ archiveRules: __S(1249, __c39, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListArchiveRulesResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String,
          filter: S.optional(__S(321, __c10, 1)),
          sort: S.optional(__S(1312, __c41, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/finding" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFindingsRequest" });
    case 1:
      return S.Array(__S(896, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ findings: __S(1281, __c40, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFindingsResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributeName: S.optional(S.String), orderBy: S.optional(S.String) }),
      ).annotate({ identifier: "SortCriteria" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String,
          filter: S.optional(__S(321, __c10, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          sort: S.optional(__S(1312, __c41, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/findingv2" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFindingsV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          analyzedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          error: S.optional(S.String),
          id: S.String,
          resource: S.optional(S.String),
          resourceType: S.String,
          resourceOwnerAccount: S.String,
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          findingType: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingSummaryV2" });
    case 2:
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ findings: __S(1346, __c42, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFindingsV2Response" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          principalArn: S.optional(S.String).pipe(T.HttpQuery("principalArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/policy/generation" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPolicyGenerationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          principalArn: S.String,
          status: S.String,
          startedOn: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          completedOn: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PolicyGeneration" });
    case 2:
      return S.Array(__S(1377, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ policyGenerations: __S(1378, __c43, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPolicyGenerationsResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(224, __c7, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ principalArn: S.String })).annotate({
        identifier: "PolicyGenerationDetails",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          trails: __S(1089, __c34, 1),
          accessRole: S.String,
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CloudTrailDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          policyGenerationDetails: __S(1440, __c45, 0),
          cloudTrailDetails: S.optional(__S(1441, __c45, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/policy/generation" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartPolicyGenerationRequest" });
    case 3:
      return S.suspend(() => S.Struct({ jobId: S.String })).annotate({
        identifier: "StartPolicyGenerationResponse",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String,
          resourceArn: S.String,
          resourceOwnerAccount: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/resource/scan" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartResourceScanRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(224, __c7, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(96, __c3, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String.pipe(T.HttpLabel("analyzerName")),
          configuration: S.optional(__S(393, __c12, 9)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/analyzer/{analyzerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAnalyzerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ configuration: S.optional(__S(393, __c12, 9)) })).annotate({
        identifier: "UpdateAnalyzerResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.String.pipe(T.HttpLabel("analyzerName")),
          ruleName: S.String.pipe(T.HttpLabel("ruleName")),
          filter: __S(321, __c10, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/analyzer/{analyzerName}/archive-rule/{ruleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateArchiveRuleRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String,
          status: S.String,
          ids: S.optional(__S(96, __c3, 0)),
          resourceArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/finding" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFindingsRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          policyDocument: S.String,
          policyType: S.String,
          validatePolicyResourceType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policy/validation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidatePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ start: S.Number, length: S.Number })).annotate({
        identifier: "Substring",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ index: S.Number }),
        /*@__PURE__*/ S.Struct({ key: S.String }),
        /*@__PURE__*/ S.Struct({ substring: __S(1665, __c52, 1) }),
        /*@__PURE__*/ S.Struct({ value: S.String }),
      ]);
    case 3:
      return S.Array(__S(1666, __c52, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ line: S.Number, column: S.Number, offset: S.Number }),
      ).annotate({ identifier: "Position" });
    case 5:
      return S.suspend(() =>
        S.Struct({ start: __S(1668, __c52, 4), end: __S(1668, __c52, 4) }),
      ).annotate({ identifier: "Span" });
    case 6:
      return S.suspend(() =>
        S.Struct({ path: __S(1667, __c52, 3), span: __S(1669, __c52, 5) }),
      ).annotate({ identifier: "Location" });
    case 7:
      return S.Array(__S(1670, __c52, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          findingDetails: S.String,
          findingType: S.String,
          issueCode: S.String,
          learnMoreLink: S.String,
          locations: __S(1671, __c52, 7),
        }),
      ).annotate({ identifier: "ValidatePolicyFinding" });
    case 9:
      return S.Array(__S(1672, __c52, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ findings: __S(1673, __c52, 9), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ValidatePolicyResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1696, __c53, 0));
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analyzerArn: S.String,
          ruleName: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/archive-rule" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ApplyArchiveRuleRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "ApplyArchiveRuleResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
