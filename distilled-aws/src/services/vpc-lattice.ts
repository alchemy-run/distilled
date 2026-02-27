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
  sdkId: "VPC Lattice",
  serviceShapeName: "MercuryControlPlane",
});
const auth = T.AwsAuthSigv4({ name: "vpc-lattice" });
const ver = T.ServiceVersion("2022-11-30");
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
              `https://vpc-lattice-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://vpc-lattice-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://vpc-lattice.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://vpc-lattice.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type ServiceIdentifier = string;
export type ListenerIdentifier = string;
export type RuleIdentifier = string;
export type HttpMethod = string;
export type PathMatchExact = string;
export type PathMatchPrefix = string;
export type HeaderMatchName = string;
export type HeaderMatchExact = string;
export type HeaderMatchPrefix = string;
export type HeaderMatchContains = string;
export type RulePriority = number;
export type TargetGroupIdentifier = string;
export type TargetGroupWeight = number;
export type HttpStatusCode = number;
export type RuleArn = string;
export type RuleId = string;
export type RuleName = string;
export type FailureCode = string;
export type FailureMessage = string;
export type ValidationExceptionReason = string;
export type ResourceIdentifier = string;
export type ResourceArn = string;
export type AuthPolicyString = string;
export type AuthPolicyState = string;
export type PolicyString = string;
export type ServiceNetworkIdentifier = string;
export type MaxResults = number;
export type NextToken = string;
export type ServiceNetworkArn = string;
export type Arn = string;
export type TagKey = string;
export type TagValue = string;
export type ClientToken = string;
export type AccessLogDestinationArn = string;
export type ServiceNetworkLogType = string;
export type AccessLogSubscriptionId = string;
export type AccessLogSubscriptionArn = string;
export type ResourceId = string;
export type AccessLogSubscriptionIdentifier = string;
export type DomainName = string;
export type DomainVerificationId = string;
export type DomainVerificationArn = string;
export type VerificationStatus = string;
export type DomainVerificationIdentifier = string;
export type ListenerName = string;
export type ListenerProtocol = string;
export type Port = number;
export type ListenerArn = string;
export type ListenerId = string;
export type ServiceArn = string;
export type ServiceId = string;
export type ResourceConfigurationName = string;
export type ResourceConfigurationType = string;
export type PortRange = string;
export type ProtocolType = string;
export type ResourceGatewayIdentifier = string;
export type ResourceConfigurationIdentifier = string;
export type ResourceConfigurationIpAddressType = string;
export type IpAddress = string;
export type WildcardArn = string;
export type ResourceConfigurationId = string;
export type ResourceConfigurationArn = string;
export type ResourceGatewayId = string;
export type ResourceConfigurationStatus = string;
export type ResourceEndpointAssociationIdentifier = string;
export type ResourceEndpointAssociationId = string;
export type ResourceEndpointAssociationArn = string;
export type VpcEndpointId = string;
export type VpcEndpointOwner = string;
export type AccountId = string;
export type ResourceGatewayName = string;
export type VpcId = string;
export type SubnetId = string;
export type SecurityGroupId = string;
export type ResourceGatewayIpAddressType = string;
export type Ipv4AddressesPerEni = number;
export type ResourceGatewayArn = string;
export type ResourceGatewayStatus = string;
export type IpAddressType = string;
export type ServiceName = string;
export type ServiceCustomDomainName = string;
export type CertificateArn = string;
export type AuthType = string;
export type ServiceStatus = string;
export type ServiceNetworkName = string;
export type ServiceNetworkId = string;
export type ServiceNetworkIdentifierWithoutRegex = string;
export type ServiceNetworkResourceAssociationId = string;
export type ServiceNetworkResourceAssociationArn = string;
export type ServiceNetworkResourceAssociationStatus = string;
export type ServiceNetworkResourceAssociationIdentifier = string;
export type ServiceNetworkNameWithoutRegex = string;
export type ServiceNetworkArnWithoutRegex = string;
export type ServiceNetworkServiceAssociationIdentifier = string;
export type ServiceNetworkServiceAssociationStatus = string;
export type ServiceNetworkServiceAssociationArn = string;
export type PrivateDnsPreference = string;
export type PrivateDnsSpecifiedDomain = string;
export type ServiceNetworkVpcAssociationId = string;
export type ServiceNetworkVpcAssociationStatus = string;
export type ServiceNetworkVpcAssociationArn = string;
export type ServiceNetworkVpcAssociationIdentifier = string;
export type TargetGroupName = string;
export type TargetGroupType = string;
export type TargetGroupProtocol = string;
export type TargetGroupProtocolVersion = string;
export type HealthCheckProtocolVersion = string;
export type HealthCheckPort = number;
export type HealthCheckPath = string;
export type HealthCheckIntervalSeconds = number;
export type HealthCheckTimeoutSeconds = number;
export type HealthyThresholdCount = number;
export type UnhealthyThresholdCount = number;
export type HttpCodeMatcher = string;
export type LambdaEventStructureVersion = string;
export type TargetGroupId = string;
export type TargetGroupArn = string;
export type TargetGroupStatus = string;
export type TargetStatus = string;

//# Schemas
export type PathMatchType =
  | { exact: string; prefix?: never }
  | { exact?: never; prefix: string };
export const PathMatchType = S.Union([
  S.Struct({ exact: S.String }),
  S.Struct({ prefix: S.String }),
]);
export interface PathMatch {
  match: PathMatchType;
  caseSensitive?: boolean;
}
export const PathMatch = S.suspend(() =>
  S.Struct({ match: PathMatchType, caseSensitive: S.optional(S.Boolean) }),
).annotate({ identifier: "PathMatch" }) as any as S.Schema<PathMatch>;
export type HeaderMatchType =
  | { exact: string; prefix?: never; contains?: never }
  | { exact?: never; prefix: string; contains?: never }
  | { exact?: never; prefix?: never; contains: string };
export const HeaderMatchType = S.Union([
  S.Struct({ exact: S.String }),
  S.Struct({ prefix: S.String }),
  S.Struct({ contains: S.String }),
]);
export interface HeaderMatch {
  name: string;
  match: HeaderMatchType;
  caseSensitive?: boolean;
}
export const HeaderMatch = S.suspend(() =>
  S.Struct({
    name: S.String,
    match: HeaderMatchType,
    caseSensitive: S.optional(S.Boolean),
  }),
).annotate({ identifier: "HeaderMatch" }) as any as S.Schema<HeaderMatch>;
export type HeaderMatchList = HeaderMatch[];
export const HeaderMatchList = S.Array(HeaderMatch);
export interface HttpMatch {
  method?: string;
  pathMatch?: PathMatch;
  headerMatches?: HeaderMatch[];
}
export const HttpMatch = S.suspend(() =>
  S.Struct({
    method: S.optional(S.String),
    pathMatch: S.optional(PathMatch),
    headerMatches: S.optional(HeaderMatchList),
  }),
).annotate({ identifier: "HttpMatch" }) as any as S.Schema<HttpMatch>;
export type RuleMatch = { httpMatch: HttpMatch };
export const RuleMatch = S.Union([S.Struct({ httpMatch: HttpMatch })]);
export interface WeightedTargetGroup {
  targetGroupIdentifier: string;
  weight?: number;
}
export const WeightedTargetGroup = S.suspend(() =>
  S.Struct({ targetGroupIdentifier: S.String, weight: S.optional(S.Number) }),
).annotate({
  identifier: "WeightedTargetGroup",
}) as any as S.Schema<WeightedTargetGroup>;
export type WeightedTargetGroupList = WeightedTargetGroup[];
export const WeightedTargetGroupList = S.Array(WeightedTargetGroup);
export interface ForwardAction {
  targetGroups: WeightedTargetGroup[];
}
export const ForwardAction = S.suspend(() =>
  S.Struct({ targetGroups: WeightedTargetGroupList }),
).annotate({ identifier: "ForwardAction" }) as any as S.Schema<ForwardAction>;
export interface FixedResponseAction {
  statusCode: number;
}
export const FixedResponseAction = S.suspend(() =>
  S.Struct({ statusCode: S.Number }),
).annotate({
  identifier: "FixedResponseAction",
}) as any as S.Schema<FixedResponseAction>;
export type RuleAction =
  | { forward: ForwardAction; fixedResponse?: never }
  | { forward?: never; fixedResponse: FixedResponseAction };
export const RuleAction = S.Union([
  S.Struct({ forward: ForwardAction }),
  S.Struct({ fixedResponse: FixedResponseAction }),
]);
export interface RuleUpdate {
  ruleIdentifier: string;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export const RuleUpdate = S.suspend(() =>
  S.Struct({
    ruleIdentifier: S.String,
    match: S.optional(RuleMatch),
    priority: S.optional(S.Number),
    action: S.optional(RuleAction),
  }),
).annotate({ identifier: "RuleUpdate" }) as any as S.Schema<RuleUpdate>;
export type RuleUpdateList = RuleUpdate[];
export const RuleUpdateList = S.Array(RuleUpdate);
export interface BatchUpdateRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  rules: RuleUpdate[];
}
export const BatchUpdateRuleRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
    rules: RuleUpdateList,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateRuleRequest",
}) as any as S.Schema<BatchUpdateRuleRequest>;
export interface RuleUpdateSuccess {
  arn?: string;
  id?: string;
  name?: string;
  isDefault?: boolean;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export const RuleUpdateSuccess = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    isDefault: S.optional(S.Boolean),
    match: S.optional(RuleMatch),
    priority: S.optional(S.Number),
    action: S.optional(RuleAction),
  }),
).annotate({
  identifier: "RuleUpdateSuccess",
}) as any as S.Schema<RuleUpdateSuccess>;
export type RuleUpdateSuccessList = RuleUpdateSuccess[];
export const RuleUpdateSuccessList = S.Array(RuleUpdateSuccess);
export interface RuleUpdateFailure {
  ruleIdentifier?: string;
  failureCode?: string;
  failureMessage?: string;
}
export const RuleUpdateFailure = S.suspend(() =>
  S.Struct({
    ruleIdentifier: S.optional(S.String),
    failureCode: S.optional(S.String),
    failureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "RuleUpdateFailure",
}) as any as S.Schema<RuleUpdateFailure>;
export type RuleUpdateFailureList = RuleUpdateFailure[];
export const RuleUpdateFailureList = S.Array(RuleUpdateFailure);
export interface BatchUpdateRuleResponse {
  successful?: RuleUpdateSuccess[];
  unsuccessful?: RuleUpdateFailure[];
}
export const BatchUpdateRuleResponse = S.suspend(() =>
  S.Struct({
    successful: S.optional(RuleUpdateSuccessList),
    unsuccessful: S.optional(RuleUpdateFailureList),
  }),
).annotate({
  identifier: "BatchUpdateRuleResponse",
}) as any as S.Schema<BatchUpdateRuleResponse>;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);
export interface DeleteAuthPolicyRequest {
  resourceIdentifier: string;
}
export const DeleteAuthPolicyRequest = S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/authpolicy/{resourceIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAuthPolicyRequest",
}) as any as S.Schema<DeleteAuthPolicyRequest>;
export interface DeleteAuthPolicyResponse {}
export const DeleteAuthPolicyResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteAuthPolicyResponse",
}) as any as S.Schema<DeleteAuthPolicyResponse>;
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
}
export const DeleteResourcePolicyRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/resourcepolicy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface GetAuthPolicyRequest {
  resourceIdentifier: string;
}
export const GetAuthPolicyRequest = S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/authpolicy/{resourceIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAuthPolicyRequest",
}) as any as S.Schema<GetAuthPolicyRequest>;
export interface GetAuthPolicyResponse {
  policy?: string;
  state?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const GetAuthPolicyResponse = S.suspend(() =>
  S.Struct({
    policy: S.optional(S.String),
    state: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetAuthPolicyResponse",
}) as any as S.Schema<GetAuthPolicyResponse>;
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export const GetResourcePolicyRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourcepolicy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export interface GetResourcePolicyResponse {
  policy?: string;
}
export const GetResourcePolicyResponse = S.suspend(() =>
  S.Struct({ policy: S.optional(S.String) }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface ListServiceNetworkVpcEndpointAssociationsRequest {
  serviceNetworkIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListServiceNetworkVpcEndpointAssociationsRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkIdentifier: S.String.pipe(
      T.HttpQuery("serviceNetworkIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/servicenetworkvpcendpointassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceNetworkVpcEndpointAssociationsRequest",
}) as any as S.Schema<ListServiceNetworkVpcEndpointAssociationsRequest>;
export interface ServiceNetworkEndpointAssociation {
  vpcEndpointId?: string;
  vpcId?: string;
  vpcEndpointOwnerId?: string;
  id?: string;
  state?: string;
  serviceNetworkArn?: string;
  createdAt?: Date;
}
export const ServiceNetworkEndpointAssociation = S.suspend(() =>
  S.Struct({
    vpcEndpointId: S.optional(S.String),
    vpcId: S.optional(S.String),
    vpcEndpointOwnerId: S.optional(S.String),
    id: S.optional(S.String),
    state: S.optional(S.String),
    serviceNetworkArn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ServiceNetworkEndpointAssociation",
}) as any as S.Schema<ServiceNetworkEndpointAssociation>;
export type ServiceNetworkVpcEndpointAssociationList =
  ServiceNetworkEndpointAssociation[];
export const ServiceNetworkVpcEndpointAssociationList = S.Array(
  ServiceNetworkEndpointAssociation,
);
export interface ListServiceNetworkVpcEndpointAssociationsResponse {
  items: ServiceNetworkEndpointAssociation[];
  nextToken?: string;
}
export const ListServiceNetworkVpcEndpointAssociationsResponse = S.suspend(() =>
  S.Struct({
    items: ServiceNetworkVpcEndpointAssociationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceNetworkVpcEndpointAssociationsResponse",
}) as any as S.Schema<ListServiceNetworkVpcEndpointAssociationsResponse>;
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
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutAuthPolicyRequest {
  resourceIdentifier: string;
  policy: string;
}
export const PutAuthPolicyRequest = S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
    policy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/authpolicy/{resourceIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAuthPolicyRequest",
}) as any as S.Schema<PutAuthPolicyRequest>;
export interface PutAuthPolicyResponse {
  policy?: string;
  state?: string;
}
export const PutAuthPolicyResponse = S.suspend(() =>
  S.Struct({ policy: S.optional(S.String), state: S.optional(S.String) }),
).annotate({
  identifier: "PutAuthPolicyResponse",
}) as any as S.Schema<PutAuthPolicyResponse>;
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
}
export const PutResourcePolicyRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    policy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/resourcepolicy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {}
export const PutResourcePolicyResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "PutResourcePolicyResponse" },
) as any as S.Schema<PutResourcePolicyResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export interface CreateAccessLogSubscriptionRequest {
  clientToken?: string;
  resourceIdentifier: string;
  destinationArn: string;
  serviceNetworkLogType?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAccessLogSubscriptionRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    resourceIdentifier: S.String,
    destinationArn: S.String,
    serviceNetworkLogType: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accesslogsubscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessLogSubscriptionRequest",
}) as any as S.Schema<CreateAccessLogSubscriptionRequest>;
export interface CreateAccessLogSubscriptionResponse {
  id: string;
  arn: string;
  resourceId: string;
  resourceArn: string;
  serviceNetworkLogType?: string;
  destinationArn: string;
}
export const CreateAccessLogSubscriptionResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    resourceId: S.String,
    resourceArn: S.String,
    serviceNetworkLogType: S.optional(S.String),
    destinationArn: S.String,
  }),
).annotate({
  identifier: "CreateAccessLogSubscriptionResponse",
}) as any as S.Schema<CreateAccessLogSubscriptionResponse>;
export interface GetAccessLogSubscriptionRequest {
  accessLogSubscriptionIdentifier: string;
}
export const GetAccessLogSubscriptionRequest = S.suspend(() =>
  S.Struct({
    accessLogSubscriptionIdentifier: S.String.pipe(
      T.HttpLabel("accessLogSubscriptionIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/accesslogsubscriptions/{accessLogSubscriptionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccessLogSubscriptionRequest",
}) as any as S.Schema<GetAccessLogSubscriptionRequest>;
export interface GetAccessLogSubscriptionResponse {
  id: string;
  arn: string;
  resourceId: string;
  resourceArn: string;
  destinationArn: string;
  serviceNetworkLogType?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const GetAccessLogSubscriptionResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    resourceId: S.String,
    resourceArn: S.String,
    destinationArn: S.String,
    serviceNetworkLogType: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetAccessLogSubscriptionResponse",
}) as any as S.Schema<GetAccessLogSubscriptionResponse>;
export interface UpdateAccessLogSubscriptionRequest {
  accessLogSubscriptionIdentifier: string;
  destinationArn: string;
}
export const UpdateAccessLogSubscriptionRequest = S.suspend(() =>
  S.Struct({
    accessLogSubscriptionIdentifier: S.String.pipe(
      T.HttpLabel("accessLogSubscriptionIdentifier"),
    ),
    destinationArn: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/accesslogsubscriptions/{accessLogSubscriptionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccessLogSubscriptionRequest",
}) as any as S.Schema<UpdateAccessLogSubscriptionRequest>;
export interface UpdateAccessLogSubscriptionResponse {
  id: string;
  arn: string;
  resourceId: string;
  resourceArn: string;
  destinationArn: string;
}
export const UpdateAccessLogSubscriptionResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    resourceId: S.String,
    resourceArn: S.String,
    destinationArn: S.String,
  }),
).annotate({
  identifier: "UpdateAccessLogSubscriptionResponse",
}) as any as S.Schema<UpdateAccessLogSubscriptionResponse>;
export interface DeleteAccessLogSubscriptionRequest {
  accessLogSubscriptionIdentifier: string;
}
export const DeleteAccessLogSubscriptionRequest = S.suspend(() =>
  S.Struct({
    accessLogSubscriptionIdentifier: S.String.pipe(
      T.HttpLabel("accessLogSubscriptionIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/accesslogsubscriptions/{accessLogSubscriptionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessLogSubscriptionRequest",
}) as any as S.Schema<DeleteAccessLogSubscriptionRequest>;
export interface DeleteAccessLogSubscriptionResponse {}
export const DeleteAccessLogSubscriptionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessLogSubscriptionResponse",
}) as any as S.Schema<DeleteAccessLogSubscriptionResponse>;
export interface ListAccessLogSubscriptionsRequest {
  resourceIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAccessLogSubscriptionsRequest = S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String.pipe(T.HttpQuery("resourceIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accesslogsubscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessLogSubscriptionsRequest",
}) as any as S.Schema<ListAccessLogSubscriptionsRequest>;
export interface AccessLogSubscriptionSummary {
  id: string;
  arn: string;
  resourceId: string;
  resourceArn: string;
  destinationArn: string;
  serviceNetworkLogType?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const AccessLogSubscriptionSummary = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    resourceId: S.String,
    resourceArn: S.String,
    destinationArn: S.String,
    serviceNetworkLogType: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "AccessLogSubscriptionSummary",
}) as any as S.Schema<AccessLogSubscriptionSummary>;
export type AccessLogSubscriptionList = AccessLogSubscriptionSummary[];
export const AccessLogSubscriptionList = S.Array(AccessLogSubscriptionSummary);
export interface ListAccessLogSubscriptionsResponse {
  items: AccessLogSubscriptionSummary[];
  nextToken?: string;
}
export const ListAccessLogSubscriptionsResponse = S.suspend(() =>
  S.Struct({
    items: AccessLogSubscriptionList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessLogSubscriptionsResponse",
}) as any as S.Schema<ListAccessLogSubscriptionsResponse>;
export interface StartDomainVerificationRequest {
  clientToken?: string;
  domainName: string;
  tags?: { [key: string]: string | undefined };
}
export const StartDomainVerificationRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    domainName: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/domainverifications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDomainVerificationRequest",
}) as any as S.Schema<StartDomainVerificationRequest>;
export interface TxtMethodConfig {
  value: string;
  name: string;
}
export const TxtMethodConfig = S.suspend(() =>
  S.Struct({ value: S.String, name: S.String }),
).annotate({
  identifier: "TxtMethodConfig",
}) as any as S.Schema<TxtMethodConfig>;
export interface StartDomainVerificationResponse {
  id: string;
  arn: string;
  domainName: string;
  status: string;
  txtMethodConfig?: TxtMethodConfig;
}
export const StartDomainVerificationResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    domainName: S.String,
    status: S.String,
    txtMethodConfig: S.optional(TxtMethodConfig),
  }),
).annotate({
  identifier: "StartDomainVerificationResponse",
}) as any as S.Schema<StartDomainVerificationResponse>;
export interface GetDomainVerificationRequest {
  domainVerificationIdentifier: string;
}
export const GetDomainVerificationRequest = S.suspend(() =>
  S.Struct({
    domainVerificationIdentifier: S.String.pipe(
      T.HttpLabel("domainVerificationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/domainverifications/{domainVerificationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainVerificationRequest",
}) as any as S.Schema<GetDomainVerificationRequest>;
export interface GetDomainVerificationResponse {
  id: string;
  arn: string;
  domainName: string;
  status: string;
  txtMethodConfig?: TxtMethodConfig;
  createdAt: Date;
  lastVerifiedTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetDomainVerificationResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    domainName: S.String,
    status: S.String,
    txtMethodConfig: S.optional(TxtMethodConfig),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastVerifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetDomainVerificationResponse",
}) as any as S.Schema<GetDomainVerificationResponse>;
export interface DeleteDomainVerificationRequest {
  domainVerificationIdentifier: string;
}
export const DeleteDomainVerificationRequest = S.suspend(() =>
  S.Struct({
    domainVerificationIdentifier: S.String.pipe(
      T.HttpLabel("domainVerificationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/domainverifications/{domainVerificationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainVerificationRequest",
}) as any as S.Schema<DeleteDomainVerificationRequest>;
export interface DeleteDomainVerificationResponse {}
export const DeleteDomainVerificationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDomainVerificationResponse",
}) as any as S.Schema<DeleteDomainVerificationResponse>;
export interface ListDomainVerificationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListDomainVerificationsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/domainverifications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainVerificationsRequest",
}) as any as S.Schema<ListDomainVerificationsRequest>;
export interface DomainVerificationSummary {
  id: string;
  arn: string;
  domainName: string;
  status: string;
  txtMethodConfig?: TxtMethodConfig;
  createdAt: Date;
  lastVerifiedTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export const DomainVerificationSummary = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    domainName: S.String,
    status: S.String,
    txtMethodConfig: S.optional(TxtMethodConfig),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastVerifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DomainVerificationSummary",
}) as any as S.Schema<DomainVerificationSummary>;
export type DomainVerificationList = DomainVerificationSummary[];
export const DomainVerificationList = S.Array(DomainVerificationSummary);
export interface ListDomainVerificationsResponse {
  items: DomainVerificationSummary[];
  nextToken?: string;
}
export const ListDomainVerificationsResponse = S.suspend(() =>
  S.Struct({ items: DomainVerificationList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDomainVerificationsResponse",
}) as any as S.Schema<ListDomainVerificationsResponse>;
export interface CreateListenerRequest {
  serviceIdentifier: string;
  name: string;
  protocol: string;
  port?: number;
  defaultAction: RuleAction;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateListenerRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    name: S.String,
    protocol: S.String,
    port: S.optional(S.Number),
    defaultAction: RuleAction,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/services/{serviceIdentifier}/listeners",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateListenerRequest",
}) as any as S.Schema<CreateListenerRequest>;
export interface CreateListenerResponse {
  arn?: string;
  id?: string;
  name?: string;
  protocol?: string;
  port?: number;
  serviceArn?: string;
  serviceId?: string;
  defaultAction?: RuleAction;
}
export const CreateListenerResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    protocol: S.optional(S.String),
    port: S.optional(S.Number),
    serviceArn: S.optional(S.String),
    serviceId: S.optional(S.String),
    defaultAction: S.optional(RuleAction),
  }),
).annotate({
  identifier: "CreateListenerResponse",
}) as any as S.Schema<CreateListenerResponse>;
export interface GetListenerRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
}
export const GetListenerRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetListenerRequest",
}) as any as S.Schema<GetListenerRequest>;
export interface GetListenerResponse {
  arn?: string;
  id?: string;
  name?: string;
  protocol?: string;
  port?: number;
  serviceArn?: string;
  serviceId?: string;
  defaultAction?: RuleAction;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const GetListenerResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    protocol: S.optional(S.String),
    port: S.optional(S.Number),
    serviceArn: S.optional(S.String),
    serviceId: S.optional(S.String),
    defaultAction: S.optional(RuleAction),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetListenerResponse",
}) as any as S.Schema<GetListenerResponse>;
export interface UpdateListenerRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  defaultAction: RuleAction;
}
export const UpdateListenerRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
    defaultAction: RuleAction,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateListenerRequest",
}) as any as S.Schema<UpdateListenerRequest>;
export interface UpdateListenerResponse {
  arn?: string;
  id?: string;
  name?: string;
  protocol?: string;
  port?: number;
  serviceArn?: string;
  serviceId?: string;
  defaultAction?: RuleAction;
}
export const UpdateListenerResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    protocol: S.optional(S.String),
    port: S.optional(S.Number),
    serviceArn: S.optional(S.String),
    serviceId: S.optional(S.String),
    defaultAction: S.optional(RuleAction),
  }),
).annotate({
  identifier: "UpdateListenerResponse",
}) as any as S.Schema<UpdateListenerResponse>;
export interface DeleteListenerRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
}
export const DeleteListenerRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteListenerRequest",
}) as any as S.Schema<DeleteListenerRequest>;
export interface DeleteListenerResponse {}
export const DeleteListenerResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteListenerResponse",
}) as any as S.Schema<DeleteListenerResponse>;
export interface ListListenersRequest {
  serviceIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListListenersRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/services/{serviceIdentifier}/listeners" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListListenersRequest",
}) as any as S.Schema<ListListenersRequest>;
export interface ListenerSummary {
  arn?: string;
  id?: string;
  name?: string;
  protocol?: string;
  port?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const ListenerSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    protocol: S.optional(S.String),
    port: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ListenerSummary",
}) as any as S.Schema<ListenerSummary>;
export type ListenerSummaryList = ListenerSummary[];
export const ListenerSummaryList = S.Array(ListenerSummary);
export interface ListListenersResponse {
  items: ListenerSummary[];
  nextToken?: string;
}
export const ListListenersResponse = S.suspend(() =>
  S.Struct({ items: ListenerSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListListenersResponse",
}) as any as S.Schema<ListListenersResponse>;
export type PortRangeList = string[];
export const PortRangeList = S.Array(S.String);
export interface DnsResource {
  domainName?: string;
  ipAddressType?: string;
}
export const DnsResource = S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    ipAddressType: S.optional(S.String),
  }),
).annotate({ identifier: "DnsResource" }) as any as S.Schema<DnsResource>;
export interface IpResource {
  ipAddress?: string;
}
export const IpResource = S.suspend(() =>
  S.Struct({ ipAddress: S.optional(S.String) }),
).annotate({ identifier: "IpResource" }) as any as S.Schema<IpResource>;
export interface ArnResource {
  arn?: string;
}
export const ArnResource = S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }),
).annotate({ identifier: "ArnResource" }) as any as S.Schema<ArnResource>;
export type ResourceConfigurationDefinition =
  | { dnsResource: DnsResource; ipResource?: never; arnResource?: never }
  | { dnsResource?: never; ipResource: IpResource; arnResource?: never }
  | { dnsResource?: never; ipResource?: never; arnResource: ArnResource };
export const ResourceConfigurationDefinition = S.Union([
  S.Struct({ dnsResource: DnsResource }),
  S.Struct({ ipResource: IpResource }),
  S.Struct({ arnResource: ArnResource }),
]);
export interface CreateResourceConfigurationRequest {
  name: string;
  type: string;
  portRanges?: string[];
  protocol?: string;
  resourceGatewayIdentifier?: string;
  resourceConfigurationGroupIdentifier?: string;
  resourceConfigurationDefinition?: ResourceConfigurationDefinition;
  allowAssociationToShareableServiceNetwork?: boolean;
  customDomainName?: string;
  groupDomain?: string;
  domainVerificationIdentifier?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateResourceConfigurationRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    type: S.String,
    portRanges: S.optional(PortRangeList),
    protocol: S.optional(S.String),
    resourceGatewayIdentifier: S.optional(S.String),
    resourceConfigurationGroupIdentifier: S.optional(S.String),
    resourceConfigurationDefinition: S.optional(
      ResourceConfigurationDefinition,
    ),
    allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
    customDomainName: S.optional(S.String),
    groupDomain: S.optional(S.String),
    domainVerificationIdentifier: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resourceconfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourceConfigurationRequest",
}) as any as S.Schema<CreateResourceConfigurationRequest>;
export interface CreateResourceConfigurationResponse {
  id?: string;
  name?: string;
  arn?: string;
  resourceGatewayId?: string;
  resourceConfigurationGroupId?: string;
  type?: string;
  portRanges?: string[];
  protocol?: string;
  status?: string;
  resourceConfigurationDefinition?: ResourceConfigurationDefinition;
  allowAssociationToShareableServiceNetwork?: boolean;
  createdAt?: Date;
  failureReason?: string;
  customDomainName?: string;
  domainVerificationId?: string;
  groupDomain?: string;
  domainVerificationArn?: string;
}
export const CreateResourceConfigurationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    resourceGatewayId: S.optional(S.String),
    resourceConfigurationGroupId: S.optional(S.String),
    type: S.optional(S.String),
    portRanges: S.optional(PortRangeList),
    protocol: S.optional(S.String),
    status: S.optional(S.String),
    resourceConfigurationDefinition: S.optional(
      ResourceConfigurationDefinition,
    ),
    allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    failureReason: S.optional(S.String),
    customDomainName: S.optional(S.String),
    domainVerificationId: S.optional(S.String),
    groupDomain: S.optional(S.String),
    domainVerificationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateResourceConfigurationResponse",
}) as any as S.Schema<CreateResourceConfigurationResponse>;
export interface GetResourceConfigurationRequest {
  resourceConfigurationIdentifier: string;
}
export const GetResourceConfigurationRequest = S.suspend(() =>
  S.Struct({
    resourceConfigurationIdentifier: S.String.pipe(
      T.HttpLabel("resourceConfigurationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/resourceconfigurations/{resourceConfigurationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceConfigurationRequest",
}) as any as S.Schema<GetResourceConfigurationRequest>;
export interface GetResourceConfigurationResponse {
  id?: string;
  name?: string;
  arn?: string;
  resourceGatewayId?: string;
  resourceConfigurationGroupId?: string;
  type?: string;
  allowAssociationToShareableServiceNetwork?: boolean;
  portRanges?: string[];
  protocol?: string;
  customDomainName?: string;
  status?: string;
  resourceConfigurationDefinition?: ResourceConfigurationDefinition;
  createdAt?: Date;
  amazonManaged?: boolean;
  failureReason?: string;
  lastUpdatedAt?: Date;
  domainVerificationId?: string;
  domainVerificationArn?: string;
  domainVerificationStatus?: string;
  groupDomain?: string;
}
export const GetResourceConfigurationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    resourceGatewayId: S.optional(S.String),
    resourceConfigurationGroupId: S.optional(S.String),
    type: S.optional(S.String),
    allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
    portRanges: S.optional(PortRangeList),
    protocol: S.optional(S.String),
    customDomainName: S.optional(S.String),
    status: S.optional(S.String),
    resourceConfigurationDefinition: S.optional(
      ResourceConfigurationDefinition,
    ),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    amazonManaged: S.optional(S.Boolean),
    failureReason: S.optional(S.String),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    domainVerificationId: S.optional(S.String),
    domainVerificationArn: S.optional(S.String),
    domainVerificationStatus: S.optional(S.String),
    groupDomain: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourceConfigurationResponse",
}) as any as S.Schema<GetResourceConfigurationResponse>;
export interface UpdateResourceConfigurationRequest {
  resourceConfigurationIdentifier: string;
  resourceConfigurationDefinition?: ResourceConfigurationDefinition;
  allowAssociationToShareableServiceNetwork?: boolean;
  portRanges?: string[];
}
export const UpdateResourceConfigurationRequest = S.suspend(() =>
  S.Struct({
    resourceConfigurationIdentifier: S.String.pipe(
      T.HttpLabel("resourceConfigurationIdentifier"),
    ),
    resourceConfigurationDefinition: S.optional(
      ResourceConfigurationDefinition,
    ),
    allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
    portRanges: S.optional(PortRangeList),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/resourceconfigurations/{resourceConfigurationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceConfigurationRequest",
}) as any as S.Schema<UpdateResourceConfigurationRequest>;
export interface UpdateResourceConfigurationResponse {
  id?: string;
  name?: string;
  arn?: string;
  resourceGatewayId?: string;
  resourceConfigurationGroupId?: string;
  type?: string;
  portRanges?: string[];
  allowAssociationToShareableServiceNetwork?: boolean;
  protocol?: string;
  status?: string;
  resourceConfigurationDefinition?: ResourceConfigurationDefinition;
}
export const UpdateResourceConfigurationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    resourceGatewayId: S.optional(S.String),
    resourceConfigurationGroupId: S.optional(S.String),
    type: S.optional(S.String),
    portRanges: S.optional(PortRangeList),
    allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
    protocol: S.optional(S.String),
    status: S.optional(S.String),
    resourceConfigurationDefinition: S.optional(
      ResourceConfigurationDefinition,
    ),
  }),
).annotate({
  identifier: "UpdateResourceConfigurationResponse",
}) as any as S.Schema<UpdateResourceConfigurationResponse>;
export interface DeleteResourceConfigurationRequest {
  resourceConfigurationIdentifier: string;
}
export const DeleteResourceConfigurationRequest = S.suspend(() =>
  S.Struct({
    resourceConfigurationIdentifier: S.String.pipe(
      T.HttpLabel("resourceConfigurationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/resourceconfigurations/{resourceConfigurationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceConfigurationRequest",
}) as any as S.Schema<DeleteResourceConfigurationRequest>;
export interface DeleteResourceConfigurationResponse {}
export const DeleteResourceConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourceConfigurationResponse",
}) as any as S.Schema<DeleteResourceConfigurationResponse>;
export interface ListResourceConfigurationsRequest {
  resourceGatewayIdentifier?: string;
  resourceConfigurationGroupIdentifier?: string;
  domainVerificationIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListResourceConfigurationsRequest = S.suspend(() =>
  S.Struct({
    resourceGatewayIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("resourceGatewayIdentifier"),
    ),
    resourceConfigurationGroupIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("resourceConfigurationGroupIdentifier"),
    ),
    domainVerificationIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("domainVerificationIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourceconfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceConfigurationsRequest",
}) as any as S.Schema<ListResourceConfigurationsRequest>;
export interface ResourceConfigurationSummary {
  id?: string;
  name?: string;
  arn?: string;
  resourceGatewayId?: string;
  resourceConfigurationGroupId?: string;
  type?: string;
  status?: string;
  amazonManaged?: boolean;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  customDomainName?: string;
  domainVerificationId?: string;
  groupDomain?: string;
}
export const ResourceConfigurationSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    resourceGatewayId: S.optional(S.String),
    resourceConfigurationGroupId: S.optional(S.String),
    type: S.optional(S.String),
    status: S.optional(S.String),
    amazonManaged: S.optional(S.Boolean),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    customDomainName: S.optional(S.String),
    domainVerificationId: S.optional(S.String),
    groupDomain: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceConfigurationSummary",
}) as any as S.Schema<ResourceConfigurationSummary>;
export type ResourceConfigurationSummaryList = ResourceConfigurationSummary[];
export const ResourceConfigurationSummaryList = S.Array(
  ResourceConfigurationSummary,
);
export interface ListResourceConfigurationsResponse {
  items?: ResourceConfigurationSummary[];
  nextToken?: string;
}
export const ListResourceConfigurationsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(ResourceConfigurationSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceConfigurationsResponse",
}) as any as S.Schema<ListResourceConfigurationsResponse>;
export interface DeleteResourceEndpointAssociationRequest {
  resourceEndpointAssociationIdentifier: string;
}
export const DeleteResourceEndpointAssociationRequest = S.suspend(() =>
  S.Struct({
    resourceEndpointAssociationIdentifier: S.String.pipe(
      T.HttpLabel("resourceEndpointAssociationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/resourceendpointassociations/{resourceEndpointAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceEndpointAssociationRequest",
}) as any as S.Schema<DeleteResourceEndpointAssociationRequest>;
export interface DeleteResourceEndpointAssociationResponse {
  id?: string;
  arn?: string;
  resourceConfigurationId?: string;
  resourceConfigurationArn?: string;
  vpcEndpointId?: string;
}
export const DeleteResourceEndpointAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    resourceConfigurationId: S.optional(S.String),
    resourceConfigurationArn: S.optional(S.String),
    vpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteResourceEndpointAssociationResponse",
}) as any as S.Schema<DeleteResourceEndpointAssociationResponse>;
export interface ListResourceEndpointAssociationsRequest {
  resourceConfigurationIdentifier: string;
  resourceEndpointAssociationIdentifier?: string;
  vpcEndpointId?: string;
  vpcEndpointOwner?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListResourceEndpointAssociationsRequest = S.suspend(() =>
  S.Struct({
    resourceConfigurationIdentifier: S.String.pipe(
      T.HttpQuery("resourceConfigurationIdentifier"),
    ),
    resourceEndpointAssociationIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("resourceEndpointAssociationIdentifier"),
    ),
    vpcEndpointId: S.optional(S.String).pipe(T.HttpQuery("vpcEndpointId")),
    vpcEndpointOwner: S.optional(S.String).pipe(
      T.HttpQuery("vpcEndpointOwner"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourceendpointassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceEndpointAssociationsRequest",
}) as any as S.Schema<ListResourceEndpointAssociationsRequest>;
export interface ResourceEndpointAssociationSummary {
  id?: string;
  arn?: string;
  resourceConfigurationId?: string;
  resourceConfigurationArn?: string;
  resourceConfigurationName?: string;
  vpcEndpointId?: string;
  vpcEndpointOwner?: string;
  createdBy?: string;
  createdAt?: Date;
}
export const ResourceEndpointAssociationSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    resourceConfigurationId: S.optional(S.String),
    resourceConfigurationArn: S.optional(S.String),
    resourceConfigurationName: S.optional(S.String),
    vpcEndpointId: S.optional(S.String),
    vpcEndpointOwner: S.optional(S.String),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ResourceEndpointAssociationSummary",
}) as any as S.Schema<ResourceEndpointAssociationSummary>;
export type ResourceEndpointAssociationList =
  ResourceEndpointAssociationSummary[];
export const ResourceEndpointAssociationList = S.Array(
  ResourceEndpointAssociationSummary,
);
export interface ListResourceEndpointAssociationsResponse {
  items: ResourceEndpointAssociationSummary[];
  nextToken?: string;
}
export const ListResourceEndpointAssociationsResponse = S.suspend(() =>
  S.Struct({
    items: ResourceEndpointAssociationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceEndpointAssociationsResponse",
}) as any as S.Schema<ListResourceEndpointAssociationsResponse>;
export type SubnetList = string[];
export const SubnetList = S.Array(S.String);
export type SecurityGroupList = string[];
export const SecurityGroupList = S.Array(S.String);
export interface CreateResourceGatewayRequest {
  clientToken?: string;
  name: string;
  vpcIdentifier?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  ipAddressType?: string;
  ipv4AddressesPerEni?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateResourceGatewayRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    vpcIdentifier: S.optional(S.String),
    subnetIds: S.optional(SubnetList),
    securityGroupIds: S.optional(SecurityGroupList),
    ipAddressType: S.optional(S.String),
    ipv4AddressesPerEni: S.optional(S.Number),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resourcegateways" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourceGatewayRequest",
}) as any as S.Schema<CreateResourceGatewayRequest>;
export interface CreateResourceGatewayResponse {
  name?: string;
  id?: string;
  arn?: string;
  status?: string;
  vpcIdentifier?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  ipAddressType?: string;
  ipv4AddressesPerEni?: number;
}
export const CreateResourceGatewayResponse = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    vpcIdentifier: S.optional(S.String),
    subnetIds: S.optional(SubnetList),
    securityGroupIds: S.optional(SecurityGroupList),
    ipAddressType: S.optional(S.String),
    ipv4AddressesPerEni: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateResourceGatewayResponse",
}) as any as S.Schema<CreateResourceGatewayResponse>;
export interface GetResourceGatewayRequest {
  resourceGatewayIdentifier: string;
}
export const GetResourceGatewayRequest = S.suspend(() =>
  S.Struct({
    resourceGatewayIdentifier: S.String.pipe(
      T.HttpLabel("resourceGatewayIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/resourcegateways/{resourceGatewayIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceGatewayRequest",
}) as any as S.Schema<GetResourceGatewayRequest>;
export interface GetResourceGatewayResponse {
  name?: string;
  id?: string;
  arn?: string;
  status?: string;
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  ipAddressType?: string;
  ipv4AddressesPerEni?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const GetResourceGatewayResponse = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    vpcId: S.optional(S.String),
    subnetIds: S.optional(SubnetList),
    securityGroupIds: S.optional(SecurityGroupList),
    ipAddressType: S.optional(S.String),
    ipv4AddressesPerEni: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetResourceGatewayResponse",
}) as any as S.Schema<GetResourceGatewayResponse>;
export interface UpdateResourceGatewayRequest {
  resourceGatewayIdentifier: string;
  securityGroupIds?: string[];
}
export const UpdateResourceGatewayRequest = S.suspend(() =>
  S.Struct({
    resourceGatewayIdentifier: S.String.pipe(
      T.HttpLabel("resourceGatewayIdentifier"),
    ),
    securityGroupIds: S.optional(SecurityGroupList),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/resourcegateways/{resourceGatewayIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceGatewayRequest",
}) as any as S.Schema<UpdateResourceGatewayRequest>;
export interface UpdateResourceGatewayResponse {
  name?: string;
  id?: string;
  arn?: string;
  status?: string;
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  ipAddressType?: string;
}
export const UpdateResourceGatewayResponse = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    vpcId: S.optional(S.String),
    subnetIds: S.optional(SubnetList),
    securityGroupIds: S.optional(SecurityGroupList),
    ipAddressType: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateResourceGatewayResponse",
}) as any as S.Schema<UpdateResourceGatewayResponse>;
export interface DeleteResourceGatewayRequest {
  resourceGatewayIdentifier: string;
}
export const DeleteResourceGatewayRequest = S.suspend(() =>
  S.Struct({
    resourceGatewayIdentifier: S.String.pipe(
      T.HttpLabel("resourceGatewayIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/resourcegateways/{resourceGatewayIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceGatewayRequest",
}) as any as S.Schema<DeleteResourceGatewayRequest>;
export interface DeleteResourceGatewayResponse {
  id?: string;
  arn?: string;
  name?: string;
  status?: string;
}
export const DeleteResourceGatewayResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteResourceGatewayResponse",
}) as any as S.Schema<DeleteResourceGatewayResponse>;
export interface ListResourceGatewaysRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListResourceGatewaysRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourcegateways" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceGatewaysRequest",
}) as any as S.Schema<ListResourceGatewaysRequest>;
export interface ResourceGatewaySummary {
  name?: string;
  id?: string;
  arn?: string;
  status?: string;
  vpcIdentifier?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  ipAddressType?: string;
  ipv4AddressesPerEni?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const ResourceGatewaySummary = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    vpcIdentifier: S.optional(S.String),
    subnetIds: S.optional(SubnetList),
    securityGroupIds: S.optional(SecurityGroupList),
    ipAddressType: S.optional(S.String),
    ipv4AddressesPerEni: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ResourceGatewaySummary",
}) as any as S.Schema<ResourceGatewaySummary>;
export type ResourceGatewayList = ResourceGatewaySummary[];
export const ResourceGatewayList = S.Array(ResourceGatewaySummary);
export interface ListResourceGatewaysResponse {
  items?: ResourceGatewaySummary[];
  nextToken?: string;
}
export const ListResourceGatewaysResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(ResourceGatewayList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceGatewaysResponse",
}) as any as S.Schema<ListResourceGatewaysResponse>;
export interface CreateRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  name: string;
  match: RuleMatch;
  priority: number;
  action: RuleAction;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRuleRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
    name: S.String,
    match: RuleMatch,
    priority: S.Number,
    action: RuleAction,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRuleRequest",
}) as any as S.Schema<CreateRuleRequest>;
export interface CreateRuleResponse {
  arn?: string;
  id?: string;
  name?: string;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export const CreateRuleResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    match: S.optional(RuleMatch),
    priority: S.optional(S.Number),
    action: S.optional(RuleAction),
  }),
).annotate({
  identifier: "CreateRuleResponse",
}) as any as S.Schema<CreateRuleResponse>;
export interface GetRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  ruleIdentifier: string;
}
export const GetRuleRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
    ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules/{ruleIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetRuleRequest" }) as any as S.Schema<GetRuleRequest>;
export interface GetRuleResponse {
  arn?: string;
  id?: string;
  name?: string;
  isDefault?: boolean;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const GetRuleResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    isDefault: S.optional(S.Boolean),
    match: S.optional(RuleMatch),
    priority: S.optional(S.Number),
    action: S.optional(RuleAction),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetRuleResponse",
}) as any as S.Schema<GetRuleResponse>;
export interface UpdateRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  ruleIdentifier: string;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export const UpdateRuleRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
    ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
    match: S.optional(RuleMatch),
    priority: S.optional(S.Number),
    action: S.optional(RuleAction),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules/{ruleIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRuleRequest",
}) as any as S.Schema<UpdateRuleRequest>;
export interface UpdateRuleResponse {
  arn?: string;
  id?: string;
  name?: string;
  isDefault?: boolean;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export const UpdateRuleResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    isDefault: S.optional(S.Boolean),
    match: S.optional(RuleMatch),
    priority: S.optional(S.Number),
    action: S.optional(RuleAction),
  }),
).annotate({
  identifier: "UpdateRuleResponse",
}) as any as S.Schema<UpdateRuleResponse>;
export interface DeleteRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  ruleIdentifier: string;
}
export const DeleteRuleRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
    ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules/{ruleIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRuleRequest",
}) as any as S.Schema<DeleteRuleRequest>;
export interface DeleteRuleResponse {}
export const DeleteRuleResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteRuleResponse",
}) as any as S.Schema<DeleteRuleResponse>;
export interface ListRulesRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListRulesRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRulesRequest",
}) as any as S.Schema<ListRulesRequest>;
export interface RuleSummary {
  arn?: string;
  id?: string;
  name?: string;
  isDefault?: boolean;
  priority?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const RuleSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    isDefault: S.optional(S.Boolean),
    priority: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "RuleSummary" }) as any as S.Schema<RuleSummary>;
export type RuleSummaryList = RuleSummary[];
export const RuleSummaryList = S.Array(RuleSummary);
export interface ListRulesResponse {
  items: RuleSummary[];
  nextToken?: string;
}
export const ListRulesResponse = S.suspend(() =>
  S.Struct({ items: RuleSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRulesResponse",
}) as any as S.Schema<ListRulesResponse>;
export interface CreateServiceRequest {
  clientToken?: string;
  name: string;
  tags?: { [key: string]: string | undefined };
  customDomainName?: string;
  certificateArn?: string;
  authType?: string;
}
export const CreateServiceRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    tags: S.optional(TagMap),
    customDomainName: S.optional(S.String),
    certificateArn: S.optional(S.String),
    authType: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/services" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceRequest",
}) as any as S.Schema<CreateServiceRequest>;
export interface DnsEntry {
  domainName?: string;
  hostedZoneId?: string;
}
export const DnsEntry = S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    hostedZoneId: S.optional(S.String),
  }),
).annotate({ identifier: "DnsEntry" }) as any as S.Schema<DnsEntry>;
export interface CreateServiceResponse {
  id?: string;
  arn?: string;
  name?: string;
  customDomainName?: string;
  certificateArn?: string;
  status?: string;
  authType?: string;
  dnsEntry?: DnsEntry;
}
export const CreateServiceResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    customDomainName: S.optional(S.String),
    certificateArn: S.optional(S.String),
    status: S.optional(S.String),
    authType: S.optional(S.String),
    dnsEntry: S.optional(DnsEntry),
  }),
).annotate({
  identifier: "CreateServiceResponse",
}) as any as S.Schema<CreateServiceResponse>;
export interface GetServiceRequest {
  serviceIdentifier: string;
}
export const GetServiceRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/services/{serviceIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceRequest",
}) as any as S.Schema<GetServiceRequest>;
export interface GetServiceResponse {
  id?: string;
  name?: string;
  arn?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  dnsEntry?: DnsEntry;
  customDomainName?: string;
  certificateArn?: string;
  status?: string;
  authType?: string;
  failureCode?: string;
  failureMessage?: string;
}
export const GetServiceResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dnsEntry: S.optional(DnsEntry),
    customDomainName: S.optional(S.String),
    certificateArn: S.optional(S.String),
    status: S.optional(S.String),
    authType: S.optional(S.String),
    failureCode: S.optional(S.String),
    failureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "GetServiceResponse",
}) as any as S.Schema<GetServiceResponse>;
export interface UpdateServiceRequest {
  serviceIdentifier: string;
  certificateArn?: string;
  authType?: string;
}
export const UpdateServiceRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
    certificateArn: S.optional(S.String),
    authType: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/services/{serviceIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceRequest",
}) as any as S.Schema<UpdateServiceRequest>;
export interface UpdateServiceResponse {
  id?: string;
  arn?: string;
  name?: string;
  customDomainName?: string;
  certificateArn?: string;
  authType?: string;
}
export const UpdateServiceResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    customDomainName: S.optional(S.String),
    certificateArn: S.optional(S.String),
    authType: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateServiceResponse",
}) as any as S.Schema<UpdateServiceResponse>;
export interface DeleteServiceRequest {
  serviceIdentifier: string;
}
export const DeleteServiceRequest = S.suspend(() =>
  S.Struct({
    serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/services/{serviceIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceRequest",
}) as any as S.Schema<DeleteServiceRequest>;
export interface DeleteServiceResponse {
  id?: string;
  arn?: string;
  name?: string;
  status?: string;
}
export const DeleteServiceResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteServiceResponse",
}) as any as S.Schema<DeleteServiceResponse>;
export interface ListServicesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListServicesRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/services" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServicesRequest",
}) as any as S.Schema<ListServicesRequest>;
export interface ServiceSummary {
  id?: string;
  name?: string;
  arn?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  dnsEntry?: DnsEntry;
  customDomainName?: string;
  status?: string;
}
export const ServiceSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dnsEntry: S.optional(DnsEntry),
    customDomainName: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceSummary" }) as any as S.Schema<ServiceSummary>;
export type ServiceList = ServiceSummary[];
export const ServiceList = S.Array(ServiceSummary);
export interface ListServicesResponse {
  items?: ServiceSummary[];
  nextToken?: string;
}
export const ListServicesResponse = S.suspend(() =>
  S.Struct({ items: S.optional(ServiceList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListServicesResponse",
}) as any as S.Schema<ListServicesResponse>;
export interface SharingConfig {
  enabled?: boolean;
}
export const SharingConfig = S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({ identifier: "SharingConfig" }) as any as S.Schema<SharingConfig>;
export interface CreateServiceNetworkRequest {
  clientToken?: string;
  name: string;
  authType?: string;
  tags?: { [key: string]: string | undefined };
  sharingConfig?: SharingConfig;
}
export const CreateServiceNetworkRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    authType: S.optional(S.String),
    tags: S.optional(TagMap),
    sharingConfig: S.optional(SharingConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/servicenetworks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceNetworkRequest",
}) as any as S.Schema<CreateServiceNetworkRequest>;
export interface CreateServiceNetworkResponse {
  id?: string;
  name?: string;
  arn?: string;
  sharingConfig?: SharingConfig;
  authType?: string;
}
export const CreateServiceNetworkResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    sharingConfig: S.optional(SharingConfig),
    authType: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateServiceNetworkResponse",
}) as any as S.Schema<CreateServiceNetworkResponse>;
export interface GetServiceNetworkRequest {
  serviceNetworkIdentifier: string;
}
export const GetServiceNetworkRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/servicenetworks/{serviceNetworkIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceNetworkRequest",
}) as any as S.Schema<GetServiceNetworkRequest>;
export interface GetServiceNetworkResponse {
  id?: string;
  name?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn?: string;
  authType?: string;
  sharingConfig?: SharingConfig;
  numberOfAssociatedVPCs?: number;
  numberOfAssociatedServices?: number;
}
export const GetServiceNetworkResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    arn: S.optional(S.String),
    authType: S.optional(S.String),
    sharingConfig: S.optional(SharingConfig),
    numberOfAssociatedVPCs: S.optional(S.Number),
    numberOfAssociatedServices: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetServiceNetworkResponse",
}) as any as S.Schema<GetServiceNetworkResponse>;
export interface UpdateServiceNetworkRequest {
  serviceNetworkIdentifier: string;
  authType: string;
}
export const UpdateServiceNetworkRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkIdentifier"),
    ),
    authType: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/servicenetworks/{serviceNetworkIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceNetworkRequest",
}) as any as S.Schema<UpdateServiceNetworkRequest>;
export interface UpdateServiceNetworkResponse {
  id?: string;
  name?: string;
  arn?: string;
  authType?: string;
}
export const UpdateServiceNetworkResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    authType: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateServiceNetworkResponse",
}) as any as S.Schema<UpdateServiceNetworkResponse>;
export interface DeleteServiceNetworkRequest {
  serviceNetworkIdentifier: string;
}
export const DeleteServiceNetworkRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/servicenetworks/{serviceNetworkIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceNetworkRequest",
}) as any as S.Schema<DeleteServiceNetworkRequest>;
export interface DeleteServiceNetworkResponse {}
export const DeleteServiceNetworkResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteServiceNetworkResponse",
}) as any as S.Schema<DeleteServiceNetworkResponse>;
export interface ListServiceNetworksRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListServiceNetworksRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/servicenetworks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceNetworksRequest",
}) as any as S.Schema<ListServiceNetworksRequest>;
export interface ServiceNetworkSummary {
  id?: string;
  name?: string;
  arn?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  numberOfAssociatedVPCs?: number;
  numberOfAssociatedServices?: number;
  numberOfAssociatedResourceConfigurations?: number;
}
export const ServiceNetworkSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    numberOfAssociatedVPCs: S.optional(S.Number),
    numberOfAssociatedServices: S.optional(S.Number),
    numberOfAssociatedResourceConfigurations: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceNetworkSummary",
}) as any as S.Schema<ServiceNetworkSummary>;
export type ServiceNetworkList = ServiceNetworkSummary[];
export const ServiceNetworkList = S.Array(ServiceNetworkSummary);
export interface ListServiceNetworksResponse {
  items: ServiceNetworkSummary[];
  nextToken?: string;
}
export const ListServiceNetworksResponse = S.suspend(() =>
  S.Struct({ items: ServiceNetworkList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListServiceNetworksResponse",
}) as any as S.Schema<ListServiceNetworksResponse>;
export interface CreateServiceNetworkResourceAssociationRequest {
  clientToken?: string;
  resourceConfigurationIdentifier: string;
  serviceNetworkIdentifier: string;
  privateDnsEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CreateServiceNetworkResourceAssociationRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    resourceConfigurationIdentifier: S.String,
    serviceNetworkIdentifier: S.String,
    privateDnsEnabled: S.optional(S.Boolean),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/servicenetworkresourceassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceNetworkResourceAssociationRequest",
}) as any as S.Schema<CreateServiceNetworkResourceAssociationRequest>;
export interface CreateServiceNetworkResourceAssociationResponse {
  id?: string;
  arn?: string;
  status?: string;
  createdBy?: string;
  privateDnsEnabled?: boolean;
}
export const CreateServiceNetworkResourceAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    createdBy: S.optional(S.String),
    privateDnsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CreateServiceNetworkResourceAssociationResponse",
}) as any as S.Schema<CreateServiceNetworkResourceAssociationResponse>;
export interface GetServiceNetworkResourceAssociationRequest {
  serviceNetworkResourceAssociationIdentifier: string;
}
export const GetServiceNetworkResourceAssociationRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkResourceAssociationIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkResourceAssociationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/servicenetworkresourceassociations/{serviceNetworkResourceAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceNetworkResourceAssociationRequest",
}) as any as S.Schema<GetServiceNetworkResourceAssociationRequest>;
export interface GetServiceNetworkResourceAssociationResponse {
  id?: string;
  arn?: string;
  status?: string;
  createdBy?: string;
  createdAt?: Date;
  resourceConfigurationId?: string;
  resourceConfigurationArn?: string;
  resourceConfigurationName?: string;
  serviceNetworkId?: string;
  serviceNetworkArn?: string;
  serviceNetworkName?: string;
  failureReason?: string;
  failureCode?: string;
  lastUpdatedAt?: Date;
  privateDnsEntry?: DnsEntry;
  privateDnsEnabled?: boolean;
  dnsEntry?: DnsEntry;
  isManagedAssociation?: boolean;
  domainVerificationStatus?: string;
}
export const GetServiceNetworkResourceAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    resourceConfigurationId: S.optional(S.String),
    resourceConfigurationArn: S.optional(S.String),
    resourceConfigurationName: S.optional(S.String),
    serviceNetworkId: S.optional(S.String),
    serviceNetworkArn: S.optional(S.String),
    serviceNetworkName: S.optional(S.String),
    failureReason: S.optional(S.String),
    failureCode: S.optional(S.String),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    privateDnsEntry: S.optional(DnsEntry),
    privateDnsEnabled: S.optional(S.Boolean),
    dnsEntry: S.optional(DnsEntry),
    isManagedAssociation: S.optional(S.Boolean),
    domainVerificationStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "GetServiceNetworkResourceAssociationResponse",
}) as any as S.Schema<GetServiceNetworkResourceAssociationResponse>;
export interface DeleteServiceNetworkResourceAssociationRequest {
  serviceNetworkResourceAssociationIdentifier: string;
}
export const DeleteServiceNetworkResourceAssociationRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkResourceAssociationIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkResourceAssociationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/servicenetworkresourceassociations/{serviceNetworkResourceAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceNetworkResourceAssociationRequest",
}) as any as S.Schema<DeleteServiceNetworkResourceAssociationRequest>;
export interface DeleteServiceNetworkResourceAssociationResponse {
  id?: string;
  arn?: string;
  status?: string;
}
export const DeleteServiceNetworkResourceAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteServiceNetworkResourceAssociationResponse",
}) as any as S.Schema<DeleteServiceNetworkResourceAssociationResponse>;
export interface ListServiceNetworkResourceAssociationsRequest {
  serviceNetworkIdentifier?: string;
  resourceConfigurationIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
  includeChildren?: boolean;
}
export const ListServiceNetworkResourceAssociationsRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("serviceNetworkIdentifier"),
    ),
    resourceConfigurationIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("resourceConfigurationIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    includeChildren: S.optional(S.Boolean).pipe(T.HttpQuery("includeChildren")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/servicenetworkresourceassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceNetworkResourceAssociationsRequest",
}) as any as S.Schema<ListServiceNetworkResourceAssociationsRequest>;
export interface ServiceNetworkResourceAssociationSummary {
  id?: string;
  arn?: string;
  status?: string;
  createdBy?: string;
  createdAt?: Date;
  resourceConfigurationId?: string;
  resourceConfigurationArn?: string;
  resourceConfigurationName?: string;
  serviceNetworkId?: string;
  serviceNetworkArn?: string;
  serviceNetworkName?: string;
  dnsEntry?: DnsEntry;
  privateDnsEntry?: DnsEntry;
  isManagedAssociation?: boolean;
  failureCode?: string;
  privateDnsEnabled?: boolean;
}
export const ServiceNetworkResourceAssociationSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    resourceConfigurationId: S.optional(S.String),
    resourceConfigurationArn: S.optional(S.String),
    resourceConfigurationName: S.optional(S.String),
    serviceNetworkId: S.optional(S.String),
    serviceNetworkArn: S.optional(S.String),
    serviceNetworkName: S.optional(S.String),
    dnsEntry: S.optional(DnsEntry),
    privateDnsEntry: S.optional(DnsEntry),
    isManagedAssociation: S.optional(S.Boolean),
    failureCode: S.optional(S.String),
    privateDnsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ServiceNetworkResourceAssociationSummary",
}) as any as S.Schema<ServiceNetworkResourceAssociationSummary>;
export type ServiceNetworkResourceAssociationList =
  ServiceNetworkResourceAssociationSummary[];
export const ServiceNetworkResourceAssociationList = S.Array(
  ServiceNetworkResourceAssociationSummary,
);
export interface ListServiceNetworkResourceAssociationsResponse {
  items: ServiceNetworkResourceAssociationSummary[];
  nextToken?: string;
}
export const ListServiceNetworkResourceAssociationsResponse = S.suspend(() =>
  S.Struct({
    items: ServiceNetworkResourceAssociationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceNetworkResourceAssociationsResponse",
}) as any as S.Schema<ListServiceNetworkResourceAssociationsResponse>;
export interface CreateServiceNetworkServiceAssociationRequest {
  clientToken?: string;
  serviceIdentifier: string;
  serviceNetworkIdentifier: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateServiceNetworkServiceAssociationRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    serviceIdentifier: S.String,
    serviceNetworkIdentifier: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/servicenetworkserviceassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceNetworkServiceAssociationRequest",
}) as any as S.Schema<CreateServiceNetworkServiceAssociationRequest>;
export interface CreateServiceNetworkServiceAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
  createdBy?: string;
  customDomainName?: string;
  dnsEntry?: DnsEntry;
}
export const CreateServiceNetworkServiceAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    arn: S.optional(S.String),
    createdBy: S.optional(S.String),
    customDomainName: S.optional(S.String),
    dnsEntry: S.optional(DnsEntry),
  }),
).annotate({
  identifier: "CreateServiceNetworkServiceAssociationResponse",
}) as any as S.Schema<CreateServiceNetworkServiceAssociationResponse>;
export interface GetServiceNetworkServiceAssociationRequest {
  serviceNetworkServiceAssociationIdentifier: string;
}
export const GetServiceNetworkServiceAssociationRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkServiceAssociationIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkServiceAssociationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/servicenetworkserviceassociations/{serviceNetworkServiceAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceNetworkServiceAssociationRequest",
}) as any as S.Schema<GetServiceNetworkServiceAssociationRequest>;
export interface GetServiceNetworkServiceAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
  createdBy?: string;
  createdAt?: Date;
  serviceId?: string;
  serviceName?: string;
  serviceArn?: string;
  serviceNetworkId?: string;
  serviceNetworkName?: string;
  serviceNetworkArn?: string;
  dnsEntry?: DnsEntry;
  customDomainName?: string;
  failureMessage?: string;
  failureCode?: string;
}
export const GetServiceNetworkServiceAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    arn: S.optional(S.String),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    serviceId: S.optional(S.String),
    serviceName: S.optional(S.String),
    serviceArn: S.optional(S.String),
    serviceNetworkId: S.optional(S.String),
    serviceNetworkName: S.optional(S.String),
    serviceNetworkArn: S.optional(S.String),
    dnsEntry: S.optional(DnsEntry),
    customDomainName: S.optional(S.String),
    failureMessage: S.optional(S.String),
    failureCode: S.optional(S.String),
  }),
).annotate({
  identifier: "GetServiceNetworkServiceAssociationResponse",
}) as any as S.Schema<GetServiceNetworkServiceAssociationResponse>;
export interface DeleteServiceNetworkServiceAssociationRequest {
  serviceNetworkServiceAssociationIdentifier: string;
}
export const DeleteServiceNetworkServiceAssociationRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkServiceAssociationIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkServiceAssociationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/servicenetworkserviceassociations/{serviceNetworkServiceAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceNetworkServiceAssociationRequest",
}) as any as S.Schema<DeleteServiceNetworkServiceAssociationRequest>;
export interface DeleteServiceNetworkServiceAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
}
export const DeleteServiceNetworkServiceAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteServiceNetworkServiceAssociationResponse",
}) as any as S.Schema<DeleteServiceNetworkServiceAssociationResponse>;
export interface ListServiceNetworkServiceAssociationsRequest {
  serviceNetworkIdentifier?: string;
  serviceIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListServiceNetworkServiceAssociationsRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("serviceNetworkIdentifier"),
    ),
    serviceIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("serviceIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/servicenetworkserviceassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceNetworkServiceAssociationsRequest",
}) as any as S.Schema<ListServiceNetworkServiceAssociationsRequest>;
export interface ServiceNetworkServiceAssociationSummary {
  id?: string;
  status?: string;
  arn?: string;
  createdBy?: string;
  createdAt?: Date;
  serviceId?: string;
  serviceName?: string;
  serviceArn?: string;
  serviceNetworkId?: string;
  serviceNetworkName?: string;
  serviceNetworkArn?: string;
  dnsEntry?: DnsEntry;
  customDomainName?: string;
}
export const ServiceNetworkServiceAssociationSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    arn: S.optional(S.String),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    serviceId: S.optional(S.String),
    serviceName: S.optional(S.String),
    serviceArn: S.optional(S.String),
    serviceNetworkId: S.optional(S.String),
    serviceNetworkName: S.optional(S.String),
    serviceNetworkArn: S.optional(S.String),
    dnsEntry: S.optional(DnsEntry),
    customDomainName: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceNetworkServiceAssociationSummary",
}) as any as S.Schema<ServiceNetworkServiceAssociationSummary>;
export type ServiceNetworkServiceAssociationList =
  ServiceNetworkServiceAssociationSummary[];
export const ServiceNetworkServiceAssociationList = S.Array(
  ServiceNetworkServiceAssociationSummary,
);
export interface ListServiceNetworkServiceAssociationsResponse {
  items: ServiceNetworkServiceAssociationSummary[];
  nextToken?: string;
}
export const ListServiceNetworkServiceAssociationsResponse = S.suspend(() =>
  S.Struct({
    items: ServiceNetworkServiceAssociationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceNetworkServiceAssociationsResponse",
}) as any as S.Schema<ListServiceNetworkServiceAssociationsResponse>;
export type PrivateDnsSpecifiedDomainsList = string[];
export const PrivateDnsSpecifiedDomainsList = S.Array(S.String);
export interface DnsOptions {
  privateDnsPreference?: string;
  privateDnsSpecifiedDomains?: string[];
}
export const DnsOptions = S.suspend(() =>
  S.Struct({
    privateDnsPreference: S.optional(S.String),
    privateDnsSpecifiedDomains: S.optional(PrivateDnsSpecifiedDomainsList),
  }),
).annotate({ identifier: "DnsOptions" }) as any as S.Schema<DnsOptions>;
export interface CreateServiceNetworkVpcAssociationRequest {
  clientToken?: string;
  serviceNetworkIdentifier: string;
  vpcIdentifier: string;
  privateDnsEnabled?: boolean;
  securityGroupIds?: string[];
  tags?: { [key: string]: string | undefined };
  dnsOptions?: DnsOptions;
}
export const CreateServiceNetworkVpcAssociationRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    serviceNetworkIdentifier: S.String,
    vpcIdentifier: S.String,
    privateDnsEnabled: S.optional(S.Boolean),
    securityGroupIds: S.optional(SecurityGroupList),
    tags: S.optional(TagMap),
    dnsOptions: S.optional(DnsOptions),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/servicenetworkvpcassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceNetworkVpcAssociationRequest",
}) as any as S.Schema<CreateServiceNetworkVpcAssociationRequest>;
export interface CreateServiceNetworkVpcAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
  createdBy?: string;
  securityGroupIds?: string[];
  privateDnsEnabled?: boolean;
  dnsOptions?: DnsOptions;
}
export const CreateServiceNetworkVpcAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    arn: S.optional(S.String),
    createdBy: S.optional(S.String),
    securityGroupIds: S.optional(SecurityGroupList),
    privateDnsEnabled: S.optional(S.Boolean),
    dnsOptions: S.optional(DnsOptions),
  }),
).annotate({
  identifier: "CreateServiceNetworkVpcAssociationResponse",
}) as any as S.Schema<CreateServiceNetworkVpcAssociationResponse>;
export interface GetServiceNetworkVpcAssociationRequest {
  serviceNetworkVpcAssociationIdentifier: string;
}
export const GetServiceNetworkVpcAssociationRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkVpcAssociationIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkVpcAssociationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/servicenetworkvpcassociations/{serviceNetworkVpcAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceNetworkVpcAssociationRequest",
}) as any as S.Schema<GetServiceNetworkVpcAssociationRequest>;
export interface GetServiceNetworkVpcAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
  createdBy?: string;
  createdAt?: Date;
  serviceNetworkId?: string;
  serviceNetworkName?: string;
  serviceNetworkArn?: string;
  vpcId?: string;
  securityGroupIds?: string[];
  privateDnsEnabled?: boolean;
  failureMessage?: string;
  failureCode?: string;
  lastUpdatedAt?: Date;
  dnsOptions?: DnsOptions;
}
export const GetServiceNetworkVpcAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    arn: S.optional(S.String),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    serviceNetworkId: S.optional(S.String),
    serviceNetworkName: S.optional(S.String),
    serviceNetworkArn: S.optional(S.String),
    vpcId: S.optional(S.String),
    securityGroupIds: S.optional(SecurityGroupList),
    privateDnsEnabled: S.optional(S.Boolean),
    failureMessage: S.optional(S.String),
    failureCode: S.optional(S.String),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dnsOptions: S.optional(DnsOptions),
  }),
).annotate({
  identifier: "GetServiceNetworkVpcAssociationResponse",
}) as any as S.Schema<GetServiceNetworkVpcAssociationResponse>;
export interface UpdateServiceNetworkVpcAssociationRequest {
  serviceNetworkVpcAssociationIdentifier: string;
  securityGroupIds: string[];
}
export const UpdateServiceNetworkVpcAssociationRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkVpcAssociationIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkVpcAssociationIdentifier"),
    ),
    securityGroupIds: SecurityGroupList,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/servicenetworkvpcassociations/{serviceNetworkVpcAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceNetworkVpcAssociationRequest",
}) as any as S.Schema<UpdateServiceNetworkVpcAssociationRequest>;
export interface UpdateServiceNetworkVpcAssociationResponse {
  id?: string;
  arn?: string;
  status?: string;
  createdBy?: string;
  securityGroupIds?: string[];
}
export const UpdateServiceNetworkVpcAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    createdBy: S.optional(S.String),
    securityGroupIds: S.optional(SecurityGroupList),
  }),
).annotate({
  identifier: "UpdateServiceNetworkVpcAssociationResponse",
}) as any as S.Schema<UpdateServiceNetworkVpcAssociationResponse>;
export interface DeleteServiceNetworkVpcAssociationRequest {
  serviceNetworkVpcAssociationIdentifier: string;
}
export const DeleteServiceNetworkVpcAssociationRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkVpcAssociationIdentifier: S.String.pipe(
      T.HttpLabel("serviceNetworkVpcAssociationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/servicenetworkvpcassociations/{serviceNetworkVpcAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceNetworkVpcAssociationRequest",
}) as any as S.Schema<DeleteServiceNetworkVpcAssociationRequest>;
export interface DeleteServiceNetworkVpcAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
}
export const DeleteServiceNetworkVpcAssociationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteServiceNetworkVpcAssociationResponse",
}) as any as S.Schema<DeleteServiceNetworkVpcAssociationResponse>;
export interface ListServiceNetworkVpcAssociationsRequest {
  serviceNetworkIdentifier?: string;
  vpcIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListServiceNetworkVpcAssociationsRequest = S.suspend(() =>
  S.Struct({
    serviceNetworkIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("serviceNetworkIdentifier"),
    ),
    vpcIdentifier: S.optional(S.String).pipe(T.HttpQuery("vpcIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/servicenetworkvpcassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceNetworkVpcAssociationsRequest",
}) as any as S.Schema<ListServiceNetworkVpcAssociationsRequest>;
export interface ServiceNetworkVpcAssociationSummary {
  id?: string;
  arn?: string;
  status?: string;
  createdBy?: string;
  createdAt?: Date;
  serviceNetworkId?: string;
  serviceNetworkName?: string;
  serviceNetworkArn?: string;
  privateDnsEnabled?: boolean;
  dnsOptions?: DnsOptions;
  vpcId?: string;
  lastUpdatedAt?: Date;
}
export const ServiceNetworkVpcAssociationSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    serviceNetworkId: S.optional(S.String),
    serviceNetworkName: S.optional(S.String),
    serviceNetworkArn: S.optional(S.String),
    privateDnsEnabled: S.optional(S.Boolean),
    dnsOptions: S.optional(DnsOptions),
    vpcId: S.optional(S.String),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ServiceNetworkVpcAssociationSummary",
}) as any as S.Schema<ServiceNetworkVpcAssociationSummary>;
export type ServiceNetworkVpcAssociationList =
  ServiceNetworkVpcAssociationSummary[];
export const ServiceNetworkVpcAssociationList = S.Array(
  ServiceNetworkVpcAssociationSummary,
);
export interface ListServiceNetworkVpcAssociationsResponse {
  items: ServiceNetworkVpcAssociationSummary[];
  nextToken?: string;
}
export const ListServiceNetworkVpcAssociationsResponse = S.suspend(() =>
  S.Struct({
    items: ServiceNetworkVpcAssociationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceNetworkVpcAssociationsResponse",
}) as any as S.Schema<ListServiceNetworkVpcAssociationsResponse>;
export type Matcher = { httpCode: string };
export const Matcher = S.Union([S.Struct({ httpCode: S.String })]);
export interface HealthCheckConfig {
  enabled?: boolean;
  protocol?: string;
  protocolVersion?: string;
  port?: number;
  path?: string;
  healthCheckIntervalSeconds?: number;
  healthCheckTimeoutSeconds?: number;
  healthyThresholdCount?: number;
  unhealthyThresholdCount?: number;
  matcher?: Matcher;
}
export const HealthCheckConfig = S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    protocol: S.optional(S.String),
    protocolVersion: S.optional(S.String),
    port: S.optional(S.Number),
    path: S.optional(S.String),
    healthCheckIntervalSeconds: S.optional(S.Number),
    healthCheckTimeoutSeconds: S.optional(S.Number),
    healthyThresholdCount: S.optional(S.Number),
    unhealthyThresholdCount: S.optional(S.Number),
    matcher: S.optional(Matcher),
  }),
).annotate({
  identifier: "HealthCheckConfig",
}) as any as S.Schema<HealthCheckConfig>;
export interface TargetGroupConfig {
  port?: number;
  protocol?: string;
  protocolVersion?: string;
  ipAddressType?: string;
  vpcIdentifier?: string;
  healthCheck?: HealthCheckConfig;
  lambdaEventStructureVersion?: string;
}
export const TargetGroupConfig = S.suspend(() =>
  S.Struct({
    port: S.optional(S.Number),
    protocol: S.optional(S.String),
    protocolVersion: S.optional(S.String),
    ipAddressType: S.optional(S.String),
    vpcIdentifier: S.optional(S.String),
    healthCheck: S.optional(HealthCheckConfig),
    lambdaEventStructureVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetGroupConfig",
}) as any as S.Schema<TargetGroupConfig>;
export interface CreateTargetGroupRequest {
  name: string;
  type: string;
  config?: TargetGroupConfig;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateTargetGroupRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    type: S.String,
    config: S.optional(TargetGroupConfig),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/targetgroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTargetGroupRequest",
}) as any as S.Schema<CreateTargetGroupRequest>;
export interface CreateTargetGroupResponse {
  id?: string;
  arn?: string;
  name?: string;
  type?: string;
  config?: TargetGroupConfig;
  status?: string;
}
export const CreateTargetGroupResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(S.String),
    config: S.optional(TargetGroupConfig),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateTargetGroupResponse",
}) as any as S.Schema<CreateTargetGroupResponse>;
export interface GetTargetGroupRequest {
  targetGroupIdentifier: string;
}
export const GetTargetGroupRequest = S.suspend(() =>
  S.Struct({
    targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/targetgroups/{targetGroupIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTargetGroupRequest",
}) as any as S.Schema<GetTargetGroupRequest>;
export type ServiceArnList = string[];
export const ServiceArnList = S.Array(S.String);
export interface GetTargetGroupResponse {
  id?: string;
  arn?: string;
  name?: string;
  type?: string;
  config?: TargetGroupConfig;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  status?: string;
  serviceArns?: string[];
  failureMessage?: string;
  failureCode?: string;
}
export const GetTargetGroupResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(S.String),
    config: S.optional(TargetGroupConfig),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    status: S.optional(S.String),
    serviceArns: S.optional(ServiceArnList),
    failureMessage: S.optional(S.String),
    failureCode: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTargetGroupResponse",
}) as any as S.Schema<GetTargetGroupResponse>;
export interface UpdateTargetGroupRequest {
  targetGroupIdentifier: string;
  healthCheck: HealthCheckConfig;
}
export const UpdateTargetGroupRequest = S.suspend(() =>
  S.Struct({
    targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
    healthCheck: HealthCheckConfig,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/targetgroups/{targetGroupIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTargetGroupRequest",
}) as any as S.Schema<UpdateTargetGroupRequest>;
export interface UpdateTargetGroupResponse {
  id?: string;
  arn?: string;
  name?: string;
  type?: string;
  config?: TargetGroupConfig;
  status?: string;
}
export const UpdateTargetGroupResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(S.String),
    config: S.optional(TargetGroupConfig),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateTargetGroupResponse",
}) as any as S.Schema<UpdateTargetGroupResponse>;
export interface DeleteTargetGroupRequest {
  targetGroupIdentifier: string;
}
export const DeleteTargetGroupRequest = S.suspend(() =>
  S.Struct({
    targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/targetgroups/{targetGroupIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTargetGroupRequest",
}) as any as S.Schema<DeleteTargetGroupRequest>;
export interface DeleteTargetGroupResponse {
  id?: string;
  arn?: string;
  status?: string;
}
export const DeleteTargetGroupResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteTargetGroupResponse",
}) as any as S.Schema<DeleteTargetGroupResponse>;
export interface ListTargetGroupsRequest {
  maxResults?: number;
  nextToken?: string;
  vpcIdentifier?: string;
  targetGroupType?: string;
}
export const ListTargetGroupsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    vpcIdentifier: S.optional(S.String).pipe(T.HttpQuery("vpcIdentifier")),
    targetGroupType: S.optional(S.String).pipe(T.HttpQuery("targetGroupType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/targetgroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTargetGroupsRequest",
}) as any as S.Schema<ListTargetGroupsRequest>;
export interface TargetGroupSummary {
  id?: string;
  arn?: string;
  name?: string;
  type?: string;
  createdAt?: Date;
  port?: number;
  protocol?: string;
  ipAddressType?: string;
  vpcIdentifier?: string;
  lastUpdatedAt?: Date;
  status?: string;
  serviceArns?: string[];
  lambdaEventStructureVersion?: string;
}
export const TargetGroupSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    port: S.optional(S.Number),
    protocol: S.optional(S.String),
    ipAddressType: S.optional(S.String),
    vpcIdentifier: S.optional(S.String),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    status: S.optional(S.String),
    serviceArns: S.optional(ServiceArnList),
    lambdaEventStructureVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetGroupSummary",
}) as any as S.Schema<TargetGroupSummary>;
export type TargetGroupList = TargetGroupSummary[];
export const TargetGroupList = S.Array(TargetGroupSummary);
export interface ListTargetGroupsResponse {
  items?: TargetGroupSummary[];
  nextToken?: string;
}
export const ListTargetGroupsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(TargetGroupList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTargetGroupsResponse",
}) as any as S.Schema<ListTargetGroupsResponse>;
export interface Target {
  id: string;
  port?: number;
}
export const Target = S.suspend(() =>
  S.Struct({ id: S.String, port: S.optional(S.Number) }),
).annotate({ identifier: "Target" }) as any as S.Schema<Target>;
export type TargetList = Target[];
export const TargetList = S.Array(Target);
export interface DeregisterTargetsRequest {
  targetGroupIdentifier: string;
  targets: Target[];
}
export const DeregisterTargetsRequest = S.suspend(() =>
  S.Struct({
    targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
    targets: TargetList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/targetgroups/{targetGroupIdentifier}/deregistertargets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterTargetsRequest",
}) as any as S.Schema<DeregisterTargetsRequest>;
export interface TargetFailure {
  id?: string;
  port?: number;
  failureCode?: string;
  failureMessage?: string;
}
export const TargetFailure = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    port: S.optional(S.Number),
    failureCode: S.optional(S.String),
    failureMessage: S.optional(S.String),
  }),
).annotate({ identifier: "TargetFailure" }) as any as S.Schema<TargetFailure>;
export type TargetFailureList = TargetFailure[];
export const TargetFailureList = S.Array(TargetFailure);
export interface DeregisterTargetsResponse {
  successful?: Target[];
  unsuccessful?: TargetFailure[];
}
export const DeregisterTargetsResponse = S.suspend(() =>
  S.Struct({
    successful: S.optional(TargetList),
    unsuccessful: S.optional(TargetFailureList),
  }),
).annotate({
  identifier: "DeregisterTargetsResponse",
}) as any as S.Schema<DeregisterTargetsResponse>;
export interface ListTargetsRequest {
  targetGroupIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  targets?: Target[];
}
export const ListTargetsRequest = S.suspend(() =>
  S.Struct({
    targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    targets: S.optional(TargetList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/targetgroups/{targetGroupIdentifier}/listtargets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTargetsRequest",
}) as any as S.Schema<ListTargetsRequest>;
export interface TargetSummary {
  id?: string;
  port?: number;
  status?: string;
  reasonCode?: string;
}
export const TargetSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    port: S.optional(S.Number),
    status: S.optional(S.String),
    reasonCode: S.optional(S.String),
  }),
).annotate({ identifier: "TargetSummary" }) as any as S.Schema<TargetSummary>;
export type TargetSummaryList = TargetSummary[];
export const TargetSummaryList = S.Array(TargetSummary);
export interface ListTargetsResponse {
  items: TargetSummary[];
  nextToken?: string;
}
export const ListTargetsResponse = S.suspend(() =>
  S.Struct({ items: TargetSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTargetsResponse",
}) as any as S.Schema<ListTargetsResponse>;
export interface RegisterTargetsRequest {
  targetGroupIdentifier: string;
  targets: Target[];
}
export const RegisterTargetsRequest = S.suspend(() =>
  S.Struct({
    targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
    targets: TargetList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/targetgroups/{targetGroupIdentifier}/registertargets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterTargetsRequest",
}) as any as S.Schema<RegisterTargetsRequest>;
export interface RegisterTargetsResponse {
  successful?: Target[];
  unsuccessful?: TargetFailure[];
}
export const RegisterTargetsResponse = S.suspend(() =>
  S.Struct({
    successful: S.optional(TargetList),
    unsuccessful: S.optional(TargetFailureList),
  }),
).annotate({
  identifier: "RegisterTargetsResponse",
}) as any as S.Schema<RegisterTargetsResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  {
    message: S.String,
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    message: S.String,
    serviceCode: S.optional(S.String),
    quotaCode: S.optional(S.String),
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable({ throttling: true }),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    message: S.String,
    reason: S.String,
    fieldList: S.optional(ValidationExceptionFieldList),
  },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  {
    message: S.String,
    resourceId: S.optional(S.String),
    resourceType: S.String,
    serviceCode: S.String,
    quotaCode: S.String,
  },
).pipe(C.withQuotaError) {}

//# Operations
export type BatchUpdateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the listener rules in a batch. You can use this operation to change the priority of listener rules. This can be useful when bulk updating or swapping rule priority.
 *
 * **Required permissions:** `vpc-lattice:UpdateRule`
 *
 * For more information, see How Amazon VPC Lattice works with IAM in the *Amazon VPC Lattice User Guide*.
 */
export const batchUpdateRule: API.OperationMethod<
  BatchUpdateRuleRequest,
  BatchUpdateRuleResponse,
  BatchUpdateRuleError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateRuleRequest,
  output: BatchUpdateRuleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteAuthPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified auth policy. If an auth is set to `AWS_IAM` and the auth policy is deleted, all requests are denied. If you are trying to remove the auth policy completely, you must set the auth type to `NONE`. If auth is enabled on the resource, but no auth policy is set, all requests are denied.
 */
export const deleteAuthPolicy: API.OperationMethod<
  DeleteAuthPolicyRequest,
  DeleteAuthPolicyResponse,
  DeleteAuthPolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAuthPolicyRequest,
  output: DeleteAuthPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified resource policy.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetAuthPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the auth policy for the specified service or service network.
 */
export const getAuthPolicy: API.OperationMethod<
  GetAuthPolicyRequest,
  GetAuthPolicyResponse,
  GetAuthPolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAuthPolicyRequest,
  output: GetAuthPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified resource policy. The resource policy is an IAM policy created on behalf of the resource owner when they share a resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListServiceNetworkVpcEndpointAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between a service network and a VPC endpoint.
 */
export const listServiceNetworkVpcEndpointAssociations: API.OperationMethod<
  ListServiceNetworkVpcEndpointAssociationsRequest,
  ListServiceNetworkVpcEndpointAssociationsResponse,
  ListServiceNetworkVpcEndpointAssociationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceNetworkVpcEndpointAssociationsRequest,
  ) => stream.Stream<
    ListServiceNetworkVpcEndpointAssociationsResponse,
    ListServiceNetworkVpcEndpointAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceNetworkVpcEndpointAssociationsRequest,
  ) => stream.Stream<
    ServiceNetworkEndpointAssociation,
    ListServiceNetworkVpcEndpointAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceNetworkVpcEndpointAssociationsRequest,
  output: ListServiceNetworkVpcEndpointAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type PutAuthPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the auth policy. The policy string in JSON must not contain newlines or blank lines.
 *
 * For more information, see Auth policies in the *Amazon VPC Lattice User Guide*.
 */
export const putAuthPolicy: API.OperationMethod<
  PutAuthPolicyRequest,
  PutAuthPolicyResponse,
  PutAuthPolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutAuthPolicyRequest,
  output: PutAuthPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based permission policy to a service or service network. The policy must contain the same actions and condition statements as the Amazon Web Services Resource Access Manager permission for sharing services and service networks.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type CreateAccessLogSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables access logs to be sent to Amazon CloudWatch, Amazon S3, and Amazon Kinesis Data Firehose. The service network owner can use the access logs to audit the services in the network. The service network owner can only see access logs from clients and services that are associated with their service network. Access log entries represent traffic originated from VPCs associated with that network. For more information, see Access logs in the *Amazon VPC Lattice User Guide*.
 */
export const createAccessLogSubscription: API.OperationMethod<
  CreateAccessLogSubscriptionRequest,
  CreateAccessLogSubscriptionResponse,
  CreateAccessLogSubscriptionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAccessLogSubscriptionRequest,
  output: CreateAccessLogSubscriptionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetAccessLogSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified access log subscription.
 */
export const getAccessLogSubscription: API.OperationMethod<
  GetAccessLogSubscriptionRequest,
  GetAccessLogSubscriptionResponse,
  GetAccessLogSubscriptionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccessLogSubscriptionRequest,
  output: GetAccessLogSubscriptionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateAccessLogSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified access log subscription.
 */
export const updateAccessLogSubscription: API.OperationMethod<
  UpdateAccessLogSubscriptionRequest,
  UpdateAccessLogSubscriptionResponse,
  UpdateAccessLogSubscriptionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAccessLogSubscriptionRequest,
  output: UpdateAccessLogSubscriptionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteAccessLogSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified access log subscription.
 */
export const deleteAccessLogSubscription: API.OperationMethod<
  DeleteAccessLogSubscriptionRequest,
  DeleteAccessLogSubscriptionResponse,
  DeleteAccessLogSubscriptionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccessLogSubscriptionRequest,
  output: DeleteAccessLogSubscriptionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListAccessLogSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the access log subscriptions for the specified service network or service.
 */
export const listAccessLogSubscriptions: API.OperationMethod<
  ListAccessLogSubscriptionsRequest,
  ListAccessLogSubscriptionsResponse,
  ListAccessLogSubscriptionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccessLogSubscriptionsRequest,
  ) => stream.Stream<
    ListAccessLogSubscriptionsResponse,
    ListAccessLogSubscriptionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccessLogSubscriptionsRequest,
  ) => stream.Stream<
    AccessLogSubscriptionSummary,
    ListAccessLogSubscriptionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccessLogSubscriptionsRequest,
  output: ListAccessLogSubscriptionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type StartDomainVerificationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the domain verification process for a custom domain name.
 */
export const startDomainVerification: API.OperationMethod<
  StartDomainVerificationRequest,
  StartDomainVerificationResponse,
  StartDomainVerificationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartDomainVerificationRequest,
  output: StartDomainVerificationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetDomainVerificationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a domain verification.ß
 */
export const getDomainVerification: API.OperationMethod<
  GetDomainVerificationRequest,
  GetDomainVerificationResponse,
  GetDomainVerificationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainVerificationRequest,
  output: GetDomainVerificationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteDomainVerificationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified domain verification.
 */
export const deleteDomainVerification: API.OperationMethod<
  DeleteDomainVerificationRequest,
  DeleteDomainVerificationResponse,
  DeleteDomainVerificationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDomainVerificationRequest,
  output: DeleteDomainVerificationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListDomainVerificationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the domain verifications.
 */
export const listDomainVerifications: API.OperationMethod<
  ListDomainVerificationsRequest,
  ListDomainVerificationsResponse,
  ListDomainVerificationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDomainVerificationsRequest,
  ) => stream.Stream<
    ListDomainVerificationsResponse,
    ListDomainVerificationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDomainVerificationsRequest,
  ) => stream.Stream<
    DomainVerificationSummary,
    ListDomainVerificationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDomainVerificationsRequest,
  output: ListDomainVerificationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateListenerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a listener for a service. Before you start using your Amazon VPC Lattice service, you must add one or more listeners. A listener is a process that checks for connection requests to your services. For more information, see Listeners in the *Amazon VPC Lattice User Guide*.
 */
export const createListener: API.OperationMethod<
  CreateListenerRequest,
  CreateListenerResponse,
  CreateListenerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateListenerRequest,
  output: CreateListenerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetListenerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified listener for the specified service.
 */
export const getListener: API.OperationMethod<
  GetListenerRequest,
  GetListenerResponse,
  GetListenerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetListenerRequest,
  output: GetListenerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateListenerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified listener for the specified service.
 */
export const updateListener: API.OperationMethod<
  UpdateListenerRequest,
  UpdateListenerResponse,
  UpdateListenerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateListenerRequest,
  output: UpdateListenerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteListenerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified listener.
 */
export const deleteListener: API.OperationMethod<
  DeleteListenerRequest,
  DeleteListenerResponse,
  DeleteListenerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteListenerRequest,
  output: DeleteListenerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListListenersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the listeners for the specified service.
 */
export const listListeners: API.OperationMethod<
  ListListenersRequest,
  ListListenersResponse,
  ListListenersError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListListenersRequest,
  ) => stream.Stream<
    ListListenersResponse,
    ListListenersError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListListenersRequest,
  ) => stream.Stream<
    ListenerSummary,
    ListListenersError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListListenersRequest,
  output: ListListenersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateResourceConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resource configuration. A resource configuration defines a specific resource. You can associate a resource configuration with a service network or a VPC endpoint.
 */
export const createResourceConfiguration: API.OperationMethod<
  CreateResourceConfigurationRequest,
  CreateResourceConfigurationResponse,
  CreateResourceConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResourceConfigurationRequest,
  output: CreateResourceConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetResourceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified resource configuration.
 */
export const getResourceConfiguration: API.OperationMethod<
  GetResourceConfigurationRequest,
  GetResourceConfigurationResponse,
  GetResourceConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourceConfigurationRequest,
  output: GetResourceConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateResourceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified resource configuration.
 */
export const updateResourceConfiguration: API.OperationMethod<
  UpdateResourceConfigurationRequest,
  UpdateResourceConfigurationResponse,
  UpdateResourceConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResourceConfigurationRequest,
  output: UpdateResourceConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteResourceConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified resource configuration.
 */
export const deleteResourceConfiguration: API.OperationMethod<
  DeleteResourceConfigurationRequest,
  DeleteResourceConfigurationResponse,
  DeleteResourceConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourceConfigurationRequest,
  output: DeleteResourceConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListResourceConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resource configurations owned by or shared with this account.
 */
export const listResourceConfigurations: API.OperationMethod<
  ListResourceConfigurationsRequest,
  ListResourceConfigurationsResponse,
  ListResourceConfigurationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourceConfigurationsRequest,
  ) => stream.Stream<
    ListResourceConfigurationsResponse,
    ListResourceConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResourceConfigurationsRequest,
  ) => stream.Stream<
    ResourceConfigurationSummary,
    ListResourceConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourceConfigurationsRequest,
  output: ListResourceConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type DeleteResourceEndpointAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the resource configuration from the resource VPC endpoint.
 */
export const deleteResourceEndpointAssociation: API.OperationMethod<
  DeleteResourceEndpointAssociationRequest,
  DeleteResourceEndpointAssociationResponse,
  DeleteResourceEndpointAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourceEndpointAssociationRequest,
  output: DeleteResourceEndpointAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListResourceEndpointAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations for the specified VPC endpoint.
 */
export const listResourceEndpointAssociations: API.OperationMethod<
  ListResourceEndpointAssociationsRequest,
  ListResourceEndpointAssociationsResponse,
  ListResourceEndpointAssociationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourceEndpointAssociationsRequest,
  ) => stream.Stream<
    ListResourceEndpointAssociationsResponse,
    ListResourceEndpointAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResourceEndpointAssociationsRequest,
  ) => stream.Stream<
    ResourceEndpointAssociationSummary,
    ListResourceEndpointAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourceEndpointAssociationsRequest,
  output: ListResourceEndpointAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateResourceGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A resource gateway is a point of ingress into the VPC where a resource resides. It spans multiple Availability Zones. For your resource to be accessible from all Availability Zones, you should create your resource gateways to span as many Availability Zones as possible. A VPC can have multiple resource gateways.
 */
export const createResourceGateway: API.OperationMethod<
  CreateResourceGatewayRequest,
  CreateResourceGatewayResponse,
  CreateResourceGatewayError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResourceGatewayRequest,
  output: CreateResourceGatewayResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetResourceGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified resource gateway.
 */
export const getResourceGateway: API.OperationMethod<
  GetResourceGatewayRequest,
  GetResourceGatewayResponse,
  GetResourceGatewayError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourceGatewayRequest,
  output: GetResourceGatewayResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateResourceGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified resource gateway.
 */
export const updateResourceGateway: API.OperationMethod<
  UpdateResourceGatewayRequest,
  UpdateResourceGatewayResponse,
  UpdateResourceGatewayError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResourceGatewayRequest,
  output: UpdateResourceGatewayResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteResourceGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified resource gateway.
 */
export const deleteResourceGateway: API.OperationMethod<
  DeleteResourceGatewayRequest,
  DeleteResourceGatewayResponse,
  DeleteResourceGatewayError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourceGatewayRequest,
  output: DeleteResourceGatewayResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListResourceGatewaysError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resource gateways that you own or that were shared with you.
 */
export const listResourceGateways: API.OperationMethod<
  ListResourceGatewaysRequest,
  ListResourceGatewaysResponse,
  ListResourceGatewaysError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourceGatewaysRequest,
  ) => stream.Stream<
    ListResourceGatewaysResponse,
    ListResourceGatewaysError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResourceGatewaysRequest,
  ) => stream.Stream<
    ResourceGatewaySummary,
    ListResourceGatewaysError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourceGatewaysRequest,
  output: ListResourceGatewaysResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a listener rule. Each listener has a default rule for checking connection requests, but you can define additional rules. Each rule consists of a priority, one or more actions, and one or more conditions. For more information, see Listener rules in the *Amazon VPC Lattice User Guide*.
 */
export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified listener rules. You can also retrieve information about the default listener rule. For more information, see Listener rules in the *Amazon VPC Lattice User Guide*.
 */
export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRuleRequest,
  output: GetRuleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified rule for the listener. You can't modify a default listener rule. To modify a default listener rule, use `UpdateListener`.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a listener rule. Each listener has a default rule for checking connection requests, but you can define additional rules. Each rule consists of a priority, one or more actions, and one or more conditions. You can delete additional listener rules, but you cannot delete the default rule.
 *
 * For more information, see Listener rules in the *Amazon VPC Lattice User Guide*.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rules for the specified listener.
 */
export const listRules: API.OperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRulesRequest,
  ) => stream.Stream<
    ListRulesResponse,
    ListRulesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRulesRequest,
  ) => stream.Stream<
    RuleSummary,
    ListRulesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service. A service is any software application that can run on instances containers, or serverless functions within an account or virtual private cloud (VPC).
 *
 * For more information, see Services in the *Amazon VPC Lattice User Guide*.
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateServiceRequest,
  output: CreateServiceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetServiceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified service.
 */
export const getService: API.OperationMethod<
  GetServiceRequest,
  GetServiceResponse,
  GetServiceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServiceRequest,
  output: GetServiceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified service.
 */
export const updateService: API.OperationMethod<
  UpdateServiceRequest,
  UpdateServiceResponse,
  UpdateServiceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateServiceRequest,
  output: UpdateServiceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a service. A service can't be deleted if it's associated with a service network. If you delete a service, all resources related to the service, such as the resource policy, auth policy, listeners, listener rules, and access log subscriptions, are also deleted. For more information, see Delete a service in the *Amazon VPC Lattice User Guide*.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteServiceRequest,
  output: DeleteServiceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListServicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the services owned by the caller account or shared with the caller account.
 */
export const listServices: API.OperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServicesRequest,
  ) => stream.Stream<
    ListServicesResponse,
    ListServicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServicesRequest,
  ) => stream.Stream<
    ServiceSummary,
    ListServicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateServiceNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service network. A service network is a logical boundary for a collection of services. You can associate services and VPCs with a service network.
 *
 * For more information, see Service networks in the *Amazon VPC Lattice User Guide*.
 */
export const createServiceNetwork: API.OperationMethod<
  CreateServiceNetworkRequest,
  CreateServiceNetworkResponse,
  CreateServiceNetworkError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateServiceNetworkRequest,
  output: CreateServiceNetworkResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetServiceNetworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified service network.
 */
export const getServiceNetwork: API.OperationMethod<
  GetServiceNetworkRequest,
  GetServiceNetworkResponse,
  GetServiceNetworkError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServiceNetworkRequest,
  output: GetServiceNetworkResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateServiceNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified service network.
 */
export const updateServiceNetwork: API.OperationMethod<
  UpdateServiceNetworkRequest,
  UpdateServiceNetworkResponse,
  UpdateServiceNetworkError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateServiceNetworkRequest,
  output: UpdateServiceNetworkResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteServiceNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a service network. You can only delete the service network if there is no service or VPC associated with it. If you delete a service network, all resources related to the service network, such as the resource policy, auth policy, and access log subscriptions, are also deleted. For more information, see Delete a service network in the *Amazon VPC Lattice User Guide*.
 */
export const deleteServiceNetwork: API.OperationMethod<
  DeleteServiceNetworkRequest,
  DeleteServiceNetworkResponse,
  DeleteServiceNetworkError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteServiceNetworkRequest,
  output: DeleteServiceNetworkResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListServiceNetworksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the service networks owned by or shared with this account. The account ID in the ARN shows which account owns the service network.
 */
export const listServiceNetworks: API.OperationMethod<
  ListServiceNetworksRequest,
  ListServiceNetworksResponse,
  ListServiceNetworksError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceNetworksRequest,
  ) => stream.Stream<
    ListServiceNetworksResponse,
    ListServiceNetworksError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceNetworksRequest,
  ) => stream.Stream<
    ServiceNetworkSummary,
    ListServiceNetworksError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceNetworksRequest,
  output: ListServiceNetworksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateServiceNetworkResourceAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified service network with the specified resource configuration. This allows the resource configuration to receive connections through the service network, including through a service network VPC endpoint.
 */
export const createServiceNetworkResourceAssociation: API.OperationMethod<
  CreateServiceNetworkResourceAssociationRequest,
  CreateServiceNetworkResourceAssociationResponse,
  CreateServiceNetworkResourceAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateServiceNetworkResourceAssociationRequest,
  output: CreateServiceNetworkResourceAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetServiceNetworkResourceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified association between a service network and a resource configuration.
 */
export const getServiceNetworkResourceAssociation: API.OperationMethod<
  GetServiceNetworkResourceAssociationRequest,
  GetServiceNetworkResourceAssociationResponse,
  GetServiceNetworkResourceAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServiceNetworkResourceAssociationRequest,
  output: GetServiceNetworkResourceAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteServiceNetworkResourceAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the association between a service network and a resource configuration.
 */
export const deleteServiceNetworkResourceAssociation: API.OperationMethod<
  DeleteServiceNetworkResourceAssociationRequest,
  DeleteServiceNetworkResourceAssociationResponse,
  DeleteServiceNetworkResourceAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteServiceNetworkResourceAssociationRequest,
  output: DeleteServiceNetworkResourceAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListServiceNetworkResourceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between a service network and a resource configuration.
 */
export const listServiceNetworkResourceAssociations: API.OperationMethod<
  ListServiceNetworkResourceAssociationsRequest,
  ListServiceNetworkResourceAssociationsResponse,
  ListServiceNetworkResourceAssociationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceNetworkResourceAssociationsRequest,
  ) => stream.Stream<
    ListServiceNetworkResourceAssociationsResponse,
    ListServiceNetworkResourceAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceNetworkResourceAssociationsRequest,
  ) => stream.Stream<
    ServiceNetworkResourceAssociationSummary,
    ListServiceNetworkResourceAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceNetworkResourceAssociationsRequest,
  output: ListServiceNetworkResourceAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateServiceNetworkServiceAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified service with the specified service network. For more information, see Manage service associations in the *Amazon VPC Lattice User Guide*.
 *
 * You can't use this operation if the service and service network are already associated or if there is a disassociation or deletion in progress. If the association fails, you can retry the operation by deleting the association and recreating it.
 *
 * You cannot associate a service and service network that are shared with a caller. The caller must own either the service or the service network.
 *
 * As a result of this operation, the association is created in the service network account and the association owner account.
 */
export const createServiceNetworkServiceAssociation: API.OperationMethod<
  CreateServiceNetworkServiceAssociationRequest,
  CreateServiceNetworkServiceAssociationResponse,
  CreateServiceNetworkServiceAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateServiceNetworkServiceAssociationRequest,
  output: CreateServiceNetworkServiceAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetServiceNetworkServiceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified association between a service network and a service.
 */
export const getServiceNetworkServiceAssociation: API.OperationMethod<
  GetServiceNetworkServiceAssociationRequest,
  GetServiceNetworkServiceAssociationResponse,
  GetServiceNetworkServiceAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServiceNetworkServiceAssociationRequest,
  output: GetServiceNetworkServiceAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteServiceNetworkServiceAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the association between a service and a service network. This operation fails if an association is still in progress.
 */
export const deleteServiceNetworkServiceAssociation: API.OperationMethod<
  DeleteServiceNetworkServiceAssociationRequest,
  DeleteServiceNetworkServiceAssociationResponse,
  DeleteServiceNetworkServiceAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteServiceNetworkServiceAssociationRequest,
  output: DeleteServiceNetworkServiceAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListServiceNetworkServiceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between a service network and a service. You can filter the list either by service or service network. You must provide either the service network identifier or the service identifier.
 *
 * Every association in Amazon VPC Lattice has a unique Amazon Resource Name (ARN), such as when a service network is associated with a VPC or when a service is associated with a service network. If the association is for a resource is shared with another account, the association includes the local account ID as the prefix in the ARN.
 */
export const listServiceNetworkServiceAssociations: API.OperationMethod<
  ListServiceNetworkServiceAssociationsRequest,
  ListServiceNetworkServiceAssociationsResponse,
  ListServiceNetworkServiceAssociationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceNetworkServiceAssociationsRequest,
  ) => stream.Stream<
    ListServiceNetworkServiceAssociationsResponse,
    ListServiceNetworkServiceAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceNetworkServiceAssociationsRequest,
  ) => stream.Stream<
    ServiceNetworkServiceAssociationSummary,
    ListServiceNetworkServiceAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceNetworkServiceAssociationsRequest,
  output: ListServiceNetworkServiceAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateServiceNetworkVpcAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a VPC with a service network. When you associate a VPC with the service network, it enables all the resources within that VPC to be clients and communicate with other services in the service network. For more information, see Manage VPC associations in the *Amazon VPC Lattice User Guide*.
 *
 * You can't use this operation if there is a disassociation in progress. If the association fails, retry by deleting the association and recreating it.
 *
 * As a result of this operation, the association gets created in the service network account and the VPC owner account.
 *
 * If you add a security group to the service network and VPC association, the association must continue to always have at least one security group. You can add or edit security groups at any time. However, to remove all security groups, you must first delete the association and recreate it without security groups.
 */
export const createServiceNetworkVpcAssociation: API.OperationMethod<
  CreateServiceNetworkVpcAssociationRequest,
  CreateServiceNetworkVpcAssociationResponse,
  CreateServiceNetworkVpcAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateServiceNetworkVpcAssociationRequest,
  output: CreateServiceNetworkVpcAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetServiceNetworkVpcAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified association between a service network and a VPC.
 */
export const getServiceNetworkVpcAssociation: API.OperationMethod<
  GetServiceNetworkVpcAssociationRequest,
  GetServiceNetworkVpcAssociationResponse,
  GetServiceNetworkVpcAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServiceNetworkVpcAssociationRequest,
  output: GetServiceNetworkVpcAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateServiceNetworkVpcAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the service network and VPC association. If you add a security group to the service network and VPC association, the association must continue to have at least one security group. You can add or edit security groups at any time. However, to remove all security groups, you must first delete the association and then recreate it without security groups.
 */
export const updateServiceNetworkVpcAssociation: API.OperationMethod<
  UpdateServiceNetworkVpcAssociationRequest,
  UpdateServiceNetworkVpcAssociationResponse,
  UpdateServiceNetworkVpcAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateServiceNetworkVpcAssociationRequest,
  output: UpdateServiceNetworkVpcAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteServiceNetworkVpcAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the VPC from the service network. You can't disassociate the VPC if there is a create or update association in progress.
 */
export const deleteServiceNetworkVpcAssociation: API.OperationMethod<
  DeleteServiceNetworkVpcAssociationRequest,
  DeleteServiceNetworkVpcAssociationResponse,
  DeleteServiceNetworkVpcAssociationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteServiceNetworkVpcAssociationRequest,
  output: DeleteServiceNetworkVpcAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListServiceNetworkVpcAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between a service network and a VPC. You can filter the list either by VPC or service network. You must provide either the ID of the service network identifier or the ID of the VPC.
 */
export const listServiceNetworkVpcAssociations: API.OperationMethod<
  ListServiceNetworkVpcAssociationsRequest,
  ListServiceNetworkVpcAssociationsResponse,
  ListServiceNetworkVpcAssociationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceNetworkVpcAssociationsRequest,
  ) => stream.Stream<
    ListServiceNetworkVpcAssociationsResponse,
    ListServiceNetworkVpcAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceNetworkVpcAssociationsRequest,
  ) => stream.Stream<
    ServiceNetworkVpcAssociationSummary,
    ListServiceNetworkVpcAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceNetworkVpcAssociationsRequest,
  output: ListServiceNetworkVpcAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type CreateTargetGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a target group. A target group is a collection of targets, or compute resources, that run your application or service. A target group can only be used by a single service.
 *
 * For more information, see Target groups in the *Amazon VPC Lattice User Guide*.
 */
export const createTargetGroup: API.OperationMethod<
  CreateTargetGroupRequest,
  CreateTargetGroupResponse,
  CreateTargetGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTargetGroupRequest,
  output: CreateTargetGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetTargetGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified target group.
 */
export const getTargetGroup: API.OperationMethod<
  GetTargetGroupRequest,
  GetTargetGroupResponse,
  GetTargetGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetTargetGroupRequest,
  output: GetTargetGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateTargetGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified target group.
 */
export const updateTargetGroup: API.OperationMethod<
  UpdateTargetGroupRequest,
  UpdateTargetGroupResponse,
  UpdateTargetGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateTargetGroupRequest,
  output: UpdateTargetGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteTargetGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a target group. You can't delete a target group if it is used in a listener rule or if the target group creation is in progress.
 */
export const deleteTargetGroup: API.OperationMethod<
  DeleteTargetGroupRequest,
  DeleteTargetGroupResponse,
  DeleteTargetGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTargetGroupRequest,
  output: DeleteTargetGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListTargetGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists your target groups. You can narrow your search by using the filters below in your request.
 */
export const listTargetGroups: API.OperationMethod<
  ListTargetGroupsRequest,
  ListTargetGroupsResponse,
  ListTargetGroupsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTargetGroupsRequest,
  ) => stream.Stream<
    ListTargetGroupsResponse,
    ListTargetGroupsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTargetGroupsRequest,
  ) => stream.Stream<
    TargetGroupSummary,
    ListTargetGroupsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTargetGroupsRequest,
  output: ListTargetGroupsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type DeregisterTargetsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters the specified targets from the specified target group.
 */
export const deregisterTargets: API.OperationMethod<
  DeregisterTargetsRequest,
  DeregisterTargetsResponse,
  DeregisterTargetsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeregisterTargetsRequest,
  output: DeregisterTargetsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListTargetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the targets for the target group. By default, all targets are included. You can use this API to check the health status of targets. You can also ﬁlter the results by target.
 */
export const listTargets: API.OperationMethod<
  ListTargetsRequest,
  ListTargetsResponse,
  ListTargetsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTargetsRequest,
  ) => stream.Stream<
    ListTargetsResponse,
    ListTargetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTargetsRequest,
  ) => stream.Stream<
    TargetSummary,
    ListTargetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTargetsRequest,
  output: ListTargetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
export type RegisterTargetsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers the targets with the target group. If it's a Lambda target, you can only have one target in a target group.
 */
export const registerTargets: API.OperationMethod<
  RegisterTargetsRequest,
  RegisterTargetsResponse,
  RegisterTargetsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegisterTargetsRequest,
  output: RegisterTargetsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
