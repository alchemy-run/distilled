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
const ns = /*@__PURE__*/ T.XmlNamespace("http://apprunner.amazonaws.com/doc/2020-05-15/");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "AppRunner", serviceShapeName: "AppRunner" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "apprunner" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-05-15");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://apprunner-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://apprunner-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://apprunner.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://apprunner.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://apprunner.{R}.{D}","properties":{},"headers":{}}');

export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InternalServiceError", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidRequest", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotfound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ServiceQuotaExceeded", httpResponseCode: 402 }),
      /*@__PURE__*/ T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
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
export type ObservabilityConfigurationStatus = "ACTIVE" | "INACTIVE" | (string & {});
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
export type RuntimeEnvironmentVariablesValue = string | redacted.Redacted<string>;
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
  RuntimeEnvironmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  RuntimeEnvironmentSecrets?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  RuntimeEnvironmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  StartCommand?: string | redacted.Redacted<string>;
  Port?: string;
  RuntimeEnvironmentSecrets?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
export type VpcConnectorStatus = "ACTIVE" | "INACTIVE" | "active" | "inactive" | (string & {});
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
export type AutoScalingConfigurationSummaryList = AutoScalingConfigurationSummary[];
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
export type ObservabilityConfigurationSummaryList = ObservabilityConfigurationSummary[];
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
  input: __S(1216, __c38, 0) as any as S.Schema<AssociateCustomDomainRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<AssociateCustomDomainResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, InvalidStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCustomDomain",
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<CreateAutoScalingConfigurationRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<CreateAutoScalingConfigurationResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoScalingConfiguration",
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<CreateConnectionRequest>,
  output: __S(1409, __c44, 1) as any as S.Schema<CreateConnectionResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<CreateObservabilityConfigurationRequest>,
  output: __S(1506, __c47, 2) as any as S.Schema<CreateObservabilityConfigurationResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateObservabilityConfiguration",
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<CreateServiceRequest>,
  output: __S(1632, __c51, 0) as any as S.Schema<CreateServiceResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateVpcConnectorRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateVpcConnectorResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcConnector",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<CreateVpcIngressConnectionRequest>,
  output: __S(162, __c5, 2) as any as S.Schema<CreateVpcIngressConnectionResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcIngressConnection",
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<DeleteAutoScalingConfigurationRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<DeleteAutoScalingConfigurationResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutoScalingConfiguration",
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<DeleteConnectionRequest>,
  output: __S(225, __c7, 1) as any as S.Schema<DeleteConnectionResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<DeleteObservabilityConfigurationRequest>,
  output: __S(1506, __c47, 2) as any as S.Schema<DeleteObservabilityConfigurationResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObservabilityConfiguration",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<DeleteServiceRequest>,
  output: __S(1632, __c51, 0) as any as S.Schema<DeleteServiceResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<DeleteVpcConnectorRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteVpcConnectorResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcConnector",
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<DeleteVpcIngressConnectionRequest>,
  output: __S(162, __c5, 2) as any as S.Schema<DeleteVpcIngressConnectionResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcIngressConnection",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<DescribeAutoScalingConfigurationRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<DescribeAutoScalingConfigurationResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoScalingConfiguration",
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<DescribeCustomDomainsRequest>,
  output: __S(418, __c13, 2) as any as S.Schema<DescribeCustomDomainsResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
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
  input: __S(448, __c14, 0) as any as S.Schema<DescribeObservabilityConfigurationRequest>,
  output: __S(1506, __c47, 2) as any as S.Schema<DescribeObservabilityConfigurationResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeObservabilityConfiguration",
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<DescribeServiceRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<DescribeServiceResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeService",
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DescribeVpcConnectorRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DescribeVpcConnectorResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcConnector",
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DescribeVpcIngressConnectionRequest>,
  output: __S(162, __c5, 2) as any as S.Schema<DescribeVpcIngressConnectionResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcIngressConnection",
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<DisassociateCustomDomainRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<DisassociateCustomDomainResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCustomDomain",
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<ListAutoScalingConfigurationsRequest>,
  output: __S(610, __c19, 2) as any as S.Schema<ListAutoScalingConfigurationsResponse>,
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
  input: __S(640, __c20, 0) as any as S.Schema<ListConnectionsRequest>,
  output: __S(642, __c20, 2) as any as S.Schema<ListConnectionsResponse>,
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
  input: __S(672, __c21, 0) as any as S.Schema<ListObservabilityConfigurationsRequest>,
  output: __S(675, __c21, 3) as any as S.Schema<ListObservabilityConfigurationsResponse>,
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
  input: __S(704, __c22, 0) as any as S.Schema<ListOperationsRequest>,
  output: __S(707, __c22, 3) as any as S.Schema<ListOperationsResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
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
  input: __S(736, __c23, 0) as any as S.Schema<ListServicesRequest>,
  output: __S(739, __c23, 3) as any as S.Schema<ListServicesResponse>,
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
  input: __S(768, __c24, 0) as any as S.Schema<ListServicesForAutoScalingConfigurationRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<ListServicesForAutoScalingConfigurationResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
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
  input: __S(800, __c25, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<ListVpcConnectorsRequest>,
  output: __S(834, __c26, 2) as any as S.Schema<ListVpcConnectorsResponse>,
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
  input: __S(865, __c27, 1) as any as S.Schema<ListVpcIngressConnectionsRequest>,
  output: __S(868, __c27, 4) as any as S.Schema<ListVpcIngressConnectionsResponse>,
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
  input: __S(896, __c28, 0) as any as S.Schema<PauseServiceRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<PauseServiceResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseService",
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<ResumeServiceRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<ResumeServiceResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeService",
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<StartDeploymentRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<StartDeploymentResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeployment",
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<UpdateDefaultAutoScalingConfigurationRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<UpdateDefaultAutoScalingConfigurationResponse>,
  errors: [InternalServiceErrorException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDefaultAutoScalingConfiguration",
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<UpdateServiceRequest>,
  output: __S(1632, __c51, 0) as any as S.Schema<UpdateServiceResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
}));

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
  input: __S(1184, __c37, 0) as any as S.Schema<UpdateVpcIngressConnectionRequest>,
  output: __S(162, __c5, 2) as any as S.Schema<UpdateVpcIngressConnectionResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcIngressConnection",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcConnectorName: S.String,
          Subnets: __S(64, __c2, 0),
          SecurityGroups: S.optional(__S(64, __c2, 0)),
          Tags: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVpcConnectorRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ VpcConnector: __S(96, __c3, 0) }).pipe(ns)).annotate({
        identifier: "CreateVpcConnectorResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcConnectorName: S.optional(S.String),
          VpcConnectorArn: S.optional(S.String),
          VpcConnectorRevision: S.optional(S.Number),
          Subnets: S.optional(__S(64, __c2, 0)),
          SecurityGroups: S.optional(__S(64, __c2, 0)),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "VpcConnector" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceArn: S.String,
          VpcIngressConnectionName: S.String,
          IngressVpcConfiguration: __S(160, __c5, 0),
          Tags: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVpcIngressConnectionRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcId: S.optional(S.String), VpcEndpointId: S.optional(S.String) }),
      ).annotate({ identifier: "IngressVpcConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcIngressConnectionArn: S.optional(S.String),
          VpcIngressConnectionName: S.optional(S.String),
          ServiceArn: S.optional(S.String),
          Status: S.optional(S.String),
          AccountId: S.optional(S.String),
          DomainName: S.optional(S.String),
          IngressVpcConfiguration: S.optional(__S(160, __c5, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "VpcIngressConnection" });
    case 2:
      return S.suspend(() =>
        S.Struct({ VpcIngressConnection: __S(161, __c5, 1) }).pipe(ns),
      ).annotate({ identifier: "CreateVpcIngressConnectionResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingConfigurationArn: S.String,
          DeleteAllRevisions: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAutoScalingConfigurationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectionArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Connection: S.optional(__S(1440, __c45, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteConnectionResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ObservabilityConfigurationArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteObservabilityConfigurationRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcConnectorArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVpcConnectorRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcIngressConnectionArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVpcIngressConnectionRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoScalingConfigurationArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAutoScalingConfigurationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceArn: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCustomDomainsRequest" });
    case 1:
      return S.Array(__S(1250, __c39, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DNSTarget: S.String,
          ServiceArn: S.String,
          CustomDomains: __S(417, __c13, 1),
          VpcDNSTargets: __S(1252, __c39, 4),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeCustomDomainsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ObservabilityConfigurationArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeObservabilityConfigurationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeServiceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Service: __S(1616, __c50, 16) }).pipe(ns)).annotate({
        identifier: "DescribeServiceResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcConnectorArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeVpcConnectorRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcIngressConnectionArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeVpcIngressConnectionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceArn: S.String, DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateCustomDomainRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingConfigurationName: S.optional(S.String),
          LatestOnly: S.optional(S.Boolean),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutoScalingConfigurationsRequest" });
    case 1:
      return S.Array(__S(1568, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AutoScalingConfigurationSummaryList: __S(609, __c19, 1),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAutoScalingConfigurationsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectionsRequest" });
    case 1:
      return S.Array(__S(1440, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectionSummaryList: __S(641, __c20, 1),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListConnectionsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ObservabilityConfigurationName: S.optional(S.String),
          LatestOnly: S.optional(S.Boolean),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListObservabilityConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObservabilityConfigurationArn: S.optional(S.String),
          ObservabilityConfigurationName: S.optional(S.String),
          ObservabilityConfigurationRevision: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ObservabilityConfigurationSummary" });
    case 2:
      return S.Array(__S(673, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ObservabilityConfigurationSummaryList: __S(674, __c21, 2),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListObservabilityConfigurationsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceArn: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOperationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          TargetArn: S.optional(S.String),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OperationSummary" });
    case 2:
      return S.Array(__S(705, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          OperationSummaryList: S.optional(__S(706, __c22, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListOperationsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceName: S.optional(S.String),
          ServiceId: S.optional(S.String),
          ServiceArn: S.optional(S.String),
          ServiceUrl: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceSummary" });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ServiceSummaryList: __S(738, __c23, 2), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListServicesResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingConfigurationArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServicesForAutoScalingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServiceArnList: __S(64, __c2, 0), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListServicesForAutoScalingConfigurationResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(1377, __c43, 1)) }).pipe(ns)).annotate(
        { identifier: "ListTagsForResourceResponse" },
      );
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVpcConnectorsRequest" });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ VpcConnectors: __S(833, __c26, 1), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListVpcConnectorsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceArn: S.optional(S.String), VpcEndpointId: S.optional(S.String) }),
      ).annotate({ identifier: "ListVpcIngressConnectionsFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(864, __c27, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVpcIngressConnectionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          VpcIngressConnectionArn: S.optional(S.String),
          ServiceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcIngressConnectionSummary" });
    case 3:
      return S.Array(__S(866, __c27, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          VpcIngressConnectionSummaryList: __S(867, __c27, 3),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListVpcIngressConnectionsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PauseServiceRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Service: __S(1616, __c50, 16), OperationId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PauseServiceResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResumeServiceRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartDeploymentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ OperationId: S.String }).pipe(ns)).annotate({
        identifier: "StartDeploymentResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(1377, __c43, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(64, __c2, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoScalingConfigurationArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDefaultAutoScalingConfigurationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceArn: S.String,
          SourceConfiguration: S.optional(__S(1608, __c50, 8)),
          InstanceConfiguration: S.optional(__S(1609, __c50, 9)),
          AutoScalingConfigurationArn: S.optional(S.String),
          HealthCheckConfiguration: S.optional(__S(1611, __c50, 11)),
          NetworkConfiguration: S.optional(__S(1614, __c50, 14)),
          ObservabilityConfiguration: S.optional(__S(1615, __c50, 15)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcIngressConnectionArn: S.String,
          IngressVpcConfiguration: __S(160, __c5, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateVpcIngressConnectionRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceArn: S.String,
          DomainName: S.String,
          EnableWWWSubdomain: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateCustomDomainRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Value: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateValidationRecord" });
    case 1:
      return S.Array(__S(1248, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          EnableWWWSubdomain: S.Boolean,
          CertificateValidationRecords: S.optional(__S(1249, __c39, 1)),
          Status: S.String,
        }),
      ).annotate({ identifier: "CustomDomain" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          VpcIngressConnectionArn: S.optional(S.String),
          VpcId: S.optional(S.String),
          DomainName: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcDNSTarget" });
    case 4:
      return S.Array(__S(1251, __c39, 3));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DNSTarget: S.String,
          ServiceArn: S.String,
          CustomDomain: __S(1250, __c39, 2),
          VpcDNSTargets: __S(1252, __c39, 4),
        }).pipe(ns),
      ).annotate({ identifier: "AssociateCustomDomainResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingConfigurationName: S.String,
          MaxConcurrency: S.optional(S.Number),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          Tags: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAutoScalingConfigurationRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingConfigurationArn: S.optional(S.String),
          AutoScalingConfigurationName: S.optional(S.String),
          AutoScalingConfigurationRevision: S.optional(S.Number),
          Latest: S.optional(S.Boolean),
          Status: S.optional(S.String),
          MaxConcurrency: S.optional(S.Number),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HasAssociatedService: S.optional(S.Boolean),
          IsDefault: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AutoScalingConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AutoScalingConfiguration: __S(1344, __c42, 0) }).pipe(ns),
      ).annotate({ identifier: "CreateAutoScalingConfigurationResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(1376, __c43, 0));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.String,
          ProviderType: S.String,
          Tags: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConnectionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Connection: __S(1440, __c45, 0) }).pipe(ns)).annotate({
        identifier: "CreateConnectionResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          ProviderType: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Connection" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ObservabilityConfigurationName: S.String,
          TraceConfiguration: S.optional(__S(1504, __c47, 0)),
          Tags: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateObservabilityConfigurationRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Vendor: S.String })).annotate({
        identifier: "TraceConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObservabilityConfigurationArn: S.optional(S.String),
          ObservabilityConfigurationName: S.optional(S.String),
          TraceConfiguration: S.optional(__S(1504, __c47, 0)),
          ObservabilityConfigurationRevision: S.optional(S.Number),
          Latest: S.optional(S.Boolean),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ObservabilityConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ObservabilityConfiguration: __S(1505, __c47, 1) }).pipe(ns),
      ).annotate({ identifier: "CreateObservabilityConfigurationResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceName: S.String,
          SourceConfiguration: __S(1608, __c50, 8),
          InstanceConfiguration: S.optional(__S(1609, __c50, 9)),
          Tags: S.optional(__S(1377, __c43, 1)),
          EncryptionConfiguration: S.optional(__S(1610, __c50, 10)),
          HealthCheckConfiguration: S.optional(__S(1611, __c50, 11)),
          AutoScalingConfigurationArn: S.optional(S.String),
          NetworkConfiguration: S.optional(__S(1614, __c50, 14)),
          ObservabilityConfiguration: S.optional(__S(1615, __c50, 15)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingConfigurationArn: S.optional(S.String),
          AutoScalingConfigurationName: S.optional(S.String),
          AutoScalingConfigurationRevision: S.optional(S.Number),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HasAssociatedService: S.optional(S.Boolean),
          IsDefault: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AutoScalingConfigurationSummary" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Value: S.String })).annotate({
        identifier: "SourceCodeVersion",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Runtime: S.String,
          BuildCommand: S.optional(SensitiveString),
          StartCommand: S.optional(SensitiveString),
          Port: S.optional(S.String),
          RuntimeEnvironmentVariables: S.optional(__S(1601, __c50, 1)),
          RuntimeEnvironmentSecrets: S.optional(__S(1601, __c50, 1)),
        }),
      ).annotate({ identifier: "CodeConfigurationValues" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSource: S.String,
          CodeConfigurationValues: S.optional(__S(1602, __c50, 2)),
        }),
      ).annotate({ identifier: "CodeConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          RepositoryUrl: S.String,
          SourceCodeVersion: __S(1600, __c50, 0),
          CodeConfiguration: S.optional(__S(1603, __c50, 3)),
          SourceDirectory: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeRepository" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          RuntimeEnvironmentVariables: S.optional(__S(1601, __c50, 1)),
          StartCommand: S.optional(SensitiveString),
          Port: S.optional(S.String),
          RuntimeEnvironmentSecrets: S.optional(__S(1601, __c50, 1)),
        }),
      ).annotate({ identifier: "ImageConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ImageIdentifier: S.String,
          ImageConfiguration: S.optional(__S(1605, __c50, 5)),
          ImageRepositoryType: S.String,
        }),
      ).annotate({ identifier: "ImageRepository" });
    case 7:
      return S.suspend(() =>
        S.Struct({ ConnectionArn: S.optional(S.String), AccessRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "AuthenticationConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          CodeRepository: S.optional(__S(1604, __c50, 4)),
          ImageRepository: S.optional(__S(1606, __c50, 6)),
          AutoDeploymentsEnabled: S.optional(S.Boolean),
          AuthenticationConfiguration: S.optional(__S(1607, __c50, 7)),
        }),
      ).annotate({ identifier: "SourceConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Cpu: S.optional(S.String),
          Memory: S.optional(S.String),
          InstanceRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ KmsKey: S.String })).annotate({
        identifier: "EncryptionConfiguration",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Protocol: S.optional(S.String),
          Path: S.optional(S.String),
          Interval: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          HealthyThreshold: S.optional(S.Number),
          UnhealthyThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "HealthCheckConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({ EgressType: S.optional(S.String), VpcConnectorArn: S.optional(S.String) }),
      ).annotate({ identifier: "EgressConfiguration" });
    case 13:
      return S.suspend(() => S.Struct({ IsPubliclyAccessible: S.optional(S.Boolean) })).annotate({
        identifier: "IngressConfiguration",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          EgressConfiguration: S.optional(__S(1612, __c50, 12)),
          IngressConfiguration: S.optional(__S(1613, __c50, 13)),
          IpAddressType: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ObservabilityEnabled: S.Boolean,
          ObservabilityConfigurationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceObservabilityConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          ServiceName: S.String,
          ServiceId: S.String,
          ServiceArn: S.String,
          ServiceUrl: S.optional(S.String),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.String,
          SourceConfiguration: __S(1608, __c50, 8),
          InstanceConfiguration: __S(1609, __c50, 9),
          EncryptionConfiguration: S.optional(__S(1610, __c50, 10)),
          HealthCheckConfiguration: S.optional(__S(1611, __c50, 11)),
          AutoScalingConfigurationSummary: __S(1568, __c49, 0),
          NetworkConfiguration: __S(1614, __c50, 14),
          ObservabilityConfiguration: S.optional(__S(1615, __c50, 15)),
        }),
      ).annotate({ identifier: "Service" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Service: __S(1616, __c50, 16), OperationId: S.String }).pipe(ns),
      ).annotate({ identifier: "CreateServiceResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
