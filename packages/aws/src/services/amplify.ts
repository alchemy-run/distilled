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
const ns = /*@__PURE__*/ T.XmlNamespace("http://amplify.amazonaws.com");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Amplify", serviceShapeName: "Amplify" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "amplify" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-07-25");
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
              `https://amplify-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://amplify-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://amplify.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://amplify.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://amplify.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DependentServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<DependentServiceFailureException>()(
    "DependentServiceFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { code: S.String, message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TimeoutException
  extends /*@__PURE__*/ S.TaggedError<TimeoutException>()("TimeoutException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type Name = string;
export type Description = string;
export type Repository = string;
export type Platform = "WEB" | "WEB_DYNAMIC" | "WEB_COMPUTE" | (string & {});
export type ComputeRoleArn = string;
export type ServiceRoleArn = string;
export type OauthToken = string | redacted.Redacted<string>;
export type AccessToken = string | redacted.Redacted<string>;
export type EnvKey = string;
export type EnvValue = string;
export type EnvironmentVariables = { [key: string]: string | undefined };
export type EnableBranchAutoBuild = boolean;
export type EnableBranchAutoDeletion = boolean;
export type EnableBasicAuth = boolean;
export type BasicAuthCredentials = string | redacted.Redacted<string>;
export type Source = string;
export type Target = string;
export type Status = string;
export type Condition = string;
export interface CustomRule {
  source: string;
  target: string;
  status?: string;
  condition?: string;
}
export type CustomRules = CustomRule[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type BuildSpec = string | redacted.Redacted<string>;
export type CustomHeaders = string;
export type EnableAutoBranchCreation = boolean;
export type AutoBranchCreationPattern = string;
export type AutoBranchCreationPatterns = string[];
export type Stage =
  | "PRODUCTION"
  | "BETA"
  | "DEVELOPMENT"
  | "EXPERIMENTAL"
  | "PULL_REQUEST"
  | (string & {});
export type Framework = string;
export type EnableAutoBuild = boolean;
export type EnablePerformanceMode = boolean;
export type EnablePullRequestPreview = boolean;
export type PullRequestEnvironmentName = string;
export interface AutoBranchCreationConfig {
  stage?: Stage;
  framework?: string;
  enableAutoBuild?: boolean;
  environmentVariables?: { [key: string]: string | undefined };
  basicAuthCredentials?: string | redacted.Redacted<string>;
  enableBasicAuth?: boolean;
  enablePerformanceMode?: boolean;
  buildSpec?: string | redacted.Redacted<string>;
  enablePullRequestPreview?: boolean;
  pullRequestEnvironmentName?: string;
}
export type BuildComputeType = "STANDARD_8GB" | "LARGE_16GB" | "XLARGE_72GB" | (string & {});
export interface JobConfig {
  buildComputeType: BuildComputeType;
}
export type CacheConfigType = "AMPLIFY_MANAGED" | "AMPLIFY_MANAGED_NO_COOKIES" | (string & {});
export interface CacheConfig {
  type: CacheConfigType;
}
export interface CreateAppRequest {
  name: string;
  description?: string;
  repository?: string;
  platform?: Platform;
  computeRoleArn?: string;
  iamServiceRoleArn?: string;
  oauthToken?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  environmentVariables?: { [key: string]: string | undefined };
  enableBranchAutoBuild?: boolean;
  enableBranchAutoDeletion?: boolean;
  enableBasicAuth?: boolean;
  basicAuthCredentials?: string | redacted.Redacted<string>;
  customRules?: CustomRule[];
  tags?: { [key: string]: string | undefined };
  buildSpec?: string | redacted.Redacted<string>;
  customHeaders?: string;
  enableAutoBranchCreation?: boolean;
  autoBranchCreationPatterns?: string[];
  autoBranchCreationConfig?: AutoBranchCreationConfig;
  jobConfig?: JobConfig;
  cacheConfig?: CacheConfig;
}
export type AppId = string;
export type AppArn = string;
export type CreateTime = Date;
export type UpdateTime = Date;
export type DefaultDomain = string;
export type LastDeployTime = Date;
export type ThumbnailUrl = string;
export type BranchName = string;
export interface ProductionBranch {
  lastDeployTime?: Date;
  status?: string;
  thumbnailUrl?: string;
  branchName?: string;
}
export type RepositoryCloneMethod = "SSH" | "TOKEN" | "SIGV4" | (string & {});
export type WebhookCreateTime = Date;
export type WebAclArn = string;
export type WafStatus =
  | "ASSOCIATING"
  | "ASSOCIATION_FAILED"
  | "ASSOCIATION_SUCCESS"
  | "DISASSOCIATING"
  | "DISASSOCIATION_FAILED"
  | (string & {});
export type StatusReason = string;
export interface WafConfiguration {
  webAclArn?: string;
  wafStatus?: WafStatus;
  statusReason?: string;
}
export interface App {
  appId: string;
  appArn: string;
  name: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
  repository?: string;
  platform?: Platform;
  createTime: Date;
  updateTime: Date;
  computeRoleArn?: string;
  iamServiceRoleArn?: string;
  environmentVariables?: { [key: string]: string | undefined };
  defaultDomain?: string;
  enableBranchAutoBuild?: boolean;
  enableBranchAutoDeletion?: boolean;
  enableBasicAuth?: boolean;
  basicAuthCredentials?: string | redacted.Redacted<string>;
  customRules?: CustomRule[];
  productionBranch?: ProductionBranch;
  buildSpec?: string | redacted.Redacted<string>;
  customHeaders?: string;
  enableAutoBranchCreation?: boolean;
  autoBranchCreationPatterns?: string[];
  autoBranchCreationConfig?: AutoBranchCreationConfig;
  repositoryCloneMethod?: RepositoryCloneMethod;
  cacheConfig?: CacheConfig;
  webhookCreateTime?: Date;
  wafConfiguration?: WafConfiguration;
  jobConfig?: JobConfig;
}
export interface CreateAppResult {
  app: App;
}
export type EnvironmentName = string;
export type StackName = string;
export type DeploymentArtifacts = string;
export interface CreateBackendEnvironmentRequest {
  appId: string;
  environmentName: string;
  stackName?: string;
  deploymentArtifacts?: string;
}
export type BackendEnvironmentArn = string;
export interface BackendEnvironment {
  backendEnvironmentArn: string;
  environmentName: string;
  stackName?: string;
  deploymentArtifacts?: string;
  createTime: Date;
  updateTime: Date;
}
export interface CreateBackendEnvironmentResult {
  backendEnvironment: BackendEnvironment;
}
export type EnableNotification = boolean;
export type EnableSkewProtection = boolean;
export type TTL = string;
export type DisplayName = string;
export type StackArn = string;
export interface Backend {
  stackArn?: string;
}
export interface CreateBranchRequest {
  appId: string;
  branchName: string;
  description?: string;
  stage?: Stage;
  framework?: string;
  enableNotification?: boolean;
  enableAutoBuild?: boolean;
  enableSkewProtection?: boolean;
  environmentVariables?: { [key: string]: string | undefined };
  basicAuthCredentials?: string | redacted.Redacted<string>;
  enableBasicAuth?: boolean;
  enablePerformanceMode?: boolean;
  tags?: { [key: string]: string | undefined };
  buildSpec?: string | redacted.Redacted<string>;
  ttl?: string;
  displayName?: string;
  enablePullRequestPreview?: boolean;
  pullRequestEnvironmentName?: string;
  backendEnvironmentArn?: string;
  backend?: Backend;
  computeRoleArn?: string;
}
export type BranchArn = string;
export type CustomDomain = string;
export type CustomDomains = string[];
export type ActiveJobId = string;
export type TotalNumberOfJobs = string;
export type AssociatedResource = string;
export type AssociatedResources = string[];
export interface Branch {
  branchArn: string;
  branchName: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  stage?: Stage;
  displayName?: string;
  enableNotification?: boolean;
  createTime: Date;
  updateTime: Date;
  environmentVariables?: { [key: string]: string | undefined };
  enableAutoBuild?: boolean;
  enableSkewProtection?: boolean;
  customDomains?: string[];
  framework?: string;
  activeJobId?: string;
  totalNumberOfJobs?: string;
  enableBasicAuth?: boolean;
  enablePerformanceMode?: boolean;
  thumbnailUrl?: string;
  basicAuthCredentials?: string | redacted.Redacted<string>;
  buildSpec?: string | redacted.Redacted<string>;
  ttl?: string;
  associatedResources?: string[];
  enablePullRequestPreview?: boolean;
  pullRequestEnvironmentName?: string;
  destinationBranch?: string;
  sourceBranch?: string;
  backendEnvironmentArn?: string;
  backend?: Backend;
  computeRoleArn?: string;
}
export interface CreateBranchResult {
  branch: Branch;
}
export type FileName = string;
export type MD5Hash = string;
export type FileMap = { [key: string]: string | undefined };
export interface CreateDeploymentRequest {
  appId: string;
  branchName: string;
  fileMap?: { [key: string]: string | undefined };
}
export type JobId = string;
export type UploadUrl = string;
export type FileUploadUrls = { [key: string]: string | undefined };
export interface CreateDeploymentResult {
  jobId?: string;
  fileUploadUrls?: { [key: string]: string | undefined };
  zipUploadUrl: string;
}
export type DomainName = string;
export type EnableAutoSubDomain = boolean;
export type DomainPrefix = string;
export interface SubDomainSetting {
  prefix: string;
  branchName: string;
}
export type SubDomainSettings = SubDomainSetting[];
export type AutoSubDomainCreationPattern = string;
export type AutoSubDomainCreationPatterns = string[];
export type AutoSubDomainIAMRole = string;
export type CertificateType = "AMPLIFY_MANAGED" | "CUSTOM" | (string & {});
export type CertificateArn = string;
export interface CertificateSettings {
  type: CertificateType;
  customCertificateArn?: string;
}
export interface CreateDomainAssociationRequest {
  appId: string;
  domainName: string;
  enableAutoSubDomain?: boolean;
  subDomainSettings: SubDomainSetting[];
  autoSubDomainCreationPatterns?: string[];
  autoSubDomainIAMRole?: string;
  certificateSettings?: CertificateSettings;
}
export type DomainAssociationArn = string;
export type DomainStatus =
  | "PENDING_VERIFICATION"
  | "IN_PROGRESS"
  | "AVAILABLE"
  | "IMPORTING_CUSTOM_CERTIFICATE"
  | "PENDING_DEPLOYMENT"
  | "AWAITING_APP_CNAME"
  | "FAILED"
  | "CREATING"
  | "REQUESTING_CERTIFICATE"
  | "UPDATING"
  | (string & {});
export type UpdateStatus =
  | "REQUESTING_CERTIFICATE"
  | "PENDING_VERIFICATION"
  | "IMPORTING_CUSTOM_CERTIFICATE"
  | "PENDING_DEPLOYMENT"
  | "AWAITING_APP_CNAME"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export type CertificateVerificationDNSRecord = string;
export type Verified = boolean;
export type DNSRecord = string;
export interface SubDomain {
  subDomainSetting: SubDomainSetting;
  verified: boolean;
  dnsRecord: string;
}
export type SubDomains = SubDomain[];
export interface Certificate {
  type: CertificateType;
  customCertificateArn?: string;
  certificateVerificationDNSRecord?: string;
}
export interface DomainAssociation {
  domainAssociationArn: string;
  domainName: string;
  enableAutoSubDomain: boolean;
  autoSubDomainCreationPatterns?: string[];
  autoSubDomainIAMRole?: string;
  domainStatus: DomainStatus;
  updateStatus?: UpdateStatus;
  statusReason: string;
  certificateVerificationDNSRecord?: string;
  subDomains: SubDomain[];
  certificate?: Certificate;
}
export interface CreateDomainAssociationResult {
  domainAssociation: DomainAssociation;
}
export interface CreateWebhookRequest {
  appId: string;
  branchName: string;
  description?: string;
}
export type WebhookArn = string;
export type WebhookId = string;
export type WebhookUrl = string;
export interface Webhook {
  webhookArn: string;
  webhookId: string;
  webhookUrl: string;
  appId?: string;
  branchName: string;
  description: string;
  createTime: Date;
  updateTime: Date;
}
export interface CreateWebhookResult {
  webhook: Webhook;
}
export interface DeleteAppRequest {
  appId: string;
}
export interface DeleteAppResult {
  app: App;
}
export interface DeleteBackendEnvironmentRequest {
  appId: string;
  environmentName: string;
}
export interface DeleteBackendEnvironmentResult {
  backendEnvironment: BackendEnvironment;
}
export interface DeleteBranchRequest {
  appId: string;
  branchName: string;
}
export interface DeleteBranchResult {
  branch: Branch;
}
export interface DeleteDomainAssociationRequest {
  appId: string;
  domainName: string;
}
export interface DeleteDomainAssociationResult {
  domainAssociation: DomainAssociation;
}
export interface DeleteJobRequest {
  appId: string;
  branchName: string;
  jobId: string;
}
export type JobArn = string;
export type CommitId = string;
export type CommitMessage = string;
export type CommitTime = Date;
export type StartTime = Date;
export type JobStatus =
  | "CREATED"
  | "PENDING"
  | "PROVISIONING"
  | "RUNNING"
  | "FAILED"
  | "SUCCEED"
  | "CANCELLING"
  | "CANCELLED"
  | (string & {});
export type EndTime = Date;
export type JobType = "RELEASE" | "RETRY" | "MANUAL" | "WEB_HOOK" | (string & {});
export type SourceUrl = string;
export type SourceUrlType = "ZIP" | "BUCKET_PREFIX" | (string & {});
export interface JobSummary {
  jobArn: string;
  jobId: string;
  commitId?: string;
  commitMessage?: string;
  commitTime?: Date;
  startTime: Date;
  status: JobStatus;
  endTime?: Date;
  jobType?: JobType;
  sourceUrl?: string;
  sourceUrlType?: SourceUrlType;
}
export interface DeleteJobResult {
  jobSummary: JobSummary;
}
export interface DeleteWebhookRequest {
  webhookId: string;
}
export interface DeleteWebhookResult {
  webhook: Webhook;
}
export interface GenerateAccessLogsRequest {
  startTime?: Date;
  endTime?: Date;
  domainName: string;
  appId: string;
}
export type LogUrl = string;
export interface GenerateAccessLogsResult {
  logUrl?: string;
}
export interface GetAppRequest {
  appId: string;
}
export interface GetAppResult {
  app: App;
}
export type ArtifactId = string;
export interface GetArtifactUrlRequest {
  artifactId: string;
}
export type ArtifactUrl = string;
export interface GetArtifactUrlResult {
  artifactId: string;
  artifactUrl: string;
}
export interface GetBackendEnvironmentRequest {
  appId: string;
  environmentName: string;
}
export interface GetBackendEnvironmentResult {
  backendEnvironment: BackendEnvironment;
}
export interface GetBranchRequest {
  appId: string;
  branchName: string;
}
export interface GetBranchResult {
  branch: Branch;
}
export interface GetDomainAssociationRequest {
  appId: string;
  domainName: string;
}
export interface GetDomainAssociationResult {
  domainAssociation: DomainAssociation;
}
export interface GetJobRequest {
  appId: string;
  branchName: string;
  jobId: string;
}
export type StepName = string;
export type ArtifactsUrl = string;
export type TestArtifactsUrl = string;
export type TestConfigUrl = string;
export type ThumbnailName = string;
export type Screenshots = { [key: string]: string | undefined };
export type Context = string;
export interface Step {
  stepName: string;
  startTime: Date;
  status: JobStatus;
  endTime?: Date;
  logUrl?: string;
  artifactsUrl?: string;
  testArtifactsUrl?: string;
  testConfigUrl?: string;
  screenshots?: { [key: string]: string | undefined };
  statusReason?: string;
  context?: string;
}
export type Steps = Step[];
export interface Job {
  summary: JobSummary;
  steps: Step[];
}
export interface GetJobResult {
  job: Job;
}
export interface GetWebhookRequest {
  webhookId: string;
}
export interface GetWebhookResult {
  webhook: Webhook;
}
export type NextToken = string;
export type MaxResultsForListApps = number;
export interface ListAppsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type Apps = App[];
export interface ListAppsResult {
  apps: App[];
  nextToken?: string;
}
export type MaxResults = number;
export interface ListArtifactsRequest {
  appId: string;
  branchName: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export type ArtifactFileName = string;
export interface Artifact {
  artifactFileName: string;
  artifactId: string;
}
export type Artifacts = Artifact[];
export interface ListArtifactsResult {
  artifacts: Artifact[];
  nextToken?: string;
}
export interface ListBackendEnvironmentsRequest {
  appId: string;
  environmentName?: string;
  nextToken?: string;
  maxResults?: number;
}
export type BackendEnvironments = BackendEnvironment[];
export interface ListBackendEnvironmentsResult {
  backendEnvironments: BackendEnvironment[];
  nextToken?: string;
}
export interface ListBranchesRequest {
  appId: string;
  nextToken?: string;
  maxResults?: number;
}
export type Branches = Branch[];
export interface ListBranchesResult {
  branches: Branch[];
  nextToken?: string;
}
export interface ListDomainAssociationsRequest {
  appId: string;
  nextToken?: string;
  maxResults?: number;
}
export type DomainAssociations = DomainAssociation[];
export interface ListDomainAssociationsResult {
  domainAssociations: DomainAssociation[];
  nextToken?: string;
}
export interface ListJobsRequest {
  appId: string;
  branchName: string;
  nextToken?: string;
  maxResults?: number;
}
export type JobSummaries = JobSummary[];
export interface ListJobsResult {
  jobSummaries: JobSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListWebhooksRequest {
  appId: string;
  nextToken?: string;
  maxResults?: number;
}
export type Webhooks = Webhook[];
export interface ListWebhooksResult {
  webhooks: Webhook[];
  nextToken?: string;
}
export interface StartDeploymentRequest {
  appId: string;
  branchName: string;
  jobId?: string;
  sourceUrl?: string;
  sourceUrlType?: SourceUrlType;
}
export interface StartDeploymentResult {
  jobSummary: JobSummary;
}
export type JobReason = string;
export interface StartJobRequest {
  appId: string;
  branchName: string;
  jobId?: string;
  jobType: JobType;
  jobReason?: string;
  commitId?: string;
  commitMessage?: string;
  commitTime?: Date;
}
export interface StartJobResult {
  jobSummary: JobSummary;
}
export interface StopJobRequest {
  appId: string;
  branchName: string;
  jobId: string;
}
export interface StopJobResult {
  jobSummary: JobSummary;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAppRequest {
  appId: string;
  name?: string;
  description?: string;
  platform?: Platform;
  computeRoleArn?: string;
  iamServiceRoleArn?: string;
  environmentVariables?: { [key: string]: string | undefined };
  enableBranchAutoBuild?: boolean;
  enableBranchAutoDeletion?: boolean;
  enableBasicAuth?: boolean;
  basicAuthCredentials?: string | redacted.Redacted<string>;
  customRules?: CustomRule[];
  buildSpec?: string | redacted.Redacted<string>;
  customHeaders?: string;
  enableAutoBranchCreation?: boolean;
  autoBranchCreationPatterns?: string[];
  autoBranchCreationConfig?: AutoBranchCreationConfig;
  repository?: string;
  oauthToken?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  jobConfig?: JobConfig;
  cacheConfig?: CacheConfig;
}
export interface UpdateAppResult {
  app: App;
}
export interface UpdateBranchRequest {
  appId: string;
  branchName: string;
  description?: string;
  framework?: string;
  stage?: Stage;
  enableNotification?: boolean;
  enableAutoBuild?: boolean;
  enableSkewProtection?: boolean;
  environmentVariables?: { [key: string]: string | undefined };
  basicAuthCredentials?: string | redacted.Redacted<string>;
  enableBasicAuth?: boolean;
  enablePerformanceMode?: boolean;
  buildSpec?: string | redacted.Redacted<string>;
  ttl?: string;
  displayName?: string;
  enablePullRequestPreview?: boolean;
  pullRequestEnvironmentName?: string;
  backendEnvironmentArn?: string;
  backend?: Backend;
  computeRoleArn?: string;
}
export interface UpdateBranchResult {
  branch: Branch;
}
export interface UpdateDomainAssociationRequest {
  appId: string;
  domainName: string;
  enableAutoSubDomain?: boolean;
  subDomainSettings?: SubDomainSetting[];
  autoSubDomainCreationPatterns?: string[];
  autoSubDomainIAMRole?: string;
  certificateSettings?: CertificateSettings;
}
export interface UpdateDomainAssociationResult {
  domainAssociation: DomainAssociation;
}
export interface UpdateWebhookRequest {
  webhookId: string;
  branchName?: string;
  description?: string;
}
export interface UpdateWebhookResult {
  webhook: Webhook;
}
export type ErrorMessage = string;
export type Code = string;
export type CreateAppError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new Amplify app.
 */
export const createApp: API.OperationMethod<
  CreateAppRequest,
  CreateAppResult,
  CreateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<CreateAppRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<CreateAppResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApp",
}));

export type CreateBackendEnvironmentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new backend environment for an Amplify app.
 *
 * This API is available only to Amplify Gen 1 applications where the
 * backend is created using Amplify Studio or the Amplify
 * command line interface (CLI). This API isn't available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const createBackendEnvironment: API.OperationMethod<
  CreateBackendEnvironmentRequest,
  CreateBackendEnvironmentResult,
  CreateBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<CreateBackendEnvironmentRequest>,
  output: __S(408, __c51, 0) as any as S.Schema<CreateBackendEnvironmentResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendEnvironment",
}));

export type CreateBranchError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new branch for an Amplify app.
 */
export const createBranch: API.OperationMethod<
  CreateBranchRequest,
  CreateBranchResult,
  CreateBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateBranchRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateBranchResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBranch",
}));

export type CreateDeploymentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a deployment for a manually deployed Amplify app. Manually deployed apps are
 * not connected to a Git repository.
 *
 * The maximum duration between the `CreateDeployment` call and the
 * `StartDeployment` call cannot exceed 8 hours. If the duration exceeds 8
 * hours, the `StartDeployment` call and the associated `Job` will
 * fail.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResult,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CreateDeploymentRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<CreateDeploymentResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDomainAssociationError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new domain association for an Amplify app. This action associates a custom
 * domain with the Amplify app
 */
export const createDomainAssociation: API.OperationMethod<
  CreateDomainAssociationRequest,
  CreateDomainAssociationResult,
  CreateDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<CreateDomainAssociationRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<CreateDomainAssociationResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainAssociation",
}));

export type CreateWebhookError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new webhook on an Amplify app.
 */
export const createWebhook: API.OperationMethod<
  CreateWebhookRequest,
  CreateWebhookResult,
  CreateWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<CreateWebhookRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<CreateWebhookResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebhook",
}));

export type DeleteAppError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes an existing Amplify app specified by an app ID.
 */
export const deleteApp: API.OperationMethod<
  DeleteAppRequest,
  DeleteAppResult,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<DeleteAppRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<DeleteAppResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApp",
}));

export type DeleteBackendEnvironmentError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a backend environment for an Amplify app.
 *
 * This API is available only to Amplify Gen 1 applications where the
 * backend is created using Amplify Studio or the Amplify
 * command line interface (CLI). This API isn't available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const deleteBackendEnvironment: API.OperationMethod<
  DeleteBackendEnvironmentRequest,
  DeleteBackendEnvironmentResult,
  DeleteBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DeleteBackendEnvironmentRequest>,
  output: __S(408, __c51, 0) as any as S.Schema<DeleteBackendEnvironmentResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendEnvironment",
}));

export type DeleteBranchError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a branch for an Amplify app.
 */
export const deleteBranch: API.OperationMethod<
  DeleteBranchRequest,
  DeleteBranchResult,
  DeleteBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DeleteBranchRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteBranchResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBranch",
}));

export type DeleteDomainAssociationError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a domain association for an Amplify app.
 */
export const deleteDomainAssociation: API.OperationMethod<
  DeleteDomainAssociationRequest,
  DeleteDomainAssociationResult,
  DeleteDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DeleteDomainAssociationRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteDomainAssociationResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainAssociation",
}));

export type DeleteJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a job for a branch of an Amplify app.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResult,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DeleteJobRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteJobResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

export type DeleteWebhookError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a webhook.
 */
export const deleteWebhook: API.OperationMethod<
  DeleteWebhookRequest,
  DeleteWebhookResult,
  DeleteWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DeleteWebhookRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<DeleteWebhookResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebhook",
}));

export type GenerateAccessLogsError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the website access logs for a specific time range using a presigned URL.
 */
export const generateAccessLogs: API.OperationMethod<
  GenerateAccessLogsRequest,
  GenerateAccessLogsResult,
  GenerateAccessLogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<GenerateAccessLogsRequest>,
  output: __S(153, __c19, 1) as any as S.Schema<GenerateAccessLogsResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateAccessLogs",
}));

export type GetAppError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns an existing Amplify app specified by an app ID.
 */
export const getApp: API.OperationMethod<
  GetAppRequest,
  GetAppResult,
  GetAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<GetAppRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<GetAppResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApp",
}));

export type GetArtifactUrlError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the artifact info that corresponds to an artifact id.
 */
export const getArtifactUrl: API.OperationMethod<
  GetArtifactUrlRequest,
  GetArtifactUrlResult,
  GetArtifactUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<GetArtifactUrlRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<GetArtifactUrlResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArtifactUrl",
}));

export type GetBackendEnvironmentError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a backend environment for an Amplify app.
 *
 * This API is available only to Amplify Gen 1 applications where the
 * backend is created using Amplify Studio or the Amplify
 * command line interface (CLI). This API isn't available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const getBackendEnvironment: API.OperationMethod<
  GetBackendEnvironmentRequest,
  GetBackendEnvironmentResult,
  GetBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<GetBackendEnvironmentRequest>,
  output: __S(408, __c51, 0) as any as S.Schema<GetBackendEnvironmentResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendEnvironment",
}));

export type GetBranchError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a branch for an Amplify app.
 */
export const getBranch: API.OperationMethod<
  GetBranchRequest,
  GetBranchResult,
  GetBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<GetBranchRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<GetBranchResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBranch",
}));

export type GetDomainAssociationError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the domain information for an Amplify app.
 */
export const getDomainAssociation: API.OperationMethod<
  GetDomainAssociationRequest,
  GetDomainAssociationResult,
  GetDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<GetDomainAssociationRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<GetDomainAssociationResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainAssociation",
}));

export type GetJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a job for a branch of an Amplify app.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResult,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<GetJobRequest>,
  output: __S(204, __c25, 4) as any as S.Schema<GetJobResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetWebhookError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the webhook information that corresponds to a specified webhook ID.
 */
export const getWebhook: API.OperationMethod<
  GetWebhookRequest,
  GetWebhookResult,
  GetWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<GetWebhookRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<GetWebhookResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebhook",
}));

export type ListAppsError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a list of the existing Amplify apps.
 */
export const listApps: API.PaginatedOperationMethod<
  ListAppsRequest,
  ListAppsResult,
  ListAppsError,
  Credentials | HttpClient.HttpClient,
  App
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListAppsRequest>,
  output: __S(218, __c27, 2) as any as S.Schema<ListAppsResult>,
  errors: [BadRequestException, InternalFailureException, UnauthorizedException, TimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "apps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListArtifactsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a list of end-to-end testing artifacts for a specified app, branch, and
 * job.
 *
 * To return the build artifacts, use the GetJob API.
 *
 * For more information about Amplify testing support, see Setting up
 * end-to-end Cypress tests for your Amplify application in the
 * *Amplify Hosting User Guide*.
 */
export const listArtifacts: API.OperationMethod<
  ListArtifactsRequest,
  ListArtifactsResult,
  ListArtifactsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ListArtifactsRequest>,
  output: __S(227, __c28, 3) as any as S.Schema<ListArtifactsResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArtifacts",
}));

export type ListBackendEnvironmentsError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Lists the backend environments for an Amplify app.
 *
 * This API is available only to Amplify Gen 1 applications where the
 * backend is created using Amplify Studio or the Amplify
 * command line interface (CLI). This API isn't available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const listBackendEnvironments: API.OperationMethod<
  ListBackendEnvironmentsRequest,
  ListBackendEnvironmentsResult,
  ListBackendEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ListBackendEnvironmentsRequest>,
  output: __S(234, __c29, 2) as any as S.Schema<ListBackendEnvironmentsResult>,
  errors: [BadRequestException, InternalFailureException, UnauthorizedException, TimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackendEnvironments",
}));

export type ListBranchesError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Lists the branches of an Amplify app.
 */
export const listBranches: API.PaginatedOperationMethod<
  ListBranchesRequest,
  ListBranchesResult,
  ListBranchesError,
  Credentials | HttpClient.HttpClient,
  Branch
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<ListBranchesRequest>,
  output: __S(242, __c30, 2) as any as S.Schema<ListBranchesResult>,
  errors: [BadRequestException, InternalFailureException, UnauthorizedException, TimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBranches",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "branches",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainAssociationsError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the domain associations for an Amplify app.
 */
export const listDomainAssociations: API.PaginatedOperationMethod<
  ListDomainAssociationsRequest,
  ListDomainAssociationsResult,
  ListDomainAssociationsError,
  Credentials | HttpClient.HttpClient,
  DomainAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<ListDomainAssociationsRequest>,
  output: __S(250, __c31, 2) as any as S.Schema<ListDomainAssociationsResult>,
  errors: [BadRequestException, InternalFailureException, UnauthorizedException, TimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domainAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Lists the jobs for a branch of an Amplify app.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResult,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(258, __c32, 2) as any as S.Schema<ListJobsResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalFailureException
  | ResourceNotFoundException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a list of tags for a specified Amazon Resource Name (ARN).
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(265, __c33, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWebhooksError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a list of webhooks for an Amplify app.
 */
export const listWebhooks: API.OperationMethod<
  ListWebhooksRequest,
  ListWebhooksResult,
  ListWebhooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<ListWebhooksRequest>,
  output: __S(274, __c34, 2) as any as S.Schema<ListWebhooksResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebhooks",
}));

export type StartDeploymentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Starts a deployment for a manually deployed app. Manually deployed apps are not
 * connected to a Git repository.
 *
 * The maximum duration between the `CreateDeployment` call and the
 * `StartDeployment` call cannot exceed 8 hours. If the duration exceeds 8
 * hours, the `StartDeployment` call and the associated `Job` will
 * fail.
 */
export const startDeployment: API.OperationMethod<
  StartDeploymentRequest,
  StartDeploymentResult,
  StartDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<StartDeploymentRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<StartDeploymentResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeployment",
}));

export type StartJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Starts a new job for a branch of an Amplify app.
 */
export const startJob: API.OperationMethod<
  StartJobRequest,
  StartJobResult,
  StartJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<StartJobRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<StartJobResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJob",
}));

export type StopJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Stops a job that is in progress for a branch of an Amplify app.
 */
export const stopJob: API.OperationMethod<
  StopJobRequest,
  StopJobResult,
  StopJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<StopJobRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<StopJobResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJob",
}));

export type TagResourceError =
  | BadRequestException
  | InternalFailureException
  | ResourceNotFoundException
  | TimeoutException
  | CommonErrors;
/**
 * Tags the resource with a tag key and value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | InternalFailureException
  | ResourceNotFoundException
  | TimeoutException
  | CommonErrors;
/**
 * Untags a resource with a specified Amazon Resource Name (ARN).
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAppError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Updates an existing Amplify app.
 */
export const updateApp: API.OperationMethod<
  UpdateAppRequest,
  UpdateAppResult,
  UpdateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<UpdateAppRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<UpdateAppResult>,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApp",
}));

export type UpdateBranchError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Updates a branch for an Amplify app.
 */
export const updateBranch: API.OperationMethod<
  UpdateBranchRequest,
  UpdateBranchResult,
  UpdateBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<UpdateBranchRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<UpdateBranchResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBranch",
}));

export type UpdateDomainAssociationError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new domain association for an Amplify app.
 */
export const updateDomainAssociation: API.OperationMethod<
  UpdateDomainAssociationRequest,
  UpdateDomainAssociationResult,
  UpdateDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<UpdateDomainAssociationRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<UpdateDomainAssociationResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainAssociation",
}));

export type UpdateWebhookError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Updates a webhook.
 */
export const updateWebhook: API.OperationMethod<
  UpdateWebhookRequest,
  UpdateWebhookResult,
  UpdateWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<UpdateWebhookRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<UpdateWebhookResult>,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebhook",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String,
          description: S.optional(S.String),
          stage: S.optional(S.String),
          framework: S.optional(S.String),
          enableNotification: S.optional(S.Boolean),
          enableAutoBuild: S.optional(S.Boolean),
          enableSkewProtection: S.optional(S.Boolean),
          environmentVariables: S.optional(__S(368, __c46, 0)),
          basicAuthCredentials: S.optional(SensitiveString),
          enableBasicAuth: S.optional(S.Boolean),
          enablePerformanceMode: S.optional(S.Boolean),
          tags: S.optional(__S(368, __c46, 0)),
          buildSpec: S.optional(SensitiveString),
          ttl: S.optional(S.String),
          displayName: S.optional(S.String),
          enablePullRequestPreview: S.optional(S.Boolean),
          pullRequestEnvironmentName: S.optional(S.String),
          backendEnvironmentArn: S.optional(S.String),
          backend: S.optional(__S(8, __c1, 0)),
          computeRoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/branches" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBranchRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ stackArn: S.optional(S.String) })).annotate({
        identifier: "Backend",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          branchArn: S.String,
          branchName: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(368, __c46, 0)),
          stage: S.optional(S.String),
          displayName: S.optional(S.String),
          enableNotification: S.optional(S.Boolean),
          createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          environmentVariables: S.optional(__S(368, __c46, 0)),
          enableAutoBuild: S.optional(S.Boolean),
          enableSkewProtection: S.optional(S.Boolean),
          customDomains: S.optional(__S(376, __c47, 0)),
          framework: S.optional(S.String),
          activeJobId: S.optional(S.String),
          totalNumberOfJobs: S.optional(S.String),
          enableBasicAuth: S.optional(S.Boolean),
          enablePerformanceMode: S.optional(S.Boolean),
          thumbnailUrl: S.optional(S.String),
          basicAuthCredentials: S.optional(SensitiveString),
          buildSpec: S.optional(SensitiveString),
          ttl: S.optional(S.String),
          associatedResources: S.optional(__S(376, __c47, 0)),
          enablePullRequestPreview: S.optional(S.Boolean),
          pullRequestEnvironmentName: S.optional(S.String),
          destinationBranch: S.optional(S.String),
          sourceBranch: S.optional(S.String),
          backendEnvironmentArn: S.optional(S.String),
          backend: S.optional(__S(8, __c1, 0)),
          computeRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Branch" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ branch: __S(9, __c1, 1) }).pipe(ns)).annotate({
        identifier: "CreateBranchResult",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          fileMap: S.optional(__S(368, __c46, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/branches/{branchName}/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeploymentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          fileUploadUrls: S.optional(__S(368, __c46, 0)),
          zipUploadUrl: S.String,
        }).pipe(ns),
      ).annotate({ identifier: "CreateDeploymentResult" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          domainName: S.String,
          enableAutoSubDomain: S.optional(S.Boolean),
          subDomainSettings: __S(56, __c7, 0),
          autoSubDomainCreationPatterns: S.optional(__S(376, __c47, 0)),
          autoSubDomainIAMRole: S.optional(S.String),
          certificateSettings: S.optional(__S(57, __c7, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/domains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDomainAssociationRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ prefix: S.String, branchName: S.String })).annotate({
        identifier: "SubDomainSetting",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ subDomainSetting: __S(40, __c5, 0), verified: S.Boolean, dnsRecord: S.String }),
      ).annotate({ identifier: "SubDomain" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          customCertificateArn: S.optional(S.String),
          certificateVerificationDNSRecord: S.optional(S.String),
        }),
      ).annotate({ identifier: "Certificate" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          domainAssociationArn: S.String,
          domainName: S.String,
          enableAutoSubDomain: S.Boolean,
          autoSubDomainCreationPatterns: S.optional(__S(376, __c47, 0)),
          autoSubDomainIAMRole: S.optional(S.String),
          domainStatus: S.String,
          updateStatus: S.optional(S.String),
          statusReason: S.String,
          certificateVerificationDNSRecord: S.optional(S.String),
          subDomains: __S(42, __c5, 2),
          certificate: S.optional(__S(43, __c5, 3)),
        }),
      ).annotate({ identifier: "DomainAssociation" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ domainAssociation: __S(44, __c5, 4) }).pipe(ns)).annotate({
        identifier: "CreateDomainAssociationResult",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(40, __c5, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ type: S.String, customCertificateArn: S.optional(S.String) }),
      ).annotate({ identifier: "CertificateSettings" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String,
          description: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/webhooks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWebhookRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          webhookArn: S.String,
          webhookId: S.String,
          webhookUrl: S.String,
          appId: S.optional(S.String),
          branchName: S.String,
          description: S.String,
          createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Webhook" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ webhook: __S(72, __c9, 0) }).pipe(ns)).annotate({
        identifier: "CreateWebhookResult",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appId: S.String.pipe(T.HttpLabel("appId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/apps/{appId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          environmentName: S.String.pipe(T.HttpLabel("environmentName")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/apps/{appId}/backendenvironments/{environmentName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackendEnvironmentRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/apps/{appId}/branches/{branchName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBranchRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          domainName: S.String.pipe(T.HttpLabel("domainName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/apps/{appId}/domains/{domainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainAssociationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/apps/{appId}/branches/{branchName}/jobs/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteJobRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobId: S.String,
          commitId: S.optional(S.String),
          commitMessage: S.optional(S.String),
          commitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          jobType: S.optional(S.String),
          sourceUrl: S.optional(S.String),
          sourceUrlType: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobSummary" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jobSummary: __S(128, __c16, 0) }).pipe(ns)).annotate({
        identifier: "DeleteJobResult",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ webhookId: S.String.pipe(T.HttpLabel("webhookId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/webhooks/{webhookId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWebhookRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          domainName: S.String,
          appId: S.String.pipe(T.HttpLabel("appId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/accesslogs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateAccessLogsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ logUrl: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GenerateAccessLogsResult",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appId: S.String.pipe(T.HttpLabel("appId")) }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/apps/{appId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAppRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ artifactId: S.String.pipe(T.HttpLabel("artifactId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/artifacts/{artifactId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetArtifactUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ artifactId: S.String, artifactUrl: S.String }).pipe(ns),
      ).annotate({ identifier: "GetArtifactUrlResult" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          environmentName: S.String.pipe(T.HttpLabel("environmentName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/backendenvironments/{environmentName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBackendEnvironmentRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/branches/{branchName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBranchRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          domainName: S.String.pipe(T.HttpLabel("domainName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/domains/{domainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainAssociationRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/branches/{branchName}/jobs/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepName: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          logUrl: S.optional(S.String),
          artifactsUrl: S.optional(S.String),
          testArtifactsUrl: S.optional(S.String),
          testConfigUrl: S.optional(S.String),
          screenshots: S.optional(__S(368, __c46, 0)),
          statusReason: S.optional(S.String),
          context: S.optional(S.String),
        }),
      ).annotate({ identifier: "Step" });
    case 2:
      return S.Array(__S(201, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ summary: __S(128, __c16, 0), steps: __S(202, __c25, 2) }),
      ).annotate({ identifier: "Job" });
    case 4:
      return S.suspend(() => S.Struct({ job: __S(203, __c25, 3) }).pipe(ns)).annotate({
        identifier: "GetJobResult",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ webhookId: S.String.pipe(T.HttpLabel("webhookId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/webhooks/{webhookId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWebhookRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(ns, T.Http({ method: "GET", uri: "/apps" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAppsRequest" });
    case 1:
      return S.Array(__S(391, __c48, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({ apps: __S(217, __c27, 1), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListAppsResult" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/apps/{appId}/branches/{branchName}/jobs/{jobId}/artifacts",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListArtifactsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ artifactFileName: S.String, artifactId: S.String }),
      ).annotate({ identifier: "Artifact" });
    case 2:
      return S.Array(__S(225, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ artifacts: __S(226, __c28, 2), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListArtifactsResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          environmentName: S.optional(S.String).pipe(T.HttpQuery("environmentName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/backendenvironments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBackendEnvironmentsRequest" });
    case 1:
      return S.Array(__S(416, __c52, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ backendEnvironments: __S(233, __c29, 1), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListBackendEnvironmentsResult" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/branches" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBranchesRequest" });
    case 1:
      return S.Array(__S(9, __c1, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ branches: __S(241, __c30, 1), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListBranchesResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/domains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainAssociationsRequest" });
    case 1:
      return S.Array(__S(44, __c5, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ domainAssociations: __S(249, __c31, 1), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListDomainAssociationsResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/branches/{branchName}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobsRequest" });
    case 1:
      return S.Array(__S(128, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ jobSummaries: __S(257, __c32, 1), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListJobsResult" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            ns,
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(368, __c46, 0)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/apps/{appId}/webhooks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWebhooksRequest" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ webhooks: __S(273, __c34, 1), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListWebhooksResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          jobId: S.optional(S.String),
          sourceUrl: S.optional(S.String),
          sourceUrlType: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/apps/{appId}/branches/{branchName}/deployments/start",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDeploymentRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          jobId: S.optional(S.String),
          jobType: S.String,
          jobReason: S.optional(S.String),
          commitId: S.optional(S.String),
          commitMessage: S.optional(S.String),
          commitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/branches/{branchName}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartJobRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/apps/{appId}/branches/{branchName}/jobs/{jobId}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopJobRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(368, __c46, 0),
        }).pipe(
          T.all(
            ns,
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
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(376, __c47, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            ns,
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
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          platform: S.optional(S.String),
          computeRoleArn: S.optional(S.String),
          iamServiceRoleArn: S.optional(S.String),
          environmentVariables: S.optional(__S(368, __c46, 0)),
          enableBranchAutoBuild: S.optional(S.Boolean),
          enableBranchAutoDeletion: S.optional(S.Boolean),
          enableBasicAuth: S.optional(S.Boolean),
          basicAuthCredentials: S.optional(SensitiveString),
          customRules: S.optional(__S(385, __c48, 1)),
          buildSpec: S.optional(SensitiveString),
          customHeaders: S.optional(S.String),
          enableAutoBranchCreation: S.optional(S.Boolean),
          autoBranchCreationPatterns: S.optional(__S(376, __c47, 0)),
          autoBranchCreationConfig: S.optional(__S(386, __c48, 2)),
          repository: S.optional(S.String),
          oauthToken: S.optional(SensitiveString),
          accessToken: S.optional(SensitiveString),
          jobConfig: S.optional(__S(387, __c48, 3)),
          cacheConfig: S.optional(__S(388, __c48, 4)),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/apps/{appId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAppRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          branchName: S.String.pipe(T.HttpLabel("branchName")),
          description: S.optional(S.String),
          framework: S.optional(S.String),
          stage: S.optional(S.String),
          enableNotification: S.optional(S.Boolean),
          enableAutoBuild: S.optional(S.Boolean),
          enableSkewProtection: S.optional(S.Boolean),
          environmentVariables: S.optional(__S(368, __c46, 0)),
          basicAuthCredentials: S.optional(SensitiveString),
          enableBasicAuth: S.optional(S.Boolean),
          enablePerformanceMode: S.optional(S.Boolean),
          buildSpec: S.optional(SensitiveString),
          ttl: S.optional(S.String),
          displayName: S.optional(S.String),
          enablePullRequestPreview: S.optional(S.Boolean),
          pullRequestEnvironmentName: S.optional(S.String),
          backendEnvironmentArn: S.optional(S.String),
          backend: S.optional(__S(8, __c1, 0)),
          computeRoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/branches/{branchName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBranchRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          enableAutoSubDomain: S.optional(S.Boolean),
          subDomainSettings: S.optional(__S(56, __c7, 0)),
          autoSubDomainCreationPatterns: S.optional(__S(376, __c47, 0)),
          autoSubDomainIAMRole: S.optional(S.String),
          certificateSettings: S.optional(__S(57, __c7, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/domains/{domainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainAssociationRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          webhookId: S.String.pipe(T.HttpLabel("webhookId")),
          branchName: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/webhooks/{webhookId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWebhookRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          repository: S.optional(S.String),
          platform: S.optional(S.String),
          computeRoleArn: S.optional(S.String),
          iamServiceRoleArn: S.optional(S.String),
          oauthToken: S.optional(SensitiveString),
          accessToken: S.optional(SensitiveString),
          environmentVariables: S.optional(__S(368, __c46, 0)),
          enableBranchAutoBuild: S.optional(S.Boolean),
          enableBranchAutoDeletion: S.optional(S.Boolean),
          enableBasicAuth: S.optional(S.Boolean),
          basicAuthCredentials: S.optional(SensitiveString),
          customRules: S.optional(__S(385, __c48, 1)),
          tags: S.optional(__S(368, __c46, 0)),
          buildSpec: S.optional(SensitiveString),
          customHeaders: S.optional(S.String),
          enableAutoBranchCreation: S.optional(S.Boolean),
          autoBranchCreationPatterns: S.optional(__S(376, __c47, 0)),
          autoBranchCreationConfig: S.optional(__S(386, __c48, 2)),
          jobConfig: S.optional(__S(387, __c48, 3)),
          cacheConfig: S.optional(__S(388, __c48, 4)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/apps" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAppRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          source: S.String,
          target: S.String,
          status: S.optional(S.String),
          condition: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomRule" });
    case 1:
      return S.Array(__S(384, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          stage: S.optional(S.String),
          framework: S.optional(S.String),
          enableAutoBuild: S.optional(S.Boolean),
          environmentVariables: S.optional(__S(368, __c46, 0)),
          basicAuthCredentials: S.optional(SensitiveString),
          enableBasicAuth: S.optional(S.Boolean),
          enablePerformanceMode: S.optional(S.Boolean),
          buildSpec: S.optional(SensitiveString),
          enablePullRequestPreview: S.optional(S.Boolean),
          pullRequestEnvironmentName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoBranchCreationConfig" });
    case 3:
      return S.suspend(() => S.Struct({ buildComputeType: S.String })).annotate({
        identifier: "JobConfig",
      });
    case 4:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({ identifier: "CacheConfig" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          lastDeployTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          thumbnailUrl: S.optional(S.String),
          branchName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProductionBranch" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          webAclArn: S.optional(S.String),
          wafStatus: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "WafConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          appId: S.String,
          appArn: S.String,
          name: S.String,
          tags: S.optional(__S(368, __c46, 0)),
          description: S.optional(S.String),
          repository: S.optional(S.String),
          platform: S.optional(S.String),
          createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          computeRoleArn: S.optional(S.String),
          iamServiceRoleArn: S.optional(S.String),
          environmentVariables: S.optional(__S(368, __c46, 0)),
          defaultDomain: S.optional(S.String),
          enableBranchAutoBuild: S.optional(S.Boolean),
          enableBranchAutoDeletion: S.optional(S.Boolean),
          enableBasicAuth: S.optional(S.Boolean),
          basicAuthCredentials: S.optional(SensitiveString),
          customRules: S.optional(__S(385, __c48, 1)),
          productionBranch: S.optional(__S(389, __c48, 5)),
          buildSpec: S.optional(SensitiveString),
          customHeaders: S.optional(S.String),
          enableAutoBranchCreation: S.optional(S.Boolean),
          autoBranchCreationPatterns: S.optional(__S(376, __c47, 0)),
          autoBranchCreationConfig: S.optional(__S(386, __c48, 2)),
          repositoryCloneMethod: S.optional(S.String),
          cacheConfig: S.optional(__S(388, __c48, 4)),
          webhookCreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          wafConfiguration: S.optional(__S(390, __c48, 6)),
          jobConfig: S.optional(__S(387, __c48, 3)),
        }),
      ).annotate({ identifier: "App" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ app: __S(391, __c48, 7) }).pipe(ns)).annotate({
        identifier: "CreateAppResult",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String.pipe(T.HttpLabel("appId")),
          environmentName: S.String,
          stackName: S.optional(S.String),
          deploymentArtifacts: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/apps/{appId}/backendenvironments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBackendEnvironmentRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ backendEnvironment: __S(416, __c52, 0) }).pipe(ns),
      ).annotate({ identifier: "CreateBackendEnvironmentResult" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          backendEnvironmentArn: S.String,
          environmentName: S.String,
          stackName: S.optional(S.String),
          deploymentArtifacts: S.optional(S.String),
          createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "BackendEnvironment" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
