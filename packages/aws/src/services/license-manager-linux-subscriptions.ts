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
  sdkId: "License Manager Linux Subscriptions",
  target: "LicenseManagerLinuxSubscriptions",
  version: "2018-05-10",
  sigv4: "license-manager-linux-subscriptions",
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
                `https://license-manager-linux-subscriptions-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://license-manager-linux-subscriptions-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://license-manager-linux-subscriptions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://license-manager-linux-subscriptions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
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
export type SubscriptionProviderArn = string;
export interface DeregisterSubscriptionProviderRequest {
  SubscriptionProviderArn: string;
}
export interface DeregisterSubscriptionProviderResponse {}
export interface GetRegisteredSubscriptionProviderRequest {
  SubscriptionProviderArn: string;
}
export type SubscriptionProviderSource = string;
export type SecretArn = string;
export type SubscriptionProviderStatus = string;
export interface GetRegisteredSubscriptionProviderResponse {
  SubscriptionProviderArn?: string;
  SubscriptionProviderSource?: string;
  SecretArn?: string;
  SubscriptionProviderStatus?: string;
  SubscriptionProviderStatusMessage?: string;
  LastSuccessfulDataRetrievalTime?: string;
}
export interface GetServiceSettingsRequest {}
export type LinuxSubscriptionsDiscovery = string;
export type StringList = string[];
export type OrganizationIntegration = string;
export interface LinuxSubscriptionsDiscoverySettings {
  SourceRegions: string[];
  OrganizationIntegration: string;
}
export type Status = string;
export type StringMap = { [key: string]: string | undefined };
export interface GetServiceSettingsResponse {
  LinuxSubscriptionsDiscovery?: string;
  LinuxSubscriptionsDiscoverySettings?: LinuxSubscriptionsDiscoverySettings;
  Status?: string;
  StatusMessage?: { [key: string]: string | undefined };
  HomeRegions?: string[];
}
export type Operator = string;
export interface Filter {
  Name?: string;
  Values?: string[];
  Operator?: string;
}
export type FilterList = Filter[];
export type BoxInteger = number;
export interface ListLinuxSubscriptionInstancesRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type ProductCodeList = string[];
export interface Instance {
  AmiId?: string;
  InstanceID?: string;
  InstanceType?: string;
  AccountID?: string;
  Status?: string;
  Region?: string;
  UsageOperation?: string;
  ProductCode?: string[];
  LastUpdatedTime?: string;
  SubscriptionName?: string;
  OsVersion?: string;
  SubscriptionProviderCreateTime?: string;
  SubscriptionProviderUpdateTime?: string;
  DualSubscription?: string;
  RegisteredWithSubscriptionProvider?: string;
}
export type InstanceList = Instance[];
export interface ListLinuxSubscriptionInstancesResponse {
  Instances?: Instance[];
  NextToken?: string;
}
export interface ListLinuxSubscriptionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type BoxLong = number;
export interface Subscription {
  Name?: string;
  Type?: string;
  InstanceCount?: number;
}
export type SubscriptionList = Subscription[];
export interface ListLinuxSubscriptionsResponse {
  Subscriptions?: Subscription[];
  NextToken?: string;
}
export type SubscriptionProviderSourceList = string[];
export interface ListRegisteredSubscriptionProvidersRequest {
  SubscriptionProviderSources?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface RegisteredSubscriptionProvider {
  SubscriptionProviderArn?: string;
  SubscriptionProviderSource?: string;
  SecretArn?: string;
  SubscriptionProviderStatus?: string;
  SubscriptionProviderStatusMessage?: string;
  LastSuccessfulDataRetrievalTime?: string;
}
export type RegisteredSubscriptionProviderList =
  RegisteredSubscriptionProvider[];
export interface ListRegisteredSubscriptionProvidersResponse {
  RegisteredSubscriptionProviders?: RegisteredSubscriptionProvider[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type Tags = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface RegisterSubscriptionProviderRequest {
  SubscriptionProviderSource: string;
  SecretArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface RegisterSubscriptionProviderResponse {
  SubscriptionProviderSource?: string;
  SubscriptionProviderArn?: string;
  SubscriptionProviderStatus?: string;
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
export interface UpdateServiceSettingsRequest {
  LinuxSubscriptionsDiscovery: string;
  LinuxSubscriptionsDiscoverySettings: LinuxSubscriptionsDiscoverySettings;
  AllowUpdate?: boolean;
}
export interface UpdateServiceSettingsResponse {
  LinuxSubscriptionsDiscovery?: string;
  LinuxSubscriptionsDiscoverySettings?: LinuxSubscriptionsDiscoverySettings;
  Status?: string;
  StatusMessage?: { [key: string]: string | undefined };
  HomeRegions?: string[];
}
export type DeregisterSubscriptionProviderError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a third-party subscription provider from the Bring Your Own License (BYOL) subscriptions
 * registered to your account.
 */
export const deregisterSubscriptionProvider: API.OperationMethod<
  DeregisterSubscriptionProviderRequest,
  DeregisterSubscriptionProviderResponse,
  DeregisterSubscriptionProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /subscription/DeregisterSubscriptionProvider",
    input: { SubscriptionProviderArn: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterSubscriptionProvider",
})) as any;

export type GetRegisteredSubscriptionProviderError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get details for a Bring Your Own License (BYOL) subscription that's registered to your account.
 */
export const getRegisteredSubscriptionProvider: API.OperationMethod<
  GetRegisteredSubscriptionProviderRequest,
  GetRegisteredSubscriptionProviderResponse,
  GetRegisteredSubscriptionProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /subscription/GetRegisteredSubscriptionProvider",
    input: { SubscriptionProviderArn: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegisteredSubscriptionProvider",
})) as any;

export type GetServiceSettingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Linux subscriptions service settings for your account.
 */
export const getServiceSettings: API.OperationMethod<
  GetServiceSettingsRequest,
  GetServiceSettingsResponse,
  GetServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /subscription/GetServiceSettings",
    input: {},
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
})) as any;

export type ListLinuxSubscriptionInstancesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the running Amazon EC2 instances that were discovered with commercial Linux
 * subscriptions.
 */
export const listLinuxSubscriptionInstances: API.PaginatedOperationMethod<
  ListLinuxSubscriptionInstancesRequest,
  ListLinuxSubscriptionInstancesResponse,
  ListLinuxSubscriptionInstancesError,
  Credentials | HttpClient.HttpClient,
  Instance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /subscription/ListLinuxSubscriptionInstances",
    input: { Filters: D.list(i_Filter), MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinuxSubscriptionInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLinuxSubscriptionsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Linux subscriptions that have been discovered. If you have linked your
 * organization, the returned results will include data aggregated across your accounts in
 * Organizations.
 */
export const listLinuxSubscriptions: API.PaginatedOperationMethod<
  ListLinuxSubscriptionsRequest,
  ListLinuxSubscriptionsResponse,
  ListLinuxSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /subscription/ListLinuxSubscriptions",
    input: { Filters: D.list(i_Filter), MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinuxSubscriptions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegisteredSubscriptionProvidersError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List Bring Your Own License (BYOL) subscription registration resources for your account.
 */
export const listRegisteredSubscriptionProviders: API.PaginatedOperationMethod<
  ListRegisteredSubscriptionProvidersRequest,
  ListRegisteredSubscriptionProvidersResponse,
  ListRegisteredSubscriptionProvidersError,
  Credentials | HttpClient.HttpClient,
  RegisteredSubscriptionProvider
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /subscription/ListRegisteredSubscriptionProviders",
    input: { SubscriptionProviderSources: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegisteredSubscriptionProviders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegisteredSubscriptionProviders",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the metadata tags that are assigned to the
 * specified Amazon Web Services resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RegisterSubscriptionProviderError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Register the supported third-party subscription provider for your Bring Your Own License (BYOL) subscription.
 */
export const registerSubscriptionProvider: API.OperationMethod<
  RegisterSubscriptionProviderRequest,
  RegisterSubscriptionProviderResponse,
  RegisterSubscriptionProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /subscription/RegisterSubscriptionProvider",
    input: { SubscriptionProviderSource: 0, SecretArn: 0, Tags: 0 },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterSubscriptionProvider",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Add metadata tags to the specified Amazon Web Services resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
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
 * Remove one or more metadata tag from the specified Amazon Web Services resource.
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
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateServiceSettingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the service settings for Linux subscriptions.
 */
export const updateServiceSettings: API.OperationMethod<
  UpdateServiceSettingsRequest,
  UpdateServiceSettingsResponse,
  UpdateServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /subscription/UpdateServiceSettings",
    input: {
      LinuxSubscriptionsDiscovery: 0,
      LinuxSubscriptionsDiscoverySettings: {
        SourceRegions: 0,
        OrganizationIntegration: 0,
      },
      AllowUpdate: 0,
    },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSettings",
})) as any;

const i_Filter: D.LazyStruct = () => ({ Name: 0, Values: 0, Operator: 0 });
