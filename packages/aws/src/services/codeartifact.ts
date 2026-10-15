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
  sdkId: "codeartifact",
  serviceShapeName: "CodeArtifactControlPlaneService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codeartifact" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-09-22");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codeartifact.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://codeartifact.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codeartifact.{R}.{D}","properties":{},"headers":{}}');

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
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ResourceType" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ResourceType" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ResourceType" }),
      ),
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
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type RepositoryExternalConnectionInfoList = RepositoryExternalConnectionInfo[];
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
export type PackageVersionErrorMap = { [key: string]: PackageVersionError | undefined };
export interface CopyPackageVersionsResult {
  successfulVersions?: { [key: string]: SuccessfulPackageVersionInfo | undefined };
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
  successfulVersions?: { [key: string]: SuccessfulPackageVersionInfo | undefined };
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
export type PackageVersionOriginType = "INTERNAL" | "EXTERNAL" | "UNKNOWN" | (string & {});
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
  successfulVersions?: { [key: string]: SuccessfulPackageVersionInfo | undefined };
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
export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512" | (string & {});
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
  [key in PackageGroupOriginRestrictionType]?: PackageGroupOriginRestrictionMode;
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
  restrictions?: { [key: string]: PackageGroupOriginRestrictionMode | undefined };
  addAllowedRepositories?: PackageGroupAllowedRepository[];
  removeAllowedRepositories?: PackageGroupAllowedRepository[];
}
export type PackageGroupAllowedRepositoryUpdateType = "ADDED" | "REMOVED" | (string & {});
export type PackageGroupAllowedRepositoryUpdate = {
  [key in PackageGroupAllowedRepositoryUpdateType]?: string[];
};
export type PackageGroupAllowedRepositoryUpdates = {
  [key in PackageGroupOriginRestrictionType]?: { [key: string]: string[] | undefined };
};
export interface UpdatePackageGroupOriginConfigurationResult {
  packageGroup?: PackageGroupDescription;
  allowedRepositoryUpdates?: { [key: string]: { [key: string]: string[] | undefined } | undefined };
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
  successfulVersions?: { [key: string]: SuccessfulPackageVersionInfo | undefined };
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
  input: __S(448, __c56, 0) as any as S.Schema<AssociateExternalConnectionRequest>,
  output: __S(461, __c57, 5) as any as S.Schema<AssociateExternalConnectionResult>,
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
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<CopyPackageVersionsRequest>,
  output: __S(484, __c60, 4) as any as S.Schema<CopyPackageVersionsResult>,
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
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<CreateDomainRequest>,
  output: __S(513, __c64, 1) as any as S.Schema<CreateDomainResult>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreatePackageGroupRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<CreatePackageGroupResult>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<CreateRepositoryRequest>,
  output: __S(461, __c57, 5) as any as S.Schema<CreateRepositoryResult>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<DeleteDomainRequest>,
  output: __S(513, __c64, 1) as any as S.Schema<DeleteDomainResult>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<DeleteDomainPermissionsPolicyRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<DeleteDomainPermissionsPolicyResult>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<DeletePackageRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<DeletePackageResult>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<DeletePackageGroupRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DeletePackageGroupResult>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<DeletePackageVersionsRequest>,
  output: __S(484, __c60, 4) as any as S.Schema<DeletePackageVersionsResult>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<DeleteRepositoryRequest>,
  output: __S(461, __c57, 5) as any as S.Schema<DeleteRepositoryResult>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<DeleteRepositoryPermissionsPolicyRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<DeleteRepositoryPermissionsPolicyResult>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<DescribeDomainRequest>,
  output: __S(513, __c64, 1) as any as S.Schema<DescribeDomainResult>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<DescribePackageRequest>,
  output: __S(130, __c16, 2) as any as S.Schema<DescribePackageResult>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<DescribePackageGroupRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DescribePackageGroupResult>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<DescribePackageVersionRequest>,
  output: __S(148, __c18, 4) as any as S.Schema<DescribePackageVersionResult>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<DescribeRepositoryRequest>,
  output: __S(461, __c57, 5) as any as S.Schema<DescribeRepositoryResult>,
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
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<DisassociateExternalConnectionRequest>,
  output: __S(461, __c57, 5) as any as S.Schema<DisassociateExternalConnectionResult>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<DisposePackageVersionsRequest>,
  output: __S(484, __c60, 4) as any as S.Schema<DisposePackageVersionsResult>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<GetAssociatedPackageGroupRequest>,
  output: __S(185, __c23, 1) as any as S.Schema<GetAssociatedPackageGroupResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedPackageGroup",
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<GetAuthorizationTokenRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<GetAuthorizationTokenResult>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<GetDomainPermissionsPolicyRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<GetDomainPermissionsPolicyResult>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<GetPackageVersionAssetRequest>,
  output: __S(209, __c26, 1) as any as S.Schema<GetPackageVersionAssetResult>,
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
}));

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
  input: __S(216, __c27, 0) as any as S.Schema<GetPackageVersionReadmeRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<GetPackageVersionReadmeResult>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<GetRepositoryEndpointRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<GetRepositoryEndpointResult>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<GetRepositoryPermissionsPolicyRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<GetRepositoryPermissionsPolicyResult>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<ListAllowedRepositoriesForGroupRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<ListAllowedRepositoriesForGroupResult>,
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
  input: __S(248, __c31, 0) as any as S.Schema<ListAssociatedPackagesRequest>,
  output: __S(251, __c31, 3) as any as S.Schema<ListAssociatedPackagesResult>,
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
  input: __S(256, __c32, 0) as any as S.Schema<ListDomainsRequest>,
  output: __S(259, __c32, 3) as any as S.Schema<ListDomainsResult>,
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
  input: __S(264, __c33, 0) as any as S.Schema<ListPackageGroupsRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<ListPackageGroupsResult>,
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
  input: __S(280, __c35, 0) as any as S.Schema<ListPackagesRequest>,
  output: __S(282, __c35, 2) as any as S.Schema<ListPackagesResult>,
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
  input: __S(288, __c36, 0) as any as S.Schema<ListPackageVersionAssetsRequest>,
  output: __S(290, __c36, 2) as any as S.Schema<ListPackageVersionAssetsResult>,
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
  input: __S(304, __c38, 0) as any as S.Schema<ListPackageVersionDependenciesRequest>,
  output: __S(307, __c38, 3) as any as S.Schema<ListPackageVersionDependenciesResult>,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<ListPackageVersionsRequest>,
  output: __S(315, __c39, 3) as any as S.Schema<ListPackageVersionsResult>,
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
  input: __S(320, __c40, 0) as any as S.Schema<ListRepositoriesRequest>,
  output: __S(330, __c41, 2) as any as S.Schema<ListRepositoriesResult>,
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
  input: __S(336, __c42, 0) as any as S.Schema<ListRepositoriesInDomainRequest>,
  output: __S(330, __c41, 2) as any as S.Schema<ListRepositoriesInDomainResult>,
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
  input: __S(344, __c43, 0) as any as S.Schema<ListSubPackageGroupsRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<ListSubPackageGroupsResult>,
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
  input: __S(352, __c44, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<ListTagsForResourceResult>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
 * the package version's status to `Published`, omit the `unfinished` flag
 * when uploading the final asset, or set the status using UpdatePackageVersionStatus. Once a package version's status is set to
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
  input: __S(360, __c45, 0) as any as S.Schema<PublishPackageVersionRequest>,
  output: __S(361, __c45, 1) as any as S.Schema<PublishPackageVersionResult>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<PutDomainPermissionsPolicyRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<PutDomainPermissionsPolicyResult>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<PutPackageOriginConfigurationRequest>,
  output: __S(377, __c47, 1) as any as S.Schema<PutPackageOriginConfigurationResult>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<PutRepositoryPermissionsPolicyRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<PutRepositoryPermissionsPolicyResult>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(400, __c50, 0) as any as S.Schema<TagResourceResult>,
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
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(400, __c50, 0) as any as S.Schema<UntagResourceResult>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<UpdatePackageGroupRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<UpdatePackageGroupResult>,
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
}));

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
  input: __S(427, __c53, 3) as any as S.Schema<UpdatePackageGroupOriginConfigurationRequest>,
  output: __S(430, __c53, 6) as any as S.Schema<UpdatePackageGroupOriginConfigurationResult>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<UpdatePackageVersionsStatusRequest>,
  output: __S(484, __c60, 4) as any as S.Schema<UpdatePackageVersionsStatusResult>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<UpdateRepositoryRequest>,
  output: __S(461, __c57, 5) as any as S.Schema<UpdateRepositoryResult>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          packageGroup: S.String,
          contactInfo: S.optional(S.String),
          description: S.optional(S.String),
          tags: S.optional(__S(505, __c63, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/package-group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePackageGroupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.optional(S.String), pattern: S.optional(S.String) }),
      ).annotate({ identifier: "PackageGroupReference" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          mode: S.optional(S.String),
          effectiveMode: S.optional(S.String),
          inheritedFrom: S.optional(__S(8, __c1, 0)),
          repositoriesCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PackageGroupOriginRestriction" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(9, __c1, 1).pipe(S.optional));
    case 3:
      return S.suspend(() => S.Struct({ restrictions: S.optional(__S(10, __c1, 2)) })).annotate({
        identifier: "PackageGroupOriginConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          pattern: S.optional(S.String),
          domainName: S.optional(S.String),
          domainOwner: S.optional(S.String),
          createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          contactInfo: S.optional(S.String),
          description: S.optional(S.String),
          originConfiguration: S.optional(__S(11, __c1, 3)),
          parent: S.optional(__S(8, __c1, 0)),
        }),
      ).annotate({ identifier: "PackageGroupDescription" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ packageGroup: S.optional(__S(12, __c1, 4)) })).annotate({
        identifier: "CreatePackageGroupResult",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          description: S.optional(S.String),
          upstreams: S.optional(__S(33, __c4, 1)),
          tags: S.optional(__S(505, __c63, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/repository" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateRepositoryRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ repositoryName: S.String })).annotate({
        identifier: "UpstreamRepository",
      });
    case 1:
      return S.Array(__S(32, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v1/domain" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDomainRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          policyRevision: S.optional(S.String).pipe(T.HttpQuery("policy-revision")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/domain/permissions/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainPermissionsPolicyRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          revision: S.optional(S.String),
          document: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourcePolicy" });
    case 1:
      return S.suspend(() => S.Struct({ policy: S.optional(__S(56, __c7, 0)) })).annotate({
        identifier: "DeleteDomainPermissionsPolicyResult",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v1/package" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePackageRequest" });
    case 1:
      return S.suspend(() => S.Struct({ deletedPackage: S.optional(__S(80, __c10, 0)) })).annotate({
        identifier: "DeletePackageResult",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ publish: S.String, upstream: S.String })).annotate({
        identifier: "PackageOriginRestrictions",
      });
    case 1:
      return S.suspend(() => S.Struct({ restrictions: S.optional(__S(72, __c9, 0)) })).annotate({
        identifier: "PackageOriginConfiguration",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          package: S.optional(S.String),
          originConfiguration: S.optional(__S(73, __c9, 1)),
        }),
      ).annotate({ identifier: "PackageSummary" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          packageGroup: S.String.pipe(T.HttpQuery("package-group")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/package-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePackageGroupRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          versions: __S(472, __c59, 0),
          expectedStatus: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package/versions/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePackageVersionsRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v1/repository" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRepositoryRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          policyRevision: S.optional(S.String).pipe(T.HttpQuery("policy-revision")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/repository/permissions/policies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRepositoryPermissionsPolicyRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/domain" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDomainRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/package" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePackageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          name: S.optional(S.String),
          originConfiguration: S.optional(__S(73, __c9, 1)),
        }),
      ).annotate({ identifier: "PackageDescription" });
    case 2:
      return S.suspend(() => S.Struct({ package: __S(129, __c16, 1) })).annotate({
        identifier: "DescribePackageResult",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          packageGroup: S.String.pipe(T.HttpQuery("package-group")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/package-group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePackageGroupRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          packageVersion: S.String.pipe(T.HttpQuery("version")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/package/version" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePackageVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), url: S.optional(S.String) }),
      ).annotate({ identifier: "LicenseInfo" });
    case 2:
      return S.Array(__S(145, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          packageName: S.optional(S.String),
          displayName: S.optional(S.String),
          version: S.optional(S.String),
          summary: S.optional(S.String),
          homePage: S.optional(S.String),
          sourceCodeRepository: S.optional(S.String),
          publishedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          licenses: S.optional(__S(146, __c18, 2)),
          revision: S.optional(S.String),
          status: S.optional(S.String),
          origin: S.optional(__S(153, __c19, 1)),
        }),
      ).annotate({ identifier: "PackageVersionDescription" });
    case 4:
      return S.suspend(() => S.Struct({ packageVersion: __S(147, __c18, 3) })).annotate({
        identifier: "DescribePackageVersionResult",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          externalConnectionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainEntryPoint" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainEntryPoint: S.optional(__S(152, __c19, 0)),
          originType: S.optional(S.String),
        }),
      ).annotate({ identifier: "PackageVersionOrigin" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/repository" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRepositoryRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          externalConnection: S.String.pipe(T.HttpQuery("external-connection")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/repository/external-connection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateExternalConnectionRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          versions: __S(472, __c59, 0),
          versionRevisions: S.optional(__S(488, __c61, 0)),
          expectedStatus: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package/versions/dispose" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisposePackageVersionsRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/get-associated-package-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssociatedPackageGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageGroup: S.optional(__S(12, __c1, 4)),
          associationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAssociatedPackageGroupResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          durationSeconds: S.optional(S.Number).pipe(T.HttpQuery("duration")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/authorization-token" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAuthorizationTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          authorizationToken: S.optional(SensitiveString),
          expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetAuthorizationTokenResult" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/domain/permissions/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainPermissionsPolicyRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          packageVersion: S.String.pipe(T.HttpQuery("version")),
          asset: S.String.pipe(T.HttpQuery("asset")),
          packageVersionRevision: S.optional(S.String).pipe(T.HttpQuery("revision")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/package/version/asset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPackageVersionAssetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          asset: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          assetName: S.optional(S.String).pipe(T.HttpHeader("X-AssetName")),
          packageVersion: S.optional(S.String).pipe(T.HttpHeader("X-PackageVersion")),
          packageVersionRevision: S.optional(S.String).pipe(
            T.HttpHeader("X-PackageVersionRevision"),
          ),
        }),
      ).annotate({ identifier: "GetPackageVersionAssetResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          packageVersion: S.String.pipe(T.HttpQuery("version")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/package/version/readme" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPackageVersionReadmeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          package: S.optional(S.String),
          version: S.optional(S.String),
          versionRevision: S.optional(S.String),
          readme: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPackageVersionReadmeResult" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          endpointType: S.optional(S.String).pipe(T.HttpQuery("endpointType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/repository/endpoint" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRepositoryEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ repositoryEndpoint: S.optional(S.String) })).annotate({
        identifier: "GetRepositoryEndpointResult",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/repository/permissions/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRepositoryPermissionsPolicyRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          packageGroup: S.String.pipe(T.HttpQuery("package-group")),
          originRestrictionType: S.String.pipe(T.HttpQuery("originRestrictionType")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/package-group-allowed-repositories" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAllowedRepositoriesForGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          allowedRepositories: S.optional(__S(472, __c59, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAllowedRepositoriesForGroupResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          packageGroup: S.String.pipe(T.HttpQuery("package-group")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          preview: S.optional(S.Boolean).pipe(T.HttpQuery("preview")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/list-associated-packages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociatedPackagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          package: S.optional(S.String),
          associationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatedPackage" });
    case 2:
      return S.Array(__S(249, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ packages: S.optional(__S(250, __c31, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssociatedPackagesResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/domains" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDomainsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          owner: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          encryptionKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainSummary" });
    case 2:
      return S.Array(__S(257, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ domains: S.optional(__S(258, __c32, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainsResult" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPackageGroupsRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(12, __c1, 4));
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageGroups: S.optional(__S(272, __c34, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPackageGroupsResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.optional(S.String).pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          packagePrefix: S.optional(S.String).pipe(T.HttpQuery("package-prefix")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          publish: S.optional(S.String).pipe(T.HttpQuery("publish")),
          upstream: S.optional(S.String).pipe(T.HttpQuery("upstream")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/packages" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPackagesRequest" });
    case 1:
      return S.Array(__S(80, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ packages: S.optional(__S(281, __c35, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPackagesResult" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          packageVersion: S.String.pipe(T.HttpQuery("version")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package/version/assets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPackageVersionAssetsRequest" });
    case 1:
      return S.Array(__S(297, __c37, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          package: S.optional(S.String),
          version: S.optional(S.String),
          versionRevision: S.optional(S.String),
          nextToken: S.optional(S.String),
          assets: S.optional(__S(289, __c36, 1)),
        }),
      ).annotate({ identifier: "ListPackageVersionAssetsResult" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          size: S.optional(S.Number),
          hashes: S.optional(__S(296, __c37, 0)),
        }),
      ).annotate({ identifier: "AssetSummary" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          packageVersion: S.String.pipe(T.HttpQuery("version")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package/version/dependencies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPackageVersionDependenciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          namespace: S.optional(S.String),
          package: S.optional(S.String),
          dependencyType: S.optional(S.String),
          versionRequirement: S.optional(S.String),
        }),
      ).annotate({ identifier: "PackageDependency" });
    case 2:
      return S.Array(__S(305, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          package: S.optional(S.String),
          version: S.optional(S.String),
          versionRevision: S.optional(S.String),
          nextToken: S.optional(S.String),
          dependencies: S.optional(__S(306, __c38, 2)),
        }),
      ).annotate({ identifier: "ListPackageVersionDependenciesResult" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          originType: S.optional(S.String).pipe(T.HttpQuery("originType")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPackageVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          revision: S.optional(S.String),
          status: S.String,
          origin: S.optional(__S(153, __c19, 1)),
        }),
      ).annotate({ identifier: "PackageVersionSummary" });
    case 2:
      return S.Array(__S(313, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          defaultDisplayVersion: S.optional(S.String),
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          package: S.optional(S.String),
          versions: S.optional(__S(314, __c39, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPackageVersionsResult" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryPrefix: S.optional(S.String).pipe(T.HttpQuery("repository-prefix")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/repositories" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRepositoriesRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          administratorAccount: S.optional(S.String),
          domainName: S.optional(S.String),
          domainOwner: S.optional(S.String),
          arn: S.optional(S.String),
          description: S.optional(S.String),
          createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RepositorySummary" });
    case 1:
      return S.Array(__S(328, __c41, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ repositories: S.optional(__S(329, __c41, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRepositoriesResult" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          administratorAccount: S.optional(S.String).pipe(T.HttpQuery("administrator-account")),
          repositoryPrefix: S.optional(S.String).pipe(T.HttpQuery("repository-prefix")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/domain/repositories" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRepositoriesInDomainRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          packageGroup: S.String.pipe(T.HttpQuery("package-group")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package-groups/sub-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubPackageGroupsRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(505, __c63, 1)) })).annotate({
        identifier: "ListTagsForResourceResult",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          packageVersion: S.String.pipe(T.HttpQuery("version")),
          assetContent: T.StreamingInput.pipe(T.HttpPayload()),
          assetName: S.String.pipe(T.HttpQuery("asset")),
          assetSHA256: S.String.pipe(T.HttpHeader("x-amz-content-sha256")),
          unfinished: S.optional(S.Boolean).pipe(T.HttpQuery("unfinished")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package/version/publish" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishPackageVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          namespace: S.optional(S.String),
          package: S.optional(S.String),
          version: S.optional(S.String),
          versionRevision: S.optional(S.String),
          status: S.optional(S.String),
          asset: S.optional(__S(297, __c37, 1)),
        }),
      ).annotate({ identifier: "PublishPackageVersionResult" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String,
          domainOwner: S.optional(S.String),
          policyRevision: S.optional(S.String),
          policyDocument: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/domain/permissions/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDomainPermissionsPolicyRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          restrictions: __S(72, __c9, 0),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/package" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutPackageOriginConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ originConfiguration: S.optional(__S(73, __c9, 1)) }),
      ).annotate({ identifier: "PutPackageOriginConfigurationResult" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          policyRevision: S.optional(S.String),
          policyDocument: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/repository/permissions/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRepositoryPermissionsPolicyRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          tags: __S(505, __c63, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/v1/tag" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResult" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          tagKeys: __S(472, __c59, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/v1/untag" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          packageGroup: S.String,
          contactInfo: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v1/package-group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePackageGroupRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          originRestrictionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "PackageGroupAllowedRepository" });
    case 2:
      return S.Array(__S(425, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          packageGroup: S.String.pipe(T.HttpQuery("package-group")),
          restrictions: S.optional(__S(424, __c53, 0)),
          addAllowedRepositories: S.optional(__S(426, __c53, 2)),
          removeAllowedRepositories: S.optional(__S(426, __c53, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/package-group-origin-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePackageGroupOriginConfigurationRequest" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(472, __c59, 0).pipe(S.optional));
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(428, __c53, 4).pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          packageGroup: S.optional(__S(12, __c1, 4)),
          allowedRepositoryUpdates: S.optional(__S(429, __c53, 5)),
        }),
      ).annotate({ identifier: "UpdatePackageGroupOriginConfigurationResult" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          versions: __S(472, __c59, 0),
          versionRevisions: S.optional(__S(488, __c61, 0)),
          expectedStatus: S.optional(S.String),
          targetStatus: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package/versions/update_status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePackageVersionsStatusRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          description: S.optional(S.String),
          upstreams: S.optional(__S(33, __c4, 1)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v1/repository" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRepositoryRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          repository: S.String.pipe(T.HttpQuery("repository")),
          externalConnection: S.String.pipe(T.HttpQuery("external-connection")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/repository/external-connection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateExternalConnectionRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ repositoryName: S.optional(S.String) })).annotate({
        identifier: "UpstreamRepositoryInfo",
      });
    case 1:
      return S.Array(__S(456, __c57, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          externalConnectionName: S.optional(S.String),
          packageFormat: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "RepositoryExternalConnectionInfo" });
    case 3:
      return S.Array(__S(458, __c57, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          administratorAccount: S.optional(S.String),
          domainName: S.optional(S.String),
          domainOwner: S.optional(S.String),
          arn: S.optional(S.String),
          description: S.optional(S.String),
          upstreams: S.optional(__S(457, __c57, 1)),
          externalConnections: S.optional(__S(459, __c57, 3)),
          createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RepositoryDescription" });
    case 5:
      return S.suspend(() => S.Struct({ repository: S.optional(__S(460, __c57, 4)) })).annotate({
        identifier: "AssociateExternalConnectionResult",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
          sourceRepository: S.String.pipe(T.HttpQuery("source-repository")),
          destinationRepository: S.String.pipe(T.HttpQuery("destination-repository")),
          format: S.String.pipe(T.HttpQuery("format")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          package: S.String.pipe(T.HttpQuery("package")),
          versions: S.optional(__S(472, __c59, 0)),
          versionRevisions: S.optional(__S(488, __c61, 0)),
          allowOverwrite: S.optional(S.Boolean),
          includeFromUpstream: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/package/versions/copy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CopyPackageVersionsRequest" });
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
        S.Struct({ revision: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "SuccessfulPackageVersionInfo" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(480, __c60, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ errorCode: S.optional(S.String), errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "PackageVersionError" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(482, __c60, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          successfulVersions: S.optional(__S(481, __c60, 1)),
          failedVersions: S.optional(__S(483, __c60, 3)),
        }),
      ).annotate({ identifier: "CopyPackageVersionsResult" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: S.String.pipe(T.HttpQuery("domain")),
          encryptionKey: S.optional(S.String),
          tags: S.optional(__S(505, __c63, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/v1/domain" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDomainRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(504, __c63, 0));
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          owner: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          encryptionKey: S.optional(S.String),
          repositoryCount: S.optional(S.Number),
          assetSizeBytes: S.optional(S.Number),
          s3BucketArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainDescription" });
    case 1:
      return S.suspend(() => S.Struct({ domain: S.optional(__S(512, __c64, 0)) })).annotate({
        identifier: "CreateDomainResult",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
