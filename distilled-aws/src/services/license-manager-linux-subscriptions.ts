import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "License Manager Linux Subscriptions",
  serviceShapeName: "LicenseManagerLinuxSubscriptions",
});
const auth = T.AwsAuthSigv4({ name: "license-manager-linux-subscriptions" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type SubscriptionProviderArn = string;
export type SubscriptionProviderSource = string;
export type SecretArn = string;
export type SubscriptionProviderStatus = string;
export type LinuxSubscriptionsDiscovery = string;
export type OrganizationIntegration = string;
export type Status = string;
export type Operator = string;
export type BoxInteger = number;
export type BoxLong = number;

//# Schemas
export interface DeregisterSubscriptionProviderRequest {
  SubscriptionProviderArn: string;
}
export const DeregisterSubscriptionProviderRequest = S.suspend(() =>
  S.Struct({ SubscriptionProviderArn: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/subscription/DeregisterSubscriptionProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterSubscriptionProviderRequest",
}) as any as S.Schema<DeregisterSubscriptionProviderRequest>;
export interface DeregisterSubscriptionProviderResponse {}
export const DeregisterSubscriptionProviderResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterSubscriptionProviderResponse",
}) as any as S.Schema<DeregisterSubscriptionProviderResponse>;
export interface GetRegisteredSubscriptionProviderRequest {
  SubscriptionProviderArn: string;
}
export const GetRegisteredSubscriptionProviderRequest = S.suspend(() =>
  S.Struct({ SubscriptionProviderArn: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/subscription/GetRegisteredSubscriptionProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRegisteredSubscriptionProviderRequest",
}) as any as S.Schema<GetRegisteredSubscriptionProviderRequest>;
export interface GetRegisteredSubscriptionProviderResponse {
  SubscriptionProviderArn?: string;
  SubscriptionProviderSource?: string;
  SecretArn?: string;
  SubscriptionProviderStatus?: string;
  SubscriptionProviderStatusMessage?: string;
  LastSuccessfulDataRetrievalTime?: string;
}
export const GetRegisteredSubscriptionProviderResponse = S.suspend(() =>
  S.Struct({
    SubscriptionProviderArn: S.optional(S.String),
    SubscriptionProviderSource: S.optional(S.String),
    SecretArn: S.optional(S.String),
    SubscriptionProviderStatus: S.optional(S.String),
    SubscriptionProviderStatusMessage: S.optional(S.String),
    LastSuccessfulDataRetrievalTime: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRegisteredSubscriptionProviderResponse",
}) as any as S.Schema<GetRegisteredSubscriptionProviderResponse>;
export interface GetServiceSettingsRequest {}
export const GetServiceSettingsRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetServiceSettingsRequest",
}) as any as S.Schema<GetServiceSettingsRequest>;
export type StringList = string[];
export const StringList = S.Array(S.String);
export interface LinuxSubscriptionsDiscoverySettings {
  SourceRegions: string[];
  OrganizationIntegration: string;
}
export const LinuxSubscriptionsDiscoverySettings = S.suspend(() =>
  S.Struct({ SourceRegions: StringList, OrganizationIntegration: S.String }),
).annotate({
  identifier: "LinuxSubscriptionsDiscoverySettings",
}) as any as S.Schema<LinuxSubscriptionsDiscoverySettings>;
export type StringMap = { [key: string]: string | undefined };
export const StringMap = S.Record(S.String, S.String.pipe(S.optional));
export interface GetServiceSettingsResponse {
  LinuxSubscriptionsDiscovery?: string;
  LinuxSubscriptionsDiscoverySettings?: LinuxSubscriptionsDiscoverySettings;
  Status?: string;
  StatusMessage?: { [key: string]: string | undefined };
  HomeRegions?: string[];
}
export const GetServiceSettingsResponse = S.suspend(() =>
  S.Struct({
    LinuxSubscriptionsDiscovery: S.optional(S.String),
    LinuxSubscriptionsDiscoverySettings: S.optional(
      LinuxSubscriptionsDiscoverySettings,
    ),
    Status: S.optional(S.String),
    StatusMessage: S.optional(StringMap),
    HomeRegions: S.optional(StringList),
  }),
).annotate({
  identifier: "GetServiceSettingsResponse",
}) as any as S.Schema<GetServiceSettingsResponse>;
export interface Filter {
  Name?: string;
  Values?: string[];
  Operator?: string;
}
export const Filter = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Values: S.optional(StringList),
    Operator: S.optional(S.String),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = S.Array(Filter);
export interface ListLinuxSubscriptionInstancesRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListLinuxSubscriptionInstancesRequest = S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/subscription/ListLinuxSubscriptionInstances",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLinuxSubscriptionInstancesRequest",
}) as any as S.Schema<ListLinuxSubscriptionInstancesRequest>;
export type ProductCodeList = string[];
export const ProductCodeList = S.Array(S.String);
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
export const Instance = S.suspend(() =>
  S.Struct({
    AmiId: S.optional(S.String),
    InstanceID: S.optional(S.String),
    InstanceType: S.optional(S.String),
    AccountID: S.optional(S.String),
    Status: S.optional(S.String),
    Region: S.optional(S.String),
    UsageOperation: S.optional(S.String),
    ProductCode: S.optional(ProductCodeList),
    LastUpdatedTime: S.optional(S.String),
    SubscriptionName: S.optional(S.String),
    OsVersion: S.optional(S.String),
    SubscriptionProviderCreateTime: S.optional(S.String),
    SubscriptionProviderUpdateTime: S.optional(S.String),
    DualSubscription: S.optional(S.String),
    RegisteredWithSubscriptionProvider: S.optional(S.String),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export type InstanceList = Instance[];
export const InstanceList = S.Array(Instance);
export interface ListLinuxSubscriptionInstancesResponse {
  Instances?: Instance[];
  NextToken?: string;
}
export const ListLinuxSubscriptionInstancesResponse = S.suspend(() =>
  S.Struct({
    Instances: S.optional(InstanceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLinuxSubscriptionInstancesResponse",
}) as any as S.Schema<ListLinuxSubscriptionInstancesResponse>;
export interface ListLinuxSubscriptionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListLinuxSubscriptionsRequest = S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
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
).annotate({
  identifier: "ListLinuxSubscriptionsRequest",
}) as any as S.Schema<ListLinuxSubscriptionsRequest>;
export interface Subscription {
  Name?: string;
  Type?: string;
  InstanceCount?: number;
}
export const Subscription = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export type SubscriptionList = Subscription[];
export const SubscriptionList = S.Array(Subscription);
export interface ListLinuxSubscriptionsResponse {
  Subscriptions?: Subscription[];
  NextToken?: string;
}
export const ListLinuxSubscriptionsResponse = S.suspend(() =>
  S.Struct({
    Subscriptions: S.optional(SubscriptionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLinuxSubscriptionsResponse",
}) as any as S.Schema<ListLinuxSubscriptionsResponse>;
export type SubscriptionProviderSourceList = string[];
export const SubscriptionProviderSourceList = S.Array(S.String);
export interface ListRegisteredSubscriptionProvidersRequest {
  SubscriptionProviderSources?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListRegisteredSubscriptionProvidersRequest = S.suspend(() =>
  S.Struct({
    SubscriptionProviderSources: S.optional(SubscriptionProviderSourceList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/subscription/ListRegisteredSubscriptionProviders",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRegisteredSubscriptionProvidersRequest",
}) as any as S.Schema<ListRegisteredSubscriptionProvidersRequest>;
export interface RegisteredSubscriptionProvider {
  SubscriptionProviderArn?: string;
  SubscriptionProviderSource?: string;
  SecretArn?: string;
  SubscriptionProviderStatus?: string;
  SubscriptionProviderStatusMessage?: string;
  LastSuccessfulDataRetrievalTime?: string;
}
export const RegisteredSubscriptionProvider = S.suspend(() =>
  S.Struct({
    SubscriptionProviderArn: S.optional(S.String),
    SubscriptionProviderSource: S.optional(S.String),
    SecretArn: S.optional(S.String),
    SubscriptionProviderStatus: S.optional(S.String),
    SubscriptionProviderStatusMessage: S.optional(S.String),
    LastSuccessfulDataRetrievalTime: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisteredSubscriptionProvider",
}) as any as S.Schema<RegisteredSubscriptionProvider>;
export type RegisteredSubscriptionProviderList =
  RegisteredSubscriptionProvider[];
export const RegisteredSubscriptionProviderList = S.Array(
  RegisteredSubscriptionProvider,
);
export interface ListRegisteredSubscriptionProvidersResponse {
  RegisteredSubscriptionProviders?: RegisteredSubscriptionProvider[];
  NextToken?: string;
}
export const ListRegisteredSubscriptionProvidersResponse = S.suspend(() =>
  S.Struct({
    RegisteredSubscriptionProviders: S.optional(
      RegisteredSubscriptionProviderList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRegisteredSubscriptionProvidersResponse",
}) as any as S.Schema<ListRegisteredSubscriptionProvidersResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type Tags = { [key: string]: string | undefined };
export const Tags = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RegisterSubscriptionProviderRequest {
  SubscriptionProviderSource: string;
  SecretArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const RegisterSubscriptionProviderRequest = S.suspend(() =>
  S.Struct({
    SubscriptionProviderSource: S.String,
    SecretArn: S.String,
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/subscription/RegisterSubscriptionProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterSubscriptionProviderRequest",
}) as any as S.Schema<RegisterSubscriptionProviderRequest>;
export interface RegisterSubscriptionProviderResponse {
  SubscriptionProviderSource?: string;
  SubscriptionProviderArn?: string;
  SubscriptionProviderStatus?: string;
}
export const RegisterSubscriptionProviderResponse = S.suspend(() =>
  S.Struct({
    SubscriptionProviderSource: S.optional(S.String),
    SubscriptionProviderArn: S.optional(S.String),
    SubscriptionProviderStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisterSubscriptionProviderResponse",
}) as any as S.Schema<RegisterSubscriptionProviderResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateServiceSettingsRequest {
  LinuxSubscriptionsDiscovery: string;
  LinuxSubscriptionsDiscoverySettings: LinuxSubscriptionsDiscoverySettings;
  AllowUpdate?: boolean;
}
export const UpdateServiceSettingsRequest = S.suspend(() =>
  S.Struct({
    LinuxSubscriptionsDiscovery: S.String,
    LinuxSubscriptionsDiscoverySettings: LinuxSubscriptionsDiscoverySettings,
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
).annotate({
  identifier: "UpdateServiceSettingsRequest",
}) as any as S.Schema<UpdateServiceSettingsRequest>;
export interface UpdateServiceSettingsResponse {
  LinuxSubscriptionsDiscovery?: string;
  LinuxSubscriptionsDiscoverySettings?: LinuxSubscriptionsDiscoverySettings;
  Status?: string;
  StatusMessage?: { [key: string]: string | undefined };
  HomeRegions?: string[];
}
export const UpdateServiceSettingsResponse = S.suspend(() =>
  S.Struct({
    LinuxSubscriptionsDiscovery: S.optional(S.String),
    LinuxSubscriptionsDiscoverySettings: S.optional(
      LinuxSubscriptionsDiscoverySettings,
    ),
    Status: S.optional(S.String),
    StatusMessage: S.optional(StringMap),
    HomeRegions: S.optional(StringList),
  }),
).annotate({
  identifier: "UpdateServiceSettingsResponse",
}) as any as S.Schema<UpdateServiceSettingsResponse>;

//# Errors
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.optional(S.String) },
) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
) {}

//# Operations
/**
 * Remove a third-party subscription provider from the Bring Your Own License (BYOL) subscriptions
 * registered to your account.
 */
export const deregisterSubscriptionProvider: API.OperationMethod<
  DeregisterSubscriptionProviderRequest,
  DeregisterSubscriptionProviderResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeregisterSubscriptionProviderRequest,
  output: DeregisterSubscriptionProviderResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Get details for a Bring Your Own License (BYOL) subscription that's registered to your account.
 */
export const getRegisteredSubscriptionProvider: API.OperationMethod<
  GetRegisteredSubscriptionProviderRequest,
  GetRegisteredSubscriptionProviderResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRegisteredSubscriptionProviderRequest,
  output: GetRegisteredSubscriptionProviderResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists the Linux subscriptions service settings for your account.
 */
export const getServiceSettings: API.OperationMethod<
  GetServiceSettingsRequest,
  GetServiceSettingsResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServiceSettingsRequest,
  output: GetServiceSettingsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
}));
/**
 * Lists the running Amazon EC2 instances that were discovered with commercial Linux
 * subscriptions.
 */
export const listLinuxSubscriptionInstances: API.OperationMethod<
  ListLinuxSubscriptionInstancesRequest,
  ListLinuxSubscriptionInstancesResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListLinuxSubscriptionInstancesRequest,
  ) => stream.Stream<
    ListLinuxSubscriptionInstancesResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListLinuxSubscriptionInstancesRequest,
  ) => stream.Stream<
    Instance,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLinuxSubscriptionInstancesRequest,
  output: ListLinuxSubscriptionInstancesResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the Linux subscriptions that have been discovered. If you have linked your
 * organization, the returned results will include data aggregated across your accounts in
 * Organizations.
 */
export const listLinuxSubscriptions: API.OperationMethod<
  ListLinuxSubscriptionsRequest,
  ListLinuxSubscriptionsResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListLinuxSubscriptionsRequest,
  ) => stream.Stream<
    ListLinuxSubscriptionsResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListLinuxSubscriptionsRequest,
  ) => stream.Stream<
    Subscription,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLinuxSubscriptionsRequest,
  output: ListLinuxSubscriptionsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscriptions",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * List Bring Your Own License (BYOL) subscription registration resources for your account.
 */
export const listRegisteredSubscriptionProviders: API.OperationMethod<
  ListRegisteredSubscriptionProvidersRequest,
  ListRegisteredSubscriptionProvidersResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRegisteredSubscriptionProvidersRequest,
  ) => stream.Stream<
    ListRegisteredSubscriptionProvidersResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRegisteredSubscriptionProvidersRequest,
  ) => stream.Stream<
    RegisteredSubscriptionProvider,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRegisteredSubscriptionProvidersRequest,
  output: ListRegisteredSubscriptionProvidersResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegisteredSubscriptionProviders",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * List the metadata tags that are assigned to the
 * specified Amazon Web Services resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Register the supported third-party subscription provider for your Bring Your Own License (BYOL) subscription.
 */
export const registerSubscriptionProvider: API.OperationMethod<
  RegisterSubscriptionProviderRequest,
  RegisterSubscriptionProviderResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegisterSubscriptionProviderRequest,
  output: RegisterSubscriptionProviderResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
}));
/**
 * Add metadata tags to the specified Amazon Web Services resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Remove one or more metadata tag from the specified Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  InternalServerException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalServerException, ResourceNotFoundException],
}));
/**
 * Updates the service settings for Linux subscriptions.
 */
export const updateServiceSettings: API.OperationMethod<
  UpdateServiceSettingsRequest,
  UpdateServiceSettingsResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateServiceSettingsRequest,
  output: UpdateServiceSettingsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
}));
