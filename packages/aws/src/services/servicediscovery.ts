import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ServiceDiscovery",
  serviceShapeName: "Route53AutoNaming_v20170314",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "servicediscovery" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-03-14");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicediscovery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://servicediscovery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://servicediscovery.{R}.{D}","properties":{},"headers":{}}');

export class CustomHealthNotFound
  extends /*@__PURE__*/ S.TaggedError<CustomHealthNotFound>()(
    "CustomHealthNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class DuplicateRequest
  extends /*@__PURE__*/ S.TaggedError<DuplicateRequest>()(
    "DuplicateRequest",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      DuplicateOperationId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InstanceNotFound
  extends /*@__PURE__*/ S.TaggedError<InstanceNotFound>()(
    "InstanceNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class InvalidInput
  extends /*@__PURE__*/ S.TaggedError<InvalidInput>()(
    "InvalidInput",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NamespaceAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<NamespaceAlreadyExists>()(
    "NamespaceAlreadyExists",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      CreatorRequestId: /*@__PURE__*/ S.optional(S.String),
      NamespaceId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class NamespaceNotFound
  extends /*@__PURE__*/ S.TaggedError<NamespaceNotFound>()(
    "NamespaceNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OperationNotFound
  extends /*@__PURE__*/ S.TaggedError<OperationNotFound>()(
    "OperationNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceeded>()(
    "RequestLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceInUse
  extends /*@__PURE__*/ S.TaggedError<ResourceInUse>()(
    "ResourceInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class ResourceLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceeded>()(
    "ResourceLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ServiceAlreadyExists>()(
    "ServiceAlreadyExists",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      CreatorRequestId: /*@__PURE__*/ S.optional(S.String),
      ServiceId: /*@__PURE__*/ S.optional(S.String),
      ServiceArn: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ServiceAttributesLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceAttributesLimitExceededException>()(
    "ServiceAttributesLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceNotFound
  extends /*@__PURE__*/ S.TaggedError<ServiceNotFound>()(
    "ServiceNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type InstanceHealthStatusMap = { [key: string]: HealthStatus | undefined };
export interface GetInstancesHealthStatusResponse {
  Status?: { [key: string]: HealthStatus | undefined };
  NextToken?: string;
}
export interface GetNamespaceRequest {
  Id: string;
}
export type NamespaceType = "DNS_PUBLIC" | "DNS_PRIVATE" | "HTTP" | (string & {});
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
export type OperationStatus = "SUBMITTED" | "PENDING" | "SUCCESS" | "FAIL" | (string & {});
export type Message = string;
export type Code = string;
export type OperationTargetType = "NAMESPACE" | "SERVICE" | "INSTANCE" | (string & {});
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
export type NamespaceFilterName = "TYPE" | "NAME" | "HTTP_NAME" | "RESOURCE_OWNER" | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export type FilterCondition = "EQ" | "IN" | "BETWEEN" | "BEGINS_WITH" | (string & {});
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
export type ServiceFilterName = "NAMESPACE_ID" | "RESOURCE_OWNER" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateHttpNamespaceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<CreateHttpNamespaceResponse>,
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
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<CreatePrivateDnsNamespaceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<CreatePrivateDnsNamespaceResponse>,
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
}));

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
  input: __S(24, __c6, 0) as any as S.Schema<CreatePublicDnsNamespaceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<CreatePublicDnsNamespaceResponse>,
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
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<CreateServiceRequest>,
  output: __S(33, __c8, 1) as any as S.Schema<CreateServiceResponse>,
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
}));

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
  input: __S(44, __c11, 0) as any as S.Schema<DeleteNamespaceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<DeleteNamespaceResponse>,
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
}));

export type DeleteServiceError = InvalidInput | ResourceInUse | ServiceNotFound | CommonErrors;
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
  input: __S(48, __c12, 0) as any as S.Schema<DeleteServiceRequest>,
  output: __S(52, __c13, 0) as any as S.Schema<DeleteServiceResponse>,
  errors: [InvalidInput, ResourceInUse, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
}));

export type DeleteServiceAttributesError = InvalidInput | ServiceNotFound | CommonErrors;
/**
 * Deletes specific attributes associated with a service.
 */
export const deleteServiceAttributes: API.OperationMethod<
  DeleteServiceAttributesRequest,
  DeleteServiceAttributesResponse,
  DeleteServiceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<DeleteServiceAttributesRequest>,
  output: __S(52, __c13, 0) as any as S.Schema<DeleteServiceAttributesResponse>,
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceAttributes",
}));

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
  input: __S(64, __c16, 0) as any as S.Schema<DeregisterInstanceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<DeregisterInstanceResponse>,
  errors: [DuplicateRequest, InstanceNotFound, InvalidInput, ResourceInUse, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterInstance",
}));

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
  input: __S(68, __c17, 0) as any as S.Schema<DiscoverInstancesRequest>,
  output: __S(71, __c17, 3) as any as S.Schema<DiscoverInstancesResponse>,
  errors: [InvalidInput, NamespaceNotFound, RequestLimitExceeded, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInstances",
  endpointHostPrefix: "data-",
}));

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
  input: __S(76, __c19, 0) as any as S.Schema<DiscoverInstancesRevisionRequest>,
  output: __S(77, __c19, 1) as any as S.Schema<DiscoverInstancesRevisionResponse>,
  errors: [InvalidInput, NamespaceNotFound, RequestLimitExceeded, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInstancesRevision",
  endpointHostPrefix: "data-",
}));

export type GetInstanceError = InstanceNotFound | InvalidInput | ServiceNotFound | CommonErrors;
/**
 * Gets information about a specified instance.
 */
export const getInstance: API.OperationMethod<
  GetInstanceRequest,
  GetInstanceResponse,
  GetInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c20, 0) as any as S.Schema<GetInstanceRequest>,
  output: __S(82, __c20, 2) as any as S.Schema<GetInstanceResponse>,
  errors: [InstanceNotFound, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstance",
}));

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
  input: __S(85, __c21, 1) as any as S.Schema<GetInstancesHealthStatusRequest>,
  output: __S(87, __c21, 3) as any as S.Schema<GetInstancesHealthStatusResponse>,
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
  input: __S(88, __c22, 0) as any as S.Schema<GetNamespaceRequest>,
  output: __S(90, __c22, 2) as any as S.Schema<GetNamespaceResponse>,
  errors: [InvalidInput, NamespaceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamespace",
}));

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
  input: __S(96, __c24, 0) as any as S.Schema<GetOperationRequest>,
  output: __S(99, __c24, 3) as any as S.Schema<GetOperationResponse>,
  errors: [InvalidInput, OperationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperation",
}));

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
  input: __S(100, __c25, 0) as any as S.Schema<GetServiceRequest>,
  output: __S(33, __c8, 1) as any as S.Schema<GetServiceResponse>,
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
}));

export type GetServiceAttributesError = InvalidInput | ServiceNotFound | CommonErrors;
/**
 * Returns the attributes associated with a specified service.
 */
export const getServiceAttributes: API.OperationMethod<
  GetServiceAttributesRequest,
  GetServiceAttributesResponse,
  GetServiceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c26, 0) as any as S.Schema<GetServiceAttributesRequest>,
  output: __S(106, __c26, 2) as any as S.Schema<GetServiceAttributesResponse>,
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceAttributes",
}));

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
  input: __S(108, __c27, 0) as any as S.Schema<ListInstancesRequest>,
  output: __S(111, __c27, 3) as any as S.Schema<ListInstancesResponse>,
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
  input: __S(112, __c28, 0) as any as S.Schema<ListNamespacesRequest>,
  output: __S(115, __c28, 3) as any as S.Schema<ListNamespacesResponse>,
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
  input: __S(120, __c30, 0) as any as S.Schema<ListOperationsRequest>,
  output: __S(123, __c30, 3) as any as S.Schema<ListOperationsResponse>,
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
  input: __S(124, __c31, 0) as any as S.Schema<ListServicesRequest>,
  output: __S(127, __c31, 3) as any as S.Schema<ListServicesResponse>,
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

export type ListTagsForResourceError = InvalidInput | ResourceNotFoundException | CommonErrors;
/**
 * Lists tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c32, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(129, __c32, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InvalidInput, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(132, __c33, 0) as any as S.Schema<RegisterInstanceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<RegisterInstanceResponse>,
  errors: [DuplicateRequest, InvalidInput, ResourceInUse, ResourceLimitExceeded, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterInstance",
}));

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
  input: __S(136, __c34, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(52, __c13, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InvalidInput, ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = InvalidInput | ResourceNotFoundException | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(140, __c35, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(52, __c13, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InvalidInput, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(145, __c36, 1) as any as S.Schema<UpdateHttpNamespaceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<UpdateHttpNamespaceResponse>,
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHttpNamespace",
}));

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
  input: __S(148, __c37, 0) as any as S.Schema<UpdateInstanceCustomHealthStatusRequest>,
  output: __S(52, __c13, 0) as any as S.Schema<UpdateInstanceCustomHealthStatusResponse>,
  errors: [CustomHealthNotFound, InstanceNotFound, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceCustomHealthStatus",
}));

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
  input: __S(152, __c38, 0) as any as S.Schema<UpdatePrivateDnsNamespaceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<UpdatePrivateDnsNamespaceResponse>,
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePrivateDnsNamespace",
}));

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
  input: __S(160, __c40, 0) as any as S.Schema<UpdatePublicDnsNamespaceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<UpdatePublicDnsNamespaceResponse>,
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublicDnsNamespace",
}));

export type UpdateServiceError = DuplicateRequest | InvalidInput | ServiceNotFound | CommonErrors;
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
  input: __S(166, __c41, 2) as any as S.Schema<UpdateServiceRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<UpdateServiceResponse>,
  errors: [DuplicateRequest, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
}));

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
  input: __S(168, __c42, 0) as any as S.Schema<UpdateServiceAttributesRequest>,
  output: __S(52, __c13, 0) as any as S.Schema<UpdateServiceAttributesResponse>,
  errors: [InvalidInput, ServiceAttributesLimitExceededException, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceAttributes",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Description: S.optional(S.String),
          Tags: S.optional(__S(5, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateHttpNamespaceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(4, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OperationId: S.optional(S.String) })).annotate({
        identifier: "CreateHttpNamespaceResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Description: S.optional(S.String),
          Vpc: S.String,
          Tags: S.optional(__S(5, __c1, 1)),
          Properties: S.optional(__S(17, __c4, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePrivateDnsNamespaceRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SOA: __S(20, __c5, 0) })).annotate({
        identifier: "PrivateDnsPropertiesMutable",
      });
    case 1:
      return S.suspend(() => S.Struct({ DnsProperties: __S(16, __c4, 0) })).annotate({
        identifier: "PrivateDnsNamespaceProperties",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TTL: S.optional(S.Number) })).annotate({
        identifier: "SOA",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Description: S.optional(S.String),
          Tags: S.optional(__S(5, __c1, 1)),
          Properties: S.optional(__S(17, __c4, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePublicDnsNamespaceRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          NamespaceId: S.optional(S.String),
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Description: S.optional(S.String),
          DnsConfig: S.optional(__S(36, __c9, 0)),
          HealthCheckConfig: S.optional(__S(42, __c10, 2)),
          HealthCheckCustomConfig: S.optional(__S(37, __c9, 1)),
          Tags: S.optional(__S(5, __c1, 1)),
          Type: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          Name: S.optional(S.String),
          NamespaceId: S.optional(S.String),
          Description: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          DnsConfig: S.optional(__S(36, __c9, 0)),
          Type: S.optional(S.String),
          HealthCheckConfig: S.optional(__S(42, __c10, 2)),
          HealthCheckCustomConfig: S.optional(__S(37, __c9, 1)),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatorRequestId: S.optional(S.String),
          CreatedByAccount: S.optional(S.String),
        }),
      ).annotate({ identifier: "Service" });
    case 1:
      return S.suspend(() => S.Struct({ Service: S.optional(__S(32, __c8, 0)) })).annotate({
        identifier: "CreateServiceResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamespaceId: S.optional(S.String),
          RoutingPolicy: S.optional(S.String),
          DnsRecords: S.optional(__S(41, __c10, 1)),
        }),
      ).annotate({ identifier: "DnsConfig" });
    case 1:
      return S.suspend(() => S.Struct({ FailureThreshold: S.optional(S.Number) })).annotate({
        identifier: "HealthCheckCustomConfig",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, TTL: S.Number })).annotate({
        identifier: "DnsRecord",
      });
    case 1:
      return S.Array(__S(40, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          ResourcePath: S.optional(S.String),
          FailureThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "HealthCheckConfig" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteNamespaceRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteServiceResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceId: S.String, Attributes: __S(60, __c15, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceAttributesRequest" });
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
        S.Struct({ ServiceId: S.String, InstanceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterInstanceRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamespaceName: S.String,
          ServiceName: S.String,
          MaxResults: S.optional(S.Number),
          QueryParameters: S.optional(__S(72, __c18, 0)),
          OptionalParameters: S.optional(__S(72, __c18, 0)),
          HealthStatus: S.optional(S.String),
          OwnerAccount: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DiscoverInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          NamespaceName: S.optional(S.String),
          ServiceName: S.optional(S.String),
          HealthStatus: S.optional(S.String),
          Attributes: S.optional(__S(72, __c18, 0)),
        }),
      ).annotate({ identifier: "HttpInstanceSummary" });
    case 2:
      return S.Array(__S(69, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Instances: S.optional(__S(70, __c17, 2)),
          InstancesRevision: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DiscoverInstancesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamespaceName: S.String,
          ServiceName: S.String,
          OwnerAccount: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DiscoverInstancesRevisionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ InstancesRevision: S.optional(S.Number) })).annotate({
        identifier: "DiscoverInstancesRevisionResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceId: S.String, InstanceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          CreatorRequestId: S.optional(S.String),
          Attributes: S.optional(__S(72, __c18, 0)),
          CreatedByAccount: S.optional(S.String),
        }),
      ).annotate({ identifier: "Instance" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ResourceOwner: S.optional(S.String), Instance: S.optional(__S(81, __c20, 1)) }),
      ).annotate({ identifier: "GetInstanceResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("InstanceId")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceId: S.String,
          Instances: S.optional(__S(84, __c21, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetInstancesHealthStatusRequest" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(__S(86, __c21, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetInstancesHealthStatusResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetNamespaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          ServiceCount: S.optional(S.Number),
          Properties: S.optional(__S(94, __c23, 2)),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatorRequestId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Namespace" });
    case 2:
      return S.suspend(() => S.Struct({ Namespace: S.optional(__S(89, __c22, 1)) })).annotate({
        identifier: "GetNamespaceResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HostedZoneId: S.optional(S.String), SOA: S.optional(__S(20, __c5, 0)) }),
      ).annotate({ identifier: "DnsProperties" });
    case 1:
      return S.suspend(() => S.Struct({ HttpName: S.optional(S.String) })).annotate({
        identifier: "HttpProperties",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DnsProperties: S.optional(__S(92, __c23, 0)),
          HttpProperties: S.optional(__S(93, __c23, 1)),
        }),
      ).annotate({ identifier: "NamespaceProperties" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OperationId: S.String, OwnerAccount: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOperationRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          OwnerAccount: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Targets: S.optional(__S(97, __c24, 1)),
        }),
      ).annotate({ identifier: "Operation" });
    case 3:
      return S.suspend(() => S.Struct({ Operation: S.optional(__S(98, __c24, 2)) })).annotate({
        identifier: "GetOperationResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceArn: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          Attributes: S.optional(__S(72, __c18, 0)),
        }),
      ).annotate({ identifier: "ServiceAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ServiceAttributes: S.optional(__S(105, __c26, 1)) }),
      ).annotate({ identifier: "GetServiceAttributesResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Attributes: S.optional(__S(72, __c18, 0)),
          CreatedByAccount: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(109, __c27, 1)
          .pipe(/*@__PURE__*/ T.XmlName("InstanceSummary"))
          .annotate({ identifier: "InstanceSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceOwner: S.optional(S.String),
          Instances: S.optional(__S(110, __c27, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListInstancesResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(118, __c29, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNamespacesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          ServiceCount: S.optional(S.Number),
          Properties: S.optional(__S(94, __c23, 2)),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "NamespaceSummary" });
    case 2:
      return S.Array(__S(113, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Namespaces: S.optional(__S(114, __c28, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNamespacesResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("item")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Values: __S(116, __c29, 0), Condition: S.optional(S.String) }),
      ).annotate({ identifier: "NamespaceFilter" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(117, __c29, 1)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "NamespaceFilter" }),
      );
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(118, __c29, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOperationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "OperationSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(121, __c30, 1)
          .pipe(/*@__PURE__*/ T.XmlName("OperationSummary"))
          .annotate({ identifier: "OperationSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ Operations: S.optional(__S(122, __c30, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOperationsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(118, __c29, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          DnsConfig: S.optional(__S(36, __c9, 0)),
          HealthCheckConfig: S.optional(__S(42, __c10, 2)),
          HealthCheckCustomConfig: S.optional(__S(37, __c9, 1)),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedByAccount: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceSummary" });
    case 2:
      return S.Array(__S(125, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Services: S.optional(__S(126, __c31, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServicesResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(5, __c1, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceId: S.String,
          InstanceId: S.String,
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Attributes: __S(72, __c18, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterInstanceRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(5, __c1, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(60, __c15, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Description: S.String })).annotate({
        identifier: "HttpNamespaceChange",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          UpdaterRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Namespace: __S(144, __c36, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateHttpNamespaceRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceId: S.String, InstanceId: S.String, Status: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateInstanceCustomHealthStatusRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          UpdaterRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Namespace: __S(159, __c39, 3),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePrivateDnsNamespaceRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TTL: S.Number })).annotate({ identifier: "SOAChange" });
    case 1:
      return S.suspend(() => S.Struct({ SOA: __S(156, __c39, 0) })).annotate({
        identifier: "PrivateDnsPropertiesMutableChange",
      });
    case 2:
      return S.suspend(() => S.Struct({ DnsProperties: __S(157, __c39, 1) })).annotate({
        identifier: "PrivateDnsNamespacePropertiesChange",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ Description: S.optional(S.String), Properties: S.optional(__S(158, __c39, 2)) }),
      ).annotate({ identifier: "PrivateDnsNamespaceChange" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          UpdaterRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Namespace: __S(159, __c39, 3),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePublicDnsNamespaceRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DnsRecords: __S(41, __c10, 1) })).annotate({
        identifier: "DnsConfigChange",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DnsConfig: S.optional(__S(164, __c41, 0)),
          HealthCheckConfig: S.optional(__S(42, __c10, 2)),
        }),
      ).annotate({ identifier: "ServiceChange" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Id: S.String, Service: __S(165, __c41, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateServiceRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceId: S.String, Attributes: __S(72, __c18, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateServiceAttributesRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
