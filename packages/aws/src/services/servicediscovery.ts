import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "ServiceDiscovery",
  target: "Route53AutoNaming_v20170314",
  version: "2017-03-14",
  sigv4: "servicediscovery",
  protocol: awsJson1_1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
                `https://servicediscovery-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://servicediscovery-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://servicediscovery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://servicediscovery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CustomHealthNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomHealthNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DuplicateRequest
  extends /*@__PURE__*/ TE.TaggedError("DuplicateRequest", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly DuplicateOperationId?: string }> {}
export class InstanceNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "InstanceNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class InvalidInput
  extends /*@__PURE__*/ TE.TaggedError("InvalidInput", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class NamespaceAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "NamespaceAlreadyExists",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly CreatorRequestId?: string;
    readonly NamespaceId?: string;
  }> {}
export class NamespaceNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "NamespaceNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class OperationNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestLimitExceeded",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ResourceInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceeded",
    ["BadRequestError", "ThrottlingError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceAlreadyExists",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly CreatorRequestId?: string;
    readonly ServiceId?: string;
    readonly ServiceArn?: string;
  }> {}
export class ServiceAttributesLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceAttributesLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceNotFound
  extends /*@__PURE__*/ TE.TaggedError("ServiceNotFound", ["BadRequestError"], {
    status: 404,
  })<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export type NamespaceNameHttp = string;
export type ResourceId = string;
export type ResourceDescription = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateHttpNamespaceRequest {
  Name: string;
  CreatorRequestId?: string;
  Description?: string;
  Tags?: Tag[];
}
export type OperationId = string;
export interface CreateHttpNamespaceResponse {
  OperationId?: string;
}
export type NamespaceNamePrivate = string;
export type RecordTTL = number;
export interface SOA {
  TTL?: number;
}
export interface PrivateDnsPropertiesMutable {
  SOA: SOA;
}
export interface PrivateDnsNamespaceProperties {
  DnsProperties: PrivateDnsPropertiesMutable;
}
export interface CreatePrivateDnsNamespaceRequest {
  Name: string;
  CreatorRequestId?: string;
  Description?: string;
  Vpc: string;
  Tags?: Tag[];
  Properties?: PrivateDnsNamespaceProperties;
}
export interface CreatePrivateDnsNamespaceResponse {
  OperationId?: string;
}
export type NamespaceNamePublic = string;
export interface PublicDnsPropertiesMutable {
  SOA: SOA;
}
export interface PublicDnsNamespaceProperties {
  DnsProperties: PublicDnsPropertiesMutable;
}
export interface CreatePublicDnsNamespaceRequest {
  Name: string;
  CreatorRequestId?: string;
  Description?: string;
  Tags?: Tag[];
  Properties?: PublicDnsNamespaceProperties;
}
export interface CreatePublicDnsNamespaceResponse {
  OperationId?: string;
}
export type ServiceName = string;
export type Arn = string;
export type RoutingPolicy = "MULTIVALUE" | "WEIGHTED" | (string & {});
export type RecordType = "SRV" | "A" | "AAAA" | "CNAME" | (string & {});
export interface DnsRecord {
  Type: RecordType;
  TTL: number;
}
export type DnsRecordList = DnsRecord[];
export interface DnsConfig {
  NamespaceId?: string;
  RoutingPolicy?: RoutingPolicy;
  DnsRecords?: DnsRecord[];
}
export type HealthCheckType = "HTTP" | "HTTPS" | "TCP" | (string & {});
export type ResourcePath = string;
export type FailureThreshold = number;
export interface HealthCheckConfig {
  Type: HealthCheckType;
  ResourcePath?: string;
  FailureThreshold?: number;
}
export interface HealthCheckCustomConfig {
  FailureThreshold?: number;
}
export type ServiceTypeOption = "HTTP" | (string & {});
export interface CreateServiceRequest {
  Name: string;
  NamespaceId?: string;
  CreatorRequestId?: string;
  Description?: string;
  DnsConfig?: DnsConfig;
  HealthCheckConfig?: HealthCheckConfig;
  HealthCheckCustomConfig?: HealthCheckCustomConfig;
  Tags?: Tag[];
  Type?: ServiceTypeOption;
}
export type AWSAccountId = string;
export type ResourceCount = number;
export type ServiceType = "HTTP" | "DNS_HTTP" | "DNS" | (string & {});
export interface Service {
  Id?: string;
  Arn?: string;
  ResourceOwner?: string;
  Name?: string;
  NamespaceId?: string;
  Description?: string;
  InstanceCount?: number;
  DnsConfig?: DnsConfig;
  Type?: ServiceType;
  HealthCheckConfig?: HealthCheckConfig;
  HealthCheckCustomConfig?: HealthCheckCustomConfig;
  CreateDate?: Date;
  CreatorRequestId?: string;
  CreatedByAccount?: string;
}
export interface CreateServiceResponse {
  Service?: Service;
}
export interface DeleteNamespaceRequest {
  Id: string;
}
export interface DeleteNamespaceResponse {
  OperationId?: string;
}
export interface DeleteServiceRequest {
  Id: string;
}
export interface DeleteServiceResponse {}
export type ServiceAttributeKey = string;
export type ServiceAttributeKeyList = string[];
export interface DeleteServiceAttributesRequest {
  ServiceId: string;
  Attributes: string[];
}
export interface DeleteServiceAttributesResponse {}
export interface DeregisterInstanceRequest {
  ServiceId: string;
  InstanceId: string;
}
export interface DeregisterInstanceResponse {
  OperationId?: string;
}
export type NamespaceName = string;
export type DiscoverMaxResults = number;
export type AttrKey = string;
export type AttrValue = string;
export type Attributes = { [key: string]: string | undefined };
export type HealthStatusFilter =
  | "HEALTHY"
  | "UNHEALTHY"
  | "ALL"
  | "HEALTHY_OR_ELSE_ALL"
  | (string & {});
export interface DiscoverInstancesRequest {
  NamespaceName: string;
  ServiceName: string;
  MaxResults?: number;
  QueryParameters?: { [key: string]: string | undefined };
  OptionalParameters?: { [key: string]: string | undefined };
  HealthStatus?: HealthStatusFilter;
  OwnerAccount?: string;
}
export type HealthStatus = "HEALTHY" | "UNHEALTHY" | "UNKNOWN" | (string & {});
export interface HttpInstanceSummary {
  InstanceId?: string;
  NamespaceName?: string;
  ServiceName?: string;
  HealthStatus?: HealthStatus;
  Attributes?: { [key: string]: string | undefined };
}
export type HttpInstanceSummaryList = HttpInstanceSummary[];
export type Revision = number;
export interface DiscoverInstancesResponse {
  Instances?: HttpInstanceSummary[];
  InstancesRevision?: number;
}
export interface DiscoverInstancesRevisionRequest {
  NamespaceName: string;
  ServiceName: string;
  OwnerAccount?: string;
}
export interface DiscoverInstancesRevisionResponse {
  InstancesRevision?: number;
}
export interface GetInstanceRequest {
  ServiceId: string;
  InstanceId: string;
}
export interface Instance {
  Id: string;
  CreatorRequestId?: string;
  Attributes?: { [key: string]: string | undefined };
  CreatedByAccount?: string;
}
export interface GetInstanceResponse {
  ResourceOwner?: string;
  Instance?: Instance;
}
export type InstanceIdList = string[];
export type MaxResults = number;
export type NextToken = string;
export interface GetInstancesHealthStatusRequest {
  ServiceId: string;
  Instances?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type InstanceHealthStatusMap = {
  [key: string]: HealthStatus | undefined;
};
export interface GetInstancesHealthStatusResponse {
  Status?: { [key: string]: HealthStatus | undefined };
  NextToken?: string;
}
export interface GetNamespaceRequest {
  Id: string;
}
export type NamespaceType =
  | "DNS_PUBLIC"
  | "DNS_PRIVATE"
  | "HTTP"
  | (string & {});
export interface DnsProperties {
  HostedZoneId?: string;
  SOA?: SOA;
}
export interface HttpProperties {
  HttpName?: string;
}
export interface NamespaceProperties {
  DnsProperties?: DnsProperties;
  HttpProperties?: HttpProperties;
}
export interface Namespace {
  Id?: string;
  Arn?: string;
  ResourceOwner?: string;
  Name?: string;
  Type?: NamespaceType;
  Description?: string;
  ServiceCount?: number;
  Properties?: NamespaceProperties;
  CreateDate?: Date;
  CreatorRequestId?: string;
}
export interface GetNamespaceResponse {
  Namespace?: Namespace;
}
export interface GetOperationRequest {
  OperationId: string;
  OwnerAccount?: string;
}
export type OperationType =
  | "CREATE_NAMESPACE"
  | "DELETE_NAMESPACE"
  | "UPDATE_NAMESPACE"
  | "UPDATE_SERVICE"
  | "REGISTER_INSTANCE"
  | "DEREGISTER_INSTANCE"
  | (string & {});
export type OperationStatus =
  | "SUBMITTED"
  | "PENDING"
  | "SUCCESS"
  | "FAIL"
  | (string & {});
export type Message = string;
export type Code = string;
export type OperationTargetType =
  | "NAMESPACE"
  | "SERVICE"
  | "INSTANCE"
  | (string & {});
export type OperationTargetsMap = { [key in OperationTargetType]?: string };
export interface Operation {
  Id?: string;
  OwnerAccount?: string;
  Type?: OperationType;
  Status?: OperationStatus;
  ErrorMessage?: string;
  ErrorCode?: string;
  CreateDate?: Date;
  UpdateDate?: Date;
  Targets?: { [key: string]: string | undefined };
}
export interface GetOperationResponse {
  Operation?: Operation;
}
export interface GetServiceRequest {
  Id: string;
}
export interface GetServiceResponse {
  Service?: Service;
}
export interface GetServiceAttributesRequest {
  ServiceId: string;
}
export type ServiceAttributeValue = string;
export type ServiceAttributesMap = { [key: string]: string | undefined };
export interface ServiceAttributes {
  ServiceArn?: string;
  ResourceOwner?: string;
  Attributes?: { [key: string]: string | undefined };
}
export interface GetServiceAttributesResponse {
  ServiceAttributes?: ServiceAttributes;
}
export interface ListInstancesRequest {
  ServiceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface InstanceSummary {
  Id?: string;
  Attributes?: { [key: string]: string | undefined };
  CreatedByAccount?: string;
}
export type InstanceSummaryList = InstanceSummary[];
export interface ListInstancesResponse {
  ResourceOwner?: string;
  Instances?: InstanceSummary[];
  NextToken?: string;
}
export type NamespaceFilterName =
  | "TYPE"
  | "NAME"
  | "HTTP_NAME"
  | "RESOURCE_OWNER"
  | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export type FilterCondition =
  | "EQ"
  | "IN"
  | "BETWEEN"
  | "BEGINS_WITH"
  | (string & {});
export interface NamespaceFilter {
  Name: NamespaceFilterName;
  Values: string[];
  Condition?: FilterCondition;
}
export type NamespaceFilters = NamespaceFilter[];
export interface ListNamespacesRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: NamespaceFilter[];
}
export interface NamespaceSummary {
  Id?: string;
  Arn?: string;
  ResourceOwner?: string;
  Name?: string;
  Type?: NamespaceType;
  Description?: string;
  ServiceCount?: number;
  Properties?: NamespaceProperties;
  CreateDate?: Date;
}
export type NamespaceSummariesList = NamespaceSummary[];
export interface ListNamespacesResponse {
  Namespaces?: NamespaceSummary[];
  NextToken?: string;
}
export type OperationFilterName =
  | "NAMESPACE_ID"
  | "SERVICE_ID"
  | "STATUS"
  | "TYPE"
  | "UPDATE_DATE"
  | (string & {});
export interface OperationFilter {
  Name: OperationFilterName;
  Values: string[];
  Condition?: FilterCondition;
}
export type OperationFilters = OperationFilter[];
export interface ListOperationsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: OperationFilter[];
}
export interface OperationSummary {
  Id?: string;
  Status?: OperationStatus;
}
export type OperationSummaryList = OperationSummary[];
export interface ListOperationsResponse {
  Operations?: OperationSummary[];
  NextToken?: string;
}
export type ServiceFilterName =
  | "NAMESPACE_ID"
  | "RESOURCE_OWNER"
  | (string & {});
export interface ServiceFilter {
  Name: ServiceFilterName;
  Values: string[];
  Condition?: FilterCondition;
}
export type ServiceFilters = ServiceFilter[];
export interface ListServicesRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: ServiceFilter[];
}
export interface ServiceSummary {
  Id?: string;
  Arn?: string;
  ResourceOwner?: string;
  Name?: string;
  Type?: ServiceType;
  Description?: string;
  InstanceCount?: number;
  DnsConfig?: DnsConfig;
  HealthCheckConfig?: HealthCheckConfig;
  HealthCheckCustomConfig?: HealthCheckCustomConfig;
  CreateDate?: Date;
  CreatedByAccount?: string;
}
export type ServiceSummariesList = ServiceSummary[];
export interface ListServicesResponse {
  Services?: ServiceSummary[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type InstanceId = string;
export interface RegisterInstanceRequest {
  ServiceId: string;
  InstanceId: string;
  CreatorRequestId?: string;
  Attributes: { [key: string]: string | undefined };
}
export interface RegisterInstanceResponse {
  OperationId?: string;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface HttpNamespaceChange {
  Description: string;
}
export interface UpdateHttpNamespaceRequest {
  Id: string;
  UpdaterRequestId?: string;
  Namespace: HttpNamespaceChange;
}
export interface UpdateHttpNamespaceResponse {
  OperationId?: string;
}
export type CustomHealthStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export interface UpdateInstanceCustomHealthStatusRequest {
  ServiceId: string;
  InstanceId: string;
  Status: CustomHealthStatus;
}
export interface UpdateInstanceCustomHealthStatusResponse {}
export interface SOAChange {
  TTL: number;
}
export interface PrivateDnsPropertiesMutableChange {
  SOA: SOAChange;
}
export interface PrivateDnsNamespacePropertiesChange {
  DnsProperties: PrivateDnsPropertiesMutableChange;
}
export interface PrivateDnsNamespaceChange {
  Description?: string;
  Properties?: PrivateDnsNamespacePropertiesChange;
}
export interface UpdatePrivateDnsNamespaceRequest {
  Id: string;
  UpdaterRequestId?: string;
  Namespace: PrivateDnsNamespaceChange;
}
export interface UpdatePrivateDnsNamespaceResponse {
  OperationId?: string;
}
export interface PublicDnsPropertiesMutableChange {
  SOA: SOAChange;
}
export interface PublicDnsNamespacePropertiesChange {
  DnsProperties: PublicDnsPropertiesMutableChange;
}
export interface PublicDnsNamespaceChange {
  Description?: string;
  Properties?: PublicDnsNamespacePropertiesChange;
}
export interface UpdatePublicDnsNamespaceRequest {
  Id: string;
  UpdaterRequestId?: string;
  Namespace: PublicDnsNamespaceChange;
}
export interface UpdatePublicDnsNamespaceResponse {
  OperationId?: string;
}
export interface DnsConfigChange {
  DnsRecords: DnsRecord[];
}
export interface ServiceChange {
  Description?: string;
  DnsConfig?: DnsConfigChange;
  HealthCheckConfig?: HealthCheckConfig;
}
export interface UpdateServiceRequest {
  Id: string;
  Service: ServiceChange;
}
export interface UpdateServiceResponse {
  OperationId?: string;
}
export interface UpdateServiceAttributesRequest {
  ServiceId: string;
  Attributes: { [key: string]: string | undefined };
}
export interface UpdateServiceAttributesResponse {}
export type ErrorMessage = string;
export type CreateHttpNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceAlreadyExists
  | ResourceLimitExceeded
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an HTTP namespace. Service instances registered using an HTTP namespace can be
 * discovered using a `DiscoverInstances` request but can't be discovered using
 * DNS.
 *
 * For the current quota on the number of namespaces that you can create using the same Amazon Web Services account, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 */
export const createHttpNamespace: API.OperationMethod<
  CreateHttpNamespaceRequest,
  CreateHttpNamespaceResponse,
  CreateHttpNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      CreatorRequestId: D.m({ idempotency: true }),
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    DuplicateRequest,
    InvalidInput,
    NamespaceAlreadyExists,
    ResourceLimitExceeded,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHttpNamespace",
})) as any;

export type CreatePrivateDnsNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceAlreadyExists
  | ResourceLimitExceeded
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a private namespace based on DNS, which is visible only inside a specified Amazon
 * VPC. The namespace defines your service naming scheme. For example, if you name your namespace
 * `example.com` and name your service `backend`, the resulting DNS name for
 * the service is `backend.example.com`. Service instances that are registered using a
 * private DNS namespace can be discovered using either a `DiscoverInstances` request or
 * using DNS. For the current quota on the number of namespaces that you can create using the same
 * Amazon Web Services account, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 */
export const createPrivateDnsNamespace: API.OperationMethod<
  CreatePrivateDnsNamespaceRequest,
  CreatePrivateDnsNamespaceResponse,
  CreatePrivateDnsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      CreatorRequestId: D.m({ idempotency: true }),
      Description: 0,
      Vpc: 0,
      Tags: D.list(i_Tag),
      Properties: { DnsProperties: { SOA: i_SOA } },
    },
  },
  errors: [
    DuplicateRequest,
    InvalidInput,
    NamespaceAlreadyExists,
    ResourceLimitExceeded,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateDnsNamespace",
})) as any;

export type CreatePublicDnsNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceAlreadyExists
  | ResourceLimitExceeded
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a public namespace based on DNS, which is visible on the internet. The namespace
 * defines your service naming scheme. For example, if you name your namespace
 * `example.com` and name your service `backend`, the resulting DNS name for
 * the service is `backend.example.com`. You can discover instances that were registered
 * with a public DNS namespace by using either a `DiscoverInstances` request or using
 * DNS. For the current quota on the number of namespaces that you can create using the same Amazon Web Services account, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 *
 * The `CreatePublicDnsNamespace` API operation is not supported in the Amazon Web Services GovCloud (US) Regions.
 */
export const createPublicDnsNamespace: API.OperationMethod<
  CreatePublicDnsNamespaceRequest,
  CreatePublicDnsNamespaceResponse,
  CreatePublicDnsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      CreatorRequestId: D.m({ idempotency: true }),
      Description: 0,
      Tags: D.list(i_Tag),
      Properties: { DnsProperties: { SOA: i_SOA } },
    },
  },
  errors: [
    DuplicateRequest,
    InvalidInput,
    NamespaceAlreadyExists,
    ResourceLimitExceeded,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublicDnsNamespace",
})) as any;

export type CreateServiceError =
  | InvalidInput
  | NamespaceNotFound
  | ResourceLimitExceeded
  | ServiceAlreadyExists
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a service. This action defines the configuration for the following entities:
 *
 * - For public and private DNS namespaces, one of the following combinations of DNS records in
 * Amazon Route 53:
 *
 * - `A`
 *
 * - `AAAA`
 *
 * - `A` and `AAAA`
 *
 * - `SRV`
 *
 * - `CNAME`
 *
 * - Optionally, a health check
 *
 * After you create the service, you can submit a RegisterInstance request, and
 * Cloud Map uses the values in the configuration to create the specified entities.
 *
 * For the current quota on the number of instances that you can register using the same
 * namespace and using the same service, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
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
      Name: 0,
      NamespaceId: 0,
      CreatorRequestId: D.m({ idempotency: true }),
      Description: 0,
      DnsConfig: {
        NamespaceId: 0,
        RoutingPolicy: 0,
        DnsRecords: D.list(i_DnsRecord),
      },
      HealthCheckConfig: i_HealthCheckConfig,
      HealthCheckCustomConfig: { FailureThreshold: 0 },
      Tags: D.list(i_Tag),
      Type: 0,
    },
    output: { Service: o_Service },
  },
  errors: [
    InvalidInput,
    NamespaceNotFound,
    ResourceLimitExceeded,
    ServiceAlreadyExists,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
})) as any;

export type DeleteNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceNotFound
  | ResourceInUse
  | CommonErrors;
/**
 * Deletes a namespace from the current account. If the namespace still contains one or more
 * services, the request fails.
 */
export const deleteNamespace: API.OperationMethod<
  DeleteNamespaceRequest,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0 } },
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
})) as any;

export type DeleteServiceError =
  | InvalidInput
  | ResourceInUse
  | ServiceNotFound
  | CommonErrors;
/**
 * Deletes a specified service and all associated service attributes. If the service still
 * contains one or more registered instances, the request fails.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0 } },
  errors: [InvalidInput, ResourceInUse, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
})) as any;

export type DeleteServiceAttributesError =
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Deletes specific attributes associated with a service.
 */
export const deleteServiceAttributes: API.OperationMethod<
  DeleteServiceAttributesRequest,
  DeleteServiceAttributesResponse,
  DeleteServiceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceId: 0, Attributes: 0 } },
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceAttributes",
})) as any;

export type DeregisterInstanceError =
  | DuplicateRequest
  | InstanceNotFound
  | InvalidInput
  | ResourceInUse
  | ServiceNotFound
  | CommonErrors;
/**
 * Deletes the Amazon Route 53 DNS records and health check, if any, that Cloud Map created for the
 * specified instance.
 */
export const deregisterInstance: API.OperationMethod<
  DeregisterInstanceRequest,
  DeregisterInstanceResponse,
  DeregisterInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceId: 0, InstanceId: 0 } },
  errors: [
    DuplicateRequest,
    InstanceNotFound,
    InvalidInput,
    ResourceInUse,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterInstance",
})) as any;

export type DiscoverInstancesError =
  | InvalidInput
  | NamespaceNotFound
  | RequestLimitExceeded
  | ServiceNotFound
  | CommonErrors;
/**
 * Discovers registered instances for a specified namespace and service. You can use
 * `DiscoverInstances` to discover instances for any type of namespace.
 * `DiscoverInstances` returns a randomized list of instances allowing customers to
 * distribute traffic evenly across instances. For public and private DNS namespaces, you can also
 * use DNS queries to discover instances.
 */
export const discoverInstances: API.OperationMethod<
  DiscoverInstancesRequest,
  DiscoverInstancesResponse,
  DiscoverInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NamespaceName: 0,
      ServiceName: 0,
      MaxResults: 0,
      QueryParameters: 0,
      OptionalParameters: 0,
      HealthStatus: 0,
      OwnerAccount: 0,
    },
  },
  errors: [
    InvalidInput,
    NamespaceNotFound,
    RequestLimitExceeded,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInstances",
  endpointHostPrefix: "data-",
})) as any;

export type DiscoverInstancesRevisionError =
  | InvalidInput
  | NamespaceNotFound
  | RequestLimitExceeded
  | ServiceNotFound
  | CommonErrors;
/**
 * Discovers the increasing revision associated with an instance.
 */
export const discoverInstancesRevision: API.OperationMethod<
  DiscoverInstancesRevisionRequest,
  DiscoverInstancesRevisionResponse,
  DiscoverInstancesRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamespaceName: 0, ServiceName: 0, OwnerAccount: 0 },
  },
  errors: [
    InvalidInput,
    NamespaceNotFound,
    RequestLimitExceeded,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInstancesRevision",
  endpointHostPrefix: "data-",
})) as any;

export type GetInstanceError =
  | InstanceNotFound
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Gets information about a specified instance.
 */
export const getInstance: API.OperationMethod<
  GetInstanceRequest,
  GetInstanceResponse,
  GetInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceId: 0, InstanceId: 0 } },
  errors: [InstanceNotFound, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstance",
})) as any;

export type GetInstancesHealthStatusError =
  | InstanceNotFound
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Gets the current health status (`Healthy`, `Unhealthy`, or
 * `Unknown`) of one or more instances that are associated with a specified
 * service.
 *
 * There's a brief delay between when you register an instance and when the health status for
 * the instance is available.
 */
export const getInstancesHealthStatus: API.PaginatedOperationMethod<
  GetInstancesHealthStatusRequest,
  GetInstancesHealthStatusResponse,
  GetInstancesHealthStatusError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ServiceId: 0, Instances: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [InstanceNotFound, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstancesHealthStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetNamespaceError = InvalidInput | NamespaceNotFound | CommonErrors;
/**
 * Gets information about a namespace.
 */
export const getNamespace: API.OperationMethod<
  GetNamespaceRequest,
  GetNamespaceResponse,
  GetNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Id: 0 },
    output: { Namespace: { CreateDate: D.ts } },
  },
  errors: [InvalidInput, NamespaceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamespace",
})) as any;

export type GetOperationError = InvalidInput | OperationNotFound | CommonErrors;
/**
 * Gets information about any operation that returns an operation ID in the response, such as a
 * `CreateHttpNamespace` request.
 *
 * To get a list of operations that match specified criteria, see ListOperations.
 */
export const getOperation: API.OperationMethod<
  GetOperationRequest,
  GetOperationResponse,
  GetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OperationId: 0, OwnerAccount: 0 },
    output: { Operation: { CreateDate: D.ts, UpdateDate: D.ts } },
  },
  errors: [InvalidInput, OperationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperation",
})) as any;

export type GetServiceError = InvalidInput | ServiceNotFound | CommonErrors;
/**
 * Gets the settings for a specified service.
 */
export const getService: API.OperationMethod<
  GetServiceRequest,
  GetServiceResponse,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Id: 0 },
    output: { Service: o_Service },
  },
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
})) as any;

export type GetServiceAttributesError =
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Returns the attributes associated with a specified service.
 */
export const getServiceAttributes: API.OperationMethod<
  GetServiceAttributesRequest,
  GetServiceAttributesResponse,
  GetServiceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceId: 0 } },
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceAttributes",
})) as any;

export type ListInstancesError = InvalidInput | ServiceNotFound | CommonErrors;
/**
 * Lists summary information about the instances that you registered by using a specified
 * service.
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ServiceId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNamespacesError = InvalidInput | CommonErrors;
/**
 * Lists summary information about the namespaces that were created by the current Amazon Web Services account and shared with the current Amazon Web Services account.
 */
export const listNamespaces: API.PaginatedOperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      Filters: D.list({ Name: 0, Values: 0, Condition: 0 }),
    },
    output: { Namespaces: D.list({ CreateDate: D.ts }) },
  },
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamespaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOperationsError = InvalidInput | CommonErrors;
/**
 * Lists operations that match the criteria that you specify.
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
    input: {
      NextToken: 0,
      MaxResults: 0,
      Filters: D.list({ Name: 0, Values: 0, Condition: 0 }),
    },
  },
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError = InvalidInput | CommonErrors;
/**
 * Lists summary information for all the services that are associated with one or more
 * namespaces.
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
    input: {
      NextToken: 0,
      MaxResults: 0,
      Filters: D.list({ Name: 0, Values: 0, Condition: 0 }),
    },
    output: { Services: D.list({ CreateDate: D.ts }) },
  },
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidInput
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [InvalidInput, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RegisterInstanceError =
  | DuplicateRequest
  | InvalidInput
  | ResourceInUse
  | ResourceLimitExceeded
  | ServiceNotFound
  | CommonErrors;
/**
 * Creates or updates one or more records and, optionally, creates a health check based on the
 * settings in a specified service. When you submit a `RegisterInstance` request, the
 * following occurs:
 *
 * - For each DNS record that you define in the service that's specified by
 * `ServiceId`, a record is created or updated in the hosted zone that's associated
 * with the corresponding namespace.
 *
 * - If the service includes `HealthCheckConfig`, a health check is created based on
 * the settings in the health check configuration.
 *
 * - The health check, if any, is associated with each of the new or updated records.
 *
 * One `RegisterInstance` request must complete before you can submit another
 * request and specify the same service ID and instance ID.
 *
 * For more information, see CreateService.
 *
 * When Cloud Map receives a DNS query for the specified DNS name, it returns the applicable
 * value:
 *
 * - **If the health check is healthy**: returns all the
 * records
 *
 * - **If the health check is unhealthy**: returns the applicable
 * value for the last healthy instance
 *
 * - **If you didn't specify a health check configuration**:
 * returns all the records
 *
 * For the current quota on the number of instances that you can register using the same
 * namespace and using the same service, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 */
export const registerInstance: API.OperationMethod<
  RegisterInstanceRequest,
  RegisterInstanceResponse,
  RegisterInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceId: 0,
      InstanceId: 0,
      CreatorRequestId: D.m({ idempotency: true }),
      Attributes: 0,
    },
  },
  errors: [
    DuplicateRequest,
    InvalidInput,
    ResourceInUse,
    ResourceLimitExceeded,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterInstance",
})) as any;

export type TagResourceError =
  | InvalidInput
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [InvalidInput, ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InvalidInput
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [InvalidInput, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateHttpNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceNotFound
  | ResourceInUse
  | CommonErrors;
/**
 * Updates an HTTP
 * namespace.
 */
export const updateHttpNamespace: API.OperationMethod<
  UpdateHttpNamespaceRequest,
  UpdateHttpNamespaceResponse,
  UpdateHttpNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      UpdaterRequestId: D.m({ idempotency: true }),
      Namespace: { Description: 0 },
    },
  },
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHttpNamespace",
})) as any;

export type UpdateInstanceCustomHealthStatusError =
  | CustomHealthNotFound
  | InstanceNotFound
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Submits a request to change the health status of a custom health check to healthy or
 * unhealthy.
 *
 * You can use `UpdateInstanceCustomHealthStatus` to change the status only for
 * custom health checks, which you define using `HealthCheckCustomConfig` when you create
 * a service. You can't use it to change the status for Route 53 health checks, which you define using
 * `HealthCheckConfig`.
 *
 * For more information, see HealthCheckCustomConfig.
 */
export const updateInstanceCustomHealthStatus: API.OperationMethod<
  UpdateInstanceCustomHealthStatusRequest,
  UpdateInstanceCustomHealthStatusResponse,
  UpdateInstanceCustomHealthStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceId: 0, InstanceId: 0, Status: 0 },
  },
  errors: [
    CustomHealthNotFound,
    InstanceNotFound,
    InvalidInput,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceCustomHealthStatus",
})) as any;

export type UpdatePrivateDnsNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceNotFound
  | ResourceInUse
  | CommonErrors;
/**
 * Updates a private DNS
 * namespace.
 */
export const updatePrivateDnsNamespace: API.OperationMethod<
  UpdatePrivateDnsNamespaceRequest,
  UpdatePrivateDnsNamespaceResponse,
  UpdatePrivateDnsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      UpdaterRequestId: D.m({ idempotency: true }),
      Namespace: {
        Description: 0,
        Properties: { DnsProperties: { SOA: i_SOAChange } },
      },
    },
  },
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePrivateDnsNamespace",
})) as any;

export type UpdatePublicDnsNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceNotFound
  | ResourceInUse
  | CommonErrors;
/**
 * Updates a public DNS namespace.
 */
export const updatePublicDnsNamespace: API.OperationMethod<
  UpdatePublicDnsNamespaceRequest,
  UpdatePublicDnsNamespaceResponse,
  UpdatePublicDnsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      UpdaterRequestId: D.m({ idempotency: true }),
      Namespace: {
        Description: 0,
        Properties: { DnsProperties: { SOA: i_SOAChange } },
      },
    },
  },
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublicDnsNamespace",
})) as any;

export type UpdateServiceError =
  | DuplicateRequest
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Submits a request to perform the following operations:
 *
 * - Update the TTL setting for existing `DnsRecords` configurations
 *
 * - Add, update, or delete `HealthCheckConfig` for a specified service
 *
 * You can't add, update, or delete a `HealthCheckCustomConfig`
 * configuration.
 *
 * For public and private DNS namespaces, note the following:
 *
 * - If you omit any existing `DnsRecords` or `HealthCheckConfig`
 * configurations from an `UpdateService` request, the configurations are deleted from
 * the service.
 *
 * - If you omit an existing `HealthCheckCustomConfig` configuration from an
 * `UpdateService` request, the configuration isn't deleted from the service.
 *
 * You can't call `UpdateService` and update settings in the following
 * scenarios:
 *
 * - When the service is associated with an HTTP namespace
 *
 * - When the service is associated with a shared namespace and contains instances that were
 * registered by Amazon Web Services accounts other than the account making the `UpdateService`
 * call
 *
 * When you update settings for a service, Cloud Map also updates the corresponding settings
 * in all the records and health checks that were created by using the specified service.
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
      Id: 0,
      Service: {
        Description: 0,
        DnsConfig: { DnsRecords: D.list(i_DnsRecord) },
        HealthCheckConfig: i_HealthCheckConfig,
      },
    },
  },
  errors: [DuplicateRequest, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
})) as any;

export type UpdateServiceAttributesError =
  | InvalidInput
  | ServiceAttributesLimitExceededException
  | ServiceNotFound
  | CommonErrors;
/**
 * Submits a request to update a specified service to add service-level attributes.
 */
export const updateServiceAttributes: API.OperationMethod<
  UpdateServiceAttributesRequest,
  UpdateServiceAttributesResponse,
  UpdateServiceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceId: 0, Attributes: 0 } },
  errors: [
    InvalidInput,
    ServiceAttributesLimitExceededException,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceAttributes",
})) as any;

const i_DnsRecord: D.LazyStruct = () => ({ Type: 0, TTL: 0 });
const i_HealthCheckConfig: D.LazyStruct = () => ({
  Type: 0,
  ResourcePath: 0,
  FailureThreshold: 0,
});
const i_SOA: D.LazyStruct = () => ({ TTL: 0 });
const i_SOAChange: D.LazyStruct = () => ({ TTL: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Service: D.LazyStruct = () => ({ CreateDate: D.ts });
