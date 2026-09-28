import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "EMR containers",
  target: "AwsChicagoWebService",
  version: "2020-10-01",
  sigv4: "emr-containers",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://emr-containers.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://emr-containers.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class EKSRequestThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "EKSRequestThrottledException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidResourceArn
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceArn", [], {
    synthetic: {
      from: "BadRequestException",
      message: { includes: "Invalid input resource arn" },
    },
  })<{ readonly message?: string }> {}
export class RequestThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestThrottledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequestsException", [
    "ThrottlingError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
  parameterConfiguration?: {
    [key: string]: TemplateParameterConfiguration | undefined;
  };
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
  descriptor: {
    service: svc,
    http: "DELETE /virtualclusters/{virtualClusterId}/jobruns/{id}",
    input: { id: 0, virtualClusterId: 0 },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJobRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /jobtemplates",
    input: {
      name: 0,
      clientToken: D.m({ idempotency: true }),
      jobTemplateData: {
        executionRoleArn: 0,
        releaseLabel: 0,
        configurationOverrides: {
          applicationConfiguration: D.list(i_Configuration),
          monitoringConfiguration: {
            persistentAppUI: 0,
            cloudWatchMonitoringConfiguration: {
              logGroupName: 0,
              logStreamNamePrefix: 0,
            },
            s3MonitoringConfiguration: { logUri: 0 },
          },
        },
        jobDriver: i_JobDriver,
        parameterConfiguration: D.map({ type: 0, defaultValue: 0 }),
        jobTags: 0,
      },
      tags: 0,
      kmsKeyArn: 0,
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /virtualclusters/{virtualClusterId}/endpoints",
    input: {
      name: 0,
      virtualClusterId: 0,
      type: 0,
      releaseLabel: 0,
      executionRoleArn: 0,
      certificateArn: 0,
      configurationOverrides: i_ConfigurationOverrides,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      sessionIdleTimeoutInMinutes: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateManagedEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /securityconfigurations",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      containerProvider: i_ContainerProvider,
      securityConfigurationData: {
        authorizationConfiguration: {
          lakeFormationConfiguration: {
            authorizedSessionTagValue: 0,
            secureNamespaceInfo: { clusterId: 0, namespace: 0 },
            queryEngineRoleArn: 0,
          },
          encryptionConfiguration: {
            inTransitEncryptionConfiguration: {
              tlsCertificateConfiguration: {
                certificateProviderType: 0,
                publicCertificateSecretArn: 0,
                privateCertificateSecretArn: 0,
              },
            },
          },
        },
        authenticationConfiguration: {
          identityCenterConfiguration: {
            enableIdentityCenter: 0,
            identityCenterApplicationAssignmentRequired: 0,
            identityCenterInstanceARN: 0,
            emrIdentityCenterApplicationARN: 0,
          },
          iamConfiguration: { systemRole: 0 },
        },
      },
      tags: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /virtualclusters",
    input: {
      name: 0,
      containerProvider: i_ContainerProvider,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      securityConfigurationId: 0,
      sessionEnabled: 0,
      schedulerConfiguration: i_SchedulerConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /jobtemplates/{id}",
    input: { id: 0 },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /virtualclusters/{virtualClusterId}/endpoints/{id}",
    input: { id: 0, virtualClusterId: 0 },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteManagedEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /securityconfigurations/{id}",
    input: { id: 0 },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /virtualclusters/{id}",
    input: { id: 0 },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualCluster",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /virtualclusters/{virtualClusterId}/jobruns/{id}",
    input: { id: 0, virtualClusterId: 0 },
    output: { jobRun: o_JobRun },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /jobtemplates/{id}",
    input: { id: 0 },
    output: { jobTemplate: o_JobTemplate },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /virtualclusters/{virtualClusterId}/endpoints/{id}",
    input: { id: 0, virtualClusterId: 0 },
    output: { endpoint: o_Endpoint },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /securityconfigurations/{id}",
    input: { id: 0 },
    output: { securityConfiguration: o_SecurityConfiguration },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /virtualclusters/{id}",
    input: { id: 0 },
    output: { virtualCluster: o_VirtualCluster },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualCluster",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /virtualclusters/{virtualClusterIdentifier}/endpoints/{endpointIdentifier}/credentials",
    input: {
      endpointIdentifier: 0,
      virtualClusterIdentifier: 0,
      executionRoleArn: 0,
      credentialType: 0,
      durationInSeconds: 0,
      logContext: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      credentials: o_Credentials,
      endpointCredentials: o_Credentials,
      expiresAt: D.ts,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /virtualclusters/{virtualClusterId}/jobruns",
    input: {
      virtualClusterId: 0,
      createdBefore: D.m({ query: "createdBefore" }),
      createdAfter: D.m({ query: "createdAfter" }),
      name: D.m({ query: "name" }),
      states: D.m({ query: "states" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { jobRuns: D.list(o_JobRun) },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /jobtemplates",
    input: {
      createdAfter: D.m({ query: "createdAfter" }),
      createdBefore: D.m({ query: "createdBefore" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { templates: D.list(o_JobTemplate) },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /virtualclusters/{virtualClusterId}/endpoints",
    input: {
      virtualClusterId: 0,
      createdBefore: D.m({ query: "createdBefore" }),
      createdAfter: D.m({ query: "createdAfter" }),
      types: D.m({ query: "types" }),
      states: D.m({ query: "states" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { endpoints: D.list(o_Endpoint) },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /securityconfigurations",
    input: {
      createdAfter: D.m({ query: "createdAfter" }),
      createdBefore: D.m({ query: "createdBefore" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { securityConfigurations: D.list(o_SecurityConfiguration) },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /virtualclusters",
    input: {
      containerProviderId: D.m({ query: "containerProviderId" }),
      containerProviderType: D.m({ query: "containerProviderType" }),
      createdAfter: D.m({ query: "createdAfter" }),
      createdBefore: D.m({ query: "createdBefore" }),
      states: D.m({ query: "states" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      eksAccessEntryIntegrated: D.m({ query: "eksAccessEntryIntegrated" }),
    },
    output: { virtualClusters: D.list(o_VirtualCluster) },
  },
  errors: [
    InternalServerException,
    ValidationException,
    TooManyRequestsException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /virtualclusters/{virtualClusterId}/jobruns",
    input: {
      name: 0,
      virtualClusterId: 0,
      clientToken: D.m({ idempotency: true }),
      executionRoleArn: 0,
      releaseLabel: 0,
      jobDriver: i_JobDriver,
      configurationOverrides: i_ConfigurationOverrides,
      tags: 0,
      jobTemplateId: 0,
      jobTemplateParameters: 0,
      retryPolicyConfiguration: { maxAttempts: 0 },
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /virtualclusters/{id}",
    input: {
      id: 0,
      schedulerConfiguration: i_SchedulerConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    output: { virtualCluster: o_VirtualCluster },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualCluster",
})) as any;

const i_Configuration: D.LazyStruct = () => ({
  classification: 0,
  properties: 0,
  configurations: D.list(i_Configuration),
});
const i_ConfigurationOverrides: D.LazyStruct = () => ({
  applicationConfiguration: D.list(i_Configuration),
  monitoringConfiguration: {
    managedLogs: { allowAWSToRetainLogs: 0, encryptionKeyArn: 0 },
    persistentAppUI: 0,
    cloudWatchMonitoringConfiguration: {
      logGroupName: 0,
      logStreamNamePrefix: 0,
    },
    s3MonitoringConfiguration: { logUri: 0, encryptionKeyArn: 0 },
    containerLogRotationConfiguration: { rotationSize: 0, maxFilesToKeep: 0 },
  },
});
const i_ContainerProvider: D.LazyStruct = () => ({
  type: 0,
  id: 0,
  info: { eksInfo: { namespace: 0, nodeLabel: 0 } },
});
const i_JobDriver: D.LazyStruct = () => ({
  sparkSubmitJobDriver: {
    entryPoint: 0,
    entryPointArguments: 0,
    sparkSubmitParameters: 0,
  },
  sparkSqlJobDriver: { entryPoint: 0, sparkSqlParameters: 0 },
});
const i_SchedulerConfiguration: D.LazyStruct = () => ({
  maxInQueueJobRuns: 0,
  maxConcurrentJobRuns: 0,
});
const o_Credentials: D.LazyStruct = () => ({ token: D.secret });
const o_Endpoint: D.LazyStruct = () => ({ createdAt: D.ts });
const o_JobRun: D.LazyStruct = () => ({
  jobDriver: o_JobDriver,
  createdAt: D.ts,
  finishedAt: D.ts,
});
const o_JobTemplate: D.LazyStruct = () => ({
  createdAt: D.ts,
  jobTemplateData: { jobDriver: o_JobDriver },
});
const o_SecurityConfiguration: D.LazyStruct = () => ({ createdAt: D.ts });
const o_VirtualCluster: D.LazyStruct = () => ({ createdAt: D.ts });
const o_JobDriver: D.LazyStruct = () => ({
  sparkSubmitJobDriver: {
    entryPoint: D.secret,
    entryPointArguments: D.list(D.secret),
    sparkSubmitParameters: D.secret,
  },
  sparkSqlJobDriver: { entryPoint: D.secret, sparkSqlParameters: D.secret },
});
