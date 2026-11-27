import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { awsServiceErrorsWith } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "ELB Proxy", serviceShapeName: "ELBProxy" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "elasticloadbalancing" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-11-20");
const proto = /*@__PURE__*/ T.SmithyProtocolsRpcv2Cbor();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://elb-proxy-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://elb-proxy.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://elb-proxy.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "ELBProxy",
  service: "ELBProxy",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PriorRequestNotCompletedException
  extends /*@__PURE__*/ S.TaggedError<PriorRequestNotCompletedException>()(
    "PriorRequestNotCompletedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ValidationError", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type ProxyIdentifier = string;
export type CertificateIdentifier = string;
export interface AssociateCertificateRequest {
  proxyIdentifier: string;
  certificateIdentifier: string;
}
export type CertificateArn = string;
export type CertificateAssociationStatusCode =
  | "associate-in-progress"
  | "active"
  | "associate-failed"
  | "disassociate-in-progress"
  | "disassociated"
  | (string & {});
export interface CertificateAssociationStatusReason {
  code: string;
  message?: string | undefined;
}
export type CertificateAssociationStatusReasonList = CertificateAssociationStatusReason[];
export interface CertificateAssociationStatus {
  code: CertificateAssociationStatusCode;
  reasons: CertificateAssociationStatusReason[];
}
export interface CertificateAssociation {
  certificateArn: string;
  status: CertificateAssociationStatus;
  createdAt?: Date | undefined;
}
export interface AssociateCertificateResponse {
  certificateAssociation: CertificateAssociation;
}
export type ProxyName = string;
export type ProxyType = "envoy" | (string & {});
export type ProxyVersion = string;
export type IamRoleArn = string;
export type ConfigurationFileBytes = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ConfigurationFile {
  configurationBytes: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type ConfigurationArchiveBytes = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ConfigurationArchive {
  configurationBytes: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface ProxyConfiguration {
  configurationFile?: ConfigurationFile | undefined;
  configurationArchive?: ConfigurationArchive | undefined;
}
export type ProxyIpv4Addressability = "off" | "internet-facing" | "internal" | (string & {});
export type ProxyIpv6Addressability = "off" | "internet-facing" | "internal" | (string & {});
export interface ProxyIpAddressingConfiguration {
  ipv4Addressability: ProxyIpv4Addressability;
  ipv6Addressability: ProxyIpv6Addressability;
}
export interface ProxyIpConfiguration {
  ipAddressingConfiguration: ProxyIpAddressingConfiguration;
}
export type SubnetId = string;
export interface SubnetDetails {
  subnetId: string;
}
export type SubnetDetailsList = SubnetDetails[];
export type SecurityGroupId = string;
export interface SecurityGroupDetails {
  securityGroupId: string;
}
export type SecurityGroupDetailsList = SecurityGroupDetails[];
export interface ProxyVpcUserConfiguration {
  subnets: SubnetDetails[];
  securityGroups: SecurityGroupDetails[];
}
export interface ProxyNetworkUserConfiguration {
  ipConfiguration: ProxyIpConfiguration;
  vpcConfiguration: ProxyVpcUserConfiguration;
}
export type ProxyAttributeKey = string;
export type ProxyAttributeValue = string;
export interface Attribute {
  key: string;
  value: string;
}
export type ProxyAttributeList = Attribute[];
export type CustomerKmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateProxyRequest {
  name: string;
  type: ProxyType;
  proxyVersion: string;
  roleArn: string;
  configuration: ProxyConfiguration;
  networkConfiguration: ProxyNetworkUserConfiguration;
  attributes?: Attribute[] | undefined;
  customerKmsKeyArn?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type AmazonResourceName = string;
export interface SubnetAndZone {
  subnetId: string;
  zoneId: string;
  zoneName?: string | undefined;
}
export type SubnetAndZoneList = SubnetAndZone[];
export interface ProxyVpcConfiguration {
  vpcId?: string | undefined;
  availabilityZones: SubnetAndZone[];
  securityGroups: SecurityGroupDetails[];
}
export interface ProxyNetworkConfiguration {
  ipConfiguration: ProxyIpConfiguration;
  vpcConfiguration: ProxyVpcConfiguration;
}
export type ProxyStatusCode =
  | "action-required"
  | "active"
  | "create-failed"
  | "create-in-progress"
  | "deleted"
  | "delete-in-progress"
  | "update-in-progress"
  | "cancel-update-in-progress"
  | (string & {});
export interface ProxyStatusReason {
  code: string;
  target?: string | undefined;
  message?: string | undefined;
}
export type ProxyStatusReasonList = ProxyStatusReason[];
export interface ProxyStatus {
  code: ProxyStatusCode;
  reasons: ProxyStatusReason[];
}
export interface ConfigurationMetadata {
  configFileHash?: string | undefined;
  configArchiveHash?: string | undefined;
  configFileLastUpdatedAt?: Date | undefined;
  configArchiveLastUpdatedAt?: Date | undefined;
}
export interface CreateProxyResponse {
  arn?: string | undefined;
  name?: string | undefined;
  type?: ProxyType | undefined;
  proxyVersion?: string | undefined;
  dnsName?: string | undefined;
  roleArn?: string | undefined;
  networkConfiguration?: ProxyNetworkConfiguration | undefined;
  status?: ProxyStatus | undefined;
  configurationMetadata?: ConfigurationMetadata | undefined;
  createdAt?: Date | undefined;
  customerKmsKeyArn?: string | undefined;
}
export interface DeleteProxyRequest {
  proxyIdentifier: string;
}
export interface DeleteProxyResponse {
  arn: string;
  name: string;
  status?: ProxyStatus | undefined;
}
export interface DisassociateCertificateRequest {
  proxyIdentifier: string;
  certificateIdentifier: string;
}
export interface DisassociateCertificateResponse {
  certificateAssociation: CertificateAssociation;
}
export interface GetProxyRequest {
  proxyIdentifier: string;
}
export interface GetProxyResponse {
  arn?: string | undefined;
  name?: string | undefined;
  type?: ProxyType | undefined;
  proxyVersion?: string | undefined;
  dnsName?: string | undefined;
  roleArn?: string | undefined;
  networkConfiguration?: ProxyNetworkConfiguration | undefined;
  status?: ProxyStatus | undefined;
  configurationMetadata?: ConfigurationMetadata | undefined;
  createdAt?: Date | undefined;
  customerKmsKeyArn?: string | undefined;
}
export interface GetProxyAttributesRequest {
  proxyIdentifier: string;
}
export interface AttributeDetails {
  key: string;
  value: string;
  defaultValue?: string | undefined;
}
export type ProxyAttributeDetailsList = AttributeDetails[];
export interface GetProxyAttributesResponse {
  attributes?: AttributeDetails[] | undefined;
}
export interface GetProxyConfigurationContentsRequest {
  proxyIdentifier: string;
  includeConfigFile?: boolean | undefined;
  includeConfigArchive?: boolean | undefined;
}
export interface GetProxyConfigurationContentsResponse {
  configurationFileContents?: Uint8Array | redacted.Redacted<Uint8Array> | undefined;
  configurationArchiveContents?: Uint8Array | redacted.Redacted<Uint8Array> | undefined;
  configurationMetadata?: ConfigurationMetadata | undefined;
  customerKmsKeyArn?: string | undefined;
}
export type ProxyUpdateIdentifier = string;
export interface GetProxyUpdateRequest {
  proxyIdentifier: string;
  updateIdentifier: string;
}
export type ProxyUpdateValidationStatus = "not-validated" | "valid" | "invalid" | (string & {});
export type ProxyUpdatePropagationStatus =
  | "in-progress"
  | "complete"
  | "skipped"
  | "failed"
  | "cancelled"
  | (string & {});
export type ProxyUpdateStateReason = string;
export type ProxyUpdateStateReasonList = string[];
export interface ProxyUpdateState {
  validationStatus: ProxyUpdateValidationStatus;
  propagationStatus: ProxyUpdatePropagationStatus;
  reasons?: string[] | undefined;
}
export interface ProxyConfigurationUpdateDetails {
  newConfigurationMetadata?: ConfigurationMetadata | undefined;
}
export type ProxyUpdateDetails = { configuration: ProxyConfigurationUpdateDetails };
export interface GetProxyUpdateResponse {
  proxyArn: string;
  updateId: string;
  state: ProxyUpdateState;
  details: ProxyUpdateDetails;
  submittedAt: Date;
  validatedAt?: Date | undefined;
  completedAt?: Date | undefined;
}
export type NextToken = string;
export interface ListCertificateAssociationsRequest {
  proxyIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type CertificateAssociationList = CertificateAssociation[];
export interface ListCertificateAssociationsResponse {
  items: CertificateAssociation[];
  nextToken?: string | undefined;
}
export interface ListProxiesRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ProxySummary {
  arn?: string | undefined;
  name?: string | undefined;
  type?: ProxyType | undefined;
  dnsName?: string | undefined;
  vpcId?: string | undefined;
  status?: ProxyStatus | undefined;
  createdAt?: Date | undefined;
}
export type ProxySummaryList = ProxySummary[];
export interface ListProxiesResponse {
  items: ProxySummary[];
  nextToken?: string | undefined;
}
export interface ListProxyUpdatesRequest {
  proxyIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type ProxyUpdateType = "update-proxy-configuration" | (string & {});
export interface ProxyUpdateSummary {
  updateId: string;
  type: ProxyUpdateType;
  validationStatus: ProxyUpdateValidationStatus;
  propagationStatus: ProxyUpdatePropagationStatus;
  submittedAt: Date;
  validatedAt?: Date | undefined;
  completedAt?: Date | undefined;
}
export type ProxyUpdateSummaryList = ProxyUpdateSummary[];
export interface ListProxyUpdatesResponse {
  items: ProxyUpdateSummary[];
  nextToken?: string | undefined;
}
export interface ListProxyVersionsRequest {
  type: ProxyType;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ProxyVersionSummary {
  type: ProxyType;
  version: string;
}
export type ProxyVersionSummaryList = ProxyVersionSummary[];
export interface ListProxyVersionsResponse {
  items: ProxyVersionSummary[];
  nextToken?: string | undefined;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateProxyAttributesRequest {
  proxyIdentifier: string;
  attributes: Attribute[];
}
export interface UpdateProxyAttributesResponse {
  attributes: AttributeDetails[];
}
export interface UpdateProxyConfigurationRequest {
  proxyIdentifier: string;
  configurationFile?: ConfigurationFile | undefined;
  configurationArchive?: ConfigurationArchive | undefined;
  resetConfigurationArchive?: boolean | undefined;
  customerKmsKeyArn?: string | undefined;
  resetCustomerKmsKeyArn?: boolean | undefined;
}
export interface UpdateProxyConfigurationResponse {
  configurationMetadata: ConfigurationMetadata;
  updateId?: string | undefined;
  customerKmsKeyArn?: string | undefined;
}
export interface UpdateProxyVpcConfiguration {
  subnets?: SubnetDetails[] | undefined;
  securityGroups?: SecurityGroupDetails[] | undefined;
}
export interface UpdateProxyNetworkConfigurationRequest {
  proxyIdentifier: string;
  vpcConfiguration: UpdateProxyVpcConfiguration;
}
export interface UpdateProxyNetworkConfigurationResponse {
  arn?: string | undefined;
  name?: string | undefined;
  type?: ProxyType | undefined;
  proxyVersion?: string | undefined;
  dnsName?: string | undefined;
  roleArn?: string | undefined;
  networkConfiguration?: ProxyNetworkConfiguration | undefined;
  status?: ProxyStatus | undefined;
  configurationMetadata?: ConfigurationMetadata | undefined;
  createdAt?: Date | undefined;
  customerKmsKeyArn?: string | undefined;
}
export type ValidationExceptionMessage = string;
export type AssociateCertificateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Associates an ACM certificate with the specified Proxy.
 */
export const associateCertificate: API.OperationMethod<
  AssociateCertificateRequest & RegionInput,
  AssociateCertificateResponse,
  AssociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<AssociateCertificateRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<AssociateCertificateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCertificate",
  telemetry: TELEMETRY,
  span: "AssociateCertificate",
}));

export type CreateProxyError =
  | AccessDeniedException
  | ConflictException
  | OperationNotPermittedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Creates a proxy. A proxy is a fully managed, Envoy-based proxy that runs your
 * Envoy configuration on Amazon EC2 instances inside your own virtual private
 * cloud (VPC). AWS provisions and scales the proxy, upgrades the Envoy version,
 * patches the operating system, and monitors its health.
 */
export const createProxy: API.OperationMethod<
  CreateProxyRequest & RegionInput,
  CreateProxyResponse,
  CreateProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3, __c0, 3) as any as S.Schema<CreateProxyRequest>,
  output: __S(56, __c3, 8) as any as S.Schema<CreateProxyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    OperationNotPermittedException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxy",
  telemetry: TELEMETRY,
  span: "CreateProxy",
}));

export type DeleteProxyError =
  | OperationNotPermittedException
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a proxy.
 */
export const deleteProxy: API.OperationMethod<
  DeleteProxyRequest & RegionInput,
  DeleteProxyResponse,
  DeleteProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteProxyRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<DeleteProxyResponse>,
  errors: [OperationNotPermittedException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxy",
  telemetry: TELEMETRY,
  span: "DeleteProxy",
}));

export type DisassociateCertificateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Disassociates an ACM certificate from the specified proxy.
 */
export const disassociateCertificate: API.OperationMethod<
  DisassociateCertificateRequest & RegionInput,
  DisassociateCertificateResponse,
  DisassociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DisassociateCertificateRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DisassociateCertificateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCertificate",
  telemetry: TELEMETRY,
  span: "DisassociateCertificate",
}));

export type GetProxyError =
  | ResourceNotFoundException
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the specified proxy.
 */
export const getProxy: API.OperationMethod<
  GetProxyRequest & RegionInput,
  GetProxyResponse,
  GetProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<GetProxyRequest>,
  output: __S(56, __c3, 8) as any as S.Schema<GetProxyResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProxy",
  telemetry: TELEMETRY,
  span: "GetProxy",
}));

export type GetProxyAttributesError =
  | ResourceNotFoundException
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the attributes for the specified proxy.
 */
export const getProxyAttributes: API.OperationMethod<
  GetProxyAttributesRequest & RegionInput,
  GetProxyAttributesResponse,
  GetProxyAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetProxyAttributesRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<GetProxyAttributesResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProxyAttributes",
  telemetry: TELEMETRY,
  span: "GetProxyAttributes",
}));

export type GetProxyConfigurationContentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the configuration file, the configuration archive, or both for the
 * specified proxy. This operation is separate from GetProxy so that you can
 * grant access to proxy metadata without granting access to the configuration
 * content.
 */
export const getProxyConfigurationContents: API.OperationMethod<
  GetProxyConfigurationContentsRequest & RegionInput,
  GetProxyConfigurationContentsResponse,
  GetProxyConfigurationContentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<GetProxyConfigurationContentsRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<GetProxyConfigurationContentsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProxyConfigurationContents",
  telemetry: TELEMETRY,
  span: "GetProxyConfigurationContents",
}));

export type GetProxyUpdateError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Retrieves information about the specified proxy update.
 */
export const getProxyUpdate: API.OperationMethod<
  GetProxyUpdateRequest & RegionInput,
  GetProxyUpdateResponse,
  GetProxyUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<GetProxyUpdateRequest>,
  output: __S(228, __c14, 4) as any as S.Schema<GetProxyUpdateResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProxyUpdate",
  telemetry: TELEMETRY,
  span: "GetProxyUpdate",
}));

export type ListCertificateAssociationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the ACM certificate associations for the specified proxy.
 */
export const listCertificateAssociations: API.PaginatedOperationMethod<
  ListCertificateAssociationsRequest & RegionInput,
  ListCertificateAssociationsResponse,
  ListCertificateAssociationsError,
  Credentials | HttpClient.HttpClient,
  CertificateAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ListCertificateAssociationsRequest>,
  output: __S(258, __c16, 2) as any as S.Schema<ListCertificateAssociationsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCertificateAssociations",
})) as any;

export type ListProxiesError =
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the proxies owned by the caller account.
 */
export const listProxies: API.PaginatedOperationMethod<
  ListProxiesRequest & RegionInput,
  ListProxiesResponse,
  ListProxiesError,
  Credentials | HttpClient.HttpClient,
  ProxySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ListProxiesRequest>,
  output: __S(275, __c17, 3) as any as S.Schema<ListProxiesResponse>,
  errors: [ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProxies",
})) as any;

export type ListProxyUpdatesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the updates for the specified proxy, most recently submitted first.
 */
export const listProxyUpdates: API.PaginatedOperationMethod<
  ListProxyUpdatesRequest & RegionInput,
  ListProxyUpdatesResponse,
  ListProxyUpdatesError,
  Credentials | HttpClient.HttpClient,
  ProxyUpdateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListProxyUpdatesRequest>,
  output: __S(291, __c18, 3) as any as S.Schema<ListProxyUpdatesResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxyUpdates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProxyUpdates",
})) as any;

export type ListProxyVersionsError =
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the available proxy versions.
 */
export const listProxyVersions: API.PaginatedOperationMethod<
  ListProxyVersionsRequest & RegionInput,
  ListProxyVersionsResponse,
  ListProxyVersionsError,
  Credentials | HttpClient.HttpClient,
  ProxyVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListProxyVersionsRequest>,
  output: __S(307, __c19, 3) as any as S.Schema<ListProxyVersionsResponse>,
  errors: [ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxyVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProxyVersions",
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput & RegionInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(321, __c20, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput & RegionInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<TagResourceInput>,
  output: __S(352, __c22, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | InternalServerException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput & RegionInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(352, __c22, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateProxyAttributesError =
  | ResourceNotFoundException
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the attributes for the specified proxy.
 */
export const updateProxyAttributes: API.OperationMethod<
  UpdateProxyAttributesRequest & RegionInput,
  UpdateProxyAttributesResponse,
  UpdateProxyAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<UpdateProxyAttributesRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<UpdateProxyAttributesResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyAttributes",
  telemetry: TELEMETRY,
  span: "UpdateProxyAttributes",
}));

export type UpdateProxyConfigurationError =
  | AccessDeniedException
  | PriorRequestNotCompletedException
  | ResourceNotFoundException
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the configuration for the specified proxy. You can update the
 * configuration file, the configuration archive, or both.
 */
export const updateProxyConfiguration: API.OperationMethod<
  UpdateProxyConfigurationRequest & RegionInput,
  UpdateProxyConfigurationResponse,
  UpdateProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UpdateProxyConfigurationRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<UpdateProxyConfigurationResponse>,
  errors: [
    AccessDeniedException,
    PriorRequestNotCompletedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateProxyConfiguration",
}));

export type UpdateProxyNetworkConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the network configuration for the specified proxy.
 */
export const updateProxyNetworkConfiguration: API.OperationMethod<
  UpdateProxyNetworkConfigurationRequest & RegionInput,
  UpdateProxyNetworkConfigurationResponse,
  UpdateProxyNetworkConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(417, __c26, 1) as any as S.Schema<UpdateProxyNetworkConfigurationRequest>,
  output: __S(56, __c3, 8) as any as S.Schema<UpdateProxyNetworkConfigurationResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  serviceErrors: awsServiceErrorsWith(InternalServerException, ThrottlingException),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyNetworkConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateProxyNetworkConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configurationFile: S.optional(__S(96, __c6, 0)),
          configurationArchive: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "ProxyConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ subnets: __S(113, __c7, 1), securityGroups: __S(51, __c3, 3) }),
      ).annotate({ identifier: "ProxyVpcUserConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ipConfiguration: __S(49, __c3, 1), vpcConfiguration: __S(1, __c0, 1) }),
      ).annotate({ identifier: "ProxyNetworkUserConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          proxyVersion: S.String,
          roleArn: S.String,
          configuration: __S(0, __c0, 0),
          networkConfiguration: __S(2, __c0, 2),
          attributes: S.optional(__S(81, __c5, 1)),
          customerKmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProxyRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.String, target: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ProxyStatusReason" });
    case 1:
      return S.Array(__S(16, __c1, 0));
    case 2:
      return S.suspend(() => S.Struct({ code: S.String, reasons: __S(17, __c1, 1) })).annotate({
        identifier: "ProxyStatus",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configFileHash: S.optional(S.String),
          configArchiveHash: S.optional(S.String),
          configFileLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          configArchiveLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConfigurationMetadata" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ipv4Addressability: S.String, ipv6Addressability: S.String }),
      ).annotate({ identifier: "ProxyIpAddressingConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ ipAddressingConfiguration: __S(48, __c3, 0) })).annotate({
        identifier: "ProxyIpConfiguration",
      });
    case 2:
      return S.suspend(() => S.Struct({ securityGroupId: S.String })).annotate({
        identifier: "SecurityGroupDetails",
      });
    case 3:
      return S.Array(__S(50, __c3, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ subnetId: S.String, zoneId: S.String, zoneName: S.optional(S.String) }),
      ).annotate({ identifier: "SubnetAndZone" });
    case 5:
      return S.Array(__S(52, __c3, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.optional(S.String),
          availabilityZones: __S(53, __c3, 5),
          securityGroups: __S(51, __c3, 3),
        }),
      ).annotate({ identifier: "ProxyVpcConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({ ipConfiguration: __S(49, __c3, 1), vpcConfiguration: __S(54, __c3, 6) }),
      ).annotate({ identifier: "ProxyNetworkConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          proxyVersion: S.optional(S.String),
          dnsName: S.optional(S.String),
          roleArn: S.optional(S.String),
          networkConfiguration: S.optional(__S(55, __c3, 7)),
          status: S.optional(__S(18, __c1, 2)),
          configurationMetadata: S.optional(__S(32, __c2, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          customerKmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProxyResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Attribute",
      });
    case 1:
      return S.Array(__S(80, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ configurationBytes: SensitiveBlob })).annotate({
        identifier: "ConfigurationFile",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ subnetId: S.String })).annotate({
        identifier: "SubnetDetails",
      });
    case 1:
      return S.Array(__S(112, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ proxyIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProxyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.String, name: S.String, status: S.optional(__S(18, __c1, 2)) }),
      ).annotate({ identifier: "DeleteProxyResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ proxyIdentifier: S.String, certificateIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateCertificateRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ proxyIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProxyRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ proxyIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProxyAttributesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ attributes: S.optional(__S(193, __c12, 1)) })).annotate({
        identifier: "GetProxyAttributesResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, value: S.String, defaultValue: S.optional(S.String) }),
      ).annotate({ identifier: "AttributeDetails" });
    case 1:
      return S.Array(__S(192, __c12, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          proxyIdentifier: S.String,
          includeConfigFile: S.optional(S.Boolean),
          includeConfigArchive: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetProxyConfigurationContentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configurationFileContents: S.optional(SensitiveBlob),
          configurationArchiveContents: S.optional(SensitiveBlob),
          configurationMetadata: S.optional(__S(32, __c2, 0)),
          customerKmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetProxyConfigurationContentsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ proxyIdentifier: S.String, updateIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProxyUpdateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          validationStatus: S.String,
          propagationStatus: S.String,
          reasons: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "ProxyUpdateState" });
    case 2:
      return S.suspend(() =>
        S.Struct({ newConfigurationMetadata: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "ProxyConfigurationUpdateDetails" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ configuration: __S(226, __c14, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          proxyArn: S.String,
          updateId: S.String,
          state: __S(225, __c14, 1),
          details: __S(227, __c14, 3),
          submittedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          validatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetProxyUpdateResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          proxyIdentifier: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCertificateAssociationsRequest" });
    case 1:
      return S.Array(__S(467, __c29, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(257, __c16, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCertificateAssociationsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProxiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          dnsName: S.optional(S.String),
          vpcId: S.optional(S.String),
          status: S.optional(__S(18, __c1, 2)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProxySummary" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(274, __c17, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProxiesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          proxyIdentifier: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProxyUpdatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          updateId: S.String,
          type: S.String,
          validationStatus: S.String,
          propagationStatus: S.String,
          submittedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          validatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProxyUpdateSummary" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(290, __c18, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProxyUpdatesResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProxyVersionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ type: S.String, version: S.String })).annotate({
        identifier: "ProxyVersionSummary",
      });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(306, __c19, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProxyVersionsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(64, __c4, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(64, __c4, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(240, __c15, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ proxyIdentifier: S.String, attributes: __S(81, __c5, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateProxyAttributesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ attributes: __S(193, __c12, 1) })).annotate({
        identifier: "UpdateProxyAttributesResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          proxyIdentifier: S.String,
          configurationFile: S.optional(__S(96, __c6, 0)),
          configurationArchive: S.optional(__S(96, __c6, 0)),
          resetConfigurationArchive: S.optional(S.Boolean),
          customerKmsKeyArn: S.optional(S.String),
          resetCustomerKmsKeyArn: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProxyConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configurationMetadata: __S(32, __c2, 0),
          updateId: S.optional(S.String),
          customerKmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProxyConfigurationResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subnets: S.optional(__S(113, __c7, 1)),
          securityGroups: S.optional(__S(51, __c3, 3)),
        }),
      ).annotate({ identifier: "UpdateProxyVpcConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ proxyIdentifier: S.String, vpcConfiguration: __S(416, __c26, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateProxyNetworkConfigurationRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ proxyIdentifier: S.String, certificateIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateCertificateRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ certificateAssociation: __S(467, __c29, 3) })).annotate({
        identifier: "AssociateCertificateResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ code: S.String, message: S.optional(S.String) })).annotate({
        identifier: "CertificateAssociationStatusReason",
      });
    case 1:
      return S.Array(__S(464, __c29, 0));
    case 2:
      return S.suspend(() => S.Struct({ code: S.String, reasons: __S(465, __c29, 1) })).annotate({
        identifier: "CertificateAssociationStatus",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.String,
          status: __S(466, __c29, 2),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CertificateAssociation" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
