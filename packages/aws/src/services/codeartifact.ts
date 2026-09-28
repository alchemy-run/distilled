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
  sdkId: "codeartifact",
  target: "CodeArtifactControlPlaneService",
  version: "2018-09-22",
  sigv4: "codeartifact",
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
                `https://codeartifact-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://codeartifact-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codeartifact.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codeartifact.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    readonly resourceId?: string;
    readonly resourceType?: ResourceType;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: ResourceType;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: ResourceType;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: ValidationExceptionReason;
  }> {}
export type DomainName = string;
export type AccountId = string;
export type RepositoryName = string;
export type ExternalConnectionName = string;
export interface AssociateExternalConnectionRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  externalConnection: string;
}
export type Arn = string;
export type Description = string;
export interface UpstreamRepositoryInfo {
  repositoryName?: string;
}
export type UpstreamRepositoryInfoList = UpstreamRepositoryInfo[];
export type PackageFormat =
  | "npm"
  | "pypi"
  | "maven"
  | "nuget"
  | "generic"
  | "ruby"
  | "swift"
  | "cargo"
  | (string & {});
export type ExternalConnectionStatus = "Available" | (string & {});
export interface RepositoryExternalConnectionInfo {
  externalConnectionName?: string;
  packageFormat?: PackageFormat;
  status?: ExternalConnectionStatus;
}
export type RepositoryExternalConnectionInfoList =
  RepositoryExternalConnectionInfo[];
export interface RepositoryDescription {
  name?: string;
  administratorAccount?: string;
  domainName?: string;
  domainOwner?: string;
  arn?: string;
  description?: string;
  upstreams?: UpstreamRepositoryInfo[];
  externalConnections?: RepositoryExternalConnectionInfo[];
  createdTime?: Date;
}
export interface AssociateExternalConnectionResult {
  repository?: RepositoryDescription;
}
export type PackageNamespace = string;
export type PackageName = string;
export type PackageVersion = string;
export type PackageVersionList = string[];
export type PackageVersionRevision = string;
export type PackageVersionRevisionMap = { [key: string]: string | undefined };
export interface CopyPackageVersionsRequest {
  domain: string;
  domainOwner?: string;
  sourceRepository: string;
  destinationRepository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  versions?: string[];
  versionRevisions?: { [key: string]: string | undefined };
  allowOverwrite?: boolean;
  includeFromUpstream?: boolean;
}
export type PackageVersionStatus =
  | "Published"
  | "Unfinished"
  | "Unlisted"
  | "Archived"
  | "Disposed"
  | "Deleted"
  | (string & {});
export interface SuccessfulPackageVersionInfo {
  revision?: string;
  status?: PackageVersionStatus;
}
export type SuccessfulPackageVersionInfoMap = {
  [key: string]: SuccessfulPackageVersionInfo | undefined;
};
export type PackageVersionErrorCode =
  | "ALREADY_EXISTS"
  | "MISMATCHED_REVISION"
  | "MISMATCHED_STATUS"
  | "NOT_ALLOWED"
  | "NOT_FOUND"
  | "SKIPPED"
  | (string & {});
export type ErrorMessage = string;
export interface PackageVersionError {
  errorCode?: PackageVersionErrorCode;
  errorMessage?: string;
}
export type PackageVersionErrorMap = {
  [key: string]: PackageVersionError | undefined;
};
export interface CopyPackageVersionsResult {
  successfulVersions?: {
    [key: string]: SuccessfulPackageVersionInfo | undefined;
  };
  failedVersions?: { [key: string]: PackageVersionError | undefined };
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateDomainRequest {
  domain: string;
  encryptionKey?: string;
  tags?: Tag[];
}
export type DomainStatus = "Active" | "Deleted" | (string & {});
export interface DomainDescription {
  name?: string;
  owner?: string;
  arn?: string;
  status?: DomainStatus;
  createdTime?: Date;
  encryptionKey?: string;
  repositoryCount?: number;
  assetSizeBytes?: number;
  s3BucketArn?: string;
}
export interface CreateDomainResult {
  domain?: DomainDescription;
}
export type PackageGroupPattern = string;
export type PackageGroupContactInfo = string;
export interface CreatePackageGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  contactInfo?: string;
  description?: string;
  tags?: Tag[];
}
export type PackageGroupOriginRestrictionType =
  | "EXTERNAL_UPSTREAM"
  | "INTERNAL_UPSTREAM"
  | "PUBLISH"
  | (string & {});
export type PackageGroupOriginRestrictionMode =
  | "ALLOW"
  | "ALLOW_SPECIFIC_REPOSITORIES"
  | "BLOCK"
  | "INHERIT"
  | (string & {});
export interface PackageGroupReference {
  arn?: string;
  pattern?: string;
}
export interface PackageGroupOriginRestriction {
  mode?: PackageGroupOriginRestrictionMode;
  effectiveMode?: PackageGroupOriginRestrictionMode;
  inheritedFrom?: PackageGroupReference;
  repositoriesCount?: number;
}
export type PackageGroupOriginRestrictions = {
  [key in PackageGroupOriginRestrictionType]?: PackageGroupOriginRestriction;
};
export interface PackageGroupOriginConfiguration {
  restrictions?: { [key: string]: PackageGroupOriginRestriction | undefined };
}
export interface PackageGroupDescription {
  arn?: string;
  pattern?: string;
  domainName?: string;
  domainOwner?: string;
  createdTime?: Date;
  contactInfo?: string;
  description?: string;
  originConfiguration?: PackageGroupOriginConfiguration;
  parent?: PackageGroupReference;
}
export interface CreatePackageGroupResult {
  packageGroup?: PackageGroupDescription;
}
export interface UpstreamRepository {
  repositoryName: string;
}
export type UpstreamRepositoryList = UpstreamRepository[];
export interface CreateRepositoryRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  description?: string;
  upstreams?: UpstreamRepository[];
  tags?: Tag[];
}
export interface CreateRepositoryResult {
  repository?: RepositoryDescription;
}
export interface DeleteDomainRequest {
  domain: string;
  domainOwner?: string;
}
export interface DeleteDomainResult {
  domain?: DomainDescription;
}
export type PolicyRevision = string;
export interface DeleteDomainPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  policyRevision?: string;
}
export type PolicyDocument = string;
export interface ResourcePolicy {
  resourceArn?: string;
  revision?: string;
  document?: string;
}
export interface DeleteDomainPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export interface DeletePackageRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
}
export type AllowPublish = "ALLOW" | "BLOCK" | (string & {});
export type AllowUpstream = "ALLOW" | "BLOCK" | (string & {});
export interface PackageOriginRestrictions {
  publish: AllowPublish;
  upstream: AllowUpstream;
}
export interface PackageOriginConfiguration {
  restrictions?: PackageOriginRestrictions;
}
export interface PackageSummary {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  originConfiguration?: PackageOriginConfiguration;
}
export interface DeletePackageResult {
  deletedPackage?: PackageSummary;
}
export interface DeletePackageGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
}
export interface DeletePackageGroupResult {
  packageGroup?: PackageGroupDescription;
}
export interface DeletePackageVersionsRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  versions: string[];
  expectedStatus?: PackageVersionStatus;
}
export interface DeletePackageVersionsResult {
  successfulVersions?: {
    [key: string]: SuccessfulPackageVersionInfo | undefined;
  };
  failedVersions?: { [key: string]: PackageVersionError | undefined };
}
export interface DeleteRepositoryRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
}
export interface DeleteRepositoryResult {
  repository?: RepositoryDescription;
}
export interface DeleteRepositoryPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  policyRevision?: string;
}
export interface DeleteRepositoryPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export interface DescribeDomainRequest {
  domain: string;
  domainOwner?: string;
}
export interface DescribeDomainResult {
  domain?: DomainDescription;
}
export interface DescribePackageRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
}
export interface PackageDescription {
  format?: PackageFormat;
  namespace?: string;
  name?: string;
  originConfiguration?: PackageOriginConfiguration;
}
export interface DescribePackageResult {
  package: PackageDescription;
}
export interface DescribePackageGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
}
export interface DescribePackageGroupResult {
  packageGroup?: PackageGroupDescription;
}
export interface DescribePackageVersionRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
}
export type String255 = string;
export interface LicenseInfo {
  name?: string;
  url?: string;
}
export type LicenseInfoList = LicenseInfo[];
export interface DomainEntryPoint {
  repositoryName?: string;
  externalConnectionName?: string;
}
export type PackageVersionOriginType =
  | "INTERNAL"
  | "EXTERNAL"
  | "UNKNOWN"
  | (string & {});
export interface PackageVersionOrigin {
  domainEntryPoint?: DomainEntryPoint;
  originType?: PackageVersionOriginType;
}
export interface PackageVersionDescription {
  format?: PackageFormat;
  namespace?: string;
  packageName?: string;
  displayName?: string;
  version?: string;
  summary?: string;
  homePage?: string;
  sourceCodeRepository?: string;
  publishedTime?: Date;
  licenses?: LicenseInfo[];
  revision?: string;
  status?: PackageVersionStatus;
  origin?: PackageVersionOrigin;
}
export interface DescribePackageVersionResult {
  packageVersion: PackageVersionDescription;
}
export interface DescribeRepositoryRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
}
export interface DescribeRepositoryResult {
  repository?: RepositoryDescription;
}
export interface DisassociateExternalConnectionRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  externalConnection: string;
}
export interface DisassociateExternalConnectionResult {
  repository?: RepositoryDescription;
}
export interface DisposePackageVersionsRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  versions: string[];
  versionRevisions?: { [key: string]: string | undefined };
  expectedStatus?: PackageVersionStatus;
}
export interface DisposePackageVersionsResult {
  successfulVersions?: {
    [key: string]: SuccessfulPackageVersionInfo | undefined;
  };
  failedVersions?: { [key: string]: PackageVersionError | undefined };
}
export interface GetAssociatedPackageGroupRequest {
  domain: string;
  domainOwner?: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
}
export type PackageGroupAssociationType = "STRONG" | "WEAK" | (string & {});
export interface GetAssociatedPackageGroupResult {
  packageGroup?: PackageGroupDescription;
  associationType?: PackageGroupAssociationType;
}
export type AuthorizationTokenDurationSeconds = number;
export interface GetAuthorizationTokenRequest {
  domain: string;
  domainOwner?: string;
  durationSeconds?: number;
}
export interface GetAuthorizationTokenResult {
  authorizationToken?: string | redacted.Redacted<string>;
  expiration?: Date;
}
export interface GetDomainPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
}
export interface GetDomainPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export type AssetName = string;
export interface GetPackageVersionAssetRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
  asset: string;
  packageVersionRevision?: string;
}
export interface GetPackageVersionAssetResult {
  asset?: T.StreamingOutputBody;
  assetName?: string;
  packageVersion?: string;
  packageVersionRevision?: string;
}
export interface GetPackageVersionReadmeRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
}
export interface GetPackageVersionReadmeResult {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  version?: string;
  versionRevision?: string;
  readme?: string;
}
export type EndpointType = "dualstack" | "ipv4" | (string & {});
export interface GetRepositoryEndpointRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  endpointType?: EndpointType;
}
export interface GetRepositoryEndpointResult {
  repositoryEndpoint?: string;
}
export interface GetRepositoryPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
}
export interface GetRepositoryPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export type ListAllowedRepositoriesForGroupMaxResults = number;
export type PaginationToken = string;
export interface ListAllowedRepositoriesForGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  originRestrictionType: PackageGroupOriginRestrictionType;
  maxResults?: number;
  nextToken?: string;
}
export type RepositoryNameList = string[];
export interface ListAllowedRepositoriesForGroupResult {
  allowedRepositories?: string[];
  nextToken?: string;
}
export type ListPackagesMaxResults = number;
export interface ListAssociatedPackagesRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  maxResults?: number;
  nextToken?: string;
  preview?: boolean;
}
export interface AssociatedPackage {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  associationType?: PackageGroupAssociationType;
}
export type AssociatedPackageList = AssociatedPackage[];
export interface ListAssociatedPackagesResult {
  packages?: AssociatedPackage[];
  nextToken?: string;
}
export type ListDomainsMaxResults = number;
export interface ListDomainsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface DomainSummary {
  name?: string;
  owner?: string;
  arn?: string;
  status?: DomainStatus;
  createdTime?: Date;
  encryptionKey?: string;
}
export type DomainSummaryList = DomainSummary[];
export interface ListDomainsResult {
  domains?: DomainSummary[];
  nextToken?: string;
}
export type ListPackageGroupsMaxResults = number;
export type PackageGroupPatternPrefix = string;
export interface ListPackageGroupsRequest {
  domain: string;
  domainOwner?: string;
  maxResults?: number;
  nextToken?: string;
  prefix?: string;
}
export interface PackageGroupSummary {
  arn?: string;
  pattern?: string;
  domainName?: string;
  domainOwner?: string;
  createdTime?: Date;
  contactInfo?: string;
  description?: string;
  originConfiguration?: PackageGroupOriginConfiguration;
  parent?: PackageGroupReference;
}
export type PackageGroupSummaryList = PackageGroupSummary[];
export interface ListPackageGroupsResult {
  packageGroups?: PackageGroupSummary[];
  nextToken?: string;
}
export interface ListPackagesRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format?: PackageFormat;
  namespace?: string;
  packagePrefix?: string;
  maxResults?: number;
  nextToken?: string;
  publish?: AllowPublish;
  upstream?: AllowUpstream;
}
export type PackageSummaryList = PackageSummary[];
export interface ListPackagesResult {
  packages?: PackageSummary[];
  nextToken?: string;
}
export type ListPackageVersionAssetsMaxResults = number;
export interface ListPackageVersionAssetsRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
  maxResults?: number;
  nextToken?: string;
}
export type HashAlgorithm =
  | "MD5"
  | "SHA-1"
  | "SHA-256"
  | "SHA-512"
  | (string & {});
export type HashValue = string;
export type AssetHashes = { [key in HashAlgorithm]?: string };
export interface AssetSummary {
  name: string;
  size?: number;
  hashes?: { [key: string]: string | undefined };
}
export type AssetSummaryList = AssetSummary[];
export interface ListPackageVersionAssetsResult {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  version?: string;
  versionRevision?: string;
  nextToken?: string;
  assets?: AssetSummary[];
}
export interface ListPackageVersionDependenciesRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
  nextToken?: string;
}
export interface PackageDependency {
  namespace?: string;
  package?: string;
  dependencyType?: string;
  versionRequirement?: string;
}
export type PackageDependencyList = PackageDependency[];
export interface ListPackageVersionDependenciesResult {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  version?: string;
  versionRevision?: string;
  nextToken?: string;
  dependencies?: PackageDependency[];
}
export type PackageVersionSortType = "PUBLISHED_TIME" | (string & {});
export type ListPackageVersionsMaxResults = number;
export interface ListPackageVersionsRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  status?: PackageVersionStatus;
  sortBy?: PackageVersionSortType;
  maxResults?: number;
  nextToken?: string;
  originType?: PackageVersionOriginType;
}
export interface PackageVersionSummary {
  version: string;
  revision?: string;
  status: PackageVersionStatus;
  origin?: PackageVersionOrigin;
}
export type PackageVersionSummaryList = PackageVersionSummary[];
export interface ListPackageVersionsResult {
  defaultDisplayVersion?: string;
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  versions?: PackageVersionSummary[];
  nextToken?: string;
}
export type ListRepositoriesMaxResults = number;
export interface ListRepositoriesRequest {
  repositoryPrefix?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface RepositorySummary {
  name?: string;
  administratorAccount?: string;
  domainName?: string;
  domainOwner?: string;
  arn?: string;
  description?: string;
  createdTime?: Date;
}
export type RepositorySummaryList = RepositorySummary[];
export interface ListRepositoriesResult {
  repositories?: RepositorySummary[];
  nextToken?: string;
}
export type ListRepositoriesInDomainMaxResults = number;
export interface ListRepositoriesInDomainRequest {
  domain: string;
  domainOwner?: string;
  administratorAccount?: string;
  repositoryPrefix?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListRepositoriesInDomainResult {
  repositories?: RepositorySummary[];
  nextToken?: string;
}
export interface ListSubPackageGroupsRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListSubPackageGroupsResult {
  packageGroups?: PackageGroupSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResult {
  tags?: Tag[];
}
export type SHA256 = string;
export interface PublishPackageVersionRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
  assetContent: T.StreamingInputBody;
  assetName: string;
  assetSHA256: string;
  unfinished?: boolean;
}
export interface PublishPackageVersionResult {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  version?: string;
  versionRevision?: string;
  status?: PackageVersionStatus;
  asset?: AssetSummary;
}
export interface PutDomainPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  policyRevision?: string;
  policyDocument: string;
}
export interface PutDomainPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export interface PutPackageOriginConfigurationRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  restrictions: PackageOriginRestrictions;
}
export interface PutPackageOriginConfigurationResult {
  originConfiguration?: PackageOriginConfiguration;
}
export interface PutRepositoryPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  policyRevision?: string;
  policyDocument: string;
}
export interface PutRepositoryPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResult {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResult {}
export interface UpdatePackageGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  contactInfo?: string;
  description?: string;
}
export interface UpdatePackageGroupResult {
  packageGroup?: PackageGroupDescription;
}
export type OriginRestrictions = {
  [
    key in PackageGroupOriginRestrictionType
  ]?: PackageGroupOriginRestrictionMode;
};
export interface PackageGroupAllowedRepository {
  repositoryName?: string;
  originRestrictionType?: PackageGroupOriginRestrictionType;
}
export type PackageGroupAllowedRepositoryList = PackageGroupAllowedRepository[];
export interface UpdatePackageGroupOriginConfigurationRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  restrictions?: {
    [key: string]: PackageGroupOriginRestrictionMode | undefined;
  };
  addAllowedRepositories?: PackageGroupAllowedRepository[];
  removeAllowedRepositories?: PackageGroupAllowedRepository[];
}
export type PackageGroupAllowedRepositoryUpdateType =
  | "ADDED"
  | "REMOVED"
  | (string & {});
export type PackageGroupAllowedRepositoryUpdate = {
  [key in PackageGroupAllowedRepositoryUpdateType]?: string[];
};
export type PackageGroupAllowedRepositoryUpdates = {
  [key in PackageGroupOriginRestrictionType]?: {
    [key: string]: string[] | undefined;
  };
};
export interface UpdatePackageGroupOriginConfigurationResult {
  packageGroup?: PackageGroupDescription;
  allowedRepositoryUpdates?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export interface UpdatePackageVersionsStatusRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  versions: string[];
  versionRevisions?: { [key: string]: string | undefined };
  expectedStatus?: PackageVersionStatus;
  targetStatus: PackageVersionStatus;
}
export interface UpdatePackageVersionsStatusResult {
  successfulVersions?: {
    [key: string]: SuccessfulPackageVersionInfo | undefined;
  };
  failedVersions?: { [key: string]: PackageVersionError | undefined };
}
export interface UpdateRepositoryRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  description?: string;
  upstreams?: UpstreamRepository[];
}
export interface UpdateRepositoryResult {
  repository?: RepositoryDescription;
}
export type ResourceType =
  | "domain"
  | "repository"
  | "package"
  | "package-version"
  | "asset"
  | (string & {});
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "CANNOT_PARSE"
  | "ENCRYPTION_KEY_ERROR"
  | "FIELD_VALIDATION_FAILED"
  | "UNKNOWN_OPERATION"
  | "OTHER"
  | (string & {});
export type AssociateExternalConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds an existing external connection to a repository. One external connection is allowed
 * per repository.
 *
 * A repository can have one or more upstream repositories, or an external connection.
 */
export const associateExternalConnection: API.OperationMethod<
  AssociateExternalConnectionRequest,
  AssociateExternalConnectionResult,
  AssociateExternalConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/repository/external-connection",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      externalConnection: D.m({ query: "external-connection" }),
    },
    output: { repository: o_RepositoryDescription },
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
  operationName: "AssociateExternalConnection",
})) as any;

export type CopyPackageVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Copies package versions from one repository to another repository in the same domain.
 *
 * You must specify `versions` or `versionRevisions`. You cannot specify both.
 */
export const copyPackageVersions: API.OperationMethod<
  CopyPackageVersionsRequest,
  CopyPackageVersionsResult,
  CopyPackageVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package/versions/copy",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      sourceRepository: D.m({ query: "source-repository" }),
      destinationRepository: D.m({ query: "destination-repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      versions: 0,
      versionRevisions: 0,
      allowOverwrite: 0,
      includeFromUpstream: 0,
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
  operationName: "CopyPackageVersions",
})) as any;

export type CreateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain. CodeArtifact *domains* make it easier to manage multiple repositories across an
 * organization. You can use a domain to apply permissions across many
 * repositories owned by different Amazon Web Services accounts. An asset is stored only once
 * in a domain, even if it's in multiple repositories.
 *
 * Although you can have multiple domains, we recommend a single production domain that contains all
 * published artifacts so that your development teams can find and share packages. You can use a second
 * pre-production domain to test changes to the production domain configuration.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResult,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/domain",
    input: {
      domain: D.m({ query: "domain" }),
      encryptionKey: 0,
      tags: D.list(i_Tag),
    },
    output: { domain: o_DomainDescription },
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
  operationName: "CreateDomain",
})) as any;

export type CreatePackageGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a package group. For more information about creating package groups, including example CLI commands, see Create a package group in the *CodeArtifact User Guide*.
 */
export const createPackageGroup: API.OperationMethod<
  CreatePackageGroupRequest,
  CreatePackageGroupResult,
  CreatePackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package-group",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      packageGroup: 0,
      contactInfo: 0,
      description: 0,
      tags: D.list(i_Tag),
    },
    output: { packageGroup: o_PackageGroupDescription },
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
  operationName: "CreatePackageGroup",
})) as any;

export type CreateRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a repository.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryRequest,
  CreateRepositoryResult,
  CreateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/repository",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      description: 0,
      upstreams: D.list(i_UpstreamRepository),
      tags: D.list(i_Tag),
    },
    output: { repository: o_RepositoryDescription },
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
  operationName: "CreateRepository",
})) as any;

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a domain. You cannot delete a domain that contains repositories. If you want to delete a domain
 * with repositories, first delete its repositories.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResult,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/domain",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
    },
    output: { domain: o_DomainDescription },
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
  operationName: "DeleteDomain",
})) as any;

export type DeleteDomainPermissionsPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy set on a domain.
 */
export const deleteDomainPermissionsPolicy: API.OperationMethod<
  DeleteDomainPermissionsPolicyRequest,
  DeleteDomainPermissionsPolicyResult,
  DeleteDomainPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/domain/permissions/policy",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      policyRevision: D.m({ query: "policy-revision" }),
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
  operationName: "DeleteDomainPermissionsPolicy",
})) as any;

export type DeletePackageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a package and all associated package versions. A deleted package cannot be restored. To delete one or more package versions, use the
 * DeletePackageVersions API.
 */
export const deletePackage: API.OperationMethod<
  DeletePackageRequest,
  DeletePackageResult,
  DeletePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/package",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
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
  operationName: "DeletePackage",
})) as any;

export type DeletePackageGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a package group.
 * Deleting a package group does not delete packages or package versions associated with the package group.
 * When a package group is deleted, the direct child package groups will become children of the package
 * group's direct parent package group. Therefore, if any of the child groups are inheriting any settings
 * from the parent, those settings could change.
 */
export const deletePackageGroup: API.OperationMethod<
  DeletePackageGroupRequest,
  DeletePackageGroupResult,
  DeletePackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/package-group",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      packageGroup: D.m({ query: "package-group" }),
    },
    output: { packageGroup: o_PackageGroupDescription },
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
  operationName: "DeletePackageGroup",
})) as any;

export type DeletePackageVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one or more versions of a package. A deleted package version cannot be restored
 * in your repository. If you want to remove a package version from your repository and be able
 * to restore it later, set its status to `Archived`. Archived packages cannot be
 * downloaded from a repository and don't show up with list package APIs (for example,
 * ListPackageVersions), but you can restore them using UpdatePackageVersionsStatus.
 */
export const deletePackageVersions: API.OperationMethod<
  DeletePackageVersionsRequest,
  DeletePackageVersionsResult,
  DeletePackageVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package/versions/delete",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      versions: 0,
      expectedStatus: 0,
    },
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
  operationName: "DeletePackageVersions",
})) as any;

export type DeleteRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a repository.
 */
export const deleteRepository: API.OperationMethod<
  DeleteRepositoryRequest,
  DeleteRepositoryResult,
  DeleteRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/repository",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
    },
    output: { repository: o_RepositoryDescription },
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
  operationName: "DeleteRepository",
})) as any;

export type DeleteRepositoryPermissionsPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy that is set on a repository. After a resource policy is deleted, the
 * permissions allowed and denied by the deleted policy are removed. The effect of deleting a resource policy might not be immediate.
 *
 * Use `DeleteRepositoryPermissionsPolicy` with caution. After a policy is deleted, Amazon Web Services users, roles, and accounts lose permissions to perform
 * the repository actions granted by the deleted policy.
 */
export const deleteRepositoryPermissionsPolicy: API.OperationMethod<
  DeleteRepositoryPermissionsPolicyRequest,
  DeleteRepositoryPermissionsPolicyResult,
  DeleteRepositoryPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/repository/permissions/policies",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      policyRevision: D.m({ query: "policy-revision" }),
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
  operationName: "DeleteRepositoryPermissionsPolicy",
})) as any;

export type DescribeDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a
 * DomainDescription
 * object that contains information about the requested domain.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainRequest,
  DescribeDomainResult,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/domain",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
    },
    output: { domain: o_DomainDescription },
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
  operationName: "DescribeDomain",
})) as any;

export type DescribePackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a
 * PackageDescription
 * object that contains information about the requested package.
 */
export const describePackage: API.OperationMethod<
  DescribePackageRequest,
  DescribePackageResult,
  DescribePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/package",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
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
  operationName: "DescribePackage",
})) as any;

export type DescribePackageGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a PackageGroupDescription object that
 * contains information about the requested package group.
 */
export const describePackageGroup: API.OperationMethod<
  DescribePackageGroupRequest,
  DescribePackageGroupResult,
  DescribePackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/package-group",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      packageGroup: D.m({ query: "package-group" }),
    },
    output: { packageGroup: o_PackageGroupDescription },
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
  operationName: "DescribePackageGroup",
})) as any;

export type DescribePackageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a
 * PackageVersionDescription
 * object that contains information about the requested package version.
 */
export const describePackageVersion: API.OperationMethod<
  DescribePackageVersionRequest,
  DescribePackageVersionResult,
  DescribePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/package/version",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      packageVersion: D.m({ query: "version" }),
    },
    output: { packageVersion: { publishedTime: D.ts } },
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
  operationName: "DescribePackageVersion",
})) as any;

export type DescribeRepositoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a `RepositoryDescription` object that contains detailed information
 * about the requested repository.
 */
export const describeRepository: API.OperationMethod<
  DescribeRepositoryRequest,
  DescribeRepositoryResult,
  DescribeRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/repository",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
    },
    output: { repository: o_RepositoryDescription },
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
  operationName: "DescribeRepository",
})) as any;

export type DisassociateExternalConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an existing external connection from a repository.
 */
export const disassociateExternalConnection: API.OperationMethod<
  DisassociateExternalConnectionRequest,
  DisassociateExternalConnectionResult,
  DisassociateExternalConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/repository/external-connection",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      externalConnection: D.m({ query: "external-connection" }),
    },
    output: { repository: o_RepositoryDescription },
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
  operationName: "DisassociateExternalConnection",
})) as any;

export type DisposePackageVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the assets in package versions and sets the package versions' status to `Disposed`.
 * A disposed package version cannot be restored in your repository because its assets are deleted.
 *
 * To view all disposed package versions in a repository, use ListPackageVersions and set the
 * status parameter
 * to `Disposed`.
 *
 * To view information about a disposed package version, use DescribePackageVersion.
 */
export const disposePackageVersions: API.OperationMethod<
  DisposePackageVersionsRequest,
  DisposePackageVersionsResult,
  DisposePackageVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package/versions/dispose",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      versions: 0,
      versionRevisions: 0,
      expectedStatus: 0,
    },
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
  operationName: "DisposePackageVersions",
})) as any;

export type GetAssociatedPackageGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the most closely associated package group to the specified package. This API does not require that the package exist
 * in any repository in the domain. As such, `GetAssociatedPackageGroup` can be used to see which package group's origin configuration
 * applies to a package before that package is in a repository. This can be helpful to check if public packages are blocked without ingesting them.
 *
 * For information package group association and matching, see
 * Package group
 * definition syntax and matching behavior in the *CodeArtifact User Guide*.
 */
export const getAssociatedPackageGroup: API.OperationMethod<
  GetAssociatedPackageGroupRequest,
  GetAssociatedPackageGroupResult,
  GetAssociatedPackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/get-associated-package-group",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
    },
    output: { packageGroup: o_PackageGroupDescription },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedPackageGroup",
})) as any;

export type GetAuthorizationTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a temporary authorization token for accessing repositories in the domain.
 * This API requires the `codeartifact:GetAuthorizationToken` and `sts:GetServiceBearerToken` permissions.
 * For more information about authorization tokens, see
 * CodeArtifact authentication and tokens.
 *
 * CodeArtifact authorization tokens are valid for a period of 12 hours when created with the `login` command.
 * You can call `login` periodically to refresh the token. When
 * you create an authorization token with the `GetAuthorizationToken` API, you can set a custom authorization period,
 * up to a maximum of 12 hours, with the `durationSeconds` parameter.
 *
 * The authorization period begins after `login`
 * or `GetAuthorizationToken` is called. If `login` or `GetAuthorizationToken` is called while
 * assuming a role, the token lifetime is independent of the maximum session duration
 * of the role. For example, if you call `sts assume-role` and specify a session duration of 15 minutes, then
 * generate a CodeArtifact authorization token, the token will be valid for the full authorization period
 * even though this is longer than the 15-minute session duration.
 *
 * See
 * Using IAM Roles
 * for more information on controlling session duration.
 */
export const getAuthorizationToken: API.OperationMethod<
  GetAuthorizationTokenRequest,
  GetAuthorizationTokenResult,
  GetAuthorizationTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/authorization-token",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      durationSeconds: D.m({ query: "duration" }),
    },
    output: { authorizationToken: D.secret, expiration: D.ts },
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
  operationName: "GetAuthorizationToken",
})) as any;

export type GetDomainPermissionsPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource policy attached to the specified domain.
 *
 * The policy is a resource-based policy, not an identity-based policy. For more information, see
 * Identity-based policies
 * and resource-based policies in the *IAM User Guide*.
 */
export const getDomainPermissionsPolicy: API.OperationMethod<
  GetDomainPermissionsPolicyRequest,
  GetDomainPermissionsPolicyResult,
  GetDomainPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/domain/permissions/policy",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
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
  operationName: "GetDomainPermissionsPolicy",
})) as any;

export type GetPackageVersionAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an asset (or file) that is in a package. For example, for a Maven package version, use
 * `GetPackageVersionAsset` to download a `JAR` file, a `POM` file,
 * or any other assets in the package version.
 */
export const getPackageVersionAsset: API.OperationMethod<
  GetPackageVersionAssetRequest,
  GetPackageVersionAssetResult,
  GetPackageVersionAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/package/version/asset",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      packageVersion: D.m({ query: "version" }),
      asset: D.m({ query: "asset" }),
      packageVersionRevision: D.m({ query: "revision" }),
    },
    output: {
      asset: D.m({ payload: true, shape: D.stream }),
      assetName: D.m({ header: "X-AssetName" }),
      packageVersion: D.m({ header: "X-PackageVersion" }),
      packageVersionRevision: D.m({ header: "X-PackageVersionRevision" }),
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
  operationName: "GetPackageVersionAsset",
})) as any;

export type GetPackageVersionReadmeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the readme file or descriptive text for a package version.
 *
 * The returned text might contain formatting. For example, it might contain formatting for Markdown or reStructuredText.
 */
export const getPackageVersionReadme: API.OperationMethod<
  GetPackageVersionReadmeRequest,
  GetPackageVersionReadmeResult,
  GetPackageVersionReadmeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/package/version/readme",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      packageVersion: D.m({ query: "version" }),
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
  operationName: "GetPackageVersionReadme",
})) as any;

export type GetRepositoryEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the endpoint of a repository for a specific package format. A repository has one endpoint for each
 * package format:
 *
 * - `cargo`
 *
 * - `generic`
 *
 * - `maven`
 *
 * - `npm`
 *
 * - `nuget`
 *
 * - `pypi`
 *
 * - `ruby`
 *
 * - `swift`
 */
export const getRepositoryEndpoint: API.OperationMethod<
  GetRepositoryEndpointRequest,
  GetRepositoryEndpointResult,
  GetRepositoryEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/repository/endpoint",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      endpointType: D.m({ query: "endpointType" }),
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
  operationName: "GetRepositoryEndpoint",
})) as any;

export type GetRepositoryPermissionsPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource policy that is set on a repository.
 */
export const getRepositoryPermissionsPolicy: API.OperationMethod<
  GetRepositoryPermissionsPolicyRequest,
  GetRepositoryPermissionsPolicyResult,
  GetRepositoryPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/repository/permissions/policy",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
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
  operationName: "GetRepositoryPermissionsPolicy",
})) as any;

export type ListAllowedRepositoriesForGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the repositories in the added repositories list of the specified restriction type for a package group. For more information about restriction types
 * and added repository lists, see Package group origin controls in the *CodeArtifact User Guide*.
 */
export const listAllowedRepositoriesForGroup: API.PaginatedOperationMethod<
  ListAllowedRepositoriesForGroupRequest,
  ListAllowedRepositoriesForGroupResult,
  ListAllowedRepositoriesForGroupError,
  Credentials | HttpClient.HttpClient,
  RepositoryName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/package-group-allowed-repositories",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      packageGroup: D.m({ query: "package-group" }),
      originRestrictionType: D.m({ query: "originRestrictionType" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
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
  operationName: "ListAllowedRepositoriesForGroup",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "allowedRepositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedPackagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of packages associated with the requested package group. For information package group association and matching, see
 * Package group
 * definition syntax and matching behavior in the *CodeArtifact User Guide*.
 */
export const listAssociatedPackages: API.PaginatedOperationMethod<
  ListAssociatedPackagesRequest,
  ListAssociatedPackagesResult,
  ListAssociatedPackagesError,
  Credentials | HttpClient.HttpClient,
  AssociatedPackage
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/list-associated-packages",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      packageGroup: D.m({ query: "package-group" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
      preview: D.m({ query: "preview" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of DomainSummary objects for all domains owned by the Amazon Web Services account that makes
 * this call. Each returned `DomainSummary` object contains information about a
 * domain.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResult,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/domains",
    input: { maxResults: 0, nextToken: 0 },
    output: { domains: D.list({ createdTime: D.ts }) },
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
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domains",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackageGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of package groups in the requested domain.
 */
export const listPackageGroups: API.PaginatedOperationMethod<
  ListPackageGroupsRequest,
  ListPackageGroupsResult,
  ListPackageGroupsError,
  Credentials | HttpClient.HttpClient,
  PackageGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package-groups",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
      prefix: D.m({ query: "prefix" }),
    },
    output: { packageGroups: D.list(o_PackageGroupSummary) },
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
  operationName: "ListPackageGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packageGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * PackageSummary
 * objects for packages in a repository that match the request parameters.
 */
export const listPackages: API.PaginatedOperationMethod<
  ListPackagesRequest,
  ListPackagesResult,
  ListPackagesError,
  Credentials | HttpClient.HttpClient,
  PackageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/packages",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      packagePrefix: D.m({ query: "package-prefix" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
      publish: D.m({ query: "publish" }),
      upstream: D.m({ query: "upstream" }),
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
  operationName: "ListPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackageVersionAssetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * AssetSummary
 * objects for assets in a package version.
 */
export const listPackageVersionAssets: API.PaginatedOperationMethod<
  ListPackageVersionAssetsRequest,
  ListPackageVersionAssetsResult,
  ListPackageVersionAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package/version/assets",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      packageVersion: D.m({ query: "version" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
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
  operationName: "ListPackageVersionAssets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackageVersionDependenciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the direct dependencies for a package version. The dependencies are returned as
 * PackageDependency
 * objects. CodeArtifact extracts the dependencies for a package version from the metadata file for the package
 * format (for example, the `package.json` file for npm packages and the `pom.xml` file
 * for Maven). Any package version dependencies that are not listed in the configuration file are not returned.
 */
export const listPackageVersionDependencies: API.OperationMethod<
  ListPackageVersionDependenciesRequest,
  ListPackageVersionDependenciesResult,
  ListPackageVersionDependenciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package/version/dependencies",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      packageVersion: D.m({ query: "version" }),
      nextToken: D.m({ query: "next-token" }),
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
  operationName: "ListPackageVersionDependencies",
})) as any;

export type ListPackageVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * PackageVersionSummary
 * objects for package versions in a repository that match the request parameters. Package versions of all statuses will be returned by default when calling `list-package-versions` with no `--status` parameter.
 */
export const listPackageVersions: API.PaginatedOperationMethod<
  ListPackageVersionsRequest,
  ListPackageVersionsResult,
  ListPackageVersionsError,
  Credentials | HttpClient.HttpClient,
  PackageVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package/versions",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      status: D.m({ query: "status" }),
      sortBy: D.m({ query: "sortBy" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
      originType: D.m({ query: "originType" }),
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
  operationName: "ListPackageVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositoriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * RepositorySummary
 * objects. Each `RepositorySummary` contains information about a repository in the specified Amazon Web Services account and that matches the input
 * parameters.
 */
export const listRepositories: API.PaginatedOperationMethod<
  ListRepositoriesRequest,
  ListRepositoriesResult,
  ListRepositoriesError,
  Credentials | HttpClient.HttpClient,
  RepositorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/repositories",
    input: {
      repositoryPrefix: D.m({ query: "repository-prefix" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
    },
    output: { repositories: D.list(o_RepositorySummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositoriesInDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * RepositorySummary
 * objects. Each `RepositorySummary` contains information about a repository in the specified domain and that matches the input
 * parameters.
 */
export const listRepositoriesInDomain: API.PaginatedOperationMethod<
  ListRepositoriesInDomainRequest,
  ListRepositoriesInDomainResult,
  ListRepositoriesInDomainError,
  Credentials | HttpClient.HttpClient,
  RepositorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/domain/repositories",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      administratorAccount: D.m({ query: "administrator-account" }),
      repositoryPrefix: D.m({ query: "repository-prefix" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
    },
    output: { repositories: D.list(o_RepositorySummary) },
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
  operationName: "ListRepositoriesInDomain",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubPackageGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of direct children of the specified package group.
 *
 * For information package group hierarchy, see
 * Package group
 * definition syntax and matching behavior in the *CodeArtifact User Guide*.
 */
export const listSubPackageGroups: API.PaginatedOperationMethod<
  ListSubPackageGroupsRequest,
  ListSubPackageGroupsResult,
  ListSubPackageGroupsError,
  Credentials | HttpClient.HttpClient,
  PackageGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package-groups/sub-groups",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      packageGroup: D.m({ query: "package-group" }),
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
    },
    output: { packageGroups: D.list(o_PackageGroupSummary) },
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
  operationName: "ListSubPackageGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packageGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about Amazon Web Services tags for a specified Amazon Resource Name (ARN) in CodeArtifact.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/tags",
    input: { resourceArn: D.m({ query: "resourceArn" }) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PublishPackageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new package version containing one or more assets (or files).
 *
 * The `unfinished` flag can be used to keep the package version in the
 * `Unfinished` state until all of its assets have been uploaded (see Package version status in the *CodeArtifact user guide*). To set
 * the package version’s status to `Published`, omit the `unfinished` flag
 * when uploading the final asset, or set the status using UpdatePackageVersionStatus. Once a package version’s status is set to
 * `Published`, it cannot change back to `Unfinished`.
 *
 * Only generic packages can be published using this API. For more information, see Using generic
 * packages in the *CodeArtifact User Guide*.
 */
export const publishPackageVersion: API.OperationMethod<
  PublishPackageVersionRequest,
  PublishPackageVersionResult,
  PublishPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package/version/publish",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      packageVersion: D.m({ query: "version" }),
      assetContent: D.m({ payload: true, shape: D.stream }),
      assetName: D.m({ query: "asset" }),
      assetSHA256: D.m({ header: "x-amz-content-sha256" }),
      unfinished: D.m({ query: "unfinished" }),
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
  operationName: "PublishPackageVersion",
})) as any;

export type PutDomainPermissionsPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets a resource policy on a domain that specifies permissions to access it.
 *
 * When you call `PutDomainPermissionsPolicy`, the resource policy on the domain is ignored when evaluting permissions.
 * This ensures that the owner of a domain cannot lock themselves out of the domain, which would prevent them from being
 * able to update the resource policy.
 */
export const putDomainPermissionsPolicy: API.OperationMethod<
  PutDomainPermissionsPolicyRequest,
  PutDomainPermissionsPolicyResult,
  PutDomainPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/domain/permissions/policy",
    input: { domain: 0, domainOwner: 0, policyRevision: 0, policyDocument: 0 },
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
  operationName: "PutDomainPermissionsPolicy",
})) as any;

export type PutPackageOriginConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the package origin configuration for a package.
 *
 * The package origin configuration determines how new versions of a package can be added to a repository. You can allow or block direct
 * publishing of new package versions, or ingestion and retaining of new package versions from an external connection or upstream source.
 * For more information about package origin controls and configuration, see Editing package origin controls in the *CodeArtifact User Guide*.
 *
 * `PutPackageOriginConfiguration` can be called on a package that doesn't yet exist in the repository. When called
 * on a package that does not exist, a package is created in the repository with no versions and the requested restrictions are set on the package.
 * This can be used to preemptively block ingesting or retaining any versions from external connections or upstream repositories, or to block
 * publishing any versions of the package into the repository before connecting any package managers or publishers to the repository.
 */
export const putPackageOriginConfiguration: API.OperationMethod<
  PutPackageOriginConfigurationRequest,
  PutPackageOriginConfigurationResult,
  PutPackageOriginConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      restrictions: { publish: 0, upstream: 0 },
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
  operationName: "PutPackageOriginConfiguration",
})) as any;

export type PutRepositoryPermissionsPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the resource policy on a repository that specifies permissions to access it.
 *
 * When you call `PutRepositoryPermissionsPolicy`, the resource policy on the repository is ignored when evaluting permissions.
 * This ensures that the owner of a repository cannot lock themselves out of the repository, which would prevent them from being
 * able to update the resource policy.
 */
export const putRepositoryPermissionsPolicy: API.OperationMethod<
  PutRepositoryPermissionsPolicyRequest,
  PutRepositoryPermissionsPolicyResult,
  PutRepositoryPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/repository/permissions/policy",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      policyRevision: 0,
      policyDocument: 0,
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
  operationName: "PutRepositoryPermissionsPolicy",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a resource in CodeArtifact.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/tag",
    input: { resourceArn: D.m({ query: "resourceArn" }), tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource in CodeArtifact.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/untag",
    input: { resourceArn: D.m({ query: "resourceArn" }), tagKeys: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdatePackageGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a package group. This API cannot be used to update a package group's origin configuration or pattern. To update a
 * package group's origin configuration, use UpdatePackageGroupOriginConfiguration.
 */
export const updatePackageGroup: API.OperationMethod<
  UpdatePackageGroupRequest,
  UpdatePackageGroupResult,
  UpdatePackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/package-group",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      packageGroup: 0,
      contactInfo: 0,
      description: 0,
    },
    output: { packageGroup: o_PackageGroupDescription },
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
  operationName: "UpdatePackageGroup",
})) as any;

export type UpdatePackageGroupOriginConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the package origin configuration for a package group.
 *
 * The package origin configuration determines how new versions of a package can be added to a repository. You can allow or block direct
 * publishing of new package versions, or ingestion and retaining of new package versions from an external connection or upstream source.
 * For more information about package group origin controls and configuration, see
 * Package group origin controls
 * in the *CodeArtifact User Guide*.
 */
export const updatePackageGroupOriginConfiguration: API.OperationMethod<
  UpdatePackageGroupOriginConfigurationRequest,
  UpdatePackageGroupOriginConfigurationResult,
  UpdatePackageGroupOriginConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/package-group-origin-configuration",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      packageGroup: D.m({ query: "package-group" }),
      restrictions: 0,
      addAllowedRepositories: D.list(i_PackageGroupAllowedRepository),
      removeAllowedRepositories: D.list(i_PackageGroupAllowedRepository),
    },
    output: { packageGroup: o_PackageGroupDescription },
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
  operationName: "UpdatePackageGroupOriginConfiguration",
})) as any;

export type UpdatePackageVersionsStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of one or more versions of a package. Using `UpdatePackageVersionsStatus`,
 * you can update the status of package versions to `Archived`, `Published`, or `Unlisted`.
 * To set the status of a package version to `Disposed`, use
 * DisposePackageVersions.
 */
export const updatePackageVersionsStatus: API.OperationMethod<
  UpdatePackageVersionsStatusRequest,
  UpdatePackageVersionsStatusResult,
  UpdatePackageVersionsStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/package/versions/update_status",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      format: D.m({ query: "format" }),
      namespace: D.m({ query: "namespace" }),
      package: D.m({ query: "package" }),
      versions: 0,
      versionRevisions: 0,
      expectedStatus: 0,
      targetStatus: 0,
    },
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
  operationName: "UpdatePackageVersionsStatus",
})) as any;

export type UpdateRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the properties of a repository.
 */
export const updateRepository: API.OperationMethod<
  UpdateRepositoryRequest,
  UpdateRepositoryResult,
  UpdateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/repository",
    input: {
      domain: D.m({ query: "domain" }),
      domainOwner: D.m({ query: "domain-owner" }),
      repository: D.m({ query: "repository" }),
      description: 0,
      upstreams: D.list(i_UpstreamRepository),
    },
    output: { repository: o_RepositoryDescription },
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
  operationName: "UpdateRepository",
})) as any;

const i_PackageGroupAllowedRepository: D.LazyStruct = () => ({
  repositoryName: 0,
  originRestrictionType: 0,
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_UpstreamRepository: D.LazyStruct = () => ({ repositoryName: 0 });
const o_DomainDescription: D.LazyStruct = () => ({ createdTime: D.ts });
const o_PackageGroupDescription: D.LazyStruct = () => ({ createdTime: D.ts });
const o_PackageGroupSummary: D.LazyStruct = () => ({ createdTime: D.ts });
const o_RepositoryDescription: D.LazyStruct = () => ({ createdTime: D.ts });
const o_RepositorySummary: D.LazyStruct = () => ({ createdTime: D.ts });
