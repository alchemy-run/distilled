import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "License Manager Linux Subscriptions",
  serviceShapeName: "LicenseManagerLinuxSubscriptions",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "license-manager-linux-subscriptions" });
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://license-manager-linux-subscriptions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://license-manager-linux-subscriptions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://license-manager-linux-subscriptions.{R}.{D}","properties":{},"headers":{}}');

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()("InternalServerException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type RegisteredSubscriptionProviderList = RegisteredSubscriptionProvider[];
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
  input: __S(20, __c5, 0) as any as S.Schema<DeregisterSubscriptionProviderRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<DeregisterSubscriptionProviderResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterSubscriptionProvider",
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<GetRegisteredSubscriptionProviderRequest>,
  output: __S(32, __c8, 0) as any as S.Schema<GetRegisteredSubscriptionProviderResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegisteredSubscriptionProvider",
}));

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
  input: __S(36, __c9, 0) as any as S.Schema<GetServiceSettingsRequest>,
  output: __S(45, __c11, 1) as any as S.Schema<GetServiceSettingsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
}));

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
  input: __S(52, __c13, 0) as any as S.Schema<ListLinuxSubscriptionInstancesRequest>,
  output: __S(55, __c13, 3) as any as S.Schema<ListLinuxSubscriptionInstancesResponse>,
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
  input: __S(60, __c15, 0) as any as S.Schema<ListLinuxSubscriptionsRequest>,
  output: __S(63, __c15, 3) as any as S.Schema<ListLinuxSubscriptionsResponse>,
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
  input: __S(64, __c16, 0) as any as S.Schema<ListRegisteredSubscriptionProvidersRequest>,
  output: __S(66, __c16, 2) as any as S.Schema<ListRegisteredSubscriptionProvidersResponse>,
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
  input: __S(0, __c0, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(4, __c1, 0) as any as S.Schema<RegisterSubscriptionProviderRequest>,
  output: __S(5, __c1, 1) as any as S.Schema<RegisterSubscriptionProviderResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterSubscriptionProvider",
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = InternalServerException | ResourceNotFoundException | CommonErrors;
/**
 * Remove one or more metadata tag from the specified Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<UpdateServiceSettingsRequest>,
  output: __S(45, __c11, 1) as any as S.Schema<UpdateServiceSettingsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSettings",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(40, __c10, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionProviderSource: S.String,
          SecretArn: S.String,
          Tags: S.optional(__S(40, __c10, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/subscription/RegisterSubscriptionProvider" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterSubscriptionProviderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubscriptionProviderSource: S.optional(S.String),
          SubscriptionProviderArn: S.optional(S.String),
          SubscriptionProviderStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisterSubscriptionProviderResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(40, __c10, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tags/{resourceArn}" }),
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
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(48, __c12, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LinuxSubscriptionsDiscovery: S.String,
          LinuxSubscriptionsDiscoverySettings: __S(44, __c11, 0),
          AllowUpdate: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/subscription/UpdateServiceSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateServiceSettingsRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriptionProviderArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/subscription/DeregisterSubscriptionProvider" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterSubscriptionProviderRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeregisterSubscriptionProviderResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriptionProviderArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/subscription/GetRegisteredSubscriptionProvider" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRegisteredSubscriptionProviderRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionProviderArn: S.optional(S.String),
          SubscriptionProviderSource: S.optional(S.String),
          SecretArn: S.optional(S.String),
          SubscriptionProviderStatus: S.optional(S.String),
          SubscriptionProviderStatusMessage: S.optional(S.String),
          LastSuccessfulDataRetrievalTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRegisteredSubscriptionProviderResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/subscription/GetServiceSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServiceSettingsRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceRegions: __S(48, __c12, 0), OrganizationIntegration: S.String }),
      ).annotate({ identifier: "LinuxSubscriptionsDiscoverySettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LinuxSubscriptionsDiscovery: S.optional(S.String),
          LinuxSubscriptionsDiscoverySettings: S.optional(__S(44, __c11, 0)),
          Status: S.optional(S.String),
          StatusMessage: S.optional(__S(40, __c10, 0)),
          HomeRegions: S.optional(__S(48, __c12, 0)),
        }),
      ).annotate({ identifier: "GetServiceSettingsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(57, __c14, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/subscription/ListLinuxSubscriptionInstances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLinuxSubscriptionInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AmiId: S.optional(S.String),
          InstanceID: S.optional(S.String),
          InstanceType: S.optional(S.String),
          AccountID: S.optional(S.String),
          Status: S.optional(S.String),
          Region: S.optional(S.String),
          UsageOperation: S.optional(S.String),
          ProductCode: S.optional(__S(48, __c12, 0)),
          LastUpdatedTime: S.optional(S.String),
          SubscriptionName: S.optional(S.String),
          OsVersion: S.optional(S.String),
          SubscriptionProviderCreateTime: S.optional(S.String),
          SubscriptionProviderUpdateTime: S.optional(S.String),
          DualSubscription: S.optional(S.String),
          RegisteredWithSubscriptionProvider: S.optional(S.String),
        }),
      ).annotate({ identifier: "Instance" });
    case 2:
      return S.Array(__S(53, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Instances: S.optional(__S(54, __c13, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLinuxSubscriptionInstancesResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Values: S.optional(__S(48, __c12, 0)),
          Operator: S.optional(S.String),
        }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(56, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(57, __c14, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/subscription/ListLinuxSubscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLinuxSubscriptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Subscription" });
    case 2:
      return S.Array(__S(61, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Subscriptions: S.optional(__S(62, __c15, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLinuxSubscriptionsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionProviderSources: S.optional(__S(48, __c12, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/subscription/ListRegisteredSubscriptionProviders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRegisteredSubscriptionProvidersRequest" });
    case 1:
      return S.Array(__S(32, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RegisteredSubscriptionProviders: S.optional(__S(65, __c16, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRegisteredSubscriptionProvidersResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
