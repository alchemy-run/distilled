import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "AppRunner",
  target: "AppRunner",
  version: "2020-05-15",
  sigv4: "apprunner",
  protocol: awsJson1_0Protocol,
  xmlns: "http://apprunner.amazonaws.com/doc/2020-05-15/",
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
                `https://apprunner-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://apprunner-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://apprunner.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://apprunner.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceErrorException",
    ["ServerError"],
    { code: "InternalServiceError", status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { code: "InvalidRequest", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateException",
    ["BadRequestError"],
    { code: "InvalidState", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "ResourceNotfound", status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { code: "ServiceQuotaExceeded", status: 402 },
  )<{ readonly message?: string }> {}
export type AppRunnerResourceArn = string;
export type DomainName = string;
export interface AssociateCustomDomainRequest {
  ServiceArn: string;
  DomainName: string;
  EnableWWWSubdomain?: boolean;
}
export type CertificateValidationRecordStatus =
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export interface CertificateValidationRecord {
  Name?: string;
  Type?: string;
  Value?: string;
  Status?: CertificateValidationRecordStatus;
}
export type CertificateValidationRecordList = CertificateValidationRecord[];
export type CustomDomainAssociationStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "DELETE_FAILED"
  | "PENDING_CERTIFICATE_DNS_VALIDATION"
  | "BINDING_CERTIFICATE"
  | (string & {});
export interface CustomDomain {
  DomainName: string;
  EnableWWWSubdomain: boolean;
  CertificateValidationRecords?: CertificateValidationRecord[];
  Status: CustomDomainAssociationStatus;
}
export interface VpcDNSTarget {
  VpcIngressConnectionArn?: string;
  VpcId?: string;
  DomainName?: string;
}
export type VpcDNSTargetList = VpcDNSTarget[];
export interface AssociateCustomDomainResponse {
  DNSTarget: string;
  ServiceArn: string;
  CustomDomain: CustomDomain;
  VpcDNSTargets: VpcDNSTarget[];
}
export type AutoScalingConfigurationName = string;
export type ASConfigMaxConcurrency = number;
export type ASConfigMinSize = number;
export type ASConfigMaxSize = number;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CreateAutoScalingConfigurationRequest {
  AutoScalingConfigurationName: string;
  MaxConcurrency?: number;
  MinSize?: number;
  MaxSize?: number;
  Tags?: Tag[];
}
export type AutoScalingConfigurationRevision = number;
export type Latest = boolean;
export type AutoScalingConfigurationStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "active"
  | "inactive"
  | (string & {});
export type MaxConcurrency = number;
export type MinSize = number;
export type MaxSize = number;
export type HasAssociatedService = boolean;
export type IsDefault = boolean;
export interface AutoScalingConfiguration {
  AutoScalingConfigurationArn?: string;
  AutoScalingConfigurationName?: string;
  AutoScalingConfigurationRevision?: number;
  Latest?: boolean;
  Status?: AutoScalingConfigurationStatus;
  MaxConcurrency?: number;
  MinSize?: number;
  MaxSize?: number;
  CreatedAt?: Date;
  DeletedAt?: Date;
  HasAssociatedService?: boolean;
  IsDefault?: boolean;
}
export interface CreateAutoScalingConfigurationResponse {
  AutoScalingConfiguration: AutoScalingConfiguration;
}
export type ConnectionName = string;
export type ProviderType = "GITHUB" | "BITBUCKET" | (string & {});
export interface CreateConnectionRequest {
  ConnectionName: string;
  ProviderType: ProviderType;
  Tags?: Tag[];
}
export type ConnectionStatus =
  | "PENDING_HANDSHAKE"
  | "AVAILABLE"
  | "ERROR"
  | "DELETED"
  | (string & {});
export interface Connection {
  ConnectionName?: string;
  ConnectionArn?: string;
  ProviderType?: ProviderType;
  Status?: ConnectionStatus;
  CreatedAt?: Date;
}
export interface CreateConnectionResponse {
  Connection: Connection;
}
export type ObservabilityConfigurationName = string;
export type TracingVendor = "AWSXRAY" | (string & {});
export interface TraceConfiguration {
  Vendor: TracingVendor;
}
export interface CreateObservabilityConfigurationRequest {
  ObservabilityConfigurationName: string;
  TraceConfiguration?: TraceConfiguration;
  Tags?: Tag[];
}
export type ObservabilityConfigurationStatus =
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export interface ObservabilityConfiguration {
  ObservabilityConfigurationArn?: string;
  ObservabilityConfigurationName?: string;
  TraceConfiguration?: TraceConfiguration;
  ObservabilityConfigurationRevision?: number;
  Latest?: boolean;
  Status?: ObservabilityConfigurationStatus;
  CreatedAt?: Date;
  DeletedAt?: Date;
}
export interface CreateObservabilityConfigurationResponse {
  ObservabilityConfiguration: ObservabilityConfiguration;
}
export type ServiceName = string;
export type SourceCodeVersionType = "BRANCH" | (string & {});
export interface SourceCodeVersion {
  Type: SourceCodeVersionType;
  Value: string;
}
export type ConfigurationSource = "REPOSITORY" | "API" | (string & {});
export type Runtime =
  | "PYTHON_3"
  | "NODEJS_12"
  | "NODEJS_14"
  | "CORRETTO_8"
  | "CORRETTO_11"
  | "NODEJS_16"
  | "GO_1"
  | "DOTNET_6"
  | "PHP_81"
  | "RUBY_31"
  | "PYTHON_311"
  | "NODEJS_18"
  | "NODEJS_22"
  | (string & {});
export type BuildCommand = string | redacted.Redacted<string>;
export type StartCommand = string | redacted.Redacted<string>;
export type RuntimeEnvironmentVariablesKey = string | redacted.Redacted<string>;
export type RuntimeEnvironmentVariablesValue =
  | string
  | redacted.Redacted<string>;
export type RuntimeEnvironmentVariables = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type RuntimeEnvironmentSecretsName = string | redacted.Redacted<string>;
export type RuntimeEnvironmentSecretsValue = string | redacted.Redacted<string>;
export type RuntimeEnvironmentSecrets = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface CodeConfigurationValues {
  Runtime: Runtime;
  BuildCommand?: string | redacted.Redacted<string>;
  StartCommand?: string | redacted.Redacted<string>;
  Port?: string;
  RuntimeEnvironmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  RuntimeEnvironmentSecrets?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export interface CodeConfiguration {
  ConfigurationSource: ConfigurationSource;
  CodeConfigurationValues?: CodeConfigurationValues;
}
export type SourceDirectory = string;
export interface CodeRepository {
  RepositoryUrl: string;
  SourceCodeVersion: SourceCodeVersion;
  CodeConfiguration?: CodeConfiguration;
  SourceDirectory?: string;
}
export type ImageIdentifier = string;
export interface ImageConfiguration {
  RuntimeEnvironmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  StartCommand?: string | redacted.Redacted<string>;
  Port?: string;
  RuntimeEnvironmentSecrets?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export type ImageRepositoryType = "ECR" | "ECR_PUBLIC" | (string & {});
export interface ImageRepository {
  ImageIdentifier: string;
  ImageConfiguration?: ImageConfiguration;
  ImageRepositoryType: ImageRepositoryType;
}
export type RoleArn = string;
export interface AuthenticationConfiguration {
  ConnectionArn?: string;
  AccessRoleArn?: string;
}
export interface SourceConfiguration {
  CodeRepository?: CodeRepository;
  ImageRepository?: ImageRepository;
  AutoDeploymentsEnabled?: boolean;
  AuthenticationConfiguration?: AuthenticationConfiguration;
}
export type Cpu = string;
export type Memory = string;
export interface InstanceConfiguration {
  Cpu?: string;
  Memory?: string;
  InstanceRoleArn?: string;
}
export type KmsKeyArn = string;
export interface EncryptionConfiguration {
  KmsKey: string;
}
export type HealthCheckProtocol = "TCP" | "HTTP" | (string & {});
export type HealthCheckPath = string;
export type HealthCheckInterval = number;
export type HealthCheckTimeout = number;
export type HealthCheckHealthyThreshold = number;
export type HealthCheckUnhealthyThreshold = number;
export interface HealthCheckConfiguration {
  Protocol?: HealthCheckProtocol;
  Path?: string;
  Interval?: number;
  Timeout?: number;
  HealthyThreshold?: number;
  UnhealthyThreshold?: number;
}
export type EgressType = "DEFAULT" | "VPC" | (string & {});
export interface EgressConfiguration {
  EgressType?: EgressType;
  VpcConnectorArn?: string;
}
export interface IngressConfiguration {
  IsPubliclyAccessible?: boolean;
}
export type IpAddressType = "IPV4" | "DUAL_STACK" | (string & {});
export interface NetworkConfiguration {
  EgressConfiguration?: EgressConfiguration;
  IngressConfiguration?: IngressConfiguration;
  IpAddressType?: IpAddressType;
}
export interface ServiceObservabilityConfiguration {
  ObservabilityEnabled: boolean;
  ObservabilityConfigurationArn?: string;
}
export interface CreateServiceRequest {
  ServiceName: string;
  SourceConfiguration: SourceConfiguration;
  InstanceConfiguration?: InstanceConfiguration;
  Tags?: Tag[];
  EncryptionConfiguration?: EncryptionConfiguration;
  HealthCheckConfiguration?: HealthCheckConfiguration;
  AutoScalingConfigurationArn?: string;
  NetworkConfiguration?: NetworkConfiguration;
  ObservabilityConfiguration?: ServiceObservabilityConfiguration;
}
export type ServiceId = string;
export type ServiceStatus =
  | "CREATE_FAILED"
  | "RUNNING"
  | "DELETED"
  | "DELETE_FAILED"
  | "PAUSED"
  | "OPERATION_IN_PROGRESS"
  | (string & {});
export interface AutoScalingConfigurationSummary {
  AutoScalingConfigurationArn?: string;
  AutoScalingConfigurationName?: string;
  AutoScalingConfigurationRevision?: number;
  Status?: AutoScalingConfigurationStatus;
  CreatedAt?: Date;
  HasAssociatedService?: boolean;
  IsDefault?: boolean;
}
export interface Service {
  ServiceName: string;
  ServiceId: string;
  ServiceArn: string;
  ServiceUrl?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
  Status: ServiceStatus;
  SourceConfiguration: SourceConfiguration;
  InstanceConfiguration: InstanceConfiguration;
  EncryptionConfiguration?: EncryptionConfiguration;
  HealthCheckConfiguration?: HealthCheckConfiguration;
  AutoScalingConfigurationSummary: AutoScalingConfigurationSummary;
  NetworkConfiguration: NetworkConfiguration;
  ObservabilityConfiguration?: ServiceObservabilityConfiguration;
}
export type UUID = string;
export interface CreateServiceResponse {
  Service: Service;
  OperationId: string;
}
export type VpcConnectorName = string;
export type StringList = string[];
export interface CreateVpcConnectorRequest {
  VpcConnectorName: string;
  Subnets: string[];
  SecurityGroups?: string[];
  Tags?: Tag[];
}
export type VpcConnectorStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "active"
  | "inactive"
  | (string & {});
export interface VpcConnector {
  VpcConnectorName?: string;
  VpcConnectorArn?: string;
  VpcConnectorRevision?: number;
  Subnets?: string[];
  SecurityGroups?: string[];
  Status?: VpcConnectorStatus;
  CreatedAt?: Date;
  DeletedAt?: Date;
}
export interface CreateVpcConnectorResponse {
  VpcConnector: VpcConnector;
}
export type VpcIngressConnectionName = string;
export interface IngressVpcConfiguration {
  VpcId?: string;
  VpcEndpointId?: string;
}
export interface CreateVpcIngressConnectionRequest {
  ServiceArn: string;
  VpcIngressConnectionName: string;
  IngressVpcConfiguration: IngressVpcConfiguration;
  Tags?: Tag[];
}
export type VpcIngressConnectionStatus =
  | "AVAILABLE"
  | "PENDING_CREATION"
  | "PENDING_UPDATE"
  | "PENDING_DELETION"
  | "FAILED_CREATION"
  | "FAILED_UPDATE"
  | "FAILED_DELETION"
  | "DELETED"
  | (string & {});
export type CustomerAccountId = string;
export interface VpcIngressConnection {
  VpcIngressConnectionArn?: string;
  VpcIngressConnectionName?: string;
  ServiceArn?: string;
  Status?: VpcIngressConnectionStatus;
  AccountId?: string;
  DomainName?: string;
  IngressVpcConfiguration?: IngressVpcConfiguration;
  CreatedAt?: Date;
  DeletedAt?: Date;
}
export interface CreateVpcIngressConnectionResponse {
  VpcIngressConnection: VpcIngressConnection;
}
export interface DeleteAutoScalingConfigurationRequest {
  AutoScalingConfigurationArn: string;
  DeleteAllRevisions?: boolean;
}
export interface DeleteAutoScalingConfigurationResponse {
  AutoScalingConfiguration: AutoScalingConfiguration;
}
export interface DeleteConnectionRequest {
  ConnectionArn: string;
}
export interface DeleteConnectionResponse {
  Connection?: Connection;
}
export interface DeleteObservabilityConfigurationRequest {
  ObservabilityConfigurationArn: string;
}
export interface DeleteObservabilityConfigurationResponse {
  ObservabilityConfiguration: ObservabilityConfiguration;
}
export interface DeleteServiceRequest {
  ServiceArn: string;
}
export interface DeleteServiceResponse {
  Service: Service;
  OperationId: string;
}
export interface DeleteVpcConnectorRequest {
  VpcConnectorArn: string;
}
export interface DeleteVpcConnectorResponse {
  VpcConnector: VpcConnector;
}
export interface DeleteVpcIngressConnectionRequest {
  VpcIngressConnectionArn: string;
}
export interface DeleteVpcIngressConnectionResponse {
  VpcIngressConnection: VpcIngressConnection;
}
export interface DescribeAutoScalingConfigurationRequest {
  AutoScalingConfigurationArn: string;
}
export interface DescribeAutoScalingConfigurationResponse {
  AutoScalingConfiguration: AutoScalingConfiguration;
}
export type DescribeCustomDomainsMaxResults = number;
export interface DescribeCustomDomainsRequest {
  ServiceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type CustomDomainList = CustomDomain[];
export interface DescribeCustomDomainsResponse {
  DNSTarget: string;
  ServiceArn: string;
  CustomDomains: CustomDomain[];
  VpcDNSTargets: VpcDNSTarget[];
  NextToken?: string;
}
export interface DescribeObservabilityConfigurationRequest {
  ObservabilityConfigurationArn: string;
}
export interface DescribeObservabilityConfigurationResponse {
  ObservabilityConfiguration: ObservabilityConfiguration;
}
export interface DescribeServiceRequest {
  ServiceArn: string;
}
export interface DescribeServiceResponse {
  Service: Service;
}
export interface DescribeVpcConnectorRequest {
  VpcConnectorArn: string;
}
export interface DescribeVpcConnectorResponse {
  VpcConnector: VpcConnector;
}
export interface DescribeVpcIngressConnectionRequest {
  VpcIngressConnectionArn: string;
}
export interface DescribeVpcIngressConnectionResponse {
  VpcIngressConnection: VpcIngressConnection;
}
export interface DisassociateCustomDomainRequest {
  ServiceArn: string;
  DomainName: string;
}
export interface DisassociateCustomDomainResponse {
  DNSTarget: string;
  ServiceArn: string;
  CustomDomain: CustomDomain;
  VpcDNSTargets: VpcDNSTarget[];
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAutoScalingConfigurationsRequest {
  AutoScalingConfigurationName?: string;
  LatestOnly?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export type AutoScalingConfigurationSummaryList =
  AutoScalingConfigurationSummary[];
export interface ListAutoScalingConfigurationsResponse {
  AutoScalingConfigurationSummaryList: AutoScalingConfigurationSummary[];
  NextToken?: string;
}
export interface ListConnectionsRequest {
  ConnectionName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ConnectionSummary {
  ConnectionName?: string;
  ConnectionArn?: string;
  ProviderType?: ProviderType;
  Status?: ConnectionStatus;
  CreatedAt?: Date;
}
export type ConnectionSummaryList = ConnectionSummary[];
export interface ListConnectionsResponse {
  ConnectionSummaryList: ConnectionSummary[];
  NextToken?: string;
}
export interface ListObservabilityConfigurationsRequest {
  ObservabilityConfigurationName?: string;
  LatestOnly?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export interface ObservabilityConfigurationSummary {
  ObservabilityConfigurationArn?: string;
  ObservabilityConfigurationName?: string;
  ObservabilityConfigurationRevision?: number;
}
export type ObservabilityConfigurationSummaryList =
  ObservabilityConfigurationSummary[];
export interface ListObservabilityConfigurationsResponse {
  ObservabilityConfigurationSummaryList: ObservabilityConfigurationSummary[];
  NextToken?: string;
}
export type ListOperationsMaxResults = number;
export interface ListOperationsRequest {
  ServiceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type OperationType =
  | "START_DEPLOYMENT"
  | "CREATE_SERVICE"
  | "PAUSE_SERVICE"
  | "RESUME_SERVICE"
  | "DELETE_SERVICE"
  | "UPDATE_SERVICE"
  | (string & {});
export type OperationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_FAILED"
  | "ROLLBACK_SUCCEEDED"
  | (string & {});
export interface OperationSummary {
  Id?: string;
  Type?: OperationType;
  Status?: OperationStatus;
  TargetArn?: string;
  StartedAt?: Date;
  EndedAt?: Date;
  UpdatedAt?: Date;
}
export type OperationSummaryList = OperationSummary[];
export interface ListOperationsResponse {
  OperationSummaryList?: OperationSummary[];
  NextToken?: string;
}
export type ServiceMaxResults = number;
export interface ListServicesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ServiceSummary {
  ServiceName?: string;
  ServiceId?: string;
  ServiceArn?: string;
  ServiceUrl?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Status?: ServiceStatus;
}
export type ServiceSummaryList = ServiceSummary[];
export interface ListServicesResponse {
  ServiceSummaryList: ServiceSummary[];
  NextToken?: string;
}
export interface ListServicesForAutoScalingConfigurationRequest {
  AutoScalingConfigurationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ServiceArnList = string[];
export interface ListServicesForAutoScalingConfigurationResponse {
  ServiceArnList: string[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListVpcConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type VpcConnectors = VpcConnector[];
export interface ListVpcConnectorsResponse {
  VpcConnectors: VpcConnector[];
  NextToken?: string;
}
export interface ListVpcIngressConnectionsFilter {
  ServiceArn?: string;
  VpcEndpointId?: string;
}
export interface ListVpcIngressConnectionsRequest {
  Filter?: ListVpcIngressConnectionsFilter;
  MaxResults?: number;
  NextToken?: string;
}
export interface VpcIngressConnectionSummary {
  VpcIngressConnectionArn?: string;
  ServiceArn?: string;
}
export type VpcIngressConnectionSummaryList = VpcIngressConnectionSummary[];
export interface ListVpcIngressConnectionsResponse {
  VpcIngressConnectionSummaryList: VpcIngressConnectionSummary[];
  NextToken?: string;
}
export interface PauseServiceRequest {
  ServiceArn: string;
}
export interface PauseServiceResponse {
  Service: Service;
  OperationId?: string;
}
export interface ResumeServiceRequest {
  ServiceArn: string;
}
export interface ResumeServiceResponse {
  Service: Service;
  OperationId?: string;
}
export interface StartDeploymentRequest {
  ServiceArn: string;
}
export interface StartDeploymentResponse {
  OperationId: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDefaultAutoScalingConfigurationRequest {
  AutoScalingConfigurationArn: string;
}
export interface UpdateDefaultAutoScalingConfigurationResponse {
  AutoScalingConfiguration: AutoScalingConfiguration;
}
export interface UpdateServiceRequest {
  ServiceArn: string;
  SourceConfiguration?: SourceConfiguration;
  InstanceConfiguration?: InstanceConfiguration;
  AutoScalingConfigurationArn?: string;
  HealthCheckConfiguration?: HealthCheckConfiguration;
  NetworkConfiguration?: NetworkConfiguration;
  ObservabilityConfiguration?: ServiceObservabilityConfiguration;
}
export interface UpdateServiceResponse {
  Service: Service;
  OperationId: string;
}
export interface UpdateVpcIngressConnectionRequest {
  VpcIngressConnectionArn: string;
  IngressVpcConfiguration: IngressVpcConfiguration;
}
export interface UpdateVpcIngressConnectionResponse {
  VpcIngressConnection: VpcIngressConnection;
}
export type ErrorMessage = string;
export type AssociateCustomDomainError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | CommonErrors;
/**
 * Associate your own domain name with the App Runner subdomain URL of your App Runner service.
 *
 * After you call `AssociateCustomDomain` and receive a successful response, use the information in the CustomDomain record
 * that's returned to add CNAME records to your Domain Name System (DNS). For each mapped domain name, add a mapping to the target App Runner subdomain and one or
 * more certificate validation records. App Runner then performs DNS validation to verify that you own or control the domain name that you associated. App Runner tracks
 * domain validity in a certificate stored in AWS Certificate Manager (ACM).
 */
export const associateCustomDomain: API.OperationMethod<
  AssociateCustomDomainRequest,
  AssociateCustomDomainResponse,
  AssociateCustomDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceArn: 0, DomainName: 0, EnableWWWSubdomain: 0 },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCustomDomain",
})) as any;

export type CreateAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner automatic scaling configuration resource. App Runner requires this resource when you create or update App Runner services and you require
 * non-default auto scaling settings. You can share an auto scaling configuration across multiple services.
 *
 * Create multiple revisions of a configuration by calling this action multiple times using the same `AutoScalingConfigurationName`. The call
 * returns incremental `AutoScalingConfigurationRevision` values. When you create a service and configure an auto scaling configuration resource,
 * the service uses the latest active revision of the auto scaling configuration by default. You can optionally configure the service to use a specific
 * revision.
 *
 * Configure a higher `MinSize` to increase the spread of your App Runner service over more Availability Zones in the Amazon Web Services Region. The
 * tradeoff is a higher minimal cost.
 *
 * Configure a lower `MaxSize` to control your cost. The tradeoff is lower responsiveness during peak demand.
 */
export const createAutoScalingConfiguration: API.OperationMethod<
  CreateAutoScalingConfigurationRequest,
  CreateAutoScalingConfigurationResponse,
  CreateAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingConfigurationName: 0,
      MaxConcurrency: 0,
      MinSize: 0,
      MaxSize: 0,
      Tags: D.list(i_Tag),
    },
    output: { AutoScalingConfiguration: o_AutoScalingConfiguration },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoScalingConfiguration",
})) as any;

export type CreateConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner connection resource. App Runner requires a connection resource when you create App Runner services that access private repositories from
 * certain third-party providers. You can share a connection across multiple services.
 *
 * A connection resource is needed to access GitHub and Bitbucket repositories. Both require
 * a user interface approval process through the App Runner console before you can use the
 * connection.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  CreateConnectionResponse,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConnectionName: 0, ProviderType: 0, Tags: D.list(i_Tag) },
    output: { Connection: o_Connection },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
})) as any;

export type CreateObservabilityConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner observability configuration resource. App Runner requires this resource when you create or update App Runner services and you want to enable
 * non-default observability features. You can share an observability configuration across multiple services.
 *
 * Create multiple revisions of a configuration by calling this action multiple times using the same `ObservabilityConfigurationName`. The
 * call returns incremental `ObservabilityConfigurationRevision` values. When you create a service and configure an observability configuration
 * resource, the service uses the latest active revision of the observability configuration by default. You can optionally configure the service to use a
 * specific revision.
 *
 * The observability configuration resource is designed to configure multiple features (currently one feature, tracing). This action takes optional
 * parameters that describe the configuration of these features (currently one parameter, `TraceConfiguration`). If you don't specify a feature
 * parameter, App Runner doesn't enable the feature.
 */
export const createObservabilityConfiguration: API.OperationMethod<
  CreateObservabilityConfigurationRequest,
  CreateObservabilityConfigurationResponse,
  CreateObservabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ObservabilityConfigurationName: 0,
      TraceConfiguration: { Vendor: 0 },
      Tags: D.list(i_Tag),
    },
    output: { ObservabilityConfiguration: o_ObservabilityConfiguration },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateObservabilityConfiguration",
})) as any;

export type CreateServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner service. After the service is created, the action also automatically starts a deployment.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations call to track the operation's progress.
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceName: 0,
      SourceConfiguration: i_SourceConfiguration,
      InstanceConfiguration: i_InstanceConfiguration,
      Tags: D.list(i_Tag),
      EncryptionConfiguration: { KmsKey: 0 },
      HealthCheckConfiguration: i_HealthCheckConfiguration,
      AutoScalingConfigurationArn: 0,
      NetworkConfiguration: i_NetworkConfiguration,
      ObservabilityConfiguration: i_ServiceObservabilityConfiguration,
    },
    output: { Service: o_Service },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
})) as any;

export type CreateVpcConnectorError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner VPC connector resource. App Runner requires this resource when you want to associate your App Runner service to a custom Amazon Virtual Private Cloud
 * (Amazon VPC).
 */
export const createVpcConnector: API.OperationMethod<
  CreateVpcConnectorRequest,
  CreateVpcConnectorResponse,
  CreateVpcConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      VpcConnectorName: 0,
      Subnets: 0,
      SecurityGroups: 0,
      Tags: D.list(i_Tag),
    },
    output: { VpcConnector: o_VpcConnector },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcConnector",
})) as any;

export type CreateVpcIngressConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner VPC Ingress Connection resource. App Runner requires this resource when you want to associate your App Runner service with an Amazon VPC endpoint.
 */
export const createVpcIngressConnection: API.OperationMethod<
  CreateVpcIngressConnectionRequest,
  CreateVpcIngressConnectionResponse,
  CreateVpcIngressConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceArn: 0,
      VpcIngressConnectionName: 0,
      IngressVpcConfiguration: i_IngressVpcConfiguration,
      Tags: D.list(i_Tag),
    },
    output: { VpcIngressConnection: o_VpcIngressConnection },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcIngressConnection",
})) as any;

export type DeleteAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner automatic scaling configuration resource. You can delete a top level auto scaling configuration, a specific revision of one, or all
 * revisions associated with the top level configuration. You can't delete the default auto scaling configuration or a configuration that's used by one or
 * more App Runner services.
 */
export const deleteAutoScalingConfiguration: API.OperationMethod<
  DeleteAutoScalingConfigurationRequest,
  DeleteAutoScalingConfigurationResponse,
  DeleteAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingConfigurationArn: 0, DeleteAllRevisions: 0 },
    output: { AutoScalingConfiguration: o_AutoScalingConfiguration },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutoScalingConfiguration",
})) as any;

export type DeleteConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner connection. You must first ensure that there are no running App Runner services that use this connection. If there are any, the
 * `DeleteConnection` action fails.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConnectionArn: 0 },
    output: { Connection: o_Connection },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

export type DeleteObservabilityConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner observability configuration resource. You can delete a specific revision or the latest active revision. You can't delete a
 * configuration that's used by one or more App Runner services.
 */
export const deleteObservabilityConfiguration: API.OperationMethod<
  DeleteObservabilityConfigurationRequest,
  DeleteObservabilityConfigurationResponse,
  DeleteObservabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ObservabilityConfigurationArn: 0 },
    output: { ObservabilityConfiguration: o_ObservabilityConfiguration },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObservabilityConfiguration",
})) as any;

export type DeleteServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner service.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 *
 * Make sure that you don't have any active VPCIngressConnections associated with the service you want to delete.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceArn: 0 },
    output: { Service: o_Service },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
})) as any;

export type DeleteVpcConnectorError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner VPC connector resource. You can't delete a
 * connector that's used by one or more App Runner services.
 */
export const deleteVpcConnector: API.OperationMethod<
  DeleteVpcConnectorRequest,
  DeleteVpcConnectorResponse,
  DeleteVpcConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VpcConnectorArn: 0 },
    output: { VpcConnector: o_VpcConnector },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcConnector",
})) as any;

export type DeleteVpcIngressConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner VPC Ingress Connection resource that's associated with an App Runner service. The VPC Ingress Connection must be in one of the following states to be deleted:
 *
 * - `AVAILABLE`
 *
 * - `FAILED_CREATION`
 *
 * - `FAILED_UPDATE`
 *
 * - `FAILED_DELETION`
 */
export const deleteVpcIngressConnection: API.OperationMethod<
  DeleteVpcIngressConnectionRequest,
  DeleteVpcIngressConnectionResponse,
  DeleteVpcIngressConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VpcIngressConnectionArn: 0 },
    output: { VpcIngressConnection: o_VpcIngressConnection },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcIngressConnection",
})) as any;

export type DescribeAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a full description of an App Runner automatic scaling configuration resource.
 */
export const describeAutoScalingConfiguration: API.OperationMethod<
  DescribeAutoScalingConfigurationRequest,
  DescribeAutoScalingConfigurationResponse,
  DescribeAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingConfigurationArn: 0 },
    output: { AutoScalingConfiguration: o_AutoScalingConfiguration },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoScalingConfiguration",
})) as any;

export type DescribeCustomDomainsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a description of custom domain names that are associated with an App Runner service.
 */
export const describeCustomDomains: API.PaginatedOperationMethod<
  DescribeCustomDomainsRequest,
  DescribeCustomDomainsResponse,
  DescribeCustomDomainsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ServiceArn: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeObservabilityConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a full description of an App Runner observability configuration resource.
 */
export const describeObservabilityConfiguration: API.OperationMethod<
  DescribeObservabilityConfigurationRequest,
  DescribeObservabilityConfigurationResponse,
  DescribeObservabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ObservabilityConfigurationArn: 0 },
    output: { ObservabilityConfiguration: o_ObservabilityConfiguration },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeObservabilityConfiguration",
})) as any;

export type DescribeServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a full description of an App Runner service.
 */
export const describeService: API.OperationMethod<
  DescribeServiceRequest,
  DescribeServiceResponse,
  DescribeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceArn: 0 },
    output: { Service: o_Service },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeService",
})) as any;

export type DescribeVpcConnectorError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a description of an App Runner VPC connector resource.
 */
export const describeVpcConnector: API.OperationMethod<
  DescribeVpcConnectorRequest,
  DescribeVpcConnectorResponse,
  DescribeVpcConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VpcConnectorArn: 0 },
    output: { VpcConnector: o_VpcConnector },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcConnector",
})) as any;

export type DescribeVpcIngressConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a full description of an App Runner VPC Ingress Connection resource.
 */
export const describeVpcIngressConnection: API.OperationMethod<
  DescribeVpcIngressConnectionRequest,
  DescribeVpcIngressConnectionResponse,
  DescribeVpcIngressConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VpcIngressConnectionArn: 0 },
    output: { VpcIngressConnection: o_VpcIngressConnection },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcIngressConnection",
})) as any;

export type DisassociateCustomDomainError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociate a custom domain name from an App Runner service.
 *
 * Certificates tracking domain validity are associated with a custom domain and are stored in AWS
 * Certificate Manager (ACM). These certificates aren't deleted as part of this action. App Runner delays certificate deletion for
 * 30 days after a domain is disassociated from your service.
 */
export const disassociateCustomDomain: API.OperationMethod<
  DisassociateCustomDomainRequest,
  DisassociateCustomDomainResponse,
  DisassociateCustomDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceArn: 0, DomainName: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCustomDomain",
})) as any;

export type ListAutoScalingConfigurationsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of active App Runner automatic scaling configurations in your Amazon Web Services account. You can query the revisions for a specific
 * configuration name or the revisions for all active configurations in your account. You can optionally query only the latest revision of each requested
 * name.
 *
 * To retrieve a full description of a particular configuration revision, call and provide one of
 * the ARNs returned by `ListAutoScalingConfigurations`.
 */
export const listAutoScalingConfigurations: API.PaginatedOperationMethod<
  ListAutoScalingConfigurationsRequest,
  ListAutoScalingConfigurationsResponse,
  ListAutoScalingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingConfigurationName: 0,
      LatestOnly: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      AutoScalingConfigurationSummaryList: D.list(
        o_AutoScalingConfigurationSummary,
      ),
    },
  },
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutoScalingConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectionsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of App Runner connections that are associated with your Amazon Web Services account.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsRequest,
  ListConnectionsResponse,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ConnectionName: 0, MaxResults: 0, NextToken: 0 },
    output: { ConnectionSummaryList: D.list({ CreatedAt: D.ts }) },
  },
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObservabilityConfigurationsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of active App Runner observability configurations in your Amazon Web Services account. You can query the revisions for a specific
 * configuration name or the revisions for all active configurations in your account. You can optionally query only the latest revision of each requested
 * name.
 *
 * To retrieve a full description of a particular configuration revision, call and provide one
 * of the ARNs returned by `ListObservabilityConfigurations`.
 */
export const listObservabilityConfigurations: API.PaginatedOperationMethod<
  ListObservabilityConfigurationsRequest,
  ListObservabilityConfigurationsResponse,
  ListObservabilityConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ObservabilityConfigurationName: 0,
      LatestOnly: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObservabilityConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOperationsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a list of operations that occurred on an App Runner service.
 *
 * The resulting list of OperationSummary objects is sorted in reverse chronological order. The first object on the list represents the
 * last started operation.
 */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse,
  ListOperationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ServiceArn: 0, NextToken: 0, MaxResults: 0 },
    output: {
      OperationSummaryList: D.list({
        StartedAt: D.ts,
        EndedAt: D.ts,
        UpdatedAt: D.ts,
      }),
    },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of running App Runner services in your Amazon Web Services account.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      ServiceSummaryList: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
    },
  },
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesForAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of the associated App Runner services using an auto scaling configuration.
 */
export const listServicesForAutoScalingConfiguration: API.PaginatedOperationMethod<
  ListServicesForAutoScalingConfigurationRequest,
  ListServicesForAutoScalingConfigurationResponse,
  ListServicesForAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingConfigurationArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicesForAutoScalingConfiguration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List tags that are associated with for an App Runner resource. The response contains a list of tag key-value pairs.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListVpcConnectorsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of App Runner VPC connectors in your Amazon Web Services account.
 */
export const listVpcConnectors: API.PaginatedOperationMethod<
  ListVpcConnectorsRequest,
  ListVpcConnectorsResponse,
  ListVpcConnectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { VpcConnectors: D.list(o_VpcConnector) },
  },
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVpcIngressConnectionsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Return a list of App Runner VPC Ingress Connections in your Amazon Web Services account.
 */
export const listVpcIngressConnections: API.PaginatedOperationMethod<
  ListVpcIngressConnectionsRequest,
  ListVpcIngressConnectionsResponse,
  ListVpcIngressConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: { ServiceArn: 0, VpcEndpointId: 0 },
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcIngressConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PauseServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Pause an active App Runner service. App Runner reduces compute capacity for the service to zero and loses state (for example, ephemeral storage is
 * removed).
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 */
export const pauseService: API.OperationMethod<
  PauseServiceRequest,
  PauseServiceResponse,
  PauseServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceArn: 0 },
    output: { Service: o_Service },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseService",
})) as any;

export type ResumeServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Resume an active App Runner service. App Runner provisions compute capacity for the service.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 */
export const resumeService: API.OperationMethod<
  ResumeServiceRequest,
  ResumeServiceResponse,
  ResumeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceArn: 0 },
    output: { Service: o_Service },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeService",
})) as any;

export type StartDeploymentError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiate a manual deployment of the latest commit in a source code repository or the latest image in a source image repository to an App Runner
 * service.
 *
 * For a source code repository, App Runner retrieves the commit and builds a Docker image. For a source image repository, App Runner retrieves the latest Docker
 * image. In both cases, App Runner then deploys the new image to your service and starts a new container instance.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 */
export const startDeployment: API.OperationMethod<
  StartDeploymentRequest,
  StartDeploymentResponse,
  StartDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceArn: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeployment",
})) as any;

export type TagResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Add tags to, or update the tag values of, an App Runner resource. A tag is a key-value pair.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Remove tags from an App Runner resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDefaultAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update an auto scaling configuration to be the default. The existing default auto scaling configuration will be set to non-default
 * automatically.
 */
export const updateDefaultAutoScalingConfiguration: API.OperationMethod<
  UpdateDefaultAutoScalingConfigurationRequest,
  UpdateDefaultAutoScalingConfigurationResponse,
  UpdateDefaultAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingConfigurationArn: 0 },
    output: { AutoScalingConfiguration: o_AutoScalingConfiguration },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDefaultAutoScalingConfiguration",
})) as any;

export type UpdateServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update an App Runner service. You can update the source configuration and instance configuration of the service. You can also update the ARN of the auto
 * scaling configuration resource that's associated with the service. However, you can't change the name or the encryption configuration of the service.
 * These can be set only when you create the service.
 *
 * To update the tags applied to your service, use the separate actions TagResource and UntagResource.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 */
export const updateService: API.OperationMethod<
  UpdateServiceRequest,
  UpdateServiceResponse,
  UpdateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceArn: 0,
      SourceConfiguration: i_SourceConfiguration,
      InstanceConfiguration: i_InstanceConfiguration,
      AutoScalingConfigurationArn: 0,
      HealthCheckConfiguration: i_HealthCheckConfiguration,
      NetworkConfiguration: i_NetworkConfiguration,
      ObservabilityConfiguration: i_ServiceObservabilityConfiguration,
    },
    output: { Service: o_Service },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
})) as any;

export type UpdateVpcIngressConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update an existing App Runner VPC Ingress Connection resource. The VPC Ingress Connection must be in one of the following states to be updated:
 *
 * - AVAILABLE
 *
 * - FAILED_CREATION
 *
 * - FAILED_UPDATE
 */
export const updateVpcIngressConnection: API.OperationMethod<
  UpdateVpcIngressConnectionRequest,
  UpdateVpcIngressConnectionResponse,
  UpdateVpcIngressConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      VpcIngressConnectionArn: 0,
      IngressVpcConfiguration: i_IngressVpcConfiguration,
    },
    output: { VpcIngressConnection: o_VpcIngressConnection },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcIngressConnection",
})) as any;

const i_HealthCheckConfiguration: D.LazyStruct = () => ({
  Protocol: 0,
  Path: 0,
  Interval: 0,
  Timeout: 0,
  HealthyThreshold: 0,
  UnhealthyThreshold: 0,
});
const i_IngressVpcConfiguration: D.LazyStruct = () => ({
  VpcId: 0,
  VpcEndpointId: 0,
});
const i_InstanceConfiguration: D.LazyStruct = () => ({
  Cpu: 0,
  Memory: 0,
  InstanceRoleArn: 0,
});
const i_NetworkConfiguration: D.LazyStruct = () => ({
  EgressConfiguration: { EgressType: 0, VpcConnectorArn: 0 },
  IngressConfiguration: { IsPubliclyAccessible: 0 },
  IpAddressType: 0,
});
const i_ServiceObservabilityConfiguration: D.LazyStruct = () => ({
  ObservabilityEnabled: 0,
  ObservabilityConfigurationArn: 0,
});
const i_SourceConfiguration: D.LazyStruct = () => ({
  CodeRepository: {
    RepositoryUrl: 0,
    SourceCodeVersion: { Type: 0, Value: 0 },
    CodeConfiguration: {
      ConfigurationSource: 0,
      CodeConfigurationValues: {
        Runtime: 0,
        BuildCommand: 0,
        StartCommand: 0,
        Port: 0,
        RuntimeEnvironmentVariables: 0,
        RuntimeEnvironmentSecrets: 0,
      },
    },
    SourceDirectory: 0,
  },
  ImageRepository: {
    ImageIdentifier: 0,
    ImageConfiguration: {
      RuntimeEnvironmentVariables: 0,
      StartCommand: 0,
      Port: 0,
      RuntimeEnvironmentSecrets: 0,
    },
    ImageRepositoryType: 0,
  },
  AutoDeploymentsEnabled: 0,
  AuthenticationConfiguration: { ConnectionArn: 0, AccessRoleArn: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AutoScalingConfiguration: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  DeletedAt: D.ts,
});
const o_AutoScalingConfigurationSummary: D.LazyStruct = () => ({
  CreatedAt: D.ts,
});
const o_Connection: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_ObservabilityConfiguration: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  DeletedAt: D.ts,
});
const o_Service: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
  DeletedAt: D.ts,
  SourceConfiguration: {
    CodeRepository: {
      CodeConfiguration: {
        CodeConfigurationValues: {
          BuildCommand: D.secret,
          StartCommand: D.secret,
          RuntimeEnvironmentVariables: D.map(D.secret),
          RuntimeEnvironmentSecrets: D.map(D.secret),
        },
      },
    },
    ImageRepository: {
      ImageConfiguration: {
        RuntimeEnvironmentVariables: D.map(D.secret),
        StartCommand: D.secret,
        RuntimeEnvironmentSecrets: D.map(D.secret),
      },
    },
  },
  AutoScalingConfigurationSummary: o_AutoScalingConfigurationSummary,
});
const o_VpcConnector: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  DeletedAt: D.ts,
});
const o_VpcIngressConnection: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  DeletedAt: D.ts,
});
