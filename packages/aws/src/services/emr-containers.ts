import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "EMR containers",
  serviceShapeName: "AwsChicagoWebService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "emr-containers" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-10-01");
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
              `https://emr-containers-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "us-gov-east-1") {
              return e("https://emr-containers.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://emr-containers.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://emr-containers-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://emr-containers.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://emr-containers.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://emr-containers.{R}.{D}","properties":{},"headers":{}}');

export class EKSRequestThrottledException
  extends /*@__PURE__*/ S.TaggedError<EKSRequestThrottledException>()(
    "EKSRequestThrottledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidResourceArn
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceArn>()(
    "InvalidResourceArn",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "BadRequestException",
      message: { includes: "Invalid input resource arn" },
    }),
  ) {}
export class RequestThrottledException
  extends /*@__PURE__*/ S.TaggedError<RequestThrottledException>()(
    "RequestThrottledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()("TooManyRequestsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceIdString = string;
export interface CancelJobRunRequest {
  id: string;
  virtualClusterId: string;
}
export interface CancelJobRunResponse {
  id?: string;
  virtualClusterId?: string;
}
export type ResourceNameString = string;
export type ClientToken = string;
export type ParametricIAMRoleArn = string;
export type ParametricReleaseLabel = string;
export type String1024 = string;
export type SensitivePropertiesMap = { [key: string]: string | undefined };
export interface Configuration {
  classification: string;
  properties?: { [key: string]: string | undefined };
  configurations?: Configuration[];
}
export type ConfigurationList = Configuration[];
export type TemplateParameter = string;
export type String256 = string;
export interface ParametricCloudWatchMonitoringConfiguration {
  logGroupName?: string;
  logStreamNamePrefix?: string;
}
export type UriString = string;
export interface ParametricS3MonitoringConfiguration {
  logUri?: string;
}
export interface ParametricMonitoringConfiguration {
  persistentAppUI?: string;
  cloudWatchMonitoringConfiguration?: ParametricCloudWatchMonitoringConfiguration;
  s3MonitoringConfiguration?: ParametricS3MonitoringConfiguration;
}
export interface ParametricConfigurationOverrides {
  applicationConfiguration?: Configuration[];
  monitoringConfiguration?: ParametricMonitoringConfiguration;
}
export type EntryPointPath = string | redacted.Redacted<string>;
export type EntryPointArgument = string | redacted.Redacted<string>;
export type EntryPointArguments = (string | redacted.Redacted<string>)[];
export type SparkSubmitParameters = string | redacted.Redacted<string>;
export interface SparkSubmitJobDriver {
  entryPoint: string | redacted.Redacted<string>;
  entryPointArguments?: (string | redacted.Redacted<string>)[];
  sparkSubmitParameters?: string | redacted.Redacted<string>;
}
export type SparkSqlParameters = string | redacted.Redacted<string>;
export interface SparkSqlJobDriver {
  entryPoint?: string | redacted.Redacted<string>;
  sparkSqlParameters?: string | redacted.Redacted<string>;
}
export interface JobDriver {
  sparkSubmitJobDriver?: SparkSubmitJobDriver;
  sparkSqlJobDriver?: SparkSqlJobDriver;
}
export type TemplateParameterName = string;
export type TemplateParameterDataType = "NUMBER" | "STRING" | (string & {});
export interface TemplateParameterConfiguration {
  type?: TemplateParameterDataType;
  defaultValue?: string;
}
export type TemplateParameterConfigurationMap = {
  [key: string]: TemplateParameterConfiguration | undefined;
};
export type String128 = string;
export type StringEmpty256 = string;
export type TagMap = { [key: string]: string | undefined };
export interface JobTemplateData {
  executionRoleArn: string;
  releaseLabel: string;
  configurationOverrides?: ParametricConfigurationOverrides;
  jobDriver: JobDriver;
  parameterConfiguration?: { [key: string]: TemplateParameterConfiguration | undefined };
  jobTags?: { [key: string]: string | undefined };
}
export type KmsKeyArn = string;
export interface CreateJobTemplateRequest {
  name: string;
  clientToken: string;
  jobTemplateData: JobTemplateData;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export type JobTemplateArn = string;
export interface CreateJobTemplateResponse {
  id?: string;
  name?: string;
  arn?: string;
  createdAt?: Date;
}
export type EndpointType = string;
export type ReleaseLabel = string;
export type IAMRoleArn = string;
export type ACMCertArn = string;
export type AllowAWSToRetainLogs = "ENABLED" | "DISABLED" | (string & {});
export interface ManagedLogs {
  allowAWSToRetainLogs?: AllowAWSToRetainLogs;
  encryptionKeyArn?: string;
}
export type PersistentAppUI = "ENABLED" | "DISABLED" | (string & {});
export type LogGroupName = string;
export interface CloudWatchMonitoringConfiguration {
  logGroupName: string;
  logStreamNamePrefix?: string;
}
export interface S3MonitoringConfiguration {
  logUri: string;
  encryptionKeyArn?: string;
}
export type RotationSize = string;
export type MaxFilesToKeep = number;
export interface ContainerLogRotationConfiguration {
  rotationSize: string;
  maxFilesToKeep: number;
}
export interface MonitoringConfiguration {
  managedLogs?: ManagedLogs;
  persistentAppUI?: PersistentAppUI;
  cloudWatchMonitoringConfiguration?: CloudWatchMonitoringConfiguration;
  s3MonitoringConfiguration?: S3MonitoringConfiguration;
  containerLogRotationConfiguration?: ContainerLogRotationConfiguration;
}
export interface ConfigurationOverrides {
  applicationConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
}
export type SessionIdleTimeoutInMinutes = number;
export interface CreateManagedEndpointRequest {
  name: string;
  virtualClusterId: string;
  type: string;
  releaseLabel: string;
  executionRoleArn: string;
  certificateArn?: string;
  configurationOverrides?: ConfigurationOverrides;
  clientToken: string;
  tags?: { [key: string]: string | undefined };
  sessionIdleTimeoutInMinutes?: number;
}
export type EndpointArn = string;
export interface CreateManagedEndpointResponse {
  id?: string;
  name?: string;
  arn?: string;
  virtualClusterId?: string;
}
export type ContainerProviderType = "EKS" | (string & {});
export type ClusterId = string;
export type KubernetesNamespace = string;
export type NodeLabelString = string;
export interface EksInfo {
  namespace?: string;
  nodeLabel?: string;
}
export type ContainerInfo = { eksInfo: EksInfo };
export interface ContainerProvider {
  type: ContainerProviderType;
  id: string;
  info?: ContainerInfo;
}
export type SessionTagValue = string;
export interface SecureNamespaceInfo {
  clusterId?: string;
  namespace?: string;
}
export interface LakeFormationConfiguration {
  authorizedSessionTagValue?: string;
  secureNamespaceInfo?: SecureNamespaceInfo;
  queryEngineRoleArn?: string;
}
export type CertificateProviderType = "PEM" | (string & {});
export type SecretsManagerArn = string;
export interface TLSCertificateConfiguration {
  certificateProviderType?: CertificateProviderType;
  publicCertificateSecretArn?: string;
  privateCertificateSecretArn?: string;
}
export interface InTransitEncryptionConfiguration {
  tlsCertificateConfiguration?: TLSCertificateConfiguration;
}
export interface EncryptionConfiguration {
  inTransitEncryptionConfiguration?: InTransitEncryptionConfiguration;
}
export interface AuthorizationConfiguration {
  lakeFormationConfiguration?: LakeFormationConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
}
export type IdentityCenterInstanceARN = string;
export type EmrIdentityCenterApplicationARN = string;
export interface IdentityCenterConfiguration {
  enableIdentityCenter?: boolean;
  identityCenterApplicationAssignmentRequired?: boolean;
  identityCenterInstanceARN?: string;
  emrIdentityCenterApplicationARN?: string;
}
export interface IAMConfiguration {
  systemRole?: string;
}
export interface AuthenticationConfiguration {
  identityCenterConfiguration?: IdentityCenterConfiguration;
  iamConfiguration?: IAMConfiguration;
}
export interface SecurityConfigurationData {
  authorizationConfiguration?: AuthorizationConfiguration;
  authenticationConfiguration?: AuthenticationConfiguration;
}
export interface CreateSecurityConfigurationRequest {
  clientToken: string;
  name: string;
  containerProvider?: ContainerProvider;
  securityConfigurationData: SecurityConfigurationData;
  tags?: { [key: string]: string | undefined };
}
export type SecurityConfigurationArn = string;
export interface CreateSecurityConfigurationResponse {
  id?: string;
  name?: string;
  arn?: string;
}
export type InQueueJobLimitInteger = number;
export type JobLimitInteger = number;
export interface SchedulerConfiguration {
  maxInQueueJobRuns?: number;
  maxConcurrentJobRuns?: number;
}
export interface CreateVirtualClusterRequest {
  name: string;
  containerProvider: ContainerProvider;
  clientToken: string;
  tags?: { [key: string]: string | undefined };
  securityConfigurationId?: string;
  sessionEnabled?: boolean;
  schedulerConfiguration?: SchedulerConfiguration;
}
export type VirtualClusterArn = string;
export interface CreateVirtualClusterResponse {
  id?: string;
  name?: string;
  arn?: string;
}
export interface DeleteJobTemplateRequest {
  id: string;
}
export interface DeleteJobTemplateResponse {
  id?: string;
}
export interface DeleteManagedEndpointRequest {
  id: string;
  virtualClusterId: string;
}
export interface DeleteManagedEndpointResponse {
  id?: string;
  virtualClusterId?: string;
}
export interface DeleteSecurityConfigurationRequest {
  id: string;
}
export interface DeleteSecurityConfigurationResponse {
  id?: string;
}
export interface DeleteVirtualClusterRequest {
  id: string;
}
export interface DeleteVirtualClusterResponse {
  id?: string;
}
export interface DescribeJobRunRequest {
  id: string;
  virtualClusterId: string;
}
export type JobArn = string;
export type JobRunState =
  | "PENDING"
  | "SUBMITTED"
  | "RUNNING"
  | "FAILED"
  | "CANCELLED"
  | "CANCEL_PENDING"
  | "COMPLETED"
  | (string & {});
export type RequestIdentityUserArn = string;
export type FailureReason =
  | "INTERNAL_ERROR"
  | "USER_ERROR"
  | "VALIDATION_ERROR"
  | "CLUSTER_UNAVAILABLE"
  | (string & {});
export type JavaInteger = number;
export interface RetryPolicyConfiguration {
  maxAttempts: number;
}
export interface RetryPolicyExecution {
  currentAttemptCount: number;
}
export interface JobRun {
  id?: string;
  name?: string;
  virtualClusterId?: string;
  arn?: string;
  state?: JobRunState;
  clientToken?: string;
  executionRoleArn?: string;
  releaseLabel?: string;
  configurationOverrides?: ConfigurationOverrides;
  jobDriver?: JobDriver;
  createdAt?: Date;
  createdBy?: string;
  finishedAt?: Date;
  stateDetails?: string;
  failureReason?: FailureReason;
  tags?: { [key: string]: string | undefined };
  retryPolicyConfiguration?: RetryPolicyConfiguration;
  retryPolicyExecution?: RetryPolicyExecution;
}
export interface DescribeJobRunResponse {
  jobRun?: JobRun;
}
export interface DescribeJobTemplateRequest {
  id: string;
}
export type String2048 = string;
export interface JobTemplate {
  name?: string;
  id?: string;
  arn?: string;
  createdAt?: Date;
  createdBy?: string;
  tags?: { [key: string]: string | undefined };
  jobTemplateData: JobTemplateData;
  kmsKeyArn?: string;
  decryptionError?: string;
}
export interface DescribeJobTemplateResponse {
  jobTemplate?: JobTemplate;
}
export interface DescribeManagedEndpointRequest {
  id: string;
  virtualClusterId: string;
}
export type EndpointState =
  | "CREATING"
  | "ACTIVE"
  | "TERMINATING"
  | "TERMINATED"
  | "TERMINATED_WITH_ERRORS"
  | (string & {});
export type Base64Encoded = string;
export interface Certificate {
  certificateArn?: string;
  certificateData?: string;
}
export type SubnetIds = string[];
export interface Endpoint {
  id?: string;
  name?: string;
  arn?: string;
  virtualClusterId?: string;
  type?: string;
  state?: EndpointState;
  releaseLabel?: string;
  executionRoleArn?: string;
  certificateArn?: string;
  certificateAuthority?: Certificate;
  configurationOverrides?: ConfigurationOverrides;
  serverUrl?: string;
  authProxyUrl?: string;
  createdAt?: Date;
  securityGroup?: string;
  subnetIds?: string[];
  stateDetails?: string;
  failureReason?: FailureReason;
  tags?: { [key: string]: string | undefined };
}
const Endpoint = /*@__PURE__*/ __L.at(__c37, 11) as any as S.Schema<Endpoint>;
export interface DescribeManagedEndpointResponse {
  endpoint?: Endpoint;
}
export interface DescribeSecurityConfigurationRequest {
  id: string;
}
export interface SecurityConfiguration {
  id?: string;
  name?: string;
  arn?: string;
  createdAt?: Date;
  createdBy?: string;
  securityConfigurationData?: SecurityConfigurationData;
  tags?: { [key: string]: string | undefined };
}
export interface DescribeSecurityConfigurationResponse {
  securityConfiguration?: SecurityConfiguration;
}
export interface DescribeVirtualClusterRequest {
  id: string;
}
export type VirtualClusterState =
  | "RUNNING"
  | "TERMINATING"
  | "TERMINATED"
  | "ARRESTED"
  | (string & {});
export type NonNegativeInteger = number;
export interface SchedulerStatus {
  currentInQueueJobRuns?: number;
  currentConcurrentJobRuns?: number;
}
export interface VirtualCluster {
  id?: string;
  name?: string;
  arn?: string;
  state?: VirtualClusterState;
  containerProvider?: ContainerProvider;
  createdAt?: Date;
  tags?: { [key: string]: string | undefined };
  securityConfigurationId?: string;
  sessionEnabled?: boolean;
  schedulerConfiguration?: SchedulerConfiguration;
  schedulerStatus?: SchedulerStatus;
}
export interface DescribeVirtualClusterResponse {
  virtualCluster?: VirtualCluster;
}
export type CredentialType = string;
export type LogContext = string;
export interface GetManagedEndpointSessionCredentialsRequest {
  endpointIdentifier: string;
  virtualClusterIdentifier: string;
  executionRoleArn: string;
  credentialType: string;
  durationInSeconds?: number;
  logContext?: string;
  clientToken?: string;
}
export type Token = string | redacted.Redacted<string>;
export type Credentials = { token: string | redacted.Redacted<string> };
export interface GetManagedEndpointSessionCredentialsResponse {
  id?: string;
  credentials?: Credentials;
  endpointCredentials?: Credentials;
  expiresAt?: Date;
}
export type JobRunStates = JobRunState[];
export type NextToken = string;
export interface ListJobRunsRequest {
  virtualClusterId: string;
  createdBefore?: Date;
  createdAfter?: Date;
  name?: string;
  states?: JobRunState[];
  maxResults?: number;
  nextToken?: string;
}
export type JobRuns = JobRun[];
export interface ListJobRunsResponse {
  jobRuns?: JobRun[];
  nextToken?: string;
}
export interface ListJobTemplatesRequest {
  createdAfter?: Date;
  createdBefore?: Date;
  maxResults?: number;
  nextToken?: string;
}
export type JobTemplates = JobTemplate[];
export interface ListJobTemplatesResponse {
  templates?: JobTemplate[];
  nextToken?: string;
}
export type EndpointTypes = string[];
export type EndpointStates = EndpointState[];
export interface ListManagedEndpointsRequest {
  virtualClusterId: string;
  createdBefore?: Date;
  createdAfter?: Date;
  types?: string[];
  states?: EndpointState[];
  maxResults?: number;
  nextToken?: string;
}
export type Endpoints = Endpoint[];
export interface ListManagedEndpointsResponse {
  endpoints?: Endpoint[];
  nextToken?: string;
}
export interface ListSecurityConfigurationsRequest {
  createdAfter?: Date;
  createdBefore?: Date;
  maxResults?: number;
  nextToken?: string;
}
export type SecurityConfigurations = SecurityConfiguration[];
export interface ListSecurityConfigurationsResponse {
  securityConfigurations?: SecurityConfiguration[];
  nextToken?: string;
}
export type RsiArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type VirtualClusterStates = VirtualClusterState[];
export interface ListVirtualClustersRequest {
  containerProviderId?: string;
  containerProviderType?: ContainerProviderType;
  createdAfter?: Date;
  createdBefore?: Date;
  states?: VirtualClusterState[];
  maxResults?: number;
  nextToken?: string;
  eksAccessEntryIntegrated?: boolean;
}
export type VirtualClusters = VirtualCluster[];
export interface ListVirtualClustersResponse {
  virtualClusters?: VirtualCluster[];
  nextToken?: string;
}
export type TemplateParameterInputMap = { [key: string]: string | undefined };
export interface StartJobRunRequest {
  name?: string;
  virtualClusterId: string;
  clientToken: string;
  executionRoleArn?: string;
  releaseLabel?: string;
  jobDriver?: JobDriver;
  configurationOverrides?: ConfigurationOverrides;
  tags?: { [key: string]: string | undefined };
  jobTemplateId?: string;
  jobTemplateParameters?: { [key: string]: string | undefined };
  retryPolicyConfiguration?: RetryPolicyConfiguration;
}
export interface StartJobRunResponse {
  id?: string;
  name?: string;
  arn?: string;
  virtualClusterId?: string;
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
export interface UpdateVirtualClusterRequest {
  id: string;
  schedulerConfiguration?: SchedulerConfiguration;
  clientToken: string;
}
export interface UpdateVirtualClusterResponse {
  virtualCluster?: VirtualCluster;
}
export type CancelJobRunError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels a job run. A job run is a unit of work, such as a Spark jar, PySpark script, or
 * SparkSQL query, that you submit to Amazon EMR on EKS.
 */
export const cancelJobRun: API.OperationMethod<
  CancelJobRunRequest,
  CancelJobRunResponse,
  CancelJobRunError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<CancelJobRunRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<CancelJobRunResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJobRun",
}));

export type CreateJobTemplateError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a job template. Job template stores values of StartJobRun API request in a
 * template and can be used to start a job run. Job template allows two use cases: avoid
 * repeating recurring StartJobRun API request values, enforcing certain values in StartJobRun
 * API request.
 */
export const createJobTemplate: API.OperationMethod<
  CreateJobTemplateRequest,
  CreateJobTemplateResponse,
  CreateJobTemplateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<CreateJobTemplateRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<CreateJobTemplateResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobTemplate",
}));

export type CreateManagedEndpointError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a managed endpoint. A managed endpoint is a gateway that connects Amazon EMR Studio to Amazon EMR on EKS so that Amazon EMR Studio can
 * communicate with your virtual cluster.
 */
export const createManagedEndpoint: API.OperationMethod<
  CreateManagedEndpointRequest,
  CreateManagedEndpointResponse,
  CreateManagedEndpointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<CreateManagedEndpointRequest>,
  output: __S(672, __c42, 0) as any as S.Schema<CreateManagedEndpointResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateManagedEndpoint",
}));

export type CreateSecurityConfigurationError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a security configuration. Security configurations in Amazon EMR on EKS are
 * templates for different security setups. You can use security configurations to configure
 * the Lake Formation integration setup. You can also create a security configuration
 * to re-use a security setup each time you create a virtual cluster.
 */
export const createSecurityConfiguration: API.OperationMethod<
  CreateSecurityConfigurationRequest,
  CreateSecurityConfigurationResponse,
  CreateSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateSecurityConfigurationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateSecurityConfigurationResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityConfiguration",
}));

export type CreateVirtualClusterError =
  | EKSRequestThrottledException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual cluster. Virtual cluster is a managed entity on Amazon EMR on EKS. You can create, update, describe, list and delete virtual clusters. They do not consume any
 * additional resource in your system. A single virtual cluster maps to a single Kubernetes
 * namespace. Given this relationship, you can model virtual clusters the same way you model
 * Kubernetes namespaces to meet your requirements.
 */
export const createVirtualCluster: API.OperationMethod<
  CreateVirtualClusterRequest,
  CreateVirtualClusterResponse,
  CreateVirtualClusterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreateVirtualClusterRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateVirtualClusterResponse>,
  errors: [
    EKSRequestThrottledException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualCluster",
}));

export type DeleteJobTemplateError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a job template. Job template stores values of StartJobRun API request in a
 * template and can be used to start a job run. Job template allows two use cases: avoid
 * repeating recurring StartJobRun API request values, enforcing certain values in StartJobRun
 * API request.
 */
export const deleteJobTemplate: API.OperationMethod<
  DeleteJobTemplateRequest,
  DeleteJobTemplateResponse,
  DeleteJobTemplateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteJobTemplateRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteJobTemplateResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTemplate",
}));

export type DeleteManagedEndpointError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a managed endpoint. A managed endpoint is a gateway that connects Amazon EMR Studio to Amazon EMR on EKS so that Amazon EMR Studio can
 * communicate with your virtual cluster.
 */
export const deleteManagedEndpoint: API.OperationMethod<
  DeleteManagedEndpointRequest,
  DeleteManagedEndpointResponse,
  DeleteManagedEndpointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteManagedEndpointRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<DeleteManagedEndpointResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteManagedEndpoint",
}));

export type DeleteSecurityConfigurationError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a security configuration.
 */
export const deleteSecurityConfiguration: API.OperationMethod<
  DeleteSecurityConfigurationRequest,
  DeleteSecurityConfigurationResponse,
  DeleteSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteSecurityConfigurationRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteSecurityConfigurationResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfiguration",
}));

export type DeleteVirtualClusterError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a virtual cluster. Virtual cluster is a managed entity on Amazon EMR on EKS. You can create, update, describe, list and delete virtual clusters. They do not consume any
 * additional resource in your system. A single virtual cluster maps to a single Kubernetes
 * namespace. Given this relationship, you can model virtual clusters the same way you model
 * Kubernetes namespaces to meet your requirements.
 */
export const deleteVirtualCluster: API.OperationMethod<
  DeleteVirtualClusterRequest,
  DeleteVirtualClusterResponse,
  DeleteVirtualClusterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DeleteVirtualClusterRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteVirtualClusterResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualCluster",
}));

export type DescribeJobRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays detailed information about a job run. A job run is a unit of work, such as a
 * Spark jar, PySpark script, or SparkSQL query, that you submit to Amazon EMR on EKS.
 */
export const describeJobRun: API.OperationMethod<
  DescribeJobRunRequest,
  DescribeJobRunResponse,
  DescribeJobRunError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DescribeJobRunRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<DescribeJobRunResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobRun",
}));

export type DescribeJobTemplateError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays detailed information about a specified job template. Job template stores values
 * of StartJobRun API request in a template and can be used to start a job run. Job template
 * allows two use cases: avoid repeating recurring StartJobRun API request values, enforcing
 * certain values in StartJobRun API request.
 */
export const describeJobTemplate: API.OperationMethod<
  DescribeJobTemplateRequest,
  DescribeJobTemplateResponse,
  DescribeJobTemplateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DescribeJobTemplateRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<DescribeJobTemplateResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobTemplate",
}));

export type DescribeManagedEndpointError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays detailed information about a managed endpoint. A managed endpoint is a gateway
 * that connects Amazon EMR Studio to Amazon EMR on EKS so that Amazon EMR Studio can communicate with your virtual cluster.
 */
export const describeManagedEndpoint: API.OperationMethod<
  DescribeManagedEndpointRequest,
  DescribeManagedEndpointResponse,
  DescribeManagedEndpointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DescribeManagedEndpointRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<DescribeManagedEndpointResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedEndpoint",
}));

export type DescribeSecurityConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays detailed information about a specified security configuration. Security
 * configurations in Amazon EMR on EKS are templates for different security setups. You
 * can use security configurations to configure the Lake Formation integration setup.
 * You can also create a security configuration to re-use a security setup each time you
 * create a virtual cluster.
 */
export const describeSecurityConfiguration: API.OperationMethod<
  DescribeSecurityConfigurationRequest,
  DescribeSecurityConfigurationResponse,
  DescribeSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DescribeSecurityConfigurationRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<DescribeSecurityConfigurationResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityConfiguration",
}));

export type DescribeVirtualClusterError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays detailed information about a specified virtual cluster. Virtual cluster is a
 * managed entity on Amazon EMR on EKS. You can create, update, describe, list and delete virtual
 * clusters. They do not consume any additional resource in your system. A single virtual
 * cluster maps to a single Kubernetes namespace. Given this relationship, you can model
 * virtual clusters the same way you model Kubernetes namespaces to meet your
 * requirements.
 */
export const describeVirtualCluster: API.OperationMethod<
  DescribeVirtualClusterRequest,
  DescribeVirtualClusterResponse,
  DescribeVirtualClusterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DescribeVirtualClusterRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<DescribeVirtualClusterResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualCluster",
}));

export type GetManagedEndpointSessionCredentialsError =
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Generate a session token to connect to a managed endpoint.
 */
export const getManagedEndpointSessionCredentials: API.OperationMethod<
  GetManagedEndpointSessionCredentialsRequest,
  GetManagedEndpointSessionCredentialsResponse,
  GetManagedEndpointSessionCredentialsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetManagedEndpointSessionCredentialsRequest>,
  output: __S(354, __c22, 2) as any as S.Schema<GetManagedEndpointSessionCredentialsResponse>,
  errors: [
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedEndpointSessionCredentials",
}));

export type ListJobRunsError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists job runs based on a set of parameters. A job run is a unit of work, such as a
 * Spark jar, PySpark script, or SparkSQL query, that you submit to Amazon EMR on EKS.
 */
export const listJobRuns: API.PaginatedOperationMethod<
  ListJobRunsRequest,
  ListJobRunsResponse,
  ListJobRunsError,
  Creds | HttpClient.HttpClient,
  JobRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ListJobRunsRequest>,
  output: __S(370, __c23, 2) as any as S.Schema<ListJobRunsResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobRuns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobTemplatesError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists job templates based on a set of parameters. Job template stores values of
 * StartJobRun API request in a template and can be used to start a job run. Job template
 * allows two use cases: avoid repeating recurring StartJobRun API request values, enforcing
 * certain values in StartJobRun API request.
 */
export const listJobTemplates: API.PaginatedOperationMethod<
  ListJobTemplatesRequest,
  ListJobTemplatesResponse,
  ListJobTemplatesError,
  Creds | HttpClient.HttpClient,
  JobTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListJobTemplatesRequest>,
  output: __S(402, __c25, 2) as any as S.Schema<ListJobTemplatesResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedEndpointsError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists managed endpoints based on a set of parameters. A managed endpoint is a gateway
 * that connects Amazon EMR Studio to Amazon EMR on EKS so that Amazon EMR Studio can communicate with your virtual cluster.
 */
export const listManagedEndpoints: API.PaginatedOperationMethod<
  ListManagedEndpointsRequest,
  ListManagedEndpointsResponse,
  ListManagedEndpointsError,
  Creds | HttpClient.HttpClient,
  Endpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<ListManagedEndpointsRequest>,
  output: __S(418, __c26, 2) as any as S.Schema<ListManagedEndpointsResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "endpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityConfigurationsError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists security configurations based on a set of parameters. Security configurations in
 * Amazon EMR on EKS are templates for different security setups. You can use security
 * configurations to configure the Lake Formation integration setup. You can also
 * create a security configuration to re-use a security setup each time you create a virtual
 * cluster.
 */
export const listSecurityConfigurations: API.PaginatedOperationMethod<
  ListSecurityConfigurationsRequest,
  ListSecurityConfigurationsResponse,
  ListSecurityConfigurationsError,
  Creds | HttpClient.HttpClient,
  SecurityConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ListSecurityConfigurationsRequest>,
  output: __S(434, __c27, 2) as any as S.Schema<ListSecurityConfigurationsResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags assigned to the resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVirtualClustersError =
  | InternalServerException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists information about the specified virtual cluster. Virtual cluster is a managed
 * entity on Amazon EMR on EKS. You can create, update, describe, list and delete virtual
 * clusters. They do not consume any additional resource in your system. A single virtual
 * cluster maps to a single Kubernetes namespace. Given this relationship, you can model
 * virtual clusters the same way you model Kubernetes namespaces to meet your
 * requirements.
 */
export const listVirtualClusters: API.PaginatedOperationMethod<
  ListVirtualClustersRequest,
  ListVirtualClustersResponse,
  ListVirtualClustersError,
  Creds | HttpClient.HttpClient,
  VirtualCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListVirtualClustersRequest>,
  output: __S(466, __c29, 2) as any as S.Schema<ListVirtualClustersResponse>,
  errors: [InternalServerException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualClusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartJobRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts a job run. A job run is a unit of work, such as a Spark jar, PySpark script, or
 * SparkSQL query, that you submit to Amazon EMR on EKS.
 */
export const startJobRun: API.OperationMethod<
  StartJobRunRequest,
  StartJobRunResponse,
  StartJobRunError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<StartJobRunRequest>,
  output: __S(672, __c42, 0) as any as S.Schema<StartJobRunResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | InvalidResourceArn
  | CommonErrors;
/**
 * Assigns tags to resources. A tag is a label that you assign to an Amazon Web Services
 * resource. Each tag consists of a key and an optional value, both of which you define. Tags
 * enable you to categorize your Amazon Web Services resources by attributes such as purpose,
 * owner, or environment. When you have many resources of the same type, you can quickly
 * identify a specific resource based on the tags you've assigned to it. For example, you can
 * define a set of tags for your Amazon EMR on EKS clusters to help you track each
 * cluster's owner and stack level. We recommend that you devise a consistent set of tag keys
 * for each resource type. You can then search and filter the resources based on the tags that
 * you add.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    InvalidResourceArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | InvalidResourceArn
  | CommonErrors;
/**
 * Removes tags from resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    InvalidResourceArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateVirtualClusterError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a virtual cluster. Virtual cluster is a managed entity on Amazon EMR on EKS. You can create, update, describe, list and delete virtual clusters. They do not consume any
 * additional resource in your system. A single virtual cluster maps to a single Kubernetes
 * namespace. Given this relationship, you can model virtual clusters the same way you model
 * Kubernetes namespaces to meet your requirements.
 */
export const updateVirtualCluster: API.OperationMethod<
  UpdateVirtualClusterRequest,
  UpdateVirtualClusterResponse,
  UpdateVirtualClusterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<UpdateVirtualClusterRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<UpdateVirtualClusterResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualCluster",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String.pipe(T.IdempotencyToken()),
          name: S.String,
          containerProvider: S.optional(__S(34, __c2, 2)),
          securityConfigurationData: __S(57, __c3, 9),
          tags: S.optional(__S(592, __c37, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/securityconfigurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSecurityConfigurationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSecurityConfigurationResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ namespace: S.optional(S.String), nodeLabel: S.optional(S.String) }),
      ).annotate({ identifier: "EksInfo" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ eksInfo: __S(32, __c2, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ type: S.String, id: S.String, info: S.optional(__S(33, __c2, 1)) }),
      ).annotate({ identifier: "ContainerProvider" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterId: S.optional(S.String), namespace: S.optional(S.String) }),
      ).annotate({ identifier: "SecureNamespaceInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          authorizedSessionTagValue: S.optional(S.String),
          secureNamespaceInfo: S.optional(__S(48, __c3, 0)),
          queryEngineRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "LakeFormationConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          certificateProviderType: S.optional(S.String),
          publicCertificateSecretArn: S.optional(S.String),
          privateCertificateSecretArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "TLSCertificateConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ tlsCertificateConfiguration: S.optional(__S(50, __c3, 2)) }),
      ).annotate({ identifier: "InTransitEncryptionConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ inTransitEncryptionConfiguration: S.optional(__S(51, __c3, 3)) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          lakeFormationConfiguration: S.optional(__S(49, __c3, 1)),
          encryptionConfiguration: S.optional(__S(52, __c3, 4)),
        }),
      ).annotate({ identifier: "AuthorizationConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          enableIdentityCenter: S.optional(S.Boolean),
          identityCenterApplicationAssignmentRequired: S.optional(S.Boolean),
          identityCenterInstanceARN: S.optional(S.String),
          emrIdentityCenterApplicationARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentityCenterConfiguration" });
    case 7:
      return S.suspend(() => S.Struct({ systemRole: S.optional(S.String) })).annotate({
        identifier: "IAMConfiguration",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          identityCenterConfiguration: S.optional(__S(54, __c3, 6)),
          iamConfiguration: S.optional(__S(55, __c3, 7)),
        }),
      ).annotate({ identifier: "AuthenticationConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          authorizationConfiguration: S.optional(__S(53, __c3, 5)),
          authenticationConfiguration: S.optional(__S(56, __c3, 8)),
        }),
      ).annotate({ identifier: "SecurityConfigurationData" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          containerProvider: __S(34, __c2, 2),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          tags: S.optional(__S(592, __c37, 0)),
          securityConfigurationId: S.optional(S.String),
          sessionEnabled: S.optional(S.Boolean),
          schedulerConfiguration: S.optional(__S(80, __c5, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/virtualclusters" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateVirtualClusterRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxInQueueJobRuns: S.optional(S.Number),
          maxConcurrentJobRuns: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SchedulerConfiguration" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/jobtemplates/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteJobTemplateRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.optional(S.String) })).annotate({
        identifier: "DeleteJobTemplateResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          virtualClusterId: S.String.pipe(T.HttpLabel("virtualClusterId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/virtualclusters/{virtualClusterId}/endpoints/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteManagedEndpointRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/securityconfigurations/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSecurityConfigurationRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/virtualclusters/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVirtualClusterRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          virtualClusterId: S.String.pipe(T.HttpLabel("virtualClusterId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/virtualclusters/{virtualClusterId}/jobruns/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ jobRun: S.optional(__S(193, __c12, 1)) })).annotate({
        identifier: "DescribeJobRunResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ currentAttemptCount: S.Number })).annotate({
        identifier: "RetryPolicyExecution",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          virtualClusterId: S.optional(S.String),
          arn: S.optional(S.String),
          state: S.optional(S.String),
          clientToken: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          releaseLabel: S.optional(S.String),
          configurationOverrides: S.optional(__S(600, __c37, 8)),
          jobDriver: S.optional(__S(627, __c39, 3)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdBy: S.optional(S.String),
          finishedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          stateDetails: S.optional(S.String),
          failureReason: S.optional(S.String),
          tags: S.optional(__S(592, __c37, 0)),
          retryPolicyConfiguration: S.optional(__S(208, __c13, 0)),
          retryPolicyExecution: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "JobRun" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ maxAttempts: S.Number })).annotate({
        identifier: "RetryPolicyConfiguration",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/jobtemplates/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeJobTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ jobTemplate: S.optional(__S(240, __c15, 0)) })).annotate({
        identifier: "DescribeJobTemplateResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdBy: S.optional(S.String),
          tags: S.optional(__S(592, __c37, 0)),
          jobTemplateData: __S(646, __c40, 6),
          kmsKeyArn: S.optional(S.String),
          decryptionError: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobTemplate" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          virtualClusterId: S.String.pipe(T.HttpLabel("virtualClusterId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/virtualclusters/{virtualClusterId}/endpoints/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeManagedEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ endpoint: S.optional(Endpoint) })).annotate({
        identifier: "DescribeManagedEndpointResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/securityconfigurations/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSecurityConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ securityConfiguration: S.optional(__S(288, __c18, 0)) }),
      ).annotate({ identifier: "DescribeSecurityConfigurationResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdBy: S.optional(S.String),
          securityConfigurationData: S.optional(__S(57, __c3, 9)),
          tags: S.optional(__S(592, __c37, 0)),
        }),
      ).annotate({ identifier: "SecurityConfiguration" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/virtualclusters/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeVirtualClusterRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          currentInQueueJobRuns: S.optional(S.Number),
          currentConcurrentJobRuns: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SchedulerStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          state: S.optional(S.String),
          containerProvider: S.optional(__S(34, __c2, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          tags: S.optional(__S(592, __c37, 0)),
          securityConfigurationId: S.optional(S.String),
          sessionEnabled: S.optional(S.Boolean),
          schedulerConfiguration: S.optional(__S(80, __c5, 0)),
          schedulerStatus: S.optional(__S(320, __c20, 0)),
        }),
      ).annotate({ identifier: "VirtualCluster" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ virtualCluster: S.optional(__S(321, __c20, 1)) })).annotate(
        { identifier: "DescribeVirtualClusterResponse" },
      );
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          endpointIdentifier: S.String.pipe(T.HttpLabel("endpointIdentifier")),
          virtualClusterIdentifier: S.String.pipe(T.HttpLabel("virtualClusterIdentifier")),
          executionRoleArn: S.String,
          credentialType: S.String,
          durationInSeconds: S.optional(S.Number),
          logContext: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/virtualclusters/{virtualClusterIdentifier}/endpoints/{endpointIdentifier}/credentials",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedEndpointSessionCredentialsRequest" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ token: SensitiveString })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          credentials: S.optional(__S(353, __c22, 1)),
          endpointCredentials: S.optional(__S(353, __c22, 1)),
          expiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetManagedEndpointSessionCredentialsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualClusterId: S.String.pipe(T.HttpLabel("virtualClusterId")),
          createdBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          createdAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          states: S.optional(__S(384, __c24, 0)).pipe(T.HttpQuery("states")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/virtualclusters/{virtualClusterId}/jobruns" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobRunsRequest" });
    case 1:
      return S.Array(__S(193, __c12, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ jobRuns: S.optional(__S(369, __c23, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobRunsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          createdAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          createdBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/jobtemplates" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListJobTemplatesRequest" });
    case 1:
      return S.Array(__S(240, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ templates: S.optional(__S(401, __c25, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobTemplatesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualClusterId: S.String.pipe(T.HttpLabel("virtualClusterId")),
          createdBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          createdAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          types: S.optional(__S(602, __c37, 10)).pipe(T.HttpQuery("types")),
          states: S.optional(__S(384, __c24, 0)).pipe(T.HttpQuery("states")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/virtualclusters/{virtualClusterId}/endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedEndpointsRequest" });
    case 1:
      return S.Array(Endpoint);
    case 2:
      return S.suspend(() =>
        S.Struct({ endpoints: S.optional(__S(417, __c26, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListManagedEndpointsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          createdAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          createdBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/securityconfigurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSecurityConfigurationsRequest" });
    case 1:
      return S.Array(__S(288, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          securityConfigurations: S.optional(__S(433, __c27, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSecurityConfigurationsResponse" });
  }
}
function __c28(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(592, __c37, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          containerProviderId: S.optional(S.String).pipe(T.HttpQuery("containerProviderId")),
          containerProviderType: S.optional(S.String).pipe(T.HttpQuery("containerProviderType")),
          createdAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          createdBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          states: S.optional(__S(384, __c24, 0)).pipe(T.HttpQuery("states")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          eksAccessEntryIntegrated: S.optional(S.Boolean).pipe(
            T.HttpQuery("eksAccessEntryIntegrated"),
          ),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/virtualclusters" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVirtualClustersRequest" });
    case 1:
      return S.Array(__S(321, __c20, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          virtualClusters: S.optional(__S(465, __c29, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListVirtualClustersResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          virtualClusterId: S.String.pipe(T.HttpLabel("virtualClusterId")),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          executionRoleArn: S.optional(S.String),
          releaseLabel: S.optional(S.String),
          jobDriver: S.optional(__S(627, __c39, 3)),
          configurationOverrides: S.optional(__S(600, __c37, 8)),
          tags: S.optional(__S(592, __c37, 0)),
          jobTemplateId: S.optional(S.String),
          jobTemplateParameters: S.optional(__S(592, __c37, 0)),
          retryPolicyConfiguration: S.optional(__S(208, __c13, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/virtualclusters/{virtualClusterId}/jobruns" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartJobRunRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(592, __c37, 0),
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
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(602, __c37, 10).pipe(T.HttpQuery("tagKeys")),
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
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          schedulerConfiguration: S.optional(__S(80, __c5, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/virtualclusters/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVirtualClusterRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          virtualClusterId: S.String.pipe(T.HttpLabel("virtualClusterId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/virtualclusters/{virtualClusterId}/jobruns/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelJobRunRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), virtualClusterId: S.optional(S.String) }),
      ).annotate({ identifier: "CancelJobRunResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          classification: S.String,
          properties: S.optional(__S(592, __c37, 0)),
          configurations: S.optional(
            S.suspend(() => __S(594, __c37, 2)).annotate({ identifier: "ConfigurationList" }),
          ),
        }),
      ).annotate({ identifier: "Configuration" });
    case 2:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Configuration> => __S(593, __c37, 1)).annotate({
          identifier: "Configuration",
        }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          allowAWSToRetainLogs: S.optional(S.String),
          encryptionKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedLogs" });
    case 4:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String, logStreamNamePrefix: S.optional(S.String) }),
      ).annotate({ identifier: "CloudWatchMonitoringConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ logUri: S.String, encryptionKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "S3MonitoringConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({ rotationSize: S.String, maxFilesToKeep: S.Number }),
      ).annotate({ identifier: "ContainerLogRotationConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          managedLogs: S.optional(__S(595, __c37, 3)),
          persistentAppUI: S.optional(S.String),
          cloudWatchMonitoringConfiguration: S.optional(__S(596, __c37, 4)),
          s3MonitoringConfiguration: S.optional(__S(597, __c37, 5)),
          containerLogRotationConfiguration: S.optional(__S(598, __c37, 6)),
        }),
      ).annotate({ identifier: "MonitoringConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          applicationConfiguration: S.optional(__S(594, __c37, 2)),
          monitoringConfiguration: S.optional(__S(599, __c37, 7)),
        }),
      ).annotate({ identifier: "ConfigurationOverrides" });
    case 9:
      return S.suspend(() =>
        S.Struct({ certificateArn: S.optional(S.String), certificateData: S.optional(S.String) }),
      ).annotate({ identifier: "Certificate" });
    case 10:
      return S.Array(S.String);
    case 11:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          virtualClusterId: S.optional(S.String),
          type: S.optional(S.String),
          state: S.optional(S.String),
          releaseLabel: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          certificateArn: S.optional(S.String),
          certificateAuthority: S.optional(__S(601, __c37, 9)),
          configurationOverrides: S.optional(__S(600, __c37, 8)),
          serverUrl: S.optional(S.String),
          authProxyUrl: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          securityGroup: S.optional(S.String),
          subnetIds: S.optional(__S(602, __c37, 10)),
          stateDetails: S.optional(S.String),
          failureReason: S.optional(S.String),
          tags: S.optional(__S(592, __c37, 0)),
        }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          clientToken: S.String.pipe(T.IdempotencyToken()),
          jobTemplateData: __S(646, __c40, 6),
          tags: S.optional(__S(592, __c37, 0)),
          kmsKeyArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/jobtemplates" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateJobTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateJobTemplateResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({
          entryPoint: SensitiveString,
          entryPointArguments: S.optional(__S(624, __c39, 0)),
          sparkSubmitParameters: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SparkSubmitJobDriver" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          entryPoint: S.optional(SensitiveString),
          sparkSqlParameters: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SparkSqlJobDriver" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          sparkSubmitJobDriver: S.optional(__S(625, __c39, 1)),
          sparkSqlJobDriver: S.optional(__S(626, __c39, 2)),
        }),
      ).annotate({ identifier: "JobDriver" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.optional(S.String), logStreamNamePrefix: S.optional(S.String) }),
      ).annotate({ identifier: "ParametricCloudWatchMonitoringConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ logUri: S.optional(S.String) })).annotate({
        identifier: "ParametricS3MonitoringConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          persistentAppUI: S.optional(S.String),
          cloudWatchMonitoringConfiguration: S.optional(__S(640, __c40, 0)),
          s3MonitoringConfiguration: S.optional(__S(641, __c40, 1)),
        }),
      ).annotate({ identifier: "ParametricMonitoringConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          applicationConfiguration: S.optional(__S(594, __c37, 2)),
          monitoringConfiguration: S.optional(__S(642, __c40, 2)),
        }),
      ).annotate({ identifier: "ParametricConfigurationOverrides" });
    case 4:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), defaultValue: S.optional(S.String) }),
      ).annotate({ identifier: "TemplateParameterConfiguration" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(644, __c40, 4).pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          executionRoleArn: S.String,
          releaseLabel: S.String,
          configurationOverrides: S.optional(__S(643, __c40, 3)),
          jobDriver: __S(627, __c39, 3),
          parameterConfiguration: S.optional(__S(645, __c40, 5)),
          jobTags: S.optional(__S(592, __c37, 0)),
        }),
      ).annotate({ identifier: "JobTemplateData" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          virtualClusterId: S.String.pipe(T.HttpLabel("virtualClusterId")),
          type: S.String,
          releaseLabel: S.String,
          executionRoleArn: S.String,
          certificateArn: S.optional(S.String),
          configurationOverrides: S.optional(__S(600, __c37, 8)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          tags: S.optional(__S(592, __c37, 0)),
          sessionIdleTimeoutInMinutes: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/virtualclusters/{virtualClusterId}/endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateManagedEndpointRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          virtualClusterId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateManagedEndpointResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
