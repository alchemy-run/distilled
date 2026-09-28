import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "License Manager User Subscriptions",
  target: "LicenseManagerUserSubscriptions",
  version: "2018-05-10",
  sigv4: "license-manager-user-subscriptions",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://license-manager-user-subscriptions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://license-manager-user-subscriptions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError("ServiceQuotaExceededException")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
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
export type IdentityProvider = {
  ActiveDirectoryIdentityProvider: ActiveDirectoryIdentityProvider;
};
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
  descriptor: {
    service: svc,
    http: "POST /user/AssociateUser",
    input: {
      Username: 0,
      InstanceId: 0,
      IdentityProvider: i_IdentityProvider,
      Domain: 0,
      Tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /license-server/CreateLicenseServerEndpoint",
    input: {
      IdentityProviderArn: 0,
      LicenseServerSettings: {
        ServerType: 0,
        ServerSettings: {
          RdsSalSettings: { RdsSalCredentialsProvider: i_CredentialsProvider },
        },
      },
      Tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /license-server/DeleteLicenseServerEndpoint",
    input: { LicenseServerEndpointArn: 0, ServerType: 0 },
    output: { LicenseServerEndpoint: o_LicenseServerEndpoint },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identity-provider/DeregisterIdentityProvider",
    input: {
      IdentityProvider: i_IdentityProvider,
      Product: 0,
      IdentityProviderArn: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /user/DisassociateUser",
    input: {
      Username: 0,
      InstanceId: 0,
      IdentityProvider: i_IdentityProvider,
      InstanceUserArn: 0,
      Domain: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identity-provider/ListIdentityProviders",
    input: { MaxResults: 0, Filters: D.list(i_Filter), NextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /instance/ListInstances",
    input: { MaxResults: 0, NextToken: 0, Filters: D.list(i_Filter) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /license-server/ListLicenseServerEndpoints",
    input: { MaxResults: 0, Filters: D.list(i_Filter), NextToken: 0 },
    output: { LicenseServerEndpoints: D.list(o_LicenseServerEndpoint) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /user/ListProductSubscriptions",
    input: {
      Product: 0,
      IdentityProvider: i_IdentityProvider,
      MaxResults: 0,
      Filters: D.list(i_Filter),
      NextToken: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /user/ListUserAssociations",
    input: {
      InstanceId: 0,
      IdentityProvider: i_IdentityProvider,
      MaxResults: 0,
      Filters: D.list(i_Filter),
      NextToken: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /identity-provider/RegisterIdentityProvider",
    input: {
      IdentityProvider: i_IdentityProvider,
      Product: 0,
      Settings: { Subnets: 0, SecurityGroupId: 0 },
      Tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /user/StartProductSubscription",
    input: {
      Username: 0,
      IdentityProvider: i_IdentityProvider,
      Product: 0,
      Domain: 0,
      Tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /user/StopProductSubscription",
    input: {
      Username: 0,
      IdentityProvider: i_IdentityProvider,
      Product: 0,
      ProductUserArn: 0,
      Domain: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identity-provider/UpdateIdentityProviderSettings",
    input: {
      IdentityProvider: i_IdentityProvider,
      Product: 0,
      IdentityProviderArn: 0,
      UpdateSettings: { AddSubnets: 0, RemoveSubnets: 0, SecurityGroupId: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityProviderSettings",
})) as any;

const i_CredentialsProvider: D.LazyStruct = () => ({
  SecretsManagerCredentialsProvider: { SecretId: 0 },
});
const i_Filter: D.LazyStruct = () => ({ Attribute: 0, Operation: 0, Value: 0 });
const i_IdentityProvider: D.LazyStruct = () => ({
  ActiveDirectoryIdentityProvider: {
    DirectoryId: 0,
    ActiveDirectorySettings: {
      DomainName: 0,
      DomainIpv4List: 0,
      DomainIpv6List: 0,
      DomainCredentialsProvider: i_CredentialsProvider,
      DomainNetworkSettings: { Subnets: 0 },
    },
    ActiveDirectoryType: 0,
    IsSharedActiveDirectory: 0,
  },
});
const o_LicenseServerEndpoint: D.LazyStruct = () => ({ CreationTime: D.ts });
