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
  sdkId: "License Manager User Subscriptions",
  serviceShapeName: "LicenseManagerUserSubscriptions",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "license-manager-user-subscriptions" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
              `https://license-manager-user-subscriptions-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://license-manager-user-subscriptions-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://license-manager-user-subscriptions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://license-manager-user-subscriptions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://license-manager-user-subscriptions.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type Directory = string;
export type IpV4 = string;
export type IpV4List = string[];
export type IpV6 = string;
export type IpV6List = string[];
export interface SecretsManagerCredentialsProvider {
  SecretId?: string;
}
export type CredentialsProvider = {
  SecretsManagerCredentialsProvider: SecretsManagerCredentialsProvider;
};
export type Subnet = string;
export type Subnets = string[];
export interface DomainNetworkSettings {
  Subnets: string[];
}
export interface ActiveDirectorySettings {
  DomainName?: string;
  DomainIpv4List?: string[];
  DomainIpv6List?: string[];
  DomainCredentialsProvider?: CredentialsProvider;
  DomainNetworkSettings?: DomainNetworkSettings;
}
export type ActiveDirectoryType = string;
export interface ActiveDirectoryIdentityProvider {
  DirectoryId?: string;
  ActiveDirectorySettings?: ActiveDirectorySettings;
  ActiveDirectoryType?: string;
  IsSharedActiveDirectory?: boolean;
}
export type IdentityProvider = { ActiveDirectoryIdentityProvider: ActiveDirectoryIdentityProvider };
export type Tags = { [key: string]: string | undefined };
export interface AssociateUserRequest {
  Username: string;
  InstanceId: string;
  IdentityProvider: IdentityProvider;
  Domain?: string;
  Tags?: { [key: string]: string | undefined };
}
export type Arn = string;
export interface InstanceUserSummary {
  Username: string;
  InstanceId: string;
  IdentityProvider: IdentityProvider;
  Status: string;
  InstanceUserArn?: string;
  StatusMessage?: string;
  Domain?: string;
  AssociationDate?: string;
  DisassociationDate?: string;
}
export interface AssociateUserResponse {
  InstanceUserSummary: InstanceUserSummary;
}
export type ServerType = string;
export interface RdsSalSettings {
  RdsSalCredentialsProvider: CredentialsProvider;
}
export type ServerSettings = { RdsSalSettings: RdsSalSettings };
export interface LicenseServerSettings {
  ServerType: string;
  ServerSettings: ServerSettings;
}
export interface CreateLicenseServerEndpointRequest {
  IdentityProviderArn: string;
  LicenseServerSettings: LicenseServerSettings;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateLicenseServerEndpointResponse {
  IdentityProviderArn?: string;
  LicenseServerEndpointArn?: string;
}
export interface DeleteLicenseServerEndpointRequest {
  LicenseServerEndpointArn: string;
  ServerType: string;
}
export interface ServerEndpoint {
  Endpoint?: string;
}
export type LicenseServerEndpointId = string;
export type LicenseServerEndpointProvisioningStatus = string;
export type LicenseServerHealthStatus = string;
export interface LicenseServer {
  ProvisioningStatus?: string;
  HealthStatus?: string;
  Ipv4Address?: string;
  Ipv6Address?: string;
}
export type LicenseServerList = LicenseServer[];
export interface LicenseServerEndpoint {
  IdentityProviderArn?: string;
  ServerType?: string;
  ServerEndpoint?: ServerEndpoint;
  StatusMessage?: string;
  LicenseServerEndpointId?: string;
  LicenseServerEndpointArn?: string;
  LicenseServerEndpointProvisioningStatus?: string;
  LicenseServers?: LicenseServer[];
  CreationTime?: Date;
}
export interface DeleteLicenseServerEndpointResponse {
  LicenseServerEndpoint?: LicenseServerEndpoint;
}
export interface DeregisterIdentityProviderRequest {
  IdentityProvider?: IdentityProvider;
  Product?: string;
  IdentityProviderArn?: string;
}
export type SecurityGroup = string;
export interface Settings {
  Subnets: string[];
  SecurityGroupId: string;
}
export interface IdentityProviderSummary {
  IdentityProvider: IdentityProvider;
  Settings: Settings;
  Product: string;
  Status: string;
  IdentityProviderArn?: string;
  FailureMessage?: string;
  OwnerAccountId?: string;
}
export interface DeregisterIdentityProviderResponse {
  IdentityProviderSummary: IdentityProviderSummary;
}
export interface DisassociateUserRequest {
  Username?: string;
  InstanceId?: string;
  IdentityProvider?: IdentityProvider;
  InstanceUserArn?: string;
  Domain?: string;
}
export interface DisassociateUserResponse {
  InstanceUserSummary: InstanceUserSummary;
}
export type BoxInteger = number;
export interface Filter {
  Attribute?: string;
  Operation?: string;
  Value?: string;
}
export type FilterList = Filter[];
export interface ListIdentityProvidersRequest {
  MaxResults?: number;
  Filters?: Filter[];
  NextToken?: string;
}
export type IdentityProviderSummaryList = IdentityProviderSummary[];
export interface ListIdentityProvidersResponse {
  IdentityProviderSummaries: IdentityProviderSummary[];
  NextToken?: string;
}
export interface ListInstancesRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type StringList = string[];
export interface InstanceSummary {
  InstanceId: string;
  Status: string;
  Products: string[];
  LastStatusCheckDate?: string;
  StatusMessage?: string;
  OwnerAccountId?: string;
  IdentityProvider?: IdentityProvider;
}
export type InstanceSummaryList = InstanceSummary[];
export interface ListInstancesResponse {
  InstanceSummaries?: InstanceSummary[];
  NextToken?: string;
}
export interface ListLicenseServerEndpointsRequest {
  MaxResults?: number;
  Filters?: Filter[];
  NextToken?: string;
}
export type LicenseServerEndpointList = LicenseServerEndpoint[];
export interface ListLicenseServerEndpointsResponse {
  LicenseServerEndpoints?: LicenseServerEndpoint[];
  NextToken?: string;
}
export interface ListProductSubscriptionsRequest {
  Product?: string;
  IdentityProvider: IdentityProvider;
  MaxResults?: number;
  Filters?: Filter[];
  NextToken?: string;
}
export interface ProductUserSummary {
  Username: string;
  Product: string;
  IdentityProvider: IdentityProvider;
  Status: string;
  ProductUserArn?: string;
  StatusMessage?: string;
  Domain?: string;
  SubscriptionStartDate?: string;
  SubscriptionEndDate?: string;
  LicenseExpirationDate?: string;
}
export type ProductUserSummaryList = ProductUserSummary[];
export interface ListProductSubscriptionsResponse {
  ProductUserSummaries?: ProductUserSummary[];
  NextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListUserAssociationsRequest {
  InstanceId: string;
  IdentityProvider: IdentityProvider;
  MaxResults?: number;
  Filters?: Filter[];
  NextToken?: string;
}
export type InstanceUserSummaryList = InstanceUserSummary[];
export interface ListUserAssociationsResponse {
  InstanceUserSummaries?: InstanceUserSummary[];
  NextToken?: string;
}
export interface RegisterIdentityProviderRequest {
  IdentityProvider: IdentityProvider;
  Product: string;
  Settings?: Settings;
  Tags?: { [key: string]: string | undefined };
}
export interface RegisterIdentityProviderResponse {
  IdentityProviderSummary: IdentityProviderSummary;
}
export interface StartProductSubscriptionRequest {
  Username: string;
  IdentityProvider: IdentityProvider;
  Product: string;
  Domain?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface StartProductSubscriptionResponse {
  ProductUserSummary: ProductUserSummary;
}
export interface StopProductSubscriptionRequest {
  Username?: string;
  IdentityProvider?: IdentityProvider;
  Product?: string;
  ProductUserArn?: string;
  Domain?: string;
}
export interface StopProductSubscriptionResponse {
  ProductUserSummary: ProductUserSummary;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateSettings {
  AddSubnets: string[];
  RemoveSubnets: string[];
  SecurityGroupId?: string;
}
export interface UpdateIdentityProviderSettingsRequest {
  IdentityProvider?: IdentityProvider;
  Product?: string;
  IdentityProviderArn?: string;
  UpdateSettings: UpdateSettings;
}
export interface UpdateIdentityProviderSettingsResponse {
  IdentityProviderSummary: IdentityProviderSummary;
}
export type AssociateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the user to an EC2 instance to utilize user-based subscriptions.
 *
 * Your estimated bill for charges on the number of users and related costs will take 48 hours to appear for billing periods that haven't closed (marked as **Pending** billing status) in Amazon Web Services Billing. For more information, see Viewing your monthly charges in the *Amazon Web Services Billing User Guide*.
 */
export const associateUser: API.OperationMethod<
  AssociateUserRequest,
  AssociateUserResponse,
  AssociateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<AssociateUserRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<AssociateUserResponse>,
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
  operationName: "AssociateUser",
}));

export type CreateLicenseServerEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a network endpoint for the Remote Desktop Services (RDS) license server.
 */
export const createLicenseServerEndpoint: API.OperationMethod<
  CreateLicenseServerEndpointRequest,
  CreateLicenseServerEndpointResponse,
  CreateLicenseServerEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(219, __c27, 3) as any as S.Schema<CreateLicenseServerEndpointRequest>,
  output: __S(220, __c27, 4) as any as S.Schema<CreateLicenseServerEndpointResponse>,
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
  operationName: "CreateLicenseServerEndpoint",
}));

export type DeleteLicenseServerEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a `LicenseServerEndpoint` resource.
 */
export const deleteLicenseServerEndpoint: API.OperationMethod<
  DeleteLicenseServerEndpointRequest,
  DeleteLicenseServerEndpointResponse,
  DeleteLicenseServerEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<DeleteLicenseServerEndpointRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<DeleteLicenseServerEndpointResponse>,
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
  operationName: "DeleteLicenseServerEndpoint",
}));

export type DeregisterIdentityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters the Active Directory identity provider from License Manager user-based subscriptions.
 */
export const deregisterIdentityProvider: API.OperationMethod<
  DeregisterIdentityProviderRequest,
  DeregisterIdentityProviderResponse,
  DeregisterIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeregisterIdentityProviderRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DeregisterIdentityProviderResponse>,
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
  operationName: "DeregisterIdentityProvider",
}));

export type DisassociateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the user from an EC2 instance providing user-based subscriptions.
 */
export const disassociateUser: API.OperationMethod<
  DisassociateUserRequest,
  DisassociateUserResponse,
  DisassociateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<DisassociateUserRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<DisassociateUserResponse>,
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
  operationName: "DisassociateUser",
}));

export type ListIdentityProvidersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Active Directory identity providers for user-based subscriptions.
 */
export const listIdentityProviders: API.PaginatedOperationMethod<
  ListIdentityProvidersRequest,
  ListIdentityProvidersResponse,
  ListIdentityProvidersError,
  Credentials | HttpClient.HttpClient,
  IdentityProviderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<ListIdentityProvidersRequest>,
  output: __S(34, __c4, 2) as any as S.Schema<ListIdentityProvidersResponse>,
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
  operationName: "ListIdentityProviders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IdentityProviderSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInstancesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the EC2 instances providing user-based subscriptions.
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | HttpClient.HttpClient,
  InstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<ListInstancesRequest>,
  output: __S(51, __c6, 3) as any as S.Schema<ListInstancesResponse>,
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
  operationName: "ListInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLicenseServerEndpointsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the Remote Desktop Services (RDS) License Server endpoints
 */
export const listLicenseServerEndpoints: API.PaginatedOperationMethod<
  ListLicenseServerEndpointsRequest,
  ListLicenseServerEndpointsResponse,
  ListLicenseServerEndpointsError,
  Credentials | HttpClient.HttpClient,
  LicenseServerEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<ListLicenseServerEndpointsRequest>,
  output: __S(58, __c7, 2) as any as S.Schema<ListLicenseServerEndpointsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseServerEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LicenseServerEndpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProductSubscriptionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the user-based subscription products available from an identity provider.
 */
export const listProductSubscriptions: API.PaginatedOperationMethod<
  ListProductSubscriptionsRequest,
  ListProductSubscriptionsResponse,
  ListProductSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  ProductUserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<ListProductSubscriptionsRequest>,
  output: __S(66, __c8, 2) as any as S.Schema<ListProductSubscriptionsResponse>,
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
  operationName: "ListProductSubscriptions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProductUserSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListUserAssociationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists user associations for an identity provider.
 */
export const listUserAssociations: API.PaginatedOperationMethod<
  ListUserAssociationsRequest,
  ListUserAssociationsResponse,
  ListUserAssociationsError,
  Credentials | HttpClient.HttpClient,
  InstanceUserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<ListUserAssociationsRequest>,
  output: __S(90, __c11, 2) as any as S.Schema<ListUserAssociationsResponse>,
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
  operationName: "ListUserAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceUserSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type RegisterIdentityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers an identity provider for user-based subscriptions.
 */
export const registerIdentityProvider: API.OperationMethod<
  RegisterIdentityProviderRequest,
  RegisterIdentityProviderResponse,
  RegisterIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<RegisterIdentityProviderRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<RegisterIdentityProviderResponse>,
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
  operationName: "RegisterIdentityProvider",
}));

export type StartProductSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a product subscription for a user with the specified identity provider.
 *
 * Your estimated bill for charges on the number of users and related costs will take 48 hours to appear for billing periods that haven't closed (marked as **Pending** billing status) in Amazon Web Services Billing. For more information, see Viewing your monthly charges in the *Amazon Web Services Billing User Guide*.
 */
export const startProductSubscription: API.OperationMethod<
  StartProductSubscriptionRequest,
  StartProductSubscriptionResponse,
  StartProductSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<StartProductSubscriptionRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<StartProductSubscriptionResponse>,
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
  operationName: "StartProductSubscription",
}));

export type StopProductSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a product subscription for a user with the specified identity provider.
 */
export const stopProductSubscription: API.OperationMethod<
  StopProductSubscriptionRequest,
  StopProductSubscriptionResponse,
  StopProductSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<StopProductSubscriptionRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<StopProductSubscriptionResponse>,
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
  operationName: "StopProductSubscription",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = InternalServerException | ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIdentityProviderSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates additional product configuration settings for the registered identity provider.
 */
export const updateIdentityProviderSettings: API.OperationMethod<
  UpdateIdentityProviderSettingsRequest,
  UpdateIdentityProviderSettingsResponse,
  UpdateIdentityProviderSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(153, __c19, 1) as any as S.Schema<UpdateIdentityProviderSettingsRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<UpdateIdentityProviderSettingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityProviderSettings",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityProvider: S.optional(__S(179, __c22, 3)),
          Product: S.optional(S.String),
          IdentityProviderArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identity-provider/DeregisterIdentityProvider" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterIdentityProviderRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Subnets: __S(168, __c21, 0), SecurityGroupId: S.String }),
      ).annotate({ identifier: "Settings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityProvider: __S(179, __c22, 3),
          Settings: __S(8, __c1, 0),
          Product: S.String,
          Status: S.String,
          IdentityProviderArn: S.optional(S.String),
          FailureMessage: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentityProviderSummary" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IdentityProviderSummary: __S(9, __c1, 1) })).annotate({
        identifier: "DeregisterIdentityProviderResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: S.optional(S.String),
          InstanceId: S.optional(S.String),
          IdentityProvider: S.optional(__S(179, __c22, 3)),
          InstanceUserArn: S.optional(S.String),
          Domain: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/DisassociateUser" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateUserRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(41, __c5, 1)),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identity-provider/ListIdentityProviders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIdentityProvidersRequest" });
    case 1:
      return S.Array(__S(9, __c1, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ IdentityProviderSummaries: __S(33, __c4, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIdentityProvidersResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Attribute: S.optional(S.String),
          Operation: S.optional(S.String),
          Value: S.optional(S.String),
        }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(40, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(41, __c5, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/instance/ListInstances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          Status: S.String,
          Products: __S(168, __c21, 0),
          LastStatusCheckDate: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          IdentityProvider: S.optional(__S(179, __c22, 3)),
        }),
      ).annotate({ identifier: "InstanceSummary" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InstanceSummaries: S.optional(__S(50, __c6, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListInstancesResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(41, __c5, 1)),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/license-server/ListLicenseServerEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLicenseServerEndpointsRequest" });
    case 1:
      return S.Array(__S(235, __c29, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LicenseServerEndpoints: S.optional(__S(57, __c7, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLicenseServerEndpointsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Product: S.optional(S.String),
          IdentityProvider: __S(179, __c22, 3),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(41, __c5, 1)),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/ListProductSubscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProductSubscriptionsRequest" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProductUserSummaries: S.optional(__S(65, __c8, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProductSubscriptionsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: S.String,
          Product: S.String,
          IdentityProvider: __S(179, __c22, 3),
          Status: S.String,
          ProductUserArn: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          Domain: S.optional(S.String),
          SubscriptionStartDate: S.optional(S.String),
          SubscriptionEndDate: S.optional(S.String),
          LicenseExpirationDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProductUserSummary" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(208, __c26, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          IdentityProvider: __S(179, __c22, 3),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(41, __c5, 1)),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/ListUserAssociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUserAssociationsRequest" });
    case 1:
      return S.Array(__S(192, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          InstanceUserSummaries: S.optional(__S(89, __c11, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListUserAssociationsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityProvider: __S(179, __c22, 3),
          Product: S.String,
          Settings: S.optional(__S(8, __c1, 0)),
          Tags: S.optional(__S(208, __c26, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identity-provider/RegisterIdentityProvider" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterIdentityProviderRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: S.String,
          IdentityProvider: __S(179, __c22, 3),
          Product: S.String,
          Domain: S.optional(S.String),
          Tags: S.optional(__S(208, __c26, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/StartProductSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartProductSubscriptionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProductUserSummary: __S(72, __c9, 0) })).annotate({
        identifier: "StartProductSubscriptionResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: S.optional(S.String),
          IdentityProvider: S.optional(__S(179, __c22, 3)),
          Product: S.optional(S.String),
          ProductUserArn: S.optional(S.String),
          Domain: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/StopProductSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopProductSubscriptionRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(208, __c26, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tags/{ResourceArn}" }),
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
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(168, __c21, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AddSubnets: __S(168, __c21, 0),
          RemoveSubnets: __S(168, __c21, 0),
          SecurityGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityProvider: S.optional(__S(179, __c22, 3)),
          Product: S.optional(S.String),
          IdentityProviderArn: S.optional(S.String),
          UpdateSettings: __S(152, __c19, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identity-provider/UpdateIdentityProviderSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIdentityProviderSettingsRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: S.String,
          InstanceId: S.String,
          IdentityProvider: __S(179, __c22, 3),
          Domain: S.optional(S.String),
          Tags: S.optional(__S(208, __c26, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/AssociateUser" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateUserRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Subnets: __S(168, __c21, 0) })).annotate({
        identifier: "DomainNetworkSettings",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          DomainIpv4List: S.optional(__S(168, __c21, 0)),
          DomainIpv6List: S.optional(__S(168, __c21, 0)),
          DomainCredentialsProvider: S.optional(__S(201, __c25, 1)),
          DomainNetworkSettings: S.optional(__S(176, __c22, 0)),
        }),
      ).annotate({ identifier: "ActiveDirectorySettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          ActiveDirectorySettings: S.optional(__S(177, __c22, 1)),
          ActiveDirectoryType: S.optional(S.String),
          IsSharedActiveDirectory: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ActiveDirectoryIdentityProvider" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ActiveDirectoryIdentityProvider: __S(178, __c22, 2) }),
      ]);
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InstanceUserSummary: __S(192, __c24, 0) })).annotate({
        identifier: "AssociateUserResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: S.String,
          InstanceId: S.String,
          IdentityProvider: __S(179, __c22, 3),
          Status: S.String,
          InstanceUserArn: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          Domain: S.optional(S.String),
          AssociationDate: S.optional(S.String),
          DisassociationDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceUserSummary" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SecretId: S.optional(S.String) })).annotate({
        identifier: "SecretsManagerCredentialsProvider",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ SecretsManagerCredentialsProvider: __S(200, __c25, 0) }),
      ]);
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RdsSalCredentialsProvider: __S(201, __c25, 1) })).annotate({
        identifier: "RdsSalSettings",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ RdsSalSettings: __S(216, __c27, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ ServerType: S.String, ServerSettings: __S(217, __c27, 1) }),
      ).annotate({ identifier: "LicenseServerSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          IdentityProviderArn: S.String,
          LicenseServerSettings: __S(218, __c27, 2),
          Tags: S.optional(__S(208, __c26, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/license-server/CreateLicenseServerEndpoint" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLicenseServerEndpointRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          IdentityProviderArn: S.optional(S.String),
          LicenseServerEndpointArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateLicenseServerEndpointResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseServerEndpointArn: S.String, ServerType: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/license-server/DeleteLicenseServerEndpoint" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLicenseServerEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LicenseServerEndpoint: S.optional(__S(235, __c29, 3)) }),
      ).annotate({ identifier: "DeleteLicenseServerEndpointResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Endpoint: S.optional(S.String) })).annotate({
        identifier: "ServerEndpoint",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProvisioningStatus: S.optional(S.String),
          HealthStatus: S.optional(S.String),
          Ipv4Address: S.optional(S.String),
          Ipv6Address: S.optional(S.String),
        }),
      ).annotate({ identifier: "LicenseServer" });
    case 2:
      return S.Array(__S(233, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IdentityProviderArn: S.optional(S.String),
          ServerType: S.optional(S.String),
          ServerEndpoint: S.optional(__S(232, __c29, 0)),
          StatusMessage: S.optional(S.String),
          LicenseServerEndpointId: S.optional(S.String),
          LicenseServerEndpointArn: S.optional(S.String),
          LicenseServerEndpointProvisioningStatus: S.optional(S.String),
          LicenseServers: S.optional(__S(234, __c29, 2)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LicenseServerEndpoint" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
