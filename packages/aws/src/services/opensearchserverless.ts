import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "OpenSearchServerless",
  target: "OpenSearchServerless",
  version: "2021-11-01",
  sigv4: "aoss",
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
                `https://aoss-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://aoss-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://aoss.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://aoss.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

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
export class OcuLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "OcuLimitExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
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
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly serviceCode: string;
    readonly quotaCode?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type CollectionId = string;
export type CollectionIds = string[];
export type CollectionName = string;
export type CollectionNames = string[];
export interface BatchGetCollectionRequest {
  ids?: string[];
  names?: string[];
}
export type CollectionStatus = string;
export type CollectionType = string;
export type StandbyReplicas = string;
export type DeletionProtection = string;
export type ServerlessVectorAccelerationStatus = string;
export interface VectorOptions {
  ServerlessVectorAcceleration: string;
}
export interface FipsEndpoints {
  collectionEndpoint?: string;
  dashboardEndpoint?: string;
}
export type CollectionGroupName = string;
export interface CollectionDetail {
  id?: string;
  name?: string;
  status?: string;
  type?: string;
  description?: string;
  arn?: string;
  kmsKeyArn?: string;
  standbyReplicas?: string;
  deletionProtection?: string;
  vectorOptions?: VectorOptions;
  createdDate?: number;
  lastModifiedDate?: number;
  collectionEndpoint?: string;
  dashboardEndpoint?: string;
  fipsEndpoints?: FipsEndpoints;
  failureCode?: string;
  failureMessage?: string;
  collectionGroupName?: string;
}
export type CollectionDetails = CollectionDetail[];
export interface CollectionErrorDetail {
  id?: string;
  name?: string;
  errorMessage?: string;
  errorCode?: string;
}
export type CollectionErrorDetails = CollectionErrorDetail[];
export interface BatchGetCollectionResponse {
  collectionDetails?: CollectionDetail[];
  collectionErrorDetails?: CollectionErrorDetail[];
}
export type CollectionGroupId = string;
export type CollectionGroupIds = string[];
export type CollectionGroupNames = string[];
export interface BatchGetCollectionGroupRequest {
  ids?: string[];
  names?: string[];
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type Tags = Tag[];
export type CollectionGroupMaxIndexingCapacityValue = number;
export type CollectionGroupMaxSearchCapacityValue = number;
export type CollectionGroupMinIndexingCapacityValue = number;
export type CollectionGroupMinSearchCapacityValue = number;
export interface CollectionGroupCapacityLimits {
  maxIndexingCapacityInOCU?: number;
  maxSearchCapacityInOCU?: number;
  minIndexingCapacityInOCU?: number;
  minSearchCapacityInOCU?: number;
}
export type AutoscalingStatus = string;
export interface CapacityDetails {
  capacityInOcu?: number;
  autoscalingStatus?: string;
}
export interface CurrentCapacity {
  search?: CapacityDetails;
  indexing?: CapacityDetails;
}
export type ServerlessGeneration = string;
export interface CollectionGroupDetail {
  id?: string;
  arn?: string;
  name?: string;
  standbyReplicas?: string;
  description?: string;
  tags?: Tag[];
  createdDate?: number;
  capacityLimits?: CollectionGroupCapacityLimits;
  currentCapacity?: CurrentCapacity;
  numberOfCollections?: number;
  generation?: string;
}
export type CollectionGroupDetails = CollectionGroupDetail[];
export interface CollectionGroupErrorDetail {
  id?: string;
  name?: string;
  errorMessage?: string;
  errorCode?: string;
}
export type CollectionGroupErrorDetails = CollectionGroupErrorDetail[];
export interface BatchGetCollectionGroupResponse {
  collectionGroupDetails?: CollectionGroupDetail[];
  collectionGroupErrorDetails?: CollectionGroupErrorDetail[];
}
export type LifecyclePolicyType = string;
export type ResourceName = string;
export interface LifecyclePolicyResourceIdentifier {
  type: string;
  resource: string;
}
export type LifecyclePolicyResourceIdentifiers =
  LifecyclePolicyResourceIdentifier[];
export interface BatchGetEffectiveLifecyclePolicyRequest {
  resourceIdentifiers: LifecyclePolicyResourceIdentifier[];
}
export type Resource = string;
export type PolicyName = string;
export type ResourceType = string;
export interface EffectiveLifecyclePolicyDetail {
  type?: string;
  resource?: string;
  policyName?: string;
  resourceType?: string;
  retentionPeriod?: string;
  noMinRetentionPeriod?: boolean;
}
export type EffectiveLifecyclePolicyDetails = EffectiveLifecyclePolicyDetail[];
export interface EffectiveLifecyclePolicyErrorDetail {
  type?: string;
  resource?: string;
  errorMessage?: string;
  errorCode?: string;
}
export type EffectiveLifecyclePolicyErrorDetails =
  EffectiveLifecyclePolicyErrorDetail[];
export interface BatchGetEffectiveLifecyclePolicyResponse {
  effectiveLifecyclePolicyDetails?: EffectiveLifecyclePolicyDetail[];
  effectiveLifecyclePolicyErrorDetails?: EffectiveLifecyclePolicyErrorDetail[];
}
export interface LifecyclePolicyIdentifier {
  type: string;
  name: string;
}
export type LifecyclePolicyIdentifiers = LifecyclePolicyIdentifier[];
export interface BatchGetLifecyclePolicyRequest {
  identifiers: LifecyclePolicyIdentifier[];
}
export type PolicyVersion = string;
export type PolicyDescription = string;
export interface LifecyclePolicyDetail {
  type?: string;
  name?: string;
  policyVersion?: string;
  description?: string;
  policy?: any;
  createdDate?: number;
  lastModifiedDate?: number;
}
export type LifecyclePolicyDetails = LifecyclePolicyDetail[];
export interface LifecyclePolicyErrorDetail {
  type?: string;
  name?: string;
  errorMessage?: string;
  errorCode?: string;
}
export type LifecyclePolicyErrorDetails = LifecyclePolicyErrorDetail[];
export interface BatchGetLifecyclePolicyResponse {
  lifecyclePolicyDetails?: LifecyclePolicyDetail[];
  lifecyclePolicyErrorDetails?: LifecyclePolicyErrorDetail[];
}
export type VpcEndpointId = string;
export type VpcEndpointIds = string[];
export interface BatchGetVpcEndpointRequest {
  ids: string[];
}
export type VpcEndpointName = string;
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type VpcEndpointStatus = string;
export interface VpcEndpointDetail {
  id?: string;
  name?: string;
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  status?: string;
  createdDate?: number;
  failureCode?: string;
  failureMessage?: string;
}
export type VpcEndpointDetails = VpcEndpointDetail[];
export interface VpcEndpointErrorDetail {
  id?: string;
  errorMessage?: string;
  errorCode?: string;
}
export type VpcEndpointErrorDetails = VpcEndpointErrorDetail[];
export interface BatchGetVpcEndpointResponse {
  vpcEndpointDetails?: VpcEndpointDetail[];
  vpcEndpointErrorDetails?: VpcEndpointErrorDetail[];
}
export type AccessPolicyType = string;
export type PolicyDocument = string;
export type ClientToken = string;
export interface CreateAccessPolicyRequest {
  type: string;
  name: string;
  description?: string;
  policy: string;
  clientToken?: string;
}
export interface AccessPolicyDetail {
  type?: string;
  name?: string;
  policyVersion?: string;
  description?: string;
  policy?: any;
  createdDate?: number;
  lastModifiedDate?: number;
}
export interface CreateAccessPolicyResponse {
  accessPolicyDetail?: AccessPolicyDetail;
}
export interface EncryptionConfig {
  aWSOwnedKey?: boolean;
  kmsKeyArn?: string;
}
export interface CreateCollectionRequest {
  name: string;
  type?: string;
  description?: string;
  tags?: Tag[];
  standbyReplicas?: string;
  vectorOptions?: VectorOptions;
  collectionGroupName?: string;
  encryptionConfig?: EncryptionConfig;
  deletionProtection?: string;
  clientToken?: string;
}
export interface CreateCollectionDetail {
  id?: string;
  name?: string;
  status?: string;
  type?: string;
  description?: string;
  arn?: string;
  kmsKeyArn?: string;
  standbyReplicas?: string;
  deletionProtection?: string;
  vectorOptions?: VectorOptions;
  createdDate?: number;
  lastModifiedDate?: number;
  collectionGroupName?: string;
}
export interface CreateCollectionResponse {
  createCollectionDetail?: CreateCollectionDetail;
}
export interface CreateCollectionGroupRequest {
  name: string;
  standbyReplicas: string;
  description?: string;
  tags?: Tag[];
  capacityLimits?: CollectionGroupCapacityLimits;
  generation?: string;
  clientToken?: string;
}
export interface CreateCollectionGroupDetail {
  id?: string;
  arn?: string;
  name?: string;
  standbyReplicas?: string;
  description?: string;
  tags?: Tag[];
  createdDate?: number;
  capacityLimits?: CollectionGroupCapacityLimits;
  generation?: string;
}
export interface CreateCollectionGroupResponse {
  createCollectionGroupDetail?: CreateCollectionGroupDetail;
}
export type IndexName = string;
export type IndexSchema = unknown;
export interface CreateIndexRequest {
  id: string;
  indexName: string;
  indexSchema?: any;
}
export interface CreateIndexResponse {}
export interface CreateLifecyclePolicyRequest {
  type: string;
  name: string;
  description?: string;
  policy: string;
  clientToken?: string;
}
export interface CreateLifecyclePolicyResponse {
  lifecyclePolicyDetail?: LifecyclePolicyDetail;
}
export type SecurityConfigType = string;
export type ConfigName = string;
export type ConfigDescription = string;
export type SamlMetadata = string;
export type SamlUserAttribute = string;
export type SamlGroupAttribute = string;
export type OpenSearchServerlessEntityId = string;
export interface SamlConfigOptions {
  metadata: string;
  userAttribute?: string;
  groupAttribute?: string;
  openSearchServerlessEntityId?: string;
  sessionTimeout?: number;
}
export type IamIdentityCenterInstanceArn = string;
export type IamIdentityCenterUserAttribute = string;
export type IamIdentityCenterGroupAttribute = string;
export interface CreateIamIdentityCenterConfigOptions {
  instanceArn: string;
  userAttribute?: string;
  groupAttribute?: string;
}
export type IamFederationGroupAttribute = string;
export type IamFederationUserAttribute = string;
export interface IamFederationConfigOptions {
  groupAttribute?: string;
  userAttribute?: string;
}
export interface CreateSecurityConfigRequest {
  type: string;
  name: string;
  description?: string;
  samlOptions?: SamlConfigOptions;
  iamIdentityCenterOptions?: CreateIamIdentityCenterConfigOptions;
  iamFederationOptions?: IamFederationConfigOptions;
  clientToken?: string;
}
export type SecurityConfigId = string;
export type IamIdentityCenterApplicationArn = string;
export interface IamIdentityCenterConfigOptions {
  instanceArn?: string;
  applicationArn?: string;
  applicationName?: string;
  applicationDescription?: string;
  userAttribute?: string;
  groupAttribute?: string;
}
export interface SecurityConfigDetail {
  id?: string;
  type?: string;
  configVersion?: string;
  description?: string;
  samlOptions?: SamlConfigOptions;
  iamIdentityCenterOptions?: IamIdentityCenterConfigOptions;
  iamFederationOptions?: IamFederationConfigOptions;
  createdDate?: number;
  lastModifiedDate?: number;
}
export interface CreateSecurityConfigResponse {
  securityConfigDetail?: SecurityConfigDetail;
}
export type SecurityPolicyType = string;
export interface CreateSecurityPolicyRequest {
  type: string;
  name: string;
  description?: string;
  policy: string;
  clientToken?: string;
}
export interface SecurityPolicyDetail {
  type?: string;
  name?: string;
  policyVersion?: string;
  description?: string;
  policy?: any;
  createdDate?: number;
  lastModifiedDate?: number;
}
export interface CreateSecurityPolicyResponse {
  securityPolicyDetail?: SecurityPolicyDetail;
}
export interface CreateVpcEndpointRequest {
  name: string;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds?: string[];
  clientToken?: string;
}
export interface CreateVpcEndpointDetail {
  id?: string;
  name?: string;
  status?: string;
}
export interface CreateVpcEndpointResponse {
  createVpcEndpointDetail?: CreateVpcEndpointDetail;
}
export interface DeleteAccessPolicyRequest {
  type: string;
  name: string;
  clientToken?: string;
}
export interface DeleteAccessPolicyResponse {}
export interface DeleteCollectionRequest {
  id: string;
  clientToken?: string;
}
export interface DeleteCollectionDetail {
  id?: string;
  name?: string;
  status?: string;
  deletionProtection?: string;
}
export interface DeleteCollectionResponse {
  deleteCollectionDetail?: DeleteCollectionDetail;
}
export interface DeleteCollectionGroupRequest {
  id: string;
  clientToken?: string;
}
export interface DeleteCollectionGroupResponse {}
export interface DeleteIndexRequest {
  id: string;
  indexName: string;
}
export interface DeleteIndexResponse {}
export interface DeleteLifecyclePolicyRequest {
  type: string;
  name: string;
  clientToken?: string;
}
export interface DeleteLifecyclePolicyResponse {}
export interface DeleteSecurityConfigRequest {
  id: string;
  clientToken?: string;
}
export interface DeleteSecurityConfigResponse {}
export interface DeleteSecurityPolicyRequest {
  type: string;
  name: string;
  clientToken?: string;
}
export interface DeleteSecurityPolicyResponse {}
export interface DeleteVpcEndpointRequest {
  id: string;
  clientToken?: string;
}
export interface DeleteVpcEndpointDetail {
  id?: string;
  name?: string;
  status?: string;
}
export interface DeleteVpcEndpointResponse {
  deleteVpcEndpointDetail?: DeleteVpcEndpointDetail;
}
export interface GetAccessPolicyRequest {
  type: string;
  name: string;
}
export interface GetAccessPolicyResponse {
  accessPolicyDetail?: AccessPolicyDetail;
}
export interface GetAccountSettingsRequest {}
export type IndexingCapacityValue = number;
export type SearchCapacityValue = number;
export interface CapacityLimits {
  maxIndexingCapacityInOCU?: number;
  maxSearchCapacityInOCU?: number;
}
export interface AccountSettingsDetail {
  capacityLimits?: CapacityLimits;
}
export interface GetAccountSettingsResponse {
  accountSettingsDetail?: AccountSettingsDetail;
}
export interface GetIndexRequest {
  id: string;
  indexName: string;
}
export interface GetIndexResponse {
  indexSchema?: any;
}
export interface GetPoliciesStatsRequest {}
export interface AccessPolicyStats {
  DataPolicyCount?: number;
}
export interface SecurityPolicyStats {
  EncryptionPolicyCount?: number;
  NetworkPolicyCount?: number;
}
export interface SecurityConfigStats {
  SamlConfigCount?: number;
}
export interface LifecyclePolicyStats {
  RetentionPolicyCount?: number;
}
export interface GetPoliciesStatsResponse {
  AccessPolicyStats?: AccessPolicyStats;
  SecurityPolicyStats?: SecurityPolicyStats;
  SecurityConfigStats?: SecurityConfigStats;
  LifecyclePolicyStats?: LifecyclePolicyStats;
  TotalPolicyCount?: number;
}
export interface GetSecurityConfigRequest {
  id: string;
}
export interface GetSecurityConfigResponse {
  securityConfigDetail?: SecurityConfigDetail;
}
export interface GetSecurityPolicyRequest {
  type: string;
  name: string;
}
export interface GetSecurityPolicyResponse {
  securityPolicyDetail?: SecurityPolicyDetail;
}
export type ResourceFilter = string[];
export interface ListAccessPoliciesRequest {
  type: string;
  resource?: string[];
  nextToken?: string;
  maxResults?: number;
}
export interface AccessPolicySummary {
  type?: string;
  name?: string;
  policyVersion?: string;
  description?: string;
  createdDate?: number;
  lastModifiedDate?: number;
}
export type AccessPolicySummaries = AccessPolicySummary[];
export interface ListAccessPoliciesResponse {
  accessPolicySummaries?: AccessPolicySummary[];
  nextToken?: string;
}
export interface ListCollectionGroupsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface CollectionGroupSummary {
  id?: string;
  arn?: string;
  name?: string;
  numberOfCollections?: number;
  createdDate?: number;
  capacityLimits?: CollectionGroupCapacityLimits;
  generation?: string;
}
export type CollectionGroupSummaries = CollectionGroupSummary[];
export interface ListCollectionGroupsResponse {
  collectionGroupSummaries?: CollectionGroupSummary[];
  nextToken?: string;
}
export interface CollectionFilters {
  name?: string;
  status?: string;
  collectionGroupName?: string;
}
export interface ListCollectionsRequest {
  collectionFilters?: CollectionFilters;
  nextToken?: string;
  maxResults?: number;
}
export interface CollectionSummary {
  id?: string;
  name?: string;
  status?: string;
  arn?: string;
  kmsKeyArn?: string;
  collectionGroupName?: string;
}
export type CollectionSummaries = CollectionSummary[];
export interface ListCollectionsResponse {
  collectionSummaries?: CollectionSummary[];
  nextToken?: string;
}
export type LifecycleResource = string;
export type LifecycleResourceFilter = string[];
export interface ListLifecyclePoliciesRequest {
  type: string;
  resources?: string[];
  nextToken?: string;
  maxResults?: number;
}
export interface LifecyclePolicySummary {
  type?: string;
  name?: string;
  policyVersion?: string;
  description?: string;
  createdDate?: number;
  lastModifiedDate?: number;
}
export type LifecyclePolicySummaries = LifecyclePolicySummary[];
export interface ListLifecyclePoliciesResponse {
  lifecyclePolicySummaries?: LifecyclePolicySummary[];
  nextToken?: string;
}
export interface ListSecurityConfigsRequest {
  type: string;
  nextToken?: string;
  maxResults?: number;
}
export interface SecurityConfigSummary {
  id?: string;
  type?: string;
  configVersion?: string;
  description?: string;
  createdDate?: number;
  lastModifiedDate?: number;
}
export type SecurityConfigSummaries = SecurityConfigSummary[];
export interface ListSecurityConfigsResponse {
  securityConfigSummaries?: SecurityConfigSummary[];
  nextToken?: string;
}
export interface ListSecurityPoliciesRequest {
  type: string;
  resource?: string[];
  nextToken?: string;
  maxResults?: number;
}
export interface SecurityPolicySummary {
  type?: string;
  name?: string;
  policyVersion?: string;
  description?: string;
  createdDate?: number;
  lastModifiedDate?: number;
}
export type SecurityPolicySummaries = SecurityPolicySummary[];
export interface ListSecurityPoliciesResponse {
  securityPolicySummaries?: SecurityPolicySummary[];
  nextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface VpcEndpointFilters {
  status?: string;
}
export interface ListVpcEndpointsRequest {
  vpcEndpointFilters?: VpcEndpointFilters;
  nextToken?: string;
  maxResults?: number;
}
export interface VpcEndpointSummary {
  id?: string;
  name?: string;
  status?: string;
}
export type VpcEndpointSummaries = VpcEndpointSummary[];
export interface ListVpcEndpointsResponse {
  vpcEndpointSummaries?: VpcEndpointSummary[];
  nextToken?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccessPolicyRequest {
  type: string;
  name: string;
  policyVersion: string;
  description?: string;
  policy?: string;
  clientToken?: string;
}
export interface UpdateAccessPolicyResponse {
  accessPolicyDetail?: AccessPolicyDetail;
}
export interface UpdateAccountSettingsRequest {
  capacityLimits?: CapacityLimits;
}
export interface UpdateAccountSettingsResponse {
  accountSettingsDetail?: AccountSettingsDetail;
}
export interface UpdateCollectionRequest {
  id: string;
  description?: string;
  vectorOptions?: VectorOptions;
  deletionProtection?: string;
  clientToken?: string;
}
export interface UpdateCollectionDetail {
  id?: string;
  name?: string;
  status?: string;
  type?: string;
  description?: string;
  vectorOptions?: VectorOptions;
  arn?: string;
  createdDate?: number;
  lastModifiedDate?: number;
  deletionProtection?: string;
}
export interface UpdateCollectionResponse {
  updateCollectionDetail?: UpdateCollectionDetail;
}
export interface UpdateCollectionGroupRequest {
  id: string;
  description?: string;
  capacityLimits?: CollectionGroupCapacityLimits;
  clientToken?: string;
}
export interface UpdateCollectionGroupDetail {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  capacityLimits?: CollectionGroupCapacityLimits;
  createdDate?: number;
  lastModifiedDate?: number;
  generation?: string;
}
export interface UpdateCollectionGroupResponse {
  updateCollectionGroupDetail?: UpdateCollectionGroupDetail;
}
export interface UpdateIndexRequest {
  id: string;
  indexName: string;
  indexSchema?: any;
}
export interface UpdateIndexResponse {}
export interface UpdateLifecyclePolicyRequest {
  type: string;
  name: string;
  policyVersion: string;
  description?: string;
  policy?: string;
  clientToken?: string;
}
export interface UpdateLifecyclePolicyResponse {
  lifecyclePolicyDetail?: LifecyclePolicyDetail;
}
export interface UpdateIamIdentityCenterConfigOptions {
  userAttribute?: string;
  groupAttribute?: string;
}
export interface UpdateSecurityConfigRequest {
  id: string;
  configVersion: string;
  description?: string;
  samlOptions?: SamlConfigOptions;
  iamIdentityCenterOptionsUpdates?: UpdateIamIdentityCenterConfigOptions;
  iamFederationOptions?: IamFederationConfigOptions;
  clientToken?: string;
}
export interface UpdateSecurityConfigResponse {
  securityConfigDetail?: SecurityConfigDetail;
}
export interface UpdateSecurityPolicyRequest {
  type: string;
  name: string;
  policyVersion: string;
  description?: string;
  policy?: string;
  clientToken?: string;
}
export interface UpdateSecurityPolicyResponse {
  securityPolicyDetail?: SecurityPolicyDetail;
}
export interface UpdateVpcEndpointRequest {
  id: string;
  addSubnetIds?: string[];
  removeSubnetIds?: string[];
  addSecurityGroupIds?: string[];
  removeSecurityGroupIds?: string[];
  clientToken?: string;
}
export interface UpdateVpcEndpointDetail {
  id?: string;
  name?: string;
  status?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  lastModifiedDate?: number;
}
export interface UpdateVpcEndpointResponse {
  UpdateVpcEndpointDetail?: UpdateVpcEndpointDetail;
}
export type BatchGetCollectionError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns attributes for one or more collections, including the collection endpoint, the OpenSearch Dashboards endpoint, and FIPS-compliant endpoints. For more information, see Creating and managing Amazon OpenSearch Serverless collections.
 */
export const batchGetCollection: API.OperationMethod<
  BatchGetCollectionRequest,
  BatchGetCollectionResponse,
  BatchGetCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ids: 0, names: 0 } },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCollection",
})) as any;

export type BatchGetCollectionGroupError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns attributes for one or more collection groups, including capacity limits and the number of collections in each group. For more information, see Creating and managing Amazon OpenSearch Serverless collections.
 */
export const batchGetCollectionGroup: API.OperationMethod<
  BatchGetCollectionGroupRequest,
  BatchGetCollectionGroupResponse,
  BatchGetCollectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ids: 0, names: 0 } },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCollectionGroup",
})) as any;

export type BatchGetEffectiveLifecyclePolicyError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of successful and failed retrievals for the OpenSearch Serverless indexes. For more information, see Viewing data lifecycle policies.
 */
export const batchGetEffectiveLifecyclePolicy: API.OperationMethod<
  BatchGetEffectiveLifecyclePolicyRequest,
  BatchGetEffectiveLifecyclePolicyResponse,
  BatchGetEffectiveLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceIdentifiers: D.list({ type: 0, resource: 0 }) },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetEffectiveLifecyclePolicy",
})) as any;

export type BatchGetLifecyclePolicyError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns one or more configured OpenSearch Serverless lifecycle policies. For more information, see Viewing data lifecycle policies.
 */
export const batchGetLifecyclePolicy: API.OperationMethod<
  BatchGetLifecyclePolicyRequest,
  BatchGetLifecyclePolicyResponse,
  BatchGetLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifiers: D.list({ type: 0, name: 0 }) },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetLifecyclePolicy",
})) as any;

export type BatchGetVpcEndpointError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns attributes for one or more VPC endpoints associated with the current account. For more information, see Access Amazon OpenSearch Serverless using an interface endpoint.
 */
export const batchGetVpcEndpoint: API.OperationMethod<
  BatchGetVpcEndpointRequest,
  BatchGetVpcEndpointResponse,
  BatchGetVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ids: 0 } },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetVpcEndpoint",
})) as any;

export type CreateAccessPolicyError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data access policy for OpenSearch Serverless. Access policies limit access to collections and the resources within them, and allow a user to access that data irrespective of the access mechanism or network source. For more information, see Data access control for Amazon OpenSearch Serverless.
 */
export const createAccessPolicy: API.OperationMethod<
  CreateAccessPolicyRequest,
  CreateAccessPolicyResponse,
  CreateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      type: 0,
      name: 0,
      description: 0,
      policy: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPolicy",
})) as any;

export type CreateCollectionError =
  | ConflictException
  | InternalServerException
  | OcuLimitExceededException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new OpenSearch Serverless collection. For more information, see Creating and managing Amazon OpenSearch Serverless collections.
 */
export const createCollection: API.OperationMethod<
  CreateCollectionRequest,
  CreateCollectionResponse,
  CreateCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      type: 0,
      description: 0,
      tags: D.list(i_Tag),
      standbyReplicas: 0,
      vectorOptions: i_VectorOptions,
      collectionGroupName: 0,
      encryptionConfig: { aWSOwnedKey: 0, kmsKeyArn: 0 },
      deletionProtection: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    OcuLimitExceededException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCollection",
})) as any;

export type CreateCollectionGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a collection group within OpenSearch Serverless. Collection groups let you manage OpenSearch Compute Units (OCUs) at a group level, with multiple collections sharing the group's capacity limits.
 *
 * For more information, see Managing collection groups.
 */
export const createCollectionGroup: API.OperationMethod<
  CreateCollectionGroupRequest,
  CreateCollectionGroupResponse,
  CreateCollectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      standbyReplicas: 0,
      description: 0,
      tags: D.list(i_Tag),
      capacityLimits: i_CollectionGroupCapacityLimits,
      generation: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCollectionGroup",
})) as any;

export type CreateIndexError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an index within an OpenSearch Serverless collection. Unlike other OpenSearch indexes, indexes created by this API are automatically configured to conduct automatic semantic enrichment ingestion and search. For more information, see About automatic semantic enrichment in the *OpenSearch User Guide*.
 */
export const createIndex: API.OperationMethod<
  CreateIndexRequest,
  CreateIndexResponse,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0, indexName: 0, indexSchema: 0 } },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
})) as any;

export type CreateLifecyclePolicyError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a lifecyle policy to be applied to OpenSearch Serverless indexes. Lifecycle policies define the number of days or hours to retain the data on an OpenSearch Serverless index. For more information, see Creating data lifecycle policies.
 */
export const createLifecyclePolicy: API.OperationMethod<
  CreateLifecyclePolicyRequest,
  CreateLifecyclePolicyResponse,
  CreateLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      type: 0,
      name: 0,
      description: 0,
      policy: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLifecyclePolicy",
})) as any;

export type CreateSecurityConfigError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Specifies a security configuration for OpenSearch Serverless. For more information, see SAML authentication for Amazon OpenSearch Serverless.
 */
export const createSecurityConfig: API.OperationMethod<
  CreateSecurityConfigRequest,
  CreateSecurityConfigResponse,
  CreateSecurityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      type: 0,
      name: 0,
      description: 0,
      samlOptions: i_SamlConfigOptions,
      iamIdentityCenterOptions: {
        instanceArn: 0,
        userAttribute: 0,
        groupAttribute: 0,
      },
      iamFederationOptions: i_IamFederationConfigOptions,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityConfig",
})) as any;

export type CreateSecurityPolicyError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a security policy to be used by one or more OpenSearch Serverless collections. Security policies provide access to a collection and its OpenSearch Dashboards endpoint from public networks or specific VPC endpoints. They also allow you to secure a collection with a KMS encryption key. For more information, see Network access for Amazon OpenSearch Serverless and Encryption at rest for Amazon OpenSearch Serverless.
 */
export const createSecurityPolicy: API.OperationMethod<
  CreateSecurityPolicyRequest,
  CreateSecurityPolicyResponse,
  CreateSecurityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      type: 0,
      name: 0,
      description: 0,
      policy: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityPolicy",
})) as any;

export type CreateVpcEndpointError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OpenSearch Serverless-managed interface VPC endpoint. For more information, see Access Amazon OpenSearch Serverless using an interface endpoint.
 */
export const createVpcEndpoint: API.OperationMethod<
  CreateVpcEndpointRequest,
  CreateVpcEndpointResponse,
  CreateVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      vpcId: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcEndpoint",
})) as any;

export type DeleteAccessPolicyError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch Serverless access policy. For more information, see Data access control for Amazon OpenSearch Serverless.
 */
export const deleteAccessPolicy: API.OperationMethod<
  DeleteAccessPolicyRequest,
  DeleteAccessPolicyResponse,
  DeleteAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { type: 0, name: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPolicy",
})) as any;

export type DeleteCollectionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch Serverless collection. For more information, see Creating and managing Amazon OpenSearch Serverless collections.
 */
export const deleteCollection: API.OperationMethod<
  DeleteCollectionRequest,
  DeleteCollectionResponse,
  DeleteCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCollection",
})) as any;

export type DeleteCollectionGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a collection group. You can only delete empty collection groups that contain no collections. For more information, see Creating and managing Amazon OpenSearch Serverless collections.
 */
export const deleteCollectionGroup: API.OperationMethod<
  DeleteCollectionGroupRequest,
  DeleteCollectionGroupResponse,
  DeleteCollectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCollectionGroup",
})) as any;

export type DeleteIndexError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an index from an OpenSearch Serverless collection. Be aware that the index might be configured to conduct automatic semantic enrichment ingestion and search. For more information, see About automatic semantic enrichment.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexRequest,
  DeleteIndexResponse,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0, indexName: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndex",
})) as any;

export type DeleteLifecyclePolicyError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch Serverless lifecycle policy. For more information, see Deleting data lifecycle policies.
 */
export const deleteLifecyclePolicy: API.OperationMethod<
  DeleteLifecyclePolicyRequest,
  DeleteLifecyclePolicyResponse,
  DeleteLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { type: 0, name: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecyclePolicy",
})) as any;

export type DeleteSecurityConfigError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a security configuration for OpenSearch Serverless. For more information, see SAML authentication for Amazon OpenSearch Serverless.
 */
export const deleteSecurityConfig: API.OperationMethod<
  DeleteSecurityConfigRequest,
  DeleteSecurityConfigResponse,
  DeleteSecurityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfig",
})) as any;

export type DeleteSecurityPolicyError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch Serverless security policy.
 */
export const deleteSecurityPolicy: API.OperationMethod<
  DeleteSecurityPolicyRequest,
  DeleteSecurityPolicyResponse,
  DeleteSecurityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { type: 0, name: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityPolicy",
})) as any;

export type DeleteVpcEndpointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch Serverless-managed interface endpoint. For more information, see Access Amazon OpenSearch Serverless using an interface endpoint.
 */
export const deleteVpcEndpoint: API.OperationMethod<
  DeleteVpcEndpointRequest,
  DeleteVpcEndpointResponse,
  DeleteVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcEndpoint",
})) as any;

export type GetAccessPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns an OpenSearch Serverless access policy. For more information, see Data access control for Amazon OpenSearch Serverless.
 */
export const getAccessPolicy: API.OperationMethod<
  GetAccessPolicyRequest,
  GetAccessPolicyResponse,
  GetAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { type: 0, name: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPolicy",
})) as any;

export type GetAccountSettingsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns account-level settings related to OpenSearch Serverless.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResponse,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
})) as any;

export type GetIndexError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an index in an OpenSearch Serverless collection, including its schema definition. The index might be configured to conduct automatic semantic enrichment ingestion and search. For more information, see About automatic semantic enrichment.
 */
export const getIndex: API.OperationMethod<
  GetIndexRequest,
  GetIndexResponse,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0, indexName: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
})) as any;

export type GetPoliciesStatsError = InternalServerException | CommonErrors;
/**
 * Returns statistical information about your OpenSearch Serverless access policies, security configurations, and security policies.
 */
export const getPoliciesStats: API.OperationMethod<
  GetPoliciesStatsRequest,
  GetPoliciesStatsResponse,
  GetPoliciesStatsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPoliciesStats",
})) as any;

export type GetSecurityConfigError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an OpenSearch Serverless security configuration. For more information, see SAML authentication for Amazon OpenSearch Serverless.
 */
export const getSecurityConfig: API.OperationMethod<
  GetSecurityConfigRequest,
  GetSecurityConfigResponse,
  GetSecurityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityConfig",
})) as any;

export type GetSecurityPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured OpenSearch Serverless security policy. For more information, see Network access for Amazon OpenSearch Serverless and Encryption at rest for Amazon OpenSearch Serverless.
 */
export const getSecurityPolicy: API.OperationMethod<
  GetSecurityPolicyRequest,
  GetSecurityPolicyResponse,
  GetSecurityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { type: 0, name: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityPolicy",
})) as any;

export type ListAccessPoliciesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a list of OpenSearch Serverless access policies.
 */
export const listAccessPolicies: API.PaginatedOperationMethod<
  ListAccessPoliciesRequest,
  ListAccessPoliciesResponse,
  ListAccessPoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { type: 0, resource: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPolicies",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type ListCollectionGroupsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of collection groups. For more information, see Creating and managing Amazon OpenSearch Serverless collections.
 */
export const listCollectionGroups: API.PaginatedOperationMethod<
  ListCollectionGroupsRequest,
  ListCollectionGroupsResponse,
  ListCollectionGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollectionGroups",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type ListCollectionsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all OpenSearch Serverless collections. For more information, see Creating and managing Amazon OpenSearch Serverless collections.
 *
 * Make sure to include an empty request body {} if you don't include any collection filters in the request.
 */
export const listCollections: API.PaginatedOperationMethod<
  ListCollectionsRequest,
  ListCollectionsResponse,
  ListCollectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      collectionFilters: { name: 0, status: 0, collectionGroupName: 0 },
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollections",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type ListLifecyclePoliciesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of OpenSearch Serverless lifecycle policies. For more information, see Viewing data lifecycle policies.
 */
export const listLifecyclePolicies: API.PaginatedOperationMethod<
  ListLifecyclePoliciesRequest,
  ListLifecyclePoliciesResponse,
  ListLifecyclePoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { type: 0, resources: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLifecyclePolicies",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type ListSecurityConfigsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about configured OpenSearch Serverless security configurations. For more information, see SAML authentication for Amazon OpenSearch Serverless.
 */
export const listSecurityConfigs: API.PaginatedOperationMethod<
  ListSecurityConfigsRequest,
  ListSecurityConfigsResponse,
  ListSecurityConfigsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { type: 0, nextToken: 0, maxResults: 0 } },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityConfigs",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type ListSecurityPoliciesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about configured OpenSearch Serverless security policies.
 */
export const listSecurityPolicies: API.PaginatedOperationMethod<
  ListSecurityPoliciesRequest,
  ListSecurityPoliciesResponse,
  ListSecurityPoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { type: 0, resource: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityPolicies",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the tags for an OpenSearch Serverless resource. For more information, see Tagging Amazon OpenSearch Serverless collections.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListVpcEndpointsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns the OpenSearch Serverless-managed interface VPC endpoints associated with the current account. For more information, see Access Amazon OpenSearch Serverless using an interface endpoint.
 */
export const listVpcEndpoints: API.PaginatedOperationMethod<
  ListVpcEndpointsRequest,
  ListVpcEndpointsResponse,
  ListVpcEndpointsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { vpcEndpointFilters: { status: 0 }, nextToken: 0, maxResults: 0 },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpoints",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type TagResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Associates tags with an OpenSearch Serverless resource. For more information, see Tagging Amazon OpenSearch Serverless collections.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or set of tags from an OpenSearch Serverless resource. For more information, see Tagging Amazon OpenSearch Serverless collections.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccessPolicyError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an OpenSearch Serverless access policy. For more information, see Data access control for Amazon OpenSearch Serverless.
 */
export const updateAccessPolicy: API.OperationMethod<
  UpdateAccessPolicyRequest,
  UpdateAccessPolicyResponse,
  UpdateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      type: 0,
      name: 0,
      policyVersion: 0,
      description: 0,
      policy: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessPolicy",
})) as any;

export type UpdateAccountSettingsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Update the OpenSearch Serverless settings for the current Amazon Web Services account. For more information, see Managing capacity limits for Amazon OpenSearch Serverless.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  UpdateAccountSettingsResponse,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      capacityLimits: {
        maxIndexingCapacityInOCU: 0,
        maxSearchCapacityInOCU: 0,
      },
    },
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
})) as any;

export type UpdateCollectionError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Updates an OpenSearch Serverless collection.
 */
export const updateCollection: API.OperationMethod<
  UpdateCollectionRequest,
  UpdateCollectionResponse,
  UpdateCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      id: 0,
      description: 0,
      vectorOptions: i_VectorOptions,
      deletionProtection: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCollection",
})) as any;

export type UpdateCollectionGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the description and capacity limits of a collection group.
 */
export const updateCollectionGroup: API.OperationMethod<
  UpdateCollectionGroupRequest,
  UpdateCollectionGroupResponse,
  UpdateCollectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      id: 0,
      description: 0,
      capacityLimits: i_CollectionGroupCapacityLimits,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCollectionGroup",
})) as any;

export type UpdateIndexError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing index in an OpenSearch Serverless collection. This operation allows you to modify the index schema, including adding new fields or changing field mappings. You can also enable automatic semantic enrichment ingestion and search. For more information, see About automatic semantic enrichment.
 */
export const updateIndex: API.OperationMethod<
  UpdateIndexRequest,
  UpdateIndexResponse,
  UpdateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0, indexName: 0, indexSchema: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndex",
})) as any;

export type UpdateLifecyclePolicyError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates an OpenSearch Serverless access policy. For more information, see Updating data lifecycle policies.
 */
export const updateLifecyclePolicy: API.OperationMethod<
  UpdateLifecyclePolicyRequest,
  UpdateLifecyclePolicyResponse,
  UpdateLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      type: 0,
      name: 0,
      policyVersion: 0,
      description: 0,
      policy: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLifecyclePolicy",
})) as any;

export type UpdateSecurityConfigError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a security configuration for OpenSearch Serverless. For more information, see SAML authentication for Amazon OpenSearch Serverless.
 */
export const updateSecurityConfig: API.OperationMethod<
  UpdateSecurityConfigRequest,
  UpdateSecurityConfigResponse,
  UpdateSecurityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      id: 0,
      configVersion: 0,
      description: 0,
      samlOptions: i_SamlConfigOptions,
      iamIdentityCenterOptionsUpdates: { userAttribute: 0, groupAttribute: 0 },
      iamFederationOptions: i_IamFederationConfigOptions,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityConfig",
})) as any;

export type UpdateSecurityPolicyError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates an OpenSearch Serverless security policy. For more information, see Network access for Amazon OpenSearch Serverless and Encryption at rest for Amazon OpenSearch Serverless.
 */
export const updateSecurityPolicy: API.OperationMethod<
  UpdateSecurityPolicyRequest,
  UpdateSecurityPolicyResponse,
  UpdateSecurityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      type: 0,
      name: 0,
      policyVersion: 0,
      description: 0,
      policy: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityPolicy",
})) as any;

export type UpdateVpcEndpointError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Updates an OpenSearch Serverless-managed interface endpoint. For more information, see Access Amazon OpenSearch Serverless using an interface endpoint.
 */
export const updateVpcEndpoint: API.OperationMethod<
  UpdateVpcEndpointRequest,
  UpdateVpcEndpointResponse,
  UpdateVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      id: 0,
      addSubnetIds: 0,
      removeSubnetIds: 0,
      addSecurityGroupIds: 0,
      removeSecurityGroupIds: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcEndpoint",
})) as any;

const i_CollectionGroupCapacityLimits: D.LazyStruct = () => ({
  maxIndexingCapacityInOCU: 0,
  maxSearchCapacityInOCU: 0,
  minIndexingCapacityInOCU: 0,
  minSearchCapacityInOCU: 0,
});
const i_IamFederationConfigOptions: D.LazyStruct = () => ({
  groupAttribute: 0,
  userAttribute: 0,
});
const i_SamlConfigOptions: D.LazyStruct = () => ({
  metadata: 0,
  userAttribute: 0,
  groupAttribute: 0,
  openSearchServerlessEntityId: 0,
  sessionTimeout: 0,
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_VectorOptions: D.LazyStruct = () => ({
  ServerlessVectorAcceleration: 0,
});
