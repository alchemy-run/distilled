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
  sdkId: "Amplify",
  target: "Amplify",
  version: "2017-07-25",
  sigv4: "amplify",
  protocol: restJson1Protocol,
  xmlns: "http://amplify.amazonaws.com",
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
                `https://amplify-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://amplify-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://amplify.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://amplify.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DependentServiceFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "DependentServiceFailureException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly code: string; readonly message: string }> {}
export class TimeoutException
  extends /*@__PURE__*/ TE.TaggedError("TimeoutException")<{
    readonly message?: string;
  }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
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
export type BuildComputeType =
  | "STANDARD_8GB"
  | "LARGE_16GB"
  | "XLARGE_72GB"
  | (string & {});
export interface JobConfig {
  buildComputeType: BuildComputeType;
}
export type CacheConfigType =
  | "AMPLIFY_MANAGED"
  | "AMPLIFY_MANAGED_NO_COOKIES"
  | (string & {});
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
export type JobType =
  | "RELEASE"
  | "RETRY"
  | "MANUAL"
  | "WEB_HOOK"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /apps",
    input: {
      name: 0,
      description: 0,
      repository: 0,
      platform: 0,
      computeRoleArn: 0,
      iamServiceRoleArn: 0,
      oauthToken: 0,
      accessToken: 0,
      environmentVariables: 0,
      enableBranchAutoBuild: 0,
      enableBranchAutoDeletion: 0,
      enableBasicAuth: 0,
      basicAuthCredentials: 0,
      customRules: D.list(i_CustomRule),
      tags: 0,
      buildSpec: 0,
      customHeaders: 0,
      enableAutoBranchCreation: 0,
      autoBranchCreationPatterns: 0,
      autoBranchCreationConfig: i_AutoBranchCreationConfig,
      jobConfig: i_JobConfig,
      cacheConfig: i_CacheConfig,
    },
    output: { app: o_App },
    body: true,
  },
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
})) as any;

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
 * command line interface (CLI). This API isn’t available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const createBackendEnvironment: API.OperationMethod<
  CreateBackendEnvironmentRequest,
  CreateBackendEnvironmentResult,
  CreateBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/backendenvironments",
    input: {
      appId: 0,
      environmentName: 0,
      stackName: 0,
      deploymentArtifacts: 0,
    },
    output: { backendEnvironment: o_BackendEnvironment },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/branches",
    input: {
      appId: 0,
      branchName: 0,
      description: 0,
      stage: 0,
      framework: 0,
      enableNotification: 0,
      enableAutoBuild: 0,
      enableSkewProtection: 0,
      environmentVariables: 0,
      basicAuthCredentials: 0,
      enableBasicAuth: 0,
      enablePerformanceMode: 0,
      tags: 0,
      buildSpec: 0,
      ttl: 0,
      displayName: 0,
      enablePullRequestPreview: 0,
      pullRequestEnvironmentName: 0,
      backendEnvironmentArn: 0,
      backend: i_Backend,
      computeRoleArn: 0,
    },
    output: { branch: o_Branch },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/branches/{branchName}/deployments",
    input: { appId: 0, branchName: 0, fileMap: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/domains",
    input: {
      appId: 0,
      domainName: 0,
      enableAutoSubDomain: 0,
      subDomainSettings: D.list(i_SubDomainSetting),
      autoSubDomainCreationPatterns: 0,
      autoSubDomainIAMRole: 0,
      certificateSettings: i_CertificateSettings,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/webhooks",
    input: { appId: 0, branchName: 0, description: 0 },
    output: { webhook: o_Webhook },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /apps/{appId}",
    input: { appId: 0 },
    output: { app: o_App },
  },
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
})) as any;

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
 * command line interface (CLI). This API isn’t available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const deleteBackendEnvironment: API.OperationMethod<
  DeleteBackendEnvironmentRequest,
  DeleteBackendEnvironmentResult,
  DeleteBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /apps/{appId}/backendenvironments/{environmentName}",
    input: { appId: 0, environmentName: 0 },
    output: { backendEnvironment: o_BackendEnvironment },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /apps/{appId}/branches/{branchName}",
    input: { appId: 0, branchName: 0 },
    output: { branch: o_Branch },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /apps/{appId}/domains/{domainName}",
    input: { appId: 0, domainName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /apps/{appId}/branches/{branchName}/jobs/{jobId}",
    input: { appId: 0, branchName: 0, jobId: 0 },
    output: { jobSummary: o_JobSummary },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /webhooks/{webhookId}",
    input: { webhookId: 0 },
    output: { webhook: o_Webhook },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/accesslogs",
    input: { startTime: 0, endTime: 0, domainName: 0, appId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}",
    input: { appId: 0 },
    output: { app: o_App },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /artifacts/{artifactId}",
    input: { artifactId: 0 },
  },
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
})) as any;

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
 * command line interface (CLI). This API isn’t available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const getBackendEnvironment: API.OperationMethod<
  GetBackendEnvironmentRequest,
  GetBackendEnvironmentResult,
  GetBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/backendenvironments/{environmentName}",
    input: { appId: 0, environmentName: 0 },
    output: { backendEnvironment: o_BackendEnvironment },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/branches/{branchName}",
    input: { appId: 0, branchName: 0 },
    output: { branch: o_Branch },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/domains/{domainName}",
    input: { appId: 0, domainName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/branches/{branchName}/jobs/{jobId}",
    input: { appId: 0, branchName: 0, jobId: 0 },
    output: {
      job: {
        summary: o_JobSummary,
        steps: D.list({ startTime: D.ts, endTime: D.ts }),
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /webhooks/{webhookId}",
    input: { webhookId: 0 },
    output: { webhook: o_Webhook },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { apps: D.list(o_App) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
    TimeoutException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/branches/{branchName}/jobs/{jobId}/artifacts",
    input: {
      appId: 0,
      branchName: 0,
      jobId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
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
})) as any;

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
 * command line interface (CLI). This API isn’t available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const listBackendEnvironments: API.OperationMethod<
  ListBackendEnvironmentsRequest,
  ListBackendEnvironmentsResult,
  ListBackendEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/backendenvironments",
    input: {
      appId: 0,
      environmentName: D.m({ query: "environmentName" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { backendEnvironments: D.list(o_BackendEnvironment) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackendEnvironments",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/branches",
    input: {
      appId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { branches: D.list(o_Branch) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
    TimeoutException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/domains",
    input: {
      appId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
    TimeoutException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/branches/{branchName}/jobs",
    input: {
      appId: 0,
      branchName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { jobSummaries: D.list(o_JobSummary) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps/{appId}/webhooks",
    input: {
      appId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { webhooks: D.list(o_Webhook) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/branches/{branchName}/deployments/start",
    input: {
      appId: 0,
      branchName: 0,
      jobId: 0,
      sourceUrl: 0,
      sourceUrlType: 0,
    },
    output: { jobSummary: o_JobSummary },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/branches/{branchName}/jobs",
    input: {
      appId: 0,
      branchName: 0,
      jobId: 0,
      jobType: 0,
      jobReason: 0,
      commitId: 0,
      commitMessage: 0,
      commitTime: 0,
    },
    output: { jobSummary: o_JobSummary },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /apps/{appId}/branches/{branchName}/jobs/{jobId}/stop",
    input: { appId: 0, branchName: 0, jobId: 0 },
    output: { jobSummary: o_JobSummary },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}",
    input: {
      appId: 0,
      name: 0,
      description: 0,
      platform: 0,
      computeRoleArn: 0,
      iamServiceRoleArn: 0,
      environmentVariables: 0,
      enableBranchAutoBuild: 0,
      enableBranchAutoDeletion: 0,
      enableBasicAuth: 0,
      basicAuthCredentials: 0,
      customRules: D.list(i_CustomRule),
      buildSpec: 0,
      customHeaders: 0,
      enableAutoBranchCreation: 0,
      autoBranchCreationPatterns: 0,
      autoBranchCreationConfig: i_AutoBranchCreationConfig,
      repository: 0,
      oauthToken: 0,
      accessToken: 0,
      jobConfig: i_JobConfig,
      cacheConfig: i_CacheConfig,
    },
    output: { app: o_App },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/branches/{branchName}",
    input: {
      appId: 0,
      branchName: 0,
      description: 0,
      framework: 0,
      stage: 0,
      enableNotification: 0,
      enableAutoBuild: 0,
      enableSkewProtection: 0,
      environmentVariables: 0,
      basicAuthCredentials: 0,
      enableBasicAuth: 0,
      enablePerformanceMode: 0,
      buildSpec: 0,
      ttl: 0,
      displayName: 0,
      enablePullRequestPreview: 0,
      pullRequestEnvironmentName: 0,
      backendEnvironmentArn: 0,
      backend: i_Backend,
      computeRoleArn: 0,
    },
    output: { branch: o_Branch },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps/{appId}/domains/{domainName}",
    input: {
      appId: 0,
      domainName: 0,
      enableAutoSubDomain: 0,
      subDomainSettings: D.list(i_SubDomainSetting),
      autoSubDomainCreationPatterns: 0,
      autoSubDomainIAMRole: 0,
      certificateSettings: i_CertificateSettings,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /webhooks/{webhookId}",
    input: { webhookId: 0, branchName: 0, description: 0 },
    output: { webhook: o_Webhook },
    body: true,
  },
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
})) as any;

const i_AutoBranchCreationConfig: D.LazyStruct = () => ({
  stage: 0,
  framework: 0,
  enableAutoBuild: 0,
  environmentVariables: 0,
  basicAuthCredentials: 0,
  enableBasicAuth: 0,
  enablePerformanceMode: 0,
  buildSpec: 0,
  enablePullRequestPreview: 0,
  pullRequestEnvironmentName: 0,
});
const i_Backend: D.LazyStruct = () => ({ stackArn: 0 });
const i_CacheConfig: D.LazyStruct = () => ({ type: 0 });
const i_CertificateSettings: D.LazyStruct = () => ({
  type: 0,
  customCertificateArn: 0,
});
const i_CustomRule: D.LazyStruct = () => ({
  source: 0,
  target: 0,
  status: 0,
  condition: 0,
});
const i_JobConfig: D.LazyStruct = () => ({ buildComputeType: 0 });
const i_SubDomainSetting: D.LazyStruct = () => ({ prefix: 0, branchName: 0 });
const o_App: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
  basicAuthCredentials: D.secret,
  productionBranch: { lastDeployTime: D.ts },
  buildSpec: D.secret,
  autoBranchCreationConfig: {
    basicAuthCredentials: D.secret,
    buildSpec: D.secret,
  },
  webhookCreateTime: D.ts,
});
const o_BackendEnvironment: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_Branch: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
  basicAuthCredentials: D.secret,
  buildSpec: D.secret,
});
const o_JobSummary: D.LazyStruct = () => ({
  commitTime: D.ts,
  startTime: D.ts,
  endTime: D.ts,
});
const o_Webhook: D.LazyStruct = () => ({ createTime: D.ts, updateTime: D.ts });
